PROFILE=False

if PROFILE:
    import cProfile

from sys import setrecursionlimit

# must be at least 131 to load sympy, cpython is 3000 by default
setrecursionlimit(1000)

from functools import lru_cache, partial, reduce
import traceback
from importlib import import_module

from json import loads, dumps

import math

from sympy import (
    Float,
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
    ceiling,
    sign,
    sqrt,
    factorial,
    summation
)

class ExprWithAssumptions(Expr):
    is_finite: bool
    is_integer: bool

from sympy.core.function import UndefinedFunction

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

dimensions = (mass, length, time, current, temperature, luminous_intensity,
              amount_of_substance, angle, information)
dimension_symbols = set((dimension.name for dimension in dimensions))

from sympy.physics.units.systems.si import dimsys_SI

from sympy.utilities.iterables import topological_sort

from sympy.utilities.lambdify import lambdify, implemented_function

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
class UnitlessSubExpressionName(TypedDict):
    name: str
    unitlessContext: str

class UnitlessSubExpression(TypedDict):
    type: Literal["assignment"]
    name: str
    sympy: str
    params: list[str]
    isUnitlessSubExpression: Literal[True]
    unitlessContext: str
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    unitlessSubExpressions: list['UnitlessSubExpression | UnitlessSubExpressionName']
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class BaseUserFunction(TypedDict):
    type: Literal["assignment"]
    name: str
    sympy: str
    params: list[str]
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[True]
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
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
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
    params: list[str]
    units: Literal[""]
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[True]
    isRange: Literal[False]
    isDataTableQuery: Literal[False]
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
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
    params: list[str]
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[True]
    isFunction: Literal[False]    
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class FunctionArgumentQuery(TypedDict):
    type: Literal["query"]
    sympy: str
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
    params: list[str]
    name: str
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[True]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isRange: Literal[False]
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class BlankStatement(TypedDict):
    type: Literal["blank"]
    params: list[str] # will be empty list
    implicitParams: list[ImplicitParameter] # will be empty list
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName] # will be empty list
    isFromPlotCell: Literal[False]
    index: int # added in Python, not pressent in json

class QueryAssignmentCommon(TypedDict):
    sympy: str
    implicitParams: list[ImplicitParameter]
    functions: list[UserFunction | UserFunctionRange | FunctionUnitsQuery]
    arguments: list[FunctionArgumentQuery | FunctionArgumentAssignment]
    localSubs: list[LocalSubstitution | LocalSubstitutionRange]    
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
    params: list[str]
    index: int # added in Python, not pressent in json
    expression: Expr # added in Python, not pressent in json

class AssignmentStatement(QueryAssignmentCommon):
    type: Literal["assignment"]
    name: str
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isFromPlotCell: Literal[False]
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isRange: Literal[False]

class SystemSolutionAssignmentStatement(AssignmentStatement):
    display: str
    displayName: str

class BaseQueryStatement(QueryAssignmentCommon):
    type: Literal["query"]
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isEqualityUnitsQuery: bool
    isScatterXValuesQueryStatement: Literal[False]
    isScatterYValuesQueryStatement: Literal[False]
    isFromPlotCell: bool
    units: str
    unitsLatex: str

class SubQueryStatement(BaseQueryStatement):
    isRange: Literal[False]
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isSubQuery: Literal[True]

class QueryStatement(BaseQueryStatement):
    isRange: Literal[False]
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isSubQuery: Literal[False]
    subQueries: list[SubQueryStatement]

class DataTableQueryStatement(BaseQueryStatement):
    isRange: Literal[False]
    isDataTableQuery: Literal[True]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isSubQuery: Literal[False]

class RangeQueryStatement(BaseQueryStatement):
    isRange: Literal[True]
    isParametric: bool
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isSubQuery: Literal[False]
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
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isEqualityUnitsQuery: Literal[False]
    isScatterXValuesQueryStatement: Literal[True]
    isScatterYValuesQueryStatement: Literal[False]
    isFromPlotCell: bool
    isSubQuery: Literal[False]
    units: str
    equationIndex: int
    unitsLatex: str
    dimensions: list[float]

class ScatterYValuesQueryStatement(QueryAssignmentCommon):
    type: Literal["query"]
    isRange: Literal[False]
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isEqualityUnitsQuery: Literal[False]
    isScatterXValuesQueryStatement: Literal[False]
    isScatterYValuesQueryStatement: Literal[True]
    isFromPlotCell: bool
    isSubQuery: Literal[False]
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
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
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
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[True]   

class CodeFunctionQueryStatement(BaseQueryStatement):
    isRange: Literal[False]
    isDataTableQuery: Literal[False]
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
    isDataTableQuery: Literal[False]
    isCodeFunctionQuery: Literal[False]
    isCodeFunctionRawQuery: Literal[False]
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isUnitsQuery: Literal[False]
    isEqualityUnitsQuery: Literal[True]
    isFromPlotCell: bool
    units: str
    equationIndex: int

class EqualityStatement(QueryAssignmentCommon):
    type: Literal["equality"]
    isUnitlessSubExpression: Literal[False]
    isFunctionArgument: Literal[False]
    isFunction: Literal[False]
    isFromPlotCell: Literal[False]
    isRange: Literal[False]
    isDataTableQuery: Literal[False]
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

class FluidFunction(TypedDict):
    name: str
    fluid: str
    output: str
    outputDims: list[float]
    input1: str
    input1Dims: list[float]
    input2: str
    input2Dims: list[float]
    input3: NotRequired[str]
    input3Dims: NotRequired[list[float]]

class InterpolationFunction(TypedDict):
    type: Literal["polyfit"] | Literal["interpolation"]
    name: str
    inputValues: list[float]
    outputValues: list[float]
    inputDims: list[float]
    outputDims: list[float]
    order: int

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
class LocalSubstitutionStatement(TypedDict):
    type: Literal["local_sub"]
    name: str
    params: list[str]
    function_subs: dict[str, dict[str, str]]
    isUnitlessSubExpression: Literal[False]
    index: int

InputStatement = AssignmentStatement | QueryStatement | RangeQueryStatement | BlankStatement | \
                 CodeFunctionQueryStatement | ScatterQueryStatement | SubQueryStatement
InputAndSystemStatement = InputStatement | EqualityUnitsQueryStatement | GuessAssignmentStatement | \
                          SystemSolutionAssignmentStatement
Statement = InputStatement | UnitlessSubExpression | UserFunction | UserFunctionRange | FunctionUnitsQuery | \
            FunctionArgumentQuery | FunctionArgumentAssignment | \
            SystemSolutionAssignmentStatement | LocalSubstitutionStatement | \
            GuessAssignmentStatement | EqualityUnitsQueryStatement | CodeFunctionRawQuery | \
            ScatterXValuesQueryStatement | ScatterYValuesQueryStatement
SystemDefinition = ExactSystemDefinition | NumericalSystemDefinition


class StatementsAndSystems(TypedDict):
    statements: list[InputStatement]
    systemDefinitions: list[SystemDefinition]
    fluidFunctions: list[FluidFunction]
    interpolationFunctions: list[InterpolationFunction]
    customBaseUnits: NotRequired[CustomBaseUnits]
    simplifySymbolicExpressions: bool
    convertFloatsToFractions: bool

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
    isSubResult: bool
    subQueryName: str

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
    isSubResult: bool
    subQueryName: str

class MatrixResult(TypedDict):
    matrixResult: Literal[True]
    results: list[list[Result | FiniteImagResult]]
    generatedCode: NotRequired[str]
    isSubResult: bool
    subQueryName: str

class PlotData(TypedDict):
    isParametric: bool
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
    parametricErrorMessage: NotRequired[str]

class PlotResult(TypedDict):
    plot: Literal[True]
    data: list[PlotData]

class SystemResult(TypedDict):
    error: None | str
    solutions: dict[str, list[str]]
    selectedSolution: int

class DataTableResult(TypedDict):
    dataTableResult: Literal[True]
    colData: dict[int, MatrixResult]

def is_real_and_finite(result: Result | FiniteImagResult):
    return result["real"] and result["finite"]

def is_not_matrix_result(result: Result | FiniteImagResult | MatrixResult) -> TypeGuard[Result | FiniteImagResult]:
    return not result.get("matrixResult", False)

def is_matrix_result(result: Result | FiniteImagResult | MatrixResult | PlotResult) -> TypeGuard[MatrixResult]:
    return result.get("matrixResult", False)

def is_matrix(expression: Expr | Matrix) -> TypeGuard[Matrix]:
    return isinstance(expression, MatrixBase)

class Results(TypedDict):
    error: None | str
    results: list[Result | FiniteImagResult | MatrixResult | DataTableResult | list[PlotResult]]
    systemResults: list[SystemResult]

# The following types are created in Python and don't exist in the TypeScript code
class StatementPlotInfo(TypedDict):
    isFromPlotCell: bool
    cellNum: int

class StatementDataTableInfo(TypedDict):
    isFromDataTableCell: bool
    cellNum: int
    colNum: int

class CombinedExpressionBlank(TypedDict):
    index: int
    isBlank: Literal[True]
    isRange: Literal[False]
    isScatter: Literal[False]
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
    isSubQuery: Literal[False]
    subQueryName: Literal[""]

class CombinedExpressionNoRange(TypedDict):
    index: int
    name: str
    expression: Expr
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
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
    isSubQuery: bool
    subQueryName: str

class CombinedExpressionRange(TypedDict):
    index: int
    name: str
    expression: Expr
    unitlessSubExpressions: list[UnitlessSubExpression | UnitlessSubExpressionName]
    isBlank: Literal[False]
    isRange: Literal[True]
    isParametric: bool
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
    isSubQuery: Literal[False]
    subQueryName: Literal[""]

