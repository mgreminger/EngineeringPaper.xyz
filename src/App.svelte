<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { type Cell, cellFactory } from "./cells/Cells";
  import { BaseCell } from "./cells/BaseCell";
  import MathCell from "./cells/MathCell";
  import TableCell from "./cells/TableCell";
  import PlotCell from "./cells/PlotCell";
  import PiecewiseCell from "./cells/PiecewiseCell";
  import SystemCell from "./cells/SystemCell";
  import { cells, title, results, system_results, history, insertedSheets, activeCell, 
           getSheetJson, getSheetObject, resetSheet, sheetId, mathCellChanged, nonMathCellChanged,
           addCell, prefersReducedMotion, modifierKey, inCellInsertMode,
           incrementActiveCell, decrementActiveCell, deleteCell, activeMathField} from "./stores";
  import { convertUnits, unitsValid, isVisible, versionToDateString } from "./utility";
  import { getHash, API_GET_PATH, API_SAVE_PATH } from "./database/utility";
  import CellList from "./CellList.svelte";
  import DocumentTitle from "./DocumentTitle.svelte";
  import UnitsDocumentation from "./UnitsDocumentation.svelte";
  import KeyboardShortcuts from "./KeyboardShortcuts.svelte";
  import Terms from "./Terms.svelte";
  import RequestPersistentStorage from "./RequestPersistentStorage.svelte";
  import Updates from "./Updates.svelte";
  import InsertSheet from "./InsertSheet.svelte";
  import DropOverlay from "./DropOverlay.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";
  import { keyboards } from "./keyboard/Keyboard";

  import QuickLRU from "quick-lru";

  import { get, set, update, delMany } from 'idb-keyval';

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

  import CloudUpload from "carbon-icons-svelte/lib/CloudUpload.svelte";
  import Document from "carbon-icons-svelte/lib/Document.svelte";
  import DocumentBlank from "carbon-icons-svelte/lib/DocumentBlank.svelte";
  import Ruler from "carbon-icons-svelte/lib/Ruler.svelte";
  import Help from "carbon-icons-svelte/lib/Help.svelte";
  import Launch from "carbon-icons-svelte/lib/Launch.svelte";
  import Keyboard from "carbon-icons-svelte/lib/Keyboard.svelte";
  import InformationFilled from "carbon-icons-svelte/lib/InformationFilled.svelte";
  import ErrorFilled from "carbon-icons-svelte/lib/ErrorFilled.svelte";
  import Download from "carbon-icons-svelte/lib/Download.svelte";

  import 'quill/dist/quill.snow.css';
  import 'carbon-components-svelte/css/white.css';

  const apiUrl = window.location.origin;

  const currentVersion = 20230117;
  const tutorialHash = "CUsUSuwHkHzNyButyCHEng";

  const termsVersion = 20230122;
  let termsAccepted = 0;

  const exampleSheets = [
    {
      path: `/${tutorialHash}`,
      title: "Introduction to EngineeringPaper" 
    },
    {
      path: "/TxAftUqQCmXKNPX5XGBUy8",
      title: "Plotting and Functions" 
    },
    {
      path: "/DeP4bqfF2H5VbRJz3Nd9Re",
      title: "Equation Solving" 
    },
  ];

  const prebuiltTables = [
    {
      url: "https://engineeringpaper.xyz/PaFvsBhgoJdZEEwyBLPnD6",
      title: "Mechanical Properties of Metals" 
    },
    {
      url: "https://engineeringpaper.xyz/QF5ThTJMUhn2sLBxM4Vyr9",
      title: "Coefficients of Friction" 
    },
    {
      url: "https://engineeringpaper.xyz/FwahHU9W8ht28t9p4LNqFd",
      title: "Coefficients of Thermal Expansion" 
    },
    {
      url: "https://engineeringpaper.xyz/iBxxaDryEV8NkdrNdsZzvF",
      title: "Electrical Properties of Conductors" 
    },
    {
      url: "https://engineeringpaper.xyz/EyXiBtFajaDHpxqRpvGQFX",
      title: "Dielectric Properties" 
    },
    {
      url: "https://engineeringpaper.xyz/EnZhHT9wvsESXvRChZ7TLV",
      title: "Properties of Liquids" 
    },
    {
      url: "https://engineeringpaper.xyz/bPX72mmrNjVsgZbos25Gkw",
      title: "Beam Section Properties" 
    },
    {
      url: "https://engineeringpaper.xyz/XvB4X3qGDZoupFyRCLbWmL",
      title: "W-Beam Properties" 
    },
    {
      url: "https://engineeringpaper.xyz/ndyjJRwvqoJBfVLw7BGFfu",
      title: "Musical Note Frequencies" 
    }
  ];

  // Provide global function for setting latex for MathField
  // this is used for testing
  (window as any).setCellLatex = function (cellIndex: number, latex: string, subIndex?: number) {
    const cell = $cells[cellIndex];
    if ( cell instanceof MathCell) {
      cell.mathField.element.setLatex(latex);
    } else if ( cell instanceof SystemCell) {
      if (subIndex !== undefined) {
        cell.expressionFields[subIndex].element.setLatex(latex);
      }
    } else if (cell instanceof PlotCell) {
      if (subIndex !== undefined) {
        cell.mathFields[subIndex].element.setLatex(latex);
      }
    }
  };

  // used for testing so that correct modifier key is used in tests
  (window as any).modifierKey = $modifierKey;

  // Used for testing to force new sheet even with unsaved changes.
  // This is necessary since dismissing the unsaved changes dialog in playwright doesn't work after the first
  // time it is requested.
  (window as any).forceLoadBlankSheet = () => {unsavedChange = false; loadBlankSheet();};

  // Used for testing to simplify the deleting of cells
  // The two-step delete, delete and then delete the undo delete cell, 
  // can be flaky for firefox and webkit
  // webkit in particular waits for the progress bar to go down before playwright considers the DOM stable
  (window as any).forceDeleteCell = (index: number) => deleteCell(index, true);

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
  let noParsingErrors = true;

  let unsavedChange = false;
  let recentSheets = new Map();
  const maxRecentSheetsLength = 50;

  let currentState = "/"; // used when popstate is cancelled by user
  let refreshingSheet = false; // since refreshSheet is async, need to make sure more than one call is not happening at once

  const autosaveInterval = 10000; // msec between check to see if an autosave is needed
  const checkpointPrefix = "temp-checkpoint-";
  let numCheckpoints = 500; 
  const minNumCheckpoints = 10;
  const decrementNumCheckpoints = 20; 
  let autosaveIntervalId: null | number = null;
  let autosaveNeeded = false;

  let showKeyboard = false;

  let inIframe = false;

  let fileDropActive = false;

  let refreshCounter = BigInt(1);
  let cache = new QuickLRU({maxSize: 100}); 
  let cacheHitCount = 0;

  let sideNavOpen = false;
  

  type ModalInfo = {
    state: "idle" | "pending" | "success" | "error" | "requestPersistentStorage" |
           "retrieving" | "restoring" | "bugReport" | "supportedUnits" | "opening" |
           "termsAndConditions" | "newVersion" | "insertSheet" | "keyboardShortcuts",
    modalOpen: boolean,
    heading: string,
    url?: string,
    error?: string,
    insertionLocation?: number
  }
  
  let modalInfo:ModalInfo = {
    state: "idle", 
    modalOpen: false, 
    heading: "Save as Shareable Link",
  }; 

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

    pyodideLoadingTimeoutRef = window.setTimeout(() => {
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
    window.removeEventListener("hashchange", handleSheetChange);
    window.removeEventListener("popstate", handleSheetChange);
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.removeEventListener("keydown", handleKeyboardShortcuts);
    window.removeEventListener("beforeprint", handleBeforePrint);
    terminateWorker();
    if (autosaveIntervalId) {
      window.clearInterval(autosaveIntervalId);
    }
  });

  onMount( async () => {
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    $prefersReducedMotion = mediaQueryList.matches
    mediaQueryList.addEventListener('change', handleMotionPreferenceChange);

    unsavedChange = false;
    autosaveNeeded = false;
    await refreshSheet(true);

    window.addEventListener("hashchange", handleSheetChange);
    window.addEventListener("popstate", handleSheetChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyboardShortcuts);
    window.addEventListener("beforeprint", handleBeforePrint);

    autosaveIntervalId = window.setInterval(saveLocalCheckpoint, autosaveInterval);

    if ( window.self !== window.top) {
      inIframe = true;
    }

    if (!inIframe) {
      let firstTime = true;

      try {
        const previousVisit = await get('previousVisit');
        const localTermsAccepted = await get('termsAccepted');
        if (localTermsAccepted === undefined || localTermsAccepted === true) {
          // need to check against true since this feature initially stored
          // true in local storage when terms were accepted
          termsAccepted = 0;
        } else {
          termsAccepted = localTermsAccepted;
        }
        if (previousVisit) {
          firstTime = false;
        }
      } catch(e) {
        firstTime = true;
        termsAccepted = 0;
        console.log(`Error checking if first use: ${e}`);
      }

      if (firstTime) {
        try {
          await set('previousVisit', true);
        } catch (e) {
          console.log(`Error updating previousVist entry: ${e}`);
        }
      } else {
        // if not first time, let user know if there is a new feature release
        let previousVersion: number;
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
            modalInfo = {
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
        console.log(`Error updating previousVersion entry: ${e}`);
      }

      // get recent sheets list
      await retrieveRecentSheets();

      // get prevoiusly defined numCheckpoints if available
      try {
        const localNumCheckpoints = await get('numCheckpoints');
        if (localNumCheckpoints) {
          numCheckpoints = Math.max(minNumCheckpoints, localNumCheckpoints);
        }
      } catch (e) {
        console.log(`Error getting numCheckpoints: ${e}`);
      }

    } else {
      // when in an iframe, post message when document body changes length
      const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          window.parent.postMessage(`${entry.target.scrollHeight}px`, '*');
        });
      });
      resizeObserver.observe(document.body)
    }
  });

  async function handleBeforePrint() {
    $activeCell = -1;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    sideNavOpen = false;
    await tick();
  }

  function showTerms() {
    modalInfo = {
      modalOpen: true,
      state: "termsAndConditions",
      heading: "Terms and Conditions"
    };
  }

  function showRequestPersistentStorage() {
    modalInfo = {
      modalOpen: true,
      state: "requestPersistentStorage",
      heading: "Enable Persistent Local Storage"
    };
  }

  async function acceptTerms() {
    if (termsAccepted < termsVersion) {
      termsAccepted = termsVersion;
      try {
          await set('termsAccepted', termsAccepted);
      } catch (e) {
          console.log(`Error updating termsAccepted entry: ${e}`);
      }
    }
  }


  function handleMotionPreferenceChange(event) {
    $prefersReducedMotion = event.matches;
  }

  function handleKeyboardShortcuts(event: KeyboardEvent) {
    // this frist swtich statement is for keyboard shortcuts that should ignore defaultPrevented
    switch (event.key) {
      case "ArrowDown":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else {
          incrementActiveCell();
        }
        break;
      case "ArrowUp":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else {
          decrementActiveCell();
        }
        break;
    }

    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "d":
      case "D":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else {
          if ($activeCell > -1 && $activeCell < $cells.length) {
            deleteCell($activeCell);
          }
        }
        break;
      case "o":
      case "O":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else {
          handleFileOpen();
        }
        break;
      case "n":
      case "N":
        if (!event[$modifierKey] || !event.shiftKey || modalInfo.modalOpen) {
          return;
        } else {
          loadBlankSheet();
        }
        break;
      case "s":
      case "S":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else if (event.shiftKey) {
          modalInfo = {
            state: 'idle',
            modalOpen: true,
            heading: "Save as Sharable Link"
          };
        } else {
          saveSheetToFile();
        }
        break;
      case "Esc":
      case "Escape":
        if ($inCellInsertMode) {
          const button = document.getElementById("insert-popup-button-esc");
          if (button) {
            button.click();
          }
          break;
        }
        $activeCell = -1;
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        modalInfo.modalOpen = false;
        sideNavOpen = false;
        break;
      case "Enter":
        if ($cells[$activeCell]?.type === "math" && !modalInfo.modalOpen &&
            !event[$modifierKey]) {
          addCell('math', $activeCell+1);
          break;
        } else if (event.shiftKey && !modalInfo.modalOpen) {
          let insertionPoint: number;
          if ($activeCell < 0) {
            insertionPoint = 0;
          } else if ($activeCell >= $cells.length) {
            insertionPoint = $cells.length 
          } else {
            insertionPoint = $activeCell + 1
          }
          addCell('math', insertionPoint);
          break;
        } else if (event[$modifierKey] && !modalInfo.modalOpen) {
          if (!$inCellInsertMode ) {
            let insertionPoint: number;
            if ($activeCell < 0) {
              insertionPoint = 0;
            } else if ($activeCell >= $cells.length) {
              insertionPoint = $cells.length 
            } else {
              insertionPoint = $activeCell + 1
            }
            $inCellInsertMode = true;
            addCell('insert', insertionPoint);
            break;
          } else {
            // Ctrl-Enter when in cell insert mode
            // break to prevent default so that Ctrl-Enter doesn't click insert math cell button
            break;
          }
        } else {
          // not in a math cell and no shift or modifier
          return;
        }
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
        if ($inCellInsertMode) {
          const button = document.getElementById("insert-popup-button-" + event.key);
          if (button) {
            button.click();
          }
          break;
        } else {
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


  function getSheetHash(url: Location | URL) {
    let hash = "";

    // First check if url hash could be sheet hash, if not check if path could a checkpoint or sheet hash
    // url hash needs to be checked since early version of app used url hash instead of path
    if (url.hash.length === 23) {
      hash = url.hash.slice(1);
    } else if (url.pathname.slice(1).startsWith(checkpointPrefix) || url.pathname.length === 23) {
      hash = url.pathname.slice(1);
    }

    return hash;
  }

  async function handleSheetChange(event) {
    await refreshSheet();
  }

  async function refreshSheet(firstTime = false) {
    if (!refreshingSheet) {
      refreshingSheet = true;

      const hash = getSheetHash(window.location);

      if (!unsavedChange || window.confirm("Continue loading sheet, any unsaved changes will be lost?")) {
        currentState = `/${hash}`;
        if (hash.startsWith(checkpointPrefix)) {
          await restoreCheckpoint(hash);
        } else if(hash !== "") {
          await downloadSheet(`${apiUrl}${API_GET_PATH}${hash}`, true, true, firstTime);
        } else {
          resetSheet();
          await tick();
          addCell('math');
          await tick();
          unsavedChange = false;
          autosaveNeeded = false;
        }
      } else {
        // navigation cancelled, restore previous path
        window.history.replaceState(null, "", currentState);
      }

      refreshingSheet = false;
    } else {
      // another refresh is already in progress
      // don't start a new one and reset the url path to match refresh already in progress
      window.history.pushState(null, "", currentState);
    }
  }

  function loadBlankSheet() {
    const hash = getSheetHash(window.location);
    if (hash === "") {
      refreshSheet();
    } else {
      window.history.pushState(null, "", "/");
      refreshSheet(); // pushState does not trigger onpopstate event
    }
  }

  function getResults(statementsAndSystems, myRefreshCount) {
    return new Promise((resolve, reject) => {
      function handleWorkerMessage(e) {
        forcePyodidePromiseRejection = null;
        if (myRefreshCount !== refreshCounter) {
          reject("Stale solution, resolving. If this message persists, make an edit to trigger a recalculation.")
        } else if (e.data === "pyodide_not_available") {
          // pyodide didn't load properly
          reject("Pyodide failed to load.");
        } else if (e.data === "max_recursion_exceeded") {
          reject("Max recursion depth exceeded.")
        } else {
          if (!cache.has(statementsAndSystems)) {
            cache.set(statementsAndSystems, e.data);
          }
          resolve(e.data);
        }
      }
      const cachedResult = cache.get(statementsAndSystems);
      if (cachedResult) {
        cacheHitCount++;
        resolve(cachedResult);
      } else {
        forcePyodidePromiseRejection = () => reject("Restarting pyodide.")
        pyodideWorker.onmessage = handleWorkerMessage;
        pyodideWorker.postMessage({cmd: 'sheet_solve', data: statementsAndSystems});
      }
    });
  }

  function getStatementsAndSystemsForPython() {
    const statements = [];
    const endStatements = [];
    const systemDefinitions = [];

    for (const [cellNum, cell] of $cells.entries()) {
      if (cell instanceof MathCell) {
        // cell id's need to be set here since inserting or deleting cells doesn't
        // cause all math cells to reparse
        cell.mathField.statement.id = cellNum; 
        statements.push(cell.mathField.statement);
      } else if (cell instanceof PlotCell) {
        for (const mathField of cell.mathFields) {
          mathField.statement.id = cellNum;
          statements.push(mathField.statement);
        }
      } else if (cell instanceof TableCell) {
        const newStatements = cell.parseTableStatements(cellNum);
        for (const statement of newStatements) {
          statement.id = cellNum;
          endStatements.push(statement);
        }
      } else if (cell instanceof PiecewiseCell) {
        const statement = cell.parsePiecewiseStatement(cellNum);
        statement.id = cellNum;
        endStatements.push(statement);
      } else if (cell instanceof SystemCell) {
        const systemDefinition = cell.getSystemDefinition();
        if (systemDefinition) {
          systemDefinitions.push(systemDefinition);
        }
      }
    }

    statements.push(...endStatements);

    return {statements: statements, systemDefinitions: systemDefinitions};
  }

  function checkParsingErrors() {
    return $cells.reduce(parsingErrorReducer, false)
  }

  function parsingErrorReducer(acum: boolean, cell: Cell) {
    if (cell instanceof MathCell) {
      return acum || cell.mathField.parsingError;
    } else if (cell instanceof PlotCell) {
      return acum || cell.mathFields.some(field => field.parsingError);
    } else if (cell instanceof TableCell) {
      return acum || cell.parameterFields.some(value => value.parsingError) ||
                     cell.parameterUnitFields.some(value => value.parsingError) ||
                     cell.rhsFields.reduce((accum, row) => accum || row.some(value => value.parsingError), false);
    } else if (cell instanceof PiecewiseCell) {
      return acum || cell.parameterField.parsingError || 
                     cell.expressionFields.some(value => value.parsingError) ||
                     cell.conditionFields.some(value => value.parsingError);
    } else if (cell instanceof SystemCell) {
      return acum || cell.parameterListField.parsingError || 
                     cell.expressionFields.some(value => value.parsingError);
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
    if (myRefreshCount === refreshCounter && noParsingErrors) {
      let statementsAndSystems = JSON.stringify(getStatementsAndSystemsForPython());
      clearTimeout(pyodideTimeoutRef);
      pyodideTimeoutRef = window.setTimeout(() => pyodideTimeout=true, pyodideTimeoutLength);
      $results = [];
      error = "";
      pyodidePromise = getResults(statementsAndSystems, myRefreshCount)
      .then((data: any) => {
        $results = [];
        if (!data.error && data.results.length > 0) {
          let counter = 0;
          for (const [i, cell] of $cells.entries()) {
            if ((cell.type === "math" || cell.type === "plot") ) {
              $results[i] = data.results[counter++]; 
            }
          }
        }
        error = data.error;
        $system_results = [];
        let counter = 0;
        for (const [i, cell] of $cells.entries()) {
          if (cell.type === "system") {
            $system_results[i] = data.systemResults[counter++]
          }
        }
      })
      .catch((errorMessage) => error=errorMessage);
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
    $system_results = [];
    refreshCounter++; // make all pending updates stale
  }

  async function uploadSheet() {
    modalInfo.state = "pending";
    const data = getSheetJson();
    const hash = await getHash(data);
    
    let response, responseObject;

    try {
      response = await fetch(`${apiUrl}${API_SAVE_PATH}${hash}`, {
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
          throw new Error(`${response.status} ${await response.text()}`);
        }
      }

      if (getSheetHash(window.location) !== responseObject.hash) {
        currentState = `/${responseObject.hash}`;
        window.history.pushState(null, "", currentState);
      }

      console.log(responseObject.url);
      modalInfo = {
        state: "success",
        url: window.location.href,
        modalOpen: true,
        heading: modalInfo.heading
      };
      unsavedChange = false;
      autosaveNeeded = false;

      $history = responseObject.history;

      // on successful upload, update recent sheets
      await updateRecentSheets();
    } catch (error) {
      console.log("Error sharing sheet:", error);
      modalInfo = {
        state: "error",
        error: error,
        modalOpen: true,
        heading: modalInfo.heading};
    }
  }


  async function downloadSheet(url, modal=true, updateRecents=true, firstTime = false) {
    if (modal) {
      modalInfo = {state: "retrieving", modalOpen: true, heading: "Retrieving Sheet"};
    }

    let sheet, requestHistory;
    
    try{
      let response;
      response = await fetch(url);

      if (response.ok) {
        const responseObject = await response.json();
        sheet = JSON.parse(responseObject.data);
        requestHistory = responseObject.history;
      } else {
        throw new Error(`${response.status} ${await response.text()}`);
      }
    } catch(error) {
      if (modal) {
        modalInfo = {
          state: "error",
          error: `<p>Error retrieving sheet ${window.location}. The URL may be incorrect or
the server may be temporarily overloaded or down. If problem persists, please report problem to
<a href="mailto:support@engineeringpaper.xyz?subject=Error Retrieving Sheet&body=Sheet that failed to load: ${encodeURIComponent(window.location.href)}">support@engineeringpaper.xyz</a>.  
Please include a link to this sheet in the email to assist in debugging the problem. <br>${error} </p>`,
          modalOpen: true,
          heading: "Retrieving Sheet"
        };
      }
      return;
    }

    const renderError = await populatePage(sheet, requestHistory);

    if (renderError) {
      if(modal) {
        modalInfo = {
          state: "error",
          error: `<p>Error regenerating sheet ${window.location}.
This is most likely due to a bug in EngineeringPaper.xyz.
If problem persists after attempting to refresh the page, please report problem to
<a href="mailto:support@engineeringpaper.xyz?subject=Error Regenerating Sheet&body=Sheet that failed to load: ${encodeURIComponent(window.location.href)}">support@engineeringpaper.xyz</a>.  
Please include a link to this sheet in the email to assist in debugging the problem. </p>`,
          modalOpen: true,
          heading: "Retrieving Sheet"
        };
      }
      $cells = [];
      unsavedChange = false;
      autosaveNeeded = false;
      return;
    }

    if (modal) {
      modalInfo.modalOpen = false;
    }
    unsavedChange = false;
    autosaveNeeded = false;

    // on successfull sheet download, update recent sheets list
    if (updateRecents) {
      await updateRecentSheets();
    }
  }

  async function populatePage(sheet, requestHistory): Promise<boolean> {
    try{
      $cells = [];
      $results = [];
      $system_results = [];
      $activeCell = -1;

      await tick();

      $cells = sheet.cells.map(cellFactory);

      $title = sheet.title;
      BaseCell.nextId = sheet.nextId;
      $sheetId = sheet.sheetId;
      // old documents in database will not have the insertedSheets property
      $insertedSheets = sheet.insertedSheets ? sheet.insertedSheets : [];

      if (!$history.map(item => item.url !== "file" ? getSheetHash(new URL(item.url)) : "").includes(getSheetHash(window.location))) {
        $history = requestHistory;
      }

      await tick(); // this will populate mathFieldElement and richTextInstance fields

      $results = sheet.results;
      // old documents in the database won't have the system_results property
      $system_results = sheet.system_results ? sheet.system_results : [];

    } catch(error) {
      return true;
    }

    return false;
  }

  // open sheet using a input of type file
  function handleFileOpen() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".epxyz";
    input.onchange = (event) => openSheetFromFile(input.files[0]);
    input.click();
  }

  // open sheet from a drop event
  function handleFileDrop(event: DragEvent) {
    fileDropActive = false;
    const file = event.dataTransfer.files[0];
    if (file) {
      openSheetFromFile(file);
    }
  }

  function openSheetFromFile(file: File) {
    modalInfo = {state: "opening", modalOpen: true, heading: "Opening File"};
    const reader = new FileReader();
    reader.onload = parseFile;
    reader.readAsText(file); 
  }

  async function parseFile(event: ProgressEvent<FileReader>) {
    let sheet, requestHistory;
    
    try{
      const fileObject = JSON.parse((event.target.result as string));
      if (fileObject.data && fileObject.history) {
        sheet = fileObject.data;
        requestHistory = fileObject.history;
      } else {
        throw `File is not the correct format`;
      }

    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>${error} <br><br>
Error parsing input file. Make sure your attempting to open an EngineeringPaper.xyz file.
<br><br>
If this problem persists after verifying the file is an EngineeringPaper.xyz,
email support@engineeringpaper.xyz
with the file that is not opening attached, if possible.
 </p>`,
        modalOpen: true,
        heading: "Opening Sheet"
      };
      return;
    }

    const renderError = await populatePage(sheet, requestHistory);

    if (renderError) {
      modalInfo = {
        state: "error",
        error: `<p>Error restoring file. <br><br>
          Error parsing input file. Make sure your attempting to open an EngineeringPaper.xyz file.
<br><br>
If this problem persists after verifying the file is an EngineeringPaper.xyz file,
email support@engineeringpaper.xyz
with the file that is not opening attached, if possible. </p>`,
        modalOpen: true,
        heading: "Restoring Sheet"
      };

      $cells = [];
      unsavedChange = false;
      autosaveNeeded = false;
      return;
    }

    currentState = '/';
    window.history.pushState(null, "", currentState);

    modalInfo.modalOpen = false;
    unsavedChange = false;
    autosaveNeeded = true; // make a checkpoint so that, if user refreshes browser, the file is restored
  }


  async function restoreCheckpoint(hash: string) {
    modalInfo = {state: "restoring", modalOpen: true, heading: "Retrieving Autosave Checkpoint"};

    let sheet, requestHistory;
    
    try{
      const checkpoint = await get(hash);
      if (checkpoint) {
        sheet = checkpoint.data;
        requestHistory = checkpoint.history;
      } else {
        throw `Autosave checkpoint '${hash}' does not exist on this browser`;
      }
    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>${error}. <br><br>
If someone has shared this link with you, ask them to 
create a shareable link so that you are able to open their sheet. Checkpoint links, such as this one, can only be opened on the computer, 
and the browser, where they were originally generated.
<br><br>
There are several possible causes for this error.
Autosave checkpoints are stored locally on the browser that you are working on. Autosave checkpoints are not permanent 
and may be deleted by your browser to free up space. EngineeringPaper.xyz will only retain the ${numCheckpoints} most recent checkpoints.
Some browsers, Safari for example, automatically delete local browser storage
for a website that has not been visited in the previous 7 days. To request that your browser retains the storage used by
EngineeringPaper.xyz, use the "Enable Persistent Local Storage" option on the left menu. 
 </p>`,
        modalOpen: true,
        heading: "Restoring Sheet"
      };
      return;
    }

    const renderError = await populatePage(sheet, requestHistory);

    if (renderError) {
      modalInfo = {
        state: "error",
        error: `<p>Error restoring autosave checkpoint ${window.location}.
This is most likely due to a bug in EngineeringPaper.xyz.
If problem persists after attempting to refresh the page, please report problem to
<a href="mailto:support@engineeringpaper.xyz?subject=Error Regenerating Sheet&body=Sheet that failed to load: ${encodeURIComponent(window.location.href)}">support@engineeringpaper.xyz</a>.  
Please include a link to this sheet in the email to assist in debugging the problem. </p>`,
        modalOpen: true,
        heading: "Restoring Sheet"
      };

      $cells = [];
      unsavedChange = false;
      autosaveNeeded = false;
      return;
    }

    modalInfo.modalOpen = false;
    unsavedChange = false;
    autosaveNeeded = false;
  }


  function loadInsertSheetModal(e: {detail: {index: number}} ) {
    retrieveRecentSheets();

    modalInfo = {
      modalOpen: true,
      state: "insertSheet",
      heading: "Insert a Sheet",
      url: "",
      insertionLocation: e.detail.index
    }
  }


  async function insertSheet() {
    const index = modalInfo.insertionLocation;

    const sheetUrl = modalInfo.url;
    let sheetHash;

    try {
      sheetHash = getSheetHash(new URL(sheetUrl));
      if (sheetHash === "") {
        throw new Error(`${sheetUrl} is not a valid EngineeringPaper.xyz sheet URL.`);
      }
    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>Error inserting sheet "${sheetUrl ? sheetUrl : 'empty URL'}". The URL is not valid EngineeringPaper.xyz sheet.`,
        modalOpen: true,
        heading: "Retrieving Sheet"
      };
      return;
    }
    
    const url = `${apiUrl}${API_GET_PATH}${sheetHash}`;

    modalInfo = {state: "retrieving", modalOpen: true, heading: "Retrieving Sheet"};

    let sheet;
    
    try{
      let response;
      response = await fetch(url);

      if (response.ok) {
        const responseObject = await response.json();
        sheet = JSON.parse(responseObject.data);
      } else {
        throw new Error(`${response.status} ${await response.text()}`);
      }
    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>Error inserting sheet ${url}. The URL may be incorrect or
the server may be temporarily overloaded or down. If problem persists, please report problem to
<a href="mailto:support@engineeringpaper.xyz?subject=Error Inserting Sheet&body=Sheet that failed to load: ${encodeURIComponent(url)}">support@engineeringpaper.xyz</a>.  
Please include a link to sheet being inserted in the email to assist in debugging the problem. <br>${error} </p>`,
        modalOpen: true,
        heading: "Retrieving Sheet"
      };
      return;
    }

    try{
      $results = [];
      $system_results = [];

      const newCells = sheet.cells.map(cellFactory);

      // need to make sure cell id's don't collide
      for (const cell of newCells) {
        cell.id = BaseCell.nextId++;
      }

      $cells = [...$cells.slice(0, index), ...newCells, ...$cells.slice(index)]

      await tick();
    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>Error inserting sheet ${url}.
This is most likely due to a bug in EngineeringPaper.xyz.
If problem persists after attempting to refresh the page, please report problem to
<a href="mailto:support@engineeringpaper.xyz?subject=Error Regenerating Sheet&body=Sheet that failed to load: ${encodeURIComponent(url)}">support@engineeringpaper.xyz</a>.  
Please include a link to this sheet in the email to assist in debugging the problem. <br>${error} </p>`,
        modalOpen: true,
        heading: "Retrieving Sheet"
      };
      $cells = [];
      unsavedChange = false;
      autosaveNeeded = false;
      return;
    }

    modalInfo.modalOpen = false;
    unsavedChange = true;
    autosaveNeeded = true;

    $insertedSheets = [
      {
        title: sheet.title,
        url: sheetUrl,
        insertion: new Date()
      }, 
      ...$insertedSheets
    ];
  }


  // Save using a download anchor element
  // Will be saved to users downloads folder
  function saveSheetToFile() {
    $history = [{
      url: 'file',
      hash: 'file',
      creation: (new Date()).toISOString()
    }, ...$history];

    const sheet = {
        data: getSheetObject(true),
        history: $history
    };

    const fileData = new Blob([JSON.stringify(sheet)], {type: "application/json"});
    const sheetDataUrl = URL.createObjectURL(fileData);
   
    const anchor = document.createElement("a");
    anchor.href = sheetDataUrl;
    anchor.download = `${$title}.epxyz`;
    anchor.click();

    // give download a chance to complete before deleting object url
    setTimeout( () => URL.revokeObjectURL(sheetDataUrl), 5000);
  }


  async function saveLocalCheckpoint() {
    if (autosaveNeeded && !refreshingSheet && !inIframe) {
      const autosaveHash = `${checkpointPrefix}${crypto.randomUUID()}`;
      let saveFailed = false;

      const checkpoint = {
        data: getSheetObject(true),
        history: $history
      }

      const checkpointInfo = {
        hash: autosaveHash,
        sheetId: $sheetId,
        title: $title,
        saveTime: new Date() 
      }

      // save the checkpoint
      try {
        await set(autosaveHash, checkpoint);
        currentState = `/${autosaveHash}`
        window.history.pushState(null, "", currentState);
        autosaveNeeded = false;
      } catch(e) {
        console.log(`Error saving local checkpoint: ${e}`);
        saveFailed = true;
      }

      // update checkpoint list
      if (!saveFailed) {
        try {
          await update('checkpoints', (checkpoints) => {
            if (checkpoints) {
              checkpoints.push(checkpointInfo);
              return checkpoints;
            } else {
              return [checkpointInfo, ];
            }
          });
        } catch(e) {
          console.log(`Error updating checkpoint list: ${e}`);
        }
      }

      // delete old checkpoints if over maxCheckpoints
      let checkpoints = [];
      try {
        const tempCheckpoints = await get('checkpoints');
        if (tempCheckpoints) {
          checkpoints = tempCheckpoints;
        }
      } catch(e) {
        console.log(`Error retrieving checkpoint list: ${e}`);
      }

      let reduceNumCheckpoints = false;
      if (saveFailed) {
        // failed save likely due to no more space avialable
        // drop number of checkpoints so that the next autosave has a chance of succeeding
        numCheckpoints = Math.max(checkpoints.length - decrementNumCheckpoints, minNumCheckpoints);
        reduceNumCheckpoints = true;
      }

      if (checkpoints.length > numCheckpoints) {
        const hashesToRemove = checkpoints.slice(0, checkpoints.length-numCheckpoints).map( (entry) => entry.hash);
        try {
          await delMany(hashesToRemove);
          await set('checkpoints', checkpoints.slice(checkpoints.length-numCheckpoints));
        } catch(e) {
          console.log(`Error deleting old checkpoints: ${e}`);
        }
      }

      if (reduceNumCheckpoints) {
        try {
          await set('numCheckpoints', numCheckpoints);
        } catch(e) {
          console.log(`Error updated numCheckpoints: ${e}`)
        }
      }
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
      try {
        await update('recentSheets', (oldRecentSheets) => {
          let newRecentSheets = (oldRecentSheets || new Map()).set($title+$sheetId, newRecentSheet);
          // sort with most recent first and truncate to maxRecentSheetsLength
          newRecentSheets = new Map(
            [...newRecentSheets]
            .sort((a,b) => b[1].accessTime - a[1].accessTime)
            .slice(0, maxRecentSheetsLength)
          );
          return newRecentSheets;
        });

        await retrieveRecentSheets();
      } catch(e) {
        console.log(`Error updating recentSheets: ${e}`)
      }
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

  function showSyntaxError() {
    const elem = document.querySelector('svg.error').parentNode;
    if (elem instanceof HTMLElement) {
      elem.scrollIntoView({behavior: "smooth", block: "center"});
      elem.focus({preventScroll: true});
      // need to call focus twice since first focus may change cell focus
      setTimeout(() => elem.focus({preventScroll: true}), 100);
    }
  }

  function ensureMathFieldVisible(event: TransitionEvent | MouseEvent) {
    if ( ( (event.target === document.getElementById('keyboard-tray') && event instanceof TransitionEvent)
           || event instanceof MouseEvent ) 
        && $activeMathField
        && $activeMathField.element )
    {
      if ( !isVisible(
               $activeMathField.element.getMathField().el(),
               document.getElementById('main-content')) 
          ) {
        $activeMathField.element.getMathField().el().scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
      }
    }
  }

  function handleLinkPushState(e: MouseEvent, path) {
    if (e.button === 0) {
      window.history.pushState(null, "", path)
      e.preventDefault();
      refreshSheet();
    }
  }

  $:{
    if (document.hasFocus() && showKeyboard !== Boolean($activeMathField)) {
      showKeyboard = Boolean($activeMathField);
    }
  }

  $: {
    document.title = `EngineeringPaper.xyz: ${$title}`;
  }

  $: if($cells) {
    noParsingErrors = !checkParsingErrors();
  }

  $: if ($cells || $mathCellChanged) {
    if($mathCellChanged) {
      handleCellUpdate();
      $mathCellChanged = false;
    }
    unsavedChange = true;
    autosaveNeeded = true;
  }

  $: if ($nonMathCellChanged) {
    unsavedChange = true;
    autosaveNeeded = true;
    $nonMathCellChanged = false;
  }

  // perform unit conversions on results if user specified units
  $: if ($results.length > 0) {
    $results.forEach((result, i) => {
      const cell = $cells[i];
      if (
        result && cell instanceof MathCell && cell.mathField.statement &&
        cell.mathField.statement.type === "query" &&
        cell.mathField.statement.units_valid &&
        cell.mathField.statement.units && 
        unitsValid(result.units)
      ) {
        const statement = cell.mathField.statement;
        if (result.numeric && result.real && result.finite) {
          const {newValue, unitsMismatch} = convertUnits(result.value, result.units, statement.units);

          if (!unitsMismatch) {
            result.userUnitsValueDefined = true;
            result.userUnitsValue = newValue;
            result.unitsMismatch = false;
          } else {
            result.unitsMismatch = true;
          }
        } else if (result.numeric && result.finite) {
          // handle unit conversion for imaginary number
          const {newValue: newRealValue, unitsMismatch: realUnitsMismatch} = 
                 convertUnits(result.realPart, result.units, statement.units);
          const {newValue: newImagValue, unitsMismatch: imagUnitsMismatch} = 
                 convertUnits(result.imagPart, result.units, statement.units);

          if (!realUnitsMismatch && !imagUnitsMismatch) {
            result.userUnitsValueDefined = true;
            if (newRealValue === 0) {
              result.userUnitsValue = `${newImagValue}i`;
            } else if (newImagValue >= 0) {
              result.userUnitsValue = `${newRealValue} + ${newImagValue}i`;
            } else {
              result.userUnitsValue = `${newRealValue} - ${-newImagValue}i`;
            }
            result.unitsMismatch = false;
          } else {
            result.unitsMismatch = true;
          }
        } else {
          // unit conversions not support for symbolic results
          result.unitsMismatch = true;
        }
      }
    });
  }
</script>

<style>
  :root {
    --keyboard-tray-height: 200px;
    --status-footer-height: 64px;
  }

  button {
    border-radius: 5px;
  }

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
    align-content: start;
    grid-template-rows: auto 1fr auto;
  }

  @media screen {
    div.page:not(.inIframe) {
      height: 100%;
    }
    div.page.inIframe {
      height: fit-content;
    }
  }

  @media print {
    div.page {
      display: block;
    }
  }

  :global(.bx--header) {
    position: static !important;
    flex-wrap: wrap !important;
    height: fit-content !important;
  }

  @media print {
    :global(.bx--header) {
      display: none !important;
    }
  }

  :global(.bx--header__name) {
    flex-grow: 1;
  }

  :global(.bx--header__global) {
    flex: 0 1 auto !important;
    justify-content: flex-start !important;
  }

  :global(nav.bx--side-nav__navigation) {
    background-color: #f1f1f1;
    border-right: solid 1px lightgray;
  }

  :global(.bx--side-nav__menu a.bx--side-nav__link) {
    height: fit-content !important;
    padding-right: 0px;
  }

  div.side-nav-title {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  em.side-nav-date {
    font-size: smaller;
    padding-left: 10px;
  }

  :global(#main-content) {
    grid-row: 2;
    grid-column: 1;
    display: flex;
    justify-content: center;
    margin-top: 0;
    overflow: auto;
    position: static;
    height: 100%;
    padding: 8px;
  }

  @media print {
    :global(#main-content) {
      overflow: visible;
    }
  }

  :global(page.inIframe #main-content) {
    height: fit-content;
  }

  div.bottom-spacer {
    height: calc(var(--status-footer-height) + var(--keyboard-tray-height));
  }

  div.bottom-spacer.inIframe {
    display: none;
  }

  #sheet {
    width: min(1000px, 100%);
    height: fit-content;
  }

  #keyboard-tray {
    display: flex;
    justify-content: center;
    background-color: #f1f1f1;
    border-top: solid 1px lightgray;
    transition: 0.3s;
    transition-delay: 0.1s;
    overflow: hidden;
  }

  #keyboard-tray.inIframe {
    display: none;
  }

  @media print {
    #keyboard-tray {
      display: none;
    }
  }

  div.status-footer {
    grid-row: 2;
    grid-column: 1;
    justify-self: end;
    align-self: end;
    max-height: var(--status-footer-height);
    padding: 5px;
    border-radius: 10px 0px 0px 0px;
    bottom: var(--keyboard-tray-height);
    right: 0;
    background: whitesmoke;
    border-top: 1px lightgray solid;
    border-left: 1px lightgray solid;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
  }

  @media print {
    div.status-footer {
      display: none;
    }
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

  .print-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;
  }

  @media screen {
    .print-logo {
      display: none;
    }
  }

  a.button {
    color: white;
  }

</style>

{#if fileDropActive}
  <DropOverlay
    on:drop={handleFileDrop}
    on:dragenter={e => fileDropActive=true}
    on:dragleave={e => fileDropActive=false}
  />
{/if}

<div
  class="page"
  class:inIframe
	on:dragover|preventDefault
	on:dragenter={e => fileDropActive=true}
>
  <Header
    bind:isSideNavOpen={sideNavOpen}
    persistentHamburgerMenu={!inIframe}
  >
    <span class="logo" slot="platform"><img class="logo" src="logo_dark.svg" alt="EngineeringPaper.xyz"></span>

    <div slot="skip-to-content">
      <SkipToContent />
    </div>

    <HeaderUtilities>
      {#if !inIframe}
        <HeaderGlobalAction id="new-sheet" title="New Sheet" on:click={loadBlankSheet} icon={DocumentBlank}/>
        <HeaderGlobalAction id="open-sheet" title="Open Sheet From File" on:click={handleFileOpen} icon={Document}/>
        <HeaderGlobalAction id="save-sheet" title="Save Sheet to File" on:click={saveSheetToFile} icon={Download}/>
        <HeaderGlobalAction id="upload-sheet" title="Get Shareable Link" on:click={() => (modalInfo = {state: 'idle', modalOpen: true, heading: "Save as Shareable Link"}) } icon={CloudUpload}/>
        <HeaderGlobalAction>
          <a
            class="button"
            href={`/${tutorialHash}`}
            title="Tutorial"
            rel="nofollow"
            on:click={(e) => handleLinkPushState(e, `/${tutorialHash}`)}
          >
            <Help size={20}/>
          </a>
        </HeaderGlobalAction>
        <HeaderGlobalAction title="Supported Units" on:click={() => modalInfo = {
          modalOpen: true,
          state: "supportedUnits",
          heading: "Supported Units"
        }} icon={Ruler}/>
        <HeaderGlobalAction title="Keyboard Shortcuts" on:click={() => modalInfo = {
          modalOpen: true,
          state: "keyboardShortcuts",
          heading: "Keyboard Shortcuts"
        }} icon={Keyboard}/>
      {:else}
        <HeaderGlobalAction
          title="Open this sheet in a new tab"
          on:click={() => window.open(window.location.href, "_blank")}
          icon={Launch}
        />
      {/if}
    </HeaderUtilities>
  </Header>


  {#if !inIframe}
    <SideNav bind:isOpen={sideNavOpen} on:open={retrieveRecentSheets}>
      <SideNavItems>
        <SideNavMenu text="Example Sheets">
          {#each exampleSheets as {path, title} (path)}
            <SideNavMenuItem 
              href={path}
              rel="nofollow"
              on:click={(e) => handleLinkPushState(e, path)}
            >
              <div title={title} class="side-nav-title">{title}</div>
            </SideNavMenuItem>
          {/each}
        </SideNavMenu>
        <SideNavMenu text="Prebuilt Tables">
          {#each prebuiltTables as {url, title} (url)}
            <SideNavMenuItem 
              href={`/${getSheetHash(new URL(url))}`}
              rel="nofollow"
              on:click={(e) => handleLinkPushState(e, `/${getSheetHash(new URL(url))}`)}
            >
              <div title={title} class="side-nav-title">{title}</div>
            </SideNavMenuItem>
          {/each}
        </SideNavMenu>
        {#if $history.length > 0}
          <SideNavMenu text="Sheet History">
            {#each $history as {hash, creation} (hash+creation)}
              {#if hash === "file"}
                <SideNavMenuItem
                    isSelected={false}
                    text={`Saved as File: ${(new Date(creation)).toLocaleString()}`}
                    title={(new Date(creation)).toLocaleString()}
                  />
              {:else}
                <SideNavMenuItem
                  isSelected={hash === currentState.slice(1)}
                  href={`/${hash}`}
                  text={(new Date(creation)).toLocaleString()}
                  rel="nofollow"
                  on:click={(e) => handleLinkPushState(e, `/${hash}`)}
                />
              {/if}
            {/each}
          </SideNavMenu>
        {/if}
        {#if $insertedSheets.length > 0}
          <SideNavMenu text="Inserted Sheets">
            {#each $insertedSheets as {title, url, insertion}}
              <SideNavMenuItem
                href={`/${getSheetHash(new URL(url))}`}
                rel="nofollow"
                on:click={(e) => handleLinkPushState(e, `/${getSheetHash(new URL(url))}`)}
              >
                <div title={title}>
                  <div class="side-nav-title">
                    {title}
                  </div>
                  <em class="side-nav-date">{(new Date(insertion)).toLocaleString()}</em>
                </div>
              </SideNavMenuItem>
            {/each}
          </SideNavMenu>
        {/if}
        {#if recentSheets.size > 0}
          <SideNavMenu text="Recent Sheets">
            {#each [...recentSheets] as [key, value] (key)}
              <SideNavMenuItem
                isSelected={getSheetHash(new URL(value.url)) === currentState.slice(1)}
                href={`/${getSheetHash(new URL(value.url))}`}
                rel="nofollow"
                on:click={(e) => handleLinkPushState(e, `/${getSheetHash(new URL(value.url))}`)}
              >
                <div title={value.title}>
                  <div class="side-nav-title">
                    {value.title}
                  </div>
                  <em class="side-nav-date">{(new Date(value.accessTime)).toLocaleString()}</em>
                </div>
              </SideNavMenuItem>
            {/each}
          </SideNavMenu>
        {/if}
        <SideNavLink 
          on:click={() => showTerms()}
          text="Terms and Conditions"
        />
        <SideNavLink
          on:click={() => modalInfo = {
              modalOpen: true,
              state: "bugReport",
              heading: "Bug Report"
          }}
          text="Bug Report"
        />
        <SideNavLink 
          on:click={() => modalInfo = {
            modalOpen: true,
            state: "newVersion",
            heading: "New Features"
          }}
          text="New Features"
        />
        <SideNavLink 
          on:click={() => showRequestPersistentStorage()}
          text="Enable Persistent Local Storage"
        />
        <SideNavLink
          href="https://blog.engineeringpaper.xyz"
          text="Blog"
          target="_blank"
        />
        <SideNavLink
          href="https://github.com/mgreminger/EngineeringPaper.xyz"
          text="GitHub Page"
          target="_blank"
        />
        <SideNavLink
          href="https://www.youtube.com/@epxyz"
          text="YouTube Channel"
          target="_blank"
        />
        <SideNavLink
          href="https://www.reddit.com/r/EngineeringPaperXYZ/"
          text="Reddit Community"
          target="_blank"
        />
      </SideNavItems>
    </SideNav>
  {/if}


  <Content>

    <div id="sheet">
      <DocumentTitle bind:title={$title}/>

      <CellList on:insertSheet={loadInsertSheetModal} />

      <div class="print-logo">
        Created with: <img src="print_logo.png" alt="EngineeringPaper.xyz" height="26 px">
      </div>

      <div class="bottom-spacer" class:inIframe></div>
    </div>
  </Content>

  <div
    id="keyboard-tray" 
    class:inIframe
    style={`height: ${showKeyboard && !inIframe ? 'var(--keyboard-tray-height)' : '0px'}`}
    on:transitionend={ensureMathFieldVisible}
    on:mousedown={ (event) => {event.preventDefault(); ensureMathFieldVisible(event);} }
  >
    <VirtualKeyboard keyboards={keyboards}/>
  </div>

  {#if (termsAccepted < termsVersion) && !inIframe}
    <div class="status-footer" on:mousedown={e=>e.preventDefault()}>
      <InformationFilled color="#0f62fe"/>
      <div>
        Use of this software is subject to these  
        <a
          href="javascript:void(0);"
          on:click={showTerms}
        >
          Terms and Conditions
        </a>  (updated {versionToDateString(termsVersion)})
      </div>
      <button on:click={acceptTerms}>Accept</button>
    </div>
  {:else}
    {#if noParsingErrors}
      {#await pyodidePromise}
        {#if !pyodideLoaded && !pyodideNotAvailable && !error}
          <div class="status-footer promise">
            <InlineLoading description="Loading Pyodide..."/>
          </div>
        {:else if pyodideLoaded && !pyodideNotAvailable}  
          <div class="status-footer promise" on:mousedown={e=>e.preventDefault()}>
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
    {:else}
      <div class="status-footer" on:mousedown={e=>e.preventDefault()}>
        <ErrorFilled color="#da1e28"/>
        <div>
          Sheet cannot be evaluated due to a syntax error.
          See this 
          <a
            href={`/${tutorialHash}`}
            rel="nofollow"
            on:click={(e) => handleLinkPushState(e, `/${tutorialHash}`)}
          >
            tutorial
          </a>
          to learn how to use this app.
        </div>
        <button on:click={showSyntaxError}>Show Error</button>
      </div>
    {/if}
  {/if}

  {#if modalInfo.modalOpen}
  <Modal
    passiveModal={!(modalInfo.state === "idle" || modalInfo.state === "insertSheet")}
    bind:open={modalInfo.modalOpen}
    modalHeading={modalInfo.heading}
    primaryButtonText="Confirm"
    secondaryButtonText="Cancel"
    on:click:button--secondary={() => (modalInfo.modalOpen = false)}
    on:open
    on:close
    on:submit={ modalInfo.state === "idle" ? uploadSheet : insertSheet }
    hasScrollingContent={["supportedUnits", "insertSheet", "termsAndConditions",
                         "newVersion", "keyboardShortcuts"].includes(modalInfo.state)}
    preventCloseOnClickOutside={!["supportedUnits", "bugReport", "newVersion", 
                                  "keyboardShortcuts"].includes(modalInfo.state)}
  >
    {#if modalInfo.state === "idle"}
      <p>Saving this document will create a private shareable link that can be used to access this 
        document in the future. Anyone you share this link with will be able to access the document.
      </p>
    {:else if modalInfo.state === "pending"}
      <InlineLoading description="Getting shareable link..."/>
    {:else if modalInfo.state === "success"}
      <p>Save this link in order to be able to access or share this sheet.</p>
      <br>
      <div class="shareable-link">
        <label for="shareable-link" class="shareable-link-label">Shareable Link:</label>
        <input type="text" id="shareable-link" value={modalInfo.url} size=50 readonly>
        <CopyButton text={modalInfo.url} />
      </div>
    {:else if modalInfo.state === "retrieving"}
      <InlineLoading description={`Retrieving sheet: ${window.location}`}/>
    {:else if modalInfo.state === "opening"}
      <InlineLoading description={`Opening sheet from file`}/>
    {:else if modalInfo.state === "restoring"}
      <InlineLoading description={`Restoring autosave checkpoint: ${window.location}`}/>
    {:else if modalInfo.state === "bugReport"}
      <p>If you have discovered a bug in EngineeringPaper.xyz, 
        please send a bug report to 
        <a href={`mailto:support@engineeringpaper.xyz?subject=Bug Report&body=Sheet with issues: ${encodeURIComponent(window.location.href)}`}>support@engineeringpaper.xyz</a>.
        Please include a description of the problem. Additionally, it's best if you can include a link to the sheet that is experiencing the problem.
      </p>
    {:else if modalInfo.state === "supportedUnits"}
      <UnitsDocumentation />
    {:else if modalInfo.state === "keyboardShortcuts"}
      <KeyboardShortcuts />
    {:else if modalInfo.state === "termsAndConditions"}
      <Terms versionDateString={versionToDateString(termsVersion)}/>
    {:else if modalInfo.state === "requestPersistentStorage"}
      <RequestPersistentStorage numCheckpoints={numCheckpoints} />
    {:else if modalInfo.state === "newVersion"}
      <Updates />
    {:else if modalInfo.state === "insertSheet"}
      <InsertSheet
        bind:url={modalInfo.url}
        recentSheets={recentSheets}
        prebuiltTables={prebuiltTables}
      />
    {:else}
      <InlineLoading status="error" description="An error occurred" />
      {@html modalInfo.error}
    {/if}
  </Modal>
  {/if}



</div>