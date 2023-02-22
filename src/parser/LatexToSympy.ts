import { unit, bignumber } from "mathjs";
import antlr4 from "antlr4";
import LatexParserVisitor from "./LatexParserVisitor.js";

// SymPy has many reserved names
// These will get remapped so the user can still use these as variable names
const reserved = new Set([
  // trig functions that don't match the latex names (or don't have latex versions)
  "asin", "acos", "atan", "acot", "asec", "acsc", "atan2", "sech", "csch",
  "asinh", "acosh", "atahn", "acoth", "asech", "acsch",
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
  "tribonacci",
  // elementary functions
  "re",
  "im",
  "sign",
  "Abs",
  "arg",
  "conjugate",
  "polar_lift",
  "periodic_argument",
  "principal_branch",
  "sinc",
  "ceiling",
  "floor",
  "frac",
  "exp",
  "LambertW",
  "exp_polar",
  "Piecewise",
  "piecewise_fold",
  "Id",
  "Identity",
  "Min",
  "min",
  "Max",
  "max",
  "root",
  "sqrt",
  "cbrt",
  "real_root",
  // Python reserved words
  "False", "class", "from", "or",
  "None", "continue", "global", "pass",
  "True", "def", "if", "raise",
  "and", "del", "import", "return",
  "as", "elif", "in", "try", 
  "assert", "else", "is", "while", 
  "async", "except", "lambda", "with", 
  "await", "finally", "nonlocal", "yield",
  "break", "for", "not",
  // reserved chars
  "Q", "O"
]);

const greekChars = new Set(['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta',
                            'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu',
                            'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi',
                            'psi', 'omega', 'Gamma', 'Delta', 'Theta', 'Lambda',
                            'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega']);

const unassignable = new Set(["I", "E", "pi"]);

const builtinFunctionMap = new Map([
  ['max', '_Max'], 
  ['min', '_Min'],
  ['real', '_re'],
  ['imag', '_im'],
  ['conj', '_conjugate'],
  ['angle', '_arg']
]);

const comparisonMap = new Map([
  ["<",  "_StrictLessThan"],
  ["\\le", "_LessThan"],
  [">",  "_StrictGreaterThan"],
  ["\\ge",  "_GreaterThan"]
])

const unitsWithOffset = new Set(['degC', 'degF', 'celsius', 'fahrenheit']);

const typeParsingErrors = {
  math: "This field must contain an assignment (e.g., x=y*z) or a query (e.g., x=). To delete an unwanted math cell, click the trash can on the right.",
  plot: "This field must contain a function query with an input parameter range such as y(-10≤x≤10)=",
  parameter: "A variable name is required in this field.",
  units: "This field may only contain units in square brackets or may be left blank to indicate no units.",
  expression: "This field may only contain a valid expression or number without an equals sign or it may be blank.",
  expression_no_blank: "This field may only contain a valid expression or number without an equals sign.",
  number: "This field may only contain a number since units are specified for this column.",
  condition: "This field may only contain a condition statement such as x>1. The expression corresponding to the first satisfied condition will be used.",
  piecewise: "Syntax Error",
  equality: "An equation is required in this field.",
  id_list: "A variable name, or a list of variable names separated by commas, is required in this field (x,y for example). If a numerical solve is required, the variables must be given initial guess values with a tilde (x~1, y~2, for example).", 
};

