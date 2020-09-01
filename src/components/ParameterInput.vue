<template>
    <div class="parameter-input">
        <input v-model="value.name"
               @input="$emit('input', value)"
               class="variable-name-field"/>
        <span>=</span>
        <input v-model="value.value"
               @input="check_value"
               v-bind:class="{'not-valid':!value.value_valid}"
               class="value-field"/><span/>
        <input v-model="value.units"
               @input="check_units"
               v-bind:class="{'not-valid':!value.units_valid}"
               class="units-field"/><span/>
    </div>
</template>


<script>
import { unit } from 'mathjs'

export default {
    props: ['value'],
    methods: {
        check_units: function(){
            try {
                unit(this.value.units);
                this.value.units_valid = true;
            }
            catch(e){
                this.value.units_valid = false;
            }
            this.$emit('input', this.value)
        },
        check_value: function(){
            this.value.value_valid = !isNaN(this.value.value) && !(this.value.value == '')
            this.$emit('input', this.value)
        }
    },
}
</script>


<style scoped>
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
</style>