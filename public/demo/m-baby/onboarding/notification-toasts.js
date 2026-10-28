import { escapeHTML } from './ui.js';

// Approved one-sentence versions of the existing notificationPreview records.
// These are examples, never additions to the user's bookmarked thesis IDs.
const TOASTS = [
  { sourceId: '12616:149037', text: 'Riot Platforms announced a $9.1B compute deal.' },
  { sourceId: '12608:109265', text: 'TPUv8i has entered software bring-up, says SemiAnalysis.' },
  { sourceId: '12608:109341', text: 'Matt Bryson sees an opportunity for Marvell and TSMC.' },
  { sourceId: '12684:261624', text: 'Microsoft’s Azure revenue passed $75B, up 34%.' },
];
const BACK_ASSET = 'I12552:200909;3931:33522;12552:200937;4029:31573';

export function renderNotificationToastsPage(api) {
  const root = document.createElement('section');
  root.className = 'setup-page notification-toasts-page';
  root.setAttribute('aria-label', 'Get notifications');
  const knownIds = new Set([...(api.data.theses || []), ...(api.data.feed || [])].filter(thesis => thesis?.id && thesis.body).map(thesis => thesis.id));
  const selectedIds = [...(api.state.bookmarked || [])].filter(id => knownIds.has(id));
  const hasSelection = selectedIds.length > 0;
  api.state.notificationThesisIds = selectedIds;
  api.persist?.();
  const description = hasSelection
    ? 'Alva is now tracking signals for the theses you bookmarked. Get notifications so you don’t miss new opportunities.'
    : 'Bookmark theses to start tracking signals.';
  const logo = api.asset('Alva / Onboarding source') || new URL('./assets/alva-source-12646-154584.svg', import.meta.url).href;
  const arrow = api.asset(api.data.icons?.['arrow-left-l1'] || BACK_ASSET);
  root.innerHTML = `<header class="setup-topbar">
      <button type="button" class="setup-back" data-action="back" aria-label="Back"><img src="${escapeHTML(arrow)}" alt="" draggable="false"></button>
      <button type="button" class="setup-skip" data-action="skip">Skip</button>
    </header>
    <div class="notification-toasts-body">
      <div class="setup-heading"><h1>Don’t miss the next signal.</h1><p>${escapeHTML(description)}</p></div>
      ${hasSelection ? `<div class="notification-toasts-stage" role="region" aria-label="Notification previews" data-preview="true">
        ${TOASTS.map((toast, index) => `<article class="notification-toast" data-source-id="${toast.sourceId}" style="--toast-start-y:${-62 + index * 12}px;--toast-travel-y:${-150 + index * 96}px;--toast-start-scale:${1 - index * .04};z-index:${TOASTS.length - index}">
          <div class="notification-toast-content">
            <div class="notification-toast-header"><img class="notification-toast-logo" src="${escapeHTML(logo)}" alt="" draggable="false"><strong>Alva</strong><span>now</span></div>
            <p>${escapeHTML(toast.text)}</p>
          </div>
        </article>`).join('')}
      </div>` : ''}
    </div>
    <footer class="notification-toasts-dock">${hasSelection ? `
      <div class="notification-toasts-track">
        <span class="notification-toasts-label" aria-hidden="true">Slide to get notifications</span>
        <button type="button" class="notification-toasts-handle" aria-label="Slide to get notifications"><img src="${escapeHTML(arrow)}" alt="" draggable="false"></button>
      </div>` : '<button type="button" class="setup-enable" data-action="bookmark">Bookmark theses</button>'}
    </footer>`;
  let disposed = false;
  const listeners = [];
  const on = (selector, callback) => {
    const element = root.querySelector(selector);
    if (!element) return;
    const listener = () => { if (!disposed) callback(); };
    element.addEventListener('click', listener);
    listeners.push(() => element.removeEventListener('click', listener));
  };
  on('[data-action="back"]', () => api.go('portfolio'));
  on('[data-action="skip"]', () => {
    if (!hasSelection) { api.go('bookmark'); return; }
    api.state.notifications = 'skipped';
    api.persist?.();
    api.go('feed');
  });
  on('[data-action="bookmark"]', () => api.go('bookmark'));
  const cleanupGesture = hasSelection ? bindNotificationToasts({ root,
    handle: root.querySelector('.notification-toasts-handle'),
    track: root.querySelector('.notification-toasts-track'), api }) : () => {};
  root.cleanup = () => {
    if (disposed) return;
    disposed = true;
    listeners.forEach(remove => remove());
    cleanupGesture();
  };
  return root;
}

/** Guided notification preview: its horizontal gesture is independent of the
 * original onboarding's upward curtain gesture. */
