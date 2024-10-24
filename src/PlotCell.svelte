<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { cells, results, activeCell, mathCellChanged,
           nonMathCellChanged, modifierKey, resultsInvalid} from "./stores";
  import PlotCell from "./cells/PlotCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";
  import { unitsEquivalent, unitsValid, convertArrayUnits } from "./utility.js";
  import type { PlotResult } from "./resultTypes";
  import { tick } from 'svelte';
  import MathField from "./MathField.svelte";
  import Plot from "./Plot.svelte";
  import TextCheckbox from "./TextCheckbox.svelte";
  import TextButton from "./TextButton.svelte";
  import IconButton from "./IconButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";

  export let index: number;
  export let plotCell: PlotCell;

  let plotElement: Plot;
  let containerDiv: HTMLDivElement;
  let plotData = {data: [{}], layout: {}};
  let clipboardPlotData = {headers: [], units: [], columns: []};
  let copyButtonText = "Copy Data";

  export async function getMarkdown() {
    if (plotElement) {
      const plotPNG = await plotElement.getImage();
      if (plotPNG) { 
        return `![](${plotPNG})\n\n`;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  const dispatch = createEventDispatcher<{
    insertMathCellAfter: {index: number};
    insertInsertCellAfter: {index: number};
  }>();

  onMount( () => {
    if ($activeCell === index) {
      focus();

      window.setTimeout( () => {
        const mathElement = document.getElementById(`plot-expression-${index}-0`);
        if (mathElement) {
          mathElement.scrollIntoView({behavior: "smooth", block: "center"});
        }
      }, 100);
    }
  });

  function clearPlotData() {
    if ((plotData.data[0] as any).type) {
      plotData = {data: [{}], layout: {}};
    }
  }

  function focus() {
    if (containerDiv && !containerDiv.contains(document.activeElement)) {
      const mathElement: HTMLTextAreaElement = document.querySelector(`#plot-expression-${index}-0 math-field`);
      if (mathElement) {
        mathElement.focus();
      }
    }
  }

  function renderAxisTitle(names, units) {
    return '$ ' + [...names].join(",\\:") + (units ? `\\: ${units}` : '') + ' $';
  }

  function parseLatex(latex: string, mathField: MathFieldClass) {
    mathField.parseLatex(latex);
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  async function addMathField() {
    plotCell.addRow();
    $cells = $cells;
    await tick();
    if (plotCell.mathFields.slice(-1)[0].element) {
      plotCell.mathFields.slice(-1)[0].element.focus();
    }
  }

  function deleteRow(rowIndex: number) {
    plotCell.deleteRow(rowIndex);

    $mathCellChanged = true;
    $cells = $cells;
  }


  function convertPlotUnits() {
    let userInputUnits: string | undefined;
    let userInputUnitsLatex: string | undefined;

    if ((plotCell.mathFields[0].statement?.type === "query" && plotCell.mathFields[0].statement.isRange) ||
         plotCell.mathFields[0].statement?.type === "scatterQuery" || plotCell.mathFields[0].statement?.type === "parametricRange") { 
      // use input units from first plot statement
      let inputUnits: string;
      let inputUnitsLatex: string;
      if (plotCell.mathFields[0].statement.type === "parametricRange") {
        inputUnits = plotCell.mathFields[0].statement.rangeQueryStatements[1].units;
        inputUnitsLatex = plotCell.mathFields[0].statement.rangeQueryStatements[1].unitsLatex;
      } else {
        inputUnits = plotCell.mathFields[0].statement.inputUnits;
        inputUnitsLatex = plotCell.mathFields[0].statement.inputUnitsLatex;
      }

      if (inputUnits) {
        userInputUnits = inputUnits;
        userInputUnitsLatex = inputUnitsLatex;
      } else if ($results[index] && $results[index][0] && $results[index][0].plot &&
                 ($results[index][0] as PlotResult).data[0].inputCustomUnitsDefined) {
        userInputUnits = ($results[index][0] as PlotResult).data[0].inputCustomUnits;
        userInputUnitsLatex = ($results[index][0] as PlotResult).data[0].inputCustomUnitsLatex;
      }
    }
    for (const [j, statement] of plotCell.mathFields.map((field) => field.statement).entries()) {
      if ($results[index] && $results[index][j] &&
          statement && (statement.type === "query" || statement.type === "scatterQuery" || statement.type === "parametricRange") &&
          $results[index][j].plot) {
        for (const data of ($results[index][j] as PlotResult).data) {
          data.unitsMismatch = true;
          if (data.numericOutput) {
            data.unitsMismatch = false;
            // convert inputs if units provided
            if (userInputUnits) {
              const startingInputUnits = data.inputUnits;

              if ( unitsEquivalent(userInputUnits, startingInputUnits) ) {
                data.displayInput = convertArrayUnits(data.input, startingInputUnits, userInputUnits);
                data.asciiInputUnits = userInputUnits;
                data.displayInputUnits = userInputUnitsLatex;
              } else {
                data.unitsMismatch = true;
                data.unitsMismatchReason = "All x-axis units must be compatible";
              }
            } else {
              data.displayInput = data.input;
              data.asciiInputUnits = data.inputUnits
              data.displayInputUnits = data.inputUnitsLatex;
            } 
          
            let outputUnits: string;
            let outputUnitsLatex: string;

            if (statement.type === "parametricRange") {
              outputUnits = statement.rangeQueryStatements[0].units;
              outputUnitsLatex = statement.rangeQueryStatements[0].unitsLatex;
            } else {
              outputUnits = statement.units;
              outputUnitsLatex = statement.unitsLatex;
            }

            // convert outputs if units provided
            if (outputUnits || data.outputCustomUnitsDefined) {
              let userOutputUnits: string;
              let userOutputUnitsLatex: string;

              if (outputUnits) {
                userOutputUnits = outputUnits;
                userOutputUnitsLatex = outputUnitsLatex;
              } else {
                userOutputUnits = data.outputCustomUnits;
                userOutputUnitsLatex = data.outputCustomUnitsLatex;
              }

              const startingOutputUnits = data.outputUnits;

              if ( unitsEquivalent(userOutputUnits, startingOutputUnits) ) {
                data.displayOutput = convertArrayUnits(data.output, startingOutputUnits, userOutputUnits);
                data.asciiOutputUnits = userOutputUnits;
                data.displayOutputUnits = userOutputUnitsLatex;
              } else {
                data.unitsMismatch = true;
              }
            } else {
              data.displayOutput = data.output;
              data.asciiOutputUnits = data.outputUnits;
              data.displayOutputUnits = data.outputUnitsLatex;
            } 
          }
        }
      }
    }
  }


  function collectPlotData() {
    const firstResult = ($results[index] as PlotResult[]).find( (result) => result.data[0].numericOutput );
    if (firstResult === undefined) {
      console.warn('No valid plot found');
      return;
    }

    const inputNames = new Set();
    const outputUnits = new Map([[firstResult.data[0].asciiOutputUnits,
                                  new Set([firstResult.data[0].outputNameLatex ?? firstResult.data[0].outputName])]]);
    const outputUnitsLatexMap = new Map([[firstResult.data[0].asciiOutputUnits, firstResult.data[0].displayOutputUnits]]);
    const inputUnits = firstResult.data[0].asciiInputUnits;
    const inputUnitsLatex = firstResult.data[0].displayInputUnits;

    const data = [];
    clipboardPlotData = {headers: [], units: [], columns: []};
    for (const result of ($results[index] as PlotResult[])) {
      if (result.plot && result.data[0].numericOutput && !result.data[0].unitsMismatch && 
          unitsValid(result.data[0].asciiInputUnits) && unitsValid(result.data[0].asciiOutputUnits) ){
        if( unitsEquivalent(result.data[0].asciiInputUnits, inputUnits) ) {
          let yAxisNum;
          const axisNames = outputUnits.get(result.data[0].asciiOutputUnits)
          if (axisNames !== undefined) {
            outputUnits.set(result.data[0].asciiOutputUnits, axisNames.add(result.data[0].outputNameLatex ?? result.data[0].outputName));
            outputUnitsLatexMap.set(result.data[0].asciiOutputUnits, result.data[0].displayOutputUnits);            
            yAxisNum = [...outputUnits.keys()].indexOf(result.data[0].asciiOutputUnits);
          } else {
            outputUnits.set(result.data[0].asciiOutputUnits, new Set([result.data[0].outputNameLatex ?? result.data[0].outputName]));
            outputUnitsLatexMap.set(result.data[0].asciiOutputUnits, result.data[0].displayOutputUnits);
            yAxisNum = outputUnits.size - 1;
          }
          
          if (yAxisNum < 4) {
            const newCurve = {
              x: result.data[0].displayInput,
              y: result.data[0].displayOutput,
              type: "scatter",
              mode: result.data[0].isScatter && !result.data[0].asLines ? "markers" : "lines",
              text: result.data[0].outputName,
              hoverinfo: "x+y+text",
              name: `$ ${result.data[0].outputNameLatex ?? result.data[0].outputName} $ `,
            }

            if (yAxisNum > 0) {
              (newCurve as any).yaxis = "y" + (yAxisNum+1);
            }

            data.push(newCurve);

            inputNames.add(result.data[0].inputNameLatex ?? result.data[0].inputName);
          } else {
            result.data[0].unitsMismatch = true;
            result.data[0].unitsMismatchReason = "Cannot have more than 4 different y-axis units"
          }

          clipboardPlotData.headers.push(result.data[0].inputName);
          clipboardPlotData.headers.push(result.data[0].outputName);
          clipboardPlotData.units.push(result.data[0].asciiInputUnits);
          clipboardPlotData.units.push(result.data[0].asciiOutputUnits);
          clipboardPlotData.columns.push(result.data[0].displayInput);
          clipboardPlotData.columns.push(result.data[0].displayOutput);
        } else {
          result.data[0].unitsMismatch = true;
          result.data[0].unitsMismatchReason = "All x-axis units must be compatible"
        }
      }
    }

    if (data.length > 0) {

      const yAxisUnits = [...outputUnits.keys()].map((key) => outputUnitsLatexMap.get(key));
      const yAxisNames = [...outputUnits.values()];

      const axisTitleStandoff = 15;
      const multiAxisSift = 40;

      const layout = {
            font: {
              size: 16
            },
            xaxis: {
              title: {
                text: `${renderAxisTitle(inputNames, inputUnitsLatex)}`,
                standoff: axisTitleStandoff
              },
              automargin: true,
              type: `${plotCell.logX ? 'log' : 'linear'}`
            },
            yaxis: {
              title: {
                text: `${renderAxisTitle(yAxisNames[0], yAxisUnits[0])}`,
                standoff: axisTitleStandoff
              },
              automargin: true,
              type: `${plotCell.logY ? 'log' : 'linear'}`,
              scaleanchor: plotCell.squareAspectRatio ? 'x' : false
            },
            margin: {t: 40, b: 40, l: 40, r: 40},
            showlegend: data.length > 1,
            legend: { orientation: "h", y: -.12}
          };

      if (outputUnits.size > 1) {
        layout["yaxis2"] = {
          title: {
            text: `${renderAxisTitle(yAxisNames[1], yAxisUnits[1])}`,
            standoff: axisTitleStandoff
          },
          automargin: true,
          anchor: 'x',
          overlaying: 'y',
          side: 'right',
          type: `${plotCell.logY ? 'log' : 'linear'}`,
          scaleanchor: plotCell.squareAspectRatio ? 'x' : false
        }
      }

      if (outputUnits.size > 2) {
        layout["yaxis3"] = {
          title: {
            text: `${renderAxisTitle(yAxisNames[2], yAxisUnits[2])}`,
            standoff: axisTitleStandoff
          },
          automargin: true,
          anchor: 'free',
          overlaying: 'y',
          side: 'left',
          autoshift: true,
          shift: -multiAxisSift,
          type: `${plotCell.logY ? 'log' : 'linear'}`,
          scaleanchor: plotCell.squareAspectRatio ? 'x' : false
        };
      }

      if (outputUnits.size > 3) {
        layout["yaxis4"] = {
          title: {
            text: `${renderAxisTitle(yAxisNames[3], yAxisUnits[3])}`,
            standoff: axisTitleStandoff
          },
          automargin: true,
          anchor: 'free',
          overlaying: 'y',
          side: 'right',
          autoshift: true,
          shift: multiAxisSift,
          type: `${plotCell.logY ? 'log' : 'linear'}`,
          scaleanchor: plotCell.squareAspectRatio ? 'x' : false
        };
      }

      plotData = {
          data: data,
          layout: layout 
        };

    } else {
      clearPlotData();
    }
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

  function handleEnter(row: number) {
    if (row < plotCell.mathFields.length - 1) {
      if (plotCell.mathFields[row+1].element?.focus) {
        plotCell.mathFields[row+1].element?.focus();
      }
    } else {
      addMathField();
    }
  }


  function atLeastOneValidPlotReducer(accum: boolean, value:PlotResult) {
    return (value.plot && value.data && 
            value.data[0].numericOutput) || accum;
  }

  function noSyntaxErrorReducer(accum: boolean, value: MathFieldClass) {
    return !value.parsingError && accum;
  }

  function handleLogScaleChange() {
    if (plotCell.squareAspectRatio && (plotCell.logX || plotCell.logY)) {
      plotCell.squareAspectRatio = false;
    }
    $nonMathCellChanged = true;
  }

  function handleAspectRatioChange() {
    if (plotCell.squareAspectRatio && (plotCell.logX || plotCell.logY)) {
      plotCell.logX = false;
      plotCell.logY = false;
    }
    $nonMathCellChanged = true;
  }

  $: if ($activeCell === index) {
      focus();
    }

  $: numRows = plotCell.mathFields.length;

  $: if (plotCell && plotCell.mathFields.reduce(noSyntaxErrorReducer, true) &&
         $results[index] && $results[index][0] && 
         ($results[index] as PlotResult[]).reduce(atLeastOneValidPlotReducer, false ) &&
         !$resultsInvalid) {
    convertPlotUnits();
    collectPlotData();
  } else {
    clearPlotData();
    clipboardPlotData = {headers: [], units: [], columns: []};
  }

</script>

<style>
  div.container {
    display: grid;
    grid-auto-flow: row;
    break-inside: avoid;
  }

  div.plot-sizer {
    max-width: min(90vw, 886px);
    font-size: 16px;
  }

  div.math-field-container {
    display: grid;
    width: fit-content;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  div.item {
    display: flex;
    align-self: center;
    justify-content: left;
    padding: 7px;
  }

  div.item.math-field {
    display: flex;
    align-items: center;
    padding-left: 0px;
  }

  div.item.add-button {
    padding: 0px;
    padding-bottom: 7px;
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

  @media print {
    div.log-buttons {
      display: none;
    }

    :global(div.modebar-container) {
      display: none;
    }
  }

</style>

<div 
  class="container"
  bind:this={containerDiv}
>
  <div class="plot-sizer">
    <Plot
      Plotly={PlotCell.Plotly}
      plotData={plotData}
      bind:this={plotElement}
    />
  </div>
  <div class="log-buttons">
    <TextCheckbox 
      bind:checked={plotCell.logX}
      on:change={handleLogScaleChange}
      title="Use log scale for x axis"
    >
      log x
    </TextCheckbox>

    <TextCheckbox
      bind:checked={plotCell.logY}
      on:change={handleLogScaleChange}
      title="Use log scale for y asix"
    >
      log y
    </TextCheckbox>

    <TextCheckbox
      bind:checked={plotCell.squareAspectRatio}
      on:change={handleAspectRatioChange}
      title="Use square aspect ratio"
    >
      1:1 Ratio
    </TextCheckbox>

    <TextButton on:click={copyData}>
      {copyButtonText}
    </TextButton>
  </div>

  <div
    class="math-field-container"
  >
    {#if plotCell.mathFields}
      {#each plotCell.mathFields as mathField, i (mathField.id)}
        <div
          class="item math-field"
          id={`plot-expression-${index}-${i}`}
          style="grid-column: 1; grid-row: {i+1};"
        >
          <MathField
            editable={true}
            on:update={(e) => parseLatex(e.detail.latex, mathField)}
            on:enter={() => handleEnter(i)}
            on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
            on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
            mathField={mathField}
            parsingError={mathField.parsingError}
            bind:this={mathField.element}
            latex={mathField.latex}
          />
          {#if mathField.parsingError}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
              <Error class="error"/>
            </TooltipIcon>
          {:else if mathField.latex && $results[index] && $results[index][i]?.plot}
            {#if $results[index][i].data[0].scatterErrorMessage}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{$results[index][i].data[0].scatterErrorMessage}</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if $results[index][i].data[0].parametricErrorMessage}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{$results[index][i].data[0].parametricErrorMessage}</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !$results[index][i].data[0].numericInput}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">X-axis limits of plot do not evaluate to a number</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !$results[index][i].data[0].limitsUnitsMatch}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">Units of the x-axis upper and lower limits do not match</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !$results[index][i].data[0].numericOutput}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">Results of expression does not evaluate to finite and real numeric values</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !unitsValid($results[index][i].data[0].displayInputUnits)}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">X-axis upper and/or lower limit dimension error{$results[index][i].data[0].asciiInputUnits.startsWith("Dimension Error:") ? $results[index][i].data[0].asciiInputUnits.slice(15) : ""}</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !unitsValid($results[index][i].data[0].displayOutputUnits)}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">Y-axis dimension error{$results[index][i].data[0].asciiOutputUnits.startsWith("Dimension Error:") ? $results[index][i].data[0].asciiOutputUnits.slice(15) : ""}</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if $results[index][i].data[0].unitsMismatch}
              <TooltipIcon direction="right" align="end">
                  <span slot="tooltipText">
                    { $results[index][i].data[0].unitsMismatchReason ? $results[index][i].data[0].unitsMismatchReason : "Units Mismatch" }
                  </span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if $results[index][i].data[0].inputReversed}
              <TooltipIcon direction="right" align="end">
                  <span slot="tooltipText">Upper and lower limits of plot range are reversed</span>
                <Error class="error"/>
              </TooltipIcon>
            {/if}
          {/if}
        </div>
    
        {#if numRows > 1 }
          <div
            class="item"
            style="grid-column: 2; grid-row: {i+1};"
          >
            <IconButton
              on:click={() => deleteRow(i)}
              title="Delete Row"
              id={`delete-row-${index}-${i}`}
            >
              <RowDelete />
            </IconButton>
          </div>
        {/if}
      {/each}

      <div
        class="item add-button"
        style="grid-column: 1; grid-row: {numRows+1};"
      >
        <IconButton
          on:click={addMathField}
          id={`add-row-${index}`}
          title="Add Equation"
        >
          <Add />
        </IconButton>
      </div>
    {/if}
  </div>
</div>


