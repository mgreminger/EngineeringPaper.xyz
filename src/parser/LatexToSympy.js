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
  "test",
  "rad",
  "deg",
  // special functions
  "DiracDelta",
  "Heaviside",
  "SingularityFunction",
  "gamma",
  "lowergamma",
  "uppergamma",
  "polygamma",
  "trigamma",
  "beta",
  "besselj",
  "besseli",
  "besselk",
  "airyai",
  "airybi",
  "airyprime",
  "airybiprime",
  "bspline_basis",
  "bspline_basis_set",
  "zeta",
  "dirichlet_eta",
  "lerchphi",
  "polylog",
  "hyper",
  "hyperexpand",
  "meijerg",
  "elliptic_k",
  "elliptic_f",
  "mathieus",
  "mathieuc",
  "mathieusprime",
  "mathieucprime",
  "gegenbauer",
  "chebyshevt_root",
  "chebyshevu",
  "chebyshevu_root",
  "legendre",
  "assoc_legendre",
  "hermite",
  "laguerre",
  "assoc_laguerre",
  "jacobi_poly",
  "gegenbauer_poly",
  "chebyshevt_poly",
  "chebyshevu_poly",
  "hermite_poly",
  "legendre_poly",
  "laguerre_poly",
  "Ynm",
  "Ynm_c",
  "Znm",
  "Eijk",
  "LeviCivita",
  "bell",
  "bernoulli",
  "catalan",
  "euler",
  "fibonacci",
  "harmonic",
  "lucas",
  "genocchi",
  "partition",
  "tribonacci"
]);

