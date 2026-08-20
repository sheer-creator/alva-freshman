/* ========== company.js — mobile Market / Company detail ==========
 * Mirrors the production markets/[ticker] information architecture while
 * keeping the Freshman demo deterministic and entirely client-side.
 */
import { ENTITIES, ITEMS, SOURCES, itemSources } from './data.js?v=__ALVA_MVP_ASSET_VERSION__';
import { entityAv, srcAvatar, streamCard } from './cards.js?v=__ALVA_MVP_ASSET_VERSION__';
import { renderMarkdown } from './markdown.js?v=__ALVA_MVP_ASSET_VERSION__';
import { store, I } from './state.js?v=__ALVA_MVP_ASSET_VERSION__';

export const COMPANY_TABS = [
  ['overview', 'Overview'],
  ['narratives', 'Narratives'],
  ['anomalies', 'Anomalies'],
  ['news', 'News'],
  ['smart', 'Smart Money'],
  ['earnings', 'Earnings'],
  ['peers', 'Peers'],
];

const STOCK_PROFILES = {
  NVDA: { exchange: 'NASDAQ', industry: 'Semiconductors', driver: 'Blackwell demand is broadening from training into inference and sovereign AI.', debate: 'Whether supply-led growth can persist once rack availability normalizes.', risk: 'Gross-margin compression from the product transition and power-constrained deployments.', metric: 'Data center revenue', actual: '$41.1B', estimate: '$39.8B', eps: '$1.05', epsEst: '$1.01', next: 'Aug 27, 2026', peers: ['AMD', 'TSM', 'SMCI'] },
  TSLA: { exchange: 'NASDAQ', industry: 'Automobiles', driver: 'Robotaxi milestones and energy-storage growth are carrying more of the valuation debate.', debate: 'Whether autonomy moves from demonstration to a repeatable commercial service.', risk: 'Core auto margins remain exposed to incentives, mix and factory utilization.', metric: 'Automotive gross margin', actual: '18.4%', estimate: '17.7%', eps: '$0.52', epsEst: '$0.48', next: 'Oct 21, 2026', peers: ['AAPL', 'META', 'AMZN'] },
  META: { exchange: 'NASDAQ', industry: 'Interactive Media', driver: 'AI-ranked inventory is improving engagement while ad pricing remains resilient.', debate: 'Whether infrastructure spending converts into durable revenue growth before depreciation accelerates.', risk: 'Capex intensity and regulatory constraints on data use.', metric: 'Ad impressions growth', actual: '13%', estimate: '11%', eps: '$7.42', epsEst: '$6.88', next: 'Oct 28, 2026', peers: ['GOOGL', 'AMZN', 'MSFT'] },
  AMD: { exchange: 'NASDAQ', industry: 'Semiconductors', driver: 'MI-series adoption is expanding from evaluation clusters into production inference.', debate: 'How quickly software maturity can close the utilization gap with the incumbent stack.', risk: 'Customer concentration and a slower-than-modeled accelerator ramp.', metric: 'Data center revenue', actual: '$4.9B', estimate: '$4.5B', eps: '$1.26', epsEst: '$1.18', next: 'Nov 3, 2026', peers: ['NVDA', 'TSM', 'SMCI'] },
  MU: { exchange: 'NASDAQ', industry: 'Memory Semiconductors', driver: 'HBM allocation and disciplined DRAM supply are extending the up-cycle.', debate: 'Whether tight HBM conditions can offset normalization in conventional memory.', risk: 'A faster capacity response or weaker server demand.', metric: 'Data center revenue', actual: '$5.2B', estimate: '$4.8B', eps: '$2.74', epsEst: '$2.51', next: 'Sep 23, 2026', peers: ['NVDA', 'AMD', 'TSM'] },
  MSFT: { exchange: 'NASDAQ', industry: 'Software Infrastructure', driver: 'Azure growth is reaccelerating as AI workloads move from pilots into production.', debate: 'Whether Copilot monetization can outpace the cost of AI infrastructure.', risk: 'Capacity constraints, depreciation and slower seat expansion.', metric: 'Azure growth', actual: '39%', estimate: '37%', eps: '$3.72', epsEst: '$3.55', next: 'Oct 27, 2026', peers: ['AMZN', 'GOOGL', 'META'] },
  GOOGL: { exchange: 'NASDAQ', industry: 'Internet Content', driver: 'Search monetization remains durable while Cloud benefits from model and TPU demand.', debate: 'Whether generative answers expand query value without structurally diluting paid clicks.', risk: 'Distribution remedies and elevated AI serving costs.', metric: 'Google Cloud growth', actual: '31%', estimate: '28%', eps: '$2.44', epsEst: '$2.29', next: 'Oct 20, 2026', peers: ['META', 'MSFT', 'AMZN'] },
  AMZN: { exchange: 'NASDAQ', industry: 'Internet Retail', driver: 'AWS growth and retail efficiency are improving the mix of incremental profit.', debate: 'Whether new AI capacity turns backlog into acceleration fast enough to justify capex.', risk: 'Power availability and renewed fulfillment investment.', metric: 'AWS revenue growth', actual: '22%', estimate: '20%', eps: '$1.82', epsEst: '$1.64', next: 'Oct 29, 2026', peers: ['MSFT', 'GOOGL', 'META'] },
  AAPL: { exchange: 'NASDAQ', industry: 'Consumer Electronics', driver: 'Services mix and the device replacement cycle are cushioning muted unit growth.', debate: 'Whether on-device AI creates a material upgrade cycle.', risk: 'China demand, App Store regulation and slower premium-device mix.', metric: 'Services revenue', actual: '$29.4B', estimate: '$28.7B', eps: '$1.71', epsEst: '$1.65', next: 'Oct 30, 2026', peers: ['MSFT', 'GOOGL', 'AMZN'] },
  TSM: { exchange: 'NYSE', industry: 'Semiconductor Foundry', driver: 'Leading-edge nodes and advanced packaging remain the bottleneck for AI compute.', debate: 'How much pricing power survives the next capacity wave.', risk: 'Execution on overseas fabs and a faster mature-node slowdown.', metric: 'HPC revenue growth', actual: '48%', estimate: '44%', eps: '$2.78', epsEst: '$2.63', next: 'Oct 15, 2026', peers: ['NVDA', 'AMD', 'MU'] },
  PLTR: { exchange: 'NASDAQ', industry: 'Application Software', driver: 'AIP conversions are shortening sales cycles and expanding production deployments.', debate: 'Whether commercial growth can support the premium valuation without deal-size volatility.', risk: 'Multiple compression and lumpy government awards.', metric: 'U.S. commercial growth', actual: '68%', estimate: '61%', eps: '$0.19', epsEst: '$0.16', next: 'Nov 2, 2026', peers: ['MSFT', 'GOOGL', 'META'] },
  COIN: { exchange: 'NASDAQ', industry: 'Financial Data & Exchanges', driver: 'Stablecoin economics and institutional volumes are diversifying revenue beyond spot trading.', debate: 'How much USDC income persists if short rates decline.', risk: 'Crypto volatility, fee compression and regulatory changes.', metric: 'Subscription revenue', actual: '$742M', estimate: '$681M', eps: '$1.42', epsEst: '$1.08', next: 'Oct 29, 2026', peers: ['BTC', 'META', 'AMZN'] },
  SMCI: { exchange: 'NASDAQ', industry: 'Computer Hardware', driver: 'Liquid-cooled rack demand is recovering as accelerator supply improves.', debate: 'Whether backlog conversion restores normal working-capital discipline.', risk: 'Execution, customer concentration and governance overhang.', metric: 'AI systems revenue', actual: '$4.7B', estimate: '$4.4B', eps: '$0.63', epsEst: '$0.58', next: 'Nov 4, 2026', peers: ['NVDA', 'AMD', 'TSM'] },
};

