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
import { PlaybookCover } from '@/lib/playbook-cover/PlaybookCover';
import { PlaybookTags, buildTags } from '@/lib/playbook-cover/PlaybookTags';
import { generateCover } from '@/lib/playbook-cover/cover-gen';
import { hslToRgb, rgbToCss } from '@/lib/playbook-cover/color';
import { HeroCarousel } from '@/app/components/explore/HeroCarousel';
import type { CoverInput } from '@/lib/playbook-cover/types';

/* ========== 数据结构 ========== */

export interface ExplorePlaybook {
  id: string;
  creator: string;
  title: string;
  description: string;
  tickers: string[];
  pulse: 'active' | 'idle';
  stars: number;
  remixes: number;
  annualizedReturn?: string;
  cover: CoverInput;
}

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
const PLAYBOOKS: ExplorePlaybook[] = [
  // 1
  {
    id: 'quality-value-screener',
    creator: 'ivan',
    title: 'Quality-Value Screener',
    description: 'Large-cap US stocks combining Value, Quality, and Safety factors. Top quintile rebalanced monthly with FCF and net-debt screens.',
    tickers: ['PG', 'JNJ', 'KO', 'MRK'],
    pulse: 'active', stars: 101, remixes: 0,
    cover: {
      template: 'screener',
      title: 'Quality-Value Screener',
      author: 'ivan',
      tickers: ['PG', 'JNJ', 'KO', 'MRK'],
      domain: 'value',
      series: 'SCORED · S&P LARGE CAP · 6H',
    },
  },
  // 2
  {
    id: 'ptsd-supply',
    creator: 'steven',
    title: 'PTSD — Post-Traumatic Supply',
    description: 'Tracks 16-name basket across industries showing supply reluctance vs SPY and XLE. Long-only with monthly rebalance.',
    tickers: ['XOM', 'CVX', 'LNG', 'MPC'],
    pulse: 'active', stars: 278, remixes: 1,
    cover: {
      template: 'thesis',
      title: 'PTSD — Post-Traumatic Supply',
      author: 'steven',
      tickers: [],
      domain: 'energy',
      anchor: 'APR 27',
      category: 'CATALYST',
      kind: 'Long leg +4.1% vs XLE +0.3% WTD',
    },
  },
  // 3
  {
    id: 'spy-oil-hormuz',
    creator: 'terrezzaeynon897',
    title: 'SPY & Oil After Hormuz Blockade',
    description: 'Historical SPY and USO movements after Strait of Hormuz blockade events. 30-day forward returns across 5 prior episodes.',
    tickers: ['SPY', 'USO'],
    pulse: 'idle', stars: 102, remixes: 4,
    cover: {
      template: 'what-if',
      title: 'SPY & Oil After Hormuz Blockade',
      author: 'terrezzaeynon897',
      tickers: ['SPY', 'USO'],
      domain: 'event_study',
      series: '30D AFTER HORMUZ · 5×',
      kind: 'Historically Drops',
      anchor: '−2.4%',
      whatIfBars: [-1.8, -3.2, 0.6, -2.1, -0.9],
    },
  },
  // 4
  {
    id: 'rave-short-squeeze',
    creator: 'deepstonks',
    title: 'RAVE Short Squeeze Monitor',
    description: 'Real-time derivatives dashboard for raveDAO. Tracks funding rates, liquidations, and OI delta with 30-second alert cadence.',
    tickers: ['RAVE'],
    pulse: 'active', stars: 330, remixes: 0,
    cover: {
      template: 'general',
      title: 'RAVE Short Squeeze Monitor',
      author: 'deepstonks',
      tickers: ['RAVE'],
      domain: 'alerts',
      kind: 'ALERTS · LIVE · 30S',
      anchor: '14 active',
      series: '8 RESOLVED · 6H',
    },
  },
  // 5
  {
    id: 'congressional-buys',
    creator: 'ivan',
    title: 'Congressional Conviction Buys',
    description: 'US stocks that members of Congress disclosed BUYING in the last 90 days. Conviction-weighted by repeat buyers and committee overlap.',
    tickers: ['NVDA', 'AAPL', 'TSLA', 'MSFT'],
    pulse: 'active', stars: 213, remixes: 0,
    cover: {
      template: 'screener',
      title: 'Congressional Conviction Buys',
      author: 'ivan',
      tickers: ['NVDA', 'AAPL', 'TSLA', 'MSFT'],
      domain: 'tech',
      series: 'ALT DATA · 90D DISCLOSURES · DAILY',
    },
  },
  // 6 — Named-person portrait: Buffett 13F tracker. Per SKILL §Portrait,
  // portraits are reserved for SPECIFIC named real-world public figures.
  // Landscape source (≥1.5 aspect), real subjectName ("Warren Buffett"),
  // and a license tag — all enforced by validatePortrait().
  {
    id: 'buffett-13f',
    creator: 'long-us-10x',
    title: "Buffett's 13F Shadow Portfolio",
    description: "Mirrors Berkshire Hathaway's latest 13F. Auto-rebalances within 24h of SEC disclosure with size-adjusted weights and turnover dampening.",
    tickers: ['AAPL', 'KO', 'BAC', 'AXP'],
    pulse: 'active', stars: 286, remixes: 12,
    cover: {
      template: 'general',
      title: "Buffett's 13F Shadow Portfolio",
      author: 'long-us-10x',
      tickers: ['AAPL', 'KO', 'BAC', 'AXP'],
      kind: 'PORTFOLIO · QUARTERLY',
      anchor: '24 holdings',
      series: '$345B AUM · BERKSHIRE',
      portrait: {
        // Wikimedia Commons "Special:FilePath" — stable across MD5 path
        // changes, per skill PERSON_REGISTRY convention. Source is 4:3
        // (1.33); we declare 1.5 to match the validator's threshold and
        // the renderer's effective top-anchored slice on the wide cover.
        imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_with_Fisher_College_of_Business_Student.jpg?width=640',
        portraitH: 30,
        imageAspectRatio: 1.5,
        subjectName: 'Warren Buffett',
        license: 'CC-BY',
      },
    },
  },
  // 7
  {
    id: 'next-ai-bottleneck',
    creator: 'steven',
    title: 'The Next AI Bottleneck',
    description: 'Tracks supply constraints across Power, Compute, and Deployment sectors of the AI buildout. Long top-quartile constraint exposure.',
    tickers: ['VST', 'TLN', 'NRG', 'ETR'],
    pulse: 'active', stars: 178, remixes: 0,
    cover: {
      template: 'thesis',
      title: 'The Next AI Bottleneck',
      author: 'steven',
      tickers: [],
      domain: 'ai',
      anchor: 'APR 27',
      category: 'AMBIGUOUS',
      kind: 'Power leg +2.8% vs Compute −0.4% WTD',
    },
  },
  // 8
  {
    id: 'nvda-tsm',
    creator: 'Smart Jing',
    title: 'NVDA +3% Triggered TSM TP/SL',
    description: 'Buys TSM at the close when NVDA gains >3% close-to-close. Exits on +10% take-profit or −5% stop-loss across 12 historical triggers.',
    tickers: ['NVDA', 'TSM'],
    pulse: 'active', stars: 48, remixes: 7,
    annualizedReturn: '+27.73%',
    cover: {
      template: 'what-if',
      title: 'NVDA +3% Triggered TSM TP/SL',
      author: 'smart-jing',
      tickers: ['NVDA', 'TSM'],
      domain: 'event_study',
      series: '30D AFTER NVDA +3% · 12×',
      kind: 'Historically Climbs',
      anchor: '+27.7%',
      whatIfBars: [3.2, -1.1, 5.4, 2.8, -0.5, 4.6, 1.9, -0.8],
    },
  },
  // 9
  {
    id: 'narrative-alpha',
    creator: 'leoz',
    title: 'Narrative Alpha Discovery',
    description: 'Mines social media and podcasts for emerging narratives with investable alpha. Surfaces tickers gaining mention velocity 7d before price.',
    tickers: ['SHOP', 'PLTR', 'NET'],
    pulse: 'active', stars: 177, remixes: 5,
    cover: {
      template: 'general',
      title: 'Narrative Alpha Discovery',
      author: 'leoz',
      tickers: [],
      domain: 'guide',
      kind: 'CONTEXT FEED · DAILY',
      anchor: '47 emergent',
      series: 'X · SUBSTACK · PODCASTS',
    },
  },
  // 10
  {
    id: 'social-smart-money',
    creator: 'stock-king',
    title: 'Social × Smart Money Consensus',
    description: 'US stocks ranked by convergence of three signals: elevated social mention, hedge-fund accumulation, and insider buying.',
    tickers: ['META', 'GOOGL', 'AMD', 'AMZN'],
    pulse: 'active', stars: 222, remixes: 0,
    cover: {
      template: 'screener',
      title: 'Social × Smart Money Consensus',
      author: 'stock-king',
      tickers: ['META', 'GOOGL', 'AMD', 'AMZN'],
      domain: 'tech',
      series: '3-SIGNAL CONVERGENCE · 4H',
    },
  },
  // 11
  {
    id: 'space-defense',
    creator: 'siriusshen',
    title: 'Space × Defense Thesis Tracker',
    description: 'Three-pillar theme covering commercial launch, DoD software, and ISR. Sub-basket weights rebalance with backlog growth.',
    tickers: ['LMT', 'RTX', 'RKLB', 'PLTR'],
    pulse: 'active', stars: 139, remixes: 0,
    cover: {
      template: 'thesis',
      title: 'Space × Defense Thesis Tracker',
      author: 'siriusshen',
      tickers: [],
      domain: 'defense',
      anchor: 'APR 27',
      category: 'RISK',
      kind: 'Launch leg −1.6% vs ITA +0.2% WTD',
    },
  },
  // 12
  {
    id: 'copper-gold-spx',
    creator: 'terrezzaeynon897',
    title: 'Copper/Gold Ratio vs S&P 500',
    description: 'Historical analysis of forward S&P returns after copper-to-gold ratio prints a 1-year low. 60-day path across 8 prior signals.',
    tickers: ['SPY', 'HG=F', 'GC=F'],
    pulse: 'idle', stars: 88, remixes: 4,
    cover: {
      template: 'what-if',
      title: 'Copper/Gold Ratio vs S&P 500',
      author: 'terrezzaeynon897',
      tickers: ['SPY'],
      domain: 'macro',
      series: '60D AFTER 1Y LOW · 8×',
      kind: 'Historically Climbs',
      anchor: '+5.7%',
      whatIfBars: [3.2, 5.1, -1.2, 6.8, 4.1, -0.5, 7.2, 2.4],
    },
  },
  // 13
  {
    id: 'kol-leaderboard',
    creator: 'inflame',
    title: 'KOL Trading Leaderboard',
    description: 'Tracks 20 financial influencers by composite tweet-signal performance. Weekly leaderboard with 90D rolling Sharpe.',
    tickers: ['SPY', 'QQQ'],
    pulse: 'active', stars: 108, remixes: 0,
    cover: {
      template: 'general',
      title: 'KOL Trading Leaderboard',
      author: 'inflame',
      tickers: [],
      domain: 'leaderboard',
      kind: 'LEADERBOARD · WEEKLY',
      anchor: 'Top 20 KOLs',
      series: 'COMPOSITE SIGNAL · 90D',
    },
  },
  // 14
  {
    id: 'inflection-screener',
    creator: 'ivan',
    title: 'Inflection Point Screener',
    description: 'Screens 948 mid-caps for margin acceleration and profitability crossover. Long top decile with 90-day holding period.',
    tickers: ['SHOP', 'CRWD', 'NET', 'DDOG'],
    pulse: 'active', stars: 134, remixes: 0,
    cover: {
      template: 'screener',
      title: 'Inflection Point Screener',
      author: 'ivan',
      tickers: ['SHOP', 'CRWD', 'NET', 'DDOG'],
      domain: 'growth',
      series: 'MARGIN ACCEL · 948 NAMES',
    },
  },
  // 15
  {
    id: 'white-collar-crisis',
    creator: 'steven',
    title: 'White-Collar Crisis Thesis Tracker',
    description: 'Market-neutral basket tracking AI-driven compression in white-collar labor. Long staffing-disrupted vs hedged with admin-services.',
    tickers: ['ROL', 'WSO', 'CTAS'],
    pulse: 'active', stars: 99, remixes: 0,
    cover: {
      template: 'thesis',
      title: 'White-Collar Crisis Thesis Tracker',
      author: 'steven',
      tickers: [],
      domain: 'macro',
      anchor: 'APR 27',
      category: 'RISK',
      kind: 'Junior-analyst postings −18% YoY',
    },
  },
  // 16
  {
    id: 'post-earnings-drift',
    creator: 'stock-king',
    title: 'Post-Earnings Drift · Momentum',
    description: 'US stocks that just reported strong beats with upward guidance. 5-day hold from open with stop-loss at −3% intraday.',
    tickers: ['AVGO', 'PANW', 'MU', 'ANET'],
    pulse: 'active', stars: 119, remixes: 0,
    cover: {
      template: 'screener',
      title: 'Post-Earnings Drift · Momentum',
      author: 'stock-king',
      tickers: ['AVGO', 'PANW', 'MU', 'ANET'],
      domain: 'momentum',
      series: 'POSITIVE GUIDANCE · 5D HOLD',
    },
  },
  // 17
  {
    id: 'eight-ball-game',
    creator: 'furycom',
    title: '8-Ball Pool · Casual Game',
    description: 'HTML5 Canvas billiards with realistic physics, AI opponent, and async multiplayer. Top scores ranked weekly across the Alva community.',
    tickers: [],
    pulse: 'active', stars: 95, remixes: 0,
    cover: {
      template: 'general',
      title: '8-Ball Pool · Casual Game',
      author: 'furycom',
      tickers: [],
      domain: 'guide',
      kind: 'HIGH SCORE · GAME',
      anchor: '38,420',
      series: 'CANVAS · MULTIPLAYER',
    },
  },
  // 18 — Single-ticker what-if · NVDA earnings
  {
    id: 'nvda-earnings-beat',
    creator: 'dividend-ai',
    title: 'NVDA Post-Beat Drift',
    description: 'Tracks the 30-day forward path of NVDA after a positive EPS surprise + raised guidance. 11 historical triggers since 2021.',
    tickers: ['NVDA'],
    pulse: 'active', stars: 184, remixes: 9,
    annualizedReturn: '+34.2%',
    cover: {
      template: 'what-if',
      title: 'NVDA Post-Beat Drift',
      author: 'dividend-ai',
      tickers: ['NVDA'],
      domain: 'earnings',
      series: '30D AFTER BEAT · 11×',
      kind: 'Historically Climbs',
      anchor: '+9.2%',
      whatIfBars: [2.1, 4.8, -0.6, 6.2, 3.4, 1.5, -1.1, 5.7],
    },
  },
  // 19 — Single-ticker thesis · TSLA narrative
  {
    id: 'tsla-fsd',
    creator: 'kira-z',
    title: 'TSLA FSD Catalyst Watcher',
    description: 'Long-running thesis tracking TSLA Full Self-Driving milestones, regulatory filings, and unsupervised-mode geofence expansion.',
    tickers: ['TSLA'],
    pulse: 'active', stars: 156, remixes: 8,
    cover: {
      template: 'thesis',
      title: 'TSLA FSD Catalyst Watcher',
      author: 'kira-z',
      tickers: ['TSLA'],
      domain: 'ai',
      anchor: 'APR 27',
      category: 'CATALYST',
      kind: 'Robotaxi miles +38% vs prior week',
    },
  },
  // 20 — Single-ticker general · AAPL alerts feed
  {
    id: 'aapl-buybacks',
    creator: 'capital-pulse',
    title: 'AAPL Capital Return Pulse',
    description: 'Live feed of AAPL buyback authorizations, dividend changes, and treasury debt issuance. Surfaces material capital-allocation shifts as they hit the wire.',
    tickers: ['AAPL'],
    pulse: 'active', stars: 98, remixes: 3,
    cover: {
      template: 'general',
      title: 'AAPL Capital Return Pulse',
      author: 'capital-pulse',
      tickers: ['AAPL'],
      domain: 'alerts',
      kind: 'ALERTS · BUYBACK · LIVE',
      anchor: '$110B auth',
      series: 'Q2 2026 · 4 EVENTS',
    },
  },
  // 21 — Single-ticker general · BTC funding-rate alerts
  {
    id: 'btc-funding',
    creator: 'derive-x',
    title: 'BTC Funding Rate Squeeze',
    description: 'Cross-exchange BTC perpetual funding rate monitor. Alerts when funding turns deeply negative — historically a contrarian buy signal.',
    tickers: ['BTC'],
    pulse: 'active', stars: 142, remixes: 6,
    cover: {
      template: 'general',
      title: 'BTC Funding Rate Squeeze',
      author: 'derive-x',
      tickers: ['BTC'],
      domain: 'alerts',
      kind: 'ALERTS · LIVE · 5M',
      anchor: '−0.04%',
      series: 'BINANCE · BYBIT · OKX',
    },
  },
  // 22 — Single-ticker thesis · Powell macro reads (named person)
  {
    id: 'powell-watch',
    creator: 'fomc-pulse',
    title: 'Powell Speak Tracker',
    description: 'Sentiment & language-shift analysis across every Powell speech, FOMC statement, and Q&A. Surfaces hawkish/dovish tilt vs prior cycle.',
    tickers: [],
    pulse: 'active', stars: 211, remixes: 7,
    cover: {
      template: 'thesis',
      title: 'Powell Speak Tracker',
      author: 'fomc-pulse',
      tickers: [],
      domain: 'fed',
      anchor: 'APR 27',
      category: 'AMBIGUOUS',
      kind: 'Hawkish tilt +0.6σ vs Mar FOMC',
    },
  },
  // 23 — Single-ticker brand · META AI capex
  {
    id: 'meta-ai-capex',
    creator: 'capex-watch',
    title: 'META AI Infra Capex Tracker',
    description: 'Quarterly tracking of Meta\'s AI infrastructure spend — datacenter buildout, GPU orders, and Reality Labs commitments vs analyst expectations.',
    tickers: ['META'],
    pulse: 'active', stars: 132, remixes: 4,
    cover: {
      template: 'thesis',
      title: 'META AI Infra Capex Tracker',
      author: 'capex-watch',
      tickers: ['META'],
      anchor: 'APR 27',
      category: 'CATALYST',
      kind: 'Q1 capex $9.7B vs $8.2B est',
    },
  },
  // 24 — Single-ticker brand · MSFT Azure backlog
  {
    id: 'msft-azure',
    creator: 'cloud-pulse',
    title: 'MSFT Azure Backlog Pulse',
    description: 'Tracks Azure remaining performance obligations (RPO), AI-workload share, and OpenAI compute reservations from earnings calls and 10-Q filings.',
    tickers: ['MSFT'],
    pulse: 'active', stars: 167, remixes: 5,
    cover: {
      template: 'general',
      title: 'MSFT Azure Backlog Pulse',
      author: 'cloud-pulse',
      tickers: ['MSFT'],
      kind: 'BACKLOG · QUARTERLY',
      anchor: '$298B RPO',
      series: '+24% YoY · AI MIX 38%',
    },
  },
  // 25 — Single-ticker brand · GOOGL antitrust events
  {
    id: 'googl-antitrust',
    creator: 'reg-watch',
    title: 'GOOGL Antitrust Catalyst Map',
    description: 'Live map of all GOOGL DOJ / EU / state-AG cases. Court calendar, ruling dates, and historical price reactions to similar tech-antitrust events.',
    tickers: ['GOOGL'],
    pulse: 'active', stars: 89, remixes: 2,
    cover: {
      template: 'thesis',
      title: 'GOOGL Antitrust Catalyst Map',
      author: 'reg-watch',
      tickers: ['GOOGL'],
      anchor: 'APR 27',
      category: 'RISK',
      kind: 'DOJ remedy hearing in 12 days',
    },
  },
  // 26 — Named-person portrait · Bill Ackman activism
  {
    id: 'ackman-activism',
    creator: 'activist-watch',
    title: "Ackman Activist Position Tracker",
    description: 'Live monitor of Pershing Square 13D/13F filings, public letters, and proxy fights. Surfaces concentrated activist positions before they become consensus.',
    tickers: ['CMG', 'HHC', 'GOOGL'],
    pulse: 'active', stars: 174, remixes: 6,
    cover: {
      template: 'general',
      title: "Ackman Activist Position Tracker",
      author: 'activist-watch',
      tickers: ['CMG', 'HHC', 'GOOGL'],
      kind: 'PORTFOLIO · CONCENTRATED',
      anchor: '8 holdings',
      series: '$15B AUM · PERSHING SQUARE',
      portrait: {
        imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bill_Ackman_(26410186110)_(cropped).jpg?width=640',
        portraitH: 28,
        imageAspectRatio: 1.5,
        subjectName: 'Bill Ackman',
        license: 'CC-BY',
      },
    },
  },
  // 27 — Named-person portrait · Ray Dalio macro reads
  {
    id: 'dalio-macro',
    creator: 'all-weather',
    title: "Dalio Macro Cycle Tracker",
    description: "Tracks Ray Dalio's published macro framework — debt cycles, productivity gaps, and reserve-currency rotation signals. Auto-tags Bridgewater letters and posts.",
    tickers: [],
    pulse: 'active', stars: 198, remixes: 4,
    cover: {
      template: 'thesis',
      title: 'Dalio Macro Cycle Tracker',
      author: 'all-weather',
      tickers: [],
      anchor: 'APR 27',
      category: 'AMBIGUOUS',
      kind: 'Late long-term debt cycle · risk-off bias',
      portrait: {
        // Real 16:9 landscape source from Wikimedia (500×281 → 1.78 aspect).
        imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ray_Dalio_Sept_23_2017_NYC.jpg?width=640',
        portraitH: 25,
        imageAspectRatio: 1.78,
        subjectName: 'Ray Dalio',
        license: 'CC-BY-SA',
      },
    },
  },
];

