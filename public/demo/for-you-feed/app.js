const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STORE='alva-for-you-snapshot-v1';
let data,user=1,offset=0,busy=false;
let local={};try{local=JSON.parse(localStorage.getItem(STORE)||'{}');if(!local||typeof local!=='object'||Array.isArray(local))local={}}catch{}
function state(uid){if(!local[uid]||!Array.isArray(local[uid].followed)||!Array.isArray(local[uid].hidden))local[uid]={followed:[],hidden:[]};return local[uid]}
function persist(){try{localStorage.setItem(STORE,JSON.stringify(local))}catch{toast('浏览器未允许保存，操作仅在本次页面有效')}}
const dates=s=>new Date(s).toLocaleDateString('zh-CN',{month:'short',day:'numeric'});
function toast(s){$('#toast').textContent=s;$('#toast').style.display='block';setTimeout(()=>$('#toast').style.display='none',2600)}
function eventFor(t,key,kind,uid=user){if(kind==='hide'){const s=state(uid);if(!s.hidden.includes(t.id))s.hidden.push(t.id);persist()}}
function thesis(id,uid=user){return {...data.theses[id],following:[...data.baselineFollows[uid],...state(uid).followed].includes(id)}}
async function api(path,body){
 if(path==='/api/follow'){const s=state(body.user);if(!s.followed.includes(body.id))s.followed.push(body.id);persist();return {}}
 if(path.startsWith('/api/related?')){const args=new URLSearchParams(path.split('?')[1]);return {ready:true,theses:(data.related[args.get('id')]||[]).map(h=>({thesis:thesis(h.id,+args.get('user')),score:h.score}))}}
 throw Error('Unsupported static action');
}
function originBadge(item){
 const pool=item.recommendationOrigin?.pool;
 const labels={direct:['Following',item.thesis?.following?'你已关注这条 thesis':'来自已关注 thesis 或自选 ticker'],related:['Related','围绕关注内容与自选兴趣召回'],trending:['Trending','本地热榜：暂无真实用户热度数据']};
 const label=labels[pool];
 return label?`<span class="origin origin-${pool}" title="${esc(label[1])}">${label[0]}</span>`:'';
}
function card(item){const t=item.thesis;if(!t||!t.catalog)return null;const s=t.catalog,uid=user;const el=document.createElement('article');el.className='card';el.dataset.key=item.itemKey;el.dataset.user=uid;el.thesis=t;
 const media=(s.media||[]).find(m=>m.type==='image'&&/^https:\/\//.test(m.url));
 el.innerHTML=`<div class="meta"><img class="avatar" src="${esc(t.owner.avatar_url)}" alt="" loading="lazy"><div><div class="author"><span>${esc(s.author_name)}</span>${originBadge(item)}</div><div class="date">@${esc(s.author_handle)} · ${dates(s.published_at)} · ${s.kind==='technical'?'技术观点':'基本面观点'}</div></div></div><div class="tickers">${s.tickers.map(v=>`<span class="ticker">$${esc(v)}</span>`).join('')}</div><div class="body">${esc(t.body)}</div>${media?`<img class="media" src="${esc(media.url)}" alt="${esc(media.alt||'来源图片')}" loading="lazy">`:''}<div class="actions"><button data-action="open">打开观点</button><button data-action="related">相关观点</button><button data-action="follow" ${t.following?'disabled':''}>${t.following?'已关注':'关注 thesis'}</button><button data-action="hide">不感兴趣</button><a class="source" href="${/^https?:\/\//.test(s.source.url)?esc(s.source.url):'#'}" target="_blank" rel="noopener noreferrer">原始来源 ↗</a></div><div class="detail"></div>`;
 el.querySelectorAll('img').forEach(img=>img.onerror=()=>img.style.display='none');
 el.querySelector('.source').onclick=()=>eventFor(t,item.itemKey,'opened',uid);
 el.querySelectorAll('[data-action]').forEach(b=>b.onclick=async()=>{try{const action=b.dataset.action;if(action==='hide'){eventFor(t,item.itemKey,'hide',uid);el.remove();toast('已隐藏这条 thesis');return}if(action==='follow'){await api('/api/follow',{user:uid,id:t.id});b.textContent='已关注';b.disabled=true;toast('已在本机关注；静态快照排序不变');return}if(action==='open'){eventFor(t,item.itemKey,'opened',uid);b.textContent='已打开';$('#reader-content').innerHTML=`<h2>${esc(s.author_name)}</h2><div class="date">${esc(s.tickers.join(' / '))} · ${dates(s.published_at)}</div><p>${esc(t.body)}</p><a href="${esc(s.source.url)}" target="_blank" rel="noopener noreferrer">查看原始来源 ↗</a>`;$('#reader').showModal();return}b.disabled=true;const r=await api(`/api/related?user=${uid}&id=${t.id}`);el.querySelector('.detail').innerHTML=`<div class="related"><strong>相关观点</strong>${!r.ready?'<p>索引仍在准备中</p>':!(r.theses||[]).length?'<p>暂未找到可展示的相关观点</p>':r.theses.map(v=>`<article><strong>${esc(v.thesis.catalog?.author_name||v.thesis.title)}</strong><small> · 相关分数 ${v.score.toFixed(3)}</small><p>${esc(v.thesis.body)}</p></article>`).join('')}</div>`;b.disabled=false}catch(e){toast('操作失败：'+e.message)}});return el}
function load(){
 if(!data||busy)return;busy=true;
 const items=data.feeds[user];let added=0;
 while(offset<items.length&&added<10){const it=items[offset++];if(state(user).hidden.includes(it.id))continue;const el=card({itemKey:'snapshot:'+it.id,thesis:thesis(it.id),recommendationOrigin:{pool:it.pool}});if(el){$('#feed').append(el);added++}}
 $('#status').textContent=offset>=items.length?'这份快照已读完，可切换兴趣或重新阅读。':'继续向下阅读';busy=false;
}
function select(uid){window.scrollTo(0,0);user=uid;offset=0;$('#feed').innerHTML='';const p=data.profiles.find(p=>p.id===uid);$('#subtitle').textContent=p.name+' · '+p.detail;$('#mobile').value=uid;document.querySelectorAll('.profile').forEach(b=>b.classList.toggle('active',+b.dataset.id===uid));$('#interests').innerHTML=p.tickers.length?p.tickers.map(t=>`<span class="pill">${esc(t)}</span>`).join(''):'<p>从零开始发现内容</p>';$('#debug').textContent=`快照 ${new Date(data.exportedAt).toLocaleString('zh-CN')} · 当前视角 ${data.feeds[uid].length} 条`;load()}
$('#refresh').onclick=()=>data&&select(user);
$('#mobile').onchange=e=>select(+e.target.value);
$('#reset').onclick=()=>{local={};persist();select(user);toast('已重置全部视角的本地关注与隐藏')};
new IntersectionObserver(e=>{if(e[0].isIntersecting)load()},{rootMargin:'500px'}).observe($('#sentinel'));
fetch('snapshot.json').then(r=>{if(!r.ok)throw Error('快照加载失败');return r.json()}).then(d=>{
 data=d;$('#profiles').innerHTML=d.profiles.map(p=>`<button class="profile" data-id="${p.id}"><strong>${esc(p.name)}</strong><small>${esc(p.detail)}</small></button>`).join('');$('#mobile').innerHTML=d.profiles.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');document.querySelectorAll('.profile').forEach(b=>b.onclick=()=>select(+b.dataset.id));$('#counts').innerHTML=Object.keys(d.theses).length+' <small>条当前 thesis</small>';$('#index').textContent='完整内容库 · 五个推荐视角';select(1);
}).catch(e=>$('#status').textContent=e.message+'，请刷新页面重试。');
