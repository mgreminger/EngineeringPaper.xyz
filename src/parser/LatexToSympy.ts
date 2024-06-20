import { unit, bignumber, format, type Unit } from "mathjs";
import { ErrorListener, TerminalNode, CharStream, CommonTokenStream } from "antlr4";
import LatexParserVisitor from "./LatexParserVisitor";
import type { FieldTypes, Statement, QueryStatement, RangeQueryStatement, UserFunctionRange,
              AssignmentStatement, ImplicitParameter, UserFunction, FunctionArgumentQuery,
              FunctionArgumentAssignment, LocalSubstitution, LocalSubstitutionRange, 
              Exponent, GuessAssignmentStatement, FunctionUnitsQuery,
              SolveParametersWithGuesses, ErrorStatement, EqualityStatement,
              EqualityUnitsQueryStatement, Insertion, Replacement, 
              SolveParameters, AssignmentList, ImmediateUpdate, 
              CodeFunctionQueryStatement, CodeFunctionRawQuery, 
              ScatterQueryStatement, ParametricRangeQueryStatement,
              ScatterXValuesQueryStatement, ScatterYValuesQueryStatement} from "./types";
import { isInsertion, isReplacement } from "./types";

import { RESERVED, GREEK_CHARS, UNASSIGNABLE, COMPARISON_MAP, 
         UNITS_WITH_OFFSET, TYPE_PARSING_ERRORS, BUILTIN_FUNCTION_MAP } from "./constants.js";
import { MAX_MATRIX_COLS } from "../constants";

import LatexLexer from "../parser/LatexLexer.js";
import LatexParser from "../parser/LatexParser.js";

import {
  type GuessContext, type Guess_listContext, IdContext, type Id_listContext,
  type StatementContext, type QueryContext, type AssignContext, type EqualityContext, type PiExprContext,
  type ExponentContext, type ArgumentContext, type Builtin_functionContext, type User_functionContext,
  type IndefiniteIntegralContext, type Indefinite_integral_cmdContext,
  type Integral_cmdContext, type IntegralContext, type DerivativeContext,
  type Derivative_cmdContext, type NDerivativeContext, type N_derivative_cmdContext,
  type TrigFunctionContext, type UnitExponentContext, type UnitFractionalExponentContext, type SqrtContext,
  type LnContext, type LogContext, type AbsContext, type UnaryMinusContext,
  type BaseLogContext, type UnitSqrtContext, type MultiplyContext, type UnitMultiplyContext,
  type DivideContext, type UnitDivideContext, type AddContext,
  type SubtractContext, type VariableContext, type Number_with_unitsContext,
  type NumberContext, type NumberExprContext, type NumberWithUnitsExprContext,
  type SubExprContext, type UnitSubExprContext, type UnitNameContext,
  type U_blockContext, type Condition_singleContext, type Condition_chainContext,
  type ConditionContext, type Piecewise_argContext, type Piecewise_assignContext,
  type Insert_matrixContext, type BaseLogSingleCharContext, type DivideIntsContext,
  type Assign_listContext, type Assign_plus_queryContext, type SingleIntSqrtContext, 
  type MatrixContext, type IndexContext, type MatrixMultiplyContext, type TransposeContext, type NormContext, 
  type EmptySubscriptContext, type EmptySuperscriptContext, type MissingMultiplicationContext,
  type BuiltinFunctionContext, type UserFunctionContext, type EmptyPlaceholderContext, type Scatter_plot_queryContext,
  type Parametric_plot_queryContext
} from "./LatexParser";
import { getBlankMatrixLatex } from "../utility";

import { MathField } from "../cells/MathField";


type ParsingResult = {
  pendingNewLatex: boolean;
  newLatex: string;
  parsingError: boolean;
  parsingErrorMessage: string;
  statement: Statement | null;
}

export function parseLatex(latex: string, id: number, type: FieldTypes): ParsingResult {
  const result  = {
    pendingNewLatex: false,
    newLatex: "",
    statement: null,
    parsingError: false,
    parsingErrorMessage: "",
  }

  const input = new CharStream(latex);
  const lexer = new LatexLexer(input);
  const tokens = new CommonTokenStream(lexer);
  const parser = new LatexParser(tokens);

  parser.removeErrorListeners(); // remove ConsoleErrorListener
  parser.addErrorListener(new LatexErrorListener());

  parser.buildParseTrees = true;

  const tree = parser.statement();
  //@ts-ignore
  let parsingError = Boolean(parser._syntaxErrors);

  if (!parsingError) {
    result.parsingError = false;
    result.parsingErrorMessage = '';

    const visitor = new LatexToSympy(latex, id, type);

    result.statement = visitor.visitStatement(tree);

    if (visitor.parsingError) {
      result.parsingError = true;
      result.parsingErrorMessage = visitor.parsingErrorMessage;
    }

    if (visitor.pendingEdits.length > 0) {
      try {
        result.newLatex = applyEdits(latex, visitor.pendingEdits);
        result.pendingNewLatex = true;
      } catch (e) {
        console.error(`Error auto updating latex: ${e}`);
        result.pendingNewLatex = false; // safe fallback
      }
    }

    if (result.statement.type === "immediateUpdate") {
      result.statement = null;
      result.parsingError = true; // we're in an intermediate state, can't send to sympy just yet
    }

  } else {
    result.statement = null;
    result.parsingError = true;
    result.parsingErrorMessage = "Invalid Syntax";
  }

  return result;
}

