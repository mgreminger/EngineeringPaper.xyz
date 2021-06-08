import { writable, get } from 'svelte/store';

const defaultTitle = 'New Sheet';

export const cells = writable([]);
export const title = writable(defaultTitle);
export const results = writable([]);
export const nextId = writable(0);

export const history = writable([]);

export const activeCell = writable(0);
export const activeCellFlowDown = writable(false);

export const debug = writable(false);

export function handleFocusIn(index) {
  const previousActiveCell = get(activeCell);
  activeCell.set(index);

  if ((index - previousActiveCell) !== 0) {
    activeCellFlowDown.set((index - previousActiveCell) > 0 ? true : false);
  }
}

export function getSheetJson() {

  const sheet = {
    cells: get(cells).map(x => x.data),
    title: get(title),
    results: get(results),
    nextId: get(nextId),
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
  activeCellFlowDown.set(false);
}