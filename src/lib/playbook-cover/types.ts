// Mirrors the canonical types from the alva-cover-generation skill.
// See /Users/lee/Documents/alva-design/skills/alva-cover-generation/src/types.ts
// Keep field names identical so the skill source remains the ground truth.

export type Template = "screener" | "thesis" | "what-if" | "general";

export type DomainKey =
  | "tech" | "software" | "ai" | "crypto"
  | "dividend" | "value" | "growth" | "momentum"
  | "defense" | "energy" | "renewables" | "biotech" | "healthcare"
  | "retail" | "consumer_staples" | "real_estate" | "banks"
  | "fed" | "macro" | "rates" | "fx" | "commodities"
  | "trend_up" | "trend_down" | "trend_flat" | "event_study" | "earnings"
  | "guide" | "weekly" | "review" | "watchlist" | "alerts" | "leaderboard";

export type RGB = { r: number; g: number; b: number };
export type HSL = { H: number; S: number; L: number };

export type CoverInput = {
  template: Template;
  title: string;
  author: string;
  tickers: string[];
  domain?: DomainKey;
  kind?: string;
  anchor?: string;
  series?: string;
  /** what-if only: distribution percentages (signed) used to render bars */
  whatIfBars?: number[];
  /** thesis only: explicit category override (default: AMBIGUOUS) */
  category?: "RISK" | "CATALYST" | "AMBIGUOUS";
  /**
   * Person-subject playbooks: portrait override path (Layer 1c + 2c).
   * Reserved for SPECIFIC NAMED real-world public figures (e.g. Buffett,
   * Druckenmiller). Generic personas ("Whale Trader") are rejected at
   * intake by validatePortrait() — use a normal template + domain icon
   * (e.g. leaderboard, account_balance) instead. See SKILL.md §Portrait.
   */
  portrait?: {
    imageUrl: string;
    portraitH: number;
    /** width / height of source image. Must be ≥ 1.5 (landscape). */
    imageAspectRatio: number;
    /** Real named public figure ("Warren Buffett"). Generic personas rejected. */
    subjectName: string;
    license?: "PD" | "CC0" | "CC-BY" | "CC-BY-SA" | "official" | "unknown";
  };
};

export type BgSpec = {
  type: "gradient";
  top: RGB;
  bot: RGB;
  hsl: HSL;
  path: "hashed" | "brand" | "portrait";
};

export type IconSpec =
  | {
      kind: "material";
      symbol: string;
      color: RGB;
      opacity: number;
      x: number; y: number;
      size: number;
    }
  | {
      kind: "brand";
      ticker: string;
      slug: string;
      color: string;        // hex with leading "#"
      mono: boolean;
      fallbackSymbol: string;
      opacity: number;
      x: number; y: number;
      /** Outer frame size; inner vector renders at 80% of this with 10% inset. */
      size: number;
    }
  | null;

export type TextPalette = {
  base: RGB;
  hero: RGB;
  support: RGB;
  label: RGB;
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
  bg: BgSpec;
  icon: IconSpec;
  text: TextPalette;
  /** semantic tinted hero number color (what-if) */
  heroColor: RGB;
};

export type PaletteBand = {
  baseH: number;
  range: number;
  S: number;
  L: number;
};

export type Palette = Record<Template, PaletteBand>;
