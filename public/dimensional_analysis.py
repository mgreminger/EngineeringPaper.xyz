from sys import setrecursionlimit

# must be at least 131 to load sympy, cpython is 400 by default
setrecursionlimit(200)

from functools import reduce, lru_cache
import traceback
from copy import deepcopy

from json import loads, dumps

from sympy import (
    Add, 
    Mul, 
    latex, 
    sympify, 
    solve,
    nsolve,
    symbols, 
    Eq, 
    Function, 
    Max, 
    Min,
    Piecewise,
    And,
    StrictLessThan,
    LessThan,
    StrictGreaterThan,
    GreaterThan,
    asin,
    acos,
    atan,
    acsc,
    acot,
    asec,
    arg,
    re,
    im,
    conjugate
)

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

from sympy.utilities.lambdify import lambdify

from sympy.utilities.misc import as_int

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

# num of digits to round to for unit exponents
# this makes sure units with a very small difference are identified as the same
EXP_NUM_DIGITS = 12
# threshold to consider floating point unit exponent as an int
EXP_INT_THRESHOLD = 1e-12

def round_exp(value):
    value = round(value, EXP_NUM_DIGITS)

    if abs(int(value) - value) < EXP_INT_THRESHOLD:
        value = int(value)

    return value

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

    mathjs_dims = [round_exp(exp) for exp in mathjs_dims]

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


def custom_latex(expression):
    piecewise = Function('piecewise')
    new_expression = expression.replace(Piecewise, piecewise)

    result_latex = latex(new_expression)

    result_latex = result_latex.replace('_{as variable}','')

    return result_latex

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


def replace_placeholders_in_args(dim_func):
    def new_func(*args):
        return dim_func( *(replace_placeholder_funcs_with_dim_funcs(arg) for arg in args) )

    return new_func

@replace_placeholders_in_args
def ensure_dims_all_compatible(*args):
    if args[0].is_zero:
        if all(arg.is_zero for arg in args):
            first_arg = sympify('0')
        else:
            first_arg = sympify('1')
    else:
        first_arg = args[0]
    
    if len(args) == 1:
        return first_arg

    first_arg_dims = dimsys_SI.get_dimensional_dependencies(first_arg)
    if all(dimsys_SI.get_dimensional_dependencies(arg) == first_arg_dims for arg in args[1:]):
        return first_arg

    raise TypeError

@replace_placeholders_in_args
def ensure_dims_all_compatible_piecewise(*args):
    # Need to make sure first element in tuples passed to Piecewise all have compatible units
    # The second element of the tuples has already been checked by And, StrictLessThan, etc.
    return ensure_dims_all_compatible(*[arg[0] for arg in args])

@replace_placeholders_in_args
def ensure_unitless_in_angle_out(arg):
    if dimsys_SI.get_dimensional_dependencies(arg) == {}:
        return angle
    else:
        raise TypeError

@replace_placeholders_in_args
def ensure_any_unit_in_angle_out(arg):
    # ensure input arg units make sense (will raise if inconsistent)
    dimsys_SI.get_dimensional_dependencies(arg)
    
    return angle

@replace_placeholders_in_args
def ensure_any_unit_in_same_out(arg):
    # ensure input arg units make sense (will raise if inconsistent)
    dimsys_SI.get_dimensional_dependencies(arg)
    
    return arg


placeholder_map = {
    Function('_StrictLessThan') : {"dim_func": ensure_dims_all_compatible, "sympy_func": StrictLessThan},
    Function('_LessThan') : {"dim_func": ensure_dims_all_compatible, "sympy_func": LessThan},
    Function('_StrictGreaterThan') : {"dim_func": ensure_dims_all_compatible, "sympy_func": StrictGreaterThan},
    Function('_GreaterThan') : {"dim_func": ensure_dims_all_compatible, "sympy_func": GreaterThan},
    Function('_And') : {"dim_func": ensure_dims_all_compatible, "sympy_func": And},
    Function('_Piecewise') : {"dim_func": ensure_dims_all_compatible_piecewise, "sympy_func": Piecewise},
    Function('_asin') : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": asin},
    Function('_acos') : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": acos},
    Function('_atan') : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": atan},
    Function('_asec') : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": asec},
    Function('_acsc') : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": acsc},
    Function('_acot') : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": acot},
    Function('_arg') : {"dim_func": ensure_any_unit_in_angle_out, "sympy_func": arg},
    Function('_re') : {"dim_func": ensure_any_unit_in_same_out, "sympy_func": re},
    Function('_im') : {"dim_func": ensure_any_unit_in_same_out, "sympy_func": im},
    Function('_conjugate') : {"dim_func": ensure_any_unit_in_same_out, "sympy_func": conjugate},
    Function('_Max') : {"dim_func": ensure_dims_all_compatible, "sympy_func": Max},
    Function('_Min') : {"dim_func": ensure_dims_all_compatible, "sympy_func": Min}
}


