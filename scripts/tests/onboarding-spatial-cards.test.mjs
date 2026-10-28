import test from 'node:test';
import assert from 'node:assert/strict';
import {SpatialCards,springSamples} from '../../public/demo/m-baby/onboarding/spatial-cards.js';

function settle(solver){
  for(let frames=0;frames<1200;frames++)if(!solver.step(1/120))return frames;
  assert.fail('A four-card cluster must come to rest within ten seconds');
}
function populate(width,height){
  const solver=new SpatialCards(width,height);
  for(const [id,h] of [['tickers',35],['riot',206],['semi',226],['matt',248]]){
    solver.promote(id,Math.min(361,width-32),Math.min(h,height-24));settle(solver);
  }
  return solver;
}

test('physical spring overshoots modestly and ends exactly at rest',()=>{
  const samples=springSamples();
  assert.equal(samples[0].value,0);assert.equal(samples.at(-1).value,1);
  assert.ok(Math.max(...samples.map(sample=>sample.value))>1);
  assert.ok(Math.max(...samples.map(sample=>sample.value))<1.08);
  assert.ok(samples.every(sample=>Number.isFinite(sample.value)));
});

test('a new centre card pushes the existing card through contact forces',()=>{
  const solver=new SpatialCards(393,481);
  solver.promote('ticker',361,35);settle(solver);
  const old=solver.bodies.get('ticker'),initial=old.x;
  solver.promote('signal',361,206);
  assert.equal(old.x,initial,'promotion does not teleport previous cards to slide targets');
  solver.step(1/60);
  assert.ok(Math.hypot(old.vx,old.vy)>0,'actual contact produces velocity');
  settle(solver);
  assert.ok(Math.hypot(old.x-196.5,old.y-240.5)>40);
  assert.equal(solver.bodies.get('signal').x,196.5);
  assert.equal(solver.bodies.get('signal').y,240.5);
});

test('four cards settle finitely at narrow, common and large viewport sizes',()=>{
  for(const [width,height] of [[320,212],[360,420],[393,481],[440,578]]){
    const solver=populate(width,height);
    for(const body of solver.snapshot()){
      assert.ok([body.x,body.y,body.vx,body.vy,body.scale,body.rotation].every(Number.isFinite));
      assert.ok(body.x>=24&&body.x<=width-24);
      assert.ok(body.y>=24&&body.y<=height-24);
      assert.ok(Math.abs(body.rotation)<=3);
      if(body.active){assert.equal(body.x,width/2);assert.equal(body.y,height/2);}
    }
  }
});

test('repeated emissions reuse bodies and resize keeps the current card centred',()=>{
  const solver=populate(393,481),original=solver.bodies.get('riot');
  for(let i=0;i<18;i++){solver.promote(['riot','semi','matt'][i%3],361,226);settle(solver);}
  assert.equal(solver.bodies.size,4);assert.equal(solver.bodies.get('riot'),original);
  solver.resize(320,212);for(const body of solver.snapshot())solver.measure(body.id,288,Math.min(188,body.height));settle(solver);
  const active=solver.bodies.get(solver.active);assert.equal(active.x,160);assert.equal(active.y,106);
});

test('bounded integration survives a delayed frame without explosive velocity',()=>{
  const solver=populate(320,212);solver.promote('riot',288,188);solver.step(30);settle(solver);
  for(const body of solver.snapshot())assert.ok(Number.isFinite(body.x)&&Number.isFinite(body.y)&&Math.abs(body.rotation)<=3);
});
