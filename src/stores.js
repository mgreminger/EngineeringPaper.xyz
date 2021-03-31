import { writable } from 'svelte/store';

export const cells = writable([]);
export const activeCell = writable(0);
export const activeCellFlowDown = writable(false);
export const results = writable([]);
export const debug = writable(false);