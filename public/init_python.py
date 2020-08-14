import sympy
from sympy.parsing.latex import parse_latex, LaTeXParsingError

from sympy.physics.units import mass, length, time, current,\
                                temperature, luminous_intensity,\
                                amount_of_substance
from sympy.physics.units.systems.mksa import dims

from sympy.physics.units.systems.si import dimsys_SI

import js

# maps from mathjs dimensions object to sympy dimensions (7:angle and 8:bit are not currently suported by sympy)
dim_map = {0:mass, 1:length, 2:time, 3:current, 4:temperature, 5:luminous_intensity,
           6:amount_of_substance}

inv_dim_map = {str(value.name):key for key, value in dim_map.items()}

# base units as defined by mathjs
base_units = { (0, 0, 0, 0, 0, 0, 0, 0, 0) : ('', ),
               (1, 0, 0, 0, 0, 0, 0, 0, 0) : ('kg', ),
               (0, 1, 0, 0, 0, 0, 0, 0, 0) : ('m', ),
               (0, 0, 1, 0, 0, 0, 0, 0, 0) : ('sec', ),
               (0, 0, 0, 1, 0, 0, 0, 0, 0) : ('ampere', ),
               (0, 0, 0, 0, 1, 0, 0, 0, 0) : ('kelvin', ),
               (0, 0, 0, 0, 0, 1, 0, 0, 0) : ('candela', ),
               (0, 0, 0, 0, 0, 0, 1, 0, 0) : ('mole', ),
               (1, 1, -2, 0, 0, 0, 0, 0, 0) : ('N', ),
               (0, 2, 0, 0, 0, 0, 0, 0, 0) : ('m^2', ),
               (0, 3, 0, 0, 0, 0, 0, 0, 0) : ('m^3', ),
               (1, 2, -2, 0, 0, 0, 0, 0, 0) : ('J', ),
               (1, 2, -3, 0, 0, 0, 0, 0, 0) : ('W', ),
               (1, -1, -2, 0, 0, 0, 0, 0, 0) : ('Pa', ),
               (0, 0, 1, 1, 0, 0, 0, 0, 0) : ('coulomb', ),
               (-1, -2, 4, 2, 0, 0, 0, 0, 0) : ('farad', ),
               (1, 2, -3, -1, 0, 0, 0, 0, 0) : ('V', ),
               (1, 2, -3, -2, 0, 0, 0, 0, 0) : ('ohm', ),
               (1, 2, -2, -2, 0, 0, 0, 0, 0) : ('henry', ),
               (-1, -2, 3, 2, 0, 0, 0, 0, 0) : ('siemens', ),
               (1, 2, -2, -1, 0, 0, 0, 0, 0) : ('weber', ),
               (1, 0, -2, -1, 0, 0, 0, 0, 0) : ('tesla', ),
               (0, 0, -1, 0, 0, 0, 0, 0, 0) : ('Hz', ),
               (0, 0, 0, 0, 0, 0, 0, 1, 0) : ('rad', ),
               (0, 0, 0, 0, 0, 0, 0, 0, 1) : ('bits', ) }


# map the sympy dimensional dependences to mathjs dimensions
def get_mathjs_units(dimensional_dependencies):
    print(dimensional_dependencies)

    mathjs_dims = [0]*9

    for name, exp in dimensional_dependencies.items():
        mathjs_dims[inv_dim_map[name]] += exp

    mathjs_unit_name = base_units.get(tuple(mathjs_dims))[0]

    if mathjs_unit_name is None:
        mathjs_unit_name = ''
        for i, exp in enumerate(mathjs_dims):
            key = [0]*9
            key[i] = 1
            name = base_units.get(tuple(key))[0]
            if mathjs_unit_name == '':
                mathjs_unit_name = f'{name}^{exp}'
            else:
                mathjs_unit_name = f'{mathjs_unit_name}*{name}^{exp}'

    return mathjs_unit_name


def get_dims(dimensions):
    dims = sympy.Mul(1, *[dim_map[int(i)]**value for i, value in enumerate(dimensions) if value != 0.0])
    return dims

def dimensional_analysis(parameters, final_equality):
    # sub parameter dimensions
    parameter_subs = {param['name']:get_dims(param['dimensions']) for param in parameters}
    print(parameter_subs)
    final_equation = final_equality.rhs.subs(parameter_subs)

    result = get_mathjs_units(dimsys_SI.get_dimensional_dependencies(final_equation))

    return result

class NoEquality(Exception):
    pass

class ParameterError(Exception):
    pass

def evaluate_equations(parameters, equations):
    result = None
    try:
        equalities = [parse_latex(equation['formula']) for equation in equations]

        for equality in equalities:
            if isinstance(equality, sympy.Symbol):
                raise NoEquality

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
        parameter_subs = {param['name']:float(param['si_value']) for param in parameters if param['si_value']}
        if len(parameter_subs) < len(parameters):
            raise ParameterError
        
        final_equality = sympy.Eq(final_equality.lhs, final_equality.rhs.subs(parameter_subs))

        result = f"{final_equality.lhs.name} = {final_equality.rhs.evalf()} {dimensional_analysis(parameters, final_equality)}"
    except LaTeXParsingError:
        result = 'Latex Parsing Error'
    except NoEquality:
        result = 'Missing Equality'
    except ParameterError:
        result = 'Parameter Error'

    return result