<template>
  <div id="app">
    <h2>EngineeringPaper</h2>
    <button @click="add_parameter">Add Parameter</button>
    <button @click="add_equation">Add Equation</button>
    <parameter-input v-for="param in parameters" :key="'parameters'+param.id"
                     v-model="param.param"
                     @delete-parameter="delete_parameter(param.id)">
    </parameter-input>
    <equation-input v-for="equation in equations" :key="'equations'+equation.id"
                    v-model="equation.equation"
                    @delete-equation="delete_equation(equation.id)">
    </equation-input>
    <div>
      <h3>Result: {{result}}</h3>
    </div>
  </div>
</template>

<script>
import parameter_input from './components/InputParameter'
import equation_input from './components/EquationInput'
import { unit } from 'mathjs'

export default {
  name: "app",
  components: {
    'parameter-input' : parameter_input,
    'equation-input' : equation_input
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
        this.parameters.push({param: {name:'', value:'',
                                      units:'', color:'black'},
                              id: this.next_parameter_id++});
      },
      add_equation: function(){
        this.equations.push({equation: {formula:''},
                             id: this.next_equation_id++});
      },
      delete_parameter: function(id){
        this.parameters = this.parameters.filter(x => x.id != id)
      },
      delete_equation: function(id){
        this.equations = this.equations.filter(x => x.id != id)
      },
    },
  computed: {
    result: function(){
      if(this.equations.length > 0 && this.parameters.length > 0 && this.$pyodide_ready){

        for (let param of this.parameters){
            if (param.param.color == 'black') {
              let user_unit = unit(`${param.param.value} ${param.param.units}`);
              param.param.dimensions = user_unit.dimensions
              param.param.si_value = user_unit.value
            } else {
              param.param.dimensions = [0, 0, 0, 0, 0, 0, 0, 0, 0]
              param.param.si_value = param.param.value
            }
        } 

        let py_parameters = this.parameters.map(x => x.param)
        let py_equations = this.equations.map(x => x.equation)

        return this.$py_funcs.evaluate_equations(py_parameters, py_equations);
      } else {
        return 'Enter at least one parameter and one equation.';
      }
    },
  }
}
</script>


<style>
</style>
