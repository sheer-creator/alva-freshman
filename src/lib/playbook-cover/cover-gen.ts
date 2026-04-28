// Pure cover generator. Takes CoverInput, returns CoverOutput.
// Mirror of skill cover-gen.ts, with brand + portrait override paths.

import type {
  CoverInput, CoverOutput, Template, HSL, BgSpec, IconSpec, PaletteBand,
} from "./types";
import {
  fnv1a, hslToRgb, clampPaperRegime, deriveTextPalette,
  iconColorFor, slotToHue, heroColorFor, alphaOnWhite, hexToRgb,
} from "./color";
import { PALETTE } from "./palette";
import { DOMAIN_TO_SYMBOL, resolveDomain } from "./icon-mapping";
import { BRAND_REGISTRY, type BrandEntry } from "./brand-registry";

export function generateCover(input: CoverInput): CoverOutput {
  if (input.portrait) validatePortrait(input);

  const band = PALETTE[input.template];

  // Layer 1c — portrait override: bg derives from portraitH, icon is null
  // (image IS the icon layer). Highest priority.
  if (input.portrait) {
    const bgHsl = clampPaperRegime({ H: input.portrait.portraitH, S: band.S, L: band.L });
    const bg: BgSpec = buildGradient(bgHsl, "portrait");
    const portraitBase = hslToRgb(input.portrait.portraitH, 0.40, 0.22);
    const text = {
      base: portraitBase, hero: portraitBase, support: portraitBase, label: portraitBase,
    };
    return { bg, icon: null, text, heroColor: heroColorFor(bgHsl.H, true) };
  }

  // Layer 1b + 2b — brand override: tickers.length === 1 AND ticker in registry.
  // Mono brands skip the bg tint (alpha-on-white over black gives flat grey)
  // but still get the brand logo as the icon.
  const brand = getBrand(input.tickers);

  const bgHsl: HSL = brand && !brand.mono
    ? brandBgHsl(brand, band)
    : hashedBgHsl(input.title, input.tickers, band);

  const bg: BgSpec = brand && !brand.mono
    ? buildBrandBg(brand)
    : buildGradient(bgHsl, "hashed");

  const icon: IconSpec = brand
    ? buildBrandIcon(input.tickers[0]!, brand, input.template)
    : buildMaterialIcon(
        resolveDomain(input.template, input.title, input.tickers, input.domain),
        input.template,
        bgHsl,
      );

  const text = deriveTextPalette(bgHsl);

  const isPositive = inferPositive(input);
  const heroColor = heroColorFor(bgHsl.H, isPositive);

  return { bg, icon, text, heroColor };
}

/* ---------- Brand path ---------- */

function getBrand(tickers: string[]): BrandEntry | null {
  if (tickers.length !== 1) return null;
  return BRAND_REGISTRY[tickers[0]!] ?? null;
}

function brandBgHsl(brand: BrandEntry, band: PaletteBand): HSL {
  // For text derivation, treat the effective bg as at the brand's hue with
  // the template's paper-weight S/L. Renders close to white but keeps text
  // colors in the brand's hue family.
  const rgb = hexToRgb(brand.color);
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const L = (max + min) / 2;
  let H = 0, S = 0;
  if (max !== min) {
    const d = max - min;
    S = L > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rgb.r: H = ((rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0)) * 60; break;
      case rgb.g: H = ((rgb.b - rgb.r) / d + 2) * 60; break;
      case rgb.b: H = ((rgb.r - rgb.g) / d + 4) * 60; break;
    }
  }
  return { H, S: band.S, L: band.L };
}

function buildBrandBg(brand: BrandEntry): BgSpec {
  // Layer 1b — alpha-on-white blend. Top stop 0.18, bottom 0.38.
  const rgb = hexToRgb(brand.color);
  const top = alphaOnWhite(rgb, 0.18);
  const bot = alphaOnWhite(rgb, 0.38);
  // hsl is the brand's actual HSL (used downstream for text/shadow derivation).
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const L = (max + min) / 2;
  let H = 0, S = 0;
  if (max !== min) {
    const d = max - min;
    S = L > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rgb.r: H = ((rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0)) * 60; break;
      case rgb.g: H = ((rgb.b - rgb.r) / d + 2) * 60; break;
      case rgb.b: H = ((rgb.r - rgb.g) / d + 4) * 60; break;
    }
  }
  return { type: "gradient", top, bot, hsl: { H, S, L }, path: "brand" };
}

function buildBrandIcon(ticker: string, brand: BrandEntry, template: Template): IconSpec {
  const geom = iconGeometryFor(template);
  // Per skill calibration: 100×100 → 0.40, 64×64 → 0.50. Brand logos are
  // saturated and read denser than bg-derived Material Symbols at the same
  // visual weight; the lower opacity equalizes them.
  const opacity = geom.size === 64 ? 0.50 : 0.40;
  return {
    kind: "brand",
    ticker,
    slug: brand.logoSlug,
    color: brand.color,
    mono: brand.mono,
    fallbackSymbol: brand.fallbackSymbol,
    opacity,
    x: geom.x,
    y: geom.y,
    size: geom.size,
  };
}

