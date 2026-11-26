import { ASSETS, INTERESTS, FOCUSES, SOURCES, AUTHORS, RELATED_THESES } from './data.js?v=20260908-tracking';
import { STORAGE_KEY, freshState, readState, allTheses, getThesis, toggleFollow, createPersonal, revisePersonal, previewNextUpdate, rankedTheses, thesisChoices, completeOnboarding, feedEntries, thesisUpdates, getUpdate, addReply, threadReplies, discussionPosts, thesisActivity, thesisRoot, toggleTicker, setTracking, simulateRun, isResearchQuestion, discussionRelations, authorProfile, feedRefreshBatch, feedDelivery, sourcePreviewType } from './model.js?v=20260908-tracking';
import { mountMarket } from './market.js?v=20260908-tracking';
import { RESEARCH_TABS, RESEARCH, EXTERNAL_PEERS, INVESTOR_AUTHORS, tickerViewPosts } from './research.js?v=20260908-tracking';

const $ = selector => document.querySelector(selector);
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const icon = name => `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${({
  back: '<path d="m14 5-7 7 7 7"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>', check: '<path d="m5 12 4 4L19 6"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  chat: '<path d="M21 11.5a8.5 8.5 0 0 1-12 7.7L3 21l1.8-6a8.5 8.5 0 1 1 16.2-3.5Z"/><path d="M8 11h8M8 14h5"/>',
  feed: '<rect x="4" y="3" width="13" height="18" rx="2"/><path d="M8 8h5M8 12h5M20 7v11a3 3 0 0 1-3 3"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  theme: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4M9 9h6v6H9Z"/>',
  source: '<path d="M7 3h8l4 4v14H7zM15 3v5h4M10 12h6M10 16h6"/>',
  trail: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 7v10m2-12h4a6 6 0 0 1 6 5"/>',
  thesis: '<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M8 3v18M3 7h4M3 12h4M3 17h4M11 8h6M11 12h6"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',
  audio: '<path d="M4 10v4M8 6v12M12 3v18M16 6v12M20 10v4"/>',
  youtube: '<path fill="currentColor" stroke="none" d="M22 7.1a3 3 0 0 0-2.1-2.2C18 4.4 12 4.4 12 4.4s-6 0-7.9.5A3 3 0 0 0 2 7.1a31 31 0 0 0 0 9.8 3 3 0 0 0 2.1 2.2c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 0-9.8Z"/><path fill="white" stroke="none" d="m10 8 6 4-6 4Z"/>',
  podcast: '<circle cx="12" cy="10" r="2" fill="currentColor" stroke="none"/><path d="M10 21 9 15a3 3 0 0 1 6 0l-1 6Z" fill="currentColor" stroke="none"/><path d="M5.6 17.4a9 9 0 1 1 12.8 0M7.5 13.2a5.5 5.5 0 1 1 9 0" stroke-linecap="round"/>',
  play: '<path d="m9 5 11 7-11 7Z"/>',
  external: '<path d="M14 4h6v6m0-6L10 14M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
})[name] || ''}</svg>`;

let storageUnavailable = false;
let state;
try { state = readState(localStorage.getItem(STORAGE_KEY)); } catch { state = freshState(); storageUnavailable = true; }
let selections = [...state.interests];
let draft = { idea: '', focus: FOCUSES[0], sourceId: null, editingId: null };
let activeRoute = '';
let pickerTicker = null;
let sheetCloseTimer;
let ownTicker = null;
let selectedTheses = [...state.followed];
let ownIdeas = [];
let sheetReturnFocus = null;
let followNoticeTimer;
let refreshPending = null;
let refreshDelivered = [];
let refreshAnnounced = false;
let refreshBusy = false;
let refreshTimer;
let refreshNoticeTimer;
let pullStart = null;
let pullDistance = 0;
let disposeMarket;
const tickerViews = new Map();
const scrollPositions = new Map();
const conversations = new Map();
const chatDrafts = new Map();
const navigation = [];

