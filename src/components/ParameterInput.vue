<template>
    <div class="parameter-input">
        <input v-model="value.name"
               @input="$emit('input', value)"/>
        <input v-model="value.value"
               @input="$emit('input', value)"/>
        <input v-model="value.units"
               v-bind:style="units_style"
               @input="check_units"/>
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
</style>