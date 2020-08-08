import Vue from 'vue';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$pyodide_ready = false

window.python_args = []
Vue.prototype.$call_python_func = function(name, ...args){
  window.python_args.push(...args);
  let result = window.pyodide.runPython(`
${name}(*js.python_args)
  `);
  window.python_args.length = 0;
  return result;
}

window.languagePluginLoader
.then(() => window.pyodide.loadPackage("http://localhost:8080/antlr4-python3-runtime.js"))
.then(() => window.pyodide.loadPackage("http://localhost:8080/mpmath.js"))
.then(() => window.pyodide.loadPackage("http://localhost:8080/sympy.js"))
.then(() => {Vue.prototype.$pyodide_ready = true;
             Vue.prototype.$pyodide = window.pyodide;
             window.pyodide.runPython(`
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

`);
             console.log('Python Ready')})
.catch(() => console.log('Python loading failed.'))


new Vue({
  render: h => h(App)
}).$mount('#app');
