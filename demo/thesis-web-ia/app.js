// Thesis · Web IA demo — 五方案共用一套渲染，DIRS 决定入口 / 导航 / 布局差异（E 另有自己的外壳）。无框架、无构建。
import { AUTHORS, THESES, TICKERS, COMPANY_NAMES, PLAYBOOKS, PLAYBOOK_NAV_ITEMS, CREATOR_AVATARS, AVATAR_COLOR_PALETTE, BRAND, SIDEBAR, PEOPLE_TO_FOLLOW, FOLLOWING, TRENDING, WATCHLIST, MERGED_FOLLOWING, SIGNALS, SIGNAL_POOL, ABOUT, NOTES, OVERVIEW, ROOT, TD, SNAPSHOT_URL, ICON_CDN, tickerLogo } from './data.js?v=20260925q';

/* ══════════ 方案配置 ══════════ */
const DIRS = {
  a: { key: 'a', short: 'A', name: '挂进现有骨架', home: 'explore/theses', screens: ['explore', 'thesis', 'profile', 'company', 'activity'], compose: 'modal', search: 'tickers', profileTabs: ['playbooks', 'theses', 'starred', 'purchased'], detail: 'single', cta: 'chat', exploreTabs: ['theses', 'playbooks', 'people'], tickerDir: false },
  b: { key: 'b', short: 'B', name: 'For You 一级入口', home: 'foryou', screens: ['foryou', 'explore', 'thesis', 'profile', 'company', 'activity'], compose: 'inline', search: 'all', profileTabs: ['playbooks', 'theses', 'starred', 'purchased'], detail: 'single', cta: 'chat', exploreTabs: ['theses', 'playbooks', 'people', 'tickers'] },
  // 大改造方案：换壳。topnav = 顶栏内容站。
  e: { key: 'e', short: 'C', name: '内容站 · 顶栏', home: 'foryou', screens: ['foryou', 'explore', 'markets', 'company', 'thesis', 'profile', 'write', 'alva'], compose: 'page', search: 'all', profileTabs: ['theses', 'playbooks', 'starred'], detail: 'article', cta: 'chat', exploreTabs: ['theses', 'playbooks', 'people'], shell: 'topnav' },
};
const SCREEN_LABEL = { overview: '总览', foryou: 'For You', explore: 'Explore', thesis: 'Thesis', profile: 'Profile', company: 'Company', write: 'Write', markets: 'Markets', activity: 'Activity', alva: 'Alva Agent' };
const TAB_LABEL = { playbooks: 'Playbooks', theses: 'Theses', starred: 'Starred', purchased: 'Purchased', people: 'People', tickers: 'Tickers' };
const TAGS = { new: 'New thesis', update: 'Thesis update', archived: 'Archived', private: 'Private', latest: 'Latest' };
// Sidebar 订阅区的四种做法（与 A/B/C 正交），每个方案有自己的默认值
const SB_DEFAULT = { a: 'playbooks', b: 'merged', e: 'merged' };
const PATCH_DIRS = ['a', 'b']; // 线一四个补丁（新建入口 / 详情右栏 / 全局搜索 / Activity）生效的方案
const ENTRY_OPTIONS = [['plus', '入口：小标题 +'], ['nav', '入口：导航项'], ['row', '入口：组内首行'], ['cta2', '入口：双 CTA']]; // e 只在 Work 模式用到
const SB_OPTIONS = [['playbooks', '订阅区：Playbooks'], ['following', '订阅区：Following 分组'], ['merged', '订阅区：Following 混排']];

/* ══════════ 状态 ══════════ */
const state = {
  dir: 'b', screen: 'overview', param: null, query: {},
  chat: { open: false, ctx: null, msgs: [], typing: false, mode: 'idle' },
  notes: false, toast: null, menu: null, menuRect: null, modal: null,
  tab: 'signals', feedTab: 'foryou', exploreFilter: 'all', profileTab: null, profileFilter: 'active', companyTab: 'theses', companyRange: 3, companyFilter: 'all',
  composer: { open: false, mode: 'inline', kind: 'new', text: '', tickers: [], removed: [], media: [], visibility: 'public', thesisId: null, polish: null, alert: false, alertDismissed: false },
  search: { open: false, q: '', recent: ['NVDA', 'Chamath Palihapitiya'] },
  pickerQ: '', sb: null, mergeMarkets: true, exploreQ: '',
  followed: new Set(FOLLOWING), chosen: new Set(), xConnected: false, subscribed: new Set(), watchlist: new Set(WATCHLIST),
  scrollTop: null, focus: null,
  mode: 'read', termFilter: 'all', // E 的 Read / Work；G 终端页的 All / Following / Mine
  agent: { channel: 'agent', tab: 'chat', chatIdx: 0 }, // C 的 Alva 页：当前频道 / tab / 选中的历史 chat
  quickPost: false, // C 的补丁：For You 顶部快速发表（照 X）
  entry: 'plus', detailRail: false, globalSearch: false, activity: false, activityFilter: 'all', guest: false, // 线一补丁四个开关 + M 客态
};

/* ══════════ 小工具 ══════════ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = (name, size = 16, cls = '') => `<i class="ic ${cls}" style="--u:url('${ICON_CDN}${name}.svg');width:${size}px;height:${size}px"></i>`;
const licon = (name, size = 20, cls = '') => `<i class="ic ${cls}" style="--u:url('icons/${name}.svg');width:${size}px;height:${size}px"></i>`; // app 编辑器图标（bold-l / ticker-l / polish-l / image-l / generate-l），CDN 没有，从 Figma 稿导出
const byId = (id) => THESES.find((t) => t.id === id);
const A = (id) => AUTHORS[id];
const sym = (x) => (typeof x === 'string' ? x : x.symbol);
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const tag = (k) => `<span class="tag ${k}">${TAGS[k]}</span>`;
const ARROW_OUT = '<svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.6 7.4 7.4 2.6M3.7 2.6h3.7v3.7" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const PLUS = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.75V12.25M1.75 7H12.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
const squares = () => '<span class="squares"><i></i><i></i><i></i><i></i></span>';

function avatar(a, size = 32) {
  if (!a) return '';
  if (a.avatar) return `<img class="av" src="${a.avatar}" alt="" style="width:${size}px;height:${size}px">`;
  return `<span class="av av-i" style="width:${size}px;height:${size}px;background:${a.color || '#6b7280'};font-size:${Math.round(size * .44)}px">${esc((a.initial || a.name[0]).toUpperCase())}</span>`;
}
function logoImg(s, size = 16) {
  const u = tickerLogo(s);
  if (u) return `<img class="tlogo" src="${u}" alt="" style="width:${size}px;height:${size}px">`;
  return `<span class="tl-i" style="width:${size}px;height:${size}px;font-size:${Math.round(size * .5)}px">${esc(s[0])}</span>`;
}
const sourceLink = (s, size = 12) => s ? `<a class="src t${size}" href="${esc(s.href || '#')}" target="_blank" rel="noreferrer"><span>${esc(s.label)}</span>${ARROW_OUT}</a>` : '';
const botBadge = () => `<span class="tag bot" title="Compiled from public information. Not affiliated with Alva.">${icon('bot-l', 10)}</span>`;
function tickerChip(t, { nav = true, since = null } = {}) {
  const s = typeof t === 'string' ? { symbol: t } : t;
  // since = 发布以来这只票的涨跌（H：价格钉直接挂在芯片上，不再单开左列）
  const pin = since ? `<span class="since ${since.pct >= 0 ? 'up' : 'down'}" title="Since publish · ${fmtPrice(since.p0)} → ${fmtPrice(since.now)}">${Math.abs(since.pct) < 0.005 ? '0%' : fmtPct(since.pct)}</span>` : '';
  return `<span class="chip tk" ${nav ? `data-go="${state.dir}/company/${s.symbol}"` : ''}>${logoImg(s.symbol, 16)}<span>${esc(s.symbol)}</span>${s.direction && DIRS[state.dir].tickerDir !== false ? `<span class="dir ${s.direction}">${icon('arrow-up-l1', 8)}</span>` : ''}${pin}</span>`;
}
function followBtn(a, sz = '') {
  if (!a || a.me) return '';
  const on = state.followed.has(a.id);
  return `<button class="btn ${on ? 'sec' : 'pri'} ${sz}" data-action="follow" data-id="${a.id}">${on ? 'Following' : 'Follow'}</button>`;
}
function emptyState(ic, title, text = '', extra = '') {
  return `<div class="empty"><div class="empty-ic">${icon(ic, 48)}</div><div><h3>${esc(title)}</h3>${text ? `<p>${esc(text)}</p>` : ''}</div>${extra}</div>`;
}

/* ══════════ 行情快照 → 图 ══════════ */
let snapshot = null, snapshotP = null;
function loadSnapshot() {
  return snapshotP ||= fetch(SNAPSHOT_URL).then((r) => (r.ok ? r.json() : null)).then((j) => { snapshot = j; hydrateCharts(); hydrateTimeline(); if (state.screen !== 'overview') render(); return j; }).catch(() => null);
}
const bars = (s) => snapshot?.series?.[s]?.bars || null;
function quote(s) {
  const b = bars(s); if (!b || b.length < 2) return null;
  const l = b.at(-1), p = b.at(-2); const chg = l.close - p.close;
  return { price: l.close, chg, pct: (chg / p.close) * 100, up: chg >= 0, date: l.time };
}
const fmtPrice = (v) => v.toLocaleString('en-US', { maximumFractionDigits: 2 });
const fmtPct = (v) => (v >= 0 ? '+' : '') + (+v.toFixed(2)) + '%';
const fmtChg = (v) => (v >= 0 ? '+' : '') + fmtPrice(v);
const fmtDate = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
let gid = 0;
function sparkSVG(closes, w, h, top = 24, { fill = true, stroke = 1.5, bottom = 8 } = {}) {
  if (!closes || closes.length < 2) return '';
  const min = Math.min(...closes), max = Math.max(...closes), rng = max - min || 1, n = closes.length;
  const x = (i) => (i / (n - 1)) * w; const y = (v) => top + (1 - (v - min) / rng) * (h - top - bottom);
  let d = ''; closes.forEach((v, i) => { d += `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)} `; });
  const up = closes.at(-1) >= closes[0]; const c = up ? '#2a9b7d' : '#e05357'; const id = 'g' + (++gid);
  const area = `${d}L${w} ${h} L0 ${h} Z`;
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".26"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs>${fill ? `<path d="${area}" fill="url(#${id})"/>` : ''}<path d="${d}" fill="none" stroke="${c}" stroke-width="${stroke}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`;
}
function windowCloses(b, months) {
  const end = new Date(b.at(-1).time + 'T00:00:00Z'); end.setUTCMonth(end.getUTCMonth() - months);
  const cut = end.toISOString().slice(0, 10); return b.filter((x) => x.time >= cut).map((x) => x.close);
}
function hydrateCharts() {
  if (!snapshot) { loadSnapshot(); return; }
  $$('[data-chart]:not([data-done])').forEach((el) => {
    el.dataset.done = '1'; const s = el.dataset.chart; const b = bars(s);
    if (!b) { el.insertAdjacentHTML('beforeend', '<div class="nochart">No price data</div>'); return; }
    el.insertAdjacentHTML('beforeend', sparkSVG(b.slice(-90).map((x) => x.close), 240, 135, 28));
    const q = quote(s); const last = el.querySelector('.q-last'); if (last && q) { last.textContent = fmtPrice(q.price); last.classList.add(q.up ? 'up' : 'down'); }
  });
  $$('[data-quote]:not([data-done])').forEach((el) => {
    el.dataset.done = '1'; const q = quote(el.dataset.quote);
    if (!q) { el.innerHTML = '<span class="n5">—</span>'; return; }
    if (el.classList.contains('sm')) { el.innerHTML = `<span class="qp">${fmtPrice(q.price)}</span><span class="qc ${q.up ? 'up' : 'down'}">${fmtPct(q.pct)}</span>`; return; }
    if (el.classList.contains('qmini')) { el.innerHTML = `<span class="${q.up ? 'up' : 'down'}">${fmtPct(q.pct)}</span>`; return; }
    el.innerHTML = `<span class="qp">${fmtPrice(q.price)} USD</span><span class="qc ${q.up ? 'up' : 'down'}">${fmtPct(q.pct)}</span>`;
  });
  $$('[data-bigquote]:not([data-done])').forEach((el) => {
    el.dataset.done = '1'; const q = quote(el.dataset.bigquote);
    if (!q) { el.innerHTML = '<div class="bigq"><div class="p n5">—</div></div>'; return; }
    el.innerHTML = `<div class="bigq"><div class="p"><span>${fmtPrice(q.price)}</span><span class="qc ${q.up ? 'up' : 'down'}">${fmtChg(q.chg)} (${fmtPct(q.pct)})</span></div><div class="d">At close · ${fmtDate(q.date)} · USD</div></div>`;
  });
  $$('[data-bigchart]:not([data-done])').forEach((el) => {
    el.dataset.done = '1'; const b = bars(el.dataset.bigchart);
    if (!b) { el.innerHTML = '<div class="ph-box">No price data in the demo snapshot for this ticker.</div>'; return; }
    el.innerHTML = sparkSVG(windowCloses(b, state.companyRange), Math.max(el.clientWidth, 320), 220, 12, { bottom: 4 });
  });
  $$('[data-spark]:not([data-done])').forEach((el) => {
    el.dataset.done = '1'; const b = bars(el.dataset.spark);
    el.innerHTML = b ? sparkSVG(b.slice(-60).map((x) => x.close), 200, 40, 2, { fill: false, stroke: 1.2, bottom: 2 }) : '';
  });
}

/* ══════════ 数据派生 ══════════ */
function signalsFor(t) {
  if (t.signalsPending) return [];
  let ids = t.signals ? t.signals.slice() : [];
  if (!ids.length) {
    for (const s of t.versions[0].tickers.map(sym)) for (const id of (SIGNAL_POOL[s] || [])) if (!ids.includes(id)) ids.push(id);
    if (!ids.length) ids = SIGNAL_POOL.GENERAL.slice();
  }
  return ids.map((id) => ({ id, ...SIGNALS[id] }));
}
const visibleTheses = () => THESES.filter((o) => o.status === 'active' && o.visibility !== 'private');
function relatedFor(t) {
  if (t.related) return t.related.map(byId).filter((o) => o && o.status === 'active' && o.visibility !== 'private');
  const syms = new Set(t.versions[0].tickers.map(sym));
  const pool = visibleTheses().filter((o) => o.id !== t.id);
  const hit = pool.filter((o) => o.versions[0].tickers.some((x) => syms.has(sym(x))));
  return (hit.length ? hit : pool.slice(0, 4)).slice(0, 10);
}
const thesesByTicker = (s) => visibleTheses().filter((o) => o.versions[0].tickers.some((x) => sym(x) === s));
function detectTickers(text) {
  const found = []; const up = text.toUpperCase(); const low = text.toLowerCase();
  for (const s of Object.keys(TICKERS)) { const re = new RegExp('(^|[^A-Z.])\\$?' + s.replace('.', '\\.') + '(?![A-Z])'); if (re.test(up)) found.push(s); }
  for (const [name, s] of Object.entries(COMPANY_NAMES)) if (low.includes(name) && !found.includes(s)) found.push(s);
  return found;
}

/* ══════════ 路由 ══════════ */
const homePath = (d) => `${d}/${DIRS[d].home}`;
const sbVariant = () => state.sb || SB_DEFAULT[state.dir];
const exploreTabsFor = (d) => (d === 'b' && !state.mergeMarkets ? [] : DIRS[d].exploreTabs);
function go(path) { const target = '#/' + path; if (location.hash === target) onRoute(); else location.hash = target; }
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, ''); const [path, qs] = raw.split('?');
  const parts = path.split('/').filter(Boolean); const query = Object.fromEntries(new URLSearchParams(qs || ''));
  if (!parts.length || parts[0] === 'overview') return { dir: state.dir, screen: 'overview', param: null, query };
  const dir = DIRS[parts[0]] ? parts[0] : 'b'; const d = DIRS[dir];
  let screen = parts[1] || d.home.split('/')[0]; let param = parts[2] ? decodeURIComponent(parts[2]) : null;
  if (!d.screens.includes(screen)) { screen = d.home.split('/')[0]; param = d.home.split('/')[1] || null; }
  return { dir, screen, param, query };
}
function onRoute() {
  const r = parseHash();
  const changed = r.screen !== state.screen || r.param !== state.param || r.dir !== state.dir;
  if (r.screen !== state.screen || r.dir !== state.dir) state.exploreQ = '';
  Object.assign(state, r);
  state.menu = null; state.modal = null; state.search.open = false;
  if (changed) {
    state.scrollTop = 0; state.tab = 'signals'; state.profileTab = null; state.profileFilter = 'active'; state.companyTab = 'theses'; state.companyFilter = 'all'; state.exploreFilter = 'all';
    if (state.composer.mode === 'inline' && r.screen !== 'foryou') state.composer.open = false;
    if (state.composer.mode === 'modal') state.composer.open = false;
    if (state.composer.mode === 'page' && r.screen !== 'write') state.composer.open = false;
    if (state.composer.mode === 'quick' && r.screen !== 'foryou') closeComposer();
    state.termFilter = 'all'; state.activityFilter = 'all'; state.agent.tab = 'chat';
  }
  if (r.screen === 'thesis' && state.chat.mode !== 'build') state.chat.ctx = { type: 'thesis', id: r.param };
  else if (state.chat.ctx?.type === 'thesis' && r.screen !== 'thesis' && r.screen !== 'alva') state.chat.ctx = null;
  // 深链用的演示开关：?chat=1 / notes=1 / compose=1 / search=1 / history=1
  const q = r.query;
  if (q.sb && SB_OPTIONS.some(([v]) => v === q.sb)) state.sb = q.sb;
  if (q.ptab) state.profileTab = q.ptab;
  if (q.menu) state.pendingMenu = q.menu;
  if (q.q != null && r.screen === 'explore') state.exploreQ = q.q;
  if (q.tab === 'related' || q.tab === 'signals') state.tab = q.tab;
  if (q.merge) state.mergeMarkets = q.merge === '1';
  if (q.chat === '1') openChat();
  if (q.notes === '1') state.notes = true;
  if (q.search === '1') { state.search.open = true; state.search.q = q.q || ''; }
  if (q.history === '1' && r.screen === 'thesis') state.modal = { type: 'history', id: r.param };
  if (q.compose === '1' && r.screen !== 'overview') { Object.assign(state.composer, { open: true, mode: r.screen === 'write' ? 'page' : r.screen === 'foryou' && DIRS[r.dir].compose === 'inline' ? 'inline' : 'modal', kind: 'new', text: q.text || '', tickers: q.text ? detectTickers(q.text) : [], removed: [], media: [], visibility: 'public', thesisId: null, polish: null, alert: false, alertDismissed: false }); }
  if (q.entry && ENTRY_OPTIONS.some(([v]) => v === q.entry)) state.entry = q.entry;
  if (q.quick) state.quickPost = q.quick === '1';
  if (q.rail) state.detailRail = q.rail === '1'; if (q.gsearch) state.globalSearch = q.gsearch === '1'; if (q.activity) state.activity = q.activity === '1'; if (q.guest) state.guest = q.guest === '1';
  // E 全页编辑器：直接进 write 也要有一个空 composer
  if (r.screen === 'write' && !state.composer.open) Object.assign(state.composer, { open: true, mode: 'page', kind: 'new', text: q.text || '', tickers: q.text ? detectTickers(q.text) : [], removed: [], media: [], visibility: 'public', thesisId: null, polish: null, alert: false, alertDismissed: false, publishing: false });
  if (q.build === '1') { state.chat.mode = 'idle'; startBuild(q.text || ''); return; } // 深链：直接进 Create with Alva
  render();
}
function switchDir(k) {
  if (state.screen === 'overview') return go(homePath(k));
  const d = DIRS[k];
  if (!d.screens.includes(state.screen)) return go(homePath(k));
  let p = state.param;
  if (state.screen === 'explore') { const tabs = exploreTabsFor(k); p = tabs.includes(p) ? p : (tabs[0] || null); }
  go(`${k}/${state.screen}${p ? '/' + encodeURIComponent(p) : ''}`);
}

/* ══════════ 渲染入口 ══════════ */
function render() {
  const sc = $('.main-scroll'); const prevKey = sc?.dataset.key; const prevTop = sc ? sc.scrollTop : 0;
  const key = `${state.dir}/${state.screen}/${state.param}`;
  $('#demo-strip').innerHTML = renderStrip();
  const frame = $('#frame'); const shell = DIRS[state.dir].shell;
  if (state.screen === 'overview') { frame.className = ''; frame.innerHTML = `<div class="main"><div class="main-scroll" data-key="${key}">${renderOverview()}</div></div>`; }
  else if (state.guest) { frame.className = 'topnav-shell public-shell'; frame.innerHTML = renderPublicShell(); } // M：客态公开页壳，对所有方案生效
  else if (shell === 'topnav') { frame.className = 'topnav-shell' + (state.chat.open && !(state.screen === 'write' && state.chat.mode === 'build') ? ' chat-open' : ''); frame.innerHTML = renderTopShell(); } // 抽屉开着时内容区让出右侧宽度、隐藏右栏
  else { frame.className = ''; frame.innerHTML = renderSidebar() + `<div class="main"><div class="main-scroll" data-key="${key}">${renderMain()}</div>${state.chat.open ? '' : `<button class="fab" data-action="open-chat">${icon('chat-ai-l', 18)}<span>Ask Alva</span></button>`}</div>` + renderChat(); }
  $('#layer').innerHTML = renderLayer();
  const nsc = $('.main-scroll'); if (nsc) nsc.scrollTop = state.scrollTop != null ? state.scrollTop : (prevKey === key ? prevTop : 0);
  state.scrollTop = null;
  const cb = $('#chat-body'); if (cb) cb.scrollTop = cb.scrollHeight;
  hydrateCharts(); hydrateTags(); hydrateMasonry(); hydrateTimeline(); afterRender();
}
function afterRender() {
  $$('.cp-text').forEach(autosize);
  if (state.pendingMenu) { const el = $(`[data-menu="${state.pendingMenu}"]`); state.pendingMenu = null; if (el) { state.menu = el.dataset.menu; state.menuRect = el.getBoundingClientRect(); render(); return; } }
  if (state.focus) {
    const sel = { composer: '.composer.open .cp-text, .cmp .cp-text, .ed .cp-text, .qpost .cp-text', chat: '.cin textarea', search: '.dlg-input input', picker: '.pk-search input', 'explore-search': '.page-head .search input' }[state.focus];
    const el = sel && $(sel); if (el) { el.focus(); if (el.setSelectionRange) { const n = el.value.length; el.setSelectionRange(n, n); } }
    state.focus = null;
  }
}
function autosize(el) { el.style.height = 'auto'; el.style.height = Math.max(el.classList.contains('size-modal') ? 160 : el.classList.contains('size-page') ? 240 : el.classList.contains('size-quick') ? 52 : 110, el.scrollHeight) + 'px'; }
function toast(text, ic = 'check-l1') { state.toast = { text, ic }; render(); clearTimeout(toast.t); toast.t = setTimeout(() => { state.toast = null; const el = $('.toast'); if (el) el.remove(); }, 2400); }

