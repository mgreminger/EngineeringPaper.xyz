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
	public static readonly RULE_unit_matrix_row = 4;
	public static readonly RULE_code_cell_units = 5;
	public static readonly RULE_code_func_def = 6;
	public static readonly RULE_id = 7;
	public static readonly RULE_number = 8;
	public static readonly RULE_number_with_units = 9;
	public static readonly RULE_assign = 10;
	public static readonly RULE_assign_list = 11;
	public static readonly RULE_assign_plus_query = 12;
	public static readonly RULE_query = 13;
	public static readonly RULE_equality = 14;
	public static readonly RULE_piecewise_assign = 15;
	public static readonly RULE_piecewise_arg = 16;
	public static readonly RULE_trig_function = 17;
	public static readonly RULE_indefinite_integral_cmd = 18;
	public static readonly RULE_integral_cmd = 19;
	public static readonly RULE_sum_prod_cmd = 20;
	public static readonly RULE_derivative_cmd = 21;
	public static readonly RULE_n_derivative_cmd = 22;
	public static readonly RULE_argument = 23;
	public static readonly RULE_condition = 24;
	public static readonly RULE_id_list = 25;
	public static readonly RULE_guess = 26;
	public static readonly RULE_guess_list = 27;
	public static readonly RULE_condition_single = 28;
	public static readonly RULE_condition_chain = 29;
	public static readonly RULE_matrix_row = 30;
	public static readonly RULE_user_function = 31;
	public static readonly RULE_builtin_function = 32;
	public static readonly RULE_index = 33;
	public static readonly RULE_expr = 34;
	public static readonly RULE_u_block = 35;
	public static readonly RULE_u_insert_matrix = 36;
	public static readonly RULE_u_fraction = 37;
	public static readonly RULE_u_expr = 38;
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
		"unit_matrix_row", "code_cell_units", "code_func_def", "id", "number", 
		"number_with_units", "assign", "assign_list", "assign_plus_query", "query", 
		"equality", "piecewise_assign", "piecewise_arg", "trig_function", "indefinite_integral_cmd", 
		"integral_cmd", "sum_prod_cmd", "derivative_cmd", "n_derivative_cmd", 
		"argument", "condition", "id_list", "guess", "guess_list", "condition_single", 
		"condition_chain", "matrix_row", "user_function", "builtin_function", 
		"index", "expr", "u_block", "u_insert_matrix", "u_fraction", "u_expr",
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
			this.state = 96;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 78;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 79;
				this.assign_list();
				}
				break;
			case 3:
				{
				this.state = 80;
				this.assign_plus_query();
				}
				break;
			case 4:
				{
				this.state = 81;
				this.query();
				}
				break;
			case 5:
				{
				this.state = 82;
				this.equality();
				}
				break;
			case 6:
				{
				this.state = 83;
				this.u_block();
				}
				break;
			case 7:
				{
				this.state = 84;
				this.number_();
				}
				break;
			case 8:
				{
				this.state = 85;
				this.id();
				}
				break;
			case 9:
				{
				this.state = 86;
				this.id_list();
				}
				break;
			case 10:
				{
				this.state = 87;
				this.guess();
				}
				break;
			case 11:
				{
				this.state = 88;
				this.guess_list();
				}
				break;
			case 12:
				{
				this.state = 89;
				this.expr(0);
				}
				break;
			case 13:
				{
				this.state = 90;
				this.condition();
				}
				break;
			case 14:
				{
				this.state = 91;
				this.piecewise_assign();
				}
				break;
			case 15:
				{
				this.state = 92;
				this.insert_matrix();
				}
				break;
			case 16:
				{
				this.state = 93;
				this.scatter_plot_query();
				}
				break;
			case 17:
				{
				this.state = 94;
				this.parametric_plot_query();
				}
				break;
			case 18:
				{
				this.state = 95;
				this.code_func_def();
				}
				break;
			}
			this.state = 98;
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
			this.state = 110;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				{
				this.state = 100;
				this.match(LatexParser.L_PAREN);
				this.state = 101;
				this.expr(0);
				this.state = 102;
				this.match(LatexParser.COMMA);
				this.state = 103;
				this.expr(0);
				this.state = 104;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 2:
				{
				{
				this.state = 106;
				this.expr(0);
				this.state = 107;
				this.match(LatexParser.COMMA);
				this.state = 108;
				this.expr(0);
				}
				}
				break;
			}
			this.state = 113;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===32) {
				{
				this.state = 112;
				this.match(LatexParser.AS_LINES);
				}
			}

			this.state = 115;
			this.match(LatexParser.EQ);
			this.state = 126;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
				{
				{
				this.state = 116;
				this.match(LatexParser.L_PAREN);
				this.state = 117;
				this.u_block();
				this.state = 118;
				this.match(LatexParser.COMMA);
				this.state = 119;
				this.u_block();
				this.state = 120;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 122;
				this.u_block();
				this.state = 123;
				this.match(LatexParser.COMMA);
				this.state = 124;
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
			this.state = 128;
			this.match(LatexParser.L_PAREN);
			this.state = 129;
			this.expr(0);
			this.state = 130;
			this.match(LatexParser.COMMA);
			this.state = 131;
			this.expr(0);
			this.state = 132;
			this.match(LatexParser.R_PAREN);
			}
			this.state = 134;
			localctx._for_id = this.match(LatexParser.ID);
			this.state = 135;
			this.match(LatexParser.L_PAREN);
			this.state = 136;
			this.argument();
			this.state = 137;
			this.match(LatexParser.R_PAREN);
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===74) {
				{
				this.state = 138;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 139;
				localctx._num_points = this.number_();
				this.state = 140;
				localctx._points_id_1 = this.match(LatexParser.ID);
				}
			}

			this.state = 144;
			this.match(LatexParser.EQ);
			this.state = 155;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
				{
				{
				this.state = 145;
				this.match(LatexParser.L_PAREN);
				this.state = 146;
				this.u_block();
				this.state = 147;
				this.match(LatexParser.COMMA);
				this.state = 148;
				this.u_block();
				this.state = 149;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 151;
				this.u_block();
				this.state = 152;
				this.match(LatexParser.COMMA);
				this.state = 153;
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
			this.state = 160;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
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
				_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 170;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 163;
				this.u_insert_matrix();
				this.state = 167;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 164;
						this.matchWildcard();
						}
						}
					}
					this.state = 169;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				}
				}
				}
				this.state = 172;
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
	public unit_matrix_row(): Unit_matrix_rowContext {
		let localctx: Unit_matrix_rowContext = new Unit_matrix_rowContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, LatexParser.RULE_unit_matrix_row);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 174;
			this.u_block();
			this.state = 179;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===70) {
				{
				{
				this.state = 175;
				this.match(LatexParser.AMPERSAND);
				this.state = 176;
				this.u_block();
				}
				}
				this.state = 181;
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
		this.enterRule(localctx, 10, LatexParser.RULE_code_cell_units);
		let _la: number;
		try {
			this.state = 194;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 182;
				this.u_block();
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 183;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 184;
				this.unit_matrix_row();
				this.state = 189;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===71) {
					{
					{
					this.state = 185;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 186;
					this.unit_matrix_row();
					}
					}
					this.state = 191;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 192;
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
		this.enterRule(localctx, 12, LatexParser.RULE_code_func_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 202;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 196;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 197;
				this.match(LatexParser.L_BRACE);
				this.state = 198;
				this.id();
				this.state = 199;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 201;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 204;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 205;
			localctx._code_cell_units = this.code_cell_units();
			localctx._input_units.push(localctx._code_cell_units);
			this.state = 210;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 206;
				this.match(LatexParser.COMMA);
				this.state = 207;
				localctx._code_cell_units = this.code_cell_units();
				localctx._input_units.push(localctx._code_cell_units);
				}
				}
				this.state = 212;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 213;
			this.match(LatexParser.R_PAREN);
			this.state = 214;
			this.match(LatexParser.EQ);
			this.state = 215;
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
		this.enterRule(localctx, 14, LatexParser.RULE_id);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 217;
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
		this.enterRule(localctx, 16, LatexParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 220;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===56) {
				{
				this.state = 219;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 222;
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
		this.enterRule(localctx, 18, LatexParser.RULE_number_with_units);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 226;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 56:
			case 67:
				{
				this.state = 224;
				this.number_();
				}
				break;
			case 74:
				{
				this.state = 225;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 228;
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
		this.enterRule(localctx, 20, LatexParser.RULE_assign);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 230;
			this.id();
			this.state = 231;
			this.match(LatexParser.EQ);
			this.state = 232;
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
		this.enterRule(localctx, 22, LatexParser.RULE_assign_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 234;
			this.assign();
			this.state = 237;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 235;
				this.match(LatexParser.COMMA);
				this.state = 236;
				this.assign();
				}
				}
				this.state = 239;
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
		this.enterRule(localctx, 24, LatexParser.RULE_assign_plus_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 241;
			this.assign();
			this.state = 242;
			this.match(LatexParser.EQ);
			this.state = 244;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 243;
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
		this.enterRule(localctx, 26, LatexParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 246;
			this.expr(0);
			this.state = 247;
			this.match(LatexParser.EQ);
			this.state = 249;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 248;
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
		this.enterRule(localctx, 28, LatexParser.RULE_equality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
			this.expr(0);
			this.state = 252;
			this.match(LatexParser.EQ);
			this.state = 253;
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
		this.enterRule(localctx, 30, LatexParser.RULE_piecewise_assign);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 255;
			this.id();
			this.state = 256;
			this.match(LatexParser.EQ);
			this.state = 257;
			this.id();
			this.state = 258;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 259;
			this.piecewise_arg();
			this.state = 264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 260;
				this.match(LatexParser.COMMA);
				this.state = 261;
				this.piecewise_arg();
				}
				}
				this.state = 266;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 267;
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
		this.enterRule(localctx, 32, LatexParser.RULE_piecewise_arg);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 269;
			this.match(LatexParser.L_PAREN);
			this.state = 270;
			this.expr(0);
			this.state = 271;
			this.match(LatexParser.COMMA);
			this.state = 272;
			this.condition();
			this.state = 273;
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
		this.enterRule(localctx, 34, LatexParser.RULE_trig_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 276;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===31) {
				{
				this.state = 275;
				this.match(LatexParser.BACKSLASH);
				}
			}

			this.state = 278;
			_la = this._input.LA(1);
			if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 279;
			this.match(LatexParser.L_PAREN);
			this.state = 280;
			this.expr(0);
			this.state = 281;
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
		this.enterRule(localctx, 36, LatexParser.RULE_indefinite_integral_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 290;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 14:
				{
				this.state = 283;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 15:
				{
				{
				this.state = 284;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 285;
				this.match(LatexParser.L_BRACE);
				this.state = 286;
				this.match(LatexParser.R_BRACE);
				this.state = 287;
				this.match(LatexParser.CARET);
				this.state = 288;
				this.match(LatexParser.L_BRACE);
				this.state = 289;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 292;
			this.match(LatexParser.L_PAREN);
			this.state = 293;
			this.expr(0);
			this.state = 294;
			this.match(LatexParser.R_PAREN);
			this.state = 301;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 295;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 296;
				this.match(LatexParser.L_BRACE);
				this.state = 297;
				this.id();
				this.state = 298;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 300;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 303;
			this.match(LatexParser.L_PAREN);
			this.state = 304;
			this.id();
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
	public integral_cmd(): Integral_cmdContext {
		let localctx: Integral_cmdContext = new Integral_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, LatexParser.RULE_integral_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 313;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				{
				this.state = 307;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 308;
				this.match(LatexParser.L_BRACE);
				this.state = 309;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 310;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 16:
			case 17:
				{
				this.state = 312;
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
			this.state = 321;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 315;
				this.match(LatexParser.CARET);
				this.state = 316;
				this.match(LatexParser.L_BRACE);
				this.state = 317;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 318;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
			case 66:
				{
				this.state = 320;
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
			this.state = 323;
			this.match(LatexParser.L_PAREN);
			this.state = 324;
			localctx._integrand_expr = this.expr(0);
			this.state = 325;
			this.match(LatexParser.R_PAREN);
			this.state = 332;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 326;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 327;
				this.match(LatexParser.L_BRACE);
				this.state = 328;
				this.id();
				this.state = 329;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 331;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 334;
			this.match(LatexParser.L_PAREN);
			this.state = 335;
			this.id();
			this.state = 336;
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
		this.enterRule(localctx, 40, LatexParser.RULE_sum_prod_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 338;
			_la = this._input.LA(1);
			if(!(_la===18 || _la===19)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 339;
			this.match(LatexParser.L_BRACE);
			this.state = 340;
			this.id();
			this.state = 341;
			this.match(LatexParser.EQ);
			this.state = 342;
			localctx._start_expr = this.expr(0);
			this.state = 343;
			this.match(LatexParser.R_BRACE);
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
				localctx._end_expr = this.expr(0);
				this.state = 348;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
			case 66:
				{
				this.state = 350;
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
			this.state = 353;
			this.match(LatexParser.L_PAREN);
			this.state = 354;
			localctx._operand_expr = this.expr(0);
			this.state = 355;
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
		this.enterRule(localctx, 42, LatexParser.RULE_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 357;
			this.match(LatexParser.CMD_FRAC);
			this.state = 358;
			this.match(LatexParser.L_BRACE);
			this.state = 365;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 359;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 360;
				this.match(LatexParser.L_BRACE);
				this.state = 361;
				this.id();
				this.state = 362;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 364;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 367;
			this.match(LatexParser.R_BRACE);
			this.state = 368;
			this.match(LatexParser.L_BRACE);
			this.state = 375;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 369;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 370;
				this.match(LatexParser.L_BRACE);
				this.state = 371;
				this.id();
				this.state = 372;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 374;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 377;
			this.match(LatexParser.L_PAREN);
			this.state = 378;
			this.id();
			this.state = 379;
			this.match(LatexParser.R_PAREN);
			this.state = 380;
			this.match(LatexParser.R_BRACE);
			this.state = 381;
			this.match(LatexParser.L_PAREN);
			this.state = 382;
			this.expr(0);
			this.state = 383;
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
		this.enterRule(localctx, 44, LatexParser.RULE_n_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 385;
			this.match(LatexParser.CMD_FRAC);
			this.state = 386;
			this.match(LatexParser.L_BRACE);
			this.state = 393;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 387;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 388;
				this.match(LatexParser.L_BRACE);
				this.state = 389;
				this.id();
				this.state = 390;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 392;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 401;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 395;
				this.match(LatexParser.CARET);
				this.state = 396;
				this.match(LatexParser.L_BRACE);
				this.state = 397;
				localctx._exp1 = this.number_();
				this.state = 398;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
				{
				this.state = 400;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 403;
			this.match(LatexParser.R_BRACE);
			this.state = 404;
			this.match(LatexParser.L_BRACE);
			this.state = 411;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 405;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 406;
				this.match(LatexParser.L_BRACE);
				this.state = 407;
				this.id();
				this.state = 408;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 410;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 413;
			this.match(LatexParser.L_PAREN);
			this.state = 414;
			this.id();
			this.state = 415;
			this.match(LatexParser.R_PAREN);
			this.state = 422;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				{
				this.state = 416;
				this.match(LatexParser.CARET);
				this.state = 417;
				this.match(LatexParser.L_BRACE);
				this.state = 418;
				localctx._exp2 = this.number_();
				this.state = 419;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 65:
				{
				this.state = 421;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 424;
			this.match(LatexParser.R_BRACE);
			this.state = 425;
			this.match(LatexParser.L_PAREN);
			this.state = 426;
			this.expr(0);
			this.state = 427;
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
		this.enterRule(localctx, 46, LatexParser.RULE_argument);
		let _la: number;
		try {
			this.state = 439;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 429;
				this.id();
				this.state = 430;
				this.match(LatexParser.EQ);
				this.state = 431;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 433;
				this.expr(0);
				this.state = 434;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===59 || _la===61)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 435;
				this.id();
				this.state = 436;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===59 || _la===61)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 437;
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
		this.enterRule(localctx, 48, LatexParser.RULE_condition);
		try {
			this.state = 443;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 441;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 442;
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
		this.enterRule(localctx, 50, LatexParser.RULE_id_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 445;
			this.id();
			this.state = 448;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 446;
				this.match(LatexParser.COMMA);
				this.state = 447;
				this.id();
				}
				}
				this.state = 450;
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
		this.enterRule(localctx, 52, LatexParser.RULE_guess);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 452;
			this.id();
			this.state = 453;
			_la = this._input.LA(1);
			if(!(_la===27 || _la===28)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 456;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 454;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 455;
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
		this.enterRule(localctx, 54, LatexParser.RULE_guess_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 458;
			this.guess();
			this.state = 461;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 459;
				this.match(LatexParser.COMMA);
				this.state = 460;
				this.guess();
				}
				}
				this.state = 463;
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
		this.enterRule(localctx, 56, LatexParser.RULE_condition_single);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 465;
			this.expr(0);
			this.state = 466;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 467;
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
		this.enterRule(localctx, 58, LatexParser.RULE_condition_chain);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 469;
			this.expr(0);
			this.state = 470;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 471;
			this.expr(0);
			this.state = 472;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 473;
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
		this.enterRule(localctx, 60, LatexParser.RULE_matrix_row);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 475;
			this.expr(0);
			this.state = 480;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===70) {
				{
				{
				this.state = 476;
				this.match(LatexParser.AMPERSAND);
				this.state = 477;
				this.expr(0);
				}
				}
				this.state = 482;
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
		this.enterRule(localctx, 62, LatexParser.RULE_user_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 483;
			this.id();
			this.state = 484;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 485;
			this.argument();
			this.state = 490;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===63) {
				{
				{
				this.state = 486;
				this.match(LatexParser.COMMA);
				this.state = 487;
				this.argument();
				}
				}
				this.state = 492;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 493;
			this.match(LatexParser.R_PAREN);
			this.state = 498;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				this.state = 494;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 495;
				localctx._num_points = this.number_();
				this.state = 496;
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
		this.enterRule(localctx, 64, LatexParser.RULE_builtin_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 506;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				this.state = 500;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 501;
				this.match(LatexParser.L_BRACE);
				this.state = 502;
				this.id();
				this.state = 503;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 74:
				{
				this.state = 505;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 508;
			this.match(LatexParser.L_PAREN);
			this.state = 517;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
				{
				this.state = 509;
				this.expr(0);
				this.state = 514;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===63) {
					{
					{
					this.state = 510;
					this.match(LatexParser.COMMA);
					this.state = 511;
					this.expr(0);
					}
					}
					this.state = 516;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 519;
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
		this.enterRule(localctx, 66, LatexParser.RULE_index);
		let _la: number;
		try {
			this.state = 538;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 48, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 521;
				localctx._direct = this.expr(0);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 523;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
					{
					this.state = 522;
					localctx._start = this.expr(0);
					}
				}

				this.state = 525;
				this.match(LatexParser.COLON);
				this.state = 527;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
					{
					this.state = 526;
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
				this.state = 530;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
					{
					this.state = 529;
					localctx._start = this.expr(0);
					}
				}

				this.state = 532;
				this.match(LatexParser.COLON);
				this.state = 533;
				localctx._stride = this.expr(0);
				this.state = 534;
				this.match(LatexParser.COLON);
				this.state = 536;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2793399936) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2189688831) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 131) !== 0)) {
					{
					this.state = 535;
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
		let _startState: number = 68;
		this.enterRecursionRule(localctx, 68, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 668;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 56, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 541;
				this.id();
				this.state = 542;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 544;
				this.id();
				this.state = 545;
				_la = this._input.LA(1);
				if(!(_la===65 || _la===66)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 546;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 548;
				this.id();
				this.state = 549;
				this.match(LatexParser.CARET);
				this.state = 550;
				this.match(LatexParser.L_BRACE);
				this.state = 551;
				this.expr(0);
				this.state = 552;
				this.match(LatexParser.R_BRACE);
				this.state = 553;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 555;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 556;
				this.match(LatexParser.CMD_SQRT);
				this.state = 557;
				this.match(LatexParser.L_BRACE);
				this.state = 558;
				this.expr(0);
				this.state = 559;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new MatrixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 561;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 562;
				this.matrix_row();
				this.state = 567;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===71) {
					{
					{
					this.state = 563;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 564;
					this.matrix_row();
					}
					}
					this.state = 569;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 570;
				this.match(LatexParser.END_MATRIX);
				}
				break;
			case 7:
				{
				localctx = new TrigFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 572;
				this.trig_function();
				}
				break;
			case 8:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 573;
				this.indefinite_integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 574;
				this.integral_cmd();
				}
				break;
			case 10:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 575;
				this.derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 576;
				this.n_derivative_cmd();
				}
				break;
			case 12:
				{
				localctx = new SumProdContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 577;
				this.sum_prod_cmd();
				}
				break;
			case 13:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 579;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 578;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 581;
				this.match(LatexParser.CMD_LN);
				this.state = 582;
				this.match(LatexParser.L_PAREN);
				this.state = 583;
				this.expr(0);
				this.state = 584;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 587;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 586;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 589;
				this.match(LatexParser.CMD_LOG);
				this.state = 590;
				this.match(LatexParser.L_PAREN);
				this.state = 591;
				this.expr(0);
				this.state = 592;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 594;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 595;
				this.match(LatexParser.L_BRACE);
				this.state = 596;
				this.expr(0);
				this.state = 597;
				this.match(LatexParser.R_BRACE);
				this.state = 598;
				this.match(LatexParser.L_PAREN);
				this.state = 599;
				this.expr(0);
				this.state = 600;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 16:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 602;
				_la = this._input.LA(1);
				if(!(_la===49 || _la===50)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 603;
				this.match(LatexParser.L_PAREN);
				this.state = 604;
				this.expr(0);
				this.state = 605;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 17:
				{
				localctx = new NormContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 607;
				this.match(LatexParser.DOUBLE_VBAR);
				this.state = 608;
				this.expr(0);
				this.state = 609;
				this.match(LatexParser.DOUBLE_VBAR);
				}
				break;
			case 18:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 611;
				this.match(LatexParser.VBAR);
				this.state = 612;
				this.expr(0);
				this.state = 613;
				this.match(LatexParser.VBAR);
				}
				break;
			case 19:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 615;
				this.number_with_units();
				}
				break;
			case 20:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 616;
				this.number_();
				}
				break;
			case 21:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 617;
				this.match(LatexParser.SUB);
				this.state = 618;
				this.expr(28);
				}
				break;
			case 22:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 619;
				this.match(LatexParser.CMD_FRAC);
				this.state = 620;
				this.match(LatexParser.L_BRACE);
				this.state = 621;
				this.expr(0);
				this.state = 622;
				this.match(LatexParser.R_BRACE);
				this.state = 623;
				this.match(LatexParser.L_BRACE);
				this.state = 624;
				this.expr(0);
				this.state = 625;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 23:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 627;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 24:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 628;
				this.id();
				}
				break;
			case 25:
				{
				localctx = new UserFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 629;
				this.user_function();
				}
				break;
			case 26:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 630;
				this.builtin_function();
				}
				break;
			case 27:
				{
				localctx = new InfinityExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 631;
				this.match(LatexParser.INFINITY);
				}
				break;
			case 28:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 632;
				this.match(LatexParser.L_PAREN);
				this.state = 633;
				this.expr(0);
				this.state = 634;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 29:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 636;
				this.number_();
				this.state = 637;
				this.expr(11);
				}
				break;
			case 30:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 639;
				this.number_with_units();
				this.state = 640;
				this.expr(10);
				}
				break;
			case 31:
				{
				localctx = new EmptyPlaceholderContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 642;
				this.match(LatexParser.CMD_PLACEHOLDER);
				this.state = 645;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 52, this._ctx) ) {
				case 1:
					{
					this.state = 643;
					this.match(LatexParser.L_BRACE);
					this.state = 644;
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
				this.state = 652;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 53, this._ctx) ) {
				case 1:
					{
					this.state = 647;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 648;
					this.match(LatexParser.L_BRACE);
					this.state = 649;
					this.expr(0);
					this.state = 650;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				this.state = 657;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 64:
					{
					this.state = 654;
					this.match(LatexParser.DECIMAL_POINT);
					}
					break;
				case 56:
				case 67:
					{
					this.state = 655;
					this.number_();
					}
					break;
				case 58:
					{
					this.state = 656;
					this.match(LatexParser.EQ);
					}
					break;
				case 20:
					break;
				default:
					break;
				}
				this.state = 659;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 660;
				this.match(LatexParser.L_BRACE);
				this.state = 661;
				this.expr(0);
				this.state = 662;
				this.match(LatexParser.R_BRACE);
				this.state = 666;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 55, this._ctx) ) {
				case 1:
					{
					this.state = 663;
					this.match(LatexParser.DECIMAL_POINT);
					}
					break;
				case 2:
					{
					this.state = 664;
					this.number_();
					}
					break;
				case 3:
					{
					this.state = 665;
					this.match(LatexParser.EQ);
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 732;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 58, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 730;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 57, this._ctx) ) {
					case 1:
						{
						localctx = new MatrixMultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 670;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 671;
						this.match(LatexParser.CMD_TIMES);
						this.state = 672;
						this.expr(28);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 673;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 674;
						this.match(LatexParser.CMD_CDOT);
						this.state = 675;
						this.expr(27);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 676;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 677;
						this.match(LatexParser.SUB);
						this.state = 678;
						this.expr(24);
						}
						break;
					case 4:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 679;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 680;
						this.match(LatexParser.ADD);
						this.state = 681;
						this.expr(23);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 682;
						if (!(this.precpred(this._ctx, 50))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 50)");
						}
						this.state = 683;
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
						this.state = 684;
						if (!(this.precpred(this._ctx, 49))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 49)");
						}
						this.state = 685;
						this.match(LatexParser.CARET);
						this.state = 686;
						this.match(LatexParser.L_BRACE);
						this.state = 687;
						this.expr(0);
						this.state = 688;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 7:
						{
						localctx = new MatrixIndexContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 690;
						if (!(this.precpred(this._ctx, 48))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 48)");
						}
						this.state = 691;
						this.match(LatexParser.UNDERSCORE);
						this.state = 692;
						this.match(LatexParser.L_BRACE);
						this.state = 693;
						(localctx as MatrixIndexContext)._row = this.index();
						this.state = 694;
						this.match(LatexParser.COMMA);
						this.state = 695;
						(localctx as MatrixIndexContext)._col = this.index();
						this.state = 696;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 8:
						{
						localctx = new TransposeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 698;
						if (!(this.precpred(this._ctx, 47))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 47)");
						}
						this.state = 699;
						this.match(LatexParser.TRANSPOSE);
						}
						break;
					case 9:
						{
						localctx = new FactorialContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 700;
						if (!(this.precpred(this._ctx, 46))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 46)");
						}
						this.state = 701;
						this.match(LatexParser.EXCLAMATION);
						}
						break;
					case 10:
						{
						localctx = new EmptySubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 702;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 703;
						this.match(LatexParser.UNDERSCORE);
						this.state = 704;
						this.match(LatexParser.L_BRACE);
						this.state = 705;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 11:
						{
						localctx = new EmptySuperscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 706;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 707;
						this.match(LatexParser.CARET);
						this.state = 708;
						this.match(LatexParser.L_BRACE);
						this.state = 709;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 12:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 710;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 711;
						this.id();
						}
						break;
					case 13:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 712;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 713;
						this.number_();
						}
						break;
					case 14:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 714;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 715;
						this.number_with_units();
						}
						break;
					case 15:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 716;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 717;
						this.user_function();
						}
						break;
					case 16:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 718;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 719;
						this.builtin_function();
						}
						break;
					case 17:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 720;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 721;
						this.trig_function();
						}
						break;
					case 18:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 722;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 723;
						this.indefinite_integral_cmd();
						}
						break;
					case 19:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 724;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 725;
						this.integral_cmd();
						}
						break;
					case 20:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 726;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 727;
						this.derivative_cmd();
						}
						break;
					case 21:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 728;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 729;
						this.n_derivative_cmd();
						}
						break;
					}
					}
				}
				this.state = 734;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 58, this._ctx);
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
		this.enterRule(localctx, 70, LatexParser.RULE_u_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 735;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 736;
			this.u_expr(0);
			this.state = 737;
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
		this.enterRule(localctx, 72, LatexParser.RULE_u_insert_matrix);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 739;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 740;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===94 || _la===95)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 741;
			_la = this._input.LA(1);
			if(!(_la===85 || _la===87)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 742;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===94 || _la===95)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 743;
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
		this.enterRule(localctx, 74, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.state = 753;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 82:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 745;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 746;
				this.match(LatexParser.U_L_BRACE);
				this.state = 747;
				_la = this._input.LA(1);
				if(!(_la===94 || _la===95)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 748;
				this.match(LatexParser.U_R_BRACE);
				this.state = 749;
				this.match(LatexParser.U_L_BRACE);
				this.state = 750;
				this.match(LatexParser.U_NUMBER);
				this.state = 751;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 83:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 752;
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
		let _startState: number = 76;
		this.enterRecursionRule(localctx, 76, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 777;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 86:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 756;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 757;
				this.match(LatexParser.U_L_BRACE);
				this.state = 758;
				this.expr(0);
				this.state = 759;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 82:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 761;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 762;
				this.match(LatexParser.U_L_BRACE);
				this.state = 765;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 82:
				case 86:
				case 89:
				case 90:
					{
					this.state = 763;
					this.u_expr(0);
					}
					break;
				case 94:
					{
					this.state = 764;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 767;
				this.match(LatexParser.U_R_BRACE);
				this.state = 768;
				this.match(LatexParser.U_L_BRACE);
				this.state = 769;
				this.u_expr(0);
				this.state = 770;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 89:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 772;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 90:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 773;
				this.match(LatexParser.U_L_PAREN);
				this.state = 774;
				this.u_expr(0);
				this.state = 775;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 801;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 63, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 799;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 62, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 779;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 780;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 781;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 782;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 783;
						this.match(LatexParser.U_CARET);
						this.state = 784;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 785;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 786;
						this.match(LatexParser.U_CARET);
						this.state = 787;
						this.match(LatexParser.U_L_BRACE);
						this.state = 788;
						this.match(LatexParser.U_NUMBER);
						this.state = 789;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 790;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 791;
						this.match(LatexParser.U_CARET);
						this.state = 792;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 793;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 794;
						this.match(LatexParser.U_CARET);
						this.state = 795;
						this.match(LatexParser.U_L_BRACE);
						this.state = 796;
						this.u_fraction();
						this.state = 797;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 803;
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

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 34:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 38:
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

	public static readonly _serializedATN: number[] = [4,1,102,805,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
	3,0,97,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,111,8,1,
	1,1,3,1,114,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,127,8,1,
	1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,143,8,2,1,2,
	1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,156,8,2,1,3,5,3,159,8,3,10,
	3,12,3,162,9,3,1,3,1,3,5,3,166,8,3,10,3,12,3,169,9,3,4,3,171,8,3,11,3,12,
	3,172,1,4,1,4,1,4,5,4,178,8,4,10,4,12,4,181,9,4,1,5,1,5,1,5,1,5,1,5,5,5,
	188,8,5,10,5,12,5,191,9,5,1,5,1,5,3,5,195,8,5,1,6,1,6,1,6,1,6,1,6,1,6,3,
	6,203,8,6,1,6,1,6,1,6,1,6,5,6,209,8,6,10,6,12,6,212,9,6,1,6,1,6,1,6,1,6,
	1,7,1,7,1,8,3,8,221,8,8,1,8,1,8,1,9,1,9,3,9,227,8,9,1,9,1,9,1,10,1,10,1,
	10,1,10,1,11,1,11,1,11,4,11,238,8,11,11,11,12,11,239,1,12,1,12,1,12,3,12,
	245,8,12,1,13,1,13,1,13,3,13,250,8,13,1,14,1,14,1,14,1,14,1,15,1,15,1,15,
	1,15,1,15,1,15,1,15,5,15,263,8,15,10,15,12,15,266,9,15,1,15,1,15,1,16,1,
	16,1,16,1,16,1,16,1,16,1,17,3,17,277,8,17,1,17,1,17,1,17,1,17,1,17,1,18,
	1,18,1,18,1,18,1,18,1,18,1,18,3,18,291,8,18,1,18,1,18,1,18,1,18,1,18,1,
	18,1,18,1,18,1,18,3,18,302,8,18,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,
	1,19,1,19,3,19,314,8,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,322,8,19,1,19,
	1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,333,8,19,1,19,1,19,1,19,1,
	19,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,3,20,
	352,8,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,
	21,366,8,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,376,8,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,
	22,3,22,394,8,22,1,22,1,22,1,22,1,22,1,22,1,22,3,22,402,8,22,1,22,1,22,
	1,22,1,22,1,22,1,22,1,22,1,22,3,22,412,8,22,1,22,1,22,1,22,1,22,1,22,1,
	22,1,22,1,22,1,22,3,22,423,8,22,1,22,1,22,1,22,1,22,1,22,1,23,1,23,1,23,
	1,23,1,23,1,23,1,23,1,23,1,23,1,23,3,23,440,8,23,1,24,1,24,3,24,444,8,24,
	1,25,1,25,1,25,4,25,449,8,25,11,25,12,25,450,1,26,1,26,1,26,1,26,3,26,457,
	8,26,1,27,1,27,1,27,4,27,462,8,27,11,27,12,27,463,1,28,1,28,1,28,1,28,1,
	29,1,29,1,29,1,29,1,29,1,29,1,30,1,30,1,30,5,30,479,8,30,10,30,12,30,482,
	9,30,1,31,1,31,1,31,1,31,1,31,5,31,489,8,31,10,31,12,31,492,9,31,1,31,1,
	31,1,31,1,31,1,31,3,31,499,8,31,1,32,1,32,1,32,1,32,1,32,1,32,3,32,507,
	8,32,1,32,1,32,1,32,1,32,5,32,513,8,32,10,32,12,32,516,9,32,3,32,518,8,
	32,1,32,1,32,1,33,1,33,3,33,524,8,33,1,33,1,33,3,33,528,8,33,1,33,3,33,
	531,8,33,1,33,1,33,1,33,1,33,3,33,537,8,33,3,33,539,8,33,1,34,1,34,1,34,
	1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
	34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,5,34,566,8,34,10,34,12,34,569,9,34,
	1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,3,34,580,8,34,1,34,1,34,1,
	34,1,34,1,34,1,34,3,34,588,8,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
	1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
	34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
	1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
	34,1,34,1,34,1,34,1,34,3,34,646,8,34,1,34,1,34,1,34,1,34,1,34,3,34,653,
	8,34,1,34,1,34,1,34,3,34,658,8,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,3,
	34,667,8,34,3,34,669,8,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
	1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
	34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
	1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
	34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,5,34,731,8,34,10,34,12,34,734,9,34,
	1,35,1,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,36,1,37,1,37,1,37,1,37,1,
	37,1,37,1,37,1,37,3,37,754,8,37,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,
	1,38,1,38,3,38,766,8,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,
	38,3,38,778,8,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,
	1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,5,38,800,8,38,10,38,12,38,
	803,9,38,1,38,2,160,167,2,68,76,39,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
	28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,
	76,0,12,1,0,33,45,1,0,16,17,1,0,65,66,1,0,18,19,2,0,59,59,61,61,1,0,27,
	28,1,0,59,62,1,0,49,50,1,0,1,2,1,0,80,81,1,0,94,95,2,0,85,85,87,87,907,
	0,96,1,0,0,0,2,110,1,0,0,0,4,128,1,0,0,0,6,160,1,0,0,0,8,174,1,0,0,0,10,
	194,1,0,0,0,12,202,1,0,0,0,14,217,1,0,0,0,16,220,1,0,0,0,18,226,1,0,0,0,
	20,230,1,0,0,0,22,234,1,0,0,0,24,241,1,0,0,0,26,246,1,0,0,0,28,251,1,0,
	0,0,30,255,1,0,0,0,32,269,1,0,0,0,34,276,1,0,0,0,36,290,1,0,0,0,38,313,
	1,0,0,0,40,338,1,0,0,0,42,357,1,0,0,0,44,385,1,0,0,0,46,439,1,0,0,0,48,
	443,1,0,0,0,50,445,1,0,0,0,52,452,1,0,0,0,54,458,1,0,0,0,56,465,1,0,0,0,
	58,469,1,0,0,0,60,475,1,0,0,0,62,483,1,0,0,0,64,506,1,0,0,0,66,538,1,0,
	0,0,68,668,1,0,0,0,70,735,1,0,0,0,72,739,1,0,0,0,74,753,1,0,0,0,76,777,
	1,0,0,0,78,97,3,20,10,0,79,97,3,22,11,0,80,97,3,24,12,0,81,97,3,26,13,0,
	82,97,3,28,14,0,83,97,3,70,35,0,84,97,3,16,8,0,85,97,3,14,7,0,86,97,3,50,
	25,0,87,97,3,52,26,0,88,97,3,54,27,0,89,97,3,68,34,0,90,97,3,48,24,0,91,
	97,3,30,15,0,92,97,3,6,3,0,93,97,3,2,1,0,94,97,3,4,2,0,95,97,3,12,6,0,96,
	78,1,0,0,0,96,79,1,0,0,0,96,80,1,0,0,0,96,81,1,0,0,0,96,82,1,0,0,0,96,83,
	1,0,0,0,96,84,1,0,0,0,96,85,1,0,0,0,96,86,1,0,0,0,96,87,1,0,0,0,96,88,1,
	0,0,0,96,89,1,0,0,0,96,90,1,0,0,0,96,91,1,0,0,0,96,92,1,0,0,0,96,93,1,0,
	0,0,96,94,1,0,0,0,96,95,1,0,0,0,96,97,1,0,0,0,97,98,1,0,0,0,98,99,5,0,0,
	1,99,1,1,0,0,0,100,101,5,7,0,0,101,102,3,68,34,0,102,103,5,63,0,0,103,104,
	3,68,34,0,104,105,5,8,0,0,105,111,1,0,0,0,106,107,3,68,34,0,107,108,5,63,
	0,0,108,109,3,68,34,0,109,111,1,0,0,0,110,100,1,0,0,0,110,106,1,0,0,0,111,
	113,1,0,0,0,112,114,5,32,0,0,113,112,1,0,0,0,113,114,1,0,0,0,114,115,1,
	0,0,0,115,126,5,58,0,0,116,117,5,7,0,0,117,118,3,70,35,0,118,119,5,63,0,
	0,119,120,3,70,35,0,120,121,5,8,0,0,121,127,1,0,0,0,122,123,3,70,35,0,123,
	124,5,63,0,0,124,125,3,70,35,0,125,127,1,0,0,0,126,116,1,0,0,0,126,122,
	1,0,0,0,126,127,1,0,0,0,127,3,1,0,0,0,128,129,5,7,0,0,129,130,3,68,34,0,
	130,131,5,63,0,0,131,132,3,68,34,0,132,133,5,8,0,0,133,134,1,0,0,0,134,
	135,5,74,0,0,135,136,5,7,0,0,136,137,3,46,23,0,137,142,5,8,0,0,138,139,
	5,74,0,0,139,140,3,16,8,0,140,141,5,74,0,0,141,143,1,0,0,0,142,138,1,0,
	0,0,142,143,1,0,0,0,143,144,1,0,0,0,144,155,5,58,0,0,145,146,5,7,0,0,146,
	147,3,70,35,0,147,148,5,63,0,0,148,149,3,70,35,0,149,150,5,8,0,0,150,156,
	1,0,0,0,151,152,3,70,35,0,152,153,5,63,0,0,153,154,3,70,35,0,154,156,1,
	0,0,0,155,145,1,0,0,0,155,151,1,0,0,0,155,156,1,0,0,0,156,5,1,0,0,0,157,
	159,9,0,0,0,158,157,1,0,0,0,159,162,1,0,0,0,160,161,1,0,0,0,160,158,1,0,
	0,0,161,170,1,0,0,0,162,160,1,0,0,0,163,167,3,72,36,0,164,166,9,0,0,0,165,
	164,1,0,0,0,166,169,1,0,0,0,167,168,1,0,0,0,167,165,1,0,0,0,168,171,1,0,
	0,0,169,167,1,0,0,0,170,163,1,0,0,0,171,172,1,0,0,0,172,170,1,0,0,0,172,
	173,1,0,0,0,173,7,1,0,0,0,174,179,3,70,35,0,175,176,5,70,0,0,176,178,3,
	70,35,0,177,175,1,0,0,0,178,181,1,0,0,0,179,177,1,0,0,0,179,180,1,0,0,0,
	180,9,1,0,0,0,181,179,1,0,0,0,182,195,3,70,35,0,183,184,5,68,0,0,184,189,
	3,8,4,0,185,186,5,71,0,0,186,188,3,8,4,0,187,185,1,0,0,0,188,191,1,0,0,
	0,189,187,1,0,0,0,189,190,1,0,0,0,190,192,1,0,0,0,191,189,1,0,0,0,192,193,
	5,69,0,0,193,195,1,0,0,0,194,182,1,0,0,0,194,183,1,0,0,0,195,11,1,0,0,0,
	196,197,5,20,0,0,197,198,5,5,0,0,198,199,3,14,7,0,199,200,5,6,0,0,200,203,
	1,0,0,0,201,203,3,14,7,0,202,196,1,0,0,0,202,201,1,0,0,0,203,204,1,0,0,
	0,204,205,5,7,0,0,205,210,3,10,5,0,206,207,5,63,0,0,207,209,3,10,5,0,208,
	206,1,0,0,0,209,212,1,0,0,0,210,208,1,0,0,0,210,211,1,0,0,0,211,213,1,0,
	0,0,212,210,1,0,0,0,213,214,5,8,0,0,214,215,5,58,0,0,215,216,3,10,5,0,216,
	13,1,0,0,0,217,218,5,74,0,0,218,15,1,0,0,0,219,221,5,56,0,0,220,219,1,0,
	0,0,220,221,1,0,0,0,221,222,1,0,0,0,222,223,5,67,0,0,223,17,1,0,0,0,224,
	227,3,16,8,0,225,227,3,14,7,0,226,224,1,0,0,0,226,225,1,0,0,0,227,228,1,
	0,0,0,228,229,3,70,35,0,229,19,1,0,0,0,230,231,3,14,7,0,231,232,5,58,0,
	0,232,233,3,68,34,0,233,21,1,0,0,0,234,237,3,20,10,0,235,236,5,63,0,0,236,
	238,3,20,10,0,237,235,1,0,0,0,238,239,1,0,0,0,239,237,1,0,0,0,239,240,1,
	0,0,0,240,23,1,0,0,0,241,242,3,20,10,0,242,244,5,58,0,0,243,245,3,70,35,
	0,244,243,1,0,0,0,244,245,1,0,0,0,245,25,1,0,0,0,246,247,3,68,34,0,247,
	249,5,58,0,0,248,250,3,70,35,0,249,248,1,0,0,0,249,250,1,0,0,0,250,27,1,
	0,0,0,251,252,3,68,34,0,252,253,5,58,0,0,253,254,3,68,34,0,254,29,1,0,0,
	0,255,256,3,14,7,0,256,257,5,58,0,0,257,258,3,14,7,0,258,259,5,7,0,0,259,
	264,3,32,16,0,260,261,5,63,0,0,261,263,3,32,16,0,262,260,1,0,0,0,263,266,
	1,0,0,0,264,262,1,0,0,0,264,265,1,0,0,0,265,267,1,0,0,0,266,264,1,0,0,0,
	267,268,5,8,0,0,268,31,1,0,0,0,269,270,5,7,0,0,270,271,3,68,34,0,271,272,
	5,63,0,0,272,273,3,48,24,0,273,274,5,8,0,0,274,33,1,0,0,0,275,277,5,31,
	0,0,276,275,1,0,0,0,276,277,1,0,0,0,277,278,1,0,0,0,278,279,7,0,0,0,279,
	280,5,7,0,0,280,281,3,68,34,0,281,282,5,8,0,0,282,35,1,0,0,0,283,291,5,
	14,0,0,284,285,5,15,0,0,285,286,5,5,0,0,286,287,5,6,0,0,287,288,5,57,0,
	0,288,289,5,5,0,0,289,291,5,6,0,0,290,283,1,0,0,0,290,284,1,0,0,0,291,292,
	1,0,0,0,292,293,5,7,0,0,293,294,3,68,34,0,294,301,5,8,0,0,295,296,5,20,
	0,0,296,297,5,5,0,0,297,298,3,14,7,0,298,299,5,6,0,0,299,302,1,0,0,0,300,
	302,3,14,7,0,301,295,1,0,0,0,301,300,1,0,0,0,302,303,1,0,0,0,303,304,5,
	7,0,0,304,305,3,14,7,0,305,306,5,8,0,0,306,37,1,0,0,0,307,308,5,15,0,0,
	308,309,5,5,0,0,309,310,3,68,34,0,310,311,5,6,0,0,311,314,1,0,0,0,312,314,
	7,1,0,0,313,307,1,0,0,0,313,312,1,0,0,0,314,321,1,0,0,0,315,316,5,57,0,
	0,316,317,5,5,0,0,317,318,3,68,34,0,318,319,5,6,0,0,319,322,1,0,0,0,320,
	322,7,2,0,0,321,315,1,0,0,0,321,320,1,0,0,0,322,323,1,0,0,0,323,324,5,7,
	0,0,324,325,3,68,34,0,325,332,5,8,0,0,326,327,5,20,0,0,327,328,5,5,0,0,
	328,329,3,14,7,0,329,330,5,6,0,0,330,333,1,0,0,0,331,333,3,14,7,0,332,326,
	1,0,0,0,332,331,1,0,0,0,333,334,1,0,0,0,334,335,5,7,0,0,335,336,3,14,7,
	0,336,337,5,8,0,0,337,39,1,0,0,0,338,339,7,3,0,0,339,340,5,5,0,0,340,341,
	3,14,7,0,341,342,5,58,0,0,342,343,3,68,34,0,343,344,5,6,0,0,344,351,1,0,
	0,0,345,346,5,57,0,0,346,347,5,5,0,0,347,348,3,68,34,0,348,349,5,6,0,0,
	349,352,1,0,0,0,350,352,7,2,0,0,351,345,1,0,0,0,351,350,1,0,0,0,352,353,
	1,0,0,0,353,354,5,7,0,0,354,355,3,68,34,0,355,356,5,8,0,0,356,41,1,0,0,
	0,357,358,5,21,0,0,358,365,5,5,0,0,359,360,5,20,0,0,360,361,5,5,0,0,361,
	362,3,14,7,0,362,363,5,6,0,0,363,366,1,0,0,0,364,366,3,14,7,0,365,359,1,
	0,0,0,365,364,1,0,0,0,366,367,1,0,0,0,367,368,5,6,0,0,368,375,5,5,0,0,369,
	370,5,20,0,0,370,371,5,5,0,0,371,372,3,14,7,0,372,373,5,6,0,0,373,376,1,
	0,0,0,374,376,3,14,7,0,375,369,1,0,0,0,375,374,1,0,0,0,376,377,1,0,0,0,
	377,378,5,7,0,0,378,379,3,14,7,0,379,380,5,8,0,0,380,381,5,6,0,0,381,382,
	5,7,0,0,382,383,3,68,34,0,383,384,5,8,0,0,384,43,1,0,0,0,385,386,5,21,0,
	0,386,393,5,5,0,0,387,388,5,20,0,0,388,389,5,5,0,0,389,390,3,14,7,0,390,
	391,5,6,0,0,391,394,1,0,0,0,392,394,3,14,7,0,393,387,1,0,0,0,393,392,1,
	0,0,0,394,401,1,0,0,0,395,396,5,57,0,0,396,397,5,5,0,0,397,398,3,16,8,0,
	398,399,5,6,0,0,399,402,1,0,0,0,400,402,5,65,0,0,401,395,1,0,0,0,401,400,
	1,0,0,0,402,403,1,0,0,0,403,404,5,6,0,0,404,411,5,5,0,0,405,406,5,20,0,
	0,406,407,5,5,0,0,407,408,3,14,7,0,408,409,5,6,0,0,409,412,1,0,0,0,410,
	412,3,14,7,0,411,405,1,0,0,0,411,410,1,0,0,0,412,413,1,0,0,0,413,414,5,
	7,0,0,414,415,3,14,7,0,415,422,5,8,0,0,416,417,5,57,0,0,417,418,5,5,0,0,
	418,419,3,16,8,0,419,420,5,6,0,0,420,423,1,0,0,0,421,423,5,65,0,0,422,416,
	1,0,0,0,422,421,1,0,0,0,423,424,1,0,0,0,424,425,5,6,0,0,425,426,5,7,0,0,
	426,427,3,68,34,0,427,428,5,8,0,0,428,45,1,0,0,0,429,430,3,14,7,0,430,431,
	5,58,0,0,431,432,3,68,34,0,432,440,1,0,0,0,433,434,3,68,34,0,434,435,7,
	4,0,0,435,436,3,14,7,0,436,437,7,4,0,0,437,438,3,68,34,0,438,440,1,0,0,
	0,439,429,1,0,0,0,439,433,1,0,0,0,440,47,1,0,0,0,441,444,3,56,28,0,442,
	444,3,58,29,0,443,441,1,0,0,0,443,442,1,0,0,0,444,49,1,0,0,0,445,448,3,
	14,7,0,446,447,5,63,0,0,447,449,3,14,7,0,448,446,1,0,0,0,449,450,1,0,0,
	0,450,448,1,0,0,0,450,451,1,0,0,0,451,51,1,0,0,0,452,453,3,14,7,0,453,456,
	7,5,0,0,454,457,3,16,8,0,455,457,3,18,9,0,456,454,1,0,0,0,456,455,1,0,0,
	0,457,53,1,0,0,0,458,461,3,52,26,0,459,460,5,63,0,0,460,462,3,52,26,0,461,
	459,1,0,0,0,462,463,1,0,0,0,463,461,1,0,0,0,463,464,1,0,0,0,464,55,1,0,
	0,0,465,466,3,68,34,0,466,467,7,6,0,0,467,468,3,68,34,0,468,57,1,0,0,0,
	469,470,3,68,34,0,470,471,7,6,0,0,471,472,3,68,34,0,472,473,7,6,0,0,473,
	474,3,68,34,0,474,59,1,0,0,0,475,480,3,68,34,0,476,477,5,70,0,0,477,479,
	3,68,34,0,478,476,1,0,0,0,479,482,1,0,0,0,480,478,1,0,0,0,480,481,1,0,0,
	0,481,61,1,0,0,0,482,480,1,0,0,0,483,484,3,14,7,0,484,485,5,7,0,0,485,490,
	3,46,23,0,486,487,5,63,0,0,487,489,3,46,23,0,488,486,1,0,0,0,489,492,1,
	0,0,0,490,488,1,0,0,0,490,491,1,0,0,0,491,493,1,0,0,0,492,490,1,0,0,0,493,
	498,5,8,0,0,494,495,5,74,0,0,495,496,3,16,8,0,496,497,5,74,0,0,497,499,
	1,0,0,0,498,494,1,0,0,0,498,499,1,0,0,0,499,63,1,0,0,0,500,501,5,20,0,0,
	501,502,5,5,0,0,502,503,3,14,7,0,503,504,5,6,0,0,504,507,1,0,0,0,505,507,
	3,14,7,0,506,500,1,0,0,0,506,505,1,0,0,0,507,508,1,0,0,0,508,517,5,7,0,
	0,509,514,3,68,34,0,510,511,5,63,0,0,511,513,3,68,34,0,512,510,1,0,0,0,
	513,516,1,0,0,0,514,512,1,0,0,0,514,515,1,0,0,0,515,518,1,0,0,0,516,514,
	1,0,0,0,517,509,1,0,0,0,517,518,1,0,0,0,518,519,1,0,0,0,519,520,5,8,0,0,
	520,65,1,0,0,0,521,539,3,68,34,0,522,524,3,68,34,0,523,522,1,0,0,0,523,
	524,1,0,0,0,524,525,1,0,0,0,525,527,5,3,0,0,526,528,3,68,34,0,527,526,1,
	0,0,0,527,528,1,0,0,0,528,539,1,0,0,0,529,531,3,68,34,0,530,529,1,0,0,0,
	530,531,1,0,0,0,531,532,1,0,0,0,532,533,5,3,0,0,533,534,3,68,34,0,534,536,
	5,3,0,0,535,537,3,68,34,0,536,535,1,0,0,0,536,537,1,0,0,0,537,539,1,0,0,
	0,538,521,1,0,0,0,538,523,1,0,0,0,538,530,1,0,0,0,539,67,1,0,0,0,540,541,
	6,34,-1,0,541,542,3,14,7,0,542,543,5,73,0,0,543,669,1,0,0,0,544,545,3,14,
	7,0,545,546,7,2,0,0,546,547,5,72,0,0,547,669,1,0,0,0,548,549,3,14,7,0,549,
	550,5,57,0,0,550,551,5,5,0,0,551,552,3,68,34,0,552,553,5,6,0,0,553,554,
	5,72,0,0,554,669,1,0,0,0,555,669,5,26,0,0,556,557,5,25,0,0,557,558,5,5,
	0,0,558,559,3,68,34,0,559,560,5,6,0,0,560,669,1,0,0,0,561,562,5,68,0,0,
	562,567,3,60,30,0,563,564,5,71,0,0,564,566,3,60,30,0,565,563,1,0,0,0,566,
	569,1,0,0,0,567,565,1,0,0,0,567,568,1,0,0,0,568,570,1,0,0,0,569,567,1,0,
	0,0,570,571,5,69,0,0,571,669,1,0,0,0,572,669,3,34,17,0,573,669,3,36,18,
	0,574,669,3,38,19,0,575,669,3,42,21,0,576,669,3,44,22,0,577,669,3,40,20,
	0,578,580,5,31,0,0,579,578,1,0,0,0,579,580,1,0,0,0,580,581,1,0,0,0,581,
	582,5,46,0,0,582,583,5,7,0,0,583,584,3,68,34,0,584,585,5,8,0,0,585,669,
	1,0,0,0,586,588,5,31,0,0,587,586,1,0,0,0,587,588,1,0,0,0,588,589,1,0,0,
	0,589,590,5,47,0,0,590,591,5,7,0,0,591,592,3,68,34,0,592,593,5,8,0,0,593,
	669,1,0,0,0,594,595,5,48,0,0,595,596,5,5,0,0,596,597,3,68,34,0,597,598,
	5,6,0,0,598,599,5,7,0,0,599,600,3,68,34,0,600,601,5,8,0,0,601,669,1,0,0,
	0,602,603,7,7,0,0,603,604,5,7,0,0,604,605,3,68,34,0,605,606,5,8,0,0,606,
	669,1,0,0,0,607,608,5,10,0,0,608,609,3,68,34,0,609,610,5,10,0,0,610,669,
	1,0,0,0,611,612,5,9,0,0,612,613,3,68,34,0,613,614,5,9,0,0,614,669,1,0,0,
	0,615,669,3,18,9,0,616,669,3,16,8,0,617,618,5,56,0,0,618,669,3,68,34,28,
	619,620,5,21,0,0,620,621,5,5,0,0,621,622,3,68,34,0,622,623,5,6,0,0,623,
	624,5,5,0,0,624,625,3,68,34,0,625,626,5,6,0,0,626,669,1,0,0,0,627,669,5,
	22,0,0,628,669,3,14,7,0,629,669,3,62,31,0,630,669,3,64,32,0,631,669,5,13,
	0,0,632,633,5,7,0,0,633,634,3,68,34,0,634,635,5,8,0,0,635,669,1,0,0,0,636,
	637,3,16,8,0,637,638,3,68,34,11,638,669,1,0,0,0,639,640,3,18,9,0,640,641,
	3,68,34,10,641,669,1,0,0,0,642,645,5,29,0,0,643,644,5,5,0,0,644,646,5,6,
	0,0,645,643,1,0,0,0,645,646,1,0,0,0,646,669,1,0,0,0,647,648,5,20,0,0,648,
	649,5,5,0,0,649,650,3,68,34,0,650,651,5,6,0,0,651,653,1,0,0,0,652,647,1,
	0,0,0,652,653,1,0,0,0,653,657,1,0,0,0,654,658,5,64,0,0,655,658,3,16,8,0,
	656,658,5,58,0,0,657,654,1,0,0,0,657,655,1,0,0,0,657,656,1,0,0,0,657,658,
	1,0,0,0,658,659,1,0,0,0,659,660,5,20,0,0,660,661,5,5,0,0,661,662,3,68,34,
	0,662,666,5,6,0,0,663,667,5,64,0,0,664,667,3,16,8,0,665,667,5,58,0,0,666,
	663,1,0,0,0,666,664,1,0,0,0,666,665,1,0,0,0,666,667,1,0,0,0,667,669,1,0,
	0,0,668,540,1,0,0,0,668,544,1,0,0,0,668,548,1,0,0,0,668,555,1,0,0,0,668,
	556,1,0,0,0,668,561,1,0,0,0,668,572,1,0,0,0,668,573,1,0,0,0,668,574,1,0,
	0,0,668,575,1,0,0,0,668,576,1,0,0,0,668,577,1,0,0,0,668,579,1,0,0,0,668,
	587,1,0,0,0,668,594,1,0,0,0,668,602,1,0,0,0,668,607,1,0,0,0,668,611,1,0,
	0,0,668,615,1,0,0,0,668,616,1,0,0,0,668,617,1,0,0,0,668,619,1,0,0,0,668,
	627,1,0,0,0,668,628,1,0,0,0,668,629,1,0,0,0,668,630,1,0,0,0,668,631,1,0,
	0,0,668,632,1,0,0,0,668,636,1,0,0,0,668,639,1,0,0,0,668,642,1,0,0,0,668,
	652,1,0,0,0,669,732,1,0,0,0,670,671,10,27,0,0,671,672,5,24,0,0,672,731,
	3,68,34,28,673,674,10,26,0,0,674,675,5,23,0,0,675,731,3,68,34,27,676,677,
	10,23,0,0,677,678,5,56,0,0,678,731,3,68,34,24,679,680,10,22,0,0,680,681,
	5,55,0,0,681,731,3,68,34,23,682,683,10,50,0,0,683,731,7,2,0,0,684,685,10,
	49,0,0,685,686,5,57,0,0,686,687,5,5,0,0,687,688,3,68,34,0,688,689,5,6,0,
	0,689,731,1,0,0,0,690,691,10,48,0,0,691,692,5,11,0,0,692,693,5,5,0,0,693,
	694,3,66,33,0,694,695,5,63,0,0,695,696,3,66,33,0,696,697,5,6,0,0,697,731,
	1,0,0,0,698,699,10,47,0,0,699,731,5,30,0,0,700,701,10,46,0,0,701,731,5,
	12,0,0,702,703,10,16,0,0,703,704,5,11,0,0,704,705,5,5,0,0,705,731,5,6,0,
	0,706,707,10,15,0,0,707,708,5,57,0,0,708,709,5,5,0,0,709,731,5,6,0,0,710,
	711,10,14,0,0,711,731,3,14,7,0,712,713,10,13,0,0,713,731,3,16,8,0,714,715,
	10,12,0,0,715,731,3,18,9,0,716,717,10,9,0,0,717,731,3,62,31,0,718,719,10,
	8,0,0,719,731,3,64,32,0,720,721,10,7,0,0,721,731,3,34,17,0,722,723,10,6,
	0,0,723,731,3,36,18,0,724,725,10,5,0,0,725,731,3,38,19,0,726,727,10,4,0,
	0,727,731,3,42,21,0,728,729,10,3,0,0,729,731,3,44,22,0,730,670,1,0,0,0,
	730,673,1,0,0,0,730,676,1,0,0,0,730,679,1,0,0,0,730,682,1,0,0,0,730,684,
	1,0,0,0,730,690,1,0,0,0,730,698,1,0,0,0,730,700,1,0,0,0,730,702,1,0,0,0,
	730,706,1,0,0,0,730,710,1,0,0,0,730,712,1,0,0,0,730,714,1,0,0,0,730,716,
	1,0,0,0,730,718,1,0,0,0,730,720,1,0,0,0,730,722,1,0,0,0,730,724,1,0,0,0,
	730,726,1,0,0,0,730,728,1,0,0,0,731,734,1,0,0,0,732,730,1,0,0,0,732,733,
	1,0,0,0,733,69,1,0,0,0,734,732,1,0,0,0,735,736,7,8,0,0,736,737,3,76,38,
	0,737,738,7,9,0,0,738,71,1,0,0,0,739,740,7,8,0,0,740,741,7,10,0,0,741,742,
	7,11,0,0,742,743,7,10,0,0,743,744,7,9,0,0,744,73,1,0,0,0,745,746,5,82,0,
	0,746,747,5,92,0,0,747,748,7,10,0,0,748,749,5,93,0,0,749,750,5,92,0,0,750,
	751,5,95,0,0,751,754,5,93,0,0,752,754,5,83,0,0,753,745,1,0,0,0,753,752,
	1,0,0,0,754,75,1,0,0,0,755,756,6,38,-1,0,756,757,5,86,0,0,757,758,5,92,
	0,0,758,759,3,68,34,0,759,760,5,93,0,0,760,778,1,0,0,0,761,762,5,82,0,0,
	762,765,5,92,0,0,763,766,3,76,38,0,764,766,5,94,0,0,765,763,1,0,0,0,765,
	764,1,0,0,0,766,767,1,0,0,0,767,768,5,93,0,0,768,769,5,92,0,0,769,770,3,
	76,38,0,770,771,5,93,0,0,771,778,1,0,0,0,772,778,5,89,0,0,773,774,5,90,
	0,0,774,775,3,76,38,0,775,776,5,91,0,0,776,778,1,0,0,0,777,755,1,0,0,0,
	777,761,1,0,0,0,777,772,1,0,0,0,777,773,1,0,0,0,778,801,1,0,0,0,779,780,
	10,4,0,0,780,781,5,84,0,0,781,800,3,76,38,5,782,783,10,9,0,0,783,784,5,
	88,0,0,784,800,5,95,0,0,785,786,10,8,0,0,786,787,5,88,0,0,787,788,5,92,
	0,0,788,789,5,95,0,0,789,800,5,93,0,0,790,791,10,7,0,0,791,792,5,88,0,0,
	792,800,3,74,37,0,793,794,10,6,0,0,794,795,5,88,0,0,795,796,5,92,0,0,796,
	797,3,74,37,0,797,798,5,93,0,0,798,800,1,0,0,0,799,779,1,0,0,0,799,782,
	1,0,0,0,799,785,1,0,0,0,799,790,1,0,0,0,799,793,1,0,0,0,800,803,1,0,0,0,
	801,799,1,0,0,0,801,802,1,0,0,0,802,77,1,0,0,0,803,801,1,0,0,0,64,96,110,
	113,126,142,155,160,167,172,179,189,194,202,210,220,226,239,244,249,264,
	276,290,301,313,321,332,351,365,375,393,401,411,422,439,443,450,456,463,
	480,490,498,506,514,517,523,527,530,536,538,567,579,587,645,652,657,666,
	668,730,732,753,765,777,799,801];

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
