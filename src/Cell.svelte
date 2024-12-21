<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { cells, results, system_results, activeCell, 
           mathCellChanged, handleClickInCell, deleteCell } from "./stores";
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
  import PlotCell from "./cells/PlotCell";
  import TableCell from "./cells/TableCell";
  import DataTableCell from "./cells/DataTableCell";
  import DocumentationCell from "./cells/DocumentationCell.svelte";
  import PiecewiseCell from "./cells/PiecewiseCell.svelte";
  import SystemCell from "./cells/SystemCell.svelte";
  import DeletedCell from "./cells/DeletedCell";
  import InsertCell from "./cells/InsertCell";
  import FluidCell from "./cells/FluidCell";

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
  }

  let {
    index,
    updateNumberFormat,
    generateCode,
    insertMathCellAfter,
    insertInsertCellAfter,
    modal,
    startDrag,
    insertSheet
  }: Props = $props();

  let cell = $derived($cells[index]);
  let selected = $derived($activeCell === index);

  let contentDiv: HTMLDivElement;
  let dragHandleElement: HTMLSpanElement;

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
      $cells = [...$cells.slice(0,index-1), $cells[index], $cells[index-1], ...$cells.slice(index+1, $cells.length+1)];
      $results = [...$results.slice(0,index-1), $results[index], $results[index-1], ...$results.slice(index+1, $cells.length+1)];
      $system_results = [...$system_results.slice(0,index-1), $system_results[index], $system_results[index-1], ...$system_results.slice(index+1, $cells.length+1)];

      if (index === $activeCell) {
        $activeCell--;
      }

      $mathCellChanged = true;
    }
  }

  function moveDown(index) {
    if (index < $cells.length-1) {
      $cells = [...$cells.slice(0, index), $cells[index+1], $cells[index], ...$cells.slice(index+2, $cells.length+1)];
      $results = [...$results.slice(0, index), $results[index+1], $results[index], ...$results.slice(index+2, $cells.length+1)];
      $system_results = [...$system_results.slice(0, index), $system_results[index+1], $system_results[index], ...$system_results.slice(index+2, $cells.length+1)];

      if (index === $activeCell) {
        $activeCell++;
      }

      $mathCellChanged = true;
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
        bind:this={cellElement}
        index={index}
        mathCell={cell}
      />
    {:else if cell instanceof DocumentationCell}
      <DocumentationCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        bind:this={cellElement}
        index={index}
        documentationCell={cell}
      />
    {:else if cell instanceof PlotCell}
      <PlotCellElement
        on:insertMathCellAfter={insertMathCellAfter}
        on:insertInsertCellAfter={insertInsertCellAfter}
        bind:this={cellElement}
        index={index}
        plotCell={cell}
      />
    {:else if cell instanceof TableCell}
      <TableCellElement
        on:insertMathCellAfter={insertMathCellAfter}
        on:insertInsertCellAfter={insertInsertCellAfter}
        bind:this={cellElement}
        index={index}
        tableCell={cell}
      />
    {:else if cell instanceof DataTableCell}
      <DataTableCellElement
        on:insertMathCellAfter={insertMathCellAfter}
        on:insertInsertCellAfter={insertInsertCellAfter}
        on:modal={modal}
        bind:this={cellElement}
        index={index}
        dataTableCell={cell}
      />
    {:else if cell instanceof PiecewiseCell}
      <PiecewiseCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        bind:this={cellElement}
        index={index}
        piecewiseCell={cell}
      />
    {:else if cell instanceof SystemCell}
      <SystemCellElement
        {insertMathCellAfter}
        {insertInsertCellAfter}
        bind:this={cellElement}
        index={index}
        systemCell={cell}
      />
    {:else if cell instanceof FluidCell}
      <FluidCellElement
        on:insertMathCellAfter={insertMathCellAfter}
        on:insertInsertCellAfter={insertInsertCellAfter}
        bind:this={cellElement}
        index={index}
        fluidCell={cell}
      />
    {:else if cell instanceof DeletedCell}
      <DeletedCellElement
        bind:this={cellElement}
        index={index}
        deletedCell={cell}
      />
    {:else if cell instanceof InsertCell}
      <InsertCellElement
        on:insertSheet={insertSheet}
        bind:this={cellElement}
        index={index}
        insertCell={cell}
      />
    {/if}
  </div>

  <div class="controls right">
    <IconButton
      id={`delete-${index}`}
      click={()=>deleteCell(index)}
      title="Delete Cell"
    >
      <TrashCan />
    </IconButton>
  </div>

</div>