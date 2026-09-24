// Thesis · Web IA demo — mock 数据。人物沿用 Figma 稿里的公开人物作占位，文案全部为 mock。
export const ROOT = '../../';
export const MVP = '../alva-mobile-mvp/img/';
export const TD = ROOT + 'thesis-demo/';
export const SNAPSHOT_URL = './market-snapshot.json'; // Alva Arrays 日线快照 2026-03-02 → 2026-09-22，覆盖 thesis 使用的 15 只 ticker
export const ICON_CDN = 'https://alva-ai-static.b-cdn.net/icons/';

const CDN_LOGOS = new Set(['AAPL', 'AMD', 'AMZN', 'COIN', 'GOOGL', 'HOOD', 'META', 'MU', 'NVDA', 'TSLA', 'TSM', 'QQQ', 'SPY', 'UBER', 'WMT', 'NFLX', 'IBM']);
export function tickerLogo(sym) {
  const k = String(sym).toUpperCase();
  if (k === 'MSFT') return ROOT + 'logo-stock-msft.png';
  if (CDN_LOGOS.has(k)) return `${ICON_CDN}logo-stock-${k.toLowerCase()}.svg`;
  return null;
}

export const TICKERS = {
  NVDA: { name: 'NVIDIA Corporation', venue: 'NASDAQ', industry: 'Semiconductors' },
  MSFT: { name: 'Microsoft Corporation', venue: 'NASDAQ', industry: 'Software' },
  AMZN: { name: 'Amazon.com, Inc.', venue: 'NASDAQ', industry: 'Internet Retail' },
  GOOGL: { name: 'Alphabet Inc.', venue: 'NASDAQ', industry: 'Internet Content' },
  META: { name: 'Meta Platforms, Inc.', venue: 'NASDAQ', industry: 'Internet Content' },
  AMD: { name: 'Advanced Micro Devices, Inc.', venue: 'NASDAQ', industry: 'Semiconductors' },
  TSLA: { name: 'Tesla, Inc.', venue: 'NASDAQ', industry: 'Auto Manufacturers' },
  AAPL: { name: 'Apple Inc.', venue: 'NASDAQ', industry: 'Consumer Electronics' },
  MU: { name: 'Micron Technology, Inc.', venue: 'NASDAQ', industry: 'Semiconductors' },
  HOOD: { name: 'Robinhood Markets, Inc.', venue: 'NASDAQ', industry: 'Capital Markets' },
  TSM: { name: 'Taiwan Semiconductor', venue: 'NYSE', industry: 'Semiconductors' },
  'BRK.B': { name: 'Berkshire Hathaway Inc.', venue: 'NYSE', industry: 'Insurance' },
  MRK: { name: 'Merck & Co., Inc.', venue: 'NYSE', industry: 'Pharmaceuticals' },
  MRNA: { name: 'Moderna, Inc.', venue: 'NASDAQ', industry: 'Biotechnology' },
  COIN: { name: 'Coinbase Global, Inc.', venue: 'NASDAQ', industry: 'Capital Markets' },
};
// 正文里的公司名 → ticker（composer 自动识别用）
export const COMPANY_NAMES = {
  nvidia: 'NVDA', microsoft: 'MSFT', azure: 'MSFT', copilot: 'MSFT', amazon: 'AMZN', aws: 'AMZN', google: 'GOOGL', alphabet: 'GOOGL',
  'meta platforms': 'META', tesla: 'TSLA', apple: 'AAPL', micron: 'MU', robinhood: 'HOOD', tsmc: 'TSM', 'taiwan semi': 'TSM',
  berkshire: 'BRK.B', merck: 'MRK', moderna: 'MRNA', coinbase: 'COIN',
};

export const AUTHORS = {
  yggyll: { name: 'YGGYLL', handle: '@yggyll', role: 'Momentum & breakouts · US tech', bio: 'Tracking momentum, breakouts and asymmetric risk across US tech and mid-cap alts.', avatar: ROOT + 'portrait.png', pro: true, member: true, joined: 'Dec 23, 2025', followers: '1.2K', following: 128, links: [['x', '@yggyll'], ['tg', '@YGGYLLSignals']], me: true },
  gavin: { name: 'Gavin Baker', handle: '@GavinSBaker', role: 'Managing Partner & CIO, Atreides', bio: 'Long-horizon technology investor. Writes about AI infrastructure economics and where the profit pool moves next.', avatar: TD + 'avatar-gavin-baker.png', member: true, pro: true, joined: 'Mar 4, 2026', followers: '48.2K', following: 312, links: [['x', '@GavinSBaker']] },
  satya: { name: 'Satya Nadella', handle: '@satyanadella', role: 'Chairman & CEO, Microsoft', bio: 'Chairman and CEO at Microsoft.', avatar: TD + 'avatar-satya-nadella.png', member: true, joined: 'Jan 12, 2026', followers: '3.4M', following: 41, links: [['x', '@satyanadella']] },
  sama: { name: 'Sam Altman', handle: '@sama', role: 'Co-founder, OpenAI', bio: 'Co-founder of OpenAI.', avatar: 'avatars/sama.jpg', member: true, joined: 'Feb 2, 2026', followers: '2.9M', following: 12, links: [['x', '@sama']] },
  reuters: { name: 'Reuters', handle: '@Reuters', role: 'News agency', bio: 'Business, financial, national and international news.', avatar: 'avatars/reuters.jpg', member: false, org: true, followers: '26M', links: [['x', '@Reuters']] },
  traderstewie: { name: 'Traderstewie', handle: '@traderstewie', role: 'Trader · Trade setup', bio: 'Swing trader. Charts, setups and the levels that matter. Not advice.', avatar: TD + 'avatar-traderstewie.png', member: true, pro: true, joined: 'Feb 20, 2026', followers: '312K', following: 880, links: [['x', '@traderstewie']] },
  chamath: { name: 'Chamath Palihapitiya', handle: '@chamath', role: 'Founder & CEO, Social Capital', bio: 'Long-horizon technology investor and former Facebook executive. Writes on AI infrastructure economics, capital discipline and index-level risk, and returns often to how compute costs reset software margins.', avatar: 'avatars/chamath.jpg', member: false, followers: '12.8K', links: [['x', '@chamath']] },
  maya: { name: 'Maya Reynolds', handle: '@maya', role: 'Equity research · US semis', bio: 'Equity research on US semis and hyperscalers. I publish when the evidence changes.', avatar: ROOT + 'avatars/mira-chen.png', member: true, pro: true, joined: 'Mar 4, 2026', followers: '2.4K', following: 86, links: [['x', '@mayareynolds'], ['tg', '@MayaResearch']] },
  beth: { name: 'Beth Kindig', handle: '@Beth_Kindig', role: 'Lead Tech Analyst, I/O Fund', bio: 'Lead tech analyst at I/O Fund. Covers AI, semis and cloud.', avatar: TD + 'avatar-beth-kindig.png', member: true, joined: 'Apr 1, 2026', followers: '96K', following: 210, links: [['x', '@Beth_Kindig']] },
  ives: { name: 'Dan Ives', handle: '@DivesTech', role: 'Managing Director, Wedbush', bio: 'Global Head of Technology Research at Wedbush Securities.', avatar: TD + 'avatar-dan-ives.png', member: true, joined: 'Apr 9, 2026', followers: '210K', following: 55, links: [['x', '@DivesTech']] },
  cathie: { name: 'Cathie Wood', handle: '@CathieDWood', role: 'CEO & CIO, ARK Invest', bio: 'Founder, CEO and CIO of ARK Invest.', avatar: TD + 'avatar-cathie-wood.png', member: true, joined: 'Feb 11, 2026', followers: '1.7M', following: 24, links: [['x', '@CathieDWood']] },
  damodaran: { name: 'Aswath Damodaran', handle: '@AswathDamodaran', role: 'Professor of Finance, NYU Stern', bio: 'Teaches corporate finance and valuation at NYU Stern.', avatar: TD + 'avatar-aswath-damodaran.png', member: false, followers: '410K', links: [['x', '@AswathDamodaran']] },
  bryson: { name: 'Matt Bryson', handle: '@MattBryson', role: 'Managing Director, Equity Research · Wedbush', bio: 'Semiconductor and hardware equity research.', avatar: TD + 'avatar-matt-bryson.png', member: true, joined: 'May 6, 2026', followers: '8.1K', following: 130, links: [['x', '@MattBryson']] },
  ackman: { name: 'Bill Ackman', handle: '@BillAckman', role: 'CEO, Pershing Square', bio: 'CEO of Pershing Square Capital Management.', avatar: 'avatars/billackman.jpg', member: false, followers: '1.9M', links: [['x', '@BillAckman']] },
  marks: { name: 'Howard Marks', handle: '@HowardMarksBook', role: 'Co-chairman, Oaktree Capital', bio: 'Co-founder and co-chairman of Oaktree Capital Management.', avatar: 'avatars/howardmarks.jpg', member: false, followers: '620K', links: [['x', '@HowardMarksBook']] },
  munster: { name: 'Gene Munster', handle: '@munster_gene', role: 'Managing Partner, Deepwater', bio: 'Managing partner at Deepwater Asset Management.', avatar: 'avatars/munster.jpg', member: true, joined: 'Jun 2, 2026', followers: '140K', following: 300, links: [['x', '@munster_gene']] },
  tenev: { name: 'Vlad Tenev', handle: '@vladtenev', role: 'CEO & co-founder, Robinhood', bio: 'CEO and co-founder of Robinhood.', avatar: TD + 'avatar-vlad-tenev.png', member: true, joined: 'Jun 20, 2026', followers: '380K', following: 90, links: [['x', '@vladtenev']] },
  dylan: { name: 'Dylan Patel', handle: '@dylan522p', role: 'Founder & Chief Analyst, SemiAnalysis', bio: 'Chief analyst at SemiAnalysis.', avatar: TD + 'avatar-dylan-patel.png', member: true, joined: 'Jan 30, 2026', followers: '260K', following: 410, links: [['x', '@dylan522p']] },
  semianalysis: { name: 'SemiAnalysis', role: 'Semiconductor & AI research', avatar: 'avatars/semianalysis.jpg', org: true, member: false },
  kobeissi: { name: 'The Kobeissi Letter', role: 'Market research', avatar: TD + 'avatar-kobeissi.png', org: true, member: false },
  whales: { name: 'Unusual Whales', role: 'Options flow data', avatar: TD + 'avatar-unusual-whales.png', org: true, member: false },
  ms: { name: 'Morgan Stanley', role: 'Keith Weiss, Software equity research', avatar: TD + 'avatar-morgan-stanley.png', org: true, member: false },
  msftcall: { name: 'Microsoft FY26 Q1 earnings call', role: 'Company disclosure', avatar: TD + 'avatar-microsoft.png', org: true, member: false },
  tsmc: { name: 'TSMC monthly revenue', role: 'Company disclosure', avatar: TD + 'avatar-tsmc.png', org: true, member: false },
  riot: { name: 'Riot Platforms', role: 'Digital infrastructure company', avatar: null, initial: 'R', color: '#E8891D', org: true, member: false },
};
for (const [k, v] of Object.entries(AUTHORS)) v.id = k;

