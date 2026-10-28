import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  stringSet, createOnboardingHandoff, completeOnboarding, readDemoState,
  persistDemoSelections, resetOnboardingState, onboardingPosts,
  readOnboardingState, persistOnboardingState, ONBOARDING_STATE_KEY, GUIDED_ONBOARDING_STATE_KEY, DEMO_STATE_KEY,
  createFreshOnboardingState, clearLegacyOnboardingState, TRACK_ONBOARDING_STATE_KEY, TRACK_LOGIN_FIRST_ONBOARDING_STATE_KEY,
} from '../../public/demo/m-baby/thesis-demo-state.js';

const root = new URL('../../public/demo/m-baby/onboarding/', import.meta.url);
const data = JSON.parse(fs.readFileSync(new URL('content.json', root)));
const manifest = JSON.parse(fs.readFileSync(new URL('assets/manifest.json', root)));
const asset = id => manifest[id] || '';
const base = 'http://localhost/demo/m-baby/onboarding/index.html';
const memory = new Map();
globalThis.localStorage = { getItem: key => memory.get(key) || null, setItem: (key, value) => memory.set(key, value), removeItem: key => memory.delete(key) };
const state = preference => ({ bookmarked: new Set(['12552:205644', '12552:202166']), following: new Set(['gavin', 'satya']), connections: new Set(['alpaca']), notifications: preference });

test('older persisted collection shapes recover without losing valid IDs', () => {
  assert.deepEqual([...stringSet({})], []);
  assert.deepEqual([...stringSet(['gavin', 'gavin'])], ['gavin']);
  assert.deepEqual([...stringSet({ gavin: true, satya: false })], ['gavin']);
  for (const value of [null, undefined, false, 1, 'gavin']) assert.equal(stringSet(value).size, 0);
});

test('handoff keeps exact thesis identity, content and its own signals', () => {
  for (const preference of ['allowed', 'denied', 'skipped']) {
    const handoff = createOnboardingHandoff(state(preference), data, asset, base);
    assert.deepEqual(handoff.posts.map(post => post.id), ['onboarding-12552-205644', 'onboarding-12552-202166']);
    assert.equal(handoff.posts[0].text, data.theses.find(item => item.id === '12552:205644').body);
    assert.equal(handoff.posts[0].signals.length, 3);
    assert.equal(handoff.posts[1].signals.length, 0);
    assert.match(handoff.posts[1].text, /\$75 billion.*34%/);
    assert.equal(handoff.notification.preference, preference);
    assert.equal(handoff.notification.simulated, true);
    assert.deepEqual(handoff.notification.thesisIds, handoff.posts.map(post => post.id));
    for (const post of handoff.posts) {
      assert.ok(post.avatar.startsWith('http://localhost/demo/m-baby/onboarding/assets/'));
      assert.ok(!post.text.match(/\[\d+\]/));
    }
  }
});

test('completion retains existing selections and refuses an empty bookmark set', async () => {
  memory.clear();
  assert.equal(completeOnboarding({ bookmarked: [] }, data, asset, base), false);
  persistDemoSelections(new Set(['tom-lee-spy']), new Set(['chamath']));
  assert.equal(completeOnboarding(state('denied'), data, asset, base), true);
  const shared = readDemoState();
  assert.ok(shared.bookmarks.has('tom-lee-spy'));
  assert.ok(shared.bookmarks.has('onboarding-12552-205644'));
  assert.equal(shared.bookmarks.has('gavin-nvda'), false);
  assert.ok(shared.followed.has('chamath'));
  assert.ok(shared.followed.has('satya'));
  const { POSTS } = await import('../../public/demo/m-baby/thesis-motion-data.js?v=4');
  assert.equal(POSTS.filter(post => !post.fromOnboarding).length, 11);
  assert.equal(POSTS.filter(post => post.fromOnboarding).length, 2);
  assert.ok(POSTS.some(post => post.id === 'gavin-nvda'));
  const { TICKERS } = await import('../../public/demo/m-baby/thesis-motion-ticker.js?v=3');
  assert.equal(TICKERS.get('AMZN').name, 'Amazon.com, Inc.');
  assert.ok(TICKERS.get('TSM'));
  resetOnboardingState('restart-fixture');
  assert.equal(onboardingPosts().length, 0);
  assert.ok(readDemoState().bookmarks.has('tom-lee-spy'));
  assert.equal(readDemoState().bookmarks.has('onboarding-12552-205644'), false);
});

