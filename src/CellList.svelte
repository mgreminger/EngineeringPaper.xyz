<script>
  import { tick } from "svelte";
  import { cells, results, activeCell } from "./stores.js";
  import Cell from "./Cell.svelte";
  import ButtonBar from "./ButtonBar.svelte";

  let containers = [];
  let dragging = false;
  let skeletonIndex;
  let draggingSourceId;
  let draggingContainer;
  let grabOffset;

  async function startDrag(event) {
    if (!dragging) {
      draggingContainer = containers[event.detail.index];
      
      grabOffset = event.detail.clientY - draggingContainer.getBoundingClientRect().top;
      
      $activeCell = -1;
      await tick();

      draggingSourceId = event.detail.id;

      skeletonIndex = event.detail.index;

      $cells = [...$cells.slice(0,event.detail.index), 
                {data: {id:-1, type: 'skeleton', height: draggingContainer.clientHeight}},
                ...$cells.slice(event.detail.index, $cells.length)];  

      dragging = true;
      draggingContainer.style.position = "absolute";
      document.body.style.cursor = "grabbing";
      
      window.addEventListener('mousemove', dragMove);
      window.addEventListener("mouseup", stopDrag);
    }
  }

  function stopDrag(event) {
    document.body.style.cursor = "auto";
    draggingContainer.style.position = "static";
    draggingContainer.style.top = null;
    window.removeEventListener("mousemove", dragMove);
    window.removeEventListener("mouseup", stopDrag);

    const sourceIndex = $cells.map(cell => cell.data.id === draggingSourceId).indexOf(true);

    // swap skeleton with this cell and then remove the skeleton
    [$cells[skeletonIndex], $cells[sourceIndex]] = [$cells[sourceIndex], $cells[skeletonIndex]];
    $cells = $cells.filter(cell => cell.data.type !==  "skeleton");

    $results = [];

    dragging = false;
  }

  function dragMove(event) {
    if (dragging) {
      draggingContainer.style.top = `${event.clientY-grabOffset+window.scrollY}px`;

      let targetIndex = null;
      for (const [i, container] of containers.entries()) {
        if (container && container !== draggingContainer) {
          const rect = container.getBoundingClientRect()
          if (event.clientY > rect.top && event.clientY < rect.bottom) {
            targetIndex = i;
            
            if (targetIndex !== skeletonIndex) {
              if (event.clientY < 0.5*(rect.bottom + rect.top)) {
                if (skeletonIndex === targetIndex - 1) {
                  // already moved above this element, need to prevent swapping
                  targetIndex = skeletonIndex;
                }
              } else {
                targetIndex = i < $cells.length - 1 ? i + 1 : i 
              }
            }

            break;
          }
        }
      }

      if (targetIndex !== null) {
        if (targetIndex !== skeletonIndex) {
          // can't jump more than one cell at a time or order will be changed before drop
          if (targetIndex - skeletonIndex > 1) {
            targetIndex = skeletonIndex + 1;
          } else if (skeletonIndex - targetIndex > 1) {
            targetIndex = skeletonIndex - 1;
          }

          // update skeleton location
          [$cells[skeletonIndex], $cells[targetIndex]] = [$cells[targetIndex], $cells[skeletonIndex]];
          skeletonIndex = targetIndex
        }
      }

    }
  }


</script>

<style>
  div.sheet-body {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="sheet-body">
  
  {#each $cells as cell, i (cell.data.id)}
    <ButtonBar index={i} />
    <div class="outer-container" bind:this={containers[i]} class:dragging>
      <Cell index={i} on:startDrag={startDrag} />
    </div>
  {/each}
  <ButtonBar index={$cells.length} />
</div>
