// PC onboarding · Track (Figma: Thesis MVP › PC Thesis › Onboarding · PC v3).
// Same steps and motion as the mobile Track demo, minus Notifications:
// Login → People → Collecting → Deck → Analysis / Signals → Portfolio → Ready → For You.
// The modal and its left rail stay put for the whole flow; each step carries one
// element over from the previous one (the login dialog grows, the followed
// avatars fly in, the bookmarked card comes back and rises, the success circle
// opens onto For You). Motion values are the mobile ones (docs: onboarding-track-motion-spec).
import { node, escapeHTML } from './ui.js';
import { renderThesisContent } from './cards.js?v=10';
import { analyzingCard, ANALYSIS_TASKS, signalCard } from './intro.js?v=13';
import { PEOPLE } from './setup.js?v=46';
import { trackedSignals } from './intro-track.js?v=51';
import { SOURCE_AUTHORS } from '../thesis-demo-state.js?v=8';

document.documentElement.dataset.theme = 'light';
if (parent !== window) parent.postMessage({ type: 'alva:prototype-ready' }, location.origin);

const EASE = 'cubic-bezier(.22,1,.36,1)';
const STD = 'cubic-bezier(.4,0,.2,1)';
const POP = 'cubic-bezier(.05,.75,.15,1)';
const EASE_IO = 'cubic-bezier(.45,0,.25,1)';
const FLY = 'cubic-bezier(.3,.6,.4,1)';
const BACK = 'cubic-bezier(.3,1.4,.5,1)';
const RELEASE = .32;
const TILTS = [-1.6, 1.4, -1.1, 1.9, -1.9, 1.1, -1.3, 1.7];
const COLORS = ['#49a3a6', '#2a9b7d', '#f5ad19', '#ff7a59', '#6c8cff', '#b9dcd8', '#e6c3ff'];
const easeInOut3 = t => t < .5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut5 = t => 1 - Math.pow(1 - t, 5);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const R = () => reduced.matches;

const ASSETS = {
  logo: '12552:200754', google: 'I12552:200758;23386:4239;23391:4519', apple: 'I12552:200759;23386:4239;23391:4519',
  discord: 'I12552:200761;23386:4239;23391:4519', x: 'I12552:200762;23386:4239;23391:4519', telegram: 'I12552:200763;23386:4239;23391:4519',
  back: 'I12552:200909;3931:33522;12552:200937;4029:31573', importX: 'I12552:200915;9170:48523',
};
const BROKERS = [
  { id: 'alpaca', name: 'Alpaca', logo: 'I12552:201995;9170:48622' },
  { id: 'robinhood', name: 'Robinhood', logo: 'I12552:201996;9170:48632' },
  { id: 'interactive-brokers', name: 'Interactive Brokers', logo: 'I12552:201997;9170:48645', beta: true },
  { id: 'webull', name: 'Webull', logo: 'I12552:201998;9170:48660' },
];
const COPY = {
  people: { title: 'Follow people you trust.', desc: 'Get their next thesis and its latest signals as soon as they share it.' },
  pick: { title: 'Bookmark theses. Alva keeps watch.', desc: 'Choose your views. Get new voices and data, for or against them.' },
  track: { title: 'Hidden alpha, from the people who know.', desc: 'Alva tracks the thesis against the world 24/7, and surfaces what matters.' },
  portfolio: { title: 'Connect your portfolio', desc: 'See which theses and signals matter to the assets you hold.' },
};

const [manifest, data] = await Promise.all(['assets/manifest.json?v=6', 'content.json?v=4'].map(async url => {
  const response = await fetch(url); if (!response.ok) throw new Error(url); return response.json();
}));
for (const item of data.feed || []) if (!data.theses.some(t => t.id === item.id)) data.theses.push(item);
await document.fonts.ready;

const api = { data, asset: id => manifest[id] || '', reduced: R };
const img = (id, cls = '', alt = '') => `<img class="${cls}" src="${escapeHTML(api.asset(id))}" alt="${escapeHTML(alt)}" draggable="false">`;
const state = { following: new Set(), bookmarked: new Set(), dismissed: new Set(), connections: new Set(), trackedId: null, trackReady: false };

const app = document.querySelector('#pcApp'), layer = document.querySelector('#pcLayer');
const modal = document.querySelector('#pcModal'), feed = app.querySelector('.pc-feed');
let step = null, rail = null, right = null, inner = null, view = null, cleanup = null, busy = false;

/* ── geometry: width = min(864, vw − 64), height = min(640, vh − 80) ── */
// Below the PC minimum (870 × 560) the whole page is shown scaled at 1512 × 860.
function viewport() {
  const small = innerWidth < 870 || innerHeight < 560;
  if (small) {
    const k = Math.min(innerWidth / 1512, innerHeight / 860);
    Object.assign(app.style, { width: '1512px', height: '860px', transformOrigin: '0 0', transform: `scale(${k})`, left: `${(innerWidth - 1512 * k) / 2}px`, top: `${(innerHeight - 860 * k) / 2}px`, right: 'auto', bottom: 'auto' });
    return { vw: 1512, vh: 860 };
  }
  Object.assign(app.style, { width: '', height: '', transform: '', left: '', top: '', right: '', bottom: '' });
  return { vw: innerWidth, vh: innerHeight };
}
function geometry(kind = modal.classList.contains('is-login') ? 'login' : 'main') {
  const { vw, vh } = viewport();
  const w = kind === 'login' ? Math.min(440, vw - 64) : Math.max(560, Math.min(864, vw - 64));
  const h = kind === 'login' ? Math.max(560, Math.min(680, vh - 80)) : Math.max(520, Math.min(640, vh - 80));
  return { w, h, x: Math.round((vw - w) / 2), y: Math.max(16, Math.round((vh - h) / 2)) };
}
function place(g) {
  Object.assign(modal.style, { left: `${g.x}px`, top: `${g.y}px`, width: `${g.w}px`, height: `${g.h}px` });
  modal.style.setProperty('--deck-h', `${g.h - 160}px`);
}
let resizeTimer;
addEventListener('resize', () => {
  modal.classList.add('is-resizing'); place(geometry());
  clearTimeout(resizeTimer); resizeTimer = setTimeout(() => modal.classList.remove('is-resizing'), 220);
});

