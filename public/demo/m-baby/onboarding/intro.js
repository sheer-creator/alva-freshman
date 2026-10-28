import { node, image, escapeHTML, heading, topbar } from './ui.js';
import { previewCard } from './cards.js?v=6';
import { SpatialCards, springSamples } from './spatial-cards.js?v=2';

const FALLBACK_COPY = {
  theses: {title:'New theses,\nevery day.',description:'Explore a daily stream of market perspectives.'},
  analyzing: {title:'Alva analyzes each thesis.',description:'Alva finds the latest signals for each thesis and analyzes what they mean for its direction.'},
  signals: {title:'Track what matters.',description:'Follow the signals that support or challenge each thesis as the story develops.'},
};
// These describe the work already shown by this demo, not invented progress percentages.
const ANALYSIS_TASKS = [
  'Finding signals relevant to this thesis.',
  'Reading the latest sources.',
  'Connecting signals to this thesis.',
  'Checking what supports this thesis.',
  'Looking for challenging signals.',
  'Watching for new signals.',
];

function analyzingCard(api) {
  return node('div','analysis-card is-analyzing',`<div class="analysis-skeleton">${image(api.data.icons['Alva / Onboarding source'],api,'analysis-logo','Alva')}<div class="skeleton-lines" aria-hidden="true"><i></i><i></i></div><i class="analysis-bone analysis-corner-bone" aria-hidden="true"></i></div><div class="analysis-status"><div><strong>Alva Analyzing</strong><i class="analysis-bone" aria-hidden="true"></i></div><div><span class="analysis-task">${ANALYSIS_TASKS[0]}</span><i class="analysis-bone" aria-hidden="true"></i></div></div>`);
}

export function signalCard(item, api) {
  const n=node('article','signal-card');
  const stance=String(item.stance||'Mixed');
  n.dataset.stance=stance.toLowerCase();
  const source=node('div','signal-source');
  source.innerHTML=`<div class="signal-author">${image(item.avatar,api,'signal-avatar',item.source)}<div class="signal-identity"><div class="signal-name-and-time"><strong>${escapeHTML(item.source)}</strong><time>${escapeHTML(item.time)}</time></div><span class="signal-role">${escapeHTML(item.role)}</span></div></div>`;
  const summary=node('p','signal-summary',escapeHTML(item.summary));
  if(item.url){
    const link=node('a','signal-source-link',`${escapeHTML(new URL(item.url).hostname.replace(/^www\./,''))}<span aria-hidden="true"> ↗</span>`);
    link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',`Read ${item.source} source`);
    summary.append(document.createTextNode(' '),link);
  }
  source.append(summary);
  const analysis=node('div','signal-analysis-block');
  analysis.append(node('div','signal-stance',`<span class="signal-alva-mark">${image(api.data.icons['Alva / Onboarding source'],api,'','Alva')}</span><span class="signal-verdict">${escapeHTML(stance)}</span>`));
  analysis.append(node('p','signal-analysis',escapeHTML(item.analysis)));
  n.append(source,analysis);return n;
}

