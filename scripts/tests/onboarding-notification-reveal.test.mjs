import test from 'node:test';
import assert from 'node:assert/strict';
import { bindNotificationReveal } from '../../public/demo/m-baby/onboarding/notification-reveal.js';

class Target {
  listeners = new Map();
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
  }
  removeEventListener(type, callback) { this.listeners.get(type)?.delete(callback); }
  emit(type, values = {}) {
    const event = { preventDefault() { this.defaultPrevented = true; }, ...values };
    for (const callback of this.listeners.get(type) || []) callback(event);
    return event;
  }
  get listenerCount() { return [...this.listeners.values()].reduce((sum, listeners) => sum + listeners.size, 0); }
}

class Element extends Target {
  attributes = new Map();
  properties = new Map();
  captured = new Set();
  tabIndex = 0;
  constructor(doc) {
    super();
    this.ownerDocument = doc;
    this.style = { setProperty: (key, value) => this.properties.set(key, value) };
    const classes = new Set();
    this.classList = {
      remove: name => classes.delete(name),
      contains: name => classes.has(name),
      toggle: (name, value) => value ? classes.add(name) : classes.delete(name),
    };
  }
  setAttribute(key, value) { this.attributes.set(key, String(value)); }
  hasAttribute(key) { return this.attributes.has(key); }
  getAttribute(key) { return this.attributes.get(key); }
  focus() {
    if (this.ownerDocument.activeElement === this) return;
    this.ownerDocument.activeElement?.emit('blur');
    this.ownerDocument.activeElement = this;
    this.emit('focus');
  }
  setPointerCapture(id) { this.captured.add(id); }
  hasPointerCapture(id) { return this.captured.has(id); }
  releasePointerCapture(id) {
    this.captured.delete(id);
    this.emit('lostpointercapture', { pointerId: id });
  }
}

function fixture({ scale = 1, viewportHeight = 483, preference = 'default', reduced = false } = {}) {
  const view = new Target(), doc = { defaultView: view, activeElement: null };
  const observers = [];
  view.ResizeObserver = class {
    constructor(callback) { this.callback = callback; this.targets = []; observers.push(this); }
    observe(target) { this.targets.push(target); }
    disconnect() { this.disconnected = true; }
  };
  const root = new Element(doc), handle = new Element(doc), curtain = new Element(doc), viewport = new Element(doc);
  const layout = { scale, viewportTop: 255, viewportHeight, handleCenter: 255 + viewportHeight + 40, scroll: 0 };
  const origin = 17;
  const distance = () => parseFloat(root.properties.get('--notification-reveal')) || 0;
  const rect = (top, height) => ({ top: origin + top * layout.scale, bottom: origin + (top + height) * layout.scale, height: height * layout.scale });
  handle.offsetHeight = 40;
  handle.getBoundingClientRect = () => rect(layout.handleCenter - 20 - distance(), 40);
  viewport.offsetHeight = viewportHeight;
  viewport.getBoundingClientRect = () => rect(layout.viewportTop, layout.viewportHeight);
  curtain.offsetHeight = 1500;
  curtain.getBoundingClientRect = () => rect(layout.viewportTop - layout.scroll, curtain.offsetHeight);
  const state = { notifications: preference, bookmarked: new Set(['12552:205644', '12552:202166']) };
  const sheets = [], routes = [];
  const api = {
    state, reduced: () => reduced, persist() {},
    // Intentionally leave the page alive: a failed handoff must be retryable.
    go: page => routes.push(page),
    sheet(config) {
      const previousFocus = doc.activeElement;
      new Element(doc).focus();
      sheets.push({
        dismiss() { previousFocus?.focus(); },
        choose(label) { previousFocus?.focus(); config.actions.find(action => action.label === label).onClick(); },
      });
    },
  };
  const cleanup = bindNotificationReveal({ root, handle, curtain, viewport, api });
  const pointer = (x, y, id = 1) => ({ pointerId: id, isPrimary: true, button: 0, clientX: x, clientY: y });
  const restY = () => origin + layout.handleCenter * layout.scale;
  const travel = () => layout.handleCenter - layout.viewportTop;
  const begin = () => handle.emit('pointerdown', pointer(120, restY() - distance() * layout.scale));
  const drag = fraction => handle.emit('pointermove', pointer(120, restY() - travel() * fraction * layout.scale));
  return { root, handle, curtain, viewport, view, layout, observers, state, sheets, routes, cleanup, pointer, begin, drag, travel, distance, restY };
}

