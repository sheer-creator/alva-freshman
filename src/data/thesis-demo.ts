/**
 * [INPUT]: 无 —— 静态 mock
 * [OUTPUT]: Thesis 详情页（/thesis-demo）的作者、版本时间轴、Signals 数据
 * [POS]: Data 层 — 仅 ThesisDemo 页面使用
 *
 * 文案与素材逐条取自 Figma「结构1补充」；当前版本以 17067:57615 为准（三段、两个 ticker）。
 */

const A = `${import.meta.env.BASE_URL}thesis-demo/`;

export interface ThesisMedia {
  /** public 下的文件名 */
  src: string;
  alt: string;
}

export interface ThesisVersion {
  id: string;
  /** 正文与右栏时间戳，如 "13 Sep, 08:12" */
  time: string;
  /** 是否当前版本（横向时间轴高亮 + Latest tag） */
  latest?: boolean;
  paragraphs: string[];
  /** 正文末尾的来源行 */
  source: { label: string; href: string };
  media: ThesisMedia[];
  tickers: string[];
}

export interface ThesisSignal {
  id: string;
  avatar: string;
  name: string;
  role: string;
  time: string;
  /** 引文正文，末尾内联来源链接 */
  quote: string;
  link: string;
  /** Alva 解读，chip 之后首行缩进 60 */
  alva: string;
}

export const THESIS_AUTHOR = {
  name: 'Gavin Baker',
  role: 'Managing Partner & CIO, Atreides',
  avatar: `${A}avatar-gavin-baker.png`,
  saves: 68,
};

const TRADERSTEWIE = { label: 'Traderstewie on X', href: 'https://x.com' };

/** 新 → 旧。第一条是当前版本，其余进 Historical updates。 */
export const THESIS_VERSIONS: ThesisVersion[] = [
  {
    id: 'v5',
    time: '13 Sep, 08:12',
    latest: true,
    paragraphs: [
      'Retail participation is back, and the flow is concentrating in a handful of AI leaders rather than spreading across the tape. This thesis treats that concentration as the setup: own the name that supplies the compute, the name that monetizes it, and the venue where the retail flow gets executed.',
      'NVDA remains the cleanest read on the build-out. Data center orders are still outrunning supply, and every pullback into the 50-day average has been bought within days. As long as that pattern holds, the trend is intact and dips are entries, not exits.',
      'MSFT is the monetization leg. Azure growth is re-accelerating on AI workloads, and Copilot seat expansion turns capex into recurring revenue faster than the market credits. The stock has been consolidating under its summer high; a close above it would confirm the next leg.',
    ],
    source: TRADERSTEWIE,
    media: [
      { src: `${A}media-x-post.png`, alt: 'Traderstewie X post screenshot' },
      { src: `${A}media-segments.png`, alt: 'Revenue breakdown by segment' },
      { src: `${A}media-chart-googl.png`, alt: 'Alphabet GOOGL price chart' },
      { src: `${A}media-chart-amzn.png`, alt: 'Amazon AMZN price chart' },
      { src: `${A}media-chart-msft.png`, alt: 'Microsoft MSFT price chart' },
    ],
    tickers: ['MSFT', 'NVDA'],
  },
  {
    id: 'v4',
    time: '10 Sep, 14:32',
    paragraphs: [
      'MSFT is coiling right under its summer high while NVDA keeps getting bought on every dip into the 50-day. The setup is unchanged: compute, monetization, and the venue.',
      "Azure's re-acceleration on AI workloads is the tell. Copilot seats are converting capex into recurring revenue faster than consensus models assume.",
      'A daily close above the summer high confirms the next leg. A failure there, plus a loss of the 50-day on NVDA, would put the whole setup on hold.',
    ],
    source: TRADERSTEWIE,
    media: [{ src: `${A}media-chart-msft.png`, alt: 'Microsoft MSFT price chart' }],
    tickers: ['MSFT', 'NVDA', 'HOOD'],
  },
  {
    id: 'v3',
    time: '6 Sep, 16:45',
    paragraphs: [
      'Adding HOOD as the third leg. Options and equity volumes track retail engagement in exactly the names this thesis owns, so it compounds the same flow from the other side.',
      'The first two legs are unchanged: NVDA supplies the compute, MSFT monetizes it. HOOD is where the retail flow that is bidding both gets executed.',
    ],
    source: TRADERSTEWIE,
    media: [],
    tickers: ['MSFT', 'NVDA', 'HOOD'],
  },
  {
    id: 'v2',
    time: '3 Sep, 11:06',
    paragraphs: [
      'NVDA pullbacks into the 50-day average keep getting bought within days. Three tests since June, three recoveries, each on rising volume.',
      'As long as that pattern holds, the trend is intact and dips are entries, not exits. The invalidation is a close below the 50-day that is not reclaimed within a week.',
    ],
    source: TRADERSTEWIE,
    media: [
      { src: `${A}media-nvda-coins.png`, alt: 'NVDA daily chart annotation' },
      { src: `${A}media-chart-googl.png`, alt: 'Alphabet GOOGL price chart' },
    ],
    tickers: ['MSFT', 'NVDA'],
  },
  {
    id: 'v1',
    time: '30 Aug, 08:24',
    paragraphs: [
      'Retail flow is coming back, and it is concentrating in a handful of AI leaders rather than spreading across the tape.',
      'Starting the thesis with two legs: NVDA for the compute build-out and MSFT for turning that build-out into recurring cloud revenue. A venue leg gets added once the flow data confirms.',
    ],
    source: TRADERSTEWIE,
    media: [],
    tickers: ['MSFT', 'NVDA'],
  },
];

