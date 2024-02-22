PROFILE=False

if PROFILE:
    import cProfile

from sys import setrecursionlimit

# must be at least 131 to load sympy, cpython is 3000 by default
setrecursionlimit(1000)

from functools import lru_cache
import traceback

from json import loads, dumps

from math import prod

from sympy import (
    Expr,
    cancel,
    Symbol,
    Add,
    Mul,
    latex,
    sympify,
    solve,
    nsolve,
    symbols,
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
    conjugate,
    Abs,
    Integral,
    Derivative,
    Matrix,
    MatrixBase,
    Inverse,
    Determinant,
    Transpose,
    Subs,
    Pow,
    MatMul,
    Eq,
    floor,
    ceiling
)

class ExprWithAssumptions(Expr):
    is_finite: bool
    is_integer: bool

from sympy.printing.latex import modifier_dict

from sympy.printing.numpy import NumPyPrinter

from sympy.physics.units import Dimension

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

from typing import TypedDict, Literal, cast, TypeGuard, Sequence, Any, Callable, NotRequired

# clear the modifier_dict so that sympy doesn't change variable names that end if bar, prime, cal, etc.
modifier_dict.clear();

# The following statement types are created in TypeScript and passed to Python as json
class ImplicitParameter(TypedDict):
    name: str
    units: str
    dimensions: list[float]
    original_value: str
    si_value: str


# generated on the fly in evaluate_statements function, does in exist in incoming json
class ExponentName(TypedDict):
    name: str

class Exponent(TypedDict):
    type: Literal["assignment"]
    name: str
    sympy: str
    params: list[str]
    isExponent: Literal[True]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    exponents: list['Exponent | ExponentName']
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class BaseUserFunction(TypedDict):
    type: Literal["assignment"]
    name: str
    sympy: str
    params: list[str]
    isExponent: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[True]
    exponents: list[Exponent | ExponentName]
    functionParameters: list[str]
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class UserFunction(BaseUserFunction):
    isRange: Literal[False]

class UserFunctionRange(BaseUserFunction):
    isRange: Literal[True]
    freeParameter: str
    lowerLimitArgument: str
    lowerLimitInclusive: bool
    upperLimitArgument: str
    upperLimitInclusive: bool
    unitsQueryFunction: str

class FunctionUnitsQuery(TypedDict):
    type: Literal["query"]
    sympy: str
    exponents: list[Exponent | ExponentName]
    params: list[str]
    units: Literal[""]
    isExponent: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[True]
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class LocalSubstitution(TypedDict):
    type: Literal["localSub"]
    parameter: str
    argument: str
    isRange: Literal[False]
    function: str

class LocalSubstitutionRange(TypedDict):
    type: Literal["localSub"]
    parameter: str
    argument: str
    isRange: Literal[True]
    function: str
    isLowerLimit: bool
    isInclusiveLimit: bool

class FunctionArgumentAssignment(TypedDict):
    type: Literal["assignment"]
    name: str
    sympy: str
    exponents: list[Exponent | ExponentName]
    params: list[str]
    isExponent: Literal[False]
    isFunctionArgument: Literal[True]
    isFunction: Literal[False]    
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class FunctionArgumentQuery(TypedDict):
    type: Literal["query"]
    sympy: str
    exponents: list[Exponent | ExponentName]
    params: list[str]
    name: str
    isExponent: Literal[False]
    isFunctionArgument: Literal[True]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class BlankStatement(TypedDict):
    type: Literal["blank"]
    params: list[str] # will be empty list
    implicitParams: list[ImplicitParameter] # will be empty list
    exponents: list[Exponent | ExponentName] # will be empty list
    isFromPlotCell: Literal[False]
    index: int # added in Python, not pressent in json

class QueryAssignmentCommon(TypedDict):
    sympy: str
    implicitParams: list[ImplicitParameter]
    functions: list[UserFunction | UserFunctionRange | FunctionUnitsQuery]
    arguments: list[FunctionArgumentQuery | FunctionArgumentAssignment]
    localSubs: list[LocalSubstitution | LocalSubstitutionRange]    
    exponents: list[Exponent | ExponentName]
    params: list[str]
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class AssignmentStatement(QueryAssignmentCommon):
    type: Literal["assignment"]
    name: str
    isExponent: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isFromPlotCell: Literal[False]
    isRange: Literal[False]

class SystemSolutionAssignmentStatement(AssignmentStatement):
    display: str
    displayName: str

class BaseQueryStatement(QueryAssignmentCommon):
    type: Literal["query"]
    isExponent: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isEqualityUnitsQuery: bool
    isScatterXValuesQueryStatement: Literal[False]
    isScatterYValuesQueryStatement: Literal[False]
    isFromPlotCell: bool
    units: str
    unitsLatex: str
    
class QueryStatement(BaseQueryStatement):
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]

class RangeQueryStatement(BaseQueryStatement):
    isRange: Literal[True]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    cellNum: int
    numPoints: int
    freeParameter: str
    lowerLimitArgument: str
    lowerLimitInclusive: bool
    upperLimitArgument: str
    upperLimitInclusive: bool
    unitsQueryFunction: str
    inputUnits: str
    inputUnitsLatex: str
    outputName: str

class ScatterXValuesQueryStatement(QueryAssignmentCommon):
    type: Literal["query"]
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isExponent: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isEqualityUnitsQuery: Literal[False]
    isScatterXValuesQueryStatement: Literal[True]
    isScatterYValuesQueryStatement: Literal[False]
    isFromPlotCell: bool
    units: str
    equationIndex: int
    unitsLatex: str
    dimensions: list[float]

class ScatterYValuesQueryStatement(QueryAssignmentCommon):
    type: Literal["query"]
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isExponent: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isEqualityUnitsQuery: Literal[False]
    isScatterXValuesQueryStatement: Literal[False]
    isScatterYValuesQueryStatement: Literal[True]
    isFromPlotCell: bool
    units: str
    equationIndex: int
    unitsLatex: str
    dimensions: list[float]

class ScatterQueryStatement(TypedDict):
    type: Literal["scatterQuery"]
    asLines: bool
    equationIndex: int
    cellNum: int
    isFromPlotCell: bool
    params: list[str] # will be empty list
    functions: list[UserFunction | UserFunctionRange | FunctionUnitsQuery]
    arguments: list[FunctionArgumentQuery | FunctionArgumentAssignment]
    localSubs: list[LocalSubstitution | LocalSubstitutionRange]  
    implicitParams: list[ImplicitParameter]
    exponents: list[Exponent | ExponentName]
    xValuesQuery: ScatterXValuesQueryStatement
    yValuesQuery: ScatterYValuesQueryStatement
    xName: str
    yName: str
    units: str
    unitsLatex: str
    inputUnits: str
    inputUnitsLatex: str
    index: int # added in Python, not pressent in json

class CodeFunctionRawQuery(BaseQueryStatement):
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[True]   

class CodeFunctionQueryStatement(BaseQueryStatement):
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[True]
    isCodeFunctionRawQuery: Literal[False]
    functionName: str
    parameterNames: list[str]
    parameterValues: list[str]
    parameterUnits: list[str]
    generateCode: bool
    codeFunctionRawQuery: CodeFunctionRawQuery

class EqualityUnitsQueryStatement(QueryAssignmentCommon):
    type: Literal["query"]
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isExponent: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isEqualityUnitsQuery: Literal[True]
    isFromPlotCell: bool
    units: str
    equationIndex: int

class EqualityStatement(QueryAssignmentCommon):
    type: Literal["equality"]
    isExponent: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isFromPlotCell: Literal[False]
    isRange: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    equationIndex: int
    equalityUnitsQueries: list[EqualityUnitsQueryStatement]

class GuessAssignmentStatement(AssignmentStatement):
    guess: str

class BaseSystemDefinition(TypedDict):
    statements: list[EqualityStatement]
    variables: list[str]
    selectedSolution: int

class ExactSystemDefinition(BaseSystemDefinition):
    numericalSolve: Literal[False]

class NumericalSystemDefinition(BaseSystemDefinition):
    numericalSolve: Literal[True]
    guesses: list[str]
    guessStatements: list[GuessAssignmentStatement]

class CustomBaseUnits(TypedDict):
    mass: str
    length: str
    time: str
    current: str
    temperature: str
    luminous_intensity: str
    amount_of_substance: str
    force: str
    area: str
    volume: str
    energy: str
    power: str
    pressure: str
    charge: str
    capacitance: str
    electric_potential: str
    resistance: str
    inductance: str
    conductance: str
    magnetic_flux: str
    magnetic_flux_density: str
    angle: str
    information: str

# The following statement type is generated on the fly in the expand_with_sub_statements function
# This type does not exist in the inbound json 
class LocalSusbstitutionStatement(TypedDict):
    type: Literal["local_sub"]
    name: str
    params: list[str]
    function_subs: dict[str, dict[str, str]]
    isExponent: Literal[False]
    index: int

InputStatement = AssignmentStatement | QueryStatement | RangeQueryStatement | BlankStatement | \
                 CodeFunctionQueryStatement | ScatterQueryStatement 
InputAndSystemStatement = InputStatement | EqualityUnitsQueryStatement | GuessAssignmentStatement | \
                          SystemSolutionAssignmentStatement
Statement = InputStatement | Exponent | UserFunction | UserFunctionRange | FunctionUnitsQuery | \
            FunctionArgumentQuery | FunctionArgumentAssignment | \
            SystemSolutionAssignmentStatement | LocalSusbstitutionStatement | \
            GuessAssignmentStatement | EqualityUnitsQueryStatement | CodeFunctionRawQuery | \
            ScatterXValuesQueryStatement | ScatterYValuesQueryStatement
SystemDefinition = ExactSystemDefinition | NumericalSystemDefinition

class StatementsAndSystems(TypedDict):
    statements: list[InputStatement]
    systemDefinitions: list[SystemDefinition]
    customBaseUnits: NotRequired[CustomBaseUnits]
    simplifySymbolicExpressions: bool

def is_code_function_query_statement(statement: InputAndSystemStatement) -> TypeGuard[CodeFunctionQueryStatement]:
    return statement.get("isCodeFunctionQuery", False)

