export const ASSETS = '../alva-mobile-mvp/img/';
export const INTERESTS = [
  { id: 'NVDA', name: 'NVIDIA', logo: 'nvda.png' },
  { id: 'MU', name: 'Micron', logo: 'mu.png' },
  { id: 'TSLA', name: 'Tesla', logo: 'tsla.png' },
  { id: 'AAPL', name: 'Apple', logo: 'aapl.png' },
  { id: 'MSFT', name: 'Microsoft', logo: 'msft.png' },
  { id: 'AMZN', name: 'Amazon', logo: 'amzn.png' },
  { id: 'GOOGL', name: 'Alphabet', logo: 'googl.png' },
  { id: 'META', name: 'Meta', logo: 'meta.png' },
  { id: 'AMD', name: 'AMD', logo: 'amd.png' },
  { id: 'AI infrastructure', name: 'AI infrastructure', theme: true },
];
export const FOCUSES = ['Revenue & demand', 'Risks & counterevidence', 'Catalysts & timing'];

export const AUTHORS = {
  jukan: { name: 'Jukan', short: 'Jukan', publication: '@jukan05', simulatedMember: true, avatarUrl: 'https://pbs.twimg.com/profile_images/2037840794992988160/tnSqJgqt_400x400.jpg' },
  rihard: { name: 'Rihard Jarc', short: 'Rihard', publication: '@RihardJarc', simulatedMember: true, avatarUrl: 'https://pbs.twimg.com/profile_images/1251462631363403776/r4lpY-WV_400x400.jpg' },
  ophir: { name: 'Ophir Gottlieb', short: 'Ophir', publication: '@OphirGottlieb', simulatedMember: true, avatarUrl: 'https://pbs.twimg.com/profile_images/2067310082006884352/1PgRvA17_400x400.jpg' },
  gary: { name: 'Gary Black', short: 'Gary', publication: '@garyblack00', simulatedMember: true, avatarUrl: 'https://pbs.twimg.com/profile_images/1425220761728520194/CwLMGJp0_400x400.jpg' },
  andrew: { name: 'Andrew Ng', short: 'Andrew', publication: '@AndrewYNg', simulatedMember: true, avatarUrl: 'https://pbs.twimg.com/profile_images/733174243714682880/oyG30NEH_normal.jpg' },
  karpathy: { name: 'Andrej Karpathy', short: 'Andrej', publication: '@karpathy', avatarUrl: 'https://pbs.twimg.com/profile_images/1296667294148382721/9Pr6XrPB_normal.jpg' },
  ethan: { name: 'Ethan Mollick', short: 'Ethan', publication: '@emollick', avatarUrl: 'https://pbs.twimg.com/profile_images/1601382188712398850/3AAOlqrX_normal.jpg' },
  swyx: { name: 'swyx', short: 'swyx', publication: '@swyx', avatarUrl: 'https://pbs.twimg.com/profile_images/2073162797354217472/hNny55eF_normal.jpg' },
  jiayi: { name: 'Jiayi Pan', short: 'Jiayi', publication: '@jiayi_pirate', avatarUrl: 'https://pbs.twimg.com/profile_images/1890235714148921347/R5g70Wch_normal.jpg' },
  vamsi: { name: 'Vamsi Boppana', short: 'Vamsi', publication: 'AMD' },
  jensen: { name: 'Jensen Huang', short: 'Jensen', publication: 'NVIDIA', avatarUrl: ASSETS + 'people/jensen.jpg' },
  ben: { name: 'Ben Thompson', short: 'Ben', publication: 'Stratechery', avatarUrl: 'portraits/ben.jpg' },
  aswath: { name: 'Aswath Damodaran', short: 'Aswath', publication: 'Musings on Markets', avatarUrl: 'portraits/aswath.jpg' },
  dylan: { name: 'Dylan Patel', short: 'Dylan', publication: 'SemiAnalysis', avatarUrl: 'portraits/dylan-photo.png' },
  tasha: { name: 'Tasha Keeney', short: 'Tasha', publication: 'ARK Invest', avatarUrl: 'portraits/tasha.jpg' },
  satya: { name: 'Satya Nadella', short: 'Satya', publication: 'Microsoft', avatarUrl: 'portraits/satya.jpg' },
  sanjay: { name: 'Sanjay Mehrotra', short: 'Sanjay', publication: 'Micron', avatarUrl: 'portraits/sanjay.jpg' },
  tim: { name: 'Tim Cook', short: 'Tim', publication: 'Apple', avatarUrl: 'portraits/tim.jpg' },
  andy: { name: 'Andy Jassy', short: 'Andy', publication: 'Amazon', avatarUrl: 'portraits/andy.jpg' },
  mark: { name: 'Mark Zuckerberg', short: 'Mark', publication: 'Meta', avatarUrl: 'portraits/mark.jpg' },
  lisa: { name: 'Lisa Su', short: 'Lisa', publication: 'AMD', avatarUrl: 'portraits/lisa.jpg' },
  sundar: { name: 'Sundar Pichai', short: 'Sundar', publication: 'Google', avatarUrl: 'portraits/sundar.jpg' },
};

AUTHORS.ethan.simulatedMember = true;
AUTHORS.dylan.simulatedMember = true;

