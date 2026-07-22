import type { ConversationShareMessage } from './conversation-share';

export const SEED_PLAYBOOK_PLAN_TEXT = "I'll build this as a backtested trading strategy on NVDA / AAPL / TSLA using Altra, then wrap it in a live playbook.";

export const CHANNEL_SEED_SHARE_MESSAGES: ConversationShareMessage[] = [
  {
    id: 'seed-user-playbook',
    role: 'user',
    text: 'Build a trading playbook, NVDA, AAPL, TSLA',
    time: '10:27 PM',
    date: 'June 12, 2026',
  },
  {
    id: 'seed-agent-playbook-plan',
    role: 'agent',
    text: SEED_PLAYBOOK_PLAN_TEXT,
    time: '10:28 PM',
    date: 'June 12, 2026',
  },
  {
    id: 'seed-notification-chip-digest',
    role: 'notification',
    text: [
      '📬 AI Chip Supply Chain — Daily Digest · 2026-06-12',
      '',
      'What moved today:',
      '• TSMC’s Winbond DRAM Deal Isn’t Domination, It’s Insurance. Here’s What It Actually Means for Chip ETFs [1]',
      '• TSMC Q2 Earnings July 16: Three CoWoS Signals That Test AI’s Spending Ceiling [2]',
      '• Memory Market Expert: “SK Hynix Is Bigger, Cheaper and Closer to NVIDIA.” Inside Its $26.5 Billion Nasdaq Debut [3]',
      '',
      'What to watch next:',
      '• TSMC monthly sales cadence and any new SMIC capacity disclosures.',
      '• TSMC Q2 Earnings July 16: Three CoWoS Signals That Test AI’s Spending Ceiling [2]',
      '',
      'Source: nvda-macd-hft-notify',
    ].join('\n'),
    time: '10:28 PM',
    date: 'June 12, 2026',
  },
];
