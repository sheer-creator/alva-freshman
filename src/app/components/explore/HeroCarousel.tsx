/**
 * [INPUT]: list of ExplorePlaybook
 * [OUTPUT]: hero carousel — single-card-with-peek promotional row
 * [POS]: Page — Explore (above the playbook grid)
 *
 * Per Figma 5461:50118 (regular hero), 5360:50066 (compact hero), and
 * 4145:11614 (cards-per-row formula).
 *
 * Sizes (cardW depends on viewport — see cardsPerRowFromSpan):
 *   - cardW ≥ 840 → "regular": 220 tall, right cover 348×196
 *   - 480 ≤ cardW < 840 → "compact": 136 tall, right cover 236×128
 *   - cardW < 480 → carousel hidden entirely
 *
 * Layout: each card sits centred in the viewport with 12 px peek slivers of
 * the prev/next card extending past the container edges. 16 px gap
 * everywhere (peek↔card and card↔card). Non-active cards render at 90 %
 * scale; transitioning to active they animate up to 100 %, and transitioning
 * away they animate back down to 90 %. The viewport clips horizontally only
 * (overflow-x: clip) so the cards' drop shadow can fall outside the
 * vertical edge instead of being chopped off.
 */

import { useEffect, useRef, useState } from "react";
import type { ExplorePlaybook } from "@/app/components/shared/PlaybookCard";
import { PlaybookCover } from "@/lib/playbook-cover/PlaybookCover";
import { generateCover } from "@/lib/playbook-cover/cover-gen";
import { hslToRgb, rgbToCss } from "@/lib/playbook-cover/color";
import { Avatar } from "@/app/components/shared/Avatar";
import { CdnIcon } from "@/app/components/shared/CdnIcon";

const CYCLE_MS = 5000;
const PEEK = 12;
const GAP = 16;
const PEEK_SCALE = 0.9;

type CardMode = "regular" | "compact";

/**
 * Cards-per-container formula — Figma 4145:11614 (2026-05-19 spec).
 *
 *   n      = ⌊ (W − 40 + 856) ÷ 856 ⌋
 *   W      = container width (visible carousel area, incl. peek + gap)
 *   gap    = 16
 *   peek   = 12
 *   gutter = 28 each side (peek + gap)   ← reserved on mobile too
 *   cardMin compact = 480
 *   cardMin wide    = 840
 *   card   = (W − 56 − (n − 1) · 16) ÷ n
 *
 *   W < 536         → hidden (W < cardMin(480) + gutter(56))
 *   536 ≤ W < 896   → 1 compact card · card = W − 56  (mobile/sidebar/drawer)
 *   896 ≤ W < 1752  → 1 wide card    · card = W − 56  (tablet/standard desktop)
 *   1752 ≤ W < 2608 → 2 wide cards   · each (W − 72) ÷ 2  (wide desktop)
 *   W ≥ 2608        → 3 wide cards   · each (W − 88) ÷ 3  (ultra-wide / 4K)
 *
 * Mobile is no longer a special-case; the same gutter is reserved on every
 * platform so the peek behavior is consistent.
 */
function layoutForContainer(W: number): { cardsPerRow: 0 | 1 | 2 | 3; mode: CardMode } {
  if (W < 536) return { cardsPerRow: 0, mode: "compact" };
  if (W < 896) return { cardsPerRow: 1, mode: "compact" };
  if (W < 1752) return { cardsPerRow: 1, mode: "regular" };
  if (W < 2608) return { cardsPerRow: 2, mode: "regular" };
  return { cardsPerRow: 3, mode: "regular" };
}

const CARD_HEIGHT = { regular: 220, compact: 136 } as const;

