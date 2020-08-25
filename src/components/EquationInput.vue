<template>
    <div class="equation-input">
        <mathlive-mathfield
            :config="{smartFence:true, virtualKeyboardMode:'manual'}"
            v-model="value.formula"
            @input="$emit('input', value)">
        </mathlive-mathfield>
        <span>=</span>
        <span>{{output.result}}</span>
        <span>{{output.units}}</span>
    </div>
</template>


<script>
import mathfield from './Mathfield'

export default {
    components: {
        'mathlive-mathfield' : mathfield,
    },
    props: ['value', 'output'],
}
</script>


<style scoped>
.equation-input {
    display: inline-block;
}
</style>