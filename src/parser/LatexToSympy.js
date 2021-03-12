import { unit } from 'mathjs';
import antlr4 from "antlr4";
import LatexParserVisitor from "./LatexParserVisitor.js";

export class LatexErrorListener extends antlr4.error.ErrorListener {
  constructor() {
    super();
    this.count = 0;
  }
  syntaxError(recognizer, offendingSymbol,
              line, charPositionInLine,
              msg, e)
  {
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
    this.paramPrefix = 'implicit_param_';
    this.implicitParams = [];
    this.params = [];
    this.dimError = false;
    this.assignError = false;
  }

  mapVariableNames(name) {
    if(name === 'e') {
      return 'E'; // always recognize lowercase e as Euler's number (E in sympy)
    } else if(name === 'E') {
      return 'E_variable'; // sympy maps E to Euler's number so we need to rename it
    } else {
      return name;
    }
  }

  getNextParName() {
    return `${this.paramPrefix}${this.equationIndex}_${this.paramIndex++}`;
  }

  visitStatement(ctx) {
    if(ctx.assign()) {
      return this.visit(ctx.assign());
    } else {
      return this.visit(ctx.query());
    }
  }

  visitQuery(ctx) {
    const query = {type: "query"};
    
    query.sympy = this.visit(ctx.expr());
    query.units = "";

    const u_block = ctx.u_block();

    if(u_block) {
      query.units = this.visit(u_block);
      query.unitsLatex = `\\left${this.sourceLatex.slice(u_block.start.column, u_block.stop.column+1)}`;
      try {
        const unitsCheck = unit(query.units);
        query.dimensions = unitsCheck.dimensions;
        query.units_valid = true;
      } catch(e) {
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

    if (name === 'E') {
      this.assignError = true;  //cannot reasign Euler's constant (user typed lowercase e)
    }

    const sympyExpression = this.visit(ctx.expr());

    return {type: "assignment", name: name, sympy: sympyExpression,
            implicitParams: this.implicitParams, params: this.params};
  }

  visitPiExpr(ctx) {
    return 'pi';
  }

  visitExponent(ctx){
    return `(${this.visit(ctx.expr(0))})**(${this.visit(ctx.expr(1))})`;
  }

  visitTrig(ctx){
    let trigFunction = ctx.trig_function().children[0].toString().slice(1);
    if (trigFunction.startsWith('arc')) {
      trigFunction = 'a' + trigFunction.slice(3);
    }

    return `${trigFunction}(${this.visit(ctx.expr())})`;
  }

  visitUnitExponent(ctx){
    return `${this.visit(ctx.u_expr(0))}^${ctx.U_NUMBER().toString()}`;
  }

  visitSqrt(ctx){
    return `sqrt(${this.visit(ctx.expr())})`;
  }

  visitLn(ctx){
    return `log(${this.visit(ctx.expr())})`
  }

  visitLog(ctx){
    return `log(${this.visit(ctx.expr())},10)`
  }

  visitAbs(ctx){
    return `Abs(${this.visit(ctx.expr())})`
  }

  visitUnaryMinus(ctx) {
    return `(-(${this.visit(ctx.expr())}))`
  }

  visitBaseLog(ctx){
    return `log(${this.visit(ctx.expr(1))},${this.visit(ctx.expr(0))})`
  }

  visitUnitSqrt(ctx){
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

    let param = {name: newParamName}

    let numWithUnits;

    try {
      numWithUnits = unit(`${ctx.NUMBER().toString()} ${this.visit(ctx.u_block())}`)
      param.dimensions = numWithUnits.dimensions;
      param.si_value = numWithUnits.value.toString();
      param.units_valid = true;
    }
    catch(e) {
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
