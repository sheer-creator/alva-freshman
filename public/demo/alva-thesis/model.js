import { THESES, FOCUSES, INTERESTS, UPDATES, DISCUSSION_POSTS, RELATED_THESES, AUTHORS } from './data.js?v=20260908-tracking';
import { ALVA_TRACKING } from './tracking.js?v=20260908-tracking';

export const STORAGE_KEY = 'alva_thesis_demo_v1';
export const freshState = () => ({ version: 1, onboarded: false, interests: [], followed: [], personal: [], replies: [], theme: 'dark' });
export const allTheses = state => [...state.personal, ...THESES];
export function authorProfile(id) {
  if (!Object.hasOwn(AUTHORS, id)) return null;
  const person = AUTHORS[id];
  if (!person) return null;
  const theses = THESES.filter(thesis => !thesis.curated && thesis.author === person.name);
  const grouped = new Map();
  UPDATES.filter(post => post.source.authorId === id).sort((a, b) => b.order - a.order).forEach(post => {
    const existing = grouped.get(post.sourceId);
    if (existing) existing.thesisIds.push(post.thesisId);
    else grouped.set(post.sourceId, { update: post, thesisIds: [post.thesisId] });
  });
  const posts = [...grouped.values()];
  // A source can start an idea and also appear in its discussion. Show it once.
  const activity = posts.map(entry => ({ ...entry, thesisIds: [...entry.thesisIds] }));
  for (const thesis of theses) {
    const existing = activity.find(entry => entry.update.sourceId === thesis.originSourceId);
    if (existing) {
      existing.thesisIds = [thesis.id, ...existing.thesisIds.filter(id => id !== thesis.id)];
    } else {
      activity.push({ thesis, thesisIds: [thesis.id] });
    }
  }
  activity.sort((a, b) => (b.update?.source.date || b.thesis.source.date).localeCompare(a.update?.source.date || a.thesis.source.date));
  const tickers = [...new Set(posts.flatMap(entry => entry.thesisIds.flatMap(id => THESES.find(thesis => thesis.id === id).tickers)))].filter(id => !INTERESTS.find(item => item.id === id)?.theme);
  const xPost = posts.find(entry => entry.update.source.url.startsWith('https://x.com/'));
  const source = xPost?.update.source || posts[0]?.update.source;
  const url = xPost ? new URL(source.url).origin + '/' + new URL(source.url).pathname.split('/')[1] : source?.url;
  return { id, person, theses, posts, activity, tickers, url, linkLabel: xPost ? '@' + new URL(source.url).pathname.split('/')[1] : 'Original source' };
}
export const getThesis = (state, id) => allTheses(state).find(thesis => thesis.id === id);
export const isResearchQuestion = text => /[?？]\s*$|^(what|why|how|when|whether|can |could |should |is |are |i want to (learn|understand)|我想了解|想了解|为什么|如何|是否)/i.test(text.trim());

function ideaTitle(text, source) {
  if (source && text.startsWith(source.premise)) return source.title;
  const sentence = text.split(/(?<=[.!?。！？])\s|\n/)[0];
  if (sentence.length <= 100) return sentence;
  const shortened = sentence.slice(0, 96);
  const boundary = shortened.lastIndexOf(' ');
  return shortened.slice(0, boundary > 60 ? boundary : 96) + '…';
}

