<script lang="ts">
  import { deltaToMarkdown } from "quill-delta-to-markdown";

  import appState, { restoreDataTable, triggerSaveNeeded, mathCellChanged } from "./stores.svelte";

  import { onMount, tick } from "svelte";

  import type TableCell from "./cells/TableCell.svelte";

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
  import { prepLatexForMarkdown } from "./utility";
  import { getBlankStatement, getInitialParsingState, type ParsingState } from "./parser/utility";
  import type { Statement, SubQueryStatement } from "./parser/types";
  import type { CellStatements } from "./types";
  import type { SystemDefinition } from "./cells/SystemCell.svelte";
  import type { FluidFunction } from "./cells/FluidCell.svelte";
  import type { CodeCellFunction } from "./cells/CodeCell.svelte";
  import type { GridInterpolationFunction, InterpolationFunction } from "./cells/DataTableCell.svelte";

  interface Props {
    index: number;
    tableCell: TableCell;
  }

  let {
    index,
    tableCell,
  }: Props = $props();

  let numColumns = $derived(tableCell.parameterLatexs.length);
  let numRows = $derived(tableCell.rowLabels.length);
  let hideUnselected = $derived(tableCell.hideUnselected);
  let hideToolbar = $derived(appState.activeCell !== index);
  // svelte-ignore state_referenced_locally
  let columnTypes = $derived(tableCell.parameterUnitLatexs.map(unitLatex => unitLatex.replaceAll(/\\:?/g,'').trim() === "" ? "expression" : "number"));

  let containerDiv: HTMLDivElement;

  // svelte-ignore state_referenced_locally
  let parameterParsingStates: ParsingState[] = $state(Array.from({ length: numColumns }, () => getInitialParsingState()));;
  // svelte-ignore state_referenced_locally
  let parameterUnitParsingStates: ParsingState[] = $state(Array.from({ length: numColumns }, () => getInitialParsingState()));
  // svelte-ignore state_referenced_locally
  let rhsParsingStates: ParsingState[][] = $state(Array.from({ length: numRows }, () => Array.from({ length: numColumns }, () => getInitialParsingState())));

  // svelte-ignore state_referenced_locally
  let parserIds = Array.from({length: numColumns}, () => appState.nextParserId++);
  let combinedStatements: Statement[] = $state([]);
  let combinedParsePending = $state(false);


  let parsingError = $derived.by(() => {
    return parameterParsingStates.some(value => value.parsingError) ||
           parameterUnitParsingStates.some(value => value.parsingError) ||
           rhsParsingStates.reduce((accum, row) => accum || row.some(value => value.parsingError), false);
  });

  let parsePending = $derived.by(() => {
    return combinedParsePending ||
           parameterParsingStates.reduce((accum, value) => accum || value.parsePending, false) ||
           parameterUnitParsingStates.reduce((accum, value) => accum || value.parsePending, false) ||
           rhsParsingStates.reduce((accum, row) => accum || row.reduce((rowAccum, value) => rowAccum || value.parsePending, false), false);
  });

  let cellStatements: CellStatements = $derived.by(() => {
    const statements: (Statement | SubQueryStatement)[] = [];
    const endStatements: (Statement | SubQueryStatement)[] = [];
    const subQueries: Map<string,SubQueryStatement> = new Map();
    const systemDefinitions: SystemDefinition[] = [];
    const fluidFunctions: FluidFunction[] = [];
    const codeCellFunctions: CodeCellFunction[] = [];
    const interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = [];

    endStatements.push(...combinedStatements);

    return {
      statements,
      endStatements,
      subQueries,
      systemDefinitions,
      fluidFunctions,
      codeCellFunctions,
      interpolationFunctions,
    };
  });

  export function getParsePending() {
    return parsePending;
  }

  export function getParsingError() {
    return parsingError;
  }

  export function getCellStatements() {
    return cellStatements;
  }

  export function getMarkdown(centerEquations: boolean) {
    let startDelimiter: string;
    let endDelimiter: string;
    if (centerEquations) {
      startDelimiter = "$$ ";
      endDelimiter = " $$";
    } else {
      startDelimiter = "$";
      endDelimiter = "$ <!-- inline -->";
    }

    const row = tableCell.selectedRow;
    let result = "";

    if (tableCell.rowDeltas.length > 0) {
      result += deltaToMarkdown(tableCell.rowDeltas[row]?.ops ?? "").replaceAll("\n", "\n\n").trimEnd() + "\n\n";
    }

    const columnExpressions = [];

    for (const [col, parameter] of tableCell.parameterLatexs.entries()) {
      if (tableCell.rhsLatexs[row][col].replaceAll(/\\:?/g,'').trim() !== "") {
        columnExpressions.push(`${prepLatexForMarkdown(parameter)} & = \\quad ${prepLatexForMarkdown(tableCell.rhsLatexs[row][col])} ${prepLatexForMarkdown(tableCell.parameterUnitLatexs[col])}`);
      }
    }

    if (columnExpressions.length > 0) {
      result += `${startDelimiter}\\text{${tableCell.rowLabels[row]}} \\quad `;

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
      
      result = result.trimEnd() + `${endDelimiter} \n\n`;
    }

    return result;
  }

  onMount(() => {
    if (appState.activeCell === index) {
      focus();
    }
  });

  function focus() {
    if ( containerDiv && containerDiv.parentElement &&
         !containerDiv.parentElement.contains(document.activeElement) ) {
      if (!tableCell.constructedFromDataTable) {
        const mathElement: HTMLTextAreaElement = document.querySelector(`#grid-cell-${index}-0-0 math-field`);
        if (mathElement) {
          mathElement.focus();
        }
      } else {
        const acceptButton: HTMLElement = document.querySelector(`#accept-conversion-${index}`);
        if (acceptButton) {
          acceptButton.focus();
        }
      }
    }
  }

  async function parseTableStatements() {
    const rowIndex = tableCell.selectedRow;
    const newTableStatements: Statement[] = [];
  
    if (!(parsePending || parsingError)) {
      combinedParsePending = true;
      combinedStatements = [];
      for (let colIndex = 0; colIndex < tableCell.parameterLatexs.length; colIndex++) {
        let combinedLatex: string;
        if (tableCell.rhsLatexs[rowIndex][colIndex].replaceAll(/\\:?/g,'').trim() !== "") {
          combinedLatex = tableCell.parameterLatexs[colIndex] + "=" +
                          tableCell.rhsLatexs[rowIndex][colIndex] +
                          tableCell.parameterUnitLatexs[colIndex];

          const parsingResult = await appState.parserWrapper.parseLatex(combinedLatex, parserIds[colIndex], 'math');

          if (!parsingResult.parsingError) {
            combinedStatements.push(parsingResult.statement);
          } else {
            console.warn('Internal table cell parsing error.');
          }

        }
      }
      combinedParsePending = false;
    }
  }

  async function handleSelectedRowChange() {
    triggerSaveNeeded(true);
    
    await parseTableStatements();
    
    mathCellChanged();
  }

  function addRowDocumentation() {
    tableCell.addRowDocumentation()
    appState.cells = appState.cells;
  }

  function deleteRowDocumentation() {
    tableCell.deleteRowDocumentation()
    appState.cells = appState.cells;
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
    appState.cells = appState.cells;
    await tick();
    highlightDiv(`#row-label-${index}-${numRows-1}`);
  }

  function addColumn() {
    tableCell.addColumn();
    combinedStatements = [...combinedStatements, getBlankStatement()];
    parserIds = [...parserIds, appState.nextParserId++];

    triggerSaveNeeded();
    mathCellChanged();
  }

  async function deleteRow(rowIndex: number) {
    triggerSaveNeeded(true);

    if (tableCell.deleteRow(rowIndex)) {
      await handleSelectedRowChange();
    } else {
      await parseTableStatements();
    }
    
    appState.cells[index] = appState.cells[index];

    mathCellChanged();
  }

  async function deleteColumn(colIndex: number) {
    triggerSaveNeeded(true);
    
    tableCell.deleteColumn(colIndex);
    combinedStatements = [...combinedStatements.slice(0,colIndex),
                          ...combinedStatements.slice(colIndex+1)];
    parserIds = [...parserIds.slice(0,colIndex),
                 ...parserIds.slice(colIndex+1)];

    await parseTableStatements();

    mathCellChanged();
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


  async function parseLatex() {
    await parseTableStatements();
    mathCellChanged();
  }

  function handleRestoreDataTable() {
    if (tableCell.constructedFromDataTable) {
      restoreDataTable(index, tableCell.sourceDataTableCell);
      tableCell.constructedFromDataTable = false;
      tableCell.sourceDataTableCell = null;
      triggerSaveNeeded();
      mathCellChanged();
    }
  }

  function handleAccept() {
    tableCell.constructedFromDataTable = false;
    tableCell.sourceDataTableCell = null; 
  }

  $effect( () => {
   if (appState.activeCell === index) {
      focus();
    }
  });
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

  div.undo-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    background-color: whitesmoke;
    border-radius: 2px;
    padding: 5px;
  }

  button {
    background-color: white;
    border-radius: 5px;
    padding: 2px;
    height: 2em;
  }

  @media print {
    div.item.spread-align-center, div.right-buttons, div.bottom-buttons, div.undo-container {
      display: none;
    }
  }

