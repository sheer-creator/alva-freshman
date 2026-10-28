// Shared local demo state. No account, broker or operating-system permission is changed.
export const DEMO_STATE_KEY = 'alva.m-baby.thesis-demo.v1';
export const ONBOARDING_STATE_KEY = 'alva.m-baby.thesis-onboarding.v1';

export function stringSet(value) {
  if (value instanceof Set) return new Set([...value].filter(item => typeof item === 'string'));
  if (Array.isArray(value)) return new Set(value.filter(item => typeof item === 'string'));
  if (value && typeof value === 'object') return new Set(Object.keys(value).filter(key => value[key] === true));
  return new Set();
}

function storage() { try { return globalThis.localStorage; } catch { return null; } }
function read(key) {
  try { const value = JSON.parse(storage()?.getItem(key) || '{}'); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; } catch { return {}; }
}
function write(key, value) {
  try { storage()?.setItem(key, JSON.stringify(value, (_key, item) => item instanceof Set ? [...item] : item)); } catch { /* Storage may be unavailable in private browsing. */ }
}

export function readDemoState() {
  const state = read(DEMO_STATE_KEY);
  return { ...state, bookmarks: stringSet(state.bookmarks), followed: stringSet(state.followed), onboarding: state.onboarding || null };
}
export function persistDemoSelections(bookmarks, followed) {
  const shared = readDemoState(), nextFollowed = stringSet(followed);
  if (shared.onboarding) {
    // A later explicit change in For You belongs to that interaction, not to onboarding.
    shared.onboarding.addedFollowing = [...stringSet(shared.onboarding.addedFollowing)].filter(id => shared.followed.has(id) === nextFollowed.has(id));
  }
  write(DEMO_STATE_KEY, { ...shared, bookmarks: stringSet(bookmarks), followed: nextFollowed });
}
export function readOnboardingState() {
  const value = read(ONBOARDING_STATE_KEY);
  return { page: 'login', introComplete: false, thesisIndex: 0, ...value,
    following: stringSet(value.following), connections: stringSet(value.connections), bookmarked: stringSet(value.bookmarked) };
}
export function persistOnboardingState(state) { write(ONBOARDING_STATE_KEY, state); }
export function resetOnboardingState(restartToken) {
  const shared = readDemoState();
  for (const post of shared.onboarding?.posts || []) shared.bookmarks.delete(post.id);
  for (const personId of stringSet(shared.onboarding?.addedFollowing)) shared.followed.delete(personId);
  shared.onboarding = null;
  write(DEMO_STATE_KEY, shared);
  write(ONBOARDING_STATE_KEY, { restartToken });
}

// Explicit source IDs identify individual theses. An author's different theses
// never share a bookmark merely because their displayed names happen to match.
const SOURCE_AUTHORS = {
  '12552:205644': 'gavin',
  '12552:202166': 'satya',
  '12552:202172': 'sam',
  '12552:202176': 'warren',
  '12552:202178': 'satya',
};
export const onboardingPostId = sourceId => 'onboarding-' + String(sourceId).replace(/[^a-zA-Z0-9-]/g, '-');

export function createOnboardingHandoff(state, data, asset, baseUrl) {
  const selected = stringSet(state.bookmarked);
  const absoluteAsset = id => { const path = asset(id); return path ? new URL(path, baseUrl).href : ''; };
  const posts = data.theses.filter(item => selected.has(item.id)).map(item => ({
    id: onboardingPostId(item.id), sourceId: item.id, authorId: SOURCE_AUTHORS[item.id] || onboardingPostId(item.avatar),
    name: item.author, role: item.role, avatar: absoluteAsset(item.avatar),
    age: item.timestamp || '', date: item.timestamp || '', text: item.body,
    sources: item.sources || [], updateCount: 1, topics: [],
    tickers: (item.tickers || []).map(ticker => ({ symbol: ticker.symbol, logo: absoluteAsset(ticker.logo),
      stance: ticker.stance || 'neutral', directionImage: absoluteAsset(ticker.direction) })),
    charts: (item.charts || []).map(absoluteAsset),
    signals: item.id === '12552:205644' ? (data.signals || []).filter(signal => signal.url).map(signal => ({
      name: signal.source || signal.name, role: signal.role || '', time: signal.time || '',
      avatar: absoluteAsset(signal.avatar), text: signal.summary || signal.text || '',
      url: signal.url, verdict: signal.stance || signal.verdict, analysis: signal.analysis || '',
    })) : [],
    signalStatus: 'Tracking signals', signalNote: 'New signals for this bookmarked thesis will appear here.',
    hideCitations: true, fromOnboarding: true,
  }));
  const preference = ['allowed', 'denied', 'skipped'].includes(state.notifications) ? state.notifications : 'default';
  return { version: 1, posts, following: [...stringSet(state.following)], connections: [...stringSet(state.connections)],
    notification: { simulated: true, preference, thesisIds: posts.map(post => post.id), sourceThesisIds: posts.map(post => post.sourceId) } };
}

export function completeOnboarding(state, data, asset, baseUrl) {
  const handoff = createOnboardingHandoff(state, data, asset, baseUrl);
  if (!handoff.posts.length) return false;
  const shared = readDemoState();
  for (const post of shared.onboarding?.posts || []) shared.bookmarks.delete(post.id);
  for (const personId of stringSet(shared.onboarding?.addedFollowing)) shared.followed.delete(personId);
  handoff.addedFollowing = handoff.following.filter(personId => !shared.followed.has(personId));
  for (const post of handoff.posts) shared.bookmarks.add(post.id);
  for (const personId of handoff.following) shared.followed.add(personId);
  shared.onboarding = handoff;
  write(DEMO_STATE_KEY, shared);
  state.completed = true;
  persistOnboardingState(state);
  return true;
}

export function onboardingPosts() {
  const posts = readDemoState().onboarding?.posts;
  if (!Array.isArray(posts)) return [];
  return posts.filter(post => post && typeof post.id === 'string' && post.id.startsWith('onboarding-') &&
    typeof post.text === 'string' && Array.isArray(post.tickers) && Array.isArray(post.charts));
}