def replace_placeholder_funcs(expression):
    for key, value in placeholder_map.items():
        expression = expression.replace(key, value["sympy_func"])

    return expression

def replace_placeholder_funcs_with_dim_funcs(expression):
    for key, value in placeholder_map.items():
        expression = expression.replace(key, value["dim_func"])

    return expression

def dimensional_analysis(parameter_subs, expression):
    # need to remove any subtractions or unary negative since this may
    # lead to unintentional cancellation during the parameter substituation process
    positive_only_expression = subtraction_to_addition(expression)

    final_expression = positive_only_expression.subs(parameter_subs)

    try:
        # Now that dims have been substituted in, can process functions that require special handling
        final_expression = replace_placeholder_funcs_with_dim_funcs(final_expression)

        # Finally, evaluate dimensions for complete expression
        result, result_latex = get_mathjs_units(
            dimsys_SI.get_dimensional_dependencies(final_expression)
        )
    except TypeError as e:
        print(e)
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

class OverDeterminedSystem(Exception):
    pass

class UnderDeterminedSystem(Exception):
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

    included_exponents = set()

    for statement in statements:
        # need to prevent inclusion of already included exponents since solving a system of equations
        # will repeat exponents for each variable that is solved for
        for exponent in statement["exponents"]:
            if exponent["name"] not in included_exponents:
                new_statements.append(exponent)
        included_exponents.update([exponent["name"] for exponent in statement["exponents"]])

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


def sympify_statements(statements, sympify_exponents=False):
    for i, statement in enumerate(statements):
        statement["index"] = i
        if statement["type"] != "local_sub":
            try:
                statement["expression"] = sympify(statement["sympy"], rational=True)
                if sympify_exponents:
                    for exponent in statement["exponents"]:
                        exponent["expression"] = sympify(exponent["sympy"], rational=True)
            except SyntaxError:
                print(f"Parsing error for equation {statement['sympy']}")
                raise ParsingError


def remove_implicit_and_exponent(input_set):
    return {variable for variable in input_set 
            if not variable.startswith( ("implicit_param__", "exponent__") )}


def solve_system(statements, variables):
    parameters = get_all_implicit_parameters(statements)
    parameter_subs = get_parameter_subs(parameters)

    sympify_statements(statements, sympify_exponents=True)

    # give all of the statements an index so that they can be re-ordered
    for i, statement in enumerate(statements):
        statement["index"] = i

    # define system of equations for sympy.solve function
    # substitute in all exponents and placeholder functions
    system_exponents = []
    system_implicit_params = []
    system_variables = set()
    system = []
    for statement in statements:
        system_variables.update(statement["params"])
        system_exponents.extend(statement["exponents"])
        system_implicit_params.extend(statement["implicitParams"])

        equality = statement["expression"].subs(
            {exponent["name"]:exponent["expression"] for exponent in statement["exponents"]})
        equality = replace_placeholder_funcs(equality)

        system.append(equality)

    # remove implicit parameters before solving
    system_variables = remove_implicit_and_exponent(system_variables)

    solutions = []
    solutions = solve(system, variables, dict=True)

    if len(solutions) == 0:
        if len(statements) > len(system_variables):
            raise OverDeterminedSystem
        else:
            raise NoSolutionFound

    new_statements = []
    for solution in solutions:
        current_statements = []
        counter = 0
        for symbol, expression in solution.items():

            # latex rep to display to user
            display_expression = custom_latex(expression.subs(parameter_subs));

            # replace some sympy functions with placeholders for dimensional analysis
            for key, value in placeholder_map.items():
                expression = expression.replace(value["sympy_func"], key)

            current_statements.append({
                "id": -2, # use -2 since this isn't tied to a particular cell (only used for collecting plot data anyway)
                "subId": 0,
                "type": "assignment",
                "name": symbol.name,
                "sympy": str(expression),
                "expression": expression,
                "implicitParams": system_implicit_params if counter == 0 else [], # only include for one variable in solution to prevent dups
                "params": [variable.name for variable in expression.free_symbols],
                "exponents": system_exponents,
                "isExponent": False,
                "isFunction": False,
                "isFunctionArgument": False,
                "isRange": False,
                "isFromPlotCell": False,
                "display": display_expression,
                "displayName": custom_latex(symbol)
            })

            counter += 1

        new_statements.append(current_statements)

    return new_statements