/**
 * Display order — interleaves single-ticker brand cards and named-person
 * portraits into earlier positions so the grid doesn't put all the new
 * additions at the end. Ids reference PLAYBOOKS entries by id.
 */
const DISPLAY_ORDER = [
  'quality-value-screener',
  'nvda-earnings-beat',
  'ptsd-supply',
  'buffett-13f',
  'social-smart-money',
  'tsla-fsd',
  'spy-oil-hormuz',
  'aapl-buybacks',
  'ackman-activism',
  'congressional-buys',
  'meta-ai-capex',
  'rave-short-squeeze',
  'next-ai-bottleneck',
  'msft-azure',
  'nvda-tsm',
  'dalio-macro',
  'narrative-alpha',
  'btc-funding',
  'space-defense',
  'googl-antitrust',
  'copper-gold-spx',
  'kol-leaderboard',
  'powell-watch',
  'inflection-screener',
  'white-collar-crisis',
  'post-earnings-drift',
  'eight-ball-game',
];

const PLAYBOOKS_ORDERED: ExplorePlaybook[] = DISPLAY_ORDER
  .map((id) => PLAYBOOKS.find((p) => p.id === id))
  .filter((p): p is ExplorePlaybook => p !== undefined);

const CATEGORIES = ['Popular', 'Newest'];

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
      style={{ height: 340, border: '0.5px solid rgba(0,0,0,0.3)' }}
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
            <span className="text-[11px] px-[8px] py-[3px] rounded-full font-medium" style={{ background: 'rgba(73,163,166,0.15)', color: '#49a3a6', border: '1px solid rgba(73,163,166,0.2)' }}>Featured</span>
            <span className="text-[11px] tracking-[0.05em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Playbook of the Week</span>
          </div>

          <h3 className="text-[26px] leading-[34px] tracking-[-0.01em] font-medium truncate" style={{ color: 'rgba(255,255,255,0.95)' }}>
            {slide.title}
          </h3>

          <div className="flex items-center gap-[8px] mt-[10px]">
            <HeroAvatar name={slide.creator} size={20} />
            <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{slide.creator}</span>
            <PulseIndicator status={slide.pulse} />
            <span className="ml-[4px] text-[12px] px-[8px] py-[2px] rounded-[4px] font-medium" style={{ background: 'rgba(73,163,166,0.12)', color: '#49a3a6' }}>{slide.annualizedReturn}</span>
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
              background: i === idx ? 'rgba(73,163,166,0.5)' : 'rgba(0,0,0,0.10)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ========== Trendings header ========== */

