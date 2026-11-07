<script lang="ts">
  import appState from "./stores.svelte";

  import { onMount, tick } from "svelte";

  import type SystemCell from "./cells/SystemCell.svelte";

  import MathField from "./MathField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import IconButton from "./IconButton.svelte";
  import { prepLatexForMarkdown } from "./utility";
  import { getInitialParsingState } from "./parser/utility";
  import type { SystemDefinition } from "./cells/SystemCell.svelte";
  import type { EqualityStatement } from "./parser/types";
  import type { Statement, SubQueryStatement } from "./parser/types";
  import type { CellStatements } from "./types";
  import type { FluidFunction } from "./cells/FluidCell.svelte";
  import type { CodeCellFunction } from "./cells/CodeCell.svelte";
  import type { GridInterpolationFunction, InterpolationFunction } from "./cells/DataTableCell.svelte";

  interface Props {
    index: number;
    systemCell: SystemCell;
    mathCellChanged: () => void;
    triggerSaveNeeded: (pendingMathCellChange?: boolean) => void;
  }

  let {
    index,
    systemCell,
    mathCellChanged,
    triggerSaveNeeded
  }: Props = $props();

  let numVars = $state(0);
  let numSolutions = $state(0);

  let numRows = $derived(systemCell.expressionLatexs.length);

  let containerDiv: HTMLDivElement;

  let parameterListParsingState = $state(getInitialParsingState());
  // svelte-ignore state_referenced_locally
  let expressionParsingStates = $state(Array.from({ length: numRows }, () => getInitialParsingState()));

  let expressionMathFields: MathField[] = [];

  let parsingError = $derived.by(() => {
    return parameterListParsingState.parsingError || 
           expressionParsingStates.some(value => value.parsingError);
  });

  let parsePending = $derived.by(() => {
    return parameterListParsingState.parsePending ||
           expressionParsingStates.reduce((accum, value) => accum || value.parsePending, false);
  });

  let cellStatements: CellStatements = $derived.by(() => {
    const statements: (Statement | SubQueryStatement)[] = [];
    const endStatements: (Statement | SubQueryStatement)[] = [];
    const subQueries: Map<string,SubQueryStatement> = new Map();
    const systemDefinitions: SystemDefinition[] = [];
    const fluidFunctions: FluidFunction[] = [];
    const codeCellFunctions: CodeCellFunction[] = [];
    const interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = [];

    const systemDefinition = getSystemDefinition();
    if (systemDefinition) {
      systemDefinitions.push(systemDefinition);
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
    let startDelimiter: string;
    let endDelimiter: string;
    if (centerEquations) {
      startDelimiter = "$$ ";
      endDelimiter = " $$";
    } else {
      startDelimiter = "$";
      endDelimiter = "$ <!-- inline -->";
    }

    // render system
    let result = `${startDelimiter}\\text{System} = \\begin{cases} `;

    for (const [row, expression] of systemCell.expressionLatexs.entries()) {
      result += `${prepLatexForMarkdown(expression)} & `;
      if (row < systemCell.expressionLatexs.length - 1) {
        result += " \\\\ ";
      }
    }
    result += ` \\end{cases}${endDelimiter} \n\n`;

    // render solution
    if (appState.system_results[index]) {
      result += `${startDelimiter}\\text{Solution} = \\begin{cases} `;

      if (appState.system_results[index].error) {
        result += " \\text{System Solve Error} ";
      } else {
        const vars = Object.getOwnPropertyNames(appState.system_results[index].solutions);
        for (const [row, var_name] of vars.entries()) {
          result += `${var_name} & = \\quad ${appState.system_results[index].solutions[var_name][systemCell.selectedSolution]}`;
          if (row < vars.length - 1) {
            result += " \\\\ ";
          }
        }
      }

      result += ` \\end{cases}${endDelimiter} \n\n`;
    }

    return result;
  }

  onMount(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function focus() {
    if ( containerDiv && containerDiv.parentElement &&
         !containerDiv.parentElement.contains(document.activeElement) ) {
      const mathElement: HTMLTextAreaElement = document.querySelector(`#system-expression-${index}-0 math-field`);
      if (mathElement) {
        mathElement.focus();
      }
    }
  }

  async function addRow() {
    systemCell.addRow();
    expressionParsingStates = [...expressionParsingStates, getInitialParsingState()];

    await tick();
    if (expressionMathFields.slice(-1)[0]) {
      expressionMathFields.slice(-1)[0].focus();
    }
  }

  function deleteRow(rowIndex: number) {
    systemCell.deleteRow(rowIndex);
    expressionParsingStates = [...expressionParsingStates.slice(0,rowIndex),
                               ...expressionParsingStates.slice(rowIndex+1)];

    triggerSaveNeeded();
    mathCellChanged();
  }

  async function handleUpdate() {
    appState.system_results[index] = null;
  }

  function handleSelectedSolutionChange() {
    triggerSaveNeeded();
    mathCellChanged();
  }

  function handleEnter(row: number) {
    if (row < systemCell.expressionLatexs.length - 1) {
      if (expressionMathFields[row+1]) {
        expressionMathFields[row+1].focus();
      }
    } else {
      addRow();
    }
  }

  function getSystemDefinition(): SystemDefinition | null {
    const statements: EqualityStatement[] = [];
    
    for (const parsingState of expressionParsingStates) {
      if (parsingState.parsingError || parsingState.statement.type !== "equality") {
        return null;
      } else {
        statements.push(parsingState.statement);
      }
    }

    let system: SystemDefinition | null = null;

    if (parameterListParsingState.parsingError) {
      return null;
    } else {
      const statement = parameterListParsingState.statement;
      if (statement.type === "unknowns" && statement.numericalSolve === false) {
        system = {
          statements: statements,
          variables: statement.ids,
          numericalSolve: false,
          selectedSolution: systemCell.selectedSolution
        }
      } else if (statement.type === "unknowns") {
        systemCell.selectedSolution = 0;
        system = {
          statements: statements,
          variables: statement.ids,
          numericalSolve: true,
          selectedSolution: systemCell.selectedSolution,
          guesses: statement.guesses,
          guessStatements: statement.statements
        }
      }
    }

    return system;
  }

  $effect( () => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  $effect( () => { 
    if ( appState.system_results[index] ) {
      if ( appState.system_results[index].error ) {
        numVars = 0;
        numSolutions = 0;
      } else {
        const vars = Object.getOwnPropertyNames(appState.system_results[index].solutions);
        numVars = vars.length;
        if (numVars > 0) {
          numSolutions = appState.system_results[index].solutions[vars[0]].length;
        } else {
          numSolutions = 0;
          appState.system_results[index].error = "Error: Empty solution";
        }
      }

      if (systemCell.selectedSolution > numSolutions - 1) {
        systemCell.selectedSolution = 0;
      }
    }
  });
  
</script>


<style>
  div.container {
    display:flex;
    flex-flow: row;
    break-inside: avoid;
  }

  div.definition-container {
    display:flex;
    flex-flow: column;
  }

  div.system-container {
    display: grid;
    width: fit-content;
    padding-top: 10px;
    padding-bottom: 0px;
  }

  div.solution-container {
    display: grid;
    width: fit-content;
    padding-top: 10px;
    padding-left: 40px;
    padding-bottom: 0px;
    height: fit-content;
  }

  div.item {
    display: flex;
    align-self: center;
    justify-content: left;
    padding: 7px;
  }

  div.item.math-field {
    display: flex;
    align-items: center;
  }

  div.item.math-field.padded {
    padding-left: 10px;
    margin-left: 0px;
  }

  div.item.center {
    align-self: center;
    justify-self: center;
  }

  div.item.system-label {
    padding-left: 0px;
    padding-right: 14px;
    align-items: center;
    border-right: solid 2px;
    height: 100%;
    white-space: nowrap;
  }

  div.solve-for {
    display: flex;
    flex-wrap: row;
    justify-self: left;
    margin-left: 70px;
  }

  div.solve-for > div.item {
    padding-left: 0px;
  }

  div.item.justify-right {
    justify-self: right;
  }

  input {
    margin: 0px;
  }

  div.error {
    display:flex;
    align-items: center;
    height: fit-content;
    padding-left: 20px;
    padding-top: 10px;
  }


</style>


<div
  class="container"
  bind:this={containerDiv}  
>
  <div
    class="definition-container"
  >
    <div
      class="system-container"
    >
      <div
        class="item system-label"
        style="grid-column: 1; grid-row: 1 / {numRows+1}"
      >
        System = 
      </div>

      {#if systemCell.expressionLatexs}
        {#each {length: systemCell.expressionLatexs.length}, i}
          <div
            class="item math-field padded"
            id={`system-expression-${index}-${i}`}
            style="grid-column: 2; grid-row: {i+1};"
          > 
            <MathField
              editable={true}
              type="equality"
              bind:latex={systemCell.expressionLatexs[i]}
              update={handleUpdate}
              enter={() => handleEnter(i)}
              bind:parsingState={expressionParsingStates[i]}
              bind:this={expressionMathFields[i]}
            />
            {#if expressionParsingStates[i].parsingError && !expressionParsingStates[i].parsePending}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{expressionParsingStates[i].parsingErrorMessage}</span>
                <Error class="error"/>
              </TooltipIcon>
            {/if}
          </div>

          {#if numRows > 1 }
            <div 
              class="item"
              style="grid-column: 3; grid-row: {i+1};"
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

        {/each}
      {/if}

      <div 
        class="item"
        style="grid-column: 2; grid-row: {numRows+1};"
      >
        <IconButton
          click={addRow}
          id={`add-row-${index}`}
          title="Add Equation"
        >
          <Add />
        </IconButton>
      </div>

    </div>

  </div>
  {#if appState.system_results[index]}
    {#if appState.system_results[index].error}
      <div class="error"><Error class="error"/>{appState.system_results[index].error}</div>
    {:else}
      <div class="solution-container">
        <div
          class="item system-label"
          style="grid-column: 1; grid-row: 1 / {numVars+2}"
        >
          Solution = 
        </div>
        {#each Object.getOwnPropertyNames(appState.system_results[index].solutions) as var_name, i}
          {#each appState.system_results[index].solutions[var_name] as value, j}
            {#if j === 0}
              <div
                class="item math-field padded justify-right"
                style="grid-column: 2; grid-row: {i+1};"
              >
                <MathField latex={var_name + ' ='}/>
              </div>
            {/if}
              {#if numSolutions > 1 && i === 0}
              <div
                class="item center"
                style="grid-column: {j+3}; grid-row: {numVars+2};"
              >
                <input 
                  type="radio"
                  id={`solution-radio-${index}-${j}`}
                  name={`selected_solution_${index}`}
                  bind:group={systemCell.selectedSolution}
                  value={j}
                  onchange={handleSelectedSolutionChange}
                >
              </div>
              {#if j === 0}
                <div
                  class="item justify-right"
                  style="grid-column: 1 / 3; grid-row: {numVars+2}"
                >
                  Selected Solution:
                </div>
              {/if}
            {/if}
            <div
              class="item math-field center"
              style="grid-column: {j+3}; grid-row: {i+1};"
            >
              <MathField latex={value}/>
            </div>
          {/each}
        {/each}
      </div>
    {/if}
  {/if}
</div>

<div
  class="solve-for"
>
  <div class="item">Solve for: </div>
  <div
    class="item math-field"
    id={`system-parameterlist-${index}`}
  >
    <MathField
      editable={true}
      type="id_list"
      bind:latex={systemCell.parameterListLatex}
      update={handleUpdate}
      bind:parsingState={parameterListParsingState}
    />
    {#if parameterListParsingState.parsingError && !parameterListParsingState.parsePending}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{parameterListParsingState.parsingErrorMessage}</span>
        <Error class="error"/>
      </TooltipIcon>
    {/if}
  </div>
</div>



