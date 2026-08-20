/* ========== Alva Mobile MVP — Data Layer ==========
 * MVP 只有两个 automation feed：
 *   alpha     — 精选 podcast 的原始片段 + ticker tag + 为什么是 alpha
 *   following — 你关注标的的 impactful events + 异动归因（X + 新闻）
 * 一切界面从这里的对象渲染。
 */

/* ========== Entities（MVP 只有 ticker） ========== */
export const ENTITIES = {
  NVDA:  { id: 'NVDA',  name: 'NVIDIA',     ticker: 'NVDA',  hue: 152, logo: 'img/tickers/nvda.png',  price: '$181.23',  delta: '+2.70%', dir: 'up', spark: [44,45,44,46,47,46,48,50,49,51,53,55] },
  TSLA:  { id: 'TSLA',  name: 'Tesla',      ticker: 'TSLA',  hue: 4,   logo: 'img/tickers/tsla.png',  price: '$249.80',  delta: '−1.12%', dir: 'down', spark: [58,57,58,56,55,56,54,53,54,52,51,50] },
  BTC:   { id: 'BTC',   name: 'Bitcoin',    ticker: 'BTC',   hue: 36,  logo: 'img/tickers/btc.png',   price: '$118,420', delta: '+1.84%', dir: 'up', spark: [46,45,46,47,46,48,49,48,50,52,53,55] },
  META:  { id: 'META',  name: 'Meta',       ticker: 'META',  hue: 210, logo: 'img/tickers/meta.png',  price: '$742.15',  delta: '+0.62%', dir: 'up', spark: [48,49,48,50,49,51,50,52,51,52,53,54] },
  AMD:   { id: 'AMD',   name: 'AMD',        ticker: 'AMD',   hue: 350, logo: 'img/tickers/amd.png',   price: '$188.44',  delta: '+3.05%', dir: 'up', spark: [42,43,42,44,45,44,46,48,50,52,54,56] },
  MU:    { id: 'MU',    name: 'Micron',     ticker: 'MU',    hue: 200, logo: 'img/tickers/mu.png',    price: '$138.60',  delta: '+5.80%', dir: 'up', spark: [40,41,41,42,44,43,45,48,52,55,58,61] },
  AAPL:  { id: 'AAPL',  name: 'Apple',      ticker: 'AAPL',  hue: 210, logo: 'img/tickers/aapl.png',  price: '$232.60',  delta: '+0.41%', dir: 'up', spark: [50,49,50,51,50,52,51,52,53,52,53,54] },
  MSFT:  { id: 'MSFT',  name: 'Microsoft',  ticker: 'MSFT',  hue: 210, logo: 'img/tickers/msft.png',  price: '$521.30',  delta: '+0.88%', dir: 'up', spark: [47,48,47,49,50,49,51,52,51,53,54,55] },
  GOOGL: { id: 'GOOGL', name: 'Alphabet',   ticker: 'GOOGL', hue: 210, logo: 'img/tickers/googl.png', price: '$196.44',  delta: '−0.35%', dir: 'down', spark: [56,55,56,54,53,54,52,51,52,50,49,50] },
  AMZN:  { id: 'AMZN',  name: 'Amazon',     ticker: 'AMZN',  hue: 36,  logo: 'img/tickers/amzn.png',  price: '$228.15',  delta: '+1.12%', dir: 'up', spark: [46,47,46,48,47,49,50,49,51,52,53,55] },
  TSM:   { id: 'TSM',   name: 'TSMC',       ticker: 'TSM',   hue: 4,   logo: 'img/tickers/tsm.png',   price: '$243.90',  delta: '+2.02%', dir: 'up', spark: [44,45,44,46,47,48,47,49,51,53,54,56] },
  PLTR:  { id: 'PLTR',  name: 'Palantir',   ticker: 'PLTR',  hue: 200, logo: 'img/tickers/pltr.png',  price: '$158.72',  delta: '−1.44%', dir: 'down', spark: [60,58,59,57,55,56,54,52,53,51,50,49] },
  COIN:  { id: 'COIN',  name: 'Coinbase',   ticker: 'COIN',  hue: 210, logo: 'img/tickers/coin.png',  price: '$310.55',  delta: '+3.18%', dir: 'up', spark: [42,44,43,45,44,46,47,46,49,53,58,64] },
  SMCI:  { id: 'SMCI',  name: 'Supermicro', ticker: 'SMCI',  hue: 152, logo: 'img/tickers/smci.png',  price: '$62.18',   delta: '+1.75%', dir: 'up', spark: [46,45,47,46,48,47,49,50,49,51,52,54] },
};

