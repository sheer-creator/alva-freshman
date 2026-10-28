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
// options (Track variant): copy, back/next targets, the save label, a shelf of
// already-tracked theses above the deck, a target count, and an onSave hook that
// replaces the deck's own advance (the Pick step hands the card to Track).
export function renderBookmarkPage(api, options={}) {
  const root=node('section','page bookmark-page');root.setAttribute('aria-label',options.ariaLabel||'Bookmark theses');
  if(options.mode)root.dataset.mode=options.mode;
  const copy=options.copy||api.data.bookmarkCopy||{title:'Bookmark theses.\nTrack what changes.',description:'Choose the views you want Alva to track for new signals.'};
  root.append(topbar(api,options.back===null?null:()=>api.go(options.back||'people')),heading(copy.title,copy.description));
  let shelf=null,shelfCount=null,shelfChips=null,progress=null;
  if(options.shelf){
    shelf=node('div','track-shelf');shelf.setAttribute('aria-live','polite');
    shelfCount=node('span','track-shelf-count');shelfChips=node('div','track-shelf-chips');
    shelf.append(shelfCount,shelfChips);
    progress=node('div','track-progress',`<span class="track-progress-label"></span><span class="track-progress-bar"><i></i></span>`);
    root.querySelector('.intro-heading').before(shelf);root.querySelector('.intro-heading').after(progress);
  }
  const deck=node('div','bookmark-deck');
  root.append(deck);
  const footer=node('footer','page-footer');const continueButton=node('button','btn btn-primary',options.nextLabel||'Next');footer.append(continueButton);root.append(footer);
  if(options.footer===false)footer.hidden=true;
  const target=options.target||0;
  function renderShelf(){
    if(!shelf)return;
    const tracked=[...api.state.bookmarked].map(id=>api.data.theses.find(t=>t.id===id)).filter(Boolean);
    shelfCount.textContent=`${tracked.length} selected`;
    for(const item of tracked){
      if(shelfChips.querySelector(`[data-thesis="${CSS.escape(item.id)}"]`))continue;
      const chip=node('span','ticker track-chip',`${image(item.avatar,api,'ticker-logo track-chip-avatar',item.author)}<span>${escapeHTML(item.author.split(' ')[0])}</span>`);
      chip.dataset.thesis=item.id;shelfChips.append(chip);
    }
    const count=api.state.bookmarked.size;
    progress.querySelector('.track-progress-label').textContent=`${Math.min(count,target)} of ${target}`;
    progress.querySelector('.track-progress-bar i').style.width=`${Math.min(100,count/target*100)}%`;
    continueButton.textContent='Next';
    continueButton.classList.toggle('btn-primary',count>=target);continueButton.classList.toggle('btn-secondary',count<target);
  }
  function flyToShelf(card){
    if(!shelf||api.reduced()||typeof card.animate!=='function')return;
    const chip=shelfChips.lastElementChild;if(!chip)return;
    const avatar=card.querySelector('.author-avatar'),dest=chip.querySelector('.track-chip-avatar');if(!avatar||!dest)return;
    const a=avatar.getBoundingClientRect(),b=dest.getBoundingClientRect(),base=root.getBoundingClientRect();
    const ghost=avatar.cloneNode(true);ghost.className='track-flight';
    ghost.style.cssText=`position:absolute;left:${a.left-base.left}px;top:${a.top-base.top}px;width:${a.width}px;height:${a.height}px;border-radius:50%;z-index:9;pointer-events:none;object-fit:cover`;
    root.append(ghost);dest.style.visibility='hidden';
    ghost.animate([{transform:'none'},{transform:`translate(${b.left-a.left}px,${b.top-a.top}px) scale(${b.width/a.width})`}],{duration:280,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'}).finished.catch(()=>{}).finally(()=>{ghost.remove();dest.style.visibility='';});
  }
  const cards=new Map();
  const available=()=>api.data.theses.filter(t=>!api.state.bookmarked.has(t.id));
  const modulo=(index,length)=>((index%length)+length)%length;
  const initial=available();
  let cursor=Math.max(0,Math.min(Number(api.state.thesisIndex)||0,initial.length-1));
  const lastSaved=[...api.state.bookmarked].reverse().map(id=>api.data.theses.find(item=>item.id===id)).find(Boolean);
  let frontId=(initial[cursor]||lastSaved||api.data.theses.at(-1))?.id;
  let alive=true, promotion=null, saveTimer=null, gesture=null, savedFocus=null;

  function saveButtonState(button,saved){
    button.disabled=saved;
    button.setAttribute('aria-pressed',String(saved));
    button.setAttribute('aria-disabled',String(saved));
    button.querySelector('span').textContent=saved?(options.savedLabel||'Bookmarked'):(options.saveLabel||'Bookmark');
  }

  function cardFor(id){
    if(cards.has(id))return cards.get(id);
    const item=api.data.theses.find(thesis=>thesis.id===id);
    if(!item)return null;
    const card=node('article','deck-card');card.dataset.thesis=id;card.setAttribute('aria-label',`${item.author} thesis`);
    const read=node('div','card-reading');read.append(renderThesisContent(item,api));card.append(read);
    const controls=node('nav','bookmark-controls card-save-footer');controls.setAttribute('aria-label','Browse and bookmark theses');
    const prev=node('button','card-arrow previous',image(api.data.icons['arrow-left-l1'],api));prev.type='button';prev.dataset.action='previous';prev.setAttribute('aria-label','Previous thesis');
    const save=node('button','bookmark-button',`${image(api.data.icons['Bookmark icon']||api.data.icons['bookmark-l'],api)}<span aria-live="polite"></span>`);save.type='button';save.dataset.action='bookmark';
    const next=node('button','card-arrow next',image(api.data.icons['arrow-left-l1'],api));next.type='button';next.dataset.action='next';next.setAttribute('aria-label','Next thesis');
    prev.onclick=()=>{if(id===frontId)change(-1);};next.onclick=()=>{if(id===frontId)change(1);};save.onclick=()=>bookmark(id);
    controls.append(prev,save,next);card.append(controls);
    cards.set(id,card);return card;
  }

  function targetFor(dir){
    const list=available();if(!list.length)return null;
    const index=list.findIndex(item=>item.id===frontId);
    // Bookmark removes the front card immediately. Its former index now
    // points to the next survivor, including while its confirmation is shown.
    return list[modulo(index<0?cursor+(dir>0?0:-1):index+dir,list.length)].id;
  }

  function position(card,slot){
    card.dataset.deckPosition=slot;
    card.classList.toggle('front-card',slot==='front');
    card.classList.toggle('real-back-card',slot!=='front');
    card.classList.remove('deck-departing');
    card.inert=slot!=='front';card.setAttribute('aria-hidden',String(slot!=='front'));
  }

  function arrange(departing=null){
    const slots=new Map();
    const previous=targetFor(-1),next=targetFor(1);
    if(previous&&previous!==frontId&&previous!==next)slots.set(previous,'previous');
    if(next&&next!==frontId)slots.set(next,'next');
    if(frontId)slots.set(frontId,'front');
    for(const [id,slot] of slots){
      const card=cardFor(id);if(!card||card===departing)continue;
      position(card,slot);if(card.parentNode!==deck)deck.append(card);
    }
    for(const card of cards.values()){
      if(!slots.has(card.dataset.thesis)&&card!==departing)card.remove();
    }
    if(departing){
      departing.classList.remove('front-card','real-back-card');departing.classList.add('deck-departing');
      departing.dataset.deckPosition='departing';departing.inert=true;departing.setAttribute('aria-hidden','true');
    }
    const list=available();
    const canBrowse=list.length>1||(list.length===1&&list[0].id!==frontId);
    for(const card of cards.values()){
      card.querySelector('.previous').disabled=!canBrowse;
      card.querySelector('.next').disabled=!canBrowse;
      saveButtonState(card.querySelector('.bookmark-button'),api.state.bookmarked.has(card.dataset.thesis));
    }
    continueButton.disabled=options.allowEmpty?false:api.state.bookmarked.size===0;
    renderShelf();
  }

  function clearSaveTimer(){clearTimeout(saveTimer);saveTimer=null;}
  function finishPromotion(){
    const current=promotion;if(!current)return;
    promotion=null;for(const animation of current.animations)animation.cancel();
    if(alive)arrange();
  }

  function change(dir){
    if(!alive)return;
    clearSaveTimer();finishPromotion();gesture=null;
    const target=targetFor(dir);if(!target||target===frontId){arrange();return;}
    const outgoing=cardFor(frontId),incoming=cardFor(target);
    const startTransform=getComputedStyle(incoming).transform;
    const focused=(outgoing?.contains(document.activeElement)?document.activeElement.dataset.action:null)||savedFocus;
    savedFocus=null;
    frontId=target;cursor=available().findIndex(item=>item.id===frontId);
    api.state.thesisIndex=cursor;api.persist();
    const useMotion=!api.reduced()&&typeof incoming.animate==='function'&&root.isConnected;
    arrange(useMotion?outgoing:null);
    if(focused)incoming.querySelector(`[data-action="${focused}"]`)?.focus({preventScroll:true});
    if(!useMotion)return;
    const job={animations:[]};promotion=job;
    // The same real back card becomes the front. WAAPI owns only the temporary
    // transform, so interruption reveals the correct final layout immediately.
    job.animations.push(incoming.animate([
      {transform:startTransform,opacity:1},
      {transform:'none',opacity:1}
    ],{duration:280,easing:'cubic-bezier(.4,0,.2,1)'}));
    if(outgoing)job.animations.push(outgoing.animate([
      {transform:'none',opacity:1},
      {transform:`translate(${dir*-32}px, 12px) rotate(${dir*-4}deg) scale(.97)`,opacity:0}
    ],{duration:240,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'}));
    Promise.allSettled(job.animations.map(animation=>animation.finished)).then(()=>{
      if(alive&&promotion===job)finishPromotion();
    });
  }

  function bookmark(id){
    if(!alive||id!==frontId||api.state.bookmarked.has(id))return;
    clearSaveTimer();finishPromotion();
    savedFocus=cards.get(id)?.contains(document.activeElement)?document.activeElement.dataset.action:null;
    cursor=Math.max(0,available().findIndex(item=>item.id===id));
    api.state.bookmarked.add(id);
    api.state.thesisIndex=available().length?cursor%available().length:0;
    api.persist();
    if(options.onSave){options.onSave(id,cards.get(id));return;}
    arrange();flyToShelf(cards.get(id));
    if(!available().length){if(savedFocus)continueButton.focus({preventScroll:true});savedFocus=null;return;}
    if(api.reduced()){change(1);return;}
    // The saved state is real and persisted before its brief confirmation.
    // A manual arrow during this hold still reveals the immediate survivor.
    saveTimer=setTimeout(()=>{saveTimer=null;if(alive)change(1);},120);
  }

  continueButton.onclick=()=>{if(options.allowEmpty||api.state.bookmarked.size)api.go(options.next||'portfolio');};
  deck.addEventListener('pointerdown',e=>{
    const card=e.target.closest('.front-card');
    if(!card||e.isPrimary===false||e.target.closest('button,.thesis-charts'))return;
    finishPromotion();gesture={id:frontId,x:e.clientX,y:e.clientY};
  });
  deck.addEventListener('pointerup',e=>{
    if(!gesture)return;const start=gesture;gesture=null;
    if(start.id!==frontId)return;
    const dx=e.clientX-start.x,dy=e.clientY-start.y;
    if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)change(dx<0?1:-1);
  });
  deck.addEventListener('pointercancel',()=>{gesture=null;});
  root.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,[contenteditable="true"],.thesis-charts'))return;
    const action=e.key==='ArrowRight'?'next':e.key==='ArrowLeft'?'previous':null;
    const button=action&&cards.get(frontId)?.querySelector(`[data-action="${action}"]`);
    if(button&&!button.disabled){e.preventDefault();button.click();}
  });
  const reducedMotion=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
  const onReduced=()=>{
    if(!api.reduced())return;
    if(saveTimer!==null){clearSaveTimer();change(1);}else finishPromotion();
  };
  reducedMotion?.addEventListener('change',onReduced);
  root.cleanup=()=>{clearSaveTimer();finishPromotion();alive=false;gesture=null;savedFocus=null;reducedMotion?.removeEventListener('change',onReduced);};
  api.state.thesisIndex=cursor;arrange();return root;
}
