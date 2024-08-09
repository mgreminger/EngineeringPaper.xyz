<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { addCell, onMobile, inCellInsertMode } from "./stores";

  import AddAlt from "carbon-icons-svelte/lib/AddAlt.svelte";
  import AddComment from "carbon-icons-svelte/lib/AddComment.svelte";
  import Grid from "carbon-icons-svelte/lib/Grid.svelte";
  import InsertPage from "carbon-icons-svelte/lib/InsertPage.svelte";
  import ChartLine from "carbon-icons-svelte/lib/ChartLine.svelte";
  import IbmWatsonStudio from "carbon-icons-svelte/lib/IbmWatsonStudio.svelte";
  import ChartLineSmooth from "carbon-icons-svelte/lib/ChartLineSmooth.svelte";
  import RainDrop from "carbon-icons-svelte/lib/RainDrop.svelte";
  import IconButton from './IconButton.svelte';
  import DataTable from "carbon-icons-svelte/lib/DataTable.svelte";

  export let index;
  export let last = false;

  const dispatch = createEventDispatcher<{"insertSheet": {index: number}}>();

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
    gap: 6px;
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
    
    <IconButton
      title="Insert Math Cell Here"
      on:click={() => addCell('math', index)}
      id={last ? "add-math-cell" : `add-math-cell-${index}`}
      noTouch={!last}
    >
      <AddAlt />
    </IconButton>

    <IconButton 
      title="Insert Documentation Cell Here"
      on:click={() => addCell('documentation', index)}
      id={last ? "add-documentation-cell" : `add-documentation-cell-${index}`} 
      noTouch={!last}
    >
      <AddComment />
    </IconButton>

    <IconButton 
      title="Insert Plot Cell Here"
      on:click={() => addCell('plot', index)}
      id={last ? "add-plot-cell" : `add-plot-cell-${index}`}
      noTouch={!last}
    >
      <ChartLineSmooth />
    </IconButton>

    <IconButton 
      title="Insert Selector Table Cell Here"
      on:click={() => addCell('table', index)}
      id={last ? "add-table-cell" : `add-table-cell-${index}`}
      noTouch={!last}
    >
      <Grid />
    </IconButton>

    <IconButton 
      title="Insert Data Table Cell Here"
      on:click={() => addCell('dataTable', index)}
      id={last ? "add-data-table-cell" : `add-data-table-cell-${index}`}
      noTouch={!last}
    >
      <DataTable />
    </IconButton>

    <IconButton 
      title="Insert Piecewise Expression Here"
      on:click={() => addCell('piecewise', index)}
      id={last ? "add-piecewise-cell" : `add-piecewise-cell-${index}`}
      noTouch={!last}
    >
      <ChartLine />
    </IconButton>

    <IconButton
      title="Insert System Solve Cell Here"
      on:click={() => addCell('system', index)}
      id={last ? "add-system-cell" : `add-system-cell-${index}`}
      noTouch={!last}
    >
      <IbmWatsonStudio />
    </IconButton>

    <IconButton
      title="Insert Fluid Properties Cell Here"
      on:click={() => addCell('fluid', index)}
      id={last ? "add-fluid-cell" : `add-fluid-cell-${index}`}
      noTouch={!last}
    >
      <RainDrop />
    </IconButton>

    <IconButton 
      title="Insert Sheet Here"
      on:click={() => insertSheet(index)}
      id={last ? "insert-sheet" : null}
      noTouch={!last}
    >
      <InsertPage />
    </IconButton>

    <hr>
  </div>
{/if}