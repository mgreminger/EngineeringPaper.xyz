import { SvelteMap } from 'svelte/reactivity';

import { get as idbGet } from 'idb-keyval';

import { debounce } from './utility';
import type { Cell } from './cells/Cells';
import { BaseCell, type CellTypes, type DatabaseDataTableCell } from './cells/BaseCell';
import MathCell from './cells/MathCell.svelte';
import DocumentationCell from './cells/DocumentationCell.svelte';
import TableCell from './cells/TableCell.svelte';
import DataTableCell from './cells/DataTableCell.svelte';
import PiecewiseCell from './cells/PiecewiseCell.svelte';
import SystemCell from './cells/SystemCell.svelte';
import FluidCell from './cells/FluidCell.svelte';
import CodeCell from './cells/CodeCell.svelte';
import PlotCell from './cells/PlotCell.svelte';
import DeletedCellClass from "./cells/DeletedCell";
import InsertCell from "./cells/InsertCell";
import ImportCell from './cells/ImportCell.svelte';
import PageBreakCell from './cells/PageBreakCell';

import type { History } from './database/types';
import type { Result, FiniteImagResult, PlotResult, 
              MatrixResult, SystemResult, DataTableResult, 
              CodeCellResult, RenderResult,
              Results} from './resultTypes';
import { type Config, type InsertedSheet, type Sheet, getDefaultConfig, normalizeConfig } from './sheet/Sheet';

import type { MathfieldElement } from "mathlive";

import DOMPurify from 'dompurify';
import type { StatementsAndSystems } from './types';

import CellList from './CellList.svelte';
import { LatexParserWrapper } from './parser/parserWrapper';

const defaultTitle = 'New Sheet';

export const debounceTime = 300;

let pyodideTimeoutRef = 0;
const pyodideTimeoutLength = 2000;

function setParsePending(parsePending: boolean) {
  appState.parsePending = parsePending;
}

type AppState = {
  currentVersion: number;
  termsVersion: number;

  parserWrapper: LatexParserWrapper;
  nextParserId: number;

  cellListElement: CellList,

  refreshCounter: bigint;
  inDebounce: boolean;
  parsePending: boolean;
  noParsingErrors: boolean;
  populatingPage: boolean;
  error: string | null;

  pyodidePromise: Promise<Boolean> | null;
  pyodideTimeout: boolean;

  pyodideWorker: Worker;
  forcePyodidePromiseRejection: () => void;

  unsavedChange: boolean;
  autosaveNeeded: boolean;

  config: Config;
  cells: Cell[];
  title: string,
  results: (Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[] | null)[];
  system_results: SystemResult[] | null;
  codeCellResults: Record<string, CodeCellResult>;
  sub_results: Map<string,(Result | FiniteImagResult | MatrixResult)>;
  resultsInvalid: boolean;
  sheetId: string;
  insertedSheets: InsertedSheet[];

  history: History;

  prefersReducedMotion: boolean;
  activeCell: number;
  activeMathField: MathfieldElement | null;

  debug: boolean;

  modifierKey: "ctrlKey" | "metaKey";

  onMobile: boolean;

  inCellInsertMode: boolean;

  paperSize: "a4" | "letter";
  exportCenteredEquations: false;
}

export const appState: AppState = $state<AppState>({
  currentVersion: 20260926,
  termsVersion: 20260809,

  parserWrapper: new LatexParserWrapper(setParsePending),
  nextParserId: 0,

  cellListElement: undefined,

  refreshCounter: BigInt(1),
  inDebounce: false,
  parsePending: false,
  noParsingErrors: true,
  populatingPage: false,
  error: null,

  pyodidePromise: null,
  pyodideTimeout: false,

  pyodideWorker: undefined,
  forcePyodidePromiseRejection: undefined,

  unsavedChange: false,
  autosaveNeeded: false,

  config: getDefaultConfig(),
  cells: [],
  title: defaultTitle,
  results: [],
  system_results: [],
  codeCellResults: {},
  sub_results: new SvelteMap(), 
  resultsInvalid: false,
  sheetId: '',
  insertedSheets: [],

  history: [],

  prefersReducedMotion: true,
  activeCell: -1,
  activeMathField: null,

  debug: false,

  modifierKey: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "metaKey" : "ctrlKey",

  onMobile: navigator.userAgent.includes('Mobi'),

  inCellInsertMode: false,

  paperSize: "letter",
  exportCenteredEquations: false
});

