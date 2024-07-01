<script lang="ts">
  import {
    cells,
    activeCell,
    mathCellChanged,
    nonMathCellChanged,
  } from "./stores";

  import { onMount, tick, createEventDispatcher } from "svelte";

  import type DataTableCell from "./cells/DataTableCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";
  import TextBox from "./TextBox.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import ColumnDelete from "carbon-icons-svelte/lib/ColumnDelete.svelte";
  import IconButton from "./IconButton.svelte";

  export let index: number;
  export let dataTableCell: DataTableCell;

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
      const mathElement: HTMLTextAreaElement = document.querySelector(`#grid-cell-${index}-0-0 math-field`);
      if (mathElement) {
        mathElement.focus();
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
    highlightDiv(`#row-label-${index}-${numRows-1}`);
  }

  function addColumn() {
    dataTableCell.addColumn();
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function deleteRow(rowIndex: number) {
    dataTableCell.deleteRow(rowIndex);

    for (let i = 0; i < dataTableCell.columnData.length; i++) {
      dataTableCell.parseColumn(i);
    }

    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function deleteColumn(colIndex: number) {
    dataTableCell.deleteColumn(colIndex);

    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function handleEnter(row: number) {
    if (row == numRows-1) {
      addRow();
    } else {
      highlightDiv(`#row-label-${index}-${row+1}`)
    }
  }

  function parseParameterField(latex, column: number, mathField: MathFieldClass) {
    const startingIdSet = new Set(dataTableCell.columnIds);
    
    dataTableCell.columnIds[column] = null;
    const dataTableInfo = {
      colVars: dataTableCell.columnIds.filter((id) => id !== null),
      cellNum: index,
      colNum: column
    };
    mathField.parseLatex(latex, dataTableInfo);
    if (mathField.statement?.type === "parameter") {
      dataTableCell.columnIds[column] = mathField.statement.name;
      dataTableCell.parseColumn(column);
    } else if (mathField.statement?.type === "assignment") {
      dataTableCell.columnIds[column] = mathField.statement.name;
      dataTableCell.columnStatements[column] = mathField.statement;
    } else {
      dataTableCell.columnStatements[column] = null;
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

    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function parseUnitField(latex: string, column: number, mathField: MathFieldClass) {
    mathField.parseLatex(latex);

    if (dataTableCell.parameterFields[column].statement?.type === "parameter") {
      dataTableCell.parseColumn(column);
    }

    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function parseDataField(column: number) {
    dataTableCell.parseColumn(column);

    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  $: if ($activeCell === index) {
      focus();
    }

  $: numColumns = dataTableCell.columnData.length;
  $: numRows = dataTableCell.columnData[0].length;

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

  div.item.math-field {
    display: flex;
    align-items: center;
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

  input {
    margin: 0px 0px 0px 0px;
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
        {/if}
      </div>
    {/each}
  {/if}

  {#if dataTableCell.parameterUnitFields}
    {#each dataTableCell.parameterUnitFields as mathField, j (mathField.id)}
      <div
        class="item math-field"
        id={`parameter-units-${index}-${j}`}
        style="grid-column: {j + 2}; grid-row: 2;"
      >
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
      </div>
    {/each}
  {/if}


  {#if dataTableCell.columnData}
    {#each Array(numRows) as _, i }
      {#each Array(numColumns) as _, j }
        <div
          class="item math-field"
          id={`grid-cell-${index}-${i}-${j}`}
          style="grid-column: {j+2}; grid-row: {i+3};"
        >
          <input
            bind:value={dataTableCell.columnData[j][i]}
            on:input={() => parseDataField(j)}
          />
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

