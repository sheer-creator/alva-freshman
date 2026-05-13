// cover-gen.ts — main cover generation pipeline
//
// Pure functions with no side effects. Takes a CoverInput, returns a
// CoverOutput. The Figma applicator is in figma-apply.ts and consumes
// this output.

import {
  CoverInput, CoverOutput, Template, RGB, HSL,
  BgSpec, IconSpec, TextPalette, ContentElement, BarSpec, BrandEntry, PaletteBand,
} from "./types";
import {
  DEFAULT_ICON_GEOM, WHATIF_ICON_GEOM,
  BARS_LEFT, BARS_RIGHT, BAR_GAP,
  CATEGORY_COLORS, FONT_WEIGHTS, TRACKED_CAPS,
} from "./dimensions";

// Re-export so existing consumers keep working (the canonical home is now ./dimensions).
export { CATEGORY_COLORS, FONT_WEIGHTS, TRACKED_CAPS } from "./dimensions";
import {
  fnv1a, hslToRgb, hexToRgb, clampPaperRegime,
  textBaseFor, deriveTextPalette, alphaOnWhite,
  iconColorFor, barColorFor, slotToHue,
} from "./color";
import { PALETTE } from "./palette";
import { BRAND_REGISTRY } from "./brand-registry";
import { DOMAIN_TO_SYMBOL, resolveDomain } from "./icon-mapping";
import { lookupPerson, PERSON_REGISTRY } from "./person-registry";
import {
  METADATA_LAYOUT,
  TITLE_STYLE,
  SUBTITLE_STYLE,
  CHIP_STYLE,
  FIGMA_TITLE_LAYOUT,
  FIGMA_SUBTITLE_LAYOUT,
} from "./metadata-layout";
import {
  Locale,
  DEFAULT_LOCALE,
  DEFAULT_LABELS,
  LOCALE_SEPARATORS,
  isCJKLocale,
  directionFor,
  localizeCategory,
  getCoverFontStack,
  getMetadataFontStack,
  maxCharsForWidth,
} from "./i18n";

// ================================================================
// Main entry
// ================================================================

/**
 * Pure, deterministic cover generator. Same input → identical output (cacheable).
 * Calls `validatePortrait()` first — throws on bad portrait input (intake guard).
 */
export function generateCover(input: CoverInput): CoverOutput {
  if (input.portrait) validatePortrait(input);

  const locale = input.locale ?? DEFAULT_LOCALE;
  const band = PALETTE[input.template];
  const brand = getBrand(input.tickers);
  const isPortrait = !!input.portrait;

  // ---- Layer 1: background ----
  const bgHsl: HSL = isPortrait
    ? { H: input.portrait!.portraitH, S: band.S, L: band.L }
    : brand && !brand.mono
      ? brandBgHsl(brand, band)          // alpha-on-white averaged back to HSL
      : hashedBgHsl(input.title, input.tickers, band);

  const bg: BgSpec = isPortrait
    ? withPortraitRender(buildGradient(bgHsl, "portrait"), input.portrait!)
    : brand && !brand.mono
      ? buildBrandBg(brand, band)
      : buildGradient(bgHsl, "hashed");

  // ---- Layer 2: icon ----
  // Brand path splits two ways: with CDN logo → buildBrandIcon (logoSlug + brand color);
  // without CDN logo → buildMaterialIcon (uses brand.fallbackSymbol + bg-derived color).
  // Brand bg-tinting is independent of icon path — non-mono brands keep their bg-tint.
  const icon: IconSpec = isPortrait
    ? null
    : brand && brand.hasCdnLogo
      ? buildBrandIcon(input.tickers[0]!, brand, input.template)
      : brand
        ? buildMaterialIcon(brand.fallbackSymbol ?? "memory", input.template, bgHsl)
        : buildMaterialIcon(
            symbolForDomain(resolveDomain(input.template, input.title, input.tickers, input.domain) ?? fallbackDomain(input.template)),
            input.template,
            bgHsl,
          );

  // ---- Text palette ----
  const text: TextPalette = deriveTextPalette(
    brand && !brand.mono
      ? colorToHsl(brand.color)          // brand override: text derives from brand hue
      : bgHsl,
  );

  // ---- Content (per-archetype) ----
  const content = buildContent(input, bgHsl, locale, text);

  return {
    bg,
    icon,
    text,
    content,
    meta: buildMetaLayout(),
    locale,
    direction: directionFor(locale),
    fonts: {
      cover:    getCoverFontStack(locale),
      metadata: getMetadataFontStack(locale),
    },
    debug: {
      hashSlot: !brand && !isPortrait ? hashSlot(input.title, input.tickers) : undefined,
      inferredDomain: !input.domain && !isPortrait && !brand
        ? resolveDomain(input.template, input.title, input.tickers) ?? undefined
        : undefined,
      path: isPortrait ? "portrait" : brand ? "brand" : "default",
    },
  };
}

