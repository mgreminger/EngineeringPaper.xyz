import { writable, get } from 'svelte/store';

const defaultTitle = 'New Sheet';

export const cells = writable([]);
export const title = writable(defaultTitle);
export const results = writable([]);
export const nextId = writable(0);
export const sheetId = writable('');

export const history = writable([]);

export const prefersReducedMotion = writable(true);
export const activeCell = writable(0);

export const debug = writable(false);


export function addMathCell(index) {
  addCell(index, "math");
}

export function addDocumentationCell(index) {
  addCell(index, "documentation");
}


function addCell(index, type) {
  const currentCells = get(cells);

  if (index == null){
    index = currentCells.length;
  }

  let newCell;

  if (type === "math") {
    newCell = {data: {type: "math", id: get(nextId), latex: ""},
               extra: {parsingError: true, statement: null, mathFieldInstance: null}};
  } else if (type === "documentation") {
    newCell = {data: {type: "documentation", id: get(nextId), json: ""},
               extra: {richTextInstance: null}};
  } else {
    throw new Error(`Unrecognized cell type: ${type}`);
  }

  nextId.update(id => id + 1);

  currentCells.splice(index, 0, newCell);

  cells.set(currentCells);

  results.set([]);
  activeCell.set(index);
}


export function handleFocusIn(index) {
  activeCell.set(index);
}

export function getSheetJson() {

  const sheet = {
    cells: get(cells).map(x => x.data),
    title: get(title),
    results: get(results),
    nextId: get(nextId),
    sheetId: get(sheetId)
  };

  return ' ' + JSON.stringify(sheet);
}

export function resetSheet() {
  cells.set([]);
  title.set(defaultTitle);
  results.set([]);
  nextId.set(0);
  history.set([]);
  activeCell.set(0);
  sheetId.set(JSON.stringify(window.crypto.getRandomValues(new Uint32Array(10))));
}