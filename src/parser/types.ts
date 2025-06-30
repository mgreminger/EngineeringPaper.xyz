import type { Replacement } from "./utility";
import type { CodeCellInputOutputDims } from "../cells/CodeCell.svelte";

export type FieldTypes = "math" | "plot" | "parameter" | "function_name" | "units" | "expression" | "number" |
  "condition" | "piecewise" | "expression_no_blank" | "equality" | "id_list" | "data_table_expression" |
  "data_table_assign" | "code_func_def";


export type ImplicitParameter = {
  name: string;
  units: string;
  unitsLatex: string;
  dimensions: number[];
  original_value: string;
  si_value: string;
};


export type Statement = AssignmentStatement | AssignmentList | QueryStatement | RangeQueryStatement |
                        CodeFunctionQueryStatement | EqualityStatement | BlankStatement | UnitsStatement | 
                        ErrorStatement | SolveParameters | SolveParametersWithGuesses |
                        ExpressionStatement | NumberStatement | ParameterStatement |
                        ConditionStatement | InsertMatrix | ScatterQueryStatement | FixMixedId |
                        ParametricRangeQueryStatement | DataTableQueryStatement | CodeCellFunctionStatement;


export type InsertMatrix = {
  type: "insertMatrix";
}

export type FixMixedId = {
  type: "fixMixedId";
}

export type BlankStatement = {
  type: "blank";
  params: [];
  variableNameMap: {};
  implicitParams: [];
  isFromPlotCell: false;
};

export type UnitsStatement = {
  type: "units";
  units: string;
  unitsValid: boolean;
  unitsLatex: string;
  dimensions: number[];
};


export type ErrorStatement = {
  type: "error";
};

type ExpressionStatement = {
  type: "expression";
  sympy: string;
};

type NumberStatement = {
  type: "number";
  value: string;
};

type ParameterStatement = {
  type: "parameter";
  name: string;
  variableNameMap: Record<string, string>;
};

type ConditionStatement = {
  type: "condition";
  sympy: string;
};

export type LocalSubstitution = {
  type: "localSub";
  parameter: string;
  argument: string;
  isRange: false;
  function: string;
};

export type LocalSubstitutionRange = Omit<LocalSubstitution,"isRange"> & {
  isRange: true;
  isLowerLimit: boolean;
  isInclusiveLimit: boolean;
};

type BaseAssignmentStatement = {
  type: "assignment";
  name: string;
  sympy: string;
  params: string[];
  variableNameMap: Record<string, string>;
  isFunctionArgument: false;
  isFunction: false;
};

export type UserFunction = Omit<BaseAssignmentStatement, "isFunction"> & {
  isFunction: true;
  isRange: false;
  functionParameters: string[];
};

export type UserFunctionRange = Omit<UserFunction, "isRange"> & {
  isRange: true;
  freeParameter: string;
  lowerLimitArgument: string;
  lowerLimitInclusive: boolean;
  upperLimitArgument: string;
  upperLimitInclusive: boolean;
  unitsQueryFunction: string;
};


export type FunctionArgumentAssignment = Pick<BaseAssignmentStatement,
                                              "type" | "name" | "sympy" |
                                              "params"> & {
  isFunctionArgument: true;
  isFunction: false;
};

export type AssignmentStatement = BaseAssignmentStatement & {
  implicitParams: ImplicitParameter[];
  functions: (UserFunction | UserFunctionRange | FunctionUnitsQuery)[];
  arguments: (FunctionArgumentQuery | FunctionArgumentAssignment)[];
  localSubs: (LocalSubstitution | LocalSubstitutionRange)[];
  isFromPlotCell: false;
  isRange: false;
  isDataTableQuery: false;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
};

export type AssignmentList = {
  type: "assignmentList";
  assignments: AssignmentStatement[];
}

export type GuessAssignmentStatement = AssignmentStatement & {
  guess: string;
};

export type SolveParameters = {
  type: "unknowns";
  ids: string[];
  numericalSolve: false;
};

export type SolveParametersWithGuesses = Omit<SolveParameters, "numericalSolve"> & {
  numericalSolve: true;
  guesses: string[];
  statements: GuessAssignmentStatement[];
};


export type EqualityStatement = Omit<AssignmentStatement, "type" | "name"> & {
  type: "equality";
  equationIndex: number;
  equalityUnitsQueries: EqualityUnitsQueryStatement[];
};