class CombinedExpressionScatter(TypedDict):
    index: int
    isBlank: Literal[False]
    isRange: Literal[False]
    isScatter: Literal[True]
    asLines: bool
    equationIndex: int
    xName: str
    yName: str
    isSubQuery: Literal[False]
    subQueryName: Literal[""]

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

ZERO_PLACEHOLDER = "implicit_param__zero"

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

    try:
        result_latex = latex(new_expression, ln_notation=True, mul_symbol='dot', inv_trig_style='full')
    except ValueError as e:
        result_latex = """
\\begin{split}
&\\text{Error generating symbolic result.} \\\\ 
&\\text{Try disabling the "Automatically Convert Decimal Values to Fractions" sheet setting.}
\\end{split}
"""

    result_latex = result_latex.replace('_{as variable}','')

    return result_latex

_range = Function("_range")

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

    if expr.func == _range:
        new_args = expr.args
    else:
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

    first_arg_dims = custom_get_dimensional_dependencies(first_arg)
    if all(custom_get_dimensional_dependencies(arg) == first_arg_dims for arg in args[1:]):
        return first_arg

    raise TypeError('All input arguments to function need to have compatible units')

def ensure_dims_all_compatible_scalar_or_matrix(*args):
    if len(args) == 1 and is_matrix(args[0]):
        return ensure_dims_all_compatible(*args[0])
    else:
        return ensure_dims_all_compatible(*args)

def ensure_dims_all_compatible_piecewise(*args):
    # Need to make sure first element in tuples passed to Piecewise all have compatible units
    # The second element of the tuples has already been checked by And, StrictLessThan, etc.
    return ensure_dims_all_compatible(*[arg[0] for arg in args])

def ensure_unitless_in_angle_out(arg):
    if custom_get_dimensional_dependencies(arg) == {}:
        return angle
    else:
        raise TypeError('Unitless input argument required for function')

def ensure_unitless_in(arg):
    if custom_get_dimensional_dependencies(arg) == {}:
        return arg
    else:
        raise TypeError('Unitless input argument required for function')

def ensure_any_unit_in_angle_out(arg):
    # ensure input arg units make sense (will raise if inconsistent)
    custom_get_dimensional_dependencies(arg)
    
    return angle

def ensure_any_unit_in_same_out(arg):
    # ensure input arg units make sense (will raise if inconsistent)
    custom_get_dimensional_dependencies(arg)
    
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
                dim, _ = get_mathjs_units(cast(dict[Dimension, float], custom_get_dimensional_dependencies(cast(Expr, arg[j,i]))))
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
        return Mul(exp1, exp2)
    
def custom_matmul_dims(*args: Expr):
    if len(args) == 2 and is_matrix(args[0]) and is_matrix(args[1]) and \
       (((args[0].rows == 3 and args[0].cols == 1) and (args[1].rows == 3 and args[1].cols == 1)) or \
        ((args[0].rows == 1 and args[0].cols == 3) and (args[1].rows == 1 and args[1].cols == 3))):
        
        result = Matrix([Add(Mul(args[0][1],args[1][2]),Mul(args[0][2],args[1][1])),
                         Add(Mul(args[0][2],args[1][0]),Mul(args[0][0],args[1][2])),
                         Add(Mul(args[0][0],args[1][1]),Mul(args[0][1],args[1][0]))])
        
        if args[0].rows == 3:
            return result
        else:
            return result.T
    else:
        return Mul(*args)
    
def custom_min(*args: Expr):
    if len(args) == 1 and is_matrix(args[0]):
        return Min(*args[0])
    else:
        return Min(*args)
    
def custom_sum(*args: Expr):
    if len(args) == 1 and is_matrix(args[0]):
        return Add(*args[0])
    else:
        return Add(*args)
    
def custom_average(*args: Expr):
    if len(args) == 1 and is_matrix(args[0]):
        return Add(*args[0]) / sympify(len(args[0]))
    else:
        return Add(*args) / sympify(len(args))
    
def custom_stdev(population, *args: Expr):
    if len(args) == 1 and is_matrix(args[0]):
        values = args[0]
    else:
        values = args
    
    ddof = 0 if population else 1
    count = len(values)

    if count < 2:
        raise ValueError('Must have at least 2 values to estimate standard deviation')

    mean = Add(*values) / sympify(count)

    return sqrt(Add( *( (value - mean)**2 for value in values ) ) / sympify(count - ddof))
    
def custom_count(*args: Expr):
    if len(args) == 1 and is_matrix(args[0]):
        return sympify(len(args[0]))
    else:
        raise TypeError('Count function requires a vector or matrix as input')

def custom_max(*args: Expr):
    if len(args) == 1 and is_matrix(args[0]):
        return Max(*args[0])
    else:
        return Max(*args)

def custom_round(expression: Expr):
    return expression.round()

def custom_range(*args: Expr):
    if not all( (arg.is_real and arg.is_finite and not isinstance(arg, Dimension) for arg in args ) ): # type: ignore
        raise TypeError('All range inputs must be unitless and must evaluate to real and finite values')

    start = cast(Expr, sympify('1'))
    step = cast(Expr, sympify('1'))

    if len(args) == 1:
        stop = args[0]
    elif len(args) == 2:
        start = args[0]
        stop = args[1]
    elif len(args) == 3:
        start = args[0]
        stop = args[1]
        step = args[2]
    else:
        raise ValueError('Too many arguments to range function')
    
    values: list[Expr] = []
    current_value = start
    step_sign = sign(step)
    while(step_sign*current_value <= step_sign*stop): # type: ignore
        values.append(current_value)
        current_value = current_value + step # type: ignore
    
    if len(values) == 0:
        raise ValueError('Attempt to create empty range')

    return Matrix(values)

class PlaceholderFunction(TypedDict):
    dim_func: Callable | Function
    sympy_func: object

def UniversalInverse(expression: Expr) -> Expr:
    return expression**-1

def IndexMatrix(expression: Expr, i: Expr, j: Expr) -> Expr:
    for subscript in cast(list[ExprWithAssumptions], (i,j)):
        if subscript.is_real and cast(int, subscript) <= 0:
            raise Exception("Matrix indices must be greater than 0")
        
    return expression[i-1, j-1] # type: ignore


def _factorial_imp_(arg1: float):
    if arg1.is_integer() and arg1 >= 0.0:
        return math.factorial(int(arg1))
    else:
        raise ValueError("The factorial function can only be evaluated on a nonnegative integer")

factorial._imp_ = staticmethod(_factorial_imp_) # type: ignore

def custom_norm(expression: Matrix):
    return expression.norm()

def custom_dot(exp1: Matrix, exp2: Matrix):
    return exp1.dot(exp2)

def custom_derivative(local_expr: Expr, global_expr: Expr, dummy_diff_var: Symbol, diff_var: Expr, order: int | None = None):
    if order is not None:
        return Derivative(local_expr, dummy_diff_var, order, evaluate=True).subs({dummy_diff_var: diff_var})
    else:
        return Derivative(local_expr, dummy_diff_var, evaluate=True).subs({dummy_diff_var: diff_var})
    
def custom_derivative_dims(local_expr: Expr, global_expr: Expr, dummy_diff_var: Symbol, diff_var: Expr, order: int | None = None):
    if order is None:
        order = 1
    return global_expr / diff_var**order # type: ignore

def custom_integral(local_expr: Expr, global_expr: Expr, dummy_integral_var: Symbol, integral_var: Expr, 
                    lower_limit: Expr | None = None, upper_limit: Expr | None = None, 
                    lower_limit_dims: Expr | None = None, upper_limit_dims: Expr | None = None):
    if lower_limit is not None and upper_limit is not None:
        return Integral(local_expr, (dummy_integral_var, lower_limit, upper_limit)).doit().subs({dummy_integral_var: integral_var})
    else:
        return Integral(local_expr, dummy_integral_var).doit().subs({dummy_integral_var: integral_var})
    
def custom_integral_dims(local_expr: Expr, global_expr: Expr, dummy_integral_var: Symbol, integral_var: Expr, 
                    lower_limit: Expr | None = None, upper_limit: Expr | None = None, 
                    lower_limit_dims: Expr | None = None, upper_limit_dims: Expr | None = None):
    if lower_limit is not None and upper_limit is not None:
        ensure_dims_all_compatible(lower_limit_dims, upper_limit_dims)
        return global_expr * lower_limit_dims # type: ignore
    else:
        return global_expr * integral_var # type: ignore

def custom_summation(operand: Expr, dummy_var: Symbol, start: Expr, end: Expr):
    return summation(operand, (dummy_var, start, end))

CP = None

def load_CoolProp():
    global CP
    if CP is None:
        CoolProp = import_module('CoolProp')
        CP = CoolProp.CoolProp

def PropsSI_wrapper(fluid_function: FluidFunction):
    global CP

    if CP is None:
        CP = cast(Any, CP)
        load_CoolProp()

    class PropsSI_function(Function):
        is_real = True

        @staticmethod
        def _imp_(arg1, arg2):
            return cast(Any, CP).PropsSI(fluid_function["output"],
                                         fluid_function["input1"], float(arg1),
                                         fluid_function["input2"], float(arg2), fluid_function["fluid"])

        def _eval_evalf(self, prec):
            if (len(self.args) != 2):
                raise TypeError(f'The fluid function {fluid_function["name"]} requires 2 input values, ({len(self.args)} given)')
            
            if (self.args[0].is_number and self.args[1].is_number):
                return sympify(cast(Any, CP).PropsSI(fluid_function["output"], fluid_function["input1"], float(cast(Expr, self.args[0])),
                                                     fluid_function["input2"], float(cast(Expr, self.args[1])), fluid_function["fluid"]))
            
        def fdiff(self, argindex=1):
            delta = sympify(1e-8)
            upper_args = [arg if i != argindex-1 else arg + delta for i, arg in enumerate(self.args)]

            return (PropsSI_function(*upper_args) - PropsSI_function(*self.args)) / delta # type: ignore
        
    PropsSI_function.__name__ = fluid_function["name"]

    return PropsSI_function