function persist(next) {
  state = next;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { storageUnavailable = true; }
  applyTheme();
}
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.style.colorScheme = state.theme;
  $('meta[name="theme-color"]').content = state.theme === 'light' ? '#F6F6F6' : '#15161A';
  document.querySelectorAll('[data-action="theme"]').forEach(button => button.classList.toggle('on', button.dataset.theme === state.theme));
}
function route() { return location.hash.replace(/^#\/?/, '') || (state.onboarded ? 'home' : 'welcome'); }
function go(next) {
  if (route() === next) { render(); return; }
  navigation.push(route());
  location.hash = '#/' + next;
}
function token(id) {
  const interest = INTERESTS.find(item => item.id === id);
  return `<a class="small-chip" href="#/ticker/${encodeURIComponent(id)}" data-action="ticker" data-id="${escape(id)}">${interest && !interest.theme ? `<span class="logo-circle"><img src="${ASSETS}tickers/${interest.logo}" alt=""></span>` : ''}${escape(id)}</a>`;
}
function avatar(thesis) { return `<span class="avatar ${thesis.initials === 'a' ? 'alva' : thesis.author === 'You' ? '' : 'creator'}" aria-hidden="true">${thesis.avatarUrl || thesis.portrait ? `<img src="${escape(thesis.avatarUrl || ASSETS + 'people/' + thesis.portrait)}" alt="">` : escape(thesis.initials)}</span>`; }
function profileAvatar(person) {
  const id = Object.keys(AUTHORS).find(id => AUTHORS[id].name === person.author);
  return id ? `<a class="profile-avatar-link" href="#/profile/${id}" data-action="profile" data-id="${id}" aria-label="View ${escape(person.author)}'s profile">${avatar(person)}</a>` : avatar(person);
}
function author(thesis, stance = false) {
  return `<div class="author-row">${avatar(thesis)}<div><div class="author-name">${escape(thesis.author)}</div><div class="author-note">${escape(thesis.authorNote)}</div></div>${stance ? `<span class="stance ${thesis.direction === 'Cautious' ? 'cautious' : ''}">${escape(thesis.direction)}</span>` : ''}</div>`;
}
function followButton(thesis) {
  const following = state.followed.includes(thesis.id);
  return `<button class="follow-button ${following ? 'following' : ''}" data-action="follow" data-id="${escape(thesis.id)}" aria-pressed="${following}" aria-label="${following ? 'Unfollow' : 'Follow'} ${escape(thesis.title)}">${following ? 'Following' : 'Follow'}</button>`;
}
function compactThesis(thesis, { action = 'detail', selected = false } = {}) {
  const label = escape(thesis.author + ': ' + thesis.title);
  return `<button type="button" class="thesis-line ${action === 'inspire' ? 'inspiration-option' : ''}" data-action="${action}" data-id="${thesis.id}" title="${label}" aria-label="${label}" ${['inspire','ticker-filter'].includes(action) ? `aria-pressed="${selected}"` : ''}>${avatar(thesis)}<span class="thesis-line-text"><b>${escape(thesis.author)}:</b> ${escape(thesis.title)}</span>${action === 'ticker-filter' ? `<span class="filter-check" aria-hidden="true">${selected ? icon('check') : ''}</span>` : icon('chevron')}</button>`;
}
function header(title, { back = false, right = '' } = {}) {
  return `<header class="topbar">${back ? `<button class="icon-button" data-action="back" aria-label="Back">${icon('back')}</button><span class="page-label">${escape(title)}</span>` : title ? `<h1>${escape(title)}</h1>` : ''}<span class="spacer"></span>${right}</header>`;
}
function demoLabel() { return `${storageUnavailable ? '<div class="storage-warning" role="status">Storage is unavailable. Changes last only for this session.</div>' : ''}`; }
function context(thesis, label = 'Following this idea') {
  return `<button class="context-link" data-action="detail" data-id="${thesis.id}">${escape(thesis.title)}</button>`;
}
function identityBadge(kind) {
  if (kind === 'member') return '<span class="member-badge" role="img" aria-label="Alva verified user" title="Alva verified user">' + icon('check') + '</span>';
  return kind === 'agent'
    ? '<span class="identity-badge agent-badge" title="Alva agent · scripted demo">Agent</span>'
    : '<span class="identity-badge" title="From public sources · not an Alva account">Public source</span>';
}
function sourceByline(source) {
  const kind = source.kind.split(' · ')[0];
  return kind === 'X' ? kind : (source.publisher || AUTHORS[source.authorId].publication) + ' · ' + kind;
}
function sourceHeader(source, topic = '') {
  const person = AUTHORS[source.authorId];
  const date = new Date(source.date).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
  return '<div class="source-byline"><div class="source-identity"><a class="profile-name-link" href="#/profile/' + source.authorId + '" data-action="profile" data-id="' + source.authorId + '"><strong>' + escape(person.name) + '</strong></a>' + identityBadge(person.simulatedMember ? 'member' : 'public') + '</div><time datetime="' + source.date + '">' + escape(date) + '</time>' + (topic || '<span class="source-meta">' + escape(sourceByline(source)) + '</span>') + '</div>';
}
function sourceBody(source) {
  return '<p class="post-body">' + (source.quote ? '“' : '') + escape(source.originalExcerpt || source.text) + (source.quote ? '”' : '') + '</p>';
}
function sourceAttachment(source) {
  if (!source?.kind.startsWith('X')) return mediaPreview(source, source?.originalExcerpt || source?.quote ? 'Excerpt' : 'Summary');
  return source.media?.type === 'image' ? `<a class="x-attachment" href="${escape(source.url)}" target="_blank" rel="noopener noreferrer" aria-label="View image in original X post"><img src="${escape(source.media.url)}" alt="${escape(source.media.label)}" loading="lazy"></a>` : '';
}
function nestedSource(id) {
  const source = SOURCES[id], person = AUTHORS[source.authorId];
  return '<a class="quoted-source" href="' + escape(source.url) + '" target="_blank" rel="noopener noreferrer"><div>' + avatar({author:person.name,avatarUrl:person.avatarUrl}) + '<strong>' + escape(person.name) + '</strong>' + identityBadge(person.simulatedMember ? 'member' : 'public') + '<span>' + escape(sourceByline(source)) + '</span></div>' + sourceBody(source) + '</a>';
}
function thesisReference(thesis) {
  return '<button class="post-thesis" data-action="detail" data-id="' + thesis.id + '"><b>' + escape(thesis.tickers.find(id => state.interests.includes(id)) || thesis.tickers[0] || 'Private') + '</b><span>' + escape(thesis.author === 'You' ? 'Your thesis' : thesis.pickerTitle) + '</span>' + icon('chevron') + '</button>';
}
function thesisAttachment(thesis, compact = false, related = '') {
  const tickers = thesis.tickers.filter(id => !INTERESTS.find(item => item.id === id)?.theme);
  if (compact) return '<div class="post-context" data-action="detail" data-id="' + thesis.id + '"><a class="thesis-context" href="#/thesis/' + encodeURIComponent(thesis.id) + '" data-action="detail" data-id="' + thesis.id + '" aria-label="View thesis: ' + escape(thesis.title) + '"><span class="context-tickers">' + tickers.map(token).join('') + '</span> <span class="context-copy">' + escape(thesis.title) + '</span></a>' + related + '</div>';
  return '<div class="thesis-attachment"><div class="thesis-meta">' + tickers.map(token).join('') + '<span>Thesis</span></div><button class="thesis-statement" data-action="detail" data-id="' + thesis.id + '">' + escape(thesis.statement || thesis.premise) + '</button><p class="thesis-credit">' + (thesis.author === 'You' ? 'Your view' : 'Alva summary · based on ' + escape(thesis.author)) + '</p></div>';
}
function askAlva(thesisId, updateId = '') {
  return `<button class="ask-alva" data-action="ask" data-id="${escape(thesisId)}" data-update="${escape(updateId)}" aria-label="Ask Alva privately" title="Ask Alva privately">${avatar({author:'Alva',initials:'a'})}</button>`;
}
function mediaPreview(source, treatment = '') {
  const type = sourcePreviewType(source);
  if (!type) return '';
  const media = source.media, picture = media.type === 'image';
  if (type === 'x') {
    const person = AUTHORS[source.authorId];
    const handle = '@' + new URL(source.url).pathname.split('/')[1];
    return `<a class="x-post-preview" href="${escape(source.url)}" target="_blank" rel="noopener noreferrer" aria-label="View original post by ${escape(person.name)} on X"><span class="x-post-identity">${avatar({author:person.name,avatarUrl:person.avatarUrl})}<span><strong>${escape(person.name)}</strong><small>${escape(handle)}</small></span><span class="x-wordmark" aria-hidden="true">𝕏</span></span><span class="x-post-excerpt"><span>${escape(source.title)}</span><span class="media-thumb"><img src="${escape(media.url)}" alt="" loading="lazy"></span></span><span class="x-post-footer"><time>${escape(source.date)}</time><span>View on X ${icon('external')}</span></span></a>`;
  }
  const label = {x:'X', reddit:'Reddit', youtube:'YouTube', podcast:'Podcast'}[type];
  return `<a class="media-preview source-${type} ${picture ? 'image-preview' : ''}" href="${escape(picture ? source.url : media.url)}" target="_blank" rel="noopener noreferrer" aria-label="${picture ? 'View' : 'Watch'} ${escape(source.title)}"><span class="media-thumb">${picture || media.thumbnail ? `<img src="${escape(picture ? media.url : media.thumbnail)}" alt="" loading="lazy">` : ''}${picture ? '' : icon(type === 'podcast' ? 'audio' : 'play')}</span><span class="media-copy"><small class="source-platform">${['youtube', 'podcast'].includes(type) ? icon(type) : ''}${label}${source.publisher ? ' · ' + escape(source.publisher) : ''}${treatment ? ' · ' + escape(treatment) : ''}</small><strong>${escape(picture ? source.title : media.label)}</strong>${picture ? '' : `<small>${escape(media.chapter)}</small>`}</span>${icon('external')}</a>`;
}
function inlineSource(source) {
  return `<a class="post-source" href="${escape(source.url)}" target="_blank" rel="noopener noreferrer" title="${escape(source.title)}">${escape(source.publisher || AUTHORS[source.authorId]?.publication || source.title)} ${icon('external')}</a>`;
}
function replyRow(name, text, evidenceId) {
  const evidence = SOURCES[evidenceId];
  return '<div class="alva-reply' + (name === 'You' ? ' user-reply' : '') + '"><div class="reply-rail">' + avatar({author:name,initials:name === 'Alva' ? 'a' : 'Y'}) + '</div><div class="reply-main"><div class="reply-heading">' + escape(name) + identityBadge(name === 'Alva' ? 'agent' : 'member') + '</div><p>' + escape(text) + '</p>' + (evidence ? sourcePreviewType(evidence) ? mediaPreview(evidence) : '<div class="reply-sources">' + inlineSource(evidence) + '</div>' : '') + '</div></div>';
}
function postTopic(thesis, related = '') {
  return '<div class="post-topic"><a class="parent-thesis" href="#/thesis/' + encodeURIComponent(thesis.id) + '" data-action="detail" data-id="' + escape(thesis.id) + '" aria-label="View tracked thesis: ' + escape(thesis.title) + '" title="' + escape(thesis.title) + '">' + icon('thesis') + '<span>' + escape(thesis.title) + '</span></a>' + related + '</div>';
}
function postFooter(thesis, source, treatment = source?.originalExcerpt || source?.quote ? 'Excerpt' : 'Summary', hasSourceCard = false) {
  const tickers = thesis.tickers.filter(id => !INTERESTS.find(item => item.id === id)?.theme);
  return '<div class="post-footer"><span class="context-tickers">' + tickers.map(token).join('') + '</span>' + (source && !hasSourceCard ? '<a class="post-source" href="' + escape(source.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Open original source: ' + escape(source.title) + '" title="' + escape(source.title) + '"><span>' + escape(source.kind.startsWith('X') ? '𝕏' : sourceByline(source)) + ' · ' + escape(treatment) + '</span>' + icon('external') + '</a>' : '') + '</div>';
}
function evidenceCitation(update) {
  const source = SOURCES[update.evidenceId];
  if (!source) return '';
  return `<details class="evidence-citation"><summary>${icon('source')} ${escape(update.evidenceType)} · ${escape(source.title)} ${icon('chevron')}</summary><p>${escape(source.text)}</p><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.date)} · Original source ↗</a></details>`;
}
function speakerHeader(update, topic = '') {
  return `<div class="source-byline"><div class="source-identity"><strong>${escape(update.speaker)}</strong>${identityBadge(update.speaker === 'Alva' ? 'agent' : 'member')}</div><time>${escape(update.time)}</time>${topic}</div>`;
}
function thesisHeader(thesis) {
  return thesis.curated || thesis.author === 'You' ? speakerHeader(thesisRoot(state, thesis.id)) : sourceHeader(SOURCES[thesis.originSourceId], ' ');
}
function updateCard(thesis, update, thesisIds = [thesis.id], profileContext = false) {
  if (update.trackingType) return trackingCard(thesis, update);
  const source = update.source;
  const count = threadReplies(state, update).length;
  const showTake = source && update.inlineInsight && update.impact && !profileContext;
  const attachment = sourceAttachment(source);
  const parent = update.replyTo ? discussionPosts(state, thesis.id).find(post => post.id === update.replyTo || post.sourceId === update.replyTo) : null;
  const origin = update.kind === 'root' && getThesis(state, thesis.origin);
  const topic = profileContext ? `<div class="profile-discussion-context"><span>In discussion</span>${postTopic(getThesis(state, thesisIds[0]))}${thesisIds.length > 1 ? `<details class="more-context"><summary>+${thesisIds.length - 1} related discussions</summary>${thesisIds.slice(1).map(id => postTopic(getThesis(state,id))).join('')}</details>` : ''}</div>` : parent ? `<div class="post-topic"><button class="parent-thesis" data-action="locate" data-id="${thesis.id}" data-update="${escape(parent.id)}">${icon('chat')}<span>${escape(parent.speaker)}: ${escape(parent.post)}</span></button></div>` : origin ? postTopic(origin) : update.kind === 'root' || route() === 'thesis/' + thesis.id ? ' ' : postTopic(thesis);
  return '<article class="feed-card' + (showTake ? ' has-reply' : '') + '" id="post-' + escape(update.id) + '" data-update="' + escape(update.id) + '"' + (source ? ' data-source="' + update.sourceId + '"' : '') + '>' +
    '<div class="social-post"><div class="post-rail">' + profileAvatar({author:update.speaker,initials:update.initials,avatarUrl:update.avatarUrl}) + '</div><div class="post-main">' +
    (source ? sourceHeader(source, topic) + sourceBody(source) : speakerHeader(update, topic) + (update.kind === 'author-update' ? '<span class="privacy-note">Author update</span>' : '') + (update.kind === 'root' ? `<button class="post-body thesis-body-link" data-action="detail" data-id="${thesis.id}">${escape(update.post || update.body)}</button>` : '<p class="post-body">' + escape(update.post || update.body) + '</p>')) +
    attachment + evidenceCitation(update) + postFooter(thesis, source, undefined, Boolean(attachment) && !source.kind.startsWith('X')) + '</div></div>' +
    (showTake ? replyRow('Alva', update.impact, update.takeEvidenceId) : '') +
    '<div class="post-actions card-actions"><button data-action="discussion" data-id="' + thesis.id + '" data-update="' + escape(update.id) + '">' + icon('chat') + (count ? 'Replies · ' + count : 'Reply') + '</button>' + askAlva(thesis.id, update.id) + '</div></article>';
}
function trackingBody(update) {
  return `<div class="tracking-kind">${icon(update.trackingType === 'audit' ? 'thesis' : 'source')}<span>${escape(update.category)}</span><span class="tracking-demo">Demo replay</span></div>
    <h3 class="tracking-title">${escape(update.title)}</h3>
    ${update.verdict ? `<p class="tracking-verdict">${escape(update.verdict)}</p>` : ''}
    <p class="tracking-copy">${escape(update.post)}</p>
    ${update.gap ? `<details class="tracking-gap"><summary>What’s still unproven</summary><p>${escape(update.gap)}</p></details>` : ''}
    <div class="tracking-next"><span>Watching next</span><p>${escape(update.next)}</p></div>
    <div class="tracking-sources">${update.evidenceIds.map(id => {
      const source = SOURCES[id];
      return `<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer" title="${escape(source.title)}">${icon('source')}<span>${escape(source.publisher || AUTHORS[source.authorId]?.publication || source.title)} · ${escape(source.date)}</span>${icon('external')}</a>`;
    }).join('')}</div>`;
}
function trackingCard(thesis, update) {
  const count = threadReplies(state, update).length;
  return `<article class="feed-card tracking-card tracking-${update.trackingType}" id="post-${escape(update.id)}" data-update="${escape(update.id)}"><div class="social-post"><div class="post-rail">${avatar({author:'Alva',initials:'a'})}</div><div class="post-main">${speakerHeader(update)}${trackingBody(update)}</div></div><div class="post-actions card-actions"><button data-action="discussion" data-id="${thesis.id}" data-update="${update.id}">${icon('chat')}${count ? 'Replies · ' + count : 'Reply'}</button>${askAlva(thesis.id,update.id)}</div></article>`;
}
function showDiscussion(thesis, update) {
  const attachment = sourceAttachment(update.source);
  showSheet('Replies', '<div class="discussion">' +
    (update.trackingType ? speakerHeader(update) + trackingBody(update) : update.source ? sourceHeader(update.source, ' ') + sourceBody(update.source) : speakerHeader(update) + '<p class="post-body">' + escape(update.post) + '</p>') +
    attachment + postTopic(thesis) + evidenceCitation(update) + postFooter(thesis, update.source, undefined, Boolean(attachment) && !update.source.kind.startsWith('X')) + (update.inlineInsight && update.impact ? replyRow('Alva', update.impact, update.takeEvidenceId) : '') +
    '<div class="discussion-replies" aria-live="polite">' + threadReplies(state, update).map(reply => replyRow(reply.speaker || 'You', reply.text) + evidenceCitation(reply)).join('') + '</div>' +
    '<form id="reply-form" data-id="' + thesis.id + '" data-update="' + escape(update.id) + '"><label class="sr-only" for="reply-input">Your reply</label><textarea id="reply-input" rows="3" maxlength="600" placeholder="Add your perspective…"></textarea><p class="error" id="reply-error" role="alert" hidden></p><div class="reply-form-footer"><button type="button" class="text-button" data-action="add-thesis" data-id="' + thesis.id + '">Add thesis</button><button type="submit" class="picker-done">Reply</button></div></form>' +
    '</div>');
}
function recommendation(thesis) {
  const interest = thesis.tickers.find(id => state.interests.includes(id)) || thesis.tickers[0];
  return '<article class="recommendation"><p class="recommendation-label">Discover a thesis · ' + escape(interest) + '</p><div class="social-post">' + avatar(thesis) + '<div class="post-main">' + thesisHeader(thesis) + '<button class="recommended-view thesis-body-link" data-action="detail" data-id="' + thesis.id + '">' + escape(thesis.statement || thesis.title) + '</button>' + postFooter(thesis) + '<div class="recommendation-footer"><button class="text-button" data-action="detail" data-id="' + thesis.id + '">Read discussion ' + icon('arrow') + '</button>' + followButton(thesis) + '</div></div></div></article>';
}
function timeline(thesis, compact = false) {
  return '<div class="timeline">' + thesisUpdates(state, thesis.id).slice(compact && thesis.author !== 'You' ? 1 : 0).map(update => '<article class="timeline-item"><span class="time">' + escape(update.time) + '</span>' +
    (compact && update.source ? '' : '<h3>' + escape(update.title) + '</h3>') +
    (update.source ? '<a class="trail-source" href="' + escape(update.source.url) + '" title="' + escape(update.source.title) + '" target="_blank" rel="noopener noreferrer">' + avatar({author:update.speaker,avatarUrl:update.avatarUrl}) + '<span>' + escape(update.speaker) + (compact ? '' : '<small>' + escape(update.source.title) + '</small>') + '</span>' + icon('external') + '</a><p>' + escape(update.impact) + '</p>' : '<p>' + escape(update.body) + '</p>') + '</article>').join('') + '</div>';
}
function angleOptions(ticker) {
  return thesisChoices(ticker).map(thesis => {
    const selected = selectedTheses.includes(thesis.id);
    return `<button class="angle-option ${selected ? 'selected' : ''}" data-action="choose-angle" data-id="${thesis.id}" aria-pressed="${selected}" aria-label="${escape(thesis.author + ': ' + thesis.title)}" title="${escape(thesis.statement || thesis.title)}">${avatar(thesis)}<span class="angle-line"><b>${escape(thesis.author)}:</b> <span>${escape(thesis.title)}</span>${thesis.tickers.filter(id => id !== ticker && !INTERESTS.find(item => item.id === id)?.theme).length ? `<small>Also ${escape(thesis.tickers.filter(id => id !== ticker && !INTERESTS.find(item => item.id === id)?.theme).join(', '))}</small>` : ''}</span><span class="angle-check">${selected ? icon('check') : ''}</span></button>`;
  }).join('') + ownIdeas.filter(idea => idea.tickerId === ticker).map(idea => `<div class="angle-option personal-angle">${avatar({author:'You',initials:'Y'})}<span class="angle-line" title="${escape(idea.idea)}"><b>You:</b> ${escape(idea.idea)}</span><button class="remove-idea" data-action="remove-own" data-id="${idea.id}" aria-label="Remove your view">${icon('close')}</button></div>`).join('');
}
function selectionCount(ticker) {
  return thesisChoices(ticker).filter(thesis => selectedTheses.includes(thesis.id)).length + ownIdeas.filter(idea => idea.tickerId === ticker).length;
}
function tickerLogo(item) {
  return item.theme ? `<span class="logo-circle theme-mark">${icon('theme')}</span>` : `<span class="logo-circle ${item.id === 'AMZN' ? 'amazon-logo' : ''}"><img src="${ASSETS}tickers/${item.logo}" alt=""></span>`;
}
function tickerTile(item) {
  const selected = selections.includes(item.id);
  return `<button class="ticker-tile ${item.theme ? 'theme-tile' : ''} ${selected ? 'selected' : ''}" data-action="interest" data-id="${item.id}" aria-label="Choose views for ${escape(item.id)}" aria-haspopup="dialog" aria-pressed="${selected}">${tickerLogo(item)}<span class="ticker-symbol">${escape(item.id)}</span><span class="tile-check" aria-hidden="true">${icon('check')}</span></button>`;
}
function welcome() {
  const allSelected = allCompaniesSelected();
  return `<section class="screen onboarding">${header('', {right: '<button class="text-button" data-action="skip">Skip</button>'})}<div class="picker-intro"><h1>What’s on your radar?</h1><p>Pick a company. Follow the thinking.</p></div><div class="ticker-grid-actions"><button class="text-button" data-action="select-all-tickers">${allSelected ? 'Clear all' : 'Select all'}</button></div><div class="ticker-grid">${INTERESTS.filter(item => !item.theme).map(tickerTile).join('')}</div><div class="onboarding-bottom"><button class="primary-button" data-action="continue" ${selections.length ? '' : 'disabled'}>Open my feed</button></div></section>`;
}
function allCompaniesSelected() {
  return INTERESTS.filter(item => !item.theme).every(item => selections.includes(item.id) && thesisChoices(item.id).every(thesis => selectedTheses.includes(thesis.id)));
}
function syncPicker() {
  document.querySelectorAll('.ticker-tile').forEach(tile => {
    const selected = selections.includes(tile.dataset.id);
    tile.classList.toggle('selected', selected); tile.setAttribute('aria-pressed', selected);
  });
  document.querySelectorAll('[data-action="choose-angle"]').forEach(button => {
    const selected = selectedTheses.includes(button.dataset.id);
    if (button.getAttribute('aria-pressed') !== String(selected)) button.querySelector('.angle-check').innerHTML = selected ? icon('check') : '';
    button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', selected);
  });
  const done = $('[data-action="close-picker"]');
  if (done) done.textContent = selectionCount(pickerTicker) ? 'Done · ' + selectionCount(pickerTicker) : 'Done';
  const selectAll = $('[data-action="select-all-angles"]');
  const selectTickers = $('[data-action="select-all-tickers"]');
  if (selectTickers) selectTickers.textContent = allCompaniesSelected() ? 'Clear all' : 'Select all';
  if (selectAll) selectAll.textContent = thesisChoices(pickerTicker).every(thesis => selectedTheses.includes(thesis.id)) ? 'Clear all' : 'Select all';
  const tickerToggle = $('[data-action="toggle-picker-ticker"]');
  if (tickerToggle) {
    const selected = selections.includes(pickerTicker);
    tickerToggle.setAttribute('aria-pressed', selected);
    tickerToggle.setAttribute('aria-label', (selected ? 'Deselect ' : 'Select ') + pickerTicker);
    tickerToggle.innerHTML = icon(selected ? 'check' : 'plus');
  }
  $('[data-action="continue"]').disabled = !selections.length;
}
function showTickerPicker(id) {
  pickerTicker = id; ownTicker = id;
  const item = INTERESTS.find(item => item.id === id);
  showSheet(item.id, `<div class="focus-ticker">${tickerLogo(item)}<div><h2 id="sheet-title">${escape(item.id)}</h2><p>${escape(item.name)}</p></div><button class="ticker-selection" data-action="toggle-picker-ticker"></button></div><div class="picker-heading"><p class="picker-caption">Which theses interest you?</p><button class="picker-select-all" data-action="select-all-angles">Select all</button></div><div class="focus-views"><div class="angle-list">${angleOptions(id)}</div><p class="picker-scope">Follow the discussion, including different views.</p><div class="own-view-form" hidden><label class="sr-only" for="own-idea">Your thesis</label><input id="own-idea" maxlength="600" placeholder="I think…" autocomplete="off"><p class="error" id="own-error" role="alert" hidden></p><button class="text-button" data-action="save-own">Save privately</button></div><div class="picker-actions"><button class="add-angle" data-action="own-angle">${icon('plus')} Add my thesis</button><button class="picker-done" data-action="close-picker">Done</button></div></div>`, true);
  syncPicker();
}
function home() {
  const eligible = feedEntries(state);
  if (refreshPending === null) refreshPending = feedRefreshBatch(eligible);
  const delivery = feedDelivery(eligible, refreshPending, refreshDelivered);
  const cards = delivery.entries.map(entry => entry.kind === 'update'
    ? updateCard(getThesis(state, entry.thesisId), entry.update, entry.thesisIds)
    : recommendation(getThesis(state, entry.thesisId))).join('');
  return `<section class="screen feed-screen">${header('For You', { right: `<button class="feed-refresh-button" data-action="refresh-feed" aria-label="Refresh feed" ${refreshBusy ? 'disabled' : ''}>${icon('refresh')}</button><button class="icon-button" data-action="new" aria-label="Create a thesis">${icon('plus')}</button>` })}<div class="pull-refresh ${refreshBusy ? 'refreshing' : ''}" role="status" aria-live="polite">${icon('refresh')}<span>${refreshBusy ? 'Refreshing…' : 'Pull to refresh'}</span></div><div class="new-posts-anchor"><button class="new-posts-notice" data-action="refresh-feed" ${refreshAnnounced && delivery.count && !refreshBusy ? '' : 'hidden'}>↑ ${delivery.count} new posts</button></div>${storageUnavailable ? demoLabel() : ''}${delivery.entries.length ? cards : `<div class="empty"><h2>A company. A few good questions.</h2><p>Choose a ticker to find views worth following, or start with your own.</p><button class="primary-button" data-action="goto" data-route="welcome">Choose a ticker</button><button class="text-button center-button" data-action="new">Add my own view</button></div>`}<p class="feed-end">${delivery.entries.length ? 'You’re caught up on these sources.' : ''}</p></section>`;
}
function refreshFeed() {
  if (route() !== 'home' || refreshBusy) return;
  refreshBusy = true;
  pullStart = null; pullDistance = 0;
  render({preserveScroll:true});
  $('#pages').scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  refreshTimer = setTimeout(() => {
    const delivery = feedDelivery(feedEntries(state), refreshPending, refreshDelivered);
    const count = delivery.count;
    refreshDelivered = [...delivery.nextBatch, ...refreshDelivered];
    refreshAnnounced = false; refreshBusy = false;
    if (route() !== 'home') return;
    scrollPositions.set('home', 0);
    render();
    $('#pages').scrollTo({top:0, behavior:'instant'});
    $('.pull-refresh').classList.add('settled');
    $('.pull-refresh span').textContent = count ? count + ' new posts added' : 'You’re up to date';
    const indicator = $('.pull-refresh');
    refreshNoticeTimer = setTimeout(() => {
      indicator.classList.remove('settled');
      indicator.querySelector('span').textContent = '';
    }, 1800);
  }, 750);
}
function detail(thesis) {
  const personal = thesis.author === 'You';
  const posts = thesisActivity(state, thesis.id).filter(post => personal ? ['human','author-update'].includes(post.kind) : post.sourceId !== thesis.originSourceId);
  const hasTracking = posts.some(post => post.trackingType);
  const related = discussionRelations(state, thesis.id).filter(other => other.id !== thesis.origin);
  return `<section class="screen thesis-detail">${header('Thesis', { back: true, right: `<button class="icon-button" data-action="share-thesis" data-id="${thesis.id}" aria-label="Share thesis">${icon('external')}</button>` + followButton(thesis) })}${demoLabel()}
    <article class="thesis-root" id="post-root-${thesis.id}"><div class="social-post">${profileAvatar(thesis)}<div class="post-main">${thesisHeader(thesis)}${personal && getThesis(state, thesis.origin) ? postTopic(getThesis(state, thesis.origin)) : ''}${personal ? '<span class="privacy-note">Private · Only you</span>' : ''}<h1 class="detail-title">${escape(thesisRoot(state,thesis.id).post)}</h1>${postFooter(thesis, SOURCES[thesis.originSourceId], 'Summary')}</div></div>
    <div class="post-actions card-actions"><button data-action="discussion" data-id="${thesis.id}" data-update="root-${thesis.id}">${icon('chat')} Reply</button><button data-action="add-thesis" data-id="${thesis.id}">Add thesis</button>${askAlva(thesis.id)}</div></article>
    ${personal ? trackingPanel(thesis) : ''}
${related.length ? `<nav class="related-thesis-list" aria-label="Related theses"><span class="related-heading">Related theses</span>${related.map(other => compactThesis(other)).join('')}</nav>` : ''}
    <div class="section-heading discussion-heading"><h2>${hasTracking ? 'Updates & discussion' : 'Discussion'}</h2><button data-action="${personal ? 'edit' : 'sources'}" data-id="${thesis.id}">${personal ? 'Edit thesis' : 'Sources'}</button></div>
    ${hasTracking ? '<p class="tracking-disclosure">Historical sources · scripted Alva tracking and audits. No live monitoring.</p>' : ''}
    ${posts.length ? posts.map(post => updateCard(thesis, post)).join('') : '<p class="empty">No new material yet. Add your perspective or ask Alva to explore it.</p>'}
    </section>`;
}
function trackingPanel(thesis) {
  const automation = thesis.automation;
  return `<details class="automation-panel"><summary>Alva tracking <span>${automation?.status === 'active' ? 'Active' : automation?.status === 'paused' ? 'Paused' : 'Not started'}</span></summary><p>${escape(thesis.focus)} · Public sources · Daily</p><p class="hint">Owned by you · Private results · Simulated, 0 Credits charged</p><div class="automation-actions"><button data-action="tracking" data-id="${thesis.id}" data-status="${automation?.status === 'active' ? 'paused' : 'active'}">${automation?.status === 'active' ? 'Pause' : automation ? 'Resume' : 'Set up tracking'}</button>${automation?.status === 'active' ? `<button data-action="run-sample" data-id="${thesis.id}">Try a run</button><button data-action="run-sample" data-id="${thesis.id}" data-outcome="failed">Try source failure</button>` : ''}</div><p class="hint">${escape(automation?.lastRun || 'No runs yet.')}</p></details>`;
}
function marketPanel(item) {
  return `<section class="market-panel" aria-label="Historical price chart"><div class="ticker-summary"><div class="ticker-identity">${tickerLogo(item)}<div><h1 title="${escape(item.name)}">${escape(item.name)}</h1><p>${escape(item.id)}</p></div></div><div class="market-quote"><strong class="market-price">—</strong><span class="market-change"></span></div></div><div class="market-ranges" role="group" aria-label="Chart window">${[1,3,6].map(months => `<button data-months="${months}" aria-pressed="false">${months}M</button>`).join('')}<span class="market-date">Loading prices…</span></div><div class="market-ohlc" aria-label="Candle values"></div><div class="market-canvas" role="img" aria-label="Daily candlestick price and volume chart. Daily OHLC values and volume."></div><p class="market-status" role="status" hidden></p><div class="sr-only"><table><caption>Last five trading sessions</caption><thead><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead><tbody></tbody></table></div></section>`;
}
function profileRootCard(thesis) {
  return `<article class="feed-card" data-source="${escape(thesis.originSourceId)}"><div class="social-post">${profileAvatar(thesis)}<div class="post-main">${thesisHeader(thesis)}<button class="post-body thesis-body-link" data-action="detail" data-id="${thesis.id}">${escape(thesisRoot(state,thesis.id).post)}</button>${postFooter(thesis,SOURCES[thesis.originSourceId],'Summary')}<button class="text-button" data-action="detail" data-id="${thesis.id}">View discussion ${icon('arrow')}</button></div></div></article>`;
}
function tickerScreen(id) {
  const item = INTERESTS.find(item => item.id === id);
  const view = tickerViews.get(id) || {tab:'views',thesisId:null};
  const choices = thesisChoices(id);
  const selected = choices.find(thesis => thesis.id === view.thesisId);
  const posts = tickerViewPosts(state, id, view.tab === 'views' ? selected?.id : null, choices, discussionPosts);
  const tabs = item.theme ? RESEARCH_TABS.slice(0,1) : RESEARCH_TABS;
  return `<section class="screen ticker-screen">${header('', {back:true, right:`<button class="follow-button" data-action="follow-ticker" data-id="${item.id}" aria-pressed="${state.interests.includes(id)}">${state.interests.includes(id) ? 'Following' : 'Follow'}</button>`})}${item.theme ? `<div class="ticker-identity">${tickerLogo(item)}<div><h1>${escape(item.name)}</h1></div></div>` : marketPanel(item)}${tickerNavigation(id,view.tab,selected,tabs)}<div id="ticker-content" role="tabpanel" aria-labelledby="research-tab-${view.tab}">${view.tab === 'views' ? `${posts.map(post => updateCard(getThesis(state,post.thesisId),post)).join('') || '<p class="empty">No views collected for this thesis yet.</p>'}` : tickerResearch(item,view.tab,posts)}</div></section>`;
}
function tickerNavigation(id, active, selected, tabs) {
  return `<div class="ticker-navigation"><div class="ticker-tabs" id="ticker-tabs" role="tablist" aria-label="Company research">${tabs.map(([key,label]) => `<button role="tab" id="research-tab-${key}" aria-controls="ticker-content" aria-selected="${active === key}" tabindex="${active === key ? 0 : -1}" ${key === 'views' && active === key ? 'aria-haspopup="dialog" title="Filter theses"' : ''} data-action="ticker-tab" data-tab="${key}" data-id="${escape(id)}"><span>${label}</span>${key === 'views' ? `<span class="theses-chevron ${active === key ? '' : 'inactive'}" aria-hidden="true">${icon('chevron')}</span>` : ''}</button>`).join('')}</div>${active === 'views' && selected ? `<div class="selected-thesis-filter"><button class="selected-thesis-label" data-action="ticker-filter-open" data-id="${escape(id)}" aria-haspopup="dialog" aria-label="Change thesis filter: ${escape(selected.title)}">${avatar(selected)}<span>${escape(selected.title)}</span></button><button class="clear-thesis-filter" data-action="ticker-filter" data-id="" aria-label="Clear thesis filter">${icon('close')}</button></div>` : ''}</div>`;
}
function researchLink(title, note, url, glyph = 'source') {
  return `<a class="research-link" href="${escape(url)}" target="_blank" rel="noopener noreferrer"><span class="research-glyph">${icon(glyph)}</span><span><b>${escape(title)}</b><small>${escape(note)}</small></span>${icon('external')}</a>`;
}
function tickerResearch(item, tab, posts) {
  const research = RESEARCH[item.id];
  if (tab === 'earnings') {
    const report = research.report;
    const earnings = posts.filter(post => post.source && /earnings/i.test(post.source.kind));
    return `<div class="research-content">${report ? `<div class="report-heading"><h2>${report.period}</h2><span>${report.date}</span></div><dl class="earnings-metrics">${report.metrics.map(([label,value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl><p class="research-note">${escape(report.note)}</p>${researchLink('Quarterly report','Form 10-Q · Reported financials',report.url)}${researchLink('Earnings call','Results and management Q&A',report.webcast,'audio')}` : ''}${researchLink(item.name + ' investor relations','Quarterly results, reports and events',research.ir)}</div>${earnings.map(post => updateCard(getThesis(state,post.thesisId),post)).join('')}`;
  }
  if (tab === 'peers') return `<div class="research-content"><div class="report-heading"><h2>${escape(research.lens)}</h2></div><p class="research-note">Compare the businesses behind the thesis.</p>${research.peers.map(([id,lens]) => {
    const peer = INTERESTS.find(company => company.id === id), external = EXTERNAL_PEERS[id];
    return `<a class="peer-row" ${peer ? `href="#/ticker/${id}" data-action="ticker" data-id="${id}"` : `href="${escape(external.url)}" target="_blank" rel="noopener noreferrer"`}><span class="peer-symbol">${peer ? `<img src="${ASSETS}tickers/${peer.logo}" alt="">` : ''}${id}</span><span><b>${escape(peer?.name || external.name)}</b><small>${escape(lens)}</small></span>${icon(peer ? 'chevron' : 'external')}</a>`;
  }).join('')}</div>`;
  const investors = posts.filter(post => INVESTOR_AUTHORS.includes(post.source?.authorId));
  return `<div class="research-content"><div class="report-heading"><h2>Ownership & disclosures</h2></div>${(research.disclosures || []).map(([title,note,url]) => researchLink(title,note,url)).join('')}${researchLink(item.name + ' filings','Company filings and ownership disclosures',research.ir)}<p class="research-note">Open the disclosure for dated positions. Public views below are not trade records.</p></div>${investors.length ? `<h2 class="investor-heading">Investor views</h2>${investors.map(post => updateCard(getThesis(state,post.thesisId),post)).join('')}` : '<p class="research-note">No investor commentary collected for this company yet.</p>'}`;
}
function profileScreen(id) {
  const profile = authorProfile(id), person = profile.person;
  const sourceLink = profile.url ? `<a class="profile-source-link" href="${escape(profile.url)}" target="_blank" rel="noopener noreferrer">${escape(profile.linkLabel)} ${icon('external')}</a>` : '';
  return `<section class="screen author-profile">${header('Profile', {back:true})}<div class="profile-identity">${avatar({author:person.name,avatarUrl:person.avatarUrl,initials:person.short[0]})}<div><h1>${escape(person.name)}${identityBadge(person.simulatedMember ? 'member' : 'public')}</h1>${person.publication === profile.linkLabel ? sourceLink : `<p>${escape(person.publication)}</p>`}</div></div>${person.publication === profile.linkLabel ? '' : sourceLink}<div class="profile-tickers">${profile.tickers.map(token).join('')}</div><div class="profile-activity">${profile.activity.length ? profile.activity.map(entry => entry.update ? updateCard(getThesis(state,entry.update.thesisId),entry.update,entry.thesisIds,true) : profileRootCard(entry.thesis)).join('') : '<p class="hint">No views collected yet.</p>'}</div></section>`;
}
function focusOptions() { return `<div class="focus-options" role="group" aria-label="Tracking focus">${FOCUSES.map(focus => `<button type="button" class="focus-option ${draft.focus === focus ? 'selected' : ''}" aria-pressed="${draft.focus === focus}" data-action="focus" data-focus="${escape(focus)}">${escape(focus)}</button>`).join('')}</div>`; }
function composerTickers(query = draft.companyQuery || '') {
  const companies = INTERESTS.filter(item => !item.theme);
  const term = query.trim().toLowerCase();
  const ids = [...new Set([...state.interests, ...companies.map(item => item.id)])];
  const defaults = ids.map(id => companies.find(item => item.id === id)).filter(Boolean).slice(0, 5);
  for (const id of draft.exposedTickerIds || []) {
    const item = companies.find(company => company.id === id);
    if (item && !defaults.includes(item)) defaults.push(item);
  }
  const choices = term ? companies.filter(item => `${item.id} ${item.name}`.toLowerCase().includes(term)) : defaults;
  return choices.length ? choices.map(item => `<button type="button" class="composer-ticker" data-action="draft-ticker" data-id="${item.id}" aria-label="${escape(item.id + ' · ' + item.name)}" aria-pressed="${draft.tickerId === item.id}"><img src="${ASSETS}tickers/${item.logo}" alt="">${item.id}</button>`).join('') : '<span class="hint" role="status">No matching company in this demo.</span>';
}
function createScreen() {
  const source = getThesis(state, draft.sourceId);
  const contextThesis = getThesis(state, draft.editingId) || source;
  const ticker = contextThesis?.tickers[0] || draft.tickerId;
  const ideas = ticker ? thesisChoices(ticker).slice(0, 3) : [];
  const inspiration = ideas.find(thesis => thesis.id === draft.inspirationId);
  return `<section class="screen create-screen">
    ${header(draft.editingId ? 'Edit thesis' : 'New thesis', { back: true, right: '<button class="composer-review" data-action="preview">Review</button>' })}
    <div class="thesis-writing">
      ${source ? postTopic(source) : ''}
      <div class="composer-company">${contextThesis ? '<span class="context-tickers">' + contextThesis.tickers.map(token).join('') + '</span>' : `<input id="company-search" type="search" aria-label="Search companies" placeholder="Search ticker or company" autocomplete="off" value="${escape(draft.companyQuery || '')}"><div class="composer-tickers" id="composer-tickers" role="group" aria-label="Companies">${composerTickers()}</div>`}</div>
      ${ideas.length ? `<section class="composer-inspiration" aria-label="Ideas to build on"><h2>Ideas to build on</h2><div class="inspiration-list">${ideas.map(thesis => compactThesis(thesis, {action:'inspire', selected:inspiration?.id === thesis.id})).join('')}</div></section>` : ''}
      <label class="composer-title" for="idea">What’s your view?</label>
      <textarea id="idea" class="idea-input" maxlength="600" placeholder="${inspiration ? 'My take on this is…' : 'I think… because…'}">${escape(draft.idea)}</textarea>
      <p class="error" id="form-error" role="alert" hidden></p>
    </div>
    <div class="composer-options"><div class="composer-focus-heading">Tracking focus <span class="focus-optional">Optional</span><span id="focus-summary" class="sr-only">${escape(draft.focus)}</span></div>${focusOptions()}</div>
  </section>`;
}
function chatThesisCard() {
  const draft = chatDrafts.get(route());
  if (!draft || draft.stage === 'idea') return '';
  if (draft.savedId) return `<div class="chat-thesis-card saved-thesis"><span class="inline-icon">${icon('check')}</span><strong>Saved privately</strong><p>${escape(draft.idea)}</p><button class="text-button" data-action="detail" data-id="${draft.savedId}">View thesis ${icon('arrow')}</button></div>`;
  const context = getThesis(state, draft.editingId || draft.sourceId);
  return `<form class="chat-thesis-card" id="chat-thesis-form"><h3>${draft.editingId ? 'Update your thesis' : 'Shape your thesis'}</h3><label for="chat-thesis-idea">Your view</label><textarea id="chat-thesis-idea" data-chat-field="idea" rows="3" maxlength="600" required>${escape(draft.idea)}</textarea><div class="chat-thesis-settings"><label>Company${context ? `<span class="context-tickers">${context.tickers.map(token).join('')}</span>` : `<select data-chat-field="tickerId" aria-label="Thesis company"><option value="">Detect from view</option>${INTERESTS.filter(item => !item.theme).map(item => `<option value="${item.id}" ${draft.tickerId === item.id ? 'selected' : ''}>${item.id}</option>`).join('')}</select>`}</label><label>Focus<select data-chat-field="focus" aria-label="Thesis focus">${FOCUSES.map(focus => `<option ${draft.focus === focus ? 'selected' : ''}>${escape(focus)}</option>`).join('')}</select></label></div><p class="hint">Only you can see this. Saving does not enable tracking.</p><p id="chat-thesis-error" class="error" role="alert" hidden></p><div class="chat-thesis-actions"><button type="button" class="text-button" data-action="cancel-chat-thesis">Cancel</button><button class="picker-done" type="submit">${draft.editingId ? 'Save update' : 'Save thesis'}</button></div></form>`;
}
function startChatThesis(thesis = null, focus = FOCUSES[0], instruction = '') {
  const key = route();
  const existing = chatDrafts.get(key);
  if (existing && !existing.savedId) return;
  chatDrafts.set(key, {stage:thesis ? 'review' : 'idea', idea:thesis?.premise || '', focus, tickerId:null, sourceId:thesis?.author === 'You' ? null : thesis?.id || null, editingId:thesis?.author === 'You' ? thesis.id : null});
  conversations.set(key, [...(conversations.get(key) || []), {role:'user',text:instruction || 'Help me track my own idea'}, {role:'assistant',text:thesis ? 'Review the view and focus below. You can change the wording before saving privately.' : 'Which company are you thinking about, and what do you believe will change? Write your view in a sentence; then we’ll shape it into a thesis.'}]);
  render();
  (thesis ? $('#chat-thesis-form') : $('#chat-input'))?.scrollIntoView({block:'nearest'});
  if (!thesis) $('#chat-input')?.focus();
}
function receiveChatThesis(text) {
  const key = route(), draft = chatDrafts.get(key);
  if (!draft || draft.savedId) return false;
  const question = isResearchQuestion(text);
  if (!question) {
    draft.idea = text;
    draft.stage = 'review';
    draft.tickerId = INTERESTS.find(item => !item.theme && new RegExp('\\b' + item.id + '\\b|\\b' + item.name + '\\b','i').test(text))?.id || draft.tickerId;
  }
  conversations.set(key, [...(conversations.get(key) || []), {role:'user',text}, {role:'assistant',text:question ? 'That’s a research question. What is your current view—even a tentative one? Add what you expect to change and why.' : 'Here’s your view, kept in your words. Adjust the company or focus, then save when it feels right.'}]);
  render();
  ($('#chat-thesis-form') || $('.conversation .message:last-child'))?.scrollIntoView({block:'nearest'});
  return true;
}
function chatScreen(thesis) {
  const key = route();
  const selectedUpdate = getUpdate(state, thesis?.id, route().split('/')[2]);
  const messages = conversations.get(key) || [];
  return `<section class="screen chat-screen">${header('Alva', { back: !!thesis, right: '' })}${storageUnavailable ? '<div class="storage-warning">Messages stay in this session.</div>' : ''}${thesis ? `<div class="chat-context">${context(thesis, 'In this conversation')}${selectedUpdate ? `<div class="chat-event"><small>${escape(selectedUpdate.channel)} · ${escape(selectedUpdate.time)}</small><p>${escape(selectedUpdate.post || selectedUpdate.body)}</p></div>` : ''}</div>` : ''}${messages.length ? `<div class="conversation" aria-live="polite">${messages.map(message => `<div class="message ${message.role}">${message.role === 'assistant' ? '<div class="message-author"><span class="avatar alva"></span>Alva</div>' : ''}${escape(message.text)}</div>`).join('')}${chatThesisCard()}</div>` : `<div class="chat-intro"><span class="avatar alva"></span><h2>${thesis ? 'Let’s stay with<br>this idea.' : 'An idea to explore?<br>Start here.'}</h2><p>${thesis ? 'We can examine the reasoning, look at the counterevidence, or change what you’re watching.' : 'Pick a thesis to talk through its evidence, or start with your own thinking.'}</p></div>`}<div class="suggestions" ${chatDrafts.get(key) && !chatDrafts.get(key).savedId ? 'hidden' : ''}>${thesis ? `<button class="suggestion" data-action="question" data-kind="why" data-id="${thesis.id}">Why does this update matter?</button><button class="suggestion" data-action="question" data-kind="against" data-id="${thesis.id}">What would change this view?</button><button class="suggestion" data-action="question" data-kind="adjust" data-id="${thesis.id}">Focus more on risks and counterevidence</button>` : `<button class="suggestion" data-action="chat-create">Help me track my own idea</button>${rankedTheses(state).slice(0, 2).map(item => `<button class="suggestion" data-action="ask" data-id="${item.id}">${escape(item.title)}</button>`).join('')}`}</div><form class="composer" id="chat-form" data-id="${thesis?.id || ''}"><div class="composer-box"><textarea id="chat-input" aria-label="Message Alva" placeholder="Ask about this idea…" maxlength="600" rows="1"></textarea><button type="submit" aria-label="Send message">${icon('arrow')}</button></div></form></section>`;
}
function youScreen() {
  const followed = allTheses(state).filter(thesis => state.followed.includes(thesis.id));
  return `<section class="screen">${header('You', { right: `<button class="icon-button" data-action="theme" data-theme="${state.theme === 'dark' ? 'light' : 'dark'}" aria-label="Switch color theme">${icon('theme')}</button>` })}${demoLabel()}<div class="profile"><span class="avatar">L</span><div><h2>Your point of view</h2><p>Demo profile · saved on this device</p></div></div><div class="section-heading"><h2>Watching</h2><button data-action="goto" data-route="welcome">Edit interests</button></div><div class="tag-row" style="margin:0 0 25px">${state.interests.length ? state.interests.map(token).join('') : '<span class="hint">No tickers or themes selected.</span>'}</div><div class="section-heading"><h2>Following</h2><span class="hint">${followed.length} ${followed.length === 1 ? 'thesis' : 'theses'}</span></div>${followed.length ? followed.map(thesis => compactThesis(thesis)).join('') : '<p class="empty">Your followed ideas will appear here.</p>'}${state.personal.some(thesis => !state.followed.includes(thesis.id)) ? `<div class="section-heading" style="margin-top:25px"><h2>Other personal theses</h2></div>${state.personal.filter(thesis => !state.followed.includes(thesis.id)).map(thesis => `<button class="list-row" data-action="detail" data-id="${thesis.id}"><span class="row-text"><b>${escape(thesis.title)}</b><small>Not following</small></span></button>`).join('')}` : ''}<button class="secondary-button" style="width:100%;margin-top:25px" data-action="new">Start a new thesis</button><button class="text-button center-button" data-action="about-views">About this demo</button></section>`;
}

function render({ preserveScroll = false } = {}) {
  disposeMarket?.(); disposeMarket = null;
  clearTimeout(refreshNoticeTimer);
  const previous = activeRoute;
  const oldScroll = $('#pages').scrollTop;
  let current = route();
  const [name, id] = current.split('/');
  const thesis = getThesis(state, id);
  if (!['welcome', 'angles', 'home', 'create', 'chat', 'you', 'thesis', 'ticker', 'profile'].includes(name) || (name === 'profile' && !authorProfile(id)) || (name === 'thesis' && !thesis) || (name === 'ticker' && !INTERESTS.some(item => item.id === decodeURIComponent(id || ''))) || (name === 'chat' && id && !thesis)) {
    history.replaceState(null, '', '#/home'); current = 'home';
  }
  if (name === 'angles') { history.replaceState(null, '', '#/welcome'); current = 'welcome'; }
  const root = current.split('/')[0];
  if (previous) scrollPositions.set(previous, oldScroll);
  activeRoute = current;
  if (root !== 'home') { clearTimeout(refreshTimer); refreshBusy = false; pullStart = null; pullDistance = 0; }
  $('#pages').innerHTML = root === 'welcome' ? welcome() : root === 'home' ? home() : root === 'profile' ? profileScreen(id) : root === 'ticker' ? tickerScreen(decodeURIComponent(id)) : root === 'create' ? createScreen() : root === 'thesis' ? detail(thesis) : root === 'chat' ? chatScreen(thesis) : youScreen();
  $('#tabbar').hidden = ['welcome', 'angles', 'create', 'thesis', 'ticker', 'profile'].includes(root);
  $('#tabbar').innerHTML = [['home', 'For You', 'feed'], ['chat', 'Chat', 'chat'], ['you', 'You', 'user']].map(([key, label, glyph]) => `<button class="tab ${root === key ? 'on' : ''}" data-action="goto" data-route="${key}" ${root === key ? 'aria-current="page"' : ''}><span class="tab-icon">${icon(glyph)}</span><span class="tab-label">${label}</span></button>`).join('');
  $('#pages').scrollTop = preserveScroll ? oldScroll : scrollPositions.get(current) || 0;
  applyTheme();
  if (root === 'ticker' && $('.market-panel')) disposeMarket = mountMarket($('.market-panel'), decodeURIComponent(id));
}
function showSheet(title, body, tickerFocus = false) {
  if (sheetCloseTimer) closeSheet(true);
  sheetReturnFocus = document.activeElement;
  $('#app').inert = true; $('#stage').inert = true;
  $('#sheet-root').classList.toggle('ticker-overlay', tickerFocus);
  $('#sheet-root').innerHTML = `<div class="sheet-backdrop" data-action="close-sheet"></div><section class="sheet ${tickerFocus ? 'ticker-focus' : ''}" role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabindex="-1">${tickerFocus ? '' : `<div class="grabber"></div><div class="sheet-top"><h2 id="sheet-title">${escape(title)}</h2><button class="icon-button" data-action="close-sheet" aria-label="Close dialog">${icon('close')}</button></div>`}${body}</section>`;
  $('#sheet-root .sheet').focus();
}
function closeSheet(immediate = false) {
  if (!immediate && $('#sheet-root').classList.contains('ticker-overlay') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (sheetCloseTimer) return;
    $('#sheet-root').classList.add('closing');
    sheetCloseTimer = setTimeout(() => closeSheet(true), 180);
    return;
  }
  clearTimeout(sheetCloseTimer); sheetCloseTimer = null;
  $('#sheet-root').classList.remove('ticker-overlay', 'closing');
  $('#sheet-root').innerHTML = '';
  $('#app').inert = false; $('#stage').inert = false;
  if (sheetReturnFocus?.isConnected) sheetReturnFocus.focus();
  sheetReturnFocus = null;
}
function setDraft(thesis, focus = thesis.focus || FOCUSES[0], instruction = '') {
  draft = { idea: instruction ? `${thesis.premise}\n${instruction}`.slice(0, 600) : thesis.premise,
    focus, sourceId: thesis.author === 'You' ? thesis.origin : thesis.id, editingId: thesis.author === 'You' ? thesis.id : null };
  scrollPositions.delete('create');
  go('create');
}
function showPreview() {
  draft.idea = $('#idea').value;
  if (!draft.idea.trim()) { $('#form-error').hidden = false; $('#form-error').textContent = 'Add your idea before previewing tracking.'; $('#idea').focus(); return; }
  if (isResearchQuestion(draft.idea)) { showQuestion(draft.idea); return; }
  showSheet(draft.editingId ? 'Review your update' : 'Your private thesis', `<p class="preview-idea">${escape(draft.idea.trim())}</p><div class="preview-line"><small>Research focus</small><p>${escape(draft.focus)}</p></div><p class="hint">Only you can see this thesis. You can enable Alva tracking after saving; scope and cost are confirmed separately.</p><p class="error" id="preview-error" role="alert" hidden></p><div class="sheet-actions"><button class="secondary-button" data-action="close-sheet">Keep editing</button><button class="primary-button" data-action="confirm">${draft.editingId ? 'Save update' : 'Save thesis'}</button></div>`);
}
function showQuestion(text) {
  const ticker = ownTicker || INTERESTS.find(item => !item.theme && new RegExp('\\b' + item.id + '\\b','i').test(text))?.id;
  const terms = (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter(word => word.length > 2 && !['how','what','why','would','could','should','understand','learn','about','does','this','that','the'].includes(word));
  const candidates = ticker ? thesisChoices(ticker) : rankedTheses(state).filter(thesis => terms.some(term => new RegExp('\\b' + term + '\\b','i').test(thesis.title + ' ' + thesis.premise)));
  showSheet('Explore the question', `<p>${escape(text)}</p><p class="hint">Keep this as a private question, or choose a judgment to follow.</p>${candidates.length ? candidates.slice(0,3).map(thesis => `<button class="list-row" data-action="detail" data-id="${thesis.id}">${escape(thesis.title)}</button>`).join('') : '<p class="hint">No matching thesis in this demo’s source collection.</p>'}<button class="primary-button" data-action="research-question" data-question="${escape(text)}">Ask Alva privately</button>`);
}
function respond(thesis, question, kind) {
  const key = route();
  const selectedUpdate = getUpdate(state, thesis?.id, route().split('/')[2]);
  const answer = !thesis ? 'This prototype uses scripted replies. Choose an example thesis above to explore its evidence, or start a new thesis with your own words.' : kind === 'against' ? `${thesis.counter}\n\nThe next checkpoint is: ${thesis.checkpoint}\n\nThis is a sample research response, not a live assessment.` : kind === 'why' ? `${selectedUpdate?.impact || thesis.update.impact}\n\n${thesis.baseline}\n\nThe useful distinction is what changed in the evidence and what remains unproven. You can open the original sources from the thesis page.` : 'This demo can walk through the update, show counterevidence, or preview a tracking adjustment. Use a suggested prompt below; your message has not been sent to a live model.';
  conversations.set(key, [...(conversations.get(key) || []), { role: 'user', text: question }, { role: 'assistant', text: answer }]);
  render();
  $('.conversation .message:last-child')?.scrollIntoView({ block: 'nearest' });
}

const actions = {
  'ticker-tab': (button, openFilter = true) => {
    if (!RESEARCH_TABS.some(([tab]) => tab === button.dataset.tab)) return;
    const currentTab = tickerViews.get(button.dataset.id)?.tab || 'views';
    if (openFilter && button.dataset.tab === 'views' && currentTab === 'views') {
      actions['ticker-filter-open'](button);
      return;
    }
    tickerViews.set(button.dataset.id, {...(tickerViews.get(button.dataset.id) || {}),tab:button.dataset.tab});
    render({preserveScroll:true});
    document.getElementById('research-tab-' + button.dataset.tab)?.focus({preventScroll:true});
  },
  'ticker-filter-open': button => {
    const id = button.dataset.id;
    const selected = tickerViews.get(id)?.thesisId;
    showSheet('Filter by thesis', `<div class="thesis-filter-options"><button class="thesis-line all-theses-option" data-action="ticker-filter" data-id="" aria-pressed="${!selected}"><span class="filter-all-icon" aria-hidden="true">${icon('thesis')}</span><span class="thesis-line-text">All theses</span><span class="filter-check" aria-hidden="true">${!selected ? icon('check') : ''}</span></button>${thesisChoices(id).map(thesis => compactThesis(thesis,{action:'ticker-filter',selected:selected === thesis.id})).join('')}</div>`);
  },
  'ticker-filter': button => {
    const ticker = decodeURIComponent(route().split('/')[1]);
    if (button.dataset.id && !thesisChoices(ticker).some(thesis => thesis.id === button.dataset.id)) return;
    tickerViews.set(ticker,{tab:'views',thesisId:button.dataset.id || null});
    closeSheet(true); render({preserveScroll:true});
    $('#research-tab-views')?.focus({preventScroll:true});
  },
  'chat-create': () => startChatThesis(),
  'cancel-chat-thesis': () => {
    chatDrafts.delete(route());
    conversations.set(route(), [...(conversations.get(route()) || []), {role:'assistant',text:'Nothing was saved. We can keep exploring.'}]);
    render();
  },
  'refresh-feed': refreshFeed,
  goto: button => {
    if (button.dataset.route === 'create') { actions.new(); return; }
    if (button.dataset.route === 'welcome') { selections = [...state.interests]; selectedTheses = [...state.followed]; ownIdeas = []; pickerTicker = null; }
    go(button.dataset.route);
  },
  back: () => {
    location.hash = '#/' + (navigation.pop() || 'home');
  },
  interest: button => {
    const id = button.dataset.id;
    if (!selections.includes(id)) selections.push(id);
    syncPicker();
    showTickerPicker(id);
  },
  'toggle-picker-ticker': () => {
    selections = selections.includes(pickerTicker) ? selections.filter(id => id !== pickerTicker) : [...selections, pickerTicker];
    syncPicker();
  },
  'select-all-tickers': () => {
    const ids = INTERESTS.filter(item => !item.theme).map(item => item.id);
    const thesisIds = [...new Set(ids.flatMap(id => thesisChoices(id).map(thesis => thesis.id)))];
    const clear = allCompaniesSelected();
    selections = clear ? selections.filter(id => !ids.includes(id)) : [...new Set([...selections, ...ids])];
    selectedTheses = clear ? selectedTheses.filter(id => !thesisIds.includes(id)) : [...new Set([...selectedTheses, ...thesisIds])];
    syncPicker();
  },
  'select-all-angles': () => {
    const ids = thesisChoices(pickerTicker).map(thesis => thesis.id);
    const clear = ids.every(id => selectedTheses.includes(id));
    selectedTheses = clear ? selectedTheses.filter(id => !ids.includes(id)) : [...new Set([...selectedTheses, ...ids])];
    if (!clear && !selections.includes(pickerTicker)) selections.push(pickerTicker);
    syncPicker();
  },
  continue: () => {
    if (!selections.length) return;
    persist(completeOnboarding(state, {interests: selections, selectedIds: selectedTheses, ownIdeas}));
    ownIdeas = []; scrollPositions.delete('home'); go('home');
  },
  'choose-angle': button => {
    const id = button.dataset.id;
    const selected = selectedTheses.includes(id);
    selectedTheses = selected ? selectedTheses.filter(value => value !== id) : [...selectedTheses, id];
    if (!selected && !selections.includes(pickerTicker)) selections.push(pickerTicker);
    syncPicker();
  },
  'own-angle': () => {
    $('.own-view-form').hidden = false; $('[data-action="own-angle"]').hidden = true; $('#own-idea').focus();
  },
  'save-own': () => {
    const idea = $('#own-idea').value.trim();
    if (!idea) { $('#own-error').hidden = false; $('#own-error').textContent = 'Add a sentence to get started.'; return; }
    if (isResearchQuestion(idea)) { showQuestion(idea); return; }
    ownIdeas.push({ id: 'personal-' + crypto.randomUUID(), idea, tickerId: ownTicker });
    if (!selections.includes(ownTicker)) selections.push(ownTicker);
    $('.angle-list').innerHTML = angleOptions(pickerTicker);
    $('.own-view-form').hidden = true; $('#own-idea').value = ''; $('#own-error').hidden = true;
    $('[data-action="own-angle"]').hidden = false; $('[data-action="own-angle"]').focus(); syncPicker();
  },
  'remove-own': button => { ownIdeas = ownIdeas.filter(idea => idea.id !== button.dataset.id); $('.angle-list').innerHTML = angleOptions(pickerTicker); $('[data-action="own-angle"]').focus(); syncPicker(); },
  'close-picker': () => closeSheet(),
  'about-views': () => showSheet('About this demo', '<p>Posts use historical 2024–2026 sources with dates and original links. Quotation marks identify excerpts; other source posts are summaries.</p><p>Dylan Patel, Ethan Mollick and Andrew Ng illustrate Alva members. Membership and verification are simulated; their source material and portraits are real. Alva replies are scripted. No live monitoring, publishing, AI or billing is connected.</p>'),
  skip: () => { ownIdeas = []; persist({ ...state, onboarded: true }); go('home'); },
  detail: button => go('thesis/' + button.dataset.id),
  profile: button => { closeSheet(true); go('profile/' + button.dataset.id); },
  'research-question': button => { const question = button.dataset.question; closeSheet(true); conversations.set('chat', [{role:'user',text:question},{role:'assistant',text:'Your question is saved in this private demo conversation. No judgment or subscription has been inferred. A live agent would help you examine evidence before forming a thesis.'}]); go('chat'); },
  ticker: button => go('ticker/' + encodeURIComponent(button.dataset.id)),
  'follow-ticker': button => { persist(toggleTicker(state, button.dataset.id)); render({preserveScroll:true}); },
  locate: button => {
    const target = () => document.getElementById('post-' + button.dataset.update)?.scrollIntoView({block:'center',behavior:'smooth'});
    if (route() === 'thesis/' + button.dataset.id) target();
    else { window.addEventListener('hashchange', target, {once:true}); go('thesis/' + button.dataset.id); }
  },
  'share-thesis': button => {
    const thesis = getThesis(state, button.dataset.id);
    showSheet('Share thesis', thesis.author === 'You' ? '<p>This thesis is private. Sharing is unavailable in this local demo.</p>' : `<p>${escape(thesis.title)}</p><p class="hint">Local preview link</p><input aria-label="Thesis link" readonly value="${escape(location.href)}">`);
  },
  tracking: button => {
    const thesis = getThesis(state,button.dataset.id);
    if (button.dataset.status === 'active' && !thesis.automation) {
      showSheet('Enable private tracking', `<p>${escape(thesis.premise)}</p><div class="preview-line"><small>Scope</small><p>${escape(thesis.tickers.join(', ') || 'Your judgment')} · Public sources · ${escape(thesis.focus)} · Daily</p></div><div class="preview-line"><small>Ownership & cost</small><p>Your automation, visible only to you. This demo simulates activation and charges 0 Credits.</p></div><button class="primary-button" data-action="activate-tracking" data-id="${thesis.id}">Confirm tracking</button>`);
    } else { persist(setTracking(state, thesis.id, button.dataset.status)); render({preserveScroll:true}); $('.automation-panel').open = true; }
  },
  'activate-tracking': button => { persist(setTracking(state,button.dataset.id,'active')); closeSheet(true); render({preserveScroll:true}); $('.automation-panel').open = true; },
  'run-sample': button => { persist(simulateRun(state,button.dataset.id,button.dataset.outcome)); render({preserveScroll:true}); $('.automation-panel').open = true; },
  'related-theses': button => {
    const theses = button.dataset.ids.split(',').map(id => getThesis(state, id)).filter(Boolean);
    showSheet('Theses in this post', '<div class="associated-theses">' + theses.map(thesis => thesisAttachment(thesis, true)).join('') + '</div>');
  },
  discussion: button => {
    const thesis = getThesis(state, button.dataset.id), update = getUpdate(state, button.dataset.id, button.dataset.update);
    if (thesis && update) showDiscussion(thesis, update);
  },
  ask: button => {
    const thesis = getThesis(state, button.dataset.id);
    go('chat/' + button.dataset.id + (button.dataset.update ? '/' + button.dataset.update : ''));
    if (button.dataset.update && !conversations.has(route())) respond(thesis, button.textContent.trim(), 'why');
  },
  follow: button => {
    const id = button.dataset.id;
    const wasFollowing = state.followed.includes(id);
    persist(toggleFollow(state, id));
    render({ preserveScroll: true });
    $('#feed-status').textContent = wasFollowing ? 'Unfollowed. Removed from your updates.' : 'Following. Updates added to For You.';
    $('#feed-status').classList.add('visible');
    clearTimeout(followNoticeTimer);
    followNoticeTimer = setTimeout(() => $('#feed-status').classList.remove('visible'), 2600);
  },
  'add-thesis': button => {
    const thesis = getThesis(state, button.dataset.id);
    if (!thesis) return;
    const idea = $('#reply-input')?.value || '';
    closeSheet(true); ownTicker = null;
    draft = { idea, focus: FOCUSES[0], sourceId: thesis.id, editingId: null, extending: true };
    scrollPositions.delete('create'); go('create');
  },
  new: () => { ownTicker = null; draft = { idea: '', focus: FOCUSES[0], sourceId: null, editingId: null }; scrollPositions.delete('create'); go('create'); },
  'draft-ticker': button => {
    draft.idea = $('#idea').value;
    draft.exposedTickerIds = [...new Set([...(draft.exposedTickerIds || []), button.dataset.id])];
    draft.tickerId = draft.tickerId === button.dataset.id ? null : button.dataset.id;
    draft.inspirationId = null;
    render({preserveScroll:true});
    ($('.composer-ticker[data-id="' + button.dataset.id + '"]') || $('#company-search')).focus({preventScroll:true});
  },
  inspire: button => {
    draft.idea = $('#idea').value;
    draft.inspirationId = draft.inspirationId === button.dataset.id ? null : button.dataset.id;
    render({preserveScroll:true});
    $('.inspiration-option[data-id="' + button.dataset.id + '"]')?.focus({preventScroll:true});
  },
  focus: button => { draft.idea = $('#idea').value; draft.focus = button.dataset.focus; $('#focus-summary').textContent = draft.focus; document.querySelectorAll('.focus-option').forEach(option => { const selected = option.dataset.focus === draft.focus; option.classList.toggle('selected', selected); option.setAttribute('aria-pressed', selected); }); },
  edit: button => { const thesis = getThesis(state, button.dataset.id); if (thesis) setDraft(thesis); },
  preview: showPreview,
  confirm: () => {
    const id = draft.editingId || 'personal-' + crypto.randomUUID();
    try {
      const next = draft.editingId ? revisePersonal(state, id, draft) : createPersonal(state, { ...draft, id });
      persist(next); closeSheet(); scrollPositions.delete('thesis/' + id); go('thesis/' + id);
    } catch (error) { $('#preview-error').hidden = false; $('#preview-error').textContent = error.message; }
  },
  next: button => { persist(previewNextUpdate(state, button.dataset.id)); render({ preserveScroll: true }); $('.timeline')?.scrollIntoView({ block: 'start', behavior: 'auto' }); },
  trail: button => {
    const thesis = getThesis(state, button.dataset.id);
    if (!thesis) return;
    showSheet('Thesis trail', '<div class="trail-intro">' + thesisReference(thesis) + '<h3>' + escape(thesis.title) + '</h3><p>Sources over time. These are Alva’s readings, not author-issued revisions.</p></div>' + timeline(thesis) + '<button class="secondary-button trail-detail" data-action="detail" data-id="' + thesis.id + '">Open full thesis</button>');
  },
  sources: button => {
    const thesis = getThesis(state, button.dataset.id);
    if (!thesis) return;
    const sources = [...new Set(thesisUpdates(state, thesis.id).map(update => update.sourceId).filter(Boolean))];
    showSheet('Original sources', (sources.length ? sources.map(id => {
      const source = SOURCES[id];
      return '<article class="source-excerpt">' + sourceHeader(source) + '<a href="' + escape(source.url) + '" target="_blank" rel="noopener noreferrer">' + escape(source.title) + ' ↗</a>' + (source.coauthors ? '<p>' + escape(source.coauthors) + '</p>' : '') + (source.verifiedVia ? '<p>X excerpt also <a href="' + escape(source.verifiedVia) + '" target="_blank" rel="noopener noreferrer">preserved in Stratechery</a>.</p>' : '') + '</article>';
    }).join('') : '<p>Your saved view. No live evidence has been gathered.</p>') + '<p class="hint">Historical sources. Summaries, thesis angles and readings are Alva’s. No endorsement or live assessment is implied.</p>');
  },
  question: button => {
    const thesis = getThesis(state, button.dataset.id);
    if (!thesis) return;
    if (button.dataset.kind === 'adjust') startChatThesis(thesis, 'Risks & counterevidence', 'Prioritize risks and counterevidence over confirming headlines.');
    else respond(thesis, button.textContent, button.dataset.kind);
  },
  theme: button => { persist({ ...state, theme: button.dataset.theme }); if (route() === 'you' || route().startsWith('ticker/')) render({ preserveScroll: true }); },
  'close-sheet': () => closeSheet(),
  reset: () => showSheet('Reset this demo?', '<p>This clears only the theses, replies, interests and preferences saved by this Thesis Demo. The original MVP is unaffected.</p><div class="sheet-actions"><button class="secondary-button" data-action="close-sheet">Cancel</button><button class="primary-button" data-action="confirm-reset">Reset demo</button></div>'),
  'confirm-reset': () => { closeSheet(); persist(freshState()); selections = []; draft = { idea: '', focus: FOCUSES[0], sourceId: null, editingId: null }; pickerTicker = null; selectedTheses = []; ownIdeas = []; conversations.clear(); chatDrafts.clear(); scrollPositions.clear(); refreshPending = null; refreshDelivered = []; refreshAnnounced = false; go('welcome'); },
};

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const action = actions[button.dataset.action];
  if (action) { event.preventDefault(); action(button); }
});
document.addEventListener('input', event => {
  if (event.target.dataset.chatField && chatDrafts.has(route())) chatDrafts.get(route())[event.target.dataset.chatField] = event.target.value;
  if (event.target.id === 'idea') draft.idea = event.target.value;
  if (event.target.id === 'company-search') {
    draft.companyQuery = event.target.value;
    $('#composer-tickers').innerHTML = composerTickers();
  }
});
document.addEventListener('keydown', event => {
  const tab = event.target.closest?.('.ticker-tabs [role="tab"]');
  if (!tab || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  const tabs = [...tab.parentElement.querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(tab);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  event.preventDefault(); actions['ticker-tab'](tabs[next], false);
});
const feedScroller = $('#pages');
feedScroller.addEventListener('scroll', () => {
  if (route() !== 'home' || refreshAnnounced || refreshBusy || !refreshPending?.length) return;
  if (feedScroller.scrollTop >= feedScroller.clientHeight * 2) {
    refreshAnnounced = true;
    const notice = $('.new-posts-notice');
    if (notice && feedDelivery(feedEntries(state), refreshPending, refreshDelivered).count) notice.hidden = false;
  }
});
function startPull(x, y, target) {
  if (route() === 'home' && feedScroller.scrollTop <= 0 && !refreshBusy && !$('#app').inert && !target.closest('button, a, input, textarea')) {
    clearTimeout(refreshNoticeTimer);
    $('.pull-refresh')?.classList.remove('settled');
    pullStart = {x, y};
  }
}
function movePull(x, y, event) {
  if (!pullStart) return;
  const dy = y - pullStart.y;
  if (Math.abs(x - pullStart.x) > Math.abs(dy) || dy < 0) { endPull(true); return; }
  pullDistance = Math.min(96, dy * .55);
  if (event.cancelable) event.preventDefault();
  const indicator = $('.pull-refresh');
  if (indicator) {
    indicator.classList.remove('settled');
    indicator.style.height = pullDistance + 'px';
    indicator.querySelector('span').textContent = pullDistance >= 56 ? 'Release to refresh' : 'Pull to refresh';
  }
}
function endPull(cancelled = false) {
  if (!pullStart) return;
  const ready = !cancelled && pullDistance >= 56;
  pullStart = null; pullDistance = 0;
  $('.pull-refresh')?.style.removeProperty('height');
  if (ready) refreshFeed();
}
feedScroller.addEventListener('touchstart', event => { if (event.touches.length === 1) startPull(event.touches[0].clientX, event.touches[0].clientY, event.target); }, {passive:true});
feedScroller.addEventListener('touchmove', event => { if (event.touches.length === 1) movePull(event.touches[0].clientX, event.touches[0].clientY, event); else endPull(true); }, {passive:false});
feedScroller.addEventListener('touchend', () => endPull());
feedScroller.addEventListener('touchcancel', () => endPull(true));
feedScroller.addEventListener('pointerdown', event => { if (event.pointerType === 'mouse' && event.button === 0) startPull(event.clientX, event.clientY, event.target); });
window.addEventListener('pointermove', event => { if (event.pointerType === 'mouse') movePull(event.clientX, event.clientY, event); });
window.addEventListener('pointerup', event => { if (event.pointerType === 'mouse') endPull(); });
window.addEventListener('blur', () => endPull(true));
document.addEventListener('submit', event => {
  if (event.target.id === 'chat-thesis-form') {
    event.preventDefault();
    const proposal = chatDrafts.get(route());
    if (!proposal || proposal.savedId) return;
    proposal.idea = $('#chat-thesis-idea').value;
    proposal.focus = $('#chat-thesis-form [data-chat-field="focus"]').value;
    const company = $('#chat-thesis-form [data-chat-field="tickerId"]');
    if (company) proposal.tickerId = company.value || null;
    try {
      const id = proposal.editingId || 'personal-' + crypto.randomUUID();
      const next = proposal.editingId ? revisePersonal(state, id, proposal) : createPersonal(state, {...proposal,id});
      persist(next); proposal.savedId = id;
      render(); $('.saved-thesis')?.scrollIntoView({block:'nearest'});
    } catch (error) { $('#chat-thesis-error').hidden = false; $('#chat-thesis-error').textContent = error.message; }
    return;
  }
  if (event.target.id === 'reply-form') {
    event.preventDefault();
    const form = event.target;
    try {
      persist(addReply(state, { thesisId: form.dataset.id, updateId: form.dataset.update, text: $('#reply-input').value, id: crypto.randomUUID() }));
      const update = getUpdate(state, form.dataset.id, form.dataset.update);
      $('.discussion-replies').innerHTML = threadReplies(state, update).map(reply => replyRow(reply.speaker || 'You', reply.text) + evidenceCitation(reply)).join('');
      $('#reply-input').value = ''; $('#reply-error').hidden = true;
      render({ preserveScroll: true });
      sheetReturnFocus = document.querySelector('[data-action="discussion"][data-update="' + CSS.escape(update.id) + '"]');
      $('#reply-input').focus();
    } catch (error) { $('#reply-error').hidden = false; $('#reply-error').textContent = error.message; }
    return;
  }
  if (event.target.id !== 'chat-form') return;
  event.preventDefault();
  const text = $('#chat-input').value.trim();
  if (!text) return;
  const thesis = getThesis(state, event.target.dataset.id);
  if (receiveChatThesis(text)) return;
  if (!thesis && /thesis|my (own )?idea|观点|母题|创建/i.test(text)) {
    startChatThesis(null, FOCUSES[0], text);
    return;
  }
  if (thesis && /focus|watch|track|instead|less|more|change|关注|追踪|调整/i.test(text)) {
    const focus = /risk|counter|against|风险|反证/i.test(text) ? FOCUSES[1] : /time|when|catalyst|时间/i.test(text) ? FOCUSES[2] : FOCUSES[0];
    startChatThesis(thesis, focus, text);
  } else respond(thesis, text, /counter|against|risk|反证/i.test(text) ? 'against' : /why|matter|为什么/i.test(text) ? 'why' : 'other');
});
document.addEventListener('keydown', event => {
  const sheet = $('#sheet-root .sheet');
  if (sheet) {
    if (event.key === 'Escape') { event.preventDefault(); closeSheet(); }
    if (event.key === 'Tab') {
      const focusable = [...sheet.querySelectorAll('button, a, input, textarea, [tabindex="0"]')].filter(element => !element.disabled && !element.closest('[hidden]'));
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === sheet)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === sheet)) { event.preventDefault(); first?.focus(); }
    }
    if (event.target.id === 'own-idea' && event.key === 'Enter' && !event.isComposing) { event.preventDefault(); actions['save-own'](); }
  } else if (event.target.id === 'chat-input' && event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); $('#chat-form').requestSubmit(); }
});
window.addEventListener('hashchange', () => { closeSheet(true); render(); });
function fitDevice() {
  $('#device').style.transform = innerWidth < 500 ? '' : `scale(${Math.min(1, (innerHeight - 40) / 932, (innerWidth - 40) / 430)})`;
}
window.addEventListener('resize', fitDevice);
fitDevice();
applyTheme();
render();