function toast(message) {
  const t = document.querySelector('#toast'); t.textContent = message; t.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => t.classList.remove('show'), 2200);
}
const play = (el, frames, duration, options = {}) => el.animate(frames, { duration: R() ? 0 : duration, easing: STD, fill: 'both', ...options });
const done = a => a.finished.catch(() => {});

/* ── Login ── */
function renderLogin() {
  modal.classList.add('is-login');
  modal.innerHTML = `<div class="pc-inner"><button class="pc-close" type="button" aria-label="Close"><svg viewBox="0 0 20 20"><path d="M4.5 4.5l11 11M15.5 4.5l-11 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/></svg></button>
    <div class="pc-login setup-page"><div class="setup-login-body">
      <div class="setup-login-main">
        <div class="setup-login-heading">${img(ASSETS.logo, 'setup-login-logo', 'Alva')}<div><h1>Log in to Alva</h1><p>Login to build, remix, and trade.</p></div></div>
        <button class="setup-login-option" type="button" data-provider>${img(ASSETS.google)}<span>Sign in with Google</span></button>
        <button class="setup-login-option" type="button" data-provider>${img(ASSETS.apple)}<span>Sign in with Apple</span></button>
        <div class="setup-login-social">${['discord', 'x', 'telegram'].map(k => `<button class="setup-login-option" type="button" data-provider aria-label="Sign in with ${k}">${img(ASSETS[k])}</button>`).join('')}</div>
        <div class="setup-login-divider"><span></span><span>or</span><span></span></div>
        <button class="setup-login-option setup-email" type="button" data-provider>Login with Email</button>
      </div>
      <p class="setup-login-terms">By signing in, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
    </div></div></div>`;
  modal.querySelectorAll('[data-provider]').forEach(b => b.onclick = () => go('people'));
  modal.querySelector('.pc-close').onclick = () => {
    app.classList.add('is-closed');
    toast('Click anywhere to log in again.');
    layer.addEventListener('click', () => app.classList.remove('is-closed'), { once: true });
  };
  rail = right = null; inner = modal.firstElementChild;
}

/* ── Main frame: rail + right ── */
function buildMain() {
  modal.classList.remove('is-login');
  modal.innerHTML = `<div class="pc-inner"><aside class="pc-rail">
      <div class="pc-topbar"><button class="pc-back" type="button" aria-label="Back">${img(ASSETS.back)}</button><button class="pc-skip" type="button">Skip</button></div>
      <div class="pc-title"><h1></h1><p></p></div>
      <div class="pc-actions"><p class="pc-hint" aria-live="polite"></p><button class="pc-primary" type="button"><span>Next</span></button></div>
    </aside><section class="pc-right"></section></div>`;
  inner = modal.firstElementChild; rail = inner.querySelector('.pc-rail'); right = inner.querySelector('.pc-right');
  rail.querySelector('.pc-back').onclick = () => handlers.back?.();
  rail.querySelector('.pc-skip').onclick = () => handlers.skip?.();
  rail.querySelector('.pc-primary').onclick = () => { if (!rail.querySelector('.pc-primary').disabled) handlers.next?.(); };
}
const handlers = {};
const primary = () => rail.querySelector('.pc-primary');
function setHint(text, animate = false) {
  const hint = rail.querySelector('.pc-hint'); if (hint.textContent === text) return;
  hint.textContent = text; if (animate) play(hint, [{ opacity: 0 }, { opacity: 1 }], 160);
}
function setPrimary({ label = 'Next', disabled = false }) {
  const b = primary(), span = b.querySelector('span');
  if (span.textContent !== label) { span.textContent = label; play(span, [{ opacity: 0 }, { opacity: 1 }], 160); }
  b.disabled = disabled;
}
// Heading: the old copy fades out (120, STD), the new one rises 8px (240, EASE_OUT); description 40ms later.
async function setRail(copy, { animate = true, delay = 0, skip = false, back = true } = {}) {
  rail.querySelector('.pc-skip').hidden = !skip;
  rail.querySelector('.pc-back').hidden = !back;
  const h1 = rail.querySelector('.pc-title h1'), p = rail.querySelector('.pc-title p');
  if (h1.textContent === copy.title) return;
  if (animate && !R() && h1.textContent) {
    if (delay) await sleep(delay);
    await Promise.all([done(play(h1, [{ opacity: 1 }, { opacity: 0 }], 120)), done(play(p, [{ opacity: 1 }, { opacity: 0 }], 120))]);
  }
  h1.textContent = copy.title; p.textContent = copy.desc;
  if (animate) {
    play(h1, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], 240, { easing: EASE });
    play(p, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], 240, { easing: EASE, delay: 40 });
  }
}
// Right panel: old content 120 out, new 160 in; rows rise 8px, 160 ease-out, 80 + 60·i (first 8 only).
async function swapRight(next, { rows = null, instant = false } = {}) {
  const old = view; view = next;
  right.append(next);
  if (old && !instant && !R()) { next.style.opacity = '0'; await done(play(old, [{ opacity: 1 }, { opacity: 0 }], 120)); }
  old?.remove(); next.style.opacity = '';
  if (instant || R()) return;
  play(next, [{ opacity: 0 }, { opacity: 1 }], 160);
  if (rows) [...next.querySelectorAll(rows)].slice(0, 8).forEach((row, i) =>
    play(row, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], 160, { delay: 80 + 60 * i, easing: 'ease-out' }));
}

