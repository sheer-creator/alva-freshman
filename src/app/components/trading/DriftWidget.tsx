/**
 * [INPUT]: AlvaWatermark
 * [OUTPUT]: Holdings Alignment 可视化 Widget
 * [POS]: 交易组件 — PlaybookDetail 页面 drift 展示
 */

import { AlvaWatermark } from '@/app/components/alva-ui-kit';

const FONT_FAMILY = "'Delight', sans-serif";

/* ========== 类型 ========== */

interface DriftWidgetProps {
  weights: { symbol: string; currentWeight: number; targetWeight: number; drift: number }[];
  totalDrift?: number;
  lastRebalance?: string;
}

/* ========== Weight Bar Row ========== */

function WeightRow({ w }: { w: DriftWidgetProps['weights'][0] }) {
  const maxW = Math.max(w.currentWeight, w.targetWeight, 0.01);
  const scale = 1 / (maxW * 1.3);
  const aligned = Math.abs(w.drift) < 0.005;
  const driftDollar = Math.round(w.drift * 50000);
  const dollarSign = driftDollar >= 0 ? '+' : '';

  return (
    <div className="flex items-center gap-[10px] py-[7px]">
      <span className="text-[12px] w-[36px] shrink-0" style={{ color: 'var(--text-n9)', fontWeight: 500, fontFamily: FONT_FAMILY }}>{w.symbol}</span>
      <div className="flex-1 h-[14px] relative" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 7 }}>
        {/* Target dashed */}
        <div className="absolute top-0 bottom-0 left-0 rounded-[7px]" style={{
          width: `${w.targetWeight * scale * 100}%`,
          border: '1px dashed rgba(73,163,166,0.3)',
        }} />
        {/* Current fill */}
        <div className="absolute top-0 bottom-0 left-0 rounded-[7px]" style={{
          width: `${w.currentWeight * scale * 100}%`,
          background: aligned
            ? 'linear-gradient(90deg, rgba(73,163,166,0.3), rgba(73,163,166,0.45))'
            : 'linear-gradient(90deg, rgba(73,163,166,0.6), #49a3a6)',
          transition: 'width 0.3s',
        }} />
      </div>
      <span className="text-[11px] w-[72px] shrink-0 text-right" style={{ color: 'var(--text-n5)', fontFamily: FONT_FAMILY, fontVariantNumeric: 'tabular-nums' }}>
        {(w.currentWeight * 100).toFixed(0)}% → {(w.targetWeight * 100).toFixed(0)}%
      </span>
      <span className="text-[11px] w-[68px] shrink-0 text-right" style={{
        color: aligned ? 'var(--main-m3)' : driftDollar > 0 ? 'var(--text-n7)' : 'var(--main-m4)',
        fontFamily: FONT_FAMILY, fontVariantNumeric: 'tabular-nums',
      }}>
        {aligned ? '✓ aligned' : `${dollarSign}$${Math.abs(driftDollar).toLocaleString()}`}
      </span>
    </div>
  );
}

/* ========== Widget ========== */

export function DriftWidget({ weights, totalDrift = 3.2, lastRebalance = '3 days ago' }: DriftWidgetProps) {
  return (
    <div className="flex-1 relative flex flex-col" style={{ background: 'var(--grey-g01)', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px 10px' }}>
        {/* Title */}
        <div className="flex items-center justify-between mb-[14px]" style={{ height: 22 }}>
          <p className="text-[14px]" style={{ color: 'var(--text-n9)', letterSpacing: 0.14 }}>Holdings Alignment</p>
          <div className="flex items-center gap-[5px]">
            <div className="w-[5px] h-[5px] rounded-full" style={{ background: '#40A544' }} />
            <span className="text-[11px]" style={{ color: 'var(--main-m3)' }}>Live</span>
          </div>
        </div>

        {/* Weight bars */}
        <div className="mb-[14px]">
          {weights.map(w => <WeightRow key={w.symbol} w={w} />)}
        </div>

        {/* Divider */}
        <div className="h-[1px]" style={{ background: 'var(--line-l05)' }} />

        {/* Footer */}
        <div className="flex items-center justify-between py-[12px]">
          <div className="flex items-center gap-[16px]">
            <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>
              Drift <span style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{totalDrift}%</span>
            </span>
            <span className="text-[12px]" style={{ color: 'var(--text-n3)' }}>
              Rebalanced {lastRebalance}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[6px] pb-[4px]">
          <button
            className="transition-colors hover:opacity-90"
            style={{ background: '#49a3a6', color: '#fff', border: 'none', padding: '5px 14px', borderRadius: 4, fontSize: 12, cursor: 'pointer', fontFamily: FONT_FAMILY, fontWeight: 500 }}
          >Rebalance Now</button>
          {['Schedule', 'History'].map(label => (
            <button
              key={label}
              className="transition-colors"
              style={{ background: 'transparent', color: 'var(--text-n5)', border: '0.5px solid var(--line-l3)', padding: '5px 14px', borderRadius: 4, fontSize: 12, cursor: 'pointer', fontFamily: FONT_FAMILY }}
            >{label}</button>
          ))}
        </div>
      </div>
      <AlvaWatermark />
    </div>
  );
}
