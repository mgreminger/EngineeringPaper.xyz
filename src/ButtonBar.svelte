<script>
  import { createEventDispatcher } from 'svelte';
  import { addCell, onMobile, inCellInsertMode } from "./stores.ts";

  import AddAlt from "carbon-icons-svelte/lib/AddAlt.svelte";
  import AddComment from "carbon-icons-svelte/lib/AddComment.svelte";
  import Grid from "carbon-icons-svelte/lib/Grid.svelte";
  import InsertPage from "carbon-icons-svelte/lib/InsertPage.svelte";
  import ChartLine from "carbon-icons-svelte/lib/ChartLine.svelte";
  import IbmWatsonStudio from "carbon-icons-svelte/lib/IbmWatsonStudio.svelte";
  import ChartLineSmooth from "carbon-icons-svelte/lib/ChartLineSmooth.svelte";

  export let index;
  export let last = false;

  const dispatch = createEventDispatcher();

  function insertSheet(index) {
    dispatch('insertSheet', {
      index: index
    });
  }

  function mobileInsert() {
    if (!$inCellInsertMode) {
      $inCellInsertMode = true;
      addCell('insert', index);
    }
  }

</script>

<style>

  button:not(.mobile) {
    background: none;
    border: none;
    border-radius: 50%;
    position: relative;
    width: 20px;
    height: 20px;
    margin-inline: 3px;
  }

  button:hover:not(.mobile) {
    background: gainsboro;
  }

  button.mobile {
    border-radius: 5px;
  } 

  div.mobile-container {
    display: flex;
    justify-content: center;
    padding: 4px;
  }

  div.outer-container {
    display: flex;
  }

  div.outer-container:not(.last) {
    opacity: 0;
    transition: 0.3s;
  }

  div.outer-container:not(.last):hover {
    opacity: 1;
    transition: 0.3s;
  }

  div.outer-container:focus-within {
    opacity: 1;
  }

  hr {
    width: 47.5%;
    border: 0;
    height: 2px;
    border-radius: 1px;
    background: lightgray;
  }

  div.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 16px;
    width: 16px;
  }

  div.mobile-spacer {
    height: 20px;
  }

  @media print {
    div.outer-container {
      visibility: hidden;
    }
  }

</style>

{#if $onMobile && (!last || $inCellInsertMode) }
  <div class="mobile-spacer"></div>
{:else if $onMobile}
  <div class="mobile-container">
    <button 
      class="mobile"
      on:click={mobileInsert}
    >
      Insert New Cell
    </button>
  </div>
{:else}
  <div class="outer-container" class:last>
    <hr>
    
    <button
      title="Insert Math Cell Here"
      on:click={() => addCell('math', index)}
      id={last ? "add-math-cell" : `add-math-cell-${index}`}  
    >
      <div class="icon">
        <AddAlt />
      </div>
    </button>

    <button 
      title="Insert Documentation Cell Here"
      on:click={() => addCell('documentation', index)}
      id={last ? "add-documentation-cell" : `add-documentation-cell-${index}`}  
    >
      <div class="icon">
        <AddComment />
      </div>
    </button>

    <button 
      title="Insert Plot Cell Here"
      on:click={() => addCell('plot', )}
      id={last ? "add-plot-cell" : `add-plot-cell-${index}`}  
    >
      <div class="icon">
        <ChartLineSmooth />
      </div>
    </button>

    <button 
      title="Insert Table Cell Here"
      on:click={() => addCell('table', index)}
      id={last ? "add-table-cell" : `add-table-cell-${index}`}  
    >
      <div class="icon">
        <Grid />
      </div>
    </button>

    <button 
      title="Insert Piecewise Expression Here"
      on:click={() => addCell('piecewise', index)}
      id={last ? "add-piecewise-cell" : `add-piecewise-cell-${index}`}  
    >
      <div class="icon">
        <ChartLine />
      </div>
    </button>

    <button 
      title="Insert System Solve Cell Here"
      on:click={() => addCell('system', index)}
      id={last ? "add-system-cell" : `add-system-cell-${index}`}  
    >
      <div class="icon">
        <IbmWatsonStudio />
      </div>
    </button>

    <button 
      title="Insert Sheet Here"
      on:click={() => insertSheet(index)}
      id={last ? "insert-sheet" : null}  
    >
      <div class="icon">
        <InsertPage />
      </div>
    </button>

    <hr>
  </div>
{/if}