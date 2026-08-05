/**
 * [INPUT]: Figma Draft-Lite Chat/Block-Answer (4605:13564) — congress 态整卡
 *          Figma Draft Table (12555:79555 options / 12555:79623 shorted) — 切换态两张表
 * [OUTPUT]: Outcome-first screener chooser rendered inside the Alva chat flow
 *           表格为统一 UI:同一套 Table/Row/Mask + 每个 screen 自己的列定义与单元格类型
 * [POS]: AgentNewSession screener response
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { TickerLogo } from '@/app/components/shared/TickerLogo';

const FONT = "'Delight', sans-serif";
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const L12 = 'var(--line-l12, rgba(0,0,0,0.12))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const M1 = 'var(--main-m1, #49a3a6)';
const M3 = 'var(--main-m3, #2a9b7d)';
const M4 = 'var(--main-m4, #e05357)';
const G03 = 'var(--grey-g03, #f0f0f0)';
/* Avatar · R 的描边是组件固定值(稿里 D/R 两党四行同色),不是党派色 */
const AVATAR_RING = '#c25450';

/* 预览区大标题前缀 — 稿 12585:54747「Screener · What Congress Just Bought」 */
const PREVIEW_TITLE_PREFIX = 'Screener · ';

export type ScreenKey = 'congress' | 'options' | 'shorted' | 'breakouts' | 'divergence';

/* 列定义 — width 给了就固定(shrink-0),否则 flex-1 平分(稿:Ticker 280 固定,其余等分) */
interface Column {
  label: string;
  width?: number;
  align?: 'right';
}

/* 单元格类型 — 两张稿共用的原子:member(30 圆图 + 两行) / tagText(标签 + 文案) / meter(进度条 + 数值) / text */
type Cell =
  | { kind: 'member'; symbol: string; sub: string; portrait?: string }
  | { kind: 'text'; text: string; color?: string }
  | { kind: 'tagText'; tag: string; bearish?: boolean; text: string }
  | { kind: 'meter'; pct: number; text: string }
  | { kind: 'ticker'; ticker: string }
  | { kind: 'badge'; label: string; bearish?: boolean }
  | { kind: 'dots'; text: string; filled: number };

interface ScreenOption {
  key: ScreenKey;
  prompt: string;
  /* 预览区大标题(接在 PREVIEW_TITLE_PREFIX 后);稿只给了 congress 一条,其余按同句式拟 */
  title: string;
  columns: Column[];
  rows: [Cell[], Cell[], Cell[], Cell[]];
}

/* congress — Figma 4605:13564:5 列,首列人像 + 党派;Type 标签、Amount 档位点为该 screen 专有 */
const CONGRESS: ScreenOption = {
  key: 'congress',
  prompt: 'Track what members of Congress just bought — weekdays 9:00 AM ET',
  title: 'What Congress Just Bought',
  columns: [
    { label: 'Member', width: 280 },
    { label: 'Ticker' },
    { label: 'Type', width: 100 },
    { label: 'Amount', align: 'right' },
    { label: 'Filed after', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'Sheldon Whitehouse', sub: 'D · Senate · RI', portrait: 'screener-sheldon-whitehouse.jpg' },
      { kind: 'ticker', ticker: 'NVDA' },
      { kind: 'badge', label: 'BUY' },
      { kind: 'dots', text: '$1K–15K', filled: 1 },
      { kind: 'text', text: '4 days' },
    ],
    [
      { kind: 'member', symbol: 'Pete Sessions', sub: 'R · House · TX-17', portrait: 'screener-pete-sessions.jpg' },
      { kind: 'ticker', ticker: 'ORCL' },
      { kind: 'badge', label: 'BUY' },
      { kind: 'dots', text: '$1K–15K', filled: 1 },
      { kind: 'text', text: '4 days' },
    ],
    [
      { kind: 'member', symbol: 'James A. Himes', sub: 'D · House · CT-4', portrait: 'screener-blurred-member-1.jpg' },
      { kind: 'ticker', ticker: 'IBM' },
      { kind: 'badge', label: 'SHORT', bearish: true },
      { kind: 'dots', text: '$15K–50K', filled: 2 },
      { kind: 'text', text: '2 days' },
    ],
    [
      { kind: 'member', symbol: 'Adrian Smith', sub: 'R · House · NE-3', portrait: 'screener-blurred-member-2.jpg' },
      { kind: 'ticker', ticker: 'RKLB' },
      { kind: 'badge', label: 'BUY' },
      { kind: 'dots', text: '$15K–50K', filled: 2 },
      { kind: 'text', text: '1 day' },
    ],
  ],
};

