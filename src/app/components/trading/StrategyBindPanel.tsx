/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: "Trade with this Strategy" 弹出面板
 * [POS]: 交易组件 — PlaybookTopbar 弹层内容
 */

import { useState } from 'react';

const FONT_FAMILY = "'Delight', sans-serif";

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
        >{o === 'approval' ? 'Approval' : o === 'auto' ? 'Auto' : o}</button>
      ))}
    </div>
  );
}

/* ========== 组件 ========== */

export function StrategyBindPanel() {
  const [broker, setBroker] = useState('IBKR');
  const [allocation, setAllocation] = useState('30000');
  const [mode, setMode] = useState<'approval' | 'auto'>('approval');

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

        {/* Allocation */}
        <div>
          <label className="text-[11px] mb-[6px] block uppercase tracking-[0.04em]" style={{ color: 'var(--text-n3)', fontWeight: 500 }}>Allocation</label>
          <div className="flex items-center" style={{ background: 'var(--grey-g01)', borderRadius: 6, padding: '0 12px' }}>
            <span className="text-[14px]" style={{ color: 'var(--text-n3)' }}>$</span>
            <input
              type="text"
              value={allocation}
              onChange={e => setAllocation(e.target.value)}
              className="text-[14px] flex-1 py-[9px] px-[6px]"
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-n9)', fontFamily: FONT_FAMILY, fontVariantNumeric: 'tabular-nums' }}
            />
          </div>
        </div>

        {/* Mode */}
        <div>
          <label className="text-[11px] mb-[6px] block uppercase tracking-[0.04em]" style={{ color: 'var(--text-n3)', fontWeight: 500 }}>Execution Mode</label>
          <PillSelector options={['approval', 'auto'] as ('approval' | 'auto')[]} value={mode} onChange={setMode} />
        </div>

        {/* Preview */}
        <div className="mt-[4px]">
          <label className="text-[11px] mb-[8px] block uppercase tracking-[0.04em]" style={{ color: 'var(--text-n3)', fontWeight: 500 }}>Preview</label>
          <div className="flex flex-col gap-[8px] py-[12px] px-[14px] rounded-[6px]" style={{ background: 'rgba(73,163,166,0.04)', border: '0.5px solid rgba(73,163,166,0.12)' }}>
            {[
              { side: 'Buy', symbol: 'AAPL', detail: '10 shares', value: '$1,923', color: 'var(--main-m3)' },
              { side: 'Sell', symbol: 'NVDA', detail: '5 shares', value: '$4,602', color: 'var(--main-m4)' },
              { side: 'Buy', symbol: 'AMZN', detail: '8 shares', value: '$1,492', color: 'var(--main-m3)' },
            ].map(row => (
              <div key={row.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <span className="text-[11px] font-medium" style={{ color: row.color }}>{row.side}</span>
                  <span className="text-[12px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{row.symbol}</span>
                  <span className="text-[11px]" style={{ color: 'var(--text-n3)' }}>{row.detail}</span>
                </div>
                <span className="text-[12px]" style={{ color: 'var(--text-n5)', fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
              </div>
            ))}
            <div className="h-[1px] my-[2px]" style={{ background: 'rgba(73,163,166,0.12)' }} />
            <div className="flex items-center justify-between">
              <span className="text-[12px]" style={{ color: 'var(--text-n7)', fontWeight: 500 }}>Net</span>
              <span className="text-[12px]" style={{ color: 'var(--main-m4)', fontVariantNumeric: 'tabular-nums' }}>sell $1,187 → cash</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-[8px] mt-[4px]">
          <button
            className="transition-colors hover:opacity-90"
            style={{ flex: 1, padding: '10px 0', borderRadius: 6, border: 'none', background: '#49a3a6', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT_FAMILY }}
          >Bind & Execute</button>
          <button
            className="transition-colors hover:border-[rgba(0,0,0,0.4)]"
            style={{ flex: 1, padding: '10px 0', borderRadius: 6, border: '0.5px solid var(--line-l3)', background: 'transparent', color: 'var(--text-n7)', fontSize: 13, fontWeight: 400, cursor: 'pointer', fontFamily: FONT_FAMILY }}
          >Bind Only</button>
        </div>
      </div>
    </div>
  );
}
