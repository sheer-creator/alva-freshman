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
  AI_INFRA:   { id: 'AI_INFRA',   kind: 'theme', name: 'AI Infrastructure', hue: 174, img: 'img/hero-capex-grid.jpg' },
  HBM:        { id: 'HBM',        kind: 'theme', name: 'HBM',               hue: 174, img: 'img/hero-hbm-macro.jpg' },
  STABLECOIN: { id: 'STABLECOIN', kind: 'theme', name: 'Stablecoin',        hue: 174, img: 'img/tickers/usdc.png' },
  NUCLEAR:    { id: 'NUCLEAR',    kind: 'theme', name: 'Nuclear',           hue: 174, img: 'img/hero-nuclear.jpg' },
  ROBOTAXI:   { id: 'ROBOTAXI',   kind: 'theme', name: 'Robotaxi',          hue: 174, img: 'img/hero-robotaxi.jpg' },
  JENSEN:     { id: 'JENSEN', kind: 'figure', name: 'Jensen Huang',  role: 'NVIDIA CEO', img: 'img/people/jensen.jpg' },
  POWELL:     { id: 'POWELL', kind: 'figure', name: 'Jerome Powell', role: 'Fed Chair',  img: 'img/people/powell.jpg' },
};

/* ========== Sources ========== */
export const SOURCES = {
  nvda_ir:      { id: 'nvda_ir',      name: 'NVIDIA IR',            platform: 'Company IR', modality: 'Document',     access: 'public',  kind: 'primary' },
  sec:          { id: 'sec',          name: 'SEC Filings',          platform: 'SEC',        modality: 'Document',     access: 'public',  kind: 'primary' },
  dylan:        { id: 'dylan',        name: '@dylan522p',           platform: 'X',          modality: 'Post',         access: 'public',  kind: 'creator', creator: 'semianalysis', avatar: 'av-jaxoxyz.jpeg' },
  semianalysis: { id: 'semianalysis', name: 'SemiAnalysis',         platform: 'Substack',   modality: 'Article',      access: 'premium', kind: 'creator', creator: 'semianalysis', avatar: 'av-lake.jpeg' },
  doomberg:     { id: 'doomberg',     name: 'Doomberg',             platform: 'Substack',   modality: 'Article',      access: 'premium', kind: 'creator', creator: 'doomberg', avatar: 'av-bruce.jpeg' },
  localllama:   { id: 'localllama',   name: 'r/LocalLLaMA',         platform: 'Reddit',     modality: 'Conversation', access: 'public',  kind: 'community' },
  alpha_group:  { id: 'alpha_group',  name: 'Crypto Alpha Group',   platform: 'Telegram',   modality: 'Conversation', access: 'private', kind: 'private' },
  allin:        { id: 'allin',        name: 'All-In Podcast',       platform: 'Podcast',    modality: 'Audio',        access: 'public',  kind: 'creator', avatar: 'av-snarketh.jpeg' },
  capitol:      { id: 'capitol',      name: 'Congressional disclosures', platform: 'Gov',   modality: 'Document',     access: 'public',  kind: 'primary' },
  mkt_data:     { id: 'mkt_data',     name: 'Market data',          platform: 'Alva',       modality: 'Structured',   access: 'public',  kind: 'data' },
  x_analysts:   { id: 'x_analysts',   name: 'Verified X analysts',  platform: 'X',          modality: 'Post',         access: 'public',  kind: 'community' },
  kobeissi:     { id: 'kobeissi',     name: '@KobeissiLetter',      platform: 'X',          modality: 'Post',         access: 'public',  kind: 'creator', avatar: 'av-zet.jpeg', covers: ['NVDA', 'BTC'] },
  uwhales:      { id: 'uwhales',      name: '@unusual_whales',      platform: 'X',          modality: 'Post',         access: 'public',  kind: 'creator', avatar: 'ava-3.png', covers: ['NVDA', 'AMD'] },
  citrini:      { id: 'citrini',      name: 'Citrini Research',     platform: 'Substack',   modality: 'Article',      access: 'premium', kind: 'creator', avatar: 'av-citrini.jpg', covers: ['AI_INFRA'] },
  transcript:   { id: 'transcript',   name: 'The Transcript',       platform: 'Substack',   modality: 'Article',      access: 'public',  kind: 'creator', covers: ['NVDA', 'META'] },
  oddlots:      { id: 'oddlots',      name: 'Odd Lots',             platform: 'Podcast',    modality: 'Audio',        access: 'public',  kind: 'creator', avatar: 'ava-6.png', covers: ['STABLECOIN'] },
  asianometry:  { id: 'asianometry',  name: 'Asianometry',          platform: 'YouTube',    modality: 'Video',        access: 'public',  kind: 'creator', covers: ['HBM', 'AI_INFRA'] },
  wsb:          { id: 'wsb',          name: 'r/wallstreetbets',     platform: 'Reddit',     modality: 'Conversation', access: 'public',  kind: 'community', covers: ['TSLA'] },
  fomc:         { id: 'fomc',         name: 'FOMC statements',      platform: 'Federal Reserve', modality: 'Document', access: 'public', kind: 'primary', covers: [] },
};

