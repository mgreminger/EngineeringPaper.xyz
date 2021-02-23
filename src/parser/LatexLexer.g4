lexer grammar LatexLexer;

L_BRACKET: '[' -> mode(UNITS) ; 

SEMICOLON: ';' ;

L_BRACE: '{' ;
R_BRACE: '}' ;

L_PAREN: '(' ;
R_PAREN: ')' ;

CMD_FRAC: '\\frac' ;
CMD_CDOT: '\\cdot' ;
CMD_SQRT: '\\sqrt' ;

CMD_LEFT: '\\left' -> skip ;
CMD_RIGHT: '\\right' -> skip ;

ADD: '+' ;
SUB: '-' ;
CARET: '^' ;
EQ: '=' ;

NUMBER: DIGIT+ '.' DIGIT*
      |        '.' DIGIT+
      | DIGIT+
      ;

fragment
DIGIT : [0-9];

ID: [a-zA-Z]+ ;

WS: [ \t\r\n]+ -> skip ;

mode UNITS;
U_WS: [ \t\r\n]+ -> skip ;
U_CMD_LEFT: '\\left' -> skip ;
U_CMD_RIGHT: '\\right' -> skip ;
R_BRACKET: ']' -> mode(DEFAULT_MODE);
U_CMD_FRAC: '\\frac' ;
U_CMD_CDOT: '\\cdot' ;
U_CMD_SQRT: '\\sqrt' ;
U_CARET: '^' ;
U_NAME: [a-zA-Z]+ ;
U_L_PAREN: '(' ;
U_R_PAREN: ')' ;
U_L_BRACE: '{' ;
U_R_BRACE: '}' ;