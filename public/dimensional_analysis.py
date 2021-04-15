from functools import reduce

import traceback

from json import loads, dumps

from sympy import Mul, latex, sympify, solve

from sympy.printing import pretty

from sympy.physics.units.definitions.dimension_definitions import (
    mass,
    length,
    time,
    current,
    temperature,
    luminous_intensity,
    amount_of_substance,
    angle,
    information,
)

from sympy.physics.units.systems.si import dimsys_SI

from sympy.utilities.iterables import topological_sort

# maps from mathjs dimensions object to sympy dimensions
dim_map = {
    0: mass,
    1: length,
    2: time,
    3: current,
    4: temperature,
    5: luminous_intensity,
    6: amount_of_substance,
    7: angle,
    8: information,
}

inv_dim_map = {str(value.name): key for key, value in dim_map.items()}

# base units as defined by mathjs
base_units = {
    (0, 0, 0, 0, 0, 0, 0, 0, 0): "",
    (1, 0, 0, 0, 0, 0, 0, 0, 0): "kg",
    (0, 1, 0, 0, 0, 0, 0, 0, 0): "m",
    (0, 0, 1, 0, 0, 0, 0, 0, 0): "sec",
    (0, 0, 0, 1, 0, 0, 0, 0, 0): "ampere",
    (0, 0, 0, 0, 1, 0, 0, 0, 0): "kelvin",
    (0, 0, 0, 0, 0, 1, 0, 0, 0): "candela",
    (0, 0, 0, 0, 0, 0, 1, 0, 0): "mole",
    (1, 1, -2, 0, 0, 0, 0, 0, 0): "N",
    (0, 2, 0, 0, 0, 0, 0, 0, 0): "m^2",
    (0, 3, 0, 0, 0, 0, 0, 0, 0): "m^3",
    (1, 2, -2, 0, 0, 0, 0, 0, 0): "J",
    (1, 2, -3, 0, 0, 0, 0, 0, 0): "W",
    (1, -1, -2, 0, 0, 0, 0, 0, 0): "Pa",
    (0, 0, 1, 1, 0, 0, 0, 0, 0): "coulomb",
    (-1, -2, 4, 2, 0, 0, 0, 0, 0): "farad",
    (1, 2, -3, -1, 0, 0, 0, 0, 0): "V",
    (1, 2, -3, -2, 0, 0, 0, 0, 0): "ohm",
    (1, 2, -2, -2, 0, 0, 0, 0, 0): "henry",
    (-1, -2, 3, 2, 0, 0, 0, 0, 0): "siemens",
    (1, 2, -2, -1, 0, 0, 0, 0, 0): "weber",
    (1, 0, -2, -1, 0, 0, 0, 0, 0): "tesla",
    (0, 0, -1, 0, 0, 0, 0, 0, 0): "Hz",
    (0, 0, 0, 0, 0, 0, 0, 1, 0): "rad",
    (0, 0, 0, 0, 0, 0, 0, 0, 1): "bits",
}

# map the sympy dimensional dependences to mathjs dimensions
def get_mathjs_units(dimensional_dependencies):
    mathjs_dims = [0] * 9

    all_units_recognized = True
    for name, exp in dimensional_dependencies.items():
        dim_index = inv_dim_map.get(name)
        if dim_index is None:
            # this will hapen if the user references a parameter in an equation that has not been defined
            # will eventually want to allow the user to specify the untis for an undefined parameter
            all_units_recognized = False
            break
        mathjs_dims[dim_index] += exp

    if all_units_recognized:
        mathjs_unit_name = base_units.get(tuple(mathjs_dims))

        if mathjs_unit_name is None:
            mathjs_unit_name = ""
            latex_num = ""
            latex_den = ""
            for i, exp in enumerate(mathjs_dims):
                if exp != 0:
                    key = [0] * 9
                    key[i] = 1
                    name = base_units.get(tuple(key))
                    if mathjs_unit_name == "":
                        mathjs_unit_name = f"{name}^{float(exp):g}"
                    else:
                        mathjs_unit_name = f"{mathjs_unit_name}*{name}^{float(exp):g}"

                    if exp > 0:
                        if exp != 1:
                            new_term = f"{name}^{{{float(exp):g}}}"
                        else:
                            new_term = name
                        if latex_num == "":
                            latex_num = new_term
                        else:
                            latex_num = f"{latex_num}\\cdot{new_term}"
                    else:
                        if exp != -1:
                            new_term = f"{name}^{{{-float(exp):g}}}"
                        else:
                            new_term = name
                        if latex_den == "":
                            latex_den = new_term
                        else:
                            latex_den = f"{latex_den}\\cdot{new_term}"

            if latex_den != "":
                if latex_num == "":
                    latex_num = "1"
                unit_latex = f"\\left[\\frac{{{latex_num}}}{{{latex_den}}}\\right]"
            elif latex_num != "":
                unit_latex = f"\\left[{latex_num}\\right]"
            else:
                unit_latex = ""
        else:
            if mathjs_unit_name == "":
                unit_latex = ""
            else:
                unit_latex = f"\\left[{mathjs_unit_name}\\right]"

    else:
        mathjs_unit_name = ""
        unit_latex = ""

    return mathjs_unit_name, unit_latex


