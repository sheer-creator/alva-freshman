import { node, escapeHTML, heading, topbar } from './ui.js';
import { renderThesisContent } from './cards.js?v=10';
import { renderSwipePage } from './swipe-deck.js?v=6';
import { analyzingCard, ANALYSIS_TASKS, signalCard } from './intro.js?v=13';
import { SOURCE_AUTHORS } from '../thesis-demo-state.js?v=8';

// Track variant: after following people, the user bookmarks theses from them
// on the existing deck; the last bookmarked card then stays on screen while Alva
// analyzes it. Motion here uses a longer ease-out (onboarding narrative, not
// product UI state feedback).
// Copy is the demo's existing onboarding copy (content.json introCopy / bookmarkCopy
// and the Figma guided headings); nothing new is coined for this variant.
const GUIDED_SIGNALS = { title: 'Signals, in real time.', description: 'Alva continuously delivers the latest signals relevant to each thesis.' };
const copyFor = api => {
  const intro = api.data.introCopy || {};
  return [
    intro.analyzing || { title: 'Alva analyzes each thesis.', description: 'Alva finds the latest signals for each thesis and analyzes what they mean for its direction.' },
    intro.signals || { title: 'Track what matters.', description: 'Follow the signals that support or challenge each thesis as the story develops.' },
    GUIDED_SIGNALS,
  ];
};
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
      : `<div class="pick-collect-avatars">${people.map(entry => `<img src="${escapeHTML(api.asset(entry.avatar))}" alt="" draggable="false" data-person="${escapeHTML(SOURCE_AUTHORS[entry.id] || '')}">`).join('')}</div><p>Collecting theses based on your picks…</p>`);
    overlay.setAttribute('role', 'status');
    root.append(overlay); root.classList.add('is-collecting');
    const avatars = [...overlay.querySelectorAll('img, .pick-trend')];
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
      // Take turns at the front.
      const people = avatars.filter(img => !img.classList.contains('pick-trend'));
      const turns = people.length ? Math.max(4, people.length * 2) : 5;
      for (let turn = 0; turn < turns && root.isConnected; turn++) {
        if (!people.length) { await sleep(280); continue; }
        const img = people[turn % people.length];
        avatars.forEach(other => { other.style.zIndex = String(other === img ? avatars.length + 1 : Number(other.style.zIndex) || 1); });
        img.animate([{ transform: 'none' }, { transform: 'translateY(-4px) scale(1.16)', offset: .45 }, { transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.3,0,.3,1)' });
        await sleep(280);
      }
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
    // The old heading and the new one cross at the same time: a copy of the
    // old one stays where it was and lifts away while the new heading (and
    // Next) rise in, so there is no gap between them.
    const panel = header.parentElement, before = header.getBoundingClientRect();
    const ghost = header.cloneNode(true); ghost.classList.add('track-heading-out'); ghost.setAttribute('aria-hidden', 'true');
    apply(); reveal();
    const base = panel.getBoundingClientRect(), unit = base.width / panel.offsetWidth || 1;
    Object.assign(ghost.style, { top: `${(before.top - base.top) / unit}px`, width: `${before.width / unit}px`, left: `${(before.left - base.left) / unit}px`, right: 'auto', margin: '0' });
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
    card.after(reveal);
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
    if (column.children.length <= 1) signals.forEach((_, index) => addSignal(index));
    column.classList.add('has-signals');
    if (reveal) reveal.remove(); analysis = null; reveal = null;
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
    // 2. The analysis card unfolds beneath it and works for a moment.
    addAnalysis();
    const height = reveal.offsetHeight;
    await play(reveal, [{ height: '0px', opacity: 0, marginTop: '-12px' }, { height: `${height}px`, opacity: 1, marginTop: '0px' }], 520);
    if (!valid(token)) return;
    updateTasks(token);
    await wait(1500); if (!valid(token)) return;
    typing = false;
    // 3. Signals arrive one by one, newest on top: each slot opens under the
    // title and pushes the earlier ones down. The list ends in data order.
    for (let step = 0; step < signals.length; step++) {
      const index = signals.length - 1 - step;
      const signal = addSignal(index, true);
      if (step === 0) { column.classList.add('has-signals'); play(signalsTitle, [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'none' }], 240); }
      // The slot opens downward from under the title (height grows from 0)
      // and the content is squeezed out of its top edge; nothing crosses the title.
      const height = signal.offsetHeight, cs = getComputedStyle(signal);
      play(signal, [
        { height: '0px', paddingTop: '0px', paddingBottom: '0px', marginBottom: '-8px', opacity: 0 },
        { opacity: 1, offset: .25 },
        { height: `${height}px`, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, marginBottom: '0px', opacity: 1 },
      ], 480, { easing: 'cubic-bezier(.3,.7,.2,1)' });
      [...signal.children].forEach(child => play(child, [{ transform: `translateY(-${Math.round(height * .45)}px)` }, { transform: 'none' }], 480, { easing: 'cubic-bezier(.3,.7,.2,1)' }));
      // Uneven gaps (360–720ms), like signals coming in live.
      if (step < signals.length - 1) { await wait(360 + Math.round(Math.random() * 360)); if (!valid(token)) return; }
    }
    // 4. The analysis card folds away while the heading changes and Next comes in.
    await wait(360); if (!valid(token)) return;
    const folded = reveal.offsetHeight;
    // Removed the moment the fold ends, so it never shows again for a frame.
    const folding = reveal;
    const fold = play(folding, [{ height: `${folded}px`, opacity: 1, marginTop: '0px' }, { height: '0px', opacity: 0, marginTop: '-12px' }], 480)
      .then(() => { folding.remove(); if (reveal === folding) { analysis = null; reveal = null; } });
    folding.style.height = '0px'; folding.style.opacity = '0';
    await Promise.all([fold, setHeading(COPY[2], true)]);
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
