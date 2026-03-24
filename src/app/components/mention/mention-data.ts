/**
 * [INPUT]: alva-chat-mock
 * [OUTPUT]: @ mention 可引用实体列表
 * [POS]: mention 模块 — 数据层
 */

import { MOCK_CONVERSATIONS } from '@/data/alva-chat-mock';
import { CHART_COLORS } from '@/lib/chart-theme';

/* ========== 类型 ========== */

export interface MentionItem {
  id: string;
  type: 'playbook' | 'thread';
  title: string;
  subtitle: string;
  tag?: string;
  themeColor: string;
}

/* ========== Mock 数据 ========== */

const C = CHART_COLORS;

export const MENTION_ITEMS: MentionItem[] = [
  /* Playbooks */
  { id: 'pb-btc-ultimate', type: 'playbook', title: 'BTC Ultimate AI Trader', subtitle: 'Alva Intern', tag: 'Browsing', themeColor: C.primary },
  { id: 'pb-mag7', type: 'playbook', title: 'MAG7 Equal-Weight', subtitle: 'Harry Zzz', tag: 'Browsing', themeColor: C.blue },
  { id: 'pb-nvda-tsm', type: 'playbook', title: 'NVDA +3% Triggered TSM', subtitle: 'Smart Jing', tag: 'Browsing', themeColor: C.red },
  { id: 'pb-attribution', type: 'playbook', title: 'Attribution Analysis', subtitle: 'Sheer YLL YGG', tag: 'Browsing', themeColor: C.orange },
  { id: 'pb-my-eth', type: 'playbook', title: 'ETH Momentum Scanner', subtitle: 'You', tag: 'Created', themeColor: '#7B61FF' },
  { id: 'pb-my-spy', type: 'playbook', title: 'SPY Iron Condor Weekly', subtitle: 'You', tag: 'Created', themeColor: '#E6A91A' },
  { id: 'pb-star-macro', type: 'playbook', title: 'Macro Regime Alpha', subtitle: 'Regime Capital', tag: 'Starred', themeColor: '#2a9b7d' },
  { id: 'pb-star-earnings', type: 'playbook', title: 'GPT-4 Earnings Whisper', subtitle: 'DeFi Sage', tag: 'Starred', themeColor: C.deepBlue },

  /* Threads */
  ...MOCK_CONVERSATIONS.map(c => ({
    id: `thread-${c.id}`,
    type: 'thread' as const,
    title: c.title,
    subtitle: c.tickers.join(', '),
    themeColor: '#3a3a48',
  })),
];
