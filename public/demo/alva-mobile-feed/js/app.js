/* ========== app.js — router & boot ========== */
import { store, closeSheet } from './state.js';
import { renderRoute, TAB_ROUTES } from './screens.js';
import { ACTIONS } from './actions.js';

const pagesEl = document.getElementById('pages');
const tabbar = document.getElementById('tabbar');
let stack = [];

function parse(hash) {
  const h = (hash || '#/').replace(/^#\/?/, '');
  return h === '' ? (store.onboarded ? 'home' : 'welcome') : h;
}
function isTab(route) { return TAB_ROUTES.includes(route.split('/')[0]); }

function mount(route, kind) {
  const page = document.createElement('div');
  page.className = 'page';
  page.dataset.route = route;
  renderRoute(route, page);
  if (kind === 'push') {
    const prev = pagesEl.lastElementChild;
    if (prev) { prev.classList.remove('push-in', 'pop-under', 'fade-in'); prev.classList.add('push-under'); }
    page.classList.add('push-in');
    pagesEl.appendChild(page);
  } else if (kind === 'pop') {
    const top = pagesEl.lastElementChild;
    page.classList.add('pop-under');
    pagesEl.insertBefore(page, top);
    if (top) { top.classList.add('pop-out'); setTimeout(() => top.remove(), 400); }
  } else {
    pagesEl.innerHTML = '';
    page.classList.add('fade-in');
    pagesEl.appendChild(page);
  }
  updateChrome(route);
}

function updateChrome(route) {
  const root = route.split('/')[0];
  tabbar.hidden = !isTab(route);
  tabbar.querySelectorAll('.tab').forEach((t) => t.classList.toggle('on', t.dataset.tab === root));
  /* stage（场外控制）状态同步 */
  const stage = document.getElementById('stage');
  if (stage) stage.querySelectorAll('.st-seg button').forEach((b) => b.classList.toggle('on', b.dataset.m === store.mode));
}

function onHashChange() {
  closeSheet();
  const route = parse(location.hash);
  const idx = stack.lastIndexOf(route);
  if (stack.length && idx === stack.length - 1) return;
  if (idx >= 0 && idx === stack.length - 2) {
    stack.pop();
    mount(route, 'pop');
  } else if (isTab(route) || route === 'welcome' || stack.length === 0) {
    stack = [route];
    mount(route, 'root');
  } else {
    stack.push(route);
    mount(route, 'push');
  }
}

window.addEventListener('hashchange', onHashChange);
tabbar.addEventListener('click', (e) => {
  const t = e.target.closest('.tab');
  if (t) location.hash = '#/' + t.dataset.tab;
});

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const fn = ACTIONS[el.dataset.act];
  if (fn) { e.preventDefault(); fn(el, e); }
});

/* rerender in place（状态变化后重绘当前页，不动导航栈） */
window.__rerender = () => {
  const route = stack[stack.length - 1];
  if (!route) return;
  const top = pagesEl.lastElementChild;
  const scroll = top ? top.scrollTop : 0;
  const page = document.createElement('div');
  page.className = 'page';
  page.dataset.route = route;
  renderRoute(route, page);
  if (top) top.replaceWith(page); else pagesEl.appendChild(page);
  page.scrollTop = scroll;
  updateChrome(route);
};

/* 回访 recap：新 session 且已 onboard → 展示 Since you were away */
import { save } from './state.js';
if (store.onboarded && !sessionStorage.getItem('alva_session')) {
  store.awaySeen = false;
  save();
}
sessionStorage.setItem('alva_session', '1');

/* boot */
if (!location.hash) location.hash = store.onboarded ? '#/home' : '#/welcome';
else if (parse(location.hash) !== 'welcome' && !store.onboarded) location.hash = '#/welcome';
onHashChange();