export default appState;

export async function addCell(type: CellTypes, index?: number) {
  if (index === undefined){
    index = appState.cells.length;
  }

  let newCell: TableCell | MathCell | DocumentationCell | PiecewiseCell | SystemCell |
               PlotCell | InsertCell | FluidCell | DataTableCell | PageBreakCell;

  if (type === "math") {
    newCell = new MathCell;
  } else if (type === "documentation") {
    newCell = new DocumentationCell;
  } else if (type === "table") {
    newCell = new TableCell;
  } else if (type === "dataTable") {
    await DataTableCell.init();
    newCell = new DataTableCell;
  } else if (type === "piecewise") {
    newCell = new PiecewiseCell;
  } else if (type === "system") {
    newCell = new SystemCell;
  } else if (type === "plot") {
    await PlotCell.init();
    newCell = new PlotCell;
  } else if (type === "insert") {
    newCell = new InsertCell;
  } else if (type === "fluid") {
    await FluidCell.init();
    newCell = new FluidCell(appState.config.fluidConfig);
  } else if (type === "code") {
    await CodeCell.init();
    newCell = new CodeCell();
  } else if (type === "import") {
    newCell = new ImportCell();
  } else if (type === "pageBreak") {
    newCell = new PageBreakCell();
  } else {
    throw new Error(`Attempt to insert uninsertable cell type ${type}`);
  }

  appState.cells.splice(index, 0, newCell);

  appState.results.splice(index, 0, null);

  appState.system_results.splice(index, 0, null);

  appState.activeCell = index;
}

export function clearResults() {
  appState.results = [];
  appState.system_results = [];
  appState.codeCellResults =  {};
  appState.sub_results =  new SvelteMap(); 
}

export function handleClickInCell(index: number) {
  if (appState.activeCell !== index && !appState.inCellInsertMode)
    appState.activeCell = index;
}

export function getSheetObject(includeResults=true): Sheet {
  return {
    version: appState.currentVersion,
    config: appState.config,
    cells: appState.cells.map(x => x.serialize()).filter(item => item !== null),
    title: appState.title,
    results: includeResults ? (appState.resultsInvalid ? [] : appState.results) : [],
    system_results: includeResults ? appState.system_results : [],
    codeCellResults: includeResults ? appState.codeCellResults : {},
    sub_results: includeResults ? [...appState.sub_results.entries()] : [],
    nextId: BaseCell.nextId,
    sheetId: appState.sheetId,
    insertedSheets: appState.insertedSheets
  };
}

export function getSheetJson() {
  const sheet = getSheetObject();

  return ' ' + JSON.stringify(sheet);
}

export async function resetSheet() {
  let defaultConfig: Config;

  try {
    defaultConfig = normalizeConfig(await idbGet('defaultConfig'));
  } catch(e) {
    console.warn('Error retrieving default config for idb');
    defaultConfig = getDefaultConfig();
  }

  appState.config = defaultConfig;
  appState.cells = [];
  appState.title = defaultTitle;
  appState.results = [];
  appState.resultsInvalid = true;
  appState.system_results = [];
  appState.sub_results = new Map();
  BaseCell.nextId = 0;
  DataTableCell.nextParameterId = 1;
  DataTableCell.nextInterpolationDefId = 1;
  DataTableCell.nextPolyfitDefId = 1;
  CodeCell.nextFuncId = 1;
  appState.history = [];
  appState.insertedSheets = [];
  appState.activeCell = 0;
  appState.sheetId = window.crypto.randomUUID();
}


export function incrementActiveCell() {
  if (appState.activeCell !== -1) {
    if (appState.activeCell < appState.cells.length -1 ) {
      appState.activeCell = appState.activeCell+1;
    }
  } else if (appState.cells.length > 0) {
    appState.activeCell = 0;
  }
}


export function decrementActiveCell() {
  if (appState.activeCell !== -1) {
    if (appState.activeCell > 0 ) {
      appState.activeCell = appState.activeCell-1;
    }
  } else if (appState.cells.length > 0) {
    appState.activeCell = appState.cells.length-1;
  }
}

