<script>
  import { cells, results, activeCell, handleFocusIn,
           parseLatex, handleVirtualKeyboard, handleFocusOut} from "./stores.js";
  import { onMount, tick } from 'svelte';
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";
  import Plot from "./Plot.svelte";


  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";

  export let index;

  let activeMathField = 0;
  let mathFieldInstances = [];
  let plotData = {data: [{}], layout: {}};

  onMount(() => {
    if ($cells[index].data.latexs) {
      $cells[index].data.latexs.forEach((latex,i) => {
        mathFieldInstances[i].setLatex(latex);
      });
    }
  });

  function renderAxisUnits(units) {
    return units ? ` [${units}]` : '';
  }

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

  $: $cells[index].extra.mathFieldInstances = mathFieldInstances;

  $: if ($activeCell === index) {
    if (mathFieldInstances[0]) {
      mathFieldInstances[0].getMathField().focus();
    }
  }

  $: if($results[index]) {
    if($results[index].length === 1 && !$results[index][0].plot) {
      if ($cells[index].data.type !== "math") {
        $cells[index].data.type = "math";

        $cells[index].data.latex = $cells[index].data.latexs[0];
        delete $cells[index].data.latexs;
        
        $cells[index].extra.pendingNewLatex = $cells[index].extra.pendingNewLatexs[0];
        delete $cells[index].extra.pendingNewLatexs;

        $cells[index].extra.newLatex = $cells[index].extra.newLatexs[0];
        delete $cells[index].extra.newLatexs;

        $cells[index].extra.parsingError = $cells[index].extra.parsingErrors[0];
        delete $cells[index].extra.parsingErrors;

        $cells[index].extra.parsingErrorMessage = $cells[index].extra.parsingErrorMessages;
        delete $cells[index].extra.parsingErrorMessages;

        $cells[index].extra.statement = $cells[index].extra.statements;
        delete $cells[index].extra.statements;

        $cells[index].extra.mathFieldInstance = $cells[index].extra.mathFieldInstances;
        delete $cells[index].extra.mathFieldInstances;


      }
    }
  }

  async function addMathField() {
    $cells[index].data.latexs.push("");
    await tick();
    mathFieldInstances[$cells[index].data.latexs.length-2].getMathField().focus();
  }

  $: if ($cells[index].data.latexs && $cells[index].data.latexs.slice(-1)[0] !== "") {
    addMathField();
  } else if ($cells[index].data.latexs && $cells[index].data.latexs.length > 2 && 
             $cells[index].data.latexs.slice(-2).every((latex) => latex === "")) {
    $cells[index].data.latexs.length = $cells[index].data.latexs.length - 1;
    $cells[index].extra.parsingErrors[$cells[index].data.latexs.length-1] = false;
  }


  $: if ($results[index] && $results[index][0].plot) {
    plotData = {
        data:[{
          x: $results[index][0].data[0].displayInput,
          y: $results[index][0].data[0].displayOutput,
          type: "scatter",
          mode: "lines"
        }],
        layout: {
          yaxis: {title: `${$results[index][0].data[0].outputName}${renderAxisUnits($results[index][0].data[0].displayOutputUnits)}`},
          xaxis: {title: `${$results[index][0].data[0].inputName}${renderAxisUnits($results[index][0].data[0].displayInputUnits)}`}
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
    {#if $cells[index].data.latexs}
      {#each $cells[index].data.latexs as latex, i}
      <span on:focusin={()=>activeMathField = i}>
        <MathField
          editable={true}
          on:update={(e) => handleMathUpdate(e, i)}
          parsingError={$cells[index].extra.parsingErrors[i]}
          bind:this={mathFieldInstances[i]}
        />
      </span>
      {/each}
    {/if}
    {#if index === $activeCell}
      <div class="keyboard">
        <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, mathFieldInstances[activeMathField])}/>
      </div>
    {/if}
  </span>
    <Plot plotData={plotData} />
  </span>

