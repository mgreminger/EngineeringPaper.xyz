import { unit, bignumber, type Unit } from "mathjs";
import { ErrorListener, TerminalNode } from "antlr4";
import LatexParserVisitor from "./LatexParserVisitor";
import type { FieldTypes, Statement, QueryStatement, RangeQueryStatement, UserFunctionRange,
              AssignmentStatement, ImplicitParameter, UserFunction, FunctionArgumentQuery,
              FunctionArgumentAssignment, LocalSubstitution, LocalSubstitutionRange, 
              Exponent, GuessAssignmentStatement, FunctionUnitsQuery,
              SolveParametersWithGuesses, ErrorStatement, EqualityStatement,
              EqualityUnitsQueryStatement, Insertion, SolveParameters } from "./types";
import { RESERVED, GREEK_CHARS, UNASSIGNABLE, COMPARISON_MAP, 
         UNITS_WITH_OFFSET, TYPE_PARSING_ERRORS, BUILTIN_FUNCTION_MAP } from "./constants.js";
import type {
  GuessContext, Guess_listContext, IdContext, Id_listContext,
  StatementContext, QueryContext, AssignContext, EqualityContext, PiExprContext,
  ExponentContext, ArgumentContext, BuiltinFunctionContext, FunctionContext,
  IndefiniteIntegralContext, Indefinite_integral_cmdContext,
  Integral_cmdContext, IntegralContext, DerivativeContext,
  Derivative_cmdContext, NDerivativeContext, N_derivative_cmdContext,
  TrigContext, UnitExponentContext, UnitFractionalExponentContext, SqrtContext,
  LnContext, LogContext, AbsContext, UnaryMinusContext,
  BaseLogContext, UnitSqrtContext, MultiplyContext, UnitMultiplyContext,
  DivideContext, UnitDivideContext, AddContext,
  SubtractContext, VariableContext, Number_with_unitsContext,
  NumberContext, NumberExprContext, NumberWithUnitsExprContext,
  SubExprContext, UnitSubExprContext, UnitNameContext,
  UnitBlockContext, Condition_singleContext, Condition_chainContext,
  ConditionContext, Piecewise_argContext, Piecewise_assignContext,
  BaseLogSingleCharContext
} from "./LatexParser";


function checkUnits(units: string) {
  let dimensions: number[];
  let unitsValid: boolean;
  try {
    const unitsCheck = unit(units);
    dimensions = unitsCheck.dimensions;
    unitsValid = true;
  } catch (e) {
    unitsValid = false;
  }

  return {
    dimensions: dimensions,
    unitsValid: unitsValid
  }
}

export class LatexErrorListener extends ErrorListener<any> {
  count = 0;
  constructor() {
    super();
    this.count = 0;
  }
  syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
    // const stack = recognizer.getRuleInvocationStack();
    // stack.reverse();
    // console.log("rule stack: "+stack);
    // console.log("line "+line+":"+charPositionInLine+" at "+
    //                     offendingSymbol+": "+msg);
    this.count++;
  }
}

export class LatexToSympy extends LatexParserVisitor<string | Statement | (LocalSubstitution | LocalSubstitutionRange)[]> {
  sourceLatex: string;
  equationIndex: number;
  type: FieldTypes;

  paramIndex = 0;
  paramPrefix = "implicit_param__";

  exponentIndex = 0;
  exponentPrefix = "exponent__";
  implicitParams: ImplicitParameter[] = [];

  params: string[] = [];
  parsingError = false;
  parsingErrorMessage = '';
  exponents: Exponent[] = [];

  reservedSuffix = "_as_variable";

  reserved = RESERVED;
  greekChars = GREEK_CHARS;

  unassignable = UNASSIGNABLE;

  insertions: Insertion[] = [];

  rangeCount = 0;
  functions: (UserFunction | UserFunctionRange | FunctionUnitsQuery)[] = [];
  functionIndex = 0;
  functionPrefix = "function__";
  rangeNumPoints = 51;

  arguments: (FunctionArgumentQuery | FunctionArgumentAssignment)[] = [];
  localSubs: (LocalSubstitution | LocalSubstitutionRange)[] = [];
  argumentIndex = 0;
  argumentPrefix = "argument__";

  input_units = "";

  constructor(sourceLatex: string, equationIndex: number, type: FieldTypes = "math") {
    super();
    this.sourceLatex = sourceLatex;
    this.equationIndex = equationIndex;
    this.type = type;
  }

  insertTokenCommand(command: string, token: TerminalNode) {
    this.insertions.push({
      location: token.symbol.start,
      text: "\\" + command + "{"
    });
    this.insertions.push({
      location: token.symbol.stop+1,
      text: "}"
    });
  }

  addParsingErrorMessage(newErrorMessage: string) {
    this.parsingError = true;
    if (this.parsingErrorMessage.length === 0) {
      this.parsingErrorMessage = newErrorMessage;
    } else {
      this.parsingErrorMessage = `${this.parsingErrorMessage}, ${newErrorMessage}`;
    }
  }

