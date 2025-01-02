<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type DeletedCell from "./cells/DeletedCell";
  import appState from "./stores.svelte";

  interface Props {
    index: number;
    deletedCell: DeletedCell;
    mathCellChanged: () => void;
  }

  let { index, deletedCell, mathCellChanged }: Props = $props();  

  const timeout = 3000;
  const delta = 50;
  let currentTime = $state(timeout);
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
    if (deletedCell.id === appState.cells[index].id) { 
      appState.cells = [...appState.cells.slice(0,index), ...appState.cells.slice(index+1)];
      appState.results = [...appState.results.slice(0,index), ...appState.results.slice(index+1)];
      appState.system_results = [...appState.system_results.slice(0,index), ...appState.system_results.slice(index+1)];

      if (appState.activeCell > index ) {
        appState.activeCell -= 1;
      }
      if (appState.activeCell >= appState.cells.length) {
        appState.activeCell = appState.cells.length-1;
      }

      mathCellChanged();
    }
  }

  function undoDelete() {
    clearInterval(intervalId);
    appState.cells = [...appState.cells.slice(0,index), deletedCell.deletedCell, ...appState.cells.slice(index+1)];
    appState.results = [...appState.results.slice(0,index), null, ...appState.results.slice(index+1)];
    appState.system_results = [...appState.system_results.slice(0,index), null, ...appState.system_results.slice(index+1)];

    appState.activeCell = index;

    mathCellChanged();
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
      onclick={undoDelete}
      onkeydown={handleKeyboard}
      bind:this={buttonElement}
    >
      Undo Delete
    </button>
    <progress class="hide-when-really-narrow" value={currentTime/timeout-.1}></progress>
  </div>
</div>