def solve_system_numerical(statements, variables, guesses, guess_statements):
    parameters = get_all_implicit_parameters([*statements, *guess_statements])
    parameter_subs = get_parameter_subs(parameters)

    sympify_statements(statements, sympify_exponents=True)

    # give all of the statements an index so that they can be re-ordered
    for i, statement in enumerate(statements):
        statement["index"] = i

    # define system of equations for sympy.solve function
    # substitute in all exponents, implicit params, and placeholder functions
    # add equalityUnitsQueries to new_statements that will be added to the whole sheet
    system_exponents = []
    system_variables = set()
    system = []
    new_statements = []
    for statement in statements:
        system_variables.update(statement["params"])
        system_exponents.extend(statement["exponents"])

        equality = statement["expression"].subs(
            {exponent["name"]: exponent["expression"] for exponent in statement["exponents"]})
        equality = equality.subs(parameter_subs)
        equality = replace_placeholder_funcs(equality)
        system.append(equality)
        new_statements.extend(statement["equalityUnitsQueries"])

    # remove implicit parameters before solving
    system_variables = remove_implicit_and_exponent(system_variables)

    solutions = []
    try:
        solutions = nsolve(system, variables, guesses, dict=True)
    except Exception as e:
        if (len(system_variables) > len(variables)) or (len(variables) > len(system)):
            raise UnderDeterminedSystem
        elif (len(system) > len(variables)) or (len(system) > len(system_variables)):
            raise OverDeterminedSystem
        else:
            raise e


    if len(solutions) == 0:
        if len(statements) > len(system_variables):
            raise OverDeterminedSystem
        else:
            raise NoSolutionFound

    display_solutions = {}
    implicit_params_to_update = {}
    for symbol, value in solutions[0].items():
        display_solutions[symbol] = [get_str(value)]

        for guess_statement in guess_statements:
            if symbol == guess_statement["name"]:
                if guess_statement["sympy"].startswith("implicit_param__"):
                    implicit_params_to_update[guess_statement["sympy"]] = value
                else:
                    guess_statement["sympy"] = str(value)
                new_statements.append(guess_statement)
                break

    # update implicit parameters with solve solution (they currently hold the guess values)
    for parameter in parameters:
        if parameter["name"] in implicit_params_to_update:
            parameter["si_value"] = str(implicit_params_to_update[parameter["name"]])

    # can only have implicit params in one place or there will be duplicates 
    for i, statement in enumerate(new_statements):
        statement["id"] = -2 # id only needed for plot cells 
        if i == 0:
            statement["implicitParams"] = parameters
        else:
            statement["implicitParams"] = []
        
    return [new_statements], display_solutions


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
    except Exception:
        lambda_error = True

    if not lambda_error:
        output_values = []
        try:
            for input in input_values:
                output_values.append(float(range_function(input)))
        except Exception:
            lambda_error = True

    if lambda_error or not all(map(lambda value: isinstance(value, numbers.Number), output_values)):
        return {"plot": True, "data": [{"numericOutput": False, "numericInput": True,
                "limitsUnitsMatch": True, "input": input_values,  "output": [], 
                "inputUnits": "", "inputUnitsLatex": "", "inputName": range_result["freeParameter"].removesuffix('_as_variable'),
                "outputUnits": "", "outputUnitsLatex": "", "outputName": range_result["outputName"].removesuffix('_as_variable')}] }

    return {"plot": True, "data": [{"numericOutput": True, "numericInput": True,
            "limitsUnitsMatch": True, "input": input_values,  "output": output_values, 
            "inputUnits": lower_limit_result["units"], "inputUnitsLatex": lower_limit_result["unitsLatex"],
            "inputName": range_result["freeParameter"].removesuffix('_as_variable'),
            "outputUnits": units_result["units"], "outputUnitsLatex": units_result["unitsLatex"],
            "outputName": range_result["outputName"].removesuffix('_as_variable')}] }


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