/* ══════════ demo 顶条 ══════════ */
function renderStrip() {
  const isOv = state.screen === 'overview'; const d = DIRS[state.dir];
  const states = [['default', '状态：默认'], ['first', '状态：首次进入'], ['empty', '状态：空列表'], ['error', '状态：加载失败']];
  // 顶部条只留一行：方案切换 · 竞品补丁开关和方案自己的下拉 · Demo index（对话框 / 说明 / 客态三个按钮已去掉，深链 ?chat=1 / ?notes=1 / ?guest=1 仍可用）
  const patches = isOv ? '' : `<div class="strip-patches"><span class="strip-lbl">竞品补丁</span>${PATCH_DIRS.includes(state.dir) ? `<select class="strip-sel" data-change="entry">${ENTRY_OPTIONS.map(([v, l]) => `<option value="${v}" ${state.entry === v ? 'selected' : ''}>${l}</option>`).join('')}</select><button class="strip-btn ${state.detailRail ? 'on' : ''}" data-action="toggle-rail">详情右栏 ${state.detailRail ? '开' : '关'}</button><button class="strip-btn ${state.globalSearch ? 'on' : ''}" data-action="toggle-gsearch">全局搜索 ${state.globalSearch ? '开' : '关'}</button><button class="strip-btn ${state.activity ? 'on' : ''}" data-action="toggle-activity">Activity ${state.activity ? '开' : '关'}</button>` : state.dir === 'e' ? `<button class="strip-btn ${state.quickPost ? 'on' : ''}" data-action="toggle-quickpost">顶部快速发表 ${state.quickPost ? '开' : '关'}</button>` : '<span class="strip-note">线一补丁只在 A / B 生效</span>'}${state.screen === 'foryou' ? `<select class="strip-sel" data-change="fystate">${states.map(([v, l]) => `<option value="${v}" ${(state.query.state || 'default') === v ? 'selected' : ''}>${l}</option>`).join('')}</select>` : ''}${d.shell ? '' : `<select class="strip-sel" data-change="sb">${SB_OPTIONS.map(([v, l]) => `<option value="${v}" ${sbVariant() === v ? 'selected' : ''}>${l}</option>`).join('')}</select>`}${state.dir === 'b' ? `<select class="strip-sel" data-change="merge"><option value="1" ${state.mergeMarkets ? 'selected' : ''}>Markets：合并</option><option value="0" ${state.mergeMarkets ? '' : 'selected'}>Markets：分开</option></select>` : ''}</div>`;
  return `<div class="strip-row1"><div class="strip-seg">${['a', 'b', 'e'].map((k) => `<button class="${!isOv && state.dir === k ? 'on' : ''}" data-action="dir" data-dir="${k}"><b>${DIRS[k].short}</b>${DIRS[k].name}</button>`).join('')}<button class="${isOv ? 'on' : ''}" data-go="overview">总览</button></div>${patches}<div class="strip-right"><a class="strip-link" href="/demo/">Demo index</a></div></div>`;
}

/* ══════════ Sidebar ══════════ */
// Sidebar 订阅区各组（Channels · Theses · Playbooks / Following · Chats）
function sbGroupsHTML(D, s, p, v, { channels = true, maxTheses = 6, afterChannels = '' } = {}) {
  const it = (label, ic, goTo, on, action) => `<div class="sb-item${on ? ' on' : ''}" ${goTo ? `data-go="${goTo}"` : ''} ${action ? `data-action="${action}"` : ''}>${icon(ic, 16)}<span>${esc(label)}</span></div>`;
  const grp = (label, items, action = '') => `<div class="sb-group"><div class="sb-head"><span class="sb-label">${label}</span>${action ? `<span class="sb-act">${action}</span>` : ''}</div>${items}</div>`;
  const personRow = (id) => `<div class="sb-item ${s === 'profile' && p === id ? 'on' : ''}" data-go="${D}/profile/${id}">${avatar(A(id), 16)}<span>${esc(A(id).name)}</span></div>`;
  const pbRow = (id) => { const pb = PLAYBOOK_NAV_ITEMS.find((x) => x.id === id); return `<div class="sb-item" data-action="noop-playbook">${creatorAvatar(pb.owner, 16)}<span>${esc(pb.title)}</span></div>`; };
  const pbItems = SIDEBAR.playbooks.map(pbRow).join('');
  const chatItems = SIDEBAR.chats.map((c) => it(c, 'chat-l1', null, false, 'open-chat')).join('');
  const followingRows = [...state.followed].slice(0, 6).map(personRow).join('');
  const mine = THESES.filter((t) => A(t.authorId).me && t.status === 'active');
  const savedOthers = THESES.filter((t) => t.saved && !A(t.authorId).me && t.status === 'active');
  const thesisRows = [...mine, ...savedOthers].slice(0, maxTheses).map((t) => { const a = A(t.authorId); return `<div class="sb-item ${s === 'thesis' && p === t.id ? 'on' : ''}" data-go="${D}/thesis/${t.id}">${avatar(a, 16)}<span>${a.me ? '' : esc(a.name) + ' · '}${esc(t.versions[0].paragraphs[0])}</span>${t.newSignals ? `<span class="sb-badge">${t.newSignals}</span>` : ''}</div>`; }).join('');
  // 三案一致：Theses 组固定有，+ 在小标题右侧（与 Channels 组同一写法），创建入口只此一处
  const entryRow = state.entry === 'row' && PATCH_DIRS.includes(D) ? `<div class="sb-item sb-entry" data-action="menu-fixed" data-menu="new-thesis">${icon('add-l2', 16)}<span>New thesis</span></div>` : ''; // 补丁：组内首行入口
  const thesesGroup = grp('Theses', entryRow + thesisRows, `<span data-action="menu-fixed" data-menu="new-thesis" title="New thesis">${icon('add-l2', 14)}</span>`);
  const mergedRows = MERGED_FOLLOWING.map((id) => (PLAYBOOK_NAV_ITEMS.some((x) => x.id === id) ? pbRow(id) : personRow(id))).join('');
  let groups = '';
  if (channels) groups += grp('Channels', it('Alva', 'sidebar-agent-normal', null, false, 'noop-channel') + SIDEBAR.channels.map((c) => it(c, 'sidebar-channel-normal', null, false, 'noop-channel')).join(''), `<span data-action="noop-channel" title="New channel">${icon('add-l2', 14)}</span>`);
  groups += afterChannels;
  groups += thesesGroup;
  if (v === 'playbooks') groups += grp('Playbooks', pbItems);
  else if (v === 'following') groups += grp('Following', followingRows) + grp('Playbooks', pbItems);
  else groups += grp('Following', mergedRows);
  groups += grp('Chats', chatItems);
  return groups;
}
function renderSidebar() {
  const D = state.dir; const d = DIRS[D]; const s = state.screen; const p = state.param;
  const it = (label, ic, goTo, on, action) => `<div class="sb-item${on ? ' on' : ''}" ${goTo ? `data-go="${goTo}"` : ''} ${action ? `data-action="${action}"` : ''}>${icon(ic, 16)}<span>${esc(label)}</span></div>`;
  const grp = (label, items, action = '') => `<div class="sb-group"><div class="sb-head"><span class="sb-label">${label}</span>${action ? `<span class="sb-act">${action}</span>` : ''}</div>${items}</div>`;
  let cta;
  if (d.cta === 'chat-menu') cta = `<div class="sb-cta"><button data-action="menu" data-menu="cta">${PLUS}<span>New Chat</span>${icon('arrow-down-l2', 12)}</button>${state.menu === 'cta' ? menuHTML([{ ic: 'chat-new-l', label: 'New chat', action: 'open-chat' }, { ic: 'edit-l1', label: 'New thesis', action: 'compose-new' }], 'left') : ''}</div>`;
  else if (d.cta === 'chat') cta = `<div class="sb-cta"><button data-action="noop-newchat">${PLUS}<span>New Chat</span></button></div>`;
  else cta = `<div class="sb-cta"><button data-action="compose-home">${PLUS}<span>New thesis</span></button></div>`;
  if (state.entry === 'cta2' && PATCH_DIRS.includes(D)) cta = `<div class="sb-cta dual"><button data-action="noop-newchat">${PLUS}<span>New Chat</span></button><button class="sec" data-action="menu-fixed" data-menu="new-thesis">${icon('edit-l1', 14)}<span>New thesis</span></button></div>`; // 补丁：双 CTA
  const searchRow = state.globalSearch && PATCH_DIRS.includes(D) ? `<button class="tl-search sb-search" data-action="search-open">${icon('search-l', 14)}<span>Search</span></button>` : ''; // 补丁：全局搜索行（照五家顶栏搜索）
  let nav = '';
  if (D === 'a') nav = it('Explore', 'sidebar-discover-normal', `${D}/explore/theses`, s === 'explore') + it('Portfolio', 'sidebar-portfolio-normal', null, false, 'noop-portfolio') + it('Markets', 'sidebar-k-normal', null, s === 'company', 'search-open');
  if (D === 'b') nav = it('For You', 'star-l', `${D}/foryou`, s === 'foryou') + it('Explore', 'sidebar-discover-normal', `${D}/explore${state.mergeMarkets ? '/theses' : ''}`, s === 'explore' || (state.mergeMarkets && s === 'company')) + (state.mergeMarkets ? '' : it('Markets', 'sidebar-k-normal', `${D}/company/NVDA`, s === 'company')) + it('Portfolio', 'sidebar-portfolio-normal', null, false, 'noop-portfolio');
  // E 的 Work 模式：Sidebar 用 B 的导航，Markets 单列（E 的 Markets 是独立落地页）
  if (D === 'e') nav = it('For You', 'star-l', 'e/foryou', s === 'foryou') + it('Explore', 'sidebar-discover-normal', 'e/explore/theses', s === 'explore') + it('Markets', 'sidebar-k-normal', 'e/markets', s === 'markets' || s === 'company') + it('Portfolio', 'sidebar-portfolio-normal', null, false, 'noop-portfolio');
  if (PATCH_DIRS.includes(D)) {
    if (state.entry === 'nav') { const item = `<div class="sb-item sb-entry" data-action="menu-fixed" data-menu="new-thesis">${icon('edit-l1', 16)}<span>New thesis</span></div>`; nav = D === 'a' ? item + nav : nav.replace('</div>', '</div>' + item); } // 补丁：导航项入口（For You 之后）
    if (state.activity) { const n = activityCount(); nav += it('Activity', 'notification-l', `${D}/activity`, s === 'activity').replace('</div>', `${n ? `<span class="sb-badge">${n}</span>` : ''}</div>`); } // 补丁：Activity 一级项
  }
  const groups = sbGroupsHTML(D, s, p, sbVariant());
  return `<aside class="sidebar">
    <div class="sb-logo"><img src="${ROOT}logo-alva.svg" alt="Alva"></div>
    ${cta}${searchRow}
    <div class="sb-group">${nav}</div>
    ${groups}
    <div class="sb-spacer"></div>
    <div class="sb-user" data-go="${D}/profile/yggyll">${avatar(A('yggyll'), 24)}<span class="trunc">YGGYLL</span></div>
  </aside>`;
}

/* ══════════ 主区分发 ══════════ */
function renderMain() {
  switch (state.screen) {
    case 'foryou': return state.dir === 'e' ? renderReading() : renderForYou();
    case 'explore': return renderExplore();
    case 'thesis': return renderThesis();
    case 'profile': return renderProfile();
    case 'company': return renderCompany();
    case 'activity': return renderActivity();
    case 'alva': return renderAlvaPage();
    case 'write': return renderWrite();
    case 'markets': return renderMarkets();
    default: return renderExplore();
  }
}

/* ══════════ 卡片与零件 ══════════ */
function thesisCard(t, v = 'feed') {
  const a = A(t.authorId); const cur = t.versions[0]; const saved = t.saved;
  const head = `<div class="card-head"><span class="row8" data-go="${state.dir}/profile/${a.id}">${avatar(a, v === 'grid' ? 28 : 32)}<span class="col"><span class="name">${esc(a.name)}${a.member === false ? botBadge() : ''}</span><span class="role trunc">${esc(a.role)}</span></span></span><span class="time t12 n5">${esc(t.time)}</span></div>`;
  return `<article class="card ${v}" data-thesis="${t.id}">
    ${head}
    <div class="tagrow">${t.status === 'archived' ? tag('archived') : tag(t.kind)}${t.visibility === 'private' ? tag('private') : ''}</div>
    <div class="card-body ${v === 'feed' ? '' : 'full'}" data-go="${state.dir}/thesis/${t.id}">${v === 'feed' ? cur.paragraphs.map((p) => esc(p)).join('<br>') : v === 'story' ? `<p class="lead">${esc(cur.paragraphs[0])}</p>${cur.paragraphs.length > 1 ? `<p class="rest">${cur.paragraphs.slice(1).map(esc).join(' ')}</p>` : ''}` : cur.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
    ${mediaRow(cur.media)}
    <div class="chips">${cur.tickers.map((x) => tickerChip(x, { since: DIRS[state.dir].detail === 'terminal' ? sincePublish(t, sym(x)) : null })).join('')}</div>
    ${v === 'related' ? '' : `<div class="card-actions"><button class="act" data-action="ask" data-id="${t.id}">${icon('chat-ai-l', 16)}<span>Ask Alva</span></button><button class="act ${saved ? 'on' : ''}" data-action="save" data-id="${t.id}">${icon(saved ? 'bookmark-f' : 'bookmark-l', 16)}<span>${t.saves}</span></button></div>`}
  </article>`;
}
function mediaRow(items) {
  if (!items?.length) return '';
  return `<div class="media-row">${items.map((m) => m.chart ? chartTile(m.chart) : `<div class="media"><img src="${m.img}" alt="${esc(m.alt || '')}" loading="lazy"></div>`).join('')}</div>`;
}
function chartTile(s) { const meta = TICKERS[s] || { name: s }; return `<div class="media chart" data-chart="${s}"><div class="chart-head"><span>${esc(meta.name)} · ${s}</span><span class="q-last"></span></div></div>`; }
function feedContent(v, t, { latestTag = true } = {}) {
  const status = v.latest && t ? `${t.status === 'archived' ? tag('archived') : ''}${t.visibility === 'private' ? tag('private') : ''}` : '';
  return `<div class="fc">
    <div class="row8 t12 n5"><span>${esc(v.time)}</span>${latestTag && v.latest ? tag('latest') : ''}${status}</div>
    <div class="fc-body">${v.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}<p class="mt12">${sourceLink(v.source)}</p></div>
    ${mediaRow(v.media)}
    <div class="chips">${v.tickers.map((x) => tickerChip(x)).join('')}</div>
  </div>`;
}
function rail24(isFirst, isLast) {
  return `<div class="rail24"><span class="dot"><i></i></span>${isFirst ? '' : '<span class="vline" style="top:0;height:3px"></span>'}${isLast ? '' : '<span class="vline" style="top:17px;bottom:0"></span>'}</div>`;
}
function signalCard(s) {
  const a = A(s.authorId);
  return `<div class="sig">
    <div class="sig-src"><div class="row8">${avatar(a, 24)}<span class="col grow"><span class="row8" style="justify-content:space-between"><span class="t12 med trunc">${esc(a.name)}</span><span class="t12 n5">${esc(s.time)}</span></span><span class="t12 n5 trunc">${esc(a.role)}</span></span></div><p>${esc(s.quote)} ${sourceLink({ label: s.link, href: 'https://' + s.link }, 14)}</p></div>
    <div class="sig-alva"><p>${esc(s.alva)}</p><span class="alva-chip"><img src="${TD}alva-inline-logo.svg" alt="">Alva</span></div>
  </div>`;
}
function evidence(t) {
  const sigs = signalsFor(t); const rel = relatedFor(t);
  const tabs = `<div class="tabs sticky" style="top:${state.screen === 'thesis' && ['single', 'terminal'].includes(DIRS[state.dir].detail) ? 64 : 0}px"><button class="${state.tab === 'signals' ? 'on' : ''}" data-action="tab" data-tab="signals">Signals <span class="cnt">(${t.signalsPending ? '…' : sigs.length})</span></button><button class="${state.tab === 'related' ? 'on' : ''}" data-action="tab" data-tab="related">Related theses <span class="cnt">(${rel.length})</span></button></div>`;
  let body;
  if (state.tab === 'signals') body = t.signalsPending ? `<div class="gen">${squares()}<div>Reviewing signals from the past 7 days.<br>This may take a few minutes…</div></div>` : sigs.map(signalCard).join('');
  else body = rel.length ? masonryHTML(rel, 'related', 2) : emptyState('search-l', 'No related theses');
  return tabs + body;
}
function menuHTML(items, align = 'right', extraClass = '') {
  return `<div class="menu ${align} ${extraClass}">${items.map((i) => `<div class="menu-item ${i.danger ? 'danger' : ''}" data-action="${i.action}" ${i.val ? `data-val="${esc(i.val)}"` : ''} ${i.id ? `data-id="${esc(i.id)}"` : ''}>${i.ic ? icon(i.ic, 16) : ''}<span class="col grow"><span>${esc(i.label)}</span>${i.sub ? `<span class="t12 n5">${esc(i.sub)}</span>` : ''}</span>${i.right || ''}</div>`).join('')}</div>`;
}
function ownerMenu(t) {
  const items = [];
  if (t.status !== 'archived') items.push({ ic: 'edit-l1', label: 'Update', action: 'update', id: t.id });
  items.push({ ic: t.status === 'archived' ? 'history-l' : 'archive-l', label: t.status === 'archived' ? 'Unarchive thesis' : 'Archive thesis', action: 'archive', id: t.id });
  items.push({ ic: t.visibility === 'private' ? 'unlocked-l' : 'locked-l', label: t.visibility === 'private' ? 'Make public' : 'Make private', action: 'privacy', id: t.id });
  return items;
}
function sharePop(t) {
  const vis = t.visibility;
  const row = (id, ic, title, desc) => `<button class="share-row ${vis === id ? 'on' : ''}" data-action="privacy-set" data-id="${t.id}" data-val="${id}"><span class="ico">${icon(ic, 20)}</span><span class="col grow"><span>${title}</span><span class="t12 n5">${desc}</span></span>${vis === id ? icon('check-l1', 16, 'n7') : ''}</button>`;
  return `<div class="menu share-pop"><div class="row8" style="justify-content:space-between"><span class="t16 med">Share</span><button class="act" data-action="menu-close">${icon('close-l1', 16)}</button></div><div class="share-box">${row('private', 'locked-l', 'Private', 'Only you can see this.')}<span class="hr" style="width:100%"></span>${row('public', 'go-l', 'Public', 'Anyone can view for free.')}</div><button class="btn sec lg" data-action="copy-link" style="width:100%">${icon('link-l', 18)}Copy Link</button></div>`;
}

/* ══════════ For You（B / C） ══════════ */
function renderForYou() {
  const D = state.dir; const isC = D === 'c'; const st = state.query.state || 'default';
  let list = visibleTheses().filter((t) => !A(t.authorId).me);
  if (isC && state.feedTab === 'following') list = list.filter((t) => state.followed.has(t.authorId));
  if (isC && state.feedTab === 'trending') list = [...list].sort((a, b) => b.saves - a.saves);
  const head = `<div class="page-head"><h1 class="title">${isC ? 'Home' : 'For You'}</h1>${isC ? `<div class="seg">${[['foryou', 'For you'], ['following', 'Following'], ['trending', 'Trending']].map(([k, l]) => `<button class="${state.feedTab === k ? 'on' : ''}" data-action="feedtab" data-tab="${k}">${l}</button>`).join('')}</div>` : ''}</div>`;
  let body;
  if (st === 'first') body = chooseWho();
  else if (st === 'empty') body = emptyState('search-l', 'Nothing new yet', 'Follow a few people or tickers and their theses will show up here.');
  else if (st === 'error') body = emptyState('close-l1', "Couldn't load", 'Try again in a moment.', `<button class="btn pri" data-action="fystate-reset">Retry</button>`);
  else body = (list.length ? list.map((t) => thesisCard(t, 'feed')).join('') : emptyState('search-l', 'Nothing new yet')) + `<div class="feed-end t12 n5">You're up to date</div>`;
  return `<div class="page foryou"><div class="fy-wrap"><div class="fy-main">${head}${st === 'first' ? '' : composerHTML('inline')}<div class="rail-inline">${railInline()}</div>${body}</div><aside class="rail">${railPeople()}${railTrending()}${isC ? railFollowing() : ''}</aside></div></div>`;
}
function personRow(a, size = 32) {
  return `<div class="prow"><span class="row8 grow" data-go="${state.dir}/profile/${a.id}">${avatar(a, size)}<span class="col grow"><span class="name trunc">${esc(a.name)}</span><span class="role trunc">${esc(a.role)}</span></span></span>${followBtn(a, 'sm')}</div>`;
}
function railPeople() {
  const ppl = PEOPLE_TO_FOLLOW.filter((id) => !state.followed.has(id)).slice(0, 5);
  return `<div class="rail-box"><div class="rail-title"><span>People to follow</span><button data-action="${state.dir === 'c' ? 'go-people' : 'search-open'}">See all</button></div>${ppl.map((id) => personRow(A(id))).join('') || '<p class="t12 n5">You follow everyone we suggested.</p>'}</div>`;
}
function railTrending() {
  return `<div class="rail-box"><div class="rail-title"><span>Trending tickers</span></div>${TRENDING.slice(0, 5).map((s) => `<div class="trow" data-go="${state.dir}/company/${s}">${logoImg(s, 24)}<span class="col grow"><span class="name">${s}</span><span class="role trunc">${esc(TICKERS[s].name)}</span></span><span class="q" data-quote="${s}"></span></div>`).join('')}</div>`;
}
function railFollowing() {
  return `<div class="rail-box"><div class="rail-title"><span>Following · ${state.followed.size}</span></div><div class="avstack">${[...state.followed].map((id) => `<span data-go="${state.dir}/profile/${id}" title="${esc(A(id).name)}">${avatar(A(id), 28)}</span>`).join('')}</div></div>`;
}
function railInline() {
  return `<button class="fchip" data-action="${state.dir === 'c' ? 'go-people' : 'search-open'}">${icon('user-profile-l', 12)}People to follow</button>${TRENDING.slice(0, 4).map((s) => `<button class="fchip" data-go="${state.dir}/company/${s}">${s}<span class="qmini" data-quote="${s}"></span></button>`).join('')}`;
}
function chooseWho() {
  const ppl = [...PEOPLE_TO_FOLLOW, ...FOLLOWING].slice(0, 8); const n = state.chosen.size;
  return `<div class="choose">
    <div><h2 class="t18 med">Choose who Alva reads</h2><p>Choose individual accounts or import from X. You can adjust this list later.</p></div>
    <div class="import-x"><span class="xlogo"><img src="${ROOT}logo-social-x.svg" alt="X"></span><span class="col grow"><span class="med">Import from X</span><span class="t12 n5">Bring in people you already follow</span></span>${state.xConnected ? '<span class="t12 m2">Connected · 12 people found</span>' : `<button class="btn blue sm" data-action="import-x">Connect</button>`}</div>
    <div class="or"><span></span><em>or</em><span></span></div>
    <div class="choose-grid">${ppl.map((id) => { const a = A(id); const on = state.chosen.has(id); return `<div class="pcard"><div class="row-between">${avatar(a, 40)}<button class="btn ${on ? 'sec' : 'pri'} sm" data-action="choose" data-id="${id}">${on ? 'Following' : 'Follow'}</button></div><span class="name trunc">${esc(a.name)}</span><span class="role">${esc(a.role)}</span></div>`; }).join('')}</div>
    <div class="choose-foot"><span class="t12 n5">${n} selected${state.xConnected ? ' · X connected' : ''}</span><button class="btn pri" data-action="choose-continue" ${n || state.xConnected ? '' : 'disabled'}>Continue</button></div>
  </div>`;
}

