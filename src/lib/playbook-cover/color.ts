// Pure color math + FNV-1a hash + textBase derivation.
// Mirror of skills/alva-cover-generation/src/color.ts.

import type { RGB, HSL, TextPalette } from "./types";

export function fnv1a(str: string): number {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = (h ^ str.charCodeAt(i)) >>> 0;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

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

export function clampPaperRegime({ H, S, L }: HSL): HSL {
  return { H, S: Math.min(S, 0.28), L: Math.max(L, 0.92) };
}

export function textBaseFor({ H, S, L }: HSL): RGB {
  const textS = Math.min(S + 0.20, 0.45);
  const textL = Math.max(L - 0.70, 0.18);
  return hslToRgb(H, textS, textL);
}

export function deriveTextPalette(bgHsl: HSL): TextPalette {
  const base = textBaseFor(bgHsl);
  return {
    base,
    hero: base,    // opacity applied at render time
    support: base,
    label: base,
  };
}

export function blendHue(a: number, b: number, t: number): number {
  const diff = (((b - a + 540) % 360) - 180);
  return (((a + diff * t) % 360) + 360) % 360;
}

export function barColorFor(bgH: number, isPositive: boolean): RGB {
  const semH = isPositive ? 145 : 5;
  const mixedH = blendHue(semH, bgH, 0.20);
  return hslToRgb(mixedH, 0.38, 0.55);
}

export function heroColorFor(bgH: number, isPositive: boolean): RGB {
  // Hero number: signed semantic, lightly bg-tinted via 15% circular blend.
  const semH = isPositive ? 145 : 5;
  const mixedH = blendHue(semH, bgH, 0.15);
  return isPositive
    ? hslToRgb(mixedH, 0.50, 0.30)   // deep green
    : hslToRgb(mixedH, 0.60, 0.38);  // punchy red
}

export function iconColorFor({ H, S, L }: HSL): RGB {
  return hslToRgb(H, S, Math.max(L - 0.08, 0.80));
}

export function slotToHue(slot: number, baseH: number, range: number): number {
  return baseH + (slot / 11 - 0.5) * range * 2;
}

export function rgbToCss({ r, g, b }: RGB, opacity = 1): string {
  const to = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);
  return opacity === 1
    ? `rgb(${to(r)}, ${to(g)}, ${to(b)})`
    : `rgba(${to(r)}, ${to(g)}, ${to(b)}, ${opacity})`;
}

/** Parse "#RRGGBB" or "#RGB" into 0..1 RGB. */
export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return {
    r: ((n >> 16) & 0xff) / 255,
    g: ((n >> 8) & 0xff) / 255,
    b: (n & 0xff) / 255,
  };
}

/** Blend a brand color with white at a given alpha (0..1). Layer 1b bg path. */
export function alphaOnWhite(brand: RGB, alpha: number): RGB {
  return {
    r: brand.r * alpha + (1 - alpha),
    g: brand.g * alpha + (1 - alpha),
    b: brand.b * alpha + (1 - alpha),
  };
}
