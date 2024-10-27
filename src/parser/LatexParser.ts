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
	public static readonly DOUBLE_VBAR = 9;
	public static readonly UNDERSCORE = 10;
	public static readonly EXCLAMATION = 11;
	public static readonly PI = 12;
	public static readonly INFINITY = 13;
	public static readonly CMD_INT = 14;
	public static readonly CMD_INT_UNDERSCORE = 15;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER = 16;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_ID = 17;
	public static readonly CMD_SUM_UNDERSCORE = 18;
	public static readonly CMD_MATHRM = 19;
	public static readonly CMD_FRAC = 20;
	public static readonly CMD_FRAC_INTS = 21;
	public static readonly CMD_CDOT = 22;
	public static readonly CMD_TIMES = 23;
	public static readonly CMD_SQRT = 24;
	public static readonly CMD_SQRT_INT = 25;
	public static readonly CMD_SIM = 26;
	public static readonly CMD_APPROX = 27;
	public static readonly CMD_PLACEHOLDER = 28;
	public static readonly TRANSPOSE = 29;
	public static readonly BACKSLASH = 30;
	public static readonly AS_LINES = 31;
	public static readonly CMD_SIN = 32;
	public static readonly CMD_COS = 33;
	public static readonly CMD_TAN = 34;
	public static readonly CMD_COT = 35;
	public static readonly CMD_SEC = 36;
	public static readonly CMD_CSC = 37;
	public static readonly CMD_ARCSIN = 38;
	public static readonly CMD_ARCCOS = 39;
	public static readonly CMD_ARCTAN = 40;
	public static readonly CMD_SINH = 41;
	public static readonly CMD_COSH = 42;
	public static readonly CMD_TANH = 43;
	public static readonly CMD_COTH = 44;
	public static readonly CMD_LN = 45;
	public static readonly CMD_LOG = 46;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 47;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER = 48;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID = 49;
	public static readonly COMMENT = 50;
	public static readonly CMD_LEFT = 51;
	public static readonly CMD_RIGHT = 52;
	public static readonly DOUBLE_DOLLAR_SIGN = 53;
	public static readonly ADD = 54;
	public static readonly SUB = 55;
	public static readonly CARET = 56;
	public static readonly EQ = 57;
	public static readonly LT = 58;
	public static readonly GT = 59;
	public static readonly LTE = 60;
	public static readonly GTE = 61;
	public static readonly COMMA = 62;
	public static readonly DECIMAL_POINT = 63;
	public static readonly CARET_SINGLE_CHAR_NUMBER = 64;
	public static readonly CARET_SINGLE_CHAR_ID = 65;
	public static readonly NUMBER = 66;
	public static readonly BEGIN_MATRIX = 67;
	public static readonly END_MATRIX = 68;
	public static readonly AMPERSAND = 69;
	public static readonly DOUBLE_BACKSLASH = 70;
	public static readonly UNDERSCORE_SUBSCRIPT = 71;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 72;
	public static readonly ID = 73;
	public static readonly WS = 74;
	public static readonly SLASH_SPACE = 75;
	public static readonly SLASH_COLON = 76;
	public static readonly NBSP = 77;
	public static readonly ERROR_CHAR = 78;
	public static readonly R_BRACKET = 79;
	public static readonly ALT_R_BRACKET = 80;
	public static readonly U_CMD_FRAC = 81;
	public static readonly U_CMD_FRAC_INTS = 82;
	public static readonly U_CMD_CDOT = 83;
	public static readonly U_CMD_TIMES = 84;
	public static readonly U_CMD_SQRT = 85;
	public static readonly U_COMMA = 86;
	public static readonly U_CARET = 87;
	public static readonly U_NAME = 88;
	public static readonly U_L_PAREN = 89;
	public static readonly U_R_PAREN = 90;
	public static readonly U_L_BRACE = 91;
	public static readonly U_R_BRACE = 92;
	public static readonly U_ONE = 93;
	public static readonly U_NUMBER = 94;
	public static readonly U_CMD_LEFT = 95;
	public static readonly U_CMD_RIGHT = 96;
	public static readonly U_WS = 97;
	public static readonly U_SLASH_SPACE = 98;
	public static readonly U_SLASH_COLON = 99;
	public static readonly U_NBSP = 100;
	public static readonly U_ERROR_CHAR = 101;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_statement = 0;
	public static readonly RULE_scatter_plot_query = 1;
	public static readonly RULE_parametric_plot_query = 2;
	public static readonly RULE_insert_matrix = 3;
	public static readonly RULE_id = 4;
	public static readonly RULE_number = 5;
	public static readonly RULE_number_with_units = 6;
	public static readonly RULE_assign = 7;
	public static readonly RULE_assign_list = 8;
	public static readonly RULE_assign_plus_query = 9;
	public static readonly RULE_query = 10;
	public static readonly RULE_equality = 11;
	public static readonly RULE_piecewise_assign = 12;
	public static readonly RULE_piecewise_arg = 13;
	public static readonly RULE_trig_function = 14;
	public static readonly RULE_indefinite_integral_cmd = 15;
	public static readonly RULE_integral_cmd = 16;
	public static readonly RULE_summation_cmd = 17;
	public static readonly RULE_derivative_cmd = 18;
	public static readonly RULE_n_derivative_cmd = 19;
	public static readonly RULE_argument = 20;
	public static readonly RULE_condition = 21;
	public static readonly RULE_id_list = 22;
	public static readonly RULE_guess = 23;
	public static readonly RULE_guess_list = 24;
	public static readonly RULE_condition_single = 25;
	public static readonly RULE_condition_chain = 26;
	public static readonly RULE_matrix_row = 27;
	public static readonly RULE_user_function = 28;
	public static readonly RULE_builtin_function = 29;
	public static readonly RULE_expr = 30;
	public static readonly RULE_u_block = 31;
	public static readonly RULE_u_insert_matrix = 32;
	public static readonly RULE_u_fraction = 33;
	public static readonly RULE_u_expr = 34;
	public static readonly literalNames: (string | null)[] = [ null, "'['", 
                                                            "'\\lbrack'", 
                                                            "';'", null, 
                                                            null, null, 
                                                            null, "'|'", 
                                                            null, "'_'", 
                                                            "'!'", "'\\pi'", 
                                                            "'\\infty'", 
                                                            "'\\int'", null, 
                                                            null, null, 
                                                            null, "'\\mathrm'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\sim'", "'\\approx'", 
                                                            "'\\placeholder'", 
                                                            "'^{\\mathrm{T}}'", 
                                                            "'\\'", null, 
                                                            "'sin'", "'cos'", 
                                                            "'tan'", "'cot'", 
                                                            "'sec'", "'csc'", 
                                                            "'arcsin'", 
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
                                                            "'.'", null, 
                                                            null, null, 
                                                            "'\\begin{bmatrix}'", 
                                                            "'\\end{bmatrix}'", 
                                                            "'&'", "'\\\\'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "']'", "'\\rbrack'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'1'", null, 
                                                            "'\\left'", 
                                                            "'\\right'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "L_BRACKET", 
                                                             "ALT_L_BRACKET", 
                                                             "SEMICOLON", 
                                                             "L_BRACE", 
                                                             "R_BRACE", 
                                                             "L_PAREN", 
                                                             "R_PAREN", 
                                                             "VBAR", "DOUBLE_VBAR", 
                                                             "UNDERSCORE", 
                                                             "EXCLAMATION", 
                                                             "PI", "INFINITY", 
                                                             "CMD_INT", 
                                                             "CMD_INT_UNDERSCORE", 
                                                             "CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER", 
                                                             "CMD_INT_UNDERSCORE_SINGLE_CHAR_ID", 
                                                             "CMD_SUM_UNDERSCORE", 
                                                             "CMD_MATHRM", 
                                                             "CMD_FRAC", 
                                                             "CMD_FRAC_INTS", 
                                                             "CMD_CDOT", 
                                                             "CMD_TIMES", 
                                                             "CMD_SQRT", 
                                                             "CMD_SQRT_INT", 
                                                             "CMD_SIM", 
                                                             "CMD_APPROX", 
                                                             "CMD_PLACEHOLDER", 
                                                             "TRANSPOSE", 
                                                             "BACKSLASH", 
                                                             "AS_LINES", 
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
                                                             "COMMA", "DECIMAL_POINT", 
                                                             "CARET_SINGLE_CHAR_NUMBER", 
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
                                                             "NBSP", "ERROR_CHAR", 
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
                                                             "U_SLASH_COLON", 
                                                             "U_NBSP", "U_ERROR_CHAR" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"statement", "scatter_plot_query", "parametric_plot_query", "insert_matrix", 
		"id", "number", "number_with_units", "assign", "assign_list", "assign_plus_query", 
		"query", "equality", "piecewise_assign", "piecewise_arg", "trig_function", 
		"indefinite_integral_cmd", "integral_cmd", "summation_cmd", "derivative_cmd", 
		"n_derivative_cmd", "argument", "condition", "id_list", "guess", "guess_list", 
		"condition_single", "condition_chain", "matrix_row", "user_function", 
		"builtin_function", "expr", "u_block", "u_insert_matrix", "u_fraction", 
		"u_expr",
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
			this.state = 87;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 70;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 71;
				this.assign_list();
				}
				break;
			case 3:
				{
				this.state = 72;
				this.assign_plus_query();
				}
				break;
			case 4:
				{
				this.state = 73;
				this.query();
				}
				break;
			case 5:
				{
				this.state = 74;
				this.equality();
				}
				break;
			case 6:
				{
				this.state = 75;
				this.u_block();
				}
				break;
			case 7:
				{
				this.state = 76;
				this.number_();
				}
				break;
			case 8:
				{
				this.state = 77;
				this.id();
				}
				break;
			case 9:
				{
				this.state = 78;
				this.id_list();
				}
				break;
			case 10:
				{
				this.state = 79;
				this.guess();
				}
				break;
			case 11:
				{
				this.state = 80;
				this.guess_list();
				}
				break;
			case 12:
				{
				this.state = 81;
				this.expr(0);
				}
				break;
			case 13:
				{
				this.state = 82;
				this.condition();
				}
				break;
			case 14:
				{
				this.state = 83;
				this.piecewise_assign();
				}
				break;
			case 15:
				{
				this.state = 84;
				this.insert_matrix();
				}
				break;
			case 16:
				{
				this.state = 85;
				this.scatter_plot_query();
				}
				break;
			case 17:
				{
				this.state = 86;
				this.parametric_plot_query();
				}
				break;
			}
			this.state = 89;
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
	public scatter_plot_query(): Scatter_plot_queryContext {
		let localctx: Scatter_plot_queryContext = new Scatter_plot_queryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, LatexParser.RULE_scatter_plot_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 101;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				{
				this.state = 91;
				this.match(LatexParser.L_PAREN);
				this.state = 92;
				this.expr(0);
				this.state = 93;
				this.match(LatexParser.COMMA);
				this.state = 94;
				this.expr(0);
				this.state = 95;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 2:
				{
				{
				this.state = 97;
				this.expr(0);
				this.state = 98;
				this.match(LatexParser.COMMA);
				this.state = 99;
				this.expr(0);
				}
				}
				break;
			}
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===31) {
				{
				this.state = 103;
				this.match(LatexParser.AS_LINES);
				}
			}

			this.state = 106;
			this.match(LatexParser.EQ);
			this.state = 117;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				{
				{
				this.state = 107;
				this.match(LatexParser.L_PAREN);
				this.state = 108;
				this.u_block();
				this.state = 109;
				this.match(LatexParser.COMMA);
				this.state = 110;
				this.u_block();
				this.state = 111;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 113;
				this.u_block();
				this.state = 114;
				this.match(LatexParser.COMMA);
				this.state = 115;
				this.u_block();
				}
				}
				break;
			case -1:
				break;
			default:
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
	public parametric_plot_query(): Parametric_plot_queryContext {
		let localctx: Parametric_plot_queryContext = new Parametric_plot_queryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, LatexParser.RULE_parametric_plot_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 119;
			this.match(LatexParser.L_PAREN);
			this.state = 120;
			this.expr(0);
			this.state = 121;
			this.match(LatexParser.COMMA);
			this.state = 122;
			this.expr(0);
			this.state = 123;
			this.match(LatexParser.R_PAREN);
			}
			this.state = 125;
			localctx._for_id = this.match(LatexParser.ID);
			this.state = 126;
			this.match(LatexParser.L_PAREN);
			this.state = 127;
			this.argument();
			this.state = 128;
			this.match(LatexParser.R_PAREN);
			this.state = 133;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===73) {
				{
				this.state = 129;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 130;
				localctx._num_points = this.number_();
				this.state = 131;
				localctx._points_id_1 = this.match(LatexParser.ID);
				}
			}

			this.state = 135;
			this.match(LatexParser.EQ);
			this.state = 146;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				{
				{
				this.state = 136;
				this.match(LatexParser.L_PAREN);
				this.state = 137;
				this.u_block();
				this.state = 138;
				this.match(LatexParser.COMMA);
				this.state = 139;
				this.u_block();
				this.state = 140;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 142;
				this.u_block();
				this.state = 143;
				this.match(LatexParser.COMMA);
				this.state = 144;
				this.u_block();
				}
				}
				break;
			case -1:
				break;
			default:
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
	public insert_matrix(): Insert_matrixContext {
		let localctx: Insert_matrixContext = new Insert_matrixContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, LatexParser.RULE_insert_matrix);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 151;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 148;
					this.matchWildcard();
					}
					}
				}
				this.state = 153;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 161;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 154;
				this.u_insert_matrix();
				this.state = 158;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 155;
						this.matchWildcard();
						}
						}
					}
					this.state = 160;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				}
				}
				}
				this.state = 163;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===1 || _la===2);
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
		this.enterRule(localctx, 8, LatexParser.RULE_id);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 165;
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
		this.enterRule(localctx, 10, LatexParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 168;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===55) {
				{
				this.state = 167;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 170;
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
		this.enterRule(localctx, 12, LatexParser.RULE_number_with_units);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 175;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 55:
			case 66:
				{
				this.state = 172;
				this.number_();
				}
				break;
			case 12:
				{
				this.state = 173;
				this.match(LatexParser.PI);
				}
				break;
			case 73:
				{
				this.state = 174;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 177;
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
		this.enterRule(localctx, 14, LatexParser.RULE_assign);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 181;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 73:
				{
				this.state = 179;
				this.id();
				}
				break;
			case 12:
				{
				this.state = 180;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 183;
			this.match(LatexParser.EQ);
			this.state = 184;
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
		this.enterRule(localctx, 16, LatexParser.RULE_assign_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			this.assign();
			this.state = 189;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 187;
				this.match(LatexParser.COMMA);
				this.state = 188;
				this.assign();
				}
				}
				this.state = 191;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===62);
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
		this.enterRule(localctx, 18, LatexParser.RULE_assign_plus_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 193;
			this.assign();
			this.state = 194;
			this.match(LatexParser.EQ);
			this.state = 196;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 195;
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
		this.enterRule(localctx, 20, LatexParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 198;
			this.expr(0);
			this.state = 199;
			this.match(LatexParser.EQ);
			this.state = 201;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 200;
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
		this.enterRule(localctx, 22, LatexParser.RULE_equality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 203;
			this.expr(0);
			this.state = 204;
			this.match(LatexParser.EQ);
			this.state = 205;
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
		this.enterRule(localctx, 24, LatexParser.RULE_piecewise_assign);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 73:
				{
				this.state = 207;
				this.id();
				}
				break;
			case 12:
				{
				this.state = 208;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 211;
			this.match(LatexParser.EQ);
			this.state = 212;
			this.id();
			this.state = 213;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 214;
			this.piecewise_arg();
			this.state = 219;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===62) {
				{
				{
				this.state = 215;
				this.match(LatexParser.COMMA);
				this.state = 216;
				this.piecewise_arg();
				}
				}
				this.state = 221;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 222;
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
		this.enterRule(localctx, 26, LatexParser.RULE_piecewise_arg);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 224;
			this.match(LatexParser.L_PAREN);
			this.state = 225;
			this.expr(0);
			this.state = 226;
			this.match(LatexParser.COMMA);
			this.state = 227;
			this.condition();
			this.state = 228;
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
		this.enterRule(localctx, 28, LatexParser.RULE_trig_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===30) {
				{
				this.state = 230;
				this.match(LatexParser.BACKSLASH);
				}
			}

			this.state = 233;
			_la = this._input.LA(1);
			if(!(((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 234;
			this.match(LatexParser.L_PAREN);
			this.state = 235;
			this.expr(0);
			this.state = 236;
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
	public indefinite_integral_cmd(): Indefinite_integral_cmdContext {
		let localctx: Indefinite_integral_cmdContext = new Indefinite_integral_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, LatexParser.RULE_indefinite_integral_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 245;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 14:
				{
				this.state = 238;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 15:
				{
				{
				this.state = 239;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 240;
				this.match(LatexParser.L_BRACE);
				this.state = 241;
				this.match(LatexParser.R_BRACE);
				this.state = 242;
				this.match(LatexParser.CARET);
				this.state = 243;
				this.match(LatexParser.L_BRACE);
				this.state = 244;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 247;
			this.match(LatexParser.L_PAREN);
			this.state = 248;
			this.expr(0);
			this.state = 249;
			this.match(LatexParser.R_PAREN);
			this.state = 256;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				{
				this.state = 250;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 251;
				this.match(LatexParser.L_BRACE);
				this.state = 252;
				this.id();
				this.state = 253;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 73:
				{
				this.state = 255;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 258;
			this.match(LatexParser.L_PAREN);
			this.state = 259;
			this.id();
			this.state = 260;
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
		this.enterRule(localctx, 32, LatexParser.RULE_integral_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 268;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				{
				this.state = 262;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 263;
				this.match(LatexParser.L_BRACE);
				this.state = 264;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 265;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 16:
			case 17:
				{
				this.state = 267;
				_la = this._input.LA(1);
				if(!(_la===16 || _la===17)) {
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
			this.state = 276;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 56:
				{
				{
				this.state = 270;
				this.match(LatexParser.CARET);
				this.state = 271;
				this.match(LatexParser.L_BRACE);
				this.state = 272;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 273;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 64:
			case 65:
				{
				this.state = 275;
				_la = this._input.LA(1);
				if(!(_la===64 || _la===65)) {
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
			this.state = 278;
			this.match(LatexParser.L_PAREN);
			this.state = 279;
			localctx._integrand_expr = this.expr(0);
			this.state = 280;
			this.match(LatexParser.R_PAREN);
			this.state = 287;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				{
				this.state = 281;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 282;
				this.match(LatexParser.L_BRACE);
				this.state = 283;
				this.id();
				this.state = 284;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 73:
				{
				this.state = 286;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 289;
			this.match(LatexParser.L_PAREN);
			this.state = 290;
			this.id();
			this.state = 291;
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
	public summation_cmd(): Summation_cmdContext {
		let localctx: Summation_cmdContext = new Summation_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, LatexParser.RULE_summation_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 293;
			this.match(LatexParser.CMD_SUM_UNDERSCORE);
			this.state = 294;
			this.match(LatexParser.L_BRACE);
			this.state = 295;
			this.id();
			this.state = 296;
			this.match(LatexParser.EQ);
			this.state = 297;
			localctx._start_expr = this.expr(0);
			this.state = 298;
			this.match(LatexParser.R_BRACE);
			}
			this.state = 306;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 56:
				{
				{
				this.state = 300;
				this.match(LatexParser.CARET);
				this.state = 301;
				this.match(LatexParser.L_BRACE);
				this.state = 302;
				localctx._end_expr = this.expr(0);
				this.state = 303;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 64:
			case 65:
				{
				this.state = 305;
				_la = this._input.LA(1);
				if(!(_la===64 || _la===65)) {
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
			this.state = 308;
			this.match(LatexParser.L_PAREN);
			this.state = 309;
			localctx._operand_expr = this.expr(0);
			this.state = 310;
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
		this.enterRule(localctx, 36, LatexParser.RULE_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 312;
			this.match(LatexParser.CMD_FRAC);
			this.state = 313;
			this.match(LatexParser.L_BRACE);
			this.state = 320;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				{
				this.state = 314;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 315;
				this.match(LatexParser.L_BRACE);
				this.state = 316;
				this.id();
				this.state = 317;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 73:
				{
				this.state = 319;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 322;
			this.match(LatexParser.R_BRACE);
			this.state = 323;
			this.match(LatexParser.L_BRACE);
			this.state = 330;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				{
				this.state = 324;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 325;
				this.match(LatexParser.L_BRACE);
				this.state = 326;
				this.id();
				this.state = 327;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 73:
				{
				this.state = 329;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 332;
			this.match(LatexParser.L_PAREN);
			this.state = 333;
			this.id();
			this.state = 334;
			this.match(LatexParser.R_PAREN);
			this.state = 335;
			this.match(LatexParser.R_BRACE);
			this.state = 336;
			this.match(LatexParser.L_PAREN);
			this.state = 337;
			this.expr(0);
			this.state = 338;
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
		this.enterRule(localctx, 38, LatexParser.RULE_n_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 340;
			this.match(LatexParser.CMD_FRAC);
			this.state = 341;
			this.match(LatexParser.L_BRACE);
			this.state = 348;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				{
				this.state = 342;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 343;
				this.match(LatexParser.L_BRACE);
				this.state = 344;
				this.id();
				this.state = 345;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 73:
				{
				this.state = 347;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 356;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 56:
				{
				{
				this.state = 350;
				this.match(LatexParser.CARET);
				this.state = 351;
				this.match(LatexParser.L_BRACE);
				this.state = 352;
				this.number_();
				this.state = 353;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 64:
				{
				this.state = 355;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 358;
			this.match(LatexParser.R_BRACE);
			this.state = 359;
			this.match(LatexParser.L_BRACE);
			this.state = 366;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				{
				this.state = 360;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 361;
				this.match(LatexParser.L_BRACE);
				this.state = 362;
				this.id();
				this.state = 363;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 73:
				{
				this.state = 365;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 368;
			this.match(LatexParser.L_PAREN);
			this.state = 369;
			this.id();
			this.state = 370;
			this.match(LatexParser.R_PAREN);
			this.state = 377;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 56:
				{
				{
				this.state = 371;
				this.match(LatexParser.CARET);
				this.state = 372;
				this.match(LatexParser.L_BRACE);
				this.state = 373;
				this.number_();
				this.state = 374;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 64:
				{
				this.state = 376;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 379;
			this.match(LatexParser.R_BRACE);
			this.state = 380;
			this.match(LatexParser.L_PAREN);
			this.state = 381;
			this.expr(0);
			this.state = 382;
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
		this.enterRule(localctx, 40, LatexParser.RULE_argument);
		let _la: number;
		try {
			this.state = 394;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 384;
				this.id();
				this.state = 385;
				this.match(LatexParser.EQ);
				this.state = 386;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 388;
				this.expr(0);
				this.state = 389;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===58 || _la===60)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 390;
				this.id();
				this.state = 391;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===58 || _la===60)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 392;
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
		this.enterRule(localctx, 42, LatexParser.RULE_condition);
		try {
			this.state = 398;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 396;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 397;
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
		this.enterRule(localctx, 44, LatexParser.RULE_id_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 400;
			this.id();
			this.state = 403;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 401;
				this.match(LatexParser.COMMA);
				this.state = 402;
				this.id();
				}
				}
				this.state = 405;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===62);
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
		this.enterRule(localctx, 46, LatexParser.RULE_guess);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 407;
			this.id();
			this.state = 408;
			_la = this._input.LA(1);
			if(!(_la===26 || _la===27)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 411;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				this.state = 409;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 410;
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
		this.enterRule(localctx, 48, LatexParser.RULE_guess_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 413;
			this.guess();
			this.state = 416;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 414;
				this.match(LatexParser.COMMA);
				this.state = 415;
				this.guess();
				}
				}
				this.state = 418;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===62);
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
		this.enterRule(localctx, 50, LatexParser.RULE_condition_single);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 420;
			this.expr(0);
			this.state = 421;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 422;
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
		this.enterRule(localctx, 52, LatexParser.RULE_condition_chain);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 424;
			this.expr(0);
			this.state = 425;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 426;
			this.expr(0);
			this.state = 427;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 428;
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
		this.enterRule(localctx, 54, LatexParser.RULE_matrix_row);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 430;
			this.expr(0);
			this.state = 435;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===69) {
				{
				{
				this.state = 431;
				this.match(LatexParser.AMPERSAND);
				this.state = 432;
				this.expr(0);
				}
				}
				this.state = 437;
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
	// @RuleVersion(0)
	public user_function(): User_functionContext {
		let localctx: User_functionContext = new User_functionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, LatexParser.RULE_user_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 438;
			this.id();
			this.state = 439;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 440;
			this.argument();
			this.state = 445;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===62) {
				{
				{
				this.state = 441;
				this.match(LatexParser.COMMA);
				this.state = 442;
				this.argument();
				}
				}
				this.state = 447;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 448;
			this.match(LatexParser.R_PAREN);
			this.state = 453;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				{
				this.state = 449;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 450;
				localctx._num_points = this.number_();
				this.state = 451;
				localctx._points_id_1 = this.match(LatexParser.ID);
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
	public builtin_function(): Builtin_functionContext {
		let localctx: Builtin_functionContext = new Builtin_functionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, LatexParser.RULE_builtin_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 461;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				{
				this.state = 455;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 456;
				this.match(LatexParser.L_BRACE);
				this.state = 457;
				this.id();
				this.state = 458;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 73:
				{
				this.state = 460;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 463;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 464;
			this.expr(0);
			this.state = 469;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===62) {
				{
				{
				this.state = 465;
				this.match(LatexParser.COMMA);
				this.state = 466;
				this.expr(0);
				}
				}
				this.state = 471;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 472;
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
		let _startState: number = 60;
		this.enterRecursionRule(localctx, 60, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 605;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 475;
				this.id();
				this.state = 476;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 478;
				this.id();
				this.state = 479;
				_la = this._input.LA(1);
				if(!(_la===64 || _la===65)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 480;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 482;
				this.id();
				this.state = 483;
				this.match(LatexParser.CARET);
				this.state = 484;
				this.match(LatexParser.L_BRACE);
				this.state = 485;
				this.expr(0);
				this.state = 486;
				this.match(LatexParser.R_BRACE);
				this.state = 487;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 489;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 490;
				this.match(LatexParser.CMD_SQRT);
				this.state = 491;
				this.match(LatexParser.L_BRACE);
				this.state = 492;
				this.expr(0);
				this.state = 493;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new MatrixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 495;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 496;
				this.matrix_row();
				this.state = 501;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===70) {
					{
					{
					this.state = 497;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 498;
					this.matrix_row();
					}
					}
					this.state = 503;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 504;
				this.match(LatexParser.END_MATRIX);
				}
				break;
			case 7:
				{
				localctx = new TrigFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 506;
				this.trig_function();
				}
				break;
			case 8:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 507;
				this.indefinite_integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 508;
				this.integral_cmd();
				}
				break;
			case 10:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 509;
				this.derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 510;
				this.n_derivative_cmd();
				}
				break;
			case 12:
				{
				localctx = new SummationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 511;
				this.summation_cmd();
				}
				break;
			case 13:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 513;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===30) {
					{
					this.state = 512;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 515;
				this.match(LatexParser.CMD_LN);
				this.state = 516;
				this.match(LatexParser.L_PAREN);
				this.state = 517;
				this.expr(0);
				this.state = 518;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===30) {
					{
					this.state = 520;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 523;
				this.match(LatexParser.CMD_LOG);
				this.state = 524;
				this.match(LatexParser.L_PAREN);
				this.state = 525;
				this.expr(0);
				this.state = 526;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 528;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 529;
				this.match(LatexParser.L_BRACE);
				this.state = 530;
				this.expr(0);
				this.state = 531;
				this.match(LatexParser.R_BRACE);
				this.state = 532;
				this.match(LatexParser.L_PAREN);
				this.state = 533;
				this.expr(0);
				this.state = 534;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 16:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 536;
				_la = this._input.LA(1);
				if(!(_la===48 || _la===49)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 537;
				this.match(LatexParser.L_PAREN);
				this.state = 538;
				this.expr(0);
				this.state = 539;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 17:
				{
				localctx = new NormContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 541;
				this.match(LatexParser.DOUBLE_VBAR);
				this.state = 542;
				this.expr(0);
				this.state = 543;
				this.match(LatexParser.DOUBLE_VBAR);
				}
				break;
			case 18:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 545;
				this.match(LatexParser.VBAR);
				this.state = 546;
				this.expr(0);
				this.state = 547;
				this.match(LatexParser.VBAR);
				}
				break;
			case 19:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 549;
				this.number_with_units();
				}
				break;
			case 20:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 550;
				this.number_();
				}
				break;
			case 21:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 551;
				this.match(LatexParser.SUB);
				this.state = 552;
				this.expr(31);
				}
				break;
			case 22:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 553;
				this.match(LatexParser.CMD_FRAC);
				this.state = 554;
				this.match(LatexParser.L_BRACE);
				this.state = 555;
				this.expr(0);
				this.state = 556;
				this.match(LatexParser.R_BRACE);
				this.state = 557;
				this.match(LatexParser.L_BRACE);
				this.state = 558;
				this.expr(0);
				this.state = 559;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 23:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 561;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 24:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 562;
				this.id();
				}
				break;
			case 25:
				{
				localctx = new UserFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 563;
				this.user_function();
				}
				break;
			case 26:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 564;
				this.builtin_function();
				}
				break;
			case 27:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 565;
				this.match(LatexParser.PI);
				}
				break;
			case 28:
				{
				localctx = new InfinityExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 566;
				this.match(LatexParser.INFINITY);
				}
				break;
			case 29:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 567;
				this.match(LatexParser.L_PAREN);
				this.state = 568;
				this.expr(0);
				this.state = 569;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 30:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 571;
				this.number_();
				this.state = 572;
				this.expr(12);
				}
				break;
			case 31:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 574;
				this.number_with_units();
				this.state = 575;
				this.expr(11);
				}
				break;
			case 32:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 577;
				this.match(LatexParser.PI);
				this.state = 578;
				this.expr(10);
				}
				break;
			case 33:
				{
				localctx = new EmptyPlaceholderContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 579;
				this.match(LatexParser.CMD_PLACEHOLDER);
				this.state = 582;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 43, this._ctx) ) {
				case 1:
					{
					this.state = 580;
					this.match(LatexParser.L_BRACE);
					this.state = 581;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				}
				break;
			case 34:
				{
				localctx = new RemoveOperatorFontContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 589;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 44, this._ctx) ) {
				case 1:
					{
					this.state = 584;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 585;
					this.match(LatexParser.L_BRACE);
					this.state = 586;
					this.expr(0);
					this.state = 587;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				this.state = 594;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 63:
					{
					this.state = 591;
					this.match(LatexParser.DECIMAL_POINT);
					}
					break;
				case 55:
				case 66:
					{
					this.state = 592;
					this.number_();
					}
					break;
				case 57:
					{
					this.state = 593;
					this.match(LatexParser.EQ);
					}
					break;
				case 19:
					break;
				default:
					break;
				}
				this.state = 596;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 597;
				this.match(LatexParser.L_BRACE);
				this.state = 598;
				this.expr(0);
				this.state = 599;
				this.match(LatexParser.R_BRACE);
				this.state = 603;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 46, this._ctx) ) {
				case 1:
					{
					this.state = 600;
					this.match(LatexParser.DECIMAL_POINT);
					}
					break;
				case 2:
					{
					this.state = 601;
					this.number_();
					}
					break;
				case 3:
					{
					this.state = 602;
					this.match(LatexParser.EQ);
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 671;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 669;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 48, this._ctx) ) {
					case 1:
						{
						localctx = new MatrixMultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 607;
						if (!(this.precpred(this._ctx, 30))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 30)");
						}
						this.state = 608;
						this.match(LatexParser.CMD_TIMES);
						this.state = 609;
						this.expr(31);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 610;
						if (!(this.precpred(this._ctx, 29))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 29)");
						}
						this.state = 611;
						this.match(LatexParser.CMD_CDOT);
						this.state = 612;
						this.expr(30);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 613;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 614;
						this.match(LatexParser.SUB);
						this.state = 615;
						this.expr(27);
						}
						break;
					case 4:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 616;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 617;
						this.match(LatexParser.ADD);
						this.state = 618;
						this.expr(26);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 619;
						if (!(this.precpred(this._ctx, 53))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 53)");
						}
						this.state = 620;
						_la = this._input.LA(1);
						if(!(_la===64 || _la===65)) {
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
						this.state = 621;
						if (!(this.precpred(this._ctx, 52))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 52)");
						}
						this.state = 622;
						this.match(LatexParser.CARET);
						this.state = 623;
						this.match(LatexParser.L_BRACE);
						this.state = 624;
						this.expr(0);
						this.state = 625;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 7:
						{
						localctx = new IndexContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 627;
						if (!(this.precpred(this._ctx, 51))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 51)");
						}
						this.state = 628;
						this.match(LatexParser.UNDERSCORE);
						this.state = 629;
						this.match(LatexParser.L_BRACE);
						this.state = 630;
						this.expr(0);
						this.state = 631;
						this.match(LatexParser.COMMA);
						this.state = 632;
						this.expr(0);
						this.state = 633;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 8:
						{
						localctx = new TransposeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 635;
						if (!(this.precpred(this._ctx, 50))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 50)");
						}
						this.state = 636;
						this.match(LatexParser.TRANSPOSE);
						}
						break;
					case 9:
						{
						localctx = new FactorialContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 637;
						if (!(this.precpred(this._ctx, 49))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 49)");
						}
						this.state = 638;
						this.match(LatexParser.EXCLAMATION);
						}
						break;
					case 10:
						{
						localctx = new EmptySubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 639;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 640;
						this.match(LatexParser.UNDERSCORE);
						this.state = 641;
						this.match(LatexParser.L_BRACE);
						this.state = 642;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 11:
						{
						localctx = new EmptySuperscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 643;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 644;
						this.match(LatexParser.CARET);
						this.state = 645;
						this.match(LatexParser.L_BRACE);
						this.state = 646;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 12:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 647;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 648;
						this.id();
						}
						break;
					case 13:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 649;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 650;
						this.number_();
						}
						break;
					case 14:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 651;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 652;
						this.number_with_units();
						}
						break;
					case 15:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 653;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 654;
						this.match(LatexParser.PI);
						}
						break;
					case 16:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 655;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 656;
						this.user_function();
						}
						break;
					case 17:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 657;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 658;
						this.builtin_function();
						}
						break;
					case 18:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 659;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 660;
						this.trig_function();
						}
						break;
					case 19:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 661;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 662;
						this.indefinite_integral_cmd();
						}
						break;
					case 20:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 663;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 664;
						this.integral_cmd();
						}
						break;
					case 21:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 665;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 666;
						this.derivative_cmd();
						}
						break;
					case 22:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 667;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 668;
						this.n_derivative_cmd();
						}
						break;
					}
					}
				}
				this.state = 673;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
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
		this.enterRule(localctx, 62, LatexParser.RULE_u_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 674;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 675;
			this.u_expr(0);
			this.state = 676;
			_la = this._input.LA(1);
			if(!(_la===79 || _la===80)) {
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
		this.enterRule(localctx, 64, LatexParser.RULE_u_insert_matrix);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 678;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 679;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===93 || _la===94)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 680;
			_la = this._input.LA(1);
			if(!(_la===84 || _la===86)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 681;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===93 || _la===94)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 682;
			_la = this._input.LA(1);
			if(!(_la===79 || _la===80)) {
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
		this.enterRule(localctx, 66, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.state = 692;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 81:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 684;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 685;
				this.match(LatexParser.U_L_BRACE);
				this.state = 686;
				_la = this._input.LA(1);
				if(!(_la===93 || _la===94)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 687;
				this.match(LatexParser.U_R_BRACE);
				this.state = 688;
				this.match(LatexParser.U_L_BRACE);
				this.state = 689;
				this.match(LatexParser.U_NUMBER);
				this.state = 690;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 82:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 691;
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
		let _startState: number = 68;
		this.enterRecursionRule(localctx, 68, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 716;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 85:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 695;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 696;
				this.match(LatexParser.U_L_BRACE);
				this.state = 697;
				this.expr(0);
				this.state = 698;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 81:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 700;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 701;
				this.match(LatexParser.U_L_BRACE);
				this.state = 704;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 81:
				case 85:
				case 88:
				case 89:
					{
					this.state = 702;
					this.u_expr(0);
					}
					break;
				case 93:
					{
					this.state = 703;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 706;
				this.match(LatexParser.U_R_BRACE);
				this.state = 707;
				this.match(LatexParser.U_L_BRACE);
				this.state = 708;
				this.u_expr(0);
				this.state = 709;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 88:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 711;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 89:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 712;
				this.match(LatexParser.U_L_PAREN);
				this.state = 713;
				this.u_expr(0);
				this.state = 714;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 740;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 738;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 53, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 718;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 719;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 720;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 721;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 722;
						this.match(LatexParser.U_CARET);
						this.state = 723;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 724;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 725;
						this.match(LatexParser.U_CARET);
						this.state = 726;
						this.match(LatexParser.U_L_BRACE);
						this.state = 727;
						this.match(LatexParser.U_NUMBER);
						this.state = 728;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 729;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 730;
						this.match(LatexParser.U_CARET);
						this.state = 731;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 732;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 733;
						this.match(LatexParser.U_CARET);
						this.state = 734;
						this.match(LatexParser.U_L_BRACE);
						this.state = 735;
						this.u_fraction();
						this.state = 736;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 742;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
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
		case 30:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 34:
			return this.u_expr_sempred(localctx as U_exprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 30);
		case 1:
			return this.precpred(this._ctx, 29);
		case 2:
			return this.precpred(this._ctx, 26);
		case 3:
			return this.precpred(this._ctx, 25);
		case 4:
			return this.precpred(this._ctx, 53);
		case 5:
			return this.precpred(this._ctx, 52);
		case 6:
			return this.precpred(this._ctx, 51);
		case 7:
			return this.precpred(this._ctx, 50);
		case 8:
			return this.precpred(this._ctx, 49);
		case 9:
			return this.precpred(this._ctx, 18);
		case 10:
			return this.precpred(this._ctx, 17);
		case 11:
			return this.precpred(this._ctx, 16);
		case 12:
			return this.precpred(this._ctx, 15);
		case 13:
			return this.precpred(this._ctx, 14);
		case 14:
			return this.precpred(this._ctx, 13);
		case 15:
			return this.precpred(this._ctx, 9);
		case 16:
			return this.precpred(this._ctx, 8);
		case 17:
			return this.precpred(this._ctx, 7);
		case 18:
			return this.precpred(this._ctx, 6);
		case 19:
			return this.precpred(this._ctx, 5);
		case 20:
			return this.precpred(this._ctx, 4);
		case 21:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}
	private u_expr_sempred(localctx: U_exprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 22:
			return this.precpred(this._ctx, 4);
		case 23:
			return this.precpred(this._ctx, 9);
		case 24:
			return this.precpred(this._ctx, 8);
		case 25:
			return this.precpred(this._ctx, 7);
		case 26:
			return this.precpred(this._ctx, 6);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,101,744,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,0,88,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,3,1,102,8,1,1,1,3,1,105,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,3,1,118,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,3,2,134,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,
	2,147,8,2,1,3,5,3,150,8,3,10,3,12,3,153,9,3,1,3,1,3,5,3,157,8,3,10,3,12,
	3,160,9,3,4,3,162,8,3,11,3,12,3,163,1,4,1,4,1,5,3,5,169,8,5,1,5,1,5,1,6,
	1,6,1,6,3,6,176,8,6,1,6,1,6,1,7,1,7,3,7,182,8,7,1,7,1,7,1,7,1,8,1,8,1,8,
	4,8,190,8,8,11,8,12,8,191,1,9,1,9,1,9,3,9,197,8,9,1,10,1,10,1,10,3,10,202,
	8,10,1,11,1,11,1,11,1,11,1,12,1,12,3,12,210,8,12,1,12,1,12,1,12,1,12,1,
	12,1,12,5,12,218,8,12,10,12,12,12,221,9,12,1,12,1,12,1,13,1,13,1,13,1,13,
	1,13,1,13,1,14,3,14,232,8,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,
	15,1,15,1,15,1,15,3,15,246,8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,
	1,15,3,15,257,8,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,3,
	16,269,8,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,277,8,16,1,16,1,16,1,16,
	1,16,1,16,1,16,1,16,1,16,1,16,3,16,288,8,16,1,16,1,16,1,16,1,16,1,17,1,
	17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,307,8,17,
	1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,321,8,
	18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,331,8,18,1,18,1,18,1,18,
	1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,349,
	8,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,357,8,19,1,19,1,19,1,19,1,19,1,
	19,1,19,1,19,1,19,3,19,367,8,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,
	1,19,3,19,378,8,19,1,19,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,
	20,1,20,1,20,1,20,1,20,3,20,395,8,20,1,21,1,21,3,21,399,8,21,1,22,1,22,
	1,22,4,22,404,8,22,11,22,12,22,405,1,23,1,23,1,23,1,23,3,23,412,8,23,1,
	24,1,24,1,24,4,24,417,8,24,11,24,12,24,418,1,25,1,25,1,25,1,25,1,26,1,26,
	1,26,1,26,1,26,1,26,1,27,1,27,1,27,5,27,434,8,27,10,27,12,27,437,9,27,1,
	28,1,28,1,28,1,28,1,28,5,28,444,8,28,10,28,12,28,447,9,28,1,28,1,28,1,28,
	1,28,1,28,3,28,454,8,28,1,29,1,29,1,29,1,29,1,29,1,29,3,29,462,8,29,1,29,
	1,29,1,29,1,29,5,29,468,8,29,10,29,12,29,471,9,29,1,29,1,29,1,30,1,30,1,
	30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
	1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,5,30,500,8,30,10,30,12,30,503,9,
	30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,3,30,514,8,30,1,30,1,30,
	1,30,1,30,1,30,1,30,3,30,522,8,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,
	30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
	1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,
	30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
	1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,3,30,583,8,30,1,30,1,30,1,30,1,
	30,1,30,3,30,590,8,30,1,30,1,30,1,30,3,30,595,8,30,1,30,1,30,1,30,1,30,
	1,30,1,30,1,30,3,30,604,8,30,3,30,606,8,30,1,30,1,30,1,30,1,30,1,30,1,30,
	1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,
	30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
	1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,
	30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,5,30,670,
	8,30,10,30,12,30,673,9,30,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,
	1,32,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,3,33,693,8,33,1,34,1,34,1,
	34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,3,34,705,8,34,1,34,1,34,1,34,1,34,
	1,34,1,34,1,34,1,34,1,34,1,34,3,34,717,8,34,1,34,1,34,1,34,1,34,1,34,1,
	34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
	5,34,739,8,34,10,34,12,34,742,9,34,1,34,2,151,158,2,60,68,35,0,2,4,6,8,
	10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
	58,60,62,64,66,68,0,11,1,0,32,44,1,0,16,17,1,0,64,65,2,0,58,58,60,60,1,
	0,26,27,1,0,58,61,1,0,48,49,1,0,1,2,1,0,79,80,1,0,93,94,2,0,84,84,86,86,
	843,0,87,1,0,0,0,2,101,1,0,0,0,4,119,1,0,0,0,6,151,1,0,0,0,8,165,1,0,0,
	0,10,168,1,0,0,0,12,175,1,0,0,0,14,181,1,0,0,0,16,186,1,0,0,0,18,193,1,
	0,0,0,20,198,1,0,0,0,22,203,1,0,0,0,24,209,1,0,0,0,26,224,1,0,0,0,28,231,
	1,0,0,0,30,245,1,0,0,0,32,268,1,0,0,0,34,293,1,0,0,0,36,312,1,0,0,0,38,
	340,1,0,0,0,40,394,1,0,0,0,42,398,1,0,0,0,44,400,1,0,0,0,46,407,1,0,0,0,
	48,413,1,0,0,0,50,420,1,0,0,0,52,424,1,0,0,0,54,430,1,0,0,0,56,438,1,0,
	0,0,58,461,1,0,0,0,60,605,1,0,0,0,62,674,1,0,0,0,64,678,1,0,0,0,66,692,
	1,0,0,0,68,716,1,0,0,0,70,88,3,14,7,0,71,88,3,16,8,0,72,88,3,18,9,0,73,
	88,3,20,10,0,74,88,3,22,11,0,75,88,3,62,31,0,76,88,3,10,5,0,77,88,3,8,4,
	0,78,88,3,44,22,0,79,88,3,46,23,0,80,88,3,48,24,0,81,88,3,60,30,0,82,88,
	3,42,21,0,83,88,3,24,12,0,84,88,3,6,3,0,85,88,3,2,1,0,86,88,3,4,2,0,87,
	70,1,0,0,0,87,71,1,0,0,0,87,72,1,0,0,0,87,73,1,0,0,0,87,74,1,0,0,0,87,75,
	1,0,0,0,87,76,1,0,0,0,87,77,1,0,0,0,87,78,1,0,0,0,87,79,1,0,0,0,87,80,1,
	0,0,0,87,81,1,0,0,0,87,82,1,0,0,0,87,83,1,0,0,0,87,84,1,0,0,0,87,85,1,0,
	0,0,87,86,1,0,0,0,87,88,1,0,0,0,88,89,1,0,0,0,89,90,5,0,0,1,90,1,1,0,0,
	0,91,92,5,6,0,0,92,93,3,60,30,0,93,94,5,62,0,0,94,95,3,60,30,0,95,96,5,
	7,0,0,96,102,1,0,0,0,97,98,3,60,30,0,98,99,5,62,0,0,99,100,3,60,30,0,100,
	102,1,0,0,0,101,91,1,0,0,0,101,97,1,0,0,0,102,104,1,0,0,0,103,105,5,31,
	0,0,104,103,1,0,0,0,104,105,1,0,0,0,105,106,1,0,0,0,106,117,5,57,0,0,107,
	108,5,6,0,0,108,109,3,62,31,0,109,110,5,62,0,0,110,111,3,62,31,0,111,112,
	5,7,0,0,112,118,1,0,0,0,113,114,3,62,31,0,114,115,5,62,0,0,115,116,3,62,
	31,0,116,118,1,0,0,0,117,107,1,0,0,0,117,113,1,0,0,0,117,118,1,0,0,0,118,
	3,1,0,0,0,119,120,5,6,0,0,120,121,3,60,30,0,121,122,5,62,0,0,122,123,3,
	60,30,0,123,124,5,7,0,0,124,125,1,0,0,0,125,126,5,73,0,0,126,127,5,6,0,
	0,127,128,3,40,20,0,128,133,5,7,0,0,129,130,5,73,0,0,130,131,3,10,5,0,131,
	132,5,73,0,0,132,134,1,0,0,0,133,129,1,0,0,0,133,134,1,0,0,0,134,135,1,
	0,0,0,135,146,5,57,0,0,136,137,5,6,0,0,137,138,3,62,31,0,138,139,5,62,0,
	0,139,140,3,62,31,0,140,141,5,7,0,0,141,147,1,0,0,0,142,143,3,62,31,0,143,
	144,5,62,0,0,144,145,3,62,31,0,145,147,1,0,0,0,146,136,1,0,0,0,146,142,
	1,0,0,0,146,147,1,0,0,0,147,5,1,0,0,0,148,150,9,0,0,0,149,148,1,0,0,0,150,
	153,1,0,0,0,151,152,1,0,0,0,151,149,1,0,0,0,152,161,1,0,0,0,153,151,1,0,
	0,0,154,158,3,64,32,0,155,157,9,0,0,0,156,155,1,0,0,0,157,160,1,0,0,0,158,
	159,1,0,0,0,158,156,1,0,0,0,159,162,1,0,0,0,160,158,1,0,0,0,161,154,1,0,
	0,0,162,163,1,0,0,0,163,161,1,0,0,0,163,164,1,0,0,0,164,7,1,0,0,0,165,166,
	5,73,0,0,166,9,1,0,0,0,167,169,5,55,0,0,168,167,1,0,0,0,168,169,1,0,0,0,
	169,170,1,0,0,0,170,171,5,66,0,0,171,11,1,0,0,0,172,176,3,10,5,0,173,176,
	5,12,0,0,174,176,3,8,4,0,175,172,1,0,0,0,175,173,1,0,0,0,175,174,1,0,0,
	0,176,177,1,0,0,0,177,178,3,62,31,0,178,13,1,0,0,0,179,182,3,8,4,0,180,
	182,5,12,0,0,181,179,1,0,0,0,181,180,1,0,0,0,182,183,1,0,0,0,183,184,5,
	57,0,0,184,185,3,60,30,0,185,15,1,0,0,0,186,189,3,14,7,0,187,188,5,62,0,
	0,188,190,3,14,7,0,189,187,1,0,0,0,190,191,1,0,0,0,191,189,1,0,0,0,191,
	192,1,0,0,0,192,17,1,0,0,0,193,194,3,14,7,0,194,196,5,57,0,0,195,197,3,
	62,31,0,196,195,1,0,0,0,196,197,1,0,0,0,197,19,1,0,0,0,198,199,3,60,30,
	0,199,201,5,57,0,0,200,202,3,62,31,0,201,200,1,0,0,0,201,202,1,0,0,0,202,
	21,1,0,0,0,203,204,3,60,30,0,204,205,5,57,0,0,205,206,3,60,30,0,206,23,
	1,0,0,0,207,210,3,8,4,0,208,210,5,12,0,0,209,207,1,0,0,0,209,208,1,0,0,
	0,210,211,1,0,0,0,211,212,5,57,0,0,212,213,3,8,4,0,213,214,5,6,0,0,214,
	219,3,26,13,0,215,216,5,62,0,0,216,218,3,26,13,0,217,215,1,0,0,0,218,221,
	1,0,0,0,219,217,1,0,0,0,219,220,1,0,0,0,220,222,1,0,0,0,221,219,1,0,0,0,
	222,223,5,7,0,0,223,25,1,0,0,0,224,225,5,6,0,0,225,226,3,60,30,0,226,227,
	5,62,0,0,227,228,3,42,21,0,228,229,5,7,0,0,229,27,1,0,0,0,230,232,5,30,
	0,0,231,230,1,0,0,0,231,232,1,0,0,0,232,233,1,0,0,0,233,234,7,0,0,0,234,
	235,5,6,0,0,235,236,3,60,30,0,236,237,5,7,0,0,237,29,1,0,0,0,238,246,5,
	14,0,0,239,240,5,15,0,0,240,241,5,4,0,0,241,242,5,5,0,0,242,243,5,56,0,
	0,243,244,5,4,0,0,244,246,5,5,0,0,245,238,1,0,0,0,245,239,1,0,0,0,246,247,
	1,0,0,0,247,248,5,6,0,0,248,249,3,60,30,0,249,256,5,7,0,0,250,251,5,19,
	0,0,251,252,5,4,0,0,252,253,3,8,4,0,253,254,5,5,0,0,254,257,1,0,0,0,255,
	257,3,8,4,0,256,250,1,0,0,0,256,255,1,0,0,0,257,258,1,0,0,0,258,259,5,6,
	0,0,259,260,3,8,4,0,260,261,5,7,0,0,261,31,1,0,0,0,262,263,5,15,0,0,263,
	264,5,4,0,0,264,265,3,60,30,0,265,266,5,5,0,0,266,269,1,0,0,0,267,269,7,
	1,0,0,268,262,1,0,0,0,268,267,1,0,0,0,269,276,1,0,0,0,270,271,5,56,0,0,
	271,272,5,4,0,0,272,273,3,60,30,0,273,274,5,5,0,0,274,277,1,0,0,0,275,277,
	7,2,0,0,276,270,1,0,0,0,276,275,1,0,0,0,277,278,1,0,0,0,278,279,5,6,0,0,
	279,280,3,60,30,0,280,287,5,7,0,0,281,282,5,19,0,0,282,283,5,4,0,0,283,
	284,3,8,4,0,284,285,5,5,0,0,285,288,1,0,0,0,286,288,3,8,4,0,287,281,1,0,
	0,0,287,286,1,0,0,0,288,289,1,0,0,0,289,290,5,6,0,0,290,291,3,8,4,0,291,
	292,5,7,0,0,292,33,1,0,0,0,293,294,5,18,0,0,294,295,5,4,0,0,295,296,3,8,
	4,0,296,297,5,57,0,0,297,298,3,60,30,0,298,299,5,5,0,0,299,306,1,0,0,0,
	300,301,5,56,0,0,301,302,5,4,0,0,302,303,3,60,30,0,303,304,5,5,0,0,304,
	307,1,0,0,0,305,307,7,2,0,0,306,300,1,0,0,0,306,305,1,0,0,0,307,308,1,0,
	0,0,308,309,5,6,0,0,309,310,3,60,30,0,310,311,5,7,0,0,311,35,1,0,0,0,312,
	313,5,20,0,0,313,320,5,4,0,0,314,315,5,19,0,0,315,316,5,4,0,0,316,317,3,
	8,4,0,317,318,5,5,0,0,318,321,1,0,0,0,319,321,3,8,4,0,320,314,1,0,0,0,320,
	319,1,0,0,0,321,322,1,0,0,0,322,323,5,5,0,0,323,330,5,4,0,0,324,325,5,19,
	0,0,325,326,5,4,0,0,326,327,3,8,4,0,327,328,5,5,0,0,328,331,1,0,0,0,329,
	331,3,8,4,0,330,324,1,0,0,0,330,329,1,0,0,0,331,332,1,0,0,0,332,333,5,6,
	0,0,333,334,3,8,4,0,334,335,5,7,0,0,335,336,5,5,0,0,336,337,5,6,0,0,337,
	338,3,60,30,0,338,339,5,7,0,0,339,37,1,0,0,0,340,341,5,20,0,0,341,348,5,
	4,0,0,342,343,5,19,0,0,343,344,5,4,0,0,344,345,3,8,4,0,345,346,5,5,0,0,
	346,349,1,0,0,0,347,349,3,8,4,0,348,342,1,0,0,0,348,347,1,0,0,0,349,356,
	1,0,0,0,350,351,5,56,0,0,351,352,5,4,0,0,352,353,3,10,5,0,353,354,5,5,0,
	0,354,357,1,0,0,0,355,357,5,64,0,0,356,350,1,0,0,0,356,355,1,0,0,0,357,
	358,1,0,0,0,358,359,5,5,0,0,359,366,5,4,0,0,360,361,5,19,0,0,361,362,5,
	4,0,0,362,363,3,8,4,0,363,364,5,5,0,0,364,367,1,0,0,0,365,367,3,8,4,0,366,
	360,1,0,0,0,366,365,1,0,0,0,367,368,1,0,0,0,368,369,5,6,0,0,369,370,3,8,
	4,0,370,377,5,7,0,0,371,372,5,56,0,0,372,373,5,4,0,0,373,374,3,10,5,0,374,
	375,5,5,0,0,375,378,1,0,0,0,376,378,5,64,0,0,377,371,1,0,0,0,377,376,1,
	0,0,0,378,379,1,0,0,0,379,380,5,5,0,0,380,381,5,6,0,0,381,382,3,60,30,0,
	382,383,5,7,0,0,383,39,1,0,0,0,384,385,3,8,4,0,385,386,5,57,0,0,386,387,
	3,60,30,0,387,395,1,0,0,0,388,389,3,60,30,0,389,390,7,3,0,0,390,391,3,8,
	4,0,391,392,7,3,0,0,392,393,3,60,30,0,393,395,1,0,0,0,394,384,1,0,0,0,394,
	388,1,0,0,0,395,41,1,0,0,0,396,399,3,50,25,0,397,399,3,52,26,0,398,396,
	1,0,0,0,398,397,1,0,0,0,399,43,1,0,0,0,400,403,3,8,4,0,401,402,5,62,0,0,
	402,404,3,8,4,0,403,401,1,0,0,0,404,405,1,0,0,0,405,403,1,0,0,0,405,406,
	1,0,0,0,406,45,1,0,0,0,407,408,3,8,4,0,408,411,7,4,0,0,409,412,3,10,5,0,
	410,412,3,12,6,0,411,409,1,0,0,0,411,410,1,0,0,0,412,47,1,0,0,0,413,416,
	3,46,23,0,414,415,5,62,0,0,415,417,3,46,23,0,416,414,1,0,0,0,417,418,1,
	0,0,0,418,416,1,0,0,0,418,419,1,0,0,0,419,49,1,0,0,0,420,421,3,60,30,0,
	421,422,7,5,0,0,422,423,3,60,30,0,423,51,1,0,0,0,424,425,3,60,30,0,425,
	426,7,5,0,0,426,427,3,60,30,0,427,428,7,5,0,0,428,429,3,60,30,0,429,53,
	1,0,0,0,430,435,3,60,30,0,431,432,5,69,0,0,432,434,3,60,30,0,433,431,1,
	0,0,0,434,437,1,0,0,0,435,433,1,0,0,0,435,436,1,0,0,0,436,55,1,0,0,0,437,
	435,1,0,0,0,438,439,3,8,4,0,439,440,5,6,0,0,440,445,3,40,20,0,441,442,5,
	62,0,0,442,444,3,40,20,0,443,441,1,0,0,0,444,447,1,0,0,0,445,443,1,0,0,
	0,445,446,1,0,0,0,446,448,1,0,0,0,447,445,1,0,0,0,448,453,5,7,0,0,449,450,
	5,73,0,0,450,451,3,10,5,0,451,452,5,73,0,0,452,454,1,0,0,0,453,449,1,0,
	0,0,453,454,1,0,0,0,454,57,1,0,0,0,455,456,5,19,0,0,456,457,5,4,0,0,457,
	458,3,8,4,0,458,459,5,5,0,0,459,462,1,0,0,0,460,462,3,8,4,0,461,455,1,0,
	0,0,461,460,1,0,0,0,462,463,1,0,0,0,463,464,5,6,0,0,464,469,3,60,30,0,465,
	466,5,62,0,0,466,468,3,60,30,0,467,465,1,0,0,0,468,471,1,0,0,0,469,467,
	1,0,0,0,469,470,1,0,0,0,470,472,1,0,0,0,471,469,1,0,0,0,472,473,5,7,0,0,
	473,59,1,0,0,0,474,475,6,30,-1,0,475,476,3,8,4,0,476,477,5,72,0,0,477,606,
	1,0,0,0,478,479,3,8,4,0,479,480,7,2,0,0,480,481,5,71,0,0,481,606,1,0,0,
	0,482,483,3,8,4,0,483,484,5,56,0,0,484,485,5,4,0,0,485,486,3,60,30,0,486,
	487,5,5,0,0,487,488,5,71,0,0,488,606,1,0,0,0,489,606,5,25,0,0,490,491,5,
	24,0,0,491,492,5,4,0,0,492,493,3,60,30,0,493,494,5,5,0,0,494,606,1,0,0,
	0,495,496,5,67,0,0,496,501,3,54,27,0,497,498,5,70,0,0,498,500,3,54,27,0,
	499,497,1,0,0,0,500,503,1,0,0,0,501,499,1,0,0,0,501,502,1,0,0,0,502,504,
	1,0,0,0,503,501,1,0,0,0,504,505,5,68,0,0,505,606,1,0,0,0,506,606,3,28,14,
	0,507,606,3,30,15,0,508,606,3,32,16,0,509,606,3,36,18,0,510,606,3,38,19,
	0,511,606,3,34,17,0,512,514,5,30,0,0,513,512,1,0,0,0,513,514,1,0,0,0,514,
	515,1,0,0,0,515,516,5,45,0,0,516,517,5,6,0,0,517,518,3,60,30,0,518,519,
	5,7,0,0,519,606,1,0,0,0,520,522,5,30,0,0,521,520,1,0,0,0,521,522,1,0,0,
	0,522,523,1,0,0,0,523,524,5,46,0,0,524,525,5,6,0,0,525,526,3,60,30,0,526,
	527,5,7,0,0,527,606,1,0,0,0,528,529,5,47,0,0,529,530,5,4,0,0,530,531,3,
	60,30,0,531,532,5,5,0,0,532,533,5,6,0,0,533,534,3,60,30,0,534,535,5,7,0,
	0,535,606,1,0,0,0,536,537,7,6,0,0,537,538,5,6,0,0,538,539,3,60,30,0,539,
	540,5,7,0,0,540,606,1,0,0,0,541,542,5,9,0,0,542,543,3,60,30,0,543,544,5,
	9,0,0,544,606,1,0,0,0,545,546,5,8,0,0,546,547,3,60,30,0,547,548,5,8,0,0,
	548,606,1,0,0,0,549,606,3,12,6,0,550,606,3,10,5,0,551,552,5,55,0,0,552,
	606,3,60,30,31,553,554,5,20,0,0,554,555,5,4,0,0,555,556,3,60,30,0,556,557,
	5,5,0,0,557,558,5,4,0,0,558,559,3,60,30,0,559,560,5,5,0,0,560,606,1,0,0,
	0,561,606,5,21,0,0,562,606,3,8,4,0,563,606,3,56,28,0,564,606,3,58,29,0,
	565,606,5,12,0,0,566,606,5,13,0,0,567,568,5,6,0,0,568,569,3,60,30,0,569,
	570,5,7,0,0,570,606,1,0,0,0,571,572,3,10,5,0,572,573,3,60,30,12,573,606,
	1,0,0,0,574,575,3,12,6,0,575,576,3,60,30,11,576,606,1,0,0,0,577,578,5,12,
	0,0,578,606,3,60,30,10,579,582,5,28,0,0,580,581,5,4,0,0,581,583,5,5,0,0,
	582,580,1,0,0,0,582,583,1,0,0,0,583,606,1,0,0,0,584,585,5,19,0,0,585,586,
	5,4,0,0,586,587,3,60,30,0,587,588,5,5,0,0,588,590,1,0,0,0,589,584,1,0,0,
	0,589,590,1,0,0,0,590,594,1,0,0,0,591,595,5,63,0,0,592,595,3,10,5,0,593,
	595,5,57,0,0,594,591,1,0,0,0,594,592,1,0,0,0,594,593,1,0,0,0,594,595,1,
	0,0,0,595,596,1,0,0,0,596,597,5,19,0,0,597,598,5,4,0,0,598,599,3,60,30,
	0,599,603,5,5,0,0,600,604,5,63,0,0,601,604,3,10,5,0,602,604,5,57,0,0,603,
	600,1,0,0,0,603,601,1,0,0,0,603,602,1,0,0,0,603,604,1,0,0,0,604,606,1,0,
	0,0,605,474,1,0,0,0,605,478,1,0,0,0,605,482,1,0,0,0,605,489,1,0,0,0,605,
	490,1,0,0,0,605,495,1,0,0,0,605,506,1,0,0,0,605,507,1,0,0,0,605,508,1,0,
	0,0,605,509,1,0,0,0,605,510,1,0,0,0,605,511,1,0,0,0,605,513,1,0,0,0,605,
	521,1,0,0,0,605,528,1,0,0,0,605,536,1,0,0,0,605,541,1,0,0,0,605,545,1,0,
	0,0,605,549,1,0,0,0,605,550,1,0,0,0,605,551,1,0,0,0,605,553,1,0,0,0,605,
	561,1,0,0,0,605,562,1,0,0,0,605,563,1,0,0,0,605,564,1,0,0,0,605,565,1,0,
	0,0,605,566,1,0,0,0,605,567,1,0,0,0,605,571,1,0,0,0,605,574,1,0,0,0,605,
	577,1,0,0,0,605,579,1,0,0,0,605,589,1,0,0,0,606,671,1,0,0,0,607,608,10,
	30,0,0,608,609,5,23,0,0,609,670,3,60,30,31,610,611,10,29,0,0,611,612,5,
	22,0,0,612,670,3,60,30,30,613,614,10,26,0,0,614,615,5,55,0,0,615,670,3,
	60,30,27,616,617,10,25,0,0,617,618,5,54,0,0,618,670,3,60,30,26,619,620,
	10,53,0,0,620,670,7,2,0,0,621,622,10,52,0,0,622,623,5,56,0,0,623,624,5,
	4,0,0,624,625,3,60,30,0,625,626,5,5,0,0,626,670,1,0,0,0,627,628,10,51,0,
	0,628,629,5,10,0,0,629,630,5,4,0,0,630,631,3,60,30,0,631,632,5,62,0,0,632,
	633,3,60,30,0,633,634,5,5,0,0,634,670,1,0,0,0,635,636,10,50,0,0,636,670,
	5,29,0,0,637,638,10,49,0,0,638,670,5,11,0,0,639,640,10,18,0,0,640,641,5,
	10,0,0,641,642,5,4,0,0,642,670,5,5,0,0,643,644,10,17,0,0,644,645,5,56,0,
	0,645,646,5,4,0,0,646,670,5,5,0,0,647,648,10,16,0,0,648,670,3,8,4,0,649,
	650,10,15,0,0,650,670,3,10,5,0,651,652,10,14,0,0,652,670,3,12,6,0,653,654,
	10,13,0,0,654,670,5,12,0,0,655,656,10,9,0,0,656,670,3,56,28,0,657,658,10,
	8,0,0,658,670,3,58,29,0,659,660,10,7,0,0,660,670,3,28,14,0,661,662,10,6,
	0,0,662,670,3,30,15,0,663,664,10,5,0,0,664,670,3,32,16,0,665,666,10,4,0,
	0,666,670,3,36,18,0,667,668,10,3,0,0,668,670,3,38,19,0,669,607,1,0,0,0,
	669,610,1,0,0,0,669,613,1,0,0,0,669,616,1,0,0,0,669,619,1,0,0,0,669,621,
	1,0,0,0,669,627,1,0,0,0,669,635,1,0,0,0,669,637,1,0,0,0,669,639,1,0,0,0,
	669,643,1,0,0,0,669,647,1,0,0,0,669,649,1,0,0,0,669,651,1,0,0,0,669,653,
	1,0,0,0,669,655,1,0,0,0,669,657,1,0,0,0,669,659,1,0,0,0,669,661,1,0,0,0,
	669,663,1,0,0,0,669,665,1,0,0,0,669,667,1,0,0,0,670,673,1,0,0,0,671,669,
	1,0,0,0,671,672,1,0,0,0,672,61,1,0,0,0,673,671,1,0,0,0,674,675,7,7,0,0,
	675,676,3,68,34,0,676,677,7,8,0,0,677,63,1,0,0,0,678,679,7,7,0,0,679,680,
	7,9,0,0,680,681,7,10,0,0,681,682,7,9,0,0,682,683,7,8,0,0,683,65,1,0,0,0,
	684,685,5,81,0,0,685,686,5,91,0,0,686,687,7,9,0,0,687,688,5,92,0,0,688,
	689,5,91,0,0,689,690,5,94,0,0,690,693,5,92,0,0,691,693,5,82,0,0,692,684,
	1,0,0,0,692,691,1,0,0,0,693,67,1,0,0,0,694,695,6,34,-1,0,695,696,5,85,0,
	0,696,697,5,91,0,0,697,698,3,60,30,0,698,699,5,92,0,0,699,717,1,0,0,0,700,
	701,5,81,0,0,701,704,5,91,0,0,702,705,3,68,34,0,703,705,5,93,0,0,704,702,
	1,0,0,0,704,703,1,0,0,0,705,706,1,0,0,0,706,707,5,92,0,0,707,708,5,91,0,
	0,708,709,3,68,34,0,709,710,5,92,0,0,710,717,1,0,0,0,711,717,5,88,0,0,712,
	713,5,89,0,0,713,714,3,68,34,0,714,715,5,90,0,0,715,717,1,0,0,0,716,694,
	1,0,0,0,716,700,1,0,0,0,716,711,1,0,0,0,716,712,1,0,0,0,717,740,1,0,0,0,
	718,719,10,4,0,0,719,720,5,83,0,0,720,739,3,68,34,5,721,722,10,9,0,0,722,
	723,5,87,0,0,723,739,5,94,0,0,724,725,10,8,0,0,725,726,5,87,0,0,726,727,
	5,91,0,0,727,728,5,94,0,0,728,739,5,92,0,0,729,730,10,7,0,0,730,731,5,87,
	0,0,731,739,3,66,33,0,732,733,10,6,0,0,733,734,5,87,0,0,734,735,5,91,0,
	0,735,736,3,66,33,0,736,737,5,92,0,0,737,739,1,0,0,0,738,718,1,0,0,0,738,
	721,1,0,0,0,738,724,1,0,0,0,738,729,1,0,0,0,738,732,1,0,0,0,739,742,1,0,
	0,0,740,738,1,0,0,0,740,741,1,0,0,0,741,69,1,0,0,0,742,740,1,0,0,0,55,87,
	101,104,117,133,146,151,158,163,168,175,181,191,196,201,209,219,231,245,
	256,268,276,287,306,320,330,348,356,366,377,394,398,405,411,418,435,445,
	453,461,469,501,513,521,582,589,594,603,605,669,671,692,704,716,738,740];

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
	public scatter_plot_query(): Scatter_plot_queryContext {
		return this.getTypedRuleContext(Scatter_plot_queryContext, 0) as Scatter_plot_queryContext;
	}
	public parametric_plot_query(): Parametric_plot_queryContext {
		return this.getTypedRuleContext(Parametric_plot_queryContext, 0) as Parametric_plot_queryContext;
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


export class Scatter_plot_queryContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public AS_LINES(): TerminalNode {
		return this.getToken(LatexParser.AS_LINES, 0);
	}
	public L_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_PAREN);
	}
	public L_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, i);
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
	public R_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_PAREN);
	}
	public R_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, i);
	}
	public u_block_list(): U_blockContext[] {
		return this.getTypedRuleContexts(U_blockContext) as U_blockContext[];
	}
	public u_block(i: number): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, i) as U_blockContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_scatter_plot_query;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitScatter_plot_query) {
			return visitor.visitScatter_plot_query(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Parametric_plot_queryContext extends ParserRuleContext {
	public _for_id!: Token;
	public _points_id_0!: Token;
	public _num_points!: NumberContext;
	public _points_id_1!: Token;
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
	public argument(): ArgumentContext {
		return this.getTypedRuleContext(ArgumentContext, 0) as ArgumentContext;
	}
	public R_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_PAREN);
	}
	public R_PAREN(i: number): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, i);
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(LatexParser.ID, i);
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
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public u_block_list(): U_blockContext[] {
		return this.getTypedRuleContexts(U_blockContext) as U_blockContext[];
	}
	public u_block(i: number): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, i) as U_blockContext;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_parametric_plot_query;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitParametric_plot_query) {
			return visitor.visitParametric_plot_query(this);
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
	public u_insert_matrix_list(): U_insert_matrixContext[] {
		return this.getTypedRuleContexts(U_insert_matrixContext) as U_insert_matrixContext[];
	}
	public u_insert_matrix(i: number): U_insert_matrixContext {
		return this.getTypedRuleContext(U_insert_matrixContext, i) as U_insert_matrixContext;
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
	public u_block(): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, 0) as U_blockContext;
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public PI(): TerminalNode {
		return this.getToken(LatexParser.PI, 0);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
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
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
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


export class Summation_cmdContext extends ParserRuleContext {
	public _start_expr!: ExprContext;
	public _end_expr!: ExprContext;
	public _operand_expr!: ExprContext;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public CMD_SUM_UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.CMD_SUM_UNDERSCORE, 0);
	}
	public L_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.L_BRACE);
	}
	public L_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, i);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_BRACE);
	}
	public R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, i);
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
    public get ruleIndex(): number {
    	return LatexParser.RULE_summation_cmd;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitSummation_cmd) {
			return visitor.visitSummation_cmd(this);
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


export class User_functionContext extends ParserRuleContext {
	public _points_id_0!: Token;
	public _num_points!: NumberContext;
	public _points_id_1!: Token;
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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
    public get ruleIndex(): number {
    	return LatexParser.RULE_user_function;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUser_function) {
			return visitor.visitUser_function(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Builtin_functionContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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
    public get ruleIndex(): number {
    	return LatexParser.RULE_builtin_function;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitBuiltin_function) {
			return visitor.visitBuiltin_function(this);
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
export class EmptySubscriptContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.UNDERSCORE, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, 0);
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitEmptySubscript) {
			return visitor.visitEmptySubscript(this);
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
	public builtin_function(): Builtin_functionContext {
		return this.getTypedRuleContext(Builtin_functionContext, 0) as Builtin_functionContext;
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
export class RemoveOperatorFontContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_MATHRM_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.CMD_MATHRM);
	}
	public CMD_MATHRM(i: number): TerminalNode {
		return this.getToken(LatexParser.CMD_MATHRM, i);
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
	public DECIMAL_POINT_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.DECIMAL_POINT);
	}
	public DECIMAL_POINT(i: number): TerminalNode {
		return this.getToken(LatexParser.DECIMAL_POINT, i);
	}
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
	}
	public EQ_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.EQ);
	}
	public EQ(i: number): TerminalNode {
		return this.getToken(LatexParser.EQ, i);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitRemoveOperatorFont) {
			return visitor.visitRemoveOperatorFont(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FactorialContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public EXCLAMATION(): TerminalNode {
		return this.getToken(LatexParser.EXCLAMATION, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitFactorial) {
			return visitor.visitFactorial(this);
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
export class UserFunctionContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public user_function(): User_functionContext {
		return this.getTypedRuleContext(User_functionContext, 0) as User_functionContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUserFunction) {
			return visitor.visitUserFunction(this);
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
export class SummationContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public summation_cmd(): Summation_cmdContext {
		return this.getTypedRuleContext(Summation_cmdContext, 0) as Summation_cmdContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitSummation) {
			return visitor.visitSummation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NormContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DOUBLE_VBAR_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.DOUBLE_VBAR);
	}
	public DOUBLE_VBAR(i: number): TerminalNode {
		return this.getToken(LatexParser.DOUBLE_VBAR, i);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitNorm) {
			return visitor.visitNorm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EmptyPlaceholderContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CMD_PLACEHOLDER(): TerminalNode {
		return this.getToken(LatexParser.CMD_PLACEHOLDER, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, 0);
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitEmptyPlaceholder) {
			return visitor.visitEmptyPlaceholder(this);
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
export class MissingMultiplicationContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public number_with_units(): Number_with_unitsContext {
		return this.getTypedRuleContext(Number_with_unitsContext, 0) as Number_with_unitsContext;
	}
	public PI(): TerminalNode {
		return this.getToken(LatexParser.PI, 0);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public user_function(): User_functionContext {
		return this.getTypedRuleContext(User_functionContext, 0) as User_functionContext;
	}
	public builtin_function(): Builtin_functionContext {
		return this.getTypedRuleContext(Builtin_functionContext, 0) as Builtin_functionContext;
	}
	public trig_function(): Trig_functionContext {
		return this.getTypedRuleContext(Trig_functionContext, 0) as Trig_functionContext;
	}
	public indefinite_integral_cmd(): Indefinite_integral_cmdContext {
		return this.getTypedRuleContext(Indefinite_integral_cmdContext, 0) as Indefinite_integral_cmdContext;
	}
	public integral_cmd(): Integral_cmdContext {
		return this.getTypedRuleContext(Integral_cmdContext, 0) as Integral_cmdContext;
	}
	public derivative_cmd(): Derivative_cmdContext {
		return this.getTypedRuleContext(Derivative_cmdContext, 0) as Derivative_cmdContext;
	}
	public n_derivative_cmd(): N_derivative_cmdContext {
		return this.getTypedRuleContext(N_derivative_cmdContext, 0) as N_derivative_cmdContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitMissingMultiplication) {
			return visitor.visitMissingMultiplication(this);
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
export class InfinityExprContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INFINITY(): TerminalNode {
		return this.getToken(LatexParser.INFINITY, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitInfinityExpr) {
			return visitor.visitInfinityExpr(this);
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
export class EmptySuperscriptContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public CARET(): TerminalNode {
		return this.getToken(LatexParser.CARET, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(LatexParser.L_BRACE, 0);
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitEmptySuperscript) {
			return visitor.visitEmptySuperscript(this);
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
export class TrigFunctionContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public trig_function(): Trig_functionContext {
		return this.getTypedRuleContext(Trig_functionContext, 0) as Trig_functionContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitTrigFunction) {
			return visitor.visitTrigFunction(this);
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
