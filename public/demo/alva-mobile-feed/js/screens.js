/* ========== screens.js — 页面渲染 ========== */
import { ENTITIES, SOURCES, CREATORS, FEEDS, ITEMS, PROJECTIONS, AWAY, APPROVALS, REPORT, RECAP_ARTICLE, TASKS, ONBOARD_ENTITIES, WATCH_PRESETS, X_IMPORT, TG_CHATS, DISCOVER, FIGURES, RECS, BROKERS, HOLDINGS, SOURCE_CATALOG, entityChipLabel, evidenceCounts } from './data.js';
import { store, save, I, nav, toast, goalTitle } from './state.js';
import { streamCard, immersiveSlide, entityAv, monoAv, sparkSVG, accessBadge, becauseLine, cardBack, evidenceBar, watchFor, isHeld } from './cards.js';

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

/* ---- 轻量个性化：只排序现有 demo 数据，不构造推荐系统 ---- */
function itemIsAvailable(item, requireFollowedFeed = true) {
  if (requireFollowedFeed && item.access !== 'private' && !store.feeds.includes(item.feed)) return false;
  if (store.paused.includes(item.feed)) return false;
  if (item.access === 'private' && !store.connected.telegram) return false;
  if (store.muted.includes(item.evidence[0]?.source)) return false;
  return true;
}

function itemScore(item) {
  const entityMatches = item.entity_refs.filter((id) => store.entities.includes(id)).length;
  const sourceMatches = item.evidence.filter((ev) => store.sources.includes(ev.source)).length;
  return (item.feed === store.lastFollowedFeed ? 1000 : 0)
    + entityMatches * 100
    + sourceMatches * 40
    + (store.tracks.includes(item.id) ? 12 : 0)
    + (store.saved.includes(item.id) ? 4 : 0)
    + (store.watches.length && PROJECTIONS[item.id]?.watch ? 8 : 0);
}

function rankItems(items) {
  return items
    .map((item, index) => ({ item, index, score: itemScore(item) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ item }) => item);
}

const homeItems = () => rankItems(ITEMS.filter((item) => itemIsAvailable(item)));
const previewItems = () => rankItems(ITEMS.filter((item) => itemIsAvailable(item, false)));

