<script lang="ts">
  import {
    cells,
    activeCell,
    mathCellChanged,
    nonMathCellChanged,
  } from "./stores";

  import { onMount, tick, createEventDispatcher } from "svelte";

  import type TableCell from "./cells/TableCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";
  import TextBox from "./TextBox.svelte";
  import DocumentationField from "./DocumentationField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import ColumnDelete from "carbon-icons-svelte/lib/ColumnDelete.svelte";
  import AddComment from "carbon-icons-svelte/lib/AddComment.svelte";
  import ChatOff from "carbon-icons-svelte/lib/ChatOff.svelte";
  import ShowDataCards from "carbon-icons-svelte/lib/ShowDataCards.svelte";
  import Row from "carbon-icons-svelte/lib/Row.svelte";
  import IconButton from "./IconButton.svelte";

  import { deltaToMarkdown } from "quill-delta-to-markdown";

  export let index: number;
  export let tableCell: TableCell;

  let containerDiv: HTMLDivElement;
  let hideToolbar = true;

  export function getMarkdown() {
    const row = tableCell.selectedRow;
    let result = "";

    if (tableCell.rowJsons.length > 0) {
      result += deltaToMarkdown((tableCell.rowJsons[row] as any)?.ops ?? "") + "\n";
    }

    const columnExpressions = [];

    for (const [col, parameter] of tableCell.parameterFields.entries()) {
      if (tableCell.rhsFields[row][col].latex.replaceAll(/\\:?/g,'').trim() !== "") {
        columnExpressions.push(`${parameter.latex} & = \\quad ${tableCell.rhsFields[row][col].latex} ${tableCell.parameterUnitFields[col].latex}`);
      }
    }

    if (columnExpressions.length > 0) {
      result += `$$ \\text{${tableCell.rowLabels[row].label}} \\quad `;

      if (columnExpressions.length > 1) {
        result += ` \\begin{cases} `;

        for (const [col, expression] of columnExpressions.entries()) {
          result += expression;
          if (col < columnExpressions.length - 1) {
            result += " \\\\ ";
          }
        }
        result += " \\end{cases}";
      } else {
        result += columnExpressions[0].replace('& = \\quad', '=');
      }
      
      result += " $$ \n\n";
    }

    return result;
  }

  const dispatch = createEventDispatcher<{
    insertMathCellAfter: {index: number};
    insertInsertCellAfter: {index: number};
  }>();

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
      const mathElement: HTMLTextAreaElement = document.querySelector(`#grid-cell-${index}-0-0 math-field`);
      if (mathElement) {
        mathElement.focus();
      }
    }
  }


  function handleSelectedRowChange() {
    $mathCellChanged = true;
    tableCell.parseTableStatements();
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
    } else {
      tableCell.parseTableStatements();
    }
    
    $mathCellChanged = true;
    $cells = $cells;
  }

  function deleteColumn(colIndex: number) {
    tableCell.deleteColumn(colIndex);
    tableCell.parseTableStatements();
    $mathCellChanged = true;
    $cells = $cells;
  }
  

  function handleEnter(row: number) {
    if (!hideUnselected) {
      if (row == numRows-1) {
        addRow();
      } else {
        highlightDiv(`#row-label-${index}-${row+1}`)
      }
    }
  }


  function parseLatex(latex: string, column: number, mathField?: MathFieldClass) {
    
    if (mathField !== undefined) {
      mathField.parseLatex(latex);
    } else {
      tableCell.parseUnitField(latex, column);
    }
    
    tableCell.parseTableStatements();

    $mathCellChanged = true;
    $cells[index] = $cells[index];
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
    div.item.spread-align-center, div.right-buttons, div.bottom-buttons {
      display: none;
    }
  }

</style>

{#if tableCell.rowJsons.length > 0}
  <div
    spellcheck={$activeCell === index}
  >
    <DocumentationField
      hideToolbar={hideToolbar}
      bind:quill={tableCell.richTextInstance}
      on:update={(e) => {
         tableCell.rowJsons[tableCell.selectedRow] = e.detail.json;
         $nonMathCellChanged = true;
      }}
      on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
      on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
    />
  </div>
{/if}

<div
  class="container"
  bind:this= {containerDiv}
  spellcheck={$activeCell === index}
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
          on:update={(e) => parseLatex(e.detail.latex, j, mathField)}
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

  {#if tableCell.parameterUnitFields}
    {#each tableCell.parameterUnitFields as mathField, j (mathField.id)}
      <div
        class="item math-field"
        id={`parameter-units-${index}-${j}`}
        style="grid-column: {j + 2}; grid-row: 2;"
      >
        <MathField
          editable={true}
          on:update={(e) => parseLatex(e.detail.latex, j)}
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
              <TextBox
                on:enter={() => handleEnter(i)}
                on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
                on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
                id={`row-label-${index}-${i}`}
                bind:textContent={tableCell.rowLabels[i].label} 
                on:input={() => $nonMathCellChanged=true}
              >
              </TextBox>
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
          >
            <MathField
              editable={true}
              on:update={(e) => parseLatex(e.detail.latex, j, mathField)}
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

  {#if numRows > 1 && !hideUnselected}
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


  {#if !hideUnselected}
    <div class="right-buttons" style="grid-column:{numColumns + 2}; grid-row:1">
      <IconButton 
        id={`add-col-${index}`}
        on:click={addColumn}
        title="Add Column"
      > 
        <Add />
      </IconButton>
    </div>
  {/if}
  <div class="bottom-buttons add-row" style="grid-column:1; grid-row:{numRows + 3}">
    {#if !hideUnselected}
      <IconButton
        on:click={addRow}
        id={`add-row-${index}`}
        title="Add Row"
      >
        <Add />
      </IconButton>
    {/if}
  </div>

  <div class={`item borderless ${hideUnselected ? 'right-justify': 'spread-align-center'}`}>
    {#if !hideUnselected}
      {#if tableCell.rowJsons.length === 0}
        <IconButton
          title="Add Row Specific Documentation"
          id={`add-row-docs-${index}`}
          on:click={addRowDocumentation}
        >
          <AddComment />
        </IconButton>
      {:else}
        <IconButton
          title="Delete All Row Specific Documentation"
          id={`del-row-docs-${index}`}
          on:click={deleteRowDocumentation}
        >
          <ChatOff />
        </IconButton>
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
        <IconButton
          title="Show all rows"
          id={`show-all-rows-${index}`}
          on:click={() => tableCell.hideUnselected = false}
        >
          <ShowDataCards />
        </IconButton>
      {:else}
        <IconButton
          title="Hide unselected rows"
          id={`hide-unselected-rows-${index}`}
          on:click={() => tableCell.hideUnselected = true}
        >
          <Row />
        </IconButton>
      {/if}
    {/if}
    
    <TooltipIcon direction="left">
      <span slot="tooltipText">Place column specific units in this row (optional)</span>
      <Information />
    </TooltipIcon>
  </div>

</div>

