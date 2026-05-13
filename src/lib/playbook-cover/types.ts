// types.ts — shared types for the Alva cover generator
// Pure type declarations; no runtime deps.

export type Template = "screener" | "thesis" | "what-if" | "general";

// Re-export from i18n.ts so callers can import everything from "./types"
export type { Locale, Direction, FontStack, FontConfig, CategoryKey } from "./i18n";
import type { Locale, Direction, FontConfig } from "./i18n";

export type DomainKey =
  // universal
  | "tech" | "software" | "ai" | "crypto"
  // factor
  | "dividend" | "value" | "growth" | "momentum"
  // sector
  | "defense" | "energy" | "renewables" | "biotech" | "healthcare"
  | "retail" | "consumer_staples" | "real_estate" | "banks"
  // macro / policy
  | "fed" | "macro" | "rates" | "fx" | "commodities"
  // what-if specific
  | "trend_up" | "trend_down" | "trend_flat" | "event_study" | "earnings"
  // general-specific
  | "guide" | "weekly" | "review" | "watchlist" | "alerts" | "leaderboard";

export type License = "PD" | "CC0" | "CC-BY" | "CC-BY-SA" | "official" | "unknown";

export type RGB = { r: number; g: number; b: number };   // 0..1
export type HSL = { H: number; S: number; L: number };   // H in 0..360; S,L in 0..1

// ---------- Input ----------

export type PortraitSpec = {
  imageHash: string;          // Figma image hash (returned by figma.createImage()) OR URL for SVG/web renderers
  portraitH: number;          // 0..360, dominant hue of the image
  imageTransform?: number[][]; // optional imageTransform override (default top-anchored vertical slice)
  source:    string;          // attribution URL (stored on the image layer for audit)
  license:   License;
  capturedYear?: number;      // informational — enables recency audit

  /** width / height of source image. Must be ≥ 1.5 (landscape). */
  imageAspectRatio: number;
  /** Specific named public figure (e.g. "Warren Buffett"). Generic personas rejected. */
  subjectName: string;
};

export type CoverInput = {
  template: Template;
  title:    string;
  author:   string;
  tickers:  string[];
  domain?:  DomainKey;
  kind?:    string;
  anchor?:  string;
  series?:  string;
  portrait?: PortraitSpec;
  /** Thesis-only: canonical key for the category badge. Caller passes "RISK" / "CATALYST" / "AMBIGUOUS"; skill resolves color + localized label. */
  category?: "RISK" | "CATALYST" | "AMBIGUOUS";
  /** What-if-only: signed % values (e.g. [-2.4, 1.1, -0.8, 0.3, -1.5]). Skill computes BarSpec[] (positions, widths, heights, colors). Empty/missing → no bars. */
  whatIfBars?: number[];
  /** Defaults to "en". Affects category translations, default labels, font stack, splitDelta separators. */
  locale?:  Locale;
};

// ---------- Output ----------

export type BgSpec = {
  type: "gradient";
  top:  RGB;
  bot:  RGB;
  hsl:  HSL;                  // derived; useful for downstream color math
  path: "hashed" | "brand" | "portrait";

  /**
   * Populated only when `path === "portrait"`. Top-anchored crop keeps
   * heads visible (centered crop slices them off on 2.3:1 covers).
   * Production reads these fields directly — never reimplement.
   */
  portraitRender?: {
    href: string;
    fallbacks?: string[];
    opacity: 0.18;
    crop: {
      svgPreserveAspectRatio: "xMidYMin slice";
      figmaImageTransform: number[][];
      cssBackgroundPosition: "center top";
      cssBackgroundSize: "cover";
    };
    filters: {
      saturation:  -0.55;
      exposure:    0.22;
      contrast:    0.05;
      temperature: 0;       // CRITICAL — must be 0 (warm = 遗照)
      tint:        0;
      highlights:  0.10;
      shadows:     0.15;
    };
  };
};

