/**
 * [INPUT]: ExplorePlaybook 类型（shared/PlaybookCard）
 * [OUTPUT]: User Profile 页面 mock 数据
 * [POS]: 数据层 — Figma Draft 6127:39847 "Page/Profile/Playbooks · Owner" 对应的数据
 */

import type { ExplorePlaybook } from '@/app/components/shared/PlaybookCard';

const asset = (name: string) => `${import.meta.env.BASE_URL}figma/explore/${name}`;

/* ========== 类型 ========== */

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  joinDate: string;
  isPro: boolean;
  /** 稿里 HandleRow 的三个社交入口，缺省则不渲染该段 */
  socials: { x?: string; telegram?: string; discord?: string };
  bio: string;
  totalPlaybooks: number;
  totalStars: number;
  totalRemix: number;
  /** 已含货币符号与千分位，直接展示 */
  earned: string;
}

/** 右侧 segmented control（All / Public / Private / Paid）的筛选依据 */
export type PlaybookVisibility = 'public' | 'private' | 'paid';

export type ProfilePlaybook = ExplorePlaybook & { visibility: PlaybookVisibility };

/* ========== 用户 ========== */

export const MOCK_USER: UserProfile = {
  id: 'yggyll',
  name: 'YGGYLL',
  handle: '@yggyll',
  joinDate: 'Dec 23, 2025',
  isPro: true,
  socials: { x: '@yggyll', telegram: '@YGGYLLSignals', discord: 'yggyll.alva' },
  bio: 'I am YGGYLL — building crypto trading playbooks focused on momentum, breakouts, and asymmetric risk. Mostly mid-cap alts + meme tokens. New playbooks weekly. Always learning, sometimes wrong, never boring. I run two parallel research streams: (1) on-chain liquidity divergences across major DEXes; (2) sentiment-velocity from social listening on Twitter, Discord and Farcaster. Subscribers get weekly playbooks Monday 9am UTC, intraday alerts on momentum breakouts, and post-mortems every Friday. Founded 2024 after eight years across systematic equity desks at Citadel and Two Sigma. Not financial advice — these are my own positions, sized for my own risk.',
  totalPlaybooks: 6,
  totalStars: 890,
  totalRemix: 12,
  earned: '$12,023.42',
};

/* ========== Playbooks — 本人发布 ========== */

export const MOCK_PLAYBOOKS: ProfilePlaybook[] = [
  {
    id: 'btc-ultimate-ai-trader',
    creator: 'YGGYLL',
    title: 'BTC Ultimate AI Trader',
    description: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements.",
    tickers: ['BTC'],
    pulse: 'active',
    stars: 142,
    remixes: 3,
    visibility: 'private',
    cover: {
      template: 'screener',
      title: 'BTC Ultimate AI Trader',
      author: 'YGGYLL',
      tickers: ['BTC'],
      coverImageUrl: asset('card-btc-ultimate.png'),
    },
  },
  {
    id: 'mag7-equal-weight-monthly-rebalance',
    creator: 'YGGYLL',
    title: 'MAG7 Equal-Weight Monthly Rebalance',
    description: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly',
    tickers: [],
    pulse: 'active',
    stars: 208,
    remixes: 5,
    visibility: 'public',
    cover: {
      template: 'what-if',
      title: 'MAG7 Equal-Weight Monthly Rebalance',
      author: 'YGGYLL',
      tickers: [],
      coverImageUrl: asset('card-mag7-rebalance.png'),
    },
  },
  {
    id: 'pepe-long-vs-btc-short',
    creator: 'YGGYLL',
    title: 'PEPE Long vs BTC Short Monthly Rebalance',
    description: 'The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.',
    tickers: ['PEPE', 'BTC'],
    pulse: 'active',
    stars: 96,
    remixes: 2,
    visibility: 'private',
    cover: {
      template: 'what-if',
      title: 'PEPE Long vs BTC Short Monthly Rebalance',
      author: 'YGGYLL',
      tickers: ['PEPE', 'BTC'],
      coverImageUrl: asset('card-pepe-btc.png'),
    },
  },
  {
    id: 'attribution-analysis-price-trends',
    creator: 'YGGYLL',
    title: 'Attribution Analysis Strategy for Price Trends',
    description: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.',
    tickers: ['BTC', 'ETH'],
    pulse: 'active',
    stars: 174,
    remixes: 6,
    price: '$5/mo',
    visibility: 'paid',
    cover: {
      template: 'thesis',
      title: 'Attribution Analysis Strategy for Price Trends',
      author: 'YGGYLL',
      tickers: ['BTC', 'ETH'],
      coverImageUrl: asset('card-attribution.png'),
    },
  },
  {
    id: 'nvda-triggered-tsm',
    creator: 'YGGYLL',
    title: 'NVDA +3% Triggered TSM TP/SL',
    description: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
    tickers: ['NVDA', 'TSM'],
    pulse: 'active',
    stars: 187,
    remixes: 4,
    price: '$50',
    visibility: 'paid',
    cover: {
      template: 'what-if',
      title: 'NVDA +3% Triggered TSM TP/SL',
      author: 'YGGYLL',
      tickers: ['NVDA', 'TSM'],
      coverImageUrl: asset('card-nvda-tsm.png'),
    },
  },
  {
    id: 'btc-macd-1h-simple-crossover',
    creator: 'YGGYLL',
    title: 'BTC MACD 1h Simple Crossover',
    description: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
    tickers: ['BTC'],
    pulse: 'idle',
    stars: 83,
    remixes: 1,
    visibility: 'public',
    cover: {
      template: 'screener',
      title: 'BTC MACD 1h Simple Crossover',
      author: 'YGGYLL',
      tickers: ['BTC'],
      coverImageUrl: asset('card-btc-macd.png'),
    },
  },
];

