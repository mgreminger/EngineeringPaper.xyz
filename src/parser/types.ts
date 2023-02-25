export type FieldTypes = "math" | "plot" | "parameter" | "units" | "expression" | "number" |
  "condition" | "piecewise" | "expression_no_blank" | "equality" | "id_list";


export type ImplicitParameter = {
  name: string,
  units: string,
  dimensions: number[],
  si_value: string,
  units_valid: boolean
};


export type Statement = AssignmentStatement | QueryStatement | RangeQueryStatement |
                        EqualityStatement | BlankStatement | UnitsStatement | 
                        ErrorStatement | GuessStatement;


export type BlankStatement = {
  type: "blank"
};

type UnitsStatement = {
  type: "units"
};



type GuessStatement = {
  type: "guess"
};

export type ErrorStatement = {
  type: "error"
};

export type LocalSubstitution = {
  type: "localSub",
  parameter: string,
  argument: string,
  isRange: boolean,
  function: string
};

export type LocalSubstitutionRange = LocalSubstitution & {
  isRange: true,
  isLowerLimit: boolean,
  isInclusiveLimit: boolean
}

type BaseAssignmentStatement = {
  type: "assignment",
  name: string,
  sympy: string,
  params: string[],
  isExponent: boolean,
  isFunctionArgument: boolean,
  isFunction: boolean,
  exponents: Exponent[],
}

export type UserFunction = BaseAssignmentStatement & {
  isRange: boolean
  functionParameters: string[]
};

export type UserFunctionRange = Omit<UserFunction, "isRange"> & {
  isRange: true,
  freeParameter: string,
  lowerLimitArgument: string,
  lowerLimitInclusive: boolean,
  upperLimitArgument: string,
  upperLimitInclusive: boolean,
  unitsQueryFunction: string
};


export type Exponent = BaseAssignmentStatement & {
  isExponent: true,
  isFunctionArgument: false,
  isFunction: false
};

export type FunctionArgumentAssignment = Pick<BaseAssignmentStatement,
                                              "type" | "name" | "sympy" |
                                              "params" | "exponents"> & {
  isExponent: false,
  isFunctionArgument: true,
  isFunction: false
};

export type AssignmentStatement = BaseAssignmentStatement & {
  implicitParams: ImplicitParameter[],
  functions: UserFunction[],
  arguments: (FunctionArgumentQuery | FunctionArgumentAssignment)[],
  localSubs: LocalSubstitution[],
  subId: number,
  isFromPlotCell: boolean,
  isRange: boolean
};


export type EqualityStatement = {
  type: "equality"
}

type BaseQueryStatement = {
  type: "query",
  sympy: string,
  exponents: Exponent[],
  implicitParams: ImplicitParameter[],
  params: string[],
  functions: (UserFunction | UserFunctionRange | FunctionUnitsQuery)[],
  arguments: (FunctionArgumentAssignment | FunctionArgumentQuery) [],
  localSubs: LocalSubstitution[],
  isExponent: boolean,
  isFunctionArgument: boolean,
  isFunction: boolean,
  isUnitsQuery: boolean,
  isEqualityUnitsQuery: boolean,
  subId: number,
  isFromPlotCell: boolean,
  id: null | number,
  units: string,
  units_valid: boolean,
  unitsLatex: string,
  dimensions: number[]
};

export type QueryStatement = BaseQueryStatement & {
  isRange: false
}

export type RangeQueryStatement = BaseQueryStatement & {
  isRange: true,
  numPoints: number,
  freeParameter: string,
  lowerLimitArgument: string,
  lowerLimitInclusive: boolean,
  upperLimitArgument: string,
  upperLimitInclusive: boolean,
  unitsQueryFunction: string,
  input_units: string,
  outputName: string
}

export type FunctionArgumentQuery = Pick<BaseQueryStatement, "type" | "sympy" | "params" | "exponents" > & {
  name: string,
  isExponent: false,
  isFunctionArgument: true,
  isFunction: false
  isUnitsQuery: false,
  isRange: false
}

export type FunctionUnitsQuery = Pick<BaseQueryStatement, "type" | "sympy" | "params" | "exponents" > & {
  units: '',
  isExponent: false,
  isFunctionArgument: false,
  isFunction: false
  isUnitsQuery: true,
  isRange: false
}
