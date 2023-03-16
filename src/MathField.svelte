<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { modifierKey, activeMathField, results } from "./stores";
  import type { MathField } from "./cells/MathField";

  import { MathfieldElement } from "mathlive";

  export let latex = "";
  export let mathField: MathField | null = null;
  export let parsingError = false;
  export let editable = false;

  export function getMathField() {
    return mathLiveField;
  }

  export function setLatex(latex: string) {
    mathLiveField.value = latex;
    mathLiveField.position = mathLiveField.lastOffset;
  }
  export function blur() {
    if (mathLiveField) {
      mathLiveField.blur();
    }
  }
  export function focus() {
    if (mathLiveField) {
      mathLiveField.focus();
    }
  }

  const dispatch = createEventDispatcher();

  let mathSpan: HTMLSpanElement;
  let mathLiveField: MathfieldElement;

  onMount(() => {
    mathLiveField = new MathfieldElement(
      {readOnly: false,
        fontsDirectory: `${window.location.protocol}//${window.location.host}/build/mathlive/fonts`,
        soundsDirectory: `${window.location.protocol}//${window.location.host}/build/mathlive/sounds`,
        computeEngine: null,
        virtualKeyboardMode: 'off',
      });
    if (editable) {
      mathLiveField.setOptions({inlineShortcuts: {}});

      mathLiveField.addEventListener('input', handleMathFieldUpdate);
      mathLiveField.addEventListener('keydown', handleKeyDown, { capture: true });
      mathLiveField.addEventListener('focus', handleFocusIn);
      mathLiveField.addEventListener('blur', handleFocusOut);

      setLatex(latex); // set intial latex value
      handleMathFieldUpdate(); // parse initial value (not triggered by setLatex)
    } else {
      mathLiveField.setOptions({readOnly: true});
    }
    mathSpan.appendChild(mathLiveField);
  });

  onDestroy(() => {
    if (editable && mathLiveField) {
      mathLiveField.removeEventListener('input', handleMathFieldUpdate);
      mathLiveField.removeEventListener('keydown', handleKeyDown, { capture: true });
      mathLiveField.removeEventListener('focus', handleFocusIn);
      mathLiveField.removeEventListener('blur', handleFocusOut);
    }
  });

  function handleMathFieldUpdate(e?: Event) {
    dispatch('update', {latex: mathLiveField.value});
  } 

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === '\\') {
      e.preventDefault();
      mathLiveField.executeCommand(['insert', '\\backslash']);
    } else if (e.key === 'Escape') {
      e.preventDefault();
    }
  }

  function handleFocusIn() {
    $activeMathField = mathField;
  }

  function handleFocusOut() {
    if (mathLiveField && !mathLiveField.hasFocus()) {
      $activeMathField = null;

      if (mathField) {
        mathField.setPendingLatex();

        if (mathField.parsingError) {
          // there is a parsing error, clear any existing results after leaving cell
          $results = [];
        }
      }
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


  $: if (!editable && mathLiveField ) {
    mathLiveField.value = latex;
  }
</script>

<style>
  @media print {
    span {
      border:none;
    }
  }

  :global(span.editable math-field){
    min-width: 1rem;
    border: solid 1px gray;
  }

  :global(span.parsing-error math-field) {
    background-color: #f0b9b9;
  }

  :global(math-field) {
    font-size: 16px;
    padding-left: 2px;
    padding-right: 2px;
  }

</style>


<span 
  class:parsing-error={parsingError}
  class:editable
  bind:this={mathSpan}
  on:keydown={handleUndoRedo}
>
</span>