export function bindNotificationToasts({ root, handle, track, api }) {
  const doc = root.ownerDocument;
  const view = doc?.defaultView || globalThis;
  const removers = [];
  let disposed = false, permissionOpen = false, distance = 0, gesture = null;
  let geometry = { scale: 1, travel: 0 };
  const listen = (target, type, callback, options) => {
    target?.addEventListener?.(type, callback, options);
    removers.push(() => target?.removeEventListener?.(type, callback, options));
  };
  const progress = () => geometry.travel > 0 ? distance / geometry.travel : 0;

  function measure() {
    root.classList.remove('is-toast-settling');
    const value = progress();
    const bounds = track.getBoundingClientRect();
    const width = track.clientWidth || track.offsetWidth || 0;
    const ratio = width > 0 ? bounds.width / width : 1;
    geometry = {
      scale: Number.isFinite(ratio) && ratio > 0 ? ratio : 1,
      travel: Math.max(0, width - (handle.offsetWidth || handle.clientWidth || 48) - 8),
    };
    distance = value * geometry.travel;
  }
  function paint(next, settling = false) {
    distance = Math.max(0, Math.min(geometry.travel, next));
    const value = progress();
    root.classList.toggle('is-toast-settling', settling && !api.reduced?.());
    root.style.setProperty('--notification-toast-drag', `${distance}px`);
    root.style.setProperty('--notification-toast-progress', String(value));
    handle.setAttribute('aria-valuenow', String(Math.round(value * 100)));
    handle.setAttribute('aria-valuetext', value === 1
      ? 'Notifications ready'
      : `${Math.round(value * 100)}% revealed. Slide to get notifications.`);
  }
  function releasePointer() {
    const active = gesture;
    gesture = null;
    if (active && handle.hasPointerCapture?.(active.id)) handle.releasePointerCapture(active.id);
  }
  function reset() {
    releasePointer();
    if (!disposed) paint(0, true);
  }
  function finish(preference) {
    if (disposed) return;
    permissionOpen = false;
    handle.setAttribute('aria-disabled', 'false');
    api.state.notifications = preference;
    api.persist?.();
    // The outgoing page stays usable if the Gallery cannot load For You.
    api.go('feed');
  }
  function openPermission() {
    if (disposed || permissionOpen || geometry.travel <= 0) return;
    releasePointer();
    handle.focus({ preventScroll: true });
    permissionOpen = true;
    handle.setAttribute('aria-disabled', 'true');
    paint(geometry.travel, true);
    // Replay the simulated system prompt even when a previous run chose Allow.
    api.sheet({
      title: '“Alva” Would Like to Send You Notifications',
      body: 'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.',
      actions: [
        { label: 'Don’t Allow', onClick() { finish('denied'); } },
        { label: 'Allow', primary: true, onClick() { finish('allowed'); } },
      ],
    });
  }

  handle.setAttribute('role', 'slider');
  handle.setAttribute('aria-orientation', 'horizontal');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  handle.setAttribute('aria-disabled', 'false');
  if (!handle.hasAttribute('aria-label')) handle.setAttribute('aria-label', 'Slide to get notifications');
  if (handle.tabIndex < 0) handle.tabIndex = 0;

  listen(handle, 'pointerdown', event => {
    if (disposed || permissionOpen || gesture || event.isPrimary === false || event.button !== 0) return;
    event.preventDefault();
    handle.focus({ preventScroll: true });
    measure();
    paint(distance);
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, start: distance, axis: null };
    handle.setPointerCapture(event.pointerId);
  });
  const updateGesture = event => {
    if (disposed || !gesture || event.pointerId !== gesture.id) return;
    gesture.lastX = event.clientX;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) >= 6 * geometry.scale) {
      gesture.axis = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
    }
    if (gesture.axis !== 'horizontal') return;
    // Compare physical coordinates at the end so Gallery scaling does not
    // leave a mathematically complete drag a fraction short through rounding.
    const endX = gesture.x + (geometry.travel - gesture.start) * geometry.scale;
    paint(event.clientX >= endX ? geometry.travel : gesture.start + dx / geometry.scale);
  };
  listen(handle, 'pointermove', updateGesture);
  listen(handle, 'pointerup', event => {
    if (disposed || !gesture || event.pointerId !== gesture.id) return;
    // A release can contain a newer pointer position than the last move.
    // Recheck it so reaching the end and then reversing never confirms early.
    updateGesture(event);
    if (gesture.axis === 'horizontal' && geometry.travel > 0 && distance === geometry.travel) openPermission();
    else reset();
  });
  const endGesture = event => {
    if (gesture && event.pointerId === gesture.id) reset();
  };
  listen(handle, 'pointercancel', endGesture);
  listen(handle, 'lostpointercapture', endGesture);
  listen(handle, 'keydown', event => {
    if (disposed || permissionOpen || event.altKey || event.ctrlKey || event.metaKey) return;
    const changes = { ArrowRight: .1, ArrowLeft: -.1 };
    if (!(event.key in changes) && !['Home', 'End', 'Enter', ' ', 'Escape'].includes(event.key)) return;
    event.preventDefault();
    releasePointer();
    measure();
    const value = ['Home', 'Escape'].includes(event.key) ? 0
      : ['End', 'Enter', ' '].includes(event.key) ? 1 : progress() + changes[event.key];
    paint(value * geometry.travel, true);
    if (['Enter', ' '].includes(event.key)) openPermission();
  });
  listen(handle, 'blur', () => { if (!disposed && !permissionOpen) reset(); });
  listen(view, 'blur', () => { if (!disposed && !permissionOpen) reset(); });
  listen(handle, 'focus', () => {
    // sheet() restores focus before running Allow/Deny. Only a dismissal
    // without a decision should return the preview to its stacked state.
    queueMicrotask(() => {
      if (disposed || !permissionOpen || doc?.activeElement !== handle) return;
      permissionOpen = false;
      handle.setAttribute('aria-disabled', 'false');
      reset();
    });
  });
  const resized = () => {
    if (disposed) return;
    measure();
    if (gesture) { gesture.x = gesture.lastX; gesture.start = distance; }
    paint(distance);
  };
  listen(view, 'resize', resized);
  const observer = typeof view.ResizeObserver === 'function' ? new view.ResizeObserver(resized) : null;
  observer?.observe(track);
  observer?.observe(handle);
  measure();
  paint(0);

  return () => {
    if (disposed) return;
    disposed = true;
    observer?.disconnect();
    removers.forEach(remove => remove());
    releasePointer();
  };
}
