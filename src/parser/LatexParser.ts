// @ts-nocheck
// Generated from LatexParser.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import LatexParserVisitor from "./LatexParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class LatexParser extends Parser {
	public static readonly L_BRACKET = 1;
	public static readonly ALT_L_BRACKET = 2;
	public static readonly SEMICOLON = 3;
	public static readonly L_BRACE = 4;
	public static readonly R_BRACE = 5;
	public static readonly L_PAREN = 6;
	public static readonly R_PAREN = 7;
	public static readonly VBAR = 8;
	public static readonly UNDERSCORE = 9;
	public static readonly PI = 10;
	public static readonly CMD_INT = 11;
	public static readonly CMD_INT_UNDERSCORE = 12;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER = 13;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_ID = 14;
	public static readonly CMD_MATHRM = 15;
	public static readonly CMD_FRAC = 16;
	public static readonly CMD_FRAC_INTS = 17;
	public static readonly CMD_CDOT = 18;
	public static readonly CMD_TIMES = 19;
	public static readonly CMD_SQRT = 20;
	public static readonly CMD_SQRT_INT = 21;
	public static readonly CMD_SIM = 22;
	public static readonly CMD_APPROX = 23;
	public static readonly TRANSPOSE = 24;
	public static readonly BACKSLASH = 25;
	public static readonly CMD_SIN = 26;
	public static readonly CMD_COS = 27;
	public static readonly CMD_TAN = 28;
	public static readonly CMD_COT = 29;
	public static readonly CMD_SEC = 30;
	public static readonly CMD_CSC = 31;
	public static readonly CMD_ARCSIN = 32;
	public static readonly CMD_ARCCOS = 33;
	public static readonly CMD_ARCTAN = 34;
	public static readonly CMD_SINH = 35;
	public static readonly CMD_COSH = 36;
	public static readonly CMD_TANH = 37;
	public static readonly CMD_COTH = 38;
	public static readonly CMD_LN = 39;
	public static readonly CMD_LOG = 40;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 41;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER = 42;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID = 43;
	public static readonly COMMENT = 44;
	public static readonly CMD_LEFT = 45;
	public static readonly CMD_RIGHT = 46;
	public static readonly DOUBLE_DOLLAR_SIGN = 47;
	public static readonly ADD = 48;
	public static readonly SUB = 49;
	public static readonly CARET = 50;
	public static readonly EQ = 51;
	public static readonly LT = 52;
	public static readonly GT = 53;
	public static readonly LTE = 54;
	public static readonly GTE = 55;
	public static readonly COMMA = 56;
	public static readonly CARET_SINGLE_CHAR_NUMBER = 57;
	public static readonly CARET_SINGLE_CHAR_ID = 58;
	public static readonly NUMBER = 59;
	public static readonly BEGIN_MATRIX = 60;
	public static readonly END_MATRIX = 61;
	public static readonly AMPERSAND = 62;
	public static readonly DOUBLE_BACKSLASH = 63;
	public static readonly UNDERSCORE_SUBSCRIPT = 64;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 65;
	public static readonly ID = 66;
	public static readonly WS = 67;
	public static readonly SLASH_SPACE = 68;
	public static readonly SLASH_COLON = 69;
	public static readonly ERROR_CHAR = 70;
	public static readonly R_BRACKET = 71;
	public static readonly ALT_R_BRACKET = 72;
	public static readonly U_CMD_FRAC = 73;
	public static readonly U_CMD_FRAC_INTS = 74;
	public static readonly U_CMD_CDOT = 75;
	public static readonly U_CMD_TIMES = 76;
	public static readonly U_CMD_SQRT = 77;
	public static readonly U_COMMA = 78;
	public static readonly U_CARET = 79;
	public static readonly U_NAME = 80;
	public static readonly U_L_PAREN = 81;
	public static readonly U_R_PAREN = 82;
	public static readonly U_L_BRACE = 83;
	public static readonly U_R_BRACE = 84;
	public static readonly U_ONE = 85;
	public static readonly U_NUMBER = 86;
	public static readonly U_CMD_LEFT = 87;
	public static readonly U_CMD_RIGHT = 88;
	public static readonly U_WS = 89;
	public static readonly U_SLASH_SPACE = 90;
	public static readonly U_ERROR_CHAR = 91;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_statement = 0;
	public static readonly RULE_insert_matrix = 1;
	public static readonly RULE_id = 2;
	public static readonly RULE_number = 3;
	public static readonly RULE_number_with_units = 4;
	public static readonly RULE_assign = 5;
	public static readonly RULE_assign_list = 6;
	public static readonly RULE_assign_plus_query = 7;
	public static readonly RULE_query = 8;
	public static readonly RULE_equality = 9;
	public static readonly RULE_piecewise_assign = 10;
	public static readonly RULE_piecewise_arg = 11;
	public static readonly RULE_trig_function = 12;
	public static readonly RULE_indefinite_integral_cmd = 13;
	public static readonly RULE_integral_cmd = 14;
	public static readonly RULE_derivative_cmd = 15;
	public static readonly RULE_n_derivative_cmd = 16;
	public static readonly RULE_argument = 17;
	public static readonly RULE_condition = 18;
	public static readonly RULE_id_list = 19;
	public static readonly RULE_guess = 20;
	public static readonly RULE_guess_list = 21;
	public static readonly RULE_condition_single = 22;
	public static readonly RULE_condition_chain = 23;
	public static readonly RULE_matrix_row = 24;
	public static readonly RULE_expr = 25;
	public static readonly RULE_u_block = 26;
	public static readonly RULE_u_insert_matrix = 27;
	public static readonly RULE_u_fraction = 28;
	public static readonly RULE_u_expr = 29;
	public static readonly literalNames: (string | null)[] = [ null, "'['", 
                                                            "'\\lbrack'", 
                                                            "';'", null, 
                                                            null, null, 
                                                            null, "'|'", 
                                                            "'_'", "'\\pi'", 
                                                            "'\\int'", null, 
                                                            null, null, 
                                                            "'\\mathrm'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\sim'", "'\\approx'", 
                                                            "'^{\\mathrm{T}}'", 
                                                            "'\\'", "'sin'", 
                                                            "'cos'", "'tan'", 
                                                            "'cot'", "'sec'", 
                                                            "'csc'", "'arcsin'", 
                                                            "'arccos'", 
                                                            "'arctan'", 
                                                            "'sinh'", "'cosh'", 
                                                            "'tanh'", "'coth'", 
                                                            "'ln'", "'log'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'$$'", "'+'", 
                                                            "'-'", null, 
                                                            "'='", "'<'", 
                                                            "'>'", "'\\le'", 
                                                            "'\\ge'", null, 
                                                            null, null, 
                                                            null, "'\\begin{bmatrix}'", 
                                                            "'\\end{bmatrix}'", 
                                                            "'&'", "'\\\\'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'\\:'", 
                                                            null, "']'", 
                                                            "'\\rbrack'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'1'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "L_BRACKET", 
                                                             "ALT_L_BRACKET", 
                                                             "SEMICOLON", 
                                                             "L_BRACE", 
                                                             "R_BRACE", 
                                                             "L_PAREN", 
                                                             "R_PAREN", 
                                                             "VBAR", "UNDERSCORE", 
                                                             "PI", "CMD_INT", 
                                                             "CMD_INT_UNDERSCORE", 
                                                             "CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER", 
                                                             "CMD_INT_UNDERSCORE_SINGLE_CHAR_ID", 
                                                             "CMD_MATHRM", 
                                                             "CMD_FRAC", 
                                                             "CMD_FRAC_INTS", 
                                                             "CMD_CDOT", 
                                                             "CMD_TIMES", 
                                                             "CMD_SQRT", 
                                                             "CMD_SQRT_INT", 
                                                             "CMD_SIM", 
                                                             "CMD_APPROX", 
                                                             "TRANSPOSE", 
                                                             "BACKSLASH", 
                                                             "CMD_SIN", 
                                                             "CMD_COS", 
                                                             "CMD_TAN", 
                                                             "CMD_COT", 
                                                             "CMD_SEC", 
                                                             "CMD_CSC", 
                                                             "CMD_ARCSIN", 
                                                             "CMD_ARCCOS", 
                                                             "CMD_ARCTAN", 
                                                             "CMD_SINH", 
                                                             "CMD_COSH", 
                                                             "CMD_TANH", 
                                                             "CMD_COTH", 
                                                             "CMD_LN", "CMD_LOG", 
                                                             "CMD_SLASH_LOG_UNDERSCORE", 
                                                             "CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER", 
                                                             "CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID", 
                                                             "COMMENT", 
                                                             "CMD_LEFT", 
                                                             "CMD_RIGHT", 
                                                             "DOUBLE_DOLLAR_SIGN", 
                                                             "ADD", "SUB", 
                                                             "CARET", "EQ", 
                                                             "LT", "GT", 
                                                             "LTE", "GTE", 
                                                             "COMMA", "CARET_SINGLE_CHAR_NUMBER", 
                                                             "CARET_SINGLE_CHAR_ID", 
                                                             "NUMBER", "BEGIN_MATRIX", 
                                                             "END_MATRIX", 
                                                             "AMPERSAND", 
                                                             "DOUBLE_BACKSLASH", 
                                                             "UNDERSCORE_SUBSCRIPT", 
                                                             "CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT", 
                                                             "ID", "WS", 
                                                             "SLASH_SPACE", 
                                                             "SLASH_COLON", 
                                                             "ERROR_CHAR", 
                                                             "R_BRACKET", 
                                                             "ALT_R_BRACKET", 
                                                             "U_CMD_FRAC", 
                                                             "U_CMD_FRAC_INTS", 
                                                             "U_CMD_CDOT", 
                                                             "U_CMD_TIMES", 
                                                             "U_CMD_SQRT", 
                                                             "U_COMMA", 
                                                             "U_CARET", 
                                                             "U_NAME", "U_L_PAREN", 
                                                             "U_R_PAREN", 
                                                             "U_L_BRACE", 
                                                             "U_R_BRACE", 
                                                             "U_ONE", "U_NUMBER", 
                                                             "U_CMD_LEFT", 
                                                             "U_CMD_RIGHT", 
                                                             "U_WS", "U_SLASH_SPACE", 
                                                             "U_ERROR_CHAR" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"statement", "insert_matrix", "id", "number", "number_with_units", "assign", 
		"assign_list", "assign_plus_query", "query", "equality", "piecewise_assign", 
		"piecewise_arg", "trig_function", "indefinite_integral_cmd", "integral_cmd", 
		"derivative_cmd", "n_derivative_cmd", "argument", "condition", "id_list", 
		"guess", "guess_list", "condition_single", "condition_chain", "matrix_row", 
		"expr", "u_block", "u_insert_matrix", "u_fraction", "u_expr",
	];
	public get grammarFileName(): string { return "LatexParser.g4"; }
	public get literalNames(): (string | null)[] { return LatexParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return LatexParser.symbolicNames; }
	public get ruleNames(): string[] { return LatexParser.ruleNames; }
	public get serializedATN(): number[] { return LatexParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, LatexParser._ATN, LatexParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, LatexParser.RULE_statement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 75;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 60;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 61;
				this.assign_list();
				}
				break;
			case 3:
				{
				this.state = 62;
				this.assign_plus_query();
				}
				break;
			case 4:
				{
				this.state = 63;
				this.query();
				}
				break;
			case 5:
				{
				this.state = 64;
				this.equality();
				}
				break;
			case 6:
				{
				this.state = 65;
				this.u_block();
				}
				break;
			case 7:
				{
				this.state = 66;
				this.number_();
				}
				break;
			case 8:
				{
				this.state = 67;
				this.id();
				}
				break;
			case 9:
				{
				this.state = 68;
				this.id_list();
				}
				break;
			case 10:
				{
				this.state = 69;
				this.guess();
				}
				break;
			case 11:
				{
				this.state = 70;
				this.guess_list();
				}
				break;
			case 12:
				{
				this.state = 71;
				this.expr(0);
				}
				break;
			case 13:
				{
				this.state = 72;
				this.condition();
				}
				break;
			case 14:
				{
				this.state = 73;
				this.piecewise_assign();
				}
				break;
			case 15:
				{
				this.state = 74;
				this.insert_matrix();
				}
				break;
			}
			this.state = 77;
			this.match(LatexParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public insert_matrix(): Insert_matrixContext {
		let localctx: Insert_matrixContext = new Insert_matrixContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, LatexParser.RULE_insert_matrix);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 82;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 79;
					this.matchWildcard();
					}
					}
				}
				this.state = 84;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 85;
			this.u_insert_matrix();
			this.state = 89;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 86;
					this.matchWildcard();
					}
					}
				}
				this.state = 91;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public id(): IdContext {
		let localctx: IdContext = new IdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, LatexParser.RULE_id);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 92;
			this.match(LatexParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public number_(): NumberContext {
		let localctx: NumberContext = new NumberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, LatexParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 95;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===49) {
				{
				this.state = 94;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 97;
			this.match(LatexParser.NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public number_with_units(): Number_with_unitsContext {
		let localctx: Number_with_unitsContext = new Number_with_unitsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, LatexParser.RULE_number_with_units);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 99;
			this.number_();
			this.state = 100;
			this.u_block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assign(): AssignContext {
		let localctx: AssignContext = new AssignContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, LatexParser.RULE_assign);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 104;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 66:
				{
				this.state = 102;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 103;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 106;
			this.match(LatexParser.EQ);
			this.state = 107;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assign_list(): Assign_listContext {
		let localctx: Assign_listContext = new Assign_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, LatexParser.RULE_assign_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 109;
			this.assign();
			this.state = 112;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 110;
				this.match(LatexParser.COMMA);
				this.state = 111;
				this.assign();
				}
				}
				this.state = 114;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===56);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assign_plus_query(): Assign_plus_queryContext {
		let localctx: Assign_plus_queryContext = new Assign_plus_queryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, LatexParser.RULE_assign_plus_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 116;
			this.assign();
			this.state = 117;
			this.match(LatexParser.EQ);
			this.state = 119;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 118;
				this.u_block();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public query(): QueryContext {
		let localctx: QueryContext = new QueryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, LatexParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 121;
			this.expr(0);
			this.state = 122;
			this.match(LatexParser.EQ);
			this.state = 124;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 123;
				this.u_block();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public equality(): EqualityContext {
		let localctx: EqualityContext = new EqualityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, LatexParser.RULE_equality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 126;
			this.expr(0);
			this.state = 127;
			this.match(LatexParser.EQ);
			this.state = 128;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public piecewise_assign(): Piecewise_assignContext {
		let localctx: Piecewise_assignContext = new Piecewise_assignContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, LatexParser.RULE_piecewise_assign);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 132;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 66:
				{
				this.state = 130;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 131;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 134;
			this.match(LatexParser.EQ);
			this.state = 135;
			this.id();
			this.state = 136;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 137;
			this.piecewise_arg();
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===56) {
				{
				{
				this.state = 138;
				this.match(LatexParser.COMMA);
				this.state = 139;
				this.piecewise_arg();
				}
				}
				this.state = 144;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 145;
			this.match(LatexParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public piecewise_arg(): Piecewise_argContext {
		let localctx: Piecewise_argContext = new Piecewise_argContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, LatexParser.RULE_piecewise_arg);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 147;
			this.match(LatexParser.L_PAREN);
			this.state = 148;
			this.expr(0);
			this.state = 149;
			this.match(LatexParser.COMMA);
			this.state = 150;
			this.condition();
			this.state = 151;
			this.match(LatexParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public trig_function(): Trig_functionContext {
		let localctx: Trig_functionContext = new Trig_functionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, LatexParser.RULE_trig_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 154;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===25) {
				{
				this.state = 153;
				this.match(LatexParser.BACKSLASH);
				}
			}

			this.state = 156;
			_la = this._input.LA(1);
			if(!(((((_la - 26)) & ~0x1F) === 0 && ((1 << (_la - 26)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public indefinite_integral_cmd(): Indefinite_integral_cmdContext {
		let localctx: Indefinite_integral_cmdContext = new Indefinite_integral_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, LatexParser.RULE_indefinite_integral_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 165;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
				{
				this.state = 158;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 12:
				{
				{
				this.state = 159;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 160;
				this.match(LatexParser.L_BRACE);
				this.state = 161;
				this.match(LatexParser.R_BRACE);
				this.state = 162;
				this.match(LatexParser.CARET);
				this.state = 163;
				this.match(LatexParser.L_BRACE);
				this.state = 164;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 167;
			this.match(LatexParser.L_PAREN);
			this.state = 168;
			this.expr(0);
			this.state = 169;
			this.match(LatexParser.R_PAREN);
			this.state = 176;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 170;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 171;
				this.match(LatexParser.L_BRACE);
				this.state = 172;
				this.id();
				this.state = 173;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 66:
				{
				this.state = 175;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 178;
			this.match(LatexParser.L_PAREN);
			this.state = 179;
			this.id();
			this.state = 180;
			this.match(LatexParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public integral_cmd(): Integral_cmdContext {
		let localctx: Integral_cmdContext = new Integral_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, LatexParser.RULE_integral_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 188;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				{
				this.state = 182;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 183;
				this.match(LatexParser.L_BRACE);
				this.state = 184;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 185;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 13:
			case 14:
				{
				this.state = 187;
				_la = this._input.LA(1);
				if(!(_la===13 || _la===14)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 196;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 50:
				{
				{
				this.state = 190;
				this.match(LatexParser.CARET);
				this.state = 191;
				this.match(LatexParser.L_BRACE);
				this.state = 192;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 193;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 57:
			case 58:
				{
				this.state = 195;
				_la = this._input.LA(1);
				if(!(_la===57 || _la===58)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 198;
			this.match(LatexParser.L_PAREN);
			this.state = 199;
			localctx._integrand_expr = this.expr(0);
			this.state = 200;
			this.match(LatexParser.R_PAREN);
			this.state = 207;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 201;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 202;
				this.match(LatexParser.L_BRACE);
				this.state = 203;
				this.id();
				this.state = 204;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 66:
				{
				this.state = 206;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 209;
			this.match(LatexParser.L_PAREN);
			this.state = 210;
			this.id();
			this.state = 211;
			this.match(LatexParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public derivative_cmd(): Derivative_cmdContext {
		let localctx: Derivative_cmdContext = new Derivative_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, LatexParser.RULE_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 213;
			this.match(LatexParser.CMD_FRAC);
			this.state = 214;
			this.match(LatexParser.L_BRACE);
			this.state = 221;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 215;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 216;
				this.match(LatexParser.L_BRACE);
				this.state = 217;
				this.id();
				this.state = 218;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 66:
				{
				this.state = 220;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 223;
			this.match(LatexParser.R_BRACE);
			this.state = 224;
			this.match(LatexParser.L_BRACE);
			this.state = 231;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 225;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 226;
				this.match(LatexParser.L_BRACE);
				this.state = 227;
				this.id();
				this.state = 228;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 66:
				{
				this.state = 230;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 233;
			this.match(LatexParser.L_PAREN);
			this.state = 234;
			this.id();
			this.state = 235;
			this.match(LatexParser.R_PAREN);
			this.state = 236;
			this.match(LatexParser.R_BRACE);
			this.state = 237;
			this.match(LatexParser.L_PAREN);
			this.state = 238;
			this.expr(0);
			this.state = 239;
			this.match(LatexParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public n_derivative_cmd(): N_derivative_cmdContext {
		let localctx: N_derivative_cmdContext = new N_derivative_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, LatexParser.RULE_n_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 241;
			this.match(LatexParser.CMD_FRAC);
			this.state = 242;
			this.match(LatexParser.L_BRACE);
			this.state = 249;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 243;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 244;
				this.match(LatexParser.L_BRACE);
				this.state = 245;
				this.id();
				this.state = 246;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 66:
				{
				this.state = 248;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 257;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 50:
				{
				{
				this.state = 251;
				this.match(LatexParser.CARET);
				this.state = 252;
				this.match(LatexParser.L_BRACE);
				this.state = 253;
				this.number_();
				this.state = 254;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 57:
				{
				this.state = 256;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 259;
			this.match(LatexParser.R_BRACE);
			this.state = 260;
			this.match(LatexParser.L_BRACE);
			this.state = 267;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 261;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 262;
				this.match(LatexParser.L_BRACE);
				this.state = 263;
				this.id();
				this.state = 264;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 66:
				{
				this.state = 266;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 269;
			this.match(LatexParser.L_PAREN);
			this.state = 270;
			this.id();
			this.state = 271;
			this.match(LatexParser.R_PAREN);
			this.state = 278;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 50:
				{
				{
				this.state = 272;
				this.match(LatexParser.CARET);
				this.state = 273;
				this.match(LatexParser.L_BRACE);
				this.state = 274;
				this.number_();
				this.state = 275;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 57:
				{
				this.state = 277;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 280;
			this.match(LatexParser.R_BRACE);
			this.state = 281;
			this.match(LatexParser.L_PAREN);
			this.state = 282;
			this.expr(0);
			this.state = 283;
			this.match(LatexParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public argument(): ArgumentContext {
		let localctx: ArgumentContext = new ArgumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, LatexParser.RULE_argument);
		let _la: number;
		try {
			this.state = 295;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 285;
				this.id();
				this.state = 286;
				this.match(LatexParser.EQ);
				this.state = 287;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 289;
				this.expr(0);
				this.state = 290;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===52 || _la===54)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 291;
				this.id();
				this.state = 292;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===52 || _la===54)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 293;
				this.expr(0);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public condition(): ConditionContext {
		let localctx: ConditionContext = new ConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, LatexParser.RULE_condition);
		try {
			this.state = 299;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 297;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 298;
				this.condition_chain();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public id_list(): Id_listContext {
		let localctx: Id_listContext = new Id_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, LatexParser.RULE_id_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 301;
			this.id();
			this.state = 304;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 302;
				this.match(LatexParser.COMMA);
				this.state = 303;
				this.id();
				}
				}
				this.state = 306;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===56);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public guess(): GuessContext {
		let localctx: GuessContext = new GuessContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, LatexParser.RULE_guess);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 308;
			this.id();
			this.state = 309;
			_la = this._input.LA(1);
			if(!(_la===22 || _la===23)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 312;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 310;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 311;
				this.number_with_units();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public guess_list(): Guess_listContext {
		let localctx: Guess_listContext = new Guess_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, LatexParser.RULE_guess_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 314;
			this.guess();
			this.state = 317;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 315;
				this.match(LatexParser.COMMA);
				this.state = 316;
				this.guess();
				}
				}
				this.state = 319;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===56);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public condition_single(): Condition_singleContext {
		let localctx: Condition_singleContext = new Condition_singleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, LatexParser.RULE_condition_single);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 321;
			this.expr(0);
			this.state = 322;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 323;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public condition_chain(): Condition_chainContext {
		let localctx: Condition_chainContext = new Condition_chainContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, LatexParser.RULE_condition_chain);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 325;
			this.expr(0);
			this.state = 326;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 327;
			this.expr(0);
			this.state = 328;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 329;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public matrix_row(): Matrix_rowContext {
		let localctx: Matrix_rowContext = new Matrix_rowContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, LatexParser.RULE_matrix_row);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 331;
			this.expr(0);
			this.state = 336;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===62) {
				{
				{
				this.state = 332;
				this.match(LatexParser.AMPERSAND);
				this.state = 333;
				this.expr(0);
				}
				}
				this.state = 338;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExprContext = new ExprContext(this, this._ctx, _parentState);
		let _prevctx: ExprContext = localctx;
		let _startState: number = 50;
		this.enterRecursionRule(localctx, 50, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 468;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 340;
				this.id();
				this.state = 341;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 343;
				this.id();
				this.state = 344;
				_la = this._input.LA(1);
				if(!(_la===57 || _la===58)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 345;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 347;
				this.id();
				this.state = 348;
				this.match(LatexParser.CARET);
				this.state = 349;
				this.match(LatexParser.L_BRACE);
				this.state = 350;
				this.expr(0);
				this.state = 351;
				this.match(LatexParser.R_BRACE);
				this.state = 352;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 354;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 355;
				this.match(LatexParser.CMD_SQRT);
				this.state = 356;
				this.match(LatexParser.L_BRACE);
				this.state = 357;
				this.expr(0);
				this.state = 358;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new MatrixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 360;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 361;
				this.matrix_row();
				this.state = 366;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===63) {
					{
					{
					this.state = 362;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 363;
					this.matrix_row();
					}
					}
					this.state = 368;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 369;
				this.match(LatexParser.END_MATRIX);
				}
				break;
			case 7:
				{
				localctx = new TrigContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 371;
				this.trig_function();
				this.state = 372;
				this.match(LatexParser.L_PAREN);
				this.state = 373;
				this.expr(0);
				this.state = 374;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 8:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 376;
				this.indefinite_integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 377;
				this.integral_cmd();
				}
				break;
			case 10:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 378;
				this.derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 379;
				this.n_derivative_cmd();
				}
				break;
			case 12:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 381;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===25) {
					{
					this.state = 380;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 383;
				this.match(LatexParser.CMD_LN);
				this.state = 384;
				this.match(LatexParser.L_PAREN);
				this.state = 385;
				this.expr(0);
				this.state = 386;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 13:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 389;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===25) {
					{
					this.state = 388;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 391;
				this.match(LatexParser.CMD_LOG);
				this.state = 392;
				this.match(LatexParser.L_PAREN);
				this.state = 393;
				this.expr(0);
				this.state = 394;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 396;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 397;
				this.match(LatexParser.L_BRACE);
				this.state = 398;
				this.expr(0);
				this.state = 399;
				this.match(LatexParser.R_BRACE);
				this.state = 400;
				this.match(LatexParser.L_PAREN);
				this.state = 401;
				this.expr(0);
				this.state = 402;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 404;
				_la = this._input.LA(1);
				if(!(_la===42 || _la===43)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 405;
				this.match(LatexParser.L_PAREN);
				this.state = 406;
				this.expr(0);
				this.state = 407;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 16:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 409;
				this.match(LatexParser.VBAR);
				this.state = 410;
				this.expr(0);
				this.state = 411;
				this.match(LatexParser.VBAR);
				}
				break;
			case 17:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 413;
				this.number_with_units();
				}
				break;
			case 18:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 414;
				this.number_();
				}
				break;
			case 19:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 415;
				this.match(LatexParser.SUB);
				this.state = 416;
				this.expr(12);
				}
				break;
			case 20:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 417;
				this.match(LatexParser.CMD_FRAC);
				this.state = 418;
				this.match(LatexParser.L_BRACE);
				this.state = 419;
				this.expr(0);
				this.state = 420;
				this.match(LatexParser.R_BRACE);
				this.state = 421;
				this.match(LatexParser.L_BRACE);
				this.state = 422;
				this.expr(0);
				this.state = 423;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 21:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 425;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 22:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 426;
				this.id();
				}
				break;
			case 23:
				{
				localctx = new FunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 427;
				this.id();
				this.state = 428;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 429;
				this.argument();
				this.state = 434;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===56) {
					{
					{
					this.state = 430;
					this.match(LatexParser.COMMA);
					this.state = 431;
					this.argument();
					}
					}
					this.state = 436;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 437;
				this.match(LatexParser.R_PAREN);
				this.state = 442;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
				case 1:
					{
					this.state = 438;
					(localctx as FunctionContext)._points_id_0 = this.match(LatexParser.ID);
					this.state = 439;
					(localctx as FunctionContext)._num_points = this.number_();
					this.state = 440;
					(localctx as FunctionContext)._points_id_1 = this.match(LatexParser.ID);
					}
					break;
				}
				}
				break;
			case 24:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 450;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 15:
					{
					this.state = 444;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 445;
					this.match(LatexParser.L_BRACE);
					this.state = 446;
					this.id();
					this.state = 447;
					this.match(LatexParser.R_BRACE);
					}
					break;
				case 66:
					{
					this.state = 449;
					this.id();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 452;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 453;
				this.expr(0);
				this.state = 458;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===56) {
					{
					{
					this.state = 454;
					this.match(LatexParser.COMMA);
					this.state = 455;
					this.expr(0);
					}
					}
					this.state = 460;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 461;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 25:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 463;
				this.match(LatexParser.PI);
				}
				break;
			case 26:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 464;
				this.match(LatexParser.L_PAREN);
				this.state = 465;
				this.expr(0);
				this.state = 466;
				this.match(LatexParser.R_PAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 502;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 500;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
					case 1:
						{
						localctx = new MatrixMultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 470;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 471;
						this.match(LatexParser.CMD_TIMES);
						this.state = 472;
						this.expr(12);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 473;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 474;
						this.match(LatexParser.CMD_CDOT);
						this.state = 475;
						this.expr(11);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 476;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 477;
						this.match(LatexParser.SUB);
						this.state = 478;
						this.expr(8);
						}
						break;
					case 4:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 479;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 480;
						this.match(LatexParser.ADD);
						this.state = 481;
						this.expr(7);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 482;
						if (!(this.precpred(this._ctx, 31))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 31)");
						}
						this.state = 483;
						_la = this._input.LA(1);
						if(!(_la===57 || _la===58)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						}
						break;
					case 6:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 484;
						if (!(this.precpred(this._ctx, 30))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 30)");
						}
						this.state = 485;
						this.match(LatexParser.CARET);
						this.state = 486;
						this.match(LatexParser.L_BRACE);
						this.state = 487;
						this.expr(0);
						this.state = 488;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 7:
						{
						localctx = new IndexContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 490;
						if (!(this.precpred(this._ctx, 29))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 29)");
						}
						this.state = 491;
						this.match(LatexParser.UNDERSCORE);
						this.state = 492;
						this.match(LatexParser.L_BRACE);
						this.state = 493;
						this.expr(0);
						this.state = 494;
						this.match(LatexParser.COMMA);
						this.state = 495;
						this.expr(0);
						this.state = 496;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 8:
						{
						localctx = new TransposeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 498;
						if (!(this.precpred(this._ctx, 28))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 28)");
						}
						this.state = 499;
						this.match(LatexParser.TRANSPOSE);
						}
						break;
					}
					}
				}
				this.state = 504;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public u_block(): U_blockContext {
		let localctx: U_blockContext = new U_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, LatexParser.RULE_u_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 505;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 506;
			this.u_expr(0);
			this.state = 507;
			_la = this._input.LA(1);
			if(!(_la===71 || _la===72)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public u_insert_matrix(): U_insert_matrixContext {
		let localctx: U_insert_matrixContext = new U_insert_matrixContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, LatexParser.RULE_u_insert_matrix);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 509;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 510;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===85 || _la===86)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 511;
			_la = this._input.LA(1);
			if(!(_la===76 || _la===78)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 512;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===85 || _la===86)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 513;
			_la = this._input.LA(1);
			if(!(_la===71 || _la===72)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public u_fraction(): U_fractionContext {
		let localctx: U_fractionContext = new U_fractionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.state = 523;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 73:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 515;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 516;
				this.match(LatexParser.U_L_BRACE);
				this.state = 517;
				_la = this._input.LA(1);
				if(!(_la===85 || _la===86)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 518;
				this.match(LatexParser.U_R_BRACE);
				this.state = 519;
				this.match(LatexParser.U_L_BRACE);
				this.state = 520;
				this.match(LatexParser.U_NUMBER);
				this.state = 521;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 74:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 522;
				this.match(LatexParser.U_CMD_FRAC_INTS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public u_expr(): U_exprContext;
	public u_expr(_p: number): U_exprContext;
	// @RuleVersion(0)
	public u_expr(_p?: number): U_exprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: U_exprContext = new U_exprContext(this, this._ctx, _parentState);
		let _prevctx: U_exprContext = localctx;
		let _startState: number = 58;
		this.enterRecursionRule(localctx, 58, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 547;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 77:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 526;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 527;
				this.match(LatexParser.U_L_BRACE);
				this.state = 528;
				this.expr(0);
				this.state = 529;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 73:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 531;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 532;
				this.match(LatexParser.U_L_BRACE);
				this.state = 535;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 73:
				case 77:
				case 80:
				case 81:
					{
					this.state = 533;
					this.u_expr(0);
					}
					break;
				case 85:
					{
					this.state = 534;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 537;
				this.match(LatexParser.U_R_BRACE);
				this.state = 538;
				this.match(LatexParser.U_L_BRACE);
				this.state = 539;
				this.u_expr(0);
				this.state = 540;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 80:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 542;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 81:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 543;
				this.match(LatexParser.U_L_PAREN);
				this.state = 544;
				this.u_expr(0);
				this.state = 545;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 571;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 42, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 569;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 549;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 550;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 551;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 552;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 553;
						this.match(LatexParser.U_CARET);
						this.state = 554;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 555;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 556;
						this.match(LatexParser.U_CARET);
						this.state = 557;
						this.match(LatexParser.U_L_BRACE);
						this.state = 558;
						this.match(LatexParser.U_NUMBER);
						this.state = 559;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 560;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 561;
						this.match(LatexParser.U_CARET);
						this.state = 562;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 563;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 564;
						this.match(LatexParser.U_CARET);
						this.state = 565;
						this.match(LatexParser.U_L_BRACE);
						this.state = 566;
						this.u_fraction();
						this.state = 567;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 573;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 42, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 25:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 29:
			return this.u_expr_sempred(localctx as U_exprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 11);
		case 1:
			return this.precpred(this._ctx, 10);
		case 2:
			return this.precpred(this._ctx, 7);
		case 3:
			return this.precpred(this._ctx, 6);
		case 4:
			return this.precpred(this._ctx, 31);
		case 5:
			return this.precpred(this._ctx, 30);
		case 6:
			return this.precpred(this._ctx, 29);
		case 7:
			return this.precpred(this._ctx, 28);
		}
		return true;
	}
	private u_expr_sempred(localctx: U_exprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 8:
			return this.precpred(this._ctx, 4);
		case 9:
			return this.precpred(this._ctx, 9);
		case 10:
			return this.precpred(this._ctx, 8);
		case 11:
			return this.precpred(this._ctx, 7);
		case 12:
			return this.precpred(this._ctx, 6);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,91,575,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,0,76,8,0,1,0,1,0,1,1,5,1,81,
	8,1,10,1,12,1,84,9,1,1,1,1,1,5,1,88,8,1,10,1,12,1,91,9,1,1,2,1,2,1,3,3,
	3,96,8,3,1,3,1,3,1,4,1,4,1,4,1,5,1,5,3,5,105,8,5,1,5,1,5,1,5,1,6,1,6,1,
	6,4,6,113,8,6,11,6,12,6,114,1,7,1,7,1,7,3,7,120,8,7,1,8,1,8,1,8,3,8,125,
	8,8,1,9,1,9,1,9,1,9,1,10,1,10,3,10,133,8,10,1,10,1,10,1,10,1,10,1,10,1,
	10,5,10,141,8,10,10,10,12,10,144,9,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,
	1,11,1,12,3,12,155,8,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,
	13,166,8,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,177,8,13,
	1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,3,14,189,8,14,1,14,1,
	14,1,14,1,14,1,14,1,14,3,14,197,8,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
	1,14,1,14,3,14,208,8,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,
	15,1,15,1,15,3,15,222,8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,
	232,8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,
	16,1,16,1,16,1,16,3,16,250,8,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,258,
	8,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,268,8,16,1,16,1,16,1,
	16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,279,8,16,1,16,1,16,1,16,1,16,1,16,
	1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,296,8,17,1,18,1,
	18,3,18,300,8,18,1,19,1,19,1,19,4,19,305,8,19,11,19,12,19,306,1,20,1,20,
	1,20,1,20,3,20,313,8,20,1,21,1,21,1,21,4,21,318,8,21,11,21,12,21,319,1,
	22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,5,24,335,
	8,24,10,24,12,24,338,9,24,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,
	1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,
	25,1,25,5,25,365,8,25,10,25,12,25,368,9,25,1,25,1,25,1,25,1,25,1,25,1,25,
	1,25,1,25,1,25,1,25,1,25,1,25,3,25,382,8,25,1,25,1,25,1,25,1,25,1,25,1,
	25,3,25,390,8,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,
	1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,
	25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,
	1,25,5,25,433,8,25,10,25,12,25,436,9,25,1,25,1,25,1,25,1,25,1,25,3,25,443,
	8,25,1,25,1,25,1,25,1,25,1,25,1,25,3,25,451,8,25,1,25,1,25,1,25,1,25,5,
	25,457,8,25,10,25,12,25,460,9,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,3,25,
	469,8,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,
	25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,
	1,25,1,25,1,25,5,25,501,8,25,10,25,12,25,504,9,25,1,26,1,26,1,26,1,26,1,
	27,1,27,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,3,28,
	524,8,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,536,8,29,
	1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,548,8,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,
	1,29,1,29,1,29,1,29,5,29,570,8,29,10,29,12,29,573,9,29,1,29,2,82,89,2,50,
	58,30,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,
	48,50,52,54,56,58,0,11,1,0,26,38,1,0,13,14,1,0,57,58,2,0,52,52,54,54,1,
	0,22,23,1,0,52,55,1,0,42,43,1,0,1,2,1,0,71,72,1,0,85,86,2,0,76,76,78,78,
	636,0,75,1,0,0,0,2,82,1,0,0,0,4,92,1,0,0,0,6,95,1,0,0,0,8,99,1,0,0,0,10,
	104,1,0,0,0,12,109,1,0,0,0,14,116,1,0,0,0,16,121,1,0,0,0,18,126,1,0,0,0,
	20,132,1,0,0,0,22,147,1,0,0,0,24,154,1,0,0,0,26,165,1,0,0,0,28,188,1,0,
	0,0,30,213,1,0,0,0,32,241,1,0,0,0,34,295,1,0,0,0,36,299,1,0,0,0,38,301,
	1,0,0,0,40,308,1,0,0,0,42,314,1,0,0,0,44,321,1,0,0,0,46,325,1,0,0,0,48,
	331,1,0,0,0,50,468,1,0,0,0,52,505,1,0,0,0,54,509,1,0,0,0,56,523,1,0,0,0,
	58,547,1,0,0,0,60,76,3,10,5,0,61,76,3,12,6,0,62,76,3,14,7,0,63,76,3,16,
	8,0,64,76,3,18,9,0,65,76,3,52,26,0,66,76,3,6,3,0,67,76,3,4,2,0,68,76,3,
	38,19,0,69,76,3,40,20,0,70,76,3,42,21,0,71,76,3,50,25,0,72,76,3,36,18,0,
	73,76,3,20,10,0,74,76,3,2,1,0,75,60,1,0,0,0,75,61,1,0,0,0,75,62,1,0,0,0,
	75,63,1,0,0,0,75,64,1,0,0,0,75,65,1,0,0,0,75,66,1,0,0,0,75,67,1,0,0,0,75,
	68,1,0,0,0,75,69,1,0,0,0,75,70,1,0,0,0,75,71,1,0,0,0,75,72,1,0,0,0,75,73,
	1,0,0,0,75,74,1,0,0,0,75,76,1,0,0,0,76,77,1,0,0,0,77,78,5,0,0,1,78,1,1,
	0,0,0,79,81,9,0,0,0,80,79,1,0,0,0,81,84,1,0,0,0,82,83,1,0,0,0,82,80,1,0,
	0,0,83,85,1,0,0,0,84,82,1,0,0,0,85,89,3,54,27,0,86,88,9,0,0,0,87,86,1,0,
	0,0,88,91,1,0,0,0,89,90,1,0,0,0,89,87,1,0,0,0,90,3,1,0,0,0,91,89,1,0,0,
	0,92,93,5,66,0,0,93,5,1,0,0,0,94,96,5,49,0,0,95,94,1,0,0,0,95,96,1,0,0,
	0,96,97,1,0,0,0,97,98,5,59,0,0,98,7,1,0,0,0,99,100,3,6,3,0,100,101,3,52,
	26,0,101,9,1,0,0,0,102,105,3,4,2,0,103,105,5,10,0,0,104,102,1,0,0,0,104,
	103,1,0,0,0,105,106,1,0,0,0,106,107,5,51,0,0,107,108,3,50,25,0,108,11,1,
	0,0,0,109,112,3,10,5,0,110,111,5,56,0,0,111,113,3,10,5,0,112,110,1,0,0,
	0,113,114,1,0,0,0,114,112,1,0,0,0,114,115,1,0,0,0,115,13,1,0,0,0,116,117,
	3,10,5,0,117,119,5,51,0,0,118,120,3,52,26,0,119,118,1,0,0,0,119,120,1,0,
	0,0,120,15,1,0,0,0,121,122,3,50,25,0,122,124,5,51,0,0,123,125,3,52,26,0,
	124,123,1,0,0,0,124,125,1,0,0,0,125,17,1,0,0,0,126,127,3,50,25,0,127,128,
	5,51,0,0,128,129,3,50,25,0,129,19,1,0,0,0,130,133,3,4,2,0,131,133,5,10,
	0,0,132,130,1,0,0,0,132,131,1,0,0,0,133,134,1,0,0,0,134,135,5,51,0,0,135,
	136,3,4,2,0,136,137,5,6,0,0,137,142,3,22,11,0,138,139,5,56,0,0,139,141,
	3,22,11,0,140,138,1,0,0,0,141,144,1,0,0,0,142,140,1,0,0,0,142,143,1,0,0,
	0,143,145,1,0,0,0,144,142,1,0,0,0,145,146,5,7,0,0,146,21,1,0,0,0,147,148,
	5,6,0,0,148,149,3,50,25,0,149,150,5,56,0,0,150,151,3,36,18,0,151,152,5,
	7,0,0,152,23,1,0,0,0,153,155,5,25,0,0,154,153,1,0,0,0,154,155,1,0,0,0,155,
	156,1,0,0,0,156,157,7,0,0,0,157,25,1,0,0,0,158,166,5,11,0,0,159,160,5,12,
	0,0,160,161,5,4,0,0,161,162,5,5,0,0,162,163,5,50,0,0,163,164,5,4,0,0,164,
	166,5,5,0,0,165,158,1,0,0,0,165,159,1,0,0,0,166,167,1,0,0,0,167,168,5,6,
	0,0,168,169,3,50,25,0,169,176,5,7,0,0,170,171,5,15,0,0,171,172,5,4,0,0,
	172,173,3,4,2,0,173,174,5,5,0,0,174,177,1,0,0,0,175,177,3,4,2,0,176,170,
	1,0,0,0,176,175,1,0,0,0,177,178,1,0,0,0,178,179,5,6,0,0,179,180,3,4,2,0,
	180,181,5,7,0,0,181,27,1,0,0,0,182,183,5,12,0,0,183,184,5,4,0,0,184,185,
	3,50,25,0,185,186,5,5,0,0,186,189,1,0,0,0,187,189,7,1,0,0,188,182,1,0,0,
	0,188,187,1,0,0,0,189,196,1,0,0,0,190,191,5,50,0,0,191,192,5,4,0,0,192,
	193,3,50,25,0,193,194,5,5,0,0,194,197,1,0,0,0,195,197,7,2,0,0,196,190,1,
	0,0,0,196,195,1,0,0,0,197,198,1,0,0,0,198,199,5,6,0,0,199,200,3,50,25,0,
	200,207,5,7,0,0,201,202,5,15,0,0,202,203,5,4,0,0,203,204,3,4,2,0,204,205,
	5,5,0,0,205,208,1,0,0,0,206,208,3,4,2,0,207,201,1,0,0,0,207,206,1,0,0,0,
	208,209,1,0,0,0,209,210,5,6,0,0,210,211,3,4,2,0,211,212,5,7,0,0,212,29,
	1,0,0,0,213,214,5,16,0,0,214,221,5,4,0,0,215,216,5,15,0,0,216,217,5,4,0,
	0,217,218,3,4,2,0,218,219,5,5,0,0,219,222,1,0,0,0,220,222,3,4,2,0,221,215,
	1,0,0,0,221,220,1,0,0,0,222,223,1,0,0,0,223,224,5,5,0,0,224,231,5,4,0,0,
	225,226,5,15,0,0,226,227,5,4,0,0,227,228,3,4,2,0,228,229,5,5,0,0,229,232,
	1,0,0,0,230,232,3,4,2,0,231,225,1,0,0,0,231,230,1,0,0,0,232,233,1,0,0,0,
	233,234,5,6,0,0,234,235,3,4,2,0,235,236,5,7,0,0,236,237,5,5,0,0,237,238,
	5,6,0,0,238,239,3,50,25,0,239,240,5,7,0,0,240,31,1,0,0,0,241,242,5,16,0,
	0,242,249,5,4,0,0,243,244,5,15,0,0,244,245,5,4,0,0,245,246,3,4,2,0,246,
	247,5,5,0,0,247,250,1,0,0,0,248,250,3,4,2,0,249,243,1,0,0,0,249,248,1,0,
	0,0,250,257,1,0,0,0,251,252,5,50,0,0,252,253,5,4,0,0,253,254,3,6,3,0,254,
	255,5,5,0,0,255,258,1,0,0,0,256,258,5,57,0,0,257,251,1,0,0,0,257,256,1,
	0,0,0,258,259,1,0,0,0,259,260,5,5,0,0,260,267,5,4,0,0,261,262,5,15,0,0,
	262,263,5,4,0,0,263,264,3,4,2,0,264,265,5,5,0,0,265,268,1,0,0,0,266,268,
	3,4,2,0,267,261,1,0,0,0,267,266,1,0,0,0,268,269,1,0,0,0,269,270,5,6,0,0,
	270,271,3,4,2,0,271,278,5,7,0,0,272,273,5,50,0,0,273,274,5,4,0,0,274,275,
	3,6,3,0,275,276,5,5,0,0,276,279,1,0,0,0,277,279,5,57,0,0,278,272,1,0,0,
	0,278,277,1,0,0,0,279,280,1,0,0,0,280,281,5,5,0,0,281,282,5,6,0,0,282,283,
	3,50,25,0,283,284,5,7,0,0,284,33,1,0,0,0,285,286,3,4,2,0,286,287,5,51,0,
	0,287,288,3,50,25,0,288,296,1,0,0,0,289,290,3,50,25,0,290,291,7,3,0,0,291,
	292,3,4,2,0,292,293,7,3,0,0,293,294,3,50,25,0,294,296,1,0,0,0,295,285,1,
	0,0,0,295,289,1,0,0,0,296,35,1,0,0,0,297,300,3,44,22,0,298,300,3,46,23,
	0,299,297,1,0,0,0,299,298,1,0,0,0,300,37,1,0,0,0,301,304,3,4,2,0,302,303,
	5,56,0,0,303,305,3,4,2,0,304,302,1,0,0,0,305,306,1,0,0,0,306,304,1,0,0,
	0,306,307,1,0,0,0,307,39,1,0,0,0,308,309,3,4,2,0,309,312,7,4,0,0,310,313,
	3,6,3,0,311,313,3,8,4,0,312,310,1,0,0,0,312,311,1,0,0,0,313,41,1,0,0,0,
	314,317,3,40,20,0,315,316,5,56,0,0,316,318,3,40,20,0,317,315,1,0,0,0,318,
	319,1,0,0,0,319,317,1,0,0,0,319,320,1,0,0,0,320,43,1,0,0,0,321,322,3,50,
	25,0,322,323,7,5,0,0,323,324,3,50,25,0,324,45,1,0,0,0,325,326,3,50,25,0,
	326,327,7,5,0,0,327,328,3,50,25,0,328,329,7,5,0,0,329,330,3,50,25,0,330,
	47,1,0,0,0,331,336,3,50,25,0,332,333,5,62,0,0,333,335,3,50,25,0,334,332,
	1,0,0,0,335,338,1,0,0,0,336,334,1,0,0,0,336,337,1,0,0,0,337,49,1,0,0,0,
	338,336,1,0,0,0,339,340,6,25,-1,0,340,341,3,4,2,0,341,342,5,65,0,0,342,
	469,1,0,0,0,343,344,3,4,2,0,344,345,7,2,0,0,345,346,5,64,0,0,346,469,1,
	0,0,0,347,348,3,4,2,0,348,349,5,50,0,0,349,350,5,4,0,0,350,351,3,50,25,
	0,351,352,5,5,0,0,352,353,5,64,0,0,353,469,1,0,0,0,354,469,5,21,0,0,355,
	356,5,20,0,0,356,357,5,4,0,0,357,358,3,50,25,0,358,359,5,5,0,0,359,469,
	1,0,0,0,360,361,5,60,0,0,361,366,3,48,24,0,362,363,5,63,0,0,363,365,3,48,
	24,0,364,362,1,0,0,0,365,368,1,0,0,0,366,364,1,0,0,0,366,367,1,0,0,0,367,
	369,1,0,0,0,368,366,1,0,0,0,369,370,5,61,0,0,370,469,1,0,0,0,371,372,3,
	24,12,0,372,373,5,6,0,0,373,374,3,50,25,0,374,375,5,7,0,0,375,469,1,0,0,
	0,376,469,3,26,13,0,377,469,3,28,14,0,378,469,3,30,15,0,379,469,3,32,16,
	0,380,382,5,25,0,0,381,380,1,0,0,0,381,382,1,0,0,0,382,383,1,0,0,0,383,
	384,5,39,0,0,384,385,5,6,0,0,385,386,3,50,25,0,386,387,5,7,0,0,387,469,
	1,0,0,0,388,390,5,25,0,0,389,388,1,0,0,0,389,390,1,0,0,0,390,391,1,0,0,
	0,391,392,5,40,0,0,392,393,5,6,0,0,393,394,3,50,25,0,394,395,5,7,0,0,395,
	469,1,0,0,0,396,397,5,41,0,0,397,398,5,4,0,0,398,399,3,50,25,0,399,400,
	5,5,0,0,400,401,5,6,0,0,401,402,3,50,25,0,402,403,5,7,0,0,403,469,1,0,0,
	0,404,405,7,6,0,0,405,406,5,6,0,0,406,407,3,50,25,0,407,408,5,7,0,0,408,
	469,1,0,0,0,409,410,5,8,0,0,410,411,3,50,25,0,411,412,5,8,0,0,412,469,1,
	0,0,0,413,469,3,8,4,0,414,469,3,6,3,0,415,416,5,49,0,0,416,469,3,50,25,
	12,417,418,5,16,0,0,418,419,5,4,0,0,419,420,3,50,25,0,420,421,5,5,0,0,421,
	422,5,4,0,0,422,423,3,50,25,0,423,424,5,5,0,0,424,469,1,0,0,0,425,469,5,
	17,0,0,426,469,3,4,2,0,427,428,3,4,2,0,428,429,5,6,0,0,429,434,3,34,17,
	0,430,431,5,56,0,0,431,433,3,34,17,0,432,430,1,0,0,0,433,436,1,0,0,0,434,
	432,1,0,0,0,434,435,1,0,0,0,435,437,1,0,0,0,436,434,1,0,0,0,437,442,5,7,
	0,0,438,439,5,66,0,0,439,440,3,6,3,0,440,441,5,66,0,0,441,443,1,0,0,0,442,
	438,1,0,0,0,442,443,1,0,0,0,443,469,1,0,0,0,444,445,5,15,0,0,445,446,5,
	4,0,0,446,447,3,4,2,0,447,448,5,5,0,0,448,451,1,0,0,0,449,451,3,4,2,0,450,
	444,1,0,0,0,450,449,1,0,0,0,451,452,1,0,0,0,452,453,5,6,0,0,453,458,3,50,
	25,0,454,455,5,56,0,0,455,457,3,50,25,0,456,454,1,0,0,0,457,460,1,0,0,0,
	458,456,1,0,0,0,458,459,1,0,0,0,459,461,1,0,0,0,460,458,1,0,0,0,461,462,
	5,7,0,0,462,469,1,0,0,0,463,469,5,10,0,0,464,465,5,6,0,0,465,466,3,50,25,
	0,466,467,5,7,0,0,467,469,1,0,0,0,468,339,1,0,0,0,468,343,1,0,0,0,468,347,
	1,0,0,0,468,354,1,0,0,0,468,355,1,0,0,0,468,360,1,0,0,0,468,371,1,0,0,0,
	468,376,1,0,0,0,468,377,1,0,0,0,468,378,1,0,0,0,468,379,1,0,0,0,468,381,
	1,0,0,0,468,389,1,0,0,0,468,396,1,0,0,0,468,404,1,0,0,0,468,409,1,0,0,0,
	468,413,1,0,0,0,468,414,1,0,0,0,468,415,1,0,0,0,468,417,1,0,0,0,468,425,
	1,0,0,0,468,426,1,0,0,0,468,427,1,0,0,0,468,450,1,0,0,0,468,463,1,0,0,0,
	468,464,1,0,0,0,469,502,1,0,0,0,470,471,10,11,0,0,471,472,5,19,0,0,472,
	501,3,50,25,12,473,474,10,10,0,0,474,475,5,18,0,0,475,501,3,50,25,11,476,
	477,10,7,0,0,477,478,5,49,0,0,478,501,3,50,25,8,479,480,10,6,0,0,480,481,
	5,48,0,0,481,501,3,50,25,7,482,483,10,31,0,0,483,501,7,2,0,0,484,485,10,
	30,0,0,485,486,5,50,0,0,486,487,5,4,0,0,487,488,3,50,25,0,488,489,5,5,0,
	0,489,501,1,0,0,0,490,491,10,29,0,0,491,492,5,9,0,0,492,493,5,4,0,0,493,
	494,3,50,25,0,494,495,5,56,0,0,495,496,3,50,25,0,496,497,5,5,0,0,497,501,
	1,0,0,0,498,499,10,28,0,0,499,501,5,24,0,0,500,470,1,0,0,0,500,473,1,0,
	0,0,500,476,1,0,0,0,500,479,1,0,0,0,500,482,1,0,0,0,500,484,1,0,0,0,500,
	490,1,0,0,0,500,498,1,0,0,0,501,504,1,0,0,0,502,500,1,0,0,0,502,503,1,0,
	0,0,503,51,1,0,0,0,504,502,1,0,0,0,505,506,7,7,0,0,506,507,3,58,29,0,507,
	508,7,8,0,0,508,53,1,0,0,0,509,510,7,7,0,0,510,511,7,9,0,0,511,512,7,10,
	0,0,512,513,7,9,0,0,513,514,7,8,0,0,514,55,1,0,0,0,515,516,5,73,0,0,516,
	517,5,83,0,0,517,518,7,9,0,0,518,519,5,84,0,0,519,520,5,83,0,0,520,521,
	5,86,0,0,521,524,5,84,0,0,522,524,5,74,0,0,523,515,1,0,0,0,523,522,1,0,
	0,0,524,57,1,0,0,0,525,526,6,29,-1,0,526,527,5,77,0,0,527,528,5,83,0,0,
	528,529,3,50,25,0,529,530,5,84,0,0,530,548,1,0,0,0,531,532,5,73,0,0,532,
	535,5,83,0,0,533,536,3,58,29,0,534,536,5,85,0,0,535,533,1,0,0,0,535,534,
	1,0,0,0,536,537,1,0,0,0,537,538,5,84,0,0,538,539,5,83,0,0,539,540,3,58,
	29,0,540,541,5,84,0,0,541,548,1,0,0,0,542,548,5,80,0,0,543,544,5,81,0,0,
	544,545,3,58,29,0,545,546,5,82,0,0,546,548,1,0,0,0,547,525,1,0,0,0,547,
	531,1,0,0,0,547,542,1,0,0,0,547,543,1,0,0,0,548,571,1,0,0,0,549,550,10,
	4,0,0,550,551,5,75,0,0,551,570,3,58,29,5,552,553,10,9,0,0,553,554,5,79,
	0,0,554,570,5,86,0,0,555,556,10,8,0,0,556,557,5,79,0,0,557,558,5,83,0,0,
	558,559,5,86,0,0,559,570,5,84,0,0,560,561,10,7,0,0,561,562,5,79,0,0,562,
	570,3,56,28,0,563,564,10,6,0,0,564,565,5,79,0,0,565,566,5,83,0,0,566,567,
	3,56,28,0,567,568,5,84,0,0,568,570,1,0,0,0,569,549,1,0,0,0,569,552,1,0,
	0,0,569,555,1,0,0,0,569,560,1,0,0,0,569,563,1,0,0,0,570,573,1,0,0,0,571,
	569,1,0,0,0,571,572,1,0,0,0,572,59,1,0,0,0,573,571,1,0,0,0,43,75,82,89,
	95,104,114,119,124,132,142,154,165,176,188,196,207,221,231,249,257,267,
	278,295,299,306,312,319,336,366,381,389,434,442,450,458,468,500,502,523,
	535,547,569,571];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LatexParser.__ATN) {
			LatexParser.__ATN = new ATNDeserializer().deserialize(LatexParser._serializedATN);
		}

		return LatexParser.__ATN;
	}


	static DecisionsToDFA = LatexParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class StatementContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(LatexParser.EOF, 0);
	}
	public assign(): AssignContext {
		return this.getTypedRuleContext(AssignContext, 0) as AssignContext;
	}
	public assign_list(): Assign_listContext {
		return this.getTypedRuleContext(Assign_listContext, 0) as Assign_listContext;
	}
	public assign_plus_query(): Assign_plus_queryContext {
		return this.getTypedRuleContext(Assign_plus_queryContext, 0) as Assign_plus_queryContext;
	}
	public query(): QueryContext {
		return this.getTypedRuleContext(QueryContext, 0) as QueryContext;
	}
	public equality(): EqualityContext {
		return this.getTypedRuleContext(EqualityContext, 0) as EqualityContext;
	}
	public u_block(): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, 0) as U_blockContext;
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public id_list(): Id_listContext {
		return this.getTypedRuleContext(Id_listContext, 0) as Id_listContext;
	}
	public guess(): GuessContext {
		return this.getTypedRuleContext(GuessContext, 0) as GuessContext;
	}
	public guess_list(): Guess_listContext {
		return this.getTypedRuleContext(Guess_listContext, 0) as Guess_listContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public condition(): ConditionContext {
		return this.getTypedRuleContext(ConditionContext, 0) as ConditionContext;
	}
	public piecewise_assign(): Piecewise_assignContext {
		return this.getTypedRuleContext(Piecewise_assignContext, 0) as Piecewise_assignContext;
	}
	public insert_matrix(): Insert_matrixContext {
		return this.getTypedRuleContext(Insert_matrixContext, 0) as Insert_matrixContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_statement;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Insert_matrixContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public u_insert_matrix(): U_insert_matrixContext {
		return this.getTypedRuleContext(U_insert_matrixContext, 0) as U_insert_matrixContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_insert_matrix;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitInsert_matrix) {
			return visitor.visitInsert_matrix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(LatexParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_id;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitId) {
			return visitor.visitId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NUMBER(): TerminalNode {
		return this.getToken(LatexParser.NUMBER, 0);
	}
	public SUB(): TerminalNode {
		return this.getToken(LatexParser.SUB, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_number;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitNumber) {
			return visitor.visitNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Number_with_unitsContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public u_block(): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, 0) as U_blockContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_number_with_units;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitNumber_with_units) {
			return visitor.visitNumber_with_units(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public PI(): TerminalNode {
		return this.getToken(LatexParser.PI, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_assign;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitAssign) {
			return visitor.visitAssign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assign_listContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assign_list(): AssignContext[] {
		return this.getTypedRuleContexts(AssignContext) as AssignContext[];
	}
	public assign(i: number): AssignContext {
		return this.getTypedRuleContext(AssignContext, i) as AssignContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LatexParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_assign_list;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitAssign_list) {
			return visitor.visitAssign_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assign_plus_queryContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assign(): AssignContext {
		return this.getTypedRuleContext(AssignContext, 0) as AssignContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public u_block(): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, 0) as U_blockContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_assign_plus_query;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitAssign_plus_query) {
			return visitor.visitAssign_plus_query(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public u_block(): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, 0) as U_blockContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_query;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitQuery) {
			return visitor.visitQuery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EqualityContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_equality;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitEquality) {
			return visitor.visitEquality(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Piecewise_assignContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public id_list(): IdContext[] {
		return this.getTypedRuleContexts(IdContext) as IdContext[];
	}
	public id(i: number): IdContext {
		return this.getTypedRuleContext(IdContext, i) as IdContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	public PI(): TerminalNode {
		return this.getToken(LatexParser.PI, 0);
	}
	public piecewise_arg_list(): Piecewise_argContext[] {
		return this.getTypedRuleContexts(Piecewise_argContext) as Piecewise_argContext[];
	}
	public piecewise_arg(i: number): Piecewise_argContext {
		return this.getTypedRuleContext(Piecewise_argContext, i) as Piecewise_argContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LatexParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_piecewise_assign;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitPiecewise_assign) {
			return visitor.visitPiecewise_assign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Piecewise_argContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public COMMA(): TerminalNode {
		return this.getToken(LatexParser.COMMA, 0);
	}
	public condition(): ConditionContext {
		return this.getTypedRuleContext(ConditionContext, 0) as ConditionContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_piecewise_arg;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitPiecewise_arg) {
			return visitor.visitPiecewise_arg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Trig_functionContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CMD_SIN(): TerminalNode {
		return this.getToken(LatexParser.CMD_SIN, 0);
	}
	public CMD_COS(): TerminalNode {
		return this.getToken(LatexParser.CMD_COS, 0);
	}
	public CMD_TAN(): TerminalNode {
		return this.getToken(LatexParser.CMD_TAN, 0);
	}
	public CMD_COT(): TerminalNode {
		return this.getToken(LatexParser.CMD_COT, 0);
	}
	public CMD_SEC(): TerminalNode {
		return this.getToken(LatexParser.CMD_SEC, 0);
	}
	public CMD_CSC(): TerminalNode {
		return this.getToken(LatexParser.CMD_CSC, 0);
	}
	public CMD_ARCSIN(): TerminalNode {
		return this.getToken(LatexParser.CMD_ARCSIN, 0);
	}
	public CMD_ARCCOS(): TerminalNode {
		return this.getToken(LatexParser.CMD_ARCCOS, 0);
	}
	public CMD_ARCTAN(): TerminalNode {
		return this.getToken(LatexParser.CMD_ARCTAN, 0);
	}
	public CMD_SINH(): TerminalNode {
		return this.getToken(LatexParser.CMD_SINH, 0);
	}
	public CMD_COSH(): TerminalNode {
		return this.getToken(LatexParser.CMD_COSH, 0);
	}
	public CMD_TANH(): TerminalNode {
		return this.getToken(LatexParser.CMD_TANH, 0);
	}
	public CMD_COTH(): TerminalNode {
		return this.getToken(LatexParser.CMD_COTH, 0);
	}
	public BACKSLASH(): TerminalNode {
		return this.getToken(LatexParser.BACKSLASH, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_trig_function;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitTrig_function) {
			return visitor.visitTrig_function(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Indefinite_integral_cmdContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_PAREN);
	}
	public L_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, i);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public R_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_PAREN);
	}
	public R_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, i);
	}
	public id_list(): IdContext[] {
		return this.getTypedRuleContexts(IdContext) as IdContext[];
	}
	public id(i: number): IdContext {
		return this.getTypedRuleContext(IdContext, i) as IdContext;
	}
	public CMD_INT(): TerminalNode {
		return this.getToken(LatexParser.CMD_INT, 0);
	}
	public CMD_MATHRM(): TerminalNode {
		return this.getToken(LatexParser.CMD_MATHRM, 0);
	}
	public L_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_BRACE);
	}
	public L_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, i);
	}
	public R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_BRACE);
	}
	public R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, i);
	}
	public CMD_INT_UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.CMD_INT_UNDERSCORE, 0);
	}
	public CARET(): TerminalNode {
		return this.getToken(LatexParser.CARET, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_indefinite_integral_cmd;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitIndefinite_integral_cmd) {
			return visitor.visitIndefinite_integral_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Integral_cmdContext extends ParserRuleContext {
	public _lower_lim_expr!: ExprContext;
	public _upper_lim_expr!: ExprContext;
	public _integrand_expr!: ExprContext;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_PAREN);
	}
	public L_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, i);
	}
	public R_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_PAREN);
	}
	public R_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, i);
	}
	public id_list(): IdContext[] {
		return this.getTypedRuleContexts(IdContext) as IdContext[];
	}
	public id(i: number): IdContext {
		return this.getTypedRuleContext(IdContext, i) as IdContext;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public CMD_MATHRM(): TerminalNode {
		return this.getToken(LatexParser.CMD_MATHRM, 0);
	}
	public L_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_BRACE);
	}
	public L_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, i);
	}
	public R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_BRACE);
	}
	public R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, i);
	}
	public CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER(): TerminalNode {
		return this.getToken(LatexParser.CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER, 0);
	}
	public CMD_INT_UNDERSCORE_SINGLE_CHAR_ID(): TerminalNode {
		return this.getToken(LatexParser.CMD_INT_UNDERSCORE_SINGLE_CHAR_ID, 0);
	}
	public CARET_SINGLE_CHAR_ID(): TerminalNode {
		return this.getToken(LatexParser.CARET_SINGLE_CHAR_ID, 0);
	}
	public CARET_SINGLE_CHAR_NUMBER(): TerminalNode {
		return this.getToken(LatexParser.CARET_SINGLE_CHAR_NUMBER, 0);
	}
	public CMD_INT_UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.CMD_INT_UNDERSCORE, 0);
	}
	public CARET(): TerminalNode {
		return this.getToken(LatexParser.CARET, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_integral_cmd;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitIntegral_cmd) {
			return visitor.visitIntegral_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Derivative_cmdContext extends ParserRuleContext {
	public _MATHRM_0!: Token;
	public _MATHRM_1!: Token;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CMD_FRAC(): TerminalNode {
		return this.getToken(LatexParser.CMD_FRAC, 0);
	}
	public L_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_BRACE);
	}
	public L_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, i);
	}
	public R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_BRACE);
	}
	public R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, i);
	}
	public L_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_PAREN);
	}
	public L_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, i);
	}
	public id_list(): IdContext[] {
		return this.getTypedRuleContexts(IdContext) as IdContext[];
	}
	public id(i: number): IdContext {
		return this.getTypedRuleContext(IdContext, i) as IdContext;
	}
	public R_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_PAREN);
	}
	public R_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, i);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public CMD_MATHRM_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.CMD_MATHRM);
	}
	public CMD_MATHRM(i: number): TerminalNode {
		return this.getToken(LatexParser.CMD_MATHRM, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_derivative_cmd;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitDerivative_cmd) {
			return visitor.visitDerivative_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class N_derivative_cmdContext extends ParserRuleContext {
	public _MATHRM_0!: Token;
	public _single_char_exp1!: Token;
	public _MATHRM_1!: Token;
	public _single_char_exp2!: Token;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CMD_FRAC(): TerminalNode {
		return this.getToken(LatexParser.CMD_FRAC, 0);
	}
	public L_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_BRACE);
	}
	public L_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, i);
	}
	public R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_BRACE);
	}
	public R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, i);
	}
	public L_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_PAREN);
	}
	public L_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, i);
	}
	public id_list(): IdContext[] {
		return this.getTypedRuleContexts(IdContext) as IdContext[];
	}
	public id(i: number): IdContext {
		return this.getTypedRuleContext(IdContext, i) as IdContext;
	}
	public R_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_PAREN);
	}
	public R_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, i);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public CMD_MATHRM_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.CMD_MATHRM);
	}
	public CMD_MATHRM(i: number): TerminalNode {
		return this.getToken(LatexParser.CMD_MATHRM, i);
	}
	public CARET_SINGLE_CHAR_NUMBER_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.CARET_SINGLE_CHAR_NUMBER);
	}
	public CARET_SINGLE_CHAR_NUMBER(i: number): TerminalNode {
		return this.getToken(LatexParser.CARET_SINGLE_CHAR_NUMBER, i);
	}
	public CARET_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.CARET);
	}
	public CARET(i: number): TerminalNode {
		return this.getToken(LatexParser.CARET, i);
	}
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_n_derivative_cmd;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitN_derivative_cmd) {
			return visitor.visitN_derivative_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentContext extends ParserRuleContext {
	public _lower!: Token;
	public _upper!: Token;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public LT_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.LT);
	}
	public LT(i: number): TerminalNode {
		return this.getToken(LatexParser.LT, i);
	}
	public LTE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.LTE);
	}
	public LTE(i: number): TerminalNode {
		return this.getToken(LatexParser.LTE, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_argument;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitArgument) {
			return visitor.visitArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public condition_single(): Condition_singleContext {
		return this.getTypedRuleContext(Condition_singleContext, 0) as Condition_singleContext;
	}
	public condition_chain(): Condition_chainContext {
		return this.getTypedRuleContext(Condition_chainContext, 0) as Condition_chainContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_condition;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitCondition) {
			return visitor.visitCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Id_listContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public id_list(): IdContext[] {
		return this.getTypedRuleContexts(IdContext) as IdContext[];
	}
	public id(i: number): IdContext {
		return this.getTypedRuleContext(IdContext, i) as IdContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LatexParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_id_list;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitId_list) {
			return visitor.visitId_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GuessContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public CMD_SIM(): TerminalNode {
		return this.getToken(LatexParser.CMD_SIM, 0);
	}
	public CMD_APPROX(): TerminalNode {
		return this.getToken(LatexParser.CMD_APPROX, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public number_with_units(): Number_with_unitsContext {
		return this.getTypedRuleContext(Number_with_unitsContext, 0) as Number_with_unitsContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_guess;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitGuess) {
			return visitor.visitGuess(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Guess_listContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public guess_list(): GuessContext[] {
		return this.getTypedRuleContexts(GuessContext) as GuessContext[];
	}
	public guess(i: number): GuessContext {
		return this.getTypedRuleContext(GuessContext, i) as GuessContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LatexParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_guess_list;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitGuess_list) {
			return visitor.visitGuess_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Condition_singleContext extends ParserRuleContext {
	public _operator!: Token;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public LT(): TerminalNode {
		return this.getToken(LatexParser.LT, 0);
	}
	public LTE(): TerminalNode {
		return this.getToken(LatexParser.LTE, 0);
	}
	public GT(): TerminalNode {
		return this.getToken(LatexParser.GT, 0);
	}
	public GTE(): TerminalNode {
		return this.getToken(LatexParser.GTE, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_condition_single;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitCondition_single) {
			return visitor.visitCondition_single(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Condition_chainContext extends ParserRuleContext {
	public _lower!: Token;
	public _upper!: Token;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public LT_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.LT);
	}
	public LT(i: number): TerminalNode {
		return this.getToken(LatexParser.LT, i);
	}
	public LTE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.LTE);
	}
	public LTE(i: number): TerminalNode {
		return this.getToken(LatexParser.LTE, i);
	}
	public GT_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.GT);
	}
	public GT(i: number): TerminalNode {
		return this.getToken(LatexParser.GT, i);
	}
	public GTE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.GTE);
	}
	public GTE(i: number): TerminalNode {
		return this.getToken(LatexParser.GTE, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_condition_chain;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitCondition_chain) {
			return visitor.visitCondition_chain(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Matrix_rowContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public AMPERSAND_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.AMPERSAND);
	}
	public AMPERSAND(i: number): TerminalNode {
		return this.getToken(LatexParser.AMPERSAND, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_matrix_row;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitMatrix_row) {
			return visitor.visitMatrix_row(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_expr;
	}
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class LnContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_LN(): TerminalNode {
		return this.getToken(LatexParser.CMD_LN, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	public BACKSLASH(): TerminalNode {
		return this.getToken(LatexParser.BACKSLASH, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitLn) {
			return visitor.visitLn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_LOG(): TerminalNode {
		return this.getToken(LatexParser.CMD_LOG, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	public BACKSLASH(): TerminalNode {
		return this.getToken(LatexParser.BACKSLASH, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitLog) {
			return visitor.visitLog(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BuiltinFunctionContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	public CMD_MATHRM(): TerminalNode {
		return this.getToken(LatexParser.CMD_MATHRM, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, 0);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LatexParser.COMMA, i);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitBuiltinFunction) {
			return visitor.visitBuiltinFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberExprContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitNumberExpr) {
			return visitor.visitNumberExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PiExprContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public PI(): TerminalNode {
		return this.getToken(LatexParser.PI, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitPiExpr) {
			return visitor.visitPiExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DerivativeContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public derivative_cmd(): Derivative_cmdContext {
		return this.getTypedRuleContext(Derivative_cmdContext, 0) as Derivative_cmdContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitDerivative) {
			return visitor.visitDerivative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MatrixContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public BEGIN_MATRIX(): TerminalNode {
		return this.getToken(LatexParser.BEGIN_MATRIX, 0);
	}
	public matrix_row_list(): Matrix_rowContext[] {
		return this.getTypedRuleContexts(Matrix_rowContext) as Matrix_rowContext[];
	}
	public matrix_row(i: number): Matrix_rowContext {
		return this.getTypedRuleContext(Matrix_rowContext, i) as Matrix_rowContext;
	}
	public END_MATRIX(): TerminalNode {
		return this.getToken(LatexParser.END_MATRIX, 0);
	}
	public DOUBLE_BACKSLASH_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.DOUBLE_BACKSLASH);
	}
	public DOUBLE_BACKSLASH(i: number): TerminalNode {
		return this.getToken(LatexParser.DOUBLE_BACKSLASH, i);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitMatrix) {
			return visitor.visitMatrix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SubExprContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitSubExpr) {
			return visitor.visitSubExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SqrtContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_SQRT(): TerminalNode {
		return this.getToken(LatexParser.CMD_SQRT, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitSqrt) {
			return visitor.visitSqrt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IntegralContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public integral_cmd(): Integral_cmdContext {
		return this.getTypedRuleContext(Integral_cmdContext, 0) as Integral_cmdContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitIntegral) {
			return visitor.visitIntegral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionContext extends ExprContext {
	public _points_id_0!: Token;
	public _num_points!: NumberContext;
	public _points_id_1!: Token;
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	public argument_list(): ArgumentContext[] {
		return this.getTypedRuleContexts(ArgumentContext) as ArgumentContext[];
	}
	public argument(i: number): ArgumentContext {
		return this.getTypedRuleContext(ArgumentContext, i) as ArgumentContext;
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(LatexParser.ID, i);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LatexParser.COMMA, i);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitFunction) {
			return visitor.visitFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndefiniteIntegralContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public indefinite_integral_cmd(): Indefinite_integral_cmdContext {
		return this.getTypedRuleContext(Indefinite_integral_cmdContext, 0) as Indefinite_integral_cmdContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitIndefiniteIntegral) {
			return visitor.visitIndefiniteIntegral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberWithUnitsExprContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public number_with_units(): Number_with_unitsContext {
		return this.getTypedRuleContext(Number_with_unitsContext, 0) as Number_with_unitsContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitNumberWithUnitsExpr) {
			return visitor.visitNumberWithUnitsExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DivideContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_FRAC(): TerminalNode {
		return this.getToken(LatexParser.CMD_FRAC, 0);
	}
	public L_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_BRACE);
	}
	public L_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, i);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_BRACE);
	}
	public R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, i);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitDivide) {
			return visitor.visitDivide(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplyContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public CMD_CDOT(): TerminalNode {
		return this.getToken(LatexParser.CMD_CDOT, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitMultiply) {
			return visitor.visitMultiply(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BaseLogSingleCharContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	public CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID(): TerminalNode {
		return this.getToken(LatexParser.CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID, 0);
	}
	public CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER(): TerminalNode {
		return this.getToken(LatexParser.CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitBaseLogSingleChar) {
			return visitor.visitBaseLogSingleChar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExponentContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT(): TerminalNode {
		return this.getToken(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT, 0);
	}
	public UNDERSCORE_SUBSCRIPT(): TerminalNode {
		return this.getToken(LatexParser.UNDERSCORE_SUBSCRIPT, 0);
	}
	public CARET_SINGLE_CHAR_ID(): TerminalNode {
		return this.getToken(LatexParser.CARET_SINGLE_CHAR_ID, 0);
	}
	public CARET_SINGLE_CHAR_NUMBER(): TerminalNode {
		return this.getToken(LatexParser.CARET_SINGLE_CHAR_NUMBER, 0);
	}
	public CARET(): TerminalNode {
		return this.getToken(LatexParser.CARET, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitExponent) {
			return visitor.visitExponent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BaseLogContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_SLASH_LOG_UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.CMD_SLASH_LOG_UNDERSCORE, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitBaseLog) {
			return visitor.visitBaseLog(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AddContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public ADD(): TerminalNode {
		return this.getToken(LatexParser.ADD, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitAdd) {
			return visitor.visitAdd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SingleIntSqrtContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_SQRT_INT(): TerminalNode {
		return this.getToken(LatexParser.CMD_SQRT_INT, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitSingleIntSqrt) {
			return visitor.visitSingleIntSqrt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SubtractContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public SUB(): TerminalNode {
		return this.getToken(LatexParser.SUB, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitSubtract) {
			return visitor.visitSubtract(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.UNDERSCORE, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, 0);
	}
	public COMMA(): TerminalNode {
		return this.getToken(LatexParser.COMMA, 0);
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitIndex) {
			return visitor.visitIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TrigContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public trig_function(): Trig_functionContext {
		return this.getTypedRuleContext(Trig_functionContext, 0) as Trig_functionContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitTrig) {
			return visitor.visitTrig(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DivideIntsContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_FRAC_INTS(): TerminalNode {
		return this.getToken(LatexParser.CMD_FRAC_INTS, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitDivideInts) {
			return visitor.visitDivideInts(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NDerivativeContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public n_derivative_cmd(): N_derivative_cmdContext {
		return this.getTypedRuleContext(N_derivative_cmdContext, 0) as N_derivative_cmdContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitNDerivative) {
			return visitor.visitNDerivative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AbsContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public VBAR_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.VBAR);
	}
	public VBAR(i: number): TerminalNode {
		return this.getToken(LatexParser.VBAR, i);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitAbs) {
			return visitor.visitAbs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MatrixMultiplyContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public CMD_TIMES(): TerminalNode {
		return this.getToken(LatexParser.CMD_TIMES, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitMatrixMultiply) {
			return visitor.visitMatrixMultiply(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryMinusContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public SUB(): TerminalNode {
		return this.getToken(LatexParser.SUB, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnaryMinus) {
			return visitor.visitUnaryMinus(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VariableContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitVariable) {
			return visitor.visitVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TransposeContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public TRANSPOSE(): TerminalNode {
		return this.getToken(LatexParser.TRANSPOSE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitTranspose) {
			return visitor.visitTranspose(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class U_blockContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public u_expr(): U_exprContext {
		return this.getTypedRuleContext(U_exprContext, 0) as U_exprContext;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(LatexParser.L_BRACKET, 0);
	}
	public ALT_L_BRACKET(): TerminalNode {
		return this.getToken(LatexParser.ALT_L_BRACKET, 0);
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(LatexParser.R_BRACKET, 0);
	}
	public ALT_R_BRACKET(): TerminalNode {
		return this.getToken(LatexParser.ALT_R_BRACKET, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_u_block;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitU_block) {
			return visitor.visitU_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class U_insert_matrixContext extends ParserRuleContext {
	public _numRows!: Token;
	public _numColumns!: Token;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(LatexParser.L_BRACKET, 0);
	}
	public ALT_L_BRACKET(): TerminalNode {
		return this.getToken(LatexParser.ALT_L_BRACKET, 0);
	}
	public U_COMMA(): TerminalNode {
		return this.getToken(LatexParser.U_COMMA, 0);
	}
	public U_CMD_TIMES(): TerminalNode {
		return this.getToken(LatexParser.U_CMD_TIMES, 0);
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(LatexParser.R_BRACKET, 0);
	}
	public ALT_R_BRACKET(): TerminalNode {
		return this.getToken(LatexParser.ALT_R_BRACKET, 0);
	}
	public U_NUMBER_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.U_NUMBER);
	}
	public U_NUMBER(i: number): TerminalNode {
		return this.getToken(LatexParser.U_NUMBER, i);
	}
	public U_ONE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.U_ONE);
	}
	public U_ONE(i: number): TerminalNode {
		return this.getToken(LatexParser.U_ONE, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_u_insert_matrix;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitU_insert_matrix) {
			return visitor.visitU_insert_matrix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class U_fractionContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public U_CMD_FRAC(): TerminalNode {
		return this.getToken(LatexParser.U_CMD_FRAC, 0);
	}
	public U_L_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.U_L_BRACE);
	}
	public U_L_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.U_L_BRACE, i);
	}
	public U_R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.U_R_BRACE);
	}
	public U_R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.U_R_BRACE, i);
	}
	public U_NUMBER_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.U_NUMBER);
	}
	public U_NUMBER(i: number): TerminalNode {
		return this.getToken(LatexParser.U_NUMBER, i);
	}
	public U_ONE(): TerminalNode {
		return this.getToken(LatexParser.U_ONE, 0);
	}
	public U_CMD_FRAC_INTS(): TerminalNode {
		return this.getToken(LatexParser.U_CMD_FRAC_INTS, 0);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_u_fraction;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitU_fraction) {
			return visitor.visitU_fraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class U_exprContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_u_expr;
	}
	public copyFrom(ctx: U_exprContext): void {
		super.copyFrom(ctx);
	}
}
export class UnitSubExprContext extends U_exprContext {
	constructor(parser: LatexParser, ctx: U_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public U_L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.U_L_PAREN, 0);
	}
	public u_expr(): U_exprContext {
		return this.getTypedRuleContext(U_exprContext, 0) as U_exprContext;
	}
	public U_R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.U_R_PAREN, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnitSubExpr) {
			return visitor.visitUnitSubExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnitExponentContext extends U_exprContext {
	constructor(parser: LatexParser, ctx: U_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public u_expr(): U_exprContext {
		return this.getTypedRuleContext(U_exprContext, 0) as U_exprContext;
	}
	public U_CARET(): TerminalNode {
		return this.getToken(LatexParser.U_CARET, 0);
	}
	public U_NUMBER(): TerminalNode {
		return this.getToken(LatexParser.U_NUMBER, 0);
	}
	public U_L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.U_L_BRACE, 0);
	}
	public U_R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.U_R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnitExponent) {
			return visitor.visitUnitExponent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnitDivideContext extends U_exprContext {
	constructor(parser: LatexParser, ctx: U_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public U_CMD_FRAC(): TerminalNode {
		return this.getToken(LatexParser.U_CMD_FRAC, 0);
	}
	public U_L_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.U_L_BRACE);
	}
	public U_L_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.U_L_BRACE, i);
	}
	public U_R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.U_R_BRACE);
	}
	public U_R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.U_R_BRACE, i);
	}
	public u_expr_list(): U_exprContext[] {
		return this.getTypedRuleContexts(U_exprContext) as U_exprContext[];
	}
	public u_expr(i: number): U_exprContext {
		return this.getTypedRuleContext(U_exprContext, i) as U_exprContext;
	}
	public U_ONE(): TerminalNode {
		return this.getToken(LatexParser.U_ONE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnitDivide) {
			return visitor.visitUnitDivide(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnitMultiplyContext extends U_exprContext {
	constructor(parser: LatexParser, ctx: U_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public u_expr_list(): U_exprContext[] {
		return this.getTypedRuleContexts(U_exprContext) as U_exprContext[];
	}
	public u_expr(i: number): U_exprContext {
		return this.getTypedRuleContext(U_exprContext, i) as U_exprContext;
	}
	public U_CMD_CDOT(): TerminalNode {
		return this.getToken(LatexParser.U_CMD_CDOT, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnitMultiply) {
			return visitor.visitUnitMultiply(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnitNameContext extends U_exprContext {
	constructor(parser: LatexParser, ctx: U_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public U_NAME(): TerminalNode {
		return this.getToken(LatexParser.U_NAME, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnitName) {
			return visitor.visitUnitName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnitSqrtContext extends U_exprContext {
	constructor(parser: LatexParser, ctx: U_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public U_CMD_SQRT(): TerminalNode {
		return this.getToken(LatexParser.U_CMD_SQRT, 0);
	}
	public U_L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.U_L_BRACE, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public U_R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.U_R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnitSqrt) {
			return visitor.visitUnitSqrt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnitFractionalExponentContext extends U_exprContext {
	constructor(parser: LatexParser, ctx: U_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public u_expr(): U_exprContext {
		return this.getTypedRuleContext(U_exprContext, 0) as U_exprContext;
	}
	public U_CARET(): TerminalNode {
		return this.getToken(LatexParser.U_CARET, 0);
	}
	public u_fraction(): U_fractionContext {
		return this.getTypedRuleContext(U_fractionContext, 0) as U_fractionContext;
	}
	public U_L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.U_L_BRACE, 0);
	}
	public U_R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.U_R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnitFractionalExponent) {
			return visitor.visitUnitFractionalExponent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
