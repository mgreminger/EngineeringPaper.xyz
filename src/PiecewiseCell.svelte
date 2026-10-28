<script lang="ts">
  import appState from "./stores.svelte";
  import { triggerSaveNeeded, mathCellChanged } from "./stores.svelte";

  import { onMount, tick } from "svelte";

  import type PiecewiseCell from "./cells/PiecewiseCell.svelte";

  import MathField from "./MathField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import IconButton from "./IconButton.svelte";
  import { prepLatexForMarkdown } from "./utility";
  import { getInitialParsingState, type ParsingState } from "./parser/utility";
  import type { Statement, SubQueryStatement } from "./parser/types";
  import type { CellStatements } from "./types";
  import type { SystemDefinition } from "./cells/SystemCell.svelte";
  import type { FluidFunction } from "./cells/FluidCell.svelte";
  import type { CodeCellFunction } from "./cells/CodeCell.svelte";
  import type { GridInterpolationFunction, InterpolationFunction } from "./cells/DataTableCell.svelte";

  interface Props {
    index: number;
    piecewiseCell: PiecewiseCell;
  }

  let {
    index,
    piecewiseCell,
  }: Props = $props();

  let containerDiv: HTMLDivElement;

  let numRows = $derived(piecewiseCell.expressionLatexs.length);

  let parameterParsingState: ParsingState = $state(getInitialParsingState());
  // svelte-ignore state_referenced_locally
  let expressionParsingStates: ParsingState[] = $state(Array.from({ length: piecewiseCell.expressionLatexs.length }, () => getInitialParsingState()));
  // svelte-ignore state_referenced_locally
  let conditionParsingStates: ParsingState[] = $state(Array.from({ length: piecewiseCell.conditionLatexs.length }, () => getInitialParsingState()));

  const parserId = appState.nextParserId++;

  let piecewiseStatement: Statement | null = $state(null);
  let piecewiseParsePending = $state(false);

  let expressionMathFields: MathField[] = [];

  let parsingError = $derived.by(() => {
    return parameterParsingState.parsingError || 
           expressionParsingStates.some(value => value.parsingError) ||
           conditionParsingStates.some(value => value.parsingError);
  });

  let localParsePending = $derived.by(() => {
    return parameterParsingState.parsePending || piecewiseParsePending || 
           expressionParsingStates.reduce((accum, value) => accum || value.parsePending, false) ||
           conditionParsingStates.reduce((accum, value) => accum || value.parsePending, false);
  });

  let parsePending = $derived.by(() => {
    return localParsePending || piecewiseParsePending;
  });

  let cellStatements: CellStatements = $derived.by(() => {
    const statements: (Statement | SubQueryStatement)[] = [];
    const endStatements: (Statement | SubQueryStatement)[] = [];
    const subQueries: Map<string,SubQueryStatement> = new Map();
    const systemDefinitions: SystemDefinition[] = [];
    const fluidFunctions: FluidFunction[] = [];
    const codeCellFunctions: CodeCellFunction[] = [];
    const interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = [];

    if (piecewiseStatement) {
      endStatements.push(piecewiseStatement);
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
    return parsePending;
  }

  export function getParsingError() {
    return parsingError;
  }

  export function getCellStatements() {
    return cellStatements;
  }

  export function getMarkdown(centerEquations: boolean) {
    let result = `${prepLatexForMarkdown(piecewiseCell.parameterLatex)} = \\begin{cases} `;

    for (const [i, latex] of piecewiseCell.expressionLatexs.entries()) {
      if (i < piecewiseCell.conditionLatexs.length) {
        result += `${prepLatexForMarkdown(latex)} &: \\quad ${prepLatexForMarkdown(piecewiseCell.conditionLatexs[i])} \\\\ `;
      } else {
        result += `${prepLatexForMarkdown(latex)} &: \\quad \\text{otherwise} \\end{cases}`;
      }
    }

    if (centerEquations) {
      return `$$ ${result} $$ \n\n`;
    } else {
      return `$${result.trim()}$ <!-- inline --> \n\n`;
    }
  }


  onMount(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function focus() {
    if ((containerDiv && !containerDiv.contains(document.activeElement))) {
      const parameterField: HTMLTextAreaElement = document.querySelector(`#piecewise-parameter-${index} math-field`)
      if (parameterField) {
        parameterField.focus();
      }
    }
  }

  async function addRow() {
    piecewiseCell.addRow();
    appState.cells[index] = appState.cells[index];

    triggerSaveNeeded();
    mathCellChanged();

    await tick();
    if (expressionMathFields[piecewiseCell.expressionLatexs.length-2]) {
      expressionMathFields[piecewiseCell.expressionLatexs.length-2].focus();
    }
  }

  async function deleteRow(rowIndex: number) {
    triggerSaveNeeded(true);

    piecewiseCell.deleteRow(rowIndex);
    await parsePiecewiseStatement();
    appState.cells[index] = appState.cells[index];

    mathCellChanged();
  }

  async function parseLatex() {
    await parsePiecewiseStatement();
    mathCellChanged();
  }

  function handleEnter(row: number) {
    if (row < piecewiseCell.expressionLatexs.length - 1) {
      if (row === piecewiseCell.expressionLatexs.length-2 ) {
        addRow();
      } else {
        if (expressionMathFields[row+1]) {
          expressionMathFields[row+1].focus();
        }
      }
    }
  }

  let currentParseId = 0;
  async function parsePiecewiseStatement() {
    if (!(parsingError || localParsePending)) {
      piecewiseStatement = null;
      return;
    }

    const myParseId = ++currentParseId;

    let args = piecewiseCell.expressionLatexs
                            .slice(0,-1)
                            .map((exp, index) => `(${latex},${piecewiseCell.conditionLatexs[index]}),`)
                            .reduce((accum, value) => accum + value, '');
    const latex = `${piecewiseCell.parameterLatex} = piecewise( ${args}(${piecewiseCell.expressionLatexs.slice(-1)[0]}, 1>0) )`;

    piecewiseParsePending = true;
    const parsingResult = await appState.parserWrapper.parseLatex(latex, parserId, 'piecewise');
    piecewiseParsePending = false;

    if (myParseId !== currentParseId) {
      return;
    }

    if (!parsingResult.parsingError) {
      piecewiseStatement = parsingResult.statement;
    } else {
      console.warn('Internal piecewise cell parsing error.');
      piecewiseStatement = null;
    }
  }

  $effect(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });
  
</script>


<style>
  div.container {
    display: grid;
    width: fit-content;
    padding-top: 10px;
    padding-bottom: 10px;
    break-inside: avoid;
  }

  div.item {
    display: flex;
    align-self: center;
    justify-content: left;
    padding: 7px;
    padding-left: 0px;
  }

  div.item.equals {
    padding-left: 7px;
    padding-right: 14px;
    align-items: center;
    border-right: solid 2px;
    height: 100%;
  }

  div.if {
    padding-right: 10px;
  }

  div.item.math-field {
    display: flex;
    align-items: center;
  }

  div.item.math-field.expressions {
    padding-left: 10px;
    margin-left: 0px;
  }

</style>


<div
  class="container"
  bind:this={containerDiv}
>
  <div
    class="item math-field"
    id={`piecewise-parameter-${index}`}
    style="grid-column: 1; grid-row: 1 / {numRows+1};"
  >
    <MathField
      editable={true}
      type='parameter'
      update={parseLatex}
      bind:parsingState={parameterParsingState}
      bind:latex={piecewiseCell.parameterLatex}
    />
    {#if parameterParsingState.parsingError && !parameterParsingState.parsePending}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{parameterParsingState.parsingErrorMessage}</span>
        <Error class="error"/>
      </TooltipIcon>
    {/if}
  </div>

  <div
    class="item equals"
    style="grid-column: 2; grid-row: 1 / {numRows+1};"
  >
    =
  </div>


  {#if piecewiseCell.expressionLatexs}
    {#each {length: piecewiseCell.expressionLatexs.length}, i}
      <div
        class="item math-field expressions"
        id={`piecewise-expression-${index}-${i}`}
        style="grid-column: 3; grid-row: {i+1};"
      >
        <MathField
          editable={true}
          type='expression_no_blank'
          update={parseLatex}
          enter={() => handleEnter(i)}
          bind:parsingState={expressionParsingStates[i]}
          bind:this={expressionMathFields[i]}
          bind:latex={piecewiseCell.expressionLatexs[i]}
        />
        {#if expressionParsingStates[i].parsingError && !expressionParsingStates[i].parsePending}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{expressionParsingStates[i].parsingErrorMessage}</span>
            <Error class="error"/>
          </TooltipIcon>
        {/if}
      </div>

      {#if i === numRows - 1}
        <div
          class="item"
          style="grid-column: 4; grid-row: {i+1};"
        >
          otherwise
        </div>
      {/if}


      {#if i < piecewiseCell.conditionLatexs.length}
        <div
          class="item math-field"
          id={`piecewise-condition-${index}-${i}`}
          style="grid-column: 4; grid-row: {i+1};"
        >
          <div class="if">if</div>
          
          <MathField
            editable={true}
            type='condition'
            update={parseLatex}
            enter={() => handleEnter(i)}
            bind:parsingState={conditionParsingStates[i]}
            bind:latex={piecewiseCell.conditionLatexs[i]}
          />
          {#if conditionParsingStates[i].parsingError && !conditionParsingStates[i].parsePending}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{conditionParsingStates[i].parsingErrorMessage}</span>
              <Error class="error"/>
            </TooltipIcon>
          {/if}
        </div>
  
        {#if numRows > 2 }
          <div 
            class="item"
            style="grid-column: 5; grid-row: {i+1};"
          >
            <IconButton
              click={() => deleteRow(i)}
              title="Delete Row"
              id={`delete-row-${index}-${i}`}
            >
              <RowDelete />
            </IconButton>
          </div>
        {/if}
      {/if}

    {/each}
  {/if}



  <div 
    class="item"
    style="grid-column: 5; grid-row: {numRows};"
  >
    <IconButton
      click={addRow}
      id={`add-row-${index}`}
      title="Add Row"
    >
        <Add />
    </IconButton>
  </div>

</div>



