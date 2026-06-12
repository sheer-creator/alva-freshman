/**
 * [INPUT]: types.ts 的 Task/TaskThreadMsg
 * [OUTPUT]: TASKS（后台任务种子）、TASK_TRANSCRIPT（会话日志）、taskAck（任务内应答）、ASK_UNIVERSE（提问选项）
 * [POS]: agent-channel 数据层 — Tasks tab 数据（源自 demo planc 1459-1473/1715-1723/2531-2535/2630-2634 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Task } from './types';

/* ========== 任务种子 — 长程多步构建 ========== */

export const TASKS: Task[] = [
  { id: 't1', type: 'Playbook', tone: 'teal', title: 'Build: AI Infrastructure Theme Tracker', status: 'running', meta: 'started 2m ago · step 3 of 5',
    steps: [
      { t: 'Parse idea and define the basket scope', done: true },
      { t: 'Pull fundamentals — NVDA, AVGO, TSM + power-grid names', done: true },
      { t: 'Score sentiment across 142 sources', now: true },
      { t: 'Draft tracker layout and weekly digest', done: false },
      { t: 'Wire the weekly refresh schedule', done: false },
    ] },
  { id: 't2', type: 'Automation', tone: 'amber', title: 'Build: Earnings-Surprise Radar', status: 'needs-input', meta: 'waiting on you · 5m',
    ask: 'Which universe should I scan — your watchlist, S&P 500, or all US large-caps?' },
  { id: 't3', type: 'Research', tone: 'blue', title: 'Deep Dive: NVDA supply chain', status: 'done', meta: 'completed 1h ago · 38s',
    output: 'AI Infra Weekly Memo.pdf' },
  { id: 't4', type: 'Backtest', tone: 'green', title: 'Backtest: MAG7 equal-weight, 10Y', status: 'queued', meta: 'queued · starts after current task' },
];

/* ========== 会话日志（点开任务的完整记录） ========== */

export interface TranscriptEntry { role: 'user' | 'agent' | 'event' | 'tool'; text: string }

export const TASK_TRANSCRIPT: Record<string, TranscriptEntry[]> = {
  t1: [
    { role: 'user', text: 'Build a theme tracker for AI infrastructure — NVDA, AVGO, TSM, and power-grid names.' },
    { role: 'agent', text: 'On it. I’ll define the basket, pull fundamentals, score sentiment, then lay out a weekly tracker. Starting now.' },
    { role: 'event', text: 'Defined basket scope — 14 names across compute, networking, foundry, and grid.' },
    { role: 'event', text: 'Pulled fundamentals and last-4Q capex for all names.' },
    { role: 'tool', text: 'sentiment.scan(sources=142, window=7d)' },
    { role: 'agent', text: 'Scoring sentiment across 142 sources now — earnings calls, filings, and tracked KOLs. This is the slow step; about a minute left.' },
  ],
};

/* ========== 流式输出行池 — running 卡片的两行走马灯 ========== */

export const TASK_STREAM: Record<string, string[]> = {
  t1: [
    'Reading transcript: NVDA Q1 earnings call — management tone shifting positive',
    'Scored 88 of 142 sources · basket sentiment +0.62 and improving',
    'Cross-checking capex mentions against hyperscaler guides',
    'AVGO networking attach rate flagged in 3 new sources',
    'Pulling power-grid reads: VRT backlog revisions, GEV order book',
    'Drafting weekly digest layout — sentiment heatmap first',
  ],
};

const DEFAULT_STREAM = [
  'Pulling fresh data from connected sources',
  'Parsing filings and recent prints',
  'Cross-checking signals against your basket',
  'Scoring relevance · keeping only fresh information',
  'Drafting the write-up — numbers first, then the read',
];

/** 任务专属行池，否则用 steps 文本 + 通用池合成 */
export function streamFor(t: Task): string[] {
  return TASK_STREAM[t.id] ?? [...(t.steps?.map((s) => s.t) ?? []), ...DEFAULT_STREAM];
}

/* ========== 任务内应答 — 贴合会话所处状态 ========== */

export const taskAck = (t: Task): string =>
  t.status === 'done' ? 'This session is closed — say the word and I’ll reopen it with that change.'
  : t.status === 'queued' ? 'Noted — I’ll apply that when this session starts.'
  : t.status === 'needs-input' ? 'Thanks — that unblocks me, continuing the build now.'
  : 'Got it — folding that in. The current step re-runs with your instruction.';

/* ========== needs-input 提问的宇宙选项 ========== */

export const ASK_UNIVERSE = [
  { label: 'My watchlist', description: '32 names you already track' },
  { label: 'S&P 500', description: 'US large-cap universe' },
  { label: 'All US large-caps', description: 'Russell 1000 coverage' },
];
