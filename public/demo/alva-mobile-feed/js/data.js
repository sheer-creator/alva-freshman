/* ========== Alva Mobile Feed Demo — Data Layer ==========
 * 一切界面都从这里的对象渲染：Entity / Source / Feed / Feed Item / Projection。
 * Feed Item 字段与产品方案 §9.1 对齐；个性化解释存 projection，不写回共享 item。
 */

/* ========== Entities ========== */
export const ENTITIES = {
  NVDA:  { id: 'NVDA',  kind: 'market', name: 'NVIDIA',  ticker: 'NVDA', hue: 152, logo: 'img/tickers/nvda.png', themes: ['AI_INFRA'], price: '$181.23', delta: '+2.70%', dir: 'up' },
  TSLA:  { id: 'TSLA',  kind: 'market', name: 'Tesla',   ticker: 'TSLA', hue: 4, logo: 'img/tickers/tsla.png',   themes: ['ROBOTAXI'], price: '$249.80', delta: '−1.12%', dir: 'down' },
  BTC:   { id: 'BTC',   kind: 'market', name: 'Bitcoin', ticker: 'BTC',  hue: 36, logo: 'img/tickers/btc.png',  themes: ['STABLECOIN'], price: '$118,420', delta: '+1.84%', dir: 'up' },
  META:  { id: 'META',  kind: 'market', name: 'Meta',    ticker: 'META', hue: 210, logo: 'img/tickers/meta.png', themes: ['AI_INFRA'], price: '$742.15', delta: '+0.62%', dir: 'up' },
  AMD:   { id: 'AMD',   kind: 'market', name: 'AMD',     ticker: 'AMD',  hue: 350, logo: 'img/tickers/amd.png', themes: ['AI_INFRA'], price: '$188.44', delta: '+3.05%', dir: 'up' },
  MU:    { id: 'MU',    kind: 'market', name: 'Micron',  ticker: 'MU',   hue: 200, logo: 'img/tickers/mu.png', themes: ['HBM'], price: '$134.02', delta: '+2.21%', dir: 'up' },
  /* 搜索池扩充：不在首屏精选里，搜得到 */
  AAPL:  { id: 'AAPL',  kind: 'market', name: 'Apple',      ticker: 'AAPL', hue: 210, logo: 'img/tickers/aapl.png', themes: [], price: '$232.60', delta: '+0.41%', dir: 'up' },
  MSFT:  { id: 'MSFT',  kind: 'market', name: 'Microsoft',  ticker: 'MSFT', hue: 210, logo: 'img/tickers/msft.png', themes: ['AI_INFRA'], price: '$521.30', delta: '+0.88%', dir: 'up' },
  GOOGL: { id: 'GOOGL', kind: 'market', name: 'Alphabet',   ticker: 'GOOGL', hue: 210, logo: 'img/tickers/googl.png', themes: ['AI_INFRA'], price: '$196.44', delta: '−0.35%', dir: 'down' },
  AMZN:  { id: 'AMZN',  kind: 'market', name: 'Amazon',     ticker: 'AMZN', hue: 36, logo: 'img/tickers/amzn.png', themes: ['AI_INFRA'], price: '$228.15', delta: '+1.12%', dir: 'up' },
  TSM:   { id: 'TSM',   kind: 'market', name: 'TSMC',       ticker: 'TSM',  hue: 4, logo: 'img/tickers/tsm.png', themes: ['AI_INFRA'], price: '$243.90', delta: '+2.02%', dir: 'up' },
  PLTR:  { id: 'PLTR',  kind: 'market', name: 'Palantir',   ticker: 'PLTR', hue: 200, logo: 'img/tickers/pltr.png', themes: [], price: '$158.72', delta: '−1.44%', dir: 'down' },
  COIN:  { id: 'COIN',  kind: 'market', name: 'Coinbase',   ticker: 'COIN', hue: 210, logo: 'img/tickers/coin.png', themes: ['STABLECOIN'], price: '$310.55', delta: '+3.18%', dir: 'up' },
  SMCI:  { id: 'SMCI',  kind: 'market', name: 'Supermicro', ticker: 'SMCI', hue: 152, logo: 'img/tickers/smci.png', themes: ['AI_INFRA'], price: '$62.18', delta: '+1.75%', dir: 'up' },
  AVGO:  { id: 'AVGO',  kind: 'market', name: 'Broadcom',   ticker: 'AVGO', hue: 4,   themes: ['AI_INFRA'], price: '$309.14', delta: '+1.42%', dir: 'up' },
  ARM:   { id: 'ARM',   kind: 'market', name: 'Arm',        ticker: 'ARM',  hue: 200, themes: ['AI_INFRA'], price: '$154.62', delta: '−0.76%', dir: 'down' },
  CEG:   { id: 'CEG',   kind: 'market', name: 'Constellation Energy', ticker: 'CEG', hue: 46, themes: ['POWER_GRID', 'NUCLEAR'], price: '$326.40', delta: '+2.36%', dir: 'up' },
  VST:   { id: 'VST',   kind: 'market', name: 'Vistra',     ticker: 'VST',  hue: 38,  themes: ['POWER_GRID'], price: '$207.18', delta: '+1.91%', dir: 'up' },
  ETH:   { id: 'ETH',   kind: 'market', name: 'Ethereum',   ticker: 'ETH',  hue: 252, themes: ['STABLECOIN'], price: '$4,218', delta: '+2.08%', dir: 'up' },
  AI_INFRA:   { id: 'AI_INFRA',   kind: 'theme', name: 'AI Infrastructure', hue: 174, img: 'img/hero-capex-grid.jpg' },
  HBM:        { id: 'HBM',        kind: 'theme', name: 'HBM',               hue: 174, img: 'img/hero-hbm-macro.jpg' },
  STABLECOIN: { id: 'STABLECOIN', kind: 'theme', name: 'Stablecoin',        hue: 174, img: 'img/tickers/usdc.png' },
  NUCLEAR:    { id: 'NUCLEAR',    kind: 'theme', name: 'Nuclear',           hue: 174, img: 'img/hero-nuclear.jpg' },
  ROBOTAXI:   { id: 'ROBOTAXI',   kind: 'theme', name: 'Robotaxi',          hue: 174, img: 'img/hero-robotaxi-v2.jpg' },
  ADV_PACKAGING: { id: 'ADV_PACKAGING', kind: 'theme', name: 'Advanced Packaging', hue: 192, img: 'img/hero-hbm-macro.jpg' },
  POWER_GRID:    { id: 'POWER_GRID',    kind: 'theme', name: 'Power & Grid',       hue: 48,  img: 'img/hero-capex-grid.jpg' },
  JENSEN:     { id: 'JENSEN', kind: 'figure', name: 'Jensen Huang',  role: 'NVIDIA CEO', img: 'img/people/jensen.jpg' },
  POWELL:     { id: 'POWELL', kind: 'figure', name: 'Jerome Powell', role: 'Fed Chair',  img: 'img/people/powell.jpg' },
};

/* ========== Sources ==========
 * recent：该源头的近期内容样例（Source 详情页 “Recent from this source”）。
 */
