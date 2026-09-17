import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const root=new URL('../../public/demo/for-you-feed/',import.meta.url);
const d=JSON.parse(await readFile(new URL('snapshot.json',root),'utf8'));
test('complete static snapshot has usable, deduplicated backend streams',()=>{
 assert.equal(Object.keys(d.theses).length,441);
 assert.equal(d.profiles.length,5);
 for(const p of d.profiles){
  const rows=d.feeds[p.id];assert.equal(rows.length,441);
  assert.equal(new Set(rows.map(x=>x.id)).size,rows.length);
  for(const row of rows){assert.ok(d.theses[row.id]);assert.ok(['direct','related','trending'].includes(row.pool))}
  for(const id of d.baselineFollows[p.id])assert.ok(d.theses[id]);
 }
 assert.equal(d.baselineFollows[1].length,0);
 assert.ok(d.feeds[1].every(x=>x.pool==='trending'));
});
test('Related references resolve and preserve descending backend scores across authors',()=>{
 assert.equal(Object.keys(d.related).length,441);
 for(const [id,hits] of Object.entries(d.related)){
  assert.ok(hits.length<=5);const seen=new Set();let previous=Infinity;
  for(const hit of hits){
   assert.ok(d.theses[hit.id]);assert.notEqual(hit.id,id);assert.ok(!seen.has(hit.id));seen.add(hit.id);
   assert.notEqual(d.theses[id].catalog.author_handle,d.theses[hit.id].catalog.author_handle);
   assert.ok(Number.isFinite(hit.score));assert.ok(hit.score<=previous);previous=hit.score;
  }
 }
});
test('static assets have one data fetch and isolated inline source-label classes',async()=>{
 const js=await readFile(new URL('app.js',root),'utf8');const html=await readFile(new URL('index.html',root),'utf8');
 assert.equal((js.match(/fetch\(/g)||[]).length,1);assert.ok(js.includes("fetch('snapshot.json')"));
 assert.ok(!/localhost|127\.0\.0\.1|setInterval/.test(js));
 assert.ok(js.includes('class="origin origin-${pool}"'));assert.ok(html.includes('.origin.origin-related'));
 assert.ok(html.includes('静态快照'));assert.ok(html.includes('不实时重排'));
});
test('every Related score includes traceable entity and bounded freshness bonuses',()=>{
 const asOf=Date.parse(d.rankingExperiment.asOf);
 const hits=[...Object.values(d.related).flat(),...Object.values(d.feeds).flat().filter(h=>h.pool==='related')];
 for(const h of hits){
  assert.ok(d.theses[h.sourceThesisId]);assert.ok(h.entityBonus===0||h.entityBonus===0.05);
  const age=Math.max(0,(asOf-Date.parse(d.theses[h.id].catalog.published_at))/86400000);
  const expected=0.03*2**(-Math.max(0,age-30)/30);
  assert.ok(h.freshnessBonus>0&&h.freshnessBonus<=0.03);
  assert.ok(Math.abs(h.freshnessBonus-expected)<1e-10);
  assert.ok(Math.abs(h.score-h.semantic-h.entityBonus-h.freshnessBonus)<1e-10);
 }
 assert.equal(d.rankingExperiment.baselineReplayVerified,true);
});
test('published HTML pins matching code and data by content hash',async()=>{
 const {createHash}=await import('node:crypto');
 const hash=b=>createHash('sha256').update(b).digest('hex').slice(0,16);
 const html=await readFile(new URL('index.html',root),'utf8');
 const entry=html.match(/src="(releases\/app\.([a-f0-9]{16})\.js)"/);assert.ok(entry);
 const app=await readFile(new URL(entry[1],root),'utf8');assert.equal(hash(app),entry[2]);
 const source=await readFile(new URL('app.js',root),'utf8');
 const data=app.match(/fetch\('(releases\/snapshot\.([a-f0-9]{16})\.json)'\)/);assert.ok(data);
 const bytes=await readFile(new URL(data[1],root));assert.equal(hash(bytes),data[2]);
 assert.deepEqual(bytes,await readFile(new URL('snapshot.json',root)));
 assert.equal(app,source.replace("fetch('snapshot.json')",`fetch('${data[1]}')`));
 assert.ok(!app.includes("$('#interests')"));
});
