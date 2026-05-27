/**
 * [INPUT]: AppShell, PulseIndicator, chart-theme, CdnIcon, Avatar
 * [OUTPUT]: Explore V2 — Hero Spotlight + Homepage-style Playbook card grid
 * [POS]: Page — Explore
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PulseIndicator } from '@/app/components/community/PulseIndicator';
import { AVATAR_COLOR_PALETTE, CHART_COLORS } from '@/lib/chart-theme';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
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

/* ========== SVG 绘图工具 ========== */

const C = CHART_COLORS;

function smoothLine(data: number[], x0: number, y0: number, w: number, h: number): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: x0 + (i / (data.length - 1)) * w,
    y: y0 + h - ((v - min) / range) * h * 0.85 - h * 0.06,
  }));
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1].x + pts[i].x) / 2;
    const cy = (pts[i - 1].y + pts[i].y) / 2;
    d += ` Q ${pts[i - 1].x},${pts[i - 1].y} ${cx},${cy}`;
  }
  return d;
}

function areaFromLine(linePath: string, x0: number, y0: number, w: number, h: number): string {
  return `${linePath} L ${x0 + w},${y0 + h} L ${x0},${y0 + h} Z`;
}

function bars(data: number[], x0: number, y0: number, w: number, h: number, color: string, opacity = 0.25) {
  const max = Math.max(...data);
  const barW = w / data.length * 0.6;
  const gap = w / data.length;
  return data.map((v, i) => {
    const bh = (v / max) * h * 0.85;
    return <rect key={i} x={x0 + i * gap + gap * 0.2} y={y0 + h - bh} width={barW} height={bh} rx={0.5} fill={color} opacity={opacity} />;
  });
}

function textLines(x: number, y: number, w: number, count: number, gap = 6) {
  return Array.from({ length: count }, (_, i) => (
    <rect key={i} x={x} y={y + i * gap} width={w * (i === count - 1 ? 0.6 : 0.85 + Math.random() * 0.15)} height={3} rx={1} fill="rgba(0,0,0,0.08)" />
  ));
}

function kpiCell(x: number, y: number, w: number, h: number, valueColor: string) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={1} fill="#fafafa" />
      <rect x={x + 4} y={y + 4} width={w * 0.4} height={2.5} rx={1} fill="rgba(0,0,0,0.10)" />
      <rect x={x + 4} y={y + 10} width={w * 0.55} height={4} rx={1} fill={valueColor} opacity={0.7} />
      <rect x={x + 4} y={y + 17} width={w * 0.3} height={2} rx={1} fill="rgba(0,0,0,0.06)" />
    </g>
  );
}

/* ========== 6 种缩略图 ========== */

const W = 320;
const H = 180;

function ThumbPlaybookDetail() {
  const lineData = [100, 108, 103, 115, 112, 128, 135, 140, 132, 148, 155, 162, 158, 172, 180, 195, 210, 225, 238];
  const rsiData = [45, 52, 48, 62, 58, 70, 65, 72, 68, 55, 48, 42, 50, 58, 65, 60, 55, 48, 52];
  const line = smoothLine(lineData, 8, 8, 304, 72);
  const area = areaFromLine(line, 8, 8, 304, 72);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t1-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="308" height="78" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={area} fill="url(#t1-g)" />
      <path d={line} fill="none" stroke={C.primary} strokeWidth="1.2" />
      {kpiCell(6, 88, 74, 24, C.primary)}
      {kpiCell(82, 88, 74, 24, '#2a9b7d')}
      {kpiCell(6, 114, 74, 24, C.red)}
      {kpiCell(82, 114, 74, 24, C.blue)}
      <rect x="160" y="88" width="152" height="24" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={smoothLine(rsiData, 162, 89, 148, 22)} fill="none" stroke={C.orange} strokeWidth="0.8" />
      <line x1="162" y1="97" x2="308" y2="97" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3" strokeDasharray="2 2" />
      <rect x="160" y="114" width="152" height="24" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      {textLines(166, 119, 140, 3, 5)}
      <rect x="6" y="142" width="152" height="32" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      {textLines(12, 148, 140, 4, 5)}
      <rect x="160" y="142" width="152" height="32" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d="M 200,170 A 28,28 0 0,1 256,170" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />
      <path d="M 200,170 A 28,28 0 0,1 238,150" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" />
      <circle cx="238" cy="150" r="2" fill={C.green} />
      {textLines(270, 152, 36, 3, 5)}
    </svg>
  );
}

