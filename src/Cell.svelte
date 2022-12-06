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

  export let index;
  export let container = null;

  let selected = false;
  let pointerDown = false;
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


  function handlePointerDown(e) {
    pointerDown = true;
  }

  function handleFocusIn() {
    // only recognize focus if it was not triggered by mouse
    // this covers case where someone tabs cell element into focus
    if (!pointerDown) {
      handleClickInCell(index);
    }
  }

  $: selected = ($activeCell === index)

</script>

<style>
  button {
    background: none;
    border: none;
    border-radius: 50%;
    position: relative;
    width: 20px;
    height: 20px;

    cursor: inherit;
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


  .container {
    display: flex;
    align-items: center;
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
    border-radius: 10px;
  }

  .content.selected {
    border: 2px solid lightgray;
  }

  :global(div.outer-container:not(.dragging)) .handle {
    cursor:grab;
  }

  :global(div.first button.up, div.last button.down) {
    visibility: hidden;
  }

  @media (max-width: 500px) {
    button.up, button.down {
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
    <button class="up" id="{`up-${index}`}" on:click={()=>moveUp(index)} title="Move Cell Up">
      <div class="icon">
        <ChevronUp />
      </div>
    </button>
    <button
      class="handle"
      title="Drag to Move Cell"
      on:mousedown={startDrag}
      on:touchstart|nonpassive={startDrag}
    >
      <div class="icon">
        <Draggable />
      </div>
    </button>
    <button class="down" id="{`down-${index}`}" on:click={()=>moveDown(index)} title="Move Cell Down">
      <div class="icon">
        <ChevronDown />
      </div>
    </button>
  </div>

  <div
    class="content" class:selected
    id={`cell-${index}`}
    on:click={() => handleClickInCell(index)}
    on:focusin={handleFocusIn}
    on:pointerdown={handlePointerDown}
    on:pointerup={() => pointerDown = false}
    bind:this={contentDiv}
  >
    {#if $cells[index].type === "math"}
      <MathCell index={index} mathCell={$cells[index]}/>
    {:else if $cells[index].type === "documentation"}
      <DocumentationCell index={index} documentationCell={$cells[index]}/>
    {:else if $cells[index].type === "plot"}
      <PlotCell index={index} plotCell={$cells[index]}/>
    {:else if $cells[index].type === "table"}
      <TableCell index={index} tableCell={$cells[index]}/>
    {:else if $cells[index].type === "piecewise"}
      <PiecewiseCell index={index} piecewiseCell={$cells[index]}/>
    {:else if $cells[index].type === "system"}
      <SystemCell index={index} systemCell={$cells[index]}/>
    {:else if $cells[index].type === "deleted"}
      <DeletedCell index={index} deletedCell={$cells[index]}/>
    {:else if $cells[index].type === "insert"}
      <InsertCell index={index} insertCell={$cells[index]}/>
    {/if}
  </div>

  <div class="controls right">
    <button id="{`delete-${index}`}" on:click={()=>deleteCell(index)} title="Delete Cell">
      <div class="icon">
        <TrashCan />
      </div>
    </button>
  </div>

</div>