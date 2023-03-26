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
	public static readonly CMD_CDOT = 17;
	public static readonly CMD_SQRT = 18;
	public static readonly CMD_SIM = 19;
	public static readonly CMD_APPROX = 20;
	public static readonly BACK_SLASH = 21;
	public static readonly CMD_SIN = 22;
	public static readonly CMD_COS = 23;
	public static readonly CMD_TAN = 24;
	public static readonly CMD_COT = 25;
	public static readonly CMD_SEC = 26;
	public static readonly CMD_CSC = 27;
	public static readonly CMD_ARCSIN = 28;
	public static readonly CMD_ARCCOS = 29;
	public static readonly CMD_ARCTAN = 30;
	public static readonly CMD_SINH = 31;
	public static readonly CMD_COSH = 32;
	public static readonly CMD_TANH = 33;
	public static readonly CMD_COTH = 34;
	public static readonly CMD_LN = 35;
	public static readonly CMD_LOG = 36;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 37;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER = 38;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID = 39;
	public static readonly CMD_LEFT = 40;
	public static readonly CMD_RIGHT = 41;
	public static readonly DOUBLE_DOLLAR_SIGN = 42;
	public static readonly ADD = 43;
	public static readonly SUB = 44;
	public static readonly CARET = 45;
	public static readonly EQ = 46;
	public static readonly LT = 47;
	public static readonly GT = 48;
	public static readonly LTE = 49;
	public static readonly GTE = 50;
	public static readonly COMMA = 51;
	public static readonly CARET_SINGLE_CHAR_NUMBER = 52;
	public static readonly CARET_SINGLE_CHAR_ID = 53;
	public static readonly NUMBER = 54;
	public static readonly UNDERSCORE_SUBSCRIPT = 55;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 56;
	public static readonly ID = 57;
	public static readonly WS = 58;
	public static readonly SLASH_SPACE = 59;
	public static readonly SLASH_COLON = 60;
	public static readonly ERROR_CHAR = 61;
	public static readonly R_BRACKET = 62;
	public static readonly ALT_R_BRACKET = 63;
	public static readonly U_CMD_FRAC = 64;
	public static readonly U_CMD_CDOT = 65;
	public static readonly U_CMD_SQRT = 66;
	public static readonly U_CARET = 67;
	public static readonly U_NAME = 68;
	public static readonly U_L_PAREN = 69;
	public static readonly U_R_PAREN = 70;
	public static readonly U_L_BRACE = 71;
	public static readonly U_R_BRACE = 72;
	public static readonly U_ONE = 73;
	public static readonly U_NUMBER = 74;
	public static readonly U_CMD_LEFT = 75;
	public static readonly U_CMD_RIGHT = 76;
	public static readonly U_WS = 77;
	public static readonly U_SLASH_SPACE = 78;
	public static readonly U_ERROR_CHAR = 79;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_id = 0;
	public static readonly RULE_number = 1;
	public static readonly RULE_number_with_units = 2;
	public static readonly RULE_statement = 3;
	public static readonly RULE_assign = 4;
	public static readonly RULE_query = 5;
	public static readonly RULE_equality = 6;
	public static readonly RULE_piecewise_assign = 7;
	public static readonly RULE_piecewise_arg = 8;
	public static readonly RULE_trig_function = 9;
	public static readonly RULE_indefinite_integral_cmd = 10;
	public static readonly RULE_integral_cmd = 11;
	public static readonly RULE_derivative_cmd = 12;
	public static readonly RULE_n_derivative_cmd = 13;
	public static readonly RULE_argument = 14;
	public static readonly RULE_condition = 15;
	public static readonly RULE_id_list = 16;
	public static readonly RULE_guess = 17;
	public static readonly RULE_guess_list = 18;
	public static readonly RULE_condition_single = 19;
	public static readonly RULE_condition_chain = 20;
	public static readonly RULE_expr = 21;
	public static readonly RULE_u_block = 22;
	public static readonly RULE_u_fraction = 23;
	public static readonly RULE_u_expr = 24;
	public static readonly literalNames: (string | null)[] = [ null, "'['", 
                                                            "'\\lbrack'", 
                                                            "';'", null, 
                                                            null, null, 
                                                            null, "'|'", 
                                                            "'_'", "'\\pi'", 
                                                            "'\\int'", "'\\int_'", 
                                                            "'\\int_[0-9]'", 
                                                            "'\\int_[a-zA-Z]'", 
                                                            "'\\mathrm'", 
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
                                                            "'\\log_'", 
                                                            null, null, 
                                                            null, null, 
                                                            "'$$'", "'+'", 
                                                            "'-'", null, 
                                                            "'='", "'<'", 
                                                            "'>'", "'\\le'", 
                                                            "'\\ge'", "','", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\:'", null, 
                                                            "']'", "'\\rbrack'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'1'" ];
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
                                                             "CMD_CDOT", 
                                                             "CMD_SQRT", 
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
                                                             "U_CMD_CDOT", 
                                                             "U_CMD_SQRT", 
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
		"id", "number", "number_with_units", "statement", "assign", "query", "equality", 
		"piecewise_assign", "piecewise_arg", "trig_function", "indefinite_integral_cmd", 
		"integral_cmd", "derivative_cmd", "n_derivative_cmd", "argument", "condition", 
		"id_list", "guess", "guess_list", "condition_single", "condition_chain", 
		"expr", "u_block", "u_fraction", "u_expr",
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
	public id(): IdContext {
		let localctx: IdContext = new IdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, LatexParser.RULE_id);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 50;
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
		this.enterRule(localctx, 2, LatexParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 53;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===44) {
				{
				this.state = 52;
				this.match(LatexParser.SUB);
				}
			}

			this.state = 55;
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
		this.enterRule(localctx, 4, LatexParser.RULE_number_with_units);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 57;
			this.number_();
			this.state = 58;
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
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, LatexParser.RULE_statement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 72;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 60;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 61;
				this.query();
				}
				break;
			case 3:
				{
				this.state = 62;
				this.equality();
				}
				break;
			case 4:
				{
				this.state = 63;
				this.u_block();
				}
				break;
			case 5:
				{
				this.state = 64;
				this.number_();
				}
				break;
			case 6:
				{
				this.state = 65;
				this.id();
				}
				break;
			case 7:
				{
				this.state = 66;
				this.id_list();
				}
				break;
			case 8:
				{
				this.state = 67;
				this.guess();
				}
				break;
			case 9:
				{
				this.state = 68;
				this.guess_list();
				}
				break;
			case 10:
				{
				this.state = 69;
				this.expr(0);
				}
				break;
			case 11:
				{
				this.state = 70;
				this.condition();
				}
				break;
			case 12:
				{
				this.state = 71;
				this.piecewise_assign();
				}
				break;
			}
			this.state = 74;
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
	public assign(): AssignContext {
		let localctx: AssignContext = new AssignContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, LatexParser.RULE_assign);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 78;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				this.state = 76;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 77;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 80;
			this.match(LatexParser.EQ);
			this.state = 81;
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
	public query(): QueryContext {
		let localctx: QueryContext = new QueryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, LatexParser.RULE_query);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 83;
			this.expr(0);
			this.state = 84;
			this.match(LatexParser.EQ);
			this.state = 86;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 85;
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
		this.enterRule(localctx, 12, LatexParser.RULE_equality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 88;
			this.expr(0);
			this.state = 89;
			this.match(LatexParser.EQ);
			this.state = 90;
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
		this.enterRule(localctx, 14, LatexParser.RULE_piecewise_assign);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 94;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 57:
				{
				this.state = 92;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 93;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 96;
			this.match(LatexParser.EQ);
			this.state = 97;
			this.id();
			this.state = 98;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 99;
			this.piecewise_arg();
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===51) {
				{
				{
				this.state = 100;
				this.match(LatexParser.COMMA);
				this.state = 101;
				this.piecewise_arg();
				}
				}
				this.state = 106;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 107;
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
		this.enterRule(localctx, 16, LatexParser.RULE_piecewise_arg);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 109;
			this.match(LatexParser.L_PAREN);
			this.state = 110;
			this.expr(0);
			this.state = 111;
			this.match(LatexParser.COMMA);
			this.state = 112;
			this.condition();
			this.state = 113;
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
		this.enterRule(localctx, 18, LatexParser.RULE_trig_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 116;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===21) {
				{
				this.state = 115;
				this.match(LatexParser.BACK_SLASH);
				}
			}

			this.state = 118;
			_la = this._input.LA(1);
			if(!(((((_la - 22)) & ~0x1F) === 0 && ((1 << (_la - 22)) & 8191) !== 0))) {
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
		this.enterRule(localctx, 20, LatexParser.RULE_indefinite_integral_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 127;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
				{
				this.state = 120;
				this.match(LatexParser.CMD_INT);
				}
				break;
			case 12:
				{
				{
				this.state = 121;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 122;
				this.match(LatexParser.L_BRACE);
				this.state = 123;
				this.match(LatexParser.R_BRACE);
				this.state = 124;
				this.match(LatexParser.CARET);
				this.state = 125;
				this.match(LatexParser.L_BRACE);
				this.state = 126;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 129;
			this.match(LatexParser.L_PAREN);
			this.state = 130;
			this.expr(0);
			this.state = 131;
			this.match(LatexParser.R_PAREN);
			this.state = 138;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 132;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 133;
				this.match(LatexParser.L_BRACE);
				this.state = 134;
				this.id();
				this.state = 135;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 57:
				{
				this.state = 137;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 140;
			this.match(LatexParser.L_PAREN);
			this.state = 141;
			this.id();
			this.state = 142;
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
		this.enterRule(localctx, 22, LatexParser.RULE_integral_cmd);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 153;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				{
				this.state = 144;
				this.match(LatexParser.CMD_INT_UNDERSCORE);
				this.state = 150;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 4:
					{
					{
					this.state = 145;
					this.match(LatexParser.L_BRACE);
					this.state = 146;
					localctx._lower_lim_expr = this.expr(0);
					this.state = 147;
					this.match(LatexParser.R_BRACE);
					}
					}
					break;
				case 6:
				case 8:
				case 10:
				case 11:
				case 12:
				case 13:
				case 14:
				case 15:
				case 16:
				case 18:
				case 21:
				case 22:
				case 23:
				case 24:
				case 25:
				case 26:
				case 27:
				case 28:
				case 29:
				case 30:
				case 31:
				case 32:
				case 33:
				case 34:
				case 35:
				case 36:
				case 37:
				case 38:
				case 39:
				case 44:
				case 54:
				case 57:
					{
					{
					this.state = 149;
					localctx._lower_lim_expr = this.expr(0);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				break;
			case 13:
			case 14:
				{
				this.state = 152;
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
			this.state = 161;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 45:
				{
				{
				this.state = 155;
				this.match(LatexParser.CARET);
				this.state = 156;
				this.match(LatexParser.L_BRACE);
				this.state = 157;
				localctx._upper_lim_expr = this.expr(0);
				this.state = 158;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 52:
			case 53:
				{
				this.state = 160;
				_la = this._input.LA(1);
				if(!(_la===52 || _la===53)) {
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
			this.state = 163;
			this.match(LatexParser.L_PAREN);
			this.state = 164;
			localctx._integrand_expr = this.expr(0);
			this.state = 165;
			this.match(LatexParser.R_PAREN);
			this.state = 172;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 166;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 167;
				this.match(LatexParser.L_BRACE);
				this.state = 168;
				this.id();
				this.state = 169;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 57:
				{
				this.state = 171;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 174;
			this.match(LatexParser.L_PAREN);
			this.state = 175;
			this.id();
			this.state = 176;
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
		this.enterRule(localctx, 24, LatexParser.RULE_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 178;
			this.match(LatexParser.CMD_FRAC);
			this.state = 179;
			this.match(LatexParser.L_BRACE);
			this.state = 186;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 180;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 181;
				this.match(LatexParser.L_BRACE);
				this.state = 182;
				this.id();
				this.state = 183;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 57:
				{
				this.state = 185;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 188;
			this.match(LatexParser.R_BRACE);
			this.state = 189;
			this.match(LatexParser.L_BRACE);
			this.state = 196;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 190;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 191;
				this.match(LatexParser.L_BRACE);
				this.state = 192;
				this.id();
				this.state = 193;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 57:
				{
				this.state = 195;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 198;
			this.match(LatexParser.L_PAREN);
			this.state = 199;
			this.id();
			this.state = 200;
			this.match(LatexParser.R_PAREN);
			this.state = 201;
			this.match(LatexParser.R_BRACE);
			this.state = 202;
			this.match(LatexParser.L_PAREN);
			this.state = 203;
			this.expr(0);
			this.state = 204;
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
		this.enterRule(localctx, 26, LatexParser.RULE_n_derivative_cmd);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 206;
			this.match(LatexParser.CMD_FRAC);
			this.state = 207;
			this.match(LatexParser.L_BRACE);
			this.state = 214;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 208;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 209;
				this.match(LatexParser.L_BRACE);
				this.state = 210;
				this.id();
				this.state = 211;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 57:
				{
				this.state = 213;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 222;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 45:
				{
				{
				this.state = 216;
				this.match(LatexParser.CARET);
				this.state = 217;
				this.match(LatexParser.L_BRACE);
				this.state = 218;
				this.number_();
				this.state = 219;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 52:
				{
				this.state = 221;
				localctx._single_char_exp1 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 224;
			this.match(LatexParser.R_BRACE);
			this.state = 225;
			this.match(LatexParser.L_BRACE);
			this.state = 232;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				{
				this.state = 226;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 227;
				this.match(LatexParser.L_BRACE);
				this.state = 228;
				this.id();
				this.state = 229;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 57:
				{
				this.state = 231;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 234;
			this.match(LatexParser.L_PAREN);
			this.state = 235;
			this.id();
			this.state = 236;
			this.match(LatexParser.R_PAREN);
			this.state = 243;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 45:
				{
				{
				this.state = 237;
				this.match(LatexParser.CARET);
				this.state = 238;
				this.match(LatexParser.L_BRACE);
				this.state = 239;
				this.number_();
				this.state = 240;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 52:
				{
				this.state = 242;
				localctx._single_char_exp2 = this.match(LatexParser.CARET_SINGLE_CHAR_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 245;
			this.match(LatexParser.R_BRACE);
			this.state = 246;
			this.match(LatexParser.L_PAREN);
			this.state = 247;
			this.expr(0);
			this.state = 248;
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
		this.enterRule(localctx, 28, LatexParser.RULE_argument);
		let _la: number;
		try {
			this.state = 260;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 250;
				this.id();
				this.state = 251;
				this.match(LatexParser.EQ);
				this.state = 252;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 254;
				this.expr(0);
				this.state = 255;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===47 || _la===49)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 256;
				this.id();
				this.state = 257;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===47 || _la===49)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 258;
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
		this.enterRule(localctx, 30, LatexParser.RULE_condition);
		try {
			this.state = 264;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 262;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 263;
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
		this.enterRule(localctx, 32, LatexParser.RULE_id_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 266;
			this.id();
			this.state = 269;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 267;
				this.match(LatexParser.COMMA);
				this.state = 268;
				this.id();
				}
				}
				this.state = 271;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===51);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
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
		this.enterRule(localctx, 34, LatexParser.RULE_guess);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 273;
			this.id();
			this.state = 274;
			_la = this._input.LA(1);
			if(!(_la===19 || _la===20)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 277;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 275;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 276;
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
		this.enterRule(localctx, 36, LatexParser.RULE_guess_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 279;
			this.guess();
			this.state = 282;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 280;
				this.match(LatexParser.COMMA);
				this.state = 281;
				this.guess();
				}
				}
				this.state = 284;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===51);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
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
		this.enterRule(localctx, 38, LatexParser.RULE_condition_single);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 286;
			this.expr(0);
			this.state = 287;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
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
	public condition_chain(): Condition_chainContext {
		let localctx: Condition_chainContext = new Condition_chainContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, LatexParser.RULE_condition_chain);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 290;
			this.expr(0);
			this.state = 291;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 292;
			this.expr(0);
			this.state = 293;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 294;
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
		let _startState: number = 42;
		this.enterRecursionRule(localctx, 42, LatexParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 412;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 297;
				this.id();
				this.state = 298;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 300;
				this.id();
				this.state = 301;
				_la = this._input.LA(1);
				if(!(_la===52 || _la===53)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 302;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 304;
				this.id();
				this.state = 305;
				this.match(LatexParser.CARET);
				this.state = 306;
				this.match(LatexParser.L_BRACE);
				this.state = 307;
				this.expr(0);
				this.state = 308;
				this.match(LatexParser.R_BRACE);
				this.state = 309;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 311;
				this.match(LatexParser.CMD_SQRT);
				this.state = 312;
				this.match(LatexParser.L_BRACE);
				this.state = 313;
				this.expr(0);
				this.state = 314;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 5:
				{
				localctx = new TrigContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 316;
				this.trig_function();
				this.state = 317;
				this.match(LatexParser.L_PAREN);
				this.state = 318;
				this.expr(0);
				this.state = 319;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 6:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 321;
				this.indefinite_integral_cmd();
				}
				break;
			case 7:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 322;
				this.integral_cmd();
				}
				break;
			case 8:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 323;
				this.derivative_cmd();
				}
				break;
			case 9:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 324;
				this.n_derivative_cmd();
				}
				break;
			case 10:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 326;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===21) {
					{
					this.state = 325;
					this.match(LatexParser.BACK_SLASH);
					}
				}

				this.state = 328;
				this.match(LatexParser.CMD_LN);
				this.state = 329;
				this.match(LatexParser.L_PAREN);
				this.state = 330;
				this.expr(0);
				this.state = 331;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 11:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 334;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===21) {
					{
					this.state = 333;
					this.match(LatexParser.BACK_SLASH);
					}
				}

				this.state = 336;
				this.match(LatexParser.CMD_LOG);
				this.state = 337;
				this.match(LatexParser.L_PAREN);
				this.state = 338;
				this.expr(0);
				this.state = 339;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 12:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 341;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 342;
				this.match(LatexParser.L_BRACE);
				this.state = 343;
				this.expr(0);
				this.state = 344;
				this.match(LatexParser.R_BRACE);
				this.state = 345;
				this.match(LatexParser.L_PAREN);
				this.state = 346;
				this.expr(0);
				this.state = 347;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 13:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 349;
				_la = this._input.LA(1);
				if(!(_la===38 || _la===39)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 350;
				this.match(LatexParser.L_PAREN);
				this.state = 351;
				this.expr(0);
				this.state = 352;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 354;
				this.match(LatexParser.VBAR);
				this.state = 355;
				this.expr(0);
				this.state = 356;
				this.match(LatexParser.VBAR);
				}
				break;
			case 15:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 358;
				this.number_with_units();
				}
				break;
			case 16:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 359;
				this.number_();
				}
				break;
			case 17:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 360;
				this.match(LatexParser.SUB);
				this.state = 361;
				this.expr(10);
				}
				break;
			case 18:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 362;
				this.match(LatexParser.CMD_FRAC);
				this.state = 363;
				this.match(LatexParser.L_BRACE);
				this.state = 364;
				this.expr(0);
				this.state = 365;
				this.match(LatexParser.R_BRACE);
				this.state = 366;
				this.match(LatexParser.L_BRACE);
				this.state = 367;
				this.expr(0);
				this.state = 368;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 19:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 370;
				this.id();
				}
				break;
			case 20:
				{
				localctx = new FunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 371;
				this.id();
				this.state = 372;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 373;
				this.argument();
				this.state = 378;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===51) {
					{
					{
					this.state = 374;
					this.match(LatexParser.COMMA);
					this.state = 375;
					this.argument();
					}
					}
					this.state = 380;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 381;
				this.match(LatexParser.R_PAREN);
				this.state = 386;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
				case 1:
					{
					this.state = 382;
					(localctx as FunctionContext)._points_id_0 = this.match(LatexParser.ID);
					this.state = 383;
					(localctx as FunctionContext)._num_points = this.number_();
					this.state = 384;
					(localctx as FunctionContext)._points_id_1 = this.match(LatexParser.ID);
					}
					break;
				}
				}
				break;
			case 21:
				{
				localctx = new BuiltinFunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 394;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 15:
					{
					this.state = 388;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 389;
					this.match(LatexParser.L_BRACE);
					this.state = 390;
					this.id();
					this.state = 391;
					this.match(LatexParser.R_BRACE);
					}
					break;
				case 57:
					{
					this.state = 393;
					this.id();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 396;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 397;
				this.expr(0);
				this.state = 402;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===51) {
					{
					{
					this.state = 398;
					this.match(LatexParser.COMMA);
					this.state = 399;
					this.expr(0);
					}
					}
					this.state = 404;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 405;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 22:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 407;
				this.match(LatexParser.PI);
				}
				break;
			case 23:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 408;
				this.match(LatexParser.L_PAREN);
				this.state = 409;
				this.expr(0);
				this.state = 410;
				this.match(LatexParser.R_PAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 433;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 431;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 414;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 415;
						this.match(LatexParser.CMD_CDOT);
						this.state = 416;
						this.expr(10);
						}
						break;
					case 2:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 417;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 418;
						this.match(LatexParser.ADD);
						this.state = 419;
						this.expr(8);
						}
						break;
					case 3:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 420;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 421;
						this.match(LatexParser.SUB);
						this.state = 422;
						this.expr(7);
						}
						break;
					case 4:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 423;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 424;
						_la = this._input.LA(1);
						if(!(_la===52 || _la===53)) {
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
						this.state = 425;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 426;
						this.match(LatexParser.CARET);
						this.state = 427;
						this.match(LatexParser.L_BRACE);
						this.state = 428;
						this.expr(0);
						this.state = 429;
						this.match(LatexParser.R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 435;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
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
		this.enterRule(localctx, 44, LatexParser.RULE_u_block);
		let _la: number;
		try {
			localctx = new UnitBlockContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 436;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 437;
			this.u_expr(0);
			this.state = 438;
			_la = this._input.LA(1);
			if(!(_la===62 || _la===63)) {
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
		this.enterRule(localctx, 46, LatexParser.RULE_u_fraction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 440;
			this.match(LatexParser.U_CMD_FRAC);
			this.state = 441;
			this.match(LatexParser.U_L_BRACE);
			this.state = 442;
			_la = this._input.LA(1);
			if(!(_la===73 || _la===74)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 443;
			this.match(LatexParser.U_R_BRACE);
			this.state = 444;
			this.match(LatexParser.U_L_BRACE);
			this.state = 445;
			this.match(LatexParser.U_NUMBER);
			this.state = 446;
			this.match(LatexParser.U_R_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
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
		let _startState: number = 48;
		this.enterRecursionRule(localctx, 48, LatexParser.RULE_u_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 470;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 66:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 449;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 450;
				this.match(LatexParser.U_L_BRACE);
				this.state = 451;
				this.expr(0);
				this.state = 452;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 64:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 454;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 455;
				this.match(LatexParser.U_L_BRACE);
				this.state = 458;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 64:
				case 66:
				case 68:
				case 69:
					{
					this.state = 456;
					this.u_expr(0);
					}
					break;
				case 73:
					{
					this.state = 457;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 460;
				this.match(LatexParser.U_R_BRACE);
				this.state = 461;
				this.match(LatexParser.U_L_BRACE);
				this.state = 462;
				this.u_expr(0);
				this.state = 463;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 68:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 465;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 69:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 466;
				this.match(LatexParser.U_L_PAREN);
				this.state = 467;
				this.u_expr(0);
				this.state = 468;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 494;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 492;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 35, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 472;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 473;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 474;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 475;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 476;
						this.match(LatexParser.U_CARET);
						this.state = 477;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 478;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 479;
						this.match(LatexParser.U_CARET);
						this.state = 480;
						this.match(LatexParser.U_L_BRACE);
						this.state = 481;
						this.match(LatexParser.U_NUMBER);
						this.state = 482;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 483;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 484;
						this.match(LatexParser.U_CARET);
						this.state = 485;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 486;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 487;
						this.match(LatexParser.U_CARET);
						this.state = 488;
						this.match(LatexParser.U_L_BRACE);
						this.state = 489;
						this.u_fraction();
						this.state = 490;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 496;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
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
		case 21:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		case 24:
			return this.u_expr_sempred(localctx as U_exprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 9);
		case 1:
			return this.precpred(this._ctx, 7);
		case 2:
			return this.precpred(this._ctx, 6);
		case 3:
			return this.precpred(this._ctx, 25);
		case 4:
			return this.precpred(this._ctx, 24);
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

	public static readonly _serializedATN: number[] = [4,1,79,498,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,1,0,1,0,1,1,3,1,54,8,1,1,1,1,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,3,3,73,8,3,1,3,1,3,1,4,1,4,3,4,79,8,4,1,4,1,4,1,4,
	1,5,1,5,1,5,3,5,87,8,5,1,6,1,6,1,6,1,6,1,7,1,7,3,7,95,8,7,1,7,1,7,1,7,1,
	7,1,7,1,7,5,7,103,8,7,10,7,12,7,106,9,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,
	1,9,3,9,117,8,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,128,8,10,
	1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,139,8,10,1,10,1,10,1,
	10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,3,11,151,8,11,1,11,3,11,154,8,11,
	1,11,1,11,1,11,1,11,1,11,1,11,3,11,162,8,11,1,11,1,11,1,11,1,11,1,11,1,
	11,1,11,1,11,1,11,3,11,173,8,11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,
	1,12,1,12,1,12,1,12,3,12,187,8,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
	12,3,12,197,8,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,13,1,13,1,13,
	1,13,1,13,1,13,1,13,1,13,3,13,215,8,13,1,13,1,13,1,13,1,13,1,13,1,13,3,
	13,223,8,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,233,8,13,1,13,
	1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,244,8,13,1,13,1,13,1,13,1,
	13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,261,8,14,
	1,15,1,15,3,15,265,8,15,1,16,1,16,1,16,4,16,270,8,16,11,16,12,16,271,1,
	17,1,17,1,17,1,17,3,17,278,8,17,1,18,1,18,1,18,4,18,283,8,18,11,18,12,18,
	284,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,
	21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,327,8,
	21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,335,8,21,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
	21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,5,21,377,8,21,10,21,12,21,380,9,21,1,21,1,
	21,1,21,1,21,1,21,3,21,387,8,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,395,
	8,21,1,21,1,21,1,21,1,21,5,21,401,8,21,10,21,12,21,404,9,21,1,21,1,21,1,
	21,1,21,1,21,1,21,1,21,3,21,413,8,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,5,21,432,8,21,10,21,12,
	21,435,9,21,1,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,
	1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,459,8,24,1,24,1,
	24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,471,8,24,1,24,1,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,5,24,493,8,24,10,24,12,24,496,9,24,1,24,0,2,42,48,25,0,2,4,
	6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,0,10,1,
	0,22,34,1,0,13,14,1,0,52,53,2,0,47,47,49,49,1,0,19,20,1,0,47,50,1,0,38,
	39,1,0,1,2,1,0,62,63,1,0,73,74,549,0,50,1,0,0,0,2,53,1,0,0,0,4,57,1,0,0,
	0,6,72,1,0,0,0,8,78,1,0,0,0,10,83,1,0,0,0,12,88,1,0,0,0,14,94,1,0,0,0,16,
	109,1,0,0,0,18,116,1,0,0,0,20,127,1,0,0,0,22,153,1,0,0,0,24,178,1,0,0,0,
	26,206,1,0,0,0,28,260,1,0,0,0,30,264,1,0,0,0,32,266,1,0,0,0,34,273,1,0,
	0,0,36,279,1,0,0,0,38,286,1,0,0,0,40,290,1,0,0,0,42,412,1,0,0,0,44,436,
	1,0,0,0,46,440,1,0,0,0,48,470,1,0,0,0,50,51,5,57,0,0,51,1,1,0,0,0,52,54,
	5,44,0,0,53,52,1,0,0,0,53,54,1,0,0,0,54,55,1,0,0,0,55,56,5,54,0,0,56,3,
	1,0,0,0,57,58,3,2,1,0,58,59,3,44,22,0,59,5,1,0,0,0,60,73,3,8,4,0,61,73,
	3,10,5,0,62,73,3,12,6,0,63,73,3,44,22,0,64,73,3,2,1,0,65,73,3,0,0,0,66,
	73,3,32,16,0,67,73,3,34,17,0,68,73,3,36,18,0,69,73,3,42,21,0,70,73,3,30,
	15,0,71,73,3,14,7,0,72,60,1,0,0,0,72,61,1,0,0,0,72,62,1,0,0,0,72,63,1,0,
	0,0,72,64,1,0,0,0,72,65,1,0,0,0,72,66,1,0,0,0,72,67,1,0,0,0,72,68,1,0,0,
	0,72,69,1,0,0,0,72,70,1,0,0,0,72,71,1,0,0,0,72,73,1,0,0,0,73,74,1,0,0,0,
	74,75,5,0,0,1,75,7,1,0,0,0,76,79,3,0,0,0,77,79,5,10,0,0,78,76,1,0,0,0,78,
	77,1,0,0,0,79,80,1,0,0,0,80,81,5,46,0,0,81,82,3,42,21,0,82,9,1,0,0,0,83,
	84,3,42,21,0,84,86,5,46,0,0,85,87,3,44,22,0,86,85,1,0,0,0,86,87,1,0,0,0,
	87,11,1,0,0,0,88,89,3,42,21,0,89,90,5,46,0,0,90,91,3,42,21,0,91,13,1,0,
	0,0,92,95,3,0,0,0,93,95,5,10,0,0,94,92,1,0,0,0,94,93,1,0,0,0,95,96,1,0,
	0,0,96,97,5,46,0,0,97,98,3,0,0,0,98,99,5,6,0,0,99,104,3,16,8,0,100,101,
	5,51,0,0,101,103,3,16,8,0,102,100,1,0,0,0,103,106,1,0,0,0,104,102,1,0,0,
	0,104,105,1,0,0,0,105,107,1,0,0,0,106,104,1,0,0,0,107,108,5,7,0,0,108,15,
	1,0,0,0,109,110,5,6,0,0,110,111,3,42,21,0,111,112,5,51,0,0,112,113,3,30,
	15,0,113,114,5,7,0,0,114,17,1,0,0,0,115,117,5,21,0,0,116,115,1,0,0,0,116,
	117,1,0,0,0,117,118,1,0,0,0,118,119,7,0,0,0,119,19,1,0,0,0,120,128,5,11,
	0,0,121,122,5,12,0,0,122,123,5,4,0,0,123,124,5,5,0,0,124,125,5,45,0,0,125,
	126,5,4,0,0,126,128,5,5,0,0,127,120,1,0,0,0,127,121,1,0,0,0,128,129,1,0,
	0,0,129,130,5,6,0,0,130,131,3,42,21,0,131,138,5,7,0,0,132,133,5,15,0,0,
	133,134,5,4,0,0,134,135,3,0,0,0,135,136,5,5,0,0,136,139,1,0,0,0,137,139,
	3,0,0,0,138,132,1,0,0,0,138,137,1,0,0,0,139,140,1,0,0,0,140,141,5,6,0,0,
	141,142,3,0,0,0,142,143,5,7,0,0,143,21,1,0,0,0,144,150,5,12,0,0,145,146,
	5,4,0,0,146,147,3,42,21,0,147,148,5,5,0,0,148,151,1,0,0,0,149,151,3,42,
	21,0,150,145,1,0,0,0,150,149,1,0,0,0,151,154,1,0,0,0,152,154,7,1,0,0,153,
	144,1,0,0,0,153,152,1,0,0,0,154,161,1,0,0,0,155,156,5,45,0,0,156,157,5,
	4,0,0,157,158,3,42,21,0,158,159,5,5,0,0,159,162,1,0,0,0,160,162,7,2,0,0,
	161,155,1,0,0,0,161,160,1,0,0,0,162,163,1,0,0,0,163,164,5,6,0,0,164,165,
	3,42,21,0,165,172,5,7,0,0,166,167,5,15,0,0,167,168,5,4,0,0,168,169,3,0,
	0,0,169,170,5,5,0,0,170,173,1,0,0,0,171,173,3,0,0,0,172,166,1,0,0,0,172,
	171,1,0,0,0,173,174,1,0,0,0,174,175,5,6,0,0,175,176,3,0,0,0,176,177,5,7,
	0,0,177,23,1,0,0,0,178,179,5,16,0,0,179,186,5,4,0,0,180,181,5,15,0,0,181,
	182,5,4,0,0,182,183,3,0,0,0,183,184,5,5,0,0,184,187,1,0,0,0,185,187,3,0,
	0,0,186,180,1,0,0,0,186,185,1,0,0,0,187,188,1,0,0,0,188,189,5,5,0,0,189,
	196,5,4,0,0,190,191,5,15,0,0,191,192,5,4,0,0,192,193,3,0,0,0,193,194,5,
	5,0,0,194,197,1,0,0,0,195,197,3,0,0,0,196,190,1,0,0,0,196,195,1,0,0,0,197,
	198,1,0,0,0,198,199,5,6,0,0,199,200,3,0,0,0,200,201,5,7,0,0,201,202,5,5,
	0,0,202,203,5,6,0,0,203,204,3,42,21,0,204,205,5,7,0,0,205,25,1,0,0,0,206,
	207,5,16,0,0,207,214,5,4,0,0,208,209,5,15,0,0,209,210,5,4,0,0,210,211,3,
	0,0,0,211,212,5,5,0,0,212,215,1,0,0,0,213,215,3,0,0,0,214,208,1,0,0,0,214,
	213,1,0,0,0,215,222,1,0,0,0,216,217,5,45,0,0,217,218,5,4,0,0,218,219,3,
	2,1,0,219,220,5,5,0,0,220,223,1,0,0,0,221,223,5,52,0,0,222,216,1,0,0,0,
	222,221,1,0,0,0,223,224,1,0,0,0,224,225,5,5,0,0,225,232,5,4,0,0,226,227,
	5,15,0,0,227,228,5,4,0,0,228,229,3,0,0,0,229,230,5,5,0,0,230,233,1,0,0,
	0,231,233,3,0,0,0,232,226,1,0,0,0,232,231,1,0,0,0,233,234,1,0,0,0,234,235,
	5,6,0,0,235,236,3,0,0,0,236,243,5,7,0,0,237,238,5,45,0,0,238,239,5,4,0,
	0,239,240,3,2,1,0,240,241,5,5,0,0,241,244,1,0,0,0,242,244,5,52,0,0,243,
	237,1,0,0,0,243,242,1,0,0,0,244,245,1,0,0,0,245,246,5,5,0,0,246,247,5,6,
	0,0,247,248,3,42,21,0,248,249,5,7,0,0,249,27,1,0,0,0,250,251,3,0,0,0,251,
	252,5,46,0,0,252,253,3,42,21,0,253,261,1,0,0,0,254,255,3,42,21,0,255,256,
	7,3,0,0,256,257,3,0,0,0,257,258,7,3,0,0,258,259,3,42,21,0,259,261,1,0,0,
	0,260,250,1,0,0,0,260,254,1,0,0,0,261,29,1,0,0,0,262,265,3,38,19,0,263,
	265,3,40,20,0,264,262,1,0,0,0,264,263,1,0,0,0,265,31,1,0,0,0,266,269,3,
	0,0,0,267,268,5,51,0,0,268,270,3,0,0,0,269,267,1,0,0,0,270,271,1,0,0,0,
	271,269,1,0,0,0,271,272,1,0,0,0,272,33,1,0,0,0,273,274,3,0,0,0,274,277,
	7,4,0,0,275,278,3,2,1,0,276,278,3,4,2,0,277,275,1,0,0,0,277,276,1,0,0,0,
	278,35,1,0,0,0,279,282,3,34,17,0,280,281,5,51,0,0,281,283,3,34,17,0,282,
	280,1,0,0,0,283,284,1,0,0,0,284,282,1,0,0,0,284,285,1,0,0,0,285,37,1,0,
	0,0,286,287,3,42,21,0,287,288,7,5,0,0,288,289,3,42,21,0,289,39,1,0,0,0,
	290,291,3,42,21,0,291,292,7,5,0,0,292,293,3,42,21,0,293,294,7,5,0,0,294,
	295,3,42,21,0,295,41,1,0,0,0,296,297,6,21,-1,0,297,298,3,0,0,0,298,299,
	5,56,0,0,299,413,1,0,0,0,300,301,3,0,0,0,301,302,7,2,0,0,302,303,5,55,0,
	0,303,413,1,0,0,0,304,305,3,0,0,0,305,306,5,45,0,0,306,307,5,4,0,0,307,
	308,3,42,21,0,308,309,5,5,0,0,309,310,5,55,0,0,310,413,1,0,0,0,311,312,
	5,18,0,0,312,313,5,4,0,0,313,314,3,42,21,0,314,315,5,5,0,0,315,413,1,0,
	0,0,316,317,3,18,9,0,317,318,5,6,0,0,318,319,3,42,21,0,319,320,5,7,0,0,
	320,413,1,0,0,0,321,413,3,20,10,0,322,413,3,22,11,0,323,413,3,24,12,0,324,
	413,3,26,13,0,325,327,5,21,0,0,326,325,1,0,0,0,326,327,1,0,0,0,327,328,
	1,0,0,0,328,329,5,35,0,0,329,330,5,6,0,0,330,331,3,42,21,0,331,332,5,7,
	0,0,332,413,1,0,0,0,333,335,5,21,0,0,334,333,1,0,0,0,334,335,1,0,0,0,335,
	336,1,0,0,0,336,337,5,36,0,0,337,338,5,6,0,0,338,339,3,42,21,0,339,340,
	5,7,0,0,340,413,1,0,0,0,341,342,5,37,0,0,342,343,5,4,0,0,343,344,3,42,21,
	0,344,345,5,5,0,0,345,346,5,6,0,0,346,347,3,42,21,0,347,348,5,7,0,0,348,
	413,1,0,0,0,349,350,7,6,0,0,350,351,5,6,0,0,351,352,3,42,21,0,352,353,5,
	7,0,0,353,413,1,0,0,0,354,355,5,8,0,0,355,356,3,42,21,0,356,357,5,8,0,0,
	357,413,1,0,0,0,358,413,3,4,2,0,359,413,3,2,1,0,360,361,5,44,0,0,361,413,
	3,42,21,10,362,363,5,16,0,0,363,364,5,4,0,0,364,365,3,42,21,0,365,366,5,
	5,0,0,366,367,5,4,0,0,367,368,3,42,21,0,368,369,5,5,0,0,369,413,1,0,0,0,
	370,413,3,0,0,0,371,372,3,0,0,0,372,373,5,6,0,0,373,378,3,28,14,0,374,375,
	5,51,0,0,375,377,3,28,14,0,376,374,1,0,0,0,377,380,1,0,0,0,378,376,1,0,
	0,0,378,379,1,0,0,0,379,381,1,0,0,0,380,378,1,0,0,0,381,386,5,7,0,0,382,
	383,5,57,0,0,383,384,3,2,1,0,384,385,5,57,0,0,385,387,1,0,0,0,386,382,1,
	0,0,0,386,387,1,0,0,0,387,413,1,0,0,0,388,389,5,15,0,0,389,390,5,4,0,0,
	390,391,3,0,0,0,391,392,5,5,0,0,392,395,1,0,0,0,393,395,3,0,0,0,394,388,
	1,0,0,0,394,393,1,0,0,0,395,396,1,0,0,0,396,397,5,6,0,0,397,402,3,42,21,
	0,398,399,5,51,0,0,399,401,3,42,21,0,400,398,1,0,0,0,401,404,1,0,0,0,402,
	400,1,0,0,0,402,403,1,0,0,0,403,405,1,0,0,0,404,402,1,0,0,0,405,406,5,7,
	0,0,406,413,1,0,0,0,407,413,5,10,0,0,408,409,5,6,0,0,409,410,3,42,21,0,
	410,411,5,7,0,0,411,413,1,0,0,0,412,296,1,0,0,0,412,300,1,0,0,0,412,304,
	1,0,0,0,412,311,1,0,0,0,412,316,1,0,0,0,412,321,1,0,0,0,412,322,1,0,0,0,
	412,323,1,0,0,0,412,324,1,0,0,0,412,326,1,0,0,0,412,334,1,0,0,0,412,341,
	1,0,0,0,412,349,1,0,0,0,412,354,1,0,0,0,412,358,1,0,0,0,412,359,1,0,0,0,
	412,360,1,0,0,0,412,362,1,0,0,0,412,370,1,0,0,0,412,371,1,0,0,0,412,394,
	1,0,0,0,412,407,1,0,0,0,412,408,1,0,0,0,413,433,1,0,0,0,414,415,10,9,0,
	0,415,416,5,17,0,0,416,432,3,42,21,10,417,418,10,7,0,0,418,419,5,43,0,0,
	419,432,3,42,21,8,420,421,10,6,0,0,421,422,5,44,0,0,422,432,3,42,21,7,423,
	424,10,25,0,0,424,432,7,2,0,0,425,426,10,24,0,0,426,427,5,45,0,0,427,428,
	5,4,0,0,428,429,3,42,21,0,429,430,5,5,0,0,430,432,1,0,0,0,431,414,1,0,0,
	0,431,417,1,0,0,0,431,420,1,0,0,0,431,423,1,0,0,0,431,425,1,0,0,0,432,435,
	1,0,0,0,433,431,1,0,0,0,433,434,1,0,0,0,434,43,1,0,0,0,435,433,1,0,0,0,
	436,437,7,7,0,0,437,438,3,48,24,0,438,439,7,8,0,0,439,45,1,0,0,0,440,441,
	5,64,0,0,441,442,5,71,0,0,442,443,7,9,0,0,443,444,5,72,0,0,444,445,5,71,
	0,0,445,446,5,74,0,0,446,447,5,72,0,0,447,47,1,0,0,0,448,449,6,24,-1,0,
	449,450,5,66,0,0,450,451,5,71,0,0,451,452,3,42,21,0,452,453,5,72,0,0,453,
	471,1,0,0,0,454,455,5,64,0,0,455,458,5,71,0,0,456,459,3,48,24,0,457,459,
	5,73,0,0,458,456,1,0,0,0,458,457,1,0,0,0,459,460,1,0,0,0,460,461,5,72,0,
	0,461,462,5,71,0,0,462,463,3,48,24,0,463,464,5,72,0,0,464,471,1,0,0,0,465,
	471,5,68,0,0,466,467,5,69,0,0,467,468,3,48,24,0,468,469,5,70,0,0,469,471,
	1,0,0,0,470,448,1,0,0,0,470,454,1,0,0,0,470,465,1,0,0,0,470,466,1,0,0,0,
	471,494,1,0,0,0,472,473,10,4,0,0,473,474,5,65,0,0,474,493,3,48,24,5,475,
	476,10,9,0,0,476,477,5,67,0,0,477,493,5,74,0,0,478,479,10,8,0,0,479,480,
	5,67,0,0,480,481,5,71,0,0,481,482,5,74,0,0,482,493,5,72,0,0,483,484,10,
	7,0,0,484,485,5,67,0,0,485,493,3,46,23,0,486,487,10,6,0,0,487,488,5,67,
	0,0,488,489,5,71,0,0,489,490,3,46,23,0,490,491,5,72,0,0,491,493,1,0,0,0,
	492,472,1,0,0,0,492,475,1,0,0,0,492,478,1,0,0,0,492,483,1,0,0,0,492,486,
	1,0,0,0,493,496,1,0,0,0,494,492,1,0,0,0,494,495,1,0,0,0,495,49,1,0,0,0,
	496,494,1,0,0,0,37,53,72,78,86,94,104,116,127,138,150,153,161,172,186,196,
	214,222,232,243,260,264,271,277,284,326,334,378,386,394,402,412,431,433,
	458,470,492,494];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LatexParser.__ATN) {
			LatexParser.__ATN = new ATNDeserializer().deserialize(LatexParser._serializedATN);
		}

		return LatexParser.__ATN;
	}


	static DecisionsToDFA = LatexParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

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


export class U_blockContext extends ParserRuleContext {
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return LatexParser.RULE_u_block;
	}
	public copyFrom(ctx: U_blockContext): void {
		super.copyFrom(ctx);
	}
}
export class UnitBlockContext extends U_blockContext {
	constructor(parser: LatexParser, ctx: U_blockContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
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
	// @Override
	public accept<Result>(visitor: LatexParserVisitor<Result>): Result {
		if (visitor.visitUnitBlock) {
			return visitor.visitUnitBlock(this);
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
