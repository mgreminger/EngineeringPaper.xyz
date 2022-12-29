<script lang="ts">
  import {
    cells,
    activeCell,
    mathCellChanged,
    nonMathCellChanged,
    modifierKey
  } from "./stores";

  import { onMount, tick } from "svelte";

  import type TableCell from "./cells/TableCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";
  import DocumentationField from "./DocumentationField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import ColumnDelete from "carbon-icons-svelte/lib/ColumnDelete.svelte";
  import DocumentAdd from "carbon-icons-svelte/lib/DocumentAdd.svelte";
  import DocumentSubtract from "carbon-icons-svelte/lib/DocumentSubtract.svelte";
  import ShowDataCards from "carbon-icons-svelte/lib/ShowDataCards.svelte";
  import Row from "carbon-icons-svelte/lib/Row.svelte";

  export let index: number;
  export let tableCell: TableCell;

  let containerDiv: HTMLDivElement;

  let hideToolbar = true;


  onMount(() => {
    if (tableCell.rowJsons.length > 0) {
      (tableCell.richTextInstance as any).setContents(tableCell.rowJsons[tableCell.selectedRow]);
    }

    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if ( containerDiv && containerDiv.parentElement &&
         !containerDiv.parentElement.contains(document.activeElement) ) {
      const mathElement: HTMLTextAreaElement = document.querySelector(`#grid-cell-${index}-0-0 textarea`);
      if (mathElement) {
        mathElement.focus();
      }
    }
  }


  function handleSelectedRowChange() {
    $mathCellChanged = true;
    if (tableCell.rowJsons.length > 0) {
      (tableCell.richTextInstance as any).setContents(tableCell.rowJsons[tableCell.selectedRow]);
    }
  }

  function addRowDocumentation() {
    tableCell.addRowDocumentation()
    $cells = $cells;
  }

  function deleteRowDocumentation() {
    tableCell.deleteRowDocumentation()
    $cells = $cells;
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
    tableCell.addRow();
    $cells = $cells;
    await tick();
    highlightDiv(`#row-label-${index}-${numRows-1}`);
  }

  function addColumn() {
    tableCell.addColumn();
    $mathCellChanged = true;
    $cells = $cells;
  }

  function deleteRow(rowIndex: number) {
    if (tableCell.deleteRow(rowIndex)) {
      handleSelectedRowChange();
    }
    $mathCellChanged = true;
    $cells = $cells;
  }

  function deleteColumn(colIndex: number) {
    tableCell.deleteColumn(colIndex);
    $mathCellChanged = true;
    $cells = $cells;
  }
  

  function handleKeyboardShortcuts(event: KeyboardEvent, row: number) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "Enter":
        if (event.shiftKey || event[$modifierKey]) {
          return;
        }
        if (!hideUnselected) {
          if (row == numRows-1) {
            addRow();
          } else {
            highlightDiv(`#row-label-${index}-${row+1}`)
          }
        }
        break;
      default:
        return;
    }

    event.preventDefault();
  }


  function parseLatex(latex: string, index: number, column: number, mathField?: MathFieldClass) {
    
    if (mathField !== undefined) {
      mathField.parseLatex(latex, column);
    } else {
      tableCell.parseUnitField(latex, index, column);
    }
    
    $mathCellChanged = true;
    $cells = $cells;
  }

  $: if ($activeCell === index) {
      focus();
    }

  $: numColumns = tableCell.parameterFields.length;
  $: numRows = tableCell.rowLabels.length;
  $: hideUnselected = tableCell.hideUnselected;

  $: hideToolbar = $activeCell !== index;
  
</script>


<style>
  button {
    background: none;
    border: none;
    border-radius: 50%;
    position: relative;
    width: 20px;
    height: 20px;
  }

  button:hover {
    background: gainsboro;
  }

  div.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 16px;
    width: 16px;
  }

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

  @media print {
    div.item.spread-align-center {
      display: none;
    }

    div.editable {
      border: none;
    }
  }

  div.right-justify {
    display: flex;
    justify-content: end;
  }

  input, div.editable {
    margin-bottom: 0px;
  }

  div.editable {
    margin-left: 7px;
    min-width: 12rem;
    width: fit-content;
    border-color: gray;
    border-radius: 0px;
  }

</style>

