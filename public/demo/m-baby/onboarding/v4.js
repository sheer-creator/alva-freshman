/* Onboarding v4 · create your first thesis
 * Figma: Thesis MVP · section 17617:186252 (draft, 2026-11-27). Layout values
 * follow get_design_context for each frame; icons are the frames' own SVGs
 * (assets/v4/icons, exported from the file).
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

export const V4_STEPS = ['landing', 'login', 'invite', 'request', 'listed', 'declined', 'approved', 'create', 'chat', 'profile', 'notifications', 'portfolio', 'ready', 'home'];
const STD = 'cubic-bezier(.4,0,.2,1)';

const A = path => new URL(path, import.meta.url).href;
const EASE = 'cubic-bezier(.22,1,.36,1)';
const EASE_IO = 'cubic-bezier(.65,0,.35,1)';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const easeOut = t => 1 - Math.pow(1 - t, 4);
const easeInOut = t => t < .5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;   // INOUT3

const LOGO = {
  GOOGL: A('../assets/feed-logo-goog.svg'), AMZN: A('../assets/feed-logo-amzn.svg'), MSFT: A('../assets/feed-logo-msft-real.svg'),
  NVDA: A('../assets/feed-logo-nvda-real.png'), TSM: A('../assets/feed-logo-tsm.png'), TSLA: A('../assets/onboarding-tsla.svg'),
  QQQ: A('../assets/onboarding-qqq.svg'), META: A('../assets/feed-logo-meta.svg'), MU: A('../assets/filter-logo-mu.png'),
  AAPL: A('assets/v4/logo-aapl.png'), SNDK: A('assets/v4/logo-sndk.png'), AMD: A('../assets/feed-logo-amd.svg'),
};
const IMG = {
  chartGoogl: A('../assets/feed-real-googl.png'), chartMsft: A('../assets/feed-real-msft.png'), chartAmzn: A('../assets/feed-real-amzn.png'),
  alva: A('assets/alva-source-12646-154584.svg'),
  stewie: A('../assets/feed-source-gavin-baker.png'), matt: A('../assets/social-matt-bryson.png'), semi: A('../assets/social-semianalysis.png'),
  jamie: A('assets/v4/avatar-jamie.png'), mickie: A('assets/v4/avatar-mickie.png'),
};
const IC = name => A(`assets/v4/icons/${name}.svg`);
const ICON = {
  back: IC('arrow-left-l1'), chatAi: A('../assets/ui-chat-ai-l.svg'), bookmark: IC('bookmark-l'), share: IC('share-l'),
  chatL1: IC('chat-l1'), addL1: IC('add-l1'), more: IC('more-l1'), up: A('../assets/ui-arrow-up-l1.svg'),
  bell: IC('notification-l'), down: IC('arrow-down-l2'), right: IC('arrow-right-l2'), plus: IC('add-l2'), wave: IC('voice-wave-l'),
  forYou: A('../assets/thesis/tabbar-imgForYouF.svg'), search: A('../assets/thesis/tabbar-imgSearchL1.svg'), me: A('../assets/ui-me-l.svg'),
  addTab: A('../assets/ui-add-l2.svg'), like: IC('like-l'), close: IC('close-l1'), live: IC('live-l'), rank: IC('rank-f'),
  camera: IC('camera-l'), jensen: A('../assets/thesis/search-imgAvatarJensenHuang.png'), checkTeal: IC('check-f2-teal'), checkInk: IC('check-f2-ink'), logoPortrait: IC('logo-portrait'),
};
// Monochrome icons are masks so they follow the text colour (and dark mode).
const ic = (url, size, cls = '') => `<i class="v4-ic ${cls}" style="--ic:url('${url}');--s:${size}px" aria-hidden="true"></i>`;
const dial = dir => `<i class="v4-dial ${dir === 'down' ? 'is-down' : ''}">${ic(ICON.up, 8)}</i>`;
const chip = (symbol, dir = 'up', cls = '') => `<span class="v4-chip ${cls}">${LOGO[symbol] ? `<img src="${LOGO[symbol]}" alt="">` : `<i class="v4-chip-blank"></i>`}<span>${esc(symbol)}</span>${dir ? dial(dir) : ''}</span>`;

// Thesis return / Mini chart: 72×16, line 1, gradient 22%→0 (flat = not traded yet).
function mini(seed, flat = false) {
  if (flat) return `<svg class="v4-mini" viewBox="0 0 72 16" width="72" height="16" aria-hidden="true"><path d="M0 8.5H69" stroke="currentColor" stroke-width="1"/><circle cx="69.5" cy="8.5" r="2.5" fill="currentColor"/></svg>`;
  const pts = []; let r = seed;
  for (let i = 0; i < 24; i++) { r = (r * 9301 + 49297) % 233280; pts.push([i / 23 * 72, Math.max(1, Math.min(15, 13 - 10 * (i / 23) + (r / 233280 - .5) * 4))]); }
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
  return `<svg class="v4-mini" viewBox="0 0 72 16" width="72" height="16" aria-hidden="true"><defs><linearGradient id="mg${seed}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".22"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs><path d="${d}L72 16L0 16Z" fill="url(#mg${seed})"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="1"/></svg>`;
}

const avatarImg = (src, size = 32) => `<img class="v4-avatar" style="--s:${size}px" src="${src}" alt="">`;
const meAvatar = (size = 32) => `<i class="v4-avatar v4-me" style="--s:${size}px" aria-hidden="true"></i>`;
const actions = count => `<div class="v4-actions"><span>${ic(ICON.chatAi, 16)}Ask Alva</span><span>${ic(ICON.bookmark, 16)}${count}</span></div>`;

/* Feed Card / Thesis (Content: padding 16 16 12, gap 12; Source post gap 8). */
function feedCard({ name, role, time, avatar, tickers = [], ret, body, charts = [], bookmarks = 0, more = false, cls = '' }) {
  return `<article class="v4-fc ${cls}">
    <div class="v4-fc-post">
      <div class="v4-id">${avatar}<div class="v4-id-copy"><strong>${esc(name)}</strong><span>${esc(role)}</span></div><time>${esc(time)}</time></div>
      ${tickers.length || ret ? `<div class="v4-basket"><div class="v4-tickers"><div class="v4-ticker-track">${tickers.map(t => chip(t[0], t[1])).join('')}</div><i class="v4-fade" aria-hidden="true"></i></div>${ret ? `<div class="v4-ret ${ret.flat ? 'is-flat' : ''}">${mini(ret.seed, ret.flat)}<span>${ret.label}</span></div>` : ''}</div>` : ''}
      <p class="v4-body">${body}${more ? ' <b class="v4-more">Show more</b>' : ''}</p>
    </div>
    ${charts.length ? `<div class="v4-media"><div class="v4-media-track">${charts.map(c => `<img src="${c}" alt="">`).join('')}</div></div>` : ''}
    ${actions(bookmarks)}
  </article>`;
}

function people(api) {
  const [gavin, satya, sam] = api.data.theses;
  const one = t => ({ name: t.author, role: t.role, time: t.timestamp, avatar: avatarImg(api.asset(t.avatar)), body: esc(t.body) });
  return {
    gavin: { ...one(gavin), tickers: [['GOOGL', 'down'], ['AMZN', 'up'], ['MSFT', 'up'], ['NVDA', 'up'], ['TSM', 'up']], ret: { seed: 7, label: '+12.4%' }, body: `${esc(gavin.body)} <b class="v4-cite">[1]</b>`, charts: gavin.charts.map(id => api.asset(id)), bookmarks: 68 },
    satya: { ...one(satya), tickers: [['MSFT', 'down']], ret: { seed: 3, label: '+12.4%' }, body: `${esc(satya.body)} <b class="v4-cite">[1]</b>`, charts: [api.asset(satya.charts[0])], bookmarks: 32 },
    sam: { ...one(sam), body: `${esc(sam.body)} <b class="v4-cite">[1]</b>`, bookmarks: 63 },
  };
}

