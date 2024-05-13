<script lang="ts">
  import {
    cells,
    activeCell,
    mathCellChanged,
    modifierKey
  } from "./stores";

  import { onMount, tick, createEventDispatcher } from "svelte";

  import type PiecewiseCell from "./cells/PiecewiseCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";

  import MathField from "./MathField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import IconButton from "./IconButton.svelte";

  export let index: number;
  export let piecewiseCell: PiecewiseCell;

  let containerDiv: HTMLDivElement;

  export function getMarkdown() {
    let result = `$$ ${piecewiseCell.parameterField.latex} = \\begin{cases} `;

    for (const [i, expression] of piecewiseCell.expressionFields.entries()) {
      if (i < piecewiseCell.conditionFields.length) {
        result += `${expression.latex} &: \\quad ${piecewiseCell.conditionFields[i].latex} \\\\ `;
      } else {
        result += `${expression.latex} &: \\quad \\text{otherwise} \\end{cases} $$ \n\n`;
      }
    }

    return result;
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
    if ((containerDiv && !containerDiv.contains(document.activeElement))) {
      const parameterField: HTMLTextAreaElement = document.querySelector(`#piecewise-parameter-${index} math-field`)
      if (parameterField) {
        parameterField.focus();
      }
    }
  }

  async function addRow() {
    piecewiseCell.addRow();
    $mathCellChanged = true;
    $cells = $cells;
    await tick();
    if (piecewiseCell.expressionFields.slice(-2)[0].element?.focus) {
      piecewiseCell.expressionFields.slice(-2)[0].element.focus();
    }
  }

  function deleteRow(rowIndex: number) {
    piecewiseCell.deleteRow(rowIndex);
    piecewiseCell.parsePiecewiseStatement();
    $mathCellChanged = true;
    $cells = $cells;
  }

  function parseLatex(latex: string, mathField: MathFieldClass) {
    mathField.parseLatex(latex);
    piecewiseCell.parsePiecewiseStatement();
    $mathCellChanged = true;
    $cells[index] = $cells[index];
  }

  function handleEnter(row: number) {
    if (row < piecewiseCell.expressionFields.length - 1) {
      if (row === piecewiseCell.expressionFields.length-2 ) {
        addRow();
      } else {
        if (piecewiseCell.expressionFields[row+1].element?.focus) {
          piecewiseCell.expressionFields[row+1].element.focus();
        }
      }
    }
  }

  $: if ($activeCell === index) {
      focus();
    }

  $: numRows = piecewiseCell.expressionFields.length;
  
</script>


<style>
  div.container {
    display: grid;
    width: fit-content;
    padding-top: 10px;
    padding-bottom: 10px;
    break-inside: avoid;
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
  bind:this={containerDiv}
>
  <div
    class="item math-field"
    id={`piecewise-parameter-${index}`}
    style="grid-column: 1; grid-row: 1 / {numRows+1};"
  >
    <MathField
      editable={true}
      on:update={(e) => parseLatex(e.detail.latex, piecewiseCell.parameterField)}
      on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
      on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
      mathField={piecewiseCell.parameterField}
      parsingError={piecewiseCell.parameterField.parsingError}
      bind:this={piecewiseCell.parameterField.element}
      latex={piecewiseCell.parameterField.latex}
    />
    {#if piecewiseCell.parameterField.parsingError}
      <TooltipIcon direction="right" align="end">
        <span slot="tooltipText">{piecewiseCell.parameterField.parsingErrorMessage}</span>
        <Error class="error"/>
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

      {#if i === numRows - 1}
        <div
          class="item"
          style="grid-column: 4; grid-row: {i+1};"
        >
          otherwise
        </div>
      {/if}


      {#if i < piecewiseCell.conditionFields.length}
        {#each piecewiseCell.conditionFields as conditionMathField, ii (conditionMathField.id)}
          {#if i === ii}
            <div
              class="item math-field"
              id={`piecewise-condition-${index}-${i}`}
              style="grid-column: 4; grid-row: {i+1};"
            >
              <div class="if">if</div>
              
              <MathField
                editable={true}
                on:update={(e) => parseLatex(e.detail.latex, conditionMathField)}
                on:enter={() => handleEnter(i)}
                on:shiftEnter={() => dispatch("insertMathCellAfter", {index: index})}
                on:modifierEnter={() => dispatch("insertInsertCellAfter", {index: index})}
                mathField={conditionMathField}
                parsingError={conditionMathField.parsingError}
                bind:this={conditionMathField.element}
                latex={conditionMathField.latex}
              />
              {#if conditionMathField.parsingError}
                <TooltipIcon direction="right" align="end">
                  <span slot="tooltipText">{conditionMathField.parsingErrorMessage}</span>
                  <Error class="error"/>
                </TooltipIcon>
              {/if}
            </div>
      
            {#if numRows > 2 }
              <div 
                class="item"
                style="grid-column: 5; grid-row: {i+1};"
              >
                <IconButton
                  on:click={() => deleteRow(i)}
                  title="Delete Row"
                  id={`delete-row-${index}-${i}`}
                >
                  <RowDelete />
                </IconButton>
              </div>
            {/if}
          {/if}
        {/each}
      {/if}

    {/each}
  {/if}



  <div 
    class="item"
    style="grid-column: 5; grid-row: {numRows};"
  >
    <IconButton
      on:click={addRow}
      id={`add-row-${index}`}
      title="Add Row"
    >
        <Add />
    </IconButton>
  </div>

</div>



