/* ========== screens.js — 页面渲染 ========== */
import { ENTITIES, SOURCES, CREATORS, FEEDS, ITEMS, PROJECTIONS, AWAY, ONBOARD_ENTITIES, WATCH_PRESETS, X_IMPORT, TG_CHATS, DISCOVER, BROKERS, HOLDINGS, SOURCE_CATALOG, entityChipLabel, evidenceCounts } from './data.js';
import { store, save, I, nav } from './state.js';
import { streamCard, immersiveSlide, entityAv, monoAv, sparkSVG, accessBadge, becauseLine, cardBack, evidenceBar, watchFor } from './cards.js';

export const TAB_ROUTES = ['home', 'discover', 'ask', 'you'];

/* ---- shared chrome ---- */
const backBar = (title = '', extra = '') => `
  <div class="topbar">
    <button class="back-btn" data-act="back" aria-label="Back">${I.back}</button>
    ${title ? `<span class="title">${title}</span>` : ''}
    <span class="spacer"></span>${extra}
  </div>`;

const logoImg = `<img class="logo" src="img/logo-alva.svg" alt="Alva">`;

/* ---- 分类 source 目录（onboarding + discover 复用） ---- */
export function srcAvatar(s, size = 40) {
  if (s.avatar) return `<img class="av-img" src="img/${s.avatar}" width="${size}" height="${size}" alt="">`;
  const hue = { X: 200, Substack: 26, Podcast: 285, YouTube: 0, Reddit: 16, SEC: 174, 'Company IR': 152, 'Federal Reserve': 174, Gov: 174, Telegram: 210, Alva: 174 }[s.platform] ?? 174;
  return monoAv(s.name.replace(/^[@r]\/?/, '').slice(0, 2).toUpperCase(), hue, size, true);
}

function catalogRow(sid) {
  const s = SOURCES[sid];
  const added = store.sources.includes(sid);
  const covers = (s.covers || []).map(entityChipLabel).join(', ');
  return `<div class="src-row">
    <span data-act="open-source" data-id="${sid}" role="button" style="display:contents">${srcAvatar(s)}</span>
    <span class="meta" data-act="open-source" data-id="${sid}" role="button">
      <span class="nm">${s.name} ${s.access !== 'public' ? accessBadge(s.access) : ''}</span>
      <div class="ds">${s.platform} · ${s.modality}${covers ? ' · covers ' + covers : ''}</div>
    </span>
    <button class="src-add ${added ? 'on' : ''}" data-act="add-source" data-id="${sid}">${added ? 'Added' : 'Add'}</button>
  </div>`;
}

export function catalogGroups() {
  return SOURCE_CATALOG.map((g) => `
    <div class="imp-head"><span class="sec-label" style="margin:0">${g.cat}</span><span class="n">${g.hint}</span></div>
    ${g.ids.map(catalogRow).join('')}`).join('');
}

/* ========== route table ========== */
export function renderRoute(route, page) {
  const [root, a, b] = route.split('/');
  const fn = {
    welcome: sWelcome,
    onboard: () => sOnboard(a, page),
    home: sHome,
    context: () => sContext(a, page),
    discover: sDiscover,
    ask: sAsk,
    you: sYou,
    entity: () => sEntity(a, page),
    feed: () => sFeed(a, page),
    automation: () => sAutomation(a, page),
    source: () => sSource(a, page),
    creator: () => sCreator(a, page),
  }[root];
  if (fn) fn(page);
  else page.innerHTML = `${backBar()}<div class="empty"><h4>Not found</h4></div>`;
}

/* ========== welcome ========== */
function sWelcome(page) {
  page.classList.add('welcome');
  page.innerHTML = `
    <div class="welcome-body">
      ${logoImg}
      <h1>Follow what matters.<br><em>Act with context.</em></h1>
      <p>Alva reads your markets, your sources and your questions — and turns them into context you can act on.</p>
      <button class="btn btn-teal-solid" data-act="ob-start">Pick what you follow</button>
      <div class="alt" data-act="ob-start-sources" role="button">Or start by <b>connecting your sources</b></div>
    </div>`;
}

/* ========== onboarding ========== */
const OB_STEPS = ['entities', 'question', 'sources', 'preview'];
function obProgress(step) {
  const idx = OB_STEPS.indexOf(step);
  return `<div class="ob-progress">${OB_STEPS.map((s, i) => `<i class="${i <= idx ? 'on' : ''}"></i>`).join('')}</div>`;
}
function obTop(step, skipTo = '') {
  return `<div class="ob-top">
    ${step === 'entities' ? '<span></span>' : `<button class="back-btn" data-act="back">${I.back}</button>`}
    ${obProgress(step)}
    ${skipTo ? `<button class="ob-skip" data-act="nav" data-to="${skipTo}">Skip</button>` : '<span style="width:36px"></span>'}
  </div>`;
}

/* ---- 实体选择：精选网格 + 搜索下拉（选中的实体并入网格） ---- */
const OB_EXTRAS = new Set(); // 本次会话通过搜索加进网格的实体
const entHint = (e) => (e.kind === 'market' ? e.name : e.kind === 'theme' ? 'Theme' : e.role);

function entChip(id, hint) {
  const e = ENTITIES[id];
  const on = store.entities.includes(id);
  return `<button class="ent-chip ${on ? 'on' : ''}" data-act="ob-ent" data-id="${id}">
    ${entityAv(id, 34)}
    <span><span class="nm">${e.kind === 'market' ? e.ticker : e.name}</span><div class="ht">${hint}</div></span>
  </button>`;
}