/* ── Login ⇄ main: the dialog itself changes size (360, EASE_OUT); content is empty meanwhile. ── */
async function morphTo(kind) {
  const from = geometry(kind === 'main' ? 'login' : 'main'), to = geometry(kind);
  if (!R()) await done(play(inner, [{ opacity: 1 }, { opacity: 0 }], 120));
  modal.innerHTML = ''; modal.classList.toggle('is-login', kind === 'login');
  if (!R()) {
    await done(modal.animate([
      { left: `${from.x}px`, top: `${from.y}px`, width: `${from.w}px`, height: `${from.h}px` },
      { left: `${to.x}px`, top: `${to.y}px`, width: `${to.w}px`, height: `${to.h}px` }], { duration: 360, easing: EASE }));
  }
  place(to);
}

/* ── Steps ── */
async function go(next, options = {}) {
  if (busy) return; busy = true;
  try {
    cleanup?.(); cleanup = null;
    const from = step; step = next;
    Object.keys(handlers).forEach(k => delete handlers[k]);
    if (next === 'login') { if (from) await morphTo('login'); else place(geometry('login')); renderLogin(); if (from && !R()) play(modal.firstElementChild, [{ opacity: 0 }, { opacity: 1 }], 160); return; }
    if (!rail) {
      await morphTo('main'); buildMain();
      play(rail, [{ opacity: 0 }, { opacity: 1 }], 120);
    }
    if (next === 'people') await showPeople(from);
    if (next === 'pick') await showPick(from, options);
    if (next === 'track') await showTrack(from, options);
    if (next === 'portfolio') await showPortfolio(from);
    if (next === 'ready') await showReady();
  } finally { busy = false; }
}

/* People */
async function showPeople() {
  setRail(COPY.people, { skip: true });
  const v = node('div', 'pc-view');
  v.innerHTML = `<div class="pc-scroll"><div class="pc-people">
      <div class="setup-import">${img(ASSETS.importX, 'setup-import-icon')}<div class="setup-import-copy"><strong>Import from X</strong><span>Bring in people you already follow</span></div><button class="setup-import-button" type="button" data-import>Connect</button></div>
      <div class="setup-or-divider"><span></span><span>or</span><span></span></div>
      <div class="pc-list">${PEOPLE.map(p => `<div class="setup-person" data-person="${p.id}">${img(p.avatar, 'setup-avatar', p.name)}<div class="setup-person-copy"><strong>${escapeHTML(p.name)}</strong><span>${escapeHTML(p.role)}</span></div><button class="setup-follow" type="button" data-follow="${p.id}">Follow</button></div>`).join('')}</div>
    </div></div>`;
  const update = () => {
    v.querySelectorAll('[data-follow]').forEach(b => { const on = state.following.has(b.dataset.follow); b.textContent = on ? 'Following' : 'Follow'; b.classList.toggle('is-selected', on); b.setAttribute('aria-pressed', String(on)); });
    const imp = v.querySelector('[data-import]'); imp.textContent = state.xImported ? 'Connected' : 'Connect'; imp.classList.toggle('is-connected', !!state.xImported);
    setHint(`${state.following.size} selected`);
  };
  v.querySelectorAll('[data-follow]').forEach(b => b.onclick = () => { const k = b.dataset.follow; state.following.has(k) ? state.following.delete(k) : state.following.add(k); update(); });
  v.querySelector('[data-import]').onclick = () => {
    if (state.xImported) return;
    state.xImported = true; ['gavin', 'satya', 'sam'].forEach(k => state.following.add(k)); update(); toast('Imported 3 people you follow on X.');
  };
  setPrimary({ label: 'Next', disabled: false }); update();
  handlers.back = () => go('login');
  handlers.skip = handlers.next = () => {
    // The followed avatars fly from here into Collecting.
    const base = right.getBoundingClientRect(); state.peopleFrom = {};
    for (const id of state.following) {
      const a = v.querySelector(`[data-person="${id}"] .setup-avatar`); if (!a) continue;
      const r = a.getBoundingClientRect(); if (r.bottom < base.top || r.top > base.bottom) continue;
      state.peopleFrom[id] = { x: r.left - base.left, y: r.top - base.top, size: r.width };
    }
    go('pick', { collect: true });
  };
  await swapRight(v, { rows: '.setup-person' });
}