const CRYPTO_PROFILE = {
  exchange: 'CRYPTO', industry: 'Digital Asset',
  driver: 'ETF demand and a tightening liquid supply are keeping the institutional bid intact.',
  debate: 'Whether allocator-led flows can absorb profit-taking without a leverage reset.',
  risk: 'A reversal in spot-ETF flows or a sharp rise in real yields.',
  metric: 'Spot ETF net flow', actual: '+$412M', estimate: '+$250M', eps: '', epsEst: '', next: '', peers: ['COIN', 'META', 'NVDA'],
};

let activeEntityId = null;
let activeTab = 'overview';
let chartRange = '1D';
let smartMoneyTab = 'insider';
let earningsStage = 'pre';
let activeChartCleanup = null;

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');

const profileFor = (id) => STOCK_PROFILES[id] || (id === 'BTC' ? CRYPTO_PROFILE : {
  exchange: 'NASDAQ', industry: 'Listed Company',
  driver: 'Fundamental momentum remains positive, with demand tracking ahead of prior expectations.',
  debate: 'Whether the current growth rate is durable enough to support the valuation.',
  risk: 'Execution slippage and a weaker macro demand environment.',
  metric: 'Revenue growth', actual: '18%', estimate: '15%', eps: '$1.24', epsEst: '$1.15', next: 'Next quarter', peers: ['NVDA', 'MSFT', 'AMZN'],
});