/* options — Figma 12555:79555:4 列,Contract 为 Calls(m3)/Puts(m4) 标签 + 行权;Vs avg vol 走 m1 */
const OPTIONS: ScreenOption = {
  key: 'options',
  prompt: "See today's biggest unusual options bets — weekdays at 5:15 PM ET",
  title: 'Biggest Unusual Options Bets',
  columns: [
    { label: 'Ticker', width: 280 },
    { label: 'Contract' },
    { label: 'Premium', align: 'right' },
    { label: 'Vs avg vol', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'MSFT', sub: 'Microsoft Corporation' },
      { kind: 'tagText', tag: 'Calls', text: '$520 · Oct 17' },
      { kind: 'text', text: '$3.6M' },
      { kind: 'text', text: '18×', color: M1 },
    ],
    [
      { kind: 'member', symbol: 'TSLA', sub: 'Tesla, Inc.' },
      { kind: 'tagText', tag: 'Puts', bearish: true, text: '$300 · Sep 19' },
      { kind: 'text', text: '$2.8M' },
      { kind: 'text', text: '21×', color: M1 },
    ],
    [
      { kind: 'member', symbol: 'AMD', sub: 'Advanced Micro Devices, Inc.' },
      { kind: 'tagText', tag: 'Calls', text: '$175 · Aug 29' },
      { kind: 'text', text: '$1.9M' },
      { kind: 'text', text: '26×', color: M1 },
    ],
    [
      { kind: 'member', symbol: 'COIN', sub: 'Coinbase Global, Inc.' },
      { kind: 'tagText', tag: 'Puts', bearish: true, text: '$220 · Sep 5' },
      { kind: 'text', text: '$1.4M' },
      { kind: 'text', text: '12×', color: M1 },
    ],
  ],
};

/* shorted — Figma 12555:79623:Short % 列固定 210(进度条 48×4 + 数值);WoW 增(+)走 m4、减(−)走 n5 */
const SHORTED: ScreenOption = {
  key: 'shorted',
  prompt: "Track the market's most heavily shorted stocks — when new short data lands",
  title: 'Most Heavily Shorted Stocks',
  columns: [
    { label: 'Ticker', width: 280 },
    { label: 'Short % of float', width: 210 },
    { label: 'WoW', align: 'right' },
    { label: 'Days to cover', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'OPEN', sub: 'Opendoor Technologies, Inc.' },
      { kind: 'meter', pct: 38.4, text: '38.4%' },
      { kind: 'text', text: '+2.6 pt', color: M4 },
      { kind: 'text', text: '2.9 d' },
    ],
    [
      { kind: 'member', symbol: 'CLSK', sub: 'CleanSpark, Inc.' },
      { kind: 'meter', pct: 31.7, text: '31.7%' },
      { kind: 'text', text: '+1.4 pt', color: M4 },
      { kind: 'text', text: '4.6 d' },
    ],
    [
      { kind: 'member', symbol: 'MARA', sub: 'Marathon Digital Holdings' },
      { kind: 'meter', pct: 27.3, text: '27.3%' },
      { kind: 'text', text: '−0.8 pt', color: N5 },
      { kind: 'text', text: '5.4 d' },
    ],
    [
      { kind: 'member', symbol: 'AI', sub: 'C3.ai, Inc.' },
      { kind: 'meter', pct: 24.5, text: '24.5%' },
      { kind: 'text', text: '+0.6 pt', color: M4 },
      { kind: 'text', text: '3.1 d' },
    ],
  ],
};

