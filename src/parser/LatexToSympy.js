import { unit, bignumber } from "mathjs";
import antlr4 from "antlr4";
import LatexParserVisitor from "./LatexParserVisitor.js";

// SymPy has many reserved names
// These will get remapped so the user can still use these as variable names
const reserved = new Set([
  // trig functions that don't match the latex names (or don't have latex versions)
  "asin", "acos", "atan", "acot", "asec", "acsc", "atan2",
  // from sympy/core/__init__.py (leave out pi since pi maps one-to-one)
  "sympify",
  "SympifyError",
  "cacheit",
  "assumptions",
  "Basic",
  "Atom",
  "S",
  "Expr",
  "AtomicExpr",
  "UnevaluatedExpr",
  "Symbol",
  "Wild",
  "Dummy",
  "symbols",
  "var",
  "Number",
  "Float",
  "Rational",
  "Integer",
  "NumberSymbol",
  "RealNumber",
  "igcd",
  "ilcm",
  "seterr",
  "E",
  "I",
  "nan",
  "oo",
  "zoo",
  "AlgebraicNumber",
  "comp",
  "Pow",
  "Mul",
  "prod",
  "Add",
  "Mod",
  "Rel",
  "Eq",
  "Ne",
  "Lt",
  "Le",
  "Gt",
  "Ge",
  "Equality",
  "GreaterThan",
  "LessThan",
  "Unequality",
  "StrictGreaterThan",
  "StrictLessThan",
  "vectorize",
  "Lambda",
  "WildFunction",
  "Derivative",
  "diff",
  "FunctionClass",
  "Function",
  "Subs",
  "expand",
  "PoleError",
  "nfloat",
  "arity",
  "PrecisionExhausted",
  "N",
  "evalf",
  "Tuple",
  "Dict",
  "evaluate",
  "Catalan",
  "EulerGamma",
  "GoldenRatio",
  "TribonacciConstant",
  "UndefinedKind",
  "NumberKind",
  "BooleanKind",
  // from sympy/functions/special/error_functions.py
  "TrigonometricIntegral",
  "Si",
  "Ci",
  "Ei",
  "expint",
  "Shi",
  "Li",
  "li",
  "erf",
  "erfc",
  "E1",
  "Chi",
  "erfi",
  "erf2",
  "fresnels",
  "fresnelc",
  "FresnelIntegral",
  "erfcinv",
  "erf2inv",
  // others
  "test"
]);

const unassignable = new Set(["I", "E", "pi"]);

export class LatexErrorListener extends antlr4.error.ErrorListener {
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

export class LatexToSympy extends LatexParserVisitor {
  constructor(sourceLatex, equationIndex) {
    super();
    this.sourceLatex = sourceLatex;
    this.equationIndex = equationIndex;

    this.paramIndex = 0;
    this.paramPrefix = "implicit_param_";

    this.exponentIndex = 0;
    this.exponentPrefix = "exponent_";
    this.implicitParams = [];

    this.params = [];
    this.parsingError = false;
    this.parsingErrorMessage = '';
    this.exponents = [];

    this.reservedSuffix = "_variable";
    this.reserved = reserved;

    this.unassignable = unassignable;

    this.insertions = [];

    this.rangeCount = 0;
    this.functions = [];
    this.functionIndex = 0;
    this.functionPrefix = "function_";

    this.arguments = [];
    this.localSubs = [];
    this.argumentIndex = 0;
    this.argumentPrefix = "argument_";
  }

  insertTokenCommand(command, token) {
    this.insertions.push({
      location: token.symbol.start,
      text: "\\" + command + "{"
    });
    this.insertions.push({
      location: token.symbol.stop+1,
      text: "}"
    });
  }

  addParsingErrorMessage(newErrorMessage) {
    this.parsingError = true;
    if (this.parsingErrorMessage.length === 0) {
      this.parsingErrorMessage = newErrorMessage;
    } else {
      this.parsingErrorMessage = `${this.parsingErrorMessage}, ${newErrorMessage}`;
    }
  }

