<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { modifierKey, activeMathField, results } from "./stores";
  import type { MathField } from "./cells/MathField";

  import type { MathfieldElement } from "mathlive";

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
    if (editable) {
      mathLiveField.mathVirtualKeyboardPolicy = "manual";
      mathLiveField.inlineShortcutTimeout = 0;
      mathLiveField.smartSuperscript = false;
      mathLiveField.inlineShortcuts = {
          '*': '\\cdot',
          '<=': '\\le',
          '>=': '\\ge',
          '~': '\\approx',
          'sqrt': '\\sqrt{#?}',
          '$int': '\\int _{#?}^{#?}\\left(#?\\right)\\mathrm{d}\\left(#?\\right)',
          '$prime': '\\frac{\\mathrm{d}}{\\mathrm{d}\\left(#?\\right)}\\left(#?\\right)',
          '$doubleprime': '\\frac{\\mathrm{d}^{2}}{\\mathrm{d}\\left(#?\\right)^{2}}\\left(#?\\right)',
          '$tripleprime': '\\frac{\\mathrm{d}^{3}}{\\mathrm{d}\\left(#?\\right)^{3}}\\left(#?\\right)',
          'log_': '\\log_{#?}(#?)',
        };

      mathLiveField.keybindings = mathLiveField.keybindings
                                    .filter((value) => value.key !== '[Paste]' &&
                                                       value.key !== 'ctrl+v' &&
                                                       value.key !== 'cmd+v');

      mathLiveField.mathModeSpace = '\\:'

      setLatex(latex); // set intial latex value
    } else {
      mathLiveField.readOnly = true;
    }
  });


  function handleMathFieldUpdate(e?: Event) {
    dispatch('update', {latex: mathLiveField.value});
  } 

  function handleKeyDown(e: KeyboardEvent) {
    let reDispatch = false;
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      let hasPlaceholder = false;
      let startingPosition: number | undefined;
      if ( !mathLiveField.value.includes('placeholder') ) {
        startingPosition = mathLiveField.position;
        mathLiveField.executeCommand('moveAfterParent');
      } else {
        hasPlaceholder = true
      }
      if (hasPlaceholder || startingPosition === mathLiveField.position) {
        mathLiveField.executeCommand('moveToNextPlaceholder');
      }
    } else if (e.key === '\\') {
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
  math-field {
    font-size: 16px;
    contain: content;
    background-color: transparent;
  }

  math-field:focus {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }

  math-field.editable {
    min-width: 1rem;
    border: solid 1px gray;
    padding-left: 2px;
    padding-right: 2px;
    padding-top: 1px;
    padding-bottom: 1px;
  }

  math-field.parsing-error:not(:focus) {
    background-color: #f0b9b9;
  }

  math-field:not(.editable) {
    border: none;
    margin-left: 2px;
    margin-right: 2px;
  }

  math-field::part(virtual-keyboard-toggle) {
    display: none;
  }

  math-field::part(container) {
    touch-action: auto;
  }

  @media print {
    math-field.editable {
      border: none;
    }
  }

</style>


<math-field 
  min-font-scale=0.75
  on:focusin={handleFocusIn}
  on:focusout={handleFocusOut}
  on:input={handleMathFieldUpdate}
  on:keydown|capture={handleKeyDown}
  bind:this={mathLiveField}
  class:editable
  class:parsing-error={parsingError}
>
</math-field>





