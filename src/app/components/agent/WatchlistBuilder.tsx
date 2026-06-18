/**
 * [INPUT]: Figma Page/Agent/Chat — Build your watchlist（8111:9397 / 8166:84016, 2026-06 改版）
 *          Asset → Pick tickers(3列) → Or pick a preset basket(2列) → What Alva Will Run(选了才出) → footer
 * [OUTPUT]: Agent 开场的 daily-digest watchlist builder 卡片，逐元素对齐 Figma 参数
 * [POS]: AgentNewSession 开场首条 Alva 消息内
 */

import { useMemo, useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { TickerLogo } from '@/app/components/shared/TickerLogo';
import { Dropdown } from '@/app/components/shared/Dropdown';

const FONT = "'Delight', sans-serif";

/* ── tokens（Figma 变量 → fallback；theme.css 缺 br/部分档时用字面量） ── */
const L12 = 'var(--line-l12, rgba(0,0,0,0.12))';
const L3 = 'var(--line-l3, rgba(0,0,0,0.3))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const N2 = 'var(--text-n2, rgba(0,0,0,0.2))';
const UP = 'var(--main-m3, #2a9b7d)';
const DOWN = 'var(--main-m4, #e05357)';
const TEAL = 'var(--main-m1, #49A3A6)';
const TEAL10 = 'var(--main-m1-10, rgba(73,163,166,0.1))';
const BR03 = 'rgba(0,0,0,0.03)'; /* content/br03 */
const BR7 = 'rgba(0,0,0,0.7)';   /* content/br7 */
const NR9 = 'rgba(255,255,255,0.9)'; /* text/nr9 */

/* ── 文本样式（Delight，letterSpacing = size×0.01px，对齐 Figma tracking） ── */
function tx(size: number, lh: number, color: string, weight: 400 | 500 = 400): React.CSSProperties {
  return { fontFamily: FONT, fontSize: size, lineHeight: `${lh}px`, letterSpacing: `${(size * 0.01).toFixed(2)}px`, color, fontWeight: weight };
}

/* ========== 数据 ========== */

type AssetClass = 'stocks' | 'etf' | 'crypto' | 'commodities';
interface WatchTicker { symbol: string; name: string; tag: string; asset: AssetClass; chg: number }
interface WatchBasket { id: string; name: string; count: number; desc: string; members: string[] }

const ASSETS: { id: AssetClass; label: string }[] = [
  { id: 'stocks', label: 'Stocks' },
  { id: 'etf', label: 'ETF/index' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'commodities', label: 'Commodities' },
];

/* counts 选成 3 列整除（含 Choose more）：stocks 11+1=12 / 其余 5+1=6 */
const TICKERS: WatchTicker[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', tag: 'US', asset: 'stocks', chg: 1.83 },
  { symbol: 'NTAP', name: 'NetApp, Inc.', tag: 'US', asset: 'stocks', chg: -4.99 },
  { symbol: 'AAPL', name: 'Apple Inc.', tag: 'US', asset: 'stocks', chg: -1.70 },
  { symbol: 'META', name: 'Meta Platforms, Inc.', tag: 'US', asset: 'stocks', chg: 1.38 },
  { symbol: 'RKLB', name: 'Rocket Lab Corporation', tag: 'US', asset: 'stocks', chg: -3.87 },
  { symbol: 'SNDK', name: 'Sandisk Corporation', tag: 'US', asset: 'stocks', chg: 28.37 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', tag: 'US', asset: 'stocks', chg: 0.54 },
  { symbol: 'MU', name: 'Micron Technology, Inc.', tag: 'US', asset: 'stocks', chg: 9.07 },
  { symbol: 'WDC', name: 'Western Digital Corporation', tag: 'US', asset: 'stocks', chg: 31.55 },
  { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', tag: 'US', asset: 'stocks', chg: 2.41 },
  { symbol: 'NFLX', name: 'Netflix, Inc.', tag: 'US', asset: 'stocks', chg: 0.90 },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', tag: 'US', asset: 'etf', chg: 3.90 },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', tag: 'US', asset: 'etf', chg: 0.21 },
  { symbol: 'IWM', name: 'iShares Russell 2000 ETF', tag: 'US', asset: 'etf', chg: 0.95 },
  { symbol: 'TLT', name: 'iShares 20+ Year Treasury', tag: 'US', asset: 'etf', chg: -0.44 },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market', tag: 'US', asset: 'etf', chg: 0.30 },
  { symbol: 'BTC', name: 'Bitcoin', tag: 'Crypto', asset: 'crypto', chg: 2.40 },
  { symbol: 'ETH', name: 'Ethereum', tag: 'Crypto', asset: 'crypto', chg: 3.10 },
  { symbol: 'SOL', name: 'Solana', tag: 'Crypto', asset: 'crypto', chg: -1.20 },
  { symbol: 'BNB', name: 'BNB', tag: 'Crypto', asset: 'crypto', chg: 0.85 },
  { symbol: 'XRP', name: 'XRP', tag: 'Crypto', asset: 'crypto', chg: 1.95 },
  { symbol: 'GLD', name: 'SPDR Gold Shares', tag: 'US', asset: 'commodities', chg: 0.34 },
  { symbol: 'SLV', name: 'iShares Silver Trust', tag: 'US', asset: 'commodities', chg: 0.62 },
  { symbol: 'USO', name: 'United States Oil Fund', tag: 'US', asset: 'commodities', chg: -0.88 },
  { symbol: 'UNG', name: 'United States Natural Gas', tag: 'US', asset: 'commodities', chg: -1.45 },
  { symbol: 'DBA', name: 'Invesco DB Agriculture Fund', tag: 'US', asset: 'commodities', chg: 0.20 },
];

const BASKETS: WatchBasket[] = [
  { id: 'mag7', name: 'Mag7', count: 7, desc: 'Track the Magnificent 7 mega-cap tech leaders for broad exposure to AI, cloud, consumer platforms, and growth momentum.', members: ['AAPL', 'NVDA', 'GOOGL', 'AMZN'] },
  { id: 'crypto-majors', name: 'Crypto Majors', count: 10, desc: 'Focuses on leading crypto assets and related equities for core exposure to the digital asset market.', members: ['BTC', 'ETH', 'SOL', 'BNB'] },
  { id: 'most-active', name: 'Most Active Today', count: 24, desc: "Tracks the day's most actively traded names to surface high-volume, high-attention market opportunities.", members: ['TSLA', 'NVDA', 'AMD', 'COIN'] },
  { id: 'ai-semis', name: 'AI & Semis', count: 16, desc: 'Covers AI infrastructure, chips, compute, and the semiconductor supply chain.', members: ['NVDA', 'AMD', 'TSM', 'MU'] },
  { id: 'glp1', name: 'GLP-1', count: 9, desc: 'Focuses on companies tied to weight-loss and metabolic disease treatments, especially GLP-1 therapies.', members: ['UNH', 'ABT', 'A', 'WMT'] },
  { id: 'mega-tech', name: 'Mega-cap Tech', count: 8, desc: 'Large-cap internet, streaming, and platform leaders driving consumer technology.', members: ['NFLX', 'UBER', 'META', 'GOOGL'] },
];

const AUTOMATIONS = [
  { id: 'brief', title: 'Portfolio Morning Brief', desc: 'Each morning, I brief you on the overnight tape that matters: key moves, catalysts, and where to focus.' },
  { id: 'watch', title: 'Proactive Watch', desc: 'I monitor your holdings live and alert only on material moves, broken levels, stops at risk, or fresh catalysts, with the why.' },
];

const ALERT_TIMES = ['06:30 ET', '07:30 ET', '08:30 ET', '12:30 ET', '16:30 ET'];
const LANGUAGES = ['English', '简体中文', 'Español', '日本語'];

/* ========== 小件 ========== */

const SCOPED_CSS = `
.wb-pill { transition: background .12s ease, color .12s ease; }
.wb-row { transition: background .12s ease; }
.wb-row:hover { background: rgba(0,0,0,0.02); }
.wb-row.sel { background: ${TEAL10}; }
.wb-row.sel:hover { background: rgba(73,163,166,0.16); }
.wb-gen { transition: filter .14s ease; }
.wb-gen:not(:disabled):hover { filter: brightness(0.95); }
.wb-edit:hover { background: rgba(0,0,0,0.04); }
.wb-chipx { display:flex; opacity: .55; transition: opacity .12s ease; }
.wb-chipx:hover { opacity: 1; }
.wb-clamp2 { display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; }
`;

/* 圈 logo（18px，1px 白描边，叠放用） */
function RingLogo({ ticker, ml = 0 }: { ticker: string; ml?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      style={{ width: 18, height: 18, boxSizing: 'border-box', marginLeft: ml, borderRadius: '50%', border: '1px solid #fff', background: '#fff', overflow: 'hidden' }}
    >
      <TickerLogo ticker={ticker} size={16} />
    </span>
  );
}

/* basket 2×2 叠放 logo（32×32 内，mr-4 overlap，对齐 Figma） */
function BasketLogos({ members }: { members: string[] }) {
  const m = members;
  return (
    <span className="flex shrink-0 flex-col" style={{ width: 32, height: 32 }}>
      <span className="flex" style={{ height: 18, marginBottom: -4 }}>
        <RingLogo ticker={m[0]} /><RingLogo ticker={m[1] ?? m[0]} ml={-4} />
      </span>
      <span className="flex" style={{ height: 18 }}>
        <RingLogo ticker={m[2] ?? m[0]} /><RingLogo ticker={m[3] ?? m[1] ?? m[0]} ml={-4} />
      </span>
    </span>
  );
}

/* 选中徽标：直接用 Figma check-f2 资源 —— #2a9b7d 实心圆 + 镂空勾（透出底色），不染色保留原貌 */
function CheckBadge({ size = 16 }: { size?: number }) {
  return <CdnIcon name="check-f2" size={size} />;
}

/* asset pill（active = br7 实心 + 白字；inactive = br03 + n7） */
function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="wb-pill flex shrink-0 cursor-pointer items-center justify-center gap-[4px] whitespace-nowrap border-none"
      style={{ ...tx(14, 22, active ? NR9 : N7), padding: '6px 12px', borderRadius: 960, background: active ? BR7 : BR03 }}
    >
      {label}
    </button>
  );
}