function ThumbStockDashboard() {
  const priceData = [100, 105, 110, 108, 116, 122, 118, 125, 132, 128, 138, 145, 142, 150, 158, 162, 168, 175, 180, 190];
  const revData = [40, 45, 42, 50, 55, 52, 60, 65, 58, 62];
  const supplyData = [30, 35, 32, 38, 42, 40, 45, 48, 44, 50];
  const priceLine = smoothLine(priceData, 8, 40, 304, 68);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t2-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.blue} stopOpacity="0.2" />
          <stop offset="100%" stopColor={C.blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4, 5].map(i => {
        const cx = 6 + i * 52;
        const colors = [C.primary, C.blue, C.green, C.orange, C.red, C.deepBlue];
        return (
          <g key={i}>
            <rect x={cx} y="6" width="50" height="28" rx="2" fill="#fafafa" />
            <rect x={cx + 4} y="10" width="20" height="2" rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y="15" width="30" height="3.5" rx={1} fill={colors[i]} opacity={0.6} />
            <rect x={cx + 4} y="22" width="16" height="2" rx={1} fill="rgba(0,0,0,0.06)" />
          </g>
        );
      })}
      <rect x="6" y="38" width="308" height="74" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={areaFromLine(priceLine, 8, 40, 304, 68)} fill="url(#t2-g)" />
      <path d={priceLine} fill="none" stroke={C.blue} strokeWidth="1.2" />
      <rect x="6" y="116" width="152" height="58" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="120" width="40" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {bars(revData, 12, 128, 140, 42, C.primary, 0.3)}
      <rect x="160" y="116" width="152" height="58" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="166" y="120" width="40" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <path d={smoothLine(supplyData, 166, 128, 140, 42)} fill="none" stroke={C.green} strokeWidth="0.9" />
      <path d={smoothLine(revData, 166, 128, 140, 42)} fill="none" stroke={C.orange} strokeWidth="0.9" opacity={0.6} />
    </svg>
  );
}

function ThumbPriceVolumeOverview() {
  const priceData = [100, 112, 95, 118, 105, 130, 110, 125, 140, 120, 135, 150, 128, 145, 160, 142, 155, 148, 162, 158];
  const volumeData = [30, 55, 80, 45, 65, 90, 50, 60, 75, 85, 40, 70, 95, 55, 45, 60, 80, 50, 65, 70];
  const priceLine = smoothLine(priceData, 8, 12, 196, 100);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t3-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.orange} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.orange} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="204" height="168" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="10" width="50" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {bars(volumeData, 8, 70, 196, 48, C.orange, 0.15)}
      <path d={areaFromLine(priceLine, 8, 12, 196, 100)} fill="url(#t3-g)" />
      <path d={priceLine} fill="none" stroke={C.orange} strokeWidth="1.2" />
      <circle cx="160" cy="11" r="2" fill={C.orange} />
      <rect x="164" y="9.5" width="16" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <circle cx="185" cy="11" r="2" fill={C.orange} opacity={0.3} />
      <rect x="189" y="9.5" width="14" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={20 + i * 40} y="164" width="14" height="2" rx={1} fill="rgba(0,0,0,0.06)" />
      ))}
      <rect x="214" y="6" width="100" height="168" rx="3" fill="#fafafa" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      {[0, 1, 2, 3, 4, 5].map(i => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cx = 218 + col * 48;
        const cy = 12 + row * 54;
        const colors = [C.primary, C.green, C.orange, C.red, C.blue, C.deepBlue];
        return (
          <g key={i}>
            <rect x={cx} y={cy} width="44" height="48" rx="2" fill="white" />
            <rect x={cx + 4} y={cy + 6} width="22" height="2" rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y={cy + 14} width="28" height="4" rx={1} fill={colors[i]} opacity={0.55} />
            <rect x={cx + 4} y={cy + 22} width="18" height="2" rx={1} fill="rgba(0,0,0,0.06)" />
            <path d={`M ${cx + 4},${cy + 38} l 5,-4 5,6 5,-3 5,2 5,-5 5,3 3,-2`} fill="none" stroke={colors[i]} strokeWidth="0.6" opacity={0.4} />
          </g>
        );
      })}
    </svg>
  );
}

