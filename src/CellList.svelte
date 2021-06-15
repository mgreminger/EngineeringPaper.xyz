<script>
  import { tick } from "svelte";
  import { flip } from "svelte/animate";

  import { cells, results, activeCell, prefersReducedMotion } from "./stores.js";
  import Cell from "./Cell.svelte";
  import ButtonBar from "./ButtonBar.svelte";

  let containers = [];
  let dragging = false;
  let draggingSourceIndex;
  let draggingContainer;
  let draggingSkeleton;
  let grabOffset;

  async function startDrag(event) {
    if (!dragging) {
      draggingContainer = containers[event.detail.index];

      $activeCell = -1;
      await tick();

      grabOffset = event.detail.clientY - draggingContainer.getBoundingClientRect().top;

      grabOffset = draggingContainer.getBoundingClientRect().height / 2.0;
      
      draggingSkeleton.style.top = `${event.detail.clientY-grabOffset+window.scrollY}px`;
      draggingSkeleton.style.left = `${draggingContainer.getBoundingClientRect().left}px`;
      draggingSkeleton.style.height = `${draggingContainer.getBoundingClientRect().height}px`;
      draggingSkeleton.style.width = `${draggingContainer.getBoundingClientRect().width}px`;

      dragging = true;

      draggingSourceIndex = event.detail.index; 

      document.body.style.cursor = "grabbing";
      
      window.addEventListener('mousemove', dragMove);
      window.addEventListener("mouseup", stopDrag);
    }
  }

  function stopDrag(event) {
    document.body.style.cursor = "auto";

    window.removeEventListener("mousemove", dragMove);
    window.removeEventListener("mouseup", stopDrag);

    dragging = false;
  }

  function dragMove(event) {
    if (dragging) {
      draggingSkeleton.style.top = `${event.clientY-grabOffset+window.scrollY}px`;
      draggingSkeleton.scrollIntoView({behaviour: "smooth", block: "nearest", inline: "nearest"});

      let targetIndex = null;
      for (const [i, container] of containers.entries()) {
        if (container && container !== draggingContainer) {
          const rect = container.getBoundingClientRect()
          if (event.clientY > rect.top && event.clientY < rect.bottom) {
            targetIndex = i;
            
            if (targetIndex !== draggingSourceIndex) {
              if (event.clientY < 0.5*(rect.bottom + rect.top)) {
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

          // update cell location
          [$cells[draggingSourceIndex], $cells[targetIndex]] = [$cells[targetIndex], $cells[draggingSourceIndex]];
          draggingSourceIndex = targetIndex
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
    position: absolute;
  }
</style>

<div id="dragging-skeleton" class:dragging bind:this={draggingSkeleton}></div>

<div class="sheet-body">
  
  {#each $cells as cell, i (cell.data.id)}
    <div animate:flip={$prefersReducedMotion ? {duration: 0} : {duration: 200}}>
      <ButtonBar index={i} />
      <div class="outer-container" class:first={i===0} class:last={i===$cells.length-1}
        bind:this={containers[i]}
        class:dragging={dragging && draggingSourceIndex === i}
      >
        <Cell index={i} on:startDrag={startDrag} />
      </div>
    </div>
  {/each}
  <ButtonBar index={$cells.length} last={true}/>  
</div>