function previewFeedIds(first) {
  const relevant = Object.values(FEEDS)
    .filter((feed) => feed.access !== 'private' && feed.entities.some((id) => store.entities.includes(id)))
    .map((feed) => feed.id);
  return [...new Set([first.feed, ...relevant, ...store.feeds])].slice(0, 3);
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
    automation: () => sFeed(a, page, 'settings'),
    goal: sGoal,
    recap: sRecapDeck,
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
const OB_STEPS = ['entities', 'portfolio', 'sources', 'preview'];
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
      <div class="ent-count-row">
        <span class="ent-count" id="entCount">${store.entities.length ? `${store.entities.length} selected` : 'Pick 3–8 to start'}</span>
        <button class="txt-act teal" data-act="ob-select-all">${ONBOARD_ENTITIES.every((o) => store.entities.includes(o.id)) ? 'Clear all' : 'Select all'}</button>
      </div>
      <div class="sec-label ob-watch-label">What are you trying to figure out? <i>optional</i></div>
      <div class="rel-row">${WATCH_PRESETS.map((w) => `<button class="chip ${store.watches.includes(w) ? 'on' : ''}" data-act="ob-watch" data-w="${w}">${w}</button>`).join('')}</div>
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="nav" data-to="#/onboard/portfolio" ${store.entities.length < 1 ? 'disabled style="opacity:.4"' : ''} id="entNext">Continue</button></div>`;
  } else if (step === 'portfolio') {
    const marketIds = Object.values(ENTITIES).filter((e) => e.kind === 'market').map((e) => e.id);
    const n = store.manualHoldings.length;
    page.innerHTML = `${obTop('portfolio', '#/onboard/sources')}
      <h1 class="ob-h1">What are you holding?</h1>
      <p class="ob-sub">Optional — your For You gets built around what you actually hold. Alva never trades without your explicit approval.</p>
      <button class="conn-row ${store.brokerage ? 'done' : ''}" data-act="connect-broker" style="margin-top:22px">
        <span class="ic" style="background:var(--teal-dim);color:var(--teal)">${I.link}</span>
        <span class="meta"><span class="nm">${store.brokerage ? `Connected · ${store.brokerage}` : 'Connect your brokerage'}</span><div class="ds">${store.brokerage ? `${HOLDINGS.length} positions synced · read-only` : 'Read-only · revocable anytime'}</div></span>
        <span class="st">${store.brokerage ? I.check : I.chevR}</span>
      </button>
      <div class="sec-label" style="margin:24px 0 0">Or add holdings manually</div>
      <div class="ent-grid">${marketIds.map((id) => {
        const e = ENTITIES[id];
        const on = store.manualHoldings.includes(id);
        return `<button class="ent-chip ${on ? 'on' : ''}" data-act="ob-hold" data-id="${id}">${entityAv(id, 34)}<span><span class="nm">${e.ticker}</span><div class="ht">${on ? 'Holding' : e.name}</div></span></button>`;
      }).join('')}</div>
      <p class="ent-count">${store.brokerage ? 'Synced from your broker' : n ? `${n} holding${n > 1 ? 's' : ''}` : 'You can skip this — nothing breaks'}</p>
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="nav" data-to="#/onboard/sources">Continue</button></div>`;
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
    const first = previewItems()[0] || ITEMS[0];
    const channels = previewFeedIds(first);
    page.innerHTML = `${obTop('preview')}
      <h1 class="ob-h1">Your feed is ready</h1>
      <p class="ob-sub">Built from ${store.entities.length || 3} follows${store.sources.length ? `, ${store.sources.length} sources you added` : ''}${store.watches.length ? ' and your watches' : ''}. Here’s a first look.</p>
      <div class="pv-card-mini">${streamCard(first)}</div>
      <div class="pv-group">
        <div class="sec-label">Also in your feeds</div>
        ${channels.map((f) => `<div class="pv-row">${monoAv(FEEDS[f].owner === 'Alva' ? 'AL' : FEEDS[f].owner.slice(0, 2).toUpperCase(), 174, 34)}<span class="nm">${FEEDS[f].name}</span><span class="k">${FEEDS[f].owner} · ${FEEDS[f].cadence}</span></div>`).join('')}
      </div>
      <div class="ob-cta-row"><button class="btn btn-teal-solid" data-act="ob-finish">Open For You</button></div>`;
  }
}

/* ========== home / for you ========== */
function sHome(page) {
  const mode = store.mode;
  const visible = homeItems();
  page.innerHTML = mode === 'stream'
    ? `<div class="topbar"><span class="lg-title">For You</span><span class="spacer"></span></div>${streamView(visible)}`
    : '';
  if (mode === 'immersive') {
    const wrap = document.createElement('div');
    wrap.className = 'imm-wrap';
    wrap.style.cssText = 'position:relative;flex:1;overflow:hidden';
    const recapSlide = `<section class="imm-slide imm-recap">
      <div class="imm-bg no-img" style="background:radial-gradient(140% 90% at 80% 0%, #17302d 0%, #0A0E0F 60%)"><div class="scrim"></div></div>
      <div class="imm-content">${recapModule()}</div></section>`;
    /* 推荐卡在 immersive 里是独立一屏（复用 recCard；关闭动作只在 stream 提供） */
    const recSlide = (r) => `<section class="imm-slide imm-rec">
      <div class="imm-bg no-img" style="background:radial-gradient(120% 80% at 20% 0%, #14302b 0%, #0A0E0F 60%)"><div class="scrim"></div></div>
      <div class="imm-content">${recCard(r)}</div></section>`;
    const recs = activeRecs();
    const totalSlides = visible.length + recs.length + 1;
    const slideArr = visible.map((it, i) => immersiveSlide(it, i + 1, totalSlides));
    recs.forEach((r, i) => slideArr.splice(Math.min(slideArr.length, 2 + i * 4), 0, recSlide(r)));
    wrap.innerHTML = `<div class="imm-top"><span>For You</span></div>
      <div class="imm-scroll">${recapSlide}${slideArr.join('')}</div>
      <div class="imm-dots">${Array.from({ length: totalSlides }, (_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div>`;
    page.appendChild(wrap);
    const scroll = wrap.querySelector('.imm-scroll');
    const curIdx = () => Math.round(scroll.scrollTop / scroll.clientHeight);
    scroll.addEventListener('scroll', () => {
      const idx = curIdx();
      wrap.querySelectorAll('.imm-dots i').forEach((d, i) => d.classList.toggle('on', i === idx));
    }, { passive: true });
    /* 桌面滚轮 / 触控板：整屏翻页，一次一张（触屏靠 scroll-snap-stop: always）。
     * 防惯性连击：翻页后锁定，事件流出现 >150ms 安静间隙（= 新手势）即解锁——
     * 鼠标滚轮每格间隔天然 >150ms，所以格格响应；触控板惯性尾巴间隔小，被吃掉。 */
    let locked = false, lastEvt = 0, target = null;
    scroll.addEventListener('wheel', (e) => {
      e.preventDefault();
      const now = performance.now();
      const fresh = now - lastEvt > 150;
      lastEvt = now;
      if (locked && !fresh) return;
      if (Math.abs(e.deltaY) < 10) return;
      /* 平滑滚动进行中时以在途目标为基准，连续翻页不读错位置 */
      const cur = locked && target !== null ? target : curIdx();
      const next = Math.max(0, Math.min(totalSlides - 1, cur + Math.sign(e.deltaY)));
      if (next === cur) { locked = false; return; }
      locked = true;
      target = next;
      scroll.scrollTo({ top: next * scroll.clientHeight, behavior: 'smooth' });
    }, { passive: false });
  }
}

/* 回访模块两态：Recap（无 goal，卡片流 TLDR）/ Report（有 goal，工作汇报 + 待批） */
function recapModule() {
  if (store.goal) {
    const pending = APPROVALS.filter((a) => !store.approvals[a.id]);
    return `
    <div class="recap reveal">
      <div class="rc-head">While you were away</div>
      <div class="rc-row" data-act="open-detail" data-item="${REPORT.delivered.item}" role="button"><span class="n">1</span><span class="tx">${REPORT.delivered.text}</span>${I.chevR}</div>
      ${APPROVALS.map((a, i) => `<div class="rc-row" data-act="nav" data-to="#/recap" role="button"><span class="n">${i + 2}</span><span class="tx">${a.title} — <b>${store.approvals[a.id] || 'needs you'}</b></span>${I.chevR}</div>`).join('')}
      <div class="rc-row dim"><span class="n">+</span><span class="tx">${REPORT.watching}</span></div>
      <button class="rc-cta" data-act="nav" data-to="#/recap">${pending.length ? `Review · ${pending.length} item${pending.length > 1 ? 's need' : ' needs'} you` : I.check + 'All caught up'}</button>
    </div>`;
  }
  return `
    <div class="recap reveal">
      <div class="rc-head">Since you were away</div>
      ${AWAY.updates.map((u, i) => `<div class="rc-row" data-act="open-detail" data-item="${u.item}" role="button"><span class="n">${i + 1}</span><span class="tx"><b>${u.entity}</b> — ${u.text}</span>${I.chevR}</div>`).join('')}
      ${AWAY.more ? `<div class="rc-row dim"><span class="n">+</span><span class="tx">${AWAY.more}</span></div>` : ''}
      <button class="rc-cta" data-act="nav" data-to="#/recap">${I.doc}Read · 2 min</button>
    </div>`;
}

/* ========== 推荐卡：新上线的 Automation（官方 / Creator）作为流内一等卡位 ==========
 * 不是 Context Card —— 推荐的是 Automation 本身，CTA = Subscribe，
 * 理由行与卡背 Why 同一套语言，预览行引用它最近一次 run 的输出。 */
function activeRecs() {
  return RECS.filter((r) => !store.feeds.includes(r.feed) && !store.dismissedRecs.includes(r.feed));
}

/* 推荐理由：优先动态命中（feed 覆盖的对象 ∩ 你关注/持有的），兜底用预设文案 */
function recWhy(r) {
  const f = FEEDS[r.feed];
  const held = f.entities.find((id) => isHeld(id));
  if (held) return `Because you hold <b>${entityChipLabel(held)}</b>`;
  const followed = f.entities.find((id) => store.entities.includes(id));
  if (followed) return `Because you follow <b>${entityChipLabel(followed)}</b>`;
  return r.why;
}

function recCard(r) {
  const f = FEEDS[r.feed];
  const cr = r.creator ? CREATORS[r.creator] : null;
  const av = cr ? `<img class="av-img" src="img/${cr.avatar}" width="40" height="40" alt="">` : monoAv('AL', 174, 40);
  return `<article class="card rec-card reveal" data-rec="${r.feed}">
    <div class="rec-tag"><span>${I.spark}New automation · ${f.owner}</span>
      <button class="rec-x" data-act="rec-dismiss" data-id="${r.feed}" aria-label="Dismiss">${I.x}</button></div>
    <div class="rec-head" data-act="open-feed" data-id="${r.feed}" role="button">
      ${av}
      <span class="meta"><span class="nm">${f.name}</span><div class="ds">${f.owner} · ${f.cadence} · ${f.runs} run${f.runs > 1 ? 's' : ''}</div></span>
      ${I.chevR}
    </div>
    <p class="rec-promise">${f.promise}</p>
    <div class="rec-preview" data-act="open-feed" data-id="${r.feed}" role="button">
      <span class="q">“${r.preview}”</span><span class="t">${r.previewAt}</span>
    </div>
    <div class="because">${recWhy(r)}</div>
    <div class="card-actions" style="margin-top:12px">
      <button class="btn btn-teal-solid" style="flex:1" data-act="rec-subscribe" data-id="${r.feed}">${I.plus}Subscribe</button>
    </div>
  </article>`;
}

function streamView(items) {
  const arr = items.map((it, i) => streamCard(it, i + 1));
  /* 推荐卡穿插在第 2、6 张后面，不抢开屏 */
  activeRecs().forEach((r, i) => arr.splice(Math.min(arr.length, 2 + i * 4), 0, recCard(r)));
  const cards = arr.length ? arr.join('')
    : `<div class="empty"><div class="glyph">${I.spark}</div><h4>Your feed is quiet</h4><p>Follow a feed in Discover to bring context back into For You.</p><button class="btn btn-teal-solid" data-act="nav" data-to="#/discover">Explore feeds</button></div>`;
  return `<div class="feed-scroll">${recapModule()}${cards}</div>`;
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
let discTab = 'market';
export function setDiscTab(t) { discTab = t; }

const marketRow = (m) => { const e = ENTITIES[m]; return `<div class="list-row" data-act="open-entity" data-id="${m}" role="button">
  ${entityAv(m, 40)}
  <span class="meta"><span class="nm">${e.ticker}</span><div class="ds">${e.name}</div></span>
  <span class="price"><div class="v">${e.price}</div><div class="c" style="color:var(--${e.dir})">${e.delta}</div></span>
</div>`; };

const feedRow = (f) => { const fd = FEEDS[f]; const on = store.feeds.includes(f); return `<div class="list-row">
  ${monoAv(fd.owner === 'Alva' ? 'AL' : fd.owner.slice(0, 2).toUpperCase(), fd.access === 'premium' ? 40 : 174, 40)}
  <span class="meta" data-act="open-feed" data-id="${f}" role="button"><span class="nm">${fd.name} ${fd.access !== 'public' ? accessBadge(fd.access) : ''}</span><div class="ds">${fd.isNew ? '<i class="new-flag">New</i>' : ''}${fd.owner} · ${fd.cadence}</div></span>
  <button class="follow-sm ${on ? 'on' : ''}" data-act="follow-feed" data-id="${f}">${on ? 'Subscribed' : 'Subscribe'}</button>
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

/* BYOS 入口：目录之外的源，用户自己带进来（§6.1 Custom available）。
   与 Chat 补课清单的 “Bring your own sources” 打开同一个 sheet（setup-sources）。 */
const byosRow = `<button class="byos-row" data-act="setup-sources">
  <span class="ic">${I.plus}</span>
  <span class="meta"><span class="nm">Add a custom source</span><div class="ds">X · Telegram · email newsletters · Substack · RSS</div></span>
  ${I.chevR}
</button>`;

/* 私有 feed 属于 You 页，公共目录只列 public/premium */
const publicFeedIds = () => Object.keys(FEEDS).filter((id) => FEEDS[id].access !== 'private');

/* Market tab 的 ticker 栏位：Trending / Following / Holdings 小 tab 切换 */
let mktTab = 'trending';
export function setMktTab(t) { mktTab = t; }

function mktTickerIds(t) {
  if (t === 'trending') return DISCOVER.movers;
  if (t === 'following') return store.entities.filter((id) => ENTITIES[id] && ENTITIES[id].kind === 'market');
  return store.brokerage ? HOLDINGS.map((h) => h.entity) : store.manualHoldings;
}
export function mktListHtml(t) {
  const ids = mktTickerIds(t);
  if (ids.length) return ids.map(marketRow).join('');
  return t === 'following'
    ? '<p class="ent-none" style="padding:10px 0">Nothing yet — follow a ticker and it shows up here.</p>'
    : `<p class="ent-none" style="padding:10px 0">No holdings yet — <button class="txt-lnk" data-act="connect-broker">connect your brokerage</button> to see them here.</p>`;
}

/* Figure 小卡：头像 + 最近发言引用，点击进详情 */
const figCard = (id) => { const e = ENTITIES[id]; const fg = FIGURES[id]; return `
  <button class="fig-card" data-act="open-entity" data-id="${id}">
    <div class="fh">${entityAv(id, 40)}<span class="meta"><span class="nm">${e.name}</span><div class="ds">${e.role}</div></span>${I.chevR}</div>
    <blockquote>“${fg.quote}”</blockquote>
    <div class="src">${fg.where} · ${fg.when}</div>
  </button>`; };

/* 三个 tab 对应三类对象：Market（Entity：ticker/theme/figure）、Feed（官方 + 创作者的 marketplace）、Source */
function discBodyHtml(tab) {
  const byKind = (k) => Object.values(ENTITIES).filter((e) => e.kind === k).map((e) => e.id);
  const official = publicFeedIds().filter((id) => FEEDS[id].owner === 'Alva');
  const fromCreators = publicFeedIds().filter((id) => FEEDS[id].owner !== 'Alva');
  return {
    market: `
      <div class="sec-label">Themes</div>${themeTiles()}
      <div class="d-sec">
        <div class="mkt-head"><span class="sec-label" style="margin:0">Tickers</span>
          <div class="mini-tabs" id="mktTabs">${[['trending', 'Trending'], ['following', 'Following'], ['holdings', 'Holdings']].map(([t, lbl]) =>
            `<button class="${mktTab === t ? 'on' : ''}" data-act="mkt-tab" data-t="${t}">${lbl}</button>`).join('')}</div>
        </div>
        <div id="mktList">${mktListHtml(mktTab)}</div>
      </div>
      <div class="d-sec"><div class="sec-label">Figures</div>${byKind('figure').map(figCard).join('')}</div>`,
    feed: `
      <div class="sec-label">By Alva — official coverage</div>${official.map(feedRow).join('')}
      <div class="d-sec"><div class="sec-label">From creators</div>${fromCreators.map(feedRow).join('')}</div>`,
    sources: byosRow + catalogGroups(),
  }[tab];
}

/* 统一搜索：结果按对象类型分组（§11.2），Follow / Add 操作与列表一致 */
function discResultsHtml(q) {
  const ql = q.toLowerCase();
  const has = (s) => (s || '').toLowerCase().includes(ql);
  const markets = Object.values(ENTITIES).filter((e) => e.kind === 'market' && (has(e.ticker) || has(e.name))).map((e) => e.id);
  const others = Object.values(ENTITIES).filter((e) => e.kind !== 'market' && (has(e.name) || has(e.role))).map((e) => e.id);
  const feeds = publicFeedIds().filter((id) => has(FEEDS[id].name) || has(FEEDS[id].owner));
  const creators = Object.keys(CREATORS).filter((id) => has(CREATORS[id].name) || CREATORS[id].expertise.some(has));
  const sources = Object.values(SOURCES).filter((s) => s.access !== 'private' && (has(s.name) || has(s.platform))).map((s) => s.id);
  const secs = [];
  if (markets.length) secs.push(`<div class="d-sec"><div class="sec-label">Tickers</div>${markets.map(marketRow).join('')}</div>`);
  if (others.length) secs.push(`<div class="d-sec"><div class="sec-label">Themes & figures</div>${others.map(entityRow).join('')}</div>`);
  if (feeds.length) secs.push(`<div class="d-sec"><div class="sec-label">Feeds</div>${feeds.map(feedRow).join('')}</div>`);
  if (creators.length) secs.push(`<div class="d-sec"><div class="sec-label">Creators</div>${creators.map(creatorRow).join('')}</div>`);
  if (sources.length) secs.push(`<div class="d-sec"><div class="sec-label">Sources</div>${sources.map(catalogRow).join('')}</div>`);
  return secs.length ? secs.join('')
    : `<div class="empty"><h4>No matches</h4><p>Try a ticker, a feed, a creator — or add it yourself.</p></div>${byosRow}`;
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
  const TABS = [['market', 'Market'], ['feed', 'Feed'], ['sources', 'Sources']];
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">Discover</span><span class="spacer"></span></div>
    <div class="ent-search disc-search">${I.search}
      <input id="discSearch" placeholder="Search tickers, themes, feeds, sources…" oninput="window.__discSearch(this.value)"
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
/* Figure 详情的拟真段落：最新发言 + 影响面 + 近期动向（数据见 data.js FIGURES） */
function figureSecs(id) {
  const fg = FIGURES[id];
  return `
    <div class="d-sec">
      <blockquote class="fig-quote">“${fg.quote}”<span class="src">${fg.where} · ${fg.when}</span></blockquote>
    </div>
    <div class="stat-strip">
      ${fg.stats.map(([n, k]) => `<div class="cell"><div class="n">${n}</div><div class="k">${k}</div></div>`).join('')}
    </div>
    <div class="d-sec"><div class="sec-label">Recent moves</div>
      <div class="auto-rows" style="border-top:none">
        ${fg.moves.map((m) => `<div class="auto-row"><span class="k" style="flex:none;width:52px">${m.at}</span><span class="v" style="font-weight:400;white-space:normal">${m.text}</span><span class="dec-tag">${m.impact}</span></div>`).join('')}
      </div>
    </div>`;
}

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
      ${e.kind === 'figure' && FIGURES[id] ? figureSecs(id) : ''}
      ${related.length ? `<div class="d-sec"><div class="sec-label">Today’s context</div>${related.map((it, i) => streamCard(it, i)).join('')}</div>` : ''}
      <div class="d-sec"><div class="sec-label">Feeds covering ${e.kind === 'market' ? e.ticker : e.name}</div>
        ${feeds.map((f) => { const fon = store.feeds.includes(f.id); return `<div class="list-row">
          ${monoAv('AL', 174, 40)}
          <span class="meta" data-act="open-feed" data-id="${f.id}" role="button"><span class="nm">${f.name}</span><div class="ds">${f.owner} · ${f.cadence}</div></span>
          <button class="follow-sm ${fon ? 'on' : ''}" data-act="follow-feed" data-id="${f.id}">${fon ? 'Subscribed' : 'Subscribe'}</button>
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

/* ========== feed detail（= Automation：默认看 Output，横切 Settings 管理） ========== */
let feedTab = 'output';
export function setFeedTab(t) { feedTab = t; }

function feedOutputHtml(f, items) {
  return `
    <div class="d-sec"><p style="font-size:15px;color:var(--t2)">${f.promise}</p></div>
    <div class="stat-strip">
      <div class="cell"><div class="n">${f.sources.length}</div><div class="k">Sources</div></div>
      <div class="cell"><div class="n">${f.runs}</div><div class="k">Runs</div></div>
      <div class="cell"><div class="n">${f.cadence.split(' ')[0]}</div><div class="k">Cadence</div></div>
    </div>
    ${items.length ? `<div class="d-sec"><div class="sec-label">Recent</div>${items.map((it, i) => streamCard(it, i)).join('')}</div>` : `<div class="empty"><div class="glyph">${I.spark}</div><h4>Next update ${f.cadence.toLowerCase()}</h4><p>Subscribe to get it in your For You.</p></div>`}`;
}

/* Settings：对齐真实产品 AlertAutomationRow —— hairline 行 + 安静的文字动作 */
function feedSettingsHtml(f) {
  const id = f.id;
  const paused = store.paused.includes(id);
  const subscribed = store.feeds.includes(id);
  const trackedItems = ITEMS.filter((item) => item.feed === id && store.tracks.includes(item.id));
  const srcAvs = f.sources.slice(0, 4).map((sid) => {
    const s = SOURCES[sid];
    return s.avatar ? `<img src="img/${s.avatar}" alt="">` : `<span>${s.name.replace(/^[@r]\/?/, '').slice(0, 1).toUpperCase()}</span>`;
  }).join('');
  const delivers = store.connected.telegram ? 'For You · Telegram' : 'For You';
  return `
    <div class="auto-rows" style="margin-top:6px">
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
      <div class="auto-row"><span class="k">Delivers to</span><span class="v">${delivers}</span></div>
      <div class="auto-row"><span class="k">Next run</span><span class="v">${paused ? 'Paused' : f.next_run}</span></div>
    </div>
    ${trackedItems.length ? `<div class="d-sec auto-tracks"><div class="sec-label">Tracked context</div>
      ${trackedItems.map((item) => `<div class="list-row" data-act="open-detail" data-item="${item.id}" role="button">
        ${item.entity_refs[0] ? entityAv(item.entity_refs[0], 38) : monoAv('AL', 174, 38)}
        <span class="meta"><span class="nm">${item.headline}</span><div class="ds">Updates follow this automation</div></span>${I.chevR}
      </div>`).join('')}</div>` : ''}
    ${subscribed
      ? `<button class="txt-act danger auto-unsub" data-act="auto-unsub" data-id="${id}">Unsubscribe</button>`
      : `<button class="txt-act teal auto-unsub" data-act="follow-feed" data-id="${id}">Subscribe</button>`}`;
}

function sFeed(id, page, initTab) {
  const f = FEEDS[id];
  if (!f) { page.innerHTML = backBar() + '<div class="empty"><h4>Not found</h4></div>'; return; }
  if (initTab) feedTab = initTab;
  const items = ITEMS.filter((it) => it.feed === id);
  const on = store.feeds.includes(id);
  const paused = store.paused.includes(id);
  page.innerHTML = `${backBar()}
    <div class="hero-head">
      <div class="row1">
        ${monoAv(f.owner === 'Alva' ? 'AL' : f.owner.slice(0, 2).toUpperCase(), f.access === 'premium' ? 40 : f.access === 'private' ? 260 : 174, 52)}
        <div><h1 style="font-size:23px">${f.name}</h1><div class="sub"><span class="st-dot ${paused ? 'off' : ''}" style="margin-right:2px"></span>${f.owner} · Last run ${f.last_run} · ${f.cadence}</div></div>
      </div>
      <div class="actions">
        <button class="btn ${on ? 'btn-ghost' : 'btn-teal-solid'}" style="flex:1" data-act="follow-feed" data-id="${id}">${on ? I.check + 'Subscribed' : I.plus + 'Subscribe'}</button>
      </div>
    </div>
    <div class="ask-tabs feed-tabs">${[['output', 'Output'], ['settings', 'Settings']].map(([t, lbl]) =>
      `<button class="${feedTab === t ? 'on' : ''}" data-act="feed-tab" data-t="${t}">${lbl}</button>`).join('')}</div>
    <div class="page-secs">${feedTab === 'settings' ? feedSettingsHtml(f) : feedOutputHtml(f, items)}</div>`;
}

/* ========== recap 滑卡页：Tinder 式逐张处理回访事项 ========== */
function deckItems() {
  /* 有 goal 才有 deck：审批集中处理地（内容 TLDR 走文章页） */
  const cards = APPROVALS.filter((a) => !store.approvals[a.id]).map((a) => ({ kind: 'approval', ap: a }));
  const d = ITEMS.find((it) => it.id === REPORT.delivered.item);
  if (d) cards.push({ kind: 'context', item: d });
  return cards;
}

function deckCard(c, i) {
  if (c.kind === 'approval') {
    const ap = c.ap;
    return `<article class="deck-card" data-i="${i}">
      <span class="dk-ovl dk-yes">Approve</span><span class="dk-ovl dk-no">Reject</span>
      <div class="dk-tag">${I.bolt}<span>Proposal · your goal</span></div>
      <div class="dk-ent">${entityAv(ap.entity, 28)}<b>${ap.entity}</b></div>
      <h3>${ap.title}</h3>
      <p>${ap.rationale}</p>
      <div class="dk-meta">${ap.impact}</div>
    </article>`;
  }
  const it = c.item;
  const hasImg = it.media && it.media.hero;
  return `<article class="deck-card" data-i="${i}">
    <span class="dk-ovl dk-yes">Track</span><span class="dk-ovl dk-no">Skip</span>
    ${hasImg ? `<div class="dk-img"><img src="${it.media.hero}" alt=""></div>` : ''}
    <div class="dk-ent">${it.entity_refs[0] ? entityAv(it.entity_refs[0], 28) : monoAv('AL', 174, 28)}<b>${it.entity_refs[0] ? entityChipLabel(it.entity_refs[0]) : FEEDS[it.feed].name}</b><span class="t">${it.published}</span></div>
    <h3>${it.headline}</h3>
    <p>${it.summary}</p>
    ${it.what_changed ? `<div class="dk-meta">${it.what_changed}</div>` : ''}
  </article>`;
}

function deckDecide(ap, choice) {
  store.approvals[ap.id] = choice;
  store.decisions.push({ title: ap.title, choice, at: 'Today' });
  save();
}

/* 无 goal：TLDR daily recap 文章，正文内嵌可跳转的 Context Card 引用 */
function sRecapArticle(page) {
  const a = RECAP_ARTICLE;
  const ref = (id) => {
    const it = ITEMS.find((x) => x.id === id);
    if (!it) return '';
    return `<button class="ra-ref" data-act="open-detail" data-item="${it.id}">
      ${it.entity_refs[0] ? entityAv(it.entity_refs[0], 30) : monoAv('AL', 174, 30)}
      <span class="meta"><b>${it.headline}</b><i>${FEEDS[it.feed].name} · ${it.published}</i></span>${I.chevR}
    </button>`;
  };
  page.innerHTML = `${backBar('Since you were away')}
    <article class="recap-article">
      <div class="ra-meta">Wednesday, August 19 · ${a.meta}</div>
      <h1>${a.title}</h1>
      <p class="ra-lead">${a.lead}</p>
      ${a.sections.map((sec) => `<p>${sec.text}</p>${ref(sec.item)}`).join('')}
      <p>${a.closing}</p>
    </article>`;
}

function sRecapDeck(page) {
  if (!store.goal) return sRecapArticle(page);
  const cards = deckItems();
  page.innerHTML = `${backBar(store.goal ? 'While you were away' : 'Since you were away')}
    <div class="deck-wrap">
      <div class="deck" id="deck">
        ${cards.map((c, i) => deckCard(c, i)).join('')}
        <div class="deck-done"><div class="glyph">${I.check}</div><h4>All caught up</h4><p>Everything from this recap is handled.</p>
          <button class="btn btn-teal-solid" data-act="nav" data-to="#/home">Back to For You</button></div>
      </div>
      <div class="deck-controls" id="deckControls">
        <button class="dk-btn no" data-deck="left" aria-label="Skip">${I.x}</button>
        <button class="dk-btn later" data-deck="later" aria-label="Decide later">${I.clock}</button>
        <span class="dk-count" id="deckCount"></span>
        <button class="dk-btn yes" data-deck="right" aria-label="Act">${I.check}</button>
      </div>
      <p class="deck-hint">Right to act · left to skip · clock to revisit</p>
    </div>`;
  attachDeck(page, cards);
}

function attachDeck(page, cards) {
  let top = 0;
  const deckEl = page.querySelector('#deck');
  const els = [...deckEl.querySelectorAll('.deck-card')];
  const count = page.querySelector('#deckCount');
  const controls = page.querySelector('#deckControls');
  const hint = page.querySelector('.deck-hint');

  const update = () => {
    els.forEach((el, i) => {
      if (i < top) return;
      const d = i - top;
      el.style.zIndex = 100 - d;
      el.style.transform = `translateY(${Math.min(d, 2) * 12}px) scale(${1 - Math.min(d, 2) * 0.04})`;
      el.style.opacity = d > 2 ? '0' : '1';
    });
    const done = top >= cards.length;
    count.textContent = done ? '' : `${cards.length - top} left`;
    controls.style.display = done ? 'none' : '';
    hint.style.display = done ? 'none' : '';
    page.querySelector('.deck-done').classList.toggle('show', done);
  };

  const act = (dir) => {
    if (top >= cards.length) return;
    const c = cards[top];
    const el = els[top];
    if (dir === 'later') {
      /* 再想想：滑向下方后回到队尾 */
      el.style.transition = 'transform 0.3s ease, opacity 0.25s ease';
      el.style.transform = 'translateY(60px) scale(0.92)';
      el.style.opacity = '0';
      cards.push(c);
      els.push(el);
      top += 1;
      setTimeout(() => { el.style.transition = 'none'; update(); }, 320);
      setTimeout(update, 80);
      return;
    }
    el.style.transition = 'transform 0.35s ease, opacity 0.3s ease';
    el.style.transform = `translateX(${dir === 'right' ? 480 : -480}px) rotate(${dir === 'right' ? 16 : -16}deg)`;
    el.style.opacity = '0';
    if (c.kind === 'approval') {
      deckDecide(c.ap, dir === 'right' ? 'approved' : 'rejected');
      toast(dir === 'right' ? 'Approved — executing on paper' : 'Rejected — Alva will recalibrate', dir === 'right' ? I.check : I.x);
    } else if (dir === 'right') {
      if (!store.tracks.includes(c.item.id)) { store.tracks.push(c.item.id); save(); }
      toast('Tracking — Alva will flag meaningful change', I.bell);
    }
    top += 1;
    setTimeout(update, 60);
  };

  page.querySelectorAll('[data-deck]').forEach((b) => b.addEventListener('click', () => act(b.dataset.deck)));

  let sx = 0, dragging = false, cur = null;
  deckEl.addEventListener('pointerdown', (e) => {
    if (top >= cards.length) return;
    cur = els[top];
    dragging = true;
    sx = e.clientX;
    cur.style.transition = 'none';
  });
  deckEl.addEventListener('pointermove', (e) => {
    if (!dragging || !cur) return;
    const dx = e.clientX - sx;
    cur.style.transform = `translateX(${dx}px) rotate(${dx * 0.05}deg)`;
    const yes = cur.querySelector('.dk-yes'), no = cur.querySelector('.dk-no');
    if (yes) yes.style.opacity = Math.max(0, Math.min(1, dx / 80));
    if (no) no.style.opacity = Math.max(0, Math.min(1, -dx / 80));
  });
  const end = (e) => {
    if (!dragging || !cur) return;
    dragging = false;
    const dx = e.clientX - sx;
    if (dx > 90) act('right');
    else if (dx < -90) act('left');
    else {
      cur.style.transition = 'transform 0.25s ease';
      cur.style.transform = '';
      cur.querySelectorAll('.dk-ovl').forEach((o) => { o.style.opacity = 0; });
      setTimeout(update, 260);
    }
    cur = null;
  };
  deckEl.addEventListener('pointerup', end);
  deckEl.addEventListener('pointercancel', end);
  update();
}

/* ========== goal 管理页（goal = 无执行权的 Automation：instruction + run history） ========== */
function sGoal(page) {
  if (!store.goal) {
    page.innerHTML = `${backBar('Goal')}<div class="empty"><div class="glyph">${I.bolt}</div><h4>No trading goal yet</h4><p>Set one and Alva works it in the background — every action needs your approval.</p><button class="btn btn-teal-solid" data-act="goal-sheet">Set a goal</button></div>`;
    return;
  }
  const pending = APPROVALS.filter((a) => !store.approvals[a.id]).length;
  page.innerHTML = `${backBar('Goal')}
    <div class="page-secs">
      <div class="auto-head">
        <div class="auto-title"><span class="st-dot"></span><h1>Trading goal</h1></div>
        <div class="auto-meta">You · Agentic loop · no execution authority</div>
        <p class="auto-promise">Alva researches and monitors around this goal. Every proposed action comes to you for approval — nothing executes on its own.</p>
      </div>
      <div class="auto-rows">
        <div class="auto-row"><span class="k">Sources</span><span class="v">Your portfolio · market data</span></div>
        <div class="auto-row"><span class="k">Delivers to</span><span class="v">For You · Approvals</span></div>
        <div class="auto-row"><span class="k">Status</span><span class="v">${pending ? `${pending} proposal needs you` : 'On track'}</span></div>
      </div>
      <div class="sec-label" style="margin:24px 0 10px">Instruction</div>
      <pre class="goal-md" data-act="goal-sheet" role="button">${store.goal}</pre>
      <p class="ent-none" style="margin-top:8px">Tap to edit. First line is the goal, the rest are limits.</p>
      <div class="sec-label" style="margin:26px 0 2px">Run history</div>
      <div class="auto-rows" style="border-top:none">
        ${[...store.decisions].reverse().map((d) => `<div class="auto-row"><span class="k">${d.at}</span><span class="v" style="font-weight:400">${d.title}</span><span class="dec-tag ${d.choice}">${d.choice}</span></div>`).join('') || '<p class="ent-none">No runs yet.</p>'}
      </div>
      <button class="txt-act danger auto-unsub" data-act="goal-revoke">Revoke goal</button>
    </div>`;
}

/* automation 管理页已并入 feed 详情（Settings tab）：#/automation/:id → sFeed(id, 'settings') */

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
/* Ask 顶部补课清单：onboarding 跳过的三件事，可关闭常驻 */
function askSetup() {
  if (store.askSetupDismissed) return '';
  const items = [
    { done: !!store.brokerage || store.manualHoldings.length > 0, label: 'Connect your portfolio', act: 'connect-broker', btn: 'Connect' },
    { done: store.sources.length > 0 || Object.values(store.connected).some(Boolean), label: 'Bring your own sources', act: 'setup-sources', btn: 'Add' },
    { done: !!store.goal, label: 'Set a trading goal', act: 'goal-sheet', btn: 'Set' },
  ];
  const doneN = items.filter((i) => i.done).length;
  return `<div class="setup-card">
    <div class="su-head"><span class="lbl">Finish setting up</span><span class="n">${doneN}/3</span><button class="su-x" data-act="setup-dismiss" aria-label="Dismiss">${I.x}</button></div>
    ${items.map((it) => `<div class="su-row ${it.done ? 'done' : ''}">
      <span class="su-ic">${it.done ? I.check : ''}</span>
      <span class="su-lb">${it.label}${it.act === 'goal-sheet' && store.goal ? ` — <i>“${goalTitle()}”</i>` : ''}</span>
      ${it.done ? '' : `<button class="su-btn" data-act="${it.act}">${it.btn}</button>`}
    </div>`).join('')}
  </div>`;
}

/* Ask 三 tab：Chat（对话）/ Tasks（goal + tracks）/ Memory（user.md 可视化 + 决策留痕） */
let askTab = 'chat';
export function setAskTab(t) { askTab = t; }

/* 统一的 Automation 列表：goal / followed feed / watch 只是 source 不同。
 * Chat 的 Tasks tab 与 You 页共用同一数据与同一视图。 */
export function automationRows() {
  const pending = APPROVALS.filter((a) => !store.approvals[a.id]).length;
  const goalRow = store.goal
    ? `<div class="list-row" data-act="nav" data-to="#/goal" role="button">
        <span class="ic-cir">${I.bolt}</span>
        <span class="meta"><span class="nm">${goalTitle()}</span><div class="ds">Your portfolio + market data · agentic loop</div></span>
        <span class="next-run ${pending ? 'attn' : ''}">${pending ? `${pending} needs you` : 'Live'}</span>${I.chevR}</div>`
    : `<div class="list-row" data-act="goal-sheet" role="button">
        <span class="ic-cir dim">${I.bolt}</span>
        <span class="meta"><span class="nm">Set a trading goal</span><div class="ds">Runs on your portfolio — Alva proposes, you approve</div></span>${I.chevR}</div>`;
  const feedRows = store.feeds.map((id) => FEEDS[id]).filter(Boolean).map((f) => {
    const paused = store.paused.includes(f.id);
    return `
    <div class="list-row" data-act="nav" data-to="#/automation/${f.id}" role="button">
      ${monoAv(f.owner === 'Alva' ? 'AL' : f.owner.slice(0, 2).toUpperCase(), 174, 40)}
      <span class="meta"><span class="nm">${f.name}</span><div class="ds">${f.sources.length} source${f.sources.length > 1 ? 's' : ''} · ${f.cadence}</div></span>
      <span class="next-run ${paused ? 'paused' : ''}">${paused ? 'Paused' : f.next_run}</span>${I.chevR}</div>`;
  }).join('');
  /* watch 型 automation：source = 某个对象的 coverage */
  const trackByObj = {};
  store.tracks.map((id) => ITEMS.find((it) => it.id === id)).filter(Boolean).forEach((it) => {
    const key = it.entity_refs[0] || `feed:${it.feed}`;
    (trackByObj[key] = trackByObj[key] || []).push(it);
  });
  const watchRows = Object.entries(trackByObj).map(([key, items]) => {
    const isFeed = key.startsWith('feed:');
    const label = isFeed ? FEEDS[key.slice(5)].name : entityChipLabel(key);
    const av = isFeed ? monoAv('AL', 174, 40) : entityAv(key, 40);
    return `<div class="list-row" data-act="${isFeed ? 'open-detail' : 'open-entity'}" data-${isFeed ? `item="${items[0].id}"` : `id="${key}"`} role="button">
      ${av}
      <span class="meta"><span class="nm">${label} watch</span><div class="ds">${label} coverage · agentic loop${items.length > 1 ? ` · ${items.length} watches` : ''}</div></span>
      <span class="next-run">Live</span>${I.chevR}</div>`;
  }).join('');
  return goalRow + feedRows + watchRows;
}
export const automationCount = () => store.feeds.length + store.tracks.length + (store.goal ? 1 : 0);

function askTasksView() {
  const taskRows = TASKS.map((t) => `
    <div class="list-row" data-act="toast-msg" data-msg="Sub-task sessions are mocked in this demo" role="button">
      <span class="ic-cir ${t.status === 'done' ? 'dim' : ''}">${t.status === 'done' ? I.check : I.spark}</span>
      <span class="meta"><span class="nm">${t.title}</span><div class="ds">${t.from}</div></span>
      <span class="task-tag ${t.status}">${t.status === 'done' ? 'Done' : 'Running'}</span>${I.chevR}</div>`).join('');
  return `
    <div class="d-sec"><div class="sec-label">Tasks — spun off from chat</div>${taskRows}</div>
    <div class="d-sec"><div class="sec-label">Automations — recurring</div>${automationRows()}</div>`;
}

function askMemoryView() {
  const holdings = store.brokerage ? HOLDINGS.map((h) => h.entity) : store.manualHoldings;
  return `
    <p class="mem-cap">What Alva remembers about you — synced to user.md in your agent memory.</p>
    <div class="d-sec"><div class="sec-label">Identity</div>
      <div class="mem-row"><span class="k">Role</span><span class="v">Independent trader</span></div>
      <div class="mem-row"><span class="k">Markets</span><span class="v">US equities · Crypto</span></div>
      <div class="mem-row"><span class="k">Holdings</span><span class="v">${holdings.length ? holdings.join(' · ') : 'Not shared yet'}</span></div>
    </div>
    <div class="d-sec"><div class="sec-label">Recent interests</div>
      <div class="mem-row"><span class="v">${store.entities.slice(-4).reverse().map(entityChipLabel).join(' · ') || 'Nothing yet'}</span></div>
      <div class="mem-row"><span class="v" style="color:var(--t3)">Opened HBM context 3× this week · asked about NVDA add levels</span></div>
    </div>
    <div class="d-sec"><div class="sec-label">Watching</div>
      ${store.watches.length ? store.watches.map((w) => `<div class="mem-row"><span class="v">“${w}”</span></div>`).join('') : '<p class="ent-none">No watches yet.</p>'}
    </div>
    <div class="d-sec"><div class="sec-label">Thesis</div>
      <div class="mem-row"><span class="v">“AI capex is a multi-year supercycle; memory is the tightest link in the chain.”</span><span class="t">Aug 15</span></div>
      <div class="mem-row"><span class="v">“BTC treasury demand is structural, not cyclical.”</span><span class="t">Jul 30</span></div>
    </div>
    <div class="d-sec"><div class="sec-label">Goal</div>
      ${store.goal ? `<div class="mem-row" data-act="nav" data-to="#/goal" role="button"><span class="v">“${goalTitle()}”</span>${I.chevR}</div>` : '<p class="ent-none">No goal set.</p>'}
    </div>
    <div class="d-sec"><div class="sec-label">Decisions · 72% calibrated</div>
      ${[...store.decisions].reverse().map((d) => `<div class="mem-row"><span class="t">${d.at}</span><span class="v">${d.title} — <i class="dc ${d.choice}">${d.choice}</i></span></div>`).join('')}
    </div>`;
}

/* Chat 开场 = 回访 recap 的对话化渲染（与首页模块同一份数据） */
function chatOpening() {
  if (store.goal) {
    const pending = APPROVALS.filter((a) => !store.approvals[a.id]);
    return `Morning. While you were away I worked your goal — <b>“${goalTitle()}”</b>:<br><br>1 · ${REPORT.delivered.text}.<br>2 · ${pending.length ? `<b>${pending[0].title}</b> — waiting for your approval on For You.` : 'Your last proposal is settled — executing on paper.'}<br><br>${REPORT.watching}. Anything you want me to dig into?`;
  }
  return `Morning. Since you were away, ${AWAY.updates.length} things stand out:<br><br>${AWAY.updates.map((u, i) => `${i + 1} · <b>${u.entity}</b> — ${u.text}.`).join('<br>')}<br><br>Anything you want me to dig into?`;
}

function sAsk(page) {
  const item = askCtx ? ITEMS.find((it) => it.id === askCtx) : null;
  if (pendingAsk) askTab = 'chat';
  const tabs = `<div class="ask-tabs">${[['chat', 'Chat'], ['tasks', 'Tasks'], ['memory', 'Memory']].map(([t, lbl]) =>
    `<button class="${askTab === t ? 'on' : ''}" data-act="ask-tab" data-t="${t}">${lbl}</button>`).join('')}</div>`;
  if (askTab !== 'chat') {
    page.innerHTML = `
      <div class="topbar"><span class="lg-title">Chat</span><span class="spacer"></span></div>
      ${tabs}
      <div class="ask-body" style="padding-top:6px">${askTab === 'tasks' ? askTasksView() : askMemoryView()}</div>`;
    return;
  }
  page.innerHTML = `
    <div class="topbar"><span class="lg-title">Chat</span><span class="spacer"></span></div>
    ${tabs}
    <div class="ask-body">
      ${askSetup()}
      ${item ? `<div class="ask-ctx-chip" style="margin-bottom:14px">${I.spark}<span>${item.headline}</span><button class="x" data-act="clear-ctx">${I.x}</button></div>` : ''}
      <div class="ask-reply ask-thread" id="askReply">
        <div class="chat-day">Today</div>
        <div class="bub">${chatOpening()}</div>
      </div>
      <div class="ask-composer">
        <input id="askInput" placeholder="Ask about your feed or a ticker…">
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
      <div class="d-sec"><div class="sec-label">Manage</div>
        <div class="mgmt-row" data-act="you-automations" role="button"><span class="ic">${I.bolt}</span><span class="meta"><span class="nm">Automations</span><div class="ds">${automationCount()} running — different sources, same loop</div></span>${I.chevR}</div>
        <div class="mgmt-row" data-act="following-sheet" role="button"><span class="ic">${I.eye}</span><span class="meta"><span class="nm">Following</span><div class="ds">${store.entities.length} markets & themes</div></span>${I.chevR}</div>
        <div class="mgmt-row" data-act="manage-sheet" role="button"><span class="ic">${I.gear}</span><span class="meta"><span class="nm">Sources</span><div class="ds">${store.sources.length} added · ${store.muted.length} muted</div></span>${I.chevR}</div>
        <div class="mgmt-row" data-act="toast-msg" data-msg="Connected accounts are mocked in this demo" role="button"><span class="ic">${I.link}</span><span class="meta"><span class="nm">Connected accounts</span><div class="ds">${store.connected.x ? 'X · ' : ''}${store.connected.telegram ? 'Telegram' : store.connected.x ? '' : 'None yet'}</div></span>${I.chevR}</div>
      </div>
      <div class="d-sec"><div class="sec-label">Activity</div>
        <div class="mgmt-row" data-act="saved-sheet" role="button"><span class="ic">${I.save}</span><span class="meta"><span class="nm">Saved</span><div class="ds">${store.saved.length} contexts</div></span>${I.chevR}</div>
      </div>
      <div class="d-sec"><div class="sec-label">Custom source quota</div>
        <div class="quota"><div style="display:flex;justify-content:space-between;font-size:13.5px"><span style="color:var(--t2)">1 of 5 slots used</span><span style="color:var(--teal);font-weight:600">Pro</span></div><div class="quota-bar"><i></i></div></div>
      </div>
    </div>`;
}
