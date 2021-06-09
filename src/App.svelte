<script>
  import { onDestroy, onMount, tick } from "svelte";
  import { cells, title, results, history, debug, activeCell, 
           nextId, getSheetJson, resetSheet, sheetId } from "./stores.js";
  import CellList from "./CellList.svelte";
  import DocumentTitle from "./DocumentTitle.svelte";

  import { unit, bignumber } from "mathjs";

  import QuickLRU from "quick-lru";

  import {
    Modal,
    InlineLoading,
    CopyButton,
    Header,
    SkipToContent,
    HeaderUtilities,
    HeaderGlobalAction,
    Content,
    HeaderNav, HeaderNavItem, HeaderNavMenu
  } from "carbon-components-svelte";

  import CloudUpload20 from "carbon-icons-svelte/lib/CloudUpload20";
  import DocumentBlank20 from "carbon-icons-svelte/lib/DocumentBlank20";
  import AddAlt20 from "carbon-icons-svelte/lib/AddAlt20";
  import AddComment20 from "carbon-icons-svelte/lib/AddComment20";

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
          transactionInfo = {
            state: 'idle',
            modalOpen: true,
            heading: "Save as Sharable Link"
          };
        }
        break;
      case "Esc":
      case "Escape":
        $activeCell = -1;
        document.activeElement.blur();
        transactionInfo.modalOpen = false;
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
    if (!ignoreHashChange) {
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
    } else {
      ignoreHashChange = false;
    }

     activeHistoryItem = $history.map(item => (new URL(item.url).hash === window.location.hash)).indexOf(true);
  }

  function loadBlankSheet() {
    if (window.location.hash === "") {
      handleHashChange();
    } else {
      window.location.hash = "";
    }
  }

  let ignoreHashChange = false;
  let unsavedChange = false;
  let activeHistoryItem = -1;

  let error = null;

  let refreshCounter = BigInt(1);
  let pyodidePromise = null;
  const pyodideTimeoutLength = 2000;

  let cache = new QuickLRU({maxSize: 100}); 
  let cacheHitCount = 0;

  let transactionInfo = {state: "idle", modalOpen: false, heading: "Save as Sharable Link"}; // state = "idle", "pending", "success", "error", "retrieving" 

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
    transactionInfo.state = "pending";
    const data = getSheetJson();
    const hash = await getHash(data);
    
    let response, responseObject;

    try {
      response = await fetch(`${apiUrl}/documents/${hash}`, {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({
          title: $title, 
          history: $history,
          document: data.slice(1)
        })
      });

      if (response.ok) {
         responseObject = await response.json();
      } else {
        throw new Error(`Unexpected response status ${response.status}`);
      }

      console.log(responseObject.url);
      transactionInfo = {
        state: "success",
        url: responseObject.url,
        modalOpen: true,
        heading: transactionInfo.heading
      };
      unsavedChange = false;

      $history = JSON.parse(responseObject.history);

      if (window.location.hash !== `#${responseObject.hash}`) {
        ignoreHashChange = true;
        window.location.hash = `#${responseObject.hash}`;
      }
    } catch (error) {
      console.log("Error sharing sheet:", error);
      transactionInfo = {
        state: "error",
        error: error,
        modalOpen: true,
        heading: transactionInfo.heading};
    }
  }

  async function downloadSheet(url) {
    transactionInfo = {state: "retrieving", modalOpen: true, heading: "Retrieving Sheet"};

    let sheet, requestHistory;
    
    try{
      const response = await fetch(url);

      if (response.ok) {
        const responseObject = await response.json();
        sheet = JSON.parse(responseObject.data);
        requestHistory = JSON.parse(responseObject.history);
      } else {
        throw new Error(`Unexpected response status ${response.status}`);
      }
    }
    catch(error) {
      transactionInfo = {
        state: "error",
        error: `Error retrieving sheet ${url}. Error: ${error}`,
        modalOpen: true,
        heading: "Retrieving Sheet"
      };
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
      $sheetId = sheet.sheetId;

      if (!$history.map(item => (new URL(item.url).hash)).includes(window.location.hash)) {
        $history = requestHistory;
      }

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
      transactionInfo = {
        state: "error",
        error: `Error regenerating sheet ${url}. Error: ${error}`,
        modalOpen: true,
        hading: "Retrieving Sheet"
      };
      $cells = [];
    }

    transactionInfo.modalOpen = false;
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

  :global(body) {
    height: auto;
    position:static;
  }
</style>

<Header platformName="EngineeringPaper.xyz">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>

  <HeaderNav>
    {#if $history.length > 0}
      <HeaderNavMenu text="History">
        {#each $history as {url, creation}, i (url)}
          <HeaderNavItem href={url} text={(new Date(creation)).toLocaleString()+(i === activeHistoryItem ? '<' : '')} />
        {/each}
      </HeaderNavMenu>
    {/if}
  </HeaderNav>

  <HeaderUtilities>
    <HeaderGlobalAction id="add-math-cell" title="Add Math Cell" on:click={addMathCell} icon={AddAlt20}/>
    <HeaderGlobalAction id="add-documentation-cell" title="Add Documentation Cell" on:click={addDocumentationCell} icon={AddComment20}/>
    <HeaderGlobalAction id="new-sheet" title="New Sheet" on:click={loadBlankSheet} icon={DocumentBlank20}/>
    <HeaderGlobalAction id="upload-sheet" title="Get Shareable Link" on:click={() => (transactionInfo = {state: 'idle', modalOpen: true, heading: "Save as Sharable Link"}) } icon={CloudUpload20}/>
  </HeaderUtilities>

</Header>

<Content>
  <DocumentTitle bind:title={$title}/>

  <CellList />

  {#if transactionInfo.modalOpen}
    <Modal
      passiveModal={transactionInfo.state === "success" ||
                    transactionInfo.state === "error" ||
                    transactionInfo.state === "pending" ||
                    transactionInfo.state === "retrieving"}
      bind:open={transactionInfo.modalOpen}
      modalHeading={transactionInfo.heading}
      primaryButtonText="Confirm"
      secondaryButtonText="Cancel"
      on:click:button--secondary={() => (transactionInfo.modalOpen = false)}
      on:open
      on:close
      on:submit={uploadSheet}
    >
      {#if transactionInfo.state === "idle"}
        <p>Saving this document will create a private shareable link that can be used to access this 
          document in the future. Anyone you share this link with will be able to access the document.
        </p>
      {:else if transactionInfo.state === "pending"}
        <InlineLoading description="Getting shareable link..."/>
      {:else if transactionInfo.state === "success"}
        <p>Save this link in order to be able to access or share this sheet.</p>
        <br>
        <div class="shareable-link">
          <label for="shareable-link" class="shareable-link-label">Shareable Link:</label>
          <input type="text" id="shareable-link" value={transactionInfo.url} size=50 readonly>
          <CopyButton text={transactionInfo.url} />
        </div>
      {:else if transactionInfo.state === "retrieving"}
        <InlineLoading description={`Retrieving sheet: ${window.location}`}/>
      {:else}
        <InlineLoading status="error" description="An error occurred" />
        {transactionInfo.error}
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
</Content>