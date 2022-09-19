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

  import type SystemCell from "./cells/SystemCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error16 from "carbon-icons-svelte/lib/Error16";
  import Add16 from "carbon-icons-svelte/lib/Add16";
  import RowDelete16 from "carbon-icons-svelte/lib/RowDelete16";

  export let index: number;
  export let systemCell: SystemCell;

  let activeMathInstance = null;

  onMount(() => {
    activeMathInstance = systemCell.expressionFields[0].element;

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
    systemCell.addRow();
    $cells = $cells;
  }

  function deleteRow(rowIndex: number) {
    systemCell.deleteRow(rowIndex);
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

  $: numRows = systemCell.expressionFields.length;
  
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
    display:flex;
    flex-flow: column;
  }

  div.system-container {
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

  div.item.math-field {
    display: flex;
    align-items: center;
  }

  div.item.math-field.expression {
    border-left: solid 2px;
  }
</style>


<div
  class="container"
>
  <div
    class="system-container"
  >
    {#if systemCell.expressionFields}
      {#each systemCell.expressionFields as mathField, i (mathField.id)}
        <div
          class="item math-field expression"
          id={`system-expression-${index}-${i}`}
          style="grid-column: 1; grid-row: {i};"
        > 
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
            style="grid-column: 2; grid-row: {i};"
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
      style="grid-column: 2; grid-row: {numRows+1};"
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

  <div>
    <span>Solove for: </span>
    <span
      class="item math-field"
      id={`system-parameterlist-${index}`}
    >
      <MathField
        editable={true}
        on:update={(e) => parseLatex(e.detail.latex, systemCell.parameterListField)}
        parsingError={systemCell.parameterListField.parsingError}
        bind:this={systemCell.parameterListField.element}
        latex={systemCell.parameterListField.latex}
        on:focusin={ () => { handleFocusIn(index); activeMathInstance = systemCell.parameterListField.element; } }
        on:focusout={ () => { handleFocusOut(systemCell.parameterListField) } }
      />
      {#if systemCell.parameterListField.parsingError}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{systemCell.parameterListField.parsingErrorMessage}</span>
          <Error16 class="error"/>
        </TooltipIcon>
      {/if}
    </span>
  </div>

</div>

{#if index === $activeCell && activeMathInstance}
<div>
  <div class="keyboard">
    <VirtualKeyboard on:clickButton={(e) => handleVirtualKeyboard(e, activeMathInstance)}/>
  </div>
</div>
{/if}


