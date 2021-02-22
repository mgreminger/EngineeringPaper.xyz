lexer grammar LatexLexer;

L_BRACE: '{' ;
R_BRACE: '}' ;

CMD_FRAC: '\\frac' ;
CMD_CDOT: '\\cdot' ;

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

ID: [a-zA-Z]+;

WS: [ \t\r\n]+ -> skip ;