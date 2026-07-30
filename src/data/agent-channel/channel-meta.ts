/**
 * [INPUT]: types.ts 的 ImMeta
 * [OUTPUT]: 频道元数据（标题/描述/IM 列表）+ 模块级会话态
 * [POS]: agent-channel 数据层 — 频道骨架信息（源自 demo planc 1486/1844/3478-3486/3719-3723/3825-3826 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { ImId, ImMeta } from './types';

/* ========== 频道身份 ========== */

export const CHANNEL = {
  id: 'agent',
  label: 'Alva Agent',
  meta: 'single channel',
  desc: 'Your single persistent Alva Agent Channel — onboarding, tasks, automations, artifacts, and memory all land here.',
} as const;

/* ========== IM 连接 ========== */

export const IMS: ImMeta[] = [
  { id: 'telegram', label: 'Telegram', icon: 'telegram', handle: '@leo_tg', sub: 'Bot DM — instant pushes' },
  { id: 'discord', label: 'Discord', icon: 'discord', handle: 'leo#0882', sub: 'Bot DM — switch channels with /channel' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp', handle: '+1 ··· 4821', sub: 'Business account DM' },
  { id: 'slack', label: 'Slack', icon: 'slack', handle: '@leo · alva-hq', sub: 'Alva app in your workspace' },
];

export const IM_TINT: Record<ImId, string> = {
  telegram: '#5aa6e8',
  discord: '#8b6fe0',
  whatsapp: '#3da55e',
  slack: '#b8862f',
};

/* ========== 模块级会话态 ==========
 * 故意放在模块作用域：sidebar 点击会让页面整体 remount（App 的 agentKey），
 * 这些"会话感"状态要像 demo 的页面级变量一样跨 remount 存活、刷新即重置。 */

/** 已连接的 IM —— demo 中 Alva Agent 频道默认已连 Telegram */
export const IM_LINKS: Partial<Record<ImId, boolean>> = { telegram: true };

/** 本会话是否已弹过 "connect an IM" nudge */
export const IM_REC_SHOWN = { current: false };