/* 网格 section 标题行（n9 14/22, px16 py12, border-b） */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center" style={{ padding: '12px 16px', borderBottom: `0.5px solid ${L12}` }}>
      <p className="min-w-0 flex-1 truncate" style={tx(14, 22, N9)}>{children}</p>
    </div>
  );
}

/* footer 小 Select */
function MiniSelect({ value, options, onSelect }: { value: string; options: string[]; onSelect: (v: string) => void }) {
  return (
    <Dropdown
      width={130}
      align="right"
      activeId={value}
      onSelect={onSelect}
      items={options.map((o) => ({ id: o, label: o }))}
      trigger={
        <span className="inline-flex items-center justify-center gap-[4px]" style={{ border: `0.5px solid ${L3}`, borderRadius: 'var(--radius-btn-s, 4px)', padding: '4px 8px' }}>
          <span className="truncate" style={{ ...tx(12, 20, N9), width: 70 }}>{value}</span>
          <CdnIcon name="arrow-down-f2" size={12} color={N5} />
        </span>
      }
    />
  );
}

/* What Alva Will Run 开关 */
function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative shrink-0 cursor-pointer border-none"
      style={{ width: 32, height: 16, borderRadius: 1000, background: on ? TEAL : L2, transition: 'background .15s ease' }}
      aria-pressed={on}
    >
      <span
        className="absolute rounded-full bg-white"
        style={{ width: 10.667, height: 10.667, top: '50%', transform: 'translateY(-50%)', left: on ? 'auto' : 2.667, right: on ? 2.667 : 'auto', transition: 'left .15s ease, right .15s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
      />
    </button>
  );
}

