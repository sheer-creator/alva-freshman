// Thesis detail · signals generating (Figma Thesis MVP 12454:331346).
//
// Signals list right after a thesis is created:
// - A generating item sits at the top. Its grey blocks share one light sweep;
//   its step line changes like quick typing (the old line is deleted letter by
//   letter, the new one typed in). The step text hugs the letters on screen and
//   the bar to its right fills the rest of the row, so it follows every letter.
// - After at least 5s of generating, in two beats: first the generating item turns into a real signal
//   card in place (one box opens to the card's height while the skeleton
//   dissolves and the card's content fades in — opacity only); then a fresh
//   generating item opens above it. Five
//   signals in all.
const STEPS = [
  'Reading Wedbush note on Microsoft Maia 300',
  'Checking AMD volume against its 50-day average',
  'Scanning SemiAnalysis on TPUv8i',
  'Comparing with the summer high',
  'Looking for challenging signals',
  'Matching new sources to this thesis',
];
// Demo signals, in the order they arrive (each new one lands at the top).
const SIGNALS = [
  { avatar: 'assets/social-matt-bryson.png', name: 'Matt Bryson', role: 'Managing Director, Equity Research · Wedbush', time: '12 Aug, 03:00',
    quote: 'Matt Bryson, Wedbush analyst, sees an opportunity for Marvell and TSMC as Microsoft prepares Maia 300.', link: 'tradingview.com',
    stance: 'Mixed', analysis: 'Custom accelerators may lower compute costs; an unveiling is not evidence of deployment or returns.' },
  { avatar: 'assets/onboarding-qqq.svg', name: 'Nasdaq-100 (QQQ)', role: 'Index context', time: '12 Aug, 05:30',
    quote: 'Chip stocks lagged the index this week as yields rose.', link: 'nasdaq.com',
    stance: 'Challenges', analysis: 'A weaker sector backdrop could cap AMD near its summer high.' },
  { avatar: 'assets/social-semianalysis.png', name: 'SemiAnalysis', role: 'Semiconductor & AI research', time: '12 Aug, 07:00',
    quote: 'SemiAnalysis reports TPUv8i is in internal software bring-up, with work beginning on the public software stack.', link: 'x.com',
    stance: 'Mixed', analysis: 'TPU commercialization could support the infrastructure thesis; adoption and returns remain unproven.' },
  { avatar: 'assets/onboarding-spy.svg', name: 'Options flow', role: 'Derivatives activity', time: '12 Aug, 09:15',
    quote: 'Call volume on AMD ran about twice put volume into the summer high.', link: 'cboe.com',
    stance: 'Supports', analysis: 'Positioning leans bullish, though crowded calls can unwind quickly near resistance.' },
  { avatar: 'assets/feed-logo-amd.svg', name: 'Market data', role: 'Price & volume', time: '12 Aug, 10:40',
    quote: 'AMD closed above its July pullback high on volume 1.6× its 50-day average.', link: 'nasdaq.com',
    stance: 'Supports', analysis: 'Heavier volume on the breakout supports the view that more buyers are joining the advance.' },
];
const LOAD_MS = 5600;     // each generating item works this long (≥5s fully open)
const STEP_MS = 2600;     // the step line changes this often
const MORPH_MS = 520;     // generating item → signal card
const EASE_OUT = 'cubic-bezier(.22,1,.36,1)';
const EASE_IO = 'cubic-bezier(.45,0,.25,1)';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const list = document.querySelector('.gen-signals');
const ALVA = 'onboarding/assets/alva-source-12646-154584.svg';
const esc = text => String(text).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const node = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const divider = () => node('<i class="gen-divider"></i>');

const skeletonHTML = `<article class="gen-skeleton">
  <div class="gen-skel-identity">
    <i class="gen-bone gen-bone-avatar"></i>
    <div class="gen-skel-lines"><i class="gen-bone" style="width:112px;height:14px"></i><i class="gen-bone" style="width:160px;height:12px"></i></div>
    <i class="gen-bone" style="width:40px;height:14px;align-self:flex-start"></i>
  </div>
  <div class="gen-skel-text">
    <div class="gen-skel-row"><span class="gen-skel-title">Gathering signals</span><i class="gen-bone gen-bone-fill"></i></div>
    <div class="gen-skel-row"><span class="gen-skel-step"><span></span></span><i class="gen-bone gen-bone-fill"></i></div>
  </div>
</article>`;
const signalHTML = s => `<article class="gen-signal">
  <div class="gen-speaker">
    <img src="${esc(s.avatar)}" alt="">
    <div><div class="gen-speaker-top"><strong>${esc(s.name)}</strong><time>${esc(s.time)}</time></div><span>${esc(s.role)}</span></div>
  </div>
  <p class="gen-quote">${esc(s.quote)} <a href="#" onclick="return false">${esc(s.link)}</a> ↗</p>
  <div class="gen-analysis"><span class="gen-stance"><i class="gen-stance-alva"><img src="${ALVA}" alt="Alva"></i><i class="gen-stance-tag is-${s.stance.toLowerCase()}">${esc(s.stance)}</i></span><p>${esc(s.analysis)}</p></div>
</article>`;

