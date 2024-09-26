lexer grammar LatexLexer;

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

EXCLAMATION: '!' ;

PI: '\\pi' ;

CMD_INT: '\\int' ;
CMD_INT_UNDERSCORE: '\\int' [ ]* '_' ;
CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER: '\\int' [ ]* '_' [0-9];
CMD_INT_UNDERSCORE_SINGLE_CHAR_ID: '\\int' [ ]* '_' [a-zA-Z] ;

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
CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER: '\\log' [ ]* '_' [0-9] ;
CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID: '\\log' [ ]* '_' [a-zA-Z] ;

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

CARET_SINGLE_CHAR_NUMBER: '^' [0-9];
CARET_SINGLE_CHAR_ID: '^' [a-zA-Z];

NUMBER: DIGIT+ '.' DIGIT* EXP?
      |        '.' DIGIT+ EXP?
      | DIGIT+ EXP?
      ;

fragment
DIGIT : [0-9];

fragment
IDENTIFIER : [a-zA-Z] [a-zA-Z0-9]*;

fragment
EXP : ('E' | 'e' ) ('+' | '-')? DIGIT+
    | ' '* ( CMD_CDOT | CMD_TIMES) ' '* '10' CARET ( DIGIT | ( L_BRACE ('+' | '-')? DIGIT+ R_BRACE) );

fragment
GREEK_CHAR: '\\' ('alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta' |
                  'eta' | 'theta' | 'iota' | 'kappa' | 'lambda' | 'mu' | 'nu' |
                  'xi' | 'rho' | 'sigma' | 'tau' | 'upsilon' | 'phi' | 'chi' |
                  'psi' | 'omega' | 'Gamma' | 'Delta' | 'Theta' | 'Lambda' |
                  'Xi' | 'Pi' | 'Sigma' | 'Upsilon' | 'Phi' | 'Psi' | 'Omega');

BEGIN_MATRIX: '\\begin{bmatrix}';
END_MATRIX: '\\end{bmatrix}';
AMPERSAND: '&';
DOUBLE_BACKSLASH: '\\\\';


UNDERSCORE_SUBSCRIPT: (([ ]* '_{' [a-zA-Z0-9]+ '}') | ([ ]* '_' [a-zA-Z0-9]));

CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT: '^'[a-zA-Z] UNDERSCORE_SUBSCRIPT;

ID: ( IDENTIFIER | GREEK_CHAR ) UNDERSCORE_SUBSCRIPT? ;

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