<script>
  import { cells, results, activeCell } from "./stores.js";
  import MathCell from "./MathCell.svelte";
  import DocumentationCell from "./DocumentationCell.svelte";

  export let index;

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

</script>

<style>
  .container {
    display: flex;
  }

  .content {
    flex: 1;
  }

</style>

<div class="container">
  <div class="controls">
    <button id="{`delete-${index}`}" on:click={()=>deleteCell(index)}><img src="./icons/trash.svg" width="20" height="20" alt="Delete"></button>
    <button id="{`up-${index}`}" on:click={()=>moveUp(index)}><img src="./icons/chevron-up.svg" width="20" height="20" alt="Move Up"></button>
    <button id="{`down-${index}`}" on:click={()=>moveDown(index)}><img src="./icons/chevron-down.svg" width="20" height="20" alt="Move Down"></button>
  </div>

  <div class="content">
    {#if $cells[index].data.type === "math"}
      <MathCell index={index}/>
    {:else if $cells[index].data.type === "documentation"}
      <DocumentationCell index={index}/>
    {/if}
  </div>

</div>