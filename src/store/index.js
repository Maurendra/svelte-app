import { writable, get } from "svelte/store";

const auth = writable(null);

export { auth };
