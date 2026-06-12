/**
 * [INPUT]: types.ts 的 Skill/SkillKind/Tone
 * [OUTPUT]: SKILLS（SkillHub 主技能showcase）、PROMPTS（建议 prompt）、KIND_META
 * [POS]: agent-channel 数据层 — Chat tab 的技能与 prompt 数据（源自 demo planc 1164-1391/1942-1945 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Skill, SkillKind, Tone } from './types';

/* ========== 主技能（来自真实 new-chat 数据的精选 showcase） ========== */

export const SKILLS: Skill[] = [
  { id: 'theme-tracker', label: 'Theme Tracker', icon: 'bulb', tone: 'teal', creator: 'Alva', kind: 'playbook',
    blurb: 'Build a live tracker for any market theme — sentiment, earnings, and policy catalysts across the basket, weekly.',
    prompt: 'Build a theme tracker for AI infrastructure — NVDA, AVGO, TSM, and power-grid names',
    prompts: [
      'Build a theme tracker for AI infrastructure — NVDA, AVGO, TSM, and power-grid names',
      'Track the GLP-1 / obesity theme — LLY, NVO, and the supply chain around them',
      'Set up a tracker for the power & grid buildout — VRT, GEV, ETN',
    ],
    gallery: [
      { t: 'AI Infrastructure', s: '14 names · weekly refresh', tone: 'teal', points: [10, 22, 18, 34, 30, 48, 60], tickers: ['NVDA', 'AVGO', 'TSM'], stat: 'Basket +18% YTD' },
      { t: 'GLP-1 / Obesity', s: '9 names · weekly refresh', tone: 'blue', points: [14, 20, 30, 26, 40, 38, 52], tickers: ['LLY', 'NVO'], stat: 'Basket +24% YTD' },
      { t: 'Power & Grid Buildout', s: '11 names · weekly refresh', tone: 'orange', points: [8, 16, 22, 30, 28, 42, 50], tickers: ['VRT', 'GEV', 'ETN'], stat: 'Basket +12% YTD' },
    ],
    subs: [
      { t: 'Hyperscaler Capex Tracker', creator: 'Macro Scope X', subscribers: '489', tone: 'teal', points: [10, 22, 18, 34, 30, 48, 60], meta: 'Weekly · 14 names', stat: '+18% YTD' },
      { t: 'Power & Grid Buildout', creator: 'Sheer YLL', subscribers: '231', tone: 'orange', points: [8, 16, 22, 30, 28, 42, 50], meta: 'Weekly · 11 names', stat: '+12% YTD' },
    ],
    previews: [
      { t: 'Hyperscaler Capex Tracker', creator: 'Macro Scope X', subscribers: '489', tone: 'teal', cadence: 'weekly', meta: 'Weekly · 14 names',
        chart: { label: 'Basket performance · YTD', value: '+18.4%', points: [8, 12, 10, 16, 22, 19, 26, 30, 28, 34, 40, 38, 46, 52, 49, 60] },
        rows: [
          { t: 'NVDA', v: '$184.20', c: '+4.2%', up: true },
          { t: 'AVGO', v: '$268.90', c: '+2.1%', up: true },
          { t: 'TSM', v: '$201.40', c: '−0.8%', up: false },
        ],
        stats: [['Names', '14'], ['Sentiment', 'Bullish'], ['Next catalyst', 'NVDA ER']] },
      { t: 'Power & Grid Buildout', creator: 'Sheer YLL', subscribers: '231', tone: 'orange', cadence: 'weekly', meta: 'Weekly · 11 names',
        chart: { label: 'Basket performance · YTD', value: '+12.2%', points: [10, 14, 12, 18, 16, 22, 20, 26, 30, 27, 33, 38, 35, 42, 40, 47] },
        rows: [
          { t: 'VRT', v: '$112.40', c: '+3.1%', up: true },
          { t: 'GEV', v: '$342.10', c: '+1.8%', up: true },
          { t: 'ETN', v: '$338.25', c: '−0.4%', up: false },
        ],
        stats: [['Names', '11'], ['Sentiment', 'Constructive'], ['Next catalyst', 'GEV ER']] },
    ] },
  { id: 'smart-screener', label: 'Smart Screener', icon: 'screener', tone: 'teal', creator: 'Alva', kind: 'automation',
    blurb: 'Rank stocks by any factor combination, refreshed daily.',
    prompt: 'Screen US large-caps with rising earnings estimates and positive 20-day momentum, alert me on new entrants',
    prompts: [
      'Screen US large-caps with rising earnings estimates and positive 20-day momentum, alert me on new entrants',
      'Find quality names down 20%+ from highs with ROE above 20% and net cash',
      'Screen for stocks where 3+ insiders bought within the last two weeks',
    ],
    gallery: [
      { t: 'Rising-estimate momentum', rule: 'Top-decile EPS revisions + positive 20d momentum', every: 'Daily · 16:05 ET', sample: '3 new today — ANET, VRT, CRDO' },
      { t: 'Oversold quality', rule: 'ROE > 20% + RSI < 30 + net cash', every: 'Daily · pre-open', sample: '5 matches — including NKE, EL' },
      { t: 'Insider-buying cluster', rule: '≥3 insiders buying within 10 days', every: 'Weekly · Monday', sample: '2 matches — OXY, PARA' },
    ],
    subs: [
      { t: 'AI-Capex-Monitor', creator: 'Alva', subscribers: '1.2k', every: 'Daily · 16:05 ET', desc: 'Alerts on hyperscaler capex revisions and AI-infra beneficiaries' },
      { t: 'Insider-Cluster Alert', creator: 'q_research', subscribers: '540', every: 'Weekly · Monday', desc: '≥3 insiders buying the same name within 10 days' },
    ],
    previews: [
      { t: 'AI-Capex-Monitor', creator: 'Alva', subscribers: '1.2k', tone: 'amber', cadence: 'daily', every: 'Daily · 16:05 ET',
        rule: 'Top-decile capex revisions + positive AI-infra read-through',
        lastRun: 'Triggered 14m ago',
        matches: [
          { t: 'ANET', note: 'Capex guide +18% — networking pull-through', tag: 'New' },
          { t: 'VRT', note: 'Backlog +31% YoY, raised FY guide', tag: 'New' },
          { t: 'CRDO', note: 'AEC design wins at two hyperscalers', tag: 'Watch' },
        ],
        push: '3 new matches today — ANET, VRT, CRDO' },
      { t: 'Insider-Cluster Alert', creator: 'q_research', subscribers: '540', tone: 'amber', cadence: 'weekly', every: 'Weekly · Monday',
        rule: '≥3 insiders buying the same name within 10 days',
        lastRun: 'Triggered 2d ago',
        matches: [
          { t: 'OXY', note: 'CEO + two directors bought $4.1M total', tag: 'New' },
          { t: 'PARA', note: 'Three insiders added near 52-week lows', tag: 'New' },
          { t: 'KSS', note: 'CFO cluster buy after the guidance cut', tag: 'Watch' },
        ],
        push: '2 new matches this week — OXY, PARA' },
    ] },
  { id: 'deep-dive', label: 'Deep Dive', icon: 'search', tone: 'blue', creator: 'Alva', kind: 'playbook',
    blurb: 'A complete research package on any ticker — kept alive: the thesis re-checks itself on every filing and print.',
    prompt: 'Deep-dive NVDA: revenue segmentation, peer valuation, supply chain, bull/bear thesis',
    prompts: [
      'Deep-dive NVDA: revenue segmentation, peer valuation, supply chain, bull/bear thesis',
      'Deep-dive TSM: node roadmap, pricing power, and the CoWoS bottleneck',
      'Deep-dive AVGO: networking growth, VMware integration, custom-ASIC pipeline',
    ],
    gallery: [
      { t: 'NVDA · Living Deep Dive', s: 'Re-checked on filings & prints', tone: 'blue', points: [12, 20, 16, 28, 34, 30, 44], tickers: ['NVDA'], stat: 'DC 78% of rev · +154% YoY' },
      { t: 'TSM · Node & CoWoS', s: 'Monthly sales + capacity reads', tone: 'teal', points: [16, 14, 22, 26, 24, 32, 38], tickers: ['TSM'], stat: '3nm at 25% of revenue' },
      { t: 'AVGO · AI Attach', s: 'Networking + custom ASIC', tone: 'orange', points: [10, 18, 24, 20, 30, 36, 42], tickers: ['AVGO'], stat: 'Networking +43% YoY' },
    ],
    subs: [
      { t: 'NVDA Living Deep Dive', creator: 'Alva', subscribers: '824', tone: 'blue', points: [12, 20, 16, 28, 34, 30, 44], meta: 'Refreshes on filings', stat: '34× NTM' },
      { t: 'TSM Node & CoWoS Watch', creator: 'Chip Insider', subscribers: '412', tone: 'teal', points: [16, 14, 22, 26, 24, 32, 38], meta: 'Monthly re-read', stat: 'Pricing intact' },
    ],
    previews: [
      { t: 'NVDA Living Deep Dive', creator: 'Alva', subscribers: '824', tone: 'blue', cadence: 'quarterly', meta: 'Refreshes on filings & prints',
        chart: { label: 'Data-center share of revenue', value: '78%', points: [22, 26, 30, 36, 42, 50, 58, 66, 70, 74, 76, 78] },
        rows: [
          { t: 'NTM P/E', v: '34×', c: 'vs AMD 28×', up: true },
          { t: 'DC revenue', v: '+154%', c: 'YoY', up: true },
          { t: 'CoWoS', v: 'Tight', c: 'supply gate', up: false },
        ],
        stats: [['Thesis', 'Constructive'], ['Key risk', 'Supply gate'], ['Next catalyst', 'ER May 22']] },
      { t: 'TSM Node & CoWoS Watch', creator: 'Chip Insider', subscribers: '412', tone: 'teal', cadence: 'monthly', meta: 'Monthly sales + capacity reads',
        chart: { label: '3nm share of revenue', value: '25%', points: [4, 6, 9, 12, 15, 17, 20, 22, 23, 24, 25, 25] },
        rows: [
          { t: '3nm mix', v: '25%', c: '+9pp YoY', up: true },
          { t: 'CoWoS', v: '2× by 2025', c: 'expanding', up: true },
          { t: 'Wafer price', v: '+3–5%', c: '2025 hikes', up: true },
        ],
        stats: [['Quality', 'Top of supply'], ['Key risk', 'Geopolitics'], ['Next catalyst', 'Monthly sales']] },
    ] },
  { id: 'what-if', label: 'What If', icon: 'remix', tone: 'blue', creator: 'Alva', kind: 'automation',
    blurb: 'Scenario monitors for your book — it reprices the moment a watched shock fires.',
    prompt: 'What if NVDA falls 15% on an earnings miss — how does my book reprice?',
    prompts: [
      'What if NVDA falls 15% on an earnings miss — how does my book reprice?',
      'What if the Fed cuts 50bp next meeting — which of my names benefit most?',
      'What if the dollar spikes 5% — where is my book most exposed?',
    ],
    gallery: [
      { t: 'NVDA earnings shock', rule: 'Reprice the book on a ±10% NVDA move', every: 'Event-driven', sample: '−15% miss → book −3.4%' },
      { t: 'Fed surprise', rule: 'Reprice on a 50bp out-of-consensus move', every: 'FOMC days', sample: '50bp cut → book +2.1%' },
      { t: 'Dollar spike', rule: 'Alert when DXY moves +3% in 5 sessions', every: 'Daily · close', sample: 'USD +5% → book −1.7%' },
    ],
    subs: [
      { t: 'Book-Shock-Monitor', creator: 'Alva', subscribers: '731', every: 'Event-driven', desc: 'Reprices your exposure the moment a watched scenario fires' },
      { t: 'Macro-Surprise-Alert', creator: 'Macro Scope X', subscribers: '389', every: 'CPI / FOMC / NFP', desc: 'Out-of-consensus prints, mapped to your book’s exposure' },
    ],
    previews: [
      { t: 'Book-Shock-Monitor', creator: 'Alva', subscribers: '731', tone: 'amber', cadence: 'event-driven', every: 'Event-driven',
        rule: 'Reprice the book when a watched scenario moves beyond 1σ',
        lastRun: 'Triggered 2h ago',
        matches: [
          { t: 'NVDA −15%', note: 'Direct −1.9%; with AVGO / TSM drift −3.4% total', tag: 'New' },
          { t: 'USD +5%', note: 'EM sleeve −9%, exporters −3% — book −1.7%', tag: 'Watch' },
          { t: 'Fed −50bp', note: 'Duration +6%, banks −2% — book +2.1%', tag: 'Watch' },
        ],
        push: 'NVDA scenario fired — your book reprices −3.4%' },
      { t: 'Macro-Surprise-Alert', creator: 'Macro Scope X', subscribers: '389', tone: 'amber', cadence: 'on releases', every: 'CPI / FOMC / NFP days',
        rule: 'Alert when a print lands 2σ from consensus, with your book exposure attached',
        lastRun: 'Triggered Tue · CPI',
        matches: [
          { t: 'CPI 3.6%', note: 'Hot vs 3.3% consensus — duration names exposed', tag: 'New' },
          { t: 'NFP +310k', note: 'Strong print — rate-cut odds repriced', tag: 'Watch' },
          { t: 'PCE in-line', note: 'No book action needed', tag: 'Quiet' },
        ],
        push: 'CPI hot — duration sleeve is your exposure' },
    ] },
  { id: 'backtest', label: 'Backtest', icon: 'history', tone: 'teal', creator: 'Alva', kind: 'playbook',
    blurb: 'Rule-based strategies, fully attributed.',
    prompt: 'Backtest a monthly equal-weight MAG7 basket over the last 10 years',
    prompts: [
      'Backtest a monthly equal-weight MAG7 basket over the last 10 years',
      'Backtest dividend aristocrats with annual rebalancing against the S&P',
      'Backtest a BTC MACD crossover strategy on 1-hour bars over 5 years',
    ],
    gallery: [
      { t: 'MAG7 equal-weight', s: '10Y · monthly rebalance', tone: 'green', points: [12, 18, 26, 22, 34, 44, 58], tickers: ['MAG7', 'SPX'], stat: '+24.1% CAGR · Sharpe 1.32' },
      { t: 'Dividend aristocrats', s: '10Y · annual rebalance', tone: 'teal', points: [20, 24, 22, 30, 28, 36, 40], tickers: ['NOBL'], stat: '+11.3% CAGR · DD −18%' },
      { t: 'BTC MACD crossover', s: '5Y · 1h signals', tone: 'orange', points: [30, 18, 40, 26, 48, 34, 56], tickers: ['BTC'], stat: 'Sharpe 0.9 · 61% win' },
    ],
    subs: [
      { t: 'MAG7 Momentum Engine', creator: 'q_research', subscribers: '356', tone: 'green', points: [12, 18, 26, 22, 34, 44, 58], meta: 'Monthly rebalance', stat: '+24.1% CAGR' },
      { t: 'Aristocrat Rotation', creator: 'Smart Jing', subscribers: '188', tone: 'teal', points: [20, 24, 22, 30, 28, 36, 40], meta: 'Annual rebalance', stat: 'Sharpe 1.1' },
    ],
    previews: [
      { t: 'MAG7 Momentum Engine', creator: 'q_research', subscribers: '356', tone: 'green', cadence: 'monthly', meta: 'Monthly rebalance',
        chart: { label: 'Equity curve · 10Y', value: '+24.1% CAGR', points: [6, 9, 8, 14, 12, 20, 18, 26, 30, 27, 36, 44, 40, 50, 58, 66] },
        rows: [
          { t: 'Strategy', v: '+312%', c: 'Sharpe 1.32', up: true },
          { t: 'SPX b/m', v: '+186%', c: 'Sharpe 0.81', up: true },
          { t: 'Max DD', v: '−21.4%', c: 'in 2022', up: false },
        ],
        stats: [['Rebalance', 'Monthly'], ['Win rate', '63%'], ['Names', '7']] },
      { t: 'Aristocrat Rotation', creator: 'Smart Jing', subscribers: '188', tone: 'teal', cadence: 'annual', meta: 'Annual rebalance', fresh: true,
        chart: { label: 'Equity curve · 10Y', value: '+11.3% CAGR', points: [8, 10, 12, 11, 15, 18, 17, 21, 24, 22, 27, 30, 29, 33, 36, 40] },
        rows: [
          { t: 'Strategy', v: '+192%', c: 'Sharpe 1.10', up: true },
          { t: 'SPX b/m', v: '+186%', c: 'Sharpe 0.81', up: true },
          { t: 'Max DD', v: '−18.2%', c: 'in 2020', up: false },
        ],
        stats: [['Rebalance', 'Annual'], ['Yield', '4.2%'], ['Names', '65']] },
    ] },
  { id: 'valuation', label: 'Valuation', icon: 'credit', tone: 'orange', creator: 'Alva', kind: 'playbook',
    blurb: 'Reverse-DCF, relative-multiple, and SOTP frameworks — kept live as the price moves.',
    prompt: 'Value NVDA with a reverse-DCF — what growth is priced in at today’s level?',
    prompts: [
      'Value NVDA with a reverse-DCF — what growth is priced in at today’s level?',
      'Run a SOTP on TSM — advanced nodes vs mature nodes vs net cash',
      'Compare MSFT’s multiple to peers — is the Azure premium justified?',
    ],
    gallery: [
      { t: 'NVDA · Priced-in Growth', s: 'Reverse-DCF · re-solved daily', tone: 'orange', points: [18, 22, 26, 24, 30, 28, 34], tickers: ['NVDA'], stat: '~28% CAGR priced in' },
      { t: 'TSM · SOTP Monitor', s: 'Parts re-marked monthly', tone: 'teal', points: [14, 18, 16, 24, 28, 26, 32], tickers: ['TSM'], stat: '+20% to SOTP' },
      { t: 'MSFT · Premium Watch', s: 'Multiple vs peers · daily', tone: 'blue', points: [20, 22, 26, 24, 28, 32, 30], tickers: ['MSFT'], stat: '31× vs peers 26×' },
    ],
    subs: [
      { t: 'NVDA Priced-in Growth', creator: 'Alva', subscribers: '506', tone: 'orange', points: [18, 22, 26, 24, 30, 28, 34], meta: 'Reverse-DCF · daily', stat: '28% CAGR implied' },
      { t: 'TSM SOTP Monitor', creator: 'q_research', subscribers: '264', tone: 'teal', points: [14, 18, 16, 24, 28, 26, 32], meta: 'Monthly re-mark', stat: '+20% to SOTP' },
    ],
    previews: [
      { t: 'NVDA Priced-in Growth', creator: 'Alva', subscribers: '506', tone: 'orange', cadence: 'daily', meta: 'Reverse-DCF · re-solved daily',
        chart: { label: 'Growth priced in at market', value: '28% CAGR', points: [20, 22, 21, 24, 26, 25, 27, 29, 28, 30, 29, 28] },
        rows: [
          { t: 'Implied', v: '28%', c: '10Y CAGR', up: true },
          { t: 'Street', v: '31%', c: 'consensus models', up: true },
          { t: 'Sensitivity', v: '±5pt', c: '→ ±18% FV', up: false },
        ],
        stats: [['Read', 'Not stretched'], ['Driver', 'DC growth'], ['Re-solves', 'Daily close']] },
      { t: 'TSM SOTP Monitor', creator: 'q_research', subscribers: '264', tone: 'teal', cadence: 'monthly', meta: 'Parts re-marked monthly',
        chart: { label: 'Upside to SOTP', value: '+20%', points: [10, 12, 14, 13, 16, 18, 17, 19, 21, 20, 22, 20] },
        rows: [
          { t: 'Advanced', v: '62%', c: 'of value', up: true },
          { t: 'Mature', v: '24%', c: 'of value', up: true },
          { t: 'Net cash', v: '14%', c: 'of value', up: true },
        ],
        stats: [['Upside', '+20%'], ['Method', 'SOTP'], ['Re-mark', 'Monthly']] },
    ] },
];

/* ========== 建议 prompt ========== */

export const PROMPTS = [
  'Build a theme tracker for AI infrastructure — NVDA, AVGO, TSM, and power-grid names',
  'Screen US large-caps with rising earnings estimates and positive 20-day momentum',
  'Deep-dive NVDA: revenue segmentation, peer valuation, supply chain, bull/bear thesis',
  'Backtest a monthly equal-weight MAG7 basket over the last 10 years',
];

/* ========== skill.kind → 展示元信息 ========== */

export const KIND_META: Record<SkillKind, { label: string; icon: string; verb: string; tone: Tone }> = {
  automation: { label: 'Automation', icon: 'automation', verb: 'Set up automation', tone: 'amber' },
  playbook: { label: 'Build Playbook', icon: 'target', verb: 'Build playbook', tone: 'teal' },
};
