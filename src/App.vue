<template>
  <div v-if="$root.pyodide_ready" id="app">
    <h2>EngineeringPaper</h2>
    <button @click="add_parameter">Add Parameter</button>
    <button @click="add_equation">Add Equation</button>
    <ep-cell v-for="(cell, index) in cells" :key="'cell'+cell.id"
                     v-model="cell.data"
                     :type="cell.type"
                     :output="cell_outputs[index]"
                     @delete="delete_cell(cell.id)"
                     @move-up="move_up(cell.id)"
                     @move-down="move_down(cell.id)">
    </ep-cell>
  </div>
  <div v-else>
    <h1>EngineeringPaper loading, please wait...</h1>
    <p>
      Note that this page is updated frequently and it doesn't yet
      properly inform the browser when to update its cache. Because of this,
      you may need to force a cache update on this page if you have
      prevously loaded it and it is not working properly.
    </p>
  </div>
</template>

<script>
import cell from './components/Cell'
import { unit } from 'mathjs'

export default {
  name: "app",
  components: {
    'ep-cell': cell
  },
  data: function () {
      return {
        cells: [],
        next_cell_id: 0,
      }
    },
  methods: {
      add_parameter: function(){
        this.cells.push({
          type: 'parameter',
          data: {name:'', value:'', value_valid:false,
                units:'', units_valid:true},
          id: this.next_cell_id++});
      },
      add_equation: function(){
        this.cells.push({
          type: 'equation',
          data: {formula:'', result:'', units:'', use_user_units:false, user_units:'',
                 user_units_valid:false, conversion_factor:0},
          id: this.next_cell_id++});
      },
      delete_cell: function(id){
        this.cells = this.cells.filter(x => x.id != id)
      },
      move_up: function(id){
        let loc = this.cells.findIndex(x => x.id == id)
        if(loc > 0){
          let new_cells = this.cells.slice(0,loc-1)
          new_cells.push(this.cells[loc])
          new_cells.push(this.cells[loc-1])
          new_cells = new_cells.concat(this.cells.slice(loc+1,this.cells.length+1))
          this.cells = new_cells
        }
      },
      move_down: function(id){
        let loc = this.cells.findIndex(x => x.id == id)
        if(loc < this.cells.length-1){
          let new_cells = this.cells.slice(0,loc)
          new_cells.push(this.cells[loc+1])
          new_cells.push(this.cells[loc])
          new_cells = new_cells.concat(this.cells.slice(loc+2,this.cells.length+1))
          this.cells = new_cells
        }
      },
    },
  computed: {
    cell_outputs: function(){
      let cell_outputs = []
      let error = false
      if(this.cells.length > 0){

        let parameters = this.cells.filter(x => x.type == 'parameter').map(x => x.data)
        let equations = this.cells.filter(x => x.type == 'equation').map(x => x.data)
      
        if(parameters.length == 0 || equations.length == 0){
          error=true;
        } else {

          for (let param of parameters){
              if (param.units_valid && param.value_valid) {
                let user_units = unit(`${param.value} ${param.units}`);
                param.dimensions = user_units.dimensions
                param.si_value = user_units.value
              } else {
                error = true;
                break;
              }
          }

          let results = null

          if(!error){
            results = this.$root.py_funcs.evaluate_equations(parameters, equations);
          }
          if(results){
            let results_array = results[0]
            let units_array = results[1]
            
            let eq_index = 0
            for(let [cell_index,cell] of this.cells.entries()){
              if(cell.type=='equation'){
                cell_outputs[cell_index] = {result: results_array[eq_index],
                                            units: units_array[eq_index]}
                eq_index++
              }
            }
          } else {
            error=true;
          }
        }
      } else {
        error=true;
      }

      // there was an error on the latest pass, removing any lingering results
      if(error){
        for(let [cell_index,cell] of this.cells.entries()){
          if(cell.type=='equation'){
            cell_outputs[cell_index] = {result: '',
                                        units: ''}
          }
        }
      }
      return cell_outputs
    },
  },
}
</script>


<style>
div.parameter-input {
    display: inline-block;
}
input.variable-name-field{
    width: 3em;
}
input.value-field{
    width: 5em;
}
input.units-field{
    width: 5em;
}
input.not-valid + span::after{
    content: '✖';
    color: rgb(131, 12, 12);
}
.equation-input {
    display: inline-block;
}
</style>
