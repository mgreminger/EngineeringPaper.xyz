<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { modifierKey, activeMathField, results, resultsInvalid } from "./stores";
  import type { MathField } from "./cells/MathField";

  import type { MathfieldElement } from "mathlive";
  import { INLINE_SHORTCUTS, MAX_MATRIX_COLS } from "./constants";

  export let latex = "";
  export let mathField: MathField | null = null;
  export let parsingError = false;
  export let editable = false;
  export let hidden = false;

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

  const dispatch = createEventDispatcher<{
    update: {latex: string};
    enter: null;
    shiftEnter: null;
    modifierEnter: null;
  }>();

  let mathSpan: HTMLSpanElement;
  let mathLiveField: MathfieldElement;

  onMount(() => {    
    if (editable) {
      mathLiveField.mathVirtualKeyboardPolicy = "manual";
      mathLiveField.inlineShortcutTimeout = 0;
      mathLiveField.smartSuperscript = false;
      mathLiveField.inlineShortcuts = INLINE_SHORTCUTS;

      mathLiveField.mathModeSpace = '\\:';

      mathLiveField.keybindings = getKeybindings(mathLiveField);

      setLatex(latex); // set initial latex value
    } else {
      mathLiveField.readOnly = true;
    }

    //@ts-ignore
    mathLiveField.menuItems = getContextMenuItems(mathLiveField, editable);
  });


  function handleMathFieldUpdate(e?: Event) {
    dispatch('update', {latex: mathLiveField.value});
  } 

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Tab': 
        if(!e.shiftKey) {
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
        }
        break;
      case '|':
        e.preventDefault();
        mathLiveField.executeCommand(['insert', '|']);
        break;
      case 'Enter':
        if (!mathLiveField.shadowRoot.querySelector(".ui-menu-container")) {
          e.preventDefault();
          if ($activeMathField?.pendingNewLatex && !e.shiftKey && !e[$modifierKey]) {
              $activeMathField.setPendingLatex();
          } else if(e.shiftKey) {
            dispatch('shiftEnter');
          } else if(e[$modifierKey]) {
            dispatch('modifierEnter');
          } else {
            dispatch('enter');
          }
        }
        break;
      case '*': 
        if (e[$modifierKey]) {
          e.preventDefault();
          mathLiveField.executeCommand(['insert', '\\times']);
        }
        break;
      case "'":
        e.preventDefault();
        mathLiveField.executeCommand(['insert', '^{\\mathrm{T}}']);
        break;
      case "F10":
        if(e.shiftKey) {
          e.preventDefault();
          //@ts-ignore
          mathLiveField.showMenu();
        }
        break;
      case "e":
      case "E":
        if (e[$modifierKey]) {
          e.preventDefault();
          mathLiveField.executeCommand(['insert', '#@\\cdot10^{#?}']);
        }
        break;
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
          // there is a parsing error, invalidate existing results after leaving cell
          $resultsInvalid = true;
        }
      }
    }
  }

  function hasSelection(mf: MathfieldElement): boolean {
    return Boolean(mf.selection.ranges.reduce((acum, range) => acum + Math.abs(range[1]-range[0]), 0) > 0);
  }

  function getContextMenuItems(mf: MathfieldElement, editable: boolean) {
    return [
      {
        label: 'Undo',
        onMenuSelect: () => mf.executeCommand('undo'),
        visible: editable,
        enabled: () => mf.canUndo(),
        keyboardShortcut: 'meta+Z',
      },
      {
        label: 'Redo',
        onMenuSelect: () => mf.executeCommand('redo'),
        visible: editable,
        enabled: () => mf.canRedo(),
        keyboardShortcut: $modifierKey === "ctrlKey" ? 'meta+Y' : 'meta+Shift+Z',
      },
      {
        type: 'divider',
      },
      {
        label: 'Cut',
        onMenuSelect: () => mf.executeCommand('cutToClipboard'),
        visible: editable,
        enabled: () => hasSelection(mf),
        keyboardShortcut: 'meta+X',
      },
      {
        label: 'Copy',
        onMenuSelect: () => mf.executeCommand('copyToClipboard'),
        keyboardShortcut: 'meta+C',
      },
      {
        label: navigator.clipboard.readText ? 'Paste' : 'Paste with Keyboard',
        id: 'paste',
        onMenuSelect: () => mf.executeCommand('pasteFromClipboard'),
        visible: editable,
        enabled: Boolean(navigator.clipboard.readText),
        keyboardShortcut: 'meta+V',
      },
      {
        label: 'Delete',
        onMenuSelect: () => mf.executeCommand(['insert', '']),
        visible: editable,
        enabled: () => hasSelection(mf),
      },
      {
        label: 'Select All',
        id: 'select-all',
        keyboardShortcut: 'meta+A',
        onMenuSelect: () => mf.executeCommand('selectAll'),
      },
    ];
  }

  const keybindingsToExclude = [
    "ctrl+[Minus]",
    "shift+[Escape]",
    "[Escape]",
    "[IntlBackslash]",
    "alt+[Backslash]",
    "\\"
  ];

  function getKeybindings(mf: MathfieldElement) {
    return [
      ...mf.keybindings.filter((value) => !keybindingsToExclude.includes(value.key)),
    ]
  }

  // workaround needed for move cell inlineShortcuts bug (also impacts menuItems and keybindings)
  $: if (editable && mathLiveField) {
    mathLiveField.inlineShortcuts = INLINE_SHORTCUTS;
    //@ts-ignore
    mathLiveField.menuItems = getContextMenuItems(mathLiveField, editable);
    mathLiveField.keybindings = getKeybindings(mathLiveField);
  }

  $: if (!editable && mathLiveField ) {
    mathLiveField.value = latex;
    //@ts-ignore
    mathLiveField.menuItems = getContextMenuItems(mathLiveField, editable);
  }
</script>

<style>
  :root {
    --contains-highlight-backround-color: transparent;  /* covers misspelling in mathlive 0.94.8 */
    --contains-highlight-background-color: transparent;
  }

  math-field {
    font-size: 16px;
    background-color: transparent;
  }

  math-field:focus {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }

  math-field.editable {
    min-width: 2rem;
    border: solid 1px gray;
    padding-left: 2px;
    padding-right: 2px;
    padding-top: 1px;
    padding-bottom: 1px;
  }

  math-field.hidden {
    visibility: hidden;
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

  math-field::part(menu-toggle) {
    display: none;
  }

  @media print {
    math-field.editable {
      border: none;
    }
  }

  math-field:not(:focus)::part(container) {
    touch-action: auto;
  }

</style>

<!-- Suppressing some Svelte A11y warnings since math-field is not recognized as an interactive element -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-interactive-supports-focus -->

<math-field
  role="textbox math"
  min-font-scale=0.75
  max-matrix-cols={MAX_MATRIX_COLS}
  on:focusin={handleFocusIn}
  on:focusout={handleFocusOut}
  on:input={handleMathFieldUpdate}
  on:keydown|capture={handleKeyDown}
  bind:this={mathLiveField}
  class:editable
  class:parsing-error={parsingError}
  class:hidden
>
</math-field>





