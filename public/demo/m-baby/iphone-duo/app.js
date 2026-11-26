/* ═══════════════════════════════════════════════════════════
   Alva on iPhone Duo — the app (runs inside the stage's iframe)

   One navigation model (a stack per tab), laid out per screen state:
     single  outer 382 · outer landscape 594 · inner portrait 669 · Split 385.5
             → the top view. Ask Alva: own page ≤ 480, a 382 sheet over the
             dimmed page up to 782 (inner portrait: below the 84 status band).
     two     inner landscape · PiP (867) → the last two views: list 382 |
             detail 485, or page 485 | Ask Alva 382. A root without a
             selection is one 600 column, centred; For You / Leaderboard open
             their first item.
     book    455.5 | hinge 40 | 371.5 → two pages; a root without a
             selection gets an empty right page.
   The rail (84) is drawn here: Back → Create → Tab Bar, under the system
   status the stage draws. Figma: Duo 适配总表 (17123:135811).
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const D = window.DUO_DATA;
  /* Every thesis opens as a complete detail page, whatever the entry (For You, Leaderboard, a
     profile, Me, search): return chart, latest update, history, Signals. Theses that were only
     written for one list get the missing parts filled in here. */
  (() => {
    const TOPICS = { mickie1: ['Chips'], harryz1: ['Chips'], mickie2: ['Chips', 'Neocloud'], passenger1: ['Power'], jin1: ['Power'], hnds1: ['Chips'], maya1: ['Hyperscaler'] };
    const sigFor = t => {
      const [s, dir] = t.tickers[0] || ['SPY', 'up'];
      const up = dir !== 'down';
      return [
        { who: `${s} price action`, role: 'Alva market data', avatar: D.logo[s] || 'assets/icons/logo-portrait.svg', time: 'Today, 09:30',
          quote: `${s} closed ${up ? 'above' : 'below'} its 50-day average on above-average volume.`, link: 'alva',
          take: 'Price is moving the way the thesis expects; it does not yet test the reason behind it.' },
        { who: 'Estimate revisions', role: 'Consensus data', avatar: 'assets/icons/logo-portrait.svg', time: 'Yesterday, 21:00',
          quote: `Analysts ${up ? 'raised' : 'cut'} next-quarter estimates for ${s} over the past two weeks.`, link: 'alva', stance: 'Mixed',
          take: 'Revisions lean the thesis’s way, but they are small next to the move it expects.' },
      ];
    };
    Object.entries(D.theses).forEach(([id, t]) => {
      if (!t.topics) t.topics = TOPICS[id] || [];
      if (!t.ret) { t.ret = t.lb || '+4.6%'; t.since = t.since || '2 Oct'; }
      if (!t.chartPts) t.chartPts = [[0, 0.8], [0.3, 0.7], [0.55, 0.5], [0.8, 0.35], [1, 0.05]];
      if (t.history == null) t.history = true;
      if (!t.signals) t.signals = sigFor(t);
      if (!t.refs) t.refs = '[1]';
      if (!t.charts || !t.charts.length) t.charts = t.tickers.map(x => x[0]).filter(s => D.chart[s]);
      if (!t.body || !t.body.length) t.body = [t.title];
      if (!t.media) t.media = [];
    });
  })();
  const app = document.getElementById('app');
  const root = document.documentElement;
  const I = (name, cls = '') => `<i class="ic ${cls}" style="--i:url(${(window.ICONS && ICONS[name]) || 'assets/icons/' + name + '.svg'})"></i>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const LAYOUTS = {
    'outer-portrait':  { mode: 'single', rail: { x: 382, top: 174, bottom: 24 }, alva: 'page' },
    'outer-landscape': { mode: 'single', rail: { x: 594, top: 24, bottom: 82 }, alva: 'overlay' },
    'inner-portrait':  { mode: 'single', rail: null, tabbar: true, corner: true, alva: 'overlay' },
    'inner-landscape': { mode: 'two', rail: { x: 867, top: 124, bottom: 24 }, alva: 'tile' },
    'book':            { mode: 'book', rail: { x: 867, top: 124, bottom: 24 }, alva: 'tile' },
    'split':           { mode: 'single', rail: { x: 385.5, top: 124, bottom: 24 }, alva: 'page' },
    'pip':             { mode: 'two', rail: { x: 867, top: 124, bottom: 24 }, alva: 'tile' },
    /* the outer display turned half round (180° / 270°): its camera is now on the
       left, so the system rail moves to the left edge and keeps clear of it */
    'outer-portrait-m':  { mode: 'single', rail: { x: 0, left: true, top: 24, bottom: 174 }, alva: 'page' },
    'outer-landscape-m': { mode: 'single', rail: { x: 0, left: true, top: 82, bottom: 24 }, alva: 'overlay' },
    /* the same postures turned upright: the hinge runs across the screen */
    'book-portrait':   { mode: 'single', rail: null, tabbar: true, corner: true, alva: 'overlay' },   // upright Book = upright Inner, no special handling
    'split-portrait':  { mode: 'single', rail: { x: 585, top: 24, bottom: 24 }, alva: 'overlay' },   // status is at the top of the screen, over the other app
    /* Split View with Alva on the left (top when upright): the mirror of Split View — rail and status on the screen's left edge */
    'split-l':           { mode: 'single', rail: { x: 0, left: true, top: 24, bottom: 24 }, alva: 'page' },   // rail mirrored to the left edge; the system status stays on the screen's right edge, over the other app
    'split-l-portrait':  { mode: 'single', rail: { x: 585, top: 124, bottom: 24 }, alva: 'overlay' },
    'pip-portrait':    { mode: 'single', rail: null, tabbar: true, corner: true, alva: 'overlay' },
  };
  const stateId = () => LAYOUTS[root.dataset.duo] ? root.dataset.duo : (innerWidth >= 900 ? 'inner-landscape' : 'outer-portrait');

  /* ── state ── */
  const fresh = () => ({
    tab: 'foryou',
    stacks: { foryou: [{ v: 'feed' }], alva: [{ v: 'chat', id: 'tab' }], search: [{ v: 'search' }], me: [{ v: 'me' }] },
    feedTab: 'foryou', topic: 'All', period: '7D', q: '', searchTab: 'people', recent: ['NVDA', 'chamath'],
    saved: {}, follow: { satya: true }, sw: { x: true, tg: true, dc: false, notif: true, improve: true, ai: true }, chats: {}, quoteOff: {}, peopleDismissed: false, profTab: 'Thesis', pop: null, toast: null,
  });
  let S = fresh();
  const stack = () => S.stacks[S.tab];
  const keyOf = v => v ? v.v + ':' + (v.id || '') + (v.v === 'feed' ? ':' + S.feedTab : '') : '';

  /* ── parts ── */
  function avatar(pid, size) {
    const p = D.people[pid];
    return p.avatar ? `<img class="avatar" src="${p.avatar}" width="${size}" height="${size}" alt="">` : `<span class="avatar" style="width:${size}px;height:${size}px"></span>`;
  }
  function tk(sym, dir) {
    const lg = D.logo[sym] ? `<img class="tk-logo" src="${D.logo[sym]}" alt="">` : '<span class="tk-logo"></span>';
    const d = dir ? `<span class="dir ${dir === 'down' ? 'down' : ''}"><img src="assets/icons/arrow-up-l1.svg" alt=""></span>` : '';
    return `<span class="tk">${lg}<span>${sym}</span>${d}</span>`;
  }
  const retInline = t => t.ret ? `<span class="ret-inline"><img src="assets/icons/mini-up.svg" alt=""><span>${t.ret}</span></span>` : '';
  const saves = id => D.theses[id].saves + (S.saved[id] ? 1 : 0);
  const followBtn = pid => S.follow[pid]
    ? `<button class="btn-s" data-act="follow" data-id="${pid}">Following</button>`
    : `<button class="btn-p" data-act="follow" data-id="${pid}">Follow</button>`;
  const charts = (t, gap) => t.charts.length ? `<div class="media"><div class="media-track" style="gap:${gap}px">${t.charts.map(c => `<div class="chart"><img src="${D.chart[c]}" alt="${c} chart" loading="lazy"></div>`).join('')}</div></div>` : '';

  /* attached images and videos (not charts) — Figma 16713:126101「图片 / 视频排版规则 · App（参照 X）」.
     No grids: one row. W = from the text's left edge to 9 from the pane's right edge.
     · 1 item: as wide as W, at most 1.25W tall (a 4:5 box); taller than 4:5 keeps 1.25W and narrows, left-aligned. Never cropped.
     · 2 items: same height, side by side, filling W with an 8 gap; height = (W − 8) ÷ (r1 + r2), at most 1.25W;
       each at most 0.8W wide (wider ones are cropped). Both landscape (wider than 1:1) → the scrolling row below.
     · 3 or more: a row that scrolls right to the pane edge; its height comes from the first two only —
       height = 0.6W ÷ mean(r1, r2), held within 0.68W…1.25W; each item at that height and its own ratio, at most 0.8W wide.
     Videos follow the same rules (a play badge and the duration in the corner). Layout is measured after render. */
  const pics = (t, gap) => t.media && t.media.length ? `<div class="media pics"><div class="media-track">${t.media.map((m, k) => `<div class="pic${m.video ? ' is-video' : ''}" data-w="${m.w}" data-h="${m.h}"><img src="${m.src}" alt="${m.video ? 'Video' : 'Image'} ${k + 1}" loading="lazy">${m.video ? `<span class="pic-dur">${I('play-f', 'ic-12')}${esc(m.dur || '')}</span>` : ''}</div>`).join('')}</div></div>` : '';
  function layoutPics(el) {
    const tr = el.querySelector('.media-track'), ps = [...tr.children]; if (!ps.length) return;
    const W = tr.clientWidth - parseFloat(getComputedStyle(tr).paddingLeft) - 9; if (W <= 0) return;
    const r = ps.map(p => (+p.dataset.w || 4) / (+p.dataset.h || 3));
    let h, ws, scroll = false;
    if (ps.length === 1) { h = Math.min(W / r[0], 1.25 * W); ws = [h * r[0]]; }
    else if (ps.length === 2 && !(r[0] > 1 && r[1] > 1)) { h = Math.min((W - 8) / (r[0] + r[1]), 1.25 * W); ws = r.map(x => Math.min(h * x, 0.8 * W)); }
    else { scroll = true; h = Math.max(0.68 * W, Math.min(1.25 * W, 0.6 * W / ((r[0] + r[1]) / 2))); ws = r.map(x => Math.min(h * x, 0.8 * W)); }
    el.classList.toggle('fit', !scroll);
    el.style.height = Math.round(h) + 'px';
    ps.forEach((p, k) => { p.style.width = Math.round(ws[k]) + 'px'; p.style.height = Math.round(h) + 'px'; });
  }
  const layoutAllPics = () => app.querySelectorAll('.media.pics').forEach(layoutPics);


  /* Feed Card / Thesis */
  function card(id, ctx) {
    const t = D.theses[id], p = D.people[t.author];
    const sub = p.role || p.handle || '';
    const time = `${t.date}${t.private ? `<span class="chip-private" style="color:var(--n5)">${I('locked-l', 'ic-12')}Private</span>` : ''}`;
    const bodyText = (t.title ? '' : t.body[0]) + (t.refs && t.body.length === 1 ? ` <span class="link">${t.refs}</span>` : '');
    if (ctx.selected === id && ctx.pos === 'left') return `<article class="card sel compact" data-act="open" data-id="${id}">
      <div class="post"><div class="ident">${avatar(t.author, 32)}<div class="who-c" data-act="profile" data-id="${t.author}"><div class="nm"><span class="ell">${esc(p.name)}</span>${p.bot ? I('bot-l', 'ic-14') : ''}</div><div class="rl ell">${esc(sub)}</div></div><time>${time}</time></div>
      <p class="body clamp2">${esc(t.title || t.body[0])}</p></div></article>`;
    return `<article class="card ${ctx.selected === id ? 'sel' : ''} ${ctx.compact ? 'cmp' : ''}" data-act="open" data-id="${id}">
      <div class="post">
        <div class="ident">${avatar(t.author, 32)}<div class="who-c" data-act="profile" data-id="${t.author}"><div class="nm"><span class="ell">${esc(p.name)}</span>${p.bot ? I('bot-l', 'ic-14') : ''}</div>${ctx.compact ? '' : `<div class="rl ell">${esc(sub)}</div>`}</div><time>${time}</time></div>
        <div class="basket"><div class="tickers"><div class="tickers-track">${t.tickers.map(([s, d]) => tk(s, d)).join('')}</div></div>${retInline(t)}</div>
        ${t.title ? `<p class="t-m14">${esc(t.title)}</p>` : ''}
        <p class="body ${ctx.clamp ? 'clamp' : ''}">${t.title ? esc(t.body[0]) : bodyText}</p>
      </div>
      ${charts(t, 8)}${pics(t, 8)}
      ${ctx.compact ? '' : `<div class="acts"><button class="ask" data-act="ask" data-id="${id}">${I('chat-ai-l', 'ic-16')}Ask Alva</button>
        <button class="${S.saved[id] ? 'on' : ''}" data-act="save" data-id="${id}">${I(S.saved[id] ? 'bookmark-f' : 'bookmark-l', 'ic-16')}${saves(id)}</button></div>`}
    </article>`;
  }
  function people() {
    const pid = 'chamath', p = D.people[pid];
    return `<section class="rec" data-fk="people"><div class="rec-h"><p class="t-m16 grow ell">People you might like</p><button data-act="dismissPeople" aria-label="Dismiss">${I('close-l1', 'ic-16')}</button></div>
      <div class="rec-row" data-act="profile" data-id="${pid}">${avatar(pid, 32)}<div class="grow"><div class="ident"><div class="nm t-m14" style="display:flex;gap:4px;align-items:center"><span class="ell">${p.name}</span>${I('bot-l', 'ic-14')}</div></div><p class="t-r12 c-n5 ell">${p.role}</p></div>
        ${S.follow[pid] ? followBtn(pid) : `<button class="btn-p" data-act="follow" data-id="${pid}">${I('add-l2', 'ic-14')}Follow</button>`}</div>
      <div class="reason">${I('bulb-l', 'ic-16')}<p class="t-r14 c-n5">You’ve read about AI and growth stocks.</p></div></section>`;
  }

  /* ── views ── */
  function titleTabs(lb) {
    return `<div class="title-tabs"><button class="${lb ? '' : 'on'}" data-act="feedTab" data-id="foryou">For You</button><button class="${lb ? 'on' : ''}" data-act="feedTab" data-id="leaderboard">Leaderboard</button></div>`;
  }
  const feedIds = () => D.feed.filter(id => id === 'people' ? !S.peopleDismissed && S.topic === 'All' : S.topic === 'All' || (D.theses[id].topics || []).includes(S.topic));
  const lbIds = () => { const ids = D.leaderboard.slice(); if (S.period === '1D') ids.reverse(); if (S.period === '30D') ids.push(ids.shift()); return ids; };

  function feedView(v, ctx) {
    if (S.feedTab === 'leaderboard') {
      const head = `<div class="lb-head">${titleTabs(true)}<div class="lb-pills">${['1D', '7D', '30D', 'All'].map(p => `<button class="pill ${S.period === p ? 'on' : ''}" data-act="period" data-id="${p}">${p}</button>`).join('')}</div>
        <button class="rules" data-act="rules">${I('explain-l', 'ic-14')}<span>Ranking rules</span></button></div>`;
      const body = lbIds().map((id, i) => {
        const t = D.theses[id];
        return `<article class="lb-row ${ctx.selected === id ? 'sel' : ''}" data-act="open" data-id="${id}"><div class="lb-rank">${i + 1}</div>
          <div class="lb-mid"><div class="lb-who">${avatar(t.author, 20)}<span class="ell">${esc(D.people[t.author].name)}</span></div><p class="lb-title">${esc(t.title)}</p>
          <div class="lb-tks">${t.tickers.map(([s, d]) => tk(s, d)).join('')}${t.more ? `<span class="tk more">+${t.more}</span>` : ''}</div></div><div class="lb-ret">${t.lb}</div></article>`;
      }).join('') + '<div style="height:56px"></div>';
      return { head, body };
    }
    const head = `${titleTabs(false)}<div class="feed-head"><div class="pill-rail"><div class="pill-track">${D.topics.map(t => `<button class="pill ${S.topic === t ? 'on' : ''}" data-act="topic" data-id="${t}">${t}</button>`).join('')}</div><button class="browse" data-act="toast" data-id="All categories">${I('arrow-down-l2', 'ic-12')}</button></div></div>`;
    const body = feedIds().map(id => id === 'people' ? people() : card(id, ctx)).join('') + '<div style="height:56px"></div>';
    return { head, body };
  }

  /* Thesis return / Top chart — the Figma plot, x scaled to the pane */
  function retChart(t, w) {
    const C = window.RET_CHART, k = w / C.w;
    const areas = C.segs.map((d, i) => `<path d="${d} V40 H${C.x[i]} Z" fill="url(#rg)"/>`).join('');
    const lines = C.segs.map(d => `<path d="${d}" stroke="#2A9B7D" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>`).join('');
    const dots = C.dots.map(([x, y, f]) => `<i class="au-dot ${f ? 'sel' : 'ring'}" style="left:${(x * k - 3).toFixed(2)}px;top:${(y - 3).toFixed(2)}px"></i>`).join('');
    return `<svg width="${w}" height="40" viewBox="0 0 ${C.w} 40" preserveAspectRatio="none"><defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#2A9B7D" stop-opacity=".22"/><stop offset="1" stop-color="#2A9B7D" stop-opacity="0"/></linearGradient></defs>${areas}${lines}</svg>${dots}`;
  }

  function detailView(v, ctx) {
    const t = D.theses[v.id], p = D.people[t.author];
    const back = ctx.back ? `<button class="back-app" data-act="${ctx.backAct || 'back'}" aria-label="Back">${I('arrow-left-l1')}</button>` : '';
    const head = `<header class="author-bar ${ctx.back ? 'with-back' : ''}">${back}<div class="who" data-act="profile" data-id="${t.author}">${avatar(t.author, 32)}<div class="who-t"><b class="ell">${esc(p.name)}</b><span class="ell">${esc(p.role || p.handle || '')}</span></div></div>${t.author === 'me' ? '' : followBtn(t.author)}</header>`;
    const ret = t.ret ? `<div class="ret-top"><div class="v">${t.ret}</div><div class="ret-chart">${retChart(t, Math.max(120, ctx.w - 36))}</div><div class="ret-axis"><span>${t.since}</span><span>Now</span></div></div>` : '';
    const dtks = (t.detailTickers || t.tickers).map(([s, d]) => tk(s, d)).join('');
    const paras = t.body.map((x, i) => `<p>${esc(x)}${i === t.body.length - 1 && t.refs ? ` ${t.refs}` : ''}</p>`).join('');
    const upd = `<div class="upd"><div class="rail-l">${t.history ? `<img src="assets/icons/dot-green.svg" width="14" height="14" alt="">` : ''}${t.history ? '<span class="line"></span>' : ''}</div>
      <div class="upd-c"><div class="upd-time">${t.date}<span class="latest">Latest</span>${t.private ? `<span class="chip-private" style="color:var(--n5)">${I('locked-l', 'ic-12')}Private</span>` : ''}</div>
      <div class="upd-tks">${dtks}</div><div class="upd-body">${paras}</div>${charts(t, 12)}${pics(t, 12)}</div></div>`;
    const hist = t.history ? `<div class="hist"><div class="rail-l"><span class="line"></span><img src="assets/icons/dot.svg" width="14" height="14" alt=""></div>
      <button class="view-all" data-act="updates" data-id="${v.id}">View all updates${I('arrow-right-l2', 'ic-12')}</button></div>` : '<div class="no-hist"></div>';
    const tabs = `<div class="d-tabs"><button data-act="toast" data-id="Overview is not part of this demo">Overview</button><button class="on">${I('live-l', 'ic-16')}Signals</button><button data-act="toast" data-id="Related thesis is not part of this demo">Related thesis</button></div>`;
    const sigs = t.signals ? `<div class="sig-list">${t.signals.map(sg => `<div class="sig"><div class="quote-blk"><div class="ident"><img class="avatar" src="${sg.avatar}" width="32" height="32" alt=""><div class="who-c"><p class="t-m14">${sg.who}</p><p class="t-r12 c-n5 ell">${esc(sg.role)}</p></div><time>${sg.time}</time></div>
        <p class="t-r14">${esc(sg.quote)} <span class="link">${sg.link}</span></p></div>
        <div class="alva-p"><div class="stance"><span class="a ${sg.stance ? 'l' : ''}"><img src="assets/icons/logo-portrait.svg" alt="" style="border-radius:50%"></span>${sg.stance ? `<span class="s">${sg.stance}</span>` : ''}</div><p style="text-indent:${sg.stance ? 77 : 30}px">${esc(sg.take)}</p></div>
        <div class="fb">${I('like-l', 'ic-16')}${I('close-l1', 'ic-16')}</div></div>`).join('')}</div>`
      : '<div class="sig-list"><p class="sig-empty">Signal monitoring hasn’t been run for this thesis yet.</p></div>';
    const title = t.title ? `<h2 class="d-title">${esc(t.title)}</h2>` : '';
    const body = `${ret}${title}${upd}${hist}${tabs}${sigs}<div style="height:106px"></div>`;
    const saveGroup = `<div class="g-save glass"><button class="${S.saved[v.id] ? 'on' : ''}" data-act="save" data-id="${v.id}">${I(S.saved[v.id] ? 'bookmark-f' : 'bookmark-l')}${saves(v.id)}</button><button class="share" data-act="toast" data-id="Share sheet">${I('share-l')}</button></div>`;
    const after = ctx.askOpen
      ? `<div class="d-actions only-save">${saveGroup}</div>`
      : `<div class="d-actions"><button class="g-ask glass" data-act="ask" data-id="${v.id}">${I('chat-ai-l')}Ask Alva</button>${saveGroup}</div>`;
    return { head, body, after };
  }

  function chatView(v, ctx) {
    const fromThesis = v.id !== 'tab';
    const log = S.chats[v.id] || (S.chats[v.id] = [{ who: 'a', text: D.greeting.join('\n') }]);
    let left = '<span class="side"></span>', right = '<span class="side"></span>';
    const btn = (act, ic, label) => `<button class="side glass-rail" data-act="${act}" aria-label="${label}">${I(ic)}</button>`;
    /* 11-26: a conversation from a thesis keeps Close beside Alva, both on the left (the drawer has no
       Close: tap the dimmed page). Expand / Collapse always sit on Alva's row, at the right (never in the rail);
       beside a thesis with a rail, the rail's Back closes Ask. The Alva tab page keeps Chat history; the rail takes it there. */
    const page = ctx.chatMode === 'page' && !v.full;   // its own page on narrow windows: Back is in the rail
    const lead = fromThesis && !page;
    if (lead) {
      left = (ctx.chatMode === 'overlay' || ctx.askTile) && !v.full ? '' : btn('closeChat', 'close-l1', 'Close Ask Alva');   // beside a thesis with a rail, the rail's Back closes it
      right = v.full ? btn('foldChat', 'foldd-l', 'Restore page and conversation') : btn('expandChat', 'unfold-l', 'Expand conversation');
    } else if (!fromThesis && !ctx.listBeside) left = btn('chatList', 'menu-l', 'Chat history');   // 11-26: top left, beside Alva, also next to a rail
    if (page && ctx.railTask) left = right = '<span class="side"></span>';
    const head = ctx.noHead ? '' : `<header class="chat-h ${v.full ? 'full' : ''}${lead ? ' lead' : ''}">${left}<div class="mid"><div class="capsule glass-rail"><img src="assets/icons/logo-portrait.svg" alt="">Alva</div></div>${right}</header>`;
    const msgs = `<div class="t-div">11:48 PM</div>` + log.map((m, i) => m.who === 'a'
      ? `<div class="bub-a"><div class="${m.typing && i === log.length - 1 ? 'typing' : ''}">${esc(m.shown != null ? m.shown : m.text)}</div></div>`
      : `<div class="bub-u">${esc(m.text)}</div>`).join('');
    let quote = '';
    if (fromThesis && !S.quoteOff[v.id]) {
      const t = D.theses[v.id];
      const first = (t.title || t.body[0]).split(/(?<=\.)\s/)[0];
      quote = `<div class="q-text"><span class="q-bar"></span><p>${esc(D.people[t.author].name)}: “${esc(first)}”</p><button type="button" data-act="unquote" data-id="${v.id}" aria-label="Remove quote">${I('close-l1', 'ic-14')}</button></div>`;
    }
    const box = `<div class="chatbox-f"><form class="chatbox" data-chat="${v.id}">${quote}<div class="in-row"><button type="button" class="sq" data-act="toast" data-id="Attachments">${I('add-l2', 'ic-16')}</button><textarea name="q" rows="1" autocomplete="off" placeholder="Ask Alva, hold to talk"></textarea><button type="button" class="sq voice" data-act="toast" data-id="Hold to talk">${I('voice-wave-l', 'ic-16')}</button><button type="submit" class="send" aria-label="Send">${I('arrow-up-l1', 'ic-16')}</button></div></form></div>`;
    return { chat: `<div class="chat">${head}<div class="chat-body">${msgs}</div>${box}</div>` };
  }

  /* Chat list (Figma A2 17318:27790): Alva on top, then the user's channels; New channel; search at the bottom.
     11-26: on the inner screen the Alva tab shows it beside the conversation (book: one half each). */
  const CHANNELS = [
    { id: 'tab', name: 'Alva', time: '12m ago', text: 'Today is ready. Five updates across your theses.', alva: true },
    { id: 'nvda', name: 'NVDA demand', time: '1h ago', text: 'A watchpoint you set was hit. I drafted an update to your thesis.', badge: 2 },
    { id: 'ipo', name: 'Anthropic IPO', time: '1d ago', text: 'You: How much of the IPO is already in AMZN’s mark?' },
    { id: 'hbm', name: 'HBM pricing', time: '3d ago', text: 'Which price series should I follow, spot or contract?' },
  ];
  function chatsView(v, ctx) {
    const row = c => `<button class="ch-row${c.id === 'tab' ? ' on' : ''}" data-act="${c.id === 'tab' ? 'chatListClose' : 'toast'}" data-id="${c.id === 'tab' ? '' : 'Channels are not part of this demo'}">
      <span class="ch-av">${c.alva ? '<img src="assets/icons/logo-portrait.svg" alt="">' : '<img src="assets/icons/logo-channel.svg" alt="">'}${c.badge ? `<i class="ch-badge">${c.badge}</i>` : ''}</span>
      <span class="ch-main"><span class="ch-line"><b class="${c.alva ? 'm' : ''}">${esc(c.name)}</b><em>${c.time}</em></span><span class="ch-prev">${esc(c.text)}</span></span></button>`;
    /* 11-26: beside the conversation the window's Alva bar (≡ + Alva) sits above the list, so the list starts at 84.
       When the conversation has moved aside (narrow windows), its ≡ goes with it — so the list keeps a ≡ of its own
       in the same place, at the window's top left: tap ≡ to open, tap ≡ in the same spot to close. */
    const head = ctx.under ? `<header class="ch-head"><button class="side glass-rail on" data-act="chatListClose" aria-label="Hide chats" aria-pressed="true">${I('menu-l')}</button><span class="ch-title">Chats</span></header>` : '';
    return { chat: `<div class="chats">${head}<div class="ch-list">${row(CHANNELS[0])}<p class="ch-sec">Channels</p>${CHANNELS.slice(1).map(row).join('')}
      <button class="ch-new" data-act="toast" data-id="New channel is not part of this demo">${I('chat-new-l', 'ic-18')}New channel</button></div>
      <div class="ch-search"><span>Search conversations</span></div></div>` };
  }

  /* All updates (Figma 16511:126971): header · version return · timeline */
  function auChart(plotW) {
    const C = window.AU_CHART, k = plotW / C.w;
    const col = { up: '#2A9B7D', down: '#E05357', sel: '#2A9B7D' };
    const segs = C.segs.map((g, i) => {
      const area = `<path d="${g.d} V32 H${g.x0} Z" fill="url(#aug${i})"${g.c === 'sel' ? '' : ' opacity=".5"'}/>`;
      const line = `<path d="${g.d}" stroke="${col[g.c]}" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"${g.c === 'sel' ? '' : ' opacity=".22"'}/>`;
      return { area, line, grad: `<linearGradient id="aug${i}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${col[g.c]}" stop-opacity="${g.c === 'sel' ? .5 : .16}"/><stop offset="1" stop-color="${col[g.c]}" stop-opacity="${g.c === 'sel' ? .1 : 0}"/></linearGradient>` };
    });
    const dots = C.dots.map(([x, y, c]) => c === 'sel'
      ? `<i class="au-dot sel" style="left:${(x * k - 3).toFixed(2)}px;top:${(y - 3).toFixed(2)}px"></i>`
      : `<i class="au-dot ${c}" style="left:${(x * k - 3).toFixed(2)}px;top:${(y - 3).toFixed(2)}px"></i>`).join('');
    return `<div class="au-plot" style="width:${plotW}px"><svg width="${plotW}" height="32" viewBox="0 0 ${C.w} 32" preserveAspectRatio="none"><defs>${segs.map(s => s.grad).join('')}</defs>${segs.map(s => s.area).join('')}${segs.map(s => s.line).join('')}</svg>${dots}</div>`;
  }
  function updatesView(v, ctx) {
    const U = D.updates, W = ctx.w, flush = ctx.flushPlot;
    const th = D.theses[v.id] || D.theses.gavin, [uS, uD] = th.tickers[0] || ['GOOGL', 'up'], uChart = D.chart[uS];
    const head = ctx.back
      ? `<header class="au-bar with-back"><button class="back-app" data-act="back" aria-label="Back">${I('arrow-left-l1')}</button><p class="t-r16 ell">All updates</p></header>`
      : `<header class="au-bar"><p class="t-r16 ell">All updates</p></header>`;
    const plotW = flush ? W - 20 : W - 36;
    const ret = `<div class="au-ret"><div class="au-ret-h"><span class="c-n5">${U.range}</span><span class="c-m3">${U.ret}</span></div>
      <div class="au-ret-c" style="padding-left:${flush ? 0 : 20}px">${auChart(plotW)}</div><div class="au-axis"><span>${U.since}</span><span>Now</span></div></div>`;
    const items = U.list.map(u => `<div class="au-item ${u.last ? 'last' : ''}"><div class="au-rail"><img src="assets/icons/${u.latest ? 'dot-green' : 'dot'}.svg" width="14" height="14" alt="">${u.last ? '' : '<span class="line"></span>'}</div>
      <div class="au-c"><div class="upd-time">${u.date}${u.latest ? '<span class="latest">Latest</span>' : ''}</div><div class="upd-tks">${tk(uS, uD || 'up')}</div>
      <p class="au-body">${u.body.map(esc).join('<br>')} ${u.ref === 'link' ? '<span class="link">[1]</span>' : '[1]'}</p>
      ${uChart ? `<div class="au-charts"><div class="chart"><img src="${uChart}" alt="${uS} chart" loading="lazy"></div></div>` : ''}</div></div>`).join('');
    return { head: head + ret, body: `<div class="au-list">${items}</div><div style="height:40px"></div>` };
  }

  function tickRow([s, n, px, ch, venue]) {
    const lg = D.tlogo[s] || D.logo[s];
    return `<div class="tick" data-act="toast" data-id="${s} ticker page is not part of this demo">${lg ? `<img class="lg" src="${lg}" alt="">` : '<span class="lg"></span>'}
      <div class="bd"><div class="l1"><b>${s}</b><i>${n}</i></div><div class="l2">${venue === 'US Stock' ? '<img class="exch" src="assets/img/venue-us.png" alt="">' : '<span class="exch"></span>'}${venue}</div></div>
      <div class="rt"><div>${px}</div><div class="${ch[0] === '+' ? 'c-m3' : 'c-m4'}">${ch}</div></div></div>`;
  }
  function searchView(v, ctx) {
    const W = ctx.w;
    const head = `<div class="title-bar"><p class="t-m24">Search</p></div>`;
    const input = `<div class="s-entry" style="${S.q ? 'padding-bottom:12px' : ''}"><label class="s-input ${S.q ? 'active' : ''}">${I('search-l', 'ic-16')}<input id="q" value="${esc(S.q)}" placeholder="Search tickers or people" autocomplete="off">${S.q ? `<button class="clr" data-act="clearQ" aria-label="Clear">${I('close-f2', 'ic-16')}</button>` : ''}</label></div>`;
    let body;
    if (!S.q) {
      const inner = W - 36;
      const colW = inner >= 564 ? 270 : inner;
      const cols = [D.trending.slice(0, 3), D.trending.slice(3, 6), D.trending.slice(6, 9)];
      const pc = inner >= 552 ? 3 : 2;
      const recent = S.recent.map(r => `<div class="r-tag"><span class="lbl" data-act="${D.people[r] ? 'profile' : 'toast'}" data-id="${D.people[r] ? r : r + ' ticker page is not part of this demo'}">${D.people[r] ? avatar(r, 16) : (D.logo[r] ? `<img class="tk-logo" src="${D.logo[r]}" alt="">` : '')}<span class="ell">${D.people[r] ? D.people[r].name : r}</span></span><button class="x" data-act="unrecent" data-id="${r}" aria-label="Remove">${I('close-l1', 'ic-14')}</button></div>`).join('');
      body = `${input}<div class="s-mods ${S.recent.length ? '' : 'no-recent'}">
        ${S.recent.length ? `<div><div class="s-heading"><span class="grow">Recent</span><button data-act="clearRecent">Clear</button></div><div class="recent">${recent}</div></div>` : '<div></div>'}
        <div><div class="s-heading plain">Trending tickers</div><div class="tick-cols">${cols.map(c => `<div class="tick-col" style="width:${colW}px">${c.map(tickRow).join('')}</div>`).join('')}</div></div>
        <div><div class="s-heading plain">People to follow</div><div class="people-grid" style="grid-template-columns:repeat(${pc},minmax(0,1fr))">${D.peopleToFollow.map(pid => { const p = D.people[pid]; return `<div class="pcard" data-act="profile" data-id="${pid}"><div class="pcard-top">${avatar(pid, 32)}${followBtn(pid)}</div><div><div class="pc-name"><p class="t-m14 ell">${p.name}</p>${p.bot ? I('bot-l', 'ic-14') : ''}</div><p class="pc-role">${p.bot ? p.handle : p.role}</p></div></div>`; }).join('')}</div></div>
      </div>`;
    } else {
      const q = S.q.toLowerCase();
      const ppl = Object.keys(D.people).filter(pid => pid !== 'me' && D.people[pid].name.toLowerCase().includes(q));
      const tks = D.trending.filter(([s, n]) => s.toLowerCase().includes(q) || n.toLowerCase().includes(q));
      const tabs = `<div class="s-tabs"><button class="${S.searchTab === 'watchlist' ? 'on' : ''}" data-act="searchTab" data-id="watchlist">Watchlist</button><button class="${S.searchTab === 'people' ? 'on' : ''}" data-act="searchTab" data-id="people">People</button></div>`;
      const rows = S.searchTab === 'people'
        ? (ppl.length ? ppl.map(pid => { const p = D.people[pid]; return `<div class="person ${ctx.selected === pid ? 'sel' : ''}" data-act="profile" data-id="${pid}"><div>${avatar(pid, 32)}<div class="grow"><p class="t-m14 ell">${p.name}</p><p class="t-r12 c-n5 ell">${p.handle || p.role}</p></div>${followBtn(pid)}</div></div>`; }).join('') : `<p class="empty-res">No people match “${esc(S.q)}”</p>`)
        : (tks.length ? `<div style="padding:0 16px 0 20px">${tks.map(tickRow).join('')}</div>` : `<p class="empty-res">No tickers match “${esc(S.q)}”</p>`);
      body = input + tabs + rows;
    }
    return { head, body };
  }

  function profileHead(pid) {
    const p = D.people[pid];
    const ch = (p.socials || []).map(([k, h], i) => `${i ? '<span class="vdiv"></span>' : ''}<span><img src="assets/icons/${k === 'x' ? 'x-color' : 'telegram-color'}.svg" alt="">${h}</span>`).join('');
    const name = pid === 'me'
      ? `<p class="t-r18 nowrap">${p.name}</p><span class="credits"><span class="plan">Pro</span><span class="num">${I('credit-l', 'ic-12')}${p.credits}</span></span>`
      : `<p class="t-r18 nowrap">${esc(p.name)}</p>${p.pro ? '<span class="tag-pro">Pro</span>' : ''}`;
    return `<div class="p-head"><div class="p-id">${avatar(pid, 56)}<div class="grow"><div class="p-name"><div class="p-name grow">${name}</div>${pid === 'me' ? `<button data-act="toast" data-id="Edit profile" class="c-n5">${I('edit-l1', 'ic-16')}</button>` : ''}</div>
        <div class="p-meta"><span>${p.handle || ''}</span>${p.joined ? `<span class="vdiv"></span><span>${p.joined}</span>` : ''}</div></div></div>
      <div class="p-follow"><span>${p.followers || '18.6K'} followers</span><span>${p.following || '212'} following</span></div>
      <div class="p-bio"><p>${esc(p.bio || p.role || '')}</p>${ch ? `<div class="p-ch">${ch}</div>` : ''}</div></div>`;
  }
  function profileView(v, ctx) {
    const pid = v.id;
    const head = `<header class="prof-bar"><div class="left">${ctx.back ? `<button class="back-app" data-act="back" aria-label="Back">${I('arrow-left-l1')}</button>` : ''}</div><div class="grow"></div><div class="right">${followBtn(pid)}<button class="icon-btn" data-act="toast" data-id="Share sheet">${I('share-l')}</button></div></header>`;
    const ids = D.profileTheses[pid] || [];
    const body = profileHead(pid) + `<div class="u-tabs"><button class="on">Active</button><button data-act="toast" data-id="Archived">Archived</button></div>`
      + (ids.length ? ids.map(id => card(id, { pos: ctx.pos, selected: ctx.selected })).join('') : '<p class="empty-res">No public theses yet.</p>') + '<div style="height:64px"></div>';
    return { head, body };
  }
  function meView(v, ctx) {
    const head = `<header class="me-bar"><p class="t-m24 grow ell">Me</p><button class="invite" data-act="toast" data-id="Invite friends">${I('user-circle-plus-l', 'ic-14')}Invite</button>
      <button class="icon-btn" data-act="toast" data-id="Share profile">${I('share-l')}</button><button class="icon-btn" data-act="toast" data-id="Inbox">${I('inbox-l')}<span class="unread"></span></button><button class="icon-btn" data-act="settings">${I('settings-l')}</button></header>`;
    const kyb = `<div class="kyb-wrap"><div class="kyb"><div class="kyb-h"><p class="t-m14 grow">Let Alva know you better</p><span class="kyb-prog"><i class="on"></i><i></i><i></i></span><span class="c-n5">${I('arrow-up-l2', 'ic-14')}</span></div>
        <div class="kyb-step"><img src="assets/icons/x-36.svg" width="36" height="36" alt=""><div class="grow"><p class="t-m14">Your X account</p><p class="t-r12 c-n5 ell">Bring in people you already follow</p></div><button class="go" data-act="toast" data-id="Connect X">${I('arrow-right-l1', 'ic-14')}</button></div>
        <div class="kyb-step"><span class="lg">${I('bot-l')}</span><div class="grow"><p class="t-m14">Your AI agent</p><p class="t-r12 c-n5 ell">Claude, Codex, Grok bot, Muse and more</p></div><button class="go" data-act="toast" data-id="Connect an agent">${I('arrow-right-l1', 'ic-14')}</button></div></div>
      <div class="pf"><div class="pf-l"><div class="t"><span class="t-r12 c-n5">Portfolio value</span><img src="assets/img/profile-imgNameAlpaca.svg" alt=""><span class="bn"><img src="assets/img/profile-imgBinanceMark.svg" alt=""></span></div><p class="pf-v">$104,030.41</p></div>
        <div class="pf-r"><span class="t-r12 c-n5">Allocation</span><div class="alloc"><i style="flex:70.2"></i><i style="flex:39;opacity:.6"></i><i style="flex:46.8;opacity:.3"></i></div><span class="t-r12 c-n5">BTC 45% · ETH 25% · +2</span></div></div></div>`;
    const tabs = ['Thesis', 'Saved', 'Watchlist', 'Playbooks'];
    let list;
    if (S.profTab === 'Thesis') list = `<div class="status-chips"><button class="pill on">Active</button><button class="pill">Archived</button></div>` + D.profileTheses.me.map(id => card(id, { pos: ctx.pos, selected: ctx.selected, compact: true })).join('');
    else if (S.profTab === 'Saved') { const ids = Object.keys(S.saved).filter(k => S.saved[k]); list = ids.length ? ids.map(id => card(id, { pos: ctx.pos, selected: ctx.selected, clamp: true })).join('') : '<p class="empty-res">Theses you bookmark appear here.</p>'; }
    else list = `<p class="empty-res">${S.profTab} is empty in this demo.</p>`;
    const body = profileHead('me') + kyb + `<div class="u-tabs">${tabs.map(t => `<button class="${S.profTab === t ? 'on' : ''}" data-act="profTab" data-id="${t}">${t}</button>`).join('')}</div>${list}<div style="height:109px"></div>`;
    return { head, body };
  }
  /* Settings (Figma ST/01–05): level one, Account, General */
  const IC = (file, cls = '') => `<i class="ic ${cls}" style="--i:url(${(window.ICONS && ICONS[file.replace(/\.svg$/, '')]) || 'assets/icons/' + file})"></i>`;
  const SET_ROWS = [
    ['Account & services', [['account', 'me-l.svg', 'Account'], ['usage', 'usage-l.svg', 'Usage'], ['agent', 'chat-ai-l.svg', 'Alva Agent']]],
    ['Preferences', [['general', 'settings-l.svg', 'General']]],
    ['Support', [['contact', 'mail-l.svg', 'Contact us']]],
  ];
  function setHead(title, ctx) {
    return ctx.back
      ? `<header class="set-bar with-back"><button class="back-app" data-act="back" aria-label="Back">${I('arrow-left-l1')}</button><p class="t-r16 ell">${title}</p></header>`
      : `<header class="set-bar"><p class="t-r16 ell">${title}</p></header>`;
  }
  function settingsView(v, ctx) {
    const sel = ctx.selected;
    const row = ([id, ic, label]) => {
      const live = id === 'account' || id === 'general';
      return `<div class="set-row ${sel === id ? 'sel' : ''}" data-act="${live ? 'setPage' : 'toast'}" data-id="${live ? id : label + ' is not part of this demo'}"><div class="in">${IC(ic)}<span class="grow">${label}</span><img class="chev" src="assets/icons/arrow-right-l2.svg" alt=""></div></div>`;
    };
    const body = SET_ROWS.map(([h, rows]) => `<p class="set-h">${h}</p>${rows.map(row).join('')}`).join('')
      + `<div class="set-social"><button data-act="toast" data-id="Discord">${IC('icon-discord.svg')}</button><button data-act="toast" data-id="Telegram">${IC('icon-telegram.svg', 'tg')}</button><button data-act="toast" data-id="X">${IC('ui-social-x.svg')}</button></div>`
      + `<p class="set-h other">Other</p><div class="set-row" data-act="toast" data-id="Log out is not part of this demo"><div class="in">${IC('ui-logout-l.svg')}<span class="grow">Log out</span></div></div><div style="height:40px"></div>`;
    return { head: setHead('Settings', ctx), body };
  }
  const sw = id => `<button class="switch ${S.sw[id] ? 'on' : ''}" data-act="switch" data-id="${id}" aria-label="Toggle"><i></i></button>`;
  function accountView(v, ctx) {
    const body = `<div class="acc-id"><div class="acc-av"><img src="assets/img/avatar-sheer.png" alt=""><span class="acc-edit">${I('edit-l1', 'ic-12')}</span></div>
        <div><div class="acc-name"><span>Sheer</span><span class="tag-pro">Pro</span><span class="tag-annual">Annual</span></div><div class="p-meta"><span>@sheer</span><span class="vdiv"></span><span>Joined 12/23/2025</span></div></div></div>
      <label class="acc-l">Nickname</label><input class="acc-in" value="Sheer">
      <label class="acc-l" style="margin-bottom:12px">User Info</label><textarea class="acc-ta" placeholder="Introduce about yourself..."></textarea>
      <p class="acc-l soc">Social accounts</p><p class="acc-d">Choose which accounts appear on your public profile.</p>
      <div class="acc-list">
        <div class="acc-row">${IC('ui-social-x.svg')}<span class="n">X (Twitter)</span><span class="h">@sheer_lee</span>${sw('x')}</div>
        <div class="acc-row"><img class="lg" src="assets/icons/telegram-color.svg" alt=""><span class="n">Telegram</span><span class="h">Sheerruan</span>${sw('tg')}</div>
        <div class="acc-row"><span class="lg dc">${IC('icon-discord.svg', 'ic-12')}</span><span class="n">Discord</span><span class="h">sheer-ruan</span>${sw('dc')}</div>
      </div>
      <p class="acc-sign">Sign-in methods</p><p class="acc-d" style="margin-bottom:16px">Manage  third-party accounts for signing in to Alva.</p>
      <div class="acc-list">
        <div class="acc-row"><img class="lg" src="assets/icons/gmail.svg" alt=""><span class="n">Gmail</span><span class="h">sheer@alva.xyz</span></div>
        <div class="acc-row"><span class="lg mail">${IC('mail-l.svg')}</span><span class="n">Email</span><span class="h">sheer@alva.xyz</span><button class="disc" data-act="toast" data-id="Disconnect">Disconnect</button></div>
        <div class="acc-row">${IC('ui-social-x.svg')}<span class="n">X (Twitter)</span><span class="h">@sheer_lee</span><button class="disc" data-act="toast" data-id="Disconnect">Disconnect</button></div>
        <div class="acc-row"><img class="lg" src="assets/icons/telegram-color.svg" alt=""><span class="n">Telegram</span><span class="h">Sheerruan</span><button class="disc" data-act="toast" data-id="Disconnect">Disconnect</button></div>
      </div><div style="height:40px"></div>`;
    return { head: setHead('Account', ctx), body };
  }
  function generalView(v, ctx) {
    const sel = (ic, label, val) => `<div class="gen-row" data-act="toast" data-id="${label} is not part of this demo">${IC(ic)}<span class="grow">${label}</span><span class="val">${val}</span><img class="chev" src="assets/icons/arrow-right-l2.svg" alt=""></div>`;
    const tog = (ic, idc, label, desc, link) => { const [id, tight] = idc.split(' '); return `<div class="gen-row tall">${IC(ic)}<div class="grow"><p>${label}</p><p class="d">${desc}</p>${link ? `<p class="lnk" ${tight ? 'style="margin-top:0"' : ''}>${link}</p>` : ''}</div>${sw(id)}</div>`; };
    const body = `<div class="gen-list">${sel('ui-language-l.svg', 'Language', 'English')}${sel('ui-mode-night-l.svg', 'Appearance', 'System')}
      ${tog('onboarding-notification-l.svg', 'notif', 'Notifications', 'Price alerts, mentions, and product updates', 'Open system settings')}
      ${tog('security-l.svg', 'improve tight', 'Help improve Alva', 'Feature usage, crash reports and chats', 'Learn how Alva uses your data')}
      ${tog('chat-ai-l.svg', 'ai', 'Allow AI to process your content', 'Messages, context and Automation tasks')}</div>`;
    return { head: setHead('General', ctx), body };
  }

  const EMPTY = {
    search: ['Nothing selected', 'Search, or pick a ticker or person on the left to see it here.'],
    me: ['No thesis selected', 'Open one of your theses on the left to read it here.'],
    chat: ['Nothing open', 'What Alva opens in the conversation appears here.'],
    profile: ['No thesis selected', 'Open a thesis on the left to read it here.'],
  };
  function renderView(v, ctx) {
    switch (v.v) {
      case 'feed': return feedView(v, ctx);
      case 'detail': return detailView(v, ctx);
      case 'chat': return chatView(v, ctx);
      case 'chats': return chatsView(v, ctx);
      case 'search': return searchView(v, ctx);
      case 'profile': return profileView(v, ctx);
      case 'me': return meView(v, ctx);
      case 'updates': return updatesView(v, ctx);
      case 'settings': return settingsView(v, ctx);
      case 'account': return accountView(v, ctx);
      case 'general': return generalView(v, ctx);
      case 'empty': return { empty: `<div class="empty"><div><b>${v.t}</b><span>${v.s}</span></div></div>` };
    }
    return { body: '' };
  }

  /* ── layout ── */
  function autoFirst() {
    const ids = S.feedTab === 'leaderboard' ? lbIds() : feedIds().filter(x => x !== 'people');
    return ids.length ? { v: 'detail', id: ids[0], auto: true } : null;
  }
  const emptyOf = v => { const e = EMPTY[v.v] || EMPTY.chat; return { v: 'empty', t: e[0], s: e[1] }; };
  /* A conversation opened from a thesis that takes the whole content (a page on narrow windows, or
     expanded) is a task page: the rail drops the destinations and Create and carries the chat's own
     controls — Back on top, Collapse under it when expanded; the content keeps only the Alva capsule
     on top and the chat box at the bottom. */
  function chatTask(P) { return !!(P.L.rail && P.panes.length === 1 && P.panes[0].view.v === 'chat' && P.panes[0].view.id !== 'tab' && !P.sheet); }
  /* 11-26: the chat's own header buttons move into the rail wherever the chat sits against it.
     task — a full-content chat from a thesis: Back (+ Collapse when expanded), no tabs or Create.
     (the drawer is modal: the scrim covers the rail as well, and Expand stays at the drawer's top right)
     tile — Ask beside a thesis, next to a right-hand rail: Close and Expand on top, tabs and Create stay.
     (the Alva tab page keeps Chat history at its top left, beside Alva) */
  function railCtl(P) {
    const r = P.L.rail; if (!r) return null;
    const BTN = { close: ['closeChat', 'close-l1', 'Close Ask Alva'], expand: ['expandChat', 'unfold-l', 'Expand conversation'], fold: ['foldChat', 'foldd-l', 'Restore page and conversation'], hist: ['toast', 'menu-l', 'Chat history', 'Chat history is not part of this demo'] };
    if (chatTask(P)) return { kind: 'task', full: !!P.panes[0].view.full, items: [] };   // 11-26: Close beside Alva, Collapse on Alva's row at the right
    if (P.sheet) return null;   // 11-26: the drawer is modal — the scrim covers the rail too; Expand sits at the drawer's top right
    const last = P.panes[P.panes.length - 1];
    /* 11-26: Ask beside a thesis — the rail keeps Back (closes Ask); Expand sits at the chat's top right */
    return null;
  }
  function plan() {
    const P = planBase();
    { const st = stack(); P.alvaRoot = st.length === 1 && st[0].v === 'chat' && st[0].id === 'tab'; P.canBeside = P.L.mode === 'two' || P.L.mode === 'book'; P.push = P.alvaRoot && S.chatList && !P.canBeside ? Math.min(382, P.CW - 56) : 0; }
    P.OX = P.L.rail && P.L.rail.left ? 84 : 0;
    /* A rail that cannot hold everything (PiP: 473 tall, status on top) compresses the way the
       system's own bars do (HIG, iPhone Duo › compression): Back and Create keep their places and
       the tab group minimises to one button showing the current tab; tapping it opens the group
       upward, choosing a tab closes it. Nothing leaves the column. */
    const r = P.L.rail;
    if (r && !r.left && !r.flip) {
      const c = railCtl(P), n = (P.railBack ? 1 : 0) + (c && c.kind !== 'sheet' && c.kind !== 'task' ? c.items.length : 0);
      if (n) P.tabsMin = r.top + n * 62 + 48 + 14 + 212 + r.bottom > innerHeight;
    }
    if (P.OX) P.panes.forEach(p => { p.x += P.OX; });
    return P;
  }
  const LIST_ROOTS = ['feed', 'search', 'me'];   // roots whose list stays on the left and shows its selection
  function planBase() {
    const L = LAYOUTS[stateId()];
    const st = stack(), t = st[st.length - 1], below = st[st.length - 2];
    const W = innerWidth, CW = L.rail ? (L.rail.left ? W - 84 : L.rail.x) : W;
    const SETW = { 'outer-landscape': [240, 240, 354], 'inner-portrait': [260, 260, 409], 'inner-landscape': [382, 382, 485], 'book': [455.5, 495.5, 371.5], 'pip': [382, 382, 485], 'pip-portrait': [260, 260, 409], 'book-portrait': [260, 260, 409] }[stateId()];
    const setTop = t.v === 'settings' || ((t.v === 'account' || t.v === 'general') && below && below.v === 'settings');
    if (setTop && SETW) {
      const left = t.v === 'settings' ? t : below, right = t.v === 'settings' ? { v: 'account', auto: true } : t;
      return { L, CW, panes: [
        { view: left, x: 0, w: SETW[0], pos: 'left', leftBack: true, sel: right.v },
        { view: right, x: SETW[1], w: SETW[2], pos: 'right' },
      ] };
    }
    if (L.mode === 'single') {
      if (t.v === 'chat' && t.id !== 'tab' && !t.full && L.alva === 'overlay' && below)
        return { L, CW, panes: [{ view: below, x: 0, w: CW, pos: 'main' }], sheet: { view: t, w: L.tabbar ? 485 : 440 }, railBack: !!L.rail, inlineBack: !L.rail && st.length > 2 };
      return { L, CW, panes: [{ view: t, x: 0, w: CW, pos: 'main', chatMode: 'page' }], railBack: st.length > 1 && !!L.rail, inlineBack: st.length > 1 && !L.rail };
    }
    if (L.mode === 'book-v') {
      /* half-folded, held upright: the list on the top half, what it opens on the bottom half */
      const [a1, b1] = L.fold, H = innerHeight;
      if (t.v === 'chat' && t.full) return { L, CW, panes: [{ view: t, x: 0, w: CW, pos: 'center', chatMode: 'page' }] };
      let top, bot;
      if (st.length === 1) { top = t; bot = t.v === 'feed' ? (autoFirst() || emptyOf(t)) : emptyOf(t); }
      else if (t.v !== 'chat' && LIST_ROOTS.includes(st[0].v)) { top = st[0]; bot = t; }
      else if (t.v === 'updates' && st.length >= 3) { top = st[st.length - 3]; bot = t; }
      else { top = below; bot = t; }
      return { L, CW, panes: [
        { view: top, x: 0, w: CW, y: 0, h: a1, pos: 'left', leftBack: st.indexOf(top) > 0, askOpen: bot.v === 'chat' },
        { view: bot, x: 0, w: CW, y: b1, h: H - b1, pos: 'right', chatMode: 'tile' },
      ] };
    }
    const book = L.mode === 'book';
    /* 11-26: a conversation filling the content keeps its header at the page's top left; only the messages and the box stay in the 600 column */
    if (t.v === 'chat' && t.full) return { L, CW, panes: [{ view: t, x: 0, w: CW, pos: 'center', chatMode: 'page', narrow: true }], railBack: true };
    let left, right;
    if (st.length === 1) {
      if (t.v === 'chat' && S.listWide !== false) { left = { v: 'chats' }; right = t; }   // Alva tab: the chat list beside the conversation (open by default, ≡ closes it)
      else if (t.v === 'chat' && book) { left = t; right = emptyOf(t); }
      else if (t.v === 'chat') return { L, CW, panes: [{ view: t, x: 0, w: CW, pos: 'center', chatMode: 'page', narrow: true }] };
      else if (t.v === 'feed') { left = t; right = autoFirst() || emptyOf(t); }
      else if (book) { left = t; right = emptyOf(t); }
      else if (t.v === 'chat') return { L, CW, panes: [{ view: t, x: 0, w: CW, pos: 'center', chatMode: 'page', narrow: true }] };
      else { const w = Math.min(600, CW); return { L, CW, panes: [{ view: t, x: (CW - w) / 2, w, pos: 'center', chatMode: 'page' }] }; }
    } else if (t.v === 'chat') { left = below; right = t; }        // Ask Alva sits beside the thesis it asks about
    else if (LIST_ROOTS.includes(st[0].v)) { left = st[0]; right = t; }   // the list stays; only the right column moves on
    else if (t.v === 'updates' && st.length >= 3) { left = st[st.length - 3]; right = t; }
    else { left = below; right = t; }
    const leftIdx = st.indexOf(left);
    const listSel = left === st[0] && LIST_ROOTS.includes(left.v) && st[1] ? st[1].id : null;
    let lw, rx, rw;
    if (book) { lw = 455.5; rx = 495.5; rw = CW - 495.5; }
    else if (right.v === 'chat' && left.v !== 'chats') { lw = 485; rx = 485; rw = CW - 485; }
    else if (right.v === 'profile') { lw = 382; rx = 382.5; rw = CW - 383; }   // Figma: the profile column is 484, the last 0.5 belongs to the divider
    else { lw = 382; rx = 382; rw = CW - 382; }
    /* 11-26: Ask beside a thesis with a rail — the rail's Back closes Ask; the thesis column drops its own back */
    const askTile = !!L.rail && right.v === 'chat' && right.id !== 'tab';
    return { L, CW, askTile, railBack: askTile || t.v === 'updates' || (left === st[0] && st.length > 2), panes: [
      { view: left, x: 0, w: lw, pos: 'left', leftBack: !askTile && leftIdx > 0, askOpen: right.v === 'chat', sel: listSel },
      { view: right, x: rx, w: rw, pos: 'right', chatMode: 'tile' },
    ] };
  }

  function paneHTML(pn, P, depth) {
    const L = P.L, padR = L.corner ? '140px' : null;
    const selected = pn.sel || (pn.pos === 'left' && P.panes[1] ? P.panes[1].view.id : null);
    const ctx = { w: pn.w, pos: pn.pos, selected, clamp: pn.pos === 'left', chatMode: pn.chatMode, askOpen: pn.askOpen, flushPlot: !!L.corner,
      back: (P.inlineBack && pn.pos === 'main') || pn.leftBack, askTile: !!P.askTile, noHead: !!P.alvaRoot, listBeside: P.panes.some(q => q.view.v === 'chats'), railTask: chatTask(P) || (() => { const c = railCtl(P); return !!c && c.pos === pn.pos; })() };
    const out = renderView(pn.view, ctx);
    const k = keyOf(pn.view);
    /* right stroke of a content column: between list and detail, and (Figma: content | rail is the content's own right stroke) next to the rail, except a chat column */
    const lastCol = pn === P.panes[P.panes.length - 1];
    const edge = ((pn.pos === 'left' && P.panes.length > 1 && L.mode !== 'book' && pn.view.v !== 'chats' /* the Alva tab draws its own full-height divider */) || (L.rail && !L.rail.left && lastCol && pn.view.v !== 'chat' && pn.x + pn.w === L.rail.x)) ? 'edge-r'
      : (L.rail && L.rail.left && pn.x === P.OX && pn.view.v !== 'chat') ? 'edge-l' : '';
    const vars = `${padR && (L.mode === 'book-v' ? pn.pos === 'left' : pn.pos !== 'left') ? `--pad-r:${padR};` : ''}${L.tabbar && depth === 1 ? '--box-b:100px;' : ''}${L.mode === 'book-v' && L.tabbar && depth === 1 && pn.pos === 'right' ? '--bar-b:100px;' : ''}`;
    const under = P.alvaRoot && !P.push && (pn.view.v === 'chats' || pn.view.v === 'chat' || pn.view.v === 'empty');   // below the window's Alva bar
    const style = `left:${pn.x}px;width:${pn.w}px;${pn.h != null ? `top:${pn.y}px;bottom:auto;height:${pn.h}px;` : ''}${under ? 'top:84px;' : ''}${vars}`;
    const cls = `pane ${edge}${pn.narrow && pn.w > 600 ? ' narrow' : ''}`;
    const dp = `data-pos="${pn.pos}" data-key="${esc(k)}"`;
    const html = (out.chat || out.empty)
      ? `<section class="${cls}" ${dp} style="${style}">${out.chat || out.empty}</section>`
      : `<section class="${cls}" ${dp} style="${style}">${out.head || ''}<div class="scroll" data-sk="${S.tab}|${k}">${out.body}</div>${out.after || ''}</section>`;
    return { html, key: k };
  }

  let lastKeys = {}, lastDepth = 1, lastTab = S.tab;
  const scrolls = new Map();
  function render() {
    root.dataset.layout = stateId();
    app.querySelectorAll('[data-sk]').forEach(el => scrolls.set(el.dataset.sk, el.scrollTop));
    const qEl = document.activeElement && document.activeElement.id === 'q' ? document.activeElement.selectionStart : null;
    const ae = document.activeElement;
    const chatFocus = ae && ae.form && ae.form.classList.contains('chatbox') ? ae.form.dataset.chat : null;
    const drafts = {};
    app.querySelectorAll('form.chatbox').forEach(f => { drafts[f.dataset.chat] = f.q.value; });

    const P = plan(), L = P.L, depth = stack().length;
    const pushed = depth > lastDepth && S.tab === lastTab, popped = depth < lastDepth && S.tab === lastTab;
    const padR = L.corner ? '140px' : null;
    let html = '';
    const keys = {};
    P.panes.forEach(pn => { const o = paneHTML(pn, P, depth); keys[pn.pos] = o.key; html += o.html; });
    if (P.sheet) {
      const SW = P.sheet.w, out = renderView(P.sheet.view, { w: SW, chatMode: 'overlay', railTask: false });
      /* The drawer is modal: the scrim covers the page and the rail; where the rail is on the right the
         drawer runs on over it to the screen edge, so only the chat and its Close are left to use. */
      const ext = L.rail && !L.rail.left ? innerWidth - (P.OX + P.CW) : 0;
      html += `<div class="scrim" data-act="closeChat"></div><section class="pane sheet${ext ? ' has-ext' : ''}" style="left:${P.OX + P.CW - SW}px;width:${SW}px;top:0;--box-b:24px;--ext:${ext}px;${L.corner ? '--pad-r:140px;' : ''}${lastKeys.sheet ? 'animation:none;' : ''}">${out.chat}</section>`;
      keys.sheet = keyOf(P.sheet.view);
    }
    if (L.rail) html += rail(P);
    if (L.tabbar && depth === 1) html += tabbar();
    /* Chat list as an overlay where it is not beside the conversation (window narrower than 382 + 400, upright
       Book excluded): like Mail on iPad in portrait, it slides over from the leading edge above a dimmed page;
       tap the dimmed part to close. */
    let push = 0, veil = '';
    if (P.alvaRoot) {
      /* 11-26: ≡ and Alva stay at the window's top left whatever sits below (one column or list | chat);
         ≡ opens and closes the list */
      const open = P.panes.some(q => q.view.v === 'chats') || (S.chatList && !P.canBeside);
      if (S.chatList && !P.canBeside) {
        /* like the phone (Figma A2): the conversation page moves aside — bar, chat and Tab Bar together, rounded 40,
           under a white veil — and the list lies underneath it on the left; tap the veil to go back */
        push = P.push;
        html = `<section class="pane ch-under" style="left:${P.OX}px;width:${push}px;top:0">${chatsView({}, { w: push, under: true }).chat}</section>` + html;
        veil = `<div class="push-veil" data-act="chatListClose" style="left:${P.OX}px;width:${P.CW}px"></div>`;
      }
      /* 11-26: list | chat — the divider runs the full height, through the window bar */
      const lp = P.panes.find(q => q.view.v === 'chats');
      const div = lp && L.mode !== 'book' ? `<i class="alva-div" style="left:${P.OX + lp.x + lp.w}px"></i>` : '';
      html += `<header class="alva-bar${L.corner ? ' corner' : ''}" style="left:${P.OX}px;width:${P.CW}px"><button class="side glass-rail${open ? ' on' : ''}" data-act="chatList" aria-label="${open ? 'Hide chats' : 'Show chats'}" aria-pressed="${open}">${I('menu-l')}</button><div class="capsule glass-rail"><img src="assets/icons/logo-portrait.svg" alt="">Alva</div></header>` + div + veil;
    }
    if (S.pop) html += popover(P);
    if (S.toast) html += `<div class="toast" style="left:${P.OX + P.CW / 2}px">${esc(S.toast)}</div>`;

    /* keep the outgoing layers so iOS transitions can play between the two */
    const old = {};
    app.querySelectorAll(':scope > section.pane[data-pos], :scope > .nav-clip > section.pane[data-pos].nav-new').forEach(el => { old[el.dataset.pos] = el; el._x = el.offsetLeft; el._w = el.offsetWidth; el._scroll = [...el.querySelectorAll('.scroll, .chat-body')].map(x => x.scrollTop); });
    const oldLayers = {};
    /* rail controls before the change: each one that stays glides to its new place, the ones that go fade out, new ones grow in */
    const oldRail = new Map();
    app.querySelectorAll(':scope > .rail-btn, :scope > .rail-tabs').forEach(el => oldRail.set(railKey(el), { el, x: el.offsetLeft, y: el.offsetTop }));
    const railLayout = root.dataset.layout;
    ['.sheet', '.scrim', '.bsheet', '.pop', '.tabbar', '.fab'].forEach(sel => { const el = app.querySelector(':scope > ' + sel); if (el) oldLayers[sel] = el; });
    const oldLens = lensPos();
    /* list rows in the left column, to animate a selection that changes their size */
    const oldRows = new Map();
    const oldLeft = app.querySelector(':scope > section.pane[data-pos="left"]');
    if (oldLeft) oldLeft.querySelectorAll('.scroll [data-act="open"][data-id], .scroll [data-act="profile"][data-id].row-item').forEach(el => oldRows.set(el.dataset.act + ':' + el.dataset.id, { el, h: el.offsetHeight }));
    const oldLeftKey = lastKeys.left, oldLayout = lastLayout;
    /* the Alva tab's list opening / closing beside the conversation */
    const listMove = S.listAnim ? (() => { const l = [...app.querySelectorAll(':scope > section.pane')].find(e => e.querySelector(':scope > .chats')), c = [...app.querySelectorAll(':scope > section.pane')].find(e => e.querySelector(':scope > .chat')), d = app.querySelector(':scope > .alva-div');
      return { l, lw: l ? l.offsetWidth : 0, d, c: c && { x: c.offsetLeft, w: c.offsetWidth } }; })() : null;
    S.listAnim = false;
    const oldUnder = app.querySelector(':scope > .ch-under'), pushWas = lastPush;
    app.innerHTML = html;
    app.classList.toggle('alva-push', !!push); app.style.setProperty('--push', push + 'px');
    /* 11-26: the conversation page moving aside for the chat list (or coming back) slides — page, bar, Tab Bar and ＋ together */
    if (push !== pushWas && P.alvaRoot && root.dataset.layout === lastLayout) {
      const E = { duration: 420, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'none' };
      const tx = v => `translateX(${v}px)`;
      app.querySelectorAll(':scope > section.pane[data-pos="main"], :scope > .alva-bar, :scope > .tabbar, :scope > .fab').forEach(el => {
        const f = { transform: [tx(pushWas), tx(push)] };
        if (el.matches('section.pane')) { f.borderRadius = [pushWas ? '40px' : '0px', push ? '40px' : '0px']; f.boxShadow = [pushWas ? '0 0 25px rgba(0,0,0,.12)' : '0 0 25px rgba(0,0,0,0)', push ? '0 0 25px rgba(0,0,0,.12)' : '0 0 25px rgba(0,0,0,0)']; }
        M.play(el, f, E);
      });
      const veil = app.querySelector(':scope > .push-veil');
      if (veil) M.play(veil, { opacity: [0, 1], transform: [tx(0), tx(push)] }, E);
      if (!push && oldUnder) {   // closing: the list stays underneath until the page has covered it
        oldUnder.style.pointerEvents = 'none'; app.insertBefore(oldUnder, app.firstChild);
        setTimeout(() => oldUnder.remove(), 430);
      }
    }
    lastPush = push;
    /* Expand / Collapse: the drawer itself spreads to the full page (or the page draws back into the drawer) — one surface, no exit and re-entry */
    if (S.morph) {
      const m = S.morph; S.morph = null;
      const el = app.querySelector(':scope > .sheet') || [...app.querySelectorAll(':scope > section.pane')].find(p => p.querySelector(':scope > .chat'));
      if (el) {
        el.style.animation = 'none';
        const to = { left: el.offsetLeft + 'px', width: el.offsetWidth + 'px', borderRadius: getComputedStyle(el).borderRadius };
        el.style.zIndex = 8;
        M.play(el, [{ left: m.left + 'px', width: m.width + 'px', borderRadius: m.radius }, to], { duration: 460, easing: 'cubic-bezier(.32,.72,0,1)' }).finished.then(() => el.style.removeProperty('z-index')).catch(() => {});
        const sc = app.querySelector(':scope > .scrim');
        if (sc) sc.style.animation = 'fadeIn 0.46s cubic-bezier(.32,.72,0,1) both';
        if (m.under && !sc) { m.under.removeAttribute('data-pos'); m.under.style.pointerEvents = 'none'; app.insertBefore(m.under, app.firstChild); setTimeout(() => m.under.remove(), 480); }
        if (sc) {} else if (m.scrim) { m.scrim.style.animation = 'none'; m.scrim.style.pointerEvents = 'none'; app.insertBefore(m.scrim, el); M.play(m.scrim, [{ opacity: 1 }, { opacity: 0 }], { duration: 460, easing: 'cubic-bezier(.32,.72,0,1)' }).finished.then(() => m.scrim.remove()).catch(() => m.scrim.remove()); }
      }
    }
    if (listMove) {
      const E = { duration: 420, easing: 'cubic-bezier(.32,.72,0,1)' };
      const l = [...app.querySelectorAll(':scope > section.pane')].find(e => e.querySelector(':scope > .chats'));
      const c = [...app.querySelectorAll(':scope > section.pane')].find(e => e.querySelector(':scope > .chat'));
      const d = app.querySelector(':scope > .alva-div');
      if (c && listMove.c) M.play(c, [{ left: listMove.c.x + 'px', width: listMove.c.w + 'px' }, { left: c.offsetLeft + 'px', width: c.offsetWidth + 'px' }], E);
      if (l) {   // opening: the list slides in from the leading edge, the divider with it
        M.play(l, [{ transform: `translateX(-${l.offsetWidth}px)` }, { transform: 'none' }], E);
        if (d) M.play(d, [{ transform: `translateX(-${l.offsetWidth}px)` }, { transform: 'none' }], E);
      } else if (listMove.l) {   // closing: the old list (and its divider) slide out, then go
        const o = listMove.l, od = listMove.d, w = listMove.lw;
        o.removeAttribute('data-pos'); o.style.pointerEvents = 'none'; o.style.zIndex = 2; app.insertBefore(o, app.querySelector(':scope > .alva-bar'));
        M.play(o, [{ transform: 'none' }, { transform: `translateX(-${w}px)` }], E).finished.then(() => o.remove()).catch(() => o.remove());
        if (od) { app.appendChild(od); M.play(od, [{ transform: 'none' }, { transform: `translateX(-${w}px)` }], E).finished.then(() => od.remove()).catch(() => od.remove()); }
      }
    }
    layoutAllPics();

    app.querySelectorAll('[data-sk]').forEach(el => { if (scrolls.has(el.dataset.sk)) el.scrollTop = scrolls.get(el.dataset.sk); });
    app.querySelectorAll('.chat-body').forEach(el => { el.scrollTop = el.scrollHeight; });
    app.querySelectorAll('form.chatbox').forEach(f => { if (drafts[f.dataset.chat]) { f.q.value = drafts[f.dataset.chat]; growBox(f.q); } });
    if (chatFocus) { const f = app.querySelector(`form.chatbox[data-chat="${chatFocus}"]`); if (f) f.q.focus({ preventScroll: true }); }
    if (qEl != null) { const q = document.getElementById('q'); if (q) { q.focus(); q.setSelectionRange(qEl, qEl); } }
    /* navigation push / pop per column, like UINavigationController */
    const idxs = {};
    /* two columns moving one step along the stack (the detail opens Ask Alva beside it, or that is
       closed again): the whole pair travels sideways together — the column that stays visible slides
       into its new place, the one leaving goes off the edge, the new one comes in from the other */
    let shifted = false;
    if (!skipNav && S.tab === lastTab && old.left && old.right && keys.left && keys.right) {
      const fwd = keys.left === lastKeys.right && keys.left !== lastKeys.left;
      const back = !fwd && keys.right === lastKeys.left && keys.right !== lastKeys.right;
      if (fwd || back) { shiftColumns(fwd, old); shifted = true; }
    }
    P.panes.forEach(pn => {
      const idx = stack().indexOf(pn.view);
      idxs[pn.pos] = idx;
      if (shifted) return;
      const was = lastIdx[pn.pos];
      if (!skipNav && old[pn.pos] && lastKeys[pn.pos] !== keys[pn.pos] && S.tab === lastTab && idx >= 0 && idx === was && pn.pos === 'right') {
        /* same place in the stack, another item (a new row chosen on the left): the column swaps in place */
        const el = app.querySelector(`:scope > section.pane[data-pos="right"]`), ghost = old.right;
        if (el && ghost) {
          ghost.style.pointerEvents = 'none';
          ghost.removeAttribute('data-pos');
          app.insertBefore(ghost, el);
          M.play(el, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'backwards' });
          const g = M.play(ghost, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'forwards' });
          (g ? g.finished : Promise.resolve()).catch(() => {}).then(() => ghost.remove());
        }
        return;
      }
      if (skipNav || !old[pn.pos] || lastKeys[pn.pos] === keys[pn.pos] || S.tab !== lastTab || idx < 0 || was == null || was < 0 || idx === was) return;
      const el = app.querySelector(`:scope > section.pane[data-pos="${pn.pos}"]`);
      if (el) navTransition(old[pn.pos], el, idx > was ? 'push' : 'pop', pn.x, pn.w);
    });
    /* layers that went away leave the way iOS dismisses them */
    Object.entries(oldLayers).forEach(([sel, el]) => {
      if (app.querySelector(':scope > ' + sel) || skipNav) return;
      app.appendChild(el);
      el.style.animation = 'none';
      el.style.pointerEvents = 'none';
      let a;
      if (sel === '.sheet') a = M.play(el, [{ transform: 'none' }, { transform: `translateX(calc(100% + ${el.style.getPropertyValue('--ext') || '0px'}))` }], M.SHEET_OUT);
      else if (sel === '.bsheet') a = M.play(el, [{ transform: 'none' }, { transform: 'translateY(100%)' }], M.SHEET_OUT);
      else if (sel === '.pop') a = M.play(el, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.92)' }], { duration: 200, easing: 'ease-out' });
      else if (sel === '.tabbar' || sel === '.fab') a = M.play(el, [{ translate: '0 0', opacity: 1 }, { translate: (sel === '.tabbar' ? -0.3 * 400 : -0.3 * P.CW) + 'px 0', opacity: 0 }], M.NAV);
      else a = M.play(el, [{ opacity: 1 }, { opacity: 0 }], M.SHEET_OUT);
      if (a) a.finished.then(() => el.remove()).catch(() => el.remove()); else el.remove();
    });
    if (lastTab !== S.tab || (oldLens && oldLens.tab !== S.tab)) moveLens(oldLens);
    /* split layouts: choosing a row compacts it (and the one left behind opens back up) — the row's
       height travels between the two, the old content fading out over the new */
    if (oldRows.size && keys.left === oldLeftKey && oldLayout === root.dataset.layout && !root.dataset.duoAnim) {
      const left = app.querySelector(':scope > section.pane[data-pos="left"]');
      /* where the chosen row ends up, measured on the final layout before anything moves */
      const chosen = left && left.querySelector('.scroll .sel[data-act][data-id]');
      if (chosen) { const o = oldRows.get(chosen.dataset.act + ':' + chosen.dataset.id); if (o && !o.el.classList.contains('sel')) scrollTween(chosen, 420); }
      if (left) left.querySelectorAll('.scroll [data-act="open"][data-id], .scroll [data-act="profile"][data-id].row-item').forEach(el => {
        const o = oldRows.get(el.dataset.act + ':' + el.dataset.id);
        if (!o) return;
        const h = el.offsetHeight;
        if (Math.abs(h - o.h) < 1) return;
        const ghost = o.el;
        ghost.classList.add('row-ghost');
        ghost.style.cssText = 'position:absolute;left:0;right:0;top:0;margin:0;pointer-events:none;';
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(ghost);
        const opt = { duration: 420, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'none' };
        const kids = [...el.children].filter(c => c !== ghost);
        const grow = h > o.h;
        const anims = [M.play(el, [{ height: o.h + 'px' }, { height: h + 'px' }], opt),
          M.play(ghost, [{ opacity: 1 }, { opacity: 0 }], Object.assign({}, opt, { duration: grow ? 200 : 300, easing: 'ease-out', fill: 'forwards' })),
          ...kids.map(k => M.play(k, [{ opacity: 0 }, { opacity: 1 }], Object.assign({}, opt, { duration: 260, delay: grow ? 60 : 120, easing: 'ease-out', fill: 'backwards' })))];
        Promise.all(anims.map(x => x && x.finished.catch(() => {}))).then(() => { ghost.remove(); el.style.removeProperty('position'); el.style.removeProperty('overflow'); });
      });
    }
    /* tab bar comes back with the page it belongs to */
    if (!skipNav && S.tab === lastTab && !oldLayers['.tabbar'] && depth < lastDepth) ['.tabbar', '.fab'].forEach(sel => { const el = app.querySelector(':scope > ' + sel); if (el) M.play(el, [{ translate: (sel === '.tabbar' ? -120 : -0.3 * P.CW) + 'px 0', opacity: 0 }, { translate: '0 0', opacity: 1 }], Object.assign({}, M.NAV, { fill: 'none' })); });
    /* rail: one motion for everything on it (11-26) — Create no longer jumps when Back comes or goes, since they
       sit in different groups; what moves glides, what leaves fades and shrinks, what arrives grows in */
    if (L.rail && railLayout === lastLayout && !root.dataset.duoAnim) {
      const sp = M.spring(0.42, 0.8), seen = new Set();
      app.querySelectorAll(':scope > .rail-btn, :scope > .rail-tabs').forEach(el => {
        const k = railKey(el), o = oldRail.get(k);
        seen.add(k);
        if (o) {
          const dx = o.x - el.offsetLeft, dy = o.y - el.offsetTop;
          if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) M.play(el, [{ translate: `${dx}px ${dy}px` }, { translate: '0 0' }], Object.assign({}, sp, { fill: 'none' }));
        } else M.play(el, [{ scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1 }], Object.assign({}, sp, { fill: 'backwards' }));
      });
      oldRail.forEach((o, k) => {
        if (seen.has(k)) return;
        const g = o.el; g.style.pointerEvents = 'none'; app.appendChild(g);
        const a = M.play(g, [{ scale: 1, opacity: 1 }, { scale: 0.5, opacity: 0 }], { duration: 220, easing: 'ease-in', fill: 'forwards' });
        (a ? a.finished : Promise.resolve()).catch(() => {}).then(() => g.remove());
      });
    }
    /* 11-26: anything that moves — a page sliding aside or back, two columns travelling together, a drawer spreading or
       drawing back — passes UNDER the rail rather than being cut off by it: while it moves the rail goes see-through
       (its controls stay on top), then comes back once everything has settled */
    railThru();
    lastKeys = keys; lastDepth = depth; lastTab = S.tab; lastIdx = idxs; skipNav = false; lastLayout = root.dataset.layout;
    if (parent !== window) parent.postMessage({ type: 'duo:page', slug: pageSlug() }, '*');
    if (window.__applyHead) window.__applyHead();
    snapText();
    kbSync();
  }
  let lastIdx = {}, skipNav = false, lastLayout = null, lastPush = 0;
  function railThru() {
    if (!app.querySelector(':scope > .rail')) return;
    const moving = [...app.children].filter(el => !/\brail/.test(el.className)).flatMap(el => el.getAnimations ? el.getAnimations({ subtree: true }) : [])
      .filter(a => a.playState === 'running' || a.playState === 'pending');
    if (!moving.length) return;
    app.classList.add('rail-thru');
    const tok = railThru.tok = (railThru.tok || 0) + 1;
    Promise.all(moving.map(a => a.finished.catch(() => {}))).then(() => { if (railThru.tok === tok) app.classList.remove('rail-thru'); });
    setTimeout(() => { if (railThru.tok === tok) app.classList.remove('rail-thru'); }, 900);   // never stays on
  }
  const railKey = el => el.classList.contains('rail-tabs') ? 'tabs' : el.classList.contains('rail-tabmin') ? 'tabmin' : el.classList.contains('rail-create') ? 'create' : el.getAttribute('aria-label') === 'Back' ? 'back' : (el.dataset.act || '') + ':' + (el.dataset.id || '') + ':' + (el.getAttribute('aria-label') || '');
  /* the conversation's box (drawer, tile or full page) before Expand / Collapse, so the same surface can grow or shrink into place */
  function chatBox() {
    const el = app.querySelector(':scope > .sheet') || [...app.querySelectorAll(':scope > section.pane')].find(p => p.querySelector(':scope > .chat'));
    if (!el) return null;
    const scrim = app.querySelector(':scope > .scrim');
    const under = el.classList.contains('sheet') ? app.querySelector(':scope > section.pane[data-pos="main"]') : null;   // the page under the drawer stays put while the drawer grows over it
    return { left: el.offsetLeft, width: el.offsetWidth, radius: getComputedStyle(el).borderRadius, scrim, under };
  }
  function shiftColumns(fwd, old) {
    const opt = { duration: 460, easing: 'cubic-bezier(.32,.72,0,1)' };
    const nl = app.querySelector(':scope > section.pane[data-pos="left"]'), nr = app.querySelector(':scope > section.pane[data-pos="right"]');
    if (!nl || !nr) return;
    const moved = fwd ? nl : nr, from = fwd ? old.right : old.left, ghost = fwd ? old.left : old.right, incoming = fwd ? nr : nl;
    const mx = moved.offsetLeft, mw = moved.offsetWidth, d = mx - from._x;           // how far the pair travels
    /* one curve, one clock, all on the compositor: the column that stays only translates (it keeps its
       width); only if its width really changes does it fall back to animating its box */
    if (Math.abs(mw - from._w) < 1) M.play(moved, [{ transform: `translateX(${from._x - mx}px)` }, { transform: 'none' }], opt);
    else M.play(moved, [{ left: from._x + 'px', width: from._w + 'px' }, { left: mx + 'px', width: mw + 'px' }], opt);
    [moved, ghost, incoming].forEach(p => { p.style.willChange = 'transform'; setTimeout(() => p.style.removeProperty('will-change'), opt.duration + 50); });
    ghost.removeAttribute('data-pos');
    ghost.style.pointerEvents = 'none';
    app.insertBefore(ghost, app.firstChild);
    [...ghost.querySelectorAll('.scroll, .chat-body')].forEach((x, i) => { x.scrollTop = (ghost._scroll || [])[i] || 0; });
    const g = M.play(ghost, [{ transform: 'none' }, { transform: `translateX(${d}px)` }], Object.assign({ fill: 'forwards' }, opt));
    (g ? g.finished : Promise.resolve()).catch(() => {}).then(() => ghost.remove());
    M.play(incoming, [{ transform: `translateX(${-d}px)` }, { transform: 'none' }], opt);
  }

  /* which gallery row the app is showing now, so the list can follow */
  function pageSlug() {
    const st = stack(), top = st[st.length - 1];
    if (S.tab === 'alva') return 'alva';
    if (S.tab === 'search') return st.some(x => x.v === 'profile') ? 'search-results' : 'search';
    if (S.tab === 'me') {
      if (st.some(x => x.v === 'general')) return 'settings-general';
      if (st.some(x => x.v === 'settings' || x.v === 'account')) return 'settings';
      return 'me';
    }
    if (S.feedTab === 'leaderboard' && st.length === 1) return 'leaderboard';
    if (top.v === 'chat') return 'ask-alva';
    if (top.v === 'updates') return 'all-updates';
    if (st.length > 1) return 'thesis';
    return S.feedTab === 'leaderboard' ? 'leaderboard' : 'for-you';
  }

  /* the chosen row must sit wholly inside its list: the list scrolls there on the
     same clock as the rows change size (target measured on the final layout) */
  const bez = (x1, y1, x2, y2) => t => {        // cubic-bezier easing
    let u = t;
    for (let i = 0; i < 6; i++) { const x = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u - t; const dx = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2); if (Math.abs(dx) < 1e-6) break; u -= x / dx; u = Math.min(1, Math.max(0, u)); }
    return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
  };
  const EASE_IOS = bez(0.32, 0.72, 0, 1);
  function scrollTween(el, ms) {
    const sc = el.closest('.scroll');
    if (!sc) return;
    const r = el.getBoundingClientRect(), v = sc.getBoundingClientRect();
    let d = 0;
    if (r.top < v.top) d = r.top - v.top;
    else if (r.bottom > v.bottom) d = Math.min(r.bottom - v.bottom, r.top - v.top);
    if (!d) return;
    const from = sc.scrollTop, to = Math.max(0, Math.min(sc.scrollHeight - sc.clientHeight, from + d)), t0 = performance.now();
    const step = now => { const t = Math.min(1, (now - t0) / ms); sc.scrollTop = from + (to - from) * EASE_IOS(t); if (t < 1 && sc.isConnected) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  function navTransition(oldEl, newEl, dir, x, w) {
    const clip = document.createElement('div');
    clip.className = 'nav-clip';
    clip.style.left = x + 'px';
    clip.style.width = w + 'px';
    app.insertBefore(clip, newEl);
    const newScroll = [...newEl.querySelectorAll('.scroll, .chat-body')].map(e => e.scrollTop);
    oldEl.style.left = '0px'; newEl.style.left = '0px';
    oldEl.classList.add('nav-old'); newEl.classList.add('nav-new');
    oldEl.style.pointerEvents = 'none';
    const dim = document.createElement('div');
    dim.className = 'nav-dim';
    if (dir === 'push') clip.append(oldEl, dim, newEl); else clip.append(newEl, dim, oldEl);
    const restore = (el, vals) => (vals || []).forEach((v, i) => { const s = el.querySelectorAll('.scroll, .chat-body')[i]; if (s) s.scrollTop = v; });
    restore(oldEl, oldEl._scroll); restore(newEl, newScroll);
    const top = dir === 'push' ? newEl : oldEl, under = dir === 'push' ? oldEl : newEl;
    top.classList.add('nav-top');
    const f = (a, b) => dir === 'push' ? [a, b] : [b, a];
    const anims = [
      M.play(top, f({ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }), M.NAV),
      M.play(under, f({ transform: 'translateX(0)' }, { transform: 'translateX(-30%)' }), M.NAV),
      M.play(dim, f({ opacity: 0 }, { opacity: 1 }), M.NAV),
    ];
    clip._done = () => {
      if (!clip.isConnected) return;
      const vals = [...newEl.querySelectorAll('.scroll, .chat-body')].map(e => e.scrollTop);
      anims.forEach(a => a && a.cancel());
      newEl.classList.remove('nav-new', 'nav-top');
      newEl.style.left = x + 'px';
      app.insertBefore(newEl, clip);
      clip.remove();
      restore(newEl, vals);
    };
    Promise.all(anims.map(a => a && a.finished)).then(clip._done).catch(() => {});
    return { clip, top, under, dim, anims };
  }

  /* ── tab bar lens (Liquid Glass): slides to the new tab and stretches on the way ── */
  function lensPos() {
    const lens = app.querySelector('.tab-lens');
    if (!lens) return null;
    const r = lens.getBoundingClientRect();
    return { x: r.left, y: r.top, tab: lens.dataset.tab };
  }
  function moveLens(from) {
    const lens = app.querySelector('.tab-lens');
    if (!lens || !from) return;
    const r = lens.getBoundingClientRect();
    const dx = from.x - r.left, dy = from.y - r.top;
    if (Math.abs(dx) + Math.abs(dy) < 1) return;
    const sp = M.spring(0.48, 0.72);
    const vertical = Math.abs(dy) > Math.abs(dx);
    M.play(lens, [{ translate: `${dx}px ${dy}px` }, { translate: '0px 0px' }], Object.assign({}, sp, { fill: 'none' }));
    const st = vertical ? ['1 1', '0.9 1.22', '1 1'] : ['1 1', '1.18 0.9', '1 1'];
    M.play(lens, [{ scale: st[0] }, { scale: st[1], offset: 0.32 }, { scale: st[2] }], { duration: Math.min(560, sp.duration), easing: 'ease-out', fill: 'none' });
  }
  /* Figma sizes hug-width text boxes to whole pixels (rounded up); the
     browser keeps the fraction. Snap the chips and tabs that sit in a row so
     their neighbours land where Figma puts them. */
  const rng = document.createRange();
  function textW(el) {
    let w = 0;
    el.childNodes.forEach(n => { if (n.nodeType === 3 && n.textContent.trim()) { rng.selectNodeContents(n); w += rng.getBoundingClientRect().width; } });
    return w;
  }
  /* Figma's 2-line quote keeps word wrap on line 1 and cuts line 2 by
     character with an ellipsis; CSS line-clamp cuts at a word. */
  function clampQuote() {
    app.querySelectorAll('.q-text p').forEach(p => {
      const full = p.dataset.full || p.textContent;
      p.dataset.full = full;
      p.textContent = full;
      const tn = p.firstChild; if (!tn) return;
      const r = document.createRange();
      r.setStart(tn, 0); r.setEnd(tn, 1);
      const top0 = r.getBoundingClientRect().top;
      let cut = -1;
      for (let i = 1; i < full.length; i++) {
        r.setStart(tn, i); r.setEnd(tn, i + 1);
        if (r.getBoundingClientRect().top > top0 + 4) { cut = i; break; }
      }
      if (cut < 0) return;
      p.innerHTML = '';
      p.append(full.slice(0, cut));
      const l2 = document.createElement('span');
      l2.className = 'q-l2';
      l2.textContent = full.slice(cut);
      p.append(l2);
    });
  }
  function snapText() {
    clampQuote();
    app.querySelectorAll('.pill, .tk > span:not(.dir), .title-tabs button, .r-tag .lbl > span, .rr-cur, .rr-k, .acc-name > span:first-child, .acc-row .n, .lb-ret, .rules span, .s-tabs button span, .u-tabs button').forEach(el => {
      el.style.width = '';
      const w = textW(el);
      if (!w) return;
      const cs = getComputedStyle(el);
      const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      el.style.width = (Math.ceil(w - 0.05) + pad) + 'px';
      el.style.flex = 'none';
    });
  }

  const TABS = [['foryou', 'for-you', 'For You'], ['alva', 'chat-ai', 'Alva'], ['search', 'search', 'Search'], ['me', 'me', 'Me']];
  const tabIcon = (n, on) => n === 'search' ? (on ? 'search-f1' : 'search-l1') : n === 'chat-ai' ? (on ? 'chat-ai-f' : 'chat-ai-l') : n + (on ? '-f' : '-l');
  function rail(P) {
    /* The rail, top to bottom: (camera) → status → Back … the tab group → Create.
       Only Back sits up top; the destinations and Create share the bottom group, Create last,
       like the Tab Bar's ＋ beside the tabs. The selected tab's icon is brand green (m1). */
    const r = P.L.rail;
    const RX = r.left ? 24 : 12;   // controls sit 12 from the screen edge, centred under the camera
    const x = r.x + RX;
    let out = `<div class="rail" style="left:${r.x}px"></div>`;
    const c = railCtl(P);
    const ctlBtns = (items, top, z) => items.map(([act, ic, label, id], k) => `<button class="rail-btn glass-rail" style="left:${x}px;top:${top + k * 62}px;${z}" data-act="${act}"${id ? ` data-id="${id}"` : ''} aria-label="${label}">${I(ic)}</button>`).join('');
    if (c && c.kind === 'task') {
      if (c.full) return out + ctlBtns(c.items, r.top, '');   // expanded: Close and Collapse
      out += `<button class="rail-btn glass-rail" style="left:${x}px;top:${r.top}px" data-act="closeChat" aria-label="Back"><img src="assets/icons/chevron-back48.svg" width="48" height="48" alt=""></button>`;   // its own page: back to the thesis
      return out;
    }
    if (c && c.kind === 'sheet') {   // the drawer's own controls, above the scrim
      return `<div class="rail" style="left:${r.x}px;z-index:7"></div>` + ctlBtns(c.items, r.top, 'z-index:7');
    }
    if (c) out += ctlBtns(c.items, r.top + (P.railBack ? 62 : 0), '');
    if (P.railBack) out += `<button class="rail-btn glass-rail" style="left:${x}px;top:${r.top}px" data-act="${P.askTile ? 'closeChat' : 'back'}" aria-label="Back"><img src="assets/icons/chevron-back48.svg" width="48" height="48" alt=""></button>`;
    out += `<button class="rail-btn rail-create" style="left:${x}px;bottom:${r.bottom}px" data-act="toast" data-id="Create a thesis is not part of this demo" aria-label="Create">${I('add-l2', 'ic-30')}</button>`;
    const ti = TABS.findIndex(([id]) => id === S.tab), above = r.bottom + 48 + 14;
    if (P.tabsMin && !S.tabsOpen) {
      const cur = TABS[ti];
      return out + `<button class="rail-btn glass-rail rail-tabmin" style="left:${x}px;bottom:${above}px" data-act="tabsOpen" aria-label="${cur[2]} — show all tabs">${I(tabIcon(cur[1], true), 'ic-30')}</button>`;
    }
    out += `<nav class="rail-tabs${P.tabsMin ? ' rail-tabs-pop' : ''} glass-rail" style="left:${x}px;bottom:${above}px"><span class="tab-lens" data-tab="${S.tab}" style="top:${2 + ti * 50}px"></span>${TABS.map(([id, n]) => `<button class="${S.tab === id ? 'on' : ''}" data-act="tab" data-id="${id}" aria-label="${id}">${I(tabIcon(n, S.tab === id), 'ic-30')}</button>`).join('')}</nav>`;
    return out;
  }
  function tabbar() {
    const ti = TABS.findIndex(([id]) => id === S.tab);
    /* Width decides the arrangement (CSS media queries on the window, see app.css · Tab Bar):
       < 378 tabs fill the row, ＋ floats above at the right · 378–587 tabs and ＋ share one row ·
       588–679 tabs centred, ＋ at the right · ≥ 680 the same, with icon and label side by side. */
    return `<nav class="tabbar glass" style="--ti:${ti}"><span class="tab-lens" data-tab="${S.tab}"></span>${TABS.map(([id, n, l]) => `<button class="${S.tab === id ? 'on' : ''}" data-act="tab" data-id="${id}">${I(tabIcon(n, S.tab === id), 'ic')}<span>${l}</span></button>`).join('')}</nav>
      <button class="fab" data-act="toast" data-id="Create a thesis is not part of this demo" aria-label="Create">${I('add-l2', 'ic-30')}</button>`;
  }
  const RULES = [
    ['1D', 'Return over the last trading day: US stocks from 8 PM ET the day before, extended hours included; other stocks from the previous close; crypto over the last 24 hours. A thesis ranks after one full trading day since publishing.'],
    ['7D', 'Return over the last 7 days. A thesis ranks once published for at least 7 days.'],
    ['30D', 'Return over the last 30 days, or since publishing if the thesis is newer. A thesis ranks once published for at least 7 days.'],
    ['All', 'Thesis return since publishing. A thesis ranks once published for at least 7 days.'],
  ];
  function popover(P) {
    const body = `<div class="rr-top"><p class="t-r16">Ranking rules</p><p class="rr-sub">Theses are ranked by return over the selected period.</p></div>
      ${RULES.map(([k, v]) => `<div class="rr-sec"><p class="t-m14"><span class="rr-k">${k}</span>${S.period === k ? '<span class="rr-cur">Current</span>' : ''}</p><p class="rr-d">${v}</p></div>`).join('')}`;
    if (P.L.mode === 'single' && !P.L.corner) return `<div class="scrim" data-act="closePop"></div><div class="bsheet" style="left:${P.OX}px;width:${P.CW}px"><div class="grab"></div>${body}</div>`;
    const lw = P.panes[0].w;
    return `<div class="scrim" data-act="closePop" style="background:transparent"></div><div class="pop" style="left:${lw - 352}px;top:122px">${body}</div>`;
  }

  /* ── actions ── */
  /* a tap on a row of the left list (two columns, list root) chooses that row: the stack starts over from it */
  function fromList(el) {
    return LAYOUTS[stateId()].mode !== 'single' && !!el.closest('section.pane[data-pos="left"]') && LIST_ROOTS.includes(stack()[0].v);
  }
  function push(view) {
    const st = stack(), L = LAYOUTS[stateId()], t = st[st.length - 1];
    if (t.v === 'chat' && view.v === 'chat') st[st.length - 1] = view;
    else st.push(view);
  }
  function doBack() {
    const st = stack();
    if (st.length <= 1) return;
    if (st.length >= 3 && LAYOUTS[stateId()].mode !== 'single' && st[st.length - 1].v === 'chat') st.splice(st.length - 2, 1);
    else st.pop();
  }

  /* ── interactive pop: drag from a column's left edge, like the system back swipe ── */
  let swipe = null;
  app.addEventListener('pointerdown', e => {
    if (e.button > 0 || stack().length < 2 || S.pop) return;
    const pane = e.target.closest('section.pane[data-pos]');
    if (!pane || pane.classList.contains('sheet') || pane.closest('.nav-clip')) return;
    const r = pane.getBoundingClientRect();
    if (e.clientX - r.left > 22) return;
    const P = plan(), pn = P.panes.find(p => p.pos === pane.dataset.pos);
    if (!pn || stack().indexOf(pn.view) !== stack().length - 1) return;
    swipe = { pane, pn, x0: e.clientX, y0: e.clientY, t0: performance.now(), on: false, w: r.width, id: e.pointerId };
  }, true);
  app.addEventListener('pointermove', e => {
    if (!swipe || e.pointerId !== swipe.id) return;
    const dx = e.clientX - swipe.x0, dy = e.clientY - swipe.y0;
    if (!swipe.on) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > dx) { swipe = null; return; }
      if (dx < 8) return;
      /* build the column underneath: what this column shows once popped */
      const st = stack(), saved = st.slice();
      doBack();
      const P2 = plan(), pn2 = P2.panes.find(p => p.pos === swipe.pn.pos) || P2.panes[0];
      const under = document.createElement('div');
      under.innerHTML = paneHTML(pn2, P2, st.length).html;
      st.length = 0; saved.forEach(v => st.push(v));
      const uEl = under.firstElementChild;
      const clip = document.createElement('div');
      clip.className = 'nav-clip';
      clip.style.left = swipe.pn.x + 'px'; clip.style.width = swipe.pn.w + 'px';
      const sc = [...swipe.pane.querySelectorAll('.scroll, .chat-body')].map(x => x.scrollTop);
      app.insertBefore(clip, swipe.pane);
      const dim = document.createElement('div'); dim.className = 'nav-dim';
      uEl.style.left = '0px'; swipe.pane.style.left = '0px';
      swipe.pane.classList.add('nav-top');
      clip.append(uEl, dim, swipe.pane);
      sc.forEach((v, i) => { const x = swipe.pane.querySelectorAll('.scroll, .chat-body')[i]; if (x) x.scrollTop = v; });
      const key = `${S.tab}|${keyOf(pn2.view)}`;
      const usc = uEl.querySelector('.scroll'); if (usc && scrolls.has(key)) usc.scrollTop = scrolls.get(key);
      Object.assign(swipe, { on: true, clip, dim, under: uEl, sc });
      app.setPointerCapture && app.setPointerCapture(e.pointerId);
      document.body.style.userSelect = 'none';
    }
    const p = Math.max(0, Math.min(1, dx / swipe.w));
    swipe.p = p; swipe.vx = dx / Math.max(1, performance.now() - swipe.t0);
    swipe.pane.style.transform = `translateX(${p * 100}%)`;
    swipe.under.style.transform = `translateX(${-30 * (1 - p)}%)`;
    swipe.dim.style.opacity = 1 - p;
  }, true);
  const swipeEnd = e => {
    if (!swipe || (e && e.pointerId !== swipe.id)) return;
    const s = swipe; swipe = null;
    document.body.style.userSelect = '';
    if (!s.on) return;
    const commit = s.p > 0.35 || (s.vx > 0.35 && s.p > 0.08);
    const dur = Math.max(160, M.NAV.duration * (commit ? 1 - s.p : s.p) * 0.9);
    const opt = { duration: dur, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)', fill: 'forwards' };
    const a = [
      M.play(s.pane, [{ transform: s.pane.style.transform }, { transform: commit ? 'translateX(100%)' : 'translateX(0)' }], opt),
      M.play(s.under, [{ transform: s.under.style.transform }, { transform: commit ? 'translateX(0)' : 'translateX(-30%)' }], opt),
      M.play(s.dim, [{ opacity: s.dim.style.opacity }, { opacity: commit ? 0 : 1 }], opt),
    ];
    Promise.all(a.map(x => x && x.finished)).then(() => {
      if (commit) { doBack(); skipNav = true; render(); return; }
      a.forEach(x => x && x.cancel());
      s.pane.style.transform = ''; s.pane.classList.remove('nav-top');
      s.pane.style.left = s.pn.x + 'px';
      app.insertBefore(s.pane, s.clip); s.clip.remove();
      s.sc.forEach((v, i) => { const x = s.pane.querySelectorAll('.scroll, .chat-body')[i]; if (x) x.scrollTop = v; });
    }).catch(() => {});
  };
  app.addEventListener('pointerup', swipeEnd, true);
  app.addEventListener('pointercancel', swipeEnd, true);
  app.addEventListener('click', e => { if (swipe && swipe.on) { e.stopPropagation(); e.preventDefault(); } }, true);

  /* sheet: drag the grabber (or the top of the sheet) down to dismiss */
  let bs = null;
  app.addEventListener('pointerdown', e => {
    const sh = e.target.closest('.bsheet');
    if (!sh || e.clientY - sh.getBoundingClientRect().top > 56) return;
    bs = { sh, y0: e.clientY, t0: performance.now(), dy: 0, id: e.pointerId };
    sh.style.animation = 'none';
  }, true);
  app.addEventListener('pointermove', e => {
    if (!bs || e.pointerId !== bs.id) return;
    let dy = e.clientY - bs.y0;
    if (dy < 0) dy = -Math.pow(-dy, 0.7);
    bs.dy = dy;
    bs.sh.style.transform = `translateY(${dy}px)`;
  }, true);
  app.addEventListener('pointerup', e => {
    if (!bs || e.pointerId !== bs.id) return;
    const s = bs; bs = null;
    const h = s.sh.getBoundingClientRect().height, v = s.dy / Math.max(1, performance.now() - s.t0);
    if (s.dy > h * 0.3 || v > 0.5) { S.pop = null; skipNav = true; s.sh.style.transform = ''; 
      const ghost = s.sh; render(); app.appendChild(ghost); ghost.style.pointerEvents = 'none';
      M.play(ghost, [{ transform: `translateY(${s.dy}px)` }, { transform: 'translateY(100%)' }], M.SHEET_OUT).finished.then(() => ghost.remove()); return; }
    M.play(s.sh, [{ transform: `translateY(${s.dy}px)` }, { transform: 'translateY(0)' }], Object.assign({}, M.spring(0.4, 0.8), { fill: 'none' }));
    s.sh.style.transform = '';
  }, true);

  /* ── motion for in-place changes: every change shows where it came from ──
     slide  — a tab / segment / topic swaps the content beside it, moving the way the selection moved
     flip   — rows that stay glide to their new places; rows that go fade and shrink where they were
     fade   — a main tab brings its page in
     morph  — a column changes size (Ask expanded / folded)
     pop    — a toggle (save, follow) answers the tap */
  const ROWS = '.scroll [data-fk], .scroll article[data-id], .scroll .lb-row[data-id], .recent > *';
  function rowKey(el) { return el.dataset.fk || el.dataset.id || (el.querySelector('[data-id]') || {}).dataset?.id || el.textContent.slice(0, 24); }
  function rowsOf(pane) { const m = new Map(); if (pane) pane.querySelectorAll(ROWS).forEach(el => m.set(rowKey(el), { el, r: el.getBoundingClientRect() })); return m; }
  function preFx(act, id, el) {
    const pane = el.closest('section.pane[data-pos]'), pos = pane && pane.dataset.pos;
    if (['feedTab', 'searchTab', 'profTab', 'topic', 'setPeriodTab'].includes(act)) {
      const sibs = [...el.parentElement.children].filter(c => c.matches('[data-act]'));
      const from = sibs.findIndex(c => c.classList.contains('on')), to = sibs.indexOf(el);
      if (from === to) return null;
      return { kind: 'slide', pos, dir: to > from ? 1 : -1 };
    }
    if (['period', 'dismissPeople', 'unrecent', 'clearRecent'].includes(act)) return { kind: 'flip', pos, before: rowsOf(pane) };
    if (act === 'tab' && id !== S.tab) return { kind: 'fade' };
    /* expandChat / foldChat: the conversation's own surface grows or shrinks in render() (S.morph) */
    if (act === 'save' || act === 'follow') return { kind: 'pop', sel: `[data-act="${act}"][data-id="${id}"]` };
    return null;
  }
  const IOS = 'cubic-bezier(.32,.72,0,1)';
  function postFx(fx) {
    if (!fx) return;
    const pane = fx.pos && app.querySelector(`:scope > section.pane[data-pos="${fx.pos}"]`);
    if (fx.kind === 'slide' && pane) {
      const body = pane.querySelector('.scroll') || pane;
      M.play(body, [{ opacity: 0, transform: `translateX(${fx.dir * 28}px)` }, { opacity: 1, transform: 'none' }], { duration: 320, easing: IOS, fill: 'backwards' });
    }
    if (fx.kind === 'flip' && pane) {
      const after = rowsOf(pane);
      after.forEach((n, k) => {
        const o = fx.before.get(k);
        if (!o) { M.play(n.el, [{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 260, delay: 80, easing: 'ease-out', fill: 'backwards' }); return; }
        const dy = o.r.top - n.r.top, dx = o.r.left - n.r.left;
        if (Math.abs(dy) > 0.5 || Math.abs(dx) > 0.5) M.play(n.el, [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 380, easing: IOS });
      });
      const sc = pane.querySelector('.scroll'), box = sc && sc.getBoundingClientRect();
      fx.before.forEach((o, k) => {
        if (after.has(k) || !sc) return;
        const g = o.el;
        Object.assign(g.style, { position: 'absolute', left: (o.r.left - box.left) + 'px', top: (o.r.top - box.top + sc.scrollTop) + 'px', width: o.r.width + 'px', margin: '0', pointerEvents: 'none', zIndex: '3' });
        if (getComputedStyle(sc).position === 'static') sc.style.position = 'relative';
        sc.appendChild(g);
        const a2 = M.play(g, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.96)' }], { duration: 220, easing: 'ease-in', fill: 'forwards' });
        (a2 ? a2.finished : Promise.resolve()).catch(() => {}).then(() => g.remove());
      });
    }
    if (fx.kind === 'fade') app.querySelectorAll(':scope > section.pane').forEach(p => M.play(p, [{ opacity: 0.35 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' }));
    if (fx.kind === 'morph') morph(fx.before, 420);
    if (fx.kind === 'pop') { const b = app.querySelector(fx.sel); if (b) M.play(b, [{ transform: 'scale(.86)' }, { transform: 'scale(1.06)', offset: 0.55 }, { transform: 'none' }], { duration: 380, easing: 'ease-out' }); }
  }

  let toastTimer;
  function toast(msg) { S.toast = msg; clearTimeout(toastTimer); toastTimer = setTimeout(() => { S.toast = null; render(); }, 1800); }

  app.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    if (el.dataset.act === 'switch') { S.sw[el.dataset.id] = !S.sw[el.dataset.id]; el.classList.toggle('on', S.sw[el.dataset.id]); e.stopPropagation(); return; }
    const act = el.dataset.act, id = el.dataset.id, st = stack();
    const fx = preFx(act, id, el);
    switch (act) {
      case 'open':
        if (fromList(el)) { st.length = 1; st.push({ v: 'detail', id }); }
        else push({ v: 'detail', id });
        break;
    case 'updates': st.push({ v: 'updates', id }); break;
      case 'ask': {
        /* asked from the detail that is only showing because it is first in the list: it becomes a real
           step, so Ask opens beside it and the pair moves along together */
        const pane = el.closest('section.pane[data-pos="right"]');
        if (pane && LAYOUTS[stateId()].mode !== 'single' && st.length === 1 && LIST_ROOTS.includes(st[0].v)) st.push({ v: 'detail', id });
        push({ v: 'chat', id });
        break;
      }
      case 'profile': if (S.tab === 'search' && !S.recent.includes(id)) S.recent.unshift(id);
        if (fromList(el)) { st.length = 1; st.push({ v: 'profile', id }); } else push({ v: 'profile', id });
        break;
      case 'back': doBack(); break;
      case 'chatList': { const Pn = plan(); if (Pn.canBeside) { S.listWide = S.listWide === false; S.listAnim = true; skipNav = true; } else S.chatList = !S.chatList; break; }
      case 'chatListClose': S.chatList = false; break;
      case 'closeChat': if (st[st.length - 1].v === 'chat') st.pop(); break;
      case 'foldChat': S.morph = chatBox(); skipNav = true; st[st.length - 1] = Object.assign({}, st[st.length - 1], { full: false }); break;
      case 'expandChat': S.morph = chatBox(); skipNav = true; st[st.length - 1] = Object.assign({}, st[st.length - 1], { full: true }); break;
      case 'tabsOpen': S.tabsOpen = true; break;
      case 'tab': S.chatList = false; if (S.tabsOpen && S.tab === id) { S.tabsOpen = false; break; } S.tabsOpen = false; if (S.tab === id) S.stacks[id] = S.stacks[id].slice(0, 1); S.tab = id; break;
      case 'feedTab': S.feedTab = id; S.stacks.foryou = [{ v: 'feed' }]; break;
      case 'topic': S.topic = id; S.stacks.foryou = [{ v: 'feed' }]; break;
      case 'period': S.period = id; S.stacks.foryou = [{ v: 'feed' }]; break;
      case 'rules': S.pop = 'rules'; break;
      case 'closePop': S.pop = null; break;
      case 'save': S.saved[id] = !S.saved[id]; break;
      case 'follow': S.follow[id] = !S.follow[id]; break;
      case 'dismissPeople': S.peopleDismissed = true; break;
      case 'unquote': S.quoteOff[id] = true; break;
      case 'searchTab': S.searchTab = id; break;
      case 'clearQ': S.q = ''; S.stacks.search = [{ v: 'search' }]; break;
      case 'clearRecent': S.recent = []; break;
      case 'unrecent': S.recent = S.recent.filter(r => r !== id); break;
      case 'profTab': S.profTab = id; break;
    case 'settings': st.push({ v: 'settings' }); break;
    case 'setPage': {
      const top = st[st.length - 1];
      if (top.v === 'account' || top.v === 'general') st[st.length - 1] = { v: id };
      else st.push({ v: id });
      break;
    }
    case 'switch': S.sw[id] = !S.sw[id]; break;
      case 'toast': toast(id); break;
    }
    e.stopPropagation();
    render();
    postFx(fx);
  });
  app.addEventListener('input', e => {
    if (e.target.id !== 'q') return;
    S.q = e.target.value;
    S.stacks.search = [{ v: 'search' }];
    render();
  });
  app.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, id = f.dataset.chat, text = f.q.value.trim();
    if (!text) return;
    f.q.value = '';
    const log = S.chats[id];
    log.push({ who: 'u', text });
    const reply = replyFor(id);
    const msg = { who: 'a', text: reply, shown: '', typing: true };
    log.push(msg);
    render();
    const body = app.querySelector(`form.chatbox[data-chat="${id}"]`)?.closest('section')?.querySelector('.chat-body');
    if (body) [...body.children].slice(-2).forEach((m, k) => M.play(m, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 340, delay: k * 140, easing: IOS, fill: 'backwards' }));
    let i = 0;
    const tick = () => {
      i = Math.min(reply.length, i + 3);
      msg.shown = reply.slice(0, i);
      const el = app.querySelector('.typing');
      if (el) { el.textContent = msg.shown; el.closest('.chat-body').scrollTop = 1e6; }
      if (i < reply.length) setTimeout(tick, 16); else { msg.typing = false; msg.shown = null; render(); }
    };
    setTimeout(tick, 350);
  });
  /* ── chat box: grows to 4 lines, Return sends, the send button replaces voice ── */
  function growBox(ta) {
    if (!ta) return;
    ta.style.height = '22px';
    ta.style.height = Math.min(88, ta.scrollHeight) + 'px';
    ta.form && ta.form.classList.toggle('has-text', !!ta.value.trim());
  }
  app.addEventListener('input', e => { if (e.target.tagName === 'TEXTAREA' && e.target.form && e.target.form.classList.contains('chatbox')) growBox(e.target); });
  app.addEventListener('keydown', e => {
    const t = e.target;
    if (t.tagName === 'TEXTAREA' && t.form && e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); t.form.requestSubmit(); }
  });

  /* ── iOS keyboard (Figma: System / iOS Keyboard; Duo keyboard 27.2 capture) ──
     It rises with the system keyboard curve, the window's content inset grows
     by its height and the input bar rides 8 above it. */
  /* 11-26: the keyboard is drawn, not a stretched picture — each screen gets its own system keyboard,
     laid out for its width and height:
       phone      outer portrait — iPhone keyboard: 4 rows, emoji and dictation under them, home indicator
       phoneLand  outer landscape — iPhone landscape: short rows, keys capped in width and centred
       pad        inner upright (and upright Book / PiP, Split upright) — the Duo inner keyboard: candidate
                  bar, 4 rows, 123 · globe · emoji · space · dictation · return (from the 27.2 capture)
       split      Book half-folded — the keyboard splits at the crease, one half under each half of the screen
     Split View on the long edge: the window is 469.5, so the phone layout fits it. */
  const KB = {
    'outer-portrait': { k: 'phone', h: 344, gap: 8 },
    'outer-portrait-m': { k: 'phone', h: 344, gap: 8 },
    'outer-landscape': { k: 'phoneLand', h: 206, gap: 8 },
    'outer-landscape-m': { k: 'phoneLand', h: 206, gap: 8 },
    'inner-portrait': { k: 'pad', h: 352, gap: 10 },
    'book-portrait': { k: 'pad', h: 352, gap: 10 },
    'pip-portrait': { k: 'pad', h: 352, gap: 10 },
    'inner-landscape': { k: 'pad', h: 300, gap: 10 },
    'pip': { k: 'pad', h: 300, gap: 10 },
    'book': { k: 'split', h: 300, gap: 10 },
    'split': { k: 'phone', h: 300, gap: 8 },
    'split-l': { k: 'phone', h: 300, gap: 8 },
    'split-portrait': { k: 'pad', h: 230, gap: 10 },
    'split-l-portrait': { k: 'pad', h: 230, gap: 10 },
  };
  const kbEl = document.getElementById('kb');
  let kbOn = false, kbAnim = null, kbBuilt = '';
  const CANDS = ['你', '在', '这', '不', '是', '一', '好', '他', '那', '有', '我', '们', '的'];
  function kbHTML(kind, W, H) {
    const key = (x, y, w, h, k, label, fn, cls = '') => `<b class="k${fn ? ' fn' : ''}${cls ? ' ' + cls : ''}" data-k="${k}" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px">${label}</b>`;
    const ICON = { shift: I('kb-shift', 'ic-k'), del: I('kb-del', 'ic-k'), globe: I('kb-globe', 'ic-k'), emoji: I('kb-emoji', 'ic-k'), mic: I('kb-mic', 'ic-k'), ret: I('kb-return', 'ic-k') };
    let out = '';
    /* one block of keys: rows of letters, with the given edge keys */
    function block(x0, bw, top, rowsH, opt) {
      const { side, gap, kwMax = 999, r1, r2, r3, shift, del, bottom } = opt;
      const kw = Math.min(kwMax, (bw - 2 * side - (opt.cols - 1) * gap) / opt.cols);
      const pitch = rowsH / 4, kh = pitch - opt.vgap;
      const used = opt.cols * kw + (opt.cols - 1) * gap, L = x0 + (bw - used) / 2, R = L + used;
      const row = (letters, y, start) => letters.split('').map((c, i) => key(start + i * (kw + gap), y, kw, kh, c, c)).join('');
      const y = i => top + i * pitch + opt.vgap / 2;
      out += row(r1, y(0), opt.r1Start === 'right' ? R - r1.length * (kw + gap) + gap : L);
      const r2w = r2.length * kw + (r2.length - 1) * gap;
      out += row(r2, y(1), opt.r2Align === 'left' ? L + kw * 0.5 : opt.r2Align === 'right' ? R - r2w : x0 + (bw - r2w) / 2);
      const r3w = r3.length * kw + (r3.length - 1) * gap;
      const r3x = opt.r3Align === 'left' ? L : opt.r3Align === 'right' ? R - r3w : x0 + (bw - r3w) / 2;
      out += row(r3, y(2), r3x);
      const g3 = opt.r3Align ? gap : gap * 2;
      if (shift) out += key(L, y(2), r3x - L - g3, kh, 'shift', ICON.shift, true);
      if (del) { const dx = r3x + r3w + g3; out += key(dx, y(2), opt.r3Align ? Math.min(R - dx, kw * 1.6) : R - dx, kh, 'del', ICON.del, true); }
      /* bottom row: [k, label, width in keys | 'fill', fn] */
      const fixed = bottom.filter(b => b[2] !== 'fill').reduce((a, b) => a + b[2] * kw, 0) + (bottom.length - 1) * gap;
      const fill = used - fixed;
      let bx = L;
      bottom.forEach(([k, label, w, fn]) => { const ww = w === 'fill' ? fill : w * kw; out += key(bx, y(3), ww, kh, k, label, fn, k === ' ' ? 'space' : ''); bx += ww + gap; });
      return { kw, kh, L, R };
    }
    if (kind === 'phone') {
      const top = 8, rowsH = Math.min(4 * 58, H - 112);
      block(0, W, top, rowsH, { cols: 10, side: 3, gap: 6, vgap: 12, r1: 'qwertyuiop', r2: 'asdfghjkl', r3: 'zxcvbnm', shift: true, del: true,
        bottom: [['123', '123', 2.45, true], [' ', 'space', 'fill'], ['ret', 'return', 2.45, true]] });
      const by = top + rowsH + 14;
      out += `<b class="k-bare" data-k="emoji" style="left:18px;top:${by}px">${ICON.emoji}</b><b class="k-bare" data-k="mic" style="right:18px;top:${by}px">${ICON.mic}</b><i class="k-home"></i>`;
    } else if (kind === 'phoneLand') {
      /* keys stay inside the safe area: the rail's column (camera at its foot) is left clear */
      const rl = (LAYOUTS[stateId()] || {}).rail, x0 = rl && rl.left ? 84 : 0, top = 4, rowsH = H - 4 - 26;
      block(x0, W - 84, top, rowsH, { cols: 10, side: 20, gap: 6, vgap: 7, kwMax: 56, r1: 'qwertyuiop', r2: 'asdfghjkl', r3: 'zxcvbnm', shift: true, del: true,
        bottom: [['123', '123', 1.3, true], ['emoji', ICON.emoji, 1, true], [' ', 'space', 'fill'], ['mic', ICON.mic, 1, true], ['ret', 'return', 2, true]] });
      out += `<i class="k-home" style="left:${x0 + (W - 84) / 2}px"></i>`;
    } else if (kind === 'pad') {
      const cb = H >= 300 ? 46 : 36, bp = Math.round(H * (H >= 300 ? 0.2 : 0.06)), rowsH = H - cb - bp;
      out += `<div class="k-cands" style="height:${cb}px">${CANDS.slice(0, Math.max(5, Math.floor((W - 60) / 64))).map(c => `<span>${c}</span>`).join('')}<em>${I('arrow-down-l2', 'ic-k')}</em></div>`;
      block(0, W, cb, rowsH, { cols: 10, side: 18, gap: 10, vgap: rowsH / 4 * 0.27, r1: 'qwertyuiop', r2: 'asdfghjkl', r3: 'zxcvbnm', shift: true, del: true,
        bottom: [['123', '123', 1, true], ['globe', ICON.globe, 1, true], ['emoji', ICON.emoji, 1, true], [' ', '<small>拼</small>', 'fill'], ['mic', ICON.mic, 1, true], ['ret', ICON.ret, 1.47, true]] });
    } else if (kind === 'split') {
      /* Book: one half under each half of the screen, nothing on the crease (455.5–495.5) */
      const half = 455.5, cb = 40, rowsH = H - cb - 30, o = { side: 18, gap: 8, vgap: rowsH / 4 * 0.25, kwMax: 64, shift: true, del: true };
      out += `<div class="k-cands" style="height:${cb}px;width:${half}px">${CANDS.slice(0, 6).map(c => `<span>${c}</span>`).join('')}</div>`;
      out += `<div class="k-cands" style="height:${cb}px;left:${W - half}px;width:${half}px">${CANDS.slice(6, 12).map(c => `<span>${c}</span>`).join('')}<em>${I('arrow-down-l2', 'ic-k')}</em></div>`;
      block(0, half, cb, rowsH, { ...o, del: false, cols: 6, r1: 'qwert', r2: 'asdfg', r3: 'zxcvb', r1Start: 'right', r2Align: 'right', r3Align: 'right',
        bottom: [['123', '123', 1.2, true], ['globe', ICON.globe, 1, true], ['emoji', ICON.emoji, 1, true], [' ', '', 'fill']] });
      block(W - half, half, cb, rowsH, { ...o, shift: false, cols: 6, r1: 'yuiop', r2: 'hjkl', r3: 'nm', r2Align: 'left', r3Align: 'left',
        bottom: [[' ', '', 'fill'], ['mic', ICON.mic, 1, true], ['ret', ICON.ret, 1.6, true]] });
      out += `<i class="k-crease" style="left:${half}px;width:${W - 2 * half}px"></i>`;
    }
    return out;
  }
  const typing = () => { const a = document.activeElement; return a && app.contains(a) && (a.id === 'q' || (a.form && a.form.classList.contains('chatbox'))) ? a : null; };
  function kbBuild(k) {
    const sig = k.k + innerWidth + 'x' + k.h;
    if (sig === kbBuilt) return;
    kbBuilt = sig;
    kbEl.className = 'kb-' + k.k;
    kbEl.innerHTML = kbHTML(k.k, innerWidth, k.h);
  }
  function kbSync() {
    const want = !!typing();
    const k = KB[stateId()] || KB['outer-portrait'];
    root.style.setProperty('--kb-gap', k.gap + 'px');
    if (want) kbBuild(k);
    if (want === kbOn) { if (want) { kbEl.style.height = k.h + 'px'; root.style.setProperty('--kb', k.h + 'px'); } return; }
    kbOn = want;
    kbEl.style.height = k.h + 'px';
    kbEl.style.display = 'block';
    root.classList.toggle('kb-on', want);
    root.style.setProperty('--kb', (want ? k.h : 0) + 'px');
    kbAnim && kbAnim.cancel();
    kbAnim = M.play(kbEl, want ? [{ transform: 'translateY(100%)' }, { transform: 'none' }] : [{ transform: 'none' }, { transform: 'translateY(100%)' }], M.KB);
    if (!want && kbAnim) kbAnim.finished.then(() => { if (!kbOn) kbEl.style.display = 'none'; }).catch(() => {});
  }
  document.addEventListener('focusin', () => setTimeout(kbSync));
  document.addEventListener('focusout', () => setTimeout(kbSync, 30));
  /* tapping outside the field puts the keyboard away; the keyboard itself keeps focus */
  document.addEventListener('pointerdown', e => {
    if (kbEl.contains(e.target)) { e.preventDefault(); return; }
    const t = typing();
    if (t && !e.target.closest('input, textarea, form.chatbox, .s-input')) t.blur();
  }, true);
  kbEl.addEventListener('pointerdown', e => {
    const t = typing(); if (!t) return;
    const kEl = e.target.closest('[data-k]'); if (!kEl) return;
    const key = kEl.dataset.k;
    kEl.classList.add('down'); setTimeout(() => kEl.classList.remove('down'), 140);
    if (key === 'ret') { if (t.form && t.form.classList.contains('chatbox')) t.form.requestSubmit(); else t.blur(); return; }
    if (key.length > 1 && key !== 'del') return;   // 123, globe, emoji, mic, shift: not part of the demo
    const v = t.value, a = t.selectionStart ?? v.length, b = t.selectionEnd ?? v.length;
    if (key === 'del') { const s0 = a === b ? Math.max(0, a - 1) : a; t.value = v.slice(0, s0) + v.slice(b); t.setSelectionRange(s0, s0); }
    else { t.value = v.slice(0, a) + key + v.slice(b); t.setSelectionRange(a + 1, a + 1); }
    t.dispatchEvent(new Event('input', { bubbles: true }));
    /* the phone keyboards pop the letter up above the key, as iOS does */
    if (key.length === 1 && key !== ' ' && /^kb-phone/.test(kbEl.className)) {
      const r = kEl.getBoundingClientRect(), kr = kbEl.getBoundingClientRect();
      const pv = document.createElement('i');
      pv.className = 'kb-pop'; pv.textContent = key;
      pv.style.left = (r.left - kr.left + r.width / 2) + 'px'; pv.style.top = (r.top - kr.top) + 'px';
      kbEl.appendChild(pv);
      M.play(pv, [{ opacity: 1 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], { duration: 260, easing: 'ease-out' }).finished.then(() => pv.remove());
    }
  });

  function replyFor(id) {
    if (id === 'tab') return 'Got it. I’ll pull the latest price action, filings and what the people you follow are saying. (Demo reply.)';
    const t = D.theses[id], tks = t.tickers.map(x => x[0]).join(', ');
    return `Here’s how I’d pressure-test ${D.people[t.author].name}’s thesis on ${tks}:\n• What has to be true: the core claim in the latest update holds for the next two quarters.\n• What would break it: guidance or pricing data moving the other way.\n• What I can watch: earnings dates and price moves on ${tks}. (Demo reply.)`;
  }

  /* the gallery's rows land here */
  window.addEventListener('message', e => {
    if (e.source !== parent || e.data?.type !== 'duo:goto') return;
    const g = e.data.go || {};
    const keep = { saved: S.saved, follow: S.follow, chats: S.chats, theme: null };
    S = fresh();
    Object.assign(S, { saved: keep.saved, follow: keep.follow, chats: keep.chats });
    S.tab = g.tab || 'foryou';
    if (g.feedTab) S.feedTab = g.feedTab;
    if (g.rules) S.pop = 'rules';
    if (g.open) S.stacks.foryou.push({ v: 'detail', id: g.open });
    if (g.updates) S.stacks.foryou.push({ v: 'updates', id: g.updates });
    if (g.ask) S.stacks.foryou.push({ v: 'chat', id: g.ask, full: !!g.askFull });
    if (g.q) { S.q = g.q; S.searchTab = 'people'; }
    if (g.profile) S.stacks.search.push({ v: 'profile', id: g.profile });
    if (g.settings) { S.stacks.me.push({ v: 'settings' }); if (g.settings !== true) S.stacks.me.push({ v: g.settings }); }
    lastKeys = {};
    skipNav = true;
    render();
  });
  window.addEventListener('keydown', e => {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    if (/^[1-7rR]$/.test(e.key) && parent !== window) parent.postMessage({ type: 'duo:key', key: e.key }, '*');
  });
  /* Screen-state changes: the gallery moves the hardware and resizes this
     window over the same time (root[data-duo-anim] = ms), so the app lays
     itself out for the new state at once and every column travels from where
     it was to where it goes in step with the device — one motion, not
     "device first, then the page". */
  const RAILISH = ['rail', 'rail-line', 'rail-create', 'rail-tabs', 'tabbar', 'fab'];
  function layoutSnapshot() {
    const m = new Map();
    app.querySelectorAll(':scope > section.pane[data-key]').forEach(el => m.set('p:' + el.dataset.key, { el, x: el.offsetLeft, w: el.offsetWidth }));
    app.querySelectorAll(':scope > .' + RAILISH.join(', :scope > .')).forEach(el => { const c = RAILISH.find(c => el.classList.contains(c)); m.set('r:' + c, { el, x: el.offsetLeft, w: el.offsetWidth }); });
    app.querySelectorAll(':scope > .rail-btn[data-act="back"]').forEach(el => m.set('r:back', { el, x: el.offsetLeft, w: el.offsetWidth }));
    return m;
  }
  let morphing = 0;
  function morph(before, dur) {
    const ease = 'cubic-bezier(.32,.72,0,1)', opt = { duration: dur, easing: ease, fill: 'none' };
    const seen = new Set();
    const after = layoutSnapshot();
    after.forEach((n, k) => {
      const o = before.get(k);
      if (!o) { M.play(n.el, [{ opacity: 0, transform: 'translateX(24px)' }, { opacity: 1, transform: 'none' }], Object.assign({}, opt, { delay: dur * 0.18, duration: dur * 0.82, fill: 'backwards' })); return; }
      seen.add(k);
      if (k.startsWith('p:')) {
        if (o.x !== n.x || o.w !== n.w) M.play(n.el, [{ left: o.x + 'px', width: o.w + 'px' }, { left: n.x + 'px', width: n.w + 'px' }], opt);
      } else if (o.x !== n.x) M.play(n.el, [{ translate: `${o.x - n.x}px 0` }, { translate: '0 0' }], opt);
    });
    before.forEach((o, k) => {
      if (seen.has(k)) return;
      const el = o.el;
      el.style.pointerEvents = 'none';
      el.style.zIndex = '0';
      app.insertBefore(el, app.firstChild);
      const a = M.play(el, [{ opacity: 1 }, { opacity: 0 }], { duration: dur * 0.45, easing: 'ease-out', fill: 'forwards' });
      (a ? a.finished : Promise.resolve()).catch(() => {}).then(() => el.remove());
    });
    const mine = ++morphing;
    setTimeout(() => { if (mine === morphing) { morphing = 0; render(); } }, dur + 40);
  }
  new MutationObserver(muts => {
    const dur = +root.dataset.duoAnim || 0;
    const moved = dur > 0 && muts.some(m => m.attributeName === 'data-duo' && m.oldValue !== root.dataset.duo);
    const before = moved ? layoutSnapshot() : null;
    skipNav = true;
    render();
    if (before) morph(before, dur);
  }).observe(root, { attributes: true, attributeOldValue: true, attributeFilter: ['data-duo', 'data-theme'] });
  let rz;
  window.addEventListener('resize', () => { if (morphing) return; cancelAnimationFrame(rz); rz = requestAnimationFrame(render); });
  root.style.setProperty('--kb-dur', M.KB.duration + 'ms');
  root.style.setProperty('--kb-ease', M.KB.easing);
  { const sp = M.spring(0.42, 0.8); root.style.setProperty('--pop-dur', sp.duration + 'ms'); root.style.setProperty('--pop-ease', sp.easing); }
  render();
  if (document.fonts) document.fonts.ready.then(() => snapText());
  window.addEventListener('message', e => {
    if (e.source !== parent || e.data?.type !== 'duo:env') return;
    const d = e.data;
    if (d.anim) root.dataset.duoAnim = d.anim; else delete root.dataset.duoAnim;
    if (d.hw) root.style.setProperty('--hw', d.hw + 'px');
    if (root.dataset.theme !== d.theme) root.dataset.theme = d.theme;
    if (root.dataset.duo !== d.duo) root.dataset.duo = d.duo;
  });
  /* the pill row under the title tucks away while the list scrolls down and
     comes back as soon as it scrolls up (or reaches the top) */
  let headHidden = false;
  const lastTop = new WeakMap();
  function applyHead() { app.querySelectorAll('.pane').forEach(p => { if (p.querySelector(':scope > .feed-head')) p.classList.toggle('head-hidden', headHidden); }); }
  app.addEventListener('scroll', e => {
    const sc = e.target;
    if (!sc.classList || !sc.classList.contains('scroll') || !sc.parentElement.querySelector(':scope > .feed-head')) return;
    const top = sc.scrollTop, was = lastTop.has(sc) ? lastTop.get(sc) : top;
    lastTop.set(sc, top);
    let next = headHidden;
    if (top <= 8) next = false;
    else if (top - was > 3 && top > 48) next = true;
    else if (was - top > 3) next = false;
    if (next !== headHidden) { headHidden = next; applyHead(); }
  }, true);
  window.__applyHead = applyHead;

  /* ── media viewer (images and videos) ──
     Tap an image or a video in a list or a detail and it grows from where it sits into a black,
     full-window viewer that covers the app's rail too: no tabs, no Create — only the viewer's own
     controls, grouped the way the system groups a vertical bar (HIG, Designing for iPhone Duo):
     · top group: Close.
     · bottom group: Download, and Delete under it on your own posts (trash last, as iOS does).
     · the post's media as a scrubber, like the strip under a photo in Photos — the current item at
       its own shape, the others as narrow slivers — along the bottom of the content area, centred,
       just above the home indicator; tap or drag it sideways, the same direction the image swipes.
     · a name, when the item has one, and who posted it: centred at the top of the content area
       (centre line y48). Content area = the window minus the rail and the fold; margins 20 on the
       open side, 16 next to the rail, top 24, bottom 34 (home indicator).
     · the image fills the content area's width between the name row and the scrubber.
     · upright inner display (horizontal bars): Close · name · Download / Delete in a top bar.
     · half-folded like a book: the image on the left page, the post's author and text on the
       right one, nothing on the fold.
     Tap toggles the controls and the status bar; swipe sideways; double-tap / pinch zooms; swipe
     down (or Close) puts it back where it came from. Turning, folding or Split View re-fits. */
  const V = { el: null, i: 0, srcs: [], items: [], thumbs: [], tid: null, own: false, chrome: true, full: false, zoom: 1, px: 0, py: 0, busy: false };
  const GAP = 16;
  function vGeo() {
    const L = LAYOUTS[stateId()], W = innerWidth, H = innerHeight, r = L.rail;
    const c0 = r && r.left ? 84 : 0, c1 = r && !r.left ? r.x : W;
    const book = L.mode === 'book', tab = stateId() === 'book-portrait';
    /* Half-folded, the viewer splits along the fold like Apple's arrangement views: the image on one
       page, the post (author, text) and a grid of its media on the other — nothing on the fold.
       · book (fold upright): image on the right page, next to the rail; post + grid on the left page.
       · book held upright (tabletop, fold across): image on the upright top half; post + grid below.
       Everywhere else: the image over the whole window, the scrubber at the bottom. */
    let ia, ca, info = null;
    if (book) { ia = { x: 495.5, w: W - 495.5 }; ca = { x0: 495.5, x1: c1, y1: H, mL: 20, mR: 16 }; info = { x: 0, y: 0, w: 455.5, h: H, pb: 34 }; }
    else if (tab) { ia = { x: 0, w: W }; ca = { x0: 0, x1: W, y1: 455.5, mL: 20, mR: 20 }; info = { x: 0, y: 495.5, w: W, h: H - 495.5, pb: 84 }; }
    else { ia = { x: 0, w: W }; ca = { x0: c0, x1: c1, y1: H, mL: r && r.left ? 16 : 20, mR: r && !r.left ? 16 : 20 }; }
    ca.cx = (ca.x0 + ca.x1) / 2;
    const bottomH = V.own ? 48 + 14 + 48 : 48;
    return { L, W, H, r, c0, c1, book, tab, ia, ca, info, padR: L.corner ? 140 : 0, strip: V.items.length > 1 && !info, bottomH };
  }
  function vFit(img, G) {
    const ar = +img.dataset.ar || (img.naturalWidth || 720) / (img.naturalHeight || 400);
    const fit = (aw, ah) => { let w = aw, h = w / ar; if (h > ah) { h = ah; w = h * ar; } return { w, h }; };
    const box = (x0, x1, y0, y1) => { const s = fit(x1 - x0, y1 - y0); return { x: x0 + (x1 - x0 - s.w) / 2, y: y0 + (y1 - y0 - s.h) / 2, w: s.w, h: s.h }; };
    const { W, H, ca } = G;
    /* tapped: full screen — the whole window, over the rail (the image's page when folded) */
    if (V.full) return G.info ? box(G.ia.x, G.ia.x + G.ia.w, 0, ca.y1) : box(0, W, 0, H);
    if (G.info) return box(ca.x0 + ca.mL, ca.x1 - ca.mR, 84, ca.y1 - (G.tab ? 12 : 34));
    /* default: inside the content area's margins, so nothing touches an edge and reads as more to
       swipe; between the name row (84) and the scrubber (or the home indicator) */
    return box(ca.x0 + ca.mL, ca.x1 - ca.mR, 84, G.strip ? G.H - 66 - 12 : H - 34);
  }
  function vPost() {
    if (parent === window) return;
    parent.postMessage({ type: 'duo:viewer', on: !!V.el, chrome: V.chrome, rect: V.el ? [0, 0, innerWidth, innerHeight] : null }, '*');
  }
  function vLayout(anim) {
    if (!V.el) return;
    const G = vGeo(), a = G.ia;
    Object.assign(V.el.style, { width: G.W + 'px', height: G.H + 'px' });
    Object.assign(V.el.querySelector('.v-clip').style, { left: a.x + 'px', width: a.w + 'px' });
    V.el.querySelectorAll('.v-slide').forEach((sl, k) => {
      const img = sl.querySelector('img'), f = vFit(img, G);
      Object.assign(sl.style, { left: (k * (a.w + GAP)) + 'px', width: a.w + 'px' });
      Object.assign(img.style, { left: (f.x - a.x) + 'px', top: f.y + 'px', width: f.w + 'px', height: f.h + 'px' });
      const pl = sl.querySelector('.v-play'); if (pl) Object.assign(pl.style, { left: (f.x - a.x + f.w / 2 - 32) + 'px', top: (f.y + f.h / 2 - 32) + 'px' });
      const du = sl.querySelector('.v-dur'); if (du) Object.assign(du.style, { left: (f.x - a.x + f.w - 12) + 'px', top: (f.y + f.h - 12) + 'px' });
    });
    /* controls: the vertical column where Alva has one, else a top bar */
    const col = V.el.querySelector('.v-col'), bar = V.el.querySelector('.v-bar'), head = V.el.querySelector('.v-head');
    const yb = G.H - (G.r ? G.r.bottom : 24) - 48;   // bottom row: the rail's bottom inset, else 24 — centre line H − 48
    col.hidden = false;
    const cl = col.querySelector('[data-v="close"]');
    if (G.r) {
      bar.hidden = true; cl.hidden = false;
      const bx = (G.r.left ? 0 : G.r.x) + (G.r.left ? 24 : 12);
      const at = (v, y) => { const n = col.querySelector(`[data-v="${v}"]`); if (n) Object.assign(n.style, { left: bx + 'px', top: y + 'px' }); };
      at('close', G.r.top);
      /* Download as close to the bottom corner as it gets; Delete (own posts) above it */
      at('download', yb); if (V.own) at('more', yb - 62);
      const x0 = G.ca.x0 + G.ca.mL, x1 = G.ca.x1 - G.ca.mR;
      Object.assign(head.style, { left: x0 + 'px', width: (x1 - x0) + 'px', top: '24px' });
    } else {
      /* horizontal bars: Close in the top bar; Download in the bottom-right corner, Delete to its left */
      bar.hidden = false; cl.hidden = true;
      Object.assign(bar.style, { left: G.c0 + 'px', width: (G.c1 - G.c0) + 'px', paddingRight: (20 + G.padR) + 'px' });
      const dx = G.W - 20 - 48;
      const at = (v, x) => { const n = col.querySelector(`[data-v="${v}"]`); if (n) Object.assign(n.style, { left: x + 'px', top: yb + 'px' }); };
      at('download', dx); if (V.own) at('more', dx - 60);
      const side = Math.max(20 + 48 + 12, 20 + G.padR);
      Object.assign(head.style, { left: side + 'px', width: (G.W - 2 * side) + 'px', top: '24px' });
    }
    const info = V.el.querySelector('.v-info');
    info.hidden = !G.info;
    if (G.info) { Object.assign(info.style, { left: G.info.x + 'px', top: G.info.y + 'px', width: G.info.w + 'px', height: G.info.h + 'px', bottom: 'auto', paddingBottom: G.info.pb + 'px' }); info.style.setProperty('--cols', G.tab ? 5 : 3); }
    vTrack(anim);
    vZoomApply(false);
    vPost();
  }
  /* the scrubber: slivers for the others, the current item at its own shape (Photos) */
  function vStrip() {
    const st = V.el && V.el.querySelector('.v-strip'); if (!st) return;
    const G = vGeo(); st.hidden = !G.strip; if (!G.strip) return;
    const GAPS = 2, PAD = 6;
    const sizes = V.items.map((m, k) => k === V.i ? Math.max(28, Math.min(64, 36 * (m.w || 16) / (m.h || 9))) : 24);
    let pos = 0; const start = [];
    sizes.forEach((w, k) => { if (k === V.i && k) pos += PAD; start.push(pos); pos += w + (k === V.i ? PAD : GAPS); });
    const cur = start[V.i] + sizes[V.i] / 2;
    const keep = G.r ? 0 : (V.own ? 108 : 48) + 12;   // bar layouts: Download / Delete sit in the bottom-right corner
    const x0 = G.ca.x0 + G.ca.mL + keep, w = G.ca.x1 - G.ca.mR - keep - x0;
    Object.assign(st.style, { left: x0 + 'px', top: (G.H - 48 - 20) + 'px', width: w + 'px', height: '40px' });   // centre line H − 48, level with the bottom button; 2 spare above / below for the outline
    st.className = 'v-strip horiz';
    st.querySelectorAll('button').forEach((b, k) => { Object.assign(b.style, { width: sizes[k] + 'px', height: '36px', top: '2px', left: (G.ca.cx - x0 - cur + start[k]) + 'px' }); b.classList.toggle('on', k === V.i); });
  }
  function vHead() {
    const m = V.items[V.i] || {}, t = V.tid && D.theses[V.tid], who = t ? D.people[t.author].name : '';
    const meta = who ? `${esc(who)}${t.date ? ' · ' + esc(t.date) : ''}` : '';
    V.el.querySelector('.v-head').innerHTML = m.title ? `<b>${esc(m.title)}</b>` : '';   // media have a name or nothing — no subtitle
  }
  function vTrack(anim, dx = 0) {
    const G = vGeo(), tr = V.el.querySelector('.v-track');
    const to = `translateX(${-V.i * (G.ia.w + GAP) + dx}px)`;
    if (anim) { const from = getComputedStyle(tr).transform; tr.style.transform = to; M.play(tr, [{ transform: from === 'none' ? 'none' : from }, { transform: to }], Object.assign({}, M.spring(0.4, 1), { fill: 'none' })); }
    else tr.style.transform = to;
    vHead(); vStrip();
    V.el.querySelectorAll('.v-grid button').forEach((b, k) => b.classList.toggle('on', k === V.i));
  }
  const vImg = () => V.el.querySelectorAll('.v-slide img')[V.i];
  function vZoomApply(anim) {
    const img = vImg(); if (!img) return;
    const t = V.zoom === 1 ? 'none' : `translate(${V.px}px, ${V.py}px) scale(${V.zoom})`;
    if (anim) { const from = img.style.transform || 'none'; img.style.transform = t; M.play(img, [{ transform: from }, { transform: t }], Object.assign({}, M.spring(0.35, 1), { fill: 'none' })); }
    else img.style.transform = t;
  }
  function vChrome(on) { V.chrome = on; V.el.classList.toggle('bare', !on); vPost(); }
  /* tap: full screen (controls and status hidden) ⇄ back to the framed view, the image moving between the two fits */
  function vFull(on) {
    V.full = on; vChrome(!on); V.el.classList.toggle('full', on);
    V.el.classList.add('v-fit-anim'); vLayout(false);
    clearTimeout(vFull.t); vFull.t = setTimeout(() => V.el && V.el.classList.remove('v-fit-anim'), 420);
  }
  function vThumb() {
    const src = V.srcs[V.i];
    const pick = V.thumbs[V.i] && V.thumbs[V.i].isConnected ? V.thumbs[V.i] : [...app.querySelectorAll('.pic img')].find(im => im.getAttribute('src') === src);
    if (!pick) return null;
    const r = pick.closest('.pic').getBoundingClientRect();
    const pane = pick.closest('.scroll, .pane'); const pr = pane ? pane.getBoundingClientRect() : r;
    if (r.bottom < pr.top + 8 || r.top > pr.bottom - 8 || r.right < pr.left + 8 || r.left > pr.right - 8) return null;
    return { x: r.left, y: r.top, w: r.width, h: r.height, el: pick };
  }
  function vTf(img, box) {
    const f = vFit(img, vGeo()), s = box.w / f.w;
    return `translate(${box.x + box.w / 2 - (f.x + f.w / 2)}px, ${box.y + box.h / 2 - (f.y + f.h / 2)}px) scale(${s})`;
  }
  function vInfoHTML() {
    const t = V.tid && D.theses[V.tid];
    const head = t ? `<div class="v-who">${avatar(t.author, 32)}<div><b>${esc(D.people[t.author].name)}</b><span>${esc(D.people[t.author].role || '')}</span></div></div><p class="v-txt">${esc(t.title || t.body[0])}</p>` : '';
    const grid = V.items.length > 1 ? `<div class="v-grid">${V.items.map((m, k) => `<button data-go="${k}" aria-label="${m.video ? 'Video' : 'Image'} ${k + 1}"><img src="${m.src}" alt="" draggable="false">${m.video ? `<span class="pic-dur">${I('play-f', 'ic-12')}${esc(m.dur || '')}</span>` : ''}</button>`).join('')}</div>` : '';
    return head + grid;
  }
  function openViewer(chartImg) {
    if (V.el || V.busy) return;
    const track = chartImg.closest('.media-track') || chartImg.closest('.pic').parentElement;
    const imgs = [...track.querySelectorAll('.pic img')];
    V.srcs = imgs.map(im => im.getAttribute('src')); V.thumbs = imgs; V.i = imgs.indexOf(chartImg);
    const host = chartImg.closest('[data-act="open"][data-id]'), pane = chartImg.closest('section.pane[data-key]');
    V.tid = host ? host.dataset.id : (pane && /^detail:/.test(pane.dataset.key) ? pane.dataset.key.split(':')[1] : null);
    const tm = V.tid && D.theses[V.tid] && D.theses[V.tid].media;
    V.items = tm && tm.length === imgs.length ? tm : imgs.map(im => ({ src: im.getAttribute('src'), w: im.naturalWidth, h: im.naturalHeight }));
    V.own = !!(V.tid && D.theses[V.tid] && D.theses[V.tid].author === 'me');
    V.zoom = 1; V.px = V.py = 0; V.chrome = true; V.full = false;
    const tr = chartImg.closest('.pic').getBoundingClientRect();
    const el = document.createElement('div'); el.className = 'viewer'; V.el = el;
    const acts = `<button class="v-g" data-v="download" aria-label="Download">${I('download-l')}</button>${V.own ? `<button class="v-g" data-v="more" aria-label="More">${I('more-l1')}</button>` : ''}`;
    el.innerHTML = `<div class="v-bg"></div><div class="v-clip"><div class="v-track">${V.items.map(m => `<div class="v-slide"><img src="${m.src}" alt="" draggable="false"${m.w && m.h ? ` data-ar="${m.w / m.h}"` : ''}>${m.video ? `<button class="v-play v-g" data-v="play" aria-label="Play">${I('play-f')}</button><span class="v-dur">${esc(m.dur || '')}</span>` : ''}</div>`).join('')}</div></div>
      <div class="v-col"><button class="v-g" data-v="close" aria-label="Close">${I('close-l1')}</button>${acts}</div>
      <header class="v-bar"><button class="v-g" data-v="close" aria-label="Close">${I('close-l1')}</button></header>
      <div class="v-head"></div>
      <div class="v-strip">${V.items.map((m, k) => `<button data-go="${k}" aria-label="${m.video ? 'Video' : 'Image'} ${k + 1}"><img src="${m.src}" alt="" draggable="false"></button>`).join('')}</div>
      <aside class="v-info">${vInfoHTML()}</aside><div class="v-menu" hidden><button data-v="del">${I('delete-l')}<span>Delete</span></button></div>
      <div class="v-scrim" hidden></div><div class="v-alert" role="alertdialog" hidden></div>`;
    document.body.appendChild(el);
    vLayout(false);
    const img = vImg(), sp = M.spring(0.42, 0.88);
    const from = { x: tr.left, y: tr.top, w: tr.width, h: tr.height };
    const chart = chartImg.closest('.pic'); chart.style.visibility = 'hidden';
    M.play(img, [{ transform: vTf(img, from), borderRadius: 8 / (from.w / vFit(img, vGeo()).w) + 'px' }, { transform: 'none', borderRadius: '8px' }], Object.assign({}, sp, { fill: 'none' }));
    M.play(el.querySelector('.v-bg'), [{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out', fill: 'none' });
    el.querySelectorAll('.v-col, .v-bar, .v-head, .v-strip, .v-info').forEach(n => M.play(n, [{ opacity: 0 }, { opacity: 1 }], { duration: 220, delay: 120, easing: 'ease-out', fill: 'backwards' }));
    setTimeout(() => { chart.style.visibility = ''; }, sp.duration);
    vBind(el);
  }
  function closeViewer(fromT) {
    if (!V.el || V.busy) return;
    V.busy = true;
    const el = V.el, img = vImg(), th = vThumb();
    const cur = fromT || img.style.transform || 'none';
    const bg = el.querySelector('.v-bg'), bgO = getComputedStyle(bg).opacity;
    vChrome(false);
    const sp = M.spring(0.38, 1);
    M.play(el.querySelector('.v-info'), [{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' });
    let a;
    if (th) {
      th.el.closest('.pic').style.visibility = 'hidden';
      a = M.play(img, [{ transform: cur, borderRadius: V.full ? '0px' : '8px' }, { transform: vTf(img, th), borderRadius: 8 / (th.w / vFit(img, vGeo()).w) + 'px' }], Object.assign({}, sp, { fill: 'forwards' }));
    } else a = M.play(img, [{ transform: cur, opacity: 1 }, { transform: cur + ' scale(0.9)', opacity: 0 }], { duration: 240, easing: 'ease-in', fill: 'forwards' });
    M.play(bg, [{ opacity: bgO }, { opacity: 0 }], { duration: Math.min(300, sp.duration), easing: 'ease-out', fill: 'forwards' });
    (a ? a.finished : Promise.resolve()).catch(() => {}).then(() => {
      if (th && th.el.closest('.pic')) th.el.closest('.pic').style.visibility = '';
      el.remove(); V.el = null; V.busy = false; vPost();
    });
  }
  function vGo(n) { V.i = Math.max(0, Math.min(V.srcs.length - 1, n)); V.zoom = 1; V.px = V.py = 0; V.el.querySelectorAll('.v-slide img').forEach(im => im.style.transform = 'none'); vTrack(true); }
  function vBind(el) {
    let g = null, lastTap = 0, tapTimer = null;
    const pts = new Map();
    el.addEventListener('click', e => {
      const go = e.target.closest('[data-go]'); if (go) { e.stopPropagation(); if (go.closest('.v-grid')) vGo(+go.dataset.go); return; }
      const b = e.target.closest('[data-v]'); if (!b) return;
      e.stopPropagation();
      const v = b.dataset.v;
      if (v === 'close') closeViewer();
      else if (v === 'more') vMenu(!vMenu.on);
      else if (v === 'del') { vMenu(false); vConfirm(true); }
      else if (v === 'cancel') vConfirm(false);
      else if (v === 'confirm') vDelete();
      else { vMenu(false); toast(v === 'download' ? (V.items[V.i].video ? 'Video saved to Photos' : 'Saved to Photos') : 'Playback is not part of this demo'); render(); }
    });
    el.addEventListener('pointerdown', e => {
      if (!e.target.closest('.v-menu, [data-v="more"]')) vMenu(false);
      if (e.target.closest('.v-g, .v-info, .v-menu, .v-alert, .v-scrim') || V.busy) return;
      if (e.target.closest('.v-strip')) { vScrub(e); return; }
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      el.setPointerCapture(e.pointerId);
      if (pts.size === 2) { const [p, q] = [...pts.values()]; g = { pinch: true, d0: Math.hypot(p.x - q.x, p.y - q.y), z0: V.zoom }; return; }
      g = { x0: e.clientX, y0: e.clientY, t0: performance.now(), axis: null, px0: V.px, py0: V.py };
    });
    el.addEventListener('pointermove', e => {
      if (!g || !pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (g.pinch && pts.size === 2) { const [p, q] = [...pts.values()]; V.zoom = Math.max(1, Math.min(4, g.z0 * Math.hypot(p.x - q.x, p.y - q.y) / g.d0)); vZoomApply(false); return; }
      const dx = e.clientX - g.x0, dy = e.clientY - g.y0;
      if (!g.axis) {
        if (Math.hypot(dx, dy) < 8) return;
        g.axis = V.zoom > 1 ? 'pan' : (Math.abs(dx) > Math.abs(dy) ? 'x' : (dy > 0 ? 'down' : 'none'));
        if (g.axis === 'down') vChrome(false);
      }
      if (g.axis === 'pan') { V.px = g.px0 + dx; V.py = g.py0 + dy; vClampPan(); vZoomApply(false); }
      else if (g.axis === 'x') { const edge = (V.i === 0 && dx > 0) || (V.i === V.srcs.length - 1 && dx < 0); vTrack(false, edge ? dx / 3 : dx); }
      else if (g.axis === 'down') {
        const k = Math.max(0, dy);
        vImg().style.transform = `translate(${dx}px, ${k}px) scale(${1 - Math.min(k, 400) / 1400})`;
        el.querySelector('.v-bg').style.opacity = String(Math.max(0.15, 1 - k / 360));
      }
    });
    const up = e => {
      if (!g || !pts.has(e.pointerId)) return;
      pts.delete(e.pointerId);
      if (g.pinch) { if (pts.size === 0) { if (V.zoom < 1.05) { V.zoom = 1; V.px = V.py = 0; } vClampPan(); vZoomApply(true); g = null; } return; }
      const dx = e.clientX - g.x0, dy = e.clientY - g.y0, dt = performance.now() - g.t0;
      if (!g.axis) {
        const now = performance.now();
        if (now - lastTap < 280) { clearTimeout(tapTimer); lastTap = 0; vDoubleTap(e); }
        else { lastTap = now; tapTimer = setTimeout(() => vFull(!V.full), 280); }
      } else if (g.axis === 'x') {
        const w = vGeo().ia.w, v = dx / dt;
        let n = V.i; if (dx < -w * 0.22 || v < -0.45) n++; else if (dx > w * 0.22 || v > 0.45) n--;
        vGo(n);
      } else if (g.axis === 'down') {
        if (dy > 90 || dy / dt > 0.6) closeViewer(vImg().style.transform);
        else {
          const img = vImg(), from = img.style.transform; img.style.transform = 'none';
          M.play(img, [{ transform: from }, { transform: 'none' }], Object.assign({}, M.spring(0.35, 0.86), { fill: 'none' }));
          const bg = el.querySelector('.v-bg'), o = bg.style.opacity; bg.style.opacity = '';
          M.play(bg, [{ opacity: o }, { opacity: 1 }], { duration: 200, fill: 'none' });
          vChrome(!V.full);
        }
      }
      g = null;
    };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('wheel', e => { if (!e.ctrlKey) return; e.preventDefault(); V.zoom = Math.max(1, Math.min(4, V.zoom * Math.exp(-e.deltaY / 200))); if (V.zoom === 1) V.px = V.py = 0; vClampPan(); vZoomApply(false); }, { passive: false });
  }
  /* ··· (own posts): a menu with Delete; Delete asks again before it removes the item */
  function vMenu(on) {
    vMenu.on = on; if (!V.el) return;
    const m = V.el.querySelector('.v-menu'), b = V.el.querySelector('.v-col [data-v="more"]'); m.hidden = !on; if (!on || !b) return;
    const G = vGeo(), bx = parseFloat(b.style.left), by = parseFloat(b.style.top), mw = 180, mh = 52;
    Object.assign(m.style, G.r ? { left: (G.r.left ? bx + 56 : bx - 8 - mw) + 'px', top: (by + 48 - mh) + 'px' } : { left: (bx + 48 - mw) + 'px', top: (by - 8 - mh) + 'px' });
    M.play(m, [{ opacity: 0, transform: 'scale(.92)' }, { opacity: 1, transform: 'none' }], { duration: 180, easing: 'cubic-bezier(.32,.72,0,1)' });
  }
  function vConfirm(on) {
    const a = V.el.querySelector('.v-alert'), sc = V.el.querySelector('.v-scrim'), G = vGeo();
    a.hidden = sc.hidden = !on; if (!on) return;
    const vid = V.items[V.i] && V.items[V.i].video;
    a.innerHTML = `<b>Delete this ${vid ? 'video' : 'image'}?</b><p>It will be removed from this thesis for everyone. This can't be undone.</p><div><button data-v="cancel">Cancel</button><button data-v="confirm" class="danger">Delete</button></div>`;
    Object.assign(a.style, { left: (G.ca.cx - 135) + 'px', top: (G.H / 2) + 'px' });
    M.play(a, [{ opacity: 0, transform: 'translateY(-50%) scale(1.08)' }, { opacity: 1, transform: 'translateY(-50%)' }], { duration: 220, easing: 'cubic-bezier(.32,.72,0,1)' });
  }
  function vDelete() {
    vConfirm(false);
    const k = V.i; V.items.splice(k, 1); V.srcs.splice(k, 1); V.thumbs.splice(k, 1);
    toast('Deleted');
    if (!V.items.length) { V.el.remove(); V.el = null; vPost(); render(); return; }
    V.el.querySelectorAll('.v-slide')[k].remove();
    V.el.querySelector('.v-strip').innerHTML = V.items.map((m, j) => `<button data-go="${j}" aria-label="${m.video ? 'Video' : 'Image'} ${j + 1}"><img src="${m.src}" alt="" draggable="false"></button>`).join('');
    V.el.querySelector('.v-info').innerHTML = vInfoHTML();
    V.i = Math.min(k, V.items.length - 1); V.zoom = 1; V.px = V.py = 0;
    vLayout(true); render();
  }
  /* drag along the scrubber to move through the items, one per sliver */
  function vScrub(e) {
    const st = V.el.querySelector('.v-strip'), vert = st.classList.contains('vert'), i0 = V.i;
    const p0 = vert ? e.clientY : e.clientX; let moved = false;
    st.setPointerCapture(e.pointerId);
    const mv = ev => { const d = (vert ? ev.clientY : ev.clientX) - p0; if (Math.abs(d) > 4) moved = true;
      const n = Math.max(0, Math.min(V.items.length - 1, i0 + Math.round(d / 26))); if (n !== V.i) vGo(n); };
    const end = ev => { st.removeEventListener('pointermove', mv); st.removeEventListener('pointerup', end); st.removeEventListener('pointercancel', end);
      if (!moved) { const b = document.elementFromPoint(ev.clientX, ev.clientY); const go = b && b.closest('[data-go]'); if (go) vGo(+go.dataset.go); } };
    st.addEventListener('pointermove', mv); st.addEventListener('pointerup', end); st.addEventListener('pointercancel', end);
    e.stopPropagation();
  }
  function vClampPan() {
    const img = vImg(), G = vGeo(); if (!img) return;
    const w = img.offsetWidth * V.zoom, h = img.offsetHeight * V.zoom;
    const mx = Math.max(0, (w - G.ia.w) / 2), my = Math.max(0, (h - G.H) / 2);
    V.px = Math.max(-mx, Math.min(mx, V.px)); V.py = Math.max(-my, Math.min(my, V.py));
  }
  function vDoubleTap(e) {
    const img = vImg(); if (!img) return;
    if (V.zoom > 1) { V.zoom = 1; V.px = V.py = 0; }
    else { const r = img.getBoundingClientRect(); V.zoom = 2.5; V.px = (r.left + r.width / 2 - e.clientX) * 1.5; V.py = (r.top + r.height / 2 - e.clientY) * 1.5; vClampPan(); }
    vZoomApply(true);
  }
  app.addEventListener('click', e => {
    if (swipe && swipe.on) return;
    const pic = e.target.closest('.pic');
    if (pic && pic.querySelector('img')) { e.stopPropagation(); e.preventDefault(); openViewer(pic.querySelector('img')); return; }
  }, true);
  window.addEventListener('keydown', e => {
    if (!V.el) return;
    if (e.key === 'Escape') { const a = V.el.querySelector('.v-alert'); if (!a.hidden) vConfirm(false); else if (vMenu.on) vMenu(false); else closeViewer(); }
    else if (e.key === 'ArrowRight') vGo(V.i + 1);
    else if (e.key === 'ArrowLeft') vGo(V.i - 1);
  });
  window.addEventListener('resize', () => { layoutAllPics(); vLayout(false); });
  new MutationObserver(() => requestAnimationFrame(() => { layoutAllPics(); vLayout(false); })).observe(root, { attributes: true, attributeFilter: ['data-duo'] });
  if (parent !== window) parent.postMessage({ type: 'duo:ready' }, '*');
})();
