/**
 * [INPUT]: AppShell, PulseIndicator, chart-theme, CdnIcon, Avatar
 * [OUTPUT]: Explore V2 — Hero Spotlight + Homepage-style Playbook card grid
 * [POS]: Page — Explore
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PlaybookCard, type ExplorePlaybook } from '@/app/components/shared/PlaybookCard';
import { HeroCarousel } from '@/app/components/explore/HeroCarousel';

/* ========== 数据结构 ========== */

/**
 * Playbook list mirrors the live alva.ai/explore catalog as of 2026-04-27.
 * 17 cards with the following distribution (random-shuffled order, no two
 * adjacent cards share a template):
 *   - 5 screener  · ranked/filtered ticker lists
 *   - 4 thesis    · ongoing themes with today's delta
 *   - 3 what-if   · event studies with distribution bars
 *   - 5 general   · feeds, alerts, leaderboards, dashboards, games
 *     of which 1 is portrait-override (person-subject)
 */
/**
 * Trending playbooks captured from alva.ai/explore on 2026-05-18. Each
 * entry mirrors the live record (title, description, tickers, view +
 * follow counters) and uses the actual screenshot thumbnail as its cover
 * via `coverImageUrl`.
 */
const PLAYBOOKS: ExplorePlaybook[] = [
  {
    id: 'salp-thesis',
    creator: 'alvin0617',
    title: 'SALP Thesis Tracker',
    description: 'Tracks Situational Awareness LP — Leopold Aschenbrenner\'s AI infrastructure fund. Based on actual Q4 2025 13F holdings across four layers: AI Cloud, Power, Photonics, and Semiconductors.',
    tickers: ['CRWV', 'CORZ', 'IREN', 'APLD'],
    pulse: 'active', stars: 14731, remixes: 68,
    cover: {
      template: 'thesis',
      title: 'SALP Thesis Tracker',
      author: 'alvin0617',
      tickers: ['CRWV', 'CORZ', 'IREN', 'APLD'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-00f7b5d8-5b41-47cb-a98d-f3f7cc5c5be8.webp',
    },
  },
  {
    id: 'humanoid-citrini-vf',
    creator: 'Lakel',
    title: 'Humanoid Robots Tracker',
    description: 'The humanoid robots thesis Citrini published in May 2025, now monitored and tracked daily. 75 names across 9 supply-chain layers, scored against fresh news + market data every weekday — with the read delivered to your phone.',
    tickers: ['TSLA', 'NVDA', 'RRX', 'ON'],
    pulse: 'active', stars: 480, remixes: 5,
    cover: {
      template: 'thesis',
      title: 'Humanoid Robots Tracker',
      author: 'Lakel',
      tickers: ['TSLA', 'NVDA', 'RRX', 'ON'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-faa0783d-4904-4e1e-9d9e-a142a6960793_Browserless.webp',
    },
  },
  {
    id: 'cls-long-thesis-alva',
    creator: 'Lakel',
    title: 'Long Thesis: Celestica (CLS)',
    description: 'Long-thesis playbook on Celestica (CLS), ported to the Alva visual chassis from the Citrini Research article dated Jul 31, 2023.',
    tickers: ['CLS'],
    pulse: 'active', stars: 236, remixes: 2,
    cover: {
      template: 'thesis',
      title: 'Long Thesis: Celestica (CLS)',
      author: 'Lakel',
      tickers: ['CLS'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-d73c00b6-39a8-47de-a0fa-e2307b6ca088_Browserless.webp',
    },
  },
  {
    id: 'amd-deep-dive',
    creator: 'Lakel',
    title: 'AMD Deep-Dive',
    description: 'Single-stock deep-dive on Advanced Micro Devices (AMD)',
    tickers: ['AMD'],
    pulse: 'active', stars: 167, remixes: 1,
    cover: {
      template: 'thesis',
      title: 'AMD Deep-Dive',
      author: 'Lakel',
      tickers: ['AMD'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-a43bb55b-e2bc-436f-b34c-ca5ed45d7f3c_Browserless.webp',
    },
  },
  {
    id: 'iran-conflict-digest',
    creator: 'tianqi',
    title: 'Iran Conflict Digest',
    description: 'Daily classified digest of Iran military ops, nuclear program, Strait of Hormuz, regional proxies, and energy-market risk. Automated escalation classification, two-tier Brave search.',
    tickers: [],
    pulse: 'active', stars: 188, remixes: 2,
    cover: {
      template: 'thesis',
      title: 'Iran Conflict Digest',
      author: 'tianqi',
      tickers: [],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-e9150041-4a33-4ca0-9862-1b9466e76964_Browserless.webp',
    },
  },
  {
    id: 'shanghaojin-tweet-trader',
    creator: 'furyfrog1993',
    title: 'Herman Jin Tweet Trader',
    description: 'Backtest of @shanghaojin\'s tweet signals · 3 holding strategies · AI Trader Profile · Refreshed hourly',
    tickers: ['NVDA', 'ICG', 'AVGO', 'GOOG'],
    pulse: 'active', stars: 477, remixes: 3,
    cover: {
      template: 'thesis',
      title: 'Herman Jin Tweet Trader',
      author: 'furyfrog1993',
      tickers: ['NVDA', 'ICG', 'AVGO', 'GOOG'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-9f150e82-d3a6-4ce6-a81c-d3db7d2a2414_Browserless.webp',
    },
  },
  {
    id: 'mag7-capex',
    creator: 'sirius.shen',
    title: 'AI Infra Stocks Tracker',
    description: 'Daily verification of the three AI-infra thesis pillars: Mag7 hyperscaler capex direction, ASIC vs GPU share-take, and real beneficiary revenue translation across optical / HBM / enterprise-AI storage. Tracks an 18-name basket vs SMH with ADK-narrated thesis-divergence findings.',
    tickers: ['GOOG', 'MSFT', 'META', 'AMZN'],
    pulse: 'active', stars: 2317, remixes: 7,
    cover: {
      template: 'thesis',
      title: 'AI Infra Stocks Tracker',
      author: 'sirius.shen',
      tickers: ['GOOG', 'MSFT', 'META', 'AMZN'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-dcf0fe01-30e7-48a2-9773-9b5823e23292.webp',
    },
  },
  {
    id: 'korea-semi-raw-numbers',
    creator: 'Blue',
    title: 'Korea Semi Raw Numbers',
    description: 'Bare-bones KCS monitor for the two HS lines from the KOL post: DRAM/HBM (HS 8542.32) and SSD (HS 8523.51, the modern home after HS 8471.70.4010 was retired). Monthly export USD, weight, and implied unit price per group. No commentary, no equity proxies — just the raw numbers.',
    tickers: [],
    pulse: 'active', stars: 710, remixes: 10,
    cover: {
      template: 'thesis',
      title: 'Korea Semi Raw Numbers',
      author: 'Blue',
      tickers: [],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-12812480-54ea-4d45-ab5f-063eebe9182b.webp',
    },
  },
  {
    id: 'miner-ai-pivot',
    creator: 'alvin0617',
    title: 'Miner AI Pivot Tracker',
    description: '9 Bitcoin miners pivoting to AI/HPC, tracked through Leopold Aschenbrenner\'s \'power is the bottleneck\' lens. Daily quant snapshot + ADK divergence-finder anchored to three pillars: power capacity & energization, AI/HPC contract translation, and the mining-economics floor. Alpha measured vs BTC, SPY, and WGMI.',
    tickers: ['WULF', 'CORZ', 'CIFR', 'HCM'],
    pulse: 'active', stars: 58, remixes: 1,
    cover: {
      template: 'thesis',
      title: 'Miner AI Pivot Tracker',
      author: 'alvin0617',
      tickers: ['WULF', 'CORZ', 'CIFR', 'HCM'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-1eb4577d-d638-4feb-9724-cb693e490f8f_Browserless.webp',
    },
  },
  {
    id: 'kol-tweet-trader-leaderboard',
    creator: 'vernon',
    title: 'KOL Tweet Trader Leaderboard',
    description: 'Top 50 financial KOLs ALVA tracks via per-handle tweet-trader campaign feeds — ranked by audited Score Index, win rate, and 90D backtest PnL.',
    tickers: [],
    pulse: 'active', stars: 44, remixes: 1,
    cover: {
      template: 'thesis',
      title: 'KOL Tweet Trader Leaderboard',
      author: 'vernon',
      tickers: [],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-8c76f2b2-7833-42a5-9ee5-6c823d4d6c54_Browserless.webp',
    },
  },
  {
    id: 'trump-china-tracker',
    creator: 'ivan',
    title: 'Trump China Trade Tracker',
    description: 'CEO DELEGATION TRACKER — US stocks tied to Trump\'s Beijing trip and surrounding China headlines\nRanked by delegation status, China-business linkage, and live news flow — surfaces who wins or loses as deals are announced from Beijing',
    tickers: [],
    pulse: 'idle', stars: 211, remixes: 2,
    cover: {
      template: 'thesis',
      title: 'Trump China Trade Tracker',
      author: 'ivan',
      tickers: [],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/f2033ae6-8faf-44e4-8374-260cf91f62b0.png',
    },
  },
  {
    id: 'openai-rewire-screener',
    creator: 'MacKinsey',
    title: 'OpenAI Cloud Shift Screener',
    description: 'MEMORY CYCLE STAGE TRACKER — DRAM / NAND / HBM + semi hardware names with Early / Mid / Late / Down stage labels\nRanked by momentum, volume, and fundamental inflection — surfaces names where the memory cycle is turning',
    tickers: [],
    pulse: 'idle', stars: 382, remixes: 2,
    cover: {
      template: 'screener',
      title: 'OpenAI Cloud Shift Screener',
      author: 'MacKinsey',
      tickers: [],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-ee0a6c0f-b1bb-44b0-80d1-afa3549136d4.webp',
    },
  },
  {
    id: 'ai-infra-after-mag7-earnings',
    creator: 'MinnesotaCafe',
    title: 'AI Infra After Mag7 Earnings',
    description: 'AI infrastructure basket (equal-weight ANET/AVGO/MRVL/VRT/CRDO/NTAP) after each Mag7 earnings day, 2021-2025.',
    tickers: ['ANET', 'AVGO', 'MRVL', 'VRT'],
    pulse: 'idle', stars: 247, remixes: 2,
    cover: {
      template: 'what-if',
      title: 'AI Infra After Mag7 Earnings',
      author: 'MinnesotaCafe',
      tickers: ['ANET', 'AVGO', 'MRVL', 'VRT'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/a8a10b60-033a-42fb-876a-a02338e0e7c4.png',
    },
  },
  {
    id: 'aleabitoreddit-tweet-trader',
    creator: 'furyfrog1993',
    title: 'Serenity Tweet Trader',
    description: 'Backtest of @aleabitoreddit\'s tweet signals · 3 holding strategies · AI Trader Profile · Refreshed every 6h',
    tickers: ['AAOI', 'AXTI', 'LITE'],
    pulse: 'idle', stars: 333, remixes: 1,
    cover: {
      template: 'thesis',
      title: 'Serenity Tweet Trader',
      author: 'furyfrog1993',
      tickers: ['AAOI', 'AXTI', 'LITE'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-db3d8ffc-f3ad-413e-a517-cd9f0dd88681.webp',
    },
  },
  {
    id: 'memory-cycle-screener',
    creator: 'ivan',
    title: 'Memory Cycle Screener',
    description: 'MEMORY CYCLE STAGE TRACKER — DRAM / NAND / HBM + semi hardware names with Early / Mid / Late / Down stage labels\nRanked by momentum, volume, and fundamental inflection — surfaces names where the memory cycle is turning',
    tickers: [],
    pulse: 'idle', stars: 285, remixes: 4,
    cover: {
      template: 'screener',
      title: 'Memory Cycle Screener',
      author: 'ivan',
      tickers: [],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/81ae6530-4f7f-45f4-b13a-239407b2a16a.png',
    },
  },
  {
    id: 'kol-trade-ideas-digest-v3',
    creator: 'Brighton Knights',
    title: 'KOL Trade Ideas Digest',
    description: 'Daily digest of top trade calls from finance KOLs — clusters by asset, surfaces BTC directional splits, multi-asset singletons, and pushes fresh ideas every day.',
    tickers: ['BTC', 'ETH', 'SOL', 'NVDA'],
    pulse: 'idle', stars: 109, remixes: 2,
    cover: {
      template: 'thesis',
      title: 'KOL Trade Ideas Digest',
      author: 'Brighton Knights',
      tickers: ['BTC', 'ETH', 'SOL', 'NVDA'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/ee372f15-f980-4f09-9535-1bd3a34d0ff4.png',
    },
  },
  {
    id: 'commodity-pulse',
    creator: 'tianqi',
    title: 'Commodity Pulse',
    description: 'Commodity Pulse tracks fast-moving shifts across metals, energy, and critical minerals by combining market data, news, and social signals to surface what moved, why it matters, and what to watch next.',
    tickers: [],
    pulse: 'idle', stars: 35, remixes: 1,
    cover: {
      template: 'thesis',
      title: 'Commodity Pulse',
      author: 'tianqi',
      tickers: [],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/33357a50-8ae6-42da-9cb8-4c57faa4478a.png',
    },
  },
  {
    id: 'ai-infra-after-mag7-earnings-2975',
    creator: 'steven',
    title: 'AI Infra After Mag7 Earnings',
    description: 'AI infrastructure basket (equal-weight ANET/AVGO/MRVL/VRT/CRDO/NTAP) after each Mag7 earnings day, 2021-2025.',
    tickers: ['ANET', 'AVGO', 'MRVL', 'VRT'],
    pulse: 'idle', stars: 190, remixes: 1,
    cover: {
      template: 'what-if',
      title: 'AI Infra After Mag7 Earnings',
      author: 'steven',
      tickers: ['ANET', 'AVGO', 'MRVL', 'VRT'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-4ffa8414-1026-4508-b990-4567d5bc100a.webp',
    },
  },
  {
    id: 'market-anomaly-digest-v2',
    creator: 'B.D.E',
    title: 'Market Anomaly Digest',
    description: 'Daily anomaly digest — template-aligned. Tracks unusual price, volume, options, and volatility signals. Four frozen sections, one pushed card per day.',
    tickers: [],
    pulse: 'idle', stars: 100, remixes: 1,
    cover: {
      template: 'thesis',
      title: 'Market Anomaly Digest',
      author: 'B.D.E',
      tickers: [],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/ac5a314c-29f1-4559-b6f4-d0c09920fdfb.png',
    },
  },
  {
    id: 'kevinxu-tweet-trader',
    creator: 'furyfrog1993',
    title: 'Kevin Xu Tweet Trader',
    description: 'Backtest of @kevinxu\'s tweet signals · 3 holding strategies · AI Trader Profile · Refreshed every 6h',
    tickers: ['IREN', 'HIMS', 'QS', 'FIG'],
    pulse: 'idle', stars: 239, remixes: 3,
    cover: {
      template: 'thesis',
      title: 'Kevin Xu Tweet Trader',
      author: 'furyfrog1993',
      tickers: ['IREN', 'HIMS', 'QS', 'FIG'],
      coverImageUrl: 'https://alva-ai-static.b-cdn.net/thumbnails/screenshot-4e35799b-3884-4255-9aad-f35818d95279.webp',
    },
  },
];

/**
 * Display order = the live alva.ai/explore Trendings order.
 * Hero carousel uses the same source — first 5 entries become hero slides.
 */
const DISPLAY_ORDER = [
  'salp-thesis',
  'humanoid-citrini-vf',
  'cls-long-thesis-alva',
  'amd-deep-dive',
  'iran-conflict-digest',
  'shanghaojin-tweet-trader',
  'mag7-capex',
  'korea-semi-raw-numbers',
  'miner-ai-pivot',
  'kol-tweet-trader-leaderboard',
  'trump-china-tracker',
  'openai-rewire-screener',
  'ai-infra-after-mag7-earnings',
  'aleabitoreddit-tweet-trader',
  'memory-cycle-screener',
  'kol-trade-ideas-digest-v3',
  'commodity-pulse',
  'ai-infra-after-mag7-earnings-2975',
  'market-anomaly-digest-v2',
  'kevinxu-tweet-trader',
];

const HERO_ORDER = DISPLAY_ORDER.slice(0, 5);

export const PLAYBOOKS_ORDERED: ExplorePlaybook[] = DISPLAY_ORDER
  .map((id) => PLAYBOOKS.find((p) => p.id === id))
  .filter((p): p is ExplorePlaybook => p !== undefined);

const CATEGORIES = ['Popular', 'Recent'];

/**
 * Multi-select chip filter taxonomy. Each chip matches a playbook if ANY of
 * its match rules fires — template label, ticker contains the term, or the
 * domain/title/description contains it (case-insensitive). When no chip is
 * selected, all playbooks pass.
 */
const CATEGORY_CHIPS = [
  'Smart Screener', 'Theme Tracker', 'Backtest', 'AI Digest', 'Asset Deepdive',
  'Crypto', 'BTC', 'Thesis', 'Tech', 'Equity', 'What-if', 'NVDA', 'Macro',
  'Healthcare', 'ETH', 'Energy', 'FX', 'MAG7', 'Financials', 'Commodities',
] as const;
export type CategoryChip = typeof CATEGORY_CHIPS[number];

export function chipMatchesPlaybook(chip: CategoryChip, p: ExplorePlaybook): boolean {
  const haystack = `${p.title} ${p.description} ${p.tickers.join(' ')} ${p.cover.domain ?? ''} ${p.cover.template}`.toLowerCase();
  const term = chip.toLowerCase();
  // Template synonyms
  if (chip === 'Smart Screener' && p.cover.template === 'screener') return true;
  if (chip === 'Theme Tracker' && p.cover.template === 'thesis') return true;
  if (chip === 'What-if' && p.cover.template === 'what-if') return true;
  if (chip === 'Thesis' && p.cover.template === 'thesis') return true;
  // Ticker hard match
  if (p.tickers.some((t) => t.toLowerCase() === term)) return true;
  // Free-text fallback
  return haystack.includes(term);
}

/* ========== Filter bar (sort dropdown + multi-select chips) ========== */

/**
 * Horizontal chip strip. Tracks scroll position to show a left-edge fade
 * once content has scrolled in from the start, and a right-edge fade while
 * more content extends past the visible area. On hover, surfaces small
 * round arrow buttons in the directions that are currently scrollable —
 * style follows Figma 5526:303437 (white bg, 0.5 px line/l2 border).
 */
function ChipStrip({
  selectedChips, onChipToggle, onClippedRightChange,
}: {
  selectedChips: Set<CategoryChip>;
  onChipToggle: (chip: CategoryChip) => void;
  /** Fires whenever the right edge clipping flips so the parent can show
      a divider between the chip strip and the sort dropdown only when the
      strip's right content is actually being hidden. */
  onClippedRightChange?: (clipped: boolean) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false });

  const recomputeScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    // Fire the parent notifier unconditionally — the initial mount has
    // setState equal to its default and would skip the callback otherwise.
    onClippedRightChange?.(!atEnd);
    setScrollState((prev) =>
      prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd },
    );
  };

  useEffect(() => {
    recomputeScrollState();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(recomputeScrollState);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollByStep = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(120, el.clientWidth * 0.6), behavior: 'smooth' });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flex: 1, minWidth: 0, position: 'relative', overflow: 'visible' }}
    >
      <div
        ref={scrollRef}
        onScroll={recomputeScrollState}
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {CATEGORY_CHIPS.map((chip) => {
          const isActive = selectedChips.has(chip);
          return (
            <button
              key={chip}
              onClick={() => onChipToggle(chip)}
              style={{
                flexShrink: 0,
                height: 28,
                padding: '4px 10px',
                borderRadius: 16,
                border: 'none',
                background: isActive ? 'rgba(0,0,0,0.7)' : 'var(--content-br03, rgba(0,0,0,0.03))',
                color: isActive ? 'rgba(255,255,255,0.9)' : 'var(--text-n7, rgba(0,0,0,0.7))',
                cursor: 'pointer',
                fontFamily: "'Delight', sans-serif",
                fontSize: 12,
                lineHeight: '20px',
                letterSpacing: 0.12,
                whiteSpace: 'nowrap',
                transition: 'background-color 160ms ease, color 160ms ease',
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Edge fades — only visible when there's content in that direction. */}
      {!scrollState.atStart && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 28,
            pointerEvents: 'none',
            background:
              'linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, #ffffff 100%)',
          }}
        />
      )}
      {!scrollState.atEnd && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: 28,
            pointerEvents: 'none',
            background:
              'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, #ffffff 100%)',
          }}
        />
      )}

      {/* Scroll arrow buttons — only when hovered AND there's room to scroll
          in that direction. Style per Figma 5526:303437. */}
      {hovered && !scrollState.atStart && (
        <ScrollArrow direction="left" onClick={() => scrollByStep(-1)} />
      )}
      {hovered && !scrollState.atEnd && (
        <ScrollArrow direction="right" onClick={() => scrollByStep(1)} />
      )}
    </div>
  );
}

function ScrollArrow({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [direction]: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        background: 'var(--background-b0-container, white)',
        border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        zIndex: 3,
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
      } as React.CSSProperties}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'left' ? <path d="M10 3L5 8l5 5" /> : <path d="M6 3l5 5-5 5" />}
      </svg>
    </button>
  );
}

export function FilterBar({
  sort, onSortChange, selectedChips, onChipToggle, isMobile = false,
}: {
  sort: string;
  onSortChange: (v: string) => void;
  selectedChips: Set<CategoryChip>;
  onChipToggle: (chip: CategoryChip) => void;
  isMobile?: boolean;
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const close = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [sortOpen]);

  const sortDropdown = (
    <div ref={sortRef} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setSortOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          width: 100,
          padding: '4px 8px',
          height: 28,
          borderRadius: 6,
          border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
          background: 'transparent',
          cursor: 'pointer',
          fontFamily: "'Delight', sans-serif",
          fontSize: 12,
          lineHeight: '20px',
          letterSpacing: 0.12,
          color: 'var(--text-n9, rgba(0,0,0,0.9))',
        }}
      >
        <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sort}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="rgba(0,0,0,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {sortOpen && (
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 0,
            width: 120,
            background: 'white',
            border: '1px solid var(--line-l07, rgba(0,0,0,0.07))',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            padding: 4,
            zIndex: 10,
          }}
        >
          {CATEGORIES.map((opt) => (
            <button
              key={opt}
              onClick={() => { onSortChange(opt); setSortOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '6px 8px',
                borderRadius: 4,
                background: opt === sort ? 'var(--b-r05, rgba(0,0,0,0.05))' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Delight', sans-serif",
                fontSize: 12,
                lineHeight: '20px',
                color: 'var(--text-n9, rgba(0,0,0,0.9))',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const [rightClipped, setRightClipped] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
      }}
    >
      <ChipStrip
        selectedChips={selectedChips}
        onChipToggle={onChipToggle}
        onClippedRightChange={setRightClipped}
      />
      {rightClipped && (
        <div style={{ width: 1, height: 16, background: 'var(--line-l07, rgba(0,0,0,0.07))', flexShrink: 0 }} />
      )}
      {sortDropdown}
    </div>
  );
}

/* ========== 页面 ========== */

const MOBILE_THRESHOLD_PX = 640;

function useIsMobile(threshold = MOBILE_THRESHOLD_PX): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < threshold : false,
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < threshold);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [threshold]);
  return isMobile;
}

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(e.contentRect.width);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export default function Explore2({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [sort, setSort] = useState<string>('Popular');
  const [selectedChips, setSelectedChips] = useState<Set<CategoryChip>>(() => new Set());
  const isMobile = useIsMobile();
  const [gridRef, gridContainerWidth] = useContainerWidth();

  const toggleChip = (chip: CategoryChip) => {
    setSelectedChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  // Multi-select chip filter: a playbook passes when it matches ANY selected
  // chip. No selection → show everything. Sort is currently a UI label only —
  // 'Popular' keeps the curated DISPLAY_ORDER; 'Recent' reverses it so the
  // newest-feeling items lead.
  const filteredPlaybooks = useMemo(() => {
    const base = sort === 'Recent' ? [...PLAYBOOKS_ORDERED].reverse() : PLAYBOOKS_ORDERED;
    if (selectedChips.size === 0) return base;
    return base.filter((p) => {
      for (const chip of selectedChips) {
        if (chipMatchesPlaybook(chip, p)) return true;
      }
      return false;
    });
  }, [sort, selectedChips]);

  // Hero carousel features alva.ai/explore positions 10–16 (curated via
  // HERO_ORDER) — the top 9 already lead the grid below, so the carousel
  // gets its own distinct rotation. 5s auto-cycle handled inside the
  // HeroCarousel component.
  const heroPlaybooks = useMemo(
    () => HERO_ORDER
      .map((id) => PLAYBOOKS.find((p) => p.id === id))
      .filter((p): p is ExplorePlaybook => p !== undefined),
    [],
  );

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        @keyframes heroScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
      <AppShell
        activePage="explore-2"
        onNavigate={onNavigate!}
        onOpenSearch={onOpenSearch}
      >
        {/*
          Page bg = var(--background/b0, #f6f6f6) per Figma 2951:34972.
          Content centered at max-width 1012px (Figma's 1212px right panel
          minus 100px×2 side padding). Top padding 72px lands "Explore"
          header at the design's y=72.
        */}
        <div
          className="bg-[#f6f6f6] flex flex-col items-center min-h-full w-full"
          style={{
            paddingTop: isMobile ? 32 : 72,
            paddingBottom: isMobile ? 32 : 60,
            paddingLeft: isMobile ? 16 : 28,
            paddingRight: isMobile ? 16 : 28,
          }}
        >
          <div className="w-full flex flex-col" style={{ gap: isMobile ? 16 : 24 }}>
            <h2
              className="tracking-[0.28px] text-[var(--text-n9)]"
              style={{
                fontFamily: "'Delight', sans-serif",
                fontWeight: 400,
                fontSize: isMobile ? 24 : 28,
                lineHeight: isMobile ? '32px' : '38px',
              }}
            >
              Explore
            </h2>
            {/* Hero is full-bleed: it breaks out of the page's 40-px (or 16
                on mobile) horizontal padding so peek slivers extend to the
                page edges per Figma 3297:18875. */}
            <div style={{ marginLeft: isMobile ? -16 : -28, marginRight: isMobile ? -16 : -28 }}>
              <HeroCarousel playbooks={heroPlaybooks} isMobile={isMobile} />
            </div>
            <FilterBar
              sort={sort}
              onSortChange={setSort}
              selectedChips={selectedChips}
              onChipToggle={toggleChip}
              isMobile={isMobile}
            />
            <div
              ref={gridRef}
              style={{
                // Per Figma 4244:19977: N = ⌊(W + 12) / 340⌋,
                // cardW = min(400, (W − 12·(N−1)) / N).
                // CSS `auto-fill + minmax()` doesn't follow this exactly —
                // browsers fit fewer tracks once a max-cap is added — so we
                // compute the column count and card width in JS and emit
                // explicit pixel tracks.
                ...(() => {
                  const W = Math.max(0, gridContainerWidth);
                  if (W === 0) return { display: 'grid', gap: 16, width: '100%' };
                  const N = Math.max(1, Math.floor((W + 16) / 340));
                  return {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))`,
                    gap: 16,
                    width: '100%',
                  } as const;
                })(),
              }}
            >
              {filteredPlaybooks.map((pb, i) => (
                <div
                  key={pb.id}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="w-full animate-[fadeInUp_0.4s_ease-out_both]"
                >
                  <PlaybookCard p={pb} staggerMs={(i % 10) * 1000} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}
