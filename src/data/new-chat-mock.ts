/**
 * [INPUT]: CHART_COLORS from @/lib/chart-theme
 * [OUTPUT]: NewChat 页面的 skill / prompts / playbooks mock 数据
 * [POS]: NewChat 页面的数据层
 */

import { CHART_COLORS } from '@/lib/chart-theme';

const C = CHART_COLORS;

/* ========== 类型 ========== */

export interface NewChatPlaybook {
  id: string;
  title: string;
  creator: string;
  desc: string;
  tickers: string[];
  color: string;
  stars: number;
  remixes: number;
}

export interface NewChatTemplate {
  id: string;
  label: string;
  /** Skill 创建者；KOL skill 用 Avatar 头像，否则使用 icon */
  creator: string;
  /** 用于 hover 信息卡的简介 */
  description: string;
  /** 当为 true，pill 用 creator 头像；否则用 icon */
  kol?: boolean;
  icon?: string;
  prompts: string[];
  playbooks: NewChatPlaybook[];
}

export interface CommunitySkillTemplate extends NewChatTemplate {
  tags: string[];
  uses: string;
  updatedAt: string;
}

/* ========== 通用 playbook 池（用来给 skill 凑齐 6 张） ========== */

const EXTRA_POOL: NewChatPlaybook[] = [
  {
    id: 'extra-hyperscaler-capex',
    title: 'Hyperscaler Capex Tracker',
    creator: 'Macro Scope X',
    desc: 'Quarterly roll-up of MSFT / AMZN / GOOGL / META capex guidance, mapped to AI-infra beneficiaries with accel/decel flags.',
    tickers: ['MSFT', 'AMZN', 'GOOGL', 'META'],
    color: C.primary,
    stars: 489,
    remixes: 72,
  },
  {
    id: 'extra-gold-regime',
    title: 'Gold Regime Dashboard',
    creator: 'Sheer YLL YGG',
    desc: 'Real-yield, DXY, and central-bank-buying regime overlay for gold with confidence-scored regime shifts.',
    tickers: ['GLD', 'GDX', 'DXY'],
    color: C.orange,
    stars: 342,
    remixes: 51,
  },
  {
    id: 'extra-eth-l2',
    title: 'ETH L2 Market Share',
    creator: 'YGGYLL',
    desc: 'Live TVL, daily txns, and fee capture across Base / Arbitrum / Optimism / zkSync with revenue accrual to ETH mainnet.',
    tickers: ['ETH', 'ARB', 'OP'],
    color: C.deepBlue,
    stars: 276,
    remixes: 44,
  },
  {
    id: 'extra-fomc-playbook',
    title: 'FOMC Day Playbook',
    creator: 'Harry Zzz',
    desc: 'Intraday vol + rate-path positioning around every FOMC. Tracks dot-plot surprise, SEP revisions, and post-meeting rotation.',
    tickers: ['SPY', 'TLT', 'VIX'],
    color: C.red,
    stars: 198,
    remixes: 29,
  },
  {
    id: 'extra-pair-trade',
    title: 'Pair-Trade Radar',
    creator: 'Alva Intern',
    desc: 'Scans SPX + NDX pairs for 2σ spread dislocations with cointegration filter. Generates long/short candidates with sizing.',
    tickers: ['KO', 'PEP', 'V', 'MA'],
    color: C.blue,
    stars: 164,
    remixes: 23,
  },
  {
    id: 'extra-dividend-alpha',
    title: 'Dividend Aristocrat Alpha',
    creator: 'Smart Jing',
    desc: 'Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.',
    tickers: ['SPX', 'NOBL'],
    color: C.green,
    stars: 231,
    remixes: 38,
  },
];

const padTo6 = (base: NewChatPlaybook[]): NewChatPlaybook[] => {
  if (base.length >= 6) return base.slice(0, 6);
  const need = 6 - base.length;
  const usedIds = new Set(base.map((p) => p.id));
  const fill: NewChatPlaybook[] = [];
  for (const p of EXTRA_POOL) {
    if (fill.length >= need) break;
    if (usedIds.has(p.id)) continue;
    fill.push(p);
  }
  return [...base, ...fill];
};

/* ========== 一级 skills（Figma 顺序匹配） ========== */

