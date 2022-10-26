<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type DeletedCell from "./cells/DeletedCell";
  import { cells, activeCell, results, mathCellChanged } from "./stores";

  export let index: number;
  export let deletedCell: DeletedCell;

  const timeout = 3000;
  const delta = 50;
  let currentTime = timeout;
  let intervalId = null;

  onMount(() => {
    intervalId = setInterval(intervalFunc, delta);
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
      if ($activeCell >= $cells.length) {
        $activeCell = $cells.length-1;
      }
      $results = [];
      $mathCellChanged = true;
    }
  }

  function undoDelete() {
    clearInterval(intervalId);
    $cells = [...$cells.slice(0,index), deletedCell.deletedCell, ...$cells.slice(index+1)];
    $activeCell = index;
    $results = [];
    $mathCellChanged = true;
  }

</script>

<style>
  div.container {
    display: flex;
    padding: 20px;
    justify-content: center;
    background-color: whitesmoke;
    border-radius: 10px;
  }

  div.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    row-gap: 10px;
  }

  p {
    font-size: larger;
  }

  button {
    background-color: white;
  }
</style>


<div class="container">
  <div class="controls">
    <p>Cell Deleted</p>
    <button on:click={undoDelete}>Undo Delete</button>
    <progress value={currentTime/timeout-.1}></progress>
  </div>
</div>