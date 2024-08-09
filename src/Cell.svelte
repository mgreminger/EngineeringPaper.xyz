<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { cells, results, system_results, activeCell, 
           mathCellChanged, handleClickInCell, deleteCell } from "./stores";
  import type { Cell } from './cells/Cells';
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

  import MathCell from "./cells/MathCell";
  import PlotCell from "./cells/PlotCell";
  import TableCell from "./cells/TableCell";
  import DataTableCell from "./cells/DataTableCell";
  import DocumentationCell from "./cells/DocumentationCell";
  import PiecewiseCell from "./cells/PiecewiseCell";
  import SystemCell from "./cells/SystemCell";
  import DeletedCell from "./cells/DeletedCell";
  import InsertCell from "./cells/InsertCell";
  import FluidCell from "./cells/FluidCell";

  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import ChevronUp from "carbon-icons-svelte/lib/ChevronUp.svelte";
  import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";
  import Draggable from "carbon-icons-svelte/lib/Draggable.svelte";
  import IconButton from "./IconButton.svelte";

  export let index: number;

  let selected = false;
  let contentDiv: HTMLDivElement;
  let cell: Cell;

  let cellElement: MathCellElement | DocumentationCellElement | PlotCellElement | 
                   TableCellElement | PiecewiseCellElement | 
                   SystemCellElement | DeletedCellElement | InsertCellElement |
                   FluidCellElement | DataTableCellElement;

  const dispatch = createEventDispatcher();

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

  function startDrag(event) {
    event.currentTarget.focus();
    event.preventDefault();

    let clientY;
    if (event.type === "touchstart") {
      clientY = event.changedTouches[0].clientY;
    } else {
      clientY = event.clientY;
    }


    dispatch('startDrag', {
      clientY: clientY,
      index: index
    });
  }

  $: cell = $cells[index];

  $: if ($activeCell === index) {
    selected = true;
  } else {
    selected = false;
    if (contentDiv && contentDiv.contains(document.activeElement) &&
        document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
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
        id="{`up-${index}`}"
        on:click={()=>moveUp(index)}
        title="Move Cell Up"
      >
        <ChevronUp />
      </IconButton>
    </span>
    <span
      role="none"
      class="handle button-container"
      on:mousedown={startDrag}
      on:touchstart|nonpassive={startDrag}
    >
      <IconButton
        title="Drag to Move Cell"
      >
        <Draggable />
      </IconButton>
    </span>
    <span class="down button-container">
      <IconButton        
        id="{`down-${index}`}"
        on:click={()=>moveDown(index)}
        title="Move Cell Down"
      >
        <ChevronDown />
      </IconButton>
    </span>
  </div>

  <!-- The static element action to select is cell is made available through the keyboard shortcuts
       of Ctrl+ArrowUp and Ctrl+ArrowDown -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->

  <div
    class="content" class:selected
    id={`cell-${index}`}
    on:click|capture={() => handleClickInCell(index)}
    on:focusin={() => handleClickInCell(index)}
    bind:this={contentDiv}
  >
    {#if cell instanceof MathCell}
      <MathCellElement
        on:updateNumberFormat
        on:generateCode
        on:insertMathCellAfter
        on:insertInsertCellAfter
        bind:this={cellElement}
        index={index}
        mathCell={cell}
      />
    {:else if cell instanceof DocumentationCell}
      <DocumentationCellElement
        on:insertMathCellAfter
        on:insertInsertCellAfter
        bind:this={cellElement}
        index={index}
        documentationCell={cell}
      />
    {:else if cell instanceof PlotCell}
      <PlotCellElement
        on:insertMathCellAfter
        on:insertInsertCellAfter
        bind:this={cellElement}
        index={index}
        plotCell={cell}
      />
    {:else if cell instanceof TableCell}
      <TableCellElement
        on:insertMathCellAfter
        on:insertInsertCellAfter
        bind:this={cellElement}
        index={index}
        tableCell={cell}
      />
    {:else if cell instanceof DataTableCell}
      <DataTableCellElement
        on:insertMathCellAfter
        on:insertInsertCellAfter
        on:modal
        bind:this={cellElement}
        index={index}
        dataTableCell={cell}
      />
    {:else if cell instanceof PiecewiseCell}
      <PiecewiseCellElement
        on:insertMathCellAfter
        on:insertInsertCellAfter
        bind:this={cellElement}
        index={index}
        piecewiseCell={cell}
      />
    {:else if cell instanceof SystemCell}
      <SystemCellElement
        on:insertMathCellAfter
        on:insertInsertCellAfter
        bind:this={cellElement}
        index={index}
        systemCell={cell}
      />
    {:else if cell instanceof FluidCell}
      <FluidCellElement
        on:insertMathCellAfter
        on:insertInsertCellAfter
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
        on:insertSheet
        bind:this={cellElement}
        index={index}
        insertCell={cell}
      />
    {/if}
  </div>

  <div class="controls right">
    <IconButton
      id="{`delete-${index}`}"
      on:click={()=>deleteCell(index)}
      title="Delete Cell"
    >
      <TrashCan />
    </IconButton>
  </div>

</div>