def fluid_dims(fluid_function: FluidFunction, input1, input2):
    ensure_dims_all_compatible(get_dims(fluid_function["input1Dims"]), input1)
    ensure_dims_all_compatible(get_dims(fluid_function["input2Dims"]), input2)
    
    return get_dims(fluid_function["outputDims"])


class TextFloat(Float):
    def __new__(cls, value, text):
        return Float.__new__(cls, value)

    def __init__(self, value, text):
        self._ep_text = text

    def _latex(self, printer):
        return f"\\text{{{self._ep_text}}}"


def PhaseSI_wrapper(fluid_function: FluidFunction):
    global CP

    if CP is None:
        CP = cast(Any, CP)
        load_CoolProp()

    class PhaseSI_function(Function):
        is_real = True

        @staticmethod
        def _imp_(arg1, arg2):
            return cast(Any, CP).PropsSI('PHASE',
                                         fluid_function["input1"], float(arg1),
                                         fluid_function["input2"], float(arg2), fluid_function["fluid"])
        
        @classmethod
        def eval(cls, arg1, arg2):
            if arg1.is_number and arg2.is_number:
                phase_text = cast(Any, CP).PhaseSI(fluid_function["input1"], float(arg1),
                                        fluid_function["input2"], float(arg2), fluid_function["fluid"])
                phase_index = cast(Any, CP).get_phase_index(f"phase_{phase_text}")

                return TextFloat(phase_index, phase_text)
    
    PhaseSI_function.__name__ = fluid_function["name"]

    return PhaseSI_function


def HAPropsSI_wrapper(fluid_function: FluidFunction):
    global CP

    if CP is None:
        CP = cast(Any, CP)
        load_CoolProp()

    class HAPropsSI_function(Function):
        is_real = True

        @staticmethod
        def _imp_(arg1, arg2, arg3):
            return cast(Any, CP).HAPropsSI(fluid_function["output"],
                                           fluid_function["input1"], float(arg1),
                                           fluid_function["input2"], float(arg2),
                                           fluid_function.get("input3"), float(arg3))
        
        def _eval_evalf(self, prec):
            if (len(self.args) != 3):
                raise TypeError(f'The fluid function {fluid_function["name"]} requires 3 input values ({len(self.args)} given)')

            if self.args[0].is_number and self.args[1].is_number and self.args[2].is_number:
                return sympify(cast(Any, CP).HAPropsSI(fluid_function["output"], fluid_function["input1"], float(cast(Expr, self.args[0])),
                                                       fluid_function["input2"], float(cast(Expr, self.args[1])), 
                                                       fluid_function.get("input3"), float(cast(Expr, self.args[2]))))

        def fdiff(self, argindex=1):
            delta = sympify(1e-8)
            upper_args = [arg if i != argindex-1 else arg + delta for i, arg in enumerate(self.args)]

            return (HAPropsSI_function(*upper_args) - HAPropsSI_function(*self.args)) / delta # type: ignore
        
    HAPropsSI_function.__name__ = fluid_function["name"]

    return HAPropsSI_function


def HA_fluid_dims(fluid_function: FluidFunction, input1, input2, input3):
    ensure_dims_all_compatible(get_dims(fluid_function["input1Dims"]), input1)
    ensure_dims_all_compatible(get_dims(fluid_function["input2Dims"]), input2)
    ensure_dims_all_compatible(get_dims(fluid_function.get("input3Dims", [])), input3)
    
    return get_dims(fluid_function["outputDims"])

def get_fluid_placeholder_map(fluid_functions: list[FluidFunction]) -> dict[Function, PlaceholderFunction]:
    new_map = {}

    for fluid_function in fluid_functions:
        if fluid_function["fluid"] == "HumidAir":
            sympy_func = HAPropsSI_wrapper(fluid_function)
            
            dim_func = partial(lambda ff, input1, input2, input3 : HA_fluid_dims(ff, input1, input2, input3), fluid_function)
        elif fluid_function["output"] == "PHASE":
            sympy_func = PhaseSI_wrapper(fluid_function)
            
            dim_func = partial(lambda ff, input1, input2 : fluid_dims(ff, input1, input2), fluid_function)
        else:
            sympy_func = PropsSI_wrapper(fluid_function)
            
            dim_func = partial(lambda ff, input1, input2 : fluid_dims(ff, input1, input2), fluid_function)

        new_map[Function(fluid_function["name"])] = {"dim_func": dim_func, 
                                                     "sympy_func": sympy_func}

    return new_map


NP = None

def load_numpy():
    global NP
    if NP is None:
        NP = import_module('numpy')

def get_interpolation_wrapper(interpolation_function: InterpolationFunction):
    global NP
    if NP is None:
        load_numpy()
    NP = cast(Any, NP)

    input_values = NP.array(interpolation_function["inputValues"])
    output_values = NP.array(interpolation_function["outputValues"])

    if not NP.all(NP.diff(input_values) > 0):
        raise ValueError('The input values must be an increasing sequence for interpolation')

    class interpolation_wrapper(Function):
        is_real = True

        @staticmethod
        def _imp_(arg1):
            return cast(Any, NP).interp(float(arg1), input_values, output_values)

        def _eval_evalf(self, prec):
            if (len(self.args) != 1):
                raise TypeError(f'The interpolation function {interpolation_function["name"]} requires 1 input value, ({len(self.args)} given)')
            
            if (self.args[0].is_number):
                float_input = float(cast(Expr, self.args[0]))

                if float_input < input_values[0] or float_input > input_values[-1]:
                    raise ValueError('Attempt to extrapolate with an interpolation function')

                return sympify(cast(Any, NP).interp(float_input, input_values, output_values))
            
        def fdiff(self, argindex=1):
            delta = sympify(1e-8)
            upper_args = [arg if i != argindex-1 else arg + delta for i, arg in enumerate(self.args)]

            return (interpolation_wrapper(*upper_args) - interpolation_wrapper(*self.args)) / delta # type: ignore
    
    interpolation_wrapper.__name__ = interpolation_function["name"]

    def interpolation_dims_wrapper(input):
        ensure_dims_all_compatible(get_dims(interpolation_function["inputDims"]), input)
        
        return get_dims(interpolation_function["outputDims"])

    return interpolation_wrapper, interpolation_dims_wrapper

def get_polyfit_wrapper(polyfit_function: InterpolationFunction):
    global NP
    if NP is None:
        load_numpy()
    NP = cast(Any, NP)

    fitted_poly = NP.polynomial.Polynomial.fit(polyfit_function["inputValues"],
                                               polyfit_function["outputValues"],
                                               polyfit_function["order"])
    coefficients = fitted_poly.convert()

    class polyfit_wrapper(Function):
        @classmethod
        def eval(cls, arg1: Expr):
            return Add(*(coef*arg1**power for power,coef in enumerate(coefficients)))
        
    polyfit_wrapper.__name__ = polyfit_function["name"]

    def polyfit_dims_wrapper(input):
        ensure_dims_all_compatible(get_dims(polyfit_function["inputDims"]), input)
        
        return get_dims(polyfit_function["outputDims"])

    return polyfit_wrapper, polyfit_dims_wrapper

def get_interpolation_placeholder_map(interpolation_functions: list[InterpolationFunction]) -> dict[Function, PlaceholderFunction]:
    new_map = {}

    for interpolation_function in interpolation_functions:
        match interpolation_function["type"]:
            case "interpolation":
                sympy_func, dim_func = get_interpolation_wrapper(interpolation_function)
            case "polyfit":
                sympy_func, dim_func = get_polyfit_wrapper(interpolation_function)
            case _:
                continue

        new_map[Function(interpolation_function["name"])] = {"dim_func": dim_func, 
                                                             "sympy_func": sympy_func}

    return new_map


data_table_id_wrapper = Function('_data_table_id_wrapper')
data_table_calc_wrapper = Function('_data_table_calc_wrapper')

class DataTableSubs:
    def __init__(self):
        self.subs_stack: list[dict[Symbol, Expr]] = []
        self._next_id = 0
        self.shortest_col_stack: list[None | int] = []

    def get_next_id(self):
        self._next_id += 1
        return self._next_id-1

