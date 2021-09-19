from sys import setrecursionlimit

# must be at least 131 to load sympy, cpython is 400 by default
setrecursionlimit(200)

from functools import reduce
import traceback
from copy import deepcopy

from json import loads, dumps

from sympy import Add, Mul, latex, sympify, solve, symbols, Eq

from sympy.printing import pretty

from sympy.core.compatibility import as_int

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

from sympy.utilities.lambdify import lambdify

import numbers


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
                            latex_num = f"{latex_num}\\cdot {new_term}"
                    else:
                        if exp != -1:
                            new_term = f"{name}^{{{-float(exp):g}}}"
                        else:
                            new_term = name
                        if latex_den == "":
                            latex_den = new_term
                        else:
                            latex_den = f"{latex_den}\\cdot {new_term}"

            if latex_den != "":
                if latex_num == "":
                    latex_num = "1"
                unit_latex = f"\\left[ \\frac{{{latex_num}}}{{{latex_den}}}\\right] "
            elif latex_num != "":
                unit_latex = f"\\left[ {latex_num}\\right] "
            else:
                unit_latex = ""
        else:
            if mathjs_unit_name == "":
                unit_latex = ""
            else:
                unit_latex = f"\\left[ {mathjs_unit_name}\\right] "

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


def subtraction_to_addition(expression):

    def walk_tree(grandparent_func, parent_func, expr):
        if grandparent_func is Add and parent_func is Mul and expr.is_negative:
           mult_factor = -1
        else:
            mult_factor = 1

        if len(expr.args) > 0:
            new_args = (walk_tree(parent_func, expr.func, arg) for arg in expr.args)
        else:
            return mult_factor*expr

        return mult_factor*expr.func(*new_args)

    return walk_tree("root", "root", expression)
        

def dimensional_analysis(parameters, expression):
    # sub parameter dimensions
    parameter_subs = {
        param["name"]: get_dims(param["dimensions"]) for param in parameters
    }
    # need to remove any subtractions or unary negative since this may
    # lead to unintentional cancellation during the parameter substituation process
    positive_only_expression = subtraction_to_addition(expression)
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

class NoSolutionFound(Exception):
    pass

class OverDeterminendSystem(Exception):
    pass


def get_sorted_statements(statements):
    defined_params = {}
    for i, statement in enumerate(statements):
        if statement["type"] == "assignment" or statement["type"] == "local_sub":
            if statement["name"] in defined_params:
                raise DuplicateAssignment(statement["name"])
            else:
                defined_params[statement["name"]] = i

    vertices = range(len(statements))
    edges = []

    for i, statement in enumerate(statements):
        if statement["type"] != "equality":
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


def expand_with_sub_statements(statements):
    new_statements = list(statements)

    local_sub_statements = {}

    for statement in statements:
        new_statements.extend(statement["exponents"])
        new_statements.extend(statement.get("functions", []))
        new_statements.extend(statement.get("arguments", []))
        for local_sub in statement.get("localSubs", []):
            combined_sub = local_sub_statements.setdefault(local_sub["parameter"], 
                              {"type": "local_sub", "name": local_sub["parameter"],
                               "params": [], "function_subs": {},
                               "isExponent": False })
            combined_sub["params"].append(local_sub["argument"])
            function_subs = combined_sub["function_subs"]
            current_sub = function_subs.setdefault(local_sub["function"], {})
            current_sub[local_sub["parameter"]] = local_sub["argument"]

    new_statements.extend(local_sub_statements.values())

    return new_statements


def as_int_if_int(expr):
    try:
        return sympify(as_int(expr, strict=False))
    except ValueError as e:
        return expr


def get_str(expr):
    return pretty(as_int_if_int(expr), full_prec=False, use_unicode=False)


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
        if statement["type"] != "local_sub":
            try:
                statement["expression"] = sympify(statement["sympy"], rational=True)
            except SyntaxError:
                print(f"Parsing error for equation {statement['sympy']}")
                raise ParsingError


def remove_implicit_and_exponent(input_set):
    return {variable for variable in input_set 
            if not variable.startswith( ("implicit_param_", "exponent_") )}

