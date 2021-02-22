parser grammar LatexParser;

options { tokenVocab=LatexLexer; }

assign: ID EQ expr SEMICOLON ;

expr: <assoc=right> expr CARET expr                      #exponent
    | <assoc=right> expr CARET L_BRACE expr R_BRACE      #exponent
    | expr CMD_CDOT expr                                 #multiply
    | CMD_FRAC L_BRACE expr R_BRACE L_BRACE expr R_BRACE #divide
    | expr ADD expr                                      #add
    | expr SUB expr                                      #subtract  
    | ID                                                 #id_expr
    | NUMBER u_block                                     #number_expr_with_units
    | NUMBER                                             #number_expr
    | L_PAREN expr R_PAREN                               #sub_expr
    ;


u_block: L_BRACKET u_expr R_BRACKET ;

u_expr: <assoc=right> u_expr U_CARET u_expr                              #u_exponent
    | <assoc=right> u_expr U_CARET U_L_BRACE u_expr U_R_BRACE            #u_exponent
    | u_expr U_CMD_CDOT u_expr                                           #u_multiply
    | U_CMD_FRAC U_L_BRACE u_expr U_R_BRACE U_L_BRACE u_expr U_R_BRACE   #u_divide
    | U_NAME                                                             #u_name_expr
    | U_L_PAREN u_expr U_R_PAREN                                         #u_sub_expr
    ;