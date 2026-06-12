/**
 * [INPUT]: types.ts 的基础类型
 * [OUTPUT]: KOL 数据 — 推荐关注、信号推送、聚合 digest、bull/bear 配色
 * [POS]: agent-channel 数据层 — Concept K 的数据（源自 demo planc 1494-1518/1699-1712/2825 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ========== 推荐 KOL（一键 follow onboarding） ========== */

export interface KolRec {
  name: string;
  handle: string;
  focus: string;
  stat?: string;
  followed?: boolean;
}

export const KOL_RECOMMENDED: KolRec[] = [
  { name: 'Serenity', handle: '@SerenityFund', focus: 'AI infra · semis', stat: '142K followers · 71% hit-rate', followed: true },
  { name: 'Puru Saxena', handle: '@saxena_puru', focus: 'Growth equities', stat: '286K followers · 64% hit-rate', followed: true },
  { name: 'Evergreen Capital', handle: '@EvergreenCap', focus: 'Hyperscalers · cloud', stat: '98K followers · 68% hit-rate', followed: false },
  { name: 'Macro Scope X', handle: '@macroscopex', focus: 'Macro · rates', stat: '74K followers · 74.7% ROI', followed: false },
  { name: 'Chip Insider', handle: '@chip_insider', focus: 'Foundry · supply chain', stat: '53K followers · 66% hit-rate', followed: false },
  { name: 'Vol Whisperer', handle: '@volwhisperer', focus: 'Options · positioning', stat: '41K followers · 62% hit-rate', followed: false },
];

/* ========== 信号推送（agent 读原推、蒸馏要点） ========== */

export interface KolSignal {
  kol: string;
  handle: string;
  time: string;
  side: 'bullish' | 'bearish' | 'neutral';
  tickers: string[];
  conviction: number;
  freshness: string;
  quote: string;
  alva: string;
  source: { automation: string; playbook?: string };
}

export const KOL_SIGNALS: KolSignal[] = [
  { kol: 'Serenity', handle: '@SerenityFund', time: '2h', side: 'bullish', tickers: ['NVDA', 'AVGO'], conviction: 82, freshness: 'fresh',
    quote: 'Adding to AI-infra leaders into the next capex cycle. Supply checks on Blackwell remain tight; networking attach rate is the under-modeled leg.',
    alva: 'Fresh long-bias call — not a restate of an older thesis. Overlaps your core basket (NVDA, AVGO). Networking angle (AVGO) is new vs. their last note.',
    source: { automation: 'AI-Capex-Monitor', playbook: 'AI Infrastructure Theme Tracker' } },
  { kol: 'Puru Saxena', handle: '@saxena_puru', time: '5h', side: 'neutral', tickers: ['TSM'], conviction: 34, freshness: 'recycled',
    quote: 'Trimming a little TSM after the run. Still the highest-quality name in the supply chain; just managing position size, not the thesis.',
    alva: 'Position-management, not a thesis change. Your 5% risk rule already caps TSM — no action needed.',
    source: { automation: 'KOL-AI-Digest' } },
  { kol: 'Evergreen Capital', handle: '@EvergreenCap', time: '8h', side: 'bullish', tickers: ['MSFT'],
    conviction: 67, freshness: 'building',
    quote: 'Azure AI revenue inflecting faster than street models. Capex is the cost of winning here, not a red flag.',
    alva: 'Bullish read on hyperscaler capex — reinforces your AI-infra read-through. Tracked by your AI-Capex-Monitor automation.',
    source: { automation: 'AI-Capex-Monitor', playbook: 'AI Infrastructure Theme Tracker' } },
];

/* ========== 聚合 digest（晨间汇总，多位 KOL 合一） ========== */

export const KOL_DIGEST_AGG = {
  title: 'Today’s AI Digest',
  meta: 'Jun 9 · 6 signals from 4 voices · 07:30',
  summary: 'Net read: AI-infra conviction is rising into the capex cycle. 4 of 6 fresh signals lean bullish, concentrated in NVDA / AVGO; one trim (TSM) is position-management, not a thesis change.',
  rows: [
    { kol: 'Serenity', side: 'bullish', ticker: 'NVDA', take: 'Adding into the capex cycle; Blackwell supply still tight.' },
    { kol: 'Serenity', side: 'bullish', ticker: 'AVGO', take: 'Networking attach rate is the under-modeled leg.' },
    { kol: 'Evergreen Capital', side: 'bullish', ticker: 'MSFT', take: 'Azure AI revenue inflecting ahead of street models.' },
    { kol: 'Chip Insider', side: 'bullish', ticker: 'TSM', take: 'CoWoS capacity doubling through 2025 — supply easing.' },
    { kol: 'Puru Saxena', side: 'neutral', ticker: 'TSM', take: 'Trimming after the run; managing size, not thesis.' },
    { kol: 'Vol Whisperer', side: 'bearish', ticker: 'SMH', take: 'Call skew stretched — near-term pullback risk.' },
  ] as { kol: string; side: 'bullish' | 'bearish' | 'neutral'; ticker: string; take: string }[],
  source: { automation: 'KOL-AI-Digest' },
};

/* ========== bull/bear 配色 ========== */

export const KOL_SIDE: Record<'bullish' | 'bearish' | 'neutral', { c: string; bg: string; l: string }> = {
  bullish: { c: 'var(--main-m3)', bg: 'rgba(45,143,97,0.10)', l: 'Bullish' },
  bearish: { c: 'var(--main-m4)', bg: 'rgba(224,83,87,0.10)', l: 'Bearish' },
  neutral: { c: 'var(--text-n5)', bg: 'var(--b-r05)', l: 'Neutral' },
};
