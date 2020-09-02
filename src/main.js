import Vue from 'vue';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  data: {
    pyodide_ready: false,
    py_funcs: null
  },
  render: h => h(App),
  beforeMount: function(){
    // Load Pyodide
    window.languagePluginLoader
    .then(() => window.pyodide.loadPackage("antlr4-python3-runtime"))
    .then(() => window.pyodide.loadPackage("mpmath"))
    .then(() => window.pyodide.loadPackage("sympy"))
    .then(() => {fetch("init_python.py")
                 .then(response => response.text())
                 .then((data) => {
                   window.pyodide.runPython(data);
                   this.py_funcs = window.pyodide.runPython('py_funcs');
                   console.log('Python Ready');
                   this.pyodide_ready = true
                 })
                })
    .catch(() => console.log('Python loading failed.'))
  }
}).$mount('#app');
