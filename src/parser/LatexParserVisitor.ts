// Generated from LatexParser.g4 by ANTLR 4.12.0

import {ParseTreeVisitor} from 'antlr4';


import { IdContext } from "./LatexParser";
import { NumberContext } from "./LatexParser";
import { Number_with_unitsContext } from "./LatexParser";
import { StatementContext } from "./LatexParser";
import { AssignContext } from "./LatexParser";
import { QueryContext } from "./LatexParser";
import { EqualityContext } from "./LatexParser";
import { Piecewise_assignContext } from "./LatexParser";
import { Piecewise_argContext } from "./LatexParser";
import { Trig_functionContext } from "./LatexParser";
import { Indefinite_integral_cmdContext } from "./LatexParser";
import { Integral_cmdContext } from "./LatexParser";
import { Derivative_cmdContext } from "./LatexParser";
import { N_derivative_cmdContext } from "./LatexParser";
import { ArgumentContext } from "./LatexParser";
import { ConditionContext } from "./LatexParser";
import { Id_listContext } from "./LatexParser";
import { GuessContext } from "./LatexParser";
import { Guess_listContext } from "./LatexParser";
import { Condition_singleContext } from "./LatexParser";
import { Condition_chainContext } from "./LatexParser";
import { AddContext } from "./LatexParser";
import { LnContext } from "./LatexParser";
import { LogContext } from "./LatexParser";
import { BuiltinFunctionContext } from "./LatexParser";
import { NumberExprContext } from "./LatexParser";
import { SubtractContext } from "./LatexParser";
import { PiExprContext } from "./LatexParser";
import { TrigContext } from "./LatexParser";
import { DerivativeContext } from "./LatexParser";
import { SubExprContext } from "./LatexParser";
import { NDerivativeContext } from "./LatexParser";
import { AbsContext } from "./LatexParser";
import { SqrtContext } from "./LatexParser";
import { IntegralContext } from "./LatexParser";
import { FunctionContext } from "./LatexParser";
import { IndefiniteIntegralContext } from "./LatexParser";
import { UnaryMinusContext } from "./LatexParser";
import { VariableContext } from "./LatexParser";
import { NumberWithUnitsExprContext } from "./LatexParser";
import { DivideContext } from "./LatexParser";
import { MultiplyContext } from "./LatexParser";
import { BaseLogContext } from "./LatexParser";
import { ExponentContext } from "./LatexParser";
import { UnitBlockContext } from "./LatexParser";
import { U_fractionContext } from "./LatexParser";
import { UnitSubExprContext } from "./LatexParser";
import { UnitExponentContext } from "./LatexParser";
import { UnitDivideContext } from "./LatexParser";
import { UnitMultiplyContext } from "./LatexParser";
import { UnitNameContext } from "./LatexParser";
import { UnitSqrtContext } from "./LatexParser";
import { UnitFractionalExponentContext } from "./LatexParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `LatexParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class LatexParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `LatexParser.id`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitId?: (ctx: IdContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.number_with_units`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber_with_units?: (ctx: Number_with_unitsContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssign?: (ctx: AssignContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.query`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery?: (ctx: QueryContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.equality`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEquality?: (ctx: EqualityContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.piecewise_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPiecewise_assign?: (ctx: Piecewise_assignContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.piecewise_arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPiecewise_arg?: (ctx: Piecewise_argContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.trig_function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrig_function?: (ctx: Trig_functionContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.indefinite_integral_cmd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndefinite_integral_cmd?: (ctx: Indefinite_integral_cmdContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.integral_cmd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegral_cmd?: (ctx: Integral_cmdContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.derivative_cmd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDerivative_cmd?: (ctx: Derivative_cmdContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.n_derivative_cmd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_derivative_cmd?: (ctx: N_derivative_cmdContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.argument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgument?: (ctx: ArgumentContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition?: (ctx: ConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.id_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitId_list?: (ctx: Id_listContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.guess`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGuess?: (ctx: GuessContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.guess_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGuess_list?: (ctx: Guess_listContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.condition_single`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition_single?: (ctx: Condition_singleContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.condition_chain`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition_chain?: (ctx: Condition_chainContext) => Result;
	/**
	 * Visit a parse tree produced by the `add`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdd?: (ctx: AddContext) => Result;
	/**
	 * Visit a parse tree produced by the `ln`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLn?: (ctx: LnContext) => Result;
	/**
	 * Visit a parse tree produced by the `log`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLog?: (ctx: LogContext) => Result;
	/**
	 * Visit a parse tree produced by the `builtinFunction`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBuiltinFunction?: (ctx: BuiltinFunctionContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberExpr`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberExpr?: (ctx: NumberExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `subtract`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubtract?: (ctx: SubtractContext) => Result;
	/**
	 * Visit a parse tree produced by the `piExpr`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPiExpr?: (ctx: PiExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `trig`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrig?: (ctx: TrigContext) => Result;
	/**
	 * Visit a parse tree produced by the `derivative`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDerivative?: (ctx: DerivativeContext) => Result;
	/**
	 * Visit a parse tree produced by the `subExpr`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubExpr?: (ctx: SubExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `nDerivative`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNDerivative?: (ctx: NDerivativeContext) => Result;
	/**
	 * Visit a parse tree produced by the `abs`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAbs?: (ctx: AbsContext) => Result;
	/**
	 * Visit a parse tree produced by the `sqrt`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSqrt?: (ctx: SqrtContext) => Result;
	/**
	 * Visit a parse tree produced by the `integral`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegral?: (ctx: IntegralContext) => Result;
	/**
	 * Visit a parse tree produced by the `function`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction?: (ctx: FunctionContext) => Result;
	/**
	 * Visit a parse tree produced by the `indefiniteIntegral`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndefiniteIntegral?: (ctx: IndefiniteIntegralContext) => Result;
	/**
	 * Visit a parse tree produced by the `unaryMinus`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryMinus?: (ctx: UnaryMinusContext) => Result;
	/**
	 * Visit a parse tree produced by the `variable`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberWithUnitsExpr`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberWithUnitsExpr?: (ctx: NumberWithUnitsExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `divide`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDivide?: (ctx: DivideContext) => Result;
	/**
	 * Visit a parse tree produced by the `multiply`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiply?: (ctx: MultiplyContext) => Result;
	/**
	 * Visit a parse tree produced by the `baseLog`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBaseLog?: (ctx: BaseLogContext) => Result;
	/**
	 * Visit a parse tree produced by the `exponent`
	 * labeled alternative in `LatexParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExponent?: (ctx: ExponentContext) => Result;
	/**
	 * Visit a parse tree produced by the `unitBlock`
	 * labeled alternative in `LatexParser.u_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitBlock?: (ctx: UnitBlockContext) => Result;
	/**
	 * Visit a parse tree produced by `LatexParser.u_fraction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitU_fraction?: (ctx: U_fractionContext) => Result;
	/**
	 * Visit a parse tree produced by the `unitSubExpr`
	 * labeled alternative in `LatexParser.u_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitSubExpr?: (ctx: UnitSubExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `unitExponent`
	 * labeled alternative in `LatexParser.u_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitExponent?: (ctx: UnitExponentContext) => Result;
	/**
	 * Visit a parse tree produced by the `unitDivide`
	 * labeled alternative in `LatexParser.u_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitDivide?: (ctx: UnitDivideContext) => Result;
	/**
	 * Visit a parse tree produced by the `unitMultiply`
	 * labeled alternative in `LatexParser.u_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitMultiply?: (ctx: UnitMultiplyContext) => Result;
	/**
	 * Visit a parse tree produced by the `unitName`
	 * labeled alternative in `LatexParser.u_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitName?: (ctx: UnitNameContext) => Result;
	/**
	 * Visit a parse tree produced by the `unitSqrt`
	 * labeled alternative in `LatexParser.u_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitSqrt?: (ctx: UnitSqrtContext) => Result;
	/**
	 * Visit a parse tree produced by the `unitFractionalExponent`
	 * labeled alternative in `LatexParser.u_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitFractionalExponent?: (ctx: UnitFractionalExponentContext) => Result;
}

