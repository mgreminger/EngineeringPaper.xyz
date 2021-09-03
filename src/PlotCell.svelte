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
    const inputNames = new Set();
    const outputUnits = new Map([[$results[index][0].data[0].displayOutputUnits,
                                  new Set([$results[index][0].data[0].outputName])]]);
    const inputUnits = $results[index][0].data[0].displayInputUnits;

    const data = [];
    for (const result of $results[index]) {
      if (result.plot && result.data[0].numericOutput && !result.data[0].unitsMismatch) {
        if(result.data[0].displayInputUnits === inputUnits) {
          let yAxisNum;
          const axisNames = outputUnits.get(result.data[0].displayOutputUnits)
          if (axisNames !== undefined) {
            outputUnits.set(result.data[0].displayOutputUnits, axisNames.add(result.data[0].outputName));
            yAxisNum = [...outputUnits.keys()].indexOf(result.data[0].displayOutputUnits);
          } else {
            outputUnits.set(result.data[0].displayOutputUnits, new Set([result.data[0].outputName]));
            yAxisNum = outputUnits.size - 1;
          }
          
          if (yAxisNum < 4) {
            const newCurve = {
              x: result.data[0].displayInput,
              y: result.data[0].displayOutput,
              type: "scatter",
              mode: "lines",
              name: result.data[0].outputName
            }

            if (yAxisNum > 0) {
              newCurve.yaxis = "y" + (yAxisNum+1);
            }

            data.push(newCurve);

            inputNames.add(result.data[0].inputName);
          } else {
            result.data[0].unitsMismatch = true;
          }
        } else {
          result.data[0].unitsMismatch = true;
        }
      }
    }


    const yAxisUnits = [...outputUnits.keys()];
    const yAxisNames = [...outputUnits.values()];

    const layout = {
          xaxis: {title: `${renderAxisTitle(inputNames, inputUnits)}`},
          yaxis: {title: `${renderAxisTitle(yAxisNames[0], yAxisUnits[0])}`}
        };

    if (outputUnits.size > 1) {
      layout["yaxis2"] = {
        title: `${renderAxisTitle(yAxisNames[1], yAxisUnits[1])}`,
        anchor: 'x',
        overlaying: 'y',
        side: 'right'
      }
    }

    if (outputUnits.size > 2) {
      layout["yaxis3"] = {
        title: `${renderAxisTitle(yAxisNames[2], yAxisUnits[2])}`,
        anchor: 'free',
        overlaying: 'y',
        side: 'left',
        position: 0.15
      }

      layout.xaxis.domain = [0.3, 1.0];
    }

    if (outputUnits.size > 3) {
      layout["yaxis4"] = {
        title: `${renderAxisTitle(yAxisNames[3], yAxisUnits[3])}`,
        anchor: 'free',
        overlaying: 'y',
        side: 'right',
        position: 0.85
      }

      layout.xaxis.domain = [0.3, 0.7];
    }

    plotData = {
        data: data,
        layout: layout 
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
    if($results[index].length === 1 && !$results[index][0]?.plot) {
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


  $: if ($results[index] && $results[index][0]?.plot && $results[index][0].data[0].numericOutput &&
         !$results[index][0].data[0].unitsMismatch) {
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
        {#if $cells[index].extra.parsingErrors[i]}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{$cells[index].extra.parsingErrorMessages[i]}</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {:else if latex && $results[index] && !$results[index][i]?.plot}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Not a plot</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {:else if latex && $results[index] && $results[index][i]?.plot && !$results[index][i].data[0].numericInput}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Limits of plot range do not evaluate to a number</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {:else if latex && $results[index] && $results[index][i]?.plot > 0 && !$results[index][i].data[0].limitsUnitsMatch}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Units of the upper and lower range limit do not match</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {:else if latex && $results[index] && $results[index][i]?.plot > 0 && !$results[index][i].data[0].numericOutput}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Results of expression does not evaluate to numeric values</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {:else if latex && $results[index] && $results[index][i]?.plot > 0 && $results[index][i].data[0].unitsMismatch}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Units Mismatch</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {/if}
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

