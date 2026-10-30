import { node, escapeHTML, heading, topbar } from './ui.js';
import { renderThesisContent } from './cards.js?v=10';
import { renderSwipePage } from './swipe-deck.js?v=10';
import { analyzingCard, ANALYSIS_TASKS, signalCard } from './intro.js?v=13';
import { SOURCE_AUTHORS } from '../thesis-demo-state.js?v=8';

// Track variant: after following people, the user bookmarks theses from them
// on the existing deck; the last bookmarked card then stays on screen while Alva
// analyzes it. Motion here uses a longer ease-out (onboarding narrative, not
// product UI state feedback).
// Copy is the demo's existing onboarding copy (content.json introCopy / bookmarkCopy
// and the Figma guided headings); nothing new is coined for this variant.
// Track keeps one heading for the whole step (Figma T1–T3); Next only
// arrives under it at the end.
const TRACK_COPY = { title: 'Hidden alpha, from the people who know.', description: 'Alva tracks the thesis against the world 24/7, and surfaces what matters.' };
const copyFor = () => [TRACK_COPY, TRACK_COPY, TRACK_COPY];
// The demo has sourced analyses for the Gavin Baker thesis only. Other picks reuse
// the same three signals; their one-line analyses are marked as placeholders.
const PLACEHOLDER_ANALYSIS = {
  '12552:202166': { '12616:149037': 'A multi-billion compute deal supports the demand Azure is building capacity for. (placeholder analysis)', '12608:109265': 'Competitor silicon progressing is mixed for Azure: more supply, more price pressure. (placeholder analysis)', '12608:109341': 'Maia 300 could lower Azure’s cost per token; nothing here shows it deployed yet. (placeholder analysis)' },
  '12552:202172': { '12616:149037': 'Compute is being contracted at multi-billion scale, consistent with scarcity, not abundance. (placeholder analysis)', '12608:109265': 'New accelerators widen supply only once they ship at volume; bring-up is early. (placeholder analysis)', '12608:109341': 'More accelerator vendors would help affordability; this is an outlook, not shipped capacity. (placeholder analysis)' },
};

export function trackedSignals(thesisId, api) {
  const source = api.data.notificationPreview?.signals?.length ? api.data.notificationPreview.signals : api.data.signals || [];
  const order = ['Riot Platforms', 'SemiAnalysis', 'Matt Bryson'];
  return [...source].sort((a, b) => order.indexOf(a.source) - order.indexOf(b.source)).map(signal => {
    const custom = PLACEHOLDER_ANALYSIS[thesisId]?.[signal.id];
    const generic = thesisId !== '12552:205644' && !custom ? `${signal.analysis} (placeholder analysis)` : signal.analysis;
    return { ...signal, analysis: custom || generic };
  });
}

