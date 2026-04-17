/**
 * [INPUT]: 用户当前输入文本
 * [OUTPUT]: 3 条 mock 的"LLM 风格"预测 prompt
 * [POS]: NewChat 页面的输入预测数据源
 *
 * 关键词匹配表优先；不匹配时退回到通用 Track / Build / Compare 三模板，
 * 保证任意输入都能产出看似合理的 3 条建议。
 */

interface KeywordGroup {
  keys: string[];       // 关键词（小写、子串匹配）
  prompts: string[];    // 3 条 tailored prompt
}

const GROUPS: KeywordGroup[] = [
  {
    keys: ['btc', 'bitcoin'],
    prompts: [
      'Track BTC momentum and alert me on 1h breakouts above 3% gains',
      'Build a BTC DCA playbook with weekly rebalancing and a 20% max drawdown stop',
      'Correlate BTC with NASDAQ tech names and flag regime shifts in real time',
    ],
  },
  {
    keys: ['eth', 'ethereum'],
    prompts: [
      'Set up an ETH staking-yield tracker with alerts on gas-fee spikes',
      'Build an ETH/BTC ratio rotation playbook with RSI confirmation',
      'Monitor ETH Layer-2 TVL shifts and flag capital rotation signals',
    ],
  },
  {
    keys: ['sol', 'solana'],
    prompts: [
      'Track SOL DEX volume vs ETH and surface dApp rotation signals',
      'Build a SOL/ETH pair-trade triggered by volume divergence',
      'Monitor SOL validator health and alert on decentralization risk',
    ],
  },
  {
    keys: ['nvda', 'nvidia'],
    prompts: [
      'Deep-dive NVDA — revenue segmentation, peer valuation, and supply-chain exposure',
      'Build an NVDA earnings run-up playbook with an options overlay',
      'Track NVDA vs AMD/AVGO relative strength with daily alerts',
    ],
  },
  {
    keys: ['tsla', 'tesla'],
    prompts: [
      'Track TSLA delivery numbers vs consensus and alert on misses',
      'Build a TSLA vs BYD pair-trade with weekly rebalancing',
      'Correlate TSLA price with China EV sentiment and surface leading indicators',
    ],
  },
  {
    keys: ['ai', 'artificial intelligence'],
    prompts: [
      'Surface the top 5 AI infrastructure plays by 90-day momentum',
      'Build an AI-sector rotation basket rebalanced monthly',
      'Compare AI beneficiaries vs software incumbents and flag divergences',
    ],
  },
  {
    keys: ['macro', 'fed', 'cpi', 'rates'],
    prompts: [
      'Daily macro brief — US rates, DXY, oil, credit spreads with LLM commentary',
      'Build a recession-risk dashboard with 5 leading indicators',
      'Set up Fed-cut scenario alerts when CPI surprises move odds >5%',
    ],
  },
  {
    keys: ['earnings'],
    prompts: [
      'Build an earnings whisper tracker for the next 2 weeks',
      'Post-earnings drift playbook — long beaters, short missers on a 3-day hold',
      'Compare implied vs realized moves across MAG7 earnings',
    ],
  },
  {
    keys: ['options', 'iv'],
    prompts: [
      'Scan for unusual options volume in mega-cap tech and alert on sweeps',
      'Build an IV-crush playbook for post-earnings plays',
      'Track 0DTE flow on SPX and surface directional bias shifts',
    ],
  },
  {
    keys: ['dividend', 'income'],
    prompts: [
      'Build a dividend-growth screen with 10+ years of growth and sub-60% payout ratio',
      'Track dividend ex-dates across my watchlist and alert 5 days ahead',
      'Compare dividend-yield baskets vs treasury yield and flag regime shifts',
    ],
  },

  /* ========== 意图引导模式（放在主题词之后，让具体主题优先命中） ========== */
  {
    keys: ['what is', "what's"],
    prompts: [
      "What is the implied-volatility curve telling us about NVDA this week?",
      'What is the best way to hedge a long BTC position right now?',
      'What is the Sharpe ratio of my current portfolio over 90 days?',
    ],
  },
  {
    keys: ['how to', 'how do i', 'how do'],
    prompts: [
      'How to build a momentum playbook with drawdown caps',
      'How to hedge my equity portfolio against a Fed surprise',
      'How to spot unusual options flow in real time',
    ],
  },
  {
    keys: ['find', 'show me', 'show'],
    prompts: [
      'Find playbooks with >20% annualized return and <10% drawdown',
      'Show me undervalued tech names with rising earnings estimates',
      'Find the top yield opportunities in stablecoins right now',
    ],
  },
  {
    keys: ['compare', 'vs', 'versus'],
    prompts: [
      'Compare NVDA and AMD across growth, margins, and valuation',
      'Compare my portfolio vs the S&P 500 over the last 90 days',
      'Compare BTC and ETH risk-adjusted returns year-to-date',
    ],
  },
  {
    keys: ['why'],
    prompts: [
      'Why is BTC underperforming NASDAQ this month?',
      'Why are semis volatile heading into earnings?',
      "Why did my portfolio drop on Friday's close?",
    ],
  },
  {
    keys: ['summarize', 'summary', 'tl;dr'],
    prompts: [
      "Summarize this week's Fed speakers and market reactions",
      'Summarize my recent trades and flag any discipline slips',
      'Summarize the latest AI-sector earnings ranked by relevance',
    ],
  },
  {
    keys: ['explain'],
    prompts: [
      "Explain what's driving the 10-year yield higher today",
      'Explain the divergence between SPX and credit spreads',
      'Explain the risk profile of my current top holding',
    ],
  },
];

const MIN_KEYWORD_LEN = 2;

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function wordBoundaryMatch(text: string, key: string): boolean {
  const pattern = `\\b${escapeRegExp(key).replace(/\s+/g, '\\s+')}\\b`;
  return new RegExp(pattern, 'i').test(text);
}

/**
 * 根据 text 生成 3 条建议。
 * - 输入过短（<2）或过长（>60）→ 返回空
 * - 超过 4 个词 → 视为用户在组句，不打扰
 * - 命中关键词表 → tailored prompts
 * - 未命中 → 不展示（不做通用兜底，避免拼接出奇怪句子）
 */
export function generateTypedSuggestions(raw: string): string[] {
  const text = raw.trim();
  if (text.length < MIN_KEYWORD_LEN) return [];
  if (text.length > 60) return [];
  if (text.split(/\s+/).length > 5) return [];

  for (const group of GROUPS) {
    if (group.keys.some((k) => wordBoundaryMatch(text, k))) {
      return group.prompts;
    }
  }

  return [];
}
