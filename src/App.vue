<template>
  <div id="app">
    <h2>EngineeringPaper</h2>
    <button @click="add_parameter">Add Parameter</button>
    <button @click="add_equation">Add Equation</button>
    <div v-for="param in parameters" :key="'parameters'+param.id">
        <div>
          <input v-model="param.name"/>
          <input v-model="param.value"/>
          <input v-model="param.units"
                 v-bind:style="{color:param.color}"
                 @input="check_units(param.id)"/>
          <button @click="delete_parameter(param.id)">Delete</button>
        </div>
    </div>
    <div v-for="equation in equations" :key="'equations'+equation.id">
      <div>
        <mathlive-mathfield
          :id="'mf'+equation.id"
          ref="mathfield" 
          :config="{smartFence:true, virtualKeyboardMode:'manual'}"
          v-model="equation.formula">{{equation.formula}}</mathlive-mathfield>
        <button @click="delete_equation(equation.id)">Delete</button>
        <div class="output">LaTeX: {{equation.formula}}</div>
      </div>
    </div>
    <div>
      <h3>Result: {{result}}</h3>
    </div>
  </div>
</template>

<script>
import mathfield from './components/Mathfield'
import { unit } from 'mathjs'

export default {
  name: "app",
  components: {
    'mathlive-mathfield' : mathfield
  },
  data: function () {
      return {
        parameters: [],
        next_parameter_id: 0,
        next_equation_id: 0,
        equations: [],
      }
    },
  methods: {add_parameter: function(){
        this.parameters.push({id:this.next_parameter_id++, name:'', value:'',
                              units:'', color:'black'});
      },
      add_equation: function(){
        this.equations.push({id:this.next_equation_id++, formula:''});
      },
      delete_parameter: function(id){
        this.parameters = this.parameters.filter(x => x.id != id)
      },
      delete_equation: function(id){
        this.equations = this.equations.filter(x => x.id != id)
      },
      check_units: function(id){
        for(var param of this.parameters){
          if(param.id == id)
          {
            try {
              unit(param.units);
              param.color = 'black';
            }
            catch(e){
              param.color = 'red';
            }
          }
        }
      },
    },
  computed: {
    result: function(){
      if(this.equations.length > 0 && this.parameters.length > 0 && this.$pyodide_ready){

        for (var param of this.parameters){
            if (param.color == 'black') {
              let user_unit = unit(`${param.value} ${param.units}`);
              param.dimensions = user_unit.dimensions
              param.si_value = user_unit.value
            } else {
              param.dimensions = [0, 0, 0, 0, 0, 0, 0, 0, 0]
              param.si_value = param.value
            }
        } 

        return this.$call_python_func('evaluate_equations', this.parameters, this.equations);
      } else {
        return 'Enter at least one parameter and one equation.';
      }
    },
  }
}
</script>


<style>
</style>
