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
	public static readonly PRIME_ACCENT = 74;
	public static readonly ID = 75;
	public static readonly WS = 76;
	public static readonly SLASH_SPACE = 77;
	public static readonly SLASH_COLON = 78;
	public static readonly NBSP = 79;
	public static readonly ERROR_CHAR = 80;
	public static readonly R_BRACKET = 81;
	public static readonly ALT_R_BRACKET = 82;
	public static readonly U_CMD_FRAC = 83;
	public static readonly U_CMD_FRAC_INTS = 84;
	public static readonly U_CMD_CDOT = 85;
	public static readonly U_CMD_TIMES = 86;
	public static readonly U_CMD_SQRT = 87;
	public static readonly U_COMMA = 88;
	public static readonly U_CARET = 89;
	public static readonly U_NAME = 90;
	public static readonly U_L_PAREN = 91;
	public static readonly U_R_PAREN = 92;
	public static readonly U_L_BRACE = 93;
	public static readonly U_R_BRACE = 94;
	public static readonly U_ONE = 95;
	public static readonly U_NUMBER = 96;
	public static readonly U_CMD_LEFT = 97;
	public static readonly U_CMD_RIGHT = 98;
	public static readonly U_WS = 99;
	public static readonly U_SLASH_SPACE = 100;
	public static readonly U_SLASH_COLON = 101;
	public static readonly U_NBSP = 102;
	public static readonly U_ERROR_CHAR = 103;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_statement = 0;
	public static readonly RULE_scatter_plot_query = 1;
	public static readonly RULE_parametric_plot_query = 2;
	public static readonly RULE_insert_matrix = 3;
	public static readonly RULE_fix_mixed_id = 4;
	public static readonly RULE_unit_matrix_row = 5;
	public static readonly RULE_code_cell_units = 6;
	public static readonly RULE_code_func_def = 7;
	public static readonly RULE_id = 8;
	public static readonly RULE_number = 9;
	public static readonly RULE_number_with_units = 10;
	public static readonly RULE_assign = 11;
	public static readonly RULE_assign_list = 12;
	public static readonly RULE_assign_plus_query = 13;
	public static readonly RULE_query = 14;
	public static readonly RULE_equality = 15;
	public static readonly RULE_piecewise_assign = 16;
	public static readonly RULE_piecewise_arg = 17;
	public static readonly RULE_trig_function = 18;
	public static readonly RULE_indefinite_integral_cmd = 19;
	public static readonly RULE_integral_cmd = 20;
	public static readonly RULE_sum_prod_cmd = 21;
	public static readonly RULE_derivative_cmd = 22;
	public static readonly RULE_n_derivative_cmd = 23;
	public static readonly RULE_argument = 24;
	public static readonly RULE_condition = 25;
	public static readonly RULE_id_list = 26;
	public static readonly RULE_guess = 27;
	public static readonly RULE_guess_list = 28;
	public static readonly RULE_condition_single = 29;
	public static readonly RULE_condition_chain = 30;
	public static readonly RULE_matrix_row = 31;
	public static readonly RULE_user_function = 32;
	public static readonly RULE_builtin_function = 33;
	public static readonly RULE_index = 34;
	public static readonly RULE_expr = 35;
	public static readonly RULE_u_block = 36;
	public static readonly RULE_u_insert_matrix = 37;
	public static readonly RULE_u_fraction = 38;
	public static readonly RULE_u_expr = 39;
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
                                                            null, "']'", 
                                                            "'\\rbrack'", 
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
                                                             "PRIME_ACCENT", 
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
		"fix_mixed_id", "unit_matrix_row", "code_cell_units", "code_func_def", 
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
			this.state = 99;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 80;
				this.fix_mixed_id();
				}
				break;
			case 2:
				{
				this.state = 81;
				this.assign();
				}
				break;
			case 3:
				{
				this.state = 82;
				this.assign_list();
				}
				break;
			case 4:
				{
				this.state = 83;
				this.assign_plus_query();
				}
				break;
			case 5:
				{
				this.state = 84;
				this.query();
				}
				break;
			case 6:
				{
				this.state = 85;
				this.equality();
				}
				break;
			case 7:
				{
				this.state = 86;
				this.u_block();
				}
				break;
			case 8:
				{
				this.state = 87;
				this.number_();
				}
				break;
			case 9:
				{
				this.state = 88;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 89;
				this.id_list();
				}
				break;
			case 11:
				{
				this.state = 90;
				this.guess();
				}
				break;
			case 12:
				{
				this.state = 91;
				this.guess_list();
				}
				break;
			case 13:
				{
				this.state = 92;
				this.expr(0);
				}
				break;
			case 14:
				{
				this.state = 93;
				this.condition();
				}
				break;
			case 15:
				{
				this.state = 94;
				this.piecewise_assign();
				}
				break;
			case 16:
				{
				this.state = 95;
				this.insert_matrix();
				}
				break;
			case 17:
				{
				this.state = 96;
				this.scatter_plot_query();
				}
				break;
			case 18:
				{
				this.state = 97;
				this.parametric_plot_query();
				}
				break;
			case 19:
				{
				this.state = 98;
				this.code_func_def();
				}
				break;
			}
			this.state = 101;
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
			this.state = 113;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				{
				this.state = 103;
				this.match(LatexParser.L_PAREN);
				this.state = 104;
				this.expr(0);
				this.state = 105;
				this.match(LatexParser.COMMA);
				this.state = 106;
				this.expr(0);
				this.state = 107;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 2:
				{
				{
				this.state = 109;
				this.expr(0);
				this.state = 110;
				this.match(LatexParser.COMMA);
				this.state = 111;
				this.expr(0);
				}
				}
				break;
			}
			this.state = 116;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===32) {
				{
				this.state = 115;
				this.match(LatexParser.AS_LINES);
				}
			}

			this.state = 118;
			this.match(LatexParser.EQ);
			this.state = 129;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
				{
				{
				this.state = 119;
				this.match(LatexParser.L_PAREN);
				this.state = 120;
				this.u_block();
				this.state = 121;
				this.match(LatexParser.COMMA);
				this.state = 122;
				this.u_block();
				this.state = 123;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 125;
				this.u_block();
				this.state = 126;
				this.match(LatexParser.COMMA);
				this.state = 127;
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
			this.state = 131;
			this.match(LatexParser.L_PAREN);
			this.state = 132;
			this.expr(0);
			this.state = 133;
			this.match(LatexParser.COMMA);
			this.state = 134;
			this.expr(0);
			this.state = 135;
			this.match(LatexParser.R_PAREN);
			}
			this.state = 137;
			localctx._for_id = this.match(LatexParser.ID);
			this.state = 138;
			this.match(LatexParser.L_PAREN);
			this.state = 139;
			this.argument();
			this.state = 140;
			this.match(LatexParser.R_PAREN);
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===75) {
				{
				this.state = 141;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 142;
				localctx._num_points = this.number_();
				this.state = 143;
				localctx._points_id_1 = this.match(LatexParser.ID);
				}
			}

			this.state = 147;
			this.match(LatexParser.EQ);
			this.state = 158;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
				{
				{
				this.state = 148;
				this.match(LatexParser.L_PAREN);
				this.state = 149;
				this.u_block();
				this.state = 150;
				this.match(LatexParser.COMMA);
				this.state = 151;
				this.u_block();
				this.state = 152;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 154;
				this.u_block();
				this.state = 155;
				this.match(LatexParser.COMMA);
				this.state = 156;
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
			this.state = 163;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 160;
					this.matchWildcard();
					}
					}
				}
				this.state = 165;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 173;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 166;
				this.u_insert_matrix();
				this.state = 170;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 167;
						this.matchWildcard();
						}
						}
					}
					this.state = 172;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				}
				}
				}
				this.state = 175;
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
	public fix_mixed_id(): Fix_mixed_idContext {
		let localctx: Fix_mixed_idContext = new Fix_mixed_idContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, LatexParser.RULE_fix_mixed_id);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 180;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 177;
					this.matchWildcard();
					}
					}
				}
				this.state = 182;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
			}
			this.state = 205;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 197;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 20:
					{
					{
					this.state = 183;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 184;
					this.match(LatexParser.L_BRACE);
					this.state = 185;
					this.id();
					this.state = 186;
					this.match(LatexParser.R_BRACE);
					this.state = 189;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 75:
						{
						this.state = 187;
						this.id();
						}
						break;
					case 74:
						{
						this.state = 188;
						this.match(LatexParser.PRIME_ACCENT);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
					break;
				case 75:
					{
					{
					this.state = 191;
					this.id();
					this.state = 192;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 193;
					this.match(LatexParser.L_BRACE);
					this.state = 194;
					this.id();
					this.state = 195;
					this.match(LatexParser.R_BRACE);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 202;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 199;
						this.matchWildcard();
						}
						}
					}
					this.state = 204;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
				}
				}
				}
				this.state = 207;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===20 || _la===75);
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
	public unit_matrix_row(): Unit_matrix_rowContext {
		let localctx: Unit_matrix_rowContext = new Unit_matrix_rowContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, LatexParser.RULE_unit_matrix_row);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.u_block();
			this.state = 214;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===70) {
				{
				{
				this.state = 210;
				this.match(LatexParser.AMPERSAND);
				this.state = 211;
				this.u_block();
				}
				}
				this.state = 216;
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
	public code_cell_units(): Code_cell_unitsContext {
		let localctx: Code_cell_unitsContext = new Code_cell_unitsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, LatexParser.RULE_code_cell_units);
		let _la: number;
		try {
			this.state = 229;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 217;
				this.u_block();
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 218;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 219;
				this.unit_matrix_row();
				this.state = 224;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===71) {
					{
					{
					this.state = 220;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 221;
					this.unit_matrix_row();
					}
					}
					this.state = 226;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 227;
				this.match(LatexParser.END_MATRIX);
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
	// @RuleVersion(0)
	public code_func_def(): Code_func_defContext {
		let localctx: Code_func_defContext = new Code_func_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, LatexParser.RULE_code_func_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 237;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 231;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 232;
				this.match(LatexParser.L_BRACE);
				this.state = 233;
				this.id();
				this.state = 234;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 75:
				{
				this.state = 236;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 239;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 240;
			localctx._code_cell_units = this.code_cell_units();
			localctx._input_units.push(localctx._code_cell_units);
			this.state = 245;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 241;
				this.match(LatexParser.COMMA);
				this.state = 242;
				localctx._code_cell_units = this.code_cell_units();
				localctx._input_units.push(localctx._code_cell_units);
				}
				}
				this.state = 247;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 248;
			this.match(LatexParser.R_PAREN);
			this.state = 249;
			this.match(LatexParser.EQ);
			this.state = 250;
			localctx._output_units = this.code_cell_units();
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
		this.enterRule(localctx, 16, LatexParser.RULE_id);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 252;
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
		this.enterRule(localctx, 18, LatexParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 255;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===56) {
				{
				this.state = 254;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 257;
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
		this.enterRule(localctx, 20, LatexParser.RULE_number_with_units);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 261;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 56:
			case 67:
				{
				this.state = 259;
				this.number_();
				}
				break;
			case 75:
				{
				this.state = 260;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 263;
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
		this.enterRule(localctx, 22, LatexParser.RULE_assign);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 265;
			this.id();
			this.state = 266;
			this.match(LatexParser.EQ);
			this.state = 267;
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
		this.enterRule(localctx, 24, LatexParser.RULE_assign_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 269;
			this.assign();
			this.state = 272;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 270;
				this.match(LatexParser.COMMA);
				this.state = 271;
				this.assign();
				}
				}
				this.state = 274;
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
		this.enterRule(localctx, 26, LatexParser.RULE_assign_plus_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 276;
			this.assign();
			this.state = 277;
			this.match(LatexParser.EQ);
			this.state = 279;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 278;
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
		this.enterRule(localctx, 28, LatexParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 281;
			this.expr(0);
			this.state = 282;
			this.match(LatexParser.EQ);
			this.state = 284;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 283;
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
		this.enterRule(localctx, 30, LatexParser.RULE_equality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 286;
			this.expr(0);
			this.state = 287;
			this.match(LatexParser.EQ);
			this.state = 288;
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
		this.enterRule(localctx, 32, LatexParser.RULE_piecewise_assign);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 290;
			this.id();
			this.state = 291;
			this.match(LatexParser.EQ);
			this.state = 292;
			this.id();
			this.state = 293;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 294;
			this.piecewise_arg();
			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 295;
				this.match(LatexParser.COMMA);
				this.state = 296;
				this.piecewise_arg();
				}
				}
				this.state = 301;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 302;
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
		this.enterRule(localctx, 34, LatexParser.RULE_piecewise_arg);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 304;
			this.match(LatexParser.L_PAREN);
			this.state = 305;
			this.expr(0);
			this.state = 306;
			this.match(LatexParser.COMMA);
			this.state = 307;
			this.condition();
			this.state = 308;
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
		this.enterRule(localctx, 36, LatexParser.RULE_trig_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===31) {
				{
				this.state = 310;
				this.match(LatexParser.BACKSLASH);
				}
			}

			this.state = 313;
			_la = this._input.LA(1);
			if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 314;
			this.match(LatexParser.L_PAREN);
			this.state = 315;
			this.expr(0);
			this.state = 316;
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
		this.enterRule(localctx, 38, LatexParser.RULE_indefinite_integral_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 325;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 14:
				{
				this.state = 318;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 15:
				{
				{
				this.state = 319;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 320;
				this.match(LatexParser.L_BRACE);
				this.state = 321;
				this.match(LatexParser.R_BRACE);
				this.state = 322;
				this.match(LatexParser.CARET);
				this.state = 323;
				this.match(LatexParser.L_BRACE);
				this.state = 324;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 327;
			this.match(LatexParser.L_PAREN);
			this.state = 328;
			this.expr(0);
			this.state = 329;
			this.match(LatexParser.R_PAREN);
			this.state = 336;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 330;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 331;
				this.match(LatexParser.L_BRACE);
				this.state = 332;
				this.id();
				this.state = 333;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 75:
				{
				this.state = 335;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 338;
			this.match(LatexParser.L_PAREN);
			this.state = 339;
			this.id();
			this.state = 340;
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
		this.enterRule(localctx, 40, LatexParser.RULE_integral_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 348;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				{
				this.state = 342;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 343;
				this.match(LatexParser.L_BRACE);
				this.state = 344;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 345;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 16:
			case 17:
				{
				this.state = 347;
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
			this.state = 356;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 350;
				this.match(LatexParser.CARET);
				this.state = 351;
				this.match(LatexParser.L_BRACE);
				this.state = 352;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 353;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
			case 66:
				{
				this.state = 355;
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
			this.state = 358;
			this.match(LatexParser.L_PAREN);
			this.state = 359;
			localctx._integrand_expr = this.expr(0);
			this.state = 360;
			this.match(LatexParser.R_PAREN);
			this.state = 367;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 361;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 362;
				this.match(LatexParser.L_BRACE);
				this.state = 363;
				this.id();
				this.state = 364;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 75:
				{
				this.state = 366;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 369;
			this.match(LatexParser.L_PAREN);
			this.state = 370;
			this.id();
			this.state = 371;
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
		this.enterRule(localctx, 42, LatexParser.RULE_sum_prod_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 373;
			_la = this._input.LA(1);
			if(!(_la===18 || _la===19)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 374;
			this.match(LatexParser.L_BRACE);
			this.state = 375;
			this.id();
			this.state = 376;
			this.match(LatexParser.EQ);
			this.state = 377;
			localctx._start_expr = this.expr(0);
			this.state = 378;
			this.match(LatexParser.R_BRACE);
			}
			this.state = 386;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 380;
				this.match(LatexParser.CARET);
				this.state = 381;
				this.match(LatexParser.L_BRACE);
				this.state = 382;
				localctx._end_expr = this.expr(0);
				this.state = 383;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
			case 66:
				{
				this.state = 385;
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
			this.state = 388;
			this.match(LatexParser.L_PAREN);
			this.state = 389;
			localctx._operand_expr = this.expr(0);
			this.state = 390;
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
		this.enterRule(localctx, 44, LatexParser.RULE_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 392;
			this.match(LatexParser.CMD_FRAC);
			this.state = 393;
			this.match(LatexParser.L_BRACE);
			this.state = 400;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 394;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 395;
				this.match(LatexParser.L_BRACE);
				this.state = 396;
				this.id();
				this.state = 397;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 75:
				{
				this.state = 399;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 402;
			this.match(LatexParser.R_BRACE);
			this.state = 403;
			this.match(LatexParser.L_BRACE);
			this.state = 410;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 404;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 405;
				this.match(LatexParser.L_BRACE);
				this.state = 406;
				this.id();
				this.state = 407;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 75:
				{
				this.state = 409;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 412;
			this.match(LatexParser.L_PAREN);
			this.state = 413;
			this.id();
			this.state = 414;
			this.match(LatexParser.R_PAREN);
			this.state = 415;
			this.match(LatexParser.R_BRACE);
			this.state = 416;
			this.match(LatexParser.L_PAREN);
			this.state = 417;
			this.expr(0);
			this.state = 418;
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
		this.enterRule(localctx, 46, LatexParser.RULE_n_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 420;
			this.match(LatexParser.CMD_FRAC);
			this.state = 421;
			this.match(LatexParser.L_BRACE);
			this.state = 428;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 422;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 423;
				this.match(LatexParser.L_BRACE);
				this.state = 424;
				this.id();
				this.state = 425;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 75:
				{
				this.state = 427;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 436;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 430;
				this.match(LatexParser.CARET);
				this.state = 431;
				this.match(LatexParser.L_BRACE);
				this.state = 432;
				localctx._exp1 = this.number_();
				this.state = 433;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
				{
				this.state = 435;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 438;
			this.match(LatexParser.R_BRACE);
			this.state = 439;
			this.match(LatexParser.L_BRACE);
			this.state = 446;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 440;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 441;
				this.match(LatexParser.L_BRACE);
				this.state = 442;
				this.id();
				this.state = 443;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 75:
				{
				this.state = 445;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 448;
			this.match(LatexParser.L_PAREN);
			this.state = 449;
			this.id();
			this.state = 450;
			this.match(LatexParser.R_PAREN);
			this.state = 457;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 451;
				this.match(LatexParser.CARET);
				this.state = 452;
				this.match(LatexParser.L_BRACE);
				this.state = 453;
				localctx._exp2 = this.number_();
				this.state = 454;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
				{
				this.state = 456;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 459;
			this.match(LatexParser.R_BRACE);
			this.state = 460;
			this.match(LatexParser.L_PAREN);
			this.state = 461;
			this.expr(0);
			this.state = 462;
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
		this.enterRule(localctx, 48, LatexParser.RULE_argument);
		let _la: number;
		try {
			this.state = 474;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 38, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 464;
				this.id();
				this.state = 465;
				this.match(LatexParser.EQ);
				this.state = 466;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 468;
				this.expr(0);
				this.state = 469;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===59 || _la===61)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 470;
				this.id();
				this.state = 471;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===59 || _la===61)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 472;
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
		this.enterRule(localctx, 50, LatexParser.RULE_condition);
		try {
			this.state = 478;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 476;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 477;
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
		this.enterRule(localctx, 52, LatexParser.RULE_id_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 480;
			this.id();
			this.state = 483;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 481;
				this.match(LatexParser.COMMA);
				this.state = 482;
				this.id();
				}
				}
				this.state = 485;
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
		this.enterRule(localctx, 54, LatexParser.RULE_guess);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 487;
			this.id();
			this.state = 488;
			_la = this._input.LA(1);
			if(!(_la===27 || _la===28)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 491;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				{
				this.state = 489;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 490;
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
		this.enterRule(localctx, 56, LatexParser.RULE_guess_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 493;
			this.guess();
			this.state = 496;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 494;
				this.match(LatexParser.COMMA);
				this.state = 495;
				this.guess();
				}
				}
				this.state = 498;
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
		this.enterRule(localctx, 58, LatexParser.RULE_condition_single);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 500;
			this.expr(0);
			this.state = 501;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 502;
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
		this.enterRule(localctx, 60, LatexParser.RULE_condition_chain);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 504;
			this.expr(0);
			this.state = 505;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 506;
			this.expr(0);
			this.state = 507;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 508;
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
		this.enterRule(localctx, 62, LatexParser.RULE_matrix_row);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 510;
			this.expr(0);
			this.state = 515;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===70) {
				{
				{
				this.state = 511;
				this.match(LatexParser.AMPERSAND);
				this.state = 512;
				this.expr(0);
				}
				}
				this.state = 517;
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
		this.enterRule(localctx, 64, LatexParser.RULE_user_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 518;
			this.id();
			this.state = 519;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 520;
			this.argument();
			this.state = 525;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 521;
				this.match(LatexParser.COMMA);
				this.state = 522;
				this.argument();
				}
				}
				this.state = 527;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 528;
			this.match(LatexParser.R_PAREN);
			this.state = 533;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				{
				this.state = 529;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 530;
				localctx._num_points = this.number_();
				this.state = 531;
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
		this.enterRule(localctx, 66, LatexParser.RULE_builtin_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 541;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 535;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 536;
				this.match(LatexParser.L_BRACE);
				this.state = 537;
				this.id();
				this.state = 538;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 75:
				{
				this.state = 540;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 543;
			this.match(LatexParser.L_PAREN);
			this.state = 552;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 259) !== 0)) {
				{
				this.state = 544;
				this.expr(0);
				this.state = 549;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===63) {
					{
					{
					this.state = 545;
					this.match(LatexParser.COMMA);
					this.state = 546;
					this.expr(0);
					}
					}
					this.state = 551;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 554;
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
		this.enterRule(localctx, 68, LatexParser.RULE_index);
		let _la: number;
		try {
			this.state = 573;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 53, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 556;
				localctx._direct = this.expr(0);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 558;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 259) !== 0)) {
					{
					this.state = 557;
					localctx._start = this.expr(0);
					}
				}

				this.state = 560;
				this.match(LatexParser.COLON);
				this.state = 562;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 259) !== 0)) {
					{
					this.state = 561;
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
				this.state = 565;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 259) !== 0)) {
					{
					this.state = 564;
					localctx._start = this.expr(0);
					}
				}

				this.state = 567;
				this.match(LatexParser.COLON);
				this.state = 568;
				localctx._stride = this.expr(0);
				this.state = 569;
				this.match(LatexParser.COLON);
				this.state = 571;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 259) !== 0)) {
					{
					this.state = 570;
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
		let _startState: number = 70;
		this.enterRecursionRule(localctx, 70, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 703;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 61, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 576;
				this.id();
				this.state = 577;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 579;
				this.id();
				this.state = 580;
				_la = this._input.LA(1);
				if(!(_la===65 || _la===66)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 581;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 583;
				this.id();
				this.state = 584;
				this.match(LatexParser.CARET);
				this.state = 585;
				this.match(LatexParser.L_BRACE);
				this.state = 586;
				this.expr(0);
				this.state = 587;
				this.match(LatexParser.R_BRACE);
				this.state = 588;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 590;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 591;
				this.match(LatexParser.CMD_SQRT);
				this.state = 592;
				this.match(LatexParser.L_BRACE);
				this.state = 593;
				this.expr(0);
				this.state = 594;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new MatrixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 596;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 597;
				this.matrix_row();
				this.state = 602;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===71) {
					{
					{
					this.state = 598;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 599;
					this.matrix_row();
					}
					}
					this.state = 604;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 605;
				this.match(LatexParser.END_MATRIX);
				}
				break;
			case 7:
				{
				localctx = new TrigFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 607;
				this.trig_function();
				}
				break;
			case 8:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 608;
				this.indefinite_integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 609;
				this.integral_cmd();
				}
				break;
			case 10:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 610;
				this.derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 611;
				this.n_derivative_cmd();
				}
				break;
			case 12:
				{
				localctx = new SumProdContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 612;
				this.sum_prod_cmd();
				}
				break;
			case 13:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 614;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 613;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 616;
				this.match(LatexParser.CMD_LN);
				this.state = 617;
				this.match(LatexParser.L_PAREN);
				this.state = 618;
				this.expr(0);
				this.state = 619;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 622;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 621;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 624;
				this.match(LatexParser.CMD_LOG);
				this.state = 625;
				this.match(LatexParser.L_PAREN);
				this.state = 626;
				this.expr(0);
				this.state = 627;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 629;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 630;
				this.match(LatexParser.L_BRACE);
				this.state = 631;
				this.expr(0);
				this.state = 632;
				this.match(LatexParser.R_BRACE);
				this.state = 633;
				this.match(LatexParser.L_PAREN);
				this.state = 634;
				this.expr(0);
				this.state = 635;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 16:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 637;
				_la = this._input.LA(1);
				if(!(_la===49 || _la===50)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 638;
				this.match(LatexParser.L_PAREN);
				this.state = 639;
				this.expr(0);
				this.state = 640;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 17:
				{
				localctx = new NormContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 642;
				this.match(LatexParser.DOUBLE_VBAR);
				this.state = 643;
				this.expr(0);
				this.state = 644;
				this.match(LatexParser.DOUBLE_VBAR);
				}
				break;
			case 18:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 646;
				this.match(LatexParser.VBAR);
				this.state = 647;
				this.expr(0);
				this.state = 648;
				this.match(LatexParser.VBAR);
				}
				break;
			case 19:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 650;
				this.number_with_units();
				}
				break;
			case 20:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 651;
				this.number_();
				}
				break;
			case 21:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 652;
				this.match(LatexParser.SUB);
				this.state = 653;
				this.expr(28);
				}
				break;
			case 22:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 654;
				this.match(LatexParser.CMD_FRAC);
				this.state = 655;
				this.match(LatexParser.L_BRACE);
				this.state = 656;
				this.expr(0);
				this.state = 657;
				this.match(LatexParser.R_BRACE);
				this.state = 658;
				this.match(LatexParser.L_BRACE);
				this.state = 659;
				this.expr(0);
				this.state = 660;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 23:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 662;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 24:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 663;
				this.id();
				}
				break;
			case 25:
				{
				localctx = new UserFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 664;
				this.user_function();
				}
				break;
			case 26:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 665;
				this.builtin_function();
				}
				break;
			case 27:
				{
				localctx = new InfinityExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 666;
				this.match(LatexParser.INFINITY);
				}
				break;
			case 28:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 667;
				this.match(LatexParser.L_PAREN);
				this.state = 668;
				this.expr(0);
				this.state = 669;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 29:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 671;
				this.number_();
				this.state = 672;
				this.expr(11);
				}
				break;
			case 30:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 674;
				this.number_with_units();
				this.state = 675;
				this.expr(10);
				}
				break;
			case 31:
				{
				localctx = new EmptyPlaceholderContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 677;
				this.match(LatexParser.CMD_PLACEHOLDER);
				this.state = 680;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 57, this._ctx) ) {
				case 1:
					{
					this.state = 678;
					this.match(LatexParser.L_BRACE);
					this.state = 679;
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
				this.state = 687;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 58, this._ctx) ) {
				case 1:
					{
					this.state = 682;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 683;
					this.match(LatexParser.L_BRACE);
					this.state = 684;
					this.expr(0);
					this.state = 685;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				this.state = 692;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 64:
					{
					this.state = 689;
					this.match(LatexParser.DECIMAL_POINT);
					}
					break;
				case 56:
				case 67:
					{
					this.state = 690;
					this.number_();
					}
					break;
				case 58:
					{
					this.state = 691;
					this.match(LatexParser.EQ);
					}
					break;
				case 20:
					break;
				default:
					break;
				}
				this.state = 694;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 695;
				this.match(LatexParser.L_BRACE);
				this.state = 696;
				this.expr(0);
				this.state = 697;
				this.match(LatexParser.R_BRACE);
				this.state = 701;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 60, this._ctx) ) {
				case 1:
					{
					this.state = 698;
					this.match(LatexParser.DECIMAL_POINT);
					}
					break;
				case 2:
					{
					this.state = 699;
					this.number_();
					}
					break;
				case 3:
					{
					this.state = 700;
					this.match(LatexParser.EQ);
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 767;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 63, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 765;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 62, this._ctx) ) {
					case 1:
						{
						localctx = new MatrixMultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 705;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 706;
						this.match(LatexParser.CMD_TIMES);
						this.state = 707;
						this.expr(28);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 708;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 709;
						this.match(LatexParser.CMD_CDOT);
						this.state = 710;
						this.expr(27);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 711;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 712;
						this.match(LatexParser.SUB);
						this.state = 713;
						this.expr(24);
						}
						break;
					case 4:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 714;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 715;
						this.match(LatexParser.ADD);
						this.state = 716;
						this.expr(23);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 717;
						if (!(this.precpred(this._ctx, 50))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 50)");
						}
						this.state = 718;
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
						this.state = 719;
						if (!(this.precpred(this._ctx, 49))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 49)");
						}
						this.state = 720;
						this.match(LatexParser.CARET);
						this.state = 721;
						this.match(LatexParser.L_BRACE);
						this.state = 722;
						this.expr(0);
						this.state = 723;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 7:
						{
						localctx = new MatrixIndexContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 725;
						if (!(this.precpred(this._ctx, 48))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 48)");
						}
						this.state = 726;
						this.match(LatexParser.UNDERSCORE);
						this.state = 727;
						this.match(LatexParser.L_BRACE);
						this.state = 728;
						(localctx as MatrixIndexContext)._row = this.index();
						this.state = 729;
						this.match(LatexParser.COMMA);
						this.state = 730;
						(localctx as MatrixIndexContext)._col = this.index();
						this.state = 731;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 8:
						{
						localctx = new TransposeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 733;
						if (!(this.precpred(this._ctx, 47))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 47)");
						}
						this.state = 734;
						this.match(LatexParser.TRANSPOSE);
						}
						break;
					case 9:
						{
						localctx = new FactorialContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 735;
						if (!(this.precpred(this._ctx, 46))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 46)");
						}
						this.state = 736;
						this.match(LatexParser.EXCLAMATION);
						}
						break;
					case 10:
						{
						localctx = new EmptySubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 737;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 738;
						this.match(LatexParser.UNDERSCORE);
						this.state = 739;
						this.match(LatexParser.L_BRACE);
						this.state = 740;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 11:
						{
						localctx = new EmptySuperscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 741;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 742;
						this.match(LatexParser.CARET);
						this.state = 743;
						this.match(LatexParser.L_BRACE);
						this.state = 744;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 12:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 745;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 746;
						this.id();
						}
						break;
					case 13:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 747;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 748;
						this.number_();
						}
						break;
					case 14:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 749;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 750;
						this.number_with_units();
						}
						break;
					case 15:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 751;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 752;
						this.user_function();
						}
						break;
					case 16:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 753;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 754;
						this.builtin_function();
						}
						break;
					case 17:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 755;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 756;
						this.trig_function();
						}
						break;
					case 18:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 757;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 758;
						this.indefinite_integral_cmd();
						}
						break;
					case 19:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 759;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 760;
						this.integral_cmd();
						}
						break;
					case 20:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 761;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 762;
						this.derivative_cmd();
						}
						break;
					case 21:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 763;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 764;
						this.n_derivative_cmd();
						}
						break;
					}
					}
				}
				this.state = 769;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 63, this._ctx);
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
		this.enterRule(localctx, 72, LatexParser.RULE_u_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 770;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 771;
			this.u_expr(0);
			this.state = 772;
			_la = this._input.LA(1);
			if(!(_la===81 || _la===82)) {
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
		this.enterRule(localctx, 74, LatexParser.RULE_u_insert_matrix);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 774;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 775;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===95 || _la===96)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 776;
			_la = this._input.LA(1);
			if(!(_la===86 || _la===88)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 777;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===95 || _la===96)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 778;
			_la = this._input.LA(1);
			if(!(_la===81 || _la===82)) {
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
		this.enterRule(localctx, 76, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.state = 788;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 83:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 780;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 781;
				this.match(LatexParser.U_L_BRACE);
				this.state = 782;
				_la = this._input.LA(1);
				if(!(_la===95 || _la===96)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 783;
				this.match(LatexParser.U_R_BRACE);
				this.state = 784;
				this.match(LatexParser.U_L_BRACE);
				this.state = 785;
				this.match(LatexParser.U_NUMBER);
				this.state = 786;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 84:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 787;
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
		let _startState: number = 78;
		this.enterRecursionRule(localctx, 78, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 812;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 87:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 791;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 792;
				this.match(LatexParser.U_L_BRACE);
				this.state = 793;
				this.expr(0);
				this.state = 794;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 83:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 796;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 797;
				this.match(LatexParser.U_L_BRACE);
				this.state = 800;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 83:
				case 87:
				case 90:
				case 91:
					{
					this.state = 798;
					this.u_expr(0);
					}
					break;
				case 95:
					{
					this.state = 799;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 802;
				this.match(LatexParser.U_R_BRACE);
				this.state = 803;
				this.match(LatexParser.U_L_BRACE);
				this.state = 804;
				this.u_expr(0);
				this.state = 805;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 90:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 807;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 91:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 808;
				this.match(LatexParser.U_L_PAREN);
				this.state = 809;
				this.u_expr(0);
				this.state = 810;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 836;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 68, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 834;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 67, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 814;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 815;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 816;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 817;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 818;
						this.match(LatexParser.U_CARET);
						this.state = 819;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 820;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 821;
						this.match(LatexParser.U_CARET);
						this.state = 822;
						this.match(LatexParser.U_L_BRACE);
						this.state = 823;
						this.match(LatexParser.U_NUMBER);
						this.state = 824;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 825;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 826;
						this.match(LatexParser.U_CARET);
						this.state = 827;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 828;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 829;
						this.match(LatexParser.U_CARET);
						this.state = 830;
						this.match(LatexParser.U_L_BRACE);
						this.state = 831;
						this.u_fraction();
						this.state = 832;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 838;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 68, this._ctx);
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
		case 35:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 39:
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

	public static readonly _serializedATN: number[] = [4,1,103,840,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,1,0,1,0,1,0,3,0,100,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,3,1,114,8,1,1,1,3,1,117,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,3,1,130,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,
	2,146,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,159,8,2,1,3,5,
	3,162,8,3,10,3,12,3,165,9,3,1,3,1,3,5,3,169,8,3,10,3,12,3,172,9,3,4,3,174,
	8,3,11,3,12,3,175,1,4,5,4,179,8,4,10,4,12,4,182,9,4,1,4,1,4,1,4,1,4,1,4,
	1,4,3,4,190,8,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,198,8,4,1,4,5,4,201,8,4,10,
	4,12,4,204,9,4,4,4,206,8,4,11,4,12,4,207,1,5,1,5,1,5,5,5,213,8,5,10,5,12,
	5,216,9,5,1,6,1,6,1,6,1,6,1,6,5,6,223,8,6,10,6,12,6,226,9,6,1,6,1,6,3,6,
	230,8,6,1,7,1,7,1,7,1,7,1,7,1,7,3,7,238,8,7,1,7,1,7,1,7,1,7,5,7,244,8,7,
	10,7,12,7,247,9,7,1,7,1,7,1,7,1,7,1,8,1,8,1,9,3,9,256,8,9,1,9,1,9,1,10,
	1,10,3,10,262,8,10,1,10,1,10,1,11,1,11,1,11,1,11,1,12,1,12,1,12,4,12,273,
	8,12,11,12,12,12,274,1,13,1,13,1,13,3,13,280,8,13,1,14,1,14,1,14,3,14,285,
	8,14,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,5,16,298,8,
	16,10,16,12,16,301,9,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,18,3,
	18,312,8,18,1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,
	3,19,326,8,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,337,8,19,
	1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,3,20,349,8,20,1,20,1,
	20,1,20,1,20,1,20,1,20,3,20,357,8,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,
	1,20,1,20,3,20,368,8,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,
	21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,387,8,21,1,21,1,21,1,21,1,21,
	1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,3,22,401,8,22,1,22,1,22,1,22,1,
	22,1,22,1,22,1,22,1,22,3,22,411,8,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,
	1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,3,23,429,8,23,1,23,1,23,1,
	23,1,23,1,23,1,23,3,23,437,8,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,
	3,23,447,8,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,3,23,458,8,23,
	1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,3,24,475,8,24,1,25,1,25,3,25,479,8,25,1,26,1,26,1,26,4,26,484,8,26,11,
	26,12,26,485,1,27,1,27,1,27,1,27,3,27,492,8,27,1,28,1,28,1,28,4,28,497,
	8,28,11,28,12,28,498,1,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,
	1,31,1,31,1,31,5,31,514,8,31,10,31,12,31,517,9,31,1,32,1,32,1,32,1,32,1,
	32,5,32,524,8,32,10,32,12,32,527,9,32,1,32,1,32,1,32,1,32,1,32,3,32,534,
	8,32,1,33,1,33,1,33,1,33,1,33,1,33,3,33,542,8,33,1,33,1,33,1,33,1,33,5,
	33,548,8,33,10,33,12,33,551,9,33,3,33,553,8,33,1,33,1,33,1,34,1,34,3,34,
	559,8,34,1,34,1,34,3,34,563,8,34,1,34,3,34,566,8,34,1,34,1,34,1,34,1,34,
	3,34,572,8,34,3,34,574,8,34,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,
	1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,
	35,1,35,5,35,601,8,35,10,35,12,35,604,9,35,1,35,1,35,1,35,1,35,1,35,1,35,
	1,35,1,35,1,35,3,35,615,8,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,623,8,35,
	1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,
	35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,
	1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,
	35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,681,
	8,35,1,35,1,35,1,35,1,35,1,35,3,35,688,8,35,1,35,1,35,1,35,3,35,693,8,35,
	1,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,702,8,35,3,35,704,8,35,1,35,1,35,
	1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,
	35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,
	1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,
	35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,
	5,35,766,8,35,10,35,12,35,769,9,35,1,36,1,36,1,36,1,36,1,37,1,37,1,37,1,
	37,1,37,1,37,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,3,38,789,8,38,1,39,
	1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,3,39,801,8,39,1,39,1,39,1,
	39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,3,39,813,8,39,1,39,1,39,1,39,1,39,
	1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,
	39,1,39,5,39,835,8,39,10,39,12,39,838,9,39,1,39,4,163,170,180,202,2,70,
	78,40,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,
	48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,0,12,1,0,33,45,1,0,16,17,
	1,0,65,66,1,0,18,19,2,0,59,59,61,61,1,0,27,28,1,0,59,62,1,0,49,50,1,0,1,
	2,1,0,81,82,1,0,95,96,2,0,86,86,88,88,947,0,99,1,0,0,0,2,113,1,0,0,0,4,
	131,1,0,0,0,6,163,1,0,0,0,8,180,1,0,0,0,10,209,1,0,0,0,12,229,1,0,0,0,14,
	237,1,0,0,0,16,252,1,0,0,0,18,255,1,0,0,0,20,261,1,0,0,0,22,265,1,0,0,0,
	24,269,1,0,0,0,26,276,1,0,0,0,28,281,1,0,0,0,30,286,1,0,0,0,32,290,1,0,
	0,0,34,304,1,0,0,0,36,311,1,0,0,0,38,325,1,0,0,0,40,348,1,0,0,0,42,373,
	1,0,0,0,44,392,1,0,0,0,46,420,1,0,0,0,48,474,1,0,0,0,50,478,1,0,0,0,52,
	480,1,0,0,0,54,487,1,0,0,0,56,493,1,0,0,0,58,500,1,0,0,0,60,504,1,0,0,0,
	62,510,1,0,0,0,64,518,1,0,0,0,66,541,1,0,0,0,68,573,1,0,0,0,70,703,1,0,
	0,0,72,770,1,0,0,0,74,774,1,0,0,0,76,788,1,0,0,0,78,812,1,0,0,0,80,100,
	3,8,4,0,81,100,3,22,11,0,82,100,3,24,12,0,83,100,3,26,13,0,84,100,3,28,
	14,0,85,100,3,30,15,0,86,100,3,72,36,0,87,100,3,18,9,0,88,100,3,16,8,0,
	89,100,3,52,26,0,90,100,3,54,27,0,91,100,3,56,28,0,92,100,3,70,35,0,93,
	100,3,50,25,0,94,100,3,32,16,0,95,100,3,6,3,0,96,100,3,2,1,0,97,100,3,4,
	2,0,98,100,3,14,7,0,99,80,1,0,0,0,99,81,1,0,0,0,99,82,1,0,0,0,99,83,1,0,
	0,0,99,84,1,0,0,0,99,85,1,0,0,0,99,86,1,0,0,0,99,87,1,0,0,0,99,88,1,0,0,
	0,99,89,1,0,0,0,99,90,1,0,0,0,99,91,1,0,0,0,99,92,1,0,0,0,99,93,1,0,0,0,
	99,94,1,0,0,0,99,95,1,0,0,0,99,96,1,0,0,0,99,97,1,0,0,0,99,98,1,0,0,0,99,
	100,1,0,0,0,100,101,1,0,0,0,101,102,5,0,0,1,102,1,1,0,0,0,103,104,5,7,0,
	0,104,105,3,70,35,0,105,106,5,63,0,0,106,107,3,70,35,0,107,108,5,8,0,0,
	108,114,1,0,0,0,109,110,3,70,35,0,110,111,5,63,0,0,111,112,3,70,35,0,112,
	114,1,0,0,0,113,103,1,0,0,0,113,109,1,0,0,0,114,116,1,0,0,0,115,117,5,32,
	0,0,116,115,1,0,0,0,116,117,1,0,0,0,117,118,1,0,0,0,118,129,5,58,0,0,119,
	120,5,7,0,0,120,121,3,72,36,0,121,122,5,63,0,0,122,123,3,72,36,0,123,124,
	5,8,0,0,124,130,1,0,0,0,125,126,3,72,36,0,126,127,5,63,0,0,127,128,3,72,
	36,0,128,130,1,0,0,0,129,119,1,0,0,0,129,125,1,0,0,0,129,130,1,0,0,0,130,
	3,1,0,0,0,131,132,5,7,0,0,132,133,3,70,35,0,133,134,5,63,0,0,134,135,3,
	70,35,0,135,136,5,8,0,0,136,137,1,0,0,0,137,138,5,75,0,0,138,139,5,7,0,
	0,139,140,3,48,24,0,140,145,5,8,0,0,141,142,5,75,0,0,142,143,3,18,9,0,143,
	144,5,75,0,0,144,146,1,0,0,0,145,141,1,0,0,0,145,146,1,0,0,0,146,147,1,
	0,0,0,147,158,5,58,0,0,148,149,5,7,0,0,149,150,3,72,36,0,150,151,5,63,0,
	0,151,152,3,72,36,0,152,153,5,8,0,0,153,159,1,0,0,0,154,155,3,72,36,0,155,
	156,5,63,0,0,156,157,3,72,36,0,157,159,1,0,0,0,158,148,1,0,0,0,158,154,
	1,0,0,0,158,159,1,0,0,0,159,5,1,0,0,0,160,162,9,0,0,0,161,160,1,0,0,0,162,
	165,1,0,0,0,163,164,1,0,0,0,163,161,1,0,0,0,164,173,1,0,0,0,165,163,1,0,
	0,0,166,170,3,74,37,0,167,169,9,0,0,0,168,167,1,0,0,0,169,172,1,0,0,0,170,
	171,1,0,0,0,170,168,1,0,0,0,171,174,1,0,0,0,172,170,1,0,0,0,173,166,1,0,
	0,0,174,175,1,0,0,0,175,173,1,0,0,0,175,176,1,0,0,0,176,7,1,0,0,0,177,179,
	9,0,0,0,178,177,1,0,0,0,179,182,1,0,0,0,180,181,1,0,0,0,180,178,1,0,0,0,
	181,205,1,0,0,0,182,180,1,0,0,0,183,184,5,20,0,0,184,185,5,5,0,0,185,186,
	3,16,8,0,186,189,5,6,0,0,187,190,3,16,8,0,188,190,5,74,0,0,189,187,1,0,
	0,0,189,188,1,0,0,0,190,198,1,0,0,0,191,192,3,16,8,0,192,193,5,20,0,0,193,
	194,5,5,0,0,194,195,3,16,8,0,195,196,5,6,0,0,196,198,1,0,0,0,197,183,1,
	0,0,0,197,191,1,0,0,0,198,202,1,0,0,0,199,201,9,0,0,0,200,199,1,0,0,0,201,
	204,1,0,0,0,202,203,1,0,0,0,202,200,1,0,0,0,203,206,1,0,0,0,204,202,1,0,
	0,0,205,197,1,0,0,0,206,207,1,0,0,0,207,205,1,0,0,0,207,208,1,0,0,0,208,
	9,1,0,0,0,209,214,3,72,36,0,210,211,5,70,0,0,211,213,3,72,36,0,212,210,
	1,0,0,0,213,216,1,0,0,0,214,212,1,0,0,0,214,215,1,0,0,0,215,11,1,0,0,0,
	216,214,1,0,0,0,217,230,3,72,36,0,218,219,5,68,0,0,219,224,3,10,5,0,220,
	221,5,71,0,0,221,223,3,10,5,0,222,220,1,0,0,0,223,226,1,0,0,0,224,222,1,
	0,0,0,224,225,1,0,0,0,225,227,1,0,0,0,226,224,1,0,0,0,227,228,5,69,0,0,
	228,230,1,0,0,0,229,217,1,0,0,0,229,218,1,0,0,0,230,13,1,0,0,0,231,232,
	5,20,0,0,232,233,5,5,0,0,233,234,3,16,8,0,234,235,5,6,0,0,235,238,1,0,0,
	0,236,238,3,16,8,0,237,231,1,0,0,0,237,236,1,0,0,0,238,239,1,0,0,0,239,
	240,5,7,0,0,240,245,3,12,6,0,241,242,5,63,0,0,242,244,3,12,6,0,243,241,
	1,0,0,0,244,247,1,0,0,0,245,243,1,0,0,0,245,246,1,0,0,0,246,248,1,0,0,0,
	247,245,1,0,0,0,248,249,5,8,0,0,249,250,5,58,0,0,250,251,3,12,6,0,251,15,
	1,0,0,0,252,253,5,75,0,0,253,17,1,0,0,0,254,256,5,56,0,0,255,254,1,0,0,
	0,255,256,1,0,0,0,256,257,1,0,0,0,257,258,5,67,0,0,258,19,1,0,0,0,259,262,
	3,18,9,0,260,262,3,16,8,0,261,259,1,0,0,0,261,260,1,0,0,0,262,263,1,0,0,
	0,263,264,3,72,36,0,264,21,1,0,0,0,265,266,3,16,8,0,266,267,5,58,0,0,267,
	268,3,70,35,0,268,23,1,0,0,0,269,272,3,22,11,0,270,271,5,63,0,0,271,273,
	3,22,11,0,272,270,1,0,0,0,273,274,1,0,0,0,274,272,1,0,0,0,274,275,1,0,0,
	0,275,25,1,0,0,0,276,277,3,22,11,0,277,279,5,58,0,0,278,280,3,72,36,0,279,
	278,1,0,0,0,279,280,1,0,0,0,280,27,1,0,0,0,281,282,3,70,35,0,282,284,5,
	58,0,0,283,285,3,72,36,0,284,283,1,0,0,0,284,285,1,0,0,0,285,29,1,0,0,0,
	286,287,3,70,35,0,287,288,5,58,0,0,288,289,3,70,35,0,289,31,1,0,0,0,290,
	291,3,16,8,0,291,292,5,58,0,0,292,293,3,16,8,0,293,294,5,7,0,0,294,299,
	3,34,17,0,295,296,5,63,0,0,296,298,3,34,17,0,297,295,1,0,0,0,298,301,1,
	0,0,0,299,297,1,0,0,0,299,300,1,0,0,0,300,302,1,0,0,0,301,299,1,0,0,0,302,
	303,5,8,0,0,303,33,1,0,0,0,304,305,5,7,0,0,305,306,3,70,35,0,306,307,5,
	63,0,0,307,308,3,50,25,0,308,309,5,8,0,0,309,35,1,0,0,0,310,312,5,31,0,
	0,311,310,1,0,0,0,311,312,1,0,0,0,312,313,1,0,0,0,313,314,7,0,0,0,314,315,
	5,7,0,0,315,316,3,70,35,0,316,317,5,8,0,0,317,37,1,0,0,0,318,326,5,14,0,
	0,319,320,5,15,0,0,320,321,5,5,0,0,321,322,5,6,0,0,322,323,5,57,0,0,323,
	324,5,5,0,0,324,326,5,6,0,0,325,318,1,0,0,0,325,319,1,0,0,0,326,327,1,0,
	0,0,327,328,5,7,0,0,328,329,3,70,35,0,329,336,5,8,0,0,330,331,5,20,0,0,
	331,332,5,5,0,0,332,333,3,16,8,0,333,334,5,6,0,0,334,337,1,0,0,0,335,337,
	3,16,8,0,336,330,1,0,0,0,336,335,1,0,0,0,337,338,1,0,0,0,338,339,5,7,0,
	0,339,340,3,16,8,0,340,341,5,8,0,0,341,39,1,0,0,0,342,343,5,15,0,0,343,
	344,5,5,0,0,344,345,3,70,35,0,345,346,5,6,0,0,346,349,1,0,0,0,347,349,7,
	1,0,0,348,342,1,0,0,0,348,347,1,0,0,0,349,356,1,0,0,0,350,351,5,57,0,0,
	351,352,5,5,0,0,352,353,3,70,35,0,353,354,5,6,0,0,354,357,1,0,0,0,355,357,
	7,2,0,0,356,350,1,0,0,0,356,355,1,0,0,0,357,358,1,0,0,0,358,359,5,7,0,0,
	359,360,3,70,35,0,360,367,5,8,0,0,361,362,5,20,0,0,362,363,5,5,0,0,363,
	364,3,16,8,0,364,365,5,6,0,0,365,368,1,0,0,0,366,368,3,16,8,0,367,361,1,
	0,0,0,367,366,1,0,0,0,368,369,1,0,0,0,369,370,5,7,0,0,370,371,3,16,8,0,
	371,372,5,8,0,0,372,41,1,0,0,0,373,374,7,3,0,0,374,375,5,5,0,0,375,376,
	3,16,8,0,376,377,5,58,0,0,377,378,3,70,35,0,378,379,5,6,0,0,379,386,1,0,
	0,0,380,381,5,57,0,0,381,382,5,5,0,0,382,383,3,70,35,0,383,384,5,6,0,0,
	384,387,1,0,0,0,385,387,7,2,0,0,386,380,1,0,0,0,386,385,1,0,0,0,387,388,
	1,0,0,0,388,389,5,7,0,0,389,390,3,70,35,0,390,391,5,8,0,0,391,43,1,0,0,
	0,392,393,5,21,0,0,393,400,5,5,0,0,394,395,5,20,0,0,395,396,5,5,0,0,396,
	397,3,16,8,0,397,398,5,6,0,0,398,401,1,0,0,0,399,401,3,16,8,0,400,394,1,
	0,0,0,400,399,1,0,0,0,401,402,1,0,0,0,402,403,5,6,0,0,403,410,5,5,0,0,404,
	405,5,20,0,0,405,406,5,5,0,0,406,407,3,16,8,0,407,408,5,6,0,0,408,411,1,
	0,0,0,409,411,3,16,8,0,410,404,1,0,0,0,410,409,1,0,0,0,411,412,1,0,0,0,
	412,413,5,7,0,0,413,414,3,16,8,0,414,415,5,8,0,0,415,416,5,6,0,0,416,417,
	5,7,0,0,417,418,3,70,35,0,418,419,5,8,0,0,419,45,1,0,0,0,420,421,5,21,0,
	0,421,428,5,5,0,0,422,423,5,20,0,0,423,424,5,5,0,0,424,425,3,16,8,0,425,
	426,5,6,0,0,426,429,1,0,0,0,427,429,3,16,8,0,428,422,1,0,0,0,428,427,1,
	0,0,0,429,436,1,0,0,0,430,431,5,57,0,0,431,432,5,5,0,0,432,433,3,18,9,0,
	433,434,5,6,0,0,434,437,1,0,0,0,435,437,5,65,0,0,436,430,1,0,0,0,436,435,
	1,0,0,0,437,438,1,0,0,0,438,439,5,6,0,0,439,446,5,5,0,0,440,441,5,20,0,
	0,441,442,5,5,0,0,442,443,3,16,8,0,443,444,5,6,0,0,444,447,1,0,0,0,445,
	447,3,16,8,0,446,440,1,0,0,0,446,445,1,0,0,0,447,448,1,0,0,0,448,449,5,
	7,0,0,449,450,3,16,8,0,450,457,5,8,0,0,451,452,5,57,0,0,452,453,5,5,0,0,
	453,454,3,18,9,0,454,455,5,6,0,0,455,458,1,0,0,0,456,458,5,65,0,0,457,451,
	1,0,0,0,457,456,1,0,0,0,458,459,1,0,0,0,459,460,5,6,0,0,460,461,5,7,0,0,
	461,462,3,70,35,0,462,463,5,8,0,0,463,47,1,0,0,0,464,465,3,16,8,0,465,466,
	5,58,0,0,466,467,3,70,35,0,467,475,1,0,0,0,468,469,3,70,35,0,469,470,7,
	4,0,0,470,471,3,16,8,0,471,472,7,4,0,0,472,473,3,70,35,0,473,475,1,0,0,
	0,474,464,1,0,0,0,474,468,1,0,0,0,475,49,1,0,0,0,476,479,3,58,29,0,477,
	479,3,60,30,0,478,476,1,0,0,0,478,477,1,0,0,0,479,51,1,0,0,0,480,483,3,
	16,8,0,481,482,5,63,0,0,482,484,3,16,8,0,483,481,1,0,0,0,484,485,1,0,0,
	0,485,483,1,0,0,0,485,486,1,0,0,0,486,53,1,0,0,0,487,488,3,16,8,0,488,491,
	7,5,0,0,489,492,3,18,9,0,490,492,3,20,10,0,491,489,1,0,0,0,491,490,1,0,
	0,0,492,55,1,0,0,0,493,496,3,54,27,0,494,495,5,63,0,0,495,497,3,54,27,0,
	496,494,1,0,0,0,497,498,1,0,0,0,498,496,1,0,0,0,498,499,1,0,0,0,499,57,
	1,0,0,0,500,501,3,70,35,0,501,502,7,6,0,0,502,503,3,70,35,0,503,59,1,0,
	0,0,504,505,3,70,35,0,505,506,7,6,0,0,506,507,3,70,35,0,507,508,7,6,0,0,
	508,509,3,70,35,0,509,61,1,0,0,0,510,515,3,70,35,0,511,512,5,70,0,0,512,
	514,3,70,35,0,513,511,1,0,0,0,514,517,1,0,0,0,515,513,1,0,0,0,515,516,1,
	0,0,0,516,63,1,0,0,0,517,515,1,0,0,0,518,519,3,16,8,0,519,520,5,7,0,0,520,
	525,3,48,24,0,521,522,5,63,0,0,522,524,3,48,24,0,523,521,1,0,0,0,524,527,
	1,0,0,0,525,523,1,0,0,0,525,526,1,0,0,0,526,528,1,0,0,0,527,525,1,0,0,0,
	528,533,5,8,0,0,529,530,5,75,0,0,530,531,3,18,9,0,531,532,5,75,0,0,532,
	534,1,0,0,0,533,529,1,0,0,0,533,534,1,0,0,0,534,65,1,0,0,0,535,536,5,20,
	0,0,536,537,5,5,0,0,537,538,3,16,8,0,538,539,5,6,0,0,539,542,1,0,0,0,540,
	542,3,16,8,0,541,535,1,0,0,0,541,540,1,0,0,0,542,543,1,0,0,0,543,552,5,
	7,0,0,544,549,3,70,35,0,545,546,5,63,0,0,546,548,3,70,35,0,547,545,1,0,
	0,0,548,551,1,0,0,0,549,547,1,0,0,0,549,550,1,0,0,0,550,553,1,0,0,0,551,
	549,1,0,0,0,552,544,1,0,0,0,552,553,1,0,0,0,553,554,1,0,0,0,554,555,5,8,
	0,0,555,67,1,0,0,0,556,574,3,70,35,0,557,559,3,70,35,0,558,557,1,0,0,0,
	558,559,1,0,0,0,559,560,1,0,0,0,560,562,5,3,0,0,561,563,3,70,35,0,562,561,
	1,0,0,0,562,563,1,0,0,0,563,574,1,0,0,0,564,566,3,70,35,0,565,564,1,0,0,
	0,565,566,1,0,0,0,566,567,1,0,0,0,567,568,5,3,0,0,568,569,3,70,35,0,569,
	571,5,3,0,0,570,572,3,70,35,0,571,570,1,0,0,0,571,572,1,0,0,0,572,574,1,
	0,0,0,573,556,1,0,0,0,573,558,1,0,0,0,573,565,1,0,0,0,574,69,1,0,0,0,575,
	576,6,35,-1,0,576,577,3,16,8,0,577,578,5,73,0,0,578,704,1,0,0,0,579,580,
	3,16,8,0,580,581,7,2,0,0,581,582,5,72,0,0,582,704,1,0,0,0,583,584,3,16,
	8,0,584,585,5,57,0,0,585,586,5,5,0,0,586,587,3,70,35,0,587,588,5,6,0,0,
	588,589,5,72,0,0,589,704,1,0,0,0,590,704,5,26,0,0,591,592,5,25,0,0,592,
	593,5,5,0,0,593,594,3,70,35,0,594,595,5,6,0,0,595,704,1,0,0,0,596,597,5,
	68,0,0,597,602,3,62,31,0,598,599,5,71,0,0,599,601,3,62,31,0,600,598,1,0,
	0,0,601,604,1,0,0,0,602,600,1,0,0,0,602,603,1,0,0,0,603,605,1,0,0,0,604,
	602,1,0,0,0,605,606,5,69,0,0,606,704,1,0,0,0,607,704,3,36,18,0,608,704,
	3,38,19,0,609,704,3,40,20,0,610,704,3,44,22,0,611,704,3,46,23,0,612,704,
	3,42,21,0,613,615,5,31,0,0,614,613,1,0,0,0,614,615,1,0,0,0,615,616,1,0,
	0,0,616,617,5,46,0,0,617,618,5,7,0,0,618,619,3,70,35,0,619,620,5,8,0,0,
	620,704,1,0,0,0,621,623,5,31,0,0,622,621,1,0,0,0,622,623,1,0,0,0,623,624,
	1,0,0,0,624,625,5,47,0,0,625,626,5,7,0,0,626,627,3,70,35,0,627,628,5,8,
	0,0,628,704,1,0,0,0,629,630,5,48,0,0,630,631,5,5,0,0,631,632,3,70,35,0,
	632,633,5,6,0,0,633,634,5,7,0,0,634,635,3,70,35,0,635,636,5,8,0,0,636,704,
	1,0,0,0,637,638,7,7,0,0,638,639,5,7,0,0,639,640,3,70,35,0,640,641,5,8,0,
	0,641,704,1,0,0,0,642,643,5,10,0,0,643,644,3,70,35,0,644,645,5,10,0,0,645,
	704,1,0,0,0,646,647,5,9,0,0,647,648,3,70,35,0,648,649,5,9,0,0,649,704,1,
	0,0,0,650,704,3,20,10,0,651,704,3,18,9,0,652,653,5,56,0,0,653,704,3,70,
	35,28,654,655,5,21,0,0,655,656,5,5,0,0,656,657,3,70,35,0,657,658,5,6,0,
	0,658,659,5,5,0,0,659,660,3,70,35,0,660,661,5,6,0,0,661,704,1,0,0,0,662,
	704,5,22,0,0,663,704,3,16,8,0,664,704,3,64,32,0,665,704,3,66,33,0,666,704,
	5,13,0,0,667,668,5,7,0,0,668,669,3,70,35,0,669,670,5,8,0,0,670,704,1,0,
	0,0,671,672,3,18,9,0,672,673,3,70,35,11,673,704,1,0,0,0,674,675,3,20,10,
	0,675,676,3,70,35,10,676,704,1,0,0,0,677,680,5,29,0,0,678,679,5,5,0,0,679,
	681,5,6,0,0,680,678,1,0,0,0,680,681,1,0,0,0,681,704,1,0,0,0,682,683,5,20,
	0,0,683,684,5,5,0,0,684,685,3,70,35,0,685,686,5,6,0,0,686,688,1,0,0,0,687,
	682,1,0,0,0,687,688,1,0,0,0,688,692,1,0,0,0,689,693,5,64,0,0,690,693,3,
	18,9,0,691,693,5,58,0,0,692,689,1,0,0,0,692,690,1,0,0,0,692,691,1,0,0,0,
	692,693,1,0,0,0,693,694,1,0,0,0,694,695,5,20,0,0,695,696,5,5,0,0,696,697,
	3,70,35,0,697,701,5,6,0,0,698,702,5,64,0,0,699,702,3,18,9,0,700,702,5,58,
	0,0,701,698,1,0,0,0,701,699,1,0,0,0,701,700,1,0,0,0,701,702,1,0,0,0,702,
	704,1,0,0,0,703,575,1,0,0,0,703,579,1,0,0,0,703,583,1,0,0,0,703,590,1,0,
	0,0,703,591,1,0,0,0,703,596,1,0,0,0,703,607,1,0,0,0,703,608,1,0,0,0,703,
	609,1,0,0,0,703,610,1,0,0,0,703,611,1,0,0,0,703,612,1,0,0,0,703,614,1,0,
	0,0,703,622,1,0,0,0,703,629,1,0,0,0,703,637,1,0,0,0,703,642,1,0,0,0,703,
	646,1,0,0,0,703,650,1,0,0,0,703,651,1,0,0,0,703,652,1,0,0,0,703,654,1,0,
	0,0,703,662,1,0,0,0,703,663,1,0,0,0,703,664,1,0,0,0,703,665,1,0,0,0,703,
	666,1,0,0,0,703,667,1,0,0,0,703,671,1,0,0,0,703,674,1,0,0,0,703,677,1,0,
	0,0,703,687,1,0,0,0,704,767,1,0,0,0,705,706,10,27,0,0,706,707,5,24,0,0,
	707,766,3,70,35,28,708,709,10,26,0,0,709,710,5,23,0,0,710,766,3,70,35,27,
	711,712,10,23,0,0,712,713,5,56,0,0,713,766,3,70,35,24,714,715,10,22,0,0,
	715,716,5,55,0,0,716,766,3,70,35,23,717,718,10,50,0,0,718,766,7,2,0,0,719,
	720,10,49,0,0,720,721,5,57,0,0,721,722,5,5,0,0,722,723,3,70,35,0,723,724,
	5,6,0,0,724,766,1,0,0,0,725,726,10,48,0,0,726,727,5,11,0,0,727,728,5,5,
	0,0,728,729,3,68,34,0,729,730,5,63,0,0,730,731,3,68,34,0,731,732,5,6,0,
	0,732,766,1,0,0,0,733,734,10,47,0,0,734,766,5,30,0,0,735,736,10,46,0,0,
	736,766,5,12,0,0,737,738,10,16,0,0,738,739,5,11,0,0,739,740,5,5,0,0,740,
	766,5,6,0,0,741,742,10,15,0,0,742,743,5,57,0,0,743,744,5,5,0,0,744,766,
	5,6,0,0,745,746,10,14,0,0,746,766,3,16,8,0,747,748,10,13,0,0,748,766,3,
	18,9,0,749,750,10,12,0,0,750,766,3,20,10,0,751,752,10,9,0,0,752,766,3,64,
	32,0,753,754,10,8,0,0,754,766,3,66,33,0,755,756,10,7,0,0,756,766,3,36,18,
	0,757,758,10,6,0,0,758,766,3,38,19,0,759,760,10,5,0,0,760,766,3,40,20,0,
	761,762,10,4,0,0,762,766,3,44,22,0,763,764,10,3,0,0,764,766,3,46,23,0,765,
	705,1,0,0,0,765,708,1,0,0,0,765,711,1,0,0,0,765,714,1,0,0,0,765,717,1,0,
	0,0,765,719,1,0,0,0,765,725,1,0,0,0,765,733,1,0,0,0,765,735,1,0,0,0,765,
	737,1,0,0,0,765,741,1,0,0,0,765,745,1,0,0,0,765,747,1,0,0,0,765,749,1,0,
	0,0,765,751,1,0,0,0,765,753,1,0,0,0,765,755,1,0,0,0,765,757,1,0,0,0,765,
	759,1,0,0,0,765,761,1,0,0,0,765,763,1,0,0,0,766,769,1,0,0,0,767,765,1,0,
	0,0,767,768,1,0,0,0,768,71,1,0,0,0,769,767,1,0,0,0,770,771,7,8,0,0,771,
	772,3,78,39,0,772,773,7,9,0,0,773,73,1,0,0,0,774,775,7,8,0,0,775,776,7,
	10,0,0,776,777,7,11,0,0,777,778,7,10,0,0,778,779,7,9,0,0,779,75,1,0,0,0,
	780,781,5,83,0,0,781,782,5,93,0,0,782,783,7,10,0,0,783,784,5,94,0,0,784,
	785,5,93,0,0,785,786,5,96,0,0,786,789,5,94,0,0,787,789,5,84,0,0,788,780,
	1,0,0,0,788,787,1,0,0,0,789,77,1,0,0,0,790,791,6,39,-1,0,791,792,5,87,0,
	0,792,793,5,93,0,0,793,794,3,70,35,0,794,795,5,94,0,0,795,813,1,0,0,0,796,
	797,5,83,0,0,797,800,5,93,0,0,798,801,3,78,39,0,799,801,5,95,0,0,800,798,
	1,0,0,0,800,799,1,0,0,0,801,802,1,0,0,0,802,803,5,94,0,0,803,804,5,93,0,
	0,804,805,3,78,39,0,805,806,5,94,0,0,806,813,1,0,0,0,807,813,5,90,0,0,808,
	809,5,91,0,0,809,810,3,78,39,0,810,811,5,92,0,0,811,813,1,0,0,0,812,790,
	1,0,0,0,812,796,1,0,0,0,812,807,1,0,0,0,812,808,1,0,0,0,813,836,1,0,0,0,
	814,815,10,4,0,0,815,816,5,85,0,0,816,835,3,78,39,5,817,818,10,9,0,0,818,
	819,5,89,0,0,819,835,5,96,0,0,820,821,10,8,0,0,821,822,5,89,0,0,822,823,
	5,93,0,0,823,824,5,96,0,0,824,835,5,94,0,0,825,826,10,7,0,0,826,827,5,89,
	0,0,827,835,3,76,38,0,828,829,10,6,0,0,829,830,5,89,0,0,830,831,5,93,0,
	0,831,832,3,76,38,0,832,833,5,94,0,0,833,835,1,0,0,0,834,814,1,0,0,0,834,
	817,1,0,0,0,834,820,1,0,0,0,834,825,1,0,0,0,834,828,1,0,0,0,835,838,1,0,
	0,0,836,834,1,0,0,0,836,837,1,0,0,0,837,79,1,0,0,0,838,836,1,0,0,0,69,99,
	113,116,129,145,158,163,170,175,180,189,197,202,207,214,224,229,237,245,
	255,261,274,279,284,299,311,325,336,348,356,367,386,400,410,428,436,446,
	457,474,478,485,491,498,515,525,533,541,549,552,558,562,565,571,573,602,
	614,622,680,687,692,701,703,765,767,788,800,812,834,836];

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
	public fix_mixed_id(): Fix_mixed_idContext {
		return this.getTypedRuleContext(Fix_mixed_idContext, 0) as Fix_mixed_idContext;
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
	public code_func_def(): Code_func_defContext {
		return this.getTypedRuleContext(Code_func_defContext, 0) as Code_func_defContext;
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


export class Fix_mixed_idContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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
	public id_list(): IdContext[] {
		return this.getTypedRuleContexts(IdContext) as IdContext[];
	}
	public id(i: number): IdContext {
		return this.getTypedRuleContext(IdContext, i) as IdContext;
	}
	public R_BRACE_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.R_BRACE);
	}
	public R_BRACE(i: number): TerminalNode {
		return this.getToken(LatexParser.R_BRACE, i);
	}
	public PRIME_ACCENT_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.PRIME_ACCENT);
	}
	public PRIME_ACCENT(i: number): TerminalNode {
		return this.getToken(LatexParser.PRIME_ACCENT, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_fix_mixed_id;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitFix_mixed_id) {
			return visitor.visitFix_mixed_id(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unit_matrix_rowContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public u_block_list(): U_blockContext[] {
		return this.getTypedRuleContexts(U_blockContext) as U_blockContext[];
	}
	public u_block(i: number): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, i) as U_blockContext;
	}
	public AMPERSAND_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.AMPERSAND);
	}
	public AMPERSAND(i: number): TerminalNode {
		return this.getToken(LatexParser.AMPERSAND, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_unit_matrix_row;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnit_matrix_row) {
			return visitor.visitUnit_matrix_row(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Code_cell_unitsContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public u_block(): U_blockContext {
		return this.getTypedRuleContext(U_blockContext, 0) as U_blockContext;
	}
	public BEGIN_MATRIX(): TerminalNode {
		return this.getToken(LatexParser.BEGIN_MATRIX, 0);
	}
	public unit_matrix_row_list(): Unit_matrix_rowContext[] {
		return this.getTypedRuleContexts(Unit_matrix_rowContext) as Unit_matrix_rowContext[];
	}
	public unit_matrix_row(i: number): Unit_matrix_rowContext {
		return this.getTypedRuleContext(Unit_matrix_rowContext, i) as Unit_matrix_rowContext;
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
    public get ruleIndex(): number {
    	return LatexParser.RULE_code_cell_units;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitCode_cell_units) {
			return visitor.visitCode_cell_units(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Code_func_defContext extends ParserRuleContext {
	public _code_cell_units!: Code_cell_unitsContext;
	public _input_units: Code_cell_unitsContext[] = [];
	public _output_units!: Code_cell_unitsContext;
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
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
	}
	public code_cell_units_list(): Code_cell_unitsContext[] {
		return this.getTypedRuleContexts(Code_cell_unitsContext) as Code_cell_unitsContext[];
	}
	public code_cell_units(i: number): Code_cell_unitsContext {
		return this.getTypedRuleContext(Code_cell_unitsContext, i) as Code_cell_unitsContext;
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
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LatexParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_code_func_def;
	}
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitCode_func_def) {
			return visitor.visitCode_func_def(this);
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