/* ========== Sources ==========
 * alpha 的源：精选 podcast；following 的源：X + 新闻 + 行情数据。
 * recent：源头详情页 “Recent from this source” 的拟真样例。
 */
export const SOURCES = {
  /* ---- podcasts（Alpha） ---- */
  bg2:       { id: 'bg2',       name: 'BG2 Pod',              platform: 'Podcast', modality: 'Audio', kind: 'podcast', hosts: 'Brad Gerstner · Bill Gurley', avatar: 'sources/bg2.jpg',
    recent: [
      { t: '2h ago', kind: 'Episode', text: 'E82 · “The trillion-dollar buildout” — hyperscaler capex, sovereign AI and what breaks first.' },
      { t: '1w ago', kind: 'Episode', text: 'E81 · Open-source models and the margin question.' },
    ] },
  investlike: { id: 'investlike', name: 'Invest Like the Best', platform: 'Podcast', modality: 'Audio', kind: 'podcast', hosts: 'Patrick O’Shaughnessy', avatar: 'sources/invest-like-the-best.jpg',
    recent: [
      { t: '13h ago', kind: 'Episode', text: 'A memory-cycle veteran on why this one is structurally different.' },
      { t: '1w ago', kind: 'Episode', text: 'Compounding lessons from 20 years of semis investing.' },
    ] },
  oddlots:   { id: 'oddlots',   name: 'Odd Lots',             platform: 'Podcast', modality: 'Audio', kind: 'podcast', hosts: 'Joe Weisenthal · Tracy Alloway', avatar: 'sources/odd-lots.jpg',
    recent: [
      { t: '5h ago', kind: 'Episode', text: 'How the stablecoin bill quietly rewires money-market plumbing.' },
      { t: '6d ago', kind: 'Episode', text: 'The Treasury basis trade, explained by the people doing it.' },
    ] },
  allin:     { id: 'allin',     name: 'All-In Podcast',       platform: 'Podcast', modality: 'Audio', kind: 'podcast', hosts: 'Chamath · Sacks · Friedberg · Calacanis', avatar: 'sources/all-in.jpg',
    recent: [
      { t: '9h ago', kind: 'Episode', text: 'E214 · “We’re underestimating inference demand by an order of magnitude” · from 41:22.' },
      { t: '1w ago', kind: 'Episode', text: 'E213 · Rates, the deficit and what breaks first.' },
    ] },
  dwarkesh:  { id: 'dwarkesh',  name: 'Dwarkesh Podcast',     platform: 'Podcast', modality: 'Audio', kind: 'podcast', hosts: 'Dwarkesh Patel', avatar: 'sources/dwarkesh.jpg',
    recent: [
      { t: '1d ago', kind: 'Episode', text: 'A frontier-lab researcher on serving costs and the economics of inference.' },
      { t: '2w ago', kind: 'Episode', text: 'What scaling laws still predict — and what they stopped predicting.' },
    ] },
  acquired:  { id: 'acquired',  name: 'Acquired',             platform: 'Podcast', modality: 'Audio', kind: 'podcast', hosts: 'Ben Gilbert · David Rosenthal', avatar: 'sources/acquired.jpg',
    recent: [
      { t: '2d ago', kind: 'Episode', text: 'TSMC, part II — advanced packaging and the moat nobody models.' },
      { t: '1mo ago', kind: 'Episode', text: 'Costco: the deep dive.' },
    ] },

  /* ---- X + news（Following） ---- */
  dylan:     { id: 'dylan',     name: '@dylan522p',           platform: 'X',    modality: 'Post', kind: 'x', avatar: 'sources/dylan522p.jpg',
    recent: [
      { t: '2h ago', kind: 'Post', text: '“HBM3E lead times now 31 weeks. Checked with two OSATs — this is allocation, not logistics.”' },
      { t: '1d ago', kind: 'Thread', text: '12 posts on Blackwell rack yields and what they mean for Q4 supply.' },
    ] },
  kobeissi:  { id: 'kobeissi',  name: '@KobeissiLetter',      platform: 'X',    modality: 'Post', kind: 'x', avatar: 'sources/kobeissi-letter.jpg',
    recent: [
      { t: '3h ago', kind: 'Post', text: '“BTC spot ETFs: +$412M today, the 6th straight day of net inflows.”' },
      { t: '8h ago', kind: 'Post', text: 'BTC and gold rising together — the debasement trade in one chart.' },
    ] },
  uwhales:   { id: 'uwhales',   name: '@unusual_whales',      platform: 'X',    modality: 'Post', kind: 'x', avatar: 'sources/unusual-whales.png',
    recent: [
      { t: '55m ago', kind: 'Post', text: 'Unusual MU call sweep: Sep $150C, $3.1M premium, above ask.' },
      { t: '2h ago', kind: 'Post', text: 'AMD dark-pool prints clustering at $186 — third session in a row.' },
    ] },
  reuters:   { id: 'reuters',   name: 'Reuters',              platform: 'News', modality: 'Article', kind: 'news', avatar: 'sources/reuters.jpg',
    recent: [
      { t: '41m ago', kind: 'Wire', text: 'Second hyperscaler this week raises full-year capex guidance, citing AI demand.' },
      { t: '1h ago', kind: 'Wire', text: 'SK Hynix says HBM output effectively sold out through 2026.' },
    ] },
  bloomberg: { id: 'bloomberg', name: 'Bloomberg',            platform: 'News', modality: 'Article', kind: 'news', avatar: 'sources/bloomberg-professional.jpg',
    recent: [
      { t: '32m ago', kind: 'Story', text: 'Tesla filing in Texas points to a broader robotaxi service area and a Q4 fleet target.' },
      { t: '9h ago', kind: 'Story', text: 'Meta utility filing corroborates committed multi-year datacenter spend.' },
    ] },
  mkt_data:  { id: 'mkt_data',  name: 'Market data',          platform: 'Alva', modality: 'Structured', kind: 'data', mark: 'A', hue: 174,
    recent: [
      { t: 'Live', kind: 'Series', text: 'MU +5.8% on 2.4× average volume — largest single-day move since June.' },
      { t: 'Live', kind: 'Series', text: 'BTC ETF net flow +$412M — sixth straight positive session.' },
    ] },
};