export const THESIS_SIGNALS: ThesisSignal[] = [
  {
    id: 'vlad-tenev',
    avatar: `${A}avatar-vlad-tenev.png`,
    name: 'Vlad Tenev',
    role: 'CEO & co-founder, Robinhood',
    time: '16 Sep, 08:20',
    quote: 'Options volumes set a September record, and the fastest-growing cohort is traders under 35.',
    link: 'x.com',
    alva: 'A direct read on the toll-road leg; one record month is not a trend, and volumes fall fastest when volatility does.',
  },
  {
    id: 'dylan-patel',
    avatar: `${A}avatar-dylan-patel.png`,
    name: 'Dylan Patel',
    role: 'Founder & Chief Analyst, SemiAnalysis',
    time: '15 Sep, 22:05',
    quote: 'Rubin CPX pricing suggests Nvidia holds gross margin into 2027 even as supply catches up.',
    link: 'x.com',
    alva: 'Supports pricing power on the compute leg; a third-party margin estimate is not company guidance.',
  },
  {
    id: 'msft-earnings',
    avatar: `${A}avatar-microsoft.png`,
    name: 'Microsoft FY26 Q1 earnings call',
    role: 'Company disclosure',
    time: '15 Sep, 21:00',
    quote: 'Azure grew 39% year over year with AI services contributing 16 points, and capacity stays constrained into the second half.',
    link: 'microsoft.com',
    alva: 'Confirms the monetization leg is accelerating; being capacity constrained caps how fast it converts.',
  },
  {
    id: 'gene-munster',
    avatar: `${A}avatar-gene-munster.png`,
    name: 'Gene Munster',
    role: 'Managing Partner, Deepwater Asset Management',
    time: '15 Sep, 13:40',
    quote: 'The AI trade is broadening from picks-and-shovels to platform monetization, which favours owners of distribution.',
    link: 'deepwatermgmt.com',
    alva: 'Matches how this thesis is structured; a framing call, not evidence the shift has happened.',
  },
  {
    id: 'kobeissi',
    avatar: `${A}avatar-kobeissi.png`,
    name: 'The Kobeissi Letter',
    role: 'Market research',
    time: '14 Sep, 19:15',
    quote: 'Retail net buying averaged $1.2 billion a day in September, the highest since 2021 and concentrated in seven AI names.',
    link: 'kobeissiletter.com',
    alva: 'The clearest support for the flow premise; that same concentration is what hurts when it reverses.',
  },
  {
    id: 'unusual-whales',
    avatar: `${A}avatar-unusual-whales.png`,
    name: 'Unusual Whales',
    role: 'Options flow data',
    time: '14 Sep, 10:05',
    quote: 'NVDA call volume doubled ahead of GTC and HOOD open interest hit a record.',
    link: 'unusualwhales.com',
    alva: 'Consistent with retail engagement; positioning data says nothing about underlying earnings.',
  },
  {
    id: 'morgan-stanley',
    avatar: `${A}avatar-morgan-stanley.png`,
    name: 'Morgan Stanley',
    role: 'Keith Weiss, Software equity research',
    time: '13 Sep, 16:30',
    quote: 'Raises the Microsoft target on Copilot attach rates and sees Azure reaccelerating through FY27.',
    link: 'morganstanley.com',
    alva: 'Sell-side confirmation of the monetization leg; price targets move with sentiment faster than with revenue.',
  },
  {
    id: 'tsmc',
    avatar: `${A}avatar-tsmc.png`,
    name: 'TSMC monthly revenue',
    role: 'Company disclosure',
    time: '12 Sep, 09:00',
    quote: 'September revenue rose 39% year over year on AI accelerator demand.',
    link: 'tsmc.com',
    alva: 'Upstream confirmation that accelerator shipments keep climbing; the release does not split AI from the rest.',
  },
];

/** Related theses tab 的条目数，稿上与 Signals 同为 8 */
export const RELATED_THESES_COUNT = 8;

/* ══════════ Related theses（结构 1-1 的第二个 tab） ══════════ */

export interface RelatedThesis {
  id: string;
  avatar: string;
  name: string;
  role: string;
  /** 相对或短日期，照稿 */
  time: string;
  /** 生命周期标签：新建 = 绿，更新 = 蓝 */
  kind: 'new' | 'update';
  paragraphs: string[];
  charts: ThesisMedia[];
  tickers: string[];
  saves: number;
  saved?: boolean;
}

