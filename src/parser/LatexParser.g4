parser grammar LatexParser;

options { tokenVocab=LatexLexer; }

statement: (assign | assign_list | assign_plus_query | query | equality |
            u_block | number | id | id_list | guess | guess_list | expr |
            condition | piecewise_assign | insert_matrix | scatter_plot_query |
            parametric_plot_query)? EOF;

scatter_plot_query: (( L_PAREN expr COMMA expr R_PAREN ) | ( expr COMMA expr )) AS_LINES? EQ (( L_PAREN u_block COMMA u_block R_PAREN ) | ( u_block COMMA u_block ))?;

parametric_plot_query: ( L_PAREN expr COMMA expr R_PAREN ) for_id=ID L_PAREN argument R_PAREN (points_id_0=ID num_points=number points_id_1=ID)? EQ (( L_PAREN u_block COMMA u_block R_PAREN ) | ( u_block COMMA u_block ))?;

insert_matrix: .*? (u_insert_matrix .*?)+;

id: ID ;

number: SUB? NUMBER ;

number_with_units: (number | PI | id) u_block;

assign: (id | PI) EQ expr ; // recognize PI here so that error can be generated for assigning to pi

assign_list: assign (COMMA assign)+;

assign_plus_query: assign EQ (u_block)?;

query: expr EQ (u_block)? ;

equality: expr EQ expr ;

piecewise_assign: (id | PI) EQ id L_PAREN ( piecewise_arg (COMMA piecewise_arg)*) R_PAREN ;

piecewise_arg: L_PAREN expr COMMA condition R_PAREN;

trig_function: BACKSLASH? (CMD_SIN | CMD_COS | CMD_TAN | CMD_COT | CMD_SEC | CMD_CSC
             | CMD_ARCSIN | CMD_ARCCOS | CMD_ARCTAN | CMD_SINH | CMD_COSH
             | CMD_TANH | CMD_COTH) L_PAREN expr R_PAREN
             ;

indefinite_integral_cmd: (CMD_INT | (CMD_INT_UNDERSCORE L_BRACE R_BRACE CARET L_BRACE R_BRACE)) L_PAREN expr R_PAREN 
    (CMD_MATHRM L_BRACE id R_BRACE | id) L_PAREN id R_PAREN ;

integral_cmd: ((CMD_INT_UNDERSCORE L_BRACE lower_lim_expr=expr R_BRACE) | 
    (CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER | CMD_INT_UNDERSCORE_SINGLE_CHAR_ID))    
    ((CARET L_BRACE upper_lim_expr=expr R_BRACE) | (CARET_SINGLE_CHAR_ID | CARET_SINGLE_CHAR_NUMBER))
    L_PAREN integrand_expr=expr R_PAREN 
    (CMD_MATHRM L_BRACE id R_BRACE | id) L_PAREN id R_PAREN ;

derivative_cmd: CMD_FRAC L_BRACE (MATHRM_0=CMD_MATHRM L_BRACE id R_BRACE | id) R_BRACE L_BRACE 
    (MATHRM_1=CMD_MATHRM L_BRACE id R_BRACE | id) L_PAREN id R_PAREN R_BRACE L_PAREN expr R_PAREN;

n_derivative_cmd: CMD_FRAC 
    L_BRACE (MATHRM_0=CMD_MATHRM L_BRACE id R_BRACE | id)  ((CARET L_BRACE number R_BRACE) | single_char_exp1=CARET_SINGLE_CHAR_NUMBER) R_BRACE
    L_BRACE (MATHRM_1=CMD_MATHRM L_BRACE id R_BRACE | id) L_PAREN id R_PAREN ((CARET L_BRACE number R_BRACE) | single_char_exp2=CARET_SINGLE_CHAR_NUMBER) R_BRACE L_PAREN expr R_PAREN;

argument: (id EQ expr) | (expr lower=(LT | LTE)  id upper=(LT | LTE) expr);

condition: condition_single | condition_chain;

id_list: id (COMMA id)+;

guess: id (CMD_SIM | CMD_APPROX) (number | number_with_units) ;

guess_list: guess (COMMA guess)+;

condition_single: expr operator=(LT | LTE | GT | GTE ) expr; 

condition_chain: expr lower=(LT | LTE | GT | GTE ) expr upper=(LT | LTE | GT | GTE ) expr;

matrix_row: expr (AMPERSAND expr)*;

user_function: id L_PAREN (argument (COMMA argument)*) R_PAREN (points_id_0=ID num_points=number points_id_1=ID)? ;

builtin_function: (CMD_MATHRM L_BRACE id R_BRACE | id) L_PAREN (expr (COMMA expr)*) R_PAREN;

