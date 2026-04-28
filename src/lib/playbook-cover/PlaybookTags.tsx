/**
 * [INPUT]: list of tags (template + subjects)
 * [OUTPUT]: single-line tag row with overflow-hide-only-fitting behaviour
 * [POS]: Component — used in Explore PlaybookCard above the metadata title
 *
 * Hides any tag that won't fully fit in the available row width. Measures
 * via a hidden ghost row, then renders only the prefix that fits.
 */

import { useLayoutEffect, useRef, useState } from "react";
import type { Template } from "./types";
import { BRAND_REGISTRY } from "./brand-registry";
import { BrandLogoMark } from "./BrandLogo";

export type Tag =
  | { kind: "template"; template: Template }
  | { kind: "subject"; label: string };

const TEMPLATE_LABEL: Record<Template, string> = {
  screener: "Screener",
  thesis: "Thesis",
  "what-if": "What-If",
  general: "General",
};

const TEMPLATE_STYLE: Record<Template, { bg: string; fg: string }> = {
  screener: { bg: "#ebf6f4", fg: "#0e493c" },
  thesis:   { bg: "#f4eee4", fg: "#38291c" },
  "what-if":{ bg: "#e8edf6", fg: "#1b2f4a" },
  general:  { bg: "#f0f0f0", fg: "#1a1a1a" },
};

const SUBJECT_STYLE = { bg: "#f2f2f2", fg: "rgba(0,0,0,0.65)" };

export function PlaybookTags({ tags, gap = 6 }: { tags: Tag[]; gap?: number }) {
  const ghostRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);

  useLayoutEffect(() => {
    const measure = () => {
      const ghost = ghostRef.current;
      const container = containerRef.current;
      if (!ghost || !container) return;
      const containerWidth = container.offsetWidth;
      const children = Array.from(ghost.children) as HTMLElement[];
      let used = 0;
      let count = 0;
      for (let i = 0; i < children.length; i++) {
        const w = children[i].offsetWidth + (i > 0 ? gap : 0);
        if (used + w > containerWidth) break;
        used += w;
        count++;
      }
      setVisibleCount(count);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [tags, gap]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        gap,
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
      }}
    >
      {/* Ghost: invisible measurement row of all tags */}
      <div
        ref={ghostRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          display: "flex",
          gap,
          whiteSpace: "nowrap",
        }}
      >
        {tags.map((tag, i) => (
          <TagPill key={`g-${i}`} tag={tag} />
        ))}
      </div>
      {/* Real row: only the prefix that fits */}
      {tags.slice(0, visibleCount).map((tag, i) => (
        <TagPill key={i} tag={tag} />
      ))}
    </div>
  );
}

function TagPill({ tag }: { tag: Tag }) {
  if (tag.kind === "template") {
    const style = TEMPLATE_STYLE[tag.template];
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "2px 6px",
          borderRadius: 4,
          background: style.bg,
          flexShrink: 0,
        }}
      >
        <TemplateGlyph template={tag.template} color={style.fg} />
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            lineHeight: "14px",
            fontWeight: 500,
            color: style.fg,
            whiteSpace: "nowrap",
          }}
        >
          {TEMPLATE_LABEL[tag.template]}
        </span>
      </div>
    );
  }
  // Brand-ticker subject tags (e.g. "NVDA", "AAPL") get the brand mark
  // as a leading glyph — same treatment the cover icon uses, scaled down.
  const brand = BRAND_REGISTRY[tag.label];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: brand ? 4 : 0,
        padding: "2px 8px",
        borderRadius: 4,
        background: SUBJECT_STYLE.bg,
        flexShrink: 0,
      }}
    >
      {brand && (
        <BrandLogoMark
          slug={brand.logoSlug}
          color={brand.color}
          fallbackSymbol={brand.fallbackSymbol}
          size={10}
        />
      )}
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          lineHeight: "14px",
          fontWeight: 500,
          color: SUBJECT_STYLE.fg,
          whiteSpace: "nowrap",
        }}
      >
        {tag.label}
      </span>
    </div>
  );
}

/**
 * Per-template glyph paths from Figma "Tab/Home" instances (node 2787:25136):
 *   - Theme Tracker (thesis)  → lightbulb
 *   - Smart Screener (screener) → spiral target
 *   - What If (what-if)       → branching arrows
 * Each path is rendered inside its own viewBox; color picks up the
 * template's fg so the glyph reads as part of the pill text.
 */
