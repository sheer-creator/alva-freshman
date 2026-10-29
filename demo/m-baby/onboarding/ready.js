import { node } from './ui.js';

// After Portfolio (Track): a short "all set" page with a confetti burst, then
// For You opens.
// Success icon instead of a loader; confetti from random points.
const COLORS = ['#49a3a6', '#2a9b7d', '#f5ad19', '#ff7a59', '#6c8cff', '#b9dcd8', '#e6c3ff'];

export function renderReadyPage(api) {
  const root = node('section', 'page ready-page');
  root.setAttribute('aria-label', 'You’re all set');
  root.innerHTML = `<canvas class="ready-confetti" aria-hidden="true"></canvas>
    <div class="ready-copy" role="status">
      <svg class="ready-check" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="28"/><path d="M17 28.5l7.5 7.5L39.5 21"/></svg>
      <h1>You’re all set.</h1>
      <p>Getting your feed ready…</p>
    </div>`;
  let alive = true, frame = 0, timer = 0;
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
  // Hidden until start() so nothing shows during the page cross-fade.
  if (!api.reduced()) root.classList.add('is-waiting');
  root.start = () => {
    root.classList.remove('is-waiting');
    if (!api.reduced()) {
      confetti();
      root.querySelector('.ready-check path').animate([{ strokeDashoffset: 40 }, { strokeDashoffset: 0 }], { duration: 420, delay: 180, easing: 'cubic-bezier(.3,0,.2,1)', fill: 'backwards' });
    root.querySelector('.ready-check').animate([{ transform: 'scale(.4)', opacity: 0 }, { transform: 'scale(1.08)', opacity: 1, offset: .6 }, { transform: 'none', opacity: 1 }], { duration: 460, easing: 'cubic-bezier(.3,0,.3,1)', fill: 'backwards' });
    root.querySelector('.ready-copy').animate([{ opacity: 0, transform: 'translateY(12px) scale(.98)' }, { opacity: 1, transform: 'none' }],
        { duration: 520, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    }
    timer = setTimeout(() => { if (alive) api.go('feed'); }, 2600);
  };
  root.cleanup = () => { alive = false; cancelAnimationFrame(frame); clearTimeout(timer); };
  return root;
}