def get_new_systems_using_equalities(statements):
    # give all of the statements an index so that they can be re-ordered
    for i, statement in enumerate(statements):
        statement["index"] = i

    # If any of the assignment statements contain the same param on both the lhs and rhs,
    # permanently change to an equality
    for statement in statements:
        if statement["type"] == "assignment" and not statement["name"].startswith('exponent_') and \
           not statement.get("isFunction", False) and not statement.get("isFunctionArgument", False):
            if statement["name"] in statement["params"]:
                statement["type"] = "equality"
                statement["expression"] = Eq(symbols(statement["name"]), statement["expression"])
                statement["sympy"] = str(statement["expression"])
                statement["params"].append(statement["name"])

    query_variables = set()
    assignment_rhs_variables = set()
    defined_variables = set()
    for statement in statements:
        if statement["type"] == "query":
            query_variables.update(statement["params"])
        elif statement["type"] == "assignment" and not statement["name"].startswith('exponent_') and \
             not statement.get("isFunction", False) and not statement.get("isFunctionArgument", False):
            assignment_rhs_variables.update(statement["params"])
            defined_variables.add(statement["name"])
        elif statement.get("isFunction", False):
            if statement["name"] in query_variables:
                query_variables.remove(statement["name"])
            query_variables.update(statement["sympy"])


    query_variables = remove_implicit_and_exponent(query_variables)
    assignment_rhs_variables = remove_implicit_and_exponent(assignment_rhs_variables)


    # If the user specified equalities or is querying from the rhs of an assignment, 
    # may need to add some additional assignments that represent the solutions to these 
    # one or more equations. 
    # If there are no equalities or query from the rhs of an assignment,
    # there is nothing more do do.
    if (not reduce(lambda accum, new: accum or new["type"] == "equality", statements, False) and
       len((query_variables & assignment_rhs_variables) - defined_variables) == 0):
        return [statements]


    # If any assignments have have query variables on the RHS, permanently turn into an equality
    if len((query_variables & assignment_rhs_variables) - defined_variables) > 0:
        for statement in statements:
            if statement["type"] == "assignment" and not statement["name"].startswith('exponent_'):
                if len((query_variables & set(statement["params"])) - defined_variables) > 0:
                    statement["type"] = "equality"
                    statement["expression"] = Eq(symbols(statement["name"]), statement["expression"])
                    statement["sympy"] = str(statement["expression"])
                    statement["params"].append(statement["name"])


    changed = True
    removed_assignments = {}
    while changed:
        changed = False

        num_equalities = 0
        equality_variables = set()
        equality_exponents = []

        for statement in statements:
            if statement["type"] == "equality":
                num_equalities += 1
                equality_variables.update(statement["params"])
                equality_exponents.extend(statement["exponents"])

        # If any assignments have a variable from the equalities on the LHS or RHS, 
        # it needs to converted to an equality otherwise a circular reference may be created
        for statement in statements:
            if statement["type"] == "assignment" and not statement["isExponent"] \
               and not statement.get("isFunction", False) \
               and not statement.get("isFunctionArgument", False):
                if len(equality_variables & set([ *statement["params"], statement["name"] ])) > 0:
                    changed = True
                    removed_assignments[statement["name"]] = deepcopy(statement)
                    statement["type"] = "equality"
                    statement["expression"] = Eq(symbols(statement["name"]), statement["expression"])
                    statement["sympy"] = str(statement["expression"])
                    statement["params"].append(statement["name"])

    variables_defined = set()
    system = []
    for statement in statements:
        if statement["type"] == "equality":
            equality_variables.update(statement["params"])

            system.append(statement["expression"].subs(
                {exponent["name"]:exponent["expression"] for exponent in statement["exponents"]}))
        elif statement["type"] == "assignment" and not statement.get("isFunction", False) and \
             not statement.get("isFunctionArgument", False):
            variables_defined.add(statement["name"])
        elif statement.get("isFunction", False):
            variables_defined.update(statement["functionParameters"])


    # remove implicit parameters before solving
    equality_variables = remove_implicit_and_exponent(equality_variables)

    solutions = []
    if num_equalities < len(equality_variables) and \
       len ((equality_variables & query_variables) - variables_defined) > 0:
        # underdefined system, solve for query variables in terms of others
        solutions = solve(system, (equality_variables & query_variables) - variables_defined, 
                          dict=True)
    
    if len(solutions) == 0:
        solutions = solve(system, equality_variables - variables_defined, dict=True)

    if len(solutions) == 0:
        if num_equalities > len(equality_variables):
            raise OverDeterminendSystem
        else:
            raise NoSolutionFound

    new_statements = []

    for solution in solutions:
        current_statements = [deepcopy(statement) for statement in statements if statement["type"] != "equality"]
        current_index = len(statements)
        solution_names = set()
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
            
            solution_names.add(symbol.name)

            current_index += 1

        # Add back any assignments that do not occur in the solutions.
        # This avoids cyclical assigments while enabling some underdetermined
        # systems to provide exact numeric solutions.
        assignments_to_keep = set(removed_assignments.keys()) - solution_names
        for name in assignments_to_keep:
            removed_assignments[name]["index"] = current_index
            current_statements.append(removed_assignments[name].copy())
            current_index += 1

        new_statements.append(current_statements)

    return new_statements


