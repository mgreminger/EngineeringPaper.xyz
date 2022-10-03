<script lang="ts">
  import {
    cells,
    system_results,
    activeCell,
    handleFocusIn,
    handleVirtualKeyboard,
    handleFocusOut,
    mathCellChanged
  } from "./stores";

  import { onMount, tick } from "svelte";

  import type SystemCell from "./cells/SystemCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";

  export let index: number;
  export let systemCell: SystemCell;

  let activeMathInstance = null;

  let numVars = 0;
  let numSolutions = 0;

  onMount(() => {
    activeMathInstance = systemCell.expressionFields[0].element;

    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (activeMathInstance?.focus) {
      activeMathInstance.focus();
    }
  }

  function blur() {
    if (activeMathInstance?.blur) {
      activeMathInstance.blur();
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
    $cells = $cells;
    $system_results[index] = null;
  }

  function handleSelectedSolutionChange() {
    $mathCellChanged = true;
  }

  function handleKeyboardShortcuts(event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "Enter":
        addRow();
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  $: if ($system_results[index]) {
    if (systemCell.selectedSolution > $system_results[index].solutions.length - 1) {
      systemCell.selectedSolution = 0;
    }
  }
     
  $: if ($activeCell === index) {
      focus();
    } else {
      blur();
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
  }
  
</script>


<style>
  button {
    background: none;
    border: none;
    border-radius: 50%;
    position: relative;
    width: 20px;
    height: 20px;
  }

  button:hover {
    background: gainsboro;
  }

  div.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 16px;
    width: 16px;
  }

  div.container {
    display:flex;
    flex-flow: row;
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


<div class="container">
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
            on:keydown={handleKeyboardShortcuts}
          > 
            <MathField
              editable={true}
              on:update={(e) => parseLatex(e.detail.latex, mathField)}
              parsingError={mathField.parsingError}
              bind:this={mathField.element}
              latex={mathField.latex}
              on:focusin={ () => { handleFocusIn(index); activeMathInstance = mathField.element; } }
              on:focusout={ () => { handleFocusOut(mathField) } }
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
              <button
                on:click={() => deleteRow(i)}
                title="Delete Row"
                id={`delete-row-${index}-${i}`}
              >
                <div class="icon">
                  <RowDelete />
                </div>
              </button>
            </div>
          {/if}

        {/each}
      {/if}

      <div
        class="solve-for"
        style="grid-column: 1; grid-row: {numRows+1};"
      >
        <div class="item">Solve for: </div>
        <div
          class="item math-field"
          id={`system-parameterlist-${index}`}
        >
          <MathField
            editable={true}
            on:update={(e) => parseLatex(e.detail.latex, systemCell.parameterListField)}
            parsingError={systemCell.parameterListField.parsingError}
            bind:this={systemCell.parameterListField.element}
            latex={systemCell.parameterListField.latex}
            on:focusin={ () => { handleFocusIn(index); activeMathInstance = systemCell.parameterListField.element; } }
            on:focusout={ () => { handleFocusOut(systemCell.parameterListField) } }
          />
          {#if systemCell.parameterListField.parsingError}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{systemCell.parameterListField.parsingErrorMessage}</span>
              <Error class="error"/>
            </TooltipIcon>
          {/if}
          </div>
      </div>

      <div 
        class="item"
        style="grid-column: 2; grid-row: {numRows+1};"
      >
        <button
          on:click={addRow}
          id={`add-row-${index}`}
          title="Add Equation"
        >
          <div class="icon">
            <Add />
          </div>
        </button>
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

{#if index === $activeCell && activeMathInstance}
<div>
  <div class="keyboard">
    <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, activeMathInstance)}/>
  </div>
</div>
{/if}


