/**
 * [INPUT]: Page type from App.tsx
 * [OUTPUT]: Open Alva documentation page (English)
 * [POS]: 页面层 — Docs
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Page } from '@/app/App';
import UserInfo from '@/app/components/UserInfo';
import { AppShell } from '@/app/components/shell/AppShell';

/* ========== Types ========== */

interface DocSection {
  id: string;
  label: string;
  level: number;
}

/* ========== TOC Data ========== */

const TOC: DocSection[] = [
  { id: 'overview', label: 'Overview', level: 1 },
  { id: 'installation', label: 'Installation & Setup', level: 1 },
  { id: 'filesystem', label: 'Filesystem', level: 1 },
  { id: 'js-runtime', label: 'JS Runtime', level: 1 },
  { id: 'sdkhub', label: 'SDK Hub', level: 2 },
  { id: 'feed-sdk', label: 'Feed SDK', level: 1 },
  { id: 'trading-engine', label: 'Trading Engine', level: 1 },
  { id: 'deployment', label: 'Deployment', level: 1 },
  { id: 'pitfalls', label: 'Common Pitfalls', level: 1 },
  { id: 'limits', label: 'Resource Limits', level: 1 },
  { id: 'errors', label: 'Error Responses', level: 1 },
];

/* ========== Code Block ========== */

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-[6px] overflow-hidden my-[16px]">
      <div className="flex items-center justify-between px-[16px] py-[8px] bg-[#1a1b1e] border-b border-white/5">
        <span className="text-[11px] text-white/30 font-mono uppercase tracking-wider">{lang}</span>
        <button
          onClick={handleCopy}
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors font-mono cursor-pointer"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-[#111214] px-[16px] py-[14px] overflow-x-auto">
        <code className="text-[13px] leading-[22px] text-[#e4e4e7] font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

/* ========== Table ========== */

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-[16px] rounded-[6px] border border-black/[0.06]">
      <table className="w-full text-[13px] leading-[20px]">
        <thead>
          <tr className="bg-black/[0.02]">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-[12px] py-[10px] font-medium text-black/70 border-b border-black/[0.06] font-['Delight',sans-serif]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? 'bg-black/[0.015]' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-[12px] py-[8px] text-black/60 border-b border-black/[0.04] font-['Delight',sans-serif]">
                  <code className="text-[12px] font-mono">{cell}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ========== Section Heading ========== */

function H1({ id, children }: { id: string; children: React.ReactNode }) {
  return <h1 id={id} className="text-[28px] font-medium leading-[36px] text-black/90 mt-[48px] mb-[16px] font-['Delight',sans-serif] scroll-mt-[32px]">{children}</h1>;
}

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-[22px] font-medium leading-[30px] text-black/90 mt-[40px] mb-[12px] font-['Delight',sans-serif] scroll-mt-[32px]">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[18px] font-medium leading-[26px] text-black/80 mt-[32px] mb-[8px] font-['Delight',sans-serif]">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] leading-[24px] text-black/60 mb-[12px] font-['Delight',sans-serif]">{children}</p>;
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="text-[13px] bg-black/[0.04] px-[5px] py-[2px] rounded-[3px] font-mono text-black/70">{children}</code>;
}

/* ========== TOC Sidebar ========== */

