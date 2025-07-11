<script lang="ts">
  import appState from "./stores.svelte";

  import { onMount, tick } from "svelte";

  import type SystemCell from "./cells/SystemCell.svelte";
  import type { MathField as MathFieldClass } from "./cells/MathField.svelte";

  import MathField from "./MathField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import IconButton from "./IconButton.svelte";

  interface Props {
    index: number;
    systemCell: SystemCell;
    insertMathCellAfter: (arg: {detail: {index: number}}) => void;
    insertInsertCellAfter: (arg: {detail: {index: number}}) => void;
    mathCellChanged: () => void;
    triggerSaveNeeded: (pendingMathCellChange?: boolean) => void;
  }

  let {
    index,
    systemCell,
    insertMathCellAfter,
    insertInsertCellAfter,
    mathCellChanged,
    triggerSaveNeeded
  }: Props = $props();

  let numVars = $state(0);
  let numSolutions = $state(0);

  let numRows = $derived(systemCell.expressionFields.length);

  let containerDiv: HTMLDivElement;

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

    for (const [row, expression] of systemCell.expressionFields.entries()) {
      result += `${expression.latex} & `;
      if (row < systemCell.expressionFields.length - 1) {
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
    appState.cells = appState.cells;
    await tick();
    if (systemCell.expressionFields.slice(-1)[0].element) {
      systemCell.expressionFields.slice(-1)[0].element.focus();
    }
  }

  function deleteRow(rowIndex: number) {
    systemCell.deleteRow(rowIndex);
    appState.cells[index] = appState.cells[index];

    triggerSaveNeeded();
    mathCellChanged();
  }

  async function parseLatex(latex: string, mathField: MathFieldClass) {
    triggerSaveNeeded(true);
    
    await mathField.parseLatex(latex);
    appState.cells[index] = appState.cells[index];
    appState.system_results[index] = null;

    mathCellChanged();
  }

  function handleSelectedSolutionChange() {
    triggerSaveNeeded();
    mathCellChanged();
  }

  function handleEnter(row: number) {
    if (row < systemCell.expressionFields.length - 1) {
      if (systemCell.expressionFields[row+1].element?.focus) {
        systemCell.expressionFields[row+1].element?.focus();
      }
    } else {
      addRow();
    }
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

      {#if systemCell.expressionFields}
        {#each systemCell.expressionFields as mathField, i (mathField.id)}
          <div
            class="item math-field padded"
            id={`system-expression-${index}-${i}`}
            style="grid-column: 2; grid-row: {i+1};"
          > 
            <MathField
              editable={true}
              update={(e) => parseLatex(e.latex, mathField)}
              enter={() => handleEnter(i)}
              shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
              modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
              mathField={mathField}
              parsingError={mathField.parsingError}
              parsePending={mathField.parsePending}
              bind:this={mathField.element}
              latex={mathField.latex}
            />
            {#if mathField.parsingError && !mathField.parsePending}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
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
      update={(e) => parseLatex(e.latex, systemCell.parameterListField)}
      shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
      modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
      mathField={systemCell.parameterListField}
      parsingError={systemCell.parameterListField.parsingError}
      parsePending={systemCell.parameterListField.parsePending}
      bind:this={systemCell.parameterListField.element}
      latex={systemCell.parameterListField.latex}
    />
    {#if systemCell.parameterListField.parsingError && !systemCell.parameterListField.parsePending}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{systemCell.parameterListField.parsingErrorMessage}</span>
        <Error class="error"/>
      </TooltipIcon>
    {/if}
  </div>
</div>