function ensureEntityState(id) {
  if (activeEntityId === id) return;
  activeEntityId = id;
  activeTab = 'overview';
  chartRange = '1D';
  smartMoneyTab = 'insider';
  earningsStage = 'pre';
}

export function setCompanyTab(tab) {
  if (COMPANY_TABS.some(([id]) => id === tab)) activeTab = tab;
}
export function setCompanyChartRange(range) {
  if (['1H', '4H', '1D', '1W', '1M'].includes(range)) chartRange = range;
}
export function setCompanySmartTab(tab) {
  if (tab === 'insider' || tab === 'congress') smartMoneyTab = tab;
}
export function setCompanyEarningsStage(stage) {
  if (['pre', 'release', 'call', 'post'].includes(stage)) earningsStage = stage;
}

const relatedItems = (id) => ITEMS.filter((item) => item.entity_refs.includes(id)).sort((a, b) => a.t - b.t);
const itemSourceIds = (item) => itemSources(item).filter((id) => SOURCES[id]);

function sourceCluster(sourceIds, size = 24) {
  const unique = [...new Set(sourceIds)].slice(0, 4);
  return `<span class="company-source-stack">${unique.map((id) => srcAvatar(SOURCES[id], size)).join('')}</span>`;
}

function anomalyModels(id) {
  const entity = ENTITIES[id];
  const related = relatedItems(id);
  const price = Number(entity.price.replace(/[$,]/g, ''));
  const generated = [
    { type: 'Volume Anomaly', published: '2d ago', headline: `${entity.ticker} volume expanded while options skew stayed constructive`, summary: `Turnover reached 1.9× the 20-day average without a corresponding rise in downside hedging.`, sources: ['mkt_data', 'reuters'] },
    { type: 'Narrative Divergence', published: '6d ago', headline: `Price action diverged from the prevailing ${entity.name} narrative`, summary: `The stock held its breakout level while estimate revisions remained largely unchanged.`, sources: ['mkt_data', 'bloomberg'] },
  ];
  return [
    ...related.slice(0, 3).map((item, index) => ({
      type: index === 0 ? 'Unusual Price Movement' : item.kind === 'alpha' ? 'Narrative Signal' : 'Event Anomaly',
      published: item.published,
      headline: item.headline,
      summary: item.summary || item.why,
      price: index === 0 ? entity.price : `$${(price * (1 - index * .018)).toFixed(2)}`,
      change: index === 0 ? entity.delta : `${entity.dir === 'up' ? '+' : '−'}${(1.2 + index * .7).toFixed(1)}%`,
      sources: itemSourceIds(item),
    })),
    ...generated,
  ].slice(0, 4);
}

function renderAnomalyCard(anomaly, spotlight = false) {
  return `<article class="company-anomaly ${spotlight ? 'spotlight' : ''}">
    <div class="company-anomaly-meta"><span>${escapeHtml(anomaly.type)}</span><time>${escapeHtml(anomaly.published)}</time>${anomaly.price ? `<i></i><b>${escapeHtml(anomaly.price)}</b><em>${escapeHtml(anomaly.change)}</em>` : ''}</div>
    <h3>${escapeHtml(anomaly.headline)}</h3>
    <p>${escapeHtml(anomaly.summary)}</p>
    <div class="company-anomaly-foot">${sourceCluster(anomaly.sources)}${spotlight ? `<button data-act="entity-tab" data-tab="anomalies">Anomaly History ${I.chevR}</button>` : ''}</div>
  </article>`;
}