/** Pack the metadata-layout constants onto the output so production reads from a single shape. */
function buildMetaLayout() {
  return {
    title: {
      maxLines:   METADATA_LAYOUT.title.maxLines,
      fontSize:   METADATA_LAYOUT.title.fontSize,
      lineHeight: METADATA_LAYOUT.title.lineHeight,
      fontWeight: METADATA_LAYOUT.title.fontWeight,
      fontFamily: METADATA_LAYOUT.title.fontFamily,
      style: { ...TITLE_STYLE },
      figma: { ...FIGMA_TITLE_LAYOUT },
    },
    subtitle: {
      maxLines:   METADATA_LAYOUT.subtitle.maxLines,
      fontSize:   METADATA_LAYOUT.subtitle.fontSize,
      lineHeight: METADATA_LAYOUT.subtitle.lineHeight,
      fontWeight: METADATA_LAYOUT.subtitle.fontWeight,
      fontFamily: METADATA_LAYOUT.subtitle.fontFamily,
      height:     METADATA_LAYOUT.subtitle.height,
      style: { ...SUBTITLE_STYLE },
      figma: {
        textAutoResize: FIGMA_SUBTITLE_LAYOUT.textAutoResize,
        maxLines:       FIGMA_SUBTITLE_LAYOUT.maxLines,
        textTruncation: FIGMA_SUBTITLE_LAYOUT.textTruncation,
        lockedHeight:   FIGMA_SUBTITLE_LAYOUT.lockedHeight,
      },
    },
    chip: {
      maxLines:   METADATA_LAYOUT.chip.maxLines,
      fontSize:   METADATA_LAYOUT.chip.fontSize,
      lineHeight: METADATA_LAYOUT.chip.lineHeight,
      fontWeight: METADATA_LAYOUT.chip.fontWeight,
      fontFamily: METADATA_LAYOUT.chip.fontFamily,
      style: { ...CHIP_STYLE },
      figma: {
        textAutoResize: "WIDTH_AND_HEIGHT" as const,
        maxLines: 1,
        textTruncation: "DISABLED" as const,
      },
    },
    author: {
      maxLines:   METADATA_LAYOUT.author.maxLines,
      fontSize:   METADATA_LAYOUT.author.fontSize,
      lineHeight: METADATA_LAYOUT.author.lineHeight,
      fontWeight: METADATA_LAYOUT.author.fontWeight,
      fontFamily: METADATA_LAYOUT.author.fontFamily,
      style: {
        fontSize: METADATA_LAYOUT.author.fontSize,
        lineHeight: `${METADATA_LAYOUT.author.lineHeight}px`,
        fontWeight: METADATA_LAYOUT.author.fontWeight,
        fontFamily: METADATA_LAYOUT.author.fontFamily,
        whiteSpace: "nowrap" as const,
        overflow: "hidden",
        textOverflow: "ellipsis" as const,
      },
      figma: {
        textAutoResize: "TRUNCATE" as const,
        maxLines: 1,
        textTruncation: "ENDING" as const,
      },
    },
  };
}