/* ══════════ Composer（inline / modal 共用） ══════════ */
function composerHTML(mode) {
  const c = state.composer; const me = A('yggyll');
  if (mode === 'inline' && !(c.open && c.mode === 'inline')) {
    return `<div class="composer collapsed" data-action="compose-open">${avatar(me, 32)}<span class="ph grow">What is your thesis and why?</span><button class="btn sec sm" data-action="build">${icon('chat-ai-l', 14)}Create with Alva</button><button class="btn pri sm" data-action="compose-open">Write</button></div>`;
  }
  const isUpdate = c.kind === 'update';
  const visMenu = state.menu === 'vis' ? menuHTML([{ ic: 'go-l', label: 'Public', sub: 'Anyone can view for free.', action: 'set-vis', val: 'public' }, { ic: 'locked-l', label: 'Private', sub: 'Only you can see this.', action: 'set-vis', val: 'private' }]) : '';
  const polishMenu = state.menu === 'polish' ? menuHTML([{ ic: 'refresh-l', label: 'Reformat', action: 'polish', val: 'reformat' }, { ic: 'minus-l1', label: 'Shorter', action: 'polish', val: 'shorter' }, { ic: 'add-l1', label: 'Enrich', action: 'polish', val: 'enrich' }], 'left') : '';
  return `<div class="composer open ${mode}">
    <div class="cp-head">${mode === 'modal' ? `<button class="act" data-action="compose-cancel">${icon('close-l1', 16)}</button>` : avatar(me, 32)}<span class="grow ${mode === 'modal' ? 't16 med' : 't14 med'}">${isUpdate ? 'Update thesis' : (mode === 'modal' ? 'New thesis' : 'New thesis')}</span>
      ${isUpdate ? '' : `<span class="menu-anchor"><button class="btn ghost sm" data-action="menu" data-menu="vis">${icon(c.visibility === 'public' ? 'go-l' : 'locked-l', 14)}${cap(c.visibility)}${icon('arrow-down-l2', 12)}</button>${visMenu}</span>`}
      <button class="btn ${isUpdate ? 'blue' : 'pri'} sm" data-action="compose-publish" ${c.text.trim() ? '' : 'disabled'}>${isUpdate ? 'Update' : 'Publish'}</button></div>
    <textarea class="cp-text size-${mode}" data-input="composer" placeholder="What is your thesis and why?">${esc(c.text)}</textarea>
    ${c.polish ? polishHTML() : ''}
    <div class="cp-media">${c.media.map((m, i) => `<div class="mtile"><img src="${m.img}" alt=""><button class="x" data-action="media-remove" data-i="${i}">${icon('close-l1', 10)}</button></div>`).join('')}<button class="mtile add" data-action="media-add" title="Add image">${icon('photo-l', 20)}</button></div>
    <div class="cp-tickers">${c.tickers.map((s) => `<span class="chip tk">${logoImg(s, 16)}<span>${s}</span><button class="xs" data-action="ticker-remove" data-sym="${s}">${icon('close-l1', 10)}</button></span>`).join('')}<span class="menu-anchor"><button class="chip add" data-action="menu" data-menu="tickers">${icon('add-l2', 12)}Add ticker</button>${state.menu === 'tickers' ? tickerPicker() : ''}</span></div>
    ${c.alert ? `<div class="alert">${icon('warning-f', 14, 'm4')}<span class="grow">No tickers detected — select them manually.</span><button class="act" data-action="alert-dismiss">${icon('close-l1', 12)}</button></div>` : ''}
    <div class="cp-foot"><div class="tools"><button class="tool" title="Bold" data-action="noop-bold"><b>B</b></button><button class="tool" title="Add ticker" data-action="menu" data-menu="tickers">$</button><span class="menu-anchor"><button class="tool ${c.polish ? 'on' : ''}" title="Polish with Alva" data-action="menu" data-menu="polish">${icon('chat-ai-l', 16)}</button>${polishMenu}</span><button class="tool" title="Add image" data-action="media-add">${icon('photo-l', 16)}</button></div>
      <div class="row8">${mode === 'inline' ? `<button class="btn ghost sm" data-action="compose-cancel">Cancel</button>` : ''}${!isUpdate ? `<button class="btn sec sm" data-action="build">${icon('chat-ai-l', 14)}Create with Alva</button>` : ''}</div></div>
  </div>`;
}
function composerModalHTML() {
  // 照 app「New thesis」编辑器（6227:162125）搬模块：正文 Regular/14 → 图片行（Add Image 108 卡）→ 工具栏 bold / ticker / polish；只把 app 顶栏的 Public ▾ 挪到作者行、Publish 挪到底部右侧（web 对话框惯例）
  const c = state.composer; const me = A('yggyll'); const isUpdate = c.kind === 'update'; const t = isUpdate ? byId(c.thesisId) : null;
  const visMenu = state.menu === 'vis' ? menuHTML([{ ic: 'go-l', label: 'Public', sub: 'Anyone can view for free.', action: 'set-vis', val: 'public' }, { ic: 'locked-l', label: 'Private', sub: 'Only you can see this.', action: 'set-vis', val: 'private' }], 'left') : '';
  const polishMenu = state.menu === 'polish' ? menuHTML([{ ic: 'refresh-l', label: 'Reformat', action: 'polish', val: 'reformat' }, { ic: 'minus-l1', label: 'Shorter', action: 'polish', val: 'shorter' }, { ic: 'add-l1', label: 'Enrich', action: 'polish', val: 'enrich' }], 'left') : '';
  const canPublish = c.text.trim().length > 0 && !c.publishing;
  return `<div class="cmp">
    <div class="cmp-head"><span class="t18 med grow">${isUpdate ? 'Update thesis' : 'New thesis'}</span><button class="act" data-action="compose-cancel" title="Close">${icon('close-l1', 18)}</button></div>
    <div class="cmp-author">${avatar(me, 36)}<span class="col grow"><span class="t14 med">${esc(me.name)}</span>${isUpdate
      ? `<span class="t12 n5">Adding update ${t ? t.versions.length + 1 : ''} · last update ${esc(t?.versions[0].time || '')}</span>`
      : `<span class="menu-anchor"><button class="vis-pill" data-action="menu" data-menu="vis">${cap(c.visibility)}${icon('arrow-down-f2', 12)}</button>${visMenu}</span>`}</span></div>
    <textarea class="cp-text size-modal" data-input="composer" placeholder="What is your thesis and why?">${esc(c.text)}</textarea>
    ${c.tickers.length ? `<div class="cp-tickers">${c.tickers.map((sy) => `<span class="chip tk">${logoImg(sy, 16)}<span>${sy}</span><button class="xs" data-action="ticker-remove" data-sym="${sy}">${icon('close-l1', 10)}</button></span>`).join('')}</div>` : '<div class="cp-tickers" hidden></div>'}
    <div class="cp-media app">${c.media.map((m, i) => `<div class="mtile lg"><img src="${m.img}" alt=""><button class="x" data-action="media-remove" data-i="${i}">${icon('close-l1', 10)}</button></div>`).join('')}<button class="mtile lg add" data-action="media-add" title="Add image">${licon('image-l', 28)}</button></div>
    ${c.polish ? polishHTML() : ''}
    ${c.alert ? `<div class="alert">${icon('warning-f', 14, 'm4')}<span class="grow">No tickers detected — select them manually.</span><button class="act" data-action="alert-dismiss">${icon('close-l1', 12)}</button></div>` : ''}
    <div class="cmp-foot">
      <div class="tools app"><button class="tool" title="Bold" data-action="noop-bold">${licon('bold-l')}</button><span class="menu-anchor"><button class="tool ${state.menu === 'tickers' ? 'on' : ''}" title="Add ticker" data-action="menu" data-menu="tickers">${licon('ticker-l')}</button>${state.menu === 'tickers' ? tickerPicker() : ''}</span><span class="menu-anchor"><button class="tool ${c.polish || state.menu === 'polish' ? 'on' : ''}" title="Polish" data-action="menu" data-menu="polish">${licon('polish-l')}</button>${polishMenu}</span></div>
      <button class="btn ${isUpdate ? 'blue' : 'pri'}" data-action="compose-publish" ${canPublish ? '' : 'disabled'}>${c.publishing ? `${squares()}<span>${isUpdate ? 'Updating…' : 'Publishing…'}</span>` : (isUpdate ? 'Update' : 'Publish')}</button>
    </div>
  </div>`;
}
function polishHTML() {
  const p = state.composer.polish; const label = { reformat: 'Reformat', shorter: 'Shorter', enrich: 'Enrich' }[p.mode];
  return `<div class="polish"><div class="row-between t12 n5"><span>Polish · ${label}</span><button class="act" data-action="polish-close">${icon('close-l1', 12)}</button></div>${p.phase === 'loading' ? `<div class="row8">${squares()}<span class="n5">Rewriting…</span></div>` : `<p>${esc(p.result).replace(/\n/g, '<br>')}</p><div class="row8 end"><button class="btn sec sm" data-action="polish" data-val="${p.mode}">Retry</button><button class="btn pri sm" data-action="polish-replace">Replace</button></div>`}</div>`;
}
function tickerPicker() {
  const q = state.pickerQ.toLowerCase();
  const rows = Object.entries(TICKERS).filter(([s, m]) => !q || (s + ' ' + m.name).toLowerCase().includes(q)).slice(0, 8);
  return `<div class="menu picker left"><div class="pk-search">${icon('search-l', 14)}<input data-input="picker" placeholder="Search all tickers" value="${esc(state.pickerQ)}"></div>${rows.map(([s, m]) => { const on = state.composer.tickers.includes(s); return `<div class="menu-item" data-action="ticker-toggle" data-sym="${s}">${logoImg(s, 20)}<span class="col grow"><span>${s}</span><span class="t12 n5">${esc(m.name)}</span></span>${on ? icon('check-f2', 16, 'm1') : icon('add-l1', 16, 'n3')}</div>`; }).join('') || '<div class="menu-item n5">No results</div>'}</div>`;
}
function openComposer({ kind = 'new', text = '', tickers = [], thesisId = null, media = [] } = {}) {
  const c = state.composer; const d = DIRS[state.dir];
  Object.assign(c, { open: true, kind, text, tickers: tickers.slice(), removed: [], media: media.slice(), visibility: 'public', thesisId, polish: null, alert: false, alertDismissed: false, publishing: false });
  c.mode = d.compose === 'page' ? 'page' : (d.compose === 'modal' || kind === 'update' || state.screen !== 'foryou') ? 'modal' : 'inline';
  if (c.mode === 'page' && state.screen !== 'write') { state.menu = null; state.focus = 'composer'; go(`${state.dir}/write`); return; }
  if (c.mode === 'inline' && state.screen !== 'foryou') { state.composer.mode = 'inline'; go(`${state.dir}/foryou`); }
  state.menu = null; state.focus = 'composer'; render();
}
function closeComposer() { Object.assign(state.composer, { open: false, text: '', tickers: [], media: [], polish: null, alert: false, thesisId: null, kind: 'new', publishing: false }); state.menu = null; }
function onComposerInput(el) {
  const c = state.composer; c.text = el.value; autosize(el);
  detectTickers(c.text).forEach((s) => { if (!c.tickers.includes(s) && !c.removed.includes(s)) c.tickers.push(s); });
  c.alert = c.text.trim().length > 60 && c.tickers.length === 0 && !c.alertDismissed;
  patchComposer();
  const cmp = $('.cmp'); if (cmp) { const t2 = document.createElement('div'); t2.innerHTML = composerModalHTML(); const a = cmp.querySelector('.cmp-foot'), b = t2.querySelector('.cmp-foot'); if (a && b) a.replaceWith(b); }
}
function patchComposer() {
  const root = $('.composer.open, .cmp, .ed, .qpost'); if (!root) return;
  const tmp = document.createElement('div'); tmp.innerHTML = root.classList.contains('cmp') ? composerModalHTML() : root.classList.contains('ed') ? writeEditorHTML() : root.classList.contains('qpost') ? quickComposerHTML() : composerHTML(state.composer.mode);
  const fresh = tmp.firstElementChild;
  const swap = (sel) => { const a = root.querySelector(sel), b = fresh.querySelector(sel); if (a && b) a.replaceWith(b); else if (a && !b) a.remove(); else if (!a && b) { const anchor = root.querySelector('.cp-foot, .cmp-foot, .qpost-foot'); anchor.before(b); } };
  swap('.cp-tickers'); swap('.alert');
  const pubA = root.querySelector('[data-action="compose-publish"]'), pubB = fresh.querySelector('[data-action="compose-publish"]'); if (pubA && pubB) pubA.replaceWith(pubB);
}
function polishResult(mode, text) {
  const paras = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  if (mode === 'shorter') return paras.map((p) => p.split(/(?<=[.!?])\s+/)[0]).join('\n');
  if (mode === 'enrich') return paras.join('\n') + '\nEvidence to track: the next capacity update, the 50-day test, and whether retail options volume holds its September record.';
  return paras.map((p, i) => `${i + 1}. ${p.replace(/\.\s+/g, '. ')}`).join('\n');
}
function publish() {
  const c = state.composer; const text = c.text.trim(); if (!text) return;
  const paras = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const tks = c.tickers.map((s) => ({ symbol: s, direction: 'up' })); const media = c.media.slice();
  const src = { label: 'YGGYLL on Alva', href: '#' };
  if (c.kind === 'update' && c.thesisId) {
    const t = byId(c.thesisId); t.versions.forEach((v) => { v.latest = false; });
    t.versions.unshift({ time: 'Just now', latest: true, paragraphs: paras, source: src, media, tickers: tks.length ? tks : t.versions[0].tickers });
    t.kind = 'update'; t.time = 'Just now'; t.signalsPending = true; t.signals = null;
    closeComposer(); toast('Thesis updated'); go(`${state.dir}/thesis/${t.id}`);
    setTimeout(() => { t.signalsPending = false; if (state.screen === 'thesis' && state.param === t.id) render(); }, 6000);
    return;
  }
  const id = 'yggyll-' + Date.now().toString(36);
  THESES.unshift({ id, authorId: 'yggyll', kind: 'new', time: 'Just now', saves: 0, saved: false, status: 'active', visibility: c.visibility, signalsPending: true, versions: [{ time: 'Just now', latest: true, paragraphs: paras, source: src, media, tickers: tks }] });
  if (c.mode === 'quick') { THESES[0].fresh = true; closeComposer(); toast('Thesis published'); setTimeout(() => { const t = byId(id); if (t) t.signalsPending = false; }, 7000); return; } // 照 X：发完留在 For You，新 thesis 出现在最上面
  closeComposer(); toast('Thesis published · Opening thesis…'); go(`${state.dir}/thesis/${id}`);
  setTimeout(() => { const t = byId(id); if (t) t.signalsPending = false; if (state.screen === 'thesis' && state.param === id) render(); }, 7000);
}

