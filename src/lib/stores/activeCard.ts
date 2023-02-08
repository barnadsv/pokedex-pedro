import { writable, type Writable } from 'svelte/store'

export const activeCard: Writable<HTMLDivElement | undefined> = writable(undefined)