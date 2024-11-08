import { writable } from 'svelte/store';
import type { CursorEffectResult } from 'cursor-effects';

// Determines whether the cursor should have the trailing effect or not in the entire app
export const useTrailingCursor = writable(false);
let emojiFxValue: CursorEffectResult | undefined;
export const emojiFx = writable(emojiFxValue);