global_placeholder_map: dict[Function, PlaceholderFunction] = {
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
    cast(Function, Function('_Max')) : {"dim_func": ensure_dims_all_compatible_scalar_or_matrix, "sympy_func": custom_max},
    cast(Function, Function('_Min')) : {"dim_func": ensure_dims_all_compatible_scalar_or_matrix, "sympy_func": custom_min},
    cast(Function, Function('_sum')) : {"dim_func": ensure_dims_all_compatible_scalar_or_matrix, "sympy_func": custom_sum},
    cast(Function, Function('_average')) : {"dim_func": ensure_dims_all_compatible_scalar_or_matrix, "sympy_func": custom_average},
    cast(Function, Function('_stdev')) : {"dim_func": ensure_dims_all_compatible_scalar_or_matrix, "sympy_func": partial(custom_stdev, False)},
    cast(Function, Function('_stdevp')) : {"dim_func": ensure_dims_all_compatible_scalar_or_matrix, "sympy_func": partial(custom_stdev, True)},
    cast(Function, Function('_count')) : {"dim_func": custom_count, "sympy_func": custom_count},
    cast(Function, Function('_Abs')) : {"dim_func": ensure_any_unit_in_same_out, "sympy_func": Abs},
    cast(Function, Function('_Inverse')) : {"dim_func": ensure_inverse_dims, "sympy_func": UniversalInverse},
    cast(Function, Function('_Transpose')) : {"dim_func": custom_transpose, "sympy_func": custom_transpose},
    cast(Function, Function('_Determinant')) : {"dim_func": custom_determinant, "sympy_func": custom_determinant},
    cast(Function, Function('_mat_multiply')) : {"dim_func": custom_matmul_dims, "sympy_func": custom_matmul},
    cast(Function, Function('_multiply')) : {"dim_func": Mul, "sympy_func": Mul},
    cast(Function, Function('_IndexMatrix')) : {"dim_func": IndexMatrix, "sympy_func": IndexMatrix},
    cast(Function, Function('_Eq')) : {"dim_func": Eq, "sympy_func": Eq},
    cast(Function, Function('_norm')) : {"dim_func": custom_norm, "sympy_func": custom_norm},
    cast(Function, Function('_dot')) : {"dim_func": custom_dot, "sympy_func": custom_dot},
    cast(Function, Function('_ceil')) : {"dim_func": ensure_unitless_in, "sympy_func": ceiling},
    cast(Function, Function('_floor')) : {"dim_func": ensure_unitless_in, "sympy_func": floor},
    cast(Function, Function('_round')) : {"dim_func": ensure_unitless_in, "sympy_func": custom_round},
    cast(Function, Function('_Derivative')) : {"dim_func": custom_derivative_dims, "sympy_func": custom_derivative},
    cast(Function, Function('_Integral')) : {"dim_func": custom_integral_dims, "sympy_func": custom_integral},
    cast(Function, Function('_range')) : {"dim_func": custom_range, "sympy_func": custom_range},
    cast(Function, Function('_factorial')) : {"dim_func": factorial, "sympy_func": factorial},
    cast(Function, Function('_summation')) : {"dim_func": custom_summation, "sympy_func": custom_summation},
}

global_placeholder_set = set(global_placeholder_map.keys())
dummy_var_placeholder_set = (Function('_Derivative'), Function('_Integral'))
multiply_placeholder_set = (Function('_multiply'), Function('_mat_multiply'))
placeholder_inverse_map = { value["sympy_func"]: key for key, value in reversed(global_placeholder_map.items()) }
placeholder_inverse_set = set(placeholder_inverse_map.keys())

def replace_sympy_funcs_with_placeholder_funcs(expression: Expr) -> Expr:
    replacements = { value.func for value in expression.atoms(Function) } & placeholder_inverse_set
    if len(replacements) > 0:
        for key, value in placeholder_inverse_map.items(): # must replace in dictionary order
            if key in replacements:
                expression = cast(Expr, expression.replace(key, value))

    return expression

def replace_placeholder_funcs(expr: Expr, 
                              func_key: Literal["dim_func"] | Literal["sympy_func"],
                              placeholder_map: dict[Function, PlaceholderFunction],
                              placeholder_set: set[Function],
                              data_table_subs: DataTableSubs | None) -> Expr:
    if is_matrix(expr):
        rows = []
        for i in range(expr.rows):
            row = []
            rows.append(row)
            for j in range(expr.cols):
                row.append(replace_placeholder_funcs(cast(Expr, expr[i,j]), func_key,
                                                     placeholder_map, placeholder_set,
                                                     data_table_subs) )
        
        return cast(Expr, Matrix(rows))
    
    if len(expr.args) == 0:
        return expr

    if func_key == "dim_func" and expr.func in multiply_placeholder_set:
        processed_args = [replace_placeholder_funcs(cast(Expr, arg), func_key, placeholder_map, placeholder_set, data_table_subs) for arg in expr.args]
        matrix_args = []
        scalar_args = []
        for arg in processed_args:
            if is_matrix(cast(Expr, arg)):
                matrix_args.append(arg)
            else:
                scalar_args.append(arg)

        if len(matrix_args) > 0 and len(scalar_args) > 0:
            first_matrix = matrix_args[0]
            scalar = math.prod(scalar_args)
            new_rows = []
            for i in range(first_matrix.rows):
                new_row = []
                new_rows.append(new_row)
                for j in range(first_matrix.cols):
                    new_row.append(scalar*first_matrix[i,j])
            
            matrix_args[0] = Matrix(new_rows)

            return cast(Expr, cast(Callable, placeholder_map[expr.func][func_key])(*matrix_args))
        else:
            return cast(Expr, cast(Callable, placeholder_map[expr.func][func_key])(*processed_args))
    elif expr.func in dummy_var_placeholder_set and func_key == "dim_func":
        return cast(Expr, cast(Callable, placeholder_map[expr.func][func_key])(*(replace_placeholder_funcs(cast(Expr, arg), func_key, placeholder_map, placeholder_set, data_table_subs) if index > 0 else arg for index, arg in enumerate(expr.args))))
    elif expr.func in placeholder_set:
        return cast(Expr, cast(Callable, placeholder_map[expr.func][func_key])(*(replace_placeholder_funcs(cast(Expr, arg), func_key, placeholder_map, placeholder_set, data_table_subs) for arg in expr.args)))
    elif data_table_subs is not None and expr.func == data_table_calc_wrapper:
        if len(expr.args[0].atoms(data_table_id_wrapper)) == 0:
            return replace_placeholder_funcs(cast(Expr, expr.args[0]), func_key, placeholder_map, placeholder_set, data_table_subs)

        data_table_subs.subs_stack.append({})
        data_table_subs.shortest_col_stack.append(None)

        sub_expr = replace_placeholder_funcs(cast(Expr, expr.args[0]), func_key, placeholder_map, placeholder_set, data_table_subs)

        subs = data_table_subs.subs_stack.pop()
        shortest_col = data_table_subs.shortest_col_stack.pop()

        if shortest_col is None:
            raise ValueError('Shortest column undefined for data table calculation')

        if func_key == "sympy_func":
            new_func = lambdify(subs.keys(), sub_expr, 
                                modules=["math", "mpmath", "sympy"])

            result = []
            for i in range(shortest_col):
                result.append([new_func(*[float(cast(Expr, cast(Matrix, value)[i,0])) for value in subs.values()]), ])

            return cast(Expr, Matrix(result))
        else:
            return cast(Expr, Matrix([sub_expr,]*shortest_col))
    
    elif data_table_subs is not None and expr.func == data_table_id_wrapper:
        current_expr = replace_placeholder_funcs(cast(Expr, expr.args[0]), func_key, placeholder_map, placeholder_set, data_table_subs)
        new_var = Symbol(f"_data_table_var_{data_table_subs.get_next_id()}")
        
        if not is_matrix(current_expr):
            raise EmptyColumnData(current_expr)

        if len(data_table_subs.subs_stack) > 0:
            data_table_subs.subs_stack[-1][new_var] = cast(Expr, current_expr)

            if data_table_subs.shortest_col_stack[-1] is None or current_expr.rows < data_table_subs.shortest_col_stack[-1]:
                data_table_subs.shortest_col_stack[-1] = current_expr.rows

        if func_key == "sympy_func":
            return new_var
        else:
            return cast(Expr, current_expr[0,0])

    else:
        return cast(Expr, expr.func(*(replace_placeholder_funcs(cast(Expr, arg), func_key, placeholder_map, placeholder_set, data_table_subs) for arg in expr.args)))

def get_dimensional_analysis_expression(parameter_subs: dict[Symbol, Expr],
                                        expression: Expr,
                                        placeholder_map: dict[Function, PlaceholderFunction],
                                        placeholder_set: set[Function]) -> tuple[Expr | None, Exception | None]:
    # need to remove any subtractions or unary negative since this may
    # lead to unintentional cancellation during the parameter substitution process
    positive_only_expression = subtraction_to_addition(expression)
    expression_with_parameter_subs = cast(Expr, positive_only_expression.xreplace(parameter_subs))

    error = None
    final_expression = None

    try:
        final_expression = replace_placeholder_funcs(expression_with_parameter_subs, 
                                                     "dim_func", placeholder_map, placeholder_set,
                                                     DataTableSubs())
    except Exception as e:
        error = e
    
    return final_expression, error


