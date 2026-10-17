<script lang="ts">
  import type { CellStatements, ModalInfo, StatementsAndSystems } from "./types";
  import type { Statement, SubQueryStatement } from './parser/types';
  import MathCell from "./cells/MathCell.svelte";
  import type { SystemDefinition } from "./cells/SystemCell.svelte";
  import type { FluidFunction } from "./cells/FluidCell.svelte";
  import type { CodeCellFunction } from "./cells/CodeCell.svelte";
  import type { MathCellConfig } from "./sheet/Sheet";
  import DataTableCell, { type GridInterpolationFunction, type InterpolationFunction } from "./cells/DataTableCell.svelte";
  import appState from "./stores.svelte";
  import Cell from "./Cell.svelte";
  import ButtonBar from "./ButtonBar.svelte";
  import { mathCellChanged, triggerSaveNeeded } from "./stores.svelte";

  interface Props {
    updateNumberFormat: (arg: {detail: {mathCell: MathCell, setNumberConfig: (input: MathCellConfig) => void}}) => void;
    updateDataTableNumberFormat: (dataTableCell: DataTableCell, colNumber: number) => void;
    insertSheet: (arg: {detail: {index: number}}) => void;
    generateCode: (arg: {detail: {index: number}}) => void;
    modal: (arg: {detail: {modalInfo: ModalInfo}}) => void;
  }

  let { 
    updateNumberFormat,
    updateDataTableNumberFormat,
    insertSheet,
    generateCode,
    modal,
  }: Props = $props(); 

  let cellElements: Cell[] = $state([]);
  let dragging = $state(false);
  let draggingSourceIndex: number = $state();
  let draggingSkeleton: HTMLDivElement;
  let skeletonHeight: number;
  let grabOffset: number;
  let scrollingContainer: HTMLElement;
  let sheetBody: HTMLUListElement;

  export function checkParsingErrors(): boolean {
    if (!cellElements) {
      return true;
    }

    let parsingError = false;

    for (const cell of cellElements) {
      if (cell) {
        parsingError = parsingError || cell.getParsingError();
      }
    }

    return parsingError
  }

  export function getStatementsAndSystemsForPython(): StatementsAndSystems {
    const statements: (Statement | SubQueryStatement)[] = [];
    const endStatements: (Statement | SubQueryStatement)[] = [];
    const subQueries: Map<string,SubQueryStatement> = new Map();
    const systemDefinitions: SystemDefinition[] = [];
    const fluidFunctions: FluidFunction[] = [];
    const codeCellFunctions: CodeCellFunction[] = [];
    const interpolationFunctions: (InterpolationFunction | GridInterpolationFunction)[] = [];

    if (cellElements) {
      for (const cell of cellElements) {
        if (cell) {
          const cellStatements = cell.getCellStatements() as CellStatements;
          statements.push(...cellStatements.statements);
          endStatements.push(...cellStatements.endStatements);
          for (const [key, value] of cellStatements.subQueries) {
            subQueries.set(key, value);
          }
          systemDefinitions.push(...cellStatements.systemDefinitions);
          fluidFunctions.push(...cellStatements.fluidFunctions);
          codeCellFunctions.push(...cellStatements.codeCellFunctions);
          interpolationFunctions.push(...cellStatements.interpolationFunctions); 
        }
      }
    }

    if (subQueries.size > 0) {
      endStatements.push(...subQueries.values());
    }

    statements.push(...endStatements);

    return {
      statements: statements,
      systemDefinitions: systemDefinitions,
      fluidFunctions: fluidFunctions,
      codeCellFunctions: codeCellFunctions,
      interpolationFunctions: interpolationFunctions,
      customBaseUnits: appState.config.customBaseUnits,
      simplifySymbolicExpressions: appState.config.simplifySymbolicExpressions,
      convertFloatsToFractions: appState.config.convertFloatsToFractions
    };
  }

  export async function getMarkdown(centerEquations= false): Promise<string> {
    let markdown = "";

    for (const cell of cellElements) {
      if (cell) {
        markdown += await cell.getMarkdown(centerEquations);
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
        triggerSaveNeeded();
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
        {triggerSaveNeeded}
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
          {updateDataTableNumberFormat}
          {generateCode}
          {modal}
          bind:this={cellElements[i]}
        />
      </div>
    </li>
  {/each}
  <li>
    <ButtonBar
      {insertSheet}
      {mathCellChanged}
      {triggerSaveNeeded}
      index={appState.cells.length}
      last={true}
    />
  </li>
</ul>

