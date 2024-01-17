import { writable } from 'svelte/store';

// Create a store for tags, so we can cause the list to rerender when we create a new tag
export const tagsStore = writable([]);
