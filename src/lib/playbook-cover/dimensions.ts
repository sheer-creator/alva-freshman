// dimensions.ts — canonical cover geometry + typography constants.
// Renderers MUST import these instead of hardcoding the literal numbers.

// ---------- Cover canvas ----------
//
// 16:9 canvas (1.778). Update history:
//   2026-04 → 320×140 (2.29:1) — original Direction-D spec.
//   2026-05-09 → 320×180 (16:9) — adopted to match staging imagegen
//                output and unlock OG-image / share-preview reuse.
// COVER asset itself is square-cornered. Rounded corners are clipped
// by the outer card container at render time (Explore card 12px,
// hero detail 20px). Do NOT bake corner radius into the cover SVG.

export const COVER_W = 320;
export const COVER_H = 180;

// ---------- Card frame ----------

export const CARD_W_DESIGN = 328;       // baseline (production min)
export const CARD_H_DESIGN = 342;       // 302 + 40 (cover grew 140 → 180)
export const CARD_INSET    = 4;         // margin between card edge and cover edge
export const CARD_RADIUS   = 12;
export const COVER_RADIUS  = 0;         // corners clipped by container, not baked into cover

// ---------- Safe zone (foreground content bounds) ----------
//
// SAFE_H grew from 100 → 120 (16% taller content region) to match the
// taller canvas. Vertically centered: 30 px margin top + 30 px bottom.
// Per-template element y-coords proportionally rescaled from the
// original 320×140 spec via:
//   y_new = 30 + (y_old − 20) × 1.2
// Multi-line text blocks keep their fixed internal line-heights — only
// the block anchor is rescaled.

export const SAFE_LEFT   = 28;
export const SAFE_RIGHT  = 292;
export const SAFE_TOP    = 30;
export const SAFE_BOTTOM = 150;
export const SAFE_W      = SAFE_RIGHT - SAFE_LEFT;     // 264
export const SAFE_H      = SAFE_BOTTOM - SAFE_TOP;     // 120

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
export const FG_Y       = 30;
export const FG_W       = 264;
export const FG_H       = 120;

// ---------- Layer A type-scale floors ----------
//
// Hero / pulse / delta floors bumped to match the taller canvas. Big
// text grows ~1.22-1.25× to maintain visual weight in 320×180.

export const TYPE_FLOORS = {
  hero:  40,   // was 32 — bumped for 16:9 canvas
  verb:  14,
  pulse: 28,   // was 22 — bumped for 16:9 canvas
  delta: 18,   // was 14 — bumped for 16:9 canvas (delta body grew 18 → 22)
  label:  9,
} as const;

// ---------- Cover icon placement ----------
//
// Default icon scaled +20% (100→120) for the 16:9 canvas — the
// original 100×100 felt under-weighted on the taller cover. Frame
// right edge still pinned to SAFE_RIGHT=292; icon grows leftward.
// Frame fills the safe zone vertically (y=30 to y=150) — ghost-touches
// both edges; inner vector at the canonical 80% inset (96×96 at
// (184, 42)) keeps a 12-px buffer to the safe zone, well within the
// "main mass inside safe zone" rule.
//
// What-if icon stays at 64×64 corner-anchored, slightly above
// SAFE_TOP for the "floats past safe-zone top" aesthetic the spec
// calls out — that template's hero text is full-width so a smaller
// icon is correct there.

// Per-kind icon sizing. Brand glyphs (simpleicons) typically fill their
// viewBox 90-100%; Material Symbol glyphs typically fill only 60-70% of
// their viewBox. To equalize visible visual weight on the cover, brand
// icons use a smaller frame than Material Symbols.
//
// Right-edge alignment: frame right edge sits at x=304 (12 px past
// SAFE_RIGHT=292) so that the *inner-vector* right edge — and therefore
// the visible glyph right edge for brand-style icons that fill their
// viewBox — lands at 292. This makes the icon's right-side padding to
// the cover edge (320 − 292 = 28) symmetric with the left content's
// padding (SAFE_LEFT = 28). Frame ghost-touches past SAFE_RIGHT but
// the painted mass stays inside.
//
//   BRAND_ICON_GEOM:    frame 120, fills safe zone vertically (30-150)
//   MATERIAL_ICON_GEOM: frame 140, 10 px ghost-touch past SAFE_TOP/BOTTOM
//
// WHATIF_ICON_GEOM stays at 64×64 corner-anchored — what-if hero text
// is full-width so a smaller icon is correct there regardless of kind.

export const BRAND_ICON_GEOM    = { x: 184, y: 30, size: 120 } as const;
export const MATERIAL_ICON_GEOM = { x: 164, y: 20, size: 140 } as const;
export const WHATIF_ICON_GEOM   = { x: 240, y: 22, size: 64  } as const;

/** @deprecated kept for back-compat — use BRAND_ICON_GEOM or MATERIAL_ICON_GEOM. */
export const DEFAULT_ICON_GEOM = MATERIAL_ICON_GEOM;

// ---------- Theme tokens (canonical exports) ----------
//
// All non-locale-dependent design tokens live here so renderer code has
// one obvious import path. Locale-dependent font stacks remain in i18n.ts
// (use `getCoverFontStack(locale)` + `fontStackToCss()` when locale matters).

import type { RGB } from "./types";

/** Default cover font-family CSS string (used when locale is unknown / Latin-only). */
export const FONT_FAMILY_COVER    = '"Delight", -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif';

/** Default metadata-frame font-family CSS string. */
export const FONT_FAMILY_METADATA = '"Delight", -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif';

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
