/**
 * [INPUT]: CoverInput (template, title, tickers, optional kind/anchor/series, etc.)
 * [OUTPUT]: SVG cover at the canonical 320×140 design size, scales to container.
 * [POS]: Component — used inside Explore PlaybookCard
 *
 * Implements the alva-cover-generation skill (see
 * /Users/lee/Documents/alva-design/skills/alva-cover-generation/SKILL.md).
 * Uses the hashed bg + Material-Symbol icon code path. Brand and portrait
 * overrides are not wired yet (need bundled SVG assets).
 */

import { useEffect, useMemo, useState } from "react";
import type { CoverInput, BarSpec } from "./types";
import { generateCover } from "./cover-gen";
import {
  rgbToCss, hslToRgb, blendHue, barColorFor,
} from "./color";
import { materialSymbolUrl } from "./icon-mapping";
import { BrandLogo } from "./BrandLogo";

const COVER_W = 320;
const COVER_H = 140;
// Content insets 4px from safe-zone edges (24/296). Per skill spec 2026-04-27.
const SAFE_LEFT = 28;
const SAFE_RIGHT = 292;

const FONT = "'Delight', sans-serif";

export function PlaybookCover({
  input: rawInput,
  staggerMs = 0,
}: {
  input: CoverInput;
  /** Initial delay before the first live tick. Used to stagger updates across cards. */
  staggerMs?: number;
}) {
  // Live-update path: thesis (narrative delta) and what-if (verdict bars + hero %)
  // refresh every 10s with small numerical jitter. Other templates pass through.
  const input = useLiveInput(rawInput, staggerMs);
  // Cover gen should not depend on the live-jittered numbers — bg + icon are
  // stable across ticks, derived from the original title+tickers hash.
  const cover = useMemo(() => generateCover(rawInput), [rawInput]);
  const { bg, icon, text, heroColor } = cover;

  // Unique SVG ids per render (avoid collision when multiple covers on page)
  const uid = useMemo(() => `cv${Math.random().toString(36).slice(2, 9)}`, []);
  const gradId = `${uid}-bg`;

  return (
    <svg
      viewBox={`0 0 ${COVER_W} ${COVER_H}`}
      // meet (not slice): slice crops when the CSS box aspect ratio differs from
      // 320:140 by even a fraction of a pixel — corner icons/logos then look
      // shifted or clipped vs the gradient. meet always fits the full viewBox.
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block", borderRadius: 8 }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={rgbToCss(bg.top)} />
          <stop offset="100%" stopColor={rgbToCss(bg.bot)} />
        </linearGradient>
      </defs>

      {/* Layer 1 — background gradient */}
      <rect width={COVER_W} height={COVER_H} fill={`url(#${gradId})`} />

      {/* Layer 1c — portrait wash (only when portrait override fires) */}
      {input.portrait && (
        <image
          href={input.portrait.imageUrl}
          x={0}
          y={0}
          width={COVER_W}
          height={COVER_H}
          preserveAspectRatio="xMidYMid slice"
          opacity={0.18}
        />
      )}

      {/* Layer 2a — Material Symbol icon (bg-derived color via CSS mask) */}
      {icon && icon.kind === "material" && (
        <foreignObject x={icon.x} y={icon.y} width={icon.size} height={icon.size}>
          <div
            // @ts-expect-error xmlns is required for foreignObject children
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: "100%",
              height: "100%",
              margin: 0,
              boxSizing: "border-box",
              backgroundColor: rgbToCss(icon.color),
              opacity: icon.opacity,
              WebkitMaskImage: `url(${materialSymbolUrl(icon.symbol)})`,
              maskImage: `url(${materialSymbolUrl(icon.symbol)})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </foreignObject>
      )}

      {/* Layer 2b — Brand logo via BrandLogo component with multi-source
          fallback chain (jsDelivr → simpleicons.org → Material Symbol). */}
      {icon && icon.kind === "brand" && (
        <BrandLogo
          slug={icon.slug}
          color={icon.color}
          size={icon.size}
          opacity={icon.opacity}
          fallbackSymbol={icon.fallbackSymbol}
          x={icon.x}
          y={icon.y}
        />
      )}

      {/* Layer 3 — per-template content */}
      {input.template === "screener" && (
        <ScreenerContent input={input} textBaseCss={rgbToCss(text.base)} />
      )}
      {input.template === "thesis" && (
        <ThesisContent input={input} textBaseCss={rgbToCss(text.base)} />
      )}
      {input.template === "what-if" && (
        <WhatIfContent
          input={input}
          textBaseCss={rgbToCss(text.base)}
          heroCss={rgbToCss(heroColor)}
          bgH={bg.hsl.H}
        />
      )}
      {input.template === "general" && (
        <GeneralContent input={input} textBaseCss={rgbToCss(text.base)} />
      )}
    </svg>
  );
}

/* ---------- Per-template content ---------- */

function CapsLabel({ x, y, text, fill, fontSize = 9 }: {
  x: number; y: number; text: string; fill: string; fontSize?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fillOpacity={0.55}
      fontFamily={FONT}
      fontSize={fontSize}
      fontWeight={600}
      letterSpacing="0.16em"
      dominantBaseline="hanging"
    >
      {text}
    </text>
  );
}

function ScreenerContent({ input, textBaseCss }: { input: CoverInput; textBaseCss: string }) {
  const lead = input.tickers[0] ?? "";
  const peers = input.tickers.slice(1, 4);
  const label = (input.series ?? "SCORED · DAILY").toUpperCase();
  return (
    <>
      <CapsLabel x={SAFE_LEFT} y={24} text={label} fill={textBaseCss} />
      <text
        x={SAFE_LEFT}
        y={48}
        fill={textBaseCss}
        fillOpacity={0.92}
        fontFamily={FONT}
        fontSize={34}
        fontWeight={600}
        dominantBaseline="hanging"
      >
        {lead}
      </text>
      <PeerChips x={SAFE_LEFT} y={94} tickers={peers} textBaseCss={textBaseCss} />
    </>
  );
}

function PeerChips({ x, y, tickers, textBaseCss }: {
  x: number; y: number; tickers: string[]; textBaseCss: string;
}) {
  let cursor = x;
  return (
    <>
      {tickers.map((t) => {
        const w = 8 + t.length * 7.2; // crude width estimate for 12px caps
        const chip = (
          <g key={t}>
            <rect
              x={cursor}
              y={y - 1}
              width={w}
              height={18}
              rx={3}
              fill={textBaseCss}
              fillOpacity={0.10}
            />
            <text
              x={cursor + w / 2}
              y={y + 8}
              fill={textBaseCss}
              fillOpacity={0.72}
              fontFamily={FONT}
              fontSize={10}
              fontWeight={600}
              letterSpacing="0.10em"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {t}
            </text>
          </g>
        );
        cursor += w + 6;
        return chip;
      })}
    </>
  );
}

function ThesisContent({ input, textBaseCss }: { input: CoverInput; textBaseCss: string }) {
  const anchor = (input.anchor ?? "TODAY").toUpperCase();
  const label = `TODAY'S DELTA · ${anchor}`;
  const cat = (input.category ?? "AMBIGUOUS").toUpperCase();
  const catColor = cat === "RISK" ? "#C0392B" : cat === "CATALYST" ? "#1F8754" : "#9A7B2E";
  const delta = input.kind ?? "";
  const lines = splitDelta(delta);

  return (
    <>
      <CapsLabel x={SAFE_LEFT} y={24} text={label} fill={textBaseCss} />

      {/* Category indicator with leading dot */}
      <g>
        <circle cx={SAFE_LEFT + 3} cy={54} r={2.5} fill={catColor} />
        <text
          x={SAFE_LEFT + 10}
          y={54}
          fill={catColor}
          fontFamily={FONT}
          fontSize={10}
          fontWeight={600}
          letterSpacing="0.16em"
          dominantBaseline="middle"
        >
          {cat}
        </text>
      </g>

      {/* Delta body — single style, two lines if a semantic break exists */}
      {lines.map((line, i) => (
        <text
          key={i}
          x={SAFE_LEFT}
          y={72 + i * 22}
          fill={textBaseCss}
          fillOpacity={0.92}
          fontFamily={FONT}
          fontSize={18}
          fontWeight={600}
          dominantBaseline="hanging"
        >
          {line}
        </text>
      ))}
    </>
  );
}

/**
 * Insert a line break at the natural semantic break point in a thesis delta
 * string. Mirrors `splitDelta()` in skill src/cover-gen.ts.
 *
 * Priority order (returns the first match found):
 *   1. " vs "   — most common for delta comparisons
 *   2. " — "    — em-dash between clauses
 *   3. ":"      — colon (break AFTER the colon)
 *   4. " −" / " +" — signed-number boundary (catches single-clause deltas
 *                    like "Junior-analyst postings −18% YoY")
 *
 * If none match, returns the input as a single-element array. Never force
 * a break just to get two lines — the point is breathing room, not count.
 */
function splitDelta(s: string): string[] {
  if (!s) return [""];

  // Priority 1: " vs " (case-insensitive)
  const vsMatch = s.search(/\s+vs\s+/i);
  if (vsMatch > 0) {
    return [s.slice(0, vsMatch).trim(), s.slice(vsMatch + 1).replace(/^\s+/, "").trim()];
  }

  // Priority 2: " — " em-dash with surrounding spaces
  const emIdx = s.indexOf(" — ");
  if (emIdx > 0) {
    return [s.slice(0, emIdx).trim(), s.slice(emIdx + 1).replace(/^\s+/, "").trim()];
  }

  // Priority 3: ":" colon (break AFTER the colon)
  const colonIdx = s.indexOf(":");
  if (colonIdx > 0 && colonIdx < s.length - 1) {
    return [s.slice(0, colonIdx + 1).trim(), s.slice(colonIdx + 1).replace(/^\s+/, "").trim()];
  }

  // Priority 4: " −" or " +" — signed-number boundary
  const signIdx = s.search(/\s[−+]/);
  if (signIdx > 0) {
    return [s.slice(0, signIdx).trim(), s.slice(signIdx + 1).trim()];
  }

  return [s];
}

function WhatIfContent({ input, textBaseCss, heroCss, bgH }: {
  input: CoverInput; textBaseCss: string; heroCss: string; bgH: number;
}) {
  const label = (input.series ?? "EVENT STUDY").toUpperCase();
  const verb = (input.kind ?? "").toUpperCase();
  const hero = input.anchor ?? "";

  // Compute distribution bars at x=[180, 296], baseline y=120
  const bars = useMemo(() => buildBars(input.whatIfBars ?? [], bgH), [input.whatIfBars, bgH]);
  const zeroLineY = computeZeroLineY(bars);

  return (
    <>
      {/* Top label */}
      <CapsLabel x={SAFE_LEFT} y={20} text={label} fill={textBaseCss} />

      {/* Verb (caps small) */}
      <CapsLabel x={SAFE_LEFT} y={64} text={verb} fill={textBaseCss} />

      {/* Hero number — 40px Semi Bold per skill spec, glyph baseline at y≈120 */}
      <text
        x={SAFE_LEFT}
        y={80}
        fill={heroCss}
        fontFamily={FONT}
        fontSize={40}
        fontWeight={600}
        dominantBaseline="hanging"
        letterSpacing="-0.02em"
      >
        {hero}
      </text>

      {/* Zero line */}
      {bars.length > 0 && (
        <line
          x1={184}
          x2={292}
          y1={zeroLineY}
          y2={zeroLineY}
          stroke={textBaseCss}
          strokeOpacity={0.15}
          strokeWidth={0.5}
        />
      )}

      {/* Distribution bars */}
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
          fill={rgbToCss(b.color)}
          fillOpacity={0.55}
          rx={1}
        />
      ))}
    </>
  );
}