function renderOverview(id) {
  const anomaly = anomalyModels(id)[0];
  const context = relatedItems(id);
  return `<div class="company-overview">
    ${renderAnomalyCard(anomaly, true)}
    <section class="company-chart-card" aria-label="${ENTITIES[id].name} candlestick chart">
      <div class="company-chart-toolbar">
        <div>${['1H', '4H', '1D', '1W', '1M'].map((range) => `<button class="${chartRange === range ? 'on' : ''}" data-act="entity-chart-range" data-range="${range}">${range}</button>`).join('')}</div>
        <span class="company-chart-delay">Delayed</span>
      </div>
      <div class="company-chart-readout" id="companyChartReadout"><span>O —</span><span>H —</span><span>L —</span><span>C —</span></div>
      <div class="company-chart" id="companyChart"></div>
    </section>
    <section class="company-context-feed" aria-label="${ENTITIES[id].ticker} context">
      <header><h2>Context</h2><span>${context.length}</span></header>
      <div class="company-context-cards">${context.length
        ? context.map((item, index) => streamCard(item, index + 1)).join('')
        : `<div class="company-empty"><h3>No context yet</h3><p>New feed items related to ${ENTITIES[id].ticker} will appear here.</p></div>`}</div>
    </section>
  </div>`;
}

function renderNarratives(id, profile) {
  const entity = ENTITIES[id];
  const markdown = `## Current narrative\n\n${profile.driver}\n\n- **Demand and execution:** Recent evidence supports the core growth path, but the market is already paying for continued delivery.\n- **The key debate:** ${profile.debate}\n- **What is priced in:** A clean next quarter and no deterioration in the highest-quality revenue stream.\n\n## What could change the view\n\n${profile.risk}\n\n## Alva read\n\nThe narrative remains constructive, but the next move depends more on estimate revisions than on another headline. Watch whether price holds above the latest breakout zone while consensus catches up.`;
  return `<section class="company-prose">
    <div class="company-section-tools"><button>Latest · Aug 19</button><span></span><button class="secondary">Narrative Change Log</button></div>
    <div class="company-markdown">${renderMarkdown(markdown)}</div>
    <p class="company-updated">Updated Aug 19, 2026 · Generated from filings, earnings material and cited market sources for ${entity.ticker}.</p>
  </section>`;
}

function renderAnomalies(id) {
  return `<section class="company-list" aria-label="Past anomalies">${anomalyModels(id).map((anomaly) => renderAnomalyCard(anomaly)).join('')}</section>`;
}

function newsModels(id, profile) {
  const entity = ENTITIES[id];
  const related = relatedItems(id).slice(0, 4).map((item) => ({
    source: itemSourceIds(item)[0] || 'reuters',
    time: item.published,
    headline: item.headline,
    summary: item.summary || item.why,
  }));
  const extras = [
    { source: 'reuters', time: '3h ago', headline: `${entity.name} remains in focus as analysts revisit the next estimate cycle`, summary: profile.debate },
    { source: 'bloomberg', time: 'Yesterday', headline: `Positioning around ${entity.ticker} is shifting from momentum to estimate revisions`, summary: profile.risk },
    { source: 'mkt_data', time: 'Live', headline: `${entity.ticker} is holding above its 20-day volume-weighted price`, summary: 'Relative strength remains positive versus its peer basket.' },
  ];
  return [...related, ...extras].slice(0, 5);
}

function renderNews(id, profile) {
  return `<section class="company-news-list">${newsModels(id, profile).map((item) => { const source = SOURCES[item.source]; return `<article class="company-news-item">
    <div class="company-news-source">${srcAvatar(source, 28)}<span><b>${escapeHtml(source.name)}</b><time>${escapeHtml(item.time)}</time></span></div>
    <h3>${escapeHtml(item.headline)}</h3><p>${escapeHtml(item.summary)}</p>
  </article>`; }).join('')}</section>`;
}

