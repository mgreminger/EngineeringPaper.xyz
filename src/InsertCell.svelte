<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type InsertCell from "./cells/InsertCell";
  import appState from "./stores.svelte";
  import { addCell } from './stores.svelte';
  import type { CellTypes } from "./cells/BaseCell";

  import AddAlt from "carbon-icons-svelte/lib/AddAlt.svelte";
  import AddComment from "carbon-icons-svelte/lib/AddComment.svelte";
  import Grid from "carbon-icons-svelte/lib/Grid.svelte";
  import ChartLine from "carbon-icons-svelte/lib/ChartLine.svelte";
  import IbmWatsonStudio from "carbon-icons-svelte/lib/IbmWatsonStudio.svelte";
  import ChartLineSmooth from "carbon-icons-svelte/lib/ChartLineSmooth.svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import InsertPage from "carbon-icons-svelte/lib/InsertPage.svelte";
  import RainDrop from "carbon-icons-svelte/lib/RainDrop.svelte";
  import DataTable from "carbon-icons-svelte/lib/DataTable.svelte";

  interface Props {
    index: number;
    insertCell: InsertCell;
    insertSheet: (arg: {detail: {index: number}}) => void;
    mathCellChanged: () => void;
  }

  let {
    index,
    insertCell,
    insertSheet,
    mathCellChanged
  }: Props = $props();

  const timeout = 30000;
  const delta = 50;
  let currentTime = $state(timeout);
  let intervalId = null;
  let buttonArray: HTMLElement[] = [];

  export function getMarkdown() {
    return "";
  }

  function dispatchInsertSheet() {
    deleteMyself();
    insertSheet({detail: {index: index}});
  }

  onMount(() => {
    intervalId = setInterval(intervalFunc, delta);
    if (buttonArray[0]) {
      buttonArray[0].focus({preventScroll: true});
      buttonArray[0].scrollIntoView({behavior: "smooth", block: "center"});
    }
  });

  onDestroy(() => {
    clearInterval(intervalId);
    appState.inCellInsertMode = false;
  });

  function intervalFunc() {
    currentTime -= delta;

    if (currentTime <= 0) {
      clearInterval(intervalId);
      deleteMyself();
    }
  }

  function deleteMyself() {
    if (insertCell.id === appState.cells[index].id) { 
      appState.cells = [...appState.cells.slice(0,index), ...appState.cells.slice(index+1)];
      appState.results = [...appState.results.slice(0,index), ...appState.results.slice(index+1)];
      appState.system_results = [...appState.system_results.slice(0,index), ...appState.system_results.slice(index+1)];

      appState.activeCell = index - 1;
      if (appState.activeCell >= appState.cells.length) {
        appState.activeCell = appState.cells.length-1;
      }

      mathCellChanged();
    }
  }

  function insertNewCell(type: CellTypes) {
    deleteMyself();
    addCell(type, index);
  }

  function handleKeyboard(event: KeyboardEvent, currentIndex: number) {
    if (event.defaultPrevented || event[appState.modifierKey] || event.shiftKey) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        currentIndex -= 1;
        currentTime = timeout;
        break;
      case "ArrowRight":
      case "ArrowUp":
        currentIndex += 1;
        currentTime = timeout;
        break;
      default:
        return;
    }

    if (currentIndex < 0) {
      currentIndex = buttonArray.length - 1;
    } else if(currentIndex >= buttonArray.length) {
      currentIndex = 0;
    }

    if (buttonArray[currentIndex]) {
      buttonArray[currentIndex].focus({preventScroll: true});
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }

</script>

<style>
  div.container {
    display: flex;
    padding: 20px;
    justify-content: center;
    background-color: whitesmoke;
    border-radius: 2px;
  }

  div.container.mobile {
    padding: 5px;
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

  div.button-grid {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);
  }

  button {
    background-color: white;
    border-radius: 5px;
    margin: 3px;
  }

  div.button-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
  }

  div.button-text.mobile {
    column-gap: 5px;
  }

</style>


<div class="container" class:mobile={appState.onMobile}>
  <div class="controls">
    {#if !appState.onMobile}
      <p>Press the number to the desired cell type or press Escape to cancel:</p>
    {/if}
    
    <div class="button-grid">

      <button 
        id={"insert-popup-button-1"}
        onclick={() => insertNewCell('math')}
        bind:this={buttonArray[0]}
        onkeydown={(e) => handleKeyboard(e, 0)}
      >
        <div class="button-text" class:mobile={appState.onMobile}>
          {#if !appState.onMobile}
            <div>1</div>
          {/if}
          <div>Math Cell</div>
          <div><AddAlt size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-2"}
        onclick={() => insertNewCell('documentation')}
        bind:this={buttonArray[1]}
        onkeydown={(e) => handleKeyboard(e, 1)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>2</div>
            <div>Documetation Cell</div>
          {:else}
            <div>Comment Cell</div>
          {/if}
          <div><AddComment size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-3"}
        onclick={() => insertNewCell('plot')}
        bind:this={buttonArray[2]}
        onkeydown={(e) => handleKeyboard(e, 2)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>3</div>
          {/if}
          <div>Plot Cell</div>
          <div><ChartLineSmooth size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-4"}
        onclick={() => insertNewCell('table')}
        bind:this={buttonArray[3]}
        onkeydown={(e) => handleKeyboard(e, 3)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>4</div>
          {/if}
          <div>Selector Table Cell</div>
          <div><Grid size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-5"}
        onclick={() => insertNewCell('dataTable')}
        bind:this={buttonArray[4]}
        onkeydown={(e) => handleKeyboard(e, 4)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>5</div>
          {/if}
          <div>Data Table Cell</div>
          <div><DataTable size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-6"}
        onclick={() => insertNewCell('piecewise')}
        bind:this={buttonArray[5]}
        onkeydown={(e) => handleKeyboard(e, 5)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>6</div>
            <div>Piecewise Expression Cell</div>
          {:else}
            <div>Piecewise Function Cell</div>
          {/if}
          <div><ChartLine size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-7"}
        onclick={() => insertNewCell('system')}
        bind:this={buttonArray[6]}
        onkeydown={(e) => handleKeyboard(e, 6)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>7</div>
          {/if}
          <div>System Solve Cell</div>
          <div><IbmWatsonStudio size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-8"}
        onclick={() => insertNewCell('fluid')}
        bind:this={buttonArray[7]}
        onkeydown={(e) => handleKeyboard(e, 7)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>8</div>
          {/if}
          <div>Fluid Props Cell</div>
          <div><RainDrop size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-9"}
        onclick={dispatchInsertSheet}
        bind:this={buttonArray[8]}
        onkeydown={(e) => handleKeyboard(e, 8)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>9</div>
          {/if}
          <div>Insert Sheet</div>
          <div><InsertPage size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-esc"}
        onclick={deleteMyself}
        bind:this={buttonArray[9]}
        onkeydown={(e) => handleKeyboard(e, 9)}
      >
        <div class="button-text">
          {#if !appState.onMobile}
            <div>Escape</div>
          {/if}
          <div>Cancel</div>
          <div><Error size={20}/></div>
        </div>
      </button>

    </div>
    <progress value={currentTime/timeout-.1}></progress>
  </div>
</div>