<script lang="ts">
  import appState from "./stores.svelte";

  import { onMount, tick } from "svelte";

  import type PiecewiseCell from "./cells/PiecewiseCell.svelte";
  import type { MathField as MathFieldClass } from "./cells/MathField.svelte";

  import MathField from "./MathField.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";
  import IconButton from "./IconButton.svelte";

  interface Props {
    index: number;
    piecewiseCell: PiecewiseCell;
    insertMathCellAfter: (arg: {detail: {index: number}}) => void;
    insertInsertCellAfter: (arg: {detail: {index: number}}) => void;
    mathCellChanged: () => void;
    triggerSaveNeeded: (pendingMathCellChange?: boolean) => void;
  }

  let {
    index,
    piecewiseCell,
    insertMathCellAfter,
    insertInsertCellAfter,
    mathCellChanged,
    triggerSaveNeeded
  }: Props = $props();

  let containerDiv: HTMLDivElement;

  let numRows = $derived(piecewiseCell.expressionFields.length);

  export function getMarkdown(centerEquations: boolean) {
    let result = `${piecewiseCell.parameterField.latex} = \\begin{cases} `;

    for (const [i, expression] of piecewiseCell.expressionFields.entries()) {
      if (i < piecewiseCell.conditionFields.length) {
        result += `${expression.latex} &: \\quad ${piecewiseCell.conditionFields[i].latex} \\\\ `;
      } else {
        result += `${expression.latex} &: \\quad \\text{otherwise} \\end{cases}`;
      }
    }

    if (centerEquations) {
      return `$$ ${result} $$ \n\n`;
    } else {
      return `$${result.trim()}$ <!-- inline --> \n\n`;
    }
  }


  onMount(() => {
    if (appState.activeCell === index) {
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
    appState.cells[index] = appState.cells[index];

    triggerSaveNeeded();
    mathCellChanged();

    await tick();
    if (piecewiseCell.expressionFields.slice(-2)[0].element?.focus) {
      piecewiseCell.expressionFields.slice(-2)[0].element.focus();
    }
  }

  async function deleteRow(rowIndex: number) {
    triggerSaveNeeded(true);

    piecewiseCell.deleteRow(rowIndex);
    await piecewiseCell.parsePiecewiseStatement();
    appState.cells[index] = appState.cells[index];

    mathCellChanged();
  }

  async function parseLatex(latex: string, mathField: MathFieldClass) {
    triggerSaveNeeded(true);

    await mathField.parseLatex(latex);
    await piecewiseCell.parsePiecewiseStatement();
    appState.cells[index] = appState.cells[index];
    
    mathCellChanged();
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

  $effect(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });
  
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
      update={(e) => parseLatex(e.latex, piecewiseCell.parameterField)}
      shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
      modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
      mathField={piecewiseCell.parameterField}
      parsingError={piecewiseCell.parameterField.parsingError}
      parsePending={piecewiseCell.parameterField.parsePending}
      bind:this={piecewiseCell.parameterField.element}
      latex={piecewiseCell.parameterField.latex}
    />
    {#if piecewiseCell.parameterField.parsingError && !piecewiseCell.parameterField.parsePending}
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
          update={(e) => parseLatex(e.latex, mathField)}
          enter={() => handleEnter(i)}
          shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
          modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
          mathField={mathField}
          parsingError={mathField.parsingError}
          parsePending={mathField.parsePending}
          bind:this={mathField.element}
          latex={mathField.latex}
        />
        {#if mathField.parsingError && !mathField.parsePending}
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
                update={(e) => parseLatex(e.latex, conditionMathField)}
                enter={() => handleEnter(i)}
                shiftEnter={() => insertMathCellAfter({detail: {index: index}})}
                modifierEnter={() => insertInsertCellAfter({detail: {index: index}})}
                mathField={conditionMathField}
                parsingError={conditionMathField.parsingError}
                parsePending={conditionMathField.parsePending}
                bind:this={conditionMathField.element}
                latex={conditionMathField.latex}
              />
              {#if conditionMathField.parsingError && !conditionMathField.parsePending}
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
                  click={() => deleteRow(i)}
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
      click={addRow}
      id={`add-row-${index}`}
      title="Add Row"
    >
        <Add />
    </IconButton>
  </div>

</div>



