import{r as a,j as e}from"./index-CYlLI1Ev.js";import{A as Pe,T as Oe,C as z,a as We,b as M,r as we}from"./AppShell--It4yFX6.js";import{T as _e,a as Be,P as Fe}from"./TrendingFilterBar-BHox4NVA.js";import{P as J,O as Z,C as ee}from"./new-chat-mock-CKN08PbG.js";import{A as $e,F as Ye}from"./FeedDetailModal-DO4Wx2h1.js";import{b as Ge,P as Ve,a as Xe,c as Ue}from"./PlaybookCard-CyQpKXLb.js";import{PLAYBOOKS_ORDERED as fe,chipMatchesPlaybook as Ke}from"./Explore2-DlMO7au3.js";import"./referral-mock-Bd3ulMO5.js";const qe=[{keys:["btc","bitcoin"],prompts:["Track BTC momentum and alert me on 1h breakouts above 3% gains","Build a BTC DCA playbook with weekly rebalancing and a 20% max drawdown stop","Correlate BTC with NASDAQ tech names and flag regime shifts in real time"]},{keys:["eth","ethereum"],prompts:["Set up an ETH staking-yield tracker with alerts on gas-fee spikes","Build an ETH/BTC ratio rotation playbook with RSI confirmation","Monitor ETH Layer-2 TVL shifts and flag capital rotation signals"]},{keys:["sol","solana"],prompts:["Track SOL DEX volume vs ETH and surface dApp rotation signals","Build a SOL/ETH pair-trade triggered by volume divergence","Monitor SOL validator health and alert on decentralization risk"]},{keys:["nvda","nvidia"],prompts:["Deep-dive NVDA — revenue segmentation, peer valuation, and supply-chain exposure","Build an NVDA earnings run-up playbook with an options overlay","Track NVDA vs AMD/AVGO relative strength with daily alerts"]},{keys:["tsla","tesla"],prompts:["Track TSLA delivery numbers vs consensus and alert on misses","Build a TSLA vs BYD pair-trade with weekly rebalancing","Correlate TSLA price with China EV sentiment and surface leading indicators"]},{keys:["ai","artificial intelligence"],prompts:["Surface the top 5 AI infrastructure plays by 90-day momentum","Build an AI-sector rotation basket rebalanced monthly","Compare AI beneficiaries vs software incumbents and flag divergences"]},{keys:["macro","fed","cpi","rates"],prompts:["Daily macro brief — US rates, DXY, oil, credit spreads with LLM commentary","Build a recession-risk dashboard with 5 leading indicators","Set up Fed-cut scenario alerts when CPI surprises move odds >5%"]},{keys:["earnings"],prompts:["Build an earnings whisper tracker for the next 2 weeks","Post-earnings drift playbook — long beaters, short missers on a 3-day hold","Compare implied vs realized moves across MAG7 earnings"]},{keys:["options","iv"],prompts:["Scan for unusual options volume in mega-cap tech and alert on sweeps","Build an IV-crush playbook for post-earnings plays","Track 0DTE flow on SPX and surface directional bias shifts"]},{keys:["dividend","income"],prompts:["Build a dividend-growth screen with 10+ years of growth and sub-60% payout ratio","Track dividend ex-dates across my watchlist and alert 5 days ahead","Compare dividend-yield baskets vs treasury yield and flag regime shifts"]},{keys:["what is","what's"],prompts:["What is the implied-volatility curve telling us about NVDA this week?","What is the best way to hedge a long BTC position right now?","What is the Sharpe ratio of my current portfolio over 90 days?"]},{keys:["how to","how do i","how do"],prompts:["How to build a momentum playbook with drawdown caps","How to hedge my equity portfolio against a Fed surprise","How to spot unusual options flow in real time"]},{keys:["find","show me","show"],prompts:["Find playbooks with >20% annualized return and <10% drawdown","Show me undervalued tech names with rising earnings estimates","Find the top yield opportunities in stablecoins right now"]},{keys:["compare","vs","versus"],prompts:["Compare NVDA and AMD across growth, margins, and valuation","Compare my portfolio vs the S&P 500 over the last 90 days","Compare BTC and ETH risk-adjusted returns year-to-date"]},{keys:["why"],prompts:["Why is BTC underperforming NASDAQ this month?","Why are semis volatile heading into earnings?","Why did my portfolio drop on Friday's close?"]},{keys:["summarize","summary","tl;dr"],prompts:["Summarize this week's Fed speakers and market reactions","Summarize my recent trades and flag any discipline slips","Summarize the latest AI-sector earnings ranked by relevance"]},{keys:["explain"],prompts:["Explain what's driving the 10-year yield higher today","Explain the divergence between SPX and credit spreads","Explain the risk profile of my current top holding"]}],Qe=2;function Je(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ze(n,i){const s=`\\b${Je(i).replace(/\s+/g,"\\s+")}\\b`;return new RegExp(s,"i").test(n)}function et(n){const i=n.trim();if(i.length<Qe)return[];if(i.length>60)return[];if(i.split(/\s+/).length>5)return[];for(const s of qe)if(s.keys.some(p=>Ze(i,p)))return s.prompts;return[]}const tt="researcher-l1";function S(){return typeof window>"u"||typeof window.matchMedia!="function"?!0:window.matchMedia("(hover: hover)").matches}const N={display:"flex",alignItems:"center",gap:8,height:40,padding:"0 16px",borderRadius:999,border:"0.5px solid var(--line-l2)",fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"22px",fontWeight:400,color:"var(--text-n9)",whiteSpace:"nowrap",cursor:"pointer",letterSpacing:.14,userSelect:"none",background:"white",transition:"box-shadow 160ms ease, transform 160ms ease"};function Lt({template:n,active:i,onClick:s,onHover:p,onLeave:o}){const r=a.useRef(null);return e.jsxs("button",{ref:r,onClick:s,onMouseEnter:()=>{S()&&r.current&&(r.current.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",r.current.style.transform="translateY(-2px)",p&&p(r.current.getBoundingClientRect()))},onMouseLeave:()=>{S()&&(r.current&&(r.current.style.boxShadow="none",r.current.style.transform="translateY(0)"),o==null||o())},style:{...N,background:i?"#f3f8f8":"white"},children:[n.kol?e.jsx(M,{name:n.creator,size:22}):n.icon&&e.jsx(z,{name:n.icon,size:16,color:"var(--text-n7)"}),n.label]})}function re(n){let i=2166136261;for(let s=0;s<n.length;s++)i^=n.charCodeAt(s),i=Math.imul(i,16777619);return i>>>0}function ke(n){const s=re(n)%7200;return s<1?"just now":s<60?`${s}m ago`:s<1440?`${Math.floor(s/60)}h ago`:`${Math.floor(s/1440)}d ago`}const me=["Filings","Insider Cluster","Event Drift","Earnings Drift","Whisper Numbers","Macro Flow","FX Cross","Rates Curve","Credit Spread","Sentiment","Theme Tracker","Catalyst","Risk Off","Backtest","Yield Curve","Dividend","On-Chain","ETF Flow","MAG7","AI Capex","Hyperscaler","Volatility","Carry","Drawdown","Sharpe","Quintile","Read-Across","Sector Rotation","Pair Trade","Theme"];function ae(n){const s=(re(n)>>>12)%2+2,p=new Set,o=[];for(let r=0;o.length<s&&r<32;r++){const x=re(`${n}|tag|${r}`)%me.length;p.has(x)||(p.add(x),o.push(me[x]))}return o}const ue=n=>()=>e.jsx("img",{src:`/${n}`,alt:"",width:14,height:14,style:{width:14,height:14,display:"block"}}),nt=()=>()=>e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),it=()=>()=>e.jsx("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})}),xe={discord:{key:"discord",label:"Discord",href:"https://discord.com",render:ue("logo-social-discord.svg")},telegram:{key:"telegram",label:"Telegram",href:"https://telegram.org",render:ue("logo-telegram.svg")},x:{key:"x",label:"X",href:"https://x.com",render:nt()},instagram:{key:"instagram",label:"Instagram",href:"https://instagram.com",render:it()}},rt=["discord","telegram","x"],at=["x","telegram","discord","instagram"];function se(n){if(n==="Alva")return rt.map(r=>xe[r]);let i=2166136261;for(let r=0;r<n.length;r++)i^=n.charCodeAt(r),i=Math.imul(i,16777619)>>>0;const s=r=>{let g=i;for(let x=0;x<r.length;x++)g^=r.charCodeAt(x),g=Math.imul(g,16777619)>>>0;return g},p=i%2+1;return[...at].sort((r,g)=>s(r)-s(g)).slice(0,p).map(r=>xe[r])}function st({template:n,anchor:i,placeAbove:s,side:p="auto",onMouseEnter:o,onMouseLeave:r}){const y=a.useRef(null),[v,h]=a.useState(220);a.useLayoutEffect(()=>{y.current&&h(y.current.offsetHeight)},[n.id]);const c=n.tags??ae(n.id);let f,u;return p==="left"?(f=i.left-360-10,typeof window<"u"&&(f=Math.max(12,f)),u=i.top+i.height/2-v/2,typeof window<"u"&&(u=Math.max(12,Math.min(u,window.innerHeight-v-12)))):(f=i.left+i.width/2-360/2,typeof window<"u"&&(f=Math.max(12,Math.min(f,window.innerWidth-360-12))),u=s?i.top-v-10:i.bottom+10),e.jsxs("div",{ref:y,onMouseEnter:o,onMouseLeave:r,style:{position:"fixed",top:u,left:f,width:360,zIndex:50,background:"#ffffff",borderRadius:8,border:"0.5px solid var(--line-l2)",boxShadow:"var(--shadow-s)",padding:20,pointerEvents:"auto",animation:"newchat-fadeup 160ms ease-out"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("h2",{style:{fontFamily:"'Delight', sans-serif",fontSize:18,lineHeight:"24px",fontWeight:400,color:"var(--text-n9)",letterSpacing:.18,margin:0},children:n.label}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"16px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:400},children:ke(n.id)})]}),e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:13,lineHeight:"20px",color:"var(--text-n7)",letterSpacing:.13,margin:"10px 0 0"},children:n.description}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:10},children:c.slice(0,3).map(d=>e.jsx("span",{style:{height:20,padding:"0 6px",borderRadius:5,background:"var(--b-r05)",color:"var(--text-n5)",fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"20px",letterSpacing:.11,whiteSpace:"nowrap"},children:d},d))}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"20px 0"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("button",{type:"button",className:"nc-creator-link",onClick:d=>d.stopPropagation(),style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:10,padding:"4px 6px",margin:"-4px -6px",border:"none",background:"transparent",cursor:"pointer",borderRadius:6,transition:"background 140ms ease",textAlign:"left"},children:[e.jsx(M,{name:n.creator,size:36}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"14px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:400},children:"Created by"}),e.jsx("div",{className:"nc-creator-link-name",style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"20px",color:"var(--text-n9)",letterSpacing:.14,fontWeight:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",transition:"color 140ms ease"},children:n.creator})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:4,flexShrink:0},children:se(n.creator).map(d=>e.jsx("a",{href:d.href,target:"_blank",rel:"noreferrer noopener","aria-label":d.label,style:{width:24,height:24,borderRadius:"9999px",background:"var(--b-r05)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background 120ms ease, transform 120ms ease"},onMouseEnter:m=>{S()&&(m.currentTarget.style.background="var(--b-r1)",m.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:m=>{S()&&(m.currentTarget.style.background="var(--b-r05)",m.currentTarget.style.transform="translateY(0)")},children:d.render()},d.key))})]})]})}function ge({text:n,onClick:i,index:s=0}){return e.jsxs("button",{type:"button",className:"nc-prompt-row",style:{animation:"newchat-fade 220ms ease-out both",animationDelay:`${s*70}ms`},onClick:i,onMouseEnter:p=>{S()&&(p.currentTarget.style.background="var(--b-r03)")},onMouseLeave:p=>{S()&&(p.currentTarget.style.background="transparent")},children:[e.jsx("span",{className:"nc-prompt-text",children:n}),e.jsx(z,{name:"enter-l",size:20,color:"rgba(0,0,0,0.4)"})]})}function te({widthPct:n}){return e.jsxs("div",{className:"nc-prompt-skeleton-row",style:{display:"flex",alignItems:"center",gap:12,height:46,padding:"12px",boxSizing:"border-box"},children:[e.jsx("div",{style:{flex:1,height:14,background:"var(--b-r07)",borderRadius:4,maxWidth:`${n}%`}}),e.jsx("div",{style:{width:20,height:20,background:"var(--b-r05)",borderRadius:4}})]})}const Se={"theme-tracker":"thesis","smart-screener":"screener","deep-dive":"thesis","daily-macro-brief":"general","earnings-edge":"thesis","crypto-pulse":"general","what-if":"what-if","yield-hunter":"screener","dividend-diary":"screener",backtest:"what-if",valuation:"thesis"},ot={"theme-tracker":"macro","smart-screener":"momentum","deep-dive":"ai","daily-macro-brief":"review","earnings-edge":"macro","crypto-pulse":"alerts","what-if":"event_study","yield-hunter":"dividend","dividend-diary":"dividend",backtest:"event_study",valuation:"value"},lt=["S&P LARGE CAP","RUSSELL 2000","NASDAQ 100","MSCI EMG","STOXX 600","TOPIX 500"],dt=["1H","6H","1D","1W"],ct=["Late long-term debt cycle · risk-off bias","AI capex peak forming into Q3","Basket −2.1% vs SMH +0.6% YTD","Hyperscaler PPA flows feed power demand","Dollar regime shift, EM tailwind","Curve re-steepening as growth softens"],pt=["Historically Drops","Historically Rises","Range-Bound","Outperforms Peers","Trails Benchmark"],ht=["CONTEXT FEED · daily","WATCHLIST · 2026","BRIEF · daily","PULSE · live","ALERTS · LIVE · 30S"],ft=["2h ago","38 holdings","1.2M views","live","12 alerts","07:30 ET"],mt=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],ut=["RISK","CATALYST","AMBIGUOUS"];function xt(n){let i=2166136261;for(let s=0;s<n.length;s++)i^=n.charCodeAt(s),i=Math.imul(i,16777619);return i>>>0}function gt(n,i){const s=Se[i]??"general",p=ot[i],o=xt(`${n.id}|${n.title}`),r=(h,c)=>h[(o>>>c)%h.length],g=n.tickers??[],x={template:s,title:n.title,author:n.creator,tickers:g,domain:p};if(s==="screener")return{...x,series:`SCORED · ${r(lt,0)} · ${r(dt,6)}`};if(s==="thesis"){const h=r(mt,0),c=(o>>>4)%28+1;return{...x,anchor:`${h} ${c}`,category:r(ut,8),kind:r(ct,12)}}if(s==="what-if"){const h=(o>>>0&1)===1,c=((o>>>2)%45+5)/10,f=(o>>>8)%9+2,u=Array.from({length:5}).map((d,m)=>{const j=(o>>>m*3&255)/255*2-1;return Math.round((j*(h?1:-1)*4+(h?.6:-.6))*10)/10});return{...x,series:`30D AFTER · ${f}×`,kind:r(pt,16),anchor:`${h?"+":"−"}${c.toFixed(1)}%`,whatIfBars:u}}const y=(o>>>0)%70+10,v=((o>>>4)%200+50)/10;return{...x,kind:r(ht,0),anchor:r(ft,8),series:`${y} PIECES · ${v.toFixed(1)}K VIEWS`}}function ye({p:n,skillId:i,onClick:s}){const p=Ge({template:Se[i]??"general",tickers:n.tickers??[]});return e.jsxs("div",{onClick:s,className:"cursor-pointer",style:{background:"#ffffff",border:"0.5px solid var(--line-l3)",borderRadius:8,padding:4,display:"flex",flexDirection:"column",overflow:"hidden",width:"100%",transition:"box-shadow 180ms ease, transform 180ms ease"},onMouseEnter:o=>{S()&&(o.currentTarget.style.boxShadow="0 8px 22px rgba(0,0,0,0.06)",o.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:o=>{S()&&(o.currentTarget.style.boxShadow="none",o.currentTarget.style.transform="translateY(0)")},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"472 / 265.5",borderRadius:4,overflow:"hidden",flexShrink:0},children:e.jsx(Ve,{input:gt(n,i)})}),e.jsxs("div",{style:{padding:"16px 12px 12px",display:"flex",flexDirection:"column",gap:12},children:[e.jsx(Xe,{tags:p}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("p",{style:{fontSize:16,lineHeight:"26px",fontWeight:400,color:"var(--text-n9)",letterSpacing:.16,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",margin:0,height:28},children:n.title}),e.jsx("p",{style:{fontSize:12,lineHeight:"20px",color:"var(--text-n5)",letterSpacing:.12,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",margin:0,height:44},children:n.desc})]})]})]})}function yt(){return e.jsxs("div",{style:{background:"#ffffff",border:"0.5px solid var(--line-l12)",borderRadius:8,padding:4,display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"472 / 265.5",borderRadius:4,background:"var(--b-r05)"}}),e.jsxs("div",{style:{padding:"16px 12px 12px",display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("div",{style:{width:70,height:20,background:"var(--b-r07)",borderRadius:4}}),e.jsx("div",{style:{width:40,height:20,background:"var(--b-r05)",borderRadius:4}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[e.jsx("div",{style:{height:18,background:"var(--b-r07)",borderRadius:4,maxWidth:"60%"}}),e.jsx("div",{style:{height:12,background:"var(--b-r05)",borderRadius:4}}),e.jsx("div",{style:{height:12,background:"var(--b-r05)",borderRadius:4,maxWidth:"80%"}})]})]})]})}function bt({skills:n,selectedId:i,onSelect:s,onClose:p}){const o=y=>y<640?1:y<960?2:3,[r,g]=a.useState(()=>typeof window>"u"?3:o(window.innerWidth));if(a.useEffect(()=>{const y=()=>g(o(window.innerWidth));return window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[]),typeof document>"u")return null;const x=Array.from({length:r},()=>[]);return n.forEach((y,v)=>x[v%r].push(y)),we.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"skills-panel-backdrop",onClick:p}),e.jsxs("div",{className:"skills-panel",role:"dialog","aria-label":"Skills",children:[e.jsxs("div",{className:"skills-panel-header",children:[e.jsx("span",{className:"skills-panel-title",children:"Skills"}),e.jsx("button",{type:"button","aria-label":"Close",className:"skills-panel-close",onClick:p,children:e.jsx(z,{name:"close-l1",size:16,color:"var(--text-n7)"})})]}),e.jsx("div",{className:"skills-panel-scroll",children:e.jsx("div",{className:"skills-panel-grid",children:x.map((y,v)=>e.jsx("div",{className:"skills-panel-col",children:y.map(h=>{const c=h.tags??ae(h.id),f=i===h.id,u=se(h.creator);return e.jsxs("button",{type:"button",className:`skills-panel-card${f?" is-selected":""}`,onClick:()=>s(h.id),children:[e.jsxs("div",{className:"skills-panel-card-content",children:[e.jsxs("div",{className:"skills-panel-card-header",children:[h.creator==="Alva"&&h.icon?e.jsx("span",{className:"skills-panel-card-icon-wrap",children:e.jsx(z,{name:h.icon,size:20,color:"var(--text-n7)"})}):e.jsx("span",{className:"skills-panel-card-creator-thumb",children:e.jsx(M,{name:h.creator,size:36})}),e.jsxs("div",{className:"skills-panel-card-titleblock",children:[e.jsx("span",{className:"skills-panel-card-name",children:h.label}),e.jsx("span",{className:"skills-panel-card-author",children:h.creator})]})]}),e.jsx("p",{className:"skills-panel-card-desc",children:h.description}),c.length>0&&e.jsx("div",{className:"skills-panel-card-tags",children:c.slice(0,3).map(d=>e.jsx("span",{className:"skills-panel-card-tag",children:d},d))})]}),e.jsx("div",{className:"skills-panel-card-hoverblock",children:e.jsxs("div",{className:"skills-panel-card-hoverblock-inner",children:[e.jsx("div",{className:"skills-panel-card-divider"}),e.jsxs("div",{className:"skills-panel-card-creator-row",children:[e.jsx(M,{name:h.creator,size:36}),e.jsxs("div",{className:"skills-panel-card-creator-text",children:[e.jsx("span",{className:"skills-panel-card-creator-caps",children:"Created by"}),e.jsx("button",{type:"button",className:"skills-panel-card-creator-name",onClick:d=>d.stopPropagation(),children:e.jsx("span",{className:"skills-panel-card-creator-name-text",children:h.creator})})]}),e.jsx("div",{className:"skills-panel-card-socials",children:u.map(d=>e.jsx("a",{href:d.href,target:"_blank",rel:"noreferrer noopener","aria-label":d.label,onClick:m=>m.stopPropagation(),className:"skills-panel-card-social",children:d.render()},d.key))})]})]})})]},h.id)})},v))})})]})]}),document.body)}const vt=36,wt=28,ne=1.33,be=640,ve=18;function kt({selected:n,maxWidth:i}){const[s,p]=a.useState(()=>typeof window<"u"?window.innerWidth<be:!1);a.useEffect(()=>{const m=()=>p(window.innerWidth<be);return m(),window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[]);const o=s?wt:vt,g=Math.ceil(o*ne)*2,x=a.useRef(null),y=a.useRef(null),v=a.useRef(null),h=a.useRef(null),c=a.useRef("");a.useRef(!1);const[f,u]=a.useState(1),d=n?`Build your ${n.label}`:`Turn Ideas into Live
Investing Playbooks in Minutes`;return a.useLayoutEffect(()=>{const m=x.current,j=y.current;if(!m||!j)return;const D=()=>{j.style.maxWidth=`${m.clientWidth}px`;const T=j.scrollHeight;u(T>g?g/T:1)};D();const A=new ResizeObserver(D);return A.observe(m),()=>A.disconnect()},[d,g]),a.useEffect(()=>{const m=c.current;if(m===d){c.current=d;return}c.current=d;const j=x.current,D=y.current,A=v.current,T=h.current},[d]),e.jsxs("div",{ref:x,style:{position:"relative",width:"100%",maxWidth:i,height:g,display:"flex",alignItems:"center",justifyContent:"center",overflow:"visible"},children:[e.jsx("style",{children:`
        @keyframes tr-dot-flash { 0%{opacity:0} 15%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-erase { 0%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-appear { 0%{opacity:0} 100%{opacity:1} }
        .tr-cell{ position:absolute; width:${ve}px; height:${ve}px; opacity:0; pointer-events:none; }
      `}),e.jsx("h1",{ref:v,"aria-hidden":!0,style:{position:"absolute",left:0,right:0,top:"50%",transform:`translateY(-50%) scale(${f})`,transformOrigin:"center",fontSize:o,lineHeight:ne,fontWeight:400,color:"var(--text-n9)",textAlign:"center",letterSpacing:.45,margin:0,pointerEvents:"none",zIndex:1}}),e.jsx("h1",{ref:y,style:{fontSize:o,lineHeight:ne,fontWeight:400,color:"var(--text-n9)",textAlign:"center",letterSpacing:.45,margin:0,transform:`scale(${f})`,transformOrigin:"center",position:"relative",zIndex:1,whiteSpace:"pre-line"},children:d}),e.jsx("div",{ref:h,"aria-hidden":!0,style:{position:"absolute",inset:0,pointerEvents:"none",zIndex:2,overflow:"visible"}})]})}function St({template:n,onClose:i,onSelect:s}){const p=n.tags??ae(n.id);return typeof document>"u"?null:we.createPortal(e.jsx("div",{onClick:i,style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"newchat-fade 160ms ease-out"},children:e.jsxs("div",{onClick:o=>o.stopPropagation(),style:{width:"100%",maxWidth:360,background:"#ffffff",borderRadius:14,padding:20,boxShadow:"0 20px 48px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.08)",animation:"newchat-fadeup 220ms ease-out"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("h2",{style:{fontFamily:"'Delight', sans-serif",fontSize:18,lineHeight:"24px",fontWeight:500,color:"var(--text-n9)",letterSpacing:.18,margin:0},children:n.label}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"16px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:500},children:ke(n.id)})]}),e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:13,lineHeight:"20px",color:"var(--text-n7)",letterSpacing:.13,margin:"10px 0 0"},children:n.description}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:10},children:p.slice(0,3).map(o=>e.jsx("span",{style:{height:20,padding:"0 6px",borderRadius:5,background:"var(--b-r05)",color:"var(--text-n5)",fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"20px",letterSpacing:.11,whiteSpace:"nowrap"},children:o},o))}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"20px 0 12px"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("div",{style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:10},children:[e.jsx(M,{name:n.creator,size:36}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"14px",color:"var(--text-n5)",letterSpacing:.11,fontWeight:500},children:"Created by"}),e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"20px",color:"var(--text-n9)",letterSpacing:.14,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:n.creator})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:6,flexShrink:0},children:se(n.creator).map(o=>e.jsx("a",{href:o.href,target:"_blank",rel:"noreferrer noopener","aria-label":o.label,style:{width:24,height:24,borderRadius:"9999px",background:"var(--b-r05)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:o.render()},o.key))})]}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"12px 0 20px"}}),e.jsx("button",{type:"button",onClick:s,style:{width:"100%",height:44,border:"none",borderRadius:10,background:"var(--main-m1)",color:"#fff",fontFamily:"'Delight', sans-serif",fontSize:14,fontWeight:500,letterSpacing:.14,cursor:"pointer"},children:"Pick this skill"})]})}),document.body)}const jt=340,ie=16;function Tt({onNavigate:n}){const[i,s]=a.useState("Popular"),[p,o]=a.useState(()=>new Set),r=a.useRef(null),[g,x]=a.useState(0);a.useEffect(()=>{if(!r.current)return;const c=r.current,f=new ResizeObserver(u=>{var m;const d=((m=u[0])==null?void 0:m.contentRect.width)??0;x(d)});return f.observe(c),()=>f.disconnect()},[]);const y=c=>{o(f=>{const u=new Set(f);return u.has(c)?u.delete(c):u.add(c),u})},v=a.useMemo(()=>{const c=i==="Recent"?[...fe].reverse():fe;return p.size===0?c:c.filter(f=>{for(const u of p)if(Ke(u,f))return!0;return!1})},[i,p]),h=g===0?{display:"grid",gap:ie,width:"100%"}:{display:"grid",gridTemplateColumns:`repeat(${Math.max(1,Math.floor((g+ie)/jt))}, minmax(0, 1fr))`,gap:ie,width:"100%"};return e.jsx("section",{style:{width:"100%",padding:"40px 28px 60px",position:"relative",zIndex:2},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,width:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"},children:[e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:20,lineHeight:"30px",letterSpacing:.2,color:"var(--text-n9)"},children:"Trending Playbooks"}),e.jsxs("button",{type:"button",onClick:()=>n("explore"),style:{display:"inline-flex",alignItems:"center",gap:4,height:28,padding:"4px 0",background:"transparent",border:"none",cursor:"pointer",fontFamily:"'Delight', sans-serif",fontSize:12,lineHeight:"20px",letterSpacing:.12,color:"var(--text-n9)"},children:["View all",e.jsx(z,{name:"arrow-right-l2",size:14,color:"var(--text-n9)"})]})]}),e.jsx(_e,{sort:i,sortOptions:Fe,chips:Be,onSortChange:s,selectedChips:p,onChipToggle:y}),e.jsx("div",{ref:r,style:h,children:v.map((c,f)=>e.jsx("div",{style:{width:"100%"},children:e.jsx(Ue,{p:c,staggerMs:f%10*1e3})},c.id))})]})})}const H=960;function Ht({onNavigate:n}){const[i,s]=a.useState(null),[p,o]=a.useState(null),[r,g]=a.useState(null),[x,y]=a.useState(""),[v,h]=a.useState(""),[c,f]=a.useState(null),[u,d]=a.useState(!1),[m,j]=a.useState(null);a.useEffect(()=>{if(typeof document>"u")return;const t=!!m||u;return document.body.classList.toggle("nc-overlay-open",t),()=>{document.body.classList.remove("nc-overlay-open")}},[m,u]);const[D,A]=a.useState(()=>typeof window<"u"?window.innerWidth<640:!1);a.useEffect(()=>{const t=()=>A(window.innerWidth<640);return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const T=a.useRef(null),je=a.useRef(null),P=a.useRef(null),oe=600,O=a.useRef(null),W=a.useRef(null),[F,$]=a.useState(null),Y=()=>{O.current!==null&&(window.clearTimeout(O.current),O.current=null),W.current&&(document.removeEventListener("mousemove",W.current),W.current=null),$(null)},Te=(t,l,k,w)=>{Y(),$({x:k,y:w});const C=E=>$({x:E.clientX,y:E.clientY});document.addEventListener("mousemove",C),W.current=C,O.current=window.setTimeout(()=>{Y(),le(t,l.getBoundingClientRect())},oe)},_=()=>{P.current!==null&&(window.clearTimeout(P.current),P.current=null)},G=()=>{_(),P.current=window.setTimeout(()=>f(null),160)},le=(t,l,k="auto")=>{if(k==="left"){_(),f({id:t,rect:l,placeAbove:!1,side:"left"});return}let w=!1;T.current&&T.current.querySelectorAll('button, [role="button"]').forEach(E=>{E.getBoundingClientRect().top>l.bottom-1&&(w=!0)}),_(),f({id:t,rect:l,placeAbove:w,side:"auto"})},[Ce,V]=a.useState(!1),[Ee,X]=a.useState(!1);a.useEffect(()=>{const t=setTimeout(()=>h(x),700);return()=>clearTimeout(t)},[x]),a.useEffect(()=>{if(!u)return;const t=l=>{l.key==="Escape"&&d(!1)};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[u]),a.useEffect(()=>{if(!i){V(!1),X(!1);return}V(!1),X(!1);const t=setTimeout(()=>V(!0),900),l=setTimeout(()=>X(!0),1500);return()=>{clearTimeout(t),clearTimeout(l)}},[i]);const de=a.useMemo(()=>et(v),[v]),U=!i&&de.length>0,b=a.useMemo(()=>i&&(J.find(t=>t.id===i)||Z.find(t=>t.id===i)||ee.find(t=>t.id===i))||null,[i]),B=a.useMemo(()=>[...J,...Z,...ee],[]),Ie=a.useRef(null),[K,Re]=a.useState(new Set);a.useLayoutEffect(()=>{const t=()=>{const k=T.current;if(!k)return;const w=Array.from(k.querySelectorAll("button[data-skill-id]")),C=k.querySelector("[data-more-wrap]");if(!C)return;w.forEach(I=>{I.style.display=""}),C.style.display="";const E=[],he=2,Le=()=>{const L=[...new Set([...w.filter(R=>R.style.display!=="none").map(R=>R.offsetTop),C.offsetTop])].sort((R,Q)=>R-Q).indexOf(C.offsetTop);return L>=0&&L<=he-1};let He=w.length;for(;He-- >0&&!Le();){const I=w.filter(Q=>Q.style.display!=="none");if(I.length===0)break;const L=I[I.length-1],R=L.dataset.skillId;R&&E.push(R),L.style.display="none",k.offsetWidth}E.length===0&&(C.style.display="none");const q=new Set(E);q.size===K.size&&[...q].every(I=>K.has(I))||Re(q)};t();const l=new ResizeObserver(t);return T.current&&l.observe(T.current),window.addEventListener("resize",t),()=>{l.disconnect(),window.removeEventListener("resize",t)}},[B,K,i]);const ze=t=>{if(D){j(t),d(!1),f(null);return}s(l=>l===t?null:t),f(null),d(!1)},De=t=>{s(l=>l===t?null:t),f(null),d(!1)},Ae=()=>{m&&(s(m),j(null),d(!1))},Ne=()=>s(null),ce=t=>o({text:t,seq:Date.now()}),Me=t=>{n(t==="__agent__"?"agent":`thread/${t}`)},pe=c?J.find(t=>t.id===c.id)||Z.find(t=>t.id===c.id)||ee.find(t=>t.id===c.id):null;return e.jsxs(Pe,{activePage:"new-chat",onNavigate:n,children:[e.jsx("style",{children:`
        @keyframes newchat-fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes newchat-fade{from{opacity:0}to{opacity:1}}
        @keyframes newchat-bubble-pop{
          0%{opacity:0;transform:scale(0.55)}
          55%{opacity:1;transform:scale(1.08)}
          100%{opacity:1;transform:scale(1)}
        }
        @keyframes newchat-skeleton{
          0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}
        }
        .nc-skeleton-anim{animation:newchat-skeleton 1.4s ease-in-out infinite}
        button.nc-pill{display:flex}
        .nc-chatbox-wrap .chat-input-wrapper{
          box-sizing:border-box;
        }
        .nc-chatbox-wrap .chat-input-editor-shell{
          min-height:48px;
        }
        .nc-prompts-list{
          display:flex;
          flex-direction:column;
          width:100%;
        }
        .nc-prompt-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          height:46px;
          min-height:46px;
          max-height:46px;
          flex:0 0 46px;
          box-sizing:border-box;
          padding:12px;
          background:transparent;
          border:none;
          border-radius:0;
          overflow:hidden;
          text-align:left;
          cursor:pointer;
          width:100%;
          transition:background 0.15s;
        }
        .nc-prompts-list > .nc-prompt-row:not(:last-child),
        .nc-prompts-list > .nc-prompt-skeleton-row:not(:last-child){
          border-bottom:0.5px solid var(--line-l12);
        }
        .nc-prompt-text{
          flex:1;
          min-width:0;
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:22px;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media (max-width: 639px){
          .newchat-page-topbar{display:none}
          /* mobile pill：尺寸更小，单行能放更多 */
          .nc-pill{
            height:40px !important;
            padding:0 14px !important;
            font-size:14px !important;
            line-height:22px !important;
            gap:8px !important;
            letter-spacing:0.14px !important;
          }
          .nc-pill > img,
          .nc-pill > div[class*="rounded-full"]{
            width:22px !important;
            height:22px !important;
            min-width:22px !important;
            min-height:22px !important;
          }
          .nc-pill > div[role="img"],
          .nc-pill .block{
            width:16px !important;
            height:16px !important;
          }
          .nc-hero-section{
            padding:56px 16px 12px !important;
            gap:24px !important;
          }
          /* 移动端输入框内边距收紧 */
          .chat-input-wrapper{
            padding:12px !important;
            gap:8px !important;
          }
          .nc-prompts-container{
            margin-top:0 !important;
            max-width:none !important;
          }
          .nc-prompt-row{
            padding:12px 4px;
            background:transparent;
            border-radius:0;
            margin-bottom:0;
          }
          /* 每个 prompt 被包了一层 div 用于动画，所以 :last-child 总是匹配。
             改为给非最后一个的"包装层"加底边（向下挂分割线）。 */
          .nc-prompts-container > div > div:not(:last-child){
            border-bottom:0.5px solid var(--line-l07);
          }
          .nc-prompt-text{
            font-size:13px;
            line-height:20px;
            white-space:normal;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
          }
          .nc-cards-section{
            padding:12px 16px 80px !important;
          }
        }
        @media (hover: hover){
          .nc-creator-link:hover{background:var(--b-r05)}
          .nc-creator-link:hover .nc-creator-link-name{color:var(--main-m1);text-decoration:underline;text-underline-offset:2px}
        }
        .more-skills-dropdown{
          position:absolute;
          top:calc(100% + 8px);
          right:0;
          width:320px;
          background:#fff;
          border:0.5px solid var(--line-l2);
          border-radius:8px;
          box-shadow:var(--shadow-s);
          z-index:20;
          animation:newchat-fadeup 160ms ease-out;
          overflow:hidden;
        }
        .more-skills-dropdown-scroll{
          max-height:360px;
          overflow-y:auto;
          padding:6px;
        }
        .more-skill-row{
          display:flex;
          align-items:center;
          gap:10px;
          width:100%;
          padding:8px 12px;
          border:none;
          background:transparent;
          text-align:left;
          cursor:pointer;
          border-radius:8px;
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover{
            background:var(--b-r05);
          }
        }
        .more-skills-backdrop{display:none}
        .more-skills-header{display:none}
        @media (max-width: 639px){
          .more-skills-backdrop{
            display:block;
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.45);
            z-index:9998;
            animation:newchat-fade 200ms ease-out;
          }
          .more-skills-dropdown{
            position:fixed !important;
            z-index:9999 !important;
            top:auto !important;
            right:0 !important;
            left:0 !important;
            bottom:0 !important;
            width:100% !important;
            border-radius:14px 14px 0 0 !important;
            animation:newchat-sheet-up 220ms cubic-bezier(0.2,0.8,0.2,1);
          }
          .more-skills-dropdown::before{
            content:"";
            display:block;
            width:36px;
            height:4px;
            border-radius:2px;
            background:rgba(0,0,0,0.18);
            margin:8px auto 4px;
          }
          .more-skills-header{
            display:flex !important;
            align-items:center;
            justify-content:space-between;
            padding:14px 16px 8px;
          }
          .more-skills-title{
            font-family:'Delight',sans-serif;
            font-size:16px;
            line-height:22px;
            font-weight:500;
            color:var(--text-n9);
            letter-spacing:0.16px;
          }
          .more-skills-close{
            width:24px;
            height:24px;
            border:none;
            background:transparent;
            padding:0;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
          }
          .more-skills-dropdown-scroll{
            max-height:60vh !important;
            padding:4px 12px 32px !important;
            display:flex !important;
            flex-direction:column;
            gap:8px;
          }
          .more-skill-row{
            padding:18px 16px !important;
            background:var(--b-r05) !important;
            border-radius:12px !important;
            gap:14px !important;
          }
          .more-skill-row:active{
            background:var(--b-r07) !important;
          }
          .more-skill-name{
            font-size:15px !important;
            line-height:20px !important;
          }
          .more-skill-author{
            font-size:13px !important;
            line-height:18px !important;
          }
          /* 移动端 sheet 行底色已是灰，icon tile 用白色避免叠灰 */
          .more-skill-icon-wrap{
            background:#fff !important;
          }
        }
        @keyframes newchat-sheet-up{
          from{transform:translateY(100%)}
          to{transform:translateY(0)}
        }
        .more-skill-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .more-skill-name{
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:20px;
          font-weight:400;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-icon-wrap{
          width:32px;
          height:32px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          /* 桌面默认灰底，hover 时变白让 icon 浮起 */
          background:var(--b-r05);
          border:1px solid var(--line-l12);
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover .more-skill-icon-wrap{
            background:#fff;
          }
        }
        /* 圆头像加弱边框，避免在灰底上融掉 */
        .more-skill-row > div[class*="rounded-full"],
        .more-skill-row > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
        }

        /* ══════ Skills library panel (bottom-up, full grid) ══════ */
        .skills-panel-backdrop{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.45);
          z-index:9998;
          animation:newchat-fade 200ms ease-out;
        }
        @keyframes skills-panel-modal-in{
          from{ opacity:0; transform:translate(-50%, -50%) scale(0.96); }
          to{ opacity:1; transform:translate(-50%, -50%) scale(1); }
        }
        .skills-panel{
          position:fixed;
          left:50%;
          top:50%;
          transform:translate(-50%, -50%);
          width:calc(100% - 48px);
          max-width:1200px;
          max-height:min(800px, calc(100vh - 64px));
          background:#fff;
          border-radius:14px;
          box-shadow:0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08);
          z-index:9999;
          display:flex;
          flex-direction:column;
          animation:skills-panel-modal-in 220ms cubic-bezier(0.2,0.8,0.2,1);
          overflow:hidden;
        }
        .skills-panel-header{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:20px 24px 12px;
          flex-shrink:0;
        }
        .skills-panel-title{
          font-family:'Delight',sans-serif;
          font-size:18px;
          line-height:28px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.18px;
        }
        .skills-panel-close{
          width:28px;
          height:28px;
          border:none;
          background:transparent;
          border-radius:6px;
          cursor:pointer;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .skills-panel-close:hover{ background:var(--b-r05); }
        }
        .skills-panel-scroll{
          flex:1;
          overflow-y:auto;
          padding:4px 24px 24px;
        }
        /* 手动分列瀑布流：JS 把卡片 round-robin 分到 N 个独立列容器（flex column）
           每列独立堆叠 → 第一行顶部对齐；某列内 hover 撑高，只影响同列下方卡片，
           其它列不会跟着重排。 */
        .skills-panel-grid{
          display:flex;
          gap:12px;
          align-items:flex-start;
        }
        .skills-panel-col{
          flex:1 1 0;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        @media (max-width: 639px){
          .skills-panel{
            max-height:85vh;
          }
          .skills-panel-scroll{ padding:4px 16px 24px; }
          .skills-panel-header{ padding:16px 16px 8px; }
        }
        .skills-panel-card{
          position:relative;
          display:flex;
          flex-direction:column;
          gap:16px;
          padding:20px;
          text-align:left;
          background:var(--b-r02);
          border:1px solid var(--line-l07);
          border-radius:8px;
          cursor:pointer;
          /* Same easing + duration for hover-in and hover-out across every prop */
          transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     border-color 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     box-shadow 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     padding-bottom 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover{
            background:rgba(255,255,255,0.9);
            border-color:var(--line-l12);
            box-shadow:0 6px 20px rgba(0,0,0,0.04);
            /* 用户行下方边距 = 用户行到分割线的距离（16px）*/
            padding-bottom:16px;
          }
        }
        .skills-panel-card.is-selected{
          background:var(--b-r02);
          border-color:var(--main-m1);
        }
        @media (hover: hover){
          .skills-panel-card.is-selected:hover{
            background:rgba(255,255,255,0.9);
            border-color:var(--main-m1);
            box-shadow:0 6px 20px rgba(0,0,0,0.04);
          }
        }
        /* Hover 展开底部 creator + socials 行。
           所有过渡使用统一的 240ms cubic-bezier(0.4,0,0.2,1)，确保
           hover-in 和 hover-out 节奏一致。 */
        .skills-panel-card-hoverblock{
          display:grid;
          grid-template-rows:0fr;
          opacity:0;
          /* margin-top:-16 抵消 card-level gap:16，使收起态不留间距；
             展开时 grid-template-rows 撑开，gap:16 通过 row-gap 自然出现。 */
          margin-top:-16px;
          transition:grid-template-rows 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     opacity 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     margin-top 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skills-panel-card-hoverblock-inner{
          overflow:hidden;
          min-height:0;
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-hoverblock{
            grid-template-rows:1fr;
            opacity:1;
            margin-top:0;
          }
        }
        @media (hover: none){
          .skills-panel-card-hoverblock{
            grid-template-rows:1fr;
            opacity:1;
            margin-top:0;
          }
        }
        /* KOL 卡片（顶部用 Avatar）：hover 时头像隐藏，标题块滑到左侧。
           Alva 卡片（顶部用 icon-wrap）不参与此动画 —— 图标保留。 */
        .skills-panel-card-creator-thumb{
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
        }
        .skills-panel-card-titleblock{
          transition:transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-creator-thumb{
            visibility:hidden;
          }
          .skills-panel-card:hover .skills-panel-card-creator-thumb + .skills-panel-card-titleblock{
            transform:translateX(-48px);
          }
        }
        .skills-panel-card-divider{
          height:1px;
          background:var(--line-l07);
          margin:0 0 16px;
        }
        .skills-panel-card-creator-row{
          display:flex;
          align-items:center;
          gap:10px;
        }
        .skills-panel-card-creator-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
        }
        .skills-panel-card-creator-caps{
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:14px;
          color:rgba(0,0,0,0.4);
          letter-spacing:0.11px;
        }
        .skills-panel-card-creator-name{
          align-self:flex-start;
          max-width:100%;
          padding:0;
          margin:0;
          background:transparent;
          border:none;
          cursor:pointer;
          text-align:left;
          color:var(--text-n9);
          font:inherit;
        }
        .skills-panel-card-creator-name-text{
          display:inline-block;
          max-width:100%;
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:18px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.13px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          text-decoration:underline dashed transparent;
          text-decoration-thickness:1px;
          text-underline-offset:3px;
          transition:text-decoration-color 160ms ease;
        }
        @media (hover: hover){
          .skills-panel-card-creator-name:hover .skills-panel-card-creator-name-text{
            text-decoration-color:var(--text-n9);
          }
        }
        .skills-panel-card-socials{
          display:flex;
          align-items:center;
          gap:6px;
          flex-shrink:0;
        }
        .skills-panel-card-social{
          width:24px;
          height:24px;
          border-radius:9999px;
          background:var(--b-r05);
          display:inline-flex;
          align-items:center;
          justify-content:center;
          transition:background 120ms ease;
        }
        .skills-panel-card-social:hover{ background:rgba(0,0,0,0.1); }
        .skills-panel-card-content{
          display:flex;
          flex-direction:column;
          gap:4px;
        }
        .skills-panel-card-header{
          display:flex;
          align-items:center;
          gap:12px;
          padding-bottom:4px;
        }
        .skills-panel-card-icon-wrap{
          width:36px;
          height:36px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          background:#fff;
          border:1px solid var(--line-l05);
          transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-icon-wrap{
            background:var(--b-r02);
          }
        }
        .skills-panel-card-titleblock{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
        }
        .skills-panel-card-name{
          font-family:'Delight',sans-serif;
          font-size:18px;
          line-height:28px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.18px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .skills-panel-card-author{
          font-family:'Delight',sans-serif;
          font-size:10px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.1px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .skills-panel-card-desc{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:20px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          margin:0;
        }
        .skills-panel-card-tags{
          display:flex;
          flex-wrap:wrap;
          gap:4px;
          padding-top:4px;
        }
        .skills-panel-card-tag{
          height:22px;
          padding:0 6px;
          border-radius:4px;
          background:var(--b-r05);
          color:var(--text-n5);
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:20px;
          letter-spacing:0.12px;
          white-space:nowrap;
          display:inline-flex;
          align-items:center;
        }

      `}),e.jsxs("div",{className:"h-screen overflow-y-auto relative",style:{backgroundColor:"var(--b0-container, #ffffff)"},children:[e.jsx("div",{className:"flex items-center gap-[16px] h-[56px] px-[28px] shrink-0 newchat-page-topbar",style:{position:"sticky",top:0,zIndex:5,background:"var(--b0-container, #ffffff)"},children:e.jsx("div",{className:"flex-1 min-w-0",children:e.jsx(Oe,{activeId:"new",onSelect:Me,trigger:e.jsxs("div",{className:"flex gap-[4px] items-center min-w-0 cursor-pointer",children:[e.jsx("p",{className:"font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate",children:"New Chat"}),e.jsx(z,{name:"arrow-down-f2",size:14,color:"var(--text-n2)"})]})})})}),e.jsxs("section",{className:"nc-hero-section",style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",gap:36,padding:"24px 28px",position:"relative",zIndex:2},children:[e.jsx(kt,{selected:b,maxWidth:H}),e.jsx("div",{className:"nc-chatbox-wrap",style:{width:"100%",maxWidth:H,position:"relative",zIndex:1},children:e.jsx(We,{shadow:!0,hideSkill:!0,hideInspector:!0,allowReferences:!1,bottomChip:b?{label:b.label,icon:b.kol?void 0:b.icon??tt,avatar:b.kol?b.creator:void 0,creator:b.creator,onRemove:Ne,onHover:t=>le(b.id,t),onLeave:G}:null,injectText:p,onInputChange:y})}),U&&e.jsx("div",{className:"nc-prompts-container",style:{width:"100%",maxWidth:H,position:"relative",zIndex:1,marginTop:-16,display:"flex",flexDirection:"column"},children:de.map((t,l)=>e.jsx("div",{style:{animation:"newchat-fadeup 320ms ease-out both",animationDelay:`${l*110}ms`},children:e.jsx(ge,{text:t,onClick:()=>ce(t)})},l))},v),!U&&e.jsxs("div",{ref:T,style:{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",paddingTop:12,position:"relative",zIndex:1,width:"100%",maxWidth:900},children:[B.map(t=>{var k;const l=i===t.id;return e.jsxs("button",{"data-skill-id":t.id,className:"nc-pill",onClick:()=>ze(t.id),onMouseEnter:w=>{S()&&(w.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",w.currentTarget.style.transform="translateY(-2px)",Te(t.id,w.currentTarget,w.clientX,w.clientY))},onMouseLeave:w=>{S()&&(w.currentTarget.style.boxShadow="none",w.currentTarget.style.transform="translateY(0)",Y(),G())},style:{...N,background:l?"rgba(0,0,0,0.7)":"white",color:l?"rgba(255,255,255,0.9)":N.color,borderColor:l?"rgba(0,0,0,0.7)":((k=N.border)==null?void 0:k.replace("0.5px solid ",""))??void 0},children:[t.kol?e.jsx(M,{name:t.creator,size:22}):t.icon&&e.jsx(z,{name:t.icon,size:18,color:l?"#fff":"var(--text-n9)"}),t.label]},t.id)}),e.jsx("div",{ref:je,"data-more-wrap":!0,style:{position:"relative"},children:e.jsxs("button",{ref:Ie,type:"button",className:"nc-pill","aria-expanded":u,"aria-label":"More skills",style:{...N,cursor:"pointer",background:u?"#f3f8f8":"white",border:u?"0.5px solid rgba(73,163,166,0.45)":N.border},onMouseEnter:t=>{S()&&(t.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",t.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:t=>{S()&&(t.currentTarget.style.boxShadow="none",t.currentTarget.style.transform="translateY(0)")},onClick:()=>{d(t=>!t),f(null)},children:["More",e.jsx(z,{name:"arrow-right-l2",size:14,color:"var(--text-n5)"})]})})]}),b&&e.jsx("div",{className:"nc-prompts-container",style:{width:"100%",maxWidth:H,position:"relative",zIndex:1,marginTop:0,display:"flex",flexDirection:"column"},children:Ce?e.jsx("div",{className:"nc-prompts-list",style:{animation:"newchat-fade 280ms ease-out"},children:b.prompts.slice(0,3).map((t,l)=>e.jsx(ge,{text:t,index:l,onClick:()=>ce(t)},l))}):e.jsxs("div",{className:"nc-prompts-list nc-skeleton-anim",style:{animation:"newchat-fade 200ms ease-out"},children:[e.jsx(te,{widthPct:92}),e.jsx(te,{widthPct:70}),e.jsx(te,{widthPct:82})]})}),b&&e.jsx("div",{style:{width:"100%",maxWidth:H,position:"relative",zIndex:2},children:Ee?b.recCards?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,animation:"newchat-fade 320ms ease-out"},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",gap:16},children:b.recCards.flatMap(t=>t.type==="playbook"?[t.playbook]:[]).slice(0,3).map((t,l)=>e.jsx("div",{style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${l*50}ms`},children:e.jsx(ye,{p:t,skillId:b.id,onClick:()=>{sessionStorage.setItem("autoOpenChatPanel","1"),n("new-chat")}})},t.id))}),(()=>{const t=b.recCards.flatMap(l=>l.type==="push"?[l.push]:[]).slice(0,2);return t.length===0?null:e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${t.length}, minmax(0, 1fr))`,gap:16,gridAutoRows:281.5},children:t.map((l,k)=>e.jsx("div",{style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${(k+3)*50}ms`},children:e.jsx("div",{onClick:()=>g(l),style:{height:"100%",cursor:"pointer"},children:e.jsx($e,{a:l})})},l.id))})})()]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:16,animation:"newchat-fade 320ms ease-out"},children:b.playbooks.slice(0,6).map((t,l)=>e.jsx("div",{style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${l*50}ms`},children:e.jsx(ye,{p:t,skillId:b.id,onClick:()=>{sessionStorage.setItem("autoOpenChatPanel","1"),n("new-chat")}})},t.id))}):e.jsx("div",{className:"nc-skeleton-anim",style:{display:"grid",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",gap:16,animation:"newchat-fade 200ms ease-out"},children:Array.from({length:3}).map((t,l)=>e.jsx(yt,{},l))})},b.id)]}),!U&&e.jsx(Tt,{onNavigate:n})]}),c&&pe&&e.jsx(st,{template:pe,anchor:c.rect,placeAbove:c.placeAbove,side:c.side,onMouseEnter:_,onMouseLeave:G}),F&&e.jsxs("div",{"aria-hidden":!0,style:{position:"fixed",left:F.x+14,top:F.y+14,width:16,height:16,pointerEvents:"none",zIndex:9999},children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",style:{display:"block"},children:[e.jsx("circle",{cx:"8",cy:"8",r:"6",fill:"none",stroke:"rgba(0,0,0,0.12)",strokeWidth:"1.6"}),e.jsx("circle",{cx:"8",cy:"8",r:"6",fill:"none",stroke:"var(--main-m1)",strokeWidth:"1.6",strokeLinecap:"round",strokeDasharray:2*Math.PI*6,strokeDashoffset:2*Math.PI*6,transform:"rotate(-90 8 8)",style:{animation:`nc-pill-ring-fill ${oe}ms linear forwards`}})]}),e.jsx("style",{children:`
            @keyframes nc-pill-ring-fill {
              from { stroke-dashoffset: ${2*Math.PI*6}; }
              to   { stroke-dashoffset: 0; }
            }
          `})]}),u&&e.jsx(bt,{skills:B,selectedId:i,onSelect:De,onClose:()=>d(!1)}),m&&(()=>{const t=B.find(l=>l.id===m);return t?e.jsx(St,{template:t,onClose:()=>j(null),onSelect:Ae}):null})(),e.jsx(Ye,{open:!!r,onClose:()=>g(null),feedName:(r==null?void 0:r.feedName)??"",alerts:r?[r]:void 0,description:"This automation runs on a fixed schedule and publishes new results to its subscribers. Each run pulls the latest data, applies the feed's logic, and writes a signal that powers the cards and alerts above. Open Settings → Automations to view full run logs and manage it."})]})}export{Lt as SkillPill,Ht as default};