export const SOURCES = {
  nvda_ir:      { id: 'nvda_ir',      name: 'NVIDIA IR',            platform: 'Company IR', modality: 'Document',     access: 'public',  kind: 'primary',
    recent: [
      { t: '2d ago', kind: 'Press release', text: 'Q2 FY26 results: Data Center revenue $41.1B, up 56% YoY — Blackwell ramp “ahead of plan”.' },
      { t: '1w ago', kind: 'Event', text: 'CFO at BofA conference: Blackwell allocation effectively sold out into mid-2026.' },
    ] },
  tsmc_ir:      { id: 'tsmc_ir',      name: 'TSMC Investor Relations', platform: 'Company IR', modality: 'Document', access: 'public', kind: 'primary', covers: ['TSM', 'ADV_PACKAGING'],
    recent: [
      { t: '46m ago', kind: 'Transcript', text: 'Management raised its year-end CoWoS capacity target and said demand still exceeds committed supply.' },
      { t: '6d ago', kind: 'Monthly sales', text: 'AI accelerator demand kept high-performance computing growth above the company average.' },
    ] },
  amd_ir:       { id: 'amd_ir',       name: 'AMD Investor Relations', platform: 'Company IR', modality: 'Document', access: 'public', kind: 'primary', covers: ['AMD', 'AI_INFRA'],
    recent: [
      { t: '1h ago', kind: 'Conference', text: 'Management reiterated the MI350 ramp and pulled two customer deployments into the current half.' },
      { t: '5d ago', kind: 'Earnings call', text: 'Data Center backlog expanded for a third consecutive quarter.' },
    ] },
  meta_ir:      { id: 'meta_ir',      name: 'Meta Investor Relations', platform: 'Company IR', modality: 'Document', access: 'public', kind: 'primary', covers: ['META', 'POWER_GRID'],
    recent: [
      { t: '2h ago', kind: 'Sustainability filing', text: 'Meta disclosed 1.8 GW of contracted power for two new AI campuses.' },
      { t: '1w ago', kind: 'Transcript', text: 'Capex guidance stayed intact despite a faster datacenter delivery schedule.' },
    ] },
  ferc:         { id: 'ferc',         name: 'FERC filings', platform: 'Federal Energy Regulatory Commission', modality: 'Document', access: 'public', kind: 'primary', covers: ['POWER_GRID', 'CEG', 'VST'],
    recent: [
      { t: '3h ago', kind: 'Docket', text: 'Three large-load interconnection requests advanced to the system-impact-study phase.' },
      { t: '2d ago', kind: 'Tariff filing', text: 'A regional operator proposed a new capacity class for colocated datacenter load.' },
    ] },
  circle_reports: { id: 'circle_reports', name: 'Circle transparency reports', platform: 'Company IR', modality: 'Report', access: 'public', kind: 'primary', covers: ['STABLECOIN', 'COIN'],
    recent: [
      { t: '4h ago', kind: 'Report', text: 'USDC circulation grew for a seventh week while reserve duration remained below 90 days.' },
      { t: '1w ago', kind: 'Attestation', text: 'Reserve assets remained fully backed by cash and short-duration Treasuries.' },
    ] },
  grid_status:  { id: 'grid_status', name: 'Grid Status', platform: 'Website', modality: 'Structured', access: 'public', kind: 'data', covers: ['POWER_GRID', 'CEG', 'VST'],
    recent: [
      { t: 'Live', kind: 'Dataset', text: 'PJM forward capacity prices remain elevated as datacenter load requests accelerate.' },
      { t: '1d ago', kind: 'Dashboard', text: 'Power-demand forecasts rose across the three regions with the largest AI campus pipeline.' },
    ] },
  sec:          { id: 'sec',          name: 'SEC Filings',          platform: 'SEC',        modality: 'Document',     access: 'public',  kind: 'primary',
    recent: [
      { t: '32m ago', kind: 'Filing', text: 'TSLA — Texas DMV filing shows expanded robotaxi service area and a Q4 fleet target.' },
      { t: '1d ago', kind: '13F', text: 'Berkshire trims AAPL for a fourth straight quarter; adds to OXY.' },
      { t: '2d ago', kind: '8-K', text: 'META utility interconnect filing corroborates committed multi-year datacenter spend.' },
    ] },
  dylan:        { id: 'dylan',        name: '@dylan522p',           platform: 'X',          modality: 'Post',         access: 'public',  kind: 'creator', creator: 'semianalysis', avatar: 'av-jaxoxyz.jpeg',
    recent: [
      { t: '2h ago', kind: 'Post', text: '“HBM3E lead times now 31 weeks. Checked with two OSATs — this is allocation, not logistics.”' },
      { t: '1d ago', kind: 'Thread', text: '12 posts on Blackwell rack yields and what they mean for Q4 supply.' },
      { t: '3d ago', kind: 'Post', text: '“Everyone models GPU supply. Nobody models the substrate. That’s the trade.”' },
    ] },
  semianalysis: { id: 'semianalysis', name: 'SemiAnalysis',         platform: 'Substack',   modality: 'Article',      access: 'premium', kind: 'creator', creator: 'semianalysis', avatar: 'av-semiconductor-research-v2.png',
    recent: [
      { t: '2h ago', kind: 'Article', text: 'The capex debate is over — hyperscaler 2027 AI budgets are already committed.' },
      { t: '4d ago', kind: 'Article', text: 'Blackwell allocation checks: who actually gets racks in Q4.' },
    ] },
  doomberg:     { id: 'doomberg',     name: 'Doomberg',             platform: 'Substack',   modality: 'Article',      access: 'premium', kind: 'creator', creator: 'doomberg', avatar: 'av-energy-macro-v2.png',
    recent: [
      { t: '3d ago', kind: 'Premium essay', text: 'The nuclear restart trade has a second act — fuel-cycle scarcity, 2,900 words.' },
      { t: '1w ago', kind: 'Essay', text: 'Natural gas is the bridge nobody wants to name.' },
    ] },
  localllama:   { id: 'localllama',   name: 'r/LocalLLaMA',         platform: 'Reddit',     modality: 'Conversation', access: 'public',  kind: 'community',
    recent: [
      { t: '41m ago', kind: 'Thread', text: '“Enterprise inference demand is pull-forward, not structural” — 214 comments, split.' },
      { t: '5h ago', kind: 'Thread', text: 'Benchmarks: on-prem H200 clusters vs cloud pricing for 70B-class models.' },
    ] },
  alpha_group:  { id: 'alpha_group',  name: 'Crypto Alpha Group',   platform: 'Telegram',   modality: 'Conversation', access: 'private', kind: 'private',
    recent: [
      { t: '12m ago', kind: 'Messages', text: '14 messages on corporate BTC treasuries — stance flipped to accumulation window.' },
      { t: '3h ago', kind: 'Messages', text: 'ETF flow print +$412M sparked a re-read of yesterday’s distribution thesis.' },
    ] },
  allin:        { id: 'allin',        name: 'All-In Podcast',       platform: 'Podcast',    modality: 'Audio',        access: 'public',  kind: 'creator', avatar: 'av-podcast-studio-v2.png',
    recent: [
      { t: '9h ago', kind: 'Episode', text: 'E214 · “We’re underestimating inference demand by an order of magnitude” · from 41:22.' },
      { t: '1w ago', kind: 'Episode', text: 'E213 · Rates, the deficit and what breaks first.' },
    ] },
  capitol:      { id: 'capitol',      name: 'Congressional disclosures', platform: 'Gov',   modality: 'Document',     access: 'public',  kind: 'primary',
    recent: [
      { t: '6h ago', kind: 'Disclosure', text: 'Three members bought NVDA and AMD within five sessions ahead of the export-rule markup.' },
      { t: '1d ago', kind: 'Disclosure', text: 'Senate filing: $250K–500K in COIN calls, disclosed on the deadline.' },
    ] },
  mkt_data:     { id: 'mkt_data',     name: 'Market data',          platform: 'Alva',       modality: 'Structured',   access: 'public',  kind: 'data',
    recent: [
      { t: 'Live', kind: 'Series', text: 'BTC ETF net flow +$412M — sixth straight positive session.' },
      { t: 'Live', kind: 'Series', text: 'NVDA options: call skew steepening into the Aug 28 print.' },
    ] },
  x_analysts:   { id: 'x_analysts',   name: 'Verified X analysts',  platform: 'X',          modality: 'Post',         access: 'public',  kind: 'community',
    recent: [
      { t: '1h ago', kind: 'Posts', text: '4 verified analysts aligned on HBM contract pricing holding firm through Q4.' },
      { t: '4h ago', kind: 'Posts', text: '2 analysts flagged the same Texas DMV robotaxi filing within an hour.' },
    ] },
  kobeissi:     { id: 'kobeissi',     name: '@KobeissiLetter',      platform: 'X',          modality: 'Post',         access: 'public',  kind: 'creator', avatar: 'av-zet.jpeg', covers: ['NVDA', 'BTC'],
    recent: [
      { t: '3h ago', kind: 'Post', text: '“The S&P 500 has now gone 41 sessions without a 1% down day.”' },
      { t: '8h ago', kind: 'Post', text: 'BTC and gold rising together — the debasement trade in one chart.' },
    ] },
  uwhales:      { id: 'uwhales',      name: '@unusual_whales',      platform: 'X',          modality: 'Post',         access: 'public',  kind: 'creator', avatar: 'ava-3.png', covers: ['NVDA', 'AMD'],
    recent: [
      { t: '55m ago', kind: 'Post', text: 'Unusual NVDA call sweep: Sep $190C, $4.2M premium, above ask.' },
      { t: '2h ago', kind: 'Post', text: 'AMD dark-pool prints clustering at $186 — third session in a row.' },
    ] },
  citrini:      { id: 'citrini',      name: 'Citrini Research',     platform: 'Substack',   modality: 'Article',      access: 'premium', kind: 'creator', avatar: 'av-citrini.jpg', covers: ['AI_INFRA'],
    recent: [
      { t: '2d ago', kind: 'Article', text: 'Fiscal primacy, part III — refreshing the AI infrastructure basket.' },
      { t: '1w ago', kind: 'Article', text: 'The grid is the bottleneck after the bottleneck.' },
    ] },
  transcript:   { id: 'transcript',   name: 'The Transcript',       platform: 'Substack',   modality: 'Article',      access: 'public',  kind: 'creator', covers: ['NVDA', 'META'],
    recent: [
      { t: '1d ago', kind: 'Article', text: 'This week in earnings calls: “capacity” mentioned 214 times — a record.' },
      { t: '1w ago', kind: 'Article', text: 'CFOs are now guiding AI spend as a separate line item.' },
    ] },
  oddlots:      { id: 'oddlots',      name: 'Odd Lots',             platform: 'Podcast',    modality: 'Audio',        access: 'public',  kind: 'creator', avatar: 'ava-6.png', covers: ['STABLECOIN'],
    recent: [
      { t: '2d ago', kind: 'Episode', text: 'Why the stablecoin bill quietly rewires money-market plumbing.' },
      { t: '6d ago', kind: 'Episode', text: 'The Treasury basis trade, explained by the people doing it.' },
    ] },
  asianometry:  { id: 'asianometry',  name: 'Asianometry',          platform: 'YouTube',    modality: 'Video',        access: 'public',  kind: 'creator', covers: ['HBM', 'AI_INFRA'],
    recent: [
      { t: '5d ago', kind: 'Video', text: 'The HBM bottleneck, explained from the fab floor · 18 min.' },
      { t: '2w ago', kind: 'Video', text: 'Advanced packaging: why CoWoS capacity decides who ships.' },
    ] },
  wsb:          { id: 'wsb',          name: 'r/wallstreetbets',     platform: 'Reddit',     modality: 'Conversation', access: 'public',  kind: 'community', covers: ['TSLA'],
    recent: [
      { t: '28m ago', kind: 'Thread', text: 'TSLA robotaxi filing megathread — 1.4K comments and counting.' },
      { t: '3h ago', kind: 'Thread', text: 'Loss porn turned thesis: the MU earnings straddle debate.' },
    ] },
  fomc:         { id: 'fomc',         name: 'FOMC statements',      platform: 'Federal Reserve', modality: 'Document', access: 'public', kind: 'primary', covers: [],
    recent: [
      { t: '2w ago', kind: 'Statement', text: 'July statement: “inflation remains somewhat elevated” — language unchanged.' },
      { t: '3w ago', kind: 'Minutes', text: 'June minutes: two participants favored a cut “as soon as September”.' },
    ] },
};

