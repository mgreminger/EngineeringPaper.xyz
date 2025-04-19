lexer grammar LatexLexer;

import LatexIdFragments;

L_BRACKET: '[' -> mode(UNITS) ; 
ALT_L_BRACKET: '\\lbrack' -> mode(UNITS) ;

SEMICOLON: ';' ;

L_BRACE: '{' ;
R_BRACE: '}' ;

L_PAREN: '(' ;
R_PAREN: ')' ;

VBAR: '|' ;
DOUBLE_VBAR: '||' | '\\Vert' ;

UNDERSCORE: '_' ;

fragment
UNDERSCORE_SINGLE_CHAR_NUMBER: '_' [0-9];

fragment
UNDERSCORE_SINGLE_CHAR_ID: '_' ID_START;

EXCLAMATION: '!' ;

INFINITY: '\\infty' ;

CMD_INT: '\\int' ;
CMD_INT_UNDERSCORE: '\\int' [ ]* '_' ;
CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER: '\\int' [ ]* UNDERSCORE_SINGLE_CHAR_NUMBER ;
CMD_INT_UNDERSCORE_SINGLE_CHAR_ID: '\\int' [ ]* UNDERSCORE_SINGLE_CHAR_ID ;

CMD_SUM_UNDERSCORE: '\\sum' [ ]* '_' ;
CMD_PROD_UNDERSCORE: '\\prod' [ ]* '_' ;

CMD_MATHRM: '\\mathrm' ;

CMD_FRAC: '\\frac' ;
CMD_FRAC_INTS: '\\frac' [ ]* [0-9][0-9];
CMD_CDOT: '\\cdot' ;
CMD_TIMES: '\\times' ;
CMD_SQRT: '\\sqrt' ;
CMD_SQRT_INT: '\\sqrt' [ ]* [0-9] ;

CMD_SIM: '\\sim' ;
CMD_APPROX: '\\approx' ;

CMD_PLACEHOLDER: '\\placeholder' ;

TRANSPOSE: '^{\\mathrm{T}}' ;

BACKSLASH: '\\' ;

AS_LINES: 'as' (' ' | '\\:')+ 'line' [s]? ;

CMD_SIN: 'sin' ;
CMD_COS: 'cos' ;
CMD_TAN: 'tan' ;
CMD_COT: 'cot' ;
CMD_SEC: 'sec' ;
CMD_CSC: 'csc' ;
CMD_ARCSIN: 'arcsin' ;
CMD_ARCCOS: 'arccos' ;
CMD_ARCTAN: 'arctan' ;
CMD_SINH: 'sinh' ;
CMD_COSH: 'cosh' ;
CMD_TANH: 'tanh' ;
CMD_COTH: 'coth' ;

CMD_LN: 'ln' ;
CMD_LOG: 'log' ;
CMD_SLASH_LOG_UNDERSCORE: '\\log' [ ]* '_' ;
CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER: '\\log' [ ]* UNDERSCORE_SINGLE_CHAR_NUMBER ;
CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID: '\\log' [ ]* UNDERSCORE_SINGLE_CHAR_ID ;

COMMENT: '\\text{' .*? '}' -> skip ;

CMD_LEFT: '\\left' '.'? -> skip ;
CMD_RIGHT: '\\right' '.'? -> skip ;

DOUBLE_DOLLAR_SIGN: '$$' -> skip ;

ADD: '+' ;
SUB: '-' ;
CARET: '^' ;
EQ: '=' ;

LT: '<';
GT: '>';
LTE: '\\le';
GTE: '\\ge';

COMMA: ',';
DECIMAL_POINT: '.';

fragment
DIGIT : [0-9];

CARET_SINGLE_CHAR_NUMBER: '^' DIGIT;
CARET_SINGLE_CHAR_ID: '^' ID_START;

NUMBER: DIGIT+ '.' DIGIT* EXP?
      |        '.' DIGIT+ EXP?
      | DIGIT+ EXP?
      ;

fragment
IDENTIFIER : (ID_START | (LATEX_SYMBOLS [ ]*)) (ID_CONTINUE | (LATEX_SYMBOLS [ ]*))*;

fragment
EXP : ('E' | 'e' ) ('+' | '-')? DIGIT+
    | ' '* ( CMD_CDOT | CMD_TIMES) ' '* '10' CARET ( DIGIT | ( L_BRACE ('+' | '-')? DIGIT+ R_BRACE) );