/* ══════════ Explore / Discover ══════════ */
function renderExplore() {
  const D = state.dir; const d = DIRS[D];
  if (D === 'b' && !state.mergeMarkets) return `<div class="page"><div class="page-head"><h1 class="title">Explore</h1><div class="search">${icon('search-l', 16)}<input placeholder="Search playbooks"></div></div><div class="hint">${icon('explain-l', 14, 'm1')}分开态：Explore 只管 playbook；thesis 在 Sidebar › For You，ticker 走 Markets。</div>${playbookGrid(PLAYBOOKS)}</div>`;
  const etabs = exploreTabsFor(D); const tab = etabs.includes(state.param) ? state.param : etabs[0];
  const m = exploreMatch(state.exploreQ);
  const cnt = (k) => (m ? ` <span class="cnt">(${m[k].length})</span>` : '');
  const tabs = `<div class="tabs lg">${etabs.map((k) => `<button class="${tab === k ? 'on' : ''}" data-go="${D}/explore/${k}">${TAB_LABEL[k]}${cnt(k)}</button>`).join('')}</div>`;
  const others = m ? etabs.filter((k) => k !== tab && m[k].length).map((k) => `<button class="btn sec sm" data-go="${D}/explore/${k}">${TAB_LABEL[k]} (${m[k].length})</button>`).join('') : '';
  const noHit = (label) => emptyState('search-l', `No ${label} match “${esc(state.exploreQ.trim())}”`, others ? 'Matches in other tabs:' : 'Try another spelling or a ticker symbol.', others ? `<div class="row8">${others}</div>` : '');
  let body = '';
  if (tab === 'theses') body = (m && !m.theses.length) ? noHit('theses') : thesesGrid(m ? m.theses : null);
  else if (tab === 'playbooks') body = (m && !m.playbooks.length) ? noHit('playbooks') : playbookGrid(m ? m.playbooks : PLAYBOOKS);
  else if (tab === 'people') body = (m && !m.people.length) ? noHit('people') : peopleGrid(m ? m.people : null);
  else if (tab === 'tickers') body = (m && !m.tickers.length) ? noHit('tickers') : tickersExplore(m ? m.tickers : null);
  const title = D === 'c' ? 'Discover' : 'Explore';
  return `<div class="page"><div class="page-head"><h1 class="title">${title}</h1><div class="search ${state.exploreQ ? 'on' : ''}">${icon('search-l', 16)}<input placeholder="${D === 'c' ? 'Search people, theses, playbooks, tickers' : D === 'b' || D === 'h' ? 'Search theses, playbooks, people, tickers' : 'Search theses, playbooks, people'}" data-input="explore-search" value="${esc(state.exploreQ)}">${state.exploreQ ? `<button class="act" data-action="explore-clear" title="Clear">${icon('close-l1', 12)}</button>` : ''}</div></div>${tabs}${body}</div>`;
}
function thesesGrid(base) {
  const f = state.exploreFilter;
  let list = base || visibleTheses();
  if (f === 'following') list = list.filter((t) => state.followed.has(t.authorId));
  else if (f === 'new' || f === 'update') list = list.filter((t) => t.kind === f);
  else if (TICKERS[f]) list = list.filter((t) => t.versions[0].tickers.some((x) => sym(x) === f));
  const chips = [['all', 'All'], ['following', 'Following'], ['new', 'New thesis'], ['update', 'Thesis update'], ...['NVDA', 'MSFT', 'GOOGL', 'AMD', 'HOOD', 'MU'].map((s) => [s, s])];
  return `<div class="ex-tools"><div class="fchips">${chips.map(([k, l]) => `<button class="fchip ${f === k ? 'on' : ''}" data-action="efilter" data-val="${k}">${l}</button>`).join('')}</div><button class="sort">Latest ${icon('arrow-down-l2', 12)}</button></div>
    ${list.length ? masonryHTML(list, 'grid', 3) : emptyState('search-l', 'No theses match this filter')}`;
}
/* ── Playbook 卡片：1:1 复刻 Baby src/app/components/shared/PlaybookCard.tsx（样式不改） ── */
const TEMPLATE_LABEL = { screener: 'Screener', thesis: 'Thesis', 'what-if': 'What-if', general: 'General' };
const TEMPLATE_GLYPH = {
  thesis: { viewBox: '0 0 12.2006 15.5935', path: 'M9.01588 14.7023C9.22098 14.7442 9.37535 14.926 9.37535 15.1435C9.37523 15.3609 9.22091 15.5428 9.01588 15.5847L8.92535 15.5935H3.27487C3.02661 15.5933 2.825 15.3918 2.82487 15.1435C2.82487 14.8951 3.02653 14.6937 3.27487 14.6935H8.92535L9.01588 14.7023ZM5.95553 0.00171143C7.2363 -0.0286215 8.49465 0.344915 9.55113 1.06958C10.6075 1.79425 11.4087 2.83369 11.8416 4.03941C12.2744 5.24513 12.3171 6.55686 11.9628 7.78794C11.6085 9.01898 10.8751 10.1072 9.86754 10.8984L9.8649 10.9001C9.71317 11.0174 9.59019 11.1685 9.50543 11.3405C9.4207 11.5126 9.37577 11.7023 9.37535 11.8942V12.3169C9.37535 12.5861 9.26854 12.8447 9.07828 13.035C8.88796 13.2253 8.62935 13.332 8.36021 13.3321H3.84C3.57097 13.332 3.31308 13.2252 3.12282 13.035C2.93247 12.8447 2.82487 12.5861 2.82487 12.3169V11.8933H2.82575C2.82394 11.7035 2.77911 11.5163 2.69567 11.3458C2.61166 11.1741 2.48979 11.0237 2.33971 10.9054V10.9045C1.61434 10.3399 1.02674 9.61763 0.62145 8.79253C0.266415 8.06965 0.0587949 7.2844 0.0106106 6.48277L6.37548e-05 6.13911C-0.015007 2.83034 2.64371 0.07823 5.95553 0.00171143ZM5.97662 0.901711C3.1583 0.966666 0.887372 3.3134 0.900063 6.13472V6.1356C0.902629 6.91938 1.08362 7.69264 1.42916 8.39614C1.77467 9.09951 2.2757 9.71507 2.8943 10.1961L2.63414 10.531L2.89694 10.1979C3.15313 10.3997 3.36086 10.6573 3.50426 10.9502C3.6475 11.243 3.72261 11.5647 3.72487 11.8907L3.72574 11.8933H3.72487V12.3169C3.72487 12.3474 3.73758 12.3771 3.75914 12.3987C3.78063 12.4201 3.80966 12.432 3.84 12.4321H8.36021C8.39066 12.432 8.42041 12.4202 8.44195 12.3987C8.46343 12.3771 8.47535 12.3474 8.47535 12.3169V11.8924C8.47604 11.5634 8.5524 11.2385 8.69771 10.9432C8.82489 10.6849 9.00215 10.4547 9.2189 10.2665L9.3147 10.1882C10.1721 9.51397 10.7963 8.5866 11.098 7.53833C11.3999 6.48901 11.3632 5.3712 10.9943 4.34351C10.6253 3.31562 9.94198 2.43002 9.04136 1.81226C8.14076 1.19454 7.0684 0.875859 5.97662 0.901711ZM6.7483 2.32554C7.53058 2.45824 8.25283 2.83042 8.81461 3.39077C9.37641 3.95116 9.75044 4.67245 9.88511 5.45445C9.92727 5.69932 9.76258 5.93253 9.51773 5.97476C9.27286 6.01689 9.0405 5.85223 8.9983 5.60738C8.89526 5.00893 8.60821 4.45682 8.17828 4.02798C7.74839 3.59933 7.19567 3.31472 6.59713 3.21323C6.35228 3.17154 6.18735 2.93872 6.22887 2.6938C6.27062 2.44902 6.50342 2.28403 6.7483 2.32554Z' },
  screener: { viewBox: '0 0 15.3002 15.3005', path: 'M7.98564 0.00735514C9.74552 0.0846888 11.419 0.768451 12.7291 1.93216L14.0818 0.580402C14.2575 0.404928 14.5424 0.404839 14.7181 0.580402C14.8938 0.756062 14.8936 1.04098 14.7181 1.21673L13.1299 2.80404C13.112 2.83286 13.0917 2.86077 13.0666 2.88578C13.0419 2.91038 13.0141 2.9305 12.9858 2.94818L7.96806 7.96674C7.79233 8.14247 7.50747 8.14247 7.33173 7.96674C7.15609 7.79099 7.15603 7.50611 7.33173 7.33041L9.36993 5.29134C8.94576 4.98278 8.445 4.79049 7.91709 4.74291C7.23799 4.68172 6.5587 4.86098 5.99754 5.24828C5.4364 5.63573 5.02793 6.20784 4.84441 6.86459C4.66103 7.52131 4.71389 8.22177 4.99295 8.84389C5.2721 9.46598 5.76037 9.97068 6.37284 10.2704C6.98552 10.57 7.68428 10.6456 8.34687 10.4839C9.0092 10.3222 9.59433 9.93405 10.0001 9.38617C10.4058 8.8382 10.6074 8.16491 10.5688 7.48422C10.5548 7.23622 10.7444 7.02282 10.9924 7.00873C11.2403 6.99484 11.4527 7.18539 11.467 7.43324C11.5175 8.32393 11.2543 9.20441 10.7234 9.92142C10.1925 10.6384 9.42715 11.1468 8.56045 11.3584C7.69357 11.5699 6.7798 11.4709 5.97821 11.0789C5.17657 10.6869 4.53738 10.0263 4.17205 9.21215C3.80688 8.39808 3.7378 7.48135 3.97781 6.62201C4.21795 5.76281 4.75186 5.01426 5.48602 4.50736C6.22027 4.00055 7.10935 3.76724 7.99795 3.8473C8.736 3.91386 9.43464 4.19428 10.0124 4.64798L12.091 2.57025C10.9411 1.56496 9.48103 0.973917 7.94609 0.906477C6.25645 0.832345 4.5999 1.39566 3.30544 2.48411C2.01103 3.57262 1.17211 5.10821 0.955235 6.78549C0.738566 8.46269 1.15972 10.1603 2.13473 11.5421C3.10991 12.9241 4.5686 13.8895 6.22167 14.2474C7.87459 14.6052 9.60158 14.3295 11.0609 13.4748C12.5203 12.6201 13.6064 11.2482 14.1029 9.63139C14.5991 8.01472 14.4707 6.27012 13.7425 4.74378C13.6357 4.51963 13.7303 4.25145 13.9543 4.14437C14.1785 4.03759 14.4475 4.1322 14.5546 4.35619C15.3799 6.08616 15.5259 8.0636 14.9633 9.89594C14.4007 11.7283 13.1702 13.283 11.5162 14.2518C9.86217 15.2205 7.90439 15.5328 6.03094 15.1272C4.15749 14.7215 2.50428 13.6269 1.39908 12.0607C0.294149 10.4946 -0.182546 8.57032 0.0631404 6.66947C0.308977 4.76863 1.2593 3.02865 2.72624 1.79505C4.19328 0.561536 6.07076 -0.076659 7.98564 0.00735514Z' },
  'what-if': { viewBox: '0 0 15.2999 13.4999', path: 'M0.45 1.79997C2.28018 1.79997 3.72754 2.02705 4.95615 2.76413C6.18607 3.50209 7.13496 4.71354 8.05254 6.54871C8.93488 8.31337 9.7862 9.35208 10.8062 9.96414C11.5964 10.4383 12.5254 10.6766 13.725 10.7613L12.7318 9.76814C12.5561 9.59242 12.5561 9.30755 12.7318 9.13181C12.9076 8.95608 13.1924 8.95608 13.3682 9.13181L15.1682 10.9318C15.1986 10.9623 15.2221 10.997 15.242 11.0329C15.2641 11.0727 15.282 11.1152 15.2912 11.1612C15.3029 11.2195 15.3028 11.2796 15.2912 11.3379C15.2821 11.3839 15.264 11.4264 15.242 11.4662C15.222 11.5023 15.1988 11.5375 15.1682 11.5681L13.3682 13.3681C13.1924 13.5438 12.9076 13.5438 12.7318 13.3681C12.5561 13.1924 12.5561 12.9076 12.7318 12.7318L13.7936 11.6692C12.448 11.5873 11.326 11.325 10.3438 10.7358C9.11393 9.99787 8.16504 8.7864 7.24746 6.95124C6.36512 5.18657 5.5138 4.14788 4.49385 3.53581C3.47252 2.92301 2.21969 2.69997 0.45 2.69997C0.201483 2.69997 1.83216e-05 2.49848 0 2.24997C0 2.00144 0.201472 1.79997 0.45 1.79997ZM6.22529 8.28894C6.36947 8.08654 6.65041 8.03931 6.85283 8.18347C7.05522 8.32765 7.10245 8.60859 6.9583 8.81101C6.16592 9.92367 5.29338 10.6598 4.21787 11.1085C3.15373 11.5524 1.92599 11.7 0.45 11.7C0.201472 11.7 0 11.4985 0 11.25C0 11.0015 0.201472 10.8 0.45 10.8C1.87706 10.8 2.96722 10.6552 3.87158 10.2779C4.76465 9.9053 5.5117 9.29097 6.22529 8.28894ZM12.7318 0.131802C12.9076 -0.043934 13.1924 -0.043934 13.3682 0.131802L15.1682 1.9318C15.1986 1.96228 15.2221 1.99698 15.242 2.03288C15.2641 2.07266 15.282 2.11518 15.2912 2.1612C15.3029 2.21946 15.3028 2.27958 15.2912 2.33786C15.2821 2.38393 15.264 2.42634 15.242 2.46618C15.222 2.5023 15.1988 2.53749 15.1682 2.56813L13.3682 4.36814C13.1924 4.54382 12.9076 4.54379 12.7318 4.36814C12.5561 4.19241 12.5561 3.90755 12.7318 3.73181L13.7259 2.73688C12.8263 2.80026 12.0792 2.95052 11.4284 3.22204C10.5354 3.59465 9.7883 4.20898 9.07471 5.21101C8.93053 5.41341 8.64959 5.46064 8.44717 5.31648C8.24477 5.1723 8.19755 4.89136 8.3417 4.68894C9.13408 3.57628 10.0066 2.8402 11.0821 2.39147C11.8814 2.05804 12.7729 1.89107 13.7927 1.82897L12.7318 0.768131C12.5561 0.592405 12.5561 0.307541 12.7318 0.131802Z' },
};
function creatorAvatar(name, size) {
  const src = CREATOR_AVATARS[name];
  if (src) return `<img class="cav" src="${src}" alt="" style="width:${size}px;height:${size}px">`;
  const sum = [...name].reduce((n, c) => n + c.charCodeAt(0), 0);
  return `<span class="cav cav-i" style="width:${size}px;height:${size}px;background:${AVATAR_COLOR_PALETTE[sum % AVATAR_COLOR_PALETTE.length]};font-size:${Math.round(size * .44)}px">${esc(name.trim().charAt(0).toUpperCase())}</span>`;
}
function tagPills(p) {
  const pills = [];
  if (p.template && p.template !== 'general') { const g = TEMPLATE_GLYPH[p.template]; pills.push(`<span class="pb-tag">${g ? `<svg width="10" height="10" viewBox="${g.viewBox}" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="${g.path}"/></svg>` : ''}<span>${TEMPLATE_LABEL[p.template]}</span></span>`); }
  for (const t of p.tickers || []) {
    if (t.length > 5) continue;
    const b = BRAND[t];
    pills.push(`<span class="pb-tag ${b ? '' : 'nogap'}">${b ? `<i class="pb-brand" style="background:${b[1]};--u:url('https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${b[0]}.svg')"></i>` : ''}<span>${esc(t)}</span></span>`);
  }
  return `<div class="pb-tags">${pills.join('')}</div>`;
}
function playbookCard(p, { simple = false } = {}) { // 底行照线上：owner + 浏览数（眼睛）+ remix 数，没有 Subscribe / star
  const cover = simple ? '<div class="pbk-cover simple"></div>' : `<div class="pbk-cover"><img src="${p.cover}" alt="" loading="lazy"></div>`;
  const badge = p.price ? `<div class="pbk-badge">${icon('locked-f', 14)}${esc(p.price)}</div>` : '';
  return `<div class="pbk" data-action="noop-playbook">${cover}${badge}<div class="pbk-info">${simple ? '' : tagPills(p)}
    <div class="pbk-text"><p class="pbk-title ${simple ? 'simple' : ''}">${esc(p.title)}</p><p class="pbk-desc">${esc(p.description || '')}</p></div>
    <div class="pbk-foot"><span class="pbk-creator">${creatorAvatar(p.creator, 22)}<span class="trunc">${esc(p.creator)}</span></span>
      <span class="pbk-right"><span class="pbk-stat">${icon('show-l', 16)}${p.stars.toLocaleString('en-US')}</span><span class="pbk-stat">${icon('remix-l', 16)}${p.remixes.toLocaleString('en-US')}</span></span></div>
  </div></div>`;
}
function playbookGrid(list, opts = {}) { return `<div class="pb-grid ${opts.fixed ? 'fixed' : ''}">${list.map((p) => playbookCard(p, opts)).join('')}</div>`; }
// 瀑布流：先把卡都放进一列，渲染后按容器宽度算列数（≈ Baby Explore 的 ⌊(W+16)/340⌋，上限 max），再按「当前最短列」逐张落位
const masonryHTML = (items, variant, max) => `<div class="masonry2" data-masonry data-max="${max}"><div class="mcol">${items.map((t) => thesisCard(t, variant)).join('')}</div></div>`;
function hydrateMasonry() {
  $$('[data-masonry]').forEach((root) => {
    const max = Number(root.dataset.max || 2);
    const cols = Math.max(1, Math.min(max, Math.floor((root.clientWidth + 16) / 340)));
    if (root.dataset.cols === String(cols)) return;
    const cards = [...root.querySelectorAll(':scope > .mcol > .card')];
    root.dataset.cols = cols; root.innerHTML = '';
    const colEls = Array.from({ length: cols }, () => { const c = document.createElement('div'); c.className = 'mcol'; root.appendChild(c); return c; });
    const heights = new Array(cols).fill(0);
    cards.forEach((card) => { const i = heights.indexOf(Math.min(...heights)); colEls[i].appendChild(card); heights[i] += card.offsetHeight + 20; });
  });
}
// PlaybookTags 的「只显示放得下的 tag」：渲染后量一遍，把溢出的隐藏
function hydrateTags() {
  $$('.pb-tags').forEach((row) => {
    const w = row.clientWidth; if (!w) return; let used = 0;
    [...row.children].forEach((el, i) => { el.style.display = ''; const cw = el.offsetWidth + (i ? 6 : 0); if (used + cw > w) el.style.display = 'none'; else used += cw; });
  });
}
const peopleIds = () => [...PEOPLE_TO_FOLLOW, ...FOLLOWING].filter((id) => A(id).member !== undefined);
// watchlist 星：公司页顶部与搜索结果行共用（用户 2026-09-23：搜索行的收藏跟详情页统一）
const watchStar = (sy) => `<button class="act h32 ${state.watchlist.has(sy) ? 'on' : ''}" data-action="watch" data-sym="${sy}" title="${state.watchlist.has(sy) ? 'In watchlist' : 'Add to watchlist'}">${icon(state.watchlist.has(sy) ? 'star-f' : 'star-l', 20)}</button>`;
// Explore / Discover 头部搜索：一个词同时查四类对象，tab 变成结果分面
function exploreMatch(q) {
  const l = (q || '').trim().toLowerCase(); if (!l) return null;
  const has = (...parts) => parts.join(' ').toLowerCase().includes(l);
  return {
    theses: visibleTheses().filter((t) => has(A(t.authorId).name, t.versions[0].paragraphs.join(' '), t.versions[0].tickers.map(sym).join(' '))),
    playbooks: PLAYBOOKS.filter((pb) => has(pb.title, pb.description, pb.creator, pb.tickers.join(' '), pb.template || '')),
    people: peopleIds().filter((id) => has(A(id).name, A(id).handle || '', A(id).role)),
    tickers: TRENDING.filter((t) => has(t, TICKERS[t].name, TICKERS[t].industry)),
  };
}
function peopleGrid(ids) {
  ids = ids || peopleIds();
  return `<div class="grid3 mt24">${ids.map((id) => { const a = A(id); const n = THESES.filter((t) => t.authorId === id && t.status === 'active' && t.visibility !== 'private').length; return `<div class="pcard wide"><span data-go="${state.dir}/profile/${id}">${avatar(a, 48)}</span><span class="col grow" data-go="${state.dir}/profile/${id}"><span class="name trunc">${esc(a.name)}${a.member === false ? botBadge() : ''}</span><span class="role trunc">${esc(a.role)}</span><span class="t12 n5">${a.followers || '—'} followers · ${plural(n, 'thesis').replace('thesiss', 'theses')}</span></span>${followBtn(a, 'sm')}</div>`; }).join('')}</div>`;
}
function tickersExplore(list) {
  if (list) return `<div class="co-sec" style="margin-top:20px"><h3>Tickers</h3>${tickersGrid(list).replace('mt24', 'mt8')}</div>`;
  return `<div class="co-sec" style="margin-top:20px"><div class="row-between"><h3 style="margin:0">Your watchlist</h3><button class="btn sec sm" data-action="search-open">${icon('search-l', 14)}Search any ticker</button></div>${tickersGrid(WATCHLIST).replace('mt24', 'mt8')}</div><div class="co-sec"><h3>Trending</h3>${tickersGrid(TRENDING.filter((x) => !WATCHLIST.includes(x))).replace('mt24', 'mt8')}</div>`;
}
function tickersGrid(list = TRENDING) {
  return `<div class="grid3 mt24">${list.map((s) => `<div class="tkcard" data-go="${state.dir}/company/${s}"><div class="row-between"><span class="row8">${logoImg(s, 28)}<span class="col"><span class="med">${s}</span><span class="t12 n5 trunc">${esc(TICKERS[s].name)}</span></span></span><span class="q" data-quote="${s}"></span></div><div class="spark" data-spark="${s}"></div><span class="t12 n5">${plural(thesesByTicker(s).length, 'thesis').replace('thesiss', 'theses')}</span></div>`).join('')}</div>`;
}

/* ══════════ Thesis 详情 ══════════ */
function renderThesis() {
  const t = byId(state.param);
  if (!t) return `<div class="page">${emptyState('search-l', 'Thesis not found')}</div>`;
  const a = A(t.authorId); const owner = !!a.me; const d = DIRS[state.dir]; const cur = t.versions[0]; const next = t.versions[1];
  const ownerActs = owner ? `${t.status === 'archived' ? '' : `<button class="btn blue sm" data-action="update" data-id="${t.id}">${icon('add-l2', 14)}Update</button>`}<span class="menu-anchor"><button class="act h32" data-action="menu" data-menu="more-${t.id}">${icon('more-l1', 16)}</button>${state.menu === 'more-' + t.id ? menuHTML(ownerMenu(t)) : ''}</span>` : ''; // 客态头部不放 Follow：关注在作者主页 / People 做，与生产 web 头部（收藏 + 分享）一致
  const header = `<div class="th-head">${avatar(a, 35)}<span class="col grow" data-go="${state.dir}/profile/${a.id}"><span class="t14 med" style="margin-bottom:-2px">${esc(a.name)}${a.member === false ? ' ' + botBadge() : ''}</span><span class="t12 n5">${esc(a.role)}</span></span>
    <div class="row2">${ownerActs}<button class="act h32 ${t.saved ? 'on' : ''}" data-action="save" data-id="${t.id}">${icon(t.saved ? 'bookmark-f' : 'bookmark-l', 16)}<span>${t.saves}</span></button><span class="menu-anchor"><button class="act h32" data-action="menu" data-menu="share-${t.id}">${icon('share-l', 16)}</button>${state.menu === 'share-' + t.id ? sharePop(t) : ''}</span></div></div>`;
  // 只有一个版本（没有 update 历史）时不出左侧时间线轨道，正文顶格（照 app A2 客态）
  const current = `<div class="th-wrap"><div class="th-col"><div class="vrow">${next ? rail24(true, false) : ''}<div class="grow pb32">${feedContent(cur, t)}</div></div></div></div>`;
  const peek = next ? `<div class="peek"><div class="th-wrap" style="padding-top:0"><div class="th-col"><div class="vrow">${rail24(false, false)}<div class="grow">${feedContent(next, t, { latestTag: false })}</div></div></div></div><div class="peek-fade"><div class="g"></div><div class="bar"><button class="pill" data-action="history" data-id="${t.id}"><span>View all ${t.versions.length} updates</span>${icon('arrow-right-l2', 12)}</button></div></div></div>` : '';
  if (d.detail === 'split') {
    return `<div class="page thesis split" style="padding:0"><div style="position:sticky;top:0;z-index:10">${header}</div><div class="th-body split"><div class="th-left">${current}${peek}</div><div class="th-right">${evidence(t)}</div></div></div>`;
  }
  if (d.detail === 'article') { // E：文章版式，作者行 + 动作在同一行，全部收在 720 一列，没有 sticky 头
    const meta = `<div class="art-meta">${avatar(a, 44)}<span class="col grow" data-go="${state.dir}/profile/${a.id}"><span class="t14 med">${esc(a.name)}${a.member === false ? ' ' + botBadge() : ''}</span><span class="t12 n5">${esc(a.role)} · ${esc(cur.time)}</span></span><div class="row2">${ownerActs}<button class="act h32 ${t.saved ? 'on' : ''}" data-action="save" data-id="${t.id}">${icon(t.saved ? 'bookmark-f' : 'bookmark-l', 16)}<span>${t.saves}</span></button><span class="menu-anchor"><button class="act h32" data-action="menu" data-menu="share-${t.id}">${icon('share-l', 16)}</button>${state.menu === 'share-' + t.id ? sharePop(t) : ''}</span></div></div>`;
    return `<div class="page thesis article"><div class="art">${meta}${current}${peek}<div class="pt28">${evidence(t)}</div></div></div>`;
  }
  const strip = d.detail === 'terminal' ? sinceStrip(t) : ''; // G / H：头部下一条「发布时价 → 现价」
  if (railOn()) { // 补丁：对话框关闭时右栏放 Related / Relevant people / Tickers，Signals 留在正文下
    return `<div class="page thesis" style="padding:0"><div style="position:sticky;top:0;z-index:10">${header}</div>${strip}<div class="th-body ctx"><div class="th-left">${current}${peek}<div class="th-wrap"><div class="th-col pt28">${signalsSection(t)}</div></div></div>${detailRail(t)}</div></div>`;
  }
  return `<div class="page thesis" style="padding:0"><div style="position:sticky;top:0;z-index:10">${header}</div>${strip}${current}${peek}<div class="th-wrap pb80"><div class="th-col pt28">${evidence(t)}</div></div></div>`;
}
function historyModal(t) {
  return `<div class="scrim" data-action="close-modal"><div class="modal" data-stop><div class="md-head"><span class="t18 med grow">Historical updates</span><button class="act" data-action="close-modal">${icon('close-l1', 18)}</button></div><div class="md-scroll">${t.versions.map((v, i) => `<div class="vrow">${rail24(i === 0, i === t.versions.length - 1)}<div class="grow pb32">${feedContent(v, t)}</div></div>`).join('')}</div></div></div>`;
}
function archiveModal(t) {
  const un = t.status === 'archived';
  return `<div class="scrim" data-action="close-modal"><div class="modal w520" data-stop><div class="md-head"><span class="t18 med grow">${un ? 'Unarchive thesis' : 'Archive thesis'}</span><button class="act" data-action="close-modal">${icon('close-l1', 18)}</button></div><p class="n7">${un ? 'Unarchive this thesis to resume tracking its signals and receive future updates. Its previous history will remain unchanged.' : 'Archive this thesis if you no longer want to actively track it, or if its core logic has materially changed. Signal tracking for this thesis will be paused.'}</p><div class="col" style="gap:6px"><span class="t12 n5">Note (Optional)</span><textarea class="note" placeholder="Add a note about why you're ${un ? 'unarchiving' : 'archiving'} this thesis"></textarea></div><div class="row8 end"><button class="btn sec" data-action="close-modal">Cancel</button><button class="btn pri" data-action="archive-confirm" data-id="${t.id}">${un ? 'Unarchive' : 'Archive'}</button></div></div></div>`;
}

