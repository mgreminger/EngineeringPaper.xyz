<script lang="ts">
  import {
    cells,
    activeCell,
    handleFocusIn,
    handleVirtualKeyboard,
    handleFocusOut,
    mathCellChanged
  } from "./stores";

  import type PiecewiseCell from "./cells/PiecewiseCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import { onMount } from "svelte";
  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";
  import Information16 from "carbon-icons-svelte/lib/Information16";
  import Add16 from "carbon-icons-svelte/lib/Add16";
  import RowDelete16 from "carbon-icons-svelte/lib/RowDelete16";

  export let index: number;
  export let piecewiseCell: PiecewiseCell;

  let activeMathInstance = null;


  function addRow() {
    piecewiseCell.addRow();
    $cells = $cells;
  }

  function deleteRow(rowIndex: number) {
    piecewiseCell.deleteRow(rowIndex);
    $mathCellChanged = true;
    $cells = $cells;
  }


  function parseLatex(latex: string, mathField: MathFieldClass) {
    mathField.parseLatex(latex, index);
    
    $mathCellChanged = true;
    $cells = $cells;
  }

  $: numRows = piecewiseCell.expressionFields.length;
  
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


<div
  class="container"
>
  <div
    class="item math-field"
    id={`piecewise-parameter-${index}`}
    style="grid-column: 1; grid-row: 1 / {numRows};"
    on:focusin={() => {
      handleFocusIn(index);
      activeMathInstance = piecewiseCell.parameterField.element;
    }}
    on:focusout={() => {
      activeMathInstance = null;
      handleFocusOut(piecewiseCell.parameterField)
    }}
  >
    <MathField
      editable={true}
      on:update={(e) => parseLatex(e.detail.latex, piecewiseCell.parameterField)}
      parsingError={piecewiseCell.parameterField.parsingError}
      bind:this={piecewiseCell.parameterField.element}
      latex={piecewiseCell.parameterField.latex}
    />
    {#if piecewiseCell.parameterField.parsingError}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{piecewiseCell.parameterField.parsingErrorMessage}</span>
        <Error16 class="error"/>
      </TooltipIcon>
    {/if}
  </div>

  <div
    class="item"
    style="grid-column: 2; grid-row: 1 / {numRows};"
  >
    =
  </div>


  {#if piecewiseCell.expressionFields}
    {#each piecewiseCell.expressionFields as mathField, i (mathField.id)}
      <div
        class="item math-field"
        id={`piecewise-expression-${index}-${i}`}
        style="grid-column: 3; grid-row: {i+1};"
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
          on:update={(e) => parseLatex(e.detail.latex, mathField)}
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

      <div
        class="item"
        style="grid-column: 4; grid-row: {i+1};"
      >
        {i < numRows - 1 ? 'if' : 'otherwise'}
      </div>

    {/each}
  {/if}

  {#if piecewiseCell.conditionFields}
    {#each piecewiseCell.conditionFields as mathField, i (mathField.id)}
      <div
        class="item math-field"
        id={`piecewise-expression-${index}-${i}`}
        style="grid-column: 5; grid-row: {i+1};"
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
          on:update={(e) => parseLatex(e.detail.latex, mathField)}
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

      {#if numRows > 1 }
        <div 
          class="right-buttons delete-rows"
          style="grid-column: 6; grid-row: {i+1};"
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

  <div 
    class="right-justify"
    style="grid-column: 5; grid-row: {numRows};"
  >
    <button
      on:click={addRow}
      id={`add-row-${index}`}
      title="Add Row"
    >
      <div class="icon">
        <Add16/>
      </div>
    </button>
  </div>

  {#if index === $activeCell && activeMathInstance}
  <div
    class="keyboard-tray"
    style="grid-column: 3; grid-row: {numRows+1};"
  >
    <div class="keyboard">
      <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, activeMathInstance)}/>
    </div>
  </div>
  {/if}
  
</div>


