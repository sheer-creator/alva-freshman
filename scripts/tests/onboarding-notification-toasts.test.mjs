import test from 'node:test';
import assert from 'node:assert/strict';
import { bindNotificationToasts } from '../../public/demo/m-baby/onboarding/notification-toasts.js';
import fs from 'node:fs';
import { completeOnboarding, persistOnboardingState, readOnboardingState, readDemoState, ONBOARDING_STATE_KEY, GUIDED_ONBOARDING_STATE_KEY } from '../../public/demo/m-baby/thesis-demo-state.js';

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

const contentRoot = new URL('../../public/demo/m-baby/onboarding/', import.meta.url);
const data = JSON.parse(fs.readFileSync(new URL('content.json', contentRoot)));
const manifest = JSON.parse(fs.readFileSync(new URL('assets/manifest.json', contentRoot)));

function fixture({ scale = 1, trackWidth = 361, preference = 'default', reduced = false, handoff = false } = {}) {
  const view = new Target(), doc = { defaultView: view, activeElement: null };
  const observers = [];
  view.ResizeObserver = class {
    constructor(callback) { this.callback = callback; this.targets = []; observers.push(this); }
    observe(target) { this.targets.push(target); }
    disconnect() { this.disconnected = true; }
  };
  const root = new Element(doc), handle = new Element(doc), track = new Element(doc);
  const layout = { scale, trackLeft: 16, trackWidth };
  const origin = 23;
  const distance = () => parseFloat(root.properties.get('--notification-toast-drag')) || 0;
  const progress = () => Number(root.properties.get('--notification-toast-progress')) || 0;
  const rect = (left, width) => ({ x: origin + left * layout.scale, left: origin + left * layout.scale,
    right: origin + (left + width) * layout.scale, width: width * layout.scale,
    top: 700 * layout.scale, bottom: 756 * layout.scale, height: 56 * layout.scale });
  handle.offsetWidth = handle.clientWidth = 48;
  handle.getBoundingClientRect = () => rect(layout.trackLeft + 4 + distance(), 48);
  track.offsetWidth = track.clientWidth = trackWidth;
  track.getBoundingClientRect = () => rect(layout.trackLeft, layout.trackWidth);
  const state = { notifications: preference, bookmarked: new Set(['12552:205644', '12552:202166']),
    following: new Set(['gavin']), connections: new Set(),
    notificationThesisIds: ['12552:205644', '12552:202166'] };
  const sheets = [], routes = [], handoffs = [];
  const api = {
    state, reduced: () => reduced,
    persist() { if (handoff) persistOnboardingState(state, GUIDED_ONBOARDING_STATE_KEY); },
    go(page) {
      routes.push(page);
      if (handoff && page === 'feed') handoffs.push(completeOnboarding(state, data, id => manifest[id] || '',
        'https://example.test/demo/m-baby/onboarding/index.html?intro=guided', GUIDED_ONBOARDING_STATE_KEY));
    },
    sheet(config) {
      const previousFocus = doc.activeElement;
      new Element(doc).focus();
      sheets.push({
        dismiss() { previousFocus?.focus(); },
        choose(label) { previousFocus?.focus(); config.actions.find(action => action.label === label).onClick(); },
      });
    },
  };
  const cleanup = bindNotificationToasts({ root, handle, track, api });
  const pointer = (x, y = 720, id = 1) => ({ pointerId: id, isPrimary: true, button: 0, clientX: x, clientY: y });
  const restX = () => origin + (layout.trackLeft + 28) * layout.scale;
  const travel = () => layout.trackWidth - 48 - 8;
  const begin = () => handle.emit('pointerdown', pointer(restX() + distance() * layout.scale));
  const drag = fraction => handle.emit('pointermove', pointer(restX() + travel() * fraction * layout.scale));
  const release = fraction => handle.emit('pointerup', pointer(restX() + travel() * fraction * layout.scale));
  return { root, handle, track, view, layout, observers, state, sheets, routes, handoffs, cleanup, pointer, begin, drag, release, travel, distance, progress, restX };
}

