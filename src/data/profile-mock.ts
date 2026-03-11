/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: User Profile 页面 mock 数据
 * [POS]: 数据层 — 用户维度的社区功能演示数据
 */

/* ========== 类型 ========== */

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  joinDate: string;
  pulse: 'active' | 'idle';
  publishedBy?: string;
  totalPlaybooks: number;
  totalStars: number;
  totalForks: number;
  totalComments: number;
  totalSkills: number;
}

export interface PlaybookSummary {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  status: 'active' | 'idle';
  annualizedReturn: string;
  createdDate: string;
  tags: string[];
}

export interface SkillSummary {
  id: string;
  name: string;
  description: string;
  category: 'alva' | 'custom';
  author: string;
  stars: number;
  weeklyInstalls: string;
  lastUpdated: string;
  tags: string[];
}

export interface CommentActivity {
  id: string;
  playbookName: string;
  playbookAuthor: string;
  text: string;
  timestamp: string;
  replyTo?: string;
}

/* ========== Mock 数据 ========== */

export const MOCK_USER: UserProfile = {
  id: 'alice-chen',
  name: 'Alice Chen',
  bio: 'Quant Researcher · 5y crypto · Building momentum strategies',
  joinDate: 'Jan 2024',
  pulse: 'active',
  publishedBy: 'Alva Intern',
  totalPlaybooks: 6,
  totalStars: 890,
  totalForks: 96,
  totalComments: 5,
  totalSkills: 4,
};

export const MOCK_PLAYBOOKS: PlaybookSummary[] = [
  {
    id: 'btc-ultimate-ai-trader',
    name: 'BTC Ultimate AI Trader',
    description: 'Momentum-based BTC trading strategy powered by AI signals. Combines on-chain metrics, sentiment analysis, and technical indicators.',
    stars: 142, forks: 23, status: 'active',
    annualizedReturn: '+338.23%',
    createdDate: 'Feb 15, 2026',
    tags: ['BTC', 'Momentum', 'AI'],
  },
  {
    id: 'eth-defi-yield-optimizer',
    name: 'ETH DeFi Yield Optimizer',
    description: 'Automated yield farming across top DeFi protocols. Dynamically allocates between lending, staking, and LP positions.',
    stars: 89, forks: 11, status: 'active',
    annualizedReturn: '+67.8%',
    createdDate: 'Jan 20, 2026',
    tags: ['ETH', 'DeFi', 'Yield'],
  },
  {
    id: 'btc-eth-ratio-reversion',
    name: 'BTC/ETH Ratio Reversion',
    description: 'Mean-reversion strategy on the BTC/ETH price ratio. Trades relative value shifts between the two largest crypto assets.',
    stars: 56, forks: 8, status: 'idle',
    annualizedReturn: '+42.1%',
    createdDate: 'Dec 8, 2025',
    tags: ['BTC', 'ETH', 'Mean Reversion'],
  },
  {
    id: 'sol-momentum-scalper',
    name: 'SOL Momentum Scalper',
    description: 'High-frequency momentum scalper for SOL. Uses on-chain DEX volume spikes as leading indicators for short-term moves.',
    stars: 203, forks: 31, status: 'active',
    annualizedReturn: '+156.9%',
    createdDate: 'Mar 1, 2026',
    tags: ['SOL', 'Momentum', 'Scalping'],
  },
  {
    id: 'multi-asset-risk-parity',
    name: 'Multi-Asset Risk Parity',
    description: 'Risk parity allocation across BTC, ETH, SOL, and stablecoins. Rebalances based on realized volatility regime detection.',
    stars: 67, forks: 5, status: 'active',
    annualizedReturn: '+28.4%',
    createdDate: 'Nov 15, 2025',
    tags: ['Multi-Asset', 'Risk Parity'],
  },
  {
    id: 'doge-sentiment-trader',
    name: 'DOGE Sentiment Trader',
    description: 'Sentiment-driven DOGE strategy. Monitors social media buzz, whale wallet activity, and meme velocity for trade signals.',
    stars: 333, forks: 18, status: 'idle',
    annualizedReturn: '+89.2%',
    createdDate: 'Oct 30, 2025',
    tags: ['DOGE', 'Sentiment', 'Social'],
  },
];

