<script>
  import { onMount, createEventDispatcher } from "svelte";

  export let latex = "";
  export let parsingError = false;
  export let editable = false;
  export function setLatex(latex) {
    mathField.latex(latex);
  }
  export function getMathField() {
    return mathField;
  }

  const dispatch = createEventDispatcher();

  let mathSpan;
  let mathField;
  let MQ = MathQuill.getInterface(2);

  onMount(() => {
    MQ.config({
        autoOperatorNames: 'sin cos tan cot csc arcsin arccos arctan sinh cosh tanh coth log ln',
        autoCommands: 'pi theta sqrt',
    });
    if (editable) {
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
  .parsing-error {
    background-color: lightcoral;
  }

</style>


<span class:parsing-error={parsingError} bind:this={mathSpan}></span>



