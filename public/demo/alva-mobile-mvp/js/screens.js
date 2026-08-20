/* ========== screens.js — 页面渲染 ========== */
import { ENTITIES, SOURCES, FEEDS, ITEMS, TASKS, FILES, ONBOARD_ENTITIES, DISCOVER, entityChipLabel, itemSources } from './data.js?v=20260820-cache1';
import { store, save, I, nav } from './state.js?v=20260820-cache1';
import { streamCard, composerContextMenu, entityAv, entityReference, monoAv, srcAvatar, sparkSVG, feedId, entStrips } from './cards.js?v=20260820-cache1';
import { renderCompanyDetail, mountCompanyChart, destroyCompanyChart } from './company.js?v=20260820-cache1';

export const TAB_ROUTES = ['home', 'discover', 'ask', 'you'];

/* ---- shared chrome ---- */
const backBar = (title = '', extra = '') => `
  <div class="topbar">
    <button class="back-btn" data-act="back" aria-label="Back">${I.back}</button>
    ${title ? `<span class="title">${title}</span>` : ''}
    <span class="spacer"></span>${extra}
  </div>`;

const logoImg = `<img class="logo" src="img/logo-alva.svg" alt="Alva">`;
let readyLeaveTimer;
let readyRouteTimer;

function clearReadyTransition() {
  window.clearTimeout(readyLeaveTimer);
  window.clearTimeout(readyRouteTimer);
}

/* ========== route table ========== */
export function renderRoute(route, page) {
  clearReadyTransition();
  destroyCompanyChart();
  const [root, a] = route.split('/');
  const fn = {
    welcome: sWelcome,
    onboard: () => sOnboard(page, a),
    home: sHome,
    context: () => sContext(a, page),
    discover: sDiscover,
    ask: sAsk,
    you: sYou,
    entity: () => sEntity(a, page),
    feed: () => sFeed(a, page),
    automation: () => sFeed(a, page, 'settings'),
    source: () => sSource(a, page),
  }[root];
  if (fn) fn(page);
  else page.innerHTML = `${backBar()}<div class="empty"><h4>Not found</h4></div>`;
}

/* ========== welcome ========== */
function sWelcome(page) {
  page.classList.add('welcome');
  page.innerHTML = `
    <div class="welcome-art" aria-hidden="true">
      <span class="welcome-flow primary"></span>
      <span class="welcome-flow echo"></span>
    </div>
    <div class="welcome-body">
      <div class="welcome-copy">
        ${logoImg}
        <h1>Your AI Investing Agent.</h1>
      </div>
      <button class="btn btn-teal-solid" data-act="ob-start">Choose tickers to start</button>
      <button class="alt" data-act="ob-finish">Skip</button>
    </div>`;
}

/* ========== onboarding（单屏：只选 ticker，可 skip） ========== */
const OB_EXTRAS = new Set(); // 本次会话通过搜索加进网格的 ticker

function entChip(id, hint) {
  const e = ENTITIES[id];
  const on = store.entities.includes(id);
  return `<button class="ent-chip ${on ? 'on' : ''}" data-act="ob-ent" data-id="${id}">
    ${entityAv(id, 34)}
    <span><span class="nm">${e.ticker}</span><div class="ht">${hint}</div></span>
  </button>`;
}

function entGridHtml() {
  const curated = new Set(ONBOARD_ENTITIES.map((o) => o.id));
  for (const id of store.entities) if (!curated.has(id)) OB_EXTRAS.add(id);
  return [
    ...ONBOARD_ENTITIES.map((o) => entChip(o.id, o.hint)),
    ...[...OB_EXTRAS].filter((id) => !curated.has(id)).map((id) => entChip(id, ENTITIES[id].name)),
  ].join('');
}

window.__entSearch = (q) => {
  q = q.trim();
  const dd = document.getElementById('entDd');
  const clr = document.getElementById('entClr');
  if (clr) clr.hidden = !q;
  if (!dd) return;
  if (!q) { dd.hidden = true; dd.innerHTML = ''; return; }
  const ql = q.toLowerCase();
  const hits = Object.values(ENTITIES).filter((e) =>
    e.ticker.toLowerCase().includes(ql) || e.name.toLowerCase().includes(ql)).slice(0, 8);
  dd.innerHTML = hits.length
    ? hits.map((e) => {
        const on = store.entities.includes(e.id);
        return `<button class="ent-dd-row ${on ? 'on' : ''}" data-act="ob-ent-dd" data-id="${e.id}">
          ${entityAv(e.id, 30)}
          <span class="meta"><b>${e.ticker}</b><i>${e.name}</i></span>
          <span class="tick">${on ? I.check : I.plus}</span>
        </button>`;
      }).join('')
    : `<p class="ent-none">No matches — try a ticker like PLTR, or a name.</p>`;
  dd.hidden = false;
};

