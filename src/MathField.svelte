<script>
  import {onMount} from "svelte";

  export let mathFieldLatex = "";
  export let parsingError = false;

  let mathSpan;
  let mathField;
  let MQ = MathQuill.getInterface(2);

  onMount(() => {
    mathField = MQ.MathField(mathSpan, {
      handlers: {
        edit: () => {
          mathFieldLatex = mathField.latex();
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

<span class:parsingError bind:this={mathSpan}>{mathFieldLatex}</span>