  mapVariableNames(name: string) {
    if (name === "e") {
      return "E"; // always recognize lowercase e as Euler's number (E in sympy)
    } else if (name === "i") {
      return "I"; // always recognize lowercase i sqrt(-1) (I in sympy)
    } else if (this.reserved.has(name)) {
      return name + this.reservedSuffix;
    } else {
      return name;
    }
  }

  getNextParName() {
    return `${this.paramPrefix}${this.equationIndex}_${this.paramIndex++}`;
  }

  getNextExponentName() {
    return `${this.exponentPrefix}${this.equationIndex}_${this
      .exponentIndex++}`;
  }

  getNextFunctionName() {
    return `${this.functionPrefix}${this.equationIndex}_${this
      .functionIndex++}`;
  }

  getNextArgumentName() {
    return `${this.argumentPrefix}${this.equationIndex}_${this
      .argumentIndex++}`;
  }

  visitId = (ctx: IdContext, seperatedSubscript?: string): string => {
    let name: string;

    if(ctx.ID()) {
      name = ctx.ID().toString();
    } else {
      name = ctx.SINGLE_CHAR_ID().toString();
    }

    if (!name.startsWith('\\') && this.greekChars.has(name.split('_')[0])) {
      // need to insert slash before variable that is a greek variable
      this.insertions.push({
        location: ctx.ID().symbol.start,
        text: "\\"
      });
    }

    if (seperatedSubscript) {
      // a subscript appears after an exponent instead of before
      if (name.includes('_')) {
        // if there is more than one component of supbscript, combine them by removing initial underscore
        name = name.replace('_', '') + seperatedSubscript;
      } else {
        name = name + seperatedSubscript;
      }
    }

    name = name.replaceAll(/{|}|\\/g, '');

    return this.mapVariableNames(name);
  }


  visitId_list = (ctx: Id_listContext): SolveParameters => {
    const ids: string[] = [];
    let i = 0;

    while (ctx.id(i)) {
      ids.push(this.visitId(ctx.id(i)));
      i++;
    }

    return {type: "unknowns", ids: ids, numericalSolve: false};
  }


  visitGuess_list = (ctx: Guess_listContext): SolveParametersWithGuesses => {
    const statements: GuessAssignmentStatement[] = [];
    const ids: string[] = [];
    const guesses: string[] = [];
    let i = 0;

    while (ctx.guess(i)) {
      const newStatement = this.visitGuess(ctx.guess(i));
      if (newStatement) {
        statements.push(newStatement);
        ids.push(newStatement.name);
        guesses.push(newStatement.guess);
      }
      i++;
    }

    // Only let the last statement have implicit params, or there will be duplicates
    // This is true since they are all in this same math field
    for (const [index, statement] of statements.entries()) {
      if (index < statements.length -1) {
        statement.implicitParams = [];
      }
    }

    return {
      type: "unknowns",
      ids: ids,
      numericalSolve: true,
      guesses: guesses,
      statements: statements
    };
  }


  visitGuess = (ctx: GuessContext): GuessAssignmentStatement | null => {
    if (!ctx.id()) {
      //user is trying to assign to pi
      this.addParsingErrorMessage(`Attempt to reassign reserved value pi`);
      return null;
    }

    const name = this.visitId(ctx.id());

    if (this.unassignable.has(name)) {
      //cannot reassign e, pi, or i
      this.addParsingErrorMessage(`Attempt to reassign reserved variable name ${name}`);
    }

    let sympyExpression: string;
    let guess: string;

    if (ctx.number_()) {
      sympyExpression = this.visitNumber(ctx.number_());
      guess = sympyExpression;
    } else {
      sympyExpression = this.visitNumber_with_units(ctx.number_with_units());
      guess = this.implicitParams.slice(-1)[0].si_value;
    }

    const guessStatement: GuessAssignmentStatement = {
      type: "assignment",
      name: name,
      guess: guess,
      sympy: sympyExpression,
      implicitParams: this.implicitParams,
      params: this.params,
      exponents: this.exponents,
      functions: this.functions,
      arguments: this.arguments,
      localSubs: this.localSubs,
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isFromPlotCell: false,
      isRange: false
    };

    return guessStatement;
  }


