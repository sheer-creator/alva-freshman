/**
 * [INPUT]: onNavigate (可选，用于 Execute 后跳转)
 * [OUTPUT]: "Trade with this Strategy" 弹出面板（三阶段：signal → computing → order preview）
 * [POS]: 交易组件 — PlaybookTopbar 弹层内容
 */

import { useState, useEffect, useRef } from 'react';
import type { Page } from '@/app/App';

const FONT_FAMILY = "'Delight', sans-serif";

/* ========== 类型 ========== */

interface SignalWeight {
  symbol: string;
  weight: number;
}

interface OrderRow {
  side: 'Buy' | 'Sell';
  symbol: string;
  detail: string;
  value: string;
}

/* ========== Mock：最近一次 signal ========== */

const MOCK_LAST_SIGNAL = {
  date: 1772755200000,
  reason: 'Grid BUY: price dropped -3.6% from ref',
  weights: [
    { symbol: 'PAXG', weight: 0.40 },
    { symbol: 'BTC', weight: 0.35 },
    { symbol: 'ETH', weight: 0.25 },
  ] as SignalWeight[],
};

/** Bind 后模拟计算出的下单计划 */
const MOCK_ORDER_PLAN: OrderRow[] = [
  { side: 'Buy', symbol: 'PAXG', detail: '0.15 units', value: '$382' },
  { side: 'Buy', symbol: 'BTC', detail: '0.005 BTC', value: '$335' },
  { side: 'Sell', symbol: 'ETH', detail: '0.08 ETH', value: '$274' },
];

/* ========== Pill Selector ========== */

function PillSelector<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex gap-[4px]" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 8, padding: 3 }}>
      {options.map(o => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className="flex-1 text-[12px] py-[6px] rounded-[6px] cursor-pointer transition-all"
          style={{
            background: value === o ? '#fff' : 'transparent',
            color: value === o ? 'var(--text-n9)' : 'var(--text-n3)',
            border: 'none', fontFamily: FONT_FAMILY, fontWeight: value === o ? 500 : 400,
            boxShadow: value === o ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
          }}
        >{o}</button>
      ))}
    </div>
  );
}

/* ========== Signal Weights 展示 ========== */

