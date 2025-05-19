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
	public static readonly COLON = 3;
	public static readonly SEMICOLON = 4;
	public static readonly L_BRACE = 5;
	public static readonly R_BRACE = 6;
	public static readonly L_PAREN = 7;
	public static readonly R_PAREN = 8;
	public static readonly VBAR = 9;
	public static readonly DOUBLE_VBAR = 10;
	public static readonly UNDERSCORE = 11;
	public static readonly EXCLAMATION = 12;
	public static readonly INFINITY = 13;
	public static readonly CMD_INT = 14;
	public static readonly CMD_INT_UNDERSCORE = 15;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER = 16;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_ID = 17;
	public static readonly CMD_SUM_UNDERSCORE = 18;
	public static readonly CMD_PROD_UNDERSCORE = 19;
	public static readonly CMD_MATHRM = 20;
	public static readonly CMD_FRAC = 21;
	public static readonly CMD_FRAC_INTS = 22;
	public static readonly CMD_CDOT = 23;
	public static readonly CMD_TIMES = 24;
	public static readonly CMD_SQRT = 25;
	public static readonly CMD_SQRT_INT = 26;
	public static readonly CMD_SIM = 27;
	public static readonly CMD_APPROX = 28;
	public static readonly CMD_PLACEHOLDER = 29;
	public static readonly TRANSPOSE = 30;
	public static readonly BACKSLASH = 31;
	public static readonly AS_LINES = 32;
	public static readonly CMD_SIN = 33;
	public static readonly CMD_COS = 34;
	public static readonly CMD_TAN = 35;
	public static readonly CMD_COT = 36;
	public static readonly CMD_SEC = 37;
	public static readonly CMD_CSC = 38;
	public static readonly CMD_ARCSIN = 39;
	public static readonly CMD_ARCCOS = 40;
	public static readonly CMD_ARCTAN = 41;
	public static readonly CMD_SINH = 42;
	public static readonly CMD_COSH = 43;
	public static readonly CMD_TANH = 44;
	public static readonly CMD_COTH = 45;
	public static readonly CMD_LN = 46;
	public static readonly CMD_LOG = 47;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 48;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER = 49;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID = 50;
	public static readonly COMMENT = 51;
	public static readonly CMD_LEFT = 52;
	public static readonly CMD_RIGHT = 53;
	public static readonly DOUBLE_DOLLAR_SIGN = 54;
	public static readonly ADD = 55;
	public static readonly SUB = 56;
	public static readonly CARET = 57;
	public static readonly EQ = 58;
	public static readonly LT = 59;
	public static readonly GT = 60;
	public static readonly LTE = 61;
	public static readonly GTE = 62;
	public static readonly COMMA = 63;
	public static readonly DECIMAL_POINT = 64;
	public static readonly CARET_SINGLE_CHAR_NUMBER = 65;
	public static readonly CARET_SINGLE_CHAR_ID = 66;
	public static readonly NUMBER = 67;
	public static readonly BEGIN_MATRIX = 68;
	public static readonly END_MATRIX = 69;
	public static readonly AMPERSAND = 70;
	public static readonly DOUBLE_BACKSLASH = 71;
	public static readonly UNDERSCORE_SUBSCRIPT = 72;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 73;
	public static readonly ID = 74;
	public static readonly WS = 75;
	public static readonly SLASH_SPACE = 76;
	public static readonly SLASH_COLON = 77;
	public static readonly NBSP = 78;
	public static readonly ERROR_CHAR = 79;
	public static readonly R_BRACKET = 80;
	public static readonly ALT_R_BRACKET = 81;
	public static readonly U_CMD_FRAC = 82;
	public static readonly U_CMD_FRAC_INTS = 83;
	public static readonly U_CMD_CDOT = 84;
	public static readonly U_CMD_TIMES = 85;
	public static readonly U_CMD_SQRT = 86;
	public static readonly U_COMMA = 87;
	public static readonly U_CARET = 88;
	public static readonly U_NAME = 89;
	public static readonly U_L_PAREN = 90;
	public static readonly U_R_PAREN = 91;
	public static readonly U_L_BRACE = 92;
	public static readonly U_R_BRACE = 93;
	public static readonly U_ONE = 94;
	public static readonly U_NUMBER = 95;
	public static readonly U_CMD_LEFT = 96;
	public static readonly U_CMD_RIGHT = 97;
	public static readonly U_WS = 98;
	public static readonly U_SLASH_SPACE = 99;
	public static readonly U_SLASH_COLON = 100;
	public static readonly U_NBSP = 101;
	public static readonly U_ERROR_CHAR = 102;
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
	public static readonly RULE_sum_prod_cmd = 17;
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
	public static readonly RULE_index = 30;
	public static readonly RULE_expr = 31;
	public static readonly RULE_u_block = 32;
	public static readonly RULE_u_insert_matrix = 33;
	public static readonly RULE_u_fraction = 34;
	public static readonly RULE_u_expr = 35;
	public static readonly literalNames: (string | null)[] = [ null, "'['", 
                                                            "'\\lbrack'", 
                                                            "':'", "';'", 
                                                            null, null, 
                                                            null, null, 
                                                            "'|'", null, 
                                                            "'_'", "'!'", 
                                                            "'\\infty'", 
                                                            "'\\int'", null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\mathrm'", 
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
                                                             "COLON", "SEMICOLON", 
                                                             "L_BRACE", 
                                                             "R_BRACE", 
                                                             "L_PAREN", 
                                                             "R_PAREN", 
                                                             "VBAR", "DOUBLE_VBAR", 
                                                             "UNDERSCORE", 
                                                             "EXCLAMATION", 
                                                             "INFINITY", 
                                                             "CMD_INT", 
                                                             "CMD_INT_UNDERSCORE", 
                                                             "CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER", 
                                                             "CMD_INT_UNDERSCORE_SINGLE_CHAR_ID", 
                                                             "CMD_SUM_UNDERSCORE", 
                                                             "CMD_PROD_UNDERSCORE", 
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
		"indefinite_integral_cmd", "integral_cmd", "sum_prod_cmd", "derivative_cmd", 
		"n_derivative_cmd", "argument", "condition", "id_list", "guess", "guess_list", 
		"condition_single", "condition_chain", "matrix_row", "user_function", 
		"builtin_function", "index", "expr", "u_block", "u_insert_matrix", "u_fraction", 
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
			this.state = 89;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 72;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 73;
				this.assign_list();
				}
				break;
			case 3:
				{
				this.state = 74;
				this.assign_plus_query();
				}
				break;
			case 4:
				{
				this.state = 75;
				this.query();
				}
				break;
			case 5:
				{
				this.state = 76;
				this.equality();
				}
				break;
			case 6:
				{
				this.state = 77;
				this.u_block();
				}
				break;
			case 7:
				{
				this.state = 78;
				this.number_();
				}
				break;
			case 8:
				{
				this.state = 79;
				this.id();
				}
				break;
			case 9:
				{
				this.state = 80;
				this.id_list();
				}
				break;
			case 10:
				{
				this.state = 81;
				this.guess();
				}
				break;
			case 11:
				{
				this.state = 82;
				this.guess_list();
				}
				break;
			case 12:
				{
				this.state = 83;
				this.expr(0);
				}
				break;
			case 13:
				{
				this.state = 84;
				this.condition();
				}
				break;
			case 14:
				{
				this.state = 85;
				this.piecewise_assign();
				}
				break;
			case 15:
				{
				this.state = 86;
				this.insert_matrix();
				}
				break;
			case 16:
				{
				this.state = 87;
				this.scatter_plot_query();
				}
				break;
			case 17:
				{
				this.state = 88;
				this.parametric_plot_query();
				}
				break;
			}
			this.state = 91;
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
			this.state = 103;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				{
				this.state = 93;
				this.match(LatexParser.L_PAREN);
				this.state = 94;
				this.expr(0);
				this.state = 95;
				this.match(LatexParser.COMMA);
				this.state = 96;
				this.expr(0);
				this.state = 97;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 2:
				{
				{
				this.state = 99;
				this.expr(0);
				this.state = 100;
				this.match(LatexParser.COMMA);
				this.state = 101;
				this.expr(0);
				}
				}
				break;
			}
			this.state = 106;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===32) {
				{
				this.state = 105;
				this.match(LatexParser.AS_LINES);
				}
			}

			this.state = 108;
			this.match(LatexParser.EQ);
			this.state = 119;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
				{
				{
				this.state = 109;
				this.match(LatexParser.L_PAREN);
				this.state = 110;
				this.u_block();
				this.state = 111;
				this.match(LatexParser.COMMA);
				this.state = 112;
				this.u_block();
				this.state = 113;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 115;
				this.u_block();
				this.state = 116;
				this.match(LatexParser.COMMA);
				this.state = 117;
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
			this.state = 121;
			this.match(LatexParser.L_PAREN);
			this.state = 122;
			this.expr(0);
			this.state = 123;
			this.match(LatexParser.COMMA);
			this.state = 124;
			this.expr(0);
			this.state = 125;
			this.match(LatexParser.R_PAREN);
			}
			this.state = 127;
			localctx._for_id = this.match(LatexParser.ID);
			this.state = 128;
			this.match(LatexParser.L_PAREN);
			this.state = 129;
			this.argument();
			this.state = 130;
			this.match(LatexParser.R_PAREN);
			this.state = 135;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===74) {
				{
				this.state = 131;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 132;
				localctx._num_points = this.number_();
				this.state = 133;
				localctx._points_id_1 = this.match(LatexParser.ID);
				}
			}

			this.state = 137;
			this.match(LatexParser.EQ);
			this.state = 148;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
				{
				{
				this.state = 138;
				this.match(LatexParser.L_PAREN);
				this.state = 139;
				this.u_block();
				this.state = 140;
				this.match(LatexParser.COMMA);
				this.state = 141;
				this.u_block();
				this.state = 142;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 144;
				this.u_block();
				this.state = 145;
				this.match(LatexParser.COMMA);
				this.state = 146;
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
			this.state = 153;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 150;
					this.matchWildcard();
					}
					}
				}
				this.state = 155;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 163;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 156;
				this.u_insert_matrix();
				this.state = 160;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 157;
						this.matchWildcard();
						}
						}
					}
					this.state = 162;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				}
				}
				}
				this.state = 165;
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
			this.state = 167;
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
			this.state = 170;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===56) {
				{
				this.state = 169;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 172;
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
			this.state = 176;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 56:
			case 67:
				{
				this.state = 174;
				this.number_();
				}
				break;
			case 74:
				{
				this.state = 175;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 178;
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
			this.state = 180;
			this.id();
			this.state = 181;
			this.match(LatexParser.EQ);
			this.state = 182;
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
			this.state = 184;
			this.assign();
			this.state = 187;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 185;
				this.match(LatexParser.COMMA);
				this.state = 186;
				this.assign();
				}
				}
				this.state = 189;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===63);
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
			this.state = 191;
			this.assign();
			this.state = 192;
			this.match(LatexParser.EQ);
			this.state = 194;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 193;
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
			this.state = 196;
			this.expr(0);
			this.state = 197;
			this.match(LatexParser.EQ);
			this.state = 199;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 198;
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
			this.state = 201;
			this.expr(0);
			this.state = 202;
			this.match(LatexParser.EQ);
			this.state = 203;
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
			this.state = 205;
			this.id();
			this.state = 206;
			this.match(LatexParser.EQ);
			this.state = 207;
			this.id();
			this.state = 208;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 209;
			this.piecewise_arg();
			this.state = 214;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 210;
				this.match(LatexParser.COMMA);
				this.state = 211;
				this.piecewise_arg();
				}
				}
				this.state = 216;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 217;
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
			this.state = 219;
			this.match(LatexParser.L_PAREN);
			this.state = 220;
			this.expr(0);
			this.state = 221;
			this.match(LatexParser.COMMA);
			this.state = 222;
			this.condition();
			this.state = 223;
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
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===31) {
				{
				this.state = 225;
				this.match(LatexParser.BACKSLASH);
				}
			}

			this.state = 228;
			_la = this._input.LA(1);
			if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 229;
			this.match(LatexParser.L_PAREN);
			this.state = 230;
			this.expr(0);
			this.state = 231;
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
			this.state = 240;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 14:
				{
				this.state = 233;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 15:
				{
				{
				this.state = 234;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 235;
				this.match(LatexParser.L_BRACE);
				this.state = 236;
				this.match(LatexParser.R_BRACE);
				this.state = 237;
				this.match(LatexParser.CARET);
				this.state = 238;
				this.match(LatexParser.L_BRACE);
				this.state = 239;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 242;
			this.match(LatexParser.L_PAREN);
			this.state = 243;
			this.expr(0);
			this.state = 244;
			this.match(LatexParser.R_PAREN);
			this.state = 251;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 245;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 246;
				this.match(LatexParser.L_BRACE);
				this.state = 247;
				this.id();
				this.state = 248;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 250;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 253;
			this.match(LatexParser.L_PAREN);
			this.state = 254;
			this.id();
			this.state = 255;
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
			this.state = 263;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				{
				this.state = 257;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 258;
				this.match(LatexParser.L_BRACE);
				this.state = 259;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 260;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 16:
			case 17:
				{
				this.state = 262;
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
			this.state = 271;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 265;
				this.match(LatexParser.CARET);
				this.state = 266;
				this.match(LatexParser.L_BRACE);
				this.state = 267;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 268;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
			case 66:
				{
				this.state = 270;
				_la = this._input.LA(1);
				if(!(_la===65 || _la===66)) {
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
			this.state = 273;
			this.match(LatexParser.L_PAREN);
			this.state = 274;
			localctx._integrand_expr = this.expr(0);
			this.state = 275;
			this.match(LatexParser.R_PAREN);
			this.state = 282;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 276;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 277;
				this.match(LatexParser.L_BRACE);
				this.state = 278;
				this.id();
				this.state = 279;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 281;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 284;
			this.match(LatexParser.L_PAREN);
			this.state = 285;
			this.id();
			this.state = 286;
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
	public sum_prod_cmd(): Sum_prod_cmdContext {
		let localctx: Sum_prod_cmdContext = new Sum_prod_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, LatexParser.RULE_sum_prod_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 288;
			_la = this._input.LA(1);
			if(!(_la===18 || _la===19)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 289;
			this.match(LatexParser.L_BRACE);
			this.state = 290;
			this.id();
			this.state = 291;
			this.match(LatexParser.EQ);
			this.state = 292;
			localctx._start_expr = this.expr(0);
			this.state = 293;
			this.match(LatexParser.R_BRACE);
			}
			this.state = 301;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 295;
				this.match(LatexParser.CARET);
				this.state = 296;
				this.match(LatexParser.L_BRACE);
				this.state = 297;
				localctx._end_expr = this.expr(0);
				this.state = 298;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
			case 66:
				{
				this.state = 300;
				_la = this._input.LA(1);
				if(!(_la===65 || _la===66)) {
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
			this.state = 303;
			this.match(LatexParser.L_PAREN);
			this.state = 304;
			localctx._operand_expr = this.expr(0);
			this.state = 305;
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
			this.state = 307;
			this.match(LatexParser.CMD_FRAC);
			this.state = 308;
			this.match(LatexParser.L_BRACE);
			this.state = 315;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 309;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 310;
				this.match(LatexParser.L_BRACE);
				this.state = 311;
				this.id();
				this.state = 312;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 314;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 317;
			this.match(LatexParser.R_BRACE);
			this.state = 318;
			this.match(LatexParser.L_BRACE);
			this.state = 325;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 319;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 320;
				this.match(LatexParser.L_BRACE);
				this.state = 321;
				this.id();
				this.state = 322;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 324;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 327;
			this.match(LatexParser.L_PAREN);
			this.state = 328;
			this.id();
			this.state = 329;
			this.match(LatexParser.R_PAREN);
			this.state = 330;
			this.match(LatexParser.R_BRACE);
			this.state = 331;
			this.match(LatexParser.L_PAREN);
			this.state = 332;
			this.expr(0);
			this.state = 333;
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
			this.state = 335;
			this.match(LatexParser.CMD_FRAC);
			this.state = 336;
			this.match(LatexParser.L_BRACE);
			this.state = 343;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 337;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 338;
				this.match(LatexParser.L_BRACE);
				this.state = 339;
				this.id();
				this.state = 340;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 342;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 351;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 345;
				this.match(LatexParser.CARET);
				this.state = 346;
				this.match(LatexParser.L_BRACE);
				this.state = 347;
				localctx._exp1 = this.number_();
				this.state = 348;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
				{
				this.state = 350;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 353;
			this.match(LatexParser.R_BRACE);
			this.state = 354;
			this.match(LatexParser.L_BRACE);
			this.state = 361;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 355;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 356;
				this.match(LatexParser.L_BRACE);
				this.state = 357;
				this.id();
				this.state = 358;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 360;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 363;
			this.match(LatexParser.L_PAREN);
			this.state = 364;
			this.id();
			this.state = 365;
			this.match(LatexParser.R_PAREN);
			this.state = 372;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 366;
				this.match(LatexParser.CARET);
				this.state = 367;
				this.match(LatexParser.L_BRACE);
				this.state = 368;
				localctx._exp2 = this.number_();
				this.state = 369;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
				{
				this.state = 371;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 374;
			this.match(LatexParser.R_BRACE);
			this.state = 375;
			this.match(LatexParser.L_PAREN);
			this.state = 376;
			this.expr(0);
			this.state = 377;
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
			this.state = 389;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 379;
				this.id();
				this.state = 380;
				this.match(LatexParser.EQ);
				this.state = 381;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 383;
				this.expr(0);
				this.state = 384;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===59 || _la===61)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 385;
				this.id();
				this.state = 386;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===59 || _la===61)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 387;
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
			this.state = 393;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 391;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 392;
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
			this.state = 395;
			this.id();
			this.state = 398;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 396;
				this.match(LatexParser.COMMA);
				this.state = 397;
				this.id();
				}
				}
				this.state = 400;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===63);
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
			this.state = 402;
			this.id();
			this.state = 403;
			_la = this._input.LA(1);
			if(!(_la===27 || _la===28)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 406;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				{
				this.state = 404;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 405;
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
			this.state = 408;
			this.guess();
			this.state = 411;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 409;
				this.match(LatexParser.COMMA);
				this.state = 410;
				this.guess();
				}
				}
				this.state = 413;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===63);
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
			this.state = 415;
			this.expr(0);
			this.state = 416;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 417;
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
			this.state = 419;
			this.expr(0);
			this.state = 420;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 421;
			this.expr(0);
			this.state = 422;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 423;
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
			this.state = 425;
			this.expr(0);
			this.state = 430;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===70) {
				{
				{
				this.state = 426;
				this.match(LatexParser.AMPERSAND);
				this.state = 427;
				this.expr(0);
				}
				}
				this.state = 432;
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
			this.state = 433;
			this.id();
			this.state = 434;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 435;
			this.argument();
			this.state = 440;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 436;
				this.match(LatexParser.COMMA);
				this.state = 437;
				this.argument();
				}
				}
				this.state = 442;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 443;
			this.match(LatexParser.R_PAREN);
			this.state = 448;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				this.state = 444;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 445;
				localctx._num_points = this.number_();
				this.state = 446;
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
			this.state = 456;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 450;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 451;
				this.match(LatexParser.L_BRACE);
				this.state = 452;
				this.id();
				this.state = 453;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 455;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 458;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 459;
			this.expr(0);
			this.state = 464;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 460;
				this.match(LatexParser.COMMA);
				this.state = 461;
				this.expr(0);
				}
				}
				this.state = 466;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 467;
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
	public index(): IndexContext {
		let localctx: IndexContext = new IndexContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, LatexParser.RULE_index);
		let _la: number;
		try {
			this.state = 486;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 469;
				localctx._direct = this.expr(0);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 471;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
					{
					this.state = 470;
					localctx._start = this.expr(0);
					}
				}

				this.state = 473;
				this.match(LatexParser.COLON);
				this.state = 475;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
					{
					this.state = 474;
					localctx._stop = this.expr(0);
					}
				}

				}
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				{
				this.state = 478;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
					{
					this.state = 477;
					localctx._start = this.expr(0);
					}
				}

				this.state = 480;
				this.match(LatexParser.COLON);
				this.state = 481;
				localctx._stride = this.expr(0);
				this.state = 482;
				this.match(LatexParser.COLON);
				this.state = 484;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
					{
					this.state = 483;
					localctx._stop = this.expr(0);
					}
				}

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
		let _startState: number = 62;
		this.enterRecursionRule(localctx, 62, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 616;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 489;
				this.id();
				this.state = 490;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 492;
				this.id();
				this.state = 493;
				_la = this._input.LA(1);
				if(!(_la===65 || _la===66)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 494;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 496;
				this.id();
				this.state = 497;
				this.match(LatexParser.CARET);
				this.state = 498;
				this.match(LatexParser.L_BRACE);
				this.state = 499;
				this.expr(0);
				this.state = 500;
				this.match(LatexParser.R_BRACE);
				this.state = 501;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 503;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 504;
				this.match(LatexParser.CMD_SQRT);
				this.state = 505;
				this.match(LatexParser.L_BRACE);
				this.state = 506;
				this.expr(0);
				this.state = 507;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new MatrixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 509;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 510;
				this.matrix_row();
				this.state = 515;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===71) {
					{
					{
					this.state = 511;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 512;
					this.matrix_row();
					}
					}
					this.state = 517;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 518;
				this.match(LatexParser.END_MATRIX);
				}
				break;
			case 7:
				{
				localctx = new TrigFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 520;
				this.trig_function();
				}
				break;
			case 8:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 521;
				this.indefinite_integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 522;
				this.integral_cmd();
				}
				break;
			case 10:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 523;
				this.derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 524;
				this.n_derivative_cmd();
				}
				break;
			case 12:
				{
				localctx = new SumProdContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 525;
				this.sum_prod_cmd();
				}
				break;
			case 13:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 527;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 526;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 529;
				this.match(LatexParser.CMD_LN);
				this.state = 530;
				this.match(LatexParser.L_PAREN);
				this.state = 531;
				this.expr(0);
				this.state = 532;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 535;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 534;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 537;
				this.match(LatexParser.CMD_LOG);
				this.state = 538;
				this.match(LatexParser.L_PAREN);
				this.state = 539;
				this.expr(0);
				this.state = 540;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 542;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 543;
				this.match(LatexParser.L_BRACE);
				this.state = 544;
				this.expr(0);
				this.state = 545;
				this.match(LatexParser.R_BRACE);
				this.state = 546;
				this.match(LatexParser.L_PAREN);
				this.state = 547;
				this.expr(0);
				this.state = 548;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 16:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 550;
				_la = this._input.LA(1);
				if(!(_la===49 || _la===50)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 551;
				this.match(LatexParser.L_PAREN);
				this.state = 552;
				this.expr(0);
				this.state = 553;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 17:
				{
				localctx = new NormContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 555;
				this.match(LatexParser.DOUBLE_VBAR);
				this.state = 556;
				this.expr(0);
				this.state = 557;
				this.match(LatexParser.DOUBLE_VBAR);
				}
				break;
			case 18:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 559;
				this.match(LatexParser.VBAR);
				this.state = 560;
				this.expr(0);
				this.state = 561;
				this.match(LatexParser.VBAR);
				}
				break;
			case 19:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 563;
				this.number_with_units();
				}
				break;
			case 20:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 564;
				this.number_();
				}
				break;
			case 21:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 565;
				this.match(LatexParser.SUB);
				this.state = 566;
				this.expr(28);
				}
				break;
			case 22:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 567;
				this.match(LatexParser.CMD_FRAC);
				this.state = 568;
				this.match(LatexParser.L_BRACE);
				this.state = 569;
				this.expr(0);
				this.state = 570;
				this.match(LatexParser.R_BRACE);
				this.state = 571;
				this.match(LatexParser.L_BRACE);
				this.state = 572;
				this.expr(0);
				this.state = 573;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 23:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 575;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 24:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 576;
				this.id();
				}
				break;
			case 25:
				{
				localctx = new UserFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 577;
				this.user_function();
				}
				break;
			case 26:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 578;
				this.builtin_function();
				}
				break;
			case 27:
				{
				localctx = new InfinityExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 579;
				this.match(LatexParser.INFINITY);
				}
				break;
			case 28:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 580;
				this.match(LatexParser.L_PAREN);
				this.state = 581;
				this.expr(0);
				this.state = 582;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 29:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 584;
				this.number_();
				this.state = 585;
				this.expr(11);
				}
				break;
			case 30:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 587;
				this.number_with_units();
				this.state = 588;
				this.expr(10);
				}
				break;
			case 31:
				{
				localctx = new EmptyPlaceholderContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 590;
				this.match(LatexParser.CMD_PLACEHOLDER);
				this.state = 593;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 46, this._ctx) ) {
				case 1:
					{
					this.state = 591;
					this.match(LatexParser.L_BRACE);
					this.state = 592;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				}
				break;
			case 32:
				{
				localctx = new RemoveOperatorFontContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 600;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 47, this._ctx) ) {
				case 1:
					{
					this.state = 595;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 596;
					this.match(LatexParser.L_BRACE);
					this.state = 597;
					this.expr(0);
					this.state = 598;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				this.state = 605;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 64:
					{
					this.state = 602;
					this.match(LatexParser.DECIMAL_POINT);
					}
					break;
				case 56:
				case 67:
					{
					this.state = 603;
					this.number_();
					}
					break;
				case 58:
					{
					this.state = 604;
					this.match(LatexParser.EQ);
					}
					break;
				case 20:
					break;
				default:
					break;
				}
				this.state = 607;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 608;
				this.match(LatexParser.L_BRACE);
				this.state = 609;
				this.expr(0);
				this.state = 610;
				this.match(LatexParser.R_BRACE);
				this.state = 614;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 49, this._ctx) ) {
				case 1:
					{
					this.state = 611;
					this.match(LatexParser.DECIMAL_POINT);
					}
					break;
				case 2:
					{
					this.state = 612;
					this.number_();
					}
					break;
				case 3:
					{
					this.state = 613;
					this.match(LatexParser.EQ);
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 680;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 52, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 678;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
					case 1:
						{
						localctx = new MatrixMultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 618;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 619;
						this.match(LatexParser.CMD_TIMES);
						this.state = 620;
						this.expr(28);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 621;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 622;
						this.match(LatexParser.CMD_CDOT);
						this.state = 623;
						this.expr(27);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 624;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 625;
						this.match(LatexParser.SUB);
						this.state = 626;
						this.expr(24);
						}
						break;
					case 4:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 627;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 628;
						this.match(LatexParser.ADD);
						this.state = 629;
						this.expr(23);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 630;
						if (!(this.precpred(this._ctx, 50))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 50)");
						}
						this.state = 631;
						_la = this._input.LA(1);
						if(!(_la===65 || _la===66)) {
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
						this.state = 632;
						if (!(this.precpred(this._ctx, 49))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 49)");
						}
						this.state = 633;
						this.match(LatexParser.CARET);
						this.state = 634;
						this.match(LatexParser.L_BRACE);
						this.state = 635;
						this.expr(0);
						this.state = 636;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 7:
						{
						localctx = new MatrixIndexContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 638;
						if (!(this.precpred(this._ctx, 48))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 48)");
						}
						this.state = 639;
						this.match(LatexParser.UNDERSCORE);
						this.state = 640;
						this.match(LatexParser.L_BRACE);
						this.state = 641;
						(localctx as MatrixIndexContext)._row = this.index();
						this.state = 642;
						this.match(LatexParser.COMMA);
						this.state = 643;
						(localctx as MatrixIndexContext)._col = this.index();
						this.state = 644;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 8:
						{
						localctx = new TransposeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 646;
						if (!(this.precpred(this._ctx, 47))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 47)");
						}
						this.state = 647;
						this.match(LatexParser.TRANSPOSE);
						}
						break;
					case 9:
						{
						localctx = new FactorialContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 648;
						if (!(this.precpred(this._ctx, 46))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 46)");
						}
						this.state = 649;
						this.match(LatexParser.EXCLAMATION);
						}
						break;
					case 10:
						{
						localctx = new EmptySubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 650;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 651;
						this.match(LatexParser.UNDERSCORE);
						this.state = 652;
						this.match(LatexParser.L_BRACE);
						this.state = 653;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 11:
						{
						localctx = new EmptySuperscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 654;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 655;
						this.match(LatexParser.CARET);
						this.state = 656;
						this.match(LatexParser.L_BRACE);
						this.state = 657;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 12:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 658;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 659;
						this.id();
						}
						break;
					case 13:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 660;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 661;
						this.number_();
						}
						break;
					case 14:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 662;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 663;
						this.number_with_units();
						}
						break;
					case 15:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 664;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 665;
						this.user_function();
						}
						break;
					case 16:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 666;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 667;
						this.builtin_function();
						}
						break;
					case 17:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 668;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 669;
						this.trig_function();
						}
						break;
					case 18:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 670;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 671;
						this.indefinite_integral_cmd();
						}
						break;
					case 19:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 672;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 673;
						this.integral_cmd();
						}
						break;
					case 20:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 674;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 675;
						this.derivative_cmd();
						}
						break;
					case 21:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 676;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 677;
						this.n_derivative_cmd();
						}
						break;
					}
					}
				}
				this.state = 682;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 52, this._ctx);
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
		this.enterRule(localctx, 64, LatexParser.RULE_u_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 683;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 684;
			this.u_expr(0);
			this.state = 685;
			_la = this._input.LA(1);
			if(!(_la===80 || _la===81)) {
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
		this.enterRule(localctx, 66, LatexParser.RULE_u_insert_matrix);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 687;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 688;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===94 || _la===95)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 689;
			_la = this._input.LA(1);
			if(!(_la===85 || _la===87)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 690;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===94 || _la===95)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 691;
			_la = this._input.LA(1);
			if(!(_la===80 || _la===81)) {
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
		this.enterRule(localctx, 68, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.state = 701;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 82:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 693;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 694;
				this.match(LatexParser.U_L_BRACE);
				this.state = 695;
				_la = this._input.LA(1);
				if(!(_la===94 || _la===95)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 696;
				this.match(LatexParser.U_R_BRACE);
				this.state = 697;
				this.match(LatexParser.U_L_BRACE);
				this.state = 698;
				this.match(LatexParser.U_NUMBER);
				this.state = 699;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 83:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 700;
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
		let _startState: number = 70;
		this.enterRecursionRule(localctx, 70, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 725;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 86:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 704;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 705;
				this.match(LatexParser.U_L_BRACE);
				this.state = 706;
				this.expr(0);
				this.state = 707;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 82:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 709;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 710;
				this.match(LatexParser.U_L_BRACE);
				this.state = 713;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 82:
				case 86:
				case 89:
				case 90:
					{
					this.state = 711;
					this.u_expr(0);
					}
					break;
				case 94:
					{
					this.state = 712;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 715;
				this.match(LatexParser.U_R_BRACE);
				this.state = 716;
				this.match(LatexParser.U_L_BRACE);
				this.state = 717;
				this.u_expr(0);
				this.state = 718;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 89:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 720;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 90:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 721;
				this.match(LatexParser.U_L_PAREN);
				this.state = 722;
				this.u_expr(0);
				this.state = 723;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 749;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 57, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 747;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 56, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 727;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 728;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 729;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 730;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 731;
						this.match(LatexParser.U_CARET);
						this.state = 732;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 733;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 734;
						this.match(LatexParser.U_CARET);
						this.state = 735;
						this.match(LatexParser.U_L_BRACE);
						this.state = 736;
						this.match(LatexParser.U_NUMBER);
						this.state = 737;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 738;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 739;
						this.match(LatexParser.U_CARET);
						this.state = 740;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 741;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 742;
						this.match(LatexParser.U_CARET);
						this.state = 743;
						this.match(LatexParser.U_L_BRACE);
						this.state = 744;
						this.u_fraction();
						this.state = 745;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 751;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 57, this._ctx);
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
		case 31:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 35:
			return this.u_expr_sempred(localctx as U_exprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 27);
		case 1:
			return this.precpred(this._ctx, 26);
		case 2:
			return this.precpred(this._ctx, 23);
		case 3:
			return this.precpred(this._ctx, 22);
		case 4:
			return this.precpred(this._ctx, 50);
		case 5:
			return this.precpred(this._ctx, 49);
		case 6:
			return this.precpred(this._ctx, 48);
		case 7:
			return this.precpred(this._ctx, 47);
		case 8:
			return this.precpred(this._ctx, 46);
		case 9:
			return this.precpred(this._ctx, 16);
		case 10:
			return this.precpred(this._ctx, 15);
		case 11:
			return this.precpred(this._ctx, 14);
		case 12:
			return this.precpred(this._ctx, 13);
		case 13:
			return this.precpred(this._ctx, 12);
		case 14:
			return this.precpred(this._ctx, 9);
		case 15:
			return this.precpred(this._ctx, 8);
		case 16:
			return this.precpred(this._ctx, 7);
		case 17:
			return this.precpred(this._ctx, 6);
		case 18:
			return this.precpred(this._ctx, 5);
		case 19:
			return this.precpred(this._ctx, 4);
		case 20:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}
	private u_expr_sempred(localctx: U_exprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 21:
			return this.precpred(this._ctx, 4);
		case 22:
			return this.precpred(this._ctx, 9);
		case 23:
			return this.precpred(this._ctx, 8);
		case 24:
			return this.precpred(this._ctx, 7);
		case 25:
			return this.precpred(this._ctx, 6);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,102,753,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
	1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,0,90,8,0,1,0,1,0,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,104,8,1,1,1,3,1,107,8,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,120,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	1,2,1,2,1,2,1,2,1,2,1,2,3,2,136,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	1,2,1,2,3,2,149,8,2,1,3,5,3,152,8,3,10,3,12,3,155,9,3,1,3,1,3,5,3,159,8,
	3,10,3,12,3,162,9,3,4,3,164,8,3,11,3,12,3,165,1,4,1,4,1,5,3,5,171,8,5,1,
	5,1,5,1,6,1,6,3,6,177,8,6,1,6,1,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,4,8,188,8,
	8,11,8,12,8,189,1,9,1,9,1,9,3,9,195,8,9,1,10,1,10,1,10,3,10,200,8,10,1,
	11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,5,12,213,8,12,10,12,
	12,12,216,9,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,13,1,14,3,14,227,8,
	14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,241,
	8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,252,8,15,1,15,1,
	15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,3,16,264,8,16,1,16,1,16,1,16,
	1,16,1,16,1,16,3,16,272,8,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,
	16,3,16,283,8,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
	1,17,1,17,1,17,1,17,1,17,1,17,3,17,302,8,17,1,17,1,17,1,17,1,17,1,18,1,
	18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,316,8,18,1,18,1,18,1,18,1,18,1,18,
	1,18,1,18,1,18,3,18,326,8,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,
	19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,344,8,19,1,19,1,19,1,19,1,19,
	1,19,1,19,3,19,352,8,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,362,
	8,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,373,8,19,1,19,1,
	19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,3,20,
	390,8,20,1,21,1,21,3,21,394,8,21,1,22,1,22,1,22,4,22,399,8,22,11,22,12,
	22,400,1,23,1,23,1,23,1,23,3,23,407,8,23,1,24,1,24,1,24,4,24,412,8,24,11,
	24,12,24,413,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,26,1,27,1,27,
	1,27,5,27,429,8,27,10,27,12,27,432,9,27,1,28,1,28,1,28,1,28,1,28,5,28,439,
	8,28,10,28,12,28,442,9,28,1,28,1,28,1,28,1,28,1,28,3,28,449,8,28,1,29,1,
	29,1,29,1,29,1,29,1,29,3,29,457,8,29,1,29,1,29,1,29,1,29,5,29,463,8,29,
	10,29,12,29,466,9,29,1,29,1,29,1,30,1,30,3,30,472,8,30,1,30,1,30,3,30,476,
	8,30,1,30,3,30,479,8,30,1,30,1,30,1,30,1,30,3,30,485,8,30,3,30,487,8,30,
	1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,
	31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,5,31,514,8,31,10,31,
	12,31,517,9,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,528,8,
	31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,536,8,31,1,31,1,31,1,31,1,31,1,31,
	1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,
	31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,
	1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,
	31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,594,8,31,1,31,1,31,1,31,1,31,
	1,31,3,31,601,8,31,1,31,1,31,1,31,3,31,606,8,31,1,31,1,31,1,31,1,31,1,31,
	1,31,1,31,3,31,615,8,31,3,31,617,8,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,
	1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,
	31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,
	1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,
	31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,5,31,679,8,31,10,31,12,
	31,682,9,31,1,32,1,32,1,32,1,32,1,33,1,33,1,33,1,33,1,33,1,33,1,34,1,34,
	1,34,1,34,1,34,1,34,1,34,1,34,3,34,702,8,34,1,35,1,35,1,35,1,35,1,35,1,
	35,1,35,1,35,1,35,1,35,3,35,714,8,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,
	1,35,1,35,1,35,3,35,726,8,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,
	35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,5,35,748,8,35,
	10,35,12,35,751,9,35,1,35,2,153,160,2,62,70,36,0,2,4,6,8,10,12,14,16,18,
	20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,
	68,70,0,12,1,0,33,45,1,0,16,17,1,0,65,66,1,0,18,19,2,0,59,59,61,61,1,0,
	27,28,1,0,59,62,1,0,49,50,1,0,1,2,1,0,80,81,1,0,94,95,2,0,85,85,87,87,851,
	0,89,1,0,0,0,2,103,1,0,0,0,4,121,1,0,0,0,6,153,1,0,0,0,8,167,1,0,0,0,10,
	170,1,0,0,0,12,176,1,0,0,0,14,180,1,0,0,0,16,184,1,0,0,0,18,191,1,0,0,0,
	20,196,1,0,0,0,22,201,1,0,0,0,24,205,1,0,0,0,26,219,1,0,0,0,28,226,1,0,
	0,0,30,240,1,0,0,0,32,263,1,0,0,0,34,288,1,0,0,0,36,307,1,0,0,0,38,335,
	1,0,0,0,40,389,1,0,0,0,42,393,1,0,0,0,44,395,1,0,0,0,46,402,1,0,0,0,48,
	408,1,0,0,0,50,415,1,0,0,0,52,419,1,0,0,0,54,425,1,0,0,0,56,433,1,0,0,0,
	58,456,1,0,0,0,60,486,1,0,0,0,62,616,1,0,0,0,64,683,1,0,0,0,66,687,1,0,
	0,0,68,701,1,0,0,0,70,725,1,0,0,0,72,90,3,14,7,0,73,90,3,16,8,0,74,90,3,
	18,9,0,75,90,3,20,10,0,76,90,3,22,11,0,77,90,3,64,32,0,78,90,3,10,5,0,79,
	90,3,8,4,0,80,90,3,44,22,0,81,90,3,46,23,0,82,90,3,48,24,0,83,90,3,62,31,
	0,84,90,3,42,21,0,85,90,3,24,12,0,86,90,3,6,3,0,87,90,3,2,1,0,88,90,3,4,
	2,0,89,72,1,0,0,0,89,73,1,0,0,0,89,74,1,0,0,0,89,75,1,0,0,0,89,76,1,0,0,
	0,89,77,1,0,0,0,89,78,1,0,0,0,89,79,1,0,0,0,89,80,1,0,0,0,89,81,1,0,0,0,
	89,82,1,0,0,0,89,83,1,0,0,0,89,84,1,0,0,0,89,85,1,0,0,0,89,86,1,0,0,0,89,
	87,1,0,0,0,89,88,1,0,0,0,89,90,1,0,0,0,90,91,1,0,0,0,91,92,5,0,0,1,92,1,
	1,0,0,0,93,94,5,7,0,0,94,95,3,62,31,0,95,96,5,63,0,0,96,97,3,62,31,0,97,
	98,5,8,0,0,98,104,1,0,0,0,99,100,3,62,31,0,100,101,5,63,0,0,101,102,3,62,
	31,0,102,104,1,0,0,0,103,93,1,0,0,0,103,99,1,0,0,0,104,106,1,0,0,0,105,
	107,5,32,0,0,106,105,1,0,0,0,106,107,1,0,0,0,107,108,1,0,0,0,108,119,5,
	58,0,0,109,110,5,7,0,0,110,111,3,64,32,0,111,112,5,63,0,0,112,113,3,64,
	32,0,113,114,5,8,0,0,114,120,1,0,0,0,115,116,3,64,32,0,116,117,5,63,0,0,
	117,118,3,64,32,0,118,120,1,0,0,0,119,109,1,0,0,0,119,115,1,0,0,0,119,120,
	1,0,0,0,120,3,1,0,0,0,121,122,5,7,0,0,122,123,3,62,31,0,123,124,5,63,0,
	0,124,125,3,62,31,0,125,126,5,8,0,0,126,127,1,0,0,0,127,128,5,74,0,0,128,
	129,5,7,0,0,129,130,3,40,20,0,130,135,5,8,0,0,131,132,5,74,0,0,132,133,
	3,10,5,0,133,134,5,74,0,0,134,136,1,0,0,0,135,131,1,0,0,0,135,136,1,0,0,
	0,136,137,1,0,0,0,137,148,5,58,0,0,138,139,5,7,0,0,139,140,3,64,32,0,140,
	141,5,63,0,0,141,142,3,64,32,0,142,143,5,8,0,0,143,149,1,0,0,0,144,145,
	3,64,32,0,145,146,5,63,0,0,146,147,3,64,32,0,147,149,1,0,0,0,148,138,1,
	0,0,0,148,144,1,0,0,0,148,149,1,0,0,0,149,5,1,0,0,0,150,152,9,0,0,0,151,
	150,1,0,0,0,152,155,1,0,0,0,153,154,1,0,0,0,153,151,1,0,0,0,154,163,1,0,
	0,0,155,153,1,0,0,0,156,160,3,66,33,0,157,159,9,0,0,0,158,157,1,0,0,0,159,
	162,1,0,0,0,160,161,1,0,0,0,160,158,1,0,0,0,161,164,1,0,0,0,162,160,1,0,
	0,0,163,156,1,0,0,0,164,165,1,0,0,0,165,163,1,0,0,0,165,166,1,0,0,0,166,
	7,1,0,0,0,167,168,5,74,0,0,168,9,1,0,0,0,169,171,5,56,0,0,170,169,1,0,0,
	0,170,171,1,0,0,0,171,172,1,0,0,0,172,173,5,67,0,0,173,11,1,0,0,0,174,177,
	3,10,5,0,175,177,3,8,4,0,176,174,1,0,0,0,176,175,1,0,0,0,177,178,1,0,0,
	0,178,179,3,64,32,0,179,13,1,0,0,0,180,181,3,8,4,0,181,182,5,58,0,0,182,
	183,3,62,31,0,183,15,1,0,0,0,184,187,3,14,7,0,185,186,5,63,0,0,186,188,
	3,14,7,0,187,185,1,0,0,0,188,189,1,0,0,0,189,187,1,0,0,0,189,190,1,0,0,
	0,190,17,1,0,0,0,191,192,3,14,7,0,192,194,5,58,0,0,193,195,3,64,32,0,194,
	193,1,0,0,0,194,195,1,0,0,0,195,19,1,0,0,0,196,197,3,62,31,0,197,199,5,
	58,0,0,198,200,3,64,32,0,199,198,1,0,0,0,199,200,1,0,0,0,200,21,1,0,0,0,
	201,202,3,62,31,0,202,203,5,58,0,0,203,204,3,62,31,0,204,23,1,0,0,0,205,
	206,3,8,4,0,206,207,5,58,0,0,207,208,3,8,4,0,208,209,5,7,0,0,209,214,3,
	26,13,0,210,211,5,63,0,0,211,213,3,26,13,0,212,210,1,0,0,0,213,216,1,0,
	0,0,214,212,1,0,0,0,214,215,1,0,0,0,215,217,1,0,0,0,216,214,1,0,0,0,217,
	218,5,8,0,0,218,25,1,0,0,0,219,220,5,7,0,0,220,221,3,62,31,0,221,222,5,
	63,0,0,222,223,3,42,21,0,223,224,5,8,0,0,224,27,1,0,0,0,225,227,5,31,0,
	0,226,225,1,0,0,0,226,227,1,0,0,0,227,228,1,0,0,0,228,229,7,0,0,0,229,230,
	5,7,0,0,230,231,3,62,31,0,231,232,5,8,0,0,232,29,1,0,0,0,233,241,5,14,0,
	0,234,235,5,15,0,0,235,236,5,5,0,0,236,237,5,6,0,0,237,238,5,57,0,0,238,
	239,5,5,0,0,239,241,5,6,0,0,240,233,1,0,0,0,240,234,1,0,0,0,241,242,1,0,
	0,0,242,243,5,7,0,0,243,244,3,62,31,0,244,251,5,8,0,0,245,246,5,20,0,0,
	246,247,5,5,0,0,247,248,3,8,4,0,248,249,5,6,0,0,249,252,1,0,0,0,250,252,
	3,8,4,0,251,245,1,0,0,0,251,250,1,0,0,0,252,253,1,0,0,0,253,254,5,7,0,0,
	254,255,3,8,4,0,255,256,5,8,0,0,256,31,1,0,0,0,257,258,5,15,0,0,258,259,
	5,5,0,0,259,260,3,62,31,0,260,261,5,6,0,0,261,264,1,0,0,0,262,264,7,1,0,
	0,263,257,1,0,0,0,263,262,1,0,0,0,264,271,1,0,0,0,265,266,5,57,0,0,266,
	267,5,5,0,0,267,268,3,62,31,0,268,269,5,6,0,0,269,272,1,0,0,0,270,272,7,
	2,0,0,271,265,1,0,0,0,271,270,1,0,0,0,272,273,1,0,0,0,273,274,5,7,0,0,274,
	275,3,62,31,0,275,282,5,8,0,0,276,277,5,20,0,0,277,278,5,5,0,0,278,279,
	3,8,4,0,279,280,5,6,0,0,280,283,1,0,0,0,281,283,3,8,4,0,282,276,1,0,0,0,
	282,281,1,0,0,0,283,284,1,0,0,0,284,285,5,7,0,0,285,286,3,8,4,0,286,287,
	5,8,0,0,287,33,1,0,0,0,288,289,7,3,0,0,289,290,5,5,0,0,290,291,3,8,4,0,
	291,292,5,58,0,0,292,293,3,62,31,0,293,294,5,6,0,0,294,301,1,0,0,0,295,
	296,5,57,0,0,296,297,5,5,0,0,297,298,3,62,31,0,298,299,5,6,0,0,299,302,
	1,0,0,0,300,302,7,2,0,0,301,295,1,0,0,0,301,300,1,0,0,0,302,303,1,0,0,0,
	303,304,5,7,0,0,304,305,3,62,31,0,305,306,5,8,0,0,306,35,1,0,0,0,307,308,
	5,21,0,0,308,315,5,5,0,0,309,310,5,20,0,0,310,311,5,5,0,0,311,312,3,8,4,
	0,312,313,5,6,0,0,313,316,1,0,0,0,314,316,3,8,4,0,315,309,1,0,0,0,315,314,
	1,0,0,0,316,317,1,0,0,0,317,318,5,6,0,0,318,325,5,5,0,0,319,320,5,20,0,
	0,320,321,5,5,0,0,321,322,3,8,4,0,322,323,5,6,0,0,323,326,1,0,0,0,324,326,
	3,8,4,0,325,319,1,0,0,0,325,324,1,0,0,0,326,327,1,0,0,0,327,328,5,7,0,0,
	328,329,3,8,4,0,329,330,5,8,0,0,330,331,5,6,0,0,331,332,5,7,0,0,332,333,
	3,62,31,0,333,334,5,8,0,0,334,37,1,0,0,0,335,336,5,21,0,0,336,343,5,5,0,
	0,337,338,5,20,0,0,338,339,5,5,0,0,339,340,3,8,4,0,340,341,5,6,0,0,341,
	344,1,0,0,0,342,344,3,8,4,0,343,337,1,0,0,0,343,342,1,0,0,0,344,351,1,0,
	0,0,345,346,5,57,0,0,346,347,5,5,0,0,347,348,3,10,5,0,348,349,5,6,0,0,349,
	352,1,0,0,0,350,352,5,65,0,0,351,345,1,0,0,0,351,350,1,0,0,0,352,353,1,
	0,0,0,353,354,5,6,0,0,354,361,5,5,0,0,355,356,5,20,0,0,356,357,5,5,0,0,
	357,358,3,8,4,0,358,359,5,6,0,0,359,362,1,0,0,0,360,362,3,8,4,0,361,355,
	1,0,0,0,361,360,1,0,0,0,362,363,1,0,0,0,363,364,5,7,0,0,364,365,3,8,4,0,
	365,372,5,8,0,0,366,367,5,57,0,0,367,368,5,5,0,0,368,369,3,10,5,0,369,370,
	5,6,0,0,370,373,1,0,0,0,371,373,5,65,0,0,372,366,1,0,0,0,372,371,1,0,0,
	0,373,374,1,0,0,0,374,375,5,6,0,0,375,376,5,7,0,0,376,377,3,62,31,0,377,
	378,5,8,0,0,378,39,1,0,0,0,379,380,3,8,4,0,380,381,5,58,0,0,381,382,3,62,
	31,0,382,390,1,0,0,0,383,384,3,62,31,0,384,385,7,4,0,0,385,386,3,8,4,0,
	386,387,7,4,0,0,387,388,3,62,31,0,388,390,1,0,0,0,389,379,1,0,0,0,389,383,
	1,0,0,0,390,41,1,0,0,0,391,394,3,50,25,0,392,394,3,52,26,0,393,391,1,0,
	0,0,393,392,1,0,0,0,394,43,1,0,0,0,395,398,3,8,4,0,396,397,5,63,0,0,397,
	399,3,8,4,0,398,396,1,0,0,0,399,400,1,0,0,0,400,398,1,0,0,0,400,401,1,0,
	0,0,401,45,1,0,0,0,402,403,3,8,4,0,403,406,7,5,0,0,404,407,3,10,5,0,405,
	407,3,12,6,0,406,404,1,0,0,0,406,405,1,0,0,0,407,47,1,0,0,0,408,411,3,46,
	23,0,409,410,5,63,0,0,410,412,3,46,23,0,411,409,1,0,0,0,412,413,1,0,0,0,
	413,411,1,0,0,0,413,414,1,0,0,0,414,49,1,0,0,0,415,416,3,62,31,0,416,417,
	7,6,0,0,417,418,3,62,31,0,418,51,1,0,0,0,419,420,3,62,31,0,420,421,7,6,
	0,0,421,422,3,62,31,0,422,423,7,6,0,0,423,424,3,62,31,0,424,53,1,0,0,0,
	425,430,3,62,31,0,426,427,5,70,0,0,427,429,3,62,31,0,428,426,1,0,0,0,429,
	432,1,0,0,0,430,428,1,0,0,0,430,431,1,0,0,0,431,55,1,0,0,0,432,430,1,0,
	0,0,433,434,3,8,4,0,434,435,5,7,0,0,435,440,3,40,20,0,436,437,5,63,0,0,
	437,439,3,40,20,0,438,436,1,0,0,0,439,442,1,0,0,0,440,438,1,0,0,0,440,441,
	1,0,0,0,441,443,1,0,0,0,442,440,1,0,0,0,443,448,5,8,0,0,444,445,5,74,0,
	0,445,446,3,10,5,0,446,447,5,74,0,0,447,449,1,0,0,0,448,444,1,0,0,0,448,
	449,1,0,0,0,449,57,1,0,0,0,450,451,5,20,0,0,451,452,5,5,0,0,452,453,3,8,
	4,0,453,454,5,6,0,0,454,457,1,0,0,0,455,457,3,8,4,0,456,450,1,0,0,0,456,
	455,1,0,0,0,457,458,1,0,0,0,458,459,5,7,0,0,459,464,3,62,31,0,460,461,5,
	63,0,0,461,463,3,62,31,0,462,460,1,0,0,0,463,466,1,0,0,0,464,462,1,0,0,
	0,464,465,1,0,0,0,465,467,1,0,0,0,466,464,1,0,0,0,467,468,5,8,0,0,468,59,
	1,0,0,0,469,487,3,62,31,0,470,472,3,62,31,0,471,470,1,0,0,0,471,472,1,0,
	0,0,472,473,1,0,0,0,473,475,5,3,0,0,474,476,3,62,31,0,475,474,1,0,0,0,475,
	476,1,0,0,0,476,487,1,0,0,0,477,479,3,62,31,0,478,477,1,0,0,0,478,479,1,
	0,0,0,479,480,1,0,0,0,480,481,5,3,0,0,481,482,3,62,31,0,482,484,5,3,0,0,
	483,485,3,62,31,0,484,483,1,0,0,0,484,485,1,0,0,0,485,487,1,0,0,0,486,469,
	1,0,0,0,486,471,1,0,0,0,486,478,1,0,0,0,487,61,1,0,0,0,488,489,6,31,-1,
	0,489,490,3,8,4,0,490,491,5,73,0,0,491,617,1,0,0,0,492,493,3,8,4,0,493,
	494,7,2,0,0,494,495,5,72,0,0,495,617,1,0,0,0,496,497,3,8,4,0,497,498,5,
	57,0,0,498,499,5,5,0,0,499,500,3,62,31,0,500,501,5,6,0,0,501,502,5,72,0,
	0,502,617,1,0,0,0,503,617,5,26,0,0,504,505,5,25,0,0,505,506,5,5,0,0,506,
	507,3,62,31,0,507,508,5,6,0,0,508,617,1,0,0,0,509,510,5,68,0,0,510,515,
	3,54,27,0,511,512,5,71,0,0,512,514,3,54,27,0,513,511,1,0,0,0,514,517,1,
	0,0,0,515,513,1,0,0,0,515,516,1,0,0,0,516,518,1,0,0,0,517,515,1,0,0,0,518,
	519,5,69,0,0,519,617,1,0,0,0,520,617,3,28,14,0,521,617,3,30,15,0,522,617,
	3,32,16,0,523,617,3,36,18,0,524,617,3,38,19,0,525,617,3,34,17,0,526,528,
	5,31,0,0,527,526,1,0,0,0,527,528,1,0,0,0,528,529,1,0,0,0,529,530,5,46,0,
	0,530,531,5,7,0,0,531,532,3,62,31,0,532,533,5,8,0,0,533,617,1,0,0,0,534,
	536,5,31,0,0,535,534,1,0,0,0,535,536,1,0,0,0,536,537,1,0,0,0,537,538,5,
	47,0,0,538,539,5,7,0,0,539,540,3,62,31,0,540,541,5,8,0,0,541,617,1,0,0,
	0,542,543,5,48,0,0,543,544,5,5,0,0,544,545,3,62,31,0,545,546,5,6,0,0,546,
	547,5,7,0,0,547,548,3,62,31,0,548,549,5,8,0,0,549,617,1,0,0,0,550,551,7,
	7,0,0,551,552,5,7,0,0,552,553,3,62,31,0,553,554,5,8,0,0,554,617,1,0,0,0,
	555,556,5,10,0,0,556,557,3,62,31,0,557,558,5,10,0,0,558,617,1,0,0,0,559,
	560,5,9,0,0,560,561,3,62,31,0,561,562,5,9,0,0,562,617,1,0,0,0,563,617,3,
	12,6,0,564,617,3,10,5,0,565,566,5,56,0,0,566,617,3,62,31,28,567,568,5,21,
	0,0,568,569,5,5,0,0,569,570,3,62,31,0,570,571,5,6,0,0,571,572,5,5,0,0,572,
	573,3,62,31,0,573,574,5,6,0,0,574,617,1,0,0,0,575,617,5,22,0,0,576,617,
	3,8,4,0,577,617,3,56,28,0,578,617,3,58,29,0,579,617,5,13,0,0,580,581,5,
	7,0,0,581,582,3,62,31,0,582,583,5,8,0,0,583,617,1,0,0,0,584,585,3,10,5,
	0,585,586,3,62,31,11,586,617,1,0,0,0,587,588,3,12,6,0,588,589,3,62,31,10,
	589,617,1,0,0,0,590,593,5,29,0,0,591,592,5,5,0,0,592,594,5,6,0,0,593,591,
	1,0,0,0,593,594,1,0,0,0,594,617,1,0,0,0,595,596,5,20,0,0,596,597,5,5,0,
	0,597,598,3,62,31,0,598,599,5,6,0,0,599,601,1,0,0,0,600,595,1,0,0,0,600,
	601,1,0,0,0,601,605,1,0,0,0,602,606,5,64,0,0,603,606,3,10,5,0,604,606,5,
	58,0,0,605,602,1,0,0,0,605,603,1,0,0,0,605,604,1,0,0,0,605,606,1,0,0,0,
	606,607,1,0,0,0,607,608,5,20,0,0,608,609,5,5,0,0,609,610,3,62,31,0,610,
	614,5,6,0,0,611,615,5,64,0,0,612,615,3,10,5,0,613,615,5,58,0,0,614,611,
	1,0,0,0,614,612,1,0,0,0,614,613,1,0,0,0,614,615,1,0,0,0,615,617,1,0,0,0,
	616,488,1,0,0,0,616,492,1,0,0,0,616,496,1,0,0,0,616,503,1,0,0,0,616,504,
	1,0,0,0,616,509,1,0,0,0,616,520,1,0,0,0,616,521,1,0,0,0,616,522,1,0,0,0,
	616,523,1,0,0,0,616,524,1,0,0,0,616,525,1,0,0,0,616,527,1,0,0,0,616,535,
	1,0,0,0,616,542,1,0,0,0,616,550,1,0,0,0,616,555,1,0,0,0,616,559,1,0,0,0,
	616,563,1,0,0,0,616,564,1,0,0,0,616,565,1,0,0,0,616,567,1,0,0,0,616,575,
	1,0,0,0,616,576,1,0,0,0,616,577,1,0,0,0,616,578,1,0,0,0,616,579,1,0,0,0,
	616,580,1,0,0,0,616,584,1,0,0,0,616,587,1,0,0,0,616,590,1,0,0,0,616,600,
	1,0,0,0,617,680,1,0,0,0,618,619,10,27,0,0,619,620,5,24,0,0,620,679,3,62,
	31,28,621,622,10,26,0,0,622,623,5,23,0,0,623,679,3,62,31,27,624,625,10,
	23,0,0,625,626,5,56,0,0,626,679,3,62,31,24,627,628,10,22,0,0,628,629,5,
	55,0,0,629,679,3,62,31,23,630,631,10,50,0,0,631,679,7,2,0,0,632,633,10,
	49,0,0,633,634,5,57,0,0,634,635,5,5,0,0,635,636,3,62,31,0,636,637,5,6,0,
	0,637,679,1,0,0,0,638,639,10,48,0,0,639,640,5,11,0,0,640,641,5,5,0,0,641,
	642,3,60,30,0,642,643,5,63,0,0,643,644,3,60,30,0,644,645,5,6,0,0,645,679,
	1,0,0,0,646,647,10,47,0,0,647,679,5,30,0,0,648,649,10,46,0,0,649,679,5,
	12,0,0,650,651,10,16,0,0,651,652,5,11,0,0,652,653,5,5,0,0,653,679,5,6,0,
	0,654,655,10,15,0,0,655,656,5,57,0,0,656,657,5,5,0,0,657,679,5,6,0,0,658,
	659,10,14,0,0,659,679,3,8,4,0,660,661,10,13,0,0,661,679,3,10,5,0,662,663,
	10,12,0,0,663,679,3,12,6,0,664,665,10,9,0,0,665,679,3,56,28,0,666,667,10,
	8,0,0,667,679,3,58,29,0,668,669,10,7,0,0,669,679,3,28,14,0,670,671,10,6,
	0,0,671,679,3,30,15,0,672,673,10,5,0,0,673,679,3,32,16,0,674,675,10,4,0,
	0,675,679,3,36,18,0,676,677,10,3,0,0,677,679,3,38,19,0,678,618,1,0,0,0,
	678,621,1,0,0,0,678,624,1,0,0,0,678,627,1,0,0,0,678,630,1,0,0,0,678,632,
	1,0,0,0,678,638,1,0,0,0,678,646,1,0,0,0,678,648,1,0,0,0,678,650,1,0,0,0,
	678,654,1,0,0,0,678,658,1,0,0,0,678,660,1,0,0,0,678,662,1,0,0,0,678,664,
	1,0,0,0,678,666,1,0,0,0,678,668,1,0,0,0,678,670,1,0,0,0,678,672,1,0,0,0,
	678,674,1,0,0,0,678,676,1,0,0,0,679,682,1,0,0,0,680,678,1,0,0,0,680,681,
	1,0,0,0,681,63,1,0,0,0,682,680,1,0,0,0,683,684,7,8,0,0,684,685,3,70,35,
	0,685,686,7,9,0,0,686,65,1,0,0,0,687,688,7,8,0,0,688,689,7,10,0,0,689,690,
	7,11,0,0,690,691,7,10,0,0,691,692,7,9,0,0,692,67,1,0,0,0,693,694,5,82,0,
	0,694,695,5,92,0,0,695,696,7,10,0,0,696,697,5,93,0,0,697,698,5,92,0,0,698,
	699,5,95,0,0,699,702,5,93,0,0,700,702,5,83,0,0,701,693,1,0,0,0,701,700,
	1,0,0,0,702,69,1,0,0,0,703,704,6,35,-1,0,704,705,5,86,0,0,705,706,5,92,
	0,0,706,707,3,62,31,0,707,708,5,93,0,0,708,726,1,0,0,0,709,710,5,82,0,0,
	710,713,5,92,0,0,711,714,3,70,35,0,712,714,5,94,0,0,713,711,1,0,0,0,713,
	712,1,0,0,0,714,715,1,0,0,0,715,716,5,93,0,0,716,717,5,92,0,0,717,718,3,
	70,35,0,718,719,5,93,0,0,719,726,1,0,0,0,720,726,5,89,0,0,721,722,5,90,
	0,0,722,723,3,70,35,0,723,724,5,91,0,0,724,726,1,0,0,0,725,703,1,0,0,0,
	725,709,1,0,0,0,725,720,1,0,0,0,725,721,1,0,0,0,726,749,1,0,0,0,727,728,
	10,4,0,0,728,729,5,84,0,0,729,748,3,70,35,5,730,731,10,9,0,0,731,732,5,
	88,0,0,732,748,5,95,0,0,733,734,10,8,0,0,734,735,5,88,0,0,735,736,5,92,
	0,0,736,737,5,95,0,0,737,748,5,93,0,0,738,739,10,7,0,0,739,740,5,88,0,0,
	740,748,3,68,34,0,741,742,10,6,0,0,742,743,5,88,0,0,743,744,5,92,0,0,744,
	745,3,68,34,0,745,746,5,93,0,0,746,748,1,0,0,0,747,727,1,0,0,0,747,730,
	1,0,0,0,747,733,1,0,0,0,747,738,1,0,0,0,747,741,1,0,0,0,748,751,1,0,0,0,
	749,747,1,0,0,0,749,750,1,0,0,0,750,71,1,0,0,0,751,749,1,0,0,0,58,89,103,
	106,119,135,148,153,160,165,170,176,189,194,199,214,226,240,251,263,271,
	282,301,315,325,343,351,361,372,389,393,400,406,413,430,440,448,456,464,
	471,475,478,484,486,515,527,535,593,600,605,614,616,678,680,701,713,725,
	747,749];

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
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
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
	public id_list(): IdContext[] {
		return this.getTypedRuleContexts(IdContext) as IdContext[];
	}
	public id(i: number): IdContext {
		return this.getTypedRuleContext(IdContext, i) as IdContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
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


export class Sum_prod_cmdContext extends ParserRuleContext {
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
	public CMD_SUM_UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.CMD_SUM_UNDERSCORE, 0);
	}
	public CMD_PROD_UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.CMD_PROD_UNDERSCORE, 0);
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
    	return LatexParser.RULE_sum_prod_cmd;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitSum_prod_cmd) {
			return visitor.visitSum_prod_cmd(this);
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
	public _exp1!: NumberContext;
	public _single_char_exp1!: Token;
	public _MATHRM_1!: Token;
	public _exp2!: NumberContext;
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


export class IndexContext extends ParserRuleContext {
	public _direct!: ExprContext;
	public _start!: ExprContext;
	public _stop!: ExprContext;
	public _stride!: ExprContext;
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
	public COLON_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.COLON);
	}
	public COLON(i: number): TerminalNode {
		return this.getToken(LatexParser.COLON, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_index;
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
export class MatrixIndexContext extends ExprContext {
	public _row!: IndexContext;
	public _col!: IndexContext;
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
	public COMMA(): TerminalNode {
		return this.getToken(LatexParser.COMMA, 0);
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, 0);
	}
	public index_list(): IndexContext[] {
		return this.getTypedRuleContexts(IndexContext) as IndexContext[];
	}
	public index(i: number): IndexContext {
		return this.getTypedRuleContext(IndexContext, i) as IndexContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitMatrixIndex) {
			return visitor.visitMatrixIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SumProdContext extends ExprContext {
	constructor(parser: LatexParser, ctx: ExprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public sum_prod_cmd(): Sum_prod_cmdContext {
		return this.getTypedRuleContext(Sum_prod_cmdContext, 0) as Sum_prod_cmdContext;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitSumProd) {
			return visitor.visitSumProd(this);
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