function buildBars(values: number[], bgH: number): BarSpec[] {
  if (!values.length) return [];
  const N = values.length;
  // Skill spec 2026-04-27: bars zone x=[184, 292], width 108, baseline y=120.
  const X0 = 184, X1 = 292, BASELINE = 120;
  const w = (X1 - X0 - 3 * (N - 1)) / N;
  const maxAbs = Math.max(...values.map((v) => Math.abs(v)), 0.0001);
  // Scale values to height range. Max bar ≈ 28px, min visible ≈ 6px.
  const scale = 28 / maxAbs;
  // First pass: compute heights
  const heights = values.map((v) => Math.max(Math.abs(v) * scale, 4));
  const maxNegH = values.reduce((acc, v, i) => v < 0 ? Math.max(acc, heights[i]) : acc, 0);
  const zeroLineY = BASELINE - maxNegH;

  return values.map((v, i) => {
    const isPositive = v >= 0;
    const h = heights[i];
    const x = X0 + i * (w + 3);
    const y = isPositive ? zeroLineY - h : zeroLineY;
    return {
      x, y, width: w, height: h,
      color: barColorFor(bgH, isPositive),
      isPositive,
    };
  });
}

function computeZeroLineY(bars: BarSpec[]): number {
  if (!bars.length) return 120;
  // Re-derive: maxNegH is the height of the largest negative bar
  const negHeights = bars.filter((b) => !b.isPositive).map((b) => b.height);
  const maxNegH = negHeights.length ? Math.max(...negHeights) : 0;
  return 120 - maxNegH;
}

