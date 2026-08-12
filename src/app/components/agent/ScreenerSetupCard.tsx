/**
 * [INPUT]: Figma Onboard Card/Screener2 (12577:31181) — congress 态整卡,底图 (12719:31003)
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
/* Tag/Status Dot 的外圈是组件写死的 #DBEDED(= m1 20% 压白),不是 token */
const STATUS_DOT_RING = '#dbeded';

/* 预览区大标题前缀 — 稿 12719:30992「Screener · What Congress Just Bought」 */
const PREVIEW_TITLE_PREFIX = 'Screener · ';
/* 数据时点 — 稿 12993:229377 只给了一条,四个 screen 共用(不随选中项变) */
const PREVIEW_TIMESTAMP = 'May 8, 12:00 PM';

export type ScreenKey = 'congress' | 'options' | 'shorted' | 'breakouts';

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
  /* 标题行右端的卡片级 meta — spec 给 short/breakout 指定了结算日 / 收盘口径,其余回落到稿上的运行时点 */
  meta?: string;
  columns: Column[];
  /* 稿 12577:31181:表格 3 行(前 2 明文 + 第 3 行遮罩) */
  rows: [Cell[], Cell[], Cell[]];
}

/* congress — Figma 4605:13564:5 列,首列人像 + 党派;Trade 标签、Amount 档位点为该 screen 专有。
   列名与格式按 spec congress-trades:Type → Trade、Filed after → Filing delay(自然日差,非"几天前申报"),
   金额区间两端都带 $ */
const CONGRESS: ScreenOption = {
  key: 'congress',
  prompt: 'Track what members of Congress just bought — weekdays 9:00 AM ET',
  title: 'What Congress Just Bought',
  columns: [
    { label: 'Member', width: 280 },
    { label: 'Ticker' },
    { label: 'Trade', width: 100 },
    { label: 'Amount', align: 'right' },
    { label: 'Filing delay', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'Sheldon Whitehouse', sub: 'D · Senate · RI', portrait: 'screener-sheldon-whitehouse.jpg' },
      { kind: 'ticker', ticker: 'NVDA' },
      { kind: 'badge', label: 'BUY' },
      { kind: 'dots', text: '$1K–$15K', filled: 1 },
      { kind: 'text', text: '4 days' },
    ],
    [
      { kind: 'member', symbol: 'Pete Sessions', sub: 'R · House · TX-17', portrait: 'screener-pete-sessions.jpg' },
      { kind: 'ticker', ticker: 'ORCL' },
      { kind: 'badge', label: 'BUY' },
      { kind: 'dots', text: '$1K–$15K', filled: 1 },
      { kind: 'text', text: '4 days' },
    ],
    [
      { kind: 'member', symbol: 'Adrian Smith', sub: 'R · House · NE-3', portrait: 'screener-adrian-smith.jpg' },
      { kind: 'ticker', ticker: 'RKLB' },
      { kind: 'badge', label: 'BUY' },
      { kind: 'dots', text: '$15K–$50K', filled: 2 },
      { kind: 'text', text: '1 day' },
    ],
  ],
};

/* options — Figma 12555:79555:4 列,Contract 为 CALL(m3)/PUT(m4) 标签 + 行权;比值列走 n9(稿已从 m1 改回)。
   列名与枚举按 spec options-whales:Premium → Premium traded、Vs avg vol → Vol / OI(成交量 ÷ OI,
   脚本没有均量字段)、Calls/Puts → CALL/PUT */
const OPTIONS: ScreenOption = {
  key: 'options',
  prompt: "See today's biggest unusual options bets — weekdays at 5:15 PM ET",
  title: 'Biggest Unusual Options Bets',
  columns: [
    { label: 'Ticker', width: 280 },
    { label: 'Contract' },
    { label: 'Premium traded', align: 'right' },
    { label: 'Vol / OI', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'MSFT', sub: 'Microsoft Corporation' },
      { kind: 'tagText', tag: 'CALL', text: '$520 · Oct 17' },
      { kind: 'text', text: '$3.6M' },
      { kind: 'text', text: '18×' },
    ],
    [
      { kind: 'member', symbol: 'TSLA', sub: 'Tesla, Inc.' },
      { kind: 'tagText', tag: 'PUT', bearish: true, text: '$300 · Sep 19' },
      { kind: 'text', text: '$2.8M' },
      { kind: 'text', text: '21×' },
    ],
    [
      { kind: 'member', symbol: 'COIN', sub: 'Coinbase Global, Inc.' },
      { kind: 'tagText', tag: 'PUT', bearish: true, text: '$220 · Sep 5' },
      { kind: 'text', text: '$1.4M' },
      { kind: 'text', text: '12×' },
    ],
  ],
};

