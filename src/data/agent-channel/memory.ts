/**
 * [INPUT]: types.ts 的 Tone
 * [OUTPUT]: MEMORY（记忆卡片）、MEMORY_FILES（文件树）、USER_MD（可编辑档案）
 * [POS]: agent-channel 数据层 — Memory tab 数据（源自 demo planc 1411-1456 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Tone } from './types';

/* ========== 记忆卡片 — agent 为用户保存的长期上下文 ========== */

export interface MemoryItem { tone: Tone; t: string; b: string; chips: string[] }

export const MEMORY: MemoryItem[] = [
  { tone: 'teal', t: 'Long-only, thesis-driven', b: 'You prefer concentrated, thesis-driven setups and rarely short. I weight new ideas accordingly.', chips: ['preference', 'verified'] },
  { tone: 'blue', t: 'Core basket: AI infrastructure', b: 'NVDA, AVGO, TSM, and power-grid names are your focus. I track sentiment and capex read-through weekly.', chips: ['active theme', 'basket'] },
  { tone: 'amber', t: 'Risk rule: 5% max per name', b: 'You asked me to flag any playbook that sizes a single position above 5% of the book.', chips: ['risk rule'] },
  { tone: 'green', t: 'Alert tone: evidence first', b: 'Separate fresh calls from recycled conviction before alerting — and keep it short. Your note from last week.', chips: ['delivery rule'] },
];

/* ========== 结构化记忆 — 以可编辑 User.md 为锚的文件树 ========== */

export const MEMORY_FILES = {
  root: { name: 'User.md', meta: 'edited 2d ago' },
  folder: 'memory',
  files: [
    { name: 'core-basket.md', meta: 'AI infra · 14 names', tone: 'blue' as Tone },
    { name: 'risk-rules.md', meta: '5% max per name', tone: 'amber' as Tone },
    { name: 'verified-theses.md', meta: '3 active · 1 retired', tone: 'green' as Tone },
    { name: 'alert-style.md', meta: 'evidence-first', tone: 'teal' as Tone },
  ],
};

export const USER_MD = `# User.md

_Alva keeps this profile as long-term memory. Edit it anytime — every playbook, brief, and alert reads from here._

## About you
- **Name** — Leo
- **Role** — Self-directed investor
- **Markets** — US equities, crypto

## Investing style
- Long-only, thesis-driven. Rarely shorts.
- Horizon: weeks to quarters.
- Concentrated over diversified — high conviction, few names.

## Focus & watchlist
- **Active theme** — AI infrastructure
- **Core basket** — NVDA, AVGO, TSM, power-grid names
- _Add more tickers or themes to sharpen Alva's tracking._

## Risk rules
- Max 5% of book in any single name.
- Flag any playbook that breaches the limit before it runs.

## How Alva should talk to you
- Evidence first — separate fresh calls from recycled conviction.
- Keep alerts short. Link to detail, don't paste it.
- No hype, no emoji.`;
