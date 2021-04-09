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
  .container {
    display: flex;
  }

  .controls {
    display: flex;
  }

  .controls > * {
    align-self: flex-start;
  }

  .content {
    flex: 1;
  }

  :global(div.outer-container:not(.dragging)) .handle {
    cursor:grab;
  }

  .skeleton {
    border-style: solid; 
  }

</style>

<div class="container" bind:this={container}>
  <div class="controls">
    <span on:mousedown={startDrag} class="handle">
      <Draggable16 />
    </span>
    <button id="{`delete-${index}`}" on:click={()=>deleteCell(index)}><TrashCan16 /></button>
    <button id="{`up-${index}`}" on:click={()=>moveUp(index)}><ChevronUp16 /></button>
    <button id="{`down-${index}`}" on:click={()=>moveDown(index)}><ChevronDown16 /></button>
  </div>

  <div class="content">
    {#if $cells[index].data.type === "math"}
      <MathCell index={index}/>
    {:else if $cells[index].data.type === "documentation"}
      <DocumentationCell index={index}/>
    {:else if $cells[index].data.type === "skeleton"}
      <div class="skeleton" style="height: {$cells[index].data.height}px" />
    {/if}
  </div>

</div>