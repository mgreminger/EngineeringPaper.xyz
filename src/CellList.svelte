<script lang="ts">
  import type { ModalInfo } from "./types";
  import MathCell from "./cells/MathCell.svelte";
  import type { MathCellConfig } from "./sheet/Sheet";
  import appState from "./stores.svelte";
  import Cell from "./Cell.svelte";
  import ButtonBar from "./ButtonBar.svelte";

  interface Props {
    updateNumberFormat: (arg: {detail: {mathCell: MathCell, setNumberConfig: (input: MathCellConfig) => void}}) => void;
    insertSheet: (arg: {detail: {index: number}}) => void;
    generateCode: (arg: {detail: {index: number}}) => void;
    insertMathCellAfter: (arg: {detail: {index: number}}) => void;
    insertInsertCellAfter: (arg: {detail: {index: number}}) => void;
    modal: (arg: {detail: {modalInfo: ModalInfo}}) => void;
    mathCellChanged: () => void;
    nonMathCellChanged: () => void;
  }

  let { 
    updateNumberFormat,
    insertSheet,
    generateCode,
    insertMathCellAfter,
    insertInsertCellAfter,
    modal,
    mathCellChanged,
    nonMathCellChanged
  }: Props = $props(); 

  let cellElements: Cell[] = [];
  let dragging = $state(false);
  let draggingSourceIndex: number = $state();
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

      appState.activeCell = -1;

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
      for (let i = 0; i < appState.cells.length; i++) {
        const container = document.getElementById(`cell-container-${i}`);
        if (container && i !== draggingSourceIndex) {
          const rect = container.getBoundingClientRect();
          if (i === 0 && clientY < rect.top) {
            targetIndex = 0;
            break;
          } else if (i === appState.cells.length - 1 && clientY > rect.bottom) {
            targetIndex = appState.cells.length - 1;
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
          appState.cells = [...appState.cells.slice(0,targetIndex), appState.cells[draggingSourceIndex], 
                    ...appState.cells.slice(targetIndex, draggingSourceIndex),
                    ...appState.cells.slice(draggingSourceIndex+1)];

          appState.results = [...appState.results.slice(0,targetIndex), appState.results[draggingSourceIndex], 
                      ...appState.results.slice(targetIndex, draggingSourceIndex),
                      ...appState.results.slice(draggingSourceIndex+1)];

          appState.system_results = [...appState.system_results.slice(0,targetIndex), appState.system_results[draggingSourceIndex], 
                             ...appState.system_results.slice(targetIndex, draggingSourceIndex),
                             ...appState.system_results.slice(draggingSourceIndex+1)];
        } else {
          appState.cells = [...appState.cells.slice(0,draggingSourceIndex), 
                    ...appState.cells.slice(draggingSourceIndex+1, targetIndex+1),          
                    appState.cells[draggingSourceIndex], 
                    ...appState.cells.slice(targetIndex+1)];

          appState.results = [...appState.results.slice(0,draggingSourceIndex), 
                      ...appState.results.slice(draggingSourceIndex+1, targetIndex+1),          
                      appState.results[draggingSourceIndex], 
                      ...appState.results.slice(targetIndex+1)];

          appState.system_results = [...appState.system_results.slice(0,draggingSourceIndex), 
                             ...appState.system_results.slice(draggingSourceIndex+1, targetIndex+1),          
                             appState.system_results[draggingSourceIndex], 
                             ...appState.system_results.slice(targetIndex+1)];
        }

        draggingSourceIndex = targetIndex;

        mathCellChanged();
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
  {#each appState.cells as cell, i (cell.id)}
    <li>
      <ButtonBar 
        {insertSheet}
        {mathCellChanged}
        index={i} 
      />
      <div class="outer-container" class:first={i===0} class:last={i===appState.cells.length-1}
        id={`cell-container-${i}`}
        class:dragging={dragging && draggingSourceIndex === i}
      >
        <Cell
          index={i}
          startDrag={startDrag}
          {insertSheet}
          {updateNumberFormat}
          {generateCode}
          {insertMathCellAfter}
          {insertInsertCellAfter}
          {modal}
          {mathCellChanged}
          {nonMathCellChanged}
          bind:this={cellElements[i]}
        />
      </div>
    </li>
  {/each}
  <li>
    <ButtonBar
      {insertSheet}
      {mathCellChanged}
      index={appState.cells.length}
      last={true}
    />
  </li>
</ul>

