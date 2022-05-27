<script>
  import {
    cells,
    results,
    activeCell,
    handleFocusIn,
    parseTableCellParameterLatex,
    parseTableCellParameterUnitLatex,
    parseTableCellRhsLatex,
    handleVirtualKeyboard,
    handleFocusOut,
    parseTableStatements
  } from "./stores.js";

  import { onMount, tick } from "svelte";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";
  import Plot from "./Plot.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";

  export let index;

  let parameterMathFieldInstances = [];
  let parameterUnitMathFieldInstances = [];
  let rhsMathFieldInstances = [];

  let activeMathInstance = null;

  onMount(() => {
    if ($cells[index].data.parameterLatexs) {
      $cells[index].data.parameterLatexs.forEach((latex,i) => {
        parameterMathFieldInstances[i].setLatex(latex);
      });
    }
    if ($cells[index].data.parameterUnitLatexs) {
      $cells[index].data.parameterUnitLatexs.forEach((latex,i) => {
        parameterUnitMathFieldInstances[i].setLatex(latex);
      });
    }
    if ($cells[index].data.rhsLatexs) {
      for (const [rowIndex, row] of $cells[index].data.rhsLatexs.entries()) {
        for (const [colIndex, latex] of row.entries()) {
          rhsMathFieldInstances[rowIndex*$cells[index].data.parameterLatexs.length + colIndex].setLatex(latex);
        }
      }
    }
  });

  $: numColumns = $cells[index].data.parameterLatexs.length;
  $: numRows = $cells[index].data.rowLabels.length;

  $: $cells[index].extra.rhsMathFieldInstances = rhsMathFieldInstances;
  $: $cells[index].extra.parameterMathFieldInstances = parameterMathFieldInstances;
  $: $cells[index].extra.parameterUnitMathFieldInstances = parameterUnitMathFieldInstances;
  
</script>


<style>
  div.container {
    display: grid;
  }

  div.item {
    border: solid 1px;
    margin: 0 -1px -1px 0;
    display: flex;
    justify-content: left;
  }

  div.bottom-buttons {
    margin-top: 1px;
  }

  div.right-buttons {
    margin-left: 1px;
  }
</style>

<div
  class="container"
  on:focusin={() => handleFocusIn(index)}
  on:focusout={() => handleFocusOut(index)}
>
  {#if $cells[index].data.parameterLatexs}
    {#each $cells[index].data.parameterLatexs as _, j}
      <div
        class="item math-field"
        on:focusin={() => (activeMathInstance = $cells[index].extra.parameterMathFieldInstances[j])}
        style="grid-column: {j + 2}; grid-row: 1;"
      >
      <MathField
        editable={true}
        on:update={(e) => parseTableCellParameterLatex(e.detail.latex, index, j)}
        parsingError={$cells[index].extra.parameterParsingErrors[j]}
        bind:this={parameterMathFieldInstances[j]}
      />
      {#if $cells[index].extra.parameterParsingErrors[j]}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{$cells[index].extra.parameterParsingErrorMessages[j]}</span>
          <Error16 class="error"/>
        </TooltipIcon>
      {/if}
      </div>

      <div
        class="item math-field"
        on:focusin={() => (activeMathInstance = $cells[index].extra.parameterUnitMathFieldInstances[j])}
        style="grid-column: {j + 2}; grid-row: 2;"
      >
      <MathField
        editable={true}
        on:update={(e) => parseTableCellParameterUnitLatex(e.detail.latex, index, j)}
        parsingError={$cells[index].extra.parameterUnitParsingErrors[j]}
        bind:this={parameterUnitMathFieldInstances[j]}
      />
      {#if $cells[index].extra.parameterUnitParsingErrors[j]}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{$cells[index].extra.parameterUnitParsingErrorMessages[j]}</span>
          <Error16 class="error"/>
        </TooltipIcon>
      {/if}
      </div>
    {/each}
  {/if}


  {#if $cells[index].data.rhsLatexs}
    {#each $cells[index].data.rhsLatexs as row, i}
      {#if row}
        {#each row as _, j}
          <div
            class="item math-field"
            on:focusin={() => (activeMathInstance = $cells[index].extra.rhsMathFieldInstances[i][j])}
            style="grid-column: {j+2}; grid-row: {i+3};"
          >
          <MathField
            editable={true}
            on:update={(e) => parseTableCellRhsLatex(e.detail.latex, index, i, j)}
            parsingError={$cells[index].extra.rhsParsingErrors[i][j]}
            bind:this={rhsMathFieldInstances[i*numColumns+j]}
          />
          {#if $cells[index].extra.rhsParsingErrors[i][j]}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{$cells[index].extra.rhsParsingErrorMessages[i][j]}</span>
              <Error16 class="error"/>
            </TooltipIcon>
          {/if}
          </div>
        {/each}
      {/if}
    {/each}
  {/if}

  {#if $cells[index].data.rowLabels}
    {#each $cells[index].data.rowLabels as label, i}
      <div
        class="item"
        style="grid-column: 1; grid-row: {i+3};"
      >
        <input 
          type="radio"
          name={`selected_row_${index}`}
          bind:group={$cells[index].data.selectedRow}
          value={i}
          on:change={() => parseTableStatements(index)}
        >
        <input bind:value={$cells[index].data.rowLabels[i]} >
      </div>
    {/each}
  {/if}

  <div class="right-buttons" style="grid-column:{numColumns + 2}; grid-row:1">
    <button> +Column </button>
  </div>
  <div class="bottom-buttons" style="grid-column:1; grid-row:{numRows + 3}">
    <button> +Row </button>
  </div>
</div>


