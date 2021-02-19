// Generated from Latex.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import LatexListener from './LatexListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u000e-\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0005\u0003\u0014\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0007\u0003(\n\u0003\f\u0003\u000e\u0003",
    "+\u000b\u0003\u0003\u0003\u0002\u0003\u0004\u0004\u0002\u0004\u0002",
    "\u0002\u00021\u0002\u0006\u0003\u0002\u0002\u0002\u0004\u0013\u0003",
    "\u0002\u0002\u0002\u0006\u0007\u0007\r\u0002\u0002\u0007\b\u0007\u0003",
    "\u0002\u0002\b\t\u0005\u0004\u0003\u0002\t\u0003\u0003\u0002\u0002\u0002",
    "\n\u000b\b\u0003\u0001\u0002\u000b\f\u0007\b\u0002\u0002\f\r\u0005\u0004",
    "\u0003\u0002\r\u000e\u0007\t\u0002\u0002\u000e\u000f\u0005\u0004\u0003",
    "\u0002\u000f\u0010\u0007\u0006\u0002\u0002\u0010\u0014\u0003\u0002\u0002",
    "\u0002\u0011\u0014\u0007\r\u0002\u0002\u0012\u0014\u0007\f\u0002\u0002",
    "\u0013\n\u0003\u0002\u0002\u0002\u0013\u0011\u0003\u0002\u0002\u0002",
    "\u0013\u0012\u0003\u0002\u0002\u0002\u0014)\u0003\u0002\u0002\u0002",
    "\u0015\u0016\f\n\u0002\u0002\u0016\u0017\u0007\u0004\u0002\u0002\u0017",
    "(\u0005\u0004\u0003\n\u0018\u0019\f\b\u0002\u0002\u0019\u001a\u0007",
    "\u0007\u0002\u0002\u001a(\u0005\u0004\u0003\t\u001b\u001c\f\u0006\u0002",
    "\u0002\u001c\u001d\u0007\n\u0002\u0002\u001d(\u0005\u0004\u0003\u0007",
    "\u001e\u001f\f\u0005\u0002\u0002\u001f \u0007\u000b\u0002\u0002 (\u0005",
    "\u0004\u0003\u0006!\"\f\t\u0002\u0002\"#\u0007\u0004\u0002\u0002#$\u0007",
    "\u0005\u0002\u0002$%\u0005\u0004\u0003\u0002%&\u0007\u0006\u0002\u0002",
    "&(\u0003\u0002\u0002\u0002\'\u0015\u0003\u0002\u0002\u0002\'\u0018\u0003",
    "\u0002\u0002\u0002\'\u001b\u0003\u0002\u0002\u0002\'\u001e\u0003\u0002",
    "\u0002\u0002\'!\u0003\u0002\u0002\u0002(+\u0003\u0002\u0002\u0002)\'",
    "\u0003\u0002\u0002\u0002)*\u0003\u0002\u0002\u0002*\u0005\u0003\u0002",
    "\u0002\u0002+)\u0003\u0002\u0002\u0002\u0005\u0013\')"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LatexParser extends antlr4.Parser {

    static grammarFileName = "Latex.g4";
    static literalNames = [ null, "'='", "'^'", "'{'", "'}'", "'\\cdot'", 
                            "'\\frac{'", "'}{'", "'+'", "'-'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, "NUMBER", "ID", "WS" ];
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
	        this.match(LatexParser.T__0);
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
	        this.state = 17;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.T__5:
	            localctx = new DivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 9;
	            this.match(LatexParser.T__5);
	            this.state = 10;
	            this.expr(0);
	            this.state = 11;
	            this.match(LatexParser.T__6);
	            this.state = 12;
	            this.expr(0);
	            this.state = 13;
	            this.match(LatexParser.T__3);
	            break;
	        case LatexParser.ID:
	            localctx = new Id_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 15;
	            this.match(LatexParser.ID);
	            break;
	        case LatexParser.NUMBER:
	            localctx = new Number_exprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 16;
	            this.match(LatexParser.NUMBER);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 39;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 37;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 19;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 20;
	                    this.match(LatexParser.T__1);
	                    this.state = 21;
	                    this.expr(8);
	                    break;

	                case 2:
	                    localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 22;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 23;
	                    this.match(LatexParser.T__4);
	                    this.state = 24;
	                    this.expr(7);
	                    break;

	                case 3:
	                    localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 25;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 26;
	                    this.match(LatexParser.T__7);
	                    this.state = 27;
	                    this.expr(5);
	                    break;

	                case 4:
	                    localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 28;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 29;
	                    this.match(LatexParser.T__8);
	                    this.state = 30;
	                    this.expr(4);
	                    break;

	                case 5:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 31;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 32;
	                    this.match(LatexParser.T__1);
	                    this.state = 33;
	                    this.match(LatexParser.T__2);
	                    this.state = 34;
	                    this.expr(0);
	                    this.state = 35;
	                    this.match(LatexParser.T__3);
	                    break;

	                } 
	            }
	            this.state = 41;
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
LatexParser.T__0 = 1;
LatexParser.T__1 = 2;
LatexParser.T__2 = 3;
LatexParser.T__3 = 4;
LatexParser.T__4 = 5;
LatexParser.T__5 = 6;
LatexParser.T__6 = 7;
LatexParser.T__7 = 8;
LatexParser.T__8 = 9;
LatexParser.NUMBER = 10;
LatexParser.ID = 11;
LatexParser.WS = 12;

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

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexListener ) {
	        listener.enterAssign(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexListener ) {
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

	enterRule(listener) {
	    if(listener instanceof LatexListener ) {
	        listener.enterAdd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexListener ) {
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
	    if(listener instanceof LatexListener ) {
	        listener.enterId_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexListener ) {
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

	enterRule(listener) {
	    if(listener instanceof LatexListener ) {
	        listener.enterSubtract(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexListener ) {
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

	enterRule(listener) {
	    if(listener instanceof LatexListener ) {
	        listener.enterDivide(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexListener ) {
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

	enterRule(listener) {
	    if(listener instanceof LatexListener ) {
	        listener.enterMultiply(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexListener ) {
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
	    if(listener instanceof LatexListener ) {
	        listener.enterNumber_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexListener ) {
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

	enterRule(listener) {
	    if(listener instanceof LatexListener ) {
	        listener.enterExponent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexListener ) {
	        listener.exitExponent(this);
		}
	}


}

LatexParser.ExponentContext = ExponentContext;


LatexParser.AssignContext = AssignContext; 
LatexParser.ExprContext = ExprContext; 
