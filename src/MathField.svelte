<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { modifierKey, activeMathField } from "./stores";
  import type { MathField } from "./cells/MathField";

  export let latex = "";
  export let mathField: MathField | null = null;
  export let parsingError = false;
  export let editable = false;
  export let selectable = true;

  export function getMathField() {
    return quillMathField;
  }

  export function setLatex(latex: string) {
    quillMathField.latex(latex);
  }
  export function blur() {
    if (quillMathField) {
      quillMathField.blur();
    }
  }
  export function focus() {
    if (quillMathField) {
      quillMathField.focus();
    }
  }

  const dispatch = createEventDispatcher();

  let mathSpan;
  let quillMathField;
  let MQ = (window as any).MathQuill.getInterface(2);

  onMount(() => {
    MQ.config({
        autoOperatorNames: '',
        autoCommands: ''
    });
    if (editable) {
      quillMathField = MQ.MathField(mathSpan, {
        substituteTextarea: function() {
          const textArea = document.createElement('textarea');
          textArea.setAttribute('autocorrect', 'off');
          textArea.setAttribute('inputmode', 'none');
          return textArea;
        },
        handlers: {
          edit: () => {
            latex = quillMathField.latex();
            dispatch('update', {
              latex: latex
            });
          }
        }
      });

      quillMathField.latex(latex); // set intial latex value
    } else {
      quillMathField = MQ.StaticMath(mathSpan, {mouseEvents: selectable});
    }
  });

  function handleFocusIn() {
    $activeMathField = mathField;
  }

  function handleFocusOut() {
    $activeMathField = null;

    if (mathField) {
      mathField.setPendingLatex();
    }
  }


  function handleUndoRedo(event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "z":
      case "Z":
        if (!event[$modifierKey] || !mathField) {
          return;
        } else {
          mathField.undo();
        }
        break;
      case "y":
      case "Y":
        if (!event[$modifierKey] || !mathField) {
          return;
        } else {
          mathField.redo();
        }
        break;
      default:
        return;
    }

    event.preventDefault();
  }


  $: if (!editable && quillMathField ) {
    quillMathField.latex(latex);
  }
</script>

<style>
  .parsing-error {
    background-color: #f0b9b9;
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
  on:dblclick={() => {if (quillMathField.select) {quillMathField.select()} } }
  on:focusin={handleFocusIn}
  on:focusout={handleFocusOut}
  on:keydown={handleUndoRedo}
>
</span>




