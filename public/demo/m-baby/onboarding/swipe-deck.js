import { node, image, escapeHTML, topbar, heading } from './ui.js';
import { renderThesisContent } from './cards.js?v=10';

// Track · Bookmark step as a swipe deck. Each card has two buttons: Not
// interested (left) and Bookmark (right). Tap them, or drag the card: right
// fills it with a translucent green, left with a translucent grey. Past the
// release point the label on the card locks in (it grows and turns solid, and
// the matching button lights up), so the user knows letting go will count.
const RELEASE = .32;            // of the card width
const FLY = 'cubic-bezier(.3,.6,.4,1)';
const BACK = 'cubic-bezier(.3,1.4,.5,1)';

export function renderSwipePage(api, { pool, back, onNext }) {
  api.state.bookmarked ||= new Set();
  const root = node('section', 'page bookmark-page swipe-page');
  root.dataset.mode = 'pick';
  root.setAttribute('aria-label', 'Bookmark theses');
  const copy = api.data.bookmarkCopy || { title: 'Bookmark theses.\nTrack what changes.', description: 'Choose the views you want Alva to track for new signals.' };
  // Skip (top right) goes straight to Portfolio.
  root.append(topbar(api, back ? () => api.go(back) : null, () => api.go('portfolio')), heading(copy.title, copy.description));
  const deck = node('div', 'bookmark-deck swipe-deck');
  root.append(deck);
  const footer = node('footer', 'page-footer');
  const count = node('p', 'pick-count'); count.setAttribute('aria-live', 'polite');
  const next = node('button', 'btn btn-primary', 'Next'); next.type = 'button';
  footer.append(count, next); root.append(footer);

  // Each thesis is shown once. When none are left, an end card says more is
  // coming and offers Skip (same as the top-right Skip).
  const dismissed = new Set();
  const queue = () => pool.filter(item => !api.state.bookmarked.has(item.id) && !dismissed.has(item.id));
  const END = { id: '__end' };
  const cards = new Map();
  let busy = false, drag = null;
  const icon = name => api.asset(api.data.icons[name]);

  function cardFor(item) {
    if (cards.has(item.id)) return cards.get(item.id);
    if (item === END) {
      const card = node('article', 'deck-card swipe-end'); card.dataset.thesis = END.id;
      card.innerHTML = `<div class="swipe-end-copy"><h3>Nothing caught your interest?</h3><p>No problem. We’ll prepare more great content for you.</p></div>`;
      const skip = node('button', 'btn btn-secondary swipe-end-skip', 'Let’s keep going'); skip.type = 'button';
      skip.onclick = () => api.go('portfolio');
      card.append(skip);
      cards.set(END.id, card); return card;
    }
    const card = node('article', 'deck-card'); card.dataset.thesis = item.id;
    card.setAttribute('aria-label', `${item.author} thesis`);
    const read = node('div', 'card-reading'); read.append(renderThesisContent(item, api)); card.append(read);
    card.append(node('div', 'swipe-mask is-yes', `<span class="swipe-stamp"><i class="bookmark-icon" style="--icon:url(&quot;${escapeHTML(icon('Bookmark icon') || icon('bookmark-l'))}&quot;)"></i>Bookmark</span>`));
    card.append(node('div', 'swipe-mask is-no', `<span class="swipe-stamp"><i class="bookmark-icon" style="--icon:url(&quot;${escapeHTML(icon('Close'))}&quot;)"></i>Not interested</span>`));
    const actions = node('nav', 'bookmark-controls swipe-actions'); actions.setAttribute('aria-label', 'Bookmark or skip this thesis');
    const no = node('button', 'swipe-no', 'Not interested'); no.type = 'button'; no.dataset.action = 'skip';
    const yes = node('button', 'bookmark-button', `<i class="bookmark-icon" style="--icon:url(&quot;${escapeHTML(icon('Bookmark icon') || icon('bookmark-l'))}&quot;)" aria-hidden="true"></i><span>Bookmark</span>`);
    yes.type = 'button'; yes.dataset.action = 'bookmark';
    no.onclick = () => decide(item.id, -1); yes.onclick = () => decide(item.id, 1);
    actions.append(no, yes); card.append(actions);
    cards.set(item.id, card); return card;
  }

  function arrange() {
    const open = queue();
    const list = (open.length < 3 ? [...open, END] : open).slice(0, 3);
    const slots = ['front', 'next', 'previous'];
    const keep = new Set();
    list.forEach((item, index) => {
      const card = cardFor(item); keep.add(item.id);
      card.dataset.deckPosition = slots[index];
      card.classList.toggle('front-card', index === 0);
      card.classList.toggle('real-back-card', index > 0);
      card.inert = index > 0; card.setAttribute('aria-hidden', String(index > 0));
      card.style.zIndex = String(3 - index);
      if (card.parentNode !== deck) deck.prepend(card);
    });
    for (const [id, card] of cards) if (!keep.has(id) && !card.classList.contains('is-leaving')) card.remove();
    count.textContent = `${api.state.bookmarked.size} selected`;
    next.disabled = api.state.bookmarked.size === 0;
  }

  function paint(card, dx) {
    const width = card.offsetWidth || 1, p = Math.max(-1, Math.min(1, dx / (width * RELEASE)));
    card.style.transform = `translateX(${dx}px) rotate(${dx * .035}deg)`;
    const yes = card.querySelector('.is-yes'), no = card.querySelector('.is-no');
    yes.style.opacity = String(Math.max(0, p)); no.style.opacity = String(Math.max(0, -p));
    const locked = Math.abs(p) >= 1 ? (p > 0 ? 1 : -1) : 0;
    if (locked !== (Number(card.dataset.locked) || 0)) {
      card.dataset.locked = String(locked);
      if (locked) navigator.vibrate?.(8);
    }
  }

  async function decide(id, dir) {
    const card = cards.get(id);
    if (busy || !card || !card.classList.contains('front-card')) return;
    busy = true;
    if (dir > 0) api.state.bookmarked.add(id); else dismissed.add(id);
    api.state.trackedId = dir > 0 ? id : api.state.trackedId;
    api.persist();
    // The card flies out the way it was decided; the mask shows the choice.
    card.classList.add('is-leaving'); card.dataset.locked = String(dir);
    card.querySelector(dir > 0 ? '.is-yes' : '.is-no').style.opacity = '1';
    const from = card.style.transform || 'none';
    card.style.transition = 'none';
    arrange();                                   // the next card comes to the front
    const width = root.clientWidth;
    await card.animate([{ transform: from }, { transform: `translateX(${dir * width * 1.25}px) rotate(${dir * 14}deg)` }],
      { duration: 300, easing: FLY, fill: 'forwards' }).finished.catch(() => {});
    card.remove(); card.classList.remove('is-leaving'); card.style.transform = ''; card.dataset.locked = '0';
    card.querySelectorAll('.swipe-mask').forEach(mask => { mask.style.opacity = ''; });
    cards.delete(id);
    busy = false;
    arrange();
    // Everything bookmarked: go straight on.
    if (dir > 0 && !queue().length && !dismissed.size) next.click();
  }

  deck.addEventListener('pointerdown', event => {
    const card = event.target.closest('.front-card');
    // Anywhere on the card drags, charts included.
    if (busy || !card || card.classList.contains('swipe-end') || event.button !== 0 || event.target.closest('button')) return;
    drag = { card, id: event.pointerId, x: event.clientX, y: event.clientY, axis: null, scale: root.getBoundingClientRect().width / root.clientWidth || 1 };
  });
  deck.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = (event.clientX - drag.x) / drag.scale, dy = (event.clientY - drag.y) / drag.scale;
    if (!drag.axis && Math.hypot(dx, dy) > 6) {
      drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (drag.axis === 'x') { drag.card.setPointerCapture(event.pointerId); drag.card.classList.add('is-dragging'); }
    }
    if (drag.axis === 'x') { event.preventDefault(); drag.dx = dx; paint(drag.card, dx); }
  });
  const release = event => {
    if (!drag || event.pointerId !== drag.id) return;
    const { card, dx = 0, axis } = drag; drag = null;
    card.classList.remove('is-dragging');
    if (axis !== 'x') return;
    const width = card.offsetWidth || 1;
    if (Math.abs(dx) >= width * RELEASE) { decide(card.dataset.thesis, dx > 0 ? 1 : -1); return; }
    // Not far enough: spring back.
    const from = card.style.transform;
    card.style.transform = ''; card.dataset.locked = '0';
    card.querySelectorAll('.swipe-mask').forEach(mask => { mask.animate([{ opacity: mask.style.opacity || 0 }, { opacity: 0 }], { duration: 220 }); mask.style.opacity = ''; });
    card.animate([{ transform: from }, { transform: 'none' }], { duration: 380, easing: BACK });
  };
  deck.addEventListener('pointerup', release);
  deck.addEventListener('pointercancel', release);
  root.addEventListener('keydown', event => {
    const front = deck.querySelector('.front-card');
    if (!front || front.classList.contains('swipe-end') || event.target.closest('input,textarea')) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); decide(front.dataset.thesis, 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); decide(front.dataset.thesis, -1); }
  });
  next.onclick = async () => {
    if (!api.state.bookmarked.size) return;
    next.disabled = true;
    await onNext?.();
    api.go('track');
  };
  arrange();
  root.cleanup = () => { drag = null; };
  return root;
}
