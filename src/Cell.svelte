<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import appState from "./stores.svelte";
  import { handleClickInCell, deleteCell } from "./stores.svelte";
  import type { ModalInfo } from "./types";
  import type { MathCellConfig } from "./sheet/Sheet";
  import MathCellElement from "./MathCell.svelte";
  import DocumentationCellElement from "./DocumentationCell.svelte";
  import PlotCellElement from "./PlotCell.svelte";
  import TableCellElement from "./TableCell.svelte";
  import DataTableCellElement from "./DataTableCell.svelte";
  import PiecewiseCellElement from "./PiecewiseCell.svelte";
  import SystemCellElement from "./SystemCell.svelte";
  import FluidCellElement from "./FluidCell.svelte";
  import DeletedCellElement from "./DeletedCell.svelte";
  import InsertCellElement from "./InsertCell.svelte";

  import MathCell from "./cells/MathCell.svelte";
  import PlotCell from "./cells/PlotCell.svelte";
  import TableCell from "./cells/TableCell.svelte";
  import DataTableCell from "./cells/DataTableCell.svelte";
  import DocumentationCell from "./cells/DocumentationCell.svelte";
  import PiecewiseCell from "./cells/PiecewiseCell.svelte";
  import SystemCell from "./cells/SystemCell.svelte";
  import DeletedCell from "./cells/DeletedCell";
  import InsertCell from "./cells/InsertCell";
  import FluidCell from "./cells/FluidCell.svelte";

  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import ChevronUp from "carbon-icons-svelte/lib/ChevronUp.svelte";
  import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";
  import Draggable from "carbon-icons-svelte/lib/Draggable.svelte";
  import IconButton from "./IconButton.svelte";

  interface Props {
    index: number;
    updateNumberFormat: (arg: {detail: {mathCell: MathCell, setNumberConfig: (input: MathCellConfig) => void}}) => void;
    generateCode: (arg: {detail: {index: number}}) => void;
    insertMathCellAfter: (arg: {detail: {index: number}}) => void;
    insertInsertCellAfter: (arg: {detail: {index: number}}) => void;
    modal: (arg: {detail: {modalInfo: ModalInfo}}) => void;
    insertSheet: (arg: {detail: {index: number}}) => void;
    startDrag: (arg: {detail: {clientY: number, index: number}}) => void;
    mathCellChanged: () => void;
    nonMathCellChanged: () => void;
  }

  let {
    index,
    updateNumberFormat,
    generateCode,
    insertMathCellAfter,
    insertInsertCellAfter,
    modal,
    startDrag,
    insertSheet,
    mathCellChanged,
    nonMathCellChanged
  }: Props = $props();

  let cell = $derived(appState.cells[index]);
  let selected = $derived(appState.activeCell === index);

  let contentDiv: HTMLDivElement;
  let dragHandleElement: HTMLSpanElement;

  // svelte-ignore non_reactive_update
  let cellElement: MathCellElement | DocumentationCellElement | PlotCellElement | 
                   TableCellElement | PiecewiseCellElement | 
                   SystemCellElement | DeletedCellElement | InsertCellElement |
                   FluidCellElement | DataTableCellElement;

  $effect( () => {
    if (!selected) {
      if (contentDiv && contentDiv.contains(document.activeElement) &&
        document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } 
  });

  export async function getMarkdown(): Promise<string> {
    if (cellElement) {
      return await cellElement.getMarkdown?.() ?? "";
    } else {
      return "";
    }
  }

  onMount(() => {
    if(cell instanceof DeletedCell && cell.height > 0) {
      contentDiv.setAttribute("style", `height: ${cell.height}px;`);
    }

    dragHandleElement.addEventListener("touchstart", dispatchStartDrag, {passive: false});
  });

  onDestroy(() => {
    //@ts-ignore:2769
    dragHandleElement.removeEventListener("touchstart", dispatchStartDrag, {passive: false});
  });

  function moveUp(index) {
    if (index > 0) {
      appState.cells = [...appState.cells.slice(0,index-1), appState.cells[index], appState.cells[index-1], ...appState.cells.slice(index+1, appState.cells.length+1)];
      appState.results = [...appState.results.slice(0,index-1), appState.results[index], appState.results[index-1], ...appState.results.slice(index+1, appState.cells.length+1)];
      appState.system_results = [...appState.system_results.slice(0,index-1), appState.system_results[index], appState.system_results[index-1], ...appState.system_results.slice(index+1, appState.cells.length+1)];

      if (index === appState.activeCell) {
        appState.activeCell--;
      }

      mathCellChanged();
    }
  }

  function moveDown(index) {
    if (index < appState.cells.length-1) {
      appState.cells = [...appState.cells.slice(0, index), appState.cells[index+1], appState.cells[index], ...appState.cells.slice(index+2, appState.cells.length+1)];
      appState.results = [...appState.results.slice(0, index), appState.results[index+1], appState.results[index], ...appState.results.slice(index+2, appState.cells.length+1)];
      appState.system_results = [...appState.system_results.slice(0, index), appState.system_results[index+1], appState.system_results[index], ...appState.system_results.slice(index+2, appState.cells.length+1)];

      if (index === appState.activeCell) {
        appState.activeCell++;
      }

      mathCellChanged();
    }
  }

  function dispatchStartDrag(event) {
    event.currentTarget.focus();
    event.preventDefault();

    let clientY;
    if (event.type === "touchstart") {
      clientY = event.changedTouches[0].clientY;
    } else {
      clientY = event.clientY;
    }

    startDrag( { detail: {clientY: clientY, index: index}} );
  }

</script>

<style>
  .container {
    display: flex;
    align-items: center;
  }

  @media print {
    .container {
      display: block;
      height: fit-content;
    }
  }

  .controls {
    display: flex;
    flex-direction: row;
  }

  .controls.left {
    padding-right: 8px;
  }

  .controls.right {
    padding-left: 8px;
  }

  .content {
    flex: 1;
    padding-left: 9px;
    padding-right: 9px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding: 5px;
    border: 2px solid transparent;
    border-radius: 9px;
    content: contain;
  }

  span.button-container {
    display: flex;
  }

  @media screen {
    .content.selected {
      border: 2px solid lightgray;
    }
  }

  :global(div.outer-container:not(.dragging)) span.handle {
    cursor:grab;
  }

  :global(div.first span.up, div.last span.down) {
    visibility: hidden;
  }

  @media (max-width: 500px) {
    span.up, span.down {
      display: none;
    }
  }

  @media print {
    .controls {
      display: none;
    }
  }

</style>

<div class="container">
  <div class="controls left">
    <span class="up button-container">
      <IconButton        
        id={`up-${index}`}
        click={()=>moveUp(index)}
        title="Move Cell Up"
      >
        <ChevronUp />
      </IconButton>
    </span>
    <span
      role="none"
      class="handle button-container"
      bind:this={dragHandleElement}
      onmousedown={dispatchStartDrag}
    >
      <IconButton
        title="Drag to Move Cell"
      >
        <Draggable />
      </IconButton>
    </span>
    <span class="down button-container">
      <IconButton        
        id={`down-${index}`}
        click={()=>moveDown(index)}
        title="Move Cell Down"
      >
        <ChevronDown />
      </IconButton>
    </span>
  </div>

  <!-- The static element action to select is cell is made available through the keyboard shortcuts
       of Ctrl+ArrowUp and Ctrl+ArrowDown -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="content" class:selected
    id={`cell-${index}`}
    onclickcapture={() => handleClickInCell(index)}
    onfocusin={() => handleClickInCell(index)}
    bind:this={contentDiv}
  >
    {#if cell instanceof MathCell}
      <MathCellElement
        {updateNumberFormat}
        {generateCode}
        {insertMathCellAfter}
        {insertInsertCellAfter}
        {mathCellChanged}
        bind:this={cellElement}
        index={index}
        mathCell={cell}
      />
    {:else if cell instanceof DocumentationCell}
      <DocumentationCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        {nonMathCellChanged}
        bind:this={cellElement}
        index={index}
        documentationCell={cell}
      />
    {:else if cell instanceof PlotCell}
      <PlotCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        {mathCellChanged}
        {nonMathCellChanged}
        bind:this={cellElement}
        index={index}
        plotCell={cell}
      />
    {:else if cell instanceof TableCell}
      <TableCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        {mathCellChanged}
        {nonMathCellChanged}
        bind:this={cellElement}
        index={index}
        tableCell={cell}
      />
    {:else if cell instanceof DataTableCell}
      <DataTableCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        {modal}
        {mathCellChanged}
        {nonMathCellChanged}
        bind:this={cellElement}
        index={index}
        dataTableCell={cell}
      />
    {:else if cell instanceof PiecewiseCell}
      <PiecewiseCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        {mathCellChanged}
        bind:this={cellElement}
        index={index}
        piecewiseCell={cell}
      />
    {:else if cell instanceof SystemCell}
      <SystemCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        {mathCellChanged}
        bind:this={cellElement}
        index={index}
        systemCell={cell}
      />
    {:else if cell instanceof FluidCell}
      <FluidCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        {mathCellChanged}
        bind:this={cellElement}
        index={index}
        fluidCell={cell}
      />
    {:else if cell instanceof DeletedCell}
      <DeletedCellElement
        bind:this={cellElement}
        index={index}
        deletedCell={cell}
        {mathCellChanged}
      />
    {:else if cell instanceof InsertCell}
      <InsertCellElement
        {insertSheet}
        {mathCellChanged}
        bind:this={cellElement}
        index={index}
        insertCell={cell}
      />
    {/if}
  </div>

  <div class="controls right">
    <IconButton
      id={`delete-${index}`}
      click={() => {deleteCell(index); mathCellChanged();}}
      title="Delete Cell"
    >
      <TrashCan />
    </IconButton>
  </div>

</div>