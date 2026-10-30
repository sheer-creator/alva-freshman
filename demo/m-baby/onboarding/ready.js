import { node } from './ui.js';

// After Portfolio (Track): "You're all set", told like the app's splash.
// In:   the success circle is a hole in a green sheet. The hole starts larger
//       than the screen (the previous page shows through it) and closes down
//       to the circle's size; the circle stays white, the tick draws itself,
//       the copy and confetti arrive.
// Hold: about a second and a half.
// Out:  the circle opens again, this time onto For You behind it.
const COLORS = ['#49a3a6', '#2a9b7d', '#f5ad19', '#ff7a59', '#6c8cff', '#b9dcd8', '#e6c3ff'];
const IN_MS = 540, OUT_MS = 520, HOLD_MS = 1500, BADGE_R = 36;
const easeInOut = t => t < .5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function renderReadyPage(api) {
  const handoff = api.handoff; api.handoff = null;
  const root = node('section', 'page ready-page');
  root.setAttribute('aria-label', 'You’re all set');
  root.innerHTML = `<div class="ready-under" aria-hidden="true"></div>
    <div class="ready-iris" aria-hidden="true"></div>
    <canvas class="ready-confetti" aria-hidden="true"></canvas>
    <div class="ready-copy" role="status">
      <div class="ready-badge" aria-hidden="true"><i class="ready-ring"></i><i class="ready-ring"></i>
        <svg class="ready-check" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28"/><path d="M17 28.5l7.5 7.5L39.5 21"/></svg></div>
      <h1>You’re all set.</h1>
      <p>Getting your feed ready…</p>
    </div>`;
  const under = root.querySelector('.ready-under'), iris = root.querySelector('.ready-iris');
  const animate = !api.reduced();
  if (animate && handoff?.snapshot) {
    const page = handoff.snapshot;
    page.removeAttribute('data-page'); page.classList.remove('route-page'); page.setAttribute('inert', '');
    page.style.transform = 'none'; page.style.opacity = '';
    under.append(page);
  }
  let alive = true, frame = 0, timer = 0, centre = null;
  function confetti() {
    const canvas = root.querySelector('canvas');
    const W = root.clientWidth, H = root.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr;
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
    // Several bursts from random points, at slightly different moments.
    const pieces = [];
    for (let burst = 0; burst < 5; burst++) {
      const ox = W * (.12 + Math.random() * .76), oy = H * (.3 + Math.random() * .45), delay = burst * .12 + Math.random() * .1;
      for (let i = 0; i < 34; i++) {
        const angle = Math.random() * Math.PI * 2, speed = 4 + Math.random() * 8;
        pieces.push({ x: ox, y: oy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 4, delay,
          w: 6 + Math.random() * 6, h: 3 + Math.random() * 4, r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)] });
      }
    }
    const start = performance.now();
    const tick = now => {
      if (!alive) return;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const p of pieces) {
        if (t < p.delay) continue;
        p.vy += .32; p.vx *= .992; p.vy *= .992; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - 1.8) / .8);
        ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(1, Math.abs(Math.cos(p.r * 2)) * .8 + .2);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      }
      if (t < 2.7) frame = requestAnimationFrame(tick); else ctx.clearRect(0, 0, W, H);
    };
    frame = requestAnimationFrame(tick);
  }
  function measure() {
    const base = root.getBoundingClientRect(), unit = base.width / root.offsetWidth || 1;
    const badge = root.querySelector('.ready-badge').getBoundingClientRect();
    const x = (badge.left - base.left + badge.width / 2) / unit, y = (badge.top - base.top + badge.height / 2) / unit;
    const W = root.offsetWidth, H = root.offsetHeight;
    centre = { x, y, max: Math.ceil(Math.max(Math.hypot(x, y), Math.hypot(W - x, y), Math.hypot(x, H - y), Math.hypot(W - x, H - y))) + 4 };
  }
  function hole(r) {
    const mask = `radial-gradient(circle at ${centre.x}px ${centre.y}px, transparent ${r}px, #000 ${r + .75}px)`;
    iris.style.webkitMaskImage = mask; iris.style.maskImage = mask;
  }
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
  function reveal() {
    root.classList.remove('is-waiting');
    if (!animate) return;
    confetti();
    const check = root.querySelector('.ready-check'), tick = check.querySelector('path');
    // The circle is already there (it was the hole); it settles with one small
    // breath while the tick draws and the rings ripple out.
    check.animate([{ transform: 'none' }, { transform: 'scale(1.12)', offset: .4 }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.3,0,.3,1)' });
    root.querySelectorAll('.ready-ring').forEach((ring, index) => ring.animate([{ transform: 'scale(.9)', opacity: .55 }, { transform: 'scale(2.1)', opacity: 0 }],
      { duration: 900, delay: 120 + index * 220, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'both' }));
    tick.animate([{ strokeDashoffset: 40 }, { strokeDashoffset: 0 }], { duration: 420, delay: 80, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'backwards' });
    [...root.querySelectorAll('.ready-copy h1, .ready-copy p')].forEach((el, index) => el.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
      { duration: 520, delay: 160 + index * 90, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
  }
  if (animate) root.classList.add('is-waiting', 'is-closing');
  root.start = async () => {
    if (animate) {
      measure(); hole(centre.max);
      const shell = root.closest('.onboarding-app');
      // The status bar turns white once the green has closed over it.
      const lightBar = setTimeout(() => shell?.classList.add('is-ready-dark'), IN_MS * .45);
      // Near the end the previous page fades to white inside the shrinking
      // hole, so the hole becomes the white success circle.
      const previous = under.firstElementChild;
      await tween(IN_MS, easeInOut, k => {
        hole(centre.max + (BADGE_R - centre.max) * k);
        if (previous) previous.style.opacity = String(Math.min(1, Math.max(0, (.92 - k) / .3)));
      });
      clearTimeout(lightBar); shell?.classList.add('is-ready-dark');
      if (!alive) return;
      under.replaceChildren();
      root.classList.remove('is-closing');
    } else root.closest('.onboarding-app')?.classList.add('is-ready-dark');
    reveal();
    timer = setTimeout(() => { if (alive) api.go('feed'); }, HOLD_MS + (animate ? 400 : 1000));
  };
  // Called when For You is ready behind this document: the circle opens onto it.
  window.__alvaReadyIrisOut = async () => {
    if (!alive || !animate || !centre) return false;
    document.documentElement.classList.add('is-iris-out');
    root.classList.add('is-opening');
    // The rest leaves with it rather than vanishing: the tick fades, the copy
    // sinks and fades, the confetti fades.
    const leave = { duration: 340, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' };
    root.querySelector('.ready-check path').animate([{ opacity: 1 }, { opacity: 0 }], { ...leave, duration: 180 });
    [...root.querySelectorAll('.ready-copy h1, .ready-copy p')].forEach((el, index) => el.animate(
      [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(16px) scale(.98)' }], { ...leave, delay: index * 50 }));
    root.querySelector('.ready-confetti').animate([{ opacity: 1 }, { opacity: 0 }], leave);
    await tween(OUT_MS, t => t < .5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2, k => hole(BADGE_R + (centre.max - BADGE_R) * k));
    return true;
  };
  root.cleanup = () => {
    alive = false; cancelAnimationFrame(frame); clearTimeout(timer);
    root.closest('.onboarding-app')?.classList.remove('is-ready-dark');
    if (window.__alvaReadyIrisOut) delete window.__alvaReadyIrisOut;
  };
  return root;
}