test('upward drag aligns the mask edge with the physical handle across Gallery scales', () => {
  for (const scale of [.5, .64, 1, 1.25]) for (const viewportHeight of [300, 483, 620]) {
    const f = fixture({ scale, viewportHeight });
    f.begin();
    for (const fraction of [.25, .5, .75, .91]) {
      f.drag(fraction);
      assert(Math.abs(f.distance() - fraction * f.travel()) < 1e-8);
      const bottomInset = Number(f.curtain.style.clipPath.match(/([\d.]+)px/)?.[1]);
      const actualEdge = f.curtain.getBoundingClientRect().bottom - bottomInset * scale;
      const button = f.handle.getBoundingClientRect();
      assert(Math.abs(actualEdge - (button.top + button.height / 2)) < 1e-8);
      assert.equal(f.sheets.length, 0);
    }
    f.handle.emit('pointerup', f.pointer(120, 0));
    assert.equal(f.distance(), 0);
    assert.equal(f.curtain.style.clipPath, 'inset(0)');
    f.cleanup();
  }
});

test('a horizontal gesture never moves the curtain, even if it later turns upward', () => {
  const f = fixture(); f.begin();
  f.handle.emit('pointermove', f.pointer(220, f.restY()));
  f.handle.emit('pointermove', f.pointer(220, f.restY() - 600));
  assert.equal(f.distance(), 0);
  assert.equal(f.sheets.length, 0);
  f.handle.emit('pointerup', f.pointer(220, 0));
  f.cleanup();
});

test('the initial footer gap remains blurred; long content stays aligned after scrolling', () => {
  const f = fixture({ scale: .64 }); f.begin();
  f.handle.emit('pointermove', f.pointer(120, f.restY() - 20 * .64));
  assert.equal(f.curtain.style.clipPath, 'inset(0)');
  f.drag(.5);
  const before = f.curtain.style.clipPath;
  f.layout.scroll = 320; f.viewport.emit('scroll');
  const inset = Number(f.curtain.style.clipPath.match(/([\d.]+)px/)?.[1]);
  assert.notEqual(f.curtain.style.clipPath, before);
  const button = f.handle.getBoundingClientRect();
  assert(Math.abs(f.curtain.getBoundingClientRect().bottom - inset * .64 - button.top - button.height / 2) < 1e-8);
  f.cleanup();
});

test('92% threshold opens once; dismissal resets and allows another attempt', async () => {
  const f = fixture(); f.begin(); f.drag(.919);
  assert.equal(f.sheets.length, 0);
  f.drag(.921); f.drag(1);
  await Promise.resolve();
  assert.equal(f.sheets.length, 1);
  assert.equal(f.curtain.style.clipPath, 'inset(0 0 100% 0)');
  assert.equal(f.handle.getAttribute('aria-disabled'), 'true');
  f.sheets[0].dismiss(); await Promise.resolve();
  assert.equal(f.distance(), 0);
  assert.equal(f.handle.getAttribute('aria-disabled'), 'false');
  f.begin(); f.drag(.95);
  assert.equal(f.sheets.length, 2);
  f.cleanup();
});

test('cancel, lost capture, handle blur and window blur all reset incomplete drags', () => {
  for (const event of ['pointercancel', 'lostpointercapture', 'blur', 'window-blur']) {
    const f = fixture(); f.begin(); f.drag(.5);
    if (event === 'window-blur') f.view.emit('blur'); else f.handle.emit(event, { pointerId: 1 });
    assert.equal(f.distance(), 0, event);
    assert.equal(f.handle.captured.size, 0, event);
    assert.equal(f.sheets.length, 0, event);
    f.cleanup();
  }
});

