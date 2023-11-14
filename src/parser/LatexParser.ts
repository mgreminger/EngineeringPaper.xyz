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
	public static readonly RULE_insert_matrix = 2;
	public static readonly RULE_id = 3;
	public static readonly RULE_number = 4;
	public static readonly RULE_number_with_units = 5;
	public static readonly RULE_assign = 6;
	public static readonly RULE_assign_list = 7;
	public static readonly RULE_assign_plus_query = 8;
	public static readonly RULE_query = 9;
	public static readonly RULE_equality = 10;
	public static readonly RULE_piecewise_assign = 11;
	public static readonly RULE_piecewise_arg = 12;
	public static readonly RULE_trig_function = 13;
	public static readonly RULE_indefinite_integral_cmd = 14;
	public static readonly RULE_integral_cmd = 15;
	public static readonly RULE_derivative_cmd = 16;
	public static readonly RULE_n_derivative_cmd = 17;
	public static readonly RULE_argument = 18;
	public static readonly RULE_condition = 19;
	public static readonly RULE_id_list = 20;
	public static readonly RULE_guess = 21;
	public static readonly RULE_guess_list = 22;
	public static readonly RULE_condition_single = 23;
	public static readonly RULE_condition_chain = 24;
	public static readonly RULE_matrix_row = 25;
	public static readonly RULE_user_function = 26;
	public static readonly RULE_builtin_function = 27;
	public static readonly RULE_expr = 28;
	public static readonly RULE_u_block = 29;
	public static readonly RULE_u_insert_matrix = 30;
	public static readonly RULE_u_fraction = 31;
	public static readonly RULE_u_expr = 32;
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
                                                            "'1'" ];
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
		"statement", "scatter_plot_query", "insert_matrix", "id", "number", "number_with_units", 
		"assign", "assign_list", "assign_plus_query", "query", "equality", "piecewise_assign", 
		"piecewise_arg", "trig_function", "indefinite_integral_cmd", "integral_cmd", 
		"derivative_cmd", "n_derivative_cmd", "argument", "condition", "id_list", 
		"guess", "guess_list", "condition_single", "condition_chain", "matrix_row", 
		"user_function", "builtin_function", "expr", "u_block", "u_insert_matrix", 
		"u_fraction", "u_expr",
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
			this.state = 82;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 66;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 67;
				this.assign_list();
				}
				break;
			case 3:
				{
				this.state = 68;
				this.assign_plus_query();
				}
				break;
			case 4:
				{
				this.state = 69;
				this.query();
				}
				break;
			case 5:
				{
				this.state = 70;
				this.equality();
				}
				break;
			case 6:
				{
				this.state = 71;
				this.u_block();
				}
				break;
			case 7:
				{
				this.state = 72;
				this.number_();
				}
				break;
			case 8:
				{
				this.state = 73;
				this.id();
				}
				break;
			case 9:
				{
				this.state = 74;
				this.id_list();
				}
				break;
			case 10:
				{
				this.state = 75;
				this.guess();
				}
				break;
			case 11:
				{
				this.state = 76;
				this.guess_list();
				}
				break;
			case 12:
				{
				this.state = 77;
				this.expr(0);
				}
				break;
			case 13:
				{
				this.state = 78;
				this.condition();
				}
				break;
			case 14:
				{
				this.state = 79;
				this.piecewise_assign();
				}
				break;
			case 15:
				{
				this.state = 80;
				this.insert_matrix();
				}
				break;
			case 16:
				{
				this.state = 81;
				this.scatter_plot_query();
				}
				break;
			}
			this.state = 84;
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
			this.state = 96;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				{
				this.state = 86;
				this.match(LatexParser.L_PAREN);
				this.state = 87;
				this.expr(0);
				this.state = 88;
				this.match(LatexParser.COMMA);
				this.state = 89;
				this.expr(0);
				this.state = 90;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 2:
				{
				{
				this.state = 92;
				this.expr(0);
				this.state = 93;
				this.match(LatexParser.COMMA);
				this.state = 94;
				this.expr(0);
				}
				}
				break;
			}
			this.state = 99;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===28) {
				{
				this.state = 98;
				this.match(LatexParser.AS_LINES);
				}
			}

			this.state = 101;
			this.match(LatexParser.EQ);
			this.state = 112;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				{
				{
				this.state = 102;
				this.match(LatexParser.L_PAREN);
				this.state = 103;
				this.u_block();
				this.state = 104;
				this.match(LatexParser.COMMA);
				this.state = 105;
				this.u_block();
				this.state = 106;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 1:
			case 2:
				{
				{
				this.state = 108;
				this.u_block();
				this.state = 109;
				this.match(LatexParser.COMMA);
				this.state = 110;
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
		this.enterRule(localctx, 4, LatexParser.RULE_insert_matrix);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 117;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 114;
					this.matchWildcard();
					}
					}
				}
				this.state = 119;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			}
			this.state = 127;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 120;
				this.u_insert_matrix();
				this.state = 124;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 121;
						this.matchWildcard();
						}
						}
					}
					this.state = 126;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				}
				}
				}
				this.state = 129;
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
		this.enterRule(localctx, 6, LatexParser.RULE_id);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 131;
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
		this.enterRule(localctx, 8, LatexParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 134;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===52) {
				{
				this.state = 133;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 136;
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
		this.enterRule(localctx, 10, LatexParser.RULE_number_with_units);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 138;
			this.number_();
			this.state = 139;
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
		this.enterRule(localctx, 12, LatexParser.RULE_assign);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 143;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 69:
				{
				this.state = 141;
				this.id();
				}
				break;
			case 11:
				{
				this.state = 142;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 145;
			this.match(LatexParser.EQ);
			this.state = 146;
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
		this.enterRule(localctx, 14, LatexParser.RULE_assign_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 148;
			this.assign();
			this.state = 151;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 149;
				this.match(LatexParser.COMMA);
				this.state = 150;
				this.assign();
				}
				}
				this.state = 153;
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
		this.enterRule(localctx, 16, LatexParser.RULE_assign_plus_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 155;
			this.assign();
			this.state = 156;
			this.match(LatexParser.EQ);
			this.state = 158;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 157;
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
		this.enterRule(localctx, 18, LatexParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 160;
			this.expr(0);
			this.state = 161;
			this.match(LatexParser.EQ);
			this.state = 163;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 162;
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
		this.enterRule(localctx, 20, LatexParser.RULE_equality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 165;
			this.expr(0);
			this.state = 166;
			this.match(LatexParser.EQ);
			this.state = 167;
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
		this.enterRule(localctx, 22, LatexParser.RULE_piecewise_assign);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 171;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 69:
				{
				this.state = 169;
				this.id();
				}
				break;
			case 11:
				{
				this.state = 170;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 173;
			this.match(LatexParser.EQ);
			this.state = 174;
			this.id();
			this.state = 175;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 176;
			this.piecewise_arg();
			this.state = 181;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===59) {
				{
				{
				this.state = 177;
				this.match(LatexParser.COMMA);
				this.state = 178;
				this.piecewise_arg();
				}
				}
				this.state = 183;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 184;
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
		this.enterRule(localctx, 24, LatexParser.RULE_piecewise_arg);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			this.match(LatexParser.L_PAREN);
			this.state = 187;
			this.expr(0);
			this.state = 188;
			this.match(LatexParser.COMMA);
			this.state = 189;
			this.condition();
			this.state = 190;
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
		this.enterRule(localctx, 26, LatexParser.RULE_trig_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 193;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 192;
				this.match(LatexParser.BACKSLASH);
				}
			}

			this.state = 195;
			_la = this._input.LA(1);
			if(!(((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 196;
			this.match(LatexParser.L_PAREN);
			this.state = 197;
			this.expr(0);
			this.state = 198;
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
		this.enterRule(localctx, 28, LatexParser.RULE_indefinite_integral_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 207;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				this.state = 200;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 13:
				{
				{
				this.state = 201;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 202;
				this.match(LatexParser.L_BRACE);
				this.state = 203;
				this.match(LatexParser.R_BRACE);
				this.state = 204;
				this.match(LatexParser.CARET);
				this.state = 205;
				this.match(LatexParser.L_BRACE);
				this.state = 206;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 209;
			this.match(LatexParser.L_PAREN);
			this.state = 210;
			this.expr(0);
			this.state = 211;
			this.match(LatexParser.R_PAREN);
			this.state = 218;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 212;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 213;
				this.match(LatexParser.L_BRACE);
				this.state = 214;
				this.id();
				this.state = 215;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 217;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 220;
			this.match(LatexParser.L_PAREN);
			this.state = 221;
			this.id();
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
	public integral_cmd(): Integral_cmdContext {
		let localctx: Integral_cmdContext = new Integral_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, LatexParser.RULE_integral_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 230;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				{
				this.state = 224;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 225;
				this.match(LatexParser.L_BRACE);
				this.state = 226;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 227;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 14:
			case 15:
				{
				this.state = 229;
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
			this.state = 238;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 53:
				{
				{
				this.state = 232;
				this.match(LatexParser.CARET);
				this.state = 233;
				this.match(LatexParser.L_BRACE);
				this.state = 234;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 235;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 60:
			case 61:
				{
				this.state = 237;
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
			this.state = 240;
			this.match(LatexParser.L_PAREN);
			this.state = 241;
			localctx._integrand_expr = this.expr(0);
			this.state = 242;
			this.match(LatexParser.R_PAREN);
			this.state = 249;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 243;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 244;
				this.match(LatexParser.L_BRACE);
				this.state = 245;
				this.id();
				this.state = 246;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 248;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 251;
			this.match(LatexParser.L_PAREN);
			this.state = 252;
			this.id();
			this.state = 253;
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
		this.enterRule(localctx, 32, LatexParser.RULE_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 255;
			this.match(LatexParser.CMD_FRAC);
			this.state = 256;
			this.match(LatexParser.L_BRACE);
			this.state = 263;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 257;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 258;
				this.match(LatexParser.L_BRACE);
				this.state = 259;
				this.id();
				this.state = 260;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 262;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 265;
			this.match(LatexParser.R_BRACE);
			this.state = 266;
			this.match(LatexParser.L_BRACE);
			this.state = 273;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 267;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 268;
				this.match(LatexParser.L_BRACE);
				this.state = 269;
				this.id();
				this.state = 270;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 272;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 275;
			this.match(LatexParser.L_PAREN);
			this.state = 276;
			this.id();
			this.state = 277;
			this.match(LatexParser.R_PAREN);
			this.state = 278;
			this.match(LatexParser.R_BRACE);
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
	public n_derivative_cmd(): N_derivative_cmdContext {
		let localctx: N_derivative_cmdContext = new N_derivative_cmdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, LatexParser.RULE_n_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 283;
			this.match(LatexParser.CMD_FRAC);
			this.state = 284;
			this.match(LatexParser.L_BRACE);
			this.state = 291;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 285;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 286;
				this.match(LatexParser.L_BRACE);
				this.state = 287;
				this.id();
				this.state = 288;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 290;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 299;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 53:
				{
				{
				this.state = 293;
				this.match(LatexParser.CARET);
				this.state = 294;
				this.match(LatexParser.L_BRACE);
				this.state = 295;
				this.number_();
				this.state = 296;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 60:
				{
				this.state = 298;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
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
			this.state = 320;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 53:
				{
				{
				this.state = 314;
				this.match(LatexParser.CARET);
				this.state = 315;
				this.match(LatexParser.L_BRACE);
				this.state = 316;
				this.number_();
				this.state = 317;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 60:
				{
				this.state = 319;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 322;
			this.match(LatexParser.R_BRACE);
			this.state = 323;
			this.match(LatexParser.L_PAREN);
			this.state = 324;
			this.expr(0);
			this.state = 325;
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
		this.enterRule(localctx, 36, LatexParser.RULE_argument);
		let _la: number;
		try {
			this.state = 337;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 327;
				this.id();
				this.state = 328;
				this.match(LatexParser.EQ);
				this.state = 329;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 331;
				this.expr(0);
				this.state = 332;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===55 || _la===57)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 333;
				this.id();
				this.state = 334;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===55 || _la===57)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 335;
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
		this.enterRule(localctx, 38, LatexParser.RULE_condition);
		try {
			this.state = 341;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 339;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 340;
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
		this.enterRule(localctx, 40, LatexParser.RULE_id_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 343;
			this.id();
			this.state = 346;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 344;
				this.match(LatexParser.COMMA);
				this.state = 345;
				this.id();
				}
				}
				this.state = 348;
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
		this.enterRule(localctx, 42, LatexParser.RULE_guess);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 350;
			this.id();
			this.state = 351;
			_la = this._input.LA(1);
			if(!(_la===23 || _la===24)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 354;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				{
				this.state = 352;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 353;
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
		this.enterRule(localctx, 44, LatexParser.RULE_guess_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 356;
			this.guess();
			this.state = 359;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 357;
				this.match(LatexParser.COMMA);
				this.state = 358;
				this.guess();
				}
				}
				this.state = 361;
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
		this.enterRule(localctx, 46, LatexParser.RULE_condition_single);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 363;
			this.expr(0);
			this.state = 364;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 365;
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
		this.enterRule(localctx, 48, LatexParser.RULE_condition_chain);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 367;
			this.expr(0);
			this.state = 368;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 369;
			this.expr(0);
			this.state = 370;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 15) !== 0))) {
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
		this.enterRule(localctx, 50, LatexParser.RULE_matrix_row);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 373;
			this.expr(0);
			this.state = 378;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===65) {
				{
				{
				this.state = 374;
				this.match(LatexParser.AMPERSAND);
				this.state = 375;
				this.expr(0);
				}
				}
				this.state = 380;
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
		this.enterRule(localctx, 52, LatexParser.RULE_user_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 381;
			this.id();
			this.state = 382;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 383;
			this.argument();
			this.state = 388;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===59) {
				{
				{
				this.state = 384;
				this.match(LatexParser.COMMA);
				this.state = 385;
				this.argument();
				}
				}
				this.state = 390;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 391;
			this.match(LatexParser.R_PAREN);
			this.state = 396;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				this.state = 392;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 393;
				localctx._num_points = this.number_();
				this.state = 394;
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
		this.enterRule(localctx, 54, LatexParser.RULE_builtin_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 404;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 398;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 399;
				this.match(LatexParser.L_BRACE);
				this.state = 400;
				this.id();
				this.state = 401;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 69:
				{
				this.state = 403;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 406;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 407;
			this.expr(0);
			this.state = 412;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===59) {
				{
				{
				this.state = 408;
				this.match(LatexParser.COMMA);
				this.state = 409;
				this.expr(0);
				}
				}
				this.state = 414;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 415;
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
		let _startState: number = 56;
		this.enterRecursionRule(localctx, 56, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 525;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 418;
				this.id();
				this.state = 419;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 421;
				this.id();
				this.state = 422;
				_la = this._input.LA(1);
				if(!(_la===60 || _la===61)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 423;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 425;
				this.id();
				this.state = 426;
				this.match(LatexParser.CARET);
				this.state = 427;
				this.match(LatexParser.L_BRACE);
				this.state = 428;
				this.expr(0);
				this.state = 429;
				this.match(LatexParser.R_BRACE);
				this.state = 430;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 432;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 433;
				this.match(LatexParser.CMD_SQRT);
				this.state = 434;
				this.match(LatexParser.L_BRACE);
				this.state = 435;
				this.expr(0);
				this.state = 436;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new MatrixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 438;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 439;
				this.matrix_row();
				this.state = 444;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===66) {
					{
					{
					this.state = 440;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 441;
					this.matrix_row();
					}
					}
					this.state = 446;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 447;
				this.match(LatexParser.END_MATRIX);
				}
				break;
			case 7:
				{
				localctx = new TrigFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 449;
				this.trig_function();
				}
				break;
			case 8:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 450;
				this.indefinite_integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 451;
				this.integral_cmd();
				}
				break;
			case 10:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 452;
				this.derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 453;
				this.n_derivative_cmd();
				}
				break;
			case 12:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 455;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===27) {
					{
					this.state = 454;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 457;
				this.match(LatexParser.CMD_LN);
				this.state = 458;
				this.match(LatexParser.L_PAREN);
				this.state = 459;
				this.expr(0);
				this.state = 460;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 13:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 463;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===27) {
					{
					this.state = 462;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 465;
				this.match(LatexParser.CMD_LOG);
				this.state = 466;
				this.match(LatexParser.L_PAREN);
				this.state = 467;
				this.expr(0);
				this.state = 468;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 470;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 471;
				this.match(LatexParser.L_BRACE);
				this.state = 472;
				this.expr(0);
				this.state = 473;
				this.match(LatexParser.R_BRACE);
				this.state = 474;
				this.match(LatexParser.L_PAREN);
				this.state = 475;
				this.expr(0);
				this.state = 476;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 478;
				_la = this._input.LA(1);
				if(!(_la===45 || _la===46)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 479;
				this.match(LatexParser.L_PAREN);
				this.state = 480;
				this.expr(0);
				this.state = 481;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 16:
				{
				localctx = new NormContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 483;
				this.match(LatexParser.DOUBLE_VBAR);
				this.state = 484;
				this.expr(0);
				this.state = 485;
				this.match(LatexParser.DOUBLE_VBAR);
				}
				break;
			case 17:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 487;
				this.match(LatexParser.VBAR);
				this.state = 488;
				this.expr(0);
				this.state = 489;
				this.match(LatexParser.VBAR);
				}
				break;
			case 18:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 491;
				this.number_with_units();
				}
				break;
			case 19:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 492;
				this.number_();
				}
				break;
			case 20:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 493;
				this.match(LatexParser.SUB);
				this.state = 494;
				this.expr(29);
				}
				break;
			case 21:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 495;
				this.match(LatexParser.CMD_FRAC);
				this.state = 496;
				this.match(LatexParser.L_BRACE);
				this.state = 497;
				this.expr(0);
				this.state = 498;
				this.match(LatexParser.R_BRACE);
				this.state = 499;
				this.match(LatexParser.L_BRACE);
				this.state = 500;
				this.expr(0);
				this.state = 501;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 22:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 503;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 23:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 504;
				this.id();
				}
				break;
			case 24:
				{
				localctx = new UserFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 505;
				this.user_function();
				}
				break;
			case 25:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 506;
				this.builtin_function();
				}
				break;
			case 26:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 507;
				this.match(LatexParser.PI);
				}
				break;
			case 27:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 508;
				this.match(LatexParser.L_PAREN);
				this.state = 509;
				this.expr(0);
				this.state = 510;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 28:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 512;
				this.number_();
				this.state = 513;
				this.expr(11);
				}
				break;
			case 29:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 515;
				this.number_with_units();
				this.state = 516;
				this.expr(10);
				}
				break;
			case 30:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 518;
				this.match(LatexParser.PI);
				this.state = 519;
				this.expr(9);
				}
				break;
			case 31:
				{
				localctx = new EmptyPlaceholderContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 520;
				this.match(LatexParser.CMD_PLACEHOLDER);
				this.state = 523;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
				case 1:
					{
					this.state = 521;
					this.match(LatexParser.L_BRACE);
					this.state = 522;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 589;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 42, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 587;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
					case 1:
						{
						localctx = new MatrixMultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 527;
						if (!(this.precpred(this._ctx, 28))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 28)");
						}
						this.state = 528;
						this.match(LatexParser.CMD_TIMES);
						this.state = 529;
						this.expr(29);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 530;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 531;
						this.match(LatexParser.CMD_CDOT);
						this.state = 532;
						this.expr(28);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 533;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 534;
						this.match(LatexParser.SUB);
						this.state = 535;
						this.expr(25);
						}
						break;
					case 4:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 536;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 537;
						this.match(LatexParser.ADD);
						this.state = 538;
						this.expr(24);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 539;
						if (!(this.precpred(this._ctx, 49))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 49)");
						}
						this.state = 540;
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
						this.state = 541;
						if (!(this.precpred(this._ctx, 48))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 48)");
						}
						this.state = 542;
						this.match(LatexParser.CARET);
						this.state = 543;
						this.match(LatexParser.L_BRACE);
						this.state = 544;
						this.expr(0);
						this.state = 545;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 7:
						{
						localctx = new IndexContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 547;
						if (!(this.precpred(this._ctx, 47))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 47)");
						}
						this.state = 548;
						this.match(LatexParser.UNDERSCORE);
						this.state = 549;
						this.match(LatexParser.L_BRACE);
						this.state = 550;
						this.expr(0);
						this.state = 551;
						this.match(LatexParser.COMMA);
						this.state = 552;
						this.expr(0);
						this.state = 553;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 8:
						{
						localctx = new TransposeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 555;
						if (!(this.precpred(this._ctx, 46))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 46)");
						}
						this.state = 556;
						this.match(LatexParser.TRANSPOSE);
						}
						break;
					case 9:
						{
						localctx = new EmptySubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 557;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 558;
						this.match(LatexParser.UNDERSCORE);
						this.state = 559;
						this.match(LatexParser.L_BRACE);
						this.state = 560;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 10:
						{
						localctx = new EmptySuperscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 561;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 562;
						this.match(LatexParser.CARET);
						this.state = 563;
						this.match(LatexParser.L_BRACE);
						this.state = 564;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 11:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 565;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 566;
						this.id();
						}
						break;
					case 12:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 567;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 568;
						this.number_();
						}
						break;
					case 13:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 569;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 570;
						this.number_with_units();
						}
						break;
					case 14:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 571;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 572;
						this.match(LatexParser.PI);
						}
						break;
					case 15:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 573;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 574;
						this.user_function();
						}
						break;
					case 16:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 575;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 576;
						this.builtin_function();
						}
						break;
					case 17:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 577;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 578;
						this.trig_function();
						}
						break;
					case 18:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 579;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 580;
						this.indefinite_integral_cmd();
						}
						break;
					case 19:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 581;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 582;
						this.integral_cmd();
						}
						break;
					case 20:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 583;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 584;
						this.derivative_cmd();
						}
						break;
					case 21:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 585;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 586;
						this.n_derivative_cmd();
						}
						break;
					}
					}
				}
				this.state = 591;
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
	// @RuleVersion(0)
	public u_block(): U_blockContext {
		let localctx: U_blockContext = new U_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, LatexParser.RULE_u_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 592;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 593;
			this.u_expr(0);
			this.state = 594;
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
		this.enterRule(localctx, 60, LatexParser.RULE_u_insert_matrix);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 596;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 597;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===88 || _la===89)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 598;
			_la = this._input.LA(1);
			if(!(_la===79 || _la===81)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 599;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===88 || _la===89)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 600;
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
		this.enterRule(localctx, 62, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.state = 610;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 76:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 602;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 603;
				this.match(LatexParser.U_L_BRACE);
				this.state = 604;
				_la = this._input.LA(1);
				if(!(_la===88 || _la===89)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 605;
				this.match(LatexParser.U_R_BRACE);
				this.state = 606;
				this.match(LatexParser.U_L_BRACE);
				this.state = 607;
				this.match(LatexParser.U_NUMBER);
				this.state = 608;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 77:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 609;
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
		let _startState: number = 64;
		this.enterRecursionRule(localctx, 64, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 634;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 80:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 613;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 614;
				this.match(LatexParser.U_L_BRACE);
				this.state = 615;
				this.expr(0);
				this.state = 616;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 76:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 618;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 619;
				this.match(LatexParser.U_L_BRACE);
				this.state = 622;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 76:
				case 80:
				case 83:
				case 84:
					{
					this.state = 620;
					this.u_expr(0);
					}
					break;
				case 88:
					{
					this.state = 621;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 624;
				this.match(LatexParser.U_R_BRACE);
				this.state = 625;
				this.match(LatexParser.U_L_BRACE);
				this.state = 626;
				this.u_expr(0);
				this.state = 627;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 83:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 629;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 84:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 630;
				this.match(LatexParser.U_L_PAREN);
				this.state = 631;
				this.u_expr(0);
				this.state = 632;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 658;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 656;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 46, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 636;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 637;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 638;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 639;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 640;
						this.match(LatexParser.U_CARET);
						this.state = 641;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 642;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 643;
						this.match(LatexParser.U_CARET);
						this.state = 644;
						this.match(LatexParser.U_L_BRACE);
						this.state = 645;
						this.match(LatexParser.U_NUMBER);
						this.state = 646;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 647;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 648;
						this.match(LatexParser.U_CARET);
						this.state = 649;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 650;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 651;
						this.match(LatexParser.U_CARET);
						this.state = 652;
						this.match(LatexParser.U_L_BRACE);
						this.state = 653;
						this.u_fraction();
						this.state = 654;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 660;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
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
		case 28:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 32:
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

	public static readonly _serializedATN: number[] = [4,1,94,662,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,3,0,83,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,97,8,1,
	1,1,3,1,100,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,113,8,1,
	1,2,5,2,116,8,2,10,2,12,2,119,9,2,1,2,1,2,5,2,123,8,2,10,2,12,2,126,9,2,
	4,2,128,8,2,11,2,12,2,129,1,3,1,3,1,4,3,4,135,8,4,1,4,1,4,1,5,1,5,1,5,1,
	6,1,6,3,6,144,8,6,1,6,1,6,1,6,1,7,1,7,1,7,4,7,152,8,7,11,7,12,7,153,1,8,
	1,8,1,8,3,8,159,8,8,1,9,1,9,1,9,3,9,164,8,9,1,10,1,10,1,10,1,10,1,11,1,
	11,3,11,172,8,11,1,11,1,11,1,11,1,11,1,11,1,11,5,11,180,8,11,10,11,12,11,
	183,9,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,13,3,13,194,8,13,1,13,
	1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,208,8,14,1,
	14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,219,8,14,1,14,1,14,1,14,
	1,14,1,15,1,15,1,15,1,15,1,15,1,15,3,15,231,8,15,1,15,1,15,1,15,1,15,1,
	15,1,15,3,15,239,8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,
	250,8,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,3,
	16,264,8,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,274,8,16,1,16,
	1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,
	17,3,17,292,8,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,300,8,17,1,17,1,17,
	1,17,1,17,1,17,1,17,1,17,1,17,3,17,310,8,17,1,17,1,17,1,17,1,17,1,17,1,
	17,1,17,1,17,1,17,3,17,321,8,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,
	1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,338,8,18,1,19,1,19,3,19,342,8,19,
	1,20,1,20,1,20,4,20,347,8,20,11,20,12,20,348,1,21,1,21,1,21,1,21,3,21,355,
	8,21,1,22,1,22,1,22,4,22,360,8,22,11,22,12,22,361,1,23,1,23,1,23,1,23,1,
	24,1,24,1,24,1,24,1,24,1,24,1,25,1,25,1,25,5,25,377,8,25,10,25,12,25,380,
	9,25,1,26,1,26,1,26,1,26,1,26,5,26,387,8,26,10,26,12,26,390,9,26,1,26,1,
	26,1,26,1,26,1,26,3,26,397,8,26,1,27,1,27,1,27,1,27,1,27,1,27,3,27,405,
	8,27,1,27,1,27,1,27,1,27,5,27,411,8,27,10,27,12,27,414,9,27,1,27,1,27,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,5,28,443,8,28,10,28,12,
	28,446,9,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,3,28,456,8,28,1,28,
	1,28,1,28,1,28,1,28,1,28,3,28,464,8,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,3,28,524,8,28,3,28,526,8,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,5,28,588,8,28,10,28,12,28,591,9,28,1,29,1,29,1,29,1,29,1,30,1,30,1,
	30,1,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,611,8,31,
	1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,623,8,32,1,32,1,
	32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,635,8,32,1,32,1,32,1,32,
	1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,
	32,1,32,1,32,5,32,657,8,32,10,32,12,32,660,9,32,1,32,2,117,124,2,56,64,
	33,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,
	50,52,54,56,58,60,62,64,0,11,1,0,29,41,1,0,14,15,1,0,60,61,2,0,55,55,57,
	57,1,0,23,24,1,0,55,58,1,0,45,46,1,0,1,2,1,0,74,75,1,0,88,89,2,0,79,79,
	81,81,745,0,82,1,0,0,0,2,96,1,0,0,0,4,117,1,0,0,0,6,131,1,0,0,0,8,134,1,
	0,0,0,10,138,1,0,0,0,12,143,1,0,0,0,14,148,1,0,0,0,16,155,1,0,0,0,18,160,
	1,0,0,0,20,165,1,0,0,0,22,171,1,0,0,0,24,186,1,0,0,0,26,193,1,0,0,0,28,
	207,1,0,0,0,30,230,1,0,0,0,32,255,1,0,0,0,34,283,1,0,0,0,36,337,1,0,0,0,
	38,341,1,0,0,0,40,343,1,0,0,0,42,350,1,0,0,0,44,356,1,0,0,0,46,363,1,0,
	0,0,48,367,1,0,0,0,50,373,1,0,0,0,52,381,1,0,0,0,54,404,1,0,0,0,56,525,
	1,0,0,0,58,592,1,0,0,0,60,596,1,0,0,0,62,610,1,0,0,0,64,634,1,0,0,0,66,
	83,3,12,6,0,67,83,3,14,7,0,68,83,3,16,8,0,69,83,3,18,9,0,70,83,3,20,10,
	0,71,83,3,58,29,0,72,83,3,8,4,0,73,83,3,6,3,0,74,83,3,40,20,0,75,83,3,42,
	21,0,76,83,3,44,22,0,77,83,3,56,28,0,78,83,3,38,19,0,79,83,3,22,11,0,80,
	83,3,4,2,0,81,83,3,2,1,0,82,66,1,0,0,0,82,67,1,0,0,0,82,68,1,0,0,0,82,69,
	1,0,0,0,82,70,1,0,0,0,82,71,1,0,0,0,82,72,1,0,0,0,82,73,1,0,0,0,82,74,1,
	0,0,0,82,75,1,0,0,0,82,76,1,0,0,0,82,77,1,0,0,0,82,78,1,0,0,0,82,79,1,0,
	0,0,82,80,1,0,0,0,82,81,1,0,0,0,82,83,1,0,0,0,83,84,1,0,0,0,84,85,5,0,0,
	1,85,1,1,0,0,0,86,87,5,6,0,0,87,88,3,56,28,0,88,89,5,59,0,0,89,90,3,56,
	28,0,90,91,5,7,0,0,91,97,1,0,0,0,92,93,3,56,28,0,93,94,5,59,0,0,94,95,3,
	56,28,0,95,97,1,0,0,0,96,86,1,0,0,0,96,92,1,0,0,0,97,99,1,0,0,0,98,100,
	5,28,0,0,99,98,1,0,0,0,99,100,1,0,0,0,100,101,1,0,0,0,101,112,5,54,0,0,
	102,103,5,6,0,0,103,104,3,58,29,0,104,105,5,59,0,0,105,106,3,58,29,0,106,
	107,5,7,0,0,107,113,1,0,0,0,108,109,3,58,29,0,109,110,5,59,0,0,110,111,
	3,58,29,0,111,113,1,0,0,0,112,102,1,0,0,0,112,108,1,0,0,0,112,113,1,0,0,
	0,113,3,1,0,0,0,114,116,9,0,0,0,115,114,1,0,0,0,116,119,1,0,0,0,117,118,
	1,0,0,0,117,115,1,0,0,0,118,127,1,0,0,0,119,117,1,0,0,0,120,124,3,60,30,
	0,121,123,9,0,0,0,122,121,1,0,0,0,123,126,1,0,0,0,124,125,1,0,0,0,124,122,
	1,0,0,0,125,128,1,0,0,0,126,124,1,0,0,0,127,120,1,0,0,0,128,129,1,0,0,0,
	129,127,1,0,0,0,129,130,1,0,0,0,130,5,1,0,0,0,131,132,5,69,0,0,132,7,1,
	0,0,0,133,135,5,52,0,0,134,133,1,0,0,0,134,135,1,0,0,0,135,136,1,0,0,0,
	136,137,5,62,0,0,137,9,1,0,0,0,138,139,3,8,4,0,139,140,3,58,29,0,140,11,
	1,0,0,0,141,144,3,6,3,0,142,144,5,11,0,0,143,141,1,0,0,0,143,142,1,0,0,
	0,144,145,1,0,0,0,145,146,5,54,0,0,146,147,3,56,28,0,147,13,1,0,0,0,148,
	151,3,12,6,0,149,150,5,59,0,0,150,152,3,12,6,0,151,149,1,0,0,0,152,153,
	1,0,0,0,153,151,1,0,0,0,153,154,1,0,0,0,154,15,1,0,0,0,155,156,3,12,6,0,
	156,158,5,54,0,0,157,159,3,58,29,0,158,157,1,0,0,0,158,159,1,0,0,0,159,
	17,1,0,0,0,160,161,3,56,28,0,161,163,5,54,0,0,162,164,3,58,29,0,163,162,
	1,0,0,0,163,164,1,0,0,0,164,19,1,0,0,0,165,166,3,56,28,0,166,167,5,54,0,
	0,167,168,3,56,28,0,168,21,1,0,0,0,169,172,3,6,3,0,170,172,5,11,0,0,171,
	169,1,0,0,0,171,170,1,0,0,0,172,173,1,0,0,0,173,174,5,54,0,0,174,175,3,
	6,3,0,175,176,5,6,0,0,176,181,3,24,12,0,177,178,5,59,0,0,178,180,3,24,12,
	0,179,177,1,0,0,0,180,183,1,0,0,0,181,179,1,0,0,0,181,182,1,0,0,0,182,184,
	1,0,0,0,183,181,1,0,0,0,184,185,5,7,0,0,185,23,1,0,0,0,186,187,5,6,0,0,
	187,188,3,56,28,0,188,189,5,59,0,0,189,190,3,38,19,0,190,191,5,7,0,0,191,
	25,1,0,0,0,192,194,5,27,0,0,193,192,1,0,0,0,193,194,1,0,0,0,194,195,1,0,
	0,0,195,196,7,0,0,0,196,197,5,6,0,0,197,198,3,56,28,0,198,199,5,7,0,0,199,
	27,1,0,0,0,200,208,5,12,0,0,201,202,5,13,0,0,202,203,5,4,0,0,203,204,5,
	5,0,0,204,205,5,53,0,0,205,206,5,4,0,0,206,208,5,5,0,0,207,200,1,0,0,0,
	207,201,1,0,0,0,208,209,1,0,0,0,209,210,5,6,0,0,210,211,3,56,28,0,211,218,
	5,7,0,0,212,213,5,16,0,0,213,214,5,4,0,0,214,215,3,6,3,0,215,216,5,5,0,
	0,216,219,1,0,0,0,217,219,3,6,3,0,218,212,1,0,0,0,218,217,1,0,0,0,219,220,
	1,0,0,0,220,221,5,6,0,0,221,222,3,6,3,0,222,223,5,7,0,0,223,29,1,0,0,0,
	224,225,5,13,0,0,225,226,5,4,0,0,226,227,3,56,28,0,227,228,5,5,0,0,228,
	231,1,0,0,0,229,231,7,1,0,0,230,224,1,0,0,0,230,229,1,0,0,0,231,238,1,0,
	0,0,232,233,5,53,0,0,233,234,5,4,0,0,234,235,3,56,28,0,235,236,5,5,0,0,
	236,239,1,0,0,0,237,239,7,2,0,0,238,232,1,0,0,0,238,237,1,0,0,0,239,240,
	1,0,0,0,240,241,5,6,0,0,241,242,3,56,28,0,242,249,5,7,0,0,243,244,5,16,
	0,0,244,245,5,4,0,0,245,246,3,6,3,0,246,247,5,5,0,0,247,250,1,0,0,0,248,
	250,3,6,3,0,249,243,1,0,0,0,249,248,1,0,0,0,250,251,1,0,0,0,251,252,5,6,
	0,0,252,253,3,6,3,0,253,254,5,7,0,0,254,31,1,0,0,0,255,256,5,17,0,0,256,
	263,5,4,0,0,257,258,5,16,0,0,258,259,5,4,0,0,259,260,3,6,3,0,260,261,5,
	5,0,0,261,264,1,0,0,0,262,264,3,6,3,0,263,257,1,0,0,0,263,262,1,0,0,0,264,
	265,1,0,0,0,265,266,5,5,0,0,266,273,5,4,0,0,267,268,5,16,0,0,268,269,5,
	4,0,0,269,270,3,6,3,0,270,271,5,5,0,0,271,274,1,0,0,0,272,274,3,6,3,0,273,
	267,1,0,0,0,273,272,1,0,0,0,274,275,1,0,0,0,275,276,5,6,0,0,276,277,3,6,
	3,0,277,278,5,7,0,0,278,279,5,5,0,0,279,280,5,6,0,0,280,281,3,56,28,0,281,
	282,5,7,0,0,282,33,1,0,0,0,283,284,5,17,0,0,284,291,5,4,0,0,285,286,5,16,
	0,0,286,287,5,4,0,0,287,288,3,6,3,0,288,289,5,5,0,0,289,292,1,0,0,0,290,
	292,3,6,3,0,291,285,1,0,0,0,291,290,1,0,0,0,292,299,1,0,0,0,293,294,5,53,
	0,0,294,295,5,4,0,0,295,296,3,8,4,0,296,297,5,5,0,0,297,300,1,0,0,0,298,
	300,5,60,0,0,299,293,1,0,0,0,299,298,1,0,0,0,300,301,1,0,0,0,301,302,5,
	5,0,0,302,309,5,4,0,0,303,304,5,16,0,0,304,305,5,4,0,0,305,306,3,6,3,0,
	306,307,5,5,0,0,307,310,1,0,0,0,308,310,3,6,3,0,309,303,1,0,0,0,309,308,
	1,0,0,0,310,311,1,0,0,0,311,312,5,6,0,0,312,313,3,6,3,0,313,320,5,7,0,0,
	314,315,5,53,0,0,315,316,5,4,0,0,316,317,3,8,4,0,317,318,5,5,0,0,318,321,
	1,0,0,0,319,321,5,60,0,0,320,314,1,0,0,0,320,319,1,0,0,0,321,322,1,0,0,
	0,322,323,5,5,0,0,323,324,5,6,0,0,324,325,3,56,28,0,325,326,5,7,0,0,326,
	35,1,0,0,0,327,328,3,6,3,0,328,329,5,54,0,0,329,330,3,56,28,0,330,338,1,
	0,0,0,331,332,3,56,28,0,332,333,7,3,0,0,333,334,3,6,3,0,334,335,7,3,0,0,
	335,336,3,56,28,0,336,338,1,0,0,0,337,327,1,0,0,0,337,331,1,0,0,0,338,37,
	1,0,0,0,339,342,3,46,23,0,340,342,3,48,24,0,341,339,1,0,0,0,341,340,1,0,
	0,0,342,39,1,0,0,0,343,346,3,6,3,0,344,345,5,59,0,0,345,347,3,6,3,0,346,
	344,1,0,0,0,347,348,1,0,0,0,348,346,1,0,0,0,348,349,1,0,0,0,349,41,1,0,
	0,0,350,351,3,6,3,0,351,354,7,4,0,0,352,355,3,8,4,0,353,355,3,10,5,0,354,
	352,1,0,0,0,354,353,1,0,0,0,355,43,1,0,0,0,356,359,3,42,21,0,357,358,5,
	59,0,0,358,360,3,42,21,0,359,357,1,0,0,0,360,361,1,0,0,0,361,359,1,0,0,
	0,361,362,1,0,0,0,362,45,1,0,0,0,363,364,3,56,28,0,364,365,7,5,0,0,365,
	366,3,56,28,0,366,47,1,0,0,0,367,368,3,56,28,0,368,369,7,5,0,0,369,370,
	3,56,28,0,370,371,7,5,0,0,371,372,3,56,28,0,372,49,1,0,0,0,373,378,3,56,
	28,0,374,375,5,65,0,0,375,377,3,56,28,0,376,374,1,0,0,0,377,380,1,0,0,0,
	378,376,1,0,0,0,378,379,1,0,0,0,379,51,1,0,0,0,380,378,1,0,0,0,381,382,
	3,6,3,0,382,383,5,6,0,0,383,388,3,36,18,0,384,385,5,59,0,0,385,387,3,36,
	18,0,386,384,1,0,0,0,387,390,1,0,0,0,388,386,1,0,0,0,388,389,1,0,0,0,389,
	391,1,0,0,0,390,388,1,0,0,0,391,396,5,7,0,0,392,393,5,69,0,0,393,394,3,
	8,4,0,394,395,5,69,0,0,395,397,1,0,0,0,396,392,1,0,0,0,396,397,1,0,0,0,
	397,53,1,0,0,0,398,399,5,16,0,0,399,400,5,4,0,0,400,401,3,6,3,0,401,402,
	5,5,0,0,402,405,1,0,0,0,403,405,3,6,3,0,404,398,1,0,0,0,404,403,1,0,0,0,
	405,406,1,0,0,0,406,407,5,6,0,0,407,412,3,56,28,0,408,409,5,59,0,0,409,
	411,3,56,28,0,410,408,1,0,0,0,411,414,1,0,0,0,412,410,1,0,0,0,412,413,1,
	0,0,0,413,415,1,0,0,0,414,412,1,0,0,0,415,416,5,7,0,0,416,55,1,0,0,0,417,
	418,6,28,-1,0,418,419,3,6,3,0,419,420,5,68,0,0,420,526,1,0,0,0,421,422,
	3,6,3,0,422,423,7,2,0,0,423,424,5,67,0,0,424,526,1,0,0,0,425,426,3,6,3,
	0,426,427,5,53,0,0,427,428,5,4,0,0,428,429,3,56,28,0,429,430,5,5,0,0,430,
	431,5,67,0,0,431,526,1,0,0,0,432,526,5,22,0,0,433,434,5,21,0,0,434,435,
	5,4,0,0,435,436,3,56,28,0,436,437,5,5,0,0,437,526,1,0,0,0,438,439,5,63,
	0,0,439,444,3,50,25,0,440,441,5,66,0,0,441,443,3,50,25,0,442,440,1,0,0,
	0,443,446,1,0,0,0,444,442,1,0,0,0,444,445,1,0,0,0,445,447,1,0,0,0,446,444,
	1,0,0,0,447,448,5,64,0,0,448,526,1,0,0,0,449,526,3,26,13,0,450,526,3,28,
	14,0,451,526,3,30,15,0,452,526,3,32,16,0,453,526,3,34,17,0,454,456,5,27,
	0,0,455,454,1,0,0,0,455,456,1,0,0,0,456,457,1,0,0,0,457,458,5,42,0,0,458,
	459,5,6,0,0,459,460,3,56,28,0,460,461,5,7,0,0,461,526,1,0,0,0,462,464,5,
	27,0,0,463,462,1,0,0,0,463,464,1,0,0,0,464,465,1,0,0,0,465,466,5,43,0,0,
	466,467,5,6,0,0,467,468,3,56,28,0,468,469,5,7,0,0,469,526,1,0,0,0,470,471,
	5,44,0,0,471,472,5,4,0,0,472,473,3,56,28,0,473,474,5,5,0,0,474,475,5,6,
	0,0,475,476,3,56,28,0,476,477,5,7,0,0,477,526,1,0,0,0,478,479,7,6,0,0,479,
	480,5,6,0,0,480,481,3,56,28,0,481,482,5,7,0,0,482,526,1,0,0,0,483,484,5,
	9,0,0,484,485,3,56,28,0,485,486,5,9,0,0,486,526,1,0,0,0,487,488,5,8,0,0,
	488,489,3,56,28,0,489,490,5,8,0,0,490,526,1,0,0,0,491,526,3,10,5,0,492,
	526,3,8,4,0,493,494,5,52,0,0,494,526,3,56,28,29,495,496,5,17,0,0,496,497,
	5,4,0,0,497,498,3,56,28,0,498,499,5,5,0,0,499,500,5,4,0,0,500,501,3,56,
	28,0,501,502,5,5,0,0,502,526,1,0,0,0,503,526,5,18,0,0,504,526,3,6,3,0,505,
	526,3,52,26,0,506,526,3,54,27,0,507,526,5,11,0,0,508,509,5,6,0,0,509,510,
	3,56,28,0,510,511,5,7,0,0,511,526,1,0,0,0,512,513,3,8,4,0,513,514,3,56,
	28,11,514,526,1,0,0,0,515,516,3,10,5,0,516,517,3,56,28,10,517,526,1,0,0,
	0,518,519,5,11,0,0,519,526,3,56,28,9,520,523,5,25,0,0,521,522,5,4,0,0,522,
	524,5,5,0,0,523,521,1,0,0,0,523,524,1,0,0,0,524,526,1,0,0,0,525,417,1,0,
	0,0,525,421,1,0,0,0,525,425,1,0,0,0,525,432,1,0,0,0,525,433,1,0,0,0,525,
	438,1,0,0,0,525,449,1,0,0,0,525,450,1,0,0,0,525,451,1,0,0,0,525,452,1,0,
	0,0,525,453,1,0,0,0,525,455,1,0,0,0,525,463,1,0,0,0,525,470,1,0,0,0,525,
	478,1,0,0,0,525,483,1,0,0,0,525,487,1,0,0,0,525,491,1,0,0,0,525,492,1,0,
	0,0,525,493,1,0,0,0,525,495,1,0,0,0,525,503,1,0,0,0,525,504,1,0,0,0,525,
	505,1,0,0,0,525,506,1,0,0,0,525,507,1,0,0,0,525,508,1,0,0,0,525,512,1,0,
	0,0,525,515,1,0,0,0,525,518,1,0,0,0,525,520,1,0,0,0,526,589,1,0,0,0,527,
	528,10,28,0,0,528,529,5,20,0,0,529,588,3,56,28,29,530,531,10,27,0,0,531,
	532,5,19,0,0,532,588,3,56,28,28,533,534,10,24,0,0,534,535,5,52,0,0,535,
	588,3,56,28,25,536,537,10,23,0,0,537,538,5,51,0,0,538,588,3,56,28,24,539,
	540,10,49,0,0,540,588,7,2,0,0,541,542,10,48,0,0,542,543,5,53,0,0,543,544,
	5,4,0,0,544,545,3,56,28,0,545,546,5,5,0,0,546,588,1,0,0,0,547,548,10,47,
	0,0,548,549,5,10,0,0,549,550,5,4,0,0,550,551,3,56,28,0,551,552,5,59,0,0,
	552,553,3,56,28,0,553,554,5,5,0,0,554,588,1,0,0,0,555,556,10,46,0,0,556,
	588,5,26,0,0,557,558,10,17,0,0,558,559,5,10,0,0,559,560,5,4,0,0,560,588,
	5,5,0,0,561,562,10,16,0,0,562,563,5,53,0,0,563,564,5,4,0,0,564,588,5,5,
	0,0,565,566,10,15,0,0,566,588,3,6,3,0,567,568,10,14,0,0,568,588,3,8,4,0,
	569,570,10,13,0,0,570,588,3,10,5,0,571,572,10,12,0,0,572,588,5,11,0,0,573,
	574,10,8,0,0,574,588,3,52,26,0,575,576,10,7,0,0,576,588,3,54,27,0,577,578,
	10,6,0,0,578,588,3,26,13,0,579,580,10,5,0,0,580,588,3,28,14,0,581,582,10,
	4,0,0,582,588,3,30,15,0,583,584,10,3,0,0,584,588,3,32,16,0,585,586,10,2,
	0,0,586,588,3,34,17,0,587,527,1,0,0,0,587,530,1,0,0,0,587,533,1,0,0,0,587,
	536,1,0,0,0,587,539,1,0,0,0,587,541,1,0,0,0,587,547,1,0,0,0,587,555,1,0,
	0,0,587,557,1,0,0,0,587,561,1,0,0,0,587,565,1,0,0,0,587,567,1,0,0,0,587,
	569,1,0,0,0,587,571,1,0,0,0,587,573,1,0,0,0,587,575,1,0,0,0,587,577,1,0,
	0,0,587,579,1,0,0,0,587,581,1,0,0,0,587,583,1,0,0,0,587,585,1,0,0,0,588,
	591,1,0,0,0,589,587,1,0,0,0,589,590,1,0,0,0,590,57,1,0,0,0,591,589,1,0,
	0,0,592,593,7,7,0,0,593,594,3,64,32,0,594,595,7,8,0,0,595,59,1,0,0,0,596,
	597,7,7,0,0,597,598,7,9,0,0,598,599,7,10,0,0,599,600,7,9,0,0,600,601,7,
	8,0,0,601,61,1,0,0,0,602,603,5,76,0,0,603,604,5,86,0,0,604,605,7,9,0,0,
	605,606,5,87,0,0,606,607,5,86,0,0,607,608,5,89,0,0,608,611,5,87,0,0,609,
	611,5,77,0,0,610,602,1,0,0,0,610,609,1,0,0,0,611,63,1,0,0,0,612,613,6,32,
	-1,0,613,614,5,80,0,0,614,615,5,86,0,0,615,616,3,56,28,0,616,617,5,87,0,
	0,617,635,1,0,0,0,618,619,5,76,0,0,619,622,5,86,0,0,620,623,3,64,32,0,621,
	623,5,88,0,0,622,620,1,0,0,0,622,621,1,0,0,0,623,624,1,0,0,0,624,625,5,
	87,0,0,625,626,5,86,0,0,626,627,3,64,32,0,627,628,5,87,0,0,628,635,1,0,
	0,0,629,635,5,83,0,0,630,631,5,84,0,0,631,632,3,64,32,0,632,633,5,85,0,
	0,633,635,1,0,0,0,634,612,1,0,0,0,634,618,1,0,0,0,634,629,1,0,0,0,634,630,
	1,0,0,0,635,658,1,0,0,0,636,637,10,4,0,0,637,638,5,78,0,0,638,657,3,64,
	32,5,639,640,10,9,0,0,640,641,5,82,0,0,641,657,5,89,0,0,642,643,10,8,0,
	0,643,644,5,82,0,0,644,645,5,86,0,0,645,646,5,89,0,0,646,657,5,87,0,0,647,
	648,10,7,0,0,648,649,5,82,0,0,649,657,3,62,31,0,650,651,10,6,0,0,651,652,
	5,82,0,0,652,653,5,86,0,0,653,654,3,62,31,0,654,655,5,87,0,0,655,657,1,
	0,0,0,656,636,1,0,0,0,656,639,1,0,0,0,656,642,1,0,0,0,656,647,1,0,0,0,656,
	650,1,0,0,0,657,660,1,0,0,0,658,656,1,0,0,0,658,659,1,0,0,0,659,65,1,0,
	0,0,660,658,1,0,0,0,48,82,96,99,112,117,124,129,134,143,153,158,163,171,
	181,193,207,218,230,238,249,263,273,291,299,309,320,337,341,348,354,361,
	378,388,396,404,412,444,455,463,523,525,587,589,610,622,634,656,658];

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