def evaluate_statements(statements, equation_to_system_cell_map):
    num_statements = len(statements)

    if num_statements == 0:
        return [], {}

    statement_plot_info = [{"isFromPlotCell": statement["isFromPlotCell"],
                            "id": statement["id"],
                            "subId": statement["subId"]} for statement in statements]

    parameters = get_all_implicit_parameters(statements)
    parameter_subs = get_parameter_subs(parameters)
    dimensional_analysis_subs = {
        param["name"]: get_dims(param["dimensions"]) for param in parameters
    }

    statements = expand_with_sub_statements(statements)

    sympify_statements(statements)

    statements = get_sorted_statements(statements)

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
                dim, _ = dimensional_analysis(dimensional_analysis_subs, final_expression)
                if dim == "":
                    exponent_dimensionless[exponent_name+current_function_name] = True
                else:
                    exponent_dimensionless[exponent_name+current_function_name] = False
                final_expression = replace_placeholder_funcs(final_expression)
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
                                            "isUnitsQuery": statement.get("isUnitsQuery", False),
                                            "isEqualityUnitsQuery": statement.get("isEqualityUnitsQuery", False),
                                            "equationIndex": statement.get("equationIndex", 0)
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
    numerical_system_cell_errors = {}
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
                dim, dim_latex = dimensional_analysis(dimensional_analysis_subs, expression)
            else:
                dim = "Exponent Not Dimensionless"
                dim_latex = "Exponent Not Dimensionless"

            expression = replace_placeholder_funcs(expression)
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
                    results[index] = {"value": custom_latex(evaluated_expression), "numeric": True, "units": dim,
                                    "unitsLatex": dim_latex, "real": evaluated_expression.is_real, "finite": False}
                else:
                    results[index] = {"value": get_str(evaluated_expression).replace('I', 'i').replace('*', ''),
                                    "numeric": True, "units": dim, "unitsLatex": dim_latex, "real": False, 
                                    "realPart": get_str(re(evaluated_expression)), "imagPart": get_str(im(evaluated_expression)),
                                    "finite": evaluated_expression.is_finite}
            else:
                results[index] = {"value": custom_latex(evaluated_expression), "numeric": False,
                                "units": "", "unitsLatex": "", "real": False, "finite": False}

            if item["isRange"]:
                current_result = item
                current_result["expression"] = evaluated_expression
                range_results[index] = current_result

            if item["isFunctionArgument"] or item["isUnitsQuery"]:
                range_dependencies[item["name"]] = results[index]

            if item["isEqualityUnitsQuery"]:
                units_list = numerical_system_cell_errors.setdefault(item["equationIndex"], [])
                units_list.append(results[index]["units"])

    for equation_index, units in numerical_system_cell_errors.items():
        # set should have length of 3 if there is no error (LHS and RHS are the same and there isn't an error)
        units = set(units)
        if len(units) == 1:
            if "Dimension Error" not in units and "Exponent Not Dimensionless" not in units:
                error = False
            else:
                error = True
        else:
            error = True
        numerical_system_cell_errors[equation_index] = error

    for index,range_result in range_results.items():
        results[index] = get_range_result(range_result, range_dependencies, range_result["numPoints"])

    return combine_plot_results(results[:num_statements], statement_plot_info), numerical_system_cell_errors


def get_query_values(statements, equation_to_system_cell_map):
    error = None

    results = []
    numerical_system_cell_errors = {}
    try:
        results, numerical_system_cell_errors = evaluate_statements(statements, equation_to_system_cell_map)
    except DuplicateAssignment as e:
        error = f"Duplicate assignment of variable {e}"
    except ReferenceCycle as e:
        error = "Circular reference detected"
    except (ParameterError, ParsingError) as e:
        error = e.__class__.__name__
    except OverDeterminedSystem as e:
        error = "Cannot solve overdetermined system"
    except NoSolutionFound as e:
        error = "Unable to solve system of equations"
    except Exception as e:
        print(f"Unhandled exception: {type(e).__name__}, {e}")
        error = f"Unhandled exception: {type(e).__name__}, {e}"
        traceback.print_exc()

    return error, results, numerical_system_cell_errors


