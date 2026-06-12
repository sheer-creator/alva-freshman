/**
 * [INPUT]: types.ts 的 Automation/ArtifactFile/PickableEntity、kol.ts 的 KOL_RECOMMENDED
 * [OUTPUT]: Alerts / Files tab 数据 — ARTIFACTS（文件）/AUTOMATIONS（alerts）+ 自动化模板与元数据
 * [POS]: agent-channel 数据层 — Alerts/Files tab 与 alert modal（源自 demo planc 1476-1482/1740-1745/2845-2855/3288-3309 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { KOL_RECOMMENDED } from './kol';
import type { ArtifactFile, Automation, PickableEntity } from './types';

/* ========== 生成的文件 ========== */

export const ARTIFACTS: ArtifactFile[] = [
  { kind: 'PDF', tone: 'red', t: 'AI Infra Weekly Memo', b: 'Generated from your Theme Tracker run · 2.4 MB', badge: 'New', badgeKind: 'green' },
  { kind: 'SK', tone: 'teal', t: 'my-semis-screener.skill', b: 'Custom factor screen you built and saved', badge: 'Active', badgeKind: 'green' },
  { kind: 'CSV', tone: 'blue', t: 'mag7-backtest-results.csv', b: '10Y equal-weight backtest output', badge: '1.1 MB', badgeKind: '' },
  { kind: 'SRC', tone: 'orange', t: 'KOL source pack', b: 'Tracked handles, benchmarks, and freshness rules', badge: 'Review', badgeKind: 'amber' },
];

/* ========== 运行中的自动化（镜像 Settings → Automations） ========== */

export const AUTOMATIONS: Automation[] = [
  { id: 'a1', name: 'AI-Capex-Monitor', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 142, usedBy: [['alva', 'ai-infra-tracker'], ['leo', 'power-grid-basket']] },
  { id: 'a2', name: 'Funding-Rate-Watcher', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 142, usedBy: [['satoshi', 'btc-macd-1h']] },
  { id: 'a3', name: 'Liquidity-Drift-Scanner', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 142, usedBy: [['alva', 'whale-flow-tracker']] },
  { id: 'a4', name: 'Whale-Alert-Monitor', status: 'active', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 142, usedBy: [] },
  { id: 'a5', name: 'Earnings-Surprise-Radar', status: 'paused', lastRun: '—', runEvery: 'Every 5 minutes', runs: 142, usedBy: [['maya', 'gas-turbine-supply']] },
];

/* ========== 精选包 — 批量选择实体集合 ========== */

export interface EntityPack {
  name: string;
  handles: string[];
  sub: string;
}

export const ENTITY_PACKS: Record<'kol' | 'tickers', EntityPack[]> = {
  kol: [
    { name: 'AI Infrastructure', handles: ['@SerenityFund', '@EvergreenCap', '@chip_insider', '@macroscopex'], sub: 'Serenity, Evergreen, Chip Insider +1 · 4 voices' },
    { name: 'Macro & Rates', handles: ['@macroscopex', '@volwhisperer', '@saxena_puru'], sub: 'Macro Scope X, Vol Whisperer, Puru Saxena · 3 voices' },
    { name: 'Crypto Desk', handles: ['@SatoshiA', '@coldwallet', '@mai_t', '@q_macro'], sub: 'Satoshi A, Coldwallet +2 · 4 voices' },
  ],
  tickers: [
    { name: 'AI Infrastructure', handles: ['NVDA', 'AVGO', 'TSM'], sub: 'NVDA, AVGO, TSM · 3 names' },
    { name: 'Power & Grid', handles: ['VRT', 'GEV'], sub: 'VRT, GEV · 2 names' },
  ],
};

/* ========== 自动化模板（模板态 vs 纯指令态） ========== */

export const TICKER_RECOMMENDED: PickableEntity[] = [
  { name: 'NVIDIA', handle: 'NVDA', focus: 'AI compute · data center', stat: '$3.4T cap · +38% YTD' },
  { name: 'Broadcom', handle: 'AVGO', focus: 'Networking · custom ASIC', stat: '$1.2T cap · +24% YTD' },
  { name: 'TSMC', handle: 'TSM', focus: 'Foundry · advanced nodes', stat: '$1.1T cap · +19% YTD' },
  { name: 'Vertiv', handle: 'VRT', focus: 'Power & cooling', stat: '$42B cap · +31% YTD' },
  { name: 'GE Vernova', handle: 'GEV', focus: 'Grid & generation', stat: '$96B cap · +27% YTD' },
];

export interface AutoTemplate {
  id: string;
  label: string;
  hint: string;
  entityLabel: string;
  onLabel: string;
  offLabel: string;
  ph: string;
  recs: PickableEntity[];
  packs: EntityPack[];
  name: string;
  every: string;
  prompt: string;
}

export const AUTO_TEMPLATES: AutoTemplate[] = [
  { id: 'kol', label: 'KOL Digest', hint: 'Follow a set of voices', entityLabel: 'Voices to follow', onLabel: 'Following', offLabel: 'Follow',
    ph: 'Add any handle — e.g. @chamath, a Substack, or a Telegram channel',
    recs: KOL_RECOMMENDED, packs: ENTITY_PACKS.kol,
    name: 'KOL-Morning-Digest', every: 'Daily · 07:30 ET',
    prompt: 'Each morning, read everything these voices posted overnight, keep only the posts with a real signal, and push one digest — each item with the call, the ticker, and why it matters.' },
  { id: 'tickers', label: 'Ticker Digest', hint: 'Watch a set of tickers', entityLabel: 'Tickers to watch', onLabel: 'Watching', offLabel: 'Watch',
    ph: 'Add any ticker — e.g. MSFT, COIN, 7203.T',
    recs: TICKER_RECOMMENDED, packs: ENTITY_PACKS.tickers,
    name: 'Ticker-Daily-Digest', every: 'Daily · post-close',
    prompt: 'Every day after the close, summarize what moved these tickers — price, volume, news, filings — into one short digest. Flag anything that changes the thesis.' },
];

/* ========== 运行频率选项 ========== */

export const AUTO_CADENCES = ['Every 5 min', 'Hourly', 'Daily · 07:30 ET', 'Daily · post-close', 'Weekly · Monday'];
