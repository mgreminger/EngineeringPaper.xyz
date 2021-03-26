import { unit, bignumber } from "mathjs";
import antlr4 from "antlr4";
import LatexParserVisitor from "./LatexParserVisitor.js";

// SymPy has many reserved names
// These will get remapped so the user can still use these as variable names
const reserved = new Set([
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
    this.dimError = false;
    this.assignError = false;
    this.exponents = [];

    this.reservedSuffix = "_variable";
    this.reserved = reserved;

    this.unassignable = unassignable;
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
    } else {
      return this.visit(ctx.query());
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
        this.dimError = true;
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
      this.assignError = true; //cannot reassign e, pi, or i
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

  visitPiExpr(ctx) {
    return "pi";
  }

  visitExponent(ctx) {
    const exponentVariableName = this.getNextExponentName();
    const base = this.visit(ctx.expr(0));
    const exponent = this.visit(ctx.expr(1));

    this.exponents.push({
      type: "assignment",
      name: exponentVariableName,
      sympy: exponent,
      params: this.params.filter((param) => param !== exponentVariableName),
      isExponent: true,
    });

    this.params.push(exponentVariableName);

    return `(${base})**(${exponentVariableName})`;
  }

  visitTrig(ctx) {
    let trigFunction = ctx.trig_function().children[0].toString().slice(1);
    if (trigFunction.startsWith("arc")) {
      trigFunction = "a" + trigFunction.slice(3);
    }

    return `${trigFunction}(${this.visit(ctx.expr())})`;
  }

  visitUnitExponent(ctx) {
    return `${this.visit(ctx.u_expr(0))}^${ctx.U_NUMBER().toString()}`;
  }

  visitSqrt(ctx) {
    return `sqrt(${this.visit(ctx.expr())})`;
  }

  visitLn(ctx) {
    return `log(${this.visit(ctx.expr())})`;
  }

  visitLog(ctx) {
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

    try {
      numWithUnits = unit(
        bignumber(ctx.NUMBER().toString()),
        this.visit(ctx.u_block())
      );
      param.dimensions = numWithUnits.dimensions;
      param.si_value = numWithUnits.value.toString();
      param.units_valid = true;
    } catch (e) {
      param.units_valid = false;
      this.dimError = true;
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
