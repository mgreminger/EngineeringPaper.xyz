import { type Writable, writable, type Readable, readable, get } from 'svelte/store';
import { get as idbGet } from 'idb-keyval';

import type { Cell } from './cells/Cells';
import { BaseCell, type CellTypes } from './cells/BaseCell';
import MathCell from './cells/MathCell';
import DocumentationCell from './cells/DocumentationCell';
import TableCell from './cells/TableCell';
import DataTableCell from './cells/DataTableCell';
import type {MathField} from './cells/MathField';
import PiecewiseCell from './cells/PiecewiseCell';
import SystemCell from './cells/SystemCell';
import FluidCell from './cells/FluidCell';
import PlotCell from './cells/PlotCell';
import DeletedCellClass from "./cells/DeletedCell";
import InsertCell from "./cells/InsertCell";

import type { History } from './database/types';
import type { Result, FiniteImagResult, PlotResult, 
              MatrixResult, SystemResult, DataTableResult } from './resultTypes';
import { type Config, type InsertedSheet, type Sheet, getDefaultConfig, normalizeConfig } from './sheet/Sheet';

const defaultTitle = 'New Sheet';

export const unsavedChange = writable(false);
export const autosaveNeeded = writable(false);

export const config = writable(getDefaultConfig());
export const cells: Writable<Cell[]> = writable([]);
export const title = writable(defaultTitle);
export const results: Writable<(Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[] | null)[]> = writable([]);
export const system_results: Writable<SystemResult[] | null> = writable([]);
export const sub_results: Writable<Map<string,(Result | FiniteImagResult | MatrixResult)>> = writable(new Map()); 
export const resultsInvalid = writable(false);
export const sheetId = writable('');
export const insertedSheets: Writable<InsertedSheet[]> = writable([]);

export const history: Writable<History> = writable([]);

export const prefersReducedMotion = writable(true);
export const activeCell: Writable<number> = writable(-1);
export const activeMathField: Writable<MathField | null> = writable(null);

export const debug = writable(false);

export const mathCellChanged = writable(false);
export const nonMathCellChanged = writable(false);

export const modifierKey: Readable<"ctrlKey" | "metaKey"> =
  readable(/Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "metaKey" : "ctrlKey");

export const onMobile = readable(navigator.userAgent.includes('Mobi'));

export const inCellInsertMode = writable(false);

export const mathJaxLoaded = writable(false);

export async function addCell(type: CellTypes, index?: number) {
  const currentCells = get(cells);
  const currentResults = get(results);
  const currentSystemResults = get(system_results);

  if (index === undefined){
    index = currentCells.length;
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
    newCell = new FluidCell(get(config).fluidConfig);
  } else {
    throw new Error(`Attempt to insert uninsertable cell type ${type}`);
  }

  currentCells.splice(index, 0, newCell);
  cells.set(currentCells);

  currentResults.splice(index, 0, null);
  results.set(currentResults);

  currentSystemResults.splice(index, 0, null);
  system_results.set(currentSystemResults);

  activeCell.set(index);

  mathCellChanged.set(true);
}

export function handleClickInCell(index: number) {
  const currentInCellInsertMode = get(inCellInsertMode);
  const currentActiveCell = get(activeCell);

  if (currentActiveCell !== index && !currentInCellInsertMode)
    activeCell.set(index);
}

export function getSheetObject(includeResults=true): Sheet {
  return {
    config: get(config),
    cells: get(cells).map(x => x.serialize()).filter(item => item !== null),
    title: get(title),
    results: includeResults ? (get(resultsInvalid) ? [] : get(results)) : [],
    system_results: includeResults ? get(system_results) : [],
    sub_results: includeResults ? [...get(sub_results).entries()] : [],
    nextId: BaseCell.nextId,
    sheetId: get(sheetId),
    insertedSheets: get(insertedSheets)
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

  config.set(defaultConfig);
  cells.set([]);
  title.set(defaultTitle);
  results.set([]);
  resultsInvalid.set(true);
  system_results.set([]);
  sub_results.set(new Map());
  BaseCell.nextId = 0;
  DataTableCell.nextParameterId = 1;
  DataTableCell.nextInterpolationDefId = 1;
  DataTableCell.nextPolyfitDefId = 1;
  history.set([]);
  insertedSheets.set([]);
  activeCell.set(0);
  sheetId.set(window.crypto.randomUUID());
}


export function incrementActiveCell() {
  const currentCells = get(cells);
  const currentActiveCell = get(activeCell);

  if (currentActiveCell !== -1) {
    if (currentActiveCell < currentCells.length -1 ) {
      activeCell.set(currentActiveCell+1);
    }
  } else if (currentCells.length > 0) {
    activeCell.set(0);
  }
}


export function decrementActiveCell() {
  const currentCells = get(cells);
  const currentActiveCell = get(activeCell);

  if (currentActiveCell !== -1) {
    if (currentActiveCell > 0 ) {
      activeCell.set(currentActiveCell-1);
    }
  } else if (currentCells.length > 0) {
    activeCell.set(currentCells.length-1);
  }
}

export function deleteCell(index: number, forceDelete=false) {
  const currentCells = get(cells);
  const currentResults = get(results);
  const currentSystemResults = get(system_results);
  const currentActiveCell = get(activeCell);
  
  let newCells: Cell[];
  let newResults: (Result | FiniteImagResult | MatrixResult | DataTableResult | PlotResult[])[];
  let newSystemResults: SystemResult[];

  if (currentCells[index].type !== "deleted" && 
      currentCells[index].type !== "insert" &&
      !forceDelete) {
    
    const contentDiv = document.getElementById(`cell-${index}`);
    let height = 0;
    if (contentDiv) {
      height = contentDiv.getBoundingClientRect().height;
    }

    newCells = [...currentCells.slice(0,index), new DeletedCellClass(currentCells[index], height), ...currentCells.slice(index+1)];
    newResults = [...currentResults.slice(0,index), null, ...currentResults.slice(index+1)];
    newSystemResults = [...currentSystemResults.slice(0,index), null, ...currentSystemResults.slice(index+1)];
  } else {
    // user comfirming delete of an undo delete cell or a insert cell
    newCells = [...currentCells.slice(0,index), ...currentCells.slice(index+1)];
    newResults = [...currentResults.slice(0,index), ...currentResults.slice(index+1)];
    newSystemResults = [...currentSystemResults.slice(0,index), ...currentSystemResults.slice(index+1)];
  }

  if (currentActiveCell >= newCells.length) {
    activeCell.set(newCells.length-1);
  }

  cells.set(newCells);
  results.set(newResults);
  system_results.set(newSystemResults);

  resultsInvalid.set(true);

  mathCellChanged.set(true);
}