function renderTradeRows(id) {
  const entity = ENTITIES[id];
  const rows = smartMoneyTab === 'insider' ? [
    ['Executive officer', 'Sell', '$4.82M', 'Aug 14'],
    ['Independent director', 'Sell', '$1.26M', 'Aug 08'],
    ['Chief financial officer', 'Sell', '$742K', 'Jul 29'],
  ] : [
    ['House disclosure', 'Buy', '$50K–$100K', 'Aug 12'],
    ['Senate disclosure', 'Sell', '$15K–$50K', 'Jul 31'],
    ['House disclosure', 'Buy', '$1K–$15K', 'Jul 24'],
  ];
  return `<div class="company-trades-head"><span>${smartMoneyTab === 'insider' ? 'Reporter' : 'Disclosure'}</span><span>Action</span><span>Value</span><span>Date</span></div>
    ${rows.map(([name, side, value, date]) => `<div class="company-trade-row"><span><b>${name}</b><i>${entity.ticker}</i></span><strong class="${side.toLowerCase()}">${side}</strong><span>${value}</span><time>${date}</time></div>`).join('')}`;
}

function renderSmartMoney(id) {
  return `<section class="company-smart">
    <div class="company-subtabs"><button class="${smartMoneyTab === 'insider' ? 'on' : ''}" data-act="entity-smart-tab" data-tab="insider">Insider trade</button><button class="${smartMoneyTab === 'congress' ? 'on' : ''}" data-act="entity-smart-tab" data-tab="congress">Congress &amp; house trade</button></div>
    <div class="company-trades">${renderTradeRows(id)}</div>
    <p class="company-disclaimer">Transactions are shown from public filings. Values may be reported as ranges and do not imply investment intent.</p>
  </section>`;
}

const EARNINGS_STAGES = [
  ['pre', 'Pre-Earning', 'Aug 18'],
  ['release', 'Release', 'Aug 27'],
  ['call', 'Transcript', 'Aug 27'],
  ['post', 'Post-Earning', 'Aug 28'],
];

function renderEarningsContent(id, profile) {
  const entity = ENTITIES[id];
  if (earningsStage === 'release') return `<article class="company-earnings-content"><h2>Earnings Release</h2><p>The official ${entity.ticker} release, normalized against consensus.</p><div class="earnings-metrics">
    <div><span>${profile.metric}</span><b>${profile.actual}</b><i>Consensus ${profile.estimate}</i></div><div><span>Adjusted EPS</span><b>${profile.eps}</b><i>Consensus ${profile.epsEst}</i></div>
  </div><div class="earnings-beat"><i style="--beat:78%"></i><span>Reported</span><span>Consensus</span></div><p class="company-updated">Source: company earnings release and SEC filing · ${profile.next}</p></article>`;
  if (earningsStage === 'call') return `<article class="company-earnings-content"><h2>Earnings Call Transcript</h2><blockquote>“Demand remains ahead of available capacity in the highest-growth parts of the business, while deployment efficiency is improving.”</blockquote><h3>Management emphasis</h3><ul><li>Capacity is being allocated toward the fastest-payback workloads.</li><li>Customers are moving from experimentation into multi-quarter production commitments.</li><li>Margins depend on product mix and the pace of infrastructure commissioning.</li></ul><button class="transcript-link">Open full transcript ${I.chevR}</button></article>`;
  if (earningsStage === 'post') return `<article class="company-earnings-content"><h2>Post-Earning Summary</h2><blockquote>“Execution mattered more than the headline beat this quarter.”</blockquote><h3>Top Buried Signals</h3><ol><li>The strongest metric was ${profile.metric.toLowerCase()}, at <b>${profile.actual}</b> versus ${profile.estimate} expected.</li><li>Forward demand commentary stayed constructive without a material increase in cancellation language.</li><li>The margin bridge suggests operating leverage can return after the current investment phase.</li></ol><h3>What You Should Know</h3><ul><li>The result reinforces the current narrative, but valuation now requires another round of estimate revisions.</li><li>${profile.risk}</li></ul></article>`;
  return `<article class="company-earnings-content"><h2>Pre-Earning Analysis</h2><p class="company-updated">Updated ${profile.next}</p><h3>Summary</h3><p>${profile.driver} <b>What would change this view:</b> ${profile.risk}</p><h3>What Investors Are Watching</h3><ul><li><b>Main question:</b> ${profile.debate}</li><li><b>Consensus:</b> ${profile.metric} at ${profile.estimate}; adjusted EPS at ${profile.epsEst}.</li><li><b>Stock setup:</b> Options imply a 6.4% move, close to the twelve-quarter median.</li></ul><h3>Pre-Earning Setup</h3><div class="earnings-cases"><p><b>Bullish case</b><span>Demand visibility extends and the guide clears the high end.</span></p><p><b>Base case</b><span>A modest beat with unchanged full-year framing.</span></p><p><b>Bearish case</b><span>${profile.risk}</span></p></div></article>`;
}

