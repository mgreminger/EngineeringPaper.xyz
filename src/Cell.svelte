<script>
  import { createEventDispatcher } from "svelte";
  import { cells, results, activeCell, mathCellChanged } from "./stores.js";
  import MathCell from "./MathCell.svelte";
  import DocumentationCell from "./DocumentationCell.svelte";
  import PlotCell from "./PlotCell.svelte";

  import TrashCan16 from "carbon-icons-svelte/lib/TrashCan16";
  import ChevronUp16 from "carbon-icons-svelte/lib/ChevronUp16";
  import ChevronDown16 from "carbon-icons-svelte/lib/ChevronDown16";
  import Draggable16 from "carbon-icons-svelte/lib/Draggable16";

  export let index;
  export let container = null;

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

  function deleteCell(index) {
    $cells.splice(index,1);
    $cells = $cells; // force reactivity with the svelte store
    $results = [];

    if ($activeCell >= $cells.length) {
      $activeCell = $cells.length-1;
    }

    $mathCellChanged = true;
  }

  function startDrag(event) {
    dispatch('startDrag', {
      clientY: event.clientY,
      index: index
    });
  }


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

  button:focus {
    box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
    border-color: #709AC0;
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
    flex-direction: column;
  }

  .controls.left {
    padding-right: 20px;
  }

  .controls.right {
    padding-left: 20px;
  }

  .content {
    flex: 1;
  }

  :global(div.outer-container:not(.dragging)) .handle {
    cursor:grab;
  }

  :global(div.first button.up, div.last button.down) {
    visibility: hidden;
  }

</style>

<div class="container" bind:this={container}>
  <div class="controls left">
    <button class="up" id="{`up-${index}`}" on:click={()=>moveUp(index)} title="Move Cell Up">
      <div class="icon">
        <ChevronUp16 />
      </div>
    </button>
    <button on:mousedown={startDrag} class="handle" title="Drag to Move Cell">
      <div class="icon">
        <Draggable16 />
      </div>
    </button>
    <button class="down" id="{`down-${index}`}" on:click={()=>moveDown(index)} title="Move Cell Down">
      <div class="icon">
        <ChevronDown16 />
      </div>
    </button>
  </div>

  <div class="content">
    {#if $cells[index].data.type === "math"}
      <MathCell index={index}/>
    {:else if $cells[index].data.type === "documentation"}
      <DocumentationCell index={index}/>
    {:else if $cells[index].data.type === "plot"}
      <PlotCell index={index}/>
    {/if}
  </div>

  <div class="controls right">
    <button id="{`delete-${index}`}" on:click={()=>deleteCell(index)} title="Delete Cell">
      <div class="icon">
        <TrashCan16 />
      </div>
    </button>
  </div>

</div>