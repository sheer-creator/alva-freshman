// dimensions.ts — canonical cover geometry + typography constants.
// Renderers MUST import these instead of hardcoding the literal numbers.

// ---------- Cover canvas ----------

export const COVER_W = 320;
export const COVER_H = 140;

// ---------- Card frame ----------

export const CARD_W_DESIGN = 328;       // baseline (production min)
export const CARD_H_DESIGN = 302;
export const CARD_INSET    = 4;         // margin between card edge and cover edge
export const CARD_RADIUS   = 12;
export const COVER_RADIUS  = 8;

// ---------- Safe zone (foreground content bounds) ----------

export const SAFE_LEFT   = 28;
export const SAFE_RIGHT  = 292;
export const SAFE_TOP    = 20;
export const SAFE_BOTTOM = 120;
export const SAFE_W      = SAFE_RIGHT - SAFE_LEFT;     // 264
export const SAFE_H      = SAFE_BOTTOM - SAFE_TOP;     // 100

// ---------- Distribution-bars zone (what-if only) ----------

export const BARS_LEFT   = 184;
export const BARS_RIGHT  = 292;
export const BARS_W      = BARS_RIGHT - BARS_LEFT;     // 108
export const BAR_GAP     = 3;

// ---------- Responsive grid ----------

export const RESPONSIVE_SMALL = { minCardWidth: 260, maxCardWidth: 340, gap: 12 } as const;
export const RESPONSIVE_LARGE = { minCardWidth: 328, maxCardWidth: 400, gap: 12 } as const;

// ---------- Foreground container (Layer A) ----------

export const FG_X       = 28;
export const FG_Y       = 20;
export const FG_W       = 264;
export const FG_H       = 100;

// ---------- Layer A type-scale floors ----------

export const TYPE_FLOORS = {
  hero:  32,
  verb:  14,
  pulse: 22,
  delta: 14,
  label:  9,
} as const;

// ---------- Cover icon placement ----------

export const DEFAULT_ICON_GEOM = { x: 192, y: 22, size: 100 } as const;
export const WHATIF_ICON_GEOM  = { x: 240, y: 12, size: 64  } as const;

// ---------- Theme tokens (canonical exports) ----------
//
// All non-locale-dependent design tokens live here so renderer code has
// one obvious import path. Locale-dependent font stacks remain in i18n.ts
// (use `getCoverFontStack(locale)` + `fontStackToCss()` when locale matters).

import type { RGB } from "./types";

/** Default cover font-family CSS string (used when locale is unknown / Latin-only). */
export const FONT_FAMILY_COVER    = '"Delight", -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif';

/** Default metadata-frame font-family CSS string. */
export const FONT_FAMILY_METADATA = '"Inter", -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif';

/** Inter / Delight weights used across covers + metadata. */
export const FONT_WEIGHTS = {
  regular:  400,
  medium:   500,
  semiBold: 600,
  bold:     700,
} as const;

/** Em-units letter-spacing for tracked caps small. 0 elsewhere. */
export const TRACKED_CAPS = 0.16;

/** Resolved RGB for the thesis category-badge dot. Locale-independent. */
export const CATEGORY_COLORS: Record<"RISK" | "CATALYST" | "AMBIGUOUS", RGB> = {
  RISK:      { r: 0.86, g: 0.15, b: 0.15 },   // ~#DC2626
  CATALYST:  { r: 0.09, g: 0.64, b: 0.29 },   // ~#16A34A
  AMBIGUOUS: { r: 0.85, g: 0.47, b: 0.02 },   // ~#D97706
};
