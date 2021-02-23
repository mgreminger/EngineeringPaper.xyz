import { unit } from 'mathjs';

import LatexParserVisitor from "./LatexParserVisitor.js";

export default class LatexToSympy extends LatexParserVisitor {

  constructor(equationIndex) {
    super();
    this.equationIndex = equationIndex;
    this.paramIndex = 0;
    this.paramPrefix = 'implicit_param_';
    this.implicitParams = [];
    this.dimError = false;
  }

  visitAssign(ctx) {
    this.lhs = ctx.ID();

    return this.visit(ctx.expr());
  }

  getNextParName() {
    return `${this.paramPrefix}${this.equationIndex}_${this.paramIndex++}`;
  }

  visitExponent(ctx){
    return `(${this.visit(ctx.expr(0))})**(${this.visit(ctx.expr(1))})`;
  }

  visitUnitExponent(ctx){
    return `${this.visit(ctx.u_expr(0))}^${this.visit(ctx.u_expr(1))}`;
  }

  visitSqrt(ctx){
    return `sqrt(${this.visit(ctx.expr())})`;
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
    return `(${this.visit(ctx.u_expr(0))})/(${this.visit(ctx.u_expr(1))})`;
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
    return ctx.ID();
  }

  visitNumberWithUnits(ctx) {
    const newParamName = this.getNextParName();

    let param = {name: newParamName}

    let numWithUnits;

    try {
      numWithUnits = unit(`${ctx.NUMBER()} ${this.visit(ctx.u_block())}`)
      param.dimensions = numWithUnits.dimensions;
      param.si_value = numWithUnits.value;
      param.units_valid = true;
    }
    catch(e) {
      param.units_valid = false;
      this.dimError = true;
    }

    return newParamName;
  }

  visitNumber(ctx) {
    return ctx.NUMBER();
  }

  visitSubExpr(ctx) {
    return `(${this.visit(ctx.expr())})`;
  }

  visitUnitSubExpr(ctx) {
    return `(${this.visit(ctx.u_expr())})`;
  }

  visitUnitName(ctx) {
    return ctx.U_NAME();
  }

  visitUnitBlock(ctx) {
    return this.visit(ctx.u_expr());
  }

} 