/* 下拉里选中/取消后：并入网格、刷新计数与下拉选中态（不关闭下拉，可连选） */
export function obPickEntity(id) {
  OB_EXTRAS.add(id);
  const grid = document.getElementById('entGrid');
  if (grid) grid.innerHTML = entGridHtml();
  const n = store.entities.length;
  const count = document.getElementById('entCount');
  if (count) count.textContent = n ? `${n} selected` : 'Pick 3–8 to start';
  const input = document.getElementById('entSearch');
  if (input) window.__entSearch(input.value);
}

function sOnboard(page, step) {
  page.classList.add('ob-page');
  /* 收尾动效页：选完标的后的仪式感（aura + 节点连线），Skip 路径不经过这里 */
  if (step === 'ready') {
    const selected = store.entities.slice(0, 3);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    page.classList.add('ready-auto');
    page.innerHTML = `
      <div class="ob-top"><span></span><span></span><span style="width:36px"></span></div>
      <div class="ready-copy" role="status" aria-live="polite"><h1 class="ob-h1">Your feed is ready</h1></div>
      <div class="ready-stage" aria-hidden="true">
        <div class="ready-aura"></div>
        <div class="ready-stack"><i></i><i></i><span>${I.spark}</span></div>
        ${selected.map((id, i) => `<span class="ready-node n${i + 1}">${entityAv(id, 38)}</span>`).join('')}
        <div class="ready-line l1"></div><div class="ready-line l2"></div><div class="ready-line l3"></div>
      </div>`;
    readyLeaveTimer = window.setTimeout(() => {
      if (!page.isConnected || location.hash !== '#/onboard/ready') return;
      page.classList.add('ready-leaving');
      readyRouteTimer = window.setTimeout(() => {
        if (!page.isConnected || location.hash !== '#/onboard/ready') return;
        store.onboarded = true;
        save();
        nav('#/home');
      }, reducedMotion ? 20 : 420);
    }, reducedMotion ? 520 : 1550);
    return;
  }
  page.innerHTML = `
    <div class="ob-top">
      <span></span><span></span>
      <button class="ob-skip" data-act="ob-finish">Skip</button>
    </div>
    <h1 class="ob-h1">What are you watching?</h1>
    <p class="ob-sub">Pick a few tickers. Following builds around them — impactful events and move attribution, from X and the newswire. You can change everything later.</p>
    <div class="ent-search">${I.search}
      <input id="entSearch" placeholder="Search tickers…" oninput="window.__entSearch(this.value)"
        onkeydown="if(event.key==='Escape'){this.value='';window.__entSearch('')}">
      <button class="clr" id="entClr" data-act="ob-search-clear" hidden aria-label="Clear search">${I.x}</button>
      <div class="ent-dd" id="entDd" hidden></div>
    </div>
    <div class="ent-grid" id="entGrid">${entGridHtml()}</div>
    <div class="ent-count-row">
      <span class="ent-count" id="entCount">${store.entities.length ? `${store.entities.length} selected` : 'Pick 3–8 to start'}</span>
      <button class="txt-act teal" data-act="ob-select-all">${ONBOARD_ENTITIES.every((o) => store.entities.includes(o.id)) ? 'Clear all' : 'Select all'}</button>
    </div>
    <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="ob-continue" id="entNext">Continue</button></div>`;
}

/* ========== home / for you ==========
 * 混排规则：alpha 全量可见；following 只出你关注的标的；按时间排序。
 * fresh 条目由下拉刷新解锁（会话内状态，不持久化）。
 */
let freshUnlocked = false;
export function itemsForYou() {
  return ITEMS
    .filter((it) => !it.fresh || freshUnlocked)
    .filter((it) => !store.paused.includes(it.feed))
    .filter((it) => it.feed === 'alpha' || it.entity_refs.some((id) => store.entities.includes(id)))
    .sort((a, b) => a.t - b.t);
}

/* 未关注任何标的：Following 流的空态引导（Alpha 照常出） */
function followNudge() {
  if (store.entities.length) return '';
  return `<div class="card rec-card reveal">
    <div class="rec-tag"><span>${I.eye}Following is waiting</span></div>
    <div class="rec-head"><span class="meta"><span class="nm">Follow a few tickers</span>
      <div class="ds">Events and move attribution for what you actually watch</div></span></div>
    <p class="rec-promise">Alpha runs with zero setup. Following needs to know your tickers — pick a few and its cards join this feed.</p>
    <div class="card-actions" style="margin-top:12px">
      <button class="btn btn-teal-solid" style="flex:1" data-act="nav" data-to="#/discover">${I.plus}Pick tickers</button>
    </div>
  </div>`;
}