function GeneralContent({ input, textBaseCss }: { input: CoverInput; textBaseCss: string }) {
  const kind = (input.kind ?? "FEED").toUpperCase();
  const pulse = input.anchor ?? "";
  const series = (input.series ?? "").toUpperCase();
  return (
    <>
      <CapsLabel x={SAFE_LEFT} y={24} text={kind} fill={textBaseCss} />
      <text
        x={SAFE_LEFT}
        y={66}
        fill={textBaseCss}
        fillOpacity={0.92}
        fontFamily={FONT}
        fontSize={28}
        fontWeight={600}
        dominantBaseline="hanging"
      >
        {pulse}
      </text>
      {series && (
        <CapsLabel x={SAFE_LEFT} y={106} text={series} fill={textBaseCss} fontSize={10} />
      )}
    </>
  );
}

// Re-export hue helper for callers that want to construct custom semantic colors.
export { hslToRgb, blendHue };

/* ---------- Live update ---------- */

const LIVE_INTERVAL_MS = 10_000;

/**
 * For thesis & what-if templates, returns a perturbed copy of `input` that
 * refreshes every 10s after an initial `staggerMs` delay. For other templates,
 * returns the original `input` unchanged.
 *
 * Re-derived numbers ride on the input's existing strings — we regex out
 * signed percentages and jitter them by ±range, preserving sign and format.
 */