def custom_get_dimensional_dependencies(expression: Expr | None):
    if expression is not None:
        expression = subs_wrapper(expression, {cast(Symbol, symbol): sympify('1') for symbol in (expression.free_symbols - dimension_symbols)})
    return dimsys_SI.get_dimensional_dependencies(expression)

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
            cast(dict[Dimension, float], custom_get_dimensional_dependencies(dimensional_analysis_expression),),
            None
        )

        if custom_base_units is not None:
            custom_units, custom_units_latex = get_mathjs_units(
                cast(dict[Dimension, float], custom_get_dimensional_dependencies(dimensional_analysis_expression),),
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

class EmptyColumnData(Exception):
    pass


def get_sorted_statements(statements: list[Statement], custom_definition_names: list[str]):
    defined_params: dict[str, int] = {}
    for i, statement in enumerate(statements):
        if statement["type"] == "assignment" or statement["type"] == "local_sub":
            if statement["name"] in defined_params:
                raise DuplicateAssignment(statement["name"])
            else:
                defined_params[statement["name"]] = i

    if len(custom_definition_names) > 0:
        for i, name in enumerate(custom_definition_names):
            if name in defined_params or name in custom_definition_names[i+1:]:
                raise DuplicateAssignment(name)

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


zero_place_holder: ImplicitParameter = {
        "dimensions": [0]*9,
        "original_value": "0",
        "si_value": "0",
        "name": ZERO_PLACEHOLDER,
        "units": ""
    }

def get_all_implicit_parameters(statements: Sequence[InputAndSystemStatement | EqualityStatement]):
    parameters: list[ImplicitParameter] = [zero_place_holder,]
    for statement in statements:
        parameters.extend(statement["implicitParams"])

    return parameters


def expand_with_sub_statements(statements: list[InputAndSystemStatement]):
    new_statements: list[Statement] = list(statements)

    local_sub_statements: dict[str, LocalSubstitutionStatement] = {}

    included_unitless_sub_expressions: set[str] = set()

    for statement in statements:
        # need to prevent inclusion of already included exponents since solving a system of equations
        # will repeat exponents for each variable that is solved for
        for unitless_sub_expression in cast(list[UnitlessSubExpression], statement["unitlessSubExpressions"]):
            if unitless_sub_expression["name"] not in included_unitless_sub_expressions:
                new_statements.append(unitless_sub_expression)
        included_unitless_sub_expressions.update([unitless_sub_expression["name"] for unitless_sub_expression in statement["unitlessSubExpressions"]])

        new_statements.extend(statement.get("functions", []))
        new_statements.extend(statement.get("arguments", []))
        for local_sub in statement.get("localSubs", []):
            combined_sub = local_sub_statements.setdefault(local_sub["parameter"], 
                              {"type": "local_sub", 
                               "name": local_sub["parameter"],
                               "index": 0,  # placeholder, will be set in sympy_statements
                               "params": [], 
                               "function_subs": {},
                               "isUnitlessSubExpression": False 
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


def get_parameter_subs(parameters: list[ImplicitParameter], convert_floats_to_fractions: bool):
    # sub parameter values
    parameter_subs: dict[Symbol, Expr] = {
        symbols(param["name"]): sympify(param["si_value"], rational=convert_floats_to_fractions)
        for param in parameters
        if param["si_value"] is not None
    }
    if len(parameter_subs) < len(parameters):
        raise ParameterError

    return parameter_subs


def sympify_statements(statements: list[Statement] | list[EqualityStatement],
                       sympify_unitless_sub_expressions=False, convert_floats_to_fractions=True):
    for i, statement in enumerate(statements):
        statement["index"] = i
        if statement["type"] != "local_sub" and statement["type"] != "blank" and \
           statement["type"] != "scatterQuery":
            try:
                statement["expression"] = sympify(statement["sympy"], rational=convert_floats_to_fractions)
                if sympify_unitless_sub_expressions:
                    for unitless_sub_expression in cast(list[UnitlessSubExpression], statement["unitlessSubExpressions"]):
                        unitless_sub_expression["expression"] = sympify(unitless_sub_expression["sympy"], rational=convert_floats_to_fractions)
            except SyntaxError:
                print(f"Parsing error for equation {statement['sympy']}")
                raise ParsingError


def remove_implicit_and_unitless_sub_expression(input_set: set[str]) -> set[str]:
    return {variable for variable in input_set 
            if not variable.startswith( ("implicit_param__", "unitless__") )}


def solve_system(statements: list[EqualityStatement], variables: list[str], 
                placeholder_map: dict[Function, PlaceholderFunction],
                 placeholder_set: set[Function], convert_floats_to_fractions: bool):
    parameters = get_all_implicit_parameters(statements)
    parameter_subs = get_parameter_subs(parameters, convert_floats_to_fractions)

    sympify_statements(statements, sympify_unitless_sub_expressions=True, 
                       convert_floats_to_fractions=convert_floats_to_fractions)

    # give all of the statements an index so that they can be re-ordered
    for i, statement in enumerate(statements):
        statement["index"] = i

    # define system of equations for sympy.solve function
    # substitute in all exponents and placeholder functions
    system_unitless_sub_expressions: list[UnitlessSubExpression | UnitlessSubExpressionName] = []
    system_implicit_params: list[ImplicitParameter] = []
    system_variables: set[str] = set()
    system: list[Expr] = []
    for statement in statements:
        system_variables.update(statement["params"])
        system_unitless_sub_expressions.extend(statement["unitlessSubExpressions"])
        system_implicit_params.extend(statement["implicitParams"])

        equality = cast(Expr, statement["expression"]).subs(
            {unitless_sub_expression["name"]:unitless_sub_expression["expression"] for unitless_sub_expression in cast(list[UnitlessSubExpression], statement["unitlessSubExpressions"])})
        equality = replace_placeholder_funcs(cast(Expr, equality),
                                             "sympy_func",
                                             placeholder_map, placeholder_set, None)

        system.append(cast(Expr, equality.doit()))
        

    # remove implicit parameters before solving
    system_variables = remove_implicit_and_unitless_sub_expression(system_variables)

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
                "unitlessSubExpressions": system_unitless_sub_expressions,
                "isUnitlessSubExpression": False,
                "isFunction": False,
                "isFunctionArgument": False,
                "isRange": False,
                "isDataTableQuery": False,
                "isCodeFunctionQuery": False,
                "isCodeFunctionRawQuery": False,
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
                           guesses: list[str], guess_statements: list[GuessAssignmentStatement],
                           placeholder_map: dict[Function, PlaceholderFunction],
                           placeholder_set: set[Function],
                           convert_floats_to_fractions: bool):
    parameters = get_all_implicit_parameters([*statements, *guess_statements])
    parameter_subs = get_parameter_subs(parameters, convert_floats_to_fractions)

    sympify_statements(statements, sympify_unitless_sub_expressions=True,
                       convert_floats_to_fractions=convert_floats_to_fractions)

    # give all of the statements an index so that they can be re-ordered
    for i, statement in enumerate(statements):
        statement["index"] = i

    # define system of equations for sympy.solve function
    # substitute in all exponents, implicit params, and placeholder functions
    # add equalityUnitsQueries to new_statements that will be added to the whole sheet
    system_unitless_sub_expressions: list[UnitlessSubExpression | UnitlessSubExpressionName] = []
    system_variables: set[str] = set()
    system: list[Expr] = []
    new_statements: list[EqualityUnitsQueryStatement | GuessAssignmentStatement] = []
    for statement in statements:
        system_variables.update(statement["params"])
        system_unitless_sub_expressions.extend(statement["unitlessSubExpressions"])

        equality = cast(Expr, statement["expression"]).subs(
            {unitless_sub_expression["name"]: unitless_sub_expression["expression"] for unitless_sub_expression in cast(list[UnitlessSubExpression], statement["unitlessSubExpressions"])})
        equality = equality.subs(parameter_subs)
        equality = replace_placeholder_funcs(cast(Expr, equality),
                                             "sympy_func",
                                             placeholder_map, placeholder_set, None)
        system.append(cast(Expr, equality.doit()))
        new_statements.extend(statement["equalityUnitsQueries"])

    # remove implicit parameters before solving
    system_variables = remove_implicit_and_unitless_sub_expression(system_variables)

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

    # remove zero placeholder to prevent duplicates
    parameters = [parameter for parameter in parameters if parameter["name"] != ZERO_PLACEHOLDER]

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
                "outputName": "", "outputNameLatex": "",
                "isParametric": range_result["isParametric"]}] }

    if not is_not_matrix_result(units_result):
        return {"plot": True, "data": [{"isScatter": False, "numericOutput": False, "numericInput": True,
                "limitsUnitsMatch": True, "input": [], "output": [], "inputReversed": False,
                "inputUnits": "", "inputUnitsLatex": "",
                "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
                "inputName": "", "inputNameLatex": "",
                "outputUnits": "", "outputUnitsLatex": "",
                "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
                "outputName": "", "outputNameLatex": "",
                "isParametric": range_result["isParametric"]}] }

    if not all(map(lambda value: value["numeric"] and value["real"] and value["finite"], 
                   [lower_limit_result, upper_limit_result])):
        return {"plot": True, "data": [{"isScatter": False, "numericOutput": False, "numericInput": False,
                "limitsUnitsMatch": False, "input": [], "output": [], "inputReversed": False,
                "inputUnits": "", "inputUnitsLatex": "",
                "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
                "inputName": "", "inputNameLatex": "",
                "outputUnits": "", "outputUnitsLatex": "",
                "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
                "outputName": "", "outputNameLatex": "",
                "isParametric": range_result["isParametric"]}] }

    if lower_limit_result["units"] != upper_limit_result["units"]:
        return {"plot": True, "data": [{"isScatter": False, "numericOutput": False, "numericInput": True,
                "limitsUnitsMatch": False, "input": [],  "output": [], "inputReversed": False,
                "inputUnits": "", "inputUnitsLatex": "",
                "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
                "inputName": "", "inputNameLatex": "",
                "outputUnits": "", "outputUnitsLatex": "",
                "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
                "outputName": "", "outputNameLatex": "",
                "isParametric": range_result["isParametric"]}] }

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
    for i in range(num_points-2):
        input_values.append(input_values[-1] + delta)
    input_values.append(upper_limit)

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
                "outputNameLatex": custom_latex(sympify(range_result["outputName"])),
                 "isParametric": range_result["isParametric"] }] }

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
            "outputNameLatex": custom_latex(sympify(range_result["outputName"])),
            "isParametric": range_result["isParametric"]}] }