</style>

{#if tableCell.rowDeltas.length > 0}
  <div
    spellcheck={appState.activeCell === index}
  >
    <DocumentationField
      hideToolbar={hideToolbar}
      bind:delta={tableCell.rowDeltas[tableCell.selectedRow]}
    />
  </div>
{/if}

{#if tableCell.constructedFromDataTable}
  <div class="undo-container">
    <p>
      Click undo to restore that data table that this selector table was 
      generated from. If this selector table is accepted, the original 
      data table cannot be restored.
    </p>

    <button
      onclick={handleRestoreDataTable}
    >
      Undo
    </button>
    <button
      id={`accept-conversion-${index}`}
      onclick={handleAccept}
    >
      Accept
    </button>

  </div>
{/if}

<div
  class="container"
  bind:this= {containerDiv}
  spellcheck={appState.activeCell === index}
>
  {#each {length: tableCell.parameterLatexs.length}, j}
    <div
      class="item math-field"
      id={`parameter-name-${index}-${j}`}
      style="grid-column: {j + 2}; grid-row: 1;"
    >
      <MathField
        editable={true}
        type="parameter"
        update={parseLatex}
        latex={tableCell.parameterLatexs[j]}
        parsingState={parameterParsingStates[j]}
      />
      {#if parameterParsingStates[j].parsingError && !parameterParsingStates[j].parsePending}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{parameterParsingStates[j].parsingErrorMessage}</span>
          <Error class="error"/>
        </TooltipIcon>
      {/if}
    </div>
  {/each}

  {#each {length: tableCell.parameterUnitLatexs.length}, j}
    <div
      class="item math-field"
      id={`parameter-units-${index}-${j}`}
      style="grid-column: {j + 2}; grid-row: 2;"
    >
      <MathField
        editable={true}
        type="units"
        latex={tableCell.parameterUnitLatexs[j]}
        update={parseLatex}
        parsingState={parameterUnitParsingStates[j]}
      />
      
      {#if parameterUnitParsingStates[j].parsingError && !parameterUnitParsingStates[j].parsePending}
        <TooltipIcon direction="right" align="end">
          <span slot="tooltipText">{parameterUnitParsingStates[j].parsingErrorMessage}</span>
          <Error class="error"/>
        </TooltipIcon>
      {/if}
    </div>
  {/each}


  {#each {length: tableCell.rhsLatexs.length}, i }
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
            onchange={handleSelectedRowChange}
          >
          <TextBox
            enter={() => handleEnter(i)}
            id={`row-label-${index}-${i}`}
            bind:textContent={tableCell.rowLabels[i]} 
            oninput={() => triggerSaveNeeded()}
          >
          </TextBox>
        </div>
      {/if}
    {/if}

    {#each {length: numColumns}, j}
      {#if !hideUnselected || i === tableCell.selectedRow}
        <div
          class="item math-field"
          id={`grid-cell-${index}-${i}-${j}`}
          style="grid-column: {j+2}; grid-row: {i+3};"
        >
          <MathField
            editable={true}
            type={columnTypes[j]}
            bind:latex={tableCell.rhsLatexs[i][j]}
            update={parseLatex}
            enter={() => handleEnter(i)}
            parsingState={rhsParsingStates[i][j]}
          />
          {#if rhsParsingStates[i][j].parsingError && !rhsParsingStates[i][j].parsePending}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{rhsParsingStates[i][j].parsingErrorMessage}</span>
              <Error class="error"/>
            </TooltipIcon>
          {/if}
        </div>
      {/if}
    {/each}
  {/each}


  {#if numColumns > 1 && !hideUnselected}
    {#each Array(numColumns) as _, j}
      <div 
        class="bottom-buttons delete-columns"
        style="grid-column: {j + 2}; grid-row: {numRows+3};"
      >
        <IconButton
          click={() => deleteColumn(j)}
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
          click={() => deleteRow(i)}
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
        click={addColumn}
        title="Add Column"
      > 
        <Add />
      </IconButton>
    </div>
  {/if}
  <div class="bottom-buttons add-row" style="grid-column:1; grid-row:{numRows + 3}">
    {#if !hideUnselected}
      <IconButton
        click={addRow}
        id={`add-row-${index}`}
        title="Add Row"
      >
        <Add />
      </IconButton>
    {/if}
  </div>

  <div class={`item borderless ${hideUnselected ? 'right-justify': 'spread-align-center'}`}>
    {#if !hideUnselected}
      {#if tableCell.rowDeltas.length === 0}
        <IconButton
          title="Add Row Specific Documentation"
          id={`add-row-docs-${index}`}
          click={addRowDocumentation}
        >
          <AddComment />
        </IconButton>
      {:else}
        <IconButton
          title="Delete All Row Specific Documentation"
          id={`del-row-docs-${index}`}
          click={deleteRowDocumentation}
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
          click={() => tableCell.hideUnselected = false}
        >
          <ShowDataCards />
        </IconButton>
      {:else}
        <IconButton
          title="Hide unselected rows"
          id={`hide-unselected-rows-${index}`}
          click={() => tableCell.hideUnselected = true}
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