/* breakouts / divergence — 稿未出图,沿用 options/shorted 的统一列型外推 */
const BREAKOUTS: ScreenOption = {
  key: 'breakouts',
  prompt: 'Find breakouts to one-month highs on double the usual volume — weekdays 4:30 PM ET',
  title: 'Breakouts to One-Month Highs',
  columns: [
    { label: 'Ticker', width: 280 },
    { label: 'Breakout' },
    { label: 'Vs avg vol', align: 'right' },
    { label: 'Triggered', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'RKLB', sub: 'Rocket Lab USA, Inc.' },
      { kind: 'tagText', tag: 'High', text: '$32.4 · 1-mo' },
      { kind: 'text', text: '2.8×', color: M1 },
      { kind: 'text', text: '18 min' },
    ],
    [
      { kind: 'member', symbol: 'MU', sub: 'Micron Technology, Inc.' },
      { kind: 'tagText', tag: 'High', text: '$142.8 · 1-mo' },
      { kind: 'text', text: '2.3×', color: M1 },
      { kind: 'text', text: '31 min' },
    ],
    [
      { kind: 'member', symbol: 'HOOD', sub: 'Robinhood Markets, Inc.' },
      { kind: 'tagText', tag: 'High', text: '$98.1 · 1-mo' },
      { kind: 'text', text: '2.2×', color: M1 },
      { kind: 'text', text: '43 min' },
    ],
    [
      { kind: 'member', symbol: 'UBER', sub: 'Uber Technologies, Inc.' },
      { kind: 'tagText', tag: 'High', text: '$94.6 · 1-mo' },
      { kind: 'text', text: '2.1×', color: M1 },
      { kind: 'text', text: '52 min' },
    ],
  ],
};

const DIVERGENCE: ScreenOption = {
  key: 'divergence',
  prompt: 'Spot stocks where price and momentum are starting to disagree — every weekday at 4:40 PM ET',
  title: 'Price & Momentum Divergence',
  columns: [
    { label: 'Ticker', width: 280 },
    { label: 'Divergence' },
    { label: 'RSI-14', align: 'right' },
    { label: 'Detected', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'TSLA', sub: 'Tesla, Inc.' },
      { kind: 'tagText', tag: 'Bearish', bearish: true, text: 'Price up · RSI down' },
      { kind: 'text', text: '61', color: M4 },
      { kind: 'text', text: '9 min' },
    ],
    [
      { kind: 'member', symbol: 'NVDA', sub: 'NVIDIA Corporation' },
      { kind: 'tagText', tag: 'Bearish', bearish: true, text: 'Price up · RSI down' },
      { kind: 'text', text: '67', color: M4 },
      { kind: 'text', text: '22 min' },
    ],
    [
      { kind: 'member', symbol: 'COIN', sub: 'Coinbase Global, Inc.' },
      { kind: 'tagText', tag: 'Bullish', text: 'Price down · RSI up' },
      { kind: 'text', text: '39', color: M3 },
      { kind: 'text', text: '36 min' },
    ],
    [
      { kind: 'member', symbol: 'AMD', sub: 'Advanced Micro Devices, Inc.' },
      { kind: 'tagText', tag: 'Bullish', text: 'Price down · RSI up' },
      { kind: 'text', text: '42', color: M3 },
      { kind: 'text', text: '47 min' },
    ],
  ],
};

const SCREEN_OPTIONS: ScreenOption[] = [CONGRESS, OPTIONS, SHORTED, BREAKOUTS, DIVERGENCE];

function textStyle(size: number, lineHeight: number, color: string, weight = 400) {
  return { fontFamily: FONT, fontSize: size, lineHeight: `${lineHeight}px`, letterSpacing: `${size / 100}px`, color, fontWeight: weight } as const;
}

/* 列容器 — 固定宽走 shrink-0,否则 flex-1;右对齐列 justify-end(稿:表头与数据同规则) */
function ColumnCell({ column, children }: { column: Column; children: React.ReactNode }) {
  return (
    <div
      className={`flex items-center overflow-hidden ${column.width ? 'shrink-0' : 'min-w-px flex-1'} ${column.align === 'right' ? 'justify-end' : ''}`}
      style={column.width ? { width: column.width } : undefined}
    >
      {children}
    </div>
  );
}

