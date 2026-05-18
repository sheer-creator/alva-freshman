import{r as l,j as e}from"./index-DofTxFHk.js";import{A as Ne,T as Oe,C as V,a as Pe,b as N,r as Ce}from"./AppShell-BN9Hv974.js";import{C as Be}from"./referral-mock-DKJhP-m3.js";import{P as ze}from"./PlaybookCover-BG4qAGrv.js";const a=Be,Fe=[{id:"extra-hyperscaler-capex",title:"Hyperscaler Capex Tracker",creator:"Macro Scope X",desc:"Quarterly roll-up of MSFT / AMZN / GOOGL / META capex guidance, mapped to AI-infra beneficiaries with accel/decel flags.",tickers:["MSFT","AMZN","GOOGL","META"],color:a.primary,stars:489,remixes:72},{id:"extra-gold-regime",title:"Gold Regime Dashboard",creator:"Sheer YLL YGG",desc:"Real-yield, DXY, and central-bank-buying regime overlay for gold with confidence-scored regime shifts.",tickers:["GLD","GDX","DXY"],color:a.orange,stars:342,remixes:51},{id:"extra-eth-l2",title:"ETH L2 Market Share",creator:"YGGYLL",desc:"Live TVL, daily txns, and fee capture across Base / Arbitrum / Optimism / zkSync with revenue accrual to ETH mainnet.",tickers:["ETH","ARB","OP"],color:a.deepBlue,stars:276,remixes:44},{id:"extra-fomc-playbook",title:"FOMC Day Playbook",creator:"Harry Zzz",desc:"Intraday vol + rate-path positioning around every FOMC. Tracks dot-plot surprise, SEP revisions, and post-meeting rotation.",tickers:["SPY","TLT","VIX"],color:a.red,stars:198,remixes:29},{id:"extra-pair-trade",title:"Pair-Trade Radar",creator:"Alva Intern",desc:"Scans SPX + NDX pairs for 2σ spread dislocations with cointegration filter. Generates long/short candidates with sizing.",tickers:["KO","PEP","V","MA"],color:a.blue,stars:164,remixes:23},{id:"extra-dividend-alpha",title:"Dividend Aristocrat Alpha",creator:"Smart Jing",desc:"Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.",tickers:["SPX","NOBL"],color:a.green,stars:231,remixes:38}],T=t=>{if(t.length>=6)return t.slice(0,6);const n=6-t.length,s=new Set(t.map(i=>i.id)),p=[];for(const i of Fe){if(p.length>=n)break;s.has(i.id)||p.push(i)}return[...t,...p]},de=[{id:"theme-tracker",label:"Theme Tracker",icon:"buld-l",creator:"Alva",description:"Build a live tracker for any market theme — surfaces sentiment, earnings, and policy catalysts across the basket weekly.",prompts:["Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names","Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts","Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators"],playbooks:T([{id:"ai-infra-theme",title:"AI Infra Theme Radar",creator:"Alva Intern",desc:"Tracks NVDA / AVGO / TSM + power grid enablers. Surfaces weekly sentiment + rev-beat signals and rebalances exposure to the strongest relative performers.",tickers:["NVDA","AVGO","TSM","VST"],color:a.primary,stars:312,remixes:48},{id:"glp1-theme",title:"GLP-1 Obesity Complex",creator:"Harry Zzz",desc:"Unified tracker for GLP-1 winners (LLY / NVO) and food/restaurant losers. Weekly sentiment scoring with catalyst calendar.",tickers:["LLY","NVO","AMGN"],color:a.orange,stars:186,remixes:22},{id:"nuclear-theme",title:"Nuclear Renaissance Monitor",creator:"Macro Scope X",desc:"Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.",tickers:["CCJ","SMR","VST","CEG"],color:a.deepBlue,stars:94,remixes:12}])},{id:"smart-screener",label:"Smart Screener",icon:"target-l2",creator:"Alva",description:"Rank stocks by any factor combo, daily.",prompts:["Screen for US large-caps with rising earnings estimates and positive 20-day price momentum","Find cash-rich small-caps trading below 10x forward earnings with expanding gross margins","Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio"],playbooks:T([{id:"momentum-quality",title:"Momentum × Quality Screen",creator:"Smart Jing",desc:"Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, rebalances weekly with 2% stop-loss band.",tickers:["SPX","QQQ"],color:a.green,stars:241,remixes:37},{id:"cheap-cashcow",title:"Cheap Cash Cow Screener",creator:"Alva Intern",desc:"Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.",tickers:["R2K"],color:a.blue,stars:128,remixes:19},{id:"crypto-breakout",title:"Crypto Breakout Screen",creator:"YGGYLL",desc:"Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for further review.",tickers:["BTC","ETH","SOL","AVAX"],color:a.red,stars:76,remixes:9}])},{id:"deep-dive",label:"Deep Dive",icon:"search-l",creator:"Alva",description:"A complete research package on any ticker. Pulls revenue segmentation from filings, builds a peer comparable set, traces the supply chain up and downstream, then drafts a bull and bear thesis with scenario-weighted price targets. Output is a single read-once briefing — no skimming required, no follow-up questions left dangling.",prompts:["Give me a deep-dive on NVDA — revenue segmentation, peer valuation, supply chain, and bull/bear thesis","Deep-dive TSMC: capacity, customer mix, geopolitical risk, and long-term margin trajectory","Full research on Solana: ecosystem activity, token economics, validator health, and competition vs ETH L2s"],playbooks:T([{id:"nvda-deepdive",title:"NVDA 360° Deep Dive",creator:"Sheer YLL YGG",desc:"End-to-end NVDA research — revenue segmentation, hyperscaler capex correlation, peer valuation, and scenario-based price targets.",tickers:["NVDA","AMD","AVGO"],color:a.primary,stars:412,remixes:58},{id:"tsmc-deepdive",title:"TSMC Long Thesis",creator:"Macro Scope X",desc:"Capacity roadmap, customer concentration, Arizona + Kumamoto fab ramps, geopolitical risk weighting, and 5Y margin path.",tickers:["TSM","2330.TW"],color:a.deepBlue,stars:163,remixes:21},{id:"sol-deepdive",title:"SOL Ecosystem Deep Dive",creator:"Harry Zzz",desc:"DEX volume, Firedancer progress, validator decentralization, revenue accrual, and valuation vs ETH + L2 peers.",tickers:["SOL"],color:a.orange,stars:87,remixes:13}])},{id:"daily-macro-brief",label:"Daily Macro Brief",kol:!0,creator:"Macro Scope X",description:"A daily breakdown of macro flows — rates, FX, and cross-asset signals — distilled into a 5-minute brief.",prompts:["Daily macro brief covering US rates, DXY, oil, and credit spreads with LLM commentary","Weekly China macro digest — credit impulse, property indicators, and policy shifts","Morning global risk dashboard for Asia → Europe → US cross-asset flows"],playbooks:T([{id:"daily-macro",title:"Daily Macro Brief",creator:"Macro Scope X",desc:"Auto-generated macro snapshot every US open — rates, DXY, oil, credit spreads, and LLM-authored summary of overnight drivers.",tickers:["DXY","CL","HYG"],color:a.deepBlue,stars:211,remixes:34},{id:"china-weekly",title:"China Macro Weekly",creator:"Harry Zzz",desc:"Weekly China credit impulse, property sales, and policy-move tracker. Flags deviations from trend and dispatches alerts.",tickers:["FXI","KWEB"],color:a.red,stars:58,remixes:6},{id:"global-risk",title:"Global Risk Cross-Asset",creator:"Smart Jing",desc:"Asia → Europe → US handoff dashboard tracking equity, rates, FX, and credit moves with regime-shift detection.",tickers:["SPY","EFA","EEM"],color:a.blue,stars:144,remixes:18}])},{id:"earnings-edge",label:"Earnings Edge",kol:!0,creator:"Smart Jing",description:"Whisper numbers and post-print drift, weekly.",prompts:["Summarize the latest NVDA earnings call and compare guidance to consensus","Whisper numbers + post-earnings drift scanner for next week’s MAG7 reports","Aggregate semis earnings read-across from TSM → ASML → Applied Materials → NVDA"],playbooks:T([{id:"earnings-whisper",title:"Earnings Whisper Board",creator:"Smart Jing",desc:"Crowdsourced + LLM whisper numbers + post-earnings drift tracker. Ranks names by whisper-vs-consensus gap for upcoming reports.",tickers:["AAPL","MSFT","NVDA","META"],color:a.primary,stars:182,remixes:27},{id:"semis-readacross",title:"Semis Read-Across",creator:"Alva Intern",desc:"Chain earnings read-across TSM → ASML → AMAT → NVDA. Quantifies lead-lag signal on each node of the supply chain.",tickers:["TSM","ASML","AMAT","NVDA"],color:a.orange,stars:74,remixes:10},{id:"mag7-postprint",title:"MAG7 Post-Print Drift",creator:"Harry Zzz",desc:"Backtests post-earnings drift across MAG7 by surprise magnitude and guide direction. Suggests entry windows.",tickers:["AAPL","MSFT","GOOGL","AMZN","NVDA","META","TSLA"],color:a.green,stars:102,remixes:14}])}],pe=[{id:"crypto-pulse",label:"Crypto Pulse",kol:!0,creator:"Harry Zzz",description:"Spot tradable signal in noisy crypto. Aggregates news flow, on-chain activity, ETF flows, exchange balances, and stablecoin issuance into a single morning pulse — flags the names with statistically meaningful deviations and explains *why* in plain English so you can move before the desk does.",prompts:["Summarize the last 24h of news on Bitcoin and flag anything that moved price >2%","Scan top-50 tokens for 30D breakouts and rising active addresses","Track ETH L2 market share — TVL, txns, and fee accrual back to mainnet"],playbooks:T([{id:"btc-news",title:"BTC News Pulse",creator:"YGGYLL",desc:"24h news aggregator for BTC with sentiment scoring, price-correlation tagging, and auto-flagging of likely movers.",tickers:["BTC"],color:a.primary,stars:64,remixes:8},{id:"crypto-breakout-2",title:"Crypto Breakout Screen",creator:"YGGYLL",desc:"Scans top-50 tokens for 30D return > 30% combined with rising active-address count.",tickers:["BTC","ETH","SOL"],color:a.red,stars:76,remixes:9}])},{id:"what-if",label:"What If",icon:"remix-l",creator:"Alva",description:"Run scenarios. See your portfolio reprice.",prompts:["What if the Fed delivers 3 more cuts in 2026 — how should a balanced 60/40 portfolio reposition?","What if NVDA earnings miss consensus by 5% next quarter — which AI beneficiaries still outperform?","What if oil spikes to $120 on Middle East tension — sector rotation map and hedges"],playbooks:T([{id:"fed-cuts-scenario",title:"Fed-Cut Scenario Rebalancer",creator:"Smart Jing",desc:"Monte Carlo on 60/40 under 3 Fed cut paths (dovish / base / hawkish). Suggests duration + small-cap tilt adjustments each FOMC.",tickers:["AGG","IWM","SPY"],color:a.blue,stars:154,remixes:25},{id:"nvda-miss-scenario",title:"NVDA Miss Shockwave",creator:"Alva Intern",desc:"What-if engine for AI peer reaction to a 5% NVDA revenue miss. Ranks relative drawdowns and identifies resilient derivatives plays.",tickers:["NVDA","AVGO","AMD","MU"],color:a.red,stars:98,remixes:14},{id:"oil-spike-scenario",title:"Oil Spike Hedge Map",creator:"Macro Scope X",desc:"Maps SPX sector responses to a $120 oil scenario and proposes airline / transport hedges sized to portfolio oil-beta.",tickers:["XOM","CVX","DAL","FDX"],color:a.orange,stars:71,remixes:9}])},{id:"yield-hunter",label:"Yield Hunter",kol:!0,creator:"Sheer YLL YGG",description:"Hunts the highest risk-adjusted yield wherever it lives — Treasuries, IG and HY credit, preferreds, MLPs, REITs, and on-chain stablecoin lending. Normalizes spreads to common units, attaches default-probability and smart-contract-risk overlays where relevant, and ladders the result so you can rotate up or down the curve as regimes shift. Includes a tax-equivalent comparison across muni / corporate / pass-through structures.",prompts:["Compare 10Y Treasury yield vs IG/HY credit spreads with regime-shift highlights","Find dividend-growth names with 10+ years of growth and sub-60% payout ratio","Stablecoin yield ladder — Aave / Compound / Pendle with risk scores"],playbooks:T([{id:"div-aristocrat",title:"Dividend Aristocrat Alpha",creator:"Smart Jing",desc:"Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.",tickers:["SPX","NOBL"],color:a.green,stars:231,remixes:38},{id:"credit-ladder",title:"IG / HY Credit Ladder",creator:"Macro Scope X",desc:"Spread + duration ladder across IG and HY buckets with default-probability overlays and regime triggers.",tickers:["LQD","HYG"],color:a.blue,stars:89,remixes:12}])},{id:"dividend-diary",label:"Dividend Diary",kol:!0,creator:"Lily Lou",description:"A weekly diary of dividend hikes, cuts, and special distributions across SPX and global aristocrats.",prompts:["List companies that hiked dividends >10% this week and their payout coverage","Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio","Flag any SPX dividend cut announcements in the past 30 days"],playbooks:T([{id:"div-aristocrat-2",title:"Dividend Aristocrat Alpha",creator:"Smart Jing",desc:"Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.",tickers:["SPX","NOBL"],color:a.green,stars:231,remixes:38},{id:"div-hikes",title:"Weekly Dividend Hike Tracker",creator:"Lily Lou",desc:"Surfaces every SPX/RIY dividend hike each week with coverage, growth-streak, and post-announcement drift.",tickers:["SPX"],color:a.primary,stars:64,remixes:7}])},{id:"backtest",label:"Backtest",icon:"history-l",creator:"Alva",description:"Rule-based strategies, fully attributed.",prompts:["Backtest a monthly-rebalanced equal-weight MAG7 basket over the last 10 years","Backtest a BTC/ETH 70/30 portfolio rebalanced weekly with 15% max drawdown stop","Backtest buying TSM on days where NVDA gains >3%, exit on +10% TP or -5% SL"],playbooks:T([{id:"mag7-equal",title:"MAG7 Equal-Weight",creator:"Harry Zzz",desc:"Maintains a fully invested equal-weight MAG7 portfolio, rebalanced monthly. Tracks alpha vs SPX and records decomposition.",tickers:["AAPL","MSFT","GOOGL","AMZN","NVDA","META","TSLA"],color:a.blue,stars:89,remixes:14},{id:"nvda-tsm-bt",title:"NVDA +3% → TSM Entry",creator:"Smart Jing",desc:"Trigger-based backtest — buy TSM at close when NVDA gains >3%, exit on +10% TP or -5% SL. Full historical P&L attribution.",tickers:["NVDA","TSM"],color:a.red,stars:48,remixes:7},{id:"btc-macd-bt",title:"BTC MACD 1h Crossover",creator:"Macro Scope X",desc:"Backtests BTC MACD(12,26,9) crossover on 1h candles. Reports Sharpe, max DD, and sensitivity to parameter sweeps.",tickers:["BTC"],color:a.deepBlue,stars:34,remixes:5}])},{id:"valuation",label:"Valuation",icon:"credit-l",creator:"Alva",description:"Reverse-DCF, relative-multiple, and SOTP frameworks — value any asset like a sell-side analyst.",prompts:["Build a reverse-DCF for MSFT implied by the current share price and compare to peers","Relative valuation snapshot for the Mag7 — EV/Sales, P/E, and FCF yield vs 5Y median","SOTP valuation for Amazon — AWS / Retail / Ads / Prime / Logistics"],playbooks:T([{id:"mag7-relval",title:"MAG7 Relative Valuation",creator:"Alva Intern",desc:"Live EV/Sales, P/E NTM, and FCF yield table for MAG7 with z-score vs 5-year median. Highlights outliers automatically.",tickers:["AAPL","MSFT","GOOGL","AMZN","NVDA","META","TSLA"],color:a.primary,stars:142,remixes:23},{id:"amzn-sotp",title:"AMZN SOTP",creator:"Sheer YLL YGG",desc:"Sum-of-the-parts on Amazon — AWS, Retail, Ads, Prime, Logistics. Adjustable multiples per segment and scenario toggles.",tickers:["AMZN"],color:a.orange,stars:96,remixes:11}])}],me=[{id:"community-insider-buy-radar",label:"Insider Buy Radar",kol:!0,creator:"Deep Ledger",description:"Tracks clustered insider buys, 10b5-1 changes, and post-filing drift across US equities.",tags:["Filings","Insider Cluster","Event Drift"],uses:"1.8k uses",updatedAt:"23m ago",prompts:["Build an insider-buy radar for US mid-caps, filtering for clustered purchases above $250k","Track 10b5-1 changes and open-market buys for software stocks with positive earnings revisions","Flag insider purchases that happen within 30 days of guidance updates or activist filings"],playbooks:T([{id:"insider-cluster-us",title:"Clustered Insider Buy Monitor",creator:"Deep Ledger",desc:"Finds companies with multiple open-market insider purchases over a 14-day window and ranks them by purchase size, role seniority, and post-filing drift.",tickers:["SPX","R2K"],color:a.primary,stars:318,remixes:46},{id:"ceo-cfo-buys",title:"CEO / CFO Buy Signal",creator:"Deep Ledger",desc:"Filters insider buys to CEO and CFO activity, removes low-signal option exercises, and scores names against valuation and estimate revisions.",tickers:["IWM","QQQ"],color:a.blue,stars:204,remixes:28},{id:"activist-plus-insider",title:"Activist + Insider Overlap",creator:"Alva Intern",desc:"Watches activist filings and insider buying overlap, then builds a candidate list for event-driven deep dives.",tickers:["SPY","IWM"],color:a.orange,stars:147,remixes:19}])},{id:"community-whale-wallet-watch",label:"Whale Wallet Watch",kol:!0,creator:"WalletWatcher",description:"Flags large wallet movements, exchange inflows, stablecoin rotations, and funding stress.",tags:["On-chain Flow","Exchange Flow","Liquidity"],uses:"2.4k uses",updatedAt:"1h ago",prompts:["Track BTC whale movements above 1,000 BTC and alert when transfers move toward major exchanges","Build a stablecoin rotation monitor across USDT, USDC, and DAI with exchange inflow context","Watch SOL and ETH large-wallet activity alongside funding rates and spot volume"],playbooks:T([{id:"btc-whale-exchange-flow",title:"BTC Whale Exchange Flow",creator:"WalletWatcher",desc:"Tracks dormant-wallet movements, large exchange deposits, and spot volume confirmation to flag potential sell-pressure windows.",tickers:["BTC"],color:a.orange,stars:402,remixes:64},{id:"stablecoin-rotation",title:"Stablecoin Rotation Map",creator:"YGGYLL",desc:"Maps USDT / USDC flows by venue and chain, then scores whether liquidity is moving into or out of risk assets.",tickers:["USDT","USDC","BTC"],color:a.green,stars:288,remixes:41},{id:"sol-whale-pulse",title:"SOL Whale Pulse",creator:"Harry Zzz",desc:"Combines SOL whale transfers, perp funding, and DEX volume to surface early risk-on and risk-off rotations.",tickers:["SOL","ETH"],color:a.deepBlue,stars:166,remixes:24}])},{id:"community-options-flow-scanner",label:"Options Flow Scanner",kol:!0,creator:"Options Club",description:"Ranks unusual option flow by premium, sweep quality, open interest, and post-flow move.",tags:["Derivatives","Vol Surface","Positioning"],uses:"1.1k uses",updatedAt:"5h ago",prompts:["Scan unusual call buying in liquid US equities, filtering for premium above $1m and OI expansion","Build a weekly options-flow dashboard for MAG7 with sweep quality and implied-vol change","Flag bearish put flow that appears before earnings or guidance revisions"],playbooks:T([{id:"unusual-call-flow",title:"Unusual Call Flow Ranker",creator:"Options Club",desc:"Scores call sweeps by premium, liquidity, OI confirmation, and follow-through to reduce noisy single-print alerts.",tickers:["AAPL","NVDA","TSLA"],color:a.primary,stars:265,remixes:39},{id:"mag7-vol-flow",title:"MAG7 Vol Flow Board",creator:"Smart Jing",desc:"Combines options premium, IV change, and post-flow price action across MAG7 for a daily directional board.",tickers:["AAPL","MSFT","NVDA"],color:a.blue,stars:221,remixes:31},{id:"earnings-put-flow",title:"Pre-Earnings Put Flow",creator:"Macro Scope X",desc:"Watches put buying ahead of earnings and filters for flows that historically precede downside gaps.",tickers:["QQQ","SPY"],color:a.red,stars:119,remixes:15}])},{id:"community-semis-supply-chain",label:"Semis Supply Chain",kol:!0,creator:"Silicon Cycle",description:"Connects TSM, ASML, HBM vendors, and hyperscaler capex into one signal map.",tags:["Supply Chain","Capacity","Read-through"],uses:"3.2k uses",updatedAt:"1d ago",prompts:["Build a semis supply-chain tracker across NVDA, TSM, ASML, SK hynix, MU, and hyperscaler capex","Track HBM supply commentary and map read-through to GPU system shipments","Monitor TSM capacity, CoWoS packaging, and AI server demand signals in one weekly brief"],playbooks:T([{id:"hbm-bottleneck-map",title:"HBM Bottleneck Map",creator:"Silicon Cycle",desc:"Tracks HBM supply, packaging capacity, and memory-vendor commentary to explain bottlenecks in AI accelerator shipments.",tickers:["NVDA","MU","TSM"],color:a.deepBlue,stars:534,remixes:82},{id:"cowos-capacity-watch",title:"CoWoS Capacity Watch",creator:"Macro Scope X",desc:"Watches TSM advanced packaging updates, supplier lead times, and hyperscaler demand commentary.",tickers:["TSM","ASML"],color:a.primary,stars:346,remixes:47},{id:"ai-server-readthrough",title:"AI Server Read-Through",creator:"Alva Intern",desc:"Maps Dell, Super Micro, ODM, and component commentary back to AI infrastructure beneficiaries.",tickers:["DELL","SMCI","NVDA"],color:a.orange,stars:271,remixes:33}])},{id:"community-dividend-cut-guard",label:"Dividend Cut Guard",kol:!0,creator:"Cashflow Club",description:"Screens payout risk, FCF coverage, leverage, and management language before dividend cuts.",tags:["Payout Risk","FCF Coverage","Leverage"],uses:"760 uses",updatedAt:"2d ago",prompts:["Screen dividend stocks for payout risk using FCF coverage, leverage, and negative guidance language","Build a dividend cut watchlist for REITs and utilities with debt maturity pressure","Flag companies where dividend yield is high but free cash flow coverage is deteriorating"],playbooks:T([{id:"dividend-cut-watchlist",title:"Dividend Cut Watchlist",creator:"Cashflow Club",desc:"Ranks dividend stocks by FCF coverage, leverage trend, maturity wall, and management language risk.",tickers:["NOBL","SPX"],color:a.green,stars:186,remixes:23},{id:"reit-payout-risk",title:"REIT Payout Risk Monitor",creator:"Lily Lou",desc:"Combines payout ratios, debt maturities, and cap-rate pressure for REIT dividend sustainability scoring.",tickers:["VNQ","SPY"],color:a.blue,stars:128,remixes:14},{id:"yield-trap-screen",title:"Yield Trap Screen",creator:"Smart Jing",desc:"Screens high-yield names for deteriorating FCF, falling estimates, and leverage pressure.",tickers:["HYG","LQD"],color:a.red,stars:97,remixes:11}])},{id:"community-macro-brief-builder",label:"Macro Brief Builder",kol:!0,creator:"Market Bento",description:"Turns rates, FX, oil, credit, and equity futures into a concise daily macro brief.",tags:["Cross-asset","Rates & FX","Risk Regime"],uses:"920 uses",updatedAt:"3h ago",prompts:["Create a daily macro brief from rates, DXY, oil, credit spreads, and equity futures","Summarize today’s cross-asset risk regime and explain what changed since yesterday","Build a morning brief for Asia to US market handoff with rates, FX, and commodity context"],playbooks:T([{id:"cross-asset-morning-brief",title:"Cross-Asset Morning Brief",creator:"Market Bento",desc:"Summarizes rates, FX, oil, credit, and equity futures into a concise macro regime note before the US open.",tickers:["DXY","TLT","SPY"],color:a.deepBlue,stars:214,remixes:31},{id:"risk-regime-score",title:"Risk Regime Score",creator:"Macro Scope X",desc:"Combines VIX, credit spreads, DXY, and rates momentum into a daily risk-on / risk-off score.",tickers:["VIX","HYG","DXY"],color:a.red,stars:172,remixes:21},{id:"asia-us-handoff",title:"Asia to US Handoff",creator:"Harry Zzz",desc:"Turns Asia and Europe market moves into a US premarket brief with ETF and futures context.",tickers:["EFA","EEM","SPY"],color:a.orange,stars:143,remixes:18}])}],We=[{keys:["btc","bitcoin"],prompts:["Track BTC momentum and alert me on 1h breakouts above 3% gains","Build a BTC DCA playbook with weekly rebalancing and a 20% max drawdown stop","Correlate BTC with NASDAQ tech names and flag regime shifts in real time"]},{keys:["eth","ethereum"],prompts:["Set up an ETH staking-yield tracker with alerts on gas-fee spikes","Build an ETH/BTC ratio rotation playbook with RSI confirmation","Monitor ETH Layer-2 TVL shifts and flag capital rotation signals"]},{keys:["sol","solana"],prompts:["Track SOL DEX volume vs ETH and surface dApp rotation signals","Build a SOL/ETH pair-trade triggered by volume divergence","Monitor SOL validator health and alert on decentralization risk"]},{keys:["nvda","nvidia"],prompts:["Deep-dive NVDA — revenue segmentation, peer valuation, and supply-chain exposure","Build an NVDA earnings run-up playbook with an options overlay","Track NVDA vs AMD/AVGO relative strength with daily alerts"]},{keys:["tsla","tesla"],prompts:["Track TSLA delivery numbers vs consensus and alert on misses","Build a TSLA vs BYD pair-trade with weekly rebalancing","Correlate TSLA price with China EV sentiment and surface leading indicators"]},{keys:["ai","artificial intelligence"],prompts:["Surface the top 5 AI infrastructure plays by 90-day momentum","Build an AI-sector rotation basket rebalanced monthly","Compare AI beneficiaries vs software incumbents and flag divergences"]},{keys:["macro","fed","cpi","rates"],prompts:["Daily macro brief — US rates, DXY, oil, credit spreads with LLM commentary","Build a recession-risk dashboard with 5 leading indicators","Set up Fed-cut scenario alerts when CPI surprises move odds >5%"]},{keys:["earnings"],prompts:["Build an earnings whisper tracker for the next 2 weeks","Post-earnings drift playbook — long beaters, short missers on a 3-day hold","Compare implied vs realized moves across MAG7 earnings"]},{keys:["options","iv"],prompts:["Scan for unusual options volume in mega-cap tech and alert on sweeps","Build an IV-crush playbook for post-earnings plays","Track 0DTE flow on SPX and surface directional bias shifts"]},{keys:["dividend","income"],prompts:["Build a dividend-growth screen with 10+ years of growth and sub-60% payout ratio","Track dividend ex-dates across my watchlist and alert 5 days ahead","Compare dividend-yield baskets vs treasury yield and flag regime shifts"]},{keys:["what is","what's"],prompts:["What is the implied-volatility curve telling us about NVDA this week?","What is the best way to hedge a long BTC position right now?","What is the Sharpe ratio of my current portfolio over 90 days?"]},{keys:["how to","how do i","how do"],prompts:["How to build a momentum playbook with drawdown caps","How to hedge my equity portfolio against a Fed surprise","How to spot unusual options flow in real time"]},{keys:["find","show me","show"],prompts:["Find playbooks with >20% annualized return and <10% drawdown","Show me undervalued tech names with rising earnings estimates","Find the top yield opportunities in stablecoins right now"]},{keys:["compare","vs","versus"],prompts:["Compare NVDA and AMD across growth, margins, and valuation","Compare my portfolio vs the S&P 500 over the last 90 days","Compare BTC and ETH risk-adjusted returns year-to-date"]},{keys:["why"],prompts:["Why is BTC underperforming NASDAQ this month?","Why are semis volatile heading into earnings?","Why did my portfolio drop on Friday's close?"]},{keys:["summarize","summary","tl;dr"],prompts:["Summarize this week's Fed speakers and market reactions","Summarize my recent trades and flag any discipline slips","Summarize the latest AI-sector earnings ranked by relevance"]},{keys:["explain"],prompts:["Explain what's driving the 10-year yield higher today","Explain the divergence between SPX and credit spreads","Explain the risk profile of my current top holding"]}],He=2;function Ge(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ye(t,n){const s=`\\b${Ge(n).replace(/\s+/g,"\\s+")}\\b`;return new RegExp(s,"i").test(t)}function Xe(t){const n=t.trim();if(n.length<He)return[];if(n.length>60)return[];if(n.split(/\s+/).length>5)return[];for(const s of We)if(s.keys.some(p=>Ye(n,p)))return s.prompts;return[]}const Ve="researcher-l1";function D(){return typeof window>"u"||typeof window.matchMedia!="function"?!0:window.matchMedia("(hover: hover)").matches}const _e={"theme-tracker":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"smart-screener":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},backtest:{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"crypto-pulse":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"yield-hunter":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"dividend-diary":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"what-if":{bg:"var(--main-m2-10)",fg:"var(--main-m2)"},"deep-dive":{bg:"var(--main-m2-10)",fg:"var(--main-m2)"},valuation:{bg:"var(--main-m5-10)",fg:"var(--main-m5)"},"daily-macro-brief":{bg:"var(--main-m5-10)",fg:"var(--main-m5)"},"earnings-edge":{bg:"var(--main-m5-10)",fg:"var(--main-m5)"}},Ue=t=>_e[t]??{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},he={display:"flex",alignItems:"center",gap:8,height:40,padding:"0 16px",borderRadius:999,border:"0.5px solid var(--line-l12)",fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"22px",fontWeight:500,color:"var(--text-n7)",whiteSpace:"nowrap",cursor:"pointer",letterSpacing:.14,userSelect:"none",background:"white",transition:"box-shadow 160ms ease, transform 160ms ease"};function fe(t){let n=2166136261;for(let s=0;s<t.length;s++)n^=t.charCodeAt(s),n=Math.imul(n,16777619);return n>>>0}function xe(t){const s=fe(t)%7200;return s<1?"just now":s<60?`${s}m ago`:s<1440?`${Math.floor(s/60)}h ago`:`${Math.floor(s/1440)}d ago`}const we=["Filings","Insider Cluster","Event Drift","Earnings Drift","Whisper Numbers","Macro Flow","FX Cross","Rates Curve","Credit Spread","Sentiment","Theme Tracker","Catalyst","Risk Off","Backtest","Yield Curve","Dividend","On-Chain","ETF Flow","MAG7","AI Capex","Hyperscaler","Volatility","Carry","Drawdown","Sharpe","Quintile","Read-Across","Sector Rotation","Pair Trade","Theme"];function ye(t){const s=(fe(t)>>>12)%2+2,p=new Set,i=[];for(let o=0;i.length<s&&o<32;o++){const m=fe(`${t}|tag|${o}`)%we.length;p.has(m)||(p.add(m),i.push(we[m]))}return i}const Se=t=>()=>e.jsx("img",{src:`/${t}`,alt:"",width:14,height:14,style:{width:14,height:14,display:"block"}}),$e=()=>()=>e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),qe=()=>()=>e.jsx("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})}),Te={discord:{key:"discord",label:"Discord",href:"https://discord.com",render:Se("logo-social-discord.svg")},telegram:{key:"telegram",label:"Telegram",href:"https://telegram.org",render:Se("logo-telegram.svg")},x:{key:"x",label:"X",href:"https://x.com",render:$e()},instagram:{key:"instagram",label:"Instagram",href:"https://instagram.com",render:qe()}},Qe=["discord","telegram","x"],Ke=["x","telegram","discord","instagram"];function be(t){if(t==="Alva")return Qe.map(o=>Te[o]);let n=2166136261;for(let o=0;o<t.length;o++)n^=t.charCodeAt(o),n=Math.imul(n,16777619)>>>0;const s=o=>{let x=n;for(let m=0;m<o.length;m++)x^=o.charCodeAt(m),x=Math.imul(x,16777619)>>>0;return x},p=n%2+1;return[...Ke].sort((o,x)=>s(o)-s(x)).slice(0,p).map(o=>Te[o])}function Je({template:t,anchor:n,placeAbove:s,side:p="auto",onMouseEnter:i,onMouseLeave:o}){const w=l.useRef(null),[y,b]=l.useState(220);l.useLayoutEffect(()=>{w.current&&b(w.current.offsetHeight)},[t.id]);const v=t.tags??ye(t.id);let u,g;return p==="left"?(u=n.left-360-10,typeof window<"u"&&(u=Math.max(12,u)),g=n.top+n.height/2-y/2,typeof window<"u"&&(g=Math.max(12,Math.min(g,window.innerHeight-y-12)))):(u=n.left+n.width/2-360/2,typeof window<"u"&&(u=Math.max(12,Math.min(u,window.innerWidth-360-12))),g=s?n.top-y-10:n.bottom+10),e.jsxs("div",{ref:w,onMouseEnter:i,onMouseLeave:o,style:{position:"fixed",top:g,left:u,width:360,zIndex:50,background:"#ffffff",borderRadius:8,border:"0.5px solid var(--line-l2)",boxShadow:"var(--shadow-s)",padding:20,pointerEvents:"auto",animation:"newchat-fadeup 160ms ease-out"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("h2",{style:{fontFamily:"'Delight', sans-serif",fontSize:18,lineHeight:"24px",fontWeight:400,color:"var(--text-n9)",letterSpacing:.18,margin:0},children:t.label}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"16px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:400},children:xe(t.id)})]}),e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:13,lineHeight:"20px",color:"var(--text-n7)",letterSpacing:.13,margin:"10px 0 0"},children:t.description}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:10},children:v.slice(0,3).map(f=>e.jsx("span",{style:{height:20,padding:"0 6px",borderRadius:5,background:"var(--b-r05)",color:"var(--text-n5)",fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"20px",letterSpacing:.11,whiteSpace:"nowrap"},children:f},f))}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"20px 0"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("button",{type:"button",className:"nc-creator-link",onClick:f=>f.stopPropagation(),style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:10,padding:"4px 6px",margin:"-4px -6px",border:"none",background:"transparent",cursor:"pointer",borderRadius:6,transition:"background 140ms ease",textAlign:"left"},children:[e.jsx(N,{name:t.creator,size:36}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"14px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:400},children:"Created by"}),e.jsx("div",{className:"nc-creator-link-name",style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"20px",color:"var(--text-n9)",letterSpacing:.14,fontWeight:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",transition:"color 140ms ease"},children:t.creator})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:4,flexShrink:0},children:be(t.creator).map(f=>e.jsx("a",{href:f.href,target:"_blank",rel:"noreferrer noopener","aria-label":f.label,style:{width:24,height:24,borderRadius:"9999px",background:"var(--b-r05)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background 120ms ease, transform 120ms ease"},onMouseEnter:h=>{D()&&(h.currentTarget.style.background="var(--b-r1)",h.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:h=>{D()&&(h.currentTarget.style.background="var(--b-r05)",h.currentTarget.style.transform="translateY(0)")},children:f.render()},f.key))})]})]})}function Ae({text:t,onClick:n}){return e.jsxs("button",{className:"nc-prompt-row",onClick:n,onMouseEnter:s=>{D()&&(s.currentTarget.style.background="var(--b-r03)",s.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:s=>{D()&&(s.currentTarget.style.background="transparent",s.currentTarget.style.transform="translateY(0)")},children:[e.jsx("span",{className:"nc-prompt-text",children:t}),e.jsx(V,{name:"enter-l",size:20,color:"rgba(0,0,0,0.4)"})]})}function ue({widthPct:t}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"12px",borderRadius:8},children:[e.jsx("div",{style:{flex:1,height:14,background:"var(--b-r07)",borderRadius:4,maxWidth:`${t}%`}}),e.jsx("div",{style:{width:20,height:20,background:"var(--b-r05)",borderRadius:4}})]})}const Ze=new Set(["BTC","ETH","SOL","PEPE","ARB","OP","AVAX","BNB","USDT","USDC","XRP","DOGE"]),et=new Set(["SPX","SPY","QQQ","R2K","IWM","AGG","TLT","VIX","EFA","EEM","DXY","CL","HYG","LQD","GLD","GDX","NOBL","FXI","KWEB","2330.TW"]),tt={BTC:"#F7931A",ETH:"#627EEA",SOL:"#14F195",PEPE:"#3FAA3D",SPX:"#94A3B8",SPY:"#94A3B8",QQQ:"#94A3B8",GLD:"#E6A91A",GDX:"#E6A91A",TLT:"#627EEA",VIX:"#EF4444",AGG:"#94A3B8",IWM:"#94A3B8"};function rt({ticker:t}){const[n,s]=l.useState(!1);let p=null;if(!n&&!et.has(t)&&(Ze.has(t)?p=`https://assets.coincap.io/assets/icons/${t.toLowerCase()}@2x.png`:p=`https://financialmodelingprep.com/image-stock/${t}.png`),p)return e.jsx("img",{src:p,alt:t,width:12,height:12,style:{borderRadius:"50%",objectFit:"cover",flexShrink:0,background:"#fff"},onError:()=>s(!0)});const i=tt[t]||"#94A3B8";return e.jsx("span",{style:{width:12,height:12,borderRadius:"50%",background:i,flexShrink:0,display:"inline-block"}})}const it={"theme-tracker":"thesis","smart-screener":"screener","deep-dive":"thesis","daily-macro-brief":"general","earnings-edge":"thesis","crypto-pulse":"general","what-if":"what-if","yield-hunter":"screener","dividend-diary":"screener",backtest:"what-if",valuation:"thesis"},at={"theme-tracker":"trend_up","smart-screener":"momentum","deep-dive":"ai","daily-macro-brief":"macro","earnings-edge":"earnings","crypto-pulse":"crypto","what-if":"event_study","yield-hunter":"dividend","dividend-diary":"dividend",backtest:"event_study",valuation:"value"},st=["S&P LARGE CAP","RUSSELL 2000","NASDAQ 100","MSCI EMG","STOXX 600","TOPIX 500"],nt=["1H","6H","1D","1W"],ot=["Late long-term debt cycle · risk-off bias","AI capex peak forming into Q3","Basket −2.1% vs SMH +0.6% YTD","Hyperscaler PPA flows feed power demand","Dollar regime shift, EM tailwind","Curve re-steepening as growth softens"],lt=["Historically Drops","Historically Rises","Range-Bound","Outperforms Peers","Trails Benchmark"],ct=["CONTEXT FEED · daily","WATCHLIST · 2026","BRIEF · daily","PULSE · live","ALERTS · LIVE · 30S"],dt=["2h ago","38 holdings","1.2M views","live","12 alerts","07:30 ET"],pt=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],mt=["RISK","CATALYST","AMBIGUOUS"];function ht(t){let n=2166136261;for(let s=0;s<t.length;s++)n^=t.charCodeAt(s),n=Math.imul(n,16777619);return n>>>0}function ut(t,n){const s=it[n]??"general",p=at[n],i=ht(`${t.id}|${t.title}`),o=(b,v)=>b[(i>>>v)%b.length],x=t.tickers??[],m={template:s,title:t.title,author:t.creator,tickers:x,domain:p};if(s==="screener")return{...m,series:`SCORED · ${o(st,0)} · ${o(nt,6)}`};if(s==="thesis"){const b=o(pt,0),v=(i>>>4)%28+1;return{...m,anchor:`${b} ${v}`,category:o(mt,8),kind:o(ot,12)}}if(s==="what-if"){const b=(i>>>0&1)===1,v=((i>>>2)%45+5)/10,u=(i>>>8)%9+2,g=Array.from({length:5}).map((f,h)=>{const S=(i>>>h*3&255)/255*2-1;return Math.round((S*(b?1:-1)*4+(b?.6:-.6))*10)/10});return{...m,series:`30D AFTER · ${u}×`,kind:o(lt,16),anchor:`${b?"+":"−"}${v.toFixed(1)}%`,whatIfBars:g}}const w=(i>>>0)%70+10,y=((i>>>4)%200+50)/10;return{...m,kind:o(ct,0),anchor:o(dt,8),series:`${w} PIECES · ${y.toFixed(1)}K VIEWS`}}function gt({p:t,skillLabel:n,skillIcon:s,skillKol:p,skillCreator:i,skillId:o,onClick:x}){const m=(t.tickers??[]).slice(0,2),w=Ue(o),y=p?"rgba(0,0,0,0.05)":w.bg,b=p?"rgba(0,0,0,0.9)":w.fg;return e.jsxs("div",{onClick:x,className:"cursor-pointer",style:{background:"#ffffff",border:"0.5px solid var(--line-l3)",borderRadius:12,padding:4,display:"flex",flexDirection:"column",overflow:"hidden",width:"100%",transition:"box-shadow 180ms ease, transform 180ms ease"},onMouseEnter:v=>{D()&&(v.currentTarget.style.boxShadow="0 8px 22px rgba(0,0,0,0.06)",v.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:v=>{D()&&(v.currentTarget.style.boxShadow="none",v.currentTarget.style.transform="translateY(0)")},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"320 / 140",borderRadius:4,overflow:"hidden",flexShrink:0},children:e.jsx(ze,{input:ut(t,o)})}),e.jsxs("div",{style:{padding:"16px 12px 12px",display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,overflow:"hidden"},children:[e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:4,height:20,padding:"2px 6px",borderRadius:4,background:y,color:b,fontFamily:"'Delight', sans-serif",fontSize:12,lineHeight:"20px",letterSpacing:.12,fontWeight:400,whiteSpace:"nowrap",flexShrink:0},children:[p&&i?e.jsx(N,{name:i,size:12}):s&&e.jsx(V,{name:s,size:12,color:b}),n]}),m.map(v=>e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:4,height:20,padding:"2px 8px",borderRadius:4,background:"var(--b-r05)",color:"var(--text-n7)",fontFamily:"'Delight', sans-serif",fontSize:12,lineHeight:"20px",letterSpacing:.12,fontWeight:400,whiteSpace:"nowrap",flexShrink:0},children:[e.jsx(rt,{ticker:v}),v]},v))]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("p",{style:{fontSize:16,lineHeight:"26px",fontWeight:400,color:"var(--text-n9)",letterSpacing:.16,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",margin:0,height:28},children:t.title}),e.jsx("p",{style:{fontSize:12,lineHeight:"20px",color:"var(--text-n5)",letterSpacing:.12,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",margin:0,height:44},children:t.desc})]})]})]})}function ft(){return e.jsxs("div",{style:{background:"#ffffff",border:"0.5px solid var(--line-l12)",borderRadius:8,padding:4,display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"472 / 265.5",borderRadius:4,background:"var(--b-r05)"}}),e.jsxs("div",{style:{padding:"16px 12px 12px",display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("div",{style:{width:70,height:20,background:"var(--b-r07)",borderRadius:4}}),e.jsx("div",{style:{width:40,height:20,background:"var(--b-r05)",borderRadius:4}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[e.jsx("div",{style:{height:18,background:"var(--b-r07)",borderRadius:4,maxWidth:"60%"}}),e.jsx("div",{style:{height:12,background:"var(--b-r05)",borderRadius:4}}),e.jsx("div",{style:{height:12,background:"var(--b-r05)",borderRadius:4,maxWidth:"80%"}})]})]})]})}function xt({skills:t,onSelect:n,onMouseEnter:s,onMouseLeave:p,onRowHover:i,onRowLeave:o,onBackdrop:x}){const m=typeof window<"u"&&window.innerWidth<640,w=e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"more-skills-backdrop",onClick:x}),e.jsxs("div",{className:"more-skills-dropdown",role:"menu",onMouseEnter:m?void 0:s,onMouseLeave:m?void 0:p,children:[e.jsxs("div",{className:"more-skills-header",children:[e.jsx("span",{className:"more-skills-title",children:"More skills"}),e.jsx("button",{type:"button","aria-label":"Close",onClick:x,className:"more-skills-close",children:e.jsx(V,{name:"close-l1",size:16,color:"var(--text-n7)"})})]}),e.jsx("div",{className:"more-skills-dropdown-scroll",children:t.map(y=>e.jsxs("button",{type:"button",role:"menuitem",className:"more-skill-row",onClick:()=>n(y.id),onMouseEnter:m?void 0:b=>i==null?void 0:i(y.id,b.currentTarget.getBoundingClientRect()),onMouseLeave:m?void 0:()=>o==null?void 0:o(),children:[e.jsx(N,{name:y.creator,size:32}),e.jsxs("span",{className:"more-skill-text",children:[e.jsx("span",{className:"more-skill-name",children:y.label}),e.jsx("span",{className:"more-skill-author",children:y.creator})]})]},y.id))})]})]});return m&&typeof document<"u"?Ce.createPortal(w,document.body):w}const yt=45,bt=28,Me=1.2,ge=640;function vt({selected:t,maxWidth:n}){const[s,p]=l.useState(()=>typeof window<"u"?window.innerWidth<ge:!1);l.useEffect(()=>{const S=()=>p(window.innerWidth<ge);return S(),window.addEventListener("resize",S),()=>window.removeEventListener("resize",S)},[]);const i=s?bt:yt,x=Math.ceil(i*Me)*2,m=l.useRef(null),w=l.useRef(null),y=l.useRef(null),[b,v]=l.useState(1),[u,g]=l.useState(null),f=t?`Build your ${t.label}`:"Pick a skill and start building",h=!!(t!=null&&t.kol);return l.useLayoutEffect(()=>{const S=m.current,E=w.current;if(!S||!E)return;const O=()=>{var G;const W=S.clientWidth,H=y.current,j=h&&H?H.scrollWidth:0,_=window.innerWidth<ge,ee=!_&&h&&H?Math.max(220,W-j):W;E.style.maxWidth=`${ee}px`;const I=E.scrollHeight,te=I>x?x/I:1;if(v(te),h&&H){const Y=H.offsetHeight||32;if(_)g({top:-Y-6,left:Math.max(0,W-j)});else{const R=document.createRange();R.selectNodeContents(E);const q=R.getClientRects();(G=R.detach)==null||G.call(R);const re=S.getBoundingClientRect(),P=q.length>0?q[0]:null,ae=P?P.top-re.top:0,Q=(P?P.right-re.left:0)+8,B=Q+j>W?Math.max(0,W-j):Q,ne=ae+4-Y;g({top:ne,left:B})}}else g(null)};O();const $=new ResizeObserver(O);return $.observe(S),y.current&&$.observe(y.current),()=>$.disconnect()},[f,h]),e.jsxs("div",{ref:m,style:{position:"relative",width:"100%",maxWidth:n,height:x,display:"flex",alignItems:"center",justifyContent:"center",overflow:"visible"},children:[e.jsx("h1",{ref:w,style:{fontSize:i,lineHeight:Me,fontWeight:400,color:"var(--text-n9)",textAlign:"center",letterSpacing:.45,margin:0,animation:"newchat-fadeup 240ms ease-out",transform:`scale(${b})`,transformOrigin:"center"},children:f},(t==null?void 0:t.id)??"default"),h&&t&&e.jsxs("div",{ref:y,style:{position:"absolute",top:u?u.top:0,left:u?u.left:0,visibility:u?"visible":"hidden",transformOrigin:"left center",animation:"newchat-bubble-pop 380ms cubic-bezier(0.34, 1.56, 0.64, 1) 700ms backwards",display:"flex",alignItems:"center",gap:6,height:32,padding:"0 12px 0 4px",background:"white",borderRadius:999,border:"0.5px solid var(--line-l07)",boxShadow:"0 6px 20px rgba(0,0,0,0.08)",whiteSpace:"nowrap"},children:[e.jsx(N,{name:t.creator,size:24}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"22px",fontWeight:500,color:"var(--text-n9)",letterSpacing:.14},children:t.creator})]},`bubble-${t.id}`)]})}function kt({template:t,onClose:n,onSelect:s}){const p=t.tags??ye(t.id);return typeof document>"u"?null:Ce.createPortal(e.jsx("div",{onClick:n,style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"newchat-fade 160ms ease-out"},children:e.jsxs("div",{onClick:i=>i.stopPropagation(),style:{width:"100%",maxWidth:360,background:"#ffffff",borderRadius:14,padding:20,boxShadow:"0 20px 48px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.08)",animation:"newchat-fadeup 220ms ease-out"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("h2",{style:{fontFamily:"'Delight', sans-serif",fontSize:18,lineHeight:"24px",fontWeight:600,color:"var(--text-n9)",letterSpacing:.18,margin:0},children:t.label}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"16px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:500},children:xe(t.id)})]}),e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:13,lineHeight:"20px",color:"var(--text-n7)",letterSpacing:.13,margin:"10px 0 0"},children:t.description}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:10},children:p.slice(0,3).map(i=>e.jsx("span",{style:{height:20,padding:"0 6px",borderRadius:5,background:"var(--b-r05)",color:"var(--text-n5)",fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"20px",letterSpacing:.11,whiteSpace:"nowrap"},children:i},i))}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"20px 0 12px"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("div",{style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:10},children:[e.jsx(N,{name:t.creator,size:36}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"14px",color:"var(--text-n5)",letterSpacing:.11,fontWeight:500},children:"Created by"}),e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"20px",color:"var(--text-n9)",letterSpacing:.14,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.creator})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:6,flexShrink:0},children:be(t.creator).map(i=>e.jsx("a",{href:i.href,target:"_blank",rel:"noreferrer noopener","aria-label":i.label,style:{width:24,height:24,borderRadius:"9999px",background:"var(--b-r05)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:i.render()},i.key))})]}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"12px 0 20px"}}),e.jsx("button",{type:"button",onClick:s,style:{width:"100%",height:44,border:"none",borderRadius:10,background:"var(--main-m1)",color:"#fff",fontFamily:"'Delight', sans-serif",fontSize:14,fontWeight:500,letterSpacing:.14,cursor:"pointer"},children:"Pick this skill"})]})}),document.body)}const U=960;function Ct({onNavigate:t,onOpenSearch:n,variant:s="default"}){const p=s==="opt2",[i,o]=l.useState(null),[x,m]=l.useState(null),[w,y]=l.useState(""),[b,v]=l.useState(""),[u,g]=l.useState(null),[f,h]=l.useState(!1),[S,E]=l.useState(null);l.useEffect(()=>{if(typeof document>"u")return;const r=!!S||f;return document.body.classList.toggle("nc-overlay-open",r),()=>{document.body.classList.remove("nc-overlay-open")}},[S,f]);const[O,$]=l.useState(()=>typeof window<"u"?window.innerWidth<640:!1);l.useEffect(()=>{const r=()=>$(window.innerWidth<640);return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]);const[W,H]=l.useState(()=>typeof window>"u"?3:window.innerWidth<640?1:window.innerWidth<1024?2:3);l.useEffect(()=>{const r=()=>{const c=window.innerWidth;H(c<640?1:c<1024?2:3)};return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]);const j=l.useRef(null),_=()=>{j.current!==null&&(window.clearTimeout(j.current),j.current=null)},ee=()=>{_(),j.current=window.setTimeout(()=>h(!1),180)},I=l.useRef(null),te=l.useRef(null),G=l.useRef(null),Y=()=>{G.current!==null&&(window.clearTimeout(G.current),G.current=null)},R=()=>{Y(),G.current=window.setTimeout(()=>g(null),160)},q=(r,c,C="auto")=>{if(C==="left"){Y(),g({id:r,rect:c,placeAbove:!1,side:"left"});return}let M=!1;I.current&&I.current.querySelectorAll('button, [role="button"]').forEach(L=>{L.getBoundingClientRect().top>c.bottom-1&&(M=!0)}),Y(),g({id:r,rect:c,placeAbove:M,side:"auto"})},[re,P]=l.useState(!1),[ae,ie]=l.useState(!1);l.useEffect(()=>{const r=setTimeout(()=>v(w),700);return()=>clearTimeout(r)},[w]),l.useEffect(()=>{if(!f)return;const r=C=>{var L,X,A;const M=C.target;if((L=te.current)!=null&&L.contains(M))return;const d=M;(X=d==null?void 0:d.closest)!=null&&X.call(d,".more-skills-dropdown")||(A=d==null?void 0:d.closest)!=null&&A.call(d,".more-skills-backdrop")||h(!1)},c=C=>{C.key==="Escape"&&h(!1)};return document.addEventListener("mousedown",r),document.addEventListener("keydown",c),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",c)}},[f]),l.useEffect(()=>{if(!i){P(!1),ie(!1);return}P(!1),ie(!1);const r=setTimeout(()=>P(!0),900),c=setTimeout(()=>ie(!0),1500);return()=>{clearTimeout(r),clearTimeout(c)}},[i]);const se=l.useMemo(()=>Xe(b),[b]),Q=!i&&se.length>0,k=l.useMemo(()=>i&&(de.find(r=>r.id===i)||pe.find(r=>r.id===i)||me.find(r=>r.id===i))||null,[i]),B=l.useMemo(()=>[...de,...pe,...me],[]),ne=l.useRef(null);l.useRef(null);const[K,Le]=l.useState(new Set);l.useLayoutEffect(()=>{const r=()=>{const C=I.current;if(!C)return;const M=Array.from(C.querySelectorAll("button[data-skill-id]")),d=C.querySelector("[data-more-wrap]");if(!d)return;M.forEach(z=>{z.style.display=""}),d.style.display="";const L=[],X=window.innerWidth<640?4:2,A=()=>{const Z=[...new Set([...M.filter(F=>F.style.display!=="none").map(F=>F.offsetTop),d.offsetTop])].sort((F,ce)=>F-ce).indexOf(d.offsetTop);return Z>=0&&Z<=X-1};let oe=M.length;for(;oe-- >0&&!A();){const z=M.filter(ce=>ce.style.display!=="none");if(z.length===0)break;const Z=z[z.length-1],F=Z.dataset.skillId;F&&L.push(F),Z.style.display="none",C.offsetWidth}L.length===0&&(d.style.display="none");const le=new Set(L);le.size===K.size&&[...le].every(z=>K.has(z))||Le(le)};r();const c=new ResizeObserver(r);return I.current&&c.observe(I.current),window.addEventListener("resize",r),()=>{c.disconnect(),window.removeEventListener("resize",r)}},[B,K,i]);const J=l.useMemo(()=>B.filter(r=>K.has(r.id)),[B,K]);J.length>0;const De=r=>{if(O){E(r),h(!1),g(null);return}o(c=>c===r?null:r),g(null),h(!1)},Ee=r=>{if(O){E(r),g(null);return}o(r),g(null),h(!1)},je=()=>{S&&(o(S),E(null),h(!1))},Ie=()=>o(null),ve=r=>m({text:r,seq:Date.now()}),Re=r=>{t(r==="__agent__"?"agent":`thread/${r}`)},ke=u?de.find(r=>r.id===u.id)||pe.find(r=>r.id===u.id)||me.find(r=>r.id===u.id):null;return e.jsxs(Ne,{activePage:p?"new-chat-opt2":"new-chat",onNavigate:t,onOpenSearch:n,children:[e.jsx("style",{children:`
        @keyframes newchat-fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes newchat-fade{from{opacity:0}to{opacity:1}}
        @keyframes newchat-bubble-pop{
          0%{opacity:0;transform:scale(0.55)}
          55%{opacity:1;transform:scale(1.08)}
          100%{opacity:1;transform:scale(1)}
        }
        @keyframes newchat-skeleton{
          0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}
        }
        .nc-skeleton-anim{animation:newchat-skeleton 1.4s ease-in-out infinite}
        button.nc-pill{display:flex}
        .nc-prompt-row{
          display:flex;
          align-items:center;
          gap:12px;
          padding:12px;
          background:transparent;
          border:none;
          border-radius:8px;
          text-align:left;
          cursor:pointer;
          width:100%;
          transition:background 0.15s, transform 0.15s;
        }
        .nc-prompt-text{
          flex:1;
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:22px;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media (max-width: 639px){
          .newchat-page-topbar{display:none}
          /* mobile pill：尺寸更小，单行能放更多 */
          .nc-pill{
            height:40px !important;
            padding:0 14px !important;
            font-size:14px !important;
            line-height:22px !important;
            gap:8px !important;
            letter-spacing:0.14px !important;
          }
          .nc-pill > img,
          .nc-pill > div[class*="rounded-full"]{
            width:22px !important;
            height:22px !important;
            min-width:22px !important;
            min-height:22px !important;
          }
          .nc-pill > div[role="img"],
          .nc-pill .block{
            width:16px !important;
            height:16px !important;
          }
          .nc-hero-section{
            padding:56px 16px 12px !important;
            gap:24px !important;
          }
          /* 移动端输入框内边距收紧 */
          .chat-input-wrapper{
            padding:12px !important;
            gap:8px !important;
          }
          .nc-prompts-container{
            margin-top:0 !important;
            max-width:none !important;
          }
          .nc-prompt-row{
            padding:12px 4px;
            background:transparent;
            border-radius:0;
            margin-bottom:0;
          }
          /* 每个 prompt 被包了一层 div 用于动画，所以 :last-child 总是匹配。
             改为给非最后一个的"包装层"加底边（向下挂分割线）。 */
          .nc-prompts-container > div > div:not(:last-child){
            border-bottom:0.5px solid var(--line-l07);
          }
          .nc-prompt-text{
            font-size:13px;
            line-height:20px;
            white-space:normal;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
          }
          .nc-cards-section{
            padding:12px 16px 80px !important;
          }
        }
        @media (hover: hover){
          .nc-creator-link:hover{background:var(--b-r05)}
          .nc-creator-link:hover .nc-creator-link-name{color:var(--main-m1);text-decoration:underline;text-underline-offset:2px}
        }
        .more-skills-dropdown{
          position:absolute;
          top:calc(100% + 8px);
          right:0;
          width:320px;
          background:#fff;
          border:0.5px solid var(--line-l2);
          border-radius:8px;
          box-shadow:var(--shadow-s);
          z-index:20;
          animation:newchat-fadeup 160ms ease-out;
          overflow:hidden;
        }
        .more-skills-dropdown-scroll{
          max-height:360px;
          overflow-y:auto;
          padding:6px;
        }
        .more-skill-row{
          display:flex;
          align-items:center;
          gap:10px;
          width:100%;
          padding:8px 12px;
          border:none;
          background:transparent;
          text-align:left;
          cursor:pointer;
          border-radius:8px;
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover{
            background:var(--b-r05);
          }
        }
        .more-skills-backdrop{display:none}
        .more-skills-header{display:none}
        @media (max-width: 639px){
          .more-skills-backdrop{
            display:block;
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.45);
            z-index:9998;
            animation:newchat-fade 200ms ease-out;
          }
          .more-skills-dropdown{
            position:fixed !important;
            z-index:9999 !important;
            top:auto !important;
            right:0 !important;
            left:0 !important;
            bottom:0 !important;
            width:100% !important;
            border-radius:14px 14px 0 0 !important;
            animation:newchat-sheet-up 220ms cubic-bezier(0.2,0.8,0.2,1);
          }
          .more-skills-dropdown::before{
            content:"";
            display:block;
            width:36px;
            height:4px;
            border-radius:2px;
            background:rgba(0,0,0,0.18);
            margin:8px auto 4px;
          }
          .more-skills-header{
            display:flex !important;
            align-items:center;
            justify-content:space-between;
            padding:14px 16px 8px;
          }
          .more-skills-title{
            font-family:'Delight',sans-serif;
            font-size:16px;
            line-height:22px;
            font-weight:600;
            color:var(--text-n9);
            letter-spacing:0.16px;
          }
          .more-skills-close{
            width:24px;
            height:24px;
            border:none;
            background:transparent;
            padding:0;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
          }
          .more-skills-dropdown-scroll{
            max-height:60vh !important;
            padding:4px 12px 32px !important;
            display:flex !important;
            flex-direction:column;
            gap:8px;
          }
          .more-skill-row{
            padding:18px 16px !important;
            background:var(--b-r05) !important;
            border-radius:12px !important;
            gap:14px !important;
          }
          .more-skill-row:active{
            background:var(--b-r07) !important;
          }
          .more-skill-name{
            font-size:15px !important;
            line-height:20px !important;
          }
          .more-skill-author{
            font-size:13px !important;
            line-height:18px !important;
          }
          /* 移动端 sheet 行底色已是灰，icon tile 用白色避免叠灰 */
          .more-skill-icon-wrap{
            background:#fff !important;
          }
        }
        @keyframes newchat-sheet-up{
          from{transform:translateY(100%)}
          to{transform:translateY(0)}
        }
        .more-skill-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .more-skill-name{
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:20px;
          font-weight:400;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-icon-wrap{
          width:32px;
          height:32px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          /* 桌面默认灰底，hover 时变白让 icon 浮起 */
          background:var(--b-r05);
          border:1px solid var(--line-l12);
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover .more-skill-icon-wrap{
            background:#fff;
          }
        }
        /* 圆头像加弱边框，避免在灰底上融掉 */
        .more-skill-row > div[class*="rounded-full"],
        .more-skill-row > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
        }

        /* ══════ Opt2 page skill cards (manual columns / hover-reveal) ══════
           列数由 JS 根据视口算好；每列是独立 flex column，列之间不会互相影响。
           Round-robin 分布让高优 skill 落在每一列的顶部。 */
        .nc-skill-masonry{
          display:flex;
          gap:12px;
          align-items:flex-start;
        }
        .nc-skill-col{
          flex:1 1 0;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        .nc-skill-card{
          display:block;
          width:100%;
          background:#fff;
          border:0.5px solid var(--line-l07);
          border-radius:12px;
          padding:16px;
          font-family:inherit;
          cursor:pointer;
          text-align:left;
          transition:box-shadow 160ms ease, border-color 160ms ease;
        }
        .nc-skill-card:focus-visible{
          outline:2px solid rgba(73,163,166,0.6);
          outline-offset:2px;
        }
        @media (hover: hover){
          .nc-skill-card:hover{
            box-shadow:0 6px 18px rgba(0,0,0,0.06);
            border-color:rgba(0,0,0,0.14);
          }
        }
        .nc-skill-card-header{
          display:flex;
          align-items:center;
          /* gap 改为 thumb / icon 自带 margin-right，方便 hover 时一起平滑收起 */
        }
        .nc-skill-card-creator-thumb{
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          margin-right:12px;
          /* hover 时 visibility:hidden 让头像瞬间消失但仍占位，让旁边的文字
             用 transform 平滑滑到左侧（headline + meta 一起平移）。 */
        }
        .nc-skill-card-creator-thumb > div[class*="rounded-full"],
        .nc-skill-card-creator-thumb > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
        }
        .nc-skill-card-icon-wrap{
          width:36px;
          height:36px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          background:var(--b-r05);
          border:1px solid var(--line-l12);
          margin-right:12px;
        }
        .nc-skill-card-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .nc-skill-card-name{
          font-family:'Delight',sans-serif;
          font-size:15px;
          line-height:20px;
          font-weight:600;
          color:var(--text-n9);
          letter-spacing:0.15px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .nc-skill-card-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .nc-skill-card-text{
          transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          /* 顶部头像直接 invisible（瞬间消失但保留占位），name+subtitle 用 transform
             平滑左移 48px（头像 36 + margin-right 12）滑到左侧。 */
          .nc-skill-card:hover .nc-skill-card-creator-thumb{
            visibility:hidden;
          }
          /* 用相邻兄弟选择器：只对头像类卡片的 text 平移；icon 类卡片（图标不消失）不动。 */
          .nc-skill-card:hover .nc-skill-card-creator-thumb + .nc-skill-card-text{
            transform:translateX(-48px);
          }
        }
        .nc-skill-card-desc{
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:20px;
          color:var(--text-n7);
          letter-spacing:0.13px;
          margin:12px 0 0;
        }
        /* hover 之前隐藏，hover 时挤出。
           - 默认（鼠标移走时生效）：起手就收，曲线偏 ease-in，让卡片立刻往回缩。
           - hover（展开时生效）：Material 标准曲线，整段均匀流速能看到在涨高。 */
        /* 用 grid-template-rows 0fr → 1fr 的技巧把高度直接动画到 content 真实高度，
           避免 max-height 从 360px 先无效地缩回到 content 实际高度的"前置无视觉空走"。 */
        .nc-skill-card-extra-wrap{
          display:grid;
          grid-template-rows:0fr;
          /* 默认（收回）：起手即最快，鼠标一离开就开始缩 */
          transition:grid-template-rows 200ms ease-out;
        }
        .nc-skill-card-extra{
          overflow:hidden;
          opacity:0;
          transition:opacity 160ms ease-out;
        }
        @media (hover: hover){
          .nc-skill-card:hover .nc-skill-card-extra-wrap{
            grid-template-rows:1fr;
            transition:grid-template-rows 320ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          .nc-skill-card:hover .nc-skill-card-extra{
            opacity:1;
          }
        }
        @media (hover: none){
          .nc-skill-card-extra-wrap{
            grid-template-rows:1fr;
          }
          .nc-skill-card-extra{
            opacity:1;
          }
        }
        /* 触屏：始终显示 */
        @media (hover: none){
          .nc-skill-card-extra{
            max-height:none;
            opacity:1;
          }
        }
        .nc-skill-card-tags{
          display:flex;
          flex-wrap:wrap;
          gap:5px;
          margin-top:12px;
        }
        .nc-skill-card-tag{
          height:20px;
          padding:0 6px;
          border-radius:5px;
          background:var(--b-r05);
          color:var(--text-n5);
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:20px;
          letter-spacing:0.11px;
          white-space:nowrap;
        }
        .nc-skill-card-divider{
          height:1px;
          background:var(--line-l07);
          margin:12px 0;
        }
        .nc-skill-card-creator{
          display:flex;
          align-items:center;
          gap:10px;
        }
        .nc-skill-card-creator > div[class*="rounded-full"],
        .nc-skill-card-creator > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
          flex-shrink:0;
        }
        .nc-skill-card-creator-text{
          display:flex;
          flex-direction:column;
          flex:1 1 auto;
          min-width:0;
        }
        .nc-skill-card-creator-socials{
          display:flex;
          align-items:center;
          gap:6px;
          flex-shrink:0;
          margin-left:auto;
        }
        .nc-skill-card-creator-social{
          width:24px;
          height:24px;
          border-radius:9999px;
          background:var(--b-r05);
          display:inline-flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          transition:background 120ms ease;
        }
        .nc-skill-card-creator-social:hover{ background:rgba(0,0,0,0.1); }
        .nc-skill-card-creator-caps{
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:14px;
          color:rgba(0,0,0,0.4);
          letter-spacing:0.11px;
          font-weight:400;
        }
        .nc-skill-card-creator-name{
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:18px;
          color:var(--text-n9);
          letter-spacing:0.13px;
          font-weight:500;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media (max-width: 639px){
          .nc-skill-card{ padding:14px; }
        }
      `}),e.jsxs("div",{className:"h-screen overflow-y-auto relative",style:{backgroundColor:"var(--grey-g01)"},children:[e.jsx("div",{className:"flex items-center gap-[16px] h-[56px] px-[28px] shrink-0 newchat-page-topbar",style:{position:"sticky",top:0,zIndex:5,background:"transparent"},children:e.jsx("div",{className:"flex-1 min-w-0",children:e.jsx(Oe,{activeId:"new",onSelect:Re,trigger:e.jsxs("div",{className:"flex gap-[4px] items-center min-w-0 cursor-pointer",children:[e.jsx("p",{className:"font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate",children:"New Chat"}),e.jsx(V,{name:"arrow-down-f2",size:14,color:"var(--text-n2)"})]})})})}),e.jsxs("section",{className:"nc-hero-section",style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",gap:40,padding:"56px 24px 32px",position:"relative",zIndex:2},children:[e.jsx(vt,{selected:k,maxWidth:U}),e.jsx("div",{style:{width:"100%",maxWidth:U,position:"relative",zIndex:1},children:e.jsx(Pe,{shadow:!0,hideSkill:!0,hideInspector:!0,bottomChip:k?{label:k.label,icon:k.kol?void 0:k.icon??Ve,avatar:k.kol?k.creator:void 0,onRemove:Ie}:null,injectText:x,onInputChange:y})}),Q&&e.jsx("div",{className:"nc-prompts-container",style:{width:"100%",maxWidth:U,position:"relative",zIndex:1,marginTop:-16,display:"flex",flexDirection:"column"},children:se.map((r,c)=>e.jsx("div",{style:{animation:"newchat-fadeup 320ms ease-out both",animationDelay:`${c*110}ms`},children:e.jsx(Ae,{text:r,onClick:()=>ve(r)})},c))},b),!p&&!k&&!Q&&e.jsxs("div",{ref:I,style:{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",position:"relative",zIndex:1,width:"100%",maxWidth:900},children:[B.map(r=>e.jsxs("button",{"data-skill-id":r.id,className:"nc-pill",onClick:()=>De(r.id),onMouseEnter:c=>{D()&&(c.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",c.currentTarget.style.transform="translateY(-2px)",q(r.id,c.currentTarget.getBoundingClientRect()))},onMouseLeave:c=>{D()&&(c.currentTarget.style.boxShadow="none",c.currentTarget.style.transform="translateY(0)",R())},style:{...he,background:i===r.id?"#f3f8f8":"white"},children:[r.kol?e.jsx(N,{name:r.creator,size:22}):r.icon&&e.jsx(V,{name:r.icon,size:16,color:"var(--text-n7)"}),r.label]},r.id)),!p&&e.jsxs("div",{ref:te,"data-more-wrap":!0,style:{position:"relative"},children:[e.jsxs("button",{ref:ne,type:"button",className:"nc-pill","aria-expanded":f,"aria-label":"More skills",style:{...he,cursor:"pointer",background:f?"#f3f8f8":"white",border:f?"0.5px solid rgba(73,163,166,0.45)":he.border},onMouseEnter:r=>{D()&&(O||(r.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",r.currentTarget.style.transform="translateY(-2px)",_(),J.length>0&&h(!0),g(null)))},onMouseLeave:r=>{D()&&(O||(r.currentTarget.style.boxShadow="none",r.currentTarget.style.transform="translateY(0)",ee()))},onClick:()=>{O&&J.length>0&&h(r=>!r)},children:["More",e.jsx(V,{name:"arrow-down-l2",size:14,color:"var(--text-n5)"})]}),f&&J.length>0&&e.jsx(xt,{skills:J,onSelect:Ee,onMouseEnter:_,onMouseLeave:ee,onRowHover:(r,c)=>q(r,c,"left"),onRowLeave:R,onBackdrop:()=>h(!1)})]})]}),k&&e.jsx("div",{className:"nc-prompts-container",style:{width:"100%",maxWidth:U,position:"relative",zIndex:1,marginTop:-16,display:"flex",flexDirection:"column"},children:re?e.jsx("div",{style:{animation:"newchat-fade 280ms ease-out"},children:k.prompts.slice(0,3).map((r,c)=>e.jsx("div",{style:{animation:"newchat-fadeup 320ms ease-out both",animationDelay:`${c*70}ms`},children:e.jsx(Ae,{text:r,onClick:()=>ve(r)})},c))}):e.jsxs("div",{className:"nc-skeleton-anim",style:{animation:"newchat-fade 200ms ease-out"},children:[e.jsx(ue,{widthPct:92}),e.jsx(ue,{widthPct:70}),e.jsx(ue,{widthPct:82})]})})]}),p&&!k&&(()=>{const r=Math.max(1,W),c=Array.from({length:r},()=>[]);return B.forEach((C,M)=>c[M%r].push(C)),e.jsx("section",{className:"nc-skills-grid-section",style:{width:"100%",maxWidth:U+48,margin:"0 auto",padding:"0 24px 80px",position:"relative",zIndex:2},children:e.jsx("div",{className:"nc-skill-masonry",children:c.map((C,M)=>e.jsx("div",{className:"nc-skill-col",children:C.map((d,L)=>{const X=d.tags??ye(d.id);return e.jsxs("article",{role:"button",tabIndex:0,className:"nc-skill-card",onClick:()=>{o(d.id),g(null),h(!1)},onKeyDown:A=>{(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),o(d.id),g(null),h(!1))},style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${Math.min(M+L*r,12)*30}ms`},children:[e.jsxs("header",{className:"nc-skill-card-header",children:[d.kol?e.jsx("span",{className:"nc-skill-card-creator-thumb",children:e.jsx(N,{name:d.creator,size:36})}):d.icon?e.jsx("span",{className:"nc-skill-card-icon-wrap",children:e.jsx(V,{name:d.icon,size:20,color:"var(--text-n7)"})}):e.jsx("span",{className:"nc-skill-card-creator-thumb",children:e.jsx(N,{name:d.creator,size:36})}),e.jsxs("span",{className:"nc-skill-card-text",children:[e.jsx("span",{className:"nc-skill-card-name",children:d.label}),e.jsxs("span",{className:"nc-skill-card-author",children:["by ",d.creator," · ",xe(d.id)]})]})]}),e.jsx("p",{className:"nc-skill-card-desc",children:d.description}),e.jsx("div",{className:"nc-skill-card-tags",children:X.slice(0,3).map(A=>e.jsx("span",{className:"nc-skill-card-tag",children:A},A))}),e.jsx("div",{className:"nc-skill-card-extra-wrap",children:e.jsxs("div",{className:"nc-skill-card-extra",children:[e.jsx("div",{className:"nc-skill-card-divider"}),e.jsxs("div",{className:"nc-skill-card-creator",children:[e.jsx(N,{name:d.creator,size:28}),e.jsxs("div",{className:"nc-skill-card-creator-text",children:[e.jsx("span",{className:"nc-skill-card-creator-caps",children:"Created by"}),e.jsx("span",{className:"nc-skill-card-creator-name",children:d.creator})]}),e.jsx("div",{className:"nc-skill-card-creator-socials",children:be(d.creator).map(A=>e.jsx("a",{href:A.href,target:"_blank",rel:"noreferrer noopener","aria-label":A.label,onClick:oe=>oe.stopPropagation(),className:"nc-skill-card-creator-social",children:A.render()},A.key))})]})]})})]},d.id)})},M))})})})(),k&&e.jsx("section",{className:"nc-cards-section",style:{width:"100%",maxWidth:U+48,margin:"0 auto",padding:"0 24px 80px",display:"flex",flexDirection:"column",gap:12,position:"relative",zIndex:2},children:ae?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:12,animation:"newchat-fade 320ms ease-out"},children:k.playbooks.slice(0,6).map((r,c)=>e.jsx("div",{style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${c*50}ms`},children:e.jsx(gt,{p:r,skillId:k.id,skillLabel:k.label,skillIcon:k.icon,skillKol:k.kol,skillCreator:k.creator,onClick:()=>{sessionStorage.setItem("autoOpenChatPanel","1"),t("new-chat")}})},r.id))}):e.jsx("div",{className:"nc-skeleton-anim",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:12,animation:"newchat-fade 200ms ease-out"},children:Array.from({length:6}).map((r,c)=>e.jsx(ft,{},c))})},k.id)]}),u&&ke&&e.jsx(Je,{template:ke,anchor:u.rect,placeAbove:u.placeAbove,side:u.side,onMouseEnter:Y,onMouseLeave:R}),S&&(()=>{const r=B.find(c=>c.id===S);return r?e.jsx(kt,{template:r,onClose:()=>E(null),onSelect:je}):null})()]})}export{Ct as default};
