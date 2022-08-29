<script>
  import {
    cells,
    activeCell,
    handleFocusIn,
    parseTableCellParameterLatex,
    parseTableCellParameterUnitLatex,
    parseTableCellRhsLatex,
    handleVirtualKeyboard,
    handleFocusOut,
    mathCellChanged
  } from "./stores.ts";

  import { onMount, tick } from "svelte";
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

  export let index;

  let rhsMathFieldElements = {};
  let parameterMathFieldElements = [];
  let parameterUnitMathFieldElements = [];

  let activeMathInstance = null;

  let indices = [];

  let hideToolbar = true;
  let quill = null;

  onMount(() => {
    if ($cells[index].data.rowJsons.length > 0) {
      quill.setContents($cells[index].data.rowJsons[$cells[index].data.selectedRow]);
    }
  });

  function handleSelectedRowChange() {
    $mathCellChanged = true;
    if ($cells[index].data.rowJsons.length > 0) {
      quill.setContents($cells[index].data.rowJsons[$cells[index].data.selectedRow]);
    }
  }

  function addRowDocumentation() {
    $cells[index].data.rowJsons = Array(numRows).fill('');
  }

  function deleteRowDocumentation() {
    $cells[index].data.rowJsons = [];
  }

  function addRow() {
    const newRowId = $cells[index].data.nextRowLabelId++;
    $cells[index].data.rowIds = [...$cells[index].data.rowIds, newRowId];
    $cells[index].data.rowLabels = [...$cells[index].data.rowLabels, `Option ${newRowId}`];
    
    if ($cells[index].data.rowJsons.length > 0) {
      $cells[index].data.rowJsons = [...$cells[index].data.rowJsons, ''];
    }

    $cells[index].data.rhsIds = [...$cells[index].data.rhsIds, $cells[index].data.parameterIds.map(parameterId => `${newRowId},${parameterId}`)];
    $cells[index].data.rhsLatexs = [...$cells[index].data.rhsLatexs, Array(numColumns).fill('')];

    $cells[index].extra.rhsParsingErrors = [...$cells[index].extra.rhsParsingErrors, Array(numColumns).fill(false)];
    $cells[index].extra.rhsParsingErrorMessages = [...$cells[index].extra.rhsParsingErrorMessages, Array(numColumns).fill("")];
    $cells[index].extra.rhsStatements = [...$cells[index].extra.rhsStatements, Array(numColumns).fill(null)];
    $cells[index].extra.rhsPendingNewLatexs = [...$cells[index].extra.rhsPendingNewLatexs, Array(numColumns).fill(false)];
    $cells[index].extra.rhsNewLatexs = [...$cells[index].extra.rhsNewLatexs, Array(numColumns).fill("")];

    $mathCellChanged = true;
  }

  async function addColumn() {
    const newVarId = $cells[index].data.nextParameterId++;
    $cells[index].data.parameterIds = [...$cells[index].data.parameterIds, newVarId];

    $cells[index].data.parameterUnitLatexs = [...$cells[index].data.parameterUnitLatexs, ''];
    const newVarName = `Var${newVarId}`;
    $cells[index].data.parameterLatexs = [...$cells[index].data.parameterLatexs, newVarName];

    $cells[index].data.rhsIds = $cells[index].data.rhsIds.map( (row, i) => [...row, `${$cells[index].data.rowIds[i]},${newVarId}`]);
    $cells[index].data.rhsLatexs = $cells[index].data.rhsLatexs.map( row => [...row, ""]);

    $cells[index].extra.rhsParsingErrors = $cells[index].extra.rhsParsingErrors.map( row => [...row, false]);
    $cells[index].extra.rhsParsingErrorMessages = $cells[index].extra.rhsParsingErrorMessages.map( row => [...row, ""]);
    $cells[index].extra.rhsStatements = $cells[index].extra.rhsStatements.map( row => [...row, null]);
    $cells[index].extra.rhsPendingNewLatexs = $cells[index].extra.rhsPendingNewLatexs.map( row => [...row, false]);
    $cells[index].extra.rhsNewLatexs = $cells[index].extra.rhsNewLatexs.map( row => [...row, false]);

    // provide a chance for the mathFieldElements to populate before adding the new parameter name
    await tick();

    $cells[index].extra.parameterMathFieldElements[numColumns-1].setLatex(newVarName);
  }

  function deleteRow(rowIndex) {
    $cells[index].data.rowIds = [...$cells[index].data.rowIds.slice(0,rowIndex), 
                                 ...$cells[index].data.rowIds.slice(rowIndex+1)];

    $cells[index].data.rowLabels = [...$cells[index].data.rowLabels.slice(0,rowIndex),
                                    ...$cells[index].data.rowLabels.slice(rowIndex+1)];

    if ($cells[index].data.rowJsons.length > 0) {
      $cells[index].data.rowJsons = [...$cells[index].data.rowJsons.slice(0,rowIndex),
                                      ...$cells[index].data.rowJsons.slice(rowIndex+1)];
    }
    
    $cells[index].data.rhsIds = [...$cells[index].data.rhsIds.slice(0,rowIndex), 
                                 ...$cells[index].data.rhsIds.slice(rowIndex+1)];
    $cells[index].data.rhsLatexs = [...$cells[index].data.rhsLatexs.slice(0,rowIndex), 
                                    ...$cells[index].data.rhsLatexs.slice(rowIndex+1)];
    
    $cells[index].extra.rhsParsingErrors = [...$cells[index].extra.rhsParsingErrors.slice(0,rowIndex),
                                            ...$cells[index].extra.rhsParsingErrors.slice(rowIndex+1)];
    $cells[index].extra.rhsParsingErrorMessages = [...$cells[index].extra.rhsParsingErrorMessages.slice(0,rowIndex), 
                                                   ...$cells[index].extra.rhsParsingErrorMessages.slice(rowIndex+1)];
    $cells[index].extra.rhsStatements = [...$cells[index].extra.rhsStatements.slice(0,rowIndex),
                                         ...$cells[index].extra.rhsStatements.slice(rowIndex+1)];
    $cells[index].extra.rhsPendingNewLatexs = [...$cells[index].extra.rhsPendingNewLatexs.slice(0,rowIndex), 
                                               ...$cells[index].extra.rhsPendingNewLatexs.slice(rowIndex+1)];
    $cells[index].extra.rhsNewLatexs = [...$cells[index].extra.rhsNewLatexs.slice(0,rowIndex),
                                        ...$cells[index].extra.rhsNewLatexs.slice(rowIndex+1)];

    if ($cells[index].data.selectedRow === rowIndex) {
      if ($cells[index].data.selectedRow !== 0) {
        $cells[index].data.selectedRow -= 1;
        handleSelectedRowChange();
      }
    }

    $mathCellChanged = true;
  }

  function deleteColumn(colIndex) {
    $cells[index].data.parameterIds = [...$cells[index].data.parameterIds.slice(0,colIndex), 
                                       ...$cells[index].data.parameterIds.slice(colIndex+1)];

    $cells[index].data.parameterUnitLatexs = [...$cells[index].data.parameterUnitLatexs.slice(0,colIndex),
                                              ...$cells[index].data.parameterUnitLatexs.slice(colIndex+1)];

    $cells[index].data.parameterLatexs = [...$cells[index].data.parameterLatexs.slice(0,colIndex),
                                          ...$cells[index].data.parameterLatexs.slice(colIndex+1)];

    $cells[index].data.rhsIds = $cells[index].data.rhsIds.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)] );
    $cells[index].data.rhsLatexs = $cells[index].data.rhsLatexs.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);

    $cells[index].extra.rhsParsingErrors = $cells[index].extra.rhsParsingErrors.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);
    $cells[index].extra.rhsParsingErrorMessages = $cells[index].extra.rhsParsingErrorMessages.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);
    $cells[index].extra.rhsStatements = $cells[index].extra.rhsStatements.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);
    $cells[index].extra.rhsPendingNewLatexs = $cells[index].extra.rhsPendingNewLatexs.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);
    $cells[index].extra.rhsNewLatexs = $cells[index].extra.rhsNewLatexs.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);

    $mathCellChanged = true;
  }
  
  
  // Don't want new lines in row labels since they will be stripped anyway
  function eatEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  $: numColumns = $cells[index].data.parameterLatexs.length;
  $: numRows = $cells[index].data.rowLabels.length;
  $: hideUnselected = $cells[index].data.hideUnselected;
  $: if (numColumns && numColumns) {
    indices = [];
    for (let i = 0; i< numRows; i++) {
      for (let j = 0; j < numColumns; j++){
        indices[i*numColumns + j] = {i: i, j: j};
      }
    }
  }

  $: hideToolbar = $activeCell !== index;

  $: $cells[index].extra.rhsMathFieldElements = rhsMathFieldElements;
  $: $cells[index].extra.parameterMathFieldElements = parameterMathFieldElements;
  $: $cells[index].extra.parameterUnitMathFieldElements = parameterUnitMathFieldElements;

  $: $cells[index].extra.richTextInstance = quill;
  
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

  div.spread-align-center {
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

{#if $cells[index].data.rowJsons.length > 0}
  <div
    on:focusin={() => handleFocusIn(index)}
    on:focusout={() => handleFocusOut(index)}
  >
    <DocumentationField
      hideToolbar={hideToolbar}
      bind:quill
      on:update={(e) => $cells[index].data.rowJsons[$cells[index].data.selectedRow] = e.detail.json}
    />
  </div>
{/if}

<div
  class="container"
>
  {#if $cells[index].data.parameterLatexs}
    {#each $cells[index].data.parameterLatexs as _, j ($cells[index].data.parameterIds[j])}
      <div
        class="item math-field"
        id={`parameter-name-${index}-${j}`}
        style="grid-column: {j + 2}; grid-row: 1;"
        on:focusin={() => {
          handleFocusIn(index);
          activeMathInstance = $cells[index].extra.parameterMathFieldElements[j];
        }}
        on:focusout={() => {
          activeMathInstance = null;
          handleFocusOut(index)
        }}
      >
        <MathField
          editable={true}
          on:update={(e) => parseTableCellParameterLatex(e.detail.latex, index, j)}
          parsingError={$cells[index].extra.parameterParsingErrors[j]}
          bind:this={parameterMathFieldElements[j]}
          latex={$cells[index].data.parameterLatexs[j]}
        />
        {#if $cells[index].extra.parameterParsingErrors[j]}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{$cells[index].extra.parameterParsingErrorMessages[j]}</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {/if}
      </div>

      <div
        class="item math-field"
        id={`parameter-units-${index}-${j}`}
        style="grid-column: {j + 2}; grid-row: 2;"
        on:focusin={() => {
          activeMathInstance = $cells[index].extra.parameterUnitMathFieldElements[j];
          handleFocusIn(index);
        }}
        on:focusout={() => {
          activeMathInstance = null;
          handleFocusOut(index)
        }}
      >
      <MathField
        editable={true}
        on:update={(e) => parseTableCellParameterUnitLatex(e.detail.latex, index, j)}
        parsingError={$cells[index].extra.parameterUnitParsingErrors[j]}
        bind:this={parameterUnitMathFieldElements[j]}
        latex={$cells[index].data.parameterUnitLatexs[j]}
      />
      
      {#if $cells[index].extra.parameterUnitParsingErrors[j]}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{$cells[index].extra.parameterUnitParsingErrorMessages[j]}</span>
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


  {#if $cells[index].data.rhsLatexs}
    {#each indices as {i, j} ($cells[index].data.rhsIds[i][j])}
      {#if !hideUnselected || i === $cells[index].data.selectedRow}
        <div
          class="item math-field"
          id={`grid-cell-${index}-${i}-${j}`}
          style="grid-column: {j+2}; grid-row: {i+3};"
          on:focusin={() => {
            activeMathInstance = rhsMathFieldElements[`${i},${j}`];
            handleFocusIn(index);
          }}
          on:focusout={() => {
            activeMathInstance = null;
            handleFocusOut(index)
          }}
        >
          <MathField
            editable={true}
            on:update={(e) => parseTableCellRhsLatex(e.detail.latex, index, i, j)}
            parsingError={$cells[index].extra.rhsParsingErrors[i][j]}
            bind:this={rhsMathFieldElements[`${i},${j}`]}
            latex={$cells[index].data.rhsLatexs[i][j]}
          />
          {#if $cells[index].extra.rhsParsingErrors[i][j]}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{$cells[index].extra.rhsParsingErrorMessages[i][j]}</span>
              <Error16 class="error"/>
            </TooltipIcon>
          {/if}
        </div>
      {/if}
    {/each}
  {/if}

  {#if $cells[index].data.rowLabels}
    {#each $cells[index].data.rowLabels as label, i ($cells[index].data.rowIds[i])}
      {#if !hideUnselected || i === $cells[index].data.selectedRow}
        <div
          class="item row-label"
          style="grid-column: 1; grid-row: {i+3};"
        >
          <input 
            type="radio"
            id={`row-radio-${index}-${i}`}
            name={`selected_row_${index}`}
            bind:group={$cells[index].data.selectedRow}
            value={i}
            on:change={handleSelectedRowChange}
          >
          <div
            class="editable"
            contenteditable="true"
            on:keydown={eatEnter}
            id={`row-label-${index}-${i}`}
            bind:textContent={$cells[index].data.rowLabels[i]} 
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
      {#if $cells[index].data.rowJsons.length === 0}
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
          on:click={() => $cells[index].data.hideUnselected = false}
        >
          <div class="icon">
            <ShowDataCards16 />
          </div>    
        </button>
      {:else}
        <button 
          title="Hide unselected rows"
          id={`hide-unselected-rows-${index}`}
          on:click={() => $cells[index].data.hideUnselected = true}
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