// ================================================================
// Background
// ================================================================

function hashSlot(title: string, tickers: string[]): number {
  const key = `${title}|${tickers.join(",")}`;
  return fnv1a(key) % 12;
}

function hashedBgHsl(title: string, tickers: string[], band: PaletteBand): HSL {
  const slot = hashSlot(title, tickers);
  const H = slotToHue(slot, band.baseH, band.range);
  return clampPaperRegime({ H, S: band.S, L: band.L });
}

function buildGradient(hsl: HSL, path: "hashed" | "portrait"): BgSpec {
  const top = hslToRgb(hsl.H, hsl.S, hsl.L);
  const bot = hslToRgb(
    hsl.H,
    Math.min(hsl.S * 1.25, 0.28),
    Math.max(hsl.L - 0.04, 0.92),
  );
  return { type: "gradient", top, bot, hsl, path };
}

/**
 * Augment a portrait BgSpec with renderer hints (crop directive + filters)
 * so consumers don't re-derive from docs. Read on `output.bg.portraitRender`.
 */
function withPortraitRender(
  bg: BgSpec,
  portrait: { imageHash: string; imageTransform?: number[][]; subjectName?: string },
): BgSpec {
  // Resolve href via PERSON_REGISTRY when the subject is curated. The
  // registry's URL takes priority over the input's imageHash because:
  //   1. The registry is the source of truth for "who is X" — guarantees
  //      the photo IS that person, not a stock photo of someone else
  //   2. The registry includes fallback URLs for resilience
  //   3. Production data may drift; the registry stays canonical
  // Fallback to input.imageHash only when subject isn't in the registry
  // (one-off portraits, novel subjects in flight before adding to registry).
  const personEntry = portrait.subjectName ? lookupPerson(portrait.subjectName) : null;
  const href = personEntry?.imageHref ?? portrait.imageHash;
  const fallbacks = personEntry?.fallbacks;

  return {
    ...bg,
    portraitRender: {
      href,
      ...(fallbacks && fallbacks.length > 0 ? { fallbacks } : {}),
      opacity: 0.18,
      crop: {
        svgPreserveAspectRatio: "xMidYMin slice",
        figmaImageTransform: portrait.imageTransform ?? [[1, 0, 0], [0, 0.62, 0.13]],
        cssBackgroundPosition: "center top",
        cssBackgroundSize: "cover",
      },
      filters: {
        saturation:  -0.55,
        exposure:     0.22,
        contrast:     0.05,
        temperature:  0,
        tint:         0,
        highlights:   0.10,
        shadows:      0.15,
      },
    },
  };
}

/**
 * Brand bg: alpha-on-white at 0.18 (top) and 0.38 (bottom).
 * Result sits at L ≈ 0.95 naturally.
 */
function buildBrandBg(brand: BrandEntry, band: PaletteBand): BgSpec {
  const rgb = colorToRgb(brand.color);
  const top = alphaOnWhite(rgb, 0.18);
  const bot = alphaOnWhite(rgb, 0.38);
  const hsl = colorToHsl(brand.color);
  return { type: "gradient", top, bot, hsl, path: "brand" };
}

function brandBgHsl(brand: BrandEntry, band: PaletteBand): HSL {
  // For text derivation, treat effective bg as at the brand's H, with
  // the general paper-weight S/L (what's actually rendered is close to white).
  const brandHsl = colorToHsl(brand.color);
  return { H: brandHsl.H, S: band.S, L: band.L };
}

// ================================================================
// Icon
// ================================================================

function buildMaterialIcon(symbol: string, template: Template, bgHsl: HSL): IconSpec {
  const color = iconColorFor(bgHsl);
  const geom = iconGeometryFor(template);
  return {
    kind: "material",
    symbol,
    color,
    // 0.7 — bg-derived watermark, secondary to foreground.
    // Brand logos use calibrated 0.40/0.50 (see buildBrandIcon) — different role.
    opacity: 0.7,
    x: geom.x,
    y: geom.y,
    size: geom.size,
  };
}