type BaseQueryStatement = {
  type: "query";
  sympy: string;
  implicitParams: ImplicitParameter[];
  params: string[];
  variableNameMap: Record<string, string>;
  functions: (UserFunction | UserFunctionRange | FunctionUnitsQuery)[];
  arguments: (FunctionArgumentAssignment | FunctionArgumentQuery) [];
  localSubs: (LocalSubstitution | LocalSubstitutionRange)[];
  isFunctionArgument: false;
  isFunction: false;
  isUnitsQuery: false;
  isEqualityUnitsQuery: boolean;
  isScatterXValuesQueryStatement: false;
  isScatterYValuesQueryStatement: false;
  isFromPlotCell: boolean;
  units: string;
  unitsLatex: string;
  assignment?: AssignmentStatement;
};

export type QueryStatement = BaseQueryStatement & {
  isRange: false;
  isDataTableQuery: false;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
  subQueries: SubQueryStatement[];
  subQueryReplacements: [string, Replacement][];
  isSubQuery: false;
};

export type DataTableQueryStatement = BaseQueryStatement & {
  isRange: false;
  isDataTableQuery: true;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
  isSubQuery: false;
  cellNum: number;
  colId: number;
};

export type EqualityUnitsQueryStatement = Omit<QueryStatement, "unitsLatex" | "dimensions" | "subQueries" | "subQueryReplacements" | "isSubQuery"> & {
  isEqualityUnitsQuery: true;
  isSubQuery: false;
  equationIndex: number;
};

export type SubQueryStatement = Omit<QueryStatement, "isSubQuery" | "subQueries" | "subQueryReplacements" > & {
  isSubQuery: true;
};

export type RangeQueryStatement = BaseQueryStatement & {
  isRange: true;
  isDataTableQuery: false;
  isParametric: boolean;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
  isSubQuery: false;
  cellNum: number;
  numPoints: number;
  freeParameter: string;
  lowerLimitArgument: string;
  lowerLimitInclusive: boolean;
  upperLimitArgument: string;
  upperLimitInclusive: boolean;
  unitsQueryFunction: string;
  inputUnits: string;
  inputUnitsLatex: string;
  outputName: string;
};

export type ParametricRangeQueryStatement = {
  type: "parametricRange";
  assignmentStatements: AssignmentStatement[];
  rangeQueryStatements: RangeQueryStatement[];
}

export type ScatterXValuesQueryStatement = Omit<QueryStatement, "isScatterXValuesQueryStatement" | "subQueries" | "subQueryReplacements" | "isSubQuery"> & {
  isScatterXValuesQueryStatement: true;
  isSubQuery: false;
  equationIndex: number;
}

export type ScatterYValuesQueryStatement = Omit<QueryStatement, "isScatterYValuesQueryStatement" | "subQueries" | "subQueryReplacements" | "isSubQuery"> & {
  isScatterYValuesQueryStatement: true;
  isSubQuery: false;
  equationIndex: number;
}

export type ScatterQueryStatement = {
  type: "scatterQuery";
  asLines: boolean;
  params: [];
  variableNameMap: {};
  functions: (UserFunction | UserFunctionRange | FunctionUnitsQuery)[];
  arguments: (FunctionArgumentAssignment | FunctionArgumentQuery) [];
  localSubs: (LocalSubstitution | LocalSubstitutionRange)[];
  implicitParams: ImplicitParameter[];
  equationIndex: number;
  cellNum: number;
  isFromPlotCell: boolean;
  xValuesQuery: ScatterXValuesQueryStatement;
  yValuesQuery: ScatterYValuesQueryStatement;
  xName: string;
  yName: string;
  units: string;
  unitsLatex: string;
  inputUnits: string;
  inputUnitsLatex: string;
};

export type CodeFunctionQueryStatement = BaseQueryStatement & {
  isRange: false;
  isDataTableQuery: false;
  isCodeFunctionQuery: true;
  isCodeFunctionRawQuery: false;
  functionName: string;
  parameterNames: string[];
  parameterValues: string[];
  parameterUnits: string[];
  generateCode: boolean;
  codeFunctionRawQuery: CodeFunctionRawQuery;
};

export type CodeFunctionRawQuery = BaseQueryStatement & {
  isRange: false;
  isDataTableQuery: false;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: true;
}

export type FunctionArgumentQuery = Pick<BaseQueryStatement, "type" | "sympy" | "params" > & {
  name: string;
  isFunctionArgument: true;
  isFunction: false;
  isUnitsQuery: false;
  isRange: false;
  isDataTableQuery: false;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
};

export type FunctionUnitsQuery = Pick<BaseQueryStatement, "type" | "sympy" | "params" > & {
  units: '';
  isFunctionArgument: false;
  isFunction: false;
  isUnitsQuery: true;
  isRange: false;
  isDataTableQuery: false;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
};

export type DataTableInfo = {
  colVars: string[];
  cellNum: number;
  colId: number;
};

export type CodeCellFunctionStatement = {
  type: "codeCellFunction",
  name: string,
  latexName: string,
  inputDims: CodeCellInputOutputDims[],
  outputDims: CodeCellInputOutputDims,
};
