<script lang="ts">
  import { onMount } from "svelte";
  import { cells, results, activeCell, mathCellChanged,
           handleVirtualKeyboard, handleFocusOut } from "./stores";
  import type MathCell from "./cells/MathCell";
  import PlotCell from "./cells/PlotCell";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";

  export let index: number;
  export let mathCell: MathCell;

  onMount( () => {
    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (mathCell.mathField.element?.focus) {
        mathCell.mathField.element.focus();
      }
  }

  function parseLatex(latex: string, index: number) {
    mathCell.mathField.parseLatex(latex);
    $mathCellChanged = true;
    $cells = $cells;
  }


  $: if ($activeCell === index) {
      focus();
    }

  $: if(mathCell.mathField.statement) {
    if(mathCell.mathField.statement.isRange) {
      // user entered range into a math cell, turn this cell into a plot cell
      $cells = [...$cells.slice(0,index), new PlotCell(mathCell), ...$cells.slice(index+1)];
   }
  }

</script>

<style>
  span.hidden {
    display: none;
  }

  span.container {
    display: flex;
    align-items: center;
  }

  :global(.bx--tooltip__trigger) {
    margin-left: 0.5rem;
  }

</style>

<span class="container">
  <span>
    <MathField
      editable={true}
      on:update={(e) => parseLatex(e.detail.latex, index)}
      parsingError={mathCell.mathField.parsingError}
      bind:this={mathCell.mathField.element}
      latex={mathCell.mathField.latex}
      on:focusout={() => handleFocusOut(mathCell.mathField)}
    />
  </span>
  {#if $results[index] && mathCell.mathField.statement &&
      mathCell.mathField.statement.type === "query"}
    {#if $results[index].units !== "Dimension Error" && $results[index].units !== "Exponent Not Dimensionless"}
      {#if $results[index].userUnitsValueDefined && !$results[index].unitsMismatch}
        <span class="hidden" id="{`result-value-${index}`}">{$results[index].userUnitsValue}</span>
        <span class="hidden" id="{`result-units-${index}`}">{mathCell.mathField.statement.units}</span>
        <MathField
          latex={`=${$results[index].userUnitsValue}${mathCell.mathField.statement.unitsLatex}`}
        />
      {:else if !$results[index].unitsMismatch}
        <span class="hidden" id="{`result-value-${index}`}">{$results[index].value}</span>
        <span class="hidden" id="{`result-units-${index}`}">{$results[index].units}</span>
        <MathField
          latex={`${$results[index].value}\\ ${$results[index].unitsLatex}`}
        />
      {:else}
        <TooltipIcon direction="right" align="end">
          <span id="{`result-units-${index}`}" slot="tooltipText">Units Mismatch</span>
          <Error class="error"/>
        </TooltipIcon>
      {/if}
    {:else}
      <TooltipIcon direction="right" align="end">
        <span id="{`result-units-${index}`}" slot="tooltipText">{$results[index].units}</span>
        <Error class="error"/>
      </TooltipIcon>
    {/if}
  {:else if mathCell.mathField.parsingError}
    <TooltipIcon direction="right" align="end">
      <span slot="tooltipText">{mathCell.mathField.parsingErrorMessage}</span>
      <Error class="error"/>
    </TooltipIcon>
  {/if}

</span>

{#if index === $activeCell}
  <div class="keyboard">
    <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, mathCell.mathField.element)}/>
  </div>
{/if}
