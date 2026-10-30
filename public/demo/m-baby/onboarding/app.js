import { animate } from './vendor/motion.js';
import { renderSetupPage } from './setup.js?v=46';
import { renderIntroPage } from './intro.js?v=13';
import { renderGuidedIntroPage } from './intro-guided.js?v=4';
import { renderBookmarkPage } from './cards.js?v=10';
import { renderPickPage, renderTrackPage } from './intro-track.js?v=51';
import { renderReadyPage } from './ready.js?v=7';
import { node, escapeHTML } from './ui.js';
import { transitionPages } from './transitions.js?v=11';
import { ONBOARDING_STATE_KEY, GUIDED_ONBOARDING_STATE_KEY, TRACK_ONBOARDING_STATE_KEY, createFreshOnboardingState, clearLegacyOnboardingState, readOnboardingState, persistOnboardingState, resetOnboardingState, createOnboardingHandoff, completeOnboarding } from '../thesis-demo-state.js?v=8';

// Custom-property URLs consumed by the parent stylesheet need an absolute base.
for (const icon of document.querySelectorAll('.system-bar .ic')) {
  const match = /url\(["']?([^"')]+)["']?\)/.exec(icon.style.getPropertyValue('--ic'));
  if (match) icon.style.setProperty('--ic', `url("${new URL(match[1], document.baseURI).href}")`);
}

// Install the shell bridge before asynchronous data/font loading can miss load's message.
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let appearance = 'system';
try {
  const stored = localStorage.getItem('alva-mvp-appearance');
  appearance = ['light', 'dark', 'system'].includes(stored) ? stored : localStorage.getItem('alva-mvp-theme') === 'dark' ? 'dark' : 'system';
} catch { /* The shell's ready handshake also supplies the current preference. */ }
function applyAppearance(value) {
  appearance = ['light', 'dark', 'system'].includes(value) ? value : 'system';
  document.documentElement.dataset.theme = appearance === 'dark' || (appearance === 'system' && systemTheme.matches) ? 'dark' : 'light';
}
addEventListener('message', event => {
  if (event.source === parent && event.origin === location.origin && event.data?.type === 'alva:set-appearance') applyAppearance(event.data.appearance);
});
applyAppearance(appearance);
systemTheme.addEventListener('change', () => applyAppearance(appearance));
if (parent !== window) parent.postMessage({ type: 'alva:prototype-ready' }, location.origin);

const search = new URLSearchParams(location.search);
const guided = search.get('intro') === 'guided';
const trackVariant = search.get('intro') === 'track';
// Track variant: log in, follow people, bookmark theses from the people you
// follow, then the last bookmarked card stays and Alva analyzes it in place;
// notifications, then portfolio, close the flow.
const steps = trackVariant ? ['login', 'people', 'pick', 'track', 'notifications', 'portfolio', 'ready']
  : ['login', 'intro', 'people', 'bookmark', 'notifications', 'portfolio'];
