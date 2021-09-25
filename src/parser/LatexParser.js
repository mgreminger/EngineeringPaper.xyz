// Generated from LatexParser.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import LatexParserListener from './LatexParserListener.js';
import LatexParserVisitor from './LatexParserVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003B\u015b\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "&\n\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u00051\n\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0005\u0007",
    "8\n\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0005\bL\n\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005",
    "\td\n\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\nr\n\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n|\n\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0005\u000b\u008e\n\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u009c\n\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0005\f\u00b4\n\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0005\r\u00c6\n\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0007\r\u00f6\n\r\f\r\u000e",
    "\r\u00f9\u000b\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0005\r\u0105\n\r\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0007\r\u0119\n\r",
    "\f\r\u000e\r\u011c\u000b\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0005\u0010\u0134\n\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0005\u0010\u0140\n\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0007",
    "\u0010\u0156\n\u0010\f\u0010\u000e\u0010\u0159\u000b\u0010\u0003\u0010",
    "\u0002\u0004\u0018\u001e\u0011\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012",
    "\u0014\u0016\u0018\u001a\u001c\u001e\u0002\u0006\u0003\u0002\u0012\u001e",
    "\u0004\u0002((**\u0003\u0002 !\u0003\u0002<=\u0002\u0178\u0002 \u0003",
    "\u0002\u0002\u0002\u0004%\u0003\u0002\u0002\u0002\u0006)\u0003\u0002",
    "\u0002\u0002\b-\u0003\u0002\u0002\u0002\n2\u0003\u0002\u0002\u0002\f",
    "7\u0003\u0002\u0002\u0002\u000e;\u0003\u0002\u0002\u0002\u0010Q\u0003",
    "\u0002\u0002\u0002\u0012i\u0003\u0002\u0002\u0002\u0014\u0085\u0003",
    "\u0002\u0002\u0002\u0016\u00b3\u0003\u0002\u0002\u0002\u0018\u0104\u0003",
    "\u0002\u0002\u0002\u001a\u011d\u0003\u0002\u0002\u0002\u001c\u0121\u0003",
    "\u0002\u0002\u0002\u001e\u013f\u0003\u0002\u0002\u0002 !\u0007.\u0002",
    "\u0002!\u0003\u0003\u0002\u0002\u0002\"&\u0005\u0006\u0004\u0002#&\u0005",
    "\b\u0005\u0002$&\u0005\n\u0006\u0002%\"\u0003\u0002\u0002\u0002%#\u0003",
    "\u0002\u0002\u0002%$\u0003\u0002\u0002\u0002&\'\u0003\u0002\u0002\u0002",
    "\'(\u0007\u0004\u0002\u0002(\u0005\u0003\u0002\u0002\u0002)*\u0005\u0002",
    "\u0002\u0002*+\u0007\'\u0002\u0002+,\u0005\u0018\r\u0002,\u0007\u0003",
    "\u0002\u0002\u0002-.\u0005\u0018\r\u0002.0\u0007\'\u0002\u0002/1\u0005",
    "\u001a\u000e\u00020/\u0003\u0002\u0002\u000201\u0003\u0002\u0002\u0002",
    "1\t\u0003\u0002\u0002\u000223\u0005\u0018\r\u000234\u0007\'\u0002\u0002",
    "45\u0005\u0018\r\u00025\u000b\u0003\u0002\u0002\u000268\u0007\u0011",
    "\u0002\u000276\u0003\u0002\u0002\u000278\u0003\u0002\u0002\u000289\u0003",
    "\u0002\u0002\u00029:\t\u0002\u0002\u0002:\r\u0003\u0002\u0002\u0002",
    ";<\u0007\f\u0002\u0002<=\u0007\n\u0002\u0002=>\u0007\u0005\u0002\u0002",
    ">?\u0007\u0006\u0002\u0002?@\u0007&\u0002\u0002@A\u0007\u0005\u0002",
    "\u0002AB\u0007\u0006\u0002\u0002BC\u0007\u0007\u0002\u0002CD\u0005\u0018",
    "\r\u0002DK\u0007\b\u0002\u0002EF\u0007\r\u0002\u0002FG\u0007\u0005\u0002",
    "\u0002GH\u0005\u0002\u0002\u0002HI\u0007\u0006\u0002\u0002IL\u0003\u0002",
    "\u0002\u0002JL\u0005\u0002\u0002\u0002KE\u0003\u0002\u0002\u0002KJ\u0003",
    "\u0002\u0002\u0002LM\u0003\u0002\u0002\u0002MN\u0007\u0007\u0002\u0002",
    "NO\u0005\u0002\u0002\u0002OP\u0007\b\u0002\u0002P\u000f\u0003\u0002",
    "\u0002\u0002QR\u0007\f\u0002\u0002RS\u0007\n\u0002\u0002ST\u0007\u0005",
    "\u0002\u0002TU\u0005\u0018\r\u0002UV\u0007\u0006\u0002\u0002VW\u0007",
    "&\u0002\u0002WX\u0007\u0005\u0002\u0002XY\u0005\u0018\r\u0002YZ\u0007",
    "\u0006\u0002\u0002Z[\u0007\u0007\u0002\u0002[\\\u0005\u0018\r\u0002",
    "\\c\u0007\b\u0002\u0002]^\u0007\r\u0002\u0002^_\u0007\u0005\u0002\u0002",
    "_`\u0005\u0002\u0002\u0002`a\u0007\u0006\u0002\u0002ad\u0003\u0002\u0002",
    "\u0002bd\u0005\u0002\u0002\u0002c]\u0003\u0002\u0002\u0002cb\u0003\u0002",
    "\u0002\u0002de\u0003\u0002\u0002\u0002ef\u0007\u0007\u0002\u0002fg\u0005",
    "\u0002\u0002\u0002gh\u0007\b\u0002\u0002h\u0011\u0003\u0002\u0002\u0002",
    "ij\u0007\u000e\u0002\u0002jq\u0007\u0005\u0002\u0002kl\u0007\r\u0002",
    "\u0002lm\u0007\u0005\u0002\u0002mn\u0005\u0002\u0002\u0002no\u0007\u0006",
    "\u0002\u0002or\u0003\u0002\u0002\u0002pr\u0005\u0002\u0002\u0002qk\u0003",
    "\u0002\u0002\u0002qp\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002",
    "st\u0007\u0006\u0002\u0002t{\u0007\u0005\u0002\u0002uv\u0007\r\u0002",
    "\u0002vw\u0007\u0005\u0002\u0002wx\u0005\u0002\u0002\u0002xy\u0007\u0006",
    "\u0002\u0002y|\u0003\u0002\u0002\u0002z|\u0005\u0002\u0002\u0002{u\u0003",
    "\u0002\u0002\u0002{z\u0003\u0002\u0002\u0002|}\u0003\u0002\u0002\u0002",
    "}~\u0007\u0007\u0002\u0002~\u007f\u0005\u0002\u0002\u0002\u007f\u0080",
    "\u0007\b\u0002\u0002\u0080\u0081\u0007\u0006\u0002\u0002\u0081\u0082",
    "\u0007\u0007\u0002\u0002\u0082\u0083\u0005\u0018\r\u0002\u0083\u0084",
    "\u0007\b\u0002\u0002\u0084\u0013\u0003\u0002\u0002\u0002\u0085\u0086",
    "\u0007\u000e\u0002\u0002\u0086\u008d\u0007\u0005\u0002\u0002\u0087\u0088",
    "\u0007\r\u0002\u0002\u0088\u0089\u0007\u0005\u0002\u0002\u0089\u008a",
    "\u0005\u0002\u0002\u0002\u008a\u008b\u0007\u0006\u0002\u0002\u008b\u008e",
    "\u0003\u0002\u0002\u0002\u008c\u008e\u0005\u0002\u0002\u0002\u008d\u0087",
    "\u0003\u0002\u0002\u0002\u008d\u008c\u0003\u0002\u0002\u0002\u008e\u008f",
    "\u0003\u0002\u0002\u0002\u008f\u0090\u0007&\u0002\u0002\u0090\u0091",
    "\u0007\u0005\u0002\u0002\u0091\u0092\u0007-\u0002\u0002\u0092\u0093",
    "\u0007\u0006\u0002\u0002\u0093\u0094\u0007\u0006\u0002\u0002\u0094\u009b",
    "\u0007\u0005\u0002\u0002\u0095\u0096\u0007\r\u0002\u0002\u0096\u0097",
    "\u0007\u0005\u0002\u0002\u0097\u0098\u0005\u0002\u0002\u0002\u0098\u0099",
    "\u0007\u0006\u0002\u0002\u0099\u009c\u0003\u0002\u0002\u0002\u009a\u009c",
    "\u0005\u0002\u0002\u0002\u009b\u0095\u0003\u0002\u0002\u0002\u009b\u009a",
    "\u0003\u0002\u0002\u0002\u009c\u009d\u0003\u0002\u0002\u0002\u009d\u009e",
    "\u0007\u0007\u0002\u0002\u009e\u009f\u0005\u0002\u0002\u0002\u009f\u00a0",
    "\u0007\b\u0002\u0002\u00a0\u00a1\u0007&\u0002\u0002\u00a1\u00a2\u0007",
    "\u0005\u0002\u0002\u00a2\u00a3\u0007-\u0002\u0002\u00a3\u00a4\u0007",
    "\u0006\u0002\u0002\u00a4\u00a5\u0007\u0006\u0002\u0002\u00a5\u00a6\u0007",
    "\u0007\u0002\u0002\u00a6\u00a7\u0005\u0018\r\u0002\u00a7\u00a8\u0007",
    "\b\u0002\u0002\u00a8\u0015\u0003\u0002\u0002\u0002\u00a9\u00aa\u0005",
    "\u0002\u0002\u0002\u00aa\u00ab\u0007\'\u0002\u0002\u00ab\u00ac\u0005",
    "\u0018\r\u0002\u00ac\u00b4\u0003\u0002\u0002\u0002\u00ad\u00ae\u0005",
    "\u0018\r\u0002\u00ae\u00af\t\u0003\u0002\u0002\u00af\u00b0\u0005\u0002",
    "\u0002\u0002\u00b0\u00b1\t\u0003\u0002\u0002\u00b1\u00b2\u0005\u0018",
    "\r\u0002\u00b2\u00b4\u0003\u0002\u0002\u0002\u00b3\u00a9\u0003\u0002",
    "\u0002\u0002\u00b3\u00ad\u0003\u0002\u0002\u0002\u00b4\u0017\u0003\u0002",
    "\u0002\u0002\u00b5\u00b6\b\r\u0001\u0002\u00b6\u00b7\u0007\u0010\u0002",
    "\u0002\u00b7\u00b8\u0007\u0005\u0002\u0002\u00b8\u00b9\u0005\u0018\r",
    "\u0002\u00b9\u00ba\u0007\u0006\u0002\u0002\u00ba\u0105\u0003\u0002\u0002",
    "\u0002\u00bb\u00bc\u0005\f\u0007\u0002\u00bc\u00bd\u0007\u0007\u0002",
    "\u0002\u00bd\u00be\u0005\u0018\r\u0002\u00be\u00bf\u0007\b\u0002\u0002",
    "\u00bf\u0105\u0003\u0002\u0002\u0002\u00c0\u0105\u0005\u000e\b\u0002",
    "\u00c1\u0105\u0005\u0010\t\u0002\u00c2\u0105\u0005\u0012\n\u0002\u00c3",
    "\u0105\u0005\u0014\u000b\u0002\u00c4\u00c6\u0007\u0011\u0002\u0002\u00c5",
    "\u00c4\u0003\u0002\u0002\u0002\u00c5\u00c6\u0003\u0002\u0002\u0002\u00c6",
    "\u00c7\u0003\u0002\u0002\u0002\u00c7\u00c8\u0007\u001f\u0002\u0002\u00c8",
    "\u00c9\u0007\u0007\u0002\u0002\u00c9\u00ca\u0005\u0018\r\u0002\u00ca",
    "\u00cb\u0007\b\u0002\u0002\u00cb\u0105\u0003\u0002\u0002\u0002\u00cc",
    "\u00cd\t\u0004\u0002\u0002\u00cd\u00ce\u0007\u0007\u0002\u0002\u00ce",
    "\u00cf\u0005\u0018\r\u0002\u00cf\u00d0\u0007\b\u0002\u0002\u00d0\u0105",
    "\u0003\u0002\u0002\u0002\u00d1\u00d2\u0007!\u0002\u0002\u00d2\u00d3",
    "\u0007\n\u0002\u0002\u00d3\u00d4\u0007\u0005\u0002\u0002\u00d4\u00d5",
    "\u0005\u0018\r\u0002\u00d5\u00d6\u0007\u0006\u0002\u0002\u00d6\u00d7",
    "\u0007\u0007\u0002\u0002\u00d7\u00d8\u0005\u0018\r\u0002\u00d8\u00d9",
    "\u0007\b\u0002\u0002\u00d9\u0105\u0003\u0002\u0002\u0002\u00da\u00db",
    "\u0007!\u0002\u0002\u00db\u00dc\u0007\n\u0002\u0002\u00dc\u00dd\u0005",
    "\u0018\r\u0002\u00dd\u00de\u0007\u0007\u0002\u0002\u00de\u00df\u0005",
    "\u0018\r\u0002\u00df\u00e0\u0007\b\u0002\u0002\u00e0\u0105\u0003\u0002",
    "\u0002\u0002\u00e1\u00e2\u0007\t\u0002\u0002\u00e2\u00e3\u0005\u0018",
    "\r\u0002\u00e3\u00e4\u0007\t\u0002\u0002\u00e4\u0105\u0003\u0002\u0002",
    "\u0002\u00e5\u00e6\u0007%\u0002\u0002\u00e6\u0105\u0005\u0018\r\r\u00e7",
    "\u00e8\u0007\u000e\u0002\u0002\u00e8\u00e9\u0007\u0005\u0002\u0002\u00e9",
    "\u00ea\u0005\u0018\r\u0002\u00ea\u00eb\u0007\u0006\u0002\u0002\u00eb",
    "\u00ec\u0007\u0005\u0002\u0002\u00ec\u00ed\u0005\u0018\r\u0002\u00ed",
    "\u00ee\u0007\u0006\u0002\u0002\u00ee\u0105\u0003\u0002\u0002\u0002\u00ef",
    "\u0105\u0005\u0002\u0002\u0002\u00f0\u00f1\u0005\u0002\u0002\u0002\u00f1",
    "\u00f2\u0007\u0007\u0002\u0002\u00f2\u00f7\u0005\u0016\f\u0002\u00f3",
    "\u00f4\u0007,\u0002\u0002\u00f4\u00f6\u0005\u0016\f\u0002\u00f5\u00f3",
    "\u0003\u0002\u0002\u0002\u00f6\u00f9\u0003\u0002\u0002\u0002\u00f7\u00f5",
    "\u0003\u0002\u0002\u0002\u00f7\u00f8\u0003\u0002\u0002\u0002\u00f8\u00fa",
    "\u0003\u0002\u0002\u0002\u00f9\u00f7\u0003\u0002\u0002\u0002\u00fa\u00fb",
    "\u0007\b\u0002\u0002\u00fb\u0105\u0003\u0002\u0002\u0002\u00fc\u00fd",
    "\u0007-\u0002\u0002\u00fd\u0105\u0005\u001a\u000e\u0002\u00fe\u0105",
    "\u0007-\u0002\u0002\u00ff\u0105\u0007\u000b\u0002\u0002\u0100\u0101",
    "\u0007\u0007\u0002\u0002\u0101\u0102\u0005\u0018\r\u0002\u0102\u0103",
    "\u0007\b\u0002\u0002\u0103\u0105\u0003\u0002\u0002\u0002\u0104\u00b5",
    "\u0003\u0002\u0002\u0002\u0104\u00bb\u0003\u0002\u0002\u0002\u0104\u00c0",
    "\u0003\u0002\u0002\u0002\u0104\u00c1\u0003\u0002\u0002\u0002\u0104\u00c2",
    "\u0003\u0002\u0002\u0002\u0104\u00c3\u0003\u0002\u0002\u0002\u0104\u00c5",
    "\u0003\u0002\u0002\u0002\u0104\u00cc\u0003\u0002\u0002\u0002\u0104\u00d1",
    "\u0003\u0002\u0002\u0002\u0104\u00da\u0003\u0002\u0002\u0002\u0104\u00e1",
    "\u0003\u0002\u0002\u0002\u0104\u00e5\u0003\u0002\u0002\u0002\u0104\u00e7",
    "\u0003\u0002\u0002\u0002\u0104\u00ef\u0003\u0002\u0002\u0002\u0104\u00f0",
    "\u0003\u0002\u0002\u0002\u0104\u00fc\u0003\u0002\u0002\u0002\u0104\u00fe",
    "\u0003\u0002\u0002\u0002\u0104\u00ff\u0003\u0002\u0002\u0002\u0104\u0100",
    "\u0003\u0002\u0002\u0002\u0105\u011a\u0003\u0002\u0002\u0002\u0106\u0107",
    "\f\u001a\u0002\u0002\u0107\u0108\u0007&\u0002\u0002\u0108\u0119\u0005",
    "\u0018\r\u001a\u0109\u010a\f\f\u0002\u0002\u010a\u010b\u0007\u000f\u0002",
    "\u0002\u010b\u0119\u0005\u0018\r\r\u010c\u010d\f\n\u0002\u0002\u010d",
    "\u010e\u0007$\u0002\u0002\u010e\u0119\u0005\u0018\r\u000b\u010f\u0110",
    "\f\t\u0002\u0002\u0110\u0111\u0007%\u0002\u0002\u0111\u0119\u0005\u0018",
    "\r\n\u0112\u0113\f\u0019\u0002\u0002\u0113\u0114\u0007&\u0002\u0002",
    "\u0114\u0115\u0007\u0005\u0002\u0002\u0115\u0116\u0005\u0018\r\u0002",
    "\u0116\u0117\u0007\u0006\u0002\u0002\u0117\u0119\u0003\u0002\u0002\u0002",
    "\u0118\u0106\u0003\u0002\u0002\u0002\u0118\u0109\u0003\u0002\u0002\u0002",
    "\u0118\u010c\u0003\u0002\u0002\u0002\u0118\u010f\u0003\u0002\u0002\u0002",
    "\u0118\u0112\u0003\u0002\u0002\u0002\u0119\u011c\u0003\u0002\u0002\u0002",
    "\u011a\u0118\u0003\u0002\u0002\u0002\u011a\u011b\u0003\u0002\u0002\u0002",
    "\u011b\u0019\u0003\u0002\u0002\u0002\u011c\u011a\u0003\u0002\u0002\u0002",
    "\u011d\u011e\u0007\u0003\u0002\u0002\u011e\u011f\u0005\u001e\u0010\u0002",
    "\u011f\u0120\u00072\u0002\u0002\u0120\u001b\u0003\u0002\u0002\u0002",
    "\u0121\u0122\u00073\u0002\u0002\u0122\u0123\u0007:\u0002\u0002\u0123",
    "\u0124\t\u0005\u0002\u0002\u0124\u0125\u0007;\u0002\u0002\u0125\u0126",
    "\u0007:\u0002\u0002\u0126\u0127\u0007=\u0002\u0002\u0127\u0128\u0007",
    ";\u0002\u0002\u0128\u001d\u0003\u0002\u0002\u0002\u0129\u012a\b\u0010",
    "\u0001\u0002\u012a\u012b\u00075\u0002\u0002\u012b\u012c\u0007:\u0002",
    "\u0002\u012c\u012d\u0005\u0018\r\u0002\u012d\u012e\u0007;\u0002\u0002",
    "\u012e\u0140\u0003\u0002\u0002\u0002\u012f\u0130\u00073\u0002\u0002",
    "\u0130\u0133\u0007:\u0002\u0002\u0131\u0134\u0005\u001e\u0010\u0002",
    "\u0132\u0134\u0007<\u0002\u0002\u0133\u0131\u0003\u0002\u0002\u0002",
    "\u0133\u0132\u0003\u0002\u0002\u0002\u0134\u0135\u0003\u0002\u0002\u0002",
    "\u0135\u0136\u0007;\u0002\u0002\u0136\u0137\u0007:\u0002\u0002\u0137",
    "\u0138\u0005\u001e\u0010\u0002\u0138\u0139\u0007;\u0002\u0002\u0139",
    "\u0140\u0003\u0002\u0002\u0002\u013a\u0140\u00077\u0002\u0002\u013b",
    "\u013c\u00078\u0002\u0002\u013c\u013d\u0005\u001e\u0010\u0002\u013d",
    "\u013e\u00079\u0002\u0002\u013e\u0140\u0003\u0002\u0002\u0002\u013f",
    "\u0129\u0003\u0002\u0002\u0002\u013f\u012f\u0003\u0002\u0002\u0002\u013f",
    "\u013a\u0003\u0002\u0002\u0002\u013f\u013b\u0003\u0002\u0002\u0002\u0140",
    "\u0157\u0003\u0002\u0002\u0002\u0141\u0142\f\u0006\u0002\u0002\u0142",
    "\u0143\u00074\u0002\u0002\u0143\u0156\u0005\u001e\u0010\u0007\u0144",
    "\u0145\f\u000b\u0002\u0002\u0145\u0146\u00076\u0002\u0002\u0146\u0156",
    "\u0007=\u0002\u0002\u0147\u0148\f\n\u0002\u0002\u0148\u0149\u00076\u0002",
    "\u0002\u0149\u014a\u0007:\u0002\u0002\u014a\u014b\u0007=\u0002\u0002",
    "\u014b\u0156\u0007;\u0002\u0002\u014c\u014d\f\t\u0002\u0002\u014d\u014e",
    "\u00076\u0002\u0002\u014e\u0156\u0005\u001c\u000f\u0002\u014f\u0150",
    "\f\b\u0002\u0002\u0150\u0151\u00076\u0002\u0002\u0151\u0152\u0007:\u0002",
    "\u0002\u0152\u0153\u0005\u001c\u000f\u0002\u0153\u0154\u0007;\u0002",
    "\u0002\u0154\u0156\u0003\u0002\u0002\u0002\u0155\u0141\u0003\u0002\u0002",
    "\u0002\u0155\u0144\u0003\u0002\u0002\u0002\u0155\u0147\u0003\u0002\u0002",
    "\u0002\u0155\u014c\u0003\u0002\u0002\u0002\u0155\u014f\u0003\u0002\u0002",
    "\u0002\u0156\u0159\u0003\u0002\u0002\u0002\u0157\u0155\u0003\u0002\u0002",
    "\u0002\u0157\u0158\u0003\u0002\u0002\u0002\u0158\u001f\u0003\u0002\u0002",
    "\u0002\u0159\u0157\u0003\u0002\u0002\u0002\u0015%07Kcq{\u008d\u009b",
    "\u00b3\u00c5\u00f7\u0104\u0118\u011a\u0133\u013f\u0155\u0157"].join("");


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
    static ruleNames = [ "id", "statement", "assign", "query", "equality", 
                         "trig_function", "indefinite_integral_cmd", "integral_cmd", 
                         "derivative_cmd", "n_derivative_cmd", "argument", 
                         "expr", "u_block", "u_fraction", "u_expr" ];

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
    	case 11:
    	    		return this.expr_sempred(localctx, predIndex);
    	case 14:
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
	        this.state = 30;
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



	statement() {
	    let localctx = new StatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, LatexParser.RULE_statement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 35;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 32;
	            this.assign();
	            break;

	        case 2:
	            this.state = 33;
	            this.query();
	            break;

	        case 3:
	            this.state = 34;
	            this.equality();
	            break;

	        }
	        this.state = 37;
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
	    this.enterRule(localctx, 4, LatexParser.RULE_assign);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 39;
	        this.id();
	        this.state = 40;
	        this.match(LatexParser.EQ);
	        this.state = 41;
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
	    this.enterRule(localctx, 6, LatexParser.RULE_query);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 43;
	        this.expr(0);
	        this.state = 44;
	        this.match(LatexParser.EQ);
	        this.state = 46;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===LatexParser.L_BRACKET) {
	            this.state = 45;
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
	    this.enterRule(localctx, 8, LatexParser.RULE_equality);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 48;
	        this.expr(0);
	        this.state = 49;
	        this.match(LatexParser.EQ);
	        this.state = 50;
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
	    this.enterRule(localctx, 10, LatexParser.RULE_trig_function);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 53;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===LatexParser.BACK_SLASH) {
	            this.state = 52;
	            this.match(LatexParser.BACK_SLASH);
	        }

	        this.state = 55;
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
	    this.enterRule(localctx, 12, LatexParser.RULE_indefinite_integral_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 57;
	        this.match(LatexParser.CMD_INT);
	        this.state = 58;
	        this.match(LatexParser.UNDERSCORE);
	        this.state = 59;
	        this.match(LatexParser.L_BRACE);
	        this.state = 60;
	        this.match(LatexParser.R_BRACE);
	        this.state = 61;
	        this.match(LatexParser.CARET);
	        this.state = 62;
	        this.match(LatexParser.L_BRACE);
	        this.state = 63;
	        this.match(LatexParser.R_BRACE);
	        this.state = 64;
	        this.match(LatexParser.L_PAREN);
	        this.state = 65;
	        this.expr(0);
	        this.state = 66;
	        this.match(LatexParser.R_PAREN);
	        this.state = 73;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 67;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 68;
	            this.match(LatexParser.L_BRACE);
	            this.state = 69;
	            this.id();
	            this.state = 70;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 72;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 75;
	        this.match(LatexParser.L_PAREN);
	        this.state = 76;
	        this.id();
	        this.state = 77;
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
	    this.enterRule(localctx, 14, LatexParser.RULE_integral_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 79;
	        this.match(LatexParser.CMD_INT);
	        this.state = 80;
	        this.match(LatexParser.UNDERSCORE);
	        this.state = 81;
	        this.match(LatexParser.L_BRACE);
	        this.state = 82;
	        this.expr(0);
	        this.state = 83;
	        this.match(LatexParser.R_BRACE);
	        this.state = 84;
	        this.match(LatexParser.CARET);
	        this.state = 85;
	        this.match(LatexParser.L_BRACE);
	        this.state = 86;
	        this.expr(0);
	        this.state = 87;
	        this.match(LatexParser.R_BRACE);
	        this.state = 88;
	        this.match(LatexParser.L_PAREN);
	        this.state = 89;
	        this.expr(0);
	        this.state = 90;
	        this.match(LatexParser.R_PAREN);
	        this.state = 97;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 91;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 92;
	            this.match(LatexParser.L_BRACE);
	            this.state = 93;
	            this.id();
	            this.state = 94;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 96;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 99;
	        this.match(LatexParser.L_PAREN);
	        this.state = 100;
	        this.id();
	        this.state = 101;
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
	    this.enterRule(localctx, 16, LatexParser.RULE_derivative_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 103;
	        this.match(LatexParser.CMD_FRAC);
	        this.state = 104;
	        this.match(LatexParser.L_BRACE);
	        this.state = 111;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 105;
	            localctx.MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 106;
	            this.match(LatexParser.L_BRACE);
	            this.state = 107;
	            this.id();
	            this.state = 108;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 110;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 113;
	        this.match(LatexParser.R_BRACE);
	        this.state = 114;
	        this.match(LatexParser.L_BRACE);
	        this.state = 121;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 115;
	            localctx.MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 116;
	            this.match(LatexParser.L_BRACE);
	            this.state = 117;
	            this.id();
	            this.state = 118;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 120;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 123;
	        this.match(LatexParser.L_PAREN);
	        this.state = 124;
	        this.id();
	        this.state = 125;
	        this.match(LatexParser.R_PAREN);
	        this.state = 126;
	        this.match(LatexParser.R_BRACE);
	        this.state = 127;
	        this.match(LatexParser.L_PAREN);
	        this.state = 128;
	        this.expr(0);
	        this.state = 129;
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
	    this.enterRule(localctx, 18, LatexParser.RULE_n_derivative_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 131;
	        this.match(LatexParser.CMD_FRAC);
	        this.state = 132;
	        this.match(LatexParser.L_BRACE);
	        this.state = 139;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 133;
	            localctx.MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 134;
	            this.match(LatexParser.L_BRACE);
	            this.state = 135;
	            this.id();
	            this.state = 136;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 138;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 141;
	        this.match(LatexParser.CARET);
	        this.state = 142;
	        this.match(LatexParser.L_BRACE);
	        this.state = 143;
	        this.match(LatexParser.NUMBER);
	        this.state = 144;
	        this.match(LatexParser.R_BRACE);
	        this.state = 145;
	        this.match(LatexParser.R_BRACE);
	        this.state = 146;
	        this.match(LatexParser.L_BRACE);
	        this.state = 153;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.CMD_MATHRM:
	            this.state = 147;
	            localctx.MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 148;
	            this.match(LatexParser.L_BRACE);
	            this.state = 149;
	            this.id();
	            this.state = 150;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case LatexParser.ID:
	            this.state = 152;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 155;
	        this.match(LatexParser.L_PAREN);
	        this.state = 156;
	        this.id();
	        this.state = 157;
	        this.match(LatexParser.R_PAREN);
	        this.state = 158;
	        this.match(LatexParser.CARET);
	        this.state = 159;
	        this.match(LatexParser.L_BRACE);
	        this.state = 160;
	        this.match(LatexParser.NUMBER);
	        this.state = 161;
	        this.match(LatexParser.R_BRACE);
	        this.state = 162;
	        this.match(LatexParser.R_BRACE);
	        this.state = 163;
	        this.match(LatexParser.L_PAREN);
	        this.state = 164;
	        this.expr(0);
	        this.state = 165;
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
	    this.enterRule(localctx, 20, LatexParser.RULE_argument);
	    var _la = 0; // Token type
	    try {
	        this.state = 177;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 167;
	            this.id();
	            this.state = 168;
	            this.match(LatexParser.EQ);
	            this.state = 169;
	            this.expr(0);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 171;
	            this.expr(0);
	            this.state = 172;
	            localctx.lower = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===LatexParser.LT || _la===LatexParser.LTE)) {
	                localctx.lower = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 173;
	            this.id();
	            this.state = 174;
	            localctx.upper = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===LatexParser.LT || _la===LatexParser.LTE)) {
	                localctx.upper = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 175;
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
	    const _startState = 22;
	    this.enterRecursionRule(localctx, 22, LatexParser.RULE_expr, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 258;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new SqrtContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 180;
	            this.match(LatexParser.CMD_SQRT);
	            this.state = 181;
	            this.match(LatexParser.L_BRACE);
	            this.state = 182;
	            this.expr(0);
	            this.state = 183;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 2:
	            localctx = new TrigContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 185;
	            this.trig_function();
	            this.state = 186;
	            this.match(LatexParser.L_PAREN);
	            this.state = 187;
	            this.expr(0);
	            this.state = 188;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 3:
	            localctx = new IndefiniteIntegralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 190;
	            this.indefinite_integral_cmd();
	            break;

	        case 4:
	            localctx = new IntegralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 191;
	            this.integral_cmd();
	            break;

	        case 5:
	            localctx = new DerivativeContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 192;
	            this.derivative_cmd();
	            break;

	        case 6:
	            localctx = new NDerivativeContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 193;
	            this.n_derivative_cmd();
	            break;

	        case 7:
	            localctx = new LnContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 195;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===LatexParser.BACK_SLASH) {
	                this.state = 194;
	                this.match(LatexParser.BACK_SLASH);
	            }

	            this.state = 197;
	            this.match(LatexParser.CMD_LN);
	            this.state = 198;
	            this.match(LatexParser.L_PAREN);
	            this.state = 199;
	            this.expr(0);
	            this.state = 200;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 8:
	            localctx = new LogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 202;
	            _la = this._input.LA(1);
	            if(!(_la===LatexParser.CMD_LOG || _la===LatexParser.CMD_LOG_WITH_SLASH)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 203;
	            this.match(LatexParser.L_PAREN);
	            this.state = 204;
	            this.expr(0);
	            this.state = 205;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 9:
	            localctx = new BaseLogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 207;
	            this.match(LatexParser.CMD_LOG_WITH_SLASH);
	            this.state = 208;
	            this.match(LatexParser.UNDERSCORE);
	            this.state = 209;
	            this.match(LatexParser.L_BRACE);
	            this.state = 210;
	            this.expr(0);
	            this.state = 211;
	            this.match(LatexParser.R_BRACE);
	            this.state = 212;
	            this.match(LatexParser.L_PAREN);
	            this.state = 213;
	            this.expr(0);
	            this.state = 214;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 10:
	            localctx = new BaseLogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 216;
	            this.match(LatexParser.CMD_LOG_WITH_SLASH);
	            this.state = 217;
	            this.match(LatexParser.UNDERSCORE);
	            this.state = 218;
	            this.expr(0);
	            this.state = 219;
	            this.match(LatexParser.L_PAREN);
	            this.state = 220;
	            this.expr(0);
	            this.state = 221;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 11:
	            localctx = new AbsContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 223;
	            this.match(LatexParser.VBAR);
	            this.state = 224;
	            this.expr(0);
	            this.state = 225;
	            this.match(LatexParser.VBAR);
	            break;

	        case 12:
	            localctx = new UnaryMinusContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 227;
	            this.match(LatexParser.SUB);
	            this.state = 228;
	            this.expr(11);
	            break;

	        case 13:
	            localctx = new DivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 229;
	            this.match(LatexParser.CMD_FRAC);
	            this.state = 230;
	            this.match(LatexParser.L_BRACE);
	            this.state = 231;
	            this.expr(0);
	            this.state = 232;
	            this.match(LatexParser.R_BRACE);
	            this.state = 233;
	            this.match(LatexParser.L_BRACE);
	            this.state = 234;
	            this.expr(0);
	            this.state = 235;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 14:
	            localctx = new VariableContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 237;
	            this.id();
	            break;

	        case 15:
	            localctx = new FunctionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 238;
	            this.id();
	            this.state = 239;
	            this.match(LatexParser.L_PAREN);

	            this.state = 240;
	            this.argument();
	            this.state = 245;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===LatexParser.COMMA) {
	                this.state = 241;
	                this.match(LatexParser.COMMA);
	                this.state = 242;
	                this.argument();
	                this.state = 247;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 248;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 16:
	            localctx = new NumberWithUnitsContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 250;
	            this.match(LatexParser.NUMBER);
	            this.state = 251;
	            this.u_block();
	            break;

	        case 17:
	            localctx = new NumberContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 252;
	            this.match(LatexParser.NUMBER);
	            break;

	        case 18:
	            localctx = new PiExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 253;
	            this.match(LatexParser.PI);
	            break;

	        case 19:
	            localctx = new SubExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 254;
	            this.match(LatexParser.L_PAREN);
	            this.state = 255;
	            this.expr(0);
	            this.state = 256;
	            this.match(LatexParser.R_PAREN);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 280;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,14,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 278;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 260;
	                    if (!( this.precpred(this._ctx, 24))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 24)");
	                    }
	                    this.state = 261;
	                    this.match(LatexParser.CARET);
	                    this.state = 262;
	                    this.expr(24);
	                    break;

	                case 2:
	                    localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 263;
	                    if (!( this.precpred(this._ctx, 10))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
	                    }
	                    this.state = 264;
	                    this.match(LatexParser.CMD_CDOT);
	                    this.state = 265;
	                    this.expr(11);
	                    break;

	                case 3:
	                    localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 266;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 267;
	                    this.match(LatexParser.ADD);
	                    this.state = 268;
	                    this.expr(9);
	                    break;

	                case 4:
	                    localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 269;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 270;
	                    this.match(LatexParser.SUB);
	                    this.state = 271;
	                    this.expr(8);
	                    break;

	                case 5:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 272;
	                    if (!( this.precpred(this._ctx, 23))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 23)");
	                    }
	                    this.state = 273;
	                    this.match(LatexParser.CARET);
	                    this.state = 274;
	                    this.match(LatexParser.L_BRACE);
	                    this.state = 275;
	                    this.expr(0);
	                    this.state = 276;
	                    this.match(LatexParser.R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 282;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,14,this._ctx);
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
	    this.enterRule(localctx, 24, LatexParser.RULE_u_block);
	    try {
	        localctx = new UnitBlockContext(this, localctx);
	        this.enterOuterAlt(localctx, 1);
	        this.state = 283;
	        this.match(LatexParser.L_BRACKET);
	        this.state = 284;
	        this.u_expr(0);
	        this.state = 285;
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
	    this.enterRule(localctx, 26, LatexParser.RULE_u_fraction);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 287;
	        this.match(LatexParser.U_CMD_FRAC);
	        this.state = 288;
	        this.match(LatexParser.U_L_BRACE);
	        this.state = 289;
	        _la = this._input.LA(1);
	        if(!(_la===LatexParser.U_ONE || _la===LatexParser.U_NUMBER)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 290;
	        this.match(LatexParser.U_R_BRACE);
	        this.state = 291;
	        this.match(LatexParser.U_L_BRACE);
	        this.state = 292;
	        this.match(LatexParser.U_NUMBER);
	        this.state = 293;
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
	    const _startState = 28;
	    this.enterRecursionRule(localctx, 28, LatexParser.RULE_u_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 317;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case LatexParser.U_CMD_SQRT:
	            localctx = new UnitSqrtContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 296;
	            this.match(LatexParser.U_CMD_SQRT);
	            this.state = 297;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 298;
	            this.expr(0);
	            this.state = 299;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case LatexParser.U_CMD_FRAC:
	            localctx = new UnitDivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 301;
	            this.match(LatexParser.U_CMD_FRAC);
	            this.state = 302;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 305;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case LatexParser.U_CMD_FRAC:
	            case LatexParser.U_CMD_SQRT:
	            case LatexParser.U_NAME:
	            case LatexParser.U_L_PAREN:
	                this.state = 303;
	                this.u_expr(0);
	                break;
	            case LatexParser.U_ONE:
	                this.state = 304;
	                this.match(LatexParser.U_ONE);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 307;
	            this.match(LatexParser.U_R_BRACE);
	            this.state = 308;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 309;
	            this.u_expr(0);
	            this.state = 310;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case LatexParser.U_NAME:
	            localctx = new UnitNameContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 312;
	            this.match(LatexParser.U_NAME);
	            break;
	        case LatexParser.U_L_PAREN:
	            localctx = new UnitSubExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 313;
	            this.match(LatexParser.U_L_PAREN);
	            this.state = 314;
	            this.u_expr(0);
	            this.state = 315;
	            this.match(LatexParser.U_R_PAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 341;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 339;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 319;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 320;
	                    this.match(LatexParser.U_CMD_CDOT);
	                    this.state = 321;
	                    this.u_expr(5);
	                    break;

	                case 2:
	                    localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 322;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 323;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 324;
	                    this.match(LatexParser.U_NUMBER);
	                    break;

	                case 3:
	                    localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 325;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 326;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 327;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 328;
	                    this.match(LatexParser.U_NUMBER);
	                    this.state = 329;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                case 4:
	                    localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 330;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 331;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 332;
	                    this.u_fraction();
	                    break;

	                case 5:
	                    localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 333;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 334;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 335;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 336;
	                    this.u_fraction();
	                    this.state = 337;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 343;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
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
LatexParser.RULE_statement = 1;
LatexParser.RULE_assign = 2;
LatexParser.RULE_query = 3;
LatexParser.RULE_equality = 4;
LatexParser.RULE_trig_function = 5;
LatexParser.RULE_indefinite_integral_cmd = 6;
LatexParser.RULE_integral_cmd = 7;
LatexParser.RULE_derivative_cmd = 8;
LatexParser.RULE_n_derivative_cmd = 9;
LatexParser.RULE_argument = 10;
LatexParser.RULE_expr = 11;
LatexParser.RULE_u_block = 12;
LatexParser.RULE_u_fraction = 13;
LatexParser.RULE_u_expr = 14;

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

	id() {
	    return this.getTypedRuleContext(IdContext,0);
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
