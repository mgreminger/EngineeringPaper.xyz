<template>
  <div id="app">
    <h2>MathLive with Vue.js</h2>
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
          :config="{smartFence:true, virtualKeyboardMode:'off'}"
          v-model="equation.formula">{{equation.formula}}</mathlive-mathfield>
        <button @click="delete_equation(equation.id)">Delete</button>
        <div class="output">LaTeX: {{equation.formula}}</div>
      </div>
    </div>
    <div>
      <span>Result: {{result}}</span>
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
        parameters: this.$parameters,
        next_parameter_id: 0,
        next_equation_id: 0,
        equations: this.$equations,
      }
    },
  methods: {add_parameter: function(){
      this.parameters.push({id:this.next_parameter_id++, name:'', value:'',
                            units:'', color:'black'});
      },
      add_equation: function(){
        this.equations.push({id:this.next_equation_id++, forumula:''});
      },
      delete_parameter: function(id){
        let index = this.parameters.map(x => x.id).indexOf(id)
        this.parameters.splice(index,1)
      },
      delete_equation: function(id){
        let index = this.equations.map(x => x.id).indexOf(id)
        this.equations.splice(index,1)
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
      } 
    },
  computed: {
    result: function(){
      if(this.equations.length > 0 && this.parameters.length > 0){
        return this.$pyodide.runPython(`
try:
  equalities = [parse_latex(equation['formula']) for equation in js.equations]

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
  parameter_subs = {param['name']:float(param['value']) for param in js.parameters}
  final_equality = sympy.Eq(final_equality.lhs, final_equality.rhs.subs(parameter_subs))

  result = f"{final_equality.lhs.name} = {final_equality.rhs.evalf()}"
except:
  result = 'Undefined'

result
        `);
      } else {
        return 'Enter at least one parameter and one equation.';
      }
    },
  }
}
</script>


<style>
    @import '../node_modules/mathlive/dist/mathlive-static.css';
</style>