function sHome(page) {
  const items = itemsForYou();
  const arr = items.map((it, i) => streamCard(it, i + 1));
  const compact = store.feedCompact === true;
  if (!store.entities.length) arr.splice(Math.min(arr.length, 1), 0, followNudge());
  const cards = arr.length ? arr.join('')
    : `<div class="empty"><div class="glyph">${I.spark}</div><h4>Your feed is quiet</h4><p>Follow a ticker in Discover to bring context into For You.</p><button class="btn btn-teal-solid" data-act="nav" data-to="#/discover">Open Discover</button></div>`;
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">For You</span><span class="spacer"></span>
      <button class="feed-view-toggle ${compact ? 'on' : ''}" data-act="toggle-feed-compact" aria-label="${compact ? 'Use standard feed view' : 'Use compact feed view'}" aria-pressed="${compact}">
        <span class="feed-view-glyph" aria-hidden="true"><i></i><i></i><i></i></span>
      </button>
    </div>
    <div class="ptr" id="ptr"><span class="ptr-ic">${I.spark}</span></div>
    <div class="feed-scroll ${compact ? 'compact-feed' : ''}">${cards}</div>`;
  attachPtr(page);
}

/* 下拉刷新：指针拖拽（触屏与桌面鼠标同一逻辑）。
 * 拉动 → spark 随距离旋转浮现；过阈值松手 → 环形 sweep + 呼吸 ~0.9s →
 * 解锁 fresh 条目并重绘，新卡带 reveal 进场。 */
function attachPtr(page) {
  const ptr = page.querySelector('#ptr');
  const ic = ptr.querySelector('.ptr-ic');
  const ARM = 52; // 触发阈值（阻尼后位移）
  let sy = 0, t = 0, pulling = false, busy = false;

  const reset = () => {
    ptr.style.transition = 'height 0.28s ease';
    ptr.style.height = '0px';
    ic.style.opacity = '0';
    ptr.classList.remove('armed');
  };
  page.addEventListener('pointerdown', (e) => {
    if (busy || page.scrollTop > 0) return;
    sy = e.clientY; t = 0; pulling = true;
  });
  page.addEventListener('pointermove', (e) => {
    if (!pulling || busy) return;
    const d = e.clientY - sy;
    if (d < 8) return;
    t = Math.min((d - 8) * 0.45, 96);
    ptr.style.transition = 'none';
    ptr.style.height = `${t}px`;
    ic.style.opacity = String(Math.min(1, t / 40));
    ic.style.transform = `rotate(${t * 3.4}deg) scale(${Math.min(1, 0.6 + t / 90)})`;
    ptr.classList.toggle('armed', t >= ARM);
  });
  const end = () => {
    if (!pulling) return;
    pulling = false;
    if (t >= ARM && !busy) {
      busy = true;
      ptr.classList.add('spin');
      ic.style.transform = '';
      ptr.style.transition = 'height 0.22s ease';
      ptr.style.height = '54px';
      setTimeout(() => {
        freshUnlocked = true;
        if (window.__rerender) window.__rerender();
      }, 950);
    } else reset();
  };
  page.addEventListener('pointerup', end);
  page.addEventListener('pointercancel', end);
}

/* ========== context detail ==========
 * 尾部统一一个 Sources 区（无 Evidence 概念）：每行 = 来源 + 它贡献了什么。
 */
function sourcesSec(item) {
  const rows = item.kind === 'alpha'
    ? [{ id: item.source, note: `${item.ep} · ${item.at}` }]
    : item.kind === 'anomaly'
      ? item.attribution.map((a) => ({ id: a.source, note: a.text }))
      : item.facts.map((f) => ({ id: f.sources[0], note: f.text }));
  return `<div class="d-sec"><div class="sec-label">Sources</div>
    ${rows.map((r) => `<div class="orig-link" data-act="open-source" data-id="${r.id}" role="button">${I.link}<span><b>${SOURCES[r.id].name}</b> — ${r.note}</span></div>`).join('')}
  </div>`;
}

function alphaDetail(item) {
  return `
    <div class="d-sec">
      <div class="clip" data-act="play-clip" data-item="${item.id}">
        <span class="play">${I.play}</span>
        <div><q>${item.quote}</q><div class="t">${item.speaker} · ${SOURCES[item.source].name} · ${item.at}</div></div>
      </div>
    </div>
    <div class="d-sec"><div class="sec-label">Why it’s alpha</div><p>${item.insight}</p></div>
    ${sourcesSec(item)}`;
}

function eventDetail(item) {
  return `
    <div class="d-sec"><div class="sec-label">What happened</div><p>${item.summary}</p></div>
    <div class="d-sec"><div class="sec-label">Why it matters</div><p>${item.why}</p></div>
    ${sourcesSec(item)}`;
}

function anomalyDetail(item) {
  return `
    <div class="d-sec">
      <div class="rec-ta">${sparkSVG(item.move.spark, item.move.dir, 300, 72, true)}</div>
      <div class="move-lbl">${item.move.value} · ${item.move.label}</div>
    </div>
    <div class="d-sec"><div class="sec-label">Why it’s moving</div>
      ${item.attribution.map((a) => `<p style="margin-bottom:10px">${a.text}</p>`).join('')}
    </div>
    ${sourcesSec(item)}`;
}

function sContext(id, page) {
  const item = ITEMS.find((it) => it.id === id);
  if (!item) { page.innerHTML = backBar() + '<div class="empty"><h4>Context not found</h4></div>'; return; }
  const hasHero = item.media && item.media.hero;
  page.innerHTML = `
    ${hasHero ? `<div class="detail-hero"><img src="${item.media.hero}" alt="${item.media.alt}"><div class="scrim"></div>${backBar('', `<button class="behind-pill" data-act="evi-sheet" data-item="${item.id}">${I.flip}Behind this</button>`)}</div>` : backBar('', `<button class="behind-pill" data-act="evi-sheet" data-item="${item.id}">${I.flip}Behind this</button>`)}
    <div class="detail-body ${hasHero ? '' : 'no-hero'}">
      <div class="card-head" style="margin-top:${hasHero ? 0 : 8}px">
        ${feedId(item)}
        <span class="time">${item.published}</span>
      </div>
      <h1 class="detail-headline">${item.headline}</h1>
      ${entStrips(item)}
      ${{ alpha: alphaDetail, event: eventDetail, anomaly: anomalyDetail }[item.kind](item)}
      <div class="detail-cta">
        <button class="btn btn-ask" data-act="ask-item" data-item="${item.id}">${I.ask}Ask Alva</button>
      </div>
    </div>`;
}

/* ========== discover（MVP：只有 Market） ========== */
const marketRow = (m) => { const e = ENTITIES[m]; const on = store.entities.includes(m); return `<div class="list-row">
  <span data-act="open-entity" data-id="${m}" role="button" style="display:contents">${entityAv(m, 40)}</span>
  <span class="meta" data-act="open-entity" data-id="${m}" role="button"><span class="nm">${e.ticker}</span><div class="ds">${e.name}</div></span>
  <span class="price"><div class="v">${e.price}</div><div class="c" style="color:var(--${e.dir})">${e.delta}</div></span>
  <button class="follow-sm ${on ? 'on' : ''}" data-act="follow-entity-sm" data-id="${m}">${on ? 'Following' : 'Follow'}</button>
</div>`; };

let mktTab = 'trending';
export function setMktTab(t) { mktTab = t; }

export function mktListHtml(t) {
  const ids = t === 'trending' ? DISCOVER.movers : store.entities.filter((id) => ENTITIES[id]);
  if (ids.length) return ids.map(marketRow).join('');
  return '<p class="ent-none" style="padding:10px 0">Nothing yet — follow a ticker and it shows up here.</p>';
}

function discResultsHtml(q) {
  const ql = q.toLowerCase();
  const hits = Object.values(ENTITIES).filter((e) => e.ticker.toLowerCase().includes(ql) || e.name.toLowerCase().includes(ql)).map((e) => e.id);
  return hits.length ? `<div class="d-sec">${hits.map(marketRow).join('')}</div>`
    : `<div class="empty"><h4>No matches</h4><p>Try a ticker like PLTR, or a company name.</p></div>`;
}

window.__discSearch = (q) => {
  q = q.trim();
  const body = document.getElementById('discBody');
  const clr = document.getElementById('discClr');
  if (clr) clr.hidden = !q;
  if (body) body.innerHTML = q ? discResultsHtml(q) : discBodyHtml();
};

function discBodyHtml() {
  return `
    <div class="mkt-head"><span class="sec-label" style="margin:0">Tickers</span>
      <div class="mini-tabs" id="mktTabs">${[['trending', 'Trending'], ['following', 'Following']].map(([t, lbl]) =>
        `<button class="${mktTab === t ? 'on' : ''}" data-act="mkt-tab" data-t="${t}">${lbl}</button>`).join('')}</div>
    </div>
    <div id="mktList">${mktListHtml(mktTab)}</div>`;
}

function sDiscover(page) {
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">Discover</span><span class="spacer"></span></div>
    <div class="ent-search disc-search">${I.search}
      <input id="discSearch" placeholder="Search tickers…" oninput="window.__discSearch(this.value)"
        onkeydown="if(event.key==='Escape'){this.value='';window.__discSearch('')}">
      <button class="clr" id="discClr" data-act="disc-search-clear" hidden aria-label="Clear search">${I.x}</button>
    </div>
    <div class="disc-body" id="discBody" style="margin-top:6px">${discBodyHtml()}</div>`;
}

