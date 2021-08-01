// Generated from LatexParser.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import LatexParserListener from './LatexParserListener.js';
import LatexParserVisitor from './LatexParserVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003<\u013c\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0005\u0002 \n\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004",
    "+\n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0006",
    "\u0005\u00062\n\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0005\u0007E\n\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0005\b\\\n\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\ti\n\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\tr\n\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u0083\n\n\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0005\n\u0090\n\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0005\u000b\u00ae\n\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00b6",
    "\n\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b",
    "\u00e6\n\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0007\u000b\u00fa\n\u000b\f\u000b\u000e\u000b\u00fd",
    "\u000b\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u0115\n\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0005\u000e\u0121\n\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0007\u000e\u0137\n\u000e\f\u000e\u000e\u000e\u013a\u000b\u000e",
    "\u0003\u000e\u0002\u0004\u0014\u001a\u000f\u0002\u0004\u0006\b\n\f\u000e",
    "\u0010\u0012\u0014\u0016\u0018\u001a\u0002\u0004\u0003\u0002\u0012\u001e",
    "\u0003\u000267\u0002\u0159\u0002\u001f\u0003\u0002\u0002\u0002\u0004",
    "#\u0003\u0002\u0002\u0002\u0006\'\u0003\u0002\u0002\u0002\b,\u0003\u0002",
    "\u0002\u0002\n1\u0003\u0002\u0002\u0002\f5\u0003\u0002\u0002\u0002\u000e",
    "J\u0003\u0002\u0002\u0002\u0010a\u0003\u0002\u0002\u0002\u0012{\u0003",
    "\u0002\u0002\u0002\u0014\u00e5\u0003\u0002\u0002\u0002\u0016\u00fe\u0003",
    "\u0002\u0002\u0002\u0018\u0102\u0003\u0002\u0002\u0002\u001a\u0120\u0003",
    "\u0002\u0002\u0002\u001c \u0005\u0004\u0003\u0002\u001d \u0005\u0006",
    "\u0004\u0002\u001e \u0005\b\u0005\u0002\u001f\u001c\u0003\u0002\u0002",
    "\u0002\u001f\u001d\u0003\u0002\u0002\u0002\u001f\u001e\u0003\u0002\u0002",
    "\u0002 !\u0003\u0002\u0002\u0002!\"\u0007\u0004\u0002\u0002\"\u0003",
    "\u0003\u0002\u0002\u0002#$\u0007(\u0002\u0002$%\u0007&\u0002\u0002%",
    "&\u0005\u0014\u000b\u0002&\u0005\u0003\u0002\u0002\u0002\'(\u0005\u0014",
    "\u000b\u0002(*\u0007&\u0002\u0002)+\u0005\u0016\f\u0002*)\u0003\u0002",
    "\u0002\u0002*+\u0003\u0002\u0002\u0002+\u0007\u0003\u0002\u0002\u0002",
    ",-\u0005\u0014\u000b\u0002-.\u0007&\u0002\u0002./\u0005\u0014\u000b",
    "\u0002/\t\u0003\u0002\u0002\u000202\u0007\u0011\u0002\u000210\u0003",
    "\u0002\u0002\u000212\u0003\u0002\u0002\u000223\u0003\u0002\u0002\u0002",
    "34\t\u0002\u0002\u00024\u000b\u0003\u0002\u0002\u000256\u0007\f\u0002",
    "\u000267\u0007\n\u0002\u000278\u0007\u0005\u0002\u000289\u0007\u0006",
    "\u0002\u00029:\u0007%\u0002\u0002:;\u0007\u0005\u0002\u0002;<\u0007",
    "\u0006\u0002\u0002<=\u0007\u0007\u0002\u0002=>\u0005\u0014\u000b\u0002",
    ">D\u0007\b\u0002\u0002?@\u0007\r\u0002\u0002@A\u0007\u0005\u0002\u0002",
    "AB\u0007(\u0002\u0002BE\u0007\u0006\u0002\u0002CE\u0007(\u0002\u0002",
    "D?\u0003\u0002\u0002\u0002DC\u0003\u0002\u0002\u0002EF\u0003\u0002\u0002",
    "\u0002FG\u0007\u0007\u0002\u0002GH\u0007(\u0002\u0002HI\u0007\b\u0002",
    "\u0002I\r\u0003\u0002\u0002\u0002JK\u0007\f\u0002\u0002KL\u0007\n\u0002",
    "\u0002LM\u0007\u0005\u0002\u0002MN\u0005\u0014\u000b\u0002NO\u0007\u0006",
    "\u0002\u0002OP\u0007%\u0002\u0002PQ\u0007\u0005\u0002\u0002QR\u0005",
    "\u0014\u000b\u0002RS\u0007\u0006\u0002\u0002ST\u0007\u0007\u0002\u0002",
    "TU\u0005\u0014\u000b\u0002U[\u0007\b\u0002\u0002VW\u0007\r\u0002\u0002",
    "WX\u0007\u0005\u0002\u0002XY\u0007(\u0002\u0002Y\\\u0007\u0006\u0002",
    "\u0002Z\\\u0007(\u0002\u0002[V\u0003\u0002\u0002\u0002[Z\u0003\u0002",
    "\u0002\u0002\\]\u0003\u0002\u0002\u0002]^\u0007\u0007\u0002\u0002^_",
    "\u0007(\u0002\u0002_`\u0007\b\u0002\u0002`\u000f\u0003\u0002\u0002\u0002",
    "ab\u0007\u000e\u0002\u0002bh\u0007\u0005\u0002\u0002cd\u0007\r\u0002",
    "\u0002de\u0007\u0005\u0002\u0002ef\u0007(\u0002\u0002fi\u0007\u0006",
    "\u0002\u0002gi\u0007(\u0002\u0002hc\u0003\u0002\u0002\u0002hg\u0003",
    "\u0002\u0002\u0002ij\u0003\u0002\u0002\u0002jk\u0007\u0006\u0002\u0002",
    "kq\u0007\u0005\u0002\u0002lm\u0007\r\u0002\u0002mn\u0007\u0005\u0002",
    "\u0002no\u0007(\u0002\u0002or\u0007\u0006\u0002\u0002pr\u0007(\u0002",
    "\u0002ql\u0003\u0002\u0002\u0002qp\u0003\u0002\u0002\u0002rs\u0003\u0002",
    "\u0002\u0002st\u0007\u0007\u0002\u0002tu\u0007(\u0002\u0002uv\u0007",
    "\b\u0002\u0002vw\u0007\u0006\u0002\u0002wx\u0007\u0007\u0002\u0002x",
    "y\u0005\u0014\u000b\u0002yz\u0007\b\u0002\u0002z\u0011\u0003\u0002\u0002",
    "\u0002{|\u0007\u000e\u0002\u0002|\u0082\u0007\u0005\u0002\u0002}~\u0007",
    "\r\u0002\u0002~\u007f\u0007\u0005\u0002\u0002\u007f\u0080\u0007(\u0002",
    "\u0002\u0080\u0083\u0007\u0006\u0002\u0002\u0081\u0083\u0007(\u0002",
    "\u0002\u0082}\u0003\u0002\u0002\u0002\u0082\u0081\u0003\u0002\u0002",
    "\u0002\u0083\u0084\u0003\u0002\u0002\u0002\u0084\u0085\u0007%\u0002",
    "\u0002\u0085\u0086\u0007\u0005\u0002\u0002\u0086\u0087\u0007\'\u0002",
    "\u0002\u0087\u0088\u0007\u0006\u0002\u0002\u0088\u0089\u0007\u0006\u0002",
    "\u0002\u0089\u008f\u0007\u0005\u0002\u0002\u008a\u008b\u0007\r\u0002",
    "\u0002\u008b\u008c\u0007\u0005\u0002\u0002\u008c\u008d\u0007(\u0002",
    "\u0002\u008d\u0090\u0007\u0006\u0002\u0002\u008e\u0090\u0007(\u0002",
    "\u0002\u008f\u008a\u0003\u0002\u0002\u0002\u008f\u008e\u0003\u0002\u0002",
    "\u0002\u0090\u0091\u0003\u0002\u0002\u0002\u0091\u0092\u0007\u0007\u0002",
    "\u0002\u0092\u0093\u0007(\u0002\u0002\u0093\u0094\u0007\b\u0002\u0002",
    "\u0094\u0095\u0007%\u0002\u0002\u0095\u0096\u0007\u0005\u0002\u0002",
    "\u0096\u0097\u0007\'\u0002\u0002\u0097\u0098\u0007\u0006\u0002\u0002",
    "\u0098\u0099\u0007\u0006\u0002\u0002\u0099\u009a\u0007\u0007\u0002\u0002",
    "\u009a\u009b\u0005\u0014\u000b\u0002\u009b\u009c\u0007\b\u0002\u0002",
    "\u009c\u0013\u0003\u0002\u0002\u0002\u009d\u009e\b\u000b\u0001\u0002",
    "\u009e\u009f\u0007\u0010\u0002\u0002\u009f\u00a0\u0007\u0005\u0002\u0002",
    "\u00a0\u00a1\u0005\u0014\u000b\u0002\u00a1\u00a2\u0007\u0006\u0002\u0002",
    "\u00a2\u00e6\u0003\u0002\u0002\u0002\u00a3\u00a4\u0005\n\u0006\u0002",
    "\u00a4\u00a5\u0007\u0007\u0002\u0002\u00a5\u00a6\u0005\u0014\u000b\u0002",
    "\u00a6\u00a7\u0007\b\u0002\u0002\u00a7\u00e6\u0003\u0002\u0002\u0002",
    "\u00a8\u00e6\u0005\f\u0007\u0002\u00a9\u00e6\u0005\u000e\b\u0002\u00aa",
    "\u00e6\u0005\u0010\t\u0002\u00ab\u00e6\u0005\u0012\n\u0002\u00ac\u00ae",
    "\u0007\u0011\u0002\u0002\u00ad\u00ac\u0003\u0002\u0002\u0002\u00ad\u00ae",
    "\u0003\u0002\u0002\u0002\u00ae\u00af\u0003\u0002\u0002\u0002\u00af\u00b0",
    "\u0007\u001f\u0002\u0002\u00b0\u00b1\u0007\u0007\u0002\u0002\u00b1\u00b2",
    "\u0005\u0014\u000b\u0002\u00b2\u00b3\u0007\b\u0002\u0002\u00b3\u00e6",
    "\u0003\u0002\u0002\u0002\u00b4\u00b6\u0007\u0011\u0002\u0002\u00b5\u00b4",
    "\u0003\u0002\u0002\u0002\u00b5\u00b6\u0003\u0002\u0002\u0002\u00b6\u00b7",
    "\u0003\u0002\u0002\u0002\u00b7\u00b8\u0007 \u0002\u0002\u00b8\u00b9",
    "\u0007\u0007\u0002\u0002\u00b9\u00ba\u0005\u0014\u000b\u0002\u00ba\u00bb",
    "\u0007\b\u0002\u0002\u00bb\u00e6\u0003\u0002\u0002\u0002\u00bc\u00bd",
    "\u0007\u0011\u0002\u0002\u00bd\u00be\u0007 \u0002\u0002\u00be\u00bf",
    "\u0007\n\u0002\u0002\u00bf\u00c0\u0007\u0005\u0002\u0002\u00c0\u00c1",
    "\u0005\u0014\u000b\u0002\u00c1\u00c2\u0007\u0006\u0002\u0002\u00c2\u00c3",
    "\u0007\u0007\u0002\u0002\u00c3\u00c4\u0005\u0014\u000b\u0002\u00c4\u00c5",
    "\u0007\b\u0002\u0002\u00c5\u00e6\u0003\u0002\u0002\u0002\u00c6\u00c7",
    "\u0007\u0011\u0002\u0002\u00c7\u00c8\u0007 \u0002\u0002\u00c8\u00c9",
    "\u0007\n\u0002\u0002\u00c9\u00ca\u0005\u0014\u000b\u0002\u00ca\u00cb",
    "\u0007\u0007\u0002\u0002\u00cb\u00cc\u0005\u0014\u000b\u0002\u00cc\u00cd",
    "\u0007\b\u0002\u0002\u00cd\u00e6\u0003\u0002\u0002\u0002\u00ce\u00cf",
    "\u0007\t\u0002\u0002\u00cf\u00d0\u0005\u0014\u000b\u0002\u00d0\u00d1",
    "\u0007\t\u0002\u0002\u00d1\u00e6\u0003\u0002\u0002\u0002\u00d2\u00d3",
    "\u0007$\u0002\u0002\u00d3\u00e6\u0005\u0014\u000b\f\u00d4\u00d5\u0007",
    "\u000e\u0002\u0002\u00d5\u00d6\u0007\u0005\u0002\u0002\u00d6\u00d7\u0005",
    "\u0014\u000b\u0002\u00d7\u00d8\u0007\u0006\u0002\u0002\u00d8\u00d9\u0007",
    "\u0005\u0002\u0002\u00d9\u00da\u0005\u0014\u000b\u0002\u00da\u00db\u0007",
    "\u0006\u0002\u0002\u00db\u00e6\u0003\u0002\u0002\u0002\u00dc\u00e6\u0007",
    "(\u0002\u0002\u00dd\u00de\u0007\'\u0002\u0002\u00de\u00e6\u0005\u0016",
    "\f\u0002\u00df\u00e6\u0007\'\u0002\u0002\u00e0\u00e6\u0007\u000b\u0002",
    "\u0002\u00e1\u00e2\u0007\u0007\u0002\u0002\u00e2\u00e3\u0005\u0014\u000b",
    "\u0002\u00e3\u00e4\u0007\b\u0002\u0002\u00e4\u00e6\u0003\u0002\u0002",
    "\u0002\u00e5\u009d\u0003\u0002\u0002\u0002\u00e5\u00a3\u0003\u0002\u0002",
    "\u0002\u00e5\u00a8\u0003\u0002\u0002\u0002\u00e5\u00a9\u0003\u0002\u0002",
    "\u0002\u00e5\u00aa\u0003\u0002\u0002\u0002\u00e5\u00ab\u0003\u0002\u0002",
    "\u0002\u00e5\u00ad\u0003\u0002\u0002\u0002\u00e5\u00b5\u0003\u0002\u0002",
    "\u0002\u00e5\u00bc\u0003\u0002\u0002\u0002\u00e5\u00c6\u0003\u0002\u0002",
    "\u0002\u00e5\u00ce\u0003\u0002\u0002\u0002\u00e5\u00d2\u0003\u0002\u0002",
    "\u0002\u00e5\u00d4\u0003\u0002\u0002\u0002\u00e5\u00dc\u0003\u0002\u0002",
    "\u0002\u00e5\u00dd\u0003\u0002\u0002\u0002\u00e5\u00df\u0003\u0002\u0002",
    "\u0002\u00e5\u00e0\u0003\u0002\u0002\u0002\u00e5\u00e1\u0003\u0002\u0002",
    "\u0002\u00e6\u00fb\u0003\u0002\u0002\u0002\u00e7\u00e8\f\u0019\u0002",
    "\u0002\u00e8\u00e9\u0007%\u0002\u0002\u00e9\u00fa\u0005\u0014\u000b",
    "\u0019\u00ea\u00eb\f\u000b\u0002\u0002\u00eb\u00ec\u0007\u000f\u0002",
    "\u0002\u00ec\u00fa\u0005\u0014\u000b\f\u00ed\u00ee\f\t\u0002\u0002\u00ee",
    "\u00ef\u0007#\u0002\u0002\u00ef\u00fa\u0005\u0014\u000b\n\u00f0\u00f1",
    "\f\b\u0002\u0002\u00f1\u00f2\u0007$\u0002\u0002\u00f2\u00fa\u0005\u0014",
    "\u000b\t\u00f3\u00f4\f\u0018\u0002\u0002\u00f4\u00f5\u0007%\u0002\u0002",
    "\u00f5\u00f6\u0007\u0005\u0002\u0002\u00f6\u00f7\u0005\u0014\u000b\u0002",
    "\u00f7\u00f8\u0007\u0006\u0002\u0002\u00f8\u00fa\u0003\u0002\u0002\u0002",
    "\u00f9\u00e7\u0003\u0002\u0002\u0002\u00f9\u00ea\u0003\u0002\u0002\u0002",
    "\u00f9\u00ed\u0003\u0002\u0002\u0002\u00f9\u00f0\u0003\u0002\u0002\u0002",
    "\u00f9\u00f3\u0003\u0002\u0002\u0002\u00fa\u00fd\u0003\u0002\u0002\u0002",
    "\u00fb\u00f9\u0003\u0002\u0002\u0002\u00fb\u00fc\u0003\u0002\u0002\u0002",
    "\u00fc\u0015\u0003\u0002\u0002\u0002\u00fd\u00fb\u0003\u0002\u0002\u0002",
    "\u00fe\u00ff\u0007\u0003\u0002\u0002\u00ff\u0100\u0005\u001a\u000e\u0002",
    "\u0100\u0101\u0007,\u0002\u0002\u0101\u0017\u0003\u0002\u0002\u0002",
    "\u0102\u0103\u0007-\u0002\u0002\u0103\u0104\u00074\u0002\u0002\u0104",
    "\u0105\t\u0003\u0002\u0002\u0105\u0106\u00075\u0002\u0002\u0106\u0107",
    "\u00074\u0002\u0002\u0107\u0108\u00077\u0002\u0002\u0108\u0109\u0007",
    "5\u0002\u0002\u0109\u0019\u0003\u0002\u0002\u0002\u010a\u010b\b\u000e",
    "\u0001\u0002\u010b\u010c\u0007/\u0002\u0002\u010c\u010d\u00074\u0002",
    "\u0002\u010d\u010e\u0005\u0014\u000b\u0002\u010e\u010f\u00075\u0002",
    "\u0002\u010f\u0121\u0003\u0002\u0002\u0002\u0110\u0111\u0007-\u0002",
    "\u0002\u0111\u0114\u00074\u0002\u0002\u0112\u0115\u0005\u001a\u000e",
    "\u0002\u0113\u0115\u00076\u0002\u0002\u0114\u0112\u0003\u0002\u0002",
    "\u0002\u0114\u0113\u0003\u0002\u0002\u0002\u0115\u0116\u0003\u0002\u0002",
    "\u0002\u0116\u0117\u00075\u0002\u0002\u0117\u0118\u00074\u0002\u0002",
    "\u0118\u0119\u0005\u001a\u000e\u0002\u0119\u011a\u00075\u0002\u0002",
    "\u011a\u0121\u0003\u0002\u0002\u0002\u011b\u0121\u00071\u0002\u0002",
    "\u011c\u011d\u00072\u0002\u0002\u011d\u011e\u0005\u001a\u000e\u0002",
    "\u011e\u011f\u00073\u0002\u0002\u011f\u0121\u0003\u0002\u0002\u0002",
    "\u0120\u010a\u0003\u0002\u0002\u0002\u0120\u0110\u0003\u0002\u0002\u0002",
    "\u0120\u011b\u0003\u0002\u0002\u0002\u0120\u011c\u0003\u0002\u0002\u0002",
    "\u0121\u0138\u0003\u0002\u0002\u0002\u0122\u0123\f\u0006\u0002\u0002",
    "\u0123\u0124\u0007.\u0002\u0002\u0124\u0137\u0005\u001a\u000e\u0007",
    "\u0125\u0126\f\u000b\u0002\u0002\u0126\u0127\u00070\u0002\u0002\u0127",
    "\u0137\u00077\u0002\u0002\u0128\u0129\f\n\u0002\u0002\u0129\u012a\u0007",
    "0\u0002\u0002\u012a\u012b\u00074\u0002\u0002\u012b\u012c\u00077\u0002",
    "\u0002\u012c\u0137\u00075\u0002\u0002\u012d\u012e\f\t\u0002\u0002\u012e",
    "\u012f\u00070\u0002\u0002\u012f\u0137\u0005\u0018\r\u0002\u0130\u0131",
    "\f\b\u0002\u0002\u0131\u0132\u00070\u0002\u0002\u0132\u0133\u00074\u0002",
    "\u0002\u0133\u0134\u0005\u0018\r\u0002\u0134\u0135\u00075\u0002\u0002",
    "\u0135\u0137\u0003\u0002\u0002\u0002\u0136\u0122\u0003\u0002\u0002\u0002",
    "\u0136\u0125\u0003\u0002\u0002\u0002\u0136\u0128\u0003\u0002\u0002\u0002",
    "\u0136\u012d\u0003\u0002\u0002\u0002\u0136\u0130\u0003\u0002\u0002\u0002",
    "\u0137\u013a\u0003\u0002\u0002\u0002\u0138\u0136\u0003\u0002\u0002\u0002",
    "\u0138\u0139\u0003\u0002\u0002\u0002\u0139\u001b\u0003\u0002\u0002\u0002",
    "\u013a\u0138\u0003\u0002\u0002\u0002\u0014\u001f*1D[hq\u0082\u008f\u00ad",
    "\u00b5\u00e5\u00f9\u00fb\u0114\u0120\u0136\u0138"].join("");


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
                            "'tanh'", "'coth'", "'ln'", "'log'", null, null, 
                            "'+'", "'-'", null, "'='", null, null, null, 
                            null, null, "']'", null, null, null, null, null, 
                            null, null, null, null, "'1'" ];
    static symbolicNames = [ null, "L_BRACKET", "SEMICOLON", "L_BRACE", 
                             "R_BRACE", "L_PAREN", "R_PAREN", "VBAR", "UNDERSCORE", 
                             "PI", "CMD_INT", "CMD_MATHRM", "CMD_FRAC", 
                             "CMD_CDOT", "CMD_SQRT", "BACK_SLASH", "CMD_SIN", 
                             "CMD_COS", "CMD_TAN", "CMD_COT", "CMD_SEC", 
                             "CMD_CSC", "CMD_ARCSIN", "CMD_ARCCOS", "CMD_ARCTAN", 
                             "CMD_SINH", "CMD_COSH", "CMD_TANH", "CMD_COTH", 
                             "CMD_LN", "CMD_LOG", "CMD_LEFT", "CMD_RIGHT", 
                             "ADD", "SUB", "CARET", "EQ", "NUMBER", "ID", 
                             "WS", "SLASH_SPACE", "ERROR_CHAR", "R_BRACKET", 
                             "U_CMD_FRAC", "U_CMD_CDOT", "U_CMD_SQRT", "U_CARET", 
                             "U_NAME", "U_L_PAREN", "U_R_PAREN", "U_L_BRACE", 
                             "U_R_BRACE", "U_ONE", "U_NUMBER", "U_CMD_LEFT", 
                             "U_CMD_RIGHT", "U_WS", "U_SLASH_SPACE", "U_ERROR_CHAR" ];
    static ruleNames = [ "statement", "assign", "query", "equality", "trig_function", 
                         "indefinite_integral_cmd", "integral_cmd", "derivative_cmd", 
                         "n_derivative_cmd", "expr", "u_block", "u_fraction", 
                         "u_expr" ];

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
    	case 9:
    	    		return this.expr_sempred(localctx, predIndex);
    	case 12:
    	    		return this.u_expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 23);
    		case 1:
    			return this.precpred(this._ctx, 9);
    		case 2:
    			return this.precpred(this._ctx, 7);
    		case 3:
    			return this.precpred(this._ctx, 6);
    		case 4:
    			return this.precpred(this._ctx, 22);
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




	statement() {
	    let localctx = new StatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LatexParser.RULE_statement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 29;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 26;
	            this.assign();
	            break;

	        case 2:
	            this.state = 27;
	            this.query();
	            break;

	        case 3:
	            this.state = 28;
	            this.equality();
	            break;

	        }
	        this.state = 31;
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



	assign() {
	    let localctx = new AssignContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, LatexParser.RULE_assign);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 33;
	        this.match(LatexParser.ID);
	        this.state = 34;
	        this.match(LatexParser.EQ);
	        this.state = 35;
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
	    this.enterRule(localctx, 4, LatexParser.RULE_query);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 37;
	        this.expr(0);
	        this.state = 38;
	        this.match(LatexParser.EQ);
	        this.state = 40;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===LatexParser.L_BRACKET) {
	            this.state = 39;
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
	    this.enterRule(localctx, 6, LatexParser.RULE_equality);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 42;
	        this.expr(0);
	        this.state = 43;
	        this.match(LatexParser.EQ);
	        this.state = 44;
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
	    this.enterRule(localctx, 8, LatexParser.RULE_trig_function);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 47;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===LatexParser.BACK_SLASH) {
	            this.state = 46;
	            this.match(LatexParser.BACK_SLASH);
	        }

	        this.state = 49;
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
	    this.enterRule(localctx, 10, LatexParser.RULE_indefinite_integral_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 51;
	        this.match(LatexParser.CMD_INT);
	        this.state = 52;
	        this.match(LatexParser.UNDERSCORE);
	        this.state = 53;
	        this.match(LatexParser.L_BRACE);
	        this.state = 54;
	        this.match(LatexParser.R_BRACE);
	        this.state = 55;
	        this.match(LatexParser.CARET);
	        this.state = 56;
	        this.match(LatexParser.L_BRACE);
	        this.state = 57;
	        this.match(LatexParser.R_BRACE);
	        this.state = 58;
	        this.match(LatexParser.L_PAREN);
	        this.state = 59;
	        this.expr(0);
	        this.state = 60;
	        this.match(LatexParser.R_PAREN);
	        this.state = 66;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 61;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 62;
	            this.match(LatexParser.L_BRACE);
	            this.state = 63;
	            this.match(LatexParser.ID);
	            this.state = 64;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 65;
	            this.match(LatexParser.ID);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 68;
	        this.match(LatexParser.L_PAREN);
	        this.state = 69;
	        this.match(LatexParser.ID);
	        this.state = 70;
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
	    this.enterRule(localctx, 12, LatexParser.RULE_integral_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 72;
	        this.match(LatexParser.CMD_INT);
	        this.state = 73;
	        this.match(LatexParser.UNDERSCORE);
	        this.state = 74;
	        this.match(LatexParser.L_BRACE);
	        this.state = 75;
	        this.expr(0);
	        this.state = 76;
	        this.match(LatexParser.R_BRACE);
	        this.state = 77;
	        this.match(LatexParser.CARET);
	        this.state = 78;
	        this.match(LatexParser.L_BRACE);
	        this.state = 79;
	        this.expr(0);
	        this.state = 80;
	        this.match(LatexParser.R_BRACE);
	        this.state = 81;
	        this.match(LatexParser.L_PAREN);
	        this.state = 82;
	        this.expr(0);
	        this.state = 83;
	        this.match(LatexParser.R_PAREN);
	        this.state = 89;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 84;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 85;
	            this.match(LatexParser.L_BRACE);
	            this.state = 86;
	            this.match(LatexParser.ID);
	            this.state = 87;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 88;
	            this.match(LatexParser.ID);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 91;
	        this.match(LatexParser.L_PAREN);
	        this.state = 92;
	        this.match(LatexParser.ID);
	        this.state = 93;
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
	    this.enterRule(localctx, 14, LatexParser.RULE_derivative_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 95;
	        this.match(LatexParser.CMD_FRAC);
	        this.state = 96;
	        this.match(LatexParser.L_BRACE);
	        this.state = 102;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 97;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 98;
	            this.match(LatexParser.L_BRACE);
	            this.state = 99;
	            this.match(LatexParser.ID);
	            this.state = 100;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 101;
	            this.match(LatexParser.ID);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 104;
	        this.match(LatexParser.R_BRACE);
	        this.state = 105;
	        this.match(LatexParser.L_BRACE);
	        this.state = 111;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 106;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 107;
	            this.match(LatexParser.L_BRACE);
	            this.state = 108;
	            this.match(LatexParser.ID);
	            this.state = 109;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 110;
	            this.match(LatexParser.ID);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 113;
	        this.match(LatexParser.L_PAREN);
	        this.state = 114;
	        this.match(LatexParser.ID);
	        this.state = 115;
	        this.match(LatexParser.R_PAREN);
	        this.state = 116;
	        this.match(LatexParser.R_BRACE);
	        this.state = 117;
	        this.match(LatexParser.L_PAREN);
	        this.state = 118;
	        this.expr(0);
	        this.state = 119;
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
	    this.enterRule(localctx, 16, LatexParser.RULE_n_derivative_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 121;
	        this.match(LatexParser.CMD_FRAC);
	        this.state = 122;
	        this.match(LatexParser.L_BRACE);
	        this.state = 128;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 123;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 124;
	            this.match(LatexParser.L_BRACE);
	            this.state = 125;
	            this.match(LatexParser.ID);
	            this.state = 126;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 127;
	            this.match(LatexParser.ID);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 130;
	        this.match(LatexParser.CARET);
	        this.state = 131;
	        this.match(LatexParser.L_BRACE);
	        this.state = 132;
	        this.match(LatexParser.NUMBER);
	        this.state = 133;
	        this.match(LatexParser.R_BRACE);
	        this.state = 134;
	        this.match(LatexParser.R_BRACE);
	        this.state = 135;
	        this.match(LatexParser.L_BRACE);
	        this.state = 141;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 136;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 137;
	            this.match(LatexParser.L_BRACE);
	            this.state = 138;
	            this.match(LatexParser.ID);
	            this.state = 139;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 140;
	            this.match(LatexParser.ID);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 143;
	        this.match(LatexParser.L_PAREN);
	        this.state = 144;
	        this.match(LatexParser.ID);
	        this.state = 145;
	        this.match(LatexParser.R_PAREN);
	        this.state = 146;
	        this.match(LatexParser.CARET);
	        this.state = 147;
	        this.match(LatexParser.L_BRACE);
	        this.state = 148;
	        this.match(LatexParser.NUMBER);
	        this.state = 149;
	        this.match(LatexParser.R_BRACE);
	        this.state = 150;
	        this.match(LatexParser.R_BRACE);
	        this.state = 151;
	        this.match(LatexParser.L_PAREN);
	        this.state = 152;
	        this.expr(0);
	        this.state = 153;
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


	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 18;
	    this.enterRecursionRule(localctx, 18, LatexParser.RULE_expr, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 227;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new SqrtContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 156;
	            this.match(LatexParser.CMD_SQRT);
	            this.state = 157;
	            this.match(LatexParser.L_BRACE);
	            this.state = 158;
	            this.expr(0);
	            this.state = 159;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 2:
	            localctx = new TrigContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 161;
	            this.trig_function();
	            this.state = 162;
	            this.match(LatexParser.L_PAREN);
	            this.state = 163;
	            this.expr(0);
	            this.state = 164;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 3:
	            localctx = new IndefiniteIntegralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 166;
	            this.indefinite_integral_cmd();
	            break;

	        case 4:
	            localctx = new IntegralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 167;
	            this.integral_cmd();
	            break;

	        case 5:
	            localctx = new DerivativeContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 168;
	            this.derivative_cmd();
	            break;

	        case 6:
	            localctx = new NDerivativeContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 169;
	            this.n_derivative_cmd();
	            break;

	        case 7:
	            localctx = new LnContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 171;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===LatexParser.BACK_SLASH) {
	                this.state = 170;
	                this.match(LatexParser.BACK_SLASH);
	            }

	            this.state = 173;
	            this.match(LatexParser.CMD_LN);
	            this.state = 174;
	            this.match(LatexParser.L_PAREN);
	            this.state = 175;
	            this.expr(0);
	            this.state = 176;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 8:
	            localctx = new LogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 179;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===LatexParser.BACK_SLASH) {
	                this.state = 178;
	                this.match(LatexParser.BACK_SLASH);
	            }

	            this.state = 181;
	            this.match(LatexParser.CMD_LOG);
	            this.state = 182;
	            this.match(LatexParser.L_PAREN);
	            this.state = 183;
	            this.expr(0);
	            this.state = 184;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 9:
	            localctx = new BaseLogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 186;
	            this.match(LatexParser.BACK_SLASH);
	            this.state = 187;
	            this.match(LatexParser.CMD_LOG);
	            this.state = 188;
	            this.match(LatexParser.UNDERSCORE);
	            this.state = 189;
	            this.match(LatexParser.L_BRACE);
	            this.state = 190;
	            this.expr(0);
	            this.state = 191;
	            this.match(LatexParser.R_BRACE);
	            this.state = 192;
	            this.match(LatexParser.L_PAREN);
	            this.state = 193;
	            this.expr(0);
	            this.state = 194;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 10:
	            localctx = new BaseLogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 196;
	            this.match(LatexParser.BACK_SLASH);
	            this.state = 197;
	            this.match(LatexParser.CMD_LOG);
	            this.state = 198;
	            this.match(LatexParser.UNDERSCORE);
	            this.state = 199;
	            this.expr(0);
	            this.state = 200;
	            this.match(LatexParser.L_PAREN);
	            this.state = 201;
	            this.expr(0);
	            this.state = 202;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 11:
	            localctx = new AbsContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 204;
	            this.match(LatexParser.VBAR);
	            this.state = 205;
	            this.expr(0);
	            this.state = 206;
	            this.match(LatexParser.VBAR);
	            break;

	        case 12:
	            localctx = new UnaryMinusContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 208;
	            this.match(LatexParser.SUB);
	            this.state = 209;
	            this.expr(10);
	            break;

	        case 13:
	            localctx = new DivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 210;
	            this.match(LatexParser.CMD_FRAC);
	            this.state = 211;
	            this.match(LatexParser.L_BRACE);
	            this.state = 212;
	            this.expr(0);
	            this.state = 213;
	            this.match(LatexParser.R_BRACE);
	            this.state = 214;
	            this.match(LatexParser.L_BRACE);
	            this.state = 215;
	            this.expr(0);
	            this.state = 216;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 14:
	            localctx = new VariableContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 218;
	            this.match(LatexParser.ID);
	            break;

	        case 15:
	            localctx = new NumberWithUnitsContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 219;
	            this.match(LatexParser.NUMBER);
	            this.state = 220;
	            this.u_block();
	            break;

	        case 16:
	            localctx = new NumberContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 221;
	            this.match(LatexParser.NUMBER);
	            break;

	        case 17:
	            localctx = new PiExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 222;
	            this.match(LatexParser.PI);
	            break;

	        case 18:
	            localctx = new SubExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 223;
	            this.match(LatexParser.L_PAREN);
	            this.state = 224;
	            this.expr(0);
	            this.state = 225;
	            this.match(LatexParser.R_PAREN);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 249;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 247;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 229;
	                    if (!( this.precpred(this._ctx, 23))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 23)");
	                    }
	                    this.state = 230;
	                    this.match(LatexParser.CARET);
	                    this.state = 231;
	                    this.expr(23);
	                    break;

	                case 2:
	                    localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 232;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 233;
	                    this.match(LatexParser.CMD_CDOT);
	                    this.state = 234;
	                    this.expr(10);
	                    break;

	                case 3:
	                    localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 235;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 236;
	                    this.match(LatexParser.ADD);
	                    this.state = 237;
	                    this.expr(8);
	                    break;

	                case 4:
	                    localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 238;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 239;
	                    this.match(LatexParser.SUB);
	                    this.state = 240;
	                    this.expr(7);
	                    break;

	                case 5:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 241;
	                    if (!( this.precpred(this._ctx, 22))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
	                    }
	                    this.state = 242;
	                    this.match(LatexParser.CARET);
	                    this.state = 243;
	                    this.match(LatexParser.L_BRACE);
	                    this.state = 244;
	                    this.expr(0);
	                    this.state = 245;
	                    this.match(LatexParser.R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 251;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
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
	    this.enterRule(localctx, 20, LatexParser.RULE_u_block);
	    try {
	        localctx = new UnitBlockContext(this, localctx);
	        this.enterOuterAlt(localctx, 1);
	        this.state = 252;
	        this.match(LatexParser.L_BRACKET);
	        this.state = 253;
	        this.u_expr(0);
	        this.state = 254;
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
	    this.enterRule(localctx, 22, LatexParser.RULE_u_fraction);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 256;
	        this.match(LatexParser.U_CMD_FRAC);
	        this.state = 257;
	        this.match(LatexParser.U_L_BRACE);
	        this.state = 258;
	        _la = this._input.LA(1);
	        if(!(_la===LatexParser.U_ONE || _la===LatexParser.U_NUMBER)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 259;
	        this.match(LatexParser.U_R_BRACE);
	        this.state = 260;
	        this.match(LatexParser.U_L_BRACE);
	        this.state = 261;
	        this.match(LatexParser.U_NUMBER);
	        this.state = 262;
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
	    const _startState = 24;
	    this.enterRecursionRule(localctx, 24, LatexParser.RULE_u_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 286;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.U_CMD_SQRT:
	            localctx = new UnitSqrtContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 265;
	            this.match(LatexParser.U_CMD_SQRT);
	            this.state = 266;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 267;
	            this.expr(0);
	            this.state = 268;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case LatexParser.U_CMD_FRAC:
	            localctx = new UnitDivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 270;
	            this.match(LatexParser.U_CMD_FRAC);
	            this.state = 271;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 274;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case LatexParser.U_CMD_FRAC:
	            case LatexParser.U_CMD_SQRT:
	            case LatexParser.U_NAME:
	            case LatexParser.U_L_PAREN:
	                this.state = 272;
	                this.u_expr(0);
	                break;
	            case LatexParser.U_ONE:
	                this.state = 273;
	                this.match(LatexParser.U_ONE);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 276;
	            this.match(LatexParser.U_R_BRACE);
	            this.state = 277;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 278;
	            this.u_expr(0);
	            this.state = 279;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case LatexParser.U_NAME:
	            localctx = new UnitNameContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 281;
	            this.match(LatexParser.U_NAME);
	            break;
	        case LatexParser.U_L_PAREN:
	            localctx = new UnitSubExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 282;
	            this.match(LatexParser.U_L_PAREN);
	            this.state = 283;
	            this.u_expr(0);
	            this.state = 284;
	            this.match(LatexParser.U_R_PAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 310;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,17,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 308;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 288;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 289;
	                    this.match(LatexParser.U_CMD_CDOT);
	                    this.state = 290;
	                    this.u_expr(5);
	                    break;

	                case 2:
	                    localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 291;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 292;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 293;
	                    this.match(LatexParser.U_NUMBER);
	                    break;

	                case 3:
	                    localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 294;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 295;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 296;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 297;
	                    this.match(LatexParser.U_NUMBER);
	                    this.state = 298;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                case 4:
	                    localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 299;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 300;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 301;
	                    this.u_fraction();
	                    break;

	                case 5:
	                    localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 302;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 303;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 304;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 305;
	                    this.u_fraction();
	                    this.state = 306;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 312;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,17,this._ctx);
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
LatexParser.CMD_LEFT = 31;
LatexParser.CMD_RIGHT = 32;
LatexParser.ADD = 33;
LatexParser.SUB = 34;
LatexParser.CARET = 35;
LatexParser.EQ = 36;
LatexParser.NUMBER = 37;
LatexParser.ID = 38;
LatexParser.WS = 39;
LatexParser.SLASH_SPACE = 40;
LatexParser.ERROR_CHAR = 41;
LatexParser.R_BRACKET = 42;
LatexParser.U_CMD_FRAC = 43;
LatexParser.U_CMD_CDOT = 44;
LatexParser.U_CMD_SQRT = 45;
LatexParser.U_CARET = 46;
LatexParser.U_NAME = 47;
LatexParser.U_L_PAREN = 48;
LatexParser.U_R_PAREN = 49;
LatexParser.U_L_BRACE = 50;
LatexParser.U_R_BRACE = 51;
LatexParser.U_ONE = 52;
LatexParser.U_NUMBER = 53;
LatexParser.U_CMD_LEFT = 54;
LatexParser.U_CMD_RIGHT = 55;
LatexParser.U_WS = 56;
LatexParser.U_SLASH_SPACE = 57;
LatexParser.U_ERROR_CHAR = 58;

LatexParser.RULE_statement = 0;
LatexParser.RULE_assign = 1;
LatexParser.RULE_query = 2;
LatexParser.RULE_equality = 3;
LatexParser.RULE_trig_function = 4;
LatexParser.RULE_indefinite_integral_cmd = 5;
LatexParser.RULE_integral_cmd = 6;
LatexParser.RULE_derivative_cmd = 7;
LatexParser.RULE_n_derivative_cmd = 8;
LatexParser.RULE_expr = 9;
LatexParser.RULE_u_block = 10;
LatexParser.RULE_u_fraction = 11;
LatexParser.RULE_u_expr = 12;

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

	SEMICOLON() {
	    return this.getToken(LatexParser.SEMICOLON, 0);
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


	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.ID);
	    } else {
	        return this.getToken(LatexParser.ID, i);
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


	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.ID);
	    } else {
	        return this.getToken(LatexParser.ID, i);
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


	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.ID);
	    } else {
	        return this.getToken(LatexParser.ID, i);
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


	NUMBER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.NUMBER);
	    } else {
	        return this.getToken(LatexParser.NUMBER, i);
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


	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.ID);
	    } else {
	        return this.getToken(LatexParser.ID, i);
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

	CMD_LOG() {
	    return this.getToken(LatexParser.CMD_LOG, 0);
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

	NUMBER() {
	    return this.getToken(LatexParser.NUMBER, 0);
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

class NumberContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
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

LatexParser.NumberContext = NumberContext;

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

	ID() {
	    return this.getToken(LatexParser.ID, 0);
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

	BACK_SLASH() {
	    return this.getToken(LatexParser.BACK_SLASH, 0);
	};

	CMD_LOG() {
	    return this.getToken(LatexParser.CMD_LOG, 0);
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


LatexParser.StatementContext = StatementContext; 
LatexParser.AssignContext = AssignContext; 
LatexParser.QueryContext = QueryContext; 
LatexParser.EqualityContext = EqualityContext; 
LatexParser.Trig_functionContext = Trig_functionContext; 
LatexParser.Indefinite_integral_cmdContext = Indefinite_integral_cmdContext; 
LatexParser.Integral_cmdContext = Integral_cmdContext; 
LatexParser.Derivative_cmdContext = Derivative_cmdContext; 
LatexParser.N_derivative_cmdContext = N_derivative_cmdContext; 
LatexParser.ExprContext = ExprContext; 
LatexParser.U_blockContext = U_blockContext; 
LatexParser.U_fractionContext = U_fractionContext; 
LatexParser.U_exprContext = U_exprContext; 