const CHART_MSFT: ThesisMedia = { src: `${A}media-chart-msft.png`, alt: 'Microsoft MSFT price chart' };
const CHART_GOOGL: ThesisMedia = { src: `${A}media-chart-googl.png`, alt: 'Alphabet GOOGL price chart' };
const CHART_AMZN: ThesisMedia = { src: `${A}media-chart-amzn.png`, alt: 'Amazon AMZN price chart' };

export const RELATED_THESES: RelatedThesis[] = [
  {
    id: 'satya-nadella',
    avatar: `${A}avatar-satya-nadella.png`,
    name: 'Satya Nadella',
    role: 'Chairman & CEO, Microsoft',
    time: '1h ago',
    kind: 'new',
    paragraphs: [
      'Azure surpassed $75 billion in annual revenue, up 34%. Microsoft added more than two gigawatts of datacenter capacity over the previous 12 months and now had over 400 datacenters across 70 regions…',
    ],
    charts: [CHART_MSFT],
    tickers: ['MSFT'],
    saves: 32,
    saved: true,
  },
  {
    id: 'gavin-baker-related',
    avatar: `${A}avatar-gavin-baker.png`,
    name: 'Gavin Baker',
    role: 'Managing Partner & CIO, Atreides',
    time: 'Jul 13',
    kind: 'update',
    paragraphs: [
      'Baker frames this as a possible shift, not an outcome already visible. If lower-priced open or closed models take share from frontier labs with high inference margins, customers could get more intelligence for each dollar and increase their token usage.',
      'Under that scenario, part of the profit pool could move from model providers to AI infrastructure. He sees low delivery cost per token as the infrastructure advantage, while token efficiency would matter most at the model layer.',
    ],
    charts: [CHART_GOOGL, CHART_AMZN, CHART_MSFT],
    tickers: ['GOOGL', 'AMZN', 'MSFT'],
    saves: 32,
  },
  {
    id: 'matt-bryson',
    avatar: `${A}avatar-matt-bryson.png`,
    name: 'Matt Bryson',
    role: 'Managing Director, Equity Research · Wedbush',
    time: 'Sep 9',
    kind: 'new',
    paragraphs: [
      'Custom silicon is the next leg of the AI trade. As Microsoft scales Maia and Google scales TPU, Marvell and TSMC capture design and manufacturing spend that used to flow only to Nvidia.',
    ],
    charts: [],
    tickers: ['TSM'],
    saves: 32,
  },
  {
    id: 'beth-kindig',
    avatar: `${A}avatar-beth-kindig.png`,
    name: 'Beth Kindig',
    role: 'Lead Tech Analyst, I/O Fund',
    time: 'Sep 8',
    kind: 'new',
    paragraphs: [
      "Nvidia's data center revenue is still being underestimated. Inference is becoming the larger workload, and every cut in token price has been met with more usage, not less.",
    ],
    charts: [],
    tickers: ['NVDA'],
    saves: 32,
  },
  {
    id: 'aswath-damodaran',
    avatar: `${A}avatar-aswath-damodaran.png`,
    name: 'Aswath Damodaran',
    role: 'Professor of Finance, NYU Stern',
    time: 'Sep 6',
    kind: 'update',
    paragraphs: [
      'Hyperscaler capex only creates value if returns clear the cost of capital. Markets are pricing the spend as if that question were already settled, and the three largest spenders trade as if execution risk were zero.',
    ],
    charts: [CHART_GOOGL, CHART_AMZN, CHART_MSFT],
    tickers: ['GOOGL', 'AMZN', 'MSFT'],
    saves: 32,
  },
  {
    id: 'dan-ives',
    avatar: `${A}avatar-dan-ives.png`,
    name: 'Dan Ives',
    role: 'Managing Director, Wedbush',
    time: 'Sep 5',
    kind: 'new',
    paragraphs: [
      'The AI build-out is a multi-year cycle, not a quarter-to-quarter trade. Semis and cloud infrastructure remain the cleanest way to own it, and every 10% pullback has been a buying window.',
    ],
    charts: [],
    tickers: ['NVDA', 'MSFT'],
    saves: 32,
  },
  {
    id: 'traderstewie',
    avatar: `${A}avatar-traderstewie.png`,
    name: 'Traderstewie',
    role: 'Trader · Trade setup',
    time: 'Sep 4',
    kind: 'update',
    paragraphs: [
      'AMD is approaching its summer high as more buyers join the advance. The stock has broken higher after its last pullback stopped above the previous low, and rising volume makes the recovery more convincing.',
    ],
    charts: [],
    tickers: ['AMD'],
    saves: 32,
  },
  {
    id: 'cathie-wood',
    avatar: `${A}avatar-cathie-wood.png`,
    name: 'Cathie Wood',
    role: 'CEO & CIO, ARK Invest',
    time: 'Sep 2',
    kind: 'new',
    paragraphs: [
      'Robinhood is becoming the default brokerage for the next generation of investors. Crypto and options are the wedge; wealth management is the prize.',
    ],
    charts: [],
    tickers: ['HOOD'],
    saves: 32,
  },
];
