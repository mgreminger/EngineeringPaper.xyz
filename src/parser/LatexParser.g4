parser grammar LatexParser;

options { tokenVocab=LatexLexer; }

statement: (assign | query) SEMICOLON;

assign: ID EQ expr ;

query: expr EQ (u_block)? ;

trig_function: CMD_SIN | CMD_COS | CMD_TAN | CMD_COT | CMD_SEC | CMD_CSC
             | CMD_ARCSIN | CMD_ARCCOS | CMD_ARCTAN | CMD_SINH | CMD_COSH
             | CMD_TANH | CMD_COTH
             ;

expr: <assoc=right> expr CARET expr                                         #exponent
    | <assoc=right> expr CARET L_BRACE expr R_BRACE                         #exponent
    | CMD_SQRT L_BRACE expr R_BRACE                                         #sqrt
    | trig_function L_PAREN expr R_PAREN                                    #trig
    | CMD_LN L_PAREN expr R_PAREN                                           #ln
    | CMD_LOG L_PAREN expr R_PAREN                                          #log
    | CMD_LOG UNDERSCORE L_BRACE expr R_BRACE L_PAREN expr R_PAREN          #baseLog
    | CMD_LOG UNDERSCORE expr L_PAREN expr R_PAREN                          #baseLog
    | VBAR expr VBAR                                                        #abs
    | SUB expr                                                              #unaryMinus
    | expr CMD_CDOT expr                                                    #multiply
    | CMD_FRAC L_BRACE expr R_BRACE L_BRACE expr R_BRACE                    #divide
    | expr ADD expr                                                         #add
    | expr SUB expr                                                         #subtract  
    | ID                                                                    #variable
    | NUMBER u_block                                                        #numberWithUnits
    | NUMBER                                                                #number
    | PI                                                                    #piExpr
    | L_PAREN expr R_PAREN                                                  #subExpr
    ;


u_block: L_BRACKET u_expr R_BRACKET #unitBlock ;

u_expr: <assoc=right> u_expr U_CARET U_NUMBER                              #unitExponent
    | <assoc=right> u_expr U_CARET U_L_BRACE U_NUMBER U_R_BRACE            #unitExponent
    | U_CMD_SQRT U_L_BRACE expr U_R_BRACE                                  #unitSqrt
    | u_expr U_CMD_CDOT u_expr                                             #unitMultiply
    | U_CMD_FRAC U_L_BRACE (u_expr | U_ONE) U_R_BRACE U_L_BRACE u_expr U_R_BRACE     #unitDivide
    | U_NAME                                                               #unitName
    | U_L_PAREN u_expr U_R_PAREN                                           #unitSubExpr
    ;