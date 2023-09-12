<script>
  import { createEventDispatcher } from "svelte";
  import { cells, results, activeCell, mathCellChanged, handleClickInCell, deleteCell } from "./stores.ts";
  import MathCell from "./MathCell.svelte";
  import DocumentationCell from "./DocumentationCell.svelte";
  import PlotCell from "./PlotCell.svelte";
  import TableCell from "./TableCell.svelte";
  import PiecewiseCell from "./PiecewiseCell.svelte";
  import SystemCell from "./SystemCell.svelte";
  import DeletedCell from "./DeletedCell.svelte";
  import InsertCell from "./InsertCell.svelte";

  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import ChevronUp from "carbon-icons-svelte/lib/ChevronUp.svelte";
  import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";
  import Draggable from "carbon-icons-svelte/lib/Draggable.svelte";
  import IconButton from "./IconButton.svelte";

  export let index;
  export let container = null;

  let selected = false;
  let contentDiv = null;

  const dispatch = createEventDispatcher();

  function moveUp(index) {
    if (index > 0) {
      let newCells = $cells.slice(0,index-1);
      newCells.push($cells[index]);
      newCells.push($cells[index-1]);
      newCells = newCells.concat($cells.slice(index+1, $cells.length+1));
      $cells = newCells;

      $results = [];

      if (index === $activeCell) {
        $activeCell--;
      }

      $mathCellChanged = true;
    }
  }

  function moveDown(index) {
    if (index < $cells.length-1) {
      let newCells = $cells.slice(0, index);
      newCells.push($cells[index+1]);
      newCells.push($cells[index]);
      newCells = newCells.concat($cells.slice(index+2, $cells.length+1));
      $cells = newCells;

      $results = [];

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

<div class="container" bind:this={container}>
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
    {#if $cells[index]?.type === "math"}
      <MathCell on:updateNumberFormat on:generateCode index={index} mathCell={$cells[index]}/>
    {:else if $cells[index]?.type === "documentation"}
      <DocumentationCell index={index} documentationCell={$cells[index]}/>
    {:else if $cells[index]?.type === "plot"}
      <PlotCell index={index} plotCell={$cells[index]}/>
    {:else if $cells[index]?.type === "table"}
      <TableCell index={index} tableCell={$cells[index]}/>
    {:else if $cells[index]?.type === "piecewise"}
      <PiecewiseCell index={index} piecewiseCell={$cells[index]}/>
    {:else if $cells[index]?.type === "system"}
      <SystemCell index={index} systemCell={$cells[index]}/>
    {:else if $cells[index]?.type === "deleted"}
      <DeletedCell index={index} deletedCell={$cells[index]}/>
    {:else if $cells[index]?.type === "insert"}
      <InsertCell on:insertSheet index={index} insertCell={$cells[index]}/>
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