test('keyboard follows the vertical axis and supports reduced motion', async () => {
  const f = fixture({ reduced: true }); f.handle.focus();
  assert.equal(f.handle.getAttribute('aria-orientation'), 'vertical');
  assert(!f.handle.emit('keydown', { key: 'ArrowRight' }).defaultPrevented);
  assert.equal(f.distance(), 0);
  f.handle.emit('keydown', { key: 'ArrowUp' });
  assert.equal(f.handle.getAttribute('aria-valuenow'), '10');
  f.handle.emit('keydown', { key: 'PageUp' });
  assert.equal(f.handle.getAttribute('aria-valuenow'), '35');
  assert(!f.root.classList.contains('is-notification-settling'));
  f.handle.emit('keydown', { key: 'Home' });
  assert.equal(f.distance(), 0);
  f.handle.emit('keydown', { key: 'End' }); await Promise.resolve();
  assert.equal(f.sheets.length, 1);
  f.cleanup();
});

test('every completed upward gesture shows permission, including saved Allow and destination retries', async () => {
  for (const preference of ['default', 'allowed']) {
    const f = fixture({ preference });
    f.begin(); f.drag(.95); await Promise.resolve();
    assert.equal(f.sheets.length, 1); assert.deepEqual(f.routes, []);
    assert.equal(f.handle.getAttribute('aria-disabled'), 'true');
    f.sheets[0].choose('Allow'); await Promise.resolve();
    assert.equal(f.state.notifications, 'allowed');
    assert.equal(f.routes.length, 1);
    assert.equal(f.handle.getAttribute('aria-disabled'), 'false');
    f.handle.emit('keydown', { key: 'Enter' }); await Promise.resolve();
    assert.equal(f.sheets.length, 2); assert.equal(f.routes.length, 1);
    f.sheets[1].dismiss(); await Promise.resolve();
    assert.equal(f.distance(), 0); assert.equal(f.routes.length, 1);
    assert.equal(f.handle.getAttribute('aria-disabled'), 'false');
    f.begin(); f.drag(.95); await Promise.resolve();
    assert.equal(f.sheets.length, 3); assert.equal(f.routes.length, 1);
    f.sheets[2].choose('Don’t Allow'); await Promise.resolve();
    assert.equal(f.state.notifications, 'denied');
    assert.equal(f.routes.length, 2);
    assert.equal(f.curtain.style.clipPath, 'inset(0 0 100% 0)');
    assert.deepEqual([...f.state.bookmarked], ['12552:205644', '12552:202166']);
    f.cleanup();
  }
});

test('Deny reaches the feed; cleanup prevents stale permission actions and removes listeners', async () => {
  let f = fixture(); f.handle.emit('keydown', { key: 'Enter' }); await Promise.resolve();
  f.sheets[0].choose('Don’t Allow'); await Promise.resolve();
  assert.equal(f.state.notifications, 'denied');
  assert.deepEqual(f.routes, ['feed']); f.cleanup();
  f = fixture(); f.handle.emit('keydown', { key: 'Enter' }); await Promise.resolve(); f.cleanup();
  f.sheets[0].choose('Allow'); await Promise.resolve();
  assert.equal(f.state.notifications, 'default'); assert.deepEqual(f.routes, []);
  assert.equal(f.handle.listenerCount + f.viewport.listenerCount + f.view.listenerCount, 0);
  assert(f.observers[0].disconnected);
  f.cleanup();
});

test('resize remeasures the physical travel and observer callbacks are harmless after cleanup', () => {
  const f = fixture(); f.begin(); f.drag(.5);
  f.layout.viewportHeight = 400; f.layout.handleCenter = 695; f.viewport.offsetHeight = 400;
  f.observers[0].callback();
  assert.equal(f.distance(), (483 + 40) * .5);
  assert.equal(Number(f.root.properties.get('--notification-progress')), f.distance() / 440);
  f.cleanup(); const before = f.curtain.style.clipPath; f.observers[0].callback();
  assert.equal(f.curtain.style.clipPath, before);
});
