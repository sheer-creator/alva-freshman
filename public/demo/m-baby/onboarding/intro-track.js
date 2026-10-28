import { node, escapeHTML, heading } from './ui.js';
import { renderThesisContent, renderBookmarkPage, tickerRow } from './cards.js?v=7';
import { analyzingCard, ANALYSIS_TASKS, signalCard } from './intro.js?v=11';
import { springSamples } from './spatial-cards.js?v=2';

// Track variant: the user picks one thesis from the deck (the Bookmark page
// reused with Track copy) and then watches Alva analyze that same card. The
// card stays pinned while signals arrive beneath it; Continue appears with the
// first signal. Durations follow docs/motion-spec.md (≤280ms per movement;
// the 1.4s skeleton loop is the only longer rhythm).
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

export function renderPickPage(api) {
  api.state.bookmarked ||= new Set();
  const flow = api.flow;
  return renderBookmarkPage(api, {
    mode: 'pick', ariaLabel: 'Bookmark a thesis', copy: api.data.bookmarkCopy,
    back: flow.prev('pick'), footer: false,
    onSave(id) { api.state.trackedId = id; api.persist(); api.go('track'); },
  });
}

export function renderMorePage(api) {
  const flow = api.flow;
  return renderBookmarkPage(api, {
    mode: 'more', ariaLabel: 'Bookmark more theses', copy: api.data.bookmarkCopy,
    back: flow.prev('more'), next: flow.next('more'), shelf: true, target: 3, allowEmpty: true,
  });
}

