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

  let paramterMathFieldInstances = [];
  let rhsMathFieldInstances = [];

  function handleMathUpdate(event, subIndex) {
    if (!(event.detail.latex === "" && subIndex === $cells[index].data.latexs.length - 1)) 
    { 
      parseLatex(event.detail.latex, index, subIndex, true);
    } else {
      $cells[index].extra.parsingErrors[subIndex] = false;
      $cells[index].extra.statements[subIndex] = null;
      $cells[index].extra.pendingNewLatexs[subIndex] = false;
    }
  }

</script>

<div class="container">
  {#if $cells[index].data.parameterLatexs}
    {#each $cells[index].data.parameterLatexs as latex, j}
      <div
        class="item math-field"
        on:focusin={() => (activeMathField = i)}
        style="grid-column: {col + 2}; grid-row: 1;"
      >
        <MathField
          editable={true}
          on:update={(e) => handleMathUpdate(e, i)}
          parsingError={$cells[index].extra.parsingErrors[i]}
          bind:this={mathFieldInstances[i]}
        />
        {#if $cells[index].extra.parsingErrors[i]}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText"
              >{$cells[index].extra.parsingErrorMessages[i]}</span
            >
            <Error16 class="error" />
          </TooltipIcon>
        {:else if latex && $results[index] && !$results[index][i]?.plot}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Not a plot</span>
            <Error16 class="error" />
          </TooltipIcon>
        {:else if latex && $results[index] && $results[index][i]?.plot && !$results[index][i].data[selectedSolution].numericInput}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText"
              >Limits of plot range do not evaluate to a number</span
            >
            <Error16 class="error" />
          </TooltipIcon>
        {:else if latex && $results[index] && $results[index][i]?.plot > 0 && !$results[index][i].data[selectedSolution].limitsUnitsMatch}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText"
              >Units of the upper and lower range limit do not match</span
            >
            <Error16 class="error" />
          </TooltipIcon>
        {:else if latex && $results[index] && $results[index][i]?.plot > 0 && !$results[index][i].data[selectedSolution].numericOutput}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText"
              >Results of expression does not evaluate to numeric values</span
            >
            <Error16 class="error" />
          </TooltipIcon>
        {:else if latex && $results[index] && $results[index][i]?.plot > 0 && $results[index][i].data[selectedSolution].unitsMismatch}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Units Mismatch</span>
            <Error16 class="error" />
          </TooltipIcon>
        {/if}
      </span>
    {/each}
  {/if}

  <div class="right-buttons" style="grid-column:{numColumns + 1}; grid-row:1">
    <button> +Column </button>
  </div>
  <div class="bottom-buttons" style="grid-column:1; grid-row:{numRows + 1}">
    <button> +Row </button>
  </div>
</div>

<style>
  div.container {
    display: grid;
  }

  div.item {
    border: solid 1px;
    margin: 0 -1px -1px 0;
    display: flex;
    justify-content: center;
  }

  div.bottom-buttons {
    margin-top: 1px;
    width: 0px;
    height: 0px;
  }

  div.right-buttons {
    margin-left: 1px;
    width: 0px;
    height: 0px;
  }
</style>