/* ========== Feeds（MVP 固定两个 automation，开箱即订） ========== */
export const FEEDS = {
  alpha: {
    id: 'alpha', name: 'Alpha', owner: 'Alva', cadence: 'Continuous',
    sources: ['bg2', 'investlike', 'oddlots', 'allin', 'dwarkesh', 'acquired'],
    last_run: '12m ago', next_run: 'Live', runs: 1284,
    promise: 'Raw moments from a hand-picked set of podcasts — each tagged to its tickers, with a line on why it might be alpha.',
    instructions: 'Listen for investable claims before they reach consensus. Preserve the speaker’s exact meaning, map each claim to the companies it could affect, and explain what would make the thesis wrong.',
  },
  following: {
    id: 'following', name: 'Following', owner: 'Alva', cadence: 'Continuous',
    sources: ['dylan', 'kobeissi', 'uwhales', 'reuters', 'bloomberg', 'mkt_data'],
    last_run: '3m ago', next_run: 'Live', runs: 5203,
    promise: 'Impactful events and move attribution for every ticker you follow — read from X and the newswire.',
    instructions: 'Only surface material changes for the entities I follow. Separate the likely cause from confirming evidence, cite the original source, and say what the market may still be missing.',
  },
};

/* ========== Feed Items ==========
 * kind: 'alpha'（podcast 片段）/ 'event'（重要事件）/ 'anomaly'（异动归因）
 * content_md = Automation 的原始 Feed 正文；图片仍是标准 Markdown image link。
 * entity_refs / sources / move 是 Context Card 的投影元数据，不改变正文结构。
 * t = 分钟前（仅用于混排排序），published = 展示文案。
 */