/* ========== Creators ========== */
export const CREATORS = {
  semianalysis: {
    id: 'semianalysis', name: 'SemiAnalysis', handle: 'Dylan Patel', connected: false,
    avatar: 'av-semiconductor-research-v2.png', expertise: ['Semiconductors', 'AI Infrastructure'],
    bio: 'Deep supply-chain research on semiconductors and AI infrastructure.',
    sources: ['semianalysis', 'dylan'], followers: '18.2K on Alva',
    radar: { accuracy: 86, alpha: 78, depth: 92, consistency: 81, risk: 70, timing: 74 },
  },
  doomberg: {
    id: 'doomberg', name: 'Doomberg', handle: 'Doomberg', connected: true,
    avatar: 'av-energy-macro-v2.png', expertise: ['Energy', 'Macro'],
    bio: 'Energy-first macro research. The green chicken.',
    sources: ['doomberg'], followers: '11.4K on Alva',
    radar: { accuracy: 79, alpha: 74, depth: 88, consistency: 85, risk: 76, timing: 68 },
  },
};

/* ========== Feeds ========== */
export const FEEDS = {
  nvda_events:  { id: 'nvda_events',  name: 'NVDA Important Events',   owner: 'Alva',   access: 'public',  cadence: 'Continuous', entities: ['NVDA'], sources: ['nvda_ir', 'sec', 'dylan', 'x_analysts', 'mkt_data'], last_run: '18m ago', next_run: 'Live', runs: 214, promise: 'Only the changes that matter for NVIDIA — filings, guidance, supply chain, competitor read-through.' },
  earnings:     { id: 'earnings',     name: 'Earnings Intelligence',   owner: 'Alva',   access: 'public',  cadence: 'Earnings season', entities: ['NVDA', 'META', 'AMD', 'MU', 'COIN'], sources: ['sec', 'amd_ir', 'circle_reports', 'mkt_data', 'x_analysts'], last_run: '1h ago', next_run: 'Aug 28', runs: 101, promise: 'What each print actually changed: surprise, guidance, narrative shifts, after-hours reaction.' },
  ai_watch:     { id: 'ai_watch',     name: 'AI Infrastructure Watch', owner: 'Alva',   access: 'public',  cadence: 'Daily',   entities: ['AI_INFRA', 'NVDA', 'AMD', 'MU', 'TSM', 'META', 'CEG', 'VST', 'ADV_PACKAGING', 'POWER_GRID'], sources: ['semianalysis', 'dylan', 'localllama', 'nvda_ir', 'tsmc_ir', 'meta_ir', 'ferc', 'grid_status', 'citrini', 'mkt_data'], last_run: '18m ago', next_run: 'Tomorrow 7:00', runs: 385, promise: 'Capex, compute supply, power constraints and the money flowing into AI infrastructure.' },
  doom_macro:   { id: 'doom_macro',   name: 'Doomberg Macro',          owner: 'Doomberg', access: 'premium', cadence: 'Weekly', entities: ['NUCLEAR'], sources: ['doomberg'], last_run: '3d ago', next_run: 'Mon', runs: 52, promise: 'Energy-first macro calls, before they become consensus.' },
  tg_alpha:     { id: 'tg_alpha',     name: 'My Telegram Alpha',       owner: 'You',    access: 'private', cadence: 'Continuous', entities: ['BTC'], sources: ['alpha_group'], last_run: '12m ago', next_run: 'Live', runs: 1041, promise: 'Your private groups, distilled. Only you can see this.' },
  brief:        { id: 'brief',        name: 'Morning Market Brief',    owner: 'Alva',   access: 'public',  cadence: 'Daily 7:00', entities: [], sources: ['mkt_data', 'sec', 'x_analysts'], last_run: '7:00 today', next_run: 'Tomorrow 7:00', runs: 365, promise: 'The five minutes that set up your trading day.' },
  congress:     { id: 'congress',     name: 'Congressional Trades',    owner: 'Alva',   access: 'public',  cadence: 'On disclosure', entities: [], sources: ['capitol'], last_run: '1d ago', next_run: 'On filing', runs: 128, promise: 'Every disclosed trade on the Hill, linked to what members oversee.' },
  /* 新上线的 Automation（For You 推荐卡的对象）：runs 少 = 刚发布 */
  fed_path:     { id: 'fed_path',     name: 'Fed Path Tracker',        owner: 'Alva',   access: 'public',  cadence: 'On Fed signal', entities: ['POWELL'], sources: ['fomc', 'mkt_data', 'x_analysts'], last_run: '2h ago', next_run: 'On signal', runs: 3, isNew: true, promise: 'Every rate-path signal — speeches, minutes, futures pricing — folded into one running view.' },
  hbm_ledger:   { id: 'hbm_ledger',   name: 'HBM Supply Ledger',       owner: 'SemiAnalysis', access: 'public', cadence: 'Weekly', entities: ['HBM', 'MU'], sources: ['semianalysis', 'dylan', 'mkt_data'], last_run: '1d ago', next_run: 'Fri', runs: 1, isNew: true, promise: 'A running ledger of HBM supply, pricing and who is locked in — updated every week.' },
};