/* ══════════ Profile ══════════ */
function renderProfile() {
  const a = A(state.param) || A('yggyll'); const owner = !!a.me; const d = DIRS[state.dir];
  const tabs = d.profileTabs; const tab = tabs.includes(state.profileTab) ? state.profileTab : 'theses';
  const mine = THESES.filter((t) => t.authorId === a.id && (owner || t.visibility !== 'private'));
  const shown = mine.filter((t) => (state.profileFilter === 'archived' ? t.status === 'archived' : t.status === 'active'));
  const links = (a.links || []).map(([k, v]) => `<span class="row8" style="gap:4px"><img src="${ROOT}${k === 'x' ? 'logo-social-x.svg' : 'logo-social-telegram.svg'}" alt="">${esc(v)}</span>`).join('<span class="n3">|</span>');
  const head = `<div class="pf-head">${avatar(a, 64)}<div class="col grow">
      <div class="pf-name">${esc(a.name)}${a.pro ? '<span class="tag pro">Pro</span>' : ''}${a.member === false ? botBadge() : ''}</div>
      <div class="t12 n5">${a.handle ? esc(a.handle) : ''}${a.joined ? ` <span class="n3">|</span> Joined ${esc(a.joined)}` : ''}</div>
      <div class="pf-stats"><span><b>${esc(a.followers || '0')}</b> followers</span>${a.following != null ? `<span><b>${a.following}</b> following</span>` : ''}</div>
      ${a.bio ? `<p class="mt8 n9">${esc(a.bio)}</p>` : ''}
      ${links ? `<div class="pf-links">${links}</div>` : ''}
      ${a.member === false ? `<div class="pf-note">${icon('bot-l', 14)}Compiled from public information. Not affiliated with Alva.</div>` : ''}
    </div>
    <div class="pf-actions">${owner ? `<button class="btn pri" data-action="compose-new">${PLUS}New thesis</button><button class="act h32" title="Edit profile">${icon('edit-l1', 16)}</button><button class="act h32" title="Share">${icon('share-l', 16)}</button><button class="act h32" title="Settings">${icon('settings-l', 16)}</button>` : `${followBtn(a)}<button class="act h32" title="Share">${icon('share-l', 16)}</button>`}</div></div>`;
  const tabsHTML = `<div class="pf-tabs"><div class="tabs lg">${tabs.map((k) => `<button class="${tab === k ? 'on' : ''}" data-action="ptab" data-tab="${k}">${TAB_LABEL[k]}${k === 'theses' ? ` <span class="cnt">${mine.filter((t) => t.status === 'active').length}</span>` : ''}</button>`).join('')}</div>${tab === 'theses' ? `<div class="seg">${[['active', 'Active'], ['archived', 'Archived']].map(([k, l]) => `<button class="${state.profileFilter === k ? 'on' : ''}" data-action="pfilter" data-val="${k}">${l}</button>`).join('')}</div>` : ''}</div>`;
  let body;
  if (tab === 'theses') body = shown.length ? (owner && d.manage === 'table' ? manageTableHTML(shown) : `<div class="pf-list">${shown.map((t) => (owner ? manageCard(t) : thesisCard(t, 'feed'))).join('')}</div>`) : emptyState('search-l', state.profileFilter === 'archived' ? 'No archived thesis' : 'No active thesis', owner && state.profileFilter === 'active' ? 'Write your first thesis from the button above.' : '');
  else if (tab === 'playbooks') { const ids = { YGGYLL: ['attribution-analysis-price-trends', 'nvda-trading-research-dashboard'], 'Gavin Baker': ['nvda-triggered-tsm'], 'Space Investor': ['us-crypto-dat-monitor'] }[a.name] || []; const list = ids.map((id) => ({ ...PLAYBOOKS.find((pb) => pb.id === id), creator: a.name })); body = list.length ? playbookGrid(list, { fixed: true }) : emptyState('search-l', 'No playbooks yet'); }
  else if (tab === 'starred') body = owner ? playbookGrid(['btc-ultimate-ai-trader', 'mag7-equal-weight-monthly-rebalance', 'short-squeeze-risk-map'].map((id) => PLAYBOOKS.find((pb) => pb.id === id)), { fixed: true }) : emptyState('search-l', 'No starred playbooks yet');
  else body = emptyState('search-l', 'No purchased playbooks yet');
  return `<div class="page profile"><div style="max-width:1120px;margin:0 auto">${head}${tabsHTML}${body}</div></div>`;
}
function manageCard(t) {
  const cur = t.versions[0]; const n = signalsFor(t).length;
  return `<article class="card manage"><div class="row-between"><div class="row8 grow" style="flex-wrap:wrap">${t.status === 'archived' ? tag('archived') : tag(t.kind)}${t.visibility === 'private' ? tag('private') : ''}<span class="t12 n5">Updated ${esc(cur.time)} · ${plural(t.versions.length, 'update')} · ${t.signalsPending ? 'Generating signals…' : plural(n, 'signal')} · ${plural(t.saves, 'save')}</span></div><span class="menu-anchor"><button class="act" data-action="menu" data-menu="row-${t.id}">${icon('more-l1', 16)}</button>${state.menu === 'row-' + t.id ? menuHTML(ownerMenu(t)) : ''}</span></div><div class="card-body clamp3" data-go="${state.dir}/thesis/${t.id}">${cur.paragraphs.map((p) => esc(p)).join('<br>')}</div>${mediaRow(cur.media)}<div class="chips">${cur.tickers.map((x) => tickerChip(x)).join('')}</div></article>`;
}

/* ══════════ Company（Markets） ══════════ */
function renderCompany() {
  const s = (state.param || 'NVDA').toUpperCase(); const meta = TICKERS[s] || { name: s, venue: '—', industry: '' };
  const tabs = ['Overview', 'About', 'Anomalies', 'News & Social', 'Smart Money', 'Earnings', 'Theses'];
  const tab = state.companyTab; const list = thesesByTicker(s); const shown = state.companyFilter === 'following' ? list.filter((t) => state.followed.has(t.authorId)) : list;
  const head = `<div class="co-head"><span class="row8" style="gap:16px">${logoImg(s, 40)}<span class="col"><span class="co-name" data-action="search-open">${esc(meta.name)}${icon('arrow-down-f2', 14, 'n5')}</span><span class="co-sub">${esc(meta.venue)}: ${s}${meta.industry ? ' · ' + esc(meta.industry) : ''}</span></span></span><span class="row8" style="gap:16px"><span data-bigquote="${s}"></span>${watchStar(s)}</span></div>
    <div class="tabs mt16">${tabs.map((k) => `<button class="${tab === k.toLowerCase() ? 'on' : ''}" data-action="ctab" data-tab="${k.toLowerCase()}">${k}${k === 'Theses' ? ` <span class="cnt">${list.length}</span>` : ''}</button>`).join('')}</div>`;
  let body;
  if (tab === 'theses') body = `<div class="ex-tools"><div class="row8"><span class="t16 med">Theses on ${s}</span><div class="seg">${[['all', 'All'], ['following', 'Following']].map(([k, l]) => `<button class="${state.companyFilter === k ? 'on' : ''}" data-action="cfilter" data-val="${k}">${l}</button>`).join('')}</div></div><button class="btn pri" data-action="compose-ticker" data-sym="${s}">${PLUS}Write a thesis</button></div>${shown.length ? masonryHTML(shown, 'grid', 3) : emptyState('search-l', 'Nothing new yet', `No theses on ${s} yet. Be the first to write one.`)}`;
  else if (tab === 'overview') body = `<div class="co-sec"><div class="row-between"><h3 style="margin:0">Price</h3><div class="seg">${[[1, '1M'], [3, '3M'], [6, '6M']].map(([m, l]) => `<button class="${state.companyRange === m ? 'on' : ''}" data-action="crange" data-val="${m}">${l}</button>`).join('')}</div></div><div class="bigchart" data-bigchart="${s}"></div></div><div class="co-sec"><h3>About</h3><p class="n7">${esc(ABOUT[s] || ABOUT.DEFAULT)}</p></div><div class="co-sec"><div class="row-between"><h3 style="margin:0">Theses · ${list.length}</h3><button class="act" data-action="ctab" data-tab="theses">See all ${icon('arrow-right-l2', 12)}</button></div><div class="grid2 mt8">${list.slice(0, 2).map((t) => thesisCard(t, 'grid')).join('')}</div></div>`;
  else body = `<div class="co-sec"><div class="ph-box">${tab.replace(/\b\w/g, (c) => c.toUpperCase())} is the production company page as it exists today. This demo only adds the Theses tab.</div></div>`;
  return `<div class="page company"><div style="max-width:1120px;margin:0 auto">${head}${body}</div></div>`;
}

/* ══════════ Search 弹窗 ══════════ */
function searchDialog() {
  const d = DIRS[state.dir]; const q = state.search.q.trim().toLowerCase(); const all = d.search === 'all' || (state.globalSearch && PATCH_DIRS.includes(state.dir)) || state.guest;
  const m = q && all ? exploreMatch(q) : null; // 补丁：全局搜索一次查四类（theses / playbooks 段来自 Explore 的匹配）
  const thesisRows = m ? m.theses.slice(0, 4).map((t) => { const a = A(t.authorId); return `<div class="srow" data-go="${state.dir}/thesis/${t.id}">${avatar(a, 32)}<span class="col grow"><span class="name">${esc(a.name)} <span class="n5" style="font-weight:400">· ${esc(t.time)}</span></span><span class="sub trunc">${esc(t.versions[0].paragraphs[0])}</span></span></div>`; }).join('') : '';
  const pbRows = m && !state.guest ? m.playbooks.slice(0, 3).map((pb) => `<div class="srow" data-action="noop-playbook">${creatorAvatar(pb.creator, 32)}<span class="col grow"><span class="name">${esc(pb.title)}</span><span class="sub trunc">${esc(pb.creator)} · ${plural(pb.remixes, 'remix').replace('remixs', 'remixes')}</span></span></div>`).join('') : '';
  const tks = Object.entries(TICKERS).filter(([s, m]) => !q || (s + ' ' + m.name).toLowerCase().includes(q)).slice(0, q ? 6 : 5);
  const ppl = all ? Object.values(AUTHORS).filter((a) => !a.me && a.member !== undefined && !a.org && (!q || (a.name + ' ' + (a.handle || '') + ' ' + a.role).toLowerCase().includes(q))).slice(0, q ? 6 : 5) : [];
  const tickerRows = tks.map(([s, m]) => `<div class="srow" data-go="${state.dir}/company/${s}">${logoImg(s, 32)}<span class="col grow"><span class="name">${s} <span class="n5" style="font-weight:400">${esc(m.name)}</span></span><span class="sub">${esc(m.venue)} · ${esc(m.industry)}</span></span><span class="q" data-quote="${s}"></span>${watchStar(s)}</div>`).join('');
  const peopleRows = ppl.map((a) => `<div class="srow" data-go="${state.dir}/profile/${a.id}">${avatar(a, 32)}<span class="col grow"><span class="name">${esc(a.name)}${a.member === false ? botBadge() : ''}</span><span class="sub trunc">${esc(a.role)}</span></span>${followBtn(a, 'sm')}</div>`).join('');
  const recent = !q && state.search.recent.length ? `<div class="dlg-sec"><div class="dlg-title"><span>Recent</span><button class="n5" data-action="recent-clear">Clear</button></div><div class="fchips">${state.search.recent.map((r) => `<span class="fchip">${esc(r)}<button class="act" style="padding:0 0 0 2px" data-action="recent-remove" data-val="${esc(r)}">${icon('close-l1', 10)}</button></span>`).join('')}</div></div>` : '';
  const empty = q && !tks.length && !ppl.length && !thesisRows && !pbRows ? emptyState('search-l', 'No results found') : '';
  return `<div class="scrim light" data-action="search-close"><div class="dlg" data-stop>
    <div class="dlg-input">${icon('search-l', 18)}<input data-input="search" placeholder="${all ? (state.globalSearch || state.guest ? 'Search theses, playbooks, people, tickers' : 'Search tickers or people') : 'Search companies'}" value="${esc(state.search.q)}">${q ? `<button class="act" data-action="search-clear">${icon('close-l1', 14)}</button>` : ''}</div>
    <div class="dlg-body">${recent}${tks.length ? `<div class="dlg-sec"><div class="dlg-title"><span>${q ? 'Tickers' : 'Trending tickers'}</span></div>${tickerRows}</div>` : ''}${ppl.length ? `<div class="dlg-sec"><div class="dlg-title"><span>${q ? 'People' : 'People to follow'}</span></div>${peopleRows}</div>` : ''}${thesisRows ? `<div class="dlg-sec"><div class="dlg-title"><span>Theses</span></div>${thesisRows}</div>` : ''}${pbRows ? `<div class="dlg-sec"><div class="dlg-title"><span>Playbooks</span></div>${pbRows}</div>` : ''}${empty}</div>
  </div></div>`;
}

/* ══════════ Chat 面板 ══════════ */
function ctxLabel() {
  const c = state.chat.ctx; if (!c) return '';
  if (c.type === 'thesis') { const t = byId(c.id); return t ? `Thesis · ${A(t.authorId).name} · ${t.versions[0].paragraphs[0].slice(0, 48)}…` : 'Thesis'; }
  if (c.type === 'ticker') return `${c.id} · ${TICKERS[c.id]?.name || ''}`;
  return 'New thesis · draft';
}
function alvaHead() { return `<div class="msg-head"><img src="${ROOT}logo-portrait.svg" alt=""><b>Alva</b><span>Just now</span></div>`; }
function msgHTML(m) {
  if (m.type === 'user') return `<div class="msg user"><div class="bubble">${esc(m.text)}</div></div>`;
  if (m.type === 'status') return `<div class="msg status">${esc(m.text)} ${icon('arrow-right-l2', 12)}</div>`;
  if (m.type === 'card') return `<div class="msg alva">${alvaHead()}${draftCard(m.draft)}</div>`;
  return `<div class="msg alva">${alvaHead()}<div>${esc(m.text)}</div>${m.chips ? `<div class="sug">${m.chips.map((s) => `<button data-action="chat-chip" data-text="${esc(s)}">${esc(s)}</button>`).join('')}</div>` : ''}</div>`;
}
function draftCard(d) {
  return `<div class="draft"><div class="row8">${avatar(A('yggyll'), 24)}<span class="t12 med">YGGYLL</span><span class="t12 n5">${d.published ? 'Published' : 'Draft'}</span></div><div>${d.paragraphs.map((p) => `<p class="mt8">${esc(p)}</p>`).join('')}</div><div class="chips">${d.tickers.map((x) => tickerChip(x, { nav: false })).join('')}</div>${d.published ? `<button class="btn sec sm" data-go="${state.dir}/thesis/${d.published}" style="align-self:flex-start">Open thesis</button>` : `<div class="row8 end"><button class="btn sec sm" data-action="draft-open" data-i="${d.i}">Open in editor</button><button class="btn pri sm" data-action="draft-publish" data-i="${d.i}">Publish</button></div>`}</div>`;
}
function renderChat() {
  if (!state.chat.open) return '';
  const c = state.chat; const t = c.ctx?.type === 'thesis' ? byId(c.ctx.id) : null;
  const tk = c.ctx?.type === 'ticker' ? c.ctx.id : null;
  const introText = t ? `I've read ${A(t.authorId).name}'s thesis and its ${t.signalsPending ? 'incoming' : signalsFor(t).length} signals. What do you want to know?` : tk ? `I'm on ${tk} with you. Ask about the theses pinned to it, what changed since one was published, or the price moves behind them.` : "Hi YGGYLL — ask me about anything you're reading, or tell me what you're watching and I'll draft a thesis with the data behind it.";
  const introChips = t ? ['Summarize the evidence for and against', 'What changed since the last update?', 'Which signal matters most?'] : tk ? [`Which theses on ${tk} are working?`, 'What changed since the last update?', 'Bull vs bear case in three lines'] : ['Pick a ticker', 'Start from my feed', 'Describe it in a sentence'];
  const intro = c.msgs.length ? '' : msgHTML({ type: 'alva', text: introText, chips: introChips });
  return `<div class="chat-wrap"><div class="chat">
    <div class="chat-head"><img src="${ROOT}logo-portrait.svg" class="alogo" alt=""><span class="t14 med">Alva</span>${DIRS[state.dir].shell === 'topnav' ? '' : icon('arrow-down-f2', 14, 'n3')}<span class="grow"></span>${DIRS[state.dir].shell === 'topnav' ? `<span class="menu-anchor"><button class="act" data-action="menu" data-menu="chat-hist" title="History">${icon('history-l', 16)}</button>${state.menu === 'chat-hist' ? menuHTML(SIDEBAR.chats.map((t, i) => ({ ic: 'chat-l1', label: t, action: 'agent-chat', val: String(i + 1) })), 'right', 'hist') : ''}</span><button class="act" data-go="${state.dir}/alva" title="Open chat page">${icon('full-screen-l', 16)}</button><button class="act" data-action="chat-reset" title="New chat">${icon('chat-new-l', 16)}</button><button class="act" data-action="toggle-chat" title="Collapse">${icon('arrow-down-l2', 16)}</button>` : `<button class="act" data-action="chat-reset" title="New chat">${icon('chat-new-l', 16)}</button><button class="act" title="Agent settings" data-action="noop-settings">${icon('settings-l', 16)}</button><button class="act" data-action="toggle-chat" title="Collapse">${icon('collapse-right-l', 16)}</button>`}</div>
    <div class="chat-body" id="chat-body">${intro}${c.msgs.map(msgHTML).join('')}${c.typing ? `<div class="msg alva">${alvaHead()}<div class="typing"><i></i><i></i><i></i></div></div>` : ''}</div>
    <div class="chat-foot"><div class="cin">${c.ctx ? `<span class="ctx">${icon(c.ctx.type === 'thesis' ? 'edit-l1' : c.ctx.type === 'ticker' ? 'sidebar-k-normal' : 'chat-ai-l', 12)}<span>${esc(ctxLabel())}</span><button class="act" data-action="ctx-clear">${icon('close-l1', 10)}</button></span>` : ''}<textarea data-input="chat" placeholder="${c.ctx?.type === 'draft' ? "What's your thesis, and why?" : 'Ask Alva anything. @ for context, / for skills'}"></textarea><div class="cin-row"><div class="row8">${icon('add-l2', 16)}${icon('at-l', 16)}${icon('skill-l', 16)}</div><div class="row8">${DIRS[state.dir].shell === 'topnav' ? `<span class="model-pill">${icon('lightning-l', 12)}GPT-5.6 Sol${icon('arrow-down-l2', 10)}</span>` : ''}<button class="send" data-action="chat-send">${icon('arrow-up-l1', 14)}</button></div></div></div></div>
  </div></div>`;
}
function openChat(ctx) { state.chat.open = true; if (ctx) state.chat.ctx = ctx; else if (!state.chat.ctx && state.screen === 'thesis') state.chat.ctx = { type: 'thesis', id: state.param }; state.focus = 'chat'; }
function chatSend(text) {
  const c = state.chat; if (!text.trim()) return;
  c.msgs.push({ type: 'user', text });
  if (c.mode === 'build' || c.ctx?.type === 'draft') { replyDraft(text); return; }
  c.typing = true; render();
  setTimeout(() => { c.typing = false; c.msgs.push({ type: 'alva', text: cannedReply(text) }); render(); }, 900);
}
function cannedReply(q) {
  const t = state.chat.ctx?.type === 'thesis' ? byId(state.chat.ctx.id) : null; const l = q.toLowerCase();
  const tk = state.chat.ctx?.type === 'ticker' ? state.chat.ctx.id : null;
  if (tk && !t) { // G：围绕当前 ticker 的 canned 回答，数字全部从快照算
    const { all, mine } = termScope(tk); const qq = quote(tk); const n = plural(all.length, 'thesis').replace('thesiss', 'theses');
    const best = all.map((x) => ({ x, sp: sincePublish(x, tk) })).filter((o) => o.sp).sort((a, b) => b.sp.pct - a.sp.pct)[0];
    if (l.includes('working') || l.includes('best')) return best ? `${n} on ${tk}. The one furthest in the money is ${A(best.x.authorId).name}'s from ${fmtDate(best.sp.d0)}: ${tk} is ${fmtPct(best.sp.pct)} since, from ${fmtPrice(best.sp.p0)} to ${fmtPrice(best.sp.now)}.` : `No thesis on ${tk} has a price pin yet.`;
    if (l.includes('changed')) return `${tk} last closed at ${qq ? fmtPrice(qq.price) : '—'} (${qq ? fmtPct(qq.pct) : '—'} on the day). ${all.filter((x) => x.versions.length > 1).length} of the ${all.length} theses on it have at least one update${mine.length ? `; yours carry ${mine.reduce((k, x) => k + x.versions.length - 1, 0)} in total.` : '; none of them are yours yet.'}`;
    return `${n} are pinned to ${tk}${qq ? `, last close ${fmtPrice(qq.price)}` : ''}. The bull case leans on flow and capacity data, the bear case is concentration reversing faster than fundamentals. Ask about a specific author or date.`;
  }
  if (t) {
    const a = A(t.authorId); const sigs = signalsFor(t);
    if (!sigs.length) return 'Signals for this thesis are still being generated. Ask me again in a minute, or ask about the tickers directly.';
    if (l.includes('against') || l.includes('summar')) return `For: ${sigs[0].quote} Against: ${sigs[1]?.alva || 'the evidence on the monetization leg is still sell-side, not reported.'} Net: ${a.name}'s premise holds on the data so far; the invalidation is the one named in the latest update.`;
    if (l.includes('changed')) return `Since ${t.versions[1]?.time || 'the first version'} the author ${t.versions.length > 1 ? `published ${plural(t.versions.length - 1, 'update')}` : 'has not revised the thesis'}, and ${sigs.length} signals arrived in the past 7 days — the latest from ${A(sigs[0].authorId).name}.`;
    if (l.includes('signal')) return `${A(sigs[0].authorId).name}: “${sigs[0].quote}” ${sigs[0].alva}`;
    return `Reading ${a.name}'s thesis and its ${sigs.length} signals now. Short version: the premise is supported by flow data, and the risk is concentration reversing faster than fundamentals move.`;
  }
  return 'I can research any ticker, summarize a thesis, or draft one from a sentence. Try: “Draft a thesis: NVDA holds the 50-day into GTC.”';
}
function startBuild(seed) {
  const c = state.chat; openChat({ type: 'draft' }); c.mode = 'build';
  if (seed && seed.trim()) { c.msgs.push({ type: 'user', text: seed.trim() }); replyDraft(seed.trim()); return; }
  if (!c.msgs.length) c.msgs.push({ type: 'alva', text: "Let's build your thesis. Tell me what you're watching — a ticker, something from your feed, or one sentence of your view. I'll draft it and find the data behind it.", chips: ['Pick a ticker', 'Start from my feed', 'Describe it in a sentence'] });
  render();
}
function replyDraft(seed) {
  const c = state.chat; c.typing = true; render();
  setTimeout(() => {
    c.msgs.push({ type: 'status', text: 'Ran 5 commands, searched the feed, read 3 sources' }); render();
    setTimeout(() => {
      c.typing = false;
      const det = detectTickers(seed); const syms = det.length ? det.slice(0, 3) : ['NVDA', 'HOOD'];
      const pool = syms.flatMap((s) => SIGNAL_POOL[s] || []); const sig = SIGNALS[pool[0] || 'kobeissi-retail'];
      const first = cap(seed.replace(/\s+/g, ' ').trim()); const p1 = /[.!?]$/.test(first) ? first : first + '.';
      const d = { i: c.msgs.length, paragraphs: [p1, `Evidence to track: ${sig.quote} ${sig.alva}`], tickers: syms.map((s) => ({ symbol: s, direction: 'up' })) };
      c.msgs.push({ type: 'alva', text: `Here's a first draft. I pulled ${syms.join(' and ')} price context and ${Math.min(3, pool.length || 2)} signals from the past 7 days; the second paragraph is the evidence I'd track.` });
      c.msgs.push({ type: 'card', draft: d }); render();
    }, 1400);
  }, 700);
}
function draftFromIndex(i) { const m = state.chat.msgs[Number(i)]; return m?.draft; }

