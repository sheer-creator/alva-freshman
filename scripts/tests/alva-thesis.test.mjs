import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validBars, windowBars } from '../../public/demo/alva-thesis/market.js';
import { RESEARCH_TABS, RESEARCH, EXTERNAL_PEERS, tickerViewPosts } from '../../public/demo/alva-thesis/research.js';
import { freshState, readState, toggleFollow, createPersonal, revisePersonal, previewNextUpdate, rankedTheses, completeOnboarding, feedEntries, relatedTheses, thesisChoices, thesisUpdates, getUpdate, addReply, threadReplies, discussionPosts, setTracking, simulateRun, toggleTicker, thesisRoot, isResearchQuestion, discussionRelations, authorProfile, feedRefreshBatch, feedDelivery, sourcePreviewType } from '../../public/demo/alva-thesis/model.js';
import { THESES, UPDATES, INTERESTS, SOURCES, AUTHORS } from '../../public/demo/alva-thesis/data.js';

test('ticker has one source-deduplicated stream with an effective thesis filter', () => {
  const state = freshState(), choices = thesisChoices('TSLA');
  const all = tickerViewPosts(state,'TSLA',null,choices,discussionPosts);
  assert.deepEqual(all.map(post => post.sourceId), ['garyDistribution','garyAutonomy','tesla','ark']);
  const selected = tickerViewPosts(state,'TSLA','robotaxi',choices,discussionPosts);
  assert.deepEqual(selected.map(post => post.sourceId), ['garyAutonomy','tesla','ark']);
  assert.ok(selected.every(post => post.thesisId === 'robotaxi'));
  assert.deepEqual(tickerViewPosts(state,'TSLA','memory',choices,discussionPosts), []);
  assert.deepEqual(tickerViewPosts(state,'TSLA',null,choices,discussionPosts), all);
  assert.deepEqual(state, freshState());
});