  mapVariableNames(name) {
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

  visitStatement(ctx) {
    if (ctx.assign()) {
      return this.visit(ctx.assign());
    } else if (ctx.query()) {
      return this.visit(ctx.query());
    } else {
      return this.visit(ctx.equality());
    }
  }

  visitQuery(ctx) {
    const query = { type: "query",
                    isExponent: false,
                    isFunctionArgument: false,
                    isFunction: false
                  };

    query.sympy = this.visit(ctx.expr());
    query.exponents = this.exponents;
    query.functions = this.functions;
    query.arguments = this.arguments;
    query.localSubs = this.localSubs;

    query.units = "";

    const u_block = ctx.u_block();

    if (u_block) {
      query.units = this.visit(u_block);
      query.unitsLatex = `\\left${this.sourceLatex.slice(
        u_block.start.column,
        u_block.stop.column + 1
      )}`;
      try {
        const unitsCheck = unit(query.units);
        query.dimensions = unitsCheck.dimensions;
        query.units_valid = true;
      } catch (e) {
        this.addParsingErrorMessage(`Unknown Dimension ${query.units}`);
        query.units_valid = false;
      }
    }

    query.implicitParams = this.implicitParams;
    query.params = this.params;

    if (this.rangeCount > 1) {
      this.addParsingErrorMessage('Only one range may be specified for plotting.');
    }

    return query;
  }

  visitAssign(ctx) {
    const name = this.mapVariableNames(ctx.ID().toString());

    if (this.unassignable.has(name)) {
      //cannot reassign e, pi, or i
      this.addParsingErrorMessage(`Attempt to reassign reserved variable name ${name}`);
    }

    const sympyExpression = this.visit(ctx.expr());

    if (this.rangeCount > 0) {
      this.addParsingErrorMessage('Ranges may not be used in assignments.');
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
      isFunction: false
    };
  }

  visitEquality(ctx) {
    const sympyExpression = `Eq(${this.visit(ctx.expr(0))},${this.visit(ctx.expr(1))})`;

    if (this.rangeCount > 0) {
      this.addParsingErrorMessage('Ranges may not be used in assignments.');
    }

    return {
      type: "equality",
      sympy: sympyExpression,
      implicitParams: this.implicitParams,
      params: this.params,
      exponents: this.exponents,
      functions: this.functions,
      arguments: this.arguments,
      localSubs: this.localSubs,
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false
    };
  }

  visitPiExpr(ctx) {
    return "pi";
  }

  visitExponent(ctx) {
    const exponentVariableName = this.getNextExponentName();
    const base = this.visit(ctx.expr(0));

    const cursor = this.params.length;
    const exponent = this.visit(ctx.expr(1));

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

  visitArgument(ctx) {
    const newSubs = [];

    const variableName = this.mapVariableNames(ctx.ID().toString());

    let i = 0;
    while (ctx.expr(i)) {
      const argumentName = this.getNextArgumentName();
      const cursor = this.params.length;
      const expression = this.visit(ctx.expr(i));

      this.arguments.push({
        type: "assignment",
        name: argumentName,
        sympy: expression,
        params: [...this.params.slice(cursor)],
        isExponent: false,
        isFunctionArgument: true,
        isFunction: false,
        exponents: []
      });

      newSubs.push({
        type: "localSub",
        parameter: variableName,
        argument: argumentName,
      });

      i++;
    }

    if (newSubs.length === 1) {
      newSubs[0].isRange = false;
    } else {
      this.rangeCount++;
      newSubs[0].isRange = true;
      newSubs[0].isLowerLimit = true;
      newSubs[0].isInclusiveLimit = ctx.lower.text === "<" ? false : true
      newSubs[1].isRange = true;
      newSubs[1].isLowerLimit = false;
      newSubs[1].isInclusiveLimit = ctx.upper.text === "<" ? false : true
    }

    return newSubs;
  }

  visitFunction(ctx) {
    const functionName = this.getNextFunctionName();
    const variableName = this.mapVariableNames(ctx.ID().toString());
    const parameters = [];
    let functionLocalSubs = [];
    let i = 0;
    while (ctx.argument(i)) {
      const newSubs = this.visit(ctx.argument(i));
      functionLocalSubs.push(...newSubs);
      parameters.push(newSubs[0].parameter);
      i++;
    }

    for (const localSub of functionLocalSubs) {
      localSub.function = functionName;
    }

    this.localSubs.push(...functionLocalSubs);

    if ((new Set(parameters)).size < parameters.length) {
      this.addParsingErrorMessage('Paremeter name repeated in function call.');
    }

    this.functions.push({
      type: "assignment",
      name: functionName,
      sympy: variableName,
      params: [variableName],
      isExponent: false,
      isFunctionArgument: false,
      isFunction: true,
      exponents: [],
    });

    this.params.push(functionName);

    return functionName;
  }

  visitIndefiniteIntegral(ctx) {
    // check that differential symbol is d
    if (ctx.children[0].ID(0).toString() !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol ${ctx.children[0].ID(0).toString()}`);
      return '';
    } else {
      if (!ctx.children[0].CMD_MATHRM()) {
        this.insertTokenCommand('mathrm', ctx.children[0].ID(0));
      }
      const variableOfIntegration = this.mapVariableNames(ctx.children[0].ID(1).toString());
      return `Integral(${this.visit(ctx.children[0].expr())}, ${variableOfIntegration})`;
    }
  }

  visitIntegral(ctx) {
    // check that differential symbol is d
    if (ctx.children[0].ID(0).toString() !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol ${ctx.children[0].ID(0).toString()}`);
      return '';
    } else {
      if (!ctx.children[0].CMD_MATHRM()) {
        this.insertTokenCommand('mathrm', ctx.children[0].ID(0));
      }
      const variableOfIntegration = this.mapVariableNames(ctx.children[0].ID(1).toString());
      return `Integral(${this.visit(ctx.children[0].expr(2))}, (${variableOfIntegration}, ${this.visit(ctx.children[0].expr(0))}, ${this.visit(ctx.children[0].expr(1))}))`;
    }
  }

  visitDerivative(ctx) {
    // check that both differential symbols are both d
    if (ctx.children[0].ID(0).toString() !== "d" || ctx.children[0].ID(1).toString() !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol combination ${ctx.children[0].ID(0).toString()} and ${ctx.children[0].ID(1).toString()}`);
      return '';
    } else {
      if (!ctx.children[0].MATHRM_0) {
        this.insertTokenCommand('mathrm', ctx.children[0].ID(0));
      }
      if (!ctx.children[0].MATHRM_1) {
        this.insertTokenCommand('mathrm', ctx.children[0].ID(1));
      }
      const variableOfDifferentiation = this.mapVariableNames(ctx.children[0].ID(2).toString());
      return `Derivative(${this.visit(ctx.children[0].expr())}, ${variableOfDifferentiation}, evaluate=False)`;
    }
  }

  visitNDerivative(ctx) {
    const exp1 = parseFloat(ctx.children[0].NUMBER(0).toString());
    const exp2 = parseFloat(ctx.children[0].NUMBER(1).toString());

    // check that both differential symbols are both d
    if (ctx.children[0].ID(0).toString() !== "d" || ctx.children[0].ID(1).toString() !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol combination ${ctx.children[0].ID(0).toString()} and ${ctx.children[0].ID(1).toString()}`);
      return '';
    } else if (!Number.isInteger(exp1) || !Number.isInteger(exp1) || exp1 !== exp2) {
      this.addParsingErrorMessage(`Invalid differential order combination ${exp1} and ${exp2}`);
      return '';
    } else if(exp1 <= 0) {
      this.addParsingErrorMessage(`Invalid differential order ${exp1}`);
      return '';
    } else {
      if (!ctx.children[0].MATHRM_0) {
        this.insertTokenCommand('mathrm', ctx.children[0].ID(0));
      }
      if (!ctx.children[0].MATHRM_1) {
        this.insertTokenCommand('mathrm', ctx.children[0].ID(1));
      }
      const variableOfDifferentiation = this.mapVariableNames(ctx.children[0].ID(2).toString());
      return `Derivative(${this.visit(ctx.children[0].expr())}, ${variableOfDifferentiation}, ${exp1}, evaluate=False)`;
    }
  }

