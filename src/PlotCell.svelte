<script lang="ts">
  import { onMount } from "svelte";
  import { cells, results, activeCell, handleFocusIn, mathCellChanged,
           handleVirtualKeyboard, handleFocusOut} from "./stores";
  import type PlotCell from "./cells/PlotCell";
  import MathCell from "./cells/MathCell";
  import { MathField as MathFieldClass } from "./cells/MathField";
  import { unitsEquivalent } from "./utility.js";
  import { tick } from 'svelte';
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";
  import Plot from "./Plot.svelte";
  import TextCheckbox from "./TextCheckbox.svelte";
  import TextButton from "./TextButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";

  export let index: number;
  export let plotCell: PlotCell;

  let activeMathField = 0;
  let plotData = {data: [{}], layout: {}};
  let clipboardPlotData = {headers: [], units: [], columns: []};
  let copyButtonText = "Copy Data";

  onMount( () => {
    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (plotCell.mathFields[activeMathField].element?.focus) {
      plotCell.mathFields[activeMathField].element.focus();
    }
  }

  function blur() {
    if (plotCell.mathFields[activeMathField].element?.blur) {
      plotCell.mathFields[activeMathField].element.blur();
    }
  }

  function renderAxisTitle(names, units) {
    return [...names].join(", ") + (units ? ` [${units}]` : '');
  }

  function handleMathUpdate(event: any, subIndex: number) {
    if (!(event.detail.latex === "" && subIndex === plotCell.mathFields.length - 1)) 
    { 
      plotCell.mathFields[subIndex].parseLatex(event.detail.latex, subIndex);
    } else {
      plotCell.mathFields[subIndex].parsingError = false;
      plotCell.mathFields[subIndex].statement = null;
      plotCell.mathFields[subIndex].pendingNewLatex = false;
    }

    $mathCellChanged = true;
    $cells = $cells;
  }

  async function addMathField() {
    plotCell.mathFields.push(new MathFieldClass("", "plot"));
    await tick();
    plotCell.mathFields.slice(-2,-1)[0].element.getMathField().focus();
  }

  function collectPlotData() {
    const inputNames = new Set();
    const outputUnits = new Map([[$results[index][0].data[0].displayOutputUnits,
                                  new Set([$results[index][0].data[0].outputName])]]);
    const inputUnits = $results[index][0].data[0].displayInputUnits;

    const data = [];
    clipboardPlotData = {headers: [], units: [], columns: []};
    for (const result of $results[index]) {
      if (result.plot && result.data[0].numericOutput && !result.data[0].unitsMismatch) {
        if( unitsEquivalent(result.data[0].displayInputUnits, inputUnits) ) {
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
              name: result.data[0].outputName,
            }

            if (yAxisNum > 0) {
              (newCurve as any).yaxis = "y" + (yAxisNum+1);
            }

            data.push(newCurve);

            inputNames.add(result.data[0].inputName);
          } else {
            result.data[0].unitsMismatch = true;
          }

          clipboardPlotData.headers.push(result.data[0].inputName);
          clipboardPlotData.headers.push(result.data[0].outputName);
          clipboardPlotData.units.push(result.data[0].displayInputUnits);
          clipboardPlotData.units.push(result.data[0].displayOutputUnits);
          clipboardPlotData.columns.push(result.data[0].displayInput);
          clipboardPlotData.columns.push(result.data[0].displayOutput);
        } else {
          result.data[0].unitsMismatch = true;
        }
      }
    }

    const yAxisUnits = [...outputUnits.keys()];
    const yAxisNames = [...outputUnits.values()];

    const layout = {
          xaxis: {
            title: `${renderAxisTitle(inputNames, inputUnits)}`,
            type: `${plotCell.logX ? 'log' : 'linear'}`
          },
          yaxis: {
            title: `${renderAxisTitle(yAxisNames[0], yAxisUnits[0])}`,
            type: `${plotCell.logY ? 'log' : 'linear'}`
          },
          margin: {t: 40, b: 40, l: 40, r: 40}
        };

    if (outputUnits.size > 1) {
      layout["yaxis2"] = {
        title: `${renderAxisTitle(yAxisNames[1], yAxisUnits[1])}`,
        anchor: 'x',
        overlaying: 'y',
        side: 'right',
        type: `${plotCell.logY ? 'log' : 'linear'}`
      }
    }

    if (outputUnits.size > 2) {
      layout["yaxis3"] = {
        title: `${renderAxisTitle(yAxisNames[2], yAxisUnits[2])}`,
        anchor: 'free',
        overlaying: 'y',
        side: 'left',
        position: 0.15,
        type: `${plotCell.logY ? 'log' : 'linear'}`
      };

      (layout.xaxis as any).domain = [0.3, 1.0];
    }

    if (outputUnits.size > 3) {
      layout["yaxis4"] = {
        title: `${renderAxisTitle(yAxisNames[3], yAxisUnits[3])}`,
        anchor: 'free',
        overlaying: 'y',
        side: 'right',
        position: 0.85,
        type: `${plotCell.logY ? 'log' : 'linear'}`
      };

      (layout.xaxis as any).domain = [0.3, 0.7];
    }

    plotData = {
        data: data,
        layout: layout 
      };
  }


  function getClipboardPlotData(): string {
    if (clipboardPlotData.headers.length === 0) {
      return "";
    }

    let text = "";

    for (const [i, header] of clipboardPlotData.headers.entries()) {
      text += header;
      if (i < clipboardPlotData.headers.length-1) {
        text += "\t";
      }
    }

    if (!clipboardPlotData.units.every( value => value === "")) {
      text += "\n";
      for (const [i, unit] of clipboardPlotData.units.entries()) {
        text += `[${unit}]`;
        if (i < clipboardPlotData.units.length-1) {
          text += "\t";
        }
      }
    }

    const longestCol = clipboardPlotData.columns.reduce( (acum, value) => value.length > acum ? value.length : acum, 0);

    if (longestCol === 0) {
      return "";
    } 

    for (let i = 0; i<longestCol; i++) {
      text += "\n";
      for (const [j, column] of clipboardPlotData.columns.entries()) {
        if (column[i] !== undefined) {
          text += `${column[i]}`;
        }
        if (j < clipboardPlotData.columns.length-1) {
          text += "\t";
        }
      }
    }

    return text;
  }


  async function copyData() {
    const clipboardPlotData = getClipboardPlotData(); 

    if (clipboardPlotData === "") {
      copyButtonText = "No data to copy";
    } else {
      try {
        await navigator.clipboard.writeText(clipboardPlotData);
        copyButtonText = "Copied!";
      } catch (e) {
        copyButtonText = "Copy failed, check browser settings";
      }
    }

    setTimeout(() => copyButtonText="Copy Data", 2000);
  }

  $: if (plotCell.mathFields && plotCell.mathFields.slice(-1)[0].latex !== "") {
    addMathField();
  } else if (plotCell.mathFields && plotCell.mathFields.length > 2 && 
             plotCell.mathFields.slice(-2).every((mathField) => mathField.latex === "")) {
    plotCell.mathFields = plotCell.mathFields.slice(0,-1);
    plotCell.mathFields[plotCell.mathFields.length-1].parsingError = false;
    plotCell.mathFields[plotCell.mathFields.length-1].statement = null;
    plotCell.mathFields[plotCell.mathFields.length-1].pendingNewLatex = false;
  }


  $: if ($activeCell === index) {
      focus();
    } else {
      blur();
    }

  $: if(plotCell.mathFields[0].statement) {
    if(plotCell.mathFields.length === 2 && !plotCell.mathFields[0].statement.isRange) {
      if (plotCell.type !== "math") {
        // user entered an expression that is not a range, turn this cell into a math cell
        $cells = [...$cells.slice(0,index), new MathCell(plotCell), ...$cells.slice(index+1)];
      }
    }
  }

  $: if (plotCell && $results[index] && $results[index][0]?.plot && $results[index][0].data[0].numericOutput &&
         !$results[index][0].data[0].unitsMismatch) {
    collectPlotData();
  } else {
    plotData = {data: [{}], layout: {}};
    clipboardPlotData = {headers: [], units: [], columns: []};
  }