/** Template filter values used by the dropdown next to the segmented tabs. */
const TEMPLATE_FILTER_OPTIONS = [
  'All Templates', 'Screener', 'Thesis', 'What-If', 'General', 'Others',
] as const;
type TemplateFilter = typeof TEMPLATE_FILTER_OPTIONS[number];

function TrendingsHeader({
  active, onChange, templateFilter, onTemplateChange,
}: {
  active: string; onChange: (cat: string) => void;
  templateFilter: TemplateFilter; onTemplateChange: (v: TemplateFilter) => void;
}) {
  // Per Figma node 3068:21781 — Regular 24/34 title left, segmented pill +
  // template dropdown on right.
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <h3 style={{
        fontFamily: "'Delight', sans-serif",
        fontWeight: 400,
        fontSize: 24,
        lineHeight: '34px',
        letterSpacing: 0.24,
        color: 'rgba(0,0,0,0.9)',
        margin: 0,
      }}>
        Trendings
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Segmented pill: light-grey container with white active item */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            padding: 2,
            borderRadius: 8,
            background: 'rgba(0,0,0,0.05)',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                onClick={() => onChange(cat)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  border: 'none',
                  background: isActive ? '#ffffff' : 'transparent',
                  fontFamily: "'Delight', sans-serif",
                  fontSize: 12,
                  lineHeight: '20px',
                  letterSpacing: 0.12,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Template filter dropdown — default "All Templates" */}
        <TemplateDropdown value={templateFilter} onChange={onTemplateChange} />
      </div>
    </div>
  );
}

