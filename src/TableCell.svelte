<script lang="ts">
  import {
    cells,
    activeCell,
    handleFocusIn,
    handleVirtualKeyboard,
    handleFocusOut,
    mathCellChanged
  } from "./stores";

  import type TableCell from "./cells/TableCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import { onMount } from "svelte";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";
  import DocumentationField from "./DocumentationField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";
  import Information16 from "carbon-icons-svelte/lib/Information16";
  import Add16 from "carbon-icons-svelte/lib/Add16";
  import RowDelete16 from "carbon-icons-svelte/lib/RowDelete16";
  import ColumnDelete16 from "carbon-icons-svelte/lib/ColumnDelete16";
  import DocumentAdd16 from "carbon-icons-svelte/lib/DocumentAdd16";
  import DocumentSubtract16 from "carbon-icons-svelte/lib/DocumentSubtract16";
  import ShowDataCards16 from "carbon-icons-svelte/lib/ShowDataCards16";
  import Row16 from "carbon-icons-svelte/lib/Row16";

  export let index: number;
  export let tableCell: TableCell;

  let activeMathInstance = null;

  let hideToolbar = true;

  onMount(() => {
    if (tableCell.rowJsons.length > 0) {
      (tableCell.richTextInstance as any).setContents(tableCell.rowJsons[tableCell.selectedRow]);
    }
  });

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

  function addRow() {
    tableCell.addRow();
    $cells = $cells;
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
  }
  
  // Don't want new lines in row labels since they will be stripped anyway
  function eatEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function parseLatex(latex: string, index: number, column: number, mathField?: MathFieldClass) {
    
    if (mathField !== undefined) {
      mathField.parseLatex(latex, index, column);
    } else {
      tableCell.parseUnitField(latex, index, column);
    }
    
    $mathCellChanged = true;
    $cells = $cells;
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

  div.keyboard-tray {
    display: flex;
    justify-content: space-between;
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
  <div
    on:focusin={() => handleFocusIn(index)}
  >
    <DocumentationField
      hideToolbar={hideToolbar}
      bind:quill={tableCell.richTextInstance}
      on:update={(e) => tableCell.rowJsons[tableCell.selectedRow] = e.detail.json}
    />
  </div>
{/if}

<div
  class="container"
>
  {#if tableCell.parameterFields}
    {#each tableCell.parameterFields as mathField, j (mathField.id)}
      <div
        class="item math-field"
        id={`parameter-name-${index}-${j}`}
        style="grid-column: {j + 2}; grid-row: 1;"
        on:focusin={() => {
          handleFocusIn(index);
          activeMathInstance = mathField.element;
        }}
        on:focusout={() => {
          activeMathInstance = null;
          handleFocusOut(mathField)
        }}
      >
        <MathField
          editable={true}
          on:update={(e) => parseLatex(e.detail.latex, index, j, mathField)}
          parsingError={mathField.parsingError}
          bind:this={mathField.element}
          latex={mathField.latex}
        />
        {#if mathField.parsingError}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {/if}
      </div>

      {#if numColumns > 1 && !hideUnselected}
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
              <ColumnDelete16/>
            </div>
          </button>
        </div>
      {/if}

    {/each}
  {/if}

  {#if tableCell.parameterUnitFields}
    {#each tableCell.parameterUnitFields as mathField, j (mathField.id)}
      <div
        class="item math-field"
        id={`parameter-units-${index}-${j}`}
        style="grid-column: {j + 2}; grid-row: 2;"
        on:focusin={() => {
          activeMathInstance = mathField.element;
          handleFocusIn(index);
        }}
        on:focusout={() => {
          activeMathInstance = null;
          handleFocusOut(mathField);
        }}
      >
        <MathField
          editable={true}
          on:update={(e) => parseLatex(e.detail.latex, index, j)}
          parsingError={mathField.parsingError}
          bind:this={mathField.element}
          latex={mathField.latex}
        />
        
        {#if mathField.parsingError}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {/if}
      </div>
    {/each}
  {/if}


  {#if tableCell.rhsFields}
    {#each tableCell.rhsFields as rowFields, i }
      {#each rowFields as mathField, j (mathField.id)}
        {#if !hideUnselected || i === tableCell.selectedRow}
          <div
            class="item math-field"
            id={`grid-cell-${index}-${i}-${j}`}
            style="grid-column: {j+2}; grid-row: {i+3};"
            on:focusin={() => {
              activeMathInstance = mathField.element;
              handleFocusIn(index);
            }}
            on:focusout={() => {
              activeMathInstance = null;
              handleFocusOut(mathField)
            }}
          >
            <MathField
              editable={true}
              on:update={(e) => parseLatex(e.detail.latex, index, j, mathField)}
              parsingError={mathField.parsingError}
              bind:this={mathField.element}
              latex={mathField.latex}
            />
            {#if mathField.parsingError}
              <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
                <Error16 class="error"/>
              </TooltipIcon>
            {/if}
          </div>
        {/if}
      {/each}
    {/each}
  {/if}

  {#if tableCell.rowLabels}
    {#each tableCell.rowLabels as label, i (label.id)}
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
            class="editable"
            contenteditable="true"
            on:keydown={eatEnter}
            id={`row-label-${index}-${i}`}
            bind:textContent={label.label} 
          >
          </div>
        </div>
      {/if}

      {#if numRows > 1 && !hideUnselected}
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
              <RowDelete16/>
            </div>
          </button>
        </div>
      {/if}
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
          <Add16/>
        </div>
      </button>
    </div>
  {/if}
  <div class={`bottom-buttons ${hideUnselected ? 'right-justify' : 'keyboard-tray'}`} style="grid-column:1; grid-row:{numRows + 3}">
    {#if !hideUnselected}
      <button
        on:click={addRow}
        id={`add-row-${index}`}
        title="Add Row"
      >
        <div class="icon">
          <Add16/>
        </div>
      </button>
    {/if}
    {#if index === $activeCell && activeMathInstance}
      <div class="keyboard">
        <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, activeMathInstance)}/>
      </div>
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
            <DocumentAdd16 />
          </div>    
        </button>
      {:else}
        <button 
          title="Delete All Row Specific Documentation"
          id={`del-row-docs-${index}`}
          on:click={deleteRowDocumentation}
        >
          <div class="icon">
            <DocumentSubtract16 />
          </div>    
        </button>
      {/if}
    {/if}

    <TooltipIcon direction="left">
      <span slot="tooltipText">Place variable names in this row</span>
      <Information16/>
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
            <ShowDataCards16 />
          </div>    
        </button>
      {:else}
        <button 
          title="Hide unselected rows"
          id={`hide-unselected-rows-${index}`}
          on:click={() => tableCell.hideUnselected = true}
        >
          <div class="icon">
            <Row16 />
          </div>    
        </button>
      {/if}
    {/if}
    
    <TooltipIcon direction="left">
      <span slot="tooltipText">Place column specific units in this row (optional)</span>
      <Information16/>
    </TooltipIcon>
  </div>

</div>


