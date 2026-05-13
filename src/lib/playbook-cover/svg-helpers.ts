// svg-helpers.ts — small utilities for rendering CoverOutput content into SVG.
//
// These exist to make production renderers as thin as possible. Instead of
// each consumer reinventing "split text on \n into <tspan> lines", import
// `tspanLines()` and map over its output.

// ---------- text → tspan lines ----------

export type TspanLine = {
  /** Text for one line (no `\n`). */
  text: string;
  /** Same x as the parent <text> element — must be set on each <tspan> or
   *  later lines drift right of the first. */
  x: number;
  /** Vertical offset from the previous line's baseline. 0 for the first
   *  line; lineHeight for subsequent lines. Apply as `dy` on <tspan>. */
  dy: number;
};

/**
 * Split a multi-line content string (with embedded `\n`) into per-tspan
 * specs. Use as:
 *
 *   <text x={c.x} y={c.y} fontSize={c.fontSize}
 *         dominantBaseline="hanging" fill={fill}>
 *     {tspanLines(c.text, c.x, c.lineHeight ?? c.fontSize * 1.22).map((l, i) => (
 *       <tspan key={i} x={l.x} dy={l.dy}>{l.text}</tspan>
 *     ))}
 *   </text>
 *
 * This is the missing piece in many SVG renderers — without per-line
 * tspans, `<text>` ignores `\n` and renders one wide line that overflows
 * the safe zone. `splitDelta()` (in cover-gen.ts) already inserts `\n`
 * at the right place; `tspanLines()` is what gets it onto the screen.
 */
export function tspanLines(text: string, x: number, lineHeight: number): TspanLine[] {
  const lines = (text ?? "").split("\n");
  return lines.map((line, i) => ({
    text: line,
    x,
    dy: i === 0 ? 0 : lineHeight,
  }));
}

// ---------- RGB → CSS string ----------

import { RGB } from "./types";

/**
 * Convert a CoverOutput RGB (0..1 channels) to a CSS color string.
 * Supports an optional opacity to produce `rgba(...)`.
 *
 *   <stop stopColor={rgbCss(output.bg.top)} />
 *   <text fill={rgbCss(output.icon.color, output.icon.opacity)} />
 */
export function rgbCss(rgb: RGB, opacity?: number): string {
  const r = Math.round(Math.max(0, Math.min(1, rgb.r)) * 255);
  const g = Math.round(Math.max(0, Math.min(1, rgb.g)) * 255);
  const b = Math.round(Math.max(0, Math.min(1, rgb.b)) * 255);
  if (typeof opacity === "number" && opacity < 1) {
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
