<script>
  import { onDestroy, onMount, tick } from "svelte";
  import { cells, title, results, history, debug, activeCell, 
           nextId, getSheetJson, resetSheet, sheetId, mathCellChanged,
          addMathCell, prefersReducedMotion } from "./stores.js";
  import CellList from "./CellList.svelte";
  import DocumentTitle from "./DocumentTitle.svelte";
  import UnitsDocumentation from "./UnitsDocumentation.svelte";
  import Terms from "./Terms.svelte";
  import Updates from "./Updates.svelte";

  import { unit, bignumber } from "mathjs";

  import QuickLRU from "quick-lru";

  import { get, set, update } from 'idb-keyval';

  import {
    Modal,
    InlineLoading,
    CopyButton,
    Header,
    SkipToContent,
    HeaderUtilities,
    HeaderGlobalAction,
    Content,
    SideNav, SideNavMenuItem, SideNavMenu, SideNavItems, SideNavLink
  } from "carbon-components-svelte";

  import CloudUpload20 from "carbon-icons-svelte/lib/CloudUpload20";
  import DocumentBlank20 from "carbon-icons-svelte/lib/DocumentBlank20";
  import Debug20 from "carbon-icons-svelte/lib/Debug20";
  import Ruler20 from "carbon-icons-svelte/lib/Ruler20";
  import Help20 from "carbon-icons-svelte/lib/Help20";
  import Launch20 from "carbon-icons-svelte/lib/Launch20";

  import 'quill/dist/quill.snow.css';
  import 'carbon-components-svelte/css/white.css';

  let apiUrl;
  if (process.env.NODE_ENV === "production") {
    apiUrl = "https://engineeringpaper.herokuapp.com";
  } else {
    apiUrl = "http://127.0.0.1:8000";
  }

  const currentVersion = 20210909;
  const tutorialUrl = "https://engineeringpaper.xyz/#JMTn6kquHK2AcJgFHcorzi";

  // Provide global function for setting latex for MathField
  // this is used for testing
  window.setCellLatex = function (cellIndex, latex){
    $cells[cellIndex].extra.mathFieldInstance.setLatex(latex);
  }

  // start webworker for python calculations
  let pyodideWorker, pyodideTimeout;
  let pyodideTimeoutRef = 0;
  let pyodideLoaded;
  let pyodideNotAvailable;
  let forcePyodidePromiseRejection;
  let pyodidePromise = null;
  let pyodideLoadingTimeoutRef = 0;
  const pyodideTimeoutLength = 2000;
  const pyodideLoadingTimeoutLength = 60000;
  let error = null;

  let ignoreHashChange = false;
  let unsavedChange = false;
  let activeHistoryItem = -1;
  let recentSheets = new Map();

  let inIframe = false;

  let refreshCounter = BigInt(1);
  let cache = new QuickLRU({maxSize: 100}); 
  let cacheHitCount = 0;

  let isSideNavOpen = false;

  // state = "idle", "pending", "success", "error", "retrieving", "bugReport", "supportedUnits", "firstTime"
  let transactionInfo = {state: "idle", modalOpen: false, heading: "Save as Sharable Link"}; 

  function startWorker() {
    if (pyodideLoadingTimeoutRef) {
      clearTimeout(pyodideLoadingTimeoutRef);
    }    
    error = null;
    pyodideLoaded = false;
    pyodideNotAvailable = false;
    pyodideWorker = new Worker("webworker.js");

    pyodidePromise = new Promise((resolve, reject) => {
      pyodideWorker.onmessage = function (message) {
        if (message.data === "pyodide_loaded") {
          pyodideLoaded = true;
          error = null;
          resolve(true);
        } else if (message.data === "pyodide_not_avaiable") {
          pyodideNotAvailable = true;
          reject("Pyodide failed to load.");
        }
      }
    });
    pyodideTimeout = false;

    pyodideLoadingTimeoutRef = setTimeout(() => {
      if(!pyodideLoaded) {
        error = "Pyodide failed to load. Refreshing page may help.";
      }
    }, pyodideLoadingTimeoutLength);
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

  onMount( async () => {
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    $prefersReducedMotion = mediaQueryList.matches
    mediaQueryList.addEventListener('change', handleMotionPreferenceChange);

    unsavedChange = false;
    await refreshSheet();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyboardShortcuts);

    if ( window.self !== window.top) {
      inIframe = true;
    }

    if (!inIframe) {
      let firstTime = true;

      try {
        const previousVisit = await get('previousVisit');
        if (previousVisit) {
          firstTime = false;
        }
      } catch(e) {
        firstTime = true;
        console.log(`Error checking if first use: ${e}`);
      }

      if (firstTime) {
        if(window.location.hash.length !== 23) {
          // not pointed at sheet so load first time tutorial sheet
          await downloadSheet('introduction.json', false, false);
        }
        // show everyone the terms and conditions the first time they open the site
        transactionInfo = {
          modalOpen: true,
          state: "firstTime",
          heading: "Terms and Conditions"
        }
        try {
          await set('previousVisit', true);
        } catch (e) {
          console.log(`Error updating previousVist entry: ${e}`);
        }
      } else {
        // if not first time, let user know if there is a new feature release
        let previousVersion;
        try {
          previousVersion = await get('previousVersion');
          if (!previousVersion) {
            previousVersion = 0;
          }
        } catch(e) {
          previousVersion = 0;
          console.log(`Error checking previous version: ${e}`);
        }

        if (currentVersion > previousVersion) {
            transactionInfo = {
            modalOpen: true,
            state: "newVersion",
            heading: "New Features"
          }
        }
      }

      // set previousVersion in local storage to current version
      try {
        await set('previousVersion', currentVersion);
      } catch (e) {
        console.log(`Error updating previousVersion entry.${e}`);
      }

      // get recent sheets list
      await retrieveRecentSheets();
    }
  });

  function handleMotionPreferenceChange(event) {
    $prefersReducedMotion = event.matches;
  }

  function handleKeyboardShortcuts(event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "s":
      case "S":
        if (!event.ctrlKey || transactionInfo.modalOpen) {
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
      case "Enter":
        if (($cells[$activeCell]?.data.type === "math" || 
            $cells[$activeCell]?.data.type === "plot") &&
            !transactionInfo.modalOpen) {
          addMathCell($activeCell+1);
        } else {
          // in a documentation cell so ignore
          return;
        }
      default:
        return;
    }

    event.preventDefault();
  }

  function handleBeforeUnload(event) {
    if(unsavedChange && !inIframe){
      event.preventDefault();
      event.returnValue = '';
    } else {
      delete event['returnValue'];
    }
  } 

  async function handleHashChange(event) {
    await refreshSheet();
  }

  async function refreshSheet() {
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
      refreshSheet();
    } else {
      window.location.hash = "";
    }
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

  function getStatementsForPython() {
    const statements = [];

    for (const cell of $cells) {
      if (cell.data.type === "math") {
        statements.push(cell.extra.statement);
      } else if (cell.data.type === "plot") {
        statements.push(...cell.extra.statements.slice(0,cell.data.latexs.length-1));
      }
    }

    return statements;
  }

  function noParsingErrors() {
    return !$cells.reduce(parsingErrorReducer, false)
  }

  function parsingErrorReducer(acum, cell) {
    if (cell.data.type === "math") {
      return acum || cell.extra.parsingError;
    } else if(cell.data.type === "plot") {
      return acum || !cell.extra.parsingErrors.every((value) => !value);
    } else {
      return acum || false;
    }
  }

  async function handleCellUpdate() {
    const myRefreshCount = ++refreshCounter;
    $results = [];
    error = "";
    await pyodidePromise;
    pyodideTimeout = false;
    if (myRefreshCount === refreshCounter && noParsingErrors()) {
      let statements = JSON.stringify(getStatementsForPython());
      clearTimeout(pyodideTimeoutRef);
      pyodideTimeoutRef = setTimeout(() => pyodideTimeout=true, pyodideTimeoutLength);
      $results = [];
      error = "";
      pyodidePromise = getResults(statements)
      .then((data) => {
        $results = []
        if (!data.error) {
          let counter = 0
          $cells.forEach((cell, i) => {
            if ((cell.data.type === "math" || cell.data.type === "plot") && data.results.length > 0) {
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

  function unitsEquivalent(units1, units2) {
    try {
      if (arraysEqual(unit(units1).dimensions, unit(units2).dimensions)) {
        return true;
      } else {
        return false;
      }
    } catch(e) {
      // One of the units not recognized by mathjs
      // Units cannot be used so mark them as not matching
      console.warn(`Units not recognized, either ${units1} or ${units2}`);
      return false;
    }
  }

  async function restartPyodide() {
    // reject any pending promise and restart webworker
    if (forcePyodidePromiseRejection) {
      forcePyodidePromiseRejection();
    }
    await pyodidePromise;
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
        if (response.status === 413) {
          throw new Error('Sheet too large for database, reduce size of images and try to resubmit. Height and width of any images should be 800 pixels or less.');
        } else {
          throw new Error(`Unexpected response status ${response.status}`);
        }
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

      // on successful upload, update recent sheets
      await updateRecentSheets();
    } catch (error) {
      console.log("Error sharing sheet:", error);
      transactionInfo = {
        state: "error",
        error: error,
        modalOpen: true,
        heading: transactionInfo.heading};
    }
  }

  async function downloadSheet(url, modal=true, updateRecents=true) {
    if (modal) {
      transactionInfo = {state: "retrieving", modalOpen: true, heading: "Retrieving Sheet"};
    }

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
      if (modal) {
        transactionInfo = {
          state: "error",
          error: `<p>Error retrieving sheet ${window.location}. The URL may be incorrect or
  the server may be temporarily overloaded or down. If problem persists, please report problem to
  <a href="mailto:support@engineeringpaper.xyz?subject=Error Retrieving Sheet&body=Sheet that failed to load: ${encodeURIComponent(window.location.href)}">support@engineeringpaper.xyz</a>.  
  Please include a link to this sheet in the email to assist in debugging the problem. <br>Error: ${error} </p>`,
          modalOpen: true,
          heading: "Retrieving Sheet"
        };
      }
      return;
    }

    try{
      $cells = [];

      await tick();

      $cells = sheet.cells.map(cell => {
        if (cell.type === "math") {
          return {
            data: cell,
            extra: {parsingError: true, parsingErrorMessage: "",
                    statement: null, mathFieldInstance: null,
                    pendingNewLatex: false}
            };
        } else if (cell.type === "documentation") {
          return {
            data: cell,
            extra: {richTextInstance: null}
          };
        } else if (cell.type === "plot") {
          return {
            data: cell,
            extra: {parsingErrors: Array(cell.latexs.length).fill(true),
                    parsingErrorMessages: Array(cell.latexs.length).fill(""),
                    statements: Array(cell.latexs.length).fill(null),
                    mathFieldInstances: Array(cell.latexs.length).fill(null),
                    pendingNewLatexs: Array(cell.latexs.length).fill(false),
                    newLatexs: Array(cell.latexs.length).fill('')
                  }
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
      if(modal) {
        transactionInfo = {
          state: "error",
          error: `<p>Error regenerating sheet ${window.location}.
  This is most likely due to a bug in EngineeringPaper.xyz.
  If problem persists after attempting to refresh the page, please report problem to
  <a href="mailto:support@engineeringpaper.xyz?subject=Error Regenerating Sheet&body=Sheet that failed to load: ${encodeURIComponent(window.location.href)}">support@engineeringpaper.xyz</a>.  
  Please include a link to this sheet in the email to assist in debugging the problem. <br>Error: ${error} </p>`,
          modalOpen: true,
          hading: "Retrieving Sheet"
        };
      }
      $cells = [];
      unsavedChange = false;
      return;
    }

    if (modal) {
      transactionInfo.modalOpen = false;
    }
    unsavedChange = false;

    // on successfull sheet download, update recent sheets list
    if (updateRecents) {
      await updateRecentSheets();
    }
  }

  async function updateRecentSheets() {
    if (!inIframe) {
      const newRecentSheet = {
          url: window.location.href,
          accessTime: new Date(),
          title: $title
        };

      // update the IndexDB recentSheets entry in the database with the new entry
      await update('recentSheets', (oldRecentSheets) => {
        let newRecentSheets = (oldRecentSheets || new Map()).set($sheetId, newRecentSheet);
        // sort with most recent first
        newRecentSheets = new Map([...newRecentSheets].sort((a,b) => b[1].accessTime - a[1].accessTime));
        return newRecentSheets;
      });

      await retrieveRecentSheets();
    }
  }

  async function retrieveRecentSheets() {
    try {
      const localRecentSheets = await get('recentSheets');
      if (localRecentSheets) {
        recentSheets = localRecentSheets;
      }
    } catch(e) {
      console.log(`Error retrieving recentSheets: ${e}`);
    }
  }

  function convertArrayUnits(values, startingUnits, userUnits) {
    if (startingUnits === "") {
      startingUnits = 'in/in';
    }
    return values.map(value => {
      return unit(value, startingUnits).toNumber(userUnits);
    });
  }

  $: {
    document.title = `EngineeringPaper: ${$title}`;
    unsavedChange = true;
  }

  $: if ($cells) {
    if($mathCellChanged) {
      handleCellUpdate();
      $mathCellChanged = false;
    }
    unsavedChange = true;
  }

  // perform unit conversions on results if user specified units
  $: if ($results.length > 0) {
    $results.forEach((result, i) => {
      const cell = $cells[i];
      if (cell.data.type === "plot") {
        for (const [j, statement] of cell.extra.statements.entries()) {
          if (result && result[j] && statement && statement.type === "query" && result[j].plot) {
            for (const data of result[j].data) {
              if (data.numericOutput) {
                data.unitsMismatch = false;
                // convert inputs if units provided
                if (statement.input_units) {
                  const userUnits = statement.input_units;
                  const startingUnits = data.inputUnits;

                  if ( unitsEquivalent(userUnits, startingUnits) ) {
                    data.displayInput = convertArrayUnits(data.input, startingUnits, userUnits);
                    data.displayInputUnits = userUnits;
                  } else {
                    data.unitsMismatch = true;
                  }
                } else {
                  data.displayInput = data.input;
                  data.displayInputUnits = data.inputUnits;
                } 
              
                // convert outputs if units provided
                if (statement.units && statement.units_valid) {
                  const userUnits = statement.units;
                  const startingUnits = data.outputUnits;

                  if ( unitsEquivalent(userUnits, startingUnits) ) {
                    data.displayOutput = convertArrayUnits(data.output, startingUnits, userUnits);
                    data.displayOutputUnits = userUnits;
                  } else {
                    data.unitsMismatch = true;
                  }
                } else {
                  data.displayOutput = data.output;
                  data.displayOutputUnits = data.outputUnits;
                } 
              }
            }
          }
        }
      } else if (
        result && cell.extra.statement &&
        cell.extra.statement.type === "query" &&
        cell.extra.statement.units_valid &&
        cell.extra.statement.units && 
        result.units !== "Dimension Error" &&
        result.units !== "Exponent Not Dimensionless"
      ) {
        const statement = cell.extra.statement;
        if (result.numeric && result.real && result.finite) {
          const resultUnits = [];
          let startingUnits;
          if (result.units) {
            startingUnits = result.units;
          } else {
            // result is unitless, unit() won't accept '' as a unit
            startingUnits = 'in/in';
          }

          let unitsRecognized = true;
          let userUnits;
          try {
            result.value.split(",\\ ").forEach((resultValue) => {
              resultUnits.push(unit(bignumber(resultValue), startingUnits));
            });

            userUnits = unit(statement.units);
          } catch(e) {
            console.warn(`Units not recognized, either ${startingUnits} or ${statement.units}`);
            unitsRecognized = false;
          } 
          if (arraysEqual(resultUnits[0].dimensions, userUnits.dimensions) && unitsRecognized) {
            result.userUnitsValueDefined = true;
            result.userUnitsValue = resultUnits
              .map((currentUnit) => currentUnit.toNumber(statement.units))
              .reduce((accum, current) => accum.length > 0 ? `${accum},\\ ${current}` : `${current}`, "");
            result.unitsMismatch = false;
          } else {
            result.unitsMismatch = true;
          }
        } else {
          // unit conversions not support for symbolic results or complex numbers
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

  :global(div.status > div) {
    width: max-content;
  }

  label.shareable-link-label {
    padding-right: 0.5em;
  }

  div.page {
    display: grid;
    grid-auto-flow: row;
    height: 100vh;
    align-content: start;
  }

  :global(body) {
    height: auto;
    position: static;
  }

  :global(.bx--header) {
    position: static !important;
    flex-wrap: wrap !important;
    height: fit-content !important;
  }

  :global(.bx--header__name) {
    flex-grow: 1;
  }

  :global(.bx--header__global) {
    flex: 0 1 auto !important;
    justify-content: flex-start !important;
  }

  :global(#main-content) {
    padding-bottom: 4rem;
    margin-top: 0;
    overflow: auto;
    position: static;
  }

  div.status-footer {
    position: fixed;
    padding: 5px;
    border-radius: 10px 0px 0px 0px;
    bottom: 0;
    right: 0;
    background: whitesmoke;
    border-top: 1px lightgray solid;
    border-left: 1px lightgray solid;
    z-index: 100;
    display: flex;
    justify-content: flex-start;
  }

  div.status-footer.promise {
    z-index: 200;
  }

  img.logo {
    height: 2em;
    max-width: 40vw;
  }

  span.logo {
    display: flex;
    align-items: center;
  }

</style>

<div class="page">
  <Header
    bind:isSideNavOpen
    persistentHamburgerMenu={!inIframe}
  >
    <span class="logo" slot="platform"><img class="logo" src="logo_dark.svg" alt="EngineeringPaper.xyz"></span>

    <div slot="skip-to-content">
      <SkipToContent />
    </div>

    <HeaderUtilities>
      {#if !inIframe}
        <HeaderGlobalAction id="new-sheet" title="New Sheet" on:click={loadBlankSheet} icon={DocumentBlank20}/>
        <HeaderGlobalAction title="Bug Report" on:click={() => transactionInfo = {
          modalOpen: true,
          state: "bugReport",
          heading: "Bug Report"
        }} icon={Debug20}/>
        <HeaderGlobalAction title="Tutorial" on:click={() => window.location.href=tutorialUrl} icon={Help20}/>
        <HeaderGlobalAction title="Supported Units" on:click={() => transactionInfo = {
          modalOpen: true,
          state: "supportedUnits",
          heading: "Supported Units"
        }} icon={Ruler20}/>
        <HeaderGlobalAction id="upload-sheet" title="Get Shareable Link" on:click={() => (transactionInfo = {state: 'idle', modalOpen: true, heading: "Save as Sharable Link"}) } icon={CloudUpload20}/>
      {:else}
        <HeaderGlobalAction
          title="Open this sheet in a new tab"
          on:click={() => window.open(window.location.href, "_blank")}
          icon={Launch20}
        />
      {/if}
    </HeaderUtilities>

    {#if !inIframe}
      <SideNav bind:isOpen={isSideNavOpen}>
        <SideNavItems>
          <SideNavMenu text="Example Sheets">
            <SideNavMenuItem 
              href={tutorialUrl}
              text="Introduction to EngineeringPaper" 
            />
            <SideNavMenuItem 
              href="https://engineeringpaper.xyz/#WSN8gKDmdPBFBseTzFyVYz"
              text="Equation Solving" 
            />   
            <SideNavMenuItem 
              href="https://engineeringpaper.xyz/#MNsS9tjtLLzcBTgTNboDiz"
              text="Plotting and Function Notation" 
            />   
          </SideNavMenu>
          {#if $history.length > 0}
            <SideNavMenu text="Sheet History">
              {#each $history as {url, creation}, i (url)}
                <SideNavMenuItem href={url} text={(new Date(creation)).toLocaleString()+(i === activeHistoryItem ? ' <' : '')} />
              {/each}
            </SideNavMenu>
          {/if}
          {#if recentSheets.size > 0}
            <SideNavMenu text="Recent Sheets">
              {#each [...recentSheets] as [key, value] (key)}
                <SideNavMenuItem href={value.url} text={`${value.title} ${(new Date(value.accessTime)).toLocaleString()}`} />
              {/each}
            </SideNavMenu>
          {/if}
          <SideNavLink 
            on:click={() => transactionInfo = {
              modalOpen: true,
              state: "firstTime",
              heading: "Terms and Conditions"
            }}
            text="Terms and Conditions" />
          <SideNavLink
            href="https://blog.engineeringpaper.xyz"
            text="Blog"
          />
        </SideNavItems>
      </SideNav>
    {/if}

  </Header>



  <Content>
    <DocumentTitle bind:title={$title}/>

    <CellList />

  </Content>

  {#if transactionInfo.modalOpen}
  <Modal
    passiveModal={!(transactionInfo.state === "idle")}
    bind:open={transactionInfo.modalOpen}
    modalHeading={transactionInfo.heading}
    primaryButtonText="Confirm"
    secondaryButtonText="Cancel"
    on:click:button--secondary={() => (transactionInfo.modalOpen = false)}
    on:open
    on:close
    on:submit={ transactionInfo.state === "idle" ? uploadSheet : null }
    hasScrollingContent={transactionInfo.state === "supportedUnits" ||
                        transactionInfo.state === "firstTime" || transactionInfo.state === "newVersion"}
    preventCloseOnClickOutside={!(transactionInfo.state === "supportedUnits" ||
                                  transactionInfo.state === "bugReport")}
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
    {:else if transactionInfo.state === "bugReport"}
      <p>If you have discovered a bug in EngineeringPaper.xyz, 
        please send a bug report to 
        <a href={`mailto:support@engineeringpaper.xyz?subject=Bug Report&body=Sheet with issues: ${encodeURIComponent(window.location.href)}`}>support@engineeringpaper.xyz</a>.
        Please include a description of the problem. Additionally, it's best if you can include a link to the sheet that is experiencing the problem.
      </p>
    {:else if transactionInfo.state === "supportedUnits"}
      <UnitsDocumentation />
    {:else if transactionInfo.state === "firstTime"}
      <Terms />
    {:else if transactionInfo.state === "newVersion"}
      <Updates />
    {:else}
      <InlineLoading status="error" description="An error occurred" />
      {@html transactionInfo.error}
    {/if}
  </Modal>
  {/if}

  {#await pyodidePromise}
    {#if !pyodideLoaded && !pyodideNotAvailable && !error}
      <div class="status-footer promise">
        <InlineLoading description="Loading Pyodide..."/>
      </div>
    {:else if pyodideLoaded && !pyodideNotAvailable}  
      <div class="status-footer promise">
        <InlineLoading description="Updating..."/>
        {#if pyodideTimeout}
          <button on:click={restartPyodide}>Restart Pyodide</button>
        {/if}
      </div>
    {/if}
  {:catch promiseError}
    <div class="status-footer promise">
      <InlineLoading status="error" description={promiseError}/>
    </div>
  {/await}
  {#if error}
    <div class="status-footer">
      <InlineLoading status="error" description={`Error: ${error}`} />
    </div>
  {/if}
  {#if pyodideNotAvailable}
    <div class="status-footer">
      <InlineLoading status="error" description={`Error: Pyodide failed to load.`} />
    </div>
  {/if}
</div>