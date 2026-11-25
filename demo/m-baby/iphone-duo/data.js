/* Demo data, copy taken from the Figma Duo table frames. Accounts that are
   not public figures (Leaderboard, Maya Reynolds, YGGYLL) use a neutral
   avatar placeholder; their copy is the sample copy from Figma. */
window.DUO_DATA = (function () {
  const img = n => 'assets/img/' + n;
  const people = {
    gavin:   { name: 'Gavin Baker', role: 'Managing Partner & CIO, Atreides', avatar: img('reference-gavin-baker.jpg') },
    satya:   { name: 'Satya Nadella', role: 'Chairman & CEO, Microsoft', avatar: img('source-satya.png') },
    chamath: { name: 'Chamath Palihapitiya', role: 'Founder & CEO, Social Capital', handle: '@chamath', avatar: img('social-chamath.png'), bot: true },
    tomlee:  { name: 'Tom Lee', role: 'Co-Founder and Head of Research, Fundstrat', avatar: img('reference-tom-lee.png') },
    maya:    { name: 'Maya Reynolds', handle: '@maya', avatar: img('reference-gavin-baker.jpg'), pro: true, joined: 'Joined Mar 4, 2026', followers: '2.4K', following: '86',
               bio: 'Equity research on US semis and hyperscalers. I publish when the evidence changes.',
               socials: [['x', '@mayareynolds'], ['telegram', '@MayaResearch']] },
    sam:     { name: 'Sam Altman', role: 'CEO, OpenAI' },
    warren:  { name: 'Warren Buffett', role: 'Chairman & CEO, Berkshire Hathaway' },
    elon:    { name: 'Elon Musk', role: 'CEO, Tesla and SpaceX' },
    mickie:  { name: 'Mickie', handle: '@mickie', avatar: img('lb-avatar-mickie.png') },
    harryz:  { name: 'harryz', handle: '@harryz' },
    rosy:    { name: 'rosy_a', handle: '@rosy_a', avatar: img('lb-avatar-rosy.png') },
    scarlett: { name: 'scarlett o’hara · copper & mining research', handle: '@scarlett' },
    dawg:    { name: 'The Roaring Dawg', handle: '@roaringdawg' },
    reny:    { name: 'reny6', handle: '@reny6' },
    passenger: { name: 'The PassengeR', handle: '@passenger' },
    jin:     { name: 'jin0729', handle: '@jin0729' },
    hnds:    { name: 'hndsnhuang', handle: '@hndsnhuang' },
    deltaq:  { name: 'deltaq', handle: '@deltaq' },
    me:      { name: 'YGGYLL', handle: '@yggyll', avatar: img('avatar-me.png'), pro: true, credits: '1,240', joined: 'Joined Dec 23, 2025', followers: '1.2K', following: '128',
               bio: 'Tracking momentum, breakouts and asymmetric risk across US tech and mid-cap alts.', socials: [['telegram', '@YGGYLLSignals']] },
  };
  const logo = {
    GOOGL: img('feed-logo-goog.svg'), AMZN: img('filter-logo-amzn.svg'), MSFT: img('filter-logo-msft.svg'),
    NVDA: img('lb-logo-nvda.png'), SMH: img('lb-logo-smh.png'), CRWV: img('lb-logo-crwv.png'), TSLA: img('filter-logo-tsla.svg'), TSM: img('feed-logo-tsm.png'),
  };
  const chart = {
    GOOGL: img('feed-real-googl.png'), AMZN: img('feed-real-amzn.png'), MSFT: img('feed-real-msft.png'),
    NVDA: img('feed-real-nvda.png'), SPY: img('reference-chart-spy.png'),
  };
  const SIG_GAVIN = [
    { who: 'SemiAnalysis', role: 'Semiconductor & AI research', avatar: img('social-semianalysis.png'), time: '12 Aug, 07:00',
      quote: 'SemiAnalysis reports TPUv8i is in internal software bring-up, with work beginning on the public software stack.', link: 'x.com',
      stance: 'Mixed', take: 'TPU commercialization could support the infrastructure thesis; adoption and returns remain unproven.' },
    { who: 'Matt Bryson', role: 'Managing Director, Equity Research · Wedbush', avatar: img('social-matt-bryson.png'), time: '12 Aug, 03:00',
      quote: 'Matt Bryson, Wedbush analyst, sees an opportunity for Marvell and TSMC as Microsoft prepares Maia 300.', link: 'tradingview.com',
      take: 'Custom accelerators may lower compute costs; an unveiling is not evidence of deployment or returns.' },
    { who: 'Riot Platforms', role: 'Digital infrastructure company', avatar: img('social-riot.png'), time: '11 Aug, 23:00',
      quote: 'Riot Platforms announced a $9.1 billion compute supply deal; a source identified the customer as Anthropic.', link: 'tradingview.com',
      take: 'The deal signals compute demand, but does not establish that cheaper models caused it.' },
  ];
  const AZURE = 'Azure surpassed $75 billion in annual revenue, up 34%. Microsoft added more than two gigawatts of datacenter capacity over the previous 12 months and now had over 400 datacenters across 70 regions.';
  const theses = {
    gavin: { author: 'gavin', date: 'Jul 13', topics: ['Chips', 'Hyperscaler'], ret: '+12.4%', since: '24 Sep',
      chartPts: [[0, 0.86], [0.17, 0.78], [0.32, 0.6], [0.49, 0.58], [0.64, 0.42], [0.81, 0.2], [1, 0]], dots: [0.16, 0.31, 0.48, 0.63], latestDot: 0.8,
      tickers: [['GOOGL', 'down'], ['AMZN', 'up'], ['MSFT', 'up']], detailTickers: [['GOOGL', 'up'], ['AMZN', 'up'], ['MSFT', 'up']],
      body: [
        'Baker frames this as a possible shift, not an outcome already visible. If lower-priced open or closed models take share from frontier labs with high inference margins, customers could get more intelligence for each dollar and increase their token usage.',
        'Under that scenario, part of the profit pool could move from model providers to AI infrastructure. He sees low delivery cost per token as the infrastructure advantage, while token efficiency would matter most at the model layer.',
        'He links this argument to Jensen Huang’s support for open source and to vertically integrated platforms. These are parts of Baker’s investment thesis, not evidence that the redistribution has already occurred.',
        'His caveat is central: inexpensive tokens may represent much of current usage, while the most capable models still capture most economic value. Whether greater adoption changes that balance remains to be seen.',
      ], refs: '[1]', charts: ['GOOGL', 'AMZN', 'MSFT'], saves: 68, history: true, signals: SIG_GAVIN },
    satya: { author: 'satya', date: '1h ago', topics: ['Hyperscaler', 'Neocloud'], ret: '+12.4%', since: '2 Oct',
      chartPts: [[0, 0.8], [0.3, 0.7], [0.55, 0.5], [0.8, 0.35], [1, 0.05]],
      tickers: [['MSFT', 'down']], body: [AZURE], refs: '[1]', charts: ['MSFT'], saves: 41 },
    tomlee: { author: 'tomlee', date: 'Updated 11 Sept', topics: ['Chips'], ret: '+6.8%', since: '11 Sept',
      chartPts: [[0, 0.85], [0.25, 0.7], [0.5, 0.6], [0.75, 0.35], [1, 0.1]],
      tickers: [['SPY', 'up']], body: ['The S&P 500 remains set for another near-term rally. The latest setup points to a substantial September rally because bearish positioning and a potentially benign inflation reading leave room for a positive surprise.'], refs: '[1][2][3][4]', charts: ['SPY'], saves: 112 },
    mickie1: { author: 'mickie', date: 'Nov 21', title: 'Nvidia Could Be Cisco 2000: Great Business, Poor Stock', tickers: [['NVDA', 'down']], lb: '+17.8%',
      body: [
        "Nvidia's business is not the problem. Data-center revenue, gross margin and the CUDA software moat all look stronger than Cisco's did in 2000.",
        'The problem is what the stock already prices in. Cisco kept growing after 2000, yet its shares took more than two decades to revisit the peak, because expectations had run far ahead of earnings.',
        "I'm watching hyperscaler capex guidance. Once spending growth slows, the multiple compresses even if revenue keeps rising. Underweight NVDA until valuation resets.",
      ], charts: [], saves: 23 },
    harryz1: { author: 'harryz', date: 'Nov 20', title: 'Semis face near-term multiple compression despite strong demand', tickers: [['SMH', 'down']], lb: '+11.9%',
      body: ['Demand is not the question: order books at the leading foundry and memory makers are full into next year. The question is how much of that is already in the multiple.'], charts: [], saves: 12 },
    rosy1: { author: 'rosy', date: 'Nov 19', title: 'TSLA: bearish in the short term', tickers: [['TSLA', 'down']], lb: '+11.7%',
      body: ['Deliveries guidance leaves little room for error this quarter, and the robotaxi narrative is carrying more of the valuation than the auto business.'], charts: [], saves: 9 },
    mickie2: { author: 'mickie', date: 'Nov 17', title: 'NVDA Demand Cracks First at the Neoclouds', tickers: [['NVDA', 'down'], ['CRWV', 'down']], lb: '+11.0%',
      body: ['If GPU demand softens, it will show first in neocloud rental pricing, not in hyperscaler capex. Spot rates are the early signal to watch.'], charts: [], saves: 17 },
    scarlett1: { author: 'scarlett', date: 'Nov 16', title: 'Copper’s long bear market is starting: $15,000 is the top, and miners, smelters and equipment makers will follow it lower through 2027', tickers: [['SCCO', 'down'], ['COPPER', 'down']], more: 6, lb: '+10.5%',
      body: ['Supply is catching up with the electrification story faster than demand. I expect copper to roll over from here and take the producers with it.'], charts: [], saves: 8 },
    dawg1: { author: 'dawg', date: 'Nov 15', title: 'The bounce may be a dead cat bounce', tickers: [['QQQ', 'down']], lb: '+8.7%', body: ['Breadth under the rally is thin and volume is falling. I would not chase this move.'], charts: [], saves: 5 },
    reny1: { author: 'reny', date: 'Nov 15', title: 'Gold: bearish in the short term', tickers: [['GLD', 'down']], lb: '+8.6%', body: ['Positioning is crowded after the run and real yields are turning up. Expect a pullback before the next leg.'], charts: [], saves: 4 },
    passenger1: { author: 'passenger', date: 'Nov 14', title: 'Avoid AI power trades such as GEV and CAT', tickers: [['CAT', 'down'], ['GEV', 'down']], lb: '+8.0%', body: ['The power build-out is real, but these names already price in years of orders.'], charts: [], saves: 6 },
    jin1: { author: 'jin', date: 'Nov 13', title: 'T1 Energy: order growth doesn\'t mean 2027 profits', tickers: [['TE', 'down']], lb: '+6.9%', body: ['Bookings are up, but margins on the new contracts are thin and capex is front-loaded.'], charts: [], saves: 3 },
    hnds1: { author: 'hnds', date: 'Nov 12', title: 'Intel: Near-Term Bearish, Long-Term Bullish', tickers: [['INTC', 'down']], lb: '+6.2%', body: ['Foundry losses weigh on the next few quarters; the turnaround case is a 2027 story.'], charts: [], saves: 7 },
    maya1: { author: 'maya', date: '1h ago', ret: '+12.4%', since: '2 Oct', chartPts: [[0, 0.8], [0.3, 0.7], [0.55, 0.5], [0.8, 0.35], [1, 0.05]],
      tickers: [['MSFT', 'down']], body: [AZURE], refs: '[1]', charts: ['MSFT'], saves: 32 },
    me1: { author: 'me', date: '1h ago', private: true, newUpdate: true, ret: '+12.4%', since: '2 Oct', chartPts: [[0, 0.8], [0.3, 0.7], [0.55, 0.5], [0.8, 0.35], [1, 0.05]],
      tickers: [['MSFT', null], ['AMZN', null], ['MSFT', null]], body: [AZURE], refs: '[1]', charts: ['MSFT'], saves: 0 },
  };
  /* All updates (Figma 16511:126971 · Thesis Detail / All updates timeline). The
     table uses this one sample history for every thesis it opens. */
  const updates = {
    range: '1 Nov – Now', ret: '+3.5%', since: '24 Sep',
    list: [
      { date: '1 Nov, 16:45', latest: true, body: ['AMD is approaching its summer high as more buyers join the advance.', 'The stock has broken higher after its last pullback stopped above the previous low. Rising trading volume makes the recovery more convincing.'], ref: 'link' },
      { date: '24 Oct, 10:02', body: ['Momentum stretched after the run; added on the dip into the 20-day instead of chasing. Target unchanged.'] },
      { date: '17 Oct, 21:40', body: ['Gave back part of the move after the earnings gap. Thesis unchanged; trimming conviction until volume confirms.'] },
      { date: '9 Oct, 08:12', body: ['Pullback held the breakout level. Keeping the long; the retest on lighter volume reads as digestion, not distribution. Next check is whether buyers defend the 200-day.'] },
      { date: '2 Oct, 14:05', body: ['First breakout attempt failed to hold. Cutting size and waiting for a retest of the range top before adding back.'] },
      { date: '24 Sep, 09:30', body: ['Starting a long: the stock is reclaiming its range high with improving breadth across semis.'], last: true },
    ],
  };
  return {
    people, logo, chart, theses, updates,
    feed: ['gavin', 'people', 'satya', 'tomlee', 'mickie1', 'harryz1', 'mickie2', 'rosy1', 'scarlett1', 'maya1', 'passenger1', 'dawg1', 'hnds1', 'reny1', 'jin1'],
    topics: ['All', 'Chips', 'Memory', 'Hyperscaler', 'Neocloud', 'Enterprise AI', 'Agent Infra', 'Consumer AI', 'Space', 'Interconnect', 'Power', 'Crypto'],
    leaderboard: ['mickie1', 'harryz1', 'rosy1', 'mickie2', 'scarlett1', 'dawg1', 'reny1', 'passenger1', 'jin1', 'hnds1'],
    trending: [
      ['NVDA', 'NVIDIA Corporation', '223.67 USD', '-0.87%', 'US Stock'],
      ['TSLA', 'Tesla, Inc.', '367.81 USD', '-0.08%', 'US Stock'],
      ['MSFT', 'Microsoft Corporation', '491.65 USD', '-0.44%', 'US Stock'],
      ['GOOGL', 'Alphabet Inc.', '330.65 USD', '-2.28%', 'US Stock'],
      ['AMZN', 'Amazon.com, Inc.', '252.40 USD', '-1.78%', 'US Stock'],
      ['META', 'Meta Platforms, Inc.', '718.2 USD', '-0.4%', 'US Stock'],
      ['9988.HK', 'Alibaba Group', '158.30 HKD', '-1.05%', 'Non-US Stock'],
      ['BTC', 'Bitcoin', '91,204 USD', '-0.62%', 'Binance Spot'],
      ['HYPE', 'Hyperliquid', '36.12 USD', '-2.10%', 'Hyperliquid Spot'],
    ],
    tlogo: { NVDA: img('lb-logo-nvda.png'), GOOGL: img('tr-logo-googl.png'), META: img('tr-logo-meta.png') },
    peopleToFollow: ['gavin', 'satya', 'chamath', 'sam', 'warren', 'elon'],
    profileTheses: { maya: ['maya1'], me: ['me1'], gavin: ['gavin'], satya: ['satya'], tomlee: ['tomlee'], mickie: ['mickie1', 'mickie2'], harryz: ['harryz1'], rosy: ['rosy1'], scarlett: ['scarlett1'], chamath: [] },
    greeting: ['Hey, I’m Alva, your AI investing agent.', 'Ask me for market research, or set up live automations to watch your portfolio, tickers, and market voices. Pick what you want me to help with first.'],
  };
})();
