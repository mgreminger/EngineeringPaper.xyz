import { unit } from 'mathjs';

import LatexParserVisitor from "./LatexParserVisitor.js";

export default class LatexToSympy extends LatexParserVisitor {

  constructor(equationIndex) {
    super();
    this.equationIndex = equationIndex;
    this.paramIndex = 0;
    this.paramPrefix = 'implicit_param_';
    this.implicitParams = [];
    this.params = [];
    this.dimError = false;
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
    
    query.lhs = ctx.ID();
    query.units = "";

    if(ctx.u_block()) {
      query.units = this.visit(ctx.u_block()).toString();
      try {
        const unitsCheck = unit(query.units);
        query.dimensions = unitsCheck.dimensions;
        query.units_valid = true;
      } catch(e) {
        this.dimError = true;
        query.units_valid = false;
      }
    }

    return query;
  }

  visitAssign(ctx) {
    const lhs = ctx.ID();

    const sympyExpression = this.visit(ctx.expr());

    return {type: "equation", lhs: lhs, sympy: sympyExpression,
            implicitParams: this.implicitParams, params: this.params};
  }

  getNextParName() {
    return `${this.paramPrefix}${this.equationIndex}_${this.paramIndex++}`;
  }

  visitExponent(ctx){
    return `(${this.visit(ctx.expr(0))})**(${this.visit(ctx.expr(1))})`;
  }

  visitUnitExponent(ctx){
    return `${this.visit(ctx.u_expr(0))}^${ctx.U_NUMBER()}`;
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
    const name = ctx.ID();
    this.params.push(name);
    return name;
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

    this.implicitParams.push(param);
    this.params.push(param.name);

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
