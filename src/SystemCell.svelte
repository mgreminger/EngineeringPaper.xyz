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

  import { onMount } from "svelte";

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

  onMount(() => {
    activeMathInstance = systemCell.expressionFields[0].element;

    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (activeMathInstance) {
      activeMathInstance.focus();
    }
  }

  function blur() {
    if (activeMathInstance) {
      activeMathInstance.blur();
    }
  }

  function addRow() {
    systemCell.addRow();
    $cells = $cells;
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
  }

  $: if ($activeCell === index) {
      focus();
    } else {
      blur();
    }

  $: numRows = systemCell.expressionFields.length;
  
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
    padding-bottom: 0px;
  }

  div.item {
    display: flex;
    align-self: center;
    justify-content: left;
    padding: 7px;
    padding-left: 0px;
  }

  div.item.math-field {
    display: flex;
    align-items: center;
  }

  div.item.math-field.expression {
    border-left: solid 2px;
    padding-left: 10px;
  }

  div.solve-for {
    display: flex;
    flex-wrap: row;
    margin-bottom: 7px;
  }

  div.item.add-row {
    padding-left: 7px;
    padding-bottom: 0px;
  }
</style>


<div
  class="container"
>
  <div
    class="system-container"
  >
    <div
      class="item"
      style="grid-column: 1; grid-row: 1 / {numRows+1}"
    >
      System = 
    </div>

    {#if systemCell.expressionFields}
      {#each systemCell.expressionFields as mathField, i (mathField.id)}
        <div
          class="item math-field expression"
          id={`system-expression-${index}-${i}`}
          style="grid-column: 2; grid-row: {i+1};"
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
      class="item add-row"
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

  <div class="solve-for">
    <div class="item">Solve system for: </div>
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

  {#if $system_results[index]}
    {#if $system_results[index].error}
      <div>{$system_results[index].error}</div>
    {:else}
      <div class="solution-container">
        <div
          class="item"
          style="grid-column: 1; grid-row: 2 / {$system_results[index].solutions.length+3}"
        >
          Solution = 
        </div>
        {#each $system_results[index].solutions as solution, j}
          {#each solution as value, i}
            {#if j === 0}
              <div
                class="item math-field expression"
                style="grid-column: 2; grid-row: {i+2};"
              >
                <MathField latex={value.name + ' ='}/>
              </div>
            {/if}
            <div
              class="item math-field"
              style="grid-column: {j+3}; grid-row: {i+2};"
            >
              <MathField latex={value.rhs}/>
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