function useLiveInput(input: CoverInput, staggerMs: number): CoverInput {
  const isLive = input.template === "thesis" || input.template === "what-if";
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isLive) return;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startId = setTimeout(() => {
      setTick((t) => t + 1);
      intervalId = setInterval(() => setTick((t) => t + 1), LIVE_INTERVAL_MS);
    }, staggerMs);
    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLive, staggerMs]);

  return useMemo(() => {
    if (!isLive || tick === 0) return input;
    return perturbInput(input, tick);
  }, [input, tick, isLive]);
}

function perturbInput(input: CoverInput, tick: number): CoverInput {
  if (input.template === "thesis") {
    return {
      ...input,
      kind: input.kind ? jitterPercents(input.kind, 0.6, tick) : input.kind,
    };
  }
  if (input.template === "what-if") {
    const newBars = input.whatIfBars?.map((v, i) => {
      const offset = pseudoRandom(tick * 9301 + i * 49297) * 0.7;
      return Number((v + offset).toFixed(1));
    });
    return {
      ...input,
      anchor: input.anchor ? jitterPercents(input.anchor, 0.8, tick) : input.anchor,
      whatIfBars: newBars,
    };
  }
  return input;
}

/** Replace each signed percentage in `s` with a jittered version. */
function jitterPercents(s: string, range: number, tick: number): string {
  let i = 0;
  return s.replace(/([+\-−])(\d+\.\d+)%/g, (_, sign, num) => {
    const offset = pseudoRandom(tick * 1009 + (i++ + 1) * 7919) * range;
    let next = parseFloat(num) + offset;
    if (next < 0.1) next = 0.1; // floor — sign stays from the captured `sign`
    return `${sign}${next.toFixed(1)}%`;
  });
}

/** Deterministic pseudo-random in [-0.5, 0.5] from a seed. */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10_000;
  return (x - Math.floor(x)) - 0.5;
}
