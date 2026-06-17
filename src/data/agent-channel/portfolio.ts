/**
 * [INPUT]: types 的 PortfolioHolding/PortfolioAuto/PickableEntity、artifacts 的 EntityPack
 * [OUTPUT]: Portfolio Watch（Concept P）数据 — universes/个股池/automation 组/takes/sample/broker 持仓
 * [POS]: agent-channel 数据层 — Portfolio onboarding 与 digest（复活 revert 版 portfolio-digest，升级双路径）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { EntityPack } from './artifacts';
import type { PickableEntity, PortfolioAuto, PortfolioHolding, PortfolioSide } from './types';

/* ========== 热门赛道 Universe — 一键批量选 ========== */

export const PORTFOLIO_UNIVERSES: EntityPack[] = [
  { name: 'Magnificent 7', handles: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'], sub: 'AAPL, MSFT, GOOGL, AMZN +3 · 7 names' },
  { name: 'AI Infrastructure', handles: ['NVDA', 'AVGO', 'TSM', 'VRT', 'GEV'], sub: 'NVDA, AVGO, TSM, VRT, GEV · 5 names' },
  { name: 'Semiconductors', handles: ['NVDA', 'AVGO', 'TSM', 'AMD', 'ASML', 'MU'], sub: 'NVDA, AVGO, TSM, AMD +2 · 6 names' },
  { name: 'GLP-1 & Obesity', handles: ['LLY', 'NVO'], sub: 'LLY, NVO · 2 names' },
  { name: 'Power & Grid', handles: ['VRT', 'GEV', 'ETN', 'CEG'], sub: 'VRT, GEV, ETN, CEG · 4 names' },
  { name: 'Crypto Majors', handles: ['BTC', 'ETH', 'SOL'], sub: 'BTC, ETH, SOL · 3 names' },
  { name: 'Nuclear & Uranium', handles: ['CEG', 'CCJ', 'SMR'], sub: 'CEG, CCJ, SMR · 3 names' },
];

/* ========== 个股推荐池（单选网格） ========== */

export const PORTFOLIO_TICKERS: PickableEntity[] = [
  { name: 'NVIDIA', handle: 'NVDA', focus: 'AI compute · data center', stat: '$3.4T · +38% YTD' },
  { name: 'Apple', handle: 'AAPL', focus: 'Consumer hardware · services', stat: '$3.0T · +12% YTD' },
  { name: 'Microsoft', handle: 'MSFT', focus: 'Cloud · AI · software', stat: '$3.1T · +18% YTD' },
  { name: 'Broadcom', handle: 'AVGO', focus: 'Networking · custom ASIC', stat: '$1.2T · +24% YTD' },
  { name: 'TSMC', handle: 'TSM', focus: 'Foundry · advanced nodes', stat: '$1.1T · +19% YTD' },
  { name: 'Amazon', handle: 'AMZN', focus: 'E-commerce · AWS', stat: '$2.0T · +9% YTD' },
  { name: 'Eli Lilly', handle: 'LLY', focus: 'GLP-1 · pharma', stat: '$820B · +27% YTD' },
  { name: 'Vertiv', handle: 'VRT', focus: 'Power & cooling', stat: '$42B · +31% YTD' },
  { name: 'Bitcoin', handle: 'BTC', focus: 'Digital gold · macro', stat: '$1.3T · +44% YTD' },
  { name: 'Ethereum', handle: 'ETH', focus: 'Smart contracts · L2s', stat: '$410B · +28% YTD' },
];

/* ========== 一组平行 automation（onboarding 一次创建） ========== */

export const PORTFOLIO_AUTOMATIONS: PortfolioAuto[] = [
  { id: 'portfolio-brief', name: 'Portfolio Morning Brief', cadence: 'Daily · pre-open', desc: 'Each morning I read the overnight tape and hand you just what moves your thesis — the action, the catalysts, and where to look first.', defaultOn: true, icon: 'pulse' },
  { id: 'live-alerts', name: 'Proactive Watch', cadence: 'Real-time', desc: 'I watch every holding live and only interrupt when it matters — a real move, a broken level, a stop in danger, a fresh catalyst — always with the why.', defaultOn: true, icon: 'trend' },
  { id: 'rebalance-risk', name: 'Rebalance Advisor', cadence: 'Daily · post-close', desc: 'After the close I stress-test the book against your rules and drift, then come back with a concrete trim/add plan — not just a flag.', defaultOn: false, icon: 'sliders' },
  { id: 'weekly-recap', name: 'Weekly Review', cadence: 'Weekly · Sunday', desc: 'Every Sunday I attribute the week, learn what’s working in your book, and tee up what deserves your attention next.', defaultOn: false, icon: 'history' },
];

export const PORTFOLIO_DELIVER = ['This channel', 'This channel + Telegram'];

/* ========== 每个标的的晨间 take（digest 行据此生成） ========== */

interface Take { side: PortfolioSide; take: string; tag: string }

const TAKES: Record<string, Take> = {
  NVDA: { side: 'bullish', take: 'AI demand intact; consensus already prices a guide-raise into the print.', tag: 'earnings' },
  AVGO: { side: 'bullish', take: 'Networking attach rate is the under-modeled leg of the AI build.', tag: 'supply' },
  TSM: { side: 'neutral', take: 'CoWoS utilization checks stable; near-term supply risk low.', tag: 'supply' },
  AAPL: { side: 'neutral', take: 'Services growth steady; hardware refresh cycle the swing factor.', tag: 'product' },
  MSFT: { side: 'bullish', take: 'Azure AI revenue inflecting ahead of street models.', tag: 'cloud' },
  GOOGL: { side: 'neutral', take: 'Search resilient; cloud margin the key debate into the print.', tag: 'earnings' },
  AMZN: { side: 'bullish', take: 'AWS reacceleration plus retail margin expansion.', tag: 'cloud' },
  META: { side: 'bullish', take: 'Ad pricing firm; capex guide the watch item.', tag: 'macro' },
  TSLA: { side: 'bearish', take: 'Delivery growth stalling; margin pressure persists.', tag: 'demand' },
  AMD: { side: 'bullish', take: 'MI300 ramp adding a credible second AI-accelerator source.', tag: 'supply' },
  ASML: { side: 'neutral', take: 'EUV backlog solid; China export rules the overhang.', tag: 'macro' },
  MU: { side: 'bullish', take: 'HBM pricing tight into the AI memory cycle.', tag: 'supply' },
  LLY: { side: 'bullish', take: 'GLP-1 supply expanding; demand still outruns capacity.', tag: 'demand' },
  NVO: { side: 'neutral', take: 'Wegovy share defended; US pricing the risk.', tag: 'macro' },
  VRT: { side: 'bullish', take: 'Backlog +31% YoY with a raised FY guide — data-center power pull-through.', tag: 'earnings' },
  GEV: { side: 'bullish', take: 'Grid order book strong into the electrification capex cycle.', tag: 'supply' },
  ETN: { side: 'neutral', take: 'Electrical backlog healthy; valuation full near term.', tag: 'macro' },
  CEG: { side: 'bullish', take: 'Nuclear PPAs repricing higher with data-center demand.', tag: 'flows' },
  CCJ: { side: 'bullish', take: 'Uranium spot firm; long-term contracting accelerating.', tag: 'supply' },
  SMR: { side: 'neutral', take: 'SMR pipeline early; news-driven volatility high.', tag: 'macro' },
  BTC: { side: 'bullish', take: 'ETF net inflows positive; funding neutral, no froth yet.', tag: 'flows' },
  ETH: { side: 'neutral', take: 'L2 fee capture rising; spot ETF flows mixed.', tag: 'flows' },
  SOL: { side: 'bullish', take: 'Network activity at highs; DEX volume leadership intact.', tag: 'flows' },
  GLD: { side: 'bullish', take: 'Real yields rolling over; central-bank buying supportive.', tag: 'macro' },
  TLT: { side: 'bearish', take: 'Duration under pressure as cut odds get repriced out.', tag: 'macro' },
};

const FALLBACK: Take = { side: 'neutral', take: 'No thesis-changing move overnight — watching for the next catalyst.', tag: 'watch' };

const NAMES: Record<string, string> = {
  NVDA: 'NVIDIA', AVGO: 'Broadcom', TSM: 'TSMC', AAPL: 'Apple', MSFT: 'Microsoft', GOOGL: 'Alphabet',
  AMZN: 'Amazon', META: 'Meta', TSLA: 'Tesla', AMD: 'AMD', ASML: 'ASML', MU: 'Micron', LLY: 'Eli Lilly',
  NVO: 'Novo Nordisk', VRT: 'Vertiv', GEV: 'GE Vernova', ETN: 'Eaton', CEG: 'Constellation', CCJ: 'Cameco',
  SMR: 'NuScale', BTC: 'Bitcoin', ETH: 'Ethereum', SOL: 'Solana', GLD: 'SPDR Gold', TLT: 'iShares 20Y+',
};

/** 由 symbol（可选权重/盈亏）合成一行 digest holding */
export function makeHolding(symbol: string, weight?: number, pnlPct?: number): PortfolioHolding {
  const t = TAKES[symbol] ?? FALLBACK;
  return { symbol, name: NAMES[symbol], weight, pnlPct, side: t.side, take: t.take, tag: t.tag };
}

/* ========== sample 产物（onboarding 顶部展示） ========== */

export const PORTFOLIO_SAMPLE_BRIEF = {
  title: 'Your Morning Portfolio Brief',
  meta: 'Sample · 4 names · pre-market · 07:30',
  summary: 'A snapshot of what a daily brief looks like: AI-infra basket mixed pre-market — NVDA guide risk is the swing factor while TSM supply checks stay supportive. Connect your brokerage or pick tickers below to make it yours.',
  rows: [makeHolding('NVDA'), makeHolding('TSM'), makeHolding('AVGO'), makeHolding('AAPL')] as PortfolioHolding[],
  holdings: false,
};

export const SAMPLE_MOVE_PUSH = {
  text: '$NVDA +3.2% on 2.1× average volume — sympathy bid after AVGO networking commentary.',
  note: 'This is what a real-time Position Move Alert looks like. With a connected portfolio I’ll tag it with your weight and P&L impact.',
};

/* ========== Broker 导入持仓（自包含，数据风格照 trading-mock POSITIONS） ========== */

const STOCK_HOLDINGS: PortfolioHolding[] = [
  makeHolding('NVDA', 13.8, 5.19),
  makeHolding('MSFT', 12.6, 3.34),
  makeHolding('AAPL', 8.7, 7.73),
  makeHolding('GLD', 7.8, 4.04),
  makeHolding('TLT', 7.1, -3.57),
  makeHolding('AMZN', 3.7, 4.60),
];

const CRYPTO_HOLDINGS: PortfolioHolding[] = [
  makeHolding('BTC', 23.5, 7.77),
  makeHolding('ETH', 14.4, 8.57),
  makeHolding('SOL', 6.1, 11.20),
];

const CRYPTO_BROKERS = new Set(['binance', 'hyperliquid', 'okx', 'coinbase', 'etoro', 'kraken']);

/** brokerId → 导入持仓（按持仓规模降序）。crypto 券商→crypto 组，其余→美股组 */
export function brokerHoldings(brokerId: string): PortfolioHolding[] {
  const base = CRYPTO_BROKERS.has(brokerId) ? CRYPTO_HOLDINGS : STOCK_HOLDINGS;
  return [...base].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
}
