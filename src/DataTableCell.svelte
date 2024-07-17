<script lang="ts">
  import {
    cells,
    activeCell,
    mathCellChanged,
    resultsInvalid,
    nonMathCellChanged,
    results
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

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import ColumnDelete from "carbon-icons-svelte/lib/ColumnDelete.svelte";
  import IconButton from "./IconButton.svelte";

  export let index: number;
  export let dataTableCell: DataTableCell;

  let result: (Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[] | null) = null;

  let containerDiv: HTMLDivElement;

  export function getMarkdown() {
    return "";
  }

  const dispatch = createEventDispatcher<{
    insertMathCellAfter: {index: number};
    insertInsertCellAfter: {index: number};
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

  function highlightDiv(id: string) {
    const labelElement = document.querySelector(id) as HTMLDivElement | null;
    if (labelElement) {
      labelElement.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(labelElement);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  async function addRow() {
    dataTableCell.addRow();
    $cells[index] = $cells[index];
    await tick();
    highlightDiv(`#data-table-input-${index}-${numRows-1}-0`);
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

  function deleteColumn(colIndex: number) {
    dataTableCell.deleteColumn(colIndex);

    $resultsInvalid = true;
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function handleEnter(row: number) {
    if (row == numRows-1) {
      addRow();
    } else {
      highlightDiv(`#data-table-input-${index}-${row+1}-0`)
    }
  }

  function parseParameterField(latex, column: number, mathField: MathFieldClass) {
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

  $: if ($activeCell === index) {
      focus();
    }

  $: numColumns = dataTableCell.columnData.length;
  $: numRows = dataTableCell.columnData[0].length;

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
  }

  div.item.math-field, div.item.data-field {
    display: flex;
    align-items: center;
  }

  div.item.math-field.calculated {
    padding-inline-start: 0px;
  }

  div.item.data-field.calculated {
    padding-inline-start: 12px;
  }

  div.item.borderless {
    border: none;
  }

  div.row-label {
    align-items: center;
  }

  div.bottom-buttons {
    margin-top: 1px;
  }

  div.delete-columns {
    justify-self: center;
  }

  div.right-buttons {
    margin-left: 1px;
  }

  div.delete-rows {
    align-self: center;
  }

  div.add-row {
    display: flex;
    justify-content: start;
    align-items: flex-start;
  }

  div.item.spread-align-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.right-justify {
    display: flex;
    justify-content: end;
  }

  @media print {
    div.item.spread-align-center {
      display: none;
    }
  }

</style>

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
        style="grid-column: {j + 2}; grid-row: 1;"
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
        style="grid-column: {j + 2}; grid-row: 2;"
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
          {/if}
        {/if}
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
          style="grid-column: {j+2}; grid-row: {i+3};"
        >
          {#if dataTableCell.columnIsOutput[j]}
            {dataTableCell.columnData[j][i]}
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
        style="grid-column: {j + 2}; grid-row: {numRows+3};"
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
        class="right-buttons delete-rows"
        style="grid-column: {numColumns + 2}; grid-row: {i+3};"
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


  <div class="right-buttons" style="grid-column:{numColumns + 2}; grid-row:1">
    <IconButton 
      id={`add-col-${index}`}
      on:click={addColumn}
      title="Add Column"
    > 
      <Add />
    </IconButton>
  </div>

  <div class="bottom-buttons add-row" style="grid-column:1; grid-row:{numRows + 3}">
    <IconButton
      on:click={addRow}
      id={`add-row-${index}`}
      title="Add Row"
    >
      <Add />
    </IconButton>
  </div>

  <div class="item borderless spread-align-center">
    <TooltipIcon direction="left">
      <span slot="tooltipText">Place variable names in this row</span>
      <Information />
    </TooltipIcon>
  </div>

  <div class={`item borderless ${numRows === 1 ? 'right-justify': 'spread-align-center'}`} style="grid-column:1; grid-row:2">    
    <TooltipIcon direction="left">
      <span slot="tooltipText">Place column specific units in this row (optional)</span>
      <Information />
    </TooltipIcon>
  </div>

</div>

