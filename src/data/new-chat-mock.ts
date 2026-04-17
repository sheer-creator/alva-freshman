/**
 * [INPUT]: CHART_COLORS from @/lib/chart-theme
 * [OUTPUT]: NewChat 页面的 template / prompts / playbooks mock 数据
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
  icon?: string;            // CdnIcon 名称
  prompts: string[];        // 3-5 条
  playbooks: NewChatPlaybook[];  // 3-6 条
}

/* ========== 一级 templates ========== */

export const PRIMARY_TEMPLATES: NewChatTemplate[] = [
  {
    id: 'theme-tracker',
    label: 'Theme Tracker',
    icon: 'star-l',
    prompts: [
      'Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names',
      'Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts',
      'Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators',
      'Create an Indian consumer-tech theme tracker driven by earnings + news sentiment',
    ],
    playbooks: [
      {
        id: 'ai-infra-theme',
        title: 'AI Infra Theme Radar',
        creator: 'Alva Intern',
        desc: 'Tracks NVDA / AVGO / TSM + power grid enablers. Surfaces weekly sentiment + rev-beat signals and rebalances exposure to the strongest relative performers.',
        tickers: ['NVDA', 'AVGO', 'TSM', 'VST'],
        color: C.primary,
        stars: 312,
        remixes: 48,
      },
      {
        id: 'glp1-theme',
        title: 'GLP-1 Obesity Complex',
        creator: 'Harry Zzz',
        desc: 'Unified theme tracker for the GLP-1 beneficiaries and losers — LLY / NVO as winners, food/restaurant shorts as laggards. Weekly sentiment scoring.',
        tickers: ['LLY', 'NVO', 'AMGN'],
        color: C.orange,
        stars: 186,
        remixes: 22,
      },
      {
        id: 'nuclear-theme',
        title: 'Nuclear Renaissance Monitor',
        creator: 'Macro Scope X',
        desc: 'Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.',
        tickers: ['CCJ', 'SMR', 'VST', 'CEG'],
        color: C.deepBlue,
        stars: 94,
        remixes: 12,
      },
    ],
  },
  {
    id: 'smart-screener',
    label: 'Smart Screener',
    icon: 'researcher-l1',
    prompts: [
      'Screen for US large-caps with rising earnings estimates and positive 20-day price momentum',
      'Find cash-rich small-caps trading below 10x forward earnings with expanding gross margins',
      'Screen crypto majors for >30% 30-day return and accelerating on-chain active addresses',
      'Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio',
    ],
    playbooks: [
      {
        id: 'momentum-quality',
        title: 'Momentum × Quality Screen',
        creator: 'Smart Jing',
        desc: 'Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, rebalances weekly with 2% stop-loss band.',
        tickers: ['SPX', 'QQQ'],
        color: C.green,
        stars: 241,
        remixes: 37,
      },
      {
        id: 'cheap-cashcow',
        title: 'Cheap Cash Cow Screener',
        creator: 'Alva Intern',
        desc: 'Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.',
        tickers: ['R2K'],
        color: C.blue,
        stars: 128,
        remixes: 19,
      },
      {
        id: 'crypto-breakout',
        title: 'Crypto Breakout Screen',
        creator: 'YGGYLL',
        desc: 'Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for further review.',
        tickers: ['BTC', 'ETH', 'SOL', 'AVAX'],
        color: C.red,
        stars: 76,
        remixes: 9,
      },
    ],
  },
  {
    id: 'deep-dive',
    label: 'Deep Dive',
    icon: 'full-screen-l',
    prompts: [
      'Give me a deep-dive on NVDA — revenue segmentation, peer valuation, supply chain, and bull/bear thesis',
      'Deep-dive TSMC: capacity, customer mix, geopolitical risk, and long-term margin trajectory',
      'Full research on Solana: ecosystem activity, token economics, validator health, and competition vs ETH L2s',
      'Deep-dive Hermès: brand moat, channel mix, pricing power, and succession risk',
    ],
    playbooks: [
      {
        id: 'nvda-deepdive',
        title: 'NVDA 360° Deep Dive',
        creator: 'Sheer YLL YGG',
        desc: 'End-to-end NVDA research — revenue segmentation, hyperscaler capex correlation, peer valuation vs AVGO/AMD, and scenario-based price targets.',
        tickers: ['NVDA', 'AMD', 'AVGO'],
        color: C.primary,
        stars: 412,
        remixes: 58,
      },
      {
        id: 'tsmc-deepdive',
        title: 'TSMC Long Thesis',
        creator: 'Macro Scope X',
        desc: 'Capacity roadmap, customer concentration, Arizona + Kumamoto fab ramps, geopolitical risk weighting, and 5Y margin path.',
        tickers: ['TSM', '2330.TW'],
        color: C.deepBlue,
        stars: 163,
        remixes: 21,
      },
      {
        id: 'sol-deepdive',
        title: 'SOL Ecosystem Deep Dive',
        creator: 'Harry Zzz',
        desc: 'DEX volume, Firedancer progress, validator decentralization, revenue accrual, and valuation vs ETH + L2 peers.',
        tickers: ['SOL'],
        color: C.orange,
        stars: 87,
        remixes: 13,
      },
    ],
  },
  {
    id: 'what-if',
    label: 'What If',
    icon: 'remix-l',
    prompts: [
      'What if the Fed delivers 3 more cuts in 2026 — how should a balanced 60/40 portfolio reposition?',
      'What if NVDA earnings miss consensus by 5% next quarter — which AI beneficiaries still outperform?',
      'What if BTC breaks below 80k — historical drawdown analogs and position sizing playbook',
      'What if oil spikes to $120 on Middle East tension — sector rotation map and hedges',
    ],
    playbooks: [
      {
        id: 'fed-cuts-scenario',
        title: 'Fed-Cut Scenario Rebalancer',
        creator: 'Smart Jing',
        desc: 'Monte Carlo on 60/40 under 3 Fed cut paths (dovish / base / hawkish). Suggests duration + small-cap tilt adjustments each FOMC.',
        tickers: ['AGG', 'IWM', 'SPY'],
        color: C.blue,
        stars: 154,
        remixes: 25,
      },
      {
        id: 'nvda-miss-scenario',
        title: 'NVDA Miss Shockwave',
        creator: 'Alva Intern',
        desc: 'What-if engine for AI peer reaction to a 5% NVDA revenue miss. Ranks relative drawdowns and identifies resilient derivatives plays.',
        tickers: ['NVDA', 'AVGO', 'AMD', 'MU'],
        color: C.red,
        stars: 98,
        remixes: 14,
      },
      {
        id: 'oil-spike-scenario',
        title: 'Oil Spike Hedge Map',
        creator: 'Macro Scope X',
        desc: 'Maps SPX sector responses to a $120 oil scenario and proposes airline / transport hedges sized to portfolio oil-beta.',
        tickers: ['XOM', 'CVX', 'DAL', 'FDX'],
        color: C.orange,
        stars: 71,
        remixes: 9,
      },
    ],
  },
];