def combine_multiple_solutions(results_list):
    if len(results_list) == 0:
        return []
    
    num_solutions = len(results_list)
    
    if num_solutions  == 1:
        return results_list[0]

    results = []

    num_statements = len(results_list[0])

    for j in range(num_statements):
        if results_list[0][j].get("plot", False):
            current_result = results_list[0][j]

            for i in range(1, num_solutions):
                current_result["data"].append(results_list[i][j]["data"][0])

            results.append(current_result)

        elif len({results_list[i][j]["value"]:i for i in range(num_solutions)}) > 1:
            current_result = results_list[0][j]

            for i in range(1, num_solutions):
                current_result["value"] += f",\\ {results_list[i][j]['value']}"
                current_result["numeric"] = current_result["numeric"] and results_list[i][j]["numeric"]
                current_result["finite"] = current_result["finite"] and results_list[i][j]["finite"]
                current_result["real"] = current_result["real"] and results_list[i][j]["real"]

            # units should be the same for all of the solutions, otherwise there is a dimension error
            if len({results_list[i][j]["units"] for i in range(num_solutions)}) > 1:
                current_result["units"] = "Dimension Error"
                current_result["unitsLatex"] = "Dimension Error"

            results.append(current_result)
        else:
            results.append(results_list[0][j])

    return results


def get_range_result(range_result, range_dependencies, num_points):
    # check that upper and lower limits of range input are real and finite
    # and that units match
    lower_limit_result = range_dependencies[range_result["lowerLimitArgument"]]
    lower_limit_inclusive = range_result["lowerLimitInclusive"]
    upper_limit_result = range_dependencies[range_result["upperLimitArgument"]]
    upper_limit_inclusive = range_result["upperLimitInclusive"]
    units_result = range_dependencies[range_result["unitsQueryFunction"]]

    if not all(map(lambda value: value["numeric"] and value["real"] and value["finite"], 
                   [lower_limit_result, upper_limit_result])):
        return {"plot": True, "data": [{"numericOuput": False, "numericInput": False,
                "limitsUnitsMatch": False, "input": [], "output": [], 
                "inputUnits": "", "inputUnitsLatex": "", "inputName": "",
                "outputUnits": "", "outputUnitsLatex": "", "outputName": ""}] }

    if lower_limit_result["units"] != upper_limit_result["units"]:
        return {"plot": True, "data": [{"numericOutput": False, "numericInput": True,
                "limitsUnitsMatch": False, "input": [],  "output": [], 
                "inputUnits": "", "inputUnitsLatex": "", "inputName": "",
                "outputUnits": "", "outputUnitsLatex": "", "outputName": ""}] }

    lower_limit = float(lower_limit_result["value"])
    upper_limit = float(upper_limit_result["value"])

    input_range = upper_limit - lower_limit

    if not lower_limit_inclusive:
        lower_limit = lower_limit + (input_range)*.025

    if not upper_limit_inclusive:
        upper_limit = upper_limit - (input_range)*.025

    input_values = [lower_limit,]
    delta = (upper_limit - lower_limit)/(num_points-1)
    for i in range(num_points-1):
        input_values.append(input_values[-1] + delta)

    lambda_error = False
    try:
        range_function = lambdify(range_result["freeParameter"], range_result["expression"], 
                                  modules=["math", "mpmath", "sympy"])
    except KeyError:
        lambda_error = True

    if not lambda_error:
        output_values = []
        try:
            for input in input_values:
                output_values.append(float(range_function(input)))
        except TypeError:
            lambda_error = True

    if lambda_error or not all(map(lambda value: isinstance(value, numbers.Number), output_values)):
        return {"plot": True, "data": [{"numericOutput": False, "numericInput": True,
                "limitsUnitsMatch": True, "input": input_values,  "output": [], 
                "inputUnits": "", "inputUnitsLatex": "", "inputName": range_result["freeParameter"],
                "outputUnits": "", "outputUnitsLatex": "", "outputName": range_result["outputName"]}] }

    return {"plot": True, "data": [{"numericOutput": True, "numericInput": True,
            "limitsUnitsMatch": True, "input": input_values,  "output": output_values, 
            "inputUnits": lower_limit_result["units"], "inputUnitsLatex": lower_limit_result["unitsLatex"],
            "inputName": range_result["freeParameter"],
            "outputUnits": units_result["units"], "outputUnitsLatex": units_result["unitsLatex"],
            "outputName": range_result["outputName"]}] }


