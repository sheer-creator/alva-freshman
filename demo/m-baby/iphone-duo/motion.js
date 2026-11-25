/* iOS system motion for the Duo demo.
   Springs are written the way UIKit / SwiftUI describe them (response,
   damping fraction) and turned into CSS linear() easings, so the browser
   plays the same curve iOS would. */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const cache = new Map();

  /* spring(response, damping) → { easing, duration } (SwiftUI .spring(response:dampingFraction:)) */
  function spring(response, damping) {
    const key = response + '|' + damping;
    if (cache.has(key)) return cache.get(key);
    const w0 = (2 * Math.PI) / response;
    const x = t => {
      if (damping < 1) {
        const wd = w0 * Math.sqrt(1 - damping * damping);
        return 1 - Math.exp(-damping * w0 * t) * (Math.cos(wd * t) + ((damping * w0) / wd) * Math.sin(wd * t));
      }
      return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    };
    let settle = 0;
    for (let t = 0; t < 4; t += 0.004) if (Math.abs(1 - x(t)) > 0.002) settle = t;
    settle = Math.max(settle, 0.12);
    const n = 64, pts = [];
    for (let i = 0; i <= n; i++) pts.push(+x((settle * i) / n).toFixed(4));
    pts[n] = 1;
    const out = { easing: `linear(${pts.join(', ')})`, duration: Math.round(settle * 1000) };
    cache.set(key, out);
    return out;
  }

  const M = {
    spring,
    reduce: () => reduce.matches,
    /* UINavigationController push / pop (as measured on device; same as Ionic's iOS transition) */
    NAV: { duration: 540, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' },
    /* sheet presentation (UISheetPresentationController) */
    SHEET: { duration: 500, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' },
    SHEET_OUT: { duration: 380, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' },
    /* keyboard (UIKeyboardAnimationCurve 7: a critically damped spring) */
    KB: null,
  };
  M.KB = spring(0.42, 1);

  function play(el, frames, opts) {
    if (!el || !el.animate) return null;
    if (reduce.matches) opts = Object.assign({}, opts, { duration: 1 });
    return el.animate(frames, Object.assign({ fill: 'both' }, opts));
  }
  M.play = play;

  /* ── press feedback ──
     Liquid Glass controls grow and light up under the finger and spring
     back on release; table rows grey out; plain text buttons dim. */
  const GLASS = '.glass, .glass-rail, .rail-create, .fab, .capsule, .rail-btn';
  const ROWS = '.card, .lb-row, .person, .tick, .set-row, .gen-row[data-act], .pcard, .r-tag .lbl, .au-item';
  let cur = null;
  function pressTarget(t) {
    if (!t || !t.closest) return null;
    if (t.closest('.rail-tabs, .tabbar, .switch, input, textarea, #kb')) return null;
    const btn = t.closest('button, [data-act]');
    const glass = t.closest(GLASS);
    if (glass && (!btn || glass.contains(btn) || btn.contains(glass))) return { el: glass, kind: 'glass' };
    if (btn && (btn.tagName === 'BUTTON' || btn.classList.contains('pill'))) return { el: btn, kind: 'button' };
    const row = t.closest(ROWS);
    if (row) return { el: row, kind: 'row' };
    return null;
  }
  function down(e) {
    if (e.button > 0) return;
    const p = pressTarget(e.target);
    if (!p) return;
    cur = p;
    const el = p.el;
    if (p.kind === 'glass') {
      const r = el.getBoundingClientRect();
      const s = Math.min(1.12, 1 + 6 / Math.min(r.width, r.height) * (r.width > 2 * r.height ? 0.5 : 1));
      const sp = spring(0.3, 0.62);
      el._pa && el._pa.cancel();
      el._pa = play(el, [{ scale: getComputedStyle(el).scale === 'none' ? 1 : getComputedStyle(el).scale }, { scale: s }], sp);
      let hl = el.querySelector(':scope > .glass-hl');
      if (!hl) { hl = document.createElement('span'); hl.className = 'glass-hl'; if (getComputedStyle(el).position === 'static') el.style.position = 'relative'; el.appendChild(hl); }
      hl.style.setProperty('--hx', (e.clientX - r.left) + 'px');
      hl.style.setProperty('--hy', (e.clientY - r.top) + 'px');
      hl._a && hl._a.cancel();
      hl._a = play(hl, [{ opacity: 0 }, { opacity: 1 }], { duration: 120, easing: 'ease-out' });
    } else if (p.kind === 'row') {
      el.classList.add('hl');
    } else {
      el._pa && el._pa.cancel();
      el._pa = play(el, [{ opacity: 1 }, { opacity: el.closest('.btn-p, .tag-follow, .follow, .d-follow') ? 0.7 : 0.35 }], { duration: 60, easing: 'linear' });
    }
  }
  function up() {
    if (!cur) return;
    const { el, kind } = cur;
    cur = null;
    if (kind === 'glass') {
      const sp = spring(0.42, 0.55);
      const from = getComputedStyle(el).scale;
      el._pa && el._pa.cancel();
      el._pa = play(el, [{ scale: from === 'none' ? 1 : from }, { scale: 1 }], Object.assign({}, sp, { fill: 'none' }));
      const hl = el.querySelector(':scope > .glass-hl');
      if (hl) { hl._a && hl._a.cancel(); hl._a = play(hl, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: 'ease-out' }); }
    } else if (kind === 'row') {
      setTimeout(() => el.classList.remove('hl'), 90);
    } else {
      el._pa && el._pa.cancel();
      el._pa = play(el, [{ opacity: el.closest('.btn-p, .tag-follow, .follow, .d-follow') ? 0.7 : 0.35 }, { opacity: 1 }], { duration: 220, easing: 'ease-out', fill: 'none' });
    }
  }
  addEventListener('pointerdown', down, true);
  addEventListener('pointerup', up, true);
  addEventListener('pointercancel', up, true);
  addEventListener('dragstart', e => e.preventDefault());

  /* UISwitch: the knob stretches while held, then springs across */
  let sw = null;
  addEventListener('pointerdown', e => {
    const s = e.target.closest && e.target.closest('.switch');
    if (!s) return;
    sw = s;
    s.classList.add('press');
  }, true);
  const swUp = () => { if (sw) { sw.classList.remove('press'); sw = null; } };
  addEventListener('pointerup', swUp, true);
  addEventListener('pointercancel', swUp, true);

  document.documentElement.style.setProperty('--sw-ease', spring(0.35, 0.72).easing);
  document.documentElement.style.setProperty('--sw-dur', spring(0.35, 0.72).duration + 'ms');
  window.M = M;
})();