test('all exported asset mappings resolve inside the page module', () => {
  for (const [id, path] of Object.entries(manifest)) assert.ok(fs.existsSync(fileURLToPath(new URL(path, root))), `${id}: ${path}`);
});

test('restart and re-completion only undo the current flow contribution', () => {
  memory.clear();
  persistDemoSelections(new Set(['tom-lee-spy']), new Set(['gavin', 'tom-lee']));
  completeOnboarding(state('skipped'), data, asset, base);
  assert.deepEqual(readDemoState().onboarding.addedFollowing, ['satya']);
  resetOnboardingState('preserve-existing');
  assert.deepEqual([...readDemoState().followed].sort(), ['gavin', 'tom-lee']);

  const first = state('denied'); first.following = new Set(['sam']);
  completeOnboarding(first, data, asset, base);
  const revised = state('allowed'); revised.following = new Set(['gavin']);
  completeOnboarding(revised, data, asset, base);
  assert.equal(readDemoState().followed.has('sam'), false);
  assert.equal(readDemoState().followed.has('gavin'), true);
  assert.equal(readDemoState().onboarding.notification.preference, 'allowed');
});

test('an explicit later follow in For You survives an onboarding restart', () => {
  memory.clear();
  completeOnboarding(state('denied'), data, asset, base);
  let shared = readDemoState(); shared.followed.delete('gavin');
  persistDemoSelections(shared.bookmarks, shared.followed);
  shared = readDemoState(); shared.followed.add('gavin');
  persistDemoSelections(shared.bookmarks, shared.followed);
  resetOnboardingState('keep-later-action');
  assert.equal(readDemoState().followed.has('gavin'), true);
  assert.equal(readDemoState().followed.has('satya'), false);
});

test('Guided starts fresh when the original flow has saved progress and selections', () => {
  memory.clear();
  const original = { ...state('allowed'), page: 'notifications', introComplete: true, thesisIndex: 3 };
  persistOnboardingState(original);
  const guided = readOnboardingState(GUIDED_ONBOARDING_STATE_KEY);
  assert.equal(guided.page, 'login');
  assert.equal(guided.introComplete, false);
  assert.equal(guided.bookmarked.size, 0);
  assert.equal(guided.following.size, 0);
  assert.equal(guided.connections.size, 0);

  guided.page = 'intro'; guided.guidedIntroStep = 2; guided.guidedIntroReadyStep = 1;
  guided.bookmarked.add('12552:202172');
  persistOnboardingState(guided, GUIDED_ONBOARDING_STATE_KEY);
  assert.equal(readOnboardingState().page, 'notifications');
  assert.deepEqual([...readOnboardingState().bookmarked], [...original.bookmarked]);
  assert.equal(readOnboardingState().guidedIntroStep, undefined);
  assert.equal(readOnboardingState(GUIDED_ONBOARDING_STATE_KEY).guidedIntroStep, 2);
  assert.equal(readOnboardingState(GUIDED_ONBOARDING_STATE_KEY).guidedIntroReadyStep, 1);
  assert.deepEqual([...readOnboardingState(GUIDED_ONBOARDING_STATE_KEY).bookmarked], ['12552:202172']);
});

test('completing Guided persists only its progress and hands off exact selected theses', () => {
  memory.clear();
  persistOnboardingState({ ...state('default'), page: 'people', introComplete: true });
  const guided = { ...state('denied'), page: 'notifications', bookmarked: new Set(['12552:202172']),
    previewThesisIds: ['12552:205644', '12552:202166'], guidedIntroStep: 3, guidedIntroReadyStep: 3 };
  assert.equal(completeOnboarding(guided, data, asset, base, GUIDED_ONBOARDING_STATE_KEY), true);
  assert.equal(readOnboardingState().completed, undefined);
  assert.equal(readOnboardingState().page, 'people');
  assert.equal(readOnboardingState(GUIDED_ONBOARDING_STATE_KEY).completed, true);
  const shared = readDemoState();
  assert.equal(shared.onboarding.stateKey, GUIDED_ONBOARDING_STATE_KEY);
  assert.deepEqual(shared.onboarding.posts.map(post => post.sourceId), ['12552:202172']);
  assert.deepEqual([...shared.bookmarks], ['onboarding-12552-202172']);
  assert.deepEqual(shared.onboarding.notification.sourceThesisIds, ['12552:202172']);
  assert.equal(shared.onboarding.posts[0].signals.length, 0);
});

