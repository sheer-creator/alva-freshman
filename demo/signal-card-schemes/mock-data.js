// Static demo samples adapted from the user-provided “Signal × Thesis 混排”
// artifact (snapshot: 2026-10-26). These are not a live market feed.
// https://claude.ai/artifact/Wa8snwTvrHTp87Uec1V2No
window.SIGNAL_CARD_MOCK = (() => {
  const people = {
    harryz: ['harryz', 'avatar-harryz.png'],
    herman: ['Herman Jin', 'avatar-herman-jin.jpg'],
    algostonk: ['Algostonk', null],
  };
  const heads = {
    '33121': 'The AI trade, especially semiconductors, may face near-term multiple compression despite strong backlogs, revenue, guidance, and uncut CapEx',
    '33123': 'BTC looks shaky here given overall risk off sentiment across market & gold underperformance even when rates and dollar down',
    '17552': 'Cloud providers are set for a reverse “scary story” that crushes the shorts, with Microsoft the top pick among the big three.',
    '33049': 'Nebius can deploy reliable compute on the plan they’ve laid out — the team is strong.',
    '33041': 'HBM isn’t a commodity',
    anthropic: 'Could Anthropic’s IPO Mark the Cycle Top?',
    meta: 'Meta is still very cheap.',
  };
  const sources = {
    firstsquawk: { name: 'First Squawk', role: 'Financial Audio News Service', av: 'src-first-squawk.jpg' },
    bloomberg: { name: 'Bloomberg', role: 'Business and Financial Information and News Platform', av: 'src-bloomberg.jpg' },
    dowjones: { name: 'Dow Jones', role: 'Real-Time Financial News Wire', av: 'src-dow-jones.jpg' },
    reuters: { name: 'Reuters', role: 'Global News Agency', av: 'src-reuters.jpg' },
    silicondata: { name: 'Silicon Data', role: 'Compute-Market Data & Analytics', av: 'src-silicon-data.jpg' },
    fireside: { name: 'Fireside Alpha', role: 'Business, Technology and Investing Interview Digest', av: 'src-fireside-alpha.jpg' },
    jukan: { name: 'Jukan', role: 'Semiconductor & AI Infrastructure Research at Citrini', av: 'src-jukan.jpg' },
    chamath: { name: 'Chamath Palihapitiya', role: 'Founder & CEO of Social Capital, Co-Founder & CEO of 8090', av: 'src-chamath.png' },
  };
  const signal = (source, data) => ({ ...sources[source], host: new URL(data.url).hostname.replace(/^www\./, ''), ...data });
  const signals = [
    signal('firstsquawk', {
      id: 'firstsquawk', label: 'First Squawk · Supports', age: 1,
      url: 'https://x.com/FirstSquawk/status/2114605709258367175',
      quote: 'Federal Reserve to Stick With Quarterly Rate Increases After Removing 2025 Insurance Cuts-FT',
      theses: [['supports', 'harryz', '33121']],
      note: 'The FT reports an expected path of quarterly Fed rate increases, reducing the prospect that easing rate expectations will relieve pressure on AI and semiconductor valuations.',
    }),
    signal('bloomberg', {
      id: 'liquidity', label: 'Bloomberg · 流动性', age: 1,
      url: 'https://x.com/business/status/2114599191452270781',
      quote: 'Australia’s regulator warns ructions in the global bond market and elevated concerns linked to artificial intelligence are threatening to weaken financial market liquidity',
      theses: [['supports', 'harryz', '33121']],
      note: 'Australia’s regulator warns that bond-market volatility and AI concerns could weaken financial-market liquidity, a macro headwind to relief from semiconductor valuation pressure.',
    }),
    signal('bloomberg', {
      id: 'bloomberg', label: 'Bloomberg · SK Hynix', age: 1,
      url: 'https://x.com/business/status/2114596671854084260',
      quote: 'Two leveraged exchange-traded funds tied to SK Hynix will be liquidated just months after their debut in the US, as investor appetite for the AI trade moderates',
      theses: [['supports', 'harryz', '33121']],
      note: 'The liquidation of two recently launched leveraged SK Hynix funds indicates shrinking demand for concentrated AI-memory exposure, a positioning signal consistent with near-term semiconductor multiple pressure.',
    }),
    signal('bloomberg', {
      id: 'bitcoin', label: 'Bloomberg · BTC', age: 1,
      url: 'https://x.com/business/status/2114594162725011930',
      quote: 'Bitcoin retreated below $80,000 as broader risk-off sentiment ahead of a Federal Reserve meeting and concerns over the AI trade weighed on cryptocurrencies',
      theses: [['supports', 'harryz', '33123']],
      note: 'BTC’s break below $80K reverses the level CoinShares cited as resilience last week, strengthening the case that broader risk aversion is eroding price support.',
    }),
    signal('dowjones', {
      id: 'dowjones', label: 'Dow Jones · Mixed', age: 3,
      url: 'https://www.tradingview.com/news/DJN_DN20261026000015:0-cambricon-s-revenue-growth-slower-than-expected-market-talk/',
      quote: 'Cambricon Technologies’ revenue growth was slower than expected despite more-than doubling in 3Q, Bernstein analysts say in a research note. A high-bandwidth memory chip shortage, manufacturing constraints and revenue recognition delays have likely weighed on the Chinese chip maker’s revenue growth, they say. Cambricon’s continued margin expansion is consistent with the strong demand and improved bargaining power for domestic artificial-intelligence fabless suppliers',
      theses: [['mixed', 'harryz', '33121']],
      note: 'Bernstein says Cambricon’s third-quarter revenue growth missed expectations despite more than doubling, likely held back by HBM and manufacturing constraints, while expanding margins indicate continued AI-chip demand and supplier pricing power.',
    }),
    signal('reuters', {
      id: 'reuters', label: 'Reuters · Gold', age: 4,
      url: 'https://www.tradingview.com/news/reuters.com,2026:newsml_L2N46C03F:0-spot-gold-may-test-support-at-3-967/',
      quote: 'The metal has slid below the $4,000 psychological level. From a longer-term perspective, the downtrend from $5,587 may have resumed.',
      theses: [['supports', 'harryz', '33123']],
      note: 'Reuters technical analysis sees gold’s break below $4,000 as opening support near $3,967 and potentially extending its longer-term downtrend, deepening the precious-metal weakness in the thesis.',
    }),
    signal('reuters', {
      id: 'hynixreturns', label: 'Reuters · 股东回报', age: 5,
      url: 'https://www.tradingview.com/news/reuters.com,2026:newsml_L2N46C01C:0-sk-hynix-to-announce-steps-to-boost-shareholder-returns-on-wednesday/',
      quote: 'When asked about the media report by the stock exchange operator, SK Hynix said that it is “reviewing various shareholder return measures” and plans to announce them alongside third-quarter earnings on Wednesday.',
      theses: [['supports', 'harryz', '33041']],
      note: 'SK Hynix’s plan to announce shareholder-return measures alongside earnings could improve the case for a higher valuation of its Korean shares as AI-memory profits accumulate.',
    }),
    signal('bloomberg', {
      id: 'audshorts', label: 'Bloomberg · AUD', age: 5,
      url: 'https://x.com/business/status/2114540052688613876',
      quote: 'Asset managers’ short positions on the Australian dollar surged to a record high in the week ended Oct. 20, as mounting Middle East tensions and jitters over the AI trade spurred a retreat from the risk-sensitive currency.',
      theses: [['supports', 'harryz', '33123']],
      note: 'Asset managers’ record short positioning in the risk-sensitive Australian dollar shows risk aversion extending into currency markets amid Middle East and AI-trade concerns.',
    }),
    signal('bloomberg', {
      id: 'spacex', label: 'Bloomberg · SpaceX', age: 6,
      url: 'https://x.com/business/status/2114526226341638145',
      quote: 'Elon Musk has claimed that SpaceX closed a $40 billion debt deal to pay for the chips it needs to fuel its AI ambitions. However, people familiar with the matter said the parties were still engaged in pricing discussions as of Sunday and the deal had not yet closed.',
      theses: [['supports', 'harryz', '33121']],
      note: 'Bloomberg’s sources say SpaceX’s $40 billion GPU debt deal remained in pricing talks and had not closed as of Sunday, reversing Musk’s claim of secured financing for next year’s purchases.',
    }),
    signal('silicondata', {
      id: 'silicondata', label: 'Silicon Data · 折叠 4', age: 6,
      url: 'https://x.com/silicondata/status/2114521271803203781',
      quote: 'In this week’s Reference Price newsletter we flagged an interesting “generational slope” in on-demand GPU rental rates. Over the past week the increases were ordered by chip generation: B300 +8.6% → B200 +4.7% → H200 +4.2% → H100 +2.5% → A100 +2.0%. To the extent there is a compute shortage, it appears concentrated at the newest chips. Long-context inference is increasingly memory-bound, which favors the chips with the most high-bandwidth memory — and that memory remains tight.',
      theses: [['supports', 'herman', '17552'], ['mixed', 'harryz', '33121'], ['supports', 'harryz', '33049'], ['supports', 'harryz', '33041']],
      note: 'Silicon Data finds the sharpest rental increases in the newest, memory-rich GPUs, indicating that capacity scarcity is concentrated where AI workloads need the most high-bandwidth memory and supporting stronger pricing for capable cloud infrastructure.',
    }),
    signal('reuters', {
      id: 'ratecycle', label: 'Reuters · 加息周期', age: 6,
      url: 'https://www.tradingview.com/news/reuters.com,2026:newsml_L3N46B05K:0-asian-shares-make-cautious-start-brent-eases-from-six-month-high/',
      quote: '“The main message from global central banks grappling with this year’s macroeconomic surprises is that a relatively shallow rate hike cycle is underway,” said Bruce Kasman, global head of economics at JPMorgan.',
      theses: [['supports', 'algostonk', 'anthropic']],
      note: 'JPMorgan’s expectation of a rate-hike cycle adds a concrete financing headwind that could make a richly valued Anthropic IPO more vulnerable.',
    }),
    signal('firstsquawk', {
      id: 'brent', label: 'First Squawk · Brent', age: 7,
      url: 'https://x.com/FirstSquawk/status/2114505786936467607',
      quote: 'BRENT HAS RISEN AROUND 90% THIS YEAR AMID WAR-RELATED SUPPLY DISRUPTIONS, WITH FURTHER US-IRAN ESCALATION AND REGIONAL CLASHES THREATENING INVENTORIES; CBA ANALYST VIVEK DHAR SAID BRENT MAY NEED TO REACH $150 A BARREL TO TRIGGER SIGNIFICANT DEMAND DESTRUCTION IN EMERGING ASIAN ECONOMIES.',
      theses: [['supports', 'algostonk', 'anthropic']],
      note: 'War-related supply disruptions have lifted oil sharply, adding inflation and geopolitical pressure that could make markets more vulnerable around an Anthropic IPO.',
    }),
    signal('jukan', {
      id: 'hbmspeedfix', label: 'Jukan · 速度更正', age: 7,
      url: 'https://x.com/jukan05/status/2114506038456222160',
      quote: 'Correction: It’s 9.6, not 9.3.',
      theses: [['refutes', 'harryz', '33041']],
      note: 'Jukan corrected the reported HBM4 pin speed to 9.6 Gbps rather than 9.3 Gbps; it remains below the earlier 11.7 Gbps figure, preserving the negative implication for HBM4 performance expectations.',
    }),
    signal('jukan', {
      id: 'jukan', label: 'Jukan · Challenges', age: 7,
      url: 'https://x.com/jukan05/status/2114504702264267235',
      quote: 'NVIDIA has officially lowered the HBM4 pin speed. 11.7-> 9.3Gbps',
      theses: [['refutes', 'harryz', '33041']],
      note: 'NVIDIA has officially lowered HBM4 pin speed from 11.7 to 9.3 Gbps, reducing the performance specification for the next HBM generation and weakening the case that escalating HBM performance alone will sustain premium economics.',
    }),
    signal('jukan', {
      id: 'hbmstacks', label: 'Jukan · HBM 堆叠', age: 8,
      url: 'https://x.com/jukan05/status/2114499959563370930',
      quote: 'CSPs and AI labs had requested the development of lower-stack HBM products, such as 4-high and 6-high configurations, for use in low-end inference products. Those plans now appear to have been shelved, with 8-high once again emerging as the minimum stack height.',
      theses: [['supports', 'harryz', '33041']],
      note: 'Daishin Securities reports that planned 4-high and 6-high HBM products for lower-end inference have been shelved, leaving 8-high as the apparent minimum stack. A higher minimum stack favors higher-value HBM content and supports its differentiation from commodity DRAM.',
    }),
    signal('jukan', {
      id: 'mi450', label: 'Jukan · MI450 · Mixed', age: 8,
      url: 'https://x.com/jukan05/status/2114499959563370930',
      quote: 'One notable development is the upcoming MI450, which is expected to increase the number of HBM stacks within the CoWoS package to 12, delivering 288GB of HBM4. The increase from eight to 12 HBM stacks per CoWoS package is a positive development for HBM content over the medium to long term.',
      theses: [['mixed', 'harryz', '33121']],
      note: 'Daishin expects AMD’s MI450 to raise HBM stacks per package from eight to 12, lifting memory content per accelerator and supporting supplier demand even as hardware costs increase.',
    }),
    signal('fireside', {
      id: 'fireside', label: 'Fireside Alpha · 折叠 2', age: 14,
      url: 'https://x.com/firesidealpha/status/2114405272810897660',
      quote: '“After the agentic era, it needs a lot of CPU too, it needs even more memory, and it also needs a lot of flash and hard drive, storage. Like what I said just now, in the future agents will definitely bring better, I mean, enterprise oriented and consumer oriented new product, so the demand will be very large. So I think for all of these components, I think they’ll all still be fairly scarce.”',
      theses: [['supports', 'harryz', '33041'], ['supports', 'harryz', '33121']],
      note: 'Google VP Bill Jia expects agentic workloads to require more memory than basic inference and to keep memory components scarce, supporting sustained compute-driven memory demand.',
    }),
    signal('chamath', {
      id: 'chamath', label: 'Chamath · 折叠 5', age: 15,
      url: 'https://x.com/chamath/status/2114389987563381004',
      quote: 'There are delays in the existing pipeline that will catch people off guard in 2027. Hyperscalers will (obviously) react by focusing on their own internal compute needs over any third party. If the third party is a model company, they will tell them to go through their model router where they will also take a non-trivial vig. All of this is to say that it does look like there will be a lot of partially stranded compute and compute sitting in inventory in 2027 than is currently forecasted. This is bought and paid for but effectively underearning (below total cost of capital) or collecting dust.',
      theses: [['supports', 'algostonk', 'anthropic'], ['refutes', 'harryz', 'meta'], ['supports', 'harryz', '33121'], ['refutes', 'herman', '17552'], ['refutes', 'harryz', '33049']],
      note: 'Forecast data-center delays and hyperscalers prioritizing their own compute could constrain Anthropic’s capacity and raise its distribution costs, making upside against IPO expectations harder.',
    }),
  ];
  const explanations = {
    silicondata: [
      signals.find(s => s.id === 'silicondata').note,
      'Silicon Data finds weekly rental gains steepest for B300 GPUs at 8.6% versus 2% for A100s, suggesting memory-heavy inference demand is concentrating scarcity and pricing power in the newest chips while raising inference costs.',
      'Silicon Data finds the newest GPUs gained rental pricing fastest over the week, with B300 up 8.6% versus H100 up 2.5%, making Nebius’s hardware mix more important to realized revenue.',
      'Silicon Data reports rental rates rising fastest for the newest GPUs and links their advantage partly to memory-bound long-context inference, supporting demand for high-HBM configurations.',
    ],
    fireside: [
      signals.find(s => s.id === 'fireside').note,
      'Google VP Bill Jia expects agentic applications to require more CPUs, memory and storage alongside accelerators, extending component scarcity and upstream spending pressure as AI deployment scales.',
    ],
    chamath: [
      signals.find(s => s.id === 'chamath').note,
      'From his energized-land portfolio, Palihapitiya expects 2027 pipeline delays to leave bought-and-paid-for compute stranded or earning below its cost of capital across most hyperscalers, challenging the assumed value of Meta’s buildout.',
      'Chamath expects compute bought for the AI buildout to sit under-earning below its cost of capital or idle in 2027, a specific forecast that upstream capacity may fail to generate adequate returns.',
      'Drawing on his energized-land portfolio, Chamath expects 2027 buildout delays to strand paid-for compute across hyperscalers and leave some capacity earning below its cost of capital, challenging the expected AI profit economics.',
      'Chamath, drawing on his energized-land portfolio, expects 2027 pipeline delays to leave purchased compute idle or earning below its cost of capital across neoclouds, challenging Nebius’s deployment and monetization assumptions.',
    ],
  };
  const theses = [
    { name: '3X Long Labubu', av: null, age: 12, tickers: ['SMH'],
      quote: 'Semiconductor bounces could be fragile because leveraged-long ETF inflows during a selloff resemble the June-July KOSPI fund-flow pattern. GlobalMktObserv reports $9.27 billion flowed into SOXL in two weeks despite its decline. A squeeze bounce could come first; shorting after it is safer than chasing now.',
      url: 'https://x.com/labubu_trader/status/2114413592640675897' },
    { name: '3X Long Labubu', av: null, age: 13, tickers: ['SPY'],
      quote: 'US stocks face persistent uncertainty around the midterms through year-end as military-strike risk remains unresolved. Until a strike occurs or a genuine peace deal is signed, the market cannot price that risk confidently.',
      url: 'https://x.com/labubu_trader/status/2114411258518921723' },
    { name: '3X Long Labubu', av: null, age: 13, tickers: ['XLE', 'USO'],
      quote: 'Crude oil and the XLE energy-sector ETF would be buys on a pullback because uncertainty over a real military strike could hang over the US market from the midterms through year-end. Only an actual strike or a true peace deal would settle that uncertainty.',
      url: 'https://x.com/labubu_trader/status/2114411258518921723' },
  ];
  // Keep signals ordered by age; insert a reference thesis after every five.
  const feed = signals.flatMap((s, i) => (i + 1) % 5 === 0 && theses[(i + 1) / 5 - 1]
    ? [s, { ...theses[(i + 1) / 5 - 1], kind: 'thesis' }]
    : [s]);
  return { people, heads, signals, explanations, feed };
})();
