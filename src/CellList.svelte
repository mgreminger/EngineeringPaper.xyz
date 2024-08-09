<script lang="ts">
  import { tick } from "svelte";
  import { flip } from "svelte/animate";

  import { cells, results, system_results, activeCell, mathCellChanged } from "./stores";
  import Cell from "./Cell.svelte";
  import ButtonBar from "./ButtonBar.svelte";

  let cellElements: Cell[] = [];
  let dragging = false;
  let draggingSourceIndex: number;
  let draggingSkeleton: HTMLDivElement;
  let skeletonHeight: number;
  let grabOffset: number;
  let scrollingContainer: HTMLElement;
  let sheetBody: HTMLUListElement;

  export async function getMarkdown(): Promise<string> {
    let markdown = "";

    for (const cell of cellElements) {
      if (cell) {
        markdown += await cell.getMarkdown();
      }
    }

    return markdown;
  }

  function startDrag(event) {
    if (!dragging) {
      draggingSourceIndex = event.detail.index; 
      
      scrollingContainer = document.getElementById("main-content");
      const draggingContainer = document.getElementById(`cell-container-${draggingSourceIndex}`);

      if (!(scrollingContainer && draggingContainer)) {
        return;
      }

      $activeCell = -1;

      const draggingContainerRect = draggingContainer.getBoundingClientRect();

      skeletonHeight = Math.min(scrollingContainer.getBoundingClientRect().height/2, 
                                draggingContainerRect.height);

      grabOffset = skeletonHeight / 2.0;
      
      draggingSkeleton.style.top = `${event.detail.clientY-grabOffset}px`;
      draggingSkeleton.style.left = `${draggingContainerRect.left}px`;
      draggingSkeleton.style.height = `${skeletonHeight}px`;
      draggingSkeleton.style.width = `${draggingContainerRect.width}px`;

      dragging = true;

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
    window.removeEventListener("touchmove", dragMove);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchend", stopDrag);
    window.removeEventListener("touchcancel", stopDrag);

    dragging = false;
  }

  function dragMove(event) {
    if (dragging) {
      event.preventDefault(); // prevent scrolling on touch screens

      let clientY: number;
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

      let targetIndex: number | null = null;
      for (let i = 0; i < $cells.length; i++) {
        const container = document.getElementById(`cell-container-${i}`);
        if (container && i !== draggingSourceIndex) {
          const rect = container.getBoundingClientRect();
          if (i === 0 && clientY < rect.top) {
            targetIndex = 0;
            break;
          } else if (i === $cells.length - 1 && clientY > rect.bottom) {
            targetIndex = $cells.length - 1;
            break;
          } else if (draggingSourceIndex < i && clientY >= Math.max(rect.top, rect.bottom - skeletonHeight) && clientY <= rect.bottom) {
            targetIndex = i;
            break;
          } else if (draggingSourceIndex > i && clientY >= rect.top && clientY <= Math.min(rect.bottom, rect.top + skeletonHeight)) {
            targetIndex = i;
            break;
          }
        }
      }

      if (targetIndex !== null && targetIndex !== draggingSourceIndex) {
        if (draggingSourceIndex > targetIndex) {
          $cells = [...$cells.slice(0,targetIndex), $cells[draggingSourceIndex], 
                    ...$cells.slice(targetIndex, draggingSourceIndex),
                    ...$cells.slice(draggingSourceIndex+1)];

          $results = [...$results.slice(0,targetIndex), $results[draggingSourceIndex], 
                      ...$results.slice(targetIndex, draggingSourceIndex),
                      ...$results.slice(draggingSourceIndex+1)];

          $system_results = [...$system_results.slice(0,targetIndex), $system_results[draggingSourceIndex], 
                             ...$system_results.slice(targetIndex, draggingSourceIndex),
                             ...$system_results.slice(draggingSourceIndex+1)];
        } else {
          $cells = [...$cells.slice(0,draggingSourceIndex), 
                    ...$cells.slice(draggingSourceIndex+1, targetIndex+1),          
                    $cells[draggingSourceIndex], 
                    ...$cells.slice(targetIndex+1)];

          $results = [...$results.slice(0,draggingSourceIndex), 
                      ...$results.slice(draggingSourceIndex+1, targetIndex+1),          
                      $results[draggingSourceIndex], 
                      ...$results.slice(targetIndex+1)];

          $system_results = [...$system_results.slice(0,draggingSourceIndex), 
                             ...$system_results.slice(draggingSourceIndex+1, targetIndex+1),          
                             $system_results[draggingSourceIndex], 
                             ...$system_results.slice(targetIndex+1)];
        }

        draggingSourceIndex = targetIndex;

        $mathCellChanged = true;
      }

    }
  }


</script>

<style>
  ul.sheet-body {
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }

  @media print {
    ul.sheet-body {
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
    z-index: 100;
  }
</style>

<div id="dragging-skeleton" class:dragging bind:this={draggingSkeleton}></div>

<ul
  class="sheet-body"
  bind:this={sheetBody}
>
  
  {#each $cells as cell, i (cell.id)}
    <li>
      <ButtonBar on:insertSheet index={i} />
      <div class="outer-container" class:first={i===0} class:last={i===$cells.length-1}
        id={`cell-container-${i}`}
        class:dragging={dragging && draggingSourceIndex === i}
      >
        <Cell
          index={i}
          on:startDrag={startDrag}
          on:insertSheet 
          on:updateNumberFormat
          on:generateCode
          on:insertMathCellAfter
          on:insertInsertCellAfter
          on:modal
          bind:this={cellElements[i]}
        />
      </div>
    </li>
  {/each}
  <li>
    <ButtonBar on:insertSheet index={$cells.length} last={true}/>
  </li>
</ul>