def get_scatter_error_object(error_message: str) -> PlotResult:
    return {"plot": True, "data": [{"isScatter": True, "numericOutput": False, "numericInput": True,
            "limitsUnitsMatch": True, "input": [],  "output": [], "inputReversed": False,
            "inputUnits": "", "inputUnitsLatex": "",
            "inputCustomUnitsDefined": False, "inputCustomUnits": "", "inputCustomUnitsLatex": "",
            "inputName": "", "inputNameLatex": "",
            "outputUnits": "", "outputUnitsLatex": "",
            "outputCustomUnitsDefined": False, "outputCustomUnits": "", "outputCustomUnitsLatex": "",
            "outputName": "", "outputNameLatex": "",
            "scatterErrorMessage": error_message, "isParametric": False}] }

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
        
        if len(x_units_check) > 1 or "Dimension Error" in x_units_check:
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
        
        if len(y_units_check) > 1 or "Dimension Error" in y_units_check:
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
                "outputNameLatex": custom_latex(sympify(y_name)), 
                "isParametric": False }] }
    
    # Finally, handle case where both values are scalers
    if not is_real_and_finite(cast(Result | FiniteImagResult, scatter_x_values)):
        return get_scatter_error_object("x value does not evaluate to a finite real value")
    
    if "Dimension Error" in cast(Result, scatter_x_values)["units"]:
        return get_scatter_error_object("x value dimension error")

    x_values = [float(cast(Result, scatter_x_values)["value"])]
    x_units = cast(Result, scatter_x_values)["units"]
    x_units_latex = cast(Result, scatter_x_values)["unitsLatex"]
    x_units_custom_units_defined = cast(Result, scatter_x_values)["customUnitsDefined"]
    x_units_custom_units = cast(Result, scatter_x_values)["customUnits"]
    x_units_custom_units_latex = cast(Result, scatter_x_values)["customUnitsLatex"]

    if not is_real_and_finite(cast(Result | FiniteImagResult, scatter_y_values)):
        return get_scatter_error_object("y value does not evaluate to a finite real value")

    if "Dimension Error" in cast(Result, scatter_y_values)["units"]:
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
            "outputNameLatex": custom_latex(sympify(y_name)),
            "isParametric": False }] }


def combine_plot_and_table_data_results(results: list[Result | FiniteImagResult | PlotResult | MatrixResult ],
                                        statement_plot_info: list[StatementPlotInfo],
                                        statement_data_table_info: list[StatementDataTableInfo]):
    final_results: list[Result | FiniteImagResult | list[PlotResult] | MatrixResult | DataTableResult] = []

    plot_cell_id = "unassigned"
    data_table_cell_id = "unassigned"
    previous_plot_data: PlotData | Literal[None] = None
    parametric_counter = 1
    for index, result in enumerate(results):
        if not statement_plot_info[index]["isFromPlotCell"] and not statement_data_table_info[index]["isFromDataTableCell"]:
            final_results.append(cast(Result | FiniteImagResult, result))
            plot_cell_id = "unassigned"
            data_table_cell_id = "unassigned"
            previous_plot_data = None
        elif statement_plot_info[index]["cellNum"] == plot_cell_id:
            current_plot_data = cast(PlotResult, result)["data"][0]
            if previous_plot_data is not None and \
               (current_plot_data["isParametric"] and previous_plot_data["isParametric"]):
                combine_parametric_plot_data_into_y(previous_plot_data, current_plot_data, parametric_counter)
                parametric_counter += 1
                previous_plot_data = None
            else:
                cast(list[PlotResult], final_results[-1]).append(cast(PlotResult, result))
                previous_plot_data = current_plot_data
        elif statement_data_table_info[index]["cellNum"] == data_table_cell_id:
            if is_matrix_result(result):
                cast(DataTableResult, final_results[-1])["colData"][statement_data_table_info[index]["colNum"]] = result
            else:
                cast(DataTableResult, final_results[-1])["colData"][statement_data_table_info[index]["colNum"]] = \
                    {"matrixResult": True, "results": [[cast( Result | FiniteImagResult, result)],],
                     "isSubResult": False, "subQueryName": ""}
        elif statement_plot_info[index]["isFromPlotCell"]:
            final_results.append([cast(PlotResult, result),])
            plot_cell_id = statement_plot_info[index]["cellNum"]
            data_table_cell_id = "undefined"
            previous_plot_data = cast(PlotResult, result)["data"][0]
        else:
            if is_matrix_result(result):
                final_results.append({"dataTableResult": True, "colData": {statement_data_table_info[index]["colNum"]: result}})
            else:
                final_results.append({
                    "dataTableResult": True,
                    "colData": {
                            statement_data_table_info[index]["colNum"]: {
                                    "matrixResult": True,
                                    "results": [[cast( Result | FiniteImagResult, result)],],
                                    "isSubResult": False,
                                    "subQueryName": ""
                                }
                        }
                    })
            data_table_cell_id = statement_data_table_info[index]["cellNum"]
            plot_cell_id = "undefined"

    return final_results

def combine_parametric_plot_data_into_y(y_plot_data: PlotData, x_plot_data: PlotData, counter: int):    
    parametric_error = ""
    
    if not y_plot_data["numericInput"]:
        parametric_error = "Upper and/or lower limits do not evaluate to a number"
    elif not y_plot_data["limitsUnitsMatch"]:
        parametric_error = "Units of the upper and lower limits do not match"
    elif not x_plot_data["numericOutput"]:
        parametric_error = "Results of expression does not evaluate to finite and real numeric values"
    
    y_plot_data["numericInput"] = x_plot_data["numericOutput"]
    y_plot_data["input"] = x_plot_data["output"]
    y_plot_data["inputUnits"] = x_plot_data["outputUnits"]
    y_plot_data["inputUnitsLatex"] = x_plot_data["outputUnitsLatex"]
    y_plot_data["inputCustomUnitsDefined"] = x_plot_data["outputCustomUnitsDefined"]
    y_plot_data["inputCustomUnits"] = x_plot_data["outputCustomUnits"]
    y_plot_data["inputCustomUnitsLatex"] = x_plot_data["outputCustomUnitsLatex"]
    y_plot_data["inputName"] = x_plot_data["outputName"]
    y_plot_data["inputNameLatex"] = x_plot_data["outputNameLatex"]

    if y_plot_data["outputName"].startswith("ParametricPlaceholderY"):
        y_plot_data["outputName"] = f"y_{counter}({x_plot_data['inputName']})"
        y_plot_data["outputNameLatex"] = f"y_{{{counter}}} \\left({x_plot_data['inputNameLatex']} \\right)"

    if y_plot_data["inputName"].startswith("ParametricPlaceholderX"):
        y_plot_data["inputName"] = f"x_{counter}({x_plot_data['inputName']})"
        y_plot_data["inputNameLatex"] = f"x_{{{counter}}} \\left({x_plot_data['inputNameLatex']} \\right)"

    y_plot_data["parametricErrorMessage"] = parametric_error

def subs_wrapper(expression: Expr, subs: dict[str, str] | dict[str, Expr | float] | dict[Symbol, Symbol]) -> Expr:
    if len(expression.atoms(Subs)) > 0:
        # must use slower subs when substituting parameters that may be in a integral or derivative
        # subs automatically delays substitution by wrapping integral or derivative in a subs function
        return cast(Expr, expression.subs(subs))
    else:
        # can safely use much faster xreplace when there are no integrals or derivatives
        return cast(Expr, expression.xreplace(subs))


def get_evaluated_expression(expression: Expr,
                             parameter_subs: dict[Symbol, Expr],
                             simplify_symbolic_expressions: bool,
                             placeholder_map: dict[Function, PlaceholderFunction],
                             placeholder_set: set[Function]) -> tuple[ExprWithAssumptions, str | list[list[str]]]:
    expression = cast(Expr, expression.xreplace(parameter_subs))
    expression = replace_placeholder_funcs(expression,
                                           "sympy_func",
                                           placeholder_map,
                                           placeholder_set,
                                           DataTableSubs())
    if not is_matrix(expression):
        if simplify_symbolic_expressions:
            try:
                symbolic_expression = custom_latex(cancel(expression))
            except ValueError as e:
                symbolic_expression = custom_latex(expression)
        else:
            symbolic_expression = custom_latex(expression)
    else:
        symbolic_expression = []
        for i in range(expression.rows):
            row = []
            symbolic_expression.append(row)
            for j in range(expression.cols):
                if simplify_symbolic_expressions:
                    try:
                        row.append(custom_latex(cancel(expression[i,j])))
                    except ValueError as e:
                        row.append(custom_latex(cast(Expr, expression[i,j])))
                else:
                    row.append(custom_latex(cast(Expr, expression[i,j])))

    evaluated_expression = cast(ExprWithAssumptions, expression.evalf(PRECISION))
    return evaluated_expression, symbolic_expression

