<script lang="ts">
  import {
    cells,
    system_results,
    activeCell,
    mathCellChanged,
    modifierKey
  } from "./stores";

  import { onMount, tick, createEventDispatcher } from "svelte";

  import type SystemCell from "./cells/SystemCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import IconButton from "./IconButton.svelte";

  export let index: number;
  export let systemCell: SystemCell;

  let containerDiv: HTMLDivElement;

  let numVars = 0;
  let numSolutions = 0;

  export function getMarkdown() {
    // render system
    let result = `$$ \\text{System} = \\begin{cases} `;

    for (const [row, expression] of systemCell.expressionFields.entries()) {
      result += expression.latex;
      if (row < systemCell.expressionFields.length - 1) {
        result += " \\\\ ";
      }
    }
    result += " \\end{cases} $$ \n\n";

    // render solution
    if ($system_results[index]) {
      result += `$$ \\text{Solution} = \\begin{cases} `;

      if ($system_results[index].error) {
        result += " \\text{System Solve Error} ";
      } else {
        const vars = Object.getOwnPropertyNames($system_results[index].solutions);
        for (const [row, var_name] of vars.entries()) {
          result += `${var_name} & = \\quad ${$system_results[index].solutions[var_name][systemCell.selectedSolution]}`;
          if (row < vars.length - 1) {
            result += " \\\\ ";
          }
        }
      }

      result += " \\end{cases} $$ \n\n";
    }

    return result;
  }

  const dispatch = createEventDispatcher<{
    insertMathCellAfter: {index: number};
    insertInsertCellAfter: {index: number};
  }>();

  onMount(() => {
    if ($activeCell === index) {
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
    $cells = $cells;
    await tick();
    if (systemCell.expressionFields.slice(-1)[0].element) {
      systemCell.expressionFields.slice(-1)[0].element.focus();
    }
  }

  function deleteRow(rowIndex: number) {
    systemCell.deleteRow(rowIndex);
    $mathCellChanged = true;
    $cells = $cells;
  }

  function parseLatex(latex: string, mathField: MathFieldClass) {
    mathField.parseLatex(latex);
    $mathCellChanged = true;
    $cells[index] = $cells[index];
    $system_results[index] = null;
  }

  function handleSelectedSolutionChange() {
    $mathCellChanged = true;
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

  $: if ($activeCell === index) {
      focus();
    }

  $: numRows = systemCell.expressionFields.length;

  $: if ( $system_results[index] ) {
    if ( $system_results[index].error ) {
      numVars = 0;
      numSolutions = 0;
    } else {
      const vars = Object.getOwnPropertyNames($system_results[index].solutions);
      numVars = vars.length;
      if (numVars > 0) {
        numSolutions = $system_results[index].solutions[vars[0]].length;
      } else {
        numSolutions = 0;
        $system_results[index].error = "Error: Empty solution";
      }
    }

    if (systemCell.selectedSolution > numSolutions - 1) {
      systemCell.selectedSolution = 0;
    }
  }
  
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
              on:update={(e) => parseLatex(e.detail.latex, mathField)}
              on:enter={() => handleEnter(i)}
              on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
              on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
              mathField={mathField}
              parsingError={mathField.parsingError}
              bind:this={mathField.element}
              latex={mathField.latex}
            />
            {#if mathField.parsingError}
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
                on:click={() => deleteRow(i)}
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
          on:click={addRow}
          id={`add-row-${index}`}
          title="Add Equation"
        >
          <Add />
        </IconButton>
      </div>

    </div>

  </div>
  {#if $system_results[index]}
    {#if $system_results[index].error}
      <div class="error"><Error class="error"/>{$system_results[index].error}</div>
    {:else}
      <div class="solution-container">
        <div
          class="item system-label"
          style="grid-column: 1; grid-row: 1 / {numVars+2}"
        >
          Solution = 
        </div>
        {#each Object.getOwnPropertyNames($system_results[index].solutions) as var_name, i}
          {#each $system_results[index].solutions[var_name] as value, j}
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
                  on:change={handleSelectedSolutionChange}
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
      on:update={(e) => parseLatex(e.detail.latex, systemCell.parameterListField)}
      on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
      on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
      mathField={systemCell.parameterListField}
      parsingError={systemCell.parameterListField.parsingError}
      bind:this={systemCell.parameterListField.element}
      latex={systemCell.parameterListField.latex}
    />
    {#if systemCell.parameterListField.parsingError}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{systemCell.parameterListField.parsingErrorMessage}</span>
        <Error class="error"/>
      </TooltipIcon>
    {/if}
  </div>
</div>



