<script lang="ts">
  import {
    cells,
    activeCell,
    mathCellChanged,
    resultsInvalid,
    nonMathCellChanged,
    results,
    title
  } from "./stores";

  import { isFiniteImagResult, type Result, type FiniteImagResult,
           type PlotResult, type MatrixResult, 
           type DataTableResult, 
           isDataTableResult} from "./resultTypes";

  import type { QueryStatement } from "./parser/types";

  import { onMount, tick, createEventDispatcher } from "svelte";

  import { convertArrayUnits, unitsEquivalent, unitsValid } from "./utility.js";

  import type DataTableCell from "./cells/DataTableCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";
  import DataTableInput from "./DataTableInput.svelte";
  import TextButton from "./TextButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import ColumnDelete from "carbon-icons-svelte/lib/ColumnDelete.svelte";
  import RowCollapse from "carbon-icons-svelte/lib/RowCollapse.svelte";
  import IconButton from "./IconButton.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import type { ModalInfo } from "./types";

  export let index: number;
  export let dataTableCell: DataTableCell;

  let result: (Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[] | null) = null;
  let containerDiv: HTMLDivElement;
  let copyButtonText = "Copy Data";

  export function getMarkdown() {
    const rows = dataTableCell
                  .getSheetRows()
                  .map(row => row.map(value => value.replaceAll('|', '\\|').replaceAll(':', '\\:')));
    
    const colDef = Array(rows[0].length).fill(':----');

    const table = [rows[0], colDef, ...rows.slice(1)];

    return table.map(row => '|' + row.join('|') + '|').join('\n') + '\n\n';
  }

  const dispatch = createEventDispatcher<{
    insertMathCellAfter: {index: number};
    insertInsertCellAfter: {index: number};
    modal: {modalInfo: ModalInfo};
  }>();

  onMount(() => {
    if ($activeCell === index) {
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
    $cells[index] = $cells[index];
    await tick();
    const firstInputColumn = dataTableCell.columnIsOutput.findIndex(isOutput => !isOutput);
    const fieldElement = document.querySelector(`#data-table-input-${index}-${numRows-1}-${firstInputColumn}`) as HTMLDivElement | null;
    if (fieldElement) {
      fieldElement.focus();
    }
  }

  function addColumn() {
    dataTableCell.addColumn();
    $resultsInvalid = true;
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function deleteRow(rowIndex: number) {
    dataTableCell.deleteRow(rowIndex);

    for (let i = 0; i < dataTableCell.columnData.length; i++) {
      dataTableCell.parseColumn(i);
    }

    $resultsInvalid = true;
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function deleteEmptyRows() {
    dataTableCell.deleteEmptyRows();

    $nonMathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function deleteColumn(colIndex: number) {
    const startingIdSet = new Set(dataTableCell.columnIds);

    dataTableCell.deleteColumn(colIndex);

    // @ts-ignore
    if (startingIdSet.symmetricDifference(new Set(dataTableCell.columnIds)).size > 0) {
      // id list changed, need to reparse all of the parameter fields
      for(const [i, parameterField] of dataTableCell.parameterFields.entries()) {
        parseParameterField(parameterField.latex, i, parameterField);
      }
    }

    $resultsInvalid = true;
    $mathCellChanged = true;
    $cells[index] = $cells[index];
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

  function parseParameterField(latex: string, column: number, mathField: MathFieldClass) {
    const startingIdSet = new Set(dataTableCell.columnIds);
    
    dataTableCell.columnIds[column] = null;
    dataTableCell.columnStatements[column] = null;

    const dataTableInfo = {
      colVars: dataTableCell.columnIds.filter((id) => id !== null),
      cellNum: index,
      colNum: column
    };
    mathField.parseLatex(latex, dataTableInfo);
    if (!mathField.parsingError) {
      dataTableCell.columnErrors[column] = "";
      if (mathField.statement?.type === "parameter") {
        dataTableCell.columnIsOutput[column] = false;
        dataTableCell.columnIds[column] = mathField.statement.name;
        dataTableCell.parseColumn(column);
      } else {
        dataTableCell.columnIsOutput[column] = true;
        if ("assignment" in mathField.statement && mathField.statement.assignment) {
          dataTableCell.columnIds[column] = mathField.statement.assignment.name;
        }
        dataTableCell.columnStatements[column] = (mathField.statement as QueryStatement);
      }
    } else {
      dataTableCell.columnErrors[column] = mathField.parsingErrorMessage;
      dataTableCell.columnIsOutput[column] = false;
    }

    // @ts-ignore
    if (startingIdSet.symmetricDifference(new Set(dataTableCell.columnIds)).size > 0) {
      // id list changed, need to reparse all of the other parameter fields
      for(const [i, parameterField] of dataTableCell.parameterFields.entries()) {
        if (i !== column) {
          parseParameterField(parameterField.latex, i, parameterField);
        }
      }
    }

    $resultsInvalid = true;
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function parseUnitField(latex: string, column: number, mathField: MathFieldClass) {
    mathField.parseLatex(latex);

    if (dataTableCell.parameterFields[column].statement?.type === "parameter") {
      dataTableCell.parseColumn(column);
    }

    $resultsInvalid = true;
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function parseDataField(column: number) {

    if (dataTableCell.parameterFields[column].statement?.type === "parameter") {
      dataTableCell.parseColumn(column);
    }

    $resultsInvalid = true;
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function setColumnResult(colNum: number, colResult: MatrixResult) {
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
      $cells[index] = $cells[index];
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
    
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function parseInterpolationDefNameField(latex, column: number, mathField: MathFieldClass) {
    mathField.parseLatex(latex);

    dataTableCell.setInterpolationFunctions();

    $resultsInvalid = true;
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function handleInputOutputChange(defIndex: number) {
    dataTableCell.setInterpolationFunctions();

    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function handlePolyOrderChange(defIndex: number) {
    dataTableCell.setInterpolationFunctions();

    $mathCellChanged = true;
  }

  function handleDeleteInterpoloationDef(defIndex: number) {
    dataTableCell.deleteInterpolationDefinition(defIndex);

    dataTableCell.setInterpolationFunctions();

    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  async function handleLoadSpreadsheet() {
    try {
      dispatch("modal", {modalInfo: {state: "importingSpreadsheet", modalOpen: true, heading: 'Importing Spreadsheet'}});
      await dataTableCell.selectAndLoadSpreadsheetFile();
      dispatch("modal", {modalInfo: {state: "importingSpreadsheet", modalOpen: false, heading: 'Importing Spreadsheet'}});

      $mathCellChanged = true;
      $cells[index] = $cells[index]; 
    } catch (e) {
      dispatch("modal", {modalInfo: {state: "error", modalOpen: true, error: e, heading: 'Importing Spreadsheet'}});
    }
  }

  function handleExportCSV() {
    dataTableCell.exportAsCSV($title);
  }

  async function copyData() {
    const clipboardData = dataTableCell.getClipboardData(); 

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

  $: if ($activeCell === index) {
      focus();
    }

  $: numColumns = dataTableCell.columnData.length;
  $: numRows = dataTableCell.columnData[0].length;
  $: numInterpolationDefs = dataTableCell.interpolationDefinitions.length;
  $: numInputs = dataTableCell.columnIsOutput.filter(value => !value).length;

  $: result = $results[index];

  $: if (result && isDataTableResult(result) && !$resultsInvalid) {
    for (const [col, colResult] of Object.entries(result.colData)) {
      setColumnResult(Number(col), colResult);
    }
  } else {
    clearOutputColumns();
  }

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
    justify-content: space-around;
  }

  div.horizontal {
    display: flex;
    align-items: center;
  }

  div.horizontal.spread, div.item.spread {
    justify-content: space-between;
  }

  .margin-left {
    margin-left: 10px;
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
  <TextButton on:click={handleLoadSpreadsheet}>
    Import Spreadsheet
  </TextButton>
  <TextButton on:click={handleExportCSV}>
    Export CSV
  </TextButton>
  <TextButton on:click={copyData}>
    {copyButtonText}
  </TextButton>
  {#if numInputs >= 2}
    <TextButton on:click={() => handleAddInterpolationFunction('interpolation')}>
      Add Interpolation
    </TextButton>
    <TextButton on:click={() => handleAddInterpolationFunction('polyfit')}>
      Add Polyfit
    </TextButton>
  {/if}
</div>

<div
  class="container"
  bind:this= {containerDiv}
  spellcheck={$activeCell === index}
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
          on:update={(e) => parseParameterField(e.detail.latex, j, mathField)}
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
            on:update={(e) => parseUnitField(e.detail.latex, j, mathField)}
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
                  on:update={(e) => parseInterpolationDefNameField(e.detail.latex, i, def.nameField)}
                  on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
                  on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
                  mathField={def.nameField}
                  parsingError={def.nameField.parsingError}
                  bind:this={def.nameField.element}
                  latex={def.nameField.latex}
                />
                {#if def.nameField.parsingError}
                  <TooltipIcon direction="right" align="end">
                    <span slot="tooltipText">{def.nameField.parsingErrorMessage}</span>
                    <Error class="error"/>
                  </TooltipIcon>
                {:else}
                  <IconButton
                    on:click={() => def.nameField.element?.getMathField()?.executeCommand('copyToClipboard')}
                    title="Copy function name to clipboard"
                    id={`copy-interpolation-function-name-${index}-${i}`}
                  >
                    <Copy />
                  </IconButton>
                {/if}
                {#if def.type === "polyfit"}
                  <label class="margin-left">
                    Order:
                    <input
                      type="number"
                      bind:value={def.order}
                      min="0"
                      max="100"
                      on:change={() => handlePolyOrderChange(i)}
                    >
                  </label>
                {/if}
              </div>
            </div>
          {/if}       
          {#if !isOutput}
            <div class="vertical">
              <div class="horizontal spread">
                <label for={`input-radio-${index}-${i}-${j}`}>
                  Input:
                </label>
                <input 
                  type="radio"
                  id={`input-radio-${index}-${i}-${j}`}
                  name={`input_radio_${index}_${i}`}
                  bind:group={def.input}
                  value={j}
                  on:change={() => handleInputOutputChange(i)}
                >
              </div>
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
                  on:change={() => handleInputOutputChange(i)}
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
          on:click={() => handleDeleteInterpoloationDef(i)}
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
            {#if !$resultsInvalid}
              {dataTableCell.columnData[j][i]}
            {/if}
          {:else}
            <DataTableInput
              on:enter={() => handleEnter(i)}
              on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
              on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
              id={`data-table-input-${index}-${i}-${j}`}
              bind:textContent={dataTableCell.columnData[j][i]} 
              on:input={() => parseDataField(j)}
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
          on:click={() => deleteColumn(j)}
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
          on:click={() => deleteRow(i)}
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
      on:click={addColumn}
      title="Add Column"
    > 
      <Add />
    </IconButton>
  </div>

  <div class="buttons" style="grid-column:1; grid-row:{numRows + numInterpolationDefs + 3}">
    <IconButton
      on:click={addRow}
      id={`add-row-${index}`}
      title="Add Row"
    >
      <Add />
    </IconButton>
  </div>

  {#if numRows > 1}
    <div class="buttons justify-right" style="grid-column:{numColumns}; grid-row:{numRows + numInterpolationDefs + 3}">
      <IconButton
        on:click={deleteEmptyRows}
        id={`delete-blank-rows-${index}`}
        title="Delete Blank Rows"
      >
        <RowCollapse />
      </IconButton>
    </div>
  {/if}

</div>

