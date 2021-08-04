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
  }

  addParsingErrorMessage(newErrorMessage) {
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
    const query = { type: "query", isExponent: false };

    query.sympy = this.visit(ctx.expr());
    query.exponents = this.exponents;

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
        this.parsingError = true;
        this.addParsingErrorMessage(`Unknown Dimension ${query.units}`);
        query.units_valid = false;
      }
    }

    query.implicitParams = this.implicitParams;
    query.params = this.params;

    return query;
  }

  visitAssign(ctx) {
    const name = this.mapVariableNames(ctx.ID().toString());

    if (this.unassignable.has(name)) {
      this.parsingError = true; //cannot reassign e, pi, or i
      this.addParsingErrorMessage(`Attempt to reassign reserved variable name ${name}`);
    }

    const sympyExpression = this.visit(ctx.expr());

    return {
      type: "assignment",
      name: name,
      sympy: sympyExpression,
      implicitParams: this.implicitParams,
      params: this.params,
      exponents: this.exponents,
      isExponent: false,
    };
  }

  visitEquality(ctx) {

    const sympyExpression = `Eq(${this.visit(ctx.expr(0))},${this.visit(ctx.expr(1))})`;

    return {
      type: "equality",
      sympy: sympyExpression,
      implicitParams: this.implicitParams,
      params: this.params,
      exponents: this.exponents,
      isExponent: false,
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
      exponents: []
    });

    this.params.push(exponentVariableName);

    return `(${base})**(${exponentVariableName})`;
  }

  visitIndefiniteIntegral(ctx) {
    // check that differential symbol is d
    if (ctx.children[0].ID(0).toString() !== "d") {
      this.parsingError = true;
      this.addParsingErrorMessage(`Invalid differential symbol ${ctx.children[0].ID(0).toString()}`);
      return '';
    } else {
      const variableOfIntegration = this.mapVariableNames(ctx.children[0].ID(1).toString());
      return `Integral(${this.visit(ctx.children[0].expr())}, ${variableOfIntegration})`;
    }
  }

  visitIntegral(ctx) {
    // check that differential symbol is d
    if (ctx.children[0].ID(0).toString() !== "d") {
      this.parsingError = true;
      this.addParsingErrorMessage(`Invalid differential symbol ${ctx.children[0].ID(0).toString()}`);
      return '';
    } else {
      const variableOfIntegration = this.mapVariableNames(ctx.children[0].ID(1).toString());
      return `Integral(${this.visit(ctx.children[0].expr(2))}, (${variableOfIntegration}, ${this.visit(ctx.children[0].expr(0))}, ${this.visit(ctx.children[0].expr(1))}))`;
    }
  }

  visitDerivative(ctx) {
    // check that both differential symbols are both d
    if (ctx.children[0].ID(0).toString() !== "d" || ctx.children[0].ID(1).toString() !== "d") {
      this.parsingError = true;
      this.addParsingErrorMessage(`Invalid differential symbol combination ${ctx.children[0].ID(0).toString()} and ${ctx.children[0].ID(1).toString()}`);
      return '';
    } else {
      const variableOfDifferentiation = this.mapVariableNames(ctx.children[0].ID(2).toString());
      return `Derivative(${this.visit(ctx.children[0].expr())}, ${variableOfDifferentiation}, evaluate=False)`;
    }
  }

  visitNDerivative(ctx) {
    const exp1 = parseFloat(ctx.children[0].NUMBER(0).toString());
    const exp2 = parseFloat(ctx.children[0].NUMBER(1).toString());

    // check that both differential symbols are both d
    if (ctx.children[0].ID(0).toString() !== "d" || ctx.children[0].ID(1).toString() !== "d") {
      this.parsingError = true;
      this.addParsingErrorMessage(`Invalid differential symbol combination ${ctx.children[0].ID(0).toString()} and ${ctx.children[0].ID(1).toString()}`);
      return '';
    } else if (!Number.isInteger(exp1) || !Number.isInteger(exp1) || exp1 !== exp2) {
      this.parsingError = true;
      this.addParsingErrorMessage(`Invalid differential order combination ${exp1} and ${exp2}`);
      return '';
    } else if(exp1 <= 0) {
      this.parsingError = true;
      this.addParsingErrorMessage(`Invalid differential order ${exp1}`);
      return '';
    } else {
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
      this.parsingError = true;
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