// Historical public sources. Summaries, tracking angles and evidence readings are Alva's.
export const SOURCES = {
  jukanHbmPricing: {
    authorId: 'jukan', date: '2026-07-29', kind: 'X · summary',
    title: 'HBM pricing depends on more than DRAM prices',
    url: 'https://x.com/jukan05/status/2082267807950184614',
    verifiedVia: '/alva/home/zet/feeds/jukan05-tweet-tracker/v1/data/tweets/raw',
    text: 'Jukan relays SK hynix’s earnings-call explanation of HBM pricing: wafer use, packaging complexity and customer qualification all enter the negotiation. Conventional DRAM prices are only one input.',
  },
  jukanHbmSupply: {
    authorId: 'jukan', date: '2026-07-30', kind: 'X · summary',
    title: 'Samsung’s HBM ramp adds a supply-side test',
    url: 'https://x.com/jukan05/status/2082645100187029829',
    verifiedVia: '/alva/home/zet/feeds/jukan05-tweet-tracker/v1/data/tweets/raw',
    text: 'In Jukan’s translation of Samsung’s earnings Q&A, the company says improving yields and added capacity will expand HBM4 supply. It also targets a larger HBM share. These are management’s plans, with execution still ahead.',
  },
  rihardConsumer: {
    authorId: 'rihard', date: '2026-08-24', kind: 'X · summary',
    title: 'Who owns the consumer relationship in AI?',
    url: 'https://x.com/RihardJarc/status/2091878506359648466',
    verifiedVia: '/alva/home/zet/feeds/rihardjarc-tweet-tracker/v1/data/tweets/raw',
    text: 'Jarc shares an interview with a Meta AI team member who argues that owning the consumer relationship is critical. The interviewee sees data collection, reward design and compute as key inputs to model progress.',
  },
  rihardHarness: {
    authorId: 'rihard', date: '2026-08-31', kind: 'X · summary',
    title: 'The workflow around the model matters',
    url: 'https://x.com/RihardJarc/status/2094424164241215655',
    verifiedVia: '/alva/home/zet/feeds/rihardjarc-tweet-tracker/v1/data/tweets/raw',
    text: 'Jarc relays a Microsoft employee’s view that the software around an AI model drives much of its usefulness. The interviewee expects buyers to move toward paying for outcomes as they seek predictable costs.',
    media: { type: 'image', url: 'https://pbs.twimg.com/media/HRDjlLxX0AAH8eY.png', label: 'Interview notes shared by Jarc', credit: 'Rihard Jarc · Attachment from original post' },
  },
  ophirCompute: {
    authorId: 'ophir', date: '2026-08-05', kind: 'X · summary',
    title: 'Agents need CPUs and orchestration too',
    url: 'https://x.com/OphirGottlieb/status/2085051195975242032',
    verifiedVia: '/alva/home/zet/feeds/ophirgottlieb-tweet-tracker/v1/data/tweets/raw',
    text: 'Gottlieb argues that agentic AI expands demand for CPUs, storage and orchestration around accelerators. He sees a broader opportunity for AMD, while cautioning that customer commitments do not yet prove reliable deployments at scale.',
    media: { type: 'image', url: 'https://pbs.twimg.com/media/HO-VtR1aMAA5SLf.png', label: 'Gottlieb’s AMD research', credit: 'Ophir Gottlieb · Attachment from original post' },
  },
  ophirConcentration: {
    authorId: 'ophir', date: '2026-08-15', kind: 'X · summary',
    title: 'Cloud growth can hide customer concentration',
    url: 'https://x.com/OphirGottlieb/status/2088731325515911423',
    verifiedVia: '/alva/home/zet/feeds/ophirgottlieb-tweet-tracker/v1/data/tweets/raw',
    text: 'Gottlieb revisits his AI infrastructure view: he believes incremental cloud demand is much more dependent on OpenAI and Anthropic than he had assumed. He remains invested, but sees concentrated counterparties as a material risk.',
  },
  garyAutonomy: {
    authorId: 'gary', date: '2026-09-05', kind: 'X · summary',
    title: 'Three tests for the robotaxi thesis',
    url: 'https://x.com/garyblack00/status/2096257060291649689',
    verifiedVia: '/alva/home/zet/feeds/garyblack00-tweet-tracker/v1/data/tweets/raw',
    text: 'Black is positive on Tesla’s autonomous technology but remains cautious on the investment case. He asks how quickly robotaxis can contribute meaningful earnings, how fast competitors can catch up, and whether safety holds as the service expands.',
    media: { type: 'image', url: 'https://pbs.twimg.com/media/HRdfgFXbwAEp9c5.jpg', label: 'Supporting material shared by Black', credit: 'Gary Black · Attachment from original post' },
  },
  garyDistribution: {
    authorId: 'gary', date: '2026-09-06', kind: 'X · summary',
    title: 'Technology still needs to win new customers',
    url: 'https://x.com/garyblack00/status/2096666423858765852',
    verifiedVia: '/alva/home/zet/feeds/garyblack00-tweet-tracker/v1/data/tweets/raw',
    text: 'Black argues that Tesla should explain autonomy’s benefits to people outside its existing customer base. Letting the product speak for itself, he says, risks losing the early advantage as competing services arrive.',
  },
  ngApplications: {
    originalExcerpt: 'The foundation model layer being  hyper-competitive is great for people building applications.',
    authorId: 'andrew', date: '2025-01-27', kind: 'X · summary',
    title: 'Model competition benefits application builders',
    url: 'https://x.com/AndrewYNg/status/1883972263177072730',
    verifiedVia: 'https://cdn.syndication.twimg.com/tweet-result?id=1883972263177072730&token=0',
    text: 'Ng sees DeepSeek’s disruption as an opportunity for application builders. Fierce competition among foundation models makes the application layer a more attractive place to build.',
  },
  karpathyEfficiency: {
    authorId: 'karpathy', date: '2024-12-26', kind: 'X · summary',
    title: 'DeepSeek-V3 and compute efficiency',
    url: 'https://x.com/karpathy/status/1872362712958906460',
    verifiedVia: 'https://cdn.syndication.twimg.com/tweet-result?id=1872362712958906460&token=0',
    text: 'Karpathy highlights DeepSeek-V3 as a frontier-grade open-weights release achieved with a surprisingly small reported training budget: 2,048 GPUs over two months, around $6 million.',
  },
  mollickAgent: {
    originalExcerpt: 'I am finding ChatGPT agents to be useful.',
    authorId: 'ethan', date: '2025-07-22', kind: 'X · summary',
    title: 'Using an agent to update an AI cost/performance chart',
    url: 'https://x.com/emollick/status/1947482417888932258',
    verifiedVia: 'https://cdn.syndication.twimg.com/tweet-result?id=1947482417888932258&token=0',
    text: 'Mollick finds ChatGPT agents useful with supervision. In his own workflow, an agent handled the legwork of updating an AI cost/performance chart while he provided guidance.',
    media: { type: 'image', url: 'https://pbs.twimg.com/media/GwbXf89W4AEietn.jpg', label: 'An agent-assisted research workflow', credit: 'Ethan Mollick · Image from original post' },
  },
  swyxPricing: {
    originalExcerpt: 'o1-mini and o3-mini are going to have to DRASTICALLY cut prices (like, at least 25x) to keep up.',
    authorId: 'swyx', date: '2025-01-24', kind: 'X · summary',
    title: 'Reasoning models and the price-performance frontier',
    url: 'https://x.com/swyx/status/1882933368444309723',
    verifiedVia: 'https://cdn.syndication.twimg.com/tweet-result?id=1882933368444309723&token=0',
    text: 'Updating his price-performance comparison with DeepSeek and Gemini results, swyx argues that OpenAI’s smaller reasoning models face strong pressure to cut prices.',
    media: { type: 'image', url: 'https://pbs.twimg.com/media/GiGFPD1bAAAdRLE.jpg', label: 'Reasoning price-performance comparison', credit: 'swyx · Historical chart from original post' },
  },
  tinyZero: {
    originalExcerpt: 'We reproduced DeepSeek R1-Zero in the CountDown game, and it just works',
    authorId: 'jiayi', date: '2025-01-24', kind: 'X · summary',
    title: 'TinyZero: a small-scale reasoning experiment',
    url: 'https://x.com/jiayi_pirate/status/1882839370505621655',
    verifiedVia: 'https://github.com/Jiayi-Pan/TinyZero',
    text: 'Pan’s team reproduced R1-Zero-style learning on the Countdown game. A 3B model developed checking and search behavior through reinforcement learning; the team reported a sub-$30 experiment cost.',
    media: { type: 'image', url: 'https://pbs.twimg.com/media/GiEwamOaEAAAGck.jpg', label: 'TinyZero experiment', credit: 'Jiayi Pan · Image from original post' },
  },
  jensenPodcast: {
    authorId: 'jensen', publisher: 'Lex Fridman', date: '2026-03-23', kind: 'Podcast · summary',
    title: 'Jensen Huang on AI scaling and the memory supply chain',
    url: 'https://lexfridman.com/jensen-huang-transcript/',
    text: 'Huang argues that reasoning and teams of agents make inference compute-intensive. He also describes persuading memory suppliers to invest in HBM as it moved from a niche technology toward mainstream data-center use.',
    media: { type: 'video', url: 'https://www.youtube.com/watch?v=vif8NQcjVf0&t=2466', thumbnail: 'https://i.ytimg.com/vi/vif8NQcjVf0/hqdefault.jpg', label: 'Lex Fridman #494', chapter: '41:06 · Memory supply chain' },
  },
  satyaPodcast: {
    authorId: 'satya', publisher: 'Dwarkesh', date: '2025-02-19', kind: 'Podcast · summary',
    title: 'Satya Nadella — Microsoft’s AGI plan & quantum breakthrough',
    url: 'https://www.dwarkesh.com/p/satya-nadella',
    text: 'Nadella’s test for AI is economic growth: customers need to turn cheaper intelligence into productive work. He tracks inference revenue as evidence that yesterday’s infrastructure investment is becoming today’s demand.',
    media: { type: 'video', url: 'https://www.youtube.com/watch?v=4GLSzuYXh6w&t=918', thumbnail: 'https://i.ytimg.com/vi/4GLSzuYXh6w/hqdefault.jpg', label: 'Dwarkesh Podcast', chapter: '15:18 · Economic growth & AI demand' },
  },
  markPodcast: {
    authorId: 'mark', publisher: 'Dwarkesh', date: '2025-04-29', kind: 'Podcast · summary',
    title: 'Mark Zuckerberg — AI will write most Meta code in 18 months',
    url: 'https://www.dwarkesh.com/p/mark-zuckerberg-2',
    text: 'An assistant gets more useful as it learns your context and you learn how to use it. Zuckerberg argues that this feedback loop takes time; even a perfect launch cannot provide years of shared history on day one.',
    media: { type: 'podcast', url: 'https://www.youtube.com/watch?v=rYXeQbTuVl0&t=694', thumbnail: 'https://i.ytimg.com/vi/rYXeQbTuVl0/hqdefault.jpg', label: 'Dwarkesh Podcast', chapter: '11:34 · Intelligence explosion' },
  },
  amdPlatform: {
    authorId: 'vamsi', publisher: 'AMD', evidenceOnly: true, byline: 'Vamsi Boppana · AMD', date: '2025-06-12', kind: 'Product overview · summary',
    title: 'AMD Instinct MI350 Series and Beyond',
    url: 'https://www.amd.com/en/blogs/2025/amd-instinct-mi350-series-and-beyond-accelerating-the-future-of-ai-and-hpc.html',
    text: 'AMD lists 288 GB of HBM3E per MI350X GPU and 2.3 TB across its eight-GPU platform. The announcement also describes the ROCm software stack and upcoming Helios rack architecture.',
    media: { type: 'image', url: 'https://www.amd.com/content/dam/amd/en/images/illustrations/blog/custom-thumbnails/3385456-instinct-blog-mi350-platform.jpg', label: 'AMD Instinct MI350 Series platform', credit: 'AMD · Official product image' },
  },
  computex: {
    authorId: 'jensen', date: '2025-05-18', kind: 'Keynote · summary',
    title: 'Jensen Huang at COMPUTEX 2025',
    url: 'https://blogs.nvidia.com/blog/computex-2025-jensen-huang/',
    text: 'Reasoning models, AI agents and physical AI expand the work computers can do. Huang makes the case for a much larger buildout of AI infrastructure.',
  },
  deepseek: {
    authorId: 'ben', date: '2025-01-27', kind: 'Essay · summary',
    title: 'DeepSeek FAQ',
    url: 'https://stratechery.com/2025/deepseek-faq/',
    text: 'Cheaper models change who captures value. Applications and distribution look better positioned; the case for ever-increasing spending on the largest models looks less certain.',
    relatedSourceId: 'jevons',
  },
  valuation: {
    authorId: 'aswath', date: '2025-01-31', kind: 'Essay · summary',
    title: 'DeepSeek crashes the AI Party: Story break or reframe?',
    url: 'https://aswathdamodaran.blogspot.com/2025/01/deepseek-crashes-ai-party-story-break.html',
    text: 'DeepSeek changes the assumptions behind the AI story. A large market does not tell you which companies will capture its value, or what their stocks are worth.',
  },
  rocm: {
    authorId: 'dylan', date: '2024-12-22', kind: 'Research · summary',
    title: 'MI300X vs H100 vs H200: Training',
    url: 'https://newsletter.semianalysis.com/p/mi300x-vs-h100-vs-h200-benchmark-part-1-training',
    coauthors: 'With Daniel Nishball and Reyk Knuhtsen',
    text: 'MI300X has compelling hardware. Getting it to train reliably is another matter. The team’s testing found software and usability gaps that keep CUDA’s advantage very real.',
  },
  hbm: {
    authorId: 'dylan', date: '2025-08-12', kind: 'Research · summary',
    title: 'Scaling the Memory Wall: The Rise and Roadmap of HBM',
    url: 'https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm',
    coauthors: 'With Myron Xie, Tanj Bennett, Ivan Chiam and Jeff Koch',
    text: 'AI scaling runs into a memory bottleneck. More bandwidth, taller HBM stacks and advanced packaging are critical — for GPUs and custom accelerators alike.',
  },
  memorywall: {
    authorId: 'dylan', date: '2024-09-03', kind: 'Research · summary',
    title: 'The Memory Wall: Past, Present, and Future of DRAM',
    url: 'https://newsletter.semianalysis.com/p/the-memory-wall',
    coauthors: 'SemiAnalysis research team',
    text: 'DRAM scaling is getting harder. Memory remains a commodity business exposed to supply and pricing cycles, even as new architectures open up technical opportunities.',
  },
  ark: {
    authorId: 'tasha', date: '2024-06-12', kind: 'Valuation model · summary',
    title: 'ARK’s Tesla valuation model for 2029',
    url: 'https://www.ark-invest.com/articles/valuation-models/arks-tesla-price-target-2029',
    coauthors: 'With Sam Korus and Daniel Maguire',
    text: 'In ARK’s 2029 model, robotaxis account for roughly 90% of Tesla’s projected enterprise value. The scenario depends on autonomy becoming a large, profitable business.',
  },
  tesla: {
    authorId: 'aswath', date: '2025-03-15', kind: 'Essay · summary',
    title: 'Investing, Politics and Globalization',
    url: 'https://aswathdamodaran.blogspot.com/2025/03/investing-politics-globalization.html',
    text: 'Tesla’s path to EV dominance looks less certain. BYD’s competitive strength and the political risks around Tesla’s brand complicate the growth story.',
  },
  jevons: {
    authorId: 'satya', date: '2025-01-27', kind: 'X · excerpt',
    title: 'Jevons paradox strikes again',
    url: 'https://x.com/satyanadella/status/1883753899255046301',
    verifiedVia: 'https://stratechery.com/2025/deepseek-faq/',
    quote: true,
    text: 'As AI gets more efficient and accessible, we will see its use skyrocket',
  },
  microsoft: {
    authorId: 'satya', date: '2025-01-29', kind: 'Earnings · excerpt',
    title: 'Microsoft FY2025 Q2 results',
    url: 'https://www.microsoft.com/en-us/investor/earnings/fy-2025-q2/press-release-webcast',
    quote: true,
    text: 'Already, our AI business has surpassed an annual revenue run rate of $13 billion, up 175% year-over-year.',
  },
  micron: {
    authorId: 'sanjay', date: '2025-03-20', kind: 'Earnings · excerpt',
    title: 'Micron fiscal Q2 2025 results',
    url: 'https://investors.micron.com/news/press-release/2025/Micron-Technology-Inc--Reports-Results-for-the-Second-Quarter-of-Fiscal-2025-03-20-2025/default.aspx',
    quote: true, text: 'data center revenue tripled from a year ago',
  },
  apple: {
    authorId: 'tim', date: '2025-01-30', kind: 'Earnings · excerpt',
    title: 'Apple fiscal Q1 2025 results',
    url: 'https://www.apple.com/newsroom/2025/01/apple-reports-first-quarter-results/',
    quote: true,
    text: 'Through the power of Apple silicon, we’re unlocking new possibilities for our users with Apple Intelligence',
  },
  amazon: {
    authorId: 'andy', date: '2025-04-10', kind: 'Shareholder letter · summary',
    title: '2024 Letter to Shareholders',
    url: 'https://www.aboutamazon.com/news/company-news/amazon-ceo-andy-jassy-2024-letter-to-shareholders',
    text: 'Inference will drive most future AI costs. Lowering those costs should unlock more applications and demand. Trainium is part of that bet; the infrastructure investment comes before the returns.',
  },
  meta: {
    authorId: 'mark', date: '2025-07-30', kind: 'Open letter · excerpt',
    title: 'Personal Superintelligence',
    url: 'https://www.meta.com/superintelligence/',
    quote: true, text: 'Meta’s vision is to bring personal superintelligence to everyone.',
  },
  amd: {
    authorId: 'lisa', date: '2025-06-12', kind: 'Event · summary',
    title: 'Advancing AI 2025',
    url: 'https://ir.amd.com/news-events/press-releases/detail/1255/amd-unveils-vision-for-an-open-ai-ecosystem-detailing-new-silicon-software-and-systems-at-advancing-ai-2025',
    text: 'AMD’s pitch goes beyond a faster accelerator: an open AI platform that connects chips, ROCm software and rack-scale systems. Adoption by real customers is central to that ambition.',
  },
  google: {
    authorId: 'sundar', date: '2025-05-20', kind: 'Keynote · summary',
    title: 'Google I/O 2025: From research to reality',
    url: 'https://blog.google/innovation-and-ai/technology/ai/io-2025-keynote/',
    text: 'AI Overviews reached 1.5 billion users. Google reports more searches for queries that show them, and is bringing AI Mode to everyone in the US. Its TPU infrastructure helps lower model costs.',
  },
};