const SRC_STEWIE = { label: 'Traderstewie on X', href: 'https://x.com/traderstewie' };
const IMG = (file, alt) => ({ img: TD + file, alt });
const HERO = (file, alt) => ({ img: MVP + file, alt });
const C = (chart) => ({ chart });
const up = (symbol) => ({ symbol, direction: 'up' });
const down = (symbol) => ({ symbol, direction: 'down' });

// versions：新 → 旧，第一条是当前版本
export const THESES = [
  {
    id: 'gavin-ai-flow', authorId: 'gavin', kind: 'update', time: '3h ago', saves: 68, saved: true, newSignals: 3, status: 'active', visibility: 'public',
    signals: ['tenev-record', 'dylan-rubin', 'msft-q1', 'munster-broadening', 'kobeissi-retail', 'whales-nvda', 'ms-target', 'tsmc-sep'],
    // Related 的顺序故意长短相间，瀑布流才看得出错落
    related: ['tenev-record', 'satya-azure', 'dylan-rubin', 'kobeissi-retail', 'beth-nvda', 'ackman-power', 'ives-cycle', 'semi-tpu', 'munster-distribution', 'gavin-credit'],
    versions: [
      { time: '13 Sep, 08:12', latest: true, source: SRC_STEWIE, media: [IMG('media-x-post.png', 'Traderstewie X post screenshot'), IMG('media-segments.png', 'Revenue breakdown by segment'), C('MSFT'), C('NVDA')], tickers: [up('MSFT'), up('NVDA'), down('HOOD')],
        paragraphs: [
          'Retail participation is back, and the flow is concentrating in a handful of AI leaders rather than spreading across the tape. This thesis treats that concentration as the setup: own the name that supplies the compute, the name that monetizes it, and the venue where the retail flow gets executed.',
          'NVDA remains the cleanest read on the build-out, and every dip into the 50-day keeps getting bought.',
          'MSFT is the monetization leg. Azure growth is re-accelerating on AI workloads, and Copilot seat expansion turns capex into recurring revenue faster than the market credits. The stock has been consolidating under its summer high; a close above it would confirm the next leg.',
        ] },
      { time: '10 Sep, 14:32', source: SRC_STEWIE, media: [C('MSFT')], tickers: [up('MSFT'), up('NVDA'), down('HOOD')],
        paragraphs: [
          'MSFT is coiling right under its summer high while NVDA keeps getting bought on every dip into the 50-day. The setup is unchanged: compute, monetization, and the venue.',
          "Azure's re-acceleration on AI workloads is the tell. Copilot seats are converting capex into recurring revenue faster than consensus models assume.",
          'A daily close above the summer high confirms the next leg. A failure there, plus a loss of the 50-day on NVDA, would put the whole setup on hold.',
        ] },
      { time: '6 Sep, 16:45', source: SRC_STEWIE, media: [], tickers: [up('MSFT'), up('NVDA'), down('HOOD')],
        paragraphs: [
          'Adding HOOD as the third leg. Options and equity volumes track retail engagement in exactly the names this thesis owns, so it compounds the same flow from the other side.',
          'The first two legs are unchanged: NVDA supplies the compute, MSFT monetizes it. HOOD is where the retail flow that is bidding both gets executed.',
        ] },
      { time: '3 Sep, 11:06', source: SRC_STEWIE, media: [IMG('media-nvda-coins.png', 'NVDA daily chart annotation'), C('NVDA')], tickers: [up('MSFT'), up('NVDA')],
        paragraphs: [
          'NVDA pullbacks into the 50-day average keep getting bought within days. Three tests since June, three recoveries, each on rising volume.',
          'As long as that pattern holds, the trend is intact and dips are entries, not exits. The invalidation is a close below the 50-day that is not reclaimed within a week.',
        ] },
      { time: '30 Aug, 08:24', source: SRC_STEWIE, media: [], tickers: [up('MSFT'), up('NVDA')],
        paragraphs: [
          'Retail flow is coming back, and it is concentrating in a handful of AI leaders rather than spreading across the tape.',
          'Starting the thesis with two legs: NVDA for the compute build-out and MSFT for turning that build-out into recurring cloud revenue. A venue leg gets added once the flow data confirms.',
        ] },
    ],
  },
  {
    id: 'satya-azure', authorId: 'satya', kind: 'new', time: '1h ago', saves: 32, saved: true, newSignals: 1, status: 'active', visibility: 'public',
    versions: [{ time: '22 Sep, 09:40', latest: true, source: { label: 'Satya Nadella on X', href: 'https://x.com/satyanadella' }, media: [C('MSFT')], tickers: [up('MSFT')],
      paragraphs: [
        'Azure surpassed $75 billion in annual revenue, up 34%. Microsoft added more than two gigawatts of datacenter capacity over the previous 12 months and now had over 400 datacenters across 70 regions.',
        'Every dollar of that capacity is already contracted. The constraint on AI revenue is power and permitting, not demand.',
      ] }],
  },
  {
    id: 'maya-memory', authorId: 'maya', kind: 'new', time: '5h ago', saves: 12, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '22 Sep, 06:15', latest: true, source: { label: 'Maya Reynolds on Alva', href: '#' }, media: [C('MU')], tickers: [up('MU')],
      paragraphs: [
        'Hyperscaler capex guidance keeps rising while GPU lead times fall. That combination favours memory over logic into 2027: HBM is the part of the bill of materials that is still sold out.',
        "Micron's HBM share gains are the cleanest way to own it. The invalidation is Samsung passing HBM4 qualification at Nvidia a quarter early.",
      ] }],
  },
  {
    id: 'reuters-mrna', authorId: 'reuters', kind: 'new', time: '2h ago', saves: 96, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '22 Sep, 08:05', latest: true, source: { label: 'reuters.com', href: 'https://www.reuters.com' }, media: [], tickers: [up('MRK'), up('MRNA')],
      paragraphs: [
        'Merck and Moderna said their personalized mRNA therapy met its primary endpoint and a key secondary endpoint in a late-stage melanoma trial, the first positive Phase 3 result for an mRNA cancer vaccine.',
      ] }],
  },
  {
    id: 'traderstewie-amd', authorId: 'traderstewie', kind: 'update', time: 'Sep 13', saves: 68, saved: true, status: 'active', visibility: 'public',
    signals: ['semi-mi355', 'bryson-maia', 'riot-deal'],
    versions: [
      { time: '13 Sep, 08:12', latest: true, source: SRC_STEWIE, media: [C('AMD')], tickers: [up('AMD')],
        paragraphs: [
          'AMD is approaching its summer high as more buyers join the advance.',
          'The stock has broken higher after its last pullback stopped above the previous low. Rising trading volume makes the recovery more convincing.',
        ] },
      { time: '6 Sep, 09:40', source: SRC_STEWIE, media: [C('AMD')], tickers: [up('AMD')],
        paragraphs: ['Pullback held above the August low on light volume. The setup stays valid while the 50-day holds; a close below it on rising volume is the exit.'] },
      { time: '30 Aug, 08:24', source: SRC_STEWIE, media: [], tickers: [up('AMD')],
        paragraphs: ['Starting to track AMD into the MI355 ramp: the chart is basing under the summer high and options skew has flipped bullish for the first time since spring.'] },
    ],
  },
  {
    id: 'sama-compute', authorId: 'sama', kind: 'new', time: 'Sep 23', saves: 63, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '23 Sep, 2024', latest: true, source: { label: 'ia.samaltman.com', href: 'https://ia.samaltman.com' }, media: [], tickers: [],
      paragraphs: [
        'Broad access to AI depends on abundant, affordable compute, supported by enough energy and chips. Without that infrastructure, AI could become a scarce resource whose benefits concentrate among the wealthy.',
        'The bottleneck moves from model quality to energy: whoever can build gigawatts fastest sets the price of intelligence.',
      ] }],
  },
  {
    id: 'chamath-googl', authorId: 'chamath', kind: 'new', time: 'Jul 24', saves: 32, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '24 Jul, 10:30', latest: true, source: { label: 'chamath on X', href: 'https://x.com/chamath' }, media: [C('GOOGL')], tickers: [up('GOOGL')],
      paragraphs: [
        'Google can monetize AI across chips, cloud, applications and advertising; a fragmented model landscape can still benefit an integrated platform with strong capital-allocation capabilities.',
        'The market keeps pricing Search disruption without pricing TPU economics.',
      ] }],
  },
  {
    id: 'gavin-credit', authorId: 'gavin', kind: 'new', time: 'Jul 29', saves: 41, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '29 Jul, 07:50', latest: true, source: { label: 'Gavin Baker on X', href: 'https://x.com/GavinSBaker' }, media: [C('GOOGL'), C('AMZN'), C('MSFT')], tickers: [up('GOOGL'), up('AMZN'), up('MSFT')],
      paragraphs: [
        '1. Market is overreacting to hyperscale credit spreads widening.',
        '2. Spot pricing for renting GPU compute materially above contracted rates implies hyperscalers are under-earning on their installed fleet.',
        '3. Operating cash flow acceleration is an underestimated offset to capex. The debt-funded narrative misses it.',
      ] }],
  },
  {
    id: 'beth-nvda', authorId: 'beth', kind: 'new', time: 'Sep 8', saves: 57, saved: true, newSignals: 2, status: 'active', visibility: 'public',
    versions: [{ time: '8 Sep, 15:20', latest: true, source: { label: 'io-fund.com', href: 'https://io-fund.com' }, media: [C('NVDA')], tickers: [up('NVDA')],
      paragraphs: ["Nvidia's data center revenue is still being underestimated. Inference is becoming the larger workload, and every cut in token price has been met with more usage, not less."] }],
  },
  {
    id: 'ives-cycle', authorId: 'ives', kind: 'new', time: 'Sep 5', saves: 44, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '5 Sep, 11:00', latest: true, source: { label: 'Dan Ives on X', href: 'https://x.com/DivesTech' }, media: [C('NVDA'), C('MSFT')], tickers: [up('NVDA'), up('MSFT')],
      paragraphs: ['The AI build-out is a multi-year cycle, not a quarter-to-quarter trade. Semis and cloud infrastructure remain the cleanest way to own it, and every 10% pullback has been a buying window.'] }],
  },
  {
    id: 'damodaran-capex', authorId: 'damodaran', kind: 'update', time: 'Sep 6', saves: 52, saved: false, status: 'active', visibility: 'public',
    versions: [
      { time: '6 Sep, 18:10', latest: true, source: { label: 'Musings on Markets', href: 'https://aswathdamodaran.blogspot.com' }, media: [C('GOOGL'), C('AMZN'), C('MSFT')], tickers: [up('GOOGL'), up('AMZN'), up('MSFT')],
        paragraphs: ['Hyperscaler capex only creates value if returns clear the cost of capital. Markets are pricing the spend as if that question were already settled, and the three largest spenders trade as if execution risk were zero.'] },
      { time: '2 Aug, 09:00', source: { label: 'Musings on Markets', href: 'https://aswathdamodaran.blogspot.com' }, media: [], tickers: [up('GOOGL'), up('AMZN'), up('MSFT')],
        paragraphs: ['First pass at valuing the AI capex cycle: the spend is real, the return on it is an assumption.'] },
    ],
  },
  {
    id: 'cathie-hood', authorId: 'cathie', kind: 'new', time: 'Sep 2', saves: 38, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '2 Sep, 13:45', latest: true, source: { label: 'ark-invest.com', href: 'https://ark-invest.com' }, media: [], tickers: [up('HOOD')],
      paragraphs: ['Robinhood is becoming the default brokerage for the next generation of investors. Crypto and options are the wedge; wealth management is the prize.'] }],
  },
  {
    id: 'bryson-tsm', authorId: 'bryson', kind: 'new', time: 'Sep 9', saves: 29, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '9 Sep, 08:00', latest: true, source: { label: 'Wedbush research note', href: '#' }, media: [], tickers: [up('TSM')],
      paragraphs: ['Custom silicon is the next leg of the AI trade. As Microsoft scales Maia and Google scales TPU, Marvell and TSMC capture design and manufacturing spend that used to flow only to Nvidia.'] }],
  },
  // ── 给 Related 瀑布流拉开高矮的几条：一句话无图 / 长文双图 / 中等单图 ──
  {
    id: 'tenev-record', authorId: 'tenev', kind: 'new', time: 'Sep 16', saves: 21, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '16 Sep, 08:20', latest: true, source: { label: 'Vlad Tenev on X', href: 'https://x.com/vladtenev' }, media: [], tickers: [up('HOOD')],
      paragraphs: ['Record options month. Under-35 is now the fastest-growing cohort.'] }],
  },
  {
    id: 'dylan-rubin', authorId: 'dylan', kind: 'update', time: 'Sep 15', saves: 74, saved: false, status: 'active', visibility: 'public',
    versions: [
      { time: '15 Sep, 22:05', latest: true, source: { label: 'semianalysis.com', href: 'https://semianalysis.com' }, media: [HERO('hero-nvda-datacenter.jpg', 'NVIDIA datacenter'), C('NVDA')], tickers: [up('NVDA'), up('MU')],
        paragraphs: [
          'Rubin CPX pricing suggests Nvidia holds gross margin into 2027 even as supply catches up. The part the market misses: the CPX SKU is priced per rack, not per die, so mix shift alone adds margin.',
          'If HBM4 supply loosens faster than expected, that argument weakens. Watch Micron and SK hynix commentary through October.',
        ] },
      { time: '2 Sep, 10:15', source: { label: 'semianalysis.com', href: 'https://semianalysis.com' }, media: [C('NVDA')], tickers: [up('NVDA')],
        paragraphs: ['First read on Rubin pricing: the rack-level SKU is the tell. Margin holds if supply stays tight.'] },
    ],
  },
  {
    id: 'munster-distribution', authorId: 'munster', kind: 'new', time: 'Sep 15', saves: 36, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '15 Sep, 13:40', latest: true, source: { label: 'deepwatermgmt.com', href: 'https://deepwatermgmt.com' }, media: [HERO('hero-inference-distribution-v2.jpg', 'Inference distribution')], tickers: [up('MSFT'), up('GOOGL'), up('META')],
      paragraphs: ['The AI trade is broadening from picks-and-shovels to platform monetization, which favours owners of distribution: Microsoft, Google and Meta already have the seats, the search box and the feed.'] }],
  },
  {
    id: 'semi-tpu', authorId: 'semianalysis', kind: 'new', time: 'Aug 12', saves: 88, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '12 Aug, 07:00', latest: true, source: { label: 'SemiAnalysis on X', href: 'https://x.com/SemiAnalysis_' }, media: [HERO('hero-advanced-packaging-v2.jpg', 'Advanced packaging'), C('GOOGL'), C('NVDA')], tickers: [up('GOOGL'), down('NVDA')],
      paragraphs: ['TPUv8i is in internal software bring-up, with work beginning on the public software stack. If Google opens TPU to external customers at scale, the pricing umbrella under Nvidia gets its first real test.'] }],
  },
  {
    id: 'kobeissi-retail', authorId: 'kobeissi', kind: 'new', time: 'Sep 14', saves: 152, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '14 Sep, 19:15', latest: true, source: { label: 'kobeissiletter.com', href: 'https://kobeissiletter.com' }, media: [HERO('hero-capex-grid.jpg', 'Capex grid')], tickers: [up('NVDA'), up('MSFT'), up('HOOD')],
      paragraphs: [
        'Retail net buying averaged $1.2 billion a day in September, the highest since 2021 and concentrated in seven AI names.',
        'Concentration this high has historically preceded 10%+ drawdowns in the leaders within 90 days. Not a call on direction, a call on the range.',
      ] }],
  },
  {
    id: 'ackman-power', authorId: 'ackman', kind: 'new', time: 'Sep 11', saves: 67, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '11 Sep, 16:30', latest: true, source: { label: 'Bill Ackman on X', href: 'https://x.com/BillAckman' }, media: [HERO('hero-nuclear.jpg', 'Nuclear plant'), HERO('hero-datacenter-power-v2.jpg', 'Datacenter power')], tickers: [up('MSFT'), up('NVDA')],
      paragraphs: ['Power, not chips, is the binding constraint on the AI build-out through 2028. Every hyperscaler capex number assumes grid interconnects that do not exist yet.'] }],
  },
  // ── 我自己的 thesis（主态 / 管理面用） ──
  {
    id: 'yggyll-azure', authorId: 'yggyll', kind: 'update', time: '1h ago', saves: 32, saved: false, status: 'active', visibility: 'public',
    versions: [
      { time: '22 Sep, 10:02', latest: true, source: { label: 'YGGYLL on Alva', href: '#' }, media: [HERO('hero-datacenter-power-v2.jpg', 'Datacenter power'), C('MSFT')], tickers: [up('MSFT')],
        paragraphs: [
          "Azure's 34% growth is not the story. The two gigawatts of new capacity is: Microsoft is the only hyperscaler whose AI revenue is already capacity-limited rather than demand-limited.",
          'Long into the next capacity update. A slowdown in datacenter additions is the invalidation, not a soft quarter.',
        ] },
      { time: '19 Aug, 21:15', source: { label: 'YGGYLL on Alva', href: '#' }, media: [C('MSFT')], tickers: [up('MSFT')],
        paragraphs: ['Opening the position: Azure growth re-accelerated for the second quarter in a row and Copilot seats are finally showing up in commercial bookings.'] },
    ],
  },
  {
    id: 'yggyll-brk', authorId: 'yggyll', kind: 'new', time: 'Sep 10', saves: 41, saved: false, status: 'active', visibility: 'public',
    versions: [{ time: '10 Sep, 08:30', latest: true, source: { label: 'YGGYLL on Alva', href: '#' }, media: [], tickers: [up('BRK.B')],
      paragraphs: [
        "Berkshire's board unanimously appointed Greg Abel as President and CEO, effective January 1, 2026. Warren Buffett would remain Chairman of the Board.",
        'The transition removes the succession discount. I expect the cash pile to start working within two quarters.',
      ] }],
  },
  {
    id: 'yggyll-mu-private', authorId: 'yggyll', kind: 'new', time: 'Sep 3', saves: 0, saved: false, status: 'active', visibility: 'private',
    versions: [{ time: '3 Sep, 22:40', latest: true, source: { label: 'YGGYLL on Alva', href: '#' }, media: [C('MU')], tickers: [up('MU')],
      paragraphs: ['Micron HBM pricing holds through 2027 even as Samsung ramps. The contract structure matters more than spot DRAM, and the market is still pricing this as a commodity cycle.'] }],
  },
  {
    id: 'yggyll-mrna-archived', authorId: 'yggyll', kind: 'new', time: 'Jun 14', saves: 18, saved: false, status: 'archived', visibility: 'public',
    versions: [{ time: '14 Jun, 07:55', latest: true, source: { label: 'YGGYLL on Alva', href: '#' }, media: [], tickers: [up('MRNA')],
      paragraphs: ['mRNA oncology is the next platform shift for Moderna. The melanoma Phase 3 readout in September is the catalyst; a miss ends the thesis.'] }],
  },
];

