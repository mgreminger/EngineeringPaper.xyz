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
           getSheetJson, resetSheet, sheetId, mathCellChanged,
           addCell, prefersReducedMotion, modifierKey, inCellInsertMode,
           incrementActiveCell, decrementActiveCell, deleteCell} from "./stores";
  import { arraysEqual, unitsEquivalent } from "./utility.js";
  import CellList from "./CellList.svelte";
  import DocumentTitle from "./DocumentTitle.svelte";
  import UnitsDocumentation from "./UnitsDocumentation.svelte";
  import KeyboardShortcuts from "./KeyboardShortcuts.svelte";
  import Terms from "./Terms.svelte";
  import Updates from "./Updates.svelte";
  import InsertSheet from "./InsertSheet.svelte";

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

  import CloudUpload from "carbon-icons-svelte/lib/CloudUpload.svelte";
  import DocumentBlank from "carbon-icons-svelte/lib/DocumentBlank.svelte";
  import Debug from "carbon-icons-svelte/lib/Debug.svelte";
  import Ruler from "carbon-icons-svelte/lib/Ruler.svelte";
  import Help from "carbon-icons-svelte/lib/Help.svelte";
  import Launch from "carbon-icons-svelte/lib/Launch.svelte";
  import Keyboard from "carbon-icons-svelte/lib/Keyboard.svelte";

  import 'quill/dist/quill.snow.css';
  import 'carbon-components-svelte/css/white.css';

  let apiUrl;
  if (process.env.NODE_ENV === "production") {
    apiUrl = "https://engineeringpaper.herokuapp.com";
  } else {
    apiUrl = "http://127.0.0.1:8000";
  }

  const currentVersion = 20221102;
  const tutorialHash = "eb9VgAYtUUVy2Yg2vGfS9p";

  const prebuiltTables = [
    {
      url: "https://engineeringpaper.xyz/PaFvsBhgoJdZEEwyBLPnD6",
      title: "Mechanical Properties of Metals" 
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
    }
  };

  // used for testing so that correct modifier key is used in tests
  (window as any).modifierKey = $modifierKey;


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
  let activeHistoryItem = -1;
  let recentSheets = new Map();

  let inIframe = false;

  let refreshCounter = BigInt(1);
  let cache = new QuickLRU({maxSize: 100}); 
  let cacheHitCount = 0;

  let sideNavOpen = false;

  type ModalInfo = {
    state: "idle" | "pending" | "success" |"error" | 
           "retrieving" | "bugReport" | "supportedUnits" | 
           "firstTime" | "newVersion" | "insertSheet" | "keyboardShortcuts",
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
    terminateWorker();
  });

  onMount( async () => {
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    $prefersReducedMotion = mediaQueryList.matches
    mediaQueryList.addEventListener('change', handleMotionPreferenceChange);

    unsavedChange = false;
    await refreshSheet(true);

    window.addEventListener("hashchange", handleSheetChange);
    window.addEventListener("popstate", handleSheetChange);
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
        if(getSheetHash(window.location) === "") {
          // not pointed at sheet so load first time tutorial sheet
          await downloadSheet('introduction.json', false, false);
        }
        // show everyone the terms and conditions the first time they open the site
        modalInfo = {
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
        console.log(`Error updating previousVersion entry.${e}`);
      }

      // get recent sheets list
      await retrieveRecentSheets();
    } else {
      // when in an iframe, post message when document body changes length
      const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          window.parent.postMessage(`${entry.target.scrollHeight+20}px`, '*');
        });
      });
      resizeObserver.observe(document.body)
    }
  });

  function handleMotionPreferenceChange(event) {
    $prefersReducedMotion = event.matches;
  }

  function handleKeyboardShortcuts(event) {
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
      case "s":
      case "S":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else {
          modalInfo = {
            state: 'idle',
            modalOpen: true,
            heading: "Save as Sharable Link"
          };
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
        } else if (event[$modifierKey] && !modalInfo.modalOpen &&
                   !$inCellInsertMode ) {
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
          // not in a math cell and no shift or modifier
          return;
        }
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
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


  function getSheetHash(url) {
    let hash = "";

    // First check if url hash could be sheet hash, if not check if path could be the sheet hash
    // url hash needs to be checked since early version of app used url hash instead of path
    if (url.hash.length === 23) {
      hash = url.hash.slice(1);
    } else if (url.pathname.length === 23) {
      hash = url.pathname.slice(1);
    }

    return hash;
  }


  async function handleSheetChange(event) {
    await refreshSheet();
  }

  async function refreshSheet(firstTime = false) {
    const hash = getSheetHash(window.location);
    if (!unsavedChange || window.confirm("Continue loading sheet, any unsaved changes will be lost?")) {
      if(hash !== "") {
        await downloadSheet(`${apiUrl}/documents/${hash}`, true, true, firstTime);
      } else {
        resetSheet();
        await tick();
        addCell('math');
        await tick();
        unsavedChange = false;
      }
    }

     activeHistoryItem = $history.map(item => (getSheetHash(new URL(item.url)) === getSheetHash(window.location))).indexOf(true);
  }

  function loadBlankSheet() {
    const hash = getSheetHash(window.location);
    if (hash === "") {
      refreshSheet();
    } else {
      window.history.pushState(null, null, "/");
      refreshSheet(); // pushState does not trigger onpopstate event
    }
  }

  function getResults(statementsAndSystems) {
    return new Promise((resolve, reject) => {
      function handleWorkerMessage(e) {
        forcePyodidePromiseRejection = null;
        if (e.data === "pyodide_not_available") {
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
      pyodidePromise = getResults(statementsAndSystems)
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

  const encoder = new TextEncoder();
  async function getHash(input) {
    const hash = await crypto.subtle.digest('SHA-512', encoder.encode(`${input}math`));
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function uploadSheet() {
    modalInfo.state = "pending";
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

      if (getSheetHash(window.location) !== responseObject.hash) {
        window.history.pushState(null, null, responseObject.hash);
      }

      console.log(responseObject.url);
      modalInfo = {
        state: "success",
        url: window.location.href,
        modalOpen: true,
        heading: modalInfo.heading
      };
      unsavedChange = false;

      $history = JSON.parse(responseObject.history);

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
      if (firstTime && (window as any).prefetchedSheet) 
      {
        response = await (window as any).prefetchedSheet;
        await tick();
      } else {
        response = await fetch(url);
      }

      if (response.ok) {
        const responseObject = await response.json();
        sheet = JSON.parse(responseObject.data);
        requestHistory = JSON.parse(responseObject.history);
      } else {
        throw new Error(`Unexpected response status ${response.status}`);
      }
    } catch(error) {
      if (modal) {
        modalInfo = {
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
      $results = [];
      $system_results = [];

      await tick();

      $cells = sheet.cells.map(cellFactory);

      $title = sheet.title;
      BaseCell.nextId = sheet.nextId;
      $sheetId = sheet.sheetId;
      // old documents in database will not have the insertedSheets property
      $insertedSheets = sheet.insertedSheets ? sheet.insertedSheets : [];

      if (!$history.map(item => getSheetHash(new URL(item.url))).includes(getSheetHash(window.location))) {
        $history = requestHistory;
      }

      await tick(); // this will populate mathFieldElement and richTextInstance fields

      $results = sheet.results;
      // old documents in the database won't have the system_results property
      $system_results = sheet.system_results ? sheet.system_results : [];

    } catch(error) {
      if(modal) {
        modalInfo = {
          state: "error",
          error: `<p>Error regenerating sheet ${window.location}.
  This is most likely due to a bug in EngineeringPaper.xyz.
  If problem persists after attempting to refresh the page, please report problem to
  <a href="mailto:support@engineeringpaper.xyz?subject=Error Regenerating Sheet&body=Sheet that failed to load: ${encodeURIComponent(window.location.href)}">support@engineeringpaper.xyz</a>.  
  Please include a link to this sheet in the email to assist in debugging the problem. <br>Error: ${error} </p>`,
          modalOpen: true,
          heading: "Retrieving Sheet"
        };
      }
      $cells = [];
      unsavedChange = false;
      return;
    }

    if (modal) {
      modalInfo.modalOpen = false;
    }
    unsavedChange = false;

    // on successfull sheet download, update recent sheets list
    if (updateRecents) {
      await updateRecentSheets();
    }
  }

  
  function loadInsertSheetModal(e) {
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
    
    const url = `${apiUrl}/documents/${sheetHash}`;

    modalInfo = {state: "retrieving", modalOpen: true, heading: "Retrieving Sheet"};

    let sheet;
    
    try{
      let response;
      response = await fetch(url);

      if (response.ok) {
        const responseObject = await response.json();
        sheet = JSON.parse(responseObject.data);
      } else {
        throw new Error(`Unexpected response status ${response.status}`);
      }
    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>Error inserting sheet ${url}. The URL may be incorrect or
the server may be temporarily overloaded or down. If problem persists, please report problem to
<a href="mailto:support@engineeringpaper.xyz?subject=Error Inserting Sheet&body=Sheet that failed to load: ${encodeURIComponent(url)}">support@engineeringpaper.xyz</a>.  
Please include a link to sheet being inserted in the email to assist in debugging the problem. <br>Error: ${error} </p>`,
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
Please include a link to this sheet in the email to assist in debugging the problem. <br>Error: ${error} </p>`,
        modalOpen: true,
        heading: "Retrieving Sheet"
      };
      $cells = [];
      unsavedChange = false;
      return;
    }

    modalInfo.modalOpen = false;
    unsavedChange = true;

    $insertedSheets = [
      {
        title: sheet.title,
        url: sheetUrl,
        insertion: new Date()
      }, 
      ...$insertedSheets
    ];
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

  function showSyntaxError() {
    const elem = document.querySelector('svg.error').parentNode;
    if (elem instanceof HTMLElement) {
      elem.scrollIntoView({behavior: "smooth", block: "center"});
      elem.focus({preventScroll: true});
      // need to call focus twice since first focus may change cell focus
      setTimeout(() => elem.focus({preventScroll: true}), 100);
    }
  }

  $: {
    document.title = `EngineeringPaper.xyz: ${$title}`;
    unsavedChange = true;
  }

  $: if($cells) {
    noParsingErrors = !checkParsingErrors();
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
      if (cell instanceof PlotCell) {
        const userInputUnits = cell.mathFields[0].statement?.input_units; // use input units from first plot statement
        for (const [j, statement] of cell.mathFields.map((field) => field.statement).entries()) {
          if (result && result[j] && statement && statement.type === "query" && result[j].plot) {
            for (const data of result[j].data) {
              if (data.numericOutput) {
                data.unitsMismatch = false;
                // convert inputs if units provided
                if (userInputUnits) {
                  const startingInputUnits = data.inputUnits;

                  if ( unitsEquivalent(userInputUnits, startingInputUnits) ) {
                    data.displayInput = convertArrayUnits(data.input, startingInputUnits, userInputUnits);
                    data.displayInputUnits = userInputUnits;
                  } else {
                    data.unitsMismatch = true;
                  }
                } else {
                  data.displayInput = data.input;
                  data.displayInputUnits = data.inputUnits;
                } 
              
                // convert outputs if units provided
                if (statement.units && statement.units_valid) {
                  const userOutputUnits = statement.units;
                  const startingOutputUnits = data.outputUnits;

                  if ( unitsEquivalent(userOutputUnits, startingOutputUnits) ) {
                    data.displayOutput = convertArrayUnits(data.output, startingOutputUnits, userOutputUnits);
                    data.displayOutputUnits = userOutputUnits;
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
        result && cell instanceof MathCell && cell.mathField.statement &&
        cell.mathField.statement.type === "query" &&
        cell.mathField.statement.units_valid &&
        cell.mathField.statement.units && 
        result.units !== "Dimension Error" &&
        result.units !== "Exponent Not Dimensionless"
      ) {
        const statement = cell.mathField.statement;
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
              resultUnits.push(unit(`${resultValue} ${startingUnits}`));
            });

            userUnits = unit(statement.units);
          } catch(e) {
            console.warn(`Units not recognized, either ${startingUnits} or ${statement.units}`);
            unitsRecognized = false;
          } 
          if (unitsRecognized && arraysEqual(resultUnits[0].dimensions, userUnits.dimensions)) {
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
    align-content: start;
  }

  @media screen {
    div.page:not(.inIframe) {
      height: 100vh;
    }
    div.page.inIframe {
      height: fit-content;
    }
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

</style>

<div class="page" class:inIframe>
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
        <HeaderGlobalAction title="Bug Report" on:click={() => modalInfo = {
          modalOpen: true,
          state: "bugReport",
          heading: "Bug Report"
        }} icon={Debug}/>
        <HeaderGlobalAction 
          title="Tutorial" 
          on:click={ () => { window.history.pushState(null, null, tutorialHash); refreshSheet();} } 
          icon={Help}
        />
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
        <HeaderGlobalAction id="upload-sheet" title="Get Shareable Link" on:click={() => (modalInfo = {state: 'idle', modalOpen: true, heading: "Save as Shareable Link"}) } icon={CloudUpload}/>
      {:else}
        <HeaderGlobalAction
          title="Open this sheet in a new tab"
          on:click={() => window.open(window.location.href, "_blank")}
          icon={Launch}
        />
      {/if}
    </HeaderUtilities>

    {#if !inIframe}
      <SideNav bind:isOpen={sideNavOpen} on:open={retrieveRecentSheets}>
        <SideNavItems>
          <SideNavMenu text="Example Sheets">
            <SideNavMenuItem 
              href={`https://engineeringpaper.xyz/${tutorialHash}`}
              text="Introduction to EngineeringPaper"
              rel="nofollow"
            />
            <SideNavMenuItem 
              href="https://engineeringpaper.xyz/TxAftUqQCmXKNPX5XGBUy8"
              text="Plotting and Functions"
              rel="nofollow"
            />   
            <SideNavMenuItem 
              href="https://engineeringpaper.xyz/DeP4bqfF2H5VbRJz3Nd9Re"
              text="Equation Solving"
              rel="nofollow"
            />   
          </SideNavMenu>
          <SideNavMenu text="Prebuilt Tables">
            {#each prebuiltTables as {url, title} (url)}
              <SideNavMenuItem 
                href={url}
                text={title}
                rel="nofollow"
              />
            {/each}
          </SideNavMenu>
          {#if $history.length > 0}
            <SideNavMenu text="Sheet History">
              {#each $history as {url, creation}, i (url)}
                <SideNavMenuItem
                  href={url}
                  text={(new Date(creation)).toLocaleString()+(i === activeHistoryItem ? ' <' : '')}
                  rel="nofollow"
                />
              {/each}
            </SideNavMenu>
          {/if}
          {#if $insertedSheets.length > 0}
            <SideNavMenu text="Inserted Sheets">
              {#each $insertedSheets as {title, url, insertion}}
                <SideNavMenuItem
                  href={url}
                  text={`${title} ${(new Date(insertion)).toLocaleString()}`}
                  rel="nofollow"
                />
              {/each}
            </SideNavMenu>
          {/if}
          {#if recentSheets.size > 0}
            <SideNavMenu text="Recent Sheets">
              {#each [...recentSheets] as [key, value] (key)}
                <SideNavMenuItem
                  href={value.url}
                  text={`${value.title} ${(new Date(value.accessTime)).toLocaleString()}`}
                  rel="nofollow"
                />
              {/each}
            </SideNavMenu>
          {/if}
          <SideNavLink 
            on:click={() => modalInfo = {
              modalOpen: true,
              state: "firstTime",
              heading: "Terms and Conditions"
            }}
            text="Terms and Conditions" />
          <SideNavLink 
            on:click={() => modalInfo = {
              modalOpen: true,
              state: "newVersion",
              heading: "New Features"
            }}
            text="New Features" />
          <SideNavLink
            href="https://blog.engineeringpaper.xyz"
            text="Blog"
            target="_blank"
          />
          <SideNavLink
            href="https://www.youtube.com/@epxyz"
            text="YouTube Channel"
            target="_blank"
          />
          <SideNavLink
            href="https://groups.google.com/g/engineeringpaperxyz"
            text="Google Group"
            target="_blank"
          />
        </SideNavItems>
      </SideNav>
    {/if}

  </Header>



  <Content>
    <DocumentTitle bind:title={$title}/>

    <CellList on:insertSheet={loadInsertSheetModal} />

    <div class="print-logo">
      Created with: <img src="print_logo.png" alt="EngineeringPaper.xyz" height="26 px">
    </div>

  </Content>

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
    hasScrollingContent={["supportedUnits", "insertSheet", "firstTime",
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
    {:else if modalInfo.state === "firstTime"}
      <Terms />
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

  {#if noParsingErrors}
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
  {:else}
    <div class="status-footer">
      <InlineLoading status="error" description={'Sheet cannot be evaluated due to a syntax error.'} />
      <button on:click={showSyntaxError}>Show Me</button>
    </div>
  {/if}

</div>