/** Resolve a domain key to a Material Symbol with a sensible fallback. */
function symbolForDomain(domain: string): string {
  return DOMAIN_TO_SYMBOL[domain as keyof typeof DOMAIN_TO_SYMBOL] ?? "menu_book";
}

function buildBrandIcon(ticker: string, brand: BrandEntry, template: Template): IconSpec {
  const geom = iconGeometryFor(template);
  const opacity = geom.size === 64 ? 0.50 : 0.40;
  return {
    kind: "brand",
    ticker,
    color: colorToRgb(brand.color),
    opacity,
    x: geom.x,
    y: geom.y,
    size: geom.size,
    logoSvg: brand.logoSvg,
    logoSlug: brand.logoSlug ?? ticker.toLowerCase(),
    fallbackSymbol: brand.fallbackSymbol ?? "memory",
    mono: brand.mono,
  };
}

// ================================================================
// validatePortrait — intake-time guard for portrait covers
// ================================================================

// ================================================================
// validatePortrait — intake-time guard for portrait covers
// ================================================================

/** Whole-word case-insensitive match list — names hitting these aren't real persons. */
export const GENERIC_PERSONA_KEYWORDS: readonly string[] = [
  "trader", "investor", "quant", "analyst", "manager", "advisor",
  "whale", "shadow", "guru", "wizard", "ninja", "pro", "legend",
  "the ai", "the quant", "the trader", "the investor", "the bull",
  "the bear", "the king", "the queen", "the master",
];

/**
 * Intake guard — throws on orientation / scope / license / hue violation.
 * Pure function; safe to call multiple times.
 */
export function validatePortrait(input: CoverInput): void {
  const p = input.portrait;
  if (!p) return; // not a portrait cover; nothing to validate

  const t = input.title;

  // 1. Orientation — ≥ 3:2 landscape required
  if (typeof p.imageAspectRatio !== "number" || !isFinite(p.imageAspectRatio)) {
    throw new Error(`Portrait "${t}": missing portrait.imageAspectRatio (got ${p.imageAspectRatio}). Required ≥ 1.5.`);
  }
  if (p.imageAspectRatio < 1.5) {
    throw new Error(`Portrait "${t}": source aspect ${p.imageAspectRatio.toFixed(2)} is vertical/square — required ≥ 1.5 (landscape). Find a landscape source or use a non-portrait template.`);
  }

  // 2. Scope — generic-persona detection
  if (typeof p.subjectName !== "string" || p.subjectName.trim().length === 0) {
    throw new Error(`Portrait "${t}": missing portrait.subjectName. Required: specific named real-world public figure (e.g. "Warren Buffett").`);
  }
  const lcSubject = p.subjectName.toLowerCase();
  const matchedKeyword = GENERIC_PERSONA_KEYWORDS.find(
    (kw) => new RegExp(`\\b${kw}\\b`, "i").test(lcSubject),
  );
  if (matchedKeyword) {
    throw new Error(`Portrait "${t}": subjectName "${p.subjectName}" matches generic persona keyword "${matchedKeyword}". Use a non-portrait template with a domain icon.`);
  }

  // 3. License
  if (p.license === "unknown") {
    throw new Error(`Portrait "${t}": license is "unknown". Required: PD / CC0 / CC-BY / CC-BY-SA / official.`);
  }

  // 4. Hue range
  if (typeof p.portraitH !== "number" || !isFinite(p.portraitH) || p.portraitH < 0 || p.portraitH > 360) {
    throw new Error(`Portrait "${t}": portraitH ${p.portraitH} out of [0, 360].`);
  }
}