export const ITEMS = [
  /* ---- 下拉刷新解锁的新条目（fresh: 首屏不出现，refresh 后置顶） ---- */
  {
    id: 'f_nvda_sweep', feed: 'following', kind: 'event', t: 0, published: 'Just now', fresh: true,
    entity_refs: ['NVDA'],
    headline: 'Unusual NVDA call sweep just printed',
    content_md: `## Unusual NVDA call sweep just printed

A Sep **$190 call sweep** crossed for $4.2M above the ask — the third aggressive print this morning.

- Sep $190C sweep, $4.2M premium, executed above the ask. [Unusual Whales](source:uwhales)
- Call volume is running 2.1× average with skew steepening. [Market data](source:mkt_data)

**Why it matters:** Someone is paying up for immediate upside exposure ahead of the Aug 28 earnings print.`,
    summary: 'A Sep $190 call sweep crossed for $4.2M above the ask — the third aggressive print this morning.',
    why: 'Sweeps above the ask signal urgency: someone is paying up for immediate upside exposure ahead of the Aug 28 earnings print.',
    facts: [
      { text: 'Sep $190C sweep, $4.2M premium, executed above the ask.', sources: ['uwhales'] },
      { text: 'Call volume running 2.1× average with skew steepening.', sources: ['mkt_data'] },
    ],
  },

  /* ---- Following · events ---- */
  {
    id: 'f_tsla_dmv', feed: 'following', kind: 'event', t: 32, published: '32m ago',
    entity_refs: ['TSLA'],
    headline: 'Tesla pulled its robotaxi expansion forward to Q4',
    content_md: `![Autonomous vehicle on an Austin city street](img/hero-robotaxi-v2.jpg)

## Tesla pulled its robotaxi expansion forward to Q4

A Texas DMV filing shows an expanded service area and a fleet target **two quarters ahead** of the stated plan — not yet acknowledged by the company.

- The filing lists a Q4 fleet target, ahead of “mid next year”. [Bloomberg](source:bloomberg)
- Options skew hasn’t moved yet; the market hasn’t priced the filing. [Market data](source:mkt_data)

**Why it matters:** Filings usually lead announcements. If confirmed, the robotaxi narrative gets a hard date.`,
    summary: 'A Texas DMV filing shows an expanded service area and a fleet target two quarters ahead of the stated plan — not yet acknowledged by the company.',
    why: 'Filings usually lead announcements. If confirmed, the robotaxi narrative gets a hard date.',
    facts: [
      { text: 'The filing lists a Q4 fleet target — two quarters ahead of “mid next year”.', sources: ['bloomberg'] },
      { text: 'Options skew hasn’t moved yet; the market hasn’t priced the filing.', sources: ['mkt_data'] },
    ],
    media: { hero: 'img/hero-robotaxi-v2.jpg', alt: 'Autonomous vehicle on an Austin city street' },
  },
  {
    id: 'f_nvda_capex', feed: 'following', kind: 'event', t: 41, published: '41m ago',
    entity_refs: ['NVDA'],
    headline: 'Second hyperscaler this week raised capex guidance',
    content_md: `![AI datacenter racks](img/hero-nvda-datacenter.jpg)

## Second hyperscaler this week raised capex guidance

Two of the four largest cloud buyers lifted full-year capex in the same week, both citing AI infrastructure demand.

- Both raises point to accelerated datacenter buildouts, not one-off projects. [Reuters](source:reuters)
- Supply-chain checks show Blackwell allocation shifting from availability to priority. [@dylan522p](source:dylan)

**Why it matters:** Two independent raises move the read from “steady ramp” to **accelerating ramp**. FY27 consensus for NVIDIA’s data-center line looks low.`,
    summary: 'Two of the four largest cloud buyers lifted full-year capex in the same week, both citing AI infrastructure demand.',
    why: 'Two independent raises in one week moves the read from “steady ramp” to “accelerating ramp” — FY27 consensus for NVIDIA’s data-center line looks low.',
    facts: [
      { text: 'Both raises cite accelerated datacenter buildouts, not one-off projects.', sources: ['reuters'] },
      { text: 'Supply-chain checks point to Blackwell allocation shifting from availability to priority.', sources: ['dylan'] },
    ],
    visual: {
      type: 'columns', eyebrow: 'CLOUD CAPEX · FY26', value: '$392B', delta: '+12% vs prior', note: 'Two guidance raises this week',
      labels: ['MSFT', 'META', 'GOOGL', 'AMZN'], compare: [105, 65, 82, 98], actual: [120, 72, 88, 112],
      compareLabel: 'Prior', actualLabel: 'Current', aria: 'Four hyperscaler capex guidance bars, all revised higher',
    },
    media: { hero: 'img/hero-nvda-datacenter.jpg', alt: 'AI datacenter racks' },
  },
  {
    id: 'f_msft_earnings', feed: 'following', kind: 'event', t: 55, published: '55m ago',
    entity_refs: ['MSFT'],
    headline: 'Azure growth reaccelerated two points above consensus',
    content_md: `## Azure growth reaccelerated two points above consensus

Azure growth reached **39% YoY**, beating the Street by two points as AI workloads moved from pilots into production.

- Azure growth accelerated for a third straight quarter. [Reuters](source:reuters)
- The beat came with stable cloud gross margin, pushing back on the “AI revenue without profit” bear case. [Market data](source:mkt_data)

**Why it matters:** This is the first quarter where faster AI growth and stable margin showed up together — the quality of the beat matters more than its size.`,
    summary: 'Azure growth reached 39% YoY, beating the Street by two points as AI workloads moved from pilots into production.',
    why: 'This is the first quarter where faster AI growth and stable margin showed up together — the quality of the beat matters more than its size.',
    facts: [
      { text: 'Azure growth accelerated for a third straight quarter.', sources: ['reuters'] },
      { text: 'Cloud gross margin remained stable despite higher AI infrastructure depreciation.', sources: ['mkt_data'] },
    ],
    visual: {
      type: 'columns', eyebrow: 'EARNINGS · AZURE GROWTH', value: '39%', delta: '+2 pts vs est.', note: 'YoY · constant currency',
      labels: ['Q1', 'Q2', 'Q3', 'Q4'], compare: [28, 30, 34, 37], actual: [30, 32, 35, 39],
      compareLabel: 'Estimate', actualLabel: 'Actual', aria: 'Azure quarterly growth actual versus estimate, with the latest quarter at 39 percent',
    },
  },
  {
    id: 'f_meta_filing', feed: 'following', kind: 'event', t: 540, published: '9h ago',
    entity_refs: ['META'],
    headline: 'A utility filing just corroborated Meta’s multi-year AI spend',
    content_md: `![Hyperscale data center and electrical substation at dusk](img/hero-datacenter-power-v2.jpg)

## A utility filing just corroborated Meta’s multi-year AI spend

A grid-interconnect request tied to a Meta datacenter campus implies committed capacity through 2028 — spend that no earnings-call walk-back can quietly cancel.

- The request covers phased capacity through 2028. [Bloomberg](source:bloomberg)
- The same pattern appeared across two other hyperscaler campuses this quarter. [@dylan522p](source:dylan)

**Why it matters:** Committed interconnects are the hardest evidence of capex intent. The debate keeps resolving toward **more, for longer**.`,
    summary: 'A grid-interconnect request tied to a Meta datacenter campus implies committed capacity through 2028 — spend that no earnings-call walk-back can quietly cancel.',
    why: 'Committed interconnects are the hardest evidence of capex intent. The AI spend debate keeps resolving toward “more, for longer”.',
    facts: [
      { text: 'The interconnect request covers phased capacity through 2028.', sources: ['bloomberg'] },
      { text: 'Same pattern flagged across two other hyperscaler campuses this quarter.', sources: ['dylan'] },
    ],
    media: { hero: 'img/hero-datacenter-power-v2.jpg', alt: 'Hyperscale data center and electrical substation at dusk' },
  },
  {
    id: 'f_aapl_brk', feed: 'following', kind: 'event', t: 1500, published: '1d ago',
    entity_refs: ['AAPL'],
    headline: 'Berkshire trimmed Apple for a fourth straight quarter',
    content_md: `## Berkshire trimmed Apple for a fourth straight quarter

The latest 13F shows another reduction — the stake is now roughly **half its 2023 peak**. No comment from Omaha, as usual.

- The position was reduced again in the latest filing. [Reuters](source:reuters)

**Why it matters:** One seller doesn’t make a thesis, but four consecutive trims is a pattern — and AAPL’s largest holder keeps choosing cash instead.`,
    summary: 'The latest 13F shows another reduction — the stake is now roughly half its 2023 peak. No comment from Omaha, as usual.',
    why: 'One seller doesn’t make a thesis, but four consecutive trims is a pattern — and AAPL’s largest holder keeps choosing cash instead.',
    facts: [
      { text: '13F filing: stake reduced again; position now ~half of the 2023 peak.', sources: ['reuters'] },
    ],
  },

  /* ---- Following · anomalies ---- */
  {
    id: 'f_mu_move', feed: 'following', kind: 'anomaly', t: 68, published: '1h ago',
    entity_refs: ['MU'],
    headline: 'MU is up 5.8% on 2.4× average volume',
    content_md: `## MU is up 5.8% on 2.4× average volume

- SK Hynix said HBM output is effectively sold out through 2026 — a read-through to the whole memory complex. [Reuters](source:reuters)
- A Sep $150 call sweep printed $3.1M above the ask an hour after the headline. [Unusual Whales](source:uwhales)
- It is the largest single-day move since June; short interest was near a 12-month high coming in. [Market data](source:mkt_data)`,
    move: { value: '+5.8%', dir: 'up', label: 'Today · 2.4× avg volume', spark: [42, 43, 43, 44, 46, 45, 47, 50, 54, 57, 60, 63] },
    visual: {
      type: 'candlestick', eyebrow: 'MU · 1D', badge: 'BREAKOUT', value: '$138.60', note: '2.4× avg volume',
      resistance: 136.0, support: 132.4,
      candles: [
        [128.4, 130.1, 127.6, 129.2, 36], [129.3, 130.0, 127.9, 128.6, 29],
        [128.6, 131.0, 128.1, 130.4, 35], [130.3, 132.0, 129.8, 131.5, 40],
        [131.4, 133.2, 130.9, 132.8, 48], [132.7, 134.4, 132.1, 133.9, 52],
        [133.8, 136.1, 133.1, 135.4, 61], [135.2, 139.4, 134.9, 138.6, 96],
      ],
      aria: 'Micron daily candlestick chart breaking above 136 resistance on elevated volume, with support at 132.4',
    },
    attribution: [
      { text: 'SK Hynix said HBM output is effectively sold out through 2026 — read-through to the whole memory complex.', source: 'reuters' },
      { text: 'A Sep $150 call sweep printed $3.1M above the ask an hour after the headline.', source: 'uwhales' },
      { text: 'Largest single-day move since June; short interest was near a 12-month high coming in.', source: 'mkt_data' },
    ],
  },
  {
    id: 'f_btc_flow', feed: 'following', kind: 'anomaly', t: 150, published: '2h ago',
    entity_refs: ['BTC'],
    headline: 'BTC reclaimed $118K while equities chopped sideways',
    content_md: `## BTC reclaimed $118K while equities chopped sideways

- Spot ETFs took in **+$412M**, a sixth straight day of net inflows. [The Kobeissi Letter](source:kobeissi)
- Strength is concentrated in two issuers, consistent with allocator buying rather than momentum chasing. [Market data](source:mkt_data)`,
    move: { value: '+1.8%', dir: 'up', label: 'Today · decoupled from risk assets', spark: [50, 49, 48, 49, 48, 50, 52, 53, 55, 56, 58, 60] },
    visual: {
      type: 'flow', eyebrow: 'SPOT ETF NET FLOW', badge: '6-DAY STREAK', value: '+$412M', delta: 'Today', note: 'Allocator-led, not leverage-led',
      labels: ['Thu', 'Fri', 'Mon', 'Tue', 'Wed', 'Now'], values: [128, 214, 76, 305, 244, 412],
      aria: 'Six consecutive positive Bitcoin spot ETF flow bars, latest session 412 million dollars',
    },
    attribution: [
      { text: 'Spot ETFs took in +$412M — a sixth straight day of net inflows.', source: 'kobeissi' },
      { text: 'Flow strength is concentrated in two issuers, consistent with allocator buying rather than momentum chasing.', source: 'mkt_data' },
    ],
  },
  {
    id: 'f_amd_prints', feed: 'following', kind: 'anomaly', t: 185, published: '3h ago',
    entity_refs: ['AMD'],
    headline: 'AMD dark-pool prints keep clustering at $186',
    content_md: `## AMD dark-pool prints keep clustering at $186

- Block-sized prints hit the same level for a third straight session — an accumulation pattern, not noise. [Unusual Whales](source:uwhales)
- A hyperscaler is reportedly expanding its MI-series evaluation to production workloads. [Bloomberg](source:bloomberg)`,
    move: { value: '+3.1%', dir: 'up', label: 'Today · 3rd session of clustered prints', spark: [48, 47, 48, 49, 48, 50, 51, 53, 52, 55, 57, 58] },
    attribution: [
      { text: 'Block-sized dark-pool prints at the same level for a third straight session — an accumulation pattern, not noise.', source: 'uwhales' },
      { text: 'A hyperscaler is reportedly expanding its MI-series evaluation to production workloads.', source: 'bloomberg' },
    ],
  },

  /* ---- Alpha · podcast 片段 ---- */
  {
    id: 'a_bg2_capex', feed: 'alpha', kind: 'alpha', t: 120, published: '2h ago',
    entity_refs: ['NVDA', 'MSFT'],
    source: 'bg2', ep: 'E82 · “The trillion-dollar buildout”', at: '41:05', speaker: 'Brad Gerstner',
    quote: 'Every incremental dollar of hyperscaler free cash flow is going into compute. The 2027 capex numbers you see published are floors, not targets.',
    headline: 'Gerstner: published 2027 capex numbers are floors, not targets',
    content_md: `![Studio microphone](img/hero-podcast.jpg)

## Gerstner: published 2027 capex numbers are floors, not targets

> Every incremental dollar of hyperscaler free cash flow is going into compute. The 2027 capex numbers you see published are floors, not targets.

**Why it’s alpha:** Consensus still models FY27 hyperscaler capex as a plateau. If those numbers are floors, datacenter revenue estimates for NVIDIA and its supply chain are too low — and this comes from someone who talks to those CFOs.`,
    media: { hero: 'img/hero-podcast.jpg', alt: 'Studio microphone' },
    insight: 'Consensus still models FY27 hyperscaler capex as a plateau. If those numbers are floors, datacenter revenue estimates for NVIDIA and its supply chain are too low — and this read comes from someone who talks to those CFOs.',
  },
  {
    id: 'a_oddlots_coin', feed: 'alpha', kind: 'alpha', t: 300, published: '5h ago',
    entity_refs: ['COIN'],
    source: 'oddlots', ep: 'How the stablecoin bill rewires money markets', at: '23:40', speaker: 'Guest · payments researcher',
    quote: 'The bill quietly makes regulated exchanges the default custodians of reserve flows. That fee pool doesn’t exist on anyone’s model yet.',
    headline: 'The stablecoin bill creates a fee pool nobody is modeling',
    content_md: `![US Capitol at night](img/hero-capitol.jpg)

## The stablecoin bill creates a fee pool nobody is modeling

> The bill quietly makes regulated exchanges the default custodians of reserve flows. That fee pool doesn’t exist on anyone’s model yet.

**Why it’s alpha:** Sell-side models value Coinbase on trading fees. A custody-and-reserves revenue line from stablecoin regulation is a different business with recurring economics — named in the episode, absent from every published model.`,
    media: { hero: 'img/hero-capitol.jpg', alt: 'US Capitol at night' },
    insight: 'Sell-side models value Coinbase on trading fees. A custody-and-reserves revenue line from stablecoin regulation is a different business with recurring economics — named in the episode, absent from every published model.',
  },
  {
    id: 'a_allin_inference', feed: 'alpha', kind: 'alpha', t: 540, published: '9h ago',
    entity_refs: ['NVDA', 'AMD'],
    source: 'allin', ep: 'E214', at: '41:22', speaker: 'David Friedberg',
    quote: 'Every CFO we talk to has an inference line item now. Two years ago it didn’t exist. We’re underestimating inference demand by an order of magnitude.',
    headline: '“We’re underestimating inference demand by an order of magnitude”',
    content_md: `## “We’re underestimating inference demand by an order of magnitude”

> Every CFO we talk to has an inference line item now. Two years ago it didn’t exist. We’re underestimating inference demand by an order of magnitude.

**Why it’s alpha:** Training demand is priced in; inference demand mostly isn’t. If it compounds the way this claims, deployment capacity — including second-source GPUs — gets bid, and current buildouts are a floor rather than a peak.`,
    insight: 'Training demand is priced in; inference demand mostly isn’t. If it compounds the way this claims, deployment capacity — including second-source GPUs — gets bid, and current buildouts are a floor rather than a peak.',
  },
  {
    id: 'a_iltb_memory', feed: 'alpha', kind: 'alpha', t: 780, published: '13h ago',
    entity_refs: ['MU'],
    source: 'investlike', ep: 'A memory-cycle veteran on this cycle', at: '58:30', speaker: 'Guest · 20-yr semis PM',
    quote: 'I’ve traded five memory cycles. This is the first one where contract pricing is locked two years out. The cycle didn’t get better — it got replaced.',
    headline: 'A five-cycle memory PM says this one is structurally different',
    content_md: `![Memory chip macro](img/hero-hbm-macro.jpg)

## A five-cycle memory PM says this one is structurally different

> I’ve traded five memory cycles. This is the first one where contract pricing is locked two years out. The cycle didn’t get better — it got replaced.

**Why it’s alpha:** Micron still trades on cycle-average multiples. If HBM contract visibility extends into 2027, the multiple framework itself is stale — and this aired 13 hours before today’s SK Hynix sold-out headline.`,
    media: { hero: 'img/hero-hbm-macro.jpg', alt: 'Memory chip macro' },
    insight: 'Micron still trades on cycle-average multiples. If HBM contract visibility really extends into 2027, the multiple framework itself is stale — and this aired 13 hours before today’s SK Hynix sold-out headline.',
  },
  {
    id: 'a_dwarkesh_serving', feed: 'alpha', kind: 'alpha', t: 1560, published: '1d ago',
    entity_refs: ['GOOGL', 'META'],
    source: 'dwarkesh', ep: 'The economics of inference', at: '1:12:08', speaker: 'Guest · frontier-lab researcher',
    quote: 'Serving cost per token is collapsing faster than anyone outside the labs realizes. The constraint moved from training compute to distribution.',
    headline: 'Serving costs are collapsing faster than the market realizes',
    content_md: `![Edge compute infrastructure distributing across a city](img/hero-inference-distribution-v2.jpg)

## Serving costs are collapsing faster than the market realizes

> Serving cost per token is collapsing faster than anyone outside the labs realizes. The constraint moved from training compute to distribution.

**Why it’s alpha:** If inference gets cheap, value shifts from chip vendors to whoever owns distribution — platforms with billions of users capture AI margin the market is still assigning to semis.`,
    media: { hero: 'img/hero-inference-distribution-v2.jpg', alt: 'Edge compute infrastructure distributing across a city' },
    insight: 'The contrarian read: if inference gets cheap, value shifts from chip vendors to whoever owns distribution — platforms with billions of users capture AI margin the market is still assigning to semis.',
  },
  {
    id: 'a_acquired_tsm', feed: 'alpha', kind: 'alpha', t: 2900, published: '2d ago',
    entity_refs: ['TSM', 'NVDA'],
    source: 'acquired', ep: 'TSMC, part II', at: '2:05:44', speaker: 'Ben Gilbert',
    quote: 'Everyone models wafer capacity. The actual constraint on every AI chip shipping next year is advanced packaging — and TSMC owns essentially all of it.',
    headline: 'The real 2027 constraint is packaging, and TSMC owns it',
    content_md: `![Advanced semiconductor packaging with chiplets and copper micro-bumps](img/hero-advanced-packaging-v2.jpg)

## The real 2027 constraint is packaging, and TSMC owns it

> Everyone models wafer capacity. The actual constraint on every AI chip shipping next year is advanced packaging — and TSMC owns essentially all of it.

**Why it’s alpha:** CoWoS capacity, not wafers, decides who ships accelerators in 2027. That makes TSMC the toll collector on the entire AI buildout — a position the usual foundry-multiple framing undervalues.`,
    media: { hero: 'img/hero-advanced-packaging-v2.jpg', alt: 'Advanced semiconductor packaging with chiplets and copper micro-bumps' },
    insight: 'CoWoS capacity, not wafers, decides who ships accelerators in 2027. That makes TSMC the toll collector on the entire AI buildout — a position the usual foundry-multiple framing undervalues.',
  },
];

