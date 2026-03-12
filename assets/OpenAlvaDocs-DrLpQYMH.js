import{r as h,j as e}from"./index-DALvcFfh.js";import{A,U as w}from"./AppShell-4q05Sw31.js";const S=[{id:"overview",label:"Overview",level:1},{id:"installation",label:"Installation & Setup",level:1},{id:"filesystem",label:"Filesystem",level:1},{id:"js-runtime",label:"JS Runtime",level:1},{id:"sdkhub",label:"SDK Hub",level:2},{id:"feed-sdk",label:"Feed SDK",level:1},{id:"trading-engine",label:"Trading Engine",level:1},{id:"deployment",label:"Deployment",level:1},{id:"pitfalls",label:"Common Pitfalls",level:1},{id:"limits",label:"Resource Limits",level:1},{id:"errors",label:"Error Responses",level:1}];function c({code:a,lang:i="bash"}){const[n,o]=h.useState(!1),m=()=>{navigator.clipboard.writeText(a),o(!0),setTimeout(()=>o(!1),2e3)};return e.jsxs("div",{className:"relative group rounded-[6px] overflow-hidden my-[16px]",children:[e.jsxs("div",{className:"flex items-center justify-between px-[16px] py-[8px] bg-[#1a1b1e] border-b border-white/5",children:[e.jsx("span",{className:"text-[11px] text-white/30 font-mono uppercase tracking-wider",children:i}),e.jsx("button",{onClick:m,className:"text-[11px] text-white/30 hover:text-white/60 transition-colors font-mono cursor-pointer",children:n?"Copied!":"Copy"})]}),e.jsx("pre",{className:"bg-[#111214] px-[16px] py-[14px] overflow-x-auto",children:e.jsx("code",{className:"text-[13px] leading-[22px] text-[#e4e4e7] font-mono whitespace-pre",children:a})})]})}function l({headers:a,rows:i}){return e.jsx("div",{className:"overflow-x-auto my-[16px] rounded-[6px] border border-black/[0.06]",children:e.jsxs("table",{className:"w-full text-[13px] leading-[20px]",children:[e.jsx("thead",{children:e.jsx("tr",{className:"bg-black/[0.02]",children:a.map((n,o)=>e.jsx("th",{className:"text-left px-[12px] py-[10px] font-medium text-black/70 border-b border-black/[0.06] font-['Delight',sans-serif]",children:n},o))})}),e.jsx("tbody",{children:i.map((n,o)=>e.jsx("tr",{className:o%2===1?"bg-black/[0.015]":"",children:n.map((m,g)=>e.jsx("td",{className:"px-[12px] py-[8px] text-black/60 border-b border-black/[0.04] font-['Delight',sans-serif]",children:e.jsx("code",{className:"text-[12px] font-mono",children:m})},g))},o))})]})})}function d({id:a,children:i}){return e.jsx("h1",{id:a,className:"text-[28px] font-medium leading-[36px] text-black/90 mt-[48px] mb-[16px] font-['Delight',sans-serif] scroll-mt-[32px]",children:i})}function k({id:a,children:i}){return e.jsx("h2",{id:a,className:"text-[22px] font-medium leading-[30px] text-black/90 mt-[40px] mb-[12px] font-['Delight',sans-serif] scroll-mt-[32px]",children:i})}function t({children:a}){return e.jsx("h3",{className:"text-[18px] font-medium leading-[26px] text-black/80 mt-[32px] mb-[8px] font-['Delight',sans-serif]",children:a})}function r({children:a}){return e.jsx("p",{className:"text-[14px] leading-[24px] text-black/60 mb-[12px] font-['Delight',sans-serif]",children:a})}function s({children:a}){return e.jsx("code",{className:"text-[13px] bg-black/[0.04] px-[5px] py-[2px] rounded-[3px] font-mono text-black/70",children:a})}function D({activeId:a}){return e.jsxs("nav",{className:"hidden xl:block w-[200px] shrink-0 sticky top-[32px] self-start",children:[e.jsx("p",{className:"text-[11px] uppercase tracking-[1px] text-black/30 mb-[12px] font-['Delight',sans-serif]",children:"On this page"}),e.jsx("ul",{className:"flex flex-col gap-[2px]",children:S.map(i=>e.jsx("li",{children:e.jsx("button",{onClick:()=>{var n;return(n=document.getElementById(i.id))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},className:`block text-left w-full text-[13px] leading-[28px] transition-colors font-['Delight',sans-serif] cursor-pointer ${i.level===2?"pl-[12px]":""} ${a===i.id?"text-[#49a3a6] font-medium":"text-black/40 hover:text-black/70"}`,children:i.label})},i.id))})]})}function f({icon:a,title:i,desc:n}){return e.jsxs("div",{className:"flex gap-[12px] items-start p-[16px] rounded-[8px] bg-black/[0.02] border border-black/[0.04]",children:[e.jsx("span",{className:"text-[20px] shrink-0 mt-[2px]",children:a}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[14px] font-medium text-black/80 font-['Delight',sans-serif]",children:i}),e.jsx("p",{className:"text-[13px] text-black/50 font-['Delight',sans-serif] mt-[2px]",children:n})]})]})}function P(){const[a,i]=h.useState(!1),n="npm install -g @anthropic/open-alva";return e.jsxs("div",{onClick:()=>{navigator.clipboard.writeText(n),i(!0),setTimeout(()=>i(!1),2e3)},className:"inline-flex items-center gap-[12px] bg-[#111214] rounded-[8px] px-[20px] py-[12px] cursor-pointer hover:bg-[#1a1b1e] transition-colors",children:[e.jsx("code",{className:"text-[14px] text-[#e4e4e7] font-mono",children:n}),e.jsx("span",{className:"text-[12px] text-white/30",children:a?"Copied!":"Click to copy"})]})}function I({onNavigate:a,onOpenSearch:i}){const[n,o]=h.useState(!1),[m,g]=h.useState("overview"),j=h.useRef(null),b=h.useCallback(()=>{var x;(x=j.current)==null||x.disconnect();const p=S.map(u=>document.getElementById(u.id)).filter(Boolean);p.length!==0&&(j.current=new IntersectionObserver(u=>{const y=u.filter(v=>v.isIntersecting);if(y.length>0){const v=y.reduce((T,N)=>T.boundingClientRect.top<N.boundingClientRect.top?T:N);g(v.target.id)}},{rootMargin:"-32px 0px -60% 0px",threshold:0}),p.forEach(u=>j.current.observe(u)))},[]);return h.useEffect(()=>{const p=setTimeout(b,100);return()=>{var x;clearTimeout(p),(x=j.current)==null||x.disconnect()}},[b]),e.jsxs(e.Fragment,{children:[e.jsx(A,{activePage:"docs",onNavigate:a,onOpenSearch:i,onUserMouseEnter:()=>o(!0),onUserMouseLeave:()=>o(!1),children:e.jsx("div",{className:"flex justify-center min-h-full",children:e.jsxs("div",{className:"flex gap-[48px] px-[28px] py-[64px] w-full max-w-[1100px]",children:[e.jsxs("article",{className:"flex-1 min-w-0 max-w-[800px]",children:[e.jsxs("div",{className:"mb-[48px]",children:[e.jsxs("div",{className:"flex items-center gap-[10px] mb-[8px]",children:[e.jsx("div",{className:"w-[8px] h-[8px] rounded-full bg-[#49a3a6]"}),e.jsx("span",{className:"text-[12px] uppercase tracking-[2px] text-black/30 font-['Delight',sans-serif]",children:"Documentation"})]}),e.jsx("h1",{className:"text-[36px] font-medium leading-[44px] text-black/90 mb-[12px] font-['Delight',sans-serif]",children:"Open Alva"}),e.jsx("p",{className:"text-[18px] leading-[28px] text-black/50 mb-[24px] font-['Delight',sans-serif]",children:"Financial data & quantitative trading platform for AI agents."}),e.jsx(P,{})]}),e.jsx(d,{id:"overview",children:"What is Open Alva"}),e.jsx(r,{children:"Open Alva exposes five core capabilities via REST APIs, giving your AI agent full access to financial data, computation, and trading infrastructure."}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-[12px] my-[20px]",children:[e.jsx(f,{icon:"📁",title:"Filesystem",desc:"Persistent storage with permissions, symlinks, and synth mounts for time series data."}),e.jsx(f,{icon:"⚡",title:"JS Runtime",desc:"V8 isolate with 250+ financial data SDKs, HTTP, and the Feed SDK."}),e.jsx(f,{icon:"📊",title:"SDK Hub",desc:"Technical indicators, crypto/stock data, on-chain metrics, macro data, and LLM access."}),e.jsx(f,{icon:"📈",title:"Trading Engine",desc:"Altra backtesting framework for event-driven quantitative strategies."}),e.jsx(f,{icon:"🚀",title:"Deployment",desc:"Schedule scripts as cronjobs for continuous data feeds and automated tasks."})]}),e.jsx(d,{id:"installation",children:"Installation & Setup"}),e.jsx(t,{children:"Configuration"}),e.jsxs(r,{children:["Create ",e.jsx(s,{children:"~/.alva/user.json"})," with your credentials:"]}),e.jsx(c,{lang:"json",code:`{
  "endpoint": "http://localhost:3000",
  "api_key": "alva_local_dev"
}`}),e.jsx(l,{headers:["Field","Required","Description"],rows:[["endpoint","yes","Alva API base URL"],["api_key","yes","Your API key (create via Alva web app)"],["user_id","no","Numeric user ID (GET /api/v1/me)"],["username","no","Your username"]]}),e.jsx(t,{children:"Authentication"}),e.jsxs(r,{children:["Every request requires the ",e.jsx(s,{children:"X-Alva-Api-Key"})," header:"]}),e.jsx(c,{code:`curl -s -H "X-Alva-Api-Key: $ALVA_API_KEY" "$ALVA_ENDPOINT/api/v1/me"
# Response: {"id":1,"username":"alice"}`}),e.jsx(t,{children:"Load Config from Shell"}),e.jsx(c,{code:`if [ -f ~/.alva/user.json ]; then
  export ALVA_ENDPOINT=$(jq -r '.endpoint' ~/.alva/user.json)
  export ALVA_API_KEY=$(jq -r '.api_key' ~/.alva/user.json)
fi`}),e.jsx(d,{id:"filesystem",children:"Filesystem"}),e.jsxs(r,{children:["Persistent storage with support for permissions, symlinks, and synth mounts. Paths use home-relative format (",e.jsx(s,{children:"~/data/file.json"}),") or absolute (",e.jsx(s,{children:"/alva/home/<uid>/..."}),")."]}),e.jsx(t,{children:"API Endpoints"}),e.jsx(l,{headers:["Method","Endpoint","Description"],rows:[["GET","/api/v1/fs/read?path={path}","Read file content or time series"],["POST","/api/v1/fs/write","Write file content (raw or JSON)"],["GET","/api/v1/fs/stat?path={path}","Get file/directory metadata"],["GET","/api/v1/fs/readdir?path={path}","List directory entries"],["POST","/api/v1/fs/mkdir","Create directory (recursive)"],["DELETE","/api/v1/fs/remove?path={path}","Remove file or directory"],["POST","/api/v1/fs/rename","Rename / move"],["POST","/api/v1/fs/copy","Copy file"],["POST","/api/v1/fs/symlink","Create symlink"],["POST","/api/v1/fs/chmod","Change permissions"],["POST","/api/v1/fs/grant","Grant read/write access"],["POST","/api/v1/fs/revoke","Revoke access"]]}),e.jsx(t,{children:"Path Conventions"}),e.jsx(l,{headers:["Path","Purpose"],rows:[["~/tasks/<name>/src/","Task source code"],["~/feeds/<name>/v1/src/","Feed script source"],["~/feeds/<name>/v1/data/","Feed synth mount (auto-created)"],["~/data/","General data storage"],["~/library/","Shared code modules"]]}),e.jsx(t,{children:"Time Series Virtual Paths"}),e.jsx(r,{children:"When reading from synth mounts, append these suffixes to query time series data:"}),e.jsx(l,{headers:["Suffix","Description","Example"],rows:[["@last/{n}","Last N points (chronological)",".../prices/@last/100"],["@range/{start}..{end}","Between timestamps",".../prices/@range/2026-01-01T00:00:00Z..2026-03-01T00:00:00Z"],["@range/{duration}","Recent data within duration",".../prices/@range/7d"],["@count","Data point count",".../prices/@count"],["@now","Latest single data point",".../prices/@now"],["@all","All data points (paginated)",".../prices/@all"],["@append","Append data points (write)",".../prices/@append"],["@at/{ts}","Point nearest timestamp",".../prices/@at/1737988200"],["@before/{ts}/{limit}","Points before timestamp",".../prices/@before/1737988200/10"],["@after/{ts}/{limit}","Points after timestamp",".../prices/@after/1737988200/10"]]}),e.jsx(d,{id:"js-runtime",children:"JS Runtime"}),e.jsxs(r,{children:["Execute JavaScript in a V8 isolate via ",e.jsx(s,{children:"POST /api/v1/run"}),". Scripts have access to built-in modules and 250+ data SDKs from the Hub."]}),e.jsx(t,{children:"Run API"}),e.jsx(l,{headers:["Field","Type","Required","Description"],rows:[["code","string","* (one of)","Inline JavaScript to execute"],["entry_path","string","* (one of)","Path to script on filesystem"],["working_dir","string","no","Working directory for require()"],["args","object","no",'JSON accessible via require("env").args']]}),e.jsx(t,{children:"Built-in Modules"}),e.jsx(l,{headers:["Module","Import","Description"],rows:[["alfs",'require("alfs")',"Filesystem (absolute paths)"],["env",'require("env")',"userId, args from request"],["net/http",'require("net/http")',"fetch(url, init) for HTTP"],["@alva/algorithm",'require("@alva/algorithm")',"Technical indicators & statistics"],["@alva/feed",'require("@alva/feed")',"Feed SDK for data pipelines"],["@alva/llm",'require("@alva/llm")',"llmAsk, llmGenerate"],["@test/suite",'require("@test/suite")',"Jest-style test framework"]]}),e.jsx(t,{children:"Algorithm Module"}),e.jsx(c,{lang:"javascript",code:`const { jStat, indicators, backtest } = require('@alva/algorithm');

// Statistics
jStat.mean([1, 2, 3, 4, 5]); // 3

// Technical indicators
indicators.ema(closePrices, 20);
indicators.macd(closePrices);
indicators.rsi(closePrices, 14);
indicators.bb(closePrices, 20, 2);`}),e.jsxs(r,{children:["Categories: ",e.jsx("strong",{children:"trend"})," (SMA, EMA, DEMA, TEMA, MACD, Parabolic SAR), ",e.jsx("strong",{children:"momentum"})," (RSI, Stochastic, Williams %R), ",e.jsx("strong",{children:"volatility"})," (ATR, Bollinger Bands, Keltner Channel), ",e.jsx("strong",{children:"volume"})," (OBV, MFI, VWAP)."]}),e.jsx(t,{children:"Constraints"}),e.jsx(l,{headers:["Constraint","Details"],rows:[["No top-level await","Wrap in (async () => { ... })();"],["No Node.js builtins","fs, path, http, crypto NOT available"],["Strict mode","V8 runs in strict mode"],["Frozen exports","Module exports are Object.freeze'd"],["No circular deps","Detected and rejected"],["Max require depth","64"],["V8 heap","64 MB per execution"],["Max concurrent HTTP","128 requests, 8192 pending"],["HTTP response body","128 MB max"]]}),e.jsx(k,{id:"sdkhub",children:"SDK Hub"}),e.jsxs(r,{children:["250+ data modules available. Import pattern: ",e.jsx(s,{children:'require("@arrays/crypto/ohlcv:v1.0.0")'}),". Version suffix is optional (defaults to ",e.jsx(s,{children:"v1.0.0"}),")."]}),e.jsxs(r,{children:["Naming conventions: ",e.jsx(s,{children:"@alva/..."})," (Alva-maintained), ",e.jsx(s,{children:"@arrays/..."})," (data providers), ",e.jsx(s,{children:"@test/..."})," (testing)."]}),e.jsx(c,{lang:"javascript",code:`const { getCryptoKline } = require('@arrays/crypto/ohlcv:v1.0.0');

const result = getCryptoKline({
  symbol: 'BTCUSDT',
  start_time,
  end_time,
  interval: '1h',
});

if (!result.success) throw new Error('API call failed');
const bars = result.response.data;`}),e.jsxs(r,{children:["Most SDK functions are ",e.jsx("strong",{children:"synchronous"})," and return ",e.jsx(s,{children:"{ success, response: { data: [...] } }"}),"."]}),e.jsx(d,{id:"feed-sdk",children:"Feed SDK"}),e.jsx(r,{children:"Build persistent data pipelines with time series storage. Feeds define output schemas, fetch data, and append records to synth-mounted time series."}),e.jsx(t,{children:"Quick Start"}),e.jsx(c,{lang:"javascript",code:`const { Feed, feedPath, makeDoc, num } = require('@alva/feed');
const { getCryptoKline } = require('@arrays/crypto/ohlcv:v1.0.0');
const { indicators } = require('@alva/algorithm');

const feed = new Feed({ path: feedPath('btc-ema') });

feed.def('metrics', {
  prices: makeDoc('BTC Prices', 'Close price with EMA10', [
    num('close'),
    num('ema10'),
  ]),
});

(async () => {
  const now = Math.floor(Date.now() / 1000);
  const bars = getCryptoKline({
    symbol: 'BTCUSDT',
    start_time: now - 30 * 86400,
    end_time: now,
    interval: '1h',
  }).response.data.slice().reverse();

  const closes = bars.map(b => b.close);
  const ema10 = indicators.ema(closes, 10);
  const records = bars.map((b, i) => ({
    date: b.date,
    close: b.close,
    ema10: ema10[i] || null,
  }));

  await feed.run(async (ctx) => {
    await ctx.self.ts('metrics', 'prices').append(records);
  });
})();`}),e.jsx(t,{children:"Feed API"}),e.jsxs(r,{children:[e.jsx(s,{children:"feedPath(name, version?)"})," — constructs ",e.jsx(s,{children:"/alva/home/<userId>/feeds/<name>/<version>"}),"."]}),e.jsxs(r,{children:[e.jsx(s,{children:"feed.def(groupName, outputs)"})," — define output schemas. Do NOT use ",e.jsx(s,{children:'"data"'})," as a group name."]}),e.jsxs(r,{children:[e.jsx(s,{children:"feed.run(callback)"})," — execute feed logic. Callback receives ",e.jsx(s,{children:"FeedContext"})," with ",e.jsx(s,{children:"ctx.self"}),", ",e.jsx(s,{children:"ctx.upstream"}),", ",e.jsx(s,{children:"ctx.kv"}),"."]}),e.jsx(t,{children:"Schema Field Helpers"}),e.jsx(l,{headers:["Helper","Type"],rows:[["num(name, desc?)","number"],["str(name, desc?)","string"],["bool(name, desc?)","boolean"],["obj(name, fields)","object"],["arr(name, fields)","array"],["fld(name, type, desc?)","generic"]]}),e.jsx(t,{children:"TimeSeries API"}),e.jsxs(r,{children:[e.jsx("strong",{children:"Read-only"})," (from upstreams): ",e.jsx(s,{children:"last(n?, before?)"}),", ",e.jsx(s,{children:"first(n?, after?)"}),", ",e.jsx(s,{children:"range(from, to?)"}),", ",e.jsx(s,{children:"lastDate()"}),", ",e.jsx(s,{children:"count(from?, to?)"})]}),e.jsxs(r,{children:[e.jsx("strong",{children:"Writable"})," (from ctx.self): all read methods + ",e.jsx(s,{children:"append(records[])"})," — auto-sorts and deduplicates by ",e.jsx(s,{children:"date"}),"."]}),e.jsx(t,{children:"Feed Path Anatomy"}),e.jsx(c,{code:`~/feeds/btc-ema/v1/
  src/
    index.js          # Feed script
  data/               # Synth mount (auto-created)
    metrics/
      prices/         # Time series output
        @last/100     # Virtual: last 100 points
        @range/7d     # Virtual: last 7 days
        @count        # Virtual: point count`}),e.jsx(d,{id:"trading-engine",children:"Trading Engine (Altra)"}),e.jsx(r,{children:"Event-driven backtesting engine. All decisions happen at bar CLOSE. The architecture flows through four stages:"}),e.jsx("div",{className:"flex gap-[8px] items-center my-[20px] flex-wrap",children:["DataGraph","SignalGraph","SimGraph","PerfGraph"].map((p,x)=>e.jsxs("div",{className:"flex items-center gap-[8px]",children:[e.jsx("div",{className:"px-[14px] py-[8px] rounded-[6px] bg-[#49a3a6]/10 border border-[#49a3a6]/20",children:e.jsx("span",{className:"text-[13px] font-medium text-[#49a3a6] font-['Delight',sans-serif]",children:p})}),x<3&&e.jsx("span",{className:"text-black/20",children:"→"})]},p))}),e.jsx(t,{children:"Setup"}),e.jsx(c,{lang:"javascript",code:`const { AltraModule, num, str, bool, obj, arr, fld, makeDoc } = require('@alva/graph');
const { Altra, e, Amount, TIME } = AltraModule;

const altra = new Altra({
  startDate: Date.parse('2025-01-01T00:00:00Z'),
  portfolioOptions: { initialCash: 1_000_000, currency: 'USDT' },
  simOptions: { simTick: '1min', feeRate: 0.001, slippage: 0.0005 },
  perfOptions: { timezone: 'UTC', marketType: 'crypto' },
}, ohlcvProvider);`}),e.jsx(t,{children:"DataGraph"}),e.jsx(c,{lang:"javascript",code:`const dg = altra.getDataGraph();

// Register OHLCV data source
dg.registerOhlcv('BINANCE_SPOT_BTC_USDT', '1d');

// Register computed feature
dg.registerFeature({
  name: 'rsi',
  description: 'RSI-14',
  inputConfig: {
    ohlcvs: [{ id: { pair: 'BINANCE_SPOT_BTC_USDT', interval: '1d' }, lookback: { count: 20 } }],
  },
  fields: [num('rsi')],
  fn: ({ data }) => {
    const closes = data.ohlcvs[0].map(b => b.close);
    const rsi = indicators.rsi(closes, 14);
    return { rsi: rsi.at(-1) };
  },
});`}),e.jsx(t,{children:"Strategy"}),e.jsx(c,{lang:"javascript",code:`altra.setStrategy(
  ({ tick, data, portfolio, state }) => {
    const rsi = data.features.rsi[0]?.rsi;
    if (rsi === undefined) return { target: null, state };

    let signal = state.lastSignal;
    if (rsi < 30) signal = 'buy';
    else if (rsi > 70) signal = 'sell';

    const weight = signal === 'buy' ? 1.0 : signal === 'sell' ? 0 : null;
    const target = weight !== null ? {
      date: tick,
      instruction: {
        type: 'allocate',
        weights: [{ symbol: 'BINANCE_SPOT_BTC_USDT', weight }],
      },
    } : null;

    return { target, state: { lastSignal: signal } };
  },
  {
    trigger: { type: 'events', expr: e.ohlcv('BINANCE_SPOT_BTC_USDT', '1d') },
    inputConfig: {
      ohlcvs: [{ id: { pair: 'BINANCE_SPOT_BTC_USDT', interval: '1d' } }],
      features: [{ id: 'rsi' }],
    },
    initialState: { lastSignal: null },
  }
);`}),e.jsx(t,{children:"Target Types"}),e.jsxs(r,{children:[e.jsx("strong",{children:"Weight-based allocation"})," — weight values: 0 = exit, 0.5 = 50% equity, 1.0 = fully invested, -1.0 = 100% short, 2.0 = 2x leverage."]}),e.jsxs(r,{children:[e.jsx("strong",{children:"Order-based execution"})," — use ",e.jsx(s,{children:"Amount.base(n)"}),", ",e.jsx(s,{children:"Amount.quote(n)"}),", ",e.jsx(s,{children:"Amount.ofCash(n)"}),", ",e.jsx(s,{children:"Amount.ofPosition(n)"}),"."]}),e.jsx(t,{children:"Event Triggers"}),e.jsx(l,{headers:["Trigger","Description"],rows:[["e.ohlcv(symbol, interval)","Fires on new OHLCV bar"],["e.raw(name)","Fires on new raw data"],["e.feature(name)","Fires on new feature value"],["e.all(expr1, expr2)","AND — all must fire"],["e.any(expr1, expr2)","OR — any fires"]]}),e.jsx(t,{children:"Post-Run Analysis"}),e.jsx(c,{lang:"javascript",code:`altra.getCurrentPortfolio();   // Current holdings
altra.getEquityCurve();        // Equity over time
altra.getTargets();            // All strategy signals
altra.getOrders();             // All executed orders
altra.getPortfolioSnapshots(); // Portfolio at each tick
altra.getActivationLogs();     // Detailed execution log`}),e.jsx(d,{id:"deployment",children:"Deployment"}),e.jsxs(r,{children:["Schedule scripts as cronjobs. Workflow: write script → test via ",e.jsx(s,{children:"/api/v1/run"})," → deploy as cronjob → monitor."]}),e.jsx(t,{children:"Cronjob API"}),e.jsx(l,{headers:["Method","Endpoint","Description"],rows:[["POST","/api/v1/deploy/cronjob","Create a cronjob"],["GET","/api/v1/deploy/cronjobs","List cronjobs (paginated)"],["GET","/api/v1/deploy/cronjob/:id","Get cronjob details"],["PATCH","/api/v1/deploy/cronjob/:id","Update (name, cron, args)"],["DELETE","/api/v1/deploy/cronjob/:id","Delete cronjob"],["POST","/api/v1/deploy/cronjob/:id/pause","Pause cronjob"],["POST","/api/v1/deploy/cronjob/:id/resume","Resume cronjob"]]}),e.jsx(t,{children:"Cron Expressions"}),e.jsx(l,{headers:["Expression","Schedule"],rows:[["*/5 * * * *","Every 5 minutes"],["0 * * * *","Every hour"],["0 */4 * * *","Every 4 hours"],["0 0 * * *","Daily at midnight UTC"],["0 9 * * 1-5","Weekdays at 9:00 UTC"]]}),e.jsx(t,{children:"Example: Deploy a Feed"}),e.jsx(c,{code:`# Deploy a feed script as a cronjob (every 4 hours)
curl -s -X POST "$ALVA_ENDPOINT/api/v1/deploy/cronjob" \\
  -H "X-Alva-Api-Key: $ALVA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "path": "~/feeds/btc-ema/v1/src/index.js",
    "cron_expression": "0 */4 * * *",
    "name": "btc-ema-feed"
  }'`}),e.jsx(d,{id:"pitfalls",children:"Common Pitfalls"}),e.jsx("div",{className:"flex flex-col gap-[12px] my-[16px]",children:[["@last returns chronological order","@last returns oldest-first, consistent with @first and @range. No manual sorting needed."],["Time series reads return flat JSON","Paths with @last, @range, etc. return JSON arrays. Regular paths return application/octet-stream."],["last(N) limits unique timestamps","Grouped records may return more than N individual records."],[`Don't name groups "data"`,'The data/ in feed paths is the synth mount. Naming your group "data" creates data/data/...'],["Public reads need absolute paths","Unauthenticated reads must use /alva/home/<uid>/... (not ~/)."],["No top-level await","Wrap async code in (async () => { ... })();"],["alfs uses absolute paths",'Use /alva/home/<uid>/.... Get uid from require("env").userId.'],["No Node.js builtins",'require("fs"), require("path"), require("http") do not exist.'],["Altra decisions at bar CLOSE","Feature timestamps must use bar.endTime, not bar.date (prevents look-ahead bias)."],["Re-appending overwrites","Appending a record with an existing timestamp replaces the old value."],["feedPath() needs env.userId","Only available inside the jagent runtime."]].map(([p,x],u)=>e.jsxs("div",{className:"flex gap-[12px] items-start",children:[e.jsx("span",{className:"text-[14px] text-[#49a3a6] mt-[2px] shrink-0",children:"•"}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[14px] font-medium text-black/70 font-['Delight',sans-serif]",children:p}),e.jsxs("span",{className:"text-[13px] text-black/40 font-['Delight',sans-serif]",children:[" — ",x]})]})]},u))}),e.jsx(d,{id:"limits",children:"Resource Limits"}),e.jsx(l,{headers:["Resource","Limit"],rows:[["Write payload","10 MB per request"],["HTTP response body","128 MB max"],["Max cronjobs per user","20"],["Min cron interval","1 minute"],["V8 heap per execution","64 MB"],["Max require depth","64"],["Max concurrent HTTP","128 requests"],["Max pending requests","8192"]]}),e.jsx(d,{id:"errors",children:"Error Responses"}),e.jsxs(r,{children:["All errors return: ",e.jsx(s,{children:'{"error":{"code":"...","message":"..."}}'})]}),e.jsx(l,{headers:["HTTP Status","Code","Meaning"],rows:[["400","INVALID_ARGUMENT","Bad request or invalid path"],["401","UNAUTHENTICATED","Missing or invalid API key"],["403","PERMISSION_DENIED","Access denied"],["404","NOT_FOUND","File/directory not found"],["429","RATE_LIMITED","Rate limit / runner pool exhausted"],["500","INTERNAL","Server error"]]}),e.jsx("div",{className:"h-[80px]"})]}),e.jsx(D,{activeId:m})]})})}),n&&e.jsx("div",{className:"fixed bottom-[56px] left-[8px] w-[320px] z-[9999]",onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),children:e.jsx(w,{})})]})}export{I as default};