export function deleteCell(index: number, forceDelete=false) {
  let newCells: Cell[];
  let newResults: (Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[])[];
  let newSystemResults: SystemResult[];

  if (appState.cells[index].type !== "deleted" && 
      appState.cells[index].type !== "insert" &&
      !forceDelete) {
    
    const contentDiv = document.getElementById(`cell-${index}`);
    let height = 0;
    if (contentDiv) {
      height = contentDiv.getBoundingClientRect().height;
    }

    newCells = [...appState.cells.slice(0,index), new DeletedCellClass(appState.cells[index], height), ...appState.cells.slice(index+1)];
    newResults = [...appState.results.slice(0,index), null, ...appState.results.slice(index+1)];
    newSystemResults = [...appState.system_results.slice(0,index), null, ...appState.system_results.slice(index+1)];
  } else {
    // user comfirming delete of an undo delete cell or a insert cell
    newCells = [...appState.cells.slice(0,index), ...appState.cells.slice(index+1)];
    newResults = [...appState.results.slice(0,index), ...appState.results.slice(index+1)];
    newSystemResults = [...appState.system_results.slice(0,index), ...appState.system_results.slice(index+1)];
  }

  if (appState.activeCell >= newCells.length) {
    appState.activeCell = newCells.length-1;
  }

  appState.cells = newCells;
  appState.results = newResults;
  appState.system_results = newSystemResults;

  appState.resultsInvalid = true;
}

export function mathCellChanged() {
  appState.refreshCounter++;
  appState.noParsingErrors = !appState.cellListElement.checkParsingErrors();

  appState.inDebounce = true;
  debounceHandleCellUpdate(appState.refreshCounter, appState.populatingPage);
}

export function triggerSaveNeeded(pendingMathCellChange = false) {
  if (pendingMathCellChange) {
    appState.refreshCounter++;
    appState.inDebounce = true;
  }
  
  appState.unsavedChange = true;
  appState.autosaveNeeded = true;
}

const debounceHandleCellUpdate = debounce(handleCellUpdate, debounceTime);

async function handleCellUpdate(localRefreshCounter: BigInt, firstRunAfterSheetLoad: boolean) {
  if (localRefreshCounter !== appState.refreshCounter) {
    return;
  }
  const myRefreshCount = localRefreshCounter;
  appState.inDebounce = false;
  if(appState.noParsingErrors && !firstRunAfterSheetLoad) {
    // invalidate results if all math fields are valid (while editing current cell)
    // also, don't invalidate results if sheet was just loaded without modification (populatingPage === true)
    appState.resultsInvalid = true;
    appState.error = "";
  }
  await appState.pyodidePromise;
  appState.pyodideTimeout = false;
  if (myRefreshCount === appState.refreshCounter && appState.noParsingErrors) {
    const statementsAndSystemsObject = appState.cellListElement.getStatementsAndSystemsForPython()
    clearTimeout(pyodideTimeoutRef);
    pyodideTimeoutRef = window.setTimeout(() => appState.pyodideTimeout=true, pyodideTimeoutLength);
    if (!firstRunAfterSheetLoad) {
      appState.resultsInvalid = true;
      appState.error = "";
    }

    let neededPyodidePackages: Set<string> = new Set();
    if (statementsAndSystemsObject.fluidFunctions.length > 0) {
      neededPyodidePackages.add('coolprop');
    }
    if (statementsAndSystemsObject.interpolationFunctions.length > 0) {
      neededPyodidePackages.add('numpy');
    }
    if (statementsAndSystemsObject.interpolationFunctions
          .reduce((accum, value) => accum || (value.numInputs > 1), false)) {
      neededPyodidePackages.add('scipy');
    }
    if (statementsAndSystemsObject.interpolationFunctions
          .reduce((accum, value) => accum || (value.type === "polyfit" && value.numInputs > 1), false)) {
      neededPyodidePackages.add('scikit-learn');
    }

    for (const codeCellFunction of statementsAndSystemsObject.codeCellFunctions) {
      neededPyodidePackages = neededPyodidePackages.union(new Set(codeCellFunction.neededPyodidePackages));
    }

    appState.pyodidePromise = getResults(statementsAndSystemsObject,
                                myRefreshCount, [...neededPyodidePackages])
    .then((data: Results) => {
      clearResults();
      appState.resultsInvalid = false;
      if (!data.error && data.results.length > 0) {
        let counter = 0;
        for (const [i, cell] of appState.cells.entries()) {
          if ((cell.type === "math" || cell.type === "plot" || cell.type === "dataTable") ) {
            appState.results[i] = data.results[counter++];
          } else {
            appState.results[i] = null;
          }
        }
        while(counter < data.results.length) {
          const currentResult = data.results[counter++];
          if ("isSubResult" in currentResult && currentResult.isSubResult) {
            appState.sub_results.set(currentResult.subQueryName, currentResult);
          }
        }
      }
      appState.error = data.error;
      appState.system_results = [];
      let counter = 0;
      for (const [i, cell] of appState.cells.entries()) {
        if (cell.type === "system") {
          appState.system_results[i] = data.systemResults[counter++]
        } else {
          appState.system_results[i] = null;
        }
      }
      if (!firstRunAfterSheetLoad) {
        appState.autosaveNeeded = true;
      }
      appState.codeCellResults = data.codeCellResults ?? {};
    })
    .catch((errorMessage) => appState.error=errorMessage);
  }
}

