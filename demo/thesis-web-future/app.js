import {
  AUTHORS,
  THESES,
  TICKERS,
  PLAYBOOKS,
  TRENDING,
  WATCHLIST,
  SIGNALS,
  SIGNAL_POOL,
  ICON_CDN,
  tickerLogo,
} from '../thesis-web-ia/data.js?v=20260924l';

const NAV = [
  ['alva/inbox', 'Alva', 'sidebar-agent-normal'],
  ['discover/theses', 'Discover', 'sidebar-discover-normal'],
  ['spaces/nvda/research', 'Spaces', 'sidebar-channel-normal'],
  ['portfolio/overview', 'Portfolio', 'sidebar-portfolio-normal'],
  ['studio/theses', 'Studio', 'edit-l1'],
];

const INBOX_ITEMS = [
  { id: 'satya-azure', priority: 'high', age: '18m', summary: '2 supporting · 1 challenge', change: 'New company disclosure' },
  { id: 'maya-memory', priority: 'high', age: '42m', summary: 'Samsung qualification moved', change: 'Core risk changed' },
  { id: 'gavin-ai-flow', priority: 'medium', age: '1h', summary: 'Retail flow concentration rose', change: 'Evidence strengthened' },
  { id: 'traderstewie-amd', priority: 'medium', age: '3h', summary: 'Volume confirms breakout', change: 'Price condition met' },
  { id: 'ackman-power', priority: 'low', age: '5h', summary: 'No material contradiction', change: 'Context only' },
];

const ROOMS = {
  alva: {
    label: 'Alva', kind: 'Agent channel', ticker: null,
    thesisIds: ['gavin-ai-flow', 'satya-azure'], members: ['yggyll'],
    title: 'Your long-running Alva timeline',
    brief: 'Web, active IM, notifications, tasks, memory and files continue in one Agent Channel. Ordinary New Chat stays separate.',
  },
  nvda: {
    label: 'NVDA Research', kind: 'Topic channel', ticker: 'NVDA',
    thesisIds: ['gavin-ai-flow', 'beth-nvda', 'dylan-rubin', 'ackman-power'], members: ['gavin', 'beth', 'dylan'],
    title: 'Compute demand remains supply constrained',
    brief: 'The room agrees demand remains ahead of usable capacity. The live disagreement is whether power, networking, or custom silicon becomes the next binding constraint.',
  },
  fintwit: {
    label: 'FinTwit digest', kind: 'KOL digest channel', ticker: null,
    thesisIds: ['gavin-ai-flow', 'traderstewie-amd', 'kobeissi-retail'], members: ['gavin', 'traderstewie', 'kobeissi'],
    title: 'What credible market voices changed today',
    brief: 'A bounded digest channel keeps its own main session, tasks, memory, files, alerts and loop history without inheriting the Agent Channel timeline.',
  },
};

const GRAPH_NODES = {
  capacity: { x: 34, y: 20, type: 'Claim cluster', title: 'AI revenue is capacity limited', thesisId: 'satya-azure', count: 8 },
  demand: { x: 7, y: 42, type: 'Market signal', title: 'Compute demand remains strong', thesisId: 'gavin-ai-flow', count: 12 },
  power: { x: 46, y: 55, type: 'Contradiction', title: 'Power delays monetization', thesisId: 'ackman-power', count: 5 },
  hbm: { x: 16, y: 73, type: 'Supply chain', title: 'HBM pricing holds through 2027', thesisId: 'maya-memory', count: 6 },
  custom: { x: 48, y: 79, type: 'Alternative', title: 'Custom silicon changes the margin pool', thesisId: 'semi-tpu', count: 4 },
  retail: { x: 5, y: 10, type: 'Flow', title: 'Retail concentrates in AI leaders', thesisId: 'gavin-ai-flow', count: 7 },
};

const GRAPH_EDGES = [
  { left: 17, top: 44, width: 24, rotate: -31, kind: 'support' },
  { left: 42, top: 32, width: 27, rotate: 58, kind: 'challenge' },
  { left: 20, top: 67, width: 29, rotate: -12, kind: 'support' },
  { left: 25, top: 77, width: 26, rotate: 7, kind: 'challenge' },
  { left: 13, top: 23, width: 25, rotate: 10, kind: 'support' },
];

const HOLDINGS = [
  ['NVDA', '24.8%', '120', '$27,643', '+18.4%'],
  ['MSFT', '19.6%', '46', '$22,986', '+9.1%'],
  ['GOOGL', '15.2%', '52', '$17,600', '+6.8%'],
  ['MU', '8.4%', '10', '$10,166', '+21.2%'],
];

const AUTOMATIONS = [
  ['Portfolio Watch', 'Agent-created', 'Running', 'Next check in 42m'],
  ['NVDA evidence monitor', 'NVDA Research', 'Running', 'Next check in 2h'],
  ['FinTwit morning digest', 'FinTwit digest', 'Running', 'Tomorrow 08:00'],
  ['BTC breakout alert', 'BTC Ultimate AI Trader', 'Paused', 'Paused Sep 18'],
];

const state = {
  route: null,
  inboxItem: 'satya-azure',
  inboxStatus: {},
  graphNode: 'capacity',
  graphQ: '',
  graphAnswer: '',
  commandOpen: false,
  commandMode: 'ask',
  commandAnswer: '',
  createOpen: false,
  userOpen: false,
  settingsOpen: false,
  settingsTab: 'account',
  reader: null,
  draft: null,
  toast: '',
};

const $ = (s, r = document) => r.querySelector(s);
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = (name, size = 16) => `<i class="ic" aria-hidden="true" style="--u:url('${ICON_CDN}${name}.svg');width:${size}px;height:${size}px"></i>`;
const thesis = (id) => THESES.find((t) => t.id === id);
const author = (id) => AUTHORS[id];
const current = (t) => t?.versions?.[0];
const symbols = (t) => current(t)?.tickers?.map((x) => typeof x === 'string' ? x : x.symbol) || [];
const visibleTheses = () => THESES.filter((t) => t.status === 'active' && t.visibility !== 'private');
const firstParagraph = (t) => current(t)?.paragraphs?.[0] || '';
const secondParagraph = (t) => current(t)?.paragraphs?.[1] || firstParagraph(t);
const sourceName = (t) => current(t)?.source?.label || 'Public source';

function avatar(a, size = '') {
  if (!a) return '';
  if (a.avatar) return `<img class="avatar ${size}" src="${esc(a.avatar)}" alt="">`;
  return `<span class="avatar avatar-fallback ${size}">${esc((a.initial || a.name?.[0] || '?').toUpperCase())}</span>`;
}

function tickerMark(sym) {
  const src = tickerLogo(sym);
  return src ? `<img class="ticker-logo" src="${esc(src)}" alt="">` : `<span class="avatar avatar-fallback sm">${esc(sym[0])}</span>`;
}

function mediaFor(t) { return current(t)?.media?.filter((m) => m.img) || []; }

function signalList(t) {
  if (!t) return [];
  let ids = t.signals?.slice() || [];
  if (!ids.length) {
    for (const sym of symbols(t)) for (const id of (SIGNAL_POOL[sym] || [])) if (!ids.includes(id)) ids.push(id);
  }
  if (!ids.length) ids = (SIGNAL_POOL.GENERAL || []).slice(0, 4);
  return ids.map((id) => {
    const signal = SIGNALS[id];
    return signal ? { id, ...signal, text: signal.quote, analysis: signal.alva } : null;
  }).filter(Boolean);
}