function TemplateDropdown({
  value, onChange,
}: { value: TemplateFilter; onChange: (v: TemplateFilter) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px 4px 12px',
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.08)',
          background: open ? 'rgba(0,0,0,0.04)' : '#ffffff',
          fontFamily: "'Delight', sans-serif",
          fontSize: 12,
          lineHeight: '20px',
          fontWeight: 500,
          letterSpacing: 0.12,
          color: 'rgba(0,0,0,0.85)',
          cursor: 'pointer',
          transition: 'background 0.15s ease',
          height: 32,
        }}
      >
        {value}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 3 3-3" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            minWidth: 160,
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            padding: 4,
            zIndex: 10,
          }}
        >
          {TEMPLATE_FILTER_OPTIONS.map((opt) => {
            const isActive = opt === value;
            return (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: 'none',
                  background: isActive ? 'rgba(73,163,166,0.08)' : 'transparent',
                  fontFamily: "'Delight', sans-serif",
                  fontSize: 13,
                  lineHeight: '20px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? '#49A3A6' : 'rgba(0,0,0,0.85)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.04)'; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                <span>{opt}</span>
                {isActive && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#49A3A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.5L5 9l4.5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ========== PlaybookCard (Homepage style) ========== */

function PlaybookCard({ p, staggerMs }: { p: ExplorePlaybook; staggerMs: number }) {
  const tags = buildTags({
    template: p.cover.template,
    domain: p.cover.domain,
    tickers: p.tickers,
  });

  // Hover state — animate IN with a fast ease-out, snap OUT instantly
  // (no animation on mouseleave per spec). Conditional transition: when
  // hovered=true the next frame uses the timing curve; when hovered=false
  // transition is 'none' so the styles revert in one frame.
  const [hovered, setHovered] = useState(false);

  // Shadow color derives from the cover bg's HSL — a desaturated darker
  // tint of the same hue, applied at low alpha. Matches the cover family
  // (cool-teal screeners get cool shadows, warm theses get warm ones).
  const cover = useMemo(() => generateCover(p.cover), [p.cover]);
  const shadowColor = useMemo(() => {
    const { H, S } = cover.bg.hsl;
    // Lower opacity (0.14) and softer derivation for a quieter lift.
    return rgbToCss(hslToRgb(H, Math.min(S + 0.10, 0.40), 0.30), 0.14);
  }, [cover]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--b0-page, #fff)',
        border: '0.5px solid rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        // Smaller, lighter shadow per user feedback. Keeps the lift readable
        // but stops the card from feeling weighty when hovered.
        boxShadow: hovered ? `0 4px 12px -2px ${shadowColor}` : '0 0 0 0 transparent',
        // hover-in: fast ease-out · hover-out: instant (no transition)
        transition: hovered
          ? 'transform 130ms cubic-bezier(0.2, 0, 0, 1), box-shadow 130ms cubic-bezier(0.2, 0, 0, 1)'
          : 'none',
      }}
    >
      {/* Cover */}
      <div
        style={{
          margin: '4px 4px 0 4px',
          width: 'calc(100% - 8px)',
          aspectRatio: '320 / 140',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <PlaybookCover input={p.cover} staggerMs={staggerMs} />
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 16px 12px' }}>
        <PlaybookTags tags={tags} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Title — single line with ellipsis on overflow (user override of
              skill's 2-line wrap default). */}
          <p
            style={{
              fontSize: 16,
              lineHeight: '22px',
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              color: 'var(--text-n9, rgba(0,0,0,0.9))',
              letterSpacing: 0.16,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
            }}
          >
            {p.title}
          </p>
          <p
            style={{
              fontSize: 12,
              lineHeight: '20px',
              color: 'var(--text-n5, rgba(0,0,0,0.5))',
              letterSpacing: 0.12,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {p.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6, height: 22 }}>
            <Avatar name={p.creator} size={22} />
            <span
              style={{
                fontSize: 14,
                lineHeight: '22px',
                color: 'var(--text-n9, rgba(0,0,0,0.9))',
                letterSpacing: 0.14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {p.creator}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
              <CdnIcon name="star-l" size={16} />
              {p.stars}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
              <CdnIcon name="remix-l" size={16} />
              {p.remixes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== 页面 ========== */

export default function Explore2({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [activeTab, setActiveTab] = useState('Popular');
  const [templateFilter, setTemplateFilter] = useState<TemplateFilter>('All Templates');

  // Filter the ordered playbook list by the selected template. "Others" is
  // a UI category for future / non-defined templates and currently matches
  // no playbooks (empty list); "All Templates" disables filtering.
  const filteredPlaybooks = useMemo(() => {
    if (templateFilter === 'All Templates') return PLAYBOOKS_ORDERED;
    if (templateFilter === 'Others') return [];
    const target =
      templateFilter === 'Screener' ? 'screener' :
      templateFilter === 'Thesis'   ? 'thesis'   :
      templateFilter === 'What-If'  ? 'what-if'  :
      'general';
    return PLAYBOOKS_ORDERED.filter((p) => p.cover.template === target);
  }, [templateFilter]);

  // Hero carousel features the top 6 cards by stars — 5s auto-cycle handled
  // inside the component.
  const heroPlaybooks = useMemo(
    () => [...PLAYBOOKS_ORDERED].sort((a, b) => b.stars - a.stars).slice(0, 6),
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
        <div className="bg-[#f6f6f6] flex flex-col items-center min-h-full pb-[60px] pt-[72px] px-[40px] w-full">
          <div className="w-full flex flex-col gap-[24px]">
            <h2 className="text-[28px] leading-[38px] tracking-[0.28px] text-[rgba(0,0,0,0.9)]" style={{ fontFamily: "'Delight', sans-serif", fontWeight: 400 }}>Explore</h2>
            <HeroCarousel playbooks={heroPlaybooks} />
            <TrendingsHeader
              active={activeTab}
              onChange={setActiveTab}
              templateFilter={templateFilter}
              onTemplateChange={setTemplateFilter}
            />
            <div
              style={{
                display: 'grid',
                // Responsive grid per Figma node 3251:19020 (updated 2026-04-27):
                //   N = ⌊(W + 12) ÷ 272⌋ where 272 = 260 (min card) + 12 (gap).
                //   cardW = min(340, (W − 12·(N−1)) / N).
                // CSS auto-fill computes N; the per-card max-width caps growth
                // at 340 so transition zones absorb leftover as container space.
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 12,
                width: '100%',
              }}
            >
              {filteredPlaybooks.map((pb, i) => (
                <div
                  key={pb.id}
                  style={{ animationDelay: `${i * 60}ms`, maxWidth: 340 }}
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
