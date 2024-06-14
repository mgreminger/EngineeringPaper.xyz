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
	public static readonly PI = 11;
	public static readonly CMD_INT = 12;
	public static readonly CMD_INT_UNDERSCORE = 13;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER = 14;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_ID = 15;
	public static readonly CMD_MATHRM = 16;
	public static readonly CMD_FRAC = 17;
	public static readonly CMD_FRAC_INTS = 18;
	public static readonly CMD_CDOT = 19;
	public static readonly CMD_TIMES = 20;
	public static readonly CMD_SQRT = 21;
	public static readonly CMD_SQRT_INT = 22;
	public static readonly CMD_SIM = 23;
	public static readonly CMD_APPROX = 24;
	public static readonly CMD_PLACEHOLDER = 25;
	public static readonly TRANSPOSE = 26;
	public static readonly BACKSLASH = 27;
	public static readonly AS_LINES = 28;
	public static readonly CMD_SIN = 29;
	public static readonly CMD_COS = 30;
	public static readonly CMD_TAN = 31;
	public static readonly CMD_COT = 32;
	public static readonly CMD_SEC = 33;
	public static readonly CMD_CSC = 34;
	public static readonly CMD_ARCSIN = 35;
	public static readonly CMD_ARCCOS = 36;
	public static readonly CMD_ARCTAN = 37;
	public static readonly CMD_SINH = 38;
	public static readonly CMD_COSH = 39;
	public static readonly CMD_TANH = 40;
	public static readonly CMD_COTH = 41;
	public static readonly CMD_LN = 42;
	public static readonly CMD_LOG = 43;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 44;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER = 45;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID = 46;
	public static readonly COMMENT = 47;
	public static readonly CMD_LEFT = 48;
	public static readonly CMD_RIGHT = 49;
	public static readonly DOUBLE_DOLLAR_SIGN = 50;
	public static readonly ADD = 51;
	public static readonly SUB = 52;
	public static readonly CARET = 53;
	public static readonly EQ = 54;
	public static readonly LT = 55;
	public static readonly GT = 56;
	public static readonly LTE = 57;
	public static readonly GTE = 58;
	public static readonly COMMA = 59;
	public static readonly CARET_SINGLE_CHAR_NUMBER = 60;
	public static readonly CARET_SINGLE_CHAR_ID = 61;
	public static readonly NUMBER = 62;
	public static readonly BEGIN_MATRIX = 63;
	public static readonly END_MATRIX = 64;
	public static readonly AMPERSAND = 65;
	public static readonly DOUBLE_BACKSLASH = 66;
	public static readonly UNDERSCORE_SUBSCRIPT = 67;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 68;
	public static readonly ID = 69;
	public static readonly WS = 70;
	public static readonly SLASH_SPACE = 71;
	public static readonly SLASH_COLON = 72;
	public static readonly ERROR_CHAR = 73;
	public static readonly R_BRACKET = 74;
	public static readonly ALT_R_BRACKET = 75;
	public static readonly U_CMD_FRAC = 76;
	public static readonly U_CMD_FRAC_INTS = 77;
	public static readonly U_CMD_CDOT = 78;
	public static readonly U_CMD_TIMES = 79;
	public static readonly U_CMD_SQRT = 80;
	public static readonly U_COMMA = 81;
	public static readonly U_CARET = 82;
	public static readonly U_NAME = 83;
	public static readonly U_L_PAREN = 84;
	public static readonly U_R_PAREN = 85;
	public static readonly U_L_BRACE = 86;
	public static readonly U_R_BRACE = 87;
	public static readonly U_ONE = 88;
	public static readonly U_NUMBER = 89;
	public static readonly U_CMD_LEFT = 90;
	public static readonly U_CMD_RIGHT = 91;
	public static readonly U_WS = 92;
	public static readonly U_SLASH_SPACE = 93;
	public static readonly U_ERROR_CHAR = 94;
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
	public static readonly RULE_derivative_cmd = 17;
	public static readonly RULE_n_derivative_cmd = 18;
	public static readonly RULE_argument = 19;
	public static readonly RULE_condition = 20;
	public static readonly RULE_id_list = 21;
	public static readonly RULE_guess = 22;
	public static readonly RULE_guess_list = 23;
	public static readonly RULE_condition_single = 24;
	public static readonly RULE_condition_chain = 25;
	public static readonly RULE_matrix_row = 26;
	public static readonly RULE_user_function = 27;
	public static readonly RULE_builtin_function = 28;
	public static readonly RULE_expr = 29;
	public static readonly RULE_u_block = 30;
	public static readonly RULE_u_insert_matrix = 31;
	public static readonly RULE_u_fraction = 32;
	public static readonly RULE_u_expr = 33;
	public static readonly literalNames: (string | null)[] = [ null, "'['", 
                                                            "'\\lbrack'", 
                                                            "';'", null, 
                                                            null, null, 
                                                            null, "'|'", 
                                                            null, "'_'", 
                                                            "'\\pi'", "'\\int'", 
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
		"statement", "scatter_plot_query", "parametric_plot_query", "insert_matrix", 
		"id", "number", "number_with_units", "assign", "assign_list", "assign_plus_query", 
		"query", "equality", "piecewise_assign", "piecewise_arg", "trig_function", 
		"indefinite_integral_cmd", "integral_cmd", "derivative_cmd", "n_derivative_cmd", 
		"argument", "condition", "id_list", "guess", "guess_list", "condition_single", 
		"condition_chain", "matrix_row", "user_function", "builtin_function", 
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
			this.state = 85;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 68;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 69;
				this.assign_list();
				}
				break;
			case 3:
				{
				this.state = 70;
				this.assign_plus_query();
				}
				break;
			case 4:
				{
				this.state = 71;
				this.query();
				}
				break;
			case 5:
				{
				this.state = 72;
				this.equality();
				}
				break;
			case 6:
				{
				this.state = 73;
				this.u_block();
				}
				break;
			case 7:
				{
				this.state = 74;
				this.number_();
				}
				break;
			case 8:
				{
				this.state = 75;
				this.id();
				}
				break;
			case 9:
				{
				this.state = 76;
				this.id_list();
				}
				break;
			case 10:
				{
				this.state = 77;
				this.guess();
				}
				break;
			case 11:
				{
				this.state = 78;
				this.guess_list();
				}
				break;
			case 12:
				{
				this.state = 79;
				this.expr(0);
				}
				break;
			case 13:
				{
				this.state = 80;
				this.condition();
				}
				break;
			case 14:
				{
				this.state = 81;
				this.piecewise_assign();
				}
				break;
			case 15:
				{
				this.state = 82;
				this.insert_matrix();
				}
				break;
			case 16:
				{
				this.state = 83;
				this.scatter_plot_query();
				}
				break;
			case 17:
				{
				this.state = 84;
				this.parametric_plot_query();
				}
				break;
			}
			this.state = 87;
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
			this.state = 99;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				{
				this.state = 89;
				this.match(LatexParser.L_PAREN);
				this.state = 90;
				this.expr(0);
				this.state = 91;
				this.match(LatexParser.COMMA);
				this.state = 92;
				this.expr(0);
				this.state = 93;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 2:
				{
				{
				this.state = 95;
				this.expr(0);
				this.state = 96;
				this.match(LatexParser.COMMA);
				this.state = 97;
				this.expr(0);
				}
				}
				break;
			}
			this.state = 102;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===28) {
				{
				this.state = 101;
				this.match(LatexParser.AS_LINES);
				}
			}

			this.state = 104;
			this.match(LatexParser.EQ);
			this.state = 115;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				{
				{
				this.state = 105;
				this.match(LatexParser.L_PAREN);
				this.state = 106;
				this.u_block();
				this.state = 107;
				this.match(LatexParser.COMMA);
				this.state = 108;
				this.u_block();
				this.state = 109;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 111;
				this.u_block();
				this.state = 112;
				this.match(LatexParser.COMMA);
				this.state = 113;
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
			this.state = 127;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				{
				{
				this.state = 117;
				this.match(LatexParser.L_PAREN);
				this.state = 118;
				this.expr(0);
				this.state = 119;
				this.match(LatexParser.COMMA);
				this.state = 120;
				this.expr(0);
				this.state = 121;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 2:
				{
				{
				this.state = 123;
				this.expr(0);
				this.state = 124;
				this.match(LatexParser.COMMA);
				this.state = 125;
				this.expr(0);
				}
				}
				break;
			}
			this.state = 129;
			localctx._for_id = this.match(LatexParser.ID);
			this.state = 130;
			this.argument();
			this.state = 135;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===69) {
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
			case 6:
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
			_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
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
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
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
				_alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
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
					_alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
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
			if (_la===52) {
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
			this.state = 174;
			this.number_();
			this.state = 175;
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
			this.state = 179;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 69:
				{
				this.state = 177;
				this.id();
				}
				break;
			case 11:
				{
				this.state = 178;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
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
			} while (_la===59);
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
			this.state = 207;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 69:
				{
				this.state = 205;
				this.id();
				}
				break;
			case 11:
				{
				this.state = 206;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 209;
			this.match(LatexParser.EQ);
			this.state = 210;
			this.id();
			this.state = 211;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 212;
			this.piecewise_arg();
			this.state = 217;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===59) {
				{
				{
				this.state = 213;
				this.match(LatexParser.COMMA);
				this.state = 214;
				this.piecewise_arg();
				}
				}
				this.state = 219;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 220;
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
			this.state = 222;
			this.match(LatexParser.L_PAREN);
			this.state = 223;
			this.expr(0);
			this.state = 224;
			this.match(LatexParser.COMMA);
			this.state = 225;
			this.condition();
			this.state = 226;
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
			this.state = 229;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 228;
				this.match(LatexParser.BACKSLASH);
				}
			}

			this.state = 231;
			_la = this._input.LA(1);
			if(!(((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 232;
			this.match(LatexParser.L_PAREN);
			this.state = 233;
			this.expr(0);
			this.state = 234;
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
			this.state = 243;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				this.state = 236;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 13:
				{
				{
				this.state = 237;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 238;
				this.match(LatexParser.L_BRACE);
				this.state = 239;
				this.match(LatexParser.R_BRACE);
				this.state = 240;
				this.match(LatexParser.CARET);
				this.state = 241;
				this.match(LatexParser.L_BRACE);
				this.state = 242;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 245;
			this.match(LatexParser.L_PAREN);
			this.state = 246;
			this.expr(0);
			this.state = 247;
			this.match(LatexParser.R_PAREN);
			this.state = 254;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 248;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 249;
				this.match(LatexParser.L_BRACE);
				this.state = 250;
				this.id();
				this.state = 251;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 253;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 256;
			this.match(LatexParser.L_PAREN);
			this.state = 257;
			this.id();
			this.state = 258;
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
			this.state = 266;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				{
				this.state = 260;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 261;
				this.match(LatexParser.L_BRACE);
				this.state = 262;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 263;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 14:
			case 15:
				{
				this.state = 265;
				_la = this._input.LA(1);
				if(!(_la===14 || _la===15)) {
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
			this.state = 274;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 53:
				{
				{
				this.state = 268;
				this.match(LatexParser.CARET);
				this.state = 269;
				this.match(LatexParser.L_BRACE);
				this.state = 270;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 271;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 60:
			case 61:
				{
				this.state = 273;
				_la = this._input.LA(1);
				if(!(_la===60 || _la===61)) {
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
			this.match(LatexParser.L_PAREN);
			this.state = 277;
			localctx._integrand_expr = this.expr(0);
			this.state = 278;
			this.match(LatexParser.R_PAREN);
			this.state = 285;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 279;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 280;
				this.match(LatexParser.L_BRACE);
				this.state = 281;
				this.id();
				this.state = 282;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 284;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 287;
			this.match(LatexParser.L_PAREN);
			this.state = 288;
			this.id();
			this.state = 289;
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
		this.enterRule(localctx, 34, LatexParser.RULE_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 291;
			this.match(LatexParser.CMD_FRAC);
			this.state = 292;
			this.match(LatexParser.L_BRACE);
			this.state = 299;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 293;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 294;
				this.match(LatexParser.L_BRACE);
				this.state = 295;
				this.id();
				this.state = 296;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 298;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 301;
			this.match(LatexParser.R_BRACE);
			this.state = 302;
			this.match(LatexParser.L_BRACE);
			this.state = 309;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 303;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 304;
				this.match(LatexParser.L_BRACE);
				this.state = 305;
				this.id();
				this.state = 306;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 308;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 311;
			this.match(LatexParser.L_PAREN);
			this.state = 312;
			this.id();
			this.state = 313;
			this.match(LatexParser.R_PAREN);
			this.state = 314;
			this.match(LatexParser.R_BRACE);
			this.state = 315;
			this.match(LatexParser.L_PAREN);
			this.state = 316;
			this.expr(0);
			this.state = 317;
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
		this.enterRule(localctx, 36, LatexParser.RULE_n_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 319;
			this.match(LatexParser.CMD_FRAC);
			this.state = 320;
			this.match(LatexParser.L_BRACE);
			this.state = 327;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 321;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 322;
				this.match(LatexParser.L_BRACE);
				this.state = 323;
				this.id();
				this.state = 324;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 326;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 335;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 53:
				{
				{
				this.state = 329;
				this.match(LatexParser.CARET);
				this.state = 330;
				this.match(LatexParser.L_BRACE);
				this.state = 331;
				this.number_();
				this.state = 332;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 60:
				{
				this.state = 334;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 337;
			this.match(LatexParser.R_BRACE);
			this.state = 338;
			this.match(LatexParser.L_BRACE);
			this.state = 345;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 339;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 340;
				this.match(LatexParser.L_BRACE);
				this.state = 341;
				this.id();
				this.state = 342;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 344;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 347;
			this.match(LatexParser.L_PAREN);
			this.state = 348;
			this.id();
			this.state = 349;
			this.match(LatexParser.R_PAREN);
			this.state = 356;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 53:
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
			case 60:
				{
				this.state = 355;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 358;
			this.match(LatexParser.R_BRACE);
			this.state = 359;
			this.match(LatexParser.L_PAREN);
			this.state = 360;
			this.expr(0);
			this.state = 361;
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
		this.enterRule(localctx, 38, LatexParser.RULE_argument);
		let _la: number;
		try {
			this.state = 373;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 363;
				this.id();
				this.state = 364;
				this.match(LatexParser.EQ);
				this.state = 365;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 367;
				this.expr(0);
				this.state = 368;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===55 || _la===57)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 369;
				this.id();
				this.state = 370;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===55 || _la===57)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 371;
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
		this.enterRule(localctx, 40, LatexParser.RULE_condition);
		try {
			this.state = 377;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 375;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 376;
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
		this.enterRule(localctx, 42, LatexParser.RULE_id_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 379;
			this.id();
			this.state = 382;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 380;
				this.match(LatexParser.COMMA);
				this.state = 381;
				this.id();
				}
				}
				this.state = 384;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===59);
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
		this.enterRule(localctx, 44, LatexParser.RULE_guess);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 386;
			this.id();
			this.state = 387;
			_la = this._input.LA(1);
			if(!(_la===23 || _la===24)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 390;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				{
				this.state = 388;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 389;
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
		this.enterRule(localctx, 46, LatexParser.RULE_guess_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 392;
			this.guess();
			this.state = 395;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 393;
				this.match(LatexParser.COMMA);
				this.state = 394;
				this.guess();
				}
				}
				this.state = 397;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===59);
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
		this.enterRule(localctx, 48, LatexParser.RULE_condition_single);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 399;
			this.expr(0);
			this.state = 400;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 401;
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
		this.enterRule(localctx, 50, LatexParser.RULE_condition_chain);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 403;
			this.expr(0);
			this.state = 404;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 405;
			this.expr(0);
			this.state = 406;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 407;
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
		this.enterRule(localctx, 52, LatexParser.RULE_matrix_row);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 409;
			this.expr(0);
			this.state = 414;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===65) {
				{
				{
				this.state = 410;
				this.match(LatexParser.AMPERSAND);
				this.state = 411;
				this.expr(0);
				}
				}
				this.state = 416;
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
		this.enterRule(localctx, 54, LatexParser.RULE_user_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 417;
			this.id();
			this.state = 418;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 419;
			this.argument();
			this.state = 424;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===59) {
				{
				{
				this.state = 420;
				this.match(LatexParser.COMMA);
				this.state = 421;
				this.argument();
				}
				}
				this.state = 426;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 427;
			this.match(LatexParser.R_PAREN);
			this.state = 432;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 428;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 429;
				localctx._num_points = this.number_();
				this.state = 430;
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
		this.enterRule(localctx, 56, LatexParser.RULE_builtin_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 440;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 434;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 435;
				this.match(LatexParser.L_BRACE);
				this.state = 436;
				this.id();
				this.state = 437;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 439;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 442;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 443;
			this.expr(0);
			this.state = 448;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===59) {
				{
				{
				this.state = 444;
				this.match(LatexParser.COMMA);
				this.state = 445;
				this.expr(0);
				}
				}
				this.state = 450;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 451;
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
		let _startState: number = 58;
		this.enterRecursionRule(localctx, 58, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 561;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 454;
				this.id();
				this.state = 455;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 457;
				this.id();
				this.state = 458;
				_la = this._input.LA(1);
				if(!(_la===60 || _la===61)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 459;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 461;
				this.id();
				this.state = 462;
				this.match(LatexParser.CARET);
				this.state = 463;
				this.match(LatexParser.L_BRACE);
				this.state = 464;
				this.expr(0);
				this.state = 465;
				this.match(LatexParser.R_BRACE);
				this.state = 466;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 468;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 469;
				this.match(LatexParser.CMD_SQRT);
				this.state = 470;
				this.match(LatexParser.L_BRACE);
				this.state = 471;
				this.expr(0);
				this.state = 472;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new MatrixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 474;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 475;
				this.matrix_row();
				this.state = 480;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===66) {
					{
					{
					this.state = 476;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 477;
					this.matrix_row();
					}
					}
					this.state = 482;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 483;
				this.match(LatexParser.END_MATRIX);
				}
				break;
			case 7:
				{
				localctx = new TrigFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 485;
				this.trig_function();
				}
				break;
			case 8:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 486;
				this.indefinite_integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 487;
				this.integral_cmd();
				}
				break;
			case 10:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 488;
				this.derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 489;
				this.n_derivative_cmd();
				}
				break;
			case 12:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 491;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===27) {
					{
					this.state = 490;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 493;
				this.match(LatexParser.CMD_LN);
				this.state = 494;
				this.match(LatexParser.L_PAREN);
				this.state = 495;
				this.expr(0);
				this.state = 496;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 13:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 499;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===27) {
					{
					this.state = 498;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 501;
				this.match(LatexParser.CMD_LOG);
				this.state = 502;
				this.match(LatexParser.L_PAREN);
				this.state = 503;
				this.expr(0);
				this.state = 504;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 506;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 507;
				this.match(LatexParser.L_BRACE);
				this.state = 508;
				this.expr(0);
				this.state = 509;
				this.match(LatexParser.R_BRACE);
				this.state = 510;
				this.match(LatexParser.L_PAREN);
				this.state = 511;
				this.expr(0);
				this.state = 512;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 514;
				_la = this._input.LA(1);
				if(!(_la===45 || _la===46)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 515;
				this.match(LatexParser.L_PAREN);
				this.state = 516;
				this.expr(0);
				this.state = 517;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 16:
				{
				localctx = new NormContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 519;
				this.match(LatexParser.DOUBLE_VBAR);
				this.state = 520;
				this.expr(0);
				this.state = 521;
				this.match(LatexParser.DOUBLE_VBAR);
				}
				break;
			case 17:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 523;
				this.match(LatexParser.VBAR);
				this.state = 524;
				this.expr(0);
				this.state = 525;
				this.match(LatexParser.VBAR);
				}
				break;
			case 18:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 527;
				this.number_with_units();
				}
				break;
			case 19:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 528;
				this.number_();
				}
				break;
			case 20:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 529;
				this.match(LatexParser.SUB);
				this.state = 530;
				this.expr(29);
				}
				break;
			case 21:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 531;
				this.match(LatexParser.CMD_FRAC);
				this.state = 532;
				this.match(LatexParser.L_BRACE);
				this.state = 533;
				this.expr(0);
				this.state = 534;
				this.match(LatexParser.R_BRACE);
				this.state = 535;
				this.match(LatexParser.L_BRACE);
				this.state = 536;
				this.expr(0);
				this.state = 537;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 22:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 539;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 23:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 540;
				this.id();
				}
				break;
			case 24:
				{
				localctx = new UserFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 541;
				this.user_function();
				}
				break;
			case 25:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 542;
				this.builtin_function();
				}
				break;
			case 26:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 543;
				this.match(LatexParser.PI);
				}
				break;
			case 27:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 544;
				this.match(LatexParser.L_PAREN);
				this.state = 545;
				this.expr(0);
				this.state = 546;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 28:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 548;
				this.number_();
				this.state = 549;
				this.expr(11);
				}
				break;
			case 29:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 551;
				this.number_with_units();
				this.state = 552;
				this.expr(10);
				}
				break;
			case 30:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 554;
				this.match(LatexParser.PI);
				this.state = 555;
				this.expr(9);
				}
				break;
			case 31:
				{
				localctx = new EmptyPlaceholderContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 556;
				this.match(LatexParser.CMD_PLACEHOLDER);
				this.state = 559;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
				case 1:
					{
					this.state = 557;
					this.match(LatexParser.L_BRACE);
					this.state = 558;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 625;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 45, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 623;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 44, this._ctx) ) {
					case 1:
						{
						localctx = new MatrixMultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 563;
						if (!(this.precpred(this._ctx, 28))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 28)");
						}
						this.state = 564;
						this.match(LatexParser.CMD_TIMES);
						this.state = 565;
						this.expr(29);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 566;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 567;
						this.match(LatexParser.CMD_CDOT);
						this.state = 568;
						this.expr(28);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 569;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 570;
						this.match(LatexParser.SUB);
						this.state = 571;
						this.expr(25);
						}
						break;
					case 4:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 572;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 573;
						this.match(LatexParser.ADD);
						this.state = 574;
						this.expr(24);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 575;
						if (!(this.precpred(this._ctx, 49))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 49)");
						}
						this.state = 576;
						_la = this._input.LA(1);
						if(!(_la===60 || _la===61)) {
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
						this.state = 577;
						if (!(this.precpred(this._ctx, 48))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 48)");
						}
						this.state = 578;
						this.match(LatexParser.CARET);
						this.state = 579;
						this.match(LatexParser.L_BRACE);
						this.state = 580;
						this.expr(0);
						this.state = 581;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 7:
						{
						localctx = new IndexContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 583;
						if (!(this.precpred(this._ctx, 47))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 47)");
						}
						this.state = 584;
						this.match(LatexParser.UNDERSCORE);
						this.state = 585;
						this.match(LatexParser.L_BRACE);
						this.state = 586;
						this.expr(0);
						this.state = 587;
						this.match(LatexParser.COMMA);
						this.state = 588;
						this.expr(0);
						this.state = 589;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 8:
						{
						localctx = new TransposeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 591;
						if (!(this.precpred(this._ctx, 46))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 46)");
						}
						this.state = 592;
						this.match(LatexParser.TRANSPOSE);
						}
						break;
					case 9:
						{
						localctx = new EmptySubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 593;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 594;
						this.match(LatexParser.UNDERSCORE);
						this.state = 595;
						this.match(LatexParser.L_BRACE);
						this.state = 596;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 10:
						{
						localctx = new EmptySuperscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 597;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 598;
						this.match(LatexParser.CARET);
						this.state = 599;
						this.match(LatexParser.L_BRACE);
						this.state = 600;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 11:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 601;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 602;
						this.id();
						}
						break;
					case 12:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 603;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 604;
						this.number_();
						}
						break;
					case 13:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 605;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 606;
						this.number_with_units();
						}
						break;
					case 14:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 607;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 608;
						this.match(LatexParser.PI);
						}
						break;
					case 15:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 609;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 610;
						this.user_function();
						}
						break;
					case 16:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 611;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 612;
						this.builtin_function();
						}
						break;
					case 17:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 613;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 614;
						this.trig_function();
						}
						break;
					case 18:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 615;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 616;
						this.indefinite_integral_cmd();
						}
						break;
					case 19:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 617;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 618;
						this.integral_cmd();
						}
						break;
					case 20:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 619;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 620;
						this.derivative_cmd();
						}
						break;
					case 21:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 621;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 622;
						this.n_derivative_cmd();
						}
						break;
					}
					}
				}
				this.state = 627;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 45, this._ctx);
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
		this.enterRule(localctx, 60, LatexParser.RULE_u_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 628;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 629;
			this.u_expr(0);
			this.state = 630;
			_la = this._input.LA(1);
			if(!(_la===74 || _la===75)) {
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
		this.enterRule(localctx, 62, LatexParser.RULE_u_insert_matrix);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 632;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 633;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===88 || _la===89)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 634;
			_la = this._input.LA(1);
			if(!(_la===79 || _la===81)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 635;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===88 || _la===89)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 636;
			_la = this._input.LA(1);
			if(!(_la===74 || _la===75)) {
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
		this.enterRule(localctx, 64, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.state = 646;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 76:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 638;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 639;
				this.match(LatexParser.U_L_BRACE);
				this.state = 640;
				_la = this._input.LA(1);
				if(!(_la===88 || _la===89)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 641;
				this.match(LatexParser.U_R_BRACE);
				this.state = 642;
				this.match(LatexParser.U_L_BRACE);
				this.state = 643;
				this.match(LatexParser.U_NUMBER);
				this.state = 644;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 77:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 645;
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
		let _startState: number = 66;
		this.enterRecursionRule(localctx, 66, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 670;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 80:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 649;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 650;
				this.match(LatexParser.U_L_BRACE);
				this.state = 651;
				this.expr(0);
				this.state = 652;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 76:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 654;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 655;
				this.match(LatexParser.U_L_BRACE);
				this.state = 658;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 76:
				case 80:
				case 83:
				case 84:
					{
					this.state = 656;
					this.u_expr(0);
					}
					break;
				case 88:
					{
					this.state = 657;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 660;
				this.match(LatexParser.U_R_BRACE);
				this.state = 661;
				this.match(LatexParser.U_L_BRACE);
				this.state = 662;
				this.u_expr(0);
				this.state = 663;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 83:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 665;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 84:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 666;
				this.match(LatexParser.U_L_PAREN);
				this.state = 667;
				this.u_expr(0);
				this.state = 668;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 694;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 50, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 692;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 49, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 672;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 673;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 674;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 675;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 676;
						this.match(LatexParser.U_CARET);
						this.state = 677;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 678;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 679;
						this.match(LatexParser.U_CARET);
						this.state = 680;
						this.match(LatexParser.U_L_BRACE);
						this.state = 681;
						this.match(LatexParser.U_NUMBER);
						this.state = 682;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 683;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 684;
						this.match(LatexParser.U_CARET);
						this.state = 685;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 686;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 687;
						this.match(LatexParser.U_CARET);
						this.state = 688;
						this.match(LatexParser.U_L_BRACE);
						this.state = 689;
						this.u_fraction();
						this.state = 690;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 696;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 50, this._ctx);
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
		case 29:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 33:
			return this.u_expr_sempred(localctx as U_exprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 28);
		case 1:
			return this.precpred(this._ctx, 27);
		case 2:
			return this.precpred(this._ctx, 24);
		case 3:
			return this.precpred(this._ctx, 23);
		case 4:
			return this.precpred(this._ctx, 49);
		case 5:
			return this.precpred(this._ctx, 48);
		case 6:
			return this.precpred(this._ctx, 47);
		case 7:
			return this.precpred(this._ctx, 46);
		case 8:
			return this.precpred(this._ctx, 17);
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
			return this.precpred(this._ctx, 8);
		case 15:
			return this.precpred(this._ctx, 7);
		case 16:
			return this.precpred(this._ctx, 6);
		case 17:
			return this.precpred(this._ctx, 5);
		case 18:
			return this.precpred(this._ctx, 4);
		case 19:
			return this.precpred(this._ctx, 3);
		case 20:
			return this.precpred(this._ctx, 2);
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

	public static readonly _serializedATN: number[] = [4,1,94,698,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
	1,0,1,0,1,0,1,0,3,0,86,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,3,1,100,8,1,1,1,3,1,103,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,3,1,116,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,128,8,2,1,2,
	1,2,1,2,1,2,1,2,1,2,3,2,136,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	1,2,3,2,149,8,2,1,3,5,3,152,8,3,10,3,12,3,155,9,3,1,3,1,3,5,3,159,8,3,10,
	3,12,3,162,9,3,4,3,164,8,3,11,3,12,3,165,1,4,1,4,1,5,3,5,171,8,5,1,5,1,
	5,1,6,1,6,1,6,1,7,1,7,3,7,180,8,7,1,7,1,7,1,7,1,8,1,8,1,8,4,8,188,8,8,11,
	8,12,8,189,1,9,1,9,1,9,3,9,195,8,9,1,10,1,10,1,10,3,10,200,8,10,1,11,1,
	11,1,11,1,11,1,12,1,12,3,12,208,8,12,1,12,1,12,1,12,1,12,1,12,1,12,5,12,
	216,8,12,10,12,12,12,219,9,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,13,1,
	14,3,14,230,8,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,
	1,15,3,15,244,8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,255,
	8,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,3,16,267,8,16,1,
	16,1,16,1,16,1,16,1,16,1,16,3,16,275,8,16,1,16,1,16,1,16,1,16,1,16,1,16,
	1,16,1,16,1,16,3,16,286,8,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,
	17,1,17,1,17,1,17,3,17,300,8,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
	3,17,310,8,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,
	18,1,18,1,18,1,18,1,18,3,18,328,8,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,
	336,8,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,346,8,18,1,18,1,18,
	1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,357,8,18,1,18,1,18,1,18,1,18,1,
	18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,374,8,19,1,20,
	1,20,3,20,378,8,20,1,21,1,21,1,21,4,21,383,8,21,11,21,12,21,384,1,22,1,
	22,1,22,1,22,3,22,391,8,22,1,23,1,23,1,23,4,23,396,8,23,11,23,12,23,397,
	1,24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,5,26,413,
	8,26,10,26,12,26,416,9,26,1,27,1,27,1,27,1,27,1,27,5,27,423,8,27,10,27,
	12,27,426,9,27,1,27,1,27,1,27,1,27,1,27,3,27,433,8,27,1,28,1,28,1,28,1,
	28,1,28,1,28,3,28,441,8,28,1,28,1,28,1,28,1,28,5,28,447,8,28,10,28,12,28,
	450,9,28,1,28,1,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,
	5,29,479,8,29,10,29,12,29,482,9,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,3,29,492,8,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,500,8,29,1,29,1,29,
	1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,
	1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,560,
	8,29,3,29,562,8,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,
	1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,
	1,29,1,29,1,29,1,29,1,29,1,29,5,29,624,8,29,10,29,12,29,627,9,29,1,30,1,
	30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,
	1,32,1,32,3,32,647,8,32,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
	33,3,33,659,8,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,3,33,
	671,8,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
	33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,5,33,693,8,33,10,33,12,33,696,9,33,
	1,33,2,153,160,2,58,66,34,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,
	34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,0,11,1,0,29,41,1,0,14,
	15,1,0,60,61,2,0,55,55,57,57,1,0,23,24,1,0,55,58,1,0,45,46,1,0,1,2,1,0,
	74,75,1,0,88,89,2,0,79,79,81,81,785,0,85,1,0,0,0,2,99,1,0,0,0,4,127,1,0,
	0,0,6,153,1,0,0,0,8,167,1,0,0,0,10,170,1,0,0,0,12,174,1,0,0,0,14,179,1,
	0,0,0,16,184,1,0,0,0,18,191,1,0,0,0,20,196,1,0,0,0,22,201,1,0,0,0,24,207,
	1,0,0,0,26,222,1,0,0,0,28,229,1,0,0,0,30,243,1,0,0,0,32,266,1,0,0,0,34,
	291,1,0,0,0,36,319,1,0,0,0,38,373,1,0,0,0,40,377,1,0,0,0,42,379,1,0,0,0,
	44,386,1,0,0,0,46,392,1,0,0,0,48,399,1,0,0,0,50,403,1,0,0,0,52,409,1,0,
	0,0,54,417,1,0,0,0,56,440,1,0,0,0,58,561,1,0,0,0,60,628,1,0,0,0,62,632,
	1,0,0,0,64,646,1,0,0,0,66,670,1,0,0,0,68,86,3,14,7,0,69,86,3,16,8,0,70,
	86,3,18,9,0,71,86,3,20,10,0,72,86,3,22,11,0,73,86,3,60,30,0,74,86,3,10,
	5,0,75,86,3,8,4,0,76,86,3,42,21,0,77,86,3,44,22,0,78,86,3,46,23,0,79,86,
	3,58,29,0,80,86,3,40,20,0,81,86,3,24,12,0,82,86,3,6,3,0,83,86,3,2,1,0,84,
	86,3,4,2,0,85,68,1,0,0,0,85,69,1,0,0,0,85,70,1,0,0,0,85,71,1,0,0,0,85,72,
	1,0,0,0,85,73,1,0,0,0,85,74,1,0,0,0,85,75,1,0,0,0,85,76,1,0,0,0,85,77,1,
	0,0,0,85,78,1,0,0,0,85,79,1,0,0,0,85,80,1,0,0,0,85,81,1,0,0,0,85,82,1,0,
	0,0,85,83,1,0,0,0,85,84,1,0,0,0,85,86,1,0,0,0,86,87,1,0,0,0,87,88,5,0,0,
	1,88,1,1,0,0,0,89,90,5,6,0,0,90,91,3,58,29,0,91,92,5,59,0,0,92,93,3,58,
	29,0,93,94,5,7,0,0,94,100,1,0,0,0,95,96,3,58,29,0,96,97,5,59,0,0,97,98,
	3,58,29,0,98,100,1,0,0,0,99,89,1,0,0,0,99,95,1,0,0,0,100,102,1,0,0,0,101,
	103,5,28,0,0,102,101,1,0,0,0,102,103,1,0,0,0,103,104,1,0,0,0,104,115,5,
	54,0,0,105,106,5,6,0,0,106,107,3,60,30,0,107,108,5,59,0,0,108,109,3,60,
	30,0,109,110,5,7,0,0,110,116,1,0,0,0,111,112,3,60,30,0,112,113,5,59,0,0,
	113,114,3,60,30,0,114,116,1,0,0,0,115,105,1,0,0,0,115,111,1,0,0,0,115,116,
	1,0,0,0,116,3,1,0,0,0,117,118,5,6,0,0,118,119,3,58,29,0,119,120,5,59,0,
	0,120,121,3,58,29,0,121,122,5,7,0,0,122,128,1,0,0,0,123,124,3,58,29,0,124,
	125,5,59,0,0,125,126,3,58,29,0,126,128,1,0,0,0,127,117,1,0,0,0,127,123,
	1,0,0,0,128,129,1,0,0,0,129,130,5,69,0,0,130,135,3,38,19,0,131,132,5,69,
	0,0,132,133,3,10,5,0,133,134,5,69,0,0,134,136,1,0,0,0,135,131,1,0,0,0,135,
	136,1,0,0,0,136,137,1,0,0,0,137,148,5,54,0,0,138,139,5,6,0,0,139,140,3,
	60,30,0,140,141,5,59,0,0,141,142,3,60,30,0,142,143,5,7,0,0,143,149,1,0,
	0,0,144,145,3,60,30,0,145,146,5,59,0,0,146,147,3,60,30,0,147,149,1,0,0,
	0,148,138,1,0,0,0,148,144,1,0,0,0,148,149,1,0,0,0,149,5,1,0,0,0,150,152,
	9,0,0,0,151,150,1,0,0,0,152,155,1,0,0,0,153,154,1,0,0,0,153,151,1,0,0,0,
	154,163,1,0,0,0,155,153,1,0,0,0,156,160,3,62,31,0,157,159,9,0,0,0,158,157,
	1,0,0,0,159,162,1,0,0,0,160,161,1,0,0,0,160,158,1,0,0,0,161,164,1,0,0,0,
	162,160,1,0,0,0,163,156,1,0,0,0,164,165,1,0,0,0,165,163,1,0,0,0,165,166,
	1,0,0,0,166,7,1,0,0,0,167,168,5,69,0,0,168,9,1,0,0,0,169,171,5,52,0,0,170,
	169,1,0,0,0,170,171,1,0,0,0,171,172,1,0,0,0,172,173,5,62,0,0,173,11,1,0,
	0,0,174,175,3,10,5,0,175,176,3,60,30,0,176,13,1,0,0,0,177,180,3,8,4,0,178,
	180,5,11,0,0,179,177,1,0,0,0,179,178,1,0,0,0,180,181,1,0,0,0,181,182,5,
	54,0,0,182,183,3,58,29,0,183,15,1,0,0,0,184,187,3,14,7,0,185,186,5,59,0,
	0,186,188,3,14,7,0,187,185,1,0,0,0,188,189,1,0,0,0,189,187,1,0,0,0,189,
	190,1,0,0,0,190,17,1,0,0,0,191,192,3,14,7,0,192,194,5,54,0,0,193,195,3,
	60,30,0,194,193,1,0,0,0,194,195,1,0,0,0,195,19,1,0,0,0,196,197,3,58,29,
	0,197,199,5,54,0,0,198,200,3,60,30,0,199,198,1,0,0,0,199,200,1,0,0,0,200,
	21,1,0,0,0,201,202,3,58,29,0,202,203,5,54,0,0,203,204,3,58,29,0,204,23,
	1,0,0,0,205,208,3,8,4,0,206,208,5,11,0,0,207,205,1,0,0,0,207,206,1,0,0,
	0,208,209,1,0,0,0,209,210,5,54,0,0,210,211,3,8,4,0,211,212,5,6,0,0,212,
	217,3,26,13,0,213,214,5,59,0,0,214,216,3,26,13,0,215,213,1,0,0,0,216,219,
	1,0,0,0,217,215,1,0,0,0,217,218,1,0,0,0,218,220,1,0,0,0,219,217,1,0,0,0,
	220,221,5,7,0,0,221,25,1,0,0,0,222,223,5,6,0,0,223,224,3,58,29,0,224,225,
	5,59,0,0,225,226,3,40,20,0,226,227,5,7,0,0,227,27,1,0,0,0,228,230,5,27,
	0,0,229,228,1,0,0,0,229,230,1,0,0,0,230,231,1,0,0,0,231,232,7,0,0,0,232,
	233,5,6,0,0,233,234,3,58,29,0,234,235,5,7,0,0,235,29,1,0,0,0,236,244,5,
	12,0,0,237,238,5,13,0,0,238,239,5,4,0,0,239,240,5,5,0,0,240,241,5,53,0,
	0,241,242,5,4,0,0,242,244,5,5,0,0,243,236,1,0,0,0,243,237,1,0,0,0,244,245,
	1,0,0,0,245,246,5,6,0,0,246,247,3,58,29,0,247,254,5,7,0,0,248,249,5,16,
	0,0,249,250,5,4,0,0,250,251,3,8,4,0,251,252,5,5,0,0,252,255,1,0,0,0,253,
	255,3,8,4,0,254,248,1,0,0,0,254,253,1,0,0,0,255,256,1,0,0,0,256,257,5,6,
	0,0,257,258,3,8,4,0,258,259,5,7,0,0,259,31,1,0,0,0,260,261,5,13,0,0,261,
	262,5,4,0,0,262,263,3,58,29,0,263,264,5,5,0,0,264,267,1,0,0,0,265,267,7,
	1,0,0,266,260,1,0,0,0,266,265,1,0,0,0,267,274,1,0,0,0,268,269,5,53,0,0,
	269,270,5,4,0,0,270,271,3,58,29,0,271,272,5,5,0,0,272,275,1,0,0,0,273,275,
	7,2,0,0,274,268,1,0,0,0,274,273,1,0,0,0,275,276,1,0,0,0,276,277,5,6,0,0,
	277,278,3,58,29,0,278,285,5,7,0,0,279,280,5,16,0,0,280,281,5,4,0,0,281,
	282,3,8,4,0,282,283,5,5,0,0,283,286,1,0,0,0,284,286,3,8,4,0,285,279,1,0,
	0,0,285,284,1,0,0,0,286,287,1,0,0,0,287,288,5,6,0,0,288,289,3,8,4,0,289,
	290,5,7,0,0,290,33,1,0,0,0,291,292,5,17,0,0,292,299,5,4,0,0,293,294,5,16,
	0,0,294,295,5,4,0,0,295,296,3,8,4,0,296,297,5,5,0,0,297,300,1,0,0,0,298,
	300,3,8,4,0,299,293,1,0,0,0,299,298,1,0,0,0,300,301,1,0,0,0,301,302,5,5,
	0,0,302,309,5,4,0,0,303,304,5,16,0,0,304,305,5,4,0,0,305,306,3,8,4,0,306,
	307,5,5,0,0,307,310,1,0,0,0,308,310,3,8,4,0,309,303,1,0,0,0,309,308,1,0,
	0,0,310,311,1,0,0,0,311,312,5,6,0,0,312,313,3,8,4,0,313,314,5,7,0,0,314,
	315,5,5,0,0,315,316,5,6,0,0,316,317,3,58,29,0,317,318,5,7,0,0,318,35,1,
	0,0,0,319,320,5,17,0,0,320,327,5,4,0,0,321,322,5,16,0,0,322,323,5,4,0,0,
	323,324,3,8,4,0,324,325,5,5,0,0,325,328,1,0,0,0,326,328,3,8,4,0,327,321,
	1,0,0,0,327,326,1,0,0,0,328,335,1,0,0,0,329,330,5,53,0,0,330,331,5,4,0,
	0,331,332,3,10,5,0,332,333,5,5,0,0,333,336,1,0,0,0,334,336,5,60,0,0,335,
	329,1,0,0,0,335,334,1,0,0,0,336,337,1,0,0,0,337,338,5,5,0,0,338,345,5,4,
	0,0,339,340,5,16,0,0,340,341,5,4,0,0,341,342,3,8,4,0,342,343,5,5,0,0,343,
	346,1,0,0,0,344,346,3,8,4,0,345,339,1,0,0,0,345,344,1,0,0,0,346,347,1,0,
	0,0,347,348,5,6,0,0,348,349,3,8,4,0,349,356,5,7,0,0,350,351,5,53,0,0,351,
	352,5,4,0,0,352,353,3,10,5,0,353,354,5,5,0,0,354,357,1,0,0,0,355,357,5,
	60,0,0,356,350,1,0,0,0,356,355,1,0,0,0,357,358,1,0,0,0,358,359,5,5,0,0,
	359,360,5,6,0,0,360,361,3,58,29,0,361,362,5,7,0,0,362,37,1,0,0,0,363,364,
	3,8,4,0,364,365,5,54,0,0,365,366,3,58,29,0,366,374,1,0,0,0,367,368,3,58,
	29,0,368,369,7,3,0,0,369,370,3,8,4,0,370,371,7,3,0,0,371,372,3,58,29,0,
	372,374,1,0,0,0,373,363,1,0,0,0,373,367,1,0,0,0,374,39,1,0,0,0,375,378,
	3,48,24,0,376,378,3,50,25,0,377,375,1,0,0,0,377,376,1,0,0,0,378,41,1,0,
	0,0,379,382,3,8,4,0,380,381,5,59,0,0,381,383,3,8,4,0,382,380,1,0,0,0,383,
	384,1,0,0,0,384,382,1,0,0,0,384,385,1,0,0,0,385,43,1,0,0,0,386,387,3,8,
	4,0,387,390,7,4,0,0,388,391,3,10,5,0,389,391,3,12,6,0,390,388,1,0,0,0,390,
	389,1,0,0,0,391,45,1,0,0,0,392,395,3,44,22,0,393,394,5,59,0,0,394,396,3,
	44,22,0,395,393,1,0,0,0,396,397,1,0,0,0,397,395,1,0,0,0,397,398,1,0,0,0,
	398,47,1,0,0,0,399,400,3,58,29,0,400,401,7,5,0,0,401,402,3,58,29,0,402,
	49,1,0,0,0,403,404,3,58,29,0,404,405,7,5,0,0,405,406,3,58,29,0,406,407,
	7,5,0,0,407,408,3,58,29,0,408,51,1,0,0,0,409,414,3,58,29,0,410,411,5,65,
	0,0,411,413,3,58,29,0,412,410,1,0,0,0,413,416,1,0,0,0,414,412,1,0,0,0,414,
	415,1,0,0,0,415,53,1,0,0,0,416,414,1,0,0,0,417,418,3,8,4,0,418,419,5,6,
	0,0,419,424,3,38,19,0,420,421,5,59,0,0,421,423,3,38,19,0,422,420,1,0,0,
	0,423,426,1,0,0,0,424,422,1,0,0,0,424,425,1,0,0,0,425,427,1,0,0,0,426,424,
	1,0,0,0,427,432,5,7,0,0,428,429,5,69,0,0,429,430,3,10,5,0,430,431,5,69,
	0,0,431,433,1,0,0,0,432,428,1,0,0,0,432,433,1,0,0,0,433,55,1,0,0,0,434,
	435,5,16,0,0,435,436,5,4,0,0,436,437,3,8,4,0,437,438,5,5,0,0,438,441,1,
	0,0,0,439,441,3,8,4,0,440,434,1,0,0,0,440,439,1,0,0,0,441,442,1,0,0,0,442,
	443,5,6,0,0,443,448,3,58,29,0,444,445,5,59,0,0,445,447,3,58,29,0,446,444,
	1,0,0,0,447,450,1,0,0,0,448,446,1,0,0,0,448,449,1,0,0,0,449,451,1,0,0,0,
	450,448,1,0,0,0,451,452,5,7,0,0,452,57,1,0,0,0,453,454,6,29,-1,0,454,455,
	3,8,4,0,455,456,5,68,0,0,456,562,1,0,0,0,457,458,3,8,4,0,458,459,7,2,0,
	0,459,460,5,67,0,0,460,562,1,0,0,0,461,462,3,8,4,0,462,463,5,53,0,0,463,
	464,5,4,0,0,464,465,3,58,29,0,465,466,5,5,0,0,466,467,5,67,0,0,467,562,
	1,0,0,0,468,562,5,22,0,0,469,470,5,21,0,0,470,471,5,4,0,0,471,472,3,58,
	29,0,472,473,5,5,0,0,473,562,1,0,0,0,474,475,5,63,0,0,475,480,3,52,26,0,
	476,477,5,66,0,0,477,479,3,52,26,0,478,476,1,0,0,0,479,482,1,0,0,0,480,
	478,1,0,0,0,480,481,1,0,0,0,481,483,1,0,0,0,482,480,1,0,0,0,483,484,5,64,
	0,0,484,562,1,0,0,0,485,562,3,28,14,0,486,562,3,30,15,0,487,562,3,32,16,
	0,488,562,3,34,17,0,489,562,3,36,18,0,490,492,5,27,0,0,491,490,1,0,0,0,
	491,492,1,0,0,0,492,493,1,0,0,0,493,494,5,42,0,0,494,495,5,6,0,0,495,496,
	3,58,29,0,496,497,5,7,0,0,497,562,1,0,0,0,498,500,5,27,0,0,499,498,1,0,
	0,0,499,500,1,0,0,0,500,501,1,0,0,0,501,502,5,43,0,0,502,503,5,6,0,0,503,
	504,3,58,29,0,504,505,5,7,0,0,505,562,1,0,0,0,506,507,5,44,0,0,507,508,
	5,4,0,0,508,509,3,58,29,0,509,510,5,5,0,0,510,511,5,6,0,0,511,512,3,58,
	29,0,512,513,5,7,0,0,513,562,1,0,0,0,514,515,7,6,0,0,515,516,5,6,0,0,516,
	517,3,58,29,0,517,518,5,7,0,0,518,562,1,0,0,0,519,520,5,9,0,0,520,521,3,
	58,29,0,521,522,5,9,0,0,522,562,1,0,0,0,523,524,5,8,0,0,524,525,3,58,29,
	0,525,526,5,8,0,0,526,562,1,0,0,0,527,562,3,12,6,0,528,562,3,10,5,0,529,
	530,5,52,0,0,530,562,3,58,29,29,531,532,5,17,0,0,532,533,5,4,0,0,533,534,
	3,58,29,0,534,535,5,5,0,0,535,536,5,4,0,0,536,537,3,58,29,0,537,538,5,5,
	0,0,538,562,1,0,0,0,539,562,5,18,0,0,540,562,3,8,4,0,541,562,3,54,27,0,
	542,562,3,56,28,0,543,562,5,11,0,0,544,545,5,6,0,0,545,546,3,58,29,0,546,
	547,5,7,0,0,547,562,1,0,0,0,548,549,3,10,5,0,549,550,3,58,29,11,550,562,
	1,0,0,0,551,552,3,12,6,0,552,553,3,58,29,10,553,562,1,0,0,0,554,555,5,11,
	0,0,555,562,3,58,29,9,556,559,5,25,0,0,557,558,5,4,0,0,558,560,5,5,0,0,
	559,557,1,0,0,0,559,560,1,0,0,0,560,562,1,0,0,0,561,453,1,0,0,0,561,457,
	1,0,0,0,561,461,1,0,0,0,561,468,1,0,0,0,561,469,1,0,0,0,561,474,1,0,0,0,
	561,485,1,0,0,0,561,486,1,0,0,0,561,487,1,0,0,0,561,488,1,0,0,0,561,489,
	1,0,0,0,561,491,1,0,0,0,561,499,1,0,0,0,561,506,1,0,0,0,561,514,1,0,0,0,
	561,519,1,0,0,0,561,523,1,0,0,0,561,527,1,0,0,0,561,528,1,0,0,0,561,529,
	1,0,0,0,561,531,1,0,0,0,561,539,1,0,0,0,561,540,1,0,0,0,561,541,1,0,0,0,
	561,542,1,0,0,0,561,543,1,0,0,0,561,544,1,0,0,0,561,548,1,0,0,0,561,551,
	1,0,0,0,561,554,1,0,0,0,561,556,1,0,0,0,562,625,1,0,0,0,563,564,10,28,0,
	0,564,565,5,20,0,0,565,624,3,58,29,29,566,567,10,27,0,0,567,568,5,19,0,
	0,568,624,3,58,29,28,569,570,10,24,0,0,570,571,5,52,0,0,571,624,3,58,29,
	25,572,573,10,23,0,0,573,574,5,51,0,0,574,624,3,58,29,24,575,576,10,49,
	0,0,576,624,7,2,0,0,577,578,10,48,0,0,578,579,5,53,0,0,579,580,5,4,0,0,
	580,581,3,58,29,0,581,582,5,5,0,0,582,624,1,0,0,0,583,584,10,47,0,0,584,
	585,5,10,0,0,585,586,5,4,0,0,586,587,3,58,29,0,587,588,5,59,0,0,588,589,
	3,58,29,0,589,590,5,5,0,0,590,624,1,0,0,0,591,592,10,46,0,0,592,624,5,26,
	0,0,593,594,10,17,0,0,594,595,5,10,0,0,595,596,5,4,0,0,596,624,5,5,0,0,
	597,598,10,16,0,0,598,599,5,53,0,0,599,600,5,4,0,0,600,624,5,5,0,0,601,
	602,10,15,0,0,602,624,3,8,4,0,603,604,10,14,0,0,604,624,3,10,5,0,605,606,
	10,13,0,0,606,624,3,12,6,0,607,608,10,12,0,0,608,624,5,11,0,0,609,610,10,
	8,0,0,610,624,3,54,27,0,611,612,10,7,0,0,612,624,3,56,28,0,613,614,10,6,
	0,0,614,624,3,28,14,0,615,616,10,5,0,0,616,624,3,30,15,0,617,618,10,4,0,
	0,618,624,3,32,16,0,619,620,10,3,0,0,620,624,3,34,17,0,621,622,10,2,0,0,
	622,624,3,36,18,0,623,563,1,0,0,0,623,566,1,0,0,0,623,569,1,0,0,0,623,572,
	1,0,0,0,623,575,1,0,0,0,623,577,1,0,0,0,623,583,1,0,0,0,623,591,1,0,0,0,
	623,593,1,0,0,0,623,597,1,0,0,0,623,601,1,0,0,0,623,603,1,0,0,0,623,605,
	1,0,0,0,623,607,1,0,0,0,623,609,1,0,0,0,623,611,1,0,0,0,623,613,1,0,0,0,
	623,615,1,0,0,0,623,617,1,0,0,0,623,619,1,0,0,0,623,621,1,0,0,0,624,627,
	1,0,0,0,625,623,1,0,0,0,625,626,1,0,0,0,626,59,1,0,0,0,627,625,1,0,0,0,
	628,629,7,7,0,0,629,630,3,66,33,0,630,631,7,8,0,0,631,61,1,0,0,0,632,633,
	7,7,0,0,633,634,7,9,0,0,634,635,7,10,0,0,635,636,7,9,0,0,636,637,7,8,0,
	0,637,63,1,0,0,0,638,639,5,76,0,0,639,640,5,86,0,0,640,641,7,9,0,0,641,
	642,5,87,0,0,642,643,5,86,0,0,643,644,5,89,0,0,644,647,5,87,0,0,645,647,
	5,77,0,0,646,638,1,0,0,0,646,645,1,0,0,0,647,65,1,0,0,0,648,649,6,33,-1,
	0,649,650,5,80,0,0,650,651,5,86,0,0,651,652,3,58,29,0,652,653,5,87,0,0,
	653,671,1,0,0,0,654,655,5,76,0,0,655,658,5,86,0,0,656,659,3,66,33,0,657,
	659,5,88,0,0,658,656,1,0,0,0,658,657,1,0,0,0,659,660,1,0,0,0,660,661,5,
	87,0,0,661,662,5,86,0,0,662,663,3,66,33,0,663,664,5,87,0,0,664,671,1,0,
	0,0,665,671,5,83,0,0,666,667,5,84,0,0,667,668,3,66,33,0,668,669,5,85,0,
	0,669,671,1,0,0,0,670,648,1,0,0,0,670,654,1,0,0,0,670,665,1,0,0,0,670,666,
	1,0,0,0,671,694,1,0,0,0,672,673,10,4,0,0,673,674,5,78,0,0,674,693,3,66,
	33,5,675,676,10,9,0,0,676,677,5,82,0,0,677,693,5,89,0,0,678,679,10,8,0,
	0,679,680,5,82,0,0,680,681,5,86,0,0,681,682,5,89,0,0,682,693,5,87,0,0,683,
	684,10,7,0,0,684,685,5,82,0,0,685,693,3,64,32,0,686,687,10,6,0,0,687,688,
	5,82,0,0,688,689,5,86,0,0,689,690,3,64,32,0,690,691,5,87,0,0,691,693,1,
	0,0,0,692,672,1,0,0,0,692,675,1,0,0,0,692,678,1,0,0,0,692,683,1,0,0,0,692,
	686,1,0,0,0,693,696,1,0,0,0,694,692,1,0,0,0,694,695,1,0,0,0,695,67,1,0,
	0,0,696,694,1,0,0,0,51,85,99,102,115,127,135,148,153,160,165,170,179,189,
	194,199,207,217,229,243,254,266,274,285,299,309,327,335,345,356,373,377,
	384,390,397,414,424,432,440,448,480,491,499,559,561,623,625,646,658,670,
	692,694];

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
	public argument(): ArgumentContext {
		return this.getTypedRuleContext(ArgumentContext, 0) as ArgumentContext;
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