function applyEdits(source: string, pendingEdits: (Insertion | Replacement)[]): string {
  let newString: string = source;
  
  const insertions = pendingEdits.filter(isInsertion)
                                 .sort((a,b) => a.location - b.location);

  // check for insertion collisions
  const insertionLocations = new Set(insertions.map( (insertion) => insertion.location));
  if (insertionLocations.size < insertions.length) {
    throw new Error("Insertion collision");
  }

  const replacements = pendingEdits.filter(isReplacement)
                                   .sort((a,b) => a.location - b.location);

  // Perform replacements first, update insertion locations as necessary
  // Also, check for overlapping replacements and replacement insertion collisions
  let runningReplacementOffset = 0;
  let insertionCursor = 0;
  for (const [index, replacement] of replacements.entries()) {
    if (replacements[index+1]) {
      const nextLocation = replacements[index+1].location;
      if (nextLocation >= replacement.location && nextLocation < replacement.location + replacement.deletionLength) {
        throw new Error("Overlapping replacements");      
      }
    }

    newString = newString.slice(0, replacement.location + runningReplacementOffset) + replacement.text +
                newString.slice(replacement.location + runningReplacementOffset + replacement.deletionLength);

    const currentReplacementOffset = replacement.text.length - replacement.deletionLength;
    runningReplacementOffset += currentReplacementOffset

    let cursorMoved = false;
    for (const [insertionIndex, insertion] of insertions.slice(insertionCursor).entries()) {
      if (insertion.location >= replacement.location && insertion.location < replacement.location + replacement.deletionLength) {
        throw new Error("Replacement/Insertion collision");      
      }

      if (insertion.location >= replacement.location) {
        if (!cursorMoved) {
          insertionCursor = insertionIndex;
          cursorMoved = true; 
        }
        insertion.location += currentReplacementOffset;
      }
    }
  }

  // finally, perform insertions in order
  const segments = [];
  let previousInsertLocation = 0;
  for (const insert of insertions) {
    segments.push(newString.slice(previousInsertLocation, insert.location) + insert.text);
    previousInsertLocation = insert.location;
  }
  
  segments.push(newString.slice(previousInsertLocation));

  newString = segments.reduce( (accum, current) => accum+current, '');

  return newString;
}

type UnitBlockData = {
  units: string;
  unitsLatex: string;
  unitsValid: boolean;
  dimensions: number[];
}


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

export class LatexToSympy extends LatexParserVisitor<string | Statement | UnitBlockData | (LocalSubstitution | LocalSubstitutionRange)[]> {
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
  private parsingErrorMessages = new Set<string>();
  exponents: Exponent[] = [];

  reservedSuffix = "_as_variable";

  reserved = RESERVED;
  greekChars = GREEK_CHARS;

  unassignable = UNASSIGNABLE;

  pendingEdits: (Insertion | Replacement)[] = [];

  rangeCount = 0;
  functions: (UserFunction | UserFunctionRange | FunctionUnitsQuery)[] = [];
  functionIndex = 0;
  functionPrefix = "function__";
  rangeNumPoints = 51;

  arguments: (FunctionArgumentQuery | FunctionArgumentAssignment)[] = [];
  localSubs: (LocalSubstitution | LocalSubstitutionRange)[] = [];
  argumentIndex = 0;
  argumentPrefix = "argument__";

  inputUnits = "";
  inputUnitsLatex = "";

  constructor(sourceLatex: string, equationIndex: number, type: FieldTypes = "math") {
    super();
    this.sourceLatex = sourceLatex;
    this.equationIndex = equationIndex;
    this.type = type;
  }

  public get parsingErrorMessage(): string {
    return Array.from(this.parsingErrorMessages).join(", ");
  }

  insertTokenCommand(command: string, token: TerminalNode) {
    this.pendingEdits.push({
      type: "insertion",
      location: token.symbol.start,
      text: "\\" + command + "{"
    });
    this.pendingEdits.push({
      type: "insertion",
      location: token.symbol.stop+1,
      text: "}"
    });
  }

  addParsingErrorMessage(newErrorMessage: string) {
    this.parsingError = true;
    this.parsingErrorMessages.add(newErrorMessage);
  }

