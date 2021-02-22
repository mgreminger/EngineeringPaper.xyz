// Generated from LatexParser.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import LatexParserListener from './LatexParserListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u001f_\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0005\u0003!\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0007\u00035\n\u0003\f\u0003\u000e\u0003",
    "8\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0005\u0005L\n\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005Z\n\u0005\f\u0005",
    "\u000e\u0005]\u000b\u0005\u0003\u0005\u0002\u0004\u0004\b\u0006\u0002",
    "\u0004\u0006\b\u0002\u0002\u0002h\u0002\n\u0003\u0002\u0002\u0002\u0004",
    " \u0003\u0002\u0002\u0002\u00069\u0003\u0002\u0002\u0002\bK\u0003\u0002",
    "\u0002\u0002\n\u000b\u0007\u0012\u0002\u0002\u000b\f\u0007\u0010\u0002",
    "\u0002\f\r\u0005\u0004\u0003\u0002\r\u000e\u0007\u0004\u0002\u0002\u000e",
    "\u0003\u0003\u0002\u0002\u0002\u000f\u0010\b\u0003\u0001\u0002\u0010",
    "\u0011\u0007\t\u0002\u0002\u0011\u0012\u0007\u0005\u0002\u0002\u0012",
    "\u0013\u0005\u0004\u0003\u0002\u0013\u0014\u0007\u0006\u0002\u0002\u0014",
    "\u0015\u0007\u0005\u0002\u0002\u0015\u0016\u0005\u0004\u0003\u0002\u0016",
    "\u0017\u0007\u0006\u0002\u0002\u0017!\u0003\u0002\u0002\u0002\u0018",
    "!\u0007\u0012\u0002\u0002\u0019\u001a\u0007\u0011\u0002\u0002\u001a",
    "!\u0005\u0006\u0004\u0002\u001b!\u0007\u0011\u0002\u0002\u001c\u001d",
    "\u0007\u0007\u0002\u0002\u001d\u001e\u0005\u0004\u0003\u0002\u001e\u001f",
    "\u0007\b\u0002\u0002\u001f!\u0003\u0002\u0002\u0002 \u000f\u0003\u0002",
    "\u0002\u0002 \u0018\u0003\u0002\u0002\u0002 \u0019\u0003\u0002\u0002",
    "\u0002 \u001b\u0003\u0002\u0002\u0002 \u001c\u0003\u0002\u0002\u0002",
    "!6\u0003\u0002\u0002\u0002\"#\f\f\u0002\u0002#$\u0007\u000f\u0002\u0002",
    "$5\u0005\u0004\u0003\f%&\f\n\u0002\u0002&\'\u0007\n\u0002\u0002\'5\u0005",
    "\u0004\u0003\u000b()\f\b\u0002\u0002)*\u0007\r\u0002\u0002*5\u0005\u0004",
    "\u0003\t+,\f\u0007\u0002\u0002,-\u0007\u000e\u0002\u0002-5\u0005\u0004",
    "\u0003\b./\f\u000b\u0002\u0002/0\u0007\u000f\u0002\u000201\u0007\u0005",
    "\u0002\u000212\u0005\u0004\u0003\u000223\u0007\u0006\u0002\u000235\u0003",
    "\u0002\u0002\u00024\"\u0003\u0002\u0002\u00024%\u0003\u0002\u0002\u0002",
    "4(\u0003\u0002\u0002\u00024+\u0003\u0002\u0002\u00024.\u0003\u0002\u0002",
    "\u000258\u0003\u0002\u0002\u000264\u0003\u0002\u0002\u000267\u0003\u0002",
    "\u0002\u00027\u0005\u0003\u0002\u0002\u000286\u0003\u0002\u0002\u0002",
    "9:\u0007\u0003\u0002\u0002:;\u0005\b\u0005\u0002;<\u0007\u0017\u0002",
    "\u0002<\u0007\u0003\u0002\u0002\u0002=>\b\u0005\u0001\u0002>?\u0007",
    "\u0018\u0002\u0002?@\u0007\u001e\u0002\u0002@A\u0005\b\u0005\u0002A",
    "B\u0007\u001f\u0002\u0002BC\u0007\u001e\u0002\u0002CD\u0005\b\u0005",
    "\u0002DE\u0007\u001f\u0002\u0002EL\u0003\u0002\u0002\u0002FL\u0007\u001b",
    "\u0002\u0002GH\u0007\u001c\u0002\u0002HI\u0005\b\u0005\u0002IJ\u0007",
    "\u001d\u0002\u0002JL\u0003\u0002\u0002\u0002K=\u0003\u0002\u0002\u0002",
    "KF\u0003\u0002\u0002\u0002KG\u0003\u0002\u0002\u0002L[\u0003\u0002\u0002",
    "\u0002MN\f\b\u0002\u0002NO\u0007\u001a\u0002\u0002OZ\u0005\b\u0005\b",
    "PQ\f\u0006\u0002\u0002QR\u0007\u0019\u0002\u0002RZ\u0005\b\u0005\u0007",
    "ST\f\u0007\u0002\u0002TU\u0007\u001a\u0002\u0002UV\u0007\u001e\u0002",
    "\u0002VW\u0005\b\u0005\u0002WX\u0007\u001f\u0002\u0002XZ\u0003\u0002",
    "\u0002\u0002YM\u0003\u0002\u0002\u0002YP\u0003\u0002\u0002\u0002YS\u0003",
    "\u0002\u0002\u0002Z]\u0003\u0002\u0002\u0002[Y\u0003\u0002\u0002\u0002",
    "[\\\u0003\u0002\u0002\u0002\\\t\u0003\u0002\u0002\u0002][\u0003\u0002",
    "\u0002\u0002\b 46KY["].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LatexParser extends antlr4.Parser {

    static grammarFileName = "LatexParser.g4";
    static literalNames = [ null, "'['", "';'", null, null, null, null, 
                            null, null, null, null, "'+'", "'-'", null, 
                            "'='", null, null, null, null, null, null, "']'" ];
    static symbolicNames = [ null, "L_BRACKET", "SEMICOLON", "L_BRACE", 
                             "R_BRACE", "L_PAREN", "R_PAREN", "CMD_FRAC", 
                             "CMD_CDOT", "CMD_LEFT", "CMD_RIGHT", "ADD", 
                             "SUB", "CARET", "EQ", "NUMBER", "ID", "WS", 
                             "U_WS", "U_CMD_LEFT", "U_CMD_RIGHT", "R_BRACKET", 
                             "U_CMD_FRAC", "U_CMD_CDOT", "U_CARET", "U_NAME", 
                             "U_L_PAREN", "U_R_PAREN", "U_L_BRACE", "U_R_BRACE" ];
    static ruleNames = [ "assign", "expr", "u_block", "u_expr" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = LatexParser.ruleNames;
        this.literalNames = LatexParser.literalNames;
        this.symbolicNames = LatexParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.expr_sempred(localctx, predIndex);
    	case 3:
    	    		return this.u_expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 10);
    		case 1:
    			return this.precpred(this._ctx, 8);
    		case 2:
    			return this.precpred(this._ctx, 6);
    		case 3:
    			return this.precpred(this._ctx, 5);
    		case 4:
    			return this.precpred(this._ctx, 9);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    u_expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 5:
    			return this.precpred(this._ctx, 6);
    		case 6:
    			return this.precpred(this._ctx, 4);
    		case 7:
    			return this.precpred(this._ctx, 5);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	assign() {
	    let localctx = new AssignContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LatexParser.RULE_assign);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 8;
	        this.match(LatexParser.ID);
	        this.state = 9;
	        this.match(LatexParser.EQ);
	        this.state = 10;
	        this.expr(0);
	        this.state = 11;
	        this.match(LatexParser.SEMICOLON);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, LatexParser.RULE_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 30;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new DivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 14;
	            this.match(LatexParser.CMD_FRAC);
	            this.state = 15;
	            this.match(LatexParser.L_BRACE);
	            this.state = 16;
	            this.expr(0);
	            this.state = 17;
	            this.match(LatexParser.R_BRACE);
	            this.state = 18;
	            this.match(LatexParser.L_BRACE);
	            this.state = 19;
	            this.expr(0);
	            this.state = 20;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 2:
	            localctx = new Id_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 22;
	            this.match(LatexParser.ID);
	            break;

	        case 3:
	            localctx = new Number_expr_with_unitsContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 23;
	            this.match(LatexParser.NUMBER);
	            this.state = 24;
	            this.u_block();
	            break;

	        case 4:
	            localctx = new Number_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 25;
	            this.match(LatexParser.NUMBER);
	            break;

	        case 5:
	            localctx = new Sub_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 26;
	            this.match(LatexParser.L_PAREN);
	            this.state = 27;
	            this.expr(0);
	            this.state = 28;
	            this.match(LatexParser.R_PAREN);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 52;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 50;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 32;
	                    if (!( this.precpred(this._ctx, 10))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
	                    }
	                    this.state = 33;
	                    this.match(LatexParser.CARET);
	                    this.state = 34;
	                    this.expr(10);
	                    break;

	                case 2:
	                    localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 35;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 36;
	                    this.match(LatexParser.CMD_CDOT);
	                    this.state = 37;
	                    this.expr(9);
	                    break;

	                case 3:
	                    localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 38;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 39;
	                    this.match(LatexParser.ADD);
	                    this.state = 40;
	                    this.expr(7);
	                    break;

	                case 4:
	                    localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 41;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 42;
	                    this.match(LatexParser.SUB);
	                    this.state = 43;
	                    this.expr(6);
	                    break;

	                case 5:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 44;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 45;
	                    this.match(LatexParser.CARET);
	                    this.state = 46;
	                    this.match(LatexParser.L_BRACE);
	                    this.state = 47;
	                    this.expr(0);
	                    this.state = 48;
	                    this.match(LatexParser.R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 54;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	u_block() {
	    let localctx = new U_blockContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, LatexParser.RULE_u_block);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 55;
	        this.match(LatexParser.L_BRACKET);
	        this.state = 56;
	        this.u_expr(0);
	        this.state = 57;
	        this.match(LatexParser.R_BRACKET);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	u_expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new U_exprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 6;
	    this.enterRecursionRule(localctx, 6, LatexParser.RULE_u_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 73;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.U_CMD_FRAC:
	            localctx = new U_divideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 60;
	            this.match(LatexParser.U_CMD_FRAC);
	            this.state = 61;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 62;
	            this.u_expr(0);
	            this.state = 63;
	            this.match(LatexParser.U_R_BRACE);
	            this.state = 64;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 65;
	            this.u_expr(0);
	            this.state = 66;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case LatexParser.U_NAME:
	            localctx = new U_name_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 68;
	            this.match(LatexParser.U_NAME);
	            break;
	        case LatexParser.U_L_PAREN:
	            localctx = new U_sub_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 69;
	            this.match(LatexParser.U_L_PAREN);
	            this.state = 70;
	            this.u_expr(0);
	            this.state = 71;
	            this.match(LatexParser.U_R_PAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 89;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 87;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new U_exponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 75;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 76;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 77;
	                    this.u_expr(6);
	                    break;

	                case 2:
	                    localctx = new U_multiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 78;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 79;
	                    this.match(LatexParser.U_CMD_CDOT);
	                    this.state = 80;
	                    this.u_expr(5);
	                    break;

	                case 3:
	                    localctx = new U_exponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 81;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 82;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 83;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 84;
	                    this.u_expr(0);
	                    this.state = 85;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 91;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


}

LatexParser.EOF = antlr4.Token.EOF;
LatexParser.L_BRACKET = 1;
LatexParser.SEMICOLON = 2;
LatexParser.L_BRACE = 3;
LatexParser.R_BRACE = 4;
LatexParser.L_PAREN = 5;
LatexParser.R_PAREN = 6;
LatexParser.CMD_FRAC = 7;
LatexParser.CMD_CDOT = 8;
LatexParser.CMD_LEFT = 9;
LatexParser.CMD_RIGHT = 10;
LatexParser.ADD = 11;
LatexParser.SUB = 12;
LatexParser.CARET = 13;
LatexParser.EQ = 14;
LatexParser.NUMBER = 15;
LatexParser.ID = 16;
LatexParser.WS = 17;
LatexParser.U_WS = 18;
LatexParser.U_CMD_LEFT = 19;
LatexParser.U_CMD_RIGHT = 20;
LatexParser.R_BRACKET = 21;
LatexParser.U_CMD_FRAC = 22;
LatexParser.U_CMD_CDOT = 23;
LatexParser.U_CARET = 24;
LatexParser.U_NAME = 25;
LatexParser.U_L_PAREN = 26;
LatexParser.U_R_PAREN = 27;
LatexParser.U_L_BRACE = 28;
LatexParser.U_R_BRACE = 29;

LatexParser.RULE_assign = 0;
LatexParser.RULE_expr = 1;
LatexParser.RULE_u_block = 2;
LatexParser.RULE_u_expr = 3;

class AssignContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_assign;
    }

	ID() {
	    return this.getToken(LatexParser.ID, 0);
	};

	EQ() {
	    return this.getToken(LatexParser.EQ, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	SEMICOLON() {
	    return this.getToken(LatexParser.SEMICOLON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterAssign(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitAssign(this);
		}
	}


}



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_expr;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class AddContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	ADD() {
	    return this.getToken(LatexParser.ADD, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterAdd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitAdd(this);
		}
	}


}

LatexParser.AddContext = AddContext;

class Sub_exprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	L_PAREN() {
	    return this.getToken(LatexParser.L_PAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	R_PAREN() {
	    return this.getToken(LatexParser.R_PAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterSub_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitSub_expr(this);
		}
	}


}

LatexParser.Sub_exprContext = Sub_exprContext;

class Id_exprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	ID() {
	    return this.getToken(LatexParser.ID, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterId_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitId_expr(this);
		}
	}


}

LatexParser.Id_exprContext = Id_exprContext;

class Number_expr_with_unitsContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NUMBER() {
	    return this.getToken(LatexParser.NUMBER, 0);
	};

	u_block() {
	    return this.getTypedRuleContext(U_blockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterNumber_expr_with_units(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitNumber_expr_with_units(this);
		}
	}


}

LatexParser.Number_expr_with_unitsContext = Number_expr_with_unitsContext;

class SubtractContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	SUB() {
	    return this.getToken(LatexParser.SUB, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterSubtract(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitSubtract(this);
		}
	}


}

LatexParser.SubtractContext = SubtractContext;

class DivideContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	CMD_FRAC() {
	    return this.getToken(LatexParser.CMD_FRAC, 0);
	};

	L_BRACE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.L_BRACE);
	    } else {
	        return this.getToken(LatexParser.L_BRACE, i);
	    }
	};


	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	R_BRACE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.R_BRACE);
	    } else {
	        return this.getToken(LatexParser.R_BRACE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterDivide(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitDivide(this);
		}
	}


}