export type IconSpec =
  | {
      kind: "material";
      symbol: string;         // e.g. "memory", "trending_up"
      color:  RGB;
      opacity: number;
      x: number; y: number;
      size: number;
    }
  | {
      kind: "brand";
      ticker: string;
      color:  RGB;
      opacity: number;
      x: number; y: number;
      size: number;
      logoSvg: string;        // legacy path under shared logos/
      logoSlug: string;       // simpleicons.org slug — primary fetch target
      fallbackSymbol: string; // Material Symbol when logo fetch fails (e.g. "smartphone")
      mono:   boolean;
    }
  | null;                     // null for portrait covers (image IS the icon layer)

export type TextPalette = {
  base:    RGB;               // the derived textBase
  hero:    RGB;               // base × 0.92 (pre-multiplied for convenience)
  support: RGB;               // base × 0.70
  label:   RGB;               // base × 0.55
};

/** Which TextPalette role provides this element's color. Renderer reads `output.text[paletteRole]`. */
export type PaletteRole = "hero" | "support" | "label" | "base";

/** Common typography fields exposed on all text-bearing ContentElements (B1 gap). */
export type TextStyleFields = {
  fontSize: number;
  fontWeight: number;            // 400 / 500 / 600 / 700
  letterSpacing: number;         // em units; tracked caps ≈ 0.16
  paletteRole: PaletteRole;      // which output.text role to use for fill
};

export type ContentElement =
  | ({ kind: "label";     text: string; x: number; y: number; caps: boolean } & TextStyleFields)
  | ({ kind: "ticker";    text: string; x: number; y: number } & TextStyleFields)
  | { kind: "chip";       text: string; x: number; y: number }
  | ({ kind: "verb";      text: string; x: number; y: number; caps: boolean } & TextStyleFields)
  | ({ kind: "hero-pct";  text: string; x: number; y: number } & TextStyleFields)
  | ({ kind: "hero-pulse";text: string; x: number; y: number } & TextStyleFields)
  | { kind: "delta-badge"; category: "RISK" | "CATALYST" | "AMBIGUOUS"; x: number; y: number }
  | { kind: "delta-stack"; primary: string; secondary: string | null; x: number; y: number }
  | {
      /**
       * Thesis delta. `text` contains `\n` from splitDelta — renderer must
       * split into per-line `<tspan>`. `bodyColor` and `categoryColor` are
       * resolved RGBs (no renderer-side color tables needed).
       */
      kind: "delta";
      text: string;
      category: "RISK" | "CATALYST" | "AMBIGUOUS";
      categoryLabel: string;       // ← localized display string ("RISK"/"风险"/"リスク" etc.)
      x: number; y: number;
      fontSize: number;
      lineHeight: number;
      fontWeight: number;
      letterSpacing: number;
      bodyColor: RGB;
      categoryX: number;
      categoryY: number;
      categoryFontSize: number;
      categoryFontWeight: number;
      categoryLetterSpacing: number;
      categoryDotSize: number;
      categoryColor: RGB;
    }
  | ({ kind: "series";    text: string; x: number; y: number } & TextStyleFields)
  | {
      /** What-if distribution bars. `zeroLine` carries the line styling so renderer doesn't hardcode it. */
      kind: "bars";
      bars: BarSpec[];
      zeroLineY: number;
      barOpacity: number;          // typically 0.55
      zeroLine: {
        x1: number;
        x2: number;
        color: RGB;
        opacity: number;          // typically 0.15
        strokeWidth: number;      // typically 1
      };
    }
  | {
      /**
       * Screener peer-chips row. Skill resolves chip bg + text color so
       * renderer never reaches into TextPalette directly.
       */
      kind: "peer-chips";
      tickers: string[];
      x: number; y: number;
      chipHeight: number;
      chipPaddingX: number;
      chipGap: number;
      chipFontSize: number;
      chipFontWeight: number;
      chipLetterSpacing: number;
      chipBorderRadius: number;
      chipBg:        { color: RGB; opacity: number };   // typically textBase @ 0.10
      chipTextColor: RGB;                               // typically textBase @ 0.72
      /** y for `<text dominant-baseline="middle">` = y + chipHeight/2. */
      textBaselineY: number;
    };

export type BarSpec = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: RGB;
  isPositive: boolean;
};

