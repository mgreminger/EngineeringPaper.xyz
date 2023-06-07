<script>
  import { tick } from "svelte";
  import { flip } from "svelte/animate";

  import { cells, results, activeCell, prefersReducedMotion, mathCellChanged } from "./stores.ts";
  import Cell from "./Cell.svelte";
  import ButtonBar from "./ButtonBar.svelte";

  let containers = [];
  let dragging = false;
  let draggingSourceIndex;
  let draggingContainer;
  let draggingSkeleton;
  let grabOffset;
  let scrollingContainer;
  let sheetBody;

  async function startDrag(event) {
    if (!dragging) {
      scrollingContainer = document.getElementById("main-content");

      draggingContainer = containers[event.detail.index];

      $activeCell = -1;
      await tick();

      const skeletonHeight = Math.min(scrollingContainer.getBoundingClientRect().height/2, 
                                      draggingContainer.getBoundingClientRect().height);

      grabOffset = skeletonHeight / 2.0;
      
      draggingSkeleton.style.top = `${event.detail.clientY-grabOffset}px`;
      draggingSkeleton.style.left = `${draggingContainer.getBoundingClientRect().left}px`;
      draggingSkeleton.style.height = `${skeletonHeight}px`;
      draggingSkeleton.style.width = `${draggingContainer.getBoundingClientRect().width}px`;

      dragging = true;

      draggingSourceIndex = event.detail.index; 

      document.body.style.cursor = "grabbing";

      window.addEventListener("mousemove", dragMove);
      window.addEventListener("touchmove", dragMove, {passive: false});
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchend", stopDrag);
      window.addEventListener("touchcancel", stopDrag);
    }
  }

  function stopDrag(event) {
    document.body.style.cursor = "auto";

    window.removeEventListener("mousemove", dragMove);
    window.removeEventListener("touchmove", dragMove, {passive: false});
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchend", stopDrag);
    window.removeEventListener("touchcancel", stopDrag);

    dragging = false;
  }

  function dragMove(event) {
    if (dragging) {
      event.preventDefault(); // prevent scrolling on touch screens

      let clientY;
      if (event.type === "touchmove") {
        clientY = event.changedTouches[0].clientY;
      } else {
        clientY = event.clientY;
      }

      draggingSkeleton.style.top = `${clientY-grabOffset}px`;

      const scrollRect = scrollingContainer.getBoundingClientRect();
      const skeletonRect = draggingSkeleton.getBoundingClientRect();

      if (skeletonRect.top < scrollRect.top) {
        scrollingContainer.scroll(0, scrollingContainer.scrollTop - (scrollRect.top - skeletonRect.top));
      } else if (skeletonRect.bottom > scrollRect.bottom) {
        scrollingContainer.scroll(0, scrollingContainer.scrollTop + (skeletonRect.bottom - scrollRect.bottom));
      }

      let targetIndex = null;
      for (const [i, container] of containers.entries()) {
        if (container && container !== draggingContainer) {
          const rect = container.getBoundingClientRect()
          if (clientY > rect.top && clientY < rect.bottom) {
            targetIndex = i;
            
            if (targetIndex !== draggingSourceIndex) {
              if (clientY < 0.5*(rect.bottom + rect.top)) {
                if (draggingSourceIndex === targetIndex - 1) {
                  // already moved above this element, need to prevent swapping
                  targetIndex = draggingSourceIndex;
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
        if (targetIndex !== draggingSourceIndex) {
          // can't jump more than one cell at a time or order will be changed before drop
          if (targetIndex - draggingSourceIndex > 1) {
            targetIndex = draggingSourceIndex + 1;
          } else if (draggingSourceIndex - targetIndex > 1) {
            targetIndex = draggingSourceIndex - 1;
          }

          // Update cell location
          // Need to make a shallow copy of $cells since destructuring assignment
          // cannont be used on a reactive array.
          let newCells = [...$cells];
          [newCells[draggingSourceIndex], newCells[targetIndex]] = [newCells[targetIndex], newCells[draggingSourceIndex]];
          $cells = newCells;

          draggingSourceIndex = targetIndex

          $results = [];
          $mathCellChanged = true;
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

  @media print {
    div.sheet-body {
      display: block;
    }
  }

  div.outer-container {
    border-radius: 10px;
  }

  div.outer-container.dragging {
    background: whitesmoke;
  }

  #dragging-skeleton:not(.dragging) {
    display: none;
  }

  #dragging-skeleton.dragging {
    border: 2px solid lightgray;
    border-radius: 10px;
    position: fixed;
  }
</style>

<div id="dragging-skeleton" class:dragging bind:this={draggingSkeleton}></div>

<div class="sheet-body" bind:this={sheetBody}>
  
  {#each $cells as cell, i (cell.id)}
    <div>
      <ButtonBar on:insertSheet index={i} />
      <div class="outer-container" class:first={i===0} class:last={i===$cells.length-1}
        bind:this={containers[i]}
        class:dragging={dragging && draggingSourceIndex === i}
      >
        <Cell
          index={i}
          on:startDrag={startDrag}
          on:insertSheet 
          on:updateNumberFormat
        />
      </div>
    </div>
  {/each}
  <ButtonBar on:insertSheet index={$cells.length} last={true}/>  
</div>

