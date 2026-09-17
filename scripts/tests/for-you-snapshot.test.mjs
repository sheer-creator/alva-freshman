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