// Signal / For You (onboarding stage): white card, quote block + Alva paragraph.
function stageSignal(s, avatar) {
  const tag = { Supports: 'is-supports', Mixed: 'is-mixed', Challenges: 'is-challenges' }[s.stance] || 'is-mixed';
  return `<article class="v4-ssig">
    <div class="v4-ssig-quote">
      <div class="v4-ssig-id">${avatarImg(avatar)}<div class="v4-ssig-copy"><strong>${esc(s.source)}</strong><span>${esc(s.role)}</span></div><time>${esc(s.time)}</time></div>
      <p>${esc(s.summary)} ${esc(new URL(s.url).hostname.replace(/^www\./, ''))} <span class="v4-arrow">↗︎</span></p>
    </div>
    <p class="v4-alva-para"><span class="v4-stance">${alvaMark()}<em class="${tag}">${esc(s.stance)}</em></span>${esc(s.analysis)}</p>
  </article>`;
}
const alvaMark = () => `<span class="v4-stance-alva"><img src="${IMG.alva}" alt="Alva"></span>`;

function copySwap(holder, title, text) {
  const old = holder.querySelector('.v4-copy-text:not(.is-out)');
  if (old && old.querySelector('h1').textContent === title) return;
  const next = node('div', 'v4-copy-text', `<h1>${esc(title)}</h1><p>${esc(text)}</p>`);
  holder.append(next);
  if (!old) return;
  old.classList.add('is-out');
  old.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: STD, fill: 'forwards' }).finished.catch(() => {}).finally(() => old.remove());
  next.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 240, delay: 80, easing: EASE, fill: 'backwards' });
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
  // G3a / G3b carry this copy while the stage moves to the Leaderboard…
  { title: 'See whose calls are working.', text: 'The Leaderboard shows which theses are making money and the people behind them.' },
  // …and G3 settles on this one.
  { title: 'Learn from the top theses.', text: 'The Leaderboard ranks theses by return. See what’s working for others.' },
];
const BOARD = [
  { name: 'Mickie', avatar: IMG.mickie, title: 'Nvidia Could Be Cisco 2000: Great Business, Poor Stock', tickers: [['NVDA', 'down']], ret: '+17.8%' },
  { name: 'harryz', title: 'Semis face near-term multiple compression despite strong demand', tickers: [['SMH', 'down']], ret: '+11.9%' },
  { name: 'rosy_a', title: 'TSLA: bearish in the short term', tickers: [['TSLA', 'down']], ret: '+11.7%' },
  { name: 'Mickie', avatar: IMG.mickie, title: 'NVDA Demand Cracks First at the Neoclouds', tickers: [['NVDA', 'down'], ['CRWV', 'down']], ret: '+11.0%' },
];
const CARD_TOP = 131;   // stage cards start here (Figma: x 24, y 131, w 345)
const G1_TOP = -210;    // G1 · the docked column (card scrolled up, Signals at y 195)
const LIST_SCALE = .88;  // G3a · the list the card folds back into

