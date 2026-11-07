<script lang="ts">
  import appState from "./stores.svelte";

  import { onMount, tick } from "svelte";

  import CodeCell, { type CodeCellFunction } from "./cells/CodeCell.svelte";
  import type { CodeCellResult } from "./resultTypes";
  import MathField from "./MathField.svelte";
  import IconButton from "./IconButton.svelte";

  import pyodideInfo from "./pyodide-info.json";

  import { TooltipIcon } from "carbon-components-svelte";

  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import { getInitialParsingState } from "./parser/utility";

  import type { Statement, SubQueryStatement } from "./parser/types";
  import type { CellStatements } from "./types";
  import type { SystemDefinition } from "./cells/SystemCell.svelte";
  import type { FluidFunction } from "./cells/FluidCell.svelte";
  import { type GridInterpolationFunction, type InterpolationFunction } from "./cells/DataTableCell.svelte";


  interface Props {
    index: number;
    codeCell: CodeCell;
    mathCellChanged: () => void;
    triggerSaveNeeded: (pendingMathCellChange?: boolean) => void;
  }

  let {
    index,
    codeCell,
    mathCellChanged,
    triggerSaveNeeded
  }: Props = $props();

  let codeEditor: import("./CodeEditor.svelte").default;
  let containerDiv: HTMLDivElement;

  let CodeEditor: typeof import("./CodeEditor.svelte").default = $state();

  let codeCellResult = $derived.by(() => {
    let result: CodeCellResult | null = null;
    if (parsingState.statement?.type === "codeCellFunction") {
      result = appState.codeCellResults[parsingState.statement.name] ?? null;
    }
    return result;
  });

  let stdout = $derived(codeCellResult ? codeCellResult.stdout : "");

  const currentPyodideInfo = pyodideInfo.slice(-1)[0].info;

  onMount(async () => {
    codeCell.updateNeededPyodidePackages();
    CodeEditor = (await import("./CodeEditor.svelte")).default;
    await tick();
    if (appState.activeCell === index) {
      focus();
    }
  });

  let parsingState = $state(getInitialParsingState());

  let cellStatements: CellStatements = $derived.by(() => {
    const statements: (Statement | SubQueryStatement)[] = [];
    const endStatements: (Statement | SubQueryStatement)[] = [];
    const subQueries: Map<string,SubQueryStatement> = new Map();
    const systemDefinitions: SystemDefinition[] = [];
    const fluidFunctions: FluidFunction[] = [];
    const codeCellFunctions: CodeCellFunction[] = [];
    const interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = [];

    const codeCellFunction = getCodeCellFunction();
    if (codeCellFunction) {
      codeCellFunctions.push(codeCellFunction);
    }

    return {
      statements,
      endStatements,
      subQueries,
      systemDefinitions,
      fluidFunctions,
      codeCellFunctions,
      interpolationFunctions,
    };
  });

  export function getParsePending() {
    return parsingState.parsePending;
  }

  export function getParsingError() {
    return parsingState.parsingError;
  }

  export function getCellStatements() {
    return cellStatements;
  }

  export function getMarkdown(centerEquations: boolean) {
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

  function handleUpdate() {
    triggerSaveNeeded();
    mathCellChanged();
  }

  function getCodeCellFunction(): CodeCellFunction | null {
    if (!parsingState.parsingError && parsingState.statement.type === "codeCellFunction") {
      return {
        name: parsingState.statement.name,
        code: codeCell.code,
        inputDims: parsingState.statement.inputDims,
        outputDims: parsingState.statement.outputDims,
        sympyMode: codeCell.sympyMode,
        neededPyodidePackages: [...codeCell.neededPyodidePackages]
      }
    } else {
      return null;
    }
  }

  $effect(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function handleFunctionNameCopy() {
    if (!parsingState.parsingError && parsingState.statement.type === "codeCellFunction") {
      window.navigator.clipboard.writeText(parsingState.statement.latexName);
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
      idAttr={`code-cell-func-definition-${index}`}
      editable={true}
      bind:latex={codeCell.latex}
      type="code_func_def"
      bind:parsingState={parsingState}
    />
    {#if parsingState.parsingError}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{parsingState.parsingErrorMessage}</span>
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
          <div class="tooltip-row"><span>Python</span><em>{currentPyodideInfo.pythonVersion}</em></div>
          <div class="tooltip-row"><span>Pyodide</span><em>{currentPyodideInfo.pyodideVersion}</em></div>
          <br>
          <h6>Available Python Modules</h6>
          {#each Object.entries(currentPyodideInfo.availablePackages).sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase())) as [key, value]}
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
    mathCellChanged={mathCellChanged}
    triggerSaveNeeded={triggerSaveNeeded}
    bind:this={codeEditor}
  />
  {#if stdout}
    <pre class:hidden={appState.resultsInvalid}>{stdout}</pre>
  {/if}
</div>