  mapVariableNames(name: string) {
    // remove any spaces (mathquill placed spaces before subscripts)
    name = name.replaceAll(' ', '');

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

    name = ctx.ID().toString();

    if (!name.startsWith('\\') && this.greekChars.has(name.split('_')[0])) {
      // need to insert slash before variable that is a greek variable
      this.pendingEdits.push({
        type: "insertion",
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
      isRange: false,
      isCodeFunctionQuery: false,
      isCodeFunctionRawQuery: false
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
    } else if (ctx.assign_plus_query()) {
      if (this.type === "math") {
        return this.visitAssign_plus_query(ctx.assign_plus_query());
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.assign_list()) {
      if (this.type === "math") {
        return this.visitAssign_list(ctx.assign_list());
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
    } else if (ctx.scatter_plot_query()) {
      if (this.type === "plot" || this.type === "math") {
        return this.visitScatter_plot_query(ctx.scatter_plot_query());
      } else {
        this.addParsingErrorMessage(TYPE_PARSING_ERRORS[this.type]);
        return {type: "error"};
      }
    } else if (ctx.parametric_plot_query()) {
      if (this.type === "plot" || this.type === "math") {
        return this.visitParametric_plot_query(ctx.parametric_plot_query());
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
        const unitBlockData = this.visit(ctx.u_block()) as UnitBlockData;
        
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
    } else if (ctx.insert_matrix()) {
      return this.visit(ctx.insert_matrix()) as (ImmediateUpdate | ErrorStatement) ;
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


  visitQuery = (ctx: QueryContext): QueryStatement | RangeQueryStatement | CodeFunctionQueryStatement => {
    let sympy = this.visit(ctx.expr()) as string;

    const {units, unitsLatex, unitsValid, dimensions} = this.visitU_block(ctx.u_block());

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
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isUnitsQuery: false,
      isEqualityUnitsQuery: false,
      isScatterXValuesQueryStatement: false,
      isScatterYValuesQueryStatement: false,
      isFromPlotCell: this.type === "plot",
      sympy: sympy,
      isRange: false,
      isCodeFunctionQuery: false,
      isCodeFunctionRawQuery: false
    };

    let finalQuery: QueryStatement | RangeQueryStatement | CodeFunctionQueryStatement= initialQuery;

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
          isParametric: false,
          cellNum: -1,
          numPoints: this.rangeNumPoints,
          freeParameter: rangeFunction.freeParameter,
          lowerLimitArgument: rangeFunction.lowerLimitArgument,
          lowerLimitInclusive: rangeFunction.lowerLimitInclusive,
          upperLimitArgument: rangeFunction.upperLimitArgument,
          upperLimitInclusive: rangeFunction.upperLimitInclusive,
          unitsQueryFunction: rangeFunction.unitsQueryFunction,
          inputUnits: this.inputUnits,
          inputUnitsLatex: this.inputUnitsLatex,
          outputName: rangeFunction.sympy,
        }
      }
    } else if (this.functions.length === 1 && (this.functions[0] as UserFunction).name === sympy) {
      // check to see if this query is a valid CodeFunctionQueryStatement
      let isCodeFunctionQuery = true;
      const codeFunction = this.functions[0] as UserFunction;

      const parameterValues: string[] = [];
      const parameterUnits: string[] = [];

      const implicitParamsNames = new Set(this.implicitParams.map(implicitParam => implicitParam.name)); 

      for (const parameter of codeFunction.functionParameters) {
        const localSub = this.localSubs.find(localSub => localSub.parameter === parameter) as LocalSubstitution;
        const argument = this.arguments.find(argument => argument.name === localSub.argument && argument.type === "assignment") as FunctionArgumentAssignment;
        if (!isNaN(Number(argument.sympy))) {
          parameterValues.push(argument.sympy);
          parameterUnits.push("");
        } else if (implicitParamsNames.has(argument.sympy)) {
          const implicitParam = this.implicitParams.find(implicitParam => implicitParam.name === argument.sympy);
          parameterValues.push(implicitParam.original_value);
          parameterUnits.push(implicitParam.units);
        } else {
          isCodeFunctionQuery = false;
        }
      }
      if (isCodeFunctionQuery) {

        const codeFunctionRawQuery: CodeFunctionRawQuery = {
          type: "query",
          exponents: [],
          implicitParams: [],
          params: [codeFunction.sympy,],
          functions: [],
          arguments: [],
          localSubs: [],
          units: units,
          unitsLatex: unitsLatex,
          isExponent: false,
          isFunctionArgument: false,
          isFunction: false,
          isUnitsQuery: false,
          isEqualityUnitsQuery: false,
          isScatterXValuesQueryStatement: false,
          isScatterYValuesQueryStatement: false,
          isFromPlotCell: false,
          sympy: codeFunction.sympy,
          isRange: false,
          isCodeFunctionQuery: false,
          isCodeFunctionRawQuery: true
        };

        finalQuery = {
          ...initialQuery,
          isCodeFunctionQuery: true,
          codeFunctionRawQuery: codeFunctionRawQuery,
          generateCode: false,
          functionName: codeFunction.sympy,
          parameterNames: codeFunction.functionParameters,
          parameterValues: parameterValues,
          parameterUnits: parameterUnits,
        };
      }
    }

    return finalQuery;
  }

  visitScatter_plot_query = (ctx: Scatter_plot_queryContext): ScatterQueryStatement => {
    let xName: string;
    let yName: string;
    
    let implicitParamsCursor = this.implicitParams.length;
    let paramsCursor = this.params.length;
    let exponentsCursor = this.exponents.length;
    let functionsCursor = this.functions.length;
    let argumentsCursor = this.arguments.length;
    let localSubsCursor = this.localSubs.length;

    const xExpr = this.visit(ctx.expr(0)) as string;

    if (ctx.expr(0).children.length === 1 && ctx.expr(0).children[0] instanceof IdContext) {
      xName = xExpr;
    } else {
      xName = "ScatterPlaceholderX";
    }

    const xValuesQuery: ScatterXValuesQueryStatement = {
      type: "query",
      equationIndex: this.equationIndex,
      exponents: this.exponents.slice(exponentsCursor),
      implicitParams: this.implicitParams.slice(implicitParamsCursor),
      params: this.params.slice(paramsCursor),
      functions: this.functions.slice(functionsCursor),
      arguments: this.arguments.slice(argumentsCursor),
      localSubs: this.localSubs.slice(localSubsCursor),
      units: "",
      unitsLatex: "",
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isUnitsQuery: false,
      isEqualityUnitsQuery: false,
      isScatterXValuesQueryStatement: true,
      isScatterYValuesQueryStatement: false,
      isFromPlotCell: false,
      sympy: xExpr,
      isRange: false,
      isCodeFunctionQuery: false,
      isCodeFunctionRawQuery: false
    };

    implicitParamsCursor = this.implicitParams.length;
    paramsCursor = this.params.length;
    exponentsCursor = this.exponents.length;
    functionsCursor = this.functions.length;
    argumentsCursor = this.arguments.length;
    localSubsCursor = this.localSubs.length;

    const yExpr = this.visit(ctx.expr(1)) as string;

    if (ctx.expr(1).children.length === 1 && ctx.expr(1).children[0] instanceof IdContext) {
      yName = yExpr;
    } else {
      yName = "ScatterPlaceholderY";
    }

    const yValuesQuery: ScatterYValuesQueryStatement = {
      type: "query",
      equationIndex: this.equationIndex,
      exponents: this.exponents.slice(exponentsCursor),
      implicitParams: this.implicitParams.slice(implicitParamsCursor),
      params: this.params.slice(paramsCursor),
      functions: this.functions.slice(functionsCursor),
      arguments: this.arguments.slice(argumentsCursor),
      localSubs: this.localSubs.slice(localSubsCursor),
      units: "",
      unitsLatex: "",
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isUnitsQuery: false,
      isEqualityUnitsQuery: false,
      isScatterXValuesQueryStatement: false,
      isScatterYValuesQueryStatement: true,
      isFromPlotCell: false,
      sympy: yExpr,
      isRange: false,
      isCodeFunctionQuery: false,
      isCodeFunctionRawQuery: false
    };

    let inputUnits: UnitBlockData = {units: "", unitsLatex: "", unitsValid: false, dimensions: []};
    let outputUnits: UnitBlockData = {units: "", unitsLatex: "", unitsValid: false, dimensions: []};

    if (ctx.u_block(0)) {
      inputUnits = this.visitU_block(ctx.u_block(0));
      outputUnits = this.visitU_block(ctx.u_block(1));
    }

    if (this.rangeCount > 0) {
      this.addParsingErrorMessage('Range may not be specified for a scatter plot.');
    }

    return {
      type: "scatterQuery",
      asLines: Boolean(ctx.AS_LINES()),
      params: [],
      functions: this.functions,
      arguments: this.arguments,
      localSubs: this.localSubs,
      implicitParams: this.implicitParams,
      exponents: this.exponents,
      equationIndex: this.equationIndex,
      cellNum: -1,
      isFromPlotCell: this.type === "plot",
      xValuesQuery: xValuesQuery,
      yValuesQuery: yValuesQuery,
      xName: xName,
      yName: yName,
      units: outputUnits.units,
      unitsLatex: outputUnits.unitsLatex,
      inputUnits: inputUnits.units,
      inputUnitsLatex: inputUnits.unitsLatex,
    };
  }

  visitAssign = (ctx: AssignContext): AssignmentStatement | ErrorStatement | EqualityStatement => {
    if (!ctx.id()) {
      //user is trying to assign to pi
      this.addParsingErrorMessage(`Attempt to reassign reserved value pi`);
      return {type: "error"};
    }

    const implicitParamsCursor = this.implicitParams.length;
    const paramsCursor = this.params.length;
    const exponentsCursor = this.exponents.length;
    const functionsCursor = this.functions.length;
    const argumentsCursor = this.arguments.length;
    const localSubsCursor = this.localSubs.length;

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
        implicitParams: this.implicitParams.slice(implicitParamsCursor),
        params: this.params.slice(paramsCursor),
        exponents: this.exponents.slice(exponentsCursor),
        functions: this.functions.slice(functionsCursor),
        arguments: this.arguments.slice(argumentsCursor),
        localSubs: this.localSubs.slice(localSubsCursor),
        isExponent: false,
        isFunctionArgument: false,
        isFunction: false,
        isFromPlotCell: false,
        isRange: false,
        isCodeFunctionQuery: false,
        isCodeFunctionRawQuery: false
      };
    }
  }
  

  visitAssign_plus_query = (ctx: Assign_plus_queryContext): QueryStatement | ErrorStatement => {
    const assignment = this.visitAssign(ctx.assign());

    if (assignment.type !== "assignment") {
      return {type: "error"};
    }

    const {units, unitsLatex, unitsValid, dimensions} = this.visitU_block(ctx.u_block());

    return {
      type: "query",
      exponents: [],
      implicitParams: [],
      params: [assignment.name],
      functions: [],
      arguments: [],
      localSubs: [],
      units: units,
      unitsLatex: unitsLatex,
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isUnitsQuery: false,
      isEqualityUnitsQuery: false,
      isScatterXValuesQueryStatement: false,
      isScatterYValuesQueryStatement: false,
      isFromPlotCell: false,
      sympy: assignment.name,
      isRange: false,
      isCodeFunctionQuery: false,
      isCodeFunctionRawQuery: false,
      assignment: assignment
    };
  }


  visitAssign_list = (ctx: Assign_listContext): AssignmentList => {
    const assignments: AssignmentStatement[] = [];

    let i = 0
    while (ctx.assign(i)) {
      const newAssignment = this.visitAssign(ctx.assign(i));
      if (newAssignment.type === "assignment") {
        assignments.push(newAssignment)
      }
      i++;
    }

    return {
      type: "assignmentList",
      assignments: assignments
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
      isScatterXValuesQueryStatement: false,
      isScatterYValuesQueryStatement: false,
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
      isRange: false,
      isCodeFunctionQuery: false,
      isCodeFunctionRawQuery: false
    }

    const lhsUnitsQuery = {...rhsUnitsQuery};
    lhsUnitsQuery.sympy = lhs;

    return {
      type: "equality",
      sympy: `_Eq(${lhs},${rhs})`,
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
      isCodeFunctionQuery: false,
      isCodeFunctionRawQuery: false,
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
      } else if (ctx.CARET_SINGLE_CHAR_ID()) {
        exponent = this.mapVariableNames(ctx.CARET_SINGLE_CHAR_ID().toString()[1]);
        this.params.push(exponent);
      } else if (ctx.CARET_SINGLE_CHAR_NUMBER()) {
        exponent = ctx.CARET_SINGLE_CHAR_NUMBER().toString()[1];
      } else {
        exponent = this.visit(ctx.expr(0)) as string;
      }

    } else {
      base = this.visit(ctx.expr(0)) as string;
      cursor = this.params.length;

      if (ctx.CARET_SINGLE_CHAR_ID()) {
        exponent = this.mapVariableNames(ctx.CARET_SINGLE_CHAR_ID().toString()[1]);
        this.params.push(exponent);
      } else if (ctx.CARET_SINGLE_CHAR_NUMBER()) {
        exponent = ctx.CARET_SINGLE_CHAR_NUMBER().toString()[1];
      } else {
        exponent = this.visit(ctx.expr(1)) as string;
      }
    }

    if (exponent === "-1") {
      return `_Inverse(${base})`;
    }

    this.exponents.push({
      type: "assignment",
      name: exponentVariableName,
      sympy: exponent,
      params: this.params.slice(cursor),
      isExponent: true,
      isFunctionArgument: false,
      isFunction: false,
      exponents: []
    });

    this.params.push(exponentVariableName);

    return `(${base})**(${exponentVariableName})`;
  }