function renderLanding(api) {
  const P = people(api);
  const root = node('section', 'page v4-full v4-landing');
  root.setAttribute('aria-label', 'What Alva does');
  const signals = api.data.signals.slice(0, 3);
  const returnLine = (() => {
    // Thesis return / Version chart (313 × 40 inside the card's 16 inset): six
    // segments, earlier updates hollow, latest filled, Now dot at the end.
    const xs = [0, 16.98, 31.83, 48.81, 63.93, 80.9, 100], ys = [34.6, 31.2, 31.9, 21.2, 24.2, 15.8, 7.5];
    const W = 313, pts = xs.map((x, i) => [x / 100 * W, ys[i]]);
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1]}`).join('');
    const dots = pts.slice(1).map((p, i) => i === pts.length - 2 ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1]}" r="3" class="v4-dot-now"/>` : `<circle cx="${p[0].toFixed(1)}" cy="${p[1]}" r="2.5" class="${i === pts.length - 3 ? 'v4-dot-latest' : 'v4-dot-earlier'}"/>`).join('');
    return `<svg class="v4-vchart" viewBox="0 0 ${W} 40" width="${W}" height="40" aria-hidden="true"><defs><linearGradient id="v4vc" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".22"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs><path class="v4-vchart-area" d="${d}L${W} 40L0 40Z" fill="url(#v4vc)"/><path class="v4-vchart-line" d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" pathLength="1"/>${dots}</svg>`;
  })();
  const sigAvatars = signals.map(s => api.asset(s.avatar));
  root.innerHTML = `
    <div class="v4-stage" aria-hidden="true">
      <div class="v4-layer v4-g1"><div class="v4-col">
        ${feedCard({ ...P.gavin, cls: 'v4-stage-card v4-g1-card' })}
        <h2 class="v4-signals-title">Signals</h2>
        ${signals.map((s, i) => stageSignal(s, sigAvatars[i])).join('')}
      </div></div>
      <div class="v4-layer v4-g2"><div class="v4-col">
        <article class="v4-stage-card v4-dcard">
          <div class="v4-dc-author"><div class="v4-id">${P.gavin.avatar}<div class="v4-id-copy"><strong>Gavin Baker</strong><span>Managing Partner &amp; CIO, Atreides</span></div><time>Jul 13</time></div></div>
          <div class="v4-ret-top"><b class="v4-ret-num">+12.4%</b><div class="v4-ret-chart">${returnLine}</div><div class="v4-axis"><span>24 Sep</span><span>Now</span></div></div>
          <div class="v4-upd"><div class="v4-rail"><i class="v4-rail-dot"></i><i class="v4-rail-line"></i></div>
            <div class="v4-upd-c"><div class="v4-time"><span>13 Sep, 08:12</span><span class="v4-latest">Latest</span></div>${chip('GOOGL', 'up')}
              <p class="v4-body">Cheaper models would increase the return on AI spending and drive more token demand, redistributing margin dollars toward AI infrastructure providers. [1]</p>
              <div class="v4-chart"><img src="${IMG.chartGoogl}" alt=""></div></div></div>
        </article>
      </div></div>
      <div class="v4-layer v4-g3a"><div class="v4-col">
        ${feedCard({ ...P.sam, cls: 'v4-stage-card is-above' })}
        ${feedCard({ ...P.satya, cls: 'v4-stage-card is-above' })}
        ${feedCard({ ...P.gavin, cls: 'v4-stage-card is-focus' })}
        ${feedCard({ ...P.sam, cls: 'v4-stage-card is-below' })}
      </div></div>
      <div class="v4-layer v4-board"><div class="v4-col">
        <div class="v4-board-head"><span class="v4-trophy"><img src="${ICON.rank}" alt=""></span>
          <div class="v4-board-title"><h2>See whose calls are working.</h2><p>The Leaderboard shows which theses are making money and the people behind them.</p></div></div>
        <div class="v4-board-rows">${BOARD.map((row, i) => `<div class="v4-stage-card v4-board-row"><b class="v4-rank">${i + 1}</b><div class="v4-board-main"><div class="v4-board-who">${row.avatar ? `<img src="${row.avatar}" alt="">` : '<i class="v4-chip-blank is-avatar"></i>'}<span>${esc(row.name)}</span></div><strong>${esc(row.title)}</strong><div class="v4-board-chips">${row.tickers.map(t => chip(t[0], t[1])).join('')}</div></div><b class="v4-board-ret">${row.ret}</b></div>`).join('')}</div>
      </div></div>
      <div class="v4-stage-blur"></div>
    </div>
    <div class="v4-land-copy"><span class="v4-step" aria-live="polite">1 / 3</span><div class="v4-copy-holder"></div></div>
    <footer class="v4-land-dock"><button class="setup-next v4-next" type="button">Next</button><button class="v4-text-btn v4-login" type="button">Log in</button></footer>`;
  const stage = root.querySelector('.v4-stage');
  const g1 = root.querySelector('.v4-g1'), g2 = root.querySelector('.v4-g2'), g3a = root.querySelector('.v4-g3a'), board = root.querySelector('.v4-board');
  const g1col = g1.querySelector('.v4-col'), g1card = g1.querySelector('.v4-g1-card'), sigs = [...g1.querySelectorAll('.v4-ssig'), g1.querySelector('.v4-signals-title')];
  const g3col = g3a.querySelector('.v4-col');
  const holder = root.querySelector('.v4-copy-holder'), step = root.querySelector('.v4-step'), next = root.querySelector('.v4-next');
  let pageIndex = 0, token = 0, alive = true;
  copySwap(holder, LANDING[0].title, LANDING[0].text);
  const setY = (col, y) => { col.style.transform = `translateY(${y}px)`; };
  const valid = t => alive && t === token;
  const running = () => stage.getAnimations({ subtree: true });

  // Final state of each page, without motion: also what an interrupted page snaps to.
  function settle(index) {
    running().forEach(a => a.cancel());
    g1.hidden = index !== 0; g2.hidden = index !== 1; g3a.hidden = true; board.hidden = index !== 2;
    [g1, g2, g3a, board].forEach(l => { l.style.opacity = ''; l.style.filter = ''; l.style.transform = ''; });
    g1card.style.opacity = ''; sigs.forEach(s => { s.style.opacity = ''; });
    root.querySelector('.v4-ret-num').textContent = '+12.4%';
    setY(g1col, G1_TOP);
    if (index === 2) { step.textContent = '3 / 3'; copySwap(holder, LANDING[3].title, LANDING[3].text); }
  }

  async function playG1(t) {
    g1.hidden = false; g2.hidden = true; g3a.hidden = true; board.hidden = true;
    setY(g1col, CARD_TOP);
    if (api.reduced()) return settle(0);
    sigs.forEach(s => { s.style.opacity = '0'; });
    // The card rises from below, grows to size and docks.
    await g1card.animate([{ opacity: 0, transform: 'translateY(360px) scale(.88)' }, { opacity: 1, offset: .35 }, { opacity: 1, transform: 'none' }],
      { duration: 760, easing: EASE, fill: 'backwards' }).finished.catch(() => {});
    if (!valid(t)) return;
    await sleep(260); if (!valid(t)) return;
    // The stage scrolls on; the signals come in one after another under it.
    const scroll = tween(1100, easeInOut, k => setY(g1col, CARD_TOP + (G1_TOP - CARD_TOP) * k), () => valid(t));
    [sigs.at(-1), ...sigs.slice(0, -1)].forEach((s, i) => {
      s.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 480, delay: 80 + i * 60 + 360, easing: EASE, fill: 'backwards' });
      s.style.opacity = '';
    });
    await scroll;
  }

  async function playG2(t) {
    if (api.reduced()) return settle(1);
    // Back up to the top of the thesis: the card opens into its detail page to show the return.
    const scroll = tween(640, easeInOut, k => setY(g1col, G1_TOP + (CARD_TOP - G1_TOP) * k), () => valid(t));
    g2.hidden = false;
    g1.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, delay: 400, easing: STD, fill: 'forwards' });
    g2.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, delay: 400, easing: STD, fill: 'backwards' });
    await scroll; await sleep(40);
    if (!valid(t)) return;
    g1.hidden = true;
    const card = g2.querySelector('.v4-dcard');
    card.querySelector('.v4-vchart-line').animate([{ strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDasharray: '1 1', strokeDashoffset: 0 }], { duration: 600, easing: STD });
    card.querySelector('.v4-vchart-area').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 200, easing: 'ease-out', fill: 'backwards' });
    card.querySelectorAll('.v4-vchart circle').forEach((c, i) => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: 90 + i * 90, fill: 'backwards' }));
    const num = root.querySelector('.v4-ret-num');
    await tween(600, easeOut, k => { num.textContent = `+${(12.4 * k).toFixed(1)}%`; }, () => valid(t));
  }

  async function playG3(t) {
    if (api.reduced()) return settle(2);
    // G3a · the detail page folds back into a list card, 1 → .88 (220ms STD); neighbours follow, 12 apart.
    g3a.hidden = false;
    const focus = g3a.querySelector('.is-focus');
    const restY = CARD_TOP - focus.offsetTop * LIST_SCALE;
    g3col.style.transform = `translateY(${restY}px) scale(${LIST_SCALE})`;
    g2.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `scale(${LIST_SCALE})` }], { duration: 220, easing: STD, fill: 'forwards' });
    focus.animate([{ transform: `scale(${1 / LIST_SCALE})` }, { transform: 'none' }], { duration: 220, easing: STD });
    g3a.querySelectorAll('.is-above, .is-below').forEach(c => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: STD, fill: 'backwards' }));
    await sleep(380); if (!valid(t)) return;
    g2.hidden = true;
    // G3b · the whole column runs up to the top (420ms INOUT3) with a layer blur 0 → 8 → 0.
    const topY = 0, fromY = restY;
    g3a.animate([{ filter: 'blur(0)' }, { filter: 'blur(8px)', offset: .5 }, { filter: 'blur(0)' }], { duration: 420, easing: 'linear' });
    await tween(420, easeInOut, k => { g3col.style.transform = `translateY(${fromY + (topY - fromY) * k}px) scale(${LIST_SCALE})`; }, () => valid(t));
    if (!valid(t)) return;
    // G3 · at the top it cross-fades into the Leaderboard (200ms).
    board.hidden = false;
    board.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: STD, fill: 'backwards' });
    await g3a.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: STD, fill: 'forwards' }).finished.catch(() => {});
    if (!valid(t)) return;
    copySwap(holder, LANDING[3].title, LANDING[3].text);
    g3a.hidden = true;
  }

  async function show(index) {
    const t = ++token;
    if (index > 0) settle(pageIndex);
    pageIndex = index;
    setLast(index === 2);
    step.textContent = `${index + 1} / 3`;
    next.textContent = index === 2 ? 'Get started' : 'Next';
    if (index > 0) copySwap(holder, LANDING[index].title, LANDING[index].text);
    await [playG1, playG2, playG3][index](t);
  }
  next.addEventListener('click', () => { if (pageIndex === 2) api.go('login'); else show(pageIndex + 1); });
  root.querySelector('.v4-login').addEventListener('click', () => api.go('login'));
  // Page 3 drops Log in: the footer folds back to 80 and the copy and stage follow it down 44.
  const setLast = last => root.classList.toggle('is-last', last);
  // A deliberate tap on the stage finishes the current motion at once.
  stage.addEventListener('pointerdown', () => { if (running().length) { token++; settle(pageIndex); } });
  root.start = () => { show(0); };
  root.cleanup = () => { alive = false; token++; };
  g1.hidden = false; g2.hidden = true; g3a.hidden = true; board.hidden = true;
  setY(g1col, CARD_TOP); g1card.style.opacity = '0'; sigs.forEach(s => { s.style.opacity = '0'; });
  queueMicrotask(() => { g1card.style.opacity = ''; });
  if (api.reduced()) queueMicrotask(() => settle(0));
  return root;
}