/* ========== entity page ========== */
function sEntity(id, page) {
  const e = ENTITIES[id];
  if (!e) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  page.innerHTML = `${backBar()}${renderCompanyDetail(id)}`;
  queueMicrotask(() => {
    page.querySelector('.company-tabs .on')?.scrollIntoView({ block: 'nearest', inline: 'center' });
    mountCompanyChart(page, id);
  });
}

/* ========== feed detail（= Automation：默认 Output，横切 Settings） ========== */
let feedTab = 'output';
export function setFeedTab(t) { feedTab = t; }

function feedOutputHtml(f, items) {
  return `
    <div class="d-sec"><p style="font-size:15px;color:var(--t2)">${f.promise}</p></div>
    ${items.length ? `<div class="d-sec"><div class="sec-label">Recent output</div>${items.map((it, i) => streamCard(it, i)).join('')}</div>`
      : `<div class="empty"><div class="glyph">${I.spark}</div><h4>No output for your follows yet</h4><p>Follow a few tickers in Discover — this automation builds around them.</p><button class="btn btn-teal-solid" data-act="nav" data-to="#/discover">Open Discover</button></div>`}`;
}

function feedSettingsHtml(f) {
  const paused = store.paused.includes(f.id);
  const alerts = store.automationAlerts[f.id] !== false;
  const email = store.automationEmail[f.id] === true;
  const visibleSources = f.sources.slice(0, 3);
  const hiddenSourceCount = f.sources.length - visibleSources.length;
  const instruction = (store.automationInstructions[f.id] ?? f.instructions)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const nextRun = paused ? 'Paused' : f.next_run;
  return `
    <div class="auto-settings">
      <section class="auto-field">
        <div class="auto-field-head"><span>Sources</span><p>The people and sources Alva monitors for ${f.name}.</p></div>
        <button class="auto-entry auto-source-summary" data-act="automation-sources-sheet" data-id="${f.id}" aria-label="View ${f.sources.length} sources">
          <span class="src-stack">${visibleSources.map((sid) => srcAvatar(SOURCES[sid], 22)).join('')}</span>
          ${hiddenSourceCount > 0 ? `<span class="prov-more">+${hiddenSourceCount}</span>` : ''}
          <span class="auto-source-summary-spacer"></span>${I.chevR}
        </button>
      </section>

      ${f.id === 'following' ? `<section class="auto-field">
        <div class="auto-field-head"><span>Entities</span><p>The tickers Alva reads across your selected sources.</p></div>
        <button class="auto-entry" data-act="following-sheet">
          <span class="auto-entry-main"><b>${store.entities.length} ticker${store.entities.length === 1 ? '' : 's'}</b><i>${store.entities.slice(0, 4).map(entityChipLabel).join(' · ') || 'Choose tickers in Discover'}</i></span>${I.chevR}
        </button>
      </section>` : ''}

      <section class="auto-field">
        <div class="auto-field-head"><span>Schedule</span><p>When this automation runs.</p></div>
        <div class="auto-entry static">
          <span class="auto-entry-main"><b>${f.cadence}</b><i>Next run · ${nextRun}</i></span>
          <span class="auto-entry-meta">Local time</span>
        </div>
      </section>

      <section class="auto-field">
        <div class="auto-field-head with-control">
          <span><b>Receive alerts</b><p>Choose where Alva sends alerts from this automation.</p></span>
          <button class="switch ${alerts ? 'on' : ''}" data-act="auto-alerts" data-id="${f.id}" role="switch" aria-checked="${alerts}" aria-label="Receive alerts"><i class="switch-thumb"></i></button>
        </div>
        ${alerts ? `<div class="auto-delivery-list">
          <div class="auto-delivery-row"><span class="auto-delivery-icon">${I.spark}</span><span><b>For You</b><i>Context cards in your feed</i></span><em>On</em></div>
          <div class="auto-delivery-row"><span class="auto-delivery-icon">${I.bell}</span><span><b>Email alerts</b><i>High-impact events only</i></span><button class="switch ${email ? 'on' : ''}" data-act="auto-email" data-id="${f.id}" role="switch" aria-checked="${email}" aria-label="Email alerts"><i class="switch-thumb"></i></button></div>
        </div>` : ''}
      </section>

      <section class="auto-field">
        <div class="auto-field-head"><span>Language</span><p>Used for future alerts and previews.</p></div>
        <button class="auto-entry" data-act="toast-msg" data-msg="Language selection is mocked in this demo">
          <span class="auto-entry-main"><b>English</b></span>${I.chevR}
        </button>
      </section>

      <section class="auto-field">
        <div class="auto-field-head"><span>Agent instructions</span><p>What Alva does each time this automation runs.</p></div>
        <textarea class="auto-instructions" rows="5" aria-label="Agent instructions" oninput="window.__saveAutoInstructions('${f.id}', this.value)">${instruction}</textarea>
        <div class="auto-instruction-foot"><span>Changes save on this device</span><button data-act="auto-reset-instructions" data-id="${f.id}">Reset</button></div>
      </section>
    </div>`;
}