  visitIndex = (ctx: IndexContext): string => {
    return `_IndexMatrix(${this.visit(ctx.expr(0))}, ${this.visit(ctx.expr(1))}-1, ${this.visit(ctx.expr(2))}-1)`;
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
        params: this.params.slice(paramCursor),
        isExponent: false,
        isFunctionArgument: true,
        isFunction: false,
        exponents: this.exponents.slice(exponentCursor)
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
      
      unitQueryArgument.params = this.params.slice(initialParamCursor);
      unitQueryArgument.exponents = this.exponents.slice(initialExponentCursor);
      
      this.arguments.push(unitQueryArgument); 
                                                 
      newArguments[0] = {
        ...newArguments[0],
        type: "query",
        isUnitsQuery: false,
        isRange: false,
        isCodeFunctionQuery: false,
        isCodeFunctionRawQuery: false
      }

      newArguments[1] = {
        ...newArguments[1],
        type: "query",
        isUnitsQuery: false,
        isRange: false,
        isCodeFunctionQuery: false,
        isCodeFunctionRawQuery: false
      };

      this.arguments.push(...newArguments);

      if (inputUnitsParameter) {
        this.inputUnits = inputUnitsParameter.units;
        this.inputUnitsLatex = inputUnitsParameter.unitsLatex;
      }
    }

