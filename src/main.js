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
.then(() => window.pyodide.loadPackage("antlr4-python3-runtime"))
.then(() => window.pyodide.loadPackage("mpmath"))
.then(() => window.pyodide.loadPackage("sympy"))
.then(() => {fetch("init_python.py")
             .then(response => response.text())
             .then((data) => {
               window.pyodide.runPython(data)
             })
             Vue.prototype.$pyodide_ready = true;
             console.log('Python Ready')})
.catch(() => console.log('Python loading failed.'))


new Vue({
  render: h => h(App)
}).$mount('#app');