/* ========== Starred — 收藏别人的 ========== */

export const MOCK_STARRED: ProfilePlaybook[] = [
  {
    id: 'short-squeeze-risk-map',
    creator: 'Macro Scope X',
    title: 'Short-Squeeze Risk Map',
    description: 'Ranks heavily shorted names by borrow-fee spikes, days-to-cover and gamma exposure to flag squeeze candidates before the crowd notices.',
    tickers: [],
    pulse: 'active',
    stars: 412,
    remixes: 18,
    visibility: 'public',
    cover: {
      template: 'thesis',
      title: 'Short-Squeeze Risk Map',
      author: 'Macro Scope X',
      tickers: [],
      coverImageUrl: asset('card-short-squeeze.png'),
    },
  },
  {
    id: 'us-crypto-dat-monitor',
    creator: 'Deep Ledger',
    title: 'US Crypto DAT Companies Monitor',
    description: 'Feed incorporates both real anomaly signals and reference cases for interpretation. Update frequencies adjusted as new PTR, Form 4, and 10b5-1 filings are parsed.',
    tickers: [],
    pulse: 'active',
    stars: 267,
    remixes: 9,
    visibility: 'public',
    cover: {
      template: 'screener',
      title: 'US Crypto DAT Companies Monitor',
      author: 'Deep Ledger',
      tickers: [],
      coverImageUrl: asset('card-crypto-dat.png'),
    },
  },
  {
    id: 'nvda-trading-research-dashboard',
    creator: 'Silicon Cycle',
    title: 'NVDA Trading Strategy Research Dashboard',
    description: 'Multi-timeframe NVDA price/volume context, trend & momentum, relative strength vs market/sector, flow/derivatives proxies, earnings/event stats.',
    tickers: ['NVDA'],
    pulse: 'idle',
    stars: 155,
    remixes: 7,
    visibility: 'public',
    cover: {
      template: 'thesis',
      title: 'NVDA Trading Strategy Research Dashboard',
      author: 'Silicon Cycle',
      tickers: ['NVDA'],
      coverImageUrl: asset('card-nvda-research.png'),
    },
  },
];

/* ========== Purchased — 已解锁的付费 playbook ========== */

export const MOCK_PURCHASED: ProfilePlaybook[] = [
  {
    id: 'eth-daily-price-change',
    creator: 'WalletWatcher',
    title: 'ETH Daily Price & Change Tracker',
    description: 'Tracks daily prices and daily percentage changes for ETH in a single table for quick monitoring.',
    tickers: ['ETH'],
    pulse: 'active',
    stars: 321,
    remixes: 11,
    price: '$50',
    visibility: 'paid',
    cover: {
      template: 'screener',
      title: 'ETH Daily Price & Change Tracker',
      author: 'WalletWatcher',
      tickers: ['ETH'],
      coverImageUrl: asset('card-eth-daily.png'),
    },
  },
  {
    id: 'google-x-trends-tracker',
    creator: 'Market Bento',
    title: 'Google / X Trends Tracker',
    description: 'Monitor search and social interest across tickers to catch attention spikes before they show up in price and volume.',
    tickers: ['GOOGL'],
    pulse: 'idle',
    stars: 198,
    remixes: 4,
    price: '$29/mo',
    visibility: 'paid',
    cover: {
      template: 'screener',
      title: 'Google / X Trends Tracker',
      author: 'Market Bento',
      tickers: ['GOOGL'],
      coverImageUrl: asset('card-google-trends.png'),
    },
  },
];