  visitTrig(ctx) {
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
      trigFunctionName = "a" + trigFunctionName.slice(3);
    }

    return `${trigFunctionName}(${this.visit(ctx.expr())})`;
  }

  visitUnitExponent(ctx) {
    return `${this.visit(ctx.u_expr(0))}^${ctx.U_NUMBER().toString()}`;
  }

  visitUnitFractionalExponent(ctx) {
    let exponentValue;
    const u_fraction = ctx.u_fraction();

    if (u_fraction.U_ONE()) {
      exponentValue = 1/u_fraction.U_NUMBER();
    } else {
      exponentValue = u_fraction.U_NUMBER(0)/u_fraction.U_NUMBER(1);
    }

    return `${this.visit(ctx.u_expr(0))}^${exponentValue}`;
  }

  visitSqrt(ctx) {
    return `sqrt(${this.visit(ctx.expr())})`;
  }

  visitLn(ctx) {
    if (!ctx.BACK_SLASH()) {
      this.insertions.push({
        location: ctx.CMD_LN().parentCtx.start.column,
        text: '\\'
      })
    }
    return `log(${this.visit(ctx.expr())})`;
  }

  visitLog(ctx) {
    if (!ctx.BACK_SLASH()) {
      this.insertions.push({
        location: ctx.CMD_LOG().parentCtx.start.column,
        text: '\\'
      })
    }
    return `log(${this.visit(ctx.expr())},10)`;
  }

