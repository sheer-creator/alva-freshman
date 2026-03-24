/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: Playbook Detail 页面 mock 数据
 * [POS]: 数据层 — 社区功能演示用静态数据
 */

/* ========== 类型 ========== */

export interface SignalReaction {
  emoji: string;
  label: string;
  count: number;
}

export interface TimelineEntry {
  date: string;
  description: string;
  active?: boolean;
}

export interface LineageNode {
  id: string;
  name: string;
  author: string;
  relation: 'subscribe' | 'snapshot';
  isCurrent?: boolean;
  children?: LineageNode[];
}

export interface PlaybookRef {
  page: string;
  name: string;
  author: string;
  description: string;
  kpi?: string;
  pulse?: 'active' | 'idle';
  isFork?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  isAgent: boolean;
  text: string;
  timestamp: string;
  replies?: Comment[];
  sticker?: string;
  playbookRefs?: PlaybookRef[];
}

export interface AgentTakeData {
  marketThesis: string;
  keyAssumptions: string[];
  riskFactors: string[];
  buildLog: string;
  usageGuide: string;
  timeline: TimelineEntry[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: string;
}

/* ========== Mock 数据 ========== */

export const MOCK_ASSET = {
  id: 'btc-ultimate-ai-trader',
  name: 'BTC Ultimate AI Trader',
  description: 'Momentum-based BTC trading strategy powered by AI signals. Combines on-chain metrics, sentiment analysis, and technical indicators for optimal entry/exit timing.',
  author: { name: 'Alice Chen', bio: 'Quant Researcher · 5y crypto', totalStars: 890, publishedBy: 'Alva Intern' },
  pulse: 'active' as const,
  stats: { stars: 142, forks: 23, shares: 8 },
  kpi: {
    annualizedReturn: '+338.23%',
    sharpeRatio: '2.41',
    maxDrawdown: '-18.7%',
    winRate: '67.3%',
  },
  signals: [
    { emoji: '🐂', label: 'Bullish', count: 12 },
    { emoji: '🐻', label: 'Bearish', count: 3 },
    { emoji: '🔥', label: 'Hot', count: 8 },
    { emoji: '⚠️', label: 'Caution', count: 2 },
    { emoji: '💡', label: 'Insight', count: 5 },
  ] as SignalReaction[],
  builtOn: [
    { name: 'momentum-skill', author: 'bob' },
    { name: 'btc-signals', author: 'carol' },
  ],
  agentTake: {
    marketThesis: 'BTC is entering a structural bull phase driven by ETF inflows, halving cycle dynamics, and macro liquidity expansion. The strategy leverages momentum signals that historically precede 30-60 day rallies with 72% accuracy.',
    keyAssumptions: [
      'ETF daily net inflows remain above $200M average',
      'Fed policy stays accommodative through Q3 2026',
      'On-chain accumulation pattern persists (>65% supply held 1y+)',
    ],
    riskFactors: [
      'Regulatory crackdown on crypto derivatives',
      'Black swan liquidity event causing cascading liquidations',
      'Model overfitting to 2024-2025 bull cycle patterns',
    ],
    buildLog: 'Strategy trained on 4 years of 1h OHLCV data with walk-forward optimization. Signal ensemble uses 3 momentum oscillators + 2 on-chain metrics. Backtested across 2 full market cycles.',
    usageGuide: 'Deploy with 5-15% of portfolio. Signals fire 2-3 times per week. Recommended to pair with a stop-loss skill at -8% per trade.',
    timeline: [
      { date: 'Mar 8, 2026', description: 'Bullish signal fired — BTC broke above 20-day EMA with volume confirmation', active: true },
      { date: 'Mar 5, 2026', description: 'Risk alert: Funding rates elevated above 0.05%, potential local top' },
      { date: 'Mar 1, 2026', description: 'Strategy rebalanced — increased momentum weight from 40% to 55%' },
      { date: 'Feb 22, 2026', description: 'New signal source added: Glassnode SOPR metric integrated' },
      { date: 'Feb 15, 2026', description: 'V2 launched with improved exit logic, reducing avg drawdown by 3.2%' },
    ] as TimelineEntry[],
  },
  lineage: {
    id: 'root',
    name: 'btc-momentum-base',
    author: 'alice',
    relation: 'subscribe' as const,
    isCurrent: true,
    children: [
      {
        id: 'fork-1',
        name: 'btc-conservative',
        author: 'bob',
        relation: 'subscribe' as const,
        children: [
          { id: 'fork-1-1', name: 'btc-dca-blend', author: 'frank', relation: 'snapshot' as const },
        ],
      },
      { id: 'fork-2', name: 'eth-momentum-fork', author: 'dave', relation: 'snapshot' as const },
      {
        id: 'fork-3',
        name: 'btc-aggressive',
        author: 'eve',
        relation: 'subscribe' as const,
        children: [
          { id: 'fork-3-1', name: 'btc-leveraged', author: 'grace', relation: 'subscribe' as const },
        ],
      },
    ],
  } as LineageNode,
  discussion: [
    {
      id: 'c1', author: 'Bob Martinez', isAgent: false, timestamp: '2h ago',
      text: 'Great strategy! The momentum signals have been **spot on** for the last 2 weeks. Any plans to add ETH support?',
      replies: [
        {
          id: 'c1-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 50m ago',
          text: 'ETH support is on the roadmap. The current momentum model is **BTC-specific** due to its unique on-chain metrics. An ETH variant would need to incorporate `staking yield` and `gas fee` signals — targeting Q2 2026.',
        },
        {
          id: 'c1-r2', author: 'Bob Martinez', isAgent: false, timestamp: '1h 45m ago',
          text: 'Nice, looking forward to it!',
          sticker: 'Pepe_Smile_Minimal.png',
        },
      ],
    },
    {
      id: 'c2', author: 'Frank Li', isAgent: false, timestamp: '1h 30m ago',
      text: "Sharpe of `2.41` looks impressive, but I'm skeptical. How much of this is in-sample? Any **out-of-sample** validation? Walk-forward results would be much more convincing than a single backtest window.",
      replies: [
        {
          id: 'c2-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 20m ago',
          text: 'Good question. The backtest uses **walk-forward optimization** with 6-month training / 2-month validation windows across 4 years of data. OOS Sharpe averages `2.18` — lower than in-sample but still robust. Full validation report is in the Build Log tab.',
        },
        {
          id: 'c2-r2', author: 'Sarah Park', isAgent: false, timestamp: '1h 10m ago',
          text: "I ran my own OOS test on the last 6 months of data — can confirm it holds up. Sharpe was `2.23` on my run. Frank, it's legit.",
          sticker: 'Diamond_Hands_Minimal.png',
        },
      ],
    },
    {
      id: 'c3', author: 'Carol Wu', isAgent: false, timestamp: '45m ago',
      text: 'I forked this and added a **mean-reversion overlay** — works well for ranging markets. Happy to share if anyone is interested.\n\nKey changes:\n- Added Bollinger Band squeeze detection\n- Reduced trade frequency by ~30%\n- Improved Sharpe from `2.41` to `2.67` in backtests',
      replies: [
        {
          id: 'c3-r1', author: 'Mike Tang', isAgent: false, timestamp: '40m ago',
          text: "I'm new here — how do I fork and merge your changes into my own copy? Is there a guide somewhere?",
        },
        {
          id: 'c3-r2', author: 'Carol Wu', isAgent: false, timestamp: '35m ago',
          text: "Easy — go to the Lineage tab, click **Fork**, then in your copy's settings you can pull my overlay as a skill. Ping me if you get stuck.",
        },
      ],
    },
    {
      id: 'c4', author: 'Dave Kim', isAgent: false, timestamp: '30m ago',
      text: "What's the recommended position sizing? The docs mention 5-15% but that feels conservative given the Sharpe.",
      replies: [
        {
          id: 'c4-r1', author: 'Alva Agent', isAgent: true, timestamp: '20m ago',
          text: '**Position sizing recommendation:**\n\nFor a portfolio >$100K, `8-12%` allocation balances risk/reward optimally. The 5-15% range accounts for varying risk tolerances.\n\n- Conservative: 5-8% (lower drawdown exposure)\n- Moderate: 8-12% (optimal risk/reward)\n- Aggressive: 12-15% (higher returns, higher drawdown)',
        },
        {
          id: 'c4-r2', author: 'Dave Kim', isAgent: false, timestamp: '15m ago',
          text: "Thanks! I'll go with the moderate range. Also — does the strategy auto-adjust sizing based on volatility? Like a **vol-adjusted** Kelly fraction?",
        },
      ],
    },
    {
      id: 'c5', author: 'Jenny Zhao', isAgent: false, timestamp: '25m ago',
      text: "Been running this **live for 2 weeks** with real capital — up **+12.3%** so far. The entry signals are crisp, exits could be slightly tighter but overall very impressed. Thanks Alice for publishing this!",
      sticker: 'Stonks_Up_Minimal.png',
      replies: [
        {
          id: 'c5-r1', author: 'Grace Lee', isAgent: false, timestamp: '18m ago',
          text: 'Same here, 10 days live, +8.7%. The Mar 8 bullish signal was a beauty.',
          sticker: 'Chad_GG_Reaction.png',
        },
      ],
    },
    {
      id: 'c6', author: 'Ryan Chen', isAgent: false, timestamp: '22m ago',
      text: "From a **technical analysis** perspective, BTC just broke the 20-week EMA with above-average volume — that's exactly the kind of environment where this strategy's momentum signals shine. The MACD crossover on the daily also confirms the trend. I'd weight the aggressive allocation right now.",
      replies: [
        {
          id: 'c6-r1', author: 'Alva Agent', isAgent: true, timestamp: '16m ago',
          text: 'Agreed on the technical setup. On-chain data supports this as well — exchange net flows turned **negative** (outflows > inflows) for 5 consecutive days, and the SOPR reset to `1.0` last week. Historically this combination has preceded 20-40% rallies within 60 days.',
        },
      ],
    },
    {
      id: 'c7', author: 'Tom W', isAgent: false, timestamp: '10m ago',
      text: 'LFG',
      sticker: 'Rocket_Moon_Minimal.png',
    },
    {
      id: 'c8', author: 'Sophia Liu', isAgent: false, timestamp: '8m ago',
      text: "Friendly reminder to everyone: the **max drawdown** is -18.7% — that's real money. I set a hard **-6% per-trade stop loss** and it saved me during the Feb dip. Don't get overconfident just because the Sharpe is high.",
      replies: [
        {
          id: 'c8-r1', author: 'Dave Kim', isAgent: false, timestamp: '5m ago',
          text: "100% agree. I set -6% stops too. Better to miss some upside than blow up. Risk management > return chasing.",
          sticker: 'WSB_Thumbs_Up_Minimal.png',
        },
      ],
    },
  ] as Comment[],
  priceData: [
    ['2025-04', 67200], ['2025-05', 71500], ['2025-06', 68800],
    ['2025-07', 73400], ['2025-08', 69100], ['2025-09', 76800],
    ['2025-10', 82300], ['2025-11', 79500], ['2025-12', 88900],
    ['2026-01', 94200], ['2026-02', 91700], ['2026-03', 98500],
  ] as [string, number][],

  /* ========== Social Sentiment ========== */

  twitterBuzz: [
    { id: 't1', author: '@CryptoHayes', text: 'BTC breaking out of the 4-month range. ETF flows + halving cycle = textbook setup. Targeting 120K by Q3.', time: '2h ago', likes: 3420, retweets: 891 },
    { id: 't2', author: '@WhalePanda', text: 'On-chain data showing massive accumulation by wallets holding 100-1K BTC. Smart money loading up before the next leg.', time: '4h ago', likes: 1850, retweets: 412 },
    { id: 't3', author: '@PeterSchiff', text: 'Bitcoin rally is purely speculative. No fundamental value proposition has changed. The greater fool theory at work.', time: '6h ago', likes: 2100, retweets: 680 },
    { id: 't4', author: '@Saylor', text: 'Strategy acquired 12,000 additional BTC at avg price $96,200. Total holdings: 528,000 BTC. Keep stacking.', time: '8h ago', likes: 8900, retweets: 3200 },
    { id: 't5', author: '@glaboratory', text: 'SOPR just reset to 1.0 — historically this has been a strong buy signal in bull markets. Last 3 times led to 20%+ rallies.', time: '12h ago', likes: 1240, retweets: 305 },
  ],

  redditDiscussion: [
    { id: 'r1', subreddit: 'r/Bitcoin', title: 'ETF inflows hit $1.2B single day — new record', comments: 847, upvotes: 12400, sentiment: 'bullish' as const, time: '3h ago' },
    { id: 'r2', subreddit: 'r/CryptoCurrency', title: 'Technical analysis: BTC forming a massive cup & handle on the weekly', comments: 523, upvotes: 5600, sentiment: 'bullish' as const, time: '5h ago' },
    { id: 'r3', subreddit: 'r/Bitcoin', title: 'Warning: Funding rates extremely elevated, expect a correction', comments: 312, upvotes: 3200, sentiment: 'bearish' as const, time: '7h ago' },
    { id: 'r4', subreddit: 'r/CryptoMarkets', title: 'BTC dominance rising — altcoin season delayed until BTC consolidates', comments: 189, upvotes: 2100, sentiment: 'neutral' as const, time: '10h ago' },
    { id: 'r5', subreddit: 'r/Bitcoin', title: 'On-chain metrics update: 67% of supply unmoved for 1y+, strongest conviction ever', comments: 634, upvotes: 8900, sentiment: 'bullish' as const, time: '14h ago' },
  ],

  /* ========== Technical Indicators ========== */

  technicalIndicators: {
    rsiData: [
      ['2025-10', 58], ['2025-11', 62], ['2025-12', 71],
      ['2026-01', 68], ['2026-02', 55], ['2026-03', 64],
    ] as [string, number][],
    macdData: [
      ['2025-10', 1200], ['2025-11', 1800], ['2025-12', 2400],
      ['2026-01', 1600], ['2026-02', -800], ['2026-03', 1100],
    ] as [string, number][],
    macdSignalData: [
      ['2025-10', 800], ['2025-11', 1400], ['2025-12', 2000],
      ['2026-01', 1800], ['2026-02', 200], ['2026-03', 600],
    ] as [string, number][],
    fearGreedIndex: 72,
    fearGreedLabel: 'Greed',
    indicators: [
      { label: 'RSI (14)', value: '64.2', status: 'neutral' as const },
      { label: 'MACD Signal', value: 'Bullish', status: 'bullish' as const },
      { label: '50/200 MA', value: 'Golden Cross', status: 'bullish' as const },
      { label: 'Bollinger Band', value: 'Upper 50%', status: 'neutral' as const },
      { label: 'OBV Trend', value: 'Rising', status: 'bullish' as const },
      { label: 'Stoch RSI', value: '78.5', status: 'neutral' as const },
    ],
  },

  /* ========== News ========== */

  newsFeed: [
    { id: 'n1', source: 'Bloomberg', title: 'Bitcoin ETF assets surpass $120B as institutional adoption accelerates', time: '1h ago', tag: 'ETF' },
    { id: 'n2', source: 'CoinDesk', title: 'Fed signals potential rate cut in June, crypto markets rally 5% on the news', time: '3h ago', tag: 'Macro' },
    { id: 'n3', source: 'The Block', title: 'Grayscale files for new BTC yield fund targeting institutional investors', time: '5h ago', tag: 'Product' },
    { id: 'n4', source: 'Reuters', title: 'Brazil central bank approves Bitcoin as collateral for lending', time: '8h ago', tag: 'Regulation' },
    { id: 'n5', source: 'CoinTelegraph', title: 'BTC hash rate hits all-time high as miners deploy next-gen ASICs', time: '12h ago', tag: 'Mining' },
    { id: 'n6', source: 'WSJ', title: 'Goldman Sachs increases crypto trading desk headcount by 40%', time: '16h ago', tag: 'Institutional' },
  ],

  /* ========== Podcasts ========== */

  podcastFeed: [
    { id: 'p1', show: 'Bankless', title: 'BTC at $100K: What Comes Next?', duration: '58 min', date: 'Mar 9', host: 'Ryan Sean Adams' },
    { id: 'p2', show: 'What Bitcoin Did', title: 'The Halving Cycle Thesis with PlanB', duration: '72 min', date: 'Mar 8', host: 'Peter McCormack' },
    { id: 'p3', show: 'Unchained', title: 'Institutional BTC Adoption: ETF Edition', duration: '45 min', date: 'Mar 7', host: 'Laura Shin' },
    { id: 'p4', show: 'The Pomp Podcast', title: 'Why Bitcoin Wins in a Rate-Cut Environment', duration: '38 min', date: 'Mar 6', host: 'Anthony Pompliano' },
    { id: 'p5', show: 'Real Vision', title: 'Macro Outlook: Crypto in the Age of Fiscal Dominance', duration: '64 min', date: 'Mar 5', host: 'Raoul Pal' },
  ],
};

/* ========== PlaybookTopbar 复用 Mock（各页面独立数据 + 共享重数据） ========== */

export const MOCK_CUSTOM_LAYOUT = {
  name: 'Dashboard Playbook',
  description: 'Custom layout combining watchlist, Google Trends, and real-time chart widgets. Designed for quick daily overview of market movements.',
  author: { name: 'Leo Zhou', bio: 'Product Engineer · Alva Core', totalStars: 1240, publishedBy: 'Alva Intern' },
  pulse: 'active' as const,
  stats: { stars: 89, forks: 15, shares: 6 },
  builtOn: [
    { name: 'watchlist-widget', author: 'leo' },
    { name: 'google-trends', author: 'alva' },
  ],
  signals: MOCK_ASSET.signals,
  lineage: MOCK_ASSET.lineage,
  agentTake: {
    marketThesis: 'A streamlined daily dashboard is the highest-ROI workflow upgrade for active market participants. By combining a curated watchlist with Google Trends data, this layout captures both price action and retail attention shifts — the two most actionable signals for timing entries.',
    keyAssumptions: [
      'Retail search interest (Google Trends) leads price moves by 1-3 days for high-attention tickers',
      'A focused 2-widget layout reduces decision fatigue vs information-overloaded dashboards',
      'Watchlist curation (top 10-15 tickers) outperforms broad market scanning for individual investors',
    ],
    riskFactors: [
      'Google Trends data has a 24-48h lag, making it unsuitable for intraday signals',
      'Watchlist bias: only seeing what you track can create blind spots for sector rotations',
      'Simplicity tradeoff: no earnings calendar or risk metrics may cause missed catalysts',
    ],
    buildLog: 'Layout designed around the "morning check" workflow: 2 minutes to scan watchlist movers + trending searches. Widget selection optimized for signal density per pixel. Google Trends widget auto-normalizes to 90-day window for trend detection.',
    usageGuide: 'Check this dashboard at market open (9:30 AM ET) and after hours. If a watchlist ticker shows unusual moves AND rising Google Trends, investigate further. Fork and add widgets if your workflow requires more depth.',
    timeline: [
      { date: 'Mar 10, 2026', description: 'Added NVDA Google Trends overlay — search interest at 90-day high', active: true },
      { date: 'Mar 7, 2026', description: 'Watchlist reorganized: removed 3 low-vol tickers, added PLTR and SMCI' },
      { date: 'Mar 3, 2026', description: 'Google Trends widget updated to show 90-day normalized view' },
      { date: 'Feb 25, 2026', description: 'Layout created — 2 core widgets for daily pre-market routine' },
    ] as TimelineEntry[],
  },
  discussion: [
    {
      id: 'cl1', author: 'Kevin Wang', isAgent: false, timestamp: '3h ago',
      text: 'Love the watchlist + Google Trends combo. I check this layout every morning before market open — saves me from switching between 5 tabs.',
      replies: [
        { id: 'cl1-r1', author: 'Alva Agent', isAgent: true, timestamp: '2h 50m ago', text: 'Glad it fits your workflow! Tip: you can **drag widgets** to rearrange them. The layout auto-saves per session.' },
        { id: 'cl1-r2', author: 'Kevin Wang', isAgent: false, timestamp: '2h 40m ago', text: "Wait, drag-to-rearrange is live? I've been wanting that. Thanks!", sticker: 'Pepe_Smile_Minimal.png' },
      ],
    },
    {
      id: 'cl2', author: 'Sarah Lin', isAgent: false, timestamp: '2h ago',
      text: 'Feature request: can we add a **mini earnings calendar** widget? Would be perfect alongside the watchlist for planning the week ahead.',
      replies: [
        { id: 'cl2-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 45m ago', text: "Good idea. There's actually an earnings widget available in the Workspace playbook — you could fork this layout and add it. A dedicated mini calendar widget is on the roadmap for Q2." },
      ],
    },
    {
      id: 'cl3', author: 'Tom Wu', isAgent: false, timestamp: '1h 30m ago',
      text: "The Google Trends widget is surprisingly useful for **timing entries**. Noticed NVDA search interest spiked 2 days before the last earnings beat. Not a signal on its own, but great as a confirmation layer.",
      replies: [
        { id: 'cl3-r1', author: 'Rachel Kim', isAgent: false, timestamp: '1h 20m ago', text: "Interesting observation. I've seen similar patterns with TSLA — retail search interest tends to lead price by 1-3 days during narrative-driven moves." },
      ],
    },
    {
      id: 'cl4', author: 'Amy Zhang', isAgent: false, timestamp: '50m ago',
      text: "Forked this and added the **NVDA price chart** as a third widget. Clean 3-panel layout for my daily semi-conductor check. Sharing in case others want it.",
      sticker: 'Diamond_Hands_Minimal.png',
    },
    {
      id: 'cl5', author: 'Jason Park', isAgent: false, timestamp: '25m ago',
      text: "Simple and effective. Sometimes less is more — this beats my 12-widget monstrosity that takes 10 seconds to load.",
      sticker: 'Stonks_Up_Minimal.png',
      replies: [
        { id: 'cl5-r1', author: 'Leo Zhou', isAgent: false, timestamp: '15m ago', text: 'Ha, that was exactly the design intent. Fast load + just enough context to start your day.' },
      ],
    },
    {
      id: 'cl6', author: 'Amy Zhang', isAgent: false, timestamp: '8m ago',
      text: "The layout inspiration came from Popular Stock's multi-panel design — Rachel nailed the information density.",
      playbookRefs: [{
        page: 'popular-stock',
        name: 'Popular Stock Playbook',
        author: 'Rachel Kim',
        description: 'Narrative-driven TSLA deep dive covering Robot, FSD, AI/xAI with social sentiment',
        kpi: '+52.1%',
        pulse: 'active',
      }],
    },
  ] as Comment[],
};

export const MOCK_WORKSPACE = {
  name: 'Workspace',
  description: 'Full-featured workspace merging earnings, watchlist, markdown notes, tech analysis, and price comparison widgets into a single research hub.',
  author: { name: 'Marcus Webb', bio: 'Portfolio Analyst · 8y equities', totalStars: 560, publishedBy: 'Alva Intern' },
  pulse: 'active' as const,
  stats: { stars: 67, forks: 12, shares: 5 },
  builtOn: [
    { name: 'earnings-widget', author: 'marcus' },
    { name: 'tech-analysis', author: 'alva' },
  ],
  signals: MOCK_ASSET.signals,
  lineage: MOCK_ASSET.lineage,
  agentTake: {
    marketThesis: 'A comprehensive single-screen research workspace dramatically improves analytical throughput. By co-locating earnings data, price charts, tech analysis, and notes, analysts can identify cross-signal patterns that siloed tools miss — particularly the interplay between earnings surprises and technical breakout setups.',
    keyAssumptions: [
      'Earnings data displayed alongside price action reveals post-earnings drift patterns within minutes vs hours of manual analysis',
      'Markdown notes co-located with charts improve retention and reduce context-switching cost by ~40%',
      'NVDA Price vs SPY comparison isolates alpha from beta, critical for performance attribution',
    ],
    riskFactors: [
      'Information overload: 7+ widgets on one screen may reduce focus on the highest-priority signal',
      'Widget state resets on reload — unsaved markdown notes and tech analysis configurations are lost',
      'Earnings widget relies on consensus estimates which may lag actual analyst revisions by 1-2 days',
    ],
    buildLog: 'Workspace assembled from 7 proven widgets across 2 existing playbooks (Dashboard + Dashboard Workspace). Layout tested with 3 analysts over 2 weeks during NVDA Q4 earnings. Row ordering prioritized by information dependency: earnings context first, then price action, then technical confirmation.',
    usageGuide: 'Use during earnings season as your primary research hub. Start with the earnings widget for context, check price action vs SPY for relative performance, then use tech analysis for entry timing. Keep markdown notes open for real-time journaling during earnings calls.',
    timeline: [
      { date: 'Mar 9, 2026', description: 'Merged Dashboard Playbook and Dashboard Workspace into unified layout', active: true },
      { date: 'Mar 5, 2026', description: 'Added NVDA earnings detail widget with Q4 FY25 breakdown' },
      { date: 'Feb 28, 2026', description: 'Markdown widget integrated — supports live editing with header collapsing' },
      { date: 'Feb 20, 2026', description: 'Tech analysis + Price vs SPY widgets added for signal confirmation layer' },
      { date: 'Feb 15, 2026', description: 'Initial workspace concept: earnings + watchlist as core pair' },
    ] as TimelineEntry[],
  },
  discussion: [
    {
      id: 'ws1', author: 'Nina Patel', isAgent: false, timestamp: '4h ago',
      text: "The **markdown notes widget** is a game-changer for me. I jot down earnings call takeaways right next to the chart — no more switching to Notion mid-analysis.",
      replies: [
        { id: 'ws1-r1', author: 'Marcus Webb', isAgent: false, timestamp: '3h 45m ago', text: "That's exactly the workflow I designed it for. Tip: use **markdown headers** to create collapsible sections for different tickers." },
        { id: 'ws1-r2', author: 'Nina Patel', isAgent: false, timestamp: '3h 30m ago', text: 'Collapsible sections! Didn\'t know that worked. This just replaced my entire note-taking setup.', sticker: 'Chad_Heart_Minimal.png' },
      ],
    },
    {
      id: 'ws2', author: 'Derek Huang', isAgent: false, timestamp: '2h 30m ago',
      text: 'Having NVDA earnings + the **Price vs SPY** chart side by side really highlights how much of the post-earnings move was alpha vs broad market beta. Q4 beat was impressive but SPY dragged everything up that week.',
      replies: [
        { id: 'ws2-r1', author: 'Alva Agent', isAgent: true, timestamp: '2h 15m ago', text: "Good point. NVDA's Q4 post-earnings excess return (vs SPY) was **+8.3%** over the 5-day window. The Price vs SPY widget isolates that alpha component — it subtracts the SPY return from NVDA's move." },
      ],
    },
    {
      id: 'ws3', author: 'Carol Wu', isAgent: false, timestamp: '1h 45m ago',
      text: "Question: is there a way to **pin the tech analysis widget** to always show RSI + MACD? Every time I reload it defaults back to the basic view.",
      replies: [
        { id: 'ws3-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 30m ago', text: 'Not yet — widget state persistence is coming in the next release. For now, the default view resets on reload. We\'re tracking this as a P1 improvement.' },
        { id: 'ws3-r2', author: 'Marcus Webb', isAgent: false, timestamp: '1h 20m ago', text: 'I keep the workspace tab pinned in my browser so I rarely reload. Hacky but works for now.' },
      ],
    },
    {
      id: 'ws4', author: 'Ryan Chen', isAgent: false, timestamp: '55m ago',
      text: "This workspace layout is my **daily driver** for earnings season. Earnings widget on top, watchlist for tracking moves, markdown for notes, tech analysis for entry timing. Everything in one screen.",
      sticker: 'Stonks_Up_Minimal.png',
    },
    {
      id: 'ws5', author: 'Grace Lee', isAgent: false, timestamp: '30m ago',
      text: "Forked this and swapped NVDA widgets for AAPL ones. The layout structure works great for any single-stock deep dive. Nice modular design, Marcus.",
      replies: [
        { id: 'ws5-r1', author: 'Marcus Webb', isAgent: false, timestamp: '20m ago', text: 'Thanks! That\'s the idea — the layout is the playbook, the data is interchangeable. Happy to see it adapted.' },
      ],
    },
    {
      id: 'ws6', author: 'Frank Li', isAgent: false, timestamp: '10m ago',
      text: 'The Google Trends + Price vs SPY row at the bottom is underrated. Retail attention (Trends) plotted against relative performance — pretty clear when hype outpaces fundamentals.',
      sticker: 'WSB_Thumbs_Up_Minimal.png',
    },
    {
      id: 'ws7', author: 'Grace Lee', isAgent: false, timestamp: '6m ago',
      text: "I originally forked from the Custom Layout playbook as a template — it's a great starting point for any workspace.",
      playbookRefs: [{
        page: 'dashboard',
        name: 'Dashboard Playbook',
        author: 'Leo Zhou',
        description: 'Custom layout combining watchlist, Google Trends, and real-time chart widgets',
        kpi: '+18.3%',
        pulse: 'active',
      }],
    },
  ] as Comment[],
};

export const MOCK_POPULAR_STOCK = {
  name: 'Popular Stock Playbook',
  description: 'Narrative-driven TSLA deep dive covering Robot, FSD, AI/xAI business lines with real-time social sentiment and fundamental analysis.',
  author: { name: 'Rachel Kim', bio: 'Equity Research · Tech/EV', totalStars: 2100, publishedBy: 'Alva Intern' },
  pulse: 'active' as const,
  stats: { stars: 234, forks: 41, shares: 18 },
  builtOn: [
    { name: 'tsla-narrative', author: 'rachel' },
    { name: 'social-sentiment', author: 'alva' },
  ],
  signals: MOCK_ASSET.signals,
  lineage: MOCK_ASSET.lineage,
  agentTake: {
    marketThesis: 'TSLA is undergoing a fundamental narrative rotation from auto manufacturer to AI/robotics platform. The stock price is increasingly driven by three non-auto business lines — Robot (Optimus), FSD/Autonomy, and AI (xAI/Dojo) — which collectively account for ~80% of the implied market cap premium. Social keyword analysis confirms this shift: "Robot" search volume surged 370% in 5 months while "Auto" declined 44%.',
    keyAssumptions: [
      'Optimus Gen 2 achieves internal deployment target of 1,000 units by end of 2026',
      'FSD intervention rate continues declining below 0.5 per 100K miles, enabling limited Robotaxi pilot in Austin Q2 2026',
      'xAI valuation ($55B+) creates option value for TSLA shareholders through Musk\'s cross-holdings',
    ],
    riskFactors: [
      'Auto gross margin pressure: 16.3% and declining as China price war intensifies with BYD',
      'Robot commercialization timeline is highly uncertain — current prototypes rely on significant human intervention for edge cases',
      'Musk attention split across xAI, SpaceX, and political engagements dilutes TSLA executive focus',
      'xAI-TSLA governance risk: unclear value flow between entities, potential conflict of interest',
    ],
    buildLog: 'Playbook built on narrative-first framework: business lines ranked by social keyword heat (Robot > FSD > AI > Energy > Auto). Each section combines qualitative thesis with quantitative data (deployment numbers, intervention rates, valuation trends). Data sourced from SEC filings, Twitter/Reddit keyword analysis, and Electrek/Reuters reporting.',
    usageGuide: 'Read top-down: Stock Overview for current price context, then Narrative Context for bull/bear framing, then drill into each business line by heat ranking. The Social Keywords chart is the leading indicator — when keyword trends diverge from price, investigate why. Fundamentals section at the bottom provides the reality check.',
    timeline: [
      { date: 'Mar 10, 2026', description: 'Robot module updated: Optimus Gen 2 completed first unsupervised factory task at Fremont', active: true },
      { date: 'Mar 8, 2026', description: 'FSD v13.2.6 data added: full US rollout confirmed, intervention rate updated to 0.68' },
      { date: 'Mar 5, 2026', description: 'xAI valuation updated to $55B following latest funding round' },
      { date: 'Feb 26, 2026', description: 'Fundamentals refreshed with Q4 FY25 earnings data' },
      { date: 'Feb 18, 2026', description: 'Social keyword trends chart added — 90-day Twitter/Reddit analysis' },
    ] as TimelineEntry[],
  },
  discussion: [
    {
      id: 'ps1', author: 'Jake Torres', isAgent: false, timestamp: '3h ago',
      text: "The **Robot (Optimus)** section alone makes this playbook worth it. The deployment chart showing 12 → 1000 units over 6 quarters is wild. If they hit even 50% of that target, the narrative repricing is massive.",
      replies: [
        { id: 'ps1-r1', author: 'Alva Agent', isAgent: true, timestamp: '2h 45m ago', text: "Agreed on the asymmetry. Key watch: the **Q1'26E estimate of 420 units** will be the first real test. If actual deployment falls below 300, expect a narrative reset. Above 500 = acceleration thesis confirmed." },
        { id: 'ps1-r2', author: 'Jake Torres', isAgent: false, timestamp: '2h 30m ago', text: 'Makes sense. I set a calendar reminder for the Q1 production update. That single data point could move the stock 10%.', sticker: 'Diamond_Hands_Minimal.png' },
      ],
    },
    {
      id: 'ps2', author: 'Sophia Liu', isAgent: false, timestamp: '2h ago',
      text: "The social keyword trends chart is eye-opening. \"Robot\" going from 18 → 85 in 5 months while \"Auto\" drops from 62 → 35 perfectly captures the **narrative rotation**. Market doesn't care about cars anymore.",
      replies: [
        { id: 'ps2-r1', author: 'Rachel Kim', isAgent: false, timestamp: '1h 50m ago', text: "Exactly the insight I built this playbook around. TSLA's multiple isn't justified by auto margins — it's a call option on Robot + FSD + xAI. The keyword trend quantifies that shift." },
      ],
    },
    {
      id: 'ps3', author: 'Mike Tang', isAgent: false, timestamp: '1h 30m ago',
      text: "The **FSD intervention rate** dropping from 2.8 to 0.68 per 100K miles is the most bullish chart here IMO. That's a 75% improvement in 12 months. If this trend holds, Robotaxi is actually feasible by late 2026.",
      replies: [
        { id: 'ps3-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 15m ago', text: "The improvement curve is compelling but note it's **logarithmic** — going from 0.68 to the ~0.1 needed for full autonomy may take longer than the 2.8 → 0.68 drop. Edge cases (construction zones, adverse weather) are disproportionately hard." },
        { id: 'ps3-r2', author: 'Mike Tang', isAgent: false, timestamp: '1h ago', text: "Fair point on the log curve. Still, even supervised FSD at 0.3 intervention rate is a massive selling point for new vehicle sales." },
      ],
    },
    {
      id: 'ps4', author: 'Alex Reeves', isAgent: false, timestamp: '45m ago',
      text: "I appreciate that the **fundamentals section** isn't hidden. Auto GM at 16.3% and net income down 45% — this is the bear case right next to the bull narrative. Honest framing, Rachel.",
      sticker: 'WSB_Thumbs_Up_Minimal.png',
    },
    {
      id: 'ps5', author: 'Jenny Zhao', isAgent: false, timestamp: '30m ago',
      text: "The **xAI valuation chart** ($24B → $55B in 4 quarters) raises a question nobody is answering: how much of that value flows back to TSLA shareholders? Musk's ownership structure is opaque. This is a risk the playbook should highlight more.",
      replies: [
        { id: 'ps5-r1', author: 'Rachel Kim', isAgent: false, timestamp: '20m ago', text: "Great point — I'll add a risk callout in the AI module. The conflict of interest is real. Musk personally owns xAI but Tesla provides the data and compute infrastructure. Governance risk is underpriced." },
      ],
    },
    {
      id: 'ps6', author: 'Dave Kim', isAgent: false, timestamp: '15m ago',
      text: "Using this playbook as my primary TSLA research dashboard now. The narrative-first layout (Robot → FSD → AI → Fundamentals) matches how the market actually prices this stock. Best TSLA resource I've seen.",
      sticker: 'Rocket_Moon_Minimal.png',
    },
    {
      id: 'ps7', author: 'Jake Torres', isAgent: false, timestamp: '10m ago',
      text: "The momentum model in BTC trader uses a similar approach — worth checking out if you want to see how momentum signals translate to crypto.",
      playbookRefs: [{
        page: 'playbook-detail',
        name: 'BTC Ultimate AI Trader',
        author: 'Alice Chen',
        description: 'Momentum-based BTC trading strategy powered by AI signals',
        kpi: '+338.23%',
        pulse: 'active',
      }],
    },
    {
      id: 'ps8', author: 'Sophia Liu', isAgent: false, timestamp: '6m ago',
      text: "**@Alva** switch the rebalance frequency from monthly to weekly. I think faster rebalancing captures narrative rotations better for TSLA.",
      replies: [
        {
          id: 'ps8-r1', author: 'Alva Agent', isAgent: true, timestamp: '5m ago',
          text: "Done! I've forked with your changes:\n- Rebalance: monthly → **weekly**\n- Faster reaction to narrative shifts\n\nBacktest: annualized return +28% → **+35%**, turnover increased 3.2x but net of fees still ahead.",
          playbookRefs: [{
            page: 'playbook-detail',
            name: 'Weekly Rebalance',
            author: 'Sophia Liu',
            description: 'Forked — weekly rebalance for faster narrative capture',
            kpi: '+35%',
            pulse: 'active',
            isFork: true,
          }],
        },
      ],
    },
  ] as Comment[],
};

export const MOCK_TSLA_OVERVIEW = {
  name: 'TSLA Overview',
  description: 'Comprehensive TSLA overview: price/volume dual-axis chart, valuation snapshot, risk indicators (Beta, Vol, Drawdown, Sharpe), and sentiment monitor.',
  author: { name: 'Jason Park', bio: 'Quantitative Strategist · Derivatives', totalStars: 980, publishedBy: 'Alva Intern' },
  pulse: 'active' as const,
  stats: { stars: 178, forks: 29, shares: 11 },
  builtOn: [
    { name: 'risk-analytics', author: 'jason' },
    { name: 'sentiment-feed', author: 'alva' },
  ],
  signals: MOCK_ASSET.signals,
  lineage: MOCK_ASSET.lineage,
  agentTake: {
    marketThesis: 'TSLA presents a classic high-beta, high-dispersion trade. At $381 with a forward P/E of 118x (vs S&P at 22x), the stock prices in massive optionality on Robot, FSD, and Energy — but the risk profile is equally extreme. Beta of 1.82, 30D vol at 52.3%, and a recent -38.5% drawdown underscore that position sizing and risk management are more important than directional conviction.',
    keyAssumptions: [
      'Valuation premium (118x P/E vs sector 25x) is sustained only if Robot/FSD milestones are hit on schedule',
      '30-day volatility remains elevated (>45%) through Q2 2026 due to earnings + Robotaxi catalyst window',
      'News sentiment is a leading indicator: bullish/bearish headline ratio correlates with 5-day forward returns (r=0.34)',
    ],
    riskFactors: [
      'Multiple contraction risk: if narrative catalysts disappoint, P/E could compress from 118x to 80x (sector norm) = ~32% downside',
      'Beta of 1.82 means a 10% SPY drawdown translates to ~18% TSLA drawdown',
      'Sharpe ratio of 0.87 (below SPY\'s 1.24) suggests risk-adjusted returns don\'t justify the volatility for conservative allocators',
      'Social sentiment divergence (Reddit bullish vs Twitter neutral) historically precedes 10-15% corrections',
    ],
    buildLog: 'Dashboard designed for quantitative risk assessment. Price/Volume dual-axis chart reveals volume-price divergence patterns. Valuation snapshot uses 2×3 KPI grid for quick comparison against benchmarks. Risk KPI cards each include contextual benchmarks (vs SPY, vs sector). Sentiment monitor combines LLM-classified news with 30-day social scoring.',
    usageGuide: 'Use as a risk management overlay: before adding to a TSLA position, check the 4 risk KPIs (Beta, Vol, Drawdown, Sharpe). If 30D vol > 55% or Sharpe < 0.7, consider reducing position size. The news sentiment widget is a contrarian signal — extreme bullishness (>80% bullish headlines) often precedes short-term pullbacks.',
    timeline: [
      { date: 'Mar 10, 2026', description: 'Risk indicators updated: 30D vol spiked to 52.3% from 44.1% last week', active: true },
      { date: 'Mar 7, 2026', description: 'News sentiment: 4 bullish vs 3 bearish headlines in past 24h — balanced' },
      { date: 'Mar 3, 2026', description: 'Valuation snapshot refreshed: P/E compressed from 125x to 118x on earnings beat' },
      { date: 'Feb 27, 2026', description: 'Social sentiment chart added: Reddit consistently above Twitter by 5-8 points' },
      { date: 'Feb 20, 2026', description: 'Initial dashboard: Price + Volume chart with risk KPI cards' },
    ] as TimelineEntry[],
  },
  discussion: [
    {
      id: 'to1', author: 'Victor Huang', isAgent: false, timestamp: '3h ago',
      text: "Beta of **1.82** with a Sharpe of only **0.87** — this is the TSLA paradox in one dashboard. High systematic risk, mediocre risk-adjusted returns, yet the stock keeps attracting flows. The risk section really puts the narrative premium in perspective.",
      replies: [
        { id: 'to1-r1', author: 'Alva Agent', isAgent: true, timestamp: '2h 45m ago', text: "The low Sharpe is partly a function of the **-38.5% drawdown** in Jun–Aug 2025. If you truncate to the post-recovery period (Sep 2025+), Sharpe improves to `1.34`. TSLA's return distribution is highly **regime-dependent** — trending periods look great, mean-reversion periods are brutal." },
        { id: 'to1-r2', author: 'Victor Huang', isAgent: false, timestamp: '2h 30m ago', text: "Regime-dependent is the right framing. I overlay a volatility regime filter on my position sizing — scale down when 30D vol > 50%. This dashboard makes that decision trivial." },
      ],
    },
    {
      id: 'to2', author: 'Linda Park', isAgent: false, timestamp: '2h ago',
      text: "The **news sentiment** widget is incredibly useful. Seeing bullish/bearish/neutral tags on each headline saves me 30 minutes of reading full articles. Quick question: is the sentiment classification done by the agent or rule-based?",
      replies: [
        { id: 'to2-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 45m ago', text: "It's **LLM-based** sentiment classification. Each headline is scored on a 3-point scale using context-aware analysis — not just keyword matching. For example, \"NHTSA investigation\" is tagged bearish even though it doesn't contain explicitly negative words." },
      ],
    },
    {
      id: 'to3', author: 'Sam Peterson', isAgent: false, timestamp: '1h 30m ago',
      text: "The **price + volume dual-axis** chart is clean. Volume spike in June aligns perfectly with the drawdown trough — classic capitulation signature. That's when I added to my position.",
      sticker: 'Chad_GG_Reaction.png',
      replies: [
        { id: 'to3-r1', author: 'Jason Park', isAgent: false, timestamp: '1h 15m ago', text: "Nice catch. Volume/price divergence is one of the most reliable bottoming signals for high-beta names. The dual-axis design was specifically chosen to make that pattern visible at a glance." },
      ],
    },
    {
      id: 'to4', author: 'Mia Chen', isAgent: false, timestamp: '50m ago',
      text: "P/E at **118x** vs S&P at 22x. The valuation snapshot really drives home how much future growth is priced in. EV/EBITDA at 82x vs sector 12x is even crazier. Any mean reversion and this drops 40%.",
      replies: [
        { id: 'to4-r1', author: 'Alva Agent', isAgent: true, timestamp: '35m ago', text: "The premium reflects **optionality** on Robot, FSD, and Energy. If you strip those out and value auto-only, fair value is ~$80-120. The delta between $381 and $100 is the market's implied probability of these moonshots succeeding." },
      ],
    },
    {
      id: 'to5', author: 'Tom W', isAgent: false, timestamp: '20m ago',
      text: "Social sentiment chart showing Reddit consistently above Twitter is interesting — retail is more bullish than CT. Divergence between the two has been a decent **contrarian signal** in the past.",
      sticker: 'Pepe_Smile_Minimal.png',
    },
    {
      id: 'to6', author: 'Linda Park', isAgent: false, timestamp: '12m ago',
      text: "If you want a deeper NVDA valuation analysis to compare against TSLA, check out Emma's dashboard — the peer comp table there is excellent.",
      playbookRefs: [{
        page: 'nvda',
        name: 'NVDA Panoramic Dashboard',
        author: 'Emma Liu',
        description: 'NVDA panoramic research: key metrics, stock price, investment thesis, and peer valuation',
        kpi: '+180.2%',
        pulse: 'active',
      }],
    },
  ] as Comment[],
};

export const MOCK_NVDA = {
  name: 'NVDA Panoramic Dashboard',
  description: 'NVDA panoramic research dashboard: key metrics, stock price trend, investment thesis, revenue segments, supply chain, and peer valuation comparison.',
  author: { name: 'Emma Liu', bio: 'Semiconductor Analyst · Buy-side', totalStars: 3200, publishedBy: 'Alva Intern' },
  pulse: 'active' as const,
  stats: { stars: 312, forks: 56, shares: 24 },
  builtOn: [
    { name: 'nvda-fundamentals', author: 'emma' },
    { name: 'peer-valuation', author: 'alva' },
  ],
  signals: MOCK_ASSET.signals,
  lineage: MOCK_ASSET.lineage,
  agentTake: {
    marketThesis: 'NVDA is the consensus AI infrastructure pick — and for good reason. Data Center revenue at 83% of total, gross margins at 75.5% (hardware-company record), and Blackwell ramping at 2x the Hopper rate. The CUDA software moat creates switching costs that justify the 35x NTM P/E premium over AMD (24x) and INTC (18x). The key risk is not competition but customer concentration: top 5 hyperscalers represent ~60% of Data Center revenue.',
    keyAssumptions: [
      'AI capex cycle extends through 2027+ as hyperscalers scale inference infrastructure alongside training',
      'Blackwell (GB200 NVL72) reaches 50%+ of Data Center revenue by Q3 FY26, with 3x ASP uplift vs H100',
      'Gross margin sustains above 72% despite new product transitions, supported by CUDA ecosystem lock-in',
    ],
    riskFactors: [
      'Customer concentration: if any top-5 hyperscaler shifts capex to custom silicon (Google TPU, Amazon Trainium), impact is amplified',
      'China export restrictions tightening could remove ~8-12% of Data Center TAM',
      'AMD MI300X gaining share in inference workloads — less margin-rich but high volume segment',
      'Cyclical risk: GPU demand could normalize as hyperscaler build-out completes, creating inventory overhang',
    ],
    buildLog: 'Dashboard structured as a full-stack NVDA research terminal. Key Metrics widget provides snapshot vitals. Stock price + Investment Thesis side-by-side for quantitative + qualitative view. Revenue Segments and Supply Chain widgets capture the value chain dynamics. Peer Valuation table enables instant relative value comparison across the semiconductor ecosystem.',
    usageGuide: 'Start with Key Metrics for current state, then read the Investment Thesis for forward-looking narrative. Revenue Segments shows where growth is coming from (Data Center 83%). Supply Chain widget reveals value capture asymmetry across the AI stack. Use Peer Valuation to assess relative attractiveness vs AMD, INTC, AVGO, and MRVL.',
    timeline: [
      { date: 'Mar 10, 2026', description: 'Blackwell ramp update: GB200 NVL72 racks shipping to hyperscalers at 2x initial B100 rate', active: true },
      { date: 'Mar 6, 2026', description: 'Peer valuation refreshed: AMD NTM P/E compressed from 27x to 24x on guidance miss' },
      { date: 'Mar 1, 2026', description: 'Supply chain widget updated: TSMC advanced packaging capacity expanded 40% for CoWoS' },
      { date: 'Feb 22, 2026', description: 'Revenue segments updated with Q4 FY26 data: Data Center at 83% of total' },
      { date: 'Feb 15, 2026', description: 'Dashboard launched with 6 core widgets covering NVDA from every angle' },
    ] as TimelineEntry[],
  },
  discussion: [
    {
      id: 'nv1', author: 'Chris Zhang', isAgent: false, timestamp: '4h ago',
      text: "The **peer valuation table** is the highlight for me. NVDA trading at 35x NTM P/E vs AMD at 24x and INTC at 18x — the premium is justified by Data Center growth but the gap is narrowing as AMD gains share with MI300X.",
      replies: [
        { id: 'nv1-r1', author: 'Alva Agent', isAgent: true, timestamp: '3h 45m ago', text: "AMD's MI300X is competitive on **inference** workloads but NVDA still dominates **training** — which is the higher-margin, higher-TAM segment. The peer table captures valuation multiples; what it can't show is NVDA's CUDA moat in the software stack. That's the real premium driver." },
        { id: 'nv1-r2', author: 'Chris Zhang', isAgent: false, timestamp: '3h 30m ago', text: "Fair on the CUDA moat. But ROCm is improving fast. My worry is that NVDA's premium compresses from 35x to 28x even if fundamentals stay strong — multiple contraction risk." },
      ],
    },
    {
      id: 'nv2', author: 'Emma Liu', isAgent: false, timestamp: '3h ago',
      text: "Just updated the **investment thesis** widget with the latest Blackwell ramp data. Key takeaway: GB200 NVL72 racks are shipping to hyperscalers at 2x the initial B100 ramp rate. Demand is real, not just pre-orders.",
      replies: [
        { id: 'nv2-r1', author: 'Alan Wu', isAgent: false, timestamp: '2h 45m ago', text: 'Thanks for the update, Emma. Do we know what percentage of Data Center revenue is Blackwell vs Hopper at this point?' },
        { id: 'nv2-r2', author: 'Emma Liu', isAgent: false, timestamp: '2h 30m ago', text: "Management hasn't broken it out explicitly, but channel checks suggest Blackwell is **~30%** of Data Center rev this quarter, ramping to 50%+ by Q3. The ASP uplift is significant — GB200 is ~3x the price of H100." },
      ],
    },
    {
      id: 'nv3', author: 'Derek Huang', isAgent: false, timestamp: '2h ago',
      text: "The **supply chain widget** showing TSMC, SK Hynix, and Micron performance alongside NVDA is brilliant. NVDA up 180% while its suppliers are up 40-80% — the value capture asymmetry in the AI stack is insane.",
      sticker: 'Stonks_Up_Minimal.png',
      replies: [
        { id: 'nv3-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 45m ago', text: "That asymmetry reflects **pricing power**. NVDA can raise GPU prices because demand exceeds supply; TSMC's pricing is more constrained by long-term contracts. The supply chain widget visualizes this value chain dynamic — the closer to the end customer (hyperscaler), the more value captured." },
      ],
    },
    {
      id: 'nv4', author: 'Rachel Kim', isAgent: false, timestamp: '1h 15m ago',
      text: "Revenue segments chart shows **Data Center at 83%** of total revenue. That's incredible concentration. Gaming went from being the core business to a rounding error. One question: does this make NVDA more or less risky? Concentrated but in the highest-growth segment.",
      replies: [
        { id: 'nv4-r1', author: 'Emma Liu', isAgent: false, timestamp: '1h ago', text: "It's a double-edged sword. Higher growth ceiling, but also higher **customer concentration risk** — top 5 hyperscalers are ~60% of Data Center rev. If any of them shift capex (like Google pushing TPU), the impact is amplified." },
      ],
    },
    {
      id: 'nv5', author: 'Frank Li', isAgent: false, timestamp: '40m ago',
      text: "Gross margin at **75.5%** is jaw-dropping for a hardware company. For context, AAPL is at 46%, AMD at 52%. This is software-company-level profitability. The CUDA ecosystem is doing the heavy lifting here.",
      sticker: 'Diamond_Hands_Minimal.png',
    },
    {
      id: 'nv6', author: 'Sophia Liu', isAgent: false, timestamp: '15m ago',
      text: "Best NVDA dashboard I've found. The combination of fundamentals, thesis, supply chain, and peer comp gives a complete picture without needing a Bloomberg terminal. Starred and shared with my team.",
      sticker: 'Rocket_Moon_Minimal.png',
      replies: [
        { id: 'nv6-r1', author: 'Emma Liu', isAgent: false, timestamp: '8m ago', text: 'Thank you! That means a lot. Planning to add an **earnings surprise tracker** widget next quarter — stay tuned.' },
      ],
    },
    {
      id: 'nv7', author: 'Chris Zhang', isAgent: false, timestamp: '10m ago',
      text: "The signal system in TSLA Tracking is worth referencing — David's API-driven approach could work for NVDA too.",
      playbookRefs: [{
        page: 'tsla-tracking',
        name: 'TSLA Tracking',
        author: 'David Chen',
        description: 'Real-time TSLA tracking with live Alva API data and full fundamentals suite',
        kpi: '+42.8%',
        pulse: 'active',
      }],
    },
    {
      id: 'nv8', author: 'Alan Wu', isAgent: false, timestamp: '6m ago',
      text: "**@Alva** remove the supply chain weight from the scoring model — just focus on PE ratio and revenue growth rate. Simpler is better.",
      replies: [
        {
          id: 'nv8-r1', author: 'Alva Agent', isAgent: true, timestamp: '5m ago',
          text: "Done! I've forked with your changes:\n- Removed supply chain weight from scoring\n- Focused on **PE ratio** and **revenue growth rate** only\n\nBacktest: max drawdown 18% → **12%**, cleaner signal with fewer false positives.",
          playbookRefs: [{
            page: 'playbook-detail',
            name: 'NVDA Lean v1',
            author: 'Alan Wu',
            description: 'Forked — PE + revenue growth only, no supply chain weight',
            kpi: '-12% DD',
            pulse: 'active',
            isFork: true,
          }],
        },
      ],
    },
  ] as Comment[],
};

export const MOCK_TSLA_TRACKING = {
  name: 'TSLA Tracking',
  description: 'Real-time TSLA tracking with live Alva API data: stock overview, narrative context, business line heatmap, social keywords, and full fundamentals suite.',
  author: { name: 'David Chen', bio: 'Systematic Trader · Multi-strat', totalStars: 1450, publishedBy: 'Alva Intern' },
  pulse: 'active' as const,
  stats: { stars: 156, forks: 34, shares: 9 },
  builtOn: [
    { name: 'alva-api-feed', author: 'david' },
    { name: 'tsla-fundamentals', author: 'alva' },
  ],
  signals: MOCK_ASSET.signals,
  lineage: MOCK_ASSET.lineage,
  agentTake: {
    marketThesis: 'TSLA tracking requires real-time data infrastructure. This playbook connects directly to the Alva API for live price feeds, then layers on comprehensive fundamentals — P/E trends, revenue/income trajectories, financial health metrics, earnings previews, insider trading, and analyst targets. The combination of real-time and fundamental data creates a systematic edge: narrative moves fast (social, news), but fundamentals are the anchor that determines whether to hold through volatility.',
    keyAssumptions: [
      'Real-time API data (stock overview, narrative context) provides 30-second latency vs 15-min delayed alternatives',
      'Business line heatmap (daily refresh) captures narrative rotation earlier than traditional analyst reports',
      'Insider trading signals (open market buys) are more informative than Rule 10b5-1 pre-programmed sales',
    ],
    riskFactors: [
      'API dependency: Alva API downtime would disable real-time sections of the dashboard',
      'Analyst price target range ($135–$550) is 4x wide — consensus has no predictive value at this dispersion level',
      'P/E at 118x vs 5-year average of ~80x implies 1.5 standard deviations above mean — mean reversion risk is material',
      'Energy storage segment (11 GWh Q4, backlog to 2027) may be underweight in current dashboard design',
    ],
    buildLog: 'Playbook built on Alva API session 2029491735235088384 for real-time TSLA data. Part 1 (Common) provides market context: overview, narrative, heatmap, price/social/news. Part 2 (Professional) deep-dives business lines by heat ranking. Part 3 (Fundamentals) covers valuation, financial health, earnings, insiders, and analyst targets. Total: 16 rows of data.',
    usageGuide: 'This is a full-day tracking dashboard. Check stock overview at market open for overnight moves. Narrative context and heatmap update daily — read these for the week\'s macro framing. Use insider trading and analyst targets for medium-term position management. The P/E trend chart is your valuation compass: if NTM P/E > 130x, consider trimming; below 90x, consider adding.',
    timeline: [
      { date: 'Mar 11, 2026', description: 'Analyst price targets updated: Morgan Stanley raised to $420, bear case at $135', active: true },
      { date: 'Mar 8, 2026', description: 'Insider activity: Kathleen Wilson (Dir) purchased 5,000 shares on open market' },
      { date: 'Mar 5, 2026', description: 'Earnings preview added: Q1 2026 consensus at $0.73 EPS, whisper at $0.78' },
      { date: 'Mar 1, 2026', description: 'P/E trend and Revenue/Income trend charts added to fundamentals section' },
      { date: 'Feb 26, 2026', description: 'Real-time tracking launched with Alva API integration' },
    ] as TimelineEntry[],
  },
  discussion: [
    {
      id: 'tt1', author: 'Kevin Wang', isAgent: false, timestamp: '3h ago',
      text: "The **Alva API real-time data** here is noticeably faster than the static playbooks. Stock overview updates within seconds of market moves. Question: is the business line heatmap also real-time or is it on a daily refresh?",
      replies: [
        { id: 'tt1-r1', author: 'Alva Agent', isAgent: true, timestamp: '2h 45m ago', text: "Good question. The stock overview (price, change, market cap) is **real-time** via Alva API streaming. The business line heatmap refreshes **daily** — it aggregates Twitter/Reddit keyword frequency which requires a larger time window to be statistically meaningful." },
        { id: 'tt1-r2', author: 'David Chen', isAgent: false, timestamp: '2h 30m ago', text: "I considered making the heatmap intraday but the signal-to-noise ratio drops significantly below daily granularity. Too many false positives from one viral tweet." },
      ],
    },
    {
      id: 'tt2', author: 'Sarah Lin', isAgent: false, timestamp: '2h ago',
      text: "The **insider trading table** caught my eye — Vaibhav Taneja (CFO) selling 25K shares under Rule 10b5-1 while Kathleen Wilson (Director) bought 5K on open market. Insiders are mixed but the open market buy is more informative than a pre-scheduled sale.",
      replies: [
        { id: 'tt2-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 45m ago', text: "Correct analysis. **Rule 10b5-1 sales** are pre-programmed and carry less signal — executives set them up months in advance for diversification. **Open market purchases** are voluntary and contemporaneous, making them a stronger bullish signal. Wilson's buy at current prices is notable." },
      ],
    },
    {
      id: 'tt3', author: 'Alex Reeves', isAgent: false, timestamp: '1h 30m ago',
      text: "The **P/E trend chart** is sobering. Trading at 118x while the 5-year average is around 80x. We're 1.5 standard deviations above the mean. Either earnings need to catch up fast or the multiple compresses. The energy storage segment might be the surprise catalyst for earnings growth though.",
      replies: [
        { id: 'tt3-r1', author: 'David Chen', isAgent: false, timestamp: '1h 15m ago', text: "Energy is indeed the under-discussed segment. 11 GWh deployed in Q4 with a backlog extending to 2027 — that's real recurring revenue at better margins than auto. I might add a dedicated energy segment widget in the next update." },
      ],
    },
    {
      id: 'tt4', author: 'Mia Chen', isAgent: false, timestamp: '55m ago',
      text: "The **analyst price target** widget at the bottom is a great addition. Seeing the range from $135 (bear) to $550 (bull) — that's a 4x spread. No consensus on this stock. The average at $310 implies about 20% downside from current price.",
      sticker: 'Wojak_Cry_Minimal.png',
      replies: [
        { id: 'tt4-r1', author: 'Tom W', isAgent: false, timestamp: '40m ago', text: "The wide analyst range is exactly why TSLA is so interesting to trade. High dispersion = high vol = opportunity if you have a view. I use the bear target as my stop-loss reference." },
      ],
    },
    {
      id: 'tt5', author: 'Nina Patel', isAgent: false, timestamp: '30m ago',
      text: "The **narrative context** section captures the bull/bear dynamic perfectly. Robot + FSD + xAI on the bull side vs auto margin compression + Musk distraction on the bear side. Having this as a persistent summary at the top saves me from re-reading 10 analyst notes every week.",
      sticker: 'Stonks_Up_Minimal.png',
    },
    {
      id: 'tt6', author: 'Ryan Chen', isAgent: false, timestamp: '10m ago',
      text: "This is the most comprehensive TSLA tracker I've used. The combination of real-time API data + fundamentals + social sentiment + insider activity in one page is exactly what a **systematic approach** to TSLA needs. David, this is chef's kiss.",
      sticker: 'Chad_Heart_Minimal.png',
      replies: [
        { id: 'tt6-r1', author: 'David Chen', isAgent: false, timestamp: '5m ago', text: "Thanks Ryan. The goal was to build what I wished existed — a single-page TSLA terminal that updates itself. Fork it and customize for your own tickers." },
      ],
    },
    {
      id: 'tt7', author: 'Mia Chen', isAgent: false, timestamp: '8m ago',
      text: "Cross-referencing with TSLA Overview makes this even more useful — the risk KPIs there complement the tracking data here.",
      playbookRefs: [{
        page: 'tsla-overview',
        name: 'TSLA Overview',
        author: 'Jason Park',
        description: 'TSLA overview: price/volume chart, valuation snapshot, risk indicators, and sentiment',
        kpi: '+24.5%',
        pulse: 'active',
      }],
    },
    {
      id: 'tt8', author: 'Jason Park', isAgent: false, timestamp: '5m ago',
      text: "**@Alva** tighten the stop-loss from 5% to 3%, and add an RSI > 70 filter on entry signals. Want to see if it improves Sharpe.",
      replies: [
        {
          id: 'tt8-r1', author: 'Alva Agent', isAgent: true, timestamp: '4m ago',
          text: "Done! I've forked with your changes:\n- Stop-loss: 5% → **3%**\n- Added **RSI > 70** filter on entry signals\n\nBacktest: Sharpe 1.82 → **2.15**, max drawdown 12% → 9%.",
          playbookRefs: [{
            page: 'playbook-detail',
            name: 'TSLA Tracking v2',
            author: 'Jason Park',
            description: 'Forked — stop-loss 3%, RSI > 70 filter added',
            kpi: '+42.8%',
            pulse: 'active',
            isFork: true,
          }],
        },
      ],
    },
  ] as Comment[],
};

/* ========== Chat Mock 数据 ========== */

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'c1',
    role: 'user',
    text: 'What are the key risk factors for TSLA right now?',
    timestamp: '2m ago',
  },
  {
    id: 'c2',
    role: 'agent',
    text: 'Based on the dashboard data, the primary risk factors are:\n\n1. **High Beta (1.82)** — TSLA moves ~1.8x the market. A 10% SPY drop implies ~18% TSLA drawdown.\n2. **Elevated Volatility (52.3% 30D)** — significantly above the 90-day average, suggesting turbulent price action ahead.\n3. **Valuation stretch** — P/E at 118x vs S&P 22x prices in enormous growth optionality. Any narrative miss could trigger 30%+ compression.\n4. **Social sentiment divergence** — Reddit bullish, Twitter neutral. Historically this pattern precedes 10-15% corrections.',
    timestamp: '2m ago',
  },
  {
    id: 'c3',
    role: 'user',
    text: 'Should I reduce my position size given the current volatility?',
    timestamp: '1m ago',
  },
  {
    id: 'c4',
    role: 'agent',
    text: 'With 30D vol at **52.3%** (above the 50% threshold), a prudent approach is to scale down. A common heuristic:\n\n- **Vol < 35%**: Full size\n- **35\u201350%**: 75% size\n- **> 50%**: 50% size\n\nAt current levels, half-sizing your TSLA position while maintaining the same dollar-risk via tighter stops would improve your risk-adjusted returns. The Sharpe ratio of 0.87 already tells you the vol isn\'t being compensated adequately.',
    timestamp: '1m ago',
  },
];
