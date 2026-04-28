/**
 * [INPUT]: list of ExplorePlaybook
 * [OUTPUT]: hero carousel — promotional row above the playbook grid
 * [POS]: Page — Explore (replaces the old HeroSpotlight)
 *
 * Per Figma node 3297:18875:
 *   - Card geometry: 220px height, 16px radius, 1px border @7% black
 *   - Layout: left text column (avatar + headline + subtitle + chips/stats),
 *     right cover preview (white card top-rounded only, holds the playbook
 *     screenshot)
 *   - Background: gradient derived from the playbook's cover bg, NOT a fixed
 *     warm tan. For brand-override cards (BTC/NVDA/AAPL) the gradient is
 *     alpha-on-white(brandColor); for hashed-bg cards it's a wider stretch
 *     of the cover's HSL — same visual family as the cover so the hero feels
 *     like an enlarged, atmospheric extension of the same playbook.
 *   - Auto-cycle every 5s; pauses on hover
 *   - Arrows visible only on hover; click to step
 *   - Dot indicators below
 *   - Responsive: N = ⌊W ÷ 812⌋ cards per row at the larger breakpoints
 *     (single-card 812–1623, two-up 1624–2435, three-up ≥ 2436); section
 *     hidden when container < 812
 */

import { useEffect, useRef, useState } from "react";
import type { ExplorePlaybook } from "@/pages/Explore2";
import { PlaybookCover } from "@/lib/playbook-cover/PlaybookCover";
import { generateCover } from "@/lib/playbook-cover/cover-gen";
import { hslToRgb, rgbToCss } from "@/lib/playbook-cover/color";
import { Avatar } from "@/app/components/shared/Avatar";
import { CdnIcon } from "@/app/components/shared/CdnIcon";

const CYCLE_MS = 5000;

