/* Onboarding v4 · create your first thesis
 * Figma: Thesis MVP · section 17617:186252 (draft, 2026-11-27).
 *
 * Landing teaching (one screen, three pages; Next only changes the copy while
 * the grey stage moves) → Login (shared setup page) → Invite code → C1 example
 * theses + Create with Alva → CH1–CH3 Alva chat → O1 Profile → Portfolio
 * (shared setup page) → Ready (shared) → For You with the new thesis pinned and
 * a six-step guide that continues on the Thesis page.
 *
 * Motion follows the existing onboarding: page changes use transitions.js;
 * content inside a page uses the Track variant's long ease-out
 * (cubic-bezier(.22,1,.36,1)) and its heading swap (old copy lifts away, new
 * copy rises in). The Thesis page opens from its card the way thesis-motion
 * does: the page grows out of the card with rounded corners, and squares them
 * only once it is full size. Login, invite check, broker access and publishing
 * are simulated.
 */
import { node, escapeHTML as esc } from './ui.js';
import { signalCard } from './intro.js?v=13';

export const V4_STEPS = ['landing', 'login', 'invite', 'create', 'chat', 'profile', 'portfolio', 'ready', 'home'];

const A = path => new URL(path, import.meta.url).href;
const EASE = 'cubic-bezier(.22,1,.36,1)';
const EASE_IO = 'cubic-bezier(.65,0,.35,1)';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const easeOut = t => 1 - Math.pow(1 - t, 4);
const easeInOut = t => t < .5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;

const LOGO = {
  GOOGL: A('../assets/feed-logo-goog.svg'), AMZN: A('../assets/feed-logo-amzn.svg'), MSFT: A('../assets/feed-logo-msft-real.svg'),
  NVDA: A('../assets/feed-logo-nvda-real.png'), TSLA: A('../assets/onboarding-tsla.svg'), QQQ: A('../assets/onboarding-qqq.svg'),
  META: A('../assets/feed-logo-meta.svg'), MU: A('../assets/filter-logo-mu.png'), AAPL: A('assets/v4/logo-aapl.png'),
  SNDK: A('assets/v4/logo-sndk.png'), AMD: A('../assets/feed-logo-amd.svg'),
};
const IMG = {
  chartGoogl: A('../assets/feed-real-googl.png'), chartMsft: A('../assets/feed-real-msft.png'), chartAmzn: A('../assets/feed-real-amzn.png'),
  chartNvda: A('../assets/feed-real-nvda.png'),
  alva: A('assets/alva-source-12646-154584.svg'), alvaApp: A('assets/alva-app-icon.svg'),
  stewie: A('../assets/feed-source-gavin-baker.png'), matt: A('../assets/social-matt-bryson.png'), semi: A('../assets/social-semianalysis.png'),
  jamie: A('assets/v4/avatar-jamie.png'), mickie: A('assets/v4/avatar-mickie.png'),
};
const ICON = {
  back: A('../assets/onboarding-arrow-left-l1.svg'), chat: A('../assets/ui-chat-ai-l.svg'), bookmark: A('../assets/thesis/first-card-imgBookmarkL.svg'),
  share: A('../assets/social-share.svg'), suggest: A('../assets/social-chat.svg'), add: A('../assets/thesis/detail/add.svg'),
  more: A('../assets/thesis/detail/more.svg'), up: A('../assets/ui-arrow-up-l1.svg'), check: A('../assets/ui-check-f2.svg'),
  bell: A('../assets/onboarding-notification-l.svg'), down: A('../assets/ui-arrow-down-l2.svg'), right: A('../assets/ui-arrow-right-l2.svg'),
  forYou: A('../assets/ui-for-you-f.svg'), search: A('../assets/onboarding-search-l.svg'), me: A('../assets/ui-me-l.svg'),
  plus: A('../assets/ui-add-l2.svg'), mic: A('../assets/ui-microphone-l.svg'),
};
const icon = (url, cls = '') => `<i class="v4-ic ${cls}" style="--ic:url('${url}')" aria-hidden="true"></i>`;
const dial = dir => `<i class="v4-dial ${dir === 'down' ? 'is-down' : ''}">${icon(ICON.up)}</i>`;
const chip = (symbol, dir = 'up', cls = '') => `<span class="v4-chip ${cls}">${LOGO[symbol] ? `<img src="${LOGO[symbol]}" alt="">` : `<i class="v4-chip-blank"></i>`}<span>${esc(symbol)}</span>${dir ? dial(dir) : ''}</span>`;

// A line from a seed; area under it, optional dots, all in one SVG.
function spark(seed, { w = 72, h = 18, rise = .55, dots = 0, area = true, flat = false } = {}) {
  const n = 28, pts = [];
  let v = .5, r = seed;
  for (let i = 0; i < n; i++) {
    r = (r * 9301 + 49297) % 233280;
    const noise = (r / 233280 - .5) * .12;
    v = flat ? .5 : Math.min(.95, Math.max(.05, .78 - rise * (i / (n - 1)) + noise));
    pts.push([i / (n - 1) * w, (flat ? .5 : v) * h]);
  }
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const id = `g${seed}${w}`;
  const marks = dots ? pts.filter((_, i) => i && i % Math.floor(n / dots) === 0).map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.6" class="v4-spark-dot"/>`).join('') : '';
  const end = pts.at(-1);
  return `<svg class="v4-spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".22"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>
    ${area && !flat ? `<path d="${d} L${w} ${h} L0 ${h}Z" fill="url(#${id})" class="v4-spark-area"/>` : ''}
    <path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke" class="v4-spark-line" pathLength="1"/>
    ${marks}${dots || flat ? `<circle cx="${end[0].toFixed(1)}" cy="${end[1].toFixed(1)}" r="3" class="v4-spark-end"/>` : ''}
  </svg>`;
}

function people(api) {
  const [gavin, satya, sam] = api.data.theses;
  return {
    gavin: { ...gavin, avatarUrl: api.asset(gavin.avatar) },
    satya: { ...satya, avatarUrl: api.asset(satya.avatar) },
    sam: { ...sam, avatarUrl: api.asset(sam.avatar) },
  };
}

// Feed card (Feed Card / Thesis), used on C1, in the G3a list and in For You.
function thesisCard(p, { tickers = [], ret, body, charts = [], bookmarks = 0, cls = '', role, time, avatar, more = false } = {}) {
  return `<article class="v4-tcard ${cls}">
    <div class="v4-author">${avatar || `<img class="v4-avatar" src="${p.avatarUrl}" alt="">`}<div class="v4-author-copy"><strong>${esc(p.author)}</strong><span>${esc(role ?? p.role)}</span></div><time>${esc(time ?? p.timestamp)}</time></div>
    ${tickers.length || ret ? `<div class="v4-trow"><div class="v4-chips">${tickers.map(t => chip(t[0], t[1])).join('')}</div>${ret ? `<span class="v4-ret">${spark(ret.seed, { w: 72, h: 18, rise: ret.flat ? 0 : .55, flat: ret.flat })}<b>${ret.label}</b></span>` : ''}</div>` : ''}
    <p class="v4-body">${body ?? esc(p.body)}${more ? '<span class="v4-more">Show more</span>' : ''}</p>
    ${charts.length ? `<div class="v4-charts">${charts.map(c => `<img src="${c}" alt="">`).join('')}</div>` : ''}
    <div class="v4-actions"><span>${icon(ICON.chat)}Ask Alva</span><span>${icon(ICON.bookmark)}${bookmarks}</span></div>
  </article>`;
}

