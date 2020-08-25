import sympy
from sympy.parsing.latex import parse_latex, LaTeXParsingError

from sympy.physics.units.definitions.dimension_definitions import \
                                mass, length, time, current,\
                                temperature, luminous_intensity,\
                                amount_of_substance, angle, information

from sympy.physics.units.systems.si import dimsys_SI

# maps from mathjs dimensions object to sympy dimensions
dim_map = {0:mass, 1:length, 2:time, 3:current, 4:temperature, 5:luminous_intensity,
           6:amount_of_substance, 7:angle, 8:information}

inv_dim_map = {str(value.name):key for key, value in dim_map.items()}

# base units as defined by mathjs
base_units = { (0, 0, 0, 0, 0, 0, 0, 0, 0) : '',
               (1, 0, 0, 0, 0, 0, 0, 0, 0) : 'kg',
               (0, 1, 0, 0, 0, 0, 0, 0, 0) : 'm',
               (0, 0, 1, 0, 0, 0, 0, 0, 0) : 'sec',
               (0, 0, 0, 1, 0, 0, 0, 0, 0) : 'ampere',
               (0, 0, 0, 0, 1, 0, 0, 0, 0) : 'kelvin',
               (0, 0, 0, 0, 0, 1, 0, 0, 0) : 'candela',
               (0, 0, 0, 0, 0, 0, 1, 0, 0) : 'mole',
               (1, 1, -2, 0, 0, 0, 0, 0, 0) : 'N',
               (0, 2, 0, 0, 0, 0, 0, 0, 0) : 'm^2',
               (0, 3, 0, 0, 0, 0, 0, 0, 0) : 'm^3',
               (1, 2, -2, 0, 0, 0, 0, 0, 0) : 'J',
               (1, 2, -3, 0, 0, 0, 0, 0, 0) : 'W',
               (1, -1, -2, 0, 0, 0, 0, 0, 0) : 'Pa',
               (0, 0, 1, 1, 0, 0, 0, 0, 0) : 'coulomb',
               (-1, -2, 4, 2, 0, 0, 0, 0, 0) : 'farad',
               (1, 2, -3, -1, 0, 0, 0, 0, 0) : 'V',
               (1, 2, -3, -2, 0, 0, 0, 0, 0) : 'ohm',
               (1, 2, -2, -2, 0, 0, 0, 0, 0) : 'henry',
               (-1, -2, 3, 2, 0, 0, 0, 0, 0) : 'siemens',
               (1, 2, -2, -1, 0, 0, 0, 0, 0) : 'weber',
               (1, 0, -2, -1, 0, 0, 0, 0, 0) : 'tesla',
               (0, 0, -1, 0, 0, 0, 0, 0, 0) : 'Hz',
               (0, 0, 0, 0, 0, 0, 0, 1, 0) : 'rad',
               (0, 0, 0, 0, 0, 0, 0, 0, 1) : 'bits' }

class FuncContainer(object): pass

# map the sympy dimensional dependences to mathjs dimensions
def get_mathjs_units(dimensional_dependencies):
    # print(dimensional_dependencies)

    mathjs_dims = [0]*9

    all_units_recognized = True
    for name, exp in dimensional_dependencies.items():
        dim_index = inv_dim_map.get(name)
        if dim_index is None:
            # this will hapen if the user references a parameter in an equation that has not been defined
            # will eventually want to allow the user to specify the untis for an undefined parameter
            all_units_recognized = False
            break
        mathjs_dims[dim_index] += exp

    if all_units_recognized:
        mathjs_unit_name = base_units.get(tuple(mathjs_dims))

        if mathjs_unit_name is None:
            mathjs_unit_name = ''
            for i, exp in enumerate(mathjs_dims):
                if exp != 0:
                    key = [0]*9
                    key[i] = 1
                    name = base_units.get(tuple(key))
                    if mathjs_unit_name == '':
                        mathjs_unit_name = f'{name}^{exp}'
                    else:
                        mathjs_unit_name = f'{mathjs_unit_name}*{name}^{exp}'
    else:
        mathjs_unit_name = "Dimension Error"

    return mathjs_unit_name


def get_dims(dimensions):
    dims = sympy.Mul(1, *[dim_map[int(i)]**value for i, value in enumerate(dimensions) if value != 0.0])
    return dims

def dimensional_analysis(parameters, final_equality):
    # print(final_equality.rhs)

    # sub parameter dimensions
    parameter_subs = {param['name']:get_dims(param['dimensions']) for param in parameters}
    # print(parameter_subs)
    final_equation = final_equality.rhs.subs(parameter_subs)

    try:
        result = get_mathjs_units(dimsys_SI.get_dimensional_dependencies(final_equation))
    except TypeError:
        result = "Dimension Error"

    return result

class NoEquality(Exception):
    pass

class ParameterError(Exception):
    pass

def evaluate_equations(parameters, equations):
    try:
        equalities = [parse_latex(equation['formula']) for equation in equations]

        # debug printing
        for equation in equations:
            print(equation['formula'])

        for equality in equalities:
            print(equality)

        for equality in equalities:
            if not isinstance(equality, sympy.Eq):
                raise NoEquality

        combined_equalities = []
        for i in range(len(equalities)):
            temp_equalities = equalities[0:i+1]
            # sub equations into eachother in order if there are more than one
            for i, equality in enumerate(reversed(temp_equalities)):
                if i == 0:
                    final_equality = equality
                else:
                    final_equality = sympy.Eq(final_equality.lhs,
                                            final_equality.rhs.subs({
                                                equality.lhs.name : equality.rhs
                                            }))

            combined_equalities.append(final_equality)

        # sub parameter values
        parameter_subs = {param['name']:float(param['si_value']) for param in parameters if param['si_value'] is not None}
        if len(parameter_subs) < len(parameters):
            raise ParameterError
        
        dims = []
        for equality in combined_equalities:
            dims.append(dimensional_analysis(parameters, equality))

        values = []
        for equality in combined_equalities:
            values.append(str(sympy.Eq(equality.lhs, equality.rhs.subs(parameter_subs)).rhs.evalf()))

    except LaTeXParsingError:
        print('Latex Parsing Error')
        return None
    except NoEquality:
        print('Missing Equality')
        return None
    except ParameterError:
        print('Parameter Error')
        return None

    return (values, dims)


py_funcs = FuncContainer()
py_funcs.evaluate_equations = evaluate_equations