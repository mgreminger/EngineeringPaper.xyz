<script lang="ts">
  import { onMount } from "svelte";
  import appState from "./stores.svelte";
  import { type Result, type FiniteImagResult, type MatrixResult, type DataTableResult, isPlotResult } from "./resultTypes";
  import PlotCell from "./cells/PlotCell.svelte";
  import type { MathField as MathFieldClass } from "./cells/MathField.svelte";
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

  interface Props {
    index: number;
    plotCell: PlotCell;
    insertMathCellAfter: (arg: {detail: {index: number}}) => void;
    insertInsertCellAfter: (arg: {detail: {index: number}}) => void;
    mathCellChanged: () => void;
    nonMathCellChanged: () => void;
  }

  let {
    index,
    plotCell,
    insertMathCellAfter,
    insertInsertCellAfter,
    mathCellChanged,
    nonMathCellChanged
  }: Props = $props();

  interface PlotRenderData {
    unitsMismatch: boolean;
    displayInput: number[];
    displayInputUnits: string;
    asciiInputUnits: string;
    unitsMismatchReason: string;
    displayOutput: number[];
    displayOutputUnits: string;
    asciiOutputUnits: string;
  }

  let copyButtonText = $state("Copy Data");

  let numRows = $derived(plotCell.mathFields.length);
  let {clipboardPlotData, plotRenderData, plotData} = $derived(getPlotData(plotCell, appState.resultsInvalid, appState.results[index]));

  let plotElement: Plot;
  let containerDiv: HTMLDivElement;

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

  onMount( () => {
    if (appState.activeCell === index) {
      focus();

      window.setTimeout( () => {
        const mathElement = document.getElementById(`plot-expression-${index}-0`);
        if (mathElement) {
          mathElement.scrollIntoView({behavior: "smooth", block: "center"});
        }
      }, 100);
    }
  });

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
    appState.cells[index] = appState.cells[index];
    mathCellChanged();
  }

  async function addMathField() {
    plotCell.addRow();
    appState.cells = appState.cells;
    await tick();
    if (plotCell.mathFields.slice(-1)[0].element) {
      plotCell.mathFields.slice(-1)[0].element.focus();
    }
  }

  function deleteRow(rowIndex: number) {
    plotCell.deleteRow(rowIndex);

    appState.cells[index] = appState.cells[index];
    mathCellChanged();
  }

  function getEmptyRenderData(length: number) {
    const plotRenderData: PlotRenderData[] = [];
    for(let i = 0; i < length; i++) {
      plotRenderData[i] = {
        unitsMismatch: false,
        displayInput: [],
        displayInputUnits: "",
        asciiInputUnits: "",
        unitsMismatchReason: "",
        displayOutput: [],
        displayOutputUnits: "",
        asciiOutputUnits: ""
      };
    }
    return plotRenderData;
  }


  function convertPlotUnits(plotResults: PlotResult[]) {
    let userInputUnits: string | undefined;
    let userInputUnitsLatex: string | undefined;

    const plotRenderData = getEmptyRenderData(plotResults.length);

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
      } else if (plotResults && plotResults[0] && plotResults[0].plot &&
                 plotResults[0].data[0].inputCustomUnitsDefined) {
        userInputUnits = plotResults[0].data[0].inputCustomUnits;
        userInputUnitsLatex = plotResults[0].data[0].inputCustomUnitsLatex;
      }
    }
    for (const [j, statement] of plotCell.mathFields.map((field) => field.statement).entries()) {
      if (plotResults && plotResults[j] &&
          statement && (statement.type === "query" || statement.type === "scatterQuery" || statement.type === "parametricRange") &&
          plotResults[j].plot) {
        for (const data of plotResults[j].data) {
          plotRenderData[j].unitsMismatch = true;
          if (data.numericOutput) {
            plotRenderData[j].unitsMismatch = false;
            // convert inputs if units provided
            if (userInputUnits) {
              const startingInputUnits = data.inputUnits;

              if ( unitsEquivalent(userInputUnits, startingInputUnits) ) {
                plotRenderData[j].displayInput = convertArrayUnits(data.input, startingInputUnits, userInputUnits);
                plotRenderData[j].asciiInputUnits = userInputUnits;
                plotRenderData[j].displayInputUnits = userInputUnitsLatex;
              } else {
                plotRenderData[j].unitsMismatch = true;
                plotRenderData[j].unitsMismatchReason = "All x-axis units must be compatible";
              }
            } else {
              plotRenderData[j].displayInput = data.input;
              plotRenderData[j].asciiInputUnits = data.inputUnits
              plotRenderData[j].displayInputUnits = data.inputUnitsLatex;
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
                plotRenderData[j].displayOutput = convertArrayUnits(data.output, startingOutputUnits, userOutputUnits);
                plotRenderData[j].asciiOutputUnits = userOutputUnits;
                plotRenderData[j].displayOutputUnits = userOutputUnitsLatex;
              } else {
                plotRenderData[j].unitsMismatch = true;
              }
            } else {
              plotRenderData[j].displayOutput = data.output;
              plotRenderData[j].asciiOutputUnits = data.outputUnits;
              plotRenderData[j].displayOutputUnits = data.outputUnitsLatex;
            } 
          }
        }
      }
    }

    return plotRenderData;
  }


  function collectPlotData(plotResults: PlotResult[], plotRenderData: PlotRenderData[]) {
    const firstResultIndex = plotResults.findIndex( (result) => result.data[0].numericOutput );
    if (firstResultIndex === -1) {
      console.warn('No valid plot found');
      return {
        clipboardPlotData: {headers: [], units: [], columns: []},
        plotRenderData,
        plotData: {data: [{}], layout: {}}
      };
    }

    const firstResult = plotResults[firstResultIndex];
    const firstResultPlotRenderData = plotRenderData[firstResultIndex];

    const inputNames = new Set();
    const outputUnits = new Map([[firstResultPlotRenderData.asciiOutputUnits,
                                  new Set([firstResult.data[0].outputNameLatex ?? firstResult.data[0].outputName])]]);
    const outputUnitsLatexMap = new Map([[firstResultPlotRenderData.asciiOutputUnits, firstResultPlotRenderData.displayOutputUnits]]);
    const inputUnits = firstResultPlotRenderData.asciiInputUnits;
    const inputUnitsLatex = firstResultPlotRenderData.displayInputUnits;

    const data = [];
    let clipboardPlotData = {headers: [], units: [], columns: []};
    for (const [j, result] of plotResults.entries()) {
      if (result.plot && result.data[0].numericOutput && !plotRenderData[j].unitsMismatch && 
          unitsValid(plotRenderData[j].asciiInputUnits) && unitsValid(plotRenderData[j].asciiOutputUnits) ){
        if( unitsEquivalent(plotRenderData[j].asciiInputUnits, inputUnits) ) {
          let yAxisNum;
          const axisNames = outputUnits.get(plotRenderData[j].asciiOutputUnits)
          if (axisNames !== undefined) {
            outputUnits.set(plotRenderData[j].asciiOutputUnits, axisNames.add(result.data[0].outputNameLatex ?? result.data[0].outputName));
            outputUnitsLatexMap.set(plotRenderData[j].asciiOutputUnits, plotRenderData[j].displayOutputUnits);            
            yAxisNum = [...outputUnits.keys()].indexOf(plotRenderData[j].asciiOutputUnits);
          } else {
            outputUnits.set(plotRenderData[j].asciiOutputUnits, new Set([result.data[0].outputNameLatex ?? result.data[0].outputName]));
            outputUnitsLatexMap.set(plotRenderData[j].asciiOutputUnits, plotRenderData[j].displayOutputUnits);
            yAxisNum = outputUnits.size - 1;
          }
          
          if (yAxisNum < 4) {
            const newCurve = {
              x: plotRenderData[j].displayInput,
              y: plotRenderData[j].displayOutput,
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
            plotRenderData[j].unitsMismatch = true;
            plotRenderData[j].unitsMismatchReason = "Cannot have more than 4 different y-axis units"
          }

          clipboardPlotData.headers.push(result.data[0].inputName);
          clipboardPlotData.headers.push(result.data[0].outputName);
          clipboardPlotData.units.push(plotRenderData[j].asciiInputUnits);
          clipboardPlotData.units.push(plotRenderData[j].asciiOutputUnits);
          clipboardPlotData.columns.push(plotRenderData[j].displayInput);
          clipboardPlotData.columns.push(plotRenderData[j].displayOutput);
        } else {
          plotRenderData[j].unitsMismatch = true;
          plotRenderData[j].unitsMismatchReason = "All x-axis units must be compatible"
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

      return {
        clipboardPlotData,
        plotRenderData,
        plotData: {data: data, layout: layout}
      };
    } else {
      return {
        clipboardPlotData: {headers: [], units: [], columns: []}, 
        plotRenderData,        
        plotData: {data: [{}], layout: {}}
      };
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
    nonMathCellChanged();
  }

  function handleAspectRatioChange() {
    if (plotCell.squareAspectRatio && (plotCell.logX || plotCell.logY)) {
      plotCell.logX = false;
      plotCell.logY = false;
    }
    nonMathCellChanged();
  }

  $effect(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function getPlotData(plotCell: PlotCell, resultsInvalid: boolean, result: Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[]) {
    if (plotCell && plotCell.mathFields.reduce(noSyntaxErrorReducer, true) &&
        isPlotResult(result) && 
        result.reduce(atLeastOneValidPlotReducer, false ) &&
         !resultsInvalid) {
      const plotRenderData = convertPlotUnits(result);
      return collectPlotData(result, plotRenderData);
    } else {
      return {
              clipboardPlotData: {headers: [], units: [], columns: []},
              plotRenderData: isPlotResult(result) ? getEmptyRenderData(result.length) : [],
              plotData: {data: [{}], layout: {}}
            };
    }
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
      onchange={handleLogScaleChange}
      title="Use log scale for x axis"
    >
      log x
    </TextCheckbox>

    <TextCheckbox
      bind:checked={plotCell.logY}
      onchange={handleLogScaleChange}
      title="Use log scale for y asix"
    >
      log y
    </TextCheckbox>

    <TextCheckbox
      bind:checked={plotCell.squareAspectRatio}
      onchange={handleAspectRatioChange}
      title="Use square aspect ratio"
    >
      1:1 Ratio
    </TextCheckbox>

    <TextButton 
     onclick={copyData}
     >
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
            update={(e) => parseLatex(e.latex, mathField)}
            enter={() => handleEnter(i)}
            shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
            modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
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
          {:else if mathField.latex && isPlotResult(appState.results[index]) && appState.results[index][i] && appState.results[index].length === plotRenderData.length}
            {@const plotData = appState.results[index][i].data[0]}
            {@const renderData = plotRenderData[i]}
            {#if plotData.scatterErrorMessage}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{plotData.scatterErrorMessage}</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if plotData.parametricErrorMessage}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{plotData.parametricErrorMessage}</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !plotData.numericInput}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">X-axis limits of plot do not evaluate to a number</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !plotData.limitsUnitsMatch}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">Units of the x-axis upper and lower limits do not match</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !plotData.numericOutput}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">Results of expression does not evaluate to finite and real numeric values</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !unitsValid(renderData.displayInputUnits)}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">X-axis upper and/or lower limit dimension error{renderData.asciiInputUnits.startsWith("Dimension Error:") ? renderData.asciiInputUnits.slice(15) : ""}</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if !unitsValid(renderData.displayOutputUnits)}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">Y-axis dimension error{renderData.asciiOutputUnits.startsWith("Dimension Error:") ? renderData.asciiOutputUnits.slice(15) : ""}</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if renderData.unitsMismatch}
              <TooltipIcon direction="right" align="end">
                  <span slot="tooltipText">
                    { renderData.unitsMismatchReason ? renderData.unitsMismatchReason : "Units Mismatch" }
                  </span>
                <Error class="error"/>
              </TooltipIcon>
            {:else if plotData.inputReversed}
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
              click={() => deleteRow(i)}
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
          click={addMathField}
          id={`add-row-${index}`}
          title="Add Equation"
        >
          <Add />
        </IconButton>
      </div>
    {/if}
  </div>
</div>


