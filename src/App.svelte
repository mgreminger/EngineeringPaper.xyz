<script>
  import { onDestroy } from "svelte";
  import { cells, results, debug } from "./stores.js";
  import Cell from "./Cell.svelte";

  import { unit, bignumber } from "mathjs";

  // start webworker for python calculations
  const pyodideWorker = new Worker("webworker.js");
  onDestroy(() => pyodideWorker.terminate());

  let nextId = 0
  let error = null;

  let refreshCounter = BigInt(1);
  let firstUpdate = true;
  let pyodidePromise = null;

  function addCell() {
    $cells.push({type: "statement", id: nextId++, 
                 data: {latex: "", parsingError: true, statement: null }});
    $cells = $cells;
    $results = [];
  }

  function getResults() {
    return new Promise((resolve, reject) => {
      function handleWorkerMessage(e) {
        if (e.data === "pyodide_not_available") {
          // pyodide didn't load properly
          reject("Pyodide failed to load.");
        } else {
          resolve(e.data);
        }
      }
      pyodideWorker.onmessage = handleWorkerMessage;
      pyodideWorker.postMessage([$cells.filter(cell => cell.type === "statement")
                                       .map(cell => cell.data.statement)]);
    });
  }

  async function handleCellUpdate() {
    const myRefreshCount = ++refreshCounter;
    $results = [];
    await pyodidePromise;
    if (myRefreshCount === refreshCounter &&
        !$cells.reduce((acum, current) => acum || current.data.parsingError, false)) {
      pyodidePromise = getResults()
      .then((data) => {
        firstUpdate = false;
        $results = []
        if (data.results) {
          let counter = 0
          $cells.forEach((cell, i) => {
            if (cell.type === "statement") {
              $results[i] = data.results[counter++]; 
            }
          });
        }
        error = data.error;
      })
      .catch((errorMessage) => error=errorMessage);
    }
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((item, i) => item === b[i]);
  }

  $: if ($cells) {
    handleCellUpdate();
  }

  $: if ($results.length > 0) {
    $results.forEach((result, i) => {
      const statement = $cells[i].data.statement;
      if (
        result && statement &&
        statement.type === "query" &&
        statement.units_valid &&
        statement.units && 
        result.units !== "Dimension Error" &&
        result.units !== "Exponent Not Dimensionless" &&
        result.numeric
      ) {
        if (result.real && result.finite) {
          let resultUnits;
          if (result.units) {
            resultUnits = unit(bignumber(result.value), result.units);
          } else {
            // result is unitless, unit() won't accept '' as a unit
            resultUnits = unit(bignumber(result.value), 'in/in'); 
          }
          const userUnits = unit(statement.units);
          if (arraysEqual(resultUnits.dimensions, userUnits.dimensions)) {
            result.userUnitsValueDefined = true;
            result.userUnitsValue = resultUnits.toNumber(statement.units);
            result.unitsMismatch = false;
          } else {
            result.unitsMismatch = true;
          }
        } else {
          // unit conversions not support for complex numbers
          result.unitsMismatch = true;
        }
      }
    });
  }
</script>

<style>
</style>

<button id="add-cell" on:click={addCell}>Add Cell</button>
<label>
  <input id="debug" type="checkbox" bind:checked={$debug}>
  Enable Debugging Mode
</label>

{#each $cells as cell, i (cell.id)}
  <Cell index={i}/>
{/each}

{#await pyodidePromise}
  {#if firstUpdate}
    <div>Loading Pyodide...</div>
  {:else}  
    <div>Updating...</div>
  {/if}
{:catch promiseError}
  <div>{promiseError}</div>
{/await}

{#if error}
  <div>Error: <span id="error-message">{error}</span></div>
{/if}

{#if $debug}
  <div>JSON Output:</div>
  <div>
    {JSON.stringify($cells.filter(cell => cell.type === "statement")
                          .map((cell) => cell.data.statement))}
  </div>
{/if}