test('horizontal drag follows the physical track at narrow, standard and wide Gallery scales', () => {
  for (const scale of [.5, .64, 1, 1.25]) for (const trackWidth of [288, 361, 398]) {
    const f = fixture({ scale, trackWidth });
    assert.equal(f.handle.getAttribute('aria-orientation'), 'horizontal');
    f.begin();
    for (const fraction of [.1, .25, .5, .75, .91]) {
      f.drag(fraction);
      assert(Math.abs(f.distance() - fraction * f.travel()) < 1e-8, `${scale}/${trackWidth}/${fraction}`);
      assert(Math.abs(f.progress() - fraction) < 1e-8);
      assert.equal(f.handle.getAttribute('aria-valuenow'), String(Math.round(fraction * 100)));
      const handle = f.handle.getBoundingClientRect(), track = f.track.getBoundingClientRect();
      assert(handle.left >= track.left + 4 * scale - 1e-8);
      assert(handle.right <= track.right - 4 * scale + 1e-8);
      assert.equal(f.sheets.length, 0);
    }
    f.release(.91);
    assert.equal(f.distance(), 0); assert.equal(f.progress(), 0); assert.equal(f.handle.captured.size, 0);
    assert(f.root.classList.contains('is-toast-settling'));
    f.cleanup();
  }
});

test('vertical intent stays locked out, while leftward and foreign-pointer input cannot advance', () => {
  let f = fixture(); f.begin();
  f.handle.emit('pointermove', f.pointer(f.restX(), 600));
  f.drag(.99);
  f.release(1);
  assert.equal(f.distance(), 0); assert.equal(f.sheets.length, 0); f.cleanup();
  f = fixture(); f.begin();
  f.handle.emit('pointermove', f.pointer(f.restX() - 100));
  assert.equal(f.distance(), 0);
  f.handle.emit('pointermove', f.pointer(f.restX() + 400, 720, 2));
  assert.equal(f.distance(), 0);
  f.handle.emit('pointerup', f.pointer(f.restX(), 720, 2));
  assert.equal(f.handle.captured.has(1), true);
  f.cleanup();
  for (const override of [{ isPrimary: false }, { button: 2 }]) {
    f = fixture(); f.handle.emit('pointerdown', { ...f.pointer(f.restX()), ...override }); f.drag(1);
    assert.equal(f.progress(), 0); assert.equal(f.sheets.length, 0); f.cleanup();
  }
});

test('only release at the physical end confirms; holding at 100% keeps the preview clear without opening a sheet', async () => {
  const f = fixture({ scale: .64 });
  for (const fraction of [.919, .92, .95, .999]) {
    f.begin(); f.drag(fraction);
    assert.equal(f.sheets.length, 0);
    f.release(fraction);
    assert.equal(f.progress(), 0); assert.equal(f.sheets.length, 0);
  }
  f.begin(); f.drag(1); await Promise.resolve();
  assert.equal(f.progress(), 1); assert.equal(f.sheets.length, 0);
  assert.equal(f.handle.getAttribute('aria-disabled'), 'false');
  assert.equal(f.handle.captured.has(1), true);
  f.drag(1.1); assert.equal(f.progress(), 1); assert.equal(f.sheets.length, 0);
  f.release(1); f.release(1); await Promise.resolve();
  assert.equal(f.sheets.length, 1); assert.equal(f.progress(), 1);
  assert.equal(f.handle.getAttribute('aria-disabled'), 'true');
  f.sheets[0].dismiss(); await Promise.resolve();
  assert.equal(f.progress(), 0); assert.equal(f.handle.getAttribute('aria-disabled'), 'false');
  f.begin(); f.drag(1); assert.equal(f.sheets.length, 1);
  f.release(1); assert.equal(f.sheets.length, 2); f.cleanup();
});

test('reversing from the end or releasing a different pointer cannot confirm, and release uses its latest position', () => {
  const f = fixture(); f.begin(); f.drag(1);
  f.handle.emit('pointerup', f.pointer(f.restX() + f.travel(), 720, 2));
  assert.equal(f.sheets.length, 0); assert.equal(f.handle.captured.has(1), true); assert.equal(f.progress(), 1);
  f.drag(.9); f.release(.9);
  assert.equal(f.sheets.length, 0); assert.equal(f.progress(), 0);

  f.begin(); f.drag(1); f.release(.75);
  assert.equal(f.sheets.length, 0); assert.equal(f.progress(), 0, 'a newer release position can cancel an apparent completed drag');

  f.begin(); f.drag(.75); f.release(1);
  assert.equal(f.sheets.length, 1); assert.equal(f.progress(), 1, 'the final release coordinate can reach the endpoint');
  f.cleanup();
});

