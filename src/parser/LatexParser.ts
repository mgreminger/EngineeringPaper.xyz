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
	public static readonly CMD_SQRT = 19;
	public static readonly CMD_SQRT_INT = 20;
	public static readonly CMD_SIM = 21;
	public static readonly CMD_APPROX = 22;
	public static readonly BACK_SLASH = 23;
	public static readonly CMD_SIN = 24;
	public static readonly CMD_COS = 25;
	public static readonly CMD_TAN = 26;
	public static readonly CMD_COT = 27;
	public static readonly CMD_SEC = 28;
	public static readonly CMD_CSC = 29;
	public static readonly CMD_ARCSIN = 30;
	public static readonly CMD_ARCCOS = 31;
	public static readonly CMD_ARCTAN = 32;
	public static readonly CMD_SINH = 33;
	public static readonly CMD_COSH = 34;
	public static readonly CMD_TANH = 35;
	public static readonly CMD_COTH = 36;
	public static readonly CMD_LN = 37;
	public static readonly CMD_LOG = 38;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 39;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER = 40;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID = 41;
	public static readonly COMMENT = 42;
	public static readonly CMD_LEFT = 43;
	public static readonly CMD_RIGHT = 44;
	public static readonly DOUBLE_DOLLAR_SIGN = 45;
	public static readonly ADD = 46;
	public static readonly SUB = 47;
	public static readonly CARET = 48;
	public static readonly EQ = 49;
	public static readonly LT = 50;
	public static readonly GT = 51;
	public static readonly LTE = 52;
	public static readonly GTE = 53;
	public static readonly COMMA = 54;
	public static readonly CARET_SINGLE_CHAR_NUMBER = 55;
	public static readonly CARET_SINGLE_CHAR_ID = 56;
	public static readonly NUMBER = 57;
	public static readonly UNDERSCORE_SUBSCRIPT = 58;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 59;
	public static readonly ID = 60;
	public static readonly WS = 61;
	public static readonly SLASH_SPACE = 62;
	public static readonly SLASH_COLON = 63;
	public static readonly ERROR_CHAR = 64;
	public static readonly R_BRACKET = 65;
	public static readonly ALT_R_BRACKET = 66;
	public static readonly U_CMD_FRAC = 67;
	public static readonly U_CMD_FRAC_INTS = 68;
	public static readonly U_CMD_CDOT = 69;
	public static readonly U_CMD_TIMES = 70;
	public static readonly U_CMD_SQRT = 71;
	public static readonly U_COMMA = 72;
	public static readonly U_CARET = 73;
	public static readonly U_NAME = 74;
	public static readonly U_L_PAREN = 75;
	public static readonly U_R_PAREN = 76;
	public static readonly U_L_BRACE = 77;
	public static readonly U_R_BRACE = 78;
	public static readonly U_ONE = 79;
	public static readonly U_NUMBER = 80;
	public static readonly U_CMD_LEFT = 81;
	public static readonly U_CMD_RIGHT = 82;
	public static readonly U_WS = 83;
	public static readonly U_SLASH_SPACE = 84;
	public static readonly U_ERROR_CHAR = 85;
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
	public static readonly RULE_expr = 24;
	public static readonly RULE_u_block = 25;
	public static readonly RULE_u_insert_matrix = 26;
	public static readonly RULE_u_fraction = 27;
	public static readonly RULE_u_expr = 28;
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
                                                            null, "'\\sim'", 
                                                            "'\\approx'", 
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
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\:'", null, 
                                                            "']'", "'\\rbrack'", 
                                                            null, null, 
                                                            null, "'\\times'", 
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
                                                             "CMD_SQRT", 
                                                             "CMD_SQRT_INT", 
                                                             "CMD_SIM", 
                                                             "CMD_APPROX", 
                                                             "BACK_SLASH", 
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
                                                             "NUMBER", "UNDERSCORE_SUBSCRIPT", 
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
		"guess", "guess_list", "condition_single", "condition_chain", "expr", 
		"u_block", "u_insert_matrix", "u_fraction", "u_expr",
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
			this.state = 73;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 58;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 59;
				this.assign_list();
				}
				break;
			case 3:
				{
				this.state = 60;
				this.assign_plus_query();
				}
				break;
			case 4:
				{
				this.state = 61;
				this.query();
				}
				break;
			case 5:
				{
				this.state = 62;
				this.equality();
				}
				break;
			case 6:
				{
				this.state = 63;
				this.u_block();
				}
				break;
			case 7:
				{
				this.state = 64;
				this.number_();
				}
				break;
			case 8:
				{
				this.state = 65;
				this.id();
				}
				break;
			case 9:
				{
				this.state = 66;
				this.id_list();
				}
				break;
			case 10:
				{
				this.state = 67;
				this.guess();
				}
				break;
			case 11:
				{
				this.state = 68;
				this.guess_list();
				}
				break;
			case 12:
				{
				this.state = 69;
				this.expr(0);
				}
				break;
			case 13:
				{
				this.state = 70;
				this.condition();
				}
				break;
			case 14:
				{
				this.state = 71;
				this.piecewise_assign();
				}
				break;
			case 15:
				{
				this.state = 72;
				this.insert_matrix();
				}
				break;
			}
			this.state = 75;
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
			this.state = 80;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 77;
					this.matchWildcard();
					}
					}
				}
				this.state = 82;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 83;
			this.u_insert_matrix();
			this.state = 87;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 84;
					this.matchWildcard();
					}
					}
				}
				this.state = 89;
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
			this.state = 90;
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
			this.state = 93;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===47) {
				{
				this.state = 92;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 95;
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
			this.state = 97;
			this.number_();
			this.state = 98;
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
			this.state = 102;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 60:
				{
				this.state = 100;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 101;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 104;
			this.match(LatexParser.EQ);
			this.state = 105;
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
			this.state = 107;
			this.assign();
			this.state = 110;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 108;
				this.match(LatexParser.COMMA);
				this.state = 109;
				this.assign();
				}
				}
				this.state = 112;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===54);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
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
			this.state = 114;
			this.assign();
			this.state = 115;
			this.match(LatexParser.EQ);
			this.state = 117;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 116;
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
			this.state = 119;
			this.expr(0);
			this.state = 120;
			this.match(LatexParser.EQ);
			this.state = 122;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 121;
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
			this.state = 124;
			this.expr(0);
			this.state = 125;
			this.match(LatexParser.EQ);
			this.state = 126;
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
			this.state = 130;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 60:
				{
				this.state = 128;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 129;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 132;
			this.match(LatexParser.EQ);
			this.state = 133;
			this.id();
			this.state = 134;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 135;
			this.piecewise_arg();
			this.state = 140;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===54) {
				{
				{
				this.state = 136;
				this.match(LatexParser.COMMA);
				this.state = 137;
				this.piecewise_arg();
				}
				}
				this.state = 142;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 143;
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
			this.state = 145;
			this.match(LatexParser.L_PAREN);
			this.state = 146;
			this.expr(0);
			this.state = 147;
			this.match(LatexParser.COMMA);
			this.state = 148;
			this.condition();
			this.state = 149;
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
			this.state = 152;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===23) {
				{
				this.state = 151;
				this.match(LatexParser.BACK_SLASH);
				}
			}

			this.state = 154;
			_la = this._input.LA(1);
			if(!(((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 8191) !== 0))) {
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
			this.state = 163;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
				{
				this.state = 156;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 12:
				{
				{
				this.state = 157;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 158;
				this.match(LatexParser.L_BRACE);
				this.state = 159;
				this.match(LatexParser.R_BRACE);
				this.state = 160;
				this.match(LatexParser.CARET);
				this.state = 161;
				this.match(LatexParser.L_BRACE);
				this.state = 162;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 165;
			this.match(LatexParser.L_PAREN);
			this.state = 166;
			this.expr(0);
			this.state = 167;
			this.match(LatexParser.R_PAREN);
			this.state = 174;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 168;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 169;
				this.match(LatexParser.L_BRACE);
				this.state = 170;
				this.id();
				this.state = 171;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 60:
				{
				this.state = 173;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 176;
			this.match(LatexParser.L_PAREN);
			this.state = 177;
			this.id();
			this.state = 178;
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
			this.state = 186;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				{
				this.state = 180;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 181;
				this.match(LatexParser.L_BRACE);
				this.state = 182;
				localctx._lower_lim_expr = this.expr(0);
				this.state = 183;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 13:
			case 14:
				{
				this.state = 185;
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
			this.state = 194;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 48:
				{
				{
				this.state = 188;
				this.match(LatexParser.CARET);
				this.state = 189;
				this.match(LatexParser.L_BRACE);
				this.state = 190;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 191;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 55:
			case 56:
				{
				this.state = 193;
				_la = this._input.LA(1);
				if(!(_la===55 || _la===56)) {
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
			this.match(LatexParser.L_PAREN);
			this.state = 197;
			localctx._integrand_expr = this.expr(0);
			this.state = 198;
			this.match(LatexParser.R_PAREN);
			this.state = 205;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 199;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 200;
				this.match(LatexParser.L_BRACE);
				this.state = 201;
				this.id();
				this.state = 202;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 60:
				{
				this.state = 204;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 207;
			this.match(LatexParser.L_PAREN);
			this.state = 208;
			this.id();
			this.state = 209;
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
			this.state = 211;
			this.match(LatexParser.CMD_FRAC);
			this.state = 212;
			this.match(LatexParser.L_BRACE);
			this.state = 219;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 213;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 214;
				this.match(LatexParser.L_BRACE);
				this.state = 215;
				this.id();
				this.state = 216;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 60:
				{
				this.state = 218;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 221;
			this.match(LatexParser.R_BRACE);
			this.state = 222;
			this.match(LatexParser.L_BRACE);
			this.state = 229;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 223;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 224;
				this.match(LatexParser.L_BRACE);
				this.state = 225;
				this.id();
				this.state = 226;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 60:
				{
				this.state = 228;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 231;
			this.match(LatexParser.L_PAREN);
			this.state = 232;
			this.id();
			this.state = 233;
			this.match(LatexParser.R_PAREN);
			this.state = 234;
			this.match(LatexParser.R_BRACE);
			this.state = 235;
			this.match(LatexParser.L_PAREN);
			this.state = 236;
			this.expr(0);
			this.state = 237;
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
			this.state = 239;
			this.match(LatexParser.CMD_FRAC);
			this.state = 240;
			this.match(LatexParser.L_BRACE);
			this.state = 247;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 241;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 242;
				this.match(LatexParser.L_BRACE);
				this.state = 243;
				this.id();
				this.state = 244;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 60:
				{
				this.state = 246;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 255;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 48:
				{
				{
				this.state = 249;
				this.match(LatexParser.CARET);
				this.state = 250;
				this.match(LatexParser.L_BRACE);
				this.state = 251;
				this.number_();
				this.state = 252;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 55:
				{
				this.state = 254;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 257;
			this.match(LatexParser.R_BRACE);
			this.state = 258;
			this.match(LatexParser.L_BRACE);
			this.state = 265;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 259;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 260;
				this.match(LatexParser.L_BRACE);
				this.state = 261;
				this.id();
				this.state = 262;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 60:
				{
				this.state = 264;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 267;
			this.match(LatexParser.L_PAREN);
			this.state = 268;
			this.id();
			this.state = 269;
			this.match(LatexParser.R_PAREN);
			this.state = 276;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 48:
				{
				{
				this.state = 270;
				this.match(LatexParser.CARET);
				this.state = 271;
				this.match(LatexParser.L_BRACE);
				this.state = 272;
				this.number_();
				this.state = 273;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 55:
				{
				this.state = 275;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
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
	public argument(): ArgumentContext {
		let localctx: ArgumentContext = new ArgumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, LatexParser.RULE_argument);
		let _la: number;
		try {
			this.state = 293;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 283;
				this.id();
				this.state = 284;
				this.match(LatexParser.EQ);
				this.state = 285;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 287;
				this.expr(0);
				this.state = 288;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===50 || _la===52)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 289;
				this.id();
				this.state = 290;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===50 || _la===52)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 291;
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
			this.state = 297;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 295;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 296;
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
			this.state = 299;
			this.id();
			this.state = 302;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 300;
				this.match(LatexParser.COMMA);
				this.state = 301;
				this.id();
				}
				}
				this.state = 304;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===54);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
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
			this.state = 306;
			this.id();
			this.state = 307;
			_la = this._input.LA(1);
			if(!(_la===21 || _la===22)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 310;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 308;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 309;
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
			this.state = 312;
			this.guess();
			this.state = 315;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 313;
				this.match(LatexParser.COMMA);
				this.state = 314;
				this.guess();
				}
				}
				this.state = 317;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===54);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
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
			this.state = 319;
			this.expr(0);
			this.state = 320;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 321;
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
			this.state = 323;
			this.expr(0);
			this.state = 324;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 325;
			this.expr(0);
			this.state = 326;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 327;
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
		let _startState: number = 48;
		this.enterRecursionRule(localctx, 48, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 447;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 330;
				this.id();
				this.state = 331;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 333;
				this.id();
				this.state = 334;
				_la = this._input.LA(1);
				if(!(_la===55 || _la===56)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 335;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 337;
				this.id();
				this.state = 338;
				this.match(LatexParser.CARET);
				this.state = 339;
				this.match(LatexParser.L_BRACE);
				this.state = 340;
				this.expr(0);
				this.state = 341;
				this.match(LatexParser.R_BRACE);
				this.state = 342;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SingleIntSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 344;
				this.match(LatexParser.CMD_SQRT_INT);
				}
				break;
			case 5:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 345;
				this.match(LatexParser.CMD_SQRT);
				this.state = 346;
				this.match(LatexParser.L_BRACE);
				this.state = 347;
				this.expr(0);
				this.state = 348;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 6:
				{
				localctx = new TrigContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 350;
				this.trig_function();
				this.state = 351;
				this.match(LatexParser.L_PAREN);
				this.state = 352;
				this.expr(0);
				this.state = 353;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 7:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 355;
				this.indefinite_integral_cmd();
				}
				break;
			case 8:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 356;
				this.integral_cmd();
				}
				break;
			case 9:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 357;
				this.derivative_cmd();
				}
				break;
			case 10:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 358;
				this.n_derivative_cmd();
				}
				break;
			case 11:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 360;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===23) {
					{
					this.state = 359;
					this.match(LatexParser.BACK_SLASH);
					}
				}

				this.state = 362;
				this.match(LatexParser.CMD_LN);
				this.state = 363;
				this.match(LatexParser.L_PAREN);
				this.state = 364;
				this.expr(0);
				this.state = 365;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 12:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 368;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===23) {
					{
					this.state = 367;
					this.match(LatexParser.BACK_SLASH);
					}
				}

				this.state = 370;
				this.match(LatexParser.CMD_LOG);
				this.state = 371;
				this.match(LatexParser.L_PAREN);
				this.state = 372;
				this.expr(0);
				this.state = 373;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 13:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 375;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 376;
				this.match(LatexParser.L_BRACE);
				this.state = 377;
				this.expr(0);
				this.state = 378;
				this.match(LatexParser.R_BRACE);
				this.state = 379;
				this.match(LatexParser.L_PAREN);
				this.state = 380;
				this.expr(0);
				this.state = 381;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 383;
				_la = this._input.LA(1);
				if(!(_la===40 || _la===41)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 384;
				this.match(LatexParser.L_PAREN);
				this.state = 385;
				this.expr(0);
				this.state = 386;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 15:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 388;
				this.match(LatexParser.VBAR);
				this.state = 389;
				this.expr(0);
				this.state = 390;
				this.match(LatexParser.VBAR);
				}
				break;
			case 16:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 392;
				this.number_with_units();
				}
				break;
			case 17:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 393;
				this.number_();
				}
				break;
			case 18:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 394;
				this.match(LatexParser.SUB);
				this.state = 395;
				this.expr(11);
				}
				break;
			case 19:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 396;
				this.match(LatexParser.CMD_FRAC);
				this.state = 397;
				this.match(LatexParser.L_BRACE);
				this.state = 398;
				this.expr(0);
				this.state = 399;
				this.match(LatexParser.R_BRACE);
				this.state = 400;
				this.match(LatexParser.L_BRACE);
				this.state = 401;
				this.expr(0);
				this.state = 402;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 20:
				{
				localctx = new DivideIntsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 404;
				this.match(LatexParser.CMD_FRAC_INTS);
				}
				break;
			case 21:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 405;
				this.id();
				}
				break;
			case 22:
				{
				localctx = new FunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 406;
				this.id();
				this.state = 407;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 408;
				this.argument();
				this.state = 413;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===54) {
					{
					{
					this.state = 409;
					this.match(LatexParser.COMMA);
					this.state = 410;
					this.argument();
					}
					}
					this.state = 415;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 416;
				this.match(LatexParser.R_PAREN);
				this.state = 421;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
				case 1:
					{
					this.state = 417;
					(localctx as FunctionContext)._points_id_0 = this.match(LatexParser.ID);
					this.state = 418;
					(localctx as FunctionContext)._num_points = this.number_();
					this.state = 419;
					(localctx as FunctionContext)._points_id_1 = this.match(LatexParser.ID);
					}
					break;
				}
				}
				break;
			case 23:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 429;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 15:
					{
					this.state = 423;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 424;
					this.match(LatexParser.L_BRACE);
					this.state = 425;
					this.id();
					this.state = 426;
					this.match(LatexParser.R_BRACE);
					}
					break;
				case 60:
					{
					this.state = 428;
					this.id();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 431;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 432;
				this.expr(0);
				this.state = 437;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===54) {
					{
					{
					this.state = 433;
					this.match(LatexParser.COMMA);
					this.state = 434;
					this.expr(0);
					}
					}
					this.state = 439;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 440;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 24:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 442;
				this.match(LatexParser.PI);
				}
				break;
			case 25:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 443;
				this.match(LatexParser.L_PAREN);
				this.state = 444;
				this.expr(0);
				this.state = 445;
				this.match(LatexParser.R_PAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 468;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 466;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 34, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 449;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 450;
						this.match(LatexParser.CMD_CDOT);
						this.state = 451;
						this.expr(11);
						}
						break;
					case 2:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 452;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 453;
						this.match(LatexParser.ADD);
						this.state = 454;
						this.expr(8);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 455;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 456;
						this.match(LatexParser.SUB);
						this.state = 457;
						this.expr(7);
						}
						break;
					case 4:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 458;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 459;
						_la = this._input.LA(1);
						if(!(_la===55 || _la===56)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 460;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 461;
						this.match(LatexParser.CARET);
						this.state = 462;
						this.match(LatexParser.L_BRACE);
						this.state = 463;
						this.expr(0);
						this.state = 464;
						this.match(LatexParser.R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 470;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
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
		this.enterRule(localctx, 50, LatexParser.RULE_u_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 471;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 472;
			this.u_expr(0);
			this.state = 473;
			_la = this._input.LA(1);
			if(!(_la===65 || _la===66)) {
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
		this.enterRule(localctx, 52, LatexParser.RULE_u_insert_matrix);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 475;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 476;
			localctx._numRows = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===79 || _la===80)) {
			    localctx._numRows = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 477;
			_la = this._input.LA(1);
			if(!(_la===70 || _la===72)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 478;
			localctx._numColumns = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===79 || _la===80)) {
			    localctx._numColumns = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 479;
			_la = this._input.LA(1);
			if(!(_la===65 || _la===66)) {
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
		this.enterRule(localctx, 54, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.state = 489;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 67:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 481;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 482;
				this.match(LatexParser.U_L_BRACE);
				this.state = 483;
				_la = this._input.LA(1);
				if(!(_la===79 || _la===80)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 484;
				this.match(LatexParser.U_R_BRACE);
				this.state = 485;
				this.match(LatexParser.U_L_BRACE);
				this.state = 486;
				this.match(LatexParser.U_NUMBER);
				this.state = 487;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 488;
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
		let _startState: number = 56;
		this.enterRecursionRule(localctx, 56, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 513;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 71:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 492;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 493;
				this.match(LatexParser.U_L_BRACE);
				this.state = 494;
				this.expr(0);
				this.state = 495;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 67:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 497;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 498;
				this.match(LatexParser.U_L_BRACE);
				this.state = 501;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 67:
				case 71:
				case 74:
				case 75:
					{
					this.state = 499;
					this.u_expr(0);
					}
					break;
				case 79:
					{
					this.state = 500;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 503;
				this.match(LatexParser.U_R_BRACE);
				this.state = 504;
				this.match(LatexParser.U_L_BRACE);
				this.state = 505;
				this.u_expr(0);
				this.state = 506;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 74:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 508;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 75:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 509;
				this.match(LatexParser.U_L_PAREN);
				this.state = 510;
				this.u_expr(0);
				this.state = 511;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 537;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 40, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 535;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 515;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 516;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 517;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 518;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 519;
						this.match(LatexParser.U_CARET);
						this.state = 520;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 521;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 522;
						this.match(LatexParser.U_CARET);
						this.state = 523;
						this.match(LatexParser.U_L_BRACE);
						this.state = 524;
						this.match(LatexParser.U_NUMBER);
						this.state = 525;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 526;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 527;
						this.match(LatexParser.U_CARET);
						this.state = 528;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 529;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 530;
						this.match(LatexParser.U_CARET);
						this.state = 531;
						this.match(LatexParser.U_L_BRACE);
						this.state = 532;
						this.u_fraction();
						this.state = 533;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 539;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 40, this._ctx);
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
		case 24:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 28:
			return this.u_expr_sempred(localctx as U_exprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 10);
		case 1:
			return this.precpred(this._ctx, 7);
		case 2:
			return this.precpred(this._ctx, 6);
		case 3:
			return this.precpred(this._ctx, 27);
		case 4:
			return this.precpred(this._ctx, 26);
		}
		return true;
	}
	private u_expr_sempred(localctx: U_exprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 5:
			return this.precpred(this._ctx, 4);
		case 6:
			return this.precpred(this._ctx, 9);
		case 7:
			return this.precpred(this._ctx, 8);
		case 8:
			return this.precpred(this._ctx, 7);
		case 9:
			return this.precpred(this._ctx, 6);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,85,541,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
	1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,0,74,8,0,1,0,1,0,1,1,5,1,79,8,1,10,1,
	12,1,82,9,1,1,1,1,1,5,1,86,8,1,10,1,12,1,89,9,1,1,2,1,2,1,3,3,3,94,8,3,
	1,3,1,3,1,4,1,4,1,4,1,5,1,5,3,5,103,8,5,1,5,1,5,1,5,1,6,1,6,1,6,4,6,111,
	8,6,11,6,12,6,112,1,7,1,7,1,7,3,7,118,8,7,1,8,1,8,1,8,3,8,123,8,8,1,9,1,
	9,1,9,1,9,1,10,1,10,3,10,131,8,10,1,10,1,10,1,10,1,10,1,10,1,10,5,10,139,
	8,10,10,10,12,10,142,9,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,12,
	3,12,153,8,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,164,8,13,
	1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,175,8,13,1,13,1,13,1,
	13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,3,14,187,8,14,1,14,1,14,1,14,1,14,
	1,14,1,14,3,14,195,8,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,
	14,206,8,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,
	3,15,220,8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,3,15,230,8,15,1,15,
	1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,
	16,3,16,248,8,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,256,8,16,1,16,1,16,
	1,16,1,16,1,16,1,16,1,16,1,16,3,16,266,8,16,1,16,1,16,1,16,1,16,1,16,1,
	16,1,16,1,16,1,16,3,16,277,8,16,1,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,
	1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,294,8,17,1,18,1,18,3,18,298,8,18,
	1,19,1,19,1,19,4,19,303,8,19,11,19,12,19,304,1,20,1,20,1,20,1,20,3,20,311,
	8,20,1,21,1,21,1,21,4,21,316,8,21,11,21,12,21,317,1,22,1,22,1,22,1,22,1,
	23,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,361,8,24,1,24,1,24,1,24,1,24,
	1,24,1,24,3,24,369,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,5,24,412,8,24,10,24,12,24,415,9,24,1,24,1,24,1,24,1,24,1,24,
	3,24,422,8,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,430,8,24,1,24,1,24,1,24,
	1,24,5,24,436,8,24,10,24,12,24,439,9,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,3,24,448,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,5,24,467,8,24,10,24,12,24,470,9,24,1,25,1,
	25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,26,1,27,1,27,1,27,1,27,1,27,1,27,
	1,27,1,27,3,27,490,8,27,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,3,28,502,8,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,3,28,
	514,8,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,
	28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,5,28,536,8,28,10,28,12,28,539,9,28,
	1,28,2,80,87,2,48,56,29,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
	36,38,40,42,44,46,48,50,52,54,56,0,11,1,0,24,36,1,0,13,14,1,0,55,56,2,0,
	50,50,52,52,1,0,21,22,1,0,50,53,1,0,40,41,1,0,1,2,1,0,65,66,1,0,79,80,2,
	0,70,70,72,72,597,0,73,1,0,0,0,2,80,1,0,0,0,4,90,1,0,0,0,6,93,1,0,0,0,8,
	97,1,0,0,0,10,102,1,0,0,0,12,107,1,0,0,0,14,114,1,0,0,0,16,119,1,0,0,0,
	18,124,1,0,0,0,20,130,1,0,0,0,22,145,1,0,0,0,24,152,1,0,0,0,26,163,1,0,
	0,0,28,186,1,0,0,0,30,211,1,0,0,0,32,239,1,0,0,0,34,293,1,0,0,0,36,297,
	1,0,0,0,38,299,1,0,0,0,40,306,1,0,0,0,42,312,1,0,0,0,44,319,1,0,0,0,46,
	323,1,0,0,0,48,447,1,0,0,0,50,471,1,0,0,0,52,475,1,0,0,0,54,489,1,0,0,0,
	56,513,1,0,0,0,58,74,3,10,5,0,59,74,3,12,6,0,60,74,3,14,7,0,61,74,3,16,
	8,0,62,74,3,18,9,0,63,74,3,50,25,0,64,74,3,6,3,0,65,74,3,4,2,0,66,74,3,
	38,19,0,67,74,3,40,20,0,68,74,3,42,21,0,69,74,3,48,24,0,70,74,3,36,18,0,
	71,74,3,20,10,0,72,74,3,2,1,0,73,58,1,0,0,0,73,59,1,0,0,0,73,60,1,0,0,0,
	73,61,1,0,0,0,73,62,1,0,0,0,73,63,1,0,0,0,73,64,1,0,0,0,73,65,1,0,0,0,73,
	66,1,0,0,0,73,67,1,0,0,0,73,68,1,0,0,0,73,69,1,0,0,0,73,70,1,0,0,0,73,71,
	1,0,0,0,73,72,1,0,0,0,73,74,1,0,0,0,74,75,1,0,0,0,75,76,5,0,0,1,76,1,1,
	0,0,0,77,79,9,0,0,0,78,77,1,0,0,0,79,82,1,0,0,0,80,81,1,0,0,0,80,78,1,0,
	0,0,81,83,1,0,0,0,82,80,1,0,0,0,83,87,3,52,26,0,84,86,9,0,0,0,85,84,1,0,
	0,0,86,89,1,0,0,0,87,88,1,0,0,0,87,85,1,0,0,0,88,3,1,0,0,0,89,87,1,0,0,
	0,90,91,5,60,0,0,91,5,1,0,0,0,92,94,5,47,0,0,93,92,1,0,0,0,93,94,1,0,0,
	0,94,95,1,0,0,0,95,96,5,57,0,0,96,7,1,0,0,0,97,98,3,6,3,0,98,99,3,50,25,
	0,99,9,1,0,0,0,100,103,3,4,2,0,101,103,5,10,0,0,102,100,1,0,0,0,102,101,
	1,0,0,0,103,104,1,0,0,0,104,105,5,49,0,0,105,106,3,48,24,0,106,11,1,0,0,
	0,107,110,3,10,5,0,108,109,5,54,0,0,109,111,3,10,5,0,110,108,1,0,0,0,111,
	112,1,0,0,0,112,110,1,0,0,0,112,113,1,0,0,0,113,13,1,0,0,0,114,115,3,10,
	5,0,115,117,5,49,0,0,116,118,3,50,25,0,117,116,1,0,0,0,117,118,1,0,0,0,
	118,15,1,0,0,0,119,120,3,48,24,0,120,122,5,49,0,0,121,123,3,50,25,0,122,
	121,1,0,0,0,122,123,1,0,0,0,123,17,1,0,0,0,124,125,3,48,24,0,125,126,5,
	49,0,0,126,127,3,48,24,0,127,19,1,0,0,0,128,131,3,4,2,0,129,131,5,10,0,
	0,130,128,1,0,0,0,130,129,1,0,0,0,131,132,1,0,0,0,132,133,5,49,0,0,133,
	134,3,4,2,0,134,135,5,6,0,0,135,140,3,22,11,0,136,137,5,54,0,0,137,139,
	3,22,11,0,138,136,1,0,0,0,139,142,1,0,0,0,140,138,1,0,0,0,140,141,1,0,0,
	0,141,143,1,0,0,0,142,140,1,0,0,0,143,144,5,7,0,0,144,21,1,0,0,0,145,146,
	5,6,0,0,146,147,3,48,24,0,147,148,5,54,0,0,148,149,3,36,18,0,149,150,5,
	7,0,0,150,23,1,0,0,0,151,153,5,23,0,0,152,151,1,0,0,0,152,153,1,0,0,0,153,
	154,1,0,0,0,154,155,7,0,0,0,155,25,1,0,0,0,156,164,5,11,0,0,157,158,5,12,
	0,0,158,159,5,4,0,0,159,160,5,5,0,0,160,161,5,48,0,0,161,162,5,4,0,0,162,
	164,5,5,0,0,163,156,1,0,0,0,163,157,1,0,0,0,164,165,1,0,0,0,165,166,5,6,
	0,0,166,167,3,48,24,0,167,174,5,7,0,0,168,169,5,15,0,0,169,170,5,4,0,0,
	170,171,3,4,2,0,171,172,5,5,0,0,172,175,1,0,0,0,173,175,3,4,2,0,174,168,
	1,0,0,0,174,173,1,0,0,0,175,176,1,0,0,0,176,177,5,6,0,0,177,178,3,4,2,0,
	178,179,5,7,0,0,179,27,1,0,0,0,180,181,5,12,0,0,181,182,5,4,0,0,182,183,
	3,48,24,0,183,184,5,5,0,0,184,187,1,0,0,0,185,187,7,1,0,0,186,180,1,0,0,
	0,186,185,1,0,0,0,187,194,1,0,0,0,188,189,5,48,0,0,189,190,5,4,0,0,190,
	191,3,48,24,0,191,192,5,5,0,0,192,195,1,0,0,0,193,195,7,2,0,0,194,188,1,
	0,0,0,194,193,1,0,0,0,195,196,1,0,0,0,196,197,5,6,0,0,197,198,3,48,24,0,
	198,205,5,7,0,0,199,200,5,15,0,0,200,201,5,4,0,0,201,202,3,4,2,0,202,203,
	5,5,0,0,203,206,1,0,0,0,204,206,3,4,2,0,205,199,1,0,0,0,205,204,1,0,0,0,
	206,207,1,0,0,0,207,208,5,6,0,0,208,209,3,4,2,0,209,210,5,7,0,0,210,29,
	1,0,0,0,211,212,5,16,0,0,212,219,5,4,0,0,213,214,5,15,0,0,214,215,5,4,0,
	0,215,216,3,4,2,0,216,217,5,5,0,0,217,220,1,0,0,0,218,220,3,4,2,0,219,213,
	1,0,0,0,219,218,1,0,0,0,220,221,1,0,0,0,221,222,5,5,0,0,222,229,5,4,0,0,
	223,224,5,15,0,0,224,225,5,4,0,0,225,226,3,4,2,0,226,227,5,5,0,0,227,230,
	1,0,0,0,228,230,3,4,2,0,229,223,1,0,0,0,229,228,1,0,0,0,230,231,1,0,0,0,
	231,232,5,6,0,0,232,233,3,4,2,0,233,234,5,7,0,0,234,235,5,5,0,0,235,236,
	5,6,0,0,236,237,3,48,24,0,237,238,5,7,0,0,238,31,1,0,0,0,239,240,5,16,0,
	0,240,247,5,4,0,0,241,242,5,15,0,0,242,243,5,4,0,0,243,244,3,4,2,0,244,
	245,5,5,0,0,245,248,1,0,0,0,246,248,3,4,2,0,247,241,1,0,0,0,247,246,1,0,
	0,0,248,255,1,0,0,0,249,250,5,48,0,0,250,251,5,4,0,0,251,252,3,6,3,0,252,
	253,5,5,0,0,253,256,1,0,0,0,254,256,5,55,0,0,255,249,1,0,0,0,255,254,1,
	0,0,0,256,257,1,0,0,0,257,258,5,5,0,0,258,265,5,4,0,0,259,260,5,15,0,0,
	260,261,5,4,0,0,261,262,3,4,2,0,262,263,5,5,0,0,263,266,1,0,0,0,264,266,
	3,4,2,0,265,259,1,0,0,0,265,264,1,0,0,0,266,267,1,0,0,0,267,268,5,6,0,0,
	268,269,3,4,2,0,269,276,5,7,0,0,270,271,5,48,0,0,271,272,5,4,0,0,272,273,
	3,6,3,0,273,274,5,5,0,0,274,277,1,0,0,0,275,277,5,55,0,0,276,270,1,0,0,
	0,276,275,1,0,0,0,277,278,1,0,0,0,278,279,5,5,0,0,279,280,5,6,0,0,280,281,
	3,48,24,0,281,282,5,7,0,0,282,33,1,0,0,0,283,284,3,4,2,0,284,285,5,49,0,
	0,285,286,3,48,24,0,286,294,1,0,0,0,287,288,3,48,24,0,288,289,7,3,0,0,289,
	290,3,4,2,0,290,291,7,3,0,0,291,292,3,48,24,0,292,294,1,0,0,0,293,283,1,
	0,0,0,293,287,1,0,0,0,294,35,1,0,0,0,295,298,3,44,22,0,296,298,3,46,23,
	0,297,295,1,0,0,0,297,296,1,0,0,0,298,37,1,0,0,0,299,302,3,4,2,0,300,301,
	5,54,0,0,301,303,3,4,2,0,302,300,1,0,0,0,303,304,1,0,0,0,304,302,1,0,0,
	0,304,305,1,0,0,0,305,39,1,0,0,0,306,307,3,4,2,0,307,310,7,4,0,0,308,311,
	3,6,3,0,309,311,3,8,4,0,310,308,1,0,0,0,310,309,1,0,0,0,311,41,1,0,0,0,
	312,315,3,40,20,0,313,314,5,54,0,0,314,316,3,40,20,0,315,313,1,0,0,0,316,
	317,1,0,0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,43,1,0,0,0,319,320,3,48,
	24,0,320,321,7,5,0,0,321,322,3,48,24,0,322,45,1,0,0,0,323,324,3,48,24,0,
	324,325,7,5,0,0,325,326,3,48,24,0,326,327,7,5,0,0,327,328,3,48,24,0,328,
	47,1,0,0,0,329,330,6,24,-1,0,330,331,3,4,2,0,331,332,5,59,0,0,332,448,1,
	0,0,0,333,334,3,4,2,0,334,335,7,2,0,0,335,336,5,58,0,0,336,448,1,0,0,0,
	337,338,3,4,2,0,338,339,5,48,0,0,339,340,5,4,0,0,340,341,3,48,24,0,341,
	342,5,5,0,0,342,343,5,58,0,0,343,448,1,0,0,0,344,448,5,20,0,0,345,346,5,
	19,0,0,346,347,5,4,0,0,347,348,3,48,24,0,348,349,5,5,0,0,349,448,1,0,0,
	0,350,351,3,24,12,0,351,352,5,6,0,0,352,353,3,48,24,0,353,354,5,7,0,0,354,
	448,1,0,0,0,355,448,3,26,13,0,356,448,3,28,14,0,357,448,3,30,15,0,358,448,
	3,32,16,0,359,361,5,23,0,0,360,359,1,0,0,0,360,361,1,0,0,0,361,362,1,0,
	0,0,362,363,5,37,0,0,363,364,5,6,0,0,364,365,3,48,24,0,365,366,5,7,0,0,
	366,448,1,0,0,0,367,369,5,23,0,0,368,367,1,0,0,0,368,369,1,0,0,0,369,370,
	1,0,0,0,370,371,5,38,0,0,371,372,5,6,0,0,372,373,3,48,24,0,373,374,5,7,
	0,0,374,448,1,0,0,0,375,376,5,39,0,0,376,377,5,4,0,0,377,378,3,48,24,0,
	378,379,5,5,0,0,379,380,5,6,0,0,380,381,3,48,24,0,381,382,5,7,0,0,382,448,
	1,0,0,0,383,384,7,6,0,0,384,385,5,6,0,0,385,386,3,48,24,0,386,387,5,7,0,
	0,387,448,1,0,0,0,388,389,5,8,0,0,389,390,3,48,24,0,390,391,5,8,0,0,391,
	448,1,0,0,0,392,448,3,8,4,0,393,448,3,6,3,0,394,395,5,47,0,0,395,448,3,
	48,24,11,396,397,5,16,0,0,397,398,5,4,0,0,398,399,3,48,24,0,399,400,5,5,
	0,0,400,401,5,4,0,0,401,402,3,48,24,0,402,403,5,5,0,0,403,448,1,0,0,0,404,
	448,5,17,0,0,405,448,3,4,2,0,406,407,3,4,2,0,407,408,5,6,0,0,408,413,3,
	34,17,0,409,410,5,54,0,0,410,412,3,34,17,0,411,409,1,0,0,0,412,415,1,0,
	0,0,413,411,1,0,0,0,413,414,1,0,0,0,414,416,1,0,0,0,415,413,1,0,0,0,416,
	421,5,7,0,0,417,418,5,60,0,0,418,419,3,6,3,0,419,420,5,60,0,0,420,422,1,
	0,0,0,421,417,1,0,0,0,421,422,1,0,0,0,422,448,1,0,0,0,423,424,5,15,0,0,
	424,425,5,4,0,0,425,426,3,4,2,0,426,427,5,5,0,0,427,430,1,0,0,0,428,430,
	3,4,2,0,429,423,1,0,0,0,429,428,1,0,0,0,430,431,1,0,0,0,431,432,5,6,0,0,
	432,437,3,48,24,0,433,434,5,54,0,0,434,436,3,48,24,0,435,433,1,0,0,0,436,
	439,1,0,0,0,437,435,1,0,0,0,437,438,1,0,0,0,438,440,1,0,0,0,439,437,1,0,
	0,0,440,441,5,7,0,0,441,448,1,0,0,0,442,448,5,10,0,0,443,444,5,6,0,0,444,
	445,3,48,24,0,445,446,5,7,0,0,446,448,1,0,0,0,447,329,1,0,0,0,447,333,1,
	0,0,0,447,337,1,0,0,0,447,344,1,0,0,0,447,345,1,0,0,0,447,350,1,0,0,0,447,
	355,1,0,0,0,447,356,1,0,0,0,447,357,1,0,0,0,447,358,1,0,0,0,447,360,1,0,
	0,0,447,368,1,0,0,0,447,375,1,0,0,0,447,383,1,0,0,0,447,388,1,0,0,0,447,
	392,1,0,0,0,447,393,1,0,0,0,447,394,1,0,0,0,447,396,1,0,0,0,447,404,1,0,
	0,0,447,405,1,0,0,0,447,406,1,0,0,0,447,429,1,0,0,0,447,442,1,0,0,0,447,
	443,1,0,0,0,448,468,1,0,0,0,449,450,10,10,0,0,450,451,5,18,0,0,451,467,
	3,48,24,11,452,453,10,7,0,0,453,454,5,46,0,0,454,467,3,48,24,8,455,456,
	10,6,0,0,456,457,5,47,0,0,457,467,3,48,24,7,458,459,10,27,0,0,459,467,7,
	2,0,0,460,461,10,26,0,0,461,462,5,48,0,0,462,463,5,4,0,0,463,464,3,48,24,
	0,464,465,5,5,0,0,465,467,1,0,0,0,466,449,1,0,0,0,466,452,1,0,0,0,466,455,
	1,0,0,0,466,458,1,0,0,0,466,460,1,0,0,0,467,470,1,0,0,0,468,466,1,0,0,0,
	468,469,1,0,0,0,469,49,1,0,0,0,470,468,1,0,0,0,471,472,7,7,0,0,472,473,
	3,56,28,0,473,474,7,8,0,0,474,51,1,0,0,0,475,476,7,7,0,0,476,477,7,9,0,
	0,477,478,7,10,0,0,478,479,7,9,0,0,479,480,7,8,0,0,480,53,1,0,0,0,481,482,
	5,67,0,0,482,483,5,77,0,0,483,484,7,9,0,0,484,485,5,78,0,0,485,486,5,77,
	0,0,486,487,5,80,0,0,487,490,5,78,0,0,488,490,5,68,0,0,489,481,1,0,0,0,
	489,488,1,0,0,0,490,55,1,0,0,0,491,492,6,28,-1,0,492,493,5,71,0,0,493,494,
	5,77,0,0,494,495,3,48,24,0,495,496,5,78,0,0,496,514,1,0,0,0,497,498,5,67,
	0,0,498,501,5,77,0,0,499,502,3,56,28,0,500,502,5,79,0,0,501,499,1,0,0,0,
	501,500,1,0,0,0,502,503,1,0,0,0,503,504,5,78,0,0,504,505,5,77,0,0,505,506,
	3,56,28,0,506,507,5,78,0,0,507,514,1,0,0,0,508,514,5,74,0,0,509,510,5,75,
	0,0,510,511,3,56,28,0,511,512,5,76,0,0,512,514,1,0,0,0,513,491,1,0,0,0,
	513,497,1,0,0,0,513,508,1,0,0,0,513,509,1,0,0,0,514,537,1,0,0,0,515,516,
	10,4,0,0,516,517,5,69,0,0,517,536,3,56,28,5,518,519,10,9,0,0,519,520,5,
	73,0,0,520,536,5,80,0,0,521,522,10,8,0,0,522,523,5,73,0,0,523,524,5,77,
	0,0,524,525,5,80,0,0,525,536,5,78,0,0,526,527,10,7,0,0,527,528,5,73,0,0,
	528,536,3,54,27,0,529,530,10,6,0,0,530,531,5,73,0,0,531,532,5,77,0,0,532,
	533,3,54,27,0,533,534,5,78,0,0,534,536,1,0,0,0,535,515,1,0,0,0,535,518,
	1,0,0,0,535,521,1,0,0,0,535,526,1,0,0,0,535,529,1,0,0,0,536,539,1,0,0,0,
	537,535,1,0,0,0,537,538,1,0,0,0,538,57,1,0,0,0,539,537,1,0,0,0,41,73,80,
	87,93,102,112,117,122,130,140,152,163,174,186,194,205,219,229,247,255,265,
	276,293,297,304,310,317,360,368,413,421,429,437,447,466,468,489,501,513,
	535,537];

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
	public BACK_SLASH(): TerminalNode {
		return this.getToken(LatexParser.BACK_SLASH, 0);
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
	public BACK_SLASH(): TerminalNode {
		return this.getToken(LatexParser.BACK_SLASH, 0);
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
	public BACK_SLASH(): TerminalNode {
		return this.getToken(LatexParser.BACK_SLASH, 0);
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
