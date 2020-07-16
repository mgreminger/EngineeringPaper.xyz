<template>
  <div id="app">
    <h2>MathLive with Vue.js</h2>
    <button @click="add_parameter">Add Parameter</button>
    <button @click="add_equation">Add Equation</button>
    <div v-for="param in parameters" :key="'parameters'+param.id">
        <div>
          <input v-model="param.name"/>
          <input v-model="param.value"/>
          <button @click="delete_parameter(param.id)">Delete</button>
        </div>
    </div>
    <div v-for="equation in equations" :key="'equations'+equation.id">
      <div>
        <mathlive-mathfield
          :id="'mf'+equation.id"
          ref="mathfield" 
          :config="{smartFence:true, virtualKeyboardMode:'off'}"
          v-model="equation.formula">{{equation.formula}}</mathlive-mathfield>
        <button @click="delete_equation(equation.id)">Delete</button>
        <div class="output">LaTeX: {{equation.formula}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import mathfield from './components/Mathfield'
// import Mathfield from "../node_modules/mathlive/dist/vue-mathlive.mjs";

export default {
  name: "app",
  components: {
    'mathlive-mathfield' : mathfield
  },
  data: function () {
      return {
        formula: "g(x)",
        keystroke: "",
        parameters: [],
        next_parameter_id: 0,
        next_equation_id: 0,
        equations: [],
      }
    },
  methods: {add_parameter: function(){
      this.parameters.push({id:this.next_parameter_id++, name:'', value:''});
    },
    add_equation: function(){
      this.equations.push({id:this.next_equation_id++, forumula:'blah'});
    },
    delete_parameter: function(id){
      this.parameters = this.parameters.filter(item => (item.id != id) );
    },
    delete_equation: function(id){
      this.equations = this.equations.filter(item => (item.id != id) );
    }
  }
}
</script>


<style>
    @import '../node_modules/mathlive/dist/mathlive-static.css';
</style>