def get_dims(dimensions):
    dims = Mul(
        1,
        *[
            dim_map[int(i)] ** value
            for i, value in enumerate(dimensions)
            if value != 0.0
        ],
    )
    return dims


def dimensional_analysis(parameters, expression):
    # sub parameter dimensions
    parameter_subs = {
        param["name"]: get_dims(param["dimensions"]) for param in parameters
    }
    # need to remove any subtractions or unary negative since this may
    # lead to unintentional cancellation during the parameter substituation process
    positive_only_expression = sympify(str(expression).replace('-', '+'))
    final_expression = positive_only_expression.subs(parameter_subs)

    try:
        result, result_latex = get_mathjs_units(
            dimsys_SI.get_dimensional_dependencies(final_expression)
        )
    except TypeError:
        result = "Dimension Error"
        result_latex = "Dimension Error"

    return result, result_latex


class ParameterError(Exception):
    pass


class DuplicateAssignment(Exception):
    pass


class ReferenceCycle(Exception):
    pass


class ParsingError(Exception):
    pass


def get_sorted_statements(statements):
    defined_params = {}
    for i, statement in enumerate(statements):
        if statement["type"] == "assignment":
            if statement["name"] in defined_params:
                raise DuplicateAssignment(statement["name"])
            else:
                defined_params[statement["name"]] = i

    vertices = range(len(statements))
    edges = []

    for i, statement in enumerate(statements):
        for param in statement["params"]:
            ref_index = defined_params.get(param)
            if ref_index is not None:
                edges.append((ref_index, i))

    try:
        sort_order = topological_sort((vertices, edges))
    except ValueError:
        raise ReferenceCycle

    sorted_statements = []

    for i in sort_order:
        statement = statements[i]
        sorted_statements.append(statement)

    return sorted_statements


def get_all_implicit_parameters(statements):
    parameters = []
    for statement in statements:
        parameters.extend(statement["implicitParams"])

    return parameters


def expand_exponent_statements(statements):
    new_statements = list(statements)

    for statement in statements:
        new_statements.extend(statement["exponents"])

    return new_statements


def get_str(expr):
    return pretty(expr, full_prec=False, use_unicode=False)


def get_parameter_subs(parameters):
    # sub parameter values
    parameter_subs = {
        param["name"]: sympify(param["si_value"], rational=True)
        for param in parameters
        if param["si_value"] is not None
    }
    if len(parameter_subs) < len(parameters):
        raise ParameterError

    return parameter_subs


def sympify_statements(statements):
    for statement in statements:
        try:
            statement["expression"] = sympify(statement["sympy"], rational=True)
        except SyntaxError:
            print(f"Parsing error for equation {statement['sympy']}")
            raise ParsingError


def get_new_systems_using_equalities(statements):
    # give all of the statements an index so that they can be re-ordered
    for i, statement in enumerate(statements):
        statement["index"] = i

    # If the user specified equalities, may need to add some additional assignments
    # that represent the solutions to these one or more equations
    # If there are no equalities in the statments list, there is nothing more do do
    if not reduce(lambda accum, new: accum or new["type"] == "equality", statements, False):
        return [statements]

    # Determine what variables we may need to solve for. This is the set 
    # of variables needed for queries minus the set of variables that are already
    # defined through assignments
    variables_needed = set()
    variables_defined = set()
    equality_variables = set()
    equality_exponents = []
    system = []

    for statement in statements:
        if statement["type"] == "assignment":
            variables_defined.add(statement["name"])
        elif statement["type"] == "query":
            variables_needed.update(statement["params"])
        elif statement["type"] == "equality":
            equality_variables.update(statement["params"])
            equality_exponents.extend(statement["exponents"])
            system.append(statement["expression"].subs(
                {exponent["name"]:exponent["expression"] for exponent in statement["exponents"]}))

    variables_needed.difference_update(variables_defined)

    solutions = solve(system, variables_needed, dict=True)

    new_statements = []

    for solution in solutions:
        current_statements = [statement for statement in statements if statement["type"] != "equality"]
        current_index = len(statements)
        for symbol, expression in solution.items():
            current_statements.append({
                "type": "assignment",
                "name": symbol.name,
                "sympy": str(expression),
                "expression": expression,
                "implicitParams": [variable.name for variable in expression.free_symbols if variable.name.startswith("implicit_param_")],
                "params": [variable.name for variable in expression.free_symbols if not variable.name.startswith("implicit_param_")],
                "exponents": equality_exponents,
                "isExponent": False,
                "index": current_index
            })

            current_index += 1

        new_statements.append(current_statements)

    return new_statements