// 按 ticker 归类的 signal 池；thesis 没显式 signals 时按其 ticker 取
export const SIGNALS = {
  'tenev-record': { authorId: 'tenev', time: '16 Sep, 08:20', link: 'x.com', quote: 'Options volumes set a September record, and the fastest-growing cohort is traders under 35.', alva: 'A direct read on the venue leg; one record month is not a trend, and volumes fall fastest when volatility does.' },
  'dylan-rubin': { authorId: 'dylan', time: '15 Sep, 22:05', link: 'x.com', quote: 'Rubin CPX pricing suggests Nvidia holds gross margin into 2027 even as supply catches up.', alva: 'Supports pricing power on the compute leg; a third-party margin estimate is not company guidance.' },
  'msft-q1': { authorId: 'msftcall', time: '15 Sep, 21:00', link: 'microsoft.com', quote: 'Azure grew 39% year over year with AI services contributing 16 points, and capacity stays constrained into the second half.', alva: 'Confirms the monetization leg is accelerating; being capacity constrained caps how fast it converts.' },
  'munster-broadening': { authorId: 'munster', time: '15 Sep, 13:40', link: 'deepwatermgmt.com', quote: 'The AI trade is broadening from picks-and-shovels to platform monetization, which favours owners of distribution.', alva: 'Matches how this thesis is structured; a framing call, not evidence the shift has happened.' },
  'kobeissi-retail': { authorId: 'kobeissi', time: '14 Sep, 19:15', link: 'kobeissiletter.com', quote: 'Retail net buying averaged $1.2 billion a day in September, the highest since 2021 and concentrated in seven AI names.', alva: 'The clearest support for the flow premise; that same concentration is what hurts when it reverses.' },
  'whales-nvda': { authorId: 'whales', time: '14 Sep, 10:05', link: 'unusualwhales.com', quote: 'NVDA call volume doubled ahead of GTC and HOOD open interest hit a record.', alva: 'Consistent with retail engagement; positioning data says nothing about underlying earnings.' },
  'ms-target': { authorId: 'ms', time: '13 Sep, 16:30', link: 'morganstanley.com', quote: 'Raises the Microsoft target on Copilot attach rates and sees Azure reaccelerating through FY27.', alva: 'Sell-side confirmation of the monetization leg; price targets move with sentiment faster than with revenue.' },
  'tsmc-sep': { authorId: 'tsmc', time: '12 Sep, 09:00', link: 'tsmc.com', quote: 'September revenue rose 39% year over year on AI accelerator demand.', alva: 'Upstream confirmation that accelerator shipments keep climbing; the release does not split AI from the rest.' },
  'semi-mi355': { authorId: 'semianalysis', time: '12 Aug, 07:00', link: 'semianalysis.com', quote: 'MI355X volume ramps at two hyperscalers this quarter; ROCm 7 closes most of the software gap for inference.', alva: 'Supports the product-cycle premise; a ramp announcement is not shipped revenue until the next 10-Q.' },
  'bryson-maia': { authorId: 'bryson', time: '12 Aug, 03:00', link: 'tradingview.com', quote: 'Wedbush sees an opportunity for Marvell and TSMC as Microsoft prepares Maia 300.', alva: 'Custom accelerators may lower compute costs; an unveiling is not evidence of deployment or returns.' },
  'riot-deal': { authorId: 'riot', time: '11 Aug, 23:00', link: 'tradingview.com', quote: 'Riot Platforms announced a $9.1 billion compute supply deal; a source identified the customer as Anthropic.', alva: 'Adds to demand for GPU capacity outside the hyperscalers; one anonymous-sourced deal is thin evidence.' },
  'semi-tpu': { authorId: 'semianalysis', time: '12 Aug, 07:00', link: 'x.com', quote: 'SemiAnalysis reports TPUv8i is in internal software bring-up, with work beginning on the public software stack.', alva: 'TPU commercialization could support the infrastructure thesis; adoption and returns remain unproven.' },
  'dylan-hbm': { authorId: 'dylan', time: '18 Sep, 12:10', link: 'semianalysis.com', quote: 'Micron is roughly a quarter ahead of Samsung on HBM4 qualification at Nvidia.', alva: 'Directly supports the share-gain premise; qualification timing can slip either way within a quarter.' },
};
export const SIGNAL_POOL = {
  NVDA: ['dylan-rubin', 'whales-nvda', 'tsmc-sep'],
  MSFT: ['msft-q1', 'ms-target'],
  HOOD: ['tenev-record', 'whales-nvda'],
  GOOGL: ['semi-tpu'],
  AMD: ['semi-mi355', 'bryson-maia', 'riot-deal'],
  MU: ['dylan-hbm'],
  TSM: ['tsmc-sep', 'bryson-maia'],
  AMZN: ['munster-broadening'],
  GENERAL: ['kobeissi-retail', 'munster-broadening'],
};