/* ══════════ E · 顶栏内容站（F 的 Read / Work 切换并在这里） ══════════ */
const LOGO_DARK = ROOT + 'logo-alva-green-black.svg'; // 白底顶栏用绿黑版；深色侧栏仍用 logo-alva.svg
function userMenu() {
  if (state.menu !== 'user') return '';
  return menuHTML([
    { ic: 'user-profile-l', label: 'Profile', action: 'go-profile' },
    { ic: 'edit-l1', label: 'My theses', sub: 'Active · Archived · Private', action: 'go-mine' },
    { ic: 'sidebar-agent-normal', label: 'Alva Agent', sub: 'Channels · Chats · Agent', action: 'go-alva' },
    { ic: 'settings-l', label: 'Settings', action: 'noop-settings' },
  ]);
}
function renderTopShell() {
  const D = state.dir; const s = state.screen; const key = `${D}/${s}/${state.param}`;
  const items = [['For You', `${D}/foryou`, s === 'foryou'], ['Explore', `${D}/explore/theses`, s === 'explore'], ['Markets', `${D}/markets`, s === 'markets' || s === 'company'], ['Portfolio', null, false], ['Alva Agent', `${D}/alva`, s === 'alva']]
    .map(([l, goTo, on]) => `<span class="tn-item ${on ? 'on' : ''}" ${goTo ? `data-go="${goTo}"` : 'data-action="noop-portfolio"'}>${l}</span>`).join('');
  const inEditorAlva = s === 'write' && state.chat.mode === 'build';
  const drawer = state.chat.open && !inEditorAlva && s !== 'alva' ? `<div class="chat-drawer">${renderChat()}</div>` : '';
  const fab = s === 'write' || s === 'alva' ? '' : `<button class="fab ${state.chat.open ? 'on' : ''}" data-action="toggle-chat" title="${state.chat.open ? 'Close Alva' : 'Ask Alva'}">${icon('chat-ai-l', 18)}<span>Ask Alva</span></button>`; // 照 X：打开后气泡留着，卡片浮在它上方
  return `<header class="topnav">
    <div class="tn-left"><img class="tn-logo" src="${LOGO_DARK}" alt="Alva" data-go="${D}/foryou"><nav class="tn-nav">${items}</nav></div>
    <div class="tn-right">
      <button class="tn-search" data-action="search-open">${icon('search-l', 16)}<span>Search</span></button>
      <button class="btn pri" data-action="write">${icon('edit-l1', 14)}New Thesis</button>
      <span class="menu-anchor"><button class="tn-user" data-action="menu" data-menu="user">${avatar(A('yggyll'), 32)}</button>${userMenu()}</span>
    </div>
  </header>
  <div class="main"><div class="main-scroll" data-key="${key}">${renderMain()}</div>${fab}</div>${drawer}`;
}
// E · For You：阅读版式——一列 720 的大卡（首段放大成导语），右栏沿用 People to follow / Trending
function renderReading() {
  const st = state.query.state || 'default'; const f = state.exploreFilter;
  let list = visibleTheses().filter((t) => !A(t.authorId).me || t.fresh);
  if (f === 'following') list = list.filter((t) => state.followed.has(t.authorId) || t.fresh);
  else if (TICKERS[f]) list = list.filter((t) => t.versions[0].tickers.some((x) => sym(x) === f));
  const chips = [['all', 'All'], ['following', 'Following'], ...['NVDA', 'MSFT', 'GOOGL', 'AMD', 'HOOD', 'MU'].map((s) => [s, s])];
  const head = `<div class="rd-head"><h1 class="title">For You</h1>${st === 'first' ? '' : `<div class="fchips">${chips.map(([k, l]) => `<button class="fchip ${f === k ? 'on' : ''}" data-action="efilter" data-val="${k}">${l}</button>`).join('')}</div>`}</div>`;
  let body;
  if (st === 'first') body = chooseWho();
  else if (st === 'empty') body = emptyState('search-l', 'Nothing new yet', 'Follow a few people or tickers and their theses will show up here.');
  else if (st === 'error') body = emptyState('close-l1', "Couldn't load", 'Try again in a moment.', `<button class="btn pri" data-action="fystate-reset">Retry</button>`);
  else body = (list.length ? list.map((t) => thesisCard(t, 'story')).join('') : emptyState('search-l', 'Nothing new yet')) + `<div class="feed-end t12 n5">You're up to date</div>`;
  const quick = state.quickPost && st !== 'first' ? quickComposerHTML() : '';
  return `<div class="page reading"><div class="rd-wrap"><div class="rd-main">${head}${quick}${body}</div><aside class="rail">${railPeople()}${railTrending()}</aside></div></div>`;
}
// E · Markets 落地页：搜索 + watchlist + Trending，卡片进公司页
function renderMarkets() {
  return `<div class="page"><div class="rd-col"><div class="page-head"><h1 class="title">Markets</h1><button class="search" data-action="search-open">${icon('search-l', 16)}<span class="grow" style="text-align:left;color:var(--text-n3)">Search any ticker</span></button></div>
    <div class="co-sec" style="margin-top:8px"><h3>Your watchlist</h3>${tickersGrid([...state.watchlist]).replace('mt24', 'mt8')}</div>
    <div class="co-sec"><h3>Trending</h3>${tickersGrid(TRENDING.filter((x) => !state.watchlist.has(x))).replace('mt24', 'mt8')}</div></div></div>`;
}
// E · 全屏编辑器：模块照 app 编辑器（作者行 / Regular 14 正文 / ticker 芯片 / 108 图片卡 / bold · ticker · polish），Publish 在右上；Create with Alva 是右侧抽屉
function writeEditorHTML() {
  const c = state.composer; const me = A('yggyll'); const isUpdate = c.kind === 'update'; const t = isUpdate ? byId(c.thesisId) : null;
  const visMenu = state.menu === 'vis' ? menuHTML([{ ic: 'go-l', label: 'Public', sub: 'Anyone can view for free.', action: 'set-vis', val: 'public' }, { ic: 'locked-l', label: 'Private', sub: 'Only you can see this.', action: 'set-vis', val: 'private' }]) : '';
  const polishMenu = state.menu === 'polish' ? menuHTML([{ ic: 'refresh-l', label: 'Reformat', action: 'polish', val: 'reformat' }, { ic: 'minus-l1', label: 'Shorter', action: 'polish', val: 'shorter' }, { ic: 'add-l1', label: 'Enrich', action: 'polish', val: 'enrich' }], 'left') : '';
  const canPublish = c.text.trim().length > 0 && !c.publishing; const withAlva = state.chat.open && state.chat.mode === 'build';
  return `<div class="ed">
    <div class="ed-head"><button class="act h32" data-action="write-cancel">${icon('arrow-left-l1', 16)}<span>Back</span></button><span class="t14 n5">${isUpdate ? 'Update thesis' : 'New thesis'}</span><span class="grow"></span>
      ${isUpdate ? '' : `<span class="menu-anchor"><button class="vis-pill" data-action="menu" data-menu="vis">${cap(c.visibility)}${icon('arrow-down-f2', 12)}</button>${visMenu}</span>`}
      <button class="btn ${isUpdate ? 'blue' : 'pri'}" data-action="compose-publish" ${canPublish ? '' : 'disabled'}>${c.publishing ? `${squares()}<span>${isUpdate ? 'Updating…' : 'Publishing…'}</span>` : (isUpdate ? 'Update' : 'Publish')}</button></div>
    <div class="cmp-author">${avatar(me, 36)}<span class="col grow"><span class="t14 med">${esc(me.name)}</span><span class="t12 n5">${isUpdate ? `Adding update ${t ? t.versions.length + 1 : ''} · last update ${esc(t?.versions[0].time || '')}` : esc(me.role)}</span></span></div>
    <textarea class="cp-text size-page" data-input="composer" placeholder="What is your thesis and why?">${esc(c.text)}</textarea>
    ${c.tickers.length ? `<div class="cp-tickers">${c.tickers.map((sy) => `<span class="chip tk">${logoImg(sy, 16)}<span>${sy}</span><button class="xs" data-action="ticker-remove" data-sym="${sy}">${icon('close-l1', 10)}</button></span>`).join('')}</div>` : '<div class="cp-tickers" hidden></div>'}
    <div class="cp-media app">${c.media.map((m, i) => `<div class="mtile lg"><img src="${m.img}" alt=""><button class="x" data-action="media-remove" data-i="${i}">${icon('close-l1', 10)}</button></div>`).join('')}<button class="mtile lg add" data-action="media-add" title="Add image">${licon('image-l', 28)}</button></div>
    ${c.polish ? polishHTML() : ''}
    ${c.alert ? `<div class="alert">${icon('warning-f', 14, 'm4')}<span class="grow">No tickers detected — select them manually.</span><button class="act" data-action="alert-dismiss">${icon('close-l1', 12)}</button></div>` : ''}
    <div class="cmp-foot">
      <div class="tools app"><button class="tool" title="Bold" data-action="noop-bold">${licon('bold-l')}</button><span class="menu-anchor"><button class="tool ${state.menu === 'tickers' ? 'on' : ''}" title="Add ticker" data-action="menu" data-menu="tickers">${licon('ticker-l')}</button>${state.menu === 'tickers' ? tickerPicker() : ''}</span><span class="menu-anchor"><button class="tool ${c.polish || state.menu === 'polish' ? 'on' : ''}" title="Polish" data-action="menu" data-menu="polish">${licon('polish-l')}</button>${polishMenu}</span></div>
      ${isUpdate ? '' : `<button class="btn sec ${withAlva ? 'on' : ''}" data-action="build">${licon('generate-l', 16)}Create with Alva</button>`}
    </div>
  </div>`;
}
function renderWrite() {
  const withAlva = state.chat.open && state.chat.mode === 'build';
  return `<div class="page write"><div class="ed-wrap ${withAlva ? 'with-alva' : ''}">${writeEditorHTML()}${withAlva ? `<aside class="ed-alva">${renderChat()}</aside>` : ''}</div></div>`;
}

/* ══════════ H · 公司页时间轴与结果追踪 ══════════ */
const TODAY = '2026-09-23'; const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
// 版本时间 "13 Sep, 08:12" / "23 Sep, 2024" / "Just now" → ISO 日期（无年份按 2026）
function dateOf(time) {
  if (!time || /just now/i.test(time)) return TODAY;
  const m = /^(\d{1,2}) ([A-Za-z]{3})(?:,\s*(\d{4}))?/.exec(time); if (!m) return TODAY;
  const mi = MONTHS.indexOf(m[2].toLowerCase()); if (mi < 0) return TODAY;
  return `${m[3] || '2026'}-${String(mi + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}
function priceAt(s, iso) { const b = bars(s); if (!b) return null; let hit = null; for (const x of b) { if (x.time <= iso) hit = x; else break; } return hit ? hit.close : null; }
const tickersOf = (t) => t.versions[0].tickers.map(sym);
const firstDate = (t) => dateOf(t.versions.at(-1).time);
const lastDate = (t) => dateOf(t.versions[0].time);
function sincePublish(t, s) { const d0 = firstDate(t); const p0 = priceAt(s, d0); const q = quote(s); if (!p0 || !q) return null; return { d0, p0, now: q.price, pct: (q.price / p0 - 1) * 100 }; }
// 终端页与时间轴共用同一份范围：这只票上的公开 thesis + 我的（含 private）
function termScope(s) {
  const pub = thesesByTicker(s); const mine = THESES.filter((t) => A(t.authorId).me && tickersOf(t).includes(s) && t.status === 'active');
  const all = [...mine, ...pub.filter((t) => !mine.includes(t))].sort((a, b) => (lastDate(b) > lastDate(a) ? 1 : lastDate(b) < lastDate(a) ? -1 : 0));
  const f = state.termFilter; const shown = f === 'mine' ? mine : f === 'following' ? all.filter((t) => state.followed.has(t.authorId) || A(t.authorId).me) : all;
  return { all, mine, shown };
}
// 流的一行：左列「发布日 · 当时价 · 至今涨跌 · 更新数」，右边标准 thesis 卡；点色与图上一致
function termRow(t, s) { // 用户 2026-09-23：左边那列时间多余——发布时价改挂在 ticker 芯片上，行就是一张标准卡
  return `<div class="tl-row" id="th-${t.id}">${thesisCard(t, 'feed')}</div>`;
}
// H · For You = 关注的人在我 watchlist 上的动作
function renderTermForYou() {
  const list = visibleTheses().filter((t) => !A(t.authorId).me && state.followed.has(t.authorId) && tickersOf(t).some((x) => state.watchlist.has(x))).sort((a, b) => (lastDate(b) > lastDate(a) ? 1 : -1));
  const head = `<div class="page-head"><h1 class="title">For You</h1></div><p class="n7" style="margin:-8px 0 12px">What the people you follow are saying about your watchlist · ${[...state.watchlist].join(' · ')}</p>`;
  const body = list.length ? `<div class="tl-stream">${list.map((t) => termRow(t, tickersOf(t).find((x) => state.watchlist.has(x)))).join('')}</div>` : emptyState('search-l', 'Nothing new yet', 'Follow more people or add tickers to your watchlist.');
  return `<div class="page term"><div class="term-col">${head}${body}</div></div>`;
}
// 详情页顶部：每个 ticker 一段「发布时价 → 现价 · 至今涨跌」
function sinceStrip(t) {
  const items = tickersOf(t).map((s) => { const sp = sincePublish(t, s); if (!sp) return `<span class="ss-item" data-go="${state.dir}/company/${s}">${logoImg(s, 16)}<span class="med">${s}</span><span class="n5">no price data</span></span>`; return `<span class="ss-item" data-go="${state.dir}/company/${s}">${logoImg(s, 16)}<span class="med">${s}</span><span class="n7">${fmtPrice(sp.p0)} → ${fmtPrice(sp.now)}</span><span class="${sp.pct >= 0 ? 'up' : 'down'}">${fmtPct(sp.pct)}</span><span class="n5">since ${fmtDate(sp.d0)}</span></span>`; }).join('');
  return items ? `<div class="since-strip">${items}</div>` : '';
}
// 价格图 + thesis 标记：每个版本一个点落在当天（或之前最近一根）bar 上；我的用 m1 实心并连虚线，同日多条向上叠
function hydrateTimeline() {
  if (!snapshot) return;
  $$('[data-timeline]:not([data-done])').forEach((el) => {
    el.dataset.done = '1'; const s = el.dataset.timeline; const b = bars(s);
    if (!b) { el.innerHTML = '<div class="ph-box">No price data in the snapshot for this ticker.</div>'; return; }
    const end = new Date(b.at(-1).time + 'T00:00:00Z'); end.setUTCMonth(end.getUTCMonth() - state.companyRange); const cut = end.toISOString().slice(0, 10);
    const win = b.filter((x) => x.time >= cut); const n = win.length; if (n < 2) return;
    const W = Math.max(el.clientWidth, 480), H = 320, L = 12, R = 68, T = 32, B = 30;
    const lows = win.map((x) => x.low ?? x.close), highs = win.map((x) => x.high ?? x.close);
    const min = Math.min(...lows), max = Math.max(...highs); const rng = max - min || 1;
    const X = (i) => L + (i / (n - 1)) * (W - L - R); const Y = (v) => T + (1 - (v - min) / rng) * (H - T - B);
    let d = ''; win.forEach((x, i) => { d += `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(x.close).toFixed(1)} `; });
    const up = win.at(-1).close >= win[0].close; const c = up ? '#2a9b7d' : '#e05357'; const id = 'tl' + (++gid);
    let ticks = ''; let lastM = '';
    win.forEach((x, i) => { const m = x.time.slice(0, 7); if (m !== lastM) { lastM = m; if (i === 0 && n > 40) return; const lbl = new Date(x.time + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }); ticks += `<line x1="${X(i).toFixed(1)}" x2="${X(i).toFixed(1)}" y1="${T}" y2="${H - B}" class="tl-grid"/><text x="${(X(i) + 4).toFixed(1)}" y="${H - 9}" class="tl-ax">${lbl}</text>`; } });
    const yl = (v) => `<text x="${W - R + 10}" y="${(Y(v) + 4).toFixed(1)}" class="tl-ax">${fmtPrice(v)}</text>`;
    const axis = `<line x1="${L}" x2="${W - R}" y1="${Y(max).toFixed(1)}" y2="${Y(max).toFixed(1)}" class="tl-grid"/><line x1="${L}" x2="${W - R}" y1="${Y(min).toFixed(1)}" y2="${Y(min).toFixed(1)}" class="tl-grid"/>${yl(max)}${yl(min)}`;
    const last = win.at(-1).close; const ly = Y(last);
    const lastLbl = `<rect x="${W - R + 6}" y="${(ly - 10).toFixed(1)}" width="${R - 12}" height="20" rx="4" class="tl-last-bg"/><text x="${W - R + 12}" y="${(ly + 4).toFixed(1)}" class="tl-last">${fmtPrice(last)}</text>`;
    const idx = (iso) => { let k = -1; for (let i = 0; i < n; i++) { if (win[i].time <= iso) k = i; else break; } return k; };
    const { shown } = termScope(s); const stack = {}; let marks = '', links = '';
    shown.forEach((t) => {
      const me = !!A(t.authorId).me; const pts = []; const vers = [...t.versions].reverse(); // 旧 → 新
      vers.forEach((v, vi) => {
        const i = idx(dateOf(v.time)); if (i < 0) return;
        const k = (stack[i] = (stack[i] || 0) + 1); const x = X(i), y = Y(win[i].close) - 14 * k; pts.push([x, y]);
        marks += `<g class="tl-mark ${me ? 'me' : ''}" data-thesis="${t.id}" data-v="${t.versions.length - 1 - vi}" data-go="${state.dir}/thesis/${t.id}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="10" class="hit"/><circle r="${vi === vers.length - 1 ? 5 : 3.5}" class="dot"/></g>`;
      });
      if (me && pts.length > 1) links += `<path d="${pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')}" class="tl-link"/>`;
    });
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".16"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs>${ticks}${axis}<path d="${d}L${X(n - 1).toFixed(1)} ${H - B} L${L} ${H - B} Z" fill="url(#${id})"/><path d="${d}" fill="none" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>${lastLbl}${links}${marks}</svg><div class="tl-tip" hidden></div>`;
  });
}

/* ══════════ 线一补丁（详情右栏 / 全局搜索 / Activity / 新建入口）· 线二 H 公司页优先 · M 公开页壳 ══════════ */
// 右栏规则：对话框关闭时右栏放上下文（Related / Relevant people / Tickers），打开就收起退回 tabs；C 本来就是两栏，E 是文章版式，不套
const railOn = () => state.detailRail && !state.chat.open && !state.guest && PATCH_DIRS.includes(state.dir);
function compactThesisRow(t) { const a = A(t.authorId); return `<div class="rrow" data-go="${state.dir}/thesis/${t.id}">${avatar(a, 24)}<span class="col grow"><span class="t12 trunc"><span class="med">${esc(a.name)}</span><span class="n5"> · ${esc(t.time)}</span></span><span class="t12 n7 clamp2">${esc(t.versions[0].paragraphs[0])}</span></span></div>`; }
function detailRail(t) {
  const rel = relatedFor(t); const a = A(t.authorId);
  const ppl = [a.id, ...rel.map((x) => x.authorId)].filter((id, i, arr) => arr.indexOf(id) === i && !A(id).me).slice(0, 4);
  const tks = t.versions[0].tickers.map(sym);
  return `<aside class="th-rail">
    ${rel.length ? `<div class="rail-box"><div class="rail-title"><span>Related theses · ${rel.length}</span></div>${rel.slice(0, 5).map(compactThesisRow).join('')}</div>` : ''}
    ${ppl.length ? `<div class="rail-box"><div class="rail-title"><span>Relevant people</span></div>${ppl.map((id) => personRow(A(id), 32)).join('')}</div>` : ''}
    ${tks.length ? `<div class="rail-box"><div class="rail-title"><span>Tickers</span></div>${tks.map((sy) => `<div class="trow" data-go="${state.dir}/company/${sy}">${logoImg(sy, 24)}<span class="col grow"><span class="name">${sy}</span><span class="role trunc">${esc(TICKERS[sy]?.name || '')}</span></span><span class="q" data-quote="${sy}"></span></div>`).join('')}</div>` : ''}
  </aside>`;
}
function signalsSection(t) {
  const sigs = signalsFor(t);
  return `<div class="sig-sec"><h3 class="t16 med" style="margin:0">Signals <span class="n5" style="font-weight:400">(${t.signalsPending ? '…' : sigs.length})</span></h3>${t.signalsPending ? `<div class="gen">${squares()}<div>Reviewing signals from the past 7 days.<br>This may take a few minutes…</div></div>` : sigs.map(signalCard).join('')}</div>`;
}
// Activity：收藏 thesis 的新 signal · 关注的人的 thesis 更新 · 我的 thesis 被收藏（照 Substack 的 Activity 一级项）
function activityItems() {
  const items = [];
  for (const t of THESES) {
    const a = A(t.authorId); if (t.status !== 'active') continue; const sub = t.versions[0].paragraphs[0]; const date = lastDate(t);
    if (t.newSignals && (t.saved || a.me)) items.push({ kind: 'signals', t, a, text: `${plural(t.newSignals, 'new signal')} on ${a.me ? 'your thesis' : a.name + '’s thesis'}`, sub, time: t.time, date });
    if (!a.me && state.followed.has(t.authorId) && t.visibility !== 'private') items.push({ kind: 'updates', t, a, text: `${a.name} ${t.kind === 'update' ? `updated a thesis · ${plural(t.versions.length, 'version')}` : 'published a new thesis'}`, sub, time: t.time, date });
    if (a.me && t.saves) items.push({ kind: 'mine', t, a, text: `${plural(t.saves, 'person').replace('persons', 'people')} saved your thesis`, sub, time: t.time, date });
  }
  return items.sort((x, y) => (y.date > x.date ? 1 : y.date < x.date ? -1 : 0));
}
const activityCount = () => activityItems().filter((i) => i.kind !== 'mine').length;
function renderActivity() {
  const f = state.activityFilter || 'all'; const all = activityItems(); const list = f === 'all' ? all : all.filter((i) => i.kind === f);
  const chips = [['all', `All · ${all.length}`], ['signals', 'Signals'], ['updates', 'Updates'], ['mine', 'On my theses']];
  const rows = list.map((i) => `<div class="act-row" data-go="${state.dir}/thesis/${i.t.id}">${avatar(i.a, 32)}<span class="col grow"><span class="med trunc">${esc(i.text)}</span><span class="t12 n5 trunc">${esc(i.sub)}</span></span><span class="t12 n5" style="white-space:nowrap">${esc(i.time)}</span></div>`).join('');
  return `<div class="page"><div class="rd-col" style="max-width:880px"><div class="page-head"><h1 class="title">Activity</h1></div><div class="fchips" style="margin-bottom:12px">${chips.map(([k, l]) => `<button class="fchip ${f === k ? 'on' : ''}" data-action="afilter" data-val="${k}">${l}</button>`).join('')}</div>${rows || emptyState('notification-l', 'Nothing new', 'Signals on saved theses and updates from people you follow show up here.')}</div></div>`;
}
// 结果追踪表：H 的 Profile › Theses 主态使用
function manageTableHTML(list) {
  const rows = list.map((t) => {
    const tk = tickersOf(t); const s = tk[0]; const sp = s ? sincePublish(t, s) : null; const cur = t.versions[0];
    return `<tr data-go="${state.dir}/thesis/${t.id}"><td><span class="row8">${s ? logoImg(s, 20) : icon('global-l', 16, 'n5')}<span class="med">${tk.join(', ') || 'Macro'}</span></span></td><td class="body"><span class="trunc2">${esc(cur.paragraphs[0])}</span><span class="row8 mt8">${t.status === 'archived' ? tag('archived') : tag(t.kind)}${t.visibility === 'private' ? tag('private') : ''}</span></td><td>${fmtDate(firstDate(t))}</td><td>${t.versions.length}</td><td>${sp ? `${fmtPrice(sp.p0)} → ${fmtPrice(sp.now)}` : '—'}</td><td class="${sp ? (sp.pct >= 0 ? 'up' : 'down') : 'n3'}">${sp ? fmtPct(sp.pct) : '—'}</td><td>${t.signalsPending ? 'Generating…' : plural(signalsFor(t).length, 'signal')}</td><td class="act-cell"><span class="menu-anchor"><button class="act" data-action="menu" data-menu="row-${t.id}">${icon('more-l1', 16)}</button>${state.menu === 'row-' + t.id ? menuHTML(ownerMenu(t)) : ''}</span></td></tr>`;
  }).join('');
  return `<table class="mine"><thead><tr><th>Ticker</th><th>Thesis</th><th>Published</th><th>Versions</th><th>Price then → now</th><th>Since publish</th><th>Signals</th><th></th></tr></thead><tbody>${rows || `<tr><td colspan="8">${emptyState('search-l', state.profileFilter === 'archived' ? 'No archived thesis' : 'No active thesis')}</td></tr>`}</tbody></table>
    <p class="t12 n5 mt12">Since publish is the ticker's price change from the first version's close to the latest close, not a verdict on the thesis; a bearish view reads the other way.</p>`;
}
// M · 公开页壳：未登录访客只有三页（thesis 分享页 · 作者公开主页 · ticker 公开页），其余是登录门
function authorCard(a) { return `<div class="author-card">${avatar(a, 56)}<span class="t16 med">${esc(a.name)}${a.member === false ? ' ' + botBadge() : ''}</span><span class="t12 n5">${esc(a.followers || '0')} followers${a.handle ? ' · ' + esc(a.handle) : ''}</span>${a.bio ? `<p class="t12 n7">${esc(a.bio)}</p>` : ''}<button class="btn pri sm" data-action="guest-signin">Follow</button></div>`; }
function publicGate(what) { return `<div class="page"><div class="pub-gate">${icon('locked-l', 28, 'n3')}<h3 class="t18">Sign in to see ${esc(what)}</h3><p class="n5">Public pages are theses, authors and tickers. Everything else is for members.</p><button class="btn pri" data-action="toggle-guest">Sign in</button></div></div>`; }
function renderPublicShell() {
  const D = state.dir; const s = state.screen; const key = `pub/${D}/${s}/${state.param}`;
  const body = s === 'thesis' ? publicThesis() : s === 'profile' ? publicProfile() : s === 'company' ? publicCompany() : publicGate(SCREEN_LABEL[s] || 'this page');
  return `<header class="topnav public"><div class="tn-left"><img class="tn-logo" src="${LOGO_DARK}" alt="Alva" data-go="${D}/thesis/gavin-ai-flow"><span class="pub-tag">Public · signed out</span></div><div class="tn-right"><button class="tn-search" data-action="search-open">${icon('search-l', 16)}<span>Search theses, people, tickers</span></button><button class="btn ghost" data-action="toggle-guest">Sign in</button><button class="btn pri" data-action="toggle-guest">Get started</button></div></header>
  <div class="main"><div class="main-scroll" data-key="${key}">${body}</div></div>`;
}
const pubCTA = (text) => `<div class="pub-cta"><span class="t14">${text}</span><button class="btn pri" data-action="toggle-guest">Sign in</button></div>`;
function publicThesis() {
  const t = byId(state.param); if (!t) return publicGate('this thesis');
  const a = A(t.authorId); const cur = t.versions[0]; const next = t.versions[1]; const rel = relatedFor(t);
  const meta = `<div class="art-meta">${avatar(a, 44)}<span class="col grow" data-go="${state.dir}/profile/${a.id}"><span class="t14 med">${esc(a.name)}${a.member === false ? ' ' + botBadge() : ''}</span><span class="t12 n5">${esc(a.role)} · ${esc(cur.time)}</span></span><div class="row2"><button class="act h32" data-action="guest-signin">${icon('bookmark-l', 16)}<span>${t.saves}</span></button><button class="act h32" data-action="copy-link">${icon('share-l', 16)}</button></div></div>`;
  const current = `<div class="vrow">${next ? rail24(true, false) : ''}<div class="grow pb32">${feedContent(cur, t)}</div></div>`;
  const peek = next ? `<div class="peek"><div class="vrow">${rail24(false, false)}<div class="grow">${feedContent(next, t, { latestTag: false })}</div></div><div class="peek-fade"><div class="g"></div><div class="bar"><button class="pill" data-action="guest-signin"><span>Sign in to view all ${t.versions.length} updates</span>${icon('arrow-right-l2', 12)}</button></div></div></div>` : '';
  const ppl = rel.map((x) => x.authorId).filter((id, i, arr) => arr.indexOf(id) === i && id !== a.id && !A(id).me).slice(0, 4);
  return `<div class="page pub"><div class="pub-wrap"><div class="pub-main">${meta}${current}${peek}${signalsSection(t)}</div><aside class="pub-rail">${authorCard(a)}${ppl.length ? `<div class="rail-box"><div class="rail-title"><span>Relevant people</span></div>${ppl.map((id) => `<div class="prow"><span class="row8 grow" data-go="${state.dir}/profile/${id}">${avatar(A(id), 32)}<span class="col grow"><span class="name trunc">${esc(A(id).name)}</span><span class="role trunc">${esc(A(id).role)}</span></span></span><button class="btn sec sm" data-action="guest-signin">Follow</button></div>`).join('')}</div>` : ''}</aside></div>
    ${rel.length ? `<div class="pub-related"><h3 class="t18 med">Related theses</h3>${masonryHTML(rel.slice(0, 6), 'related', 3)}</div>` : ''}
    ${pubCTA('Sign in to ask Alva about this thesis, save it, or write your own.')}</div>`;
}
function publicProfile() {
  const a = A(state.param) || A('gavin'); const list = THESES.filter((t) => t.authorId === a.id && t.status === 'active' && t.visibility !== 'private');
  const tab = state.profileTab === 'about' ? 'about' : 'theses';
  return `<div class="page pub"><div class="pub-wrap"><div class="pub-main"><div class="pf-name">${esc(a.name)}${a.member === false ? botBadge() : ''}</div><div class="t12 n5">${a.handle ? esc(a.handle) : ''}${a.joined ? ` · Joined ${esc(a.joined)}` : ''}</div>
    <div class="pf-tabs"><div class="tabs lg">${[['theses', 'Theses'], ['about', 'About']].map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-action="ptab" data-tab="${k}">${l}${k === 'theses' ? ` <span class="cnt">${list.length}</span>` : ''}</button>`).join('')}</div></div>
    ${tab === 'theses' ? `<div class="pf-list">${list.map((t) => thesisCard(t, 'feed')).join('') || emptyState('search-l', 'No public thesis yet')}</div>` : `<p class="mt16 n7">${esc(a.bio || '')}</p>${a.member === false ? `<div class="pf-note mt8">${icon('bot-l', 14)}Compiled from public information. Not affiliated with Alva.</div>` : ''}`}</div>
    <aside class="pub-rail">${authorCard(a)}</aside></div>${pubCTA(`Sign in to follow ${esc(a.name)} and get their updates in your feed.`)}</div>`;
}
function publicCompany() {
  const s = (state.param || 'NVDA').toUpperCase(); const meta = TICKERS[s] || { name: s, venue: '—', industry: '' }; const list = thesesByTicker(s);
  return `<div class="page pub"><div class="pub-wrap"><div class="pub-main"><div class="co-head"><span class="row8" style="gap:16px">${logoImg(s, 40)}<span class="col"><span class="co-name">${esc(meta.name)}</span><span class="co-sub">${esc(meta.venue)}: ${s}${meta.industry ? ' · ' + esc(meta.industry) : ''}</span></span></span><span data-bigquote="${s}"></span></div>
    <div class="co-sec"><h3>Price</h3><div class="bigchart" data-bigchart="${s}"></div></div>
    <div class="co-sec"><h3>Theses on ${s} · ${list.length}</h3>${list.length ? masonryHTML(list, 'related', 2) : emptyState('search-l', 'No theses yet')}</div></div>
    <aside class="pub-rail"><div class="rail-box"><div class="rail-title"><span>About</span></div><p class="t12 n7">${esc(ABOUT[s] || ABOUT.DEFAULT)}</p></div></aside></div>${pubCTA(`Sign in to write your thesis on ${s} and track its signals.`)}</div>`;
}

