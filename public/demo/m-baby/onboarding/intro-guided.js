import { node, escapeHTML } from './ui.js';
import { renderThesisContent } from './cards.js?v=6';
import { analyzingCard, ANALYSIS_TASKS, signalCard } from './intro.js?v=11';
import { springSamples } from './spatial-cards.js?v=2';

const COPY = [
  { title: 'This is a typical thesis.', description: 'A viewpoint on the market, with related tickers and supporting context.' },
  { title: 'Alva analyzes each thesis.', description: 'Alva analyzes global information\nrelated to each thesis.' },
  { title: 'Signals, in real time.', description: 'Alva continuously delivers the latest signals relevant to each thesis.' },
];

// This optional introduction explains one thesis in three automatic stages.
export function renderGuidedIntroPage(api) {
  const root = node('section', 'page guided-intro');
  root.setAttribute('aria-label', 'Explore a thesis and its signals');
  const header = node('header', 'guide-heading');
  const viewport = node('div', 'guide-viewport');
  const track = node('div', 'guide-track');
  const pair = node('div', 'guide-pair');
  const thesis = node('article', 'guide-thesis');
  const sourceThesis = api.data.theses.find(item => item.author === 'Satya Nadella') || api.data.theses[0];
  // Exact chart exports from the new Figma reference, including its horizontal overflow.
  const example = { ...sourceThesis, charts: ['12807:289176', '12807:289177', '12807:289178'] };
  thesis.append(renderThesisContent(example, api));
  pair.append(thesis); track.append(pair); viewport.append(track);
  const footer = node('footer', 'guide-footer');
  const next = node('button', 'btn btn-primary', 'Got it');
  next.type = 'button'; next.disabled = true; footer.append(next);
  root.append(header, viewport, footer);
  const signalSource = api.data.notificationPreview?.signals?.length
    ? api.data.notificationPreview.signals : api.data.signals || [];
  const order = ['SemiAnalysis', 'Matt Bryson', 'Riot Platforms'];
  const signals = [...signalSource].sort((a, b) => order.indexOf(a.source) - order.indexOf(b.source));
  let step = Math.max(1, Math.min(3, Math.trunc(Number(api.state.guidedIntroStep) || 1)));
  let alive = true, started = false, ready = false, epoch = 0;
  let staticMotion = false;
  let analysis, reveal, column, taskIndex = 0, touched = false;
  let measuredWidth = 0, measuredHeight = 0;
  let signalProgress = 0;
  const animations = new Set(), pausedAnimations = new Set(), timers = new Set();
  const valid = token => alive && root.isConnected && token === epoch;
  const unit = () => root.getBoundingClientRect().width / root.clientWidth || 1;
  const rememberSize = () => { measuredWidth = root.clientWidth; measuredHeight = root.clientHeight; };
  const anchorTop = () => pair.getBoundingClientRect().top / unit();

  function schedule(entry) {
    if (document.hidden) return;
    entry.started = performance.now();
    entry.timer = setTimeout(() => { timers.delete(entry); entry.resolve(); }, entry.remaining);
  }
  const wait = milliseconds => new Promise(resolve => {
    const entry = { resolve, remaining: milliseconds, started: null, timer: null };
    timers.add(entry); schedule(entry);
  });
  function stop() {
    epoch++;
    animations.forEach(animation => animation.cancel()); animations.clear(); pausedAnimations.clear();
    timers.forEach(entry => { clearTimeout(entry.timer); entry.resolve(); }); timers.clear();
  }
  function play(element, frames, duration, options = {}) {
    const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.4,0,.2,1)', ...options });
    animations.add(animation);
    if (document.hidden) { animation.pause(); pausedAnimations.add(animation); }
    return animation.finished.catch(() => {}).finally(() => {
      animation.cancel(); animations.delete(animation); pausedAnimations.delete(animation);
    });
  }
  const spring = (element, values, duration, config = {}) => play(element,
    springSamples(duration, config).map(({ offset, value }) => ({ offset, ...values(value) })),
    duration, { easing: 'linear' });
  const moveTrack = (from, duration = 420) => {
    const delta = from - anchorTop();
    return spring(track, value => ({ transform: `translateY(${delta * (1 - value)}px)` }), duration,
      { stiffness: 340, damping: 30 });
  };

  function setTitle() {
    root.dataset.step = String(step);
    const copy = COPY[step - 1];
    header.innerHTML = `<div class="guide-heading-copy"><h1>${escapeHTML(copy.title)}</h1><p>${escapeHTML(copy.description)}</p></div>`;
  }
  function alignTrack(progress = signalProgress) {
    if (step === 1) { track.style.marginTop = '0px'; track.style.minHeight = 'calc(100% - 24px)'; return; }
    track.style.minHeight = '0px';
    // Match the edited 393px reference: lift the shared visual centre 12px;
    // smaller devices retain the analysis inside the visible stage.
    const analysisTop = Math.max(12, Math.min(viewport.clientHeight - 124, (viewport.clientHeight - 112) / 2 + 12.5));
    const analysisOffset = analysisTop - thesis.offsetHeight - 12;
    const signalOffset = -(pair.offsetHeight + 8);
    track.style.marginTop = `${step === 3 ? analysisOffset + (signalOffset - analysisOffset) * progress : analysisOffset}px`;
  }
  function positionViewport(shown) {
    // The hidden heading/footer occupy no space. Their actual final sizes only
    // constrain the scroll viewport when the explanatory text is introduced.
    viewport.style.top = shown ? `${56 + header.offsetHeight + 24}px` : '0px';
    viewport.style.bottom = root.classList.contains('guide-can-continue') ? `${footer.offsetHeight || 80}px` : '0px';
    alignTrack();
  }
  function setChrome(shown) {
    root.classList.toggle('guide-explained', shown);
    header.setAttribute('aria-hidden', String(!shown));
    footer.setAttribute('aria-hidden', String(!root.classList.contains('guide-can-continue')));
    positionViewport(shown);
  }
  function addAnalysis() {
    if (analysis) return;
    analysis = analyzingCard(api);
    reveal = node('div', 'guide-analysis-reveal'); reveal.append(analysis);
    pair.classList.add('guide-has-analysis'); pair.append(reveal);
  }
  function addSignal(index) {
    if (!column) {
      column = node('div', 'guide-signals');
      column.setAttribute('aria-label', 'Signals for this thesis'); track.append(column);
    }
    if (column.children.length > index) return column.children[index];
    const card = signalCard(signals[index], api); card.dataset.signalId = signals[index].id;
    column.append(card); return card;
  }
  function completeContent() {
    if (step >= 2) addAnalysis();
    if (step === 3) { signals.forEach((_, index) => addSignal(index)); signalProgress = 1; }
  }
  function resetAnalysisLabel() {
    if (!analysis) return;
    const label = analysis.querySelector('.analysis-task');
    label.style.width = 'auto';
    const width = Math.max(...ANALYSIS_TASKS.map(text => { label.textContent = text; return label.offsetWidth; }));
    label.textContent = ANALYSIS_TASKS[taskIndex]; label.style.width = `${width}px`;
    analysis.classList.toggle('is-analyzing', !api.reduced() && !staticMotion);
  }
  async function updateTasks(token) {
    resetAnalysisLabel();
    const label = analysis.querySelector('.analysis-task');
    async function type(text, deleting, duration) {
      const letters = Array.from(text);
      for (let index = 1; index <= letters.length; index++) {
        await wait(duration / letters.length);
        if (!valid(token) || api.reduced()) return false;
        label.textContent = letters.slice(0, deleting ? letters.length - index : index).join('');
      }
      return true;
    }
    while (valid(token) && !api.reduced() && !staticMotion) {
      await wait(2600 + Math.random() * 1400);
      if (!valid(token) || api.reduced()) return;
      if (!await type(label.textContent, true, 220)) return;
      await wait(70); if (!valid(token) || api.reduced()) return;
      taskIndex = (taskIndex + 1) % ANALYSIS_TASKS.length;
      if (!await type(ANALYSIS_TASKS[taskIndex], false, 340)) return;
    }
  }
  function markReady() {
    ready = true; next.disabled = false;
    root.dataset.phase = 'ready';
    api.state.guidedIntroReadyStep = step; api.persist();
  }
  async function showTitle(token) {
    root.dataset.phase = 'title';
    const previous = header.querySelector('.guide-heading-copy'), visible = root.classList.contains('guide-explained');
    setTitle();
    root.classList.add('guide-explained'); header.setAttribute('aria-hidden', 'false');
    if (api.reduced() || staticMotion) return;
    const incoming = header.querySelector('.guide-heading-copy'), distance = root.clientWidth;
    const motions = [play(incoming, [{ transform: `translateX(${distance}px)` }, { transform: 'translateX(0)' }], 420)];
    if (previous && visible) {
      previous.classList.add('guide-title-outgoing'); previous.setAttribute('aria-hidden', 'true'); header.prepend(previous);
      motions.push(play(previous, [{ transform: 'translateX(0)' }, { transform: `translateX(${-distance}px)` }], 420).then(() => { if (valid(token)) previous.remove(); }));
    }
    await Promise.all(motions);
    if (!valid(token)) return;
  }
  async function allowContinue(token) {
    const before = anchorTop(); root.classList.add('guide-can-continue'); setChrome(true);
    if (!api.reduced() && !staticMotion) await Promise.all([moveTrack(before, 280), play(next, [{ opacity: 0 }, { opacity: 1 }], 160)]);
    if (valid(token)) markReady();
  }
  function settleCurrent() {
    if (!alive || !root.isConnected) return;
    stop(); started = true; staticMotion = api.reduced(); setTitle(); completeContent(); resetAnalysisLabel();
    thesis.style.visibility = 'visible'; setChrome(true); rememberSize();
    root.dataset.phase = 'reading';
    api.state.guidedIntroStep = step; api.state.guidedIntroReadyStep = step; api.persist();
    const token = epoch;
    if (analysis && !staticMotion) updateTasks(token);
    if (step === 3) allowContinue(token);
    else continueAfterReading(token, 3200);
  }
  async function continueAfterReading(token, duration) {
    root.dataset.phase = 'reading';
    await wait(duration); if (!valid(token)) return;
    if (step < 3) enter(step + 1);
    else await allowContinue(token);
  }
  async function enter(target) {
    stop(); const token = epoch; ready = false; next.disabled = true; touched = false;
    step = target; if (step === 3) signalProgress = 0;
    api.state.guidedIntroStep = step; api.state.guidedIntroReadyStep = 0; api.persist();
    root.classList.remove('guide-can-continue'); footer.setAttribute('aria-hidden', 'true'); rememberSize();
    await showTitle(token); if (!valid(token)) return;
    const before = anchorTop(); positionViewport(true); root.dataset.phase = 'content';
    if (api.reduced() || staticMotion) {
      completeContent(); thesis.style.visibility = 'visible'; resetAnalysisLabel();
      positionViewport(true);
      await continueAfterReading(token, step === 3 ? 600 : 3200); return;
    }
    if (step === 1) {
      thesis.style.visibility = 'visible';
      await spring(pair, value => ({ transform: `scale(${.96 + .04 * value})`, opacity: Math.min(1, value) }), 560);
    } else if (step === 2) {
      addAnalysis(); alignTrack(); const layoutMove = moveTrack(before, 620);
      await Promise.all([layoutMove, spring(reveal, value => ({ height: `${Math.max(0, 112 * value)}px` }), 620, { stiffness: 250, damping: 20 })]);
    } else {
      addAnalysis();
      for (let index = 0; index < signals.length; index++) {
        const oldTop = anchorTop(), card = addSignal(index);
        signalProgress = (index + 1) / signals.length; alignTrack();
        await Promise.all([moveTrack(oldTop, 380), play(card, [{ opacity: 0 }, { opacity: 1 }], 200)]);
        if (!valid(token)) return;
        if (index < signals.length - 1) { await wait(220); if (!valid(token)) return; }
      }
    }
    if (!valid(token)) return;
    if (analysis) updateTasks(token);
    api.state.guidedIntroReadyStep = step; api.persist();
    await continueAfterReading(token, step === 3 ? 600 : 3200);
  }
  next.onclick = () => {
    if (!alive || !ready || next.disabled) return;
    ready = false; next.disabled = true;
    api.state.introComplete = true; api.persist(); api.go('people');
  };
  const onReading = () => { touched = true; };
  viewport.addEventListener('pointerdown', onReading);
  viewport.addEventListener('wheel', onReading, { passive: true });
  viewport.addEventListener('keydown', onReading);
  function onVisibility() {
    root.classList.toggle('stream-paused', document.hidden);
    if (document.hidden) {
      animations.forEach(animation => { if (animation.playState === 'running') { animation.pause(); pausedAnimations.add(animation); } });
      timers.forEach(entry => {
        clearTimeout(entry.timer);
        if (entry.started !== null) entry.remaining = Math.max(0, entry.remaining - (performance.now() - entry.started));
        entry.started = null;
      });
    } else {
      pausedAnimations.forEach(animation => { if (animations.has(animation)) animation.play(); }); pausedAnimations.clear();
      timers.forEach(schedule);
    }
  }
  document.addEventListener('visibilitychange', onVisibility);
  const observer = new ResizeObserver(() => {
    if (!started || !alive || !root.isConnected) return;
    if (root.clientWidth === measuredWidth && root.clientHeight === measuredHeight) return;
    // A changed device size completes this step, never advances the tutorial.
    settleCurrent();
  });
  observer.observe(root);
  root.start = () => {
    if (started || !alive) return; started = true; rememberSize(); onVisibility();
    if (step >= 2) thesis.style.visibility = 'visible';
    if (step === 3) addAnalysis();
    staticMotion = api.reduced();
    if (api.state.guidedIntroReadyStep === step) settleCurrent();
    else enter(step);
  };
  root.finish = settleCurrent;
  root.cleanup = () => {
    if (!alive) return; alive = false; stop(); next.onclick = null; observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    viewport.removeEventListener('pointerdown', onReading); viewport.removeEventListener('wheel', onReading); viewport.removeEventListener('keydown', onReading);
  };
  thesis.style.visibility = 'hidden'; setTitle(); setChrome(false);
  return root;
}
