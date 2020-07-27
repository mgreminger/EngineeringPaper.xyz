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
  window.pyodide.loadPackage("http://localhost:8080/antlr4-python3-runtime.js").then(() => {
    window.pyodide.loadPackage("http://localhost:8080/mpmath.js").then(() => {
      window.pyodide.loadPackage("http://localhost:8080/sympy.js").then(() => {


        console.log(window.pyodide.runPython(String.raw`
          from sympy.parsing.latex import parse_latex
          print(parse_latex(r'\frac{1}{2}+\sqrt{\pi}-s'))
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