export type CoverOutput = {
  bg:      BgSpec;
  icon:    IconSpec;
  text:    TextPalette;
  content: ContentElement[];

  /**
   * Metadata-frame layout. Production reads these and spreads — no separate
   * imports, no hardcoded CSS. Each role: raw constants + `style` (CSS-in-JS) + `figma` (TEXT settings).
   */
  meta: {
    title:    MetaTextRole;
    subtitle: MetaTextRole;
    chip:     MetaTextRole;
    author:   MetaTextRole;
  };

  /** Locale resolved by `generateCover` (defaults to "en" when input omits it). */
  locale: Locale;
  /** Reading direction. All currently supported locales are "ltr". */
  direction: Direction;
  /**
   * Font stacks for cover and metadata. Renderer applies as
   * `font-family: "Primary", Fallback1, Fallback2, …` so CJK glyphs fall
   * through correctly when the primary face has no CJK coverage (e.g.
   * Delight / Inter Latin-only).
   */
  fonts: FontConfig;

  // Debug trace for audits — safe to ignore in production rendering
  debug?: {
    hashSlot?: number;
    inferredDomain?: DomainKey;
    path:   "default" | "brand" | "portrait";
  };
};

export type MetaTextRole = {
  maxLines: number;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  fontFamily: string;
  /** Locked render height in px — only on subtitle (keeps grid rows aligned). */
  height?: number;
  /** Spread-ready CSS-in-JS object. Includes `whiteSpace: 'normal'` + line-clamp. */
  style: Record<string, string | number>;
  /** Figma TEXT node settings. */
  figma: {
    textAutoResize: "TRUNCATE" | "WIDTH_AND_HEIGHT" | "HEIGHT" | "NONE";
    maxLines: number;
    textTruncation: "ENDING" | "DISABLED";
    lockedHeight?: number;
  };
};

// ---------- Palette band ----------

export type PaletteBand = {
  baseH: number;    // center hue in degrees
  range: number;    // ±range spread (full range = 2×this)
  S:     number;    // saturation
  L:     number;    // lightness
};

export type Palette = Record<Template, PaletteBand>;

// ---------- Brand registry entry ----------

export type BrandEntry = {
  color:   RGB | string;     // hex string like "#76B900" or RGB
  logoSvg: string;           // legacy path under shared logos/ (kept for back-compat)
  /** simpleicons.org slug, e.g. "apple", "microsoft". Renderer fetches `https://cdn.simpleicons.org/{slug}`. */
  logoSlug?: string;
  /** Material Symbol name to render when logo fetch fails (e.g. "smartphone" for AAPL). */
  fallbackSymbol?: string;
  /**
   * `true` only when simpleicons CDN actually serves a logo for `logoSlug`.
   * `false` for ETFs (SPY, QQQ, VOO, …) and for brands without CDN coverage
   * (LMT, RTX, JPM, IBM, …). When false, generateCover routes the icon through
   * the Material Symbol path (using `fallbackSymbol` + bg-derived color) while
   * keeping brand bg-tinting intact for non-mono brands. Without this flag,
   * the brand path renders a tiny dark Material Symbol in brand color, which
   * looks broken.
   */
  hasCdnLogo: boolean;
  mono:    boolean;          // true = pure B/W, skip Layer 1b bg tint
  source:  string;           // attribution URL (primary)
  lastVerified: string;      // ISO date
  /** Alternate URLs tried by `fetchBrandLogo()` on primary failure. Recommend ≥1 per brand. */
  fallbacks?: string[];
};

// ---------- Person registry entry (portrait covers) ----------

export type PersonEntry = {
  name: string;
  /** Wikimedia Commons `Special:FilePath` URL preferred (stable). PD/CC0/CC-BY/CC-BY-SA only. */
  imageHref: string;
  fallbacks?: string[];
  /** 0..360 — dominant hue. */
  portraitH: number;
  /** ≥ 1.5 (landscape). */
  imageAspectRatio: number;
  source: string;
  license: License;
  capturedYear: number;
  lastVerified: string;
};

export type PersonRegistry = Record<string, PersonEntry>;

export type BrandRegistry = Record<string, BrandEntry>;