function renderEarnings(id, profile) {
  if (id === 'BTC') return `<div class="company-empty"><h3>No earnings calendar</h3><p>Bitcoin does not report corporate earnings. Use Narratives, Anomalies and News for the relevant market context.</p></div>`;
  return `<section class="company-earnings"><div class="company-earnings-top"><button>FY27 Q2 ${I.chevDown}</button><span>Next · ${profile.next}</span></div>
    <div class="company-earnings-timeline">${EARNINGS_STAGES.map(([stage, label, date], index) => `<button class="${earningsStage === stage ? 'on' : ''}" data-act="entity-earnings-stage" data-stage="${stage}"><time>${date}</time><i><span></span></i><b>${label}</b></button>`).join('')}</div>
    ${renderEarningsContent(id, profile)}
  </section>`;
}

function renderPeers(id, profile) {
  const entity = ENTITIES[id];
  const peers = profile.peers.filter((peerId) => ENTITIES[peerId]);
  return `<section class="company-peers"><div class="company-peer-intro"><h2>Peer comparison</h2><p>${entity.name} versus the closest liquid names in its current narrative basket.</p></div>${peers.map((peerId, index) => { const peer = ENTITIES[peerId]; const strength = 76 - index * 13; return `<button class="company-peer" data-act="open-entity" data-id="${peerId}">${entityAv(peerId, 34)}<span><b>${peer.name}</b><i>${peer.ticker} · ${peer.price}</i></span><em class="${peer.dir}">${peer.delta}</em><span class="peer-bar"><i style="width:${strength}%"></i></span>${I.chevR}</button>`; }).join('')}<p class="company-disclaimer">Peers are selected by business exposure, investor narrative and trading correlation—not only by industry classification.</p></section>`;
}

function renderTab(id, profile) {
  if (activeTab === 'narratives') return renderNarratives(id, profile);
  if (activeTab === 'anomalies') return renderAnomalies(id);
  if (activeTab === 'news') return renderNews(id, profile);
  if (activeTab === 'smart') return renderSmartMoney(id);
  if (activeTab === 'earnings') return renderEarnings(id, profile);
  if (activeTab === 'peers') return renderPeers(id, profile);
  return renderOverview(id);
}

export function renderCompanyDetail(id) {
  ensureEntityState(id);
  const entity = ENTITIES[id];
  const profile = profileFor(id);
  const followed = store.entities.includes(id);
  const visibleTabs = id === 'BTC' ? COMPANY_TABS.filter(([tab]) => tab !== 'earnings') : COMPANY_TABS;
  if (id === 'BTC' && activeTab === 'earnings') activeTab = 'overview';
  return `<div class="company-detail">
    <header class="company-header">
      <div class="company-identity">${entityAv(id, 44)}<span><h1>${escapeHtml(entity.name)}</h1><p>${profile.exchange}: ${entity.ticker} · ${profile.industry}</p></span></div>
      <div class="company-quote"><b>${entity.price}</b><span class="${entity.dir}">${entity.delta}</span><time>At Close · 4:00 PM EDT</time></div>
      <div class="company-extended"><span>After hours</span><b>${entity.price}</b><em class="${entity.dir}">${entity.dir === 'up' ? '+' : '−'}0.18%</em></div>
      <div class="company-actions"><button class="btn ${followed ? 'btn-ghost' : 'btn-teal-solid'}" data-act="follow-entity" data-id="${id}">${followed ? I.check + 'Following' : I.plus + 'Follow'}</button><button class="btn btn-ghost" data-act="ask-entity" data-id="${id}"><span class="ask-alva-mark" aria-hidden="true"></span>Ask Alva</button></div>
    </header>
    <nav class="company-tabs" aria-label="Company sections">${visibleTabs.map(([tab, label]) => `<button class="${activeTab === tab ? 'on' : ''}" data-act="entity-tab" data-tab="${tab}">${label}</button>`).join('')}</nav>
    <div class="company-tab-panel" data-company-tab="${activeTab}">${renderTab(id, profile)}</div>
  </div>`;
}

