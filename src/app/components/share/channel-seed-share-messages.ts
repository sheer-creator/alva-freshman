import type { ConversationShareMessage } from './conversation-share';

export const SEED_USER_PROMPT_TEXT = 'Create a strategy Agent to monitor the $GoldenDog meme token, using various indicators including but not limited to: market cap range settings, News RSS feeds, social media tracking, price volatility, and mentions by key opinion leaders (KOLs).';

export const SEED_PLAYBOOK_PLAN_TEXT = "I'll build this as a backtested trading strategy on NVDA / AAPL / TSLA using Altra, then wrap it in a live playbook.";

export const SEED_MEME_PULSE = {
  title: 'Meme token pulse — last 4h:',
  bullets: [
    '$GoldenDog reclaimed its 4h VWAP on 2.3× average volume — first bullish structure since the June 8 flush [1]',
    'Whale 0x7f…c2a added 4.1M $GOLDEN (~$182K), now a top-12 holder with no distribution in 72h [2]',
    'Social mentions +340% w/w, but Alva’s model flags 61% as bot-likely — treat the spike as noise [3]',
  ],
};

/* 追问链（5-10 条）:whale 风险 → VWAP 硬警报 → 自动化建立 → 推送触发 → 收尾建议 */
export const SEED_WHALE_ASK_TEXT = 'What’s the biggest risk to this setup if the whale wallet starts distributing?';

export const SEED_WHALE_RISK = {
  intro: 'Concentration is the main fragility here — top-15 wallets hold 38% of $GOLDEN supply, so one distributor can unwind the whole 4h structure.',
  bullets: [
    'Sustained sell pressure above 1.5× average volume',
    'VWAP loss with no reclaim within two bars',
    'Social sentiment rolling over while price stalls',
  ],
};

export const SEED_VWAP_ASK_TEXT = 'Set a hard alert: message me if $GoldenDog loses its 4h VWAP on volume above 1.5× average.';

export const SEED_VWAP_CONFIRM_TEXT = 'Done — goldendog-vwap-guard is live. It checks every 15 minutes and fires only on a confirmed VWAP loss with volume above your 1.5× threshold. First run lands with the next cycle.';

export const SEED_VWAP_PUSH = {
  title: '⚠️ $GoldenDog lost its 4h VWAP · $0.00184',
  body: 'Volume ran 1.8× average into the break — structure invalidated, the June 12 reclaim thesis is off. Whale 0x7f…c2a has not moved yet.',
};

export const SEED_WRAPUP_TEXT = 'Want me to fold these guards into the playbook before it goes live? I can add the VWAP guard as a kill-switch condition and keep the whale tracker as a daily digest.';

export const CHANNEL_SEED_SHARE_MESSAGES: ConversationShareMessage[] = [
  {
    id: 'seed-user-playbook',
    role: 'user',
    text: SEED_USER_PROMPT_TEXT,
    time: '10:28 PM',
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
  {
    id: 'seed-agent-meme-pulse',
    role: 'agent',
    text: [
      SEED_MEME_PULSE.title,
      ...SEED_MEME_PULSE.bullets.map((line) => `• ${line}`),
    ].join('\n'),
    time: '10:28 PM',
    date: 'June 12, 2026',
  },
  {
    id: 'seed-user-whale-risk',
    role: 'user',
    text: SEED_WHALE_ASK_TEXT,
    time: '10:31 PM',
    date: 'June 12, 2026',
  },
  {
    id: 'seed-agent-whale-risk',
    role: 'agent',
    text: [
      SEED_WHALE_RISK.intro,
      'Watch for:',
      ...SEED_WHALE_RISK.bullets.map((line) => `• ${line}`),
    ].join('\n'),
    time: '10:31 PM',
    date: 'June 12, 2026',
  },
  {
    id: 'seed-user-vwap-alert',
    role: 'user',
    text: SEED_VWAP_ASK_TEXT,
    time: '10:33 PM',
    date: 'June 12, 2026',
  },
  {
    id: 'seed-agent-vwap-confirm',
    role: 'agent',
    text: SEED_VWAP_CONFIRM_TEXT,
    time: '10:33 PM',
    date: 'June 12, 2026',
  },
  {
    id: 'seed-notification-vwap-guard',
    role: 'notification',
    text: [
      SEED_VWAP_PUSH.title,
      SEED_VWAP_PUSH.body,
      '',
      'Source: goldendog-vwap-guard',
    ].join('\n'),
    time: '10:38 PM',
    date: 'June 12, 2026',
  },
  {
    id: 'seed-agent-wrapup',
    role: 'agent',
    text: SEED_WRAPUP_TEXT,
    time: '10:39 PM',
    date: 'June 12, 2026',
  },
];
