<template>
  <div id="app">
    <h2>EngineeringPaper</h2>
    <button @click="add_parameter">Add Parameter</button>
    <button @click="add_equation">Add Equation</button>
    <ep-cell v-for="cell in cells" :key="'cell'+cell.id"
                     v-model="cell.data"
                     :type="cell.type"
                     @delete="delete_cell(cell.id)"
                     @move-up="move_up(cell.id)"
                     @move-down="move_down(cell.id)">
    </ep-cell>
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
          data: {name:'', value:'',
                units:'', units_valid:true},
          id: this.next_cell_id++});
      },
      add_equation: function(){
        this.cells.push({
          type: 'equation',
          data: {formula:'', result:'', units:''},
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
      update_results: function(cells, old_cells){
        let error = false
        if(this.cells.length > 0 && this.$pyodide_ready){

          let parameters = this.cells.filter(x => x.type == 'parameter').map(x => x.data)
          let equations = this.cells.filter(x => x.type == 'equation').map(x => x.data)
        
          if(parameters.length == 0 || equations.length == 0){
            error=true;
          } else {

            for (let param of parameters){
                if (param.units_valid) {
                  let user_unit = unit(`${param.value} ${param.units}`);
                  param.dimensions = user_unit.dimensions
                  param.si_value = user_unit.value
                } else {
                  param.dimensions = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                  param.si_value = param.value
                }
            } 

            let results = this.$py_funcs.evaluate_equations(parameters, equations);
            if(results){
              let results_array = results[0]
              let units_array = results[1]
              
              let index = 0
              for(let cell of this.cells){
                if(cell.type=='equation'){
                  cell.data.result = results_array[index]
                  cell.data.units = units_array[index++]
                  console.log(cell.data.result, cell.data.units)
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
          for(let cell of this.cells){
            if(cell.type=='equation'){
              cell.data.result = ''
              cell.data.units = ''
              console.log(cell.data.result, cell.data.units)
            }
          }
        }
      },
    },
  watch: {
    cells:{ 
      handler: 'update_results',
      deep: true
    },
  }
}
</script>


<style>
</style>