export function readState(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.personal)) return freshState();
    const personal = parsed.personal.filter(item => item && typeof item.id === 'string' && /^personal-[a-zA-Z0-9-]+$/.test(item.id) &&
      typeof item.title === 'string' && typeof item.premise === 'string' &&
      item.author === 'You' && typeof item.authorNote === 'string' && typeof item.baseline === 'string' &&
      FOCUSES.includes(item.focus) && Number.isInteger(item.revision) && item.revision > 0 &&
      Array.isArray(item.tickers) && item.tickers.every(ticker => typeof ticker === 'string') &&
      typeof item.status === 'string' && typeof item.counter === 'string' && typeof item.checkpoint === 'string' &&
      Array.isArray(item.watching) && item.watching.every(value => typeof value === 'string') &&
      Array.isArray(item.evidence) && item.evidence.every(source => source && ['name', 'type', 'text'].every(key => typeof source[key] === 'string')) &&
      item.update && ['title', 'body', 'impact', 'label', 'time'].every(key => typeof item.update[key] === 'string'))
      .map(({ portrait, avatarUrl, source, ...item }) => item);
    const ids = new Set([...THESES, ...personal].map(item => item.id));
    return { version: 1, onboarded: parsed.onboarded === true,
      interests: Array.isArray(parsed.interests) ? [...new Set(parsed.interests.filter(id => INTERESTS.some(item => item.id === id)))] : [],
      followed: Array.isArray(parsed.followed) ? [...new Set(parsed.followed.filter(id => ids.has(id)))] : [],
      personal, replies: Array.isArray(parsed.replies) ? parsed.replies.filter(reply => reply &&
        typeof reply.id === 'string' && typeof reply.threadId === 'string' && typeof reply.text === 'string' &&
        reply.text.trim().length > 0 && reply.text.length <= 600).map(({id, threadId, text, thesisId}) => ({id, threadId, text, ...(ids.has(thesisId) ? {thesisId} : {})})) : [],
      theme: parsed.theme === 'light' ? 'light' : 'dark' };
  } catch { return freshState(); }
}

export function toggleFollow(state, id) {
  if (!getThesis(state, id)) return state;
  return { ...state, followed: state.followed.includes(id) ? state.followed.filter(value => value !== id) : [...state.followed, id] };
}

export function createPersonal(state, { idea, focus, id, sourceId = null, tickerId = null }) {
  const text = idea.trim();
  if (!text) throw new Error('Add your idea before starting a thesis.');
  if (text.length > 600) throw new Error('Keep your idea under 600 characters.');
  if (!FOCUSES.includes(focus)) throw new Error('Choose a tracking focus.');
  if (!/^personal-[a-zA-Z0-9-]+$/.test(id) || getThesis(state, id)) throw new Error('This thesis already exists.');
  const source = sourceId ? getThesis(state, sourceId) : null;
  if (sourceId && !source) throw new Error('The original thesis is no longer available.');
  if (tickerId && !INTERESTS.some(item => item.id === tickerId)) throw new Error('Choose a supported ticker or theme.');
  const tickers = source ? [...source.tickers] : tickerId ? [tickerId] : INTERESTS.filter(item => !item.theme &&
    new RegExp(`\\b${item.id}\\b|\\b${item.name}\\b`, 'i').test(text)).map(item => item.id);
  const thesis = {
    id, title: ideaTitle(text, source), premise: text, originalPremise: text,
    author: 'You', authorNote: 'Personal thesis · demo', initials: 'Y',
    tickers, direction: 'Your view', focus, revision: 1, origin: sourceId,
    status: source ? `Your angle: ${focus.toLowerCase()}.` : 'Your idea is saved. The evidence is still to be checked.',
    baseline: source ? `Starting from ${source.author}'s sample thesis. Your focus is ${focus.toLowerCase()}.` : 'This demo has not evaluated your idea against live evidence.',
    watching: [focus, 'Evidence that challenges your idea'],
    counter: source?.counter || 'Track evidence that challenges this idea; no invalidation threshold has been set.',
    checkpoint: source?.checkpoint || 'Identify the next relevant disclosure or event. No time limit has been assumed.',
    evidence: source ? structuredClone(source.evidence) : [],
    update: { label: 'Private thesis', tone: 'teal', title: 'Your idea, saved privately.', body: text,
      impact: '', time: 'On this device' },
  };
  return { ...state, onboarded: true, personal: [thesis, ...state.personal], followed: [...state.followed, id] };
}

