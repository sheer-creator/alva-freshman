import { animate } from './vendor/motion.js';
import { renderSetupPage } from './setup.js?v=14';
import { renderIntroPage } from './intro.js?v=11';
import { renderGuidedIntroPage } from './intro-guided.js?v=2';
import { renderBookmarkPage } from './cards.js?v=6';
import { node, escapeHTML } from './ui.js';
import { transitionPages } from './transitions.js?v=7';
import { ONBOARDING_STATE_KEY, GUIDED_ONBOARDING_STATE_KEY, readOnboardingState, persistOnboardingState, resetOnboardingState, completeOnboarding } from '../thesis-demo-state.js?v=2';

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

const steps = ['login', 'intro', 'people', 'bookmark', 'portfolio', 'notifications'];
const search = new URLSearchParams(location.search);
const guided = search.get('intro') === 'guided';
const stateKey = guided ? GUIDED_ONBOARDING_STATE_KEY : ONBOARDING_STATE_KEY;
const renderIntro = guided ? renderGuidedIntroPage : renderIntroPage;
let state = readOnboardingState(stateKey);
const restartToken = search.get('restart');
if (restartToken && state.restartToken !== restartToken) { resetOnboardingState(restartToken, stateKey); state = readOnboardingState(stateKey); }
if (guided) document.title = 'Thesis onboarding · Guided';
const app = document.querySelector('#app');
const overlays = document.querySelector('#overlays');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const requested = location.hash.slice(1);
const initialPage = steps.includes(requested) ? requested : steps.includes(state.page) ? state.page : 'login';
const splash = document.querySelector('#startupSplash');
// The static splash covers data/font loading; resumed steps skip its reveal.
if (initialPage !== 'login') { splash.remove(); app.inert = false; }
const [manifest, data] = await Promise.all(['assets/manifest.json?v=5', 'content.json?v=4'].map(async url => {
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
const persist = () => persistOnboardingState(state, stateKey);
const api = { data, state, variant: guided ? 'guided' : 'original', asset: id => manifest[id] || '', persist, reduced: () => reducedMotion.matches, go, toast, sheet };

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
  if (!completeOnboarding(state, data, api.asset, location.href, stateKey)) {
    toast('Bookmark a thesis to continue.'); go('bookmark'); return;
  }
  // The shell keeps this page available if For You fails to load. Clean up on
  // pagehide after a successful handoff so retry controls remain usable.
  if (window.parent !== window) window.parent.postMessage({ type: 'alva:open-prototype', slug: 'thesis-motion' }, location.origin);
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
  const token = ++routeGeneration, previous = state.page;
  routeTransition?.cancel(); routeTransition = null;
  page?.cleanup?.(); const old = page;
  for (const child of [...app.children]) if (child !== old) child.remove();
  overlays.replaceChildren(); state.page = name; persist();
  page = name === 'intro' ? renderIntro(api) : name === 'bookmark' ? renderBookmarkPage(api) : renderSetupPage(name, api);
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
  if (state.page === 'intro') page?.finish?.();
});
document.addEventListener('click', () => queueMicrotask(persist));
addEventListener('message', event => {
  if (event.source === parent && event.origin === location.origin && event.data?.type === 'alva:handoff-failed' && event.data.slug === 'thesis-motion') {
    toast('For You could not load. Try again.');
  }
});
addEventListener('pagehide', () => { routeTransition?.finish(); persist(); page?.cleanup?.(); });
await go(initialPage, { instant: true });
if (initialPage === 'login') startSplash();