const views = [
  { id: 'inference', tickers: ['NVDA', 'AI infrastructure'], origin: 'computex', title: 'Reasoning and AI agents will need more compute.', short: 'Agents need more compute.', watch: ['Paid inference', 'Compute per task'], counter: 'Efficiency could outpace the growth in paid demand.',
    readings: [
      ['jevons', 'A demand hypothesis', 'Nadella proposes a mechanism, not a measurement: cheaper intelligence could unlock tasks that were previously uneconomic. The key is whether spending on those new tasks outweighs the lower cost of existing ones. Until both sides are visible, more usage and more revenue remain separate claims.'],
      ['microsoft', 'A customer-side signal', 'The $13 billion annual revenue run rate moves the discussion beyond demonstrations into paid demand. The 175% growth figure is encouraging, but it says nothing by itself about the capital required to earn that revenue. This strengthens the monetization thesis; infrastructure returns still need their own evidence.'],
      ['computex', 'The scope expands', 'Huang expands the workload story from generating answers to reasoning and taking actions. That supports a broader use case for compute, but a supplier’s roadmap cannot tell us how much customers will absorb profitably. I would look for paid workloads catching up with the capacity being announced before treating the larger ambition as a realized market.'],
    ] },
  { id: 'valuation', tickers: ['NVDA', 'AI infrastructure'], origin: 'valuation', title: 'A great AI business can still be an expensive stock.', short: 'Great business ≠ cheap stock.', watch: ['Growth expectations', 'Long-term margins'], counter: 'Durable results above expectations could justify a richer valuation.',
    readings: [['deepseek', 'A challenge to the story', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['valuation', 'Separate price from progress', 'Damodaran’s point changes the valuation question, not just the growth forecast. If cheaper models move profits toward applications, a strong AI market could coexist with disappointing returns for some infrastructure owners. The thesis needs an explicit view on durable margins and value captured; market size alone cannot do that work.'], ['computex', 'A larger ambition', 'Huang expands the workload story from generating answers to reasoning and taking actions. That supports a broader use case for compute, but a supplier’s roadmap cannot tell us how much customers will absorb profitably. I would look for paid workloads catching up with the capacity being announced before treating the larger ambition as a realized market.']] },
  { id: 'platform', tickers: ['NVDA', 'AI infrastructure'], origin: 'rocm', title: 'NVIDIA’s moat extends into the software stack.', short: 'CUDA is the real moat.', watch: ['Software reliability', 'Production migrations'], counter: 'A credible open stack could reduce switching costs.',
    readings: [['rocm', 'Evidence of switching friction', 'The training tests make switching costs concrete: attractive hardware still required work to become dependable. That is useful evidence for a software moat because it concerns the customer’s operating burden, not a peak specification. A stronger challenge would be repeatable production migrations with less engineering effort.'], ['deepseek', 'Efficiency complicates the moat', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['amd', 'A direct competitive test', 'AMD is now making a full-system case, which directly addresses the software obstacle in this thesis. Its product reference specifies 288 GB of HBM3E per MI350X GPU, but more memory cannot by itself resolve deployment friction. I would upgrade confidence on repeatable customer workloads, not on the roadmap alone.']] },
  { id: 'efficiency', tickers: ['NVDA', 'MSFT', 'AI infrastructure'], origin: 'jevons', title: 'Cheaper AI could create much more demand.', short: 'Cheaper AI, more demand.', watch: ['Usage elasticity', 'Paid consumption'], counter: 'More requests may not offset lower spending per request.',
    readings: [['jevons', 'The starting claim', 'Nadella proposes a mechanism, not a measurement: cheaper intelligence could unlock tasks that were previously uneconomic. The key is whether spending on those new tasks outweighs the lower cost of existing ones. Until both sides are visible, more usage and more revenue remain separate claims.'], ['microsoft', 'A monetization signal', 'The $13 billion annual revenue run rate moves the discussion beyond demonstrations into paid demand. The 175% growth figure is encouraging, but it says nothing by itself about the capital required to earn that revenue. This strengthens the monetization thesis; infrastructure returns still need their own evidence.'], ['amazon', 'Another operator shares the logic', 'Jassy’s argument has a timing problem built into it: infrastructure is paid for before cheaper inference attracts enough new demand. Trainium could improve the cost base, but the payoff depends on workloads following those savings. Revenue and margin moving together would be much stronger evidence than a lower price per token.']] },
  { id: 'memory', tickers: ['MU', 'AI infrastructure'], origin: 'hbm', title: 'AI’s memory bottleneck can sustain HBM demand.', short: 'AI needs more memory.', watch: ['HBM bandwidth', 'Packaging capacity'], counter: 'Technical demand does not guarantee Micron’s market share or margins.',
    readings: [['memorywall', 'The physical constraint', 'Dylan’s warning belongs beside the memory-demand story, not outside it. A physical bottleneck can stimulate both spending on HBM and investment that eventually eases scarcity. I would separate a durable need for bandwidth from a durable shortage; the first does not guarantee the second.'], ['micron', 'Demand reaches the business', 'Tripled data-center revenue is a meaningful change in the business mix. It gives the memory-demand story a company-level signal, although the excerpt does not isolate HBM revenue or profit. The next question is whether that mix shift improves margins enough to offset the supply cycle.'], ['hbm', 'A broader demand base', 'This widens the demand base: custom accelerators face memory constraints too, so HBM’s role need not depend on GPU shipments alone. The technical thesis gets stronger. The investment question remains narrower: can the supplier expand qualified output without competing away the margin?']] },
  { id: 'supply', tickers: ['MU', 'AI infrastructure'], origin: 'memorywall', title: 'A memory breakthrough does not erase the cycle.', short: 'The cycle still matters.', watch: ['Supply additions', 'Blended margins'], counter: 'A richer HBM mix could cushion conventional memory weakness.',
    readings: [['memorywall', 'A supply-side caution', 'Dylan’s warning belongs beside the memory-demand story, not outside it. A physical bottleneck can stimulate both spending on HBM and investment that eventually eases scarcity. I would separate a durable need for bandwidth from a durable shortage; the first does not guarantee the second.'], ['micron', 'The company-level counterpoint', 'Tripled data-center revenue is a meaningful change in the business mix. It gives the memory-demand story a company-level signal, although the excerpt does not isolate HBM revenue or profit. The next question is whether that mix shift improves margins enough to offset the supply cycle.'], ['hbm', 'Keep scarcity and capacity together', 'This widens the demand base: custom accelerators face memory constraints too, so HBM’s role need not depend on GPU shipments alone. The technical thesis gets stronger. The investment question remains narrower: can the supplier expand qualified output without competing away the margin?']] },
  { id: 'mu-datacenter', tickers: ['MU'], origin: 'micron', title: 'Data centers are changing Micron’s revenue mix.', short: 'Data centers change the mix.', watch: ['Data-center mix', 'Gross margin'], counter: 'Revenue growth could arrive without durable margin gains.',
    readings: [['micron', 'A disclosed business change', 'Tripled data-center revenue is a meaningful change in the business mix. It gives the memory-demand story a company-level signal, although the excerpt does not isolate HBM revenue or profit. The next question is whether that mix shift improves margins enough to offset the supply cycle.'], ['hbm', 'A technical explanation', 'This widens the demand base: custom accelerators face memory constraints too, so HBM’s role need not depend on GPU shipments alone. The technical thesis gets stronger. The investment question remains narrower: can the supplier expand qualified output without competing away the margin?']] },
  { id: 'autonomy', tickers: ['TSLA'], origin: 'ark', title: 'Robotaxis could drive most of Tesla’s value.', short: 'Robotaxis drive the upside.', watch: ['Paid fleet scale', 'Operating margin'], counter: 'Delayed autonomy or weak economics would undermine ARK’s scenario.',
    readings: [['ark', 'The original scenario', 'Roughly 90% of modeled enterprise value comes from robotaxis, so this is primarily an autonomy scenario. Small changes in adoption, utilization or margin could move the outcome substantially. The model is useful as a map of what must go right; the headline target is not evidence that those conditions have arrived.'], ['tesla', 'Pressure on the existing business', 'Damodaran challenges the conventional EV business through competition and brand risk. That does not directly disprove autonomy, but it leaves less room for the existing franchise to carry the valuation if robotaxis take longer. I would keep the two earnings engines separate instead of using progress in one to dismiss weakness in the other.']] },
  { id: 'robotaxi', tickers: ['TSLA'], origin: 'ark', title: 'Robotaxi economics are the hinge in Tesla’s upside case.', short: 'Margins make the model.', watch: ['Paid utilization', 'Cost per mile'], counter: 'A large fleet with poor unit economics would fall short of the modeled upside.',
    readings: [['ark', 'Read the assumptions', 'Roughly 90% of modeled enterprise value comes from robotaxis, so this is primarily an autonomy scenario. Small changes in adoption, utilization or margin could move the outcome substantially. The model is useful as a map of what must go right; the headline target is not evidence that those conditions have arrived.'], ['tesla', 'Keep the businesses separate', 'Damodaran challenges the conventional EV business through competition and brand risk. That does not directly disprove autonomy, but it leaves less room for the existing franchise to carry the valuation if robotaxis take longer. I would keep the two earnings engines separate instead of using progress in one to dismiss weakness in the other.']] },
  { id: 'tesla-competition', tickers: ['TSLA'], origin: 'tesla', title: 'Competition and brand risk can weaken Tesla’s EV story.', short: 'The EV moat is under pressure.', watch: ['EV market share', 'Brand demand'], counter: 'Stronger product demand or autonomy profits could offset the EV risks.',
    readings: [['ark', 'A competing source of value', 'Roughly 90% of modeled enterprise value comes from robotaxis, so this is primarily an autonomy scenario. Small changes in adoption, utilization or margin could move the outcome substantially. The model is useful as a map of what must go right; the headline target is not evidence that those conditions have arrived.'], ['tesla', 'The growth story gets harder', 'Damodaran challenges the conventional EV business through competition and brand risk. That does not directly disprove autonomy, but it leaves less room for the existing franchise to carry the valuation if robotaxis take longer. I would keep the two earnings engines separate instead of using progress in one to dismiss weakness in the other.']] },
  { id: 'aapl-angle', tickers: ['AAPL'], origin: 'apple', title: 'Apple silicon can bring AI into everyday devices.', short: 'AI belongs on the device.', watch: ['Device AI adoption', 'Upgrade demand'], counter: 'Useful features may not accelerate replacement cycles.',
    readings: [['deepseek', 'Lower costs help the edge', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['apple', 'The product direction', 'Cook confirms a product direction: Apple is putting intelligence into the silicon-powered devices it already sells. That distribution is an advantage, but the statement contains no evidence of a faster replacement cycle. I would distinguish features that keep users satisfied from features that make them buy a new device sooner.']] },
  { id: 'aapl-edge', tickers: ['AAPL'], origin: 'deepseek', title: 'Efficient models could benefit Apple’s hardware.', short: 'Small models favor Apple.', watch: ['On-device inference', 'Hardware differentiation'], counter: 'Better models could be equally available on competing devices.',
    readings: [['deepseek', 'A hardware angle', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['apple', 'An aligned product strategy', 'Cook confirms a product direction: Apple is putting intelligence into the silicon-powered devices it already sells. That distribution is an advantage, but the statement contains no evidence of a faster replacement cycle. I would distinguish features that keep users satisfied from features that make them buy a new device sooner.']] },
  { id: 'aapl-distribution', tickers: ['AAPL'], origin: 'deepseek', title: 'Distribution could matter more than owning the best model.', short: 'Distribution beats model spend.', watch: ['Default AI access', 'Services engagement'], counter: 'A breakout assistant could bypass existing platforms.',
    readings: [['deepseek', 'A distribution advantage', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['apple', 'A route to the user', 'Cook confirms a product direction: Apple is putting intelligence into the silicon-powered devices it already sells. That distribution is an advantage, but the statement contains no evidence of a faster replacement cycle. I would distinguish features that keep users satisfied from features that make them buy a new device sooner.']] },
  { id: 'msft-angle', tickers: ['MSFT'], origin: 'microsoft', title: 'Microsoft’s AI demand is becoming a paid business.', short: 'AI is finding paying users.', watch: ['AI revenue', 'Infrastructure returns'], counter: 'Capital costs could grow faster than monetization.',
    readings: [['jevons', 'Demand could expand', 'Nadella proposes a mechanism, not a measurement: cheaper intelligence could unlock tasks that were previously uneconomic. The key is whether spending on those new tasks outweighs the lower cost of existing ones. Until both sides are visible, more usage and more revenue remain separate claims.'], ['microsoft', 'A disclosed revenue signal', 'The $13 billion annual revenue run rate moves the discussion beyond demonstrations into paid demand. The 175% growth figure is encouraging, but it says nothing by itself about the capital required to earn that revenue. This strengthens the monetization thesis; infrastructure returns still need their own evidence.'], ['google', 'Competition is scaling too', 'The 1.5 billion-user reach and reported increase in searches push back on the idea that AI answers must shrink search activity. That is a usage signal from Google, not a margin result. More queries only improve the business if monetization keeps pace with the cost of answering them.']] },
  { id: 'msft-models', tickers: ['MSFT'], origin: 'deepseek', title: 'Model competition can benefit Microsoft’s distribution.', short: 'Cheaper models help Azure.', watch: ['Model choice', 'Cloud consumption'], counter: 'Commoditization could also pressure the price Azure charges.',
    readings: [['deepseek', 'Less dependence on one model', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['microsoft', 'A business to measure', 'The $13 billion annual revenue run rate moves the discussion beyond demonstrations into paid demand. The 175% growth figure is encouraging, but it says nothing by itself about the capital required to earn that revenue. This strengthens the monetization thesis; infrastructure returns still need their own evidence.']] },
  { id: 'amzn-angle', tickers: ['AMZN'], origin: 'amazon', title: 'Lower inference costs could expand AWS demand.', short: 'Cheaper inference grows AWS.', watch: ['Inference consumption', 'Cloud margins'], counter: 'Lower prices may arrive before new demand offsets them.',
    readings: [['deepseek', 'More models to distribute', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['amazon', 'The operator’s bet', 'Jassy’s argument has a timing problem built into it: infrastructure is paid for before cheaper inference attracts enough new demand. Trainium could improve the cost base, but the payoff depends on workloads following those savings. Revenue and margin moving together would be much stronger evidence than a lower price per token.']] },
  { id: 'amzn-trainium', tickers: ['AMZN'], origin: 'amazon', title: 'Custom silicon could improve AWS’s AI economics.', short: 'Trainium changes the cost base.', watch: ['Trainium adoption', 'Cost per workload'], counter: 'Hardware savings could be offset by software migration costs.',
    readings: [['rocm', 'The software caution', 'The training tests make switching costs concrete: attractive hardware still required work to become dependable. That is useful evidence for a software moat because it concerns the customer’s operating burden, not a peak specification. A stronger challenge would be repeatable production migrations with less engineering effort.'], ['amazon', 'A vertically integrated bet', 'Jassy’s argument has a timing problem built into it: infrastructure is paid for before cheaper inference attracts enough new demand. Trainium could improve the cost base, but the payoff depends on workloads following those savings. Revenue and margin moving together would be much stronger evidence than a lower price per token.']] },
  { id: 'amzn-open', tickers: ['AMZN'], origin: 'deepseek', title: 'Open models could strengthen AWS as a neutral platform.', short: 'Open models help AWS.', watch: ['Model selection', 'Production workloads'], counter: 'Cloud customers may move workloads to a lower-cost competitor.',
    readings: [['deepseek', 'An infrastructure beneficiary', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['amazon', 'Demand still needs economics', 'Jassy’s argument has a timing problem built into it: infrastructure is paid for before cheaper inference attracts enough new demand. Trainium could improve the cost base, but the payoff depends on workloads following those savings. Revenue and margin moving together would be much stronger evidence than a lower price per token.']] },
  { id: 'googl-angle', tickers: ['GOOGL'], origin: 'google', title: 'AI answers could expand Google’s search usage.', short: 'AI makes people search more.', watch: ['Query growth', 'Revenue per query'], counter: 'More answers could cost more without generating enough revenue.',
    readings: [['deepseek', 'A disruption risk', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['google', 'A first-party usage signal', 'The 1.5 billion-user reach and reported increase in searches push back on the idea that AI answers must shrink search activity. That is a usage signal from Google, not a margin result. More queries only improve the business if monetization keeps pace with the cost of answering them.']] },
  { id: 'googl-risk', tickers: ['GOOGL'], origin: 'deepseek', title: 'Cheaper AI could weaken Google’s search advantage.', short: 'Search faces new substitutes.', watch: ['Search share', 'Assistant substitution'], counter: 'Google’s own AI distribution could preserve its user relationship.',
    readings: [['deepseek', 'A challenge to the incumbent', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['google', 'A direct counterpoint', 'The 1.5 billion-user reach and reported increase in searches push back on the idea that AI answers must shrink search activity. That is a usage signal from Google, not a margin result. More queries only improve the business if monetization keeps pace with the cost of answering them.']] },
  { id: 'googl-tpu', tickers: ['GOOGL'], origin: 'google', title: 'Google’s infrastructure could make AI cheaper to serve.', short: 'TPUs protect the cost edge.', watch: ['Serving cost', 'TPU utilization'], counter: 'Rival efficiency gains could narrow a hardware cost advantage.',
    readings: [['deepseek', 'Efficiency can travel', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['google', 'A full-stack cost claim', 'The 1.5 billion-user reach and reported increase in searches push back on the idea that AI answers must shrink search activity. That is a usage signal from Google, not a margin result. More queries only improve the business if monetization keeps pace with the cost of answering them.']] },
  { id: 'meta-angle', tickers: ['META'], origin: 'deepseek', title: 'Cheaper intelligence could benefit Meta’s existing business.', short: 'Cheap AI helps Meta’s apps.', watch: ['Recommendation efficiency', 'Infrastructure cost'], counter: 'More ambitious AI spending could outweigh efficiency savings.',
    readings: [['deepseek', 'An application-side beneficiary', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['meta', 'The ambition moves further out', 'The letter expands Meta’s ambition into a personal AI relationship. It gives the thesis a direction, not a demonstrated new business. The substantive change to look for is habitual use: does the assistant earn its own place in people’s day, beyond access through Meta’s existing apps?']] },
  { id: 'meta-personal', tickers: ['META'], origin: 'meta', title: 'Personal AI could become Meta’s next consumer platform.', short: 'Personal AI is the next platform.', watch: ['Assistant engagement', 'Consumer adoption'], counter: 'Users may not adopt a new assistant habit.',
    readings: [['deepseek', 'A more accessible input', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['meta', 'A new product ambition', 'The letter expands Meta’s ambition into a personal AI relationship. It gives the thesis a direction, not a demonstrated new business. The substantive change to look for is habitual use: does the assistant earn its own place in people’s day, beyond access through Meta’s existing apps?']] },
  { id: 'meta-glasses', tickers: ['META'], origin: 'meta', title: 'AI glasses could become a new computing interface.', short: 'Glasses could be the interface.', watch: ['Daily active use', 'Glasses adoption'], counter: 'Device appeal may not translate into habitual AI use.',
    readings: [['deepseek', 'Intelligence gets cheaper', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['meta', 'Context becomes part of the product', 'The letter expands Meta’s ambition into a personal AI relationship. It gives the thesis a direction, not a demonstrated new business. The substantive change to look for is habitual use: does the assistant earn its own place in people’s day, beyond access through Meta’s existing apps?']] },
  { id: 'amd-angle', tickers: ['AMD'], origin: 'rocm', title: 'Software readiness will decide AMD’s AI opportunity.', short: 'Software decides the win.', watch: ['ROCm reliability', 'Production deployments'], counter: 'Hardware advantages may not overcome switching friction.',
    readings: [['rocm', 'The adoption gap', 'The training tests make switching costs concrete: attractive hardware still required work to become dependable. That is useful evidence for a software moat because it concerns the customer’s operating burden, not a peak specification. A stronger challenge would be repeatable production migrations with less engineering effort.'], ['amd', 'A response to the gap', 'AMD is now making a full-system case, which directly addresses the software obstacle in this thesis. Its product reference specifies 288 GB of HBM3E per MI350X GPU, but more memory cannot by itself resolve deployment friction. I would upgrade confidence on repeatable customer workloads, not on the roadmap alone.']] },
  { id: 'amd-open', tickers: ['AMD'], origin: 'amd', title: 'An open AI stack could offer an alternative to NVIDIA.', short: 'Open systems can win share.', watch: ['System-level adoption', 'Partner deployments'], counter: 'An open ecosystem can still be harder to operate.',
    readings: [['rocm', 'The hurdle', 'The training tests make switching costs concrete: attractive hardware still required work to become dependable. That is useful evidence for a software moat because it concerns the customer’s operating burden, not a peak specification. A stronger challenge would be repeatable production migrations with less engineering effort.'], ['amd', 'A broader proposition', 'AMD is now making a full-system case, which directly addresses the software obstacle in this thesis. Its product reference specifies 288 GB of HBM3E per MI350X GPU, but more memory cannot by itself resolve deployment friction. I would upgrade confidence on repeatable customer workloads, not on the roadmap alone.']] },
  { id: 'amd-inference', tickers: ['AMD'], origin: 'deepseek', title: 'Efficient inference could create an opening for AMD.', short: 'Inference opens a new door.', watch: ['Inference deployments', 'Cost per token'], counter: 'NVIDIA’s mature tooling may remain the easier choice.',
    readings: [['rocm', 'Know which workload is tested', 'The training tests make switching costs concrete: attractive hardware still required work to become dependable. That is useful evidence for a software moat because it concerns the customer’s operating burden, not a peak specification. A stronger challenge would be repeatable production migrations with less engineering effort.'], ['deepseek', 'A different competitive surface', 'Thompson’s argument changes the allocation of value: capable models becoming cheaper can help applications and distribution while weakening assumptions about ever-rising model spend. Those outcomes can happen together. A larger AI market therefore does not lift every thesis equally; who keeps the savings becomes the important question.'], ['amd', 'A platform to test', 'AMD is now making a full-system case, which directly addresses the software obstacle in this thesis. Its product reference specifies 288 GB of HBM3E per MI350X GPU, but more memory cannot by itself resolve deployment friction. I would upgrade confidence on repeatable customer workloads, not on the roadmap alone.']] },
];

const statements = {
  inference: 'Reasoning models and AI agents could expand compute demand beyond training. The business case depends on customers paying for useful work, not simply running more tokens.',
  platform: 'NVIDIA’s advantage extends beyond chips into software that teams can reliably use. Better competing hardware will not erase that advantage until the software is ready for production.',
  efficiency: 'Cheaper AI could unlock enough new uses to increase total demand. More usage alone would not prove this view: total paid consumption needs to grow too.',
  memory: 'AI systems need more memory bandwidth as they scale, creating demand beyond GPU chips alone. That supports an HBM opportunity, but does not establish which supplier captures the profits.',
  autonomy: 'ARK’s Tesla upside scenario depends heavily on a profitable robotaxi business. The key question is whether autonomy can reach commercial scale with the economics assumed in the model.',
  'aapl-distribution': 'As capable models become cheaper, access to customers could matter more than owning the best model. Apple could benefit through its devices, provided a new assistant does not bypass that relationship.',
  'msft-angle': 'Microsoft’s disclosed AI revenue shows customers are already paying. Whether that demand earns an attractive return on the infrastructure buildout remains a separate question.',
  'amzn-angle': 'Lower inference costs could unlock more applications and increase demand for AWS. The infrastructure investment comes first; sustained customer spending has to justify it.',
  'googl-risk': 'Cheaper AI makes it easier to build alternatives to search. Google’s own AI distribution could defend its position, so displacement needs evidence in user behavior and monetization.',
  'meta-personal': 'Personal AI could give Meta a new consumer platform beyond its existing apps. The ambition still needs to become a habit people use, with a business model that can support the investment.',
  'amd-angle': 'AMD’s AI opportunity depends on a software stack that works reliably in production. Peak hardware specifications alone will not persuade customers to absorb the cost of switching.',
};

const dateLabel = date => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
const multimediaReadings = {
  inference: [['jensenPodcast', 'Agents multiply compute work', 'The new element is the number of steps behind a result: reasoning and teams of agents can turn one request into much more work. Huang’s HBM account also ties that demand to a physical supply chain. The open question is how much of the extra work customers will pay for; more internal activity is not automatically more useful output.', 'satyaPodcast'], ['mollickAgent', 'A practitioner’s workflow', 'This is more informative than another capability announcement: Mollick describes actual research work delegated to an agent. The catch is that supervision remains part of the workflow. The economic test is whether the work saved exceeds the time spent directing and checking it; one successful example supports usefulness, not market-wide demand.']],
  memory: [['jensenPodcast', 'A customer describes the memory transition', 'The new element is the number of steps behind a result: reasoning and teams of agents can turn one request into much more work. Huang’s HBM account also ties that demand to a physical supply chain. The open question is how much of the extra work customers will pay for; more internal activity is not automatically more useful output.', 'micron']],
  efficiency: [['satyaPodcast', 'From cheaper intelligence to useful work', 'Nadella puts a harder test on the demand thesis: customers need to earn something from the intelligence they buy. Microsoft’s disclosed AI revenue gives one early commercial signal. Sustained growth would be more persuasive if it comes from recurring productive work rather than customers simply trying more tokens.', 'microsoft'], ['swyxPricing', 'Price pressure from independent models', 'The chart makes price competition tangible. If comparable reasoning gets cheaper, buyers can do more with the same budget; suppliers only gain revenue if usage expands faster than prices fall. I would strengthen the accessibility claim on this evidence, while leaving the total-spending claim unresolved.'], ['tinyZero', 'A smaller experiment becomes accessible', 'A small experiment becoming affordable is a real change in who can participate. But the sub-$30 figure is for a narrow task on an existing base model, not a frontier training program. This supports cheaper experimentation; using it to declare the infrastructure buildout unnecessary would skip most of the cost stack.']],
  'msft-angle': [['satyaPodcast', 'The customer-side test', 'Nadella puts a harder test on the demand thesis: customers need to earn something from the intelligence they buy. Microsoft’s disclosed AI revenue gives one early commercial signal. Sustained growth would be more persuasive if it comes from recurring productive work rather than customers simply trying more tokens.', 'microsoft'], ['mollickAgent', 'Work gets done with oversight', 'This is more informative than another capability announcement: Mollick describes actual research work delegated to an agent. The catch is that supervision remains part of the workflow. The economic test is whether the work saved exceeds the time spent directing and checking it; one successful example supports usefulness, not market-wide demand.']],
  'meta-personal': [['markPodcast', 'Personalization takes time', 'Zuckerberg is describing a potential retention loop: shared history makes an assistant more useful, which gives people a reason to return. That could matter more than winning a launch-day model comparison. The thesis would gain substance from repeat use and accumulated context; the interview explains the mechanism, not its measured strength.']],
  'meta-angle': [['markPodcast', 'A product feedback loop', 'Zuckerberg is describing a potential retention loop: shared history makes an assistant more useful, which gives people a reason to return. That could matter more than winning a launch-day model comparison. The thesis would gain substance from repeat use and accumulated context; the interview explains the mechanism, not its measured strength.']],
};
for (const view of views) view.readings.push(...(multimediaReadings[view.id] || []));
for (const view of views.filter(view => ['efficiency', 'msft-models', 'inference'].includes(view.id))) {
  view.readings.push(['ngApplications', 'Competition helps builders', 'Ng’s argument is a change in who might capture the value. Cheaper models lower the cost of building applications; that can help a distributor without helping every infrastructure supplier equally. The demand thesis becomes stronger only if those new applications generate enough paid work to offset the lower price per task.']);
}
views.find(view => view.id === 'efficiency').readings.push(['karpathyEfficiency', 'Capability with less compute', 'The reported training budget challenges the assumption that every capability gain requires a much larger compute bill. It does not measure the full research cost, and training economics do not settle inference demand. I would split the thesis here: pressure on cost per model, with an open question about how much usage that releases.']);
const kolReadings = {
  memory: [['jukanHbmPricing', 'What supports HBM pricing', 'The useful distinction here is between HBM scarcity and HBM pricing power. In the Q&A Jukan relays, packaging and qualification help explain why prices may behave differently from conventional DRAM. That strengthens the case for differentiated products; it still leaves open which supplier keeps the profit after those extra costs.'], ['jukanHbmSupply', 'Supply responds to demand', 'This puts a supply response next to the demand story. Samsung’s stated HBM4 expansion could eventually relieve the bottleneck that makes HBM attractive today. I would treat delivered, qualified capacity as the turning point; a capacity target alone does not tell us when scarcity ends.']],
  supply: [['jukanHbmSupply', 'The capacity response', 'This puts a supply response next to the demand story. Samsung’s stated HBM4 expansion could eventually relieve the bottleneck that makes HBM attractive today. I would treat delivered, qualified capacity as the turning point; a capacity target alone does not tell us when scarcity ends.']],
  'meta-personal': [['rihardConsumer', 'The consumer relationship', 'This shifts the argument from having a capable model to owning a recurring relationship with the user. If the interviewee is right, Meta’s distribution matters because it can generate feedback, not simply because it reaches many people. It is a useful mechanism for the thesis, but an employee’s view adds no evidence yet that people keep returning.']],
  'msft-models': [['rihardHarness', 'Integration as a differentiator', 'There is a tension worth following: better models may get cheaper while the application around them becomes more valuable. Outcome pricing could let a distributor capture some of that value, but it also puts the cost of retries and failures on the seller. Jarc’s interview suggests that direction; it does not establish that the economics already work.']],
  efficiency: [['rihardHarness', 'Buyers care about outcomes', 'There is a tension worth following: better models may get cheaper while the application around them becomes more valuable. Outcome pricing could let a distributor capture some of that value, but it also puts the cost of retries and failures on the seller. Jarc’s interview suggests that direction; it does not establish that the economics already work.']],
  inference: [['ophirCompute', 'Demand around the accelerator', 'Gottlieb broadens the opportunity beyond the accelerator: agents also need CPUs, storage and coordination. That gives AMD more ways to participate, but it raises the integration burden too. I would put more weight on customers running dependable workloads than on commitments; this thesis gets stronger when the whole system works in production.'], ['ophirConcentration', 'Who pays for the demand?', 'This is a meaningful revision in the author’s confidence, not a new revenue disclosure. If a few model companies account for much of incremental cloud demand, apparently diverse infrastructure bets may depend on the same buyers. The thesis now needs a second test alongside growth: how resilient is that demand if one large customer slows spending?']],
  'amd-angle': [['ophirCompute', 'From commitments to production', 'Gottlieb broadens the opportunity beyond the accelerator: agents also need CPUs, storage and coordination. That gives AMD more ways to participate, but it raises the integration burden too. I would put more weight on customers running dependable workloads than on commitments; this thesis gets stronger when the whole system works in production.']],
  'amzn-angle': [['ophirConcentration', 'Concentration behind cloud growth', 'This is a meaningful revision in the author’s confidence, not a new revenue disclosure. If a few model companies account for much of incremental cloud demand, apparently diverse infrastructure bets may depend on the same buyers. The thesis now needs a second test alongside growth: how resilient is that demand if one large customer slows spending?']],
  autonomy: [['garyAutonomy', 'Commercial scale and competition', 'Black separates confidence in the technology from confidence in the profits. That distinction matters for ARK’s scenario, where robotaxis carry roughly 90% of projected enterprise value. Competition could reduce the earnings Tesla retains even if autonomy works. The next persuasive evidence would be repeat paid use with viable operating costs.'], ['garyDistribution', 'Reaching the next customer', 'Black points to a missing link in the thesis: a technical lead only creates a valuable service if people choose to use it. That would make customer acquisition and repeat rides part of the utilization story, alongside fleet size. His post raises the commercial question; it adds no booking evidence yet. I would not mark adoption as proven on this update.']],
  robotaxi: [['garyAutonomy', 'When does the service earn?', 'Black separates confidence in the technology from confidence in the profits. That distinction matters for ARK’s scenario, where robotaxis carry roughly 90% of projected enterprise value. Competition could reduce the earnings Tesla retains even if autonomy works. The next persuasive evidence would be repeat paid use with viable operating costs.']],
};
for (const view of views) view.readings.push(...(kolReadings[view.id] || []));
export const THESES = views.map(view => {
  const source = SOURCES[view.origin], author = AUTHORS[source.authorId];
  const latest = [...view.readings].sort((a, b) => SOURCES[b[0]].date.localeCompare(SOURCES[a[0]].date))[0];
  return {
    id: view.id, title: view.title, pickerTitle: view.short, statement: statements[view.id] || view.title, premise: statements[view.id] || view.title,
    author: author.name, shortAuthor: author.short, authorNote: author.publication + ' · public-source angle',
    initials: author.name.split(' ').map(part => part[0]).join(''), avatarUrl: author.avatarUrl,
    source: { ...source, date: dateLabel(source.date), note: 'Alva’s summary and monitoring angle, based on this historical source. No endorsement or updated investment call is implied.' },
    originSourceId: view.origin, tickers: view.tickers, direction: 'Public view',
    watching: view.watch, counter: view.counter,
    checkpoint: 'Look for new disclosures on ' + view.watch.join(' and ').toLowerCase() + '.',
    baseline: 'Historical evidence, read by Alva. This is not a live assessment or a revision issued by the source author.',
    status: latest[2], evidence: view.readings.map(([id, type, text]) => ({ name: SOURCES[id].title, type, text })),
    update: { title: latest[1], body: SOURCES[latest[0]].text, impact: latest[2], label: 'Alva reading', time: dateLabel(SOURCES[latest[0]].date) },
  };
});
// Inline commentary is reserved for a useful distinction, changed assumption,
// or additional evidence; routine source updates stand on their own.
const inlineInsightSources = new Set(['swyxPricing', 'jensenPodcast', 'garyAutonomy', 'ophirConcentration', 'jukanHbmPricing', 'mollickAgent', 'amd', 'satyaPodcast', 'valuation', 'tinyZero', 'rocm', 'karpathyEfficiency']);
export const UPDATES = views.flatMap(view => view.readings.map(([sourceId, title, impact, takeEvidenceId]) => {
  const source = SOURCES[sourceId], author = AUTHORS[source.authorId];
  return {
    id: view.id + '-' + sourceId, thesisId: view.id, sourceId, source,
    order: Date.parse(source.date), time: dateLabel(source.date), title, impact, inlineInsight: inlineInsightSources.has(sourceId),
    takeEvidenceId: takeEvidenceId || (sourceId === 'amd' ? 'amdPlatform' : sourceId === 'garyAutonomy' ? 'ark' : undefined),
    speaker: author.name, avatarUrl: author.avatarUrl, initials: author.name.split(' ').map(part => part[0]).join(''), kind: author.simulatedMember ? 'human' : 'public',
    channel: author.publication + ' · ' + source.kind,
    body: source.text, post: source.text, action: 'Ask Alva',
  };
}));

// Agent replies are scripted; referenced human posts retain their public provenance.
export const DISCUSSION_POSTS = [
  { id: 'memory-evidence', thesisId: 'memory', speaker: 'Alva', initials: 'a', time: 'Aug 14, 2025', order: Date.parse('2025-08-14'),
    post: 'Micron’s data-center revenue tripled, giving the bandwidth-demand thesis a business signal. It does not resolve Dylan’s supply-cycle concern: competitors can respond to the same demand. I would separate revenue mix from pricing power until the evidence shows what happens to HBM margins as capacity arrives.', kind: 'agent', evidenceId: 'micron', evidenceType: 'Company Feed', replyTo: 'memory-memorywall' },
  { id: 'inference-evidence', thesisId: 'inference', speaker: 'Alva', initials: 'a', time: 'May 20, 2025', order: Date.parse('2025-05-20'),
    post: 'Microsoft’s disclosed $13 billion AI revenue run rate and 175% growth make paid demand harder to dismiss. The remaining gap is the return on the capacity built to serve it. I would strengthen the demand side of this thesis, while keeping the capital-efficiency question open.', kind: 'agent', evidenceId: 'microsoft', evidenceType: 'Anomaly · Demo' },
];

export const RELATED_THESES = { memory: ['supply', 'mu-datacenter'], inference: ['efficiency'], efficiency: ['msft-models'], autonomy: ['robotaxi'] };

// These monitoring judgments add an interpretation beyond the source author's statement.
const curatedIds = new Set(['valuation', 'supply', 'robotaxi', 'aapl-edge', 'aapl-distribution', 'msft-models', 'amzn-open', 'googl-risk', 'meta-angle', 'amd-inference']);
for (const thesis of THESES) {
  thesis.curated = curatedIds.has(thesis.id);
  if (thesis.curated) Object.assign(thesis, { author: 'Alva', shortAuthor: 'Alva', initials: 'a', avatarUrl: undefined, authorNote: 'Curated thesis' });
}
export const IDEA_EXAMPLES = [
  'I think inference can keep NVIDIA growing. Watch revenue conversion over the next two quarters.',
  'HBM could make Micron more resilient. Watch margins, not just shipment growth.',
];
