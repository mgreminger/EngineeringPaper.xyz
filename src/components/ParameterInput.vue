<template>
    <div class="parameter-input">
        <input v-model="value.name"
               @input="$emit('input', value)"
               class="variable-name-field"/>
        <span>=</span>
        <input v-model="value.value"
               @input="$emit('input', value)"
               class="value-field"/>
        <input v-model="value.units"
               v-bind:style="units_style"
               @input="check_units"
               class="units-field"/>
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
    },
    computed: {
        units_style: function () {
            return {color:(this.value.units_valid ? 'black' : 'red')}
        }
    }
}
</script>


<style scoped>
.parameter-input {
    display: inline-block;
}
.variable-name-field{
    width: 3em;
}
.value-field{
    width: 5em;
}
.units-field{
    width: 5em;
}
</style>