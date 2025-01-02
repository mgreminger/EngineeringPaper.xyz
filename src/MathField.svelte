<script lang="ts">
  import { onMount } from "svelte";
  import appState from "./stores.svelte";
  import type { MathField } from "./cells/MathField.svelte";

  import type { MathfieldElement } from "mathlive";
  import { INLINE_SHORTCUTS, MAX_MATRIX_COLS } from "./constants";
  import { values } from "idb-keyval";

  interface Props {
    latex?: string;
    mathField?: MathField | null;
    parsingError?: boolean;
    editable?: boolean;
    hidden?: boolean;
    update?: (arg: {latex: string}) => void;
    enter?: () => void;
    shiftEnter?: () => void;
    modifierEnter?: () => void;
  }

  let {
    latex = "",
    mathField = null,
    parsingError = false,
    editable = false,
    hidden = false,
    update,
    enter,
    shiftEnter,
    modifierEnter
  }: Props = $props();

  let mathLiveField: MathfieldElement = $state();

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

  onMount(() => {
    if (editable) {
      setLatex(latex); // set and parse initial latex value
    } else {
      mathLiveField.value = latex;
    }
  });


  function handleMathFieldUpdate(e?: Event) {
    update?.({latex: mathLiveField.value});
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
          if (appState.activeMathField?.pendingNewLatex && !e.shiftKey && !e[appState.modifierKey]) {
              appState.activeMathField.setPendingLatex();
          } else if(e.shiftKey) {
            shiftEnter?.();
          } else if(e[appState.modifierKey]) {
            modifierEnter?.();
          } else {
            enter?.();
          }
        }
        break;
      case '*': 
        if (e[appState.modifierKey]) {
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
        if (e[appState.modifierKey]) {
          e.preventDefault();
          mathLiveField.executeCommand(['insert', '#@\\cdot10^{#?}']);
        }
        break;
    }
  }

  function handleFocusIn() {
    appState.activeMathField = mathField;
  }

  function handleFocusOut() {
    if (mathLiveField && !mathLiveField.hasFocus()) {
      appState.activeMathField = null;

      if (mathField) {
        mathField.setPendingLatex();

        if (mathField.parsingError) {
          // there is a parsing error, invalidate existing results after leaving cell
          appState.resultsInvalid = true;
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
        keyboardShortcut: appState.modifierKey === "ctrlKey" ? 'meta+Y' : 'meta+Shift+Z',
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
  function setup() {
    if (editable) {
      mathLiveField.mathVirtualKeyboardPolicy = "manual";
      mathLiveField.inlineShortcutTimeout = 0;
      mathLiveField.smartSuperscript = false;
      mathLiveField.inlineShortcuts = INLINE_SHORTCUTS;

      mathLiveField.mathModeSpace = '\\:';

      mathLiveField.keybindings = getKeybindings(mathLiveField);
    } else {
      mathLiveField.readOnly = true;
    }

    //@ts-ignore
    mathLiveField.menuItems = getContextMenuItems(mathLiveField, editable);
  }

  $effect( () => {
    if (!editable && mathLiveField ) {
      mathLiveField.value = latex;
    }
  });

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

<math-field
  role="textbox math"
  min-font-scale=0.75
  max-matrix-cols={MAX_MATRIX_COLS}
  onfocusin={handleFocusIn}
  onfocusout={handleFocusOut}
  oninput={handleMathFieldUpdate}
  onkeydowncapture={handleKeyDown}
  onmount={setup}
  bind:this={mathLiveField}
  class:editable
  class:parsing-error={parsingError}
  class:hidden
>
</math-field>





