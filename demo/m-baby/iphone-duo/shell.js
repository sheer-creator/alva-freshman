/* ═══════════════════════════════════════════════════════════
   Alva · iPhone Duo — gallery shell

   Left: the pages of the Duo table (Figma 17123:135811), one row each.
   Choosing a row takes the running app to that page; it never reloads it,
   so the screen state and everything else carries over.
   Stage: the device. Hardware and system areas only — the app runs in the
   iframe (the app window of the current state) and lays itself out from
   html[data-duo]. Toolbar: Figma link · theme · screen state · Restart.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const FIGMA = id => `https://www.figma.com/design/EHag6olZJxmlkf1hbAzSi7/Thesis-MVP?node-id=${id.replace(':', '-')}`;

  const PAGES = [
    { slug: 'for-you', row: '01', title: 'For You', subtitle: 'The feed. On the inner screen and the book the first thesis opens beside the list; elsewhere it is one column.', meta: 'List 382 | Detail 485', node: '15750:267511', go: { tab: 'foryou' } },
    { slug: 'thesis', row: '02', title: 'Thesis detail', subtitle: 'Return chart, latest update, timeline and Signals, with Ask Alva and Save / Share at the bottom.', meta: 'Gavin Baker', node: '15750:268014', go: { tab: 'foryou', open: 'gavin' } },
    { slug: 'all-updates', row: '03', title: 'All updates', subtitle: 'From a thesis: the version return chart and every update. Takes the detail’s place; the list stays beside it inside.', meta: 'Version history', node: '15750:269633', go: { tab: 'foryou', open: 'gavin', updates: 'gavin' } },
    { slug: 'ask-alva', row: '04', title: 'Ask Alva', subtitle: 'From a thesis. Its own page on the outer screen, a 382 sheet over the page on outer landscape and inner portrait, beside the thesis on the inner screen.', meta: 'Quotes the thesis', node: '15750:271140', go: { tab: 'foryou', open: 'gavin', ask: 'gavin' } },
    { slug: 'alva', row: '04', title: 'Alva tab', subtitle: 'The rail’s Alva tab opens Alva as a root page; one 600 column on the inner screen.', meta: 'Root page', node: '17130:168815', go: { tab: 'alva' } },
    { slug: 'leaderboard', row: '05', title: 'Leaderboard', subtitle: 'Rank by period, then open each thesis. Ranking rules is a popover inside, a sheet outside.', meta: '7D default', node: '17091:145062', go: { tab: 'foryou', feedTab: 'leaderboard' } },
    { slug: 'search', row: '06', title: 'Search', subtitle: 'Recent, trending tickers and people to follow. Columns follow the width.', meta: 'Default', node: '17092:146149', go: { tab: 'search' } },
    { slug: 'search-results', row: '06', title: 'Search results → Profile', subtitle: 'Type a name, open the person. Results 382 | Profile 485 on the inner screen.', meta: '“Maya”', node: '17093:147646', go: { tab: 'search', q: 'Maya', profile: 'maya' } },
    { slug: 'me', row: '07', title: 'Me', subtitle: 'Owner profile: Know you better, Portfolio, Thesis / Saved / Watchlist / Playbooks.', meta: '600 centred inside', node: '17094:153524', go: { tab: 'me' } },
    { slug: 'settings', row: '08', title: 'Settings · Account', subtitle: 'From Me. Level one and Account side by side wherever there is room; its own page on the outer screen.', meta: 'Level one | Account', node: '17136:263778', go: { tab: 'me', settings: 'account' } },
    { slug: 'settings-general', row: '08', title: 'Settings · General', subtitle: 'Language, appearance, notifications and data switches.', meta: 'Level one | General', node: '17136:264560', go: { tab: 'me', settings: 'general' } },
  ];
  const bySlug = new Map(PAGES.map(p => [p.slug, p]));

  /* ── screen states ── */
  const CAPTURE = new URLSearchParams(location.search).has('capture');
  if (CAPTURE) document.documentElement.dataset.capture = '1';
  const BEZEL = CAPTURE ? 0 : 10;
  const STATES = [
    { id: 'outer-portrait',  name: 'Outer · Portrait',   w: 466, h: 678, app: [0, 0, 466, 678],       status: 'rail', statusAt: [394, 74], camera: [399.33, 29.33] },
    { id: 'outer-landscape', name: 'Outer · Landscape',  w: 678, h: 466, app: [0, 0, 678, 466],       status: 'none', camera: [611.34, 399.33] },
    { id: 'inner-portrait',  name: 'Inner · Portrait',   w: 669, h: 951, app: [0, 0, 669, 951],       status: 'corner', statusAt: [541, 24] },
    { id: 'inner-landscape', name: 'Inner · Landscape',  w: 951, h: 669, app: [0, 0, 951, 669],       status: 'rail', statusAt: [879, 24] },
    { id: 'book',            name: 'Book · Half-folded', w: 951, h: 669, app: [0, 0, 951, 669],       status: 'rail', statusAt: [879, 24] },
    { id: 'split',           name: 'Split View',         w: 951, h: 669, app: [481.5, 0, 469.5, 669], status: 'rail', statusAt: [879, 24] },
    { id: 'split-l',         name: 'Split View · Alva left', w: 951, h: 669, app: [0, 0, 469.5, 669], status: 'rail', statusAt: [879, 24] },   // the status belongs to the screen's right edge, so it sits over the other app
    { id: 'split-l-portrait', name: 'Split View · Alva top', w: 669, h: 951, app: [0, 0, 669, 469.5], status: 'rail', statusAt: [597, 24] },
    { id: 'pip',             name: 'Picture in Picture', w: 951, h: 669, app: [0, 196, 951, 473],     status: 'rail', statusAt: [879, 220] },
    /* the same postures held upright (no Figma frames yet): the hinge runs across */
    { id: 'book-portrait',   name: 'Book · Portrait',    w: 669, h: 951, app: [0, 0, 669, 951],       status: 'corner', statusAt: [541, 24] },
    { id: 'split-portrait',  name: 'Split View · Portrait', w: 669, h: 951, app: [0, 481.5, 669, 469.5], status: 'rail', statusAt: [597, 24] },
    { id: 'pip-portrait',    name: 'PiP · Portrait',     w: 669, h: 951, app: [0, 196, 669, 755],     status: 'corner', statusAt: [541, 220] },
  ];
  /* Two axes. The screen arrangement, and how far the body is turned from the
     reference hold (clockwise 0/90/180/270). The reference is the fold axis
     upright: hinge vertical — the outer display in portrait, the inner display
     in landscape. Turning keeps the arrangement; changing the arrangement keeps
     the turn, so the fold axis never jumps (outer portrait ⇄ inner landscape). */
  const TYPES = [
    { id: 'outer', name: 'Outer', layouts: ['outer-portrait', 'outer-landscape'], corners: [8, 59, 59, 8], camera: [399.33, 29.33] },
    { id: 'inner', name: 'Inner', layouts: ['inner-landscape', 'inner-portrait'] },
    { id: 'book', name: 'Book', layouts: ['book', 'book-portrait'] },
    { id: 'split-l', name: 'Split · Left', layouts: ['split-l', 'split-l-portrait'] },
    { id: 'split', name: 'Split · Right', layouts: ['split', 'split-portrait'] },
    { id: 'pip', name: 'PiP', layouts: ['pip', 'pip-portrait'] },
  ];
  const ROTS = [0, 90, 180, 270];
  const byLayout = new Map(STATES.map(s => [s.id, s]));
  const turnCorners = (c, n) => { for (let k = 0; k < n; k++) c = [c[3], c[0], c[1], c[2]]; return c; };   // clockwise
  const turnPoint = (p, w, h, n, size) => { for (let k = 0; k < n; k++) { p = [h - p[1] - size, p[0]]; [w, h] = [h, w]; } return p; };
  const poseKey = (type, rot) => `${type}@${rot}`;
  const byId = new Map();
  TYPES.forEach(t => ROTS.forEach(rot => {
    const n = rot / 90, L = byLayout.get(t.layouts[n % 2]), base = byLayout.get(t.layouts[0]);
    const turned = t.id === 'outer' && rot >= 180;   // camera on the left: the rail moves there
    byId.set(poseKey(t.id, rot), Object.assign({}, L, turned && rot === 180 ? { statusAt: [24, 518] } : {}, {
      id: poseKey(t.id, rot), layout: L.id, appLayout: turned ? L.id + '-m' : L.id, type: t.id, rot,
      r: turnCorners(t.corners || [55, 55, 55, 55], n),
      camera: t.camera ? turnPoint(t.camera, base.w, base.h, n, 37) : null,
    }));
  }));
  const DEFAULT_ROT = { 'outer-portrait': 0, 'outer-landscape': 90, 'inner-landscape': 0, 'inner-portrait': 270, book: 0, split: 0, 'split-l': 0, 'split-l-portrait': 270, pip: 0, 'book-portrait': 270, 'split-portrait': 270, 'pip-portrait': 270 };
  const poseOfLayout = id => { const t = TYPES.find(x => x.layouts.includes(id)); return t ? poseKey(t.id, DEFAULT_ROT[id]) : null; };
  const typeOf = id => TYPES.find(t => t.id === byId.get(id).type);
  const LINKS = [
    ['outer-portrait', 'outer-landscape', 'rotate', 90],
    ['outer-portrait', 'inner-landscape', 'unfold'],
    ['inner-landscape', 'inner-portrait', 'rotate', -90],
    ['inner-landscape', 'book', 'book'],
    ['inner-landscape', 'split', 'split'],
    ['inner-landscape', 'pip', 'pip'],
  ];
  const STATE_KEY = 'alva.duo.state';
  const THEME_KEY = 'alva.duo.theme';
  const SIDEBAR_KEY = 'alva.duo.sidebar';

  const root = document.documentElement;
  const stage = document.getElementById('stage');
  const phone = document.getElementById('phone');
  const frame = document.getElementById('appFrame');
  const chrome = document.getElementById('duoChrome');
  const part = sel => chrome.querySelector(sel);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let state = (() => { let v = null; try { v = localStorage.getItem(STATE_KEY); } catch (e) {} return byId.has(v) ? v : (poseOfLayout(v) || poseKey('outer', 0)); })();
  let theme = root.dataset.theme === 'dark' ? 'dark' : 'light';
  let target = null, running = false, epoch = 0;
  let current = null;   // page slug

  /* ── the list ── */
  const listEl = document.getElementById('protoList');
  const rows = new Map();
  PAGES.forEach(p => {
    const a = document.createElement('a');
    a.className = 'proto-item';
    a.href = `#${p.slug}`;
    a.innerHTML = `<span class="pi-body"><span class="pi-title"><span class="pi-row"></span></span><span class="pi-sub"></span><span class="pi-meta"></span></span><span class="pi-go"><img src="assets/img/icon-arrow-right.svg" alt=""></span>`;
    a.querySelector('.pi-row').textContent = p.row;
    a.querySelector('.pi-title').append(p.title);
    a.querySelector('.pi-sub').textContent = p.subtitle;
    a.querySelector('.pi-meta').textContent = p.meta;
    a.addEventListener('click', () => { if (current === p.slug) openPage(p); });
    a.addEventListener('click', () => { galRows.length && (galRows[0][0].href = '#' + p.slug); });
    rows.set(p.slug, a);
    listEl.appendChild(a);
  });
  const searchEl = document.getElementById('protoSearch');
  const emptyEl = document.getElementById('protoEmpty');
  const footEl = document.getElementById('sbFoot');
  function filterList() {
    const q = searchEl.value.trim().toLowerCase();
    let shown = 0;
    PAGES.forEach(p => {
      const hit = !q || `${p.row} ${p.title} ${p.subtitle} ${p.meta}`.toLowerCase().includes(q);
      rows.get(p.slug).hidden = !hit;
      if (hit) shown++;
    });
    emptyEl.hidden = shown > 0;
    if (!shown) emptyEl.textContent = `No pages match “${searchEl.value.trim()}”`;
    footEl.textContent = q ? `${shown} of ${PAGES.length} pages` : `${PAGES.length} pages · 6 screens × 4 turns · keys 1–6 switch, R turns`;
  }
  searchEl.addEventListener('input', filterList);
  filterList();

  /* ── level one: the online gallery's list, plus the Duo row ── */
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function formatEdited(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    const day = t => new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
    const then = new Date(y, m - 1, d);
    const days = Math.round((day(new Date()) - day(then)) / 86400000);
    if (days <= 0) return 'Edited today';
    if (days === 1) return 'Edited yesterday';
    if (days < 7) return `Edited ${days} days ago`;
    if (days < 14) return 'Edited last week';
    return `Edited ${MONTHS[m - 1]} ${d}` + (then.getFullYear() === new Date().getFullYear() ? '' : `, ${y}`);
  }
  const DUO_ROW = { duo: true, title: 'iPhone Duo 适配', subtitle: 'Every Thesis page on iPhone Duo: outer and inner screens, Book, Split View and Picture in Picture.', edited: '2026-11-25', meta: `${PAGES.length} pages · 6 screens × 4 turns` };
  const gallery = [DUO_ROW, ...(window.GALLERY || [])].slice().sort((a, b) => b.edited.localeCompare(a.edited));
  const galList = document.getElementById('galList');
  const galRows = [];
  gallery.forEach(p => {
    const a = document.createElement('a');
    a.className = 'proto-item' + (p.duo ? ' pi-drill' : '');
    const slug = p.duo ? '' : p.slug || p.href.replace(/\.html?(\?.*)?$/i, '');
    a.href = p.duo ? '#' + (current || PAGES[0].slug) : `${window.GALLERY_BASE}#${slug}`;
    a.setAttribute('aria-current', String(!!p.duo));
    const meta = [formatEdited(p.edited)];
    if (p.meta) meta.push(p.meta);
    a.innerHTML = `<span class="pi-body"><span class="pi-title"></span><span class="pi-sub"></span><span class="pi-meta">${meta.join('<span class="dot">·</span>')}</span></span><span class="pi-go"><img src="assets/img/icon-arrow-right.svg" alt=""></span>`;
    a.querySelector('.pi-title').textContent = p.title;
    a.querySelector('.pi-sub').textContent = p.subtitle;
    if (p.duo) a.addEventListener('click', e => { e.preventDefault(); setLevel(2); });
    else if (!window.GALLERY_BASE) { a.removeAttribute('href'); a.classList.add('pi-off'); a.title = 'Opens in the m-baby gallery'; }
    galRows.push([a, `${p.title} ${p.subtitle} ${p.meta || ''}`.toLowerCase()]);
    galList.appendChild(a);
  });
  const galSearch = document.getElementById('galSearch');
  const galEmpty = document.getElementById('galEmpty');
  const galFoot = document.getElementById('galFoot');
  function filterGallery() {
    const q = galSearch.value.trim().toLowerCase();
    let shown = 0;
    galRows.forEach(([a, text]) => { a.hidden = !!q && !text.includes(q); if (!a.hidden) shown++; });
    galEmpty.hidden = shown > 0;
    if (!shown) galEmpty.textContent = `No prototypes match “${galSearch.value.trim()}”`;
    galFoot.textContent = q ? `${shown} of ${galRows.length} prototypes` : `${galRows.length} prototypes`;
  }
  galSearch.addEventListener('input', filterGallery);
  filterGallery();
  [galSearch, searchEl].forEach(el => el.addEventListener('keydown', e => { if (e.key === 'Escape' && el.value) { el.value = ''; el.dispatchEvent(new Event('input')); } }));

  /* level one ⇄ two: a push, the way the app's own pages move */
  const LEVEL_KEY = 'alva.duo.sblevel';
  const panels = document.getElementById('sbPanels');
  const sbTitle = document.querySelector('.sb-head h1');
  const scroller = document.querySelector('.sidebar-scroll');
  function setLevel(n, instant) {
    if (instant) panels.classList.add('no-anim');
    panels.dataset.level = String(n);
    panels.querySelector('.sb-l1').inert = n !== 1;
    panels.querySelector('.sb-l2').inert = n !== 2;
    sbTitle.textContent = n === 2 ? 'iPhone Duo' : 'Mobile prototypes';
    scroller.scrollTop = 0;
    try { localStorage.setItem(LEVEL_KEY, String(n)); } catch (e) {}
    if (instant) requestAnimationFrame(() => requestAnimationFrame(() => panels.classList.remove('no-anim')));
  }
  document.getElementById('sbBack').addEventListener('click', () => setLevel(1));
  setLevel((() => { try { return localStorage.getItem(LEVEL_KEY) === '1' ? 1 : 2; } catch (e) { return 2; } })(), true);

  /* sidebar collapse, as in the gallery */
  const brandEl = document.getElementById('brandToggle');
  const collapseEl = document.getElementById('collapseToggle');
  function applySidebar(collapsed) {
    root.dataset.sidebar = collapsed ? 'collapsed' : 'expanded';
    brandEl.disabled = !collapsed;
    collapseEl.hidden = collapsed;
    try { localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0'); } catch (e) {}
    fit();
  }
  collapseEl.addEventListener('click', () => applySidebar(true));
  brandEl.addEventListener('click', () => applySidebar(false));

  /* ── routing: a row is a place in the app ── */
  const figmaPill = document.getElementById('figmaPill');
  const figmaText = document.getElementById('figmaPillText');
  function openPage(p) {
    sendApp({ type: 'duo:goto', go: p.go });
    if (p.state) go(poseKey(p.state, byId.get(target || state).rot));
  }
  function markPage(p) {
    rows.forEach((row, slug) => row.setAttribute('aria-current', String(slug === p.slug)));
    figmaPill.href = FIGMA(p.node);
    figmaText.textContent = `Figma · ${p.row} ${p.title}`;
    document.title = `${p.title} · Alva on iPhone Duo`;
    current = p.slug;
  }
  function route() {
    const m = /^#\/?([\w-]+)/.exec(location.hash || '');
    const p = (m && bySlug.get(m[1])) || PAGES[0];
    if (!m) history.replaceState(null, '', `#${p.slug}`);
    if (followed === p.slug) { followed = null; return; }   // the list is following the app: don't navigate it again
    markPage(p);
    openPage(p);
  }
  /* the list follows the app: moving around inside the demo selects the matching row */
  let followed = null;
  function follow(slug) {
    const p = bySlug.get(slug);
    if (!p || slug === current) return;
    markPage(p);
    followed = slug;
    history.replaceState(null, '', `#${slug}`);
    followed = null;
    const row = rows.get(slug);
    if (row && row.scrollIntoView) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  window.addEventListener('hashchange', route);

  /* ── talking to the app ── */
  let appReady = false;
  const queue = [];
  function sendApp(msg) {
    if (!appReady) { queue.push(msg); return; }
    frame.contentWindow.postMessage(msg, '*');
  }
  let animMs = 0;
  /* a 0.5 line scaled down by --fit falls under one device pixel and fades
     out; keep it 1.5 device pixels wide (so one pixel is always fully covered) (0.5 at 1:1 and in capture) */
  function hairline() { return 0.5; }  /* hairlines are 0.5, as in Figma, at every scale */

  /* state and theme go by message: on a hosted page the two documents may
     not be able to reach into each other */
  function pushToApp() {
    try { frame.contentWindow.postMessage({ type: 'duo:env', duo: byId.get(state).appLayout, theme, anim: animMs, hw: hairline() }, '*'); } catch (e) {}
  }

  frame.addEventListener('load', pushToApp);
  window.addEventListener('message', e => {
    if (e.source !== frame.contentWindow) return;
    if (e.data?.type === 'duo:ready') {
      pushToApp();
      appReady = true;
      queue.splice(0).forEach(sendApp);
    }
    if (e.data?.type === 'duo:key') onKey({ key: e.data.key, target: null });
    if (e.data?.type === 'duo:page') follow(e.data.slug);
    if (e.data?.type === 'duo:viewer') viewerStatus(e.data);
  });
  /* The image viewer is black. The status bar belongs to the screen, so it only changes where it
     sits over Alva's viewer: white while the viewer's controls show, hidden with them (iOS Photos).
     Over the other app (Split) or outside the viewer's half (Book) it stays as it is. */
  function viewerStatus(d) {
    const s = byId.get(state);
    if (!d.on || !d.rect || !s.statusAt || s.status === 'none') { delete root.dataset.viewer; return; }
    const [sw, sh] = s.status === 'corner' ? [104, 48] : [48, 86];
    const [x, y] = s.statusAt, ax = s.app[0], ay = s.app[1];
    const [x0, y0, x1, y1] = [d.rect[0] + ax, d.rect[1] + ay, d.rect[2] + ax, d.rect[3] + ay];
    const over = x < x1 && x + sw > x0 && y < y1 && y + sh > y0;
    if (over) root.dataset.viewer = d.chrome ? 'white' : 'hide'; else delete root.dataset.viewer;
  }
  document.getElementById('restartPill').addEventListener('click', () => {
    appReady = false;
    frame.src = 'app.html?v=65&restart=' + Date.now();
    const p = bySlug.get(current);
    if (p) queue.push({ type: 'duo:goto', go: p.go });
  });

  /* ── theme ── */
  const themeLabel = document.getElementById('themeLabel');
  function applyTheme() {
    root.dataset.theme = theme;
    themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    pushToApp();
  }
  document.getElementById('themePill').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    applyTheme();
  });

  /* ── geometry ── */
  function apply() {
    const s = byId.get(state);
    const px = v => v + 'px';
    root.style.setProperty('--screen-w', px(s.w));
    root.style.setProperty('--screen-h', px(s.h));
    root.style.setProperty('--bezel', px(BEZEL));
    ['tl', 'tr', 'br', 'bl'].forEach((k, i) => root.style.setProperty('--r-' + k, px(s.r[i])));
    root.style.setProperty('--screen-stroke', '3px');
    root.style.setProperty('--app-x', px(s.app[0]));
    root.style.setProperty('--app-y', px(s.app[1]));
    root.style.setProperty('--app-w', px(s.app[2]));
    root.style.setProperty('--app-h', px(s.app[3]));
    if (s.statusAt) { root.style.setProperty('--status-x', px(s.statusAt[0])); root.style.setProperty('--status-y', px(s.statusAt[1])); }
    root.dataset.duoType = s.type;
    root.dataset.duoRot = String(s.rot);
    if (s.camera) { root.style.setProperty('--cam-x', px(s.camera[0])); root.style.setProperty('--cam-y', px(s.camera[1])); }
    root.dataset.duoState = s.layout;
    root.dataset.duoStatus = s.status;
    root.dataset.deviceId = 'iphone-duo';
    pushToApp();
    fit();
  }
  function setState(id) {
    state = id;
    try { localStorage.setItem(STATE_KEY, id); } catch (e) {}
    apply();
    menu.select(target || state);
  }
  function fit() {
    const cs = getComputedStyle(stage);
    const w = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const h = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (w <= 0 || h <= 0) return;
    const ref = Math.max(...STATES.map(s => Math.max(s.w, s.h))) + 2 * BEZEL;
    stage.style.setProperty('--fit', Math.max(0.3, Math.min(1, w / ref, h / ref)).toFixed(4));
    if (typeof pushToApp === 'function' && appReady) pushToApp();
  }
  new ResizeObserver(fit).observe(stage);

  /* ── screen: five arrangements, plus the turn ── */
  const tabsEl = document.getElementById('stateTabs');
  const deviceLabel = document.getElementById('deviceLabel');
  const tabs = new Map();
  const cur = () => byId.get(target || state);
  TYPES.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'st-tab';
    b.setAttribute('role', 'tab');
    b.innerHTML = '<span class="st-name"></span><span class="st-size"></span>';
    b.firstChild.textContent = t.name;
    b.title = `${t.name} · key ${i + 1}`;
    b.addEventListener('click', () => go(poseKey(t.id, cur().rot)));
    tabs.set(t.id, b);
    tabsEl.appendChild(b);
  });
  /* one button, first in the row: every press turns the device a quarter clockwise */
  const rot = document.createElement('button');
  rot.type = 'button';
  rot.className = 'st-rotate';
  rot.title = 'Rotate 90° · R';
  rot.setAttribute('aria-label', 'Rotate 90° clockwise');
  rot.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.34 5.66"/><path d="M20 4v7h-7"/></svg>';
  rot.addEventListener('click', () => { rotate(1); rot.firstChild.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(90deg)' }], { duration: 420, easing: 'cubic-bezier(.32,.72,0,1)' }); });
  tabsEl.insertBefore(rot, tabsEl.firstChild);
  function rotate(dir) {
    const c = cur();
    go(poseKey(c.type, (c.rot + 90 * dir + 360) % 360));
  }
  const menu = {
    select(id) {
      const p = byId.get(id);
      tabs.forEach((b, k) => {
        const on = k === p.type;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        const s = byId.get(poseKey(k, p.rot));
        b.lastChild.textContent = `${s.w} × ${s.h}`;
      });
      rot.title = `Rotate 90° · now ${p.rot}° · R`;
      deviceLabel.textContent = `iPhone Duo · ${p.w} × ${p.h}`;
    },
  };

  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key === 'r' || e.key === 'R') return rotate(e.shiftKey || e.key === 'R' ? -1 : 1);
    const n = Number(e.key);
    if (n >= 1 && n <= TYPES.length) go(poseKey(TYPES[n - 1].id, cur().rot));
  }
  window.addEventListener('keydown', onKey);

  /* ── motion between states: the physical moves ── */
  function path(from, to) {
    const prev = new Map([[from, null]]);
    const q = [from];
    while (q.length) {
      const cur = q.shift();
      if (cur === to) break;
      LINKS.forEach(([a, b]) => {
        const next = a === cur ? b : b === cur ? a : null;
        if (next && !prev.has(next)) { prev.set(next, cur); q.push(next); }
      });
    }
    const out = [];
    for (let at = to; at; at = prev.get(at)) out.unshift(at);
    return out;
  }
  function link(from, to) {
    for (const [a, b, kind, arg] of LINKS) {
      if (a === from && b === to) return { kind, arg, reverse: false };
      if (a === to && b === from) return { kind, arg: arg === undefined ? arg : -arg, reverse: true };
    }
    return null;
  }
  /* One move from wherever the device is to wherever it should be: no
     stepping through intermediate states. A new choice mid-move cancels the
     running one and starts from the state already applied. */
  function go(id) {
    if (!byId.has(id)) return;
    target = id;
    menu.select(id);
    if (state === id && !running) { target = null; return; }
    const mine = ++epoch;
    cleanup();
    delete chrome.dataset.leaving;
    if (reduceMotion.matches) { setState(id); target = null; return; }
    running = true;
    const move = inner(state) !== inner(id) ? foldMove : step;
    move(state, id, mine).finally(() => { if (mine === epoch) { running = false; target = null; } });
  }
  function play(el, frames, options) {
    if (!el) return { finished: Promise.resolve(), cancel() {} };
    return el.animate(frames, Object.assign({ fill: 'both' }, options));
  }
  const done = list => Promise.all(list.map(a => a.finished.catch(() => {})));
  const release = list => list.forEach(a => a.cancel());
  function cleanup() {
    [root, phone, ...phone.querySelectorAll('*')].forEach(el => el.getAnimations({ subtree: false }).forEach(a => { if (a.effect && a.effect.target === el) a.cancel(); }));
    phone.style.removeProperty('transform-origin');
    phone.style.removeProperty('transform');
    phone.style.removeProperty('clip-path');
    flap.classList.remove('on');
    flap.removeAttribute('style');
    part('.duo-fold-shade').style.removeProperty('opacity');
  }
  const flap = document.getElementById('duoFlap');
  const EASE_OUT = 'cubic-bezier(.16,1,.3,1)';
  const EASE_IN = 'cubic-bezier(.55,0,.75,.2)';
  const EASE_IN_OUT = 'cubic-bezier(.45,0,.2,1)';
  const R = 50;

  /* One motion per move. The state is applied at the start; the hardware,
     the screen geometry (registered custom properties, so they interpolate)
     and the app's own columns (it morphs from data-duo-anim) all run over
     the same DUR with the same curve. */
  const DUR = 420;
  const EASE = 'cubic-bezier(.32,.72,0,1)';
  const geom = s => {
    const g = { '--screen-w': s.w + 'px', '--screen-h': s.h + 'px', '--app-x': s.app[0] + 'px', '--app-y': s.app[1] + 'px', '--app-w': s.app[2] + 'px', '--app-h': s.app[3] + 'px' };
    if (s.statusAt) { g['--status-x'] = s.statusAt[0] + 'px'; g['--status-y'] = s.statusAt[1] + 'px'; }
    ['tl', 'tr', 'br', 'bl'].forEach((k, i) => { g['--r-' + k] = s.r[i] + 'px'; });
    return g;
  };
  function geomFrames(A, B) {
    const a = geom(A), b = geom(B);
    Object.keys(a).forEach(k => { if (!(k in b)) delete a[k]; });
    Object.keys(b).forEach(k => { if (!(k in a)) delete b[k]; });
    return [a, b];
  }
  /* How each state is held: degrees the body is turned from upright, and
     which physical screen is showing. */
  const inner = id => byId.get(id).type !== 'outer';
  /* the shorter way round from one turn to another, in degrees (clockwise +) */
  const turn = (from, to) => { const d = (((byId.get(to).rot - byId.get(from).rot) % 360) + 540) % 360 - 180; return d === -180 ? 180 : d; };
  const layoutOf = id => byId.get(id).layout;
  const EXTRA = ['book', 'split', 'pip', 'book-portrait', 'split-portrait', 'pip-portrait', 'split-l', 'split-l-portrait'];
  /* Outer ⇄ inner: the device opens or closes like a book. Everything runs in
     the inner display's frame (its full size): one half swings 180° on the
     hinge; while it lies folded over the other half its back — the outer
     display — is what you see. The whole body turns at the same time when the
     two states are held differently, and recentres on the half that stays.
     Opening: the inner layout is applied at the start and is uncovered as the
     half swings open. Closing: the outer display lights up once it is shut. */
  /* the room the device may use on the stage, in device px (before --fit) */
  function room() {
    const cs = getComputedStyle(stage);
    const fit = parseFloat(stage.style.getPropertyValue('--fit')) || 1;
    return [(stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) / fit,
            (stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)) / fit];
  }
  /* shrink a w×h body turned by deg until its bounding box fits the room */
  function fitScale(w, h, deg, grow = 1) {
    const a = Math.abs(deg) * Math.PI / 180, c = Math.abs(Math.cos(a)), sn = Math.abs(Math.sin(a));
    const [rw, rh] = room();
    return Math.min(1, rw / ((w * c + h * sn) * grow), rh / ((w * sn + h * c) * grow));
  }
  const FOLD_MS = 560;
  const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function foldMove(from, to, mine) {
    const opening = inner(to);
    const I = byId.get(opening ? to : from), O = byId.get(opening ? from : to);
    const rc = turn(I.id, O.id);                    // body turn (deg) when shut, seen from the inner frame
    const q = (((rc / 90) % 4) + 4) % 4;
    /* the half that swings: at the reference turn it is the left half; it turns with the body */
    const side = ['left', 'top', 'right', 'bottom'][I.rot / 90];
    const horiz = side === 'left' || side === 'right';
    if (EXTRA.includes(layoutOf(from))) chrome.dataset.leaving = layoutOf(from);
    if (opening) { animMs = 0; setState(to); }
    const W = I.w + 2 * BEZEL, H = I.h + 2 * BEZEL;
    /* the swinging half and its back (the outer display, corners as the closed device shows them) */
    const r = [0, 1, 2, 3].map(i => O.r[(i + q) % 4]);
    flap.className = 'duo-flap on';
    const FLAP = {
      left:   { box: [0, 0, W / 2, H], origin: '100% 50%', t: f => `rotateY(${f}deg)`, shift: [-W / 4, 0] },
      right:  { box: [W / 2, 0, W / 2, H], origin: '0 50%', t: f => `rotateY(${-f}deg)`, shift: [W / 4, 0] },
      bottom: { box: [0, H / 2, W, H / 2], origin: '50% 0', t: f => `rotateX(${f}deg)`, shift: [0, H / 4] },
      top:    { box: [0, 0, W, H / 2], origin: '50% 100%', t: f => `rotateX(${-f}deg)`, shift: [0, -H / 4] },
    }[side];
    Object.assign(flap.style, { left: FLAP.box[0] + 'px', top: FLAP.box[1] + 'px', width: FLAP.box[2] + 'px', height: FLAP.box[3] + 'px', transformOrigin: FLAP.origin });
    const back = flap.firstChild;
    back.style.transform = horiz ? 'rotateY(180deg)' : 'rotateX(180deg)';
    const SQ = CSS.supports('corner-shape', 'superellipse(2)') ? 1.75 : 1;   // continuous corners, as on the body
    back.style.borderRadius = r.map(v => (v + BEZEL) * SQ + 'px').join(' ');
    back.firstChild.style.borderRadius = r.map(v => v * SQ + 'px').join(' ');
    /* camera: where the outer display has it, in this frame (mirrored, since the back is seen through the flip) */
    const cam = back.querySelector('.flap-cam');
    const ow = horiz ? W / 2 : W, oh = horiz ? H : H / 2;
    const c0 = O.camera || [O.w - 67, 29];
    let cx = c0[0] + BEZEL, cy = c0[1] + BEZEL, w0 = O.w + 2 * BEZEL, h0 = O.h + 2 * BEZEL;
    for (let k = 0; k < q; k++) { [cx, cy, w0, h0] = [cy, w0 - cx - 37, h0, w0]; }   // undo the body's clockwise quarter turns
    cam.style.left = Math.max(BEZEL, Math.min(ow - 47, cx * ow / w0)) + 'px';
    cam.style.top = Math.max(BEZEL, Math.min(oh - 47, cy * oh / h0)) + 'px';
    const shade = part('.duo-fold-shade');
    phone.style.transformOrigin = '50% 50%';
    const frameAt = p => {                          // p: 0 shut … 1 open
      const fold = 180 * (1 - p);
      const [tx, ty] = FLAP.shift;
      /* what is visible right now: the half that stays plus however much of the other is open */
      const openNow = fold < 90 ? Math.cos(fold * Math.PI / 180) : 0;
      const vw = horiz ? W / 2 * (1 + openNow) : W, vh = horiz ? H : H / 2 * (1 + openNow);
      const swing = Math.sin(fold * Math.PI / 180);   // the free edge comes toward you mid-swing
      const sc = fitScale(vw, vh, rc * (1 - p), 1 + 0.12 * swing);
      phone.style.transform = `scale(${sc}) rotate(${rc * (1 - p)}deg) translate(${tx * (1 - p)}px, ${ty * (1 - p)}px)`;
      flap.style.transform = FLAP.t(fold);
      const open = fold < 90 ? Math.cos(fold * Math.PI / 180) : 0;   // how much of the half is uncovered
      /* only the hinge side is cut (the part still folded away); the swinging half grows toward you in perspective, so nothing else may clip it */
      const cut = (horiz ? W / 2 : H / 2) * (1 - open) + 'px', far = '-3000px';
      phone.style.clipPath = `inset(${side === 'top' ? cut : far} ${side === 'right' ? cut : far} ${side === 'bottom' ? cut : far} ${side === 'left' ? cut : far})`;
      if (side === 'left') shade.style.opacity = String(0.55 * (1 - open) * (fold < 90 ? 1 : 0));
      /* the outer display goes dark as the device starts to open, and lights up as it shuts */
      back.firstChild.style.setProperty('--lit', String(Math.max(0, 1 - p * 4)));
    };
    frameAt(opening ? 0 : 1);
    return new Promise(resolve => {
      const t0 = performance.now();
      const tick = now => {
        if (mine !== epoch) return resolve();
        const t = Math.min(1, (now - t0) / (window.DUO_FOLD_MS || FOLD_MS)), e = easeInOut(t);
        frameAt(opening ? e : 1 - e);
        if (t < 1) return requestAnimationFrame(tick);
        delete chrome.dataset.leaving;
        if (!opening) { animMs = 0; setState(to); }
        cleanup();
        if (!opening) {
          play(frame, [{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out', fill: 'none' });
          play(part('.duo-ui'), [{ opacity: 0 }, { opacity: 1 }], { duration: 220, fill: 'none' });
        }
        resolve();
      };
      requestAnimationFrame(tick);
    });
  }

  async function step(from, to, mine) {
    const A = byId.get(from), B = byId.get(to);
    const delta = turn(from, to);
    const opt = { duration: DUR, easing: EASE };
    const list = [];
    if (EXTRA.includes(layoutOf(from)) && typeOf(from) !== typeOf(to)) chrome.dataset.leaving = layoutOf(from);
    animMs = DUR;
    setState(to);
    animMs = 0;
    /* the start, seen in the new state's frame: a quarter turn swaps the sides */
    const q = (((-delta / 90) % 4) + 4) % 4;   // clockwise quarter turns the body starts at
    const A2 = Object.assign({}, A, delta % 180 ? { w: A.h, h: A.w, app: [0, 0, A.h, A.w], statusAt: null } : {}, { r: [0, 1, 2, 3].map(i => A.r[(i + q) % 4]) });
    list.push(play(root, geomFrames(A2, B), Object.assign({ fill: 'none' }, opt)));
    phone.style.transformOrigin = '50% 50%';
    const unfold = inner(from) !== inner(to);
    const bodyFrom = [delta ? `rotate(${-delta}deg)` : '', unfold ? `perspective(2400px) rotateY(${inner(to) ? -16 : 10}deg)` : ''].join(' ').trim();
    if (bodyFrom) {
      const mid = delta ? fitScale(B.w + 2 * BEZEL, B.h + 2 * BEZEL, delta / 2) : 1;
      list.push(play(phone, mid < 1
        ? [{ transform: bodyFrom }, { transform: `scale(${mid}) rotate(${-delta / 2}deg)`, offset: 0.5 }, { transform: 'none' }]
        : [{ transform: bodyFrom }, { transform: 'none' }], opt));
    }
    if (delta) {
      /* the picture stays upright while the body turns under it */
      const k = Math.min(A.w, A.h) / Math.max(A.w, A.h);
      list.push(play(frame, [{ transform: `rotate(${delta}deg) scale(${k})` }, { transform: 'none' }], opt));
    }
    if (delta || unfold) {
      list.push(play(part('.duo-ui'), [{ opacity: 0 }, { opacity: 1 }], { duration: DUR * 0.5, delay: DUR * 0.5, easing: 'ease-out' }));
      list.push(play(part('.duo-camera'), [{ opacity: 0 }, { opacity: 1 }], { duration: DUR * 0.4, delay: DUR * 0.6 }));
    }
    if (unfold) list.push(play(part('.duo-fold-shade'), inner(to) ? [{ opacity: 0.5 }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: 0.4, offset: 0.5 }, { opacity: 0 }], opt));
    /* what belongs to the state being left goes out, what belongs to the new one comes in — same clock */
    const parts = {
      book: [['.duo-hinge', [{ opacity: 0 }, { opacity: 1 }]]],
      split: [['.duo-other', [{ transform: 'translateX(-104%)' }, { transform: 'none' }]], ['.duo-split-divider', [{ opacity: 0 }, { opacity: 1 }]]],
      pip: [['.duo-pip', [{ transform: 'translateY(-100%)' }, { transform: 'none' }]]],
      'split-portrait': [['.duo-other', [{ transform: 'translateY(-104%)' }, { transform: 'none' }]], ['.duo-split-divider', [{ opacity: 0 }, { opacity: 1 }]]],
      'pip-portrait': [['.duo-pip', [{ transform: 'translateY(-100%)' }, { transform: 'none' }]]],
      'split-l': [['.duo-other', [{ transform: 'translateX(104%)' }, { transform: 'none' }]], ['.duo-split-divider', [{ opacity: 0 }, { opacity: 1 }]]],
      'split-l-portrait': [['.duo-other', [{ transform: 'translateY(104%)' }, { transform: 'none' }]], ['.duo-split-divider', [{ opacity: 0 }, { opacity: 1 }]]],
    };
    /* same arrangement, other axis: the parts stay, the body turns */
    const sameType = typeOf(from) === typeOf(to);
    const pf = parts[layoutOf(from)], pt = parts[layoutOf(to)];
    if (pf && !sameType) pf.forEach(([sel, f]) => list.push(play(part(sel), f.slice().reverse(), opt)));
    if (pt && !sameType) pt.forEach(([sel, f]) => list.push(play(part(sel), f, opt)));
    if ((typeOf(to).id === 'book') !== (typeOf(from).id === 'book')) list.push(play(part('.duo-fold-shade'), [{ opacity: 0 }, { opacity: 0.25, offset: 0.45 }, { opacity: 0 }], opt));
    await done(list);
    if (mine !== epoch) return;
    delete chrome.dataset.leaving;
    cleanup();
  }

  if (CAPTURE) window.__duo = { state: id => setState(byId.has(id) ? id : poseOfLayout(id)), goto: go => sendApp({ type: 'duo:goto', go }), ready: () => appReady };
  applyTheme();
  apply();
  menu.select(state);
  applySidebar((() => { try { return localStorage.getItem(SIDEBAR_KEY) === '1'; } catch (e) { return false; } })());
  route();
})();