    return newSubs;
  }

  visitBuiltinFunction = (ctx: BuiltinFunctionContext) => {
    return this.visit(ctx.builtin_function());
  }

  visitBuiltin_function = (ctx: Builtin_functionContext) => {
    let functionName = this.visitId(ctx.id());
    let originalFunctionName = functionName;

    if (functionName.endsWith(this.reservedSuffix)) {
      originalFunctionName = functionName.replace(this.reservedSuffix, "");
    }

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

    if (!BUILTIN_FUNCTION_MAP.has(originalFunctionName)) {
      return `${functionName}(${argumentString})`;
    } else {
      return `${BUILTIN_FUNCTION_MAP.get(originalFunctionName)}(${argumentString})`;
    }
  }

  visitUserFunction = (ctx: UserFunctionContext) => {
    return this.visit(ctx.user_function());
  }

  visitUser_function = (ctx: User_functionContext) => {
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
        isCodeFunctionQuery: false,
        isCodeFunctionRawQuery: false,
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

  visitParametric_plot_query = (ctx: Parametric_plot_queryContext): ParametricRangeQueryStatement | ErrorStatement => {
    let numPoints = 100;
    
    if (ctx._for_id.text !== "for") {
      this.addParsingErrorMessage(`Unrecognized keyword: ${ctx._for_id.text}`);
      return {type: "error"};
    }

    if (ctx._points_id_0) {
      if (! (ctx._points_id_0.text === "with" && ctx._points_id_1.text === "points")) {
        this.addParsingErrorMessage(`Unrecognized keyword combination ${ctx._points_id_0.text} and ${ctx._points_id_1.text}`);
        return {type: "error"};
      }

      numPoints = parseFloat(this.visit(ctx._num_points) as string);

      if (!Number.isInteger(numPoints)) {
        this.addParsingErrorMessage('Number of range points must be an integer');
        return {type: "error"};
      } else if (numPoints < 2) {
        this.addParsingErrorMessage('Number of range points must be 2 or greater');
        return {type: "error"};
      } else {
        this.rangeNumPoints = numPoints;
      }
    }

    const argSubs = this.visitArgument(ctx.argument());
    if (argSubs.length !== 2) {
      this.addParsingErrorMessage('Range must be provided for a parametric plot');
      return {type: "error"};
    }

    let userDefinedUnits = false;
    let xUnits: UnitBlockData;
    let yUnits: UnitBlockData;

    if (ctx.u_block(0)) {
      userDefinedUnits = true;
      xUnits = this.visitU_block(ctx.u_block(0));
      yUnits = this.visitU_block(ctx.u_block(1));
    }

    // Need to parse expressions here to detect parsing errors before constructing plot statements
    this.visit(ctx.expr(0));
    this.visit(ctx.expr(1));
    if (this.parsingErrorMessages.size > 0) {
      // error detected parsing one of the expressions or the argument
      return {type: "error"};
    }

    const assignmentStatements: AssignmentStatement[] = [];
    let xVariable: string;

    if (ctx.expr(0).children.length === 1 && ctx.expr(0).children[0] instanceof IdContext) {
      xVariable = this.sourceLatex.slice(
        ctx.expr(0).start.column,
        ctx.expr(0).stop.column + ctx.expr(0).stop.text.length
      );
    } else {
      xVariable = `ParametricPlaceholderX${this.equationIndex}`;
      const xAssignment = `${xVariable}=${this.sourceLatex.slice(
        ctx.expr(0).start.column,
        ctx.expr(0).stop.column + ctx.expr(0).stop.text.length
      )}`;
      const xAssignmentResult = parseLatex(xAssignment, MathField.nextId++, "math");
      if (
        xAssignmentResult.statement?.type === "assignment" &&
        !xAssignmentResult.parsingError
      ) {
        assignmentStatements.push(xAssignmentResult.statement);
      } else {
        this.addParsingErrorMessage(
          "Internal error parsing parametric plot syntax, this is a bug. Report to support@engineeringpaper.xyz"
        );
        return { type: "error" };
      }
    }

    let yVariable: string;

    if (ctx.expr(1).children.length === 1 && ctx.expr(1).children[0] instanceof IdContext) {
      yVariable = this.sourceLatex.slice(
        ctx.expr(1).start.column,
        ctx.expr(1).stop.column + ctx.expr(1).stop.text.length
      );
    } else {
      yVariable = `ParametricPlaceholderY${this.equationIndex}`;
      const yAssignment = `${yVariable}=${this.sourceLatex.slice(
        ctx.expr(1).start.column,
        ctx.expr(1).stop.column + ctx.expr(1).stop.text.length
      )}`;
      const yAssignmentResult = parseLatex(yAssignment, MathField.nextId++, "math");
      if (
        yAssignmentResult.statement?.type === "assignment" &&
        !yAssignmentResult.parsingError
      ) {
        assignmentStatements.push(yAssignmentResult.statement);
      } else {
        this.addParsingErrorMessage(
          "Internal error parsing parametric plot assignment syntax, this is a bug. Report to support@engineeringpaper.xyz"
        );
        return { type: "error" };
      }
    }

    let xQuery = `${xVariable}(${this.sourceLatex.slice(
      ctx.argument().start.column,
      ctx.argument().stop.column + ctx.argument().stop.text.length
    )}) with ${numPoints} points =`;

    let yQuery = `${yVariable}(${this.sourceLatex.slice(
      ctx.argument().start.column,
      ctx.argument().stop.column + ctx.argument().stop.text.length
    )}) with ${numPoints} points =`;

    if (userDefinedUnits) {
      xQuery += xUnits.unitsLatex;
      yQuery += yUnits.unitsLatex;
    }

    const xQueryResult = parseLatex(xQuery, MathField.nextId++, "plot");
    const yQueryResult = parseLatex(yQuery, MathField.nextId++, "plot");

    if (!(xQueryResult.statement?.type === "query" &&
          xQueryResult.statement?.isRange &&
          !xQueryResult.parsingError &&
          yQueryResult.statement?.type === "query" &&
          yQueryResult.statement?.isRange &&
          !yQueryResult.parsingError
    )) {
      this.addParsingErrorMessage('Internal error parsing parametric plot syntax, this is a bug. Report to support@engineeringpaper.xyz');
      return {type: "error"};
    } else {
      xQueryResult.statement.isParametric = true;
      yQueryResult.statement.isParametric = true;
      return {
        type: "parametricRange",
        assignmentStatements,
        rangeQueryStatements: [yQueryResult.statement, xQueryResult.statement] /* order is significant */
      };
    }
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
      this.params.push(variableOfIntegration);
      let integrand = this.visit(child.expr());
      return `_Integral(Subs(${integrand}, ${variableOfIntegration}, ${variableOfIntegration}__dummy_var), ${integrand}, ${variableOfIntegration}__dummy_var, ${variableOfIntegration})`;
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
      this.params.push(variableOfIntegration);

      let lowerLimit: string;
      let upperLimit: string;
      let integrand: string = this.visit(child._integrand_expr) as string;

      if (child._lower_lim_expr) {
        lowerLimit = this.visit(child._lower_lim_expr) as string;
      } else if (child.CMD_INT_UNDERSCORE_SINGLE_CHAR_ID()) {
        lowerLimit = child.CMD_INT_UNDERSCORE_SINGLE_CHAR_ID().toString().slice(-1)[0];
        lowerLimit = this.mapVariableNames(lowerLimit);
        this.params.push(lowerLimit);
      } else {
        lowerLimit = child.CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER().toString().slice(-1)[0];
      }

      if (child._upper_lim_expr) {
        upperLimit = this.visit(child._upper_lim_expr) as string;
      } else if (child.CARET_SINGLE_CHAR_ID()) {
        upperLimit = this.mapVariableNames(child.CARET_SINGLE_CHAR_ID().toString()[1]);
        this.params.push(upperLimit);
      } else {
        upperLimit = child.CARET_SINGLE_CHAR_NUMBER().toString()[1];
      }

      return `_Integral(Subs(${integrand}, ${variableOfIntegration}, ${variableOfIntegration}__dummy_var), Subs(${integrand}, ${variableOfIntegration}, ${lowerLimit}), ${variableOfIntegration}__dummy_var, ${variableOfIntegration}, Subs(${lowerLimit}, ${variableOfIntegration}, ${variableOfIntegration}__dummy_var), Subs(${upperLimit}, ${variableOfIntegration}, ${variableOfIntegration}__dummy_var), ${lowerLimit}, ${upperLimit})`;
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
      this.params.push(variableOfDifferentiation);
      let operand = this.visit(child.expr());
      return `_Derivative(Subs(${operand}, ${variableOfDifferentiation}, ${variableOfDifferentiation}__dummy_var), ${operand}, ${variableOfDifferentiation}__dummy_var, ${variableOfDifferentiation})`;
    }
  }

  visitNDerivative = (ctx: NDerivativeContext) => {
    const child = ctx.children[0] as N_derivative_cmdContext;

    let exp1: number;
    let exp2: number

    if (child._single_char_exp1 || child._single_char_exp2) {
      if (!(child._single_char_exp1 && child._single_char_exp2)) {
        this.addParsingErrorMessage(`Invalid differential symbol combination`);
        return '';
      }
      exp1 = parseFloat(child._single_char_exp1.text[1]);
      exp2 = parseFloat(child._single_char_exp2.text[1]);
      child.CARET(0)
    } else {
      exp1 = parseFloat(this.visitNumber(child.number_(0)));
      exp2 = parseFloat(this.visitNumber(child.number_(1)));
    }

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
      this.params.push(variableOfDifferentiation);
      let operand = this.visit(child.expr());
      return `_Derivative(Subs(${operand}, ${variableOfDifferentiation}, ${variableOfDifferentiation}__dummy_var), ${operand}, ${variableOfDifferentiation}__dummy_var, ${variableOfDifferentiation}, ${exp1})`;
    }
  }

  visitTrigFunction = (ctx: TrigFunctionContext) => {
    let trigFunctionName;

    if (ctx.trig_function().BACKSLASH()) {
      trigFunctionName = ctx.trig_function().children[1].toString();
    } else {
      trigFunctionName = ctx.trig_function().children[0].toString();
      this.pendingEdits.push({
        type: "insertion",
        location: ctx.trig_function().start.column,
        text: "\\"
      });
    }
    
    if (trigFunctionName.startsWith("arc")) {
      trigFunctionName = "_a" + trigFunctionName.slice(3);
    }

    return `${trigFunctionName}(${this.visit(ctx.trig_function().expr())})`;
  }

  visitTranspose = (ctx: TransposeContext) => {
    return `_Transpose(${this.visit(ctx.expr())})`;
  }

  visitUnitExponent = (ctx: UnitExponentContext) => {
    return `${this.visit(ctx.u_expr())}^${ctx.U_NUMBER().toString()}`;
  }

  visitUnitFractionalExponent = (ctx: UnitFractionalExponentContext) => {
    let exponentValue: number;
    const u_fraction = ctx.u_fraction();

    if (u_fraction.U_CMD_FRAC_INTS()) {
      const token = u_fraction.U_CMD_FRAC_INTS().getText();
      exponentValue = parseInt(token.slice(-2)[0])/parseInt(token.slice(-1)[0])
    }else if (u_fraction.U_ONE()) {
      exponentValue = 1/parseFloat(u_fraction.U_NUMBER(0).getText());
    } else {
      exponentValue = parseFloat(u_fraction.U_NUMBER(0).getText())/parseFloat(u_fraction.U_NUMBER(1).getText());
    }

    return `${this.visit(ctx.u_expr())}^${exponentValue}`;
  }

  visitSingleIntSqrt = (ctx: SingleIntSqrtContext) => {
    return `sqrt(${ctx.CMD_SQRT_INT().getText().slice(-1)[0]})`;
  }

  visitSqrt = (ctx: SqrtContext) => {
    return `sqrt(${this.visit(ctx.expr())})`;
  }

  visitMatrix = (ctx: MatrixContext) => {
    let sympy = "Matrix([";

    let row = 0;
    while (ctx.matrix_row(row)) {
      sympy += "[";
      let col = 0;
      while (ctx.matrix_row(row).expr(col)) {
        sympy += this.visit(ctx.matrix_row(row).expr(col)) + ',';
        col++;
      }
      sympy += "],";
      row++;
    }

    sympy += "])";

    return sympy;
  }

  visitLn = (ctx: LnContext) => {
    if (!ctx.BACKSLASH()) {
      this.pendingEdits.push({
        type: "insertion",
        location: ctx.CMD_LN().parentCtx.start.column,
        text: '\\'
      })
    }
    return `log(${this.visit(ctx.expr())})`;
  }

  visitLog = (ctx: LogContext) => {
    if (!ctx.BACKSLASH()) {
      this.pendingEdits.push({
        type: "insertion",
        location: ctx.CMD_LOG().parentCtx.start.column,
        text: '\\'
      })
    }
    return `log(${this.visit(ctx.expr())},10)`;
  }

  visitAbs = (ctx: AbsContext) => {
    return `_Abs(${this.visit(ctx.expr())})`;
  }

  visitNorm = (ctx: NormContext) => {
    return `_norm(${this.visit(ctx.expr())})`;
  }

  visitUnaryMinus = (ctx: UnaryMinusContext) => {
    return `(-(${this.visit(ctx.expr())}))`;
  }

  visitBaseLog = (ctx: BaseLogContext) => {
    return `log(${this.visit(ctx.expr(1))},${this.visit(ctx.expr(0))})`;
  }

  visitBaseLogSingleChar = (ctx: BaseLogSingleCharContext) => {
    let base: string;
    
    if (ctx.CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER()) {
      base = ctx.CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER().toString().slice(-1)[0];
    } else {
      base = ctx.CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID().toString().slice(-1)[0]
      base = this.mapVariableNames(base);
      this.params.push(base);
    }

    return `log(${this.visit(ctx.expr())},${base})`;
  }

  visitUnitSqrt = (ctx: UnitSqrtContext) => {
    return `${this.visit(ctx.expr())}^.5`;
  }

  visitMultiply = (ctx: MultiplyContext) => {
    return `${this.visit(ctx.expr(0))}*${this.visit(ctx.expr(1))}`;
  }

  visitMatrixMultiply = (ctx: MatrixMultiplyContext) => {
    return `_MatMul(${this.visit(ctx.expr(0))}, ${this.visit(ctx.expr(1))})`;
  }

  visitUnitMultiply = (ctx: UnitMultiplyContext) => {
    return `${this.visit(ctx.u_expr(0))}*${this.visit(ctx.u_expr(1))}`;
  }

  visitDivide = (ctx: DivideContext) => {
    return `(${this.visit(ctx.expr(0))})/(${this.visit(ctx.expr(1))})`;
  }

  visitDivideInts = (ctx: DivideIntsContext) => {
    const token = ctx.CMD_FRAC_INTS().getText();

    return `${token.slice(-2)[0]}/${token.slice(-1)[0]}`
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
    return `Add(${this.visit(ctx.expr(0))}, ${this.visit(ctx.expr(1))})`;
  }

  visitSubtract = (ctx: SubtractContext) => {
    return `Add(${this.visit(ctx.expr(0))}, -(${this.visit(ctx.expr(1))}))`;
  }

  visitVariable = (ctx: VariableContext) => {
    const name = this.visitId(ctx.id());
    this.params.push(name);
    return name;
  }

  visitNumber_with_units = (ctx: Number_with_unitsContext): string => {
    const newParamName = this.getNextParName();

    let numWithUnits: Unit;
    let si_value: string;

    const unitBlockData = this.visit(ctx.u_block()) as UnitBlockData;

    const original_value = this.visitNumber(ctx.number_());

    if (unitBlockData.unitsValid) {
      try{
        numWithUnits = unit(
          bignumber(original_value),
          unitBlockData.units
        );
        if (UNITS_WITH_OFFSET.has(unitBlockData.units)) {
          // temps with offset need special handling 
          si_value = format(numWithUnits.toNumeric('K'));
        } else {
          si_value = format(numWithUnits.value);
        }
      } catch(e) {
        this.addParsingErrorMessage(`Error parsing '${bignumber(original_value)} ${unitBlockData.units}'. This is an error that indicates a possible bug, report to support@engineeringpaper.xyz`)
      } 
    }
    
    this.implicitParams.push({
      name: newParamName,
      units: unitBlockData.units,
      unitsLatex: unitBlockData.unitsLatex,
      dimensions: unitBlockData.dimensions,
      original_value: original_value,
      si_value: si_value,
    });

    this.params.push(newParamName);

    return newParamName;
  }

  getUnitlessImplicitParam(value=1): string {
    const newParamName = this.getNextParName();

    const units = 'm/m';
    const mathjsUnits = unit(units);

    const valueString = value.toString();

    let param: ImplicitParameter = {
      name: newParamName,
      units: units,
      unitsLatex: "",
      dimensions: mathjsUnits.dimensions,
      original_value: valueString,
      si_value: valueString
    };

    this.implicitParams.push(param);
    this.params.push(param.name);

    return newParamName;
  }

  visitNumber = (ctx: NumberContext): string => {
    if (!ctx.SUB()) {
      return ctx.NUMBER().toString();
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

  visitU_block = (ctx: U_blockContext): UnitBlockData => {
    let units = "";
    let unitsLatex = "";
    let unitsValidReturn = false;
    let unitsDimensions: number[] = [];

    if(ctx) {
      units = this.visit(ctx.u_expr()) as string;
      unitsLatex = `\\left${this.sourceLatex.slice(
        ctx.start.column,
        ctx.stop.column + ctx.stop.text.length
      )}`;
      const { dimensions, unitsValid } = checkUnits(units);
      if (unitsValid) {
        unitsDimensions = dimensions;
        unitsValidReturn = true;
      } else {
        this.addParsingErrorMessage(`Unknown Dimension ${units}`);
        unitsValidReturn = false;
      }
    }

    return {
      units: units,
      unitsLatex: unitsLatex,
      unitsValid: unitsValidReturn,
      dimensions: unitsDimensions,
    }
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
      isRange: false,
      isCodeFunctionQuery: false,
      isCodeFunctionRawQuery: false
    };
  }

  visitInsert_matrix = (ctx: Insert_matrixContext): (ImmediateUpdate | ErrorStatement) => {
    let error = false;
    let i = 0;

    while (ctx.u_insert_matrix(i)) {
      const child = ctx.u_insert_matrix(i);
      i++;

      const numRows = parseFloat(child._numRows.text);
      const numColumns = parseFloat(child._numColumns.text);

      if (!Number.isInteger(numRows) || !Number.isInteger(numColumns)) {
        this.addParsingErrorMessage('The requested number of rows or columns for a matrix must be integer values');
        error = true;
        continue;
      }

      if (numRows <= 0 || numColumns <= 0) {
        this.addParsingErrorMessage('The requested number of rows or columns for a matrix must be positive values');
        error = true;
        continue;
      }

      if (numColumns > MAX_MATRIX_COLS) {
        this.addParsingErrorMessage(`Matrices are limited to ${MAX_MATRIX_COLS} columns. The number of rows is unlimited`);
        error = true;
        continue;
      }

      const blankMatrixLatex = getBlankMatrixLatex(numRows, numColumns);

      let startLocation: number;

      if (child.L_BRACKET()) {
        startLocation = child.L_BRACKET().symbol.start;
      } else {
        startLocation = child.ALT_L_BRACKET().symbol.start;
      }

      // check for a directly proceeding '\left'
      const leftLocation = this.sourceLatex.slice(0, startLocation).lastIndexOf("\\left");
      if (this.sourceLatex.slice(leftLocation, startLocation).trim() === "\\left") {
        startLocation = leftLocation;
      } 

      let endLocation: number;

      if (child.R_BRACKET()) {
        endLocation = child.R_BRACKET().symbol.stop;
      } else {
        endLocation = child.ALT_R_BRACKET().symbol.stop;
      }

      this.pendingEdits.push({
        type:"replacement",
        location: startLocation,
        deletionLength: endLocation - startLocation + 1,
        text: blankMatrixLatex
      });
    }
    
    if (error) {
      return {type: "error"};
    } else {
      return { type: "immediateUpdate" };
    }
  }

  visitEmptySubscript = (ctx: EmptySubscriptContext): string => {
    this.addParsingErrorMessage("There is an empty subscript that is causing a syntax error");

    this.pendingEdits.push({
      type: "insertion",
      location: ctx.R_BRACE().symbol.start,
      text: "\\placeholder{}"
    });

    return '';
  }

  visitEmptySuperscript = (ctx: EmptySuperscriptContext): string => {
    this.addParsingErrorMessage("There is an empty superscript that is causing a syntax error");

    this.pendingEdits.push({
      type: "insertion",
      location: ctx.R_BRACE().symbol.start,
      text: "\\placeholder{}"
    });

    return '';
  }

  visitMissingMultiplication = (ctx: MissingMultiplicationContext): string => {
    this.addParsingErrorMessage("Missing multiplication symbol in expression");

    return '';
  }

  visitEmptyPlaceholder = (ctx: EmptyPlaceholderContext): string => {
    this.addParsingErrorMessage("Fill in empty placeholders (delete empty placeholders for unwanted subscripts or exponents)");

    return '';
  }

}
