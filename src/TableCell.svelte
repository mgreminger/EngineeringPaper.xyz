<script>
  import {
    cells,
    results,
    activeCell,
    handleFocusIn,
    parseTableCellParameterLatex,
    parseTableCellParameterUnitLatex,
    parseTableCellRhsLatex,
    handleVirtualKeyboard,
    handleFocusOut,
    mathCellChanged
  } from "./stores.js";

  import { onMount, tick } from "svelte";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";

  export let index;

  let parameterMathFieldInstances = [];
  let parameterUnitMathFieldInstances = [];
  let rhsMathFieldInstances = [];

  let activeMathInstance = null;

  let indices = [];

  onMount(() => {
    if ($cells[index].data.parameterLatexs) {
      $cells[index].data.parameterLatexs.forEach((latex,i) => {
        parameterMathFieldInstances[i].setLatex(latex);
      });
    }
    if ($cells[index].data.rhsLatexs) {
      for (const [rowIndex, row] of $cells[index].data.rhsLatexs.entries()) {
        for (const [colIndex, latex] of row.entries()) {
          rhsMathFieldInstances[rowIndex*$cells[index].data.parameterLatexs.length + colIndex].setLatex(latex);
        }
      }
    }
    if ($cells[index].data.parameterUnitLatexs) {
      $cells[index].data.parameterUnitLatexs.forEach((latex,i) => {
        parameterUnitMathFieldInstances[i].setLatex(latex);
      });
    }
  });

  function addRow() {
    const newRowId = $cells[index].data.nextRowLabelIndex++;
    $cells[index].data.rowIds = [...$cells[index].data.rowIds, newRowId];
    $cells[index].data.rowLabels = [...$cells[index].data.rowLabels, `Option ${newRowId}`];
    
    $cells[index].data.rhsIds = [...$cells[index].data.rhsIds, $cells[index].data.parameterIds.map(parameterId => `${newRowId},${parameterId}`)];
    $cells[index].data.rhsLatexs = [...$cells[index].data.rhsLatexs, Array(numColumns).fill('')];
    
    $cells[index].extra.rhsParsingErrors = [...$cells[index].extra.rhsParsingErrors, Array(numColumns).fill(false)];
    $cells[index].extra.rhsParsingErrorMessages = [...$cells[index].extra.rhsParsingErrorMessages, Array(numColumns).fill("")];
    $cells[index].extra.rhsStatements = [...$cells[index].extra.rhsStatements, Array(numColumns).fill(null)];
    $cells[index].extra.rhsMathFieldInstances = Array(numColumns*(numRows+1)).fill(null);
    $cells[index].extra.rhsPendingNewLatexs = [...$cells[index].extra.rhsPendingNewLatexs, Array(numColumns).fill(false)];
    $cells[index].extra.rhsNewLatexs = [...$cells[index].extra.rhsNewLatexs, Array(numColumns).fill("")];

    $mathCellChanged = true;
  }

  async function addColumn() {
    const newVarId = $cells[index].data.nextParameterIndex++;
    $cells[index].data.parameterIds = [...$cells[index].data.parameterIds, newVarId];

    $cells[index].data.parameterUnitLatexs = [...$cells[index].data.parameterUnitLatexs, ''];
    const newVarName = `Var${newVarId}`;
    $cells[index].data.parameterLatexs = [...$cells[index].data.parameterLatexs, newVarName];

    $cells[index].data.rhsIds = $cells[index].data.rhsIds.map( (row, i) => [...row, `${$cells[index].data.rowIds[i]},${newVarId}`]);
    $cells[index].data.rhsLatexs = $cells[index].data.rhsLatexs.map( row => [...row, ""]);

    $cells[index].extra.rhsParsingErrors = $cells[index].extra.rhsParsingErrors.map( row => [...row, false]);
    $cells[index].extra.rhsParsingErrorMessages = $cells[index].extra.rhsParsingErrorMessages.map( row => [...row, ""]);
    $cells[index].extra.rhsStatements = $cells[index].extra.rhsStatements.map( row => [...row, null]);
    $cells[index].extra.rhsMathFieldInstances = Array((numColumns+1)*numRows).fill(null);
    $cells[index].extra.rhsPendingNewLatexs = $cells[index].extra.rhsPendingNewLatexs.map( row => [...row, false]);
    $cells[index].extra.rhsNewLatexs = $cells[index].extra.rhsNewLatexs.map( row => [...row, false]);

    // provide a chance for the mathFieldInstances to populate before adding the new parameter name
    await tick();

    $cells[index].extra.parameterMathFieldInstances[numColumns-1].setLatex(newVarName);
  }

  function deleteRow(rowIndex) {
    $cells[index].data.rowIds = [...$cells[index].data.rowIds.slice(0,rowIndex), 
                                 ...$cells[index].data.rowIds.slice(rowIndex+1)];

    $cells[index].data.rowLabels = [...$cells[index].data.rowLabels.slice(0,rowIndex),
                                    ...$cells[index].data.rowLabels.slice(rowIndex+1)];
    
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
    $cells[index].extra.rhsMathFieldInstances = Array(numColumns*(numRows-1)).fill(null);
    $cells[index].extra.rhsPendingNewLatexs = [...$cells[index].extra.rhsPendingNewLatexs.slice(0,rowIndex), 
                                               ...$cells[index].extra.rhsPendingNewLatexs.slice(rowIndex+1)];
    $cells[index].extra.rhsNewLatexs = [...$cells[index].extra.rhsNewLatexs.slice(0,rowIndex),
                                        ...$cells[index].extra.rhsNewLatexs.slice(rowIndex+1)];

    if ($cells[index].data.selectedRow === rowIndex) {
      if ($cells[index].data.selectedRow !== 0) {
        $cells[index].data.selectedRow -= 1;
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
    $cells[index].extra.rhsMathFieldInstances = Array((numColumns-1)*numRows).fill(null);
    $cells[index].extra.rhsPendingNewLatexs = $cells[index].extra.rhsPendingNewLatexs.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);
    $cells[index].extra.rhsNewLatexs = $cells[index].extra.rhsNewLatexs.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);

    $mathCellChanged = true;
  }

  $: numColumns = $cells[index].data.parameterLatexs.length;
  $: numRows = $cells[index].data.rowLabels.length;
  $: if (numColumns && numColumns) {
    indices = [];
    for (let i = 0; i< numRows; i++) {
      for (let j = 0; j < numColumns; j++){
        indices[i*numColumns + j] = {i: i, j: j};
      }
    }
  }

  $: $cells[index].extra.rhsMathFieldInstances = rhsMathFieldInstances;
  $: $cells[index].extra.parameterMathFieldInstances = parameterMathFieldInstances;
  $: $cells[index].extra.parameterUnitMathFieldInstances = parameterUnitMathFieldInstances;
  