export const MOCK_COMMENTS: CommentActivity[] = [
  {
    id: 'ca-1',
    playbookName: 'SOL Momentum Scalper',
    playbookAuthor: 'Alice Chen',
    text: 'Strategy is now live! Built on **on-chain DEX volume signals** — the alpha comes from detecting volume spikes 2-3 blocks before price moves. Backtested across 6 months of Raydium + Orca data.',
    timestamp: 'Mar 10, 2026',
  },
  {
    id: 'ca-2',
    playbookName: 'ETH Gas Fee Predictor',
    playbookAuthor: 'Bob Martinez',
    text: 'Great approach on gas prediction, Bob. One suggestion: consider switching from Etherscan to **Flashbots MEV-Share** as your primary data source — it gives you pre-inclusion gas estimates that are ~30% more accurate for next-block predictions.',
    timestamp: 'Mar 8, 2026',
    replyTo: 'Bob Martinez',
  },
  {
    id: 'ca-3',
    playbookName: 'BTC Halving Cycle Model',
    playbookAuthor: 'Carol Wu',
    text: "Interesting cycle model. I've been experimenting with overlaying **momentum oscillators on halving-adjusted time series** — the key insight is that each cycle's momentum peak arrives ~15% earlier than the previous one. Would love to collaborate on combining our approaches.",
    timestamp: 'Mar 5, 2026',
  },
  {
    id: 'ca-4',
    playbookName: 'MAG7 Equal-Weight',
    playbookAuthor: 'Dave Kim',
    text: "On rebalance frequency: I tested weekly vs monthly for equal-weight portfolios and found that **monthly rebalancing** with a 5% drift threshold actually outperforms strict weekly rebalancing by ~2% annually, mostly due to lower transaction costs.",
    timestamp: 'Feb 28, 2026',
    replyTo: 'Dave Kim',
  },
  {
    id: 'ca-5',
    playbookName: 'Crypto Fear & Greed Index',
    playbookAuthor: 'Jenny Zhao',
    text: "The main issue with Fear & Greed as a standalone signal is **latency** — by the time it hits extreme values, the move is often 60-70% done. I'd suggest combining it with on-chain realized profit/loss ratios (SOPR, NUPL) for earlier entries.",
    timestamp: 'Feb 22, 2026',
    replyTo: 'Jenny Zhao',
  },
];

export const MOCK_SKILLS: SkillSummary[] = [
  {
    id: 'sk-1',
    name: 'Momentum Signal Scanner',
    description: 'Scans cross-asset momentum breakouts using volume-weighted moving averages and RSI divergence detection.',
    category: 'custom',
    author: 'Alice Chen',
    stars: 67,
    weeklyInstalls: '1.2k',
    lastUpdated: 'Mar 8, 2026',
    tags: ['Momentum', 'Scanner', 'Multi-Asset'],
  },
  {
    id: 'sk-2',
    name: 'On-Chain Whale Tracker',
    description: 'Monitors large wallet movements across BTC and ETH. Alerts when whale accumulation or distribution exceeds 2σ from 30-day average.',
    category: 'alva',
    author: 'Alice Chen',
    stars: 203,
    weeklyInstalls: '3.8k',
    lastUpdated: 'Mar 5, 2026',
    tags: ['On-Chain', 'Whale', 'Alert'],
  },
  {
    id: 'sk-3',
    name: 'Earnings Surprise Predictor',
    description: 'Predicts earnings surprises using alternative data — satellite imagery, credit card spend, and job postings.',
    category: 'custom',
    author: 'Alice Chen',
    stars: 45,
    weeklyInstalls: '890',
    lastUpdated: 'Feb 28, 2026',
    tags: ['Earnings', 'Alt Data', 'Prediction'],
  },
  {
    id: 'sk-4',
    name: 'Risk Regime Classifier',
    description: 'Classifies current market regime (risk-on, risk-off, transition) using VIX term structure, credit spreads, and cross-asset correlations.',
    category: 'alva',
    author: 'Alice Chen',
    stars: 112,
    weeklyInstalls: '2.1k',
    lastUpdated: 'Feb 20, 2026',
    tags: ['Risk', 'Regime', 'Macro'],
  },
];