export function revisePersonal(state, id, { idea, focus }) {
  const thesis = state.personal.find(item => item.id === id);
  if (!thesis) throw new Error('Create your own version to change a public thesis.');
  const text = idea.trim();
  if (!text || text.length > 600 || !FOCUSES.includes(focus)) throw new Error('Add an idea and choose a tracking focus.');
  const revised = { ...thesis, originalPremise: thesis.originalPremise || thesis.premise, title: ideaTitle(text, thesis), premise: text,
    focus, revision: thesis.revision + 1, watching: [focus, 'Evidence that challenges your idea'],
    status: `Your angle: ${focus.toLowerCase()}.`, prior: thesis.update,
    baseline: `Your tracking now prioritizes ${focus.toLowerCase()}. Preview a sample update to see how that changes the emphasis.`,
    update: { label: 'Tracking adjusted', tone: 'teal', title: 'Your next update will use this focus.', body: text,
      impact: `Watching ${focus.toLowerCase()}. Preview the next sample update to see the difference.`, time: 'Just adjusted · demo' } };
  return { ...state, personal: state.personal.map(item => item.id === id ? revised : item) };
}

export function previewNextUpdate(state, id) {
  const thesis = state.personal.find(item => item.id === id);
  if (!thesis || thesis.previewedRevision === thesis.revision) return state;
  const examples = {
    'Revenue & demand': { title: 'Demand is visible. Revenue conversion still needs proof.', body: 'Illustrative event: a customer reports higher usage without disclosing the revenue contribution. Your tracking now prioritizes conversion evidence over spending headlines.', impact: 'Next: look for paid usage and revenue together.' },
    'Risks & counterevidence': { title: 'The same event raises a different question for your view.', body: 'Illustrative event: a customer reports higher usage without disclosing the revenue contribution. Your tracking highlights the missing proof and looks for evidence that could weaken the idea.', impact: 'Next: check whether efficiency or weak monetization offsets demand.' },
    'Catalysts & timing': { title: 'The next disclosure becomes the checkpoint.', body: 'Illustrative event: a customer reports higher usage without disclosing the revenue contribution. Your tracking defers a conclusion and puts the next operating disclosure on the watch list.', impact: 'Next: compare the new disclosure with the open question.' },
  };
  const sample = thesis.origin ? examples[thesis.focus] : {
    title: `Your next update would focus on ${thesis.focus.toLowerCase()}.`,
    body: `This is a format preview for your idea: “${thesis.premise}” No live event or source has been evaluated.`,
    impact: 'A real run would connect new evidence to this idea and explain what changed.',
  };
  const revised = { ...thesis, previewedRevision: thesis.revision, prior: thesis.update, status: sample.impact,
    update: { ...sample, tone: 'teal', label: 'Your focus applied', time: 'Next update · simulated' } };
  return { ...state, personal: state.personal.map(item => item.id === id ? revised : item) };
}

export function rankedTheses(state) {
  return [...THESES].sort((a, b) => b.tickers.filter(id => state.interests.includes(id)).length - a.tickers.filter(id => state.interests.includes(id)).length);
}

export const thesisChoices = ticker => THESES.filter(thesis => thesis.tickers.includes(ticker));

export function discussionRelations(state, id) {
  const thesis = getThesis(state, id);
  if (!thesis) return [];
  const sources = new Set(thesisUpdates(state, id).map(post => post.sourceId).filter(Boolean));
  const direct = RELATED_THESES[id] || [];
  return allTheses(state).filter(other => other.id !== id && (
    direct.includes(other.id) || other.id === thesis.origin || other.origin === id ||
    thesisUpdates(state, other.id).some(post => post.sourceId && sources.has(post.sourceId))
  ));
}

export function completeOnboarding(state, { interests, selectedIds, ownIdeas = [] }) {
  const validInterests = [...new Set(interests.filter(id => INTERESTS.some(item => item.id === id)))];
  const available = THESES.filter(thesis => thesis.tickers.some(id => validInterests.includes(id))).map(thesis => thesis.id);
  let next = { ...state, onboarded: true, interests: validInterests,
    followed: [...new Set([...state.followed.filter(id => !available.includes(id)), ...selectedIds.filter(id => available.includes(id))])] };
  for (const own of ownIdeas.filter(item => validInterests.includes(item.tickerId))) {
    next = createPersonal(next, { ...own, focus: FOCUSES[0] });
  }
  return next;
}