const EASE = 'cubic-bezier(.22,1,.36,1)';
const easeOut = t => 1 - Math.pow(1 - t, 5);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Bookmark deck limited to the people the user just followed (all theses when
// nobody is followed). The people appear above the deck; after a short loading
// beat each card is dealt out of its author's avatar, so the deck reads as the
// result of the follows. Next carries the last bookmarked thesis into Track.
export function renderPickPage(api) {
  api.state.bookmarked ||= new Set();
  const flow = api.flow;
  const following = [...(api.state.following || [])].filter(Boolean);
  const followed = thesis => following.includes(SOURCE_AUTHORS[thesis.id]);
  // Followed people's theses first, then the rest, so there are always at
  // least eight cards. With nobody followed the deck shows trending theses.
  const mine = api.data.theses.filter(followed), others = api.data.theses.filter(thesis => !followed(thesis));
  const pool = [...mine, ...others];
  const root = renderSwipePage(api, {
    pool, back: flow.prev('pick'),
    onNext() {
      // Bookmarked cards have left the deck, so Track brings the last one
      // back in with its own entrance rather than continuing from the deck.
      api.state.trackedId = [...api.state.bookmarked].at(-1);
      // It re-enters where the deck's front card stands, then rises as usual.
      const front = root.querySelector('.front-card'), base = root.getBoundingClientRect();
      const unit = base.width / root.clientWidth || 1;
      const deckBox = root.querySelector('.bookmark-deck').getBoundingClientRect();
      api.state.trackFromTop = front ? (deckBox.top - base.top) / unit + front.offsetTop : null;
      api.state.trackEnter = true;
      api.persist();
    },
  });
  const deck = root.querySelector('.bookmark-deck');
  const key = following.slice().sort().join(',') || '*';
  const reveal = api.state.pickRevealedFor !== key && !api.reduced();
  const unit = () => root.getBoundingClientRect().width / root.clientWidth || 1;
  // K1 · Collecting: the screen turns white while the followed people's
  // avatars fly from the People list to the centre and take turns at the
  // front, with a line saying their theses are being collected. Then the deck
  // page shows and its cards gather from both sides into one stack.
  let collected = Promise.resolve();
  if (reveal) {
    const people = [];
    for (const thesis of following.length ? pool.filter(followed) : pool.slice(0, 3)) if (!people.some(entry => entry.author === thesis.author)) people.push(thesis);
    const from = api.state.peopleFrom || {};
    const trending = !following.length;
    const overlay = node('div', 'pick-collect', trending
      ? `<div class="pick-collect-avatars"><img class="pick-trend full-loader-mark" src="../assets/logo-loading-light.svg" alt="" aria-hidden="true"></div><p>Collecting trending theses…</p>`
      : `<div class="pick-collect-avatars">${people.map(entry => `<span class="pick-avatar" data-person="${escapeHTML(SOURCE_AUTHORS[entry.id] || '')}"><img src="${escapeHTML(api.asset(entry.avatar))}" alt="" draggable="false"></span>`).join('')}</div><p>Collecting theses based on your picks…</p>`);
    overlay.setAttribute('role', 'status');
    root.append(overlay); root.classList.add('is-collecting');
    const avatars = [...overlay.querySelectorAll('.pick-avatar, .pick-trend')];
    const SIZE = 56, OVERLAP = 12;
    const span = avatars.length * SIZE - (avatars.length - 1) * OVERLAP;
    avatars.forEach((img, index) => { img.style.left = `calc(50% - ${span / 2}px + ${index * (SIZE - OVERLAP)}px)`; img.style.zIndex = String(avatars.length - index); });
    collected = new Promise(resolve => requestAnimationFrame(async () => {
      if (!root.isConnected) return resolve();
      const base = root.getBoundingClientRect(), u = unit();
      const flights = avatars.map((img, index) => {
        const start = from[img.dataset.person], r = img.getBoundingClientRect();
        if (!start) return img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, delay: index * 60, easing: EASE, fill: 'backwards' }).finished;
        const dx = start.x + start.size / 2 - ((r.left - base.left) / u + r.width / u / 2);
        const dy = start.y + start.size / 2 - ((r.top - base.top) / u + r.height / u / 2);
        return img.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${start.size / SIZE})` }, { transform: 'none' }],
          { duration: 560, delay: index * 40, easing: 'cubic-bezier(.33,1,.68,1)', fill: 'backwards' }).finished;
      });
      overlay.querySelector('p').animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 360, delay: 260, easing: EASE, fill: 'backwards' });
      await Promise.allSettled(flights);
      // A soft wave from left to right: each photo dims and comes back in
      // turn, a beat after its left neighbour. Only the photos change; the
      // circles, their order and size stay put.
      const people = avatars.filter(img => !img.classList.contains('pick-trend'));
      if (people.length > 1) {
        const STEP = 160, CYCLE = 1000, ROUNDS = 2;
        const waves = people.map((wrap, index) => wrap.querySelector('img').animate(
          [{ opacity: 1 }, { opacity: .4, offset: .45 }, { opacity: 1 }],
          { duration: CYCLE, delay: index * STEP, iterations: ROUNDS, easing: 'ease-in-out' }).finished.catch(() => {}));
        await Promise.all(waves);
        await sleep(160);
      } else await sleep(1100);
      if (!root.isConnected) return resolve();
      overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' }).finished.then(() => overlay.remove());
      root.classList.remove('is-collecting');
      resolve();
    }));
  }
  root.start = async () => {
    if (!reveal) return;
    await collected;
    if (!root.isConnected) return;
    // Cards come in alternately from the left and the right and gather into
    // one stack: fast out, a small overshoot, settle. The front card lands last.
    const order = { previous: 0, next: 1, front: 2 };
    const cards = [...deck.querySelectorAll('.deck-card')]
      .sort((a, b) => (order[a.dataset.deckPosition] ?? 0) - (order[b.dataset.deckPosition] ?? 0));
    const width = root.clientWidth;
    cards.forEach((card, index) => {
      const side = index % 2 ? 1 : -1;
      const final = getComputedStyle(card).transform, rest = final === 'none' ? '' : final;
      card.animate([
        { transform: `translateX(${side * width * .62}px) rotate(${side * 12}deg) ${rest}`, opacity: 0, easing: 'cubic-bezier(.2,.75,.3,1)' },
        { opacity: 1, offset: .3 },
        { transform: `translateX(${-side * 6}px) rotate(${-side * 1.2}deg) ${rest}`, opacity: 1, offset: .7, easing: 'cubic-bezier(.4,0,.4,1)' },
        { transform: rest || 'none', opacity: 1 },
      ], { duration: 520, easing: 'linear', fill: 'backwards' });
    });
    await sleep(520);
    api.state.pickRevealedFor = key; api.persist();
  };
  return root;
}

export function renderTrackPage(api) {
  const flow = api.flow;
  const item = api.data.theses.find(thesis => thesis.id === api.state.trackedId) || api.data.theses.find(thesis => api.state.bookmarked?.has(thesis.id)) || api.data.theses[0];
  const signals = trackedSignals(item.id, api);
  const root = node('section', 'page track-page');
  root.setAttribute('aria-label', 'Alva tracks this thesis');
  const COPY = copyFor(api);
  // Content runs behind the top bar and fades out at the top edge; the heading
  // and the Next button sit in a panel at the bottom.
  const viewport = node('div', 'track-viewport');
  const stack = node('div', 'track-stack');
  const card = node('article', 'track-card deck-card');
  card.append(renderThesisContent(item, api));
  const column = node('div', 'track-signals'); column.setAttribute('aria-label', 'Signals for this thesis');
  const signalsTitle = node('h2', 'track-signals-title', 'Signals');
  column.append(signalsTitle);
  stack.append(card, column); viewport.append(stack);
  // First frame: the card sits exactly where the deck's front card was, so the
  // page cross-fade shows one card standing still. (Viewport top padding 56 +
  // stack top padding 12.)
  const fromTop = Number.isFinite(api.state.trackFromTop) && !api.state.trackReady ? api.state.trackFromTop : null;
  if (fromTop !== null) card.style.marginTop = `${fromTop - 68}px`;
  const panel = node('div', 'track-panel');
  const header = heading(COPY[0].title, COPY[0].description);
  // Arriving from the swipe deck the bookmarked card has already left the
  // screen, so it comes back in on its own (from the right, where bookmarked
  // cards went) instead of continuing from a deck position.
  const entering = !!api.state.trackEnter && !api.state.trackReady;
  if (fromTop !== null || entering) header.style.opacity = '0';
  if (entering) card.style.opacity = '0';
  const footer = node('footer', 'page-footer track-footer');
  const next = node('button', 'btn btn-primary', 'Next'); next.type = 'button'; next.disabled = true;
  footer.append(next); panel.append(header, footer);
  // Content passing under the status bar and back button is blurred
  // progressively (three blur layers with staggered masks), never cut.
  const fade = node('div', 'track-fade', '<i></i><i></i><i></i>'); fade.setAttribute('aria-hidden', 'true');
  root.append(topbar(api, () => api.go(flow.prev('track'))), viewport, fade, panel);

  let alive = true, started = false, epoch = 0, analysis = null, reveal = null, taskIndex = 0, typing = false;
  const animations = new Set(), timers = new Set(), frames = new Set();
  const valid = token => alive && root.isConnected && token === epoch;
  const unit = () => root.getBoundingClientRect().width / root.clientWidth || 1;
  const wait = ms => new Promise(resolve => { const timer = setTimeout(() => { timers.delete(timer); resolve(); }, ms); timers.add(timer); });
  function stop() {
    epoch++; typing = false;
    animations.forEach(a => a.cancel()); animations.clear();
    timers.forEach(clearTimeout); timers.clear();
    frames.forEach(cancelAnimationFrame); frames.clear();
  }
  function play(element, keyframes, duration, options = {}) {
    const animation = element.animate(keyframes, { duration, easing: EASE, ...options });
    animations.add(animation);
    return animation.finished.catch(() => {}).finally(() => { animation.cancel(); animations.delete(animation); });
  }
  function tweenScroll(to, duration) {
    const from = viewport.scrollTop;
    return new Promise(resolve => {
      const start = performance.now();
      const step = now => {
        const t = Math.min(1, (now - start) / duration);
        viewport.scrollTop = from + (to - from) * easeOut(t);
        if (t < 1 && alive) { const id = requestAnimationFrame(step); frames.add(id); } else resolve();
      };
      const id = requestAnimationFrame(step); frames.add(id);
    });
  }

  async function setHeading(copy, withButton) {
    const h1 = header.querySelector('h1'), p = header.querySelector('p');
    const apply = () => { h1.innerHTML = escapeHTML(copy.title).replace(/\n/g, '<br>'); p.textContent = copy.description; };
    const reveal = () => { if (withButton) { next.disabled = false; root.classList.add('track-can-continue'); } };
    if (api.reduced()) { apply(); reveal(); return; }
    if (h1.textContent.replace(/\s+/g, ' ') === copy.title.replace(/\s+/g, ' ')) {
      // Same heading: it stays and only moves up to make room for Next.
      const before = header.getBoundingClientRect().top;
      reveal();
      const dy = (before - header.getBoundingClientRect().top) / unit();
      const motions = [play(header, [{ transform: `translateY(${dy}px)` }, { transform: 'none' }], 640, { easing: 'cubic-bezier(.22,1,.36,1)' })];
      if (withButton) motions.push(play(next, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], 640, { delay: 80, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
      await Promise.all(motions);
      return;
    }
    // A new heading: the old one lifts away while the new one rises in.
    const panel = header.parentElement, before = header.getBoundingClientRect();
    const ghost = header.cloneNode(true); ghost.classList.add('track-heading-out'); ghost.setAttribute('aria-hidden', 'true');
    apply(); reveal();
    const base = panel.getBoundingClientRect(), scale = base.width / panel.offsetWidth || 1;
    Object.assign(ghost.style, { top: `${(before.top - base.top) / scale}px`, width: `${before.width / scale}px`, left: `${(before.left - base.left) / scale}px`, right: 'auto', margin: '0' });
    panel.append(ghost);
    const motions = [
      play(ghost, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-14px)' }], 420, { fill: 'forwards' }).then(() => ghost.remove()),
      play(header, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 0, offset: .15 }, { opacity: 1, transform: 'none' }], 820, { easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }),
    ];
    if (withButton) motions.push(play(next, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], 820, { delay: 120, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
    await Promise.all(motions);
  }
  function addAnalysis() {
    if (analysis) return;
    analysis = analyzingCard(api);
    reveal = node('div', 'track-analysis-reveal'); reveal.append(analysis);
    // It sits under the Signals title; signals come out beneath it.
    column.classList.add('has-signals'); signalsTitle.after(reveal);
  }
  function addSignal(index, onTop = false) {
    const signal = signalCard(signals[index], api); signal.dataset.signalId = signals[index].id;
    if (onTop) signalsTitle.after(signal); else column.append(signal);
    return signal;
  }
  // The card rises until only its lower part shows; the list does not move after that.
  // Only a sliver of the card stays (it carries the previous screen over);
  // the room below belongs to the analysis and the signals.
  const parkTarget = () => Math.max(0, card.offsetHeight - 64);
  function reserveScroll(target) { stack.style.minHeight = `${viewport.clientHeight + target}px`; }
  function settle() {
    stop(); started = true;
    card.style.marginTop = ''; card.style.opacity = ''; header.style.opacity = '';
    if (reveal) reveal.remove(); analysis = null; reveal = null;
    column.querySelectorAll('.signal-card').forEach(signal => signal.remove());
    signals.forEach((_, index) => addSignal(index));
    column.classList.add('has-signals');
    const target = parkTarget(); reserveScroll(target); viewport.scrollTop = target;
    const h1 = header.querySelector('h1'), p = header.querySelector('p');
    h1.textContent = COPY[2].title; p.textContent = COPY[2].description;
    next.disabled = false; root.classList.add('track-can-continue');
    api.state.trackReady = true; api.persist();
  }
  // Typewriter task line, as in the guided intro: the analysis names what it is doing.
  async function updateTasks(token) {
    const label = analysis.querySelector('.analysis-task');
    typing = true;
    const type = async (text, deleting, duration) => {
      const letters = Array.from(text);
      for (let i = 1; i <= letters.length; i++) {
        await wait(duration / letters.length); if (!valid(token) || !typing) return false;
        label.textContent = letters.slice(0, deleting ? letters.length - i : i).join('');
      }
      return true;
    };
    while (valid(token) && typing) {
      await wait(900 + Math.random() * 400); if (!valid(token) || !typing) return;
      if (!await type(label.textContent, true, 160)) return;
      taskIndex = (taskIndex + 1) % (ANALYSIS_TASKS.length - 1);
      if (!await type(ANALYSIS_TASKS[taskIndex], false, 240)) return;
    }
  }
  async function run() {
    stop(); const token = epoch;
    // 1. The bookmarked card glides from the deck position to its resting place,
    //    partly above the top edge. Layout changes and the compensating transform
    //    happen in one frame, so the card does not move until the animation runs.
    const base = root.getBoundingClientRect();
    const startTop = (card.getBoundingClientRect().top - base.top) / unit();
    card.style.marginTop = '';
    const target = parkTarget(); reserveScroll(target); viewport.scrollTop = target;
    const restTop = (card.getBoundingClientRect().top - base.top) / unit();
    // Even speed through the middle: no jump at the start, a soft landing.
    // From the swipe deck the bookmarked card has left the screen: it first
    // comes back in from the right (where bookmarked cards went) at the deck
    // position, then rises like the deck card would.
    if (entering) {
      card.style.opacity = '';
      await play(card, [
        { transform: `translate(115%, ${startTop - restTop}px) rotate(10deg)`, opacity: 0, easing: 'cubic-bezier(.2,.75,.3,1)' },
        { opacity: 1, offset: .35 },
        { transform: `translate(-6px, ${startTop - restTop}px) rotate(-.6deg)`, opacity: 1, offset: .72, easing: 'cubic-bezier(.4,0,.4,1)' },
        { transform: `translateY(${startTop - restTop}px)`, opacity: 1 },
      ], 560, { easing: 'linear', fill: 'forwards' });
      if (!valid(token)) return;
    }
    const glide = play(card, [{ transform: `translateY(${startTop - restTop}px)` }, { transform: 'none' }], 760, { easing: 'cubic-bezier(.45,0,.2,1)' });
    if (entering) { api.state.trackEnter = false; api.persist(); }
    const rise = header.style.opacity === '0'
      ? play(header, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], 720, { delay: 320, fill: 'backwards' }).then(() => { header.style.opacity = ''; })
      : Promise.resolve();
    header.style.opacity = '';
    await glide;
    if (!valid(token)) return;
    // 2. The Signals title and the analysis card under it unfold beneath the
    //    thesis; the analysis works for a moment.
    addAnalysis();
    const height = reveal.offsetHeight;
    play(signalsTitle, [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }], 320);
    await play(reveal, [{ height: '0px', opacity: 0, marginTop: '-8px' }, { height: `${height}px`, opacity: 1, marginTop: '0px' }], 520);
    if (!valid(token)) return;
    updateTasks(token);
    await wait(1500); if (!valid(token)) return;
    // 3. Signals come out from under the analysis card one by one, newest on
    //    top, pushing the earlier ones down. Each one is squeezed out: its slot
    //    grows from 0 while the card stretches and settles (a soft squash).
    const SQUEEZE = 'cubic-bezier(.3,.7,.2,1)';
    for (let step = 0; step < signals.length - 1; step++) {
      const index = signals.length - 1 - step;
      const signal = signalCard(signals[index], api); signal.dataset.signalId = signals[index].id;
      reveal.after(signal);
      const height = signal.offsetHeight, cs = getComputedStyle(signal);
      play(signal, [
        { height: '0px', paddingTop: '0px', paddingBottom: '0px', marginTop: '-8px', opacity: 0, transform: 'scale(.94, .55)' },
        { opacity: 1, offset: .3 },
        { transform: 'scale(1.015, 1.04)', offset: .62 },
        { height: `${height}px`, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, marginTop: '0px', opacity: 1, transform: 'none' },
      ], 640, { easing: SQUEEZE });
      [...signal.children].forEach(child => play(child, [{ transform: `translateY(-${Math.round(height * .45)}px)` }, { transform: 'none' }], 640, { easing: SQUEEZE }));
      // Uneven gaps (480–960ms), like signals coming in live.
      await wait(480 + Math.round(Math.random() * 480)); if (!valid(token)) return;
    }
    // 4. The analysis card itself turns into the last (top) signal: it changes
    //    size in place and its content cross-fades, so the list never moves up.
    //    Next arrives under the heading at the same time.
    typing = false;
    // One card changes shape: the analyzing card's box becomes the signal card
    // (it keeps its place, then grows to the signal's size and its tint melts
    // to the card colour), its own content fades away and the signal's
    // content appears inside the same box.
    const last = signalCard(signals[0], api); last.dataset.signalId = signals[0].id;
    const from = reveal.offsetHeight, tint = getComputedStyle(analysis).backgroundColor;
    reveal.before(last);
    const to = last.offsetHeight;
    const content = [...last.children];
    const veil = node('div', 'signal-morph-veil'); veil.style.background = tint; veil.append(analysis);
    last.classList.add('is-morphing'); last.append(veil);
    reveal.remove(); reveal = null;
    const EASE_IO = 'cubic-bezier(.45,0,.25,1)', MORPH = 600;
    const morph = Promise.all([
      play(last, [{ height: `${from}px`, borderRadius: '12px', boxShadow: 'none' }, { height: `${from}px`, borderRadius: '12px', boxShadow: 'none', offset: .12 }, { height: `${to}px`, borderRadius: '8px' }], MORPH, { easing: EASE_IO }),
      // In order, never overlapping: the analysis content fades first, then
      // the tint melts away, then the signal's content comes in.
      play(analysis, [{ opacity: 1 }, { opacity: 0, offset: .3 }, { opacity: 0 }], MORPH, { easing: 'ease-out', fill: 'forwards' }),
      play(veil, [{ opacity: 1 }, { opacity: 1, offset: .3 }, { opacity: 0, offset: .78 }, { opacity: 0 }], MORPH, { easing: 'ease-in-out', fill: 'forwards' }),
      ...content.map(child => play(child, [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 0, transform: 'translateY(4px)', offset: .5 }, { opacity: 1, transform: 'none' }], MORPH, { easing: 'ease-out' })),
    ]).then(() => { veil.remove(); last.classList.remove('is-morphing'); analysis = null; });
    // Next comes only after the card has settled, as a separate beat.
    await morph; if (!valid(token)) return;
    await wait(260); if (!valid(token)) return;
    await setHeading(COPY[2], true);
    if (!valid(token)) return;
    api.state.trackReady = true; api.persist();
  }
  next.onclick = () => {
    if (!alive || next.disabled) return;
    stop(); api.state.introComplete = true; api.persist();
    // Notifications opens by shrinking this exact screen into a phone, so hand
    // it a static copy and switch without the usual cross-fade.
    const target = flow.next('track'), handoff = target === 'notifications' && !api.reduced();
    if (handoff) {
      const snapshot = root.cloneNode(true);
      snapshot.removeAttribute('data-page'); snapshot.classList.remove('route-page'); snapshot.setAttribute('inert', '');
      const base = root.getBoundingClientRect(), u = unit(), box = panel.getBoundingClientRect();
      api.handoff = {
        snapshot, scrollTop: viewport.scrollTop,
        size: { width: root.clientWidth, height: root.clientHeight },
        panel: { x: (box.left - base.left) / u, y: (box.top - base.top) / u, width: box.width / u, height: box.height / u },
      };
    }
    api.go(target, { instant: handoff });
  };
  root.start = () => {
    if (started || !alive) return; started = true;
    if (api.reduced() || api.state.trackReady) { settle(); return; }
    run();
  };
  // Coming from the deck, the card starts gliding in the first frame, during
  // the page cross-fade, so there is no pause between the two pages.
  if ((fromTop !== null || entering) && !api.reduced()) requestAnimationFrame(() => { if (alive && root.isConnected) root.start(); });
  root.finish = settle;
  root.cleanup = () => { alive = false; stop(); next.onclick = null; };
  return root;
}
