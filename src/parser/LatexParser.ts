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
	public static readonly CMD_SIN = 28;
	public static readonly CMD_COS = 29;
	public static readonly CMD_TAN = 30;
	public static readonly CMD_COT = 31;
	public static readonly CMD_SEC = 32;
	public static readonly CMD_CSC = 33;
	public static readonly CMD_ARCSIN = 34;
	public static readonly CMD_ARCCOS = 35;
	public static readonly CMD_ARCTAN = 36;
	public static readonly CMD_SINH = 37;
	public static readonly CMD_COSH = 38;
	public static readonly CMD_TANH = 39;
	public static readonly CMD_COTH = 40;
	public static readonly CMD_LN = 41;
	public static readonly CMD_LOG = 42;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 43;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER = 44;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID = 45;
	public static readonly COMMENT = 46;
	public static readonly CMD_LEFT = 47;
	public static readonly CMD_RIGHT = 48;
	public static readonly DOUBLE_DOLLAR_SIGN = 49;
	public static readonly ADD = 50;
	public static readonly SUB = 51;
	public static readonly CARET = 52;
	public static readonly EQ = 53;
	public static readonly LT = 54;
	public static readonly GT = 55;
	public static readonly LTE = 56;
	public static readonly GTE = 57;
	public static readonly COMMA = 58;
	public static readonly CARET_SINGLE_CHAR_NUMBER = 59;
	public static readonly CARET_SINGLE_CHAR_ID = 60;
	public static readonly NUMBER = 61;
	public static readonly BEGIN_MATRIX = 62;
	public static readonly END_MATRIX = 63;
	public static readonly AMPERSAND = 64;
	public static readonly DOUBLE_BACKSLASH = 65;
	public static readonly UNDERSCORE_SUBSCRIPT = 66;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 67;
	public static readonly ID = 68;
	public static readonly WS = 69;
	public static readonly SLASH_SPACE = 70;
	public static readonly SLASH_COLON = 71;
	public static readonly ERROR_CHAR = 72;
	public static readonly R_BRACKET = 73;
	public static readonly ALT_R_BRACKET = 74;
	public static readonly U_CMD_FRAC = 75;
	public static readonly U_CMD_FRAC_INTS = 76;
	public static readonly U_CMD_CDOT = 77;
	public static readonly U_CMD_TIMES = 78;
	public static readonly U_CMD_SQRT = 79;
	public static readonly U_COMMA = 80;
	public static readonly U_CARET = 81;
	public static readonly U_NAME = 82;
	public static readonly U_L_PAREN = 83;
	public static readonly U_R_PAREN = 84;
	public static readonly U_L_BRACE = 85;
	public static readonly U_R_BRACE = 86;
	public static readonly U_ONE = 87;
	public static readonly U_NUMBER = 88;
	public static readonly U_CMD_LEFT = 89;
	public static readonly U_CMD_RIGHT = 90;
	public static readonly U_WS = 91;
	public static readonly U_SLASH_SPACE = 92;
	public static readonly U_ERROR_CHAR = 93;
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
		try {
			this.state = 109;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 86;
				this.match(LatexParser.L_PAREN);
				this.state = 87;
				this.id();
				this.state = 88;
				this.match(LatexParser.COMMA);
				this.state = 89;
				this.id();
				this.state = 90;
				this.match(LatexParser.R_PAREN);
				}
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 92;
				this.id();
				this.state = 93;
				this.match(LatexParser.COMMA);
				this.state = 94;
				this.id();
				}
				this.state = 96;
				this.match(LatexParser.EQ);
				this.state = 107;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 6:
					{
					{
					this.state = 97;
					this.match(LatexParser.L_PAREN);
					this.state = 98;
					this.u_block();
					this.state = 99;
					this.match(LatexParser.COMMA);
					this.state = 100;
					this.u_block();
					this.state = 101;
					this.match(LatexParser.R_PAREN);
					}
					}
					break;
				case 1:
				case 2:
					{
					{
					this.state = 103;
					this.u_block();
					this.state = 104;
					this.match(LatexParser.COMMA);
					this.state = 105;
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
	public insert_matrix(): Insert_matrixContext {
		let localctx: Insert_matrixContext = new Insert_matrixContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, LatexParser.RULE_insert_matrix);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 114;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 111;
					this.matchWildcard();
					}
					}
				}
				this.state = 116;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			}
			this.state = 124;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 117;
				this.u_insert_matrix();
				this.state = 121;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 118;
						this.matchWildcard();
						}
						}
					}
					this.state = 123;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
				}
				}
				}
				this.state = 126;
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
			this.state = 128;
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
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===51) {
				{
				this.state = 130;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 133;
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
			this.state = 135;
			this.number_();
			this.state = 136;
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
			this.state = 140;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 68:
				{
				this.state = 138;
				this.id();
				}
				break;
			case 11:
				{
				this.state = 139;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 142;
			this.match(LatexParser.EQ);
			this.state = 143;
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
			this.state = 145;
			this.assign();
			this.state = 148;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 146;
				this.match(LatexParser.COMMA);
				this.state = 147;
				this.assign();
				}
				}
				this.state = 150;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===58);
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
			this.state = 152;
			this.assign();
			this.state = 153;
			this.match(LatexParser.EQ);
			this.state = 155;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 154;
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
			this.state = 157;
			this.expr(0);
			this.state = 158;
			this.match(LatexParser.EQ);
			this.state = 160;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 159;
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
			this.state = 162;
			this.expr(0);
			this.state = 163;
			this.match(LatexParser.EQ);
			this.state = 164;
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
			this.state = 168;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 68:
				{
				this.state = 166;
				this.id();
				}
				break;
			case 11:
				{
				this.state = 167;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 170;
			this.match(LatexParser.EQ);
			this.state = 171;
			this.id();
			this.state = 172;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 173;
			this.piecewise_arg();
			this.state = 178;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===58) {
				{
				{
				this.state = 174;
				this.match(LatexParser.COMMA);
				this.state = 175;
				this.piecewise_arg();
				}
				}
				this.state = 180;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 181;
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
			this.state = 183;
			this.match(LatexParser.L_PAREN);
			this.state = 184;
			this.expr(0);
			this.state = 185;
			this.match(LatexParser.COMMA);
			this.state = 186;
			this.condition();
			this.state = 187;
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
			this.state = 190;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 189;
				this.match(LatexParser.BACKSLASH);
				}
			}

			this.state = 192;
			_la = this._input.LA(1);
			if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 193;
			this.match(LatexParser.L_PAREN);
			this.state = 194;
			this.expr(0);
			this.state = 195;
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
			this.state = 204;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				this.state = 197;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 13:
				{
				{
				this.state = 198;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 199;
				this.match(LatexParser.L_BRACE);
				this.state = 200;
				this.match(LatexParser.R_BRACE);
				this.state = 201;
				this.match(LatexParser.CARET);
				this.state = 202;
				this.match(LatexParser.L_BRACE);
				this.state = 203;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 206;
			this.match(LatexParser.L_PAREN);
			this.state = 207;
			this.expr(0);
			this.state = 208;
			this.match(LatexParser.R_PAREN);
			this.state = 215;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 209;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 210;
				this.match(LatexParser.L_BRACE);
				this.state = 211;
				this.id();
				this.state = 212;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 68:
				{
				this.state = 214;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 217;
			this.match(LatexParser.L_PAREN);
			this.state = 218;
			this.id();
			this.state = 219;
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
			this.state = 227;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				{
				this.state = 221;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 222;
				this.match(LatexParser.L_BRACE);
				this.state = 223;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 224;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 14:
			case 15:
				{
				this.state = 226;
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
			this.state = 235;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 52:
				{
				{
				this.state = 229;
				this.match(LatexParser.CARET);
				this.state = 230;
				this.match(LatexParser.L_BRACE);
				this.state = 231;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 232;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 59:
			case 60:
				{
				this.state = 234;
				_la = this._input.LA(1);
				if(!(_la===59 || _la===60)) {
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
			this.state = 237;
			this.match(LatexParser.L_PAREN);
			this.state = 238;
			localctx._integrand_expr = this.expr(0);
			this.state = 239;
			this.match(LatexParser.R_PAREN);
			this.state = 246;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 240;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 241;
				this.match(LatexParser.L_BRACE);
				this.state = 242;
				this.id();
				this.state = 243;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 68:
				{
				this.state = 245;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 248;
			this.match(LatexParser.L_PAREN);
			this.state = 249;
			this.id();
			this.state = 250;
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
			this.state = 252;
			this.match(LatexParser.CMD_FRAC);
			this.state = 253;
			this.match(LatexParser.L_BRACE);
			this.state = 260;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 254;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 255;
				this.match(LatexParser.L_BRACE);
				this.state = 256;
				this.id();
				this.state = 257;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 68:
				{
				this.state = 259;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 262;
			this.match(LatexParser.R_BRACE);
			this.state = 263;
			this.match(LatexParser.L_BRACE);
			this.state = 270;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 264;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 265;
				this.match(LatexParser.L_BRACE);
				this.state = 266;
				this.id();
				this.state = 267;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 68:
				{
				this.state = 269;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 272;
			this.match(LatexParser.L_PAREN);
			this.state = 273;
			this.id();
			this.state = 274;
			this.match(LatexParser.R_PAREN);
			this.state = 275;
			this.match(LatexParser.R_BRACE);
			this.state = 276;
			this.match(LatexParser.L_PAREN);
			this.state = 277;
			this.expr(0);
			this.state = 278;
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
			this.state = 280;
			this.match(LatexParser.CMD_FRAC);
			this.state = 281;
			this.match(LatexParser.L_BRACE);
			this.state = 288;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 282;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 283;
				this.match(LatexParser.L_BRACE);
				this.state = 284;
				this.id();
				this.state = 285;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 68:
				{
				this.state = 287;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 296;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 52:
				{
				{
				this.state = 290;
				this.match(LatexParser.CARET);
				this.state = 291;
				this.match(LatexParser.L_BRACE);
				this.state = 292;
				this.number_();
				this.state = 293;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 59:
				{
				this.state = 295;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 298;
			this.match(LatexParser.R_BRACE);
			this.state = 299;
			this.match(LatexParser.L_BRACE);
			this.state = 306;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 300;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 301;
				this.match(LatexParser.L_BRACE);
				this.state = 302;
				this.id();
				this.state = 303;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 68:
				{
				this.state = 305;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 308;
			this.match(LatexParser.L_PAREN);
			this.state = 309;
			this.id();
			this.state = 310;
			this.match(LatexParser.R_PAREN);
			this.state = 317;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 52:
				{
				{
				this.state = 311;
				this.match(LatexParser.CARET);
				this.state = 312;
				this.match(LatexParser.L_BRACE);
				this.state = 313;
				this.number_();
				this.state = 314;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 59:
				{
				this.state = 316;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 319;
			this.match(LatexParser.R_BRACE);
			this.state = 320;
			this.match(LatexParser.L_PAREN);
			this.state = 321;
			this.expr(0);
			this.state = 322;
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
			this.state = 334;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 324;
				this.id();
				this.state = 325;
				this.match(LatexParser.EQ);
				this.state = 326;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 328;
				this.expr(0);
				this.state = 329;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===54 || _la===56)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 330;
				this.id();
				this.state = 331;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===54 || _la===56)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 332;
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
			this.state = 338;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 336;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 337;
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
			this.state = 340;
			this.id();
			this.state = 343;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 341;
				this.match(LatexParser.COMMA);
				this.state = 342;
				this.id();
				}
				}
				this.state = 345;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===58);
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
			this.state = 347;
			this.id();
			this.state = 348;
			_la = this._input.LA(1);
			if(!(_la===23 || _la===24)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 351;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				this.state = 349;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 350;
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
			this.state = 353;
			this.guess();
			this.state = 356;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 354;
				this.match(LatexParser.COMMA);
				this.state = 355;
				this.guess();
				}
				}
				this.state = 358;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===58);
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
			this.state = 360;
			this.expr(0);
			this.state = 361;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 362;
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
			this.state = 364;
			this.expr(0);
			this.state = 365;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 366;
			this.expr(0);
			this.state = 367;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 368;
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
			this.state = 370;
			this.expr(0);
			this.state = 375;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===64) {
				{
				{
				this.state = 371;
				this.match(LatexParser.AMPERSAND);
				this.state = 372;
				this.expr(0);
				}
				}
				this.state = 377;
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
			this.state = 378;
			this.id();
			this.state = 379;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 380;
			this.argument();
			this.state = 385;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===58) {
				{
				{
				this.state = 381;
				this.match(LatexParser.COMMA);
				this.state = 382;
				this.argument();
				}
				}
				this.state = 387;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 388;
			this.match(LatexParser.R_PAREN);
			this.state = 393;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				{
				this.state = 389;
				localctx._points_id_0 = this.match(LatexParser.ID);
				this.state = 390;
				localctx._num_points = this.number_();
				this.state = 391;
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
			this.state = 401;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				{
				this.state = 395;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 396;
				this.match(LatexParser.L_BRACE);
				this.state = 397;
				this.id();
				this.state = 398;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 68:
				{
				this.state = 400;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 403;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 404;
			this.expr(0);
			this.state = 409;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===58) {
				{
				{
				this.state = 405;
				this.match(LatexParser.COMMA);
				this.state = 406;
				this.expr(0);
				}
				}
				this.state = 411;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 412;
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
			this.state = 522;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 415;
				this.id();
				this.state = 416;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 418;
				this.id();
				this.state = 419;
				_la = this._input.LA(1);
				if(!(_la===59 || _la===60)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 420;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 422;
				this.id();
				this.state = 423;
				this.match(LatexParser.CARET);
				this.state = 424;
				this.match(LatexParser.L_BRACE);
				this.state = 425;
				this.expr(0);
				this.state = 426;
				this.match(LatexParser.R_BRACE);
				this.state = 427;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 429;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 430;
				this.match(LatexParser.CMD_SQRT);
				this.state = 431;
				this.match(LatexParser.L_BRACE);
				this.state = 432;
				this.expr(0);
				this.state = 433;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new MatrixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 435;
				this.match(LatexParser.BEGIN_MATRIX);
				this.state = 436;
				this.matrix_row();
				this.state = 441;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===65) {
					{
					{
					this.state = 437;
					this.match(LatexParser.DOUBLE_BACKSLASH);
					this.state = 438;
					this.matrix_row();
					}
					}
					this.state = 443;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 444;
				this.match(LatexParser.END_MATRIX);
				}
				break;
			case 7:
				{
				localctx = new TrigFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 446;
				this.trig_function();
				}
				break;
			case 8:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 447;
				this.indefinite_integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 448;
				this.integral_cmd();
				}
				break;
			case 10:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 449;
				this.derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 450;
				this.n_derivative_cmd();
				}
				break;
			case 12:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 452;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===27) {
					{
					this.state = 451;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 454;
				this.match(LatexParser.CMD_LN);
				this.state = 455;
				this.match(LatexParser.L_PAREN);
				this.state = 456;
				this.expr(0);
				this.state = 457;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 13:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 460;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===27) {
					{
					this.state = 459;
					this.match(LatexParser.BACKSLASH);
					}
				}

				this.state = 462;
				this.match(LatexParser.CMD_LOG);
				this.state = 463;
				this.match(LatexParser.L_PAREN);
				this.state = 464;
				this.expr(0);
				this.state = 465;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 467;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 468;
				this.match(LatexParser.L_BRACE);
				this.state = 469;
				this.expr(0);
				this.state = 470;
				this.match(LatexParser.R_BRACE);
				this.state = 471;
				this.match(LatexParser.L_PAREN);
				this.state = 472;
				this.expr(0);
				this.state = 473;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 475;
				_la = this._input.LA(1);
				if(!(_la===44 || _la===45)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 476;
				this.match(LatexParser.L_PAREN);
				this.state = 477;
				this.expr(0);
				this.state = 478;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 16:
				{
				localctx = new NormContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 480;
				this.match(LatexParser.DOUBLE_VBAR);
				this.state = 481;
				this.expr(0);
				this.state = 482;
				this.match(LatexParser.DOUBLE_VBAR);
				}
				break;
			case 17:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 484;
				this.match(LatexParser.VBAR);
				this.state = 485;
				this.expr(0);
				this.state = 486;
				this.match(LatexParser.VBAR);
				}
				break;
			case 18:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 488;
				this.number_with_units();
				}
				break;
			case 19:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 489;
				this.number_();
				}
				break;
			case 20:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 490;
				this.match(LatexParser.SUB);
				this.state = 491;
				this.expr(29);
				}
				break;
			case 21:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 492;
				this.match(LatexParser.CMD_FRAC);
				this.state = 493;
				this.match(LatexParser.L_BRACE);
				this.state = 494;
				this.expr(0);
				this.state = 495;
				this.match(LatexParser.R_BRACE);
				this.state = 496;
				this.match(LatexParser.L_BRACE);
				this.state = 497;
				this.expr(0);
				this.state = 498;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 22:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 500;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 23:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 501;
				this.id();
				}
				break;
			case 24:
				{
				localctx = new UserFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 502;
				this.user_function();
				}
				break;
			case 25:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 503;
				this.builtin_function();
				}
				break;
			case 26:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 504;
				this.match(LatexParser.PI);
				}
				break;
			case 27:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 505;
				this.match(LatexParser.L_PAREN);
				this.state = 506;
				this.expr(0);
				this.state = 507;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 28:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 509;
				this.number_();
				this.state = 510;
				this.expr(11);
				}
				break;
			case 29:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 512;
				this.number_with_units();
				this.state = 513;
				this.expr(10);
				}
				break;
			case 30:
				{
				localctx = new MissingMultiplicationContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 515;
				this.match(LatexParser.PI);
				this.state = 516;
				this.expr(9);
				}
				break;
			case 31:
				{
				localctx = new EmptyPlaceholderContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 517;
				this.match(LatexParser.CMD_PLACEHOLDER);
				this.state = 520;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 38, this._ctx) ) {
				case 1:
					{
					this.state = 518;
					this.match(LatexParser.L_BRACE);
					this.state = 519;
					this.match(LatexParser.R_BRACE);
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 586;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 584;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 40, this._ctx) ) {
					case 1:
						{
						localctx = new MatrixMultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 524;
						if (!(this.precpred(this._ctx, 28))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 28)");
						}
						this.state = 525;
						this.match(LatexParser.CMD_TIMES);
						this.state = 526;
						this.expr(29);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 527;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 528;
						this.match(LatexParser.CMD_CDOT);
						this.state = 529;
						this.expr(28);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 530;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 531;
						this.match(LatexParser.SUB);
						this.state = 532;
						this.expr(25);
						}
						break;
					case 4:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 533;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 534;
						this.match(LatexParser.ADD);
						this.state = 535;
						this.expr(24);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 536;
						if (!(this.precpred(this._ctx, 49))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 49)");
						}
						this.state = 537;
						_la = this._input.LA(1);
						if(!(_la===59 || _la===60)) {
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
						this.state = 538;
						if (!(this.precpred(this._ctx, 48))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 48)");
						}
						this.state = 539;
						this.match(LatexParser.CARET);
						this.state = 540;
						this.match(LatexParser.L_BRACE);
						this.state = 541;
						this.expr(0);
						this.state = 542;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 7:
						{
						localctx = new IndexContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 544;
						if (!(this.precpred(this._ctx, 47))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 47)");
						}
						this.state = 545;
						this.match(LatexParser.UNDERSCORE);
						this.state = 546;
						this.match(LatexParser.L_BRACE);
						this.state = 547;
						this.expr(0);
						this.state = 548;
						this.match(LatexParser.COMMA);
						this.state = 549;
						this.expr(0);
						this.state = 550;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 8:
						{
						localctx = new TransposeContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 552;
						if (!(this.precpred(this._ctx, 46))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 46)");
						}
						this.state = 553;
						this.match(LatexParser.TRANSPOSE);
						}
						break;
					case 9:
						{
						localctx = new EmptySubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 554;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 555;
						this.match(LatexParser.UNDERSCORE);
						this.state = 556;
						this.match(LatexParser.L_BRACE);
						this.state = 557;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 10:
						{
						localctx = new EmptySuperscriptContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 558;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 559;
						this.match(LatexParser.CARET);
						this.state = 560;
						this.match(LatexParser.L_BRACE);
						this.state = 561;
						this.match(LatexParser.R_BRACE);
						}
						break;
					case 11:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 562;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 563;
						this.id();
						}
						break;
					case 12:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 564;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 565;
						this.number_();
						}
						break;
					case 13:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 566;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 567;
						this.number_with_units();
						}
						break;
					case 14:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 568;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 569;
						this.match(LatexParser.PI);
						}
						break;
					case 15:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 570;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 571;
						this.user_function();
						}
						break;
					case 16:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 572;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 573;
						this.builtin_function();
						}
						break;
					case 17:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 574;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 575;
						this.trig_function();
						}
						break;
					case 18:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 576;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 577;
						this.indefinite_integral_cmd();
						}
						break;
					case 19:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 578;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 579;
						this.integral_cmd();
						}
						break;
					case 20:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 580;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 581;
						this.derivative_cmd();
						}
						break;
					case 21:
						{
						localctx = new MissingMultiplicationContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 582;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 583;
						this.n_derivative_cmd();
						}
						break;
					}
					}
				}
				this.state = 588;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
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
			this.state = 589;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 590;
			this.u_expr(0);
			this.state = 591;
			_la = this._input.LA(1);
			if(!(_la===73 || _la===74)) {
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
			this.state = 593;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 594;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===87 || _la===88)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 595;
			_la = this._input.LA(1);
			if(!(_la===78 || _la===80)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 596;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===87 || _la===88)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 597;
			_la = this._input.LA(1);
			if(!(_la===73 || _la===74)) {
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
			this.state = 607;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 75:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 599;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 600;
				this.match(LatexParser.U_L_BRACE);
				this.state = 601;
				_la = this._input.LA(1);
				if(!(_la===87 || _la===88)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 602;
				this.match(LatexParser.U_R_BRACE);
				this.state = 603;
				this.match(LatexParser.U_L_BRACE);
				this.state = 604;
				this.match(LatexParser.U_NUMBER);
				this.state = 605;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 76:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 606;
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
			this.state = 631;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 79:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 610;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 611;
				this.match(LatexParser.U_L_BRACE);
				this.state = 612;
				this.expr(0);
				this.state = 613;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 75:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 615;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 616;
				this.match(LatexParser.U_L_BRACE);
				this.state = 619;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 75:
				case 79:
				case 82:
				case 83:
					{
					this.state = 617;
					this.u_expr(0);
					}
					break;
				case 87:
					{
					this.state = 618;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 621;
				this.match(LatexParser.U_R_BRACE);
				this.state = 622;
				this.match(LatexParser.U_L_BRACE);
				this.state = 623;
				this.u_expr(0);
				this.state = 624;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 82:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 626;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 83:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 627;
				this.match(LatexParser.U_L_PAREN);
				this.state = 628;
				this.u_expr(0);
				this.state = 629;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 655;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 653;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 45, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 633;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 634;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 635;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 636;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 637;
						this.match(LatexParser.U_CARET);
						this.state = 638;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 639;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 640;
						this.match(LatexParser.U_CARET);
						this.state = 641;
						this.match(LatexParser.U_L_BRACE);
						this.state = 642;
						this.match(LatexParser.U_NUMBER);
						this.state = 643;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 644;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 645;
						this.match(LatexParser.U_CARET);
						this.state = 646;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 647;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 648;
						this.match(LatexParser.U_CARET);
						this.state = 649;
						this.match(LatexParser.U_L_BRACE);
						this.state = 650;
						this.u_fraction();
						this.state = 651;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 657;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
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

	public static readonly _serializedATN: number[] = [4,1,93,659,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
	0,3,0,83,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,108,8,1,3,1,110,8,1,1,2,5,2,113,8,
	2,10,2,12,2,116,9,2,1,2,1,2,5,2,120,8,2,10,2,12,2,123,9,2,4,2,125,8,2,11,
	2,12,2,126,1,3,1,3,1,4,3,4,132,8,4,1,4,1,4,1,5,1,5,1,5,1,6,1,6,3,6,141,
	8,6,1,6,1,6,1,6,1,7,1,7,1,7,4,7,149,8,7,11,7,12,7,150,1,8,1,8,1,8,3,8,156,
	8,8,1,9,1,9,1,9,3,9,161,8,9,1,10,1,10,1,10,1,10,1,11,1,11,3,11,169,8,11,
	1,11,1,11,1,11,1,11,1,11,1,11,5,11,177,8,11,10,11,12,11,180,9,11,1,11,1,
	11,1,12,1,12,1,12,1,12,1,12,1,12,1,13,3,13,191,8,13,1,13,1,13,1,13,1,13,
	1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,205,8,14,1,14,1,14,1,14,1,
	14,1,14,1,14,1,14,1,14,1,14,3,14,216,8,14,1,14,1,14,1,14,1,14,1,15,1,15,
	1,15,1,15,1,15,1,15,3,15,228,8,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,236,
	8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,247,8,15,1,15,1,
	15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,261,8,16,1,16,
	1,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,271,8,16,1,16,1,16,1,16,1,16,1,
	16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,289,8,17,
	1,17,1,17,1,17,1,17,1,17,1,17,3,17,297,8,17,1,17,1,17,1,17,1,17,1,17,1,
	17,1,17,1,17,3,17,307,8,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
	3,17,318,8,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,
	18,1,18,1,18,1,18,3,18,335,8,18,1,19,1,19,3,19,339,8,19,1,20,1,20,1,20,
	4,20,344,8,20,11,20,12,20,345,1,21,1,21,1,21,1,21,3,21,352,8,21,1,22,1,
	22,1,22,4,22,357,8,22,11,22,12,22,358,1,23,1,23,1,23,1,23,1,24,1,24,1,24,
	1,24,1,24,1,24,1,25,1,25,1,25,5,25,374,8,25,10,25,12,25,377,9,25,1,26,1,
	26,1,26,1,26,1,26,5,26,384,8,26,10,26,12,26,387,9,26,1,26,1,26,1,26,1,26,
	1,26,3,26,394,8,26,1,27,1,27,1,27,1,27,1,27,1,27,3,27,402,8,27,1,27,1,27,
	1,27,1,27,5,27,408,8,27,10,27,12,27,411,9,27,1,27,1,27,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,5,28,440,8,28,10,28,12,28,443,9,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,3,28,453,8,28,1,28,1,28,1,28,1,28,
	1,28,1,28,3,28,461,8,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,3,28,521,8,28,3,28,523,8,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,5,28,585,
	8,28,10,28,12,28,588,9,28,1,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,
	1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,608,8,31,1,32,1,32,1,
	32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,620,8,32,1,32,1,32,1,32,1,32,
	1,32,1,32,1,32,1,32,1,32,1,32,3,32,632,8,32,1,32,1,32,1,32,1,32,1,32,1,
	32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,
	5,32,654,8,32,10,32,12,32,657,9,32,1,32,2,114,121,2,56,64,33,0,2,4,6,8,
	10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
	58,60,62,64,0,11,1,0,28,40,1,0,14,15,1,0,59,60,2,0,54,54,56,56,1,0,23,24,
	1,0,54,57,1,0,44,45,1,0,1,2,1,0,73,74,1,0,87,88,2,0,78,78,80,80,741,0,82,
	1,0,0,0,2,109,1,0,0,0,4,114,1,0,0,0,6,128,1,0,0,0,8,131,1,0,0,0,10,135,
	1,0,0,0,12,140,1,0,0,0,14,145,1,0,0,0,16,152,1,0,0,0,18,157,1,0,0,0,20,
	162,1,0,0,0,22,168,1,0,0,0,24,183,1,0,0,0,26,190,1,0,0,0,28,204,1,0,0,0,
	30,227,1,0,0,0,32,252,1,0,0,0,34,280,1,0,0,0,36,334,1,0,0,0,38,338,1,0,
	0,0,40,340,1,0,0,0,42,347,1,0,0,0,44,353,1,0,0,0,46,360,1,0,0,0,48,364,
	1,0,0,0,50,370,1,0,0,0,52,378,1,0,0,0,54,401,1,0,0,0,56,522,1,0,0,0,58,
	589,1,0,0,0,60,593,1,0,0,0,62,607,1,0,0,0,64,631,1,0,0,0,66,83,3,12,6,0,
	67,83,3,14,7,0,68,83,3,16,8,0,69,83,3,18,9,0,70,83,3,20,10,0,71,83,3,58,
	29,0,72,83,3,8,4,0,73,83,3,6,3,0,74,83,3,40,20,0,75,83,3,42,21,0,76,83,
	3,44,22,0,77,83,3,56,28,0,78,83,3,38,19,0,79,83,3,22,11,0,80,83,3,4,2,0,
	81,83,3,2,1,0,82,66,1,0,0,0,82,67,1,0,0,0,82,68,1,0,0,0,82,69,1,0,0,0,82,
	70,1,0,0,0,82,71,1,0,0,0,82,72,1,0,0,0,82,73,1,0,0,0,82,74,1,0,0,0,82,75,
	1,0,0,0,82,76,1,0,0,0,82,77,1,0,0,0,82,78,1,0,0,0,82,79,1,0,0,0,82,80,1,
	0,0,0,82,81,1,0,0,0,82,83,1,0,0,0,83,84,1,0,0,0,84,85,5,0,0,1,85,1,1,0,
	0,0,86,87,5,6,0,0,87,88,3,6,3,0,88,89,5,58,0,0,89,90,3,6,3,0,90,91,5,7,
	0,0,91,110,1,0,0,0,92,93,3,6,3,0,93,94,5,58,0,0,94,95,3,6,3,0,95,96,1,0,
	0,0,96,107,5,53,0,0,97,98,5,6,0,0,98,99,3,58,29,0,99,100,5,58,0,0,100,101,
	3,58,29,0,101,102,5,7,0,0,102,108,1,0,0,0,103,104,3,58,29,0,104,105,5,58,
	0,0,105,106,3,58,29,0,106,108,1,0,0,0,107,97,1,0,0,0,107,103,1,0,0,0,107,
	108,1,0,0,0,108,110,1,0,0,0,109,86,1,0,0,0,109,92,1,0,0,0,110,3,1,0,0,0,
	111,113,9,0,0,0,112,111,1,0,0,0,113,116,1,0,0,0,114,115,1,0,0,0,114,112,
	1,0,0,0,115,124,1,0,0,0,116,114,1,0,0,0,117,121,3,60,30,0,118,120,9,0,0,
	0,119,118,1,0,0,0,120,123,1,0,0,0,121,122,1,0,0,0,121,119,1,0,0,0,122,125,
	1,0,0,0,123,121,1,0,0,0,124,117,1,0,0,0,125,126,1,0,0,0,126,124,1,0,0,0,
	126,127,1,0,0,0,127,5,1,0,0,0,128,129,5,68,0,0,129,7,1,0,0,0,130,132,5,
	51,0,0,131,130,1,0,0,0,131,132,1,0,0,0,132,133,1,0,0,0,133,134,5,61,0,0,
	134,9,1,0,0,0,135,136,3,8,4,0,136,137,3,58,29,0,137,11,1,0,0,0,138,141,
	3,6,3,0,139,141,5,11,0,0,140,138,1,0,0,0,140,139,1,0,0,0,141,142,1,0,0,
	0,142,143,5,53,0,0,143,144,3,56,28,0,144,13,1,0,0,0,145,148,3,12,6,0,146,
	147,5,58,0,0,147,149,3,12,6,0,148,146,1,0,0,0,149,150,1,0,0,0,150,148,1,
	0,0,0,150,151,1,0,0,0,151,15,1,0,0,0,152,153,3,12,6,0,153,155,5,53,0,0,
	154,156,3,58,29,0,155,154,1,0,0,0,155,156,1,0,0,0,156,17,1,0,0,0,157,158,
	3,56,28,0,158,160,5,53,0,0,159,161,3,58,29,0,160,159,1,0,0,0,160,161,1,
	0,0,0,161,19,1,0,0,0,162,163,3,56,28,0,163,164,5,53,0,0,164,165,3,56,28,
	0,165,21,1,0,0,0,166,169,3,6,3,0,167,169,5,11,0,0,168,166,1,0,0,0,168,167,
	1,0,0,0,169,170,1,0,0,0,170,171,5,53,0,0,171,172,3,6,3,0,172,173,5,6,0,
	0,173,178,3,24,12,0,174,175,5,58,0,0,175,177,3,24,12,0,176,174,1,0,0,0,
	177,180,1,0,0,0,178,176,1,0,0,0,178,179,1,0,0,0,179,181,1,0,0,0,180,178,
	1,0,0,0,181,182,5,7,0,0,182,23,1,0,0,0,183,184,5,6,0,0,184,185,3,56,28,
	0,185,186,5,58,0,0,186,187,3,38,19,0,187,188,5,7,0,0,188,25,1,0,0,0,189,
	191,5,27,0,0,190,189,1,0,0,0,190,191,1,0,0,0,191,192,1,0,0,0,192,193,7,
	0,0,0,193,194,5,6,0,0,194,195,3,56,28,0,195,196,5,7,0,0,196,27,1,0,0,0,
	197,205,5,12,0,0,198,199,5,13,0,0,199,200,5,4,0,0,200,201,5,5,0,0,201,202,
	5,52,0,0,202,203,5,4,0,0,203,205,5,5,0,0,204,197,1,0,0,0,204,198,1,0,0,
	0,205,206,1,0,0,0,206,207,5,6,0,0,207,208,3,56,28,0,208,215,5,7,0,0,209,
	210,5,16,0,0,210,211,5,4,0,0,211,212,3,6,3,0,212,213,5,5,0,0,213,216,1,
	0,0,0,214,216,3,6,3,0,215,209,1,0,0,0,215,214,1,0,0,0,216,217,1,0,0,0,217,
	218,5,6,0,0,218,219,3,6,3,0,219,220,5,7,0,0,220,29,1,0,0,0,221,222,5,13,
	0,0,222,223,5,4,0,0,223,224,3,56,28,0,224,225,5,5,0,0,225,228,1,0,0,0,226,
	228,7,1,0,0,227,221,1,0,0,0,227,226,1,0,0,0,228,235,1,0,0,0,229,230,5,52,
	0,0,230,231,5,4,0,0,231,232,3,56,28,0,232,233,5,5,0,0,233,236,1,0,0,0,234,
	236,7,2,0,0,235,229,1,0,0,0,235,234,1,0,0,0,236,237,1,0,0,0,237,238,5,6,
	0,0,238,239,3,56,28,0,239,246,5,7,0,0,240,241,5,16,0,0,241,242,5,4,0,0,
	242,243,3,6,3,0,243,244,5,5,0,0,244,247,1,0,0,0,245,247,3,6,3,0,246,240,
	1,0,0,0,246,245,1,0,0,0,247,248,1,0,0,0,248,249,5,6,0,0,249,250,3,6,3,0,
	250,251,5,7,0,0,251,31,1,0,0,0,252,253,5,17,0,0,253,260,5,4,0,0,254,255,
	5,16,0,0,255,256,5,4,0,0,256,257,3,6,3,0,257,258,5,5,0,0,258,261,1,0,0,
	0,259,261,3,6,3,0,260,254,1,0,0,0,260,259,1,0,0,0,261,262,1,0,0,0,262,263,
	5,5,0,0,263,270,5,4,0,0,264,265,5,16,0,0,265,266,5,4,0,0,266,267,3,6,3,
	0,267,268,5,5,0,0,268,271,1,0,0,0,269,271,3,6,3,0,270,264,1,0,0,0,270,269,
	1,0,0,0,271,272,1,0,0,0,272,273,5,6,0,0,273,274,3,6,3,0,274,275,5,7,0,0,
	275,276,5,5,0,0,276,277,5,6,0,0,277,278,3,56,28,0,278,279,5,7,0,0,279,33,
	1,0,0,0,280,281,5,17,0,0,281,288,5,4,0,0,282,283,5,16,0,0,283,284,5,4,0,
	0,284,285,3,6,3,0,285,286,5,5,0,0,286,289,1,0,0,0,287,289,3,6,3,0,288,282,
	1,0,0,0,288,287,1,0,0,0,289,296,1,0,0,0,290,291,5,52,0,0,291,292,5,4,0,
	0,292,293,3,8,4,0,293,294,5,5,0,0,294,297,1,0,0,0,295,297,5,59,0,0,296,
	290,1,0,0,0,296,295,1,0,0,0,297,298,1,0,0,0,298,299,5,5,0,0,299,306,5,4,
	0,0,300,301,5,16,0,0,301,302,5,4,0,0,302,303,3,6,3,0,303,304,5,5,0,0,304,
	307,1,0,0,0,305,307,3,6,3,0,306,300,1,0,0,0,306,305,1,0,0,0,307,308,1,0,
	0,0,308,309,5,6,0,0,309,310,3,6,3,0,310,317,5,7,0,0,311,312,5,52,0,0,312,
	313,5,4,0,0,313,314,3,8,4,0,314,315,5,5,0,0,315,318,1,0,0,0,316,318,5,59,
	0,0,317,311,1,0,0,0,317,316,1,0,0,0,318,319,1,0,0,0,319,320,5,5,0,0,320,
	321,5,6,0,0,321,322,3,56,28,0,322,323,5,7,0,0,323,35,1,0,0,0,324,325,3,
	6,3,0,325,326,5,53,0,0,326,327,3,56,28,0,327,335,1,0,0,0,328,329,3,56,28,
	0,329,330,7,3,0,0,330,331,3,6,3,0,331,332,7,3,0,0,332,333,3,56,28,0,333,
	335,1,0,0,0,334,324,1,0,0,0,334,328,1,0,0,0,335,37,1,0,0,0,336,339,3,46,
	23,0,337,339,3,48,24,0,338,336,1,0,0,0,338,337,1,0,0,0,339,39,1,0,0,0,340,
	343,3,6,3,0,341,342,5,58,0,0,342,344,3,6,3,0,343,341,1,0,0,0,344,345,1,
	0,0,0,345,343,1,0,0,0,345,346,1,0,0,0,346,41,1,0,0,0,347,348,3,6,3,0,348,
	351,7,4,0,0,349,352,3,8,4,0,350,352,3,10,5,0,351,349,1,0,0,0,351,350,1,
	0,0,0,352,43,1,0,0,0,353,356,3,42,21,0,354,355,5,58,0,0,355,357,3,42,21,
	0,356,354,1,0,0,0,357,358,1,0,0,0,358,356,1,0,0,0,358,359,1,0,0,0,359,45,
	1,0,0,0,360,361,3,56,28,0,361,362,7,5,0,0,362,363,3,56,28,0,363,47,1,0,
	0,0,364,365,3,56,28,0,365,366,7,5,0,0,366,367,3,56,28,0,367,368,7,5,0,0,
	368,369,3,56,28,0,369,49,1,0,0,0,370,375,3,56,28,0,371,372,5,64,0,0,372,
	374,3,56,28,0,373,371,1,0,0,0,374,377,1,0,0,0,375,373,1,0,0,0,375,376,1,
	0,0,0,376,51,1,0,0,0,377,375,1,0,0,0,378,379,3,6,3,0,379,380,5,6,0,0,380,
	385,3,36,18,0,381,382,5,58,0,0,382,384,3,36,18,0,383,381,1,0,0,0,384,387,
	1,0,0,0,385,383,1,0,0,0,385,386,1,0,0,0,386,388,1,0,0,0,387,385,1,0,0,0,
	388,393,5,7,0,0,389,390,5,68,0,0,390,391,3,8,4,0,391,392,5,68,0,0,392,394,
	1,0,0,0,393,389,1,0,0,0,393,394,1,0,0,0,394,53,1,0,0,0,395,396,5,16,0,0,
	396,397,5,4,0,0,397,398,3,6,3,0,398,399,5,5,0,0,399,402,1,0,0,0,400,402,
	3,6,3,0,401,395,1,0,0,0,401,400,1,0,0,0,402,403,1,0,0,0,403,404,5,6,0,0,
	404,409,3,56,28,0,405,406,5,58,0,0,406,408,3,56,28,0,407,405,1,0,0,0,408,
	411,1,0,0,0,409,407,1,0,0,0,409,410,1,0,0,0,410,412,1,0,0,0,411,409,1,0,
	0,0,412,413,5,7,0,0,413,55,1,0,0,0,414,415,6,28,-1,0,415,416,3,6,3,0,416,
	417,5,67,0,0,417,523,1,0,0,0,418,419,3,6,3,0,419,420,7,2,0,0,420,421,5,
	66,0,0,421,523,1,0,0,0,422,423,3,6,3,0,423,424,5,52,0,0,424,425,5,4,0,0,
	425,426,3,56,28,0,426,427,5,5,0,0,427,428,5,66,0,0,428,523,1,0,0,0,429,
	523,5,22,0,0,430,431,5,21,0,0,431,432,5,4,0,0,432,433,3,56,28,0,433,434,
	5,5,0,0,434,523,1,0,0,0,435,436,5,62,0,0,436,441,3,50,25,0,437,438,5,65,
	0,0,438,440,3,50,25,0,439,437,1,0,0,0,440,443,1,0,0,0,441,439,1,0,0,0,441,
	442,1,0,0,0,442,444,1,0,0,0,443,441,1,0,0,0,444,445,5,63,0,0,445,523,1,
	0,0,0,446,523,3,26,13,0,447,523,3,28,14,0,448,523,3,30,15,0,449,523,3,32,
	16,0,450,523,3,34,17,0,451,453,5,27,0,0,452,451,1,0,0,0,452,453,1,0,0,0,
	453,454,1,0,0,0,454,455,5,41,0,0,455,456,5,6,0,0,456,457,3,56,28,0,457,
	458,5,7,0,0,458,523,1,0,0,0,459,461,5,27,0,0,460,459,1,0,0,0,460,461,1,
	0,0,0,461,462,1,0,0,0,462,463,5,42,0,0,463,464,5,6,0,0,464,465,3,56,28,
	0,465,466,5,7,0,0,466,523,1,0,0,0,467,468,5,43,0,0,468,469,5,4,0,0,469,
	470,3,56,28,0,470,471,5,5,0,0,471,472,5,6,0,0,472,473,3,56,28,0,473,474,
	5,7,0,0,474,523,1,0,0,0,475,476,7,6,0,0,476,477,5,6,0,0,477,478,3,56,28,
	0,478,479,5,7,0,0,479,523,1,0,0,0,480,481,5,9,0,0,481,482,3,56,28,0,482,
	483,5,9,0,0,483,523,1,0,0,0,484,485,5,8,0,0,485,486,3,56,28,0,486,487,5,
	8,0,0,487,523,1,0,0,0,488,523,3,10,5,0,489,523,3,8,4,0,490,491,5,51,0,0,
	491,523,3,56,28,29,492,493,5,17,0,0,493,494,5,4,0,0,494,495,3,56,28,0,495,
	496,5,5,0,0,496,497,5,4,0,0,497,498,3,56,28,0,498,499,5,5,0,0,499,523,1,
	0,0,0,500,523,5,18,0,0,501,523,3,6,3,0,502,523,3,52,26,0,503,523,3,54,27,
	0,504,523,5,11,0,0,505,506,5,6,0,0,506,507,3,56,28,0,507,508,5,7,0,0,508,
	523,1,0,0,0,509,510,3,8,4,0,510,511,3,56,28,11,511,523,1,0,0,0,512,513,
	3,10,5,0,513,514,3,56,28,10,514,523,1,0,0,0,515,516,5,11,0,0,516,523,3,
	56,28,9,517,520,5,25,0,0,518,519,5,4,0,0,519,521,5,5,0,0,520,518,1,0,0,
	0,520,521,1,0,0,0,521,523,1,0,0,0,522,414,1,0,0,0,522,418,1,0,0,0,522,422,
	1,0,0,0,522,429,1,0,0,0,522,430,1,0,0,0,522,435,1,0,0,0,522,446,1,0,0,0,
	522,447,1,0,0,0,522,448,1,0,0,0,522,449,1,0,0,0,522,450,1,0,0,0,522,452,
	1,0,0,0,522,460,1,0,0,0,522,467,1,0,0,0,522,475,1,0,0,0,522,480,1,0,0,0,
	522,484,1,0,0,0,522,488,1,0,0,0,522,489,1,0,0,0,522,490,1,0,0,0,522,492,
	1,0,0,0,522,500,1,0,0,0,522,501,1,0,0,0,522,502,1,0,0,0,522,503,1,0,0,0,
	522,504,1,0,0,0,522,505,1,0,0,0,522,509,1,0,0,0,522,512,1,0,0,0,522,515,
	1,0,0,0,522,517,1,0,0,0,523,586,1,0,0,0,524,525,10,28,0,0,525,526,5,20,
	0,0,526,585,3,56,28,29,527,528,10,27,0,0,528,529,5,19,0,0,529,585,3,56,
	28,28,530,531,10,24,0,0,531,532,5,51,0,0,532,585,3,56,28,25,533,534,10,
	23,0,0,534,535,5,50,0,0,535,585,3,56,28,24,536,537,10,49,0,0,537,585,7,
	2,0,0,538,539,10,48,0,0,539,540,5,52,0,0,540,541,5,4,0,0,541,542,3,56,28,
	0,542,543,5,5,0,0,543,585,1,0,0,0,544,545,10,47,0,0,545,546,5,10,0,0,546,
	547,5,4,0,0,547,548,3,56,28,0,548,549,5,58,0,0,549,550,3,56,28,0,550,551,
	5,5,0,0,551,585,1,0,0,0,552,553,10,46,0,0,553,585,5,26,0,0,554,555,10,17,
	0,0,555,556,5,10,0,0,556,557,5,4,0,0,557,585,5,5,0,0,558,559,10,16,0,0,
	559,560,5,52,0,0,560,561,5,4,0,0,561,585,5,5,0,0,562,563,10,15,0,0,563,
	585,3,6,3,0,564,565,10,14,0,0,565,585,3,8,4,0,566,567,10,13,0,0,567,585,
	3,10,5,0,568,569,10,12,0,0,569,585,5,11,0,0,570,571,10,8,0,0,571,585,3,
	52,26,0,572,573,10,7,0,0,573,585,3,54,27,0,574,575,10,6,0,0,575,585,3,26,
	13,0,576,577,10,5,0,0,577,585,3,28,14,0,578,579,10,4,0,0,579,585,3,30,15,
	0,580,581,10,3,0,0,581,585,3,32,16,0,582,583,10,2,0,0,583,585,3,34,17,0,
	584,524,1,0,0,0,584,527,1,0,0,0,584,530,1,0,0,0,584,533,1,0,0,0,584,536,
	1,0,0,0,584,538,1,0,0,0,584,544,1,0,0,0,584,552,1,0,0,0,584,554,1,0,0,0,
	584,558,1,0,0,0,584,562,1,0,0,0,584,564,1,0,0,0,584,566,1,0,0,0,584,568,
	1,0,0,0,584,570,1,0,0,0,584,572,1,0,0,0,584,574,1,0,0,0,584,576,1,0,0,0,
	584,578,1,0,0,0,584,580,1,0,0,0,584,582,1,0,0,0,585,588,1,0,0,0,586,584,
	1,0,0,0,586,587,1,0,0,0,587,57,1,0,0,0,588,586,1,0,0,0,589,590,7,7,0,0,
	590,591,3,64,32,0,591,592,7,8,0,0,592,59,1,0,0,0,593,594,7,7,0,0,594,595,
	7,9,0,0,595,596,7,10,0,0,596,597,7,9,0,0,597,598,7,8,0,0,598,61,1,0,0,0,
	599,600,5,75,0,0,600,601,5,85,0,0,601,602,7,9,0,0,602,603,5,86,0,0,603,
	604,5,85,0,0,604,605,5,88,0,0,605,608,5,86,0,0,606,608,5,76,0,0,607,599,
	1,0,0,0,607,606,1,0,0,0,608,63,1,0,0,0,609,610,6,32,-1,0,610,611,5,79,0,
	0,611,612,5,85,0,0,612,613,3,56,28,0,613,614,5,86,0,0,614,632,1,0,0,0,615,
	616,5,75,0,0,616,619,5,85,0,0,617,620,3,64,32,0,618,620,5,87,0,0,619,617,
	1,0,0,0,619,618,1,0,0,0,620,621,1,0,0,0,621,622,5,86,0,0,622,623,5,85,0,
	0,623,624,3,64,32,0,624,625,5,86,0,0,625,632,1,0,0,0,626,632,5,82,0,0,627,
	628,5,83,0,0,628,629,3,64,32,0,629,630,5,84,0,0,630,632,1,0,0,0,631,609,
	1,0,0,0,631,615,1,0,0,0,631,626,1,0,0,0,631,627,1,0,0,0,632,655,1,0,0,0,
	633,634,10,4,0,0,634,635,5,77,0,0,635,654,3,64,32,5,636,637,10,9,0,0,637,
	638,5,81,0,0,638,654,5,88,0,0,639,640,10,8,0,0,640,641,5,81,0,0,641,642,
	5,85,0,0,642,643,5,88,0,0,643,654,5,86,0,0,644,645,10,7,0,0,645,646,5,81,
	0,0,646,654,3,62,31,0,647,648,10,6,0,0,648,649,5,81,0,0,649,650,5,85,0,
	0,650,651,3,62,31,0,651,652,5,86,0,0,652,654,1,0,0,0,653,633,1,0,0,0,653,
	636,1,0,0,0,653,639,1,0,0,0,653,644,1,0,0,0,653,647,1,0,0,0,654,657,1,0,
	0,0,655,653,1,0,0,0,655,656,1,0,0,0,656,65,1,0,0,0,657,655,1,0,0,0,47,82,
	107,109,114,121,126,131,140,150,155,160,168,178,190,204,215,227,235,246,
	260,270,288,296,306,317,334,338,345,351,358,375,385,393,401,409,441,452,
	460,520,522,584,586,607,619,631,653,655];

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
	public L_PAREN(): TerminalNode {
		return this.getToken(LatexParser.L_PAREN, 0);
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
	public R_PAREN(): TerminalNode {
		return this.getToken(LatexParser.R_PAREN, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(LatexParser.EQ, 0);
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
