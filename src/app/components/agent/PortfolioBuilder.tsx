/**
 * [INPUT]: Figma Page/Agent/Chat（8563:238317 / 8622:316384）— Watch your portfolio 24/7 建仓向导
 *          三段式来源（手动 / 截图 / 券商）+ 4 列持仓网格 + 已选 chip 行 + Language + Start Watching
 * [OUTPUT]: 点 Onboard「Watch your portfolio 24/7」后进入的 portfolio builder 卡片，逐元素对齐 Figma
 *           - manual：点网格 + 把该标的加入下方 chip 并把该格刷成池中新标的；chip 可编辑份额 / 移除
 *           - upload（Figma 9888:234822）：拖拽/点选上传区，cloud icon + 支持格式提示
 *           - brokerage（Figma 8563:237957 / 8563:242235）：4×2 券商网格 + Choose more；点某家 mock 连接，
 *             下方 Connected 区出现该账户卡（多选：青底 check-f2 / 白底 check-l2），选中即点亮 Start Watching
 * [POS]: AgentNewSession portfolio 视图内，Alva 首条消息的正文
 */

import { useRef, useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { TickerLogo } from '@/app/components/shared/TickerLogo';
import { Dropdown } from '@/app/components/shared/Dropdown';

const FONT = "'Delight', sans-serif";
const BASE = import.meta.env.BASE_URL;

/* ── tokens（Figma 变量 → fallback） ── */
const L12 = 'var(--line-l12, rgba(0,0,0,0.12))';
const L3 = 'var(--line-l3, rgba(0,0,0,0.3))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const N3 = 'var(--text-n3, rgba(0,0,0,0.3))';
const N2 = 'var(--text-n2, rgba(0,0,0,0.2))';
const TEAL = 'var(--main-m1, #49A3A6)';
const TEAL10 = 'var(--main-m1-10, rgba(73,163,166,0.1))';
const BR03 = 'rgba(0,0,0,0.03)';

function tx(size: number, lh: number, color: string, weight: 400 | 500 = 400): React.CSSProperties {
  return { fontFamily: FONT, fontSize: size, lineHeight: `${lh}px`, letterSpacing: `${(size * 0.01).toFixed(2)}px`, color, fontWeight: weight };
}

/* ========== 数据 ========== */

type Source = 'manual' | 'upload' | 'brokerage';
interface Ticker { symbol: string; name: string; tag: string }

const SOURCES: { id: Source; label: string }[] = [
  { id: 'manual', label: 'Add Positions Manually' },
  { id: 'upload', label: 'Upload Portfolio Screenshots' },
  { id: 'brokerage', label: 'Connect Brokerage Account' },
];

/* 初始可见 15 项（4 列 · 行主序，第 16 格是 Choose more） */
const INITIAL: Ticker[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', tag: 'US' },
  { symbol: 'NTAP', name: 'NetApp, Inc.', tag: 'US' },
  { symbol: 'AAPL', name: 'Apple Inc.', tag: 'US' },
  { symbol: 'META', name: 'Meta Platforms, Inc.', tag: 'US' },
  { symbol: 'RKLB', name: 'Rocket Lab Corporation', tag: 'US' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', tag: 'US' },
  { symbol: 'SNDK', name: 'Sandisk Corporation', tag: 'US' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', tag: 'US' },
  { symbol: 'MU', name: 'Micron Technology, Inc.', tag: 'US' },
  { symbol: 'ORCL', name: 'Oracle Corporation', tag: 'US' },
  { symbol: 'WDC', name: 'Western Digital Corporation', tag: 'US' },
  { symbol: 'WMT', name: 'Walmart Inc.', tag: 'US' },
  { symbol: 'AI', name: 'C3.ai, Inc.', tag: 'US' },
  { symbol: 'NFLX', name: 'Netflix, Inc.', tag: 'US' },
  { symbol: 'HOOD', name: 'Robinhood Markets, Inc.', tag: 'US' },
];

/* 补位池：点 + 后该格刷成池中下一个未用标的 */
const POOL: Ticker[] = [
  { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', tag: 'US' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', tag: 'US' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', tag: 'US' },
  { symbol: 'TSM', name: 'Taiwan Semiconductor', tag: 'US' },
  { symbol: 'UBER', name: 'Uber Technologies, Inc.', tag: 'US' },
  { symbol: 'COIN', name: 'Coinbase Global, Inc.', tag: 'US' },
  { symbol: 'UNH', name: 'UnitedHealth Group Inc.', tag: 'US' },
  { symbol: 'MA', name: 'Mastercard Inc.', tag: 'US' },
  { symbol: 'ABT', name: 'Abbott Laboratories', tag: 'US' },
  { symbol: 'IBM', name: 'International Business Machines', tag: 'US' },
  { symbol: 'TMUS', name: 'T-Mobile US, Inc.', tag: 'US' },
  { symbol: 'STX', name: 'Seagate Technology', tag: 'US' },
  { symbol: 'PSTG', name: 'Pure Storage, Inc.', tag: 'US' },
  { symbol: 'A', name: 'Agilent Technologies, Inc.', tag: 'US' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', tag: 'US' },
  { symbol: 'BTC', name: 'Bitcoin', tag: 'Crypto' },
  { symbol: 'ETH', name: 'Ethereum', tag: 'Crypto' },
  { symbol: 'SOL', name: 'Solana', tag: 'Crypto' },
];

const LANGUAGES = ['English', '简体中文'];

/* brokerage 网格（Figma 8563:237957，4×2）。
   logo 取 Figma 真实素材：robinhood/hyperliquid 复用整圆 svg，schwab/fidelity/moomoo/webull 用 Figma 导出圆标，
   ibkr 用品牌 glyph 白底居中（Figma 导出丢失矢量，回落已有真实资产）。 */
/* account：mock 掩码账户号（点某家即 mock 连接，写入 Connected 区，格式仿 Figma「3***4」） */
interface ConnectBroker { id: string; label: string; logo: string; fit?: 'contain'; account: string }
const CONNECT_BROKERS: ConnectBroker[] = [
  { id: 'robinhood', label: 'Robinhood', logo: `${BASE}logo-broker-round-robinhood.svg`, account: 'RH2***4021' },
  { id: 'ibkr', label: 'IBKR', logo: `${BASE}logo-broker-ibkr.svg`, fit: 'contain', account: 'U29***7746' },
  { id: 'schwab', label: 'Charles Schwab', logo: `${BASE}logo-broker-connect-schwab.png`, account: '392***1180' },
  { id: 'fidelity', label: 'Fidelity', logo: `${BASE}logo-broker-connect-fidelity.png`, account: 'Z04***5567' },
  { id: 'moomoo', label: 'Moomoo', logo: `${BASE}logo-broker-connect-moomoo.png`, account: 'MM7***2093' },
  { id: 'hyperliquid', label: 'Hyperliquid', logo: `${BASE}logo-broker-round-hyperliquid.svg`, account: '0x9***a4F1' },
  { id: 'webull-us', label: 'Webull', logo: `${BASE}logo-broker-connect-webull.png`, account: 'WB5***8830' },
];

interface ConnAccount { id: number; broker: ConnectBroker; on: boolean }

const CELL_BORDER = `0.5px solid ${L12}`;

interface Chosen { id: number; symbol: string; name: string; tag: string; qty: string }

/* ========== 小件 ========== */

const SCOPED_CSS = `
.pb-cell { transition: background .12s ease; }
.pb-cell:hover { background: rgba(0,0,0,0.02); }
.pb-src { transition: background .12s ease; }
.pb-start { transition: filter .14s ease; }
.pb-start:not(:disabled):hover { filter: brightness(0.95); }
.pb-chipx { display:flex; transition:opacity .12s ease; }
.pb-chipx:hover { opacity:.6; }
`;

/* 单选圆点：选中=teal 实心 + 白心；未选=l3 描边空心 */
function Radio({ on }: { on: boolean }) {
  if (on) {
    return (
      <span className="flex shrink-0 items-center justify-center rounded-full" style={{ width: 16, height: 16, background: TEAL }}>
        <span className="rounded-full bg-white" style={{ width: 6, height: 6 }} />
      </span>
    );
  }
  return <span className="shrink-0 rounded-full" style={{ width: 16, height: 16, border: `1.4px solid ${L3}`, boxSizing: 'border-box' }} />;
}

/* chip 里 18px 圈 logo（1px 白描边，同 WatchlistBuilder） */
function RingLogo({ ticker }: { ticker: string }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center overflow-hidden" style={{ width: 18, height: 18, boxSizing: 'border-box', borderRadius: '50%', border: '1px solid #fff', background: '#fff' }}>
      <TickerLogo ticker={ticker} size={16} />
    </span>
  );
}

/* brokerage 网格 32px 圆标：整圆品牌图铺满；glyph（ibkr）白底居中缩放 */
function BrokerMark({ broker }: { broker: ConnectBroker }) {
  const contain = broker.fit === 'contain';
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ width: 32, height: 32, background: '#fff', border: contain ? `0.5px solid ${L12}` : undefined }}
    >
      <img
        src={broker.logo}
        alt=""
        style={{ width: contain ? 22 : 32, height: contain ? 22 : 32, objectFit: contain ? 'contain' : 'cover', borderRadius: contain ? 0 : '50%' }}
      />
    </span>
  );
}

/* Language mini-select（Figma 116px，向上展开避开卡片裁切） */
function LangSelect({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <Dropdown
      width={130}
      align="left"
      openUp
      activeId={value}
      onSelect={onSelect}
      items={LANGUAGES.map((o) => ({ id: o, label: o }))}
      trigger={
        <span className="inline-flex items-center justify-center gap-[4px]" style={{ width: 116, border: `0.5px solid ${L3}`, borderRadius: 'var(--radius-btn-s, 4px)', padding: '4px 8px' }}>
          <span className="min-w-0 flex-1 truncate" style={tx(12, 20, N9)}>{value}</span>
          <CdnIcon name="arrow-down-f2" size={12} color={N2} />
        </span>
      }
    />
  );
}

/* ========== 主组件 ========== */

export function PortfolioBuilder({ onStart }: { onStart?: (chosen: { symbol: string; qty: string }[]) => void }) {
  const [source, setSource] = useState<Source>('manual');
  const [visible, setVisible] = useState<Ticker[]>(INITIAL);
  const [chosen, setChosen] = useState<Chosen[]>([]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [editing, setEditing] = useState<number | null>(null);
  const [uploads, setUploads] = useState<string[]>([]);
  const [connected, setConnected] = useState<ConnAccount[]>([]);
  const poolRef = useRef(0);
  const idRef = useRef(0);

  /* 三个 source 是独立流程:各自维护独立 state(manual→chosen+visible / upload→uploads / brokerage→connected),
     切换只换视图不清空,切回来保留原选择;底部展示按 source 分流,互不串味 */

  /* 点 + ：加入下方 chip，并把该格刷成池中下一个未出现的标的 */
  const addTicker = (i: number) => {
    const t = visible[i];
    // 在 updater 外算好补位（visible 已含 t.symbol），避免 ref 在 updater 里被双调用多跳
    const used = new Set([...visible.map((x) => x.symbol), ...chosen.map((c) => c.symbol)]);
    let next: Ticker | undefined;
    for (let n = 0; n < POOL.length; n++) {
      const cand = POOL[(poolRef.current + n) % POOL.length];
      if (!used.has(cand.symbol)) { next = cand; poolRef.current = (poolRef.current + n + 1) % POOL.length; break; }
    }
    setChosen((prev) => [...prev, { id: ++idRef.current, symbol: t.symbol, name: t.name, tag: t.tag, qty: '' }]);
    setVisible((prev) => {
      const out = [...prev];
      if (next) out[i] = next; else out.splice(i, 1); // 池耗尽则移除该格
      return out;
    });
  };

  const removeChip = (id: number) => {
    setChosen((prev) => prev.filter((c) => c.id !== id));
    if (editing === id) setEditing(null);
  };
  const setQty = (id: number, qty: string) =>
    setChosen((prev) => prev.map((c) => (c.id === id ? { ...c, qty: qty.replace(/[^\d.]/g, '') } : c)));

  /* upload：接收文件即在提示区回显文件名（原型不做真实 OCR） */
  const onFiles = (files: FileList | null) => {
    if (!files?.length) return;
    setUploads((prev) => [...prev, ...Array.from(files).map((f) => f.name)]);
  };

  /* brokerage mock：点某家券商即视为连接成功，写入 Connected 区并默认选中（不接真实弹窗流程） */
  const connectBroker = (b: ConnectBroker) => {
    setConnected((prev) => (prev.some((c) => c.broker.id === b.id) ? prev : [...prev, { id: ++idRef.current, broker: b, on: true }]));
  };
  const toggleConn = (id: number) => setConnected((prev) => prev.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));

  const hasChosen = chosen.length > 0;
  const selectedConns = connected.filter((c) => c.on);
  const canStart = source === 'upload' ? uploads.length > 0
    : source === 'brokerage' ? selectedConns.length > 0
    : hasChosen;
  const handleStart = () => {
    if (!canStart) return;
    onStart?.(chosen.map((c) => ({ symbol: c.symbol, qty: c.qty })));
  };

  return (
    <>
      <style>{SCOPED_CSS}</style>

      <div className="flex w-full flex-col overflow-hidden" style={{ border: `0.5px solid ${L2}`, borderRadius: 8 }}>
        {/* 来源切换（3 段单选，h56） */}
        <div className="flex w-full items-start">
          {SOURCES.map((s, i) => {
            const active = source === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSource(s.id)}
                className="pb-src flex h-[56px] min-w-0 flex-1 cursor-pointer items-center gap-[12px] border-none px-[16px] py-[12px] text-left"
                style={{ background: active ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'transparent', borderBottom: CELL_BORDER, borderRight: i < SOURCES.length - 1 ? CELL_BORDER : undefined }}
              >
                <span className="min-w-0 flex-1 truncate" style={tx(14, 22, N9)}>{s.label}</span>
                <Radio on={active} />
              </button>
            );
          })}
        </div>

        {source === 'manual' ? (
          <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            {visible.map((t, i) => (
              <button
                key={`${t.symbol}-${i}`}
                type="button"
                onClick={() => addTicker(i)}
                className="pb-cell flex min-w-0 cursor-pointer items-center gap-[12px] border-none px-[16px] py-[12px] text-left"
                style={{ background: 'transparent', borderBottom: CELL_BORDER, borderRight: i % 4 !== 3 ? CELL_BORDER : undefined }}
              >
                <TickerLogo ticker={t.symbol} size={32} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex items-center gap-[6px]">
                    <span className="truncate" style={tx(14, 22, N9)}>{t.symbol}</span>
                    <span className="flex shrink-0 items-center justify-center" style={{ ...tx(10, 16, N5), border: `0.5px solid ${L12}`, borderRadius: 2, padding: '1px 4px' }}>{t.tag}</span>
                  </span>
                  <span className="truncate" style={tx(12, 20, N5)}>{t.name}</span>
                </span>
                <span className="flex size-[16px] shrink-0 items-center justify-center">
                  <CdnIcon name="add-l1" size={16} color={N5} />
                </span>
              </button>
            ))}
            {/* Choose more（占最后一格） */}
            <button
              type="button"
              className="pb-cell flex min-w-0 cursor-pointer items-center gap-[12px] border-none text-left"
              style={{ background: 'transparent', padding: '17px 16px', borderBottom: CELL_BORDER }}
            >
              <span className="flex size-[32px] shrink-0 items-center justify-center rounded-full" style={{ background: BR03 }}>
                <CdnIcon name="search-l" size={14} color={N7} />
              </span>
              <span className="truncate" style={tx(14, 22, N9)}>Choose more</span>
            </button>
          </div>
        ) : source === 'upload' ? (
          /* upload（Figma 9888:234822）：cloud icon + 格式提示的拖拽/点选上传区 */
          <label
            className="pb-src flex w-full cursor-pointer flex-col items-center justify-center gap-[4px] px-[16px] py-[32px]"
            style={{ borderBottom: CELL_BORDER }}
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/heic"
              multiple
              className="hidden"
              onChange={(e) => { onFiles(e.target.files); e.target.value = ''; }}
            />
            <CdnIcon name="upload-l" size={24} color={N5} />
            <p className="max-w-full truncate text-center" style={tx(12, 20, N5)}>
              {uploads.length
                ? `${uploads.length} screenshot${uploads.length > 1 ? 's' : ''} ready · tap to add more`
                : 'PNG, JPG, or HEIC · up to 10 MB each'}
            </p>
          </label>
        ) : (
          /* brokerage（Figma 8563:237957）：4×2 券商网格 + Choose more（连接流程暂未接入） */
          <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            {CONNECT_BROKERS.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => connectBroker(b)}
                className="pb-cell flex min-w-0 cursor-pointer items-center gap-[12px] border-none text-left"
                style={{ background: 'transparent', padding: '12px 16px', borderBottom: CELL_BORDER, borderRight: i % 4 !== 3 ? CELL_BORDER : undefined }}
              >
                <BrokerMark broker={b} />
                <span className="min-w-0 flex-1 truncate" style={tx(14, 22, N9)}>{b.label}</span>
                <span className="flex size-[14px] shrink-0 items-center justify-center">
                  <CdnIcon name="arrow-right-l1" size={14} color={N5} />
                </span>
              </button>
            ))}
            {/* Choose more（第 8 格，占 row2 col4） */}
            <button
              type="button"
              className="pb-cell flex min-w-0 cursor-pointer items-center gap-[12px] border-none text-left"
              style={{ background: 'transparent', padding: '12px 16px', borderBottom: CELL_BORDER }}
            >
              <span className="flex size-[32px] shrink-0 items-center justify-center rounded-full" style={{ background: BR03 }}>
                <CdnIcon name="search-l" size={14} color={N7} />
              </span>
              <span className="truncate" style={tx(14, 22, N9)}>Choose more</span>
            </button>
          </div>
        )}

        {/* Connected 区（Figma 8563:242235）：mock 连接后出现，标题行 + 2 列已连账户多选卡 */}
        {source === 'brokerage' && connected.length > 0 && (
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center px-[16px] py-[12px]" style={{ borderBottom: CELL_BORDER }}>
              <span className="min-w-0 flex-1 truncate" style={tx(14, 22, N9)}>Connected</span>
            </div>
            <div className="grid w-full" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              {connected.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleConn(c.id)}
                  className="flex min-w-0 cursor-pointer items-center gap-[12px] border-none text-left"
                  style={{ background: c.on ? TEAL10 : 'transparent', padding: '12px 16px', borderBottom: CELL_BORDER, borderRight: i % 2 === 0 ? CELL_BORDER : undefined }}
                >
                  <span className="relative shrink-0" style={{ width: 32, height: 32 }}>
                    <BrokerMark broker={c.broker} />
                    <span className="absolute rounded-full" style={{ right: 0, bottom: 0, width: 8, height: 8, background: TEAL, boxShadow: '0 0 0 1px #fff' }} />
                  </span>
                  <span className="min-w-0 flex-1 truncate" style={tx(14, 22, N9)}>{c.broker.label} · {c.broker.account}</span>
                  <span className="flex size-[16px] shrink-0 items-center justify-center">
                    <CdnIcon name={c.on ? 'check-f2' : 'check-l2'} size={16} color={c.on ? TEAL : N3} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer — 已选 chip 行 + Language + Start Watching */}
        <div className="flex w-full flex-col gap-[12px] bg-white p-[16px]">
          {source === 'manual' && hasChosen && (
            <div className="flex w-full flex-wrap items-start gap-[4px]">
              {chosen.map((c) => (
                <span key={c.id} className="flex items-center gap-[8px] overflow-hidden" style={{ background: BR03, borderRadius: 6, padding: '4px 8px' }}>
                  <RingLogo ticker={c.symbol} />
                  <span className="flex items-center gap-[4px] whitespace-nowrap">
                    <span style={tx(12, 20, N9)}>{c.symbol}</span>
                    {editing === c.id ? (
                      <input
                        autoFocus
                        value={c.qty}
                        onChange={(e) => setQty(c.id, e.target.value)}
                        onBlur={() => setEditing(null)}
                        onKeyDown={(e) => { if (e.key === 'Enter') setEditing(null); }}
                        placeholder="Shares"
                        className="border-none bg-transparent p-0 outline-none"
                        style={{ ...tx(12, 20, N5), width: 44 }}
                      />
                    ) : (
                      c.qty !== '' && <span style={tx(12, 20, N5)}>{c.qty}</span>
                    )}
                  </span>
                  <button type="button" onClick={() => setEditing(c.id)} className="pb-chipx shrink-0 cursor-pointer border-none bg-transparent p-0" aria-label={`Edit ${c.symbol} shares`}>
                    <CdnIcon name="edit-l1" size={12} color={N5} />
                  </button>
                  <button type="button" onClick={() => removeChip(c.id)} className="pb-chipx shrink-0 cursor-pointer border-none bg-transparent p-0" aria-label={`Remove ${c.symbol}`}>
                    <CdnIcon name="close-l1" size={12} color={N5} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex w-full items-center gap-[20px]">
            <div className="flex min-w-0 flex-1 items-center gap-[8px]">
              <span className="shrink-0" style={tx(12, 20, N7)}>Language</span>
              <LangSelect value={language} onSelect={setLanguage} />
            </div>
            <button
              type="button"
              disabled={!canStart}
              onClick={handleStart}
              className="pb-start flex h-[40px] shrink-0 items-center justify-center gap-[8px]"
              style={{
                ...tx(14, 22, canStart ? '#fff' : N2, 500),
                padding: '9px 20px',
                borderRadius: 6,
                background: canStart ? TEAL : '#fff',
                border: canStart ? 'none' : `0.5px solid ${L3}`,
                cursor: canStart ? 'pointer' : 'default',
              }}
            >
              Start Watching
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
