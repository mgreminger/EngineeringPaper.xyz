<script lang="ts">
  import { onMount } from "svelte";
  import { cells, results, activeCell, mathCellChanged } from "./stores";
  import type MathCell from "./cells/MathCell";
  import PlotCell from "./cells/PlotCell";
  import MathField from "./MathField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";

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
    if("isRange" in mathCell.mathField.statement && mathCell.mathField.statement.isRange) {
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
      mathField={mathCell.mathField}
      parsingError={mathCell.mathField.parsingError}
      bind:this={mathCell.mathField.element}
      latex={mathCell.mathField.latex}
    />
  </span>
  {#if mathCell.mathField.parsingError}
    <TooltipIcon direction="right" align="end">
      <span slot="tooltipText">{mathCell.mathField.parsingErrorMessage}</span>
      <Error class="error"/>
    </TooltipIcon>
  {:else if $results[index] && mathCell.mathField.statement &&
      mathCell.mathField.statement.type === "query"}
    {@const result = $results[index]}
    {#if !(result instanceof Array)}
      {#if result.units !== "Dimension Error" && result.units !== "Exponent Not Dimensionless"}
        {#if result.userUnitsValueDefined && !result.unitsMismatch}
          <span class="hidden" id="{`result-value-${index}`}">{result.userUnitsValue}</span>
          <span class="hidden" id="{`result-units-${index}`}">{mathCell.mathField.statement.units}</span>
          <MathField
            latex={`=${result.userUnitsValue}${mathCell.mathField.statement.unitsLatex}`}
          />
        {:else if !result.unitsMismatch}
          <span class="hidden" id="{`result-value-${index}`}">{result.value}</span>
          <span class="hidden" id="{`result-units-${index}`}">{result.units}</span>
          <MathField
            latex={`${result.value}${result.unitsLatex}`}
          />
        {:else}
          <TooltipIcon direction="right" align="end">
            <span id="{`result-units-${index}`}" slot="tooltipText">Units Mismatch</span>
            <Error class="error"/>
          </TooltipIcon>
        {/if}
      {:else}
        <TooltipIcon direction="right" align="end">
          <span id="{`result-units-${index}`}" slot="tooltipText">{result.units}</span>
          <Error class="error"/>
        </TooltipIcon>
      {/if}
    {:else}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">Internal error, attempt to place plot result in a math cell. Report to support@engineeringpaper.xyz</span>
        <Error class="error"/>
      </TooltipIcon>
    {/if}
  {:else if mathCell.mathField.statement && mathCell.mathField.statement.type === "blank"}
    <TooltipIcon direction="right">
      <span slot="tooltipText">This field must contain an assignment (e.g., x=y*z) or a query (e.g., x=). To delete an unwanted math cell, click the trash can on the right.</span>
      <Information />
    </TooltipIcon>
  {/if}

</span>