def combine_plot_results(results, statement_plot_info):
    final_results = []

    plot_cell_id = -1
    for index, result in enumerate(results):
        if not statement_plot_info[index]["isFromPlotCell"]:
            final_results.append(result)
            plot_cell_id = -1
        elif statement_plot_info[index]["id"] == plot_cell_id:
            final_results[-1].append(result)
        else:
            final_results.append([result,])
            plot_cell_id = statement_plot_info[index]["id"]

    return final_results


def evaluate_statements(statements):
    num_statements = len(statements)

    if num_statements == 0:
        return []

    statement_plot_info = [{"isFromPlotCell": statement["isFromPlotCell"],
                            "id": statement["id"],
                            "subId": statement["subId"]} for statement in statements]

    parameters = get_all_implicit_parameters(statements)
    parameter_subs = get_parameter_subs(parameters)

    statements = expand_with_sub_statements(statements)

    sympify_statements(statements)

    statements_list = get_new_systems_using_equalities(statements)

    statements_list = [get_sorted_statements(statements) for statements in statements_list]

    results_list = []
    for statements in statements_list:
        combined_expressions = []
        exponent_subs = {}
        exponent_dimensionless = {}
        function_exponent_replacements = {}
        for i, statement in enumerate(statements):
            if statement["type"] == "local_sub":
                continue

            if statement["type"] == "assignment" and not statement["isExponent"] and \
               not statement.get("isFunction", False):
                combined_expressions.append({"index": statement["index"],
                                            "expression": None,
                                            "exponents": []})
                continue

            temp_statements = statements[0: i + 1]

            # sub equations into each other in topological order if there are more than one
            if statement.get("isFunction", False):
                is_function = True
                function_name = statement["name"]
                is_exponent = False
            elif statement["isExponent"]:
                is_exponent = True
                exponent_name = statement["name"]
                is_function = False
            else:
                is_exponent = False
                is_function = False
            dependency_exponents = statement["exponents"]
            new_function_exponents = {}
            for j, sub_statement in enumerate(reversed(temp_statements)):
                if j == 0:
                    final_expression = sub_statement["expression"]
                elif (sub_statement["type"] == "assignment" or ((is_function or is_exponent) and sub_statement["type"] == "local_sub")) \
                     and not sub_statement["isExponent"]:

                    if sub_statement["type"] == "local_sub":
                        if is_function:
                            current_local_subs = sub_statement["function_subs"].get(function_name, {})
                            if len(current_local_subs) > 0:
                                final_expression = final_expression.subs(current_local_subs)
                        elif is_exponent:
                            for local_sub_function_name, function_local_subs in sub_statement["function_subs"].items():
                                function_exponent_expression = new_function_exponents.setdefault(local_sub_function_name, final_expression)
                                new_function_exponents[local_sub_function_name] = function_exponent_expression.subs(function_local_subs)

                    else:
                        if sub_statement["name"] in map(lambda x: str(x), final_expression.free_symbols):
                            dependency_exponents.extend(sub_statement["exponents"])
                            final_expression = final_expression.subs(
                                {sub_statement["name"]: sub_statement["expression"]}
                            )
                    
                        if is_exponent:
                            new_function_exponents = {
                                key:expression.subs({sub_statement["name"]: sub_statement["expression"]}) for
                                key, expression in new_function_exponents.items()
                            }


            if is_exponent:
                for current_function_name in new_function_exponents.keys():
                    function_exponent_replacements.setdefault(current_function_name, {}).update(
                        {exponent_name:exponent_name+current_function_name}
                    )

                new_function_exponents[''] = final_expression

                for current_function_name, final_expression in new_function_exponents.items():
                    while(True):
                        available_exonponent_subs = set(function_exponent_replacements.get(current_function_name, {}).keys()) & \
                                                    set(map(lambda x: str(x), final_expression.free_symbols))
                        if len(available_exonponent_subs) == 0:
                            break
                        final_expression = final_expression.subs(function_exponent_replacements[current_function_name])
                        final_expression = final_expression.subs(exponent_subs)

                    final_expression = final_expression.subs(exponent_subs)
                    final_expression = final_expression.doit()   #evaluate integrals and derivatives
                    dim, _ = dimensional_analysis(parameters, final_expression)
                    if dim == "":
                        exponent_dimensionless[exponent_name+current_function_name] = True
                    else:
                        exponent_dimensionless[exponent_name+current_function_name] = False
                    exponent_value = final_expression.evalf(subs=parameter_subs)
                    # need to recalculate if expression is zero becuase of sympy issue #21076
                    if exponent_value == 0:
                        exponent_value = final_expression.subs(parameter_subs).evalf()

                    if exponent_value.is_number:
                        exponent_value = as_int_if_int(exponent_value)
                        exponent_subs[exponent_name+current_function_name] = exponent_value
                    else:
                        exponent_subs[exponent_name+current_function_name] = final_expression.subs(parameter_subs)

            elif is_function:
                while(True):
                    available_exonponent_subs = set(function_exponent_replacements.get(function_name, {}).keys()) & \
                                                set(map(lambda x: str(x), final_expression.free_symbols))
                    if len(available_exonponent_subs) == 0:
                        break
                    final_expression = final_expression.subs(function_exponent_replacements[function_name])
                    statement["exponents"].extend([{"name": function_exponent_replacements[function_name][key]} for key in available_exonponent_subs])
                    final_expression = final_expression.subs(exponent_subs)
                if function_name in function_exponent_replacements:
                    for exponent_i, exponent in enumerate(statement["exponents"]):
                        if exponent["name"] in function_exponent_replacements[function_name]:
                            statement["exponents"][exponent_i] = {"name": function_exponent_replacements[function_name][exponent["name"]]}
                statement["expression"] = final_expression

            elif statement["type"] == "query":
                current_combined_expression = {"index": statement["index"],
                                               "expression": final_expression.subs(exponent_subs),
                                               "exponents": dependency_exponents,
                                               "isRange": statement.get("isRange", False),
                                               "isFunctionArgument": statement.get("isFunctionArgument", False),
                                               "isUnitsQuery": statement.get("isUnitsQuery", False)
                                              }

                if current_combined_expression["isFunctionArgument"]:
                    current_combined_expression["name"] = statement["name"]

                if current_combined_expression["isUnitsQuery"]:
                    current_combined_expression["name"] = statement["sympy"]

                if current_combined_expression["isRange"]:
                    current_combined_expression["numPoints"] = statement["numPoints"]
                    current_combined_expression["freeParameter"] = statement["freeParameter"]
                    current_combined_expression["outputName"] = statement["outputName"]
                    current_combined_expression["lowerLimitArgument"] = statement["lowerLimitArgument"]
                    current_combined_expression["upperLimitArgument"] = statement["upperLimitArgument"]
                    current_combined_expression["lowerLimitInclusive"] = statement["lowerLimitInclusive"]
                    current_combined_expression["upperLimitInclusive"] = statement["upperLimitInclusive"]
                    current_combined_expression["unitsQueryFunction"] = statement["unitsQueryFunction"]

                combined_expressions.append(current_combined_expression)

        range_dependencies = {}
        range_results = {} 
        largest_index = max( [statement["index"] for statement in statements])
        results = [{"value": "", "units": "", "numeric": False, "real": False, "finite": False}]*(largest_index+1)
        for item in combined_expressions:
            index = item["index"]
            expression = item["expression"]
            exponents = item["exponents"]
            if expression is None:
                if index < len(results):
                    results[index] = {"value": "", "units": "", "numeric": False, "real": False, "finite": False}
            else:
                expression = expression.doit() #evaluate integrals and derivatives
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
                                        "numeric": True, "units": dim, "unitsLatex": dim_latex, "real": False, 
                                        "finite": evaluated_expression.is_finite}
                else:
                    results[index] = {"value": latex(evaluated_expression), "numeric": False,
                                    "units": "", "unitsLatex": "", "real": False, "finite": False}

                if item["isRange"]:
                    current_result = item
                    current_result["expression"] = evaluated_expression
                    range_results[index] = current_result

                if item["isFunctionArgument"] or item["isUnitsQuery"]:
                    range_dependencies[item["name"]] = results[index]

        for index,range_result in range_results.items():
            results[index] = get_range_result(range_result, range_dependencies, range_result["numPoints"])
            
        results_list.append(results[:num_statements])

    return combine_plot_results(combine_multiple_solutions(results_list), statement_plot_info)


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
    except OverDeterminendSystem as e:
        error = "Cannot solve overdetermined system"
        results = []
    except NoSolutionFound as e:
        error = "Unable to solve system of equations"
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