function copySwap(holder, title, text) {
  const old = holder.querySelector('.v4-copy-text:not(.is-out)');
  const next = node('div', 'v4-copy-text', `<h1>${esc(title)}</h1><p>${esc(text)}</p>`);
  holder.append(next);
  if (!old) return;
  old.classList.add('is-out');
  old.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-10px)' }], { duration: 160, easing: 'ease-in', fill: 'forwards' }).finished.catch(() => {}).finally(() => old.remove());
  next.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 80, easing: EASE, fill: 'backwards' });
}

function tween(duration, ease, step, alive = () => true) {
  return new Promise(resolve => {
    const start = performance.now();
    const tick = now => {
      if (!alive()) return resolve(false);
      const t = Math.min(1, (now - start) / duration);
      step(ease(t));
      if (t < 1) requestAnimationFrame(tick); else resolve(true);
    };
    requestAnimationFrame(tick);
  });
}

/* ───────────────────────── Landing · G1–G3 ───────────────────────── */
const LANDING = [
  { title: 'Write a thesis. Alva tracks it.', text: 'Every day Alva reads the news, filings and posts behind it, and tells you what supports or challenges it.' },
  { title: 'Alva trades it for you.', text: 'It builds a position from your thesis, adjusts it as you update, and shows you the return.' },
  { title: 'Learn from the top theses.', text: 'The Leaderboard ranks theses by return. See what’s working for others.' },
];
const BOARD = [
  { name: 'Mickie', avatar: IMG.mickie, title: 'Nvidia Could Be Cisco 2000: Great Business, Poor Stock', ticker: 'NVDA', dir: 'down', ret: '+17.8%' },
  { name: 'harryz', title: 'Semis face near-term multiple compression despite strong demand', ticker: 'SMH', dir: 'down', ret: '+11.9%' },
  { name: 'Gavin Baker', avatarKey: 'gavin', title: 'Cheaper models redistribute AI margin toward infrastructure', ticker: 'GOOGL', dir: 'up', ret: '+12.4%' },
  { name: 'Satya Nadella', avatarKey: 'satya', title: 'Azure capacity keeps compounding through 2027', ticker: 'MSFT', dir: 'up', ret: '+9.6%' },
];

