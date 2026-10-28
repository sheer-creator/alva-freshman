import { node, image, escapeHTML, heading, topbar } from './ui.js';
import { previewCard, tickerRow } from './cards.js?v=6';

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
  return node('div','analysis-card is-analyzing',`<div class="analysis-skeleton">${image(api.data.icons['Alva / Black & White'],api,'analysis-logo','Alva')}<div class="skeleton-lines" aria-hidden="true"><i></i><i></i></div><i class="analysis-bone analysis-corner-bone" aria-hidden="true"></i></div><div class="analysis-status"><div><strong>Alva Analyzing</strong><i class="analysis-bone" aria-hidden="true"></i></div><div><span class="analysis-task">${ANALYSIS_TASKS[0]}</span><i class="analysis-bone" aria-hidden="true"></i></div></div>`);
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
  analysis.append(node('div','signal-stance',`<span class="signal-alva-mark">${image(api.data.icons['Alva / Black & White'],api,'','Alva')}</span><span class="signal-verdict">${escapeHTML(stance)}</span>`));
  analysis.append(node('p','signal-analysis',escapeHTML(item.analysis)));
  n.append(source,analysis);return n;
}

export function renderIntroPage(api) {
  const copy=api.data.introCopy||FALLBACK_COPY;
  const root=node('section','page intro-page');root.setAttribute('aria-label','Explore theses and signals');root.dataset.phase='theses';
  root.append(topbar(api),heading(copy.theses.title,copy.theses.description));
  const message=root.querySelector('.intro-heading');
  const stage=node('div','intro-stage');root.append(stage);
  const marquee=node('div','marquee');stage.append(marquee);
  const tracks=[],starts=[16,-148,-226],laneOrders=[[0,1,2,0,1,2],[1,2,0,1,0,2],[0,1,2,0,1,2]];
  laneOrders.forEach((order,i)=>{
    const lane=node('div','marquee-lane'),track=node('div','marquee-track');
    order.forEach(k=>{const slot=node('div','preview-slot');slot.append(previewCard(api.data.previews[k],api));track.append(slot);});
    track.style.transform=`translateX(${starts[i]}px)`;lane.append(track);marquee.append(lane);tracks.push(track);
  });
  const footer=node('footer','page-footer'),got=node('button','btn btn-primary','Got it');got.type='button';got.onclick=()=>api.go('people');footer.append(got);root.append(footer);
  let alive=true,epoch=0,stack=null,pair=null,analysis=null,output=null,stream=null,emitted=0,taskIndex=0;
  const animations=new Set(),timers=new Set(),hiddenAnimations=new Set();
  const valid=token=>alive&&root.isConnected&&token===epoch;
  const play=(element,keyframes,duration=240,options={})=>{
    const animation=element.animate(keyframes,{duration,easing:'cubic-bezier(0.4, 0, 0.2, 1)',...options});
    animations.add(animation);
    if(document.hidden){hiddenAnimations.add(animation);animation.pause();}
    return animation.finished.catch(()=>{}).finally(()=>{animation.cancel();animations.delete(animation);hiddenAnimations.delete(animation);});
  };
  const wait=ms=>new Promise(resolve=>{const entry={resolve};entry.timer=setTimeout(()=>{timers.delete(entry);resolve();},ms);timers.add(entry);});
  function stop(){
    epoch++;
    animations.forEach(animation=>animation.cancel());animations.clear();hiddenAnimations.clear();
    timers.forEach(entry=>{clearTimeout(entry.timer);entry.resolve();});timers.clear();
  }
  const scale=()=>root.getBoundingClientRect().width/root.clientWidth||1;
  const jitter=(minimum,range)=>minimum+Math.random()*range;
  async function visible(token){
    while(valid(token)&&document.hidden)await wait(600);
    return valid(token);
  }
  function setHeading(key){const text=copy[key]||FALLBACK_COPY[key];message.innerHTML=`<h1>${escapeHTML(text.title).replace(/\n/g,'<br>')}</h1><p>${escapeHTML(text.description)}</p>`;}
  function buildStack(chosen=previewCard(api.data.previews[0],api)){
    stack=node('div','focus-stack');pair=node('div','analysis-pair');
    pair.append(chosen);stack.append(pair);stage.append(stack);
    chosen.style.width='100%';chosen.style.transform='none';
    return chosen;
  }
  function addAnalysis(){analysis=analyzingCard(api);pair.append(analysis);}
  function addOutput(){
    output=node('div','signal-output');
    output.append(tickerRow(api.data.theses[0].tickers.slice(0,3),api,true));
    stream=node('div','signal-stream');stream.setAttribute('aria-label','Signals for this thesis');
    output.append(stream);stack.append(output);stage.classList.add('results');
  }
  function allowContinue(){
    const first=!root.classList.contains('complete');
    root.classList.add('complete');root.dataset.phase='signals';
    api.state.introComplete=true;api.persist();
    if(first&&!api.reduced())play(footer,[{opacity:0},{opacity:1}],160);
  }
  async function updateTasks(token){
    while(valid(token)&&!api.reduced()){
      await wait(jitter(2100,1300));if(!await visible(token))return;
      const label=analysis.querySelector('.analysis-task');
      await play(label,[{opacity:1},{opacity:0}],120);if(!await visible(token))return;
      taskIndex=(taskIndex+1)%ANALYSIS_TASKS.length;label.textContent=ANALYSIS_TASKS[taskIndex];
      play(label,[{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],160);
    }
  }
  async function emitSignal(item,token,animated=true){
    if(!valid(token))return;
    const previous=new Map([...stream.children].map(card=>[card,card.getBoundingClientRect().top]));
    // The sample contains three source-backed signals: recycle their actual cards,
    // never fabricate a new source or keep appending duplicate records.
    let card=[...stream.children].find(child=>child.dataset.signalId===item.id);
    if(!card){card=signalCard(item,api);card.dataset.signalId=item.id;}
    stream.prepend(card);emitted++;stream.dataset.emissions=String(emitted);
    if(animated&&!api.reduced()){
      const ratio=scale();
      for(const child of stream.children){
        if(child===card)continue;
        const old=previous.get(child);
        if(old!==undefined){const dy=(old-child.getBoundingClientRect().top)/ratio;
          if(dy)play(child,[{transform:`translateY(${dy}px)`},{transform:'none'}],280);
        }
      }
      await play(card,[{opacity:0,transform:'translateY(-8px)',clipPath:'inset(0 0 100% 0)'},{opacity:1,transform:'none',clipPath:'inset(0 0 0 0)'}],280);
    }
  }
  async function continueStream(token){
    while(valid(token)&&!api.reduced()){
      // A mix of longer reads and shorter arrivals, never a uniform ticker cadence.
      const delay=emitted%3===1?jitter(4200,2800):jitter(2800,2200);
      await wait(delay);if(!await visible(token))return;
      // Deliberately reading the history pauses reordering; Got it never stops the stream.
      if(stage.scrollTop>24||stage.contains(document.activeElement)||root.matches(':active'))continue;
      const item=api.data.signals[emitted%api.data.signals.length];
      if(item)await emitSignal(item,token);
    }
  }
  function readyState(run=false){
    stop();const token=epoch;marquee.remove();stack?.remove();setHeading('signals');
    buildStack();addAnalysis();pair.classList.add('attached');addOutput();
    for(const item of api.data.signals){const card=signalCard(item,api);card.dataset.signalId=item.id;stream.prepend(card);}
    emitted=api.data.signals.length;stream.dataset.emissions=String(emitted);allowContinue();
    if(run){updateTasks(token);continueStream(token);}
    else{analysis.classList.remove('is-analyzing');analysis.querySelector('.analysis-task').textContent='Following signals for this thesis.';}
  }
  root.finish=()=>{if(alive&&root.isConnected)readyState(false);};
  root.start=async()=>{
    if(api.reduced()||api.state.introComplete){readyState(!api.reduced());return;}
    const token=epoch;
    tracks.forEach((track,i)=>play(track,[{transform:`translateX(${starts[i]}px)`},{transform:`translateX(${starts[i]+(i===1?1:-1)*130}px)`}],4000,{easing:'linear',fill:'forwards'}));
    const rails=[...animations];
    await wait(2200);if(!await visible(token))return;
    rails.forEach(animation=>{animation.pause();hiddenAnimations.delete(animation);});
    const chosen=tracks[0].querySelector('.preview-card'),first=chosen.getBoundingClientRect();
    buildStack(chosen);
    const last=chosen.getBoundingClientRect(),ratio=first.width/last.width,unit=scale();
    root.dataset.phase='focusing';
    // The existing card is the same object throughout the move into analysis.
    play(marquee,[{opacity:1},{opacity:0}],160);
    setHeading('analyzing');play(message,[{opacity:0},{opacity:1}],240);
    await play(chosen,[{transform:`translate(${(first.x-last.x)/unit}px,${(first.y-last.y)/unit}px) scale(${ratio})`},{transform:'none'}],280);
    if(!valid(token))return;marquee.remove();rails.forEach(animation=>animation.cancel());root.dataset.phase='analyzing';
    addAnalysis();
    // First show two distinct pieces, then close the seam as Alva takes the thesis.
    await play(analysis,[{opacity:0,transform:'translateY(32px)'},{opacity:1,transform:'translateY(16px)'}],240,{fill:'forwards'});
    if(!valid(token))return;
    pair.classList.add('attached');
    await play(analysis,[{transform:'translateY(16px)'},{transform:'none'}],280);
    if(!valid(token))return;updateTasks(token);
    await wait(1000);if(!await visible(token))return;
    addOutput();root.dataset.phase='tickers';
    await play(output.firstElementChild,[{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'none'}],240);
    await wait(jitter(1500,700));if(!await visible(token))return;
    setHeading('signals');play(message,[{opacity:0},{opacity:1}],240);
    if(api.data.signals[0])await emitSignal(api.data.signals[0],token);
    if(!valid(token))return;allowContinue();continueStream(token);
  };
  const onVisibility=()=>{
    root.classList.toggle('stream-paused',document.hidden);
    if(document.hidden){
      for(const animation of animations)if(animation.playState==='running'){hiddenAnimations.add(animation);animation.pause();}
    }else{
      for(const animation of hiddenAnimations)if(animations.has(animation))animation.play();
      hiddenAnimations.clear();
    }
  };
  document.addEventListener('visibilitychange',onVisibility);onVisibility();
  root.cleanup=()=>{alive=false;stop();document.removeEventListener('visibilitychange',onVisibility);};
  return root;
}
