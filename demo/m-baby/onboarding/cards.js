import { animate } from './vendor/motion.js';
import { node, image, escapeHTML, topbar, heading } from './ui.js';

export function tickerRow(tickers, api, large=false) {
  return node('div',`ticker-row ${large?'large':''}`,tickers.map(t=>`<div class="ticker">${image(t.logo,api,'ticker-logo')}<span>${escapeHTML(t.symbol)}</span>${image(t.direction,api,'ticker-direction')}</div>`).join(''));
}
export function renderThesisContent(item, api, options={}) {
  const body=node('div',`thesis-content ${options.feed?'feed-thesis-content':''}`);
  body.innerHTML=`<div class="thesis-author">${image(item.avatar,api,'author-avatar',item.author)}<div class="author-copy"><strong>${escapeHTML(item.author)}</strong><span>${escapeHTML(item.role)}</span></div><time>${escapeHTML(item.timestamp)}</time></div>`;
  if(item.tickers?.length) body.append(tickerRow(item.tickers,api));
  body.append(node('p','thesis-body',escapeHTML(item.body)));
  if(item.charts?.length) body.append(node('div','thesis-charts',item.charts.map(id=>image(id,api,'thesis-chart','Market chart from the thesis')).join('')));
  return body;
}
export function previewCard(item,api) {
  const c=node('article','preview-card');c.dataset.thesis=item.id;
  c.innerHTML=`<div class="preview-author">${image(item.avatar,api,'preview-avatar',item.author)}<div><strong>${escapeHTML(item.author)}</strong><span>${escapeHTML(item.role)}</span></div></div><p>${escapeHTML(item.body)}</p>`;
  if(item.charts?.length)c.append(node('div','preview-charts',item.charts.map(id=>image(id,api,'preview-chart','Market chart from this thesis')).join('')));
  return c;
}
export function renderBookmarkPage(api) {
  const root=node('section','page bookmark-page');root.setAttribute('aria-label','Bookmark theses');
  const copy=api.data.bookmarkCopy||{title:'Bookmark theses.\nTrack what changes.',description:'Choose the views you want Alva to track for new signals.'};
  root.append(topbar(api,()=>api.go('people')),heading(copy.title,copy.description));
  const deck=node('div','bookmark-deck');
  deck.innerHTML='<div class="deck-back back-one"></div><div class="deck-back back-two"></div><div class="front-card"></div>';
  const front=deck.querySelector('.front-card');
  const prev=node('button','card-arrow previous',image(api.data.icons['arrow-left-l1'],api));prev.setAttribute('aria-label','Previous thesis');
  const next=node('button','card-arrow next',image(api.data.icons['arrow-left-l1'],api));next.setAttribute('aria-label','Next thesis');
  const controls=node('nav','bookmark-controls');controls.setAttribute('aria-label','Browse theses');controls.append(prev,next);root.append(deck,controls);
  const footer=node('footer','page-footer');const continueButton=node('button','btn btn-primary','Next');footer.append(continueButton);root.append(footer);
  let current=api.state.thesisIndex||0, generation=0, activeMotion=null;
  const available=()=>api.data.theses.filter(t=>!api.state.bookmarked.has(t.id));
  function updateNext(){continueButton.disabled=api.state.bookmarked.size===0;}
  function paint(){
    const list=available();current=Math.max(0,Math.min(current,list.length-1));const item=list[current]||api.data.theses.at(-1);
    front.replaceChildren();const read=node('div','card-reading');read.append(renderThesisContent(item,api));front.append(read);
    const foot=node('div','card-save-footer');const saved=api.state.bookmarked.has(item.id);
    const save=node('button','bookmark-button',`${image(api.data.icons['Bookmark icon']||api.data.icons['bookmark-l'],api)}<span>${saved?'Bookmarked':'Bookmark'}</span>`);save.disabled=saved;
    save.onclick=()=>{if(api.state.bookmarked.has(item.id))return;api.state.bookmarked.add(item.id);api.persist();updateNext();change(1,true);};foot.append(save);front.append(foot);
    front.setAttribute('aria-label',`${item.author} thesis`);prev.disabled=next.disabled=list.length<2;api.state.thesisIndex=current;updateNext();
  }
  async function change(dir,saved=false){
    const token=++generation;activeMotion?.stop();
    if(api.reduced()){if(!saved&&available().length)current=(current+dir+available().length)%available().length;paint();front.style.opacity="1";front.style.transform="none";return;}
    activeMotion=animate(front,{x:saved?-70:dir*-52,opacity:0,scale:.985},{duration:.14,ease:'easeOut'});await activeMotion;
    if(token!==generation||!root.isConnected)return;
    if(!saved&&available().length)current=(current+dir+available().length)%available().length;
    paint();activeMotion=animate(front,{x:[saved?16:dir*42,0],opacity:[0,1],scale:[.985,1]},{type:'spring',duration:.36,bounce:0});
  }
  prev.onclick=()=>change(-1);next.onclick=()=>change(1);
  continueButton.onclick=()=>{if(api.state.bookmarked.size)api.go('portfolio');};
  let gesture=null;front.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.target.closest('.thesis-charts'))return;gesture={x:e.clientX,y:e.clientY};});
  front.addEventListener('pointerup',e=>{if(!gesture)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;gesture=null;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5&&available().length>1)change(dx<0?1:-1);});
  front.addEventListener('pointercancel',()=>gesture=null);
  root.addEventListener('keydown',e=>{if(e.key==='ArrowRight'&&!next.disabled)next.click();if(e.key==='ArrowLeft'&&!prev.disabled)prev.click();});
  root.cleanup=()=>{generation++;activeMotion?.stop();};paint();return root;
}
