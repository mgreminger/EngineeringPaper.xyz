<script lang="ts">
  import appState from "./stores.svelte";

  import { onMount } from "svelte";

  import CodeCell from "./cells/CodeCell.svelte";
  import type { MathField as MathFieldClass } from "./cells/MathField.svelte";

  import MathField from "./MathField.svelte";
  import CodeEditor from "./CodeEditor.svelte";
  import IconButton from "./IconButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";

  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";

  interface Props {
    index: number;
    codeCell: CodeCell;
    insertMathCellAfter: (arg: {detail: {index: number}}) => void;
    insertInsertCellAfter: (arg: {detail: {index: number}}) => void;
    mathCellChanged: () => void;
    triggerSaveNeeded: (pendingMathCellChange?: boolean) => void;
  }

  let {
    index,
    codeCell,
    insertMathCellAfter,
    insertInsertCellAfter,
    mathCellChanged,
    triggerSaveNeeded
  }: Props = $props();

  let codeEditor: CodeEditor;
  let containerDiv: HTMLDivElement;

  export function getMarkdown() {
    return "```\n" + codeCell.code + "\n```\n";
  }

  onMount(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function focus() {
    if ((codeEditor && containerDiv && !containerDiv.contains(document.activeElement))) {
      codeEditor.focus();
    }
  }

	function handleCodeEditorUpdate(data: {code: string}) {
		codeCell.code = data.code;
    codeCell.updateNeededPyodidePackages();

    triggerSaveNeeded(true);
    mathCellChanged();
	}

  async function parseLatex(latex: string, mathField: MathFieldClass) {
    triggerSaveNeeded(true);
    
    await mathField.parseLatex(latex);

    appState.cells[index] = appState.cells[index];

    mathCellChanged();
  }

  function handleUpdate() {
    triggerSaveNeeded();
    mathCellChanged();
  }

  $effect(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function handleFunctionNameCopy() {
    if (!codeCell.mathField.parsingError && codeCell.mathField.statement.type === "codeCellFunction") {
      window.navigator.clipboard.writeText(codeCell.mathField.statement.latexName);
    }
  }
  
</script>


<style>
  div.row {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-bottom: 4px;
  }

  label {
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>


<div
  bind:this={containerDiv}
>
  <label for={`code-cell-func-definition-${index}`}>
    Code Cell Function Definition:
  </label>
  <div class="row" id={`code-cell-func-definition-${index}`}>
    <MathField
      editable={true}
      update={(e) => parseLatex(e.latex, codeCell.mathField)}
      enter={() => insertMathCellAfter({detail: {index: index}})}
      shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
      modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
      mathField={codeCell.mathField}
      parsingError={codeCell.mathField.parsingError}
      parsePending={codeCell.mathField.parsePending}
      bind:this={codeCell.mathField.element}
      latex={codeCell.mathField.latex}
    />
    {#if codeCell.mathField.parsingError}
      <div class="error"><Error class="error"/>{codeCell.mathField.parsingErrorMessage}</div>
    {:else}
      <IconButton
        click={handleFunctionNameCopy}
        title={`Copy Function Name to Clipboard`}
        id={`copy-code-cell-function-name-${index}`}
      >
        <Copy />
      </IconButton>
    {/if}
    <input
      id={`use-sympy-mode-${index}`}
      type="checkbox"
      bind:checked={codeCell.sympyMode}
      onchange={handleUpdate}
    />
    <label for={`use-sympy-mode-${index}`}>
      Use SymPy Mode
    </label>
  </div>

  <CodeEditor
	  code={codeCell.code}
	  update={handleCodeEditorUpdate}
    bind:this={codeEditor}
  />
</div>