/* ========== Creators ========== */
export const CREATORS = {
  semianalysis: {
    id: 'semianalysis', name: 'SemiAnalysis', handle: 'Dylan Patel', connected: false,
    avatar: 'av-lake.jpeg', expertise: ['Semiconductors', 'AI Infrastructure'],
    bio: 'Deep supply-chain research on semiconductors and AI infrastructure.',
    sources: ['semianalysis', 'dylan'], followers: '18.2K on Alva',
    radar: { accuracy: 86, alpha: 78, depth: 92, consistency: 81, risk: 70, timing: 74 },
  },
  doomberg: {
    id: 'doomberg', name: 'Doomberg', handle: 'Doomberg', connected: true,
    avatar: 'av-bruce.jpeg', expertise: ['Energy', 'Macro'],
    bio: 'Energy-first macro research. The green chicken.',
    sources: ['doomberg'], followers: '11.4K on Alva',
    radar: { accuracy: 79, alpha: 74, depth: 88, consistency: 85, risk: 76, timing: 68 },
  },
};

/* ========== Feeds ========== */
export const FEEDS = {
  nvda_events:  { id: 'nvda_events',  name: 'NVDA Important Events',   owner: 'Alva',   access: 'public',  cadence: 'Continuous', entities: ['NVDA'], sources: ['nvda_ir', 'sec', 'dylan', 'x_analysts', 'mkt_data'], last_run: '18m ago', next_run: 'Live', runs: 214, promise: 'Only the changes that matter for NVIDIA — filings, guidance, supply chain, competitor read-through.' },
  earnings:     { id: 'earnings',     name: 'Earnings Intelligence',   owner: 'Alva',   access: 'public',  cadence: 'Earnings season', entities: ['NVDA', 'META', 'AMD', 'MU'], sources: ['sec', 'mkt_data', 'x_analysts'], last_run: '2h ago', next_run: 'Aug 28', runs: 96, promise: 'What each print actually changed: surprise, guidance, narrative shifts, after-hours reaction.' },
  ai_watch:     { id: 'ai_watch',     name: 'AI Infrastructure Watch', owner: 'Alva',   access: 'public',  cadence: 'Daily',   entities: ['AI_INFRA', 'NVDA', 'AMD', 'MU'], sources: ['semianalysis', 'dylan', 'localllama', 'nvda_ir', 'mkt_data'], last_run: '41m ago', next_run: 'Tomorrow 7:00', runs: 380, promise: 'Capex, compute supply and the money flowing into AI infrastructure.' },
  doom_macro:   { id: 'doom_macro',   name: 'Doomberg Macro',          owner: 'Doomberg', access: 'premium', cadence: 'Weekly', entities: ['NUCLEAR'], sources: ['doomberg'], last_run: '3d ago', next_run: 'Mon', runs: 52, promise: 'Energy-first macro calls, before they become consensus.' },
  tg_alpha:     { id: 'tg_alpha',     name: 'My Telegram Alpha',       owner: 'You',    access: 'private', cadence: 'Continuous', entities: ['BTC'], sources: ['alpha_group'], last_run: '12m ago', next_run: 'Live', runs: 1041, promise: 'Your private groups, distilled. Only you can see this.' },
  brief:        { id: 'brief',        name: 'Morning Market Brief',    owner: 'Alva',   access: 'public',  cadence: 'Daily 7:00', entities: [], sources: ['mkt_data', 'sec', 'x_analysts'], last_run: '7:00 today', next_run: 'Tomorrow 7:00', runs: 365, promise: 'The five minutes that set up your trading day.' },
  congress:     { id: 'congress',     name: 'Congressional Trades',    owner: 'Alva',   access: 'public',  cadence: 'On disclosure', entities: [], sources: ['capitol'], last_run: '1d ago', next_run: 'On filing', runs: 128, promise: 'Every disclosed trade on the Hill, linked to what members oversee.' },
};

