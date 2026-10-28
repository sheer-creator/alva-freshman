import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  stringSet, createOnboardingHandoff, completeOnboarding, readDemoState,
  persistDemoSelections, resetOnboardingState, onboardingPosts,
} from '../../public/demo/m-baby/thesis-demo-state.js';

const root = new URL('../../public/demo/m-baby/onboarding/', import.meta.url);
const data = JSON.parse(fs.readFileSync(new URL('content.json', root)));
const manifest = JSON.parse(fs.readFileSync(new URL('assets/manifest.json', root)));
const asset = id => manifest[id] || '';
const base = 'http://localhost/demo/m-baby/onboarding/index.html';
const memory = new Map();
globalThis.localStorage = { getItem: key => memory.get(key) || null, setItem: (key, value) => memory.set(key, value) };
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