window.__saveAutoInstructions = (id, value) => {
  store.automationInstructions[id] = value;
  save();
};

function feedRunsHtml(f) {
  const justRan = Boolean(store.manualRuns[f.id]);
  const rows = [
    { when: justRan ? 'Just now' : f.last_run, status: 'Completed', duration: f.id === 'alpha' ? '38s' : '24s', output: f.id === 'alpha' ? '7 cards' : '4 cards' },
    { when: f.id === 'alpha' ? '42m ago' : '18m ago', status: 'Completed', duration: f.id === 'alpha' ? '41s' : '22s', output: f.id === 'alpha' ? '5 cards' : '2 cards' },
    { when: f.id === 'alpha' ? '1h ago' : '36m ago', status: 'Completed', duration: f.id === 'alpha' ? '36s' : '26s', output: f.id === 'alpha' ? '6 cards' : '3 cards' },
  ];
  return `<div class="auto-runs">
    <div class="auto-runs-summary"><span><b>${f.runs.toLocaleString()}</b><i>Total runs</i></span><span><b>${f.id === 'alpha' ? '99.8%' : '99.9%'}</b><i>Success rate</i></span></div>
    <div class="auto-runs-list">${rows.map((run) => `<div class="auto-run-row">
      <span class="run-state">${I.check}</span>
      <span class="run-main"><b>${run.when}</b><i>${run.status} · ${run.duration}</i></span>
      <span class="run-output">${run.output}</span>${I.chevR}
    </div>`).join('')}</div>
  </div>`;
}