/* ========== Feed Items ==========
 * 共享内容：headline / summary / what_changed / entity_refs / source_refs /
 * evidence / confidence / published_at / access / archetype_hint / media_refs
 */
export const ITEMS = [
  {
    id: 'it_nvda_blackwell',
    cta: { kind: 'prompt', label: 'Plan trade', value: 'Build a trade plan for NVDA around the accelerating Blackwell ramp. Give me an entry zone, invalidation level, upside target and the catalyst to watch.' },
    feed: 'nvda_events',
    archetype: 'what_changed',
    published: '18m ago',
    access: 'public',
    entity_refs: ['NVDA', 'AI_INFRA'],
    headline: 'Blackwell demand looks stronger than expected',
    summary: 'Hyperscale orders and enterprise AI deployment signals point to an accelerating Blackwell ramp.',
    what_changed: 'Supply-chain checks and two hyperscaler commentaries moved this week from “steady ramp” to “accelerating ramp”. Q3 allocation chatter turned from availability to priority.',
    why_matters: 'If the ramp is accelerating, FY27 consensus revenue is still too low — and HBM suppliers reprice first.',
    media: { hero: 'img/hero-nvda-datacenter.jpg', alt: 'AI datacenter racks' },
    facts: [
      { text: 'Two hyperscalers raised capex commentary this week; Q3 allocation talk shifted from availability to priority.', sources: ['nvda_ir', 'mkt_data'] },
      { text: 'Supply-chain checks point to an accelerating Blackwell ramp into Q4.', sources: ['semianalysis'] },
      { text: 'Enterprise deployment doubts on Reddit remain uncorroborated by any primary source.', sources: ['localllama'] },
    ],
    metric_diff: { label: 'FY27 revenue guide', old: '$210B', new: '$228B', dir: 'up', spark: [12, 13, 13, 15, 14, 17, 19, 23, 26] },
    price: {
      now: { label: 'Today', value: '$181.23', change: '+4.76 (+2.70%)', dir: 'up', spark: [12, 14, 13, 16, 15, 18, 17, 20, 19, 23, 22, 26] },
      before: { label: 'vs 7d before', value: '$168.41', change: '−3.21 (−1.87%)', dir: 'down', spark: [22, 20, 21, 18, 19, 16, 17, 14, 15, 12, 13, 10] },
    },
    evidence: [
      { source: 'nvda_ir',    role: 'primary',    note: 'Supply commentary, GTC follow-up' },
      { source: 'mkt_data',   role: 'primary',    note: 'Options flow + revision breadth' },
      { source: 'semianalysis', role: 'creator',  note: 'Blackwell allocation checks' },
      { source: 'x_analysts', role: 'confirming', note: '3 independent analysts aligned' },
      { source: 'localllama', role: 'mixed',      note: 'Enterprise deployment doubts' },
    ],
    pipeline: { scanned: 23, relevant: 7, confirmed: 4, material: 1 },
    confidence: 'High',
  },
  {
    id: 'it_hbm_supply',
    cta: { kind: 'prompt', label: 'Compare plays', value: 'Compare the listed ways to trade persistent HBM tightness. Rank the cleanest setups by upside, valuation and execution risk.' },
    feed: 'ai_watch',
    archetype: 'multi_source',
    published: '1h ago',
    access: 'public',
    entity_refs: ['HBM', 'MU', 'AI_INFRA'],
    headline: 'HBM stays the bottleneck — and pricing just proved it',
    summary: 'Lead times extended again this week while contract pricing held firm across two independent checks.',
    what_changed: 'HBM3E lead times moved from 26 to 31 weeks. Contract pricing flat-to-up despite seasonal softness elsewhere in memory.',
    metric_diff: { label: 'HBM3E lead time', old: '26 wks', new: '31 wks', dir: 'up', spark: [10, 11, 12, 12, 14, 15, 17, 20, 22] },
    facts: [
      { text: 'Lead times extended from 26 to 31 weeks across two independent checks.', sources: ['semianalysis', 'dylan'] },
      { text: 'Contract pricing held flat-to-up despite seasonal softness in commodity memory.', sources: ['mkt_data'] },
      { text: 'One community thread argues demand is pull-forward, not structural.', sources: ['localllama'] },
    ],
    why_matters: 'Memory tightness is the cleanest confirmation that AI capex is still accelerating — demand is outrunning supply at the choke point.',
    media: { hero: 'img/hero-hbm-macro.jpg', alt: 'Memory chip macro' },
    evidence: [
      { source: 'mkt_data',     role: 'primary',    note: 'Contract pricing series' },
      { source: 'semianalysis', role: 'primary',    note: 'Supply-chain lead-time checks' },
      { source: 'dylan',        role: 'creator',    note: 'Allocation thread' },
      { source: 'x_analysts',   role: 'confirming', note: '4 analysts aligned' },
      { source: 'localllama',   role: 'mixed',      note: 'One demand-pull-forward claim' },
    ],
    pipeline: { scanned: 31, relevant: 9, confirmed: 4, material: 1 },
    confidence: 'High',
  },
  {
    id: 'it_capex_view',
    cta: { kind: 'url', label: 'Read the essay', value: 'SemiAnalysis' },
    feed: 'ai_watch',
    archetype: 'market_view',
    published: '2h ago',
    access: 'public',
    entity_refs: ['AI_INFRA', 'META', 'NVDA'],
    headline: 'The capex debate is over — for now',
    summary: 'SemiAnalysis argues hyperscaler AI budgets for 2027 are already committed, not contingent on this quarter’s ROI narratives.',
    what_changed: 'A creator thesis moved from speculation to evidence: two datacenter leases and one utility filing corroborate committed multi-year spend.',
    why_matters: 'Committed capex means the AI infrastructure trade has a floor under it that headlines can’t remove.',
    media: { hero: 'img/hero-capex-grid.jpg', alt: 'Power grid at dusk' },
    facts: [
      { text: 'Two datacenter leases and a utility interconnect filing corroborate committed multi-year spend.', sources: ['sec', 'semianalysis'] },
      { text: '2027 hyperscaler AI budgets are already committed, not contingent on this quarter\u2019s ROI narratives.', sources: ['semianalysis'] },
    ],
    evidence: [
      { source: 'semianalysis', role: 'primary',    note: 'Lead essay with lease documents' },
      { source: 'sec',          role: 'primary',    note: 'Utility interconnect filing' },
      { source: 'x_analysts',   role: 'confirming', note: '2 analysts extended the math' },
    ],
    pipeline: { scanned: 17, relevant: 5, confirmed: 3, material: 1 },
    confidence: 'Medium',
  },
  {
    id: 'it_tg_btc',
    cta: { kind: 'prompt', label: 'Summarize it', value: 'Summarize the treasury-rotation discussion in my Crypto Alpha Group and what would invalidate it.' },
    feed: 'tg_alpha',
    archetype: 'private_digest',
    published: '3h ago',
    access: 'private',
    entity_refs: ['BTC'],
    headline: 'Your group is converging on a treasury rotation',
    summary: '14 messages in Crypto Alpha Group discussed corporate BTC treasuries; sentiment flipped constructive after the ETF flow print.',
    what_changed: 'The group’s stance moved from “distribution risk” to “accumulation window” within one session.',
    why_matters: 'Your highest-signal private source disagrees with public sentiment — usually worth a closer look.',
    media: null,
    facts: [
      { text: '14 messages from 6 participants \u2014 stance moved from distribution risk to accumulation window.', sources: ['alpha_group'] },
      { text: 'ETF net flow printed +$412M, a sixth straight positive session.', sources: ['mkt_data'] },
    ],
    evidence: [
      { source: 'alpha_group', role: 'primary', note: '14 messages · 6 participants' },
      { source: 'mkt_data',    role: 'confirming', note: 'ETF net flow +$412M' },
    ],
    pipeline: { scanned: 14, relevant: 6, confirmed: 1, material: 1 },
    confidence: 'Medium',
  },
  {
    id: 'it_doom_gas',
    cta: { kind: 'url', label: 'Open Doomberg', value: 'Doomberg' },
    feed: 'doom_macro',
    archetype: 'premium_insight',
    published: '5h ago',
    access: 'premium',
    entity_refs: ['NUCLEAR'],
    headline: 'Doomberg: the nuclear restart trade has a second act',
    summary: 'Restart economics improved again — the visible part. The premium essay argues the real story is fuel-cycle scarcity.',
    what_changed: null,
    why_matters: null,
    media: { hero: 'img/hero-nuclear.jpg', alt: 'Cooling towers at dusk' },
    evidence: [
      { source: 'doomberg', role: 'primary', note: 'Premium essay · 2,900 words' },
    ],
    pipeline: { scanned: 6, relevant: 2, confirmed: 1, material: 1 },
    confidence: 'Creator view',
    premium: { price: '$39/mo', creator: 'doomberg', teaser: 'Fuel-cycle scarcity, restart economics, and the two names positioned for both.' },
  },
  {
    id: 'it_congress_sig',
    cta: { kind: 'prompt', label: 'Backtest it', value: 'Backtest committee-correlated congressional buying in semis over the last three years.' },
    feed: 'congress',
    archetype: 'signal',
    published: '6h ago',
    access: 'public',
    entity_refs: ['NVDA', 'AMD'],
    headline: 'Three members bought semis before the export-rule vote',
    summary: 'Disclosed purchases in NVDA and AMD cluster ahead of next week’s export-control markup.',
    what_changed: 'Signal strength rose from weak to moderate: 3 correlated disclosures within 5 sessions, all on relevant committees.',
    why_matters: 'Committee-correlated buying has historically led sector moves by 2–4 weeks in this signal’s backtest.',
    media: { hero: 'img/hero-capitol.jpg', alt: 'Capitol at night' },
    signal: { direction: 'Long semis', strength: 'Moderate', horizon: '2–4 weeks' },
    facts: [
      { text: 'Three members bought NVDA and AMD within five sessions \u2014 all sit on committees touching export policy.', sources: ['capitol'] },
      { text: 'Committee-correlated buying led sector moves by 2\u20134 weeks in backtests (61% hit rate, n=44).', sources: ['mkt_data'] },
    ],
    evidence: [
      { source: 'capitol',  role: 'primary',    note: '3 disclosures, committee-linked' },
      { source: 'mkt_data', role: 'confirming', note: 'Backtest: 61% hit rate, n=44' },
    ],
    pipeline: { scanned: 41, relevant: 3, confirmed: 2, material: 1 },
    confidence: 'Backtested',
  },
  {
    id: 'it_brief',
    cta: { kind: 'prompt', label: 'Set levels', value: 'Turn today\u2019s three setups into a trading plan with entry levels, invalidation levels and the event that triggers each trade.' },
    feed: 'brief',
    archetype: 'brief',
    published: '7:00 AM',
    access: 'public',
    entity_refs: [],
    headline: 'Tuesday: CPI at 8:30, NVDA supply chatter, BTC holds $118K',
    summary: 'Futures flat. The market is waiting on CPI; positioning says a cool print gets sold. Three things worth your attention before the open.',
    what_changed: null,
    why_matters: null,
    media: null,
    brief_points: [
      'CPI 8:30 ET — swaps price a cool print, equities don’t',
      'NVDA: second day of accelerating-ramp chatter (see your feed)',
      'BTC ETF flows positive for a 6th straight session',
    ],
    evidence: [
      { source: 'mkt_data', role: 'primary', note: 'Cross-asset dashboard' },
      { source: 'sec',      role: 'primary', note: 'Overnight filings sweep' },
    ],
    pipeline: { scanned: 120, relevant: 9, confirmed: 3, material: 3 },
    confidence: 'Daily brief',
  },
  {
    id: 'it_allin_pod',
    cta: { kind: 'url', label: 'Play segment', value: 'All-In Podcast' },
    feed: 'ai_watch',
    archetype: 'market_view',
    published: '9h ago',
    access: 'public',
    entity_refs: ['AI_INFRA'],
    headline: '“We’re underestimating inference demand by an order of magnitude”',
    summary: 'A 4-minute segment on enterprise inference economics stood out from this week’s episode — with a testable claim inside.',
    what_changed: null,
    why_matters: 'If inference demand compounds the way training did, current datacenter buildouts are a floor, not a ceiling.',
    media: { hero: 'img/hero-podcast.jpg', alt: 'Studio microphone', clip: { t: '41:22', quote: 'Every CFO we talk to has an inference line item now. Two years ago it didn’t exist.' } },
    evidence: [
      { source: 'allin', role: 'primary', note: 'Episode 214 · 41:22–45:40' },
      { source: 'x_analysts', role: 'confirming', note: 'Segment widely quoted' },
    ],
    pipeline: { scanned: 1, relevant: 1, confirmed: 1, material: 1 },
    confidence: 'Creator view',
  },
  {
    id: 'it_tsla_event',
    cta: { kind: 'prompt', label: 'Price catalyst', value: 'Price the TSLA robotaxi filing as a catalyst. Map the bull, base and bear cases, then suggest an entry level and invalidation signal.' },
    feed: 'earnings',
    archetype: 'important_event',
    published: '32m ago',
    access: 'public',
    entity_refs: ['TSLA', 'ROBOTAXI'],
    headline: 'Tesla pulled its robotaxi expansion forward to Q4',
    summary: 'A regulatory filing in Texas reveals an expanded service area and a fleet target two quarters ahead of the stated plan.',
    what_changed: 'Fleet target moved from “mid next year” to Q4 this year, per the filing — not yet acknowledged by the company.',
    why_matters: 'Filings usually lead announcements. If confirmed, the robotaxi narrative gets a hard date.',
    media: { hero: 'img/hero-robotaxi-v2.jpg', alt: 'Autonomous vehicle on an Austin city street' },
    facts: [
      { text: 'A Texas DMV filing shows an expanded service area and a Q4 fleet target \u2014 two quarters ahead of plan.', sources: ['sec', 'x_analysts'] },
      { text: 'Options skew hasn\u2019t moved yet; the market hasn\u2019t priced the filing.', sources: ['mkt_data'] },
    ],
    evidence: [
      { source: 'sec',        role: 'primary',    note: 'Texas DMV expansion filing' },
      { source: 'x_analysts', role: 'confirming', note: '2 analysts flagged the same filing' },
      { source: 'mkt_data',   role: 'mixed',      note: 'Options skew hasn’t moved yet' },
    ],
    pipeline: { scanned: 19, relevant: 4, confirmed: 2, material: 1 },
    confidence: 'Medium',
  },
  {
    id: 'it_tsm_packaging',
    cta: { kind: 'url', label: 'Open transcript', value: 'TSMC Investor Relations' },
    feed: 'ai_watch',
    archetype: 'what_changed',
    published: '46m ago',
    access: 'public',
    entity_refs: ['TSM', 'ADV_PACKAGING', 'AI_INFRA'],
    headline: 'CoWoS capacity is accelerating — substrates are the next constraint',
    summary: 'TSMC lifted its year-end advanced-packaging target, but two supply-chain checks now point to substrate availability as the limiting step.',
    what_changed: 'The bottleneck moved downstream: packaging capacity is ramping faster than prior guidance while substrate lead times extended another four weeks.',
    why_matters: 'The AI supply chain is broadening beyond GPUs. The next revision cycle may show up first in packaging and substrate suppliers.',
    media: null,
    metric_diff: { label: 'Monthly CoWoS capacity', old: '75K', new: '95K', dir: 'up', spark: [10, 11, 11, 13, 14, 16, 18, 21, 24] },
    facts: [
      { text: 'TSMC raised its modeled year-end CoWoS capacity target by roughly 27%.', sources: ['tsmc_ir'] },
      { text: 'Two supply-chain sources shifted the limiting component from packaging tools to advanced substrates.', sources: ['semianalysis', 'asianometry'] },
      { text: 'TSM revision breadth improved while near-dated options remain balanced.', sources: ['mkt_data'] },
    ],
    evidence: [
      { source: 'tsmc_ir', role: 'primary', note: 'Capacity target and management commentary' },
      { source: 'semianalysis', role: 'creator', note: 'Packaging and substrate supply checks' },
      { source: 'asianometry', role: 'confirming', note: 'Fab-floor packaging breakdown' },
      { source: 'mkt_data', role: 'mixed', note: 'Revisions improved; options still balanced' },
    ],
    pipeline: { scanned: 28, relevant: 8, confirmed: 3, material: 1 },
    confidence: 'High',
  },
  {
    id: 'it_meta_power',
    cta: { kind: 'prompt', label: 'Map beneficiaries', value: 'Map the listed companies that benefit most from Meta pulling forward 1.8 GW of AI datacenter power. Separate utilities, grid equipment and generation exposure.' },
    feed: 'ai_watch',
    archetype: 'important_event',
    published: '2h ago',
    access: 'public',
    entity_refs: ['META', 'POWER_GRID', 'AI_INFRA'],
    headline: 'Meta pulled 1.8 GW of AI power contracts into the current build cycle',
    summary: 'A sustainability filing and three grid dockets show that two planned campuses are moving from reservation to contracted load.',
    what_changed: 'The load was previously described as long-term optionality. It now appears in signed power agreements and active interconnection studies.',
    why_matters: 'Contracted power is a harder signal than capex guidance — and it creates a second-order read-through for utilities and grid equipment.',
    media: { hero: 'img/hero-capex-grid.jpg', alt: 'Transmission lines supplying a datacenter region' },
    metric_diff: { label: 'Contracted AI power', old: '1.2 GW', new: '1.8 GW', dir: 'up', spark: [9, 9, 10, 11, 11, 14, 16, 18, 22] },
    facts: [
      { text: 'Meta disclosed 1.8 GW of contracted power across two new AI campuses.', sources: ['meta_ir'] },
      { text: 'Three matching interconnection dockets advanced to system-impact studies.', sources: ['ferc'] },
      { text: 'Regional forward-capacity prices remain elevated near the planned sites.', sources: ['grid_status'] },
    ],
    evidence: [
      { source: 'meta_ir', role: 'primary', note: 'Campus power commitments' },
      { source: 'ferc', role: 'primary', note: 'Three matching interconnection dockets' },
      { source: 'grid_status', role: 'confirming', note: 'Regional capacity-price context' },
      { source: 'citrini', role: 'creator', note: 'Grid-equipment beneficiary map' },
    ],
    pipeline: { scanned: 36, relevant: 10, confirmed: 4, material: 1 },
    confidence: 'High',
  },
  {
    id: 'it_amd_revisions',
    cta: { kind: 'prompt', label: 'Model upside', value: 'Model the AMD setup if MI350 deployments are pulled forward. Show the earnings sensitivity, a reasonable valuation range and what would invalidate the trade.' },
    feed: 'earnings',
    archetype: 'signal',
    published: '3h ago',
    access: 'public',
    entity_refs: ['AMD', 'AI_INFRA'],
    headline: 'AMD estimates moved higher before the stock did',
    summary: 'Two customer deployments moved into the current half, lifting earnings revisions while the share price remains below its post-earnings high.',
    what_changed: 'The median FY26 EPS estimate rose 5.5% in five sessions; price gained only 1.8% over the same window.',
    why_matters: 'A widening revisions-versus-price gap can be an actionable signal, but only if the MI350 delivery timing holds.',
    media: null,
    signal: { direction: 'Long AMD', strength: 'Moderate', horizon: '4–8 weeks' },
    metric_diff: { label: 'FY26 EPS consensus', old: '$5.82', new: '$6.14', dir: 'up', spark: [12, 12, 13, 14, 15, 17, 18, 21, 23] },
    facts: [
      { text: 'AMD pulled two named MI350 customer deployments into the current half.', sources: ['amd_ir'] },
      { text: 'FY26 EPS consensus rose 5.5% while the share price gained 1.8%.', sources: ['mkt_data'] },
      { text: 'Options activity increased, but call skew is not yet at crowded levels.', sources: ['uwhales'] },
    ],
    evidence: [
      { source: 'amd_ir', role: 'primary', note: 'MI350 deployment timing' },
      { source: 'mkt_data', role: 'primary', note: 'Estimate revisions and price response' },
      { source: 'uwhales', role: 'confirming', note: 'Options activity without extreme skew' },
      { source: 'transcript', role: 'confirming', note: 'Customer deployment language across calls' },
    ],
    pipeline: { scanned: 42, relevant: 11, confirmed: 4, material: 1 },
    confidence: 'Medium',
  },
  {
    id: 'it_coin_usdc',
    cta: { kind: 'url', label: 'Open report', value: 'Circle transparency reports' },
    feed: 'earnings',
    archetype: 'multi_source',
    published: '4h ago',
    access: 'public',
    entity_refs: ['COIN', 'BTC', 'STABLECOIN'],
    headline: 'USDC growth is becoming a cleaner COIN earnings signal',
    summary: 'Circulating supply expanded for a seventh week while reserve yields stayed firm, strengthening the revenue read-through into Coinbase earnings.',
    what_changed: 'USDC supply moved from $60B to $67B in seven weeks without a material drop in short-duration reserve yield.',
    why_matters: 'The combination improves stablecoin revenue visibility even if spot trading volumes stay flat.',
    media: null,
    metric_diff: { label: 'USDC circulation', old: '$60B', new: '$67B', dir: 'up', spark: [10, 11, 12, 13, 15, 16, 18, 20, 22] },
    facts: [
      { text: 'USDC circulation grew for a seventh consecutive week.', sources: ['circle_reports'] },
      { text: 'Short-duration Treasury yields remained supportive of reserve income.', sources: ['mkt_data'] },
      { text: 'Recent management commentary framed stablecoin revenue as less volume-sensitive than transaction fees.', sources: ['transcript'] },
    ],
    evidence: [
      { source: 'circle_reports', role: 'primary', note: 'Supply and reserve attestation' },
      { source: 'mkt_data', role: 'primary', note: 'Treasury yield and COIN estimate context' },
      { source: 'transcript', role: 'confirming', note: 'Management revenue sensitivity commentary' },
      { source: 'oddlots', role: 'creator', note: 'Stablecoin market-structure discussion' },
    ],
    pipeline: { scanned: 24, relevant: 7, confirmed: 4, material: 1 },
    confidence: 'Medium',
  },
  {
    id: 'it_grid_contracts',
    cta: { kind: 'prompt', label: 'Compare utilities', value: 'Compare CEG and VST as ways to trade rising AI power demand. Include contracted exposure, valuation, merchant-power risk and an invalidation case.' },
    feed: 'ai_watch',
    archetype: 'market_view',
    published: '6h ago',
    access: 'public',
    entity_refs: ['CEG', 'VST', 'POWER_GRID', 'AI_INFRA'],
    headline: 'AI load growth is pulling power contracts forward',
    summary: 'Large-load requests rose again, and utilities are converting more preliminary datacenter interest into contracted capacity.',
    what_changed: 'Tracked AI-linked load requests increased from 18 GW to 26 GW, with a larger share now through formal interconnection milestones.',
    why_matters: 'The constraint is moving from datacenter construction to reliable megawatts — broadening the AI trade into generation and grid assets.',
    media: { hero: 'img/hero-nuclear.jpg', alt: 'Power generation cooling towers at dusk' },
    metric_diff: { label: 'AI-linked load requests', old: '18 GW', new: '26 GW', dir: 'up', spark: [8, 9, 10, 12, 13, 15, 17, 20, 24] },
    facts: [
      { text: 'Tracked large-load requests increased by 8 GW across three key regions.', sources: ['grid_status'] },
      { text: 'More projects advanced from reservation to formal system-impact studies.', sources: ['ferc'] },
      { text: 'Recent contracts favor existing reliable generation over unbuilt capacity.', sources: ['sec', 'citrini'] },
    ],
    evidence: [
      { source: 'grid_status', role: 'primary', note: 'Regional large-load request data' },
      { source: 'ferc', role: 'primary', note: 'Interconnection milestone filings' },
      { source: 'sec', role: 'confirming', note: 'Utility contract disclosures' },
      { source: 'citrini', role: 'creator', note: 'Power-market beneficiary thesis' },
    ],
    pipeline: { scanned: 54, relevant: 13, confirmed: 4, material: 1 },
    confidence: 'Medium',
  },
];