function parseRoute() {
  const raw = location.hash.replace(/^#\/?/, '') || 'alva/inbox';
  const [path] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  const page = ['alva', 'discover', 'spaces', 'portfolio', 'studio', 'thesis', 'market', 'public', 'map'].includes(parts[0]) ? parts[0] : 'alva';
  return { page, parts };
}

function go(path) {
  const next = '#/' + path;
  if (location.hash === next) render(); else location.hash = next;
}

function renderDemoStrip() {
  const p = state.route.page;
  return `<span class="strip-brand">Thesis · Future Web</span><div class="strip-tabs architecture-tabs">
    <button class="strip-tab ${!['public', 'map'].includes(p) ? 'on' : ''}" data-go="alva/inbox"><b>完整产品</b><span>Signed-in architecture</span></button>
    <button class="strip-tab ${p === 'public' ? 'on' : ''}" data-go="public/top"><b>公开 Web</b><span>Publication surface</span></button>
    <button class="strip-tab ${p === 'map' ? 'on' : ''}" data-go="map"><b>能力落点</b><span>Existing → proposed</span></button>
  </div><div class="strip-right"><a class="strip-link" href="../thesis-web-ia/#/b/foryou">A/B/C baseline</a><a class="strip-link" href="../">Demo index</a></div>`;
}

function renderGlobalNav() {
  const page = state.route.page;
  return `<header class="global-nav"><button class="brand-button" data-go="alva/inbox" aria-label="Alva home"><span class="logo">A</span><span class="app-title">Alva</span></button><nav class="main-nav" aria-label="Primary">${NAV.map(([path, label, ic]) => `<button class="global-nav-item ${page === path.split('/')[0] ? 'on' : ''}" data-go="${path}">${icon(ic, 15)}<span>${label}</span></button>`).join('')}</nav><span class="grow"></span><button class="global-tool" data-action="open-search" aria-label="Search">${icon('search-l', 16)}<span>Search</span><kbd>⌘ K</kbd></button><button class="btn primary" data-action="open-create">${icon('add-l2', 14)} New</button><button class="user-trigger" data-action="open-user" aria-label="User menu">${avatar(author('yggyll'), 'sm')}</button></header>`;
}

function routeContext() {
  const { page, parts } = state.route;
  if (page === 'thesis') return `Thesis · ${author(thesis(parts[1])?.authorId)?.name || 'Unknown'}`;
  if (page === 'market') return `Company · ${(parts[1] || 'NVDA').toUpperCase()}`;
  if (page === 'spaces') return `Space · ${ROOMS[parts[1]]?.label || 'NVDA Research'}`;
  if (page === 'portfolio') return 'Portfolio · Alpaca Paper';
  if (page === 'studio') return 'Creator library';
  if (page === 'discover') return `Discover · ${parts[1] || 'Theses'}`;
  return 'Alva Agent';
}

function renderCommandDock() {
  return `<button class="global-command" data-action="open-command"><span class="row8">${icon('chat-ai-l', 16)}<span class="command-context">${esc(routeContext())}</span></span><span class="command-placeholder">Ask, research, build, or start a new chat…</span><kbd>⌘ ↵</kbd></button>`;
}

function renderProductShell(content) {
  return `<section class="product-shell">${renderGlobalNav()}<main class="product-main">${content}</main>${renderCommandDock()}</section>`;
}

function localTabs(items, active) {
  return `<nav class="local-tabs">${items.map(([path, label, count]) => `<button class="${active === path ? 'on' : ''}" data-go="${path}">${label}${count != null ? ` <span>${count}</span>` : ''}</button>`).join('')}</nav>`;
}

function pageHead(title, subtitle, actions = '') {
  return `<div class="complete-page-head"><div><h1>${esc(title)}</h1>${subtitle ? `<p>${esc(subtitle)}</p>` : ''}</div><div class="row8 wrap">${actions}</div></div>`;
}

function renderAlva() {
  const tab = state.route.parts[1] || 'inbox';
  const tabs = [['alva/timeline', 'Timeline'], ['alva/inbox', 'Inbox', INBOX_ITEMS.filter((x) => !state.inboxStatus[x.id]).length], ['alva/tasks', 'Tasks', 3], ['alva/alerts', 'Alerts', 4], ['alva/memory', 'Memory'], ['alva/files', 'Files']];
  const head = pageHead('Alva', 'Your long-running Agent Channel across Web and active IM.', `<span class="pill green">Telegram active</span><button class="btn" data-action="open-settings" data-tab="alva-agent">${icon('settings-l', 14)} Agent settings</button><button class="btn primary" data-action="new-chat">${icon('chat-new-l', 14)} New chat</button>`);
  return `<section class="complete-page">${head}${localTabs(tabs, `alva/${tab}`)}${tab === 'timeline' ? renderTimeline() : tab === 'inbox' ? renderInbox() : tab === 'tasks' ? renderTaskList() : tab === 'alerts' ? renderAlerts() : tab === 'memory' ? renderMemory() : renderFiles()}</section>`;
}

function renderTimeline() {
  return `<div class="timeline-layout"><section class="timeline-stream"><div class="timeline-day">Today</div><article class="timeline-message"><div class="row12">${avatar(author('yggyll'))}<div><b class="t13">YGGYLL</b><div class="muted t11">09:18 · Web</div></div></div><p>Check whether the latest Azure capacity update changes my MSFT thesis.</p></article><article class="timeline-message alva"><div class="row12"><span class="logo">A</span><div><b class="t13">Alva</b><div class="muted t11">09:19</div></div></div><p>The demand premise strengthened, but power and permitting still move revenue recognition out. I added the disclosure to your thesis inbox.</p><button class="btn" data-go="alva/inbox">Review signal</button></article><article class="notification-row"><span class="pill yellow">Automation</span><div class="grow"><b class="t13">NVDA evidence monitor finished</b><div class="muted t12">4 sources reviewed · 1 contradiction found</div></div><button class="btn" data-go="spaces/nvda/research">Open space</button></article></section><aside class="timeline-side"><span class="eyebrow">Continue elsewhere</span><div class="settings-block"><b class="t13">Telegram</b><span class="pill green">Active IM</span><p>Personal Agent Channel messages sync here.</p></div><div class="settings-block"><b class="t13">Recent chats</b><p>NVDA 50-day pullback — buy or wait?</p><p>Summarize the FOMC minutes</p></div></aside></div>`;
}

function renderInbox() {
  const selected = INBOX_ITEMS.find((x) => x.id === state.inboxItem) || INBOX_ITEMS[0];
  const t = thesis(selected.id); const a = author(t.authorId); const signals = signalList(t); const done = state.inboxStatus[selected.id];
  return `<div class="inbox-body integrated-inbox"><aside class="inbox-list"><div class="inbox-group row-between"><span class="eyebrow">Thesis checks</span><span class="pill red">${INBOX_ITEMS.filter((x) => !state.inboxStatus[x.id]).length} open</span></div>${INBOX_ITEMS.map((item) => { const it = thesis(item.id); const status = state.inboxStatus[item.id]; return `<div class="inbox-item ${item.id === selected.id ? 'on' : ''} ${status ? 'done' : ''}" data-action="inbox-select" data-id="${item.id}"><div class="row8"><span class="priority-dot ${item.priority}"></span><span class="t11 medium">${item.priority.toUpperCase()}</span><span class="grow"></span><span class="muted t11">${item.age}</span></div><div class="t13 medium" style="margin-top:7px;line-height:1.35">${esc(firstParagraph(it))}</div><div class="muted t11" style="margin-top:6px">${esc(status || item.summary)}</div></div>`; }).join('')}</aside><main class="inbox-detail"><article class="inbox-article"><div class="desk-author">${avatar(a, 'lg')}<div><div class="t13 medium">${esc(a.name)}</div><div class="muted t12">${esc(a.role)}</div></div><span class="grow"></span><span class="pill ${selected.priority === 'high' ? 'red' : 'yellow'}">${selected.priority} priority</span></div><h1>${esc(selected.change)}</h1><p>${esc(firstParagraph(t))}</p><div class="change-block"><div class="eyebrow">Alva assessment</div><p>${esc(signals[0]?.analysis || 'The latest source changes timing more than direction.')}</p></div><h2>Source</h2><div class="row12">${tickerMark(symbols(t)[0] || 'N')}<div><div class="t13 medium">${esc(sourceName(t))}</div><div class="muted t12">${esc(signals[0]?.text || secondParagraph(t))}</div></div></div><h2>Current thesis</h2><p>${esc(secondParagraph(t))}</p>${done ? `<div class="ai-answer"><b>Handled:</b> ${esc(done)}</div>` : ''}</article></main><aside class="inbox-actions"><span class="eyebrow">Decide</span><div class="decision-stack"><button class="btn primary" data-action="inbox-accept" data-id="${t.id}">${icon('check-l1', 14)} Accept signal</button><button class="btn" data-action="inbox-draft" data-id="${t.id}">${icon('edit-l1', 14)} Draft update</button><button class="btn" data-action="inbox-snooze" data-id="${t.id}">${icon('clock-l', 14)} Snooze until event</button><button class="btn danger" data-action="inbox-dismiss" data-id="${t.id}">${icon('close-l1', 14)} Not relevant</button></div><div class="decision-note">These actions update the Agent inbox. They do not change Playbook subscriptions or Feed alerts.</div></aside></div>`;
}

function renderTaskList() {
  return `<div class="quiet-list">${AUTOMATIONS.slice(0, 3).map((a, i) => `<article class="quiet-row"><span class="status-dot ${i === 2 ? 'yellow' : 'green'}"></span><div class="grow"><b>${esc(a[0])}</b><p>${esc(a[1])} · ${esc(a[3])}</p></div><span class="pill ${a[2] === 'Running' ? 'green' : ''}">${a[2]}</span><button class="btn" data-go="studio/automations">Manage</button></article>`).join('')}</div>`;
}

function renderAlerts() {
  return `<div class="quiet-list"><article class="quiet-row"><span class="pill red">Portfolio</span><div class="grow"><b>NVDA position crossed 25% allocation</b><p>Alpaca Paper · risk rule approaching</p></div><button class="btn" data-go="portfolio/overview">Review</button></article><article class="quiet-row"><span class="pill yellow">Playbook</span><div class="grow"><b>Attribution Analysis Strategy produced a new alert</b><p>Feed alert · not a trade subscription</p></div><button class="btn">Open</button></article><article class="quiet-row"><span class="pill brand">Channel</span><div class="grow"><b>FinTwit digest found 3 thesis changes</b><p>KOL digest channel</p></div><button class="btn" data-go="spaces/fintwit/alerts">Open</button></article></div>`;
}

function renderMemory() {
  return `<div class="two-col-list"><section><span class="eyebrow">Global memory</span><div class="quiet-list"><article class="quiet-row"><div><b>Investment preferences</b><p>US tech · momentum with explicit invalidation</p></div></article><article class="quiet-row"><div><b>Risk posture</b><p>Avoid single-name exposure above 30%</p></div></article></div></section><section><span class="eyebrow">Channel memory</span><div class="quiet-list"><article class="quiet-row"><div><b>Alva channel</b><p>Personal context, active IM, recent decisions</p></div></article><article class="quiet-row"><div><b>NVDA Research</b><p>Room-specific claims and source preferences</p></div></article></div></section></div>`;
}

function renderFiles() {
  return `<div class="quiet-list">${[['Azure-capacity-notes.md', 'Agent Channel · 18 KB'], ['NVDA-evidence-export.csv', 'NVDA Research · 42 KB'], ['portfolio-risk-snapshot.pdf', 'Alpaca Paper · 1.2 MB']].map((f) => `<article class="quiet-row">${icon('file-l', 18)}<div class="grow"><b>${esc(f[0])}</b><p>${esc(f[1])}</p></div><button class="btn">Open</button></article>`).join('')}</div>`;
}

function renderDiscover() {
  const tab = state.route.parts[1] || 'theses';
  const tabs = [['discover/theses', 'Theses'], ['discover/playbooks', 'Playbooks'], ['discover/people', 'People'], ['discover/tickers', 'Tickers']];
  return `<section class="complete-page">${pageHead('Discover', 'Browse public objects. Personalized updates stay in Alva Inbox.', `<button class="btn" data-action="open-search">${icon('search-l', 14)} Search all</button>`)}${localTabs(tabs, `discover/${tab}`)}${tab === 'theses' ? renderThesisGrid() : tab === 'playbooks' ? renderPlaybookGrid() : tab === 'people' ? renderPeopleGrid() : renderTickerGrid()}</section>`;
}

function renderThesisGrid() {
  return `<div class="filter-row"><span class="pill brand">All</span><span class="pill">Following</span><span class="pill">New thesis</span><span class="pill">Thesis update</span><span class="grow"></span><span class="muted t12">Latest</span></div><div class="discover-grid theses-grid">${visibleTheses().slice(0, 9).map((t) => { const a = author(t.authorId); return `<article class="object-card thesis-object" data-go="thesis/${t.id}"><div class="row8">${avatar(a, 'sm')}<div class="grow truncate"><b class="t12">${esc(a.name)}</b></div><span class="muted t11">${esc(t.time)}</span></div><h2>${esc(firstParagraph(t))}</h2><p>${esc(secondParagraph(t))}</p><div class="row8 wrap">${symbols(t).map((s) => `<span class="pill">${esc(s)}</span>`).join('')}<span class="grow"></span><span class="muted t11">${t.saves} saves</span></div></article>`; }).join('')}</div>`;
}

function renderPlaybookGrid() {
  return `<div class="discover-grid playbook-grid">${PLAYBOOKS.slice(0, 8).map((p) => `<article class="object-card playbook-object"><img src="${esc(p.cover)}" alt=""><div class="row8"><span class="pill">${esc(p.template || 'Playbook')}</span>${p.price ? `<span class="pill yellow">${esc(p.price)}</span>` : ''}</div><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p><div class="row-between"><span class="muted t12">${esc(p.creator)}</span><button class="btn" data-action="open-command">Remix</button></div></article>`).join('')}</div>`;
}

function renderPeopleGrid() {
  const ids = ['gavin', 'satya', 'maya', 'beth', 'dylan', 'traderstewie', 'damodaran', 'munster'];
  return `<div class="discover-grid people-grid">${ids.map((id) => { const a = author(id); const count = visibleTheses().filter((t) => t.authorId === id).length; return `<article class="object-card person-object"><div class="row12">${avatar(a, 'lg')}<div class="grow"><h2>${esc(a.name)}</h2><p>${esc(a.role)}</p></div><button class="btn">Follow</button></div><div class="muted t12">${esc(a.followers || '—')} followers · ${count} theses</div></article>`; }).join('')}</div>`;
}

function renderTickerGrid() {
  return `<div class="discover-grid ticker-grid">${[...WATCHLIST, ...TRENDING.filter((x) => !WATCHLIST.includes(x))].map((sym, i) => `<article class="object-card ticker-object" data-go="market/${sym}/overview"><div class="row12">${tickerMark(sym)}<div class="grow"><h2>${esc(sym)}</h2><p>${esc(TICKERS[sym]?.name || sym)}</p></div><span class="pill ${i % 3 === 1 ? 'red' : 'green'}">${i % 3 === 1 ? '-2.04%' : '+0.84%'}</span></div><div class="mini-chart"><i style="height:34%"></i><i style="height:52%"></i><i style="height:45%"></i><i style="height:68%"></i><i style="height:61%"></i><i style="height:83%"></i><i style="height:74%"></i></div><div class="muted t11">Company Entity · ${visibleTheses().filter((t) => symbols(t).includes(sym)).length} theses</div></article>`).join('')}</div>`;
}

function renderSpaces() {
  const roomKey = state.route.parts[1] || 'nvda'; const room = ROOMS[roomKey] || ROOMS.nvda; const tab = state.route.parts[2] || 'research';
  const tabs = [['chat', 'Chat'], ['research', 'Research'], ['tasks', 'Tasks'], ['alerts', 'Alerts'], ['memory', 'Memory'], ['files', 'Files']];
  return `<section class="complete-page spaces-page">${pageHead('Spaces', 'Agent and topic channels keep separate long-term context.', `<button class="btn primary" data-action="new-space">${icon('add-l2', 14)} New space</button>`)}<div class="space-switcher">${Object.entries(ROOMS).map(([key, r]) => `<button class="space-chip ${roomKey === key ? 'on' : ''}" data-go="spaces/${key}/${key === 'alva' ? 'chat' : 'research'}">${key === 'alva' ? '<span class="logo">A</span>' : r.ticker ? tickerMark(r.ticker) : icon('sidebar-channel-normal', 16)}<span><b>${esc(r.label)}</b><small>${esc(r.kind)}</small></span></button>`).join('')}</div>${localTabs(tabs.map(([key, label]) => [`spaces/${roomKey}/${key}`, label]), `spaces/${roomKey}/${tab}`)}<div class="space-content">${renderSpaceTab(roomKey, room, tab)}</div></section>`;
}

function renderSpaceTab(roomKey, room, tab) {
  if (tab === 'chat') return `<div class="channel-chat"><article class="timeline-message alva"><div class="row12"><span class="logo">A</span><div><b class="t13">Alva</b><div class="muted t11">Channel session</div></div></div><p>${esc(room.brief)}</p></article><article class="timeline-message"><div class="row12">${avatar(author('yggyll'))}<b class="t13">YGGYLL</b></div><p>Keep watching the strongest contradiction and draft an update only if the premise changes.</p></article><div class="channel-compose">${icon('chat-ai-l', 16)}<span class="muted">Message ${esc(room.label)}…</span><span class="grow"></span><button class="btn primary">Send</button></div></div>`;
  if (tab === 'tasks') return renderTaskList();
  if (tab === 'alerts') return renderAlerts();
  if (tab === 'memory') return renderMemory();
  if (tab === 'files') return renderFiles();
  if (roomKey === 'alva') return `<div class="empty">The Agent Channel stores the personal timeline. Use a topic channel for a dedicated research room.</div>`;
  const view = state.route.parts[3] || 'overview';
  return `<div class="research-header"><div><span class="eyebrow">Research workspace</span><h2>${esc(room.title)}</h2><p>${esc(room.brief)}</p></div><div class="row8 wrap">${room.members.map((id) => avatar(author(id), 'sm')).join('')}<span class="avatar avatar-fallback sm">AI</span></div></div><div class="segmented">${[['overview', 'Overview'], ['theses', 'Theses'], ['evidence', 'Evidence'], ['graph', 'Graph']].map(([key, label]) => `<button class="${view === key ? 'on' : ''}" data-go="spaces/${roomKey}/research/${key}">${label}</button>`).join('')}</div>${view === 'graph' ? renderGraphStage() : view === 'theses' ? renderRoomTheses(room) : view === 'evidence' ? renderRoomEvidence(room) : renderRoomOverview(room)}`;
}

function renderRoomOverview(room) {
  return `<div class="room-grid"><article class="room-card"><span class="eyebrow">Open question</span><h3>What changes the timing of this thesis?</h3><p>Alva will only notify the room when a source materially supports or challenges the premise.</p><button class="btn" data-action="open-command" style="margin-top:14px">Ask the space</button></article><article class="room-card"><span class="eyebrow">Channel loop</span><h3>Evidence review · every 4 hours</h3><p>Bounded until Oct 31 · max 84 runs · visible in Tasks and Automation settings.</p></article><article class="room-card"><span class="eyebrow">Next event</span><h3>${room.ticker === 'NVDA' ? 'GTC keynote · 12 days' : 'Morning digest · tomorrow 08:00'}</h3><p>Event timing is channel context, not a Market watchlist.</p></article></div>`;
}

function renderRoomTheses(room) {
  return `<div class="room-grid">${room.thesisIds.map((id) => { const t = thesis(id); return `<article class="room-card" data-go="thesis/${id}"><span class="eyebrow">${esc(author(t.authorId).name)}</span><h3>${esc(firstParagraph(t))}</h3><p>${esc(secondParagraph(t))}</p></article>`; }).join('')}</div>`;
}

function renderRoomEvidence(room) {
  const evidence = room.thesisIds.flatMap((id) => signalList(thesis(id)).slice(0, 2));
  return `<div class="room-grid">${evidence.slice(0, 6).map((s, i) => `<article class="room-card"><span class="pill ${i % 3 === 1 ? 'red' : 'green'}">${i % 3 === 1 ? 'Challenges' : 'Supports'}</span><h3>${esc(s.text)}</h3><p>${esc(author(s.authorId)?.name || s.authorId)} · ${esc(s.time || 'Recent')}</p></article>`).join('')}</div>`;
}

function renderGraphStage() {
  const selected = GRAPH_NODES[state.graphNode] || GRAPH_NODES.capacity; const t = thesis(selected.thesisId); const a = author(t.authorId); const q = state.graphQ.trim().toLowerCase();
  const related = Object.entries(GRAPH_NODES).filter(([key]) => key !== state.graphNode).slice(0, 3);
  return `<div class="graph-stage embedded-graph"><div class="graph-toolbar"><label class="graph-search">${icon('search-l', 15)}<input data-input="graph-search" value="${esc(state.graphQ)}" placeholder="Find a claim, company, person…"></label><button class="btn" data-action="graph-reset">Reset</button></div><div class="graph-canvas">${GRAPH_EDGES.map((e) => `<span class="edge ${e.kind}" style="left:${e.left}%;top:${e.top}%;width:${e.width}%;transform:rotate(${e.rotate}deg)"></span>`).join('')}${Object.entries(GRAPH_NODES).map(([key, n]) => { const hit = !q || `${n.title} ${n.type}`.toLowerCase().includes(q); return `<button class="graph-node ${key === state.graphNode ? 'on' : ''} ${hit ? '' : 'dim'}" data-node="${key}" style="left:${n.x}%;top:${n.y}%"><div class="node-type">${esc(n.type)} · ${n.count}</div><div class="node-title">${esc(n.title)}</div></button>`; }).join('')}</div><aside class="graph-sheet"><div class="row12">${avatar(a, 'lg')}<div><div class="t13 medium">${esc(a.name)}</div><div class="muted t12">${esc(selected.type)} · ${selected.count} theses</div></div></div><h1>${esc(selected.title)}</h1><p>${esc(firstParagraph(t))}</p><div class="relation-list"><span class="eyebrow">Strongest relationships</span>${related.map(([key, n], i) => `<div class="relation" data-node="${key}"><span class="relation-mark ${i === 1 ? 'red' : ''}"></span><span>${i === 1 ? 'Challenges' : 'Supports'} · ${esc(n.title)}</span></div>`).join('')}</div><button class="btn brand" data-action="graph-explain" style="margin-top:14px">Explain this cluster</button>${state.graphAnswer ? `<div class="ai-answer">${esc(state.graphAnswer)}</div>` : ''}</aside></div>`;
}

function renderPortfolio() {
  const tab = state.route.parts[1] || 'overview';
  const tabs = [['portfolio/overview', 'Overview'], ['portfolio/activity', 'Activity'], ['portfolio/subscriptions', 'Strategies']];
  const actions = `<button class="btn">Alpaca Paper ${icon('arrow-down-l2', 12)}</button><button class="btn" data-action="connect-account">${icon('add-l2', 14)} Connect account</button><button class="icon-btn" data-action="open-settings" data-tab="portfolio-settings" aria-label="Portfolio settings">${icon('settings-l', 15)}</button>`;
  return `<section class="complete-page">${pageHead('Portfolio', 'Account-scoped holdings, orders and strategy bindings.', actions)}${localTabs(tabs, `portfolio/${tab}`)}${tab === 'overview' ? renderPortfolioOverview() : tab === 'activity' ? renderPortfolioActivity() : renderPortfolioStrategies()}</section>`;
}

function renderPortfolioOverview() {
  return `<div class="portfolio-summary"><section><span class="eyebrow">Total equity</span><strong>$111,475.90</strong><span class="green-text">+$8,460.20 · 8.21%</span></section><section><span class="eyebrow">Cash</span><strong>$33,080.90</strong><span class="muted t12">29.68% allocation</span></section><section><span class="eyebrow">Unrealized PnL</span><strong>+$9,718.40</strong><span class="green-text">Paper account</span></section></div><section class="data-section"><div class="row-between"><h2>Positions</h2><button class="btn" data-action="open-command">Ask about this account</button></div><div class="data-table"><div class="data-row head"><span>Symbol</span><span>Weight</span><span>Qty</span><span>Market value</span><span>Total PnL</span></div>${HOLDINGS.map((h) => `<div class="data-row"><span class="row8">${tickerMark(h[0])}<b>${h[0]}</b></span><span>${h[1]}</span><span>${h[2]}</span><span>${h[3]}</span><span class="green-text">${h[4]}</span></div>`).join('')}</div></section>`;
}

function renderPortfolioActivity() {
  return `<section class="data-section"><h2>Order activity</h2><div class="quiet-list">${[['09:42', 'BUY', 'NVDA', '12 shares', 'Filled', 'Attribution Analysis Strategy'], ['Yesterday', 'SELL', 'MSFT', '4 shares', 'Filled', 'Manual'], ['Sep 21', 'BUY', 'MU', '2 shares', 'Rejected', 'Risk rule: max order']].map((r) => `<article class="quiet-row"><span class="pill ${r[1] === 'BUY' ? 'green' : 'red'}">${r[1]}</span><b>${r[2]}</b><span class="muted t12">${r[3]}</span><span class="grow"></span><span class="t12">${r[4]}</span><span class="muted t12">${r[5]}</span></article>`).join('')}</div></section>`;
}

function renderPortfolioStrategies() {
  return `<div class="two-col-list"><section class="data-section"><span class="eyebrow">Active trade subscription</span><h2>Attribution Analysis Strategy</h2><p class="muted t13">Weighted signal · latest executed Sep 22 · Alpaca Paper</p><button class="btn danger" style="margin-top:16px">Stop subscription</button></section><section class="data-section"><span class="eyebrow">Portfolio Watch</span><h2>Risk and catalyst monitoring</h2><p class="muted t13">Automation · only sends material results · next run in 42m</p><button class="btn" data-go="studio/automations" style="margin-top:16px">Manage automation</button></section></div>`;
}

function renderStudio() {
  const tab = state.route.parts[1] || 'theses';
  const tabs = [['studio/theses', 'Theses'], ['studio/playbooks', 'Playbooks'], ['studio/automations', 'Automations'], ['studio/earnings', 'Earnings']];
  return `<section class="complete-page">${pageHead('Studio', 'Manage owned work. Public discovery remains in Discover.', `<button class="btn primary" data-action="open-create">${icon('add-l2', 14)} Create</button>`)}${localTabs(tabs, `studio/${tab}`)}${tab === 'theses' ? renderStudioTheses() : tab === 'playbooks' ? renderStudioPlaybooks() : tab === 'automations' ? renderStudioAutomations() : renderEarnings()}</section>`;
}

function renderStudioTheses() {
  const mine = THESES.filter((t) => t.authorId === 'yggyll');
  return `<div class="row8" style="margin-bottom:14px"><span class="pill brand">Active</span><span class="pill">Archived</span><span class="grow"></span><span class="muted t12">${mine.length} theses</span></div><div class="quiet-list">${mine.map((t) => `<article class="quiet-row"><div class="grow"><b>${esc(firstParagraph(t))}</b><p>${esc(t.time)} · ${t.versions.length} versions · ${t.visibility}</p></div><button class="btn" data-go="thesis/${t.id}">Open</button><button class="icon-btn" aria-label="More">${icon('more-l1', 15)}</button></article>`).join('')}</div>`;
}

function renderStudioPlaybooks() {
  return `<div class="quiet-list">${PLAYBOOKS.slice(0, 5).map((p, i) => `<article class="quiet-row"><img class="small-cover" src="${esc(p.cover)}" alt=""><div class="grow"><b>${esc(p.title)}</b><p>${i < 2 ? 'Released · Public' : 'Draft · Private'} · ${p.stars.toLocaleString()} stars</p></div><span class="pill ${i < 2 ? 'green' : 'yellow'}">${i < 2 ? 'Release' : 'Draft'}</span><button class="btn">Manage</button></article>`).join('')}</div>`;
}

function renderStudioAutomations() {
  return `<div class="boundary-note">Automations stay distinct from Playbook Subscribe, Feed Alerts and Trade Subscriptions.</div><div class="data-table automation-table"><div class="data-row head"><span>Name</span><span>Source</span><span>Status</span><span>Schedule</span><span></span></div>${AUTOMATIONS.map((a) => `<div class="data-row"><span><b>${esc(a[0])}</b></span><span>${esc(a[1])}</span><span><i class="status-dot ${a[2] === 'Running' ? 'green' : 'yellow'}"></i> ${a[2]}</span><span>${esc(a[3])}</span><span><button class="btn">Open detail</button></span></div>`).join('')}</div>`;
}

function renderEarnings() {
  return `<div class="portfolio-summary"><section><span class="eyebrow">Available earnings</span><strong>$1,842.60</strong><button class="btn" style="margin-top:12px">Withdraw</button></section><section><span class="eyebrow">This month</span><strong>$426.10</strong><span class="green-text">+18.2%</span></section><section><span class="eyebrow">Paid subscribers</span><strong>148</strong><span class="muted t12">Across 3 paid playbooks</span></section></div>`;
}

function renderThesisDetail() {
  const id = state.route.parts[1] || 'gavin-ai-flow'; const t = thesis(id) || thesis('gavin-ai-flow'); const a = author(t.authorId); const evidence = signalList(t).slice(0, 7); const media = mediaFor(t).slice(0, 2);
  return `<section class="complete-page thesis-workspace"><div class="workspace-bar"><button class="btn ghost" data-go="discover/theses">${icon('arrow-left-l2', 14)} Discover</button><span class="muted t12">Thesis workspace</span><span class="grow"></span><button class="btn">${icon('bookmark-l', 14)} Save</button><button class="btn">Share</button>${a.me ? `<button class="btn primary" data-action="draft-thesis" data-id="${t.id}">${icon('edit-l1', 14)} Update</button>` : ''}</div><div class="desk-body integrated-desk"><div class="desk-paper-wrap"><article class="desk-paper"><div class="desk-author">${avatar(a, 'lg')}<div><div class="t13 medium">${esc(a.name)}</div><div class="muted t12">${esc(a.role)}</div></div><span class="grow"></span><span class="pill">${t.versions.length} versions</span></div><h1>${esc(firstParagraph(t))}</h1>${current(t).paragraphs.slice(1).map((p) => `<p>${esc(p)}</p>`).join('')}${media.length ? `<div class="desk-media">${media.map((m) => `<img src="${esc(m.img)}" alt="${esc(m.alt || '')}">`).join('')}</div>` : ''}<div class="row8 wrap">${symbols(t).map((s) => `<button class="pill" data-go="market/${s}/overview">${tickerMark(s)} ${esc(s)}</button>`).join('')}</div></article></div><aside class="desk-evidence"><div class="panel-title"><span class="eyebrow">Evidence stack</span><span class="grow"></span><span class="pill brand">${evidence.length} signals</span></div><div class="evidence-list">${evidence.map((s, i) => { const kind = i % 4 === 1 ? 'challenge' : i % 4 === 3 ? 'watch' : 'support'; return `<div class="evidence-card ${kind}"><div class="row-between"><span class="eyebrow">${kind === 'challenge' ? 'Challenges' : kind === 'watch' ? 'Watch' : 'Supports'}</span><span class="muted t11">${esc(s.time)}</span></div><p>${esc(s.text)}</p><div class="muted t11" style="margin-top:8px">${esc(author(s.authorId)?.name || s.authorId)}</div></div>`; }).join('')}</div></aside></div></section>`;
}

function renderMarket() {
  const sym = (state.route.parts[1] || 'NVDA').toUpperCase(); const tab = state.route.parts[2] || 'overview'; const company = TICKERS[sym] || { name: sym, venue: 'NASDAQ', industry: 'Company' };
  const tabs = [['overview', 'Overview'], ['narratives', 'Narratives'], ['anomalies', 'Anomalies'], ['peers', 'Peers'], ['theses', 'Theses']].map(([key, label]) => [`market/${sym}/${key}`, label]);
  const head = `<div class="market-head"><div class="row12">${tickerMark(sym)}<div><h1>${esc(company.name)}</h1><p>${esc(sym)} · ${esc(company.venue)} · ${esc(company.industry)}</p></div></div><div class="market-price"><strong>${sym === 'NVDA' ? '230.36' : sym === 'MSFT' ? '499.70' : '338.46'} USD</strong><span class="green-text">+0.84% regular</span><small>At close · Sep 22</small></div></div>`;
  return `<section class="complete-page">${head}${localTabs(tabs, `market/${sym}/${tab}`)}${tab === 'overview' ? renderMarketOverview(sym) : tab === 'theses' ? renderMarketTheses(sym) : renderMarketSecondary(sym, tab)}</section>`;
}

function renderMarketOverview(sym) {
  return `<div class="market-grid"><section class="data-section"><div class="row-between"><h2>Price</h2><span class="pill">3M</span></div><div class="market-chart">${Array.from({ length: 36 }, (_, i) => `<i style="height:${34 + ((i * 17) % 52)}%"></i>`).join('')}</div></section><aside class="data-section"><span class="eyebrow">Active anomaly</span><h2>${esc(sym)} moved above its 20-day range</h2><p class="muted t13">Regular session · +4.2% versus previous close · source fields shown as returned.</p><button class="btn" style="margin-top:14px">Open anomaly</button></aside></div><section class="data-section"><div class="row-between"><h2>Theses on ${esc(sym)}</h2><button class="btn" data-go="market/${sym}/theses">See all</button></div><div class="discover-grid theses-grid">${visibleTheses().filter((t) => symbols(t).includes(sym)).slice(0, 3).map((t) => `<article class="object-card thesis-object" data-go="thesis/${t.id}"><h2>${esc(firstParagraph(t))}</h2><p>${esc(secondParagraph(t))}</p></article>`).join('')}</div></section>`;
}

function renderMarketTheses(sym) {
  const list = visibleTheses().filter((t) => symbols(t).includes(sym));
  return `<div class="row-between" style="margin-bottom:14px"><span class="muted t12">Public theses about ${esc(sym)}</span><button class="btn primary" data-action="new-thesis">Write a thesis</button></div><div class="discover-grid theses-grid">${list.map((t) => `<article class="object-card thesis-object" data-go="thesis/${t.id}"><span class="eyebrow">${esc(author(t.authorId).name)}</span><h2>${esc(firstParagraph(t))}</h2><p>${esc(secondParagraph(t))}</p></article>`).join('')}</div>`;
}

function renderMarketSecondary(sym, tab) {
  const copy = tab === 'narratives' ? ['Capacity over demand', 'The debate has moved from adoption to delivery timing.'] : tab === 'anomalies' ? ['Recent anomalies', 'History is ordered by occurrence time and keeps source attribution.'] : ['Peers', `${sym} is compared with companies from the same entity catalog.`];
  return `<section class="data-section"><h2>${copy[0]}</h2><p class="muted t13">${copy[1]}</p><div class="quiet-list" style="margin-top:16px"><article class="quiet-row"><div class="grow"><b>Latest verified item</b><p>As of Sep 22 · source available · no unsupported fields added</p></div><button class="btn" data-action="open-command">Ask Alva</button></article></div></section>`;
}

function publicationList(category) {
  let ids = ['gavin-ai-flow', 'ackman-power', 'dylan-rubin', 'kobeissi-retail', 'munster-distribution', 'semi-tpu'];
  if (category === 'contrarian') ids = ['ackman-power', 'damodaran-capex', 'semi-tpu', 'maya-memory'];
  if (category === 'people') ids = ['gavin-ai-flow', 'satya-azure', 'beth-nvda', 'dylan-rubin'];
  return ids.map(thesis).filter(Boolean);
}

function storyImage(t) {
  const img = mediaFor(t)[0];
  if (img) return `<img class="pub-media" src="${esc(img.img)}" alt="${esc(img.alt || '')}">`;
  const sym = symbols(t)[0] || 'NVDA';
  return `<div class="pub-media pub-placeholder">${tickerMark(sym)}<span>${esc(TICKERS[sym]?.name || sym)}</span></div>`;
}

function renderPublication() {
  const category = state.route.parts[1] || 'top'; const list = publicationList(category); const lead = list[0]; const a = author(lead.authorId); const cats = [['top', 'Top theses'], ['infrastructure', 'AI infrastructure'], ['contrarian', 'Contrarian'], ['people', 'People']];
  return `<section class="publication"><header class="pub-header"><span class="logo">A</span><span class="pub-wordmark">Alva Thesis</span><span class="grow"></span><button class="icon-btn" data-action="open-search" aria-label="Search">${icon('search-l', 15)}</button><button class="btn" data-go="alva/inbox">Open Alva</button><button class="btn primary" data-action="new-thesis">Write</button></header><nav class="pub-nav">${cats.map(([key, label]) => `<button class="${category === key ? 'on' : ''}" data-go="public/${key}">${label}</button>`).join('')}</nav><main class="pub-page"><article class="pub-lead"><div class="pub-lead-copy"><span class="eyebrow">The big view · ${esc(lead.time)}</span><h1 data-action="pub-read" data-id="${lead.id}">${esc(firstParagraph(lead))}</h1><p>${esc(secondParagraph(lead))}</p><div class="row12" style="margin-top:20px">${avatar(a, 'lg')}<div><div class="t13 medium">${esc(a.name)}</div><div class="muted t12">${esc(a.role)}</div></div></div><div class="pub-ask" data-action="open-command">${icon('chat-ai-l', 16)}<span class="grow muted t13">Ask Alva about this thesis…</span><button class="btn brand">Ask</button></div></div><div data-action="pub-read" data-id="${lead.id}">${storyImage(lead)}</div></article><section class="pub-stories">${list.slice(1, 4).map((t) => `<article class="pub-story" data-action="pub-read" data-id="${t.id}">${storyImage(t)}<div class="eyebrow" style="margin-top:12px">${esc(symbols(t).join(' · ') || 'Macro')}</div><h2>${esc(firstParagraph(t))}</h2><p>${esc(author(t.authorId).name)} · ${esc(t.time)}</p></article>`).join('')}</section></main></section>`;
}

function renderCapabilityMap() {
  const rows = [
    ['Alva Agent · /', 'Alva / Timeline, Inbox, Tasks, Alerts, Memory, Files', 'Long-running Agent Channel retained'],
    ['New Chat · /new_chat', 'Global New menu + command palette', 'Separate ordinary session retained'],
    ['Explore / Playbooks', 'Discover / Playbooks', 'Star, Subscribe, Feed Alert and Trade remain distinct'],
    ['Market / Company', 'Discover / Tickers → Company Entity', 'Market search and entity route retained'],
    ['Channels', 'Spaces', 'Chat, Tasks, Alerts, Memory and Files retained per channel'],
    ['Portfolio', 'Portfolio', 'Account tabs, positions, activity and strategy binding retained'],
    ['Automations', 'Studio / Automations + Alva Tasks', 'One management object; no separate Feed entry'],
    ['Profile / Account / Billing', 'User menu + Settings', 'Credits, plan, profile, API Key and logout retained'],
    ['Creator Earnings', 'Studio / Earnings', 'Paid Playbook earnings retained'],
    ['Thesis', 'Discover + Inbox + Company + Studio → Thesis workspace', 'Research Desk is a detail mode, not a global shell'],
    ['Public sharing / SEO', 'Public Web', 'Publication surface stays outside signed-in product shell'],
  ];
  return `<section class="map-page"><div class="map-head"><span class="eyebrow">Complete architecture check</span><h1>现有能力没有消失，只是重新落位</h1><p>这张表用 Product Spec 的对象边界检查大改造方案。Thesis 体验嵌入完整 Alva，而不是替代完整 Alva。</p></div><div class="map-table"><div class="map-row head"><span>现有入口 / 对象</span><span>新架构落点</span><span>边界</span></div>${rows.map((r) => `<div class="map-row"><span><b>${esc(r[0])}</b></span><span>${esc(r[1])}</span><span class="muted">${esc(r[2])}</span></div>`).join('')}</div></section>`;
}

function renderReader(t) {
  const a = author(t.authorId); const media = mediaFor(t);
  return `<section class="reading-sheet"><header class="reader-bar"><button class="icon-btn" data-action="close-reader" aria-label="Close">${icon('close-l1', 16)}</button><span class="t13 medium">Alva Thesis</span><span class="grow"></span><button class="btn">${icon('bookmark-l', 14)} Save</button><button class="btn primary" data-action="open-command">${icon('chat-ai-l', 14)} Ask Alva</button></header><article class="reader"><span class="eyebrow">${esc(symbols(t).join(' · ') || 'Thesis')} · ${esc(t.time)}</span><h1>${esc(firstParagraph(t))}</h1><div class="row12" style="margin-bottom:26px">${avatar(a, 'lg')}<div><div class="t13 medium">${esc(a.name)}</div><div class="muted t12">${esc(a.role)}</div></div></div>${current(t).paragraphs.slice(1).map((p) => `<p>${esc(p)}</p>`).join('')}${media[0] ? `<img class="pub-media" src="${esc(media[0].img)}" alt="${esc(media[0].alt || '')}">` : ''}<div class="pub-ask" data-action="open-command">${icon('chat-ai-l', 16)}<span class="grow muted t13">Ask Alva about this argument…</span><button class="btn brand">Ask</button></div></article></section>`;
}

function renderCommandModal() {
  if (!state.commandOpen) return '';
  const search = state.commandMode === 'search';
  const suggestions = search ? ['NVDA', 'Gavin Baker', 'AI infrastructure thesis', 'Attribution Analysis Strategy'] : ['Summarize current context', 'Find the strongest contradiction', 'Create an Automation', 'Start a separate New Chat'];
  return `<div class="modal-backdrop" data-action="close-command"><div class="command-modal" data-stop><div class="row-between"><div><span class="eyebrow">${search ? 'Global search' : 'Alva context'}</span><h2>${esc(routeContext())}</h2></div><button class="icon-btn" data-action="close-command" aria-label="Close">${icon('close-l1', 16)}</button></div><label class="command-input">${icon(search ? 'search-l' : 'chat-ai-l', 18)}<textarea data-input="command" placeholder="${search ? 'Search tickers, people, theses, playbooks, chats…' : 'Ask, research, build, or start a new chat…'}"></textarea><button class="btn primary" data-action="command-send">${search ? 'Search' : 'Send'}</button></label>${state.commandAnswer ? `<div class="ai-answer">${esc(state.commandAnswer)}</div>` : `<div class="command-suggestions">${suggestions.map((x) => `<button class="btn" data-action="command-suggest" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div>`}<div class="boundary-note">${search ? 'Search spans object types; Market still owns Company Entity pages.' : 'This command uses the visible context. New Chat creates a separate ordinary session.'}</div></div></div>`;
}

function renderCreateMenu() {
  if (!state.createOpen) return '';
  return `<div class="modal-backdrop" data-action="close-create"><div class="create-modal" data-stop><div class="row-between"><h2>Create</h2><button class="icon-btn" data-action="close-create">${icon('close-l1', 16)}</button></div><div class="create-grid"><button data-action="new-chat"><span class="create-icon">${icon('chat-new-l', 20)}</span><b>New chat</b><small>Separate ordinary Web session</small></button><button data-action="new-thesis"><span class="create-icon">${icon('edit-l1', 20)}</span><b>New thesis</b><small>Write or create with Alva</small></button><button data-action="new-space"><span class="create-icon">${icon('sidebar-channel-normal', 20)}</span><b>New space</b><small>Topic or KOL digest channel</small></button></div></div></div>`;
}

function renderUserMenu() {
  if (!state.userOpen) return '';
  return `<div class="menu-scrim" data-action="close-user"><aside class="user-menu" data-stop><div class="row12 user-profile-row">${avatar(author('yggyll'), 'lg')}<div class="grow"><b>YGGYLL</b><div class="muted t12">sheer@alva.xyz</div></div><span class="pill brand">Pro</span></div><div class="usage-card"><span class="eyebrow">Available credits</span><strong>12,000</strong><span class="muted t11">Daily 1,000 · Monthly 3,000 · Pack 12,000</span></div><button data-go="studio/theses">Public profile</button><button data-action="open-settings" data-tab="account">Account & Settings</button><button data-action="open-settings" data-tab="billing">Billing & Usage</button><button data-go="studio/earnings">Creator Earnings</button><button data-action="open-settings" data-tab="automations">Automation settings</button><button>Referral</button><button>Log out</button></aside></div>`;
}

function renderSettings() {
  if (!state.settingsOpen) return '';
  const tabs = [['account', 'Account'], ['billing', 'Billing'], ['portfolio-settings', 'Portfolio'], ['alva-agent', 'Alva Agent'], ['automations', 'Automations'], ['api-key', 'API Key']];
  return `<div class="modal-backdrop settings-backdrop"><div class="settings-modal" data-stop><aside><div class="row-between settings-title"><b>Settings</b><button class="icon-btn" data-action="close-settings">${icon('close-l1', 16)}</button></div>${tabs.map(([key, label]) => `<button class="${state.settingsTab === key ? 'on' : ''}" data-action="settings-tab" data-tab="${key}">${label}</button>`).join('')}</aside><main>${renderSettingsPanel()}</main></div></div>`;
}

function renderSettingsPanel() {
  const tab = state.settingsTab;
  if (tab === 'account') return `<h2>Account</h2><p class="muted">Edit profile, nickname, bio and login sources.</p><div class="settings-block"><label>Nickname<input value="YGGYLL"></label><label>Bio<textarea>Momentum & breakouts · US tech</textarea></label><button class="btn primary">Save changes</button></div>`;
  if (tab === 'billing') return `<h2>Billing & Usage</h2><p class="muted">Pro Annual · renews Dec 23, 2026</p><div class="portfolio-summary compact"><section><span class="eyebrow">Daily</span><strong>1,000</strong></section><section><span class="eyebrow">Monthly</span><strong>3,000</strong></section><section><span class="eyebrow">Pack</span><strong>12,000</strong></section></div>`;
  if (tab === 'portfolio-settings') return `<h2>Portfolio Settings</h2><p class="muted">Connected accounts, global risk rules and notifications.</p><div class="settings-block"><b>Max single order</b><span>$5,000</span></div><div class="settings-block"><b>Max daily turnover</b><span>25%</span></div>`;
  if (tab === 'alva-agent') return `<h2>Alva Agent</h2><p class="muted">Persona and active IM provider.</p><div class="settings-block"><b>Telegram</b><span class="pill green">Active</span></div><div class="settings-block"><b>Persona</b><span>Direct, evidence-first, concise</span></div>`;
  if (tab === 'automations') return `<h2>Automations</h2><p class="muted">Pause, resume, delete and inspect runtime diagnostics.</p>${renderStudioAutomations()}`;
  return `<h2>API Key</h2><p class="muted">Let agents use Alva Skills and store third-party API credentials.</p><div class="settings-block"><b>Alva API key</b><code>alva_sk_••••••••••••8F2A</code><button class="btn">Rotate</button></div>`;
}

function renderDraft() {
  if (!state.draft) return '';
  const t = thesis(state.draft.id) || thesis('gavin-ai-flow');
  return `<div class="modal-backdrop" data-action="close-draft"><div class="modal" data-stop><div class="row-between"><h2>${state.draft.kind === 'new' ? 'New thesis' : 'Draft thesis update'}</h2><button class="icon-btn" data-action="close-draft">${icon('close-l1', 16)}</button></div><div class="muted t12" style="margin-top:8px">Public · ${symbols(t).join(' · ') || 'Add ticker'}</div><textarea>${state.draft.kind === 'new' ? '' : esc(secondParagraph(t)) + '\n\nNew evidence: ' + esc(signalList(t)[0]?.text || '')}</textarea><div class="row-between" style="margin-top:12px"><button class="btn" data-action="open-command">Create with Alva</button><div class="row8"><button class="btn" data-action="close-draft">Cancel</button><button class="btn primary" data-action="save-draft">Save draft</button></div></div></div></div>`;
}

function renderLayer() {
  return `${state.reader ? renderReader(thesis(state.reader)) : ''}${renderCommandModal()}${renderCreateMenu()}${renderUserMenu()}${renderSettings()}${renderDraft()}${state.toast ? `<div class="toast">${esc(state.toast)}</div>` : ''}`;
}

function renderPage() {
  const page = state.route.page;
  if (page === 'public') return renderPublication();
  if (page === 'map') return renderCapabilityMap();
  const content = page === 'alva' ? renderAlva() : page === 'discover' ? renderDiscover() : page === 'spaces' ? renderSpaces() : page === 'portfolio' ? renderPortfolio() : page === 'studio' ? renderStudio() : page === 'thesis' ? renderThesisDetail() : renderMarket();
  return renderProductShell(content);
}

let lastRouteKey = '';
function render() {
  const nextRoute = parseRoute();
  const nextRouteKey = nextRoute.parts.join('/');
  if (nextRouteKey !== lastRouteKey) {
    lastRouteKey = nextRouteKey;
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }
  state.route = nextRoute;
  $('#concept-strip').innerHTML = renderDemoStrip();
  $('#app').innerHTML = renderPage();
  $('#layer').innerHTML = renderLayer();
}

function showToast(text) {
  state.toast = text; render(); clearTimeout(showToast.t);
  showToast.t = setTimeout(() => { state.toast = ''; $('#layer').innerHTML = renderLayer(); }, 1800);
}

function nextInboxItem() {
  const next = INBOX_ITEMS.find((x) => !state.inboxStatus[x.id]);
  if (next) state.inboxItem = next.id;
}

document.addEventListener('click', (event) => {
  const goEl = event.target.closest('[data-go]');
  if (goEl) { go(goEl.dataset.go); return; }
  const node = event.target.closest('[data-node]');
  if (node) { state.graphNode = node.dataset.node; state.graphAnswer = ''; render(); return; }
  const actionEl = event.target.closest('[data-action]');
  if (!actionEl) return;
  const action = actionEl.dataset.action; const id = actionEl.dataset.id;
  if (actionEl.matches('.modal-backdrop, .menu-scrim') && event.target.closest('[data-stop]')) return;
  if (action === 'inbox-select') { state.inboxItem = id; render(); }
  else if (action === 'inbox-accept') { state.inboxStatus[id] = 'Accepted'; nextInboxItem(); showToast('Signal accepted'); }
  else if (action === 'inbox-snooze') { state.inboxStatus[id] = 'Snoozed until event'; nextInboxItem(); showToast('Signal snoozed'); }
  else if (action === 'inbox-dismiss') { state.inboxStatus[id] = 'Not relevant'; nextInboxItem(); showToast('Removed from inbox'); }
  else if (action === 'inbox-draft' || action === 'draft-thesis') { state.draft = { id, kind: 'update' }; render(); }
  else if (action === 'new-thesis') { state.createOpen = false; state.draft = { id: 'gavin-ai-flow', kind: 'new' }; render(); }
  else if (action === 'save-draft') { state.draft = null; showToast('Draft saved'); }
  else if (action === 'close-draft') { state.draft = null; render(); }
  else if (action === 'open-command') { state.commandOpen = true; state.commandMode = 'ask'; state.commandAnswer = ''; render(); }
  else if (action === 'open-search') { state.commandOpen = true; state.commandMode = 'search'; state.commandAnswer = ''; render(); }
  else if (action === 'close-command') { state.commandOpen = false; render(); }
  else if (action === 'command-suggest') { state.commandAnswer = `${actionEl.dataset.value}: ready to continue with ${routeContext()} as context.`; render(); }
  else if (action === 'command-send') { const q = $('[data-input="command"]')?.value.trim(); state.commandAnswer = state.commandMode === 'search' ? `Results grouped across Tickers, People, Theses, Playbooks and Chats for “${q || 'all'}”.` : `I will use ${routeContext()} as context. This remains a Global Chat action unless you explicitly create an Automation.`; render(); }
  else if (action === 'open-create') { state.createOpen = true; render(); }
  else if (action === 'close-create') { state.createOpen = false; render(); }
  else if (action === 'new-chat') { state.createOpen = false; state.commandOpen = true; state.commandMode = 'ask'; state.commandAnswer = 'New Chat started as a separate ordinary session. It does not inherit the Agent Channel timeline.'; render(); }
  else if (action === 'new-space') { state.createOpen = false; go('spaces/nvda/research'); showToast('New Space uses a topic or KOL digest channel'); }
  else if (action === 'open-user') { state.userOpen = true; render(); }
  else if (action === 'close-user') { state.userOpen = false; render(); }
  else if (action === 'open-settings') { state.userOpen = false; state.settingsOpen = true; state.settingsTab = actionEl.dataset.tab || 'account'; render(); }
  else if (action === 'close-settings') { state.settingsOpen = false; render(); }
  else if (action === 'settings-tab') { state.settingsTab = actionEl.dataset.tab; render(); }
  else if (action === 'graph-reset') { state.graphQ = ''; state.graphNode = 'capacity'; state.graphAnswer = ''; render(); }
  else if (action === 'graph-explain') { state.graphAnswer = 'Demand is broadly supported. The active contradiction is timing: power constraints delay conversion into recognized revenue.'; render(); }
  else if (action === 'pub-read') { state.reader = id; render(); }
  else if (action === 'close-reader') { state.reader = null; render(); }
  else if (action === 'connect-account') showToast('Connect Account flow: broker → access → credentials → account-scoped Portfolio');
});

document.addEventListener('input', (event) => {
  if (event.target.dataset.input === 'graph-search') {
    state.graphQ = event.target.value; render();
    const input = $('[data-input="graph-search"]'); if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); state.commandOpen = true; state.commandMode = 'search'; render(); }
  if (event.key === 'Escape') {
    if (state.reader) state.reader = null;
    else if (state.commandOpen) state.commandOpen = false;
    else if (state.createOpen) state.createOpen = false;
    else if (state.userOpen) state.userOpen = false;
    else if (state.settingsOpen) state.settingsOpen = false;
    else if (state.draft) state.draft = null;
    else return;
    render();
  }
});

window.addEventListener('hashchange', render);
if (!location.hash) location.hash = '#/alva/inbox';
render();