/* tab 对应的内容体（sFeed 首绘与 feed-tab 原地切换共用） */
export function feedBodyHtml(id) {
  const f = FEEDS[id];
  const items = ITEMS.filter((it) => it.feed === id)
    .filter((it) => it.feed === 'alpha' || it.entity_refs.some((eid) => store.entities.includes(eid)))
    .sort((a, b) => a.t - b.t);
  if (feedTab === 'settings') return feedSettingsHtml(f);
  if (feedTab === 'runs') return feedRunsHtml(f);
  return feedOutputHtml(f, items);
}

function sFeed(id, page, initTab) {
  const f = FEEDS[id];
  if (!f) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  if (initTab) feedTab = initTab;
  const paused = store.paused.includes(id);
  const lastRun = store.manualRuns[id] ? 'Just now' : f.last_run;
  page.innerHTML = `${backBar('', `<div class="auto-head-actions">
      <button class="auto-icon-action" data-act="auto-pause" data-id="${id}" aria-label="${paused ? 'Resume' : 'Pause'} ${f.name}">${paused ? I.play : I.pause}</button>
      <button class="auto-run-now" data-act="auto-run-now" data-id="${id}">${I.play}<span>Run now</span></button>
    </div>`)}
    <div class="automation-hero">
      <div class="automation-title"><span class="st-dot ${paused ? 'off' : ''}"></span><h1>${f.name}</h1></div>
      <div class="automation-meta"><span>${f.owner}</span><i></i><span>${paused ? 'Paused' : 'Active'}</span><i></i><span>Last run ${lastRun}</span><i></i><span>${f.runs.toLocaleString()} runs</span></div>
      <p>${f.promise}</p>
    </div>
    <div class="ask-tabs feed-tabs">${[['output', 'Output'], ['settings', 'Settings'], ['runs', 'Runs']].map(([t, lbl]) =>
      `<button class="${feedTab === t ? 'on' : ''}" data-act="feed-tab" data-t="${t}" data-id="${id}">${lbl}</button>`).join('')}</div>
    <div class="page-secs" id="feedBody">${feedBodyHtml(id)}</div>`;
}

/* ========== source detail ========== */
function sSource(id, page) {
  const s = SOURCES[id];
  if (!s) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  const cited = ITEMS.filter((it) => itemSources(it).includes(id));
  const feed = Object.values(FEEDS).find((f) => f.sources.includes(id));
  page.innerHTML = `${backBar()}
    <div class="hero-head">
      <div class="row1">
        ${srcAvatar(s, 56)}
        <div><h1 style="font-size:22px">${s.name}</h1><div class="sub">${s.platform} · ${s.modality}${s.hosts ? ' · ' + s.hosts : ''}</div></div>
      </div>
      <div class="src-stats"><span>cited in <b>${cited.length}</b> context${cited.length === 1 ? '' : 's'}</span>${feed ? `<i class="dot"></i><span>read by <b>${feed.name}</b></span>` : ''}</div>
      <div class="actions">
        <button class="btn btn-ghost" style="flex:1" data-act="toast-msg" data-msg="Opens the original on ${s.platform}">${I.link}Open original</button>
      </div>
    </div>
    <div class="page-secs">
      ${s.recent?.length ? `<div class="d-sec"><div class="sec-label">Recent from this source</div>
        ${s.recent.map((r) => `<div class="recent-row">
          <div class="rc-top"><span class="rc-kind">${r.kind}</span><span class="rc-t">${r.t}</span></div>
          <div class="rc-text">${r.text}</div>
        </div>`).join('')}
      </div>` : ''}
      ${cited.length ? `<div class="d-sec"><div class="sec-label">Recently cited in</div>
        ${cited.slice(0, 3).map((it) => `<div class="orig-link" data-act="open-detail" data-item="${it.id}" role="button">${I.doc}<span>${it.headline}</span></div>`).join('')}
      </div>` : ''}
      <div class="src-disclaimer">${I.eye}<span><b>About this source</b> — Alva indexes only publicly available content. Every citation is attributed and links back to the original; nothing is republished in full.</span></div>
    </div>`;
}

/* ========== ask（Chat / Tasks / Memory） ========== */
export let askCtx = null;
function normalizeAskContext(value) {
  if (!value) return { itemId: null, entityIds: [] };
  if (typeof value === 'string') {
    const item = ITEMS.find((it) => it.id === value);
    return { itemId: value, entityIds: item?.entity_refs ? [...item.entity_refs] : [] };
  }
  return {
    itemId: value.itemId || null,
    entityIds: [...new Set((value.entityIds || []).filter((id) => ENTITIES[id]))],
  };
}
export function setAskCtx(value) { askCtx = value ? normalizeAskContext(value) : null; }
export function getAskContext() { return normalizeAskContext(askCtx); }
let pendingAsk = null;
export function setPendingAsk(q) { pendingAsk = q; }
let askTab = 'chat';
export function setAskTab(t) { askTab = t; }