export function renderIntroPage(api) {
  const copy=api.data.introCopy||FALLBACK_COPY;
  const root=node('section','page intro-page');root.setAttribute('aria-label','Explore theses and signals');root.dataset.phase='theses';
  root.append(topbar(api),heading(copy.theses.title,copy.theses.description));
  const message=root.querySelector('.intro-heading'),stage=node('div','intro-stage');root.append(stage);
  message.style.visibility='hidden';
  const marquee=node('div','marquee');stage.append(marquee);
  const tracks=[],starts=[16,-148,-226],laneOrders=[[0,1,2,0,1,2],[1,2,0,1,0,2],[0,1,2,0,1,2]];
  laneOrders.forEach((order,i)=>{
    const lane=node('div','marquee-lane'),track=node('div','marquee-track');
    order.forEach(k=>{const slot=node('div','preview-slot');slot.append(previewCard(api.data.previews[k],api));track.append(slot);});
    track.style.transform=`translateX(${starts[i]}px)`;lane.append(track);marquee.append(lane);tracks.push(track);
  });
  const footer=node('footer','page-footer'),got=node('button','btn btn-primary','Got it');got.type='button';got.disabled=true;got.onclick=()=>api.go('people');footer.append(got);root.append(footer);
  let alive=true,started=false,epoch=0,stack=null,pair=null,analysis=null,reveal=null,output=null,stream=null;
  let solver=null,frame=0,lastFrame=0,emitted=0,taskIndex=0,pairDepth=1,readingUntil=0,holding=false;
  let stageWidth=0,stageHeight=0;
  const animations=new Set(),hiddenAnimations=new Set(),timers=new Set(),cards=new Map();
  const valid=token=>alive&&root.isConnected&&token===epoch;
  const now=()=>performance.now();
  const jitter=(minimum,range)=>minimum+Math.random()*range;
  const unit=()=>root.getBoundingClientRect().width/root.clientWidth||1;
  const fit=height=>Math.min(1,Math.max(1,stage.clientHeight-24)/height);
  const rememberStage=()=>{stageWidth=stage.clientWidth;stageHeight=stage.clientHeight;};
  const play=(element,keyframes,duration=240,options={})=>{
    const animation=element.animate(keyframes,{duration,easing:'cubic-bezier(.4,0,.2,1)',...options});
    animations.add(animation);
    if(document.hidden){hiddenAnimations.add(animation);animation.pause();}
    return animation.finished.catch(()=>{}).finally(()=>{animation.cancel();animations.delete(animation);hiddenAnimations.delete(animation);});
  };
  const spring=(element,values,duration=560,config={})=>play(element,springSamples(duration,config).map(({offset,value})=>({offset,...values(value)})),duration,{easing:'linear'});
  function schedule(entry){
    if(document.hidden)return;
    entry.started=now();entry.timer=setTimeout(()=>{timers.delete(entry);entry.resolve();},entry.remaining);
  }
  const wait=milliseconds=>new Promise(resolve=>{const entry={resolve,remaining:milliseconds,started:null,timer:null};timers.add(entry);schedule(entry);});
  function stop(){
    epoch++;
    animations.forEach(animation=>animation.cancel());animations.clear();hiddenAnimations.clear();
    timers.forEach(entry=>{clearTimeout(entry.timer);entry.resolve();});timers.clear();
    cancelAnimationFrame(frame);frame=0;lastFrame=0;solver=null;
  }
  function setHeading(key,moving=false){
    const text=copy[key]||FALLBACK_COPY[key],previous=message.querySelector('.intro-heading-copy');
    const next=node('div','intro-heading-copy',`<h1>${escapeHTML(text.title).replace(/\n/g,'<br>')}</h1><p>${escapeHTML(text.description)}</p>`);
    message.style.visibility='visible';message.replaceChildren(next);
    if(!moving||api.reduced())return;
    const distance=message.clientWidth;
    if(previous){previous.classList.add('is-outgoing');previous.setAttribute('aria-hidden','true');message.prepend(previous);play(previous,[{transform:'translateX(0)'},{transform:`translateX(${-distance}px)`}],420).then(()=>previous.remove());}
    play(next,[{transform:`translateX(${distance}px)`},{transform:'translateX(0)'}],420);
  }
  function buildPair(chosen=previewCard(api.data.previews[0],api)){
    stack=node('div','focus-stack');pair=node('div','analysis-pair');pair.append(chosen);stack.append(pair);stage.append(stack);
    chosen.style.width='100%';chosen.style.transform='none';pairDepth=1;pair.style.transform=`scale(${fit(240)})`;return chosen;
  }
  function addAnalysis(){
    analysis=analyzingCard(api);reveal=node('div','analysis-reveal');reveal.append(analysis);pair.append(reveal);pair.classList.add('attached');reveal.style.height='112px';
  }
  function addOutput(spatial=true){
    output=node('div',`signal-output${spatial?' is-spatial':''}`);stream=node('div','signal-stream');stream.setAttribute('aria-label','Signals for this thesis');output.append(stream);stage.append(output);stage.classList.add('results');
    if(spatial)solver=new SpatialCards(stage.clientWidth,stage.clientHeight);
  }
  function allowContinue(instant=false){
    const first=!root.classList.contains('complete');root.classList.add('complete');root.dataset.phase='signals';got.disabled=false;
    api.state.introComplete=true;api.persist();
    if(first&&!instant&&!api.reduced())play(got,[{opacity:0},{opacity:1}],160);
  }
  function cardSize(card){
    card.style.width=`${Math.min(361,stage.clientWidth-32)}px`;
    if(card.classList.contains('signal-card'))card.style.maxHeight=`${Math.max(48,stage.clientHeight-24)}px`;
    return {width:card.offsetWidth,height:card.offsetHeight};
  }
  function renderPhysics(){
    if(!solver)return;
    for(const body of solver.snapshot()){
      const card=cards.get(body.id);if(!card)continue;
      card.style.transform=`translate(${body.x-body.width/2}px,${body.y-body.height/2}px) rotate(${body.rotation}deg) scale(${body.scale})`;
      card.style.opacity='1';card.style.zIndex='1';card.classList.toggle('is-current',body.active);
      card.dataset.spatialX=body.x.toFixed(3);card.dataset.spatialY=body.y.toFixed(3);card.dataset.spatialRotation=body.rotation.toFixed(3);
      card.setAttribute('aria-hidden',String(!body.active));card.tabIndex=body.active&&card.classList.contains('signal-card')?0:-1;
      card.querySelectorAll('a').forEach(link=>{link.tabIndex=body.active?0:-1;});
    }
  }
  function wake(){
    if(frame||!solver||!alive||document.hidden||root.classList.contains('is-readable'))return;
    cards.forEach(card=>{card.style.willChange='transform';});
    frame=requestAnimationFrame(tick);
  }
  function tick(time){
    frame=0;if(!alive||!solver||document.hidden)return;
    const moving=solver.step(lastFrame?(time-lastFrame)/1000:1/60);lastFrame=time;renderPhysics();
    if(moving)frame=requestAnimationFrame(tick);
    else{lastFrame=0;cards.forEach(card=>{card.style.willChange='auto';});}
  }
  function prepareCard(id,item){
    if(cards.has(id))return cards.get(id);
    const card=signalCard(item,api);
    card.classList.add('spatial-card');card.dataset.spatialId=id;
    if(item)card.dataset.signalId=item.id;
    cards.set(id,card);stream.append(card);return card;
  }
  function promote(id,item,{instant=false,resetScroll=true}={}){
    const card=prepareCard(id,item),size=cardSize(card);
    if(resetScroll)card.scrollTop=0;
    solver.promote(id,size.width,size.height,{instant});renderPhysics();
    if(!instant)wake();return card;
  }
  function sendPairBack(animated=true){
    if(pairDepth===.92)return;
    const before=fit(352)*pairDepth;pairDepth=.92;const after=fit(352)*pairDepth;
    pair.style.transform=`scale(${after})`;
    if(animated)spring(pair,p=>({transform:`scale(${before+(after-before)*p})`}),520,{stiffness:260,damping:24});
  }
  async function updateTasks(token){
    const label=analysis.querySelector('.analysis-task');
    // Keep the baseline and adjacent skeleton fixed while characters change.
    const initialText=label.textContent;
    const labelWidth=Math.max(...ANALYSIS_TASKS.map(text=>{label.textContent=text;return label.offsetWidth;}));
    label.textContent=initialText;label.style.width=`${labelWidth}px`;
    async function typeText(text,removing,duration){
      const letters=Array.from(text),count=letters.length;
      for(let step=1;step<=count;step++){
        await wait(duration/count);if(!valid(token)||api.reduced())return false;
        label.textContent=letters.slice(0,removing?count-step:step).join('');
      }
      return true;
    }
    while(valid(token)&&!api.reduced()){
      await wait(jitter(2600,1400));if(!valid(token))return;
      if(!await typeText(label.textContent,true,220))return;
      await wait(70);if(!valid(token)||api.reduced())return;
      taskIndex=(taskIndex+1)%ANALYSIS_TASKS.length;
      if(!await typeText(ANALYSIS_TASKS[taskIndex],false,340))return;
    }
  }
  function isReading(){
    const current=solver&&cards.get(solver.active);
    return holding||now()<readingUntil||(current?.scrollTop||0)>2||stage.contains(document.activeElement);
  }
  async function continueSignals(token){
    while(valid(token)&&!api.reduced()){
      await wait(jitter(1700,900));if(!valid(token))return;
      while(valid(token)&&isReading()){await wait(1000);}
      if(!valid(token))return;
      const item=api.data.signals[emitted%api.data.signals.length];
      if(item){promote(item.id,item);emitted++;stream.dataset.emissions=String(emitted);}
    }
  }
  function readyState(run=false){
    stop();const token=epoch;marquee.remove();stack?.remove();output?.remove();cards.clear();
    root.classList.toggle('is-readable',!run);root.dataset.phase='signals';setHeading('signals');rememberStage();buildPair();addAnalysis();addOutput(run);
    if(run){
      pair.style.transform=`scale(${fit(352)})`;sendPairBack(false);
      for(const item of api.data.signals){promote(item.id,item,{instant:true});for(let i=0;i<720;i++)if(!solver.step(1/120))break;}
      renderPhysics();updateTasks(token);continueSignals(token);
    }else{
      pair.style.transform='none';
      for(const item of api.data.signals){const card=signalCard(item,api);card.dataset.signalId=item.id;stream.append(card);}
      analysis.classList.remove('is-analyzing');analysis.querySelector('.analysis-task').textContent='Following signals for this thesis.';
    }
    emitted=api.data.signals.length;stream.dataset.emissions=String(emitted);allowContinue(true);
  }
  root.finish=()=>{if(alive&&root.isConnected)readyState(false);};
  root.start=async()=>{
    if(started||!alive)return;started=true;
    if(api.reduced()||api.state.introComplete){readyState(!api.reduced());return;}
    const token=epoch;rememberStage();setHeading('theses',true);
    tracks.forEach((track,i)=>play(track,[{transform:`translateX(${starts[i]}px)`},{transform:`translateX(${starts[i]+(i===1?1:-1)*312}px)`}],9750,{easing:'linear',iterations:Infinity}));
    const rails=[...animations].filter(animation=>tracks.includes(animation.effect?.target));
    await wait(6600);if(!valid(token))return;
    rails.forEach(animation=>{animation.pause();hiddenAnimations.delete(animation);});
    const chosen=tracks[0].querySelector('.preview-card'),first=chosen.getBoundingClientRect();
    root.dataset.phase='focusing';rememberStage();buildPair(chosen);
    const last=chosen.getBoundingClientRect(),ratio=first.width/last.width,scale=unit()*fit(240);
    setHeading('analyzing',true);marquee.style.opacity='0';play(marquee,[{opacity:1},{opacity:0}],160);
    await spring(chosen,p=>({transform:`translate(${(first.x-last.x)/scale*(1-p)}px,${(first.y-last.y)/scale*(1-p)}px) scale(${ratio+(1-ratio)*p})`}),560);
    if(!valid(token))return;marquee.remove();rails.forEach(animation=>animation.cancel());
    await wait(1600);if(!valid(token))return;
    root.dataset.phase='analyzing';const before=fit(240),after=fit(352);addAnalysis();pair.style.transform=`scale(${after})`;
    // The reveal changes the pair's intrinsic height, so its grid centre stays
    // fixed while the analysis grows directly from the thesis's bottom seam.
    await Promise.all([
      spring(reveal,p=>({height:`${Math.max(0,112*p)}px`}),620,{stiffness:250,damping:20}),
      spring(pair,p=>({transform:`scale(${before+(after-before)*p})`}),620,{stiffness:250,damping:20})
    ]);
    if(!valid(token))return;updateTasks(token);
    await wait(800);if(!valid(token))return;
    addOutput();sendPairBack();setHeading('signals',true);
    if(api.data.signals[0]){promote(api.data.signals[0].id,api.data.signals[0]);emitted=1;stream.dataset.emissions='1';}
    allowContinue();continueSignals(token);
  };
  function onPointerDown(event){if(output?.contains(event.target)){holding=true;readingUntil=now()+8000;}}
  function releasePointer(){holding=false;}
  function onCardClick(event){
    const card=event.target.closest('.spatial-card');if(!solver||!card||card.dataset.spatialId===solver.active)return;
    event.preventDefault();event.stopPropagation();readingUntil=now()+8000;
    promote(card.dataset.spatialId,api.data.signals.find(item=>item.id===card.dataset.spatialId),{resetScroll:false});
  }
  function onRead(){readingUntil=now()+8000;}
  stage.addEventListener('pointerdown',onPointerDown);stage.addEventListener('click',onCardClick,true);stage.addEventListener('scroll',onRead,true);stage.addEventListener('focusin',onRead);
  window.addEventListener('pointerup',releasePointer);window.addEventListener('pointercancel',releasePointer);
  function onVisibility(){
    root.classList.toggle('stream-paused',document.hidden);
    if(document.hidden){
      const time=now();
      for(const entry of timers){clearTimeout(entry.timer);if(entry.started!==null)entry.remaining=Math.max(0,entry.remaining-(time-entry.started));entry.timer=null;entry.started=null;}
      for(const animation of animations)if(animation.playState==='running'){hiddenAnimations.add(animation);animation.pause();}
      cancelAnimationFrame(frame);frame=0;lastFrame=0;holding=false;
    }else{
      for(const entry of timers)if(entry.timer===null)schedule(entry);
      for(const animation of hiddenAnimations)if(animations.has(animation))animation.play();hiddenAnimations.clear();wake();
    }
  }
  function onResize(){
    if(!alive||!root.isConnected||root.classList.contains('is-readable'))return;
    // Switching A's full-height field to B/C's reserved footer is already
    // included in the FLIP measurement. Only an external resize settles motion.
    if(stage.clientWidth===stageWidth&&stage.clientHeight===stageHeight)return;
    rememberStage();
    if(pair){
      for(const animation of animations)if(animation.effect?.target===pair||animation.effect?.target===reveal||animation.effect?.target===pair.firstElementChild){try{animation.finish();}catch{}}
      pair.style.transform=`scale(${fit(reveal?352:240)*pairDepth})`;
    }
    if(solver){solver.resize(stage.clientWidth,stage.clientHeight);for(const [id,card] of cards){const size=cardSize(card);solver.measure(id,size.width,size.height);}wake();}
  }
  const resizeObserver=new ResizeObserver(onResize);resizeObserver.observe(stage);
  document.addEventListener('visibilitychange',onVisibility);onVisibility();
  root.cleanup=()=>{
    alive=false;stop();resizeObserver.disconnect();document.removeEventListener('visibilitychange',onVisibility);
    window.removeEventListener('pointerup',releasePointer);window.removeEventListener('pointercancel',releasePointer);
  };
  return root;
}
