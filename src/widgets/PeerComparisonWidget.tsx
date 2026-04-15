/**
 * [INPUT]: 静态同行对比 mock 数据
 * [OUTPUT]: Table Card — Peer Comparison (按 alva-design Table Card 规范)
 * [POS]: Widget 层 — Workspace 页使用
 */

import { WidgetTitle } from '@/app/components/alva-ui-kit';

const FONT = "'Delight', sans-serif";

interface Peer {
  ticker: string;
  name: string;
  price: string;
  pe: string;
  ytd: number;
  marketCap: string;
  highlight?: boolean;
}

const PEERS: Peer[] = [
  { ticker: 'NVDA', name: 'NVIDIA',   price: '$1,247.50', pe: '48.2', ytd: 62.4,  marketCap: '$3.12T' },
  { ticker: 'AMD',  name: 'AMD',      price: '$184.12',   pe: '54.7', ytd: 22.8,  marketCap: '$298B' },
  { ticker: 'INTC', name: 'Intel',    price: '$32.74',    pe: '—',    ytd: -18.4, marketCap: '$140B' },
  { ticker: 'TSM',  name: 'TSMC',     price: '$201.63',   pe: '28.9', ytd: 34.1,  marketCap: '$1.04T' },
  { ticker: 'AVGO', name: 'Broadcom', price: '$1,723.90', pe: '42.1', ytd: 48.2,  marketCap: '$802B' },
  { ticker: 'QCOM', name: 'Qualcomm', price: '$172.45',   pe: '21.6', ytd: 8.3,   marketCap: '$192B' },
];

/* ========== 单元格 flex 比例(content-proportional) ========== */

const COLS = [
  { key: 'ticker',    align: 'left',  flex: '1.4 1 120px' },
  { key: 'price',     align: 'right', flex: '1 1 100px' },
  { key: 'pe',        align: 'right', flex: '0.6 1 70px' },
  { key: 'ytd',       align: 'right', flex: '0.8 1 80px' },
  { key: 'marketCap', align: 'right', flex: '1 1 100px' },
] as const;

function HeaderCell({ idx, children }: { idx: number; children: React.ReactNode }) {
  const col = COLS[idx];
  return (
    <div
      className="flex items-center text-[14px] leading-[22px] tracking-[0.14px]"
      style={{
        flex: col.flex,
        justifyContent: col.align === 'right' ? 'flex-end' : 'flex-start',
        color: 'var(--text-n7)',
        fontFamily: FONT,
        fontWeight: 400,
        minWidth: 0,
      }}
    >
      {children}
    </div>
  );
}

function BodyCell({ idx, children, color }: { idx: number; children: React.ReactNode; color?: string }) {
  const col = COLS[idx];
  return (
    <div
      className="flex items-center text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap"
      style={{
        flex: col.flex,
        justifyContent: col.align === 'right' ? 'flex-end' : 'flex-start',
        color: color ?? 'var(--text-n9)',
        fontFamily: FONT,
        fontWeight: 400,
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

function YtdValue({ value }: { value: number }) {
  const positive = value >= 0;
  const color = positive ? 'var(--main-m3)' : 'var(--main-m4)';
  const sign = positive ? '+' : '';
  return <span style={{ color }}>{sign}{value.toFixed(1)}%</span>;
}

export function PeerComparisonWidget() {
  return (
    <div className="flex flex-col gap-[16px] w-full relative">
      <WidgetTitle title="Peer Comparison" timestamp="02/12/2026 12:30" showArrow={false} />
      <div className="flex flex-col w-full" style={{ overflowX: 'auto' }}>
        {/* Header */}
        <div
          className="flex w-full"
          style={{
            gap: 'var(--spacing-m)',
            padding: '0 0 12px 0',
            borderBottom: '1px solid var(--line-l07)',
          }}
        >
          <HeaderCell idx={0}>Ticker</HeaderCell>
          <HeaderCell idx={1}>Price</HeaderCell>
          <HeaderCell idx={2}>P/E</HeaderCell>
          <HeaderCell idx={3}>YTD</HeaderCell>
          <HeaderCell idx={4}>Market Cap</HeaderCell>
        </div>
        {/* Body rows */}
        {PEERS.map((p, i) => {
          const isLast = i === PEERS.length - 1;
          return (
            <div
              key={p.ticker}
              className="flex w-full"
              style={{
                gap: 'var(--spacing-m)',
                padding: '12px 0',
                borderBottom: isLast ? 'none' : '1px solid var(--line-l07)',
                background: p.highlight ? 'var(--b-r02)' : 'transparent',
                borderRadius: p.highlight ? 'var(--radius-ct-xs)' : 0,
              }}
            >
              <BodyCell idx={0}>
                <span style={{ fontWeight: 500 }}>{p.ticker}</span>
                <span
                  className="ml-[8px] text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ color: 'var(--text-n5)', fontFamily: FONT }}
                >
                  {p.name}
                </span>
              </BodyCell>
              <BodyCell idx={1}>{p.price}</BodyCell>
              <BodyCell idx={2}>{p.pe}</BodyCell>
              <BodyCell idx={3}><YtdValue value={p.ytd} /></BodyCell>
              <BodyCell idx={4}>{p.marketCap}</BodyCell>
            </div>
          );
        })}
      </div>
    </div>
  );
}