type IconGeom = { x: number; y: number; size: number };
function iconGeometryFor(template: Template): IconGeom {
  // What-if: frame at (237, 15) intentionally overflows safe-zone top-left.
  // Material Symbols / brand 80%-inset SVGs both have ~5px internal padding,
  // so the *visible* glyph's top-right lands at (296, 20) — exactly at the
  // safe-zone corner. Aligning the FRAME to (232, 28) leaves the visible
  // glyph 5–6 px indented from the corner — the bug the user reported.
  // What-if frame at (240, 12) — visible glyph floats past safe-zone
  // top-right by ~5 px, reading as decisively corner-anchored. Frame
  // right x=304 still inside cover (320).
  if (template === "what-if") return { x: 240, y: 12, size: 64 };
  return { x: 192, y: 22, size: 100 };
}

// ================================================================
// Content per archetype
// ================================================================

function buildContent(input: CoverInput, bgHsl: HSL, locale: Locale, text: TextPalette): ContentElement[] {
  switch (input.template) {
    case "screener":  return buildScreenerContent(input, locale, text);
    case "thesis":    return buildThesisContent(input, locale, text);
    case "what-if":   return buildWhatIfContent(input, bgHsl, locale, text);
    case "general":   return buildGeneralContent(input, locale);
  }
}

function buildScreenerContent(input: CoverInput, locale: Locale, text: TextPalette): ContentElement[] {
  const lead  = input.tickers[0] ?? "";
  const peers = input.tickers.slice(1, 4);
  const cjk   = isCJKLocale(locale);
  return [
    { kind: "label",  text: input.series ?? DEFAULT_LABELS[locale].screenerSeries, x: 28, y: 24,
      fontSize: 9, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: cjk ? 0 : TRACKED_CAPS,
      paletteRole: "label", caps: !cjk },
    { kind: "ticker", text: lead, x: 28, y: 48,
      fontSize: 34, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: 0, paletteRole: "hero" },
    {
      kind: "peer-chips",
      tickers: peers,
      x: 28, y: 100,
      chipHeight: 20,
      chipPaddingX: 8,
      chipGap: 4,
      chipFontSize: 10,
      chipFontWeight: FONT_WEIGHTS.semiBold,
      chipLetterSpacing: cjk ? 0 : 0.04,
      chipBorderRadius: 4,
      chipBg:        { color: text.base, opacity: 0.10 },
      chipTextColor: text.support,                            // textBase @ 0.70
      textBaselineY: 110,
    },
  ];
}

function buildThesisContent(input: CoverInput, locale: Locale, text: TextPalette): ContentElement[] {
  const labels = DEFAULT_LABELS[locale];
  const anchor = (input.anchor ?? labels.thesisAnchorTBD).toUpperCase();
  const cjk    = isCJKLocale(locale);
  const label  = cjk
    ? `${labels.thesisLabelPrefix} · ${anchor}`
    : `${labels.thesisLabelPrefix} · ${anchor}`.toUpperCase();
  // Category comes from the dedicated `input.category` field (NOT input.series —
  // series is the caps label text and is template-agnostic).
  const category: "RISK" | "CATALYST" | "AMBIGUOUS" = input.category ?? "AMBIGUOUS";
  return [
    { kind: "label",  text: label, x: 28, y: 24,
      fontSize: 9, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: cjk ? 0 : TRACKED_CAPS,
      paletteRole: "label", caps: !cjk },
    {
      kind: "delta",
      text: splitDelta(input.kind ?? "", locale),
      category,
      categoryLabel: localizeCategory(category, locale),     // ← pre-resolved per locale
      x: 28, y: 72,
      fontSize: 18,
      lineHeight: 22,
      fontWeight: FONT_WEIGHTS.semiBold,
      letterSpacing: 0,
      bodyColor: text.hero,
      categoryX: 28,
      categoryY: 60,
      categoryFontSize: 10,
      categoryFontWeight: FONT_WEIGHTS.semiBold,
      categoryLetterSpacing: cjk ? 0 : TRACKED_CAPS,
      categoryDotSize: 4,
      categoryColor: CATEGORY_COLORS[category],
    },
  ];
}