export function renderTrackPage(api) {
  const flow = api.flow;
  const item = api.data.theses.find(thesis => thesis.id === api.state.trackedId) || api.data.theses[0];
  const signals = trackedSignals(item.id, api);
  const root = node('section', 'page track-page');
  root.setAttribute('aria-label', 'Alva tracks this thesis');
  const COPY = copyFor(api);
  const header = heading(COPY[0].title, COPY[0].description);
  const viewport = node('div', 'track-viewport');
  const stack = node('div', 'track-stack');
  const anchor = node('article', 'track-anchor deck-card');
  anchor.append(renderThesisContent(item, api));
  // Reuses the Notifications page's tracking-status row rather than a new badge.
  const logo = api.asset('Alva / Onboarding source') || new URL('./assets/alva-source-12646-154584.svg', import.meta.url).href;
  const status = node('div', 'setup-tracking-status track-status', `<img class="setup-tracking-logo" src="${escapeHTML(logo)}" alt="" draggable="false"><span>Tracking signals</span></div>`);
  anchor.append(status);
  const expand = node('button', 'track-expand', 'Show full thesis'); expand.type = 'button';
  expand.onclick = () => { const open = anchor.classList.toggle('is-open'); expand.textContent = open ? 'Collapse' : 'Show full thesis'; };
  anchor.append(expand);
  const column = node('div', 'track-signals'); column.setAttribute('aria-label', 'Signals for this thesis');
  stack.append(anchor, column); viewport.append(stack);
  const footer = node('footer', 'page-footer track-footer');
  const next = node('button', 'btn btn-primary', 'Next'); next.type = 'button'; next.disabled = true;
  footer.append(next);
  root.append(header, viewport, footer);

  let alive = true, started = false, epoch = 0, analysis = null, reveal = null, tickers = null, taskIndex = 0;
  const animations = new Set(), timers = new Set();
  const valid = token => alive && root.isConnected && token === epoch;
  const unit = () => root.getBoundingClientRect().width / root.clientWidth || 1;
  const wait = ms => new Promise(resolve => { const timer = setTimeout(() => { timers.delete(timer); resolve(); }, ms); timers.add(timer); });
  function stop() { epoch++; animations.forEach(a => a.cancel()); animations.clear(); timers.forEach(clearTimeout); timers.clear(); }
  function play(element, frames, duration, options = {}) {
    const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.4,0,.2,1)', ...options });
    animations.add(animation);
    return animation.finished.catch(() => {}).finally(() => { animation.cancel(); animations.delete(animation); });
  }
  const spring = (element, values, duration, config = {}) => play(element,
    springSamples(duration, config).map(({ offset, value }) => ({ offset, ...values(value) })), duration, { easing: 'linear' });

  function setHeading(index) {
    const copy = COPY[index]; root.dataset.phase = String(index);
    const h1 = header.querySelector('h1'), p = header.querySelector('p');
    if (api.reduced()) { h1.textContent = copy.title; p.textContent = copy.description; return; }
    play(header, [{ opacity: 1 }, { opacity: 0 }], 120).then(() => {
      if (!alive) return;
      h1.textContent = copy.title; p.textContent = copy.description;
      play(header, [{ opacity: 0 }, { opacity: 1 }], 160);
    });
  }
  function addAnalysis() {
    if (analysis) return;
    analysis = analyzingCard(api);
    reveal = node('div', 'track-analysis-reveal'); reveal.append(analysis);
    anchor.after(reveal);
  }
  function finishAnalysis() {
    if (!analysis) return;
    analysis.classList.remove('is-analyzing');
    analysis.querySelector('.analysis-status strong').textContent = `Tracking · ${signals.length} signals found`;
    analysis.querySelector('.analysis-task').textContent = ANALYSIS_TASKS.at(-1);
    analysis.classList.add('is-settled');
  }
  function addSignal(index) {
    const card = signalCard(signals[index], api); card.dataset.signalId = signals[index].id;
    column.append(card); return card;
  }
  function allowContinue() {
    if (!next.disabled) return;
    next.disabled = false; root.classList.add('track-can-continue');
    api.state.trackReady = true; api.persist();
    if (!api.reduced()) play(next, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], 160);
  }
  function keepLatestVisible(card) {
    const top = card.getBoundingClientRect().top / unit(), bottom = top + card.offsetHeight;
    const limit = viewport.getBoundingClientRect().bottom / unit();
    if (bottom > limit) viewport.scrollBy({ top: bottom - limit + 12, behavior: api.reduced() ? 'auto' : 'smooth' });
  }
  function settle() {
    stop(); started = true;
    anchor.classList.add('is-pinned'); addAnalysis(); addTickers();
    if (!column.children.length) signals.forEach((_, index) => addSignal(index));
    finishAnalysis(); setHeading(2); allowContinue();
    api.state.trackReady = true; api.persist();
  }
  // Typewriter task line, as in the guided intro: the analysis names what it is doing.
  async function updateTasks(token) {
    const label = analysis.querySelector('.analysis-task');
    const type = async (text, deleting, duration) => {
      const letters = Array.from(text);
      for (let i = 1; i <= letters.length; i++) {
        await wait(duration / letters.length); if (!valid(token) || api.reduced()) return false;
        label.textContent = letters.slice(0, deleting ? letters.length - i : i).join('');
      }
      return true;
    };
    while (valid(token) && !api.reduced() && analysis.classList.contains('is-analyzing')) {
      await wait(1100 + Math.random() * 500); if (!valid(token) || !analysis.classList.contains('is-analyzing')) return;
      if (!await type(label.textContent, true, 180)) return;
      taskIndex = (taskIndex + 1) % (ANALYSIS_TASKS.length - 1);
      if (!await type(ANALYSIS_TASKS[taskIndex], false, 260)) return;
    }
  }
  function addTickers() {
    if (!item.tickers?.length || tickers) return null;
    tickers = tickerRow(item.tickers, api, true); tickers.classList.add('track-tickers');
    reveal.after(tickers); return tickers;
  }
  async function run() {
    stop(); const token = epoch;
    // 1. The deck card is already on screen where the Bookmark deck left it. It
    //    lifts to the pinned position and compacts, with a little overshoot.
    const from = anchor.getBoundingClientRect();
    anchor.classList.add('is-pinned');
    const to = anchor.getBoundingClientRect();
    const dy = (from.top - to.top) / unit(), scale = from.width / to.width;
    await spring(anchor, value => ({ transform: `translateY(${dy * (1 - value)}px) scale(${scale + (1 - scale) * value})` }), 280, { stiffness: 380, damping: 22 });
    if (!valid(token)) return;
    // 2. Analysis grows from the anchor's bottom edge; its task line types.
    await wait(120); if (!valid(token)) return;
    addAnalysis(); setHeading(0);
    await spring(reveal, value => ({ transform: `scaleY(${.5 + .5 * value})`, opacity: Math.min(1, value * 1.5) }), 280, { stiffness: 300, damping: 24 });
    if (!valid(token)) return;
    updateTasks(token);
    // 3. The thesis's tickers pop in one by one: these are what Alva is reading for.
    await wait(700); if (!valid(token)) return;
    const row = addTickers();
    if (row) {
      const chips = [...row.children];
      chips.forEach(chip => { chip.style.opacity = '0'; });
      for (const [index, chip] of chips.entries()) {
        spring(chip, value => ({ opacity: Math.min(1, value * 2), transform: `scale(${.6 + .4 * value})` }), 240, { stiffness: 420, damping: 18 });
        if (index < chips.length - 1) { await wait(70); if (!valid(token)) return; }
      }
      chips.forEach(chip => { chip.style.opacity = ''; });
    }
    // 4. Signals arrive one by one beneath the pinned thesis. Next appears with the first.
    await wait(900); if (!valid(token)) return;
    for (let index = 0; index < signals.length; index++) {
      const card = addSignal(index);
      if (index === 0) { setHeading(1); allowContinue(); }
      await spring(card, value => ({ opacity: Math.min(1, value * 1.6), transform: `translateY(${28 * (1 - value)}px)` }), 280, { stiffness: 340, damping: 24 });
      if (!valid(token)) return;
      keepLatestVisible(card);
      if (index < signals.length - 1) { await wait(560); if (!valid(token)) return; }
    }
    finishAnalysis(); setHeading(2);
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