test('cancel, capture loss, focus loss and window blur reset partial or complete held drags without confirming', () => {
  for (const event of ['pointercancel', 'lostpointercapture', 'blur', 'window-blur']) {
    for (const fraction of [.5, 1]) {
      const f = fixture(); f.begin(); f.drag(fraction);
      if (event === 'window-blur') f.view.emit('blur'); else f.handle.emit(event, { pointerId: 1 });
      f.release(1);
      assert.equal(f.distance(), 0, event); assert.equal(f.progress(), 0, event);
      assert.equal(f.handle.captured.size, 0, event); assert.equal(f.sheets.length, 0, event); f.cleanup();
    }
  }
});

test('keyboard uses the horizontal axis and reduced motion avoids settling transitions', async () => {
  const f = fixture({ reduced: true }); f.handle.focus();
  assert.equal(f.handle.getAttribute('aria-orientation'), 'horizontal');
  for (const key of ['ArrowUp', 'ArrowDown']) assert(!f.handle.emit('keydown', { key }).defaultPrevented);
  assert.equal(f.progress(), 0);
  f.handle.emit('keydown', { key: 'ArrowRight' }); assert.equal(f.handle.getAttribute('aria-valuenow'), '10');
  f.handle.emit('keydown', { key: 'ArrowRight' }); assert.equal(f.handle.getAttribute('aria-valuenow'), '20');
  f.handle.emit('keydown', { key: 'ArrowLeft' }); assert.equal(f.handle.getAttribute('aria-valuenow'), '10');
  assert(!f.root.classList.contains('is-toast-settling'));
  f.handle.emit('keydown', { key: 'Home' }); assert.equal(f.progress(), 0);
  f.handle.emit('keydown', { key: 'End' }); await Promise.resolve();
  assert.equal(f.progress(), 1); assert.equal(f.sheets.length, 0);
  f.handle.emit('keydown', { key: 'ArrowLeft' }); assert.equal(f.handle.getAttribute('aria-valuenow'), '90');
  f.handle.emit('keydown', { key: 'ArrowRight' }); assert.equal(f.handle.getAttribute('aria-valuenow'), '100');
  assert.equal(f.sheets.length, 0);
  f.handle.emit('keydown', { key: 'Escape' }); assert.equal(f.progress(), 0);
  f.handle.emit('keydown', { key: 'End' }); assert.equal(f.sheets.length, 0);
  f.handle.emit('keydown', { key: ' ' }); await Promise.resolve(); assert.equal(f.sheets.length, 1); f.cleanup();
});

test('every complete horizontal release shows permission, including saved Allow and destination retries', async () => {
  for (const preference of ['default', 'allowed']) {
    const f = fixture({ preference });
    f.begin(); f.drag(1); await Promise.resolve();
    assert.equal(f.sheets.length, 0); assert.deepEqual(f.routes, []);
    f.release(1); await Promise.resolve();
    assert.equal(f.sheets.length, 1); assert.deepEqual(f.routes, []);
    assert.equal(f.handle.getAttribute('aria-disabled'), 'true');
    f.sheets[0].choose('Allow'); await Promise.resolve();
    assert.equal(f.state.notifications, 'allowed'); assert.deepEqual(f.routes, ['feed']);
    assert.equal(f.handle.getAttribute('aria-disabled'), 'false');
    f.handle.emit('keydown', { key: 'Enter' }); await Promise.resolve();
    assert.equal(f.sheets.length, 2); assert.deepEqual(f.routes, ['feed']);
    f.sheets[1].dismiss(); await Promise.resolve();
    assert.equal(f.progress(), 0); assert.deepEqual(f.routes, ['feed']);
    assert.equal(f.handle.getAttribute('aria-disabled'), 'false');
    f.begin(); f.drag(1); f.release(1); await Promise.resolve();
    assert.equal(f.sheets.length, 3); assert.deepEqual(f.routes, ['feed']);
    f.sheets[2].choose('Don’t Allow'); await Promise.resolve();
    assert.equal(f.state.notifications, 'denied'); assert.deepEqual(f.routes, ['feed', 'feed']);
    assert.equal(f.progress(), 1); assert.deepEqual([...f.state.bookmarked], ['12552:205644', '12552:202166']); f.cleanup();
  }
});

