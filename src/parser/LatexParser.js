// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 from 'antlr4';
import LatexParserListener from './LatexParserListener.js';
import LatexParserVisitor from './LatexParserVisitor.js';

const serializedATN = [4,1,66,464,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,1,0,1,0,1,1,3,1,54,8,1,1,
1,1,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,72,8,3,
1,3,1,3,1,4,1,4,3,4,78,8,4,1,4,1,4,1,4,1,5,1,5,1,5,3,5,86,8,5,1,6,1,6,1,
6,1,6,1,7,1,7,3,7,94,8,7,1,7,1,7,1,7,1,7,1,7,1,7,5,7,102,8,7,10,7,12,7,105,
9,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,1,9,3,9,116,8,9,1,9,1,9,1,10,1,10,1,
10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,
136,8,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,
1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,3,11,160,8,11,1,11,1,11,1,11,
1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,3,12,174,8,12,1,12,1,12,1,12,
1,12,1,12,1,12,1,12,1,12,3,12,184,8,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,202,8,13,1,13,1,13,1,13,
1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,216,8,13,1,13,1,13,1,13,
1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,
14,1,14,1,14,1,14,1,14,3,14,240,8,14,1,15,1,15,3,15,244,8,15,1,16,1,16,1,
16,4,16,249,8,16,11,16,12,16,250,1,17,1,17,1,17,1,17,3,17,257,8,17,1,18,
1,18,1,18,4,18,262,8,18,11,18,12,18,263,1,19,1,19,1,19,1,19,1,20,1,20,1,
20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
1,21,1,21,1,21,1,21,1,21,3,21,292,8,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,
1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,5,21,342,8,21,
10,21,12,21,345,9,21,1,21,1,21,1,21,1,21,1,21,3,21,352,8,21,1,21,1,21,1,
21,1,21,1,21,1,21,3,21,360,8,21,1,21,1,21,1,21,1,21,5,21,366,8,21,10,21,
12,21,369,9,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,378,8,21,1,21,1,21,
1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,
21,1,21,5,21,398,8,21,10,21,12,21,401,9,21,1,22,1,22,1,22,1,22,1,23,1,23,
1,23,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
24,1,24,3,24,425,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
3,24,437,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,459,8,24,10,24,12,24,462,9,
24,1,24,0,2,42,48,25,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,
38,40,42,44,46,48,0,6,1,0,18,30,2,0,40,40,42,42,1,0,15,16,1,0,40,43,1,0,
32,33,1,0,60,61,504,0,50,1,0,0,0,2,53,1,0,0,0,4,57,1,0,0,0,6,71,1,0,0,0,
8,77,1,0,0,0,10,82,1,0,0,0,12,87,1,0,0,0,14,93,1,0,0,0,16,108,1,0,0,0,18,
115,1,0,0,0,20,119,1,0,0,0,22,141,1,0,0,0,24,165,1,0,0,0,26,193,1,0,0,0,
28,239,1,0,0,0,30,243,1,0,0,0,32,245,1,0,0,0,34,252,1,0,0,0,36,258,1,0,0,
0,38,265,1,0,0,0,40,269,1,0,0,0,42,377,1,0,0,0,44,402,1,0,0,0,46,406,1,0,
0,0,48,436,1,0,0,0,50,51,5,46,0,0,51,1,1,0,0,0,52,54,5,37,0,0,53,52,1,0,
0,0,53,54,1,0,0,0,54,55,1,0,0,0,55,56,5,45,0,0,56,3,1,0,0,0,57,58,3,2,1,
0,58,59,3,44,22,0,59,5,1,0,0,0,60,72,3,8,4,0,61,72,3,10,5,0,62,72,3,12,6,
0,63,72,3,44,22,0,64,72,3,2,1,0,65,72,3,0,0,0,66,72,3,32,16,0,67,72,3,36,
18,0,68,72,3,42,21,0,69,72,3,30,15,0,70,72,3,14,7,0,71,60,1,0,0,0,71,61,
1,0,0,0,71,62,1,0,0,0,71,63,1,0,0,0,71,64,1,0,0,0,71,65,1,0,0,0,71,66,1,
0,0,0,71,67,1,0,0,0,71,68,1,0,0,0,71,69,1,0,0,0,71,70,1,0,0,0,71,72,1,0,
0,0,72,73,1,0,0,0,73,74,5,0,0,1,74,7,1,0,0,0,75,78,3,0,0,0,76,78,5,9,0,0,
77,75,1,0,0,0,77,76,1,0,0,0,78,79,1,0,0,0,79,80,5,39,0,0,80,81,3,42,21,0,
81,9,1,0,0,0,82,83,3,42,21,0,83,85,5,39,0,0,84,86,3,44,22,0,85,84,1,0,0,
0,85,86,1,0,0,0,86,11,1,0,0,0,87,88,3,42,21,0,88,89,5,39,0,0,89,90,3,42,
21,0,90,13,1,0,0,0,91,94,3,0,0,0,92,94,5,9,0,0,93,91,1,0,0,0,93,92,1,0,0,
0,94,95,1,0,0,0,95,96,5,39,0,0,96,97,3,0,0,0,97,98,5,5,0,0,98,103,3,16,8,
0,99,100,5,44,0,0,100,102,3,16,8,0,101,99,1,0,0,0,102,105,1,0,0,0,103,101,
1,0,0,0,103,104,1,0,0,0,104,106,1,0,0,0,105,103,1,0,0,0,106,107,5,6,0,0,
107,15,1,0,0,0,108,109,5,5,0,0,109,110,3,42,21,0,110,111,5,44,0,0,111,112,
3,30,15,0,112,113,5,6,0,0,113,17,1,0,0,0,114,116,5,17,0,0,115,114,1,0,0,
0,115,116,1,0,0,0,116,117,1,0,0,0,117,118,7,0,0,0,118,19,1,0,0,0,119,120,
5,10,0,0,120,121,5,8,0,0,121,122,5,3,0,0,122,123,5,4,0,0,123,124,5,38,0,
0,124,125,5,3,0,0,125,126,5,4,0,0,126,127,5,5,0,0,127,128,3,42,21,0,128,
135,5,6,0,0,129,130,5,11,0,0,130,131,5,3,0,0,131,132,3,0,0,0,132,133,5,4,
0,0,133,136,1,0,0,0,134,136,3,0,0,0,135,129,1,0,0,0,135,134,1,0,0,0,136,
137,1,0,0,0,137,138,5,5,0,0,138,139,3,0,0,0,139,140,5,6,0,0,140,21,1,0,0,
0,141,142,5,10,0,0,142,143,5,8,0,0,143,144,5,3,0,0,144,145,3,42,21,0,145,
146,5,4,0,0,146,147,5,38,0,0,147,148,5,3,0,0,148,149,3,42,21,0,149,150,5,
4,0,0,150,151,5,5,0,0,151,152,3,42,21,0,152,159,5,6,0,0,153,154,5,11,0,0,
154,155,5,3,0,0,155,156,3,0,0,0,156,157,5,4,0,0,157,160,1,0,0,0,158,160,
3,0,0,0,159,153,1,0,0,0,159,158,1,0,0,0,160,161,1,0,0,0,161,162,5,5,0,0,
162,163,3,0,0,0,163,164,5,6,0,0,164,23,1,0,0,0,165,166,5,12,0,0,166,173,
5,3,0,0,167,168,5,11,0,0,168,169,5,3,0,0,169,170,3,0,0,0,170,171,5,4,0,0,
171,174,1,0,0,0,172,174,3,0,0,0,173,167,1,0,0,0,173,172,1,0,0,0,174,175,
1,0,0,0,175,176,5,4,0,0,176,183,5,3,0,0,177,178,5,11,0,0,178,179,5,3,0,0,
179,180,3,0,0,0,180,181,5,4,0,0,181,184,1,0,0,0,182,184,3,0,0,0,183,177,
1,0,0,0,183,182,1,0,0,0,184,185,1,0,0,0,185,186,5,5,0,0,186,187,3,0,0,0,
187,188,5,6,0,0,188,189,5,4,0,0,189,190,5,5,0,0,190,191,3,42,21,0,191,192,
5,6,0,0,192,25,1,0,0,0,193,194,5,12,0,0,194,201,5,3,0,0,195,196,5,11,0,0,
196,197,5,3,0,0,197,198,3,0,0,0,198,199,5,4,0,0,199,202,1,0,0,0,200,202,
3,0,0,0,201,195,1,0,0,0,201,200,1,0,0,0,202,203,1,0,0,0,203,204,5,38,0,0,
204,205,5,3,0,0,205,206,3,2,1,0,206,207,5,4,0,0,207,208,5,4,0,0,208,215,
5,3,0,0,209,210,5,11,0,0,210,211,5,3,0,0,211,212,3,0,0,0,212,213,5,4,0,0,
213,216,1,0,0,0,214,216,3,0,0,0,215,209,1,0,0,0,215,214,1,0,0,0,216,217,
1,0,0,0,217,218,5,5,0,0,218,219,3,0,0,0,219,220,5,6,0,0,220,221,5,38,0,0,
221,222,5,3,0,0,222,223,3,2,1,0,223,224,5,4,0,0,224,225,5,4,0,0,225,226,
5,5,0,0,226,227,3,42,21,0,227,228,5,6,0,0,228,27,1,0,0,0,229,230,3,0,0,0,
230,231,5,39,0,0,231,232,3,42,21,0,232,240,1,0,0,0,233,234,3,42,21,0,234,
235,7,1,0,0,235,236,3,0,0,0,236,237,7,1,0,0,237,238,3,42,21,0,238,240,1,
0,0,0,239,229,1,0,0,0,239,233,1,0,0,0,240,29,1,0,0,0,241,244,3,38,19,0,242,
244,3,40,20,0,243,241,1,0,0,0,243,242,1,0,0,0,244,31,1,0,0,0,245,248,3,0,
0,0,246,247,5,44,0,0,247,249,3,0,0,0,248,246,1,0,0,0,249,250,1,0,0,0,250,
248,1,0,0,0,250,251,1,0,0,0,251,33,1,0,0,0,252,253,3,0,0,0,253,256,7,2,0,
0,254,257,3,2,1,0,255,257,3,4,2,0,256,254,1,0,0,0,256,255,1,0,0,0,257,35,
1,0,0,0,258,261,3,34,17,0,259,260,5,44,0,0,260,262,3,34,17,0,261,259,1,0,
0,0,262,263,1,0,0,0,263,261,1,0,0,0,263,264,1,0,0,0,264,37,1,0,0,0,265,266,
3,42,21,0,266,267,7,3,0,0,267,268,3,42,21,0,268,39,1,0,0,0,269,270,3,42,
21,0,270,271,7,3,0,0,271,272,3,42,21,0,272,273,7,3,0,0,273,274,3,42,21,0,
274,41,1,0,0,0,275,276,6,21,-1,0,276,277,5,14,0,0,277,278,5,3,0,0,278,279,
3,42,21,0,279,280,5,4,0,0,280,378,1,0,0,0,281,282,3,18,9,0,282,283,5,5,0,
0,283,284,3,42,21,0,284,285,5,6,0,0,285,378,1,0,0,0,286,378,3,20,10,0,287,
378,3,22,11,0,288,378,3,24,12,0,289,378,3,26,13,0,290,292,5,17,0,0,291,290,
1,0,0,0,291,292,1,0,0,0,292,293,1,0,0,0,293,294,5,31,0,0,294,295,5,5,0,0,
295,296,3,42,21,0,296,297,5,6,0,0,297,378,1,0,0,0,298,299,7,4,0,0,299,300,
5,5,0,0,300,301,3,42,21,0,301,302,5,6,0,0,302,378,1,0,0,0,303,304,5,33,0,
0,304,305,5,8,0,0,305,306,5,3,0,0,306,307,3,42,21,0,307,308,5,4,0,0,308,
309,5,5,0,0,309,310,3,42,21,0,310,311,5,6,0,0,311,378,1,0,0,0,312,313,5,
33,0,0,313,314,5,8,0,0,314,315,3,42,21,0,315,316,5,5,0,0,316,317,3,42,21,
0,317,318,5,6,0,0,318,378,1,0,0,0,319,320,5,7,0,0,320,321,3,42,21,0,321,
322,5,7,0,0,322,378,1,0,0,0,323,378,3,4,2,0,324,378,3,2,1,0,325,326,5,37,
0,0,326,378,3,42,21,10,327,328,5,12,0,0,328,329,5,3,0,0,329,330,3,42,21,
0,330,331,5,4,0,0,331,332,5,3,0,0,332,333,3,42,21,0,333,334,5,4,0,0,334,
378,1,0,0,0,335,378,3,0,0,0,336,337,3,0,0,0,337,338,5,5,0,0,338,343,3,28,
14,0,339,340,5,44,0,0,340,342,3,28,14,0,341,339,1,0,0,0,342,345,1,0,0,0,
343,341,1,0,0,0,343,344,1,0,0,0,344,346,1,0,0,0,345,343,1,0,0,0,346,351,
5,6,0,0,347,348,5,46,0,0,348,349,3,2,1,0,349,350,5,46,0,0,350,352,1,0,0,
0,351,347,1,0,0,0,351,352,1,0,0,0,352,378,1,0,0,0,353,354,5,11,0,0,354,355,
5,3,0,0,355,356,3,0,0,0,356,357,5,4,0,0,357,360,1,0,0,0,358,360,3,0,0,0,
359,353,1,0,0,0,359,358,1,0,0,0,360,361,1,0,0,0,361,362,5,5,0,0,362,367,
3,42,21,0,363,364,5,44,0,0,364,366,3,42,21,0,365,363,1,0,0,0,366,369,1,0,
0,0,367,365,1,0,0,0,367,368,1,0,0,0,368,370,1,0,0,0,369,367,1,0,0,0,370,
371,5,6,0,0,371,378,1,0,0,0,372,378,5,9,0,0,373,374,5,5,0,0,374,375,3,42,
21,0,375,376,5,6,0,0,376,378,1,0,0,0,377,275,1,0,0,0,377,281,1,0,0,0,377,
286,1,0,0,0,377,287,1,0,0,0,377,288,1,0,0,0,377,289,1,0,0,0,377,291,1,0,
0,0,377,298,1,0,0,0,377,303,1,0,0,0,377,312,1,0,0,0,377,319,1,0,0,0,377,
323,1,0,0,0,377,324,1,0,0,0,377,325,1,0,0,0,377,327,1,0,0,0,377,335,1,0,
0,0,377,336,1,0,0,0,377,359,1,0,0,0,377,372,1,0,0,0,377,373,1,0,0,0,378,
399,1,0,0,0,379,380,10,25,0,0,380,381,5,38,0,0,381,398,3,42,21,25,382,383,
10,9,0,0,383,384,5,13,0,0,384,398,3,42,21,10,385,386,10,7,0,0,386,387,5,
36,0,0,387,398,3,42,21,8,388,389,10,6,0,0,389,390,5,37,0,0,390,398,3,42,
21,7,391,392,10,24,0,0,392,393,5,38,0,0,393,394,5,3,0,0,394,395,3,42,21,
0,395,396,5,4,0,0,396,398,1,0,0,0,397,379,1,0,0,0,397,382,1,0,0,0,397,385,
1,0,0,0,397,388,1,0,0,0,397,391,1,0,0,0,398,401,1,0,0,0,399,397,1,0,0,0,
399,400,1,0,0,0,400,43,1,0,0,0,401,399,1,0,0,0,402,403,5,1,0,0,403,404,3,
48,24,0,404,405,5,50,0,0,405,45,1,0,0,0,406,407,5,51,0,0,407,408,5,58,0,
0,408,409,7,5,0,0,409,410,5,59,0,0,410,411,5,58,0,0,411,412,5,61,0,0,412,
413,5,59,0,0,413,47,1,0,0,0,414,415,6,24,-1,0,415,416,5,53,0,0,416,417,5,
58,0,0,417,418,3,42,21,0,418,419,5,59,0,0,419,437,1,0,0,0,420,421,5,51,0,
0,421,424,5,58,0,0,422,425,3,48,24,0,423,425,5,60,0,0,424,422,1,0,0,0,424,
423,1,0,0,0,425,426,1,0,0,0,426,427,5,59,0,0,427,428,5,58,0,0,428,429,3,
48,24,0,429,430,5,59,0,0,430,437,1,0,0,0,431,437,5,55,0,0,432,433,5,56,0,
0,433,434,3,48,24,0,434,435,5,57,0,0,435,437,1,0,0,0,436,414,1,0,0,0,436,
420,1,0,0,0,436,431,1,0,0,0,436,432,1,0,0,0,437,460,1,0,0,0,438,439,10,4,
0,0,439,440,5,52,0,0,440,459,3,48,24,5,441,442,10,9,0,0,442,443,5,54,0,0,
443,459,5,61,0,0,444,445,10,8,0,0,445,446,5,54,0,0,446,447,5,58,0,0,447,
448,5,61,0,0,448,459,5,59,0,0,449,450,10,7,0,0,450,451,5,54,0,0,451,459,
3,46,23,0,452,453,10,6,0,0,453,454,5,54,0,0,454,455,5,58,0,0,455,456,3,46,
23,0,456,457,5,59,0,0,457,459,1,0,0,0,458,438,1,0,0,0,458,441,1,0,0,0,458,
444,1,0,0,0,458,449,1,0,0,0,458,452,1,0,0,0,459,462,1,0,0,0,460,458,1,0,
0,0,460,461,1,0,0,0,461,49,1,0,0,0,462,460,1,0,0,0,30,53,71,77,85,93,103,
115,135,159,173,183,201,215,239,243,250,256,263,291,343,351,359,367,377,
397,399,424,436,458,460];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class LatexParser extends antlr4.Parser {

    static grammarFileName = "java-escape";
    static literalNames = [ null, "'['", "';'", null, null, null, null, 
                            "'|'", "'_'", "'\\pi'", "'\\int'", "'\\mathrm'", 
                            null, null, null, "'\\sim'", "'\\approx'", "'\\'", 
                            "'sin'", "'cos'", "'tan'", "'cot'", "'sec'", 
                            "'csc'", "'arcsin'", "'arccos'", "'arctan'", 
                            "'sinh'", "'cosh'", "'tanh'", "'coth'", "'ln'", 
                            "'log'", "'\\log'", null, null, "'+'", "'-'", 
                            null, "'='", "'<'", "'>'", "'\\le'", "'\\ge'", 
                            "','", null, null, null, null, null, "']'", 
                            null, null, null, null, null, null, null, null, 
                            null, "'1'" ];
    static symbolicNames = [ null, "L_BRACKET", "SEMICOLON", "L_BRACE", 
                             "R_BRACE", "L_PAREN", "R_PAREN", "VBAR", "UNDERSCORE", 
                             "PI", "CMD_INT", "CMD_MATHRM", "CMD_FRAC", 
                             "CMD_CDOT", "CMD_SQRT", "CMD_SIM", "CMD_APPROX", 
                             "BACK_SLASH", "CMD_SIN", "CMD_COS", "CMD_TAN", 
                             "CMD_COT", "CMD_SEC", "CMD_CSC", "CMD_ARCSIN", 
                             "CMD_ARCCOS", "CMD_ARCTAN", "CMD_SINH", "CMD_COSH", 
                             "CMD_TANH", "CMD_COTH", "CMD_LN", "CMD_LOG", 
                             "CMD_LOG_WITH_SLASH", "CMD_LEFT", "CMD_RIGHT", 
                             "ADD", "SUB", "CARET", "EQ", "LT", "GT", "LTE", 
                             "GTE", "COMMA", "NUMBER", "ID", "WS", "SLASH_SPACE", 
                             "ERROR_CHAR", "R_BRACKET", "U_CMD_FRAC", "U_CMD_CDOT", 
                             "U_CMD_SQRT", "U_CARET", "U_NAME", "U_L_PAREN", 
                             "U_R_PAREN", "U_L_BRACE", "U_R_BRACE", "U_ONE", 
                             "U_NUMBER", "U_CMD_LEFT", "U_CMD_RIGHT", "U_WS", 
                             "U_SLASH_SPACE", "U_ERROR_CHAR" ];
    static ruleNames = [ "id", "number", "number_with_units", "statement", 
                         "assign", "query", "equality", "piecewise_assign", 
                         "piecewise_arg", "trig_function", "indefinite_integral_cmd", 
                         "integral_cmd", "derivative_cmd", "n_derivative_cmd", 
                         "argument", "condition", "id_list", "guess", "guess_list", 
                         "condition_single", "condition_chain", "expr", 
                         "u_block", "u_fraction", "u_expr" ];

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
    	case 21:
    	    		return this.expr_sempred(localctx, predIndex);
    	case 24:
    	    		return this.u_expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
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
	        this.state = 50;
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 53;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===37) {
	            this.state = 52;
	            this.match(LatexParser.SUB);
	        }

	        this.state = 55;
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



	number_with_units() {
	    let localctx = new Number_with_unitsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, LatexParser.RULE_number_with_units);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 57;
	        this.number();
	        this.state = 58;
	        this.u_block();
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
	    this.enterRule(localctx, 6, LatexParser.RULE_statement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 71;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	        if(la_===1) {
	            this.state = 60;
	            this.assign();

	        } else if(la_===2) {
	            this.state = 61;
	            this.query();

	        } else if(la_===3) {
	            this.state = 62;
	            this.equality();

	        } else if(la_===4) {
	            this.state = 63;
	            this.u_block();

	        } else if(la_===5) {
	            this.state = 64;
	            this.number();

	        } else if(la_===6) {
	            this.state = 65;
	            this.id();

	        } else if(la_===7) {
	            this.state = 66;
	            this.id_list();

	        } else if(la_===8) {
	            this.state = 67;
	            this.guess_list();

	        } else if(la_===9) {
	            this.state = 68;
	            this.expr(0);

	        } else if(la_===10) {
	            this.state = 69;
	            this.condition();

	        } else if(la_===11) {
	            this.state = 70;
	            this.piecewise_assign();

	        }
	        this.state = 73;
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
	    this.enterRule(localctx, 8, LatexParser.RULE_assign);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 77;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 46:
	            this.state = 75;
	            this.id();
	            break;
	        case 9:
	            this.state = 76;
	            this.match(LatexParser.PI);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 79;
	        this.match(LatexParser.EQ);
	        this.state = 80;
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
	    this.enterRule(localctx, 10, LatexParser.RULE_query);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 82;
	        this.expr(0);
	        this.state = 83;
	        this.match(LatexParser.EQ);
	        this.state = 85;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===1) {
	            this.state = 84;
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
	    this.enterRule(localctx, 12, LatexParser.RULE_equality);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 87;
	        this.expr(0);
	        this.state = 88;
	        this.match(LatexParser.EQ);
	        this.state = 89;
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



	piecewise_assign() {
	    let localctx = new Piecewise_assignContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, LatexParser.RULE_piecewise_assign);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 93;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 46:
	            this.state = 91;
	            this.id();
	            break;
	        case 9:
	            this.state = 92;
	            this.match(LatexParser.PI);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 95;
	        this.match(LatexParser.EQ);
	        this.state = 96;
	        this.id();
	        this.state = 97;
	        this.match(LatexParser.L_PAREN);

	        this.state = 98;
	        this.piecewise_arg();
	        this.state = 103;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===44) {
	            this.state = 99;
	            this.match(LatexParser.COMMA);
	            this.state = 100;
	            this.piecewise_arg();
	            this.state = 105;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 106;
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



	piecewise_arg() {
	    let localctx = new Piecewise_argContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, LatexParser.RULE_piecewise_arg);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 108;
	        this.match(LatexParser.L_PAREN);
	        this.state = 109;
	        this.expr(0);
	        this.state = 110;
	        this.match(LatexParser.COMMA);
	        this.state = 111;
	        this.condition();
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



	trig_function() {
	    let localctx = new Trig_functionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, LatexParser.RULE_trig_function);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 115;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===17) {
	            this.state = 114;
	            this.match(LatexParser.BACK_SLASH);
	        }

	        this.state = 117;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & 2147221504) !== 0))) {
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
	    this.enterRule(localctx, 20, LatexParser.RULE_indefinite_integral_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 119;
	        this.match(LatexParser.CMD_INT);
	        this.state = 120;
	        this.match(LatexParser.UNDERSCORE);
	        this.state = 121;
	        this.match(LatexParser.L_BRACE);
	        this.state = 122;
	        this.match(LatexParser.R_BRACE);
	        this.state = 123;
	        this.match(LatexParser.CARET);
	        this.state = 124;
	        this.match(LatexParser.L_BRACE);
	        this.state = 125;
	        this.match(LatexParser.R_BRACE);
	        this.state = 126;
	        this.match(LatexParser.L_PAREN);
	        this.state = 127;
	        this.expr(0);
	        this.state = 128;
	        this.match(LatexParser.R_PAREN);
	        this.state = 135;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.state = 129;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 130;
	            this.match(LatexParser.L_BRACE);
	            this.state = 131;
	            this.id();
	            this.state = 132;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case 46:
	            this.state = 134;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 137;
	        this.match(LatexParser.L_PAREN);
	        this.state = 138;
	        this.id();
	        this.state = 139;
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
	    this.enterRule(localctx, 22, LatexParser.RULE_integral_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 141;
	        this.match(LatexParser.CMD_INT);
	        this.state = 142;
	        this.match(LatexParser.UNDERSCORE);
	        this.state = 143;
	        this.match(LatexParser.L_BRACE);
	        this.state = 144;
	        this.expr(0);
	        this.state = 145;
	        this.match(LatexParser.R_BRACE);
	        this.state = 146;
	        this.match(LatexParser.CARET);
	        this.state = 147;
	        this.match(LatexParser.L_BRACE);
	        this.state = 148;
	        this.expr(0);
	        this.state = 149;
	        this.match(LatexParser.R_BRACE);
	        this.state = 150;
	        this.match(LatexParser.L_PAREN);
	        this.state = 151;
	        this.expr(0);
	        this.state = 152;
	        this.match(LatexParser.R_PAREN);
	        this.state = 159;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.state = 153;
	            this.match(LatexParser.CMD_MATHRM);
	            this.state = 154;
	            this.match(LatexParser.L_BRACE);
	            this.state = 155;
	            this.id();
	            this.state = 156;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case 46:
	            this.state = 158;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 161;
	        this.match(LatexParser.L_PAREN);
	        this.state = 162;
	        this.id();
	        this.state = 163;
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
	    this.enterRule(localctx, 24, LatexParser.RULE_derivative_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 165;
	        this.match(LatexParser.CMD_FRAC);
	        this.state = 166;
	        this.match(LatexParser.L_BRACE);
	        this.state = 173;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.state = 167;
	            localctx.MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 168;
	            this.match(LatexParser.L_BRACE);
	            this.state = 169;
	            this.id();
	            this.state = 170;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case 46:
	            this.state = 172;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 175;
	        this.match(LatexParser.R_BRACE);
	        this.state = 176;
	        this.match(LatexParser.L_BRACE);
	        this.state = 183;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.state = 177;
	            localctx.MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 178;
	            this.match(LatexParser.L_BRACE);
	            this.state = 179;
	            this.id();
	            this.state = 180;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case 46:
	            this.state = 182;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 185;
	        this.match(LatexParser.L_PAREN);
	        this.state = 186;
	        this.id();
	        this.state = 187;
	        this.match(LatexParser.R_PAREN);
	        this.state = 188;
	        this.match(LatexParser.R_BRACE);
	        this.state = 189;
	        this.match(LatexParser.L_PAREN);
	        this.state = 190;
	        this.expr(0);
	        this.state = 191;
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
	    this.enterRule(localctx, 26, LatexParser.RULE_n_derivative_cmd);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 193;
	        this.match(LatexParser.CMD_FRAC);
	        this.state = 194;
	        this.match(LatexParser.L_BRACE);
	        this.state = 201;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.state = 195;
	            localctx.MATHRM_0 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 196;
	            this.match(LatexParser.L_BRACE);
	            this.state = 197;
	            this.id();
	            this.state = 198;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case 46:
	            this.state = 200;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 203;
	        this.match(LatexParser.CARET);
	        this.state = 204;
	        this.match(LatexParser.L_BRACE);
	        this.state = 205;
	        this.number();
	        this.state = 206;
	        this.match(LatexParser.R_BRACE);
	        this.state = 207;
	        this.match(LatexParser.R_BRACE);
	        this.state = 208;
	        this.match(LatexParser.L_BRACE);
	        this.state = 215;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.state = 209;
	            localctx.MATHRM_1 = this.match(LatexParser.CMD_MATHRM);
	            this.state = 210;
	            this.match(LatexParser.L_BRACE);
	            this.state = 211;
	            this.id();
	            this.state = 212;
	            this.match(LatexParser.R_BRACE);
	            break;
	        case 46:
	            this.state = 214;
	            this.id();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 217;
	        this.match(LatexParser.L_PAREN);
	        this.state = 218;
	        this.id();
	        this.state = 219;
	        this.match(LatexParser.R_PAREN);
	        this.state = 220;
	        this.match(LatexParser.CARET);
	        this.state = 221;
	        this.match(LatexParser.L_BRACE);
	        this.state = 222;
	        this.number();
	        this.state = 223;
	        this.match(LatexParser.R_BRACE);
	        this.state = 224;
	        this.match(LatexParser.R_BRACE);
	        this.state = 225;
	        this.match(LatexParser.L_PAREN);
	        this.state = 226;
	        this.expr(0);
	        this.state = 227;
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
	    this.enterRule(localctx, 28, LatexParser.RULE_argument);
	    var _la = 0; // Token type
	    try {
	        this.state = 239;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 229;
	            this.id();
	            this.state = 230;
	            this.match(LatexParser.EQ);
	            this.state = 231;
	            this.expr(0);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 233;
	            this.expr(0);
	            this.state = 234;
	            localctx.lower = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===40 || _la===42)) {
	                localctx.lower = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 235;
	            this.id();
	            this.state = 236;
	            localctx.upper = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===40 || _la===42)) {
	                localctx.upper = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 237;
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



	condition() {
	    let localctx = new ConditionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, LatexParser.RULE_condition);
	    try {
	        this.state = 243;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 241;
	            this.condition_single();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 242;
	            this.condition_chain();
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



	id_list() {
	    let localctx = new Id_listContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, LatexParser.RULE_id_list);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 245;
	        this.id();
	        this.state = 248; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 246;
	            this.match(LatexParser.COMMA);
	            this.state = 247;
	            this.id();
	            this.state = 250; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===44);
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



	guess() {
	    let localctx = new GuessContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, LatexParser.RULE_guess);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 252;
	        this.id();
	        this.state = 253;
	        _la = this._input.LA(1);
	        if(!(_la===15 || _la===16)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 256;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 254;
	            this.number();
	            break;

	        case 2:
	            this.state = 255;
	            this.number_with_units();
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



	guess_list() {
	    let localctx = new Guess_listContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, LatexParser.RULE_guess_list);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 258;
	        this.guess();
	        this.state = 261; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 259;
	            this.match(LatexParser.COMMA);
	            this.state = 260;
	            this.guess();
	            this.state = 263; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===44);
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



	condition_single() {
	    let localctx = new Condition_singleContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, LatexParser.RULE_condition_single);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 265;
	        this.expr(0);
	        this.state = 266;
	        localctx.operator = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!(((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & 15) !== 0))) {
	            localctx.operator = this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 267;
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



	condition_chain() {
	    let localctx = new Condition_chainContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, LatexParser.RULE_condition_chain);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 269;
	        this.expr(0);
	        this.state = 270;
	        localctx.lower = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!(((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & 15) !== 0))) {
	            localctx.lower = this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 271;
	        this.expr(0);
	        this.state = 272;
	        localctx.upper = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!(((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & 15) !== 0))) {
	            localctx.upper = this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 273;
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
	    const _startState = 42;
	    this.enterRecursionRule(localctx, 42, LatexParser.RULE_expr, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 377;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new SqrtContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 276;
	            this.match(LatexParser.CMD_SQRT);
	            this.state = 277;
	            this.match(LatexParser.L_BRACE);
	            this.state = 278;
	            this.expr(0);
	            this.state = 279;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 2:
	            localctx = new TrigContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 281;
	            this.trig_function();
	            this.state = 282;
	            this.match(LatexParser.L_PAREN);
	            this.state = 283;
	            this.expr(0);
	            this.state = 284;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 3:
	            localctx = new IndefiniteIntegralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 286;
	            this.indefinite_integral_cmd();
	            break;

	        case 4:
	            localctx = new IntegralContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 287;
	            this.integral_cmd();
	            break;

	        case 5:
	            localctx = new DerivativeContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 288;
	            this.derivative_cmd();
	            break;

	        case 6:
	            localctx = new NDerivativeContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 289;
	            this.n_derivative_cmd();
	            break;

	        case 7:
	            localctx = new LnContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 291;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===17) {
	                this.state = 290;
	                this.match(LatexParser.BACK_SLASH);
	            }

	            this.state = 293;
	            this.match(LatexParser.CMD_LN);
	            this.state = 294;
	            this.match(LatexParser.L_PAREN);
	            this.state = 295;
	            this.expr(0);
	            this.state = 296;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 8:
	            localctx = new LogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 298;
	            _la = this._input.LA(1);
	            if(!(_la===32 || _la===33)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 299;
	            this.match(LatexParser.L_PAREN);
	            this.state = 300;
	            this.expr(0);
	            this.state = 301;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 9:
	            localctx = new BaseLogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 303;
	            this.match(LatexParser.CMD_LOG_WITH_SLASH);
	            this.state = 304;
	            this.match(LatexParser.UNDERSCORE);
	            this.state = 305;
	            this.match(LatexParser.L_BRACE);
	            this.state = 306;
	            this.expr(0);
	            this.state = 307;
	            this.match(LatexParser.R_BRACE);
	            this.state = 308;
	            this.match(LatexParser.L_PAREN);
	            this.state = 309;
	            this.expr(0);
	            this.state = 310;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 10:
	            localctx = new BaseLogContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 312;
	            this.match(LatexParser.CMD_LOG_WITH_SLASH);
	            this.state = 313;
	            this.match(LatexParser.UNDERSCORE);
	            this.state = 314;
	            this.expr(0);
	            this.state = 315;
	            this.match(LatexParser.L_PAREN);
	            this.state = 316;
	            this.expr(0);
	            this.state = 317;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 11:
	            localctx = new AbsContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 319;
	            this.match(LatexParser.VBAR);
	            this.state = 320;
	            this.expr(0);
	            this.state = 321;
	            this.match(LatexParser.VBAR);
	            break;

	        case 12:
	            localctx = new NumberWithUnitsExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 323;
	            this.number_with_units();
	            break;

	        case 13:
	            localctx = new NumberExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 324;
	            this.number();
	            break;

	        case 14:
	            localctx = new UnaryMinusContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 325;
	            this.match(LatexParser.SUB);
	            this.state = 326;
	            this.expr(10);
	            break;

	        case 15:
	            localctx = new DivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 327;
	            this.match(LatexParser.CMD_FRAC);
	            this.state = 328;
	            this.match(LatexParser.L_BRACE);
	            this.state = 329;
	            this.expr(0);
	            this.state = 330;
	            this.match(LatexParser.R_BRACE);
	            this.state = 331;
	            this.match(LatexParser.L_BRACE);
	            this.state = 332;
	            this.expr(0);
	            this.state = 333;
	            this.match(LatexParser.R_BRACE);
	            break;

	        case 16:
	            localctx = new VariableContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 335;
	            this.id();
	            break;

	        case 17:
	            localctx = new FunctionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 336;
	            this.id();
	            this.state = 337;
	            this.match(LatexParser.L_PAREN);

	            this.state = 338;
	            this.argument();
	            this.state = 343;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===44) {
	                this.state = 339;
	                this.match(LatexParser.COMMA);
	                this.state = 340;
	                this.argument();
	                this.state = 345;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 346;
	            this.match(LatexParser.R_PAREN);
	            this.state = 351;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	            if(la_===1) {
	                this.state = 347;
	                localctx.points_id_0 = this.match(LatexParser.ID);
	                this.state = 348;
	                localctx.num_points = this.number();
	                this.state = 349;
	                localctx.points_id_1 = this.match(LatexParser.ID);

	            }
	            break;

	        case 18:
	            localctx = new BuiltinFunctionContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 359;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 11:
	                this.state = 353;
	                this.match(LatexParser.CMD_MATHRM);
	                this.state = 354;
	                this.match(LatexParser.L_BRACE);
	                this.state = 355;
	                this.id();
	                this.state = 356;
	                this.match(LatexParser.R_BRACE);
	                break;
	            case 46:
	                this.state = 358;
	                this.id();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 361;
	            this.match(LatexParser.L_PAREN);

	            this.state = 362;
	            this.expr(0);
	            this.state = 367;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===44) {
	                this.state = 363;
	                this.match(LatexParser.COMMA);
	                this.state = 364;
	                this.expr(0);
	                this.state = 369;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 370;
	            this.match(LatexParser.R_PAREN);
	            break;

	        case 19:
	            localctx = new PiExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 372;
	            this.match(LatexParser.PI);
	            break;

	        case 20:
	            localctx = new SubExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 373;
	            this.match(LatexParser.L_PAREN);
	            this.state = 374;
	            this.expr(0);
	            this.state = 375;
	            this.match(LatexParser.R_PAREN);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 399;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,25,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 397;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 379;
	                    if (!( this.precpred(this._ctx, 25))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 25)");
	                    }
	                    this.state = 380;
	                    this.match(LatexParser.CARET);
	                    this.state = 381;
	                    this.expr(25);
	                    break;

	                case 2:
	                    localctx = new MultiplyContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 382;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 383;
	                    this.match(LatexParser.CMD_CDOT);
	                    this.state = 384;
	                    this.expr(10);
	                    break;

	                case 3:
	                    localctx = new AddContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 385;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 386;
	                    this.match(LatexParser.ADD);
	                    this.state = 387;
	                    this.expr(8);
	                    break;

	                case 4:
	                    localctx = new SubtractContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 388;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 389;
	                    this.match(LatexParser.SUB);
	                    this.state = 390;
	                    this.expr(7);
	                    break;

	                case 5:
	                    localctx = new ExponentContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_expr);
	                    this.state = 391;
	                    if (!( this.precpred(this._ctx, 24))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 24)");
	                    }
	                    this.state = 392;
	                    this.match(LatexParser.CARET);
	                    this.state = 393;
	                    this.match(LatexParser.L_BRACE);
	                    this.state = 394;
	                    this.expr(0);
	                    this.state = 395;
	                    this.match(LatexParser.R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 401;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,25,this._ctx);
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
	    this.enterRule(localctx, 44, LatexParser.RULE_u_block);
	    try {
	        localctx = new UnitBlockContext(this, localctx);
	        this.enterOuterAlt(localctx, 1);
	        this.state = 402;
	        this.match(LatexParser.L_BRACKET);
	        this.state = 403;
	        this.u_expr(0);
	        this.state = 404;
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
	    this.enterRule(localctx, 46, LatexParser.RULE_u_fraction);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 406;
	        this.match(LatexParser.U_CMD_FRAC);
	        this.state = 407;
	        this.match(LatexParser.U_L_BRACE);
	        this.state = 408;
	        _la = this._input.LA(1);
	        if(!(_la===60 || _la===61)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 409;
	        this.match(LatexParser.U_R_BRACE);
	        this.state = 410;
	        this.match(LatexParser.U_L_BRACE);
	        this.state = 411;
	        this.match(LatexParser.U_NUMBER);
	        this.state = 412;
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
	    const _startState = 48;
	    this.enterRecursionRule(localctx, 48, LatexParser.RULE_u_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 436;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 53:
	            localctx = new UnitSqrtContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 415;
	            this.match(LatexParser.U_CMD_SQRT);
	            this.state = 416;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 417;
	            this.expr(0);
	            this.state = 418;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case 51:
	            localctx = new UnitDivideContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 420;
	            this.match(LatexParser.U_CMD_FRAC);
	            this.state = 421;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 424;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 51:
	            case 53:
	            case 55:
	            case 56:
	                this.state = 422;
	                this.u_expr(0);
	                break;
	            case 60:
	                this.state = 423;
	                this.match(LatexParser.U_ONE);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 426;
	            this.match(LatexParser.U_R_BRACE);
	            this.state = 427;
	            this.match(LatexParser.U_L_BRACE);
	            this.state = 428;
	            this.u_expr(0);
	            this.state = 429;
	            this.match(LatexParser.U_R_BRACE);
	            break;
	        case 55:
	            localctx = new UnitNameContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 431;
	            this.match(LatexParser.U_NAME);
	            break;
	        case 56:
	            localctx = new UnitSubExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 432;
	            this.match(LatexParser.U_L_PAREN);
	            this.state = 433;
	            this.u_expr(0);
	            this.state = 434;
	            this.match(LatexParser.U_R_PAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 460;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,29,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 458;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,28,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new UnitMultiplyContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 438;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 439;
	                    this.match(LatexParser.U_CMD_CDOT);
	                    this.state = 440;
	                    this.u_expr(5);
	                    break;

	                case 2:
	                    localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 441;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 442;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 443;
	                    this.match(LatexParser.U_NUMBER);
	                    break;

	                case 3:
	                    localctx = new UnitExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 444;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 445;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 446;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 447;
	                    this.match(LatexParser.U_NUMBER);
	                    this.state = 448;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                case 4:
	                    localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 449;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 450;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 451;
	                    this.u_fraction();
	                    break;

	                case 5:
	                    localctx = new UnitFractionalExponentContext(this, new U_exprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, LatexParser.RULE_u_expr);
	                    this.state = 452;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 453;
	                    this.match(LatexParser.U_CARET);
	                    this.state = 454;
	                    this.match(LatexParser.U_L_BRACE);
	                    this.state = 455;
	                    this.u_fraction();
	                    this.state = 456;
	                    this.match(LatexParser.U_R_BRACE);
	                    break;

	                } 
	            }
	            this.state = 462;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,29,this._ctx);
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
LatexParser.CMD_SIM = 15;
LatexParser.CMD_APPROX = 16;
LatexParser.BACK_SLASH = 17;
LatexParser.CMD_SIN = 18;
LatexParser.CMD_COS = 19;
LatexParser.CMD_TAN = 20;
LatexParser.CMD_COT = 21;
LatexParser.CMD_SEC = 22;
LatexParser.CMD_CSC = 23;
LatexParser.CMD_ARCSIN = 24;
LatexParser.CMD_ARCCOS = 25;
LatexParser.CMD_ARCTAN = 26;
LatexParser.CMD_SINH = 27;
LatexParser.CMD_COSH = 28;
LatexParser.CMD_TANH = 29;
LatexParser.CMD_COTH = 30;
LatexParser.CMD_LN = 31;
LatexParser.CMD_LOG = 32;
LatexParser.CMD_LOG_WITH_SLASH = 33;
LatexParser.CMD_LEFT = 34;
LatexParser.CMD_RIGHT = 35;
LatexParser.ADD = 36;
LatexParser.SUB = 37;
LatexParser.CARET = 38;
LatexParser.EQ = 39;
LatexParser.LT = 40;
LatexParser.GT = 41;
LatexParser.LTE = 42;
LatexParser.GTE = 43;
LatexParser.COMMA = 44;
LatexParser.NUMBER = 45;
LatexParser.ID = 46;
LatexParser.WS = 47;
LatexParser.SLASH_SPACE = 48;
LatexParser.ERROR_CHAR = 49;
LatexParser.R_BRACKET = 50;
LatexParser.U_CMD_FRAC = 51;
LatexParser.U_CMD_CDOT = 52;
LatexParser.U_CMD_SQRT = 53;
LatexParser.U_CARET = 54;
LatexParser.U_NAME = 55;
LatexParser.U_L_PAREN = 56;
LatexParser.U_R_PAREN = 57;
LatexParser.U_L_BRACE = 58;
LatexParser.U_R_BRACE = 59;
LatexParser.U_ONE = 60;
LatexParser.U_NUMBER = 61;
LatexParser.U_CMD_LEFT = 62;
LatexParser.U_CMD_RIGHT = 63;
LatexParser.U_WS = 64;
LatexParser.U_SLASH_SPACE = 65;
LatexParser.U_ERROR_CHAR = 66;

LatexParser.RULE_id = 0;
LatexParser.RULE_number = 1;
LatexParser.RULE_number_with_units = 2;
LatexParser.RULE_statement = 3;
LatexParser.RULE_assign = 4;
LatexParser.RULE_query = 5;
LatexParser.RULE_equality = 6;
LatexParser.RULE_piecewise_assign = 7;
LatexParser.RULE_piecewise_arg = 8;
LatexParser.RULE_trig_function = 9;
LatexParser.RULE_indefinite_integral_cmd = 10;
LatexParser.RULE_integral_cmd = 11;
LatexParser.RULE_derivative_cmd = 12;
LatexParser.RULE_n_derivative_cmd = 13;
LatexParser.RULE_argument = 14;
LatexParser.RULE_condition = 15;
LatexParser.RULE_id_list = 16;
LatexParser.RULE_guess = 17;
LatexParser.RULE_guess_list = 18;
LatexParser.RULE_condition_single = 19;
LatexParser.RULE_condition_chain = 20;
LatexParser.RULE_expr = 21;
LatexParser.RULE_u_block = 22;
LatexParser.RULE_u_fraction = 23;
LatexParser.RULE_u_expr = 24;

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

	SUB() {
	    return this.getToken(LatexParser.SUB, 0);
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



class Number_with_unitsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_number_with_units;
    }

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	u_block() {
	    return this.getTypedRuleContext(U_blockContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterNumber_with_units(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitNumber_with_units(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitNumber_with_units(this);
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

	id_list() {
	    return this.getTypedRuleContext(Id_listContext,0);
	};

	guess_list() {
	    return this.getTypedRuleContext(Guess_listContext,0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	condition() {
	    return this.getTypedRuleContext(ConditionContext,0);
	};

	piecewise_assign() {
	    return this.getTypedRuleContext(Piecewise_assignContext,0);
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



class Piecewise_assignContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_piecewise_assign;
    }

	EQ() {
	    return this.getToken(LatexParser.EQ, 0);
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

	L_PAREN() {
	    return this.getToken(LatexParser.L_PAREN, 0);
	};

	R_PAREN() {
	    return this.getToken(LatexParser.R_PAREN, 0);
	};

	PI() {
	    return this.getToken(LatexParser.PI, 0);
	};

	piecewise_arg = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Piecewise_argContext);
	    } else {
	        return this.getTypedRuleContext(Piecewise_argContext,i);
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
	        listener.enterPiecewise_assign(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitPiecewise_assign(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitPiecewise_assign(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Piecewise_argContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_piecewise_arg;
    }

	L_PAREN() {
	    return this.getToken(LatexParser.L_PAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	COMMA() {
	    return this.getToken(LatexParser.COMMA, 0);
	};

	condition() {
	    return this.getTypedRuleContext(ConditionContext,0);
	};

	R_PAREN() {
	    return this.getToken(LatexParser.R_PAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterPiecewise_arg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitPiecewise_arg(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitPiecewise_arg(this);
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



class ConditionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_condition;
    }

	condition_single() {
	    return this.getTypedRuleContext(Condition_singleContext,0);
	};

	condition_chain() {
	    return this.getTypedRuleContext(Condition_chainContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterCondition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitCondition(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitCondition(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Id_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_id_list;
    }

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
	        listener.enterId_list(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitId_list(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitId_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class GuessContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_guess;
    }

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	CMD_SIM() {
	    return this.getToken(LatexParser.CMD_SIM, 0);
	};

	CMD_APPROX() {
	    return this.getToken(LatexParser.CMD_APPROX, 0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	number_with_units() {
	    return this.getTypedRuleContext(Number_with_unitsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterGuess(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitGuess(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitGuess(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Guess_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_guess_list;
    }

	guess = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(GuessContext);
	    } else {
	        return this.getTypedRuleContext(GuessContext,i);
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
	        listener.enterGuess_list(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitGuess_list(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitGuess_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Condition_singleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_condition_single;
        this.operator = null; // Token
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

	LT() {
	    return this.getToken(LatexParser.LT, 0);
	};

	LTE() {
	    return this.getToken(LatexParser.LTE, 0);
	};

	GT() {
	    return this.getToken(LatexParser.GT, 0);
	};

	GTE() {
	    return this.getToken(LatexParser.GTE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterCondition_single(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitCondition_single(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitCondition_single(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Condition_chainContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LatexParser.RULE_condition_chain;
        this.lower = null; // Token
        this.upper = null; // Token
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


	GT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.GT);
	    } else {
	        return this.getToken(LatexParser.GT, i);
	    }
	};


	GTE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LatexParser.GTE);
	    } else {
	        return this.getToken(LatexParser.GTE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterCondition_chain(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitCondition_chain(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitCondition_chain(this);
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

class BuiltinFunctionContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	L_PAREN() {
	    return this.getToken(LatexParser.L_PAREN, 0);
	};

	R_PAREN() {
	    return this.getToken(LatexParser.R_PAREN, 0);
	};

	CMD_MATHRM() {
	    return this.getToken(LatexParser.CMD_MATHRM, 0);
	};

	L_BRACE() {
	    return this.getToken(LatexParser.L_BRACE, 0);
	};

	id() {
	    return this.getTypedRuleContext(IdContext,0);
	};

	R_BRACE() {
	    return this.getToken(LatexParser.R_BRACE, 0);
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
	        listener.enterBuiltinFunction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitBuiltinFunction(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitBuiltinFunction(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.BuiltinFunctionContext = BuiltinFunctionContext;

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
        this.points_id_0 = null; // Token;
        this.num_points = null; // NumberContext;
        this.points_id_1 = null; // Token;
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


	number() {
	    return this.getTypedRuleContext(NumberContext,0);
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

class NumberWithUnitsExprContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	number_with_units() {
	    return this.getTypedRuleContext(Number_with_unitsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.enterNumberWithUnitsExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof LatexParserListener ) {
	        listener.exitNumberWithUnitsExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof LatexParserVisitor ) {
	        return visitor.visitNumberWithUnitsExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

LatexParser.NumberWithUnitsExprContext = NumberWithUnitsExprContext;

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
LatexParser.Number_with_unitsContext = Number_with_unitsContext; 
LatexParser.StatementContext = StatementContext; 
LatexParser.AssignContext = AssignContext; 
LatexParser.QueryContext = QueryContext; 
LatexParser.EqualityContext = EqualityContext; 
LatexParser.Piecewise_assignContext = Piecewise_assignContext; 
LatexParser.Piecewise_argContext = Piecewise_argContext; 
LatexParser.Trig_functionContext = Trig_functionContext; 
LatexParser.Indefinite_integral_cmdContext = Indefinite_integral_cmdContext; 
LatexParser.Integral_cmdContext = Integral_cmdContext; 
LatexParser.Derivative_cmdContext = Derivative_cmdContext; 
LatexParser.N_derivative_cmdContext = N_derivative_cmdContext; 
LatexParser.ArgumentContext = ArgumentContext; 
LatexParser.ConditionContext = ConditionContext; 
LatexParser.Id_listContext = Id_listContext; 
LatexParser.GuessContext = GuessContext; 
LatexParser.Guess_listContext = Guess_listContext; 
LatexParser.Condition_singleContext = Condition_singleContext; 
LatexParser.Condition_chainContext = Condition_chainContext; 
LatexParser.ExprContext = ExprContext; 
LatexParser.U_blockContext = U_blockContext; 
LatexParser.U_fractionContext = U_fractionContext; 
LatexParser.U_exprContext = U_exprContext; 