test('restarting either variant leaves the other flow and its active handoff intact', () => {
  for (const [activeKey, otherKey] of [[GUIDED_ONBOARDING_STATE_KEY, ONBOARDING_STATE_KEY], [ONBOARDING_STATE_KEY, GUIDED_ONBOARDING_STATE_KEY]]) {
    memory.clear();
    persistDemoSelections(new Set(['tom-lee-spy']), new Set(['chamath']));
    const active = { ...state('skipped'), page: 'notifications', introComplete: true };
    completeOnboarding(active, data, asset, base, activeKey);
    persistOnboardingState({ ...state('allowed'), page: 'portfolio' }, otherKey);
    const activeSaved = memory.get(activeKey), sharedSaved = memory.get(DEMO_STATE_KEY);

    resetOnboardingState('restart-other', otherKey);
    assert.equal(memory.get(activeKey), activeSaved);
    assert.equal(memory.get(DEMO_STATE_KEY), sharedSaved);
    assert.equal(readOnboardingState(otherKey).page, 'login');
    assert.equal(readOnboardingState(otherKey).restartToken, 'restart-other');
    assert.equal(readOnboardingState(otherKey).bookmarked.size, 0);

    resetOnboardingState('restart-active', activeKey);
    assert.equal(readDemoState().onboarding, null);
    assert.deepEqual([...readDemoState().bookmarks], ['tom-lee-spy']);
    assert.deepEqual([...readDemoState().followed], ['chamath']);
    assert.equal(readOnboardingState(otherKey).restartToken, 'restart-other');
  }
});

test('a legacy untagged handoff belongs to the original flow on restart', () => {
  memory.clear();
  completeOnboarding(state('allowed'), data, asset, base);
  const legacy = JSON.parse(memory.get(DEMO_STATE_KEY));
  delete legacy.onboarding.stateKey;
  memory.set(DEMO_STATE_KEY, JSON.stringify(legacy));
  resetOnboardingState('guided-only', GUIDED_ONBOARDING_STATE_KEY);
  assert.equal(onboardingPosts().length, 2);
  resetOnboardingState('original-only');
  assert.equal(onboardingPosts().length, 0);
  assert.equal(readOnboardingState(GUIDED_ONBOARDING_STATE_KEY).restartToken, 'guided-only');
});

test('preview content cannot satisfy the minimum bookmark or enter For You', () => {
  memory.clear();
  const preview = { bookmarked: new Set(), previewThesisIds: data.theses.map(item => item.id), introComplete: true };
  assert.equal(completeOnboarding(preview, data, asset, base, GUIDED_ONBOARDING_STATE_KEY), false);
  assert.equal(readDemoState().onboarding, null);
  assert.equal(readDemoState().bookmarks.size, 0);
  assert.equal(readOnboardingState(GUIDED_ONBOARDING_STATE_KEY).completed, undefined);
});

test('fresh onboarding state owns its sets and never accesses storage', () => {
  const previousStorage = globalThis.localStorage;
  let accesses = 0;
  globalThis.localStorage = new Proxy({}, { get() { accesses++; throw new Error('Fresh state must not access storage'); } });
  try {
    const first = createFreshOnboardingState(), second = createFreshOnboardingState();
    assert.equal(first.page, 'login'); assert.equal(first.introComplete, false); assert.equal(first.thesisIndex, 0);
    for (const key of ['following', 'connections', 'bookmarked']) {
      assert(first[key] instanceof Set); assert(second[key] instanceof Set);
      first[key].add('first-only');
      assert.equal(second[key].size, 0);
    }
    first.page = 'notifications'; first.notifications = 'allowed'; first.guidedIntroStep = 3;
    assert.equal(second.page, 'login'); assert.equal(second.notifications, undefined); assert.equal(second.guidedIntroStep, undefined);
    assert.equal(accesses, 0);
  } finally { globalThis.localStorage = previousStorage; }
});