  visitAbs(ctx) {
    return `Abs(${this.visit(ctx.expr())})`;
  }

  visitUnaryMinus(ctx) {
    return `(-(${this.visit(ctx.expr())}))`;
  }

  visitBaseLog(ctx) {
    return `log(${this.visit(ctx.expr(1))},${this.visit(ctx.expr(0))})`;
  }

  visitUnitSqrt(ctx) {
    return `${this.visit(ctx.u_expr())}^.5`;
  }

  visitMultiply(ctx) {
    return `${this.visit(ctx.expr(0))}*${this.visit(ctx.expr(1))}`;
  }

  visitUnitMultiply(ctx) {
    return `${this.visit(ctx.u_expr(0))}*${this.visit(ctx.u_expr(1))}`;
  }

  visitDivide(ctx) {
    return `(${this.visit(ctx.expr(0))})/(${this.visit(ctx.expr(1))})`;
  }

  visitUnitDivide(ctx) {
    if (ctx.U_ONE()) {
      // (in/in) represents unitless instead of 1 since mathjs cannot properly parse 1
      return `(in/in)/(${this.visit(ctx.u_expr())})`;
    } else {
      return `(${this.visit(ctx.u_expr(0))})/(${this.visit(ctx.u_expr(1))})`;
    }
  }

  visitAdd(ctx) {
    return `${this.visit(ctx.expr(0))}+${this.visit(ctx.expr(1))}`;
  }

  visitUnitAdd(ctx) {
    return `${this.visit(ctx.u_expr(0))}+${this.visit(ctx.u_expr(1))}`;
  }

  visitSubtract(ctx) {
    return `${this.visit(ctx.expr(0))}-${this.visit(ctx.expr(1))}`;
  }

  visitUnitSubtract(ctx) {
    return `${this.visit(ctx.u_expr(0))}-${this.visit(ctx.u_expr(1))}`;
  }

  visitVariable(ctx) {
    const name = this.mapVariableNames(ctx.ID().toString());
    this.params.push(name);
    return name;
  }

  visitNumberWithUnits(ctx) {
    const newParamName = this.getNextParName();

    let param = { name: newParamName };

    let numWithUnits;
    let units;

    try {
      units = this.visit(ctx.u_block());
      numWithUnits = unit(
        bignumber(ctx.NUMBER().toString()),
        units
      );
      param.dimensions = numWithUnits.dimensions;
      param.si_value = numWithUnits.value.toString();
      param.units_valid = true;
    } catch (e) {
      param.units_valid = false;
      this.addParsingErrorMessage(`Unknown Dimension ${units}`);
    }

    this.implicitParams.push(param);
    this.params.push(param.name);

    return newParamName;
  }

  visitNumber(ctx) {
    return ctx.NUMBER().toString();
  }

  visitSubExpr(ctx) {
    return `(${this.visit(ctx.expr())})`;
  }

  visitUnitSubExpr(ctx) {
    return `(${this.visit(ctx.u_expr())})`;
  }

  visitUnitName(ctx) {
    return ctx.U_NAME().toString();
  }

  visitUnitBlock(ctx) {
    return this.visit(ctx.u_expr());
  }
}
