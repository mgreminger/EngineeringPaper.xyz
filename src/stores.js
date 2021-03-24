import { writable } from 'svelte/store';

export const cells = writable([]);
export const results = writable([]);
export const debug = writable(false);
export const cellInstances = writable([]);