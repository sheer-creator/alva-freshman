const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STORE='alva-for-you-snapshot-v1';
let data,user=1,offset=0,busy=false;
let local={};try{local=JSON.parse(localStorage.getItem(STORE)||'{}');if(!local||typeof local!=='object'||Array.isArray(local))local={}}catch{}
function state(uid){if(!local[uid]||!Array.isArray(local[uid].followed))local[uid]={followed:[]};return local[uid]}
function persist(){try{localStorage.setItem(STORE,JSON.stringify(local))}catch{toast('浏览器未允许保存，操作仅在本次页面有效')}}
const dates=s=>new Date(s).toLocaleDateString('zh-CN',{month:'short',day:'numeric'});
function toast(s){$('#toast').textContent=s;$('#toast').style.display='block';setTimeout(()=>$('#toast').style.display='none',2600)}
function thesis(id,uid=user){return {...data.theses[id],saved:[...data.baselineFollows[uid],...state(uid).followed].includes(id)}}
function sourceLink(t){const url=t.catalog.source.url;return /^https?:\/\//.test(url)?esc(url):'#'}
function openThesis(t){
 const s=t.catalog,hits=data.related[t.id]||[];
 $('#reader-content').innerHTML=`<h2 id="reader-title">${esc(s.author_name)}</h2><div class="date">${esc(s.tickers.join(' / '))} · ${dates(s.published_at)}</div><p>${esc(t.body)}</p><a href="${sourceLink(t)}" target="_blank" rel="noopener noreferrer">查看原始来源 ↗</a><section class="related" aria-label="Related theses"><h3>Related theses</h3>${hits.length?hits.map(h=>{const r=data.theses[h.id];return `<article><strong>${esc(r.catalog.author_name)}</strong><small> · ${esc(r.catalog.tickers.join(' / '))} · ${dates(r.catalog.published_at)} · ${h.score.toFixed(3)}</small><p>${esc(r.body)}</p><a href="${sourceLink(r)}" target="_blank" rel="noopener noreferrer">原始来源 ↗</a></article>`}).join(''):'<p>暂无相关观点</p>'}</section>`;
 $('#reader').showModal();$('#reader').scrollTop=0;
}
function originBadge(item){
 const pool=item.recommendationOrigin?.pool;
 const labels={direct:['Following',item.thesis?.saved?'你已保存这条 thesis':'来自已保存 thesis 或自选 ticker'],related:['Related','围绕关注内容与自选兴趣召回'],trending:['Trending','本地热榜：暂无真实用户热度数据']};
 const label=labels[pool];
 return label?`<span class="origin origin-${pool}" title="${esc(label[1])}">${label[0]}</span>`:'';
}
function card(item){const t=item.thesis;if(!t||!t.catalog)return null;const s=t.catalog,uid=user;const el=document.createElement('article');el.className='card';el.dataset.key=item.itemKey;el.dataset.user=uid;el.thesis=t;
 const media=(s.media||[]).find(m=>m.type==='image'&&/^https:\/\//.test(m.url));
 el.innerHTML=`<div class="card-main" role="button" tabindex="0" aria-label="打开 ${esc(s.author_name)} 的观点"><div class="meta"><img class="avatar" src="${esc(t.owner.avatar_url)}" alt="" loading="lazy"><div><div class="author"><span>${esc(s.author_name)}</span>${originBadge(item)}</div><div class="date">@${esc(s.author_handle)} · ${dates(s.published_at)} · ${s.kind==='technical'?'技术观点':'基本面观点'}</div></div></div><div class="tickers">${s.tickers.map(v=>`<span class="ticker">$${esc(v)}</span>`).join('')}</div><div class="body">${esc(t.body)}</div>${media?`<img class="media" src="${esc(media.url)}" alt="${esc(media.alt||'来源图片')}" loading="lazy">`:''}</div><div class="actions"><button data-action="open">打开观点</button><button data-action="save" ${t.saved?'disabled':''}>${t.saved?'Saved':'Save'}</button><a class="source" href="${sourceLink(t)}" target="_blank" rel="noopener noreferrer">原始来源 ↗</a></div>`;
 el.querySelectorAll('img').forEach(img=>img.onerror=()=>img.style.display='none');
 const main=el.querySelector('.card-main');main.onclick=()=>openThesis(t);main.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openThesis(t)}};
 el.querySelector('[data-action="open"]').onclick=()=>openThesis(t);
 el.querySelector('[data-action="save"]').onclick=e=>{const st=state(uid);if(!st.followed.includes(t.id))st.followed.push(t.id);persist();e.currentTarget.textContent='Saved';e.currentTarget.disabled=true;toast('已保存到本机；静态快照排序不变')};
 return el;
}
function load(){
 if(!data||busy)return;busy=true;
 const items=data.feeds[user];let added=0;
 while(offset<items.length&&added<10){const it=items[offset++];const el=card({itemKey:'snapshot:'+it.id,thesis:thesis(it.id),recommendationOrigin:{pool:it.pool}});if(el){$('#feed').append(el);added++}}
 $('#status').textContent=offset>=items.length?'这份快照已读完，可切换兴趣或重新阅读。':'继续向下阅读';busy=false;
}
function select(uid){window.scrollTo(0,0);user=uid;offset=0;$('#feed').innerHTML='';const p=data.profiles.find(p=>p.id===uid);$('#subtitle').textContent=p.name+' · '+p.detail;$('#mobile').value=uid;document.querySelectorAll('.profile').forEach(b=>b.classList.toggle('active',+b.dataset.id===uid));$('#interests').innerHTML=p.tickers.length?p.tickers.map(t=>`<span class="pill">${esc(t)}</span>`).join(''):'<p>从零开始发现内容</p>';$('#debug').textContent=`快照 ${new Date(data.exportedAt).toLocaleString('zh-CN')} · 当前视角 ${data.feeds[uid].length} 条`;load()}
$('#refresh').onclick=()=>data&&select(user);
$('#mobile').onchange=e=>select(+e.target.value);
$('#reset').onclick=()=>{local={};persist();select(user);toast('已重置全部视角的本地保存')};
new IntersectionObserver(e=>{if(e[0].isIntersecting)load()},{rootMargin:'500px'}).observe($('#sentinel'));
fetch('snapshot.json').then(r=>{if(!r.ok)throw Error('快照加载失败');return r.json()}).then(d=>{
 data=d;$('#profiles').innerHTML=d.profiles.map(p=>`<button class="profile" data-id="${p.id}"><strong>${esc(p.name)}</strong><small>${esc(p.detail)}</small></button>`).join('');$('#mobile').innerHTML=d.profiles.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');document.querySelectorAll('.profile').forEach(b=>b.onclick=()=>select(+b.dataset.id));$('#counts').innerHTML=Object.keys(d.theses).length+' <small>条当前 thesis</small>';$('#index').textContent='完整内容库 · 五个推荐视角';select(1);
}).catch(e=>$('#status').textContent=e.message+'，请刷新页面重试。');
