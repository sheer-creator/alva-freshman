import{r as d,j as e}from"./index-Cg7qR6Zc.js";import{C as b,c as Ce,r as Te,b as ee,a as Me,A as De}from"./AppShell-1_08_HE-.js";import{A as Fe,F as Le}from"./FeedDetailModal-CNoP5qug.js";import{P as $e,O as ze,C as Ee}from"./new-chat-mock-Busa2iJ_.js";import"./referral-mock-D6DgBLJk.js";const M="'Delight', sans-serif",_=[{id:"user",name:"User.md",lastUpdated:"03/02/2026",content:`## Who you are

Growth-oriented investor with a US large-cap core and a tactical crypto sleeve. Comfortable reading charts and funding data; prefers theses backed by numbers over narratives. Checks in most weekday mornings before the US open, usually 8:00–9:00 AM ET.

### Investing preferences

- Core focus: AI infrastructure (NVDA, AVGO, TSM) and the power-grid buildout around it.
- Prefers basket trackers with explicit weights over single-name calls.
- Backtests before subscribing — always asks for max drawdown alongside CAGR.
- Time horizon: 1–3 years for the core, weeks for the tactical sleeve.

### Communication style

- Lead with the conclusion, then the data; no long preambles.
- Numbers formatted with explicit direction (+/-, bp) and a timeframe.
- English for analysis; tickers always in $TICKER form.
- Charts only when a number alone can't carry the point.

### Constraints

- No leverage and no options strategies in recommendations.
- Crypto exposure capped at 15% of the total book.
- Quiet hours 11 PM – 7 AM — batch non-urgent pushes to the morning brief.
- Tax-sensitive: flag any suggestion that would realize short-term gains.

### Open questions

- Whether to add a dividend sleeve once the 10Y settles below 4%.
- Sizing for the power & grid theme — currently undecided between 15% and 25%.`},{id:"core-basket",name:"core-basket.md",lastUpdated:"02/27/2026",content:`## Core basket

The long-term sleeve Alva tracks for rebalance signals and drawdown alerts. Weights are targets, not live positions — actual fills come from the connected portfolio.

### Current targets

- NVDA 30% — AI compute anchor; review after each earnings print (next: May 22).
- AVGO 20% — networking + custom-ASIC leg; watch the VMware integration margin story.
- TSM 20% — foundry leg; CoWoS capacity doubling through 2025 is the gate.
- VRT 15% — power and cooling; added 01/2026 after the capex revision sweep.
- GEV 15% — grid equipment backlog at 3.2x book-to-bill; added 01/2026.

### Rebalance rules

- Rebalance when any weight drifts more than 5pp from target.
- New entrants require a verified thesis entry first (see verified-theses.md).
- Trims route through risk-rules.md drawdown checks before posting.

### History

- 01/15/2026 — added VRT and GEV at 15% each, funded by trimming NVDA from 38%.
- 11/03/2025 — exited MU after the HBM thesis was absorbed into consensus.
- 09/12/2025 — initial basket: NVDA / AVGO / TSM at 40/30/30.`},{id:"risk-rules",name:"risk-rules.md",lastUpdated:"02/14/2026",content:`## Risk rules

Standing rules Alva applies before surfacing any trade idea or rebalance suggestion. These override individual playbook signals.

### Position limits

- Single name max 30% of the book; single theme max 60%.
- Crypto sleeve capped at 15%; stablecoins excluded from the cap.
- No adding to a position within 48h of its earnings print.
- New positions start at half target weight; scale in over two entries.

### Drawdown responses

- Book -8% from high-water mark: flag exposure, propose trims only.
- Book -15%: stop surfacing new buy ideas until reviewed together.
- Single name -20% from cost: force a thesis re-check against verified-theses.md.

### Signal hygiene

- Two conflicting playbook signals on the same ticker: surface both, act on neither.
- Signals older than 24h are stale — re-run the source automation before citing.`},{id:"verified-theses",name:"verified-theses.md",lastUpdated:"01/30/2026",content:`## Verified theses

Theses the user has explicitly confirmed after reviewing the evidence. Alva can cite these as established context, but re-validates the data behind them each time they drive a decision.

### Active

- AI compute is supply-constrained, not demand-constrained — confirmed 01/2026 after the CoWoS capacity review.
- Power availability is the next bottleneck for data-center buildout; grid names lag the narrative by 1–2 quarters.
- BTC regime tracking beats buy-and-hold on a risk-adjusted basis in the 2022–2025 backtest window (Sharpe 1.4 vs 0.9).
- Hyperscaler capex revisions lead semis revenue prints by roughly one quarter.

### Watching

- GLP-1 supply chain as a multi-year volume story — needs one more quarter of LLY/NVO capacity data.
- Implied moves into mega-cap ERs are systematically rich — premium-selling edge unverified on our own data.

### Retired

- ETH/BTC mean reversion — invalidated 12/2025 after three failed reversion windows.
- Small-cap rate-cut rotation — retired 10/2025; breadth never confirmed.`},{id:"alert-style",name:"alert-style.md",lastUpdated:"01/12/2026",content:`## Alert style

How pushes should read across Web and Telegram. The goal: a 5-second scan tells the user whether to open the full card.

### Format

- Headline: 【tag】+ one-line conclusion with the key number.
- Body: max 4 bullets, each with its own data point — no filler lines.
- Always end with the next catalyst and its date when one exists.
- Emojis as bullet markers only (📊 💰 ⚠️ 🗓️), never inline in the text.

### Priority

- Threshold breaches and signal flips push immediately.
- Recaps and digests batch into the 7:30 AM morning brief.
- Anything during quiet hours (11 PM – 7 AM) holds unless it's a -15% book event.

### Channel notes

- Telegram: keep under 12 lines — long analysis links back to the Web thread.
- Web: full cards with charts welcome; group same-source pushes into one message.`}];function Re(a){const s=[];let i=null;const n=()=>{i&&(s.push({type:"bullets",items:i}),i=null)};for(const r of a.split(`
`)){const l=r.trim();if(!l){n();continue}if(l.startsWith("- ")){(i??(i=[])).push(l.slice(2));continue}n(),l.startsWith("### ")?s.push({type:"h3",text:l.slice(4)}):l.startsWith("## ")?s.push({type:"h2",text:l.slice(3)}):l.startsWith("# ")?s.push({type:"h1",text:l.slice(2)}):s.push({type:"p",text:l})}return n(),s}function Ie({block:a}){if(a.type!=="bullets"){if(a.type==="p")return e.jsx("p",{className:"w-full text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:M,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:a.text});const s=a.type==="h1"?"pt-[2px] text-[18px] leading-[28px] tracking-[0.18px]":a.type==="h2"?"pt-[2px] text-[16px] leading-[26px] tracking-[0.16px]":"text-[14px] leading-[22px] tracking-[0.14px]";return e.jsx("p",{className:`w-full font-medium ${s}`,style:{fontFamily:M,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:a.text})}return e.jsx("div",{className:"flex w-full flex-col gap-[4px]",children:a.items.map((s,i)=>e.jsxs("div",{className:"flex w-full items-start",children:[e.jsx("span",{className:"flex h-[22px] w-[20px] shrink-0 items-center justify-center text-[14px] leading-[22px]",style:{fontFamily:M,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"•"}),e.jsx("p",{className:"min-w-0 flex-1 text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:M,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:s})]},i))})}function Pe(){const[a,s]=d.useState(_[0].id),[i,n]=d.useState({}),[r,l]=d.useState(null),p=_.find(m=>m.id===a)??_[0],x=i[p.id]??p.content,g=r!==null,v=m=>{s(m),l(null)},o=()=>{r!==null&&(n(m=>({...m,[p.id]:r})),l(null))};return e.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto px-[28px]",children:e.jsxs("div",{className:"mx-auto flex w-full max-w-[960px] items-start gap-[28px] py-[28px]",children:[e.jsx("div",{className:"flex w-[200px] shrink-0 flex-col",children:_.map(m=>{const y=m.id===a;return e.jsxs("button",{className:"flex w-full cursor-pointer items-center gap-[4px] rounded-[4px] bg-transparent px-[12px] py-[9px] text-left transition-colors",style:{border:"none",background:y?"var(--b-r03, rgba(0,0,0,0.03))":"transparent"},onMouseEnter:j=>{y||(j.currentTarget.style.background="var(--b-r02, rgba(0,0,0,0.02))")},onMouseLeave:j=>{y||(j.currentTarget.style.background="transparent")},onClick:()=>v(m.id),children:[e.jsx(b,{name:"disclaimer-l",size:16,color:"var(--text-n9, rgba(0,0,0,0.9))"}),e.jsx("span",{className:"min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:M,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:m.name})]},m.id)})}),e.jsxs("div",{className:"flex min-w-0 flex-1 flex-col gap-[20px]",children:[e.jsxs("div",{className:"flex w-full items-center gap-[12px]",children:[e.jsx("p",{className:"min-w-0 flex-1 text-[20px] leading-[30px] tracking-[0.2px]",style:{fontFamily:M,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:p.name}),g?e.jsxs("button",{className:"flex shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[4px] border-none px-[12px] py-[4px]",style:{background:"var(--main-m1, #49A3A6)"},onClick:o,children:[e.jsx(b,{name:"check-f2",size:12,color:"#fff"}),e.jsx("span",{className:"text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white",style:{fontFamily:M},children:"Save"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"whitespace-nowrap text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:M,color:"var(--text-n5, rgba(0,0,0,0.5))"},children:["Last Updated: ",p.lastUpdated]}),e.jsx("button",{className:"flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0","aria-label":"Edit memory",onClick:()=>l(x),children:e.jsx(b,{name:"edit-l1",size:16,color:"var(--text-n9, rgba(0,0,0,0.9))"})}),e.jsx("button",{className:"flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0","aria-label":"Delete memory",children:e.jsx(b,{name:"delete-l",size:16,color:"var(--text-n9, rgba(0,0,0,0.9))"})})]})]}),g?e.jsx("textarea",{value:r,onChange:m=>l(m.target.value),autoFocus:!0,rows:r.split(`
`).length+2,spellCheck:!1,className:"w-full resize-none rounded-[8px] bg-transparent p-[24px] text-[14px] leading-[22px] tracking-[0.14px] outline-none",style:{fontFamily:M,color:"var(--text-n9, rgba(0,0,0,0.9))",border:"0.5px solid var(--line-l2, rgba(0,0,0,0.2))"}}):e.jsx("div",{className:"flex w-full flex-col gap-[12px] rounded-[8px] p-[24px]",style:{border:"0.5px solid var(--line-l2, rgba(0,0,0,0.2))"},children:Re(x).map((m,y)=>e.jsx(Ie,{block:m},y))})]})]})})}const V="'Delight', sans-serif",be=[{id:"t1",title:"Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop",detail:"Read AppShell.tsx component with merge conflict markers",status:"running"},{id:"t2",title:"Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop",detail:"Waiting for answer",status:"needs-input"},{id:"t3",title:"Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop",detail:"Bottom line: the core thesis is unchanged — HBM/advanced packaging crowding out general-purpose capacity. Today's marginal new info is the upstream materials angle (Kanto Denka tungsten-layer consumable potentially cut off from July) — worth watching for confirmation.",status:"done"},{id:"t4",title:"Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop",detail:"An error occurred",status:"paused"}],Oe={running:{label:"Running",color:"var(--main-m1, #49A3A6)",bg:"var(--main-m1-10, rgba(73,163,166,0.1))"},"needs-input":{label:"Needs Input",color:"var(--main-m5, #E6A91A)",bg:"var(--main-m5-10, rgba(230,169,26,0.1))"},done:{label:"Done",color:"var(--main-m3, #2a9b7d)",bg:"var(--main-m3-10, rgba(42,155,125,0.1))"}};function Be({status:a}){if(a==="paused")return e.jsx("span",{className:"shrink-0 rounded-[2px] px-[4px] py-px text-[11px] leading-[18px] tracking-[0.11px]",style:{fontFamily:V,color:"var(--text-n5, rgba(0,0,0,0.5))",background:"var(--b-r05, rgba(0,0,0,0.05))"},children:"Paused"});const s=Oe[a];return e.jsx("span",{className:"shrink-0 rounded-[4px] px-[6px] py-px text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:V,color:s.color,background:s.bg},children:s.label})}const Ve="@keyframes agent-task-step { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.82; } }";function We({task:a}){const s=a.status==="running"||a.status==="needs-input";return e.jsxs("div",{className:"flex w-full items-start gap-[8px] py-[16px]",style:{borderBottom:"0.5px solid var(--line-l12, rgba(0,0,0,0.12))"},children:[e.jsx("div",{className:"flex size-[28px] shrink-0 items-center justify-center rounded-[2px]",style:{background:"var(--b-r03, rgba(0,0,0,0.03))"},children:e.jsx(b,{name:"step-l",size:16,color:"var(--text-n9, rgba(0,0,0,0.9))"})}),e.jsxs("div",{className:"flex min-w-0 flex-1 flex-col gap-[4px]",children:[e.jsx("p",{className:"w-full text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:V,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:a.title}),e.jsxs("div",{className:"flex w-full items-center gap-[8px]",children:[s&&e.jsx(Ce,{size:14}),e.jsx("p",{className:"min-w-0 flex-1 truncate text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:V,color:"var(--text-n5, rgba(0,0,0,0.5))",animation:s?"agent-task-step 1.4s ease-in-out infinite":void 0},children:a.detail})]})]}),e.jsx(Be,{status:a.status})]})}const He=[{id:"all",label:"All"},{id:"active",label:"Active"},{id:"done",label:"Done"}];function _e(){const[a,s]=d.useState("all"),i=be.filter(n=>a==="all"?!0:a==="done"?n.status==="done":n.status!=="done");return e.jsxs("div",{className:"min-h-0 flex-1 overflow-y-auto p-[28px]",children:[e.jsx("style",{children:Ve}),e.jsxs("div",{className:"mx-auto flex w-full max-w-[960px] flex-col gap-[8px]",children:[e.jsx("div",{className:"flex flex-wrap gap-[8px]",children:He.map(n=>{const r=a===n.id;return e.jsx("button",{className:"h-[28px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border-none px-[10px] py-[4px] text-[12px] leading-[20px] tracking-[0.12px] transition-colors",style:{fontFamily:V,background:r?"rgba(0,0,0,0.7)":"var(--b-r03, rgba(0,0,0,0.03))",color:r?"rgba(255,255,255,0.9)":"var(--text-n7, rgba(0,0,0,0.7))"},onClick:()=>s(n.id),children:n.label},n.id)})}),e.jsx("div",{className:"flex w-full flex-col",children:i.map(n=>e.jsx(We,{task:n},n.id))})]})]})}const ae="'Delight', sans-serif",ve=[{id:"a1",name:"Type=Logo Horizontal, Color=Black + Green.png",detail:"Generated from your Theme Tracker run · 2.4 MB",kind:"image"},{id:"a2",name:"my-semis-screener.skill",detail:"Custom factor screen you built and saved",kind:"file"},{id:"a3",name:"mag7-backtest-results.csv",detail:"10Y equal-weight backtest output",kind:"file"}];function Ye({artifact:a}){return e.jsxs("div",{className:"flex w-full items-start gap-[8px] py-[16px]",style:{borderBottom:"0.5px solid var(--line-l12, rgba(0,0,0,0.12))"},children:[e.jsx("div",{className:"flex size-[28px] shrink-0 items-center justify-center rounded-[2px]",style:{background:"var(--b-r03, rgba(0,0,0,0.03))"},children:e.jsx(b,{name:a.kind==="image"?"photo-l":"clip-l",size:16,color:"var(--text-n9, rgba(0,0,0,0.9))"})}),e.jsxs("div",{className:"flex min-w-0 flex-1 flex-col gap-[4px]",children:[e.jsx("p",{className:"w-full truncate text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:ae,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:a.name}),e.jsx("p",{className:"w-full truncate text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:ae,color:"var(--text-n5, rgba(0,0,0,0.5))"},children:a.detail})]})]})}const Ge=[{id:"all",label:"All"},{id:"image",label:"Images"},{id:"file",label:"Files"}];function qe(){const[a,s]=d.useState("all"),i=ve.filter(n=>a==="all"?!0:n.kind===a);return e.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto p-[28px]",children:e.jsxs("div",{className:"mx-auto flex w-full max-w-[960px] flex-col gap-[8px]",children:[e.jsx("div",{className:"flex flex-wrap gap-[8px]",children:Ge.map(n=>{const r=a===n.id;return e.jsx("button",{className:"h-[28px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border-none px-[10px] py-[4px] text-[12px] leading-[20px] tracking-[0.12px] transition-colors",style:{fontFamily:ae,background:r?"rgba(0,0,0,0.7)":"var(--b-r03, rgba(0,0,0,0.03))",color:r?"rgba(255,255,255,0.9)":"var(--text-n7, rgba(0,0,0,0.7))"},onClick:()=>s(n.id),children:n.label},n.id)})}),e.jsx("div",{className:"flex w-full flex-col",children:i.map(n=>e.jsx(Ye,{artifact:n},n.id))})]})})}const z="'Delight', sans-serif";function Ue({rows:a,connectedIds:s,activeId:i,onConnect:n,onDisconnect:r,onSetActive:l,interceptConnect:p}){const[x,g]=d.useState(null),v=o=>{p!=null&&p(o)||(g(o),setTimeout(()=>{g(null),n(o)},900))};return e.jsx("div",{className:"flex w-full flex-col gap-[16px]",children:a.map(o=>{const m=s.includes(o.id),y=m&&i===o.id,j=m&&!y,f=x===o.id;return e.jsxs("div",{className:`group flex w-full items-center gap-[12px] rounded-[var(--radius-ct-l,8px)] px-[16px] py-[12px]${j?" cursor-pointer":""}`,onClick:j?()=>l(o.id):void 0,title:j?`Receive messages on ${o.name}`:void 0,style:{background:y?"var(--main-m1-10, rgba(73,163,166,0.1))":m?"var(--grey-g01, #fafafa)":"#fff",border:m?"0.5px solid transparent":"0.5px solid var(--line-l2, rgba(0,0,0,0.2))"},children:[e.jsx("img",{src:o.logo,alt:"",className:"size-[36px] shrink-0 rounded-full"}),e.jsxs("div",{className:"flex min-w-0 flex-1 flex-col",children:[e.jsx("p",{className:"truncate text-[16px] leading-[26px] tracking-[0.16px]",style:{fontFamily:z,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:o.name}),e.jsx("p",{className:"truncate text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:z,color:"var(--text-n5, rgba(0,0,0,0.5))"},children:m?o.handle:o.sub})]}),m?e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent p-0 text-[12px] leading-[20px] tracking-[0.12px] transition-opacity hover:opacity-70",style:{fontFamily:z,color:"var(--text-n5, rgba(0,0,0,0.5))"},onClick:L=>{L.stopPropagation(),r(o.id)},children:"Disconnect"}),y?e.jsx("span",{className:"shrink-0",title:`Receiving messages on ${o.name}`,children:e.jsx(b,{name:"check-f2",size:20,color:"var(--main-m1, #49A3A6)"})}):e.jsxs("span",{className:"shrink-0",children:[e.jsx("span",{className:"block group-hover:hidden",children:e.jsx(b,{name:"check-f2",size:20,color:"var(--text-n1, rgba(0,0,0,0.1))"})}),e.jsx("span",{className:"hidden group-hover:block",children:e.jsx(b,{name:"check-f2",size:20,color:"var(--main-m1-40, rgba(73,163,166,0.4))"})})]})]}):e.jsx("button",{type:"button",className:"flex h-[32px] w-[84px] shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-btn-s,4px)] bg-transparent px-[16px] py-[6px] transition-colors hover:bg-[var(--b-r02)]",style:{fontFamily:z,border:"0.5px solid var(--line-l3, rgba(0,0,0,0.3))"},onClick:()=>!f&&v(o.id),children:e.jsx("span",{className:"overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px]",style:{color:"var(--text-n9, rgba(0,0,0,0.9))"},children:f?"Connecting…":"Connect"})})]},o.id)})})}function Ke({overlay:a="fixed",onClose:s,...i}){return e.jsx("div",{className:`${a==="fixed"?"fixed z-50":"absolute z-30"} inset-0 flex items-center justify-center px-[16px] py-[48px]`,style:{background:"rgba(0,0,0,0.6)"},onClick:s,children:e.jsxs("div",{className:"flex w-[600px] max-w-[720px] flex-col gap-[12px] rounded-[var(--radius-pop-dialog,8px)] bg-white p-[28px]",style:{border:"0.5px solid var(--line-l2, rgba(0,0,0,0.2))",boxShadow:"var(--shadow-l, 0 10px 20px 0 rgba(0,0,0,0.08))"},onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"flex w-full items-start gap-[12px]",children:[e.jsxs("div",{className:"flex min-w-0 flex-1 flex-col gap-[2px]",children:[e.jsx("p",{className:"text-[18px] font-medium leading-[28px] tracking-[0.18px]",style:{fontFamily:z,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"Connect"}),e.jsx("p",{className:"text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:z,color:"var(--text-n7, rgba(0,0,0,0.7))"},children:"Choose the messaging app for your Alva Agent"})]}),e.jsx("button",{type:"button",className:"shrink-0 cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60",onClick:s,"aria-label":"Close",children:e.jsx(b,{name:"close-l1",size:18,color:"var(--text-n9, rgba(0,0,0,0.9))"})})]}),e.jsx(Ue,{...i})]})})}const Q=d.forwardRef(function({icon:s,avatar:i,label:n,active:r,trailing:l,className:p,style:x,type:g="button",...v},o){return e.jsxs("button",{ref:o,type:g,className:`flex h-[38px] cursor-pointer items-center gap-[8px] rounded-full px-[16px] py-[8px] ${p??""}`,style:{fontFamily:"'Delight', sans-serif",fontSize:14,fontWeight:400,lineHeight:"22px",letterSpacing:.14,whiteSpace:"nowrap",userSelect:"none",border:r?"0.5px solid rgba(0,0,0,0.7)":"0.5px solid var(--line-l2, rgba(0,0,0,0.2))",background:r?"rgba(0,0,0,0.7)":"#fff",color:r?"rgba(255,255,255,0.9)":"var(--text-n9, rgba(0,0,0,0.9))",transition:"box-shadow 160ms ease, transform 160ms ease, background-color 120ms ease, color 120ms ease, border-color 120ms ease",...x},...v,children:[s&&e.jsx(b,{name:s,size:18,color:r?"#fff":"var(--text-n9, rgba(0,0,0,0.9))"}),i,e.jsx("span",{children:n}),l]})});function te(a){let s=2166136261;for(let i=0;i<a.length;i++)s^=a.charCodeAt(i),s=Math.imul(s,16777619);return s>>>0}const ce=["Filings","Insider Cluster","Event Drift","Earnings Drift","Whisper Numbers","Macro Flow","FX Cross","Rates Curve","Credit Spread","Sentiment","Theme Tracker","Catalyst","Risk Off","Backtest","Yield Curve","Dividend","On-Chain","ETF Flow","MAG7","AI Capex","Hyperscaler","Volatility","Carry","Drawdown","Sharpe","Quintile","Read-Across","Sector Rotation","Pair Trade","Theme"];function Xe(a){const i=(te(a)>>>12)%2+2,n=new Set,r=[];for(let l=0;r.length<i&&l<32;l++){const x=te(`${a}|tag|${l}`)%ce.length;n.has(x)||(n.add(x),r.push(ce[x]))}return r}function Je(a){const i=te(a)%7200;return i<1?"just now":i<60?`${i}m ago`:i<1440?`${Math.floor(i/60)}h ago`:`${Math.floor(i/1440)}d ago`}const de=a=>()=>e.jsx("img",{src:`/${a}`,alt:"",width:14,height:14,style:{width:14,height:14,display:"block"}}),Qe=()=>()=>e.jsx("svg",{width:12,height:12,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),Ze=()=>()=>e.jsx("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"rgba(0,0,0,0.85)","aria-hidden":!0,style:{display:"block"},children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})}),pe={discord:{key:"discord",label:"Discord",href:"https://discord.com",render:de("logo-social-discord.svg")},telegram:{key:"telegram",label:"Telegram",href:"https://telegram.org",render:de("logo-social-telegram.svg")},x:{key:"x",label:"X",href:"https://x.com",render:Qe()},instagram:{key:"instagram",label:"Instagram",href:"https://instagram.com",render:Ze()}},ea=["discord","telegram","x"],aa=["x","telegram","discord","instagram"];function ta(a){if(a==="Alva")return ea.map(l=>pe[l]);let s=2166136261;for(let l=0;l<a.length;l++)s^=a.charCodeAt(l),s=Math.imul(s,16777619)>>>0;const i=l=>{let p=s;for(let x=0;x<l.length;x++)p^=l.charCodeAt(x),p=Math.imul(p,16777619)>>>0;return p},n=s%2+1;return[...aa].sort((l,p)=>i(l)-i(p)).slice(0,n).map(l=>pe[l])}const sa=`
@keyframes skills-panel-fade{from{opacity:0}to{opacity:1}}
.skills-panel-backdrop{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  z-index:9998;
  animation:skills-panel-fade 200ms ease-out;
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
  border-radius:var(--radius-pop-dialog, 8px);
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
/* 手动分列瀑布流:JS 把卡片 round-robin 分到 N 个独立列容器(flex column)
   每列独立堆叠 → 第一行顶部对齐;某列内 hover 撑高,只影响同列下方卡片,
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
  gap:12px;
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
    border-color:var(--line-l9, rgba(0,0,0,0.9));
    box-shadow:0 6px 20px rgba(0,0,0,0.04);
    /* 用户行下方边距 = 用户行到分割线的距离(16px)*/
    padding-bottom:16px;
  }
}
.skills-panel-card.is-selected{
  background:var(--b-r02);
  border-color:var(--line-l9, rgba(0,0,0,0.9));
}
@media (hover: hover){
  .skills-panel-card.is-selected:hover{
    background:rgba(255,255,255,0.9);
    border-color:var(--line-l9, rgba(0,0,0,0.9));
    box-shadow:0 6px 20px rgba(0,0,0,0.04);
  }
}
/* Hover 展开底部 creator + socials 行。
   所有过渡使用统一的 240ms cubic-bezier(0.4,0,0.2,1),确保
   hover-in 和 hover-out 节奏一致。 */
.skills-panel-card-hoverblock{
  display:grid;
  grid-template-rows:0fr;
  opacity:0;
  /* margin-top:-12 抵消 card-level gap:12,使收起态不留间距;
     展开时 grid-template-rows 撑开,gap 通过 row-gap 自然出现。 */
  margin-top:-12px;
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
/* KOL 卡片(顶部用 Avatar):hover 时头像隐藏,标题块滑到左侧。
   Alva 卡片(顶部用 icon-wrap)不参与此动画 —— 图标保留。
   偏移 = 头像 48 + gap 12。 */
@media (hover: hover){
  .skills-panel-card:hover .skills-panel-card-creator-thumb{
    visibility:hidden;
  }
  .skills-panel-card:hover .skills-panel-card-creator-thumb + .skills-panel-card-titleblock{
    transform:translateX(-60px);
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
/* 卡片头(参考 Skills Hub 截图):大圆图标 / 头像 + 标题 + by-line */
.skills-panel-card-header{
  display:flex;
  align-items:center;
  gap:12px;
}
.skills-panel-card-icon-wrap{
  width:48px;
  height:48px;
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border-radius:9999px;
  background:#fff;
  border:1px solid var(--line-l07);
  transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
@media (hover: hover){
  .skills-panel-card:hover .skills-panel-card-icon-wrap{
    background:var(--b-r02);
  }
}
.skills-panel-card-creator-thumb{
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
}
.skills-panel-card-titleblock{
  flex:1;
  min-width:0;
  display:flex;
  flex-direction:column;
  gap:2px;
  transition:transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
.skills-panel-card-name{
  font-family:'Delight',sans-serif;
  font-size:16px;
  line-height:24px;
  font-weight:400;
  color:var(--text-n9);
  letter-spacing:0.16px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.skills-panel-card-author{
  font-family:'Delight',sans-serif;
  font-size:12px;
  line-height:18px;
  color:var(--text-n5);
  letter-spacing:0.12px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.skills-panel-card-desc{
  font-family:'Delight',sans-serif;
  font-size:13px;
  line-height:22px;
  color:var(--text-n7);
  letter-spacing:0.13px;
  margin:0;
}
.skills-panel-card-tags{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
}
.skills-panel-card-tag{
  height:24px;
  padding:0 8px;
  border-radius:6px;
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
`;function ra({skills:a,selectedId:s,onSelect:i,onClose:n}){const r=g=>g<640?1:g<960?2:3,[l,p]=d.useState(()=>typeof window>"u"?3:r(window.innerWidth));if(d.useEffect(()=>{const g=()=>p(r(window.innerWidth));return window.addEventListener("resize",g),()=>window.removeEventListener("resize",g)},[]),typeof document>"u")return null;const x=Array.from({length:l},()=>[]);return a.forEach((g,v)=>x[v%l].push(g)),Te.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("style",{children:sa}),e.jsx("div",{className:"skills-panel-backdrop",onClick:n}),e.jsxs("div",{className:"skills-panel",role:"dialog","aria-label":"Skills Hub",children:[e.jsxs("div",{className:"skills-panel-header",children:[e.jsx("span",{className:"skills-panel-title",children:"Skills Hub"}),e.jsx("button",{type:"button","aria-label":"Close",className:"skills-panel-close",onClick:n,children:e.jsx(b,{name:"close-l1",size:16,color:"var(--text-n7)"})})]}),e.jsx("div",{className:"skills-panel-scroll",children:e.jsx("div",{className:"skills-panel-grid",children:x.map((g,v)=>e.jsx("div",{className:"skills-panel-col",children:g.map(o=>{const m=o.tags??Xe(o.id),y=s===o.id,j=ta(o.creator);return e.jsxs("button",{type:"button",className:`skills-panel-card${y?" is-selected":""}`,onClick:()=>i(o.id),children:[e.jsxs("div",{className:"skills-panel-card-header",children:[o.creator==="Alva"&&o.icon?e.jsx("span",{className:"skills-panel-card-icon-wrap",children:e.jsx(b,{name:o.icon,size:22,color:"var(--text-n7)"})}):e.jsx("span",{className:"skills-panel-card-creator-thumb",children:e.jsx(ee,{name:o.creator,size:48})}),e.jsxs("div",{className:"skills-panel-card-titleblock",children:[e.jsx("span",{className:"skills-panel-card-name",children:o.label}),e.jsxs("span",{className:"skills-panel-card-author",children:["by ",o.creator," · ",Je(o.id)]})]})]}),e.jsx("p",{className:"skills-panel-card-desc",children:o.description}),m.length>0&&e.jsx("div",{className:"skills-panel-card-tags",children:m.slice(0,3).map(f=>e.jsx("span",{className:"skills-panel-card-tag",children:f},f))}),e.jsx("div",{className:"skills-panel-card-hoverblock",children:e.jsxs("div",{className:"skills-panel-card-hoverblock-inner",children:[e.jsx("div",{className:"skills-panel-card-divider"}),e.jsxs("div",{className:"skills-panel-card-creator-row",children:[e.jsx(ee,{name:o.creator,size:36}),e.jsxs("div",{className:"skills-panel-card-creator-text",children:[e.jsx("span",{className:"skills-panel-card-creator-caps",children:"Created by"}),e.jsx("button",{type:"button",className:"skills-panel-card-creator-name",onClick:f=>f.stopPropagation(),children:e.jsx("span",{className:"skills-panel-card-creator-name-text",children:o.creator})})]}),e.jsx("div",{className:"skills-panel-card-socials",children:j.map(f=>e.jsx("a",{href:f.href,target:"_blank",rel:"noreferrer noopener","aria-label":f.label,onClick:L=>L.stopPropagation(),className:"skills-panel-card-social",children:f.render()},f.key))})]})]})})]},o.id)})},v))})})]})]}),document.body)}const P="'Delight', sans-serif";function Y(a){return a.type==="playbook"?a.title:a.type==="push"?`${a.feed}|${a.title}`:a.type==="trade"?`${a.feed}|${a.source}|trade`:`${a.feed}|${a.source}|kol`}function ye(a){if(a.type==="playbook")return null;const s=Y(a);if(a.type==="push")return{id:s,kind:"normal",timestamp:a.time,source:a.source,feedName:a.feed,title:a.title,bullets:a.bullets};if(a.type==="trade")return{id:s,kind:"trade",timestamp:a.time,source:a.source,feedName:a.feed,rows:a.signals.map(n=>({ticker:n.ticker,action:n.side,detail:n.note,dir:n.up?"up":"down"})),note:a.rebalance};const i=a.quote.match(/^(\$\S+)\s+([\s\S]*)$/);return{id:s,kind:"kol",timestamp:a.time,source:a.source,feedName:a.feed,kolName:a.source,kolAvatar:a.kolAvatar,headlineTicker:i?i[1]:`$${a.ticker}`,headlineText:i?i[2]:a.quote,quoteTicker:`$${a.ticker}`,quoteSide:a.side,analysis:a.analysis}}const na={border:"0.5px solid var(--line-l3, rgba(0,0,0,0.3))",borderRadius:"var(--radius-ct-l, 8px)"},xe="w-[calc((100%-32px)*3/7)] min-w-[320px]";function ia({card:a,subscribed:s,onSubscribe:i,onRemix:n,onOpen:r}){if(a.type==="playbook")return e.jsxs("div",{className:`flex h-[360.563px] ${xe} shrink-0 cursor-pointer flex-col items-start overflow-hidden bg-white p-[4px] transition-shadow hover:shadow-l`,style:na,onClick:r,children:[e.jsx("div",{className:"relative min-h-0 w-full flex-1 overflow-hidden",style:{borderRadius:"var(--radius-ct-s, 4px)"},children:e.jsx("img",{src:`/${a.cover}`,alt:"",className:"absolute inset-0 size-full",style:{objectFit:"cover",objectPosition:"top"}})}),e.jsxs("div",{className:"flex w-full shrink-0 flex-col gap-[12px] px-[12px] pb-[12px] pt-[16px]",children:[e.jsx("p",{className:"h-[28px] w-full truncate text-[16px] leading-[26px] tracking-[0.16px]",style:{fontFamily:P,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:a.title}),e.jsxs("div",{className:"flex w-full items-center gap-[12px]",children:[e.jsxs("div",{className:"flex h-[20px] min-w-0 flex-1 items-center gap-[4px]",children:[a.creatorAvatar?e.jsx("img",{src:`/${a.creatorAvatar}`,alt:"",className:"size-[18px] shrink-0 rounded-full"}):e.jsx(ee,{name:a.creator,size:18}),e.jsx("span",{className:"min-w-0 truncate text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:P,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:a.creator})]}),e.jsxs("div",{className:"flex shrink-0 items-center gap-[8px]",children:[e.jsxs("button",{className:"flex h-[32px] cursor-pointer items-center justify-center gap-[4px] rounded-[var(--radius-btn-s,4px)] bg-transparent px-[10px] py-[6px] transition-colors hover:bg-[var(--b-r02)]",style:{fontFamily:P,border:"0.5px solid var(--line-l3, rgba(0,0,0,0.3))"},onClick:x=>{x.stopPropagation(),n==null||n()},children:[e.jsx("span",{className:"text-[12px] font-medium leading-[20px] tracking-[0.12px]",style:{color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"Remix"}),e.jsx("span",{className:"text-[12px] leading-[20px] tracking-[0.12px]",style:{color:"rgba(0,0,0,0.5)"},children:a.remixes})]}),s?e.jsx("span",{className:"flex h-[32px] items-center rounded-[var(--radius-btn-s,4px)] px-[10px]",style:{background:"var(--main-m1-10, rgba(73,163,166,0.1))"},children:e.jsx("span",{className:"text-[12px] font-medium leading-[20px] tracking-[0.12px]",style:{fontFamily:P,color:"var(--main-m1, #49A3A6)"},children:"Subscribed"})}):e.jsxs("button",{className:"flex h-[32px] cursor-pointer items-center justify-center gap-[4px] rounded-[var(--radius-btn-s,4px)] border-none px-[10px] py-[6px] transition-opacity hover:opacity-90",style:{fontFamily:P,background:"var(--main-m1, #49A3A6)"},onClick:x=>{x.stopPropagation(),i()},children:[e.jsx("span",{className:"text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white",children:"Subscribe"}),e.jsx("span",{className:"text-[12px] leading-[20px] tracking-[0.12px]",style:{color:"rgba(255,255,255,0.5)"},children:a.subs})]})]})]})]})]});const p=ye(a);return p?e.jsx("div",{className:`h-[360.563px] ${xe} shrink-0`,onClick:r,children:e.jsx(Fe,{a:p,on:s,onToggleOn:()=>{s||i()}})}):null}const h="'Delight', sans-serif",ue={teal:"var(--main-m1, #49A3A6)",amber:"var(--main-m5, #E6A91A)"},me={teal:"var(--main-m1-10, rgba(73,163,166,0.1))",amber:"var(--main-m5-10, rgba(230,169,26,0.1))"};function G({children:a,size:s=16}){return e.jsx("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,className:"shrink-0",children:a})}const B={link:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M10 14a4 4 0 0 0 6 .4l3-3a4 4 0 0 0-5.7-5.7l-1.6 1.6"}),e.jsx("path",{d:"M14 10a4 4 0 0 0-6-.4l-3 3a4 4 0 0 0 5.7 5.7l1.6-1.6"})]}),automation:e.jsx("path",{d:"M13 3 5 13.5h5L9 21l8-10.5h-5z"}),target:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"8"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]}),bell:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"}),e.jsx("path",{d:"M10.5 19a1.5 1.5 0 0 0 3 0"})]})},he=[{id:"theme-tracker",label:"Theme Tracker",icon:"buld-l",kind:"playbook",prompts:["Build a theme tracker for AI infrastructure — NVDA, AVGO, TSM, and power-grid names","Track the GLP-1 / obesity theme — LLY, NVO, and the supply chain around them","Set up a tracker for the power & grid buildout — VRT, GEV, ETN"],cards:[{type:"playbook",title:"Hyperscaler Capex Tracker",cover:"playbook-cover-mag7.png",creator:"Macro Scope X",remixes:"32",subs:"489"},{type:"trade",time:"May 8, 12:00 PM",source:"ai-infra-basket",feed:"ai-infra-rebalance",signals:[{side:"Buy",ticker:"NVDA",note:"weight 38.2%",up:!0},{side:"Buy",ticker:"AAPL",note:"weight 31.4%",up:!0},{side:"Sell",ticker:"TSLA",note:"exit position",up:!1}],rebalance:"Rebalance: Top 3 by capex revisions: NVDA(38.2%), AAPL(31.4%), RKLB(30.4%)"},{type:"kol",time:"May 8, 10:40 AM",source:"ai-infra-basket",feed:"ai-infra-rebalance",kolAvatar:"avatar-kol-x.png",quote:'$NVDA Jensen Huang: "Demand for Blackwell is insane — everybody wants to have the most, and they want to be first."',ticker:"NVDA",side:"LONG",analysis:"Supply, not demand, remains the binding constraint. Capex read-through stays positive for the AI-infra basket."}]},{id:"smart-screener",label:"Smart Screener",icon:"target-l2",kind:"automation",prompts:["Screen US large-caps with rising earnings estimates and positive 20-day momentum, alert me on new entrants","Find quality names down 20%+ from highs with ROE above 20% and net cash","Screen for stocks where 3+ insiders bought within the last two weeks"],cards:[{type:"playbook",title:"MAG7 Equal-Weight Monthly Rebalance",cover:"playbook-cover-mag7.png",creator:"Alva_FinTwit_Tracker",creatorAvatar:"avatar-fintwit-tracker.png",remixes:"56",subs:"1.2K"},{type:"push",time:"May 8, 9:00 AM",source:"ai-diaspora-tracker",feed:"nvda-social-feed",title:"【Recursive Superintelligence】· DeepMind + OpenAI + Salesforce alliance, exits Stealth mid-May",bullets:["🧑 Founders: Tim Rocktäschel (fmr DeepMind Principal Scientist / UCL), Richard Socher (fmr Salesforce Chief Scientist), Josh Tobin & Jeff Clune (both fmr OpenAI)","🏢 New company: Recursive Superintelligence (Automate the full frontier AI R&D pipeline: eval / data / training / post-training)","💰 Round: $500M / $4B pre-money; round expected to close above $1B","📊 Technical Analysis: GLD has been weakening continuously"]},{type:"trade",time:"May 8, 12:00 PM",source:"space-rotation",feed:"nvda-social-feed",signals:[{side:"Buy",ticker:"AAPL",note:"weight 33.3%",up:!0},{side:"Buy",ticker:"RKLB",note:"weight 33.3%",up:!0},{side:"Buy",ticker:"NVDA",note:"weight 33.3%",up:!0},{side:"Sell",ticker:"TSLA",note:"exit position",up:!1}],rebalance:"Rebalance: Top 3 by 63d momentum: AAPL(78.2%), RKLB(35.1%), NVDA(34.0%)"},{type:"kol",time:"May 8, 12:00 PM",source:"space-rotation",feed:"nvda-social-feed",kolAvatar:"avatar-kol-x.png",quote:'$AMZN AWS CEO: "Compute demand is so excessive that we have never retired old A100s."',ticker:"NVDA",side:"LONG",analysis:"The bet is that excessive compute demand keeps old GPUs in service and supports AI-infra capacity providers. No risk view is stated."}]},{id:"deep-dive",label:"Deep Dive",icon:"search-l",kind:"playbook",prompts:["Deep-dive NVDA: revenue segmentation, peer valuation, supply chain, bull/bear thesis","Deep-dive TSM: node roadmap, pricing power, and the CoWoS bottleneck","Deep-dive AVGO: networking growth, VMware integration, custom-ASIC pipeline"],cards:[{type:"playbook",title:"NVDA Living Deep Dive",cover:"playbook-cover-mag7.png",creator:"Alva",remixes:"41",subs:"824"},{type:"push",time:"May 8, 8:30 AM",source:"nvda-deep-dive",feed:"nvda-deep-dive",title:"【NVDA ER Preview】· May 22 — implied move ±7.8% vs 8-quarter average ±5.1%",bullets:["📊 Data-center now 78% of revenue — +154% YoY, hyperscaler capex still accelerating","🏭 CoWoS remains the supply gate: TSM doubling capacity through 2025","💰 NTM P/E 34× vs AMD 28× — premium narrows on every guide-up","⚠️ Key risk: export controls and supply, not demand"]},{type:"kol",time:"May 8, 11:20 AM",source:"chip-insider-watch",feed:"nvda-deep-dive",kolAvatar:"avatar-kol-x.png",quote:`$NVDA "Every node ramp in history was demand-constrained. This one is supply-constrained — that's the whole thesis."`,ticker:"NVDA",side:"LONG",analysis:"Supply-gated growth supports pricing power through 2025. Watch CoWoS capacity adds and the May 22 ER as the next catalysts."}]},{id:"what-if",label:"What If",icon:"remix-l",kind:"automation",prompts:["What if NVDA falls 15% on an earnings miss — how does my book reprice?","What if the Fed cuts 50bp next meeting — which of my names benefit most?","What if the dollar spikes 5% — where is my book most exposed?"],cards:[{type:"push",time:"May 8, 10:05 AM",source:"book-shock-monitor",feed:"book-shock-monitor",title:"【Scenario fired】· NVDA −15% on an earnings miss — your book reprices −3.4%",bullets:["📉 Direct NVDA exposure −1.9%; AVGO / TSM correlation drift adds −1.5%","💵 USD +5% scenario: EM sleeve −9%, exporters −3% — book −1.7% total","🏦 Fed −50bp scenario: duration +6%, banks −2% — book +2.1%","⚠️ CPI lands 8:30 tomorrow — consensus 3.3%, a 2σ print re-triggers this alert"]},{type:"trade",time:"May 8, 12:00 PM",source:"book-shock-monitor",feed:"book-shock-monitor",signals:[{side:"Sell",ticker:"NVDA",note:"trim to 12% weight",up:!1},{side:"Buy",ticker:"AAPL",note:"weight 18.0%",up:!0},{side:"Sell",ticker:"TSLA",note:"exit position",up:!1}],rebalance:"Hedge: shift 6% from AI-infra into quality duration ahead of CPI"}]}],ge=[{id:"daily-macro-brief",label:"Daily Macro Brief",avatarSrc:"skill-daily-macro-brief.png",kind:"automation",cards:[{type:"push",time:"May 8, 7:30 AM",source:"daily-macro-brief",feed:"daily-macro-brief",title:"【Today's Brief】· CPI at 8:30, dollar bid overnight, 10Y backing up",bullets:["📅 CPI 8:30 — consensus 3.3%; a hot print pressures duration names","💵 DXY +0.6% overnight — exporters and EM sleeve exposed","📈 10Y 4.42% (+6bp) — rate-sensitives soft pre-open","🗓️ Also today: 3 Fed speakers, 10Y auction at 1:00 PM"]},{type:"kol",time:"May 8, 7:45 AM",source:"macro-scope-x",feed:"daily-macro-brief",kolAvatar:"avatar-kol-x.png",quote:'$TSLA "Rates above 4.4% are a tax on every long-duration growth story — autos with negative FCF most of all."',ticker:"TSLA",side:"SHORT",analysis:"The short thesis is rate-driven multiple compression, not demand. Invalidate if the 10Y breaks back below 4.2%."}]},{id:"earnings-edge",label:"Earnings Edge",avatarSrc:"skill-earnings-edge.png",kind:"automation",cards:[{type:"push",time:"May 8, 11:00 AM",source:"earnings-edge",feed:"earnings-edge",title:"【ER Setup】· NVDA reports May 22 — options imply ±7.8% vs 8-quarter average ±5.1%",bullets:["📊 Implied move ±7.8% — richest premium into an NVDA print since FY24 Q2","📈 COST beat + raise — gapping +3% pre-market","⚖️ ADBE in-line guide — implied move looks overpriced, premium-selling setup","🗓️ Next on the calendar: AVGO Jun 4, ORCL Jun 11"]},{type:"trade",time:"May 8, 1:00 PM",source:"earnings-edge",feed:"earnings-edge",signals:[{side:"Buy",ticker:"NVDA",note:"pre-ER weight 20.0%",up:!0},{side:"Buy",ticker:"AAPL",note:"weight 15.0%",up:!0},{side:"Sell",ticker:"TSLA",note:"exit before ER",up:!1}],rebalance:"ER book: long beats with cheap implied moves, flat into rich premiums"}]},{id:"crypto-pulse",label:"Crypto Pulse",avatarSrc:"skill-crypto-pulse.png",kind:"playbook",cards:[{type:"playbook",title:"Crypto Pulse — BTC Regime Tracker",cover:"playbook-cover-mag7.png",creator:"Crypto Pulse",remixes:"24",subs:"976"},{type:"push",time:"May 8, 6:00 AM",source:"crypto-pulse",feed:"crypto-pulse",title:"【Regime: Risk-on】· BTC +2.4% to $104,200 — funding neutral, breadth improving",bullets:["🟢 BTC $104,200 (+2.4%) — 30d trend +9.6%, regime stays risk-on","🔷 ETH $3,890 (+3.1%) — ETH/BTC ratio stabilizing after 3-week slide","🟣 SOL $216 (−1.2%) — lagging majors, watch the $210 shelf","🗓️ Next catalyst: FOMC minutes — funding flips fast on rate surprises"]}]},{id:"yield-hunter",label:"Yield Hunter",avatarSrc:"skill-yield-hunter.png",kind:"playbook",cards:[{type:"playbook",title:"Yield Hunter — 6.8% Blended Income",cover:"playbook-cover-mag7.png",creator:"Sheer YLL",remixes:"18",subs:"318"},{type:"trade",time:"May 8, 9:30 AM",source:"yield-hunter",feed:"yield-hunter",signals:[{side:"Buy",ticker:"AAPL",note:"weight 12.0%",up:!0},{side:"Buy",ticker:"NVDA",note:"weight 8.0%",up:!0},{side:"Sell",ticker:"TSLA",note:"no yield — exit",up:!1}],rebalance:"Income sleeve: rotate 4% from zero-yield growth into dividend growers"}]},{id:"dividend-diary",label:"Dividend Diary",avatarSrc:"skill-dividend-diary.png",kind:"playbook",cards:[{type:"playbook",title:"Dividend Diary — Income Compounder",cover:"playbook-cover-mag7.png",creator:"Dividend Diary",remixes:"21",subs:"512"},{type:"push",time:"May 8, 8:00 AM",source:"dividend-diary",feed:"dividend-diary",title:"【Income Diary】· $3,184 collected YTD — yield on cost 4.9% across 18 holdings",bullets:["🟢 SCHD 3.4% — core sleeve, raised the dividend 11% YoY","🏢 O 5.6% — monthly REIT, next ex-div Jun 25","⚠️ VZ 6.4% — payout 62%, watch FCF coverage after capex guide","🗓️ Ex-div this week: SCHD Jun 25, O Jun 28"]}]}],la=[{type:"skill",id:"theme-tracker"},{type:"skill",id:"smart-screener"},{type:"skill",id:"deep-dive"},{type:"kol",id:"daily-macro-brief"},{type:"kol",id:"earnings-edge"},{type:"kol",id:"crypto-pulse"},{type:"skill",id:"what-if"},{type:"kol",id:"yield-hunter"},{type:"kol",id:"dividend-diary"}],fe=[...$e,...ze,...Ee],oa=["Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names","Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts","Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators"],O=[{id:"telegram",label:"Telegram",logo:"logo-social-telegram.svg",handle:"@yggyll_tg",sub:"Bot DM — instant pushes"},{id:"discord",label:"Discord",logo:"logo-social-discord.svg",handle:"yggyll#0882",sub:"Bot DM — switch channels with /channel"},{id:"whatsapp",label:"WhatsApp",logo:"logo-social-whatsapp.svg",handle:"+1 ··· 4821",sub:"Business account DM"},{id:"slack",label:"Slack",logo:"logo-social-slack.svg",handle:"@yggyll · alva-hq",sub:"Alva app in your workspace"}],Z=[{id:"chat",label:"Chat",icon:"chat-l1"},{id:"tasks",label:"Tasks",icon:"step-l",count:be.length},{id:"memory",label:"Memory",icon:"brain-l"},{id:"alerts",label:"Alerts",icon:"notification-l",count:8},{id:"artifacts",label:"Artifacts",icon:"folder-l",count:ve.length}];function ca({state:a}){const s=a==="running";return e.jsxs("span",{className:"flex h-[22px] shrink-0 items-center gap-[5px] rounded-full px-[8px] text-[11px] leading-[18px] tracking-[0.11px]",style:{fontFamily:h,color:s?"var(--main-m1, #49A3A6)":"var(--main-m3, #2a9b7d)",background:s?"var(--main-m1-10, rgba(73,163,166,0.1))":"var(--main-m3-10, rgba(42,155,125,0.1))"},children:[e.jsx("span",{className:"size-[5px] rounded-full",style:{background:"currentcolor"}}),s?"Running":"Live"]})}function da({automation:a}){return e.jsxs("span",{className:"inline-flex h-[24px] items-center gap-[6px] rounded-[6px] px-[8px]",style:{border:"0.5px solid var(--line-l07, rgba(0,0,0,0.07))",background:"var(--b-r02, rgba(0,0,0,0.02))"},children:[e.jsx("span",{style:{color:"var(--main-m5, #E6A91A)"},children:e.jsx(G,{size:12,children:B.automation})}),e.jsxs("span",{className:"text-[11px] leading-[16px] tracking-[0.11px]",style:{fontFamily:h,color:"var(--text-n7, rgba(0,0,0,0.7))"},children:[a,e.jsx("span",{style:{color:"var(--text-n5, rgba(0,0,0,0.5))"},children:" · standalone automation"})]})]})}function ke({size:a=32}){return e.jsx("img",{src:"/logo-portrait.svg",alt:"Alva",className:"shrink-0 rounded-[4px]",style:{width:a,height:a}})}function F({pushed:a,time:s="Thursday 7:22 PM",children:i}){return e.jsxs("div",{className:"flex w-full items-start gap-[8px]",children:[e.jsx(ke,{size:22}),e.jsxs("div",{className:"flex min-w-0 flex-1 flex-col gap-[8px]",children:[e.jsxs("div",{className:"flex items-center gap-[8px]",children:[e.jsx("p",{className:"text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"Alva Agent"}),a&&e.jsx("span",{className:"rounded-[4px] px-[5px] text-[10px] leading-[16px] tracking-[0.3px]",style:{fontFamily:h,color:"var(--main-m1, #49A3A6)",background:"var(--main-m1-10, rgba(73,163,166,0.1))"},children:"pushed"}),e.jsx("p",{className:"text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:h,color:"var(--text-n5, rgba(0,0,0,0.5))"},children:s})]}),e.jsx("div",{className:"flex min-w-0 w-full flex-col gap-[12px]",children:i})]})]})}function pa({text:a}){return e.jsx("div",{className:"flex w-full flex-col items-end",children:e.jsx("div",{className:"max-w-[560px] rounded-[8px] px-[14px] py-[10px]",style:{background:"var(--main-m1-10, rgba(73,163,166,0.1))"},children:e.jsx("p",{className:"text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:a})})})}function xa(){return e.jsx("div",{className:"flex h-[22px] items-center gap-[4px]",children:[0,1,2].map(a=>e.jsx("span",{className:"size-[5px] animate-bounce rounded-full",style:{background:"var(--text-n3, rgba(0,0,0,0.3))",animationDelay:`${a*150}ms`}},a))})}const ua="@keyframes agent-msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }";function T({delay:a=0,children:s}){return e.jsx("div",{style:{animation:"agent-msg-in 0.35s ease-out both",animationDelay:`${a}ms`},children:s})}function ma({children:a}){const s=d.useRef(null),[i,n]=d.useState(!0),[r,l]=d.useState(!0),p=d.useCallback(()=>{const x=s.current;x&&(n(x.scrollLeft<=1),l(x.scrollLeft+x.clientWidth>=x.scrollWidth-1))},[]);return d.useEffect(()=>{p();const x=s.current;if(x)return x.addEventListener("scroll",p,{passive:!0}),window.addEventListener("resize",p),()=>{x.removeEventListener("scroll",p),window.removeEventListener("resize",p)}},[p]),e.jsxs("div",{className:"relative w-full",children:[e.jsx("div",{ref:s,className:"-mb-[30px] flex w-full gap-[16px] overflow-x-auto pb-[34px] pt-[12px]",style:{scrollbarWidth:"none"},children:a}),e.jsx("div",{className:"pointer-events-none absolute bottom-0 left-0 top-0 w-[80px] transition-opacity duration-200",style:{background:"linear-gradient(to right, #fff, rgba(255,255,255,0))",opacity:i?0:1}}),e.jsx("div",{className:"pointer-events-none absolute bottom-0 right-0 top-0 w-[80px] transition-opacity duration-200",style:{background:"linear-gradient(to left, #fff, rgba(255,255,255,0))",opacity:r?0:1}})]})}function ha({onNavigate:a}){var le,oe;const[i,n]=d.useState("chat"),[r,l]=d.useState(null),[p,x]=d.useState({}),[g,v]=d.useState([]),[o,m]=d.useState({telegram:!0}),[y,j]=d.useState("telegram"),[f,L]=d.useState(null),[we,E]=d.useState(!1),[se,q]=d.useState(!1),W=d.useRef(0),re=d.useRef(!1),U=d.useRef(o);U.current=o;const K=d.useRef(null),N=r?he.find(t=>t.id===r):null,S=r&&!N?ge.find(t=>t.id===r):null,H=N??S,$=r&&!N?fe.find(t=>t.id===r)??null:null,ne=(N==null?void 0:N.label)??(S==null?void 0:S.label)??($==null?void 0:$.label)??null,je=N?N.prompts:$?$.prompts.slice(0,3):oa,X=!N&&!S&&!!$,J=y?O.find(t=>t.id===y)??null:null,C=d.useCallback(()=>{requestAnimationFrame(()=>{var t;(t=K.current)==null||t.scrollTo({top:K.current.scrollHeight,behavior:"smooth"})})},[]),R=d.useCallback((t,c,u)=>{n("chat"),l(null);const w=++W.current;v(A=>[...A,{id:w,role:"user",text:t},{id:w+1,role:"typing"}]),C(),setTimeout(()=>{v(A=>A.filter(D=>D.id!==w+1).concat({id:w+2,role:"task",title:u,kind:c,state:"running"})),C(),setTimeout(()=>{v(A=>A.map(D=>D.id===w+2&&D.role==="task"?{...D,state:"done"}:D)),!Object.values(U.current).some(Boolean)&&!re.current&&(re.current=!0,setTimeout(()=>{v(A=>[...A,{id:++W.current,role:"imrec"}]),C()},1400))},4500)},1e3)},[C]),ie=d.useCallback(t=>{const c=/screen|alert|monitor|watch|what if/i.test(t)?"automation":"playbook";R(t,c,c==="automation"?"Automation: Smart Screener":`Build: ${t.slice(0,42)}…`)},[R]),I=d.useCallback((t,c,u)=>{n("chat");const w=++W.current;v(A=>[...A,{id:w,role:"typing"}]),C(),setTimeout(()=>{v(A=>A.filter(D=>D.id!==w).concat({id:w+1,role:"subpush",title:t,push:c,automation:u})),C()},700)},[C]),Ne=d.useCallback(t=>{x(c=>({...c,[Y(t)]:!0})),t.type==="playbook"?I(t.title,void 0,`${t.title} · run`):t.type==="push"?I(t.feed,t.title,t.source):t.type==="trade"?I(t.feed,t.rebalance,t.source):I(t.feed,`${t.ticker} ${t.side} — ${t.quote.slice(0,72)}…`,t.source)},[I]),Ae=d.useCallback(t=>{m(u=>({...u,[t]:!0})),j(u=>u??t);const c=O.find(u=>u.id===t);c&&(v(u=>[...u,{id:++W.current,role:"answer",text:`Connected to ${c.label} — pushes from this agent now mirror to ${c.handle}. Reply there or here, it's the same conversation.`}]),C())},[C]),Se=d.useCallback(t=>{const c={...U.current,[t]:!1};m(c),j(u=>{var w;return u===t?((w=O.find(A=>c[A.id]))==null?void 0:w.id)??null:u})},[]);return e.jsxs("div",{className:"flex min-h-0 min-w-0 flex-1 flex-col bg-white",children:[e.jsxs("div",{className:"flex shrink-0 items-center gap-[12px] px-[28px] py-[16px]",children:[e.jsx(ke,{}),e.jsxs("div",{className:"flex min-w-0 flex-1 flex-col",children:[e.jsx("p",{className:"truncate text-[14px] font-medium leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"Alva Agent"}),e.jsx("p",{className:"truncate text-[12px] leading-[20px] tracking-[0.12px]",style:{fontFamily:h,color:"var(--text-n5, rgba(0,0,0,0.5))"},children:"Your always-on investing co-pilot — turn any idea into a live playbook."})]}),J?e.jsxs("button",{className:"flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[4px] bg-transparent px-[12px] py-[6px] transition-colors hover:bg-[var(--b-r02)]",style:{fontFamily:h,border:"0.5px solid var(--line-l3, rgba(0,0,0,0.3))"},onClick:()=>E(!0),children:[e.jsx("img",{src:`/${J.logo}`,alt:"",className:"size-[16px] shrink-0 rounded-full"}),e.jsx("span",{className:"whitespace-nowrap text-[12px] leading-[20px] tracking-[0.12px]",style:{color:"var(--text-n9, rgba(0,0,0,0.9))"},children:J.label}),e.jsx("span",{className:"size-[6px] shrink-0 rounded-full",style:{background:"var(--main-m3, #2a9b7d)"}})]}):e.jsx("button",{className:"flex h-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-none px-[12px] py-[6px] transition-opacity hover:opacity-90",style:{fontFamily:h,background:"var(--main-m1, #49A3A6)"},onClick:()=>E(!0),children:e.jsx("span",{className:"whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white",children:"Connect"})}),e.jsx("button",{className:"flex size-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-transparent transition-colors hover:bg-[var(--b-r02)]",style:{border:"0.5px solid var(--line-l3, rgba(0,0,0,0.3))"},"aria-label":"Agent settings",onClick:()=>a("alva-agent"),children:e.jsx(b,{name:"settings-l",size:16,color:"var(--text-n9, rgba(0,0,0,0.9))"})})]}),e.jsx("div",{className:"flex shrink-0 items-start gap-[16px] px-[28px]",style:{borderBottom:"1px solid var(--line-l07, rgba(0,0,0,0.07))"},children:Z.map(t=>{const c=i===t.id;return e.jsxs("button",{className:"mb-[-1px] flex cursor-pointer items-center gap-[4px] bg-transparent px-0 pb-[6px]",style:{border:"none",borderBottom:c?"2px solid var(--main-m1, #49A3A6)":"2px solid transparent"},onClick:()=>n(t.id),children:[e.jsx(b,{name:t.icon,size:16,color:c?"var(--text-n9, rgba(0,0,0,0.9))":"var(--text-n7, rgba(0,0,0,0.7))"}),e.jsxs("span",{className:"whitespace-nowrap text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:c?"var(--text-n9, rgba(0,0,0,0.9))":"var(--text-n7, rgba(0,0,0,0.7))",fontWeight:c?500:400},children:[t.label,t.count!=null&&e.jsxs("span",{style:{color:"var(--text-n3, rgba(0,0,0,0.3))",fontWeight:400},children:[" (",t.count,")"]})]})]},t.id)})}),i==="chat"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{ref:K,className:"min-h-0 flex-1 overflow-y-auto px-[28px]",children:[e.jsx("style",{children:ua}),e.jsxs("div",{className:"mx-auto flex w-full max-w-[960px] flex-col gap-[28px] pb-[60px] pt-[28px]",children:[e.jsx(T,{children:e.jsx(F,{children:e.jsxs("div",{children:[e.jsx("p",{className:"text-[14px] font-medium leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"Hi. I am Alva"}),e.jsx("p",{className:"text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"Describe an investing idea in plain English and I'll turn it into a live playbook — a screener, a thesis, a backtest, or a tracker that keeps working after you close the tab."})]})})}),e.jsx(T,{delay:600,children:e.jsxs(F,{children:[e.jsx("p",{className:"text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"Pick a skill — build your own, or subscribe to a ready-made one:"}),e.jsxs("div",{className:"flex flex-wrap gap-[12px]",children:[la.map(t=>{if(t.type==="skill"){const u=he.find(w=>w.id===t.id);return u?e.jsx(Q,{icon:u.icon,label:u.label,active:r===u.id,onClick:()=>l(r===u.id?null:u.id)},u.id):null}const c=ge.find(u=>u.id===t.id);return c?e.jsx(Q,{avatar:e.jsx("img",{src:`/avatars/${c.avatarSrc}`,alt:"",className:"size-[22px] shrink-0 rounded-full object-cover"}),label:c.label,active:r===c.id,onClick:()=>l(r===c.id?null:c.id)},c.id):null}),e.jsx(Q,{label:"More",active:X,trailing:e.jsx(b,{name:"arrow-right-l2",size:14,color:X?"#fff":"var(--text-n9, rgba(0,0,0,0.9))"}),style:se&&!X?{background:"#f3f8f8",border:"0.5px solid rgba(73,163,166,0.45)"}:void 0,onClick:()=>q(!0)})]}),H&&e.jsx(ma,{children:H.cards.map(t=>e.jsx(ia,{card:t,subscribed:!!p[Y(t)],onSubscribe:()=>Ne(t),onRemix:t.type==="playbook"?()=>R(`Build my own version of ${t.title} — keep the idea, let me tweak the basket and rules`,H.kind,`Build: ${t.title} (remix)`):void 0,onOpen:t.type==="playbook"?()=>a("screener"):()=>L(ye(t))},Y(t)))},H.id)]})}),e.jsx(T,{delay:1200,children:e.jsxs(F,{children:[e.jsx("p",{className:"text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:ne?e.jsxs(e.Fragment,{children:["Or build your own ",e.jsx("span",{style:{fontWeight:500},children:ne})," — try one of these:"]}):"Or try one of these:"}),e.jsx("div",{className:"flex w-full flex-col overflow-hidden rounded-[8px]",style:{border:"0.5px solid var(--line-l2, rgba(0,0,0,0.2))"},children:je.map((t,c,u)=>e.jsxs("button",{className:"flex w-full cursor-pointer items-center gap-[8px] bg-transparent px-[16px] py-[13px] text-left transition-colors hover:bg-[var(--b-r02)]",style:{border:"none",borderBottom:c<u.length-1?"0.5px solid var(--line-l12, rgba(0,0,0,0.12))":"none"},onClick:()=>{N?R(t,N.kind,`${N.kind==="automation"?"Automation":"Build"}: ${N.label}`):S?R(t,S.kind,`${S.kind==="automation"?"Automation":"Build"}: ${S.label}`):ie(t)},children:[e.jsx("span",{className:"min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:t}),e.jsx(b,{name:"enter-l",size:16,color:"var(--text-n5, rgba(0,0,0,0.5))"})]},t))})]})}),g.map(t=>{if(t.role==="user")return e.jsx(T,{children:e.jsx(pa,{text:t.text})},t.id);if(t.role==="typing")return e.jsx(T,{children:e.jsx(F,{time:"now",children:e.jsx(xa,{})})},t.id);if(t.role==="answer")return e.jsx(T,{children:e.jsx(F,{time:"now",children:e.jsx("p",{className:"text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:t.text})})},t.id);if(t.role==="subpush")return e.jsx(T,{children:e.jsxs(F,{pushed:!0,time:"now",children:[e.jsxs("p",{className:"text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:[e.jsx("span",{style:{fontWeight:500},children:t.title})," is live in your workspace. ",t.push?"Here's the latest run — new ones will land right here.":"The first run lands with the next cycle — pushes will land right here."]}),t.push&&e.jsxs("div",{className:"flex items-center gap-[7px] self-start rounded-[6px] px-[9px] py-[6px]",style:{background:"var(--main-m5-10, rgba(230,169,26,0.1))"},children:[e.jsx("span",{style:{color:"var(--main-m5, #E6A91A)"},children:e.jsx(G,{size:13,children:B.bell})}),e.jsx("span",{className:"text-[12px] leading-[18px] tracking-[0.12px]",style:{fontFamily:h,color:"var(--text-n7, rgba(0,0,0,0.7))"},children:t.push})]}),e.jsx("div",{children:e.jsx(da,{automation:t.automation})})]})},t.id);if(t.role==="task"){const c=t.state==="done",u=t.kind==="automation";return e.jsx(T,{children:e.jsx(F,{time:"now",children:e.jsxs("div",{className:"flex w-full flex-col gap-[6px] rounded-[8px] px-[12px] py-[10px]",style:{border:"0.5px solid var(--line-l12, rgba(0,0,0,0.12))"},children:[e.jsxs("div",{className:"flex items-center gap-[8px]",children:[e.jsx("span",{className:"flex size-[22px] shrink-0 items-center justify-center rounded-[6px]",style:{background:u?me.amber:me.teal,color:u?ue.amber:ue.teal},children:e.jsx(G,{size:12,children:u?B.automation:B.target})}),e.jsx("p",{className:"min-w-0 flex-1 truncate text-[13px] font-medium leading-[20px] tracking-[0.13px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:t.title}),e.jsx(ca,{state:t.state})]}),e.jsxs("p",{className:"text-[12px] leading-[18px] tracking-[0.12px]",style:{fontFamily:h,color:"var(--text-n5, rgba(0,0,0,0.5))"},children:[c?u?"Live — pushes will land here. ":"Built and live — saved to Artifacts. ":"Background task — I'll post here when it's done. ",e.jsx("button",{className:"cursor-pointer border-none bg-transparent p-0 text-[12px] underline",style:{fontFamily:h,color:"var(--text-n7, rgba(0,0,0,0.7))"},onClick:()=>n(c?"artifacts":"tasks"),children:c?"View in Artifacts":"Track it in Tasks"})]})]})})},t.id)}return e.jsx(T,{children:e.jsxs(F,{time:"now",children:[e.jsx("p",{className:"text-[14px] leading-[22px] tracking-[0.14px]",style:{fontFamily:h,color:"var(--text-n9, rgba(0,0,0,0.9))"},children:"One more thing — this agent only lives on the Web right now. Connect Telegram or Discord and every push lands in your DM the moment it fires."}),e.jsxs("div",{className:"flex flex-wrap gap-[8px]",children:[e.jsxs("button",{className:"flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--b-r02)]",style:{fontFamily:h,border:"0.5px solid var(--line-l2, rgba(0,0,0,0.2))",color:"var(--text-n9, rgba(0,0,0,0.9))"},onClick:()=>E(!0),children:[e.jsx("img",{src:"/logo-social-telegram.svg",alt:"",className:"size-[15px] rounded-full"}),"Connect Telegram"]}),e.jsxs("button",{className:"flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--b-r02)]",style:{fontFamily:h,border:"0.5px solid var(--line-l2, rgba(0,0,0,0.2))",color:"var(--text-n9, rgba(0,0,0,0.9))"},onClick:()=>E(!0),children:[e.jsx(G,{size:14,children:B.link}),"See all IMs"]})]})]})},t.id)})]})]}),e.jsx("div",{className:"shrink-0 px-[28px] pb-[28px]",children:e.jsx("div",{className:"mx-auto w-full max-w-[960px]",children:e.jsx(Me,{shadow:!0,allowReferences:!1,hideInspector:!0,placeholder:"Ask Alva anything. @ for context, / for skills",onSend:ie})})})]}):i==="tasks"?e.jsx(_e,{}):i==="memory"?e.jsx(Pe,{}):i==="artifacts"?e.jsx(qe,{}):e.jsxs("div",{className:"flex min-h-0 flex-1 flex-col items-center justify-center gap-[10px]",children:[e.jsx(b,{name:((le=Z.find(t=>t.id===i))==null?void 0:le.icon)??"folder-l",size:28,color:"var(--text-n2, rgba(0,0,0,0.2))"}),e.jsxs("p",{className:"text-[13px] leading-[20px] tracking-[0.13px]",style:{fontFamily:h,color:"var(--text-n5, rgba(0,0,0,0.5))"},children:["The ",(oe=Z.find(t=>t.id===i))==null?void 0:oe.label.replace(/\s*\(\d+\)$/,"")," panel isn't wired in this prototype yet."]}),e.jsx("button",{className:"cursor-pointer border-none bg-transparent p-0 text-[13px] underline",style:{fontFamily:h,color:"var(--text-n7, rgba(0,0,0,0.7))"},onClick:()=>n("chat"),children:"Back to Chat"})]}),we&&e.jsx(Ke,{rows:O.map(t=>({id:t.id,name:t.label,sub:t.sub,handle:t.handle,logo:`/${t.logo}`})),connectedIds:O.filter(t=>o[t.id]).map(t=>t.id),activeId:y,onClose:()=>E(!1),onConnect:Ae,onDisconnect:Se,onSetActive:j}),se&&e.jsx(ra,{skills:fe,selectedId:r,onSelect:t=>{l(r===t?null:t),q(!1)},onClose:()=>q(!1)}),e.jsx(Le,{open:!!f,onClose:()=>L(null),feedName:(f==null?void 0:f.feedName)??"",alerts:f?[f]:void 0,description:"This automation runs on a fixed schedule and publishes new results to its subscribers. Each run pulls the latest data, applies the feed's logic, and writes a signal that powers the cards and alerts above. Open Settings → Automations to view full run logs and manage it."})]})}const k="font-['Delight',sans-serif]",ga=[{id:"ai-infra",title:"AI Infrastructure Tracker",author:"Alva Intern",cadence:"Real-time",accent:"#49A3A6",description:"Pushes when silicon, networking, or hyperscaler names break key levels.",items:[{id:"a1",mode:"Signal",time:"2m ago",status:"pushed",headline:"NVDA reclaimed its 20D MA on volume",digest:"Momentum flipped positive; relative strength vs SOX improving.",tags:["NVDA","momentum"]},{id:"a2",mode:"Digest",time:"1h ago",status:"skipped",headline:"Weekly hyperscaler capex recap",digest:"No threshold breach — held back to avoid noise.",tags:["capex","weekly"]}]},{id:"btc-macro",title:"BTC Macro Pulse",author:"Harry Zzz",cadence:"Daily",accent:"#E8833A",description:"Daily read on BTC trend, funding, and macro cross-currents.",items:[{id:"b1",mode:"Signal",time:"12m ago",status:"pushed",headline:"Funding reset to neutral after the flush",digest:"OI down 8%, basis normalizing — squeeze risk easing.",tags:["BTC","funding"]}]}];function fa({status:a}){const s=a==="pushed";return e.jsxs("span",{className:`${k} inline-flex items-center gap-[5px] rounded-full px-[8px] py-[2px] text-[11px] leading-[18px] tracking-[0.11px]`,style:{color:s?"var(--main-m1, #49A3A6)":"var(--text-n5, rgba(0,0,0,0.5))",background:s?"var(--main-m1-10)":"var(--b-r05)"},children:[e.jsx("span",{className:"size-[5px] rounded-full",style:{background:s?"var(--main-m1, #49A3A6)":"rgba(0,0,0,0.28)"}}),s?"pushed":"skipped"]})}function ja({activeFeed:a,activeFeedId:s,onSelect:i,onNavigate:n}){return e.jsxs("section",{className:"flex flex-col gap-[14px] w-full",children:[e.jsxs("div",{className:"flex flex-col gap-[4px] sm:flex-row sm:items-end sm:justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-[2px] min-w-0",children:[e.jsx("p",{className:`${k} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`,children:"Live feeds from Playbooks"}),e.jsx("p",{className:`${k} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`,children:"Preview only. Connect Alva Agent to receive these pushes in Telegram or Discord."})]}),e.jsxs("button",{type:"button",onClick:()=>n==null?void 0:n("template-notification"),className:`${k} flex items-center gap-[4px] self-start sm:self-auto text-[12px] leading-[20px] tracking-[0.12px] cursor-pointer border-none bg-transparent p-0 transition-colors hover:text-[var(--text-n9)]`,style:{color:"var(--text-n5)"},children:["Open playbook feed",e.jsx(b,{name:"arrow-right-l1",size:12,color:"currentColor"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-[286px_minmax(0,1fr)] gap-[16px] w-full items-start",children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-[8px] w-full",children:ga.map(r=>{const l=s===r.id;return e.jsxs("button",{type:"button",onClick:()=>i(r.id),className:"flex flex-col gap-[5px] text-left cursor-pointer rounded-[8px] p-[12px] transition-colors",style:{background:l?"var(--b0-container, #fff)":"rgba(255,255,255,0.58)",border:`0.5px solid ${l?r.accent:"var(--line-l07)"}`,boxShadow:l?"0 10px 24px rgba(0,0,0,0.06)":"none"},children:[e.jsxs("div",{className:"flex items-center gap-[8px] w-full",children:[e.jsx("span",{className:"size-[8px] rounded-full shrink-0",style:{background:r.accent}}),e.jsx("span",{className:`${k} min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`,children:r.title})]}),e.jsxs("span",{className:`${k} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] truncate`,children:["@",r.author," · ",r.cadence]})]},r.id)})}),e.jsxs("div",{className:"flex flex-col gap-[10px] min-w-0",children:[e.jsxs("div",{className:"flex flex-col gap-[4px] rounded-[8px] px-[14px] py-[12px]",style:{background:"rgba(255,255,255,0.72)",border:"0.5px solid var(--line-l07)"},children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-[8px]",children:[e.jsx("span",{className:"size-[8px] rounded-full",style:{background:a.accent}}),e.jsx("p",{className:`${k} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`,children:a.title}),e.jsx("span",{className:`${k} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`,children:a.cadence})]}),e.jsx("p",{className:`${k} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`,children:a.description})]}),e.jsx("div",{className:"flex flex-col gap-[8px]",children:a.items.map(r=>e.jsxs("article",{className:"grid grid-cols-[28px_minmax(0,1fr)] gap-[10px] rounded-[8px] px-[12px] py-[12px]",style:{background:"var(--b0-container, #fff)",border:"0.5px solid var(--line-l07)",boxShadow:"0 8px 22px rgba(0,0,0,0.045)"},children:[e.jsx("div",{className:"flex items-center justify-center size-[28px] rounded-full shrink-0",style:{background:`${a.accent}18`},children:e.jsx("span",{className:`${k} text-[12px] leading-[20px] tracking-[0.12px]`,style:{color:a.accent},children:"A"})}),e.jsxs("div",{className:"flex flex-col gap-[8px] min-w-0",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-[6px] min-w-0",children:[e.jsx("span",{className:`${k} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n7)]`,children:r.mode}),e.jsx("span",{className:`${k} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n3)]`,children:r.time}),e.jsx(fa,{status:r.status})]}),e.jsxs("div",{className:"flex flex-col gap-[4px] min-w-0",children:[e.jsx("p",{className:`${k} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`,children:r.headline}),e.jsx("p",{className:`${k} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`,children:r.digest})]}),e.jsx("div",{className:"flex flex-wrap gap-[6px]",children:r.tags.map(l=>e.jsx("span",{className:`${k} rounded-full px-[7px] py-[1px] text-[11px] leading-[18px] tracking-[0.11px]`,style:{color:"var(--text-n7)",background:"var(--b-r05)"},children:l},l))})]})]},r.id))})]})]})]})}function Na({onNavigate:a}){return e.jsx(De,{activePage:"agent",onNavigate:a,children:e.jsx("div",{className:"h-screen flex flex-col bg-white",children:e.jsx(ha,{onNavigate:a})})})}export{ja as PlaybookFeedPreview,Na as default};