/* ══════════ C · Alva 页（agent 模块）：顶栏一项 = spec 里的全屏 chat / Agent Channel 页；右下抽屉 = side panel，两者同一个会话 ══════════ */
const AGENT_CHANNELS = () => [{ id: 'agent', name: 'Alva', sub: 'Agent channel', ic: 'sidebar-agent-normal' }, ...SIDEBAR.channels.map((c) => ({ id: c.toLowerCase().replace(/\s+/g, '-'), name: c, sub: 'Topic channel', ic: 'sidebar-channel-normal' }))];
const AGENT_TABS = [['chat', 'Chat'], ['tasks', 'Tasks'], ['memory', 'Memory'], ['alerts', 'Alerts'], ['files', 'Files']]; // 顺序照 topic-channel spec：Chat、Tasks、Memory、Alerts、Files
function agentTabBody(tab, ch) {
  const row = (ic, title, sub, right = '') => `<div class="ag-item">${icon(ic, 16, 'n5')}<span class="col grow"><span class="trunc">${esc(title)}</span><span class="t12 n5 trunc">${esc(sub)}</span></span><span class="t12 n5">${right}</span></div>`;
  if (tab === 'tasks') return `<p class="t12 n5 ag-hint">后台长任务，用频道下的 child session 跑，完成后把结果和产物写回频道。</p>${row('refresh-l', 'weekly-nvda-thesis-digest', 'Runs every Monday 08:00 · next in 4d', 'Running')}${row('check-l1', 'backfill-msft-signals', 'Finished · 12 signals written to the channel', '2h ago')}`;
  if (tab === 'memory') return `<p class="t12 n5 ag-hint">频道记忆和全局记忆叠加读取；Journal 每天一条，Memory Pack 按功能域分包。</p>${row('book-l', 'journal/2026-09-22.md', 'Reviewed 3 theses on MSFT, pinned the capacity thesis', 'Journal')}${row('book-l', 'packs/watchlist/', 'NVDA · MSFT · AMD, thresholds and last touch', 'Memory Pack')}`;
  if (tab === 'alerts') return `<p class="t12 n5 ag-hint">从这个频道发起的 Feed 订阅产生的提醒，在这里开关。</p>${row('notification-l', 'New signal on a saved thesis', 'Gavin Baker · Retail participation is back', 'On')}${row('notification-l', 'Thesis updated by someone you follow', 'Satya Nadella · Azure surpassed $75 billion', 'On')}`;
  if (tab === 'files') return `<p class="t12 n5 ag-hint">频道文件目录：agent 产物、IM 附件和带 channel_id 的 Web 上传。</p>${row('table-l', 'msft-capacity-vs-azure-growth.png', 'Chart · generated by Alva', 'Sep 22')}${row('book-l', 'Alva Release Ledger - Product Updates.md', 'Uploaded from web', 'Sep 15')}`;
  return '';
}
function renderAlvaPage() {
  const ag = state.agent; const c = state.chat; const chs = AGENT_CHANNELS(); const ch = chs.find((x) => x.id === ag.channel) || chs[0]; const tab = ag.tab || 'chat';
  const left = `<aside class="ag-left">
    <button class="btn pri ag-new" data-action="agent-new">${PLUS}New Chat</button>
    <div class="ag-group"><div class="ag-head"><span>Channels</span><button class="act" data-action="noop-channel" title="New channel">${icon('add-l2', 14)}</button></div>${chs.map((x) => `<div class="ag-row ${ch.id === x.id && !ag.chatIdx ? 'on' : ''}" data-action="agent-ch" data-val="${x.id}">${icon(x.ic, 16)}<span class="trunc">${esc(x.name)}</span></div>`).join('')}</div>
    <div class="ag-group"><div class="ag-head"><span>Chats</span></div>${SIDEBAR.chats.map((t, i) => `<div class="ag-row ${ag.chatIdx === i + 1 ? 'on' : ''}" data-action="agent-chat" data-val="${i + 1}">${icon('chat-l1', 16)}<span class="trunc">${esc(t)}</span></div>`).join('')}</div>
  </aside>`;
  const title = ag.chatIdx ? SIDEBAR.chats[ag.chatIdx - 1] : ch.name; const sub = ag.chatIdx ? 'Chat · web session' : ch.sub;
  const tabs = ag.chatIdx ? '' : `<div class="tabs">${AGENT_TABS.map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-action="agent-tab" data-tab="${k}">${l}</button>`).join('')}</div>`;
  const intro = c.msgs.length ? '' : msgHTML({ type: 'alva', text: ch.id === 'agent' ? "Hi YGGYLL — this is your Agent channel. Ask anything, or tell me what you're watching and I'll draft a thesis with the data behind it." : `This is the ${ch.name} channel. Tasks, memory and files here stay inside the channel.`, chips: ['Pick a ticker', 'Start from my feed', 'Describe it in a sentence'] });
  const chat = `<div class="ag-body" id="chat-body">${intro}${c.msgs.map(msgHTML).join('')}${c.typing ? `<div class="msg alva">${alvaHead()}<div class="typing"><i></i><i></i><i></i></div></div>` : ''}</div>
    <div class="ag-foot"><div class="cin">${c.ctx ? `<span class="ctx">${icon(c.ctx.type === 'thesis' ? 'edit-l1' : c.ctx.type === 'ticker' ? 'sidebar-k-normal' : 'chat-ai-l', 12)}<span>${esc(ctxLabel())}</span><button class="act" data-action="ctx-clear">${icon('close-l1', 10)}</button></span>` : ''}<textarea data-input="chat" placeholder="Ask Alva anything. @ for context, / for skills"></textarea><div class="cin-row"><div class="row8">${icon('add-l2', 16)}${icon('at-l', 16)}${icon('skill-l', 16)}</div><div class="row8"><span class="model-pill">${icon('lightning-l', 12)}GPT-5.6 Sol${icon('arrow-down-l2', 10)}</span><button class="send" data-action="chat-send">${icon('arrow-up-l1', 14)}</button></div></div></div></div>`;
  const body = tab === 'chat' || ag.chatIdx ? chat : `<div class="ag-body">${agentTabBody(tab, ch)}</div>`;
  return `<div class="page agent"><div class="ag-wrap">${left}<section class="ag-main"><div class="ag-top"><div class="row8">${icon(ag.chatIdx ? 'chat-l1' : ch.ic, 18)}<span class="col"><span class="t16 med">${esc(title)}</span><span class="t12 n5">${esc(sub)}</span></span></div><span class="grow"></span><button class="act" title="Agent settings" data-action="noop-settings">${icon('settings-l', 16)}</button></div>${tabs}${body}</section></div></div>`;
}

/* C · 顶部快速发表（竞品补丁，照 X 首页顶部的发帖框）：共用 state.composer，mode = 'quick'；工具与 app 编辑器一致（图片 / 加粗 / ticker / polish），发完留在当前页 */
function ensureQuick() {
  const c = state.composer; if (c.mode === 'quick') return;
  Object.assign(c, { open: true, mode: 'quick', kind: 'new', text: '', tickers: [], removed: [], media: [], visibility: 'public', thesisId: null, polish: null, alert: false, alertDismissed: false, publishing: false });
}
function quickComposerHTML() {
  const c = state.composer; const on = c.mode === 'quick'; const me = A('yggyll');
  const text = on ? c.text : ''; const tickers = on ? c.tickers : []; const media = on ? c.media : [];
  const visMenu = on && state.menu === 'vis' ? menuHTML([{ ic: 'go-l', label: 'Public', sub: 'Anyone can view for free.', action: 'set-vis', val: 'public' }, { ic: 'locked-l', label: 'Private', sub: 'Only you can see this.', action: 'set-vis', val: 'private' }]) : '';
  const polishMenu = on && state.menu === 'polish' ? menuHTML([{ ic: 'refresh-l', label: 'Reformat', action: 'polish', val: 'reformat' }, { ic: 'minus-l1', label: 'Shorter', action: 'polish', val: 'shorter' }, { ic: 'add-l1', label: 'Enrich', action: 'polish', val: 'enrich' }], 'left') : '';
  const can = on && c.text.trim().length > 0 && !c.publishing;
  return `<div class="qpost"><div class="qpost-top">${avatar(me, 40)}<div class="qpost-col">
    <textarea class="cp-text size-quick" data-input="composer" placeholder="What's your thesis?">${esc(text)}</textarea>
    ${tickers.length ? `<div class="cp-tickers">${tickers.map((sy) => `<span class="chip tk">${logoImg(sy, 16)}<span>${sy}</span><button class="xs" data-action="ticker-remove" data-sym="${sy}">${icon('close-l1', 10)}</button></span>`).join('')}</div>` : '<div class="cp-tickers" hidden></div>'}
    ${media.length ? `<div class="cp-media app">${media.map((m, i) => `<div class="mtile lg"><img src="${m.img}" alt=""><button class="x" data-action="media-remove" data-i="${i}">${icon('close-l1', 10)}</button></div>`).join('')}</div>` : ''}
    ${on && c.polish ? polishHTML() : ''}
  </div></div>
  ${on && c.alert ? `<div class="alert">${icon('warning-f', 14, 'm4')}<span class="grow">No tickers detected — select them manually.</span><button class="act" data-action="alert-dismiss">${icon('close-l1', 12)}</button></div>` : ''}
  <div class="qpost-foot">
      <div class="tools app"><button class="tool" title="Add image" data-action="media-add">${licon('image-l')}</button><button class="tool" title="Bold" data-action="noop-bold">${licon('bold-l')}</button><span class="menu-anchor"><button class="tool ${on && state.menu === 'tickers' ? 'on' : ''}" title="Add ticker" data-action="menu" data-menu="tickers">${licon('ticker-l')}</button>${on && state.menu === 'tickers' ? tickerPicker() : ''}</span><span class="menu-anchor"><button class="tool ${on && (c.polish || state.menu === 'polish') ? 'on' : ''}" title="Polish" data-action="menu" data-menu="polish">${licon('polish-l')}</button>${polishMenu}</span></div>
      <div class="row8"><span class="menu-anchor"><button class="vis-pill" data-action="menu" data-menu="vis">${cap(on ? c.visibility : 'public')}${icon('arrow-down-f2', 12)}</button>${visMenu}</span><button class="btn pri" data-action="compose-publish" ${can ? '' : 'disabled'}>${on && c.publishing ? `${squares()}<span>Publishing…</span>` : 'Publish'}</button></div>
  </div>