/* ========== Chat（Tasks tab 的一次性子任务样例） ========== */
export const TASKS = [
  { id: 'tk_hbm_map', title: 'Map HBM price transmission to NVDA margins', status: 'running', from: 'Spun off from chat · 20m ago' },
  { id: 'tk_bear_memo', title: 'MU bear case one-pager', status: 'done', from: 'Spun off from chat · yesterday' },
];

/* ========== Chat · Files（会话产出的文件） ========== */
export const FILES = [
  { name: 'hbm-price-transmission.md', kind: 'Report', size: '18 KB', t: '20m ago', from: 'From task · HBM price transmission' },
  { name: 'mu-bear-case.md', kind: 'One-pager', size: '9 KB', t: 'Yesterday', from: 'From task · MU bear case' },
  { name: 'nvda-aug28-earnings-preview.md', kind: 'Note', size: '12 KB', t: '2d ago', from: 'Asked in chat' },
  { name: 'coin-breakout-levels.png', kind: 'Chart', size: '214 KB', t: '1w ago', from: 'Asked in chat' },
  { name: 'portfolio-snapshot.csv', kind: 'Export', size: '3 KB', t: '1w ago', from: 'Exported from chat' },
];

/* ========== Onboarding / Discover ========== */
export const ONBOARD_ENTITIES = [
  { id: 'NVDA', hint: 'AI compute' }, { id: 'TSLA', hint: 'EV · Robotaxi' },
  { id: 'BTC', hint: 'Crypto' }, { id: 'MU', hint: 'Memory' },
  { id: 'AMD', hint: 'AI compute' }, { id: 'META', hint: 'AI · Ads' },
  { id: 'TSM', hint: 'Foundry' }, { id: 'COIN', hint: 'Crypto equities' },
  { id: 'AAPL', hint: 'Consumer tech' }, { id: 'GOOGL', hint: 'Search · AI' },
];

export const DISCOVER = {
  movers: ['MU', 'AMD', 'COIN', 'NVDA', 'TSM', 'TSLA'],
};

/* ========== Helpers ========== */
export const entityChipLabel = (id) => ENTITIES[id] ? ENTITIES[id].ticker : id;

/* 卡片引用到的 source id 列表（溯源入口 + 卡背共用） */
export function itemSources(item) {
  if (item.kind === 'alpha') return [item.source];
  if (item.kind === 'anomaly') return [...new Set(item.attribution.map((a) => a.source))];
  return [...new Set(item.facts.flatMap((f) => f.sources))];
}