expr: <assoc=right> id CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT            #exponent
    | <assoc=right> id (CARET_SINGLE_CHAR_ID | CARET_SINGLE_CHAR_NUMBER) UNDERSCORE_SUBSCRIPT #exponent
    | <assoc=right> id CARET L_BRACE expr R_BRACE UNDERSCORE_SUBSCRIPT      #exponent
    | <assoc=right> expr (CARET_SINGLE_CHAR_ID | CARET_SINGLE_CHAR_NUMBER)  #exponent
    | <assoc=right> expr CARET L_BRACE expr R_BRACE                         #exponent
    | expr UNDERSCORE L_BRACE expr COMMA expr R_BRACE                       #index
    | expr TRANSPOSE                                                        #transpose
    | expr EXCLAMATION                                                      #factorial
    | CMD_SQRT_INT                                                          #singleIntSqrt
    | CMD_SQRT L_BRACE expr R_BRACE                                         #sqrt
    | BEGIN_MATRIX matrix_row (DOUBLE_BACKSLASH matrix_row)* END_MATRIX     #matrix
    | trig_function                                                         #trigFunction
    | indefinite_integral_cmd                                               #indefiniteIntegral
    | integral_cmd                                                          #integral
    | derivative_cmd                                                        #derivative
    | n_derivative_cmd                                                      #nDerivative
    | BACKSLASH? CMD_LN L_PAREN expr R_PAREN                                #ln
    | BACKSLASH? CMD_LOG L_PAREN expr R_PAREN                               #log
    | CMD_SLASH_LOG_UNDERSCORE L_BRACE expr R_BRACE L_PAREN expr R_PAREN    #baseLog
    | (CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID | CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER) L_PAREN expr R_PAREN #baseLogSingleChar
    | DOUBLE_VBAR expr DOUBLE_VBAR                                          #norm
    | VBAR expr VBAR                                                        #abs
    | number_with_units                                                     #numberWithUnitsExpr
    | number                                                                #numberExpr
    | SUB expr                                                              #unaryMinus
    | expr CMD_TIMES expr                                                   #matrixMultiply
    | expr CMD_CDOT expr                                                    #multiply
    | CMD_FRAC L_BRACE expr R_BRACE L_BRACE expr R_BRACE                    #divide
    | CMD_FRAC_INTS                                                         #divideInts
    | expr SUB expr                                                         #subtract
    | expr ADD expr                                                         #add
    | id                                                                    #variable
    | user_function                                                         #userFunction
    | builtin_function                                                      #builtinFunction
    | PI                                                                    #piExpr
    | L_PAREN expr R_PAREN                                                  #subExpr
    | expr UNDERSCORE L_BRACE R_BRACE                                       #emptySubscript
    | expr CARET L_BRACE R_BRACE                                            #emptySuperscript
    | expr id                                                               #missingMultiplication
    | expr number                                                           #missingMultiplication
    | expr number_with_units                                                #missingMultiplication
    | expr PI                                                               #missingMultiplication
    | number expr                                                           #missingMultiplication
    | number_with_units expr                                                #missingMultiplication
    | PI expr                                                               #missingMultiplication
    | expr user_function                                                    #missingMultiplication
    | expr builtin_function                                                 #missingMultiplication
    | expr trig_function                                                    #missingMultiplication
    | expr indefinite_integral_cmd                                          #missingMultiplication
    | expr integral_cmd                                                     #missingMultiplication
    | expr derivative_cmd                                                   #missingMultiplication
    | expr n_derivative_cmd                                                 #missingMultiplication
    | CMD_PLACEHOLDER (L_BRACE R_BRACE)?                                    #emptyPlaceholder
    | (CMD_MATHRM L_BRACE expr R_BRACE)? (DECIMAL_POINT | number | EQ)? CMD_MATHRM L_BRACE expr R_BRACE (DECIMAL_POINT | number | EQ)? #removeOperatorFont
    ;


u_block: (L_BRACKET | ALT_L_BRACKET) u_expr (R_BRACKET | ALT_R_BRACKET);

u_insert_matrix: (L_BRACKET | ALT_L_BRACKET) numRows=(U_NUMBER | U_ONE) (U_COMMA | U_CMD_TIMES) numColumns=(U_NUMBER | U_ONE) (R_BRACKET | ALT_R_BRACKET) ;

u_fraction: U_CMD_FRAC U_L_BRACE (U_NUMBER | U_ONE) U_R_BRACE U_L_BRACE U_NUMBER U_R_BRACE 
    | U_CMD_FRAC_INTS;

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