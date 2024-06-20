<script lang="ts">
  import { onDestroy, onMount, tick, type ComponentEvents } from "svelte";
  import { type Cell, cellFactory } from "./cells/Cells";
  import { BaseCell } from "./cells/BaseCell";
  import MathCell from "./cells/MathCell";
  import TableCell from "./cells/TableCell";
  import PlotCell from "./cells/PlotCell";
  import PiecewiseCell from "./cells/PiecewiseCell";
  import SystemCell from "./cells/SystemCell";
  import FluidCell from "./cells/FluidCell";
  import { cells, title, results, resultsInvalid, system_results, history, insertedSheets, activeCell, 
           getSheetJson, getSheetObject, resetSheet, sheetId, mathCellChanged, nonMathCellChanged,
           addCell, prefersReducedMotion, modifierKey, inCellInsertMode, config, unsavedChange,
           incrementActiveCell, decrementActiveCell, deleteCell, activeMathField,
           autosaveNeeded, mathJaxLoaded
          } from "./stores";
  import { getDefaultBaseUnits, getDefaultFluidConfig, isDefaultConfig } from "./sheet/Sheet";
  import type { Statement } from "./parser/types";
  import type { SystemDefinition } from "./cells/SystemCell";
  import type { FluidFunction } from "./cells/FluidCell";
  import { isVisible, versionToDateString, debounce, saveFileBlob, sleep, createCustomUnits } from "./utility";
  import type { ModalInfo, RecentSheets, RecentSheetUrl, RecentSheetFile, StatementsAndSystems } from "./types";
  import type { Results } from "./resultTypes";
  import { getHash, API_GET_PATH, API_SAVE_PATH } from "./database/utility";
  import type { SheetPostBody, History } from "./database/types";
  import { type Sheet, getDefaultConfig } from "./sheet/Sheet";
  import CellList from "./CellList.svelte"; 
  import type { MathField } from "./cells/MathField";
  import DocumentTitle from "./DocumentTitle.svelte";
  import UnitsDocumentation from "./UnitsDocumentation.svelte";
  import KeyboardShortcuts from "./KeyboardShortcuts.svelte";
  import Terms from "./Terms.svelte";
  import RequestPersistentStorage from "./RequestPersistentStorage.svelte";
  import Updates from "./Updates.svelte";
  import InsertSheet from "./InsertSheet.svelte";
  import DropOverlay from "./DropOverlay.svelte";
  import UpdateAvailable from "./UpdateAvailable.svelte";
  import VirtualKeyboard from "./VirtualKeyboard.svelte";
  import { keyboards } from "./keyboard/Keyboard";
  import { Workbox } from "workbox-window";
  import { MathfieldElement } from "mathlive";

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
    Checkbox,
    Content,
    SideNav,
    SideNavMenuItem,
    SideNavMenu,
    SideNavItems,
    SideNavLink,
    HeaderActionLink,
    Tabs,
    Tab,
    TabContent
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
  import Renew from "carbon-icons-svelte/lib/Renew.svelte";
  import ArrowLeft from "carbon-icons-svelte/lib/ArrowLeft.svelte";
  import ArrowRight from "carbon-icons-svelte/lib/ArrowRight.svelte";
  import Printer from "carbon-icons-svelte/lib/Printer.svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";

  import 'quill/dist/quill.snow.css';
  import 'carbon-components-svelte/css/white.css';
  import MathCellConfigDialog from "./MathCellConfigDialog.svelte";
  import type MathCellElement from "./MathCell.svelte";
  import GenerateCodeDialog from "./GenerateCodeDialog.svelte";
  import CustomMatrixModal from "./CustomMatrixModal.svelte";
  import BaseUnitsConfigDialog from "./BaseUnitsConfigDialog.svelte";
  import DownloadDocumentModal from "./DownloadDocumentModal.svelte";

  createCustomUnits();

  const apiUrl = window.location.origin;

  const currentVersion = 20240620;
  const tutorialHash = "hUts8q3sKUqJGFUwSdL5ZS";

  const termsVersion = 20240110;
  let termsAccepted = 0;

  // need for File System Access API calls
  const fileTypes = [
            {
              description: "EngineeringPaper.xyz Files",
              accept: {"application/json": [".epxyz"]},
            }
          ];

  const exampleSheets = [
    {
      path: `/${tutorialHash}`,
      title: "Introduction to EngineeringPaper"
    },
    {
      path: "/g4MZrw8GUPdHBSUTzGbQjb",
      title: "Plotting and Functions" 
    },
    {
      path: "/32XmqQA442GL8mj8X9uwP3",
      title: "Scatter Plots" 
    },
    {
      path: "/dcM95gSLeCTcbCHtsM4uqq",
      title: "Parametric Plots" 
    },
    {
      path: "/DeP4bqfF2H5VbRJz3Nd9Re",
      title: "Equation Solving" 
    },
    {
      path: "/8pWM9yEqEPNntRBd6Jr9Sv",
      title: "Matrices and Vectors" 
    },
    {
      path: "/enYmu2PzN2hN93Avizx9ec",
      title: "Python Code Generation" 
    },
    {
      path: "/mWf3zkzQEmYsUPckCPX5P8",
      title: "Thermodynamic Properties of Fluids" 
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
  (window as any).forceLoadBlankSheet = () => {$unsavedChange = false; loadBlankSheet();};

  // Used for testing to simplify the deleting of cells
  // The two-step delete, delete and then delete the undo delete cell, 
  // can be flaky for firefox and webkit
  // webkit in particular waits for the progress bar to go down before playwright considers the DOM stable
  (window as any).forceDeleteCell = (index: number) => deleteCell(index, true);

  // For quicker startup times, mathjax is loaded after the main bundle
  // Need to update the $mathJaxLoaded value so that plots can update, if needed.
  (window as any).MathJax = {
    startup: {
      ready: () => {
          (window as any).MathJax.startup.defaultReady();
          $mathJaxLoaded = true;
        },
      pageReady: async () => {} // prevents the initial typeSetting of the page, must return a promise
    }
  };

  MathfieldElement.fontsDirectory = `${window.location.protocol}//${window.location.host}/build/mathlive/fonts`;
  MathfieldElement.soundsDirectory = `${window.location.protocol}//${window.location.host}/build/mathlive/sounds`;
  MathfieldElement.computeEngine = null;
  MathfieldElement.plonkSound = null;

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
  let inDebounce = false;

  let usingDefaultConfig = true;

  let recentSheets: RecentSheets = new Map();
  const maxRecentSheetsLength = 50;

  let currentState = "/"; // used when popstate is cancelled by user
  let currentStateObject: null | {fileKey: string} = null;
  let refreshingSheet = false; // since refreshSheet is async, need to make sure more than one call is not happening at once
  let populatingPage = false; // ditto for populatePage
  let initialSheetLoad = false;

  const autosaveInterval = 10000; // msec between check to see if an autosave is needed
  const checkpointPrefix = "temp-checkpoint-";
  let numCheckpoints = 500; 
  const minNumCheckpoints = 10;
  const decrementNumCheckpoints = 20; 
  let autosaveIntervalId: null | number = null;

  let showKeyboard = false;

  let inIframe = false;

  let fileDropActive = false;

  let refreshCounter = BigInt(1);
  let cache = new QuickLRU<string, Results>({maxSize: 100}); 
  let cacheHitCount = 0;

  let sideNavOpen = false;

  let serviceWorkerUpdateWaiting = false;
  let checkServiceWorkerIntervalId: null | number = null;
  
  let modalInfo:ModalInfo = {
    state: "uploadSheet", 
    modalOpen: false, 
    heading: "Save as Shareable Link",
  };

  let mathCellConfigDialog: MathCellConfigDialog | null = null;
  let baseUnitsConfigDialog: BaseUnitsConfigDialog | null = null;
  let cellList: CellList;

  function startWebWorker() {
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
  startWebWorker();

  
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
    if (checkServiceWorkerIntervalId) {
      window.clearInterval(checkServiceWorkerIntervalId);
    }
  });

  onMount( async () => {
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    $prefersReducedMotion = mediaQueryList.matches
    mediaQueryList.addEventListener('change', handleMotionPreferenceChange);

    $unsavedChange = false;
    $autosaveNeeded = false;
    await refreshSheet(true);

    window.addEventListener("hashchange", handleHashChange);
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

    // register service worker
    if (window.location.hostname !== "localhost") {
      const wb = new Workbox('/serviceworker.js');
      wb.addEventListener('waiting', () => serviceWorkerUpdateWaiting = true);
      try {
        await wb.register();
        console.log('Service worker successfully registered.');
        // periodically check for updates for long running sessions
        checkServiceWorkerIntervalId = window.setInterval(async () => {
            try {  
              await wb.update();
            } catch(e) {
              console.warn(`Error checking for service worker update ${e}`);
            }
          }, 60*60*1000);
      } catch(e) {
        console.warn(`Error registering service worker ${e}`);
      }
    }

  });

  async function handleBeforePrint() {
    $activeCell = -1;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
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

  function handleInsertMathCell(event: ComponentEvents<CellList>['insertMathCell']) {
    addCell('math', event.detail.index+1);
  }

  function handleInsertInsertCell(event: ComponentEvents<CellList>['insertInsertCells']) {
    $inCellInsertMode = true;
    addCell('insert', event.detail.index+1);
  }

  function handleKeyboardShortcuts(event: KeyboardEvent) {
    // this first switch statement is for keyboard shortcuts that should ignore defaultPrevented
    // since some components try to handle these particular events
    // probably would be better to catch these on the capture phase to prevent this issue
    switch (event.key) {
      case "ArrowDown":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else {
          incrementActiveCell();
          event.preventDefault();
        }
        break;
      case "ArrowUp":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else {
          decrementActiveCell();
          event.preventDefault();
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
      case "l":
      case "L":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else {
          modalInfo = {
            state: "uploadSheet",
            modalOpen: true,
            heading: "Save as Sharable Link"
          };
        }
        break;
      case "s":
      case "S":
        if (!event[$modifierKey] || modalInfo.modalOpen) {
          return;
        } else if (event.shiftKey) {
          saveSheetToFile(true);
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
        fileDropActive = false;
        break;
      case "Enter":
        if ($activeCell < 0 && event.shiftKey && !modalInfo.modalOpen) {
          addCell('math', 0);
          break;
        } else if (event[$modifierKey] && !modalInfo.modalOpen) {
          if ($activeCell < 0 && !$inCellInsertMode ) {
            $inCellInsertMode = true;
            addCell('insert', 0);
            break;
          } else {
            // Ctrl-Enter when in cell insert mode
            // break to prevent default so that Ctrl-Enter doesn't click insert math cell button
            break;
          }
        } else {
          // there is already a cell selected, already handled directly by cell events
          return;
        }
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
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
    if($unsavedChange && !inIframe){
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

  async function handleHashChange(event: HashChangeEvent) {
    const url = new URL(event.newURL);
    
    // Old version of app use hash for sheet ID's, need to check for this possibility
    // otherwise let default browser behavior happen (jumping to anchor location on)
    if (url.hash.length === 23) {
      event.preventDefault();
      await refreshSheet();
    }
  }

  async function handleSheetChange(event: PopStateEvent) {
    await refreshSheet();
  }

  function getFileHandleFromKey(fileKey: string | undefined): (null | FileSystemFileHandle) {
    if (fileKey) {
      const fileInfo = recentSheets.get(fileKey);
      if (fileInfo && "fileHandle" in fileInfo) {
        return fileInfo.fileHandle;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }


  async function initializeBlankSheet() {
    currentStateObject = null;
    resetSheet();
    await tick();
    addCell('math');
    await tick();
    $unsavedChange = false;
    $autosaveNeeded = false;
  }

  async function refreshSheet(firstTime = false) {
    if (!refreshingSheet) {
      refreshingSheet = true;

      const hash = getSheetHash(window.location);

      let searchParams: null | URLSearchParams = null;
      if (firstTime) {
        searchParams = new URLSearchParams(window.location.search)
      }

      if (!$unsavedChange || window.confirm("Continue loading sheet, any unsaved changes will be lost?")) {
        currentState = `/${hash}`;
        if (firstTime && ( window.location.pathname === "/open_file" || 
                           searchParams.get('activation') === "file") ) {
          modalInfo = {state: "opening", modalOpen: true, heading: "Opening File"};
          await initializeBlankSheet();  // ensure minimal sheet is loaded in case file load fails or launch queue is empty
          window.history.replaceState(null, "", "/");
          if ('launchQueue' in window) {
            (window.launchQueue as any).setConsumer(launchParams => {
              if (!launchParams.files.length) {
                return;
              }
              const fileHandle = launchParams.files[0];
              openSheetFromFileHandle(fileHandle);
            });
          } else {
            modalInfo.modalOpen = false; // launchQueue not supported by browser, close file open modal
          }
        } else if (hash.startsWith(checkpointPrefix)) {
          currentStateObject = window.history.state;
          await restoreCheckpoint(hash);
        } else if(hash !== "") {
          currentStateObject = null;
          await loadSheetFromUrl(`${apiUrl}${API_GET_PATH}${hash}`);
        } else if(getFileHandleFromKey(window.history.state?.fileKey)) {
          // user had file open, restore that file
          currentStateObject = window.history.state;
          openSheetFromFileHandle(getFileHandleFromKey(window.history.state?.fileKey), false);
        } else {
          await initializeBlankSheet();
        }
      } else {
        // navigation cancelled, restore previous path
        window.history.replaceState(currentStateObject, "", currentState);
      }

      if (firstTime && searchParams.get("modal") === "terms") {
        window.history.replaceState(window.history.state, "", window.location.pathname)
        showTerms();
      }

      refreshingSheet = false;
    } else {
      // another refresh is already in progress
      // don't start a new one and reset the url path to match refresh already in progress
      window.history.pushState(currentStateObject, "", currentState);
    }
  }

  function loadBlankSheet() {
    window.history.pushState(null, "", "/");
    refreshSheet(); // pushState does not trigger onpopstate event
  }

  function getResults(statementsAndSystems: string, myRefreshCount: BigInt, needCoolprop: Boolean) {
    return new Promise<Results>((resolve, reject) => {
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
          if (myRefreshCount !== refreshCounter) {
            reject("Stale solution, resolving. If this message persists, make an edit to trigger a recalculation.");
          } else {
            resolve(e.data);
          }
        }
      }
      const cachedResult = cache.get(statementsAndSystems);
      if (cachedResult) {
        cacheHitCount++;
        resolve(cachedResult);
      } else {
        forcePyodidePromiseRejection = () => reject("Restarting pyodide.")
        pyodideWorker.onmessage = handleWorkerMessage;
        pyodideWorker.postMessage({cmd: 'sheet_solve', data: statementsAndSystems, needCoolprop});
      }
    });
  }

  function getStatementsAndSystemsForPython(): StatementsAndSystems {
    const statements: Statement[] = [];
    const endStatements: Statement[] = [];
    const systemDefinitions: SystemDefinition[] = [];
    const fluidFunctions: FluidFunction[] = []; 

    for (const [cellNum, cell] of $cells.entries()) {
      if (cell instanceof MathCell) {
        if (cell.mathField.statement.type === "assignmentList") {
          statements.push(cell.mathField.statement.assignments[0]);
          endStatements.push(...cell.mathField.statement.assignments.slice(1));
        } else if (cell.mathField.statement.type === "query" && cell.mathField.statement.assignment){
          statements.push(cell.mathField.statement);
          endStatements.push(cell.mathField.statement.assignment);
        } else {
          statements.push(cell.mathField.statement);
        }
      } else if (cell instanceof PlotCell) {
        for (const mathField of cell.mathFields) {
          if (mathField.statement.type === "parametricRange") {
            endStatements.push(...mathField.statement.assignmentStatements);
            for (const parametricStatement of mathField.statement.rangeQueryStatements) {
              parametricStatement.cellNum = cellNum;
              statements.push(parametricStatement);
            }
          } else { 
            if ( (mathField.statement.type === "query" && mathField.statement.isRange) ||
                  mathField.statement.type === "scatterQuery") {
              mathField.statement.cellNum = cellNum;
            }
            statements.push(mathField.statement);
          }
        }
      } else if (cell instanceof TableCell) {
        const newStatements = cell.tableStatements;
        for (const statement of newStatements) {
          endStatements.push(statement);
        }
      } else if (cell instanceof PiecewiseCell) {
        if (cell.piecewiseStatement) {
          endStatements.push(cell.piecewiseStatement);
        }
      } else if (cell instanceof SystemCell) {
        const systemDefinition = cell.getSystemDefinition();
        if (systemDefinition) {
          systemDefinitions.push(systemDefinition);
        }
      } else if (cell instanceof FluidCell) {
        const {fluidFunction, statement} = cell.getFluidFunction($config.fluidConfig);
        if (fluidFunction) {
          fluidFunctions.push(fluidFunction);
          if (statement) {
            endStatements.push(statement);
          }
        }
        
      }
    }

    statements.push(...endStatements);

    return {
      statements: statements,
      systemDefinitions: systemDefinitions,
      fluidFunctions: fluidFunctions,
      customBaseUnits: $config.customBaseUnits,
      simplifySymbolicExpressions: $config.simplifySymbolicExpressions,
      convertFloatsToFractions: $config.convertFloatsToFractions
    };
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
    } else if (cell instanceof FluidCell) {
      return acum || cell.error;
    } else {
      return acum || false;
    }
  }

  async function handleCellUpdate(localRefreshCounter: BigInt) {
    if (localRefreshCounter !== refreshCounter) {
      return;
    }
    const myRefreshCount = localRefreshCounter;
    const firstRunAfterSheetLoad = initialSheetLoad;
    initialSheetLoad = false;
    inDebounce = false;
    if(noParsingErrors && !firstRunAfterSheetLoad) {
      // invalidate results if all math fields are valid (while editing current cell)
      // also, don't invalidate results if sheet was just loaded without modification (initialSheetLoad === true)
      $resultsInvalid = true;
      error = "";
    }
    await pyodidePromise;
    pyodideTimeout = false;
    if (myRefreshCount === refreshCounter && noParsingErrors) {
      const statementsAndSystemsObject = getStatementsAndSystemsForPython()
      let statementsAndSystems = JSON.stringify(statementsAndSystemsObject);
      clearTimeout(pyodideTimeoutRef);
      pyodideTimeoutRef = window.setTimeout(() => pyodideTimeout=true, pyodideTimeoutLength);
      if (!firstRunAfterSheetLoad) {
        $resultsInvalid = true;
        error = "";
      }
      pyodidePromise = getResults(statementsAndSystems,
                                  myRefreshCount, 
                                  Boolean(statementsAndSystemsObject.fluidFunctions.length > 0))
      .then((data: Results) => {
        $results = [];
        $resultsInvalid = false;
        if (!data.error && data.results.length > 0) {
          let counter = 0;
          for (const [i, cell] of $cells.entries()) {
            if ((cell.type === "math" || cell.type === "plot") ) {
              $results[i] = data.results[counter++]; 
            } else {
              $results[i] = null;
            }
          }
        }
        error = data.error;
        $system_results = [];
        let counter = 0;
        for (const [i, cell] of $cells.entries()) {
          if (cell.type === "system") {
            $system_results[i] = data.systemResults[counter++]
          } else {
            $system_results[i] = null;
          }
        }
        if (!firstRunAfterSheetLoad) {
          $autosaveNeeded = true;
        }
      })
      .catch((errorMessage) => error=errorMessage);
    }
  }

  const debounceHandleCellUpdate = debounce(handleCellUpdate, 300);

  async function restartPyodide() {
    // reject any pending promise and restart webworker
    if (forcePyodidePromiseRejection) {
      forcePyodidePromiseRejection();
    }
    await pyodidePromise;
    terminateWorker();
    startWebWorker();
    $results = [];
    $system_results = [];
    refreshCounter++; // make all pending updates stale
  }

  async function uploadSheet(resultModal = true): Promise<string> {
    modalInfo.state = "uploadPending";
    const data = getSheetJson();
    const hash = await getHash(data);

    let response, responseObject;

    try {
      const body: SheetPostBody = {
        title: $title, 
        history: $history,
        document: data.slice(1)
      };

      response = await fetch(`${apiUrl}${API_SAVE_PATH}${hash}`, {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(body)
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
        currentStateObject = null;
        window.history.pushState(null, "", currentState);
      }

      console.log(responseObject.url);

      const sheetUrl = window.location.href;

      if (resultModal) {
        modalInfo = {
          state: "success",
          url: sheetUrl,
          modalOpen: true,
          heading: modalInfo.heading
        };
      }

      $unsavedChange = false;
      $autosaveNeeded = false;

      $history = responseObject.history;

      // on successful upload, update recent sheets
      await updateRecentSheets( { url: sheetUrl, title: $title, sheetId: $sheetId } );

      return sheetUrl;
    } catch (error) {
      console.log("Error sharing sheet:", error);

      if (resultModal) {
        modalInfo = {
          state: "error",
          error: error,
          modalOpen: true,
          heading: modalInfo.heading};
      }

      return "";
    }
  }

  async function downloadSheet(url: string):
                              Promise<{ sheet: Sheet; requestHistory: History; } | null> {
    modalInfo = {state: "retrieving", modalOpen: true, heading: "Retrieving Sheet"};

    let sheet: Sheet, requestHistory: History;
    
    try{
      let response;
      response = await fetch(url);

      if (response.ok) {
        const responseObject = await response.json();
        sheet = JSON.parse(responseObject.data) as Sheet;
        requestHistory = responseObject.history as History;
      } else {
        throw new Error(`${response.status} ${await response.text()}`);
      }
    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>Error retrieving sheet ${window.location}. The URL may be incorrect or
the server may be temporarily overloaded or down. If problem persists, please report problem to
<a href="mailto:support@engineeringpaper.xyz?subject=Error Retrieving Sheet&body=Sheet that failed to load: ${encodeURIComponent(window.location.href)}">support@engineeringpaper.xyz</a>.  
Please include a link to this sheet in the email to assist in debugging the problem. <br>${error} </p>`,
        modalOpen: true,
        heading: "Retrieving Sheet"
      };
      return null;
    }

    return { sheet: sheet, requestHistory: requestHistory };
  }


  async function loadSheetFromUrl(url: string) {
    const sheetData = await downloadSheet(url);

    if (!sheetData) {
      return; // error downloading sheet, downloadSheet function already displayed error modal
    }

    const { sheet, requestHistory } = sheetData;

    const renderError = await populatePage(sheet, requestHistory);

    if (renderError) {
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
      $cells = [];
      $unsavedChange = false;
      $autosaveNeeded = false;
      return;
    }

    modalInfo.modalOpen = false;

    $unsavedChange = false;
    $autosaveNeeded = false;

    // on successfull sheet download, update recent sheets list
    await updateRecentSheets( { url: window.location.href, title: $title, sheetId: $sheetId } );
  }

  async function populatePage(sheet: Sheet, requestHistory: History): Promise<boolean> {
    if (populatingPage) {
      // populatePage already in progress, error out so current process can finish
      return true;
    }

    try{
      populatingPage = true;
      initialSheetLoad = true;

      $cells = [];
      $results = [];
      $resultsInvalid = true;
      $system_results = [];
      $activeCell = -1;

      await tick();

      $title = sheet.title;
      BaseCell.nextId = sheet.nextId;
      $sheetId = sheet.sheetId;
      // old documents in database will not have the insertedSheets property or a config property
      $insertedSheets = sheet.insertedSheets ?? [];
      $config = sheet.config ?? getDefaultConfig();
      $config.customBaseUnits = $config.customBaseUnits ?? getDefaultBaseUnits(); // customBaseUnits may not exist
      $config.simplifySymbolicExpressions = $config.simplifySymbolicExpressions ?? true; // simplifySymboicExpressions may not exist
      $config.convertFloatsToFractions = $config.convertFloatsToFractions ?? true; // convertFloatsToFractions may not exist
      $config.fluidConfig = $config.fluidConfig ?? getDefaultFluidConfig(); // fluidConfig may not exist
    
      $cells = await Promise.all(sheet.cells.map((value) => cellFactory(value, $config)));

      if (!$history.map(item => item.hash !== "file" ? getSheetHash(new URL(item.url)) : "").includes(getSheetHash(window.location))) {
        $history = requestHistory;
      }

      await tick(); // this will populate mathFieldElement and richTextInstance fields

      if (noParsingErrors) {
        $results = sheet.results;
        $resultsInvalid = false;
        // old documents in the database won't have the system_results property
        $system_results = sheet.system_results ? sheet.system_results : [];
      } else {
        $results = [];
        $resultsInvalid = true;
        $system_results = [];
      }

    } catch(error) {
      console.warn(`Render Error: ${error}`);
      populatingPage = false;
      return true;
    }

    populatingPage = false;
    return false;
  }

  // open sheet using a input of type file
  async function handleFileOpen() {
    if (window.showOpenFilePicker) {
      // browser supports File System Access API
      const currentFileHandle = getFileHandleFromKey(window.history.state?.fileKey);

      // @ts-ignore
      let options: OpenFilePickerOptions = { types: fileTypes, id: "epxyz"};

      if (currentFileHandle) {
        // @ts-ignore
        options.startIn = currentFileHandle
      }

      let openFileHandle: FileSystemFileHandle;
      try {
        [openFileHandle] = await window.showOpenFilePicker(options);
      } catch(e) {
        // user cancelled file open
        console.log('File open cancelled.');
        return;
      }

      openSheetFromFile(await openFileHandle.getFile(), openFileHandle);

    } else {
      // no File System Access API, fall back to using input element
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".epxyz";
      input.onchange = (event) => openSheetFromFile(input.files[0], null);
      input.click();
    }
  }

  // open sheet from a drop event
  async function handleFileDrop(event: DragEvent) {
    fileDropActive = false;
    let file: File | null;
    let openFileHandle: null | FileSystemHandle

    const fileItems = Array.from(event.dataTransfer.items).filter(item => item.kind === "file");

    if (fileItems.length > 0 &&
        fileItems[0].getAsFileSystemHandle) {
      // browser supports file system access API
      openFileHandle = await fileItems[0].getAsFileSystemHandle();
      if (openFileHandle.kind === "file") {
        file = await (openFileHandle as FileSystemFileHandle).getFile();
      } else {
        // it's a directory, set file to null so that it is not opened (same as dropping any non-file object)
        file = null;
        openFileHandle = null;
      }
    } else {
      file = event.dataTransfer.files[0];
    }

    if (file) {
        if (openFileHandle) {
          openSheetFromFile(file, (openFileHandle as FileSystemFileHandle));
        } else {
          openSheetFromFile(file, null);
        }
    } else if (event.dataTransfer.getData('text/plain')) {
      let droppedURL: URL | null;
      try {
        droppedURL = new URL(event.dataTransfer.getData('text/plain'));
      } catch (e) {
        droppedURL = null;
      }
      // It's not a file, check if it's a url from the same origin. If so, navigate to it to open the sheet
      if (droppedURL && droppedURL.origin === window.location.origin) {
        window.history.pushState(null, "", droppedURL);
        refreshSheet();
      }
    }
  }

  async function openSheetFromFileHandle(fileHandle: FileSystemFileHandle, pushState = true) {
    try {
      await fileHandle.requestPermission();
      openSheetFromFile(await fileHandle.getFile(), fileHandle, pushState)
    } catch(e) {
      modalInfo = {
        state: "error",
        error: `Error Opening File. The file may no longer exist or the browser may be limiting access to files from a previous session. You will need to reopen the file from its original location.`,
        modalOpen: true,
        heading: "Opening File"
      };
    }
  }


  function openSheetFromFile(file: File, fileHandle: null | FileSystemFileHandle, pushState = true) {
    if (file.size > 0) {
      modalInfo = {state: "opening", modalOpen: true, heading: "Opening File"};
      const reader = new FileReader();
      reader.onload = (event) => loadSheetFromFile(event, fileHandle, pushState);
      reader.readAsText(file);
    } else {
      modalInfo = {
        state: "error",
        error: `Error Opening File. Make sure you have chosen a valid EngineeringPaper.xyz file.`,
        modalOpen: true,
        heading: "Opening File"
      };
    } 
  }

  async function parseFile(event: ProgressEvent<FileReader>):
                 Promise<{ sheet: Sheet; requestHistory: History; } | null> {
    let sheet: Sheet, requestHistory: History;
    
    try{
      const fileObject = JSON.parse((event.target.result as string));
      if (fileObject.data && fileObject.history) {
        sheet = fileObject.data as Sheet;
        requestHistory = fileObject.history as History;
      } else {
        throw `File is not the correct format`;
      }

    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>${error} <br><br>
Error parsing input file. Make sure your attempting to open an EngineeringPaper.xyz file.
<br><br>
If this problem persists after verifying the file is an EngineeringPaper.xyz file,
email support@engineeringpaper.xyz
If possible, please attach the file that is not opening.
 </p>`,
        modalOpen: true,
        heading: "Opening Sheet"
      };
      return null;
    }

    return { sheet: sheet, requestHistory: requestHistory };
  }

  async function loadSheetFromFile(event: ProgressEvent<FileReader>, fileHandle: null | FileSystemFileHandle, pushState = true) {
    const fileData = await parseFile(event);
    
    if (!fileData) {
      // error reading file, parseFile has already put up the error modal
      return;
    }

    const { sheet, requestHistory } = fileData;

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
      $unsavedChange = false;
      $autosaveNeeded = false;
      return;
    }

    if (pushState) {
      currentState = '/';
      currentStateObject = Boolean(fileHandle) ? {fileKey: fileHandle.name + $title + $sheetId} : null
      window.history.pushState(currentStateObject, "", currentState);
    }

    modalInfo.modalOpen = false;
    $unsavedChange = false;
    $autosaveNeeded = true; // make a checkpoint so that, if user refreshes browser, the file is restored

    if (fileHandle) {
      await updateRecentSheets( {url: "", title: $title, sheetId: $sheetId, fileHandle: fileHandle } );
    }
  }


  async function restoreCheckpoint(hash: string) {
    modalInfo = {state: "restoring", modalOpen: true, heading: "Retrieving Autosave Checkpoint"};

    let sheet: Sheet, requestHistory: History;
    
    try{
      const checkpoint = await get(hash);
      if (checkpoint) {
        sheet = checkpoint.data as Sheet;
        requestHistory = checkpoint.history as History;
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
      $unsavedChange = false;
      $autosaveNeeded = false;
      return;
    }

    modalInfo.modalOpen = false;
    $unsavedChange = false;
    $autosaveNeeded = false;
  }


  function loadInsertSheetModal(e: {detail: {index: number}} ) {
    retrieveRecentSheets();

    modalInfo = {
      modalOpen: true,
      state: "insertSheet",
      heading: "Insert a Sheet",
      url: "",
      insertionLocation: e.detail.index
    };
  }

  function loadCellNumberFormatModal(e: any) {
    modalInfo = {
      modalOpen: true,
      state: "sheetSettings",
      heading: "Math Cell Number Format Settings",
      mathCell: e.detail.mathCell as MathCell,
      mathCellElement: e.detail.target as MathCellElement
    };
  }

  function loadGenerateCodeModal(e: any) {
    modalInfo = {
      modalOpen: true,
      state: "generateCode",
      heading: "Generate Code From Function",
      codeGenerationIndex: e.detail.index
    };
  }

  function loadSaveSheetModal(e: any) {
    modalInfo = {
      modalOpen: true,
      state: "downloadDocument",
      heading: "Save Document",
    };
  }

  function handleInsertSheetFromFile(e: CustomEvent<{file: File}>) {
    if (e.detail.file.size > 0) {
      modalInfo.state = "opening";
      modalInfo.modalOpen = true;
      modalInfo.heading = "Opening File";

      const reader = new FileReader();
      reader.onload = insertSheet;
      reader.readAsText(e.detail.file); 
    } else {
      modalInfo = {
        state: "error",
        error: `Error Opening File. Make sure you have dropped a file and not a directory.`,
        modalOpen: true,
        heading: "Opening File"
      };
    }
  }

  async function insertSheet(fileReader?: ProgressEvent<FileReader>) {
    const index = modalInfo.insertionLocation;

    let sheetData: { sheet: Sheet; requestHistory: History; } | null;
    let sheetUrl: string;

    if(fileReader) {
      sheetData = await parseFile(fileReader);
      sheetUrl = "file";
    } else {
      sheetUrl = modalInfo.url;
      let sheetHash: string;

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

      sheetData = await downloadSheet(url);
    }

    if (!sheetData) {
      return; // error downloading or opening sheet, downloadSheet or parseFile function already displayed error modal
    }

    const { sheet } = sheetData;

    try{
      $results = [];
      $resultsInvalid = true;
      $system_results = [];

      const newCells = await Promise.all(sheet.cells.map((value) => cellFactory(value, $config)));

      // need to make sure cell id's don't collide
      for (const cell of newCells) {
        cell.id = BaseCell.nextId++;
      }

      $cells = [...$cells.slice(0, index), ...newCells, ...$cells.slice(index)]

      await tick();
    } catch(error) {
      modalInfo = {
        state: "error",
        error: `<p>Error inserting sheet ${sheetUrl}.
This is most likely due to a bug in EngineeringPaper.xyz.
If problem persists after attempting to refresh the page, please report problem to
<a href="mailto:support@engineeringpaper.xyz?subject=Error Regenerating Sheet&body=Sheet that failed to load: ${encodeURIComponent(sheetUrl)}">support@engineeringpaper.xyz</a>.  
Please include a link to this sheet in the email to assist in debugging the problem. <br>${error} </p>`,
        modalOpen: true,
        heading: "Retrieving Sheet"
      };
      $cells = [];
      $unsavedChange = false;
      $autosaveNeeded = false;
      return;
    }

    modalInfo.modalOpen = false;
    $unsavedChange = true;
    $autosaveNeeded = true;

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
  async function saveSheetToFile(saveAs = false) {
    $history = [{
      url: $title,
      hash: 'file',
      creation: (new Date()).toISOString()
    }, ...$history];

    const sheet = {
        data: getSheetObject(true),
        history: $history
    };

    const fileData = new Blob([JSON.stringify(sheet)], {type: "application/json"});

    if (window.showSaveFilePicker) {
      // browser supports file system access API, so show user a file picker
      let fileSaved = false;
      let saveFileHandle: FileSystemFileHandle;

      // use current file handle if user has already saved this sheet
      const currentFileHandle = getFileHandleFromKey(window.history.state?.fileKey);
      if (!saveAs && currentFileHandle && window.history.state?.fileKey ===  currentFileHandle.name + $title + $sheetId) {
        modalInfo = {state: "saving", modalOpen: true, heading: "Saving File"};
        try {
          const writable = await currentFileHandle.createWritable();
          await writable.write(fileData);
          await writable.close();

          await sleep(250); // prevent save modal from flashing too quickly

          saveFileHandle = currentFileHandle;
          fileSaved = true;
        } catch(e) {
          // save using existing handle unsuccessful, will proceed to using the save dialog
          modalInfo.modalOpen = false;
        }
      }

      if (!fileSaved) {
        const options: SaveFilePickerOptions = {
          types: fileTypes,
          // @ts-ignore
          id: "epxyz",
          suggestedName: `${$title}.epxyz`
        }
        
        try {
          saveFileHandle = await window.showSaveFilePicker(options);
        } catch(e) {
          // user cancelled the save operation
          console.log('Save cancelled.');
          return;
        }

        modalInfo = {state: "saving", modalOpen: true, heading: "Saving File"};
        try {
          const writable = await saveFileHandle.createWritable();
          await writable.write(fileData);
          await writable.close();
        } catch(e) {
          //save failed
          modalInfo = {
            state: "error",
            error: `<p>Error saving sheet: ${saveFileHandle.name} </p><br>
                    <p>${e}</p`,
            modalOpen: true,
            heading: "Saving Sheet"
          };
          return;
        }
      }

      modalInfo.modalOpen = false;
      currentState = "/";
      currentStateObject = {fileKey: saveFileHandle.name + $title + $sheetId};
      window.history.pushState(currentStateObject, "", "/");

      await updateRecentSheets( {url: "", title: $title, sheetId: $sheetId, fileHandle: saveFileHandle } );
    } else {
      // browser does not support file system access API, file will be downloaded with default name
      saveFileBlob(fileData, `${$title}.epxyz`);
    }

    $unsavedChange = false;
    $autosaveNeeded = false;
  }


  async function saveLocalCheckpoint() {
    if ($autosaveNeeded && !refreshingSheet && !inIframe) {
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
        currentStateObject = window.history.state;
        window.history.pushState(currentStateObject, "", currentState);
        $autosaveNeeded = false;
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


  async function updateRecentSheets({url, title, sheetId, fileHandle} : 
      {url: string, title: string, sheetId: string, fileHandle?: FileSystemFileHandle}) {
    if (!inIframe) {

      let newRecentSheet: RecentSheetUrl | RecentSheetFile;
      let newKey: string;

      if (fileHandle) {
        newKey = fileHandle.name + title + sheetId;
        newRecentSheet = {
            fileName: fileHandle.name,
            fileHandle: fileHandle,
            accessTime: new Date(),
            title: title
          };
      } else {
        newKey = title + sheetId;
        newRecentSheet = {
            url: url,
            accessTime: new Date(),
            title: title
          };
      }

      // update the IndexDB recentSheets entry in the database with the new entry
      try {
        await update('recentSheets', (oldRecentSheets) => {
          let newRecentSheets = (oldRecentSheets || new Map()).set(newKey, newRecentSheet);
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

  async function getMarkdown(getShareableLink = false) {
    let markdown = `# ${$title}\n`;

    if (getShareableLink) {
      modalInfo = {
            state: "uploadPending",
            modalOpen: true,
            heading: "Generating Document"
      };

      const sheetUrl = await uploadSheet(false);
      if (sheetUrl) {
        markdown += `A live version of this calculation is available at [EngineeringPaper.xyz](${sheetUrl}).\n\n`;
      } else {
        markdown += `An error occurred generating a shareable link for this document.\n\n`;
      }

      modalInfo.modalOpen = false;
    }

    markdown += await cellList.getMarkdown();

    return markdown;
  }

  async function getDocument(docType: "docx" | "pdf" | "md" | "tex", getShareableLink = false) {
    const markDown = "<!-- Created with EngineeringPaper.xyz -->\n" + await getMarkdown(getShareableLink);
    const upload_blob = new Blob([markDown], {type: "text/markdown"});

    if (docType === "md") {
      saveFileBlob(upload_blob, `${$title}.${docType}`);
      return
    }

    const upload_file = new File([upload_blob], "input.md", {type: "text/markdown"});
    const formData = new FormData();
    formData.append("request_file", upload_file);

    modalInfo = {state: "generatingDocument", modalOpen: true, heading: "Generating Document"};

    try {
      const response = await fetch(`${apiUrl}/docgen/${docType}`, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const fileBlob = await response.blob();

        saveFileBlob(fileBlob, `${$title}.${docType}`);

        modalInfo.modalOpen = false;
      } else {
        let errorMessage = await response.text();
        try {
          const errorObject = JSON.parse(errorMessage);
          errorMessage = errorObject.detail;
        } catch {
        }

        throw new Error(`${response.status} ${errorMessage}`);
      }
    } catch (error) {
      console.log(`Error creating ${docType} document: ${error}`);
      modalInfo = {
        state: "error",
        error: error,
        modalOpen: true,
        heading: modalInfo.heading};
    }
  }

  async function retrieveRecentSheets() {
    try {
      const localRecentSheets = (await get('recentSheets') as RecentSheets);
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
               $activeMathField.element.getMathField().parentElement,
               document.getElementById('main-content')) 
          ) {
        $activeMathField.element.getMathField().parentElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
      }
    }
  }

  function handleLinkPushState(e: MouseEvent, path) {
    if (e.button === 0) {
      window.history.pushState(null, "", path);
      e.preventDefault();
      refreshSheet();
    }
  }

  function handleUpdateAvailable() {
    modalInfo = {
      modalOpen: true,
      state: "updateAvailable",
      heading: "Update Available"
    };
  }

  function handleGetShareableLink() {
    modalInfo = {
      state: "uploadSheet",
      modalOpen: true,
      heading: "Save as Shareable Link"
    };
  }

  function handleSheetSettings() {
    modalInfo = {
      modalOpen: true,
      state: "sheetSettings",
      heading: "Sheet Settings",
      mathCell: null,
      mathCellElement: null
    };
  }

  function handleUnitsModal() {
    modalInfo = {
      modalOpen: true,
      state: "supportedUnits",
      heading: "Supported Units"
    };
  }

  function handleKeyboardShortcutsModal() {
    modalInfo = {
      modalOpen: true,
      state: "keyboardShortcuts",
      heading: "Keyboard Shortcuts"
    };
  }

  function handleCustomMatrix(event: CustomEvent<{targetMathField: MathField}>) {
    modalInfo = {
      modalOpen: true,
      state: "customMatrix",
      heading: "Insert Matrix",
      targetMathField: event.detail.targetMathField
    };
  }

  $:if (document.hasFocus() && showKeyboard !== Boolean($activeMathField)) {
      showKeyboard = Boolean($activeMathField);
    }

  $: document.title = `EngineeringPaper.xyz: ${$title}`;

  $: if($mathCellChanged) {
    refreshCounter++;
    $mathCellChanged = false;
    noParsingErrors = !checkParsingErrors();
    if (initialSheetLoad) {
      handleCellUpdate(refreshCounter);
    } else {
      inDebounce = true;
      debounceHandleCellUpdate(refreshCounter);
    }
    $unsavedChange = true;
    $autosaveNeeded = true;
  }

  $: if ($nonMathCellChanged) {
    $unsavedChange = true;
    $autosaveNeeded = true;
    $nonMathCellChanged = false;
  }

  $: usingDefaultConfig = isDefaultConfig($config);

</script>

<style>
  :root {
    --keyboard-tray-height: 200px;
    --status-footer-height: 64px;
  }

  button {
    border-radius: 5px;
  }

  button.link {
    border: none;
    color: blue;
    cursor: pointer;
    padding: 0px;
    background: none;
  }

  button.link:hover {
    background: none;
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
    width: 100vw;
    overflow-x: auto;
    justify-content: flex-end;
  }

  @media print {
    :global(.bx--header) {
      display: none !important;
    }
  }

  :global(.bx--header__name) {
    padding: 0px !important;
    flex-grow: 1;
  }

  :global(.bx--header__global) {
    flex: 0 1 auto;
  }

  :global(nav.bx--side-nav__navigation) {
    background-color: #f1f1f1;
    border-right: solid 1px lightgray;
  }

  @media print {
    :global(nav.bx--side-nav__navigation) {
      display: none;
    }

    :global(div.bx--side-nav__overlay) {
      display: none;
    }
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
    padding: 8px 0px 8px 0px;
  }

  @media print {
    :global(#main-content) {
      overflow: visible;
      margin-left: 0px;
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
    z-index: 2;
  }

  div.sheet-margin {
    flex-grow: 1;
    position: sticky;
    top: 0px;
    z-index: 1;
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
    overflow-y: auto;
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

  :global(#update-icon) {
    fill: limegreen;
  }

  :global(.standalone) {
    display: none;
  }

  @media all and (display-mode: standalone) {
    :global(.standalone) {
      display: block;
    }
  }

  @media (max-width: 450px) {
    :global(.hide-when-kinda-narrow) {
      display: none;
    }
  }

  @media (max-width: 400px) {
    :global(.hide-when-narrow) {
      display: none;
    }
  }

  @media (max-width: 330px) {
    :global(.hide-when-really-narrow) {
      display: none;
    }
  }

  div.dot-container {
    position: relative;
  }

  div.dot {
    position: absolute;
    top: 20%;
    right: 27%;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: limegreen;
  }

</style>

{#if fileDropActive}
  <DropOverlay
    on:click={e => fileDropActive=false}
    on:drop={handleFileDrop}
    on:dragenter={e => fileDropActive=true}
    on:dragleave={e => fileDropActive=false}
  />
{/if}

<!-- The nonstatic element actions (drag and drop to open file and click margin to unselect all) duplicate functionality  
     available through keyboard shortcuts (Cntrl-O and Escape, respectively). File open is also avialable through a separate button -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
  class="page"
  class:inIframe
	on:dragover|preventDefault
	on:dragenter={e => fileDropActive = !modalInfo.modalOpen}
>
  <Header
    bind:isSideNavOpen={sideNavOpen}
    persistentHamburgerMenu={!inIframe}
  >
    <span 
      class="logo" 
      slot="platform"
      on:click={() => $activeCell = -1}
    >
      <img class="logo" src="logo_dark.svg" alt="EngineeringPaper.xyz">
    </span>
    
    {#if serviceWorkerUpdateWaiting}
      <HeaderGlobalAction 
        title="Update Available" 
        on:click={handleUpdateAvailable}
      >
        <Renew size={20} id="update-icon"/>
      </HeaderGlobalAction>
    {/if}
    <HeaderGlobalAction 
      class="standalone"
      title="Go Back"
      on:click={() => window.history.back()}
      icon={ArrowLeft}
    />
    <HeaderGlobalAction 
      class="standalone"
      title="Go Forward"
      on:click={() => window.history.forward()}
      icon={ArrowRight}
    />
    <HeaderGlobalAction
      class="standalone hide-when-narrow"
      title="Print"
      on:click={() => window.print()}
      icon={Printer}
    />

    <div slot="skip-to-content">
      <SkipToContent />
    </div>

    <HeaderUtilities>
      {#if !inIframe}
        <HeaderActionLink
          id="new-sheet"
          title="New Sheet"
          href="/" 
          icon={DocumentBlank}
          on:click={ (e) => handleLinkPushState(e, '/') }
        />
        <HeaderGlobalAction
          id="open-sheet"
          title="Open Sheet From File"
          on:click={handleFileOpen}
          icon={Document}
        />
        <HeaderGlobalAction
          id="save-sheet"
          title="Save Sheet to File in Various Formats"
          on:click={loadSaveSheetModal}
          icon={Download}
        />
        <HeaderGlobalAction
          id="upload-sheet"
          title="Get Shareable Link"
          on:click={handleGetShareableLink} 
          icon={CloudUpload}
        />
        <HeaderActionLink
          href={`/${tutorialHash}`}
          title="Tutorial"
          rel="nofollow"
          icon={Help}
          on:click={(e) => handleLinkPushState(e, `/${tutorialHash}`) }
        />
        <div class="dot-container">
          <HeaderGlobalAction 
            title={"Sheet Settings" + (usingDefaultConfig ? "" : " (Modified)")}
            on:click={handleSheetSettings} 
            icon={SettingsAdjust}
          />
          {#if !usingDefaultConfig}
            <div class="dot"></div>
          {/if}
        </div>
        <HeaderGlobalAction
          title="Supported Units"
          on:click={handleUnitsModal}
          icon={Ruler}
        />
        <HeaderGlobalAction 
          class="hide-when-narrow" 
          title="Keyboard Shortcuts" 
          on:click={handleKeyboardShortcutsModal}
          icon={Keyboard}
        />
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
    <SideNav
      bind:isOpen={sideNavOpen}
      on:open={retrieveRecentSheets}
      on:close={() => window.dispatchEvent(new Event('resize'))}
    >
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
            {#each $history as {url, hash, creation} (hash+creation)}
              {#if hash === "file"}
                <SideNavMenuItem isSelected={false}>
                  <div title={url}>
                    <div class="side-nav-title">
                      {`Saved as File: ${url}`}
                    </div>
                    <em class="side-nav-date">{(new Date(creation)).toLocaleString()}</em>
                  </div>
                </SideNavMenuItem>
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
              {#if url === "file"}
                <SideNavMenuItem>
                  <div title={title}>
                    <div class="side-nav-title">
                      {`File Inserted: ${title}`}
                    </div>
                    <em class="side-nav-date">{(new Date(insertion)).toLocaleString()}</em>
                  </div>
                </SideNavMenuItem>
              {:else}
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
              {/if}
            {/each}
          </SideNavMenu>
        {/if}
        {#if recentSheets.size > 0}
          <SideNavMenu text="Recent Sheets">
            {#each [...recentSheets] as [key, value] (key)}
              {#if "url" in value}
                <SideNavMenuItem
                  isSelected={getSheetHash(new URL(value.url)) === currentState.slice(1)}
                  href={`/${getSheetHash(new URL(value.url))}`}
                  rel="nofollow"
                  on:click={(e) => ("url" in value) ? handleLinkPushState(e, `/${getSheetHash(new URL(value.url))}`) : null}
                >
                  <div title={value.title}>
                    <div class="side-nav-title">
                      {value.title}
                    </div>
                    <em class="side-nav-date">{(new Date(value.accessTime)).toLocaleString()}</em>
                  </div>
                </SideNavMenuItem>
              {:else}
                <SideNavMenuItem
                  isSelected={key === window.history.state?.fileKey}  
                  on:click={async (e) => ("fileHandle" in value) ? openSheetFromFileHandle(value.fileHandle) : null}
                >
                  <div title={value.fileName}>
                    <div class="side-nav-title">
                      {`File: ${value.fileName}`}
                    </div>
                    <em class="side-nav-date">{(new Date(value.accessTime)).toLocaleString()}</em>
                  </div>
                </SideNavMenuItem>
              {/if}
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
          on:click={() => modalInfo = {
              modalOpen: true,
              state: "tryEpxyz",
              heading: "Now Available at EPxyz.com"
          }}
          text=".xyz blocked? Try EPxyz.com"
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
    <div
      class="sheet-margin"
      on:click={() => $activeCell = -1}
    >
    </div>

    <div id="sheet">
      <DocumentTitle bind:title={$title}/>

      <CellList
        on:insertSheet={loadInsertSheetModal}
        on:updateNumberFormat={loadCellNumberFormatModal}
        on:generateCode={loadGenerateCodeModal}
        on:insertMathCellAfter={handleInsertMathCell}
        on:insertInsertCellAfter={handleInsertInsertCell}
        bind:this={cellList}
      />

      <div class="print-logo">
        Created with: <img src="print_logo.png" alt="EngineeringPaper.xyz" height="26 px">
      </div>

      <div class="bottom-spacer" class:inIframe></div>
    </div>

    <div
      class="sheet-margin"
      on:click={() => $activeCell = -1}
    >
    </div>

  </Content>

  <div
    id="keyboard-tray" 
    class:inIframe
    style={`height: ${showKeyboard && !inIframe ? 'var(--keyboard-tray-height)' : '0px'}`}
    on:transitionend={ensureMathFieldVisible}
    on:mousedown={ (event) => {event.preventDefault(); ensureMathFieldVisible(event);} }
  >
    <VirtualKeyboard
      keyboards={keyboards}
      on:customMatrix={handleCustomMatrix}
    />
  </div>

  {#if (termsAccepted < termsVersion) && !inIframe}
    <div class="status-footer" on:mousedown={e=>e.preventDefault()}>
      <InformationFilled color="#0f62fe"/>
      <div>
        Use of this software is subject to these  
        <button class="link" on:click={showTerms}>
          Terms and Conditions
        </button>  (updated {versionToDateString(termsVersion)})
      </div>
      <button on:click={acceptTerms}>Accept</button>
    </div>
  {:else}
    {#if noParsingErrors}
      {#if inDebounce && !pyodideNotAvailable && pyodideLoaded}
        <div class="status-footer">
          <InlineLoading status="inactive" description="Updating..."/>
        </div>
      {:else}
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
      {/if}
      {#if error && !inDebounce}
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
    {#if modalInfo.state === "sheetSettings"}
      <Modal
        modalHeading={modalInfo.heading}
        primaryButtonText="Confirm"
        secondaryButtonText="Restore Defaults"
        on:click:button--primary={() => modalInfo.modalOpen = false}
        on:click:button--secondary={() => {mathCellConfigDialog?.resetDefaults();
                                           baseUnitsConfigDialog?.resetDefaults();
                                           $config.simplifySymbolicExpressions = true;
                                           $config.convertFloatsToFractions = true;}}
        bind:open={modalInfo.modalOpen}
      >
        {#if modalInfo.mathCell}
          <MathCellConfigDialog
            bind:this={mathCellConfigDialog}
            mathCellConfig={modalInfo.mathCell.config}
            mathCellElement={modalInfo.mathCellElement}
            cellLevelConfig={true}
          />
        {:else}
          <Tabs>
            <Tab label="Number Format" />
            <Tab label="Default Units" />
            <svelte:fragment slot="content">
              <TabContent>
                <Checkbox 
                  labelText="Automatically Simplify Symbolic Expressions (unchecking may speed up sheet updates)"
                  bind:checked={$config.simplifySymbolicExpressions}
                  on:check={() => $mathCellChanged = true}
                />
                <Checkbox 
                  labelText="Automatically Convert Decimal Values to Fractions (increases precision for decimal numbers, unchecking may speed up sheet updates)"
                  bind:checked={$config.convertFloatsToFractions}
                  on:check={() => $mathCellChanged = true}
                />
                <MathCellConfigDialog
                  bind:this={mathCellConfigDialog}
                  bind:mathCellConfig={$config.mathCellConfig}
                />
              </TabContent>
              <TabContent>
                <BaseUnitsConfigDialog 
                  bind:this={baseUnitsConfigDialog}
                  bind:baseUnits={$config.customBaseUnits}
                />
              </TabContent>
            </svelte:fragment>
          </Tabs>
        {/if}
      </Modal>
    {:else if modalInfo.state === "customMatrix"}
      <CustomMatrixModal 
        bind:open={modalInfo.modalOpen}
        targetMathField={modalInfo.targetMathField}
      />
    {:else if modalInfo.state === "downloadDocument"}
      <DownloadDocumentModal
        bind:open={modalInfo.modalOpen}
        on:downloadSheet={(e) => saveSheetToFile(e.detail.saveAs)}
        on:downloadDocument={(e) => getDocument(e.detail.docType, e.detail.getShareableLink)}
      />
    {:else}
      <Modal
        passiveModal={!(modalInfo.state === "uploadSheet" || modalInfo.state === "insertSheet")}
        bind:open={modalInfo.modalOpen}
        modalHeading={modalInfo.heading}
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        on:click:button--secondary={() => (modalInfo.modalOpen = false)}
        on:open
        on:close
        on:submit={ modalInfo.state === "uploadSheet" ? () => uploadSheet() : () => insertSheet() }
        hasScrollingContent={["supportedUnits", "insertSheet", "termsAndConditions",
                            "newVersion", "keyboardShortcuts", "generateCode"].includes(modalInfo.state)}
        preventCloseOnClickOutside={!["supportedUnits", "bugReport", "tryEpxyz", "newVersion", "updateAvailable", 
                                      "keyboardShortcuts"].includes(modalInfo.state)}
      >
        {#if modalInfo.state === "uploadSheet"}
          <p>Saving this document will create a private shareable link that can be used to access this 
            document in the future. Anyone you share this link with will be able to access the document.
          </p>
        {:else if modalInfo.state === "uploadPending"}
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
        {:else if modalInfo.state === "generatingDocument"}
          <InlineLoading description={`Generating document file...`}/>
        {:else if modalInfo.state === "opening"}
          <InlineLoading description={`Opening sheet from file`}/>
        {:else if modalInfo.state === "saving"}
          <InlineLoading description={`Saving sheet to file`}/>
        {:else if modalInfo.state === "restoring"}
          <InlineLoading description={`Restoring autosave checkpoint: ${window.location}`}/>
        {:else if modalInfo.state === "bugReport"}
          <p>If you have discovered a bug in EngineeringPaper.xyz, 
            please send a bug report to 
            <a href={`mailto:support@engineeringpaper.xyz?subject=Bug Report&body=Sheet with issues: ${encodeURIComponent(window.location.href)}`}>support@engineeringpaper.xyz</a>.
            Please include a description of the problem. Additionally, it's best if you can include a link to the sheet that is experiencing the problem.
          </p>
        {:else if modalInfo.state === "tryEpxyz"}
          <p>
            Some environments indiscriminately block all <em>.xyz</em> domains. For example,
            some school districts block all <em>.xyz</em> domains for their school issued 
            Chromebooks. Since it's important to us that all of the EngineeringPaper.xyz
            goodness is available to everyone, the full functionality of EngineeringPaper.xyz 
            is now also available as a <em>.com</em> address at
            <a href="EPxyz.com" target="_blank">EPxyz.com</a>. The functionality is the same
            between the two domains and sheets saved on one can be opened on the other. 
            Shareable links are interchangeable as well. For example, 
            <a href="https://engineeringpaper.xyz/fFjTsnFoSQMLwcvteVoNtL" target="_blank">
              https://engineeringpaper.xyz/fFjTsnFoSQMLwcvteVoNtL</a> and 
            <a href="https://epxyz.com/fFjTsnFoSQMLwcvteVoNtL" target="_blank">
              https://epxyz.com/fFjTsnFoSQMLwcvteVoNtL</a> point to the same sheet.
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
            on:fileSelected={handleInsertSheetFromFile}
            recentSheets={recentSheets}
            prebuiltTables={prebuiltTables}
          />
        {:else if modalInfo.state === "updateAvailable"}
          <UpdateAvailable/>
        {:else if modalInfo.state === "generateCode"}
          <GenerateCodeDialog index={modalInfo.codeGenerationIndex} {pyodidePromise}/>
        {:else}
          <InlineLoading status="error" description="An error occurred" />
          {@html modalInfo.error}
        {/if}
      </Modal>
    {/if}
  {/if}

</div>