const TEMPLATE_GLYPH: Record<Template, { viewBox: string; path: string }> = {
  thesis: {
    // Lightbulb glyph (Theme Tracker)
    viewBox: "0 0 12.2006 15.5935",
    path:
      "M9.01588 14.7023C9.22098 14.7442 9.37535 14.926 9.37535 15.1435C9.37523 15.3609 9.22091 15.5428 9.01588 15.5847L8.92535 15.5935H3.27487C3.02661 15.5933 2.825 15.3918 2.82487 15.1435C2.82487 14.8951 3.02653 14.6937 3.27487 14.6935H8.92535L9.01588 14.7023ZM5.95553 0.00171143C7.2363 -0.0286215 8.49465 0.344915 9.55113 1.06958C10.6075 1.79425 11.4087 2.83369 11.8416 4.03941C12.2744 5.24513 12.3171 6.55686 11.9628 7.78794C11.6085 9.01898 10.8751 10.1072 9.86754 10.8984L9.8649 10.9001C9.71317 11.0174 9.59019 11.1685 9.50543 11.3405C9.4207 11.5126 9.37577 11.7023 9.37535 11.8942V12.3169C9.37535 12.5861 9.26854 12.8447 9.07828 13.035C8.88796 13.2253 8.62935 13.332 8.36021 13.3321H3.84C3.57097 13.332 3.31308 13.2252 3.12282 13.035C2.93247 12.8447 2.82487 12.5861 2.82487 12.3169V11.8933H2.82575C2.82394 11.7035 2.77911 11.5163 2.69567 11.3458C2.61166 11.1741 2.48979 11.0237 2.33971 10.9054V10.9045C1.61434 10.3399 1.02674 9.61763 0.62145 8.79253C0.266415 8.06965 0.0587949 7.2844 0.0106106 6.48277L6.37548e-05 6.13911C-0.015007 2.83034 2.64371 0.07823 5.95553 0.00171143ZM5.97662 0.901711C3.1583 0.966666 0.887372 3.3134 0.900063 6.13472V6.1356C0.902629 6.91938 1.08362 7.69264 1.42916 8.39614C1.77467 9.09951 2.2757 9.71507 2.8943 10.1961L2.63414 10.531L2.89694 10.1979C3.15313 10.3997 3.36086 10.6573 3.50426 10.9502C3.6475 11.243 3.72261 11.5647 3.72487 11.8907L3.72574 11.8933H3.72487V12.3169C3.72487 12.3474 3.73758 12.3771 3.75914 12.3987C3.78063 12.4201 3.80966 12.432 3.84 12.4321H8.36021C8.39066 12.432 8.42041 12.4202 8.44195 12.3987C8.46343 12.3771 8.47535 12.3474 8.47535 12.3169V11.8924C8.47604 11.5634 8.5524 11.2385 8.69771 10.9432C8.82489 10.6849 9.00215 10.4547 9.2189 10.2665L9.3147 10.1882C10.1721 9.51397 10.7963 8.5866 11.098 7.53833C11.3999 6.48901 11.3632 5.3712 10.9943 4.34351C10.6253 3.31562 9.94198 2.43002 9.04136 1.81226C8.14076 1.19454 7.0684 0.875859 5.97662 0.901711ZM6.7483 2.32554C7.53058 2.45824 8.25283 2.83042 8.81461 3.39077C9.37641 3.95116 9.75044 4.67245 9.88511 5.45445C9.92727 5.69932 9.76258 5.93253 9.51773 5.97476C9.27286 6.01689 9.0405 5.85223 8.9983 5.60738C8.89526 5.00893 8.60821 4.45682 8.17828 4.02798C7.74839 3.59933 7.19567 3.31472 6.59713 3.21323C6.35228 3.17154 6.18735 2.93872 6.22887 2.6938C6.27062 2.44902 6.50342 2.28403 6.7483 2.32554Z",
  },
  screener: {
    // Spiral target glyph (Smart Screener)
    viewBox: "0 0 15.3002 15.3005",
    path:
      "M7.98564 0.00735514C9.74552 0.0846888 11.419 0.768451 12.7291 1.93216L14.0818 0.580402C14.2575 0.404928 14.5424 0.404839 14.7181 0.580402C14.8938 0.756062 14.8936 1.04098 14.7181 1.21673L13.1299 2.80404C13.112 2.83286 13.0917 2.86077 13.0666 2.88578C13.0419 2.91038 13.0141 2.9305 12.9858 2.94818L7.96806 7.96674C7.79233 8.14247 7.50747 8.14247 7.33173 7.96674C7.15609 7.79099 7.15603 7.50611 7.33173 7.33041L9.36993 5.29134C8.94576 4.98278 8.445 4.79049 7.91709 4.74291C7.23799 4.68172 6.5587 4.86098 5.99754 5.24828C5.4364 5.63573 5.02793 6.20784 4.84441 6.86459C4.66103 7.52131 4.71389 8.22177 4.99295 8.84389C5.2721 9.46598 5.76037 9.97068 6.37284 10.2704C6.98552 10.57 7.68428 10.6456 8.34687 10.4839C9.0092 10.3222 9.59433 9.93405 10.0001 9.38617C10.4058 8.8382 10.6074 8.16491 10.5688 7.48422C10.5548 7.23622 10.7444 7.02282 10.9924 7.00873C11.2403 6.99484 11.4527 7.18539 11.467 7.43324C11.5175 8.32393 11.2543 9.20441 10.7234 9.92142C10.1925 10.6384 9.42715 11.1468 8.56045 11.3584C7.69357 11.5699 6.7798 11.4709 5.97821 11.0789C5.17657 10.6869 4.53738 10.0263 4.17205 9.21215C3.80688 8.39808 3.7378 7.48135 3.97781 6.62201C4.21795 5.76281 4.75186 5.01426 5.48602 4.50736C6.22027 4.00055 7.10935 3.76724 7.99795 3.8473C8.736 3.91386 9.43464 4.19428 10.0124 4.64798L12.091 2.57025C10.9411 1.56496 9.48103 0.973917 7.94609 0.906477C6.25645 0.832345 4.5999 1.39566 3.30544 2.48411C2.01103 3.57262 1.17211 5.10821 0.955235 6.78549C0.738566 8.46269 1.15972 10.1603 2.13473 11.5421C3.10991 12.9241 4.5686 13.8895 6.22167 14.2474C7.87459 14.6052 9.60158 14.3295 11.0609 13.4748C12.5203 12.6201 13.6064 11.2482 14.1029 9.63139C14.5991 8.01472 14.4707 6.27012 13.7425 4.74378C13.6357 4.51963 13.7303 4.25145 13.9543 4.14437C14.1785 4.03759 14.4475 4.1322 14.5546 4.35619C15.3799 6.08616 15.5259 8.0636 14.9633 9.89594C14.4007 11.7283 13.1702 13.283 11.5162 14.2518C9.86217 15.2205 7.90439 15.5328 6.03094 15.1272C4.15749 14.7215 2.50428 13.6269 1.39908 12.0607C0.294149 10.4946 -0.182546 8.57032 0.0631404 6.66947C0.308977 4.76863 1.2593 3.02865 2.72624 1.79505C4.19328 0.561536 6.07076 -0.076659 7.98564 0.00735514Z",
  },
  "what-if": {
    // Branching arrows glyph (What If)
    viewBox: "0 0 15.2999 13.4999",
    path:
      "M0.45 1.79997C2.28018 1.79997 3.72754 2.02705 4.95615 2.76413C6.18607 3.50209 7.13496 4.71354 8.05254 6.54871C8.93488 8.31337 9.7862 9.35208 10.8062 9.96414C11.5964 10.4383 12.5254 10.6766 13.725 10.7613L12.7318 9.76814C12.5561 9.59242 12.5561 9.30755 12.7318 9.13181C12.9076 8.95608 13.1924 8.95608 13.3682 9.13181L15.1682 10.9318C15.1986 10.9623 15.2221 10.997 15.242 11.0329C15.2641 11.0727 15.282 11.1152 15.2912 11.1612C15.3029 11.2195 15.3028 11.2796 15.2912 11.3379C15.2821 11.3839 15.264 11.4264 15.242 11.4662C15.222 11.5023 15.1988 11.5375 15.1682 11.5681L13.3682 13.3681C13.1924 13.5438 12.9076 13.5438 12.7318 13.3681C12.5561 13.1924 12.5561 12.9076 12.7318 12.7318L13.7936 11.6692C12.448 11.5873 11.326 11.325 10.3438 10.7358C9.11393 9.99787 8.16504 8.7864 7.24746 6.95124C6.36512 5.18657 5.5138 4.14788 4.49385 3.53581C3.47252 2.92301 2.21969 2.69997 0.45 2.69997C0.201483 2.69997 1.83216e-05 2.49848 0 2.24997C0 2.00144 0.201472 1.79997 0.45 1.79997ZM6.22529 8.28894C6.36947 8.08654 6.65041 8.03931 6.85283 8.18347C7.05522 8.32765 7.10245 8.60859 6.9583 8.81101C6.16592 9.92367 5.29338 10.6598 4.21787 11.1085C3.15373 11.5524 1.92599 11.7 0.45 11.7C0.201472 11.7 0 11.4985 0 11.25C0 11.0015 0.201472 10.8 0.45 10.8C1.87706 10.8 2.96722 10.6552 3.87158 10.2779C4.76465 9.9053 5.5117 9.29097 6.22529 8.28894ZM12.7318 0.131802C12.9076 -0.043934 13.1924 -0.043934 13.3682 0.131802L15.1682 1.9318C15.1986 1.96228 15.2221 1.99698 15.242 2.03288C15.2641 2.07266 15.282 2.11518 15.2912 2.1612C15.3029 2.21946 15.3028 2.27958 15.2912 2.33786C15.2821 2.38393 15.264 2.42634 15.242 2.46618C15.222 2.5023 15.1988 2.53749 15.1682 2.56813L13.3682 4.36814C13.1924 4.54382 12.9076 4.54379 12.7318 4.36814C12.5561 4.19241 12.5561 3.90755 12.7318 3.73181L13.7259 2.73688C12.8263 2.80026 12.0792 2.95052 11.4284 3.22204C10.5354 3.59465 9.7883 4.20898 9.07471 5.21101C8.93053 5.41341 8.64959 5.46064 8.44717 5.31648C8.24477 5.1723 8.19755 4.89136 8.3417 4.68894C9.13408 3.57628 10.0066 2.8402 11.0821 2.39147C11.8814 2.05804 12.7729 1.89107 13.7927 1.82897L12.7318 0.768131C12.5561 0.592405 12.5561 0.307541 12.7318 0.131802Z",
  },
  general: {
    // Three-dots glyph (Others) — kept for completeness; not actually rendered
    // since general cards don't show a template tag (anti-pattern A10).
    viewBox: "0 0 12.4199 2.16016",
    path:
      "M1.08008 0C1.67641 0.000158283 2.16016 0.483708 2.16016 1.08008C2.16016 1.67645 1.67641 2.16 1.08008 2.16016C0.483611 2.16016 0 1.67655 0 1.08008C0 0.483611 0.483611 0 1.08008 0ZM6.20996 0C6.80643 0 7.29004 0.483611 7.29004 1.08008C7.29004 1.67655 6.80643 2.16016 6.20996 2.16016C5.61349 2.16016 5.12988 1.67655 5.12988 1.08008C5.12988 0.483611 5.61349 6.44215e-08 6.20996 0ZM11.3398 0C11.9363 0 12.4199 0.483611 12.4199 1.08008C12.4199 1.67655 11.9363 2.16016 11.3398 2.16016C10.7435 2.16 10.2598 1.67645 10.2598 1.08008C10.2598 0.483708 10.7435 0.000158251 11.3398 0Z",
  },
};

