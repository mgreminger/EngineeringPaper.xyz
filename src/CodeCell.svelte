<script lang="ts">
  import appState from "./stores.svelte";

  import { onMount, tick } from "svelte";

  import CodeCell from "./cells/CodeCell.svelte";
  import type { MathField as MathFieldClass } from "./cells/MathField.svelte";
  import type { CodeCellResult } from "./resultTypes";
  import MathField from "./MathField.svelte";
  import IconButton from "./IconButton.svelte";

  import pyodideInfo from "./pyodide-info.json";

  import { TooltipIcon } from "carbon-components-svelte";

  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";

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

  let codeEditor: import("./CodeEditor.svelte").default;
  let containerDiv: HTMLDivElement;

  let CodeEditor: typeof import("./CodeEditor.svelte").default = $state();

  let codeCellResult = $derived.by(() => {
    let result: CodeCellResult | null = null;
    if (codeCell.mathField.statement?.type === "codeCellFunction") {
      result = appState.codeCellResults[codeCell.mathField.statement.name] ?? null;
    }
    return result;
  });

  let stdout = $derived(codeCellResult ? codeCellResult.stdout : "");

  onMount(async () => {
    codeCell.updateNeededPyodidePackages();
    CodeEditor = (await import("./CodeEditor.svelte")).default;
    await tick();
    if (appState.activeCell === index) {
      focus();
    }
  });

  export function getMarkdown() {
    return "```python\n" + codeCell.code + "\n```\n\n";
  }

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

  div.info {
    display: flex;
    flex: 1;
    justify-content: end;
    align-self: end
  }

  div.tooltip-row {
    display: flex;
    justify-content: space-between;
  }

  label {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  pre {
    font-family: monospace;
  }

  pre.hidden {
    visibility: hidden;
  }

  input {
    margin-inline-start: 0px;
  }

  :global(div.code-editor) {
    max-width: 890px;
  }
</style>


<div
  bind:this={containerDiv}
>
  <label for={`code-cell-func-definition-${index}`}>
    Code Cell Function Definition:
  </label>
  <div class="row">
    <MathField
      id={`code-cell-func-definition-${index}`}
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
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{codeCell.mathField.parsingErrorMessage}</span>
        <Error class="error"/>
      </TooltipIcon>
    {:else}
      <IconButton
        click={handleFunctionNameCopy}
        title={`Copy Function Name to Clipboard`}
        id={`copy-code-cell-function-name-${index}`}
      >
        <Copy />
      </IconButton>
    {/if}
  </div>
  
  <div class="row">
    <input
      id={`use-sympy-mode-${index}`}
      type="checkbox"
      bind:checked={codeCell.sympyMode}
      onchange={handleUpdate}
    />
    <label for={`use-sympy-mode-${index}`}>
      Use SymPy Mode
    </label>
    <div class="info">
      <TooltipIcon direction="left">
        <div class="tooltip" slot="tooltipText">
          <h6>Python Environment</h6>
          <div class="tooltip-row"><span>Python</span><em>{pyodideInfo.pythonVersion}</em></div>
          <div class="tooltip-row"><span>Pyodide</span><em>{pyodideInfo.pyodideVersion}</em></div>
          <br>
          <h6>Available Python Modules</h6>
          {#each Object.entries(pyodideInfo.availablePackages).sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase())) as [key, value]}
            <div class="tooltip-row"><span>{key}</span><em>{value.version}</em></div>
          {/each}
        </div>
        <Information />
      </TooltipIcon>
    </div>
  </div>

  <CodeEditor
    class="code-editor"
	  code={codeCell.code}
    codeCellResult={codeCellResult}
    codeCell={codeCell}
	  update={handleCodeEditorUpdate}
    shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
    modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
    mathCellChanged={mathCellChanged}
    triggerSaveNeeded={triggerSaveNeeded}
    bind:this={codeEditor}
  />
  {#if stdout}
    <pre class:hidden={appState.resultsInvalid}>{stdout}</pre>
  {/if}
</div>
