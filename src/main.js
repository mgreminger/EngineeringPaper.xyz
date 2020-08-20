import Vue from 'vue';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$pyodide_ready = false

window.languagePluginLoader
.then(() => window.pyodide.loadPackage("antlr4-python3-runtime"))
.then(() => window.pyodide.loadPackage("mpmath"))
.then(() => window.pyodide.loadPackage("sympy"))
.then(() => {fetch("init_python.py")
             .then(response => response.text())
             .then((data) => {
               window.pyodide.runPython(data)
               Vue.prototype.$py_funcs = window.pyodide.runPython('py_funcs')
               console.log('Python Ready')
               Vue.prototype.$pyodide_ready = true
             })
            })
.catch(() => console.log('Python loading failed.'))


new Vue({
  render: h => h(App)
}).$mount('#app');
