parser grammar LatexParser;

options { tokenVocab=LatexLexer; }

assign: ID EQ expr;

expr: <assoc=right> expr CARET expr         #exponent
    | <assoc=right> expr CARET L_BRACE expr R_BRACE #exponent
    | expr CMD_CDOT expr                  #multiply
    | CMD_FRAC L_BRACE expr R_BRACE L_BRACE expr R_BRACE        #divide
    | expr ADD expr                       #add
    | expr SUB expr                       #subtract  
    | ID                                  #id_expr
    | NUMBER                              #number_expr
    ;

