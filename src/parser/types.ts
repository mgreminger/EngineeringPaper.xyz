export type FieldTypes = "math" | "plot" | "parameter" | "units" | "expression" | "number" |
  "condition" | "piecewise" | "expression_no_blank" | "equality" | "id_list";


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
                        ConditionStatement | ImmediateUpdate | ScatterQueryStatement |
                        ParametricRangeQueryStatement;


export type ImmediateUpdate = {
  type: "immediateUpdate";
}

export type BlankStatement = {
  type: "blank";
  params: [];
  implicitParams: [];
  exponents: [];
  isFromPlotCell: false;
};

type UnitsStatement = {
  type: "units";
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
  isExponent: false;
  isFunctionArgument: false;
  isFunction: false;
  exponents: Exponent[];
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


export type Exponent = Omit<BaseAssignmentStatement, "isExponent"> & {
  isExponent: true;
  isFunctionArgument: false;
  isFunction: false;
};

export type FunctionArgumentAssignment = Pick<BaseAssignmentStatement,
                                              "type" | "name" | "sympy" |
                                              "params" | "exponents"> & {
  isExponent: false;
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
  exponents: Exponent[];
  implicitParams: ImplicitParameter[];
  params: string[];
  functions: (UserFunction | UserFunctionRange | FunctionUnitsQuery)[];
  arguments: (FunctionArgumentAssignment | FunctionArgumentQuery) [];
  localSubs: (LocalSubstitution | LocalSubstitutionRange)[];
  isExponent: false;
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
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
};

export type EqualityUnitsQueryStatement = Omit<QueryStatement, "unitsLatex" | "dimensions"> & {
  isEqualityUnitsQuery: true;
  equationIndex: number;
};

export type RangeQueryStatement = BaseQueryStatement & {
  isRange: true;
  isParametric: boolean;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
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

export type ScatterXValuesQueryStatement = Omit<QueryStatement, "isScatterXValuesQueryStatement"> & {
  isScatterXValuesQueryStatement: true;
  equationIndex: number;
}

export type ScatterYValuesQueryStatement = Omit<QueryStatement, "isScatterYValuesQueryStatement"> & {
  isScatterYValuesQueryStatement: true;
  equationIndex: number;
}

export type ScatterQueryStatement = {
  type: "scatterQuery";
  asLines: boolean;
  params: [];
  functions: (UserFunction | UserFunctionRange | FunctionUnitsQuery)[];
  arguments: (FunctionArgumentAssignment | FunctionArgumentQuery) [];
  localSubs: (LocalSubstitution | LocalSubstitutionRange)[];
  implicitParams: ImplicitParameter[];
  exponents: Exponent[];
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
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: true;
}

export type FunctionArgumentQuery = Pick<BaseQueryStatement, "type" | "sympy" | "params" | "exponents" > & {
  name: string;
  isExponent: false;
  isFunctionArgument: true;
  isFunction: false;
  isUnitsQuery: false;
  isRange: false;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
};

export type FunctionUnitsQuery = Pick<BaseQueryStatement, "type" | "sympy" | "params" | "exponents" > & {
  units: '';
  isExponent: false;
  isFunctionArgument: false;
  isFunction: false;
  isUnitsQuery: true;
  isRange: false;
  isCodeFunctionQuery: false;
  isCodeFunctionRawQuery: false;
};

export type Insertion = {
  type: "insertion";
  location: number;
  text: string;
};

export function isInsertion(edit: (Insertion | Replacement)): edit is Insertion {
  return edit.type === "insertion";
}

export type Replacement = {
  type: "replacement";
  location: number;
  deletionLength: number;
  text: string
}

export function isReplacement(edit: (Insertion | Replacement)): edit is Replacement {
  return edit.type === "replacement";
}