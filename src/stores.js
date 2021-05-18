import { writable, get } from 'svelte/store';

export const cells = writable([]);
export const activeCell = writable(0);
export const title = writable('New Sheet');
export const activeCellFlowDown = writable(false);
export const results = writable([]);
export const nextId = writable(0)

export const debug = writable(false);

export function handleFocusIn(index) {
  const previousActiveCell = get(activeCell);
  activeCell.set(index);

  if ((index - previousActiveCell) !== 0) {
    activeCellFlowDown.set((index - previousActiveCell) > 0 ? true : false);
  }
}