def get_result(evaluated_expression: ExprWithAssumptions, dimensional_analysis_expression: Expr | None, 
               dim_sub_error: Exception | None, symbolic_expression: str,
               unitless_sub_expressions: list[UnitlessSubExpression | UnitlessSubExpressionName],
               isRange: bool, unitless_sub_expression_dimensionless: dict[str, bool],
               custom_base_units: CustomBaseUnits | None,
               isSubQuery: bool, subQueryName: str
               ) -> Result | FiniteImagResult:
    
    custom_units_defined = False
    custom_units = ""
    custom_units_latex = ""

    if not all([unitless_sub_expression_dimensionless[local_item["name"]] for local_item in unitless_sub_expressions]):
        context_set = {local_item["unitlessContext"] for local_item in unitless_sub_expressions if not unitless_sub_expression_dimensionless[local_item["name"]]}
        context_combined = ", ".join(context_set)
        dim = f"Dimension Error: {context_combined} Not Dimensionless"
        dim_latex = f"Dimension Error: {context_combined} Not Dimensionless"
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
                            customUnitsLatex=custom_units_latex, isSubResult=isSubQuery,
                            subQueryName=subQueryName)
        elif not evaluated_expression.is_finite:
            result = Result(value=custom_latex(evaluated_expression), 
                            symbolicValue=symbolic_expression,
                            numeric=True, units=dim, unitsLatex=dim_latex, 
                            real=cast(bool, evaluated_expression.is_real), 
                            finite=False, customUnitsDefined=custom_units_defined,
                            customUnits=custom_units, customUnitsLatex=custom_units_latex,
                            isSubResult=isSubQuery, subQueryName=subQueryName)
        else:
            result = FiniteImagResult(value=str(evaluated_expression).replace('I', 'i').replace('*', ''),
                                      symbolicValue=symbolic_expression,
                                      numeric=True, units=dim, unitsLatex=dim_latex, real=False, 
                                      realPart=str(re(evaluated_expression)),
                                      imagPart=str(im(evaluated_expression)),
                                      finite=evaluated_expression.is_finite,
                                      customUnitsDefined=custom_units_defined,
                                      customUnits=custom_units, customUnitsLatex=custom_units_latex,
                                      isSubResult=isSubQuery,
                                      subQueryName=subQueryName)
    else:
        result = Result(value=custom_latex(evaluated_expression),
                        symbolicValue=symbolic_expression,
                        numeric=False, units="", unitsLatex="",
                        real=False, finite=False, customUnitsDefined=False,
                        customUnits="", customUnitsLatex="",
                        isSubResult=isSubQuery, subQueryName=subQueryName)

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
                        simplify_symbolic_expressions: bool,
                        convert_floats_to_fractions: bool,
                        placeholder_map: dict[Function, PlaceholderFunction],
                        placeholder_set: set[Function],
                        custom_definition_names: list[str]) -> tuple[list[Result | FiniteImagResult | list[PlotResult] | MatrixResult | DataTableResult], dict[int,bool]]:
    num_statements = len(statements)

    if num_statements == 0:
        return [], {}

    statement_plot_info: list[StatementPlotInfo] = [{"isFromPlotCell": statement["isFromPlotCell"],
                            "cellNum": statement.get("cellNum", -1)} for statement in statements]

    statement_data_table_info: list[StatementDataTableInfo] = [{"isFromDataTableCell": statement.get("isDataTableQuery", False),
                                  "cellNum": statement.get("cellNum", -1), "colNum": statement.get("colNum", -1)} for statement in statements]

    parameters = get_all_implicit_parameters(statements)
    parameter_subs = get_parameter_subs(parameters, convert_floats_to_fractions)
    dimensional_analysis_subs: dict[Symbol, Expr] = {
        symbols(param["name"]): get_dims(param["dimensions"]) for param in parameters
    }

    expanded_statements: list[Statement] = expand_with_sub_statements(statements)

    sympify_statements(expanded_statements, convert_floats_to_fractions=convert_floats_to_fractions)

    expanded_statements = get_sorted_statements(expanded_statements, custom_definition_names)

    combined_expressions: list[CombinedExpression] = []
    unitless_sub_expression_subs: dict[str, Expr | float] = {}
    unit_sub_expression_dimensionless: dict[str, bool] = {}
    function_unitless_sub_expression_replacements: dict[str, dict[Symbol, Symbol]] = {}
    function_unitless_sub_expression_context: dict[str, str] = {}
    for i, statement in enumerate(expanded_statements):
        if statement["type"] == "local_sub" or statement["type"] == "blank":
            continue

        if statement["type"] == "assignment" and not statement["isUnitlessSubExpression"] and \
            not statement.get("isFunction", False):
            combined_expressions.append({"index": statement["index"],
                                        "isBlank": True,
                                        "isRange": False,
                                        "isScatter": False,
                                        "unitlessSubExpressions": [],
                                        "isSubQuery": False,
                                        "subQueryName": ""})
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
                "isSubQuery": False,
                "subQueryName": ""
            })

            continue

        temp_statements = expanded_statements[0: i + 1]

        # sub equations into each other in topological order if there are more than one
        function_name = ""
        unitless_sub_expression_name = ""
        unitless_sub_expression_context = ""
        if statement["isFunction"] is True:
            is_function = True
            function_name = statement["name"]
            is_unitless_sub_expression = False
        elif statement["isUnitlessSubExpression"] is True:
            is_unitless_sub_expression = True
            unitless_sub_expression_name = statement["name"]
            unitless_sub_expression_context = statement["unitlessContext"]
            is_function = False
        else:
            is_unitless_sub_expression = False
            is_function = False
        dependency_unitless_sub_expressions = statement["unitlessSubExpressions"]
        new_function_unitless_sub_expressions: dict[str, Expr] = {}
        final_expression = statement["expression"]
        for sub_statement in reversed(temp_statements[0:-1]):
            if (sub_statement["type"] == "assignment" or ((is_function or is_unitless_sub_expression) and sub_statement["type"] == "local_sub")) \
                    and not sub_statement["isUnitlessSubExpression"]:

                if sub_statement["type"] == "local_sub":
                    if is_function:
                        current_local_subs = sub_statement["function_subs"].get(function_name, {})
                        if len(current_local_subs) > 0:
                            final_expression = subs_wrapper(final_expression, current_local_subs)
                    elif is_unitless_sub_expression:
                        for local_sub_function_name, function_local_subs in sub_statement["function_subs"].items():
                            function_unitless_sub_expression = new_function_unitless_sub_expressions.setdefault(local_sub_function_name, final_expression)
                            new_function_unitless_sub_expressions[local_sub_function_name] = subs_wrapper(function_unitless_sub_expression, function_local_subs)

                else:
                    if sub_statement["name"] in map(lambda x: str(x), final_expression.free_symbols):
                        dependency_unitless_sub_expressions.extend(sub_statement["unitlessSubExpressions"])
                        final_expression = subs_wrapper(final_expression, {symbols(sub_statement["name"]): sub_statement["expression"]})
                
                    if is_unitless_sub_expression:
                        new_function_unitless_sub_expressions = {
                            key:subs_wrapper(expression, {symbols(sub_statement["name"]): sub_statement["expression"]}) for
                            key, expression in new_function_unitless_sub_expressions.items()
                        }


        if is_unitless_sub_expression:
            for current_function_name in new_function_unitless_sub_expressions.keys():
                function_unitless_sub_expression_replacements.setdefault(current_function_name, {}).update(
                    {symbols(unitless_sub_expression_name): symbols(unitless_sub_expression_name+current_function_name)}
                )
            function_unitless_sub_expression_context[unitless_sub_expression_name] = unitless_sub_expression_context

            new_function_unitless_sub_expressions[''] = final_expression

            for current_function_name, final_expression in new_function_unitless_sub_expressions.items():
                while(True):
                    available_unitless_subs = set(function_unitless_sub_expression_replacements.get(current_function_name, {}).keys()) & \
                                                final_expression.free_symbols
                    if len(available_unitless_subs) == 0:
                        break
                    final_expression = subs_wrapper(final_expression, function_unitless_sub_expression_replacements[current_function_name])
                    final_expression = subs_wrapper(final_expression, unitless_sub_expression_subs)

                final_expression = subs_wrapper(final_expression, unitless_sub_expression_subs)
                final_expression = cast(Expr, final_expression.doit())
                dimensional_analysis_expression, dim_sub_error = get_dimensional_analysis_expression(dimensional_analysis_subs,
                                                                                                     final_expression,
                                                                                                     placeholder_map,
                                                                                                     placeholder_set)
                dim, _, _, _, _ = dimensional_analysis(dimensional_analysis_expression, dim_sub_error)
                if dim == "":
                    unit_sub_expression_dimensionless[unitless_sub_expression_name+current_function_name] = True
                else:
                    unit_sub_expression_dimensionless[unitless_sub_expression_name+current_function_name] = False
                
                final_expression = cast(Expr, cast(Expr, final_expression).xreplace(parameter_subs))
                final_expression = replace_placeholder_funcs(final_expression,
                                                             "sympy_func",
                                                             placeholder_map,
                                                             placeholder_set,
                                                             None)

                unitless_sub_expression_subs[symbols(unitless_sub_expression_name+current_function_name)] = final_expression

        elif is_function:
            while(True):
                available_unitless_subs = set(function_unitless_sub_expression_replacements.get(function_name, {}).keys()) & \
                                            final_expression.free_symbols
                if len(available_unitless_subs) == 0:
                    break
                final_expression = subs_wrapper(final_expression, function_unitless_sub_expression_replacements[function_name])
                statement["unitlessSubExpressions"].extend([{"name": str(function_unitless_sub_expression_replacements[function_name][key]),
                                                             "unitlessContext": function_unitless_sub_expression_context[str(key)]} for key in available_unitless_subs])
                final_expression = subs_wrapper(final_expression, unitless_sub_expression_subs)
            if function_name in function_unitless_sub_expression_replacements:
                for unitless_sub_expression_i, unitless_sub_expression in enumerate(statement["unitlessSubExpressions"]):
                    if symbols(unitless_sub_expression["name"]) in function_unitless_sub_expression_replacements[function_name]:
                        statement["unitlessSubExpressions"][unitless_sub_expression_i] = UnitlessSubExpressionName(name = str(function_unitless_sub_expression_replacements[function_name][symbols(unitless_sub_expression["name"])]),
                                                                                                                   unitlessContext = unitless_sub_expression["unitlessContext"])
            statement["expression"] = final_expression

        elif statement["type"] == "query":
            if statement["isRange"] is not True:
                current_combined_expression: CombinedExpression = {"index": statement["index"],
                                                "expression": subs_wrapper(final_expression, unitless_sub_expression_subs),
                                                "unitlessSubExpressions": dependency_unitless_sub_expressions,
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
                                                "name": "",
                                                "isSubQuery": statement.get("isSubQuery", False),
                                                "subQueryName": statement["sympy"]
                                            }
            else: 
                current_combined_expression: CombinedExpression = {"index": statement["index"],
                                                "expression": subs_wrapper(final_expression, unitless_sub_expression_subs),
                                                "unitlessSubExpressions": dependency_unitless_sub_expressions,
                                                "isBlank": False,
                                                "isRange": True,
                                                "isParametric": statement.get("isParametric", False),
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
                                                "unitsQueryFunction": statement["unitsQueryFunction"],
                                                "isSubQuery": False,
                                                "subQueryName": ""
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
                                                                             "real": False, "finite": False,
                                                                             "isSubResult": False, "subQueryName": ""}]*(largest_index+1)

    for item in combined_expressions:
        index = item["index"]
        if item["isBlank"] is True:
            continue
        elif item["isScatter"] is True:
            scatter_combined_expressions[item["equationIndex"]] = item
        else:
            expression = cast(Expr, item["expression"].doit())
            
            evaluated_expression, symbolic_expression = get_evaluated_expression(expression,
                                                                                 parameter_subs,
                                                                                 simplify_symbolic_expressions,
                                                                                 placeholder_map,
                                                                                 placeholder_set)
            dimensional_analysis_expression, dim_sub_error = get_dimensional_analysis_expression(dimensional_analysis_subs,
                                                                                                 expression,
                                                                                                 placeholder_map,
                                                                                                 placeholder_set)

            if not is_matrix(evaluated_expression):
                results[index] = get_result(evaluated_expression, dimensional_analysis_expression,
                                                                  dim_sub_error, cast(str, symbolic_expression),
                                                                  item["unitlessSubExpressions"], item["isRange"],
                                                                  unit_sub_expression_dimensionless,
                                                                  custom_base_units,
                                                                  item["isSubQuery"],
                                                                  item["subQueryName"])
                
            elif is_matrix(evaluated_expression) and (dimensional_analysis_expression is None or \
                 is_matrix(dimensional_analysis_expression)) and isinstance(symbolic_expression, list) :

                if dimensional_analysis_expression is not None and (
                    evaluated_expression.rows != dimensional_analysis_expression.rows and
                    evaluated_expression.cols != dimensional_analysis_expression.cols ):
                    Exception("Internal Error: Dimension matrix size does not match result matrix size. Report error to support@engineeringpaper.xyz")

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
                                                    dim_sub_error, symbolic_expression[i][j], item["unitlessSubExpressions"], 
                                                    item["isRange"], unit_sub_expression_dimensionless,
                                                    custom_base_units,
                                                    item["isSubQuery"],
                                                    item["subQueryName"])
                        current_row.append(current_result)
                    
                
                results[index] = MatrixResult(matrixResult=True, results=matrix_results,
                                              isSubResult=item["isSubQuery"],
                                              subQueryName=item["subQueryName"])

            else:
                raise Exception("Internal Error: Dimension or symbolic result not a Matrix for an evaluated expression that is a Matrix. Report error to support@engineeringpaper.xyz")

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
            if "Dimension Error" not in units:
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

    return combine_plot_and_table_data_results(results_with_ranges[:num_statements], statement_plot_info, statement_data_table_info), numerical_system_cell_unit_errors


