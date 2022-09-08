import { type Writable, writable, get } from 'svelte/store';

import type { Cell } from './Cells';
import { BaseCell } from './BaseCell';
import MathCell from './MathCell';
import DocumentationCell from './DocumentationCell';
import TableCell from './TableCell';
import type {MathField} from './MathField';

const defaultTitle = 'New Sheet';

export const cells: Writable<Cell[]> = writable([]);
export const title = writable(defaultTitle);
export const results = writable([]);
export const sheetId = writable('');


export const history = writable([]);
export const insertedSheets = writable([]);


export const prefersReducedMotion = writable(true);
export const activeCell: Writable<number> = writable(0);

export const debug = writable(false);

export const mathCellChanged = writable(false);


export function addCell(type: "math" | "documentation" | "table", index?: number) {
  const currentCells:Cell[] = get(cells);

  if (index === undefined){
    index = currentCells.length;
  }

  let newCell: TableCell | MathCell | DocumentationCell;

  if (type === "math") {
    newCell = new MathCell;
  } else if (type === "documentation") {
    newCell = new DocumentationCell;
  } else if (type === "table") {
    newCell = new TableCell;
  }

  currentCells.splice(index, 0, newCell);

  cells.set(currentCells);

  results.set([]);

  if (type !== "table") {
    activeCell.set(index);
  } else {
    activeCell.set(-1);
  }

  if (type === "documentation" || type === "table") {
    mathCellChanged.set(true); // results will be cleared so force refresh
  }

}

export function handleFocusIn(index: number) {
  const currentActiveCell = get(activeCell);

  if (currentActiveCell !== index)
    activeCell.set(index);
}

export function getSheetJson() {

  const sheet = {
    cells: get(cells).map(x => x.serialize()),
    title: get(title),
    results: get(results),
    nextId: BaseCell.nextId,
    sheetId: get(sheetId),
    insertedSheets: get(insertedSheets)
  };

  return ' ' + JSON.stringify(sheet);
}

export function resetSheet() {
  cells.set([]);
  title.set(defaultTitle);
  results.set([]);
  BaseCell.nextId = 0;
  history.set([]);
  insertedSheets.set([]);
  activeCell.set(0);
  sheetId.set(JSON.stringify(window.crypto.getRandomValues(new Uint32Array(10))));
}


export function handleVirtualKeyboard(event, mathFieldElement) {
  if (event.detail.write) {
    let command = event.detail.command;
    if (command.includes("[selection]")) {
      let selection = mathFieldElement.getMathField().getSelection();
      selection = selection === null ? "" : selection;
      command = command.replace("[selection]", selection);
    }
    mathFieldElement.getMathField().write(command);
  } else {
    mathFieldElement.getMathField().cmd(event.detail.command);
  }
  mathFieldElement.getMathField().focus();
  if ( event.detail.positionLeft ) {
    for (let i=0; i < event.detail.positionLeft; i++) {
      mathFieldElement.getMathField().keystroke("Left");
    }
  }
}


export function handleFocusOut(mathField: MathField) {
  const currentCells = get(cells);

  mathField.setPendingLatex();

  cells.set(currentCells);
}
