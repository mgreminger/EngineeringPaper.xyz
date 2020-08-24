<template>
    <div class="cell">
        <button @click="$emit('move-up')" title="Move Up">&uarr;</button>
        <button @click="$emit('move-down')" title="Move Down">&darr;</button>
        <button class="delete-button" @click="$emit('delete')" title="Delete">x</button>
        <parameter-input v-if="type == 'parameter'"
                        :value="value"
                        @input="$emit('input', $event)">
        </parameter-input>
        <equation-input v-else-if="type == 'equation'"
                        :value="value"
                        @input="$emit('input', $event)">
        </equation-input>
    </div>
</template>


<script>
import parameter_input from './ParameterInput'
import equation_input from './EquationInput'

export default {
    components: {
        'parameter-input': parameter_input,
        'equation-input': equation_input,
    },
    props: ['value', 'type'],
}
</script>


<style scoped>
.cell{
    padding-top: 5px;
    padding-bottom: 5px;
}
.delete-button{
    color: rgb(131, 12, 12);
}
</style>