/* ========== Others 展开后的二级 templates ========== */

export const OTHERS_TEMPLATES: NewChatTemplate[] = [
  {
    id: 'backtest',
    label: 'Backtest',
    icon: 'history-l',
    prompts: [
      'Backtest a monthly-rebalanced equal-weight MAG7 basket over the last 10 years',
      'Backtest a BTC/ETH 70/30 portfolio rebalanced weekly with 15% max drawdown stop',
      'Backtest buying TSM on days where NVDA gains >3%, exit on +10% TP or -5% SL',
    ],
    playbooks: [
      {
        id: 'mag7-equal',
        title: 'MAG7 Equal-Weight',
        creator: 'Harry Zzz',
        desc: 'Maintains a fully invested equal-weight MAG7 portfolio, rebalanced monthly. Tracks alpha vs SPX and records decomposition.',
        tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'],
        color: C.blue,
        stars: 89,
        remixes: 14,
      },
      {
        id: 'nvda-tsm-bt',
        title: 'NVDA +3% → TSM Entry',
        creator: 'Smart Jing',
        desc: 'Trigger-based backtest — buy TSM at close when NVDA gains >3%, exit on +10% TP or -5% SL. Full historical P&L attribution.',
        tickers: ['NVDA', 'TSM'],
        color: C.red,
        stars: 48,
        remixes: 7,
      },
      {
        id: 'btc-macd-bt',
        title: 'BTC MACD 1h Crossover',
        creator: 'Macro Scope X',
        desc: 'Backtests BTC MACD(12,26,9) crossover on 1h candles. Reports Sharpe, max DD, and sensitivity to parameter sweeps.',
        tickers: ['BTC'],
        color: C.deepBlue,
        stars: 34,
        remixes: 5,
      },
    ],
  },
  {
    id: 'valuation',
    label: 'Valuation',
    icon: 'credit-l',
    prompts: [
      'Build a reverse-DCF for MSFT implied by the current share price and compare to peers',
      'Relative valuation snapshot for the Mag7 — EV/Sales, P/E, and FCF yield vs 5Y median',
      'SOTP valuation for Amazon — AWS / Retail / Ads / Prime / Logistics',
    ],
    playbooks: [
      {
        id: 'mag7-relval',
        title: 'MAG7 Relative Valuation',
        creator: 'Alva Intern',
        desc: 'Live EV/Sales, P/E NTM, and FCF yield table for MAG7 with z-score vs 5-year median. Highlights outliers automatically.',
        tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'],
        color: C.primary,
        stars: 142,
        remixes: 23,
      },
      {
        id: 'amzn-sotp',
        title: 'AMZN SOTP',
        creator: 'Sheer YLL YGG',
        desc: 'Sum-of-the-parts on Amazon — AWS, Retail, Ads, Prime, Logistics. Adjustable multiples per segment and scenario toggles.',
        tickers: ['AMZN'],
        color: C.orange,
        stars: 96,
        remixes: 11,
      },
    ],
  },
  {
    id: 'macro-brief',
    label: 'Macro Brief',
    icon: 'language-l',
    prompts: [
      'Daily macro brief covering US rates, DXY, oil, and credit spreads with LLM commentary',
      'Weekly China macro digest — credit impulse, property indicators, and policy shifts',
      'Morning global risk dashboard for Asia → Europe → US cross-asset flows',
    ],
    playbooks: [
      {
        id: 'daily-macro',
        title: 'Daily Macro Brief',
        creator: 'Macro Scope X',
        desc: 'Auto-generated macro snapshot every US open — rates, DXY, oil, credit spreads, and LLM-authored summary of overnight drivers.',
        tickers: ['DXY', 'CL', 'HYG'],
        color: C.deepBlue,
        stars: 211,
        remixes: 34,
      },
      {
        id: 'china-weekly',
        title: 'China Macro Weekly',
        creator: 'Harry Zzz',
        desc: 'Weekly China credit impulse, property sales, and policy-move tracker. Flags deviations from trend and dispatches alerts.',
        tickers: ['FXI', 'KWEB'],
        color: C.red,
        stars: 58,
        remixes: 6,
      },
    ],
  },
  {
    id: 'earnings',
    label: 'Earnings',
    icon: 'researcher-l1',
    prompts: [
      'Summarize the latest NVDA earnings call and compare guidance to consensus',
      'Whisper numbers + post-earnings drift scanner for next week\u2019s MAG7 reports',
      'Aggregate semis earnings read-across from TSM → ASML → Applied Materials → NVDA',
    ],
    playbooks: [
      {
        id: 'earnings-whisper',
        title: 'Earnings Whisper Board',
        creator: 'Smart Jing',
        desc: 'Crowdsourced + LLM whisper numbers + post-earnings drift tracker. Ranks names by whisper-vs-consensus gap for upcoming reports.',
        tickers: ['AAPL', 'MSFT', 'NVDA', 'META'],
        color: C.primary,
        stars: 182,
        remixes: 27,
      },
      {
        id: 'semis-readacross',
        title: 'Semis Read-Across',
        creator: 'Alva Intern',
        desc: 'Chain earnings read-across TSM → ASML → AMAT → NVDA. Quantifies lead-lag signal on each node of the supply chain.',
        tickers: ['TSM', 'ASML', 'AMAT', 'NVDA'],
        color: C.orange,
        stars: 74,
        remixes: 10,
      },
    ],
  },
  {
    id: 'news',
    label: 'News',
    icon: 'chat-l1',
    prompts: [
      'Summarize the last 24h of news on Bitcoin and flag anything that moved price >2%',
      'Daily AI-industry news digest with sentiment scoring across Twitter / Reddit / press',
      'Track US political + tariff headlines and their impact on semis and autos',
    ],
    playbooks: [
      {
        id: 'btc-news',
        title: 'BTC News Pulse',
        creator: 'YGGYLL',
        desc: '24h news aggregator for BTC with sentiment scoring, price-correlation tagging, and auto-flagging of likely movers.',
        tickers: ['BTC'],
        color: C.primary,
        stars: 64,
        remixes: 8,
      },
      {
        id: 'ai-news',
        title: 'AI Industry Digest',
        creator: 'Harry Zzz',
        desc: 'Daily digest of AI news from mainstream + community sources. LLM-authored summary sorted by market relevance.',
        tickers: ['NVDA', 'MSFT', 'GOOGL', 'META'],
        color: C.blue,
        stars: 118,
        remixes: 17,
      },
    ],
  },
];
