import Vue from 'vue';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$pyodide_ready = false

window.parameters = []
window.equations = []

Vue.prototype.$parameters = window.parameters
Vue.prototype.$equations = window.equations


window.languagePluginLoader
.then(() => window.pyodide.loadPackage("http://localhost:8080/antlr4-python3-runtime.js"))
.then(() => window.pyodide.loadPackage("http://localhost:8080/mpmath.js"))
.then(() => window.pyodide.loadPackage("http://localhost:8080/sympy.js"))
.then(() => {Vue.prototype.$pyodide_ready = true;
             Vue.prototype.$pyodide = window.pyodide;
             window.pyodide.runPython(`
import sympy
from sympy.parsing.latex import parse_latex
import js`);
             console.log('Python Ready')})
.catch(() => console.log('Python loading failed.'))


new Vue({
  render: h => h(App)
}).$mount('#app');
