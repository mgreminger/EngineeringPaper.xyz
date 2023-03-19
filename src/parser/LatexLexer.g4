lexer grammar LatexLexer;

L_BRACKET: '[' -> mode(UNITS) ; 
ALT_L_BRACKET: '\\lbrack' -> mode(UNITS) ;

SEMICOLON: ';' ;

L_BRACE: '{' ;
R_BRACE: '}' ;

L_PAREN: '(' ;
R_PAREN: ')' ;

VBAR: '|' ;

UNDERSCORE: '_' ;

PI: '\\pi' ;

CMD_INT: '\\int' ;
CMD_MATHRM: '\\mathrm' ;

CMD_FRAC: '\\frac' ;
CMD_CDOT: '\\cdot' ;
CMD_SQRT: '\\sqrt' ;

CMD_SIM: '\\sim' ;
CMD_APPROX: '\\approx' ;

BACK_SLASH: '\\' ;

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
CMD_LOG_WITH_SLASH: '\\log' ;

CMD_LEFT: '\\left' -> skip ;
CMD_RIGHT: '\\right' -> skip ;

ADD: '+' ;
SUB: '-' ;
CARET: '^' ;
EQ: '=' ;

LT: '<';
GT: '>';
LTE: '\\le';
GTE: '\\ge';

COMMA: ',';

NUMBER: DIGIT+ '.' DIGIT* EXP?
      |        '.' DIGIT+ EXP?
      | DIGIT+ EXP?
      ;

fragment
DIGIT : [0-9];

fragment
IDENTIFIER : [a-zA-Z] [a-zA-Z0-9]*;

fragment
EXP : ('E' | 'e') ('+' | '-')? DIGIT+ ;

fragment
GREEK_CHAR: '\\' ('alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta' |
                  'eta' | 'theta' | 'iota' | 'kappa' | 'lambda' | 'mu' |
                  'xi' | 'rho' | 'sigma' | 'tau' | 'upsilon' | 'phi' | 'chi' |
                  'psi' | 'omega' | 'Gamma' | 'Delta' | 'Theta' | 'Lambda' |
                  'Xi' | 'Pi' | 'Sigma' | 'Upsilon' | 'Phi' | 'Psi' | 'Omega');

ID: ( IDENTIFIER | GREEK_CHAR ) ('_{' ( IDENTIFIER | DIGIT+ ) '}')? ;

WS: [ \t\r\n]+ -> skip ;

SLASH_SPACE: '\\ ' -> skip ;

ERROR_CHAR : . ;

mode UNITS;
R_BRACKET: ']' -> mode(DEFAULT_MODE);
ALT_R_BRACKET: '\\rbrack' -> mode(DEFAULT_MODE) ;
U_CMD_FRAC: '\\frac' ;
U_CMD_CDOT: '\\cdot' ;
U_CMD_SQRT: '\\sqrt' ;
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

U_ERROR_CHAR : . ;