/**
 * Insert `\n` at the natural semantic break in a thesis delta string.
 * Universal priority: vs > · > — > : > sign-boundary > mid-space fallback.
 * Locale extras (CJK adds 、，：； etc.) inserted between the universal
 * separators and the mid-space fallback.
 *
 * Threshold for the mid-space fallback scales with locale char width:
 * Latin ~0.55× fontSize → ~25 chars before risk; CJK ~1.0× fontSize →
 * ~14 chars. Returns input unchanged if no priority matches and the
 * string is below the locale-specific overflow risk.
 */
export function splitDelta(text: string, locale: Locale = DEFAULT_LOCALE): string {
  if (!text || text.includes("\n")) return text;

  // Priority 1: " vs "
  const vsIdx = text.search(/\s+vs\s+/i);
  if (vsIdx > 0) {
    return text.slice(0, vsIdx) + "\n" + text.slice(vsIdx + 1).replace(/^\s+/, "");
  }

  // Priority 2: " · "  (middle dot / interpunct, U+00B7 — common in editorial copy)
  // " · " is exactly 3 characters; slice(dotIdx + 3) drops separator + both spaces.
  const dotIdx = text.indexOf(" · ");
  if (dotIdx > 0) {
    return text.slice(0, dotIdx) + "\n" + text.slice(dotIdx + 3);
  }

  // Priority 3: " — " (em-dash, U+2014, with surrounding spaces)
  // Drop the em-dash on split — it was a separator, not content. Leaving it
  // on the new line ("— pivot delayed") looks like a typographical hiccup.
  const emIdx = text.indexOf(" — ");
  if (emIdx > 0) {
    return text.slice(0, emIdx) + "\n" + text.slice(emIdx + 3);
  }

  // Priority 4: ":" (break AFTER the colon)
  const colonIdx = text.indexOf(":");
  if (colonIdx > 0 && colonIdx < text.length - 1) {
    return text.slice(0, colonIdx + 1) + "\n" + text.slice(colonIdx + 1).replace(/^\s+/, "");
  }

  // Priority 5: signed-number boundary " −" or " +"
  const signIdx = text.search(/\s[−+]/);
  if (signIdx > 0) {
    return text.slice(0, signIdx) + "\n" + text.slice(signIdx + 1);
  }

  // Priority 6: locale-specific separators (e.g. 、，：； for CJK).
  // First match in declaration order wins; break AFTER the separator.
  for (const sep of LOCALE_SEPARATORS[locale]) {
    const idx = text.indexOf(sep);
    if (idx > 0 && idx < text.length - sep.length) {
      return text.slice(0, idx + sep.length) + "\n" + text.slice(idx + sep.length).replace(/^\s+/, "");
    }
  }

  // Priority 7 (fallback): split when single-line rendering risks overflow.
  // Threshold = max chars at fontSize 18 within the 264-px safe zone for this locale.
  // Latin ≈ 25, CJK ≈ 14.
  const overflowThreshold = maxCharsForWidth(264, 18, locale);
  if (text.length > overflowThreshold) {
    const mid = Math.floor(text.length / 2);
    // Prefer space; fall back to any character boundary for CJK (no mandatory whitespace).
    let bestIdx = -1;
    let bestDist = Infinity;
    for (let i = 0; i < text.length; i++) {
      const isBreak = text[i] === " " || (isCJKLocale(locale) && i > 0);
      if (!isBreak) continue;
      const dist = Math.abs(i - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    if (bestIdx > 0) {
      const skip = text[bestIdx] === " " ? 1 : 0;
      return text.slice(0, bestIdx) + "\n" + text.slice(bestIdx + skip);
    }
  }

  // No-break fallback: keep as single line.
  return text;
}

function buildWhatIfContent(input: CoverInput, bgHsl: HSL, locale: Locale, text: TextPalette): ContentElement[] {
  const labels = DEFAULT_LABELS[locale];
  const cjk    = isCJKLocale(locale);
  const { bars, zeroLineY } = computeWhatIfBars(input.whatIfBars ?? [], bgHsl);
  return [
    { kind: "label",    text: input.series ?? labels.whatIfLabel, x: 28, y: 20,
      fontSize: 9, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: cjk ? 0 : TRACKED_CAPS,
      paletteRole: "label", caps: !cjk },
    { kind: "verb",     text: input.kind   ?? "", x: 28, y: 64,
      fontSize: 9, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: cjk ? 0 : TRACKED_CAPS,
      paletteRole: "label", caps: !cjk },
    { kind: "hero-pct", text: input.anchor ?? "", x: 28, y: 80,
      fontSize: 40, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: 0, paletteRole: "hero" },
    {
      kind: "bars",
      bars,
      zeroLineY,
      barOpacity: 0.55,
      zeroLine: {
        x1: BARS_LEFT,
        x2: BARS_RIGHT,
        color: text.base,
        opacity: 0.15,
        strokeWidth: 1,
      },
    },
  ];
}

/**
 * Compute BarSpec[] + zeroLineY from raw signed values. Each bar's height
 * scales relative to the absolute max in the set (cap 28 px), with a 4 px
 * floor so tiny bars stay visible. zeroLineY = 120 − maxNegHeight, so the
 * tallest negative bar's bottom touches the safe-zone bottom (y=120).
 */
function computeWhatIfBars(values: number[], bgHsl: HSL): { bars: BarSpec[]; zeroLineY: number } {
  if (!values.length) return { bars: [], zeroLineY: 112 };
  const N        = values.length;
  const w        = (BARS_RIGHT - BARS_LEFT - BAR_GAP * (N - 1)) / N;
  const maxAbs   = Math.max(...values.map(v => Math.abs(v)), 0.0001);
  const heights  = values.map(v => Math.max(Math.abs(v) * (28 / maxAbs), 4));
  const maxNegH  = values.reduce((a, v, i) => v < 0 ? Math.max(a, heights[i]!) : a, 0);
  const zeroLineY = 120 - maxNegH;
  const bars: BarSpec[] = values.map((v, i) => {
    const isPos = v >= 0;
    return {
      x: BARS_LEFT + i * (w + BAR_GAP),
      y: isPos ? zeroLineY - heights[i]! : zeroLineY,
      width: w,
      height: heights[i]!,
      color: barColorFor(bgHsl.H, isPos),
      isPositive: isPos,
    };
  });
  return { bars, zeroLineY };
}

function buildGeneralContent(input: CoverInput, locale: Locale): ContentElement[] {
  const labels = DEFAULT_LABELS[locale];
  const cjk    = isCJKLocale(locale);
  return [
    { kind: "label",      text: input.kind   ?? labels.generalKind, x: 28, y: 24,
      fontSize: 9, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: cjk ? 0 : TRACKED_CAPS,
      paletteRole: "label", caps: !cjk },
    { kind: "hero-pulse", text: input.anchor ?? "", x: 28, y: 66,
      fontSize: 28, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: 0, paletteRole: "hero" },
    { kind: "series",     text: input.series ?? "", x: 28, y: 106,
      fontSize: 10, fontWeight: FONT_WEIGHTS.semiBold, letterSpacing: cjk ? 0 : TRACKED_CAPS,
      paletteRole: "support" },
  ];
}

// ================================================================
// Helpers
// ================================================================

function getBrand(tickers: string[]): BrandEntry | null {
  if (tickers.length !== 1) return null;
  return BRAND_REGISTRY[tickers[0]!] ?? null;
}

function fallbackDomain(template: Template): string {
  return template === "general" ? "guide" : "guide";
}

function colorToRgb(c: RGB | string): RGB {
  if (typeof c === "string") return hexToRgb(c);
  return c;
}

function colorToHsl(c: RGB | string): HSL {
  const rgb = colorToRgb(c);
  // Inline rgbToHsl (avoid circular import)
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
  return { H, S, L };
}

// Re-export barColorFor for consumers building their own bars
export { barColorFor };
