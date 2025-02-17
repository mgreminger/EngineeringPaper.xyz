import { SvelteMap } from 'svelte/reactivity';

import { get as idbGet } from 'idb-keyval';

import type { Cell } from './cells/Cells';
import { BaseCell, type CellTypes } from './cells/BaseCell';
import MathCell from './cells/MathCell.svelte';
import DocumentationCell from './cells/DocumentationCell.svelte';
import TableCell from './cells/TableCell.svelte';
import DataTableCell from './cells/DataTableCell.svelte';
import type {MathField} from './cells/MathField.svelte';
import PiecewiseCell from './cells/PiecewiseCell.svelte';
import SystemCell from './cells/SystemCell.svelte';
import FluidCell from './cells/FluidCell.svelte';
import PlotCell from './cells/PlotCell.svelte';
import DeletedCellClass from "./cells/DeletedCell";
import InsertCell from "./cells/InsertCell";

import type { History } from './database/types';
import type { Result, FiniteImagResult, PlotResult, 
              MatrixResult, SystemResult, DataTableResult } from './resultTypes';
import { type Config, type InsertedSheet, type Sheet, getDefaultConfig, normalizeConfig } from './sheet/Sheet';

const defaultTitle = 'New Sheet';

type AppState = {
  unsavedChange: boolean;
  autosaveNeeded: boolean;

  config: Config;
  cells: Cell[];
  title: string,
  results: (Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[] | null)[];
  system_results: SystemResult[] | null;
  sub_results: Map<string,(Result | FiniteImagResult | MatrixResult)>;
  resultsInvalid: boolean;
  sheetId: string;
  insertedSheets: InsertedSheet[];

  history: History;

  prefersReducedMotion: boolean;
  activeCell: number;
  activeMathField: MathField | null;

  debug: boolean;

  modifierKey: "ctrlKey" | "metaKey";

  onMobile: boolean;

  inCellInsertMode: boolean;

  mathJaxLoaded: boolean;
}

const appState: AppState = $state<AppState>({
  unsavedChange: false,
  autosaveNeeded: false,

  config: getDefaultConfig(),
  cells: [],
  title: defaultTitle,
  results: [],
  system_results: [],
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

  mathJaxLoaded: false,
});

export default appState;

export async function addCell(type: CellTypes, index?: number) {
  if (index === undefined){
    index = appState.cells.length;
  }

  let newCell: TableCell | MathCell | DocumentationCell | PiecewiseCell | SystemCell |
               PlotCell | InsertCell | FluidCell | DataTableCell;

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
  } else {
    throw new Error(`Attempt to insert uninsertable cell type ${type}`);
  }

  appState.cells.splice(index, 0, newCell);

  appState.results.splice(index, 0, null);

  appState.system_results.splice(index, 0, null);

  appState.activeCell = index;
}

export function handleClickInCell(index: number) {
  if (appState.activeCell !== index && !appState.inCellInsertMode)
    appState.activeCell = index;
}

export function getSheetObject(includeResults=true): Sheet {
  return {
    config: appState.config,
    cells: appState.cells.map(x => x.serialize()).filter(item => item !== null),
    title: appState.title,
    results: includeResults ? (appState.resultsInvalid ? [] : appState.results) : [],
    system_results: includeResults ? appState.system_results : [],
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
  let newResults: (Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[])[];
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