// Playbook 卡片数据：原样搬 Baby src/pages/Explore.tsx 的 PLAYBOOKS（封面在 public/figma/explore/），卡片样式不改。
const CARD = (f) => ROOT + 'figma/explore/' + f;
export const PLAYBOOKS = [
  { id: 'btc-ultimate-ai-trader', creator: 'Alva Intern', title: 'BTC Ultimate AI Trader', description: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements, it strategically accumulates during bumpy markets.", tickers: ['BTC'], pulse: 'active', stars: 12800, remixes: 3, template: 'screener', cover: CARD('card-btc-ultimate.png') },
  { id: 'mag7-equal-weight-monthly-rebalance', creator: 'Alva Intern', title: 'MAG7 Equal-Weight Monthly Rebalance', description: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly', tickers: [], pulse: 'active', stars: 12800, remixes: 3, price: '$50', template: 'what-if', cover: CARD('card-mag7-rebalance.png') },
  { id: 'pepe-long-vs-btc-short', creator: 'Alva Intern', title: 'PEPE Long vs BTC Short Monthly Rebalance', description: 'The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.', tickers: ['PEPE', 'BTC'], pulse: 'active', stars: 12800, remixes: 3, template: 'what-if', cover: CARD('card-pepe-btc.png') },
  { id: 'attribution-analysis-price-trends', creator: 'Alva Intern', title: 'Attribution Analysis Strategy for Price Trends', description: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.', tickers: ['BTC', 'ETH'], pulse: 'active', stars: 12800, remixes: 3, template: 'thesis', cover: CARD('card-attribution.png') },
  { id: 'btc-macd-1h-simple-crossover', creator: 'Alva Intern', title: 'BTC MACD 1h Simple Crossover', description: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.', tickers: ['BTC'], pulse: 'active', stars: 12800, remixes: 3, template: 'screener', cover: CARD('card-btc-macd.png') },
  { id: 'nvda-triggered-tsm', creator: 'Alva Intern', title: 'NVDA +3% Triggered TSM TP/SL', description: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.', tickers: ['NVDA', 'TSM'], pulse: 'active', stars: 12800, remixes: 3, template: 'what-if', cover: CARD('card-nvda-tsm.png') },
  { id: 'eth-daily-price-change', creator: 'Alva Intern', title: 'ETH Daily Price & Change Tracker', description: 'Tracks daily prices and daily percentage changes for ETH in a single table for quick monitoring.', tickers: ['ETH'], pulse: 'idle', stars: 12800, remixes: 3, template: 'screener', cover: CARD('card-eth-daily.png') },
  { id: 'short-squeeze-risk-map', creator: 'Alva Intern', title: 'Short-Squeeze Risk Map', description: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts.", tickers: [], pulse: 'idle', stars: 12800, remixes: 3, template: 'thesis', cover: CARD('card-short-squeeze.png') },
  { id: 'nvda-trading-research-dashboard', creator: 'Alva Intern', title: 'NVDA Trading Strategy Research Dashboard', description: 'Multi-timeframe NVDA price/volume context, trend & momentum, relative strength vs market/sector, flow/derivatives proxies, earnings/event stats.', tickers: ['NVDA'], pulse: 'idle', stars: 12800, remixes: 3, template: 'thesis', cover: CARD('card-nvda-research.png') },
  { id: 'us-crypto-dat-monitor', creator: 'Alva Intern', title: 'US Crypto DAT Companies Monitor', description: 'Feed incorporates both real anomaly signals and reference cases for interpretation. Update frequencies adjusted as new PTR, Form 4, and 10b5-1 filings are parsed.', tickers: [], pulse: 'idle', stars: 12800, remixes: 3, template: 'screener', cover: CARD('card-crypto-dat.png') },
  { id: 'google-x-trends-tracker', creator: 'Alva Intern', title: 'Google / X Trends Tracker', description: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.', tickers: ['GOOGL'], pulse: 'idle', stars: 12800, remixes: 3, template: 'screener', cover: CARD('card-google-trends.png') },
  { id: 'qqq-triggers-nvda-take-profit', creator: 'Alva Intern', title: 'QQQ +2% Day Triggers NVDA Take-Profit', description: 'Aggregates real-time data across multiple DEX platforms to identify high-potential Golden Dog meme tokens. Alerts are triggered on sudden volume spikes, KOL mentions, or on-chain activity.', tickers: ['QQQ', 'SOL'], pulse: 'idle', stars: 12800, remixes: 3, template: 'what-if', cover: CARD('card-qqq-nvda.png') },
];
// Sidebar「Playbooks」组：原样搬 Baby src/data/playbooks.ts 的 PLAYBOOK_NAV_ITEMS（owner 头像同 Baby Avatar 映射）
export const PLAYBOOK_NAV_ITEMS = [
  { id: 'nav-attribution', title: 'Attribution Analysis Strategy', owner: 'YGGYLL', source: 'owned', template: 'screener', description: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest and volume.' },
  { id: 'nav-optical', title: 'Optical AI Infrastructure Thesis', owner: 'YGGYLL', source: 'owned', template: 'thesis', description: 'Optical interconnect names tracked against hyperscaler capex and 800G / 1.6T shipment data.' },
  { id: 'nav-space', title: 'Space Investor Master Playbook', owner: 'Space Investor', source: 'subscribed', template: 'thesis', description: 'Launch cadence, contract awards and valuation marks across the space stack.' },
  { id: 'nav-thesis-demo', title: 'Thesis Demo', owner: 'Gavin Baker', source: 'subscribed', template: 'thesis', description: 'Retail flow concentrating in AI leaders — compute, monetization and the venue.' },
];
// Baby src/lib/chart-theme.ts CREATOR_AVATARS 的子集；不在表里的名字回落成首字母色圆
export const CREATOR_AVATARS = {
  Alva: ROOT + 'logo-portrait.svg',
  YGGYLL: ROOT + 'portrait.png',
  Sheer: ROOT + 'avatars/sheer.png',
  'Space Investor': ROOT + 'avatar-space-investor.png',
  'Gavin Baker': TD + 'avatar-gavin-baker.png',
  'Alva Intern': 'https://api.dicebear.com/9.x/notionists/svg?seed=AlvaIntern&backgroundColor=e8f5e9',
};
export const AVATAR_COLOR_PALETTE = ['#49A3A6', '#3E8E91', '#2A9B7D', '#40A544', '#3D8BD1', '#0D7498', '#5F75C9', '#7474D8', '#A878DC', '#DC7AA5', '#C76466', '#E6A91A', '#E05357', '#007949', '#838383'];
// tag 里 10px 品牌 logo：Baby brand-registry 的子集（simple-icons slug + 品牌色）
export const BRAND = {
  AAPL: ['apple', '#000000'], AMZN: ['amazon', '#FF9900'], GOOGL: ['google', '#4285F4'], META: ['meta', '#1877F2'], MSFT: ['microsoft', '#F25022'],
  NVDA: ['nvidia', '#76B900'], TSLA: ['tesla', '#E82127'], AVGO: ['broadcom', '#CC092F'], INTC: ['intel', '#0071C5'], ORCL: ['oracle', '#F80000'],
  NFLX: ['netflix', '#E50914'], BTC: ['bitcoin', '#F7931A'], ETH: ['ethereum', '#627EEA'], SOL: ['solana', '#9945FF'], // TSM / QQQ 在 simple-icons 没有 logo（Baby 里 hasCdnLogo:false），不放 glyph
};
export const SIDEBAR = {
  playbooks: ['nav-attribution', 'nav-optical', 'nav-space', 'nav-thesis-demo'],
  chats: ['Summarize the FOMC minutes and what they mean for my portfolio', 'NVDA 50-day pullback — buy or wait?'],
  channels: ['FinTwit digest'],
};
export const PEOPLE_TO_FOLLOW = ['sama', 'chamath', 'cathie', 'ackman', 'marks', 'munster', 'tenev', 'dylan'];
export const FOLLOWING = ['gavin', 'satya', 'traderstewie', 'beth', 'ives', 'maya', 'damodaran', 'bryson'];
export const TRENDING = ['NVDA', 'TSLA', 'MSFT', 'GOOGL', 'AMD', 'MU'];
export const WATCHLIST = ['NVDA', 'MSFT', 'AMD'];
// Sidebar「合并 Following」一组里人与 playbook 混排的顺序（按最近更新 mock）
export const MERGED_FOLLOWING = ['satya', 'gavin', 'nav-space', 'maya', 'traderstewie', 'nav-attribution', 'beth', 'nav-thesis-demo'];

export const ABOUT = {
  NVDA: 'NVIDIA designs GPUs and full-stack accelerated computing platforms for data centers, gaming, professional visualization and automotive. Data Center is now more than 85% of revenue, and the Blackwell-to-Rubin transition sets the 2026–27 supply picture.',
  MSFT: 'Microsoft develops and licenses software, cloud services and devices. Azure and the Intelligent Cloud segment are the growth engine; Copilot attaches AI monetization to the existing Office and Dynamics seat base.',
  AMD: 'AMD designs CPUs, GPUs and adaptive SoCs. The MI300 / MI350 Instinct line is its data-center AI bet; EPYC server share gains fund it.',
  DEFAULT: 'Company profile, filings and market data are available on the production company page. This demo only adds the Theses section.',
};

/* ── 说明抽屉文案（中文） ── */
export const NOTES = {
  common: [
    '移动 chrome 全部去掉：返回箭头 → 浏览器历史 + Sidebar；底部 tab → Sidebar；底部动作条 → 页内头部；悬浮 ⊕ → composer 或按钮；底部 sheet → 弹层或页内下拉。',
    'Ask Alva 不在页内做对话：卡片和详情上的 Ask Alva 只是入口，点开右侧对话面板并把当前 thesis 挂成上下文 chip。对话框关闭时右下角常驻 Ask Alva 入口，打开后入口消失。',
    '二级页 All updates 不做：详情页里上一版露一截，View all 打开历史弹窗（与 Thesis V1 定稿一致）。',
    'Signals 只有生成中态没有空态，Related 有空态；归档后不能 Update、菜单变 Unarchive；Private 不影响继续 Update。全部沿用 app 规则。',
    '三个方案共用同一套 mock 数据和同一个详情页组件，差别只在入口、导航和布局。对话框「关 / 开」两态都要看：打开后内容区变窄，右侧栏和两栏布局会退成单列。',
  ],
  sidebar: {
    playbooks: [
      '三案固定：Channels（A / B）→ Theses → 订阅区 → Chats。Theses 组 = 我的 active thesis + 收藏的 thesis，行 = 作者头像 + 首句，右侧徽标 = 新到的 signal 数；组头右侧的 + 是唯一的新建入口（与 Channels 组的 + 同一写法）。',
      '订阅区 = 现状 Playbooks：只放订阅的 playbook。',
      '代价：关注的人没有快捷入口，只能从 feed 卡片点作者名进主页。',
    ],
    following: [
      '三案固定：Channels（A / B）→ Theses → 订阅区 → Chats。Theses 组 = 我的 + 收藏，组头右侧的 + 是唯一的新建入口。',
      '订阅区 = Following + Playbooks 两组：Following 是关注的人（点进作者主页），Playbooks 是订阅的 playbook；C 用这个，人是 thesis 的来源。',
      '代价：组多了会高，768 高的笔记本上 Chats 会被推进折叠区。',
    ],
    merged: [
      '三案固定：Channels（A / B）→ Theses → 订阅区 → Chats。Theses 组 = 我的 + 收藏，组头右侧的 + 是唯一的新建入口。',
      '订阅区 = Following 一组混排关注的人和订阅的 playbook（行首都是 owner 头像，靠人名 / 标题区分），按最近更新排；B 用这个，Sidebar 不变高。',
      '代价：Playbook 在产品语言里是 Subscribe 不是 Follow，组名叫 Following 还是 Subscribed 要二选一。',
    ],
  },
  merge: {
    on: [
      'Explore 吞掉 Markets：Sidebar 顶部三项（For You · Explore · Portfolio），Explore 成为唯一的发现面：Playbooks | Tickers | People，头部搜索跨这几类一次查。',
      'Tickers tab = 自选 + 热门 + 搜索入口，点进公司页；/markets/[ticker] 路由不变，只是 Sidebar 没有 Markets 项，公司页高亮 Explore。',
      '理由：原来 Search 和 Markets 两个入口都通向同一个公司搜索，重复；生产的 /markets 落地页本身是空的；app 的 Search 页本来就是 ticker + 人。',
      '代价：Markets 是 spec 里的一级模块名（Market / Company Entity），藏进 Explore 的一个 tab 降了一级；以后要放自选、涨跌榜之类的市场内容时，一个 tab 会不够。',
    ],
    off: [
      '现状：Explore 只管 playbook，Markets 单独一项进公司搜索；Sidebar 顶部四项（For You · Explore · Markets · Portfolio）。',
      '问题：Search 和 Markets 都通向 ticker 搜索，两个入口一件事。',
    ],
  },
  a: {
    explore: [
      'Sidebar 不动。Explore 加一个 Theses tab，thesis 和 playbook 共用同一个货架、同一套筛选（Following / 类型 / ticker）。',
      '卡片用 Library compact 变体三列排：作者行、类型标、正文 4 行、ticker、动作行。',
      'New thesis 入口 = Sidebar「Theses」组头部的 +（与 Channels 组的 + 同一套写法）；Explore 头部只留搜索，切 tab 时不会跳。主操作 New Chat 保持纯按钮，不做下拉。',
      '关注人的入口：Explore › People tab（对应 app Search 页的 People to follow）；卡片作者名 → 主页 Follow 也能关注。Sidebar 的 Markets 搜索弹窗仍只搜 ticker。',
      'Explore 头部搜索：一个词同时查 theses / playbooks / people，三个 tab 直接变成结果分面并带计数（Theses (3) · Playbooks (2) · People (1)），当前 tab 里就地显示匹配结果；当前 tab 没有命中时给空态 + 跳到有结果的 tab 的按钮，不另开一个下拉结果层。',
      '代价：For You 这条「关注的人在说什么」的流没有家，只能靠 Following 筛选凑。适合「thesis 只是 playbook 的一种模板」的定位。',
    ],
    thesis: [
      '详情页三个方案共用：Thesis V1 定稿的单列 960 —— 当前版本在上，上一版露一截被渐变压住，View all 打开历史弹窗，下面 Signals | Related theses 两个 tab。',
      '客态头部只有作者信息 + 收藏计数 + 分享（与生产 web 头部一致），不放 Follow，关注在作者主页 / People 做；主态：Update（蓝）+ ···（Archive thesis / Make private）。',
      '对话框关闭时右下角 Ask Alva 常驻入口；打开后入口消失，对话面板顶部挂当前 thesis 的上下文 chip。',
      '从 Profile › Theses 打开自己的 thesis 可看主态、归档态、Private 态。',
    ],
    profile: [
      'Profile 加 Theses tab，放在 Playbooks 之后；Active / Archived 用右侧分段控件切换，Private 在 Active 里带标。',
      '行级 ··· 菜单承担管理：Update / Archive thesis / Make private，与详情头部的菜单是同一套。',
      '主态 Theses 列表不用卡片，一行一条用分割线隔开；头部右侧只留设置齿轮，新建走 Sidebar Theses 组的 +，编辑 / 分享去掉（三个方案一致）。',
      'app 的 Portfolio 卡、Usage 卡不搬进 web profile，web 有 /portfolio 和 /records。',
      '客态 Profile：已入驻显示 Follow + Pro；未入驻显示 Following 描边钮、bot 角标和「Compiled from public information」提示。',
    ],
    company: [
      'Company 页加 Theses tab，对应 app 里 ticker 页的 Thesis tab；「Write a thesis」预填 ticker 进编辑器。',
      'Overview 用真实历史行情快照画图（alva-thesis demo 的 market-snapshot.json），其余 tab 是生产页已有内容，这里只放占位。',
    ],
    compose: [
      '入口：Sidebar Theses 组的 + 弹两条路菜单——Write it yourself / Create with Alva，对应 app 的入口 sheet；Profile 右上 New thesis 直接进编辑器。',
      '编辑器 = 居中对话框（640），模块照 app 编辑器原样：正文 Regular/14 → 边写边识别出的 ticker chip → 图片行（Add Image 108 卡）→ 工具栏 bold / ticker / polish（图标从 app 稿导出）。只挪了两处位置：app 顶栏的 Public ▾ 放到作者名下面（样式不变），Publish 放到底部右侧——web 对话框的主按钮惯例。app 的底部 sheet（选 ticker / 可见性 / Polish）变成对话框内的 popover；没有 Create with Alva 按钮，路径在入口卡就选完了。',
      '发布：Publish 进「Publishing…」态 → toast → 直接打开详情，Signals 先是「Reviewing signals…」几秒后回填；识别不到 ticker 时出红条提示用 $ 手加。Create with Alva 关掉对话框、交给右侧对话面板（草稿卡 → Open in editor / Publish）。',
      'Update 用同一个对话框：标题 Update thesis，作者行下写「Adding update N · last update 日期」，主按钮变 Update（蓝）。',
    ],
    search: [
      'A 沿用现有公司搜索弹窗，只搜 ticker；找人靠 Explore 的 Following 筛选或点作者名。',
    ],
  },
  b: {
    foryou: [
      'Sidebar 加 For You 一级，放第一位，作登录后默认页；Sidebar 不放 Search 项——搜索不是一个去处，是 Explore 头部的一个功能（theses / playbooks / people / tickers 一次查），公司页顶部的公司名下拉也能搜公司。',
      '左边一条阅读宽度的 feed，右边 sticky 侧栏放 People to follow / Trending tickers —— 侧栏承接了 app 里 Search 默认页和 Onboarding 选人的内容。',
      '对话框打开时侧栏收成 feed 顶部一行 chips，不和对话面板抢宽度。',
      '顶部常驻 composer：一行占位，点开原地展开成编辑器；✨ Create with Alva 把意图送进右侧对话面板。',
      '卡片 = Feed Item V5 web 版：图表横排、动作行只留 Ask Alva（入口）+ 收藏。',
      '顶部「状态」下拉可切首次进入（选人）/ 空 / 加载失败三种状态；首次进入直接在 feed 位置放 Choose who Alva reads，不做独立 onboarding 页。',
    ],
    explore: [
      '默认合并态：Explore = Theses | Playbooks | People | Tickers，统一承接主动发现与跨类搜索；For You 只负责个性化、按时间消费的 thesis feed。',
      '分开态保留为对照：Explore 只管 playbook，thesis 只在 For You，ticker 仍走 Markets。',
    ],
    thesis: [
      '详情页与 A 相同（单列 960 + 上一版露一截 + Signals | Related tab）。',
      '从 feed 点进是完整页而不是 sheet；浏览器返回回到 feed。',
      '主态在头部：Update（蓝）+ ···；对话框打开时右下角入口消失，上下文 chip 挂在对话面板输入框上方。',
    ],
    profile: [
      'Profile › Theses 是管理面：Active / Archived 切换，行级 ··· 做 Update / Archive / Make private。',
      'Theses tab 放在 Playbooks 之后，B 不改 playbook 的主次。',
      '主态列表和头部同 A：分割线一行一条，头部只留设置齿轮。',
    ],
    company: [
      'Company 页加 Theses tab，与 A 相同；ticker chip 点击直接进公司页。',
    ],
    compose: [
      'composer 展开态 = app 编辑器全部能力：正文 / 图片 / ticker chips / Public·Private / Polish。',
      'Create with Alva：对话面板里 Alva 追问（Pick a ticker / Start from my feed / Describe it）→ 草稿卡 → Open in editor 回填 composer，或直接 Publish。',
      'Update 从详情头部进入，同一个编辑器以弹层出现、预填正文、按钮变 Update。',
    ],
    search: [
      'Search 不做页面、也不占 Sidebar 一项：Explore 头部搜索跨 theses / playbooks / people / tickers；Markets 分开态下 Sidebar 的 Markets 项才开公司搜索弹窗。',
    ],
  },
  e: {
    foryou: [
      '没有左侧栏：一级导航挪到顶栏（For You · Explore · Markets · Portfolio），Channels / Chats / Agent 收在顶栏「Alva Agent」一页里；右上角点头像直接进 Profile，设置在 Profile 头部的齿轮里，不再有头像菜单。',
      'For You 是阅读版式：一列 720 宽的大卡，首段放大成导语，图表和图片放大到 352 宽；右栏 People to follow / Trending tickers 不变。',
      '页顶没有 composer：写东西走顶栏 New Thesis 进全屏编辑器，阅读页只管读。',
      'Alva 收成右下角悬浮按钮，点开是盖在页面右侧的抽屉，不占常驻宽度；卡片上的 Ask Alva 也开这个抽屉并挂上下文。',
      '筛选条沿用 Alva-Library 子弹 Tab：All / Following / 热门 ticker。',
    ],
    explore: [
      '和 A / B 同一个 Explore：Theses | Playbooks | People 三个 tab，头部搜索一次查三类。',
      'Markets 在顶栏单独一项，所以这里没有 Tickers tab。',
    ],
    markets: [
      'Markets 是一个落地页：搜索 + 我的 watchlist + Trending，卡片进公司页。',
      '公司页时顶栏 Markets 保持高亮。',
    ],
    company: [
      '公司页沿用现有，只加 Theses tab；在内容站的壳里它更像一个专题页，内容宽 1120。',
      'Write a thesis 带着 ticker 进全屏编辑器。',
    ],
    thesis: [
      '详情是文章版式：作者行、正文、上一版露一截、Signals | Related 全部收在 720 一列，没有 sticky 头部。',
      '收藏 / 分享 / 主态 Update 放在作者行右侧；Ask Alva 走右下悬浮按钮，抽屉打开时这条 thesis 自动挂成上下文。',
      'Related 瀑布流在 720 内是两列。',
    ],
    profile: [
      'Profile 变成个人主页：Theses 第一 tab，Playbooks 第二，Starred 第三；主态管理列表（Active / Archived / 行级 ···）沿用。',
      '主态 Theses 列表去掉卡片外框，一行一条用分割线隔开；头部右侧只留设置齿轮（New Thesis 在顶栏，编辑 / 分享去掉）。',
      '右上角点头像直接进这里，Theses 是第一个 tab（原来头像菜单里的 My theses 和 Alva Agent 两项去掉了，一个在这里、一个在顶栏）。',
    ],
    alva: [
      '参考 X 的 Grok：右下角圆角方形气泡，点开后气泡留在原地、卡片浮在它正上方，盖在右栏上不挤正文；头部只有一排图标：历史 / 展开成整页 / 新对话 / 收起；底部输入框带附件、@、模型选择（默认 GPT-5.6 Sol，照 global-chat spec）。',
      '顶栏多一项 Alva Agent，就是 spec 里的全屏 chat 页 / Agent Channel 页：左栏 New Chat + Channels（Agent channel、topic channel、+ 新建）+ Chats 历史，主区是当前频道。',
      '频道主区按 topic-channel spec 分 tab：Chat · Tasks · Memory · Alerts · Files；Agent channel 同一套。',
      '抽屉和整页是同一个会话：抽屉头部的「展开」把当前对话带到 Alva Agent 页（spec 的 Open chat page）。',
      '内容站不需要 Work 模式：agent 是一页 + 一个抽屉，不是一层壳。',
    ],
    write: [
      '顶栏 New Thesis 直接进全屏编辑器，不再先弹两张卡：Write it yourself 就是这一页，Create with Alva 是编辑器右侧的抽屉。',
      '编辑器模块照 app：作者行、Public 下拉、Regular/14 正文、ticker 芯片、108 图片卡、bold / ticker / polish 工具栏；Publish 挪到右上角（写作页惯例）。',
      'Create with Alva 打开后是两栏：左边草稿，右边对话。Alva 出的草稿卡可以 Open in editor 回填左边，或直接 Publish。',
      'Back 回 For You；发布后跳详情页。',
    ],
    compose: [
      'Update 也走这个全屏编辑器，头部显示第几次更新、上次更新时间；Back 回到那条 thesis。',
      '公司页 Write a thesis 和 Explore 的空态都进同一个编辑器，ticker 预填。',
    ],
    search: [
      '顶栏 Search 是一个按钮，点开居中弹窗，查 ticker 和 people（同 B）。',
    ],
  },
  patches: {
    threecol: [
      '来源：X 和微博的三列——左边导航、中间内容、右边推荐。',
      '顶栏拆掉，导航改成左侧竖排一列：logo → For You · Explore · Markets · Portfolio · Alva Agent → New Thesis 主按钮 → 底部账号（点进 Profile，设置在 Profile 头部）。',
      '搜索挪到 For You 右栏顶部，跟着右栏吸顶；Explore 和 Markets 页自带搜索框。',
      '左列右边一条竖线贯通到底，For You 的卡片横线从这条线拉到正文列右边的竖线，两头都接上。',
      '三列作为一组居中（240 + 752 + 352），宽屏两侧留白；其他页面是左列 + 页面本身。',
    ],
    quick: [
      '来源：X 首页顶部的发帖框（What’s happening?），不用离开时间线就能发。',
      'For You 筛选条下面常驻一个发帖框：头像 + 正文（多行自动长高）→ 识别出的 ticker → 图片；工具栏和 app 编辑器一致（图片 / 加粗 / ticker / polish），右边 Public ▾ + Publish。',
      '发完留在 For You，新 thesis 出现在列表最上面，Signals 照常后台生成；长文或要改排版时还是走顶栏 New Thesis 进全屏编辑器。',
      '上下两条分割线接到正文列的竖线上，和卡片之间的横线同一套。',
    ],
    entry: [
      '来源：小红书把「发布」做成左栏一级项，Substack 是导航下一颗 Create，Medium 是顶栏 Write；没有一家把入口藏在小标题里。',
      '四档对照：小标题 +（现状）/ 导航项 New thesis（For You 之后）/ Theses 组首行 / 双 CTA；点开都还是两张卡。',
      '我倾向导航项：和 XHS / Substack 同构，也不动 New Chat 的位置。',
    ],
    rail: [
      '来源：Reddit 帖子页右栏 Related posts、知乎问题页右栏相关问题 + 大家都在搜、X 单帖页右栏 Relevant people；没有一家把「相关」放正文下的 tab。',
      '规则：对话框关闭时右栏放上下文（Related theses / Relevant people / Tickers），Signals 留在正文下；对话框打开右栏收起，退回 Signals | Related tabs。',
      '两栏详情（正文 + 右栏证据）原本是「以人为中心」那版的做法，这里作为 A / B 的开关保留。',
    ],
    guest: [
      '来源：Reddit / 知乎 / 微博 / Substack 未登录能读，且都换成精简壳（无个人导航，右栏变登录卡）；Medium 作者页、X 客态单帖页是两页的原型。',
      '只做三页：thesis 分享页（文章版式 + 作者卡 + Relevant people + Related）、作者公开主页（Medium 作者页结构）、ticker 公开页（价格 + theses + About）。',
      '其他页面在客态下是登录门；收藏 / 关注 / Ask Alva / 写 thesis 都变成 Sign in。',
      '这是 E 的归宿：顶栏内容站的壳只给公开页，登录后回到 Sidebar 壳。',
    ],
  },
};

export const OVERVIEW = {
  title: 'Thesis on Web',
  subtitle: '浏览 · 创建 · 管理三条流程在 web 上的三套信息架构方案',
  intro: [
    '同一套 mock 数据、同一个详情页组件，只换入口、导航和布局。顶部条随时切方案。',
    '对话面板开 / 关两态都要看（从 Ask Alva 打开）：打开后内容区从约 1212 压到 724 左右，右侧栏和两栏布局会退成单列。',
  ],
  dirs: [
    { key: 'a', name: 'A · 挂进现有骨架', tagline: 'thesis 是 playbook 家族的一种内容，不加一级入口，改动最小。', rows: [['Sidebar', 'Channels 之下加一组 Theses（我的 + 收藏，+ 新建）'], ['浏览', 'Explore 加 Theses tab，与 playbook 共用筛选'], ['关注人', 'Explore › People tab'], ['详情', '独立页，单列 960'], ['创建', 'Sidebar Theses 组的 + → 弹层编辑器'], ['管理', 'Profile › Theses（Playbooks 之后）'], ['Search', '沿用公司搜索，只搜 ticker'], ['代价', 'For You 这条「关注的人在说什么」的流没有家']] },
    { key: 'b', name: 'B · For You 一级入口', tagline: 'For You 负责个性化消费与创建，Explore 统一承接四类主动发现；管理放 Profile。', rows: [['Sidebar', 'For You 放第一位，Explore 收进 Markets；不放 Search 项；Channels 下加 Theses 组（+ 新建）'], ['浏览', 'For You = 个性化 feed；Explore = Theses / Playbooks / People / Tickers'], ['详情', '独立页，单列 960'], ['创建', 'For You 顶部常驻 composer；Create with Alva 走对话面板'], ['管理', 'Profile › Theses'], ['Search', 'Explore 头部跨 Theses / Playbooks / People / Tickers 搜索'], ['代价', '多一个一级项；Follow 人与 Subscribe playbook 两套关系要讲清']] },
    { key: 'e', short: 'C', name: 'C · 内容站 · 顶栏', tagline: 'thesis 是内容。去掉 Sidebar 和常驻对话面板，用内容站的壳读和写。', rows: [['导航', '顶栏 For You · Explore · Markets · Portfolio · Alva Agent；Channels / Chats 在 Alva Agent 页左栏'], ['浏览', 'For You 大卡阅读流 + 右栏；Explore 三 tab；Markets 落地页'], ['详情', '文章版式 720 一列，无 sticky 头'], ['创建', '顶栏 New Thesis → 全屏编辑器；Create with Alva 是编辑器右侧抽屉'], ['管理', '点头像进 Profile › Theses（主态列表）；设置在 Profile 头部'], ['Alva', '照 X Grok：圆角气泡（打开后留着）→ 上方浮出卡片（历史 / 展开 / 新对话 / 收起），可展开到 Alva Agent 整页（Chat · Tasks · Memory · Alerts · Files），同一会话']] },
  ],
  questions: [
    { h: '追加 · 左侧订阅区放 playbook、thesis，还是都放', body: [
      'Sidebar 的规则是放「会有更新的订阅源」，不放内容：playbook 是源（有 alert），人是源（有新 thesis），单条 thesis 是内容。',
      '所以 thesis 侧进 Sidebar 的应该是 Following（人），不是 Theses；若一定要放 thesis，只放「有新 signal 的收藏」且限量。',
      '四组（Channels · Playbooks · Following 或 Theses · Chats）在 768 高的笔记本上必滚动。推荐 B 用 Following 一组混排人和 playbook，三组不变高。顶部条「订阅区」下拉可切四种对照。',
    ] },
    { h: '追加 · B 的 Explore 是否统一承接四类对象', body: [
      '可以，默认合并态调整为 Explore = Theses | Playbooks | People | Tickers。公司页路由不变，Markets 从 Sidebar 收进 Tickers tab，生产的 /markets 落地页目前是空容器，合并没有内容损失。',
      'For You 与 Explore 中的 Theses 不冲突：前者是个性化、按时间消费的 feed，后者是按 ticker、作者、类型与热度主动发现的货架。',
      '代价是 Markets 从一级降到 Explore 的一个 tab；市场内容以后长大要再拆出来。顶部条「Explore + Markets」下拉可切分开 / 合并。',
    ] },
  ],
  // 模块清单：对象 × 动作矩阵 + 按入口分组（用户 2026-09-23 要「整体考虑」用）
  patchesIntro: '竞品参考板（Figma「竞品参考 · 社交产品 Web 页面」）里验证过的两个结构，做成 A / B 的开关，在顶部条上切；C 另有「顶部快速发表」「三列布局」两个开关；客态公开页用深链 ?guest=1 看。',
  patches: [
    ['补丁', '来源', '做法', '默认'],
    ['新建入口升一级', '小红书「发布」一级项 · Substack Create · Medium 顶栏 Write', '四档：小标题 + / 导航项 / 组内首行 / 双 CTA', '小标题 +（现状），下拉切'],
    ['详情右栏承接「相关」', 'Reddit Related posts · 知乎相关问题 · X Relevant people', '对话框关闭时右栏放 Related / Relevant people / Tickers，打开退回 tabs', '关，开关切'],
    ['顶部快速发表（C）', 'X 首页顶部的发帖框', 'For You 筛选条下常驻一个发帖框：头像 + 正文 + 识别出的 ticker + app 编辑器同款工具 + Public ▾ + Publish；发完留在当前页，新 thesis 出现在最上面', '关，开关切'],
    ['三列布局（C）', 'X / 微博：左侧导航列 + 中间内容 + 右栏', '顶栏导航改成左侧竖排一列（logo · For You · Explore · Markets · Portfolio · Alva Agent · New Thesis · 底部账号），搜索挪到 For You 右栏顶部；中间列两侧竖线贯通，卡片横线两头都接上', '关，开关切'],
    ['客态公开页壳（M）', 'Medium 作者页 · X 客态单帖 · Reddit / 知乎公开态', 'thesis / 作者 / ticker 三页精简顶栏壳，其余登录门', '关，深链 ?guest=1'],
  ],
  matrix: [
    ['对象', '在哪看到列表', '详情页', '新建 / 更新', '管理', '订阅 / 收藏关系', 'Ask Alva 上下文'],
    ['Thesis（新增）', 'For You · Explore › Theses · Company › Theses · Profile › Theses', '/thesis/[id]：版本时间线 + Signals | Related', 'composer 写 / Create with Alva；Update 出新版本', 'Archive · Make private（无删除）', '收藏 Saved', 'thesis chip'],
    ['Playbook', 'Explore · Profile › Playbooks · Sidebar 订阅组', '/u/[username]/playbooks/[name]：查看 / 分享 / 解锁 / remix / 订阅 / 交易', 'New Chat → Alva 生成（Draft → Release）', 'Profile 筛选 Public / Private / Paid / Draft；Automations 在 Settings', 'Subscribe · Star · 购买', 'playbook chip（现有）'],
    ['Ticker / 公司', 'Search 弹窗 · Trending · Explore › Tickers（合并态）· thesis 卡 ticker chip', '/markets/[ticker]：Overview · About · Anomalies · News & Social · Smart Money · Earnings + Theses（新增）', '无；「Write a thesis」预填 ticker', '自选 watchlist（app 有 Add，web 现状无）', '关注 ticker（app Profile › Watchlist）', 'company chip（spec Market Company Context）'],
    ['人（作者 / 用户）', 'People to follow · Search › People · Followers / Following', '/profile：客态已入驻 / 未入驻（bot 标 + 免责）', '—', '自己的 Profile 编辑走 /settings?tab=account', 'Follow / Following', '—'],
    ['Channel（Agent / topic）', 'Sidebar › Channels', '/（Agent）· /channel/[id]：Chat · Tasks · Alerts · Memory · Files', 'Sidebar ⊕ New channel', 'IM 连接 / persona 在 /settings?tab=alvaAgent', '—', '本身就是对话'],
    ['Chat（会话）', 'Sidebar › Chats · /chat', 'thread 页 / 右侧面板', 'New Chat（/new_chat）', '历史 · 分享 /share/[publicId]', '—', '—'],
    ['Automation', '/settings?tab=automations', 'Automation detail（alert 列表）', '从对话 / Agent / playbook release 产生，无独立新建', '暂停 · 恢复 · 删除', 'alert subscription', '—'],
    ['Portfolio 账户', '/portfolio 账户 tabs', '余额卡 · 持仓 · 订单 · Activity · 绑定的 playbook', 'Connect account（SnapTrade / IBKR）', '/portfolio/setting', 'signal subscription（交易）', 'trading account context（spec）'],
  ],
  groups: [
    { h: '新建（New）', items: [['New chat', '/new_chat，同时是 playbook 的生成入口'], ['New thesis（新增）', 'Write 自己写 / Create with Alva 走对话面板'], ['Update thesis（新增）', '同一个编辑器预填，出新版本'], ['New channel', 'Sidebar Channels ⊕'], ['Connect account', 'Portfolio 连接券商']] },
    { h: '发现 / 列表', items: [['For You（新增）', '关注的人的 thesis 流，B 的默认页'], ['Explore', 'A 加 Theses tab；B 合并态统一 Theses / Playbooks / People / Tickers'], ['Search 弹窗', '现状只 ticker；B / C 的 Explore / Discover 支持跨四类搜索'], ['Markets', '公司页入口；合并态并入 Explore › Tickers'], ['Trending · People to follow（新增）', 'For You 右侧栏；对话框打开时收成一行 chips']] },
    { h: '详情页', items: [['Thesis 详情（新增）', '版本时间线 + Signals | Related；主态 Update + ···'], ['Playbook 页', '现有'], ['Company 页', '现有 + Theses tab'], ['Profile', '现有 + Theses tab'], ['Channel / Agent 页', '现有'], ['Chat thread', '现有'], ['Automation detail', '现有'], ['Share 页', '现有']] },
    { h: '个人 / 账户（Me）', items: [['Profile 公开主页', '头像 · 名 · bio · 链接 · 关注数 + tabs'], ['Account /account', 'credits 摘要 · referral · API key · 语言 · 退出'], ['Settings /settings', 'account 编辑 · alvaAgent（IM + persona）· automations · usage'], ['Billing /records', 'plan · credits · packs · auto-refill · history'], ['Pricing /pricing', '升级'], ['Earnings /earnings', 'creator 收益'], ['Portfolio /portfolio', '账户 · 持仓 · 订单 · setting'], ['Followers / Following（新增）', 'app 有独立页，web 可作 Profile 弹层']] },
    { h: '管理面（我的东西）', items: [['My theses（新增）', 'Active / Archived，Private 带标；行级 ··· 菜单'], ['My playbooks', 'Public / Private / Paid / Draft'], ['Starred · Purchased', 'playbook 的两种关系'], ['Saved theses（新增）', '收藏；Sidebar 四组方案里的 Theses 组'], ['Watchlist（待定）', 'app 有，web 现状无；spec 说监控走 Automation / Portfolio Watch'], ['Automations', '暂停 / 恢复'], ['Channels · Chats 历史', '现有'], ['Following 人列表（新增）', 'Sidebar 订阅组 / Profile']] },
    { h: '常驻 chrome / 系统', items: [['Sidebar', 'CTA + 一级导航 + 订阅区 + 用户行'], ['右侧对话面板', 'global chat + persistent mention chip + Ask Alva 入口'], ['登录 / OAuth · Referral /r/[code] · Compliance · SEO 页', '现有，不动'], ['移动 web', '/native/* 下载页；/native/thesis/[id] 是 app WebView 版详情']] },
  ],
  tensions: [
    '两个 New：New Chat 既是聊天也是 playbook 的创建入口，New thesis 是内容创建。要么并成一个 New 下拉（New chat / New thesis / New channel），要么让 CTA 只留一个、另一个进页内。',
    '四种「订」：Follow 人、Subscribe playbook、Save thesis、Watch ticker。Sidebar 订阅区和 Profile 的 tab 都在摆这四种关系，先定哪几种进 Sidebar、哪几种只留 Profile。',
    '三种详情都要接对话面板：thesis / playbook / company 各自一种上下文 chip，文案与形态要统一。',
    'Profile 从 playbook 主页变成人的主页：Theses 与 Playbooks 谁是第一 tab（B 放第二），Starred / Purchased / Saved 怎么归组。',
    'Search 与 Markets 两个入口重叠（demo 里 B 已合并）；/account 与 /settings 两个个人入口的分工沿用现状，thesis 没有新增设置项。',
    'app 有、web 还没有落点的：Followers / Following 页、Watchlist、Onboarding 选人（→ For You 首次空态）、通知权限（web 推送走 IM）。',
  ],
  mapping: [
    ['app 屏', 'A · 挂进现有骨架', 'B · For You 一级', 'C · 内容站 · 顶栏'],
    ['For You tab', 'Explore › Theses tab', 'Sidebar › For You', '顶栏 For You（阅读流）'],
    ['⊕ 新建 / 入口 sheet', 'Sidebar Theses 组的 + → 两条路 → 弹层编辑器', 'Theses 组的 + 或 For You 顶部 composer', '顶栏 New Thesis → 全屏编辑器（两张卡并进编辑器：Write it yourself 就是这页，Create with Alva 是右侧抽屉）'],
    ['Select tickers / Permission 抽屉', '编辑器内下拉', '编辑器内下拉', '编辑器内下拉'],
    ['Polish 抽屉', '编辑器内弹层', '编辑器内弹层', '编辑器内弹层'],
    ['Create with Alva', 'New Chat → 对话面板', 'composer ✨ → 对话面板', '编辑器右侧抽屉'],
    ['详情 + 底栏三动作', '独立页；收藏 / 分享在头部，Ask Alva 在对话面板', '同 A', '文章版式；收藏 / 分享在作者行，Ask Alva 走悬浮按钮'],
    ['All updates 二级页', '上一版露一截 + View all 弹窗', '同', '上一版露一截 + View all 弹窗'],
    ['Me › Thesis', 'Profile › Theses（第二 tab）', 'Profile › Theses（第二 tab）', '点头像进 Profile › Theses（第一 tab）'],
    ['··· Archive / Private', '详情头部 ··· + Profile 行级 ···', '同', '详情作者行 ··· + Profile 行级 ···'],
    ['Search tab', '公司搜索弹窗（只 ticker）', '搜索弹窗 Tickers / People', '顶栏 Search → 居中弹窗（ticker + people）'],
    ['Markets 入口', 'Sidebar Markets → 公司搜索（现状）', '合并态：Explore › Tickers；Search 弹窗直达', '顶栏 Markets 落地页'],
    ['Ticker › Thesis tab', 'Company 页 Theses tab', '同', '公司页 Theses tab'],
    ['Onboarding 选人 / People to follow', 'Explore › People tab', 'For You 首次进入空态 + 右侧栏', 'For You 首次进入空态 + 右栏'],
    ['Settings', '现有 /settings，不动', '同', '现有，不动'],
  ],
};
