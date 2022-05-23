<script>
  import {
    cells,
    results,
    activeCell,
    handleFocusIn,
    parseTableCellParameterLatex,
    parseTableCellRhsLatex,
    handleVirtualKeyboard,
    handleFocusOut,
  } from "./stores.js";

  import { onMount, tick } from "svelte";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";
  import Plot from "./Plot.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";

  export let index;

  let parameterMathFieldInstances = [];
  let rhsMathFieldInstances = [];

  let activeMathInstance = null;


  $: numColumns = $cells[index].data.parameterLatexs.length;
  $: numRows = $cells[index].data.rowLabels.length;
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

<div class="container">
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
    {/each}
  {/if}

  {#if $cells[index].data.rhsLatexs}
    {#each $cells[index].data.rhsLatexs as row, i}
      {#if row}
        {#each row as _, j}
          <div
            class="item math-field"
            on:focusin={() => (activeMathInstance = $cells[index].extra.rhsMathFieldInstances[i][j])}
            style="grid-column: {j+2}; grid-row: {i+2};"
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
        style="grid-column: 1; grid-row: {i+2};"
      >
      <p 
        contenteditable="true"
        bind:innerHTML={$cells[index].data.rowLabels[i]}
      >
        {label}
      </p>
      </div>
    {/each}
  {/if}

  <div class="right-buttons" style="grid-column:{numColumns + 2}; grid-row:1">
    <button> +Column </button>
  </div>
  <div class="bottom-buttons" style="grid-column:1; grid-row:{numRows + 2}">
    <button> +Row </button>
  </div>
</div>