/* iOS/Keyboard/Light · shared by A3 and A6. onKey(char | 'del' | 'return'). */
function mountKeyboard(kb, onKey) {
  let mode = 'abc';
  const draw = () => {
    const rows = KEY_ROWS[mode];
    const key = k => `<button type="button" class="v4-key" data-k="${esc(k)}">${esc(k)}</button>`;
    kb.innerHTML = `<div class="v4-kb-row">${[...rows[0]].map(key).join('')}</div>
      <div class="v4-kb-row is-mid">${[...rows[1]].map(key).join('')}</div>
      <div class="v4-kb-row"><button type="button" class="v4-key is-fn" data-fn="shift">${mode === 'abc' ? '⇧' : '#+='}</button><span class="v4-kb-gap"></span>${[...rows[2]].map(key).join('')}<span class="v4-kb-gap"></span><button type="button" class="v4-key is-fn" data-fn="del">⌫</button></div>
      <div class="v4-kb-row"><button type="button" class="v4-key is-fn is-wide" data-fn="mode">${mode === 'abc' ? '123' : 'ABC'}</button><button type="button" class="v4-key is-space" data-k=" ">space</button><button type="button" class="v4-key is-fn is-wide" data-fn="return">return</button></div>
      <div class="v4-kb-extra"><span>☺</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 17v4m-3 0h6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></div>`;
  };
  kb.addEventListener('pointerdown', e => e.preventDefault());
  kb.addEventListener('click', e => {
    const key = e.target.closest('.v4-key'); if (!key) return;
    if (key.dataset.k) onKey(key.dataset.k);
    else if (key.dataset.fn === 'mode') { mode = mode === 'abc' ? 'num' : 'abc'; draw(); }
    else if (key.dataset.fn === 'del' || key.dataset.fn === 'return') onKey(key.dataset.fn);
  });
  draw();
}
const touch = () => matchMedia('(pointer:coarse)').matches;

/* ───────────────────────── A3 · Invite code ───────────────────────── */
const KEY_ROWS = { abc: ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'], num: ['1234567890', '-/:;()$&@"', '.,?!\''] };
function renderInvite(api) {
  const root = node('section', 'setup-page v4-invite v4-full-bottom');
  root.setAttribute('aria-label', 'Alva is invite-only.');
  api.state.invite ||= '';
  root.innerHTML = `<header class="setup-topbar"><button type="button" class="setup-back" aria-label="Back">${ic(ICON.back, 20)}</button></header>
    <div class="v4-invite-body">
      <div class="v4-title-block"><h1>Alva is invite-only.</h1><p>A community of investors who track their theses in public. Enter the code a member gave you.</p></div>
      <label class="v4-code" aria-label="Invite code">${Array.from({ length: 6 }, (_, i) => `<span class="v4-code-cell" data-i="${i}"></span>`).join('')}
        <input class="v4-code-input" inputmode="text" autocomplete="one-time-code" autocapitalize="characters" maxlength="6" spellcheck="false" aria-label="Invite code"></label>
      <p class="v4-request">No invite code? <button type="button" class="v4-link">Request one</button></p>
    </div>
    <footer class="setup-dock v4-invite-dock"><button class="setup-next" type="button" disabled>Join Alva</button></footer>
    <div class="v4-keyboard" aria-hidden="true"></div>`;
  const cells = [...root.querySelectorAll('.v4-code-cell')], input = root.querySelector('.v4-code-input'), join = root.querySelector('.setup-next');
  const kb = root.querySelector('.v4-keyboard');
  function update() {
    const code = api.state.invite;
    cells.forEach((c, i) => { c.textContent = code[i] || ''; c.classList.toggle('is-caret', i === code.length); });
    input.value = code;
    join.disabled = code.length < 6;
  }
  function type(ch) {
    if (/^[a-z0-9]$/i.test(ch) && api.state.invite.length < 6) {
      api.state.invite += ch.toUpperCase();
      cells[api.state.invite.length - 1].animate([{ transform: 'scale(.92)' }, { transform: 'none' }], { duration: 160, easing: EASE });
    }
    update();
  }
  mountKeyboard(kb, k => {
    if (k === 'del') { api.state.invite = api.state.invite.slice(0, -1); update(); }
    else if (k === 'return') { if (!join.disabled) join.click(); }
    else type(k);
  });
  if (touch()) input.setAttribute('inputmode', 'none');
  input.addEventListener('input', () => { api.state.invite = input.value.replace(/[^a-z0-9]/gi, '').slice(0, 6).toUpperCase(); update(); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !join.disabled) join.click(); });
  root.querySelector('.setup-back').addEventListener('click', () => api.go('login'));
  root.querySelector('.v4-link').addEventListener('click', () => api.go('request'));
  join.addEventListener('click', async () => {
    join.disabled = true; join.classList.add('is-busy'); join.innerHTML = '<span class="v4-spinner" aria-label="Checking"></span>';
    await sleep(api.reduced() ? 0 : 650);
    if (root.isConnected) api.go('create');
  });
  update();
  root.start = () => { if (!touch()) input.focus({ preventScroll: true }); };
  return root;
}

