grammar Latex;

assign: ID '=' expr;

expr: <assoc=right> expr '^' expr         #exponent
    | <assoc=right> expr '^' '{' expr '}' #exponent
    | expr '\\cdot' expr                  #multiply
    | '\\frac{' expr '}{' expr '}'        #divide
    | expr '+' expr                       #add
    | expr '-' expr                       #subtract  
    | ID                                  #id_expr
    | NUMBER                              #number_expr
    ;

NUMBER: DIGIT+ '.' DIGIT*
      |        '.' DIGIT+
      | DIGIT+
      ;

fragment
DIGIT : [0-9];

ID: [a-zA-Z]+;

WS: [ \t\r\n]+ -> skip ;