export function hashSlot(title: string, tickers: string[]): number {
  return fnv1a(`${title}|${tickers.join(",")}`) % 12;
}

function hashedBgHsl(title: string, tickers: string[], band: PaletteBand): HSL {
  const slot = hashSlot(title, tickers);
  const H = slotToHue(slot, band.baseH, band.range);
  return clampPaperRegime({ H, S: band.S, L: band.L });
}

function buildGradient(hsl: HSL, path: "hashed" | "brand" | "portrait"): BgSpec {
  const top = hslToRgb(hsl.H, hsl.S, hsl.L);
  const bot = hslToRgb(
    hsl.H,
    Math.min(hsl.S * 1.25, 0.28),
    Math.max(hsl.L - 0.04, 0.92),
  );
  return { type: "gradient", top, bot, hsl, path };
}

function buildMaterialIcon(domain: string, template: Template, bgHsl: HSL): IconSpec {
  const symbol = DOMAIN_TO_SYMBOL[domain as keyof typeof DOMAIN_TO_SYMBOL] ?? "menu_book";
  const color = iconColorFor(bgHsl);
  const geom = iconGeometryFor(template);
  // 0.7 (was 1.0) per skill 2026-04-27 — bg-derived icons felt too prominent
  // versus brand logos. 0.7 keeps the icon as a clear secondary element on
  // the cover while leaving brand logos at their per-size calibrated opacity
  // (0.40 / 0.50) since brand identity is the primary signal in those cards.
  return { kind: "material", symbol, color, opacity: 0.7, ...geom };
}

function iconGeometryFor(template: Template): { x: number; y: number; size: number } {
  // What-if frame at (240, 12) per skill 2026-04-27 — pushes the icon
  // further into the top-right corner than the previous (235, 20). Lets
  // the visible glyph float a few px past the safe zone for a more
  // decisively corner-anchored read. Frame right edge x=304 is still
  // inside the cover (320), so no actual overflow.
  if (template === "what-if") return { x: 240, y: 12, size: 64 };
  return { x: 192, y: 22, size: 100 };
}

function inferPositive(input: CoverInput): boolean {
  if (input.template !== "what-if") return true;
  if (input.whatIfBars && input.whatIfBars.length) {
    const sum = input.whatIfBars.reduce((a, b) => a + b, 0);
    return sum >= 0;
  }
  if (input.anchor) return !input.anchor.trim().startsWith("-") && !input.anchor.trim().startsWith("−");
  return true;
}

/* ---------- Portrait intake validation ---------- */

/**
 * Generic-persona keywords that indicate a subject name is NOT a real
 * named individual but a strategy concept or archetype. Mirrors skill
 * src/cover-gen.ts. Match is case-insensitive whole-word.
 */
export const GENERIC_PERSONA_KEYWORDS: readonly string[] = [
  "trader", "investor", "quant", "analyst", "manager", "advisor",
  "whale", "shadow", "guru", "wizard", "ninja", "pro", "legend",
  "the ai", "the quant", "the trader", "the investor", "the bull",
  "the bear", "the king", "the queen", "the master",
];

/**
 * Validate a portrait CoverInput at intake. Throws Error with a specific
 * message for each failure mode. Mirror of skill validatePortrait().
 */
export function validatePortrait(input: CoverInput): void {
  const p = input.portrait;
  if (!p) return;

  // 1. Orientation
  if (typeof p.imageAspectRatio !== "number" || !isFinite(p.imageAspectRatio)) {
    throw new Error(
      `Portrait cover for "${input.title}": missing or invalid ` +
      `portrait.imageAspectRatio (got ${p.imageAspectRatio}).`,
    );
  }
  if (p.imageAspectRatio < 1.5) {
    throw new Error(
      `Portrait cover for "${input.title}": source aspect ratio ` +
      `${p.imageAspectRatio.toFixed(2)} is vertical/square — cannot fit ` +
      `a 2.3:1 cover. Required: ≥ 1.5 (landscape).`,
    );
  }

  // 2. Scope — generic-persona detection
  if (typeof p.subjectName !== "string" || p.subjectName.trim().length === 0) {
    throw new Error(
      `Portrait cover for "${input.title}": missing portrait.subjectName.`,
    );
  }
  const matched = GENERIC_PERSONA_KEYWORDS.find(
    (kw) => new RegExp(`\\b${kw}\\b`, "i").test(p.subjectName),
  );
  if (matched) {
    throw new Error(
      `Portrait cover for "${input.title}": portrait.subjectName ` +
      `"${p.subjectName}" looks like a generic persona (matched ` +
      `"${matched}"). Use a non-portrait template + domain icon instead.`,
    );
  }

  // 3. License (only when caller supplies it)
  if (p.license === "unknown") {
    throw new Error(
      `Portrait cover for "${input.title}": portrait.license is "unknown". ` +
      `Required: PD / CC0 / CC-BY / CC-BY-SA / official.`,
    );
  }

  // 4. Hue range
  if (typeof p.portraitH !== "number" || !isFinite(p.portraitH) || p.portraitH < 0 || p.portraitH > 360) {
    throw new Error(
      `Portrait cover for "${input.title}": portrait.portraitH ` +
      `${p.portraitH} is out of range [0, 360].`,
    );
  }
}
