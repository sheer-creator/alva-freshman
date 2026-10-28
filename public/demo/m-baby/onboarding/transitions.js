// Page motion follows the task relationship; Intro owns its three heading transitions.
// Durations follow docs/motion-spec.md: micro 120, presence 160/240, major transform 280.
const duration = { exit: 120, feedback: 160, content: 240, stage: 280 };
const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

export function transitionPages({ outgoing, incoming, from, to, backward = false }) {
  const animations = [];
  let settled = false, resolve;
  const finished = new Promise(done => { resolve = done; });
  const play = (element, keyframes, time = duration.content, delay = 0, ease = easing) => {
    if (!element) return;
    animations.push(element.animate(keyframes, { duration: time, delay, easing: ease, fill: 'both' }));
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
    incoming.querySelectorAll('.marquee-lane').forEach((lane, index) => {
      play(lane, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], duration.content, index * 40);
    });
  } else if (to === 'people') {
    reveal('.setup-heading');
    reveal('.setup-import', { delay: 40, lift: 8 });
    reveal('.setup-or-divider', { delay: 40, time: duration.feedback });
    reveal('.setup-dock', { delay: 80, time: duration.feedback });
  } else if (to === 'pick') {
    relationship = 'choose-theses';
    reveal('.intro-heading');
    reveal('.bookmark-deck', { lift: 8, depth: true, time: duration.stage });
  } else if (to === 'track') {
    // The bookmarked card stays where the deck left it; the Track page runs its own entrance.
    relationship = 'open-content';
  } else if (to === 'login') {
    reveal('.setup-login-heading');
    reveal('.setup-login-main', { delay: 40, lift: 8 });
  } else if (to === 'bookmark') {
    relationship = 'choose-theses';
    reveal('.intro-heading');
    // Present the deck as the next choice. People selections do not filter these candidates.
    reveal('.bookmark-deck', { lift: 8, depth: true, time: duration.stage });
    reveal('.page-footer', { delay: 80, time: duration.feedback });
  } else if (to === 'portfolio') {
    relationship = 'add-asset-context';
    // The visible candidate may be unsaved. Do not turn it into a saved thesis or a broker.
    reveal('.setup-heading');
    reveal('.setup-dock', { delay: 80, time: duration.feedback });
  } else if (to === 'notifications') {
    relationship = 'confirm-tracking';
    reveal('.setup-heading');
    // Reveal the collection as a group: its size must not lengthen navigation.
    reveal('.setup-notification-stream', { delay: 40, lift: 8 });
    reveal('.setup-notification-dock', { delay: 80, time: duration.feedback });
  }
  // Rows arrive in reading order, including revisits. Animate each row once,
  // without also moving its list container or changing any selection state.
  const rowSelector = to === 'people' ? '.setup-person' : to === 'portfolio' ? '.setup-broker' : null;
  if (rowSelector) incoming.querySelectorAll(rowSelector).forEach((row, index) => {
    play(row, [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'none' },
    ], duration.feedback, 80 + index * 60, 'ease-out');
  });
  incoming.dataset.entering = relationship;
  // A deliberate tap or keyboard focus settles immediately; motion never queues the next action.
  incoming.addEventListener('pointerdown', finish, true);
  incoming.addEventListener('focusin', finish);
  Promise.all(animations.map(animation => animation.finished.catch(() => {}))).then(finish);
  return { finished, finish, cancel: finish };
}
