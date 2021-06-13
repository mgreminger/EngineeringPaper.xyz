<script>
  import { createEventDispatcher } from "svelte";
  import { cells, results, activeCell } from "./stores.js";
  import MathCell from "./MathCell.svelte";
  import DocumentationCell from "./DocumentationCell.svelte";

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
    }
  }

  function deleteCell(index) {
    $cells = $cells.filter((cell,i) => i !== index);
    $results = [];

    if ($activeCell >= $cells.length) {
      $activeCell = $cells.length-1;
    }
  }

  function startDrag(event) {
    dispatch('startDrag', {
      clientY: event.clientY,
      id: $cells[index].data.id,
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

  .skeleton {
    border-style: solid; 
    border-width: 2px;
    border-color: lightgray;
    background-color:ghostwhite;
  }

</style>

<div class="container" bind:this={container}>
  <div class="controls left">
    <button id="{`up-${index}`}" on:click={()=>moveUp(index)} title="Move Cell Up">
      <div class="icon">
        <ChevronUp16 />
      </div>
    </button>
    <button on:mousedown={startDrag} class="handle" title="Drag to Move Cell">
      <div class="icon">
        <Draggable16 />
      </div>
    </button>
    <button id="{`down-${index}`}" on:click={()=>moveDown(index)} title="Move Cell Down">
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
    {:else if $cells[index].data.type === "skeleton"}
      <div class="skeleton" style="height: {$cells[index].data.height}px"></div>
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