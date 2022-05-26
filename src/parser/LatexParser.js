// Generated from LatexParser.g4 by ANTLR 4.10.1
// jshint ignore: start
import antlr4 from 'antlr4';
import LatexParserListener from './LatexParserListener.js';
import LatexParserVisitor from './LatexParserVisitor.js';

const serializedATN = [4,1,64,357,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,1,0,1,0,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,
2,3,2,44,8,2,1,2,1,2,1,3,1,3,3,3,50,8,3,1,3,1,3,1,3,1,4,1,4,1,4,3,4,58,8,
4,1,5,1,5,1,5,1,5,1,6,3,6,65,8,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,
1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,85,8,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,
8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,109,8,8,1,
8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,3,9,123,8,9,1,9,1,9,1,9,1,
9,1,9,1,9,1,9,1,9,3,9,133,8,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,10,1,10,
1,10,1,10,1,10,1,10,1,10,1,10,3,10,151,8,10,1,10,1,10,1,10,1,10,1,10,1,10,
1,10,1,10,1,10,1,10,1,10,1,10,3,10,165,8,10,1,10,1,10,1,10,1,10,1,10,1,10,
1,10,1,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,
11,1,11,3,11,189,8,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,1,12,1,12,1,12,1,12,3,12,207,8,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,5,12,255,8,12,10,
12,12,12,258,9,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
3,12,271,8,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,1,12,1,12,1,12,1,12,5,12,291,8,12,10,12,12,12,294,9,12,1,13,1,
13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,
1,15,1,15,1,15,1,15,1,15,1,15,3,15,318,8,15,1,15,1,15,1,15,1,15,1,15,1,15,
1,15,1,15,1,15,1,15,3,15,330,8,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,
1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,5,15,352,8,15,
10,15,12,15,355,9,15,1,15,0,2,24,30,16,0,2,4,6,8,10,12,14,16,18,20,22,24,
26,28,30,0,4,1,0,16,28,2,0,38,38,40,40,1,0,30,31,1,0,58,59,390,0,32,1,0,
0,0,2,34,1,0,0,0,4,43,1,0,0,0,6,49,1,0,0,0,8,54,1,0,0,0,10,59,1,0,0,0,12,
64,1,0,0,0,14,68,1,0,0,0,16,90,1,0,0,0,18,114,1,0,0,0,20,142,1,0,0,0,22,
188,1,0,0,0,24,270,1,0,0,0,26,295,1,0,0,0,28,299,1,0,0,0,30,329,1,0,0,0,
32,33,5,44,0,0,33,1,1,0,0,0,34,35,5,43,0,0,35,3,1,0,0,0,36,44,3,6,3,0,37,
44,3,8,4,0,38,44,3,10,5,0,39,44,3,26,13,0,40,44,3,2,1,0,41,44,3,0,0,0,42,
44,3,24,12,0,43,36,1,0,0,0,43,37,1,0,0,0,43,38,1,0,0,0,43,39,1,0,0,0,43,
40,1,0,0,0,43,41,1,0,0,0,43,42,1,0,0,0,44,45,1,0,0,0,45,46,5,0,0,1,46,5,
1,0,0,0,47,50,3,0,0,0,48,50,5,9,0,0,49,47,1,0,0,0,49,48,1,0,0,0,50,51,1,
0,0,0,51,52,5,37,0,0,52,53,3,24,12,0,53,7,1,0,0,0,54,55,3,24,12,0,55,57,
5,37,0,0,56,58,3,26,13,0,57,56,1,0,0,0,57,58,1,0,0,0,58,9,1,0,0,0,59,60,
3,24,12,0,60,61,5,37,0,0,61,62,3,24,12,0,62,11,1,0,0,0,63,65,5,15,0,0,64,
63,1,0,0,0,64,65,1,0,0,0,65,66,1,0,0,0,66,67,7,0,0,0,67,13,1,0,0,0,68,69,
5,10,0,0,69,70,5,8,0,0,70,71,5,3,0,0,71,72,5,4,0,0,72,73,5,36,0,0,73,74,
5,3,0,0,74,75,5,4,0,0,75,76,5,5,0,0,76,77,3,24,12,0,77,84,5,6,0,0,78,79,
5,11,0,0,79,80,5,3,0,0,80,81,3,0,0,0,81,82,5,4,0,0,82,85,1,0,0,0,83,85,3,
0,0,0,84,78,1,0,0,0,84,83,1,0,0,0,85,86,1,0,0,0,86,87,5,5,0,0,87,88,3,0,
0,0,88,89,5,6,0,0,89,15,1,0,0,0,90,91,5,10,0,0,91,92,5,8,0,0,92,93,5,3,0,
0,93,94,3,24,12,0,94,95,5,4,0,0,95,96,5,36,0,0,96,97,5,3,0,0,97,98,3,24,
12,0,98,99,5,4,0,0,99,100,5,5,0,0,100,101,3,24,12,0,101,108,5,6,0,0,102,
103,5,11,0,0,103,104,5,3,0,0,104,105,3,0,0,0,105,106,5,4,0,0,106,109,1,0,
0,0,107,109,3,0,0,0,108,102,1,0,0,0,108,107,1,0,0,0,109,110,1,0,0,0,110,
111,5,5,0,0,111,112,3,0,0,0,112,113,5,6,0,0,113,17,1,0,0,0,114,115,5,12,
0,0,115,122,5,3,0,0,116,117,5,11,0,0,117,118,5,3,0,0,118,119,3,0,0,0,119,
120,5,4,0,0,120,123,1,0,0,0,121,123,3,0,0,0,122,116,1,0,0,0,122,121,1,0,
0,0,123,124,1,0,0,0,124,125,5,4,0,0,125,132,5,3,0,0,126,127,5,11,0,0,127,
128,5,3,0,0,128,129,3,0,0,0,129,130,5,4,0,0,130,133,1,0,0,0,131,133,3,0,
0,0,132,126,1,0,0,0,132,131,1,0,0,0,133,134,1,0,0,0,134,135,5,5,0,0,135,
136,3,0,0,0,136,137,5,6,0,0,137,138,5,4,0,0,138,139,5,5,0,0,139,140,3,24,
12,0,140,141,5,6,0,0,141,19,1,0,0,0,142,143,5,12,0,0,143,150,5,3,0,0,144,
145,5,11,0,0,145,146,5,3,0,0,146,147,3,0,0,0,147,148,5,4,0,0,148,151,1,0,
0,0,149,151,3,0,0,0,150,144,1,0,0,0,150,149,1,0,0,0,151,152,1,0,0,0,152,
153,5,36,0,0,153,154,5,3,0,0,154,155,3,2,1,0,155,156,5,4,0,0,156,157,5,4,
0,0,157,164,5,3,0,0,158,159,5,11,0,0,159,160,5,3,0,0,160,161,3,0,0,0,161,
162,5,4,0,0,162,165,1,0,0,0,163,165,3,0,0,0,164,158,1,0,0,0,164,163,1,0,
0,0,165,166,1,0,0,0,166,167,5,5,0,0,167,168,3,0,0,0,168,169,5,6,0,0,169,
170,5,36,0,0,170,171,5,3,0,0,171,172,3,2,1,0,172,173,5,4,0,0,173,174,5,4,
0,0,174,175,5,5,0,0,175,176,3,24,12,0,176,177,5,6,0,0,177,21,1,0,0,0,178,
179,3,0,0,0,179,180,5,37,0,0,180,181,3,24,12,0,181,189,1,0,0,0,182,183,3,
24,12,0,183,184,7,1,0,0,184,185,3,0,0,0,185,186,7,1,0,0,186,187,3,24,12,
0,187,189,1,0,0,0,188,178,1,0,0,0,188,182,1,0,0,0,189,23,1,0,0,0,190,191,
6,12,-1,0,191,192,5,14,0,0,192,193,5,3,0,0,193,194,3,24,12,0,194,195,5,4,
0,0,195,271,1,0,0,0,196,197,3,12,6,0,197,198,5,5,0,0,198,199,3,24,12,0,199,
200,5,6,0,0,200,271,1,0,0,0,201,271,3,14,7,0,202,271,3,16,8,0,203,271,3,
18,9,0,204,271,3,20,10,0,205,207,5,15,0,0,206,205,1,0,0,0,206,207,1,0,0,
0,207,208,1,0,0,0,208,209,5,29,0,0,209,210,5,5,0,0,210,211,3,24,12,0,211,
212,5,6,0,0,212,271,1,0,0,0,213,214,7,2,0,0,214,215,5,5,0,0,215,216,3,24,
12,0,216,217,5,6,0,0,217,271,1,0,0,0,218,219,5,31,0,0,219,220,5,8,0,0,220,
221,5,3,0,0,221,222,3,24,12,0,222,223,5,4,0,0,223,224,5,5,0,0,224,225,3,
24,12,0,225,226,5,6,0,0,226,271,1,0,0,0,227,228,5,31,0,0,228,229,5,8,0,0,
229,230,3,24,12,0,230,231,5,5,0,0,231,232,3,24,12,0,232,233,5,6,0,0,233,
271,1,0,0,0,234,235,5,7,0,0,235,236,3,24,12,0,236,237,5,7,0,0,237,271,1,
0,0,0,238,239,5,35,0,0,239,271,3,24,12,11,240,241,5,12,0,0,241,242,5,3,0,
0,242,243,3,24,12,0,243,244,5,4,0,0,244,245,5,3,0,0,245,246,3,24,12,0,246,
247,5,4,0,0,247,271,1,0,0,0,248,271,3,0,0,0,249,250,3,0,0,0,250,251,5,5,
0,0,251,256,3,22,11,0,252,253,5,42,0,0,253,255,3,22,11,0,254,252,1,0,0,0,
255,258,1,0,0,0,256,254,1,0,0,0,256,257,1,0,0,0,257,259,1,0,0,0,258,256,
1,0,0,0,259,260,5,6,0,0,260,271,1,0,0,0,261,262,3,2,1,0,262,263,3,26,13,
0,263,271,1,0,0,0,264,271,3,2,1,0,265,271,5,9,0,0,266,267,5,5,0,0,267,268,
3,24,12,0,268,269,5,6,0,0,269,271,1,0,0,0,270,190,1,0,0,0,270,196,1,0,0,
0,270,201,1,0,0,0,270,202,1,0,0,0,270,203,1,0,0,0,270,204,1,0,0,0,270,206,
1,0,0,0,270,213,1,0,0,0,270,218,1,0,0,0,270,227,1,0,0,0,270,234,1,0,0,0,
270,238,1,0,0,0,270,240,1,0,0,0,270,248,1,0,0,0,270,249,1,0,0,0,270,261,
1,0,0,0,270,264,1,0,0,0,270,265,1,0,0,0,270,266,1,0,0,0,271,292,1,0,0,0,
272,273,10,24,0,0,273,274,5,36,0,0,274,291,3,24,12,24,275,276,10,10,0,0,
276,277,5,13,0,0,277,291,3,24,12,11,278,279,10,8,0,0,279,280,5,34,0,0,280,
291,3,24,12,9,281,282,10,7,0,0,282,283,5,35,0,0,283,291,3,24,12,8,284,285,
10,23,0,0,285,286,5,36,0,0,286,287,5,3,0,0,287,288,3,24,12,0,288,289,5,4,
0,0,289,291,1,0,0,0,290,272,1,0,0,0,290,275,1,0,0,0,290,278,1,0,0,0,290,
281,1,0,0,0,290,284,1,0,0,0,291,294,1,0,0,0,292,290,1,0,0,0,292,293,1,0,
0,0,293,25,1,0,0,0,294,292,1,0,0,0,295,296,5,1,0,0,296,297,3,30,15,0,297,
298,5,48,0,0,298,27,1,0,0,0,299,300,5,49,0,0,300,301,5,56,0,0,301,302,7,
3,0,0,302,303,5,57,0,0,303,304,5,56,0,0,304,305,5,59,0,0,305,306,5,57,0,
0,306,29,1,0,0,0,307,308,6,15,-1,0,308,309,5,51,0,0,309,310,5,56,0,0,310,
311,3,24,12,0,311,312,5,57,0,0,312,330,1,0,0,0,313,314,5,49,0,0,314,317,
5,56,0,0,315,318,3,30,15,0,316,318,5,58,0,0,317,315,1,0,0,0,317,316,1,0,
0,0,318,319,1,0,0,0,319,320,5,57,0,0,320,321,5,56,0,0,321,322,3,30,15,0,
322,323,5,57,0,0,323,330,1,0,0,0,324,330,5,53,0,0,325,326,5,54,0,0,326,327,
3,30,15,0,327,328,5,55,0,0,328,330,1,0,0,0,329,307,1,0,0,0,329,313,1,0,0,
0,329,324,1,0,0,0,329,325,1,0,0,0,330,353,1,0,0,0,331,332,10,4,0,0,332,333,
5,50,0,0,333,352,3,30,15,5,334,335,10,9,0,0,335,336,5,52,0,0,336,352,5,59,
0,0,337,338,10,8,0,0,338,339,5,52,0,0,339,340,5,56,0,0,340,341,5,59,0,0,
341,352,5,57,0,0,342,343,10,7,0,0,343,344,5,52,0,0,344,352,3,28,14,0,345,
346,10,6,0,0,346,347,5,52,0,0,347,348,5,56,0,0,348,349,3,28,14,0,349,350,
5,57,0,0,350,352,1,0,0,0,351,331,1,0,0,0,351,334,1,0,0,0,351,337,1,0,0,0,
351,342,1,0,0,0,351,345,1,0,0,0,352,355,1,0,0,0,353,351,1,0,0,0,353,354,
1,0,0,0,354,31,1,0,0,0,355,353,1,0,0,0,20,43,49,57,64,84,108,122,132,150,
164,188,206,256,270,290,292,317,329,351,353];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LatexParser extends antlr4.Parser {

    static grammarFileName = "LatexParser.g4";
    static literalNames = [ null, "'['", "';'", null, null, null, null, 
                            "'|'", "'_'", "'\\pi'", "'\\int'", "'\\mathrm'", 
                            null, null, null, "'\\'", "'sin'", "'cos'", 
                            "'tan'", "'cot'", "'sec'", "'csc'", "'arcsin'", 
                            "'arccos'", "'arctan'", "'sinh'", "'cosh'", 
                            "'tanh'", "'coth'", "'ln'", "'log'", "'\\log'", 
                            null, null, "'+'", "'-'", null, "'='", "'<'", 
                            "'>'", "'\\le'", "'\\ge'", "','", null, null, 
                            null, null, null, "']'", null, null, null, null, 
                            null, null, null, null, null, "'1'" ];
    static symbolicNames = [ null, "L_BRACKET", "SEMICOLON", "L_BRACE", 
                             "R_BRACE", "L_PAREN", "R_PAREN", "VBAR", "UNDERSCORE", 
                             "PI", "CMD_INT", "CMD_MATHRM", "CMD_FRAC", 
                             "CMD_CDOT", "CMD_SQRT", "BACK_SLASH", "CMD_SIN", 
                             "CMD_COS", "CMD_TAN", "CMD_COT", "CMD_SEC", 
                             "CMD_CSC", "CMD_ARCSIN", "CMD_ARCCOS", "CMD_ARCTAN", 
                             "CMD_SINH", "CMD_COSH", "CMD_TANH", "CMD_COTH", 
                             "CMD_LN", "CMD_LOG", "CMD_LOG_WITH_SLASH", 
                             "CMD_LEFT", "CMD_RIGHT", "ADD", "SUB", "CARET", 
                             "EQ", "LT", "GT", "LTE", "GTE", "COMMA", "NUMBER", 
                             "ID", "WS", "SLASH_SPACE", "ERROR_CHAR", "R_BRACKET", 
                             "U_CMD_FRAC", "U_CMD_CDOT", "U_CMD_SQRT", "U_CARET", 
                             "U_NAME", "U_L_PAREN", "U_R_PAREN", "U_L_BRACE", 
                             "U_R_BRACE", "U_ONE", "U_NUMBER", "U_CMD_LEFT", 
                             "U_CMD_RIGHT", "U_WS", "U_SLASH_SPACE", "U_ERROR_CHAR" ];
    static ruleNames = [ "id", "number", "statement", "assign", "query", 
                         "equality", "trig_function", "indefinite_integral_cmd", 
                         "integral_cmd", "derivative_cmd", "n_derivative_cmd", 
                         "argument", "expr", "u_block", "u_fraction", "u_expr" ];

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
    	case 12:
    	    		return this.expr_sempred(localctx, predIndex);
    	case 15:
    	    		return this.u_expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 24);
    		case 1:
    			return this.precpred(this._ctx, 10);
    		case 2:
    			return this.precpred(this._ctx, 8);
    		case 3:
    			return this.precpred(this._ctx, 7);
    		case 4:
    			return this.precpred(this._ctx, 23);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    u_expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
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
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	id() {
	    let localctx = new IdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LatexParser.RULE_id);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 32;
	        this.match(LatexParser.ID);
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



	number() {
	    let localctx = new NumberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, LatexParser.RULE_number);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 34;
	        this.match(LatexParser.NUMBER);
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



	statement() {
	    let localctx = new StatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, LatexParser.RULE_statement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 43;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 36;
	            this.assign();
	            break;

	        case 2:
	            this.state = 37;
	            this.query();
	            break;

	        case 3:
	            this.state = 38;
	            this.equality();
	            break;

	        case 4:
	            this.state = 39;
	            this.u_block();
	            break;

	        case 5:
	            this.state = 40;
	            this.number();
	            break;

	        case 6:
	            this.state = 41;
	            this.id();
	            break;

	        case 7:
	            this.state = 42;
	            this.expr(0);
	            break;

	        }
	        this.state = 45;
	        this.match(LatexParser.EOF);
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



	assign() {
	    let localctx = new AssignContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, LatexParser.RULE_assign);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 49;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.ID:
	            this.state = 47;
	            this.id();
	            break;
	        case LatexParser.PI:
	            this.state = 48;
	            this.match(LatexParser.PI);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 51;
	        this.match(LatexParser.EQ);
	        this.state = 52;
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



	query() {
	    let localctx = new QueryContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, LatexParser.RULE_query);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 54;
	        this.expr(0);
	        this.state = 55;
	        this.match(LatexParser.EQ);
	        this.state = 57;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===LatexParser.L_BRACKET) {
	            this.state = 56;
	            this.u_block();
	        }

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



	equality() {
	    let localctx = new EqualityContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, LatexParser.RULE_equality);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 59;
	        this.expr(0);
	        this.state = 60;
	        this.match(LatexParser.EQ);
	        this.state = 61;
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



	trig_function() {
	    let localctx = new Trig_functionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, LatexParser.RULE_trig_function);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 64;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===LatexParser.BACK_SLASH) {
	            this.state = 63;
	            this.match(LatexParser.BACK_SLASH);
	        }

	        this.state = 66;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << LatexParser.CMD_SIN) | (1 << LatexParser.CMD_COS) | (1 << LatexParser.CMD_TAN) | (1 << LatexParser.CMD_COT) | (1 << LatexParser.CMD_SEC) | (1 << LatexParser.CMD_CSC) | (1 << LatexParser.CMD_ARCSIN) | (1 << LatexParser.CMD_ARCCOS) | (1 << LatexParser.CMD_ARCTAN) | (1 << LatexParser.CMD_SINH) | (1 << LatexParser.CMD_COSH) | (1 << LatexParser.CMD_TANH) | (1 << LatexParser.CMD_COTH))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
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



	indefinite_integral_cmd() {
	    let localctx = new Indefinite_integral_cmdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, LatexParser.RULE_indefinite_integral_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 68;
	        this.match(LatexParser.CMD_INT);
	        this.state = 69;
	        this.match(LatexParser.UNDERSCORE);
	        this.state = 70;
	        this.match(LatexParser.L_BRACE);
	        this.state = 71;
	        this.match(LatexParser.R_BRACE);
	        this.state = 72;
	        this.match(LatexParser.CARET);
	        this.state = 73;
	        this.match(LatexParser.L_BRACE);
	        this.state = 74;
	        this.match(LatexParser.R_BRACE);
	        this.state = 75;
	        this.match(LatexParser.L_PAREN);
	        this.state = 76;
	        this.expr(0);
	        this.state = 77;
	        this.match(LatexParser.R_PAREN);
	        this.state = 84;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 78;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 79;
	            this.match(LatexParser.L_BRACE);
	            this.state = 80;
	            this.id();
	            this.state = 81;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 83;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 86;
	        this.match(LatexParser.L_PAREN);
	        this.state = 87;
	        this.id();
	        this.state = 88;
	        this.match(LatexParser.R_PAREN);
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



	integral_cmd() {
	    let localctx = new Integral_cmdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, LatexParser.RULE_integral_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 90;
	        this.match(LatexParser.CMD_INT);
	        this.state = 91;
	        this.match(LatexParser.UNDERSCORE);
	        this.state = 92;
	        this.match(LatexParser.L_BRACE);
	        this.state = 93;
	        this.expr(0);
	        this.state = 94;
	        this.match(LatexParser.R_BRACE);
	        this.state = 95;
	        this.match(LatexParser.CARET);
	        this.state = 96;
	        this.match(LatexParser.L_BRACE);
	        this.state = 97;
	        this.expr(0);
	        this.state = 98;
	        this.match(LatexParser.R_BRACE);
	        this.state = 99;
	        this.match(LatexParser.L_PAREN);
	        this.state = 100;
	        this.expr(0);
	        this.state = 101;
	        this.match(LatexParser.R_PAREN);
	        this.state = 108;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 102;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 103;
	            this.match(LatexParser.L_BRACE);
	            this.state = 104;
	            this.id();
	            this.state = 105;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 107;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 110;
	        this.match(LatexParser.L_PAREN);
	        this.state = 111;
	        this.id();
	        this.state = 112;
	        this.match(LatexParser.R_PAREN);
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



	derivative_cmd() {
	    let localctx = new Derivative_cmdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, LatexParser.RULE_derivative_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 114;
	        this.match(LatexParser.CMD_FRAC);
	        this.state = 115;
	        this.match(LatexParser.L_BRACE);
	        this.state = 122;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 116;
	            localctx.MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 117;
	            this.match(LatexParser.L_BRACE);
	            this.state = 118;
	            this.id();
	            this.state = 119;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 121;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 124;
	        this.match(LatexParser.R_BRACE);
	        this.state = 125;
	        this.match(LatexParser.L_BRACE);
	        this.state = 132;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 126;
	            localctx.MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 127;
	            this.match(LatexParser.L_BRACE);
	            this.state = 128;
	            this.id();
	            this.state = 129;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 131;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 134;
	        this.match(LatexParser.L_PAREN);
	        this.state = 135;
	        this.id();
	        this.state = 136;
	        this.match(LatexParser.R_PAREN);
	        this.state = 137;
	        this.match(LatexParser.R_BRACE);
	        this.state = 138;
	        this.match(LatexParser.L_PAREN);
	        this.state = 139;
	        this.expr(0);
	        this.state = 140;
	        this.match(LatexParser.R_PAREN);
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



	n_derivative_cmd() {
	    let localctx = new N_derivative_cmdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, LatexParser.RULE_n_derivative_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 142;
	        this.match(LatexParser.CMD_FRAC);
	        this.state = 143;
	        this.match(LatexParser.L_BRACE);
	        this.state = 150;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 144;
	            localctx.MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 145;
	            this.match(LatexParser.L_BRACE);
	            this.state = 146;
	            this.id();
	            this.state = 147;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 149;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 152;
	        this.match(LatexParser.CARET);
	        this.state = 153;
	        this.match(LatexParser.L_BRACE);
	        this.state = 154;
	        this.number();
	        this.state = 155;
	        this.match(LatexParser.R_BRACE);
	        this.state = 156;
	        this.match(LatexParser.R_BRACE);
	        this.state = 157;
	        this.match(LatexParser.L_BRACE);
	        this.state = 164;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 158;
	            localctx.MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 159;
	            this.match(LatexParser.L_BRACE);
	            this.state = 160;
	            this.id();
	            this.state = 161;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 163;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 166;
	        this.match(LatexParser.L_PAREN);
	        this.state = 167;
	        this.id();
	        this.state = 168;
	        this.match(LatexParser.R_PAREN);
	        this.state = 169;
	        this.match(LatexParser.CARET);
	        this.state = 170;
	        this.match(LatexParser.L_BRACE);
	        this.state = 171;
	        this.number();
	        this.state = 172;
	        this.match(LatexParser.R_BRACE);
	        this.state = 173;
	        this.match(LatexParser.R_BRACE);
	        this.state = 174;
	        this.match(LatexParser.L_PAREN);
	        this.state = 175;
	        this.expr(0);
	        this.state = 176;
	        this.match(LatexParser.R_PAREN);
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



	argument() {
	    let localctx = new ArgumentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, LatexParser.RULE_argument);
	    var _la = 0; // Token type
	    try {
	        this.state = 188;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 178;
	            this.id();
	            this.state = 179;
	            this.match(LatexParser.EQ);
	            this.state = 180;
	            this.expr(0);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 182;
	            this.expr(0);
	            this.state = 183;
	            localctx.lower = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===LatexParser.LT || _la===LatexParser.LTE)) {
	                localctx.lower = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 184;
	            this.id();
	            this.state = 185;
	            localctx.upper = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===LatexParser.LT || _la===LatexParser.LTE)) {
	                localctx.upper = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 186;
	            this.expr(0);
	            break;

	        }
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
	    const _startState = 24;
	    this.enterRecursionRule(localctx, 24, LatexParser.RULE_expr, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 270;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new SqrtContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 191;
	            this.match(LatexParser.CMD_SQRT);
	            this.state = 192;
	            this.match(LatexParser.L_BRACE);
	            this.state = 193;
	            this.expr(0);
	            this.state = 194;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 2:
	            localctx = new TrigContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 196;
	            this.trig_function();
	            this.state = 197;
	            this.match(LatexParser.L_PAREN);
	            this.state = 198;
	            this.expr(0);
	            this.state = 199;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 3:
	            localctx = new IndefiniteIntegralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 201;
	            this.indefinite_integral_cmd();
	            break;

	        case 4:
	            localctx = new IntegralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 202;
	            this.integral_cmd();
	            break;

	        case 5:
	            localctx = new DerivativeContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 203;
	            this.derivative_cmd();
	            break;

	        case 6:
	            localctx = new NDerivativeContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 204;
	            this.n_derivative_cmd();
	            break;

	        case 7:
	            localctx = new LnContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 206;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===LatexParser.BACK_SLASH) {
	                this.state = 205;
	                this.match(LatexParser.BACK_SLASH);
	            }

	            this.state = 208;
	            this.match(LatexParser.CMD_LN);
	            this.state = 209;
	            this.match(LatexParser.L_PAREN);
	            this.state = 210;
	            this.expr(0);
	            this.state = 211;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 8:
	            localctx = new LogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 213;
	            _la = this._input.LA(1);
	            if(!(_la===LatexParser.CMD_LOG || _la===LatexParser.CMD_LOG_WITH_SLASH)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 214;
	            this.match(LatexParser.L_PAREN);
	            this.state = 215;
	            this.expr(0);
	            this.state = 216;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 9:
	            localctx = new BaseLogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 218;
	            this.match(LatexParser.CMD_LOG_WITH_SLASH);
	            this.state = 219;
	            this.match(LatexParser.UNDERSCORE);
	            this.state = 220;
	            this.match(LatexParser.L_BRACE);
	            this.state = 221;
	            this.expr(0);
	            this.state = 222;
	            this.match(LatexParser.R_BRACE);
	            this.state = 223;
	            this.match(LatexParser.L_PAREN);
	            this.state = 224;
	            this.expr(0);
	            this.state = 225;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 10:
	            localctx = new BaseLogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 227;
	            this.match(LatexParser.CMD_LOG_WITH_SLASH);
	            this.state = 228;
	            this.match(LatexParser.UNDERSCORE);
	            this.state = 229;
	            this.expr(0);
	            this.state = 230;
	            this.match(LatexParser.L_PAREN);
	            this.state = 231;
	            this.expr(0);
	            this.state = 232;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 11:
	            localctx = new AbsContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 234;
	            this.match(LatexParser.VBAR);
	            this.state = 235;
	            this.expr(0);
	            this.state = 236;
	            this.match(LatexParser.VBAR);
	            break;

	        case 12:
	            localctx = new UnaryMinusContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 238;
	            this.match(LatexParser.SUB);
	            this.state = 239;
	            this.expr(11);
	            break;

	        case 13:
	            localctx = new DivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 240;
	            this.match(LatexParser.CMD_FRAC);
	            this.state = 241;
	            this.match(LatexParser.L_BRACE);
	            this.state = 242;
	            this.expr(0);
	            this.state = 243;
	            this.match(LatexParser.R_BRACE);
	            this.state = 244;
	            this.match(LatexParser.L_BRACE);
	            this.state = 245;
	            this.expr(0);
	            this.state = 246;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 14:
	            localctx = new VariableContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 248;
	            this.id();
	            break;

	        case 15:
	            localctx = new FunctionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 249;
	            this.id();
	            this.state = 250;
	            this.match(LatexParser.L_PAREN);

	            this.state = 251;
	            this.argument();
	            this.state = 256;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===LatexParser.COMMA) {
	                this.state = 252;
	                this.match(LatexParser.COMMA);
	                this.state = 253;
	                this.argument();
	                this.state = 258;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 259;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 16:
	            localctx = new NumberWithUnitsContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 261;
	            this.number();
	            this.state = 262;
	            this.u_block();
	            break;

	        case 17:
	            localctx = new NumberExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 264;
	            this.number();
	            break;

	        case 18:
	            localctx = new PiExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 265;
	            this.match(LatexParser.PI);
	            break;

	        case 19:
	            localctx = new SubExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 266;
	            this.match(LatexParser.L_PAREN);
	            this.state = 267;
	            this.expr(0);
	            this.state = 268;
	            this.match(LatexParser.R_PAREN);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 292;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,15,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 290;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 272;
	                    if (!( this.precpred(this._ctx, 24))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 24)");
	                    }
	                    this.state = 273;
	                    this.match(LatexParser.CARET);
	                    this.state = 274;
	                    this.expr(24);
	                    break;

	                case 2:
	                    localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 275;
	                    if (!( this.precpred(this._ctx, 10))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
	                    }
	                    this.state = 276;
	                    this.match(LatexParser.CMD_CDOT);
	                    this.state = 277;
	                    this.expr(11);
	                    break;

	                case 3:
	                    localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 278;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 279;
	                    this.match(LatexParser.ADD);
	                    this.state = 280;
	                    this.expr(9);
	                    break;

	                case 4:
	                    localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 281;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 282;
	                    this.match(LatexParser.SUB);
	                    this.state = 283;
	                    this.expr(8);
	                    break;

	                case 5:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 284;
	                    if (!( this.precpred(this._ctx, 23))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 23)");
	                    }
	                    this.state = 285;
	                    this.match(LatexParser.CARET);
	                    this.state = 286;
	                    this.match(LatexParser.L_BRACE);
	                    this.state = 287;
	                    this.expr(0);
	                    this.state = 288;
	                    this.match(LatexParser.R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 294;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,15,this._ctx);
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
	    this.enterRule(localctx, 26, LatexParser.RULE_u_block);
	    try {
	        localctx = new UnitBlockContext(this, localctx);
	        this.enterOuterAlt(localctx, 1);
	        this.state = 295;
	        this.match(LatexParser.L_BRACKET);
	        this.state = 296;
	        this.u_expr(0);
	        this.state = 297;
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



	u_fraction() {
	    let localctx = new U_fractionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, LatexParser.RULE_u_fraction);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 299;
	        this.match(LatexParser.U_CMD_FRAC);
	        this.state = 300;
	        this.match(LatexParser.U_L_BRACE);
	        this.state = 301;
	        _la = this._input.LA(1);
	        if(!(_la===LatexParser.U_ONE || _la===LatexParser.U_NUMBER)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 302;
	        this.match(LatexParser.U_R_BRACE);
	        this.state = 303;
	        this.match(LatexParser.U_L_BRACE);
	        this.state = 304;
	        this.match(LatexParser.U_NUMBER);
	        this.state = 305;
	        this.match(LatexParser.U_R_BRACE);
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
	    const _startState = 30;
	    this.enterRecursionRule(localctx, 30, LatexParser.RULE_u_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 329;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.U_CMD_SQRT:
	            localctx = new UnitSqrtContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 308;
	            this.match(LatexParser.U_CMD_SQRT);
	            this.state = 309;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 310;
	            this.expr(0);
	            this.state = 311;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case LatexParser.U_CMD_FRAC:
	            localctx = new UnitDivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 313;
	            this.match(LatexParser.U_CMD_FRAC);
	            this.state = 314;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 317;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case LatexParser.U_CMD_FRAC:
	            case LatexParser.U_CMD_SQRT:
	            case LatexParser.U_NAME:
	            case LatexParser.U_L_PAREN:
	                this.state = 315;
	                this.u_expr(0);
	                break;
	            case LatexParser.U_ONE:
	                this.state = 316;
	                this.match(LatexParser.U_ONE);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 319;
	            this.match(LatexParser.U_R_BRACE);
	            this.state = 320;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 321;
	            this.u_expr(0);
	            this.state = 322;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case LatexParser.U_NAME:
	            localctx = new UnitNameContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 324;
	            this.match(LatexParser.U_NAME);
	            break;
	        case LatexParser.U_L_PAREN:
	            localctx = new UnitSubExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 325;
	            this.match(LatexParser.U_L_PAREN);
	            this.state = 326;
	            this.u_expr(0);
	            this.state = 327;
	            this.match(LatexParser.U_R_PAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 353;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 351;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 331;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 332;
	                    this.match(LatexParser.U_CMD_CDOT);
	                    this.state = 333;
	                    this.u_expr(5);
	                    break;

	                case 2:
	                    localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 334;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 335;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 336;
	                    this.match(LatexParser.U_NUMBER);
	                    break;

	                case 3:
	                    localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 337;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 338;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 339;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 340;
	                    this.match(LatexParser.U_NUMBER);
	                    this.state = 341;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                case 4:
	                    localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 342;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 343;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 344;
	                    this.u_fraction();
	                    break;

	                case 5:
	                    localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 345;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 346;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 347;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 348;
	                    this.u_fraction();
	                    this.state = 349;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 355;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
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
LatexParser.VBAR = 7;
LatexParser.UNDERSCORE = 8;
LatexParser.PI = 9;
LatexParser.CMD_INT = 10;
LatexParser.CMD_MATHRM = 11;
LatexParser.CMD_FRAC = 12;
LatexParser.CMD_CDOT = 13;
LatexParser.CMD_SQRT = 14;
LatexParser.BACK_SLASH = 15;
LatexParser.CMD_SIN = 16;
LatexParser.CMD_COS = 17;
LatexParser.CMD_TAN = 18;
LatexParser.CMD_COT = 19;
LatexParser.CMD_SEC = 20;
LatexParser.CMD_CSC = 21;
LatexParser.CMD_ARCSIN = 22;
LatexParser.CMD_ARCCOS = 23;
LatexParser.CMD_ARCTAN = 24;
LatexParser.CMD_SINH = 25;
LatexParser.CMD_COSH = 26;
LatexParser.CMD_TANH = 27;
LatexParser.CMD_COTH = 28;
LatexParser.CMD_LN = 29;
LatexParser.CMD_LOG = 30;
LatexParser.CMD_LOG_WITH_SLASH = 31;
LatexParser.CMD_LEFT = 32;
LatexParser.CMD_RIGHT = 33;
LatexParser.ADD = 34;
LatexParser.SUB = 35;
LatexParser.CARET = 36;
LatexParser.EQ = 37;
LatexParser.LT = 38;
LatexParser.GT = 39;
LatexParser.LTE = 40;
LatexParser.GTE = 41;
LatexParser.COMMA = 42;
LatexParser.NUMBER = 43;
LatexParser.ID = 44;
LatexParser.WS = 45;
LatexParser.SLASH_SPACE = 46;
LatexParser.ERROR_CHAR = 47;
LatexParser.R_BRACKET = 48;
LatexParser.U_CMD_FRAC = 49;
LatexParser.U_CMD_CDOT = 50;
LatexParser.U_CMD_SQRT = 51;
LatexParser.U_CARET = 52;
LatexParser.U_NAME = 53;
LatexParser.U_L_PAREN = 54;
LatexParser.U_R_PAREN = 55;
LatexParser.U_L_BRACE = 56;
LatexParser.U_R_BRACE = 57;
LatexParser.U_ONE = 58;
LatexParser.U_NUMBER = 59;
LatexParser.U_CMD_LEFT = 60;
LatexParser.U_CMD_RIGHT = 61;
LatexParser.U_WS = 62;
LatexParser.U_SLASH_SPACE = 63;
LatexParser.U_ERROR_CHAR = 64;

LatexParser.RULE_id = 0;
LatexParser.RULE_number = 1;
LatexParser.RULE_statement = 2;
LatexParser.RULE_assign = 3;
LatexParser.RULE_query = 4;
LatexParser.RULE_equality = 5;
LatexParser.RULE_trig_function = 6;
LatexParser.RULE_indefinite_integral_cmd = 7;
LatexParser.RULE_integral_cmd = 8;
LatexParser.RULE_derivative_cmd = 9;
LatexParser.RULE_n_derivative_cmd = 10;
LatexParser.RULE_argument = 11;
LatexParser.RULE_expr = 12;
LatexParser.RULE_u_block = 13;
LatexParser.RULE_u_fraction = 14;
LatexParser.RULE_u_expr = 15;

class IdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_id;
    }

	ID() {
	    return this.getToken(LatexParser.ID, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterId(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitId(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitId(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class NumberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_number;
    }

	NUMBER() {
	    return this.getToken(LatexParser.NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitNumber(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitNumber(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_statement;
    }

	EOF() {
	    return this.getToken(LatexParser.EOF, 0);
	};

	assign() {
	    return this.getTypedRuleContext(AssignContext,0);
	};

	query() {
	    return this.getTypedRuleContext(QueryContext,0);
	};

	equality() {
	    return this.getTypedRuleContext(EqualityContext,0);
	};

	u_block() {
	    return this.getTypedRuleContext(U_blockContext,0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



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

	EQ() {
	    return this.getToken(LatexParser.EQ, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	PI() {
	    return this.getToken(LatexParser.PI, 0);
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

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitAssign(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class QueryContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_query;
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	EQ() {
	    return this.getToken(LatexParser.EQ, 0);
	};

	u_block() {
	    return this.getTypedRuleContext(U_blockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterQuery(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitQuery(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitQuery(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class EqualityContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_equality;
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

	EQ() {
	    return this.getToken(LatexParser.EQ, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterEquality(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitEquality(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitEquality(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Trig_functionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_trig_function;
    }

	CMD_SIN() {
	    return this.getToken(LatexParser.CMD_SIN, 0);
	};

	CMD_COS() {
	    return this.getToken(LatexParser.CMD_COS, 0);
	};

	CMD_TAN() {
	    return this.getToken(LatexParser.CMD_TAN, 0);
	};

	CMD_COT() {
	    return this.getToken(LatexParser.CMD_COT, 0);
	};

	CMD_SEC() {
	    return this.getToken(LatexParser.CMD_SEC, 0);
	};

	CMD_CSC() {
	    return this.getToken(LatexParser.CMD_CSC, 0);
	};

	CMD_ARCSIN() {
	    return this.getToken(LatexParser.CMD_ARCSIN, 0);
	};

	CMD_ARCCOS() {
	    return this.getToken(LatexParser.CMD_ARCCOS, 0);
	};

	CMD_ARCTAN() {
	    return this.getToken(LatexParser.CMD_ARCTAN, 0);
	};

	CMD_SINH() {
	    return this.getToken(LatexParser.CMD_SINH, 0);
	};

	CMD_COSH() {
	    return this.getToken(LatexParser.CMD_COSH, 0);
	};

	CMD_TANH() {
	    return this.getToken(LatexParser.CMD_TANH, 0);
	};

	CMD_COTH() {
	    return this.getToken(LatexParser.CMD_COTH, 0);
	};

	BACK_SLASH() {
	    return this.getToken(LatexParser.BACK_SLASH, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterTrig_function(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitTrig_function(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitTrig_function(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Indefinite_integral_cmdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_indefinite_integral_cmd;
    }

	CMD_INT() {
	    return this.getToken(LatexParser.CMD_INT, 0);
	};

	UNDERSCORE() {
	    return this.getToken(LatexParser.UNDERSCORE, 0);
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


	CARET() {
	    return this.getToken(LatexParser.CARET, 0);
	};

	L_PAREN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.L_PAREN);
	    } else {
	        return this.getToken(LatexParser.L_PAREN, i);
	    }
	};


	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	R_PAREN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.R_PAREN);
	    } else {
	        return this.getToken(LatexParser.R_PAREN, i);
	    }
	};


	id = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(IdContext);
	    } else {
	        return this.getTypedRuleContext(IdContext,i);
	    }
	};

	CMD_MATHRM() {
	    return this.getToken(LatexParser.CMD_MATHRM, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterIndefinite_integral_cmd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitIndefinite_integral_cmd(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitIndefinite_integral_cmd(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Integral_cmdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_integral_cmd;
    }

	CMD_INT() {
	    return this.getToken(LatexParser.CMD_INT, 0);
	};

	UNDERSCORE() {
	    return this.getToken(LatexParser.UNDERSCORE, 0);
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


	CARET() {
	    return this.getToken(LatexParser.CARET, 0);
	};

	L_PAREN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.L_PAREN);
	    } else {
	        return this.getToken(LatexParser.L_PAREN, i);
	    }
	};


	R_PAREN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.R_PAREN);
	    } else {
	        return this.getToken(LatexParser.R_PAREN, i);
	    }
	};


	id = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(IdContext);
	    } else {
	        return this.getTypedRuleContext(IdContext,i);
	    }
	};

	CMD_MATHRM() {
	    return this.getToken(LatexParser.CMD_MATHRM, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterIntegral_cmd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitIntegral_cmd(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitIntegral_cmd(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Derivative_cmdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_derivative_cmd;
        this.MATHRM_0 = null; // Token
        this.MATHRM_1 = null; // Token
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


	L_PAREN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.L_PAREN);
	    } else {
	        return this.getToken(LatexParser.L_PAREN, i);
	    }
	};


	id = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(IdContext);
	    } else {
	        return this.getTypedRuleContext(IdContext,i);
	    }
	};

	R_PAREN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.R_PAREN);
	    } else {
	        return this.getToken(LatexParser.R_PAREN, i);
	    }
	};


	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	CMD_MATHRM = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.CMD_MATHRM);
	    } else {
	        return this.getToken(LatexParser.CMD_MATHRM, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterDerivative_cmd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitDerivative_cmd(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitDerivative_cmd(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class N_derivative_cmdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_n_derivative_cmd;
        this.MATHRM_0 = null; // Token
        this.MATHRM_1 = null; // Token
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


	CARET = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.CARET);
	    } else {
	        return this.getToken(LatexParser.CARET, i);
	    }
	};


	number = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NumberContext);
	    } else {
	        return this.getTypedRuleContext(NumberContext,i);
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


	L_PAREN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.L_PAREN);
	    } else {
	        return this.getToken(LatexParser.L_PAREN, i);
	    }
	};


	id = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(IdContext);
	    } else {
	        return this.getTypedRuleContext(IdContext,i);
	    }
	};

	R_PAREN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.R_PAREN);
	    } else {
	        return this.getToken(LatexParser.R_PAREN, i);
	    }
	};


	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	CMD_MATHRM = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.CMD_MATHRM);
	    } else {
	        return this.getToken(LatexParser.CMD_MATHRM, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterN_derivative_cmd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitN_derivative_cmd(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitN_derivative_cmd(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ArgumentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_argument;
        this.lower = null; // Token
        this.upper = null; // Token
    }

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	EQ() {
	    return this.getToken(LatexParser.EQ, 0);
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

	LT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.LT);
	    } else {
	        return this.getToken(LatexParser.LT, i);
	    }
	};


	LTE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.LTE);
	    } else {
	        return this.getToken(LatexParser.LTE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterArgument(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitArgument(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitArgument(this);
	    } else {
	        return visitor.visitChildren(this);
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

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitAdd(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.AddContext = AddContext;

class LnContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	CMD_LN() {
	    return this.getToken(LatexParser.CMD_LN, 0);
	};

	L_PAREN() {
	    return this.getToken(LatexParser.L_PAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	R_PAREN() {
	    return this.getToken(LatexParser.R_PAREN, 0);
	};

	BACK_SLASH() {
	    return this.getToken(LatexParser.BACK_SLASH, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterLn(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitLn(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitLn(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.LnContext = LnContext;

class LogContext extends ExprContext {

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

	CMD_LOG_WITH_SLASH() {
	    return this.getToken(LatexParser.CMD_LOG_WITH_SLASH, 0);
	};

	CMD_LOG() {
	    return this.getToken(LatexParser.CMD_LOG, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterLog(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitLog(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitLog(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.LogContext = LogContext;

class NumberExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterNumberExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitNumberExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitNumberExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.NumberExprContext = NumberExprContext;

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

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitSubtract(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.SubtractContext = SubtractContext;

class NumberWithUnitsContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	u_block() {
	    return this.getTypedRuleContext(U_blockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterNumberWithUnits(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitNumberWithUnits(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitNumberWithUnits(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.NumberWithUnitsContext = NumberWithUnitsContext;

class PiExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	PI() {
	    return this.getToken(LatexParser.PI, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterPiExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitPiExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitPiExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.PiExprContext = PiExprContext;

class TrigContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	trig_function() {
	    return this.getTypedRuleContext(Trig_functionContext,0);
	};

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
	        listener.enterTrig(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitTrig(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitTrig(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.TrigContext = TrigContext;

class DerivativeContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	derivative_cmd() {
	    return this.getTypedRuleContext(Derivative_cmdContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterDerivative(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitDerivative(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitDerivative(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.DerivativeContext = DerivativeContext;

class SubExprContext extends ExprContext {

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
	        listener.enterSubExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitSubExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitSubExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.SubExprContext = SubExprContext;

class NDerivativeContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	n_derivative_cmd() {
	    return this.getTypedRuleContext(N_derivative_cmdContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterNDerivative(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitNDerivative(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitNDerivative(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.NDerivativeContext = NDerivativeContext;

class AbsContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	VBAR = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.VBAR);
	    } else {
	        return this.getToken(LatexParser.VBAR, i);
	    }
	};


	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterAbs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitAbs(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitAbs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.AbsContext = AbsContext;

class SqrtContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	CMD_SQRT() {
	    return this.getToken(LatexParser.CMD_SQRT, 0);
	};

	L_BRACE() {
	    return this.getToken(LatexParser.L_BRACE, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	R_BRACE() {
	    return this.getToken(LatexParser.R_BRACE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterSqrt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitSqrt(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitSqrt(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.SqrtContext = SqrtContext;

class IntegralContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	integral_cmd() {
	    return this.getTypedRuleContext(Integral_cmdContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterIntegral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitIntegral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitIntegral(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.IntegralContext = IntegralContext;

class FunctionContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	L_PAREN() {
	    return this.getToken(LatexParser.L_PAREN, 0);
	};

	R_PAREN() {
	    return this.getToken(LatexParser.R_PAREN, 0);
	};

	argument = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ArgumentContext);
	    } else {
	        return this.getTypedRuleContext(ArgumentContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.COMMA);
	    } else {
	        return this.getToken(LatexParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterFunction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitFunction(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitFunction(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.FunctionContext = FunctionContext;

class IndefiniteIntegralContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	indefinite_integral_cmd() {
	    return this.getTypedRuleContext(Indefinite_integral_cmdContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterIndefiniteIntegral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitIndefiniteIntegral(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitIndefiniteIntegral(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.IndefiniteIntegralContext = IndefiniteIntegralContext;

class UnaryMinusContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	SUB() {
	    return this.getToken(LatexParser.SUB, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterUnaryMinus(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnaryMinus(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnaryMinus(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnaryMinusContext = UnaryMinusContext;

class VariableContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterVariable(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitVariable(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitVariable(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.VariableContext = VariableContext;

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

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitDivide(this);
	    } else {
	        return visitor.visitChildren(this);
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

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitMultiply(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.MultiplyContext = MultiplyContext;

class BaseLogContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	CMD_LOG_WITH_SLASH() {
	    return this.getToken(LatexParser.CMD_LOG_WITH_SLASH, 0);
	};

	UNDERSCORE() {
	    return this.getToken(LatexParser.UNDERSCORE, 0);
	};

	L_BRACE() {
	    return this.getToken(LatexParser.L_BRACE, 0);
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

	R_BRACE() {
	    return this.getToken(LatexParser.R_BRACE, 0);
	};

	L_PAREN() {
	    return this.getToken(LatexParser.L_PAREN, 0);
	};

	R_PAREN() {
	    return this.getToken(LatexParser.R_PAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterBaseLog(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitBaseLog(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitBaseLog(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.BaseLogContext = BaseLogContext;

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

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitExponent(this);
	    } else {
	        return visitor.visitChildren(this);
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


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class UnitBlockContext extends U_blockContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
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
	        listener.enterUnitBlock(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnitBlock(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnitBlock(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnitBlockContext = UnitBlockContext;

class U_fractionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_u_fraction;
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


	U_NUMBER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.U_NUMBER);
	    } else {
	        return this.getToken(LatexParser.U_NUMBER, i);
	    }
	};


	U_ONE() {
	    return this.getToken(LatexParser.U_ONE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterU_fraction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitU_fraction(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitU_fraction(this);
	    } else {
	        return visitor.visitChildren(this);
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


class UnitSubExprContext extends U_exprContext {

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
	        listener.enterUnitSubExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnitSubExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnitSubExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnitSubExprContext = UnitSubExprContext;

class UnitExponentContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	u_expr() {
	    return this.getTypedRuleContext(U_exprContext,0);
	};

	U_CARET() {
	    return this.getToken(LatexParser.U_CARET, 0);
	};

	U_NUMBER() {
	    return this.getToken(LatexParser.U_NUMBER, 0);
	};

	U_L_BRACE() {
	    return this.getToken(LatexParser.U_L_BRACE, 0);
	};

	U_R_BRACE() {
	    return this.getToken(LatexParser.U_R_BRACE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterUnitExponent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnitExponent(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnitExponent(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnitExponentContext = UnitExponentContext;

class UnitDivideContext extends U_exprContext {

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

	U_ONE() {
	    return this.getToken(LatexParser.U_ONE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterUnitDivide(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnitDivide(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnitDivide(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnitDivideContext = UnitDivideContext;

class UnitMultiplyContext extends U_exprContext {

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
	        listener.enterUnitMultiply(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnitMultiply(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnitMultiply(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnitMultiplyContext = UnitMultiplyContext;

class UnitNameContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	U_NAME() {
	    return this.getToken(LatexParser.U_NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterUnitName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnitName(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnitName(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnitNameContext = UnitNameContext;

class UnitSqrtContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	U_CMD_SQRT() {
	    return this.getToken(LatexParser.U_CMD_SQRT, 0);
	};

	U_L_BRACE() {
	    return this.getToken(LatexParser.U_L_BRACE, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	U_R_BRACE() {
	    return this.getToken(LatexParser.U_R_BRACE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterUnitSqrt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnitSqrt(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnitSqrt(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnitSqrtContext = UnitSqrtContext;

class UnitFractionalExponentContext extends U_exprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	u_expr() {
	    return this.getTypedRuleContext(U_exprContext,0);
	};

	U_CARET() {
	    return this.getToken(LatexParser.U_CARET, 0);
	};

	u_fraction() {
	    return this.getTypedRuleContext(U_fractionContext,0);
	};

	U_L_BRACE() {
	    return this.getToken(LatexParser.U_L_BRACE, 0);
	};

	U_R_BRACE() {
	    return this.getToken(LatexParser.U_R_BRACE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterUnitFractionalExponent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitUnitFractionalExponent(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitUnitFractionalExponent(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.UnitFractionalExponentContext = UnitFractionalExponentContext;


LatexParser.IdContext = IdContext; 
LatexParser.NumberContext = NumberContext; 
LatexParser.StatementContext = StatementContext; 
LatexParser.AssignContext = AssignContext; 
LatexParser.QueryContext = QueryContext; 
LatexParser.EqualityContext = EqualityContext; 
LatexParser.Trig_functionContext = Trig_functionContext; 
LatexParser.Indefinite_integral_cmdContext = Indefinite_integral_cmdContext; 
LatexParser.Integral_cmdContext = Integral_cmdContext; 
LatexParser.Derivative_cmdContext = Derivative_cmdContext; 
LatexParser.N_derivative_cmdContext = N_derivative_cmdContext; 
LatexParser.ArgumentContext = ArgumentContext; 
LatexParser.ExprContext = ExprContext; 
LatexParser.U_blockContext = U_blockContext; 
LatexParser.U_fractionContext = U_fractionContext; 
LatexParser.U_exprContext = U_exprContext; 
