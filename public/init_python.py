import sympy
from sympy.parsing.latex import parse_latex
import js

def evaluate_equations(parameters, equations):
    result = None
    try:
        equalities = [parse_latex(equation['formula']) for equation in equations]

        # sub equations into eachother in order if there are more than one
        for i, equality in enumerate(reversed(equalities)):
            if i == 0:
                final_equality = equality
            else:
                final_equality = sympy.Eq(final_equality.lhs,
                                          final_equality.rhs.subs({
                                              equality.lhs.name : equality.rhs
                                          }))

        # sub parameter values
        parameter_subs = {param['name']:float(param['value']) for param in parameters}
        final_equality = sympy.Eq(final_equality.lhs, final_equality.rhs.subs(parameter_subs))

        result = f"{final_equality.lhs.name} = {final_equality.rhs.evalf()}"
    except:
        result = 'Undefined'

    return result