// ── The generating item ──
let skel = null, words = null, stepIndex = 0, typing = 0;
function bindSkeleton(el) {
  skel = el; words = el.querySelector('.gen-skel-step > span');
  words.textContent = STEPS[stepIndex % STEPS.length];
}
// Each block shows its own slice of one shared sweep, from its x in the item.
(function sweep() {
  if (skel?.isConnected) {
    const base = skel.getBoundingClientRect();
    skel.style.setProperty('--gen-item-w', `${Math.round(base.width)}px`);
    for (const bone of skel.querySelectorAll('.gen-bone')) bone.style.setProperty('--x', `${bone.getBoundingClientRect().left - base.left}px`);
  }
  requestAnimationFrame(sweep);
})();
// Quick typing with real letters: the old line is deleted from its end, then
// the new one is typed in, a few letters per frame. The step text always hugs
// what is on screen, so the bar beside it follows every letter exactly.
const DELETE_PER_MS = 1 / 5;   // ~5ms a letter going out
const TYPE_PER_MS = 1 / 16;    // ~16ms a letter coming in
function nextStep() {
  if (!skel?.isConnected) return;
  const run = ++typing, el = words;
  stepIndex = (stepIndex + 1) % STEPS.length;
  const before = el.textContent, after = STEPS[stepIndex];
  if (reduced.matches) { el.textContent = after; return; }
  const start = performance.now(), outMs = before.length / DELETE_PER_MS;
  const tick = now => {
    if (run !== typing || !el.isConnected) return;
    const t = now - start;
    if (t < outMs) el.textContent = before.slice(0, Math.max(0, Math.ceil(before.length - t * DELETE_PER_MS)));
    else {
      const shown = Math.min(after.length, Math.floor((t - outMs) * TYPE_PER_MS) + 1);
      el.textContent = after.slice(0, shown);
      if (shown >= after.length) return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  // If frames stop (background tab), the line still ends complete.
  setTimeout(() => { if (run === typing && el.isConnected) el.textContent = after; }, outMs + after.length / TYPE_PER_MS + 400);
}
setInterval(nextStep, STEP_MS);

// ── Generating item → signal card ──
let made = 0;
function complete() {
  const data = SIGNALS[made++];
  const old = skel, card = node(signalHTML(data));
  const from = old.offsetHeight;
  typing++; // the old item stops typing
  if (reduced.matches) old.replaceWith(card);
  else {
    // The skeleton stays on top as a veil while the box becomes the card.
    const veil = document.createElement('div'); veil.className = 'gen-veil';
    veil.append(...old.childNodes);
    old.replaceWith(card);
    const content = [...card.children];
    card.classList.add('is-morphing'); card.append(veil);
    const to = card.offsetHeight;
    // One continuous move: the box opens to the card's height while the
    // skeleton dissolves and the card's content comes through in the same
    // place — opacity only, nothing slides.
    card.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: MORPH_MS, easing: EASE_IO });
    veil.animate([{ opacity: 1 }, { opacity: 0, offset: .6 }, { opacity: 0 }], { duration: MORPH_MS, easing: 'ease-in-out', fill: 'forwards' });
    content.forEach(child => child.animate([{ opacity: 0 }, { opacity: 0, offset: .2 }, { opacity: 1 }], { duration: MORPH_MS, easing: 'ease-in-out' }));
    setTimeout(() => { veil.remove(); card.classList.remove('is-morphing'); }, MORPH_MS + 20);
  }
  if (made < SIGNALS.length) {
    // Second beat: only after the card has settled does the next generating
    // item open above it (it takes no room until then).
    skel = null;
    setTimeout(() => {
      const fresh = node(skeletonHTML), line = divider();
      card.before(fresh, line);
      bindSkeleton(fresh);
      if (!reduced.matches) {
        const h = fresh.offsetHeight, cs = getComputedStyle(fresh);
        fresh.animate([{ height: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 }, { height: `${h}px`, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, opacity: 1 }],
          { duration: 400, easing: EASE_OUT });
        line.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: EASE_OUT });
      }
      setTimeout(complete, LOAD_MS);
    }, reduced.matches ? 0 : MORPH_MS + 200);
  } else skel = null;
}

// Start: one generating item, then five signals, five seconds apart.
const first = node(skeletonHTML);
list.append(first, divider());
bindSkeleton(first);
setTimeout(complete, LOAD_MS);

// Gallery theme switch.
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let appearance = 'light';
function applyAppearance(value) {
  appearance = ['light', 'dark', 'system'].includes(value) ? value : 'light';
  const dark = appearance === 'dark' || (appearance === 'system' && systemTheme.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}
addEventListener('message', event => {
  if (event.origin === location.origin && event.data?.type === 'alva:set-appearance') applyAppearance(event.data.appearance);
});
systemTheme.addEventListener('change', () => applyAppearance(appearance));