# The following types are created in Python and are returned as json results to TypeScript
class Result(TypedDict):
    value: str
    symbolicValue: str
    units: str
    unitsLatex: str
    customUnitsDefined: bool
    customUnits: str
    customUnitsLatex: str
    numeric: bool
    real: bool
    finite: bool
    generatedCode: NotRequired[str]

class FiniteImagResult(TypedDict):
    value: str
    symbolicValue: str
    realPart: str
    imagPart: str
    units: str
    unitsLatex: str
    customUnitsDefined: bool
    customUnits: str
    customUnitsLatex: str
    numeric: Literal[True]
    real: Literal[False]
    finite: Literal[True]
    generatedCode: NotRequired[str]

class MatrixResult(TypedDict):
    matrixResult: Literal[True]
    results: list[list[Result | FiniteImagResult]]
    generatedCode: NotRequired[str]

def is_real_and_finite(result: Result | FiniteImagResult):
    return result["real"] and result["finite"]

def is_not_matrix_result(result: Result | FiniteImagResult | MatrixResult) -> TypeGuard[Result | FiniteImagResult]:
    return not result.get("matrixResult", False)

def is_matrix_result(result: Result | FiniteImagResult | MatrixResult) -> TypeGuard[MatrixResult]:
    return result.get("matrixResult", False)

def is_matrix(expression: Expr | Matrix) -> TypeGuard[Matrix]:
    return isinstance(expression, MatrixBase)

class PlotData(TypedDict):
    numericOutput: bool
    numericInput: bool
    limitsUnitsMatch: bool
    input: list[float]
    output: list[float]
    inputReversed: bool
    inputUnits: str
    inputUnitsLatex: str
    inputCustomUnitsDefined: bool
    inputCustomUnits: str
    inputCustomUnitsLatex: str
    inputName: str
    inputNameLatex: str
    outputUnits: str
    outputUnitsLatex: str
    outputCustomUnitsDefined: bool
    outputCustomUnits: str
    outputCustomUnitsLatex: str
    outputName: str
    outputNameLatex: str
    isScatter: bool
    asLines: NotRequired[bool]
    scatterErrorMessage: NotRequired[str]

class PlotResult(TypedDict):
    plot: Literal[True]
    data: list[PlotData]

class SystemResult(TypedDict):
    error: None | str
    solutions: dict[str, list[str]]
    selectedSolution: int

class Results(TypedDict):
    error: None | str
    results: list[Result | FiniteImagResult | MatrixResult | list[PlotResult]]
    systemResults: list[SystemResult]

# The following types are created in Python and don't exist in the TypeScript code
class StatementPlotInfo(TypedDict):
    isFromPlotCell: bool
    cellNum: int

class CombinedExpressionBlank(TypedDict):
    index: int
    isBlank: Literal[True]
    isRange: Literal[False]
    isScatter: Literal[False]
    exponents: list[Exponent | ExponentName]

class CombinedExpressionNoRange(TypedDict):
    index: int
    name: str
    expression: Expr
    exponents: list[Exponent | ExponentName]
    isBlank: Literal[False]
    isRange: Literal[False]
    isScatter: Literal[False]
    isCodeFunctionQuery: bool
    isCodeFunctionRawQuery: bool
    isFunctionArgument: bool
    isUnitsQuery: bool
    isEqualityUnitsQuery: bool
    isScatterXValuesQuery: bool
    isScatterYValuesQuery: bool
    equationIndex: int

class CombinedExpressionRange(TypedDict):
    index: int
    name: str
    expression: Expr
    exponents: list[Exponent | ExponentName]
    isBlank: Literal[False]
    isRange: Literal[True]
    isScatter: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isFunctionArgument: bool
    isUnitsQuery: bool
    isEqualityUnitsQuery: bool
    equationIndex: int
    numPoints: int
    freeParameter: str
    outputName: str
    lowerLimitArgument: str
    upperLimitArgument: str
    lowerLimitInclusive: bool
    upperLimitInclusive: bool
    unitsQueryFunction: str

class CombinedExpressionScatter(TypedDict):
    index: int
    isBlank: Literal[False]
    isRange: Literal[False]
    isScatter: Literal[True]
    asLines: bool
    equationIndex: int
    xName: str
    yName: str

CombinedExpression = CombinedExpressionBlank | CombinedExpressionNoRange | CombinedExpressionRange | \
                     CombinedExpressionScatter