function ThumbWidgetGrid() {
  const d1 = [40, 45, 42, 50, 55, 52, 60, 65, 58, 70, 68, 75, 72, 80];
  const d2 = [30, 35, 32, 38, 42, 40, 45, 48, 44, 50, 52, 55, 54, 58];
  const d3 = [50, 48, 52, 55, 53, 58, 56, 60, 58, 62, 64, 63, 66, 70];
  const d4 = [20, 25, 30, 28, 35, 32, 38, 40, 36, 42, 45, 43, 48, 52];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t4-g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.green} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.green} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="t4-g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="152" height="82" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="10" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {(() => { const l = smoothLine(d1, 10, 18, 144, 64); return <><path d={areaFromLine(l, 10, 18, 144, 64)} fill="url(#t4-g1)" /><path d={l} fill="none" stroke={C.green} strokeWidth="0.9" /></>; })()}
      <rect x="162" y="6" width="152" height="82" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="168" y="10" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {bars(d2, 168, 20, 140, 62, C.blue, 0.35)}
      <rect x="6" y="92" width="152" height="82" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="96" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {textLines(12, 104, 140, 8, 7)}
      <rect x="162" y="92" width="152" height="82" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="168" y="96" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {(() => { const l = smoothLine(d3, 166, 104, 144, 64); return <><path d={areaFromLine(l, 166, 104, 144, 64)} fill="url(#t4-g2)" /><path d={l} fill="none" stroke={C.primary} strokeWidth="0.9" /></>; })()}
      <path d={smoothLine(d4, 166, 104, 144, 64)} fill="none" stroke={C.deepBlue} strokeWidth="0.8" opacity={0.6} />
    </svg>
  );
}

function ThumbBriefAndTrend() {
  const trendData = [40, 38, 45, 42, 50, 55, 48, 52, 58, 62, 55, 60, 65, 58, 62, 68, 72, 65, 70, 75];
  const trendLine = smoothLine(trendData, 8, 100, 304, 68);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t5-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.deepBlue} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.deepBlue} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="308" height="84" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="12" width="48" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <rect x="12" y="20" width="100" height="4" rx={1} fill="rgba(0,0,0,0.12)" />
      {textLines(12, 30, 280, 4, 7)}
      <rect x="12" y="62" width="70" height="3" rx={1} fill="rgba(0,0,0,0.10)" />
      {textLines(12, 70, 280, 2, 6)}
      <rect x="6" y="94" width="308" height="80" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="98" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <path d={areaFromLine(trendLine, 8, 100, 304, 68)} fill="url(#t5-g)" />
      <path d={trendLine} fill="none" stroke={C.deepBlue} strokeWidth="1.1" />
      <text x="14" y="168" fill="rgba(0,0,0,0.06)" fontSize="6" fontFamily="'Delight', sans-serif">Alva</text>
    </svg>
  );
}

