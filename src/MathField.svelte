<script>
  import { onMount, createEventDispatcher } from "svelte";

  export let mathFieldLatex = "";
  export let parsingError = false;

  const dispatch = createEventDispatcher();

  let mathSpan;
  let mathField;
  let MQ = MathQuill.getInterface(2);

  onMount(() => {
    mathField = MQ.MathField(mathSpan, {
      handlers: {
        edit: () => {
          mathFieldLatex = mathField.latex();
          dispatch('update', {
            latex: mathFieldLatex
          });
        }
      }
    });

  });

</script>

<style>
  .parsingError {
    background-color: lightcoral;
  }
</style>

<span class:parsingError bind:this={mathSpan}></span>