function getResults(statementsAndSystems: StatementsAndSystems, myRefreshCount: BigInt, 
                    neededPyodidePackages: string[]) {
  return new Promise<Results>((resolve, reject) => {
    function handleWorkerMessage(e) {
      appState.forcePyodidePromiseRejection = null;
      if (e.data === "pyodide_not_available") {
        // pyodide didn't load properly
        reject("Pyodide failed to load.");
      } else if (e.data === "max_recursion_exceeded") {
        reject("Max recursion depth exceeded.")
      } else {

        if (myRefreshCount !== appState.refreshCounter) {
          reject("Stale solution, re-solving. If this message persists, make an edit to trigger a recalculation.");
        } else {
          resolve(e.data);
        }
      }
    }
    appState.forcePyodidePromiseRejection = () => reject("Restarting pyodide.")
    appState.pyodideWorker.onmessage = handleWorkerMessage;
    appState.pyodideWorker.postMessage({
      cmd: 'sheet_solve',
      data: $state.snapshot(statementsAndSystems),
      neededPyodidePackages
    });
  });
}

export function dataTableToSelectorTable(index: number, dataTableData: DatabaseDataTableCell) {
  let newCells: Cell[];
  let newResults: (Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[])[];
  let newSystemResults: SystemResult[];

  newCells = [...appState.cells.slice(0,index), new TableCell(dataTableData), ...appState.cells.slice(index+1)];
  newResults = [...appState.results.slice(0,index), null, ...appState.results.slice(index+1)];
  newSystemResults = [...appState.system_results.slice(0,index), null, ...appState.system_results.slice(index+1)];

  if (appState.activeCell >= newCells.length) {
    appState.activeCell = newCells.length-1;
  }

  appState.cells = newCells;
  appState.results = newResults;
  appState.system_results = newSystemResults;

  appState.resultsInvalid = true; 
}

export function restoreDataTable(index: number, dataTableData: DatabaseDataTableCell) {
  let newCells: Cell[];
  let newResults: (Result | FiniteImagResult | MatrixResult | DataTableResult | RenderResult | PlotResult[])[];
  let newSystemResults: SystemResult[];

  newCells = [...appState.cells.slice(0,index), new DataTableCell(dataTableData), ...appState.cells.slice(index+1)];
  newResults = [...appState.results.slice(0,index), null, ...appState.results.slice(index+1)];
  newSystemResults = [...appState.system_results.slice(0,index), null, ...appState.system_results.slice(index+1)];

  if (appState.activeCell >= newCells.length) {
    appState.activeCell = newCells.length-1;
  }

  appState.cells = newCells;
  appState.results = newResults;
  appState.system_results = newSystemResults;

  appState.resultsInvalid = true;
}

DOMPurify.addHook('afterSanitizeAttributes', function(node) {
  if (node.nodeName === 'use' && node.hasAttribute('xlink:href')) {
    // Allow internal references that begin with a hash
    if (!node.getAttribute('xlink:href')?.startsWith('#')) {
      node.removeAttribute('xlink:href');
    }
  }
});
export { DOMPurify };