const greekChars = new Set(['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta',
                            'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu',
                            'xi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi',
                            'psi', 'omega', 'Gamma', 'Delta', 'Theta', 'Lambda',
                            'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega']);

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
  constructor(sourceLatex, equationIndex, equationSubIndex = 0, isPlot = false) {
    super();
    this.sourceLatex = sourceLatex;
    this.equationIndex = equationIndex;
    this.equationSubIndex = equationSubIndex;
    this.isPlot = isPlot;

    this.paramIndex = 0;
    this.paramPrefix = "implicit_param__";

    this.exponentIndex = 0;
    this.exponentPrefix = "exponent__";
    this.implicitParams = [];

    this.params = [];
    this.parsingError = false;
    this.parsingErrorMessage = '';
    this.exponents = [];

    this.reservedSuffix = "_as_variable";
    this.reserved = reserved;
    this.greekChars = greekChars;

    this.unassignable = unassignable;

    this.insertions = [];

    this.rangeCount = 0;
    this.functions = [];
    this.functionIndex = 0;
    this.functionPrefix = "function__";

    this.arguments = [];
    this.localSubs = [];
    this.argumentIndex = 0;
    this.argumentPrefix = "argument__";
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
    return `${this.paramPrefix}${this.equationIndex}_${this.equationSubIndex}_${this.paramIndex++}`;
  }

  getNextExponentName() {
    return `${this.exponentPrefix}${this.equationIndex}_${this.equationSubIndex}_${this
      .exponentIndex++}`;
  }

  getNextFunctionName() {
    return `${this.functionPrefix}${this.equationIndex}_${this.equationSubIndex}_${this
      .functionIndex++}`;
  }

  getNextArgumentName() {
    return `${this.argumentPrefix}${this.equationIndex}_${this.equationSubIndex}_${this
      .argumentIndex++}`;
  }

  visitId(ctx) {
    let name = ctx.ID().toString();

    if (!name.startsWith('\\') && this.greekChars.has(name.split('_')[0])) {
      // need to insert slash before variable that is a greek variable
      this.insertions.push({
        location: ctx.ID().symbol.start,
        text: "\\"
      });
    }

    name = name.replaceAll(/{|}|\\/g, '');

    return this.mapVariableNames(name);
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
                    isFunction: false,
                    isUnitsQuery: false,
                    id: this.equationIndex,
                    subId: this.equationSubIndex,
                    isFromPlotCell: this.isPlot
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
    } else if (this.rangeCount === 1) {
      query.isRange = true;
      query.numPoints = 50;
      const rangeFunction = this.functions.filter(value => value.isRange)[0];
      if (rangeFunction.name !== query.sympy) {
        this.addParsingErrorMessage(`Range may only be specified at top level function.`)
      } else {
        query.freeParameter = rangeFunction.freeParameter;
        query.lowerLimitArgument = rangeFunction.lowerLimitArgument;
        query.lowerLimitInclusive = rangeFunction.lowerLimitInclusive;
        query.upperLimitArgument = rangeFunction.upperLimitArgument;
        query.upperLimitInclusive = rangeFunction.upperLimitInclusive;
        query.unitsQueryFunction = rangeFunction.unitsQueryFunction;
        query.input_units = this.input_units;
        query.outputName = rangeFunction.sympy;
      }
    } else {
      query.isRange = false
    }

    return query;
  }

  visitAssign(ctx) {
    const name = this.visit(ctx.id());

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
      isFunction: false,
      id: this.equationIndex,
      subId: this.equationSubIndex,
      isFromPlotCell: this.isPlot,
      isRange: false
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
      isFunction: false,
      id: this.equationIndex,
      subId: this.equationSubIndex,
      isFromPlotCell: this.isPlot,
      isRange: false
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

    const variableName = this.visit(ctx.id());
    const newArguments = [];

    let inputUnitsParameter;
    let i = 0;
    while (ctx.expr(i)) {
      const argumentName = this.getNextArgumentName();
      const paramCursor = this.params.length;
      const exponentCursor = this.exponents.length;
      const expression = this.visit(ctx.expr(i));

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
      });

      if (i === 0) {
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
      newSubs[0].isRange = true;
      newSubs[0].isLowerLimit = true;
      newSubs[0].isInclusiveLimit = ctx.lower.text === "<" ? false : true;
      newSubs[1].isRange = true;
      newSubs[1].isLowerLimit = false;
      newSubs[1].isInclusiveLimit = ctx.upper.text === "<" ? false : true;


      newArguments[0].isUnitsQuery = false;
      newArguments[0].isRange = false;
      
      newArguments[1].isUnitsQuery = false;
      newArguments[1].isRange = false;

      this.arguments.push({...newArguments[0]}); // still an assignment, needed for unitsQueryFunction
                                                 // need to copy since type changed to query below

      newArguments[0].type = "query";
      newArguments[1].type = "query";
      this.arguments.push(...newArguments);

      this.input_units = inputUnitsParameter ? inputUnitsParameter.units : "";
    }

    return newSubs;
  }

  visitFunction(ctx) {
    const functionName = this.getNextFunctionName();
    const variableName = this.visit(ctx.id());
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

    this.localSubs.push(...functionLocalSubs.filter(value => !value.isRange));

    if ((new Set(parameters)).size < parameters.length) {
      this.addParsingErrorMessage('Paremeter name repeated in function call.');
    }

    const rangeParameters = functionLocalSubs.filter(value => value.isRange);

    const currentFunction = {
      type: "assignment",
      name: functionName,
      sympy: variableName,
      params: [variableName],
      isExponent: false,
      isFunctionArgument: false,
      isFunction: true,
      isRange: rangeParameters.length === 2,
      exponents: [],
      functionParameters: parameters
    };

    if (currentFunction.isRange) {
      const lowerLimitArg = rangeParameters.filter(value => value.isLowerLimit)[0];
      const upperLimitArg = rangeParameters.filter(value => !value.isLowerLimit)[0];
      currentFunction.freeParameter = lowerLimitArg.parameter;
      currentFunction.lowerLimitArgument = lowerLimitArg.argument;
      currentFunction.lowerLimitInclusive = lowerLimitArg.isInclusiveLimit;
      currentFunction.upperLimitArgument = upperLimitArg.argument;
      currentFunction.upperLimitInclusive = upperLimitArg.isInclusiveLimit;

      // create a two new functions (one a query of the other) that will have all of the 
      // local subs (including range lower limit), used to establish the output units of the range
      const unitsFunction = {
        type: "assignment",
        name: this.getNextFunctionName(),
        sympy: variableName,
        params: [variableName],
        isExponent: false,
        isFunctionArgument: false,
        isFunction: true,
        isRange: false,
        exponents: [],
        functionParameters: parameters
      };

      const unitsQuery = {
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

      currentFunction.unitsQueryFunction = unitsFunction.name;

      this.functions.push(unitsFunction, unitsQuery);

      const unitsFunctionLocalSubs = functionLocalSubs.filter(sub => !sub.isRange)
                                                      .map(sub => { return {...sub}})
      unitsFunctionLocalSubs.push(lowerLimitArg)
      unitsFunctionLocalSubs.forEach( sub => sub.function = unitsFunction.name);
      this.localSubs.push(...unitsFunctionLocalSubs);
    }

    this.functions.push(currentFunction);

    this.params.push(functionName);

    return functionName;
  }

  visitIndefiniteIntegral(ctx) {
    // check that differential symbol is d
    const diffSymbol = this.visit(ctx.children[0].id(0));
    if (diffSymbol !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol ${diffSymbol}`);
      return '';
    } else {
      if (!ctx.children[0].CMD_MATHRM()) {
        this.insertTokenCommand('mathrm', ctx.children[0].id(0).children[0]);
      }
      const variableOfIntegration = this.mapVariableNames(this.visit(ctx.children[0].id(1)));
      return `Integral(${this.visit(ctx.children[0].expr())}, ${variableOfIntegration})`;
    }
  }

  visitIntegral(ctx) {
    // check that differential symbol is d
    const diffSymbol = this.visit(ctx.children[0].id(0));
    if (diffSymbol !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol ${diffSymbol}`);
      return '';
    } else {
      if (!ctx.children[0].CMD_MATHRM()) {
        console.log(ctx.children[0].id(0));
        this.insertTokenCommand('mathrm', ctx.children[0].id(0).children[0]);
      }
      const variableOfIntegration = this.mapVariableNames(this.visit(ctx.children[0].id(1)));
      return `Integral(${this.visit(ctx.children[0].expr(2))}, (${variableOfIntegration}, ${this.visit(ctx.children[0].expr(0))}, ${this.visit(ctx.children[0].expr(1))}))`;
    }
  }

  visitDerivative(ctx) {
    // check that both differential symbols are both d
    const diffSymbol1 = this.visit(ctx.children[0].id(0));
    const diffSymbol2 = this.visit(ctx.children[0].id(1)); 
    if (diffSymbol1 !== "d" || diffSymbol2 !== "d") {
      this.addParsingErrorMessage(`Invalid differential symbol combination ${diffSymbol1} and ${diffSymbol2}`);
      return '';
    } else {
      if (!ctx.children[0].MATHRM_0) {
        this.insertTokenCommand('mathrm', ctx.children[0].id(0).children[0]);
      }
      if (!ctx.children[0].MATHRM_1) {
        this.insertTokenCommand('mathrm', ctx.children[0].id(1).children[0]);
      }
      const variableOfDifferentiation = this.mapVariableNames(this.visit(ctx.children[0].id(2)));
      return `Derivative(${this.visit(ctx.children[0].expr())}, ${variableOfDifferentiation}, evaluate=False)`;
    }
  }

  visitNDerivative(ctx) {
    const exp1 = parseFloat(ctx.children[0].NUMBER(0).toString());
    const exp2 = parseFloat(ctx.children[0].NUMBER(1).toString());

    const diffSymbol1 = this.visit(ctx.children[0].id(0));
    const diffSymbol2 = this.visit(ctx.children[0].id(1));

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
      if (!ctx.children[0].MATHRM_0) {
        this.insertTokenCommand('mathrm', ctx.children[0].id(0).children[0]);
      }
      if (!ctx.children[0].MATHRM_1) {
        this.insertTokenCommand('mathrm', ctx.children[0].id(1).children[0]);
      }
      const variableOfDifferentiation = this.mapVariableNames(this.visit(ctx.children[0].id(2)));
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
    if (!ctx.CMD_LOG_WITH_SLASH()) {
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
    const name = this.visit(ctx.id());
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
      param.units = units;
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