</script>

<style>
  span.container {
    display: grid;
    grid-auto-flow: row;
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

  div.log-buttons {
    margin: 10px;
    margin-left: 0px;
  }
</style>

<span class="container">
  <Plot plotData={plotData} />

  <div class="log-buttons">
    <TextCheckbox 
      bind:checked={plotCell.logX}
      title="Use log scale for x axis"
    >
      log x
    </TextCheckbox>

    <TextCheckbox
      bind:checked={plotCell.logY}
      title="Use log scale for y asix"
    >
      log y
    </TextCheckbox>

    <TextButton on:click={copyData}>
      {copyButtonText}
    </TextButton>
  </div>

  <span
    class="math-field-container"
  >
    {#if plotCell.mathFields}
      {#each plotCell.mathFields as mathField, i (mathField.id)}
      <span class="math-field" >
        <MathField
          editable={true}
          on:update={(e) => handleMathUpdate(e, i)}
          parsingError={mathField.parsingError}
          bind:this={mathField.element}
          latex={mathField.latex}
          on:focusin={ ()=> {activeMathField = i; handleFocusIn(index);} }
          on:focusout={ () => handleFocusOut(mathField) }
        />
        {#if mathField.parsingError}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
            <Error class="error"/>
          </TooltipIcon>
        {:else if mathField.latex && $results[index] && !$results[index][i]?.plot}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Not a plot</span>
            <Error class="error"/>
          </TooltipIcon>
        {:else if mathField.latex && $results[index] && $results[index][i]?.plot && !$results[index][i].data[0].numericInput}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Limits of plot range do not evaluate to a number</span>
            <Error class="error"/>
          </TooltipIcon>
        {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && !$results[index][i].data[0].limitsUnitsMatch}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Units of the upper and lower range limit do not match</span>
            <Error class="error"/>
          </TooltipIcon>
        {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && !$results[index][i].data[0].numericOutput}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Results of expression does not evaluate to numeric values</span>
            <Error class="error"/>
          </TooltipIcon>
        {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && $results[index][i].data[0].unitsMismatch}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">Units Mismatch</span>
            <Error class="error"/>
          </TooltipIcon>
        {/if}
      </span>
      {/each}
    {/if}
    {#if index === $activeCell}
      <div class="keyboard">
        <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, plotCell.mathFields[activeMathField].element)}/>
      </div>
    {/if}
  </span>
</span>