fragment
LATEX_SYMBOLS: '\\' ('ell' | 'hbar' | 'alpha' | 'beta' | 'gamma' | 'delta' |
                     'epsilon' | 'varepsilon' | 'zeta' | 'eta' | 'theta' | 'vartheta' |
                     'iota' | 'kappa' | 'varkappa' | 'lambda' | 'mu' | 'nu' | 'xi' |
                     'omicron' | 'pi' | 'varpi' | 'rho' | 'varrho' | 'sigma' | 'varsigma' |
                     'tau' | 'phi' | 'varphi' | 'upsilon' | 'chi' | 'psi' | 'omega' | 'Gamma' |
                     'Delta' | 'Theta' | 'Lambda' | 'Xi' | 'Pi' | 'Sigma' | 'Upsilon' | 'Phi' |
                     'Psi' | 'Omega' | 'digamma' | 'varkappa' | 'coppa' | 'koppa' | 'Coppa' |
                     'Koppa' | 'sampi' | 'Sampi' | 'wp' | 'aleph' | 'hslash' | 'Finv' | 'eth' |
                     'Bbbk' | 'beth' | 'daleth' | 'gimel' | 'imath' | 'jmath' );

BEGIN_MATRIX: '\\begin{bmatrix}';
END_MATRIX: '\\end{bmatrix}';
AMPERSAND: '&';
DOUBLE_BACKSLASH: '\\\\';

UNDERSCORE_SUBSCRIPT: (([ ]* '_{' (ID_CONTINUE | (LATEX_SYMBOLS [ ]*))+ '}') | ([ ]* ('_' ID_CONTINUE) ));

CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT: '^'ID_START UNDERSCORE_SUBSCRIPT;

fragment
ACCENT: '\\' ('hat' | 'bar' | 'vec' | 'dot' | 'ddot' | 'dddot');

fragment 
PRIME_ACCENT: CARET L_BRACE ('\\prime' [ ]*)+ R_BRACE;

ID: IDENTIFIER UNDERSCORE_SUBSCRIPT? |
    IDENTIFIER PRIME_ACCENT UNDERSCORE_SUBSCRIPT? |
    IDENTIFIER UNDERSCORE_SUBSCRIPT PRIME_ACCENT |
    ACCENT L_BRACE IDENTIFIER R_BRACE UNDERSCORE_SUBSCRIPT? | 
    ACCENT L_BRACE IDENTIFIER UNDERSCORE_SUBSCRIPT R_BRACE;

WS: [ \t\r\n]+ -> skip ;
SLASH_SPACE: '\\ ' -> skip ;
SLASH_COLON: '\\:' -> skip ;
NBSP: '\u00A0' -> skip ;

ERROR_CHAR : . ;

mode UNITS;
R_BRACKET: ']' -> mode(DEFAULT_MODE);
ALT_R_BRACKET: '\\rbrack' -> mode(DEFAULT_MODE) ;
U_CMD_FRAC: '\\frac' ;
U_CMD_FRAC_INTS: '\\frac' [ ]* [0-9][0-9];
U_CMD_CDOT: '\\cdot' ;
U_CMD_TIMES: '\\times' ;
U_CMD_SQRT: '\\sqrt' ;
U_COMMA: ',';
U_CARET: '^' ;
U_NAME: [a-zA-Z] [a-zA-Z0-9]* ;
U_L_PAREN: '(' ;
U_R_PAREN: ')' ;
U_L_BRACE: '{' ;
U_R_BRACE: '}' ;
U_ONE:     '1' ;

U_NUMBER: '-'? U_DIGIT+ '.' U_DIGIT*
      |   '-'?          '.' U_DIGIT+
      |   '-'? U_DIGIT+
      ;

fragment
U_DIGIT : [0-9];

U_CMD_LEFT: '\\left' -> skip ;
U_CMD_RIGHT: '\\right' -> skip ;

U_WS: [ \t\r\n]+ -> skip ;
U_SLASH_SPACE: '\\ ' -> skip ;
U_SLASH_COLON: '\\:' -> skip ;
U_NBSP: '\u00A0' -> skip ;

U_ERROR_CHAR : . ;