/* ========== Context Projections（per-viewer，个性化不写回 item） ========== */
export const PROJECTIONS = {
  it_nvda_blackwell: { because: [{ t: 'entity', id: 'NVDA' }, { t: 'watch' }], watch: 'supports' },
  it_hbm_supply:     { because: [{ t: 'entity', id: 'AI_INFRA' }, { t: 'source', id: 'semianalysis' }], watch: 'supports' },
  it_capex_view:     { because: [{ t: 'entity', id: 'AI_INFRA' }, { t: 'watch' }], watch: 'new_evidence' },
  it_tg_btc:         { because: [{ t: 'private', id: 'alpha_group' }], watch: null },
  it_doom_gas:       { because: [{ t: 'explore', label: 'Followed by investors like you' }], watch: null },
  it_congress_sig:   { because: [{ t: 'entity', id: 'NVDA' }], watch: null },
  it_brief:          { because: [{ t: 'feed', id: 'brief' }], watch: null },
  it_allin_pod:      { because: [{ t: 'entity', id: 'AI_INFRA' }], watch: 'challenges' },
  it_tsla_event:     { because: [{ t: 'entity', id: 'TSLA' }], watch: null },
  it_tsm_packaging:  { because: [{ t: 'entity', id: 'TSM' }, { t: 'entity', id: 'ADV_PACKAGING' }], watch: 'supports' },
  it_meta_power:     { because: [{ t: 'entity', id: 'META' }, { t: 'entity', id: 'POWER_GRID' }], watch: 'new_evidence' },
  it_amd_revisions:  { because: [{ t: 'entity', id: 'AMD' }], watch: null },
  it_coin_usdc:      { because: [{ t: 'entity', id: 'COIN' }, { t: 'entity', id: 'STABLECOIN' }], watch: null },
  it_grid_contracts: { because: [{ t: 'entity', id: 'POWER_GRID' }, { t: 'source', id: 'citrini' }], watch: 'supports' },
};

