// Generated from LatexParser.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import LatexParserListener from './LatexParserListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\r/\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0005\u0003\u0016\n\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003*",
    "\n\u0003\f\u0003\u000e\u0003-\u000b\u0003\u0003\u0003\u0002\u0003\u0004",
    "\u0004\u0002\u0004\u0002\u0002\u00023\u0002\u0006\u0003\u0002\u0002",
    "\u0002\u0004\u0015\u0003\u0002\u0002\u0002\u0006\u0007\u0007\f\u0002",
    "\u0002\u0007\b\u0007\n\u0002\u0002\b\t\u0005\u0004\u0003\u0002\t\u0003",
    "\u0003\u0002\u0002\u0002\n\u000b\b\u0003\u0001\u0002\u000b\f\u0007\u0005",
    "\u0002\u0002\f\r\u0007\u0003\u0002\u0002\r\u000e\u0005\u0004\u0003\u0002",
    "\u000e\u000f\u0007\u0004\u0002\u0002\u000f\u0010\u0007\u0003\u0002\u0002",
    "\u0010\u0011\u0005\u0004\u0003\u0002\u0011\u0012\u0007\u0004\u0002\u0002",
    "\u0012\u0016\u0003\u0002\u0002\u0002\u0013\u0016\u0007\f\u0002\u0002",
    "\u0014\u0016\u0007\u000b\u0002\u0002\u0015\n\u0003\u0002\u0002\u0002",
    "\u0015\u0013\u0003\u0002\u0002\u0002\u0015\u0014\u0003\u0002\u0002\u0002",
    "\u0016+\u0003\u0002\u0002\u0002\u0017\u0018\f\n\u0002\u0002\u0018\u0019",
    "\u0007\t\u0002\u0002\u0019*\u0005\u0004\u0003\n\u001a\u001b\f\b\u0002",
    "\u0002\u001b\u001c\u0007\u0006\u0002\u0002\u001c*\u0005\u0004\u0003",
    "\t\u001d\u001e\f\u0006\u0002\u0002\u001e\u001f\u0007\u0007\u0002\u0002",
    "\u001f*\u0005\u0004\u0003\u0007 !\f\u0005\u0002\u0002!\"\u0007\b\u0002",
    "\u0002\"*\u0005\u0004\u0003\u0006#$\f\t\u0002\u0002$%\u0007\t\u0002",
    "\u0002%&\u0007\u0003\u0002\u0002&\'\u0005\u0004\u0003\u0002\'(\u0007",
    "\u0004\u0002\u0002(*\u0003\u0002\u0002\u0002)\u0017\u0003\u0002\u0002",
    "\u0002)\u001a\u0003\u0002\u0002\u0002)\u001d\u0003\u0002\u0002\u0002",
    ") \u0003\u0002\u0002\u0002)#\u0003\u0002\u0002\u0002*-\u0003\u0002\u0002",
    "\u0002+)\u0003\u0002\u0002\u0002+,\u0003\u0002\u0002\u0002,\u0005\u0003",
    "\u0002\u0002\u0002-+\u0003\u0002\u0002\u0002\u0005\u0015)+"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LatexParser extends antlr4.Parser {

    static grammarFileName = "LatexParser.g4";
    static literalNames = [ null, "'{'", "'}'", "'\\frac'", "'\\cdot'", 
                            "'+'", "'-'", "'^'", "'='" ];
    static symbolicNames = [ null, "L_BRACE", "R_BRACE", "CMD_FRAC", "CMD_CDOT", 
                             "ADD", "SUB", "CARET", "EQ", "NUMBER", "ID", 
                             "WS" ];
    static ruleNames = [ "assign", "expr" ];

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
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 8);
    		case 1:
    			return this.precpred(this._ctx, 6);
    		case 2:
    			return this.precpred(this._ctx, 4);
    		case 3:
    			return this.precpred(this._ctx, 3);
    		case 4:
    			return this.precpred(this._ctx, 7);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	assign() {
	    let localctx = new AssignContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LatexParser.RULE_assign);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 4;
	        this.match(LatexParser.ID);
	        this.state = 5;
	        this.match(LatexParser.EQ);
	        this.state = 6;
	        this.expr(0);
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
	        this.state = 19;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_FRAC:
	            localctx = new DivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 9;
	            this.match(LatexParser.CMD_FRAC);
	            this.state = 10;
	            this.match(LatexParser.L_BRACE);
	            this.state = 11;
	            this.expr(0);
	            this.state = 12;
	            this.match(LatexParser.R_BRACE);
	            this.state = 13;
	            this.match(LatexParser.L_BRACE);
	            this.state = 14;
	            this.expr(0);
	            this.state = 15;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            localctx = new Id_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 17;
	            this.match(LatexParser.ID);
	            break;
	        case LatexParser.NUMBER:
	            localctx = new Number_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 18;
	            this.match(LatexParser.NUMBER);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 41;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 39;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 21;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 22;
	                    this.match(LatexParser.CARET);
	                    this.state = 23;
	                    this.expr(8);
	                    break;

	                case 2:
	                    localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 24;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 25;
	                    this.match(LatexParser.CMD_CDOT);
	                    this.state = 26;
	                    this.expr(7);
	                    break;

	                case 3:
	                    localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 27;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 28;
	                    this.match(LatexParser.ADD);
	                    this.state = 29;
	                    this.expr(5);
	                    break;

	                case 4:
	                    localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 30;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 31;
	                    this.match(LatexParser.SUB);
	                    this.state = 32;
	                    this.expr(4);
	                    break;

	                case 5:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 33;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 34;
	                    this.match(LatexParser.CARET);
	                    this.state = 35;
	                    this.match(LatexParser.L_BRACE);
	                    this.state = 36;
	                    this.expr(0);
	                    this.state = 37;
	                    this.match(LatexParser.R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 43;
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


}

LatexParser.EOF = antlr4.Token.EOF;
LatexParser.L_BRACE = 1;
LatexParser.R_BRACE = 2;
LatexParser.CMD_FRAC = 3;
LatexParser.CMD_CDOT = 4;
LatexParser.ADD = 5;
LatexParser.SUB = 6;
LatexParser.CARET = 7;
LatexParser.EQ = 8;
LatexParser.NUMBER = 9;
LatexParser.ID = 10;
LatexParser.WS = 11;

LatexParser.RULE_assign = 0;
LatexParser.RULE_expr = 1;

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


LatexParser.AssignContext = AssignContext; 
LatexParser.ExprContext = ExprContext; 
