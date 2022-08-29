<script>
  import { onMount, createEventDispatcher } from "svelte";

  export let latex = "";
  export let parsingError = false;
  export let editable = false;
  export let selectable = true;

  export function getMathField() {
    return mathField;
  }

  export function setLatex(latex) {
    mathField.latex(latex);
  }
  export function blur() {
    mathField.blur();
  }
  export function focus() {
    mathField.focus();
  }

  const dispatch = createEventDispatcher();

  let mathSpan;
  let mathField;
  let MQ = MathQuill.getInterface(2);

  onMount(() => {
    MQ.config({
        autoOperatorNames: '',
        autoCommands: ''
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

      mathField.latex(latex); // set intial latex value
    } else {
      mathField = MQ.StaticMath(mathSpan, {mouseEvents: selectable});
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

  @media print {
    span {
      border:none;
    }
  }

</style>


<span 
  class:parsing-error={parsingError}
  bind:this={mathSpan}
  on:dblclick={mathField.select()}
>
</span>




