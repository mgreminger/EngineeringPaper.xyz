<script>
  import { onDestroy } from "svelte";
  import { cells, results, debug, activeCell, activeCellFlowDown } from "./stores.js";
  import Cell from "./Cell.svelte";

  import { unit, bignumber } from "mathjs";

  import QuickLRU from "quick-lru";

  // Provide global function for setting latex for MathField
  // this is used for testing
  window.setCellLatex = function (cellIndex, latex){
    $cells[cellIndex].extra.mathFieldInstance.setLatex(latex);
  }

  // start webworker for python calculations
  const pyodideWorker = new Worker("webworker.js");
  onDestroy(() => pyodideWorker.terminate());

  let nextId = 0
  let error = null;

  let refreshCounter = BigInt(1);
  let firstUpdate = true;
  let pyodidePromise = null;

  let cache = new QuickLRU({maxSize: 100}); 
  let cacheHitCount = 0;

  addStatementCell();

  function addStatementCell() {
    $cells.push({data: {type: "math", id: nextId++, latex: ""},
                 extra: {parsingError: true, statement: null, mathFieldInstance: null}});
    $cells = $cells;
    $results = [];
    $activeCell = $cells.length-1;
  }

  function addDocumentationCell() {
    $cells.push({data: {type: "documentation", id: nextId++, json: ""},
                 extra: {richTextInstance: null}});
    $cells = $cells;
    $results = [];
    $activeCell = $cells.length-1;
  }


  function getResults(statements) {
    return new Promise((resolve, reject) => {
      function handleWorkerMessage(e) {
        if (e.data === "pyodide_not_available") {
          // pyodide didn't load properly
          reject("Pyodide failed to load.");
        } else {
          if (!cache.has(statements)) {
            cache.set(statements, e.data);
          }
          resolve(e.data);
        }
      }
      const cachedResult = cache.get(statements);
      if (cachedResult) {
        cacheHitCount++;
        resolve(cachedResult);
      } else {
        pyodideWorker.onmessage = handleWorkerMessage;
        pyodideWorker.postMessage(statements);
      }
    });
  }

  async function handleCellUpdate() {
    const myRefreshCount = ++refreshCounter;
    $results = [];
    await pyodidePromise;
    if (myRefreshCount === refreshCounter &&
        !$cells.filter(cell => cell.data.type === "math")
               .reduce((acum, current) => acum || current.extra.parsingError, false)) {
      let statements = JSON.stringify($cells.filter(cell => cell.data.type === "math")
                                            .map(cell => cell.extra.statement));
      pyodidePromise = getResults(statements)
      .then((data) => {
        firstUpdate = false;
        $results = []
        if (data.results) {
          let counter = 0
          $cells.forEach((cell, i) => {
            if (cell.data.type === "math") {
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
      const statement = $cells[i].extra.statement;
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

{#each $cells as cell, i (cell.data.id)}
  <Cell index={i}/>
{/each}

<button id="add-math-cell" on:click={addStatementCell}>Add Math Cell</button>
<button id="add-documentation-cell" on:click={addDocumentationCell}>Add Documentation Cell</button>

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
  <div>{$cells.length}</div>
  <div>JSON Output:</div>
  <div>
    {JSON.stringify($cells.filter(cell => cell.data.type === "math")
                          .map((cell) => cell.extra.statement))}
  </div>
  <div>Cache hit count: {cacheHitCount}</div>
{/if}