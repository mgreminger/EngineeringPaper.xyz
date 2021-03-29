<script>
  import { onMount, createEventDispatcher } from "svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  export let latex = "";
  export let parsingError = false;
  export let editable = false;
  export let autoVirtualKeyboard = false;
  export let showVirtualKeyboard = false;
  export let gridColumn = 1;
  export function setLatex(latex) {
    mathField.latex(latex);
  }

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

  function handleKeyboard(event) {
    mathField.cmd(event.detail.command);
    mathField.focus();
  }

  $: if (!editable && mathField ) {
    mathField.latex(latex);
  }
</script>

<style>
  .parsing-error {
    background-color: lightcoral;
  }

  .math-field-c1 {
    grid-column: 1;
    grid-row: 1;
  }

  .math-field-c2 {
    grid-column: 2;
    grid-row: 1;
  }

  .keyboard {
    grid-column: 1 / 3;
    grid-row: 2;
  }
</style>

<div class={gridColumn === 1? "math-field-c1" : "math-field-c2"}>
  <span class:parsing-error={parsingError} bind:this={mathSpan}></span>
</div>
{#if editable && showVirtualKeyboard}
<div class="keyboard">
  <VirtualKeyboard on:click={handleKeyboard}/>
</div>
{/if}