function SignalPreview({ signal }: { signal: typeof MOCK_LAST_SIGNAL }) {
  const dateStr = new Date(signal.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  return (
    <div className="flex flex-col gap-[8px] py-[12px] px-[14px] rounded-[6px]" style={{ background: 'rgba(73,163,166,0.04)', border: '0.5px solid rgba(73,163,166,0.12)' }}>
      {/* Signal 时间 + 原因 */}
      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={{ color: 'var(--text-n3)' }}>Last signal</span>
        <span className="text-[11px]" style={{ color: 'var(--text-n3)', fontVariantNumeric: 'tabular-nums' }}>{dateStr}</span>
      </div>
      <p className="text-[11px] leading-[16px]" style={{ color: 'var(--text-n5)', margin: 0 }}>{signal.reason}</p>
      <div className="h-[1px]" style={{ background: 'rgba(73,163,166,0.12)' }} />
      {/* Target weights 列表 */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.04em]" style={{ color: 'var(--text-n3)', fontWeight: 500 }}>Symbol</span>
        <span className="text-[11px] uppercase tracking-[0.04em]" style={{ color: 'var(--text-n3)', fontWeight: 500 }}>Target Weight</span>
      </div>
      {signal.weights.map(w => (
        <div key={w.symbol} className="flex items-center justify-between">
          <span className="text-[12px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{w.symbol}</span>
          <span className="text-[12px]" style={{ color: 'var(--text-n7)', fontVariantNumeric: 'tabular-nums' }}>{(w.weight * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}

/* ========== Order Preview（计算后展示） ========== */

function OrderPreview({ orders }: { orders: OrderRow[] }) {
  return (
    <div className="flex flex-col gap-[8px] py-[12px] px-[14px] rounded-[6px]" style={{ background: 'rgba(73,163,166,0.04)', border: '0.5px solid rgba(73,163,166,0.12)' }}>
      {orders.map(row => (
        <div key={row.symbol} className="flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <span className="text-[11px] font-medium" style={{ color: row.side === 'Buy' ? 'var(--main-m3)' : 'var(--main-m4)' }}>{row.side}</span>
            <span className="text-[12px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{row.symbol}</span>
            <span className="text-[11px]" style={{ color: 'var(--text-n3)' }}>{row.detail}</span>
          </div>
          <span className="text-[12px]" style={{ color: 'var(--text-n5)', fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
        </div>
      ))}
      <div className="h-[1px] my-[2px]" style={{ background: 'rgba(73,163,166,0.12)' }} />
      <p className="text-[11px] leading-[16px] m-0" style={{ color: 'var(--text-n5)' }}>
        These are the trades that will be executed to align your portfolio with this Playbook. Confirm to proceed.
      </p>
    </div>
  );
}

/* ========== 加载动画 ========== */

function ComputingSpinner() {
  return (
    <div className="flex flex-col items-center gap-[12px] py-[24px]">
      <style>{`@keyframes spin-bind { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 28, height: 28, border: '2.5px solid rgba(73,163,166,0.15)', borderTopColor: '#49a3a6', borderRadius: '50%', animation: 'spin-bind 0.8s linear infinite' }} />
      <span className="text-[12px]" style={{ color: 'var(--text-n5)', fontFamily: FONT_FAMILY }}>Computing order plan…</span>
    </div>
  );
}

/* ========== 主组件 ========== */

type Phase = 'signal' | 'computing' | 'preview' | 'done';

export function StrategyBindPanel({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  const [broker, setBroker] = useState('Binance');
  const [phase, setPhase] = useState<Phase>('signal');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleBind = () => {
    setPhase('computing');
    timerRef.current = setTimeout(() => setPhase('preview'), 1800);
  };

  const handleExecute = () => {
    setPhase('done');
    sessionStorage.setItem('trade-executed', '1');
    timerRef.current = setTimeout(() => onNavigate?.('portfolio'), 1200);
  };

  return (
    <div style={{ width: 400, padding: '20px 24px' }}>
      {/* Title */}
      <p style={{ fontSize: 14, color: 'var(--text-n9)', fontWeight: 500, margin: '0 0 20px', fontFamily: FONT_FAMILY }}>
        Trade with this Strategy
      </p>

      <div className="flex flex-col gap-[16px]">
        {/* Broker */}
        <div>
          <label className="text-[11px] mb-[6px] block uppercase tracking-[0.04em]" style={{ color: 'var(--text-n3)', fontWeight: 500 }}>Broker</label>
          <PillSelector options={['IBKR', 'Binance', 'Alpaca']} value={broker} onChange={setBroker} />
        </div>

        {/* Signal / Computing / Order Preview / Done */}
        {phase === 'done' ? (
          <div className="flex flex-col items-center gap-[10px] py-[32px]">
            <style>{`@keyframes check-pop { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 36, height: 36, background: 'rgba(73,163,166,0.12)', animation: 'check-pop 0.3s ease-out' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9.5L7.5 13L14 5.5" stroke="#49a3a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[13px]" style={{ color: 'var(--text-n9)', fontWeight: 500, fontFamily: FONT_FAMILY }}>Executed</span>
            <span className="text-[11px]" style={{ color: 'var(--text-n3)', fontFamily: FONT_FAMILY }}>Redirecting to Portfolio…</span>
          </div>
        ) : (
          <>
            <div className="mt-[4px]">
              <label className="text-[11px] mb-[8px] block uppercase tracking-[0.04em]" style={{ color: 'var(--text-n3)', fontWeight: 500 }}>
                {phase === 'preview' ? 'Order Plan' : 'Latest Signal'}
              </label>
              {phase === 'signal' && <SignalPreview signal={MOCK_LAST_SIGNAL} />}
              {phase === 'computing' && <ComputingSpinner />}
              {phase === 'preview' && <OrderPreview orders={MOCK_ORDER_PLAN} />}
            </div>

            {/* Button */}
            <div className="mt-[4px]">
              {phase === 'signal' && (
                <button
                  onClick={handleBind}
                  className="w-full transition-colors hover:opacity-90"
                  style={{ padding: '10px 0', borderRadius: 6, border: 'none', background: '#49a3a6', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_FAMILY }}
                >Bind</button>
              )}
              {phase === 'preview' && (
                <button
                  onClick={handleExecute}
                  className="w-full transition-colors hover:opacity-90"
                  style={{ padding: '10px 0', borderRadius: 6, border: 'none', background: '#49a3a6', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_FAMILY }}
                >Execute</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
