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

  export function setLatex(latex: string, setPosition: boolean = true) {
    mathLiveField.value = latex;
    if (setPosition) {
      mathLiveField.position = mathLiveField.lastOffset;
    }
    handleMathFieldUpdate(); // update event not triggered by assigning mathLiveField.value
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
    mathLiveField = new MathfieldElement();
    
    if (editable) {
      mathLiveField.mathVirtualKeyboardPolicy = "manual";
      mathLiveField.smartSuperscript = false;
      mathLiveField.inlineShortcuts = {
          '*': '\\cdot',
          '<=': '\\le',
          '>=': '\\ge',
          '~': '\\approx',
          'sqrt(': '\\sqrt{#?}',
          '$int': '\\int _{#?}^{#?}\\left(#?\\right)\\mathrm{d}\\left(#?\\right)',
          '$prime': '\\frac{\\mathrm{d}}{\\mathrm{d}\\left(#?\\right)}\\left(#?\\right)',
          '$doubleprime': '\\frac{\\mathrm{d}^{2}}{\\mathrm{d}\\left(#?\\right)^{2}}\\left(#?\\right)',
          '$tripleprime': '\\frac{\\mathrm{d}^{3}}{\\mathrm{d}\\left(#?\\right)^{3}}\\left(#?\\right)',
          'log_': '\\log_{#?}(#?)',
        };

      mathLiveField.mathModeSpace = '\\:'

      mathLiveField.classList.add('_editable');

      mathLiveField.addEventListener('input', handleMathFieldUpdate);
      mathLiveField.addEventListener('keydown', handleKeyDown, { capture: true });

      setLatex(latex); // set intial latex value
    } else {
      mathLiveField.readOnly = true;
    }
    mathSpan.appendChild(mathLiveField);
  });

  onDestroy(() => {
    if (editable && mathLiveField) {
      mathLiveField.removeEventListener('input', handleMathFieldUpdate);
      mathLiveField.removeEventListener('keydown', handleKeyDown, { capture: true });
    }
  });

  function handleMathFieldUpdate(e?: Event) {
    dispatch('update', {latex: mathLiveField.value});
  } 

  function handleKeyDown(e: KeyboardEvent) {
    let reDispatch = false;

    if (e.key === '\\') {
      e.preventDefault();
      mathLiveField.executeCommand(['insert', '\\backslash']);
    } else if (e.key === '|') {
      e.preventDefault();
      mathLiveField.executeCommand(['insert', '|']);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      reDispatch = true;
    } else if (e.key == 'Enter') {
      e.preventDefault();
      reDispatch = true;
    }

    if (reDispatch) {
      // dispatch new event on parent to perserve escape behavior at app level
      const newEvent = new KeyboardEvent("keydown", {
        key: e.key,
        code: e.code,
        location: e.location,
        repeat: e.repeat,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
        bubbles: true, 
        cancelable: true
      });
      mathLiveField.parentElement.dispatchEvent(newEvent);
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

  :global(span.editable > math-field){
    min-width: 1rem;
    border: solid 1px gray;
    padding-left: 2px;
    padding-right: 2px;
  }

  :global(span.parsing-error > math-field) {
    background-color: #f0b9b9;
  }

  :global(math-field) {
    font-size: 16px;
  }

  :global(span:not(.editable) > math-field) {
    border: none;
    margin-left: 2px;
    margin-right: 2px;
  }

  :global(math-field::part(virtual-keyboard-toggle)) {
    display: none;
  }

</style>


<span 
  class:parsing-error={parsingError}
  class:editable
  bind:this={mathSpan}
  on:focusin={handleFocusIn}
  on:focusout={handleFocusOut}
>
</span>