function TocSidebar({ activeId }: { activeId: string }) {
  return (
    <nav className="hidden xl:block w-[200px] shrink-0 sticky top-[32px] self-start">
      <p className="text-[11px] uppercase tracking-[1px] text-black/30 mb-[12px] font-['Delight',sans-serif]">On this page</p>
      <ul className="flex flex-col gap-[2px]">
        {TOC.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={`block text-left w-full text-[13px] leading-[28px] transition-colors font-['Delight',sans-serif] cursor-pointer ${
                s.level === 2 ? 'pl-[12px]' : ''
              } ${
                activeId === s.id
                  ? 'text-[#49a3a6] font-medium'
                  : 'text-black/40 hover:text-black/70'
              }`}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ========== Capability Card ========== */

function CapabilityCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-[12px] items-start p-[16px] rounded-[8px] bg-black/[0.02] border border-black/[0.04]">
      <span className="text-[20px] shrink-0 mt-[2px]">{icon}</span>
      <div>
        <p className="text-[14px] font-medium text-black/80 font-['Delight',sans-serif]">{title}</p>
        <p className="text-[13px] text-black/50 font-['Delight',sans-serif] mt-[2px]">{desc}</p>
      </div>
    </div>
  );
}

/* ========== Install CTA ========== */

function InstallCTA() {
  const [copied, setCopied] = useState(false);
  const cmd = 'npm install -g @anthropic/open-alva';

  return (
    <div
      onClick={() => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="inline-flex items-center gap-[12px] bg-[#111214] rounded-[8px] px-[20px] py-[12px] cursor-pointer hover:bg-[#1a1b1e] transition-colors"
    >
      <code className="text-[14px] text-[#e4e4e7] font-mono">{cmd}</code>
      <span className="text-[12px] text-white/30">{copied ? 'Copied!' : 'Click to copy'}</span>
    </div>
  );
}

/* ========== Main Component ========== */

export default function OpenAlvaDocs({ onNavigate, onOpenSearch }: { onNavigate: (page: Page) => void; onOpenSearch?: () => void }) {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();

    const sections = TOC.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveSection(topmost.target.id);
        }
      },
      { rootMargin: '-32px 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(el => observerRef.current!.observe(el));
  }, []);

  useEffect(() => {
    const timer = setTimeout(setupObserver, 100);
    return () => { clearTimeout(timer); observerRef.current?.disconnect(); };
  }, [setupObserver]);

  return (
    <>
      <AppShell
        activePage="docs"
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <div className="flex justify-center min-h-full">
          <div className="flex gap-[48px] px-[28px] py-[64px] w-full max-w-[1100px]">
            {/* Content */}
            <article className="flex-1 min-w-0 max-w-[800px]">
              {/* Hero */}
              <div className="mb-[48px]">
                <div className="flex items-center gap-[10px] mb-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#49a3a6]" />
                  <span className="text-[12px] uppercase tracking-[2px] text-black/30 font-['Delight',sans-serif]">Documentation</span>
                </div>
                <h1 className="text-[36px] font-medium leading-[44px] text-black/90 mb-[12px] font-['Delight',sans-serif]">Open Alva</h1>
                <p className="text-[18px] leading-[28px] text-black/50 mb-[24px] font-['Delight',sans-serif]">
                  Financial data &amp; quantitative trading platform for AI agents.
                </p>
                <InstallCTA />
              </div>

              {/* Section 1: Overview */}
              <H1 id="overview">What is Open Alva</H1>
              <P>
                Open Alva exposes five core capabilities via REST APIs, giving your AI agent full access to financial data, computation, and trading infrastructure.
              </P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] my-[20px]">
                <CapabilityCard icon="📁" title="Filesystem" desc="Persistent storage with permissions, symlinks, and synth mounts for time series data." />
                <CapabilityCard icon="⚡" title="JS Runtime" desc="V8 isolate with 250+ financial data SDKs, HTTP, and the Feed SDK." />
                <CapabilityCard icon="📊" title="SDK Hub" desc="Technical indicators, crypto/stock data, on-chain metrics, macro data, and LLM access." />
                <CapabilityCard icon="📈" title="Trading Engine" desc="Altra backtesting framework for event-driven quantitative strategies." />
                <CapabilityCard icon="🚀" title="Deployment" desc="Schedule scripts as cronjobs for continuous data feeds and automated tasks." />
              </div>

              {/* Section 2: Installation */}
              <H1 id="installation">Installation &amp; Setup</H1>

              <H3>Configuration</H3>
              <P>Create <InlineCode>~/.alva/user.json</InlineCode> with your credentials:</P>
              <CodeBlock lang="json" code={`{
  "endpoint": "http://localhost:3000",
  "api_key": "alva_local_dev"
}`} />

              <Table
                headers={['Field', 'Required', 'Description']}
                rows={[
                  ['endpoint', 'yes', 'Alva API base URL'],
                  ['api_key', 'yes', 'Your API key (create via Alva web app)'],
                  ['user_id', 'no', 'Numeric user ID (GET /api/v1/me)'],
                  ['username', 'no', 'Your username'],
                ]}
              />

              <H3>Authentication</H3>
              <P>Every request requires the <InlineCode>X-Alva-Api-Key</InlineCode> header:</P>
              <CodeBlock code={`curl -s -H "X-Alva-Api-Key: $ALVA_API_KEY" "$ALVA_ENDPOINT/api/v1/me"
# Response: {"id":1,"username":"alice"}`} />

              <H3>Load Config from Shell</H3>
              <CodeBlock code={`if [ -f ~/.alva/user.json ]; then
  export ALVA_ENDPOINT=$(jq -r '.endpoint' ~/.alva/user.json)
  export ALVA_API_KEY=$(jq -r '.api_key' ~/.alva/user.json)
fi`} />

              {/* Section 3: Filesystem */}
              <H1 id="filesystem">Filesystem</H1>
              <P>Persistent storage with support for permissions, symlinks, and synth mounts. Paths use home-relative format (<InlineCode>~/data/file.json</InlineCode>) or absolute (<InlineCode>/alva/home/&lt;uid&gt;/...</InlineCode>).</P>

              <H3>API Endpoints</H3>
              <Table
                headers={['Method', 'Endpoint', 'Description']}
                rows={[
                  ['GET', '/api/v1/fs/read?path={path}', 'Read file content or time series'],
                  ['POST', '/api/v1/fs/write', 'Write file content (raw or JSON)'],
                  ['GET', '/api/v1/fs/stat?path={path}', 'Get file/directory metadata'],
                  ['GET', '/api/v1/fs/readdir?path={path}', 'List directory entries'],
                  ['POST', '/api/v1/fs/mkdir', 'Create directory (recursive)'],
                  ['DELETE', '/api/v1/fs/remove?path={path}', 'Remove file or directory'],
                  ['POST', '/api/v1/fs/rename', 'Rename / move'],
                  ['POST', '/api/v1/fs/copy', 'Copy file'],
                  ['POST', '/api/v1/fs/symlink', 'Create symlink'],
                  ['POST', '/api/v1/fs/chmod', 'Change permissions'],
                  ['POST', '/api/v1/fs/grant', 'Grant read/write access'],
                  ['POST', '/api/v1/fs/revoke', 'Revoke access'],
                ]}
              />

              <H3>Path Conventions</H3>
              <Table
                headers={['Path', 'Purpose']}
                rows={[
                  ['~/tasks/<name>/src/', 'Task source code'],
                  ['~/feeds/<name>/v1/src/', 'Feed script source'],
                  ['~/feeds/<name>/v1/data/', 'Feed synth mount (auto-created)'],
                  ['~/data/', 'General data storage'],
                  ['~/library/', 'Shared code modules'],
                ]}
              />

              <H3>Time Series Virtual Paths</H3>
              <P>When reading from synth mounts, append these suffixes to query time series data:</P>
              <Table
                headers={['Suffix', 'Description', 'Example']}
                rows={[
                  ['@last/{n}', 'Last N points (chronological)', '.../prices/@last/100'],
                  ['@range/{start}..{end}', 'Between timestamps', '.../prices/@range/2026-01-01T00:00:00Z..2026-03-01T00:00:00Z'],
                  ['@range/{duration}', 'Recent data within duration', '.../prices/@range/7d'],
                  ['@count', 'Data point count', '.../prices/@count'],
                  ['@now', 'Latest single data point', '.../prices/@now'],
                  ['@all', 'All data points (paginated)', '.../prices/@all'],
                  ['@append', 'Append data points (write)', '.../prices/@append'],
                  ['@at/{ts}', 'Point nearest timestamp', '.../prices/@at/1737988200'],
                  ['@before/{ts}/{limit}', 'Points before timestamp', '.../prices/@before/1737988200/10'],
                  ['@after/{ts}/{limit}', 'Points after timestamp', '.../prices/@after/1737988200/10'],
                ]}
              />

              {/* Section 4: JS Runtime */}
              <H1 id="js-runtime">JS Runtime</H1>
              <P>Execute JavaScript in a V8 isolate via <InlineCode>POST /api/v1/run</InlineCode>. Scripts have access to built-in modules and 250+ data SDKs from the Hub.</P>

              <H3>Run API</H3>
              <Table
                headers={['Field', 'Type', 'Required', 'Description']}
                rows={[
                  ['code', 'string', '* (one of)', 'Inline JavaScript to execute'],
                  ['entry_path', 'string', '* (one of)', 'Path to script on filesystem'],
                  ['working_dir', 'string', 'no', 'Working directory for require()'],
                  ['args', 'object', 'no', 'JSON accessible via require("env").args'],
                ]}
              />

              <H3>Built-in Modules</H3>
              <Table
                headers={['Module', 'Import', 'Description']}
                rows={[
                  ['alfs', 'require("alfs")', 'Filesystem (absolute paths)'],
                  ['env', 'require("env")', 'userId, args from request'],
                  ['net/http', 'require("net/http")', 'fetch(url, init) for HTTP'],
                  ['@alva/algorithm', 'require("@alva/algorithm")', 'Technical indicators & statistics'],
                  ['@alva/feed', 'require("@alva/feed")', 'Feed SDK for data pipelines'],
                  ['@alva/llm', 'require("@alva/llm")', 'llmAsk, llmGenerate'],
                  ['@test/suite', 'require("@test/suite")', 'Jest-style test framework'],
                ]}
              />

              <H3>Algorithm Module</H3>
              <CodeBlock lang="javascript" code={`const { jStat, indicators, backtest } = require('@alva/algorithm');

// Statistics
jStat.mean([1, 2, 3, 4, 5]); // 3

// Technical indicators
indicators.ema(closePrices, 20);
indicators.macd(closePrices);
indicators.rsi(closePrices, 14);
indicators.bb(closePrices, 20, 2);`} />

              <P>Categories: <strong>trend</strong> (SMA, EMA, DEMA, TEMA, MACD, Parabolic SAR), <strong>momentum</strong> (RSI, Stochastic, Williams %R), <strong>volatility</strong> (ATR, Bollinger Bands, Keltner Channel), <strong>volume</strong> (OBV, MFI, VWAP).</P>

              <H3>Constraints</H3>
              <Table
                headers={['Constraint', 'Details']}
                rows={[
                  ['No top-level await', 'Wrap in (async () => { ... })();'],
                  ['No Node.js builtins', 'fs, path, http, crypto NOT available'],
                  ['Strict mode', 'V8 runs in strict mode'],
                  ['Frozen exports', 'Module exports are Object.freeze\'d'],
                  ['No circular deps', 'Detected and rejected'],
                  ['Max require depth', '64'],
                  ['V8 heap', '64 MB per execution'],
                  ['Max concurrent HTTP', '128 requests, 8192 pending'],
                  ['HTTP response body', '128 MB max'],
                ]}
              />

              {/* SDK Hub */}
              <H2 id="sdkhub">SDK Hub</H2>
              <P>250+ data modules available. Import pattern: <InlineCode>require("@arrays/crypto/ohlcv:v1.0.0")</InlineCode>. Version suffix is optional (defaults to <InlineCode>v1.0.0</InlineCode>).</P>

              <P>Naming conventions: <InlineCode>@alva/...</InlineCode> (Alva-maintained), <InlineCode>@arrays/...</InlineCode> (data providers), <InlineCode>@test/...</InlineCode> (testing).</P>

              <CodeBlock lang="javascript" code={`const { getCryptoKline } = require('@arrays/crypto/ohlcv:v1.0.0');

const result = getCryptoKline({
  symbol: 'BTCUSDT',
  start_time,
  end_time,
  interval: '1h',
});

if (!result.success) throw new Error('API call failed');
const bars = result.response.data;`} />

              <P>Most SDK functions are <strong>synchronous</strong> and return <InlineCode>{`{ success, response: { data: [...] } }`}</InlineCode>.</P>

              {/* Section 5: Feed SDK */}
              <H1 id="feed-sdk">Feed SDK</H1>
              <P>Build persistent data pipelines with time series storage. Feeds define output schemas, fetch data, and append records to synth-mounted time series.</P>

              <H3>Quick Start</H3>
              <CodeBlock lang="javascript" code={`const { Feed, feedPath, makeDoc, num } = require('@alva/feed');
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
})();`} />

              <H3>Feed API</H3>
              <P><InlineCode>feedPath(name, version?)</InlineCode> — constructs <InlineCode>/alva/home/&lt;userId&gt;/feeds/&lt;name&gt;/&lt;version&gt;</InlineCode>.</P>
              <P><InlineCode>feed.def(groupName, outputs)</InlineCode> — define output schemas. Do NOT use <InlineCode>"data"</InlineCode> as a group name.</P>
              <P><InlineCode>feed.run(callback)</InlineCode> — execute feed logic. Callback receives <InlineCode>FeedContext</InlineCode> with <InlineCode>ctx.self</InlineCode>, <InlineCode>ctx.upstream</InlineCode>, <InlineCode>ctx.kv</InlineCode>.</P>

              <H3>Schema Field Helpers</H3>
              <Table
                headers={['Helper', 'Type']}
                rows={[
                  ['num(name, desc?)', 'number'],
                  ['str(name, desc?)', 'string'],
                  ['bool(name, desc?)', 'boolean'],
                  ['obj(name, fields)', 'object'],
                  ['arr(name, fields)', 'array'],
                  ['fld(name, type, desc?)', 'generic'],
                ]}
              />

              <H3>TimeSeries API</H3>
              <P><strong>Read-only</strong> (from upstreams): <InlineCode>last(n?, before?)</InlineCode>, <InlineCode>first(n?, after?)</InlineCode>, <InlineCode>range(from, to?)</InlineCode>, <InlineCode>lastDate()</InlineCode>, <InlineCode>count(from?, to?)</InlineCode></P>
              <P><strong>Writable</strong> (from ctx.self): all read methods + <InlineCode>append(records[])</InlineCode> — auto-sorts and deduplicates by <InlineCode>date</InlineCode>.</P>

              <H3>Feed Path Anatomy</H3>
              <CodeBlock code={`~/feeds/btc-ema/v1/
  src/
    index.js          # Feed script
  data/               # Synth mount (auto-created)
    metrics/
      prices/         # Time series output
        @last/100     # Virtual: last 100 points
        @range/7d     # Virtual: last 7 days
        @count        # Virtual: point count`} />

              {/* Section 6: Trading Engine */}
              <H1 id="trading-engine">Trading Engine (Altra)</H1>
              <P>Event-driven backtesting engine. All decisions happen at bar CLOSE. The architecture flows through four stages:</P>

              <div className="flex gap-[8px] items-center my-[20px] flex-wrap">
                {['DataGraph', 'SignalGraph', 'SimGraph', 'PerfGraph'].map((stage, i) => (
                  <div key={stage} className="flex items-center gap-[8px]">
                    <div className="px-[14px] py-[8px] rounded-[6px] bg-[#49a3a6]/10 border border-[#49a3a6]/20">
                      <span className="text-[13px] font-medium text-[#49a3a6] font-['Delight',sans-serif]">{stage}</span>
                    </div>
                    {i < 3 && <span className="text-black/20">→</span>}
                  </div>
                ))}
              </div>

              <H3>Setup</H3>
              <CodeBlock lang="javascript" code={`const { AltraModule, num, str, bool, obj, arr, fld, makeDoc } = require('@alva/graph');
const { Altra, e, Amount, TIME } = AltraModule;

const altra = new Altra({
  startDate: Date.parse('2025-01-01T00:00:00Z'),
  portfolioOptions: { initialCash: 1_000_000, currency: 'USDT' },
  simOptions: { simTick: '1min', feeRate: 0.001, slippage: 0.0005 },
  perfOptions: { timezone: 'UTC', marketType: 'crypto' },
}, ohlcvProvider);`} />

              <H3>DataGraph</H3>
              <CodeBlock lang="javascript" code={`const dg = altra.getDataGraph();

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
});`} />

              <H3>Strategy</H3>
              <CodeBlock lang="javascript" code={`altra.setStrategy(
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
);`} />

              <H3>Target Types</H3>
              <P><strong>Weight-based allocation</strong> — weight values: 0 = exit, 0.5 = 50% equity, 1.0 = fully invested, -1.0 = 100% short, 2.0 = 2x leverage.</P>
              <P><strong>Order-based execution</strong> — use <InlineCode>Amount.base(n)</InlineCode>, <InlineCode>Amount.quote(n)</InlineCode>, <InlineCode>Amount.ofCash(n)</InlineCode>, <InlineCode>Amount.ofPosition(n)</InlineCode>.</P>

              <H3>Event Triggers</H3>
              <Table
                headers={['Trigger', 'Description']}
                rows={[
                  ['e.ohlcv(symbol, interval)', 'Fires on new OHLCV bar'],
                  ['e.raw(name)', 'Fires on new raw data'],
                  ['e.feature(name)', 'Fires on new feature value'],
                  ['e.all(expr1, expr2)', 'AND — all must fire'],
                  ['e.any(expr1, expr2)', 'OR — any fires'],
                ]}
              />

              <H3>Post-Run Analysis</H3>
              <CodeBlock lang="javascript" code={`altra.getCurrentPortfolio();   // Current holdings
altra.getEquityCurve();        // Equity over time
altra.getTargets();            // All strategy signals
altra.getOrders();             // All executed orders
altra.getPortfolioSnapshots(); // Portfolio at each tick
altra.getActivationLogs();     // Detailed execution log`} />

              {/* Section 7: Deployment */}
              <H1 id="deployment">Deployment</H1>
              <P>Schedule scripts as cronjobs. Workflow: write script → test via <InlineCode>/api/v1/run</InlineCode> → deploy as cronjob → monitor.</P>

              <H3>Cronjob API</H3>
              <Table
                headers={['Method', 'Endpoint', 'Description']}
                rows={[
                  ['POST', '/api/v1/deploy/cronjob', 'Create a cronjob'],
                  ['GET', '/api/v1/deploy/cronjobs', 'List cronjobs (paginated)'],
                  ['GET', '/api/v1/deploy/cronjob/:id', 'Get cronjob details'],
                  ['PATCH', '/api/v1/deploy/cronjob/:id', 'Update (name, cron, args)'],
                  ['DELETE', '/api/v1/deploy/cronjob/:id', 'Delete cronjob'],
                  ['POST', '/api/v1/deploy/cronjob/:id/pause', 'Pause cronjob'],
                  ['POST', '/api/v1/deploy/cronjob/:id/resume', 'Resume cronjob'],
                ]}
              />

              <H3>Cron Expressions</H3>
              <Table
                headers={['Expression', 'Schedule']}
                rows={[
                  ['*/5 * * * *', 'Every 5 minutes'],
                  ['0 * * * *', 'Every hour'],
                  ['0 */4 * * *', 'Every 4 hours'],
                  ['0 0 * * *', 'Daily at midnight UTC'],
                  ['0 9 * * 1-5', 'Weekdays at 9:00 UTC'],
                ]}
              />

              <H3>Example: Deploy a Feed</H3>
              <CodeBlock code={`# Deploy a feed script as a cronjob (every 4 hours)
curl -s -X POST "$ALVA_ENDPOINT/api/v1/deploy/cronjob" \\
  -H "X-Alva-Api-Key: $ALVA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "path": "~/feeds/btc-ema/v1/src/index.js",
    "cron_expression": "0 */4 * * *",
    "name": "btc-ema-feed"
  }'`} />

              {/* Section 8: Common Pitfalls */}
              <H1 id="pitfalls">Common Pitfalls</H1>
              <div className="flex flex-col gap-[12px] my-[16px]">
                {[
                  ['@last returns chronological order', '@last returns oldest-first, consistent with @first and @range. No manual sorting needed.'],
                  ['Time series reads return flat JSON', 'Paths with @last, @range, etc. return JSON arrays. Regular paths return application/octet-stream.'],
                  ['last(N) limits unique timestamps', 'Grouped records may return more than N individual records.'],
                  ['Don\'t name groups "data"', 'The data/ in feed paths is the synth mount. Naming your group "data" creates data/data/...'],
                  ['Public reads need absolute paths', 'Unauthenticated reads must use /alva/home/<uid>/... (not ~/).'],
                  ['No top-level await', 'Wrap async code in (async () => { ... })();'],
                  ['alfs uses absolute paths', 'Use /alva/home/<uid>/.... Get uid from require("env").userId.'],
                  ['No Node.js builtins', 'require("fs"), require("path"), require("http") do not exist.'],
                  ['Altra decisions at bar CLOSE', 'Feature timestamps must use bar.endTime, not bar.date (prevents look-ahead bias).'],
                  ['Re-appending overwrites', 'Appending a record with an existing timestamp replaces the old value.'],
                  ['feedPath() needs env.userId', 'Only available inside the jagent runtime.'],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex gap-[12px] items-start">
                    <span className="text-[14px] text-[#49a3a6] mt-[2px] shrink-0">•</span>
                    <div>
                      <span className="text-[14px] font-medium text-black/70 font-['Delight',sans-serif]">{title}</span>
                      <span className="text-[13px] text-black/40 font-['Delight',sans-serif]"> — {desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 9: Resource Limits */}
              <H1 id="limits">Resource Limits</H1>
              <Table
                headers={['Resource', 'Limit']}
                rows={[
                  ['Write payload', '10 MB per request'],
                  ['HTTP response body', '128 MB max'],
                  ['Max cronjobs per user', '20'],
                  ['Min cron interval', '1 minute'],
                  ['V8 heap per execution', '64 MB'],
                  ['Max require depth', '64'],
                  ['Max concurrent HTTP', '128 requests'],
                  ['Max pending requests', '8192'],
                ]}
              />

              {/* Section 10: Error Responses */}
              <H1 id="errors">Error Responses</H1>
              <P>All errors return: <InlineCode>{`{"error":{"code":"...","message":"..."}}`}</InlineCode></P>
              <Table
                headers={['HTTP Status', 'Code', 'Meaning']}
                rows={[
                  ['400', 'INVALID_ARGUMENT', 'Bad request or invalid path'],
                  ['401', 'UNAUTHENTICATED', 'Missing or invalid API key'],
                  ['403', 'PERMISSION_DENIED', 'Access denied'],
                  ['404', 'NOT_FOUND', 'File/directory not found'],
                  ['429', 'RATE_LIMITED', 'Rate limit / runner pool exhausted'],
                  ['500', 'INTERNAL', 'Server error'],
                ]}
              />

              {/* Footer spacing */}
              <div className="h-[80px]" />
            </article>

            {/* TOC */}
            <TocSidebar activeId={activeSection} />
          </div>
        </div>
      </AppShell>
      {isUserInfoOpen && (
        <div
          className="fixed bottom-[56px] left-[8px] w-[320px] z-[9999]"
          onMouseEnter={() => setIsUserInfoOpen(true)}
          onMouseLeave={() => setIsUserInfoOpen(false)}
        >
          <UserInfo />
        </div>
      )}
    </>
  );
}