</script>


<style>
  button:hover {
    background-color: #ddd;
  }

  div.container {
    display: grid;
  }

  div.item {
    border: solid 1px;
    margin: 0 -1px -1px 0;
    display: flex;
    justify-content: left;
  }

  div.bottom-buttons {
    margin-top: 1px;
  }

  div.right-buttons {
    margin-left: 1px;
  }

  div.keyboard-tray {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

</style>

<div
  class="container"
  on:focusin={() => handleFocusIn(index)}
  on:focusout={() => handleFocusOut(index)}
>
  {#if $cells[index].data.parameterLatexs}
    {#each $cells[index].data.parameterLatexs as _, j ($cells[index].data.parameterIds[j])}
      <div
        class="item math-field"
        on:focusin={() => (activeMathInstance = $cells[index].extra.parameterMathFieldInstances[j])}
        style="grid-column: {j + 2}; grid-row: 1;"
      >
      <MathField
        editable={true}
        on:update={(e) => parseTableCellParameterLatex(e.detail.latex, index, j)}
        parsingError={$cells[index].extra.parameterParsingErrors[j]}
        bind:this={parameterMathFieldInstances[j]}
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
        on:focusin={() => (activeMathInstance = $cells[index].extra.parameterUnitMathFieldInstances[j])}
        style="grid-column: {j + 2}; grid-row: 2;"
      >
      <MathField
        editable={true}
        on:update={(e) => parseTableCellParameterUnitLatex(e.detail.latex, index, j)}
        parsingError={$cells[index].extra.parameterUnitParsingErrors[j]}
        bind:this={parameterUnitMathFieldInstances[j]}
      />
      
      {#if $cells[index].extra.parameterUnitParsingErrors[j]}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{$cells[index].extra.parameterUnitParsingErrorMessages[j]}</span>
          <Error16 class="error"/>
        </TooltipIcon>
      {/if}
      </div>

      {#if numColumns > 1}
        <div 
          class="bottom-buttons"
          style="grid-column: {j + 2}; grid-row: {numRows+3};"
        >
          <button
            on:click={() => deleteColumn(j)}
            title="Delete Column"
          >
            x
          </button>
        </div>
      {/if}

    {/each}
  {/if}


  {#if $cells[index].data.rhsLatexs}
    {#each indices as {i, j} ($cells[index].data.rhsIds[i][j])}
      <div
        class="item math-field"
        on:focusin={() => (activeMathInstance = $cells[index].extra.rhsMathFieldInstances[i*numColumns+j])}
        style="grid-column: {j+2}; grid-row: {i+3};"
      >
      <MathField
        editable={true}
        on:update={(e) => parseTableCellRhsLatex(e.detail.latex, index, i, j)}
        parsingError={$cells[index].extra.rhsParsingErrors[i][j]}
        bind:this={rhsMathFieldInstances[i*numColumns+j]}
      />
      {#if $cells[index].extra.rhsParsingErrors[i][j]}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{$cells[index].extra.rhsParsingErrorMessages[i][j]}</span>
          <Error16 class="error"/>
        </TooltipIcon>
      {/if}
      </div>
    {/each}
  {/if}

  {#if $cells[index].data.rowLabels}
    {#each $cells[index].data.rowLabels as label, i ($cells[index].data.rowIds[i])}
      <div
        class="item"
        style="grid-column: 1; grid-row: {i+3};"
      >
        <input 
          type="radio"
          name={`selected_row_${index}`}
          bind:group={$cells[index].data.selectedRow}
          value={i}
          on:change={() => $mathCellChanged = true}
        >
        <input bind:value={$cells[index].data.rowLabels[i]} >
      </div>

      {#if numRows > 1}
        <div 
          class="right-buttons"
          style="grid-column: {numColumns + 2}; grid-row: {i+3};"
        >
          <button
            on:click={() => deleteRow(i)}
            title="Delete Row"
          >
            x
          </button>
        </div>
      {/if}
    {/each}
  {/if}

  <div class="right-buttons" style="grid-column:{numColumns + 2}; grid-row:1">
    <button 
      on:click={addColumn}
      title="Add Column"
    > 
      +Column
    </button>
  </div>
  <div class="bottom-buttons keyboard-tray" style="grid-column:1; grid-row:{numRows + 3}">
    <button
      on:click={addRow}
      title="Add Row"
    >
      +Row
    </button>
    {#if index === $activeCell}
      <div class="keyboard">
        <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, activeMathInstance)}/>
      </div>
   {/if}
  </div>
</div>