/* ───────────────────────── C1 · Create your first thesis ───────────────────────── */
function renderCreate(api) {
  const P = people(api);
  const root = node('section', 'setup-page v4-create');
  root.setAttribute('aria-label', 'Create your first thesis');
  root.innerHTML = `<header class="setup-topbar"><button type="button" class="setup-skip v4-switch">Switch account</button></header>
    <div class="v4-create-body">
      <div class="v4-title-block"><h1>Create your first thesis</h1><p>Write your view once. Alva tracks it every day and shows how the call performs.</p></div>
      <div class="v4-examples">
        <h2 class="v4-subhead">Theses people are tracking</h2>
        <div class="v4-carousel" tabindex="0" aria-label="Example theses">
          ${feedCard({ ...P.gavin, cls: 'v4-slide' })}${feedCard({ ...P.satya, cls: 'v4-slide' })}${feedCard({ ...P.sam, cls: 'v4-slide' })}
        </div>
        <div class="v4-dots" aria-hidden="true"><i></i><i class="is-on"></i><i></i></div>
      </div>
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
  const paint = () => { const i = current(); dots.forEach((d, k) => d.classList.toggle('is-on', k === i)); };
  carousel.addEventListener('scroll', () => requestAnimationFrame(paint), { passive: true });
  const center = i => { carousel.scrollLeft = slides[i].offsetLeft - (carousel.clientWidth - slides[i].offsetWidth) / 2; };
  root.querySelector('.v4-switch').addEventListener('click', () => api.go('login'));
  root.querySelector('.v4-create-alva').addEventListener('click', () => api.go('chat'));
  requestAnimationFrame(() => { center(1); paint(); });
  return root;
}

/* ───────────────────────── CH1–CH3 · Alva chat ───────────────────────── */
const OPTIONS_START = ['Start from one of the examples', 'I’m bearish on TSLA', 'Something about gold'];
const DRAFTS = {
  [OPTIONS_START[0]]: { said: 'NVDA keeps beating estimates as hyperscaler capex rises into 2027.', body: 'NVDA keeps beating estimates as hyperscaler capex rises into 2027. Demand is still ahead of supply, the product cycle is getting faster, and CUDA keeps switching costs high.', ticker: 'NVDA', side: 'long' },
  [OPTIONS_START[1]]: { said: 'I’m bearish on TSLA', body: 'TSLA’s auto margins keep shrinking as price cuts outrun volume growth, and robotaxi revenue is still years away from offsetting it.', ticker: 'TSLA', side: 'short' },
  [OPTIONS_START[2]]: { said: 'Something about gold', body: 'Gold keeps climbing as central banks keep buying and real rates ease; dips are being bought faster than in past cycles.', ticker: 'GLD', side: 'long' },
};
function renderChat(api) {
  const root = node('section', 'setup-page v4-chat v4-full');
  root.setAttribute('aria-label', 'Create a thesis with Alva');
  root.innerHTML = `<header class="v4-chat-head"><button type="button" class="v4-chat-back" aria-label="Back">${ic(ICON.back, 20)}</button>
      <span class="v4-alva-pill"><img src="${ICON.logoPortrait}" alt=""><b>Alva</b></span></header>
    <div class="v4-chat-scroll"><div class="v4-chat-log" aria-live="polite"><p class="v4-chat-time">11:48 PM</p></div></div>
    <footer class="v4-chat-bottom">
      <form class="v4-composer"><span class="v4-cbtn">${ic(ICON.plus, 16)}</span><input type="text" placeholder="Ask Alva, hold to talk" aria-label="Message Alva" enterkeyhint="send"><span class="v4-cbtn">${ic(ICON.wave, 16)}</span></form>
      <div class="setup-dock v4-chat-dock" hidden><button class="setup-next v4-to-profile" type="button">Set up profile</button></div>
    </footer>`;
  const scroller = root.querySelector('.v4-chat-scroll'), log = root.querySelector('.v4-chat-log');
  const form = root.querySelector('.v4-composer'), field = form.querySelector('input'), dock = root.querySelector('.v4-chat-dock');
  let alive = true, busy = false, draft = null;
  const name = 'Hugo';
  const toBottom = () => {
    const from = scroller.scrollTop, to = scroller.scrollHeight - scroller.clientHeight;
    if (api.reduced() || to - from < 2) { scroller.scrollTop = to; return; }
    tween(420, easeOut, k => { scroller.scrollTop = from + (to - from) * k; }, () => alive);
  };
  const enter = el => { if (!api.reduced()) el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: EASE, fill: 'backwards' }); };
  // Chat/Agent Bubble: Fill for wrapped text or options (right inset 28), Hug for one short line.
  async function alva(html, { options, onPick, dashed = false, fill = true } = {}) {
    const typing = node('div', 'v4-agent is-hug', '<div class="v4-bubble is-typing"><i></i><i></i><i></i></div>');
    log.append(typing); enter(typing); toBottom();
    await sleep(api.reduced() ? 0 : 750);
    if (!alive) return;
    const row = node('div', `v4-agent ${fill ? '' : 'is-hug'}`, `<div class="v4-bubble ${options ? 'has-options' : ''}">${html}</div>`);
    typing.replaceWith(row);
    if (options) {
      const group = node('div', 'v4-options');
      options.forEach((label, i) => {
        const b = node('button', `v4-option ${dashed ? 'is-dashed' : ''}`, `<span>${esc(label)}</span>`); b.type = 'button';
        b.addEventListener('click', () => { if (busy || group.dataset.done) return; group.dataset.done = '1'; mark(group, b); onPick(label); });
        group.append(b);
        if (!api.reduced()) b.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 280, delay: 120 + i * 70, easing: EASE, fill: 'backwards' });
      });
      row.querySelector('.v4-bubble').append(group);
    }
    toBottom();
    return row;
  }
  function mark(group, chosen) {
    group.querySelectorAll('.v4-option').forEach(o => { o.disabled = true; o.classList.toggle('is-chosen', o === chosen); });
    chosen.insertAdjacentHTML('beforeend', `<img class="v4-option-check" src="${ICON.checkInk}" alt="">`);
  }
  function user(text) {
    const b = node('div', 'v4-user', `<div class="v4-bubble is-user">${esc(text)}</div>`);
    log.append(b); enter(b); toBottom();
  }
  function draftCard(d, label = 'Draft') {
    const card = node('div', 'v4-draft-row', `<article class="v4-draft"><div class="v4-draft-who">${meAvatar(36)}<div><strong>${name}</strong><span class="v4-draft-label">${label}</span></div></div>
      <p>${esc(d.body)}</p><span class="v4-draft-chip">${LOGO[d.ticker] ? `<img src="${LOGO[d.ticker]}" alt="">` : '<i class="v4-chip-blank"></i>'}${esc(d.ticker)}</span></article>`);
    log.append(card);
    if (!api.reduced()) card.animate([{ opacity: 0, transform: 'translateY(20px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 480, easing: EASE, fill: 'backwards' });
    toBottom();
    return card;
  }
  async function propose(d) {
    busy = true;
    await alva(`<p>Here’s a draft. I’ll track it on $${esc(d.ticker)}, ${d.side}.</p>`, { fill: false });
    if (!alive) return;
    await sleep(api.reduced() ? 0 : 200);
    d.card = draftCard(d);
    await sleep(api.reduced() ? 0 : 500);
    await alva('<p>Want me to publish it, or change anything?</p>', { options: ['Publish', 'Change something'], onPick: label => label === 'Publish' ? publish(d) : change(d) });
    busy = false;
  }
  async function publish(d) {
    busy = true; user('Publish');
    d.card.querySelector('.v4-draft-label').textContent = 'Your thesis';
    api.state.myThesis = { body: d.body, ticker: d.ticker, side: d.side, author: name };
    await alva('<p>Published. I’m already reading sources for it, and its simulated return starts today. Next, set up your profile so people know who’s behind the call.</p>');
    if (!alive) return;
    // CH3: the composer folds away and the next step takes its place.
    if (!api.reduced()) await form.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(12px)' }], { duration: 180, easing: 'ease-in', fill: 'forwards' }).finished.catch(() => {});
    form.hidden = true; dock.hidden = false; root.classList.add('is-published');
    if (!api.reduced()) dock.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE, fill: 'backwards' });
    toBottom();
  }
  async function change(d) {
    busy = true; user('Change something');
    await alva('<p>Sure. What should change?</p>', { options: ['Make it shorter', d.side === 'long' ? 'Make it a short' : 'Make it a long'], onPick: label => {
      user(label);
      const next = { ...d };
      if (label === 'Make it shorter') next.body = d.body.split(/(?<=\.)\s/)[0];
      else next.side = d.side === 'long' ? 'short' : 'long';
      propose(next);
    } });
    busy = false;
  }
  function start(label, typed = false) {
    let d = DRAFTS[label];
    if (typed || !d) {
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
    const group = log.querySelector('.v4-options');
    if (group) { group.dataset.done = '1'; group.querySelectorAll('.v4-option').forEach(o => { o.disabled = true; }); }
    start(text, true);
  });
  root.querySelector('.v4-chat-back').addEventListener('click', () => api.go('create'));
  root.querySelector('.v4-to-profile').addEventListener('click', () => api.go('profile'));
  root.start = async () => {
    await sleep(api.reduced() ? 0 : 200);
    await alva('<p>Let’s write your first thesis. Tell me what you’re watching: a ticker, a theme, or your view in one sentence. I’ll draft it and find the data behind it.</p>', { options: OPTIONS_START, dashed: true, onPick: label => start(label) });
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
  root.innerHTML = `<header class="setup-topbar"><button type="button" class="setup-back" aria-label="Back">${ic(ICON.back, 20)}</button></header>
    <div class="v4-profile-body">
      <div class="v4-title-block"><h1>Set up your profile.</h1><p>From your X profile. This is how others see you.</p></div>
      <div class="v4-identity">
        <button type="button" class="v4-photo" aria-label="Change photo"><img src="${IMG.jamie}" alt=""><span class="v4-photo-edit">${ic(ICON.camera, 12)}</span></button>
        <div class="v4-field"><label for="v4Name">Name</label><input id="v4Name" value="Jamie Lin" autocomplete="name"><p class="v4-handle">@jamielin_ · <button type="button" class="v4-link">Edit</button></p></div>
        <div class="v4-field"><label for="v4Bio">Bio (optional)</label><input id="v4Bio" value="Semis &amp; AI infra. Long-only, 3–5y horizon." placeholder="What do you invest in?"></div>
      </div>
      <div class="v4-follow"><div class="v4-follow-head"><h2>What do you follow? (optional)</h2><p>Added to your watchlist</p></div>
        <div class="v4-follow-chips">${FOLLOW.map(s => `<button type="button" class="v4-follow-chip" data-sym="${s}"><img src="${LOGO[s]}" alt=""><span>${s}</span><img class="v4-follow-check" src="${ICON.checkTeal}" alt=""></button>`).join('')}<button type="button" class="v4-follow-chip is-more"><span>More</span>${ic(ICON.right, 12)}</button></div>
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
  root.querySelector('.setup-next').addEventListener('click', () => {
    if (api.state.applicantPush === 'allowed') { api.go('portfolio'); return; }
    const handoff = !api.reduced();
    if (handoff) {
      // The notifications page runs under the status bar and home indicator,
      // so the copy carries both insets to stay exactly where it is now.
      const slot = root.parentElement, app = slot.parentElement;
      const top = slot.offsetTop, bottom = app.clientHeight - slot.offsetTop - slot.clientHeight;
      const snapshot = root.cloneNode(true);
      snapshot.removeAttribute('data-page'); snapshot.classList.remove('route-page'); snapshot.setAttribute('inert', '');
      Object.assign(snapshot.style, { boxSizing: 'border-box', paddingTop: `${top}px`, paddingBottom: `${bottom}px`, transform: 'none', opacity: '1', zIndex: '' });
      const base = root.getBoundingClientRect(), u = base.width / root.clientWidth || 1, box = root.querySelector('.setup-dock').getBoundingClientRect();
      api.handoff = {
        snapshot, scrollTop: root.querySelector('.v4-profile-body').scrollTop,
        size: { width: root.clientWidth, height: root.clientHeight + top + bottom },
        panel: { x: (box.left - base.left) / u, y: (box.top - base.top) / u + top, width: box.width / u, height: box.height / u },
      };
    }
    api.go('notifications', { instant: handoff });
  });
  paint();
  return root;
}

