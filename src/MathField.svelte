<script module lang="ts">
  import { MathfieldElement } from "mathlive";
  import { LatexParserWrapper } from "./parser/parserWrapper";
  import appState from "./stores.svelte";

  MathfieldElement.fontsDirectory = `${window.location.protocol}//${window.location.host}/mathlive/fonts`;
  MathfieldElement.soundsDirectory = `${window.location.protocol}//${window.location.host}/mathlive/sounds`;
  MathfieldElement.computeEngine = null;
  MathfieldElement.plonkSound = null;

  function setParsePending(parsePending: boolean) {
    appState.parsePending = parsePending;
  }

  const parserWrapper = new LatexParserWrapper(setParsePending);

  let nextId = 0;
</script>

<script lang="ts">
  import { INLINE_SHORTCUTS, MAX_MATRIX_COLS } from "./constants";
  import { inMatrix } from "./utility";
  import type { Statement, MathFieldTypes, DataTableInfo } from "./parser/types";
  import type { ParsingResult } from "./parser/LatexToSympy";

  interface BaseProps {
    latex: string;
    hidden?: boolean;
    enter?: () => void;
    shiftEnter?: () => void;
    modifierEnter?: () => void;
  }

  interface EditableProps extends BaseProps {
    editable: true;
    type: MathFieldTypes;
    parsingError: boolean;
    parsePending: boolean;
    parsingErrorMessage: string;
    statement: Statement;
  }

  interface NonEditableProps extends BaseProps {
    editable?: false;
    type?: MathFieldTypes;
    parsingError?: boolean;
    parsePending?: boolean;
    parsingErrorMessage?: string;
    statement?: Statement;
  }

  type Props = NonEditableProps | EditableProps

  let {
    latex = $bindable(""),
    type = "math",
    parsingError = $bindable(false),
    parsePending = $bindable(true),
    parsingErrorMessage = $bindable(""),
    statement = $bindable(null),
    editable = false,
    hidden = false,
    enter,
    shiftEnter,
    modifierEnter
  }: Props = $props();

  const id = nextId++;
  let mathLiveField: MathfieldElement = $state();
  let pendingNewLatex = false;
  let newLatex:string;
  let parsingPromise: Promise<ParsingResult>;

  async function setPendingLatex(immediate = false): Promise<void> {
    await parsingPromise;
    if (pendingNewLatex && mathLiveField) {

      let startingPosition = mathLiveField.position;
      latex = newLatex;

      if (immediate) {
        if (startingPosition > mathLiveField.lastOffset) {
          startingPosition = mathLiveField.lastOffset;
        }
        mathLiveField.position = startingPosition;
        await parsingPromise;
        pendingNewLatex = false; // needed to prevent the unlikely scenario where an immediateUpdate leads to an infinite loop
      }
    }
  }

  export async function parseLatex(latex: string, dataTableInfo?: DataTableInfo) {
    latex = latex;

    parsePending = true;
    parsingPromise = parserWrapper.parseLatex(latex, id, type, dataTableInfo);
    const result = await parsingPromise;
    parsePending = false;

    pendingNewLatex = result.pendingNewLatex;
    newLatex = result.newLatex;
    parsingError = result.parsingError;
    parsingErrorMessage = result.parsingErrorMessage;
    statement = result.statement;

    if (result.immediateUpdate && mathLiveField) {
      setPendingLatex(true);
    }
  }

  export function getMathField() {
    return mathLiveField;
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

  function handleMathFieldUpdate(e?: Event) {
    latex = mathLiveField.value;
  } 

  let isDeadKeyActive = false;

  function handleKeyDown(e: KeyboardEvent) {
    if (isDeadKeyActive && e.key === '^') {
      e.stopImmediatePropagation();
      isDeadKeyActive = false;
      return; 
    }

    isDeadKeyActive = false;

    switch (e.key) {
      case 'Dead':
        e.stopImmediatePropagation();
        isDeadKeyActive = true;
        break;
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
          if (pendingNewLatex && !e.shiftKey && !e[appState.modifierKey]) {
              setPendingLatex();
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
        if (e[appState.modifierKey]) {
          e.preventDefault();
          mathLiveField.executeCommand(['insert', '^{\\mathrm{T}}']);
        }
        break;
      case '"':
        e.preventDefault();
        if (mathLiveField.mode === 'text') {
          mathLiveField.executeCommand(['switchMode', 'math', '', '']);
        } else {
          mathLiveField.executeCommand(['switchMode', 'text', '', '']);
        }
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
    appState.activeMathField = mathLiveField;
  }

  function handleFocusOut() {
    if (mathLiveField && !mathLiveField.hasFocus()) {
      appState.activeMathField = null;

      if (mathLiveField) {
        setPendingLatex();

        if (parsingError) {
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
        label: 'Insert Row Above',
        onMenuSelect: () => mf.executeCommand('addRowBefore'),
        visible: () => editable && inMatrix(mf),
      },
      {
        label: 'Insert Row Below',
        onMenuSelect: () => mf.executeCommand('addRowAfter'),
        visible: () => editable && inMatrix(mf),
      },
      {
        label: 'Insert Column Left',
        onMenuSelect: () => mf.executeCommand('addColumnBefore'),
        visible: () => editable && inMatrix(mf),
      },
      {
        label: 'Insert Column Right',
        onMenuSelect: () => mf.executeCommand('addColumnAfter'),
        visible: () => editable && inMatrix(mf),
      },
      {
        label: 'Delete Row',
        onMenuSelect: () => mf.executeCommand('removeRow'),
        visible: () => editable && inMatrix(mf),
      },
      {
        label: 'Delete Column',
        onMenuSelect: () => mf.executeCommand('removeColumn'),
        visible: () => editable && inMatrix(mf),
      },
      {
        type: 'divider',
      },
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
    if (mathLiveField ) {
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
  id={id}
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
  class:parsing-error={parsingError && !parsePending}
  class:hidden
>
</math-field>





