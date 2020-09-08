<template>
    <div class="equation-input">
        <mathlive-mathfield
            :config="{smartFence:true, virtualKeyboardMode:'manual'}"
            v-model="value.formula"
            @input="$emit('input', value)">
        </mathlive-mathfield>
        <span>=</span>
        <span v-if="!value.use_user_units">
            <span>{{output.result}}</span>
            <span>{{output.units}}</span>
        </span>
        <span v-else>
            <span>{{result_in_user_units}}</span>
            <input v-model="value.user_units"
                v-bind:class="{'not-valid':!value.user_units_valid}"
                class="units-field"/><span/>
        </span>
        <input type="checkbox" id="use-user-units"
            v-model="value.use_user_units"
            title="Specify Output Units"
            @change="toggle_use_user_units">
        <label for="use-user-units">Specify Result Units</label>
    </div>
</template>


<script>
import mathfield from './Mathfield'
import { unit } from 'mathjs'

export default {
    components: {
        'mathlive-mathfield' : mathfield,
    },
    props: ['value', 'output'],
    methods: {
        check_units: function(){
            try {
                let user_units = unit(`1 ${this.value.user_units}`)
                let output_units = unit(`1 ${this.output.units}`)
                if(JSON.stringify(user_units.dimensions) === JSON.stringify(output_units.dimensions)){
                    this.value.user_units_valid = true
                    this.value.conversion_factor = output_units.value/user_units.value
                } else {
                    this.value.user_units_valid = false
                }
            }
            catch(e){
                this.value.user_units_valid = false;
            }
        },
        toggle_use_user_units: function(){
            if(this.value.use_user_units){
                if(this.value.user_units === ''){
                    this.value.user_units = this.output.units
                }
            }
        }
    },
    computed: {
        result_in_user_units: function (){
            // fixme: using a scaling factor won't work for non-absolute temperature unts
            this.check_units()
            if(this.output.result === ''){
                return ''
            }
            if(this.value.user_units_valid){
                if(!isNaN(this.output.result)){
                    return this.output.result*this.value.conversion_factor
                } else {
                    return `(${this.output.result})*${this.value.conversion_factor}`
                }
            } else {
                return ''
            }
        }
    }
}
</script>


<style scoped>
</style>