/* Deck (the mobile swipe deck: Not interested | Bookmark, drag, ← →) */
async function showPick(from, { collect = false } = {}) {
  setRail(COPY.pick, { skip: false });
  setPrimary({ label: 'Next', disabled: state.bookmarked.size === 0 });
  setHint(`${state.bookmarked.size} selected`);
  const following = [...state.following];
  const followed = t => following.includes(SOURCE_AUTHORS[t.id]);
  const pool = [...data.theses.filter(followed), ...data.theses.filter(t => !followed(t))];
  const v = node('div', 'pc-view pc-deck-wrap bookmark-page'); v.dataset.mode = 'pick';
  const deck = node('div', 'bookmark-deck swipe-deck'); v.append(deck);
  const cards = new Map(), END = { id: '__end' }, DONE = { id: '__done' };
  const icon = name => api.asset(data.icons[name]);
  const tiltOf = id => id === END.id ? 1.2 : TILTS[Math.max(0, pool.findIndex(i => i.id === id)) % TILTS.length];
  const queue = () => pool.filter(i => !state.bookmarked.has(i.id) && !state.dismissed.has(i.id));
  let deciding = false, drag = null, alive = true;
  function cardFor(item) {
    if (cards.has(item.id)) return cards.get(item.id);
    let card;
    if (item === DONE) { card = node('article', 'deck-card swipe-end swipe-done', '<div class="swipe-end-copy"><h3>That’s all for now.</h3><p></p></div>'); }
    else if (item === END) {
      card = node('article', 'deck-card swipe-end', '<div class="swipe-end-copy"><h3>Nothing caught your interest?</h3><p>No problem. We’ll prepare more great content for you.</p></div>');
      const skip = node('button', 'btn btn-secondary swipe-end-skip', 'Let’s keep going'); skip.type = 'button'; skip.onclick = () => go('portfolio'); card.append(skip);
    } else {
      card = node('article', 'deck-card'); card.setAttribute('aria-label', `${item.author} thesis`);
      const read = node('div', 'card-reading'); read.append(renderThesisContent(item, api)); card.append(read);
      const bm = escapeHTML(icon('Bookmark icon') || icon('bookmark-l'));
      card.append(node('div', 'swipe-mask is-yes', `<span class="swipe-stamp"><i class="bookmark-icon" style="--icon:url(&quot;${bm}&quot;)"></i>Bookmark</span>`));
      card.append(node('div', 'swipe-mask is-no', `<span class="swipe-stamp"><i class="bookmark-icon" style="--icon:url(&quot;${escapeHTML(icon('Close'))}&quot;)"></i>Not interested</span>`));
      const actions = node('nav', 'bookmark-controls swipe-actions');
      const no = node('button', 'swipe-no', 'Not interested'); no.type = 'button';
      const yes = node('button', 'bookmark-button', `<i class="bookmark-icon" style="--icon:url(&quot;${bm}&quot;)" aria-hidden="true"></i><span>Bookmark</span>`); yes.type = 'button';
      no.onclick = () => decide(item.id, -1); yes.onclick = () => decide(item.id, 1);
      actions.append(no, yes); card.append(actions);
    }
    card.dataset.thesis = item.id; card.style.setProperty('--tilt', `${tiltOf(item.id)}deg`);
    cards.set(item.id, card); return card;
  }
  function arrange() {
    const open = queue(), tail = state.bookmarked.size === 0 ? END : DONE;
    const list = (open.length < 3 ? [...open, tail] : open).slice(0, 3), slots = ['front', 'next', 'previous'], keep = new Set();
    list.forEach((item, i) => {
      const card = cardFor(item); keep.add(item.id);
      card.dataset.deckPosition = slots[i]; card.classList.toggle('front-card', i === 0); card.classList.toggle('real-back-card', i > 0);
      card.inert = i > 0; card.style.zIndex = String(3 - i);
      if (card.parentNode !== deck) { deck.prepend(card); if (cards.size > 1 && !R()) card.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'ease-out' }); }
    });
    for (const [id, card] of cards) if (!keep.has(id) && !card.classList.contains('is-leaving')) card.remove();
    const d = cards.get(DONE.id);
    if (d) { const n = state.bookmarked.size; d.querySelector('p').textContent = `You bookmarked ${n} ${n === 1 ? 'thesis' : 'theses'}. Click Next to see how Alva keeps watch.`; }
    setHint(`${state.bookmarked.size} selected`);
    setPrimary({ label: 'Next', disabled: state.bookmarked.size === 0 });
  }
  function paint(card, dx) {
    const p = Math.max(-1, Math.min(1, dx / ((card.offsetWidth || 1) * RELEASE)));
    card.style.transform = `translateX(${dx}px) rotate(${dx * .035}deg)`;
    card.querySelector('.is-yes').style.opacity = String(Math.max(0, p)); card.querySelector('.is-no').style.opacity = String(Math.max(0, -p));
    card.dataset.locked = String(Math.abs(p) >= 1 ? Math.sign(p) : 0);
  }
  async function decide(id, dir) {
    const card = cards.get(id);
    if (deciding || !card || !card.classList.contains('front-card')) return;
    deciding = true;
    if (dir > 0) { state.bookmarked.add(id); state.trackedId = id; } else state.dismissed.add(id);
    // The stamp locks in (180ms, overshoot) and the matching button lights up, then the card flies out.
    card.classList.add('is-leaving'); card.dataset.locked = String(dir);
    card.querySelector(dir > 0 ? '.is-yes' : '.is-no').style.opacity = '1';
    let from = card.style.transform || 'none';
    if (from === 'none' && !R()) {
      // A click starts where a drag would end: a short push in its direction first.
      await done(card.animate([{ transform: 'none' }, { transform: `translateX(${dir * 24}px) rotate(${dir * .84}deg)` }], { duration: 120, easing: 'ease-out', fill: 'forwards' }));
      from = `translateX(${dir * 24}px) rotate(${dir * .84}deg)`;
    }
    arrange();
    if (!R()) await done(card.animate([{ transform: from }, { transform: `translateX(${dir * right.clientWidth * 1.25}px) rotate(${dir * 14}deg)` }], { duration: 300, easing: FLY, fill: 'forwards' }));
    card.remove(); cards.delete(id); deciding = false;
    if (alive) arrange();
  }
  deck.addEventListener('pointerdown', e => {
    const card = e.target.closest('.front-card');
    if (deciding || !card || card.classList.contains('swipe-end') || e.button !== 0 || e.target.closest('button')) return;
    drag = { card, id: e.pointerId, x: e.clientX, y: e.clientY, axis: null };
  });
  deck.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.axis && Math.hypot(dx, dy) > 6) { drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'; if (drag.axis === 'x') { drag.card.setPointerCapture(e.pointerId); drag.card.classList.add('is-dragging'); } }
    if (drag.axis === 'x') { e.preventDefault(); drag.dx = dx; paint(drag.card, dx); }
  });
  const release = e => {
    if (!drag || e.pointerId !== drag.id) return;
    const { card, dx = 0, axis } = drag; drag = null; card.classList.remove('is-dragging');
    if (axis !== 'x') return;
    if (Math.abs(dx) >= card.offsetWidth * RELEASE) { decide(card.dataset.thesis, Math.sign(dx)); return; }
    const t = card.style.transform; card.style.transform = ''; card.dataset.locked = '0';
    card.querySelectorAll('.swipe-mask').forEach(m => { m.animate([{ opacity: m.style.opacity || 0 }, { opacity: 0 }], { duration: 220 }); m.style.opacity = ''; });
    card.animate([{ transform: t }, { transform: 'none' }], { duration: 380, easing: BACK });
  };
  deck.addEventListener('pointerup', release); deck.addEventListener('pointercancel', release);
  const keys = e => {
    const front = deck.querySelector('.front-card'); if (!front || front.classList.contains('swipe-end')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); decide(front.dataset.thesis, 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); decide(front.dataset.thesis, -1); }
  };
  addEventListener('keydown', keys);
  cleanup = () => { alive = false; removeEventListener('keydown', keys); };
  arrange();
  handlers.back = () => go('people');
  handlers.next = () => {
    if (!state.bookmarked.size) return;
    state.trackedId = state.trackedId && state.bookmarked.has(state.trackedId) ? state.trackedId : [...state.bookmarked].at(-1);
    const front = deck.querySelector('.front-card') || deck;
    state.trackFromTop = front.getBoundingClientRect().top - right.getBoundingClientRect().top;
    state.trackReady = false;
    go('track', { entering: true });
  };

  if (!collect || R()) { await swapRight(v); return; }
  // K1 · Collecting: the followed people's avatars fly to the centre and breathe; then the cards gather.
  const picked = following.map(id => PEOPLE.find(p => p.id === id)).filter(Boolean);
  const people = picked.length <= 3 ? picked : [picked[0], picked[1], picked.at(-1)];
  const trending = !following.length;
  const overlay = node('div', 'pick-collect', trending
    ? `<div class="pick-collect-avatars"><img class="pick-trend full-loader-mark" src="../assets/logo-loading-light.svg" alt=""></div><p>Collecting trending theses…</p>`
    : `<div class="pick-collect-avatars">${people.map(p => `<span class="pick-avatar" data-person="${p.id}">${img(p.avatar)}</span>`).join('')}</div><p>Collecting theses based on your picks…</p>`);
  v.classList.add('is-collecting'); v.append(overlay);
  await swapRight(v, { instant: true });
  const avatars = [...overlay.querySelectorAll('.pick-avatar, .pick-trend')];
  const SIZE = 56, OVERLAP = 12, span = avatars.length * SIZE - (avatars.length - 1) * OVERLAP;
  avatars.forEach((a, i) => { a.style.left = `calc(50% - ${span / 2}px + ${i * (SIZE - OVERLAP)}px)`; a.style.zIndex = String(avatars.length - i); });
  await new Promise(r => requestAnimationFrame(r));
  const base = right.getBoundingClientRect(), fromPos = state.peopleFrom || {};
  const flights = avatars.map((a, i) => {
    const s = fromPos[a.dataset.person], r = a.getBoundingClientRect();
    if (!s) return a.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, delay: i * 60, easing: EASE, fill: 'backwards' }).finished;
    const dx = s.x + s.size / 2 - (r.left - base.left + r.width / 2), dy = s.y + s.size / 2 - (r.top - base.top + r.height / 2);
    return a.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${s.size / SIZE})` }, { transform: 'none' }], { duration: 560, delay: i * 40, easing: 'cubic-bezier(.33,1,.68,1)', fill: 'backwards' }).finished;
  });
  overlay.querySelector('p').animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 360, delay: 260, easing: EASE, fill: 'backwards' });
  await Promise.allSettled(flights);
  const photos = avatars.filter(a => !a.classList.contains('pick-trend'));
  if (photos.length) {
    await Promise.all(photos.map((a, i) => a.querySelector('img').animate([{ opacity: 1 }, { opacity: .4, offset: .45 }, { opacity: 1 }], { duration: 1000, delay: i * 160, iterations: 2, easing: 'ease-in-out' }).finished.catch(() => {})));
    await sleep(160);
  } else await sleep(1100);
  if (!alive) return;
  overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' }).finished.then(() => overlay.remove());
  v.classList.remove('is-collecting');
  // Cards come in alternately from the left and the right; the front card lands last.
  const order = { previous: 0, next: 1, front: 2 };
  [...deck.querySelectorAll('.deck-card')].sort((a, b) => order[a.dataset.deckPosition] - order[b.dataset.deckPosition]).forEach((card, i) => {
    const side = i % 2 ? 1 : -1, rest = getComputedStyle(card).transform, t = rest === 'none' ? '' : rest;
    card.animate([
      { transform: `translateX(${side * right.clientWidth * .62}px) rotate(${side * 12}deg) ${t}`, opacity: 0, easing: 'cubic-bezier(.2,.75,.3,1)' },
      { opacity: 1, offset: .3 },
      { transform: `translateX(${-side * 6}px) rotate(${-side * 1.2}deg) ${t}`, opacity: 1, offset: .7, easing: 'cubic-bezier(.4,0,.4,1)' },
      { transform: t || 'none', opacity: 1 }], { duration: 520, easing: 'linear', fill: 'backwards' });
  });
}

/* Analysis / Signals */
async function showTrack(from, { entering = false } = {}) {
  const item = data.theses.find(t => t.id === state.trackedId) || data.theses[0];
  const signals = trackedSignals(item.id, api);
  setRail(COPY.track, { skip: false, delay: entering ? 200 : 0 });
  setPrimary({ label: 'Next', disabled: !state.trackReady }); setHint(state.trackReady ? `${signals.length} signals found` : 'Alva is analyzing your thesis…');
  const v = node('div', 'pc-view pc-track');
  const stack = node('div', 'pc-track-stack'); v.append(stack);
  const card = node('article', 'track-card'); card.append(renderThesisContent(item, api));
  const column = node('div', 'track-signals has-signals'); const title = node('h2', 'track-signals-title', 'Signals'); column.append(title);
  stack.append(card, column);
  let alive = true, typing = false, taskIndex = 0;
  const timers = new Set(), anims = new Set();
  const wait = ms => new Promise(r => { const t = setTimeout(() => { timers.delete(t); r(); }, ms); timers.add(t); });
  const p2 = (el, frames, duration, opts = {}) => { const a = el.animate(frames, { duration, easing: EASE, ...opts }); anims.add(a); return a.finished.catch(() => {}).finally(() => { anims.delete(a); a.cancel(); }); };
  cleanup = () => { alive = false; typing = false; timers.forEach(clearTimeout); anims.forEach(a => a.cancel()); };
  handlers.back = () => go('pick');
  handlers.next = () => go('portfolio');
  const finish = () => { setHint(`${signals.length} signals found`, true); setPrimary({ label: 'Next', disabled: false }); state.trackReady = true; };
  if (state.trackReady || R()) {
    signals.forEach(s => column.append(signalCard(s, api)));
    await swapRight(v); v.scrollTop = Math.min(v.scrollHeight - v.clientHeight, title.getBoundingClientRect().top - v.getBoundingClientRect().top - 120); finish(); return;
  }
  const scrollTo = (to, duration) => new Promise(resolve => {
    const fromTop = v.scrollTop, start = performance.now();
    const step = now => { if (!alive) return resolve(); const t = Math.min(1, (now - start) / duration); v.scrollTop = fromTop + (to - fromTop) * easeOut5(t); t < 1 ? requestAnimationFrame(step) : resolve(); };
    requestAnimationFrame(step);
  });
  // Keep the Signals title 120 from the top once the list outgrows the panel.
  const titleTop = () => title.getBoundingClientRect().top - v.getBoundingClientRect().top + v.scrollTop;
  const follow = () => { const max = v.scrollHeight - v.clientHeight, target = Math.min(max, titleTop() - 120); if (target > v.scrollTop + 1) scrollTo(target, 320); };
  // 1 · The card that was bookmarked left the deck to the right: it comes back in at the deck's
  //     front-card position (560, linear with segment easings), then rises to the top (760).
  card.style.opacity = '0'; title.style.opacity = '0';
  await swapRight(v);
  const restTop = card.getBoundingClientRect().top - right.getBoundingClientRect().top;
  const dy = Number.isFinite(state.trackFromTop) ? state.trackFromTop - restTop : 0;
  card.style.opacity = '';
  if (entering) await p2(card, [
    { transform: `translate(115%, ${dy}px) rotate(10deg)`, opacity: 0, easing: 'cubic-bezier(.2,.75,.3,1)' },
    { opacity: 1, offset: .35 },
    { transform: `translate(-6px, ${dy}px) rotate(-.6deg)`, opacity: 1, offset: .72, easing: 'cubic-bezier(.4,0,.4,1)' },
    { transform: `translateY(${dy}px)`, opacity: 1 }], 560, { easing: 'linear', fill: 'forwards' });
  if (!alive) return;
  await p2(card, [{ transform: `translateY(${dy}px)` }, { transform: 'none' }], 760, { easing: 'cubic-bezier(.45,0,.2,1)' });
  if (!alive) return;
  // 2 · Signals title + an analysis card unfold under the thesis.
  // 3 · Each analysis card works for a while, then turns into a signal in place (420, EASE_IO).
  //     After the new signal has settled (+200), a fresh analysis card opens above it.
  //     Signals arrive C, B, A, so the newest is always on top.
  title.style.opacity = '';
  p2(title, [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }], 320);
  let analysis = null, reveal = null;
  const openAnalysis = async (first) => {
    analysis = analyzingCard(api); reveal = node('div', 'track-analysis-reveal'); reveal.append(analysis); title.after(reveal);
    const h = reveal.offsetHeight;
    if (first) await p2(reveal, [{ height: '0px', opacity: 0, marginTop: '-8px' }, { height: `${h}px`, opacity: 1, marginTop: '0px' }], 520);
    else await p2(reveal, [{ height: '0px', opacity: 0, marginTop: '-12px' }, { height: `${h}px`, opacity: 1, marginTop: '0px' }], 400);
    // typewriter task line on this card
    const card = analysis, label = card.querySelector('.analysis-task'); typing = true; const mine = card;
    (async () => {
      const type = async (text, del, ms) => { const L = [...text]; for (let i = 1; i <= L.length; i++) { await wait(ms / L.length); if (!alive || !typing || analysis !== mine) return false; label.textContent = L.slice(0, del ? L.length - i : i).join(''); } return true; };
      while (alive && typing && analysis === mine) {
        await wait(900 + Math.random() * 400); if (!alive || !typing || analysis !== mine) return;
        if (!await type(label.textContent, true, 160)) return;
        taskIndex = (taskIndex + 1) % (ANALYSIS_TASKS.length - 1);
        if (!await type(ANALYSIS_TASKS[taskIndex], false, 240)) return;
      }
    })();
  };
  const morph = async (signal) => {
    typing = false;
    const el = signalCard(signal, api), fromH = reveal.offsetHeight, tint = getComputedStyle(analysis).backgroundColor;
    reveal.before(el); const toH = el.offsetHeight, content = [...el.children];
    const veil = node('div', 'signal-morph-veil'); veil.style.background = tint; const a = analysis; veil.append(a);
    el.classList.add('is-morphing'); el.append(veil); reveal.remove(); reveal = null; analysis = null;
    await Promise.all([
      p2(el, [{ height: `${fromH}px`, borderRadius: '12px', boxShadow: 'none' }, { height: `${fromH}px`, borderRadius: '12px', boxShadow: 'none', offset: .12 }, { height: `${toH}px`, borderRadius: '8px' }], 420, { easing: EASE_IO }),
      p2(a, [{ opacity: 1 }, { opacity: 0, offset: .3 }, { opacity: 0 }], 420, { easing: 'ease-out', fill: 'forwards' }),
      p2(veil, [{ opacity: 1 }, { opacity: 1, offset: .3 }, { opacity: 0, offset: .78 }, { opacity: 0 }], 420, { easing: 'ease-in-out', fill: 'forwards' }),
      ...content.map(c => p2(c, [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 0, transform: 'translateY(4px)', offset: .5 }, { opacity: 1, transform: 'none' }], 420, { easing: 'ease-out' })),
    ]);
    veil.remove(); el.classList.remove('is-morphing');
  };
  await openAnalysis(true); if (!alive) return;
  follow();
  for (let k = 0; k < signals.length; k++) {
    await wait(k === 0 ? 1100 : 900 + Math.round(Math.random() * 400)); if (!alive) return;
    await morph(signals[signals.length - 1 - k]); if (!alive) return;
    follow();
    if (k < signals.length - 1) { await wait(200); if (!alive) return; await openAnalysis(false); if (!alive) return; }
  }
  // 5 · 260ms later the rail says what was found and Next becomes available.
  await wait(260); if (!alive) return;
  finish();
}

/* Portfolio */
async function showPortfolio() {
  setRail(COPY.portfolio, { skip: true });
  const v = node('div', 'pc-view');
  v.innerHTML = `<div class="pc-scroll"><div class="pc-brokers">${BROKERS.map(b => `<div class="setup-broker">${img(b.logo, 'setup-broker-logo', b.name)}<div class="setup-broker-name">${b.name}${b.beta ? '<span class="setup-beta">Beta</span>' : ''}</div><button class="setup-connect" type="button" data-connect="${b.id}">Connect</button></div>`).join('')}</div></div>`;
  const update = () => {
    v.querySelectorAll('[data-connect]').forEach(b => { const on = state.connections.has(b.dataset.connect); b.textContent = on ? 'Connected' : 'Connect'; b.classList.toggle('is-connected', on); });
    const n = state.connections.size; setHint(`${n} connected`); setPrimary({ label: 'Next', disabled: n === 0 });
  };
  // Connect opens the broker's sign-in window in the product; here it is simulated (600ms).
  v.querySelectorAll('[data-connect]').forEach(b => b.onclick = async () => {
    const id = b.dataset.connect;
    if (state.connections.has(id)) { state.connections.delete(id); update(); return; }
    b.classList.add('is-loading'); b.textContent = 'Connecting…'; await sleep(600); b.classList.remove('is-loading');
    state.connections.add(id); update();
  });
  update();
  handlers.back = () => go('track');
  handlers.skip = handlers.next = () => go('ready');
  await swapRight(v, { rows: '.setup-broker' });
}

/* Ready: the iris closes inside the modal, then opens onto For You across the whole window. */
async function showReady() {
  const snapshot = inner.cloneNode(true); snapshot.setAttribute('inert', '');
  const page = node('section', 'ready-page');
  page.innerHTML = `<div class="ready-under" aria-hidden="true"></div><div class="ready-iris" aria-hidden="true"></div><canvas class="ready-confetti" aria-hidden="true"></canvas>
    <div class="ready-copy" role="status"><div class="ready-badge" aria-hidden="true"><i class="ready-ring"></i><i class="ready-ring"></i><svg class="ready-check" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28"/><path d="M17 28.5l7.5 7.5L39.5 21"/></svg></div><h1>You’re all set.</h1><p>Getting your feed ready…</p></div>`;
  page.querySelector('.ready-under').append(snapshot);
  modal.replaceChildren(page); rail = right = null; view = null;
  const iris = page.querySelector('.ready-iris'), BADGE = 36;
  let alive = true; cleanup = () => { alive = false; };
  const tween = (ms, ease, f) => new Promise(res => { const s = performance.now(); const k = n => { if (!alive) return res(); const t = Math.min(1, (n - s) / ms); f(ease(t)); t < 1 ? requestAnimationFrame(k) : res(); }; requestAnimationFrame(k); });
  const badge = page.querySelector('.ready-badge').getBoundingClientRect(), mb = modal.getBoundingClientRect();
  const cx = badge.left - mb.left + badge.width / 2, cy = badge.top - mb.top + badge.height / 2;
  const far = Math.ceil(Math.max(Math.hypot(cx, cy), Math.hypot(mb.width - cx, cy), Math.hypot(cx, mb.height - cy), Math.hypot(mb.width - cx, mb.height - cy))) + 4;
  const hole = (el, x, y, r) => { const m = `radial-gradient(circle at ${x}px ${y}px, transparent ${r}px, #000 ${r + .75}px)`; el.style.webkitMaskImage = m; el.style.maskImage = m; };
  if (!R()) {
    page.classList.add('is-waiting');
    hole(iris, cx, cy, far);
    await tween(540, easeInOut3, k => { hole(iris, cx, cy, far + (BADGE - far) * k); snapshot.style.opacity = String(Math.min(1, Math.max(0, (.92 - k) / .3))); });
    page.querySelector('.ready-under').replaceChildren();
  }
  page.classList.remove('is-waiting');
  if (!R()) {
    confetti(page);
    page.querySelector('.ready-check').animate([{ transform: 'none' }, { transform: 'scale(1.12)', offset: .4 }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.3,0,.3,1)' });
    page.querySelectorAll('.ready-ring').forEach((r, i) => r.animate([{ transform: 'scale(.9)', opacity: .55 }, { transform: 'scale(2.1)', opacity: 0 }], { duration: 900, delay: 120 + i * 220, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'both' }));
    page.querySelector('.ready-check path').animate([{ strokeDashoffset: 40 }, { strokeDashoffset: 0 }], { duration: 420, delay: 80, easing: STD, fill: 'backwards' });
    [...page.querySelectorAll('.ready-copy h1, .ready-copy p')].forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 160 + i * 90, easing: EASE, fill: 'backwards' }));
  }
  await sleep(R() ? 1000 : 1900); if (!alive) return;
  // The dialog closes (no circle opening): the dialog and its scrim fade out over the
  // logged-out page, then that page reloads once and comes back logged in.
  await Promise.all([
    done(play(modal, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.98)' }], 200, { easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' })),
    done(play(document.querySelector('#pcScrim'), [{ opacity: 1 }, { opacity: 0 }], 240, { easing: 'ease-out', fill: 'forwards' })),
  ]);
  modal.hidden = true; await sleep(R() ? 0 : 160);
  // Page reload: a top progress bar runs while the page blanks, then For You returns logged in.
  const bar = node('div', 'pc-reload-bar'); app.append(bar);
  const blank = node('div', 'pc-reload-blank'); app.append(blank);
  if (!R()) {
    bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(.7)', offset: .6 }, { transform: 'scaleX(1)' }], { duration: 700, easing: 'ease-out', fill: 'forwards' });
    await done(blank.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 120, easing: 'ease-out', fill: 'forwards' }));
    await sleep(460);
  }
  feed.hidden = false; layer.hidden = true;
  if (!R()) await done(blank.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: 'ease-out', fill: 'forwards' }));
  blank.remove(); bar.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' }).finished.then(() => bar.remove());
  step = 'feed';
}