test('Deny hands off normally; cleanup prevents stale sheet decisions and removes all observers/listeners', async () => {
  let f = fixture(); f.handle.emit('keydown', { key: 'Enter' }); await Promise.resolve();
  f.sheets[0].choose('Don’t Allow'); await Promise.resolve();
  assert.equal(f.state.notifications, 'denied'); assert.deepEqual(f.routes, ['feed']); f.cleanup();
  f = fixture(); f.handle.emit('keydown', { key: 'Enter' }); await Promise.resolve(); f.cleanup();
  f.sheets[0].choose('Allow'); await Promise.resolve();
  assert.equal(f.state.notifications, 'default'); assert.deepEqual(f.routes, []);
  assert.equal(f.handle.listenerCount + f.track.listenerCount + f.view.listenerCount, 0);
  assert(f.observers[0].disconnected); f.cleanup();
});

test('resize preserves reveal progress and rebases the active finger without a jump', () => {
  const f = fixture(); f.begin(); f.drag(.5);
  const lastX = f.restX() + f.travel() * .5;
  f.layout.trackWidth = 288; f.track.offsetWidth = f.track.clientWidth = 288;
  f.observers[0].callback();
  assert.equal(f.distance(), f.travel() * .5); assert.equal(f.progress(), .5);
  f.handle.emit('pointermove', f.pointer(lastX));
  assert.equal(f.progress(), .5, 'the unchanged physical finger must not change reveal after resize');
  f.layout.scale = .64; f.view.emit('resize');
  f.handle.emit('pointermove', f.pointer(lastX));
  assert.equal(f.progress(), .5, 'changing Gallery scale does not itself advance the slider');
  f.handle.emit('pointermove', f.pointer(lastX + 10 * .64));
  assert(Math.abs(f.distance() - (f.travel() * .5 + 10)) < 1e-8);
  f.cleanup(); const style = [...f.root.properties]; f.observers[0].callback(); f.view.emit('resize');
  assert.deepEqual([...f.root.properties], style);
});

test('permission completion persists Guided only and hands off actual bookmarks, never toast preview examples', async () => {
  for (const decision of ['Allow', 'Don’t Allow']) {
    const memory = new Map();
    globalThis.localStorage = { getItem: key => memory.get(key) || null, setItem: (key, value) => memory.set(key, value) };
    persistOnboardingState({ page: 'people', bookmarked: new Set(['12552:202166']), notifications: 'default' }, ONBOARDING_STATE_KEY);
    const original = memory.get(ONBOARDING_STATE_KEY);
    const f = fixture({ handoff: true });
    f.state.bookmarked = new Set(['12552:202172']);
    f.state.notificationThesisIds = ['12552:202172'];
    f.state.previewThesisIds = data.notificationPreview.theses.map(item => item.id);
    f.handle.emit('keydown', { key: 'Enter' }); await Promise.resolve(); f.sheets[0].choose(decision); await Promise.resolve();
    assert.deepEqual(f.handoffs, [true]); assert.equal(memory.get(ONBOARDING_STATE_KEY), original);
    assert.equal(readOnboardingState(GUIDED_ONBOARDING_STATE_KEY).completed, true);
    const shared = readDemoState();
    assert.equal(shared.onboarding.stateKey, GUIDED_ONBOARDING_STATE_KEY);
    assert.deepEqual(shared.onboarding.notification.sourceThesisIds, ['12552:202172']);
    assert.deepEqual(shared.onboarding.posts.map(post => post.sourceId), ['12552:202172']);
    assert.equal(shared.onboarding.posts[0].signals.length, 0);
    assert.deepEqual([...shared.bookmarks], ['onboarding-12552-202172']);
    assert.equal(shared.onboarding.notification.preference, decision === 'Allow' ? 'allowed' : 'denied'); f.cleanup();
  }
});
