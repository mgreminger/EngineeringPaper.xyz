<script>
  import { onMount, createEventDispatcher } from "svelte";

  export let latex = "";
  export let parsingError = false;
  export let editable = true;

  const dispatch = createEventDispatcher();

  let mathSpan;
  let mathField;
  let MQ = MathQuill.getInterface(2);

  onMount(() => {
    if (editable) {
      MQ.config({
        autoOperatorNames: 'sin cos tan cot csc arcsin arccos arctan sinh cosh tanh coth log ln',
        autoCommands: 'pi theta sqrt',
      });
      mathField = MQ.MathField(mathSpan, {
        handlers: {
          edit: () => {
            latex = mathField.latex();
            dispatch('update', {
              latex: latex
            });
          }
        }
      });
    } else {
      mathField = MQ.StaticMath(mathSpan);
    }
  });

  $: if (!editable && mathField ) {
    mathField.latex(latex);
  }
</script>

<style>
  .parsingError {
    background-color: lightcoral;
  }
</style>

<span class:parsingError bind:this={mathSpan}></span>