LatexParser.DivideContext = DivideContext;

class MultiplyContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	CMD_CDOT() {
	    return this.getToken(LatexParser.CMD_CDOT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterMultiply(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitMultiply(this);
		}
	}


}

LatexParser.MultiplyContext = MultiplyContext;

class Number_exprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NUMBER() {
	    return this.getToken(LatexParser.NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterNumber_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitNumber_expr(this);
		}
	}


}

LatexParser.Number_exprContext = Number_exprContext;

class ExponentContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	CARET() {
	    return this.getToken(LatexParser.CARET, 0);
	};

	L_BRACE() {
	    return this.getToken(LatexParser.L_BRACE, 0);
	};

	R_BRACE() {
	    return this.getToken(LatexParser.R_BRACE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterExponent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitExponent(this);
		}
	}


}

LatexParser.ExponentContext = ExponentContext;

class U_blockContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_u_block;
    }

	L_BRACKET() {
	    return this.getToken(LatexParser.L_BRACKET, 0);
	};

	u_expr() {
	    return this.getTypedRuleContext(U_exprContext,0);
	};

	R_BRACKET() {
	    return this.getToken(LatexParser.R_BRACKET, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterU_block(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitU_block(this);
		}
	}


}



class U_exprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_u_expr;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class U_multiplyContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	u_expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(U_exprContext);
	    } else {
	        return this.getTypedRuleContext(U_exprContext,i);
	    }
	};

	U_CMD_CDOT() {
	    return this.getToken(LatexParser.U_CMD_CDOT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterU_multiply(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitU_multiply(this);
		}
	}


}