export function HeroCarousel({ playbooks }: { playbooks: ExplorePlaybook[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Track container width for the responsive cards-per-row formula.
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setContainerWidth(e.contentRect.width);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // N = ⌊W ÷ 812⌋ per Figma 3297:18875 spec — but never more than the
  // playbook list length.
  const cardsPerRow = containerWidth >= 812 ? Math.min(playbooks.length, Math.floor(containerWidth / 812)) : 0;

  // Cap idx so the visible row is ALWAYS full — never partial-N with empty
  // slots. With L playbooks and N visible, valid idx range is [0, L-N], so
  // there are L-N+1 possible positions. Auto-cycle and arrow nav both
  // respect this cap; the dots show one per valid position.
  const lastIdx = Math.max(0, playbooks.length - cardsPerRow);
  const positions = lastIdx + 1;

  // Clamp current idx whenever cardsPerRow changes (e.g., resize from 1-up
  // to 2-up at idx that's now out of range).
  useEffect(() => {
    if (idx > lastIdx) setIdx(lastIdx);
  }, [idx, lastIdx]);

  // Auto-cycle every 5s, paused on hover.
  useEffect(() => {
    if (paused || positions <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % positions), CYCLE_MS);
    return () => clearInterval(t);
  }, [paused, positions]);

  const next = () => setIdx((i) => (i + 1) % positions);
  const prev = () => setIdx((i) => (i - 1 + positions) % positions);

  // Slide-track animation: render all playbooks in a single horizontal strip,
  // translate the strip by `idx` slots. Each "slot" is one card-position-with-
  // gap. The strip lives inside an `overflow: hidden` viewport so off-screen
  // cards are clipped during the slide.
  //
  // Wraparound (idx N-1 → 0) is handled by suppressing the transition for one
  // frame — the strip jumps back to the start, then the next forward step
  // animates normally. Otherwise the strip would slide N-1 cards backward in
  // a single jarring motion.
  const [transition, setTransition] = useState(true);
  const lastIdxRef = useRef(idx);
  useEffect(() => {
    // Wraparound: from the LAST valid position back to 0.
    const wrapped = lastIdxRef.current === lastIdx && idx === 0;
    if (wrapped) {
      setTransition(false);
      // Re-enable transition on the next frame so the next change animates.
      requestAnimationFrame(() => requestAnimationFrame(() => setTransition(true)));
    } else if (!transition) {
      setTransition(true);
    }
    lastIdxRef.current = idx;
  }, [idx, lastIdx]);

  // Each card slot is sized in pixels so the strip translation lines up
  // exactly card-by-card without drift:
  //   slotW = (viewport − gap·(N−1)) / N    ← so N slots + (N−1) gaps == viewport
  //   step  = slotW + gap                   ← the per-index translation distance
  // (Using percent + extra px math drifts because the percent denominator is
  // the strip width, not the viewport width.)
  const gapPx = 24;
  const slotW = cardsPerRow > 0
    ? (containerWidth - gapPx * (cardsPerRow - 1)) / cardsPerRow
    : 0;
  const stepPx = slotW + gapPx;
  const offsetPx = idx * stepPx;

  // Hide entirely when container is too narrow (per Figma rule).
  return (
    <div ref={wrapRef} style={{ width: "100%", maxWidth: 2400 }}>
      {cardsPerRow > 0 && (
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ position: "relative" }}
        >
          {/* Viewport — clips off-screen cards */}
          <div style={{ overflow: "hidden", borderRadius: 16 }}>
            <div
              style={{
                display: "flex",
                gap: gapPx,
                transform: `translateX(${-offsetPx}px)`,
                transition: transition
                  ? "transform 480ms cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
                willChange: "transform",
              }}
            >
              {playbooks.map((pb) => (
                <div
                  key={pb.id}
                  style={{
                    flex: `0 0 ${slotW}px`,
                  }}
                >
                  <HeroCarouselCard playbook={pb} />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows (visible only on hover via CSS opacity) */}
          {positions > 1 && (
            <>
              <ArrowButton direction="left" onClick={prev} hovered={paused} />
              <ArrowButton direction="right" onClick={next} hovered={paused} />
            </>
          )}

          {/* Dot indicators — one per valid position (so partial-row positions
              never get a dot). At 6 cards / 2-up that's 5 positions, not 6. */}
          {positions > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {Array.from({ length: positions }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 16 : 4,
                    height: 4,
                    borderRadius: 2,
                    border: "none",
                    background: i === idx ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 200ms ease",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- single hero card ---------- */

function HeroCarouselCard({ playbook: p }: { playbook: ExplorePlaybook }) {
  // Derive the card gradient from the playbook's cover bg using the same
  // logic as the cover itself (alpha-on-white for brand, hashed HSL otherwise).
  const cover = generateCover(p.cover);
  const { H, S, L } = cover.bg.hsl;
  // Build a 3-stop gradient from light (top-left) → mid → deeper (bottom-right).
  // For brand cards the bg.hsl is the brand's true HSL; we build alpha-on-white
  // tints at three depths. For hashed cards we step around the bg's L axis.
  const isBrand = cover.bg.path === "brand";
  let gradStops: [string, string, string];
  if (isBrand) {
    const top = hslToRgb(H, Math.min(S, 0.65), 0.96);
    const mid = hslToRgb(H, Math.min(S, 0.65), 0.92);
    const bot = hslToRgb(H, Math.min(S, 0.55), 0.86);
    gradStops = [rgbToCss(top), rgbToCss(mid), rgbToCss(bot)];
  } else {
    const top = hslToRgb(H, Math.min(S + 0.04, 0.30), Math.min(L + 0.02, 0.97));
    const mid = hslToRgb(H, Math.min(S + 0.06, 0.32), L);
    const bot = hslToRgb(H, Math.min(S + 0.10, 0.36), Math.max(L - 0.06, 0.86));
    gradStops = [rgbToCss(top), rgbToCss(mid), rgbToCss(bot)];
  }

  // Chip color — deep tint from the same hue family.
  const chipBg = rgbToCss(hslToRgb(H, Math.min(S + 0.10, 0.34), Math.max(L - 0.10, 0.82)));
  const chipFg = rgbToCss(hslToRgb(H, Math.min(S + 0.18, 0.40), 0.30));

  return (
    <div
      style={{
        position: "relative",
        height: 220,
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.07)",
        background: `linear-gradient(to right, ${gradStops[0]} 0%, ${gradStops[1]} 55%, ${gradStops[2]} 100%)`,
        display: "flex",
        alignItems: "center",
        gap: 48,
        paddingLeft: 40,
        paddingRight: 24,
        paddingTop: 24,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Left — text column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
          minWidth: 200,
          overflow: "hidden",
        }}
      >
        {/* Byline */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Avatar name={p.creator} size={16} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              lineHeight: "16px",
              color: "rgba(0,0,0,0.9)",
            }}
          >
            {p.creator}
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <h3
            style={{
              fontFamily: "'Delight', sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "26px",
              letterSpacing: -0.2,
              color: "rgba(0,0,0,0.9)",
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
              fontSize: 13,
              lineHeight: "20px",
              color: "rgba(0,0,0,0.7)",
              margin: 0,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {p.description}
          </p>
        </div>

        {/* Chips + counters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <Chip label={templateLabel(p.cover.template)} bg={chipBg} fg={chipFg} />
          {p.tickers.slice(0, 1).map((t) => (
            <Chip key={t} label={t} bg={chipBg} fg={chipFg} />
          ))}
          <Counter icon="show-l" value={fmtCount(p.stars)} />
          <Counter icon="remix-l" value={fmtCount(p.remixes)} />
        </div>
      </div>

      {/* Right — cover preview. Both bottom corners are sharp (per design
          intent); the parent card's `overflow: hidden` + 16px outer radius
          shapes the bottom-right curve naturally via clipping mask. */}
      <div
        style={{
          flex: 1,
          maxWidth: 468,
          minWidth: 240,
          height: "100%",
          background: "white",
          border: "0.5px solid rgba(0,0,0,0.07)",
          borderBottom: "none",
          borderRadius: "14px 14px 0 0",
          overflow: "hidden",
          alignSelf: "flex-end",
        }}
      >
        <div style={{ width: "100%", aspectRatio: "320 / 140" }}>
          <PlaybookCover input={p.cover} />
        </div>
      </div>
    </div>
  );
}

function Chip({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px 3px 7px",
        borderRadius: 999,
        background: bg,
        color: fg,
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        fontSize: 11,
        lineHeight: "14px",
        letterSpacing: 0.05,
        whiteSpace: "nowrap",
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
        color: "rgba(0,0,0,0.7)",
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
        lineHeight: "16px",
      }}
    >
      <CdnIcon name={icon} size={14} color="rgba(0,0,0,0.7)" />
      {value}
    </span>
  );
}

function ArrowButton({
  direction, onClick, hovered,
}: {
  direction: "left" | "right";
  onClick: () => void;
  hovered: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [direction]: -21,
        width: 40,
        height: 40,
        borderRadius: 20,
        background: "white",
        border: "1px solid rgba(0,0,0,0.3)",
        cursor: "pointer",
        opacity: hovered ? 1 : 0,
        transition: "opacity 200ms ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        zIndex: 2,
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
  if (t === "screener") return "Smart Screener";
  if (t === "thesis") return "Theme Tracker";
  if (t === "what-if") return "What If";
  return "Others";
}

function fmtCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
