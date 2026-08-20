/* ========== state.js — store / icons / sheet（无依赖，供全体 import） ========== */

const KEY = 'alva_mvp_demo_v1';
const DEFAULTS = {
  onboarded: false,
  entities: [],
  paused: [],
  notifications: true,
  theme: 'dark',
  automationAlerts: {},
  automationEmail: {},
  automationInstructions: {},
  manualRuns: {},
};

export const store = (() => {
  try { return { ...structuredClone(DEFAULTS), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch { return structuredClone(DEFAULTS); }
})();

export function save() { localStorage.setItem(KEY, JSON.stringify(store)); }
export function applyTheme(value = store.theme) {
  const theme = value === 'light' ? 'light' : 'dark';
  store.theme = theme;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#F6F6F6' : '#15161A');
  return theme;
}
export function resetDemo() { localStorage.removeItem(KEY); location.hash = '#/welcome'; location.reload(); }
export function toggleIn(arr, v) {
  const i = arr.indexOf(v);
  if (i >= 0) arr.splice(i, 1); else arr.push(v);
  save();
  return i < 0;
}

export function nav(hash) { location.hash = hash; }
export function back() { history.back(); }

applyTheme();

/* ========== icons（stroke 统一 1.8–2，24 viewBox） ========== */
export const I = {
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  chevR: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
  chevDown: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  ask: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 1 1-3.1-6.3L21 5l-.9 3.4c.6 1.1.9 2.3.9 3.6Z"/><circle cx="8.8" cy="12" r=".9" fill="currentColor" stroke="none"/><circle cx="12.4" cy="12" r=".9" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r=".9" fill="currentColor" stroke="none"/></svg>',
  flip: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".5" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5"/></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="M4 16l4.5-5 3.5 3 4-6 4 4.5"/></svg>',
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5L8 5.5Z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M9 5.5v13M15 5.5v13"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M6 9.5a6 6 0 0 1 12 0c0 5 1.7 6.2 1.7 6.2H4.3S6 14.5 6 9.5Z"/><path d="M10 19.5a2.2 2.2 0 0 0 4 0"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 6 .5l3-3a4 4 0 0 0-5.5-5.5l-1.7 1.7"/><path d="M14 10a4 4 0 0 0-6-.5l-3 3a4 4 0 0 0 5.5 5.5l1.7-1.7"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M19.2 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2.2-1.3l-.4-2.5h-4l-.4 2.5a7 7 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2.2 1.3l.4 2.5h4l.4-2.5a7 7 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.06-.4.1-.8.1-1.2Z"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>',
  mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v4h4"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8 21 21"/></svg>',
};

/* toast 已按产品反馈停用：状态反馈由界面自身变化承担，保留签名以免动调用方 */
export function toast() {}

/* ========== sheet ========== */
export function openSheet(html) {
  const root = document.getElementById('sheet-root');
  root.innerHTML = `<div class="sheet-backdrop" data-act="sheet-close"></div><div class="sheet"><div class="grabber"></div>${html}</div>`;
  const sheet = root.querySelector('.sheet');
  void sheet.offsetHeight;
  root.querySelector('.sheet-backdrop').classList.add('show');
  sheet.classList.add('show');
}
export function closeSheet() {
  const root = document.getElementById('sheet-root');
  const b = root.querySelector('.sheet-backdrop');
  const s = root.querySelector('.sheet');
  if (!s) return;
  if (b) b.classList.remove('show');
  s.classList.remove('show');
  setTimeout(() => { root.innerHTML = ''; }, 400);
}
