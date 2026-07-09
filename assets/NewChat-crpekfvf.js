import{r as l,j as e}from"./index-88P1ViMt.js";import{A as Fe,T as He,C as I,a as We,b as N,r as Se}from"./AppShell-BWu6w4VQ.js";import{T as Ge,a as Ye,P as Xe}from"./TrendingFilterBar-DSc5jS7p.js";import{C as Ve}from"./referral-mock-Bd3ulMO5.js";import{A as _e,F as $e}from"./FeedDetailModal-BsDpfPU5.js";import{b as qe,P as Ue,a as Qe,c as Je}from"./PlaybookCard-CdsR5IqU.js";import{PLAYBOOKS_ORDERED as ge,chipMatchesPlaybook as Ke}from"./Explore2-CbWAlLba.js";const i=Ve,Ze=[{id:"extra-hyperscaler-capex",title:"Hyperscaler Capex Tracker",creator:"Macro Scope X",desc:"Quarterly roll-up of MSFT / AMZN / GOOGL / META capex guidance, mapped to AI-infra beneficiaries with accel/decel flags.",tickers:["MSFT","AMZN","GOOGL","META"],color:i.primary,stars:489,remixes:72},{id:"extra-gold-regime",title:"Gold Regime Dashboard",creator:"Sheer YLL YGG",desc:"Real-yield, DXY, and central-bank-buying regime overlay for gold with confidence-scored regime shifts.",tickers:["GLD","GDX","DXY"],color:i.orange,stars:342,remixes:51},{id:"extra-eth-l2",title:"ETH L2 Market Share",creator:"YGGYLL",desc:"Live TVL, daily txns, and fee capture across Base / Arbitrum / Optimism / zkSync with revenue accrual to ETH mainnet.",tickers:["ETH","ARB","OP"],color:i.deepBlue,stars:276,remixes:44},{id:"extra-fomc-playbook",title:"FOMC Day Playbook",creator:"Harry Zzz",desc:"Intraday vol + rate-path positioning around every FOMC. Tracks dot-plot surprise, SEP revisions, and post-meeting rotation.",tickers:["SPY","TLT","VIX"],color:i.red,stars:198,remixes:29},{id:"extra-pair-trade",title:"Pair-Trade Radar",creator:"Alva Intern",desc:"Scans SPX + NDX pairs for 2σ spread dislocations with cointegration filter. Generates long/short candidates with sizing.",tickers:["KO","PEP","V","MA"],color:i.blue,stars:164,remixes:23},{id:"extra-dividend-alpha",title:"Dividend Aristocrat Alpha",creator:"Smart Jing",desc:"Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.",tickers:["SPX","NOBL"],color:i.green,stars:231,remixes:38}],h=r=>{if(r.length>=6)return r.slice(0,6);const a=6-r.length,s=new Set(r.map(n=>n.id)),d=[];for(const n of Ze){if(d.length>=a)break;s.has(n.id)||d.push(n)}return[...r,...d]},ee=[{id:"theme-tracker",label:"Theme Tracker",icon:"bulb-l",creator:"Alva",description:"Build a live tracker for any market theme — surfaces sentiment, earnings, and policy catalysts across the basket weekly.",prompts:["Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names","Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts","Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators"],playbooks:h([{id:"ai-infra-theme",title:"AI Infra Theme Radar",creator:"Alva Intern",desc:"Tracks NVDA / AVGO / TSM + power grid enablers. Surfaces weekly sentiment + rev-beat signals and rebalances exposure to the strongest relative performers.",tickers:["NVDA","AVGO","TSM","VST"],color:i.primary,stars:312,remixes:48},{id:"glp1-theme",title:"GLP-1 Obesity Complex",creator:"Harry Zzz",desc:"Unified tracker for GLP-1 winners (LLY / NVO) and food/restaurant losers. Weekly sentiment scoring with catalyst calendar.",tickers:["LLY","NVO","AMGN"],color:i.orange,stars:186,remixes:22},{id:"nuclear-theme",title:"Nuclear Renaissance Monitor",creator:"Macro Scope X",desc:"Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.",tickers:["CCJ","SMR","VST","CEG"],color:i.deepBlue,stars:94,remixes:12}]),recCards:[{type:"playbook",playbook:{id:"tt-rec-pb",title:"AI Infra Theme Radar",creator:"Alva Intern",desc:"Tracks NVDA / AVGO / TSM + power enablers. Weekly sentiment and rev-beat signals, rebalances to the strongest relative performers.",tickers:["NVDA","AVGO","TSM","VST"],color:i.primary,stars:312,remixes:48}},{type:"playbook",playbook:{id:"tt-rec-pb2",title:"GLP-1 Obesity Complex",creator:"Harry Zzz",desc:"Unified tracker for GLP-1 winners (LLY / NVO) and food/restaurant losers. Weekly sentiment scoring with catalyst calendar.",tickers:["LLY","NVO"],color:i.orange,stars:186,remixes:22}},{type:"playbook",playbook:{id:"tt-rec-pb3",title:"Nuclear Renaissance Monitor",creator:"Macro Scope X",desc:"Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.",tickers:["CCJ","SMR"],color:i.deepBlue,stars:94,remixes:12}},{type:"push",push:{kind:"normal",id:"tt-rec-normal",timestamp:"May 8, 9:00 AM",source:"ai-infra-tracker",feedName:"ai-infra-digest",title:"【Blackwell ramp】· Hyperscaler orders pull forward into Q3, supply still tight",bullets:["🏭 TSMC CoWoS capacity booked through year-end; HBM remains the bottleneck","📈 AVGO raises AI revenue guide; custom-silicon pipeline expands","⚡ Grid + power names (VST, CEG) bid as data-center demand compounds","🧠 Context: hyperscaler capex revisions continue to climb — MSFT guided FY26 capex above consensus, AMZN reiterated full-year spend, GOOGL flagged TPU v6 ramp, and META lifted the low end of its range. Supply chain checks point to CoWoS-L allocation tightening through Q1 with HBM4 qualification slipping for at least one memory vendor.","📌 Watch next: NVDA GTC keynote (Mar 17) for Rubin platform details, AVGO earnings (Mar 5) for AI ASIC backlog update, and TSMC Feb revenue print for wafer-start confirmation. Any guide-down on CoWoS expansion would be the first crack in the thesis.","⚠️ Risk framing: basket is +38% YTD vs SMH +21%; positioning is crowded and a single hyperscaler capex cut headline could trigger a 5-8% air pocket. Keep position sizes inside the 2% single-name band."]}},{type:"push",push:{kind:"trade",id:"tt-rec-trade",timestamp:"May 8, 12:00 PM",source:"ai-infra-basket",feedName:"theme-rebalancer",rows:[{ticker:"NVDA",action:"Buy",detail:"weight 40%",dir:"up"},{ticker:"AVGO",action:"Buy",detail:"weight 35%",dir:"up"},{ticker:"TSM",action:"Buy",detail:"weight 25%",dir:"up"}],note:"Rebalance: tilt to compute + packaging leaders by 90d relative strength"}}]},{id:"smart-screener",label:"Smart Screener",icon:"target-l2",creator:"Alva",description:"Rank stocks by any factor combo, daily.",prompts:["Screen for US large-caps with rising earnings estimates and positive 20-day price momentum","Find cash-rich small-caps trading below 10x forward earnings with expanding gross margins","Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio"],playbooks:h([{id:"momentum-quality",title:"Momentum × Quality Screen",creator:"Smart Jing",desc:"Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, rebalances weekly with 2% stop-loss band.",tickers:["SPX","QQQ"],color:i.green,stars:241,remixes:37},{id:"cheap-cashcow",title:"Cheap Cash Cow Screener",creator:"Alva Intern",desc:"Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.",tickers:["R2K"],color:i.blue,stars:128,remixes:19},{id:"crypto-breakout",title:"Crypto Breakout Screen",creator:"YGGYLL",desc:"Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for further review.",tickers:["BTC","ETH","SOL","AVAX"],color:i.red,stars:76,remixes:9}]),recCards:[{type:"playbook",playbook:{id:"ss-rec-pb",title:"Momentum × Quality Screen",creator:"Smart Jing",desc:"Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, weekly rebalance with a 2% stop band.",tickers:["SPX","QQQ"],color:i.green,stars:241,remixes:37}},{type:"playbook",playbook:{id:"ss-rec-pb2",title:"Cheap Cash Cow Screener",creator:"Alva Intern",desc:"Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.",tickers:["R2K"],color:i.blue,stars:128,remixes:19}},{type:"playbook",playbook:{id:"ss-rec-pb3",title:"Crypto Breakout Screen",creator:"YGGYLL",desc:"Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for review.",tickers:["BTC","SOL"],color:i.red,stars:76,remixes:9}},{type:"push",push:{kind:"normal",id:"ss-rec-normal",timestamp:"May 8, 8:30 AM",source:"screener-run",feedName:"momentum-quality-screen",title:"【Daily screen】· 14 names enter the top decile, 9 drop out",bullets:["🟢 New entrants: ANET, FICO, GE — rising estimates + positive 20d momentum","🔴 Dropped: EW, MKTX — momentum decay below threshold","📊 Median forward P/E of the basket: 19.4x"]}},{type:"push",push:{kind:"kol",id:"ss-rec-kol",timestamp:"May 8, 11:00 AM",source:"kol-signal-relay",feedName:"kol-watch",kolName:"Smart Jing",headlineTicker:"$ANET",headlineText:'"Networking is the quiet winner of the AI buildout — backlog keeps compounding."',quoteTicker:"$ANET",quoteSide:"LONG",analysis:"Screen surfaces ANET on momentum × ROIC; the KOL view aligns with the quality-momentum thesis. No risk view stated."}}]},{id:"deep-dive",label:"Deep Dive",icon:"search-l",creator:"Alva",description:"A complete research package on any ticker. Pulls revenue segmentation from filings, builds a peer comparable set, traces the supply chain up and downstream, then drafts a bull and bear thesis with scenario-weighted price targets. Output is a single read-once briefing — no skimming required, no follow-up questions left dangling.",prompts:["Give me a deep-dive on NVDA — revenue segmentation, peer valuation, supply chain, and bull/bear thesis","Deep-dive TSMC: capacity, customer mix, geopolitical risk, and long-term margin trajectory","Full research on Solana: ecosystem activity, token economics, validator health, and competition vs ETH L2s"],playbooks:h([{id:"nvda-deepdive",title:"NVDA 360° Deep Dive",creator:"Sheer YLL YGG",desc:"End-to-end NVDA research — revenue segmentation, hyperscaler capex correlation, peer valuation, and scenario-based price targets.",tickers:["NVDA","AMD","AVGO"],color:i.primary,stars:412,remixes:58},{id:"tsmc-deepdive",title:"TSMC Long Thesis",creator:"Macro Scope X",desc:"Capacity roadmap, customer concentration, Arizona + Kumamoto fab ramps, geopolitical risk weighting, and 5Y margin path.",tickers:["TSM","2330.TW"],color:i.deepBlue,stars:163,remixes:21},{id:"sol-deepdive",title:"SOL Ecosystem Deep Dive",creator:"Harry Zzz",desc:"DEX volume, Firedancer progress, validator decentralization, revenue accrual, and valuation vs ETH + L2 peers.",tickers:["SOL"],color:i.orange,stars:87,remixes:13}])},{id:"daily-macro-brief",label:"Daily Macro Brief",kol:!0,creator:"Macro Scope X",description:"A daily breakdown of macro flows — rates, FX, and cross-asset signals — distilled into a 5-minute brief.",prompts:["Daily macro brief covering US rates, DXY, oil, and credit spreads with LLM commentary","Weekly China macro digest — credit impulse, property indicators, and policy shifts","Morning global risk dashboard for Asia → Europe → US cross-asset flows"],playbooks:h([{id:"daily-macro",title:"Daily Macro Brief",creator:"Macro Scope X",desc:"Auto-generated macro snapshot every US open — rates, DXY, oil, credit spreads, and LLM-authored summary of overnight drivers.",tickers:["DXY","CL","HYG"],color:i.deepBlue,stars:211,remixes:34},{id:"china-weekly",title:"China Macro Weekly",creator:"Harry Zzz",desc:"Weekly China credit impulse, property sales, and policy-move tracker. Flags deviations from trend and dispatches alerts.",tickers:["FXI","KWEB"],color:i.red,stars:58,remixes:6},{id:"global-risk",title:"Global Risk Cross-Asset",creator:"Smart Jing",desc:"Asia → Europe → US handoff dashboard tracking equity, rates, FX, and credit moves with regime-shift detection.",tickers:["SPY","EFA","EEM"],color:i.blue,stars:144,remixes:18}])},{id:"earnings-edge",label:"Earnings Edge",kol:!0,creator:"Smart Jing",description:"Whisper numbers and post-print drift, weekly.",prompts:["Summarize the latest NVDA earnings call and compare guidance to consensus","Whisper numbers + post-earnings drift scanner for next week’s MAG7 reports","Aggregate semis earnings read-across from TSM → ASML → Applied Materials → NVDA"],playbooks:h([{id:"earnings-whisper",title:"Earnings Whisper Board",creator:"Smart Jing",desc:"Crowdsourced + LLM whisper numbers + post-earnings drift tracker. Ranks names by whisper-vs-consensus gap for upcoming reports.",tickers:["AAPL","MSFT","NVDA","META"],color:i.primary,stars:182,remixes:27},{id:"semis-readacross",title:"Semis Read-Across",creator:"Alva Intern",desc:"Chain earnings read-across TSM → ASML → AMAT → NVDA. Quantifies lead-lag signal on each node of the supply chain.",tickers:["TSM","ASML","AMAT","NVDA"],color:i.orange,stars:74,remixes:10},{id:"mag7-postprint",title:"MAG7 Post-Print Drift",creator:"Harry Zzz",desc:"Backtests post-earnings drift across MAG7 by surprise magnitude and guide direction. Suggests entry windows.",tickers:["AAPL","MSFT","GOOGL","AMZN","NVDA","META","TSLA"],color:i.green,stars:102,remixes:14}])}],te=[{id:"crypto-pulse",label:"Crypto Pulse",kol:!0,creator:"Harry Zzz",description:"Spot tradable signal in noisy crypto. Aggregates news flow, on-chain activity, ETF flows, exchange balances, and stablecoin issuance into a single morning pulse — flags the names with statistically meaningful deviations and explains *why* in plain English so you can move before the desk does.",prompts:["Summarize the last 24h of news on Bitcoin and flag anything that moved price >2%","Scan top-50 tokens for 30D breakouts and rising active addresses","Track ETH L2 market share — TVL, txns, and fee accrual back to mainnet"],playbooks:h([{id:"btc-news",title:"BTC News Pulse",creator:"YGGYLL",desc:"24h news aggregator for BTC with sentiment scoring, price-correlation tagging, and auto-flagging of likely movers.",tickers:["BTC"],color:i.primary,stars:64,remixes:8},{id:"crypto-breakout-2",title:"Crypto Breakout Screen",creator:"YGGYLL",desc:"Scans top-50 tokens for 30D return > 30% combined with rising active-address count.",tickers:["BTC","ETH","SOL"],color:i.red,stars:76,remixes:9}])},{id:"what-if",label:"What If",icon:"remix-l",creator:"Alva",description:"Run scenarios. See your portfolio reprice.",prompts:["What if the Fed delivers 3 more cuts in 2026 — how should a balanced 60/40 portfolio reposition?","What if NVDA earnings miss consensus by 5% next quarter — which AI beneficiaries still outperform?","What if oil spikes to $120 on Middle East tension — sector rotation map and hedges"],playbooks:h([{id:"fed-cuts-scenario",title:"Fed-Cut Scenario Rebalancer",creator:"Smart Jing",desc:"Monte Carlo on 60/40 under 3 Fed cut paths (dovish / base / hawkish). Suggests duration + small-cap tilt adjustments each FOMC.",tickers:["AGG","IWM","SPY"],color:i.blue,stars:154,remixes:25},{id:"nvda-miss-scenario",title:"NVDA Miss Shockwave",creator:"Alva Intern",desc:"What-if engine for AI peer reaction to a 5% NVDA revenue miss. Ranks relative drawdowns and identifies resilient derivatives plays.",tickers:["NVDA","AVGO","AMD","MU"],color:i.red,stars:98,remixes:14},{id:"oil-spike-scenario",title:"Oil Spike Hedge Map",creator:"Macro Scope X",desc:"Maps SPX sector responses to a $120 oil scenario and proposes airline / transport hedges sized to portfolio oil-beta.",tickers:["XOM","CVX","DAL","FDX"],color:i.orange,stars:71,remixes:9}])},{id:"yield-hunter",label:"Yield Hunter",kol:!0,creator:"Sheer YLL YGG",description:"Hunts the highest risk-adjusted yield wherever it lives — Treasuries, IG and HY credit, preferreds, MLPs, REITs, and on-chain stablecoin lending. Normalizes spreads to common units, attaches default-probability and smart-contract-risk overlays where relevant, and ladders the result so you can rotate up or down the curve as regimes shift. Includes a tax-equivalent comparison across muni / corporate / pass-through structures.",prompts:["Compare 10Y Treasury yield vs IG/HY credit spreads with regime-shift highlights","Find dividend-growth names with 10+ years of growth and sub-60% payout ratio","Stablecoin yield ladder — Aave / Compound / Pendle with risk scores"],playbooks:h([{id:"div-aristocrat",title:"Dividend Aristocrat Alpha",creator:"Smart Jing",desc:"Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.",tickers:["SPX","NOBL"],color:i.green,stars:231,remixes:38},{id:"credit-ladder",title:"IG / HY Credit Ladder",creator:"Macro Scope X",desc:"Spread + duration ladder across IG and HY buckets with default-probability overlays and regime triggers.",tickers:["LQD","HYG"],color:i.blue,stars:89,remixes:12}])},{id:"dividend-diary",label:"Dividend Diary",kol:!0,creator:"Lily Lou",description:"A weekly diary of dividend hikes, cuts, and special distributions across SPX and global aristocrats.",prompts:["List companies that hiked dividends >10% this week and their payout coverage","Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio","Flag any SPX dividend cut announcements in the past 30 days"],playbooks:h([{id:"div-aristocrat-2",title:"Dividend Aristocrat Alpha",creator:"Smart Jing",desc:"Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.",tickers:["SPX","NOBL"],color:i.green,stars:231,remixes:38},{id:"div-hikes",title:"Weekly Dividend Hike Tracker",creator:"Lily Lou",desc:"Surfaces every SPX/RIY dividend hike each week with coverage, growth-streak, and post-announcement drift.",tickers:["SPX"],color:i.primary,stars:64,remixes:7}])},{id:"backtest",label:"Backtest",icon:"history-l",creator:"Alva",description:"Rule-based strategies, fully attributed.",prompts:["Backtest a monthly-rebalanced equal-weight MAG7 basket over the last 10 years","Backtest a BTC/ETH 70/30 portfolio rebalanced weekly with 15% max drawdown stop","Backtest buying TSM on days where NVDA gains >3%, exit on +10% TP or -5% SL"],playbooks:h([{id:"mag7-equal",title:"MAG7 Equal-Weight",creator:"Harry Zzz",desc:"Maintains a fully invested equal-weight MAG7 portfolio, rebalanced monthly. Tracks alpha vs SPX and records decomposition.",tickers:["AAPL","MSFT","GOOGL","AMZN","NVDA","META","TSLA"],color:i.blue,stars:89,remixes:14},{id:"nvda-tsm-bt",title:"NVDA +3% → TSM Entry",creator:"Smart Jing",desc:"Trigger-based backtest — buy TSM at close when NVDA gains >3%, exit on +10% TP or -5% SL. Full historical P&L attribution.",tickers:["NVDA","TSM"],color:i.red,stars:48,remixes:7},{id:"btc-macd-bt",title:"BTC MACD 1h Crossover",creator:"Macro Scope X",desc:"Backtests BTC MACD(12,26,9) crossover on 1h candles. Reports Sharpe, max DD, and sensitivity to parameter sweeps.",tickers:["BTC"],color:i.deepBlue,stars:34,remixes:5}])},{id:"valuation",label:"Valuation",icon:"credit-l",creator:"Alva",description:"Reverse-DCF, relative-multiple, and SOTP frameworks — value any asset like a sell-side analyst.",prompts:["Build a reverse-DCF for MSFT implied by the current share price and compare to peers","Relative valuation snapshot for the Mag7 — EV/Sales, P/E, and FCF yield vs 5Y median","SOTP valuation for Amazon — AWS / Retail / Ads / Prime / Logistics"],playbooks:h([{id:"mag7-relval",title:"MAG7 Relative Valuation",creator:"Alva Intern",desc:"Live EV/Sales, P/E NTM, and FCF yield table for MAG7 with z-score vs 5-year median. Highlights outliers automatically.",tickers:["AAPL","MSFT","GOOGL","AMZN","NVDA","META","TSLA"],color:i.primary,stars:142,remixes:23},{id:"amzn-sotp",title:"AMZN SOTP",creator:"Sheer YLL YGG",desc:"Sum-of-the-parts on Amazon — AWS, Retail, Ads, Prime, Logistics. Adjustable multiples per segment and scenario toggles.",tickers:["AMZN"],color:i.orange,stars:96,remixes:11}])}],re=[{id:"community-insider-buy-radar",label:"Insider Buy Radar",kol:!0,creator:"Deep Ledger",description:"Tracks clustered insider buys, 10b5-1 changes, and post-filing drift across US equities.",tags:["Filings","Insider Cluster","Event Drift"],uses:"1.8k uses",updatedAt:"23m ago",prompts:["Build an insider-buy radar for US mid-caps, filtering for clustered purchases above $250k","Track 10b5-1 changes and open-market buys for software stocks with positive earnings revisions","Flag insider purchases that happen within 30 days of guidance updates or activist filings"],playbooks:h([{id:"insider-cluster-us",title:"Clustered Insider Buy Monitor",creator:"Deep Ledger",desc:"Finds companies with multiple open-market insider purchases over a 14-day window and ranks them by purchase size, role seniority, and post-filing drift.",tickers:["SPX","R2K"],color:i.primary,stars:318,remixes:46},{id:"ceo-cfo-buys",title:"CEO / CFO Buy Signal",creator:"Deep Ledger",desc:"Filters insider buys to CEO and CFO activity, removes low-signal option exercises, and scores names against valuation and estimate revisions.",tickers:["IWM","QQQ"],color:i.blue,stars:204,remixes:28},{id:"activist-plus-insider",title:"Activist + Insider Overlap",creator:"Alva Intern",desc:"Watches activist filings and insider buying overlap, then builds a candidate list for event-driven deep dives.",tickers:["SPY","IWM"],color:i.orange,stars:147,remixes:19}])},{id:"community-whale-wallet-watch",label:"Whale Wallet Watch",kol:!0,creator:"WalletWatcher",description:"Flags large wallet movements, exchange inflows, stablecoin rotations, and funding stress.",tags:["On-chain Flow","Exchange Flow","Liquidity"],uses:"2.4k uses",updatedAt:"1h ago",prompts:["Track BTC whale movements above 1,000 BTC and alert when transfers move toward major exchanges","Build a stablecoin rotation monitor across USDT, USDC, and DAI with exchange inflow context","Watch SOL and ETH large-wallet activity alongside funding rates and spot volume"],playbooks:h([{id:"btc-whale-exchange-flow",title:"BTC Whale Exchange Flow",creator:"WalletWatcher",desc:"Tracks dormant-wallet movements, large exchange deposits, and spot volume confirmation to flag potential sell-pressure windows.",tickers:["BTC"],color:i.orange,stars:402,remixes:64},{id:"stablecoin-rotation",title:"Stablecoin Rotation Map",creator:"YGGYLL",desc:"Maps USDT / USDC flows by venue and chain, then scores whether liquidity is moving into or out of risk assets.",tickers:["USDT","USDC","BTC"],color:i.green,stars:288,remixes:41},{id:"sol-whale-pulse",title:"SOL Whale Pulse",creator:"Harry Zzz",desc:"Combines SOL whale transfers, perp funding, and DEX volume to surface early risk-on and risk-off rotations.",tickers:["SOL","ETH"],color:i.deepBlue,stars:166,remixes:24}])},{id:"community-options-flow-scanner",label:"Options Flow Scanner",kol:!0,creator:"Options Club",description:"Ranks unusual option flow by premium, sweep quality, open interest, and post-flow move.",tags:["Derivatives","Vol Surface","Positioning"],uses:"1.1k uses",updatedAt:"5h ago",prompts:["Scan unusual call buying in liquid US equities, filtering for premium above $1m and OI expansion","Build a weekly options-flow dashboard for MAG7 with sweep quality and implied-vol change","Flag bearish put flow that appears before earnings or guidance revisions"],playbooks:h([{id:"unusual-call-flow",title:"Unusual Call Flow Ranker",creator:"Options Club",desc:"Scores call sweeps by premium, liquidity, OI confirmation, and follow-through to reduce noisy single-print alerts.",tickers:["AAPL","NVDA","TSLA"],color:i.primary,stars:265,remixes:39},{id:"mag7-vol-flow",title:"MAG7 Vol Flow Board",creator:"Smart Jing",desc:"Combines options premium, IV change, and post-flow price action across MAG7 for a daily directional board.",tickers:["AAPL","MSFT","NVDA"],color:i.blue,stars:221,remixes:31},{id:"earnings-put-flow",title:"Pre-Earnings Put Flow",creator:"Macro Scope X",desc:"Watches put buying ahead of earnings and filters for flows that historically precede downside gaps.",tickers:["QQQ","SPY"],color:i.red,stars:119,remixes:15}])},{id:"community-semis-supply-chain",label:"Semis Supply Chain",kol:!0,creator:"Silicon Cycle",description:"Connects TSM, ASML, HBM vendors, and hyperscaler capex into one signal map.",tags:["Supply Chain","Capacity","Read-through"],uses:"3.2k uses",updatedAt:"1d ago",prompts:["Build a semis supply-chain tracker across NVDA, TSM, ASML, SK hynix, MU, and hyperscaler capex","Track HBM supply commentary and map read-through to GPU system shipments","Monitor TSM capacity, CoWoS packaging, and AI server demand signals in one weekly brief"],playbooks:h([{id:"hbm-bottleneck-map",title:"HBM Bottleneck Map",creator:"Silicon Cycle",desc:"Tracks HBM supply, packaging capacity, and memory-vendor commentary to explain bottlenecks in AI accelerator shipments.",tickers:["NVDA","MU","TSM"],color:i.deepBlue,stars:534,remixes:82},{id:"cowos-capacity-watch",title:"CoWoS Capacity Watch",creator:"Macro Scope X",desc:"Watches TSM advanced packaging updates, supplier lead times, and hyperscaler demand commentary.",tickers:["TSM","ASML"],color:i.primary,stars:346,remixes:47},{id:"ai-server-readthrough",title:"AI Server Read-Through",creator:"Alva Intern",desc:"Maps Dell, Super Micro, ODM, and component commentary back to AI infrastructure beneficiaries.",tickers:["DELL","SMCI","NVDA"],color:i.orange,stars:271,remixes:33}])},{id:"community-dividend-cut-guard",label:"Dividend Cut Guard",kol:!0,creator:"Cashflow Club",description:"Screens payout risk, FCF coverage, leverage, and management language before dividend cuts.",tags:["Payout Risk","FCF Coverage","Leverage"],uses:"760 uses",updatedAt:"2d ago",prompts:["Screen dividend stocks for payout risk using FCF coverage, leverage, and negative guidance language","Build a dividend cut watchlist for REITs and utilities with debt maturity pressure","Flag companies where dividend yield is high but free cash flow coverage is deteriorating"],playbooks:h([{id:"dividend-cut-watchlist",title:"Dividend Cut Watchlist",creator:"Cashflow Club",desc:"Ranks dividend stocks by FCF coverage, leverage trend, maturity wall, and management language risk.",tickers:["NOBL","SPX"],color:i.green,stars:186,remixes:23},{id:"reit-payout-risk",title:"REIT Payout Risk Monitor",creator:"Lily Lou",desc:"Combines payout ratios, debt maturities, and cap-rate pressure for REIT dividend sustainability scoring.",tickers:["VNQ","SPY"],color:i.blue,stars:128,remixes:14},{id:"yield-trap-screen",title:"Yield Trap Screen",creator:"Smart Jing",desc:"Screens high-yield names for deteriorating FCF, falling estimates, and leverage pressure.",tickers:["HYG","LQD"],color:i.red,stars:97,remixes:11}])},{id:"community-macro-brief-builder",label:"Macro Brief Builder",kol:!0,creator:"Market Bento",description:"Turns rates, FX, oil, credit, and equity futures into a concise daily macro brief.",tags:["Cross-asset","Rates & FX","Risk Regime"],uses:"920 uses",updatedAt:"3h ago",prompts:["Create a daily macro brief from rates, DXY, oil, credit spreads, and equity futures","Summarize today’s cross-asset risk regime and explain what changed since yesterday","Build a morning brief for Asia to US market handoff with rates, FX, and commodity context"],playbooks:h([{id:"cross-asset-morning-brief",title:"Cross-Asset Morning Brief",creator:"Market Bento",desc:"Summarizes rates, FX, oil, credit, and equity futures into a concise macro regime note before the US open.",tickers:["DXY","TLT","SPY"],color:i.deepBlue,stars:214,remixes:31},{id:"risk-regime-score",title:"Risk Regime Score",creator:"Macro Scope X",desc:"Combines VIX, credit spreads, DXY, and rates momentum into a daily risk-on / risk-off score.",tickers:["VIX","HYG","DXY"],color:i.red,stars:172,remixes:21},{id:"asia-us-handoff",title:"Asia to US Handoff",creator:"Harry Zzz",desc:"Turns Asia and Europe market moves into a US premarket brief with ETF and futures context.",tickers:["EFA","EEM","SPY"],color:i.orange,stars:143,remixes:18}])},{id:"community-short-squeeze-radar",label:"Short Squeeze Radar",kol:!0,creator:"Float Hunter",description:"Surfaces high short-interest names with rising borrow rates and tightening float dynamics.",tags:["Short Interest","Borrow Rate","Float"],uses:"1.3k uses",updatedAt:"40m ago",prompts:["Find R2K names with SI > 20% of float and borrow rate above 15%","Rank squeeze candidates by days-to-cover and recent retail flow"],playbooks:h([{id:"r2k-squeeze-radar",title:"R2K Squeeze Radar",creator:"Float Hunter",desc:"Ranks Russell 2000 names by short-interest, borrow rate, and days-to-cover with retail-flow overlay.",tickers:["IWM","R2K"],color:i.red,stars:251,remixes:33}])},{id:"community-etf-flow-tracker",label:"ETF Flow Tracker",kol:!0,creator:"Flowmaster",description:"Daily net creations and redemptions across sector, factor, and thematic ETFs with regime context.",tags:["ETF Flow","Sector Rotation","Positioning"],uses:"2.1k uses",updatedAt:"2h ago",prompts:["Show ETF flows by sector for the last 5 trading days","Map factor-ETF inflows to underlying single-name leadership"],playbooks:h([{id:"sector-etf-flow",title:"Sector ETF Flow Board",creator:"Flowmaster",desc:"Daily net flows across XLK / XLF / XLE etc. with leadership scoring and breadth confirmation.",tickers:["SPY","QQQ"],color:i.blue,stars:188,remixes:26}])},{id:"community-fx-carry-monitor",label:"FX Carry Monitor",kol:!0,creator:"Carry Desk",description:"Tracks G10 + EM carry baskets, vol-adjusted spreads, and rate-differential momentum.",tags:["FX","Carry","Rate Diff"],uses:"640 uses",updatedAt:"4h ago",prompts:["Rank G10 carry pairs by vol-adjusted yield","Build an EM carry basket excluding TRY / ARS with hedge rules"],playbooks:h([{id:"g10-carry-rank",title:"G10 Carry Ranker",creator:"Carry Desk",desc:"Vol-adjusted carry score across G10 with rate-differential momentum and DXY regime overlay.",tickers:["DXY"],color:i.orange,stars:124,remixes:16}])},{id:"community-credit-spread-watch",label:"Credit Spread Watch",kol:!0,creator:"Spread Lab",description:"IG and HY OAS, distress ratios, and CDX positioning rolled up daily with regime detection.",tags:["Credit","OAS","CDX"],uses:"880 uses",updatedAt:"1d ago",prompts:["Daily IG vs HY OAS snapshot with regime flag","Track CDX HY positioning and distress ratio for sub-IG"],playbooks:h([{id:"ig-hy-daily",title:"IG vs HY Daily",creator:"Spread Lab",desc:"Daily OAS levels with z-score regime detection and distress-ratio overlay.",tickers:["LQD","HYG"],color:i.deepBlue,stars:159,remixes:22}])},{id:"community-ai-capex-monitor",label:"AI Capex Monitor",kol:!0,creator:"Hyperscaler Watch",description:"Hyperscaler capex guidance, supplier read-through, and power-grid beneficiary mapping each quarter.",tags:["AI Capex","Hyperscaler","Read-through"],uses:"3.8k uses",updatedAt:"6h ago",prompts:["Track MSFT/AMZN/GOOGL/META capex guides and revisions","Map AI capex to power and cooling beneficiaries"],playbooks:h([{id:"hyperscaler-capex-roll",title:"Hyperscaler Capex Roll-Up",creator:"Hyperscaler Watch",desc:"Quarterly capex guides for MSFT/AMZN/GOOGL/META mapped to AI infra winners with accel/decel flags.",tickers:["MSFT","AMZN","GOOGL","META"],color:i.primary,stars:471,remixes:68}])},{id:"community-commodity-radar",label:"Commodity Radar",kol:!0,creator:"Pit Boss",description:"Oil, copper, gold, and ags pricing with inventory, futures curve, and positioning context.",tags:["Commodities","Curve","Inventory"],uses:"730 uses",updatedAt:"1d ago",prompts:["Daily WTI brief: inventory, curve shape, and producer hedging","Copper supply/demand monitor with Chinese demand overlay"],playbooks:h([{id:"wti-daily",title:"WTI Daily Radar",creator:"Pit Boss",desc:"Inventory, futures curve, refinery margins, and producer hedging — daily.",tickers:["CL"],color:i.orange,stars:144,remixes:19}])},{id:"community-bond-auction-tracker",label:"Bond Auction Tracker",kol:!0,creator:"Auction Desk",description:"Tracks Treasury auction tails, bid-to-cover, and primary-dealer takedown against rate moves.",tags:["Rates","Auctions","Tail Risk"],uses:"410 uses",updatedAt:"2d ago",prompts:["Latest 10Y / 30Y auction tails with rate impact","Primary dealer takedown trends across coupon auctions"],playbooks:h([{id:"auction-tail-tracker",title:"Auction Tail Tracker",creator:"Auction Desk",desc:"Bid-to-cover, tail size, indirect bid, and post-auction rate move per Treasury auction.",tickers:["TLT"],color:i.deepBlue,stars:78,remixes:9}])},{id:"community-earnings-revisions",label:"Earnings Revisions Pulse",kol:!0,creator:"EPS Watcher",description:"Daily upward and downward revision breadth across sectors with single-name standouts.",tags:["Estimate Revisions","Breadth","Sectors"],uses:"1.5k uses",updatedAt:"3h ago",prompts:["Daily revision breadth by sector","Top up/down NTM EPS revision names this week"],playbooks:h([{id:"revision-breadth",title:"Revision Breadth Board",creator:"EPS Watcher",desc:"Sector-level upward / downward revision ratio with single-name standouts and price-action overlay.",tickers:["SPX"],color:i.green,stars:192,remixes:27}])},{id:"community-ipo-radar",label:"IPO Radar",kol:!0,creator:"Primary Desk",description:"Tracks live and upcoming IPOs with comps, lockup expiries, and post-listing drift backtests.",tags:["IPO","Lockup","Comps"],uses:"520 uses",updatedAt:"5h ago",prompts:["Upcoming IPO pipeline with valuation comps","Backtest post-lockup drift for tech IPOs since 2020"],playbooks:h([{id:"ipo-pipeline",title:"IPO Pipeline Dashboard",creator:"Primary Desk",desc:"Live pipeline with deal size, target valuation, comps table, and lockup-expiry calendar.",tickers:["SPY"],color:i.blue,stars:96,remixes:12}])},{id:"community-buyback-tracker",label:"Buyback Tracker",kol:!0,creator:"Repurchase Co",description:"Monitors authorized vs executed buybacks, yield, and post-program drift across SPX names.",tags:["Buybacks","Capital Return","Yield"],uses:"670 uses",updatedAt:"8h ago",prompts:["Top buyback yield names this quarter","Track new authorizations and execution pace"],playbooks:h([{id:"buyback-yield-screen",title:"Buyback Yield Screen",creator:"Repurchase Co",desc:"Ranks SPX names by trailing buyback yield, execution rate, and post-program drift.",tickers:["SPX"],color:i.primary,stars:121,remixes:16}])},{id:"community-sentiment-pulse",label:"Sentiment Pulse",kol:!0,creator:"Mood Ring",description:"Crowd sentiment from X, Reddit, and Discord — scored, deduped, and tied to price action.",tags:["Sentiment","Social","Retail Flow"],uses:"2.8k uses",updatedAt:"20m ago",prompts:["Top 10 names by 24h sentiment delta","Track retail-driven sentiment vs short-interest setups"],playbooks:h([{id:"social-sentiment-board",title:"Social Sentiment Board",creator:"Mood Ring",desc:"Multi-platform sentiment scoring with dedup and price-action linkage, refreshed every hour.",tickers:["QQQ","SPY"],color:i.orange,stars:318,remixes:44}])},{id:"community-cn-policy-radar",label:"China Policy Radar",kol:!0,creator:"Beijing Desk",description:"Reads PBOC, MoF, NDRC, and CSRC releases — flags moves likely to reprice Chinese assets.",tags:["China","Policy","Property"],uses:"590 uses",updatedAt:"6h ago",prompts:["Weekly digest of PBOC operations and rate moves","Track property-stimulus measures and read-through to FXI / KWEB"],playbooks:h([{id:"pboc-weekly",title:"PBOC Weekly Digest",creator:"Beijing Desk",desc:"PBOC OMO, MLF, RRR, and rate-corridor updates with FXI / KWEB / CNH read-through.",tickers:["FXI","KWEB"],color:i.red,stars:84,remixes:10}])},{id:"community-japan-radar",label:"Japan Macro Radar",kol:!0,creator:"Tokyo Tape",description:"BOJ, JGB curve, JPY carry, and Topix flow watcher with English-language summaries.",tags:["Japan","BOJ","Carry"],uses:"380 uses",updatedAt:"12h ago",prompts:["BOJ statement parser — hawkish/dovish scoring","Topix sector rotation tied to JPY moves"],playbooks:h([{id:"boj-parser",title:"BOJ Statement Parser",creator:"Tokyo Tape",desc:"Tokenizes BOJ statements, scores hawkishness vs prior, and maps to JGB and JPY reaction.",tickers:["TOPIX 500"],color:i.deepBlue,stars:62,remixes:8}])},{id:"community-onchain-yield",label:"On-Chain Yield Lab",kol:!0,creator:"DeFi Lab",description:"Stablecoin and ETH yields across Aave, Compound, Pendle, and points programs with risk scoring.",tags:["DeFi","Stablecoin","Yield"],uses:"1.0k uses",updatedAt:"4h ago",prompts:["Compare stablecoin yields across Aave / Compound / Pendle","Build an ETH yield ladder with LST + restaking exposure"],playbooks:h([{id:"stablecoin-yield-rank",title:"Stablecoin Yield Rank",creator:"DeFi Lab",desc:"Normalized yields across major venues with TVL, smart-contract age, and risk-tier scoring.",tickers:["USDT","USDC"],color:i.green,stars:137,remixes:18}])},{id:"community-event-study",label:"Event Study Builder",kol:!0,creator:"Event Lab",description:"Spin up event-study windows around macro prints, earnings, or policy decisions in one click.",tags:["Event Study","Drift","Backtest"],uses:"450 uses",updatedAt:"1d ago",prompts:["Run an event study on SPX around CPI prints since 2018","Build a custom event window around FOMC for risk assets"],playbooks:h([{id:"cpi-event-study",title:"CPI Event Study",creator:"Event Lab",desc:"Pre/post CPI windows for SPX, IWM, and TLT with surprise-bucketed conditional drifts.",tickers:["SPY","IWM","TLT"],color:i.blue,stars:71,remixes:9}])},{id:"community-thematic-basket",label:"Thematic Basket Builder",kol:!0,creator:"Theme Lab",description:"Build, weight, and backtest custom thematic baskets — from robotics to GLP-1 to nuclear.",tags:["Themes","Basket","Backtest"],uses:"1.7k uses",updatedAt:"7h ago",prompts:["Build a humanoid-robotics basket with equal-weight and beta cap","Backtest a nuclear-renaissance basket with rebalancing rules"],playbooks:h([{id:"robotics-basket",title:"Humanoid Robotics Basket",creator:"Theme Lab",desc:"Equal-weight basket of robotics names with monthly rebalance, beta cap, and risk parity weighting option.",tickers:["NVDA","TSLA"],color:i.primary,stars:226,remixes:31}])}],et=[{keys:["btc","bitcoin"],prompts:["Track BTC momentum and alert me on 1h breakouts above 3% gains","Build a BTC DCA playbook with weekly rebalancing and a 20% max drawdown stop","Correlate BTC with NASDAQ tech names and flag regime shifts in real time"]},{keys:["eth","ethereum"],prompts:["Set up an ETH staking-yield tracker with alerts on gas-fee spikes","Build an ETH/BTC ratio rotation playbook with RSI confirmation","Monitor ETH Layer-2 TVL shifts and flag capital rotation signals"]},{keys:["sol","solana"],prompts:["Track SOL DEX volume vs ETH and surface dApp rotation signals","Build a SOL/ETH pair-trade triggered by volume divergence","Monitor SOL validator health and alert on decentralization risk"]},{keys:["nvda","nvidia"],prompts:["Deep-dive NVDA — revenue segmentation, peer valuation, and supply-chain exposure","Build an NVDA earnings run-up playbook with an options overlay","Track NVDA vs AMD/AVGO relative strength with daily alerts"]},{keys:["tsla","tesla"],prompts:["Track TSLA delivery numbers vs consensus and alert on misses","Build a TSLA vs BYD pair-trade with weekly rebalancing","Correlate TSLA price with China EV sentiment and surface leading indicators"]},{keys:["ai","artificial intelligence"],prompts:["Surface the top 5 AI infrastructure plays by 90-day momentum","Build an AI-sector rotation basket rebalanced monthly","Compare AI beneficiaries vs software incumbents and flag divergences"]},{keys:["macro","fed","cpi","rates"],prompts:["Daily macro brief — US rates, DXY, oil, credit spreads with LLM commentary","Build a recession-risk dashboard with 5 leading indicators","Set up Fed-cut scenario alerts when CPI surprises move odds >5%"]},{keys:["earnings"],prompts:["Build an earnings whisper tracker for the next 2 weeks","Post-earnings drift playbook — long beaters, short missers on a 3-day hold","Compare implied vs realized moves across MAG7 earnings"]},{keys:["options","iv"],prompts:["Scan for unusual options volume in mega-cap tech and alert on sweeps","Build an IV-crush playbook for post-earnings plays","Track 0DTE flow on SPX and surface directional bias shifts"]},{keys:["dividend","income"],prompts:["Build a dividend-growth screen with 10+ years of growth and sub-60% payout ratio","Track dividend ex-dates across my watchlist and alert 5 days ahead","Compare dividend-yield baskets vs treasury yield and flag regime shifts"]},{keys:["what is","what's"],prompts:["What is the implied-volatility curve telling us about NVDA this week?","What is the best way to hedge a long BTC position right now?","What is the Sharpe ratio of my current portfolio over 90 days?"]},{keys:["how to","how do i","how do"],prompts:["How to build a momentum playbook with drawdown caps","How to hedge my equity portfolio against a Fed surprise","How to spot unusual options flow in real time"]},{keys:["find","show me","show"],prompts:["Find playbooks with >20% annualized return and <10% drawdown","Show me undervalued tech names with rising earnings estimates","Find the top yield opportunities in stablecoins right now"]},{keys:["compare","vs","versus"],prompts:["Compare NVDA and AMD across growth, margins, and valuation","Compare my portfolio vs the S&P 500 over the last 90 days","Compare BTC and ETH risk-adjusted returns year-to-date"]},{keys:["why"],prompts:["Why is BTC underperforming NASDAQ this month?","Why are semis volatile heading into earnings?","Why did my portfolio drop on Friday's close?"]},{keys:["summarize","summary","tl;dr"],prompts:["Summarize this week's Fed speakers and market reactions","Summarize my recent trades and flag any discipline slips","Summarize the latest AI-sector earnings ranked by relevance"]},{keys:["explain"],prompts:["Explain what's driving the 10-year yield higher today","Explain the divergence between SPX and credit spreads","Explain the risk profile of my current top holding"]}],tt=2;function rt(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function it(r,a){const s=`\\b${rt(a).replace(/\s+/g,"\\s+")}\\b`;return new RegExp(s,"i").test(r)}function at(r){const a=r.trim();if(a.length<tt)return[];if(a.length>60)return[];if(a.split(/\s+/).length>5)return[];for(const s of et)if(s.keys.some(d=>it(a,d)))return s.prompts;return[]}const st="researcher-l1";function A(){return typeof window>"u"||typeof window.matchMedia!="function"?!0:window.matchMedia("(hover: hover)").matches}const O={display:"flex",alignItems:"center",gap:8,height:40,padding:"0 16px",borderRadius:999,border:"0.5px solid var(--line-l2)",fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"22px",fontWeight:400,color:"var(--text-n9)",whiteSpace:"nowrap",cursor:"pointer",letterSpacing:.14,userSelect:"none",background:"white",transition:"box-shadow 160ms ease, transform 160ms ease"};function zt({template:r,active:a,onClick:s,onHover:d,onLeave:n}){const o=l.useRef(null);return e.jsxs("button",{ref:o,onClick:s,onMouseEnter:()=>{A()&&o.current&&(o.current.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",o.current.style.transform="translateY(-2px)",d&&d(o.current.getBoundingClientRect()))},onMouseLeave:()=>{A()&&(o.current&&(o.current.style.boxShadow="none",o.current.style.transform="translateY(0)"),n==null||n())},style:{...O,background:a?"#f3f8f8":"white"},children:[r.kol?e.jsx(N,{name:r.creator,size:22}):r.icon&&e.jsx(I,{name:r.icon,size:16,color:"var(--text-n7)"}),r.label]})}function ne(r){let a=2166136261;for(let s=0;s<r.length;s++)a^=r.charCodeAt(s),a=Math.imul(a,16777619);return a>>>0}function Te(r){const s=ne(r)%7200;return s<1?"just now":s<60?`${s}m ago`:s<1440?`${Math.floor(s/60)}h ago`:`${Math.floor(s/1440)}d ago`}const fe=["Filings","Insider Cluster","Event Drift","Earnings Drift","Whisper Numbers","Macro Flow","FX Cross","Rates Curve","Credit Spread","Sentiment","Theme Tracker","Catalyst","Risk Off","Backtest","Yield Curve","Dividend","On-Chain","ETF Flow","MAG7","AI Capex","Hyperscaler","Volatility","Carry","Drawdown","Sharpe","Quintile","Read-Across","Sector Rotation","Pair Trade","Theme"];function oe(r){const s=(ne(r)>>>12)%2+2,d=new Set,n=[];for(let o=0;n.length<s&&o<32;o++){const x=ne(`${r}|tag|${o}`)%fe.length;d.has(x)||(d.add(x),n.push(fe[x]))}return n}const ye=r=>()=>e.jsx("img",{src:`/${r}`,alt:"",width:14,height:14,style:{width:14,height:14,display:"block"}}),nt=()=>()=>e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),ot=()=>()=>e.jsx("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})}),xe={discord:{key:"discord",label:"Discord",href:"https://discord.com",render:ye("logo-social-discord.svg")},telegram:{key:"telegram",label:"Telegram",href:"https://telegram.org",render:ye("logo-telegram.svg")},x:{key:"x",label:"X",href:"https://x.com",render:nt()},instagram:{key:"instagram",label:"Instagram",href:"https://instagram.com",render:ot()}},lt=["discord","telegram","x"],ct=["x","telegram","discord","instagram"];function le(r){if(r==="Alva")return lt.map(o=>xe[o]);let a=2166136261;for(let o=0;o<r.length;o++)a^=r.charCodeAt(o),a=Math.imul(a,16777619)>>>0;const s=o=>{let k=a;for(let x=0;x<o.length;x++)k^=o.charCodeAt(x),k=Math.imul(k,16777619)>>>0;return k},d=a%2+1;return[...ct].sort((o,k)=>s(o)-s(k)).slice(0,d).map(o=>xe[o])}function dt({template:r,anchor:a,placeAbove:s,side:d="auto",onMouseEnter:n,onMouseLeave:o}){const b=l.useRef(null),[w,m]=l.useState(220);l.useLayoutEffect(()=>{b.current&&m(b.current.offsetHeight)},[r.id]);const u=r.tags??oe(r.id);let g,y;return d==="left"?(g=a.left-360-10,typeof window<"u"&&(g=Math.max(12,g)),y=a.top+a.height/2-w/2,typeof window<"u"&&(y=Math.max(12,Math.min(y,window.innerHeight-w-12)))):(g=a.left+a.width/2-360/2,typeof window<"u"&&(g=Math.max(12,Math.min(g,window.innerWidth-360-12))),y=s?a.top-w-10:a.bottom+10),e.jsxs("div",{ref:b,onMouseEnter:n,onMouseLeave:o,style:{position:"fixed",top:y,left:g,width:360,zIndex:50,background:"#ffffff",borderRadius:8,border:"0.5px solid var(--line-l2)",boxShadow:"var(--shadow-s)",padding:20,pointerEvents:"auto",animation:"newchat-fadeup 160ms ease-out"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("h2",{style:{fontFamily:"'Delight', sans-serif",fontSize:18,lineHeight:"24px",fontWeight:400,color:"var(--text-n9)",letterSpacing:.18,margin:0},children:r.label}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"16px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:400},children:Te(r.id)})]}),e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:13,lineHeight:"20px",color:"var(--text-n7)",letterSpacing:.13,margin:"10px 0 0"},children:r.description}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:10},children:u.slice(0,3).map(p=>e.jsx("span",{style:{height:20,padding:"0 6px",borderRadius:5,background:"var(--b-r05)",color:"var(--text-n5)",fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"20px",letterSpacing:.11,whiteSpace:"nowrap"},children:p},p))}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"20px 0"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("button",{type:"button",className:"nc-creator-link",onClick:p=>p.stopPropagation(),style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:10,padding:"4px 6px",margin:"-4px -6px",border:"none",background:"transparent",cursor:"pointer",borderRadius:6,transition:"background 140ms ease",textAlign:"left"},children:[e.jsx(N,{name:r.creator,size:36}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"14px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:400},children:"Created by"}),e.jsx("div",{className:"nc-creator-link-name",style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"20px",color:"var(--text-n9)",letterSpacing:.14,fontWeight:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",transition:"color 140ms ease"},children:r.creator})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:4,flexShrink:0},children:le(r.creator).map(p=>e.jsx("a",{href:p.href,target:"_blank",rel:"noreferrer noopener","aria-label":p.label,style:{width:24,height:24,borderRadius:"9999px",background:"var(--b-r05)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background 120ms ease, transform 120ms ease"},onMouseEnter:f=>{A()&&(f.currentTarget.style.background="var(--b-r1)",f.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:f=>{A()&&(f.currentTarget.style.background="var(--b-r05)",f.currentTarget.style.transform="translateY(0)")},children:p.render()},p.key))})]})]})}function ke({text:r,onClick:a,index:s=0}){return e.jsxs("button",{type:"button",className:"nc-prompt-row",style:{animation:"newchat-fade 220ms ease-out both",animationDelay:`${s*70}ms`},onClick:a,onMouseEnter:d=>{A()&&(d.currentTarget.style.background="var(--b-r03)")},onMouseLeave:d=>{A()&&(d.currentTarget.style.background="transparent")},children:[e.jsx("span",{className:"nc-prompt-text",children:r}),e.jsx(I,{name:"enter-l",size:20,color:"rgba(0,0,0,0.4)"})]})}function ie({widthPct:r}){return e.jsxs("div",{className:"nc-prompt-skeleton-row",style:{display:"flex",alignItems:"center",gap:12,height:46,padding:"12px",boxSizing:"border-box"},children:[e.jsx("div",{style:{flex:1,height:14,background:"var(--b-r07)",borderRadius:4,maxWidth:`${r}%`}}),e.jsx("div",{style:{width:20,height:20,background:"var(--b-r05)",borderRadius:4}})]})}const Ae={"theme-tracker":"thesis","smart-screener":"screener","deep-dive":"thesis","daily-macro-brief":"general","earnings-edge":"thesis","crypto-pulse":"general","what-if":"what-if","yield-hunter":"screener","dividend-diary":"screener",backtest:"what-if",valuation:"thesis"},pt={"theme-tracker":"macro","smart-screener":"momentum","deep-dive":"ai","daily-macro-brief":"review","earnings-edge":"macro","crypto-pulse":"alerts","what-if":"event_study","yield-hunter":"dividend","dividend-diary":"dividend",backtest:"event_study",valuation:"value"},ut=["S&P LARGE CAP","RUSSELL 2000","NASDAQ 100","MSCI EMG","STOXX 600","TOPIX 500"],mt=["1H","6H","1D","1W"],ht=["Late long-term debt cycle · risk-off bias","AI capex peak forming into Q3","Basket −2.1% vs SMH +0.6% YTD","Hyperscaler PPA flows feed power demand","Dollar regime shift, EM tailwind","Curve re-steepening as growth softens"],gt=["Historically Drops","Historically Rises","Range-Bound","Outperforms Peers","Trails Benchmark"],ft=["CONTEXT FEED · daily","WATCHLIST · 2026","BRIEF · daily","PULSE · live","ALERTS · LIVE · 30S"],yt=["2h ago","38 holdings","1.2M views","live","12 alerts","07:30 ET"],xt=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],kt=["RISK","CATALYST","AMBIGUOUS"];function bt(r){let a=2166136261;for(let s=0;s<r.length;s++)a^=r.charCodeAt(s),a=Math.imul(a,16777619);return a>>>0}function vt(r,a){const s=Ae[a]??"general",d=pt[a],n=bt(`${r.id}|${r.title}`),o=(m,u)=>m[(n>>>u)%m.length],k=r.tickers??[],x={template:s,title:r.title,author:r.creator,tickers:k,domain:d};if(s==="screener")return{...x,series:`SCORED · ${o(ut,0)} · ${o(mt,6)}`};if(s==="thesis"){const m=o(xt,0),u=(n>>>4)%28+1;return{...x,anchor:`${m} ${u}`,category:o(kt,8),kind:o(ht,12)}}if(s==="what-if"){const m=(n>>>0&1)===1,u=((n>>>2)%45+5)/10,g=(n>>>8)%9+2,y=Array.from({length:5}).map((p,f)=>{const C=(n>>>f*3&255)/255*2-1;return Math.round((C*(m?1:-1)*4+(m?.6:-.6))*10)/10});return{...x,series:`30D AFTER · ${g}×`,kind:o(gt,16),anchor:`${m?"+":"−"}${u.toFixed(1)}%`,whatIfBars:y}}const b=(n>>>0)%70+10,w=((n>>>4)%200+50)/10;return{...x,kind:o(ft,0),anchor:o(yt,8),series:`${b} PIECES · ${w.toFixed(1)}K VIEWS`}}function be({p:r,skillId:a,onClick:s}){const d=qe({template:Ae[a]??"general",tickers:r.tickers??[]});return e.jsxs("div",{onClick:s,className:"cursor-pointer",style:{background:"#ffffff",border:"0.5px solid var(--line-l3)",borderRadius:8,padding:4,display:"flex",flexDirection:"column",overflow:"hidden",width:"100%",transition:"box-shadow 180ms ease, transform 180ms ease"},onMouseEnter:n=>{A()&&(n.currentTarget.style.boxShadow="0 8px 22px rgba(0,0,0,0.06)",n.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:n=>{A()&&(n.currentTarget.style.boxShadow="none",n.currentTarget.style.transform="translateY(0)")},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"472 / 265.5",borderRadius:4,overflow:"hidden",flexShrink:0},children:e.jsx(Ue,{input:vt(r,a)})}),e.jsxs("div",{style:{padding:"16px 12px 12px",display:"flex",flexDirection:"column",gap:12},children:[e.jsx(Qe,{tags:d}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("p",{style:{fontSize:16,lineHeight:"26px",fontWeight:400,color:"var(--text-n9)",letterSpacing:.16,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",margin:0,height:28},children:r.title}),e.jsx("p",{style:{fontSize:12,lineHeight:"20px",color:"var(--text-n5)",letterSpacing:.12,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",margin:0,height:44},children:r.desc})]})]})]})}function wt(){return e.jsxs("div",{style:{background:"#ffffff",border:"0.5px solid var(--line-l12)",borderRadius:8,padding:4,display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"472 / 265.5",borderRadius:4,background:"var(--b-r05)"}}),e.jsxs("div",{style:{padding:"16px 12px 12px",display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("div",{style:{width:70,height:20,background:"var(--b-r07)",borderRadius:4}}),e.jsx("div",{style:{width:40,height:20,background:"var(--b-r05)",borderRadius:4}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[e.jsx("div",{style:{height:18,background:"var(--b-r07)",borderRadius:4,maxWidth:"60%"}}),e.jsx("div",{style:{height:12,background:"var(--b-r05)",borderRadius:4}}),e.jsx("div",{style:{height:12,background:"var(--b-r05)",borderRadius:4,maxWidth:"80%"}})]})]})]})}function St({skills:r,selectedId:a,onSelect:s,onClose:d}){const n=b=>b<640?1:b<960?2:3,[o,k]=l.useState(()=>typeof window>"u"?3:n(window.innerWidth));if(l.useEffect(()=>{const b=()=>k(n(window.innerWidth));return window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)},[]),typeof document>"u")return null;const x=Array.from({length:o},()=>[]);return r.forEach((b,w)=>x[w%o].push(b)),Se.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"skills-panel-backdrop",onClick:d}),e.jsxs("div",{className:"skills-panel",role:"dialog","aria-label":"Skills",children:[e.jsxs("div",{className:"skills-panel-header",children:[e.jsx("span",{className:"skills-panel-title",children:"Skills"}),e.jsx("button",{type:"button","aria-label":"Close",className:"skills-panel-close",onClick:d,children:e.jsx(I,{name:"close-l1",size:16,color:"var(--text-n7)"})})]}),e.jsx("div",{className:"skills-panel-scroll",children:e.jsx("div",{className:"skills-panel-grid",children:x.map((b,w)=>e.jsx("div",{className:"skills-panel-col",children:b.map(m=>{const u=m.tags??oe(m.id),g=a===m.id,y=le(m.creator);return e.jsxs("button",{type:"button",className:`skills-panel-card${g?" is-selected":""}`,onClick:()=>s(m.id),children:[e.jsxs("div",{className:"skills-panel-card-content",children:[e.jsxs("div",{className:"skills-panel-card-header",children:[m.creator==="Alva"&&m.icon?e.jsx("span",{className:"skills-panel-card-icon-wrap",children:e.jsx(I,{name:m.icon,size:20,color:"var(--text-n7)"})}):e.jsx("span",{className:"skills-panel-card-creator-thumb",children:e.jsx(N,{name:m.creator,size:36})}),e.jsxs("div",{className:"skills-panel-card-titleblock",children:[e.jsx("span",{className:"skills-panel-card-name",children:m.label}),e.jsx("span",{className:"skills-panel-card-author",children:m.creator})]})]}),e.jsx("p",{className:"skills-panel-card-desc",children:m.description}),u.length>0&&e.jsx("div",{className:"skills-panel-card-tags",children:u.slice(0,3).map(p=>e.jsx("span",{className:"skills-panel-card-tag",children:p},p))})]}),e.jsx("div",{className:"skills-panel-card-hoverblock",children:e.jsxs("div",{className:"skills-panel-card-hoverblock-inner",children:[e.jsx("div",{className:"skills-panel-card-divider"}),e.jsxs("div",{className:"skills-panel-card-creator-row",children:[e.jsx(N,{name:m.creator,size:36}),e.jsxs("div",{className:"skills-panel-card-creator-text",children:[e.jsx("span",{className:"skills-panel-card-creator-caps",children:"Created by"}),e.jsx("button",{type:"button",className:"skills-panel-card-creator-name",onClick:p=>p.stopPropagation(),children:e.jsx("span",{className:"skills-panel-card-creator-name-text",children:m.creator})})]}),e.jsx("div",{className:"skills-panel-card-socials",children:y.map(p=>e.jsx("a",{href:p.href,target:"_blank",rel:"noreferrer noopener","aria-label":p.label,onClick:f=>f.stopPropagation(),className:"skills-panel-card-social",children:p.render()},p.key))})]})]})})]},m.id)})},w))})})]})]}),document.body)}const Tt=36,At=28,ae=1.33,ve=640,we=18;function Ct({selected:r,maxWidth:a}){const[s,d]=l.useState(()=>typeof window<"u"?window.innerWidth<ve:!1);l.useEffect(()=>{const f=()=>d(window.innerWidth<ve);return f(),window.addEventListener("resize",f),()=>window.removeEventListener("resize",f)},[]);const n=s?At:Tt,k=Math.ceil(n*ae)*2,x=l.useRef(null),b=l.useRef(null),w=l.useRef(null),m=l.useRef(null),u=l.useRef("");l.useRef(!1);const[g,y]=l.useState(1),p=r?`Build your ${r.label}`:`Turn Ideas into Live
Investing Playbooks in Minutes`;return l.useLayoutEffect(()=>{const f=x.current,C=b.current;if(!f||!C)return;const j=()=>{C.style.maxWidth=`${f.clientWidth}px`;const M=C.scrollHeight;y(M>k?k/M:1)};j();const P=new ResizeObserver(j);return P.observe(f),()=>P.disconnect()},[p,k]),l.useEffect(()=>{const f=u.current;if(f===p){u.current=p;return}u.current=p;const C=x.current,j=b.current,P=w.current,M=m.current},[p]),e.jsxs("div",{ref:x,style:{position:"relative",width:"100%",maxWidth:a,height:k,display:"flex",alignItems:"center",justifyContent:"center",overflow:"visible"},children:[e.jsx("style",{children:`
        @keyframes tr-dot-flash { 0%{opacity:0} 15%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-erase { 0%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-appear { 0%{opacity:0} 100%{opacity:1} }
        .tr-cell{ position:absolute; width:${we}px; height:${we}px; opacity:0; pointer-events:none; }
      `}),e.jsx("h1",{ref:w,"aria-hidden":!0,style:{position:"absolute",left:0,right:0,top:"50%",transform:`translateY(-50%) scale(${g})`,transformOrigin:"center",fontSize:n,lineHeight:ae,fontWeight:400,color:"var(--text-n9)",textAlign:"center",letterSpacing:.45,margin:0,pointerEvents:"none",zIndex:1}}),e.jsx("h1",{ref:b,style:{fontSize:n,lineHeight:ae,fontWeight:400,color:"var(--text-n9)",textAlign:"center",letterSpacing:.45,margin:0,transform:`scale(${g})`,transformOrigin:"center",position:"relative",zIndex:1,whiteSpace:"pre-line"},children:p}),e.jsx("div",{ref:m,"aria-hidden":!0,style:{position:"absolute",inset:0,pointerEvents:"none",zIndex:2,overflow:"visible"}})]})}function Mt({template:r,onClose:a,onSelect:s}){const d=r.tags??oe(r.id);return typeof document>"u"?null:Se.createPortal(e.jsx("div",{onClick:a,style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"newchat-fade 160ms ease-out"},children:e.jsxs("div",{onClick:n=>n.stopPropagation(),style:{width:"100%",maxWidth:360,background:"#ffffff",borderRadius:14,padding:20,boxShadow:"0 20px 48px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.08)",animation:"newchat-fadeup 220ms ease-out"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("h2",{style:{fontFamily:"'Delight', sans-serif",fontSize:18,lineHeight:"24px",fontWeight:500,color:"var(--text-n9)",letterSpacing:.18,margin:0},children:r.label}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"16px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:500},children:Te(r.id)})]}),e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:13,lineHeight:"20px",color:"var(--text-n7)",letterSpacing:.13,margin:"10px 0 0"},children:r.description}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:10},children:d.slice(0,3).map(n=>e.jsx("span",{style:{height:20,padding:"0 6px",borderRadius:5,background:"var(--b-r05)",color:"var(--text-n5)",fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"20px",letterSpacing:.11,whiteSpace:"nowrap"},children:n},n))}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"20px 0 12px"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("div",{style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:10},children:[e.jsx(N,{name:r.creator,size:36}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"14px",color:"var(--text-n5)",letterSpacing:.11,fontWeight:500},children:"Created by"}),e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"20px",color:"var(--text-n9)",letterSpacing:.14,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:r.creator})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:6,flexShrink:0},children:le(r.creator).map(n=>e.jsx("a",{href:n.href,target:"_blank",rel:"noreferrer noopener","aria-label":n.label,style:{width:24,height:24,borderRadius:"9999px",background:"var(--b-r05)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:n.render()},n.key))})]}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"12px 0 20px"}}),e.jsx("button",{type:"button",onClick:s,style:{width:"100%",height:44,border:"none",borderRadius:10,background:"var(--main-m1)",color:"#fff",fontFamily:"'Delight', sans-serif",fontSize:14,fontWeight:500,letterSpacing:.14,cursor:"pointer"},children:"Pick this skill"})]})}),document.body)}const Dt=340,se=16;function Lt({onNavigate:r}){const[a,s]=l.useState("Popular"),[d,n]=l.useState(()=>new Set),o=l.useRef(null),[k,x]=l.useState(0);l.useEffect(()=>{if(!o.current)return;const u=o.current,g=new ResizeObserver(y=>{var f;const p=((f=y[0])==null?void 0:f.contentRect.width)??0;x(p)});return g.observe(u),()=>g.disconnect()},[]);const b=u=>{n(g=>{const y=new Set(g);return y.has(u)?y.delete(u):y.add(u),y})},w=l.useMemo(()=>{const u=a==="Recent"?[...ge].reverse():ge;return d.size===0?u:u.filter(g=>{for(const y of d)if(Ke(y,g))return!0;return!1})},[a,d]),m=k===0?{display:"grid",gap:se,width:"100%"}:{display:"grid",gridTemplateColumns:`repeat(${Math.max(1,Math.floor((k+se)/Dt))}, minmax(0, 1fr))`,gap:se,width:"100%"};return e.jsx("section",{style:{width:"100%",padding:"40px 28px 60px",position:"relative",zIndex:2},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,width:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"},children:[e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:20,lineHeight:"30px",letterSpacing:.2,color:"var(--text-n9)"},children:"Trending Playbooks"}),e.jsxs("button",{type:"button",onClick:()=>r("explore"),style:{display:"inline-flex",alignItems:"center",gap:4,height:28,padding:"4px 0",background:"transparent",border:"none",cursor:"pointer",fontFamily:"'Delight', sans-serif",fontSize:12,lineHeight:"20px",letterSpacing:.12,color:"var(--text-n9)"},children:["View all",e.jsx(I,{name:"arrow-right-l2",size:14,color:"var(--text-n9)"})]})]}),e.jsx(Ge,{sort:a,sortOptions:Xe,chips:Ye,onSortChange:s,selectedChips:d,onChipToggle:b}),e.jsx("div",{ref:o,style:m,children:w.map((u,g)=>e.jsx("div",{style:{width:"100%"},children:e.jsx(Je,{p:u,staggerMs:g%10*1e3})},u.id))})]})})}const z=960;function Ft({onNavigate:r}){const[a,s]=l.useState(null),[d,n]=l.useState(null),[o,k]=l.useState(null),[x,b]=l.useState(""),[w,m]=l.useState(""),[u,g]=l.useState(null),[y,p]=l.useState(!1),[f,C]=l.useState(null);l.useEffect(()=>{if(typeof document>"u")return;const t=!!f||y;return document.body.classList.toggle("nc-overlay-open",t),()=>{document.body.classList.remove("nc-overlay-open")}},[f,y]);const[j,P]=l.useState(()=>typeof window<"u"?window.innerWidth<640:!1);l.useEffect(()=>{const t=()=>P(window.innerWidth<640);return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const M=l.useRef(null),Ce=l.useRef(null),F=l.useRef(null),ce=600,H=l.useRef(null),W=l.useRef(null),[X,V]=l.useState(null),_=()=>{H.current!==null&&(window.clearTimeout(H.current),H.current=null),W.current&&(document.removeEventListener("mousemove",W.current),W.current=null),V(null)},Me=(t,c,T,S)=>{_(),V({x:T,y:S});const D=L=>V({x:L.clientX,y:L.clientY});document.addEventListener("mousemove",D),W.current=D,H.current=window.setTimeout(()=>{_(),de(t,c.getBoundingClientRect())},ce)},G=()=>{F.current!==null&&(window.clearTimeout(F.current),F.current=null)},$=()=>{G(),F.current=window.setTimeout(()=>g(null),160)},de=(t,c,T="auto")=>{if(T==="left"){G(),g({id:t,rect:c,placeAbove:!1,side:"left"});return}let S=!1;M.current&&M.current.querySelectorAll('button, [role="button"]').forEach(L=>{L.getBoundingClientRect().top>c.bottom-1&&(S=!0)}),G(),g({id:t,rect:c,placeAbove:S,side:"auto"})},[De,q]=l.useState(!1),[Le,U]=l.useState(!1);l.useEffect(()=>{const t=setTimeout(()=>m(x),700);return()=>clearTimeout(t)},[x]),l.useEffect(()=>{if(!y)return;const t=c=>{c.key==="Escape"&&p(!1)};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[y]),l.useEffect(()=>{if(!a){q(!1),U(!1);return}q(!1),U(!1);const t=setTimeout(()=>q(!0),900),c=setTimeout(()=>U(!0),1500);return()=>{clearTimeout(t),clearTimeout(c)}},[a]);const pe=l.useMemo(()=>at(w),[w]),Q=!a&&pe.length>0,v=l.useMemo(()=>a&&(ee.find(t=>t.id===a)||te.find(t=>t.id===a)||re.find(t=>t.id===a))||null,[a]),Y=l.useMemo(()=>[...ee,...te,...re],[]),Ee=l.useRef(null),[J,Re]=l.useState(new Set);l.useLayoutEffect(()=>{const t=()=>{const T=M.current;if(!T)return;const S=Array.from(T.querySelectorAll("button[data-skill-id]")),D=T.querySelector("[data-more-wrap]");if(!D)return;S.forEach(E=>{E.style.display=""}),D.style.display="";const L=[],he=2,Be=()=>{const B=[...new Set([...S.filter(R=>R.style.display!=="none").map(R=>R.offsetTop),D.offsetTop])].sort((R,Z)=>R-Z).indexOf(D.offsetTop);return B>=0&&B<=he-1};let ze=S.length;for(;ze-- >0&&!Be();){const E=S.filter(Z=>Z.style.display!=="none");if(E.length===0)break;const B=E[E.length-1],R=B.dataset.skillId;R&&L.push(R),B.style.display="none",T.offsetWidth}L.length===0&&(D.style.display="none");const K=new Set(L);K.size===J.size&&[...K].every(E=>J.has(E))||Re(K)};t();const c=new ResizeObserver(t);return M.current&&c.observe(M.current),window.addEventListener("resize",t),()=>{c.disconnect(),window.removeEventListener("resize",t)}},[Y,J,a]);const Ie=t=>{if(j){C(t),p(!1),g(null);return}s(c=>c===t?null:t),g(null),p(!1)},je=t=>{s(c=>c===t?null:t),g(null),p(!1)},Pe=()=>{f&&(s(f),C(null),p(!1))},Oe=()=>s(null),ue=t=>n({text:t,seq:Date.now()}),Ne=t=>{r(t==="__agent__"?"agent":`thread/${t}`)},me=u?ee.find(t=>t.id===u.id)||te.find(t=>t.id===u.id)||re.find(t=>t.id===u.id):null;return e.jsxs(Fe,{activePage:"new-chat",onNavigate:r,children:[e.jsx("style",{children:`
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
        .nc-chatbox-wrap .chat-input-wrapper{
          box-sizing:border-box;
        }
        .nc-chatbox-wrap .chat-input-editor-shell{
          min-height:48px;
        }
        .nc-prompts-list{
          display:flex;
          flex-direction:column;
          width:100%;
        }
        .nc-prompt-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          height:46px;
          min-height:46px;
          max-height:46px;
          flex:0 0 46px;
          box-sizing:border-box;
          padding:12px;
          background:transparent;
          border:none;
          border-radius:0;
          overflow:hidden;
          text-align:left;
          cursor:pointer;
          width:100%;
          transition:background 0.15s;
        }
        .nc-prompts-list > .nc-prompt-row:not(:last-child),
        .nc-prompts-list > .nc-prompt-skeleton-row:not(:last-child){
          border-bottom:0.5px solid var(--line-l12);
        }
        .nc-prompt-text{
          flex:1;
          min-width:0;
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
            font-weight:500;
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

        /* ══════ Skills library panel (bottom-up, full grid) ══════ */
        .skills-panel-backdrop{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.45);
          z-index:9998;
          animation:newchat-fade 200ms ease-out;
        }
        @keyframes skills-panel-modal-in{
          from{ opacity:0; transform:translate(-50%, -50%) scale(0.96); }
          to{ opacity:1; transform:translate(-50%, -50%) scale(1); }
        }
        .skills-panel{
          position:fixed;
          left:50%;
          top:50%;
          transform:translate(-50%, -50%);
          width:calc(100% - 48px);
          max-width:1200px;
          max-height:min(800px, calc(100vh - 64px));
          background:#fff;
          border-radius:14px;
          box-shadow:0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08);
          z-index:9999;
          display:flex;
          flex-direction:column;
          animation:skills-panel-modal-in 220ms cubic-bezier(0.2,0.8,0.2,1);
          overflow:hidden;
        }
        .skills-panel-header{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:20px 24px 12px;
          flex-shrink:0;
        }
        .skills-panel-title{
          font-family:'Delight',sans-serif;
          font-size:18px;
          line-height:28px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.18px;
        }
        .skills-panel-close{
          width:28px;
          height:28px;
          border:none;
          background:transparent;
          border-radius:6px;
          cursor:pointer;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .skills-panel-close:hover{ background:var(--b-r05); }
        }
        .skills-panel-scroll{
          flex:1;
          overflow-y:auto;
          padding:4px 24px 24px;
        }
        /* 手动分列瀑布流：JS 把卡片 round-robin 分到 N 个独立列容器（flex column）
           每列独立堆叠 → 第一行顶部对齐；某列内 hover 撑高，只影响同列下方卡片，
           其它列不会跟着重排。 */
        .skills-panel-grid{
          display:flex;
          gap:12px;
          align-items:flex-start;
        }
        .skills-panel-col{
          flex:1 1 0;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        @media (max-width: 639px){
          .skills-panel{
            max-height:85vh;
          }
          .skills-panel-scroll{ padding:4px 16px 24px; }
          .skills-panel-header{ padding:16px 16px 8px; }
        }
        .skills-panel-card{
          position:relative;
          display:flex;
          flex-direction:column;
          gap:16px;
          padding:20px;
          text-align:left;
          background:var(--b-r02);
          border:1px solid var(--line-l07);
          border-radius:8px;
          cursor:pointer;
          /* Same easing + duration for hover-in and hover-out across every prop */
          transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     border-color 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     box-shadow 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     padding-bottom 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover{
            background:rgba(255,255,255,0.9);
            border-color:var(--line-l12);
            box-shadow:0 6px 20px rgba(0,0,0,0.04);
            /* 用户行下方边距 = 用户行到分割线的距离（16px）*/
            padding-bottom:16px;
          }
        }
        .skills-panel-card.is-selected{
          background:var(--b-r02);
          border-color:var(--main-m1);
        }
        @media (hover: hover){
          .skills-panel-card.is-selected:hover{
            background:rgba(255,255,255,0.9);
            border-color:var(--main-m1);
            box-shadow:0 6px 20px rgba(0,0,0,0.04);
          }
        }
        /* Hover 展开底部 creator + socials 行。
           所有过渡使用统一的 240ms cubic-bezier(0.4,0,0.2,1)，确保
           hover-in 和 hover-out 节奏一致。 */
        .skills-panel-card-hoverblock{
          display:grid;
          grid-template-rows:0fr;
          opacity:0;
          /* margin-top:-16 抵消 card-level gap:16，使收起态不留间距；
             展开时 grid-template-rows 撑开，gap:16 通过 row-gap 自然出现。 */
          margin-top:-16px;
          transition:grid-template-rows 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     opacity 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     margin-top 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skills-panel-card-hoverblock-inner{
          overflow:hidden;
          min-height:0;
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-hoverblock{
            grid-template-rows:1fr;
            opacity:1;
            margin-top:0;
          }
        }
        @media (hover: none){
          .skills-panel-card-hoverblock{
            grid-template-rows:1fr;
            opacity:1;
            margin-top:0;
          }
        }
        /* KOL 卡片（顶部用 Avatar）：hover 时头像隐藏，标题块滑到左侧。
           Alva 卡片（顶部用 icon-wrap）不参与此动画 —— 图标保留。 */
        .skills-panel-card-creator-thumb{
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
        }
        .skills-panel-card-titleblock{
          transition:transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-creator-thumb{
            visibility:hidden;
          }
          .skills-panel-card:hover .skills-panel-card-creator-thumb + .skills-panel-card-titleblock{
            transform:translateX(-48px);
          }
        }
        .skills-panel-card-divider{
          height:1px;
          background:var(--line-l07);
          margin:0 0 16px;
        }
        .skills-panel-card-creator-row{
          display:flex;
          align-items:center;
          gap:10px;
        }
        .skills-panel-card-creator-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
        }
        .skills-panel-card-creator-caps{
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:14px;
          color:rgba(0,0,0,0.4);
          letter-spacing:0.11px;
        }
        .skills-panel-card-creator-name{
          align-self:flex-start;
          max-width:100%;
          padding:0;
          margin:0;
          background:transparent;
          border:none;
          cursor:pointer;
          text-align:left;
          color:var(--text-n9);
          font:inherit;
        }
        .skills-panel-card-creator-name-text{
          display:inline-block;
          max-width:100%;
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:18px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.13px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          text-decoration:underline dashed transparent;
          text-decoration-thickness:1px;
          text-underline-offset:3px;
          transition:text-decoration-color 160ms ease;
        }
        @media (hover: hover){
          .skills-panel-card-creator-name:hover .skills-panel-card-creator-name-text{
            text-decoration-color:var(--text-n9);
          }
        }
        .skills-panel-card-socials{
          display:flex;
          align-items:center;
          gap:6px;
          flex-shrink:0;
        }
        .skills-panel-card-social{
          width:24px;
          height:24px;
          border-radius:9999px;
          background:var(--b-r05);
          display:inline-flex;
          align-items:center;
          justify-content:center;
          transition:background 120ms ease;
        }
        .skills-panel-card-social:hover{ background:rgba(0,0,0,0.1); }
        .skills-panel-card-content{
          display:flex;
          flex-direction:column;
          gap:4px;
        }
        .skills-panel-card-header{
          display:flex;
          align-items:center;
          gap:12px;
          padding-bottom:4px;
        }
        .skills-panel-card-icon-wrap{
          width:36px;
          height:36px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          background:#fff;
          border:1px solid var(--line-l05);
          transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-icon-wrap{
            background:var(--b-r02);
          }
        }
        .skills-panel-card-titleblock{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
        }
        .skills-panel-card-name{
          font-family:'Delight',sans-serif;
          font-size:18px;
          line-height:28px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.18px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .skills-panel-card-author{
          font-family:'Delight',sans-serif;
          font-size:10px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.1px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .skills-panel-card-desc{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:20px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          margin:0;
        }
        .skills-panel-card-tags{
          display:flex;
          flex-wrap:wrap;
          gap:4px;
          padding-top:4px;
        }
        .skills-panel-card-tag{
          height:22px;
          padding:0 6px;
          border-radius:4px;
          background:var(--b-r05);
          color:var(--text-n5);
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:20px;
          letter-spacing:0.12px;
          white-space:nowrap;
          display:inline-flex;
          align-items:center;
        }

      `}),e.jsxs("div",{className:"h-screen overflow-y-auto relative",style:{backgroundColor:"var(--b0-container, #ffffff)"},children:[e.jsx("div",{className:"flex items-center gap-[16px] h-[56px] px-[28px] shrink-0 newchat-page-topbar",style:{position:"sticky",top:0,zIndex:5,background:"var(--b0-container, #ffffff)"},children:e.jsx("div",{className:"flex-1 min-w-0",children:e.jsx(He,{activeId:"new",onSelect:Ne,trigger:e.jsxs("div",{className:"flex gap-[4px] items-center min-w-0 cursor-pointer",children:[e.jsx("p",{className:"font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate",children:"New Chat"}),e.jsx(I,{name:"arrow-down-f2",size:14,color:"var(--text-n2)"})]})})})}),e.jsxs("section",{className:"nc-hero-section",style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",gap:36,padding:"24px 28px",position:"relative",zIndex:2},children:[e.jsx(Ct,{selected:v,maxWidth:z}),e.jsx("div",{className:"nc-chatbox-wrap",style:{width:"100%",maxWidth:z,position:"relative",zIndex:1},children:e.jsx(We,{hideSkill:!0,hideInspector:!0,allowReferences:!1,bottomChip:v?{label:v.label,icon:v.kol?void 0:v.icon??st,avatar:v.kol?v.creator:void 0,creator:v.creator,onRemove:Oe,onHover:t=>de(v.id,t),onLeave:$}:null,injectText:d,onInputChange:b})}),Q&&e.jsx("div",{className:"nc-prompts-container",style:{width:"100%",maxWidth:z,position:"relative",zIndex:1,marginTop:-16,display:"flex",flexDirection:"column"},children:pe.map((t,c)=>e.jsx("div",{style:{animation:"newchat-fadeup 320ms ease-out both",animationDelay:`${c*110}ms`},children:e.jsx(ke,{text:t,onClick:()=>ue(t)})},c))},w),!Q&&e.jsxs("div",{ref:M,style:{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",position:"relative",zIndex:1,width:"100%",maxWidth:900},children:[Y.map(t=>{var T;const c=a===t.id;return e.jsxs("button",{"data-skill-id":t.id,className:"nc-pill",onClick:()=>Ie(t.id),onMouseEnter:S=>{A()&&(S.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",S.currentTarget.style.transform="translateY(-2px)",Me(t.id,S.currentTarget,S.clientX,S.clientY))},onMouseLeave:S=>{A()&&(S.currentTarget.style.boxShadow="none",S.currentTarget.style.transform="translateY(0)",_(),$())},style:{...O,background:c?"rgba(0,0,0,0.7)":"white",color:c?"rgba(255,255,255,0.9)":O.color,borderColor:c?"rgba(0,0,0,0.7)":((T=O.border)==null?void 0:T.replace("0.5px solid ",""))??void 0},children:[t.kol?e.jsx(N,{name:t.creator,size:22}):t.icon&&e.jsx(I,{name:t.icon,size:18,color:c?"#fff":"var(--text-n9)"}),t.label]},t.id)}),e.jsx("div",{ref:Ce,"data-more-wrap":!0,style:{position:"relative"},children:e.jsxs("button",{ref:Ee,type:"button",className:"nc-pill","aria-expanded":y,"aria-label":"More skills",style:{...O,cursor:"pointer",background:y?"#f3f8f8":"white",border:y?"0.5px solid rgba(73,163,166,0.45)":O.border},onMouseEnter:t=>{A()&&(t.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",t.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:t=>{A()&&(t.currentTarget.style.boxShadow="none",t.currentTarget.style.transform="translateY(0)")},onClick:()=>{p(t=>!t),g(null)},children:["More",e.jsx(I,{name:"arrow-right-l2",size:14,color:"var(--text-n5)"})]})})]}),v&&e.jsx("div",{className:"nc-prompts-container",style:{width:"100%",maxWidth:z,position:"relative",zIndex:1,marginTop:0,display:"flex",flexDirection:"column"},children:De?e.jsx("div",{className:"nc-prompts-list",style:{animation:"newchat-fade 280ms ease-out"},children:v.prompts.slice(0,3).map((t,c)=>e.jsx(ke,{text:t,index:c,onClick:()=>ue(t)},c))}):e.jsxs("div",{className:"nc-prompts-list nc-skeleton-anim",style:{animation:"newchat-fade 200ms ease-out"},children:[e.jsx(ie,{widthPct:92}),e.jsx(ie,{widthPct:70}),e.jsx(ie,{widthPct:82})]})}),v&&e.jsx("div",{style:{width:"100%",maxWidth:z,position:"relative",zIndex:2},children:Le?v.recCards?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,animation:"newchat-fade 320ms ease-out"},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",gap:16},children:v.recCards.flatMap(t=>t.type==="playbook"?[t.playbook]:[]).slice(0,3).map((t,c)=>e.jsx("div",{style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${c*50}ms`},children:e.jsx(be,{p:t,skillId:v.id,onClick:()=>{sessionStorage.setItem("autoOpenChatPanel","1"),r("new-chat")}})},t.id))}),(()=>{const t=v.recCards.flatMap(c=>c.type==="push"?[c.push]:[]).slice(0,2);return t.length===0?null:e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${t.length}, minmax(0, 1fr))`,gap:16,gridAutoRows:281.5},children:t.map((c,T)=>e.jsx("div",{style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${(T+3)*50}ms`},children:e.jsx("div",{onClick:()=>k(c),style:{height:"100%",cursor:"pointer"},children:e.jsx(_e,{a:c})})},c.id))})})()]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:16,animation:"newchat-fade 320ms ease-out"},children:v.playbooks.slice(0,6).map((t,c)=>e.jsx("div",{style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${c*50}ms`},children:e.jsx(be,{p:t,skillId:v.id,onClick:()=>{sessionStorage.setItem("autoOpenChatPanel","1"),r("new-chat")}})},t.id))}):e.jsx("div",{className:"nc-skeleton-anim",style:{display:"grid",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",gap:16,animation:"newchat-fade 200ms ease-out"},children:Array.from({length:3}).map((t,c)=>e.jsx(wt,{},c))})},v.id)]}),!Q&&e.jsx(Lt,{onNavigate:r})]}),u&&me&&e.jsx(dt,{template:me,anchor:u.rect,placeAbove:u.placeAbove,side:u.side,onMouseEnter:G,onMouseLeave:$}),X&&e.jsxs("div",{"aria-hidden":!0,style:{position:"fixed",left:X.x+14,top:X.y+14,width:16,height:16,pointerEvents:"none",zIndex:9999},children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",style:{display:"block"},children:[e.jsx("circle",{cx:"8",cy:"8",r:"6",fill:"none",stroke:"rgba(0,0,0,0.12)",strokeWidth:"1.6"}),e.jsx("circle",{cx:"8",cy:"8",r:"6",fill:"none",stroke:"var(--main-m1)",strokeWidth:"1.6",strokeLinecap:"round",strokeDasharray:2*Math.PI*6,strokeDashoffset:2*Math.PI*6,transform:"rotate(-90 8 8)",style:{animation:`nc-pill-ring-fill ${ce}ms linear forwards`}})]}),e.jsx("style",{children:`
            @keyframes nc-pill-ring-fill {
              from { stroke-dashoffset: ${2*Math.PI*6}; }
              to   { stroke-dashoffset: 0; }
            }
          `})]}),y&&e.jsx(St,{skills:Y,selectedId:a,onSelect:je,onClose:()=>p(!1)}),f&&(()=>{const t=Y.find(c=>c.id===f);return t?e.jsx(Mt,{template:t,onClose:()=>C(null),onSelect:Pe}):null})(),e.jsx($e,{open:!!o,onClose:()=>k(null),feedName:(o==null?void 0:o.feedName)??"",alerts:o?[o]:void 0,description:"This automation runs on a fixed schedule and publishes new results to its subscribers. Each run pulls the latest data, applies the feed's logic, and writes a signal that powers the cards and alerts above. Open Settings → Automations to view full run logs and manage it."})]})}export{zt as SkillPill,Ft as default};
