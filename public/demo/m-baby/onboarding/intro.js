import { animate } from './vendor/motion.js';
import { node, image, escapeHTML, heading, topbar } from './ui.js';
import { previewCard, tickerRow } from './cards.js';

const FALLBACK_COPY = {
  theses: {title:'New theses,\nevery day.',description:'Explore a daily stream of market perspectives.'},
  analyzing: {title:'Alva analyzes each thesis.',description:'Alva finds the latest signals for each thesis and analyzes what they mean for its direction.'},
  signals: {title:'Track what matters.',description:'Follow the signals that support or challenge each thesis as the story develops.'},
};
const FINAL_STACK_Y = -292;

function analyzingCard(api) {
  return node('div','analysis-card is-analyzing',`<div class="analysis-skeleton">${image(api.data.icons['Alva / Monochrome'],api,'analysis-logo','Alva')}<div class="skeleton-lines" aria-hidden="true"><i></i><i></i></div><i class="analysis-bone analysis-corner-bone" aria-hidden="true"></i></div><div class="analysis-status"><div><strong>Alva Analyzing</strong><i class="analysis-bone" aria-hidden="true"></i></div><div><span>Finding signals relevant to this thesis.</span><i class="analysis-bone" aria-hidden="true"></i></div></div>`);
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
  analysis.append(node('div','signal-stance',`<span class="signal-alva-mark">${image(api.data.icons['Alva / Monochrome'],api,'','Alva')}</span><span class="signal-verdict">${escapeHTML(stance)}</span>`));
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
  let alive=true,finished=false,animations=[],timers=new Set(),stack=null,fade=null;
  const motion=(el,values,options)=>{const a=animate(el,values,options);animations.push(a);return a;};
  const wait=ms=>new Promise(resolve=>{const entry={resolve};entry.timer=setTimeout(()=>{timers.delete(entry);resolve();},ms);timers.add(entry);});
  const valid=()=>alive&&root.isConnected;
  const canContinue=()=>valid()&&!finished;
  function clearTiming(){timers.forEach(entry=>{clearTimeout(entry.timer);entry.resolve();});timers.clear();}
  function setHeading(key){const text=copy[key]||FALLBACK_COPY[key];message.innerHTML=`<h1>${escapeHTML(text.title).replace(/\n/g,'<br>')}</h1><p>${escapeHTML(text.description)}</p>`;}
  function installFade(){if(!fade){fade=node('div','title-fade');stage.append(fade);}}
  function settle(){
    if(!valid())return;finished=true;setHeading('signals');root.classList.add('complete');root.dataset.phase='signals';stage.classList.add('results');
    stack.style.transform='none';stack.querySelector('.analysis-card')?.classList.remove('is-analyzing');
    if(fade)stage.prepend(fade);api.state.introComplete=true;api.persist();
  }
  function finishImmediately(){
    if(!valid())return;finished=true;animations.forEach(a=>a.stop());clearTiming();marquee.remove();setHeading('signals');message.style.opacity='1';message.style.transform='none';footer.style.opacity='1';footer.style.transform='none';
    stack?.remove();stack=node('div','focus-stack');stack.append(previewCard(api.data.previews[0],api),analyzingCard(api),tickerRow(api.data.theses[0].tickers.slice(0,3),api,true));
    api.data.signals.forEach(s=>stack.append(signalCard(s,api)));stage.append(stack);installFade();settle();
  }
  root.finish=finishImmediately;
  root.start=async()=>{
    if(api.reduced()||api.state.introComplete){finishImmediately();return;}
    const rails=tracks.map((t,i)=>motion(t,{x:[starts[i],starts[i]+(i===1?1:-1)*130]},{duration:4,ease:'linear'}));
    await wait(2200);if(!canContinue())return;rails.forEach(a=>a.pause());
    const chosen=tracks[0].querySelector('.preview-card'),first=chosen.getBoundingClientRect();
    const scale=root.getBoundingClientRect().width/root.clientWidth||1;
    stack=node('div','focus-stack');stage.append(stack);stack.append(chosen);chosen.style.transform='none';chosen.style.width='100%';
    const last=chosen.getBoundingClientRect(),dx=(first.x-last.x)/scale,dy=(first.y-last.y)/scale,ratio=first.width/last.width;
    root.dataset.phase='focusing';motion(marquee,{opacity:0},{duration:.18});
    motion(message,{opacity:[1,0]},{duration:.1}).then(()=>{if(canContinue()){setHeading('analyzing');motion(message,{opacity:[0,1]},{duration:.18});}});
    await motion(chosen,{x:[dx,0],y:[dy,0],scaleX:[ratio,1],scaleY:[ratio,1]},{type:'spring',duration:.65,bounce:0});
    if(!canContinue())return;marquee.remove();root.dataset.phase='analyzing';chosen.style.transform='none';
    const analysis=analyzingCard(api);stack.append(analysis);await motion(analysis,{opacity:[0,1],y:[12,0]},{duration:.26,ease:'easeOut'});
    await wait(950);if(!canContinue())return;
    const tickers=tickerRow(api.data.theses[0].tickers.slice(0,3),api,true);stack.append(tickers);root.dataset.phase='tickers';
    await motion(tickers,{opacity:[0,1],y:[10,0]},{duration:.28,ease:'easeOut'});
    await wait(250);if(!canContinue())return;installFade();
    motion(message,{opacity:[1,0]},{duration:.12}).then(()=>{if(canContinue()){setHeading('signals');motion(message,{opacity:[0,1]},{duration:.18});}});
    const offsets=[-100,-214,FINAL_STACK_Y];
    for(let i=0;i<api.data.signals.length;i++){
      if(!canContinue())return;root.dataset.phase=`signal-${i+1}`;const card=signalCard(api.data.signals[i],api);stack.append(card);
      motion(card,{opacity:[0,1],y:[18,0]},{duration:.26,ease:'easeOut'});
      await motion(stack,{y:offsets[Math.min(i,offsets.length-1)]},{type:'spring',duration:.45,bounce:0});
      await wait(200);
    }
    if(!canContinue())return;settle();motion(footer,{opacity:[0,1],y:[8,0]},{duration:.18,ease:'easeOut'});
  };
  const onHidden=()=>{if(document.hidden&&valid()&&!api.state.introComplete)finishImmediately();};document.addEventListener('visibilitychange',onHidden);
  root.cleanup=()=>{alive=false;animations.forEach(a=>a.stop());clearTiming();document.removeEventListener('visibilitychange',onHidden);};
  return root;
}
