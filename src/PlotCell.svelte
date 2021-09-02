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

  function renderAxisTitle(names, units) {
    return [...names].join(", ") + (units ? ` [${units}]` : '');
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

  async function addMathField() {
    $cells[index].data.latexs.push("");
    await tick();
    mathFieldInstances[$cells[index].data.latexs.length-2].getMathField().focus();
  }

  function collectPlotData() {
    const outputNames = new Set();
    const inputNames = new Set();
    const outputUnits = $results[index][0].data[0].displayOutputUnits;
    const inputUnits = $results[index][0].data[0].displayInputUnits;

    const data = [];
    for (const result of $results[index]) {
      if (result.plot && result.data[0].numericOutput) {
        if(result.data[0].displayOutputUnits === outputUnits &&
           result.data[0].displayInputUnits === inputUnits) {
          data.push({
            x: result.data[0].displayInput,
            y: result.data[0].displayOutput,
            type: "scatter",
            mode: "lines",
            name: result.data[0].outputName
          });

          outputNames.add(result.data[0].outputName);
          inputNames.add(result.data[0].inputName);
        } else {
          result.data[0].unitsMismatch = true;
        }
      }
    }

    plotData = {
        data:data,
        layout: {
          yaxis: {title: `${renderAxisTitle(outputNames, outputUnits)}`},
          xaxis: {title: `${renderAxisTitle(inputNames, inputUnits)}`}
        }
      };
  }

  $: if ($cells[index].data.latexs && $cells[index].data.latexs.slice(-1)[0] !== "") {
    addMathField();
  } else if ($cells[index].data.latexs && $cells[index].data.latexs.length > 2 && 
             $cells[index].data.latexs.slice(-2).every((latex) => latex === "")) {
    $cells[index].data.latexs.length = $cells[index].data.latexs.length - 1;
    $cells[index].extra.statements.length = $cells[index].data.latexs.length;
    $cells[index].extra.parsingErrors[$cells[index].data.latexs.length-1] = false;
    $cells[index].extra.statements[$cells[index].data.latexs.length-1] = null;
    $cells[index].extra.pendingNewLatexs[$cells[index].data.latexs.length-1] = false;
  }

  $: $cells[index].extra.mathFieldInstances = mathFieldInstances;

  $: if ($activeCell === index) {
    if (mathFieldInstances[activeMathField]) {
      mathFieldInstances[activeMathField].getMathField().focus();
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


  $: if ($results[index] && $results[index][0].plot && $results[index][0].data[0].numericOutput) {
    collectPlotData();
  } else {
    plotData = {data: [{}], layout: {}};
  }

</script>

<style>
  span.container {
    display: flex;
    align-items: center;
  }

  span.math-field-container {
    display: flex;
    flex-direction: column;
  }

  span.math-field {
    margin-bottom: 1rem;
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
    class="math-field-container"
    on:focusin={() => handleFocusIn(index)}
    on:focusout={() => handleFocusOut(index)}
  >
    {#if $cells[index].data.latexs}
      {#each $cells[index].data.latexs as latex, i}
      <span class="math-field" on:focusin={()=>activeMathField = i}>
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