def get_query_values(statements: list[InputAndSystemStatement],
                     custom_base_units: CustomBaseUnits | None,
                     simplify_symbolic_expressions: bool,
                     convert_floats_to_fractions: bool,
                     placeholder_map: dict[Function, PlaceholderFunction],
                     placeholder_set: set[Function],
                     custom_definition_names: list[str]):
    error: None | str = None

    results: list[Result | FiniteImagResult | list[PlotResult] | MatrixResult | DataTableResult] = []
    numerical_system_cell_errors: dict[int, bool] = {}
    try:
        results, numerical_system_cell_errors = evaluate_statements(statements,
                                                                    custom_base_units,
                                                                    simplify_symbolic_expressions,
                                                                    convert_floats_to_fractions,
                                                                    placeholder_map,
                                                                    placeholder_set,
                                                                    custom_definition_names)
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
    except MemoryError:
        error = 'A MemoryError occurred while completing the calculation, try disabling the "Automatically Convert Decimal Values to Fractions" sheet setting'
    except EmptyColumnData as e:
        error = f'Attempt to use empty column "{e}" in a data table calculation'
    except Exception as e:
        print(f"Unhandled exception: {type(e).__name__}, {e}")
        error = f"Unhandled exception: {type(e).__name__}, {e}"
        traceback.print_exc()

    return error, results, numerical_system_cell_errors


@lru_cache(maxsize=1024)
def get_system_solution(statements, variables,
                        convert_floats_to_fractions):
    statements = cast(list[EqualityStatement], loads(statements))
    variables = cast(list[str], loads(variables))

    error: None | str = None
    new_statements: list[list[SystemSolutionAssignmentStatement]]
    display_solutions: dict[str, list[str]]

    try:
        new_statements = solve_system(statements,
                                      variables,
                                      global_placeholder_map,
                                      global_placeholder_set,
                                      convert_floats_to_fractions)
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
def get_system_solution_numerical(statements, variables, guesses,
                                  guessStatements, fluid_definitions,
                                  interpolation_definitions, convert_floats_to_fractions):
    statements = cast(list[EqualityStatement], loads(statements))
    variables = cast(list[str], loads(variables))
    guesses = cast(list[str], loads(guesses))
    guess_statements = cast(list[GuessAssignmentStatement], loads(guessStatements))
    fluid_definitions = cast(list[FluidFunction], loads(fluid_definitions))
    interpolation_definitions = cast(list[InterpolationFunction], loads(interpolation_definitions))

    placeholder_map, placeholder_set = get_custom_placeholder_map(fluid_definitions, interpolation_definitions)

    error = None
    new_statements: list[list[EqualityUnitsQueryStatement | GuessAssignmentStatement]] = []
    display_solutions: dict[str, list[str]] = {}
    try:
        new_statements, display_solutions = solve_system_numerical(statements,
                                                                   variables,
                                                                   guesses,
                                                                   guess_statements,
                                                                   placeholder_map,
                                                                   placeholder_set,
                                                                   convert_floats_to_fractions)
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


def solve_sheet(statements_and_systems) -> str:
    statements_and_systems = cast(StatementsAndSystems, loads(statements_and_systems))
    statements: list[InputAndSystemStatement] = cast(list[InputAndSystemStatement], statements_and_systems["statements"])
    system_definitions = statements_and_systems["systemDefinitions"]
    fluid_definitions = statements_and_systems["fluidFunctions"]
    interpolation_definitions = statements_and_systems["interpolationFunctions"]
    custom_base_units = statements_and_systems.get("customBaseUnits", None)
    simplify_symbolic_expressions = statements_and_systems["simplifySymbolicExpressions"]
    convert_floats_to_fractions = statements_and_systems["convertFloatsToFractions"]

    try:
        placeholder_map, placeholder_set = get_custom_placeholder_map(fluid_definitions, interpolation_definitions)
    except Exception as e:
        error = f"Error generating interpolation or polyfit function: {e}"
        return dumps(Results(error=error, results=[], systemResults=[]))

    custom_definition_names = [value["name"] for value in fluid_definitions]
    custom_definition_names.extend( (value["name"] for value in interpolation_definitions) )

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
                                                      dumps(system_definition["variables"]),
                                                      convert_floats_to_fractions)
        else:
            needed_fluid_definitions: dict[str, FluidFunction] = {}
            needed_interpolation_definitions: dict[str, InterpolationFunction] = {}

            for statement in system_definition["statements"]:
                equation_to_system_cell_map[statement["equationIndex"]] = i

                for fluid_definition in fluid_definitions:
                    if fluid_definition["name"] in statement["sympy"]:
                        needed_fluid_definitions[fluid_definition["name"]] = fluid_definition

                for interpolation_definition in interpolation_definitions:
                    if interpolation_definition["name"] in statement["sympy"]:
                        needed_interpolation_definitions[interpolation_definition["name"]] = interpolation_definition


            selected_solution = 0
            (system_error,
            system_solutions,
            display_solutions) = get_system_solution_numerical(dumps(system_definition["statements"]),
                                                               dumps(system_definition["variables"]),
                                                               dumps(system_definition["guesses"]),
                                                               dumps(system_definition["guessStatements"]),
                                                               dumps(list(needed_fluid_definitions.values())),
                                                               dumps(list(needed_interpolation_definitions.values())),
                                                               convert_floats_to_fractions)

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
    results: list[Result | FiniteImagResult | list[PlotResult] | MatrixResult | DataTableResult]
    numerical_system_cell_errors: dict[int, bool]
    error, results, numerical_system_cell_errors = get_query_values(statements,
                                                                    custom_base_units,
                                                                    simplify_symbolic_expressions,
                                                                    convert_floats_to_fractions,
                                                                    placeholder_map,
                                                                    placeholder_set,
                                                                    custom_definition_names)

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


def get_custom_placeholder_map(fluid_definitions: list[FluidFunction],
                               interpolation_definitions: list[InterpolationFunction]) -> \
                               tuple[dict[Function, PlaceholderFunction], set[Function]]:
    fluid_placeholder_map = get_fluid_placeholder_map(fluid_definitions)

    interpolation_placeholder_map = get_interpolation_placeholder_map(interpolation_definitions)

    placeholder_map = global_placeholder_map | fluid_placeholder_map | interpolation_placeholder_map
    placeholder_set = set(placeholder_map.keys())

    return placeholder_map, placeholder_set


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
