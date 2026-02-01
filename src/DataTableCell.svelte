<script lang="ts">
  import appState from "./stores.svelte";

  import { isFiniteImagResult, type Result,
           type MatrixResult, isDataTableResult} from "./resultTypes";

  import type { DataTableInfo, QueryStatement } from "./parser/types";

  import { onMount, tick } from "svelte";

  import { format } from "mathjs";

  import { convertArrayUnits, unitsEquivalent, unitsValid } from "./utility.js";

  import type DataTableCell from "./cells/DataTableCell.svelte";
  import type { MathField as MathFieldClass } from "./cells/MathField.svelte";

  import MathField from "./MathField.svelte";
  import DataTableInput from "./DataTableInput.svelte";
  import TextButton from "./TextButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import Grid from "carbon-icons-svelte/lib/Grid.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import ColumnDelete from "carbon-icons-svelte/lib/ColumnDelete.svelte";
  import RowCollapse from "carbon-icons-svelte/lib/RowCollapse.svelte";
  import IconButton from "./IconButton.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import type { ModalInfo } from "./types";

  interface Props {
    index: number;
    dataTableCell: DataTableCell;
    insertMathCellAfter: (arg: {detail: {index: number}}) => void;
    insertInsertCellAfter: (arg: {detail: {index: number}}) => void;
    modal: (arg: {detail: {modalInfo: ModalInfo}}) => void;
    mathCellChanged: () => void;
    triggerSaveNeeded: (pendingMathCellChange?: boolean) => void;
  }

  let {
    index,
    dataTableCell,
    insertMathCellAfter,
    insertInsertCellAfter,
    modal,
    mathCellChanged,
    triggerSaveNeeded
  }: Props = $props();

  let numColumns = $derived(dataTableCell.columnData.length);
  let numRows = $derived(dataTableCell.columnData[0].length);
  let numInterpolationDefs = $derived(dataTableCell.interpolationDefinitions.length);
  let numInputs = $derived(dataTableCell.columnIsOutput.filter(value => !value).length);
  let result = $derived(appState.results[index]);
  let columnFormatOptions = $derived(dataTableCell.columnFormatOptions.map((value) => value === null ? appState.config.mathCellConfig.formatOptions : value));
  let containerDiv: HTMLDivElement;
  let copyButtonText = $state("Copy Data");

  export async function getMarkdown(centerEquations: boolean) {
    const rows = await dataTableCell.getSheetRows(true);
    
    const colDef = Array(rows[0].length).fill(':----');

    const table = [rows[0], colDef, ...rows.slice(1)];

    return table.map(row => '|' + row.join('|') + '|').join('\n') + '\n\n';
  }

  onMount(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function focus() {
    if ( containerDiv && containerDiv.parentElement &&
         !containerDiv.parentElement.contains(document.activeElement) ) {
      const inputElement: HTMLInputElement = document.querySelector(`#data-table-input-${index}-0-0`);
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  async function addRow() {
    dataTableCell.addRow();
    appState.cells[index] = appState.cells[index];
    await tick();
    const firstInputColumn = dataTableCell.columnIsOutput.findIndex(isOutput => !isOutput);
    const fieldElement = document.querySelector(`#data-table-input-${index}-${numRows-1}-${firstInputColumn}`) as HTMLDivElement | null;
    if (fieldElement) {
      fieldElement.focus();
    }
  }

  function addColumn() {
    dataTableCell.addColumn();
    appState.cells[index] = appState.cells[index];
    triggerSaveNeeded();
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  async function deleteRow(rowIndex: number) {
    triggerSaveNeeded(true);
    appState.resultsInvalid = true;

    dataTableCell.deleteRow(rowIndex);

    for (let i = 0; i < dataTableCell.columnData.length; i++) {
      await dataTableCell.debounceParseColumn(dataTableCell.columnIds[i]);
    }

    appState.cells[index] = appState.cells[index];
    mathCellChanged();
  }

  function deleteEmptyRows() {
    dataTableCell.deleteEmptyRows();

    appState.cells[index] = appState.cells[index];
    triggerSaveNeeded();
  }

  async function deleteColumn(colIndex: number) {
    triggerSaveNeeded(true);

    const startingIdSet = new Set(dataTableCell.columnIdentifiers);

    dataTableCell.deleteColumn(colIndex);

    if (startingIdSet.symmetricDifference(new Set(dataTableCell.columnIdentifiers)).size > 0) {
      // id list changed, need to reparse all of the parameter fields
      for(const [i, parameterField] of dataTableCell.parameterFields.entries()) {
        await parseParameterField(parameterField.latex, i, parameterField);
      }
    }

    appState.cells[index] = appState.cells[index];
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  function handleEnter(row: number) {
    if (row == numRows-1) {
      addRow();
    } else {
      const firstInputColumn = dataTableCell.columnIsOutput.findIndex(isOutput => !isOutput);
      const fieldElement = document.querySelector(`#data-table-input-${index}-${row+1}-${firstInputColumn}`) as HTMLDivElement | null;
      if (fieldElement) {
        fieldElement.focus();
      }
    }
  }

  async function parseParameterField(latex: string, column: number, mathField: MathFieldClass, topLevel = true) {
    triggerSaveNeeded(true);

    const startingIdSet = new Set(dataTableCell.columnIdentifiers);
    
    dataTableCell.columnStatements[column] = null;

    const dataTableInfo: DataTableInfo = {
      colVars: dataTableCell.columnIdentifiers.filter((id) => id !== null),
      cellNum: index,
      colId: dataTableCell.columnIds[column]
    };
    await mathField.parseLatex(latex, dataTableInfo);
    if (!mathField.parsingError) {
      dataTableCell.columnIdentifiers[column] = null;
      dataTableCell.columnErrors[column] = "";
      if (mathField.statement?.type === "parameter") {
        dataTableCell.columnIsOutput[column] = false;
        dataTableCell.columnIdentifiers[column] = mathField.statement.name;
        await dataTableCell.debounceParseColumn(dataTableCell.columnIds[column]);
      } else {
        dataTableCell.columnIsOutput[column] = true;
        if ("assignment" in mathField.statement && mathField.statement.assignment) {
          dataTableCell.columnIdentifiers[column] = mathField.statement.assignment.name;
        }
        dataTableCell.columnStatements[column] = (mathField.statement as QueryStatement);
      }
    } else {
      dataTableCell.columnErrors[column] = mathField.parsingErrorMessage;
      dataTableCell.columnIsOutput[column] = false;
    }

    if ( topLevel && !startingIdSet.has(dataTableCell.columnIdentifiers[column]) ) {
      // id list changed because of this column, need to reparse all of the other columns' parameter fields
      for(const [i, parameterField] of dataTableCell.parameterFields.entries()) {
        if (i !== column) {
          await parseParameterField(parameterField.latex, i, parameterField, false);
        }
      }
    }

    appState.cells[index] = appState.cells[index];
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  async function parseUnitField(latex: string, column: number, mathField: MathFieldClass) {
    triggerSaveNeeded(true);
    
    await mathField.parseLatex(latex);

    if (!dataTableCell.columnIsOutput[column]) {
      await dataTableCell.debounceParseColumn(dataTableCell.columnIds[column]);
    }

    appState.cells[index] = appState.cells[index];
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  async function parseDataField(column: number) {
    triggerSaveNeeded(true);

    if (!dataTableCell.columnIsOutput[column]) {
      await dataTableCell.debounceParseColumn(dataTableCell.columnIds[column]);
    }

    appState.cells[index] = appState.cells[index];
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  function setColumnResult(colId: number, colResult: MatrixResult) {
    if (!dataTableCell.columnIdLocationMap.has(colId)) {
      return;
    }
    let colNum = dataTableCell.columnIdLocationMap.get(colId);
    dataTableCell.columnErrors[colNum] = "";
    dataTableCell.columnOutputUnits[colNum] = "";
    dataTableCell.columnIsOutput[colNum] = true;
    
    const currentCol = dataTableCell.columnData[colNum];
    currentCol.fill('');

    let newColData: number[] = [];

    if (colResult.results[0].length !== 1) {
      dataTableCell.columnErrors[colNum] = "Only column vectors can be placed in a data table";
      return;
    }

    const statement = dataTableCell.columnStatements[colNum];
    if (!statement) {
      dataTableCell.columnErrors[colNum] = "Parsing Error (mismatch between expression and result)";
      return;
    }

    if (statement.type !== "query"){
      dataTableCell.columnErrors[colNum] = "Parsing Error (mismatch between expression and result)";
      return;
    }

    let resultUnits = "";
    let resultUnitsLatex = "";
    let firstResult: Result;

    let resultUnitSet: Set<string> = new Set();

    for (const [i, resultRow] of colResult.results.entries()) {
      for (const [j, result] of resultRow.entries()) {
        if (isFiniteImagResult(result)) {
          dataTableCell.columnErrors[colNum] = "Some results evaluate to an imaginary number, which cannot be displayed in a data table";
          return;
        } else if (!(result.numeric && result.finite)) {
          dataTableCell.columnErrors[colNum] = "Some results do not evaluate to a finite real value, which cannot be displayed in a data table";
          return;
        } else {
          if (i === 0 && j === 0) {
            resultUnits = result.units;
            resultUnitsLatex = result.unitsLatex;
            firstResult = result;
          }
          newColData.push(Number(result.value));
          resultUnitSet.add(result.units);
        }
      }
    }

    if (resultUnitSet.size > 1) {
      dataTableCell.columnErrors[colNum] = "All entries in the column vector must have the same units";
      return;
    }

    if (!unitsValid(firstResult.units)) {
      dataTableCell.columnErrors[colNum] = "Dimension Error";
      return;
    }

    if ( statement.units || firstResult.customUnitsLatex) {
      const startingUnits = resultUnits;

      if (statement.units) {
        resultUnitsLatex = statement.unitsLatex;
        resultUnits = statement.units;
      } else {
        resultUnitsLatex = firstResult.customUnitsLatex;
        resultUnits = firstResult.customUnits;
      } 

      if (unitsEquivalent(resultUnits, startingUnits)) {
        newColData = convertArrayUnits(newColData, startingUnits, resultUnits);
      } else {
        dataTableCell.columnErrors[colNum] = "Units Mismatch";
        return;
      } 
    }

    for (const [i, value] of newColData.entries()) {
      currentCol[i] = String(value);
    }

    dataTableCell.columnOutputUnits[colNum] = resultUnitsLatex;

    const paddingNeeded = dataTableCell.padColumns();
    if (paddingNeeded) {
      appState.cells[index] = appState.cells[index];
    }
  }

  function clearOutputColumns() {
    dataTableCell.clearOutputColumns();
  }

  function handleAddInterpolationFunction(type: "interpolation" | "polyfit") {
    let input = dataTableCell.columnIsOutput.indexOf(false);
    if (input === -1) {
      return;
    }
    let output = dataTableCell.columnIsOutput.indexOf(false, input+1);
    if (output === -1) {
      return;
    }
    dataTableCell.addInterpolationDefinition(type, input, output);
    
    appState.cells[index] = appState.cells[index];
    triggerSaveNeeded();
    mathCellChanged();
  }

  async function parseInterpolationDefNameField(latex, column: number, mathField: MathFieldClass) {
    triggerSaveNeeded(true);
    
    await mathField.parseLatex(latex);

    dataTableCell.setInterpolationFunctions();

    appState.cells[index] = appState.cells[index];
    appState.resultsInvalid = true;
    mathCellChanged();
  }

  function handleInputOutputChange(defIndex: number) {
    dataTableCell.setInterpolationFunctions();

    appState.cells[index] = appState.cells[index];
    
    triggerSaveNeeded();
    mathCellChanged();
  }

  function handlePolyOrderChange(defIndex: number) {
    dataTableCell.setInterpolationFunctions();

    triggerSaveNeeded();
    mathCellChanged();
  }

  function handleNumInputsChange(defIndex: number) {
    dataTableCell.setInterpolationFunctions();

    appState.cells[index] = appState.cells[index];

    triggerSaveNeeded();
    mathCellChanged();
  }

  function handleDeleteInterpoloationDef(defIndex: number) {
    dataTableCell.deleteInterpolationDefinition(defIndex);

    dataTableCell.setInterpolationFunctions();

    appState.cells[index] = appState.cells[index];

    triggerSaveNeeded();
    mathCellChanged();
  }

  async function handleLoadSpreadsheet() {
    try {
      modal({detail: {modalInfo: {state: "importingSpreadsheet", modalOpen: true, heading: 'Importing Spreadsheet'}}});
      await dataTableCell.selectAndLoadSpreadsheetFile();
      modal({detail: {modalInfo: {state: "importingSpreadsheet", modalOpen: false, heading: 'Importing Spreadsheet'}}});

      appState.cells[index] = appState.cells[index];
      
      triggerSaveNeeded();
      mathCellChanged();
    } catch (e) {
      modal({detail: {modalInfo: {state: "error", modalOpen: true, error: e, heading: 'Importing Spreadsheet'}}});
    }
  }

  async function handleExportCSV() {
    await dataTableCell.exportAsCSV(appState.title);
  }

  async function copyData() {
    const clipboardData = await dataTableCell.getClipboardData(); 

    if (clipboardData === "") {
      copyButtonText = "No data to copy";
    } else {
      try {
        await navigator.clipboard.writeText(clipboardData);
        copyButtonText = "Copied!";
      } catch (e) {
        copyButtonText = "Copy failed, check browser settings";
      }
    }

    setTimeout(() => copyButtonText="Copy Data", 2000);
  }

  $effect( () => {
    if (appState.activeCell === index) {
        focus();
    }
  });

  $effect( () => {
    if (result && isDataTableResult(result) && !appState.resultsInvalid) {
      for (const [colId, colResult] of Object.entries(result.colData)) {
        setColumnResult(Number(colId), colResult);
      }
    } else {
      clearOutputColumns();
    }
  });

</script>


<style>
  div.container {
    display: grid;
    width: max-content;
    padding-top: 10px;
    padding-bottom: 10px;
    break-inside: avoid;
  }

  div.item {
    border: solid 1px;
    margin: 0 -1px -1px 0;
    display: flex;
    justify-content: left;
    padding: 7px;
    min-width: 170px;
  }

  div.item.math-field, div.item.data-field {
    display: flex;
    align-items: center;
  }

  div.item.data-field {
    min-height: 43.2px;
  }

  div.item.math-field.calculated {
    padding-inline-start: 0px;
  }

  div.item.data-field.calculated {
    padding-inline-start: 12px;
  }

  div.vertical {
    display: flex;
    flex-direction: column;
  }

  div.horizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  div.horizontal.spread, div.item.spread {
    justify-content: space-between;
  }

  .margin-left {
    margin-left: 5px;
  }

  .margin-right {
    margin-right: 10px;
  }

  .padding-bottom {
    padding-bottom: 4px;
  }

  div.top-buttons {
    display: flex;
    flex-wrap: wrap;
    row-gap: 5px;
    column-gap: 3px;
  }

  div.bottom-buttons {
    margin-top: 1px;
  }

  div.delete-columns {
    justify-self: center;
  }

  div.buttons {
    margin-left: 1px;
    margin-right: 1px;
    align-self: center;
  }

  div.buttons.align-start {
    align-self: start;
  }

  div.buttons.justify-right {
    display: flex;
    justify-content: end;
  }

  div.error-place-holder {
    width: 24px;
  }

  @media print {
    div.buttons, div.bottom-buttons, div.error-place-holder, div.info-tooltip {
      display: none;
    }

    div.item {
      min-width: auto;
    }
  }

</style>

<div class="top-buttons">
  <TextButton
    onclick={handleLoadSpreadsheet}
  >
    Import Spreadsheet
  </TextButton>
  <TextButton
    onclick={handleExportCSV}
  >
    Export CSV
  </TextButton>
  <TextButton
    onclick={copyData}
  >
    {copyButtonText}
  </TextButton>
  {#if numInputs >= 2}
    <TextButton 
      onclick={() => handleAddInterpolationFunction('interpolation')}
    >
      Add Interpolation
    </TextButton>
    <TextButton
      onclick={() => handleAddInterpolationFunction('polyfit')}
    >
      Add Polyfit
    </TextButton>
  {/if}
</div>

<div
  class="container"
  bind:this= {containerDiv}
  spellcheck={appState.activeCell === index}
>
  {#if dataTableCell.parameterFields}
    {#each dataTableCell.parameterFields as mathField, j (mathField.id)}
      <div
        class="item math-field"
        id={`parameter-name-${index}-${j}`}
        style="grid-column: {j + 1}; grid-row: 1;"
      >
        <MathField
          editable={true}
          update={(e) => parseParameterField(e.latex, j, mathField)}
          shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
          modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
          mathField={mathField}
          parsingError={mathField.parsingError}
          parsePending={mathField.parsePending}
          bind:this={mathField.element}
          latex={mathField.latex}
        />
        {#if mathField.parsingError}
          {#if !mathField.parsePending}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
              <Error class="error"/>
            </TooltipIcon>
          {/if}
        {:else if dataTableCell.columnErrors[j]}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{dataTableCell.columnErrors[j]}</span>
            <Error class="error"/>
          </TooltipIcon>
        {:else if j === 0}
          <div class="info-tooltip">
            <TooltipIcon direction="right">
              <span slot="tooltipText">Place variable names or column queries in this row</span>
              <Information />
            </TooltipIcon>
          </div>
        {:else}
          <div class="error-place-holder"></div>
        {/if}
      </div>
    {/each}
  {/if}

  {#if dataTableCell.parameterUnitFields}
    {#each dataTableCell.parameterUnitFields as mathField, j (mathField.id)}
      <div
        class="item math-field"
        class:calculated={dataTableCell.columnIsOutput[j]}
        id={`parameter-units-${index}-${j}`}
        style="grid-column: {j + 1}; grid-row: 2;"
      >
        {#if dataTableCell.columnIsOutput[j]}
          <MathField
            latex={dataTableCell.columnOutputUnits[j]}
          />
        {:else}
          <MathField
            editable={true}
            update={(e) => parseUnitField(e.latex, j, mathField)}
            shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
            modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
            mathField={mathField}
            parsingError={mathField.parsingError}
            parsePending={mathField.parsePending}
            bind:this={mathField.element}
            latex={mathField.latex}
          />
          
          {#if mathField.parsingError }
            {#if !mathField.parsePending}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
                <Error class="error"/>
              </TooltipIcon>
            {/if}
          {:else if j === 0}
            <div class="info-tooltip">
              <TooltipIcon direction="right">
                <span slot="tooltipText">Place column specific units in this row (optional)</span>
                <Information />
              </TooltipIcon>
            </div>
          {:else}
            <div class="error-place-holder"></div>
          {/if}
        {/if}
      </div>
    {/each}
  {/if}

  {#if numInterpolationDefs > 0}
    {#each dataTableCell.interpolationDefinitions as def, i}
      {#each dataTableCell.columnIsOutput as isOutput, j }
        <div
          class="item spread"
          style="grid-column: {j+1}; grid-row: {i+3};"
        >
          {#if j === 0}
            <div class="vertical margin-right">
              <label
                class="padding-bottom"
                for={`interpolation-name-${index}-${i}`}
              >
                {def.type === "polyfit" ? "Polyfit Function Name:" : "Interpolation Function Name:"}
              </label>
              <div
                id={`interpolation-name-${index}-${i}`} 
                class="horizontal"
              >
                <MathField
                  editable={true}
                  update={(e) => parseInterpolationDefNameField(e.latex, i, def.nameField)}
                  shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
                  modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
                  mathField={def.nameField}
                  parsingError={def.nameField.parsingError}
                  parsePending={def.nameField.parsePending}
                  bind:this={def.nameField.element}
                  latex={def.nameField.latex}
                />
                {#if def.nameField.parsingError}
                  {#if !def.nameField.parsePending}
                    <TooltipIcon direction="right" align="end">
                      <span slot="tooltipText">{def.nameField.parsingErrorMessage}</span>
                      <Error class="error"/>
                    </TooltipIcon>
                  {/if}
                {:else}
                  <IconButton
                    click={() => def.nameField.element?.getMathField()?.executeCommand('copyToClipboard')}
                    title="Copy function name to clipboard"
                    id={`copy-interpolation-function-name-${index}-${i}`}
                  >
                    <Copy />
                  </IconButton>
                {/if}
                <label class="margin-left">
                  Inputs:
                  <input
                    type="number"
                    bind:value={def.numInputs}
                    min="1"
                    max="20"
                    onchange={() => handleNumInputsChange(i)}
                  >
                </label>
                {#if def.type === "polyfit"}
                  <label class="margin-left">
                    Order:
                    <input
                      type="number"
                      bind:value={def.order}
                      min="0"
                      max="99"
                      onchange={() => handlePolyOrderChange(i)}
                    >
                  </label>
                {:else if dataTableCell.interpolationFunctions[i]?.type === "gridInterpolation"}
                  <div class="info-tooltip">
                    <TooltipIcon direction="right">
                      <span slot="tooltipText">2D grid data detected, using bilinear interpolation</span>
                      <Grid />
                    </TooltipIcon>
                  </div>
                {/if}
              </div>
            </div>
          {/if}       
          {#if !isOutput}
            <div class="vertical">
              {#each def.inputs as inputIndex, k}
                <div class="horizontal spread">
                  <label for={`input-radio-${index}-${i}-${j}-${k}`}>
                    {def.numInputs === 1 ? "Input:" : `Input ${k+1}:`}
                  </label>
                  <input 
                    type="radio"
                    id={`input-radio-${index}-${i}-${j}-${k}`}
                    name={`input_radio_${index}_${i}_${k}`}
                    bind:group={def.inputs[k]}
                    value={j}
                    onchange={() => handleInputOutputChange(i)}
                  >
                </div>
              {/each}
              <div class="horizontal">
                <label for={`output-radio-${index}-${i}-${j}`}>
                  Output:
                </label>
                <input 
                  type="radio"
                  id={`output-radio-${index}-${i}-${j}`}
                  name={`output_radio_${index}_${i}`}
                  bind:group={def.output}
                  value={j}
                  onchange={() => handleInputOutputChange(i)}
                >   
              </div>
            </div>
          {/if}
        </div>
      {/each}
      <div 
        class="buttons"
        style="grid-column: {numColumns + 1}; grid-row: {i+3};"
      >
        <IconButton
          click={() => handleDeleteInterpoloationDef(i)}
          title={`Delete ${def.type === "polyfit" ? "Polyfit" : "Interpolation"} Function`}
          id={`delete-interpolation-row-${index}-${i}`}
        >
          <RowDelete />
        </IconButton>
      </div>

    {/each}
  {/if}

  {#if dataTableCell.columnData}
    {#each Array(numRows) as _, i }
      {#each Array(numColumns) as _, j }
        {@const nonNumeric = isNaN(Number(dataTableCell.columnData[j][i]))}
        <div
          class="item data-field"
          class:calculated={dataTableCell.columnIsOutput[j]}
          id={`grid-cell-${index}-${i}-${j}`}
          style="grid-column: {j+1}; grid-row: {i+numInterpolationDefs+3};"
        >
          {#if dataTableCell.columnIsOutput[j]}
            {@const value = dataTableCell.columnData[j][i]}
            {#if !appState.resultsInvalid && value !== ""}
              {format(parseFloat(value), columnFormatOptions[j])}
            {/if}
          {:else}
            <DataTableInput
              enter={() => handleEnter(i)}
              shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
              modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
              id={`data-table-input-${index}-${i}-${j}`}
              bind:textContent={dataTableCell.columnData[j][i]} 
              input={() => parseDataField(j)}
              error={nonNumeric}
            >
            </DataTableInput>
            {#if nonNumeric}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">Data table must contain numeric values</span>
                <Error class="error"/>
              </TooltipIcon>
            {:else}
              <div class="error-place-holder"></div>
            {/if}
          {/if}
        </div>
      {/each}
    {/each}
  {/if}


  {#if numColumns > 1}
    {#each Array(numColumns) as _, j}
      <div 
        class="bottom-buttons delete-columns"
        style="grid-column: {j + 1}; grid-row: {numRows+numInterpolationDefs+3};"
      >
        <IconButton
          click={() => deleteColumn(j)}
          title="Delete Column"
          id={`delete-col-${index}-${j}`}
        >
          <ColumnDelete />
        </IconButton>
      </div>
    {/each}
  {/if}

  {#if numRows > 1}
    {#each Array(numRows) as _, i}
      <div 
        class="buttons"
        style="grid-column: {numColumns + 1}; grid-row: {i+numInterpolationDefs+3};"
      >
        <IconButton
          click={() => deleteRow(i)}
          title="Delete Row"
          id={`delete-row-${index}-${i}`}
        >
          <RowDelete />
        </IconButton>
      </div>
    {/each}
  {/if}


  <div class="buttons align-start" style="grid-column:{numColumns + 1}; grid-row:1">
    <IconButton 
      id={`add-col-${index}`}
      click={addColumn}
      title="Add Column"
    > 
      <Add />
    </IconButton>
  </div>

  <div class="buttons" style="grid-column:1; grid-row:{numRows + numInterpolationDefs + 3}">
    <IconButton
      click={addRow}
      id={`add-row-${index}`}
      title="Add Row"
    >
      <Add />
    </IconButton>
  </div>

  {#if numRows > 1}
    <div class="buttons justify-right" style="grid-column:{numColumns}; grid-row:{numRows + numInterpolationDefs + 3}">
      <IconButton
        click={deleteEmptyRows}
        id={`delete-blank-rows-${index}`}
        title="Delete Blank Rows"
      >
        <RowCollapse />
      </IconButton>
    </div>
  {/if}

</div>