/* ========== Feed Items ==========
 * 共享内容：headline / summary / what_changed / entity_refs / source_refs /
 * evidence / confidence / published_at / access / archetype_hint / media_refs
 */
export const ITEMS = [
  {
    id: 'it_nvda_blackwell',
    cta: { kind: 'prompt', label: 'Test consensus', value: 'Is FY27 consensus revenue for NVDA still too low given the accelerating Blackwell ramp?' },
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
    cta: { kind: 'prompt', label: 'Who gains most?', value: 'Which memory supplier gains most from HBM staying the bottleneck?' },
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
    cta: { kind: 'prompt', label: 'Walk me through', value: 'Walk me through today\u2019s three setups and what to watch at each event.' },
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
    cta: { kind: 'prompt', label: 'Explain filing', value: 'What exactly does Tesla\u2019s Texas DMV filing say, and how reliable are such filings as leading indicators?' },
    feed: 'earnings',
    archetype: 'important_event',
    published: '32m ago',
    access: 'public',
    entity_refs: ['TSLA', 'ROBOTAXI'],
    headline: 'Tesla pulled its robotaxi expansion forward to Q4',
    summary: 'A regulatory filing in Texas reveals an expanded service area and a fleet target two quarters ahead of the stated plan.',
    what_changed: 'Fleet target moved from “mid next year” to Q4 this year, per the filing — not yet acknowledged by the company.',
    why_matters: 'Filings usually lead announcements. If confirmed, the robotaxi narrative gets a hard date.',
    media: { hero: 'img/hero-robotaxi.jpg', alt: 'Autonomous vehicle' },
    facts: [
      { text: 'A Texas DMV filing shows an expanded service area and a Q4 fleet target \u2014 two quarters ahead of plan.', sources: ['sec', 'x_analysts'] },
      { text: 'Options skew hasn\u2019t moved yet; the market hasn\u2019t priced the filing.', sources: ['mkt_data'] },
    ],
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
  { cat: 'Primary sources', hint: 'Filings, IR, central banks', ids: ['sec', 'nvda_ir', 'fomc', 'capitol'] },
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

/* ========== Discover ========== */
export const DISCOVER = {
  trendingThemes: ['AI_INFRA', 'HBM', 'NUCLEAR', 'STABLECOIN', 'ROBOTAXI'],
  popularFeeds: ['ai_watch', 'earnings', 'congress', 'brief', 'doom_macro'],
  creators: ['semianalysis', 'doomberg'],
  movers: ['NVDA', 'AMD', 'MU', 'TSLA'],
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
