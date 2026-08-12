import{r as s,j as e}from"./index-C_2GSu28.js";import{u as j,A as P,C as f,e as E,b as N}from"./AppShell-CSJ6le3R.js";import{c as M,b as D,a as B}from"./PlaybookCard-C7j10f7C.js";import{T as O,a as R,P as z}from"./TrendingFilterBar-4gI4loSM.js";import"./referral-mock-DJxnAaFy.js";const a=r=>`/figma/explore/${r}`,L=new Set(["Smart Screener","Theme Tracker","AI Digest"]),U=9,p={creator:"Macro Scope X",title:"Inflection Point Screener",description:"Screens 948 mid-caps daily for margin acceleration, revenue inflection, and profitability crossover. Top decile with 90-day holding period",tickers:["BTC","ETH"],stars:"12.8K",remixes:3},k=[{id:"btc-ultimate-ai-trader",creator:"Alva Intern",title:"BTC Ultimate AI Trader",description:"This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements, it strategically accumulates during bumpy markets.",tickers:["BTC"],pulse:"active",stars:12800,remixes:3,cover:{template:"screener",title:"BTC Ultimate AI Trader",author:"Alva Intern",tickers:["BTC"],coverImageUrl:a("card-btc-ultimate.png")}},{id:"mag7-equal-weight-monthly-rebalance",creator:"Alva Intern",title:"MAG7 Equal-Weight Monthly Rebalance",description:"Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly",tickers:[],pulse:"active",stars:12800,remixes:3,price:"$50",cover:{template:"what-if",title:"MAG7 Equal-Weight Monthly Rebalance",author:"Alva Intern",tickers:[],coverImageUrl:a("card-mag7-rebalance.png")}},{id:"pepe-long-vs-btc-short",creator:"Alva Intern",title:"PEPE Long vs BTC Short Monthly Rebalance",description:"The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.",tickers:["PEPE","BTC"],pulse:"active",stars:12800,remixes:3,cover:{template:"what-if",title:"PEPE Long vs BTC Short Monthly Rebalance",author:"Alva Intern",tickers:["PEPE","BTC"],coverImageUrl:a("card-pepe-btc.png")}},{id:"attribution-analysis-price-trends",creator:"Alva Intern",title:"Attribution Analysis Strategy for Price Trends",description:"Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.",tickers:["BTC","ETH"],pulse:"active",stars:12800,remixes:3,cover:{template:"thesis",title:"Attribution Analysis Strategy for Price Trends",author:"Alva Intern",tickers:["BTC","ETH"],coverImageUrl:a("card-attribution.png")}},{id:"btc-macd-1h-simple-crossover",creator:"Alva Intern",title:"BTC MACD 1h Simple Crossover",description:"Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.",tickers:["BTC"],pulse:"active",stars:12800,remixes:3,cover:{template:"screener",title:"BTC MACD 1h Simple Crossover",author:"Alva Intern",tickers:["BTC"],coverImageUrl:a("card-btc-macd.png")}},{id:"nvda-triggered-tsm",creator:"Alva Intern",title:"NVDA +3% Triggered TSM TP/SL",description:"Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.",tickers:["NVDA","TSM"],pulse:"active",stars:12800,remixes:3,price:"$50",cover:{template:"what-if",title:"NVDA +3% Triggered TSM TP/SL",author:"Alva Intern",tickers:["NVDA","TSM"],coverImageUrl:a("card-nvda-tsm.png")}},{id:"eth-daily-price-change",creator:"Alva Intern",title:"ETH Daily Price & Change Tracker",description:"Tracks daily prices and daily percentage changes for ETH in a single table for quick monitoring.",tickers:["ETH"],pulse:"idle",stars:12800,remixes:3,price:"$50",cover:{template:"screener",title:"ETH Daily Price & Change Tracker",author:"Alva Intern",tickers:["ETH"],coverImageUrl:a("card-eth-daily.png")}},{id:"short-squeeze-risk-map",creator:"Alva Intern",title:"Short-Squeeze Risk Map",description:"This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts.",tickers:[],pulse:"idle",stars:12800,remixes:3,cover:{template:"thesis",title:"Short-Squeeze Risk Map",author:"Alva Intern",tickers:[],coverImageUrl:a("card-short-squeeze.png")}},{id:"nvda-trading-research-dashboard",creator:"Alva Intern",title:"NVDA Trading Strategy Research Dashboard",description:"Multi-timeframe NVDA price/volume context, trend & momentum, relative strength vs market/sector, flow/derivatives proxies, earnings/event stats.",tickers:["NVDA"],pulse:"idle",stars:12800,remixes:3,cover:{template:"thesis",title:"NVDA Trading Strategy Research Dashboard",author:"Alva Intern",tickers:["NVDA"],coverImageUrl:a("card-nvda-research.png")}},{id:"us-crypto-dat-monitor",creator:"Alva Intern",title:"US Crypto DAT Companies Monitor",description:"Feed incorporates both real anomaly signals and reference cases for interpretation. Update frequencies adjusted as new PTR, Form 4, and 10b5-1 filings are parsed.",tickers:[],pulse:"idle",stars:12800,remixes:3,price:"$50",cover:{template:"screener",title:"US Crypto DAT Companies Monitor",author:"Alva Intern",tickers:[],coverImageUrl:a("card-crypto-dat.png")}},{id:"google-x-trends-tracker",creator:"Alva Intern",title:"Google / X Trends Tracker",description:"Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.",tickers:["GOOGL"],pulse:"idle",stars:12800,remixes:3,cover:{template:"screener",title:"Google / X Trends Tracker",author:"Alva Intern",tickers:["GOOGL"],coverImageUrl:a("card-google-trends.png")}},{id:"qqq-triggers-nvda-take-profit",creator:"Alva Intern",title:"QQQ +2% Day Triggers NVDA Take-Profit",description:"Aggregates real-time data across multiple DEX platforms to identify high-potential Golden Dog meme tokens. Alerts are triggered on sudden volume spikes, KOL mentions, or on-chain activity.",tickers:["QQQ","SOL"],pulse:"idle",stars:12800,remixes:3,price:"$50",cover:{template:"what-if",title:"QQQ +2% Day Triggers NVDA Take-Profit",author:"Alva Intern",tickers:["QQQ","SOL"],coverImageUrl:a("card-qqq-nvda.png")}}];function q(r,t){const d=`${t.title} ${t.description} ${t.tickers.join(" ")} ${t.cover.template}`.toLowerCase(),u=r.toLowerCase();return r==="Smart Screener"&&t.cover.template==="screener"||r==="Theme Tracker"&&t.cover.template==="thesis"||r==="What-if"&&t.cover.template==="what-if"||r==="Thesis"&&t.cover.template==="thesis"||t.tickers.some(n=>n.toLowerCase()===u)?!0:d.includes(u)}function $(){const r=D({template:"screener",tickers:p.tickers});return e.jsxs("section",{className:"explore-featured","aria-label":p.title,children:[e.jsxs("div",{className:"explore-featured-copy",children:[e.jsxs("div",{className:"explore-featured-creator",children:[e.jsx(N,{name:p.creator,size:24}),e.jsx("span",{children:p.creator})]}),e.jsxs("div",{className:"explore-featured-text",children:[e.jsx("h2",{children:p.title}),e.jsx("p",{children:p.description})]}),e.jsx("div",{className:"explore-featured-tags",children:e.jsx(B,{tags:r})}),e.jsxs("div",{className:"explore-featured-meta",children:[e.jsxs("span",{children:[e.jsx(f,{name:"show-l",size:16}),p.stars]}),e.jsxs("span",{children:[e.jsx(f,{name:"remix-l",size:16}),p.remixes]})]})]}),e.jsx("div",{className:"explore-featured-preview",children:e.jsx("img",{src:a("featured-preview.png"),alt:""})})]})}function F({sort:r,onSortChange:t,selectedChips:d,onChipToggle:u,searchQuery:n,onSearchChange:v}){const[l,h]=s.useState(!1),c=s.useRef(null);return s.useEffect(()=>{if(!l)return;const x=requestAnimationFrame(()=>{var b;return(b=c.current)==null?void 0:b.focus()});return()=>cancelAnimationFrame(x)},[l]),e.jsx("div",{className:"explore-filters",children:e.jsx(O,{sort:r,sortOptions:z,chips:R,selectedChips:d,onSortChange:t,onChipToggle:u,trailing:l?e.jsxs("div",{className:"input input-sm explore-search-input",children:[e.jsx("div",{className:"input-border"}),e.jsx(f,{name:"search-l",size:14,color:"var(--text-n3, rgba(0,0,0,0.3))"}),e.jsx("input",{ref:c,type:"text",className:"input-field",placeholder:"Search",value:n,onChange:x=>v(x.target.value),onBlur:()=>{n.trim()||h(!1)},onKeyDown:x=>{x.key==="Escape"&&(v(""),h(!1))}})]}):e.jsxs("button",{type:"button",className:"input input-sm explore-search-trigger",onClick:()=>h(!0),"aria-label":"Search",children:[e.jsx("div",{className:"input-border"}),e.jsx(f,{name:"search-l",size:14,color:"var(--text-n3, rgba(0,0,0,0.3))"}),e.jsx("span",{className:"input-field explore-search-placeholder",children:"Search"})]})})})}function K({onNavigate:r}){const t=j(),[d,u]=s.useState("Popular"),[n,v]=s.useState(()=>new Set(L)),[l,h]=s.useState(!1),[c,x]=s.useState(""),[b,w]=s.useState(()=>new Set(t.followedPlaybookId?[t.followedPlaybookId]:[])),A=t.activeTask==="playbook",y=s.useMemo(()=>{let o=d==="Recent"?[...k].reverse():k;l&&n.size>0&&(o=o.filter(m=>{for(const T of n)if(q(T,m))return!0;return!1}));const g=c.trim().toLowerCase();return g&&(o=o.filter(m=>`${m.title} ${m.description} ${m.creator} ${m.tickers.join(" ")} ${m.cover.template}`.toLowerCase().includes(g))),o},[l,c,n,d]),I=s.useMemo(()=>l||c.trim()?y:y.slice(0,U),[l,y,c]),S=i=>{h(!0),v(o=>{const g=new Set(o);return g.has(i)?g.delete(i):g.add(i),g})},C=i=>{w(o=>new Set(o).add(i)),E("playbook",{followedPlaybookId:i})};return e.jsxs(P,{activePage:"explore",onNavigate:r,children:[e.jsx("style",{children:`
        .explore-page {
          min-height: 100%;
          background: #fff;
          padding: 56px 28px 48px;
          font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .explore-inner {
          width: 100%;
          max-width: 2048px;
          margin: 0 auto;
          container: explore-content / inline-size;
        }
        .explore-title {
          margin: 0;
          font-size: 28px;
          line-height: 38px;
          font-weight: 400;
          letter-spacing: 0.28px;
          color: var(--text-n9, rgba(0,0,0,0.9));
        }
        .explore-setup-hint {
          display: flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          margin-top: 12px;
          padding: 7px 10px;
          border: 0.5px solid rgba(73, 163, 166, 0.22);
          border-radius: 6px;
          background: rgba(73, 163, 166, 0.08);
          color: var(--text-n7, rgba(0,0,0,0.7));
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.12px;
        }
        .explore-featured {
          margin-top: 24px;
          height: 204px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 368px;
          border: 0.5px solid var(--line-l3, rgba(0,0,0,0.3));
          border-radius: var(--radius-ct-l, 8px);
          overflow: hidden;
          background: #fff2e1;
        }
        .explore-featured-copy {
          min-width: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          overflow: hidden;
        }
        .explore-featured-creator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-n7, rgba(0,0,0,0.7));
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.12px;
          white-space: nowrap;
        }
        .explore-featured-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          min-width: 0;
          margin-top: 12px;
        }
        .explore-featured-text h2 {
          margin: 0;
          color: var(--text-n9, rgba(0,0,0,0.9));
          font-size: 20px;
          line-height: 30px;
          font-weight: 400;
          letter-spacing: 0.2px;
        }
        .explore-featured-text p {
          margin: 0;
          color: var(--text-n5, rgba(0,0,0,0.5));
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .explore-featured-tags {
          width: 100%;
          padding-top: 12px;
        }
        .explore-featured-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
        }
        .explore-featured-meta span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-n9, rgba(0,0,0,0.9));
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 0.14px;
        }
        .explore-featured-preview {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 24px 24px 0;
          overflow: hidden;
        }
        .explore-featured-preview img {
          width: 320px;
          height: 180px;
          display: block;
          object-fit: cover;
          object-position: center top;
          border: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
          border-bottom: 0;
          border-radius: 8px 8px 0 0;
          box-shadow: var(--shadow-xs, 0 4px 15px 0 rgba(0,0,0,0.05));
        }
        .explore-filters {
          margin-top: 48px;
          width: 100%;
          height: 28px;
          display: flex;
          align-items: center;
        }
        .explore-search-trigger,
        .explore-search-input {
          flex: 0 0 160px;
          width: 160px;
          gap: 4px;
        }
        .explore-search-trigger {
          appearance: none;
          margin: 0;
          border: 0;
          justify-content: flex-start;
          font-family: inherit;
          color: var(--text-n3, rgba(0,0,0,0.3));
          text-align: left;
          cursor: pointer;
        }
        .explore-search-input {
          z-index: 1;
        }
        .explore-search-input .input-border {
          border: 1px solid var(--line-l9, rgba(0,0,0,0.9));
        }
        .explore-search-trigger .input-border {
          border: 0.5px solid var(--line-l3, rgba(0,0,0,0.3));
        }
        .explore-search-input .input-field {
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.12px;
        }
        .explore-search-placeholder {
          color: var(--text-n3, rgba(0,0,0,0.3));
          text-align: left;
          pointer-events: none;
        }
        .explore-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 324px), 1fr));
          gap: 16px;
        }
        @media (max-width: 960px) {
          .explore-page {
            padding: 32px 16px 40px;
          }
          .explore-featured {
            height: auto;
            grid-template-columns: 1fr;
          }
          .explore-featured-preview {
            padding: 0 20px 0;
            justify-content: flex-start;
          }
          .explore-featured-preview img {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            border-bottom: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .explore-featured-text p {
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        @media (max-width: 720px) {
          .explore-filters {
            height: auto;
            margin-top: 28px;
          }
          .explore-search-trigger,
          .explore-search-input {
            flex: 1 1 160px;
            width: auto;
          }
        }
      `}),e.jsx("main",{className:"explore-page",children:e.jsxs("div",{className:"explore-inner",children:[e.jsx("h1",{className:"explore-title",children:"Explore"}),t.activeTask==="playbook"&&e.jsxs("div",{className:"explore-setup-hint",role:"status",children:[e.jsx(f,{name:"star-l",size:15,color:"var(--main-m1, #49a3a6)"}),"Subscribe to one Playbook to complete this setup task."]}),e.jsx($,{}),e.jsx(F,{sort:d,onSortChange:u,selectedChips:n,onChipToggle:S,searchQuery:c,onSearchChange:x}),e.jsx("section",{className:"explore-grid",children:I.map(i=>e.jsx(M,{p:i,followed:b.has(i.id),onFollow:A?()=>C(i.id):void 0},i.id))})]})})]})}export{K as default};
