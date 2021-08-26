<script>
  import { cells, results, activeCell, handleFocusIn,
           parseLatex, handleVirtualKeyboard, handleFocusOut} from "./stores.js";
  import { onMount } from 'svelte';
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";
  import Plot from "./Plot.svelte";


  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";

  export let index;

  let mathFieldInstance;
  let plotData = {data: [{}], layout: {}};

  onMount(() => {
    if ($cells[index].data.latex) { 
      mathFieldInstance.setLatex($cells[index].data.latex);
    }
  });

  function renderAxisUnits(units) {
    return units ? ` [${units}]` : '';
  }

  $: $cells[index].extra.mathFieldInstance = mathFieldInstance;

  $: if ($activeCell === index) {
    if (mathFieldInstance) {
      mathFieldInstance.getMathField().focus();
    }
  }

  $: if($results[index]) {
    if(!$results[index].plot) {
      if ($cells[index].data.type !== "math") {
        $cells[index].data.type = "math";
      }
    }
  }

  $: if ($results[index] && $results[index].plot) {
    plotData = {
        data:[{
          x: $results[index].data[0].displayInput,
          y: $results[index].data[0].displayOutput,
          type: "scatter",
          mode: "lines"
        }],
        layout: {
          yaxis: {title: `${$results[index].data[0].outputName}${renderAxisUnits($results[index].data[0].displayOutputUnits)}`},
          xaxis: {title: `${$results[index].data[0].inputName}${renderAxisUnits($results[index].data[0].displayInputUnits)}`}
        }
      };
  } else {
    plotData = {data: [{}], layout: {}};
  }

</script>

<style>
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
      on:update={(e) => parseLatex(e.detail.latex, index)}
      parsingError={$cells[index].extra.parsingError}
      bind:this={mathFieldInstance}
    />
    {#if index === $activeCell}
      <div class="keyboard">
        <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, mathFieldInstance)}/>
      </div>
    {/if}
  </span>
    <Plot plotData={plotData} />
  </span>