export function HeroCarousel({ playbooks, isMobile = false }: { playbooks: ExplorePlaybook[]; isMobile?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setContainerWidth(e.contentRect.width);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // W is the full container width (visible carousel area, incl. peek + gap),
  // per Figma 4145:11614. Same 28-px gutter is reserved on every platform.
  const W = containerWidth;
  const { cardsPerRow, mode } = layoutForContainer(W);
  const cardW = cardsPerRow === 0
    ? 0
    : (W - 56 - GAP * (cardsPerRow - 1)) / cardsPerRow;
  const cardH = cardsPerRow === 0 ? 0 : CARD_HEIGHT[mode];

  const lastIdx = Math.max(0, playbooks.length - cardsPerRow);
  const positions = lastIdx + 1;

  useEffect(() => {
    if (idx > lastIdx) setIdx(lastIdx);
  }, [idx, lastIdx]);

  useEffect(() => {
    if (paused || positions <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % positions), CYCLE_MS);
    return () => clearInterval(t);
  }, [paused, positions]);

  const next = () => setIdx((i) => (i + 1) % positions);
  const prev = () => setIdx((i) => (i - 1 + positions) % positions);

  const stepPx = cardW + GAP;
  const offsetPx = idx * stepPx;
  // Same 28-px gutter on every platform — peek slivers leak past on mobile
  // too per the 2026-05-19 spec.
  const startInset = PEEK + GAP;

  // The peek slivers + drop shadow both need to escape the viewport's
  // horizontal padding. We clip horizontally (overflow-x: clip) so peeks
  // get truncated at the container's edge, but allow vertical overflow so
  // the card shadow stays visible.
  const SHADOW_PAD = 28;

  return (
    <div ref={wrapRef} style={{ width: "100%" }}>
      {cardsPerRow > 0 && (
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Viewport: clips horizontally to truncate far-away cards at the
              page edge; vertical overflow stays visible so the card's drop
              shadow doesn't get sliced off. */}
          <div
            style={{
              position: "relative",
              overflowX: "clip",
              overflowY: "visible",
              paddingTop: SHADOW_PAD,
              paddingBottom: SHADOW_PAD,
              marginTop: -SHADOW_PAD,
              marginBottom: -SHADOW_PAD,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: GAP,
                paddingLeft: startInset,
                paddingRight: startInset,
                transform: `translateX(${-offsetPx}px)`,
                transition: "transform 480ms cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "transform",
              }}
            >
              {playbooks.map((pb, i) => {
                // A card is "active" (full scale) when it sits inside the
                // current visible row [idx, idx + cardsPerRow). Off-screen
                // and peek cards render at PEEK_SCALE so cycling shows a
                // clean in/out zoom. Peek slots scale from the edge facing
                // the active row so a 12-px sliver stays visible past the
                // viewport — scaling from "center" would pull the peek
                // edge back inside the viewport and the sliver disappears.
                const active = i >= idx && i < idx + cardsPerRow;
                const isLeftPeek = i < idx;
                const isRightPeek = i >= idx + cardsPerRow;
                const origin = active
                  ? "center center"
                  : isLeftPeek
                    ? "right center"
                    : isRightPeek
                      ? "left center"
                      : "center center";
                return (
                  <div
                    key={pb.id}
                    style={{
                      flex: `0 0 ${cardW}px`,
                      transform: `scale(${active ? 1 : PEEK_SCALE})`,
                      transformOrigin: origin,
                      transition: "transform 480ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <HeroCarouselCard playbook={pb} mode={mode} isMobile={isMobile} />
                  </div>
                );
              })}
            </div>

            {/* Hover arrows — only in the direction that has another slot
                to step to. At idx=0 there's no left peek so the left arrow
                stays hidden; mirror at idx=lastIdx. */}
            {!isMobile && cardH > 0 && (
              <>
                {idx > 0 && (
                  <HoverArrow
                    direction="left"
                    onClick={prev}
                    visible={paused}
                    top={SHADOW_PAD + cardH / 2}
                  />
                )}
                {idx < lastIdx && (
                  <HoverArrow
                    direction="right"
                    onClick={next}
                    visible={paused}
                    top={SHADOW_PAD + cardH / 2}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- single hero card ---------- */
/*
 * Two visually distinct layouts — gated by `mode`:
 *
 *   - regular (cardW ≥ 840) — Figma 5461:50119
 *       220 tall, asymmetric two-column. Left text column floats over the
 *       blurred bg with 36-px padding; right cover is an absolute 348×196
 *       inset panel sitting flush at bottom-right with a 23-px gutter and a
 *       drop shadow lifting it off the gradient. Includes byline + title +
 *       description + chips + counters.
 *
 *   - compact (cardW < 840) — Figma 5370:137803
 *       symmetric 50/50 two-column grid. Right column is a self-contained
 *       16:9 cover with 4-px outer padding and 12-px corner radius — NOT
 *       absolute, no shadow, no flush-to-bottom trick. Left column is
 *       byline + title + description ONLY (no chips, no counters); padded
 *       24-px horizontal and vertically centred via flex. Card height
 *       follows the cover aspect naturally.
 */

function HeroCarouselCard({
  playbook: p, mode, isMobile = false,
}: {
  playbook: ExplorePlaybook;
  mode: CardMode;
  isMobile?: boolean;
}) {
  const cover = generateCover(p.cover);
  const { H, S, L } = cover.bg.hsl;
  const isBrand = cover.bg.path === "brand";
  let gradStops: [string, string, string];
  if (isBrand) {
    const top = hslToRgb(H, Math.min(S, 0.55), 0.97);
    const mid = hslToRgb(H, Math.min(S, 0.55), 0.94);
    const bot = hslToRgb(H, Math.min(S, 0.50), 0.90);
    gradStops = [rgbToCss(top), rgbToCss(mid), rgbToCss(bot)];
  } else {
    const top = hslToRgb(H, Math.min(S + 0.02, 0.22), Math.min(L + 0.04, 0.98));
    const mid = hslToRgb(H, Math.min(S + 0.04, 0.24), Math.min(L + 0.02, 0.96));
    const bot = hslToRgb(H, Math.min(S + 0.06, 0.26), Math.max(L - 0.02, 0.90));
    gradStops = [rgbToCss(top), rgbToCss(mid), rgbToCss(bot)];
  }

  const cardBackground = isMobile
    ? `linear-gradient(135deg, ${gradStops[0]} 0%, ${gradStops[1]} 60%, ${gradStops[2]} 100%)`
    : `linear-gradient(to right, ${gradStops[0]} 0%, ${gradStops[1]} 55%, ${gradStops[2]} 100%)`;

  // Per Figma 4145:11614 the compact layout (50/50 split) is the canonical
  // form for mobile / sidebar / drawer too — same width range (W < 840),
  // same structure. So `isMobile` no longer gates which card to render.
  if (mode === "compact") {
    return <CompactHeroCard p={p} background={cardBackground} />;
  }
  return <RegularHeroCard p={p} background={cardBackground} isMobile={isMobile} />;
}

function RegularHeroCard({
  p, background, isMobile,
}: {
  p: ExplorePlaybook;
  background: string;
  isMobile: boolean;
}) {
  const ticker = p.tickers[0];
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: isMobile ? "auto" : 220,
        minHeight: isMobile ? 180 : undefined,
        borderRadius: 16,
        // Per Figma 5461:50119 — line/l12 + Shadow S (6 20 4).
        border: "1px solid var(--line-l12, rgba(0,0,0,0.12))",
        background,
        boxShadow: hovered
          ? "0 10px 24px 0 rgba(0,0,0,0.08)"
          : "0 6px 20px 0 rgba(0,0,0,0.04)",
        overflow: "hidden",
        boxSizing: "border-box",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 180ms cubic-bezier(0.2, 0, 0, 1), box-shadow 180ms cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      {/* Left text column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: isMobile ? "16px 16px 12px" : "36px 36px 28px",
          maxWidth: isMobile ? "100%" : "calc(100% - 396px)",
          height: "100%",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Avatar name={p.creator} size={24} />
          <span
            style={{
              fontFamily: "'Delight', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "20px",
              letterSpacing: 0.12,
              color: "var(--text-n7, rgba(0,0,0,0.7))",
            }}
          >
            {p.creator}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <h3
            style={{
              fontFamily: "'Delight', sans-serif",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: "28px",
              letterSpacing: 0.18,
              color: "var(--text-n7, rgba(0,0,0,0.7))",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {p.title}
          </h3>
          <p
            style={{
              fontFamily: "'Delight', sans-serif",
              fontSize: 12,
              lineHeight: "20px",
              letterSpacing: 0.12,
              color: "var(--text-n5, rgba(0,0,0,0.5))",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {p.description}
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", paddingTop: 12, flexWrap: "wrap" }}>
          <TemplateChip template={p.cover.template} creator={p.creator} />
          {ticker && <PlainChip label={ticker} />}
          <Counter icon="show-l" value={fmtCount(p.stars)} />
          <Counter icon="remix-l" value={fmtCount(p.remixes)} />
        </div>
      </div>

      {!isMobile && (
        <div
          style={{
            position: "absolute",
            right: 23,
            bottom: -1,
            width: 348,
            height: 196,
            background: "white",
            borderRadius: "8px 8px 0 0",
            borderTop: "1px solid rgba(255,255,255,0.7)",
            borderLeft: "1px solid rgba(255,255,255,0.7)",
            borderRight: "1px solid rgba(255,255,255,0.7)",
            overflow: "hidden",
            boxShadow: "0 10px 20px 0 rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ width: "100%", aspectRatio: "16 / 9" }}>
            <PlaybookCover input={p.cover} />
          </div>
        </div>
      )}
    </div>
  );
}

function CompactHeroCard({
  p, background,
}: {
  p: ExplorePlaybook;
  background: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        borderRadius: 16,
        // Per Figma 5461:50119 — line/l12 + Shadow S (6 20 4). Compact
        // uses the same chassis as regular.
        border: "1px solid var(--line-l12, rgba(0,0,0,0.12))",
        background,
        boxShadow: hovered
          ? "0 10px 24px 0 rgba(0,0,0,0.08)"
          : "0 6px 20px 0 rgba(0,0,0,0.04)",
        overflow: "hidden",
        boxSizing: "border-box",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 180ms cubic-bezier(0.2, 0, 0, 1), box-shadow 180ms cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      {/* Left column — byline + title + description, vertically centred. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: "0 24px",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Avatar name={p.creator} size={20} />
          <span
            style={{
              fontFamily: "'Delight', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "20px",
              letterSpacing: 0.12,
              color: "var(--text-n7, rgba(0,0,0,0.7))",
            }}
          >
            {p.creator}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <p
            style={{
              fontFamily: "'Delight', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "26px",
              letterSpacing: 0.16,
              color: "var(--text-n7, rgba(0,0,0,0.7))",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {p.title}
          </p>
          <p
            style={{
              fontFamily: "'Delight', sans-serif",
              fontSize: 12,
              lineHeight: "20px",
              letterSpacing: 0.12,
              color: "var(--text-n5, rgba(0,0,0,0.5))",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {p.description}
          </p>
        </div>
      </div>

      {/* Right column — 16:9 cover flush to the card's top/bottom edges (no
          vertical padding). Card height is driven by the cover's aspect
          ratio, so the cover image fills its half of the card edge-to-edge
          vertically. */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "1280 / 720",
            overflow: "hidden",
          }}
        >
          <PlaybookCover input={p.cover} />
        </div>
      </div>
    </div>
  );
}

/* ---------- chip / counter atoms ---------- */

function PlainChip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 9px",
        borderRadius: 100,
        border: "1px solid rgba(0,0,0,0.5)",
        fontFamily: "'Delight', sans-serif",
        fontSize: 12,
        lineHeight: "20px",
        letterSpacing: 0.12,
        color: "var(--text-n9, rgba(0,0,0,0.9))",
        whiteSpace: "nowrap",
        background: "transparent",
      }}
    >
      {label}
    </span>
  );
}

function Counter({ icon, value }: { icon: string; value: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        color: "var(--text-n9, rgba(0,0,0,0.9))",
        fontFamily: "'Delight', sans-serif",
        fontSize: 14,
        lineHeight: "22px",
        letterSpacing: 0.14,
        paddingLeft: 4,
      }}
    >
      <CdnIcon name={icon} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      {value}
    </span>
  );
}

/* ---------- hover arrow ---------- */

/**
 * Round arrow button — used by the hero carousel hover row.
 * Style spec: Figma 5526:303437 — 28×28 (we use 32 for a comfier hit target),
 * white bg, 0.5 px border @ rgba(0,0,0,0.2), 50 % radius, 14 px arrow glyph.
 */
function HoverArrow({
  direction, onClick, visible, top,
}: {
  direction: "left" | "right";
  onClick: () => void;
  visible: boolean;
  top: number;
}) {
  // Combine vertical centring with a horizontal slide-in: when hidden, the
  // button is parked 8 px past the viewport edge and fully transparent; on
  // hover it slides toward the active card and fades up to full opacity.
  // Slight scale ramp avoids the "instant pop" of a pure opacity tween.
  const slide = direction === "left" ? -8 : 8;
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top,
        [direction]: 16,
        width: 32,
        height: 32,
        borderRadius: 16,
        background: "var(--background-b0-container, white)",
        border: "0.5px solid var(--line-l2, rgba(0,0,0,0.2))",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: `translateY(-50%) translateX(${visible ? 0 : slide}px) scale(${visible ? 1 : 0.85})`,
        transformOrigin: direction === "left" ? "left center" : "right center",
        transition:
          "opacity 240ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        zIndex: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      } as React.CSSProperties}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === "left" ? <path d="M10 3L5 8l5 5" /> : <path d="M6 3l5 5-5 5" />}
      </svg>
    </button>
  );
}

/* ---------- helpers ---------- */

function templateLabel(t: ExplorePlaybook["cover"]["template"]): string {
  if (t === "screener") return "Backtest";
  if (t === "thesis") return "Thesis";
  if (t === "what-if") return "What If";
  return "Backtest";
}

function templateIcon(t: ExplorePlaybook["cover"]["template"]): string {
  if (t === "screener") return "target-l2";
  if (t === "thesis")   return "buld-l";
  if (t === "what-if")  return "remix-l";
  return "researcher-l1";
}

function TemplateChip({
  template, creator,
}: {
  template: ExplorePlaybook["cover"]["template"];
  creator: string;
}) {
  const isKol = template === "thesis" && /scope|jing|harry|yggyll/i.test(creator);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px",
        borderRadius: 100,
        border: "1px solid rgba(0,0,0,0.5)",
        fontFamily: "'Delight', sans-serif",
        fontSize: 12,
        lineHeight: "20px",
        letterSpacing: 0.12,
        color: "var(--text-n9, rgba(0,0,0,0.9))",
        whiteSpace: "nowrap",
        background: "transparent",
      }}
    >
      {isKol ? (
        <Avatar name={creator} size={12} />
      ) : (
        <CdnIcon name={templateIcon(template)} size={12} color="var(--text-n9, rgba(0,0,0,0.9))" />
      )}
      {templateLabel(template)}
    </span>
  );
}

function fmtCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

