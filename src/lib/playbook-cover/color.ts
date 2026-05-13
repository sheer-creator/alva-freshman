// color.ts — color math + FNV-1a hash + textBase derivation
// Pure functions; no runtime deps. Works in any JS environment.

import { RGB, HSL, TextPalette } from "./types";

// ---------- FNV-1a (32-bit) ----------

/**
 * FNV-1a 32-bit hash of a UTF-16 code-unit sequence.
 * Deterministic: same string always yields the same uint32.
 * Used to pick a bg hue slot inside a template's range.
 */
export function fnv1a(str: string): number {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = (h ^ str.charCodeAt(i)) >>> 0;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

// ---------- HSL ⇄ RGB ----------

/**
 * Convert HSL (H in 0..360, S/L in 0..1) to RGB (each 0..1).
 * Figma's plugin API uses RGB in 0..1, so the output plugs in directly.
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  h = (((h % 360) + 360) % 360) / 360;
  if (s === 0) return { r: l, g: l, b: l };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return { r: hue2rgb(h + 1 / 3), g: hue2rgb(h), b: hue2rgb(h - 1 / 3) };
}

/**
 * Convert RGB (each 0..1) to HSL (H in 0..360, S/L in 0..1).
 * Inverse of hslToRgb for round-tripping.
 */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return { H: h, S: s, L: l };
}

// ---------- Hex ⇄ RGB ----------

export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const full = h.length === 3
    ? h.split("").map((c) => c + c).join("")
    : h;
  const n = parseInt(full, 16);
  return {
    r: ((n >> 16) & 0xff) / 255,
    g: ((n >> 8) & 0xff) / 255,
    b: (n & 0xff) / 255,
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const to = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255)
    .toString(16).padStart(2, "0");
  return "#" + to(r) + to(g) + to(b);
}

// ---------- Paper-weight clamp ----------

/**
 * Clamp an HSL to the Alva paper-weight regime: L ≥ 0.92, S ≤ 0.28.
 * H is untouched (H can be any value).
 */
export function clampPaperRegime({ H, S, L }: HSL): HSL {
  return { H, S: Math.min(S, 0.28), L: Math.max(L, 0.92) };
}

// ---------- textBase derivation ----------

/**
 * Derive a deep tinted text color from the bg hue.
 * The SAME hue as bg — saturated up, lightness dropped — ties text into
 * the card's color family.
 *
 *   textS = min(bgS + 0.20, 0.45)
 *   textL = max(bgL − 0.70, 0.18)
 */
export function textBaseFor({ H, S, L }: HSL): RGB {
  const textS = Math.min(S + 0.20, 0.45);
  const textL = Math.max(L - 0.70, 0.18);
  return hslToRgb(H, textS, textL);
}

/**
 * Build the full text palette from the bg HSL.
 * Each role is the base color at its standard opacity.
 */
export function deriveTextPalette(bgHsl: HSL): TextPalette {
  const base = textBaseFor(bgHsl);
  return {
    base,
    hero:    applyOpacity(base, 0.92),
    support: applyOpacity(base, 0.70),
    label:   applyOpacity(base, 0.55),
  };
}

/**
 * Pre-multiply RGB by opacity (for debug/preview; Figma fills should
 * carry the opacity on the fill object itself rather than pre-multiplying).
 */
function applyOpacity({ r, g, b }: RGB, a: number): RGB {
  return { r: r * a + (1 - a), g: g * a + (1 - a), b: b * a + (1 - a) };
}

// ---------- Alpha-on-white brand blend ----------

/**
 * Blend a brand color with white at a given alpha.
 * Used for Layer 1b bg: top stop at alpha 0.18, bottom stop at alpha 0.38.
 */
export function alphaOnWhite(brand: RGB, alpha: number): RGB {
  return {
    r: brand.r * alpha + (1 - alpha),
    g: brand.g * alpha + (1 - alpha),
    b: brand.b * alpha + (1 - alpha),
  };
}

// ---------- Distribution-bar color (what-if) ----------

/**
 * Circular shortest-arc hue blend. Linear hue interpolation fails for
 * far-apart hues (e.g., red 5° toward blue 211° by 30% lands at yellow 66°).
 * Circular interp always follows the shortest arc around the color wheel,
 * preserving the source hue's identity.
 *
 *   t=0: pure a;  t=1: pure b;  t=0.2: 20% toward b along the shortest path
 */
export function blendHue(a: number, b: number, t: number): number {
  const diff = (((b - a + 540) % 360) - 180);  // signed shortest delta, −180..180
  return (((a + diff * t) % 360) + 360) % 360;
}

/**
 * Bar color: circular blend of semantic hue (145° green / 5° red) toward
 * bg hue by 20%, with muted S/L + opacity 0.55. Red stays red, green
 * stays green, family coherence preserved.
 *
 *   mixedH = blendHue(semH, bgH, 0.20)
 *   fill   = { color: hslToRgb(mixedH, 0.38, 0.55), opacity: 0.55 }
 */
export function barColorFor(bgH: number, isPositive: boolean): RGB {
  const semH = isPositive ? 145 : 5;
  const mixedH = blendHue(semH, bgH, 0.20);
  return hslToRgb(mixedH, 0.38, 0.55);
}

/** Opacity for bar fills — 0.55 gives atmospheric weight without losing signal. */
export const BAR_OPACITY = 0.55;

// ---------- Icon color (non-brand) ----------

/**
 * Derive a subtle bg-derived icon color: same hue, same saturation, slightly
 * lower lightness. Full opacity (NEVER semi-transparent — transparency reads
 * as "dirty" on Alva bgs).
 */
export function iconColorFor({ H, S, L }: HSL): RGB {
  return hslToRgb(H, S, Math.max(L - 0.08, 0.80));
}

// ---------- HSL slot → hue angle ----------

/**
 * Map a 0..11 slot index to a hue angle within a template's range.
 *   H = baseH + (slot / 11 − 0.5) × range × 2
 * Spread across 12 slots evenly inside [baseH − range, baseH + range].
 */
export function slotToHue(slot: number, baseH: number, range: number): number {
  return baseH + (slot / 11 - 0.5) * range * 2;
}

/**
 * CSS color helper — RGB (0..1) → `rgb()` / `rgba()` string. Kept here so
 * consumers across the app can use the same color math without importing
 * a second utility module.
 */
export function rgbToCss({ r, g, b }: RGB, alpha = 1): string {
  const to = (x: number) => Math.round(x * 255);
  return alpha === 1
    ? `rgb(${to(r)}, ${to(g)}, ${to(b)})`
    : `rgba(${to(r)}, ${to(g)}, ${to(b)}, ${alpha})`;
}
