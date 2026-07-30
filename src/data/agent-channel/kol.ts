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

/* ========== bull/bear 配色 ========== */

export const KOL_SIDE: Record<'bullish' | 'bearish' | 'neutral', { c: string; bg: string; l: string }> = {
  bullish: { c: 'var(--main-m3)', bg: 'rgba(45,143,97,0.10)', l: 'Bullish' },
  bearish: { c: 'var(--main-m4)', bg: 'rgba(224,83,87,0.10)', l: 'Bearish' },
  neutral: { c: 'var(--text-n5)', bg: 'var(--b-r05)', l: 'Neutral' },
};
