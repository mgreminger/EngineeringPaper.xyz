import { type Writable, writable, type Readable, readable, get } from 'svelte/store';

import type { Cell } from './cells/Cells';
import { BaseCell, type CellTypes } from './cells/BaseCell';
import MathCell from './cells/MathCell';
import DocumentationCell from './cells/DocumentationCell';
import TableCell from './cells/TableCell';
import type {MathField} from './cells/MathField';
import PiecewiseCell from './cells/PiecewiseCell';
import SystemCell from './cells/SystemCell';
import PlotCell from './cells/PlotCell';
import DeletedCellClass from "./cells/DeletedCell";
import InsertCell from "./cells/InsertCell";

import type { History } from './database/types';
import type { Result, FiniteImagResult, PlotResult } from './parser/resultTypes';

const defaultTitle = 'New Sheet';

export const cells: Writable<Cell[]> = writable([]);
export const title = writable(defaultTitle);
export const results: Writable<(Result | FiniteImagResult | PlotResult[])[]> = writable([]);
export const system_results = writable([]);
export const sheetId = writable('');


export const history: Writable<History> = writable([]);
export const insertedSheets = writable([]);


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


export function addCell(type: CellTypes, index?: number) {
  const currentCells:Cell[] = get(cells);
  const current_system_results:any[] = get(system_results);

  if (index === undefined){
    index = currentCells.length;
  }

  let newCell: TableCell | MathCell | DocumentationCell | PiecewiseCell | SystemCell |
               PlotCell | InsertCell;

  if (type === "math") {
    newCell = new MathCell;
  } else if (type === "documentation") {
    newCell = new DocumentationCell;
  } else if (type === "table") {
    newCell = new TableCell;
  } else if (type === "piecewise") {
    newCell = new PiecewiseCell;
  } else if (type === "system") {
    newCell = new SystemCell;
  } else if (type === "plot") {
    newCell = new PlotCell;
  } else if (type === "insert") {
    newCell = new InsertCell;
  } else {
    throw new Error(`Attempt to insert uninsertable cell type ${type}`);
  }

  currentCells.splice(index, 0, newCell);

  cells.set(currentCells);

  results.set([]);

  // Adding a cell cannot impact existing system cell results so adjust system_results array accordingly
  current_system_results.splice(index, 0, null);
  system_results.set(current_system_results);

  activeCell.set(index);

  if (type === "documentation" || type === "table") {
    mathCellChanged.set(true); // results will be cleared so force refresh
  }

}

export function handleClickInCell(index: number) {
  const currentInCellInsertMode = get(inCellInsertMode);
  const currentActiveCell = get(activeCell);

  if (currentActiveCell !== index && !currentInCellInsertMode)
    activeCell.set(index);
}

export function getSheetObject(includeResults=true) {
  return {
    cells: get(cells).map(x => x.serialize()).filter(item => item !== null),
    title: get(title),
    results: includeResults ? get(results) : [],
    system_results: includeResults ? get(system_results) : [],
    nextId: BaseCell.nextId,
    sheetId: get(sheetId),
    insertedSheets: get(insertedSheets)
  };
}

export function getSheetJson() {
  const sheet = getSheetObject();

  return ' ' + JSON.stringify(sheet);
}

export function resetSheet() {
  cells.set([]);
  title.set(defaultTitle);
  results.set([]);
  system_results.set([]);
  BaseCell.nextId = 0;
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
    activeCell.set(0);
  }
}

export function deleteCell(index: number, forceDelete=false) {
  const currentCells = get(cells);
  const currentActiveCell = get(activeCell);
  
  let newCells: Cell[];

  if (currentCells[index].type !== "deleted" && 
      currentCells[index].type !== "insert" &&
      !forceDelete) {
    newCells = [...currentCells.slice(0,index), new DeletedCellClass(currentCells[index]), ...currentCells.slice(index+1)];
  } else {
    // user comfirming delete of an undo delete cell or a insert cell
    newCells = [...currentCells.slice(0,index), ...currentCells.slice(index+1)];
  }

  if (currentActiveCell >= newCells.length) {
    activeCell.set(newCells.length-1);
  }

  cells.set(newCells);
  results.set([]);
  mathCellChanged.set(true);
}
