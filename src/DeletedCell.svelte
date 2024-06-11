<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type DeletedCell from "./cells/DeletedCell";
  import { cells, activeCell, results, system_results, mathCellChanged } from "./stores";

  export let index: number;
  export let deletedCell: DeletedCell;

  const timeout = 3000;
  const delta = 50;
  let currentTime = timeout;
  let intervalId = null;
  let buttonElement: HTMLElement;

  export function getMarkdown() {
    return "";
  }

  onMount(() => {
    intervalId = setInterval(intervalFunc, delta);
    if (buttonElement) {
      buttonElement.focus({preventScroll: true});
      setTimeout(() => buttonElement?.scrollIntoView({behavior: "smooth", block: "nearest"}), 100);
    }
  });

  onDestroy(() => {
    clearInterval(intervalId);
  });

  function intervalFunc() {
    currentTime -= delta;

    if (currentTime <= 0) {
      clearInterval(intervalId);
      deleteMyself();
    }
  }

  function deleteMyself() {
    if (deletedCell.id === $cells[index].id) { 
      $cells = [...$cells.slice(0,index), ...$cells.slice(index+1)];
      $results = [...$results.slice(0,index), ...$results.slice(index+1)];
      $system_results = [...$system_results.slice(0,index), ...$system_results.slice(index+1)];

      if ($activeCell > index ) {
        $activeCell -= 1;
      }
      if ($activeCell >= $cells.length) {
        $activeCell = $cells.length-1;
      }

      $mathCellChanged = true;
    }
  }

  function undoDelete() {
    clearInterval(intervalId);
    $cells = [...$cells.slice(0,index), deletedCell.deletedCell, ...$cells.slice(index+1)];
    $results = [...$results.slice(0,index), null, ...$results.slice(index+1)];
    $system_results = [...$system_results.slice(0,index), null, ...$system_results.slice(index+1)];

    $activeCell = index;

    $mathCellChanged = true;
  }

  function handleKeyboard(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Escape") {
      undoDelete();
      event.preventDefault();
      event.stopPropagation();
    }
  }

</script>

<style>
  div.container {
    display: flex;
    justify-content: center;
    background-color: whitesmoke;
    border-radius: 2px;
    height: 100%;
  }

  div.controls {
    display: grid;
    grid-auto-flow: column;

    align-items: center;
    justify-content: center;
    column-gap: 20px;
    width: fit-content;
    height: 100%;
  }

  button {
    background-color: white;
    border-radius: 5px;
    padding: 2px;
  }
</style>


<div class="container">
  <div class="controls">
    <p class="hide-when-kinda-narrow">Deleting Cell</p>
    <button 
      on:click={undoDelete}
      on:keydown={handleKeyboard}
      bind:this={buttonElement}
    >
      Undo Delete
    </button>
    <progress class="hide-when-really-narrow" value={currentTime/timeout-.1}></progress>
  </div>
</div>