const hashSeed = (text) => [...text].reduce((seed, char) => Math.imul(seed ^ char.charCodeAt(0), 16777619), 2166136261) >>> 0;
const mulberry32 = (seed) => () => {
  let value = seed += 0x6D2B79F5;
  value = Math.imul(value ^ value >>> 15, value | 1);
  value ^= value + Math.imul(value ^ value >>> 7, value | 61);
  return ((value ^ value >>> 14) >>> 0) / 4294967296;
};

function generateBars(entity, range) {
  const settings = {
    '1H': { count: 64, seconds: 900, volatility: .0026 },
    '4H': { count: 72, seconds: 3600, volatility: .0042 },
    '1D': { count: 78, seconds: 86400, volatility: .013 },
    '1W': { count: 72, seconds: 604800, volatility: .035 },
    '1M': { count: 60, seconds: 2592000, volatility: .075 },
  }[range];
  const lastPrice = Number(entity.price.replace(/[$,]/g, ''));
  const random = mulberry32(hashSeed(`${entity.id}:${range}`));
  const direction = entity.dir === 'up' ? 1 : -1;
  const drift = direction * settings.volatility * .12;
  let close = lastPrice * (1 - direction * Math.min(.18, settings.volatility * settings.count * .14));
  const start = Math.floor(new Date('2026-08-20T20:00:00Z').getTime() / 1000) - settings.seconds * (settings.count - 1);
  const bars = [];
  for (let index = 0; index < settings.count; index += 1) {
    const open = close * (1 + (random() - .5) * settings.volatility * .42);
    const move = drift + (random() - .47) * settings.volatility;
    close = Math.max(.01, open * (1 + move));
    const spread = settings.volatility * (.42 + random() * .72);
    const high = Math.max(open, close) * (1 + spread);
    const low = Math.min(open, close) * (1 - spread * .86);
    bars.push({
      time: start + settings.seconds * index,
      open, high, low, close,
      volume: Math.round((38 + random() * 76 + Math.abs(move) / settings.volatility * 48) * 1_000_000),
    });
  }
  const scale = lastPrice / bars.at(-1).close;
  return bars.map((bar) => ({ ...bar, open: bar.open * scale, high: bar.high * scale, low: bar.low * scale, close: bar.close * scale }));
}

export function destroyCompanyChart() {
  if (activeChartCleanup) activeChartCleanup();
  activeChartCleanup = null;
}

