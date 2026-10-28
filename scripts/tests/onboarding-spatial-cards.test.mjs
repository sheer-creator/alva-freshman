import test from 'node:test';
import assert from 'node:assert/strict';
import {SpatialCards,springSamples} from '../../public/demo/m-baby/onboarding/spatial-cards.js';

function assertPlanar(solver){
  const bodies=solver.snapshot();
  for(const body of bodies){
    assert.ok([body.x,body.y,body.vx,body.vy,body.scale].every(Number.isFinite));
    assert.equal(body.layer,0);assert.equal(body.rotation,0);
    if(!body.active)assert.equal(body.scale,1,'previous cards retain their full size');
  }
  for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
    const a=bodies[i],b=bodies[j];if(a.scale<=0||b.scale<=0)continue;
    const overlapX=(a.width*a.scale+b.width*b.scale)/2-Math.abs(a.x-b.x);
    const overlapY=(a.height*a.scale+b.height*b.scale)/2-Math.abs(a.y-b.y);
    assert.ok(overlapX<=.0001||overlapY<=.0001,`${a.id} and ${b.id} overlap by ${overlapX} × ${overlapY}`);
  }
}
function settle(solver){
  for(let frames=0;frames<1200;frames++){
    const moving=solver.step(1/120);assertPlanar(solver);
    if(!moving){for(const body of solver.snapshot())assert.equal(body.scale,1);return frames;}
  }
  assert.fail('The planar cards must come to rest within ten seconds');
}
function populate(width,height){
  const solver=new SpatialCards(width,height);
  for(const [id,h] of [['riot',206],['semi',184],['matt',206]]){
    solver.promote(id,Math.min(361,width-32),Math.min(h,height-24));assertPlanar(solver);settle(solver);
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

test('centre expansion pushes full rectangles apart without teleporting or overlap',()=>{
  const solver=new SpatialCards(393,481);
  solver.promote('riot',361,206);settle(solver);
  const old=solver.bodies.get('riot'),initialY=old.y;
  const incoming=solver.promote('semi',361,184);
  assert.equal(old.y,initialY,'insertion does not prescribe a new old-card position');
  assert.equal(incoming.scale,0,'new content waits for real space instead of covering the old card');
  solver.step(1/60);assertPlanar(solver);
  assert.ok(Math.abs(old.vy)>0,'rectangle contact produces displacement velocity');
  settle(solver);
  assert.ok(Math.abs(old.x-196.5)>=24&&Math.abs(old.x-196.5)<=36,'contact adds only a modest sideways displacement');
  assert.ok(Math.abs(old.y-240.5)>195);
  assert.equal(incoming.x,196.5);assert.equal(incoming.y,240.5);
});

test('three full cards never overlap, all finish at scale one, and edge cards remain partly visible',()=>{
  for(const [width,height] of [[320,212],[360,420],[393,481],[440,578]]){
    const solver=populate(width,height);
    for(const body of solver.snapshot()){
      assert.equal(body.scale,1);assert.equal(body.rotation,0);assert.equal(body.layer,0);
      assert.ok(body.y+body.height/2>0&&body.y-body.height/2<height,'older card leaves a visible edge');
      if(body.active){assert.equal(body.x,width/2);assert.equal(body.y,height/2);}
    }
  }
});

test('the minimum rectangle separation axis can be horizontal when geometry favours it',()=>{
  const solver=new SpatialCards(393,481);solver.promote('old',361,206);settle(solver);
  const old=solver.bodies.get('old');old.x+=280;
  solver.promote('new',361,206);settle(solver);
  assert.equal(old.y,240.5);assert.ok(old.x-196.5>=361);
});

test('repeated and rapidly interrupted emissions reuse three bodies without depth scaling',()=>{
  const solver=populate(393,481),original=solver.bodies.get('riot');
  for(let i=0;i<18;i++){
    solver.promote(['riot','semi','matt'][i%3],361,i%3===1?184:206);assertPlanar(solver);
    for(let frame=0;frame<6;frame++){solver.step(1/120);assertPlanar(solver);}
  }
  settle(solver);assert.equal(solver.bodies.size,3);assert.equal(solver.bodies.get('riot'),original);
});

test('resize and measurement changes preserve full-size separation and the current centre',()=>{
  const solver=populate(393,481);
  solver.resize(320,212);for(const body of solver.snapshot())solver.measure(body.id,288,Math.min(188,body.height));settle(solver);
  assert.equal(solver.bodies.get(solver.active).x,160);assert.equal(solver.bodies.get(solver.active).y,106);
  solver.resize(440,578);for(const body of solver.snapshot())solver.measure(body.id,361,206);settle(solver);
  assert.equal(solver.bodies.get(solver.active).x,220);assert.equal(solver.bodies.get(solver.active).y,289);
});

test('a delayed frame and instant revisits produce finite non-overlapping rectangles',()=>{
  const solver=populate(320,212);solver.promote('riot',288,188);solver.step(30);assertPlanar(solver);settle(solver);
  for(const id of ['semi','matt','riot']){solver.promote(id,288,188,{instant:true});assertPlanar(solver);settle(solver);}
});
