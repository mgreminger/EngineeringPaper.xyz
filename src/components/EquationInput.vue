<template>
    <div>
        <mathlive-mathfield
            :config="{smartFence:true, virtualKeyboardMode:'manual'}"
            v-model="value.formula"
            @input="$emit('input', value)">
        </mathlive-mathfield>
        <button @click="$emit('delete-equation')">Delete</button>
        <div class="output">LaTeX: {{value.formula}}</div>
    </div>
</template>


<script>
import mathfield from './Mathfield'

export default {
    components: {
        'mathlive-mathfield' : mathfield,
    },
    props: ['value'],
}
</script>


<style scoped>
</style>