export function thesisUpdates(state, id) {
  const thesis = getThesis(state, id);
  if (!thesis) return [];
  if (thesis.author !== 'You') return UPDATES.filter(update => update.thesisId === id).sort((a, b) => b.order - a.order);
  return [thesis.update, thesis.prior].filter(Boolean).map((update, index) => ({ ...update,
    id: `${id}-r${thesis.revision}-${index}`, thesisId: id, order: Number.MAX_SAFE_INTEGER - index,
    source: undefined, sourceId: undefined, avatarUrl: undefined, post: update.body,
    speaker: 'You', initials: 'Y', kind: thesis.revision - index > 1 ? 'author-update' : 'root', channel: 'Private thesis', action: 'Refine my tracking' }));
}

export function discussionPosts(state, id) {
  const updates = thesisUpdates(state, id);
  const native = DISCUSSION_POSTS.filter(post => post.thesisId === id);
  const replies = state.replies.filter(reply => reply.thesisId === id || [...updates, ...native, thesisRoot(state, id)].some(post => post && reply.threadId === replyThread(post)))
    .map((reply, index, replies) => ({ id: reply.id, thesisId: id, speaker: 'You', initials: 'Y', post: reply.text, kind: 'human', replyTo: reply.threadId, time: 'On this device', order: Number.MAX_SAFE_INTEGER - replies.length + index }));
  return [...updates, ...native, ...replies].sort((a, b) => b.order - a.order);
}

export function thesisRoot(state, id) {
  const thesis = getThesis(state, id);
  return thesis && { id: 'root-' + id, thesisId: id, speaker: thesis.author, initials: thesis.initials, avatarUrl: thesis.avatarUrl,
    post: thesis.originalPremise || thesis.statement || thesis.premise, time: thesis.source?.date || 'On this device', kind: 'root' };
}

export function toggleTicker(state, id) {
  if (!INTERESTS.some(item => item.id === id)) return state;
  return { ...state, interests: state.interests.includes(id) ? state.interests.filter(value => value !== id) : [...state.interests, id] };
}

export function setTracking(state, id, status) {
  if (!['active', 'paused'].includes(status)) return state;
  return { ...state, personal: state.personal.map(thesis => thesis.id === id ? { ...thesis, automation: { status, lastRun: thesis.automation?.lastRun || 'Not run yet' } } : thesis) };
}

export function simulateRun(state, id, outcome = 'empty') {
  return { ...state, personal: state.personal.map(thesis => thesis.id === id && thesis.automation?.status === 'active'
    ? { ...thesis, automation: { status: 'active', lastRun: outcome === 'failed' ? 'Source unavailable. Try again.' : 'No new material. Discussion unchanged.' } } : thesis) };
}

// Historical tracking replays belong to the detail view, not the delivery queue.
export function thesisActivity(state, id) {
  const thesis = getThesis(state, id);
  if (!thesis) return [];
  const tracking = thesis.author === 'You' ? [] : ALVA_TRACKING.filter(post => post.thesisId === id);
  return [...discussionPosts(state, id), ...tracking].sort((a, b) => b.order - a.order);
}
export const getUpdate = (state, thesisId, updateId) => [...thesisActivity(state, thesisId), thesisRoot(state, thesisId)].find(update => update?.id === updateId);

export const replyThread = update => update.sourceId || update.id;
export const threadReplies = (state, update) => [
  ...DISCUSSION_POSTS.filter(post => post.replyTo === update.id).map(post => ({...post, text:post.post})),
  ...state.replies.filter(reply => reply.threadId === replyThread(update)),
];
export function addReply(state, { thesisId, updateId, text, id }) {
  const update = getUpdate(state, thesisId, updateId);
  if (!update) throw new Error('This discussion is no longer available.');
  const body = text.trim();
  if (!body) throw new Error('Write a reply first.');
  if (body.length > 600) throw new Error('Keep your reply under 600 characters.');
  if (typeof id !== 'string' || !id || state.replies.some(reply => reply.id === id)) throw new Error('This reply already exists.');
  return { ...state, replies: [...state.replies, { id, threadId: replyThread(update), text: body, thesisId }] };
}