</div>`;
}

/* ══════════ 说明抽屉 ══════════ */
function notesHTML() {
  const d = state.dir; const scr = state.screen; const groups = [];
  const push = (h, items) => { if (items?.length) groups.push({ h, items }); };
  if (scr === 'overview') push('三个方案共用的 web 规则', NOTES.common);
  else {
    push(`${DIRS[d].short} · ${SCREEN_LABEL[scr]}`, NOTES[d]?.[scr]);
    if (PATCH_DIRS.includes(d)) { if (state.entry !== 'plus') push('补丁 · 新建入口', NOTES.patches?.entry); if (state.detailRail && (scr === 'thesis' || scr === 'company')) push('补丁 · 详情右栏', NOTES.patches?.rail); if (state.globalSearch) push('补丁 · 全局搜索', NOTES.patches?.search); if (state.activity) push('补丁 · Activity', NOTES.patches?.activity); }
    if (state.guest) push('M · 客态公开页壳', NOTES.patches?.guest);
    if (d === 'e' && state.quickPost) push('补丁 · 顶部快速发表', NOTES.patches?.quick);
    if (!DIRS[d].shell) push(`Sidebar ${(SB_OPTIONS.find(([v]) => v === sbVariant()) || [])[1] || ''}`, NOTES.sidebar?.[sbVariant()]);
    if (d === 'b') push(`Explore + Markets · ${state.mergeMarkets ? '合并' : '分开'}`, NOTES.merge?.[state.mergeMarkets ? 'on' : 'off']);
    if (state.composer.open || state.chat.mode === 'build' || scr === 'foryou' || scr === 'write') push('创建', NOTES[d]?.compose);
    if (state.search.open || scr === 'company') push('Search', NOTES[d]?.search);
    push('通用规则', NOTES.common);
  }
  return `<aside class="notes"><div class="row-between"><span class="notes-title">设计说明</span><button class="act" data-action="toggle-notes">${icon('close-l1', 14)}</button></div>${groups.map((g) => `<h4>${esc(g.h)}</h4><ul>${g.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`).join('')}</aside>`;
}

/* ══════════ 总览 ══════════ */
const ovCards = (list, cls = '') => `<div class="ov-cards ${cls}">${list.map((d) => `<div class="ov-card ${d.key === 'b' ? 'rec' : ''}"><div class="ov-card-head"><span class="ov-key">${d.short || d.key.toUpperCase()}</span><span class="ov-name">${esc(d.name.replace(/^[A-Z] · /, ''))}</span>${d.key === 'b' ? '<span class="tag new">推荐</span>' : ''}</div><p class="ov-tag">${esc(d.tagline)}</p><table>${d.rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table><button class="btn pri lg" data-action="dir" data-dir="${d.key}">进入方案 ${d.short || d.key.toUpperCase()}</button></div>`).join('')}</div>`;
function renderOverview() {
  const o = OVERVIEW;
  return `<div class="ov"><div class="ov-kicker">Alva · Thesis · Web IA · 2026-09-23</div><h1>${esc(o.title)}</h1><p class="ov-sub">${esc(o.subtitle)}</p>${o.intro.map((p) => `<p class="ov-p">${esc(p)}</p>`).join('')}
    ${ovCards(o.dirs)}
    <h2>线一 · 竞品补丁（顶部条上的开关）</h2><p class="ov-p">${esc(o.patchesIntro || '')}</p><table class="ov-map">${(o.patches || []).map((r, i) => `<tr>${r.map((c, j) => (i === 0 ? `<th>${esc(c)}</th>` : `<td class="${j === 0 ? 'k' : ''}">${esc(c)}</td>`)).join('')}</tr>`).join('')}</table>
    ${(o.questions || []).map((qq) => `<h2>${esc(qq.h)}</h2><ul class="ov-rules">${qq.body.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`).join('')}
    <h2>模块清单 · 对象 × 动作</h2><table class="ov-map">${(o.matrix || []).map((r, i) => `<tr>${r.map((c, j) => (i === 0 ? `<th>${esc(c)}</th>` : `<td class="${j === 0 ? 'k' : ''}">${esc(c)}</td>`)).join('')}</tr>`).join('')}</table>
    <h2>模块清单 · 按入口分组</h2><div class="ov-groups">${(o.groups || []).map((g) => `<div class="ov-group"><h3>${esc(g.h)}</h3><table>${g.items.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</table></div>`).join('')}</div>
    <h2>整体要一起定的几件事</h2><ul class="ov-rules">${(o.tensions || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    <h2>app 屏 → web 位置</h2><table class="ov-map">${o.mapping.map((r, i) => `<tr>${r.map((c, j) => (i === 0 ? `<th>${esc(c)}</th>` : `<td class="${j === 0 ? 'k' : ''}">${esc(c)}</td>`)).join('')}</tr>`).join('')}</table>
    <h2>所有方案共用的 web 规则</h2><ul class="ov-rules">${NOTES.common.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    <p class="ov-foot">demo 数据全部为 mock；人物与头像沿用 Figma 稿里的占位。行情为 Alva Arrays 日线快照（2026-03-02 → 2026-09-22 收盘，15 只 ticker）；thesis 的「发布时价」取该版本日期当天的收盘。</p></div>`;
}

/* ══════════ 浮层 ══════════ */
function renderLayer() {
  let h = '';
  if (state.modal?.type === 'history') { const t = byId(state.modal.id); if (t) h += historyModal(t); }
  if (state.modal?.type === 'archive') { const t = byId(state.modal.id); if (t) h += archiveModal(t); }
  if (state.composer.open && state.composer.mode === 'modal') h += `<div class="scrim" data-action="compose-cancel"><div class="modal w640" data-stop>${composerModalHTML()}</div></div>`;
  if (state.menu === 'new-thesis' && state.menuRect) {
    // 照 app 的入口 sheet（Bottom Sheer - New thesis 6227:162110）：两张选项卡并排，Create with Alva 在前
    const r = state.menuRect;
    h += `<div class="menu fixed opt-menu" style="left:${Math.round(r.left)}px;top:${Math.round(r.bottom + 6)}px">
      <div class="opt-card alva" data-action="build"><span class="opt-ic"><i class="ic" style="--u:url('icons/generate-l.svg');width:20px;height:20px"></i></span><span class="col"><span class="opt-title">Create with Alva</span><span class="opt-desc">You describe the view. Alva writes the first draft.</span></span></div>
      <div class="opt-card write" data-action="compose-new"><span class="opt-ic">${icon('edit-l1', 20)}</span><span class="col"><span class="opt-title">Write it yourself</span><span class="opt-desc">You write the first draft. Alva helps when asked.</span></span></div>
    </div>`;
  }
  if (state.search.open) h += searchDialog();
  if (state.notes) h += notesHTML();
  if (state.toast) h += `<div class="toast">${icon(state.toast.ic, 14)}<span>${esc(state.toast.text)}</span></div>`;
  return h;
}

/* ══════════ 交互 ══════════ */
function act(name, el) {
  const c = state.composer; const id = el.dataset.id; const val = el.dataset.val;
  if (el.closest && el.closest('.qpost')) ensureQuick();
  if (state.guest && ['ask', 'save', 'follow', 'open-chat', 'toggle-chat', 'compose-new', 'compose-ticker', 'compose-open', 'compose-home', 'update', 'watch', 'subscribe', 'build', 'write', 'choose', 'history'].includes(name)) { toast('Sign in to continue', 'locked-l'); return; } // M：客态下一切会员动作都变成 Sign in
  switch (name) {
    case 'dir': switchDir(el.dataset.dir); return;
    case 'toggle-chat': state.chat.open = !state.chat.open; if (state.chat.open) openChat(); break;
    case 'open-chat': openChat(); break;
    case 'toggle-notes': state.notes = !state.notes; break;
    case 'ask': { const t = byId(id); openChat({ type: 'thesis', id }); if (state.chat.mode === 'build') state.chat.mode = 'idle'; if (t && state.chat.msgs.length) state.chat.msgs.push({ type: 'alva', text: `Switched context to ${A(t.authorId).name}'s thesis. Ask away.` }); break; }
    case 'save': { const t = byId(id); if (t) { t.saved = !t.saved; t.saves += t.saved ? 1 : -1; } break; }
    case 'follow': { if (state.followed.has(id)) state.followed.delete(id); else state.followed.add(id); break; }
    case 'menu-fixed': { const same = state.menu === el.dataset.menu; state.menu = same ? null : el.dataset.menu; state.menuRect = same ? null : el.getBoundingClientRect(); break; }
    case 'menu': state.menu = state.menu === el.dataset.menu ? null : el.dataset.menu; if (state.menu === 'tickers') { state.pickerQ = ''; state.focus = 'picker'; } break;
    case 'menu-close': state.menu = null; break;
    case 'tab': state.tab = el.dataset.tab; break;
    case 'feedtab': state.feedTab = el.dataset.tab; break;
    case 'efilter': state.exploreFilter = val; break;
    case 'ptab': state.profileTab = el.dataset.tab; break;
    case 'pfilter': state.profileFilter = val; break;
    case 'ctab': state.companyTab = el.dataset.tab; break;
    case 'cfilter': state.companyFilter = val; break;
    case 'crange': state.companyRange = Number(val); break;
    case 'history': state.modal = { type: 'history', id }; break;
    case 'close-modal': state.modal = null; break;
    case 'fystate-reset': go(`${state.dir}/foryou`); return;
    case 'go-people': go(`${state.dir}/explore/people`); return;
    case 'explore-clear': state.exploreQ = ''; state.focus = 'explore-search'; break;
    case 'search-open': state.search.open = true; state.search.q = ''; state.menu = null; state.focus = 'search'; break;
    case 'search-close': state.search.open = false; break;
    case 'search-clear': state.search.q = ''; state.focus = 'search'; break;
    case 'recent-remove': state.search.recent = state.search.recent.filter((r) => r !== val); state.focus = 'search'; break;
    case 'recent-clear': state.search.recent = []; state.focus = 'search'; break;
    case 'import-x': state.xConnected = true; break;
    case 'choose': if (state.chosen.has(id)) state.chosen.delete(id); else state.chosen.add(id); break;
    case 'choose-continue': state.chosen.forEach((x) => state.followed.add(x)); state.chosen.clear(); toast(`Following ${state.followed.size} people`); go(`${state.dir}/foryou`); return;
    case 'toggle-quickpost': state.quickPost = !state.quickPost; if (c.mode === 'quick') closeComposer(); break;
    /* C · Alva 页 */
    case 'go-alva': state.menu = null; go(`${state.dir}/alva`); return;
    case 'agent-ch': state.agent.channel = val; state.agent.chatIdx = 0; state.agent.tab = 'chat'; Object.assign(state.chat, { msgs: [], typing: false, mode: 'idle', ctx: null }); state.focus = 'chat'; break;
    case 'agent-tab': state.agent.tab = el.dataset.tab; break;
    case 'agent-new': state.agent.chatIdx = 0; state.agent.tab = 'chat'; Object.assign(state.chat, { msgs: [], typing: false, mode: 'idle', ctx: null }); state.focus = 'chat'; break;
    case 'agent-chat': { const i = Number(val); state.agent.chatIdx = i; state.agent.tab = 'chat'; state.menu = null; const q = SIDEBAR.chats[i - 1]; Object.assign(state.chat, { msgs: [{ type: 'user', text: q }, { type: 'alva', text: cannedReply(q) }], typing: false, mode: 'idle', ctx: null }); break; }
    /* 线一补丁 / M 客态 */
    case 'toggle-rail': state.detailRail = !state.detailRail; break;
    case 'toggle-gsearch': state.globalSearch = !state.globalSearch; break;
    case 'toggle-activity': state.activity = !state.activity; if (!state.activity && state.screen === 'activity') { go(homePath(state.dir)); return; } break;
    case 'toggle-guest': { state.guest = !state.guest; state.menu = null; if (state.guest) { state.chat.open = false; if (!['thesis', 'profile', 'company'].includes(state.screen)) { go(`${state.dir}/thesis/gavin-ai-flow`); return; } } break; }
    case 'guest-signin': toast('Sign in to continue', 'locked-l'); return;
    case 'afilter': state.activityFilter = val; break;
    /* E / G 新增 */
    case 'write': openComposer(); return; // E：顶栏 Write → 全页编辑器
    case 'write-cancel': { const back = c.kind === 'update' && c.thesisId ? `${state.dir}/thesis/${c.thesisId}` : `${state.dir}/foryou`; closeComposer(); go(back); return; }
    case 'go-profile': state.menu = null; go(`${state.dir}/profile/yggyll`); return;
    case 'go-mine': state.menu = null; go(`${state.dir}/profile/yggyll?ptab=theses`); return;
    case 'tfilter': state.termFilter = val; break;
    /* composer */
    case 'compose-open': if (!(c.open && c.mode === 'inline')) openComposer(); return;
    case 'compose-new': openComposer(); return;
    case 'compose-home': { Object.assign(c, { open: true, mode: 'inline', kind: 'new', text: '', tickers: [], removed: [], media: [], visibility: 'public', thesisId: null, polish: null, alert: false, alertDismissed: false }); state.focus = 'composer'; if (state.screen === 'foryou') { render(); return; } go(`${state.dir}/foryou`); return; }
    case 'compose-ticker': openComposer({ tickers: [el.dataset.sym] }); return;
    case 'compose-cancel': closeComposer(); break;
    case 'compose-publish': { if (c.publishing || !c.text.trim()) return; if (c.mode !== 'inline') { c.publishing = true; render(); setTimeout(() => { c.publishing = false; publish(); }, 900); return; } publish(); return; }
    case 'set-vis': c.visibility = val; state.menu = null; break;
    case 'ticker-toggle': { const s = el.dataset.sym; if (c.tickers.includes(s)) { c.tickers = c.tickers.filter((x) => x !== s); if (!c.removed.includes(s)) c.removed.push(s); } else { c.tickers.push(s); c.removed = c.removed.filter((x) => x !== s); } c.alert = false; state.focus = 'picker'; break; }
    case 'ticker-remove': { const s = el.dataset.sym; c.tickers = c.tickers.filter((x) => x !== s); if (!c.removed.includes(s)) c.removed.push(s); break; }
    case 'media-add': { const pool = ['media-x-post.png', 'media-nvda-coins.png', 'media-segments.png', 'media-chart-msft.png']; c.media.push({ img: TD + pool[c.media.length % pool.length] }); break; }
    case 'media-remove': c.media.splice(Number(el.dataset.i), 1); break;
    case 'alert-dismiss': c.alert = false; c.alertDismissed = true; break;
    case 'polish': { state.menu = null; c.polish = { mode: val, phase: 'loading', result: '' }; render(); setTimeout(() => { if (c.polish) { c.polish.phase = 'done'; c.polish.result = polishResult(val, c.text || 'Your thesis text.'); render(); } }, 900); return; }
    case 'polish-replace': c.text = c.polish.result; c.polish = null; break;
    case 'polish-close': c.polish = null; break;
    case 'build': { const seed = c.open ? c.text : ''; if (c.open && c.mode === 'modal') closeComposer(); startBuild(seed); return; }
    /* chat */
    case 'chat-send': { const ta = $('.cin textarea'); const v = ta ? ta.value : ''; if (ta) ta.value = ''; chatSend(v); return; }
    case 'chat-chip': { const text = el.dataset.text; const ch = state.chat; if (text === 'Describe it in a sentence') { ch.mode = 'build'; ch.ctx = { type: 'draft' }; state.focus = 'chat'; break; } if (text === 'Pick a ticker') { ch.mode = 'build'; ch.ctx = { type: 'draft' }; chatSend('NVDA — every dip into the 50-day keeps getting bought and GTC is three weeks out.'); return; } if (text === 'Start from my feed') { ch.mode = 'build'; ch.ctx = { type: 'draft' }; chatSend('Start from what I have been reading: retail flow is concentrating in AI leaders, NVDA supplies the compute and HOOD is where the flow gets executed.'); return; } chatSend(text); return; }
    case 'chat-reset': Object.assign(state.chat, { msgs: [], typing: false, mode: 'idle', ctx: state.screen === 'thesis' ? { type: 'thesis', id: state.param } : null }); break;
    case 'ctx-clear': state.chat.ctx = null; if (state.chat.mode === 'build') state.chat.mode = 'idle'; break;
    case 'draft-open': { const d = draftFromIndex(el.dataset.i); if (d) { state.chat.mode = 'idle'; openComposer({ text: d.paragraphs.join('\n\n'), tickers: d.tickers.map(sym) }); } return; }
    case 'draft-publish': { const d = draftFromIndex(el.dataset.i); if (!d) return; Object.assign(c, { text: d.paragraphs.join('\n\n'), tickers: d.tickers.map(sym), media: [], visibility: 'public', kind: 'new', thesisId: null }); const before = THESES.length; publish(); if (THESES.length > before) { d.published = THESES[0].id; state.chat.mode = 'idle'; state.chat.ctx = { type: 'thesis', id: d.published }; state.chat.msgs.push({ type: 'alva', text: "Published. It's live in your For You feed and on your profile. I'll start reviewing signals now." }); } render(); return; }
    /* owner */
    case 'update': { const t = byId(id); if (t) openComposer({ kind: 'update', text: t.versions[0].paragraphs.join('\n\n'), tickers: t.versions[0].tickers.map(sym), thesisId: t.id }); return; }
    case 'archive': state.menu = null; state.modal = { type: 'archive', id }; break;
    case 'archive-confirm': { const t = byId(id); if (t) { t.status = t.status === 'archived' ? 'active' : 'archived'; toast(t.status === 'archived' ? 'Thesis archived · signal tracking paused' : 'Thesis unarchived'); } state.modal = null; return; }
    case 'privacy': { const t = byId(id); if (t) { t.visibility = t.visibility === 'private' ? 'public' : 'private'; toast(t.visibility === 'private' ? 'Thesis is now private' : 'Thesis is now public'); } state.menu = null; return; }
    case 'privacy-set': { const t = byId(id); if (t && t.visibility !== val) { t.visibility = val; toast(val === 'private' ? 'Thesis is now private' : 'Thesis is now public'); return; } break; }
    case 'copy-link': { try { navigator.clipboard?.writeText(location.href); } catch { /* 无剪贴板权限只给反馈 */ } state.menu = null; toast('Link copied'); return; }
    case 'fystate': return;
    /* 占位动作 */
    case 'noop-portfolio': toast('Portfolio 沿用现有页面，不在本 demo 范围', 'explain-l'); return;
    case 'noop-playbook': toast('Playbook 页沿用现有页面，不在本 demo 范围', 'explain-l'); return;
    case 'noop-channel': toast('Channel 沿用现有，不在本 demo 范围', 'explain-l'); return;
    case 'noop-newchat': toast('New Chat 沿用现有，不在本 demo 范围', 'explain-l'); return; // Sidebar 的 New Chat 在生产里是 /new_chat 页，不是右侧面板
    case 'subscribe': { if (state.subscribed.has(id)) state.subscribed.delete(id); else state.subscribed.add(id); break; }
    case 'noop-subscribe': toast('Subscribed', 'check-l1'); return;
    case 'watch': { const sy = el.dataset.sym; if (state.watchlist.has(sy)) state.watchlist.delete(sy); else state.watchlist.add(sy); const dlg = $('.dlg'); if (dlg) { const tmp = document.createElement('div'); tmp.innerHTML = searchDialog(); dlg.querySelector('.dlg-body').replaceWith(tmp.querySelector('.dlg-body')); hydrateCharts(); return; } break; }
    case 'noop-watch': toast('Added to watchlist', 'check-l1'); return;
    case 'noop-bold': toast('Bold：选中文字后加粗（demo 未实现富文本）', 'explain-l'); return;
    case 'noop-settings': toast('Agent settings 走 /settings?tab=alvaAgent', 'explain-l'); return;
    default: break;
  }
  render();
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (a && a.getAttribute('href') !== '#' && !a.hasAttribute('data-go')) return; // 真实外链放行
  if (a && a.getAttribute('href') === '#') e.preventDefault();
  const actEl = e.target.closest('[data-action]'); const goEl = e.target.closest('[data-go]');
  // 菜单外点击收起菜单
  if (state.menu && !e.target.closest('.menu') && !(actEl && (actEl.dataset.action === 'menu' || actEl.dataset.action === 'menu-fixed'))) { state.menu = null; state.menuRect = null; if (!actEl && !goEl) { render(); return; } }
  if (actEl && (!goEl || actEl.contains(goEl) === false && goEl.contains(actEl))) {
    if (actEl.classList.contains('scrim') && e.target.closest('[data-stop]')) return;
    act(actEl.dataset.action, actEl); return;
  }
  if (actEl && goEl && actEl.contains(goEl) && !goEl.contains(actEl)) { /* go 在 action 内部：以 go 为准 */ }
  if (goEl) { e.preventDefault(); const p = goEl.dataset.go; if (p === 'overview') go('overview'); else go(p); return; }
  if (actEl) { if (actEl.classList.contains('scrim') && e.target.closest('[data-stop]')) return; act(actEl.dataset.action, actEl); }
});
document.addEventListener('focusin', (e) => { if (e.target.matches?.('.qpost textarea')) ensureQuick(); });
document.addEventListener('input', (e) => {
  const k = e.target.dataset.input; if (!k) return;
  if (k === 'composer') onComposerInput(e.target);
  else if (k === 'explore-search') { state.exploreQ = e.target.value; state.focus = 'explore-search'; render(); }
  else if (k === 'search') { state.search.q = e.target.value; const dlg = $('.dlg'); if (dlg) { const tmp = document.createElement('div'); tmp.innerHTML = searchDialog(); const fresh = tmp.querySelector('.dlg-body'); dlg.querySelector('.dlg-body').replaceWith(fresh); hydrateCharts(); } }
  else if (k === 'picker') { state.pickerQ = e.target.value; const m = $('.picker'); if (m) { const tmp = document.createElement('div'); tmp.innerHTML = tickerPicker(); const fresh = tmp.firstElementChild; m.replaceWith(fresh); const inp = fresh.querySelector('input'); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } }
});
document.addEventListener('change', (e) => {
  if (e.target.dataset.change === 'fystate') { const v = e.target.value; go(`${state.dir}/foryou${v === 'default' ? '' : '?state=' + v}`); }
  if (e.target.dataset.change === 'sb') { state.sb = e.target.value; render(); }
  if (e.target.dataset.change === 'entry') { state.entry = e.target.value; state.menu = null; render(); }
  if (e.target.dataset.change === 'merge') { state.mergeMarkets = e.target.value === '1'; if (state.screen === 'explore') { const tabs = exploreTabsFor(state.dir); if (!tabs.includes(state.param)) { go(`${state.dir}/explore${tabs[0] ? '/' + tabs[0] : ''}`); return; } } if (state.screen === 'company' && !state.mergeMarkets) { render(); return; } render(); }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.menu) state.menu = null; else if (state.modal) state.modal = null; else if (state.search.open) state.search.open = false; else if (state.composer.open && state.composer.mode === 'modal') closeComposer(); else if (state.notes) state.notes = false; else return;
    render(); return;
  }
  if (e.key === 'Enter' && !e.shiftKey && e.target.matches('.cin textarea')) { e.preventDefault(); const v = e.target.value; e.target.value = ''; chatSend(v); }
  if (e.key === 'Enter' && e.target.matches('[data-input="search"]')) { const first = $('.dlg .srow'); if (first) { state.search.open = false; go(first.dataset.go); } }
});
// G 时间轴：悬停标记出作者 + 首句（tooltip 在图容器内定位）
document.addEventListener('mouseover', (e) => {
  const root = e.target.closest?.('.timeline'); if (!root) return;
  const tip = root.querySelector('.tl-tip'); const m = e.target.closest('.tl-mark'); if (!tip) return;
  if (!m) { tip.hidden = true; return; }
  const t = byId(m.dataset.thesis); if (!t) return; const v = t.versions[Number(m.dataset.v)] || t.versions[0]; const a = A(t.authorId);
  tip.innerHTML = `<div class="row8">${avatar(a, 20)}<span class="t12 med trunc">${esc(a.name)}</span><span class="t12 n5" style="margin-left:auto;white-space:nowrap">${esc(v.time)}</span></div><p class="t12">${esc(v.paragraphs[0])}</p>`;
  tip.hidden = false;
  const rr = root.getBoundingClientRect(), mr = m.getBoundingClientRect();
  const left = Math.max(8, Math.min(mr.left - rr.left + mr.width / 2 - 140, rr.width - 288)); tip.style.left = left + 'px'; tip.style.top = (mr.top - rr.top + 18) + 'px';
});
document.addEventListener('mouseleave', (e) => { const tip = e.target?.querySelector?.('.tl-tip'); if (tip) tip.hidden = true; }, true);
window.addEventListener('hashchange', onRoute);
window.addEventListener('resize', () => { $$('[data-bigchart], [data-timeline]').forEach((el) => { delete el.dataset.done; }); hydrateCharts(); hydrateTimeline(); hydrateMasonry(); });

/* ══════════ 启动 ══════════ */
loadSnapshot();
if (!location.hash) location.hash = '#/overview';
onRoute();