LatexParser.U_multiplyContext = U_multiplyContext;

class U_name_exprContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	U_NAME() {
	    return this.getToken(LatexParser.U_NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterU_name_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitU_name_expr(this);
		}
	}


}

LatexParser.U_name_exprContext = U_name_exprContext;

class U_sub_exprContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	U_L_PAREN() {
	    return this.getToken(LatexParser.U_L_PAREN, 0);
	};

	u_expr() {
	    return this.getTypedRuleContext(U_exprContext,0);
	};

	U_R_PAREN() {
	    return this.getToken(LatexParser.U_R_PAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterU_sub_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitU_sub_expr(this);
		}
	}


}

LatexParser.U_sub_exprContext = U_sub_exprContext;

class U_divideContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	U_CMD_FRAC() {
	    return this.getToken(LatexParser.U_CMD_FRAC, 0);
	};

	U_L_BRACE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.U_L_BRACE);
	    } else {
	        return this.getToken(LatexParser.U_L_BRACE, i);
	    }
	};


	u_expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(U_exprContext);
	    } else {
	        return this.getTypedRuleContext(U_exprContext,i);
	    }
	};

	U_R_BRACE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.U_R_BRACE);
	    } else {
	        return this.getToken(LatexParser.U_R_BRACE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterU_divide(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitU_divide(this);
		}
	}


}

LatexParser.U_divideContext = U_divideContext;

class U_exponentContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	u_expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(U_exprContext);
	    } else {
	        return this.getTypedRuleContext(U_exprContext,i);
	    }
	};

	U_CARET() {
	    return this.getToken(LatexParser.U_CARET, 0);
	};

	U_L_BRACE() {
	    return this.getToken(LatexParser.U_L_BRACE, 0);
	};

	U_R_BRACE() {
	    return this.getToken(LatexParser.U_R_BRACE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterU_exponent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitU_exponent(this);
		}
	}


}

LatexParser.U_exponentContext = U_exponentContext;


LatexParser.AssignContext = AssignContext; 
LatexParser.ExprContext = ExprContext; 
LatexParser.U_blockContext = U_blockContext; 
LatexParser.U_exprContext = U_exprContext; 
