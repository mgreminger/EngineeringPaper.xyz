import Vue from 'vue';

// import MathLive from "mathlive";
// import Mathfield from "mathlive";

// import MathLive from "https://unpkg.com/mathlive/dist/mathlive.mjs";
// import Mathfield from "https://unpkg.com/mathlive/dist/vue-mathlive.mjs";

// import MathLive from "../node_modules/mathlive/dist/mathlive.mjs";
// import Mathfield from "../node_modules/mathlive/dist/vue-mathlive.mjs";

// import "../node_modules/mathlive/dist/mathlive-static.css"
// import "../node_modules/mathlive/dist/mathlive-fonts.css"

import App from './App.vue';


Vue.config.productionTip = false;
Vue.config.devtools = true;

window.languagePluginLoader.then(() => {
  console.log("Python ready")
  window.pyodide.loadPackage("micropip").then(() => {
    window.pyodide.loadPackage("http://localhost:8080/assets/pyodide/mpmath.js").then(() => {
      window.pyodide.loadPackage("http://localhost:8080/assets/pyodide/sympy.js").then(() => {

        console.log(window.pyodide.runPython(`
        def do_work(*args):
          import parse_latex
          print(parse_latex(r'\frac{1}{2}+\sqrt{\pi}-s'))
    
        import micropip
        micropip.install('antlr4-python3-runtime').then(do_work)
        `))   
      })
    })
  })
});


console.log('got here 2')

// Vue.use(Mathfield, MathLive)


new Vue({
  render: h => h(App)
}).$mount('#app');