/* ───────────────────────── A6 / A7 · Request an invite ───────────────────────── */
// The demo types this idea one letter per key (a physical keyboard types freely).
const DEMO_IDEA = 'Hyperscaler capex keeps rising into 2027, so I stay long NVDA and TSMC until guidance flattens.';
function renderRequest(api) {
  api.state.idea ||= '';
  const root = node('section', 'setup-page v4-request-page v4-full-bottom');
  root.setAttribute('aria-label', 'Request an invite');
  root.innerHTML = `<header class="v4-titlebar"><button type="button" class="v4-titlebar-back" aria-label="Back">${ic(ICON.back, 20)}</button><h1>Request an invite</h1></header>
    <div class="v4-request-body">
      <textarea class="v4-idea" placeholder="Share a market view you hold, and why." aria-label="Your idea"></textarea>
      <div class="v4-example"><p>Example of a strong thesis</p>
        <div class="v4-example-card"><div class="v4-example-who"><img class="v4-avatar" style="--s:24px" src="${ICON.jensen}" alt=""><strong>Jensen Huang</strong></div>
          <p>Blackwell Ultra is shipping to all four hyperscalers two weeks ahead of schedule. Data-center revenue ran at $75.2B this quarter, up 92% YoY.</p></div></div>
    </div>
    <footer class="v4-request-dock"><button class="setup-next" type="button" disabled>Request</button></footer>
    <div class="v4-keyboard" aria-hidden="true"></div>`;
  const idea = root.querySelector('.v4-idea'), send = root.querySelector('.setup-next'), example = root.querySelector('.v4-example');
  idea.value = api.state.idea;
  const update = () => {
    api.state.idea = idea.value;
    send.disabled = idea.value.trim().length < 40;     // Request is disabled below 40 characters
    example.hidden = idea.value.length > 0;
  };
  mountKeyboard(root.querySelector('.v4-keyboard'), k => {
    if (k === 'del') idea.value = idea.value.slice(0, -1);
    else if (k === 'return') { if (!send.disabled) send.click(); return; }
    else idea.value = DEMO_IDEA.startsWith(idea.value) && idea.value.length < DEMO_IDEA.length ? DEMO_IDEA.slice(0, idea.value.length + 1) : idea.value + k;
    update();
  });
  if (touch()) idea.setAttribute('inputmode', 'none');
  idea.addEventListener('input', update);
  root.querySelector('.v4-titlebar-back').addEventListener('click', () => api.go('invite'));
  send.addEventListener('click', () => { api.state.idea = idea.value.trim(); api.go('listed'); });
  update();
  root.start = () => { if (!touch()) idea.focus({ preventScroll: true }); };
  return root;
}

