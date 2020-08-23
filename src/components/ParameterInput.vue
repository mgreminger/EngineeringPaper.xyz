<template>
    <div>
        <input v-model="value.name"
               @input="$emit('input', value)"/>
        <input v-model="value.value"
               @input="$emit('input', value)"/>
        <input v-model="value.units"
               v-bind:style="{color:value.color}"
               @input="check_units"/>
        <button @click="$emit('delete-parameter')">Delete</button>
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
                this.value.color = 'black';
            }
            catch(e){
                this.value.color = 'red';
            }
            this.$emit('input', this.value)
        },
    }
}
</script>


<style scoped>
</style>