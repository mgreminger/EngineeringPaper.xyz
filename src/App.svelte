<script>
  import { onDestroy } from "svelte";
  import { cells, title, results, debug, activeCell, nextId, getSheetJson } from "./stores.js";
  import CellList from "./CellList.svelte";
  import DocumentTitle from "./DocumentTitle.svelte";

  import { unit, bignumber } from "mathjs";

  import QuickLRU from "quick-lru";

  import { Modal } from "carbon-components-svelte";

  import CloudUpload16 from "carbon-icons-svelte/lib/CloudUpload16";

  // Provide global function for setting latex for MathField
  // this is used for testing
  window.setCellLatex = function (cellIndex, latex){
    $cells[cellIndex].extra.mathFieldInstance.setLatex(latex);
  }

  // start webworker for python calculations
  let pyodideWorker, firstUpdate, pyodideTimeout;
  let forcePyodidePromiseRejection;
  function startWorker() {
    pyodideWorker = new Worker("webworker.js");
    firstUpdate = true;
    pyodideTimeout = false;
    forcePyodidePromiseRejection = null;
  }
  function terminateWorker() {
    if (pyodideWorker) {
      pyodideWorker.terminate();
      pyodideWorker = null;
    }
  }
  startWorker();
  onDestroy(terminateWorker);

  let error = null;

  let refreshCounter = BigInt(1);
  let pyodidePromise = null;
  const pyodideTimeoutLength = 2000;

  let cache = new QuickLRU({maxSize: 100}); 
  let cacheHitCount = 0;

  let cloudModalOpen = false;

  addMathCell();

  function addMathCell() {
    $cells.push({data: {type: "math", id: $nextId++, latex: ""},
                 extra: {parsingError: true, statement: null, mathFieldInstance: null}});
    $cells = $cells;
    $results = [];
    $activeCell = $cells.length-1;
  }

  function addDocumentationCell() {
    $cells.push({data: {type: "documentation", id: $nextId++, json: ""},
                 extra: {richTextInstance: null}});
    $cells = $cells;
    $results = [];
    $activeCell = $cells.length-1;
  }


  function getResults(statements) {
    return new Promise((resolve, reject) => {
      function handleWorkerMessage(e) {
        forcePyodidePromiseRejection = null;
        if (e.data === "pyodide_not_available") {
          // pyodide didn't load properly
          reject("Pyodide failed to load.");
        } else if (e.data === "max_recursion_exceeded") {
          reject("Max recursion depth exceeded.")
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
        forcePyodidePromiseRejection = () => reject("Restarting pyodide.")
        pyodideWorker.onmessage = handleWorkerMessage;
        pyodideWorker.postMessage({cmd: 'solve', data: statements});
      }
    });
  }

  async function handleCellUpdate() {
    const myRefreshCount = ++refreshCounter;
    $results = [];
    error = "";
    await pyodidePromise;
    pyodideTimeout = false;
    if (myRefreshCount === refreshCounter &&
        !$cells.filter(cell => cell.data.type === "math")
               .reduce((acum, current) => acum || current.extra.parsingError, false)) {
      let statements = JSON.stringify($cells.filter(cell => cell.data.type === "math")
                                            .map(cell => cell.extra.statement));
      setTimeout(() => pyodideTimeout=true, pyodideTimeoutLength);
      pyodidePromise = getResults(statements)
      .then((data) => {
        firstUpdate = false;
        $results = []
        if (!data.error) {
          let counter = 0
          $cells.forEach((cell, i) => {
            if (cell.data.type === "math" && data.results.length > 0) {
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

  function restartPyodide() {
    // reject any pending promise and restart webworker
    if (forcePyodidePromiseRejection) {
      forcePyodidePromiseRejection();
    }
    terminateWorker();
    startWorker();
    $results = [];
    refreshCounter++; // make all pending updates stale
  }

  function uploadSheet() {
    const sheet = getSheetJson();
  }

  $: document.title = `EngineeringPaper: ${$title}`

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

<svelte:head>
  <link rel="stylesheet" href="carbon/white.css"/>
</svelte:head>

<DocumentTitle bind:title={$title}/>

<CellList />

<button id="add-math-cell" on:click={addMathCell}>Add Math Cell</button>
<button id="add-documentation-cell" on:click={addDocumentationCell}>Add Documentation Cell</button>
<button on:click={() => (cloudModalOpen=true) }><CloudUpload16/></button>

{#if cloudModalOpen}
<Modal
  bind:open={cloudModalOpen}
  modalHeading="Save as Sharable Link"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (cloudModalOpen = false)}
  on:open
  on:close
  on:submit={uploadSheet}
>
  <p>Saving this document will create a private shareable link that can be used to access this 
    document in the future. Anyone you share this link with will be able to access the document.
  </p>
</Modal>
{/if}

{#await pyodidePromise}
  {#if firstUpdate}
    <div>Loading Pyodide...</div>
  {:else}  
    <div>
      Updating...
      {#if pyodideTimeout}
        <button on:click={restartPyodide}>Restart Pyodide</button>
      {/if}
    </div>
  {/if}
{:catch promiseError}
  <div>{promiseError}</div>
{/await}

{#if error}
  {#if error === "Restarting pyodide."}
    <div>Pyodide restarting.</div>
  {:else}
    <div>
      Error: <span id="error-message">{error}</span>
    </div>
  {/if}
{/if}

{#if $debug}
  <div>
    {JSON.stringify($results)}
  </div>
  <div>$cells.length={$cells.length}</div>
  <div>JSON Output:</div>
  <div>
    {JSON.stringify($cells.filter(cell => cell.data.type === "math")
                          .map((cell) => cell.extra.statement))}
  </div>
  <div>Cache hit count: {cacheHitCount}</div>
{/if}