/* Status pages (A8 · A10 · A11): centred icon, title, line; footer actions. */
function statusPage(api, { cls, label, top, icon, title, text, body = '', actions }) {
  const root = node('section', `setup-page v4-status ${cls}`);
  root.setAttribute('aria-label', label);
  root.innerHTML = `<header class="setup-topbar v4-status-top">${top.back ? `<button type="button" class="setup-back" data-act="back" aria-label="Back">${ic(ICON.back, 20)}</button>` : ''}${top.switch ? '<button type="button" class="setup-skip v4-switch" data-act="switch">Switch account</button>' : ''}</header>
    <div class="v4-status-body"><div class="v4-status-head">${icon}<div class="v4-status-title"><h1>${title}</h1><p>${text}</p></div>${body}</div></div>
    <footer class="setup-dock v4-status-dock">${actions.map(a => `<button type="button" class="${a.primary ? 'setup-next' : 'v4-btn-outline'}" data-act="${a.id}">${a.label}</button>`).join('')}</footer>`;
  root.querySelector('[data-act="back"]')?.addEventListener('click', () => api.go(top.back));
  root.querySelector('[data-act="switch"]')?.addEventListener('click', () => api.go('login'));
  return root;
}
const checkBadge = `<span class="v4-status-badge"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8.5 16.5l5 5 10-11" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;

function renderListed(api) {
  const idea = api.state.idea || DEMO_IDEA;
  const root = statusPage(api, { cls: 'v4-listed', label: 'You’re on the list', top: { back: 'request', switch: true }, icon: checkBadge,
    title: 'You’re on the list', text: 'We review requests daily.',
    body: `<div class="v4-your-idea"><span>Your idea</span><p>${esc(idea)}</p></div>`,
    actions: [{ id: 'notify', label: 'Notify me when I’m in', primary: true }, { id: 'code', label: 'I have an invite code' }] });
  let timer = 0, alive = true;
  const notify = root.querySelector('[data-act="notify"]');
  // Approval arrives a moment later in this preview: as a push if allowed, by email otherwise.
  const approveSoon = () => { clearTimeout(timer); timer = setTimeout(() => { if (alive) banner(api, api.state.applicantPush === 'allowed' ? 'push' : 'mail', () => api.go('approved')); }, 2200); };
  notify.addEventListener('click', () => {
    if (api.state.applicantPush) { approveSoon(); return; }
    // A9 · the iOS system prompt over A8; either answer returns here.
    api.sheet({ title: '“Alva” Would Like to Send You Notifications', body: 'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.', actions: [
      { label: 'Don’t Allow', onClick() { api.state.applicantPush = 'denied'; approveSoon(); } },
      { label: 'Allow', primary: true, onClick() { api.state.applicantPush = 'allowed'; approveSoon(); } },
    ] });
  });
  root.querySelector('[data-act="code"]').addEventListener('click', () => api.go('invite'));
  root.classList.add('is-permission-host');
  root.cleanup = () => { alive = false; clearTimeout(timer); document.querySelector('.v4-banner')?.remove(); };
  return root;
}
function renderDeclined(api) {
  const root = statusPage(api, { cls: 'v4-declined', label: 'Not approved this time', top: { switch: true },
    icon: '<span class="v4-status-badge is-alert" aria-hidden="true"><i></i><i></i></span>',
    title: 'Not approved this time', text: 'We’re letting people in gradually. Add more detail to your idea and request again.',
    actions: [{ id: 'again', label: 'Request again', primary: true }, { id: 'code', label: 'I have an invite code' }] });
  root.querySelector('[data-act="again"]').addEventListener('click', () => { api.state.idea ||= DEMO_IDEA; api.go('request'); });
  root.querySelector('[data-act="code"]').addEventListener('click', () => api.go('invite'));
  return root;
}
function renderApproved(api) {
  const root = statusPage(api, { cls: 'v4-approved', label: 'You’re in', top: {}, icon: checkBadge,
    title: 'You’re in', text: 'Your request was approved. Welcome to Alva.', actions: [{ id: 'next', label: 'Next', primary: true }] });
  root.querySelector('[data-act="next"]').addEventListener('click', () => api.go('create'));
  return root;
}
// A system banner at the top of the screen (push or Mail); tapping it opens the app there.
function banner(api, kind, onOpen) {
  document.querySelector('.v4-banner')?.remove();
  const b = node('button', 'v4-banner', `<img src="${A('assets/alva-app-icon.svg')}" alt=""><div><div class="v4-banner-top"><strong>${kind === 'push' ? 'Alva' : 'Mail · Alva'}</strong><span>now</span></div><p>${kind === 'push' ? 'You’re in. Your request was approved.' : 'You’re in — open Alva to get started.'}</p></div>`);
  b.type = 'button';
  document.querySelector('#overlays').append(b);
  if (!api.reduced()) b.animate([{ transform: 'translateY(-120%)' }, { transform: 'none' }], { duration: 460, easing: EASE });
  b.addEventListener('click', () => { b.remove(); onOpen(); });
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
  { avatar: IMG.matt, name: 'Matt Bryson', role: 'Managing Director, Equity Research · Wedbush', time: '12 Aug, 03:00', quote: 'Matt Bryson, Wedbush analyst, sees an opportunity for Marvell and TSMC as Microsoft prepares Maia 300.', link: 'tradingview.com', stance: '', analysis: 'Custom accelerators may lower compute costs; an unveiling is not evidence of deployment or returns.' },
  { avatar: LOGO.AMD, name: 'Market data', role: 'Price & volume', time: '12 Aug, 10:40', quote: 'AMD closed above its July pullback high on volume 1.6× its 50-day average.', link: 'nasdaq.com', stance: 'Supports', analysis: 'Heavier volume on the breakout supports the view that more buyers are joining the advance.' },
];
const PILLS = ['All', 'Chips', 'Memory', 'Hyperscaler', 'Neocloud', 'Enterprise AI', 'Agent Infra', 'Consumer AI', 'Space', 'Interconnect', 'Power', 'Crypto'];

function renderHome(api) {
  const P = people(api);
  const mine = api.state.myThesis || { body: DRAFTS[OPTIONS_START[0]].said, ticker: 'NVDA', author: 'Hugo' };
  const shortBody = mine.body.split(/(?<=\.)\s/)[0];
  const root = node('section', 'page v4-full v4-home');
  root.setAttribute('aria-label', 'For You');
  root.innerHTML = `
    <div class="v4-feed">
      <header class="v4-feed-head">
        <div class="v4-feed-title"><h1>For You</h1><button type="button" class="v4-bell" aria-label="Notifications">${ic(ICON.bell, 20)}</button></div>
        <div class="v4-pill-rail"><div class="v4-pills">${PILLS.map((p, i) => `<span class="${i ? '' : 'is-on'}">${esc(p)}</span>`).join('')}</div><i class="v4-pill-fade"></i><span class="v4-pill-more">${ic(ICON.down, 12)}</span></div>
      </header>
      <div class="v4-feed-scroll">
        ${feedCard({ name: mine.author, role: 'Your thesis', time: 'Just now', avatar: meAvatar(32), tickers: [[mine.ticker, null]], ret: { seed: 5, label: '+0.0%', flat: true }, body: esc(shortBody), bookmarks: 0, cls: 'is-feed v4-pinned' })}
        ${feedCard({ ...P.gavin, body: 'Baker argues that cheaper models are already lowering the cost of AI use. If cheaper models take share from frontier labs with high inference margins, customers could get more intelligence for each dollar and increase their token usage. Under that scenario, part of the profit pool could move from model providers to AI infrastructure. He sees low delivery cost per…', more: true, cls: 'is-feed' })}
        ${feedCard({ ...P.satya, cls: 'is-feed' })}
        ${feedCard({ ...P.sam, cls: 'is-feed' })}
      </div>
      <nav class="v4-tabbar" aria-label="Tabs"><div class="v4-tabs"><span class="is-on">${ic(ICON.forYou, 24)}For You</span><span>${ic(ICON.chatAi, 24)}Alva</span><span>${ic(ICON.search, 24)}Search</span><span>${ic(ICON.me, 24)}Me</span></div>
        <button type="button" class="v4-fab" aria-label="Create">${ic(ICON.addTab, 28)}</button></nav>
    </div>
    <div class="v4-detail-page" hidden>
      <header class="v4-dtop"><button class="v4-dtop-back" type="button" aria-label="Back">${ic(ICON.back, 20)}</button>
        <div class="v4-dtop-id"><img class="v4-avatar" style="--s:32px" src="${IMG.stewie}" alt=""><div><strong>Traderstewie</strong><span>Trader · Trade setup</span></div></div>
        <button class="v4-update" type="button"><img src="${ICON.addL1}" alt="">Update</button>
        <button class="v4-dtop-more" type="button" aria-label="More">${ic(ICON.more, 20)}</button></header>
      <main class="v4-detail-scroll">
        <section class="v4-sim"><b>+0.0%</b><div class="v4-sim-chart"><i class="v4-sim-line"></i><i class="v4-sim-now"></i></div><div class="v4-axis"><span>Today</span><span>Now</span></div></section>
        <section class="v4-dupd">
          <div class="v4-time"><span>Just now</span><span class="v4-latest">Latest</span></div>
          ${chip('GOOGL', 'up')}
          <div class="v4-dbody"><p>AMD is approaching its summer high as more buyers join the advance.</p><p>The stock has broken higher after its last pullback stopped above the previous low. Rising trading volume makes the recovery more convincing. [1]</p></div>
          <div class="v4-chart"><img src="${IMG.chartGoogl}" alt="Alphabet · GOOGL chart"></div>
        </section>
        <nav class="v4-dtabs"><div class="v4-dtabs-row"><button type="button" class="is-active" data-tab="overview"><img src="${ICON.live}" alt="">Overview</button><button type="button" data-tab="signals"><img src="${ICON.live}" alt="">Signals</button></div></nav>
        <section class="v4-panel" data-panel="overview">
          <article class="v4-overview"><div class="v4-overview-head"><img src="${IMG.alva}" alt=""><strong>Writing your first overview…</strong></div>
            <p>Alva is reading the sources behind your thesis to sum up what supports and challenges it.</p>
            <div class="v4-skel"><i style="width:72px;height:20px"></i><i style="width:296px"></i><i style="width:243px"></i></div>
            <div class="v4-skel"><i style="width:72px;height:20px"></i><i style="width:201px"></i></div>
          </article>
        </section>
        <section class="v4-panel v4-dsignals" data-panel="signals" hidden>
          ${DETAIL_SIGNALS.map(s => `<article class="v4-dsig"><div class="v4-dsig-quote"><div class="v4-dsig-id">${avatarImg(s.avatar)}<div class="v4-dsig-copy"><strong>${esc(s.name)}</strong><span>${esc(s.role)}</span></div><time>${esc(s.time)}</time></div><p>${esc(s.quote)} <a>${esc(s.link)}</a></p></div>
            <p class="v4-alva-para is-detail"><span class="v4-stance ${s.stance ? '' : 'is-none'}">${alvaMark()}${s.stance ? `<em class="${s.stance === 'Supports' ? 'is-supports' : 'is-mixed'}">${s.stance}</em>` : ''}</span>${esc(s.analysis)}</p>
            <div class="v4-feedback">${ic(ICON.like, 16)}${ic(ICON.close, 16)}</div></article>`).join('')}
        </section>
      </main>
      <div class="v4-suggest"><button type="button">${ic(ICON.chatL1, 14)}Summarize signals</button><button type="button">${ic(ICON.chatL1, 14)}What changed today?</button><button type="button">${ic(ICON.chatL1, 14)}Bull vs bear</button></div>
      <footer class="v4-cta"><span class="v4-cta-ask">${ic(ICON.chatAi, 20)}Ask Alva</span><span class="v4-cta-right"><span class="v4-cta-save">${ic(ICON.bookmark, 20)}68</span><span class="v4-cta-share">${ic(ICON.share, 20)}</span></span></footer>
    </div>`;
  const feed = root.querySelector('.v4-feed'), detail = root.querySelector('.v4-detail-page'), pinned = root.querySelector('.v4-pinned');
  const scroll = root.querySelector('.v4-detail-scroll'), tabs = root.querySelector('.v4-dtabs');
  const overlays = document.querySelector('#overlays');
  let alive = true, guideStep = -1, coach = null, opening = null;
  const appEl = () => document.querySelector('.onboarding-app');
  const unit = () => root.getBoundingClientRect().width / root.offsetWidth || 1;
  const rel = el => { const b = appEl().getBoundingClientRect(), r = el.getBoundingClientRect(), u = unit(); return { x: (r.left - b.left) / u, y: (r.top - b.top) / u, w: r.width / u, h: r.height / u }; };

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
  const tabsTop = () => tabs.offsetTop - 12;   // the tabs stick 12 under the top bar (Figma y 143)
  const tabRow = () => rel(tabs.querySelector('.v4-dtabs-row'));

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
    detail.querySelector('.v4-dtop').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: 160, fill: 'backwards' });
    feed.animate([{ transform: 'none' }, { transform: 'scale(.97)' }], { duration: 520, easing: EASE_IO });
    await opening.finished.catch(() => {});
  }
  async function closeDetail() {
    if (detail.hidden) return;
    if (!api.reduced()) {
      await scrollTo(0, 280);
      const app = rel(root), c = rel(pinned);
      const inset = `inset(${c.y - app.y}px 0px ${app.y + app.h - (c.y + c.h)}px 0px round 12px)`;
      feed.animate([{ transform: 'scale(.97)' }, { transform: 'none' }], { duration: 460, easing: EASE_IO });
      await detail.animate([{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }, { clipPath: 'inset(0px 0px 0px 0px round 12px)', offset: .1 }, { clipPath: inset, opacity: 1, offset: .9 }, { clipPath: inset, opacity: 0 }], { duration: 460, easing: EASE_IO }).finished.catch(() => {});
    }
    detail.hidden = true; feed.inert = false;
  }

  /* Coach mark (Figma Coach mark · 强制引导): black 24% with a square hole the
   * size of the target; one bubble (white, padding 16, width 300, Shadow L)
   * whose triangle (16 × 9) points at the hole from 8 away. The hole moves
   * between steps. */
  function ensureCoach() {
    if (coach?.isConnected) return coach;
    coach = node('div', 'v4-coach', `<div class="v4-coach-hole"></div><div class="v4-coach-tip"><svg class="v4-coach-arrow" viewBox="0 0 16 10" aria-hidden="true"><path d="M0 10 8 0l8 10Z"/></svg><div class="v4-coach-box" role="dialog" aria-modal="true" aria-labelledby="v4CoachTitle"><div class="v4-coach-text"><h2 id="v4CoachTitle"></h2><p></p></div><div class="v4-coach-foot"><span></span><button type="button" class="v4-coach-btn"></button></div></div></div>`);
    overlays.append(coach);
    coach.querySelector('.v4-coach-btn').addEventListener('click', () => advance());
    coach.querySelector('.v4-coach-hole').addEventListener('click', () => advance());
    if (!api.reduced()) coach.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' });
    return coach;
  }
  function place(rect, i, align = 'center') {
    const c = ensureCoach(), hole = c.querySelector('.v4-coach-hole'), tip = c.querySelector('.v4-coach-tip'), arrow = c.querySelector('.v4-coach-arrow');
    const W = appEl().offsetWidth, BW = Math.min(300, W - 32);
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
    arrow.style.left = `${Math.max(12, Math.min(BW - 28, cx - left - 8))}px`;
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
  const full = r => ({ x: 0, y: r.y, w: appEl().offsetWidth, h: r.h });

  async function showStep(i) {
    guideStep = i;
    if (i === 0) { place(full(rel(pinned)), 0); return; }
    if (i === 1) { await scrollTo(0); place(full(rel(root.querySelector('.v4-sim'))), 1); return; }
    if (i === 2) {
      // The page scrolls itself until the tabs stick under the top bar.
      selectTab('overview'); await scrollTo(tabsTop());
      const r = union(tabRow(), rel(root.querySelector('.v4-overview'))); r.h += 16;
      place(full(r), 2); return;
    }
    if (i === 3) {
      selectTab('signals'); scroll.scrollTop = Math.min(scroll.scrollTop, tabsTop()); await scrollTo(tabsTop());
      place(full(union(tabRow(), rel(root.querySelector('.v4-dsig')))), 3); return;
    }
    if (i === 4) {
      await scrollTo(0); selectTab('overview');
      const b = rel(root.querySelector('.v4-update'));
      place({ x: b.x - 6, y: b.y - 6, w: b.w + 12, h: b.h + 12 }, 4, 'right'); return;
    }
    if (i === 5) {
      const b = rel(root.querySelector('.v4-dtop-back .v4-ic'));
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
  root.querySelector('.v4-dtop-back').addEventListener('click', () => { if (guideStep < 0) closeDetail(); });
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
  const render = { landing: renderLanding, invite: renderInvite, request: renderRequest, listed: renderListed, declined: renderDeclined, approved: renderApproved, create: renderCreate, chat: renderChat, profile: renderProfile, home: renderHome }[name];
  if (!render) throw new Error(`Unknown v4 page: ${name}`);
  return render(api);
}