function confetti(root) {
  const canvas = root.querySelector('canvas'), W = root.clientWidth, H = root.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
  canvas.width = W * dpr; canvas.height = H * dpr; const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
  const pieces = [];
  for (let b = 0; b < 5; b++) {
    const ox = W * (.12 + Math.random() * .76), oy = H * (.3 + Math.random() * .45), delay = b * .12 + Math.random() * .1;
    for (let i = 0; i < 34; i++) { const a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 8;
      pieces.push({ x: ox, y: oy, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, delay, w: 6 + Math.random() * 6, h: 3 + Math.random() * 4, r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3, color: COLORS[Math.floor(Math.random() * COLORS.length)] }); }
  }
  const start = performance.now();
  const tick = now => {
    const t = (now - start) / 1000; ctx.clearRect(0, 0, W, H);
    for (const p of pieces) { if (t < p.delay) continue; p.vy += .32; p.vx *= .992; p.vy *= .992; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - 1.8) / .8); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(1, Math.abs(Math.cos(p.r * 2)) * .8 + .2); ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore(); }
    if (t < 2.7 && root.isConnected) requestAnimationFrame(tick); else ctx.clearRect(0, 0, W, H);
  };
  requestAnimationFrame(tick);
}

// Enter = the primary button (when it is available and focus is not on another control).
addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !rail || e.target.closest?.('button,input,a')) return;
  const b = primary(); if (!b.disabled) { e.preventDefault(); b.click(); }
});

// Debug/QA: ?step=people|pick|track|portfolio|ready jumps straight to a step.
const jump = new URLSearchParams(location.search).get('step');
if (jump && jump !== 'login') {
  place(geometry('main')); modal.classList.remove('is-login'); buildMain();
  if (jump !== 'people') { state.following = new Set(['gavin', 'satya']); }
  if (['track', 'portfolio', 'ready'].includes(jump)) { state.trackedId = '12552:205644'; state.bookmarked.add(state.trackedId); state.trackReady = jump !== 'track' || new URLSearchParams(location.search).has('settled'); }
  step = null; await go(jump, jump === 'pick' ? { collect: true } : {});
} else { place(geometry('login')); step = 'login'; renderLogin(); }
