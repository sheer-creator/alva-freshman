// palette.ts — per-template HSL bands
// Single source of truth for bg color ranges per template.

import { Palette } from "./types";

export const PALETTE: Palette = {
  screener: {
    baseH: 170,   // cool teal center
    range:  35,   // ±35° (slots 0..11 span 135°..205°)
    S: 0.24,
    L: 0.94,
  },
  thesis: {
    baseH:  40,   // warm earth center
    range:  30,   // ±30° (slots span 10°..70°)
    S: 0.26,
    L: 0.95,
  },
  "what-if": {
    baseH: 218,   // cool slate-blue center
    range:  25,   // ±25° (slots span 193°..243°)
    S: 0.22,
    L: 0.94,
  },
  general: {
    baseH:   0,
    range: 180,   // any hue allowed (H effectively unconstrained)
    S: 0.06,      // but at S=0.06, even pure hues read as near-neutral
    L: 0.96,
  },
};

/**
 * Per-template ink color (used when a cover needs a deterministic reference
 * color for non-hue-derived elements like semantic badges). This is the
 * rgbToHsl(L=0.25) value at each template's baseH — i.e., the "anchor ink"
 * for that template family.
 */
export const TEMPLATE_INK: Record<keyof Palette, string> = {
  screener: "#0E493C",   // teal @ L 0.25
  thesis:   "#38291C",   // warm near-black
  "what-if":"#1B2F4A",   // cool near-black
  general:  "#1A1A1A",   // neutral
};