function ThumbNarrativeStock() {
  const priceData = [100, 104, 108, 106, 112, 110, 116, 114, 120, 118, 124, 122, 128, 125, 130];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t6-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.red} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.red} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="308" height="32" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="11" width="22" height="22" rx="4" fill={C.red} opacity={0.15} />
      <text x="18" y="26" fill={C.red} fontSize="10" fontWeight="600" fontFamily="'Delight', sans-serif">N</text>
      <rect x="38" y="14" width="40" height="3.5" rx={1} fill="rgba(0,0,0,0.14)" />
      <rect x="38" y="21" width="24" height="2.5" rx={1} fill="rgba(0,0,0,0.07)" />
      <rect x="240" y="13" width="36" height="5" rx={1} fill={C.green} opacity={0.5} />
      <rect x="280" y="14" width="24" height="3" rx={1} fill={C.green} opacity={0.3} />
      {[0, 1, 2, 3, 4].map(i => {
        const cx = 6 + i * 62;
        return (
          <g key={i}>
            <rect x={cx} y="42" width="58" height="22" rx="2" fill="#fafafa" />
            <rect x={cx + 4} y="46" width="16" height="2" rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y="52" width="28" height="3" rx={1} fill={i < 3 ? C.green : C.red} opacity={0.5} />
            <rect x={cx + 34} y="52" width="18" height="2.5" rx={1} fill="rgba(0,0,0,0.06)" />
          </g>
        );
      })}
      <rect x="6" y="68" width="196" height="106" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="74" width="60" height="3" rx={1} fill={C.primary} opacity={0.4} />
      {textLines(12, 82, 180, 3, 6)}
      <rect x="12" y="104" width="50" height="3" rx={1} fill={C.green} opacity={0.3} />
      {textLines(12, 112, 180, 3, 6)}
      <rect x="12" y="134" width="40" height="3" rx={1} fill={C.red} opacity={0.3} />
      {textLines(12, 142, 180, 3, 6)}
      <rect x="206" y="68" width="108" height="106" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="212" y="72" width="36" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {(() => { const l = smoothLine(priceData, 210, 80, 98, 60); return <><path d={areaFromLine(l, 210, 80, 98, 60)} fill="url(#t6-g)" /><path d={l} fill="none" stroke={C.red} strokeWidth="0.9" /></>; })()}
      {kpiCell(212, 148, 44, 20, C.primary)}
      {kpiCell(260, 148, 44, 20, C.orange)}
    </svg>
  );
}

const THUMBNAIL_MAP: Record<string, () => React.ReactNode> = {
  'btc-ultimate': ThumbPlaybookDetail,
  'mag7-rebalance': ThumbStockDashboard,
  'pepe-btc': ThumbPriceVolumeOverview,
  'attribution-analysis': ThumbWidgetGrid,
  'btc-macd': ThumbBriefAndTrend,
  'nvda-tsm': ThumbNarrativeStock,
};

/* ========== Hero Spotlight ========== */

interface HeroSlide {
  thumbId: string;
  creator: string;
  title: string;
  description: string;
  tickers: string[];
  stars: number;
  remixes: number;
  annualizedReturn: string;
  pulse: 'active' | 'idle';
  comments: { author: string; text: string }[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    thumbId: 'nvda-tsm',
    creator: 'Alice Chen',
    title: 'NVDA Supply Chain Intelligence',
    description: 'Tracks TSMC, Samsung, SK Hynix production data + Google Trends demand signals. AI-powered supply/demand mismatch detection for semiconductor alpha generation across the entire chip stack.',
    tickers: ['NVDA', 'TSM', 'MU', 'AVGO'],
    stars: 312, remixes: 47, annualizedReturn: '+212.4%', pulse: 'active',
    comments: [
      { author: 'Marcus L.', text: 'This caught the NVDA dip 3 days before earnings. Insane signal quality.' },
      { author: 'Yuki T.', text: 'Forked and added AMD — works just as well on the whole semi stack.' },
      { author: 'Chip Whisperer', text: 'The TSMC fab utilization data alone is worth the subscription.' },
      { author: 'Semi Anon', text: 'Running this alongside my manual analysis. It spots things I miss every week.' },
      { author: 'Bay Area VC', text: 'Shared this with our portfolio companies. Supply chain alpha is real.' },
    ],
  },
  {
    thumbId: 'attribution-analysis',
    creator: 'DeFi Sage',
    title: 'GPT-4 Earnings Whisper',
    description: 'Real-time earnings call transcript analysis. Detects sentiment shifts, guidance tone, and forward-looking language patterns to trade pre-market gaps with institutional-grade NLP.',
    tickers: ['SPY', 'QQQ', 'AAPL', 'MSFT'],
    stars: 256, remixes: 38, annualizedReturn: '+89.2%', pulse: 'active',
    comments: [
      { author: 'Macro Scope X', text: 'It flagged MSFT guidance weakness 40 min before the selloff. Speechless.' },
      { author: 'Anon Quant', text: 'Best use of LLM in a playbook. The sentiment scoring is next-level.' },
      { author: 'Earnings Bot', text: 'Backtested on 200+ earnings calls. Win rate holds above 68%.' },
      { author: 'Lisa Park', text: 'The tone analysis on CFO answers is surprisingly predictive.' },
      { author: 'Vol Trader', text: 'Using this for pre-earnings straddle sizing. Game changer for vol desks.' },
    ],
  },
  {
    thumbId: 'btc-ultimate',
    creator: 'Regime Capital',
    title: 'Macro Regime Alpha',
    description: 'Classifies Fed/macro environment into 4 regimes using yield curve, VIX, and credit spreads. Auto-rotates between equities, bonds, commodities, and cash for all-weather returns.',
    tickers: ['SPY', 'TLT', 'GLD', 'BTC'],
    stars: 198, remixes: 29, annualizedReturn: '+156.7%', pulse: 'active',
    comments: [
      { author: 'Alice Chen', text: 'Survived the March correction with only -2% drawdown. Perfectly timed.' },
      { author: 'Macro Degen', text: 'Finally someone who gets that the game is regime detection, not prediction.' },
      { author: 'Bond King Jr', text: 'The yield curve signal is cleaner than anything I built in 10 years.' },
      { author: 'CTA Fund', text: 'We allocate 15% of our book to this strategy now. Consistent alpha.' },
      { author: 'Risk Parity Fan', text: 'This is basically Bridgewater All Weather for retail. Love it.' },
    ],
  },
];

