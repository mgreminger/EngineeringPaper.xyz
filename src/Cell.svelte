<script>
  import { tick } from "svelte";
  import { cells, results, activeCell, dragging, skeletonIndex, draggingSource} from "./stores.js";
  import MathCell from "./MathCell.svelte";
  import DocumentationCell from "./DocumentationCell.svelte";

  import TrashCan16 from "carbon-icons-svelte/lib/TrashCan16";
  import ChevronUp16 from "carbon-icons-svelte/lib/ChevronUp16";
  import ChevronDown16 from "carbon-icons-svelte/lib/ChevronDown16";
  import Draggable16 from "carbon-icons-svelte/lib/Draggable16";

  export let index;

  let container;
  let grabOffset;

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

  async function startDrag(event) {
    if (!$dragging) {
      grabOffset = event.clientY - container.getBoundingClientRect().top;

      $activeCell = -1;
      await tick();

      $dragging = true;
      $draggingSource = index;

      document.body.style.cursor = "grabbing";
      container.style.position = "absolute";
      window.addEventListener('mousemove', dragMove);
      window.addEventListener("mouseup", stopDrag);
      $skeletonIndex = index;

      $cells = [...$cells.slice(0,index),
                {data: {id:-1, type: 'skeleton', height: container.clientHeight}},
                ...$cells.slice(index, $cells.length)];
      index = index + 1;
    }
  }

  function stopDrag(event) {
    document.body.style.cursor = "auto";
    container.style.position = "static";
    window.removeEventListener("mousemove", dragMove);
    window.removeEventListener("mouseup", stopDrag);

    // swap skeleton with this cell and then remove the skeleton
    [$cells[$skeletonIndex], $cells[index]] = [$cells[index], $cells[$skeletonIndex]];
    $cells = $cells.filter(cell => cell.data.type !==  "skeleton");

    if (index > $skeletonIndex) {
      index = $skeletonIndex;
    } else {
      index = $skeletonIndex -1;
    }

    $results = [];

    $dragging = false;
  }

  function dragMove(event) {
    container.style.top = `${event.clientY-grabOffset}px`;
  }

  function dragOver(event) {
    if ($dragging) {
      if (index !== $draggingSource) {
        if ($cells[index].data.type !== "skeleton" &&
            $skeletonIndex !== index) {
          const rect = container.getBoundingClientRect()
          if (event.clientY > rect.top &&
              event.clientY < rect.bottom) {
            // swap with skeleton
            [$cells[$skeletonIndex], $cells[index]] = [$cells[index], $cells[$skeletonIndex]];
            [$skeletonIndex, index] = [index, $skeletonIndex] 
          }
        }
      }
    }
  }

</script>

<style>
  .container {
    display: flex;
  }

  .content {
    flex: 1;
  }

  .handle {
    cursor:grab;
  }

  .skeleton {
    border-style: solid; 
  }

</style>

<div class="container" bind:this={container} on:mousemove={dragOver}>
  <div class="controls">
    <span class:handle="{!$dragging}" on:mousedown={startDrag}>
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