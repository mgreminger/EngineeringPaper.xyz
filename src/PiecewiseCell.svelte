<script lang="ts">
  import {
    cells,
    activeCell,
    handleFocusIn,
    handleVirtualKeyboard,
    handleFocusOut,
    mathCellChanged
  } from "./stores";

  import { onMount } from "svelte";

  import type PiecewiseCell from "./cells/PiecewiseCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";
  import Add16 from "carbon-icons-svelte/lib/Add16";
  import RowDelete16 from "carbon-icons-svelte/lib/RowDelete16";

  export let index: number;
  export let piecewiseCell: PiecewiseCell;

  let activeMathInstance = null;

  onMount(() => {
    activeMathInstance = piecewiseCell.parameterField.element;

    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (activeMathInstance) {
      activeMathInstance.focus();
    }
  }

  function blur() {
    if (activeMathInstance) {
      activeMathInstance.blur();
    }
  }

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
    mathField.parseLatex(latex);
    
    $mathCellChanged = true;
    $cells = $cells;
  }

  $: if ($activeCell === index) {
      focus();
    } else {
      blur();
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
    width: fit-content;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  div.item {
    display: flex;
    align-self: center;
    justify-content: left;
    padding: 7px;
    padding-left: 0px;
  }

  div.item.equals {
    padding-left: 7px;
    padding-right: 14px;
    align-items: center;
    border-right: solid 2px;
    height: 100%;
  }

  div.if {
    padding-right: 10px;
  }

  div.item.math-field {
    display: flex;
    align-items: center;
  }

  div.item.math-field.expressions {
    padding-left: 10px;
    margin-left: 0px;
  }

</style>


<div
  class="container"
>
  <div
    class="item math-field"
    id={`piecewise-parameter-${index}`}
    style="grid-column: 1; grid-row: 1 / {numRows+1};"
  >
    <MathField
      editable={true}
      on:update={(e) => parseLatex(e.detail.latex, piecewiseCell.parameterField)}
      parsingError={piecewiseCell.parameterField.parsingError}
      bind:this={piecewiseCell.parameterField.element}
      latex={piecewiseCell.parameterField.latex}
      on:focusin={ () => { handleFocusIn(index); activeMathInstance = piecewiseCell.parameterField.element; } }
      on:focusout={ () => { handleFocusOut(piecewiseCell.parameterField) } }
    />
    {#if piecewiseCell.parameterField.parsingError}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{piecewiseCell.parameterField.parsingErrorMessage}</span>
        <Error16 class="error"/>
      </TooltipIcon>
    {/if}
  </div>

  <div
    class="item equals"
    style="grid-column: 2; grid-row: 1 / {numRows+1};"
  >
    =
  </div>


  {#if piecewiseCell.expressionFields}
    {#each piecewiseCell.expressionFields as mathField, i (mathField.id)}
      <div
        class="item math-field expressions"
        id={`piecewise-expression-${index}-${i}`}
        style="grid-column: 3; grid-row: {i+1};"
      >
        <MathField
          editable={true}
          on:update={(e) => parseLatex(e.detail.latex, mathField)}
          parsingError={mathField.parsingError}
          bind:this={mathField.element}
          latex={mathField.latex}
          on:focusin={ () => { handleFocusIn(index); activeMathInstance = mathField.element; } }
          on:focusout={ () => { handleFocusOut(mathField); } }
        />
        {#if mathField.parsingError}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {/if}
      </div>

      {#if i === numRows - 1}
        <div
          class="item"
          style="grid-column: 4; grid-row: {i+1};"
        >
          otherwise
        </div>
      {/if}

    {/each}
  {/if}

  {#if piecewiseCell.conditionFields}
    {#each piecewiseCell.conditionFields as mathField, i (mathField.id)}
      <div
        class="item math-field"
        id={`piecewise-condition-${index}-${i}`}
        style="grid-column: 4; grid-row: {i+1};"
      >
        <div class="if">if</div>
        
        <MathField
          editable={true}
          on:update={(e) => parseLatex(e.detail.latex, mathField)}
          parsingError={mathField.parsingError}
          bind:this={mathField.element}
          latex={mathField.latex}
          on:focusin={ () => { handleFocusIn(index); activeMathInstance = mathField.element; } }
          on:focusout={ () => { handleFocusOut(mathField) } }
        />
        {#if mathField.parsingError}
          <TooltipIcon direction="right" align="end">
            <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
            <Error16 class="error"/>
          </TooltipIcon>
        {/if}
      </div>

      {#if numRows > 2 }
        <div 
          class="item"
          style="grid-column: 5; grid-row: {i+1};"
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
    class="item"
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

</div>

{#if index === $activeCell && activeMathInstance}
  <div>
    <div class="keyboard">
      <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, activeMathInstance)}/>
    </div>
  </div>
{/if}


