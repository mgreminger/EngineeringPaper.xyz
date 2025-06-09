<script lang="ts">
  import appState from "./stores.svelte";

  import { onMount, tick } from "svelte";

  import CodeCell from "./cells/CodeCell.svelte";
  import type { MathField as MathFieldClass } from "./cells/MathField.svelte";

  import MathField from "./MathField.svelte";

  import IconButton from "./IconButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";

  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import type { CodeCellResult } from "./resultTypes";

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

  let stdoutAndErrors = $derived.by(() => {
    let result = "";
    if (codeCellResult) {
      const errorMessages: Set<string> = new Set();
      for (const error of codeCellResult.errors) {
         errorMessages.add(`🚫 ${error.message}\n`);
      }
      result += [...errorMessages].join('');
      result += codeCellResult.stdout;
    }
    return result;
  });

  onMount(async () => {
    CodeEditor = (await import("./CodeEditor.svelte")).default;
    await tick();
    if (appState.activeCell === index) {
      focus();
    }
  });

  export function getMarkdown() {
    return "```\n" + codeCell.code + "\n```\n";
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
    codeCellResult={codeCellResult}
    codeCell={codeCell}
	  update={handleCodeEditorUpdate}
    bind:this={codeEditor}
  />
  {#if stdoutAndErrors}
    <pre class:hidden={appState.resultsInvalid}>{stdoutAndErrors}</pre>
  {/if}
</div>