export function mountCompanyChart(page, id) {
  destroyCompanyChart();
  const container = page.querySelector('#companyChart');
  const readout = page.querySelector('#companyChartReadout');
  const library = window.LightweightCharts;
  const entity = ENTITIES[id];
  if (!(container && library && entity)) return;

  const light = document.documentElement.dataset.theme === 'light';
  const colors = light ? {
    text: '#68716F', grid: 'rgba(36,57,54,.075)', border: '#D8DFDD', cross: 'rgba(48,89,85,.32)', bg: '#FFFFFF',
  } : {
    text: '#7F8D8A', grid: 'rgba(220,239,235,.055)', border: '#2C3332', cross: 'rgba(120,178,171,.34)', bg: '#191C1D',
  };
  const chart = library.createChart(container, {
    width: Math.max(280, container.clientWidth), height: Math.max(220, container.clientHeight),
    layout: { background: { type: 'solid', color: colors.bg }, textColor: colors.text, fontFamily: 'Delight, -apple-system, sans-serif', fontSize: 11 },
    grid: { vertLines: { color: colors.grid }, horzLines: { color: colors.grid } },
    crosshair: { mode: 0, vertLine: { color: colors.cross, width: 1, style: 2, labelBackgroundColor: '#337E7B' }, horzLine: { color: colors.cross, width: 1, style: 2, labelBackgroundColor: '#337E7B' } },
    rightPriceScale: { borderColor: colors.border, scaleMargins: { top: .13, bottom: .22 }, minimumWidth: 48 },
    timeScale: { borderColor: colors.border, timeVisible: chartRange === '1H' || chartRange === '4H', secondsVisible: false, rightOffset: 3, barSpacing: 7, minBarSpacing: 4, lockVisibleTimeRangeOnResize: true },
    handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
    handleScroll: { mouseWheel: true, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: false },
    localization: { priceFormatter: (value) => value >= 1000 ? value.toLocaleString('en-US', { maximumFractionDigits: 0 }) : value.toFixed(2) },
  });
  const candleSeries = chart.addSeries(library.CandlestickSeries, {
    upColor: '#48A8A2', downColor: '#D46770', borderVisible: false,
    wickUpColor: '#69BDB7', wickDownColor: '#DD7A81', lastValueVisible: true, priceLineVisible: true,
    priceLineColor: '#57B8B1', priceLineWidth: 1, priceLineStyle: 2,
  });
  const volumeSeries = chart.addSeries(library.HistogramSeries, {
    priceScaleId: '', priceFormat: { type: 'volume' }, priceLineVisible: false, lastValueVisible: false,
  });
  volumeSeries.priceScale().applyOptions({ scaleMargins: { top: .79, bottom: 0 } });
  const bars = generateBars(entity, chartRange);
  candleSeries.setData(bars.map(({ time, open, high, low, close }) => ({ time, open, high, low, close })));
  volumeSeries.setData(bars.map((bar) => ({ time: bar.time, value: bar.volume, color: bar.close >= bar.open ? 'rgba(72,168,162,.32)' : 'rgba(212,103,112,.28)' })));
  const recent = bars.slice(-24);
  const support = Math.min(...recent.map((bar) => bar.low));
  const resistance = Math.max(...recent.slice(0, -4).map((bar) => bar.high));
  candleSeries.createPriceLine({ price: support, color: 'rgba(125,150,146,.42)', lineWidth: 1, lineStyle: library.LineStyle.Dashed, axisLabelVisible: false, title: 'Support' });
  candleSeries.createPriceLine({ price: resistance, color: 'rgba(83,190,178,.52)', lineWidth: 1, lineStyle: library.LineStyle.Dashed, axisLabelVisible: false, title: 'Breakout' });
  if (library.createSeriesMarkers) library.createSeriesMarkers(candleSeries, [
    { time: bars.at(-18).time, position: 'belowBar', color: '#4DA9A5', shape: 'circle', text: 'E' },
    { time: bars.at(-6).time, position: 'aboveBar', color: '#D1A45B', shape: 'square', text: 'A' },
  ]);
  chart.timeScale().fitContent();

  const format = (value) => value >= 1000 ? value.toLocaleString('en-US', { maximumFractionDigits: 0 }) : value.toFixed(2);
  const updateReadout = (bar) => {
    if (!readout || !bar) return;
    readout.innerHTML = `<span>O <b>${format(bar.open)}</b></span><span>H <b>${format(bar.high)}</b></span><span>L <b>${format(bar.low)}</b></span><span>C <b class="${bar.close >= bar.open ? 'up' : 'down'}">${format(bar.close)}</b></span>`;
  };
  updateReadout(bars.at(-1));
  const crosshairHandler = (param) => updateReadout(param.seriesData?.get(candleSeries) || bars.at(-1));
  chart.subscribeCrosshairMove(crosshairHandler);
  const observer = new ResizeObserver((entries) => {
    const rect = entries[0]?.contentRect;
    if (rect?.width && rect?.height) chart.resize(rect.width, rect.height);
  });
  observer.observe(container);
  activeChartCleanup = () => {
    observer.disconnect();
    chart.unsubscribeCrosshairMove(crosshairHandler);
    chart.remove();
  };
}