/* Automation 列表：MVP 固定两条（Chat 的 Tasks tab 与 You 页共用） */
export function automationRows() {
  return Object.values(FEEDS).map((f) => {
    const paused = store.paused.includes(f.id);
    return `
    <div class="list-row" data-act="nav" data-to="#/automation/${f.id}" role="button">
      ${monoAv('AL', 174, 40)}
      <span class="meta"><span class="nm">${f.name}</span><div class="ds">${f.sources.length} sources · ${f.cadence}</div></span>
      <span class="next-run ${paused ? 'paused' : ''}">${paused ? 'Paused' : f.next_run}</span>${I.chevR}</div>`;
  }).join('');
}

function askTasksView() {
  const taskRows = TASKS.map((t) => `
    <div class="list-row" data-act="toast-msg" data-msg="Sub-task sessions are mocked in this demo" role="button">
      <span class="ic-cir ${t.status === 'done' ? 'dim' : ''}">${t.status === 'done' ? I.check : I.spark}</span>
      <span class="meta"><span class="nm">${t.title}</span><div class="ds">${t.from}</div></span>
      <span class="task-tag ${t.status}">${t.status === 'done' ? 'Done' : 'Running'}</span>${I.chevR}</div>`).join('');
  return `
    <p class="mem-cap">One-off tasks spun off from chat — each runs in its own session.</p>
    <div class="d-sec" style="margin-top:14px">${taskRows}</div>`;
}

/* Automations tab（对齐桌面端 Alerts 的位置：输出不走推送，落进 For You 的流） */
function askAutomationsView() {
  return `
    <p class="mem-cap">Recurring automations behind your For You — their output lands in the feed as context cards, not push alerts.</p>
    <div class="d-sec" style="margin-top:14px">${automationRows()}</div>`;
}

function askFilesView() {
  return `
    <p class="mem-cap">Files Alva produced or received in chat — reports, notes and exports.</p>
    <div class="d-sec" style="margin-top:14px">${FILES.map((f) => `
      <div class="list-row" data-act="toast-msg" data-msg="File previews are mocked in this demo" role="button">
        <span class="ic-cir ${f.kind === 'Chart' ? '' : 'dim'}">${f.kind === 'Chart' ? I.spark : I.doc}</span>
        <span class="meta"><span class="nm">${f.name}</span><div class="ds">${f.kind} · ${f.size} · ${f.from}</div></span>
        <span class="next-run">${f.t}</span>${I.chevR}
      </div>`).join('')}
    </div>`;
}

function askMemoryView() {
  return `
    <p class="mem-cap">What Alva remembers about you — synced to user.md in your agent memory.</p>
    <div class="d-sec"><div class="sec-label">Identity</div>
      <div class="mem-row"><span class="k">Role</span><span class="v">Independent trader</span></div>
      <div class="mem-row"><span class="k">Markets</span><span class="v">US equities · Crypto</span></div>
    </div>
    <div class="d-sec"><div class="sec-label">Following</div>
      <div class="mem-row"><span class="v">${store.entities.length ? store.entities.map(entityChipLabel).join(' · ') : 'Nothing yet — pick tickers in Discover'}</span></div>
    </div>
    <div class="d-sec"><div class="sec-label">Recent interests</div>
      <div class="mem-row"><span class="v" style="color:var(--t3)">Opened HBM context 3× this week · asked about MU’s move</span></div>
    </div>
    <div class="d-sec"><div class="sec-label">Thesis</div>
      <div class="mem-row"><span class="v">“AI capex is a multi-year supercycle; memory is the tightest link in the chain.”</span><span class="t">Aug 15</span></div>
      <div class="mem-row"><span class="v">“BTC treasury demand is structural, not cyclical.”</span><span class="t">Jul 30</span></div>
    </div>`;
}

/* Chat 开场：把 For You 里最新的两三条说成一句话（与 feed 同一份数据） */
function chatOpening() {
  const top = itemsForYou().slice(0, 3);
  if (!top.length) return 'Morning. Your feeds are warming up — follow a few tickers in Discover and I’ll have more to report. Anything you want me to dig into?';
  return `Morning. ${top.length} things stand out from your feeds:<br><br>${top.map((it, i) =>
    `${i + 1} · <b>${it.kind === 'alpha' ? SOURCES[it.source].name : entityChipLabel(it.entity_refs[0])}</b> — ${it.headline}.`).join('<br>')}<br><br>Anything you want me to dig into?`;
}

function composerQuoteHtml(item) {
  if (!item) return '';
  return `<div class="composer-quote" data-composer-quote="${item.id}">
    <i aria-hidden="true"></i><span>${item.headline}</span>
    <button data-act="remove-composer-quote" aria-label="Remove quoted card">${I.x}</button>
  </div>`;
}

