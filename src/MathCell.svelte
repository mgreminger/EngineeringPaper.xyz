<script>
  import { cells, results, activeCell, handleFocusIn,
           parseMathCellLatex, handleVirtualKeyboard, handleFocusOut} from "./stores.ts";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";

  export let index;

  let mathFieldInstance;

  $: $cells[index].extra.mathFieldInstance = mathFieldInstance;

  $: if (mathFieldInstance) {
    if ($activeCell === index) {
      mathFieldInstance.getMathField().focus();
    } else {
      mathFieldInstance.getMathField().blur();
    }
  }

  $: if($cells[index].extra.statement) {
    if($cells[index].extra.statement.isRange) {
      if ($cells[index].data.type !== "plot") {
        $cells[index].data.type = "plot";

        $cells[index].data.latexs = [$cells[index].data.latex, ""];
        delete $cells[index].data.latex;
        
        $cells[index].extra.pendingNewLatexs = [$cells[index].extra.pendingNewLatex];
        delete $cells[index].extra.pendingNewLatex;

        $cells[index].extra.newLatexs = [$cells[index].extra.newLatex];
        delete $cells[index].extra.newLatex;

        $cells[index].extra.parsingErrors = [$cells[index].extra.parsingError];
        delete $cells[index].extra.parsingError;

        $cells[index].extra.parsingErrorMessages = [$cells[index].extra.parsingErrorMessage];
        delete $cells[index].extra.parsingErrorMessage;

        $cells[index].extra.statements = [$cells[index].extra.statement];
        delete $cells[index].extra.statement;

        $cells[index].extra.mathFieldInstances = [$cells[index].extra.mathFieldInstance];
        delete $cells[index].extra.mathFieldInstance;
      }
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

  :global(svg.error) {
    fill: #da1e28;
  }

</style>

<span class="container">
  <span
    on:focusin={() => handleFocusIn(index)}
    on:focusout={() => handleFocusOut(index)}
  >
    <MathField
      editable={true}
      on:update={(e) => parseMathCellLatex(e.detail.latex, index)}
      parsingError={$cells[index].extra.parsingError}
      bind:this={mathFieldInstance}
      latex={$cells[index].data.latex}
    />
  </span>
  {#if $results[index] && $cells[index].extra.statement &&
      $cells[index].extra.statement.type === "query"}
    {#if $results[index].units !== "Dimension Error" && $results[index].units !== "Exponent Not Dimensionless"}
      {#if $results[index].userUnitsValueDefined && !$results[index].unitsMismatch}
        <span class="hidden" id="{`result-value-${index}`}">{$results[index].userUnitsValue}</span>
        <span class="hidden" id="{`result-units-${index}`}">{$cells[index].extra.statement.units}</span>
        <MathField
          latex={`=${$results[index].userUnitsValue}${$cells[index].extra.statement.unitsLatex}`}
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
          <Error16 class="error"/>
        </TooltipIcon>
      {/if}
    {:else}
      <TooltipIcon direction="right" align="end">
        <span id="{`result-units-${index}`}" slot="tooltipText">{$results[index].units}</span>
        <Error16 class="error"/>
      </TooltipIcon>
    {/if}
  {:else if $cells[index].extra.parsingError}
    <TooltipIcon direction="right" align="end">
      <span slot="tooltipText">{$cells[index].extra.parsingErrorMessage}</span>
      <Error16 class="error"/>
    </TooltipIcon>
  {/if}

</span>

{#if index === $activeCell}
  <div class="keyboard">
    <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, mathFieldInstance)}/>
  </div>
{/if}