/* ========== Since you were away ========== */
export const AWAY = {
  window: 'since 9:40 PM',
  updates: [
    { entity: 'NVDA', text: 'Capex expectations moved higher', item: 'it_nvda_blackwell' },
    { entity: 'BTC', text: 'ETF inflow reversed yesterday’s decline', item: 'it_tg_btc' },
    { entity: 'AI INFRA', text: '2 new sources challenged your watch', item: 'it_allin_pod' },
  ],
  more: 'Congressional trades, Doomberg macro view',
};

/* ========== Goal 驱动的工作汇报（away 模块 Report 态样例） ========== */
export const APPROVALS = [
  {
    id: 'ap_nvda_add',
    entity: 'NVDA',
    title: 'Add 1.5% to NVDA on the pullback',
    rationale: 'NVDA pulled back 3.2% into your add zone while capex evidence strengthened — two primary sources confirm the Blackwell ramp.',
    impact: 'Position 4.1% → 5.6% · paper only',
    evidence: ['nvda_ir', 'semianalysis'],
    item: 'it_nvda_blackwell',
  },
];
/* 无 goal 时的 recap 文章（TLDR daily，正文引用 Context Card） */
export const RECAP_ARTICLE = {
  title: 'Capex reaccelerates, BTC flows flip',
  meta: '3 updates · 2 min read',
  lead: 'Two of your follows moved in the same direction overnight — toward more AI capex, sooner. The third is a challenge to that read worth keeping in view.',
  sections: [
    { text: 'The week’s supply-chain checks pushed hyperscaler capex expectations higher again. Allocation chatter has shifted from availability to priority, which historically front-runs guidance revisions.', item: 'it_nvda_blackwell' },
    { text: 'On the crypto side, ETF inflows reversed yesterday’s decline in a single session. Your private group reads it as treasury demand rather than momentum chasing.', item: 'it_tg_btc' },
    { text: 'The pushback: two new sources argue the demand surge is pull-forward, not structural. This is the strongest challenge to your watch this week.', item: 'it_allin_pod' },
  ],
  closing: 'Net: the capex thesis strengthened, with one credible counter-read. Worth a look before the MU print.',
};

