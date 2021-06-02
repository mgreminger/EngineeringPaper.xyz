<script>
  import { onDestroy, onMount, tick } from "svelte";
  import { cells, title, results, debug, activeCell, nextId, getSheetJson, resetSheet } from "./stores.js";
  import CellList from "./CellList.svelte";
  import DocumentTitle from "./DocumentTitle.svelte";

  import { unit, bignumber } from "mathjs";

  import QuickLRU from "quick-lru";

  import { Modal, InlineLoading, CopyButton } from "carbon-components-svelte";

  import CloudUpload16 from "carbon-icons-svelte/lib/CloudUpload16";
  import DocumentBlank16 from "carbon-icons-svelte/lib/DocumentBlank16";

  let apiUrl;
  if (process.env.NODE_ENV === "production") {
    apiUrl = "https://engineeringpaper.herokuapp.com";
  } else {
    apiUrl = "http://127.0.0.1:8000";
  }

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
  onDestroy(() => {
    window.removeEventListener("hashchange", handleHashChange);
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.removeEventListener("keydown", handleKeyboardShortcuts);
    terminateWorker();
  });

  onMount( () => {
    unsavedChange = false;
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyboardShortcuts);
  });

  function handleKeyboardShortcuts(event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "s":
      case "S":
        if (!event.ctrlKey) {
          return;
        } else {
          uploadInfo = {state: 'idle', modalOpen: true};
        }
        break;
      case "Esc":
      case "Escape":
        $activeCell = -1;
        document.activeElement.blur();
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  function handleBeforeUnload(event) {
    if(unsavedChange){
      event.preventDefault();
      event.returnValue = '';
    } else {
      delete event['returnValue'];
    }
  } 

  async function handleHashChange() {
    const hash = window.location.hash;
    if (hash.length === 23 || hash === "") {
      if (!unsavedChange || window.confirm("Continue loading sheet, any unsaved changes will be lost?")) {
        if(hash.length === 23) {
          await downloadSheet(`${apiUrl}/documents/${hash.slice(1)}`);
        } else {
          resetSheet();
          await tick();
          addMathCell();
          await tick();
          unsavedChange = false;
        }
      }
    }
  }

  function loadBlankSheet() {
    if (window.location.hash === "") {
      handleHashChange();
    } else {
      window.location.hash = "";
    }
  }

  let unsavedChange = false;

  let error = null;

  let refreshCounter = BigInt(1);
  let pyodidePromise = null;
  const pyodideTimeoutLength = 2000;

  let cache = new QuickLRU({maxSize: 100}); 
  let cacheHitCount = 0;

  let uploadInfo = {state: "idle", modalOpen: false}; // status = "idle", "pending", "success", "error" 

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

  const encoder = new TextEncoder();
  async function getHash(input) {
    const hash = await crypto.subtle.digest('SHA-512', encoder.encode(`${input}math`));
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function uploadSheet() {
    uploadInfo.state = "pending";
    const data = getSheetJson();
    const hash = await getHash(data);
    
    let response, bodyJsonObject;

    try {
      response = await fetch(`${apiUrl}/documents/${hash}`, {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: data.slice(1)
      });

      if (response.ok) {
         bodyJsonObject = await response.json();
      } else {
        throw new Error(`Unexpected response status ${response.status}`);
      }

      console.log(bodyJsonObject.url);
      uploadInfo = {state: "success", url: bodyJsonObject.url, modalOpen: true};
      unsavedChange = false;
      window.location.hash = `#${bodyJsonObject.hash}`;
    } catch (error) {
      console.log("Error sharing sheet:", error);
      uploadInfo = {state: "error", error: error, modalOpen: true};
    }
  }

  async function downloadSheet(url) {
    let sheet;
    
    try{
      const response = await fetch(url);

      if (response.ok) {
        sheet = await response.json();
      } else {
        throw new Error(`Unexpected response status ${response.status}`);
      }
    }
    catch(error) {
      window.alert(`Error retrieving sheet ${url}. Error: ${error}`);
      return;
    }

    try{
      $cells = [];

      await tick();

      $cells = sheet.cells.map(cell => {
        if (cell.type === "math") {
          return {
            data: cell,
            extra: {parsingError: true, statement: null, mathFieldInstance: null}
            };
        } else if (cell.type === "documentation") {
          return {
            data: cell,
            extra: {richTextInstance: null}
          };
        }
      });

      $title = sheet.title;
      $nextId = sheet.nextId;

      await tick(); // this will populate mathFieldInstance and richTextInstance fields

      sheet.cells.forEach( (cell, index) => {
        if (cell.type === "math") {
          $cells[index].extra.mathFieldInstance.setLatex(cell.latex);
        } else if (cell.type === "documentation") {
          $cells[index].extra.richTextInstance.setContents(cell.json);
        }
      });

      await tick();

      $results = sheet.results;

    } catch(error) {
      window.alert(`Error regenerating sheet ${url}. Error: ${error}`);
      $cells = [];
    }

    unsavedChange = false;
  }

  $: {
    document.title = `EngineeringPaper: ${$title}`;
    unsavedChange = true;
  }

  $: if ($cells) {
    handleCellUpdate();
    unsavedChange = true;
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
  div.shareable-link {
    display: flex;
    align-items: baseline;
    justify-content: center;
  }

  div.status {
    display: flex;
    justify-content: flex-start;
  }

  :global(div.status > div) {
    width: max-content;
  }

  label.shareable-link-label {
    padding-right: 0.5em;
  }
</style>

<svelte:head>
  <link rel="stylesheet" href="carbon/white.css"/>
</svelte:head>

<DocumentTitle bind:title={$title}/>

<CellList />

<button id="add-math-cell" on:click={addMathCell}>Add Math Cell</button>
<button id="add-documentation-cell" on:click={addDocumentationCell}>Add Documentation Cell</button>
<button id="new-sheet" on:click={loadBlankSheet}><DocumentBlank16/></button>
<button id="upload-sheet" on:click={() => (uploadInfo = {state: 'idle', modalOpen: true}) }><CloudUpload16/></button>

{#if uploadInfo.modalOpen}
  <Modal
    passiveModal={uploadInfo.state === "success" || uploadInfo.state === "error" || uploadInfo.state ==="pending"}
    bind:open={uploadInfo.modalOpen}
    modalHeading="Save as Sharable Link"
    primaryButtonText="Confirm"
    secondaryButtonText="Cancel"
    on:click:button--secondary={() => (uploadInfo.modalOpen = false)}
    on:open
    on:close
    on:submit={uploadSheet}
  >
    {#if uploadInfo.state === "idle"}
      <p>Saving this document will create a private shareable link that can be used to access this 
        document in the future. Anyone you share this link with will be able to access the document.
      </p>
    {:else if uploadInfo.state === "pending"}
      <InlineLoading description="Getting shareable link..."/>
    {:else if uploadInfo.state === "success"}
      <p>Save this link in order to be able to access or share this sheet.</p>
      <br>
      <div class="shareable-link">
        <label for="shareable-link" class="shareable-link-label">Shareable Link:</label>
        <input type="text" id="shareable-link" value={uploadInfo.url} size=50 readonly>
        <CopyButton text={uploadInfo.url} />
      </div>
    {:else}
      <InlineLoading status="error" description="An error occurred" />
      {uploadInfo.error}
    {/if}
  </Modal>
{/if}

{#await pyodidePromise}
  {#if firstUpdate}
    <div>
      <InlineLoading description="Loading Pyodide..."/>
    </div>
  {:else}  
    <div class="status">
      <InlineLoading description="Updating..."/>
      {#if pyodideTimeout}
        <button on:click={restartPyodide}>Restart Pyodide</button>
      {/if}
    </div>
  {/if}
{:catch promiseError}
  <div>
    <InlineLoading status="error" description={promiseError}/>
  </div>
{/await}

{#if error}
  {#if error === "Restarting pyodide."}
    <div>
      <InlineLoading description="Pyodide restarting..." />
    </div>
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