test('research tabs have company-specific working destinations without fabricated holdings', () => {
  assert.deepEqual(RESEARCH_TABS.map(([id])=>id), ['views','earnings','peers','smart']);
  assert.deepEqual(RESEARCH_TABS.map(([,label])=>label), ['Theses','Earnings','Peers','Smart Money']);
  for (const company of INTERESTS.filter(item=>!item.theme)) {
    const research = RESEARCH[company.id];
    assert.ok(research.ir.startsWith('https://'));
    assert.ok(research.peers.length >= 2);
    for (const [id,lens] of research.peers) {
      assert.notEqual(id,company.id);
      assert.ok(INTERESTS.some(item=>item.id===id) || EXTERNAL_PEERS[id]?.url.startsWith('https://'));
      assert.ok(lens.length > 10);
    }
  }
  assert.equal(RESEARCH.TSLA.report.period,'Q2 2026');
  assert.match(RESEARCH.TSLA.report.url,/sec.gov\/Archives\/edgar\/data\/1318605\//);
  assert.equal(RESEARCH.TSLA.report.metrics[0][1],'$28.24B');
  assert.ok(RESEARCH.TSLA.peers.some(([id])=>id==='GM'));
});

test('unified profile activity preserves authorship, source deduplication and chronological order', () => {
  for (const id of Object.keys(AUTHORS)) {
    const { activity } = authorProfile(id);
    const ids = activity.map(entry => entry.update?.sourceId || entry.thesis.originSourceId);
    assert.equal(ids.length, new Set(ids).size);
    const dates = activity.map(entry => entry.update?.source.date || entry.thesis.source.date);
    assert.deepEqual(dates, [...dates].sort().reverse());
    for (const entry of activity) {
      assert.equal(entry.update ? entry.update.source.authorId : SOURCES[entry.thesis.originSourceId].authorId, id);
      assert.ok(entry.thesisIds.length);
    }
  }
  const gary = authorProfile('gary');
  assert.equal(gary.theses.length, 0);
  assert.equal(gary.activity.length, 2);
  assert.ok(gary.activity.every(entry => entry.update && entry.thesisIds.includes('autonomy')));
});

test('historical snapshot contains valid daily OHLCV for every company and records rejected rows', () => {
  const snapshot = JSON.parse(readFileSync(new URL('../../public/demo/alva-thesis/market-snapshot.json', import.meta.url)));
  assert.equal(snapshot.source, 'Alva Arrays');
  for (const company of INTERESTS.filter(item => !item.theme)) {
    const series = snapshot.series[company.id];
    assert.ok(validBars(series.bars), company.id);
    assert.ok(series.requestId);
    assert.equal(series.bars.at(-1).time, '2026-09-04');
    assert.ok(windowBars(series.bars, 1).length < windowBars(series.bars, 3).length);
    assert.ok(windowBars(series.bars, 3).length < windowBars(series.bars, 6).length);
    assert.deepEqual(windowBars(series.bars, 1).at(-1), series.bars.at(-1));
  }
  assert.equal(snapshot.series.AMD.rejected.length, 1);
  assert.ok(!snapshot.series.AMD.bars.some(bar => bar.time === '2026-04-17'));
});

test('chart validation rejects impossible, unsorted and duplicate candles', () => {
  const bars = [{time:'2026-09-03',open:10,high:12,low:9,close:11,volume:100}, {time:'2026-09-04',open:11,high:13,low:10,close:12,volume:110}];
  assert.ok(validBars(bars));
  assert.ok(!validBars([...bars].reverse()));
  assert.ok(!validBars([bars[0], bars[0]]));
  assert.ok(!validBars([{...bars[0],open:14}, bars[1]]));
  assert.ok(!validBars([{...bars[0],volume:NaN}, bars[1]]));
});

test('new KOL members retain original posts, profile identity and followed-thesis eligibility', () => {
  const expected = {
    jukan: ['jukanHbmPricing', 'jukanHbmSupply'],
    rihard: ['rihardConsumer', 'rihardHarness'],
    ophir: ['ophirCompute', 'ophirConcentration'],
    gary: ['garyAutonomy', 'garyDistribution'],
  };
  for (const [id, sourceIds] of Object.entries(expected)) {
    const profile = authorProfile(id);
    assert.equal(profile.person.simulatedMember, true);
    assert.match(profile.person.avatarUrl, /^https:\/\/pbs\.twimg\.com\/profile_images\//);
    assert.deepEqual(profile.posts.map(entry => entry.update.sourceId).sort(), [...sourceIds].sort());
    assert.equal(profile.url.toLowerCase(), 'https://x.com/' + profile.person.publication.slice(1).toLowerCase());
    for (const sourceId of sourceIds) {
      assert.equal(SOURCES[sourceId].authorId, id);
      assert.match(SOURCES[sourceId].url, /\/status\/\d+$/);
      assert.match(SOURCES[sourceId].verifiedVia, /\/tweets\/raw$/);
      assert.ok(UPDATES.filter(post => post.sourceId === sourceId).every(post => post.kind === 'human'));
    }
  }
  const state = {...freshState(), interests:['MU'], followed:['memory','supply']};
  const posts = feedEntries(state).filter(entry => entry.kind === 'update');
  assert.equal(posts.filter(entry => entry.update.sourceId === 'jukanHbmSupply').length, 1);
  assert.deepEqual(posts.find(entry => entry.update.sourceId === 'jukanHbmSupply').thesisIds, ['memory','supply']);
  assert.ok(!posts.some(entry => entry.update.source?.authorId === 'gary'));
  assert.match(SOURCES.rihardHarness.text, /employee’s view/);
  assert.match(SOURCES.jukanHbmSupply.text, /management’s plans/);
  for (const id of ['rihardHarness','ophirCompute','garyAutonomy']) assert.equal(SOURCES[id].media.type, 'image');
});

test('author profiles preserve identity and attribution while deduplicating cross-thesis posts', () => {
  const member = authorProfile('dylan');
  assert.equal(member.person.simulatedMember, true);
  assert.ok(member.theses.length > 0);
  assert.ok(member.theses.every(thesis => thesis.author === 'Dylan Patel' && !thesis.curated));
  assert.equal(member.posts.length, new Set(UPDATES.filter(post => post.source.authorId === 'dylan').map(post => post.sourceId)).size);
  assert.ok(member.posts.every(entry => entry.update.speaker === 'Dylan Patel'));
  assert.ok(member.posts.find(entry => entry.update.sourceId === 'rocm').thesisIds.length > 1);
  const publicAuthor = authorProfile('swyx');
  assert.equal(publicAuthor.person.simulatedMember, undefined);
  assert.equal(publicAuthor.url, 'https://x.com/swyx');
  assert.deepEqual(publicAuthor.theses, []);
  assert.deepEqual(publicAuthor.posts.map(entry => entry.update.sourceId), ['swyxPricing']);
  assert.deepEqual(authorProfile('andrew').theses, []);
  assert.equal(authorProfile('andrew').posts.length, 1);
  assert.equal(authorProfile('missing'), null);
  assert.equal(authorProfile('__proto__'), null);
});

test('followed theses deliver distinct podcast and practitioner posts with evidence intact', () => {
  const state = {...freshState(), interests:['NVDA','MU','META'], followed:['inference','memory','efficiency','meta-personal']};
  const posts = feedEntries(state).filter(entry => entry.kind === 'update');
  for (const id of ['jensenPodcast','satyaPodcast','markPodcast','mollickAgent','swyxPricing','tinyZero']) {
    assert.equal(posts.filter(entry => entry.update.sourceId === id).length, 1);
    assert.ok(SOURCES[id].media);
    assert.match(SOURCES[id].media.url, /^https:\/\//);
  }
  assert.deepEqual(posts.find(entry => entry.update.sourceId === 'jensenPodcast').thesisIds, ['inference','memory']);
  assert.equal(getUpdate(state,'memory','memory-jensenPodcast').takeEvidenceId,'micron');
  assert.equal(getUpdate(state,'inference','inference-jensenPodcast').takeEvidenceId,'satyaPodcast');
  assert.equal(getUpdate(state,'amd-angle','amd-angle-amd').takeEvidenceId,'amdPlatform');
  assert.equal(AUTHORS[SOURCES.amdPlatform.authorId].name,'Vamsi Boppana');
  assert.ok(!posts.some(entry => entry.update.sourceId === 'amdPlatform'));
  assert.equal(SOURCES.tinyZero.date,'2025-01-24');
  assert.match(SOURCES.tinyZero.text,/Countdown/);
  assert.match(getUpdate(state,'efficiency','efficiency-tinyZero').impact,/not a frontier training program/);
});

test('thesis statements retain a mix of concise and developed views', () => {
  assert.ok(THESES.some(thesis => thesis.statement.length < 75));
  assert.ok(THESES.some(thesis => thesis.statement.length > 180));
  assert.ok(THESES.every(thesis => thesis.statement === thesis.premise));
});

test('an independent thesis keeps its reference and follow state without modifying the original or adding a reply', () => {
  const original = toggleFollow(freshState(), 'memory');
  const text = 'HBM packaging capacity will matter more than raw memory supply.';
  const next = createPersonal(original, {id:'personal-extension', sourceId:'memory', idea:text, focus:'Revenue & demand'});
  assert.equal(next.personal[0].origin, 'memory');
  assert.equal(next.personal[0].premise, text);
  assert.deepEqual(next.personal[0].tickers, ['MU', 'AI infrastructure']);
  assert.deepEqual(next.replies, []);
  assert.deepEqual(original.personal, []);
  assert.deepEqual(thesisRoot(next, 'memory'), thesisRoot(original, 'memory'));
  const restored = readState(JSON.stringify(next));
  assert.ok(discussionRelations(restored, 'memory').some(thesis => thesis.id === 'personal-extension'));
  assert.ok(discussionRelations(restored, 'personal-extension').some(thesis => thesis.id === 'memory'));
  assert.deepEqual(toggleFollow(restored, 'personal-extension').followed, ['memory']);
  const reply = addReply(original, {thesisId:'memory',updateId:'root-memory',text:'Which evidence supports this?',id:'reply-only'});
  assert.deepEqual(reply.personal, []);
  assert.deepEqual(reply.followed, ['memory']);
});

test('related theses merge shared sources and curated links without duplicating or including the current thesis', () => {
  const related = discussionRelations(freshState(), 'memory').map(thesis => thesis.id);
  assert.deepEqual(related, ['inference', 'supply', 'mu-datacenter']);
  assert.equal(new Set(related).size, related.length);
  assert.ok(!related.includes('memory'));
  assert.deepEqual(discussionRelations(freshState(), 'missing'), []);
});
test('replies persist and follow a shared source without leaking into another source', () => {
  const original = freshState();
  const source = getUpdate(original, 'inference', 'inference-computex');
  const state = addReply(original, {thesisId:'inference', updateId:source.id, text:'  What would disprove this?  ', id:'reply-1'});
  assert.deepEqual(original.replies, []);
  assert.equal(threadReplies(state, getUpdate(state,'valuation','valuation-computex'))[0].text, 'What would disprove this?');
  assert.deepEqual(threadReplies(state, getUpdate(state,'inference','inference-jevons')), []);
  assert.deepEqual(readState(JSON.stringify(state)), state);
  assert.deepEqual(freshState().replies, []);
});
test('reply validation rejects empty, oversized, duplicate and missing-target submissions', () => {
  const args = {thesisId:'inference', updateId:'inference-computex', id:'reply-1', text:'test'};
  assert.throws(() => addReply(freshState(), {...args,text:'  '}), /Write a reply/);
  assert.throws(() => addReply(freshState(), {...args,text:'x'.repeat(601)}), /600/);
  assert.throws(() => addReply(freshState(), {...args,updateId:'unknown'}), /no longer/);
  const state = addReply(freshState(), args);
  assert.throws(() => addReply(state, args), /already exists/);
});
test('legacy storage gets empty replies and saved replies cannot supply another author', () => {
  const {replies, ...legacy} = freshState();
  assert.deepEqual(readState(JSON.stringify(legacy)).replies, []);
  const restored = readState(JSON.stringify({...legacy,replies:[null,{id:'r',threadId:'computex',text:'My view',author:'Jensen Huang',avatarUrl:'bad'},{id:'empty',threadId:'computex',text:' '}]}));
  assert.deepEqual(restored.replies, [{id:'r',threadId:'computex',text:'My view'}]);
});

test('one interest ranks relevant theses without requiring thesis agreement', () => {
  const state = { ...freshState(), interests: ['MU'] };
  assert.equal(rankedTheses(state)[0].id, 'memory');
  assert.deepEqual(state.followed, []);
});
test('follow and unfollow update membership without mutating prior state', () => {
  const original = freshState();
  const followed = toggleFollow(original, 'inference');
  assert.deepEqual(followed.followed, ['inference']);
  assert.deepEqual(original.followed, []);
  assert.deepEqual(toggleFollow(followed, 'inference').followed, []);
  assert.strictEqual(toggleFollow(followed, 'unknown'), followed);
});
test('blank ideas and invalid focus cannot create a thesis', () => {
  assert.throws(() => createPersonal(freshState(), { idea: ' ', focus: 'Revenue & demand', id: 'personal-1' }), /Add your idea/);
  assert.throws(() => createPersonal(freshState(), { idea: 'test', focus: 'anything', id: 'personal-1' }), /focus/);
});
test('personal idea preserves arbitrary input without inventing an evaluation', () => {
  const idea = 'A new transit policy could change city logistics.';
  const state = createPersonal(freshState(), { idea, focus: 'Catalysts & timing', id: 'personal-1' });
  assert.equal(state.personal[0].premise, idea);
  assert.deepEqual(state.personal[0].tickers, []);
  assert.deepEqual(state.personal[0].evidence, []);
  assert.match(previewNextUpdate(state, 'personal-1').personal[0].update.body, /No live event/);
});
test('personalizing public thesis preserves original and subscription', () => {
  const before = JSON.stringify(THESES);
  const state = createPersonal(toggleFollow(freshState(), 'inference'), { idea: 'Watch NVIDIA demand', focus: 'Revenue & demand', id: 'personal-1', sourceId: 'inference' });
  assert.deepEqual(state.followed, ['inference', 'personal-1']);
  assert.equal(state.personal[0].origin, 'inference');
  const focused = createPersonal(freshState(), { idea: THESES[0].premise + '\nWatch the risks.', focus: 'Risks & counterevidence', id: 'personal-2', sourceId: 'inference' });
  assert.equal(focused.personal[0].title, THESES[0].title);
  assert.equal(JSON.stringify(THESES), before);
  assert.throws(() => revisePersonal(state, 'inference', { idea: 'x', focus: 'Revenue & demand' }), /own version/);
});
test('confirmed revision changes next output, retains prior update and is stable on replay', () => {
  let state = createPersonal(freshState(), { idea: 'Watch NVIDIA demand', focus: 'Revenue & demand', id: 'personal-1', sourceId: 'inference' });
  state = previewNextUpdate(state, 'personal-1');
  const first = state.personal[0].update.title;
  state = revisePersonal(state, 'personal-1', { idea: 'Watch NVIDIA risks', focus: 'Risks & counterevidence' });
  assert.equal(state.personal[0].prior.title, first);
  state = previewNextUpdate(state, 'personal-1');
  assert.notEqual(state.personal[0].update.title, first);
  assert.match(state.personal[0].update.body, /missing proof/);
  assert.match(state.personal[0].baseline, /risks & counterevidence/);
  assert.equal(state.personal[0].status, state.personal[0].update.impact);
  assert.equal(state.personal[0].revision, 2);
  assert.strictEqual(previewNextUpdate(state, 'personal-1'), state);
});
test('storage roundtrips and malformed data recovers safely', () => {
  const state = createPersonal(freshState(), { idea: 'Watch Micron', focus: 'Revenue & demand', id: 'personal-1' });
  assert.deepEqual(readState(JSON.stringify(state)), state);
  assert.deepEqual(readState('{bad'), freshState());
  assert.equal(readState(JSON.stringify({ ...state, personal: [{ id: 'personal-bad' }] })).personal.length, 0);
  assert.deepEqual(readState(JSON.stringify({ ...freshState(), followed: ['invalid'], interests: ['unknown'] })).followed, []);
  const unsafe = { ...state, personal: [{ ...state.personal[0], id: 'personal-" onclick="alert(1)' }] };
  assert.equal(readState(JSON.stringify(unsafe)).personal.length, 0);
  const imported = readState(JSON.stringify({ ...state, personal: [{ ...state.personal[0], portrait: 'untrusted.jpg', avatarUrl: 'https://untrusted.invalid/image', source: { url: 'javascript:alert(1)' } }] }));
  assert.equal(imported.personal[0].portrait, undefined);
  assert.equal(imported.personal[0].avatarUrl, undefined);
  assert.equal(imported.personal[0].source, undefined);
});

test('onboarding follows only explicitly chosen relevant views and preserves other subscriptions', () => {
  const initial = { ...freshState(), followed: ['inference', 'robotaxi'] };
  const state = completeOnboarding(initial, { interests: ['NVDA'], selectedIds: ['valuation', 'memory', 'missing'] });
  assert.deepEqual(state.interests, ['NVDA']);
  assert.deepEqual(state.followed, ['robotaxi', 'valuation']);
  assert.deepEqual(initial.followed, ['inference', 'robotaxi']);
  assert.deepEqual(thesisChoices('NVDA').map(thesis => thesis.id), ['inference', 'valuation', 'platform', 'efficiency']);
});
test('a ticker with no selected thesis yields basic content and independent discovery', () => {
  const state = completeOnboarding(freshState(), { interests: ['NVDA'], selectedIds: [] });
  assert.deepEqual(state.followed, []);
  const entries = feedEntries(state);
  assert.ok(entries.some(entry => entry.kind === 'update' && entry.update.tickerContent && entry.update.sourceId));
  assert.ok(entries.some(entry => entry.kind === 'recommendation' && entry.thesisId === 'inference'));
  assert.deepEqual(feedEntries(freshState()), []);
});
test('a user view keeps its chosen ticker even when their sentence does not name it', () => {
  const idea = 'Demand could grow faster than efficiency improves.';
  const state = completeOnboarding(freshState(), { interests: ['NVDA'], selectedIds: ['inference'], ownIdeas: [{ id: 'personal-new', tickerId: 'NVDA', idea }] });
  assert.deepEqual(state.followed, ['inference', 'personal-new']);
  assert.deepEqual(state.personal[0].tickers, ['NVDA']);
  assert.equal(state.personal[0].premise, idea);
  assert.equal(state.personal[0].evidence.length, 0);
  assert.deepEqual(readState(JSON.stringify(state)), state);
});
test('For You interleaves dated, deduplicated source posts with discovery', () => {
  const state = { ...freshState(), interests: ['NVDA'], followed: ['inference', 'valuation'] };
  const entries = feedEntries(state);
  assert.equal(entries[2].kind, 'recommendation');
  assert.equal(entries[2].thesisId, 'platform');
  const updates = entries.filter(entry => entry.kind === 'update' && entry.update.sourceId);
  assert.deepEqual(updates.map(entry => entry.update.sourceId), ['ophirConcentration', 'jensenPodcast', 'computex', 'ophirCompute', 'mollickAgent', 'valuation', 'microsoft', 'jevons', 'ngApplications', 'deepseek']);
  assert.deepEqual(updates.find(entry => entry.update.sourceId === 'computex').thesisIds, ['inference', 'valuation']);
  assert.equal(thesisUpdates(state, 'inference').length, 8);
  assert.equal(getUpdate(state, 'inference', 'inference-jevons').speaker, 'Satya Nadella');
  assert.equal(getUpdate(state, 'inference', 'valuation-valuation'), undefined);
});
test('follow and unfollow preserve shared sources but change their tracked associations', () => {
  const state = { ...freshState(), interests: ['TSLA'], followed: ['robotaxi'] };
  const followed = toggleFollow(state, 'autonomy');
  const entries = feedEntries(followed).filter(entry => entry.kind === 'update');
  assert.equal(entries.length, 4);
  assert.ok(entries.filter(entry => entry.update.sourceId !== 'garyDistribution').every(entry => entry.thesisIds.includes('robotaxi') && entry.thesisIds.includes('autonomy')));
  assert.deepEqual(entries.find(entry => entry.update.sourceId === 'garyDistribution').thesisIds, ['autonomy']);
  assert.ok(!relatedTheses(followed).some(thesis => thesis.id === 'autonomy'));
  const unfollowed = toggleFollow(followed, 'robotaxi');
  assert.ok(feedEntries(unfollowed).filter(entry => entry.kind === 'update').every(entry => entry.thesisIds.length === 1 && entry.thesisIds[0] === 'autonomy'));
  assert.ok(relatedTheses(unfollowed).some(thesis => thesis.id === 'robotaxi'));
  assert.ok(feedEntries(toggleFollow(unfollowed, 'autonomy')).every(entry => entry.kind === 'recommendation' || entry.update.tickerContent));
});

test('removing a pending ticker excludes its choices and personal drafts from confirmation', () => {
  const state = completeOnboarding(freshState(), { interests: ['NVDA'], selectedIds: ['inference', 'memory'], ownIdeas: [{id: 'personal-mu', tickerId: 'MU', idea: 'Watch margins.'}] });
  assert.deepEqual(state.followed, ['inference']);
  assert.deepEqual(state.personal, []);
});
test('public posts use real sources, dates and portraits rather than invented contributors', () => {
  assert.equal(Object.keys(SOURCES).length, 33);
  assert.equal(THESES.length, 27);
  for (const update of UPDATES) {
    const source = SOURCES[update.sourceId];
    assert.equal(update.speaker, AUTHORS[source.authorId].name);
    assert.equal(update.post, source.text);
    assert.equal(update.order, Date.parse(source.date));
    assert.ok(update.avatarUrl);
    assert.match(source.kind, /summary|excerpt/);
    assert.match(source.url, /^https:\/\//);
  }
  const update = getUpdate(freshState(), 'inference', 'inference-jevons');
  assert.equal(update.speaker, 'Satya Nadella');
  assert.equal(THESES.find(thesis => thesis.id === update.thesisId).author, 'Jensen Huang');
});
test('quoted source excerpts are short and linked; all thesis origins appear in their trail', () => {
  for (const source of Object.values(SOURCES)) {
    if (source.quote) assert.ok(source.text.split(/\s+/).length <= 25);
    if (source.relatedSourceId) assert.ok(SOURCES[source.relatedSourceId]);
  }
  for (const thesis of THESES) {
    assert.ok(thesisUpdates(freshState(), thesis.id).some(update => update.sourceId === thesis.originSourceId));
  }
});
test('following every public view yields one primary card per source', () => {
  const state = { ...freshState(), followed: THESES.map(thesis => thesis.id), interests: INTERESTS.map(item => item.id) };
  const entries = feedEntries(state).filter(entry => entry.update.sourceId);
  assert.equal(entries.length, Object.values(SOURCES).filter(source => !source.evidenceOnly).length);
  assert.equal(new Set(entries.map(entry => entry.update.sourceId)).size, entries.length);
  assert.equal(entries.reduce((sum, entry) => sum + entry.thesisIds.length, 0), UPDATES.length);
});
test('a private thesis remains distinct and first in a source-backed feed', () => {
  const state = createPersonal(toggleFollow(freshState(), 'inference'), { idea:'Watch my own risk', focus:'Risks & counterevidence', id:'personal-first' });
  const entries = feedEntries(state).filter(entry => entry.kind === 'update');
  assert.equal(entries[0].thesisId, 'personal-first');
  assert.equal(entries[0].update.source, undefined);
});
test('stored private updates cannot impersonate public source attribution', () => {
  const state = createPersonal(freshState(), { idea:'My idea', focus:'Revenue & demand', id:'personal-attribution' });
  Object.assign(state.personal[0].update, { source:SOURCES.jevons, sourceId:'jevons', avatarUrl:AUTHORS.satya.avatarUrl, speaker:'Satya Nadella', post:'Invented statement' });
  const update = thesisUpdates(readState(JSON.stringify(state)), 'personal-attribution')[0];
  assert.equal(update.speaker, 'You');
  assert.equal(update.post, 'My idea');
  assert.equal(update.source, undefined);
  assert.equal(update.sourceId, undefined);
  assert.equal(update.avatarUrl, undefined);
});

test('all nine logo-backed tickers have selectable views and substantive followed updates', () => {
  const tickers = INTERESTS.filter(item => !item.theme);
  assert.equal(tickers.length, 9);
  for (const ticker of tickers) {
    assert.ok(ticker.logo);
    const views = thesisChoices(ticker.id);
    assert.ok(views.length >= 3);
    assert.ok(views.every(view => view.pickerTitle));
    const state = completeOnboarding(freshState(), { interests: [ticker.id], selectedIds: [views[0].id] });
    const entries = feedEntries(state).filter(entry => entry.kind === 'update');
    assert.ok(entries.length >= 2);
    assert.equal(new Set(entries.map(entry => entry.update.sourceId || entry.update.id)).size, entries.length);
    assert.ok(entries.every(entry => entry.update.body || entry.update.post));
    assert.deepEqual(readState(JSON.stringify(state)), state);
  }
});

test('one thesis delivers public speech, human counterargument and agent evidence', () => {
  const state = toggleFollow(freshState(), 'memory');
  const entries = feedEntries(state).filter(entry => entry.kind === 'update');
  assert.ok(entries.some(entry => entry.update.kind === 'human' && entry.update.sourceId === 'memorywall' && entry.update.avatarUrl && /cycles/.test(entry.update.post)));
  assert.ok(entries.some(entry => entry.update.kind === 'agent' && entry.update.evidenceId === 'micron'));
  assert.ok(entries.some(entry => entry.update.sourceId === 'hbm'));
  assert.deepEqual(state.followed, ['memory']);
});

test('presentation opening includes member, X, video, agent and other sources without changing dates or eligibility', () => {
  const state = {...freshState(), interests: ['NVDA', 'MU', 'AMD'], followed: ['inference', 'efficiency', 'memory', 'amd-angle']};
  const posts = feedEntries(state).filter(entry => entry.kind === 'update');
  assert.deepEqual(posts.slice(0, 5).map(entry => entry.update.sourceId || entry.update.id), ['rihardHarness', 'swyxPricing', 'jensenPodcast', 'memory-evidence', 'amd']);
  assert.equal(new Set(posts.map(entry => entry.update.sourceId || entry.update.id)).size, posts.length);
  assert.ok(posts.every(entry => entry.thesisIds.some(id => state.followed.includes(id))));
  assert.ok(posts.filter(entry => entry.update.source).every(entry => entry.update.order === Date.parse(entry.update.source.date)));
  assert.equal(AUTHORS.dylan.simulatedMember, true);
  assert.equal(AUTHORS.swyx.simulatedMember, undefined);
  const memoryPost = getUpdate(state, 'memory', 'memory-memorywall');
  assert.ok(threadReplies(state, memoryPost).some(reply => reply.id === 'memory-evidence'));
});
test('related thesis discovery does not subscribe to its complete discussion', () => {
  const state = toggleFollow(freshState(), 'inference');
  assert.ok(relatedTheses(state).some(thesis => thesis.id === 'efficiency'));
  assert.ok(!feedEntries(state).some(entry => entry.kind === 'update' && entry.thesisId === 'efficiency'));
  assert.ok(feedEntries(toggleFollow(state,'efficiency')).some(entry => entry.kind === 'update' && entry.thesisIds.includes('efficiency')));
});
test('cross-ticker follows share one thesis and ticker removal preserves explicit follows', () => {
  const state = toggleFollow({...freshState(), interests:['NVDA','MSFT']}, 'efficiency');
  assert.equal(thesisChoices('NVDA').find(t => t.id === 'efficiency'), thesisChoices('MSFT').find(t => t.id === 'efficiency'));
  assert.deepEqual(toggleTicker(state,'NVDA').followed,['efficiency']);
});
test('private activation is explicit; paused automation permits human replies and empty runs add no posts', () => {
  let state = createPersonal(freshState(),{idea:'HBM margins could stay strong.',focus:'Revenue & demand',id:'personal-discuss'});
  assert.equal(state.personal[0].automation, undefined);
  state = setTracking(state,'personal-discuss','active');
  const before = discussionPosts(state,'personal-discuss').length;
  state = simulateRun(state,'personal-discuss');
  assert.equal(discussionPosts(state,'personal-discuss').length,before);
  assert.match(state.personal[0].automation.lastRun,/No new material/);
  state = simulateRun(state,'personal-discuss','failed');
  assert.match(state.personal[0].automation.lastRun,/Source unavailable/);
  state = setTracking(state,'personal-discuss','paused');
  const paused = state.personal[0].automation.lastRun;
  state = simulateRun(state,'personal-discuss');
  assert.equal(state.personal[0].automation.lastRun,paused);
  state = addReply(state,{thesisId:'personal-discuss',updateId:'root-personal-discuss',id:'manual-1',text:'Capacity additions would change my mind.'});
  assert.ok(feedEntries(state).some(entry => entry.update.id === 'manual-1'));
  assert.deepEqual(readState(JSON.stringify(state)),state);
});
test('author updates preserve the original judgment and user questions remain identifiable', () => {
  let state = createPersonal(freshState(),{idea:'HBM demand will grow.',focus:'Revenue & demand',id:'personal-revise'});
  state = revisePersonal(state,'personal-revise',{idea:'HBM demand may grow only if utilization improves.',focus:'Risks & counterevidence'});
  assert.equal(thesisRoot(state,'personal-revise').post,'HBM demand will grow.');
  assert.ok(discussionPosts(state,'personal-revise').some(post => post.kind === 'author-update' && post.post.includes('only if')));
  assert.equal(isResearchQuestion('我想了解 HBM'),true);
  assert.equal(isResearchQuestion('How would lower costs affect NVDA?'),true);
  assert.equal(isResearchQuestion('HBM could improve margins.'),false);
});

test('refresh delivers successive unseen batches, keeps provenance and exhausts honestly', () => {
  const state = {...freshState(), interests:['MU','TSLA','MSFT'], followed:THESES.map(thesis => thesis.id)};
  const entries = feedEntries(state);
  const pending = feedRefreshBatch(entries);
  assert.equal(pending.length, 26);
  const before = feedDelivery(entries, pending);
  assert.equal(before.entries.length, 8);
  assert.deepEqual(before.entries.slice(0,5), entries.slice(0,5));
  let delivered = [], current = before;
  const seen = new Set(before.entries.map(entry => entry.update.sourceId || entry.update.id));
  let rounds = 0;
  while (current.count) {
    const batch = current.nextBatch;
    assert.ok(batch.every(id => !seen.has(id)));
    delivered = [...batch, ...delivered];
    current = feedDelivery(entries, pending, delivered);
    assert.deepEqual(current.entries.slice(0,batch.length).map(entry => entry.update.sourceId || entry.update.id), batch);
    batch.forEach(id => seen.add(id));
    assert.equal(new Set(current.entries.map(entry => entry.update.sourceId || entry.update.id)).size, current.entries.length);
    rounds++;
  }
  assert.equal(rounds, 9);
  const after = current;
  assert.equal(after.entries.length, entries.length);
  assert.equal(new Set(after.entries.map(entry => entry.update.sourceId || entry.update.id)).size, after.entries.length);
  assert.deepEqual(feedDelivery(entries, pending, delivered), after);
  const own = {kind:'update', thesisId:'personal-test', update:{id:'own-post',speaker:'You'}};
  assert.deepEqual(feedDelivery([own,...entries], pending, before.nextBatch).entries.slice(0,3).map(entry => entry.update.sourceId || entry.update.id), before.nextBatch);
  assert.ok(after.entries.every(entry => entries.includes(entry)));
  const narrowed = feedEntries({...state, interests:['MU'], followed:['memory']});
  const visible = feedDelivery(narrowed, pending, delivered);
  assert.ok(visible.entries.every(entry => narrowed.includes(entry)));
  assert.deepEqual(feedRefreshBatch([]), []);
  assert.deepEqual(feedRefreshBatch(entries.slice(0,4)), []);
  assert.equal(feedDelivery([],pending).count, 0);
});

test('inline Alva insights are selective and preserve all source readings', () => {
  const withInsight = new Set(UPDATES.filter(post => post.inlineInsight).map(post => post.sourceId));
  assert.equal(withInsight.size, 12);
  assert.equal(UPDATES.find(post => post.sourceId === 'jukanHbmSupply').inlineInsight, false);
  assert.equal(UPDATES.find(post => post.sourceId === 'jukanHbmPricing').inlineInsight, true);
  assert.ok(UPDATES.every(post => post.impact && post.source.url));
});

test('source previews distinguish social and audiovisual media and keep ordinary documents inline', () => {
  assert.equal(sourcePreviewType(SOURCES.swyxPricing), 'x');
  assert.equal(sourcePreviewType(SOURCES.jensenPodcast), 'youtube');
  assert.equal(sourcePreviewType(SOURCES.markPodcast), 'podcast');
  assert.equal(sourcePreviewType(SOURCES.amdPlatform), null);
  assert.equal(sourcePreviewType(SOURCES.micron), null);
  assert.equal(sourcePreviewType(undefined), null);
  assert.equal(sourcePreviewType({kind:'Reddit · summary',media:{type:'image'}}), 'reddit');
});

test('expanded insights preserve cited facts and uncertainty about adoption and commercial results', () => {
  assert.equal(THESES.find(thesis => thesis.id === 'robotaxi').author, 'Alva');
  const gary = UPDATES.find(post => post.sourceId === 'garyAutonomy');
  assert.equal(gary.takeEvidenceId, 'ark');
  assert.match(gary.impact, /90%.*projected enterprise value/);
  assert.match(UPDATES.find(post => post.sourceId === 'garyDistribution').impact, /no booking evidence/);
  assert.match(UPDATES.find(post => post.sourceId === 'jukanHbmSupply').impact, /stated HBM4 expansion/);
  assert.match(UPDATES.find(post => post.sourceId === 'microsoft').impact, /annual revenue run rate/);
  assert.ok(UPDATES.every(post => post.impact && SOURCES[post.sourceId]));
});