@lru_cache(maxsize=1024)
def get_system_solution(statements, variables):
    statements = loads(statements)
    variables = loads(variables)

    error = None

    try:
        new_statements = solve_system(statements, variables)
    except (ParameterError, ParsingError) as e:
        error = e.__class__.__name__
        new_statements = []
    except OverDeterminedSystem as e:
        error = "Cannot solve overdetermined system"
        new_statements = []
    except NoSolutionFound as e:
        error = "Unable to solve system of equations"
        new_statements = []
    except Exception as e:
        print(f"Unhandled exception: {type(e).__name__}, {e}")
        error = f"Unhandled exception: {type(e).__name__}, {e}"
        new_statements = []
        traceback.print_exc()

    if error is None:
        num_solutions = len(new_statements)
        display_solutions = {}
        for index, solution in enumerate(new_statements):
            for statement in solution:
                current_var_solutions = display_solutions.setdefault(statement["displayName"], [""]*num_solutions)
                current_var_solutions[index] = statement["display"]
    
    else:
        display_solutions = {}

    return error, new_statements, display_solutions


@lru_cache(maxsize=1024)
def get_system_solution_numerical(statements, variables, guesses, guessStatements):
    statements = loads(statements)
    variables = loads(variables)
    guesses = loads(guesses)
    guess_statements = loads(guessStatements)

    error = None

    new_statements = []
    display_solutions = {}
    try:
        new_statements, display_solutions = solve_system_numerical(statements, variables, guesses, guess_statements)
    except (ParameterError, ParsingError) as e:
        error = e.__class__.__name__
    except OverDeterminedSystem as e:
        error = "Cannot solve overdetermined system, the number of equations should match the number of unknowns"
    except UnderDeterminedSystem as e:
        error = "Cannot solve underdetermined system, the number of equations should match the number of unknowns"
    except (NoSolutionFound, NotImplementedError) as e:
        error = "Unable to solve system of equations"
    except Exception as e:
        print(f"Solve error: {type(e).__name__}, {e}")
        error = f"Solve error: {type(e).__name__}, {e}"
        traceback.print_exc()

    return error, new_statements, display_solutions


def solve_sheet(statements_and_systems):
    statements_and_systems = loads(statements_and_systems)
    statements = statements_and_systems["statements"]
    system_definitions = statements_and_systems["systemDefinitions"]

    system_results = []
    equation_to_system_cell_map = {}
    # Solve any systems first
    for i, system_definition in enumerate(system_definitions):
        selected_solution = system_definition["selectedSolution"]
        # converting arguments to json to allow lru_cache to work since lists and dicts are not hashable
        # without lru_cache, will be resolving all systems on every sheet updated
        if not system_definition["numericalSolve"]:
            (system_error,
             system_solutions,
             display_solutions) = get_system_solution(dumps(system_definition["statements"]),
                                                      dumps(system_definition["variables"]))
        else:
            for statement in system_definition["statements"]:
                equation_to_system_cell_map[statement["equationIndex"]] = i

            selected_solution = 0
            (system_error,
            system_solutions,
            display_solutions) = get_system_solution_numerical(dumps(system_definition["statements"]),
                                                               dumps(system_definition["variables"]),
                                                               dumps(system_definition["guesses"]),
                                                               dumps(system_definition["guessStatements"]))

        if system_error is None:
            if selected_solution > len(system_solutions) - 1:
                selected_solution = 0
            statements.extend(system_solutions[selected_solution])

        system_results.append({
            "error": system_error,
            "solutions": display_solutions,
            "selectedSolution": selected_solution
        })

    # now solve the sheet
    error, results, numerical_system_cell_errors = get_query_values(statements, equation_to_system_cell_map)

    # If there was a numerical solve, check to make sure there were not unit mismatches
    # between the lhs and rhs of each equality in the system
    numerical_solve_units_error = False
    for equation_index, loop_error in numerical_system_cell_errors.items():
        if loop_error and not system_results[equation_to_system_cell_map[equation_index]]["error"]:
            numerical_solve_units_error = True
            system_results[equation_to_system_cell_map[equation_index]]["error"] = "Units mismatch in system of equaitons"

    if not error and numerical_solve_units_error:
        error = "Units error in System Solve Cell"

    try:
        json_result = dumps({"error": error, "results": results, "systemResults": system_results})
    except Exception as e:
        error = f"Error JSON serializing Python results: {e.__class__.__name__}"
        return dumps({"error": error, "results": [], "systemResults": []})

    return json_result


class FuncContainer(object):
    pass

py_funcs = FuncContainer()
py_funcs.solveSheet = solve_sheet

# pyodide returns last statement as an object that is assessable from javascript
py_funcs
