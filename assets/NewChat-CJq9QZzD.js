import{r as o,j as e}from"./index-CCoiRZ-O.js";import{A as Ae,T as Me,C as $,a as ze,b as A,r as Te}from"./AppShell-nHgvWq8V.js";import{P as le,O as de,C as ce}from"./new-chat-mock-aRWl0qc6.js";import{P as Ne}from"./PlaybookCover-KFFO-mxI.js";import"./referral-mock-GU6U48Lj.js";const We=[{keys:["btc","bitcoin"],prompts:["Track BTC momentum and alert me on 1h breakouts above 3% gains","Build a BTC DCA playbook with weekly rebalancing and a 20% max drawdown stop","Correlate BTC with NASDAQ tech names and flag regime shifts in real time"]},{keys:["eth","ethereum"],prompts:["Set up an ETH staking-yield tracker with alerts on gas-fee spikes","Build an ETH/BTC ratio rotation playbook with RSI confirmation","Monitor ETH Layer-2 TVL shifts and flag capital rotation signals"]},{keys:["sol","solana"],prompts:["Track SOL DEX volume vs ETH and surface dApp rotation signals","Build a SOL/ETH pair-trade triggered by volume divergence","Monitor SOL validator health and alert on decentralization risk"]},{keys:["nvda","nvidia"],prompts:["Deep-dive NVDA — revenue segmentation, peer valuation, and supply-chain exposure","Build an NVDA earnings run-up playbook with an options overlay","Track NVDA vs AMD/AVGO relative strength with daily alerts"]},{keys:["tsla","tesla"],prompts:["Track TSLA delivery numbers vs consensus and alert on misses","Build a TSLA vs BYD pair-trade with weekly rebalancing","Correlate TSLA price with China EV sentiment and surface leading indicators"]},{keys:["ai","artificial intelligence"],prompts:["Surface the top 5 AI infrastructure plays by 90-day momentum","Build an AI-sector rotation basket rebalanced monthly","Compare AI beneficiaries vs software incumbents and flag divergences"]},{keys:["macro","fed","cpi","rates"],prompts:["Daily macro brief — US rates, DXY, oil, credit spreads with LLM commentary","Build a recession-risk dashboard with 5 leading indicators","Set up Fed-cut scenario alerts when CPI surprises move odds >5%"]},{keys:["earnings"],prompts:["Build an earnings whisper tracker for the next 2 weeks","Post-earnings drift playbook — long beaters, short missers on a 3-day hold","Compare implied vs realized moves across MAG7 earnings"]},{keys:["options","iv"],prompts:["Scan for unusual options volume in mega-cap tech and alert on sweeps","Build an IV-crush playbook for post-earnings plays","Track 0DTE flow on SPX and surface directional bias shifts"]},{keys:["dividend","income"],prompts:["Build a dividend-growth screen with 10+ years of growth and sub-60% payout ratio","Track dividend ex-dates across my watchlist and alert 5 days ahead","Compare dividend-yield baskets vs treasury yield and flag regime shifts"]},{keys:["what is","what's"],prompts:["What is the implied-volatility curve telling us about NVDA this week?","What is the best way to hedge a long BTC position right now?","What is the Sharpe ratio of my current portfolio over 90 days?"]},{keys:["how to","how do i","how do"],prompts:["How to build a momentum playbook with drawdown caps","How to hedge my equity portfolio against a Fed surprise","How to spot unusual options flow in real time"]},{keys:["find","show me","show"],prompts:["Find playbooks with >20% annualized return and <10% drawdown","Show me undervalued tech names with rising earnings estimates","Find the top yield opportunities in stablecoins right now"]},{keys:["compare","vs","versus"],prompts:["Compare NVDA and AMD across growth, margins, and valuation","Compare my portfolio vs the S&P 500 over the last 90 days","Compare BTC and ETH risk-adjusted returns year-to-date"]},{keys:["why"],prompts:["Why is BTC underperforming NASDAQ this month?","Why are semis volatile heading into earnings?","Why did my portfolio drop on Friday's close?"]},{keys:["summarize","summary","tl;dr"],prompts:["Summarize this week's Fed speakers and market reactions","Summarize my recent trades and flag any discipline slips","Summarize the latest AI-sector earnings ranked by relevance"]},{keys:["explain"],prompts:["Explain what's driving the 10-year yield higher today","Explain the divergence between SPX and credit spreads","Explain the risk profile of my current top holding"]}],He=2;function Oe(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Pe(n,r){const i=`\\b${Oe(r).replace(/\s+/g,"\\s+")}\\b`;return new RegExp(i,"i").test(n)}function Be(n){const r=n.trim();if(r.length<He)return[];if(r.length>60)return[];if(r.split(/\s+/).length>5)return[];for(const i of We)if(i.keys.some(c=>Pe(r,c)))return i.prompts;return[]}const Fe="researcher-l1";function C(){return typeof window>"u"||typeof window.matchMedia!="function"?!0:window.matchMedia("(hover: hover)").matches}const _e={"theme-tracker":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"smart-screener":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},backtest:{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"crypto-pulse":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"yield-hunter":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"dividend-diary":{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},"what-if":{bg:"var(--main-m2-10)",fg:"var(--main-m2)"},"deep-dive":{bg:"var(--main-m2-10)",fg:"var(--main-m2)"},valuation:{bg:"var(--main-m5-10)",fg:"var(--main-m5)"},"daily-macro-brief":{bg:"var(--main-m5-10)",fg:"var(--main-m5)"},"earnings-edge":{bg:"var(--main-m5-10)",fg:"var(--main-m5)"}},$e=n=>_e[n]??{bg:"var(--main-m1-10)",fg:"var(--main-m1)"},pe={display:"flex",alignItems:"center",gap:8,height:40,padding:"0 16px",borderRadius:999,border:"0.5px solid var(--line-l12)",fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"22px",fontWeight:500,color:"var(--text-n7)",whiteSpace:"nowrap",cursor:"pointer",letterSpacing:.14,userSelect:"none",background:"white",transition:"box-shadow 160ms ease, transform 160ms ease"};function fe(n){let r=2166136261;for(let i=0;i<n.length;i++)r^=n.charCodeAt(i),r=Math.imul(r,16777619);return r>>>0}function ue(n){const i=fe(n)%7200;return i<1?"just now":i<60?`${i}m ago`:i<1440?`${Math.floor(i/60)}h ago`:`${Math.floor(i/1440)}d ago`}const ve=["Filings","Insider Cluster","Event Drift","Earnings Drift","Whisper Numbers","Macro Flow","FX Cross","Rates Curve","Credit Spread","Sentiment","Theme Tracker","Catalyst","Risk Off","Backtest","Yield Curve","Dividend","On-Chain","ETF Flow","MAG7","AI Capex","Hyperscaler","Volatility","Carry","Drawdown","Sharpe","Quintile","Read-Across","Sector Rotation","Pair Trade","Theme"];function xe(n){const i=(fe(n)>>>12)%2+2,c=new Set,a=[];for(let s=0;a.length<i&&s<32;s++){const p=fe(`${n}|tag|${s}`)%ve.length;c.has(p)||(c.add(p),a.push(ve[p]))}return a}const we=n=>()=>e.jsx("img",{src:`/${n}`,alt:"",width:14,height:14,style:{width:14,height:14,display:"block"}}),Ye=()=>()=>e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),Xe=()=>()=>e.jsx("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})}),ke={discord:{key:"discord",label:"Discord",href:"https://discord.com",render:we("logo-social-discord.svg")},telegram:{key:"telegram",label:"Telegram",href:"https://telegram.org",render:we("logo-telegram.svg")},x:{key:"x",label:"X",href:"https://x.com",render:Ye()},instagram:{key:"instagram",label:"Instagram",href:"https://instagram.com",render:Xe()}},Ge=["discord","telegram","x"],Ve=["x","telegram","discord","instagram"];function ge(n){if(n==="Alva")return Ge.map(s=>ke[s]);let r=2166136261;for(let s=0;s<n.length;s++)r^=n.charCodeAt(s),r=Math.imul(r,16777619)>>>0;const i=s=>{let x=r;for(let p=0;p<s.length;p++)x^=s.charCodeAt(p),x=Math.imul(x,16777619)>>>0;return x},c=r%2+1;return[...Ve].sort((s,x)=>i(s)-i(x)).slice(0,c).map(s=>ke[s])}function Ke({template:n,anchor:r,placeAbove:i,side:c="auto",onMouseEnter:a,onMouseLeave:s}){const w=o.useRef(null),[g,y]=o.useState(220);o.useLayoutEffect(()=>{w.current&&y(w.current.offsetHeight)},[n.id]);const b=n.tags??xe(n.id);let m,f;return c==="left"?(m=r.left-360-10,typeof window<"u"&&(m=Math.max(12,m)),f=r.top+r.height/2-g/2,typeof window<"u"&&(f=Math.max(12,Math.min(f,window.innerHeight-g-12)))):(m=r.left+r.width/2-360/2,typeof window<"u"&&(m=Math.max(12,Math.min(m,window.innerWidth-360-12))),f=i?r.top-g-10:r.bottom+10),e.jsxs("div",{ref:w,onMouseEnter:a,onMouseLeave:s,style:{position:"fixed",top:f,left:m,width:360,zIndex:50,background:"#ffffff",borderRadius:8,border:"0.5px solid var(--line-l2)",boxShadow:"var(--shadow-s)",padding:20,pointerEvents:"auto",animation:"newchat-fadeup 160ms ease-out"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("h2",{style:{fontFamily:"'Delight', sans-serif",fontSize:18,lineHeight:"24px",fontWeight:400,color:"var(--text-n9)",letterSpacing:.18,margin:0},children:n.label}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"16px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:400},children:ue(n.id)})]}),e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:13,lineHeight:"20px",color:"var(--text-n7)",letterSpacing:.13,margin:"10px 0 0"},children:n.description}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:10},children:b.slice(0,3).map(u=>e.jsx("span",{style:{height:20,padding:"0 6px",borderRadius:5,background:"var(--b-r05)",color:"var(--text-n5)",fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"20px",letterSpacing:.11,whiteSpace:"nowrap"},children:u},u))}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"20px 0"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("button",{type:"button",className:"nc-creator-link",onClick:u=>u.stopPropagation(),style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:10,padding:"4px 6px",margin:"-4px -6px",border:"none",background:"transparent",cursor:"pointer",borderRadius:6,transition:"background 140ms ease",textAlign:"left"},children:[e.jsx(A,{name:n.creator,size:36}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"14px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:400},children:"Created by"}),e.jsx("div",{className:"nc-creator-link-name",style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"20px",color:"var(--text-n9)",letterSpacing:.14,fontWeight:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",transition:"color 140ms ease"},children:n.creator})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:4,flexShrink:0},children:ge(n.creator).map(u=>e.jsx("a",{href:u.href,target:"_blank",rel:"noreferrer noopener","aria-label":u.label,style:{width:24,height:24,borderRadius:"9999px",background:"var(--b-r05)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background 120ms ease, transform 120ms ease"},onMouseEnter:h=>{C()&&(h.currentTarget.style.background="var(--b-r1)",h.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:h=>{C()&&(h.currentTarget.style.background="var(--b-r05)",h.currentTarget.style.transform="translateY(0)")},children:u.render()},u.key))})]})]})}function Se({text:n,onClick:r}){return e.jsxs("button",{className:"nc-prompt-row",onClick:r,onMouseEnter:i=>{C()&&(i.currentTarget.style.background="var(--b-r03)",i.currentTarget.style.transform="translateY(-1px)")},onMouseLeave:i=>{C()&&(i.currentTarget.style.background="transparent",i.currentTarget.style.transform="translateY(0)")},children:[e.jsx("span",{className:"nc-prompt-text",children:n}),e.jsx($,{name:"enter-l",size:20,color:"rgba(0,0,0,0.4)"})]})}function he({widthPct:n}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"12px",borderRadius:8},children:[e.jsx("div",{style:{flex:1,height:14,background:"var(--b-r07)",borderRadius:4,maxWidth:`${n}%`}}),e.jsx("div",{style:{width:20,height:20,background:"var(--b-r05)",borderRadius:4}})]})}const Ue=new Set(["BTC","ETH","SOL","PEPE","ARB","OP","AVAX","BNB","USDT","USDC","XRP","DOGE"]),Qe=new Set(["SPX","SPY","QQQ","R2K","IWM","AGG","TLT","VIX","EFA","EEM","DXY","CL","HYG","LQD","GLD","GDX","NOBL","FXI","KWEB","2330.TW"]),qe={BTC:"#F7931A",ETH:"#627EEA",SOL:"#14F195",PEPE:"#3FAA3D",SPX:"#94A3B8",SPY:"#94A3B8",QQQ:"#94A3B8",GLD:"#E6A91A",GDX:"#E6A91A",TLT:"#627EEA",VIX:"#EF4444",AGG:"#94A3B8",IWM:"#94A3B8"};function Je({ticker:n}){const[r,i]=o.useState(!1);let c=null;if(!r&&!Qe.has(n)&&(Ue.has(n)?c=`https://assets.coincap.io/assets/icons/${n.toLowerCase()}@2x.png`:c=`https://financialmodelingprep.com/image-stock/${n}.png`),c)return e.jsx("img",{src:c,alt:n,width:12,height:12,style:{borderRadius:"50%",objectFit:"cover",flexShrink:0,background:"#fff"},onError:()=>i(!0)});const a=qe[n]||"#94A3B8";return e.jsx("span",{style:{width:12,height:12,borderRadius:"50%",background:a,flexShrink:0,display:"inline-block"}})}const Ze={"theme-tracker":"thesis","smart-screener":"screener","deep-dive":"thesis","daily-macro-brief":"general","earnings-edge":"thesis","crypto-pulse":"general","what-if":"what-if","yield-hunter":"screener","dividend-diary":"screener",backtest:"what-if",valuation:"thesis"},et={"theme-tracker":"trend_up","smart-screener":"momentum","deep-dive":"ai","daily-macro-brief":"macro","earnings-edge":"earnings","crypto-pulse":"crypto","what-if":"event_study","yield-hunter":"dividend","dividend-diary":"dividend",backtest:"event_study",valuation:"value"},tt=["S&P LARGE CAP","RUSSELL 2000","NASDAQ 100","MSCI EMG","STOXX 600","TOPIX 500"],nt=["1H","6H","1D","1W"],it=["Late long-term debt cycle · risk-off bias","AI capex peak forming into Q3","Basket −2.1% vs SMH +0.6% YTD","Hyperscaler PPA flows feed power demand","Dollar regime shift, EM tailwind","Curve re-steepening as growth softens"],rt=["Historically Drops","Historically Rises","Range-Bound","Outperforms Peers","Trails Benchmark"],at=["CONTEXT FEED · daily","WATCHLIST · 2026","BRIEF · daily","PULSE · live","ALERTS · LIVE · 30S"],st=["2h ago","38 holdings","1.2M views","live","12 alerts","07:30 ET"],ot=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],lt=["RISK","CATALYST","AMBIGUOUS"];function dt(n){let r=2166136261;for(let i=0;i<n.length;i++)r^=n.charCodeAt(i),r=Math.imul(r,16777619);return r>>>0}function ct(n,r){const i=Ze[r]??"general",c=et[r],a=dt(`${n.id}|${n.title}`),s=(y,b)=>y[(a>>>b)%y.length],x=n.tickers??[],p={template:i,title:n.title,author:n.creator,tickers:x,domain:c};if(i==="screener")return{...p,series:`SCORED · ${s(tt,0)} · ${s(nt,6)}`};if(i==="thesis"){const y=s(ot,0),b=(a>>>4)%28+1;return{...p,anchor:`${y} ${b}`,category:s(lt,8),kind:s(it,12)}}if(i==="what-if"){const y=(a>>>0&1)===1,b=((a>>>2)%45+5)/10,m=(a>>>8)%9+2,f=Array.from({length:5}).map((u,h)=>{const k=(a>>>h*3&255)/255*2-1;return Math.round((k*(y?1:-1)*4+(y?.6:-.6))*10)/10});return{...p,series:`30D AFTER · ${m}×`,kind:s(rt,16),anchor:`${y?"+":"−"}${b.toFixed(1)}%`,whatIfBars:f}}const w=(a>>>0)%70+10,g=((a>>>4)%200+50)/10;return{...p,kind:s(at,0),anchor:s(st,8),series:`${w} PIECES · ${g.toFixed(1)}K VIEWS`}}function pt({p:n,skillLabel:r,skillIcon:i,skillKol:c,skillCreator:a,skillId:s,onClick:x}){const p=(n.tickers??[]).slice(0,2),w=$e(s),g=c?"rgba(0,0,0,0.05)":w.bg,y=c?"rgba(0,0,0,0.9)":w.fg;return e.jsxs("div",{onClick:x,className:"cursor-pointer",style:{background:"#ffffff",border:"0.5px solid var(--line-l3)",borderRadius:12,padding:4,display:"flex",flexDirection:"column",overflow:"hidden",width:"100%",transition:"box-shadow 180ms ease, transform 180ms ease"},onMouseEnter:b=>{C()&&(b.currentTarget.style.boxShadow="0 8px 22px rgba(0,0,0,0.06)",b.currentTarget.style.transform="translateY(-2px)")},onMouseLeave:b=>{C()&&(b.currentTarget.style.boxShadow="none",b.currentTarget.style.transform="translateY(0)")},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"320 / 140",borderRadius:4,overflow:"hidden",flexShrink:0},children:e.jsx(Ne,{input:ct(n,s)})}),e.jsxs("div",{style:{padding:"16px 12px 12px",display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,overflow:"hidden"},children:[e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:4,height:20,padding:"2px 6px",borderRadius:4,background:g,color:y,fontFamily:"'Delight', sans-serif",fontSize:12,lineHeight:"20px",letterSpacing:.12,fontWeight:400,whiteSpace:"nowrap",flexShrink:0},children:[c&&a?e.jsx(A,{name:a,size:12}):i&&e.jsx($,{name:i,size:12,color:y}),r]}),p.map(b=>e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:4,height:20,padding:"2px 8px",borderRadius:4,background:"var(--b-r05)",color:"var(--text-n7)",fontFamily:"'Delight', sans-serif",fontSize:12,lineHeight:"20px",letterSpacing:.12,fontWeight:400,whiteSpace:"nowrap",flexShrink:0},children:[e.jsx(Je,{ticker:b}),b]},b))]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("p",{style:{fontSize:16,lineHeight:"26px",fontWeight:400,color:"var(--text-n9)",letterSpacing:.16,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",margin:0,height:28},children:n.title}),e.jsx("p",{style:{fontSize:12,lineHeight:"20px",color:"var(--text-n5)",letterSpacing:.12,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",margin:0,height:44},children:n.desc})]})]})]})}function ht(){return e.jsxs("div",{style:{background:"#ffffff",border:"0.5px solid var(--line-l12)",borderRadius:8,padding:4,display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx("div",{style:{width:"100%",aspectRatio:"472 / 265.5",borderRadius:4,background:"var(--b-r05)"}}),e.jsxs("div",{style:{padding:"16px 12px 12px",display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("div",{style:{width:70,height:20,background:"var(--b-r07)",borderRadius:4}}),e.jsx("div",{style:{width:40,height:20,background:"var(--b-r05)",borderRadius:4}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[e.jsx("div",{style:{height:18,background:"var(--b-r07)",borderRadius:4,maxWidth:"60%"}}),e.jsx("div",{style:{height:12,background:"var(--b-r05)",borderRadius:4}}),e.jsx("div",{style:{height:12,background:"var(--b-r05)",borderRadius:4,maxWidth:"80%"}})]})]})]})}function mt({skills:n,onSelect:r,onMouseEnter:i,onMouseLeave:c,onRowHover:a,onRowLeave:s,onBackdrop:x}){const p=typeof window<"u"&&window.innerWidth<640,w=e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"more-skills-backdrop",onClick:x}),e.jsxs("div",{className:"more-skills-dropdown",role:"menu",onMouseEnter:p?void 0:i,onMouseLeave:p?void 0:c,children:[e.jsxs("div",{className:"more-skills-header",children:[e.jsx("span",{className:"more-skills-title",children:"More skills"}),e.jsx("button",{type:"button","aria-label":"Close",onClick:x,className:"more-skills-close",children:e.jsx($,{name:"close-l1",size:16,color:"var(--text-n7)"})})]}),e.jsx("div",{className:"more-skills-dropdown-scroll",children:n.map(g=>e.jsxs("button",{type:"button",role:"menuitem",className:"more-skill-row",onClick:()=>r(g.id),onMouseEnter:p?void 0:y=>a==null?void 0:a(g.id,y.currentTarget.getBoundingClientRect()),onMouseLeave:p?void 0:()=>s==null?void 0:s(),children:[e.jsx(A,{name:g.creator,size:32}),e.jsxs("span",{className:"more-skill-text",children:[e.jsx("span",{className:"more-skill-name",children:g.label}),e.jsx("span",{className:"more-skill-author",children:g.creator})]})]},g.id))})]})]});return p&&typeof document<"u"?Te.createPortal(w,document.body):w}const ft=45,ut=28,je=1.2,me=640;function xt({selected:n,maxWidth:r}){const[i,c]=o.useState(()=>typeof window<"u"?window.innerWidth<me:!1);o.useEffect(()=>{const k=()=>c(window.innerWidth<me);return k(),window.addEventListener("resize",k),()=>window.removeEventListener("resize",k)},[]);const a=i?ut:ft,x=Math.ceil(a*je)*2,p=o.useRef(null),w=o.useRef(null),g=o.useRef(null),[y,b]=o.useState(1),[m,f]=o.useState(null),u=n?`Build your ${n.label}`:"Pick a skill and start building",h=!!(n!=null&&n.kol);return o.useLayoutEffect(()=>{const k=p.current,I=w.current;if(!k||!I)return;const M=()=>{var B;const O=k.clientWidth,P=g.current,D=h&&P?P.scrollWidth:0,Y=window.innerWidth<me,J=!Y&&h&&P?Math.max(220,O-D):O;I.style.maxWidth=`${J}px`;const L=I.scrollHeight,Z=L>x?x/L:1;if(b(Z),h&&P){const F=P.offsetHeight||32;if(Y)f({top:-F-6,left:Math.max(0,O-D)});else{const R=document.createRange();R.selectNodeContents(I);const V=R.getClientRects();(B=R.detach)==null||B.call(R);const ee=k.getBoundingClientRect(),z=V.length>0?V[0]:null,ne=z?z.top-ee.top:0,K=(z?z.right-ee.left:0)+8,N=K+D>O?Math.max(0,O-D):K,re=ne+4-F;f({top:re,left:N})}}else f(null)};M();const G=new ResizeObserver(M);return G.observe(k),g.current&&G.observe(g.current),()=>G.disconnect()},[u,h]),e.jsxs("div",{ref:p,style:{position:"relative",width:"100%",maxWidth:r,height:x,display:"flex",alignItems:"center",justifyContent:"center",overflow:"visible"},children:[e.jsx("h1",{ref:w,style:{fontSize:a,lineHeight:je,fontWeight:400,color:"var(--text-n9)",textAlign:"center",letterSpacing:.45,margin:0,animation:"newchat-fadeup 240ms ease-out",transform:`scale(${y})`,transformOrigin:"center"},children:u},(n==null?void 0:n.id)??"default"),h&&n&&e.jsxs("div",{ref:g,style:{position:"absolute",top:m?m.top:0,left:m?m.left:0,visibility:m?"visible":"hidden",transformOrigin:"left center",animation:"newchat-bubble-pop 380ms cubic-bezier(0.34, 1.56, 0.64, 1) 700ms backwards",display:"flex",alignItems:"center",gap:6,height:32,padding:"0 12px 0 4px",background:"white",borderRadius:999,border:"0.5px solid var(--line-l07)",boxShadow:"0 6px 20px rgba(0,0,0,0.08)",whiteSpace:"nowrap"},children:[e.jsx(A,{name:n.creator,size:24}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"22px",fontWeight:500,color:"var(--text-n9)",letterSpacing:.14},children:n.creator})]},`bubble-${n.id}`)]})}function gt({template:n,onClose:r,onSelect:i}){const c=n.tags??xe(n.id);return typeof document>"u"?null:Te.createPortal(e.jsx("div",{onClick:r,style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"newchat-fade 160ms ease-out"},children:e.jsxs("div",{onClick:a=>a.stopPropagation(),style:{width:"100%",maxWidth:360,background:"#ffffff",borderRadius:14,padding:20,boxShadow:"0 20px 48px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.08)",animation:"newchat-fadeup 220ms ease-out"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx("h2",{style:{fontFamily:"'Delight', sans-serif",fontSize:18,lineHeight:"24px",fontWeight:600,color:"var(--text-n9)",letterSpacing:.18,margin:0},children:n.label}),e.jsx("span",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"16px",color:"rgba(0,0,0,0.4)",letterSpacing:.11,fontWeight:500},children:ue(n.id)})]}),e.jsx("p",{style:{fontFamily:"'Delight', sans-serif",fontSize:13,lineHeight:"20px",color:"var(--text-n7)",letterSpacing:.13,margin:"10px 0 0"},children:n.description}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginTop:10},children:c.slice(0,3).map(a=>e.jsx("span",{style:{height:20,padding:"0 6px",borderRadius:5,background:"var(--b-r05)",color:"var(--text-n5)",fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"20px",letterSpacing:.11,whiteSpace:"nowrap"},children:a},a))}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"20px 0 12px"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("div",{style:{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:10},children:[e.jsx(A,{name:n.creator,size:36}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:11,lineHeight:"14px",color:"var(--text-n5)",letterSpacing:.11,fontWeight:500},children:"Created by"}),e.jsx("div",{style:{fontFamily:"'Delight', sans-serif",fontSize:14,lineHeight:"20px",color:"var(--text-n9)",letterSpacing:.14,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:n.creator})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:6,flexShrink:0},children:ge(n.creator).map(a=>e.jsx("a",{href:a.href,target:"_blank",rel:"noreferrer noopener","aria-label":a.label,style:{width:24,height:24,borderRadius:"9999px",background:"var(--b-r05)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:a.render()},a.key))})]}),e.jsx("div",{style:{height:1,background:"var(--line-l07)",margin:"12px 0 20px"}}),e.jsx("button",{type:"button",onClick:i,style:{width:"100%",height:44,border:"none",borderRadius:10,background:"var(--main-m1)",color:"#fff",fontFamily:"'Delight', sans-serif",fontSize:14,fontWeight:500,letterSpacing:.14,cursor:"pointer"},children:"Pick this skill"})]})}),document.body)}const X=960;function jt({onNavigate:n,onOpenSearch:r,variant:i="default"}){const c=i==="opt2",[a,s]=o.useState(null),[x,p]=o.useState(null),[w,g]=o.useState(""),[y,b]=o.useState(""),[m,f]=o.useState(null),[u,h]=o.useState(!1),[k,I]=o.useState(null);o.useEffect(()=>{if(typeof document>"u")return;const t=!!k||u;return document.body.classList.toggle("nc-overlay-open",t),()=>{document.body.classList.remove("nc-overlay-open")}},[k,u]);const[M,G]=o.useState(()=>typeof window<"u"?window.innerWidth<640:!1);o.useEffect(()=>{const t=()=>G(window.innerWidth<640);return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const[O,P]=o.useState(()=>typeof window>"u"?3:window.innerWidth<640?1:window.innerWidth<1024?2:3);o.useEffect(()=>{const t=()=>{const l=window.innerWidth;P(l<640?1:l<1024?2:3)};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const D=o.useRef(null),Y=()=>{D.current!==null&&(window.clearTimeout(D.current),D.current=null)},J=()=>{Y(),D.current=window.setTimeout(()=>h(!1),180)},L=o.useRef(null),Z=o.useRef(null),B=o.useRef(null),F=()=>{B.current!==null&&(window.clearTimeout(B.current),B.current=null)},R=()=>{F(),B.current=window.setTimeout(()=>f(null),160)},V=(t,l,T="auto")=>{if(T==="left"){F(),f({id:t,rect:l,placeAbove:!1,side:"left"});return}let j=!1;L.current&&L.current.querySelectorAll('button, [role="button"]').forEach(E=>{E.getBoundingClientRect().top>l.bottom-1&&(j=!0)}),F(),f({id:t,rect:l,placeAbove:j,side:"auto"})},[ee,z]=o.useState(!1),[ne,te]=o.useState(!1);o.useEffect(()=>{const t=setTimeout(()=>b(w),700);return()=>clearTimeout(t)},[w]),o.useEffect(()=>{if(!u)return;const t=T=>{var E,_,S;const j=T.target;if((E=Z.current)!=null&&E.contains(j))return;const d=j;(_=d==null?void 0:d.closest)!=null&&_.call(d,".more-skills-dropdown")||(S=d==null?void 0:d.closest)!=null&&S.call(d,".more-skills-backdrop")||h(!1)},l=T=>{T.key==="Escape"&&h(!1)};return document.addEventListener("mousedown",t),document.addEventListener("keydown",l),()=>{document.removeEventListener("mousedown",t),document.removeEventListener("keydown",l)}},[u]),o.useEffect(()=>{if(!a){z(!1),te(!1);return}z(!1),te(!1);const t=setTimeout(()=>z(!0),900),l=setTimeout(()=>te(!0),1500);return()=>{clearTimeout(t),clearTimeout(l)}},[a]);const ie=o.useMemo(()=>Be(y),[y]),K=!a&&ie.length>0,v=o.useMemo(()=>a&&(le.find(t=>t.id===a)||de.find(t=>t.id===a)||ce.find(t=>t.id===a))||null,[a]),N=o.useMemo(()=>[...le,...de,...ce],[]),re=o.useRef(null);o.useRef(null);const[U,Ee]=o.useState(new Set);o.useLayoutEffect(()=>{const t=()=>{const T=L.current;if(!T)return;const j=Array.from(T.querySelectorAll("button[data-skill-id]")),d=T.querySelector("[data-more-wrap]");if(!d)return;j.forEach(W=>{W.style.display=""}),d.style.display="";const E=[],_=window.innerWidth<640?4:2,S=()=>{const q=[...new Set([...j.filter(H=>H.style.display!=="none").map(H=>H.offsetTop),d.offsetTop])].sort((H,oe)=>H-oe).indexOf(d.offsetTop);return q>=0&&q<=_-1};let ae=j.length;for(;ae-- >0&&!S();){const W=j.filter(oe=>oe.style.display!=="none");if(W.length===0)break;const q=W[W.length-1],H=q.dataset.skillId;H&&E.push(H),q.style.display="none",T.offsetWidth}E.length===0&&(d.style.display="none");const se=new Set(E);se.size===U.size&&[...se].every(W=>U.has(W))||Ee(se)};t();const l=new ResizeObserver(t);return L.current&&l.observe(L.current),window.addEventListener("resize",t),()=>{l.disconnect(),window.removeEventListener("resize",t)}},[N,U,a]);const Q=o.useMemo(()=>N.filter(t=>U.has(t.id)),[N,U]);Q.length>0;const Ce=t=>{if(M){I(t),h(!1),f(null);return}s(l=>l===t?null:t),f(null),h(!1)},Ie=t=>{if(M){I(t),f(null);return}s(t),f(null),h(!1)},De=()=>{k&&(s(k),I(null),h(!1))},Le=()=>s(null),ye=t=>p({text:t,seq:Date.now()}),Re=t=>{n(t==="__agent__"?"agent":`thread/${t}`)},be=m?le.find(t=>t.id===m.id)||de.find(t=>t.id===m.id)||ce.find(t=>t.id===m.id):null;return e.jsxs(Ae,{activePage:c?"new-chat-opt2":"new-chat",onNavigate:n,onOpenSearch:r,children:[e.jsx("style",{children:`
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
        .nc-prompt-row{
          display:flex;
          align-items:center;
          gap:12px;
          padding:12px;
          background:transparent;
          border:none;
          border-radius:8px;
          text-align:left;
          cursor:pointer;
          width:100%;
          transition:background 0.15s, transform 0.15s;
        }
        .nc-prompt-text{
          flex:1;
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
            font-weight:600;
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

        /* ══════ Opt2 page skill cards (manual columns / hover-reveal) ══════
           列数由 JS 根据视口算好；每列是独立 flex column，列之间不会互相影响。
           Round-robin 分布让高优 skill 落在每一列的顶部。 */
        .nc-skill-masonry{
          display:flex;
          gap:12px;
          align-items:flex-start;
        }
        .nc-skill-col{
          flex:1 1 0;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        .nc-skill-card{
          display:block;
          width:100%;
          background:#fff;
          border:0.5px solid var(--line-l07);
          border-radius:12px;
          padding:16px;
          font-family:inherit;
          cursor:pointer;
          text-align:left;
          transition:box-shadow 160ms ease, border-color 160ms ease;
        }
        .nc-skill-card:focus-visible{
          outline:2px solid rgba(73,163,166,0.6);
          outline-offset:2px;
        }
        @media (hover: hover){
          .nc-skill-card:hover{
            box-shadow:0 6px 18px rgba(0,0,0,0.06);
            border-color:rgba(0,0,0,0.14);
          }
        }
        .nc-skill-card-header{
          display:flex;
          align-items:center;
          /* gap 改为 thumb / icon 自带 margin-right，方便 hover 时一起平滑收起 */
        }
        .nc-skill-card-creator-thumb{
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          margin-right:12px;
          /* hover 时 visibility:hidden 让头像瞬间消失但仍占位，让旁边的文字
             用 transform 平滑滑到左侧（headline + meta 一起平移）。 */
        }
        .nc-skill-card-creator-thumb > div[class*="rounded-full"],
        .nc-skill-card-creator-thumb > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
        }
        .nc-skill-card-icon-wrap{
          width:36px;
          height:36px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          background:var(--b-r05);
          border:1px solid var(--line-l12);
          margin-right:12px;
        }
        .nc-skill-card-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .nc-skill-card-name{
          font-family:'Delight',sans-serif;
          font-size:15px;
          line-height:20px;
          font-weight:600;
          color:var(--text-n9);
          letter-spacing:0.15px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .nc-skill-card-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .nc-skill-card-text{
          transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          /* 顶部头像直接 invisible（瞬间消失但保留占位），name+subtitle 用 transform
             平滑左移 48px（头像 36 + margin-right 12）滑到左侧。 */
          .nc-skill-card:hover .nc-skill-card-creator-thumb{
            visibility:hidden;
          }
          /* 用相邻兄弟选择器：只对头像类卡片的 text 平移；icon 类卡片（图标不消失）不动。 */
          .nc-skill-card:hover .nc-skill-card-creator-thumb + .nc-skill-card-text{
            transform:translateX(-48px);
          }
        }
        .nc-skill-card-desc{
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:20px;
          color:var(--text-n7);
          letter-spacing:0.13px;
          margin:12px 0 0;
        }
        /* hover 之前隐藏，hover 时挤出。
           - 默认（鼠标移走时生效）：起手就收，曲线偏 ease-in，让卡片立刻往回缩。
           - hover（展开时生效）：Material 标准曲线，整段均匀流速能看到在涨高。 */
        /* 用 grid-template-rows 0fr → 1fr 的技巧把高度直接动画到 content 真实高度，
           避免 max-height 从 360px 先无效地缩回到 content 实际高度的"前置无视觉空走"。 */
        .nc-skill-card-extra-wrap{
          display:grid;
          grid-template-rows:0fr;
          /* 默认（收回）：起手即最快，鼠标一离开就开始缩 */
          transition:grid-template-rows 200ms ease-out;
        }
        .nc-skill-card-extra{
          overflow:hidden;
          opacity:0;
          transition:opacity 160ms ease-out;
        }
        @media (hover: hover){
          .nc-skill-card:hover .nc-skill-card-extra-wrap{
            grid-template-rows:1fr;
            transition:grid-template-rows 320ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          .nc-skill-card:hover .nc-skill-card-extra{
            opacity:1;
          }
        }
        @media (hover: none){
          .nc-skill-card-extra-wrap{
            grid-template-rows:1fr;
          }
          .nc-skill-card-extra{
            opacity:1;
          }
        }
        /* 触屏：始终显示 */
        @media (hover: none){
          .nc-skill-card-extra{
            max-height:none;
            opacity:1;
          }
        }
        .nc-skill-card-tags{
          display:flex;
          flex-wrap:wrap;
          gap:5px;
          margin-top:12px;
        }
        .nc-skill-card-tag{
          height:20px;
          padding:0 6px;
          border-radius:5px;
          background:var(--b-r05);
          color:var(--text-n5);
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:20px;
          letter-spacing:0.11px;
          white-space:nowrap;
        }
        .nc-skill-card-divider{
          height:1px;
          background:var(--line-l07);
          margin:12px 0;
        }
        .nc-skill-card-creator{
          display:flex;
          align-items:center;
          gap:10px;
        }
        .nc-skill-card-creator > div[class*="rounded-full"],
        .nc-skill-card-creator > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
          flex-shrink:0;
        }
        .nc-skill-card-creator-text{
          display:flex;
          flex-direction:column;
          flex:1 1 auto;
          min-width:0;
        }
        .nc-skill-card-creator-socials{
          display:flex;
          align-items:center;
          gap:6px;
          flex-shrink:0;
          margin-left:auto;
        }
        .nc-skill-card-creator-social{
          width:24px;
          height:24px;
          border-radius:9999px;
          background:var(--b-r05);
          display:inline-flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          transition:background 120ms ease;
        }
        .nc-skill-card-creator-social:hover{ background:rgba(0,0,0,0.1); }
        .nc-skill-card-creator-caps{
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:14px;
          color:rgba(0,0,0,0.4);
          letter-spacing:0.11px;
          font-weight:400;
        }
        .nc-skill-card-creator-name{
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:18px;
          color:var(--text-n9);
          letter-spacing:0.13px;
          font-weight:500;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media (max-width: 639px){
          .nc-skill-card{ padding:14px; }
        }
      `}),e.jsxs("div",{className:"h-screen overflow-y-auto relative",style:{backgroundColor:"var(--grey-g01)"},children:[e.jsx("div",{className:"flex items-center gap-[16px] h-[56px] px-[28px] shrink-0 newchat-page-topbar",style:{position:"sticky",top:0,zIndex:5,background:"transparent"},children:e.jsx("div",{className:"flex-1 min-w-0",children:e.jsx(Me,{activeId:"new",onSelect:Re,trigger:e.jsxs("div",{className:"flex gap-[4px] items-center min-w-0 cursor-pointer",children:[e.jsx("p",{className:"font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate",children:"New Chat"}),e.jsx($,{name:"arrow-down-f2",size:14,color:"var(--text-n2)"})]})})})}),e.jsxs("section",{className:"nc-hero-section",style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",gap:40,padding:"56px 24px 32px",position:"relative",zIndex:2},children:[e.jsx(xt,{selected:v,maxWidth:X}),e.jsx("div",{style:{width:"100%",maxWidth:X,position:"relative",zIndex:1},children:e.jsx(ze,{shadow:!0,bottomChip:v?{label:v.label,icon:v.kol?void 0:v.icon??Fe,avatar:v.kol?v.creator:void 0,onRemove:Le}:null,injectText:x,onInputChange:g})}),K&&e.jsx("div",{className:"nc-prompts-container",style:{width:"100%",maxWidth:X,position:"relative",zIndex:1,marginTop:-16,display:"flex",flexDirection:"column"},children:ie.map((t,l)=>e.jsx("div",{style:{animation:"newchat-fadeup 320ms ease-out both",animationDelay:`${l*110}ms`},children:e.jsx(Se,{text:t,onClick:()=>ye(t)})},l))},y),!c&&!v&&!K&&e.jsxs("div",{ref:L,style:{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",position:"relative",zIndex:1,width:"100%",maxWidth:900},children:[N.map(t=>e.jsxs("button",{"data-skill-id":t.id,className:"nc-pill",onClick:()=>Ce(t.id),onMouseEnter:l=>{C()&&(l.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",l.currentTarget.style.transform="translateY(-2px)",V(t.id,l.currentTarget.getBoundingClientRect()))},onMouseLeave:l=>{C()&&(l.currentTarget.style.boxShadow="none",l.currentTarget.style.transform="translateY(0)",R())},style:{...pe,background:a===t.id?"#f3f8f8":"white"},children:[t.kol?e.jsx(A,{name:t.creator,size:22}):t.icon&&e.jsx($,{name:t.icon,size:16,color:"var(--text-n7)"}),t.label]},t.id)),!c&&e.jsxs("div",{ref:Z,"data-more-wrap":!0,style:{position:"relative"},children:[e.jsxs("button",{ref:re,type:"button",className:"nc-pill","aria-expanded":u,"aria-label":"More skills",style:{...pe,cursor:"pointer",background:u?"#f3f8f8":"white",border:u?"0.5px solid rgba(73,163,166,0.45)":pe.border},onMouseEnter:t=>{C()&&(M||(t.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",t.currentTarget.style.transform="translateY(-2px)",Y(),Q.length>0&&h(!0),f(null)))},onMouseLeave:t=>{C()&&(M||(t.currentTarget.style.boxShadow="none",t.currentTarget.style.transform="translateY(0)",J()))},onClick:()=>{M&&Q.length>0&&h(t=>!t)},children:["More",e.jsx($,{name:"arrow-down-l2",size:14,color:"var(--text-n5)"})]}),u&&Q.length>0&&e.jsx(mt,{skills:Q,onSelect:Ie,onMouseEnter:Y,onMouseLeave:J,onRowHover:(t,l)=>V(t,l,"left"),onRowLeave:R,onBackdrop:()=>h(!1)})]})]}),v&&e.jsx("div",{className:"nc-prompts-container",style:{width:"100%",maxWidth:X,position:"relative",zIndex:1,marginTop:-16,display:"flex",flexDirection:"column"},children:ee?e.jsx("div",{style:{animation:"newchat-fade 280ms ease-out"},children:v.prompts.slice(0,3).map((t,l)=>e.jsx("div",{style:{animation:"newchat-fadeup 320ms ease-out both",animationDelay:`${l*70}ms`},children:e.jsx(Se,{text:t,onClick:()=>ye(t)})},l))}):e.jsxs("div",{className:"nc-skeleton-anim",style:{animation:"newchat-fade 200ms ease-out"},children:[e.jsx(he,{widthPct:92}),e.jsx(he,{widthPct:70}),e.jsx(he,{widthPct:82})]})})]}),c&&!v&&(()=>{const t=Math.max(1,O),l=Array.from({length:t},()=>[]);return N.forEach((T,j)=>l[j%t].push(T)),e.jsx("section",{className:"nc-skills-grid-section",style:{width:"100%",maxWidth:X+48,margin:"0 auto",padding:"0 24px 80px",position:"relative",zIndex:2},children:e.jsx("div",{className:"nc-skill-masonry",children:l.map((T,j)=>e.jsx("div",{className:"nc-skill-col",children:T.map((d,E)=>{const _=d.tags??xe(d.id);return e.jsxs("article",{role:"button",tabIndex:0,className:"nc-skill-card",onClick:()=>{s(d.id),f(null),h(!1)},onKeyDown:S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),s(d.id),f(null),h(!1))},style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${Math.min(j+E*t,12)*30}ms`},children:[e.jsxs("header",{className:"nc-skill-card-header",children:[d.kol?e.jsx("span",{className:"nc-skill-card-creator-thumb",children:e.jsx(A,{name:d.creator,size:36})}):d.icon?e.jsx("span",{className:"nc-skill-card-icon-wrap",children:e.jsx($,{name:d.icon,size:20,color:"var(--text-n7)"})}):e.jsx("span",{className:"nc-skill-card-creator-thumb",children:e.jsx(A,{name:d.creator,size:36})}),e.jsxs("span",{className:"nc-skill-card-text",children:[e.jsx("span",{className:"nc-skill-card-name",children:d.label}),e.jsxs("span",{className:"nc-skill-card-author",children:["by ",d.creator," · ",ue(d.id)]})]})]}),e.jsx("p",{className:"nc-skill-card-desc",children:d.description}),e.jsx("div",{className:"nc-skill-card-tags",children:_.slice(0,3).map(S=>e.jsx("span",{className:"nc-skill-card-tag",children:S},S))}),e.jsx("div",{className:"nc-skill-card-extra-wrap",children:e.jsxs("div",{className:"nc-skill-card-extra",children:[e.jsx("div",{className:"nc-skill-card-divider"}),e.jsxs("div",{className:"nc-skill-card-creator",children:[e.jsx(A,{name:d.creator,size:28}),e.jsxs("div",{className:"nc-skill-card-creator-text",children:[e.jsx("span",{className:"nc-skill-card-creator-caps",children:"Created by"}),e.jsx("span",{className:"nc-skill-card-creator-name",children:d.creator})]}),e.jsx("div",{className:"nc-skill-card-creator-socials",children:ge(d.creator).map(S=>e.jsx("a",{href:S.href,target:"_blank",rel:"noreferrer noopener","aria-label":S.label,onClick:ae=>ae.stopPropagation(),className:"nc-skill-card-creator-social",children:S.render()},S.key))})]})]})})]},d.id)})},j))})})})(),v&&e.jsx("section",{className:"nc-cards-section",style:{width:"100%",maxWidth:X+48,margin:"0 auto",padding:"0 24px 80px",display:"flex",flexDirection:"column",gap:12,position:"relative",zIndex:2},children:ne?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:12,animation:"newchat-fade 320ms ease-out"},children:v.playbooks.slice(0,6).map((t,l)=>e.jsx("div",{style:{animation:"newchat-fadeup 360ms ease-out both",animationDelay:`${l*50}ms`},children:e.jsx(pt,{p:t,skillId:v.id,skillLabel:v.label,skillIcon:v.icon,skillKol:v.kol,skillCreator:v.creator,onClick:()=>{sessionStorage.setItem("autoOpenChatPanel","1"),n("new-chat")}})},t.id))}):e.jsx("div",{className:"nc-skeleton-anim",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:12,animation:"newchat-fade 200ms ease-out"},children:Array.from({length:6}).map((t,l)=>e.jsx(ht,{},l))})},v.id)]}),m&&be&&e.jsx(Ke,{template:be,anchor:m.rect,placeAbove:m.placeAbove,side:m.side,onMouseEnter:F,onMouseLeave:R}),k&&(()=>{const t=N.find(l=>l.id===k);return t?e.jsx(gt,{template:t,onClose:()=>I(null),onSelect:De}):null})()]})}export{jt as default};