test('legacy cleanup removes saved progress and choices plus only its own feed contribution', () => {
  for (const stateKey of [ONBOARDING_STATE_KEY, GUIDED_ONBOARDING_STATE_KEY]) {
    memory.clear();
    persistDemoSelections(new Set(['tom-lee-spy']), new Set(['gavin', 'tom-lee']));
    const legacy = { ...state('allowed'), page: 'notifications', introComplete: true,
      guidedIntroStep: 3, guidedIntroReadyStep: 3, thesisIndex: 4, provider: 'Google', xImported: true };
    completeOnboarding(legacy, data, asset, base, stateKey);
    persistOnboardingState({ ...state('denied'), page: 'portfolio' }, TRACK_ONBOARDING_STATE_KEY);
    memory.set('unrelated-demo', 'keep-me');
    const shared = JSON.parse(memory.get(DEMO_STATE_KEY)); shared.unrelatedPreference = 'keep-me';
    memory.set(DEMO_STATE_KEY, JSON.stringify(shared));
    const trackSaved = memory.get(TRACK_ONBOARDING_STATE_KEY);

    clearLegacyOnboardingState(stateKey);
    assert.equal(memory.has(stateKey), false, 'remove the key instead of writing an empty state');
    assert.deepEqual(readOnboardingState(stateKey), createFreshOnboardingState());
    assert.equal(memory.get(TRACK_ONBOARDING_STATE_KEY), trackSaved);
    assert.equal(memory.get('unrelated-demo'), 'keep-me');
    assert.equal(readDemoState().onboarding, null);
    assert.deepEqual([...readDemoState().bookmarks], ['tom-lee-spy']);
    assert.deepEqual([...readDemoState().followed], ['gavin', 'tom-lee']);
    assert.equal(readDemoState().unrelatedPreference, 'keep-me');
    assert.equal(memory.has(stateKey), false, 'reading defaults must not recreate the removed key');
  }
});

test('legacy cleanup preserves another active variant, including persistent Track flows', () => {
  for (const activeKey of [ONBOARDING_STATE_KEY, GUIDED_ONBOARDING_STATE_KEY, TRACK_ONBOARDING_STATE_KEY, TRACK_LOGIN_FIRST_ONBOARDING_STATE_KEY]) {
    memory.clear();
    const clearKey = activeKey === ONBOARDING_STATE_KEY ? GUIDED_ONBOARDING_STATE_KEY : ONBOARDING_STATE_KEY;
    completeOnboarding({ ...state('allowed'), page: 'notifications' }, data, asset, base, activeKey);
    persistOnboardingState({ ...state('allowed'), page: 'notifications' }, clearKey);
    const activeSaved = memory.get(activeKey), sharedSaved = memory.get(DEMO_STATE_KEY);
    clearLegacyOnboardingState(clearKey);
    assert.equal(memory.has(clearKey), false);
    assert.equal(memory.get(activeKey), activeSaved);
    assert.equal(memory.get(DEMO_STATE_KEY), sharedSaved);
    assert.equal(readOnboardingState(activeKey).page, 'notifications');
    assert.equal(readOnboardingState(activeKey).notifications, 'allowed');
    resetOnboardingState('persistent-restart', activeKey);
    assert.equal(readOnboardingState(activeKey).restartToken, 'persistent-restart');
    assert.equal(readOnboardingState(activeKey).page, 'login');
    assert.equal(readDemoState().onboarding, null);
  }
});

test('legacy cleanup assigns an untagged old handoff only to the original flow', () => {
  memory.clear();
  completeOnboarding(state('allowed'), data, asset, base);
  const shared = JSON.parse(memory.get(DEMO_STATE_KEY)); delete shared.onboarding.stateKey;
  memory.set(DEMO_STATE_KEY, JSON.stringify(shared));
  clearLegacyOnboardingState(GUIDED_ONBOARDING_STATE_KEY);
  assert.equal(onboardingPosts().length, 2);
  clearLegacyOnboardingState(ONBOARDING_STATE_KEY);
  assert.equal(onboardingPosts().length, 0);
  assert.equal(memory.has(ONBOARDING_STATE_KEY), false);
});