{#if tableCell.rowJsons.length > 0}
  <div>
    <DocumentationField
      hideToolbar={hideToolbar}
      bind:quill={tableCell.richTextInstance}
      on:update={(e) => {
         tableCell.rowJsons[tableCell.selectedRow] = e.detail.json;
         $nonMathCellChanged = true;
      }}
    />
  </div>
{/if}

<div
  class="container"
  bind:this= {containerDiv}
>
  {#if tableCell.parameterFields}
    {#each tableCell.parameterFields as mathField, j (mathField.id)}
      <div
        class="item math-field"
        id={`parameter-name-${index}-${j}`}
        style="grid-column: {j + 2}; grid-row: 1;"
      >
        <MathField
          editable={true}
          on:update={(e) => parseLatex(e.detail.latex, index, j, mathField)}
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

  {#if tableCell.parameterUnitFields}
    {#each tableCell.parameterUnitFields as mathField, j (mathField.id)}
      <div
        class="item math-field"
        id={`parameter-units-${index}-${j}`}
        style="grid-column: {j + 2}; grid-row: 2;"
      >
        <MathField
          editable={true}
          on:update={(e) => parseLatex(e.detail.latex, index, j)}
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


  {#if tableCell.rhsFields}
    {#each tableCell.rhsFields as rowFields, i }

      {#if tableCell.rowLabels}
        {#if tableCell.rowLabels[i]}
          {#if !hideUnselected || i === tableCell.selectedRow}
            <div
              class="item row-label"
              style="grid-column: 1; grid-row: {i+3};"
            >
              <input 
                type="radio"
                id={`row-radio-${index}-${i}`}
                name={`selected_row_${index}`}
                bind:group={tableCell.selectedRow}
                value={i}
                on:change={handleSelectedRowChange}
              >
              <div
                class={`editable table-row-label-field-${index}`}
                contenteditable="true"
                on:keydown={(e) => handleKeyboardShortcuts(e, i)}
                id={`row-label-${index}-${i}`}
                bind:textContent={tableCell.rowLabels[i].label} 
                on:input={() => $nonMathCellChanged=true}
              >
              </div>
            </div>
          {/if}
        {/if}
      {/if}

      {#each rowFields as mathField, j (mathField.id)}
        {#if !hideUnselected || i === tableCell.selectedRow}
          <div
            class="item math-field"
            id={`grid-cell-${index}-${i}-${j}`}
            style="grid-column: {j+2}; grid-row: {i+3};"
            on:keydown={(e) => handleKeyboardShortcuts(e, i)}
          >
            <MathField
              editable={true}
              on:update={(e) => parseLatex(e.detail.latex, index, j, mathField)}
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
        {/if}
      {/each}
    {/each}
  {/if}


  {#if numColumns > 1 && !hideUnselected}
    {#each Array(numColumns) as _, j}
      <div 
        class="bottom-buttons delete-columns"
        style="grid-column: {j + 2}; grid-row: {numRows+3};"
      >
        <button
          on:click={() => deleteColumn(j)}
          title="Delete Column"
          id={`delete-col-${index}-${j}`}
        >
          <div class="icon">
            <ColumnDelete />
          </div>
        </button>
      </div>
    {/each}
  {/if}

  {#if numRows > 1 && !hideUnselected}
    {#each Array(numRows) as _, i}
      <div 
        class="right-buttons delete-rows"
        style="grid-column: {numColumns + 2}; grid-row: {i+3};"
      >
        <button
          on:click={() => deleteRow(i)}
          title="Delete Row"
          id={`delete-row-${index}-${i}`}
        >
          <div class="icon">
            <RowDelete />
          </div>
        </button>
      </div>
    {/each}
  {/if}


  {#if !hideUnselected}
    <div class="right-buttons" style="grid-column:{numColumns + 2}; grid-row:1">
      <button 
        id={`add-col-${index}`}
        on:click={addColumn}
        title="Add Column"
      > 
        <div class="icon">
          <Add />
        </div>
      </button>
    </div>
  {/if}
  <div class="bottom-buttons add-row" style="grid-column:1; grid-row:{numRows + 3}">
    {#if !hideUnselected}
      <button
        on:click={addRow}
        id={`add-row-${index}`}
        title="Add Row"
      >
        <div class="icon">
          <Add />
        </div>
      </button>
    {/if}
  </div>

  <div class={`item borderless ${hideUnselected ? 'right-justify': 'spread-align-center'}`}>
    {#if !hideUnselected}
      {#if tableCell.rowJsons.length === 0}
        <button 
          title="Add Row Specific Documentation"
          id={`add-row-docs-${index}`}
          on:click={addRowDocumentation}
        >
          <div class="icon">
            <DocumentAdd />
          </div>    
        </button>
      {:else}
        <button 
          title="Delete All Row Specific Documentation"
          id={`del-row-docs-${index}`}
          on:click={deleteRowDocumentation}
        >
          <div class="icon">
            <DocumentSubtract />
          </div>    
        </button>
      {/if}
    {/if}

    <TooltipIcon direction="left">
      <span slot="tooltipText">Place variable names in this row</span>
      <Information />
    </TooltipIcon>
  </div>

  <div class={`item borderless ${numRows === 1 ? 'right-justify': 'spread-align-center'}`} style="grid-column:1; grid-row:2">
    {#if numRows > 1}
      {#if hideUnselected}
        <button 
          title="Show all rows"
          id={`show-all-rows-${index}`}
          on:click={() => tableCell.hideUnselected = false}
        >
          <div class="icon">
            <ShowDataCards />
          </div>    
        </button>
      {:else}
        <button 
          title="Hide unselected rows"
          id={`hide-unselected-rows-${index}`}
          on:click={() => tableCell.hideUnselected = true}
        >
          <div class="icon">
            <Row />
          </div>    
        </button>
      {/if}
    {/if}
    
    <TooltipIcon direction="left">
      <span slot="tooltipText">Place column specific units in this row (optional)</span>
      <Information />
    </TooltipIcon>
  </div>

</div>