/* 会话派生的一次性子 Task（示例；由 Chat 里的请求 spin off） */
export const TASKS = [
  { id: 'tk_hbm_map', title: 'Map HBM price transmission to NVDA margins', status: 'running', from: 'Spun off from chat · 20m ago' },
  { id: 'tk_bear_memo', title: 'NVDA bear case one-pager', status: 'done', from: 'Spun off from chat · yesterday' },
];

export const REPORT = {
  delivered: { text: 'HBM weekly note is ready — takeaway turned bullish', item: 'it_hbm_supply' },
  watching: 'Watching: HBM pricing signals after MU earnings',
};

/* ========== Onboarding catalogs ========== */
export const ONBOARD_ENTITIES = [
  { id: 'NVDA', hint: 'AI compute' }, { id: 'TSLA', hint: 'EV · Robotaxi' },
  { id: 'BTC', hint: 'Crypto' }, { id: 'META', hint: 'AI · Ads' },
  { id: 'AMD', hint: 'AI compute' }, { id: 'MU', hint: 'Memory' },
  { id: 'AI_INFRA', hint: 'Theme' }, { id: 'HBM', hint: 'Theme' },
  { id: 'STABLECOIN', hint: 'Theme' }, { id: 'NUCLEAR', hint: 'Theme' },
  { id: 'JENSEN', hint: 'Key figure' }, { id: 'POWELL', hint: 'Key figure' },
];