const flow = {
  steps,
  prev: name => { const index = steps.indexOf(name); return index > 0 ? steps[index - 1] : null; },
  next: name => { const index = steps.indexOf(name); return index >= 0 && index < steps.length - 1 ? steps[index + 1] : 'feed'; },
};
const stateKey = trackVariant ? TRACK_ONBOARDING_STATE_KEY : guided ? GUIDED_ONBOARDING_STATE_KEY : ONBOARDING_STATE_KEY;
const renderIntro = guided ? renderGuidedIntroPage : renderIntroPage;
// Each signal presentation owns only its current in-memory choices.
if (!trackVariant) clearLegacyOnboardingState(stateKey);
let state = trackVariant ? readOnboardingState(stateKey) : createFreshOnboardingState();
const restartToken = search.get('restart');
if (trackVariant && restartToken && state.restartToken !== restartToken) {
  resetOnboardingState(restartToken, stateKey);
  state = readOnboardingState(stateKey);
}
if (trackVariant) delete state.sharedQuestion;
if (guided) document.title = 'onboarding-signal · Guided';
if (trackVariant) document.title = 'onboarding-signal · Track';
const app = document.querySelector('#app');
const overlays = document.querySelector('#overlays');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const requested = location.hash.slice(1);
const initialPage = !trackVariant ? 'login' : steps.includes(requested) ? requested : steps.includes(state.page) ? state.page : steps[0];
const splash = document.querySelector('#startupSplash');
// Original and Guided retain their Splash on every entry. Track keeps its
// existing resume policy and only reveals Splash at the start of its order.
if (initialPage !== steps[0]) { splash.remove(); app.inert = false; }
const [manifest, data] = await Promise.all(['assets/manifest.json?v=6', 'content.json?v=4'].map(async url => {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Could not load ${url}`);
  return response.json();
})).catch(error => {
  splash.remove(); app.inert = false;
  const failure = node('section', 'onboarding-load-error', '<p>Unable to load this demo.</p>');
  const retry = node('button', 'btn btn-secondary', 'Try again');
  retry.type = 'button'; retry.onclick = () => location.reload();
  failure.append(retry); app.replaceChildren(failure);
  throw error;
});
await document.fonts.ready;
let page, routeGeneration = 0, routeTransition, toastTimer;
const persist = () => { if (trackVariant) persistOnboardingState(state, stateKey); };
// Track: the deck draws from the full thesis pool (theses + feed), so it
// always has at least eight cards; followed people's theses come first.
if (trackVariant) for (const item of data.feed || []) if (!data.theses.some(thesis => thesis.id === item.id)) data.theses.push(item);
const api = { data, state, variant: trackVariant ? 'track' : guided ? 'guided' : 'original', flow, asset: id => manifest[id] || '', persist, reduced: () => reducedMotion.matches, go, toast, sheet };

function toast(message) {
  persist();
  const target = document.querySelector('#toast');
  target.textContent = message; target.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => target.classList.remove('show'), 2200);
}

function sheet(config, content) {
  if (typeof config === 'string') config = { title: config, body: content, actions: [{ label: 'Done', primary: true }] };
  const previousFocus = document.activeElement;
  overlays.replaceChildren();
  const scrim = node('div', 'sheet-scrim'), card = node('section', 'sheet-card');
  card.setAttribute('role', 'dialog'); card.setAttribute('aria-modal', 'true');
  const permission = /Would Like to Send You Notifications/.test(config.title);
  if (permission) { scrim.classList.add('permission-scrim'); card.classList.add('permission-card'); }
  card.innerHTML = `<h2 id="onboardingDialogTitle">${escapeHTML(config.title)}</h2>`;
  card.setAttribute('aria-labelledby', 'onboardingDialogTitle');
  const body = node('div', 'sheet-body');
  if (config.body instanceof Node) body.append(config.body); else body.textContent = config.body || '';
  card.append(body);
  const close = () => { overlays.replaceChildren(); persist(); previousFocus?.focus?.({ preventScroll: true }); };
  const closeButton = node('button', 'sheet-close', '×');
  closeButton.type = 'button'; closeButton.setAttribute('aria-label', 'Close'); closeButton.onclick = close;
  card.append(closeButton);
  const actions = node('div', 'sheet-actions');
  for (const action of config.actions || [{ label: 'Done', primary: true }]) {
    const control = node('button', `btn ${action.primary ? 'btn-primary' : 'btn-secondary'}`, escapeHTML(action.label));
    control.type = 'button'; control.onclick = () => { close(); action.onClick?.(); persist(); };
    actions.append(control);
  }
  card.append(actions); scrim.append(card); overlays.append(scrim);
  scrim.onclick = event => { if (event.target === scrim) close(); };
  if (!api.reduced()) {
    animate(scrim, { opacity: [0, 1] }, { duration: .16 });
    if (permission) animate(card, { opacity: [0, 1], scale: [1.035, 1] }, { duration: .2, ease: 'easeOut' });
    else animate(card, { y: [60, 0] }, { type: 'spring', duration: .35, bounce: 0 });
  }
  actions.querySelector('button')?.focus({ preventScroll: true });
  card.onkeydown = event => {
    if (event.key === 'Escape') { event.stopPropagation(); close(); }
    if (event.key !== 'Tab') return;
    const controls = [...card.querySelectorAll('button,a,input')].filter(control => control.offsetWidth > 0);
    const index = controls.indexOf(document.activeElement);
    if ((event.shiftKey && index === 0) || (!event.shiftKey && index === controls.length - 1)) {
      event.preventDefault(); controls[event.shiftKey ? controls.length - 1 : 0]?.focus();
    }
  };
}

function openExistingFeed() {
  const onboarding = trackVariant ? null : createOnboardingHandoff(state, data, api.asset, location.href);
  const completed = trackVariant ? completeOnboarding(state, data, api.asset, location.href, stateKey) : onboarding.posts.length > 0;
  if (!completed) {
    toast('Bookmark a thesis to continue.'); go(trackVariant ? 'pick' : 'bookmark'); return;
  }
  // The shell keeps this page available if For You fails to load. Clean up on
  // pagehide after a successful handoff so retry controls remain usable.
  if (window.parent !== window) window.parent.postMessage({ type: 'alva:open-prototype', slug: 'thesis-motion', iris: typeof window.__alvaReadyIrisOut === 'function', ...(onboarding ? { onboarding } : {}) }, location.origin);
  else location.assign(new URL('../index.html#/thesis-motion', location.href));
}

function startSplash() {
  const splash = document.querySelector('#startupSplash');
  let finished = false, fallback;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(fallback);
    splash.removeEventListener('animationend', onEnd);
    reducedMotion.removeEventListener('change', onMotionChange);
    removeEventListener('pagehide', finish);
    splash.remove();
    app.inert = false;
  };
  const onEnd = event => {
    if (event.target === splash && event.animationName === 'alva-splash-reveal') finish();
  };
  const onMotionChange = () => { if (reducedMotion.matches) finish(); };
  if (reducedMotion.matches) { finish(); return; }
  splash.addEventListener('animationend', onEnd);
  reducedMotion.addEventListener('change', onMotionChange);
  addEventListener('pagehide', finish, { once: true });
  // A stalled logo must not block entry. Asset loading has its own deadline.
  fallback = setTimeout(finish, 1900);
  Promise.all([...splash.querySelectorAll('img')].map(image => image.decode().catch(() => {}))).then(() => {
    if (finished) return;
    clearTimeout(fallback);
    // Give the original 1s hold + 350ms reveal its full window after decoding.
    fallback = setTimeout(finish, 1900);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!finished) splash.classList.add('is-revealing');
    }));
  });
}

async function go(name, options = {}) {
  if (name === 'feed') { openExistingFeed(); return; }
  if (!steps.includes(name)) return;
  // Ready closes in over the page it replaces (see ready.js): hand it a copy
  // and switch without the usual cross-fade.
  if (name === 'ready' && page && !api.reduced()) { api.handoff = { snapshot: page.cloneNode(true) }; options = { ...options, instant: true }; }
  const token = ++routeGeneration, previous = state.page;
  routeTransition?.cancel(); routeTransition = null;
  page?.cleanup?.(); const old = page;
  for (const child of [...app.children]) if (child !== old) child.remove();
  overlays.replaceChildren(); state.page = name; persist();
  page = name === 'intro' ? renderIntro(api) : name === 'bookmark' ? renderBookmarkPage(api, { next: flow.next('bookmark') })
    : name === 'pick' ? renderPickPage(api) : name === 'track' ? renderTrackPage(api) : name === 'ready' ? renderReadyPage(api)
    : renderSetupPage(name, api);
  page.dataset.page = name; page.classList.add('route-page'); page.style.zIndex = '2'; app.append(page); old?.setAttribute('inert', '');
  const url = new URL(location.href); url.hash = name; history.replaceState(null, '', url);
  if (old && !api.reduced() && !options.instant) {
    routeTransition = transitionPages({ outgoing: old, incoming: page, from: previous, to: name, backward: steps.indexOf(name) < steps.indexOf(previous) });
    await routeTransition.finished;
  }
  if (token !== routeGeneration) return;
  routeTransition = null;
  old?.remove(); page.style.transform = 'none'; page.start?.();
}

reducedMotion.addEventListener('change', () => {
  if (!api.reduced()) return;
  routeTransition?.finish();
  if (state.page === 'intro' || state.page === 'track') page?.finish?.();
});
document.addEventListener('click', () => queueMicrotask(persist));
addEventListener('message', async event => {
  // For You is ready behind this document: open the success circle onto it.
  if (event.source === parent && event.origin === location.origin && event.data?.type === 'alva:handoff-reveal') {
    await window.__alvaReadyIrisOut?.();
    parent.postMessage({ type: 'alva:handoff-revealed', token: event.data.token }, location.origin);
    return;
  }
  if (event.source === parent && event.origin === location.origin && event.data?.type === 'alva:handoff-failed' && event.data.slug === 'thesis-motion') {
    toast('For You could not load. Try again.');
  }
});
addEventListener('pagehide', () => { routeTransition?.finish(); persist(); page?.cleanup?.(); });
// A browser Back restore reuses a cleaned-up document; reopen these demos.
addEventListener('pageshow', event => { if (event.persisted && !trackVariant) location.reload(); });
await go(initialPage, { instant: true });
if (initialPage === steps[0]) startSplash();
