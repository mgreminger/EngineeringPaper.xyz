parser grammar LatexParser;

options { tokenVocab=LatexLexer; }

statement: (assign | query | equality) SEMICOLON;

assign: ID EQ expr ;

query: expr EQ (u_block)? ;

equality: expr EQ expr ;

trig_function: BACK_SLASH? (CMD_SIN | CMD_COS | CMD_TAN | CMD_COT | CMD_SEC | CMD_CSC
             | CMD_ARCSIN | CMD_ARCCOS | CMD_ARCTAN | CMD_SINH | CMD_COSH
             | CMD_TANH | CMD_COTH)
             ;

indefinite_integral_cmd: CMD_INT UNDERSCORE L_BRACE R_BRACE CARET L_BRACE R_BRACE L_PAREN expr R_PAREN 
    (CMD_MATHRM L_BRACE ID R_BRACE | ID) L_PAREN ID R_PAREN ;

integral_cmd: CMD_INT UNDERSCORE L_BRACE expr R_BRACE CARET L_BRACE expr R_BRACE L_PAREN expr R_PAREN 
    (CMD_MATHRM L_BRACE ID R_BRACE | ID) L_PAREN ID R_PAREN ;

derivative_cmd: CMD_FRAC L_BRACE (MATHRM_0=CMD_MATHRM L_BRACE ID R_BRACE | ID) R_BRACE L_BRACE 
    (MATHRM_1=CMD_MATHRM L_BRACE ID R_BRACE | ID) L_PAREN ID R_PAREN R_BRACE L_PAREN expr R_PAREN;

n_derivative_cmd: CMD_FRAC L_BRACE (MATHRM_0=CMD_MATHRM L_BRACE ID R_BRACE | ID) CARET L_BRACE NUMBER R_BRACE R_BRACE L_BRACE 
    (MATHRM_1=CMD_MATHRM L_BRACE ID R_BRACE | ID) L_PAREN ID R_PAREN CARET L_BRACE NUMBER R_BRACE R_BRACE L_PAREN expr R_PAREN;

argument: (ID EQ expr) | (expr lower=(LT | LTE)  ID upper=(LT | LTE) expr);

expr: <assoc=right> expr CARET expr                                         #exponent
    | <assoc=right> expr CARET L_BRACE expr R_BRACE                         #exponent
    | CMD_SQRT L_BRACE expr R_BRACE                                         #sqrt
    | trig_function L_PAREN expr R_PAREN                                    #trig
    | indefinite_integral_cmd                                               #indefiniteIntegral
    | integral_cmd                                                          #integral
    | derivative_cmd                                                        #derivative
    | n_derivative_cmd                                                      #nDerivative
    | BACK_SLASH? CMD_LN L_PAREN expr R_PAREN                                          #ln
    | BACK_SLASH? CMD_LOG L_PAREN expr R_PAREN                                         #log
    | BACK_SLASH CMD_LOG UNDERSCORE L_BRACE expr R_BRACE L_PAREN expr R_PAREN          #baseLog
    | BACK_SLASH CMD_LOG UNDERSCORE expr L_PAREN expr R_PAREN                          #baseLog
    | VBAR expr VBAR                                                        #abs
    | SUB expr                                                              #unaryMinus
    | expr CMD_CDOT expr                                                    #multiply
    | CMD_FRAC L_BRACE expr R_BRACE L_BRACE expr R_BRACE                    #divide
    | expr ADD expr                                                         #add
    | expr SUB expr                                                         #subtract  
    | ID                                                                    #variable
    | ID L_PAREN (argument (COMMA argument)*) R_PAREN                       #function
    | NUMBER u_block                                                        #numberWithUnits
    | NUMBER                                                                #number
    | PI                                                                    #piExpr
    | L_PAREN expr R_PAREN                                                  #subExpr
    ;


u_block: L_BRACKET u_expr R_BRACKET #unitBlock ;

u_fraction: U_CMD_FRAC U_L_BRACE (U_NUMBER | U_ONE) U_R_BRACE U_L_BRACE U_NUMBER U_R_BRACE ;

u_expr: <assoc=right> u_expr U_CARET U_NUMBER                              #unitExponent
    | <assoc=right> u_expr U_CARET U_L_BRACE U_NUMBER U_R_BRACE            #unitExponent
    | <assoc=right> u_expr U_CARET u_fraction                              #unitFractionalExponent
    | <assoc=right> u_expr U_CARET U_L_BRACE u_fraction U_R_BRACE          #unitFractionalExponent
    | U_CMD_SQRT U_L_BRACE expr U_R_BRACE                                  #unitSqrt
    | u_expr U_CMD_CDOT u_expr                                             #unitMultiply
    | U_CMD_FRAC U_L_BRACE (u_expr | U_ONE) U_R_BRACE U_L_BRACE u_expr U_R_BRACE     #unitDivide
    | U_NAME                                                               #unitName
    | U_L_PAREN u_expr U_R_PAREN                                           #unitSubExpr
    ;