function TemplateGlyph({ template, color }: { template: Template; color: string }) {
  const { viewBox, path } = TEMPLATE_GLYPH[template];
  return (
    <svg
      width={10}
      height={10}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      style={{ flexShrink: 0, display: "block" }}
    >
      <path fill={color} d={path} />
    </svg>
  );
}

/** Build the full tag list for a playbook in priority order. */
const DOMAIN_LABEL: Record<string, string> = {
  tech: "Tech",
  software: "Software",
  ai: "AI",
  crypto: "Crypto",
  dividend: "Dividend",
  value: "Value",
  growth: "Growth",
  momentum: "Momentum",
  defense: "Defense",
  energy: "Energy",
  renewables: "Renewables",
  biotech: "Biotech",
  healthcare: "Healthcare",
  retail: "Retail",
  consumer_staples: "Staples",
  real_estate: "REIT",
  banks: "Banks",
  fed: "Fed",
  macro: "Macro",
  rates: "Rates",
  fx: "FX",
  commodities: "Commodities",
  trend_up: "Bullish",
  trend_down: "Bearish",
  trend_flat: "Flat",
  event_study: "Event Study",
  earnings: "Earnings",
  guide: "Guide",
  weekly: "Weekly",
  review: "Review",
  watchlist: "Watchlist",
  alerts: "Alerts",
  leaderboard: "Leaderboard",
};

export function buildTags(opts: {
  template: Template;
  domain?: string;
  tickers: string[];
}): Tag[] {
  const tags: Tag[] = [];
  // General is the fallback / catch-all template — its absence of a category
  // is the point, so we don't show a template tag. (skill: "general is the
  // absence of a template, not its own category" — A10 anti-pattern.)
  if (opts.template !== "general") {
    tags.push({ kind: "template", template: opts.template });
  }
  if (opts.domain && DOMAIN_LABEL[opts.domain]) {
    tags.push({ kind: "subject", label: DOMAIN_LABEL[opts.domain] });
  }
  for (const t of opts.tickers) {
    if (t.length <= 5) tags.push({ kind: "subject", label: t });
  }
  return tags;
}