function renderLanding(api) {
  const P = people(api);
  const root = node('section', 'page v4-full v4-landing');
  root.setAttribute('aria-label', 'What Alva does');
  const signals = api.data.signals.slice(0, 3);
  root.innerHTML = `
    <div class="v4-stage" aria-hidden="true">
      <div class="v4-layer v4-detail"><div class="v4-col">
        <article class="v4-dcard">
          <div class="v4-author"><img class="v4-avatar" src="${P.gavin.avatarUrl}" alt=""><div class="v4-author-copy"><strong>Gavin Baker</strong><span>Managing Partner &amp; CIO, Atreides</span></div><time>Jul 13</time></div>
          <div class="v4-return"><b class="v4-return-num">+12.4%</b>${spark(7, { w: 313, h: 40, rise: .5, dots: 6 })}<div class="v4-return-axis"><span>24 Sep</span><span>Now</span></div></div>
          <div class="v4-timeline">
            <div class="v4-meta"><span>13 Sep, 08:12</span><span class="v4-latest">Latest</span></div>
            <span class="v4-chip is-outlined"><img src="${LOGO.GOOGL}" alt=""><span>GOOGL</span>${dial('up')}</span>
            <p class="v4-dbody">Cheaper models would increase the return on AI spending and drive more token demand, redistributing margin dollars toward AI infrastructure providers. [1]</p>
            <div class="v4-charts"><img src="${IMG.chartGoogl}" alt=""><img src="${IMG.chartAmzn}" alt=""></div>
          </div>
          <div class="v4-actions"><span>${icon(ICON.chat)}Ask Alva</span><span>${icon(ICON.bookmark)}68</span></div>
        </article>
        <h2 class="v4-signals-title">Signals</h2>
        <div class="v4-signal-list"></div>
      </div></div>
      <div class="v4-layer v4-list"><div class="v4-col">
        ${thesisCard(P.satya, { tickers: [['MSFT', 'up']], ret: { seed: 3, label: '+12.4%' }, charts: [IMG.chartMsft], bookmarks: 32, cls: 'v4-list-card is-above' })}
        ${thesisCard(P.gavin, { tickers: [['GOOGL', 'down'], ['AMZN', 'up']], ret: { seed: 7, label: '+12.4%' }, body: `${esc(P.gavin.body)} <a>[1]</a>`, charts: [IMG.chartGoogl, IMG.chartAmzn], bookmarks: 68, cls: 'v4-list-card is-focus' })}
        ${thesisCard(P.sam, { bookmarks: 41, cls: 'v4-list-card is-below' })}
        ${thesisCard(P.satya, { tickers: [['MSFT', 'up']], ret: { seed: 11, label: '+8.1%' }, charts: [IMG.chartMsft], bookmarks: 32, cls: 'v4-list-card is-below' })}
      </div></div>
      <div class="v4-layer v4-board"><div class="v4-col">
        <div class="v4-board-head"><span class="v4-trophy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.35A5 5 0 0 1 13 14.9V17h3v3H8v-3h3v-2.1A5 5 0 0 1 8.35 12H8a4 4 0 0 1-4-4V5h3V3Zm0 4H6v1a2 2 0 0 0 1 1.73V7Zm10 0v2.73A2 2 0 0 0 18 8V7h-1Z"/></svg></span>
          <h2>See whose calls are working.</h2><p>The Leaderboard shows which theses are making money and the people behind them.</p></div>
        ${BOARD.map((row, i) => `<div class="v4-board-row"><b class="v4-rank">${i + 1}</b><div class="v4-board-main"><div class="v4-board-who">${row.avatar || row.avatarKey ? `<img src="${row.avatar || P[row.avatarKey].avatarUrl}" alt="">` : '<i class="v4-chip-blank is-avatar"></i>'}<span>${esc(row.name)}</span></div><strong>${esc(row.title)}</strong>${chip(row.ticker, row.dir)}</div><b class="v4-board-ret">${row.ret}</b></div>`).join('')}
      </div></div>
    </div>
    <header class="v4-land-top"><button type="button" class="setup-skip v4-skip">Skip</button></header>
    <div class="v4-land-copy"><span class="v4-step" aria-live="polite">1 / 3</span><div class="v4-copy-holder"></div></div>
    <footer class="page-footer"><button class="btn btn-primary v4-next" type="button">Next</button></footer>`;
  const list = root.querySelector('.v4-signal-list');
  signals.forEach(s => list.append(signalCard(s, api)));
  const stage = root.querySelector('.v4-stage');
  const detail = root.querySelector('.v4-detail'), listLayer = root.querySelector('.v4-list'), board = root.querySelector('.v4-board');
  const col = detail.querySelector('.v4-col'), card = detail.querySelector('.v4-dcard');
  const holder = root.querySelector('.v4-copy-holder'), step = root.querySelector('.v4-step'), next = root.querySelector('.v4-next');
  let pageIndex = 0, token = 0, alive = true, colY = 0;
  copySwap(holder, LANDING[0].title, LANDING[0].text);

  const setCol = y => { colY = y; col.style.transform = `translateY(${-y}px)`; };
  const signalsY = () => Math.max(0, root.querySelector('.v4-signals-title').offsetTop - 115);
  const running = () => stage.getAnimations({ subtree: true });
  const valid = t => alive && t === token;

  // Final state of each page, without motion: also what an interrupted page snaps to.
  function settle(index) {
    running().forEach(a => a.cancel());
    detail.hidden = index === 2; listLayer.hidden = true; board.hidden = index !== 2;
    [detail, listLayer, board].forEach(l => { l.style.opacity = ''; l.style.filter = ''; l.style.transform = ''; });
    card.style.opacity = '';
    list.querySelectorAll('.signal-card').forEach(s => { s.style.opacity = ''; });
    root.querySelector('.v4-return-num').textContent = '+12.4%';
    if (index === 0) setCol(signalsY());
    if (index === 1) setCol(0);
  }

  async function playG1(t) {
    detail.hidden = false; board.hidden = true; listLayer.hidden = true;
    setCol(0);
    const cards = [...list.querySelectorAll('.signal-card')];
    cards.forEach(s => { s.style.opacity = '0'; });
    if (api.reduced()) return settle(0);
    // The card rises from below, grows to size and docks.
    await card.animate([{ opacity: 0, transform: 'translateY(360px) scale(.88)' }, { opacity: 1, offset: .35 }, { opacity: 1, transform: 'none' }],
      { duration: 760, easing: EASE, fill: 'backwards' }).finished.catch(() => {});
    if (!valid(t)) return;
    await sleep(260); if (!valid(t)) return;
    // The stage scrolls on; the signals come in one after another under it.
    const to = signalsY(), from = colY;
    const scroll = tween(1100, easeInOut, k => setCol(from + (to - from) * k), () => valid(t));
    cards.forEach((s, i) => {
      s.animate([{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 380 + i * 220, easing: EASE, fill: 'backwards' });
      s.style.opacity = '';
    });
    await scroll;
  }

  async function playG2(t) {
    if (api.reduced()) return settle(1);
    // Back up to the top of the thesis to show its return.
    const from = colY;
    await tween(820, easeInOut, k => setCol(from * (1 - k)), () => valid(t));
    if (!valid(t)) return;
    const line = card.querySelector('.v4-return .v4-spark-line'), area = card.querySelector('.v4-return .v4-spark-area');
    line.animate([{ strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDasharray: '1 1', strokeDashoffset: 0 }], { duration: 900, easing: 'cubic-bezier(.4,0,.2,1)' });
    area?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: 300, easing: 'ease-out', fill: 'backwards' });
    card.querySelectorAll('.v4-return circle').forEach((c, i) => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 140 + i * 120, fill: 'backwards' }));
    const num = root.querySelector('.v4-return-num');
    await tween(900, easeOut, k => { num.textContent = `+${(12.4 * k).toFixed(1)}%`; }, () => valid(t));
  }

  async function playG3(t) {
    if (api.reduced()) return settle(2);
    // G3a · the thesis folds back into a list of theses…
    listLayer.hidden = false;
    const focus = listLayer.querySelector('.is-focus');
    const lift = (detail.querySelector('.v4-dcard').getBoundingClientRect().top - focus.getBoundingClientRect().top);
    detail.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.94)' }], { duration: 360, easing: EASE, fill: 'forwards' });
    focus.animate([{ opacity: 0, transform: `translateY(${lift}px) scale(1.04)` }, { opacity: 1, transform: 'none' }], { duration: 520, easing: EASE, fill: 'backwards' });
    listLayer.querySelectorAll('.is-above').forEach(c => c.animate([{ opacity: 0, transform: 'translateY(-40px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 80, easing: EASE, fill: 'backwards' }));
    listLayer.querySelectorAll('.is-below').forEach((c, i) => c.animate([{ opacity: 0, transform: 'translateY(60px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 120 + i * 60, easing: EASE, fill: 'backwards' }));
    await sleep(820); if (!valid(t)) return;
    detail.hidden = true;
    // G3b · …that scrolls up fast and blurs, and the Leaderboard lands.
    listLayer.animate([{ transform: 'none', filter: 'blur(0)' }, { transform: 'translateY(-620px)', filter: 'blur(10px)', opacity: 0 }], { duration: 560, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' });
    board.hidden = false;
    board.animate([{ opacity: 0, transform: 'translateY(160px)', filter: 'blur(10px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 640, delay: 300, easing: EASE, fill: 'backwards' });
    board.querySelector('.v4-trophy').animate([{ transform: 'scale(.6)' }, { transform: 'scale(1.08)', offset: .6 }, { transform: 'none' }], { duration: 520, delay: 560, easing: 'cubic-bezier(.3,0,.3,1)', fill: 'backwards' });
    board.querySelectorAll('.v4-board-row').forEach((r, i) => r.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 460, delay: 520 + i * 90, easing: EASE, fill: 'backwards' }));
    await sleep(1400); if (!valid(t)) return;
    listLayer.hidden = true;
  }

  async function show(index) {
    const t = ++token;
    if (index > 0) settle(pageIndex);
    pageIndex = index;
    step.textContent = `${index + 1} / 3`;
    next.textContent = index === 2 ? 'Get started' : 'Next';
    if (index > 0) copySwap(holder, LANDING[index].title, LANDING[index].text);
    await [playG1, playG2, playG3][index](t);
  }
  next.addEventListener('click', () => { if (pageIndex === 2) api.go('login'); else show(pageIndex + 1); });
  root.querySelector('.v4-skip').addEventListener('click', () => api.go('login'));
  // A deliberate tap on the stage finishes the current motion at once.
  stage.addEventListener('pointerdown', () => { if (running().length) { token++; settle(pageIndex); } });
  root.start = () => { show(0); };
  root.cleanup = () => { alive = false; token++; };
  // Before start() the card waits below the stage, so the first frame matches the entrance.
  card.style.opacity = '0';
  queueMicrotask(() => { card.style.opacity = ''; });
  if (api.reduced()) queueMicrotask(() => settle(0));
  return root;
}

/* ───────────────────────── A3 · Invite code ───────────────────────── */
const KEY_ROWS = { abc: ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'], num: ['1234567890', '-/:;()$&@"', '.,?!\''] };
function renderInvite(api) {
  const root = node('section', 'setup-page v4-invite v4-full-bottom');
  root.setAttribute('aria-label', 'Alva is invite-only.');
  api.state.invite ||= '';
  root.innerHTML = `<header class="setup-topbar"><button type="button" class="setup-back" aria-label="Back"><img src="${ICON.back}" alt=""></button></header>
    <div class="v4-invite-body">
      <div class="setup-heading"><h1>Alva is invite-only.</h1><p>A community of investors who track their theses in public. Enter the code a member gave you.</p></div>
      <label class="v4-code" aria-label="Invite code">${Array.from({ length: 6 }, (_, i) => `<span class="v4-code-cell" data-i="${i}"></span>`).join('')}
        <input class="v4-code-input" inputmode="text" autocomplete="one-time-code" autocapitalize="characters" maxlength="6" spellcheck="false" aria-label="Invite code"></label>
      <p class="v4-request">No invite code? <button type="button" class="v4-link">Request one</button></p>
    </div>
    <footer class="setup-dock v4-invite-dock"><button class="setup-next" type="button" disabled>Join Alva</button></footer>
    <div class="v4-keyboard" aria-hidden="true"></div>`;
  const cells = [...root.querySelectorAll('.v4-code-cell')], input = root.querySelector('.v4-code-input'), join = root.querySelector('.setup-next');
  const kb = root.querySelector('.v4-keyboard');
  let mode = 'abc';
  function drawKeyboard() {
    const rows = KEY_ROWS[mode];
    kb.innerHTML = `<div class="v4-kb-row">${[...rows[0]].map(k => `<button type="button" class="v4-key" data-k="${esc(k)}">${esc(k)}</button>`).join('')}</div>
      <div class="v4-kb-row is-mid">${[...rows[1]].map(k => `<button type="button" class="v4-key" data-k="${esc(k)}">${esc(k)}</button>`).join('')}</div>
      <div class="v4-kb-row"><button type="button" class="v4-key is-fn" data-fn="shift">${mode === 'abc' ? '⇧' : '#+='}</button>${[...rows[2]].map(k => `<button type="button" class="v4-key" data-k="${esc(k)}">${esc(k)}</button>`).join('')}<button type="button" class="v4-key is-fn" data-fn="del">⌫</button></div>
      <div class="v4-kb-row"><button type="button" class="v4-key is-fn is-wide" data-fn="mode">${mode === 'abc' ? '123' : 'ABC'}</button><button type="button" class="v4-key is-space" data-k=" ">space</button><button type="button" class="v4-key is-fn is-wide" data-fn="return">return</button></div>
      <div class="v4-kb-extra"><span>☺</span>${icon(ICON.mic)}</div>`;
  }
  function update() {
    const code = api.state.invite;
    cells.forEach((c, i) => { c.textContent = code[i] || ''; c.classList.toggle('is-caret', i === code.length); });
    input.value = code;
    join.disabled = code.length < 6;
  }
  function type(ch) {
    if (/^[a-z0-9]$/i.test(ch) && api.state.invite.length < 6) {
      api.state.invite += ch.toUpperCase();
      const cell = cells[api.state.invite.length - 1];
      cell.animate([{ transform: 'scale(.92)' }, { transform: 'none' }], { duration: 160, easing: EASE });
    }
    update();
  }
  kb.addEventListener('pointerdown', e => e.preventDefault());
  kb.addEventListener('click', e => {
    const key = e.target.closest('.v4-key'); if (!key) return;
    if (key.dataset.k) type(key.dataset.k);
    else if (key.dataset.fn === 'del') { api.state.invite = api.state.invite.slice(0, -1); update(); }
    else if (key.dataset.fn === 'mode') { mode = mode === 'abc' ? 'num' : 'abc'; drawKeyboard(); }
    else if (key.dataset.fn === 'return' && !join.disabled) join.click();
  });
  input.addEventListener('input', () => { api.state.invite = input.value.replace(/[^a-z0-9]/gi, '').slice(0, 6).toUpperCase(); update(); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !join.disabled) join.click(); });
  root.querySelector('.setup-back').addEventListener('click', () => api.go('login'));
  root.querySelector('.v4-link').addEventListener('click', () => api.toast('Request sent. We’ll email you when a spot opens.'));
  join.addEventListener('click', async () => {
    join.disabled = true; join.innerHTML = '<span class="v4-spinner" aria-label="Checking"></span>';
    await sleep(api.reduced() ? 0 : 650);
    if (root.isConnected) api.go('create');
  });
  drawKeyboard(); update();
  root.start = () => { if (matchMedia('(pointer:fine)').matches) input.focus({ preventScroll: true }); };
  return root;
}

/* ───────────────────────── C1 · Create your first thesis ───────────────────────── */
function renderCreate(api) {
  const P = people(api);
  const root = node('section', 'setup-page v4-create');
  root.setAttribute('aria-label', 'Create your first thesis');
  root.innerHTML = `<header class="setup-topbar"><button type="button" class="setup-skip v4-switch">Switch account</button></header>
    <div class="v4-create-body">
      <div class="setup-heading"><h1>Create your first thesis</h1><p>Write your view once. Alva tracks it every day and shows how the call performs.</p></div>
      <h2 class="v4-subhead">Theses people are tracking</h2>
      <div class="v4-carousel" tabindex="0" aria-label="Example theses">
        ${thesisCard(P.gavin, { tickers: [['GOOGL', 'down'], ['AMZN', 'up']], ret: { seed: 7, label: '+12.4%' }, body: `${esc(P.gavin.body)} <a>[1]</a>`, charts: [IMG.chartGoogl, IMG.chartAmzn], bookmarks: 68, cls: 'v4-slide' })}
        ${thesisCard(P.satya, { tickers: [['MSFT', 'down']], ret: { seed: 3, label: '+12.4%' }, body: `${esc(P.satya.body)} <a>[1]</a>`, charts: [IMG.chartMsft], bookmarks: 32, cls: 'v4-slide' })}
        ${thesisCard(P.sam, { bookmarks: 41, cls: 'v4-slide' })}
      </div>
      <div class="v4-dots" aria-hidden="true"><i></i><i></i><i></i></div>
    </div>
    <footer class="setup-dock"><button class="setup-next v4-create-alva" type="button">Create with Alva</button></footer>`;
  const carousel = root.querySelector('.v4-carousel'), dots = [...root.querySelectorAll('.v4-dots i')];
  const slides = [...carousel.querySelectorAll('.v4-slide')];
  const current = () => {
    const mid = carousel.scrollLeft + carousel.clientWidth / 2;
    let best = 0, dist = Infinity;
    slides.forEach((s, i) => { const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = i; } });
    return best;
  };
  const paint = () => { const i = current(); dots.forEach((d, k) => d.classList.toggle('is-on', k === i)); slides.forEach((s, k) => s.classList.toggle('is-current', k === i)); };
  carousel.addEventListener('scroll', () => requestAnimationFrame(paint), { passive: true });
  const center = (i, behavior = 'auto') => carousel.scrollTo({ left: slides[i].offsetLeft - (carousel.clientWidth - slides[i].offsetWidth) / 2, behavior });
  root.querySelector('.v4-switch').addEventListener('click', () => api.go('login'));
  root.querySelector('.v4-create-alva').addEventListener('click', () => api.go('chat'));
  requestAnimationFrame(() => { center(1); paint(); });
  return root;
}

/* ───────────────────────── CH1–CH3 · Alva chat ───────────────────────── */
const OPTIONS_START = ['Start from one of the examples', 'I’m bearish on TSLA', 'Something about gold'];
const DRAFTS = {
  [OPTIONS_START[0]]: { said: 'NVDA keeps beating estimates as hyperscaler capex rises into 2027.', body: 'NVDA keeps beating estimates as hyperscaler capex rises into 2027. Demand is still ahead of supply, the product cycle is getting faster, and software lock-in keeps pricing power intact.', ticker: 'NVDA', side: 'long' },
  [OPTIONS_START[1]]: { said: 'I’m bearish on TSLA', body: 'TSLA’s auto margins keep shrinking as price cuts outrun volume growth, and robotaxi revenue is still years away from offsetting it.', ticker: 'TSLA', side: 'short' },
  [OPTIONS_START[2]]: { said: 'Something about gold', body: 'Gold keeps climbing as central banks keep buying and real rates ease; dips are being bought faster than in past cycles.', ticker: 'GLD', side: 'long' },
};
function renderChat(api) {
  const root = node('section', 'setup-page v4-chat');
  root.setAttribute('aria-label', 'Create a thesis with Alva');
  root.innerHTML = `<header class="v4-chat-head"><button type="button" class="setup-back" aria-label="Back"><img src="${ICON.back}" alt=""></button>
      <span class="v4-alva-pill"><img src="${IMG.alvaApp}" alt=""><b>Alva</b></span></header>
    <div class="v4-chat-scroll"><div class="v4-chat-log" aria-live="polite"><p class="v4-chat-time">11:48 PM</p></div></div>
    <footer class="v4-chat-bottom">
      <form class="v4-composer"><span class="v4-composer-plus">${icon(ICON.plus)}</span><input type="text" placeholder="Ask Alva, hold to talk" aria-label="Message Alva" enterkeyhint="send"><span class="v4-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></form>
      <button class="setup-next v4-to-profile" type="button" hidden>Set up profile</button>
    </footer>`;
  const scroller = root.querySelector('.v4-chat-scroll'), log = root.querySelector('.v4-chat-log');
  const form = root.querySelector('.v4-composer'), field = form.querySelector('input'), toProfile = root.querySelector('.v4-to-profile');
  let alive = true, busy = false, draft = null;
  const name = 'Hugo';
  const toBottom = () => {
    const from = scroller.scrollTop, to = scroller.scrollHeight - scroller.clientHeight;
    if (api.reduced() || to - from < 2) { scroller.scrollTop = to; return; }
    tween(420, easeOut, k => { scroller.scrollTop = from + (to - from) * k; }, () => alive);
  };
  const enter = el => { if (!api.reduced()) el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: EASE, fill: 'backwards' }); };
  async function alva(html, { options, onPick, cls = '' } = {}) {
    const typing = node('div', 'v4-bubble is-alva is-typing', '<i></i><i></i><i></i>');
    log.append(typing); enter(typing); toBottom();
    await sleep(api.reduced() ? 0 : 750);
    if (!alive) return;
    const bubble = node('div', `v4-bubble is-alva ${cls}`, html);
    typing.replaceWith(bubble);
    if (options) {
      const group = node('div', 'v4-options');
      options.forEach((label, i) => {
        const b = node('button', 'v4-option', `<span>${esc(label)}</span>`); b.type = 'button';
        b.addEventListener('click', () => { if (busy || group.dataset.done) return; group.dataset.done = '1'; mark(group, b); onPick(label); });
        group.append(b);
        if (!api.reduced()) b.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 280, delay: 120 + i * 70, easing: EASE, fill: 'backwards' });
      });
      bubble.append(group);
    }
    toBottom();
    return bubble;
  }
  function mark(group, chosen) {
    group.querySelectorAll('.v4-option').forEach(o => { o.disabled = true; o.classList.toggle('is-chosen', o === chosen); });
    chosen.insertAdjacentHTML('beforeend', `<i class="v4-option-check" aria-hidden="true"></i>`);
  }
  function user(text) {
    const b = node('div', 'v4-bubble is-user', esc(text));
    log.append(b); enter(b); toBottom();
  }
  function draftCard(d, label = 'Draft') {
    const card = node('article', 'v4-draft', `<div class="v4-draft-who"><i class="v4-me-avatar" aria-hidden="true"></i><div><strong>${name}</strong><span class="v4-draft-label">${label}</span></div></div>
      <p>${esc(d.body)}</p>${chip(d.ticker, null, 'is-quiet')}`);
    log.append(card);
    if (!api.reduced()) card.animate([{ opacity: 0, transform: 'translateY(20px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 480, easing: EASE, fill: 'backwards' });
    toBottom();
    return card;
  }
  async function propose(d) {
    busy = true;
    await alva(`Here’s a draft. I’ll track it on $${esc(d.ticker)}, ${d.side}.`);
    if (!alive) return;
    await sleep(api.reduced() ? 0 : 200);
    d.card = draftCard(d);
    await sleep(api.reduced() ? 0 : 500);
    await alva('<p>Want me to publish it, or change anything?</p>', { cls: 'has-options', options: ['Publish', 'Change something'], onPick: label => label === 'Publish' ? publish(d) : change(d) });
    busy = false;
  }
  async function publish(d) {
    busy = true; user('Publish');
    d.card.querySelector('.v4-draft-label').textContent = 'Your thesis';
    api.state.myThesis = { body: d.body, ticker: d.ticker, side: d.side, author: name };
    await alva('Published. I’m already reading sources for it, and its simulated return starts today. Next, set up your profile so people know who’s behind the call.');
    if (!alive) return;
    // CH3: the composer folds away and the next step takes its place.
    if (!api.reduced()) await form.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(12px)' }], { duration: 180, easing: 'ease-in', fill: 'forwards' }).finished.catch(() => {});
    form.hidden = true; toProfile.hidden = false;
    if (!api.reduced()) toProfile.animate([{ opacity: 0, transform: 'translateY(12px)' }], { duration: 320, easing: EASE, fill: 'backwards' });
    toBottom();
  }
  async function change(d) {
    busy = true; user('Change something');
    await alva('<p>Sure. What should change?</p>', { cls: 'has-options', options: ['Make it shorter', d.side === 'long' ? 'Make it a short' : 'Make it a long'], onPick: label => {
      user(label);
      const next = { ...d };
      if (label === 'Make it shorter') next.body = d.body.split(/(?<=\.)\s|;\s|,\s(?=and)/)[0].replace(/[;,]$/, '') + (/\.$/.test(d.body.split(/(?<=\.)\s/)[0]) ? '' : '.');
      else next.side = d.side === 'long' ? 'short' : 'long';
      propose(next);
    } });
    busy = false;
  }
  function start(label, typed = false) {
    const preset = DRAFTS[label];
    let d = preset;
    if (typed || !preset) {
      const known = Object.keys(LOGO).find(sym => new RegExp(`\\$?\\b${sym}\\b`, 'i').test(label));
      d = { said: label, body: label.replace(/\s*$/, /[.!?]$/.test(label) ? '' : '.'), ticker: known || 'NVDA', side: /bear|short|fall|drop|down/i.test(label) ? 'short' : 'long' };
    }
    user(d.said);
    draft = d;
    propose(d);
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = field.value.trim(); if (!text || busy) return;
    field.value = '';
    if (draft) { user(text); api.toast('This preview only drafts your first message.'); return; }
    log.querySelector('.v4-options')?.setAttribute('data-done', '1');
    log.querySelectorAll('.v4-options .v4-option').forEach(o => { o.disabled = true; });
    start(text, true);
  });
  root.querySelector('.setup-back').addEventListener('click', () => api.go('create'));
  toProfile.addEventListener('click', () => api.go('profile'));
  root.start = async () => {
    await sleep(api.reduced() ? 0 : 200);
    await alva('<p>Let’s write your first thesis. Tell me what you’re watching: a ticker, a theme, or your view in one sentence. I’ll draft it and find the data behind it.</p>', { cls: 'has-options is-starter', options: OPTIONS_START, onPick: label => start(label) });
  };
  root.cleanup = () => { alive = false; };
  return root;
}

/* ───────────────────────── O1 · Profile ───────────────────────── */
const FOLLOW = ['NVDA', 'AAPL', 'TSLA', 'QQQ', 'SNDK', 'GOOGL', 'META', 'MU'];
function renderProfile(api) {
  api.state.watch ||= new Set(['NVDA', 'SNDK']);
  const root = node('section', 'setup-page v4-profile');
  root.setAttribute('aria-label', 'Set up your profile.');
  root.innerHTML = `<header class="setup-topbar"><button type="button" class="setup-back" aria-label="Back"><img src="${ICON.back}" alt=""></button></header>
    <div class="v4-profile-body">
      <div class="setup-heading"><h1>Set up your profile.</h1><p>From your X profile. This is how others see you.</p></div>
      <div class="v4-identity">
        <button type="button" class="v4-photo" aria-label="Change photo"><img src="${IMG.jamie}" alt=""><span class="v4-photo-edit"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.2 2 3.5 3H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H8.5l-.7-1H4.2Zm1.8 2.2a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6Z"/></svg></span></button>
        <label class="v4-field"><span>Name</span><input value="Jamie Lin" autocomplete="name"></label>
        <p class="v4-handle">@jamielin_ · <button type="button" class="v4-link">Edit</button></p>
        <label class="v4-field"><span>Bio (optional)</span><input value="Semis &amp; AI infra. Long-only, 3–5y horizon." placeholder="What do you invest in?"></label>
      </div>
      <div class="v4-follow"><h2>What do you follow? (optional)</h2><p>Added to your watchlist</p>
        <div class="v4-follow-chips">${FOLLOW.map(s => `<button type="button" class="v4-follow-chip" data-sym="${s}"><img src="${LOGO[s]}" alt=""><span>${s}</span></button>`).join('')}<button type="button" class="v4-follow-chip is-more"><span>More</span>${icon(ICON.right)}</button></div>
      </div>
    </div>
    <footer class="setup-dock"><button class="setup-next" type="button">Continue</button></footer>`;
  const paint = () => root.querySelectorAll('[data-sym]').forEach(b => {
    const on = api.state.watch.has(b.dataset.sym);
    b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on));
  });
  root.querySelectorAll('[data-sym]').forEach(b => b.addEventListener('click', () => {
    const s = b.dataset.sym; api.state.watch.has(s) ? api.state.watch.delete(s) : api.state.watch.add(s); paint();
    if (!api.reduced()) b.animate([{ transform: 'scale(.95)' }, { transform: 'none' }], { duration: 180, easing: EASE });
  }));
  root.querySelector('.is-more').addEventListener('click', () => api.toast('Search all tickers in the full app.'));
  root.querySelector('.v4-photo').addEventListener('click', () => api.toast('Photo comes from your X profile.'));
  root.querySelector('.v4-handle .v4-link').addEventListener('click', () => api.toast('Your handle can be changed later in Settings.'));
  root.querySelector('.setup-back').addEventListener('click', () => api.go('chat'));
  root.querySelector('.setup-next').addEventListener('click', () => api.go('portfolio'));
  paint();
  return root;
}

/* ───────────────────────── F1 + D1–D4 · For You and the Thesis page guide ───────────────────────── */
const GUIDE = [
  { title: 'Your thesis is live', text: 'It’s pinned to the top of For You. Open it to see how Alva tracks it.', action: 'Open thesis' },
  { title: 'Simulated return', text: 'Starts at 0% today and moves with the tickers and direction in your thesis.', action: 'Next' },
  { title: 'Overview', text: 'Every day Alva sums up what supports and challenges your thesis. Your first one is being written now.', action: 'Next' },
  { title: 'Signals', text: 'Every filing, news story and post Alva finds for your thesis, each marked as supporting or challenging it.', action: 'Next' },
  { title: 'Update your view', text: 'When your view changes, post an update. Alva keeps the full history.', action: 'Next' },
  { title: 'See what others are tracking', text: 'Go back to explore other people’s theses on For You and the Leaderboard.', action: 'Back to For You' },
];
const DETAIL_SIGNALS = [
  { avatar: IMG.semi, name: 'SemiAnalysis', role: 'Semiconductor & AI research', time: '12 Aug, 07:00', quote: 'SemiAnalysis reports TPUv8i is in internal software bring-up, with work beginning on the public software stack.', link: 'x.com', stance: 'Mixed', analysis: 'TPU commercialization could support the infrastructure thesis; adoption and returns remain unproven.' },
  { avatar: IMG.matt, name: 'Matt Bryson', role: 'Managing Director, Equity Research · Wedbush', time: '12 Aug, 03:00', quote: 'Matt Bryson, Wedbush analyst, sees an opportunity for Marvell and TSMC as Microsoft prepares Maia 300.', link: 'tradingview.com', stance: 'Mixed', analysis: 'Custom accelerators may lower compute costs; an unveiling is not evidence of deployment or returns.' },
  { avatar: LOGO.AMD, name: 'Market data', role: 'Price & volume', time: '12 Aug, 10:40', quote: 'AMD closed above its July pullback high on volume 1.6× its 50-day average.', link: 'nasdaq.com', stance: 'Supports', analysis: 'Heavier volume on the breakout supports the view that more buyers are joining the advance.' },
];
const thumb = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 7v6.5M5 7l2.4-4.6a1.2 1.2 0 0 1 2.2.9L9 6.5h3.3a1.3 1.3 0 0 1 1.3 1.5l-.8 4.4a1.3 1.3 0 0 1-1.3 1.1H5m0-6.5H3v6.5h2" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg>';
const cross = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>';

function renderHome(api) {
  const P = people(api);
  const mine = api.state.myThesis || { body: DRAFTS[OPTIONS_START[0]].body.split('. ')[0] + '.', ticker: 'NVDA', author: 'Hugo' };
  const shortBody = mine.body.split(/(?<=\.)\s/)[0];
  const root = node('section', 'page v4-full v4-home');
  root.setAttribute('aria-label', 'For You');
  const pills = ['All', 'Chips', 'Memory', 'Hyperscaler', 'Neocloud', 'Power'];
  root.innerHTML = `
    <div class="v4-feed">
      <header class="v4-feed-head"><h1>For You</h1><button type="button" class="v4-bell" aria-label="Notifications">${icon(ICON.bell)}</button></header>
      <nav class="v4-pills">${pills.map((p, i) => `<span class="${i ? '' : 'is-on'}">${p}</span>`).join('')}<i class="v4-pills-more">${icon(ICON.down)}</i></nav>
      <div class="v4-feed-scroll">
        <div class="v4-pinned">${thesisCard({ author: mine.author }, { avatar: '<i class="v4-me-avatar v4-avatar"></i>', role: 'Your thesis', time: 'Just now', tickers: [[mine.ticker, null]], ret: { seed: 5, label: '+0.0%', flat: true }, body: esc(shortBody), bookmarks: 0, cls: 'is-flat' })}</div>
        ${thesisCard(P.gavin, { tickers: [['GOOGL', 'down'], ['AMZN', 'up']], ret: { seed: 7, label: '+12.4%' }, body: 'Baker argues that cheaper models are already lowering the cost of AI use. If cheaper models take share from frontier labs with high inference margins, customers could get more intelligence for each dollar and increase their token usage. Under that scenario, part of the profit pool could move from model providers to AI infrastructure. He sees low delivery cost per…', more: true, charts: [IMG.chartGoogl, IMG.chartAmzn], bookmarks: 68, cls: 'is-flat' })}
        ${thesisCard(P.satya, { tickers: [['MSFT', 'up']], ret: { seed: 3, label: '+12.4%' }, charts: [IMG.chartMsft], bookmarks: 32, cls: 'is-flat' })}
        ${thesisCard(P.sam, { bookmarks: 41, cls: 'is-flat' })}
      </div>
      <nav class="v4-tabbar" aria-label="Tabs"><div class="v4-tabs"><span class="is-on">${icon(ICON.forYou)}For You</span><span>${icon(ICON.chat)}Alva</span><span>${icon(ICON.search)}Search</span><span>${icon(ICON.me)}Me</span></div>
        <button type="button" class="v4-fab" aria-label="Create">${icon(ICON.plus)}</button></nav>
    </div>
    <div class="v4-detail-page gen-demo" hidden>
      <header class="gen-topbar"><button class="gen-icon-btn v4-detail-back" type="button" aria-label="Back"><i class="gen-icon" style="--icon:url('${ICON.back}')"></i></button>
        <div class="gen-identity"><img class="gen-avatar-32" src="${IMG.stewie}" alt=""><div class="gen-identity-copy"><strong>Traderstewie</strong><span>Trader · Trade setup</span></div></div>
        <button class="gen-update v4-update" type="button"><i class="gen-icon" style="--icon:url('${ICON.add}')"></i>Update</button>
        <button class="gen-icon-btn" type="button" aria-label="More"><i class="gen-icon" style="--icon:url('${ICON.more}')"></i></button></header>
      <main class="gen-scroll v4-detail-scroll">
        <section class="v4-sim"><b>+0.0%</b>${spark(1, { w: 361, h: 24, flat: true })}<div class="v4-return-axis"><span>Today</span><span>Now</span></div></section>
        <section class="gen-update-block">
          <div class="gen-meta"><span>Just now</span><span class="gen-chip-latest">Latest</span></div>
          <div class="gen-ticker"><img src="${LOGO.GOOGL}" alt=""><span>GOOGL</span><i class="gen-dial"><i class="gen-icon" style="--icon:url('${ICON.up}')"></i></i></div>
          <p class="gen-body">AMD is approaching its summer high as more buyers join the advance.<br>The stock has broken higher after its last pullback stopped above the previous low. Rising trading volume makes the recovery more convincing. [1]</p>
          <div class="gen-chart"><img src="${IMG.chartGoogl}" alt="Alphabet · GOOGL chart"></div>
        </section>
        <nav class="gen-tabs v4-dtabs"><button type="button" class="is-active" data-tab="overview">Overview</button><button type="button" data-tab="signals"><svg class="v4-radio" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="1.6" fill="currentColor"/><path d="M5.2 5.2a4 4 0 0 0 0 5.6M10.8 5.2a4 4 0 0 1 0 5.6M3.4 3.4a6.5 6.5 0 0 0 0 9.2M12.6 3.4a6.5 6.5 0 0 1 0 9.2" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>Signals</button></nav>
        <section class="v4-panel" data-panel="overview">
          <article class="v4-overview"><div class="v4-overview-head"><img src="${IMG.alva}" alt=""><strong>Writing your first overview…</strong></div>
            <p>Alva is reading the sources behind your thesis to sum up what supports and challenges it.</p>
            <div class="gen-skeleton v4-ov-skel"><i class="gen-bone" style="width:72px;height:20px;border-radius:6px"></i><i class="gen-bone" style="width:100%;height:12px"></i><i class="gen-bone" style="width:76%;height:12px"></i><i class="gen-bone" style="width:72px;height:20px;border-radius:6px;margin-top:8px"></i><i class="gen-bone" style="width:62%;height:12px"></i></div>
          </article>
        </section>
        <section class="v4-panel v4-dsignals" data-panel="signals" hidden>
          ${DETAIL_SIGNALS.map(s => `<article class="v4-dsignal"><div class="v4-dsignal-card"><div class="v4-author"><img class="v4-avatar" src="${s.avatar}" alt=""><div class="v4-author-copy"><strong>${esc(s.name)}</strong><span>${esc(s.role)}</span></div><time>${esc(s.time)}</time></div><p>${esc(s.quote)} <a>${esc(s.link)}</a></p></div>
            <p class="v4-dsignal-analysis"><span class="gen-stance"><span class="gen-stance-alva"><img src="${IMG.alva}" alt=""></span><em class="gen-stance-tag ${s.stance === 'Supports' ? 'is-supports' : ''}">${s.stance}</em></span> ${esc(s.analysis)}</p>
            <div class="v4-feedback">${thumb}${cross}</div></article>`).join('')}
        </section>
      </main>
      <div class="gen-suggest"><button type="button"><i class="gen-icon" style="--icon:url('${ICON.suggest}')"></i>Summarize signals</button><button type="button"><i class="gen-icon" style="--icon:url('${ICON.suggest}')"></i>What changed today?</button><button type="button"><i class="gen-icon" style="--icon:url('${ICON.suggest}')"></i>Bull vs bear</button></div>
      <footer class="gen-cta"><span class="gen-cta-ask"><i class="gen-icon" style="--icon:url('${ICON.chat}')"></i>Ask Alva</span><span class="gen-cta-actions"><span><i class="gen-icon" style="--icon:url('${ICON.bookmark}')"></i>68</span><i class="gen-icon" style="--icon:url('${ICON.share}')"></i></span></footer>
    </div>`;
  const feed = root.querySelector('.v4-feed'), detail = root.querySelector('.v4-detail-page'), pinned = root.querySelector('.v4-pinned .v4-tcard');
  const scroll = root.querySelector('.v4-detail-scroll'), tabs = root.querySelector('.v4-dtabs');
  const overlays = document.querySelector('#overlays');
  let alive = true, guideStep = -1, coach = null, opening = null;
  const unit = () => root.getBoundingClientRect().width / root.offsetWidth || 1;
  const rel = el => { const b = document.querySelector('.onboarding-app').getBoundingClientRect(), r = el.getBoundingClientRect(), u = unit(); return { x: (r.left - b.left) / u, y: (r.top - b.top) / u, w: r.width / u, h: r.height / u }; };

  function selectTab(name) {
    tabs.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('is-active', b.dataset.tab === name));
    root.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== name; });
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b && guideStep < 0) selectTab(b.dataset.tab); });

  function scrollTo(target, ms = 560) {
    const from = scroll.scrollTop, to = Math.min(target, scroll.scrollHeight - scroll.clientHeight);
    if (api.reduced() || Math.abs(to - from) < 2) { scroll.scrollTop = to; return Promise.resolve(); }
    return tween(ms, easeInOut, k => { scroll.scrollTop = from + (to - from) * k; }, () => alive);
  }
  const tabsTop = () => root.querySelector('.v4-sim').offsetHeight + root.querySelector('.gen-update-block').offsetHeight;

  // The Thesis page grows out of the card, keeping its rounded corners until
  // it is full size, then squares them (thesis-motion's page expansion).
  async function openDetail() {
    if (!detail.hidden) return;
    detail.hidden = false; scroll.scrollTop = 0; selectTab('overview');
    feed.inert = true;
    if (api.reduced()) return;
    const app = rel(root), c = rel(pinned);
    const inset = `inset(${c.y - app.y}px 0px ${app.y + app.h - (c.y + c.h)}px 0px round 12px)`;
    opening = detail.animate([{ clipPath: inset }, { clipPath: 'inset(0px 0px 0px 0px round 12px)', offset: .88 }, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }], { duration: 520, easing: EASE_IO });
    detail.querySelector('.gen-topbar').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: 160, fill: 'backwards' });
    feed.animate([{ transform: 'none' }, { transform: 'scale(.97)' }], { duration: 520, easing: EASE_IO });
    await opening.finished.catch(() => {});
  }
  async function closeDetail() {
    if (detail.hidden) return;
    if (!api.reduced()) {
      const app = rel(root), c = rel(pinned);
      await scrollTo(0, 280);
      const inset = `inset(${c.y - app.y}px 0px ${app.y + app.h - (c.y + c.h)}px 0px round 12px)`;
      feed.animate([{ transform: 'scale(.97)' }, { transform: 'none' }], { duration: 460, easing: EASE_IO });
      await detail.animate([{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }, { clipPath: 'inset(0px 0px 0px 0px round 12px)', offset: .1 }, { clipPath: inset, opacity: 1, offset: .9 }, { clipPath: inset, opacity: 0 }], { duration: 460, easing: EASE_IO }).finished.catch(() => {});
    }
    detail.hidden = true; feed.inert = false;
  }

  /* Coach mark: dimmed screen with a square-cornered hole and one bubble whose
   * triangle points at the hole (Figma: white, padding 16, width 300, Shadow L,
   * tip 16×9, 8 from the hole). The hole moves between steps. */
  function ensureCoach() {
    if (coach?.isConnected) return coach;
    coach = node('div', 'v4-coach', `<div class="v4-coach-hole"></div><div class="v4-coach-tip"><svg class="v4-coach-arrow" viewBox="0 0 16 9" aria-hidden="true"><path d="M0 9 8 0l8 9Z"/></svg><div class="v4-coach-box" role="dialog" aria-modal="true" aria-labelledby="v4CoachTitle"><h2 id="v4CoachTitle"></h2><p></p><div class="v4-coach-foot"><span></span><button type="button" class="v4-coach-btn"></button></div></div></div>`);
    overlays.append(coach);
    coach.querySelector('.v4-coach-btn').addEventListener('click', () => advance());
    coach.querySelector('.v4-coach-hole').addEventListener('click', () => advance());
    if (!api.reduced()) coach.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' });
    return coach;
  }
  function place(rect, i, align = 'center') {
    const c = ensureCoach(), hole = c.querySelector('.v4-coach-hole'), tip = c.querySelector('.v4-coach-tip'), arrow = c.querySelector('.v4-coach-arrow');
    const W = document.querySelector('.onboarding-app').offsetWidth, BW = Math.min(300, W - 32);
    const first = !hole.style.width;
    hole.classList.toggle('is-moving', !first && !api.reduced());
    Object.assign(hole.style, { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.w}px`, height: `${rect.h}px` });
    const g = GUIDE[i];
    c.querySelector('h2').textContent = g.title; c.querySelector('p').textContent = g.text;
    c.querySelector('.v4-coach-foot span').textContent = `${i + 1} of 6`;
    c.querySelector('.v4-coach-btn').textContent = g.action;
    const cx = rect.x + rect.w / 2;
    let left = align === 'left' ? 16 : align === 'right' ? W - 17 - BW : cx - BW / 2;
    left = Math.max(16, Math.min(W - 16 - BW, left));
    tip.style.width = `${BW}px`; tip.style.left = `${left}px`; tip.style.top = `${rect.y + rect.h + 8}px`;
    arrow.style.left = `${Math.max(16, Math.min(BW - 32, cx - left - 8))}px`;
    tip.getAnimations().forEach(a => a.cancel());
    if (!api.reduced()) tip.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 280, delay: first ? 120 : 200, easing: EASE, fill: 'backwards' });
    c.querySelector('.v4-coach-btn').focus({ preventScroll: true, focusVisible: false });
  }
  function hideTip() { coach?.querySelector('.v4-coach-tip')?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: 'forwards' }); }
  function endCoach() {
    const c = coach; coach = null; guideStep = -1;
    if (!c) return;
    if (api.reduced()) c.remove(); else c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' }).finished.then(() => c.remove(), () => c.remove());
  }
  const union = (a, b) => { const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y); return { x, y, w: Math.max(a.x + a.w, b.x + b.w) - x, h: Math.max(a.y + a.h, b.y + b.h) - y }; };
  const full = r => { const W = document.querySelector('.onboarding-app').offsetWidth; return { x: 0, y: r.y, w: W, h: r.h }; };

  async function showStep(i) {
    guideStep = i;
    if (i === 0) { place(full(rel(pinned)), 0); return; }
    if (i === 1) { await scrollTo(0); place(full(rel(root.querySelector('.v4-sim'))), 1); return; }
    if (i === 2) {
      // The page scrolls itself until the tabs stick under the top bar.
      selectTab('overview'); await scrollTo(tabsTop());
      place(full(union(rel(tabs), rel(root.querySelector('.v4-overview')))), 2); return;
    }
    if (i === 3) {
      selectTab('signals'); scroll.scrollTop = Math.min(scroll.scrollTop, tabsTop()); await scrollTo(tabsTop());
      place(full(union(rel(tabs), rel(root.querySelector('.v4-dsignal'))) ), 3); return;
    }
    if (i === 4) {
      await scrollTo(0); selectTab('overview');
      const b = rel(root.querySelector('.v4-update'));
      place({ x: b.x - 6, y: b.y - 6, w: b.w + 12, h: b.h + 12 }, 4, 'right'); return;
    }
    if (i === 5) {
      const b = rel(root.querySelector('.v4-detail-back'));
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      place({ x: cx - 22, y: cy - 22, w: 44, h: 44 }, 5, 'left');
    }
  }
  async function advance() {
    if (opening && opening.playState === 'running') return;
    const i = guideStep;
    if (i < 0) return;
    hideTip();
    if (i === 0) { coach.querySelector('.v4-coach-hole').style.opacity = '0'; await openDetail(); coach.querySelector('.v4-coach-hole').style.opacity = ''; return showStep(1); }
    if (i === 5) { endCoach(); await closeDetail(); return; }
    return showStep(i + 1);
  }
  pinned.addEventListener('click', () => { if (guideStep < 0) openDetail(); });
  root.querySelector('.v4-detail-back').addEventListener('click', () => { if (guideStep < 0) closeDetail(); });
  root.querySelector('.v4-update').addEventListener('click', () => { if (guideStep < 0) api.toast('Updates are posted from the full app.'); });

  root.start = async () => {
    const jump = Number(new URLSearchParams(location.search).get('guide'));
    await sleep(api.reduced() ? 0 : 700);
    if (!alive) return;
    if (jump > 1 && jump <= 6) { detail.hidden = false; feed.inert = true; return showStep(jump - 1); }
    showStep(0);
  };
  root.cleanup = () => { alive = false; coach?.remove(); };
  return root;
}

export function renderV4Page(name, api) {
  const render = { landing: renderLanding, invite: renderInvite, create: renderCreate, chat: renderChat, profile: renderProfile, home: renderHome }[name];
  if (!render) throw new Error(`Unknown v4 page: ${name}`);
  return render(api);
}
