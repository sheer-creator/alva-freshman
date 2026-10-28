/**
 * Bind the notification curtain to an upward drag.
 *
 * The caller owns content, Skip, the empty-selection guard and the visual copy.
 * `viewport` is the visible scrolling card region; `curtain` is its inert,
 * aria-hidden, opaque blur duplicate. The duplicate may be taller than the
 * viewport and scroll with the canonical content.
 *
 * CSS contract:
 *   handle { touch-action:none;
 *     transform:translateY(calc(-1 * var(--notification-reveal, 0px))); }
 *   root.is-notification-settling handle { transition:transform 200ms ease-out }
 *   root.is-notification-settling curtain { transition:clip-path 200ms ease-out }
 * Disable those transitions for prefers-reduced-motion. The module writes the
 * upward distance in px, --notification-progress (0..1), and curtain.clipPath.
 */
export function bindNotificationReveal({ root, handle, curtain, viewport, api }) {
  const doc = root.ownerDocument;
  const view = doc?.defaultView || globalThis;
  const removers = [];
  const threshold = .92;
  let disposed = false, permissionOpen = false, distance = 0;
  let geometry = { scale: 1, restCenter: 0, travel: 0 };
  let gesture = null;

  const listen = (target, type, callback, options) => {
    target?.addEventListener?.(type, callback, options);
    removers.push(() => target?.removeEventListener?.(type, callback, options));
  };
  const scaleOf = (element, rect) => {
    const height = element.offsetHeight || element.clientHeight;
    const ratio = height > 0 ? rect.height / height : 0;
    return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  };
  const progress = () => geometry.travel > 0 ? distance / geometry.travel : 0;

  function measure() {
    // Removing a pending return transition first makes a new gesture start
    // from the current target, rather than reading a moving intermediate frame.
    root.classList.remove('is-notification-settling');
    const area = viewport.getBoundingClientRect();
    const button = handle.getBoundingClientRect();
    const scale = scaleOf(viewport, area);
    const restCenter = button.top + button.height / 2 + distance * scale;
    geometry = { scale, restCenter, travel: Math.max(0, (restCenter - area.top) / scale) };
    distance = Math.min(distance, geometry.travel);
  }

  function syncCurtain() {
    if (disposed) return;
    const value = progress();
    if (value <= 0) { curtain.style.clipPath = 'inset(0)'; return; }
    if (value >= 1) { curtain.style.clipPath = 'inset(0 0 100% 0)'; return; }
    const area = viewport.getBoundingClientRect();
    const edge = geometry.restCenter - distance * geometry.scale;
    // The handle can begin below the content. Do not reveal content before
    // its centre reaches the viewport's lower edge.
    if (edge >= area.bottom) { curtain.style.clipPath = 'inset(0)'; return; }
    const mask = curtain.getBoundingClientRect();
    const boundary = Math.max(area.top, edge);
    const clipped = Math.min(mask.height, Math.max(0, mask.bottom - boundary));
    curtain.style.clipPath = `inset(0 0 ${clipped / scaleOf(curtain, mask)}px 0)`;
  }

  function paint(next, settling = false) {
    distance = Math.max(0, Math.min(geometry.travel, next));
    const value = progress();
    root.classList.toggle('is-notification-settling', settling && !api.reduced?.());
    root.style.setProperty('--notification-reveal', `${distance}px`);
    root.style.setProperty('--notification-progress', String(value));
    handle.setAttribute('aria-valuenow', String(Math.round(value * 100)));
    handle.setAttribute('aria-valuetext', value === 1
      ? 'Notifications ready'
      : `${Math.round(value * 100)}% revealed. Slide up to get notifications.`);
    syncCurtain();
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
    // Leave the control enabled if the destination fails to load; both the
    // first Allow and an already-allowed retry can try the handoff again.
    api.go(api.flow ? api.flow.next('notifications') : 'feed');
  }
  function openPermission() {
    if (disposed || permissionOpen || geometry.travel <= 0) return;
    releasePointer();
    handle.focus({ preventScroll: true });
    permissionOpen = true;
    handle.setAttribute('aria-disabled', 'true');
    paint(geometry.travel, true);
    if (api.state.notifications === 'allowed') { finish('allowed'); return; }
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
  handle.setAttribute('aria-orientation', 'vertical');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  handle.setAttribute('aria-disabled', 'false');
  if (!handle.hasAttribute('aria-label')) handle.setAttribute('aria-label', 'Slide up to get notifications');
  if (handle.tabIndex < 0) handle.tabIndex = 0;

  listen(handle, 'pointerdown', event => {
    if (disposed || permissionOpen || gesture || event.isPrimary === false || event.button !== 0) return;
    event.preventDefault();
    handle.focus({ preventScroll: true });
    measure();
    paint(distance);
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, lastY: event.clientY, start: distance, axis: null };
    handle.setPointerCapture(event.pointerId);
  });
  listen(handle, 'pointermove', event => {
    if (disposed || !gesture || event.pointerId !== gesture.id) return;
    gesture.lastY = event.clientY;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) >= 6 * geometry.scale) {
      gesture.axis = Math.abs(dy) > Math.abs(dx) ? 'vertical' : 'horizontal';
    }
    if (gesture.axis !== 'vertical') return;
    paint(gesture.start - dy / geometry.scale);
    if (progress() >= threshold) openPermission();
  });
  const endGesture = event => {
    if (gesture && event.pointerId === gesture.id) reset();
  };
  listen(handle, 'pointerup', endGesture);
  listen(handle, 'pointercancel', endGesture);
  listen(handle, 'lostpointercapture', endGesture);
  listen(handle, 'keydown', event => {
    if (disposed || permissionOpen || event.altKey || event.ctrlKey || event.metaKey) return;
    const changes = { ArrowUp: .1, ArrowDown: -.1, PageUp: .25, PageDown: -.25 };
    if (!(event.key in changes) && !['Home', 'End', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    releasePointer();
    measure();
    const value = event.key === 'Home' ? 0
      : ['End', 'Enter', ' '].includes(event.key) ? 1
        : progress() + changes[event.key];
    paint(value * geometry.travel, true);
    if (progress() >= threshold) openPermission();
  });
  listen(handle, 'blur', () => { if (!disposed && !permissionOpen) reset(); });
  listen(view, 'blur', () => { if (!disposed && !permissionOpen) reset(); });
  listen(handle, 'focus', () => {
    // sheet() restores focus before invoking its action. Wait for Allow/Deny
    // to complete; only dismissal without a decision resets the reveal.
    queueMicrotask(() => {
      if (disposed || !permissionOpen || doc?.activeElement !== handle) return;
      permissionOpen = false;
      handle.setAttribute('aria-disabled', 'false');
      reset();
    });
  });
  listen(viewport, 'scroll', syncCurtain, { passive: true });
  const resized = () => {
    if (disposed) return;
    measure();
    if (gesture) { gesture.y = gesture.lastY; gesture.start = distance; }
    paint(distance);
  };
  listen(view, 'resize', resized);
  const observer = typeof view.ResizeObserver === 'function' ? new view.ResizeObserver(resized) : null;
  observer?.observe(viewport);
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
