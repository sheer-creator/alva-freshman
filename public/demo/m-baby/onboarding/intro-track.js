import { node, escapeHTML, heading, topbar } from './ui.js';
import { renderThesisContent, renderBookmarkPage } from './cards.js?v=9';
import { analyzingCard, ANALYSIS_TASKS, signalCard } from './intro.js?v=12';
import { SOURCE_AUTHORS } from '../thesis-demo-state.js?v=5';

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
  const fromFollowed = api.data.theses.filter(thesis => following.includes(SOURCE_AUTHORS[thesis.id]));
  const pool = fromFollowed.length ? fromFollowed : api.data.theses;
  let root;
  root = renderBookmarkPage(api, {
    mode: 'pick', ariaLabel: 'Bookmark theses', copy: api.data.bookmarkCopy,
    back: flow.prev('pick'), next: 'track',
    candidates: fromFollowed.length ? fromFollowed : null,
    async onNext() {
      api.state.trackedId = [...api.state.bookmarked].at(-1);
      await root.bringToFront(api.state.trackedId);
      // Track starts its card where the deck's front card stood.
      const front = root.querySelector('.front-card'), base = root.getBoundingClientRect();
      const unit = base.width / root.clientWidth || 1;
      if (front) api.state.trackFromTop = (front.getBoundingClientRect().top - base.top) / unit;
      api.persist();
    },
  });
  const authors = [];
  for (const thesis of pool) if (!authors.some(entry => entry.author === thesis.author)) authors.push(thesis);
  const row = node('div', 'pick-sources');
  row.innerHTML = authors.map(entry => `<span class="ticker pick-source" data-author="${escapeHTML(entry.author)}" data-person="${escapeHTML(SOURCE_AUTHORS[entry.id] || '')}"><img class="ticker-logo pick-source-avatar" src="${escapeHTML(api.asset(entry.avatar))}" alt="" draggable="false"><span>${escapeHTML(entry.author.split(' ')[0])}</span></span>`).join('');
  root.querySelector('.intro-heading').after(row);
  const deck = root.querySelector('.bookmark-deck');
  const key = following.slice().sort().join(',') || '*';
  const reveal = api.state.pickRevealedFor !== key && !api.reduced();
  const chips = [...row.children];
  const unit = () => root.getBoundingClientRect().width / root.clientWidth || 1;
  // The followed people's avatars arrive from where they were on the People page.
  // They are put at those positions before the first paint, then travel.
  const from = reveal ? api.state.peopleFrom || {} : {};
  if (reveal) {
    root.classList.add('is-loading');
    requestAnimationFrame(() => {
      if (!root.isConnected) return;
      const base = root.getBoundingClientRect(), u = unit();
      for (const chip of chips) {
        const start = from[chip.dataset.person], img = chip.querySelector('img');
        if (!start) { chip.style.opacity = '0'; continue; }
        const r = img.getBoundingClientRect();
        const dx = start.x + start.size / 2 - ((r.left - base.left) / u + r.width / u / 2);
        const dy = start.y + start.size / 2 - ((r.top - base.top) / u + r.height / u / 2);
        img.style.transform = `translate(${dx}px, ${dy}px) scale(${start.size / (r.width / u)})`;
        chip.classList.add('is-travelling');
      }
    });
  }
  root.start = async () => {
    if (!reveal) return;
    // 1. Avatars travel into the row; the row's chip surfaces fade in behind them.
    chips.forEach((chip, index) => {
      const img = chip.querySelector('img');
      if (chip.style.opacity === '0') {
        chip.style.opacity = '';
        chip.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: index * 40, easing: EASE, fill: 'backwards' });
        return;
      }
      const startTransform = img.style.transform; img.style.transform = '';
      img.animate([{ transform: startTransform }, { transform: 'none' }], { duration: 620, delay: index * 40, easing: EASE, fill: 'backwards' });
      setTimeout(() => chip.classList.remove('is-travelling'), 420 + index * 40);
    });
    await sleep(700);
    if (!root.isConnected) return;
    // 2. The deck starts empty. Cards are produced one at a time by a person in
    //    the row (that person gives a light bounce) and stack up; the front card
    //    lands last, on top.
    root.classList.remove('is-loading');
    const order = { previous: 0, next: 1, front: 2 };
    const cards = [...deck.querySelectorAll('.deck-card')]
      .sort((a, b) => (order[a.dataset.deckPosition] ?? 0) - (order[b.dataset.deckPosition] ?? 0));
    cards.forEach(card => { card.style.visibility = 'hidden'; });
    for (const card of cards) {
      if (!root.isConnected) return;
      const thesis = api.data.theses.find(item => item.id === card.dataset.thesis);
      const chip = chips.find(entry => entry.dataset.author === thesis?.author) || chips[0];
      const img = chip.querySelector('img');
      img.animate([{ transform: 'none' }, { transform: 'translateY(-3px) scale(1.18)' }, { transform: 'none' }], { duration: 320, easing: EASE });
      const a = img.getBoundingClientRect(), b = card.getBoundingClientRect(), u = unit();
      const dx = (a.left + a.width / 2 - (b.left + b.width / 2)) / u;
      const dy = (a.top + a.height / 2 - b.top) / u;
      const final = getComputedStyle(card).transform;
      card.style.visibility = '';
      card.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(.06)`, opacity: 0 },
        { opacity: 1, offset: .25 },
        { transform: final === 'none' ? 'none' : final, opacity: 1 },
      ], { duration: 560, easing: EASE });
      await sleep(260);
    }
    await sleep(300);
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
  stack.append(card, column); viewport.append(stack);
  // First frame: the card sits exactly where the deck's front card was, so the
  // page cross-fade shows one card standing still. (Viewport top padding 56 +
  // stack top padding 12.)
  const fromTop = Number.isFinite(api.state.trackFromTop) && !api.state.trackReady ? api.state.trackFromTop : null;
  if (fromTop !== null) card.style.marginTop = `${fromTop - 68}px`;
  const panel = node('div', 'track-panel');
  const header = heading(COPY[0].title, COPY[0].description);
  if (fromTop !== null) header.style.opacity = '0';
  const footer = node('footer', 'page-footer track-footer');
  const next = node('button', 'btn btn-primary', 'Next'); next.type = 'button'; next.disabled = true;
  footer.append(next); panel.append(header, footer);
  root.append(topbar(api, () => api.go(flow.prev('track'))), viewport, panel);

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
    if (withButton) { next.disabled = false; root.classList.add('track-can-continue'); }
    if (api.reduced()) { apply(); return; }
    // The outgoing heading lifts away while the new one rises into the same place.
    const old = header.cloneNode(true);
    old.classList.add('track-heading-out'); old.setAttribute('aria-hidden', 'true');
    old.style.top = `${header.offsetTop}px`;
    panel.append(old);
    apply();
    const motions = [
      play(old, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-14px)' }], 360, { fill: 'forwards' }).then(() => old.remove()),
      play(header, [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], 640, { delay: 140, fill: 'backwards' }),
    ];
    if (withButton) motions.push(play(next, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], 640, { delay: 240, fill: 'backwards' }));
    await Promise.all(motions);
  }
  function addAnalysis() {
    if (analysis) return;
    analysis = analyzingCard(api);
    reveal = node('div', 'track-analysis-reveal'); reveal.append(analysis);
    card.after(reveal);
  }
  function addSignal(index) {
    const signal = signalCard(signals[index], api); signal.dataset.signalId = signals[index].id;
    column.append(signal); return signal;
  }
  // The card rises until only its lower part shows; the list does not move after that.
  const parkTarget = () => Math.max(0, card.offsetHeight - 168);
  function reserveScroll(target) { stack.style.minHeight = `${viewport.clientHeight + target}px`; }
  function settle() {
    stop(); started = true;
    card.style.marginTop = ''; header.style.opacity = '';
    if (!column.children.length) signals.forEach((_, index) => addSignal(index));
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
    const glide = play(card, [{ transform: `translateY(${startTop - restTop}px)` }, { transform: 'none' }], 820);
    const rise = header.style.opacity === '0'
      ? play(header, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], 720, { delay: 320, fill: 'backwards' }).then(() => { header.style.opacity = ''; })
      : Promise.resolve();
    header.style.opacity = '';
    await Promise.all([glide, rise]);
    if (!valid(token)) return;
    // 2. The analysis card unfolds beneath it and works for a moment.
    await wait(120); if (!valid(token)) return;
    addAnalysis();
    const height = reveal.offsetHeight;
    await play(reveal, [{ height: '0px', opacity: 0, marginTop: '-12px' }, { height: `${height}px`, opacity: 1, marginTop: '0px' }], 520);
    if (!valid(token)) return;
    updateTasks(token);
    await wait(2600); if (!valid(token)) return;
    typing = false;
    // 3. Signals come out below one by one; nothing above moves.
    for (let index = 0; index < signals.length; index++) {
      const signal = addSignal(index);
      // Signals stream out quickly, overlapping; nothing above moves.
      play(signal, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], 360);
      if (index < signals.length - 1) { await wait(110); if (!valid(token)) return; }
    }
    // 4. The analysis card folds away, then the heading changes with Next.
    await wait(520); if (!valid(token)) return;
    const folded = reveal.offsetHeight;
    await play(reveal, [{ height: `${folded}px`, opacity: 1, marginTop: '0px' }, { height: '0px', opacity: 0, marginTop: '-12px' }], 480);
    if (!valid(token)) return;
    reveal.remove(); analysis = null; reveal = null;
    await setHeading(COPY[2], true);
    api.state.trackReady = true; api.persist();
  }
  next.onclick = () => { if (!alive || next.disabled) return; stop(); api.state.introComplete = true; api.persist(); api.go(flow.next('track')); };
  root.start = () => {
    if (started || !alive) return; started = true;
    if (api.reduced() || api.state.trackReady) { settle(); return; }
    run();
  };
  root.finish = settle;
  root.cleanup = () => { alive = false; stop(); next.onclick = null; };
  return root;
}