function entGridHtml() {
  const curated = new Set(ONBOARD_ENTITIES.map((o) => o.id));
  for (const id of store.entities) if (!curated.has(id)) OB_EXTRAS.add(id);
  return [
    ...ONBOARD_ENTITIES.map((o) => entChip(o.id, o.hint)),
    ...[...OB_EXTRAS].filter((id) => !curated.has(id)).map((id) => entChip(id, entHint(ENTITIES[id]))),
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
    (e.ticker || '').toLowerCase().includes(ql) || e.name.toLowerCase().includes(ql) || (e.role || '').toLowerCase().includes(ql)).slice(0, 8);
  dd.innerHTML = hits.length
    ? hits.map((e) => {
        const on = store.entities.includes(e.id);
        return `<button class="ent-dd-row ${on ? 'on' : ''}" data-act="ob-ent-dd" data-id="${e.id}">
          ${entityAv(e.id, 30)}
          <span class="meta"><b>${e.kind === 'market' ? e.ticker : e.name}</b><i>${entHint(e)}</i></span>
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
  const next = document.getElementById('entNext');
  if (next) { next.disabled = n < 1; next.style.opacity = n < 1 ? '.4' : '1'; }
  const input = document.getElementById('entSearch');
  if (input) window.__entSearch(input.value);
}

function sOnboard(step, page) {
  page.classList.add('ob-page');
  if (step === 'entities') {
    page.innerHTML = `${obTop('entities')}
      <h1 class="ob-h1">What are you watching?</h1>
      <p class="ob-sub">Pick a few tickers, themes or people. Alva builds your first feed from real coverage — you can change everything later.</p>
      <div class="ent-search">${I.search}
        <input id="entSearch" placeholder="Search tickers, themes, people…" oninput="window.__entSearch(this.value)"
          onkeydown="if(event.key==='Escape'){this.value='';window.__entSearch('')}">
        <button class="clr" id="entClr" data-act="ob-search-clear" hidden aria-label="Clear search">${I.x}</button>
        <div class="ent-dd" id="entDd" hidden></div>
      </div>
      <div class="ent-grid" id="entGrid">${entGridHtml()}</div>
      <p class="ent-count" id="entCount">${store.entities.length ? `${store.entities.length} selected` : 'Pick 3–8 to start'}</p>
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="nav" data-to="#/onboard/question" ${store.entities.length < 1 ? 'disabled style="opacity:.4"' : ''} id="entNext">Continue</button></div>`;
  } else if (step === 'question') {
    const customs = store.watches.filter((w) => !WATCH_PRESETS.includes(w));
    const n = store.watches.length;
    page.innerHTML = `${obTop('question', '#/onboard/sources')}
      <h1 class="ob-h1">What are you trying to figure out?</h1>
      <p class="ob-sub">Pick any that fit, or add your own. Alva keeps each as a watch — new evidence gets flagged for or against it.</p>
      <div class="watch-presets">${[...WATCH_PRESETS, ...customs].map((w) => `<button class="watch-preset ${store.watches.includes(w) ? 'on' : ''}" data-act="ob-watch" data-w="${w}">${w}</button>`).join('')}</div>
      <div class="watch-add">
        <input class="watch-custom" id="watchInput" placeholder="Add your own question…"
          onkeydown="if(event.key==='Enter'){event.preventDefault();this.nextElementSibling.click()}">
        <button class="btn btn-ghost watch-add-btn" data-act="ob-watch-add">${I.plus}Add</button>
      </div>
      <p class="ent-count">${n ? `${n} watch${n > 1 ? 'es' : ''}` : 'Optional — you can add these later'}</p>
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="ob-watch-next">Continue</button></div>`;
  } else if (step === 'sources') {
    const conn = store.connected;
    page.innerHTML = `${obTop('sources', '#/onboard/preview')}
      <h1 class="ob-h1">Bring the sources you already trust</h1>
      <p class="ob-sub">Alva finds the sources you already follow. You choose what to bring in.</p>
      <div class="conn-list">
        <button class="conn-row ${conn.x ? 'done' : ''}" data-act="nav" data-to="#/onboard/x">
          <span class="ic" style="background:#16181b;color:#fff;border:1px solid var(--line2)">𝕏</span>
          <span class="meta"><span class="nm">Connect X</span><div class="ds">Import who you follow</div></span>
          <span class="st">${conn.x ? I.check + ' 5 added' : I.chevR}</span>
        </button>
        <button class="conn-row ${conn.telegram ? 'done' : ''}" data-act="nav" data-to="#/onboard/telegram">
          <span class="ic" style="background:rgba(43,159,217,0.12);color:#54b8e8">TG</span>
          <span class="meta"><span class="nm">Connect Telegram</span><div class="ds">Choose channels or groups — private stays private</div></span>
          <span class="st">${conn.telegram ? I.check + ' 1 added' : I.chevR}</span>
        </button>
        <button class="conn-row" data-act="toast-msg" data-msg="YouTube connect is mocked in this demo">
          <span class="ic" style="background:rgba(255,64,64,0.1);color:#ff6159">▶</span>
          <span class="meta"><span class="nm">Connect YouTube</span><div class="ds">Subscribed channels, transcripts included</div></span>
          <span class="st">${I.chevR}</span>
        </button>
        <button class="conn-row" data-act="toast-msg" data-msg="Newsletter forwarding is mocked in this demo">
          <span class="ic" style="background:rgba(245,184,74,0.1);color:var(--mixed)">＠</span>
          <span class="meta"><span class="nm">Add Newsletter</span><div class="ds">RSS, forwarding address or connect email</div></span>
          <span class="st">${I.chevR}</span>
        </button>
      </div>
      <div style="display:flex;align-items:center;gap:12px;margin:26px 0 4px">
        <hr class="hairline" style="flex:1"><span style="font-size:12px;letter-spacing:0.8px;text-transform:uppercase;color:var(--t3)">Or pick from the catalog</span><hr class="hairline" style="flex:1">
      </div>
      ${catalogGroups()}
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="nav" data-to="#/onboard/preview">${conn.x || conn.telegram || store.sources.length ? 'Continue' : 'Continue without connecting'}</button></div>`;
  } else if (step === 'x') {
    page.innerHTML = `${backBar('Connect X')}
      <div style="padding:0 0 8px">
        <h1 class="ob-h1" style="font-size:26px">We found ${X_IMPORT.total} accounts you follow</h1>
        <p class="ob-sub">Already-indexed sources join instantly. New ones become Custom Sources.</p>
        <div class="imp-head"><span class="sec-label" style="margin:0">Already on Alva</span><span class="n">${X_IMPORT.onAlva.length} shown</span></div>
        <div>${X_IMPORT.onAlva.map((r) => {
          const s = SOURCES[r.source];
          const on = store.sources.includes(r.source);
          return `<div class="src-row">
            <img class="av-img" src="img/${s.avatar}" width="40" height="40" alt="">
            <span class="meta"><span class="nm">${s.name}</span><div class="ds">${s.platform} · covers ${r.entities.map(entityChipLabel).join(', ')}</div></span>
            <button class="src-add ${on ? 'on' : ''}" data-act="add-source" data-id="${r.source}">${on ? 'Added' : 'Add'}</button>
          </div>`;
        }).join('')}</div>
        <div class="imp-head"><span class="sec-label" style="margin:0">New sources for your interests</span><span class="n">${X_IMPORT.newSources.length}</span></div>
        <div>${X_IMPORT.newSources.map((r, i) => `<div class="src-row">
            ${monoAv(r.name.slice(1, 3).toUpperCase(), 200 + i * 40, 40, true)}
            <span class="meta"><span class="nm">${r.name}</span><div class="ds">${r.followers} followers · covers ${r.entities.map(entityChipLabel).join(', ')}</div></span>
            <button class="src-add dim" data-act="custom-source" data-name="${r.name}">Custom · 1 slot</button>
          </div>`).join('')}</div>
        <div class="imp-head"><span class="sec-label" style="margin:0">Limited access</span><span class="n">${X_IMPORT.limited.length}</span></div>
        ${X_IMPORT.limited.map((r) => `<div class="src-row" style="opacity:.55">
          ${monoAv('?', 0, 40, true)}
          <span class="meta"><span class="nm">${r.name}</span><div class="ds">${r.reason} — can’t be read by Alva</div></span>
        </div>`).join('')}
      </div>
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="x-done">Done</button></div>`;
  } else if (step === 'telegram') {
    page.innerHTML = `${backBar('Connect Telegram')}
      <div style="padding:0 0 8px">
        <h1 class="ob-h1" style="font-size:26px">Choose what Alva can read</h1>
        <p class="ob-sub">Nothing is pre-selected. Private chats stay collapsed.</p>
        <div class="tg-note">${I.shield}<span>Only you can use insights from private sources. Alva never adds their messages to public feeds.</span></div>
        <div class="imp-head"><span class="sec-label" style="margin:0">Channels</span></div>
        ${TG_CHATS.channels.map((c, i) => `<div class="src-row" data-act="tg-toggle" data-i="${i}" role="button">
          <span class="check ${c.selected ? 'on' : ''}" data-tg="${i}">${I.check}</span>
          <span class="meta"><span class="nm">${c.name} ${c.name.includes('Alpha') ? accessBadge('private') : ''}</span><div class="ds">${c.members} members · active ${c.active} · ${c.type}</div></span>
        </div>`).join('')}
        <div class="imp-head"><span class="sec-label" style="margin:0">Groups</span></div>
        ${TG_CHATS.groups.map((c) => `<div class="src-row" style="opacity:.6">
          <span class="check">${I.check}</span>
          <span class="meta"><span class="nm">${c.name}</span><div class="ds">${c.members} members · ${c.type} — not suggested</div></span>
        </div>`).join('')}
        <div class="imp-head"><span class="sec-label" style="margin:0">History</span></div>
        <div style="display:flex;gap:8px">
          <button class="chip on">Last 30 days</button><button class="chip">90 days</button><button class="chip">None</button>
        </div>
      </div>
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="tg-done">Create my private feed</button></div>`;
  } else if (step === 'preview') {
    const first = ITEMS.find((it) => it.entity_refs.some((e) => store.entities.includes(e))) || ITEMS[0];
    page.innerHTML = `${obTop('preview')}
      <h1 class="ob-h1">Your feed is ready</h1>
      <p class="ob-sub">Built from ${store.entities.length || 3} follows${store.sources.length ? `, ${store.sources.length} sources you added` : ''}${store.watches.length ? ' and your watches' : ''}. Here’s a first look.</p>
      <div class="pv-card-mini">${streamCard(first)}</div>
      <div class="pv-group">
        <div class="sec-label">Also in your channels</div>
        ${['nvda_events', 'ai_watch', 'brief'].map((f) => `<div class="pv-row">${monoAv('AL', 174, 34)}<span class="nm">${FEEDS[f].name}</span><span class="k">${FEEDS[f].owner} · ${FEEDS[f].cadence}</span></div>`).join('')}
      </div>
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="ob-finish">Open For You</button></div>`;
  }
}

/* ========== home / for you ========== */
function sHome(page) {
  const mode = store.mode;
  const visible = ITEMS.filter((it) => !(it.access === 'private' && !store.connected.telegram) && !store.muted.includes(it.evidence[0]?.source));
  page.innerHTML = mode === 'stream'
    ? `<div class="topbar"><span class="lg-title">For You</span><span class="spacer"></span></div>${streamView(visible)}`
    : '';
  if (mode === 'immersive') {
    const wrap = document.createElement('div');
    wrap.className = 'imm-wrap';
    wrap.style.cssText = 'position:relative;flex:1;overflow:hidden';
    wrap.innerHTML = `<div class="imm-top"><span>For You</span></div>
      <div class="imm-scroll">${visible.map((it, i) => immersiveSlide(it, i, visible.length)).join('')}</div>
      <div class="imm-dots">${visible.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div>`;
    page.appendChild(wrap);
    const scroll = wrap.querySelector('.imm-scroll');
    const curIdx = () => Math.round(scroll.scrollTop / scroll.clientHeight);
    scroll.addEventListener('scroll', () => {
      const idx = curIdx();
      wrap.querySelectorAll('.imm-dots i').forEach((d, i) => d.classList.toggle('on', i === idx));
    }, { passive: true });
    /* 桌面滚轮 / 触控板：整屏翻页，一次一张（触屏靠 scroll-snap-stop: always）。
     * 防惯性连击：翻页后锁定，且必须等事件流出现 >150ms 的安静间隙（新手势）才解锁。 */
    let locked = false, lastEvt = 0, unlockAt = 0;
    scroll.addEventListener('wheel', (e) => {
      e.preventDefault();
      const now = performance.now();
      const gap = now - lastEvt;
      lastEvt = now;
      if (locked) {
        if (now >= unlockAt && gap > 150) locked = false; // 安静间隙后的首个事件 = 新手势
        else return;
      }
      if (Math.abs(e.deltaY) < 10) return;
      const cur = curIdx();
      const target = Math.max(0, Math.min(visible.length - 1, cur + Math.sign(e.deltaY)));
      if (target === cur) return;
      locked = true;
      unlockAt = now + 700;
      scroll.scrollTo({ top: target * scroll.clientHeight, behavior: 'smooth' });
    }, { passive: false });
  }
}

function streamView(items) {
  const away = !store.awaySeen ? `
    <div class="away reveal">
      <div class="away-head"><span class="lbl">Since you were away</span><span class="n">${AWAY.updates.length} meaningful updates</span></div>
      ${AWAY.updates.map((u) => `<div class="away-row" data-act="open-detail" data-item="${u.item}">
        <span class="tk">${u.entity}</span><span class="tx">${u.text}</span>${I.chevR}
      </div>`).join('')}
    </div>` : '';
  return `<div class="feed-scroll">${away}${items.map((it, i) => streamCard(it, i + 1)).join('')}</div>`;
}

/* ========== context detail ========== */
function sContext(id, page) {
  const item = ITEMS.find((it) => it.id === id);
  if (!item) { page.innerHTML = backBar() + '<div class="empty"><h4>Context not found</h4></div>'; return; }
  const hasHero = item.media && item.media.hero;
  const proj = PROJECTIONS[item.id];
  const tracked = store.tracks.includes(item.id);
  page.innerHTML = `
    ${hasHero ? `<div class="detail-hero"><img src="${item.media.hero}" alt="${item.media.alt}"><div class="scrim"></div>${backBar('', `<button class="behind-pill" data-act="evi-sheet" data-item="${item.id}">${I.flip}Behind this</button>`)}</div>` : backBar('', `<button class="behind-pill" data-act="evi-sheet" data-item="${item.id}">${I.flip}Behind this</button>`)}
    <div class="detail-body ${hasHero ? '' : 'no-hero'}">
      <div class="card-head" style="margin-top:${hasHero ? 0 : 8}px">
        <div class="ent" data-act="open-entity" data-id="${item.entity_refs[0] || ''}">${item.entity_refs[0] ? entityAv(item.entity_refs[0], 34) : monoAv('AL', 174, 34)}
        <span class="tick">${item.entity_refs.length ? entityChipLabel(item.entity_refs[0]) : FEEDS[item.feed].name}</span>
        <span class="theme">${FEEDS[item.feed].name}</span></div>
        <span class="time">${item.published}</span>
      </div>
      <h1 class="detail-headline">${item.headline}</h1>
      ${watchLine(item)}
      <div class="d-sec"><div class="sec-label">Summary</div><p>${item.summary}</p></div>
      ${item.what_changed ? `<div class="d-sec"><div class="sec-label">What changed</div><p>${item.what_changed}</p></div>` : ''}
      ${item.why_matters ? `<div class="d-sec"><div class="sec-label">Why it matters</div><p>${item.why_matters}</p></div>` : ''}
      ${item.price ? `<div class="d-sec"><div class="sec-label">Price context</div><div class="card-body">${priceMini(item)}</div></div>` : ''}
      <div class="d-sec"><div class="sec-label">Evidence</div>${evidenceBar(item)}</div>
      <div class="d-sec"><div class="sec-label">Related</div><div class="rel-row">${item.entity_refs.map((e) => `<button class="chip" data-act="open-entity" data-id="${e}">${entityChipLabel(e)}</button>`).join('')}<button class="chip" data-act="open-feed" data-id="${item.feed}">${FEEDS[item.feed].name}</button></div></div>
      <div class="d-sec"><div class="sec-label">Original sources</div>${item.evidence.map((ev) => `<div class="orig-link" data-act="open-source" data-id="${ev.source}" role="button">${I.link}<span>${SOURCES[ev.source].name} — ${ev.note}</span></div>`).join('')}</div>
      <div class="detail-cta">
        <button class="btn btn-ask" data-act="ask-item" data-item="${item.id}">${I.ask}Ask Alva</button>
        <button class="btn btn-ghost" data-act="track-item" data-item="${item.id}" style="${tracked ? 'color:var(--teal);border-color:var(--teal-line)' : ''}">${I.track}${tracked ? 'Tracking' : 'Track'}</button>
      </div>
    </div>`;
}
function watchLine(item) {
  const proj = PROJECTIONS[item.id];
  const w = watchFor(item);
  if (!proj || !proj.watch || !w) return '';
  const label = { supports: 'Supports', challenges: 'Challenges', new_evidence: 'New evidence for' }[proj.watch];
  return `<div style="margin-top:12px"><span class="watch-flag ${proj.watch}"><span class="dot"></span>${label} “${w}”</span></div>`;
}
function priceMini(item) {
  const { now, before } = item.price;
  const col = (p) => `<div style="flex:1;min-width:0">
    <div style="font-size:12px;color:var(--t3)">${p.label}</div>
    <div style="display:flex;align-items:baseline;gap:8px;margin-top:3px">
      <span style="font-size:17px;font-weight:700">${p.value}</span>
      <span style="font-size:12.5px;font-weight:600;color:var(--${p.dir})">${p.change}</span>
    </div>
    <div style="margin-top:6px">${sparkSVG(p.spark, p.dir, 110, 26)}</div>
  </div>`;
  return `<div style="display:flex;gap:18px;background:rgba(255,255,255,0.03);border:1px solid var(--line);border-radius:14px;padding:12px 14px">${col(now)}${col(before)}</div>`;
}

/* ========== discover ========== */
let discTab = 'all';
export function setDiscTab(t) { discTab = t; }

const marketRow = (m) => { const e = ENTITIES[m]; return `<div class="list-row" data-act="open-entity" data-id="${m}" role="button">
  ${entityAv(m, 40)}
  <span class="meta"><span class="nm">${e.ticker}</span><div class="ds">${e.name}</div></span>
  <span class="price"><div class="v">${e.price}</div><div class="c" style="color:var(--${e.dir})">${e.delta}</div></span>
</div>`; };

const channelRow = (f) => { const fd = FEEDS[f]; const on = store.feeds.includes(f); return `<div class="list-row">
  ${monoAv(fd.owner === 'Alva' ? 'AL' : fd.owner.slice(0, 2).toUpperCase(), fd.access === 'premium' ? 40 : 174, 40)}
  <span class="meta" data-act="open-feed" data-id="${f}" role="button"><span class="nm">${fd.name} ${fd.access !== 'public' ? accessBadge(fd.access) : ''}</span><div class="ds">${fd.owner} · ${fd.cadence}</div></span>
  <button class="follow-sm ${on ? 'on' : ''}" data-act="follow-feed" data-id="${f}">${on ? 'Following' : 'Follow'}</button>
</div>`; };

const creatorRow = (c) => { const cr = CREATORS[c]; return `<div class="list-row" data-act="open-creator" data-id="${c}" role="button">
  <img class="av-img" src="img/${cr.avatar}" width="40" height="40" alt="">
  <span class="meta"><span class="nm">${cr.name}</span><div class="ds">${cr.expertise.join(' · ')} · ${cr.connected ? 'Connected' : 'Indexed'}</div></span>
  ${I.chevR}
</div>`; };

function themeTiles() {
  return `<div class="tile-scroll">${DISCOVER.trendingThemes.map((t) => `<button class="theme-tile" data-act="open-entity" data-id="${t}">
    <div class="nm">${ENTITIES[t].name}</div><div class="k">${followCount(t)} following</div>
  </button>`).join('')}</div>`;
}

/* 主题/人物的通用发现行（marketRow 之外的 entity） */
const entityRow = (id) => { const e = ENTITIES[id]; return `<div class="list-row" data-act="open-entity" data-id="${id}" role="button">
  ${entityAv(id, 40)}
  <span class="meta"><span class="nm">${e.name}</span><div class="ds">${e.kind === 'theme' ? 'Theme' : e.role}</div></span>
  ${I.chevR}
</div>`; };

/* BYOS 入口：目录之外的源，用户自己带进来（§6.1 Custom available） */
const byosRow = `<button class="byos-row" data-act="byos-sheet">
  <span class="ic">${I.plus}</span>
  <span class="meta"><span class="nm">Add a custom source</span><div class="ds">Paste a URL or handle — newsletters, X, RSS, YouTube</div></span>
  ${I.chevR}
</button>`;

/* 私有 feed 属于 You 页，公共目录只列 public/premium */
const publicFeedIds = () => Object.keys(FEEDS).filter((id) => FEEDS[id].access !== 'private');

function discBodyHtml(tab) {
  const allMarkets = Object.values(ENTITIES).filter((e) => e.kind === 'market').map((e) => e.id);
  /* 已连接账号推荐：X follows 里还没加进 Alva 的源 */
  const connSug = store.connected.x ? ['dylan', 'kobeissi', 'uwhales'].filter((id) => !store.sources.includes(id)) : [];
  const connModule = store.connected.x
    ? (connSug.length ? connSug.map(catalogRow).join('') : '<p class="ent-none">Everything from your X follows is already in.</p>')
    : `<div class="list-row" data-act="nav" data-to="#/onboard/x" role="button">
        ${monoAv('𝕏', 200, 40, true)}
        <span class="meta"><span class="nm">Connect X</span><div class="ds">Import who you follow as sources</div></span>
        ${I.chevR}
      </div>`;

  return {
    all: `
      <div class="sec-label">Trending themes</div>${themeTiles()}
      <div class="d-sec"><div class="sec-label">Movers worth understanding</div>${DISCOVER.movers.map(marketRow).join('')}</div>
      <div class="d-sec"><div class="sec-label">Popular channels</div>${DISCOVER.popularFeeds.map(channelRow).join('')}</div>
      <div class="d-sec"><div class="sec-label">Creators</div>${DISCOVER.creators.map(creatorRow).join('')}</div>
      <div class="d-sec"><div class="sec-label">From your connected accounts</div>${connModule}</div>`,
    markets: `
      <div class="sec-label">Trending themes</div>${themeTiles()}
      <div class="d-sec"><div class="sec-label">Markets</div>${allMarkets.map(marketRow).join('')}</div>`,
    channels: `
      <div class="sec-label" style="margin-top:4px">Channels — continuous coverage you can follow</div>
      ${publicFeedIds().map(channelRow).join('')}`,
    creators: `
      <div class="sec-label" style="margin-top:4px">Creators</div>
      ${Object.keys(CREATORS).map(creatorRow).join('')}`,
    sources: catalogGroups() + byosRow,
  }[tab];
}

/* 统一搜索：结果按对象类型分组（§11.2），Follow / Add 操作与列表一致 */
function discResultsHtml(q) {
  const ql = q.toLowerCase();
  const has = (s) => (s || '').toLowerCase().includes(ql);
  const markets = Object.values(ENTITIES).filter((e) => e.kind === 'market' && (has(e.ticker) || has(e.name))).map((e) => e.id);
  const others = Object.values(ENTITIES).filter((e) => e.kind !== 'market' && (has(e.name) || has(e.role))).map((e) => e.id);
  const channels = publicFeedIds().filter((id) => has(FEEDS[id].name) || has(FEEDS[id].owner));
  const creators = Object.keys(CREATORS).filter((id) => has(CREATORS[id].name) || CREATORS[id].expertise.some(has));
  const sources = Object.values(SOURCES).filter((s) => s.access !== 'private' && (has(s.name) || has(s.platform))).map((s) => s.id);
  const secs = [];
  if (markets.length) secs.push(`<div class="d-sec"><div class="sec-label">Markets</div>${markets.map(marketRow).join('')}</div>`);
  if (others.length) secs.push(`<div class="d-sec"><div class="sec-label">Themes & people</div>${others.map(entityRow).join('')}</div>`);
  if (channels.length) secs.push(`<div class="d-sec"><div class="sec-label">Channels</div>${channels.map(channelRow).join('')}</div>`);
  if (creators.length) secs.push(`<div class="d-sec"><div class="sec-label">Creators</div>${creators.map(creatorRow).join('')}</div>`);
  if (sources.length) secs.push(`<div class="d-sec"><div class="sec-label">Sources</div>${sources.map(catalogRow).join('')}</div>`);
  return secs.length ? secs.join('')
    : `<div class="empty"><h4>No matches</h4><p>Try a ticker, a channel, a creator — or add it yourself.</p></div>${byosRow}`;
}

window.__discSearch = (q) => {
  q = q.trim();
  const body = document.getElementById('discBody');
  const tabs = document.getElementById('discTabs');
  const clr = document.getElementById('discClr');
  if (clr) clr.hidden = !q;
  if (tabs) tabs.style.display = q ? 'none' : '';
  if (body) body.innerHTML = q ? discResultsHtml(q) : discBodyHtml(discTab);
};

function sDiscover(page) {
  const TABS = [['all', 'All'], ['markets', 'Markets'], ['channels', 'Channels'], ['creators', 'Creators'], ['sources', 'Sources']];
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">Discover</span><span class="spacer"></span></div>
    <div class="ent-search disc-search">${I.search}
      <input id="discSearch" placeholder="Search markets, channels, creators, sources…" oninput="window.__discSearch(this.value)"
        onkeydown="if(event.key==='Escape'){this.value='';window.__discSearch('')}">
      <button class="clr" id="discClr" data-act="disc-search-clear" hidden aria-label="Clear search">${I.x}</button>
    </div>
    <div class="disc-tabs" id="discTabs">
      ${TABS.map(([t, lbl]) => `<button class="chip ${discTab === t ? 'on' : ''}" data-act="disc-tab" data-t="${t}">${lbl}</button>`).join('')}
    </div>
    <div class="disc-body" id="discBody">${discBodyHtml(discTab)}</div>`;
}
function followCount(t) { return { AI_INFRA: '12.4K', HBM: '3.8K', NUCLEAR: '5.1K', STABLECOIN: '7.7K', ROBOTAXI: '4.2K' }[t] || '2K'; }

/* ========== entity page ========== */
function sEntity(id, page) {
  const e = ENTITIES[id];
  if (!e) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  const related = ITEMS.filter((it) => it.entity_refs.includes(id));
  const feeds = Object.values(FEEDS).filter((f) => f.entities.includes(id));
  const on = store.entities.includes(id);
  page.innerHTML = `${backBar()}
    <div class="hero-head">
      <div class="row1">
        ${entityAv(id, 52)}
        <div><h1>${e.kind === 'market' ? e.ticker : e.name}</h1><div class="sub">${e.kind === 'market' ? e.name : e.kind === 'theme' ? 'Theme' : e.role}</div></div>
        ${e.price ? `<div class="px"><div class="v">${e.price}</div><div class="c" style="color:var(--${e.dir})">${e.delta}</div></div>` : ''}
      </div>
      <div class="actions">
        <button class="btn ${on ? 'btn-ghost' : 'btn-teal-solid'}" style="flex:1" data-act="follow-entity" data-id="${id}">${on ? I.check + 'Following' : I.plus + 'Follow'}</button>
        <button class="btn btn-ghost" style="flex:1" data-act="ask-entity" data-id="${id}">${I.ask}Ask Alva</button>
      </div>
    </div>
    <div class="page-secs">
      ${related.length ? `<div class="d-sec"><div class="sec-label">Today’s context</div>${related.map((it, i) => streamCard(it, i)).join('')}</div>` : ''}
      <div class="d-sec"><div class="sec-label">Channels covering ${e.kind === 'market' ? e.ticker : e.name}</div>
        ${feeds.map((f) => { const fon = store.feeds.includes(f.id); return `<div class="list-row">
          ${monoAv('AL', 174, 40)}
          <span class="meta" data-act="open-feed" data-id="${f.id}" role="button"><span class="nm">${f.name}</span><div class="ds">${f.owner} · ${f.cadence}</div></span>
          <button class="follow-sm ${fon ? 'on' : ''}" data-act="follow-feed" data-id="${f.id}">${fon ? 'Following' : 'Follow'}</button>
        </div>`; }).join('') || '<p style="font-size:14px;color:var(--t3)">Covered by the generic market projection.</p>'}
      </div>
      <div class="d-sec"><div class="sec-label">Key sources</div>
        ${Object.values(SOURCES).filter((s) => ['nvda_ir', 'dylan', 'semianalysis'].includes(s.id) && id === 'NVDA' || ['semianalysis', 'dylan', 'localllama'].includes(s.id) && id !== 'NVDA').slice(0, 3).map((s) => `<div class="list-row" data-act="open-source" data-id="${s.id}" role="button">
          ${s.avatar ? `<img class="av-img" src="img/${s.avatar}" width="40" height="40" alt="">` : monoAv(s.name.slice(0, 2).toUpperCase(), 174, 40, true)}
          <span class="meta"><span class="nm">${s.name}</span><div class="ds">${s.platform} · ${s.modality}</div></span>
          ${I.chevR}
        </div>`).join('')}
      </div>
    </div>`;
}

/* ========== feed detail ========== */
function sFeed(id, page) {
  const f = FEEDS[id];
  if (!f) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  const items = ITEMS.filter((it) => it.feed === id);
  const on = store.feeds.includes(id);
  const mine = f.owner === 'You';
  page.innerHTML = `${backBar()}
    <div class="hero-head">
      <div class="row1">
        ${monoAv(f.owner === 'Alva' ? 'AL' : f.owner.slice(0, 2).toUpperCase(), f.access === 'premium' ? 40 : f.access === 'private' ? 260 : 174, 52)}
        <div><h1 style="font-size:23px">${f.name}</h1><div class="sub">${f.owner} · ${f.cadence} · ${f.access}</div></div>
      </div>
      <div class="actions">
        <button class="btn ${on ? 'btn-ghost' : 'btn-teal-solid'}" style="flex:1" data-act="follow-feed" data-id="${id}">${on ? I.check + 'Following' : I.plus + 'Follow'}</button>
        ${mine ? `<button class="btn btn-ghost" style="flex:1" data-act="manage-feed-src" data-id="${id}">${I.gear}Manage sources</button>` : `<button class="btn btn-ghost" style="flex:1" data-act="feed-src-sheet" data-id="${id}">${I.eye}Sources</button>`}
      </div>
    </div>
    <div class="page-secs">
      <div class="d-sec"><p style="font-size:15px;color:var(--t2)">${f.promise}</p></div>
      <div class="stat-strip">
        <div class="cell"><div class="n">${f.sources.length}</div><div class="k">Sources</div></div>
        <div class="cell"><div class="n">${f.entities.length || '—'}</div><div class="k">Entities</div></div>
        <div class="cell"><div class="n">${f.cadence.split(' ')[0]}</div><div class="k">Cadence</div></div>
      </div>
      ${items.length ? `<div class="d-sec"><div class="sec-label">Recent</div>${items.map((it, i) => streamCard(it, i)).join('')}</div>` : `<div class="empty"><div class="glyph">${I.spark}</div><h4>Next update ${f.cadence.toLowerCase()}</h4><p>Follow to get it in your For You.</p></div>`}
    </div>`;
}

/* ========== automation 管理页（对齐真实产品 AlertAutomationRow：状态点 + meta 线 +
 * hairline 行，pause/unsubscribe 都是安静的文字动作，不做大按钮） ========== */
function sAutomation(id, page) {
  const f = FEEDS[id];
  if (!f) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  const paused = store.paused.includes(id);
  const subscribed = store.feeds.includes(id);
  const srcAvs = f.sources.slice(0, 4).map((sid) => {
    const s = SOURCES[sid];
    return s.avatar ? `<img src="img/${s.avatar}" alt="">` : `<span>${s.name.replace(/^[@r]\/?/, '').slice(0, 1).toUpperCase()}</span>`;
  }).join('');
  const delivers = store.connected.telegram ? 'For You · Telegram' : 'For You';
  page.innerHTML = `${backBar('Automation')}
    <div class="page-secs">
      <div class="auto-head">
        <div class="auto-title"><span class="st-dot ${paused ? 'off' : ''}"></span><h1>${f.name}</h1></div>
        <div class="auto-meta">${f.owner} · Last run ${f.last_run} · ${f.cadence} · ${f.runs} runs</div>
        <p class="auto-promise">${f.promise}</p>
      </div>
      <div class="auto-rows">
        <div class="auto-row">
          <span class="k">Status</span>
          <span class="v">${paused ? 'Paused' : 'Active'}</span>
          <button class="txt-act" data-act="auto-pause" data-id="${id}">${paused ? 'Resume' : 'Pause'}</button>
        </div>
        <div class="auto-row" data-act="feed-src-sheet" data-id="${id}" role="button">
          <span class="k">Sources</span>
          <span class="v"><span class="src-stack sm">${srcAvs}</span>${f.sources.length}</span>
          ${I.chevR}
        </div>
        <div class="auto-row">
          <span class="k">Delivers to</span>
          <span class="v">${delivers}</span>
        </div>
      </div>
      ${subscribed
        ? `<button class="txt-act danger auto-unsub" data-act="auto-unsub" data-id="${id}">Unsubscribe</button>`
        : `<button class="txt-act teal auto-unsub" data-act="follow-feed" data-id="${id}">Subscribe</button>`}
    </div>`;
}

/* ========== source detail ========== */
function sSource(id, page) {
  const s = SOURCES[id];
  if (!s) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  const usedBy = Object.values(FEEDS).filter((f) => f.sources.includes(id));
  const added = store.sources.includes(id);
  const cr = s.creator ? CREATORS[s.creator] : null;
  page.innerHTML = `${backBar()}
    <div class="hero-head">
      <div class="row1">
        ${s.avatar ? `<img class="av-img" src="img/${s.avatar}" width="52" height="52" alt="">` : monoAv(s.name.slice(0, 2).toUpperCase(), s.access === 'private' ? 260 : 174, 52, true)}
        <div><h1 style="font-size:22px">${s.name}</h1><div class="sub">${s.platform} · ${s.modality}</div></div>
        <span style="margin-left:auto">${accessBadge(s.access)}</span>
      </div>
      ${!cr || cr.connected ? '' : `<div class="indexed-note">${I.eye}<span><b>Indexed by Alva</b> — a public source. Own it? Connect it to manage and monetize.</span></div>`}
      <div class="actions">
        <button class="btn ${added ? 'btn-ghost' : 'btn-teal-solid'}" style="flex:1" data-act="add-source" data-id="${id}">${added ? I.check + 'In your feed' : I.plus + 'Add to my feed'}</button>
        <button class="btn btn-ghost" style="flex:1" data-act="toast-msg" data-msg="Opens the original on ${s.platform}">${I.link}Open original</button>
      </div>
    </div>
    <div class="page-secs">
      ${s.access === 'private' ? `<div class="tg-note" style="margin-top:16px">${I.shield}<span>Only you can use insights from this source. It never enters public feeds.</span></div>` : ''}
      <div class="d-sec"><div class="sec-label">Used by</div>
        ${usedBy.map((f) => `<div class="list-row" data-act="open-feed" data-id="${f.id}" role="button">${monoAv('AL', 174, 38)}<span class="meta"><span class="nm">${f.name}</span><div class="ds">${f.owner}</div></span>${I.chevR}</div>`).join('') || '<p style="font-size:14px;color:var(--t3)">Not in any feed yet.</p>'}
      </div>
      <div class="d-sec"><div class="sec-label">Recently cited in</div>
        ${ITEMS.filter((it) => it.evidence.some((ev) => ev.source === id)).slice(0, 3).map((it) => `<div class="orig-link" data-act="open-detail" data-item="${it.id}" role="button">${I.chevR}<span>${it.headline}</span></div>`).join('')}
      </div>
      ${cr ? `<div class="d-sec"><div class="sec-label">Creator</div><div class="list-row" data-act="open-creator" data-id="${cr.id}" role="button"><img class="av-img" src="img/${cr.avatar}" width="40" height="40" alt=""><span class="meta"><span class="nm">${cr.name}</span><div class="ds">${cr.expertise.join(' · ')}</div></span>${I.chevR}</div></div>` : ''}
    </div>`;
}

/* ========== creator profile ========== */
function sCreator(id, page) {
  const c = CREATORS[id];
  if (!c) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  const feeds = Object.values(FEEDS).filter((f) => f.owner.toLowerCase() === c.name.toLowerCase());
  page.innerHTML = `${backBar()}
    <div class="hero-head">
      <div class="row1">
        <img class="av-img" src="img/${c.avatar}" width="56" height="56" alt="">
        <div><h1 style="font-size:23px">${c.name}</h1><div class="sub">${c.handle} · ${c.connected ? '✓ Connected' : 'Indexed'} · ${c.followers}</div></div>
      </div>
      ${c.connected ? '' : `<div class="indexed-note">${I.eye}<span><b>Indexed by Alva</b> — ${c.name} hasn’t connected this profile. Scores come from tracked public calls.</span></div>`}
      <div class="actions">
        <button class="btn btn-teal-solid" style="flex:1" data-act="toast-msg" data-msg="Following ${c.name}">${I.plus}Follow</button>
        <button class="btn btn-ghost" style="flex:1" data-act="toast-msg" data-msg="Opens ${c.name}’s sources on their platforms">${I.link}Original</button>
      </div>
    </div>
    <div class="page-secs">
      <div class="d-sec"><p style="font-size:15px;color:var(--t2)">${c.bio}</p></div>
      <div class="d-sec"><div class="sec-label">Track record radar</div>${radar(c.radar)}</div>
      <div class="d-sec"><div class="sec-label">Expertise</div><div class="rel-row">${c.expertise.map((x) => `<span class="chip">${x}</span>`).join('')}</div></div>
      <div class="d-sec"><div class="sec-label">Connected sources</div>
        ${c.sources.map((sid) => { const s = SOURCES[sid]; return `<div class="list-row" data-act="open-source" data-id="${sid}" role="button">
          ${s.avatar ? `<img class="av-img" src="img/${s.avatar}" width="40" height="40" alt="">` : monoAv(s.name.slice(0, 2).toUpperCase(), 174, 40, true)}
          <span class="meta"><span class="nm">${s.name} ${s.access !== 'public' ? accessBadge(s.access) : ''}</span><div class="ds">${s.platform} · ${s.modality}</div></span>${I.chevR}
        </div>`; }).join('')}
      </div>
      ${feeds.length ? `<div class="d-sec"><div class="sec-label">Feeds</div>${feeds.map((f) => `<div class="list-row" data-act="open-feed" data-id="${f.id}" role="button">${monoAv(f.owner.slice(0, 2).toUpperCase(), 40, 40)}<span class="meta"><span class="nm">${f.name} ${accessBadge(f.access)}</span><div class="ds">${f.cadence}</div></span>${I.chevR}</div>`).join('')}</div>` : ''}
    </div>`;
}

function radar(r) {
  const keys = [['accuracy', 'Accuracy'], ['alpha', 'Alpha'], ['depth', 'Depth'], ['consistency', 'Consistency'], ['risk', 'Risk control'], ['timing', 'Timing']];
  const cx = 70, cy = 70, R = 54;
  const pt = (i, v) => {
    const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return `${(cx + Math.cos(a) * R * (v / 100)).toFixed(1)},${(cy + Math.sin(a) * R * (v / 100)).toFixed(1)}`;
  };
  const ring = (f) => keys.map((_, i) => pt(i, 100 * f)).join(' ');
  const poly = keys.map(([k], i) => pt(i, r[k])).join(' ');
  return `<div class="radar-wrap">
    <svg width="140" height="140" viewBox="0 0 140 140">
      ${[1, 0.5].map((f) => `<polygon points="${ring(f)}" fill="none" stroke="rgba(255,255,255,0.09)"/>`).join('')}
      ${keys.map((_, i) => `<line x1="70" y1="70" x2="${pt(i, 100).split(',')[0]}" y2="${pt(i, 100).split(',')[1]}" stroke="rgba(255,255,255,0.05)"/>`).join('')}
      <polygon points="${poly}" fill="rgba(79,217,202,0.16)" stroke="var(--teal)" stroke-width="1.8" stroke-linejoin="round"/>
      ${keys.map(([k], i) => `<circle cx="${pt(i, r[k]).split(',')[0]}" cy="${pt(i, r[k]).split(',')[1]}" r="2.4" fill="var(--teal)"/>`).join('')}
    </svg>
    <div class="radar-legend">${keys.map(([k, lbl]) => `<div class="it"><span>${lbl}</span><b>${r[k]}</b></div>`).join('')}</div>
  </div>`;
}

/* ========== ask ========== */
export let askCtx = null;
export function setAskCtx(id) { askCtx = id; }
let pendingAsk = null;
export function setPendingAsk(q) { pendingAsk = q; }
function sAsk(page) {
  const item = askCtx ? ITEMS.find((it) => it.id === askCtx) : null;
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">Ask</span><span class="spacer"></span></div>
    <div class="ask-body">
      <div class="ask-hero">
        <h1>${item ? 'Ask about this context' : `What do you want to <em>understand</em>?`}</h1>
        ${item ? `<div class="ask-ctx-chip">${I.spark}<span>${item.headline}</span><button class="x" data-act="clear-ctx">${I.x}</button></div>` : ''}
      </div>
      <div class="ask-sugs" id="askSugs">
        ${(item ? [
          `Does this change my ${store.watches.length ? 'watch' : 'thesis'}: “${watchFor(item) || 'AI capex is accelerating'}”?`,
          'What would the bear case need to be true?',
          'Compare this against the last two quarters',
        ] : [
          'Review what changed for my follows this week',
          'Compare NVDA and AMD on AI revenue exposure',
          'Build a monitor for HBM pricing changes',
        ]).map((s) => `<button class="ask-sug" data-act="ask-send" data-q="${s}">${s}</button>`).join('')}
      </div>
      <div class="ask-reply" id="askReply"></div>
      <div class="ask-composer">
        <input id="askInput" placeholder="Ask anything about your markets…">
        <button class="send" data-act="ask-send">${I.send}</button>
      </div>
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

/* ========== you ========== */
function portfolioSec() {
  if (!store.brokerage) {
    return `<div class="d-sec"><div class="sec-label">Portfolio</div>
      <div class="pf-connect">
        <div class="pf-copy"><span class="nm">Connect your brokerage</span>
        <p>Your positions shape For You — Alva prioritizes context for what you actually hold. Read-only, revocable anytime.</p></div>
        <button class="btn btn-teal-solid" style="height:44px;font-size:14.5px" data-act="connect-broker">${I.link}Connect account</button>
      </div>
    </div>`;
  }
  const total = '$31,715';
  return `<div class="d-sec"><div class="sec-label">Portfolio · ${store.brokerage}</div>
    <div class="pf-head">
      <div><div class="pf-total">${total}</div><div class="pf-sub">3 positions · read-only</div></div>
      <span class="pf-pnl up">+9.6% all time</span>
    </div>
    ${HOLDINGS.map((h) => {
      const e = ENTITIES[h.entity];
      return `<div class="list-row" data-act="open-entity" data-id="${h.entity}" role="button">
        ${entityAv(h.entity, 38)}
        <span class="meta"><span class="nm">${e.ticker}</span><div class="ds">${h.qty}</div></span>
        <span class="price"><div class="v">${h.value}</div><div class="c" style="color:var(--${h.dir})">${h.pnl}</div></span>
      </div>`;
    }).join('')}
    <p class="pf-note">${I.spark} Positions shape your For You — context about what you hold ranks higher.</p>
  </div>`;
}

function sYou(page) {
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">You</span><span class="spacer"></span></div>
    <div class="you-head">
      ${monoAv('L', 174, 56, true)}
      <div><h1>Leo</h1><div class="sub">${store.entities.length} follows · ${store.sources.length} sources · ${store.tracks.length} tracks</div></div>
    </div>
    <div class="you-secs">
      ${portfolioSec()}
      <div class="d-sec"><div class="sec-label">Following</div>
        <div class="rel-row">${store.entities.map((e) => `<button class="chip on" data-act="open-entity" data-id="${e}">${entityChipLabel(e)}</button>`).join('') || '<span style="font-size:14px;color:var(--t3)">Nothing yet</span>'}</div>
      </div>
      ${store.watches.length ? `<div class="d-sec"><div class="sec-label">Your watches</div>
        ${store.watches.map((w) => `<div class="ask-ctx-chip" style="margin-top:6px">${I.eye}<span>“${w}”</span></div>`).join('')}
        <p style="font-size:13px;color:var(--t3);margin-top:10px">New evidence gets flagged as supports / challenges in your feed.</p></div>` : ''}
      <div class="d-sec"><div class="sec-label">Feeds & sources</div>
        <div class="mgmt-row" data-act="you-feeds" role="button"><span class="ic">${I.spark}</span><span class="meta"><span class="nm">Followed channels</span><div class="ds">${store.feeds.length} active</div></span>${I.chevR}</div>
        <div class="mgmt-row" data-act="manage-sheet" role="button"><span class="ic">${I.gear}</span><span class="meta"><span class="nm">Added sources</span><div class="ds">${store.sources.length} sources · ${store.muted.length} muted</div></span>${I.chevR}</div>
        <div class="mgmt-row" data-act="toast-msg" data-msg="Connected accounts are mocked in this demo" role="button"><span class="ic">${I.link}</span><span class="meta"><span class="nm">Connected accounts</span><div class="ds">${store.connected.x ? 'X · ' : ''}${store.connected.telegram ? 'Telegram' : store.connected.x ? '' : 'None yet'}</div></span>${I.chevR}</div>
      </div>
      <div class="d-sec"><div class="sec-label">Activity</div>
        <div class="mgmt-row" data-act="toast-msg" data-msg="Saved contexts live here" role="button"><span class="ic">${I.save}</span><span class="meta"><span class="nm">Saved</span><div class="ds">${store.saved.length} contexts</div></span>${I.chevR}</div>
        <div class="mgmt-row" data-act="toast-msg" data-msg="Tracks notify you when conditions change" role="button"><span class="ic">${I.bell}</span><span class="meta"><span class="nm">Tracks & automations</span><div class="ds">${store.tracks.length} running</div></span>${I.chevR}</div>
      </div>
      <div class="d-sec"><div class="sec-label">Custom source quota</div>
        <div class="quota"><div style="display:flex;justify-content:space-between;font-size:13.5px"><span style="color:var(--t2)">1 of 5 slots used</span><span style="color:var(--teal);font-weight:600">Pro</span></div><div class="quota-bar"><i></i></div></div>
      </div>
    </div>`;
}
