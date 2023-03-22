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
	public static readonly CMD_MATHRM = 13;
	public static readonly CMD_FRAC = 14;
	public static readonly CMD_CDOT = 15;
	public static readonly CMD_SQRT = 16;
	public static readonly CMD_SIM = 17;
	public static readonly CMD_APPROX = 18;
	public static readonly BACK_SLASH = 19;
	public static readonly CMD_SIN = 20;
	public static readonly CMD_COS = 21;
	public static readonly CMD_TAN = 22;
	public static readonly CMD_COT = 23;
	public static readonly CMD_SEC = 24;
	public static readonly CMD_CSC = 25;
	public static readonly CMD_ARCSIN = 26;
	public static readonly CMD_ARCCOS = 27;
	public static readonly CMD_ARCTAN = 28;
	public static readonly CMD_SINH = 29;
	public static readonly CMD_COSH = 30;
	public static readonly CMD_TANH = 31;
	public static readonly CMD_COTH = 32;
	public static readonly CMD_LN = 33;
	public static readonly CMD_LOG = 34;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 35;
	public static readonly CMD_LEFT = 36;
	public static readonly CMD_RIGHT = 37;
	public static readonly DOUBLE_DOLLAR_SIGN = 38;
	public static readonly ADD = 39;
	public static readonly SUB = 40;
	public static readonly CARET = 41;
	public static readonly EQ = 42;
	public static readonly LT = 43;
	public static readonly GT = 44;
	public static readonly LTE = 45;
	public static readonly GTE = 46;
	public static readonly COMMA = 47;
	public static readonly SINGLE_CHAR_NUMBER = 48;
	public static readonly NUMBER = 49;
	public static readonly SINGLE_CHAR_ID = 50;
	public static readonly UNDERSCORE_SUBSCRIPT = 51;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 52;
	public static readonly ID = 53;
	public static readonly WS = 54;
	public static readonly SLASH_SPACE = 55;
	public static readonly SLASH_COLON = 56;
	public static readonly ERROR_CHAR = 57;
	public static readonly R_BRACKET = 58;
	public static readonly ALT_R_BRACKET = 59;
	public static readonly U_CMD_FRAC = 60;
	public static readonly U_CMD_CDOT = 61;
	public static readonly U_CMD_SQRT = 62;
	public static readonly U_CARET = 63;
	public static readonly U_NAME = 64;
	public static readonly U_L_PAREN = 65;
	public static readonly U_R_PAREN = 66;
	public static readonly U_L_BRACE = 67;
	public static readonly U_R_BRACE = 68;
	public static readonly U_ONE = 69;
	public static readonly U_NUMBER = 70;
	public static readonly U_CMD_LEFT = 71;
	public static readonly U_CMD_RIGHT = 72;
	public static readonly U_WS = 73;
	public static readonly U_SLASH_SPACE = 74;
	public static readonly U_ERROR_CHAR = 75;
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
                                                             "CMD_LEFT", 
                                                             "CMD_RIGHT", 
                                                             "DOUBLE_DOLLAR_SIGN", 
                                                             "ADD", "SUB", 
                                                             "CARET", "EQ", 
                                                             "LT", "GT", 
                                                             "LTE", "GTE", 
                                                             "COMMA", "SINGLE_CHAR_NUMBER", 
                                                             "NUMBER", "SINGLE_CHAR_ID", 
                                                             "UNDERSCORE_SUBSCRIPT", 
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
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 50;
			_la = this._input.LA(1);
			if(!(_la===50 || _la===53)) {
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
	public number_(): NumberContext {
		let localctx: NumberContext = new NumberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, LatexParser.RULE_number);
		let _la: number;
		try {
			this.state = 57;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 40:
			case 49:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 53;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===40) {
					{
					this.state = 52;
					this.match(LatexParser.SUB);
					}
				}

				this.state = 55;
				this.match(LatexParser.NUMBER);
				}
				break;
			case 48:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 56;
				this.match(LatexParser.SINGLE_CHAR_NUMBER);
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
	public number_with_units(): Number_with_unitsContext {
		let localctx: Number_with_unitsContext = new Number_with_unitsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, LatexParser.RULE_number_with_units);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 59;
			this.number_();
			this.state = 60;
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
			this.state = 74;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				this.state = 62;
				this.assign();
				}
				break;
			case 2:
				{
				this.state = 63;
				this.query();
				}
				break;
			case 3:
				{
				this.state = 64;
				this.equality();
				}
				break;
			case 4:
				{
				this.state = 65;
				this.u_block();
				}
				break;
			case 5:
				{
				this.state = 66;
				this.number_();
				}
				break;
			case 6:
				{
				this.state = 67;
				this.id();
				}
				break;
			case 7:
				{
				this.state = 68;
				this.id_list();
				}
				break;
			case 8:
				{
				this.state = 69;
				this.guess();
				}
				break;
			case 9:
				{
				this.state = 70;
				this.guess_list();
				}
				break;
			case 10:
				{
				this.state = 71;
				this.expr(0);
				}
				break;
			case 11:
				{
				this.state = 72;
				this.condition();
				}
				break;
			case 12:
				{
				this.state = 73;
				this.piecewise_assign();
				}
				break;
			}
			this.state = 76;
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
			this.state = 80;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 50:
			case 53:
				{
				this.state = 78;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 79;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 82;
			this.match(LatexParser.EQ);
			this.state = 83;
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
			this.state = 85;
			this.expr(0);
			this.state = 86;
			this.match(LatexParser.EQ);
			this.state = 88;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1 || _la===2) {
				{
				this.state = 87;
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
			this.state = 90;
			this.expr(0);
			this.state = 91;
			this.match(LatexParser.EQ);
			this.state = 92;
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
			this.state = 96;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 50:
			case 53:
				{
				this.state = 94;
				this.id();
				}
				break;
			case 10:
				{
				this.state = 95;
				this.match(LatexParser.PI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 98;
			this.match(LatexParser.EQ);
			this.state = 99;
			this.id();
			this.state = 100;
			this.match(LatexParser.L_PAREN);
			{
			this.state = 101;
			this.piecewise_arg();
			this.state = 106;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===47) {
				{
				{
				this.state = 102;
				this.match(LatexParser.COMMA);
				this.state = 103;
				this.piecewise_arg();
				}
				}
				this.state = 108;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 109;
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
			this.state = 111;
			this.match(LatexParser.L_PAREN);
			this.state = 112;
			this.expr(0);
			this.state = 113;
			this.match(LatexParser.COMMA);
			this.state = 114;
			this.condition();
			this.state = 115;
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
			this.state = 118;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===19) {
				{
				this.state = 117;
				this.match(LatexParser.BACK_SLASH);
				}
			}

			this.state = 120;
			_la = this._input.LA(1);
			if(!(((((_la - 20)) & ~0x1F) === 0 && ((1 << (_la - 20)) & 8191) !== 0))) {
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
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 122;
			this.match(LatexParser.CMD_INT);
			this.state = 129;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9) {
				{
				this.state = 123;
				this.match(LatexParser.UNDERSCORE);
				this.state = 124;
				this.match(LatexParser.L_BRACE);
				this.state = 125;
				this.match(LatexParser.R_BRACE);
				this.state = 126;
				this.match(LatexParser.CARET);
				this.state = 127;
				this.match(LatexParser.L_BRACE);
				this.state = 128;
				this.match(LatexParser.R_BRACE);
				}
			}

			this.state = 131;
			this.match(LatexParser.L_PAREN);
			this.state = 132;
			this.expr(0);
			this.state = 133;
			this.match(LatexParser.R_PAREN);
			this.state = 140;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				this.state = 134;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 135;
				this.match(LatexParser.L_BRACE);
				this.state = 136;
				this.id();
				this.state = 137;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 50:
			case 53:
				{
				this.state = 139;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 142;
			this.match(LatexParser.L_PAREN);
			this.state = 143;
			this.id();
			this.state = 144;
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
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 146;
			this.match(LatexParser.CMD_INT_UNDERSCORE);
			this.state = 152;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
				{
				{
				this.state = 147;
				this.match(LatexParser.L_BRACE);
				this.state = 148;
				this.expr(0);
				this.state = 149;
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
			case 16:
			case 19:
			case 20:
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
			case 40:
			case 48:
			case 49:
			case 50:
			case 53:
				{
				{
				this.state = 151;
				this.expr(0);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 154;
			this.match(LatexParser.CARET);
			this.state = 160;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
				{
				{
				this.state = 155;
				this.match(LatexParser.L_BRACE);
				this.state = 156;
				this.expr(0);
				this.state = 157;
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
			case 16:
			case 19:
			case 20:
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
			case 40:
			case 48:
			case 49:
			case 50:
			case 53:
				{
				this.state = 159;
				this.expr(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 162;
			this.match(LatexParser.L_PAREN);
			this.state = 163;
			this.expr(0);
			this.state = 164;
			this.match(LatexParser.R_PAREN);
			this.state = 171;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				this.state = 165;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 166;
				this.match(LatexParser.L_BRACE);
				this.state = 167;
				this.id();
				this.state = 168;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 50:
			case 53:
				{
				this.state = 170;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 173;
			this.match(LatexParser.L_PAREN);
			this.state = 174;
			this.id();
			this.state = 175;
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
			this.state = 177;
			this.match(LatexParser.CMD_FRAC);
			this.state = 178;
			this.match(LatexParser.L_BRACE);
			this.state = 185;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				this.state = 179;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 180;
				this.match(LatexParser.L_BRACE);
				this.state = 181;
				this.id();
				this.state = 182;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 50:
			case 53:
				{
				this.state = 184;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 187;
			this.match(LatexParser.R_BRACE);
			this.state = 188;
			this.match(LatexParser.L_BRACE);
			this.state = 195;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				this.state = 189;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 190;
				this.match(LatexParser.L_BRACE);
				this.state = 191;
				this.id();
				this.state = 192;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 50:
			case 53:
				{
				this.state = 194;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 197;
			this.match(LatexParser.L_PAREN);
			this.state = 198;
			this.id();
			this.state = 199;
			this.match(LatexParser.R_PAREN);
			this.state = 200;
			this.match(LatexParser.R_BRACE);
			this.state = 201;
			this.match(LatexParser.L_PAREN);
			this.state = 202;
			this.expr(0);
			this.state = 203;
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
			this.state = 205;
			this.match(LatexParser.CMD_FRAC);
			this.state = 206;
			this.match(LatexParser.L_BRACE);
			this.state = 213;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				{
				this.state = 207;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 208;
				this.match(LatexParser.L_BRACE);
				this.state = 209;
				this.id();
				this.state = 210;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 50:
			case 53:
				{
				this.state = 212;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 215;
			this.match(LatexParser.CARET);
			this.state = 221;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
				{
				{
				this.state = 216;
				this.match(LatexParser.L_BRACE);
				this.state = 217;
				this.number_();
				this.state = 218;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 40:
			case 48:
			case 49:
				{
				this.state = 220;
				this.number_();
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
			case 13:
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
			case 50:
			case 53:
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
			this.match(LatexParser.CARET);
			this.state = 242;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
				{
				{
				this.state = 237;
				this.match(LatexParser.L_BRACE);
				this.state = 238;
				this.number_();
				this.state = 239;
				this.match(LatexParser.R_BRACE);
				}
				}
				break;
			case 40:
			case 48:
			case 49:
				{
				this.state = 241;
				this.number_();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 244;
			this.match(LatexParser.R_BRACE);
			this.state = 245;
			this.match(LatexParser.L_PAREN);
			this.state = 246;
			this.expr(0);
			this.state = 247;
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
			this.state = 259;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 249;
				this.id();
				this.state = 250;
				this.match(LatexParser.EQ);
				this.state = 251;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 253;
				this.expr(0);
				this.state = 254;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===43 || _la===45)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 255;
				this.id();
				this.state = 256;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===43 || _la===45)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 257;
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
			this.state = 263;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 261;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 262;
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
			this.state = 265;
			this.id();
			this.state = 268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 266;
				this.match(LatexParser.COMMA);
				this.state = 267;
				this.id();
				}
				}
				this.state = 270;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===47);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
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
			this.state = 272;
			this.id();
			this.state = 273;
			_la = this._input.LA(1);
			if(!(_la===17 || _la===18)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 276;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 274;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 275;
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
			this.state = 278;
			this.guess();
			this.state = 281;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 279;
				this.match(LatexParser.COMMA);
				this.state = 280;
				this.guess();
				}
				}
				this.state = 283;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===47);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
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
			this.state = 285;
			this.expr(0);
			this.state = 286;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 287;
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
			this.state = 289;
			this.expr(0);
			this.state = 290;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 291;
			this.expr(0);
			this.state = 292;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 15) !== 0))) {
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
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
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
			this.state = 416;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 296;
				this.id();
				this.state = 297;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 299;
				this.id();
				this.state = 300;
				this.match(LatexParser.CARET);
				this.state = 301;
				_la = this._input.LA(1);
				if(!(_la===48 || _la===50)) {
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
				if (_la===19) {
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
				if (_la===19) {
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
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 352;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 40:
				case 48:
				case 49:
					{
					this.state = 350;
					this.number_();
					}
					break;
				case 50:
				case 53:
					{
					this.state = 351;
					this.id();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 354;
				this.match(LatexParser.L_PAREN);
				this.state = 355;
				this.expr(0);
				this.state = 356;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 358;
				this.match(LatexParser.VBAR);
				this.state = 359;
				this.expr(0);
				this.state = 360;
				this.match(LatexParser.VBAR);
				}
				break;
			case 15:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 362;
				this.number_with_units();
				}
				break;
			case 16:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 363;
				this.number_();
				}
				break;
			case 17:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 364;
				this.match(LatexParser.SUB);
				this.state = 365;
				this.expr(10);
				}
				break;
			case 18:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 366;
				this.match(LatexParser.CMD_FRAC);
				this.state = 367;
				this.match(LatexParser.L_BRACE);
				this.state = 368;
				this.expr(0);
				this.state = 369;
				this.match(LatexParser.R_BRACE);
				this.state = 370;
				this.match(LatexParser.L_BRACE);
				this.state = 371;
				this.expr(0);
				this.state = 372;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 19:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 374;
				this.id();
				}
				break;
			case 20:
				{
				localctx = new FunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 375;
				this.id();
				this.state = 376;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 377;
				this.argument();
				this.state = 382;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===47) {
					{
					{
					this.state = 378;
					this.match(LatexParser.COMMA);
					this.state = 379;
					this.argument();
					}
					}
					this.state = 384;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 385;
				this.match(LatexParser.R_PAREN);
				this.state = 390;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 28, this._ctx) ) {
				case 1:
					{
					this.state = 386;
					(localctx as FunctionContext)._points_id_0 = this.match(LatexParser.ID);
					this.state = 387;
					(localctx as FunctionContext)._num_points = this.number_();
					this.state = 388;
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
				this.state = 398;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 13:
					{
					this.state = 392;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 393;
					this.match(LatexParser.L_BRACE);
					this.state = 394;
					this.id();
					this.state = 395;
					this.match(LatexParser.R_BRACE);
					}
					break;
				case 50:
				case 53:
					{
					this.state = 397;
					this.id();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 400;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 401;
				this.expr(0);
				this.state = 406;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===47) {
					{
					{
					this.state = 402;
					this.match(LatexParser.COMMA);
					this.state = 403;
					this.expr(0);
					}
					}
					this.state = 408;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 409;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 22:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 411;
				this.match(LatexParser.PI);
				}
				break;
			case 23:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 412;
				this.match(LatexParser.L_PAREN);
				this.state = 413;
				this.expr(0);
				this.state = 414;
				this.match(LatexParser.R_PAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 438;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 436;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
					case 1:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 418;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 419;
						this.match(LatexParser.CARET);
						this.state = 420;
						this.expr(25);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 421;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 422;
						this.match(LatexParser.CMD_CDOT);
						this.state = 423;
						this.expr(10);
						}
						break;
					case 3:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 424;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 425;
						this.match(LatexParser.ADD);
						this.state = 426;
						this.expr(8);
						}
						break;
					case 4:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 427;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 428;
						this.match(LatexParser.SUB);
						this.state = 429;
						this.expr(7);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 430;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 431;
						this.match(LatexParser.CARET);
						this.state = 432;
						this.match(LatexParser.L_BRACE);
						this.state = 433;
						this.expr(0);
						this.state = 434;
						this.match(LatexParser.R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 440;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
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
			this.state = 441;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 442;
			this.u_expr(0);
			this.state = 443;
			_la = this._input.LA(1);
			if(!(_la===58 || _la===59)) {
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
			this.state = 445;
			this.match(LatexParser.U_CMD_FRAC);
			this.state = 446;
			this.match(LatexParser.U_L_BRACE);
			this.state = 447;
			_la = this._input.LA(1);
			if(!(_la===69 || _la===70)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 448;
			this.match(LatexParser.U_R_BRACE);
			this.state = 449;
			this.match(LatexParser.U_L_BRACE);
			this.state = 450;
			this.match(LatexParser.U_NUMBER);
			this.state = 451;
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
			this.state = 475;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 62:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 454;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 455;
				this.match(LatexParser.U_L_BRACE);
				this.state = 456;
				this.expr(0);
				this.state = 457;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 60:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 459;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 460;
				this.match(LatexParser.U_L_BRACE);
				this.state = 463;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 60:
				case 62:
				case 64:
				case 65:
					{
					this.state = 461;
					this.u_expr(0);
					}
					break;
				case 69:
					{
					this.state = 462;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 465;
				this.match(LatexParser.U_R_BRACE);
				this.state = 466;
				this.match(LatexParser.U_L_BRACE);
				this.state = 467;
				this.u_expr(0);
				this.state = 468;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 64:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 470;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 65:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 471;
				this.match(LatexParser.U_L_PAREN);
				this.state = 472;
				this.u_expr(0);
				this.state = 473;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 499;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 497;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 477;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 478;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 479;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 480;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 481;
						this.match(LatexParser.U_CARET);
						this.state = 482;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 483;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 484;
						this.match(LatexParser.U_CARET);
						this.state = 485;
						this.match(LatexParser.U_L_BRACE);
						this.state = 486;
						this.match(LatexParser.U_NUMBER);
						this.state = 487;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 488;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 489;
						this.match(LatexParser.U_CARET);
						this.state = 490;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 491;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 492;
						this.match(LatexParser.U_CARET);
						this.state = 493;
						this.match(LatexParser.U_L_BRACE);
						this.state = 494;
						this.u_fraction();
						this.state = 495;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 501;
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
			return this.precpred(this._ctx, 25);
		case 1:
			return this.precpred(this._ctx, 9);
		case 2:
			return this.precpred(this._ctx, 7);
		case 3:
			return this.precpred(this._ctx, 6);
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

	public static readonly _serializedATN: number[] = [4,1,75,503,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,1,0,1,0,1,1,3,1,54,8,1,1,1,1,1,3,1,58,8,1,1,2,1,2,1,2,1,3,1,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,75,8,3,1,3,1,3,1,4,1,4,3,4,81,8,4,
	1,4,1,4,1,4,1,5,1,5,1,5,3,5,89,8,5,1,6,1,6,1,6,1,6,1,7,1,7,3,7,97,8,7,1,
	7,1,7,1,7,1,7,1,7,1,7,5,7,105,8,7,10,7,12,7,108,9,7,1,7,1,7,1,8,1,8,1,8,
	1,8,1,8,1,8,1,9,3,9,119,8,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,
	3,10,130,8,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,141,8,10,
	1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,3,11,153,8,11,1,11,1,
	11,1,11,1,11,1,11,1,11,3,11,161,8,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,
	1,11,1,11,3,11,172,8,11,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,
	12,1,12,1,12,3,12,186,8,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,3,12,
	196,8,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,13,1,13,1,13,1,13,1,
	13,1,13,1,13,1,13,3,13,214,8,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,222,
	8,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,232,8,13,1,13,1,13,1,
	13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,243,8,13,1,13,1,13,1,13,1,13,1,13,
	1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,260,8,14,1,15,1,
	15,3,15,264,8,15,1,16,1,16,1,16,4,16,269,8,16,11,16,12,16,270,1,17,1,17,
	1,17,1,17,3,17,277,8,17,1,18,1,18,1,18,4,18,282,8,18,11,18,12,18,283,1,
	19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
	21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,327,8,21,
	1,21,1,21,1,21,1,21,1,21,1,21,3,21,335,8,21,1,21,1,21,1,21,1,21,1,21,1,
	21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,353,8,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
	21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,5,21,381,8,21,10,21,
	12,21,384,9,21,1,21,1,21,1,21,1,21,1,21,3,21,391,8,21,1,21,1,21,1,21,1,
	21,1,21,1,21,3,21,399,8,21,1,21,1,21,1,21,1,21,5,21,405,8,21,10,21,12,21,
	408,9,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,417,8,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
	21,5,21,437,8,21,10,21,12,21,440,9,21,1,22,1,22,1,22,1,22,1,23,1,23,1,23,
	1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,3,24,464,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,
	476,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,498,8,24,10,24,12,24,501,9,24,
	1,24,0,2,42,48,25,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
	40,42,44,46,48,0,9,2,0,50,50,53,53,1,0,20,32,2,0,43,43,45,45,1,0,17,18,
	1,0,43,46,2,0,48,48,50,50,1,0,1,2,1,0,58,59,1,0,69,70,555,0,50,1,0,0,0,
	2,57,1,0,0,0,4,59,1,0,0,0,6,74,1,0,0,0,8,80,1,0,0,0,10,85,1,0,0,0,12,90,
	1,0,0,0,14,96,1,0,0,0,16,111,1,0,0,0,18,118,1,0,0,0,20,122,1,0,0,0,22,146,
	1,0,0,0,24,177,1,0,0,0,26,205,1,0,0,0,28,259,1,0,0,0,30,263,1,0,0,0,32,
	265,1,0,0,0,34,272,1,0,0,0,36,278,1,0,0,0,38,285,1,0,0,0,40,289,1,0,0,0,
	42,416,1,0,0,0,44,441,1,0,0,0,46,445,1,0,0,0,48,475,1,0,0,0,50,51,7,0,0,
	0,51,1,1,0,0,0,52,54,5,40,0,0,53,52,1,0,0,0,53,54,1,0,0,0,54,55,1,0,0,0,
	55,58,5,49,0,0,56,58,5,48,0,0,57,53,1,0,0,0,57,56,1,0,0,0,58,3,1,0,0,0,
	59,60,3,2,1,0,60,61,3,44,22,0,61,5,1,0,0,0,62,75,3,8,4,0,63,75,3,10,5,0,
	64,75,3,12,6,0,65,75,3,44,22,0,66,75,3,2,1,0,67,75,3,0,0,0,68,75,3,32,16,
	0,69,75,3,34,17,0,70,75,3,36,18,0,71,75,3,42,21,0,72,75,3,30,15,0,73,75,
	3,14,7,0,74,62,1,0,0,0,74,63,1,0,0,0,74,64,1,0,0,0,74,65,1,0,0,0,74,66,
	1,0,0,0,74,67,1,0,0,0,74,68,1,0,0,0,74,69,1,0,0,0,74,70,1,0,0,0,74,71,1,
	0,0,0,74,72,1,0,0,0,74,73,1,0,0,0,74,75,1,0,0,0,75,76,1,0,0,0,76,77,5,0,
	0,1,77,7,1,0,0,0,78,81,3,0,0,0,79,81,5,10,0,0,80,78,1,0,0,0,80,79,1,0,0,
	0,81,82,1,0,0,0,82,83,5,42,0,0,83,84,3,42,21,0,84,9,1,0,0,0,85,86,3,42,
	21,0,86,88,5,42,0,0,87,89,3,44,22,0,88,87,1,0,0,0,88,89,1,0,0,0,89,11,1,
	0,0,0,90,91,3,42,21,0,91,92,5,42,0,0,92,93,3,42,21,0,93,13,1,0,0,0,94,97,
	3,0,0,0,95,97,5,10,0,0,96,94,1,0,0,0,96,95,1,0,0,0,97,98,1,0,0,0,98,99,
	5,42,0,0,99,100,3,0,0,0,100,101,5,6,0,0,101,106,3,16,8,0,102,103,5,47,0,
	0,103,105,3,16,8,0,104,102,1,0,0,0,105,108,1,0,0,0,106,104,1,0,0,0,106,
	107,1,0,0,0,107,109,1,0,0,0,108,106,1,0,0,0,109,110,5,7,0,0,110,15,1,0,
	0,0,111,112,5,6,0,0,112,113,3,42,21,0,113,114,5,47,0,0,114,115,3,30,15,
	0,115,116,5,7,0,0,116,17,1,0,0,0,117,119,5,19,0,0,118,117,1,0,0,0,118,119,
	1,0,0,0,119,120,1,0,0,0,120,121,7,1,0,0,121,19,1,0,0,0,122,129,5,11,0,0,
	123,124,5,9,0,0,124,125,5,4,0,0,125,126,5,5,0,0,126,127,5,41,0,0,127,128,
	5,4,0,0,128,130,5,5,0,0,129,123,1,0,0,0,129,130,1,0,0,0,130,131,1,0,0,0,
	131,132,5,6,0,0,132,133,3,42,21,0,133,140,5,7,0,0,134,135,5,13,0,0,135,
	136,5,4,0,0,136,137,3,0,0,0,137,138,5,5,0,0,138,141,1,0,0,0,139,141,3,0,
	0,0,140,134,1,0,0,0,140,139,1,0,0,0,141,142,1,0,0,0,142,143,5,6,0,0,143,
	144,3,0,0,0,144,145,5,7,0,0,145,21,1,0,0,0,146,152,5,12,0,0,147,148,5,4,
	0,0,148,149,3,42,21,0,149,150,5,5,0,0,150,153,1,0,0,0,151,153,3,42,21,0,
	152,147,1,0,0,0,152,151,1,0,0,0,153,154,1,0,0,0,154,160,5,41,0,0,155,156,
	5,4,0,0,156,157,3,42,21,0,157,158,5,5,0,0,158,161,1,0,0,0,159,161,3,42,
	21,0,160,155,1,0,0,0,160,159,1,0,0,0,161,162,1,0,0,0,162,163,5,6,0,0,163,
	164,3,42,21,0,164,171,5,7,0,0,165,166,5,13,0,0,166,167,5,4,0,0,167,168,
	3,0,0,0,168,169,5,5,0,0,169,172,1,0,0,0,170,172,3,0,0,0,171,165,1,0,0,0,
	171,170,1,0,0,0,172,173,1,0,0,0,173,174,5,6,0,0,174,175,3,0,0,0,175,176,
	5,7,0,0,176,23,1,0,0,0,177,178,5,14,0,0,178,185,5,4,0,0,179,180,5,13,0,
	0,180,181,5,4,0,0,181,182,3,0,0,0,182,183,5,5,0,0,183,186,1,0,0,0,184,186,
	3,0,0,0,185,179,1,0,0,0,185,184,1,0,0,0,186,187,1,0,0,0,187,188,5,5,0,0,
	188,195,5,4,0,0,189,190,5,13,0,0,190,191,5,4,0,0,191,192,3,0,0,0,192,193,
	5,5,0,0,193,196,1,0,0,0,194,196,3,0,0,0,195,189,1,0,0,0,195,194,1,0,0,0,
	196,197,1,0,0,0,197,198,5,6,0,0,198,199,3,0,0,0,199,200,5,7,0,0,200,201,
	5,5,0,0,201,202,5,6,0,0,202,203,3,42,21,0,203,204,5,7,0,0,204,25,1,0,0,
	0,205,206,5,14,0,0,206,213,5,4,0,0,207,208,5,13,0,0,208,209,5,4,0,0,209,
	210,3,0,0,0,210,211,5,5,0,0,211,214,1,0,0,0,212,214,3,0,0,0,213,207,1,0,
	0,0,213,212,1,0,0,0,214,215,1,0,0,0,215,221,5,41,0,0,216,217,5,4,0,0,217,
	218,3,2,1,0,218,219,5,5,0,0,219,222,1,0,0,0,220,222,3,2,1,0,221,216,1,0,
	0,0,221,220,1,0,0,0,222,223,1,0,0,0,223,224,5,5,0,0,224,231,5,4,0,0,225,
	226,5,13,0,0,226,227,5,4,0,0,227,228,3,0,0,0,228,229,5,5,0,0,229,232,1,
	0,0,0,230,232,3,0,0,0,231,225,1,0,0,0,231,230,1,0,0,0,232,233,1,0,0,0,233,
	234,5,6,0,0,234,235,3,0,0,0,235,236,5,7,0,0,236,242,5,41,0,0,237,238,5,
	4,0,0,238,239,3,2,1,0,239,240,5,5,0,0,240,243,1,0,0,0,241,243,3,2,1,0,242,
	237,1,0,0,0,242,241,1,0,0,0,243,244,1,0,0,0,244,245,5,5,0,0,245,246,5,6,
	0,0,246,247,3,42,21,0,247,248,5,7,0,0,248,27,1,0,0,0,249,250,3,0,0,0,250,
	251,5,42,0,0,251,252,3,42,21,0,252,260,1,0,0,0,253,254,3,42,21,0,254,255,
	7,2,0,0,255,256,3,0,0,0,256,257,7,2,0,0,257,258,3,42,21,0,258,260,1,0,0,
	0,259,249,1,0,0,0,259,253,1,0,0,0,260,29,1,0,0,0,261,264,3,38,19,0,262,
	264,3,40,20,0,263,261,1,0,0,0,263,262,1,0,0,0,264,31,1,0,0,0,265,268,3,
	0,0,0,266,267,5,47,0,0,267,269,3,0,0,0,268,266,1,0,0,0,269,270,1,0,0,0,
	270,268,1,0,0,0,270,271,1,0,0,0,271,33,1,0,0,0,272,273,3,0,0,0,273,276,
	7,3,0,0,274,277,3,2,1,0,275,277,3,4,2,0,276,274,1,0,0,0,276,275,1,0,0,0,
	277,35,1,0,0,0,278,281,3,34,17,0,279,280,5,47,0,0,280,282,3,34,17,0,281,
	279,1,0,0,0,282,283,1,0,0,0,283,281,1,0,0,0,283,284,1,0,0,0,284,37,1,0,
	0,0,285,286,3,42,21,0,286,287,7,4,0,0,287,288,3,42,21,0,288,39,1,0,0,0,
	289,290,3,42,21,0,290,291,7,4,0,0,291,292,3,42,21,0,292,293,7,4,0,0,293,
	294,3,42,21,0,294,41,1,0,0,0,295,296,6,21,-1,0,296,297,3,0,0,0,297,298,
	5,52,0,0,298,417,1,0,0,0,299,300,3,0,0,0,300,301,5,41,0,0,301,302,7,5,0,
	0,302,303,5,51,0,0,303,417,1,0,0,0,304,305,3,0,0,0,305,306,5,41,0,0,306,
	307,5,4,0,0,307,308,3,42,21,0,308,309,5,5,0,0,309,310,5,51,0,0,310,417,
	1,0,0,0,311,312,5,16,0,0,312,313,5,4,0,0,313,314,3,42,21,0,314,315,5,5,
	0,0,315,417,1,0,0,0,316,317,3,18,9,0,317,318,5,6,0,0,318,319,3,42,21,0,
	319,320,5,7,0,0,320,417,1,0,0,0,321,417,3,20,10,0,322,417,3,22,11,0,323,
	417,3,24,12,0,324,417,3,26,13,0,325,327,5,19,0,0,326,325,1,0,0,0,326,327,
	1,0,0,0,327,328,1,0,0,0,328,329,5,33,0,0,329,330,5,6,0,0,330,331,3,42,21,
	0,331,332,5,7,0,0,332,417,1,0,0,0,333,335,5,19,0,0,334,333,1,0,0,0,334,
	335,1,0,0,0,335,336,1,0,0,0,336,337,5,34,0,0,337,338,5,6,0,0,338,339,3,
	42,21,0,339,340,5,7,0,0,340,417,1,0,0,0,341,342,5,35,0,0,342,343,5,4,0,
	0,343,344,3,42,21,0,344,345,5,5,0,0,345,346,5,6,0,0,346,347,3,42,21,0,347,
	348,5,7,0,0,348,417,1,0,0,0,349,352,5,35,0,0,350,353,3,2,1,0,351,353,3,
	0,0,0,352,350,1,0,0,0,352,351,1,0,0,0,353,354,1,0,0,0,354,355,5,6,0,0,355,
	356,3,42,21,0,356,357,5,7,0,0,357,417,1,0,0,0,358,359,5,8,0,0,359,360,3,
	42,21,0,360,361,5,8,0,0,361,417,1,0,0,0,362,417,3,4,2,0,363,417,3,2,1,0,
	364,365,5,40,0,0,365,417,3,42,21,10,366,367,5,14,0,0,367,368,5,4,0,0,368,
	369,3,42,21,0,369,370,5,5,0,0,370,371,5,4,0,0,371,372,3,42,21,0,372,373,
	5,5,0,0,373,417,1,0,0,0,374,417,3,0,0,0,375,376,3,0,0,0,376,377,5,6,0,0,
	377,382,3,28,14,0,378,379,5,47,0,0,379,381,3,28,14,0,380,378,1,0,0,0,381,
	384,1,0,0,0,382,380,1,0,0,0,382,383,1,0,0,0,383,385,1,0,0,0,384,382,1,0,
	0,0,385,390,5,7,0,0,386,387,5,53,0,0,387,388,3,2,1,0,388,389,5,53,0,0,389,
	391,1,0,0,0,390,386,1,0,0,0,390,391,1,0,0,0,391,417,1,0,0,0,392,393,5,13,
	0,0,393,394,5,4,0,0,394,395,3,0,0,0,395,396,5,5,0,0,396,399,1,0,0,0,397,
	399,3,0,0,0,398,392,1,0,0,0,398,397,1,0,0,0,399,400,1,0,0,0,400,401,5,6,
	0,0,401,406,3,42,21,0,402,403,5,47,0,0,403,405,3,42,21,0,404,402,1,0,0,
	0,405,408,1,0,0,0,406,404,1,0,0,0,406,407,1,0,0,0,407,409,1,0,0,0,408,406,
	1,0,0,0,409,410,5,7,0,0,410,417,1,0,0,0,411,417,5,10,0,0,412,413,5,6,0,
	0,413,414,3,42,21,0,414,415,5,7,0,0,415,417,1,0,0,0,416,295,1,0,0,0,416,
	299,1,0,0,0,416,304,1,0,0,0,416,311,1,0,0,0,416,316,1,0,0,0,416,321,1,0,
	0,0,416,322,1,0,0,0,416,323,1,0,0,0,416,324,1,0,0,0,416,326,1,0,0,0,416,
	334,1,0,0,0,416,341,1,0,0,0,416,349,1,0,0,0,416,358,1,0,0,0,416,362,1,0,
	0,0,416,363,1,0,0,0,416,364,1,0,0,0,416,366,1,0,0,0,416,374,1,0,0,0,416,
	375,1,0,0,0,416,398,1,0,0,0,416,411,1,0,0,0,416,412,1,0,0,0,417,438,1,0,
	0,0,418,419,10,25,0,0,419,420,5,41,0,0,420,437,3,42,21,25,421,422,10,9,
	0,0,422,423,5,15,0,0,423,437,3,42,21,10,424,425,10,7,0,0,425,426,5,39,0,
	0,426,437,3,42,21,8,427,428,10,6,0,0,428,429,5,40,0,0,429,437,3,42,21,7,
	430,431,10,24,0,0,431,432,5,41,0,0,432,433,5,4,0,0,433,434,3,42,21,0,434,
	435,5,5,0,0,435,437,1,0,0,0,436,418,1,0,0,0,436,421,1,0,0,0,436,424,1,0,
	0,0,436,427,1,0,0,0,436,430,1,0,0,0,437,440,1,0,0,0,438,436,1,0,0,0,438,
	439,1,0,0,0,439,43,1,0,0,0,440,438,1,0,0,0,441,442,7,6,0,0,442,443,3,48,
	24,0,443,444,7,7,0,0,444,45,1,0,0,0,445,446,5,60,0,0,446,447,5,67,0,0,447,
	448,7,8,0,0,448,449,5,68,0,0,449,450,5,67,0,0,450,451,5,70,0,0,451,452,
	5,68,0,0,452,47,1,0,0,0,453,454,6,24,-1,0,454,455,5,62,0,0,455,456,5,67,
	0,0,456,457,3,42,21,0,457,458,5,68,0,0,458,476,1,0,0,0,459,460,5,60,0,0,
	460,463,5,67,0,0,461,464,3,48,24,0,462,464,5,69,0,0,463,461,1,0,0,0,463,
	462,1,0,0,0,464,465,1,0,0,0,465,466,5,68,0,0,466,467,5,67,0,0,467,468,3,
	48,24,0,468,469,5,68,0,0,469,476,1,0,0,0,470,476,5,64,0,0,471,472,5,65,
	0,0,472,473,3,48,24,0,473,474,5,66,0,0,474,476,1,0,0,0,475,453,1,0,0,0,
	475,459,1,0,0,0,475,470,1,0,0,0,475,471,1,0,0,0,476,499,1,0,0,0,477,478,
	10,4,0,0,478,479,5,61,0,0,479,498,3,48,24,5,480,481,10,9,0,0,481,482,5,
	63,0,0,482,498,5,70,0,0,483,484,10,8,0,0,484,485,5,63,0,0,485,486,5,67,
	0,0,486,487,5,70,0,0,487,498,5,68,0,0,488,489,10,7,0,0,489,490,5,63,0,0,
	490,498,3,46,23,0,491,492,10,6,0,0,492,493,5,63,0,0,493,494,5,67,0,0,494,
	495,3,46,23,0,495,496,5,68,0,0,496,498,1,0,0,0,497,477,1,0,0,0,497,480,
	1,0,0,0,497,483,1,0,0,0,497,488,1,0,0,0,497,491,1,0,0,0,498,501,1,0,0,0,
	499,497,1,0,0,0,499,500,1,0,0,0,500,49,1,0,0,0,501,499,1,0,0,0,38,53,57,
	74,80,88,96,106,118,129,140,152,160,171,185,195,213,221,231,242,259,263,
	270,276,283,326,334,352,382,390,398,406,416,436,438,463,475,497,499];

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
	public SINGLE_CHAR_ID(): TerminalNode {
		return this.getToken(LatexParser.SINGLE_CHAR_ID, 0);
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
	public SINGLE_CHAR_NUMBER(): TerminalNode {
		return this.getToken(LatexParser.SINGLE_CHAR_NUMBER, 0);
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
	public CMD_INT(): TerminalNode {
		return this.getToken(LatexParser.CMD_INT, 0);
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
	public UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.UNDERSCORE, 0);
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
	constructor(parser?: LatexParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CMD_INT_UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.CMD_INT_UNDERSCORE, 0);
	}
	public CARET(): TerminalNode {
		return this.getToken(LatexParser.CARET, 0);
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
	public CARET_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.CARET);
	}
	public CARET(i: number): TerminalNode {
		return this.getToken(LatexParser.CARET, i);
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
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
	}
	public CMD_MATHRM_list(): TerminalNode[] {
	    	return this.getTokens(LatexParser.CMD_MATHRM);
	}
	public CMD_MATHRM(i: number): TerminalNode {
		return this.getToken(LatexParser.CMD_MATHRM, i);
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
	public CMD_SLASH_LOG_UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.CMD_SLASH_LOG_UNDERSCORE, 0);
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
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
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
	public CARET(): TerminalNode {
		return this.getToken(LatexParser.CARET, 0);
	}
	public UNDERSCORE_SUBSCRIPT(): TerminalNode {
		return this.getToken(LatexParser.UNDERSCORE_SUBSCRIPT, 0);
	}
	public SINGLE_CHAR_ID(): TerminalNode {
		return this.getToken(LatexParser.SINGLE_CHAR_ID, 0);
	}
	public SINGLE_CHAR_NUMBER(): TerminalNode {
		return this.getToken(LatexParser.SINGLE_CHAR_NUMBER, 0);
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