/* shorted — Figma 12555:79623:Short float 列固定 210(进度条 48×4 + 数值);变化值三行都走 m4(空头走高即偏空)。
   列名与单位按 spec short-squeeze:Short % of float → Short float、WoW → Change vs prior,
   数值是空头数量相对上一结算期的百分比变化(%),不是百分点(pt);结算日进 meta */
const SHORTED: ScreenOption = {
  key: 'shorted',
  prompt: "Track the market's most heavily shorted stocks — when new short data lands",
  title: 'Most Heavily Shorted Stocks',
  meta: 'Settlement: Jul 31',
  columns: [
    { label: 'Ticker', width: 280 },
    { label: 'Short float', width: 210 },
    { label: 'Change vs prior', align: 'right' },
    { label: 'Days to cover', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'OPEN', sub: 'Opendoor Technologies, Inc.' },
      { kind: 'meter', pct: 38.4, text: '38.4%' },
      { kind: 'text', text: '+2.6%', color: M4 },
      { kind: 'text', text: '2.9 d' },
    ],
    [
      { kind: 'member', symbol: 'CLSK', sub: 'CleanSpark, Inc.' },
      { kind: 'meter', pct: 31.7, text: '31.7%' },
      { kind: 'text', text: '+1.4%', color: M4 },
      { kind: 'text', text: '4.6 d' },
    ],
    [
      { kind: 'member', symbol: 'AI', sub: 'C3.ai, Inc.' },
      { kind: 'meter', pct: 24.5, text: '24.5%' },
      { kind: 'text', text: '+0.6%', color: M4 },
      { kind: 'text', text: '3.1 d' },
    ],
  ],
};

/* breakouts — 稿未出图,沿用 options/shorted 的统一列型外推。
   列名与格式按 spec breakout:1-mo → 20D HIGH(脚本窗口就是前 20 个交易日)、Vs avg vol → Vol vs 20D avg;
   Triggered 分钟数是脚本里不存在的字段,删掉换成 Day change(相对前收涨跌幅);日线收盘口径进 meta */
const BREAKOUTS: ScreenOption = {
  key: 'breakouts',
  prompt: 'Find breakouts to one-month highs on double the usual volume — weekdays 4:30 PM ET',
  title: 'Breakouts to One-Month Highs',
  meta: 'As of Aug 6 close',
  columns: [
    { label: 'Ticker', width: 280 },
    { label: 'Breakout' },
    { label: 'Vol vs 20D avg', align: 'right' },
    { label: 'Day change', align: 'right' },
  ],
  rows: [
    [
      { kind: 'member', symbol: 'RKLB', sub: 'Rocket Lab USA, Inc.' },
      { kind: 'tagText', tag: '20D HIGH', text: '$32.40' },
      { kind: 'text', text: '2.8×' },
      { kind: 'text', text: '+4.1%', color: M3 },
    ],
    [
      { kind: 'member', symbol: 'MU', sub: 'Micron Technology, Inc.' },
      { kind: 'tagText', tag: '20D HIGH', text: '$142.80' },
      { kind: 'text', text: '2.3×' },
      { kind: 'text', text: '+3.4%', color: M3 },
    ],
    [
      { kind: 'member', symbol: 'HOOD', sub: 'Robinhood Markets, Inc.' },
      { kind: 'tagText', tag: '20D HIGH', text: '$98.10' },
      { kind: 'text', text: '2.2×' },
      { kind: 'text', text: '+2.9%', color: M3 },
    ],
  ],
};