  visitStatement = (ctx: StatementContext): Statement => {
    if (ctx.assign()) {
      if (this.type === "math") {
        return this.visitAssign(ctx.assign());
      } else if (this.type === "equality") {
        const sympy = this.visitAssign(ctx.assign());
        if (this.functions.length > 0) {
          this.addParsingErrorMessage('Function syntax is not allowed in a System Solve Cell.')
          return {type: "error"};
        } else {
          return sympy;
        }
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.query()) {
      if (this.type === "math") {
        return this.visitQuery(ctx.query());
      } else if (this.type === "plot") {
        const statement = this.visitQuery(ctx.query());
        if (statement.type === "query" && statement.isRange) {
          return statement;
        } else {
          this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
          return {type: "error"};
        }
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.equality()) {
      if (this.type === "equality") {
        const sympy = this.visitEquality(ctx.equality())
        if (this.functions.length > 0) {
          this.addParsingErrorMessage('Function syntax is not allowed in a System Solve Cell.')
          return {type: "error"};
        } else {
          return sympy;
        }
      } else if (this.type === "math") {
        this.addParsingErrorMessage('Equality statements are no longer allowed in math cells, use a System Solve Cell instead.');
        return {type: "error"};
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.u_block()) {
      if (this.type === "units") {
        const units = this.visit(ctx.u_block()) as string;
        const { unitsValid } = checkUnits(units);
        if (!unitsValid) {
          this.addParsingErrorMessage(`Unknown Dimension ${units}`);
        }
        // nothing needed in return statement for tables
        return { type: "units" };
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.expr()) {
      if (this.type === "expression" || this.type === "expression_no_blank") {
        return {type: "expression", sympy: this.visit(ctx.expr()) as string};
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.number_()) {
      if (this.type === "number" || this.type === "expression" || this.type === "expression_no_blank") {
        return {type: "number", value: this.visitNumber(ctx.number_())};
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.id()) {
      if (this.type === "parameter" || this.type === "expression" || this.type === "expression_no_blank" ) {
        return {type: "parameter", name: this.visitId(ctx.id()) };
      } else if (this.type === "id_list") {
        return {type: "unknowns", ids: [this.visitId(ctx.id()),], numericalSolve: false};
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.id_list()) {
      if (this.type === "id_list") {
        return this.visitId_list(ctx.id_list());
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.guess_list()) {
      if (this.type === "id_list") {
        return this.visitGuess_list(ctx.guess_list());
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.guess()) {
      if (this.type === "id_list") {
        const guessStatement = this.visitGuess(ctx.guess());
        return {
          type: "unknowns",
          ids: [guessStatement.name],
          numericalSolve: true,
          guesses: [guessStatement.guess],
          statements: [guessStatement]
        };
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.condition()) {
      if (this.type === "condition") {
        return {type: "condition", sympy: this.visitCondition(ctx.condition())};
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.piecewise_assign()) {
      if (this.type === "piecewise") {
        return this.visitPiecewise_assign(ctx.piecewise_assign());
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else {
      // this is a blank expression, check if this is okay or should generate an error
      if ( ["plot", "parameter", "expression_no_blank",
            "condition", "equality", "id_list"].includes(this.type) ) {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      } else {
        // blank is fine, return blank object for statement
        return { type: "blank", params: [], implicitParams: [], exponents: [], isFromPlotCell: false};
      }
    }
  }

  visitQuery = (ctx: QueryContext): QueryStatement | RangeQueryStatement => {
    let sympy = this.visit(ctx.expr()) as string;

    let units = "";
    let unitsLatex = "";
    let units_valid = false;
    let query_dimensions: number[] = [];

    const u_block = ctx.u_block();

    if (u_block) {
      units = this.visit(u_block) as string;
      unitsLatex = `\\left${this.sourceLatex.slice(
        u_block.start.column,
        u_block.stop.column + 1
      )}`;
      const { dimensions, unitsValid } = checkUnits(units);
      if (unitsValid) {
        query_dimensions = dimensions;
        units_valid = true;
      } else {
        this.addParsingErrorMessage(`Unknown Dimension ${units}`);
        units_valid = false;
      }
    }

    const initialQuery: QueryStatement = {
      type: "query",
      exponents: this.exponents,
      implicitParams: this.implicitParams,
      params: this.params,
      functions: this.functions,
      arguments: this.arguments,
      localSubs: this.localSubs,
      units: units,
      unitsLatex: unitsLatex,
      dimensions: query_dimensions,
      units_valid: units_valid,
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isUnitsQuery: false,
      isEqualityUnitsQuery: false,
      isFromPlotCell: this.type === "plot",
      sympy: sympy,
      isRange: false
    };

    let finalQuery: QueryStatement | RangeQueryStatement = initialQuery;

    if (this.rangeCount > 1) {
      this.addParsingErrorMessage('Only one range may be specified for plotting.');
    } else if (this.rangeCount === 1) {
      const rangeFunction = this.functions.filter(value => (value.isRange))[0] as UserFunctionRange;
      if (rangeFunction.name !== sympy) {
        this.addParsingErrorMessage(`Range may only be specified at top level function.`)
      } else {
        finalQuery = {
          ...initialQuery,
          isRange: true,
          cellNum: -1,
          numPoints: this.rangeNumPoints,
          freeParameter: rangeFunction.freeParameter,
          lowerLimitArgument: rangeFunction.lowerLimitArgument,
          lowerLimitInclusive: rangeFunction.lowerLimitInclusive,
          upperLimitArgument: rangeFunction.upperLimitArgument,
          upperLimitInclusive: rangeFunction.upperLimitInclusive,
          unitsQueryFunction: rangeFunction.unitsQueryFunction,
          input_units: this.input_units,
          outputName: rangeFunction.sympy,
        }
      }
    }

    return finalQuery;
  }

  visitAssign = (ctx: AssignContext): AssignmentStatement | ErrorStatement | EqualityStatement => {
    if (!ctx.id()) {
      //user is trying to assign to pi
      this.addParsingErrorMessage(`Attempt to reassign reserved value pi`);
      return {type: "error"};
    }

    const name = this.visitId(ctx.id());

    if (this.unassignable.has(name)) {
      //cannot reassign e, pi, or i
      this.addParsingErrorMessage(`Attempt to reassign reserved variable name ${name}`);
    }

    const sympyExpression = this.visit(ctx.expr()) as string;

    if (this.rangeCount > 0) {
      this.addParsingErrorMessage('Ranges may not be used in assignments.');
    }

    if (this.type === "equality") {
      this.params.push(name);
      return this.getEqualityStatement(name, sympyExpression);
    } else {
      return {
        type: "assignment",
        name: name,
        sympy: sympyExpression,
        implicitParams: this.implicitParams,
        params: this.params,
        exponents: this.exponents,
        functions: this.functions,
        arguments: this.arguments,
        localSubs: this.localSubs,
        isExponent: false,
        isFunctionArgument: false,
        isFunction: false,
        isFromPlotCell: false,
        isRange: false
      };
    }
  }

  visitEquality = (ctx: EqualityContext): EqualityStatement => {
    const lhs = this.visit(ctx.expr(0)) as string;
    const rhs = this.visit(ctx.expr(1)) as string;

    return this.getEqualityStatement(lhs, rhs);
  }

  getEqualityStatement(lhs: string, rhs: string): EqualityStatement {
    if (this.rangeCount > 0) {
      this.addParsingErrorMessage('Ranges may not be used in System Solve Cells.');
    }

    const rhsUnitsQuery: EqualityUnitsQueryStatement = {
      type: "query",
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isUnitsQuery: false,
      isEqualityUnitsQuery: true,
      equationIndex: this.equationIndex,
      isFromPlotCell: false,
      sympy: rhs,
      exponents: this.exponents,
      functions: this.functions,
      arguments: this.arguments,
      localSubs: this.localSubs,
      units: "",
      implicitParams: [], // params covered by equality statement below
      params: this.params,
      isRange: false
    }

    const lhsUnitsQuery = {...rhsUnitsQuery};
    lhsUnitsQuery.sympy = lhs;

    return {
      type: "equality",
      sympy: `Eq(${lhs},${rhs})`,
      implicitParams: this.implicitParams,
      params: this.params,
      exponents: this.exponents,
      functions: this.functions,
      arguments: this.arguments,
      localSubs: this.localSubs,
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      equationIndex: this.equationIndex,
      isFromPlotCell: false,
      isRange: false,
      equalityUnitsQueries: [lhsUnitsQuery, rhsUnitsQuery]
    };
  }

  visitPiExpr = (ctx: PiExprContext) => {
    return "pi";
  }

  visitExponent = (ctx: ExponentContext) => {
    const exponentVariableName = this.getNextExponentName();
    
    let base: string;
    let cursor: number;
    let exponent: string

    if (ctx.id()) {
      if (!ctx.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT()) {
        base = this.visitId(ctx.id(), ctx.UNDERSCORE_SUBSCRIPT().toString());
      } else {
        base = this.visitId(ctx.id(), ctx.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT().toString().slice(2));
      }

      cursor = this.params.length;

      if (ctx.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT()) {
        exponent = this.mapVariableNames(ctx.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT().toString()[1]);
        this.params.push(exponent);
      } else if (ctx.SINGLE_CHAR_ID()) {
        exponent = this.mapVariableNames(ctx.SINGLE_CHAR_ID().toString());
        this.params.push(exponent);
      } else if (ctx.SINGLE_CHAR_NUMBER()) {
        exponent = ctx.SINGLE_CHAR_NUMBER().toString();
      } else {
        exponent = this.visit(ctx.expr(0)) as string;
      }

    } else {
      base = this.visit(ctx.expr(0)) as string;
      cursor = this.params.length;
      exponent = this.visit(ctx.expr(1)) as string;
    }



    this.exponents.push({
      type: "assignment",
      name: exponentVariableName,
      sympy: exponent,
      params: [...this.params.slice(cursor)],
      isExponent: true,
      isFunctionArgument: false,
      isFunction: false,
      exponents: []
    });

    this.params.push(exponentVariableName);

    return `(${base})**(${exponentVariableName})`;
  }

  visitArgument = (ctx: ArgumentContext): (LocalSubstitution | LocalSubstitutionRange)[] => {
    const newSubs: (LocalSubstitution | LocalSubstitutionRange)[] = [];

    const variableName = this.visitId(ctx.id());
    const newArguments: (FunctionArgumentQuery | FunctionArgumentAssignment)[] = [];

    let inputUnitsParameter: ImplicitParameter;
    let i = 0;
    const initialParamCursor = this.params.length;
    const initialExponentCursor = this.exponents.length;
    while (ctx.expr(i)) {
      const argumentName = this.getNextArgumentName();
      const paramCursor = this.params.length;
      const exponentCursor = this.exponents.length;
      const expression = this.visit(ctx.expr(i)) as string;

      newArguments.push({
        type: "assignment",
        name: argumentName,
        sympy: expression,
        params: [...this.params.slice(paramCursor)],
        isExponent: false,
        isFunctionArgument: true,
        isFunction: false,
        exponents: [...this.exponents.slice(exponentCursor)]
      });

      newSubs.push({
        type: "localSub",
        parameter: variableName,
        argument: argumentName,
        isRange: false,
        function: ""
      });

      if (i === 0) {
        // If user specified number with units for lower limit, use that units choice for y-axis units
        // Otherwise, SI unit will be used
        if (this.implicitParams.slice(-1)[0]?.name === expression.replace(/-|\(|\)/g, "")){
          inputUnitsParameter = this.implicitParams.slice(-1)[0];
        }
      }

      i++;
    }

    if (newSubs.length === 1) {
      newSubs[0].isRange = false;

      this.arguments.push(newArguments[0]);
    } else {
      this.rangeCount++;

      newSubs[0] = {
        ...newSubs[0],
        isRange: true,
        isLowerLimit: true,
        isInclusiveLimit: ctx._lower.text === "<" ? false : true
      };

      newSubs[1] = {
        ...newSubs[1],
        isRange: true,
        isLowerLimit: false,
        isInclusiveLimit: ctx._upper.text === "<" ? false : true
      };

      const unitQueryArgument = {...newArguments[0]}  // still an assignment, needed for unitsQueryFunction
                                                      // need to copy since newArguments[0] type changed to query below
      // Since this assignment is only used for unit checking, the lower limit is used
      if (isNaN(Number(newArguments[0].sympy))) {
        unitQueryArgument.sympy = newArguments[0].sympy;
      } else {
        // numerical lower limit without units, replace with unitless implicit param to prevent cancelling
        unitQueryArgument.sympy = this.getUnitlessImplicitParam();
      }
      
      unitQueryArgument.params = [...this.params.slice(initialParamCursor)];
      unitQueryArgument.exponents = [...this.exponents.slice(initialExponentCursor)];
      
      this.arguments.push(unitQueryArgument); 
                                                 
      newArguments[0] = {
        ...newArguments[0],
        type: "query",
        isUnitsQuery: false,
        isRange: false
      }

      newArguments[1] = {
        ...newArguments[1],
        type: "query",
        isUnitsQuery: false,
        isRange: false
      };

      this.arguments.push(...newArguments);

      this.input_units = inputUnitsParameter ? inputUnitsParameter.units : "";
    }

    return newSubs;
  }

  visitBuiltinFunction = (ctx: BuiltinFunctionContext) => {
    let functionName = this.visitId(ctx.id());

    if (functionName.endsWith(this.reservedSuffix)) {
      functionName = functionName.replace(this.reservedSuffix, "");
    }

    if (!BUILTIN_FUNCTION_MAP.has(functionName)) {
      this.addParsingErrorMessage(`Unrecognized built-in function ${functionName}`);
      return '';
    } else {
      if (!ctx.CMD_MATHRM()) {
        this.insertTokenCommand('mathrm', ctx.id().children[0] as TerminalNode);
      }

      let argumentString = "";
      let i = 0;
      while (ctx.expr(i)) {
        if (i > 0) {
          argumentString += ", ";
        }
        argumentString += this.visit(ctx.expr(i));
        i++;
      }

      return `${BUILTIN_FUNCTION_MAP.get(functionName)}(${argumentString})`;
    }
  }

  visitFunction = (ctx: FunctionContext) => {
    const functionName = this.getNextFunctionName();
    const variableName = this.visitId(ctx.id());
    const parameters: string[] = [];
    let functionLocalSubs: (LocalSubstitution | LocalSubstitutionRange)[] = [];
    let i = 0;
    while (ctx.argument(i)) {
      const newSubs = this.visitArgument(ctx.argument(i));
      functionLocalSubs.push(...newSubs);
      parameters.push(newSubs[0].parameter);
      i++;
    }

    for (const localSub of functionLocalSubs) {
      localSub.function = functionName;
    }

    this.localSubs.push(...functionLocalSubs.filter((value): value is LocalSubstitution => !value.isRange));

    if ((new Set(parameters)).size < parameters.length) {
      this.addParsingErrorMessage('Paremeter name repeated in function call.');
    }

    const rangeParameters = functionLocalSubs.filter(value => value.isRange);

    const isRange = Boolean(rangeParameters.length === 2)

    let currentFunction: UserFunction | UserFunctionRange;
    if (!isRange) {
      if (ctx._points_id_0) {
        this.addParsingErrorMessage('Invalid syntax, cannot specify number of points for function without range parameter.');
        return functionName;
      } else {
        currentFunction = {
          type: "assignment",
          name: functionName,
          sympy: variableName,
          params: [variableName],
          isExponent: false,
          isFunctionArgument: false,
          isFunction: true,
          isRange: false,
          exponents: [],
          functionParameters: parameters
        }
      }
    } else {
      const lowerLimitArg = (rangeParameters as LocalSubstitutionRange[]).filter(value => value.isLowerLimit)[0];
      const upperLimitArg = (rangeParameters as LocalSubstitutionRange[]).filter(value => !value.isLowerLimit)[0];

      currentFunction = {
        type: "assignment",
        name: functionName,
        sympy: variableName,
        params: [variableName],
        isExponent: false,
        isFunctionArgument: false,
        isFunction: true,
        exponents: [],
        functionParameters: parameters,
        isRange: true,
        freeParameter: lowerLimitArg.parameter,
        lowerLimitArgument: lowerLimitArg.argument,
        lowerLimitInclusive: lowerLimitArg.isInclusiveLimit,
        upperLimitArgument: upperLimitArg.argument,
        upperLimitInclusive: upperLimitArg.isInclusiveLimit,
        unitsQueryFunction: this.getNextFunctionName()
      };

      // create a two new functions (one a query of the other) that will have all of the 
      // local subs (including range lower limit), used to establish the output units of the range
      const unitsFunction: UserFunction = {
        type: "assignment",
        name: currentFunction.unitsQueryFunction,
        sympy: variableName,
        params: [variableName],
        isExponent: false,
        isFunctionArgument: false,
        isFunction: true,
        isRange: false,
        exponents: [],
        functionParameters: parameters
      };

      const unitsQuery: FunctionUnitsQuery = {
        type: "query",
        sympy: unitsFunction.name,
        params: [unitsFunction.name],
        exponents: [],
        isExponent: false,
        isFunctionArgument: false,
        isFunction: false,
        isRange: false,
        units: '',
        isUnitsQuery: true
      };

      this.functions.push(unitsFunction, unitsQuery);

      const unitsFunctionLocalSubs: ( LocalSubstitution | LocalSubstitutionRange)[] = functionLocalSubs.filter((sub): sub is LocalSubstitution => !sub.isRange)
                                                      .map(sub => { return {...sub}});
      unitsFunctionLocalSubs.push(lowerLimitArg);
      unitsFunctionLocalSubs.forEach( sub => sub.function = unitsFunction.name);
      this.localSubs.push(...unitsFunctionLocalSubs);

      if (ctx._points_id_0) {
        if (! (ctx._points_id_0.text === "with" && ctx._points_id_1.text === "points")) {
          this.addParsingErrorMessage(`Unrecognized keyword combination ${ctx._points_id_0.text} and ${ctx._points_id_1.text}`);
        }

        const numPoints = parseFloat(this.visit(ctx._num_points) as string);

        if (!Number.isInteger(numPoints)) {
          this.addParsingErrorMessage('Number of range points must be an integer.');
        } else if (numPoints < 2) {
          this.addParsingErrorMessage('Number of range points must be 2 or greater.');
        } else {
          this.rangeNumPoints = numPoints;
        }
      }

    }

    this.functions.push(currentFunction);

    this.params.push(functionName);

    return functionName;
  }

  visitIndefiniteIntegral = (ctx: IndefiniteIntegralContext) => {
    const child = ctx.children[0] as Indefinite_integral_cmdContext;
    // check that differential symbol is d
    const diffSymbol = this.visitId(child.id(0));
    if (diffSymbol !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol ${diffSymbol}`);
      return '';
    } else {
      if (!child.CMD_MATHRM()) {
        this.insertTokenCommand('mathrm', child.id(0).children[0] as TerminalNode);
      }
      const variableOfIntegration = this.mapVariableNames(this.visitId(child.id(1)));
      return `Integral(${this.visit(child.expr())}, ${variableOfIntegration})`;
    }
  }

  visitIntegral = (ctx: IntegralContext) => {
    const child = ctx.children[0] as Integral_cmdContext;
    // check that differential symbol is d
    const diffSymbol = this.visitId(child.id(0));
    if (diffSymbol !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol ${diffSymbol}`);
      return '';
    } else {
      if (!child.CMD_MATHRM()) {
        this.insertTokenCommand('mathrm', child.id(0).children[0] as TerminalNode);
      }
      const variableOfIntegration = this.mapVariableNames(this.visitId(child.id(1)));
      return `Integral(${this.visit(child.expr(2))}, (${variableOfIntegration}, ${this.visit(child.expr(0))}, ${this.visit(child.expr(1))}))`;
    }
  }

  visitDerivative = (ctx: DerivativeContext) => {
    const child = ctx.children[0] as Derivative_cmdContext;
    // check that both differential symbols are both d
    const diffSymbol1 = this.visitId(child.id(0));
    const diffSymbol2 = this.visitId(child.id(1)); 
    if (diffSymbol1 !== "d" || diffSymbol2 !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol combination ${diffSymbol1} and ${diffSymbol2}`);
      return '';
    } else {
      if (!child._MATHRM_0) {
        this.insertTokenCommand('mathrm', child.id(0).children[0] as TerminalNode);
      }
      if (!child._MATHRM_1) {
        this.insertTokenCommand('mathrm', child.id(1).children[0] as TerminalNode);
      }
      const variableOfDifferentiation = this.mapVariableNames(this.visitId(child.id(2)));
      return `Derivative(${this.visit(child.expr())}, ${variableOfDifferentiation}, evaluate=False)`;
    }
  }

  visitNDerivative = (ctx: NDerivativeContext) => {
    const child = ctx.children[0] as N_derivative_cmdContext;

    const exp1 = parseFloat(this.visitNumber(child.number_(0)));
    const exp2 = parseFloat(this.visitNumber(child.number_(1)));

    const diffSymbol1 = this.visitId(child.id(0));
    const diffSymbol2 = this.visitId(child.id(1));

    // check that both differential symbols are both d
    if (diffSymbol1 !== "d" || diffSymbol2 !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol combination ${diffSymbol1} and ${diffSymbol2}`);
      return '';
    } else if (!Number.isInteger(exp1) || !Number.isInteger(exp1) || exp1 !== exp2) {
      this.addParsingErrorMessage(`Invalid differential order combination ${exp1} and ${exp2}`);
      return '';
    } else if(exp1 <= 0) {
      this.addParsingErrorMessage(`Invalid differential order ${exp1}`);
      return '';
    } else {
      if (!child._MATHRM_0) {
        this.insertTokenCommand('mathrm', child.id(0).children[0] as TerminalNode);
      }
      if (!child._MATHRM_1) {
        this.insertTokenCommand('mathrm', child.id(1).children[0] as TerminalNode);
      }
      const variableOfDifferentiation = this.mapVariableNames(this.visitId(child.id(2)));
      return `Derivative(${this.visit(child.expr())}, ${variableOfDifferentiation}, ${exp1}, evaluate=False)`;
    }
  }

  visitTrig = (ctx: TrigContext) => {
    let trigFunctionName;
    
    if (ctx.trig_function().children.length > 1) {
      trigFunctionName = ctx.trig_function().children[1].toString();
    } else {
      trigFunctionName = ctx.trig_function().children[0].toString();
      this.insertions.push({
        location: ctx.trig_function().start.column,
        text: "\\"
      });
    }
    
    if (trigFunctionName.startsWith("arc")) {
      trigFunctionName = "_a" + trigFunctionName.slice(3);
    }

    return `${trigFunctionName}(${this.visit(ctx.expr())})`;
  }

  visitUnitExponent = (ctx: UnitExponentContext) => {
    return `${this.visit(ctx.u_expr())}^${ctx.U_NUMBER().toString()}`;
  }

  visitUnitFractionalExponent = (ctx: UnitFractionalExponentContext) => {
    let exponentValue: number;
    const u_fraction = ctx.u_fraction();

    if (u_fraction.U_ONE()) {
      exponentValue = 1/parseFloat(u_fraction.U_NUMBER(0).getText());
    } else {
      exponentValue = parseFloat(u_fraction.U_NUMBER(0).getText())/parseFloat(u_fraction.U_NUMBER(1).getText());
    }

    return `${this.visit(ctx.u_expr())}^${exponentValue}`;
  }

  visitSqrt = (ctx: SqrtContext) => {
    return `sqrt(${this.visit(ctx.expr())})`;
  }

  visitLn = (ctx: LnContext) => {
    if (!ctx.BACK_SLASH()) {
      this.insertions.push({
        location: ctx.CMD_LN().parentCtx.start.column,
        text: '\\'
      })
    }
    return `log(${this.visit(ctx.expr())})`;
  }

  visitLog = (ctx: LogContext) => {
    if (!ctx.BACK_SLASH()) {
      this.insertions.push({
        location: ctx.CMD_LOG().parentCtx.start.column,
        text: '\\'
      })
    }
    return `log(${this.visit(ctx.expr())},10)`;
  }

  visitAbs = (ctx: AbsContext) => {
    return `_Abs(${this.visit(ctx.expr())})`;
  }

  visitUnaryMinus = (ctx: UnaryMinusContext) => {
    return `(-(${this.visit(ctx.expr())}))`;
  }

  visitBaseLog = (ctx: BaseLogContext) => {
    return `log(${this.visit(ctx.expr(1))},${this.visit(ctx.expr(0))})`;
  }

  visitBaseLogSingleChar = (ctx: BaseLogSingleCharContext) => {
    if (ctx.number_()) {
      return `log(${this.visit(ctx.expr())},${this.visit(ctx.number_())})`;
    } else {
      return `log(${this.visit(ctx.expr())},${this.visit(ctx.id())})`;
    }
  }

  visitUnitSqrt = (ctx: UnitSqrtContext) => {
    return `${this.visit(ctx.expr())}^.5`;
  }

  visitMultiply = (ctx: MultiplyContext) => {
    return `${this.visit(ctx.expr(0))}*${this.visit(ctx.expr(1))}`;
  }

  visitUnitMultiply = (ctx: UnitMultiplyContext) => {
    return `${this.visit(ctx.u_expr(0))}*${this.visit(ctx.u_expr(1))}`;
  }

  visitDivide = (ctx: DivideContext) => {
    return `(${this.visit(ctx.expr(0))})/(${this.visit(ctx.expr(1))})`;
  }

  visitUnitDivide = (ctx: UnitDivideContext) => {
    if (ctx.U_ONE()) {
      // (in/in) represents unitless instead of 1 since mathjs cannot properly parse 1
      return `(in/in)/(${this.visit(ctx.u_expr(0))})`;
    } else {
      return `(${this.visit(ctx.u_expr(0))})/(${this.visit(ctx.u_expr(1))})`;
    }
  }

  visitAdd = (ctx: AddContext) => {
    return `${this.visit(ctx.expr(0))}+${this.visit(ctx.expr(1))}`;
  }

  visitSubtract = (ctx: SubtractContext) => {
    return `${this.visit(ctx.expr(0))}-${this.visit(ctx.expr(1))}`;
  }

  visitVariable = (ctx: VariableContext) => {
    const name = this.visitId(ctx.id());
    this.params.push(name);
    return name;
  }

  visitNumber_with_units = (ctx: Number_with_unitsContext): string => {
    const newParamName = this.getNextParName();

    let numWithUnits: Unit;
    let units: string;
    let dimensions: number[];
    let si_value: string;
    let units_valid: boolean;

    try {
      units = this.visit(ctx.u_block()) as string;
      numWithUnits = unit(
        bignumber(this.visitNumber(ctx.number_())),
        units
      );
      dimensions = numWithUnits.dimensions;
      if (UNITS_WITH_OFFSET.has(units)) {
        // temps with offset need special handling 
        si_value = numWithUnits.toNumber('K').toString();
      } else {
        si_value = numWithUnits.value.toString();
      }
      units_valid = true;
    } catch (e) {
      units_valid = false;
      this.addParsingErrorMessage(`Unknown Dimension ${units}`);
    }

    this.implicitParams.push({
      name: newParamName,
      units: units,
      dimensions: dimensions,
      si_value: si_value,
      units_valid: units_valid
    });

    this.params.push(newParamName);

    return newParamName;
  }

  getUnitlessImplicitParam(value=1): string {
    const newParamName = this.getNextParName();

    const units = 'm/m';
    const mathjsUnits = unit(units);

    let param: ImplicitParameter = {
      name: newParamName,
      units: units,
      dimensions: mathjsUnits.dimensions,
      si_value: value.toString(),
      units_valid: true
    };

    this.implicitParams.push(param);
    this.params.push(param.name);

    return newParamName;
  }

  visitNumber = (ctx: NumberContext): string => {
    if (!ctx.SUB()) {
      if (!ctx.SINGLE_CHAR_NUMBER()) {
        return ctx.NUMBER().toString();
      } else {
        return ctx.SINGLE_CHAR_NUMBER().toString();
      }
    } else {
      return `-${ctx.NUMBER().toString()}`;
    }
  }

  visitNumberExpr = (ctx: NumberExprContext) => {
    return this.visit(ctx.number_());
  }

  visitNumberWithUnitsExpr = (ctx: NumberWithUnitsExprContext) => {
    return this.visit(ctx.number_with_units());
  }

  visitSubExpr = (ctx: SubExprContext) => {
    return `(${this.visit(ctx.expr())})`;
  }

  visitUnitSubExpr = (ctx: UnitSubExprContext) => {
    return `(${this.visit(ctx.u_expr())})`;
  }

  visitUnitName = (ctx: UnitNameContext) => {
    return ctx.U_NAME().toString();
  }

  visitUnitBlock = (ctx: UnitBlockContext) => {
    return this.visit(ctx.u_expr());
  }

  visitCondition_single = (ctx: Condition_singleContext) => {
    return `${COMPARISON_MAP.get(ctx._operator.text)}(${this.visit(ctx.expr(0))}, ${this.visit(ctx.expr(1))})`;
  }

  visitCondition_chain = (ctx: Condition_chainContext) => {
    const exp0 = this.visit(ctx.expr(0));
    const exp1 = this.visit(ctx.expr(1));
    const exp2 = this.visit(ctx.expr(2));

    const comparison1 = `${COMPARISON_MAP.get(ctx._lower.text)}(${exp0}, ${exp1})`;
    const comparison2 = `${COMPARISON_MAP.get(ctx._upper.text)}(${exp1}, ${exp2})`;
    return `_And(${comparison1}, ${comparison2})`;
  }

  visitCondition = (ctx: ConditionContext) => {
    if (ctx.condition_single()) {
      return this.visitCondition_single(ctx.condition_single());
    } else {
      return this.visitCondition_chain(ctx.condition_chain());
    }
  }

  visitPiecewise_arg = (ctx: Piecewise_argContext) => {
    return `(${this.visit(ctx.expr())}, ${this.visit(ctx.condition())})`;
  }

  visitPiecewise_assign = (ctx: Piecewise_assignContext): AssignmentStatement | ErrorStatement => {
    if (!ctx.id(0)) {
      //user is trying to assign to pi
      this.addParsingErrorMessage(`Attempt to reassign reserved value pi`);
      return {type: "error"};
    }

    const name = this.visitId(ctx.id(0));

    if (this.visit(ctx.id(1)) !== "piecewise") {
      this.addParsingErrorMessage("Internal Error: Expected 'piecewise' as function name");
    }

    if (this.unassignable.has(name)) {
      //cannot reassign e, pi, or i
      this.addParsingErrorMessage(`Attempt to reassign reserved variable name ${name}`);
    }

    let args = ""
    let i = 0;
    while (ctx.piecewise_arg(i)) {
      if (i > 0) {
        args += ", ";
      }
      args += this.visit(ctx.piecewise_arg(i));
      
      i++;
    } 

    const sympyExpression = `_Piecewise(${args})`;

    if (this.rangeCount > 0) {
      this.addParsingErrorMessage('Ranges may not be used in piecewise epxressions.');
    }

    return {
      type: "assignment",
      name: name,
      sympy: sympyExpression,
      implicitParams: this.implicitParams,
      params: this.params,
      exponents: this.exponents,
      functions: this.functions,
      arguments: this.arguments,
      localSubs: this.localSubs,
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isFromPlotCell: false,
      isRange: false
    };
  }
}