export const PRIMARY_TEMPLATES: NewChatTemplate[] = [
  {
    id: 'theme-tracker',
    label: 'Theme Tracker',
    icon: 'buld-l',
    creator: 'Alva',
    description: 'Build a live tracker for any market theme — surfaces sentiment, earnings, and policy catalysts across the basket weekly.',
    prompts: [
      'Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names',
      'Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts',
      'Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators',
    ],
    playbooks: padTo6([
      { id: 'ai-infra-theme', title: 'AI Infra Theme Radar', creator: 'Alva Intern', desc: 'Tracks NVDA / AVGO / TSM + power grid enablers. Surfaces weekly sentiment + rev-beat signals and rebalances exposure to the strongest relative performers.', tickers: ['NVDA', 'AVGO', 'TSM', 'VST'], color: C.primary, stars: 312, remixes: 48 },
      { id: 'glp1-theme', title: 'GLP-1 Obesity Complex', creator: 'Harry Zzz', desc: 'Unified tracker for GLP-1 winners (LLY / NVO) and food/restaurant losers. Weekly sentiment scoring with catalyst calendar.', tickers: ['LLY', 'NVO', 'AMGN'], color: C.orange, stars: 186, remixes: 22 },
      { id: 'nuclear-theme', title: 'Nuclear Renaissance Monitor', creator: 'Macro Scope X', desc: 'Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.', tickers: ['CCJ', 'SMR', 'VST', 'CEG'], color: C.deepBlue, stars: 94, remixes: 12 },
    ]),
  },
  {
    id: 'smart-screener',
    label: 'Smart Screener',
    icon: 'target-l2',
    creator: 'Alva',
    description: 'Rank stocks by any factor combo, daily.',
    prompts: [
      'Screen for US large-caps with rising earnings estimates and positive 20-day price momentum',
      'Find cash-rich small-caps trading below 10x forward earnings with expanding gross margins',
      'Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio',
    ],
    playbooks: padTo6([
      { id: 'momentum-quality', title: 'Momentum × Quality Screen', creator: 'Smart Jing', desc: 'Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, rebalances weekly with 2% stop-loss band.', tickers: ['SPX', 'QQQ'], color: C.green, stars: 241, remixes: 37 },
      { id: 'cheap-cashcow', title: 'Cheap Cash Cow Screener', creator: 'Alva Intern', desc: 'Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.', tickers: ['R2K'], color: C.blue, stars: 128, remixes: 19 },
      { id: 'crypto-breakout', title: 'Crypto Breakout Screen', creator: 'YGGYLL', desc: 'Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for further review.', tickers: ['BTC', 'ETH', 'SOL', 'AVAX'], color: C.red, stars: 76, remixes: 9 },
    ]),
  },
  {
    id: 'deep-dive',
    label: 'Deep Dive',
    icon: 'search-l',
    creator: 'Alva',
    description: 'A complete research package on any ticker. Pulls revenue segmentation from filings, builds a peer comparable set, traces the supply chain up and downstream, then drafts a bull and bear thesis with scenario-weighted price targets. Output is a single read-once briefing — no skimming required, no follow-up questions left dangling.',
    prompts: [
      'Give me a deep-dive on NVDA — revenue segmentation, peer valuation, supply chain, and bull/bear thesis',
      'Deep-dive TSMC: capacity, customer mix, geopolitical risk, and long-term margin trajectory',
      'Full research on Solana: ecosystem activity, token economics, validator health, and competition vs ETH L2s',
    ],
    playbooks: padTo6([
      { id: 'nvda-deepdive', title: 'NVDA 360° Deep Dive', creator: 'Sheer YLL YGG', desc: 'End-to-end NVDA research — revenue segmentation, hyperscaler capex correlation, peer valuation, and scenario-based price targets.', tickers: ['NVDA', 'AMD', 'AVGO'], color: C.primary, stars: 412, remixes: 58 },
      { id: 'tsmc-deepdive', title: 'TSMC Long Thesis', creator: 'Macro Scope X', desc: 'Capacity roadmap, customer concentration, Arizona + Kumamoto fab ramps, geopolitical risk weighting, and 5Y margin path.', tickers: ['TSM', '2330.TW'], color: C.deepBlue, stars: 163, remixes: 21 },
      { id: 'sol-deepdive', title: 'SOL Ecosystem Deep Dive', creator: 'Harry Zzz', desc: 'DEX volume, Firedancer progress, validator decentralization, revenue accrual, and valuation vs ETH + L2 peers.', tickers: ['SOL'], color: C.orange, stars: 87, remixes: 13 },
    ]),
  },
  {
    id: 'daily-macro-brief',
    label: 'Daily Macro Brief',
    kol: true,
    creator: 'Macro Scope X',
    description: 'A daily breakdown of macro flows — rates, FX, and cross-asset signals — distilled into a 5-minute brief.',
    prompts: [
      'Daily macro brief covering US rates, DXY, oil, and credit spreads with LLM commentary',
      'Weekly China macro digest — credit impulse, property indicators, and policy shifts',
      'Morning global risk dashboard for Asia → Europe → US cross-asset flows',
    ],
    playbooks: padTo6([
      { id: 'daily-macro', title: 'Daily Macro Brief', creator: 'Macro Scope X', desc: 'Auto-generated macro snapshot every US open — rates, DXY, oil, credit spreads, and LLM-authored summary of overnight drivers.', tickers: ['DXY', 'CL', 'HYG'], color: C.deepBlue, stars: 211, remixes: 34 },
      { id: 'china-weekly', title: 'China Macro Weekly', creator: 'Harry Zzz', desc: 'Weekly China credit impulse, property sales, and policy-move tracker. Flags deviations from trend and dispatches alerts.', tickers: ['FXI', 'KWEB'], color: C.red, stars: 58, remixes: 6 },
      { id: 'global-risk', title: 'Global Risk Cross-Asset', creator: 'Smart Jing', desc: 'Asia → Europe → US handoff dashboard tracking equity, rates, FX, and credit moves with regime-shift detection.', tickers: ['SPY', 'EFA', 'EEM'], color: C.blue, stars: 144, remixes: 18 },
    ]),
  },
  {
    id: 'earnings-edge',
    label: 'Earnings Edge',
    kol: true,
    creator: 'Smart Jing',
    description: 'Whisper numbers and post-print drift, weekly.',
    prompts: [
      'Summarize the latest NVDA earnings call and compare guidance to consensus',
      'Whisper numbers + post-earnings drift scanner for next week’s MAG7 reports',
      'Aggregate semis earnings read-across from TSM → ASML → Applied Materials → NVDA',
    ],
    playbooks: padTo6([
      { id: 'earnings-whisper', title: 'Earnings Whisper Board', creator: 'Smart Jing', desc: 'Crowdsourced + LLM whisper numbers + post-earnings drift tracker. Ranks names by whisper-vs-consensus gap for upcoming reports.', tickers: ['AAPL', 'MSFT', 'NVDA', 'META'], color: C.primary, stars: 182, remixes: 27 },
      { id: 'semis-readacross', title: 'Semis Read-Across', creator: 'Alva Intern', desc: 'Chain earnings read-across TSM → ASML → AMAT → NVDA. Quantifies lead-lag signal on each node of the supply chain.', tickers: ['TSM', 'ASML', 'AMAT', 'NVDA'], color: C.orange, stars: 74, remixes: 10 },
      { id: 'mag7-postprint', title: 'MAG7 Post-Print Drift', creator: 'Harry Zzz', desc: 'Backtests post-earnings drift across MAG7 by surprise magnitude and guide direction. Suggests entry windows.', tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'], color: C.green, stars: 102, remixes: 14 },
    ]),
  },
];

/* ========== 二级（Others 下拉） skills ========== */

export const OTHERS_TEMPLATES: NewChatTemplate[] = [
  {
    id: 'crypto-pulse',
    label: 'Crypto Pulse',
    kol: true,
    creator: 'Harry Zzz',
    description: 'Spot tradable signal in noisy crypto. Aggregates news flow, on-chain activity, ETF flows, exchange balances, and stablecoin issuance into a single morning pulse — flags the names with statistically meaningful deviations and explains *why* in plain English so you can move before the desk does.',
    prompts: [
      'Summarize the last 24h of news on Bitcoin and flag anything that moved price >2%',
      'Scan top-50 tokens for 30D breakouts and rising active addresses',
      'Track ETH L2 market share — TVL, txns, and fee accrual back to mainnet',
    ],
    playbooks: padTo6([
      { id: 'btc-news', title: 'BTC News Pulse', creator: 'YGGYLL', desc: '24h news aggregator for BTC with sentiment scoring, price-correlation tagging, and auto-flagging of likely movers.', tickers: ['BTC'], color: C.primary, stars: 64, remixes: 8 },
      { id: 'crypto-breakout-2', title: 'Crypto Breakout Screen', creator: 'YGGYLL', desc: 'Scans top-50 tokens for 30D return > 30% combined with rising active-address count.', tickers: ['BTC', 'ETH', 'SOL'], color: C.red, stars: 76, remixes: 9 },
    ]),
  },
  {
    id: 'what-if',
    label: 'What If',
    icon: 'remix-l',
    creator: 'Alva',
    description: 'Run scenarios. See your portfolio reprice.',
    prompts: [
      'What if the Fed delivers 3 more cuts in 2026 — how should a balanced 60/40 portfolio reposition?',
      'What if NVDA earnings miss consensus by 5% next quarter — which AI beneficiaries still outperform?',
      'What if oil spikes to $120 on Middle East tension — sector rotation map and hedges',
    ],
    playbooks: padTo6([
      { id: 'fed-cuts-scenario', title: 'Fed-Cut Scenario Rebalancer', creator: 'Smart Jing', desc: 'Monte Carlo on 60/40 under 3 Fed cut paths (dovish / base / hawkish). Suggests duration + small-cap tilt adjustments each FOMC.', tickers: ['AGG', 'IWM', 'SPY'], color: C.blue, stars: 154, remixes: 25 },
      { id: 'nvda-miss-scenario', title: 'NVDA Miss Shockwave', creator: 'Alva Intern', desc: 'What-if engine for AI peer reaction to a 5% NVDA revenue miss. Ranks relative drawdowns and identifies resilient derivatives plays.', tickers: ['NVDA', 'AVGO', 'AMD', 'MU'], color: C.red, stars: 98, remixes: 14 },
      { id: 'oil-spike-scenario', title: 'Oil Spike Hedge Map', creator: 'Macro Scope X', desc: 'Maps SPX sector responses to a $120 oil scenario and proposes airline / transport hedges sized to portfolio oil-beta.', tickers: ['XOM', 'CVX', 'DAL', 'FDX'], color: C.orange, stars: 71, remixes: 9 },
    ]),
  },
  {
    id: 'yield-hunter',
    label: 'Yield Hunter',
    kol: true,
    creator: 'Sheer YLL YGG',
    description: 'Hunts the highest risk-adjusted yield wherever it lives — Treasuries, IG and HY credit, preferreds, MLPs, REITs, and on-chain stablecoin lending. Normalizes spreads to common units, attaches default-probability and smart-contract-risk overlays where relevant, and ladders the result so you can rotate up or down the curve as regimes shift. Includes a tax-equivalent comparison across muni / corporate / pass-through structures.',
    prompts: [
      'Compare 10Y Treasury yield vs IG/HY credit spreads with regime-shift highlights',
      'Find dividend-growth names with 10+ years of growth and sub-60% payout ratio',
      'Stablecoin yield ladder — Aave / Compound / Pendle with risk scores',
    ],
    playbooks: padTo6([
      { id: 'div-aristocrat', title: 'Dividend Aristocrat Alpha', creator: 'Smart Jing', desc: 'Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.', tickers: ['SPX', 'NOBL'], color: C.green, stars: 231, remixes: 38 },
      { id: 'credit-ladder', title: 'IG / HY Credit Ladder', creator: 'Macro Scope X', desc: 'Spread + duration ladder across IG and HY buckets with default-probability overlays and regime triggers.', tickers: ['LQD', 'HYG'], color: C.blue, stars: 89, remixes: 12 },
    ]),
  },
  {
    id: 'dividend-diary',
    label: 'Dividend Diary',
    kol: true,
    creator: 'Lily Lou',
    description: 'A weekly diary of dividend hikes, cuts, and special distributions across SPX and global aristocrats.',
    prompts: [
      'List companies that hiked dividends >10% this week and their payout coverage',
      'Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio',
      'Flag any SPX dividend cut announcements in the past 30 days',
    ],
    playbooks: padTo6([
      { id: 'div-aristocrat-2', title: 'Dividend Aristocrat Alpha', creator: 'Smart Jing', desc: 'Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.', tickers: ['SPX', 'NOBL'], color: C.green, stars: 231, remixes: 38 },
      { id: 'div-hikes', title: 'Weekly Dividend Hike Tracker', creator: 'Lily Lou', desc: 'Surfaces every SPX/RIY dividend hike each week with coverage, growth-streak, and post-announcement drift.', tickers: ['SPX'], color: C.primary, stars: 64, remixes: 7 },
    ]),
  },
  {
    id: 'backtest',
    label: 'Backtest',
    icon: 'history-l',
    creator: 'Alva',
    description: 'Rule-based strategies, fully attributed.',
    prompts: [
      'Backtest a monthly-rebalanced equal-weight MAG7 basket over the last 10 years',
      'Backtest a BTC/ETH 70/30 portfolio rebalanced weekly with 15% max drawdown stop',
      'Backtest buying TSM on days where NVDA gains >3%, exit on +10% TP or -5% SL',
    ],
    playbooks: padTo6([
      { id: 'mag7-equal', title: 'MAG7 Equal-Weight', creator: 'Harry Zzz', desc: 'Maintains a fully invested equal-weight MAG7 portfolio, rebalanced monthly. Tracks alpha vs SPX and records decomposition.', tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'], color: C.blue, stars: 89, remixes: 14 },
      { id: 'nvda-tsm-bt', title: 'NVDA +3% → TSM Entry', creator: 'Smart Jing', desc: 'Trigger-based backtest — buy TSM at close when NVDA gains >3%, exit on +10% TP or -5% SL. Full historical P&L attribution.', tickers: ['NVDA', 'TSM'], color: C.red, stars: 48, remixes: 7 },
      { id: 'btc-macd-bt', title: 'BTC MACD 1h Crossover', creator: 'Macro Scope X', desc: 'Backtests BTC MACD(12,26,9) crossover on 1h candles. Reports Sharpe, max DD, and sensitivity to parameter sweeps.', tickers: ['BTC'], color: C.deepBlue, stars: 34, remixes: 5 },
    ]),
  },
  {
    id: 'valuation',
    label: 'Valuation',
    icon: 'credit-l',
    creator: 'Alva',
    description: 'Reverse-DCF, relative-multiple, and SOTP frameworks — value any asset like a sell-side analyst.',
    prompts: [
      'Build a reverse-DCF for MSFT implied by the current share price and compare to peers',
      'Relative valuation snapshot for the Mag7 — EV/Sales, P/E, and FCF yield vs 5Y median',
      'SOTP valuation for Amazon — AWS / Retail / Ads / Prime / Logistics',
    ],
    playbooks: padTo6([
      { id: 'mag7-relval', title: 'MAG7 Relative Valuation', creator: 'Alva Intern', desc: 'Live EV/Sales, P/E NTM, and FCF yield table for MAG7 with z-score vs 5-year median. Highlights outliers automatically.', tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'], color: C.primary, stars: 142, remixes: 23 },
      { id: 'amzn-sotp', title: 'AMZN SOTP', creator: 'Sheer YLL YGG', desc: 'Sum-of-the-parts on Amazon — AWS, Retail, Ads, Prime, Logistics. Adjustable multiples per segment and scenario toggles.', tickers: ['AMZN'], color: C.orange, stars: 96, remixes: 11 },
    ]),
  },
];

/* ========== 社区用户贡献的 skills ========== */

export const COMMUNITY_TEMPLATES: CommunitySkillTemplate[] = [
  {
    id: 'community-insider-buy-radar',
    label: 'Insider Buy Radar',
    kol: true,
    creator: 'Deep Ledger',
    description: 'Tracks clustered insider buys, 10b5-1 changes, and post-filing drift across US equities.',
    tags: ['Filings', 'Insider Cluster', 'Event Drift'],
    uses: '1.8k uses',
    updatedAt: '23m ago',
    prompts: [
      'Build an insider-buy radar for US mid-caps, filtering for clustered purchases above $250k',
      'Track 10b5-1 changes and open-market buys for software stocks with positive earnings revisions',
      'Flag insider purchases that happen within 30 days of guidance updates or activist filings',
    ],
    playbooks: padTo6([
      { id: 'insider-cluster-us', title: 'Clustered Insider Buy Monitor', creator: 'Deep Ledger', desc: 'Finds companies with multiple open-market insider purchases over a 14-day window and ranks them by purchase size, role seniority, and post-filing drift.', tickers: ['SPX', 'R2K'], color: C.primary, stars: 318, remixes: 46 },
      { id: 'ceo-cfo-buys', title: 'CEO / CFO Buy Signal', creator: 'Deep Ledger', desc: 'Filters insider buys to CEO and CFO activity, removes low-signal option exercises, and scores names against valuation and estimate revisions.', tickers: ['IWM', 'QQQ'], color: C.blue, stars: 204, remixes: 28 },
      { id: 'activist-plus-insider', title: 'Activist + Insider Overlap', creator: 'Alva Intern', desc: 'Watches activist filings and insider buying overlap, then builds a candidate list for event-driven deep dives.', tickers: ['SPY', 'IWM'], color: C.orange, stars: 147, remixes: 19 },
    ]),
  },
  {
    id: 'community-whale-wallet-watch',
    label: 'Whale Wallet Watch',
    kol: true,
    creator: 'WalletWatcher',
    description: 'Flags large wallet movements, exchange inflows, stablecoin rotations, and funding stress.',
    tags: ['On-chain Flow', 'Exchange Flow', 'Liquidity'],
    uses: '2.4k uses',
    updatedAt: '1h ago',
    prompts: [
      'Track BTC whale movements above 1,000 BTC and alert when transfers move toward major exchanges',
      'Build a stablecoin rotation monitor across USDT, USDC, and DAI with exchange inflow context',
      'Watch SOL and ETH large-wallet activity alongside funding rates and spot volume',
    ],
    playbooks: padTo6([
      { id: 'btc-whale-exchange-flow', title: 'BTC Whale Exchange Flow', creator: 'WalletWatcher', desc: 'Tracks dormant-wallet movements, large exchange deposits, and spot volume confirmation to flag potential sell-pressure windows.', tickers: ['BTC'], color: C.orange, stars: 402, remixes: 64 },
      { id: 'stablecoin-rotation', title: 'Stablecoin Rotation Map', creator: 'YGGYLL', desc: 'Maps USDT / USDC flows by venue and chain, then scores whether liquidity is moving into or out of risk assets.', tickers: ['USDT', 'USDC', 'BTC'], color: C.green, stars: 288, remixes: 41 },
      { id: 'sol-whale-pulse', title: 'SOL Whale Pulse', creator: 'Harry Zzz', desc: 'Combines SOL whale transfers, perp funding, and DEX volume to surface early risk-on and risk-off rotations.', tickers: ['SOL', 'ETH'], color: C.deepBlue, stars: 166, remixes: 24 },
    ]),
  },
  {
    id: 'community-options-flow-scanner',
    label: 'Options Flow Scanner',
    kol: true,
    creator: 'Options Club',
    description: 'Ranks unusual option flow by premium, sweep quality, open interest, and post-flow move.',
    tags: ['Derivatives', 'Vol Surface', 'Positioning'],
    uses: '1.1k uses',
    updatedAt: '5h ago',
    prompts: [
      'Scan unusual call buying in liquid US equities, filtering for premium above $1m and OI expansion',
      'Build a weekly options-flow dashboard for MAG7 with sweep quality and implied-vol change',
      'Flag bearish put flow that appears before earnings or guidance revisions',
    ],
    playbooks: padTo6([
      { id: 'unusual-call-flow', title: 'Unusual Call Flow Ranker', creator: 'Options Club', desc: 'Scores call sweeps by premium, liquidity, OI confirmation, and follow-through to reduce noisy single-print alerts.', tickers: ['AAPL', 'NVDA', 'TSLA'], color: C.primary, stars: 265, remixes: 39 },
      { id: 'mag7-vol-flow', title: 'MAG7 Vol Flow Board', creator: 'Smart Jing', desc: 'Combines options premium, IV change, and post-flow price action across MAG7 for a daily directional board.', tickers: ['AAPL', 'MSFT', 'NVDA'], color: C.blue, stars: 221, remixes: 31 },
      { id: 'earnings-put-flow', title: 'Pre-Earnings Put Flow', creator: 'Macro Scope X', desc: 'Watches put buying ahead of earnings and filters for flows that historically precede downside gaps.', tickers: ['QQQ', 'SPY'], color: C.red, stars: 119, remixes: 15 },
    ]),
  },
  {
    id: 'community-semis-supply-chain',
    label: 'Semis Supply Chain',
    kol: true,
    creator: 'Silicon Cycle',
    description: 'Connects TSM, ASML, HBM vendors, and hyperscaler capex into one signal map.',
    tags: ['Supply Chain', 'Capacity', 'Read-through'],
    uses: '3.2k uses',
    updatedAt: '1d ago',
    prompts: [
      'Build a semis supply-chain tracker across NVDA, TSM, ASML, SK hynix, MU, and hyperscaler capex',
      'Track HBM supply commentary and map read-through to GPU system shipments',
      'Monitor TSM capacity, CoWoS packaging, and AI server demand signals in one weekly brief',
    ],
    playbooks: padTo6([
      { id: 'hbm-bottleneck-map', title: 'HBM Bottleneck Map', creator: 'Silicon Cycle', desc: 'Tracks HBM supply, packaging capacity, and memory-vendor commentary to explain bottlenecks in AI accelerator shipments.', tickers: ['NVDA', 'MU', 'TSM'], color: C.deepBlue, stars: 534, remixes: 82 },
      { id: 'cowos-capacity-watch', title: 'CoWoS Capacity Watch', creator: 'Macro Scope X', desc: 'Watches TSM advanced packaging updates, supplier lead times, and hyperscaler demand commentary.', tickers: ['TSM', 'ASML'], color: C.primary, stars: 346, remixes: 47 },
      { id: 'ai-server-readthrough', title: 'AI Server Read-Through', creator: 'Alva Intern', desc: 'Maps Dell, Super Micro, ODM, and component commentary back to AI infrastructure beneficiaries.', tickers: ['DELL', 'SMCI', 'NVDA'], color: C.orange, stars: 271, remixes: 33 },
    ]),
  },
  {
    id: 'community-dividend-cut-guard',
    label: 'Dividend Cut Guard',
    kol: true,
    creator: 'Cashflow Club',
    description: 'Screens payout risk, FCF coverage, leverage, and management language before dividend cuts.',
    tags: ['Payout Risk', 'FCF Coverage', 'Leverage'],
    uses: '760 uses',
    updatedAt: '2d ago',
    prompts: [
      'Screen dividend stocks for payout risk using FCF coverage, leverage, and negative guidance language',
      'Build a dividend cut watchlist for REITs and utilities with debt maturity pressure',
      'Flag companies where dividend yield is high but free cash flow coverage is deteriorating',
    ],
    playbooks: padTo6([
      { id: 'dividend-cut-watchlist', title: 'Dividend Cut Watchlist', creator: 'Cashflow Club', desc: 'Ranks dividend stocks by FCF coverage, leverage trend, maturity wall, and management language risk.', tickers: ['NOBL', 'SPX'], color: C.green, stars: 186, remixes: 23 },
      { id: 'reit-payout-risk', title: 'REIT Payout Risk Monitor', creator: 'Lily Lou', desc: 'Combines payout ratios, debt maturities, and cap-rate pressure for REIT dividend sustainability scoring.', tickers: ['VNQ', 'SPY'], color: C.blue, stars: 128, remixes: 14 },
      { id: 'yield-trap-screen', title: 'Yield Trap Screen', creator: 'Smart Jing', desc: 'Screens high-yield names for deteriorating FCF, falling estimates, and leverage pressure.', tickers: ['HYG', 'LQD'], color: C.red, stars: 97, remixes: 11 },
    ]),
  },
  {
    id: 'community-macro-brief-builder',
    label: 'Macro Brief Builder',
    kol: true,
    creator: 'Market Bento',
    description: 'Turns rates, FX, oil, credit, and equity futures into a concise daily macro brief.',
    tags: ['Cross-asset', 'Rates & FX', 'Risk Regime'],
    uses: '920 uses',
    updatedAt: '3h ago',
    prompts: [
      'Create a daily macro brief from rates, DXY, oil, credit spreads, and equity futures',
      'Summarize today’s cross-asset risk regime and explain what changed since yesterday',
      'Build a morning brief for Asia to US market handoff with rates, FX, and commodity context',
    ],
    playbooks: padTo6([
      { id: 'cross-asset-morning-brief', title: 'Cross-Asset Morning Brief', creator: 'Market Bento', desc: 'Summarizes rates, FX, oil, credit, and equity futures into a concise macro regime note before the US open.', tickers: ['DXY', 'TLT', 'SPY'], color: C.deepBlue, stars: 214, remixes: 31 },
      { id: 'risk-regime-score', title: 'Risk Regime Score', creator: 'Macro Scope X', desc: 'Combines VIX, credit spreads, DXY, and rates momentum into a daily risk-on / risk-off score.', tickers: ['VIX', 'HYG', 'DXY'], color: C.red, stars: 172, remixes: 21 },
      { id: 'asia-us-handoff', title: 'Asia to US Handoff', creator: 'Harry Zzz', desc: 'Turns Asia and Europe market moves into a US premarket brief with ETF and futures context.', tickers: ['EFA', 'EEM', 'SPY'], color: C.orange, stars: 143, remixes: 18 },
    ]),
  },
  {
    id: 'community-short-squeeze-radar',
    label: 'Short Squeeze Radar',
    kol: true,
    creator: 'Float Hunter',
    description: 'Surfaces high short-interest names with rising borrow rates and tightening float dynamics.',
    tags: ['Short Interest', 'Borrow Rate', 'Float'],
    uses: '1.3k uses',
    updatedAt: '40m ago',
    prompts: ['Find R2K names with SI > 20% of float and borrow rate above 15%', 'Rank squeeze candidates by days-to-cover and recent retail flow'],
    playbooks: padTo6([
      { id: 'r2k-squeeze-radar', title: 'R2K Squeeze Radar', creator: 'Float Hunter', desc: 'Ranks Russell 2000 names by short-interest, borrow rate, and days-to-cover with retail-flow overlay.', tickers: ['IWM', 'R2K'], color: C.red, stars: 251, remixes: 33 },
    ]),
  },
  {
    id: 'community-etf-flow-tracker',
    label: 'ETF Flow Tracker',
    kol: true,
    creator: 'Flowmaster',
    description: 'Daily net creations and redemptions across sector, factor, and thematic ETFs with regime context.',
    tags: ['ETF Flow', 'Sector Rotation', 'Positioning'],
    uses: '2.1k uses',
    updatedAt: '2h ago',
    prompts: ['Show ETF flows by sector for the last 5 trading days', 'Map factor-ETF inflows to underlying single-name leadership'],
    playbooks: padTo6([
      { id: 'sector-etf-flow', title: 'Sector ETF Flow Board', creator: 'Flowmaster', desc: 'Daily net flows across XLK / XLF / XLE etc. with leadership scoring and breadth confirmation.', tickers: ['SPY', 'QQQ'], color: C.blue, stars: 188, remixes: 26 },
    ]),
  },
  {
    id: 'community-fx-carry-monitor',
    label: 'FX Carry Monitor',
    kol: true,
    creator: 'Carry Desk',
    description: 'Tracks G10 + EM carry baskets, vol-adjusted spreads, and rate-differential momentum.',
    tags: ['FX', 'Carry', 'Rate Diff'],
    uses: '640 uses',
    updatedAt: '4h ago',
    prompts: ['Rank G10 carry pairs by vol-adjusted yield', 'Build an EM carry basket excluding TRY / ARS with hedge rules'],
    playbooks: padTo6([
      { id: 'g10-carry-rank', title: 'G10 Carry Ranker', creator: 'Carry Desk', desc: 'Vol-adjusted carry score across G10 with rate-differential momentum and DXY regime overlay.', tickers: ['DXY'], color: C.orange, stars: 124, remixes: 16 },
    ]),
  },
  {
    id: 'community-credit-spread-watch',
    label: 'Credit Spread Watch',
    kol: true,
    creator: 'Spread Lab',
    description: 'IG and HY OAS, distress ratios, and CDX positioning rolled up daily with regime detection.',
    tags: ['Credit', 'OAS', 'CDX'],
    uses: '880 uses',
    updatedAt: '1d ago',
    prompts: ['Daily IG vs HY OAS snapshot with regime flag', 'Track CDX HY positioning and distress ratio for sub-IG'],
    playbooks: padTo6([
      { id: 'ig-hy-daily', title: 'IG vs HY Daily', creator: 'Spread Lab', desc: 'Daily OAS levels with z-score regime detection and distress-ratio overlay.', tickers: ['LQD', 'HYG'], color: C.deepBlue, stars: 159, remixes: 22 },
    ]),
  },
  {
    id: 'community-ai-capex-monitor',
    label: 'AI Capex Monitor',
    kol: true,
    creator: 'Hyperscaler Watch',
    description: 'Hyperscaler capex guidance, supplier read-through, and power-grid beneficiary mapping each quarter.',
    tags: ['AI Capex', 'Hyperscaler', 'Read-through'],
    uses: '3.8k uses',
    updatedAt: '6h ago',
    prompts: ['Track MSFT/AMZN/GOOGL/META capex guides and revisions', 'Map AI capex to power and cooling beneficiaries'],
    playbooks: padTo6([
      { id: 'hyperscaler-capex-roll', title: 'Hyperscaler Capex Roll-Up', creator: 'Hyperscaler Watch', desc: 'Quarterly capex guides for MSFT/AMZN/GOOGL/META mapped to AI infra winners with accel/decel flags.', tickers: ['MSFT', 'AMZN', 'GOOGL', 'META'], color: C.primary, stars: 471, remixes: 68 },
    ]),
  },
  {
    id: 'community-commodity-radar',
    label: 'Commodity Radar',
    kol: true,
    creator: 'Pit Boss',
    description: 'Oil, copper, gold, and ags pricing with inventory, futures curve, and positioning context.',
    tags: ['Commodities', 'Curve', 'Inventory'],
    uses: '730 uses',
    updatedAt: '1d ago',
    prompts: ['Daily WTI brief: inventory, curve shape, and producer hedging', 'Copper supply/demand monitor with Chinese demand overlay'],
    playbooks: padTo6([
      { id: 'wti-daily', title: 'WTI Daily Radar', creator: 'Pit Boss', desc: 'Inventory, futures curve, refinery margins, and producer hedging — daily.', tickers: ['CL'], color: C.orange, stars: 144, remixes: 19 },
    ]),
  },
  {
    id: 'community-bond-auction-tracker',
    label: 'Bond Auction Tracker',
    kol: true,
    creator: 'Auction Desk',
    description: 'Tracks Treasury auction tails, bid-to-cover, and primary-dealer takedown against rate moves.',
    tags: ['Rates', 'Auctions', 'Tail Risk'],
    uses: '410 uses',
    updatedAt: '2d ago',
    prompts: ['Latest 10Y / 30Y auction tails with rate impact', 'Primary dealer takedown trends across coupon auctions'],
    playbooks: padTo6([
      { id: 'auction-tail-tracker', title: 'Auction Tail Tracker', creator: 'Auction Desk', desc: 'Bid-to-cover, tail size, indirect bid, and post-auction rate move per Treasury auction.', tickers: ['TLT'], color: C.deepBlue, stars: 78, remixes: 9 },
    ]),
  },
  {
    id: 'community-earnings-revisions',
    label: 'Earnings Revisions Pulse',
    kol: true,
    creator: 'EPS Watcher',
    description: 'Daily upward and downward revision breadth across sectors with single-name standouts.',
    tags: ['Estimate Revisions', 'Breadth', 'Sectors'],
    uses: '1.5k uses',
    updatedAt: '3h ago',
    prompts: ['Daily revision breadth by sector', 'Top up/down NTM EPS revision names this week'],
    playbooks: padTo6([
      { id: 'revision-breadth', title: 'Revision Breadth Board', creator: 'EPS Watcher', desc: 'Sector-level upward / downward revision ratio with single-name standouts and price-action overlay.', tickers: ['SPX'], color: C.green, stars: 192, remixes: 27 },
    ]),
  },
  {
    id: 'community-ipo-radar',
    label: 'IPO Radar',
    kol: true,
    creator: 'Primary Desk',
    description: 'Tracks live and upcoming IPOs with comps, lockup expiries, and post-listing drift backtests.',
    tags: ['IPO', 'Lockup', 'Comps'],
    uses: '520 uses',
    updatedAt: '5h ago',
    prompts: ['Upcoming IPO pipeline with valuation comps', 'Backtest post-lockup drift for tech IPOs since 2020'],
    playbooks: padTo6([
      { id: 'ipo-pipeline', title: 'IPO Pipeline Dashboard', creator: 'Primary Desk', desc: 'Live pipeline with deal size, target valuation, comps table, and lockup-expiry calendar.', tickers: ['SPY'], color: C.blue, stars: 96, remixes: 12 },
    ]),
  },
  {
    id: 'community-buyback-tracker',
    label: 'Buyback Tracker',
    kol: true,
    creator: 'Repurchase Co',
    description: 'Monitors authorized vs executed buybacks, yield, and post-program drift across SPX names.',
    tags: ['Buybacks', 'Capital Return', 'Yield'],
    uses: '670 uses',
    updatedAt: '8h ago',
    prompts: ['Top buyback yield names this quarter', 'Track new authorizations and execution pace'],
    playbooks: padTo6([
      { id: 'buyback-yield-screen', title: 'Buyback Yield Screen', creator: 'Repurchase Co', desc: 'Ranks SPX names by trailing buyback yield, execution rate, and post-program drift.', tickers: ['SPX'], color: C.primary, stars: 121, remixes: 16 },
    ]),
  },
  {
    id: 'community-sentiment-pulse',
    label: 'Sentiment Pulse',
    kol: true,
    creator: 'Mood Ring',
    description: 'Crowd sentiment from X, Reddit, and Discord — scored, deduped, and tied to price action.',
    tags: ['Sentiment', 'Social', 'Retail Flow'],
    uses: '2.8k uses',
    updatedAt: '20m ago',
    prompts: ['Top 10 names by 24h sentiment delta', 'Track retail-driven sentiment vs short-interest setups'],
    playbooks: padTo6([
      { id: 'social-sentiment-board', title: 'Social Sentiment Board', creator: 'Mood Ring', desc: 'Multi-platform sentiment scoring with dedup and price-action linkage, refreshed every hour.', tickers: ['QQQ', 'SPY'], color: C.orange, stars: 318, remixes: 44 },
    ]),
  },
  {
    id: 'community-cn-policy-radar',
    label: 'China Policy Radar',
    kol: true,
    creator: 'Beijing Desk',
    description: 'Reads PBOC, MoF, NDRC, and CSRC releases — flags moves likely to reprice Chinese assets.',
    tags: ['China', 'Policy', 'Property'],
    uses: '590 uses',
    updatedAt: '6h ago',
    prompts: ['Weekly digest of PBOC operations and rate moves', 'Track property-stimulus measures and read-through to FXI / KWEB'],
    playbooks: padTo6([
      { id: 'pboc-weekly', title: 'PBOC Weekly Digest', creator: 'Beijing Desk', desc: 'PBOC OMO, MLF, RRR, and rate-corridor updates with FXI / KWEB / CNH read-through.', tickers: ['FXI', 'KWEB'], color: C.red, stars: 84, remixes: 10 },
    ]),
  },
  {
    id: 'community-japan-radar',
    label: 'Japan Macro Radar',
    kol: true,
    creator: 'Tokyo Tape',
    description: 'BOJ, JGB curve, JPY carry, and Topix flow watcher with English-language summaries.',
    tags: ['Japan', 'BOJ', 'Carry'],
    uses: '380 uses',
    updatedAt: '12h ago',
    prompts: ['BOJ statement parser — hawkish/dovish scoring', 'Topix sector rotation tied to JPY moves'],
    playbooks: padTo6([
      { id: 'boj-parser', title: 'BOJ Statement Parser', creator: 'Tokyo Tape', desc: 'Tokenizes BOJ statements, scores hawkishness vs prior, and maps to JGB and JPY reaction.', tickers: ['TOPIX 500'], color: C.deepBlue, stars: 62, remixes: 8 },
    ]),
  },
  {
    id: 'community-onchain-yield',
    label: 'On-Chain Yield Lab',
    kol: true,
    creator: 'DeFi Lab',
    description: 'Stablecoin and ETH yields across Aave, Compound, Pendle, and points programs with risk scoring.',
    tags: ['DeFi', 'Stablecoin', 'Yield'],
    uses: '1.0k uses',
    updatedAt: '4h ago',
    prompts: ['Compare stablecoin yields across Aave / Compound / Pendle', 'Build an ETH yield ladder with LST + restaking exposure'],
    playbooks: padTo6([
      { id: 'stablecoin-yield-rank', title: 'Stablecoin Yield Rank', creator: 'DeFi Lab', desc: 'Normalized yields across major venues with TVL, smart-contract age, and risk-tier scoring.', tickers: ['USDT', 'USDC'], color: C.green, stars: 137, remixes: 18 },
    ]),
  },
  {
    id: 'community-event-study',
    label: 'Event Study Builder',
    kol: true,
    creator: 'Event Lab',
    description: 'Spin up event-study windows around macro prints, earnings, or policy decisions in one click.',
    tags: ['Event Study', 'Drift', 'Backtest'],
    uses: '450 uses',
    updatedAt: '1d ago',
    prompts: ['Run an event study on SPX around CPI prints since 2018', 'Build a custom event window around FOMC for risk assets'],
    playbooks: padTo6([
      { id: 'cpi-event-study', title: 'CPI Event Study', creator: 'Event Lab', desc: 'Pre/post CPI windows for SPX, IWM, and TLT with surprise-bucketed conditional drifts.', tickers: ['SPY', 'IWM', 'TLT'], color: C.blue, stars: 71, remixes: 9 },
    ]),
  },
  {
    id: 'community-thematic-basket',
    label: 'Thematic Basket Builder',
    kol: true,
    creator: 'Theme Lab',
    description: 'Build, weight, and backtest custom thematic baskets — from robotics to GLP-1 to nuclear.',
    tags: ['Themes', 'Basket', 'Backtest'],
    uses: '1.7k uses',
    updatedAt: '7h ago',
    prompts: ['Build a humanoid-robotics basket with equal-weight and beta cap', 'Backtest a nuclear-renaissance basket with rebalancing rules'],
    playbooks: padTo6([
      { id: 'robotics-basket', title: 'Humanoid Robotics Basket', creator: 'Theme Lab', desc: 'Equal-weight basket of robotics names with monthly rebalance, beta cap, and risk parity weighting option.', tickers: ['NVDA', 'TSLA'], color: C.primary, stars: 226, remixes: 31 },
    ]),
  },
];

/* ========== Trending Playbooks — 常驻在首页底部 ========== */

export const TRENDING_PLAYBOOKS: NewChatPlaybook[] = [
  {
    id: 'trending-ai-capex',
    title: 'Hyperscaler Capex Tracker',
    creator: 'Macro Scope X',
    desc: 'Rolls up AMZN / MSFT / GOOGL / META capex guidance each quarter and maps dollar flows to AI infra beneficiaries. Flags accel / decel vs prior cycle.',
    tickers: ['MSFT', 'AMZN', 'GOOGL', 'META'],
    color: C.primary,
    stars: 489,
    remixes: 72,
  },
  {
    id: 'trending-gold-regime',
    title: 'Gold Regime Dashboard',
    creator: 'Sheer YLL YGG',
    desc: 'Real-yield, DXY, and central-bank buying regime overlay for gold. Surfaces regime shifts with confidence scoring and positioning suggestions.',
    tickers: ['GLD', 'GDX', 'DXY'],
    color: C.orange,
    stars: 342,
    remixes: 51,
  },
  {
    id: 'trending-eth-l2',
    title: 'ETH L2 Market Share',
    creator: 'YGGYLL',
    desc: 'Live TVL, daily txn, and fee capture across Base / Arbitrum / Optimism / zkSync. Tracks share migration and revenue accrual back to ETH mainnet.',
    tickers: ['ETH', 'ARB', 'OP'],
    color: C.deepBlue,
    stars: 276,
    remixes: 44,
  },
  {
    id: 'trending-dividend-alpha',
    title: 'Dividend Aristocrat Alpha',
    creator: 'Smart Jing',
    desc: 'Ranks 65 dividend aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly with FCF screen.',
    tickers: ['SPX', 'NOBL'],
    color: C.green,
    stars: 231,
    remixes: 38,
  },
  {
    id: 'trending-fomc-playbook',
    title: 'FOMC Day Playbook',
    creator: 'Harry Zzz',
    desc: 'Intraday vol + rate-path positioning around every FOMC. Tracks dot-plot surprise, SEP revisions, and auto-maps post-meeting sector rotation.',
    tickers: ['SPY', 'TLT', 'VIX'],
    color: C.red,
    stars: 198,
    remixes: 29,
  },
  {
    id: 'trending-pair-trade',
    title: 'Pair-Trade Radar',
    creator: 'Alva Intern',
    desc: 'Scans SPX + NDX pairs for 2σ spread dislocations with cointegration filter. Generates long/short candidates with entry/exit and sizing rules.',
    tickers: ['KO', 'PEP', 'V', 'MA'],
    color: C.blue,
    stars: 164,
    remixes: 23,
  },
];