# maps from mathjs dimensions object to sympy dimensions
dim_map: dict[int, Dimension] = {
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

inv_dim_map = {value: key for key, value in dim_map.items()}

# base units as defined by mathjs
def get_base_units(custom_base_units: CustomBaseUnits | None= None) -> dict[tuple[int | float, ...], str]:
    if custom_base_units is None:
        return {
            (0, 0, 0, 0, 0, 0, 0, 0, 0): "",
            (1, 0, 0, 0, 0, 0, 0, 0, 0): "kg",
            (0, 1, 0, 0, 0, 0, 0, 0, 0): "m",
            (0, 0, 1, 0, 0, 0, 0, 0, 0): "s",
            (0, 0, 0, 1, 0, 0, 0, 0, 0): "A",
            (0, 0, 0, 0, 1, 0, 0, 0, 0): "K",
            (0, 0, 0, 0, 0, 1, 0, 0, 0): "cd",
            (0, 0, 0, 0, 0, 0, 1, 0, 0): "mol",
            (1, 1, -2, 0, 0, 0, 0, 0, 0): "N",
            (0, 2, 0, 0, 0, 0, 0, 0, 0): "m^2",
            (0, 3, 0, 0, 0, 0, 0, 0, 0): "m^3",
            (1, 2, -2, 0, 0, 0, 0, 0, 0): "J",
            (1, 2, -3, 0, 0, 0, 0, 0, 0): "W",
            (1, -1, -2, 0, 0, 0, 0, 0, 0): "Pa",
            (0, 0, 1, 1, 0, 0, 0, 0, 0): "C",
            (-1, -2, 4, 2, 0, 0, 0, 0, 0): "F",
            (1, 2, -3, -1, 0, 0, 0, 0, 0): "V",
            (1, 2, -3, -2, 0, 0, 0, 0, 0): "ohm",
            (1, 2, -2, -2, 0, 0, 0, 0, 0): "H",
            (-1, -2, 3, 2, 0, 0, 0, 0, 0): "S",
            (1, 2, -2, -1, 0, 0, 0, 0, 0): "Wb",
            (1, 0, -2, -1, 0, 0, 0, 0, 0): "T",
            (0, 0, 0, 0, 0, 0, 0, 1, 0): "rad",
            (0, 0, 0, 0, 0, 0, 0, 0, 1): "b",
        }
    else:
        return {
            (0, 0, 0, 0, 0, 0, 0, 0, 0): "",
            (1, 0, 0, 0, 0, 0, 0, 0, 0): custom_base_units["mass"],
            (0, 1, 0, 0, 0, 0, 0, 0, 0): custom_base_units["length"],
            (0, 0, 1, 0, 0, 0, 0, 0, 0): custom_base_units["time"],
            (0, 0, 0, 1, 0, 0, 0, 0, 0): custom_base_units["current"],
            (0, 0, 0, 0, 1, 0, 0, 0, 0): custom_base_units["temperature"],
            (0, 0, 0, 0, 0, 1, 0, 0, 0): custom_base_units["luminous_intensity"],
            (0, 0, 0, 0, 0, 0, 1, 0, 0): custom_base_units["amount_of_substance"],
            (1, 1, -2, 0, 0, 0, 0, 0, 0): custom_base_units["force"],
            (0, 2, 0, 0, 0, 0, 0, 0, 0): custom_base_units["area"],
            (0, 3, 0, 0, 0, 0, 0, 0, 0): custom_base_units["volume"],
            (1, 2, -2, 0, 0, 0, 0, 0, 0): custom_base_units["energy"],
            (1, 2, -3, 0, 0, 0, 0, 0, 0): custom_base_units["power"],
            (1, -1, -2, 0, 0, 0, 0, 0, 0): custom_base_units["pressure"],
            (0, 0, 1, 1, 0, 0, 0, 0, 0): custom_base_units["charge"],
            (-1, -2, 4, 2, 0, 0, 0, 0, 0): custom_base_units["capacitance"],
            (1, 2, -3, -1, 0, 0, 0, 0, 0): custom_base_units["electric_potential"],
            (1, 2, -3, -2, 0, 0, 0, 0, 0): custom_base_units["resistance"],
            (1, 2, -2, -2, 0, 0, 0, 0, 0): custom_base_units["inductance"],
            (-1, -2, 3, 2, 0, 0, 0, 0, 0): custom_base_units["conductance"],
            (1, 2, -2, -1, 0, 0, 0, 0, 0): custom_base_units["magnetic_flux"],
            (1, 0, -2, -1, 0, 0, 0, 0, 0): custom_base_units["magnetic_flux_density"],
            (0, 0, 0, 0, 0, 0, 0, 1, 0): custom_base_units["angle"],
            (0, 0, 0, 0, 0, 0, 0, 0, 1): custom_base_units["information"],
        }


# precision for sympy evalf calls to convert expressions to floating point values
PRECISION = 64

# num of digits to round to for unit exponents
# this makes sure units with a very small difference are identified as the same
EXP_NUM_DIGITS = 12
# threshold to consider floating point unit exponent as an int
EXP_INT_THRESHOLD = 1e-12

def round_exp(value: float) -> float | int:
    value = round(value, EXP_NUM_DIGITS)

    if abs(int(value) - value) < EXP_INT_THRESHOLD:
        value = int(value)

    return value

# map the sympy dimensional dependences to mathjs dimensions
def get_mathjs_units(dimensional_dependencies: dict[Dimension, float], custom_base_units: CustomBaseUnits | None = None ):
    base_units = get_base_units(custom_base_units)

    mathjs_dims: list[int | float] = [0] * 9

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
                unit_latex = f"\\left\\lbrack \\frac{{{latex_num}}}{{{latex_den}}}\\right\\rbrack "
            elif latex_num != "":
                unit_latex = f"\\left\\lbrack {latex_num}\\right\\rbrack "
            else:
                unit_latex = ""
        else:
            if mathjs_unit_name == "":
                unit_latex = ""
            else:
                # this is a base unit, may contain * for multiplication or / for division
                rendered_mathjs_unit = mathjs_unit_name
                rendered_mathjs_unit = rendered_mathjs_unit.replace("*", "\\cdot ")
                if '/' in rendered_mathjs_unit:
                    parts = rendered_mathjs_unit.split('/')
                    if len(parts) == 2:
                        rendered_mathjs_unit = f"\\frac{{{parts[0]}}}{{{parts[1]}}}"
                
                unit_latex = f"\\left\\lbrack {rendered_mathjs_unit}\\right\\rbrack "

    else:
        mathjs_unit_name = ""
        unit_latex = ""

    return mathjs_unit_name, unit_latex


def get_dims(dimensions: list[float]) -> Expr:
    dims = Mul(
        1,
        *[
            dim_map[int(i)] ** value
            for i, value in enumerate(dimensions)
            if value != 0.0
        ],
    )
    return dims


def custom_latex(expression: Expr) -> str:
    piecewise = Function('piecewise')
    new_expression = expression.replace(Piecewise, piecewise)

    result_latex = latex(new_expression)

    result_latex = result_latex.replace('_{as variable}','')

    return result_latex

def walk_tree(grandparent_func, parent_func, expr) -> Expr:

    if is_matrix(expr):
        rows = []
        for i in range(expr.rows):
            row = []
            rows.append(row)
            for j in range(expr.cols):
                row.append(walk_tree(parent_func, Matrix, expr[i,j]))

        return cast(Expr, Matrix(rows))
    
    if len(expr.args) == 0:
        if parent_func is not Pow and parent_func is not Inverse and expr.is_negative:
            return -1*expr
        else:
            return expr

    new_args = (walk_tree(parent_func, expr.func, arg) for arg in expr.args)
    
    return expr.func(*new_args)

def subtraction_to_addition(expression: Expr | Matrix) -> Expr:
    return walk_tree("root", "root", expression)


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

    raise TypeError('All input arguments to function need to have compatible units')

def ensure_dims_all_compatible_piecewise(*args):
    # Need to make sure first element in tuples passed to Piecewise all have compatible units
    # The second element of the tuples has already been checked by And, StrictLessThan, etc.
    return ensure_dims_all_compatible(*[arg[0] for arg in args])

def ensure_unitless_in_angle_out(arg):
    if dimsys_SI.get_dimensional_dependencies(arg) == {}:
        return angle
    else:
        raise TypeError('Unitless input argument required for function')

def ensure_unitless_in(arg):
    if dimsys_SI.get_dimensional_dependencies(arg) == {}:
        return arg
    else:
        raise TypeError('Unitless input argument required for function')

def ensure_any_unit_in_angle_out(arg):
    # ensure input arg units make sense (will raise if inconsistent)
    dimsys_SI.get_dimensional_dependencies(arg)
    
    return angle

def ensure_any_unit_in_same_out(arg):
    # ensure input arg units make sense (will raise if inconsistent)
    dimsys_SI.get_dimensional_dependencies(arg)
    
    return arg

def ensure_inverse_dims(arg):
    if not is_matrix(arg):
        return arg**-1
    else:
        rows = []
        column_dims = {}
        for i in range(arg.rows):
            row = []
            rows.append(row)
            for j in range(arg.cols):
                dim, _ = get_mathjs_units(cast(dict[Dimension, float], dimsys_SI.get_dimensional_dependencies(arg[j,i])))
                if dim == "":
                    row.append(sympify('0'))
                else:
                    row.append(cast(Expr, arg[j,i])**-1)
                column_dims.setdefault(i, []).append(dim)

        column_checks = []
        for _, values in column_dims.items():
            column_checks.append(all([value == values[0] for value in values[1:]]))

        if not all(column_checks):
            raise TypeError('Dimensions not consistent for matrix inverse')

        return Matrix(rows)

def custom_transpose(arg):
    return arg.T

def custom_determinant(arg):
    return arg.det()

def custom_matmul(exp1: Expr, exp2: Expr):
    if is_matrix(exp1) and is_matrix(exp2) and \
       (((exp1.rows == 3 and exp1.cols == 1) and (exp2.rows == 3 and exp2.cols == 1)) or \
       ((exp1.rows == 1 and exp1.cols == 3) and (exp2.rows == 1 and exp2.cols == 3))):
        return exp1.cross(exp2)
    else:
        return MatMul(exp1, exp2)
    
def custom_matmul_dims(exp1: Expr, exp2: Expr):
    if is_matrix(exp1) and is_matrix(exp2) and \
       (((exp1.rows == 3 and exp1.cols == 1) and (exp2.rows == 3 and exp2.cols == 1)) or \
       ((exp1.rows == 1 and exp1.cols == 3) and (exp2.rows == 1 and exp2.cols == 3))):
        result = Matrix([Add(Mul(exp1[1],exp2[2]),Mul(exp1[2],exp2[1])),
                         Add(Mul(exp1[2],exp2[0]),Mul(exp1[0],exp2[2])),
                         Add(Mul(exp1[0],exp2[1]),Mul(exp1[1],exp2[0]))])
        if exp1.rows == 3:
            return result
        else:
            return result.T
    else:
        return MatMul(exp1, exp2)

def custom_round(expression: Expr):
    return expression.round()

class PlaceholderFunction(TypedDict):
    dim_func: Callable
    sympy_func: object

def UniversalInverse(expression: Expr) -> Expr:
    return expression**-1

def IndexMatrix(expression: Expr, i: Expr, j: Expr) -> Expr:
    for subscript in cast(list[ExprWithAssumptions], (i,j)):
        if not (subscript.is_real and subscript.is_finite and subscript.is_integer and cast(int, subscript) >= 0):
            raise Exception("Matrix indices must evaluate to a finite real integer and be greater than 0")
        
    return cast(Expr, cast(Matrix, expression)[i, j])

def custom_norm(expression: Matrix):
    return expression.norm()

def custom_dot(exp1: Matrix, exp2: Matrix):
    return exp1.dot(exp2)

placeholder_map: dict[Function, PlaceholderFunction] = {
    cast(Function, Function('_StrictLessThan')) : {"dim_func": ensure_dims_all_compatible, "sympy_func": StrictLessThan},
    cast(Function, Function('_LessThan')) : {"dim_func": ensure_dims_all_compatible, "sympy_func": LessThan},
    cast(Function, Function('_StrictGreaterThan')) : {"dim_func": ensure_dims_all_compatible, "sympy_func": StrictGreaterThan},
    cast(Function, Function('_GreaterThan')) : {"dim_func": ensure_dims_all_compatible, "sympy_func": GreaterThan},
    cast(Function, Function('_And')) : {"dim_func": ensure_dims_all_compatible, "sympy_func": And},
    cast(Function, Function('_Piecewise')) : {"dim_func": ensure_dims_all_compatible_piecewise, "sympy_func": Piecewise},
    cast(Function, Function('_asin')) : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": asin},
    cast(Function, Function('_acos')) : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": acos},
    cast(Function, Function('_atan')) : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": atan},
    cast(Function, Function('_asec')) : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": asec},
    cast(Function, Function('_acsc')) : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": acsc},
    cast(Function, Function('_acot')) : {"dim_func": ensure_unitless_in_angle_out, "sympy_func": acot},
    cast(Function, Function('_arg')) : {"dim_func": ensure_any_unit_in_angle_out, "sympy_func": arg},
    cast(Function, Function('_re')) : {"dim_func": ensure_any_unit_in_same_out, "sympy_func": re},
    cast(Function, Function('_im')) : {"dim_func": ensure_any_unit_in_same_out, "sympy_func": im},
    cast(Function, Function('_conjugate')) : {"dim_func": ensure_any_unit_in_same_out, "sympy_func": conjugate},
    cast(Function, Function('_Max')) : {"dim_func": ensure_dims_all_compatible, "sympy_func": Max},
    cast(Function, Function('_Min')) : {"dim_func": ensure_dims_all_compatible, "sympy_func": Min},
    cast(Function, Function('_Abs')) : {"dim_func": ensure_any_unit_in_same_out, "sympy_func": Abs},
    cast(Function, Function('_Inverse')) : {"dim_func": ensure_inverse_dims, "sympy_func": UniversalInverse},
    cast(Function, Function('_Transpose')) : {"dim_func": custom_transpose, "sympy_func": custom_transpose},
    cast(Function, Function('_Determinant')) : {"dim_func": custom_determinant, "sympy_func": custom_determinant},
    cast(Function, Function('_MatMul')) : {"dim_func": custom_matmul_dims, "sympy_func": custom_matmul},
    cast(Function, Function('_IndexMatrix')) : {"dim_func": IndexMatrix, "sympy_func": IndexMatrix},
    cast(Function, Function('_Eq')) : {"dim_func": Eq, "sympy_func": Eq},
    cast(Function, Function('_norm')) : {"dim_func": custom_norm, "sympy_func": custom_norm},
    cast(Function, Function('_dot')) : {"dim_func": custom_dot, "sympy_func": custom_dot},
    cast(Function, Function('_ceil')) : {"dim_func": ensure_unitless_in, "sympy_func": ceiling},
    cast(Function, Function('_floor')) : {"dim_func": ensure_unitless_in, "sympy_func": floor},
    cast(Function, Function('_round')) : {"dim_func": ensure_unitless_in, "sympy_func": custom_round},
}

placeholder_set = set(placeholder_map.keys())
placeholder_inverse_map = { value["sympy_func"]: key for key, value in reversed(placeholder_map.items()) }
placeholder_inverse_set = set(placeholder_inverse_map.keys())

def replace_sympy_funcs_with_placeholder_funcs(expression: Expr) -> Expr:
    replacements = { value.func for value in expression.atoms(Function) } & placeholder_inverse_set
    if len(replacements) > 0:
        for key, value in placeholder_inverse_map.items(): # must replace in dictionary order
            if key in replacements:
                expression = cast(Expr, expression.replace(key, value))

    return expression


def doit_for_dim_func(func):
    def new_func(expr: Expr, func_key: Literal["dim_func"] | Literal["sympy_func"]) -> Expr:
        result = func(expr, func_key)

        if func_key == "dim_func":
            return cast(Expr, result.doit())
        else:
            return result

    return new_func

@doit_for_dim_func
def replace_placeholder_funcs(expr: Expr, func_key: Literal["dim_func"] | Literal["sympy_func"]) -> Expr:
    if is_matrix(expr):
        rows = []
        for i in range(expr.rows):
            row = []
            rows.append(row)
            for j in range(expr.cols):
                row.append(replace_placeholder_funcs(cast(Expr, expr[i,j]), func_key) )
        
        return cast(Expr, Matrix(rows))
    
    if len(expr.args) == 0:
        return expr

    if expr.func in placeholder_set:
        return cast(Expr, cast(Callable, placeholder_map[expr.func][func_key])(*(replace_placeholder_funcs(cast(Expr, arg), func_key) for arg in expr.args)))
    elif func_key == "dim_func" and (expr.func is Mul or expr.func is MatMul):
        processed_args = [replace_placeholder_funcs(cast(Expr, arg), func_key) for arg in expr.args]
        matrix_args = []
        scalar_args = []
        for arg in processed_args:
            if is_matrix(cast(Expr, arg)):
                matrix_args.append(arg)
            else:
                scalar_args.append(arg)

        if len(matrix_args) > 0 and len(scalar_args) > 0:
            first_matrix = matrix_args[0]
            scalar = prod(scalar_args)
            new_rows = []
            for i in range(first_matrix.rows):
                new_row = []
                new_rows.append(new_row)
                for j in range(first_matrix.cols):
                    new_row.append(scalar*first_matrix[i,j])
            
            matrix_args[0] = Matrix(new_rows)

            return cast(Expr, expr.func(*matrix_args))
        else:
            return cast(Expr, expr.func(*processed_args))
    else:
        return cast(Expr, expr.func(*(replace_placeholder_funcs(cast(Expr, arg), func_key) for arg in expr.args)))

def get_dimensional_analysis_expression(parameter_subs: dict[Symbol, Expr], expression: Expr) -> tuple[Expr | None, Exception | None]:
    # need to remove any subtractions or unary negative since this may
    # lead to unintentional cancellation during the parameter substituation process
    positive_only_expression = subtraction_to_addition(expression)
    expression_with_parameter_subs = cast(Expr, positive_only_expression.xreplace(parameter_subs))

    error = None
    final_expression = None

    try:
        final_expression = replace_placeholder_funcs(expression_with_parameter_subs, "dim_func")
    except Exception as e:
        error = e
    
    return final_expression, error


def dimensional_analysis(dimensional_analysis_expression: Expr | None, dim_sub_error: Exception | None,
                         custom_base_units: CustomBaseUnits | None = None):
    custom_units_defined = False
    custom_units = ""
    custom_units_latex = ""
    
    try:
        if dim_sub_error is not None:
            raise dim_sub_error
        # Finally, evaluate dimensions for complete expression
        result, result_latex = get_mathjs_units(
            cast(dict[Dimension, float], dimsys_SI.get_dimensional_dependencies(dimensional_analysis_expression),),
            None
        )

        if custom_base_units is not None:
            custom_units, custom_units_latex = get_mathjs_units(
                cast(dict[Dimension, float], dimsys_SI.get_dimensional_dependencies(dimensional_analysis_expression),),
                custom_base_units
            )

            if custom_units != result:
                custom_units_defined = True

    except TypeError as e:
        print(f"Dimension Error: {e}")
        result = "Dimension Error"
        result_latex = "Dimension Error"

    return result, result_latex, custom_units_defined, custom_units, custom_units_latex


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


def get_sorted_statements(statements: list[Statement]):
    defined_params: dict[str, int] = {}
    for i, statement in enumerate(statements):
        if statement["type"] == "assignment" or statement["type"] == "local_sub":
            if statement["name"] in defined_params:
                raise DuplicateAssignment(statement["name"])
            else:
                defined_params[statement["name"]] = i

    vertices = range(len(statements))
    edges: list[tuple[int, int]] = []

    for i, statement in enumerate(statements):
        if statement["type"] != "equality" and statement["type"] != "scatterQuery":
            for param in statement["params"]:
                ref_index = defined_params.get(param)
                if ref_index is not None:
                    edges.append((ref_index, i))

    try:
        sort_order = topological_sort((vertices, edges))
    except ValueError:
        raise ReferenceCycle

    sorted_statements: list[Statement] = []

    for i in sort_order:
        statement = statements[i]
        sorted_statements.append(statement)

    return sorted_statements


def get_all_implicit_parameters(statements: Sequence[InputAndSystemStatement | EqualityStatement]):
    parameters: list[ImplicitParameter] = []
    for statement in statements:
        parameters.extend(statement["implicitParams"])

    return parameters


def expand_with_sub_statements(statements: list[InputAndSystemStatement]):
    new_statements: list[Statement] = list(statements)

    local_sub_statements: dict[str, LocalSusbstitutionStatement] = {}

    included_exponents: set[str] = set()

    for statement in statements:
        # need to prevent inclusion of already included exponents since solving a system of equations
        # will repeat exponents for each variable that is solved for
        for exponent in cast(list[Exponent], statement["exponents"]):
            if exponent["name"] not in included_exponents:
                new_statements.append(exponent)
        included_exponents.update([exponent["name"] for exponent in statement["exponents"]])

        new_statements.extend(statement.get("functions", []))
        new_statements.extend(statement.get("arguments", []))
        for local_sub in statement.get("localSubs", []):
            combined_sub = local_sub_statements.setdefault(local_sub["parameter"], 
                              {"type": "local_sub", 
                               "name": local_sub["parameter"],
                               "index": 0,  # placeholder, will be set in sympy_statements
                               "params": [], 
                               "function_subs": {},
                               "isExponent": False 
                               })
            combined_sub["params"].append(local_sub["argument"])
            function_subs = combined_sub["function_subs"]
            current_sub = function_subs.setdefault(local_sub["function"], {})
            current_sub[symbols(local_sub["parameter"])] = symbols(local_sub["argument"])

        if is_code_function_query_statement(statement) and statement["generateCode"]:
            new_statements.append(statement["codeFunctionRawQuery"])

        if statement["type"] == "scatterQuery":
            new_statements.append(statement["xValuesQuery"])
            new_statements.append(statement["yValuesQuery"])

    new_statements.extend(local_sub_statements.values())

    return new_statements


def as_int_if_int(expr: Expr | float) -> Expr | float:
    try:
        return sympify(as_int(expr, strict=False))
    except ValueError as e:
        return expr


def get_parameter_subs(parameters: list[ImplicitParameter]):
    # sub parameter values
    parameter_subs: dict[Symbol, Expr] = {
        symbols(param["name"]): sympify(param["si_value"], rational=True)
        for param in parameters
        if param["si_value"] is not None
    }
    if len(parameter_subs) < len(parameters):
        raise ParameterError

    return parameter_subs


def sympify_statements(statements: list[Statement] | list[EqualityStatement],
                       sympify_exponents=False):
    for i, statement in enumerate(statements):
        statement["index"] = i
        if statement["type"] != "local_sub" and statement["type"] != "blank" and \
           statement["type"] != "scatterQuery":
            try:
                statement["expression"] = sympify(statement["sympy"], rational=True)
                if sympify_exponents:
                    for exponent in cast(list[Exponent], statement["exponents"]):
                        exponent["expression"] = sympify(exponent["sympy"], rational=True)
            except SyntaxError:
                print(f"Parsing error for equation {statement['sympy']}")
                raise ParsingError


def remove_implicit_and_exponent(input_set: set[str]) -> set[str]:
    return {variable for variable in input_set 
            if not variable.startswith( ("implicit_param__", "exponent__") )}


def solve_system(statements: list[EqualityStatement], variables: list[str]):
    parameters = get_all_implicit_parameters(statements)
    parameter_subs = get_parameter_subs(parameters)

    sympify_statements(statements, sympify_exponents=True)

    # give all of the statements an index so that they can be re-ordered
    for i, statement in enumerate(statements):
        statement["index"] = i

    # define system of equations for sympy.solve function
    # substitute in all exponents and placeholder functions
    system_exponents: list[Exponent | ExponentName] = []
    system_implicit_params: list[ImplicitParameter] = []
    system_variables: set[str] = set()
    system: list[Expr] = []
    for statement in statements:
        system_variables.update(statement["params"])
        system_exponents.extend(statement["exponents"])
        system_implicit_params.extend(statement["implicitParams"])

        equality = cast(Expr, statement["expression"]).subs(
            {exponent["name"]:exponent["expression"] for exponent in cast(list[Exponent], statement["exponents"])})
        equality = replace_placeholder_funcs(cast(Expr, equality), "sympy_func")

        system.append(cast(Expr, equality.doit()))
        

    # remove implicit parameters before solving
    system_variables = remove_implicit_and_exponent(system_variables)

    solutions: list[dict[Symbol, Expr]] = []
    solutions = solve(system, variables, dict=True)

    if len(solutions) == 0:
        if len(statements) > len(system_variables):
            raise OverDeterminedSystem
        else:
            raise NoSolutionFound

    new_statements: list[list[SystemSolutionAssignmentStatement]] = []
    for solution in solutions:
        current_statements: list[SystemSolutionAssignmentStatement] = []
        counter = 0
        for symbol, expression in solution.items():

            # latex rep to display to user
            display_expression = custom_latex(cast(Expr, expression.subs(parameter_subs)))

            # replace some sympy functions with placeholders for dimensional analysis
            expression = replace_sympy_funcs_with_placeholder_funcs(expression)

            current_statements.append({
                "index": 0, # placeholder, will be assigned later
                "type": "assignment",
                "name": symbol.name,
                "sympy": str(expression),
                "expression": expression,
                "implicitParams": system_implicit_params if counter == 0 else [], # only include for one variable in solution to prevent dups
                "params": [variable.name for variable in cast(list[Symbol], expression.free_symbols)],
                "exponents": system_exponents,
                "isExponent": False,
                "isFunction": False,
                "isFunctionArgument": False,
                "isRange": False,
                "isFromPlotCell": False,
                "display": display_expression,
                "displayName": custom_latex(symbol),
                "functions": [],
                "arguments": [],
                "localSubs": []
            })

            counter += 1

        new_statements.append(current_statements)

    return new_statements


def solve_system_numerical(statements: list[EqualityStatement], variables: list[str],
                           guesses: list[str], guess_statements: list[GuessAssignmentStatement]):
    parameters = get_all_implicit_parameters([*statements, *guess_statements])
    parameter_subs = get_parameter_subs(parameters)

    sympify_statements(statements, sympify_exponents=True)

    # give all of the statements an index so that they can be re-ordered
    for i, statement in enumerate(statements):
        statement["index"] = i

    # define system of equations for sympy.solve function
    # substitute in all exponents, implicit params, and placeholder functions
    # add equalityUnitsQueries to new_statements that will be added to the whole sheet
    system_exponents: list[Exponent | ExponentName] = []
    system_variables: set[str] = set()
    system: list[Expr] = []
    new_statements: list[EqualityUnitsQueryStatement | GuessAssignmentStatement] = []
    for statement in statements:
        system_variables.update(statement["params"])
        system_exponents.extend(statement["exponents"])

        equality = cast(Expr, statement["expression"]).subs(
            {exponent["name"]: exponent["expression"] for exponent in cast(list[Exponent], statement["exponents"])})
        equality = equality.subs(parameter_subs)
        equality = replace_placeholder_funcs(cast(Expr, equality), "sympy_func")
        system.append(cast(Expr, equality.doit()))
        new_statements.extend(statement["equalityUnitsQueries"])

    # remove implicit parameters before solving
    system_variables = remove_implicit_and_exponent(system_variables)

    solutions: list[dict[Symbol, float]] | list[Any] = []
    try:
        solutions = cast(list[dict[Symbol, float]] | list[Any], nsolve(system, variables, guesses, dict=True))
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

    display_solutions: dict[str, list[str]] = {}
    implicit_params_to_update: dict[str, float] = {}
    first_solution = solutions[0]
    if isinstance(first_solution, dict):
        for symbol, value in cast(dict[Symbol, float], first_solution).items():
            display_solutions[custom_latex(sympify(symbol))] = [f"{float(value):.12g}"]

            for guess_statement in guess_statements:
                if symbol == guess_statement["name"]:
                    if guess_statement["sympy"].startswith("implicit_param__"):
                        implicit_params_to_update[guess_statement["sympy"]] = value
                    else:
                        guess_statement["sympy"] = str(value)
                    new_statements.append(guess_statement)
                    break
    else:
        raise NoSolutionFound

    # update implicit parameters with solve solution (they currently hold the guess values)
    for parameter in parameters:
        if parameter["name"] in implicit_params_to_update:
            parameter["si_value"] = str(implicit_params_to_update[parameter["name"]])

    # can only have implicit params in one place or there will be duplicates 
    for i, statement in enumerate(new_statements):
        if i == 0:
            statement["implicitParams"] = parameters
        else:
            statement["implicitParams"] = []
        
    return [new_statements], display_solutions


def get_range_result(range_result: CombinedExpressionRange,
                     range_dependencies: dict[str, Result | FiniteImagResult | MatrixResult],
                     num_points: int) -> PlotResult:

    # check that upper and lower limits of range input are real and finite
    # and that units match
    lower_limit_result = range_dependencies[range_result["lowerLimitArgument"]]
    lower_limit_inclusive = range_result["lowerLimitInclusive"]
    upper_limit_result = range_dependencies[range_result["upperLimitArgument"]]
    upper_limit_inclusive = range_result["upperLimitInclusive"]
    units_result = range_dependencies[range_result["unitsQueryFunction"]]

    if ( (not is_not_matrix_result(lower_limit_result)) or 
         (not is_not_matrix_result(upper_limit_result)) ):
        return {"plot": True, "data": [{"isScatter": False, "numericOutput": False, "numericInput": False,
                "limitsUnitsMatch": True, "input": [], "output": [], "inputReversed": False,
                "inputUnits": "", "inputUnitsLatex": "",
                "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
                 "inputName": "", "inputNameLatex": "",
                "outputUnits": "", "outputUnitsLatex": "", 
                "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
                "outputName": "", "outputNameLatex": ""}] }

    if not is_not_matrix_result(units_result):
        return {"plot": True, "data": [{"isScatter": False, "numericOutput": False, "numericInput": True,
                "limitsUnitsMatch": True, "input": [], "output": [], "inputReversed": False,
                "inputUnits": "", "inputUnitsLatex": "",
                "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
                "inputName": "", "inputNameLatex": "",
                "outputUnits": "", "outputUnitsLatex": "",
                "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
                "outputName": "", "outputNameLatex": ""}] }

    if not all(map(lambda value: value["numeric"] and value["real"] and value["finite"], 
                   [lower_limit_result, upper_limit_result])):
        return {"plot": True, "data": [{"isScatter": False, "numericOutput": False, "numericInput": False,
                "limitsUnitsMatch": False, "input": [], "output": [], "inputReversed": False,
                "inputUnits": "", "inputUnitsLatex": "",
                "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
                "inputName": "", "inputNameLatex": "",
                "outputUnits": "", "outputUnitsLatex": "",
                "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
                "outputName": "", "outputNameLatex": ""}] }

    if lower_limit_result["units"] != upper_limit_result["units"]:
        return {"plot": True, "data": [{"isScatter": False, "numericOutput": False, "numericInput": True,
                "limitsUnitsMatch": False, "input": [],  "output": [], "inputReversed": False,
                "inputUnits": "", "inputUnitsLatex": "",
                "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
                "inputName": "", "inputNameLatex": "",
                "outputUnits": "", "outputUnitsLatex": "",
                "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
                "outputName": "", "outputNameLatex": ""}] }

    lower_limit = float(lower_limit_result["value"])
    upper_limit = float(upper_limit_result["value"])

    input_reversed = True if lower_limit > upper_limit else False

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
    range_function = None
    try:
        range_function = lambdify(range_result["freeParameter"], range_result["expression"], 
                                  modules=["math", "mpmath", "sympy"])
    except Exception:
        lambda_error = True

    output_values: list[float] = []
    if not lambda_error and range_function is not None:
        try:
            for input in input_values:
                output_values.append(float(range_function(input)))
        except Exception:
            lambda_error = True

    if lambda_error or len(output_values) == 0 or \
       not all(map(lambda value: isinstance(value, numbers.Number), output_values)):
        return {"plot": True, "data": [{"isScatter": False, "numericOutput": False, "numericInput": True,
                "limitsUnitsMatch": True, "input": input_values,  "output": [], "inputReversed": input_reversed,
                "inputUnits": "", "inputUnitsLatex": "",
                "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
                "inputName": range_result["freeParameter"].removesuffix('_as_variable'),
                "inputNameLatex": custom_latex(sympify(range_result["freeParameter"])),
                "outputUnits": "", "outputUnitsLatex": "",
                "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
                "outputName": range_result["outputName"].removesuffix('_as_variable'),
                "outputNameLatex": custom_latex(sympify(range_result["outputName"])) }] }

    return {"plot": True, "data": [{"isScatter": False, "numericOutput": True, "numericInput": True,
            "limitsUnitsMatch": True, "input": input_values,  "output": output_values, "inputReversed": input_reversed,
            "inputUnits": lower_limit_result["units"], "inputUnitsLatex": lower_limit_result["unitsLatex"],
            "inputCustomUnitsDefined": lower_limit_result["customUnitsDefined"], 
            "inputCustomUnits": lower_limit_result["customUnits"], 
            "inputCustomUnitsLatex": lower_limit_result["customUnitsLatex"],
            "inputName": range_result["freeParameter"].removesuffix('_as_variable'),
            "inputNameLatex": custom_latex(sympify(range_result["freeParameter"])),
            "outputUnits": units_result["units"], "outputUnitsLatex": units_result["unitsLatex"],
            "outputCustomUnitsDefined": units_result["customUnitsDefined"], 
            "outputCustomUnits": units_result["customUnits"], 
            "outputCustomUnitsLatex": units_result["customUnitsLatex"],
            "outputName": range_result["outputName"].removesuffix('_as_variable'),
            "outputNameLatex": custom_latex(sympify(range_result["outputName"])) }] }

def get_scatter_error_object(error_message: str) -> PlotResult:
    return {"plot": True, "data": [{"isScatter": True, "numericOutput": False, "numericInput": True,
            "limitsUnitsMatch": True, "input": [],  "output": [], "inputReversed": False,
            "inputUnits": "", "inputUnitsLatex": "",
            "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
            "inputName": "", "inputNameLatex": "",
            "outputUnits": "", "outputUnitsLatex": "",
            "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
            "outputName": "", "outputNameLatex": "",
            "scatterErrorMessage": error_message}] }

def get_scatter_plot_result(combined_scatter: CombinedExpressionScatter, 
                            scatter_x_values: Result | FiniteImagResult | MatrixResult, 
                            scatter_y_values: Result | FiniteImagResult | MatrixResult,
                            scatter_id: int) -> PlotResult:

    x_name = combined_scatter["xName"]
    if x_name == "ScatterPlaceholderX":
        x_name = f"x{scatter_id}"

    y_name = combined_scatter["yName"]
    if y_name == "ScatterPlaceholderY":
        y_name = f"y{scatter_id}"

    if (is_not_matrix_result(scatter_x_values) and (is_matrix_result(scatter_y_values))) or \
       (is_not_matrix_result(scatter_y_values) and (is_matrix_result(scatter_x_values))):
        return get_scatter_error_object("Both the x and y values need to be a scalar value or a vector")
    
    if (is_matrix_result(scatter_x_values)) and (is_matrix_result(scatter_y_values)):
        x_num_rows = len(scatter_x_values["results"])
        x_num_cols = len(scatter_x_values["results"][0])
        
        y_num_rows = len(scatter_y_values["results"])
        y_num_cols = len(scatter_y_values["results"][0])

        x_len = max(x_num_rows, x_num_cols)
        y_len = max(y_num_rows, y_num_cols)

        if (x_num_rows != 1 and x_num_cols != 1) or (y_num_rows != 1 and y_num_cols != 1) or \
           (x_len != y_len):
            return get_scatter_error_object("Both the x and y values need to be either column or row vectors of the same size")
        
        x_values: list[float] = []
        x_values_all_real_and_finite = True
        x_units_check: set[str] = set()
        
        x_units_latex = scatter_x_values["results"][0][0]["unitsLatex"]
        x_units_custom_units_defined = scatter_x_values["results"][0][0]["customUnitsDefined"]
        x_units_custom_units = scatter_x_values["results"][0][0]["customUnits"]
        x_units_custom_units_latex = scatter_x_values["results"][0][0]["customUnitsLatex"]

        for row in scatter_x_values["results"]:
            for col in row:
                x_units_check.add(col["units"])
                if not is_real_and_finite(col):
                    x_values_all_real_and_finite = False
                else:
                    x_values.append(float(col["value"]))

        if not x_values_all_real_and_finite:
            return get_scatter_error_object("One or more x values does not evaluate to a finite real value")
        
        if len(x_units_check) > 1 or \
           (("Dimension Error" in x_units_check) or  ("Exponent Not Dimensionless" in x_units_check)):
            return get_scatter_error_object("One or more of the x values has inconsistent units or a dimension error")
        
        y_values: list[float] = []
        y_values_all_real_and_finite = True
        y_units_check: set[str] = set()

        y_units_latex = scatter_y_values["results"][0][0]["unitsLatex"]
        y_units_custom_units_defined = scatter_y_values["results"][0][0]["customUnitsDefined"]
        y_units_custom_units = scatter_y_values["results"][0][0]["customUnits"]
        y_units_custom_units_latex = scatter_y_values["results"][0][0]["customUnitsLatex"]

        for row in scatter_y_values["results"]:
            for col in row:
                y_units_check.add(col["units"])
                y_units_latex = col["unitsLatex"]
                if not is_real_and_finite(col):
                    y_values_all_real_and_finite = False
                else:
                    y_values.append(float(col["value"]))

        if not y_values_all_real_and_finite:
            return get_scatter_error_object("One or more y values does not evaluate to a finite real value")
        
        if len(y_units_check) > 1 or \
           (("Dimension Error" in y_units_check) or  ("Exponent Not Dimensionless" in y_units_check)):
            return get_scatter_error_object("One or more of the y values has inconsistent units or a dimension error")

        return {"plot": True, "data": [{"isScatter": True, "asLines": combined_scatter["asLines"],
                "numericOutput": True, "numericInput": True,
                "limitsUnitsMatch": True, "input": x_values,  "output": y_values, "inputReversed": False,
                "inputUnits": next(iter(x_units_check)), "inputUnitsLatex": x_units_latex,
                "inputCustomUnitsDefined": x_units_custom_units_defined, 
                "inputCustomUnits": x_units_custom_units, "inputCustomUnitsLatex": x_units_custom_units_latex,
                "inputName": x_name.removesuffix('_as_variable'),
                "inputNameLatex": custom_latex(sympify(x_name)),
                "outputUnits": next(iter(y_units_check)), "outputUnitsLatex": y_units_latex,
                "outputCustomUnitsDefined": y_units_custom_units_defined, 
                "outputCustomUnits": y_units_custom_units, "outputCustomUnitsLatex": y_units_custom_units_latex,
                "outputName": y_name.removesuffix('_as_variable'),
                "outputNameLatex": custom_latex(sympify(y_name)) }] }
    
    # Finally, handle case where both values are scalers
    if not is_real_and_finite(cast(Result | FiniteImagResult, scatter_x_values)):
        return get_scatter_error_object("x value does not evaluate to a finite real value")
    
    if cast(Result, scatter_x_values)["units"] == "Dimension Error" or cast(Result, scatter_x_values)["units"] == "Exponent Not Dimensionless":
        return get_scatter_error_object("x value dimension error")

    x_values = [float(cast(Result, scatter_x_values)["value"])]
    x_units = cast(Result, scatter_x_values)["units"]
    x_units_latex = cast(Result, scatter_x_values)["unitsLatex"]
    x_units_custom_units_defined = cast(Result, scatter_x_values)["customUnitsDefined"]
    x_units_custom_units = cast(Result, scatter_x_values)["customUnits"]
    x_units_custom_units_latex = cast(Result, scatter_x_values)["customUnitsLatex"]

    if not is_real_and_finite(cast(Result | FiniteImagResult, scatter_y_values)):
        return get_scatter_error_object("y value does not evaluate to a finite real value")

    if cast(Result, scatter_y_values)["units"] == "Dimension Error" or cast(Result, scatter_y_values)["units"] == "Exponent Not Dimensionless":
        return get_scatter_error_object("y value dimension error")
    
    y_values = [float(cast(Result, scatter_y_values)["value"])]
    y_units = cast(Result, scatter_y_values)["units"]
    y_units_latex = cast(Result, scatter_y_values)["unitsLatex"]
    y_units_custom_units_defined = cast(Result, scatter_y_values)["customUnitsDefined"]
    y_units_custom_units = cast(Result, scatter_y_values)["customUnits"]
    y_units_custom_units_latex = cast(Result, scatter_y_values)["customUnitsLatex"]

    return {"plot": True, "data": [{"isScatter": True, "asLines": combined_scatter["asLines"],
            "numericOutput": True, "numericInput": True,
            "limitsUnitsMatch": True, "input": x_values,  "output": y_values, "inputReversed": False,
            "inputUnits": x_units, "inputUnitsLatex": x_units_latex,
            "inputCustomUnitsDefined": x_units_custom_units_defined, 
            "inputCustomUnits": x_units_custom_units, "inputCustomUnitsLatex": x_units_custom_units_latex,
            "inputName": x_name.removesuffix('_as_variable'),
            "inputNameLatex": custom_latex(sympify(x_name)),
            "outputUnits": y_units, "outputUnitsLatex": y_units_latex,
            "outputCustomUnitsDefined": y_units_custom_units_defined, 
            "outputCustomUnits": y_units_custom_units, "outputCustomUnitsLatex": y_units_custom_units_latex,
            "outputName": y_name.removesuffix('_as_variable'),
            "outputNameLatex": custom_latex(sympify(y_name)) }] }


def combine_plot_results(results: list[Result | FiniteImagResult | PlotResult | MatrixResult],
                         statement_plot_info: list[StatementPlotInfo]):
    final_results: list[Result | FiniteImagResult | list[PlotResult] | MatrixResult] = []

    plot_cell_id = "unassigned"
    for index, result in enumerate(results):
        if not statement_plot_info[index]["isFromPlotCell"]:
            final_results.append(cast(Result | FiniteImagResult, result))
            plot_cell_id = "unassigned"
        elif statement_plot_info[index]["cellNum"] == plot_cell_id:
            cast(list[PlotResult], final_results[-1]).append(cast(PlotResult, result))
        else:
            final_results.append([cast(PlotResult, result),])
            plot_cell_id = statement_plot_info[index]["cellNum"]

    return final_results


def subs_wrapper(expression: Expr, subs: dict[str, str] | dict[str, Expr | float] | dict[Symbol, Symbol]) -> Expr:
    if len(expression.atoms(Integral, Derivative)) > 0:
        # must use slower subs when substituting parameters that may be in a integral or derivative
        # subs automatically delays substitution by wrapping integral or derivative in a subs function
        return cast(Expr, expression.subs(subs))
    else:
        # can safely use much faster xreplace when there are no integrals or derivatives
        return cast(Expr, expression.xreplace(subs))


def get_evaluated_expression(expression: Expr,
                             parameter_subs: dict[Symbol, Expr],
                             simplify_symbolic_expressions: bool) -> tuple[ExprWithAssumptions, str | list[list[str]]]:
    expression = cast(Expr, expression.xreplace(parameter_subs))
    expression = replace_placeholder_funcs(expression, "sympy_func")
    expression = cast(Expr, expression.doit())
    if not is_matrix(expression):
        if simplify_symbolic_expressions:
            symbolic_expression = custom_latex(cancel(expression))
        else:
            symbolic_expression = custom_latex(expression)
    else:
        symbolic_expression = []
        for i in range(expression.rows):
            row = []
            symbolic_expression.append(row)
            for j in range(expression.cols):
                if simplify_symbolic_expressions:
                    row.append(custom_latex(cancel(expression[i,j])))
                else:
                    row.append(custom_latex(cast(Expr, expression[i,j])))

    evaluated_expression = cast(ExprWithAssumptions, expression.evalf(PRECISION))
    return evaluated_expression, symbolic_expression

def get_result(evaluated_expression: ExprWithAssumptions, dimensional_analysis_expression: Expr | None, 
               dim_sub_error: Exception | None, symbolic_expression: str,
               exponents: list[Exponent | ExponentName],
               isRange: bool, exponent_dimensionless: dict[str, bool],
               custom_base_units: CustomBaseUnits | None = None
               ) -> Result | FiniteImagResult:
    
    custom_units_defined = False
    custom_units = ""
    custom_units_latex = ""

    if not all([exponent_dimensionless[local_item["name"]] for local_item in exponents]):
        dim = "Exponent Not Dimensionless"
        dim_latex = "Exponent Not Dimensionless"
    elif isRange:
        # a separate unitsQuery function is used for plots, no need to perform dimensional analysis before subs are made
        dim = ""
        dim_latex = ""
    else:
        dim, dim_latex, custom_units_defined, custom_units, custom_units_latex = dimensional_analysis(dimensional_analysis_expression, dim_sub_error, custom_base_units)

    if evaluated_expression.is_number:
        if evaluated_expression.is_real and evaluated_expression.is_finite:
            result = Result(value=str(evaluated_expression), symbolicValue=symbolic_expression, 
                            numeric=True, units=dim, unitsLatex=dim_latex, real=True, finite=True,
                            customUnitsDefined=custom_units_defined, customUnits=custom_units,
                            customUnitsLatex=custom_units_latex)
        elif not evaluated_expression.is_finite:
            result = Result(value=custom_latex(evaluated_expression), 
                            symbolicValue=symbolic_expression,
                            numeric=True, units=dim, unitsLatex=dim_latex, 
                            real=cast(bool, evaluated_expression.is_real), 
                            finite=False, customUnitsDefined=custom_units_defined,
                            customUnits=custom_units, customUnitsLatex=custom_units_latex)
        else:
            result = FiniteImagResult(value=str(evaluated_expression).replace('I', 'i').replace('*', ''),
                                      symbolicValue=symbolic_expression,
                                      numeric=True, units=dim, unitsLatex=dim_latex, real=False, 
                                      realPart=str(re(evaluated_expression)),
                                      imagPart=str(im(evaluated_expression)),
                                      finite=evaluated_expression.is_finite,
                                      customUnitsDefined=custom_units_defined,
                                      customUnits=custom_units, customUnitsLatex=custom_units_latex)
    else:
        result = Result(value=custom_latex(evaluated_expression),
                        symbolicValue=symbolic_expression,
                        numeric=False, units="", unitsLatex="",
                        real=False, finite=False, customUnitsDefined=False,
                        customUnits="", customUnitsLatex="")

    return result


def get_hashable_matrix_units(matrix_result: MatrixResult) -> tuple[tuple[str, ...], ...]:
    rows: list[tuple[str, ...]] = []
    for result_row in matrix_result["results"]:
        row = []
        for result in result_row:
            row.append(result["units"])

        rows.append(tuple(row))

    return tuple(rows)

def evaluate_statements(statements: list[InputAndSystemStatement],
                        custom_base_units: CustomBaseUnits | None,
                        simplify_symbolic_expressions: bool) -> tuple[list[Result | FiniteImagResult | list[PlotResult] | MatrixResult], dict[int,bool]]:
    num_statements = len(statements)

    if num_statements == 0:
        return [], {}

    statement_plot_info: list[StatementPlotInfo] = [{"isFromPlotCell": statement["isFromPlotCell"],
                            "cellNum": statement.get("cellNum", -1)} for statement in statements]

    parameters = get_all_implicit_parameters(statements)
    parameter_subs = get_parameter_subs(parameters)
    dimensional_analysis_subs: dict[Symbol, Expr] = {
        symbols(param["name"]): get_dims(param["dimensions"]) for param in parameters
    }

    expanded_statements: list[Statement] = expand_with_sub_statements(statements)

    sympify_statements(expanded_statements)

    expanded_statements = get_sorted_statements(expanded_statements)

    combined_expressions: list[CombinedExpression] = []
    exponent_subs: dict[str, Expr | float] = {}
    exponent_dimensionless: dict[str, bool] = {}
    function_exponent_replacements: dict[str, dict[Symbol, Symbol]] = {}
    for i, statement in enumerate(expanded_statements):
        if statement["type"] == "local_sub" or statement["type"] == "blank":
            continue

        if statement["type"] == "assignment" and not statement["isExponent"] and \
            not statement.get("isFunction", False):
            combined_expressions.append({"index": statement["index"],
                                        "isBlank": True,
                                        "isRange": False,
                                        "isScatter": False,
                                        "exponents": []})
            continue

        if statement["type"] == "scatterQuery":
            combined_expressions.append({
                "index": statement["index"],
                "equationIndex": statement["equationIndex"],
                "isBlank": False,
                "isRange": False,
                "isScatter": True,
                "asLines": statement["asLines"],
                "xName": statement["xName"],
                "yName": statement["yName"],
            })

            continue

        temp_statements = expanded_statements[0: i + 1]

        # sub equations into each other in topological order if there are more than one
        function_name = ""
        exponent_name = ""
        if statement["isFunction"] is True:
            is_function = True
            function_name = statement["name"]
            is_exponent = False
        elif statement["isExponent"] is True:
            is_exponent = True
            exponent_name = statement["name"]
            is_function = False
        else:
            is_exponent = False
            is_function = False
        dependency_exponents = statement["exponents"]
        new_function_exponents = {}
        final_expression = statement["expression"]
        for sub_statement in reversed(temp_statements[0:-1]):
            if (sub_statement["type"] == "assignment" or ((is_function or is_exponent) and sub_statement["type"] == "local_sub")) \
                    and not sub_statement["isExponent"]:

                if sub_statement["type"] == "local_sub":
                    if is_function:
                        current_local_subs = sub_statement["function_subs"].get(function_name, {})
                        if len(current_local_subs) > 0:
                            final_expression = subs_wrapper(final_expression, current_local_subs)
                    elif is_exponent:
                        for local_sub_function_name, function_local_subs in sub_statement["function_subs"].items():
                            function_exponent_expression = new_function_exponents.setdefault(local_sub_function_name, final_expression)
                            new_function_exponents[local_sub_function_name] = subs_wrapper(function_exponent_expression, function_local_subs)

                else:
                    if sub_statement["name"] in map(lambda x: str(x), final_expression.free_symbols):
                        dependency_exponents.extend(sub_statement["exponents"])
                        final_expression = subs_wrapper(final_expression, {symbols(sub_statement["name"]): sub_statement["expression"]})
                
                    if is_exponent:
                        new_function_exponents = {
                            key:subs_wrapper(expression, {symbols(sub_statement["name"]): sub_statement["expression"]}) for
                            key, expression in new_function_exponents.items()
                        }


        if is_exponent:
            for current_function_name in new_function_exponents.keys():
                function_exponent_replacements.setdefault(current_function_name, {}).update(
                    {symbols(exponent_name): symbols(exponent_name+current_function_name)}
                )

            new_function_exponents[''] = final_expression

            for current_function_name, final_expression in new_function_exponents.items():
                while(True):
                    available_exonponent_subs = set(function_exponent_replacements.get(current_function_name, {}).keys()) & \
                                                final_expression.free_symbols
                    if len(available_exonponent_subs) == 0:
                        break
                    final_expression = subs_wrapper(final_expression, function_exponent_replacements[current_function_name])
                    final_expression = subs_wrapper(final_expression, exponent_subs)

                final_expression = subs_wrapper(final_expression, exponent_subs)
                final_expression = cast(Expr, final_expression.doit())
                dimensional_analysis_expression, dim_sub_error = get_dimensional_analysis_expression(dimensional_analysis_subs, final_expression)
                dim, _, _, _, _ = dimensional_analysis(dimensional_analysis_expression, dim_sub_error)
                if dim == "":
                    exponent_dimensionless[exponent_name+current_function_name] = True
                else:
                    exponent_dimensionless[exponent_name+current_function_name] = False
                
                final_expression = cast(Expr, cast(Expr, final_expression).xreplace(parameter_subs))
                final_expression = replace_placeholder_funcs(final_expression, "sympy_func")

                exponent_subs[symbols(exponent_name+current_function_name)] = final_expression

        elif is_function:
            while(True):
                available_exonponent_subs = set(function_exponent_replacements.get(function_name, {}).keys()) & \
                                            final_expression.free_symbols
                if len(available_exonponent_subs) == 0:
                    break
                final_expression = subs_wrapper(final_expression, function_exponent_replacements[function_name])
                statement["exponents"].extend([{"name": str(function_exponent_replacements[function_name][key])} for key in available_exonponent_subs])
                final_expression = subs_wrapper(final_expression, exponent_subs)
            if function_name in function_exponent_replacements:
                for exponent_i, exponent in enumerate(statement["exponents"]):
                    if symbols(exponent["name"]) in function_exponent_replacements[function_name]:
                        statement["exponents"][exponent_i] = ExponentName(name = str(function_exponent_replacements[function_name][symbols(exponent["name"])]))
            statement["expression"] = final_expression

        elif statement["type"] == "query":
            if statement["isRange"] is not True:
                current_combined_expression: CombinedExpression = {"index": statement["index"],
                                                "expression": subs_wrapper(final_expression, exponent_subs),
                                                "exponents": dependency_exponents,
                                                "isBlank": False,
                                                "isRange": False,
                                                "isScatter": False,
                                                "isCodeFunctionQuery": statement["isCodeFunctionQuery"] and statement.get("generateCode", False),
                                                "isCodeFunctionRawQuery": statement["isCodeFunctionRawQuery"],
                                                "isFunctionArgument": statement["isFunctionArgument"],
                                                "isUnitsQuery": statement.get("isUnitsQuery", False),
                                                "isEqualityUnitsQuery": statement.get("isEqualityUnitsQuery", False),
                                                "isScatterXValuesQuery": statement.get("isScatterXValuesQueryStatement", False),
                                                "isScatterYValuesQuery": statement.get("isScatterYValuesQueryStatement", False),
                                                "equationIndex": statement.get("equationIndex", 0),
                                                "name": ""
                                            }
            else: 
                current_combined_expression: CombinedExpression = {"index": statement["index"],
                                                "expression": subs_wrapper(final_expression, exponent_subs),
                                                "exponents": dependency_exponents,
                                                "isBlank": False,
                                                "isRange": True,
                                                "isScatter": False,
                                                "isCodeFunctionQuery": False,
                                                "isCodeFunctionRawQuery": False,
                                                "isFunctionArgument": statement["isFunctionArgument"],
                                                "isUnitsQuery": statement.get("isUnitsQuery", False),
                                                "isEqualityUnitsQuery": statement.get("isEqualityUnitsQuery", False),
                                                "equationIndex": statement.get("equationIndex", 0),
                                                "name": "",
                                                "numPoints": statement["numPoints"],
                                                "freeParameter": statement["freeParameter"],
                                                "outputName": statement["outputName"],
                                                "lowerLimitArgument": statement["lowerLimitArgument"],
                                                "upperLimitArgument": statement["upperLimitArgument"],
                                                "lowerLimitInclusive": statement["lowerLimitInclusive"],
                                                "upperLimitInclusive": statement["upperLimitInclusive"],
                                                "unitsQueryFunction": statement["unitsQueryFunction"]
                                            }

            if statement["isFunctionArgument"] is True:
                current_combined_expression["name"] = statement["name"]

            if current_combined_expression["isUnitsQuery"] or \
               current_combined_expression["isCodeFunctionRawQuery"]:
                current_combined_expression["name"] = statement["sympy"]

            if current_combined_expression["isCodeFunctionQuery"]:
                current_combined_expression["name"] = statement.get("functionName", "")

            combined_expressions.append(current_combined_expression)

    range_dependencies: dict[str, Result | FiniteImagResult | MatrixResult] = {}
    range_results: dict[int, CombinedExpressionRange] = {} 
    numerical_system_cell_units: dict[int, list[str | tuple[tuple[str, ...], ...]] ] = {}

    code_func_raw_results: dict[str, CombinedExpressionNoRange] = {}
    code_func_results: list[tuple[str, Result | FiniteImagResult | MatrixResult]] = []

    scatter_combined_expressions: dict[int, CombinedExpressionScatter] = {}
    scatter_x_values: dict[int, Result | FiniteImagResult | MatrixResult] = {}
    scatter_y_values: dict[int, Result | FiniteImagResult | MatrixResult] = {}

    largest_index = max( [statement["index"] for statement in expanded_statements])
    results: list[Result | FiniteImagResult | MatrixResult | PlotResult] = [{"value": "", "symbolicValue": "", "units": "",
                                                                             "unitsLatex": "", "numeric": False,
                                                                             "customUnitsDefined": False, "customUnits": "",
                                                                             "customUnitsLatex": "",
                                                                             "real": False, "finite": False}]*(largest_index+1)

    for item in combined_expressions:
        index = item["index"]
        if item["isBlank"] is True:
            continue
        elif item["isScatter"] is True:
            scatter_combined_expressions[item["equationIndex"]] = item
        else:
            expression = cast(Expr, item["expression"].doit())
            
            evaluated_expression, symbolic_expression = get_evaluated_expression(expression, parameter_subs, simplify_symbolic_expressions)
            dimensional_analysis_expression, dim_sub_error = get_dimensional_analysis_expression(dimensional_analysis_subs, expression)

            if not is_matrix(evaluated_expression):
                results[index] = get_result(evaluated_expression, dimensional_analysis_expression,
                                                                  dim_sub_error, cast(str, symbolic_expression),
                                                                  item["exponents"], item["isRange"],
                                                                  exponent_dimensionless,
                                                                  custom_base_units)
                
            elif is_matrix(evaluated_expression) and (dimensional_analysis_expression is None or \
                 is_matrix(dimensional_analysis_expression)) and isinstance(symbolic_expression, list) :
                matrix_results = []
                for i in range(evaluated_expression.rows):
                    current_row = []
                    matrix_results.append(current_row)
                    for j in range(evaluated_expression.cols):
                        if dimensional_analysis_expression is None:
                            current_dimensional_analysis_expression = None
                        else:
                            current_dimensional_analysis_expression = dimensional_analysis_expression[i,j]

                        current_result = get_result(cast(ExprWithAssumptions, evaluated_expression[i,j]),
                                                    cast(Expr, current_dimensional_analysis_expression),
                                                    dim_sub_error, symbolic_expression[i][j], item["exponents"], 
                                                    item["isRange"], exponent_dimensionless,
                                                    custom_base_units)
                        current_row.append(current_result)
                    
                
                results[index] = MatrixResult(matrixResult=True, results=matrix_results)

            else:
                raise Exception("Dimension or symbolic result not a Matrix for an evaluated expression that is a Matrix")

            if item["isRange"] is True:
                current_result = item
                current_result["expression"] = cast(Expr, evaluated_expression)
                range_results[index] = current_result
            elif item["isScatterXValuesQuery"]:
                scatter_x_values[item["equationIndex"]] = cast(Result | FiniteImagResult | MatrixResult, results[index])
            elif item["isScatterYValuesQuery"]:
                scatter_y_values[item["equationIndex"]] = cast(Result | FiniteImagResult | MatrixResult, results[index])

            if item["isFunctionArgument"] or item["isUnitsQuery"]:
                range_dependencies[item["name"]] = cast(Result | FiniteImagResult | MatrixResult, results[index])

            if item["isCodeFunctionRawQuery"]:
                code_func_raw_results[item["name"]] = cast(CombinedExpressionNoRange, item)
            
            if item["isCodeFunctionRawQuery"]:
                current_result = item
                current_result["expression"] = cast(Expr, evaluated_expression)
                code_func_raw_results[item["name"]] = cast(CombinedExpressionNoRange, current_result)

            if item["isCodeFunctionQuery"]:
                code_func_results.append(( item["name"], cast(Result | FiniteImagResult | MatrixResult, results[index]) ))

            if item["isEqualityUnitsQuery"]:
                units_list = numerical_system_cell_units.setdefault(item["equationIndex"], [])
                current_result = cast(Result | FiniteImagResult | MatrixResult, results[index])
                if is_not_matrix_result(current_result):
                    units_list.append(current_result["units"])
                else:
                    units_list.append(get_hashable_matrix_units(cast(MatrixResult, current_result)))

    numerical_system_cell_unit_errors: dict[int, bool] = {}
    for equation_index, units in numerical_system_cell_units.items():
        # set should have length of 1 if there is no error (LHS and RHS are the same and there isn't an error)
        units = set(units)
        if len(units) == 1:
            if "Dimension Error" not in units and "Exponent Not Dimensionless" not in units:
                error = False
            else:
                error = True
        else:
            error = True
        numerical_system_cell_unit_errors[equation_index] = error

    results_with_ranges = results
    for index,range_result in range_results.items():
        results_with_ranges[index] = get_range_result(range_result, range_dependencies, range_result["numPoints"])

    scatter_id = 1
    for equation_index, combined_scatter in scatter_combined_expressions.items():
        results_with_ranges[combined_scatter["index"]] = get_scatter_plot_result(combined_scatter, 
                                                                                 scatter_x_values[equation_index],
                                                                                 scatter_y_values[equation_index],
                                                                                 scatter_id)
        scatter_id += 1
        

    for (name, result) in code_func_results:
        try:
            generatedCode = NumPyPrinter().doprint(code_func_raw_results[name]["expression"])
        except Exception as err:
            generatedCode = f"# Error generating code: {type(err).__name__}, {err}"

        if not isinstance(generatedCode, str):
            generatedCode = f"# Error generating code, string not returned from NumPyPrinter call"

        result["generatedCode"] = generatedCode

    return combine_plot_results(results_with_ranges[:num_statements], statement_plot_info), numerical_system_cell_unit_errors


def get_query_values(statements: list[InputAndSystemStatement],
                     custom_base_units: CustomBaseUnits | None,
                     simplify_symbolic_expressions: bool):
    error: None | str = None

    results: list[Result | FiniteImagResult | list[PlotResult] | MatrixResult] = []
    numerical_system_cell_errors: dict[int, bool] = {}
    try:
        results, numerical_system_cell_errors = evaluate_statements(statements, custom_base_units, simplify_symbolic_expressions)
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
    statements = cast(list[EqualityStatement], loads(statements))
    variables = cast(list[str], loads(variables))

    error: None | str = None
    new_statements: list[list[SystemSolutionAssignmentStatement]]
    display_solutions: dict[str, list[str]]

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
    statements = cast(list[EqualityStatement], loads(statements))
    variables = cast(list[str], loads(variables))
    guesses = cast(list[str], loads(guesses))
    guess_statements = cast(list[GuessAssignmentStatement], loads(guessStatements))

    error = None
    new_statements: list[list[EqualityUnitsQueryStatement | GuessAssignmentStatement]] = []
    display_solutions: dict[str, list[str]] = {}
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
    statements_and_systems = cast(StatementsAndSystems, loads(statements_and_systems))
    statements: list[InputAndSystemStatement] = cast(list[InputAndSystemStatement], statements_and_systems["statements"])
    system_definitions = statements_and_systems["systemDefinitions"]
    custom_base_units = statements_and_systems.get("customBaseUnits", None)
    simplify_symbolic_expressions = statements_and_systems["simplifySymbolicExpressions"]

    system_results: list[SystemResult] = []
    equation_to_system_cell_map: dict[int,int] = {}
    # Solve any systems first
    for i, system_definition in enumerate(system_definitions):
        selected_solution = system_definition["selectedSolution"]

        system_error: None | str
        system_solutions: list[list[SystemSolutionAssignmentStatement]] | list[list[EqualityUnitsQueryStatement | GuessAssignmentStatement]]
        display_solutions: dict[str, list[str]]
        # converting arguments to json to allow lru_cache to work since lists and dicts are not hashable
        # without lru_cache, will be resolving all systems on every sheet update
        if system_definition["numericalSolve"] is False:
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
    error: str | None
    results: list[Result | FiniteImagResult | list[PlotResult] | MatrixResult]
    numerical_system_cell_errors: dict[int, bool]
    error, results, numerical_system_cell_errors = get_query_values(statements, custom_base_units, simplify_symbolic_expressions)

    # If there was a numerical solve, check to make sure there were not unit mismatches
    # between the lhs and rhs of each equality in the system
    numerical_solve_units_error = False
    for equation_index, loop_error in numerical_system_cell_errors.items():
        if loop_error and not system_results[equation_to_system_cell_map[equation_index]]["error"]:
            numerical_solve_units_error = True
            system_results[equation_to_system_cell_map[equation_index]]["error"] = "Units mismatch in system of equations"

    if not error and numerical_solve_units_error:
        error = "Units error in System Solve Cell"

    try:
        json_result = dumps(Results(error=error, results=results, systemResults=system_results))
    except Exception as e:
        error = f"Error JSON serializing Python results: {e.__class__.__name__}"
        return dumps(Results(error=error, results=[], systemResults=[]))

    return json_result


class FuncContainer(object):
    pass

if PROFILE:
    def solve_sheet_profile(input):
        values = {"input": input}
        cProfile.runctx('output = solve_sheet(input)', globals(), values, None, sort="cumtime") # type: ignore[possibly-undefined]
        return values["output"]


py_funcs = FuncContainer()
if PROFILE:
    py_funcs.solveSheet = solve_sheet_profile  #pyright: ignore
else:
    py_funcs.solveSheet = solve_sheet          #pyright: ignore

# pyodide returns last statement as an object that is assessable from javascript
py_funcs #pyright: ignore
