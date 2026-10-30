// Track variant: Notifications is told on a generic lock screen (Figma
// Section 18 · T3→N1 a, a2, b, c1, c2, c → N1).
// The phone sits at its N1 position from the first frame and never moves.
// a   T3's heading and Next fade out in place (page level, never in the phone)
//     while T3's cards shrink into the phone screen.
// a2  The lock screen slides down from the top like a cover over the app.
// c   Alva notifications drop in under the clock and stack: the newest lands
//     in front, earlier ones step back smaller (0.94 / +10, 0.88 / +20).
// N1  The heading and the slider arrive. Sliding lifts the notifications out
//     of the phone and spreads them; the phone falls back.
const EASE = 'cubic-bezier(.22,1,.36,1)';
const easeInOut = t => t < .5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
// Slow start, fast middle, slow landing: the shrink reads clearly.
const easeInOutQuint = t => t < .5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2;
const SIDE = 32, INSET = 6, SCREEN_RADIUS = 38, RATIO = 2.17;
const SLOT_Y = 178, STACK = [{ s: 1, dy: 0 }, { s: .94, dy: 10 }, { s: .88, dy: 20 }];
const TOAST_H = 100, SPREAD_TOP = 21.5, SPREAD_STEP = 108;

export function mountPhoneMock(root, api) {
  const handoff = api.handoff; api.handoff = null;
  const animate = !!handoff?.snapshot && !api.reduced();
  const mock = document.createElement('div');
  mock.className = 'phone-mock'; mock.setAttribute('aria-hidden', 'true');
  mock.innerHTML = `<div class="phone-mock-device"><div class="phone-mock-bezel"></div><div class="phone-mock-screen">
      <div class="phone-mock-cover"><div class="phone-mock-lock">
        <div class="phone-mock-status"><i></i><span><i></i><i></i><i></i></span></div>
        <div class="phone-mock-clock"><p>Tuesday, October 28</p><strong>9:41</strong></div>
      </div></div>
    </div></div>`;
  const device = mock.querySelector('.phone-mock-device');
  const screen = mock.querySelector('.phone-mock-screen');
  const cover = mock.querySelector('.phone-mock-cover');
  const layer = document.createElement('div');
  layer.className = 'phone-mock-toasts';
  const toasts = [...root.querySelectorAll('.notification-toast')];
  layer.append(...toasts);
  const body = root.querySelector('.notification-toasts-body');
  body.before(mock); body.after(layer);
  root.classList.add('is-track');
  root.dataset.stage = animate ? 'enter' : 'ready';

  // T3 handed over: its cards (app layer) and its bottom panel (fades in place).
  let app = null, panel = null;
  if (animate) {
    app = document.createElement('div'); app.className = 'phone-mock-app';
    app.style.width = `${handoff.size.width}px`;
    const page = handoff.snapshot;
    page.style.width = `${handoff.size.width}px`; page.style.height = `${handoff.size.height}px`;
    app.append(page);
    const sourcePanel = page.querySelector('.track-panel');
    if (sourcePanel) {
      panel = sourcePanel.cloneNode(true); panel.classList.add('phone-mock-panel');
      Object.assign(panel.style, { left: `${handoff.panel.x}px`, top: `${handoff.panel.y}px`, width: `${handoff.panel.width}px`, height: `${handoff.panel.height}px` });
    }
    screen.insertBefore(app, cover); if (panel) root.append(panel);
  }

  let geo = null, alive = true, frame = 0;
  function measure() {
    const W = root.clientWidth;
    const base = root.getBoundingClientRect(), unit = base.width / W || 1;
    const stage = root.querySelector('.notification-toasts-stage').getBoundingClientRect();
    const top = (stage.top - base.top) / unit;
    const deviceW = W - SIDE * 2, screenW = deviceW - INSET * 2;
    const full = W / screenW, H = root.clientHeight;
    // Tall enough that, scaled up to fill the page, the screen covers it.
    const deviceH = Math.max(Math.round(deviceW * RATIO), Math.ceil(H / full) + INSET * 2), screenH = deviceH - INSET * 2;
    geo = { W, H, top, full, deviceW, deviceH, screenW, screenH, screenX: SIDE + INSET, screenY: top + INSET,
      scale: (screenW - 24) / (W - 32) };
    mock.style.transform = `translate(${SIDE}px, ${top}px)`;
    device.style.width = `${deviceW}px`; device.style.height = `${deviceH}px`;
    mock.querySelector('.phone-mock-lock').style.height = `${screenH}px`;
    toasts.forEach((toast, index) => toast.style.setProperty('--end-y', `${top + SPREAD_TOP + index * SPREAD_STEP}px`));
  }
  // Depth 0 is the front of the stack, under the clock.
  function setDepth(toast, depth) {
    const { s, dy } = STACK[Math.min(depth, STACK.length - 1)];
    const front = geo.scale, scale = front * s;
    const frontTop = geo.screenY + SLOT_Y;
    toast.style.setProperty('--mock-s', String(scale));
    toast.style.setProperty('--mock-y', `${frontTop + TOAST_H * front + dy - TOAST_H * scale}px`);
    toast.style.setProperty('--hide', depth ? '1' : '0');
    toast.dataset.depth = String(depth);
    toast.style.zIndex = String(10 - depth);
  }
  function stackAll() { toasts.forEach((toast, index) => { setDepth(toast, index); toast.classList.add('is-arrived'); }); }
  function tween(duration, ease, step) {
    return new Promise(resolve => {
      const start = performance.now();
      const tick = now => {
        if (!alive) return resolve();
        const t = Math.min(1, (now - start) / duration);
        step(ease(t));
        if (t < 1) frame = requestAnimationFrame(tick); else resolve();
      };
      frame = requestAnimationFrame(tick);
    });
  }
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // k = 0: the phone is scaled up so its screen is exactly the page (the app
  // fills it); k = 1: the phone at its N1 size and place. The app lives inside
  // the screen the whole time, so the screen's own rounded corners clip it and
  // the inner radius stays true while it shrinks.
  function placeMock(k) {
    const { full, top } = geo;
    const scale = full + (1 - full) * k;
    const x = -INSET * full + (SIDE + INSET * full) * k;
    const y = -INSET * full + (top + INSET * full) * k;
    mock.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  // First layout. It runs as soon as the page is in the document — from
  // start(), in the same task as the page switch — so the very first painted
  // frame already shows the app at full size and scrolled, never a raw frame.
  let laid = false;
  function layout() {
    if (laid || !root.isConnected) return;
    laid = true;
    measure();
    if (animate) {
      const viewport = handoff.snapshot.querySelector('.track-viewport');
      if (viewport) viewport.scrollTop = handoff.scrollTop;
      app.style.height = `${Math.max(handoff.size.height, Math.ceil(geo.screenH * geo.full))}px`;
      app.style.transform = `scale(${1 / geo.full})`;
      cover.style.height = '0px';
      placeMock(0);
    } else stackAll();
  }
  const laidOut = new Promise(resolve => requestAnimationFrame(() => { layout(); resolve(); }));
  async function start() {
    layout();
    await laidOut;
    if (!animate || !alive) return;
    // a + a2 together: heading and Next fade out in place, the cards shrink
    // into the phone, and the lock screen slides down over them at the same
    // time. The cover lives in the shrinking layer, drawn at screen scale.
    panel?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'forwards' });
    root.dataset.stage = 'shrink';
    // The heading comes first, while the phone shrinks; the slider waits for
    // the notifications.
    root.querySelector('.setup-heading').animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
      { duration: 600, delay: 540, easing: EASE, fill: 'backwards' });
    // The phone shrinks to its place while the lock screen slides down over
    // the app at the same time.
    const shrink = tween(1150, easeInOutQuint, placeMock);
    const slide = sleep(260).then(() => tween(860, easeInOut, k => { cover.style.height = `${geo.screenH * k}px`; }));
    await Promise.all([shrink, slide]); if (!alive) return;
    panel?.remove(); app.remove(); cover.style.height = '';
    root.dataset.stage = 'cover';
    await sleep(120); if (!alive) return;
    // c1–c. Notifications drop in; each new one lands in front.
    root.dataset.stage = 'toasts';
    toasts.forEach(toast => setDepth(toast, 0));
    layer.getBoundingClientRect();
    layer.classList.add('is-stacking');
    const order = [...toasts].reverse();
    for (let arrived = 0; arrived < order.length; arrived++) {
      for (let i = 0; i < arrived; i++) setDepth(order[i], arrived - i);
      const toast = order[arrived];
      setDepth(toast, 0); toast.classList.add('is-arrived');
      toast.animate([{ opacity: 0, translate: '0 -28px' }, { opacity: 1, translate: '0 0' }], { duration: 460, easing: EASE, fill: 'backwards' });
      if (arrived < order.length - 1) { await sleep(220); if (!alive) return; }
    }
    // N1. As the third notification lands, the slider arrives; the phone
    // stays where it is.
    await sleep(160); if (!alive) return;
    root.dataset.stage = 'ready';
    root.querySelector('.notification-toasts-dock').animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
      { duration: 480, easing: EASE, fill: 'backwards' });
    await sleep(400); if (!alive) return;
    layer.classList.remove('is-stacking');
  }
  const resized = () => { if (!geo || root.dataset.stage !== 'ready') return; measure(); stackAll(); };
  addEventListener('resize', resized);
  return {
    start,
    cleanup() { alive = false; cancelAnimationFrame(frame); removeEventListener('resize', resized); },
  };
}