/* 稿 12577:31181:选项收到 4 条(Prompt Row 6 已 hidden) */
const SCREEN_OPTIONS: ScreenOption[] = [CONGRESS, OPTIONS, SHORTED, BREAKOUTS];

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
          {/* 稿 12585:54746:pt24 px32 gap16(pb 0,表格直接压卡沿) */}
          <div className="relative flex flex-col gap-[16px] overflow-hidden px-[32px] pt-[24px]">
            {/* 底图 — 稿 12719:31003:m1 底 opacity15,图 1310×808、top -493、mix-blend-lighten。
                稿写 left -380 + 外层 -scale-x-100 → 镜像后等价于 right -380(图右侧超出 380、左边缘随卡宽走);
                内层 rotate-180 与外层 -scale-x-100 相消后净剩一次垂直翻转 */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--main-m1,#49a3a6)] opacity-15">
              <img
                src={`${import.meta.env.BASE_URL}screener-ascii-pattern.png`}
                alt=""
                className="absolute max-w-none object-cover mix-blend-lighten"
                style={{ top: -493, right: -380, width: 1310, height: 808, transform: 'scaleY(-1)' }}
              />
            </div>

            {/* 标题行 — 稿 12719:30990:gap10;Tag/Status Dot 20(外圈 #DBEDED + 内点 inset28.6% m1)
                + Regular 20/30 n9 标题 + 右端 Regular 14/22 n5 数据时点 */}
            <div className="relative flex w-full shrink-0 items-center gap-[10px]">
              <span aria-hidden="true" className="relative size-[20px] shrink-0 rounded-full" style={{ background: STATUS_DOT_RING }}>
                <span className="absolute inset-[28.6%] rounded-full" style={{ background: M1 }} />
              </span>
              <p className="min-w-0 flex-1" style={textStyle(20, 30, N9)}>
                {PREVIEW_TITLE_PREFIX}{screen.title}
              </p>
              <span className="shrink-0 whitespace-nowrap text-right" style={textStyle(14, 22, N5)}>{screen.meta ?? PREVIEW_TIMESTAMP}</span>
            </div>

            <div className="relative w-full shrink-0 overflow-hidden rounded-t-[8px] bg-white shadow-[0px_15px_30px_0px_rgba(0,0,0,0.1)]" style={{ borderTop: `0.5px solid ${L2}`, borderLeft: `0.5px solid ${L2}`, borderRight: `0.5px solid ${L2}` }}>
              <div className="flex w-full items-center gap-[20px] overflow-hidden px-[16px]" style={{ borderBottom: `0.5px solid ${L12}` }}>
                {screen.columns.map((column) => (
                  <ColumnCell key={column.label} column={column}>
                    <span className={`min-w-0 flex-1 truncate py-[8px] ${column.align === 'right' ? 'text-right' : ''}`} style={textStyle(12, 20, N7)}>{column.label}</span>
                  </ColumnCell>
                ))}
              </div>

              {/* 稿 12577:31181:表格收到 3 行 — 前 2 行明文,第 3 行被遮罩 */}
              {screen.rows.slice(0, 2).map((cells, index) => (
                <ResultRow key={`${selected}-${index}`} columns={screen.columns} cells={cells} />
              ))}

              <div className="relative overflow-hidden">
                <div aria-hidden="true">
                  {screen.rows.slice(2, 3).map((cells, index) => (
                    <ResultRow key={`${selected}-locked-${index}`} columns={screen.columns} cells={cells} divider={false} />
                  ))}
                </div>
                {/* Mask — 稿:h52 铺满末行,横排 gap8;32px 圆底(白 + 0.5px l2 描边)+ 18px 锁(asset fill black/0.9 → n9) + 14 n5 文案 */}
                <div className="absolute inset-0 flex items-center justify-center gap-[8px] bg-[rgba(255,255,255,0.9)] backdrop-blur-[3px]">
                  <span className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-white" style={{ border: `0.5px solid ${L2}` }}>
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

          {/* 稿 12707:29751 bottom:p16 gap12,只留主按钮并右对齐 */}
          <div className="flex items-center justify-end gap-[12px] bg-white p-[16px]" style={{ borderTop: `0.5px solid ${L12}` }}>
            <button
              type="button"
              onClick={() => onRun(selected, screen.prompt)}
              className="flex h-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-none px-[20px] py-[9px] text-white transition-opacity hover:opacity-90"
              style={{ ...textStyle(14, 22, '#fff', 500), background: M1 }}
            >
              Run to Reveal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