def evaluate_statements(statements):
    num_statements = len(statements)

    if num_statements == 0:
        return []

    parameters = get_all_implicit_parameters(statements)
    parameter_subs = get_parameter_subs(parameters)

    statements = expand_exponent_statements(statements)

    sympify_statements(statements)

    statements_list = get_new_systems_using_equalities(statements)

    statements_list = [get_sorted_statements(statements) for statements in statements_list]

    results_list = []
    for statements in statements_list:
        combined_expressions = []
        exponent_subs = {}
        exponent_dimensionless = {}
        for i, statement in enumerate(statements):
            if statement["type"] == "assignment" and not statement["isExponent"]:
                combined_expressions.append({"index": statement["index"],
                                            "expression": None,
                                            "exponents": []})
                continue

            temp_statements = statements[0: i + 1]

            # sub equations into each other in topological order if there are more than one
            dependency_exponents = statement["exponents"]
            for j, sub_statement in enumerate(reversed(temp_statements)):
                if j == 0:
                    final_expression = sub_statement["expression"]
                elif sub_statement["type"] == "assignment" and not sub_statement["isExponent"]:
                    if sub_statement["name"] in map(lambda x: str(x), final_expression.free_symbols):
                        dependency_exponents.extend(sub_statement["exponents"])
                        final_expression = final_expression.subs(
                            {sub_statement["name"]: sub_statement["expression"]}
                        )

            if statement["isExponent"]:
                dim, _ = dimensional_analysis(parameters, final_expression)
                if dim == "":
                    exponent_dimensionless[statement["name"]] = True
                else:
                    exponent_dimensionless[statement["name"]] = False
                exponent_value = final_expression.evalf(subs=parameter_subs)
                # need to recalculate if expression is zero becuase of sympy issue #21076
                if exponent_value == 0:
                    exponent_value = final_expression.subs(parameter_subs).evalf()

                if exponent_value.is_number:
                    exponent_subs[statement["name"]] = exponent_value
                else:
                    exponent_subs[statement["name"]] = final_expression.subs(parameter_subs)
            else:
                # query statement type
                combined_expressions.append({"index": statement["index"],
                                            "expression": final_expression.subs(exponent_subs),
                                            "exponents": dependency_exponents})

        largest_index = max( [statement["index"] for statement in statements])
        results = [{"value": "", "units": ""}]*(largest_index+1)
        for item in combined_expressions:
            index = item["index"]
            expression = item["expression"]
            exponents = item["exponents"]
            if expression is None:
                if index < len(results):
                    results[index] = {"value": "", "units": ""}
            else:
                if all([exponent_dimensionless[item["name"]] for item in exponents]):
                    dim, dim_latex = dimensional_analysis(parameters, expression)
                else:
                    dim = "Exponent Not Dimensionless"
                    dim_latex = "Exponent Not Dimensionless"

                evaluated_expression = expression.evalf(subs=parameter_subs)
                # need to recalculate if expression is not a number (for infinity case)
                # need to recalculate if expression is zero becuase of sympy issue #21076
                if not evaluated_expression.is_number or evaluated_expression == 0:
                    evaluated_expression = expression.subs(parameter_subs).evalf()
                if evaluated_expression.is_number:
                    if evaluated_expression.is_real and evaluated_expression.is_finite:
                        results[index] = {"value": get_str(evaluated_expression), "numeric": True, "units": dim,
                                        "unitsLatex": dim_latex, "real": True, "finite": True}
                    elif not evaluated_expression.is_finite:
                        results[index] = {"value": latex(evaluated_expression), "numeric": True, "units": dim,
                                        "unitsLatex": dim_latex, "real": evaluated_expression.is_real, "finite": False}
                    else:
                        results[index] = {"value": get_str(evaluated_expression).replace('I', 'i').replace('*', ''),
                                        "numeric": True, "units": dim, "unitsLatex": dim_latex, "real": False}
                else:
                    results[index] = {"value": latex(evaluated_expression), "numeric": False,
                                    "units": "", "unitsLatex": "", "real": False}
        
        results_list.append(results[:num_statements])

    return results_list


def get_query_values(statements):
    error = None

    try:
        results = evaluate_statements(loads(statements))
    except DuplicateAssignment as e:
        error = f"Duplicate assignment of variable {e}"
        results = []
    except ReferenceCycle as e:
        error = "Circular reference detected"
        results = []
    except (ParameterError, ParsingError) as e:
        error = e.__class__.__name__
        results = []
    except Exception as e:
        print(f"Unhandled exception: {e.__class__.__name__}")
        error = f"Unhandled exception: {e.__class__.__name__}"
        results = []
        traceback.print_exc()

    return dumps({"error": error, "results": results})


class FuncContainer(object):
    pass


py_funcs = FuncContainer()
py_funcs.getQueryValues = get_query_values

# pyodide returns last statement as an object that is assessable from javascript
py_funcs
