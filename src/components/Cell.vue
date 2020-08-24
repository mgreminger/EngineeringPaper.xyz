<template>
    <div class="cell">
        <parameter-input v-if="type == 'parameter'"
                        :value="value"
                        @input="$emit('input', $event)">
        </parameter-input>
        <equation-input v-else-if="type == 'equation'"
                        :value="value"
                        @input="$emit('input', $event)">
        </equation-input>
        <button @click="$emit('delete')">Delete</button>
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
</style>