function CellView({ cell, align }: { cell: Cell; align?: 'right' }) {
  const base = import.meta.env.BASE_URL;
  switch (cell.kind) {
    /* Member — 30px 圆图 + gap8 + 两行(Medium14 n9 / Regular10 n5,行盒重叠 2px → 内容块 36) */
    case 'member':
      return (
        <div className="flex min-w-0 items-center gap-[8px] overflow-hidden">
          {cell.portrait ? (
            <img src={`${base}${cell.portrait}`} alt="" className="size-[30px] shrink-0 rounded-full object-cover" style={{ border: `1.5px solid ${AVATAR_RING}` }} />
          ) : (
            <TickerLogo ticker={cell.symbol} size={30} />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate" style={textStyle(14, 22, N9, 500)}>{cell.symbol}</p>
            <p className="-mt-[2px] truncate" style={textStyle(10, 16, N5)}>{cell.sub}</p>
          </div>
        </div>
      );
    /* Contract / Divergence — 标签(m3 涨 / m4 跌)+ gap6 + 文案 */
    case 'tagText':
      return (
        <div className="flex min-w-0 items-center gap-[6px] overflow-hidden">
          <span className="shrink-0 rounded-[4px] px-[6px] py-px" style={{ ...textStyle(12, 20, '#fff'), background: cell.bearish ? M4 : M3 }}>{cell.tag}</span>
          <span className="truncate" style={textStyle(14, 22, N9)}>{cell.text}</span>
        </div>
      );
    /* Short % — 48×4 轨(g03) + m4 填充 + gap6 + 数值 */
    case 'meter':
      return (
        <div className="flex min-w-0 flex-1 items-center gap-[6px] overflow-hidden">
          <span className="h-[4px] w-[48px] shrink-0 overflow-hidden rounded-full" style={{ background: G03 }}>
            <span className="block h-full rounded-full" style={{ width: `${Math.max(0, Math.min(100, cell.pct))}%`, background: M4 }} />
          </span>
          <span className="min-w-0 flex-1 truncate" style={textStyle(14, 22, N9)}>{cell.text}</span>
        </div>
      );
    case 'ticker':
      return (
        <div className="flex min-w-0 items-center gap-[6px] overflow-hidden">
          <TickerLogo ticker={cell.ticker} size={22} />
          <span className="truncate" style={textStyle(14, 22, N9)}>{cell.ticker}</span>
        </div>
      );
    case 'badge':
      return (
        <span className="shrink-0 rounded-[4px] px-[6px] py-px" style={{ ...textStyle(12, 20, '#fff'), background: cell.bearish ? M4 : M3 }}>{cell.label}</span>
      );
    /* Amount — 数值 + gap6 + 4 档位点(30×6,点 6px 间距 2) */
    case 'dots':
      return (
        <div className="flex items-center justify-end gap-[6px]">
          <span className="whitespace-nowrap" style={textStyle(14, 22, N9)}>{cell.text}</span>
          <span className="flex w-[30px] shrink-0 items-center gap-[2px]">
            {[0, 1, 2, 3].map((index) => <span key={index} className="size-[6px] rounded-full" style={{ background: index < cell.filled ? M1 : L12 }} />)}
          </span>
        </div>
      );
    case 'text':
    default:
      return (
        <span className={`min-w-0 flex-1 truncate ${align === 'right' ? 'text-right' : ''}`} style={textStyle(14, 22, cell.color ?? N9)}>{cell.text}</span>
      );
  }
}

/* 数据行 — px16 py8;稿 12577:30537 改为下边线(表头与前 3 行 border-b),末行不带线 */
function ResultRow({ columns, cells, divider = true }: { columns: Column[]; cells: Cell[]; divider?: boolean }) {
  return (
    <div className="flex w-full items-center gap-[20px] overflow-hidden px-[16px] py-[8px]" style={divider ? { borderBottom: `0.5px solid ${L12}` } : undefined}>
      {columns.map((column, index) => (
        <ColumnCell key={column.label} column={column}>
          <CellView cell={cells[index]} align={column.align} />
        </ColumnCell>
      ))}
    </div>
  );
}

/* onRun 带上选中项的 prompt — 用户消息在点 Run 时才发出(内容即所选 screen 的 prompt),不在入口处预插 */
export function ScreenerSetupCard({ onRun }: { onRun: (key: ScreenKey, prompt: string) => void }) {
  const [selected, setSelected] = useState<ScreenKey>('congress');
  const screen = SCREEN_OPTIONS.find((option) => option.key === selected) ?? SCREEN_OPTIONS[0];

  return (
    <div className="w-full overflow-hidden rounded-[8px] bg-white" style={{ border: `0.5px solid ${L2}` }}>
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          {/* 稿 12585:54746:pt28 px32 gap20,标题居中 */}
          <div className="relative flex flex-col items-center gap-[20px] overflow-hidden px-[32px] pt-[28px]">
            {/* 底图 — 稿 12585:54829/54831:m1 底 opacity30,图 1310×808、top -235 / bottom -247、mix-blend-lighten。
                稿写 left -274,但整层套了一次 -scale-x-100(内层再翻回图片本身),镜像后视觉左边缘在 -106(=-11.4%) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--main-m1,#49a3a6)] opacity-30">
              <img
                src={`${import.meta.env.BASE_URL}screener-ascii-pattern.png`}
                alt=""
                className="absolute max-w-none mix-blend-lighten"
                style={{ top: -235, height: 'calc(100% + 482px)', left: '-11.4%', width: 'auto', aspectRatio: '1310 / 808' }}
              />
            </div>

            {/* 大标题 — 稿:Regular 24/34,tracking .24,n10(纯黑),nowrap */}
            <p className="relative shrink-0 whitespace-nowrap" style={textStyle(24, 34, 'var(--text-n10, #000)')}>
              {PREVIEW_TITLE_PREFIX}{screen.title}
            </p>

            <div className="relative w-full shrink-0 overflow-hidden rounded-t-[8px] bg-white shadow-[0px_8px_30px_0px_rgba(0,0,0,0.1)]" style={{ borderTop: `0.5px solid ${L2}`, borderLeft: `0.5px solid ${L2}`, borderRight: `0.5px solid ${L2}` }}>
              <div className="flex w-full items-center gap-[20px] overflow-hidden px-[16px]" style={{ borderBottom: `0.5px solid ${L12}` }}>
                {screen.columns.map((column) => (
                  <ColumnCell key={column.label} column={column}>
                    <span className={`min-w-0 flex-1 truncate py-[8px] ${column.align === 'right' ? 'text-right' : ''}`} style={textStyle(12, 20, N7)}>{column.label}</span>
                  </ColumnCell>
                ))}
              </div>

              {/* 稿 12577:30537:前 3 行明文,只有末行被遮罩 */}
              {screen.rows.slice(0, 3).map((cells, index) => (
                <ResultRow key={`${selected}-${index}`} columns={screen.columns} cells={cells} />
              ))}

              <div className="relative overflow-hidden">
                <div aria-hidden="true">
                  {screen.rows.slice(3).map((cells, index) => (
                    <ResultRow key={`${selected}-locked-${index}`} columns={screen.columns} cells={cells} divider={false} />
                  ))}
                </div>
                {/* Mask — 稿:h52 铺满末行,横排 gap8;32px br05 圆底 + 18px 锁(asset fill black/0.9 → n9) + 14 n5 文案 */}
                <div className="absolute inset-0 flex items-center justify-center gap-[8px] bg-[rgba(255,255,255,0.85)] backdrop-blur-[3px]">
                  <span className="flex size-[32px] shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--b-r05, rgba(0,0,0,0.05))' }}>
                    <CdnIcon name="locked-l" size={18} color={N9} />
                  </span>
                  <span className="whitespace-nowrap" style={textStyle(14, 22, N5)}>8 more — run to reveal</span>
                </div>
              </div>
            </div>
          </div>

          {/* 稿 12577:30537 已移除「Pick a screen…」小标题行(Prompt Row 1 hidden),选项直接接在预览下 */}
          {SCREEN_OPTIONS.map((option) => {
            const active = selected === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelected(option.key)}
                className="flex w-full cursor-pointer items-center gap-[12px] px-[16px] py-[12px] text-left transition-colors"
                style={{ background: active ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : '#fff', border: 'none', borderTop: `0.5px solid ${L12}` }}
              >
                <span className="min-w-0 flex-1 truncate" style={textStyle(14, 22, N9)}>{option.prompt}</span>
                {/* 选中:m1 实心 + 居中白点(稿 inset 32.5%);未选中:g1 灰实心 */}
                <span
                  aria-hidden="true"
                  className="relative size-[16px] shrink-0 rounded-full"
                  style={{ background: active ? M1 : 'var(--grey-g1, #dedede)' }}
                >
                  {active && <span className="absolute inset-[32.5%] rounded-full bg-white" />}
                </span>
              </button>
            );
          })}

          {/* 稿:footer 只留主按钮并右对齐(Language 下拉已移除) */}
          <div className="flex items-center justify-end gap-[20px] bg-white p-[16px]" style={{ borderTop: `0.5px solid ${L12}` }}>
            <button
              type="button"
              onClick={() => onRun(selected, screen.prompt)}
              className="flex h-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-none px-[20px] py-[9px] text-white transition-opacity hover:opacity-90"
              style={{ ...textStyle(14, 22, '#fff', 500), background: M1 }}
            >
              Run to reveal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