function askComposerHtml(context, item) {
  const entityIds = context.entityIds;
  const firstEntity = entityIds[0] ? ENTITIES[entityIds[0]] : null;
  const placeholder = firstEntity ? `Ask about ${firstEntity.name}…` : 'Ask Alva anything…';
  return `<div class="alva-composer ask-composer">
    <div class="composer-attachments" ${!item && !entityIds.length ? 'hidden' : ''}>
      ${composerQuoteHtml(item)}
      <div class="composer-ref-row">${entityIds.map((id) => entityReference(id)).join('')}</div>
    </div>
    <div class="composer-input-row">
      <div class="composer-add-wrap">
        <button class="composer-tool" data-act="composer-toggle-add" aria-label="Add context" aria-expanded="false">${I.plus}</button>
        ${composerContextMenu()}
      </div>
      <textarea id="askInput" rows="1" placeholder="${placeholder}" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.closest('.alva-composer').querySelector('[data-act=ask-send]').click()}"></textarea>
      <span class="composer-model">GPT-5.5</span>
      <button class="composer-send" data-act="ask-send" aria-label="Send message">${I.send}</button>
    </div>
  </div>`;
}

function sAsk(page) {
  const context = getAskContext();
  const item = context.itemId ? ITEMS.find((it) => it.id === context.itemId) : null;
  if (pendingAsk) askTab = 'chat';
  const counts = { tasks: TASKS.length, automations: Object.keys(FEEDS).length, files: FILES.length };
  const tabs = `<div class="ask-tabs">${[['chat', 'Chat'], ['tasks', 'Tasks'], ['automations', 'Automations'], ['memory', 'Memory'], ['files', 'Files']].map(([t, lbl]) =>
    `<button class="${askTab === t ? 'on' : ''}" data-act="ask-tab" data-t="${t}">${lbl}${counts[t] ? `<i class="n">${counts[t]}</i>` : ''}</button>`).join('')}</div>`;
  if (askTab !== 'chat') {
    const body = { tasks: askTasksView, automations: askAutomationsView, memory: askMemoryView, files: askFilesView }[askTab];
    page.innerHTML = `
      <div class="topbar"><span class="lg-title">Chat</span><span class="spacer"></span></div>
      ${tabs}
      <div class="ask-body" style="padding-top:6px">${body()}</div>`;
    return;
  }
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">Chat</span><span class="spacer"></span></div>
    ${tabs}
    <div class="ask-body">
      <div class="ask-reply ask-thread" id="askReply">
        <div class="chat-day">Today</div>
        <div class="bub">${chatOpening()}</div>
      </div>
      ${askComposerHtml(context, item)}
    </div>`;
  /* CTA 交接：带着 item 生成的 prompt 自动发问 */
  if (pendingAsk) {
    const q = pendingAsk;
    pendingAsk = null;
    const ghost = document.createElement('button');
    ghost.dataset.act = 'ask-send';
    ghost.dataset.q = q;
    ghost.style.display = 'none';
    page.appendChild(ghost);
    setTimeout(() => ghost.click(), 450);
  }
}

/* ========== you（对齐网页端用户菜单：账号头 + Usage + 管理 + 账号行 + 社区） ========== */
function sYou(page) {
  const row = (act, ic, nm, ds, extra = '') => `
    <div class="mgmt-row" data-act="${act.split('|')[0]}" ${act.includes('|') ? `data-msg="${act.split('|')[1]}"` : ''} role="button">
      <span class="ic">${ic}</span><span class="meta"><span class="nm">${nm}</span>${ds ? `<div class="ds">${ds}</div>` : ''}</span>${extra}${I.chevR}</div>`;
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">You</span><span class="spacer"></span></div>
    <div class="you-head">
      <img class="av-img" src="img/av-leo.svg" width="56" height="56" alt="Leo">
      <div>
        <div class="you-name"><h1>Leo</h1><i class="bdg pro">Pro</i><i class="bdg">Annual</i></div>
        <div class="sub">leo@alva.xyz</div>
      </div>
    </div>
    <div class="you-secs">
      <div class="d-sec"><div class="sec-label">Usage</div>
        <div class="usage-card" data-act="toast-msg" data-msg="Usage details are mocked in this demo" role="button">
          <div class="uc-main"><span class="k">Available</span><b>412</b></div>
          <div class="uc-side">
            <div><span>Daily</span><b>25</b></div>
            <div><span>Monthly</span><b>380</b></div>
            <div><span>Pack</span><b>7</b></div>
          </div>
        </div>
      </div>
      <div class="d-sec">
        ${row('toast-msg|Language settings are mocked in this demo', I.doc, 'Language', '', '<span class="rw-val">English</span>')}
        ${row('settings-sheet', I.gear, 'Settings', '')}
        ${row('toast-msg|Support chat is mocked in this demo', I.ask, 'Contact us', '')}
      </div>
      <div class="social-row">
        <button data-act="toast-msg" data-msg="Opens the Alva Discord">Discord</button>
        <button data-act="toast-msg" data-msg="Opens the Alva Telegram">Telegram</button>
        <button data-act="toast-msg" data-msg="Opens Alva on X">𝕏</button>
      </div>
    </div>`;
}