export function relatedTheses(state) {
  const direct = state.followed.flatMap(id => RELATED_THESES[id] || []);
  return rankedTheses(state).filter(thesis => !state.followed.includes(thesis.id) && (direct.includes(thesis.id) || thesis.tickers.some(id => state.interests.includes(id))));
}

export function feedEntries(state) {
  const grouped = new Map();
  const tickerOnly = state.interests.filter(ticker => !state.followed.some(id => getThesis(state,id)?.tickers.includes(ticker)))
    .flatMap(ticker => thesisUpdates(state,thesisChoices(ticker)[0]?.id).slice(0,2).map(post => ({...post, tickerContent:true})));
  [...state.followed.flatMap(id => discussionPosts(state, id)), ...tickerOnly]
    .sort((a, b) => b.order - a.order || a.id.localeCompare(b.id))
    .forEach(update => {
      const key = update.sourceId || update.id;
      const existing = grouped.get(key);
      if (existing) existing.thesisIds.push(update.thesisId);
      else grouped.set(key, { kind: 'update', thesisId: update.thesisId, thesisIds: [update.thesisId], update });
    });
  const chronological = [...grouped.values()];
  const category = entry => {
    const post = entry.update;
    if (post.speaker === 'You') return 'you';
    if (post.kind === 'agent') return 'agent';
    if (AUTHORS[post.source?.authorId]?.simulatedMember) return 'member';
    if (post.source?.kind.startsWith('X') && AUTHORS[post.source.authorId]?.publication.startsWith('@')) return 'x';
    if (post.source?.media) return 'media';
    return 'source';
  };
  const opening = chronological.filter(entry => category(entry) === 'you');
  for (const type of ['member', 'x', 'media', 'agent', 'source']) {
    const entry = chronological.find(entry => category(entry) === type);
    if (entry) opening.push(entry);
  }
  const updates = [...opening, ...chronological.filter(entry => !opening.includes(entry))];
  const suggestions = relatedTheses(state).slice(0, updates.length ? 2 : 3)
    .map(thesis => ({ kind: 'recommendation', thesisId: thesis.id, update: thesisUpdates(state, thesis.id)[0] }));
  if (!updates.length) return suggestions;
  const result = [...updates];
  suggestions.forEach((entry, index) => result.splice(Math.min(2 + index * 4, result.length), 0, entry));
  return result;
}

export function feedRefreshBatch(entries) {
  // Keep a varied opening, then release the remaining real posts in batches.
  return entries.filter(entry => entry.kind === 'update' && entry.update.speaker !== 'You')
    .slice(8).map(entry => entry.update.sourceId || entry.update.id);
}

export function feedDelivery(entries, pending, delivered = []) {
  const key = entry => entry.kind === 'update' ? entry.update.sourceId || entry.update.id : null;
  const byKey = new Map(entries.filter(entry => key(entry)).map(entry => [key(entry), entry]));
  const deliveredIds = [...new Set(delivered)];
  const arrivals = deliveredIds.map(id => byKey.get(id)).filter(Boolean);
  const nextBatch = pending.filter(id => byKey.has(id) && !deliveredIds.includes(id)).slice(0, 3);
  const remaining = entries.filter(entry => !pending.includes(key(entry)) && !deliveredIds.includes(key(entry)));
  return { entries: [...arrivals, ...remaining], nextBatch, count: nextBatch.length };
}

export function sourcePreviewType(source) {
  if (!source?.media) return null;
  if (source.kind.startsWith('X')) return 'x';
  if (source.kind.startsWith('Reddit')) return 'reddit';
  if (source.media.type === 'podcast') return 'podcast';
  if (source.media.type === 'video' && /youtube\.com|youtu\.be/.test(source.media.url)) return 'youtube';
  if (source.kind.startsWith('Podcast')) return 'podcast';
  return null;
}