const FLOATING_DATA = [
  { text: 'NVDA', x: '12%', y: '15%', opacity: 0.07, size: 11, delay: 0 },
  { text: '+2.4%', x: '8%', y: '65%', opacity: 0.05, size: 10, delay: 1.2 },
  { text: 'BTC', x: '88%', y: '25%', opacity: 0.06, size: 11, delay: 0.6 },
  { text: '$142.8', x: '82%', y: '72%', opacity: 0.05, size: 10, delay: 2.4 },
  { text: 'SPY', x: '45%', y: '8%', opacity: 0.04, size: 10, delay: 1.8 },
  { text: 'TSM', x: '72%', y: '88%', opacity: 0.06, size: 10, delay: 0.3 },
  { text: '\u03b1', x: '20%', y: '85%', opacity: 0.05, size: 13, delay: 3.0 },
  { text: '\u03a3', x: '92%', y: '50%', opacity: 0.04, size: 12, delay: 1.5 },
  { text: '+338%', x: '55%', y: '90%', opacity: 0.04, size: 10, delay: 2.1 },
  { text: 'GLD', x: '35%', y: '5%', opacity: 0.05, size: 10, delay: 0.9 },
];

function HeroAvatar({ name, size = 18 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

function HeroSpotlight({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIdx(i => (i + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = HERO_SLIDES[idx];
  const Thumb = THUMBNAIL_MAP[slide.thumbId];

  return (
    <div className="w-full flex flex-col gap-[0px]">
    <div
      className="relative rounded-[12px] overflow-hidden cursor-pointer group/hero"
      style={{ height: 340, border: '0.5px solid var(--line-l3)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0" style={{ background: '#0c0c14' }} />
      <div className="absolute" style={{ width: '55%', height: '120%', top: '-10%', left: '20%', background: 'radial-gradient(ellipse, rgba(73,163,166,0.13) 0%, rgba(73,163,166,0.04) 40%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute" style={{ width: '35%', height: '60%', top: '-5%', right: '5%', background: 'radial-gradient(ellipse, rgba(220,180,80,0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />
      <div className="absolute" style={{ width: '30%', height: '50%', bottom: '0%', left: '5%', background: 'radial-gradient(ellipse, rgba(60,100,200,0.06) 0%, transparent 65%)', filter: 'blur(45px)' }} />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 0.5px, transparent 0.5px)', backgroundSize: '4px 4px' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {FLOATING_DATA.map((d, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none"
          style={{
            left: d.x, top: d.y, opacity: d.opacity, fontSize: d.size,
            color: 'rgba(255,255,255,0.9)',
            fontFamily: "'Delight', monospace",
            animation: `heroFloat 8s ease-in-out ${d.delay}s infinite alternate`,
          }}
        >
          {d.text}
        </span>
      ))}

      <div className="relative z-[1] flex items-stretch h-full">
        <div className="flex-[4] min-w-0 flex flex-col justify-center pl-[40px] pr-[20px] py-[32px]" style={{ fontFamily: "'Delight', sans-serif" }}>
          <div className="flex items-center gap-[8px] mb-[14px]">
            <span className="text-[11px] px-[8px] py-[3px] rounded-full font-medium" style={{ background: 'rgba(73,163,166,0.15)', color: 'var(--main-m1)', border: '1px solid rgba(73,163,166,0.2)' }}>Featured</span>
            <span className="text-[11px] tracking-[0.05em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Playbook of the Week</span>
          </div>

          <h3 className="text-[26px] leading-[34px] tracking-[-0.01em] font-medium truncate" style={{ color: 'rgba(255,255,255,0.95)' }}>
            {slide.title}
          </h3>

          <div className="flex items-center gap-[8px] mt-[10px]">
            <HeroAvatar name={slide.creator} size={20} />
            <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{slide.creator}</span>
            <PulseIndicator status={slide.pulse} />
            <span className="ml-[4px] text-[12px] px-[8px] py-[2px] rounded-[4px] font-medium" style={{ background: 'rgba(73,163,166,0.12)', color: 'var(--main-m1)' }}>{slide.annualizedReturn}</span>
          </div>

          <p className="text-[13px] leading-[21px] tracking-[0.01em] mt-[12px] overflow-hidden" style={{ color: 'rgba(255,255,255,0.4)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {slide.description}
          </p>

          <div className="relative mt-[14px] pt-[12px] overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', height: 48 }}>
            <div className="flex flex-col" style={{ animation: `heroScrollUp ${slide.comments.length * 4}s linear infinite`, animationPlayState: paused ? 'paused' : 'running' }}>
              {[...slide.comments, ...slide.comments].map((c, i) => (
                <div key={i} className="flex items-start gap-[6px] shrink-0" style={{ height: 48 }}>
                  <HeroAvatar name={c.author} size={15} />
                  <p className="text-[11px] leading-[17px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>{c.author}</span>{' '}&ldquo;{c.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[5px] mt-[16px]">
            {slide.tickers.map(t => (
              <span key={t} className="text-[10px] px-[7px] py-[2px] rounded-[4px] font-medium tracking-[0.03em]" style={{ background: 'rgba(73,163,166,0.12)', color: 'rgba(73,163,166,0.75)', border: '1px solid rgba(73,163,166,0.1)' }}>{t}</span>
            ))}
            <div className="ml-auto flex items-center gap-[12px]">
              <span className="flex items-center gap-[3px] text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L8 2z" /></svg>
                {slide.stars}
              </span>
              <span className="flex items-center gap-[3px] text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 3l2 2-2 2" /><path d="M3 7V6a2 2 0 012-2h6" /><path d="M5 13l-2-2 2-2" /><path d="M13 9v1a2 2 0 01-2 2H5" /></svg>
                {slide.remixes}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-[7] min-w-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-white">
            <div className="w-full h-full transition-transform duration-700 ease-out group-hover/hero:scale-[1.015] origin-center [&>svg]:w-full [&>svg]:h-full">
              {Thumb && <Thumb />}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setIdx(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); }}
          className="absolute left-[12px] top-1/2 -translate-y-1/2 z-[3] size-[32px] rounded-full flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5" /></svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(i => (i + 1) % HERO_SLIDES.length); }}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 z-[3] size-[32px] rounded-full flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5" /></svg>
        </button>
      </div>
    </div>
      <div className="flex justify-center gap-[6px] mt-[10px]">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="transition-all duration-300 cursor-pointer"
            style={{
              width: i === idx ? 16 : 4,
              height: 4,
              borderRadius: 2,
              background: i === idx ? 'rgba(73,163,166,0.5)' : 'var(--b-r1)',
            }}
          />
        ))}
      </div>
    </div>
  );
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
          fontFamily: 'Inter, sans-serif',
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
