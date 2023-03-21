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
	public static readonly CMD_MATHRM = 12;
	public static readonly CMD_FRAC = 13;
	public static readonly CMD_CDOT = 14;
	public static readonly CMD_SQRT = 15;
	public static readonly CMD_SIM = 16;
	public static readonly CMD_APPROX = 17;
	public static readonly BACK_SLASH = 18;
	public static readonly CMD_SIN = 19;
	public static readonly CMD_COS = 20;
	public static readonly CMD_TAN = 21;
	public static readonly CMD_COT = 22;
	public static readonly CMD_SEC = 23;
	public static readonly CMD_CSC = 24;
	public static readonly CMD_ARCSIN = 25;
	public static readonly CMD_ARCCOS = 26;
	public static readonly CMD_ARCTAN = 27;
	public static readonly CMD_SINH = 28;
	public static readonly CMD_COSH = 29;
	public static readonly CMD_TANH = 30;
	public static readonly CMD_COTH = 31;
	public static readonly CMD_LN = 32;
	public static readonly CMD_LOG = 33;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 34;
	public static readonly CMD_LEFT = 35;
	public static readonly CMD_RIGHT = 36;
	public static readonly DOUBLE_DOLLAR_SIGN = 37;
	public static readonly ADD = 38;
	public static readonly SUB = 39;
	public static readonly CARET = 40;
	public static readonly EQ = 41;
	public static readonly LT = 42;
	public static readonly GT = 43;
	public static readonly LTE = 44;
	public static readonly GTE = 45;
	public static readonly COMMA = 46;
	public static readonly SINGLE_CHAR_NUMBER = 47;
	public static readonly NUMBER = 48;
	public static readonly SINGLE_CHAR_ID = 49;
	public static readonly UNDERSCORE_SUBSCRIPT = 50;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 51;
	public static readonly ID = 52;
	public static readonly WS = 53;
	public static readonly SLASH_SPACE = 54;
	public static readonly SLASH_COLON = 55;
	public static readonly ERROR_CHAR = 56;
	public static readonly R_BRACKET = 57;
	public static readonly ALT_R_BRACKET = 58;
	public static readonly U_CMD_FRAC = 59;
	public static readonly U_CMD_CDOT = 60;
	public static readonly U_CMD_SQRT = 61;
	public static readonly U_CARET = 62;
	public static readonly U_NAME = 63;
	public static readonly U_L_PAREN = 64;
	public static readonly U_R_PAREN = 65;
	public static readonly U_L_BRACE = 66;
	public static readonly U_R_BRACE = 67;
	public static readonly U_ONE = 68;
	public static readonly U_NUMBER = 69;
	public static readonly U_CMD_LEFT = 70;
	public static readonly U_CMD_RIGHT = 71;
	public static readonly U_WS = 72;
	public static readonly U_SLASH_SPACE = 73;
	public static readonly U_ERROR_CHAR = 74;
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
                                                            "'\\int'", "'\\mathrm'", 
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
			if(!(_la===49 || _la===52)) {
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
			case 39:
			case 48:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 53;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===39) {
					{
					this.state = 52;
					this.match(LatexParser.SUB);
					}
				}

				this.state = 55;
				this.match(LatexParser.NUMBER);
				}
				break;
			case 47:
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
			case 49:
			case 52:
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
			case 49:
			case 52:
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
			while (_la===46) {
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
			if (_la===18) {
				{
				this.state = 117;
				this.match(LatexParser.BACK_SLASH);
				}
			}

			this.state = 120;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294443008) !== 0))) {
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
			this.state = 122;
			this.match(LatexParser.CMD_INT);
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
			this.state = 129;
			this.match(LatexParser.L_PAREN);
			this.state = 130;
			this.expr(0);
			this.state = 131;
			this.match(LatexParser.R_PAREN);
			this.state = 138;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
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
			case 49:
			case 52:
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
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 144;
			this.match(LatexParser.CMD_INT);
			this.state = 145;
			this.match(LatexParser.UNDERSCORE);
			this.state = 146;
			this.match(LatexParser.L_BRACE);
			this.state = 147;
			this.expr(0);
			this.state = 148;
			this.match(LatexParser.R_BRACE);
			this.state = 149;
			this.match(LatexParser.CARET);
			this.state = 150;
			this.match(LatexParser.L_BRACE);
			this.state = 151;
			this.expr(0);
			this.state = 152;
			this.match(LatexParser.R_BRACE);
			this.state = 153;
			this.match(LatexParser.L_PAREN);
			this.state = 154;
			this.expr(0);
			this.state = 155;
			this.match(LatexParser.R_PAREN);
			this.state = 162;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				this.state = 156;
				this.match(LatexParser.CMD_MATHRM);
				this.state = 157;
				this.match(LatexParser.L_BRACE);
				this.state = 158;
				this.id();
				this.state = 159;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 49:
			case 52:
				{
				this.state = 161;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 164;
			this.match(LatexParser.L_PAREN);
			this.state = 165;
			this.id();
			this.state = 166;
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
			this.state = 168;
			this.match(LatexParser.CMD_FRAC);
			this.state = 169;
			this.match(LatexParser.L_BRACE);
			this.state = 176;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				this.state = 170;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 171;
				this.match(LatexParser.L_BRACE);
				this.state = 172;
				this.id();
				this.state = 173;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 49:
			case 52:
				{
				this.state = 175;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 178;
			this.match(LatexParser.R_BRACE);
			this.state = 179;
			this.match(LatexParser.L_BRACE);
			this.state = 186;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				this.state = 180;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 181;
				this.match(LatexParser.L_BRACE);
				this.state = 182;
				this.id();
				this.state = 183;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 49:
			case 52:
				{
				this.state = 185;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 188;
			this.match(LatexParser.L_PAREN);
			this.state = 189;
			this.id();
			this.state = 190;
			this.match(LatexParser.R_PAREN);
			this.state = 191;
			this.match(LatexParser.R_BRACE);
			this.state = 192;
			this.match(LatexParser.L_PAREN);
			this.state = 193;
			this.expr(0);
			this.state = 194;
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
			this.state = 196;
			this.match(LatexParser.CMD_FRAC);
			this.state = 197;
			this.match(LatexParser.L_BRACE);
			this.state = 204;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				this.state = 198;
				localctx._MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
				this.state = 199;
				this.match(LatexParser.L_BRACE);
				this.state = 200;
				this.id();
				this.state = 201;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 49:
			case 52:
				{
				this.state = 203;
				this.id();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 206;
			this.match(LatexParser.CARET);
			this.state = 207;
			this.match(LatexParser.L_BRACE);
			this.state = 208;
			this.number_();
			this.state = 209;
			this.match(LatexParser.R_BRACE);
			this.state = 210;
			this.match(LatexParser.R_BRACE);
			this.state = 211;
			this.match(LatexParser.L_BRACE);
			this.state = 218;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				{
				this.state = 212;
				localctx._MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
				this.state = 213;
				this.match(LatexParser.L_BRACE);
				this.state = 214;
				this.id();
				this.state = 215;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 49:
			case 52:
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
			this.state = 223;
			this.match(LatexParser.CARET);
			this.state = 224;
			this.match(LatexParser.L_BRACE);
			this.state = 225;
			this.number_();
			this.state = 226;
			this.match(LatexParser.R_BRACE);
			this.state = 227;
			this.match(LatexParser.R_BRACE);
			this.state = 228;
			this.match(LatexParser.L_PAREN);
			this.state = 229;
			this.expr(0);
			this.state = 230;
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
			this.state = 242;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 232;
				this.id();
				this.state = 233;
				this.match(LatexParser.EQ);
				this.state = 234;
				this.expr(0);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 236;
				this.expr(0);
				this.state = 237;
				localctx._lower = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===42 || _la===44)) {
				    localctx._lower = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 238;
				this.id();
				this.state = 239;
				localctx._upper = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===42 || _la===44)) {
				    localctx._upper = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 240;
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
			this.state = 246;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 244;
				this.condition_single();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 245;
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
			this.state = 248;
			this.id();
			this.state = 251;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 249;
				this.match(LatexParser.COMMA);
				this.state = 250;
				this.id();
				}
				}
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===46);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
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
			this.state = 255;
			this.id();
			this.state = 256;
			_la = this._input.LA(1);
			if(!(_la===16 || _la===17)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 259;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				this.state = 257;
				this.number_();
				}
				break;
			case 2:
				{
				this.state = 258;
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
			this.state = 261;
			this.guess();
			this.state = 264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 262;
				this.match(LatexParser.COMMA);
				this.state = 263;
				this.guess();
				}
				}
				this.state = 266;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===46);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
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
			this.state = 268;
			this.expr(0);
			this.state = 269;
			localctx._operator = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 15) !== 0))) {
			    localctx._operator = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 270;
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
			this.state = 272;
			this.expr(0);
			this.state = 273;
			localctx._lower = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 15) !== 0))) {
			    localctx._lower = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 274;
			this.expr(0);
			this.state = 275;
			localctx._upper = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 15) !== 0))) {
			    localctx._upper = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 276;
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
			this.state = 399;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 279;
				this.id();
				this.state = 280;
				this.match(LatexParser.CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 2:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 282;
				this.id();
				this.state = 283;
				this.match(LatexParser.CARET);
				this.state = 284;
				_la = this._input.LA(1);
				if(!(_la===47 || _la===49)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 285;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 3:
				{
				localctx = new ExponentContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 287;
				this.id();
				this.state = 288;
				this.match(LatexParser.CARET);
				this.state = 289;
				this.match(LatexParser.L_BRACE);
				this.state = 290;
				this.expr(0);
				this.state = 291;
				this.match(LatexParser.R_BRACE);
				this.state = 292;
				this.match(LatexParser.UNDERSCORE_SUBSCRIPT);
				}
				break;
			case 4:
				{
				localctx = new SqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 294;
				this.match(LatexParser.CMD_SQRT);
				this.state = 295;
				this.match(LatexParser.L_BRACE);
				this.state = 296;
				this.expr(0);
				this.state = 297;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 5:
				{
				localctx = new TrigContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 299;
				this.trig_function();
				this.state = 300;
				this.match(LatexParser.L_PAREN);
				this.state = 301;
				this.expr(0);
				this.state = 302;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 6:
				{
				localctx = new IndefiniteIntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 304;
				this.indefinite_integral_cmd();
				}
				break;
			case 7:
				{
				localctx = new IntegralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 305;
				this.integral_cmd();
				}
				break;
			case 8:
				{
				localctx = new DerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 306;
				this.derivative_cmd();
				}
				break;
			case 9:
				{
				localctx = new NDerivativeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 307;
				this.n_derivative_cmd();
				}
				break;
			case 10:
				{
				localctx = new LnContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 309;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===18) {
					{
					this.state = 308;
					this.match(LatexParser.BACK_SLASH);
					}
				}

				this.state = 311;
				this.match(LatexParser.CMD_LN);
				this.state = 312;
				this.match(LatexParser.L_PAREN);
				this.state = 313;
				this.expr(0);
				this.state = 314;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 11:
				{
				localctx = new LogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 317;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===18) {
					{
					this.state = 316;
					this.match(LatexParser.BACK_SLASH);
					}
				}

				this.state = 319;
				this.match(LatexParser.CMD_LOG);
				this.state = 320;
				this.match(LatexParser.L_PAREN);
				this.state = 321;
				this.expr(0);
				this.state = 322;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 12:
				{
				localctx = new BaseLogContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 324;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 325;
				this.match(LatexParser.L_BRACE);
				this.state = 326;
				this.expr(0);
				this.state = 327;
				this.match(LatexParser.R_BRACE);
				this.state = 328;
				this.match(LatexParser.L_PAREN);
				this.state = 329;
				this.expr(0);
				this.state = 330;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 13:
				{
				localctx = new BaseLogSingleCharContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 332;
				this.match(LatexParser.CMD_SLASH_LOG_UNDERSCORE);
				this.state = 335;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 39:
				case 47:
				case 48:
					{
					this.state = 333;
					this.number_();
					}
					break;
				case 49:
				case 52:
					{
					this.state = 334;
					this.id();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 337;
				this.match(LatexParser.L_PAREN);
				this.state = 338;
				this.expr(0);
				this.state = 339;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 14:
				{
				localctx = new AbsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 341;
				this.match(LatexParser.VBAR);
				this.state = 342;
				this.expr(0);
				this.state = 343;
				this.match(LatexParser.VBAR);
				}
				break;
			case 15:
				{
				localctx = new NumberWithUnitsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 345;
				this.number_with_units();
				}
				break;
			case 16:
				{
				localctx = new NumberExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 346;
				this.number_();
				}
				break;
			case 17:
				{
				localctx = new UnaryMinusContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 347;
				this.match(LatexParser.SUB);
				this.state = 348;
				this.expr(10);
				}
				break;
			case 18:
				{
				localctx = new DivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 349;
				this.match(LatexParser.CMD_FRAC);
				this.state = 350;
				this.match(LatexParser.L_BRACE);
				this.state = 351;
				this.expr(0);
				this.state = 352;
				this.match(LatexParser.R_BRACE);
				this.state = 353;
				this.match(LatexParser.L_BRACE);
				this.state = 354;
				this.expr(0);
				this.state = 355;
				this.match(LatexParser.R_BRACE);
				}
				break;
			case 19:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 357;
				this.id();
				}
				break;
			case 20:
				{
				localctx = new FunctionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 358;
				this.id();
				this.state = 359;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 360;
				this.argument();
				this.state = 365;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===46) {
					{
					{
					this.state = 361;
					this.match(LatexParser.COMMA);
					this.state = 362;
					this.argument();
					}
					}
					this.state = 367;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 368;
				this.match(LatexParser.R_PAREN);
				this.state = 373;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 23, this._ctx) ) {
				case 1:
					{
					this.state = 369;
					(localctx as FunctionContext)._points_id_0 = this.match(LatexParser.ID);
					this.state = 370;
					(localctx as FunctionContext)._num_points = this.number_();
					this.state = 371;
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
				this.state = 381;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 12:
					{
					this.state = 375;
					this.match(LatexParser.CMD_MATHRM);
					this.state = 376;
					this.match(LatexParser.L_BRACE);
					this.state = 377;
					this.id();
					this.state = 378;
					this.match(LatexParser.R_BRACE);
					}
					break;
				case 49:
				case 52:
					{
					this.state = 380;
					this.id();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 383;
				this.match(LatexParser.L_PAREN);
				{
				this.state = 384;
				this.expr(0);
				this.state = 389;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===46) {
					{
					{
					this.state = 385;
					this.match(LatexParser.COMMA);
					this.state = 386;
					this.expr(0);
					}
					}
					this.state = 391;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				this.state = 392;
				this.match(LatexParser.R_PAREN);
				}
				break;
			case 22:
				{
				localctx = new PiExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 394;
				this.match(LatexParser.PI);
				}
				break;
			case 23:
				{
				localctx = new SubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 395;
				this.match(LatexParser.L_PAREN);
				this.state = 396;
				this.expr(0);
				this.state = 397;
				this.match(LatexParser.R_PAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 421;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 419;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
					case 1:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 401;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 402;
						this.match(LatexParser.CARET);
						this.state = 403;
						this.expr(25);
						}
						break;
					case 2:
						{
						localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 404;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 405;
						this.match(LatexParser.CMD_CDOT);
						this.state = 406;
						this.expr(10);
						}
						break;
					case 3:
						{
						localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 407;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 408;
						this.match(LatexParser.ADD);
						this.state = 409;
						this.expr(8);
						}
						break;
					case 4:
						{
						localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 410;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 411;
						this.match(LatexParser.SUB);
						this.state = 412;
						this.expr(7);
						}
						break;
					case 5:
						{
						localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
						this.state = 413;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 414;
						this.match(LatexParser.CARET);
						this.state = 415;
						this.match(LatexParser.L_BRACE);
						this.state = 416;
						this.expr(0);
						this.state = 417;
						this.match(LatexParser.R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 423;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
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
			this.state = 424;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 425;
			this.u_expr(0);
			this.state = 426;
			_la = this._input.LA(1);
			if(!(_la===57 || _la===58)) {
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
			this.state = 428;
			this.match(LatexParser.U_CMD_FRAC);
			this.state = 429;
			this.match(LatexParser.U_L_BRACE);
			this.state = 430;
			_la = this._input.LA(1);
			if(!(_la===68 || _la===69)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 431;
			this.match(LatexParser.U_R_BRACE);
			this.state = 432;
			this.match(LatexParser.U_L_BRACE);
			this.state = 433;
			this.match(LatexParser.U_NUMBER);
			this.state = 434;
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
			this.state = 458;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 61:
				{
				localctx = new UnitSqrtContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 437;
				this.match(LatexParser.U_CMD_SQRT);
				this.state = 438;
				this.match(LatexParser.U_L_BRACE);
				this.state = 439;
				this.expr(0);
				this.state = 440;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 59:
				{
				localctx = new UnitDivideContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 442;
				this.match(LatexParser.U_CMD_FRAC);
				this.state = 443;
				this.match(LatexParser.U_L_BRACE);
				this.state = 446;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 59:
				case 61:
				case 63:
				case 64:
					{
					this.state = 444;
					this.u_expr(0);
					}
					break;
				case 68:
					{
					this.state = 445;
					this.match(LatexParser.U_ONE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 448;
				this.match(LatexParser.U_R_BRACE);
				this.state = 449;
				this.match(LatexParser.U_L_BRACE);
				this.state = 450;
				this.u_expr(0);
				this.state = 451;
				this.match(LatexParser.U_R_BRACE);
				}
				break;
			case 63:
				{
				localctx = new UnitNameContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 453;
				this.match(LatexParser.U_NAME);
				}
				break;
			case 64:
				{
				localctx = new UnitSubExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 454;
				this.match(LatexParser.U_L_PAREN);
				this.state = 455;
				this.u_expr(0);
				this.state = 456;
				this.match(LatexParser.U_R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 482;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 480;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
					case 1:
						{
						localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 460;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 461;
						this.match(LatexParser.U_CMD_CDOT);
						this.state = 462;
						this.u_expr(5);
						}
						break;
					case 2:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 463;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 464;
						this.match(LatexParser.U_CARET);
						this.state = 465;
						this.match(LatexParser.U_NUMBER);
						}
						break;
					case 3:
						{
						localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 466;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 467;
						this.match(LatexParser.U_CARET);
						this.state = 468;
						this.match(LatexParser.U_L_BRACE);
						this.state = 469;
						this.match(LatexParser.U_NUMBER);
						this.state = 470;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					case 4:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 471;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 472;
						this.match(LatexParser.U_CARET);
						this.state = 473;
						this.u_fraction();
						}
						break;
					case 5:
						{
						localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
						this.state = 474;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 475;
						this.match(LatexParser.U_CARET);
						this.state = 476;
						this.match(LatexParser.U_L_BRACE);
						this.state = 477;
						this.u_fraction();
						this.state = 478;
						this.match(LatexParser.U_R_BRACE);
						}
						break;
					}
					}
				}
				this.state = 484;
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

	public static readonly _serializedATN: number[] = [4,1,74,486,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,1,0,1,0,1,1,3,1,54,8,1,1,1,1,1,3,1,58,8,1,1,2,1,2,1,2,1,3,1,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,75,8,3,1,3,1,3,1,4,1,4,3,4,81,8,4,
	1,4,1,4,1,4,1,5,1,5,1,5,3,5,89,8,5,1,6,1,6,1,6,1,6,1,7,1,7,3,7,97,8,7,1,
	7,1,7,1,7,1,7,1,7,1,7,5,7,105,8,7,10,7,12,7,108,9,7,1,7,1,7,1,8,1,8,1,8,
	1,8,1,8,1,8,1,9,3,9,119,8,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,
	1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,139,8,10,1,10,1,10,1,
	10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,
	1,11,1,11,1,11,1,11,1,11,3,11,163,8,11,1,11,1,11,1,11,1,11,1,12,1,12,1,
	12,1,12,1,12,1,12,1,12,1,12,3,12,177,8,12,1,12,1,12,1,12,1,12,1,12,1,12,
	1,12,1,12,3,12,187,8,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,13,1,
	13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,205,8,13,1,13,1,13,1,13,1,13,1,13,
	1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,219,8,13,1,13,1,13,1,13,1,13,1,
	13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
	1,14,1,14,1,14,3,14,243,8,14,1,15,1,15,3,15,247,8,15,1,16,1,16,1,16,4,16,
	252,8,16,11,16,12,16,253,1,17,1,17,1,17,1,17,3,17,260,8,17,1,18,1,18,1,
	18,4,18,265,8,18,11,18,12,18,266,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,
	1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
	21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,3,21,310,8,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,318,
	8,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
	21,1,21,1,21,3,21,336,8,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
	21,1,21,1,21,5,21,364,8,21,10,21,12,21,367,9,21,1,21,1,21,1,21,1,21,1,21,
	3,21,374,8,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,382,8,21,1,21,1,21,1,21,
	1,21,5,21,388,8,21,10,21,12,21,391,9,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
	21,3,21,400,8,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,1,21,1,21,5,21,420,8,21,10,21,12,21,423,9,21,1,
	22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,1,24,3,24,447,8,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,1,24,1,24,1,24,3,24,459,8,24,1,24,1,24,1,24,1,24,1,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,
	24,481,8,24,10,24,12,24,484,9,24,1,24,0,2,42,48,25,0,2,4,6,8,10,12,14,16,
	18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,0,9,2,0,49,49,52,52,1,0,
	19,31,2,0,42,42,44,44,1,0,16,17,1,0,42,45,2,0,47,47,49,49,1,0,1,2,1,0,57,
	58,1,0,68,69,533,0,50,1,0,0,0,2,57,1,0,0,0,4,59,1,0,0,0,6,74,1,0,0,0,8,
	80,1,0,0,0,10,85,1,0,0,0,12,90,1,0,0,0,14,96,1,0,0,0,16,111,1,0,0,0,18,
	118,1,0,0,0,20,122,1,0,0,0,22,144,1,0,0,0,24,168,1,0,0,0,26,196,1,0,0,0,
	28,242,1,0,0,0,30,246,1,0,0,0,32,248,1,0,0,0,34,255,1,0,0,0,36,261,1,0,
	0,0,38,268,1,0,0,0,40,272,1,0,0,0,42,399,1,0,0,0,44,424,1,0,0,0,46,428,
	1,0,0,0,48,458,1,0,0,0,50,51,7,0,0,0,51,1,1,0,0,0,52,54,5,39,0,0,53,52,
	1,0,0,0,53,54,1,0,0,0,54,55,1,0,0,0,55,58,5,48,0,0,56,58,5,47,0,0,57,53,
	1,0,0,0,57,56,1,0,0,0,58,3,1,0,0,0,59,60,3,2,1,0,60,61,3,44,22,0,61,5,1,
	0,0,0,62,75,3,8,4,0,63,75,3,10,5,0,64,75,3,12,6,0,65,75,3,44,22,0,66,75,
	3,2,1,0,67,75,3,0,0,0,68,75,3,32,16,0,69,75,3,34,17,0,70,75,3,36,18,0,71,
	75,3,42,21,0,72,75,3,30,15,0,73,75,3,14,7,0,74,62,1,0,0,0,74,63,1,0,0,0,
	74,64,1,0,0,0,74,65,1,0,0,0,74,66,1,0,0,0,74,67,1,0,0,0,74,68,1,0,0,0,74,
	69,1,0,0,0,74,70,1,0,0,0,74,71,1,0,0,0,74,72,1,0,0,0,74,73,1,0,0,0,74,75,
	1,0,0,0,75,76,1,0,0,0,76,77,5,0,0,1,77,7,1,0,0,0,78,81,3,0,0,0,79,81,5,
	10,0,0,80,78,1,0,0,0,80,79,1,0,0,0,81,82,1,0,0,0,82,83,5,41,0,0,83,84,3,
	42,21,0,84,9,1,0,0,0,85,86,3,42,21,0,86,88,5,41,0,0,87,89,3,44,22,0,88,
	87,1,0,0,0,88,89,1,0,0,0,89,11,1,0,0,0,90,91,3,42,21,0,91,92,5,41,0,0,92,
	93,3,42,21,0,93,13,1,0,0,0,94,97,3,0,0,0,95,97,5,10,0,0,96,94,1,0,0,0,96,
	95,1,0,0,0,97,98,1,0,0,0,98,99,5,41,0,0,99,100,3,0,0,0,100,101,5,6,0,0,
	101,106,3,16,8,0,102,103,5,46,0,0,103,105,3,16,8,0,104,102,1,0,0,0,105,
	108,1,0,0,0,106,104,1,0,0,0,106,107,1,0,0,0,107,109,1,0,0,0,108,106,1,0,
	0,0,109,110,5,7,0,0,110,15,1,0,0,0,111,112,5,6,0,0,112,113,3,42,21,0,113,
	114,5,46,0,0,114,115,3,30,15,0,115,116,5,7,0,0,116,17,1,0,0,0,117,119,5,
	18,0,0,118,117,1,0,0,0,118,119,1,0,0,0,119,120,1,0,0,0,120,121,7,1,0,0,
	121,19,1,0,0,0,122,123,5,11,0,0,123,124,5,9,0,0,124,125,5,4,0,0,125,126,
	5,5,0,0,126,127,5,40,0,0,127,128,5,4,0,0,128,129,5,5,0,0,129,130,5,6,0,
	0,130,131,3,42,21,0,131,138,5,7,0,0,132,133,5,12,0,0,133,134,5,4,0,0,134,
	135,3,0,0,0,135,136,5,5,0,0,136,139,1,0,0,0,137,139,3,0,0,0,138,132,1,0,
	0,0,138,137,1,0,0,0,139,140,1,0,0,0,140,141,5,6,0,0,141,142,3,0,0,0,142,
	143,5,7,0,0,143,21,1,0,0,0,144,145,5,11,0,0,145,146,5,9,0,0,146,147,5,4,
	0,0,147,148,3,42,21,0,148,149,5,5,0,0,149,150,5,40,0,0,150,151,5,4,0,0,
	151,152,3,42,21,0,152,153,5,5,0,0,153,154,5,6,0,0,154,155,3,42,21,0,155,
	162,5,7,0,0,156,157,5,12,0,0,157,158,5,4,0,0,158,159,3,0,0,0,159,160,5,
	5,0,0,160,163,1,0,0,0,161,163,3,0,0,0,162,156,1,0,0,0,162,161,1,0,0,0,163,
	164,1,0,0,0,164,165,5,6,0,0,165,166,3,0,0,0,166,167,5,7,0,0,167,23,1,0,
	0,0,168,169,5,13,0,0,169,176,5,4,0,0,170,171,5,12,0,0,171,172,5,4,0,0,172,
	173,3,0,0,0,173,174,5,5,0,0,174,177,1,0,0,0,175,177,3,0,0,0,176,170,1,0,
	0,0,176,175,1,0,0,0,177,178,1,0,0,0,178,179,5,5,0,0,179,186,5,4,0,0,180,
	181,5,12,0,0,181,182,5,4,0,0,182,183,3,0,0,0,183,184,5,5,0,0,184,187,1,
	0,0,0,185,187,3,0,0,0,186,180,1,0,0,0,186,185,1,0,0,0,187,188,1,0,0,0,188,
	189,5,6,0,0,189,190,3,0,0,0,190,191,5,7,0,0,191,192,5,5,0,0,192,193,5,6,
	0,0,193,194,3,42,21,0,194,195,5,7,0,0,195,25,1,0,0,0,196,197,5,13,0,0,197,
	204,5,4,0,0,198,199,5,12,0,0,199,200,5,4,0,0,200,201,3,0,0,0,201,202,5,
	5,0,0,202,205,1,0,0,0,203,205,3,0,0,0,204,198,1,0,0,0,204,203,1,0,0,0,205,
	206,1,0,0,0,206,207,5,40,0,0,207,208,5,4,0,0,208,209,3,2,1,0,209,210,5,
	5,0,0,210,211,5,5,0,0,211,218,5,4,0,0,212,213,5,12,0,0,213,214,5,4,0,0,
	214,215,3,0,0,0,215,216,5,5,0,0,216,219,1,0,0,0,217,219,3,0,0,0,218,212,
	1,0,0,0,218,217,1,0,0,0,219,220,1,0,0,0,220,221,5,6,0,0,221,222,3,0,0,0,
	222,223,5,7,0,0,223,224,5,40,0,0,224,225,5,4,0,0,225,226,3,2,1,0,226,227,
	5,5,0,0,227,228,5,5,0,0,228,229,5,6,0,0,229,230,3,42,21,0,230,231,5,7,0,
	0,231,27,1,0,0,0,232,233,3,0,0,0,233,234,5,41,0,0,234,235,3,42,21,0,235,
	243,1,0,0,0,236,237,3,42,21,0,237,238,7,2,0,0,238,239,3,0,0,0,239,240,7,
	2,0,0,240,241,3,42,21,0,241,243,1,0,0,0,242,232,1,0,0,0,242,236,1,0,0,0,
	243,29,1,0,0,0,244,247,3,38,19,0,245,247,3,40,20,0,246,244,1,0,0,0,246,
	245,1,0,0,0,247,31,1,0,0,0,248,251,3,0,0,0,249,250,5,46,0,0,250,252,3,0,
	0,0,251,249,1,0,0,0,252,253,1,0,0,0,253,251,1,0,0,0,253,254,1,0,0,0,254,
	33,1,0,0,0,255,256,3,0,0,0,256,259,7,3,0,0,257,260,3,2,1,0,258,260,3,4,
	2,0,259,257,1,0,0,0,259,258,1,0,0,0,260,35,1,0,0,0,261,264,3,34,17,0,262,
	263,5,46,0,0,263,265,3,34,17,0,264,262,1,0,0,0,265,266,1,0,0,0,266,264,
	1,0,0,0,266,267,1,0,0,0,267,37,1,0,0,0,268,269,3,42,21,0,269,270,7,4,0,
	0,270,271,3,42,21,0,271,39,1,0,0,0,272,273,3,42,21,0,273,274,7,4,0,0,274,
	275,3,42,21,0,275,276,7,4,0,0,276,277,3,42,21,0,277,41,1,0,0,0,278,279,
	6,21,-1,0,279,280,3,0,0,0,280,281,5,51,0,0,281,400,1,0,0,0,282,283,3,0,
	0,0,283,284,5,40,0,0,284,285,7,5,0,0,285,286,5,50,0,0,286,400,1,0,0,0,287,
	288,3,0,0,0,288,289,5,40,0,0,289,290,5,4,0,0,290,291,3,42,21,0,291,292,
	5,5,0,0,292,293,5,50,0,0,293,400,1,0,0,0,294,295,5,15,0,0,295,296,5,4,0,
	0,296,297,3,42,21,0,297,298,5,5,0,0,298,400,1,0,0,0,299,300,3,18,9,0,300,
	301,5,6,0,0,301,302,3,42,21,0,302,303,5,7,0,0,303,400,1,0,0,0,304,400,3,
	20,10,0,305,400,3,22,11,0,306,400,3,24,12,0,307,400,3,26,13,0,308,310,5,
	18,0,0,309,308,1,0,0,0,309,310,1,0,0,0,310,311,1,0,0,0,311,312,5,32,0,0,
	312,313,5,6,0,0,313,314,3,42,21,0,314,315,5,7,0,0,315,400,1,0,0,0,316,318,
	5,18,0,0,317,316,1,0,0,0,317,318,1,0,0,0,318,319,1,0,0,0,319,320,5,33,0,
	0,320,321,5,6,0,0,321,322,3,42,21,0,322,323,5,7,0,0,323,400,1,0,0,0,324,
	325,5,34,0,0,325,326,5,4,0,0,326,327,3,42,21,0,327,328,5,5,0,0,328,329,
	5,6,0,0,329,330,3,42,21,0,330,331,5,7,0,0,331,400,1,0,0,0,332,335,5,34,
	0,0,333,336,3,2,1,0,334,336,3,0,0,0,335,333,1,0,0,0,335,334,1,0,0,0,336,
	337,1,0,0,0,337,338,5,6,0,0,338,339,3,42,21,0,339,340,5,7,0,0,340,400,1,
	0,0,0,341,342,5,8,0,0,342,343,3,42,21,0,343,344,5,8,0,0,344,400,1,0,0,0,
	345,400,3,4,2,0,346,400,3,2,1,0,347,348,5,39,0,0,348,400,3,42,21,10,349,
	350,5,13,0,0,350,351,5,4,0,0,351,352,3,42,21,0,352,353,5,5,0,0,353,354,
	5,4,0,0,354,355,3,42,21,0,355,356,5,5,0,0,356,400,1,0,0,0,357,400,3,0,0,
	0,358,359,3,0,0,0,359,360,5,6,0,0,360,365,3,28,14,0,361,362,5,46,0,0,362,
	364,3,28,14,0,363,361,1,0,0,0,364,367,1,0,0,0,365,363,1,0,0,0,365,366,1,
	0,0,0,366,368,1,0,0,0,367,365,1,0,0,0,368,373,5,7,0,0,369,370,5,52,0,0,
	370,371,3,2,1,0,371,372,5,52,0,0,372,374,1,0,0,0,373,369,1,0,0,0,373,374,
	1,0,0,0,374,400,1,0,0,0,375,376,5,12,0,0,376,377,5,4,0,0,377,378,3,0,0,
	0,378,379,5,5,0,0,379,382,1,0,0,0,380,382,3,0,0,0,381,375,1,0,0,0,381,380,
	1,0,0,0,382,383,1,0,0,0,383,384,5,6,0,0,384,389,3,42,21,0,385,386,5,46,
	0,0,386,388,3,42,21,0,387,385,1,0,0,0,388,391,1,0,0,0,389,387,1,0,0,0,389,
	390,1,0,0,0,390,392,1,0,0,0,391,389,1,0,0,0,392,393,5,7,0,0,393,400,1,0,
	0,0,394,400,5,10,0,0,395,396,5,6,0,0,396,397,3,42,21,0,397,398,5,7,0,0,
	398,400,1,0,0,0,399,278,1,0,0,0,399,282,1,0,0,0,399,287,1,0,0,0,399,294,
	1,0,0,0,399,299,1,0,0,0,399,304,1,0,0,0,399,305,1,0,0,0,399,306,1,0,0,0,
	399,307,1,0,0,0,399,309,1,0,0,0,399,317,1,0,0,0,399,324,1,0,0,0,399,332,
	1,0,0,0,399,341,1,0,0,0,399,345,1,0,0,0,399,346,1,0,0,0,399,347,1,0,0,0,
	399,349,1,0,0,0,399,357,1,0,0,0,399,358,1,0,0,0,399,381,1,0,0,0,399,394,
	1,0,0,0,399,395,1,0,0,0,400,421,1,0,0,0,401,402,10,25,0,0,402,403,5,40,
	0,0,403,420,3,42,21,25,404,405,10,9,0,0,405,406,5,14,0,0,406,420,3,42,21,
	10,407,408,10,7,0,0,408,409,5,38,0,0,409,420,3,42,21,8,410,411,10,6,0,0,
	411,412,5,39,0,0,412,420,3,42,21,7,413,414,10,24,0,0,414,415,5,40,0,0,415,
	416,5,4,0,0,416,417,3,42,21,0,417,418,5,5,0,0,418,420,1,0,0,0,419,401,1,
	0,0,0,419,404,1,0,0,0,419,407,1,0,0,0,419,410,1,0,0,0,419,413,1,0,0,0,420,
	423,1,0,0,0,421,419,1,0,0,0,421,422,1,0,0,0,422,43,1,0,0,0,423,421,1,0,
	0,0,424,425,7,6,0,0,425,426,3,48,24,0,426,427,7,7,0,0,427,45,1,0,0,0,428,
	429,5,59,0,0,429,430,5,66,0,0,430,431,7,8,0,0,431,432,5,67,0,0,432,433,
	5,66,0,0,433,434,5,69,0,0,434,435,5,67,0,0,435,47,1,0,0,0,436,437,6,24,
	-1,0,437,438,5,61,0,0,438,439,5,66,0,0,439,440,3,42,21,0,440,441,5,67,0,
	0,441,459,1,0,0,0,442,443,5,59,0,0,443,446,5,66,0,0,444,447,3,48,24,0,445,
	447,5,68,0,0,446,444,1,0,0,0,446,445,1,0,0,0,447,448,1,0,0,0,448,449,5,
	67,0,0,449,450,5,66,0,0,450,451,3,48,24,0,451,452,5,67,0,0,452,459,1,0,
	0,0,453,459,5,63,0,0,454,455,5,64,0,0,455,456,3,48,24,0,456,457,5,65,0,
	0,457,459,1,0,0,0,458,436,1,0,0,0,458,442,1,0,0,0,458,453,1,0,0,0,458,454,
	1,0,0,0,459,482,1,0,0,0,460,461,10,4,0,0,461,462,5,60,0,0,462,481,3,48,
	24,5,463,464,10,9,0,0,464,465,5,62,0,0,465,481,5,69,0,0,466,467,10,8,0,
	0,467,468,5,62,0,0,468,469,5,66,0,0,469,470,5,69,0,0,470,481,5,67,0,0,471,
	472,10,7,0,0,472,473,5,62,0,0,473,481,3,46,23,0,474,475,10,6,0,0,475,476,
	5,62,0,0,476,477,5,66,0,0,477,478,3,46,23,0,478,479,5,67,0,0,479,481,1,
	0,0,0,480,460,1,0,0,0,480,463,1,0,0,0,480,466,1,0,0,0,480,471,1,0,0,0,480,
	474,1,0,0,0,481,484,1,0,0,0,482,480,1,0,0,0,482,483,1,0,0,0,483,49,1,0,
	0,0,484,482,1,0,0,0,33,53,57,74,80,88,96,106,118,138,162,176,186,204,218,
	242,246,253,259,266,309,317,335,365,373,381,389,399,419,421,446,458,480,
	482];

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
	public UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.UNDERSCORE, 0);
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
	public CARET(): TerminalNode {
		return this.getToken(LatexParser.CARET, 0);
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
	public CMD_INT(): TerminalNode {
		return this.getToken(LatexParser.CMD_INT, 0);
	}
	public UNDERSCORE(): TerminalNode {
		return this.getToken(LatexParser.UNDERSCORE, 0);
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
	public CARET(): TerminalNode {
		return this.getToken(LatexParser.CARET, 0);
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
	public CMD_MATHRM(): TerminalNode {
		return this.getToken(LatexParser.CMD_MATHRM, 0);
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
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
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