function checkUnits(units) {
  let dimensions;
  let unitsValid;
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
  constructor(sourceLatex, equationIndex, equationSubIndex = 0, type = "math") {
    super();
    this.sourceLatex = sourceLatex;
    this.equationIndex = equationIndex;
    this.equationSubIndex = equationSubIndex;
    this.type = type;

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
    this.rangeNumPoints = 51;

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


  visitId_list(ctx) {
    const ids = [];
    let i = 0;

    while (ctx.id(i)) {
      ids.push(this.visit(ctx.id(i)));
      i++;
    }

    return {ids: ids, numericalSolve: false};
  }


  visitGuess_list(ctx) {
    const statements = [];
    const ids = [];
    const guesses = [];
    let i = 0;

    while (ctx.guess(i)) {
      const newStatement = this.visit(ctx.guess(i));
      statements.push(newStatement);
      ids.push(newStatement.name);
      guesses.push(newStatement.guess);
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
      ids: ids,
      numericalSolve: true,
      guesses: guesses,
      statements: statements
    };
  }


  visitGuess(ctx) {
    if (!ctx.id()) {
      //user is trying to assign to pi
      this.addParsingErrorMessage(`Attempt to reassign reserved value pi`);
      return {};
    }

    const name = this.visit(ctx.id());

    if (this.unassignable.has(name)) {
      //cannot reassign e, pi, or i
      this.addParsingErrorMessage(`Attempt to reassign reserved variable name ${name}`);
    }

    let sympyExpression;
    let guess;

    if (ctx.number()) {
      sympyExpression = this.visit(ctx.number());
      guess = parseFloat(sympyExpression);
    } else {
      sympyExpression = this.visit(ctx.number_with_units());
      guess = this.implicitParams.slice(-1)[0].si_value;
    }

    return {
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
      subId: this.equationSubIndex,
      isFromPlotCell: this.type === "plot",
      isRange: false
    };
  }


  visitStatement(ctx) {
    if (ctx.assign()) {
      if (this.type === "math") {
        return this.visit(ctx.assign());
      } else if (this.type === "equality") {
        const sympy = this.visit(ctx.assign());
        if (this.functions.length > 0) {
          this.addParsingErrorMessage('Function syntax is not allowed in a System Solve Cell.')
          return {};
        } else {
          return sympy;
        }
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.query()) {
      if (this.type === "math" || this.type === "plot") {
        return this.visit(ctx.query());
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.equality()) {
      if (this.type === "equality") {
        const sympy = this.visit(ctx.equality())
        if (this.functions.length > 0) {
          this.addParsingErrorMessage('Function syntax is not allowed in a System Solve Cell.')
          return {};
        } else {
          return sympy;
        }
      } else if (this.type === "math") {
        this.addParsingErrorMessage('Equality statements are no longer allowed in math cells, use a System Solve Cell instead.');
        return {};
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.u_block()) {
      if (this.type === "units") {
        const units = this.visit(ctx.u_block());
        const { unitsValid } = checkUnits(units);
        if (!unitsValid) {
          this.addParsingErrorMessage(`Unknown Dimension ${units}`);
        }
        // nothing needed in return statement for tables
        return {};
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.expr()) {
      if (this.type === "expression" || this.type === "expression_no_blank") {
        return this.visit(ctx.expr());
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.number()) {
      if (this.type === "number" || this.type === "expression" || this.type === "expression_no_blank") {
        return this.visit(ctx.number());
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.id()) {
      if (this.type === "parameter" || this.type === "expression" || this.type === "expression_no_blank" ) {
        return this.visit(ctx.id());
      } else if (this.type === "id_list") {
        return {ids: [this.visit(ctx.id()),], numericalSolve: false};
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.id_list()) {
      if (this.type === "id_list") {
        return this.visit(ctx.id_list());
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.guess_list()) {
      if (this.type === "id_list") {
        return this.visit(ctx.guess_list());
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.guess()) {
      if (this.type === "id_list") {
        const guessStatement = this.visit(ctx.guess());
        return {
          ids: [guessStatement.name],
          numericalSolve: true,
          guesses: [guessStatement.guess],
          statements: [guessStatement]
        };
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.condition()) {
      if (this.type === "condition") {
        return this.visit(ctx.condition());
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else if (ctx.piecewise_assign()) {
      if (this.type === "piecewise") {
        return this.visit(ctx.piecewise_assign());
      } else {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      }
    } else {
      // this is a blank expression, check if this is okay or should generate an error
      if ( ["math", "plot", "parameter", "expression_no_blank",
            "condition", "equality", "id_list"].includes(this.type) ) {
        this.addParsingErrorMessage(typeParsingErrors[this.type]);
        return {};
      } else {
        // blank is fine, return blank object for statement
        return {
          type: "blank"
        };
      }
    }
  }

  visitQuery(ctx) {
    const query = { type: "query",
                    isExponent: false,
                    isFunctionArgument: false,
                    isFunction: false,
                    isUnitsQuery: false,
                    isEqualityUnitsQuery: false,
                    subId: this.equationSubIndex,
                    isFromPlotCell: this.type === "plot"
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
      const { dimensions, unitsValid } = checkUnits(query.units);
      if (unitsValid) {
        query.dimensions = dimensions;
        query.units_valid = true;
      } else {
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
      query.numPoints = this.rangeNumPoints;
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
    if (!ctx.id()) {
      //user is trying to assign to pi
      this.addParsingErrorMessage(`Attempt to reassign reserved value pi`);
      return {};
    }

    const name = this.visit(ctx.id());

    if (this.unassignable.has(name)) {
      //cannot reassign e, pi, or i
      this.addParsingErrorMessage(`Attempt to reassign reserved variable name ${name}`);
    }

    const sympyExpression = this.visit(ctx.expr());

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
        subId: this.equationSubIndex,
        isFromPlotCell: this.type === "plot",
        isRange: false
      };
    }
  }

  visitEquality(ctx) {
    const lhs = this.visit(ctx.expr(0));
    const rhs = this.visit(ctx.expr(1));

    return this.getEqualityStatement(lhs, rhs);
  }

  getEqualityStatement(lhs, rhs) {
    if (this.rangeCount > 0) {
      this.addParsingErrorMessage('Ranges may not be used in System Solve Cells.');
    }

    const rhsUnitsQuery = {
      type: "query",
      isExponent: false,
      isFunctionArgument: false,
      isFunction: false,
      isUnitsQuery: false,
      isEqualityUnitsQuery: true,
      subId: this.equationIndex,
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
      subId: this.equationSubIndex,
      isFromPlotCell: this.type === "plot",
      isRange: false,
      equalityUnitsQueries: [lhsUnitsQuery, rhsUnitsQuery]
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
    const initialParamCursor = this.params.length;
    const initialExponentCursor = this.exponents.length;
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
      newSubs[0].isRange = true;
      newSubs[0].isLowerLimit = true;
      newSubs[0].isInclusiveLimit = ctx.lower.text === "<" ? false : true;
      newSubs[1].isRange = true;
      newSubs[1].isLowerLimit = false;
      newSubs[1].isInclusiveLimit = ctx.upper.text === "<" ? false : true;

      const unitQueryArgument = {...newArguments[0]}  // still an assignment, needed for unitsQueryFunction
                                                      // need to copy since newArguments[0] type changed to query below
      // Since this assignment is only used for unit checking, the lower limit is used
      if (isNaN(newArguments[0].sympy)) {
        unitQueryArgument.sympy = newArguments[0].sympy;
      } else {
        // numerical lower limit without units, replace with unitless implicit param to prevent cancelling
        unitQueryArgument.sympy = this.getUnitlessImplicitParam();
      }
      
      unitQueryArgument.params = [...this.params.slice(initialParamCursor)];
      unitQueryArgument.exponents = [...this.exponents.slice(initialExponentCursor)];
      
      this.arguments.push(unitQueryArgument); 
                                                 

      newArguments[0].type = "query";
      newArguments[0].isUnitsQuery = false;
      newArguments[0].isRange = false;

      newArguments[1].type = "query";
      newArguments[1].isUnitsQuery = false;
      newArguments[1].isRange = false;

      this.arguments.push(...newArguments);

      this.input_units = inputUnitsParameter ? inputUnitsParameter.units : "";
    }

    return newSubs;
  }

  visitBuiltinFunction(ctx) {
    let functionName = this.visit(ctx.id());

    if (functionName.endsWith(this.reservedSuffix)) {
      functionName = functionName.replace(this.reservedSuffix, "");
    }

    if (!builtinFunctionMap.has(functionName)) {
      this.addParsingErrorMessage(`Unrecognized built-in function ${functionName}`);
      return '';
    } else {
      if (!ctx.CMD_MATHRM()) {
        this.insertTokenCommand('mathrm', ctx.id().children[0]);
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

      return `${builtinFunctionMap.get(functionName)}(${argumentString})`;
    }
  }

  visitFunction(ctx) {
    const functionName = this.getNextFunctionName();
    const variableName = this.visit(ctx.id(0));
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

      if (ctx.points_id_0) {
        if (! (ctx.points_id_0.text === "with" && ctx.points_id_1.text === "points")) {
          this.addParsingErrorMessage(`Unrecognized keyword combination ${ctx.points_id_0.text} and ${ctx.points_id_1.text}`);
        }

        const numPoints = parseFloat(this.visit(ctx.num_points));

        if (!Number.isInteger(numPoints)) {
          this.addParsingErrorMessage('Number of range points must be an integer.');
        } else if (numPoints < 2) {
          this.addParsingErrorMessage('Number of range points must be 2 or greater.');
        } else {
          this.rangeNumPoints = numPoints;
        }
      }

    } else if (ctx.points_id_0) {
      this.addParsingErrorMessage('Invalid syntax, cannot specify number of points for function without range parameter.');
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
    const exp1 = parseFloat(this.visit(ctx.children[0].number(0)));
    const exp2 = parseFloat(this.visit(ctx.children[0].number(1)));

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
      trigFunctionName = "_a" + trigFunctionName.slice(3);
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
    return `_Abs(${this.visit(ctx.expr())})`;
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

  visitNumber_with_units(ctx) {
    const newParamName = this.getNextParName();

    let param = { name: newParamName };

    let numWithUnits;
    let units;

    try {
      units = this.visit(ctx.u_block());
      numWithUnits = unit(
        bignumber(this.visit(ctx.number())),
        units
      );
      param.units = units;
      param.dimensions = numWithUnits.dimensions;
      if (unitsWithOffset.has(units)) {
        // temps with offset need special handling 
        param.si_value = numWithUnits.toNumber('K');
      } else {
        param.si_value = numWithUnits.value.toString();
      }
      param.units_valid = true;
    } catch (e) {
      param.units_valid = false;
      this.addParsingErrorMessage(`Unknown Dimension ${units}`);
    }

    this.implicitParams.push(param);
    this.params.push(param.name);

    return newParamName;
  }

  getUnitlessImplicitParam(value=1) {
    const newParamName = this.getNextParName();

    const units = 'm/m';
    const mathjsUnits = unit(units);

    let param = {
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

  visitNumber(ctx) {
    if (!ctx.SUB()) {
      return ctx.NUMBER().toString();
    } else {
      return `-${ctx.NUMBER().toString()}`;
    }
  }

  visitNumberExpr(ctx) {
    return this.visit(ctx.number());
  }

  visitNumberWithUnitsExpr(ctx) {
    return this.visit(ctx.number_with_units());
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

  visitCondition_single(ctx) {
    return `${comparisonMap.get(ctx.operator.text)}(${this.visit(ctx.expr(0))}, ${this.visit(ctx.expr(1))})`;
  }

  visitCondition_chain(ctx) {
    const exp0 = this.visit(ctx.expr(0));
    const exp1 = this.visit(ctx.expr(1));
    const exp2 = this.visit(ctx.expr(2));

    const comparison1 = `${comparisonMap.get(ctx.lower.text)}(${exp0}, ${exp1})`;
    const comparison2 = `${comparisonMap.get(ctx.upper.text)}(${exp1}, ${exp2})`;
    return `_And(${comparison1}, ${comparison2})`;
  }

  visitCondition(ctx) {
    if (ctx.condition_single()) {
      return this.visit(ctx.condition_single());
    } else {
      return this.visit(ctx.condition_chain());
    }
  }

  visitPiecewise_arg(ctx) {
    return `(${this.visit(ctx.expr())}, ${this.visit(ctx.condition())})`;
  }

  visitPiecewise_assign(ctx) {
    if (!ctx.id()) {
      //user is trying to assign to pi
      this.addParsingErrorMessage(`Attempt to reassign reserved value pi`);
      return {};
    }

    const name = this.visit(ctx.id(0));

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
      subId: this.equationSubIndex,
      isFromPlotCell: false,
      isRange: false
    };
  }
}