export const WATCH_PRESETS = [
  'Is AI capex still accelerating?',
  'Is the memory cycle peaking?',
  'What could change the BTC treasury trade?',
  'Are rates staying higher for longer?',
];

/* Onboarding / Discover 的分类 source 目录：让不同类型的源头可见、可逐个添加 */
export const SOURCE_CATALOG = [
  { cat: 'X accounts', hint: 'Analysts and voices worth indexing', ids: ['dylan', 'kobeissi', 'uwhales'] },
  { cat: 'Newsletters & blogs', hint: 'Substack, Beehiiv, RSS', ids: ['semianalysis', 'doomberg', 'citrini', 'transcript'] },
  { cat: 'Podcasts & video', hint: 'Transcribed, quotable, deep-linked', ids: ['allin', 'oddlots', 'asianometry'] },
  { cat: 'Communities', hint: 'Reddit, Discord, group chats', ids: ['localllama', 'wsb'] },
  { cat: 'Primary sources', hint: 'Filings, IR, central banks', ids: ['sec', 'nvda_ir', 'tsmc_ir', 'amd_ir', 'meta_ir', 'fomc', 'ferc', 'capitol'] },
  { cat: 'Market & alternative data', hint: 'Structured signals and transparent datasets', ids: ['mkt_data', 'grid_status', 'circle_reports'] },
];

export const X_IMPORT = {
  total: 186,
  onAlva: [
    { source: 'dylan', entities: ['AI_INFRA'], adds: true },
    { source: 'semianalysis', entities: ['AI_INFRA', 'HBM'], adds: true },
    { source: 'doomberg', entities: ['NUCLEAR'], adds: false },
  ],
  newSources: [
    { name: '@FabricatedKnow', entities: ['HBM'], followers: '48K' },
    { name: '@zephyr_macro', entities: ['STABLECOIN'], followers: '31K' },
  ],
  limited: [{ name: '@protected_alpha', reason: 'Protected account' }],
};

export const TG_CHATS = {
  channels: [
    { name: 'Crypto Alpha Group', members: '1.2K', active: '2m ago', type: 'Signals + discussion', selected: true },
    { name: 'Macro Late Night', members: '640', active: '1h ago', type: 'Macro chat', selected: false },
  ],
  groups: [
    { name: 'Uni Friends 🍜', members: '12', active: '5m ago', type: 'Personal', selected: false },
  ],
};

/* ========== Portfolio（You tab） ========== */
export const BROKERS = [
  { id: 'robinhood', name: 'Robinhood', hue: 152 },
  { id: 'ibkr', name: 'Interactive Brokers', hue: 0 },
  { id: 'coinbase', name: 'Coinbase', hue: 210 },
];

export const HOLDINGS = [
  { entity: 'NVDA', qty: '24 sh', value: '$4,349', pnl: '+18.4%', dir: 'up' },
  { entity: 'BTC', qty: '0.21 BTC', value: '$24,868', pnl: '+6.2%', dir: 'up' },
  { entity: 'TSLA', qty: '10 sh', value: '$2,498', pnl: '−3.1%', dir: 'down' },
];

/* ========== For You 推荐卡：新上线的 Automation（官方 / Creator），流内一等卡位 ========== */
export const RECS = [
  { feed: 'fed_path', why: 'Because you follow Jerome Powell', preview: 'Three Fed speakers, one message: September is live', previewAt: 'Latest run · 2h ago' },
  { feed: 'hbm_ledger', creator: 'semianalysis', why: 'Because you follow HBM', preview: 'SK Hynix sold out through 2026 — the ledger opens tight', previewAt: 'First run · 1d ago' },
];

/* ========== Discover ========== */
export const DISCOVER = {
  trendingThemes: ['AI_INFRA', 'POWER_GRID', 'ADV_PACKAGING', 'HBM', 'NUCLEAR', 'STABLECOIN', 'ROBOTAXI'],
  popularFeeds: ['ai_watch', 'earnings', 'congress', 'brief', 'doom_macro'],
  creators: ['semianalysis', 'doomberg'],
  movers: ['NVDA', 'AMD', 'TSM', 'CEG', 'VST', 'COIN', 'MU', 'TSLA', 'BTC', 'SMCI'],
};

/* Figure 的最近发言与动向（示例内容，模型生成）：Market tab 小卡 + 详情页 */
export const FIGURES = {
  JENSEN: {
    quote: 'Demand for Blackwell is incredible — we are supply-constrained well into next year.',
    where: 'Goldman Sachs Tech Conference', when: '2d ago',
    stats: [['1.2K', 'Mentions this week'], ['+2.7%', 'Moved NVDA'], ['9', 'Sources tracking']],
    moves: [
      { at: '2d ago', text: 'Reaffirmed Blackwell supply constraint through 2026 on stage at Goldman', impact: 'NVDA +2.7%' },
      { at: '1w ago', text: 'Met TSMC leadership in Taipei on CoWoS capacity expansion', impact: 'TSM +1.9%' },
      { at: '3w ago', text: 'Announced $100B UK AI-infrastructure partnership with OpenAI', impact: 'AI Infra theme' },
    ],
  },
  POWELL: {
    quote: 'The time has come for policy to adjust — the direction of travel is clear.',
    where: 'Jackson Hole', when: '4d ago',
    stats: [['Sep 17', 'Next decision'], ['84%', 'Cut odds priced'], ['6', 'Sources tracking']],
    moves: [
      { at: '4d ago', text: 'Jackson Hole speech opened the door to a September cut', impact: 'SPX +1.1%' },
      { at: '2w ago', text: 'July FOMC minutes showed two dissents pushing for an immediate cut', impact: 'Yields −8bp' },
      { at: '1mo ago', text: 'Told Congress the rates path stays “meeting by meeting” under tariff uncertainty', impact: 'Neutral' },
    ],
  },
};

/* ========== Helpers ========== */
export function entityChipLabel(id) {
  const e = ENTITIES[id];
  if (!e) return id;
  return e.kind === 'market' ? e.ticker : e.name;
}

export function evidenceCounts(item) {
  const c = { primary: 0, confirming: 0, mixed: 0 };
  for (const ev of item.evidence) {
    if (ev.role === 'primary') c.primary += 1;
    else if (ev.role === 'mixed') c.mixed += 1;
    else c.confirming += 1;
  }
  return c;
}
