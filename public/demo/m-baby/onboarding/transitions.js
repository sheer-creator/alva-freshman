// Page motion follows the task relationship; horizontal movement belongs to card browsing.
// Durations follow docs/motion-spec.md: micro 120, presence 160/240, major transform 280.
const duration = { exit: 120, feedback: 160, content: 240, stage: 280 };
const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

export function transitionPages({ outgoing, incoming, from, to, backward = false }) {
  const animations = [];
  let settled = false, resolve;
  const finished = new Promise(done => { resolve = done; });
  const play = (element, keyframes, time = duration.content, delay = 0) => {
    if (!element) return;
    animations.push(element.animate(keyframes, { duration: time, delay, easing, fill: 'both' }));
  };
  const reveal = (selector, { delay = 0, time = duration.content, lift = 0, depth = false } = {}) => {
    const element = incoming.querySelector(selector);
    if (!element) return;
    play(element, [
      { opacity: 0, transform: `translateY(${lift}px) scale(${depth ? .985 : 1})` },
      { opacity: 1, transform: 'none' },
    ], time, delay);
  };
  const finish = () => {
    if (settled) return;
    settled = true;
    animations.forEach(animation => animation.cancel());
    incoming.removeEventListener('pointerdown', finish, true);
    incoming.removeEventListener('focusin', finish);
    incoming.removeAttribute('data-entering');
    resolve();
  };

  // Keep the device, background and navigation coordinates fixed throughout the flow.
  play(outgoing, [{ opacity: 1 }, { opacity: 0 }], duration.exit);
  play(incoming, [{ opacity: 0 }, { opacity: 1 }], duration.feedback);

  let relationship = 'task-change';
  if (backward) {
    // Returning revisits the current state; it must not look like undoing a save or tracking.
    relationship = 'revisit';
  } else if (from === 'login' && to === 'intro') {
    relationship = 'open-content';
    reveal('.intro-heading');
    incoming.querySelectorAll('.marquee-lane').forEach((lane, index) => {
      play(lane, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], duration.content, index * 40);
    });
  } else if (to === 'people') {
    reveal('.setup-heading');
    reveal('.setup-import', { delay: 40, lift: 8 });
    reveal('.setup-or-divider', { delay: 40, time: duration.feedback });
    reveal('.setup-people-list', { delay: 80, lift: 8 });
    reveal('.setup-dock', { delay: 80, time: duration.feedback });
  } else if (to === 'bookmark') {
    relationship = 'choose-theses';
    reveal('.intro-heading');
    // Present the deck as the next choice. People selections do not filter these candidates.
    reveal('.bookmark-deck', { lift: 8, depth: true, time: duration.stage });
    play(incoming.querySelector('.back-one'), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-4deg)' }], duration.stage, 40);
    play(incoming.querySelector('.back-two'), [{ transform: 'rotate(0deg)' }, { transform: 'rotate(4deg)' }], duration.stage, 40);
    reveal('.bookmark-controls', { delay: 80, time: duration.feedback });
    reveal('.page-footer', { delay: 80, time: duration.feedback });
  } else if (to === 'portfolio') {
    relationship = 'add-asset-context';
    // The visible candidate may be unsaved. Do not turn it into a saved thesis or a broker.
    reveal('.setup-heading');
    reveal('.setup-broker-list', { delay: 80, lift: 8 });
    reveal('.setup-dock', { delay: 80, time: duration.feedback });
  } else if (to === 'notifications') {
    const cards = incoming.querySelectorAll('.setup-tracked-thesis');
    relationship = 'confirm-tracking';
    cards.forEach((card, index) => {
      play(card, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], duration.content, index * 40);
      play(card.querySelector('.setup-tracking-status'), [{ opacity: 0 }, { opacity: 1 }], duration.feedback, 120 + index * 40);
    });
    // Actual saved content appears first, then its existing tracking status and the permission action.
    reveal('.setup-notification-icon', { delay: cards.length ? 80 : 0, time: duration.feedback });
    reveal('.setup-heading', { delay: cards.length ? 80 : 0 });
    reveal('.setup-tracked-more', { delay: 120, time: duration.feedback });
    reveal('.setup-notification-dock', { delay: cards.length ? 160 : 80, time: duration.feedback });
  }
  incoming.dataset.entering = relationship;
  // A deliberate tap or keyboard focus settles immediately; motion never queues the next action.
  incoming.addEventListener('pointerdown', finish, true);
  incoming.addEventListener('focusin', finish);
  Promise.all(animations.map(animation => animation.finished.catch(() => {}))).then(finish);
  return { finished, finish, cancel: finish };
}