/* ========== 主组件 ========== */

export interface DigestPayload {
  count: number;
  tickers: string[];
  baskets: string[];
  alertTime: string;
  language: string;
}

const CELL_BORDER = `0.5px solid ${L12}`;

export function WatchlistBuilder({
  submitted,
  onGenerate,
  onEdit,
}: {
  submitted: boolean;
  onGenerate: (p: DigestPayload) => void;
  onEdit: () => void;
}) {
  const [assets, setAssets] = useState<Set<AssetClass>>(new Set());
  const [pickedTickers, setPickedTickers] = useState<Set<string>>(new Set());
  const [pickedBaskets, setPickedBaskets] = useState<Set<string>>(new Set());
  const [alertTime, setAlertTime] = useState(ALERT_TIMES[1]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [autos, setAutos] = useState<Record<string, boolean>>({ brief: true, watch: true });

  // Asset 多选筛选：默认（空选）只预览前 8 行（23 个 + Choose more = 24 格 = 8×3），选中后按并集全量筛选
  const visibleTickers = useMemo(
    () => (assets.size === 0 ? TICKERS.slice(0, 23) : TICKERS.filter((t) => assets.has(t.asset))),
    [assets],
  );
  const toggleAsset = (id: AssetClass) =>
    setAssets((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const basketList = BASKETS.filter((b) => pickedBaskets.has(b.id));
  const tickerList = [...pickedTickers];
  // 篮子与单独标的相互独立：行勾选 / 下方 chip 只反映用户单独点的 ticker，篮子按整体 count 计入
  const chosenCount = basketList.reduce((n, b) => n + b.count, 0) + tickerList.length;
  const hasChosen = chosenCount > 0;

  const isTickerSel = (s: string) => pickedTickers.has(s);

  const toggleTicker = (s: string) =>
    setPickedTickers((prev) => {
      const n = new Set(prev);
      n.has(s) ? n.delete(s) : n.add(s);
      return n;
    });
  const toggleBasket = (id: string) =>
    setPickedBaskets((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const handleGenerate = () => {
    onGenerate({ count: chosenCount, tickers: tickerList, baskets: [...pickedBaskets], alertTime, language });
  };

  /* ── 提交后：折叠确认条 ── */
  if (submitted) {
    return (
      <>
        <style>{SCOPED_CSS}</style>
        <div className="flex w-full items-center gap-[12px]" style={{ border: `0.5px solid ${L12}`, borderRadius: 8, padding: '12px 14px' }}>
          <CheckBadge />
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate" style={tx(14, 22, N9)}>Daily digest is live</p>
            <p className="truncate" style={tx(12, 20, N5)}>{chosenCount} tickers · {alertTime} · {language} · pushed every market day</p>
          </div>
          <button type="button" onClick={onEdit} className="wb-edit shrink-0 cursor-pointer rounded-[6px]" style={{ ...tx(13, 20, N7), border: `0.5px solid ${L3}`, background: '#fff', padding: '6px 12px' }}>
            Edit
          </button>
        </div>
      </>
    );
  }

  /* 网格单元边框：col 末列去掉 right border（对齐 Figma） */
  const tickerCells = [...visibleTickers.map((t) => ({ kind: 'ticker' as const, t })), { kind: 'more' as const }];

  return (
    <>
      <style>{SCOPED_CSS}</style>

      <div className="flex w-full flex-col overflow-hidden" style={{ border: `0.5px solid ${L2}`, borderRadius: 8 }}>
        {/* Asset */}
        <div className="flex flex-col gap-[12px]" style={{ padding: '12px 16px 16px', borderBottom: `0.5px solid ${L12}` }}>
          <p style={tx(14, 22, N9)}>Asset</p>
          <div className="flex flex-wrap items-start gap-[12px]">
            {ASSETS.map((a) => (
              <Pill key={a.id} label={a.label} active={assets.has(a.id)} onClick={() => toggleAsset(a.id)} />
            ))}
          </div>
        </div>

        {/* Pick tickers */}
        <div className="flex w-full flex-col">
          <SectionTitle>Pick tickers</SectionTitle>
          <div className="flex w-full flex-wrap">
            {tickerCells.map((c, i) => {
              const rightBorder = i % 3 !== 2;
              if (c.kind === 'more') {
                return (
                  <button
                    key="more"
                    type="button"
                    className="wb-row flex cursor-pointer items-center justify-center gap-[12px] border-none"
                    style={{ flex: '1 1 280px', minWidth: 0, background: 'transparent', padding: '17px 16px', borderBottom: CELL_BORDER, borderRight: rightBorder ? CELL_BORDER : undefined }}
                  >
                    <span className="flex size-[32px] shrink-0 items-center justify-center rounded-full" style={{ background: BR03 }}>
                      <CdnIcon name="search-l" size={14} color={N7} />
                    </span>
                    <span style={tx(14, 22, N9)}>Choose more</span>
                  </button>
                );
              }
              const t = c.t;
              const sel = isTickerSel(t.symbol);
              const up = t.chg >= 0;
              return (
                <button
                  key={t.symbol}
                  type="button"
                  onClick={() => toggleTicker(t.symbol)}
                  className={`wb-row flex cursor-pointer items-center gap-[12px] border-none text-left${sel ? ' sel' : ''}`}
                  style={{ flex: '1 1 280px', minWidth: 0, background: 'transparent', padding: '12px 16px', borderBottom: CELL_BORDER, borderRight: rightBorder ? CELL_BORDER : undefined }}
                >
                  <TickerLogo ticker={t.symbol} size={32} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex items-center gap-[6px]">
                      <span className="truncate" style={tx(14, 22, N9)}>{t.symbol}</span>
                      <span className="flex shrink-0 items-center justify-center" style={{ ...tx(10, 16, N5), border: `0.5px solid ${L12}`, borderRadius: 2, padding: '1px 4px' }}>{t.tag}</span>
                    </span>
                    <span className="truncate" style={tx(12, 20, N5)}>{t.name}</span>
                  </span>
                  <span className="shrink-0 text-right" style={tx(14, 22, up ? UP : DOWN)}>{up ? '+' : ''}{t.chg.toFixed(2)}%</span>
                  {sel ? <CheckBadge /> : (
                    <span className="flex size-[16px] shrink-0 items-center justify-center">
                      <CdnIcon name="add-l1" size={16} color={N5} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Or pick a preset basket */}
        <div className="flex w-full flex-col">
          <SectionTitle>Or pick a preset basket</SectionTitle>
          <div className="flex w-full flex-wrap">
            {BASKETS.map((b, i) => {
              const sel = pickedBaskets.has(b.id);
              const rightBorder = i % 2 !== 1;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => toggleBasket(b.id)}
                  className={`wb-row flex cursor-pointer items-center gap-[12px] border-none text-left${sel ? ' sel' : ''}`}
                  style={{ flex: '1 1 400px', minWidth: 0, background: 'transparent', padding: '12px 16px', borderBottom: CELL_BORDER, borderRight: rightBorder ? CELL_BORDER : undefined }}
                >
                  <BasketLogos members={b.members} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate" style={tx(14, 22, N9)}>{b.name}</span>
                    <span className="flex items-center gap-[4px] whitespace-nowrap">
                      <span className="shrink-0" style={tx(12, 20, N5)}>{b.count} tickers</span>
                      <span className="shrink-0" style={tx(12, 20, N2)}>|</span>
                      <span className="min-w-0 flex-1 truncate" style={tx(12, 20, N5)}>{b.desc}</span>
                    </span>
                  </span>
                  {sel ? <CheckBadge /> : (
                    <span className="flex size-[16px] shrink-0 items-center justify-center">
                      <CdnIcon name="add-l1" size={16} color={N5} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* What Alva Will Run — 选了标的才出 */}
        {hasChosen && (
          <div className="flex w-full flex-col">
            <SectionTitle>What Alva Will Run</SectionTitle>
            <div className="flex w-full flex-wrap">
              {AUTOMATIONS.map((a, i) => {
                const rightBorder = i % 2 !== 1;
                return (
                  <div key={a.id} className="flex items-center gap-[12px]" style={{ flex: '1 1 400px', minWidth: 0, padding: '12px 16px', borderBottom: CELL_BORDER, borderRight: rightBorder ? CELL_BORDER : undefined }}>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="truncate" style={tx(14, 22, N9)}>{a.title}</p>
                      <p className="wb-clamp2" style={{ ...tx(12, 20, N5), height: 40 }}>{a.desc}</p>
                    </div>
                    <Switch on={!!autos[a.id]} onToggle={() => setAutos((prev) => ({ ...prev, [a.id]: !prev[a.id] }))} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex w-full flex-col gap-[12px]" style={{ padding: 16 }}>
          <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[8px]">
            <span className="truncate" style={{ ...tx(14, 22, N9), flex: '1 1 auto', minWidth: 120 }}>Chosen · {chosenCount} tickers</span>
            <div className="flex flex-wrap items-center gap-[20px]">
              <span className="flex items-center gap-[8px]">
                <span className="whitespace-nowrap" style={tx(14, 22, N7)}>Daily alert time</span>
                <MiniSelect value={alertTime} options={ALERT_TIMES} onSelect={setAlertTime} />
              </span>
              <span className="flex items-center gap-[8px]">
                <span className="whitespace-nowrap" style={tx(14, 22, N7)}>Digest language</span>
                <MiniSelect value={language} options={LANGUAGES} onSelect={setLanguage} />
              </span>
            </div>
          </div>

          {hasChosen && (
            <div className="flex w-full flex-wrap items-start gap-[4px]">
              {basketList.map((b) => (
                <span key={b.id} className="flex items-center gap-[8px] overflow-hidden" style={{ background: BR03, borderRadius: 6, padding: '4px 8px' }}>
                  <span className="flex shrink-0">
                    {b.members.slice(0, 4).map((t, i) => <RingLogo key={t} ticker={t} ml={i ? -8 : 0} />)}
                  </span>
                  <span className="flex items-center gap-[3px] whitespace-nowrap">
                    <span style={tx(12, 20, N9)}>{b.name}</span>
                    <span style={tx(12, 20, N5)}>({b.count} tickers)</span>
                  </span>
                  <button type="button" onClick={() => toggleBasket(b.id)} className="wb-chipx shrink-0 cursor-pointer border-none bg-transparent p-0" aria-label={`Remove ${b.name}`}>
                    <CdnIcon name="close-l1" size={12} color={N7} />
                  </button>
                </span>
              ))}
              {tickerList.map((s) => (
                <span key={s} className="flex items-center gap-[8px]" style={{ background: BR03, borderRadius: 6, padding: '4px 8px' }}>
                  <RingLogo ticker={s} />
                  <span className="whitespace-nowrap" style={tx(12, 20, N9)}>{s}</span>
                  <button type="button" onClick={() => toggleTicker(s)} className="wb-chipx shrink-0 cursor-pointer border-none bg-transparent p-0" aria-label={`Remove ${s}`}>
                    <CdnIcon name="close-l1" size={12} color={N7} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex w-full justify-end">
            <button
              type="button"
              disabled={!hasChosen}
              onClick={handleGenerate}
              className="wb-gen flex h-[40px] items-center justify-center gap-[8px]"
              style={{
                ...tx(14, 22, hasChosen ? '#fff' : N2, 500),
                padding: '9px 20px',
                borderRadius: 6,
                background: hasChosen ? TEAL : '#fff',
                border: hasChosen ? 'none' : `0.5px solid ${L3}`,
                cursor: hasChosen ? 'pointer' : 'default',
              }}
            >
              Generate digest with {chosenCount} tickers
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
