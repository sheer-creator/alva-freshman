/**
 * [INPUT]: 静态 KPI mock 数据
 * [OUTPUT]: Metric Card — 4 指标共用一卡,divider-v 分隔 (按 alva-design Metric Card 规范)
 * [POS]: Widget 层 — Workspace 页使用
 */

import { WidgetTitle } from '@/app/components/alva-ui-kit';

const FONT = "'Delight', sans-serif";

interface KPI {
  label: string;
  value: string;
  delta?: string;
  color?: string;     // m3 绿 / m4 红 / n9 中性
}

const KPIS: KPI[] = [
  { label: 'Market Cap',        value: '$3.12T',  delta: '+2.4%',          color: 'var(--main-m3)' },
  { label: 'Trailing P/E',      value: '48.2x',   delta: 'vs 32 SPX',      color: 'var(--text-n9)' },
  { label: 'Annualized Return', value: '+38.7%',  delta: '5y avg',         color: 'var(--main-m3)' },
  { label: 'Max Drawdown',      value: '-27.3%',  delta: 'peak-to-trough', color: 'var(--main-m4)' },
];

function MetricItem({ kpi }: { kpi: KPI }) {
  return (
    <div
      className="flex flex-col gap-[2px] items-start justify-center"
      style={{ flex: '1 1 140px', minWidth: 140 }}
    >
      <span
        className="leading-[18px] text-[11px] tracking-[0.11px]"
        style={{ color: 'var(--text-n7)', fontFamily: FONT }}
      >
        {kpi.label}
      </span>
      <span
        className="leading-[34px] text-[24px] tracking-[0.24px]"
        style={{ color: kpi.color ?? 'var(--text-n9)', fontFamily: FONT }}
      >
        {kpi.value}
      </span>
      {kpi.delta && (
        <span
          className="leading-[18px] text-[11px] tracking-[0.11px]"
          style={{ color: 'var(--text-n5)', fontFamily: FONT }}
        >
          {kpi.delta}
        </span>
      )}
    </div>
  );
}

function DividerV() {
  return (
    <div
      className="shrink-0 self-stretch"
      style={{ width: 1, background: 'var(--line-l05)', marginBlock: 'var(--spacing-xxs)' }}
    />
  );
}

export function KPISnapshotWidget() {
  return (
    <div className="flex flex-col gap-[16px] w-full relative">
      <WidgetTitle title="Key Metrics" timestamp="02/12/2026 12:30" showArrow={false} />
      <div
        className="flex flex-wrap gap-x-[20px] gap-y-[16px] items-stretch w-full rounded-[6px]"
        style={{ background: 'var(--grey-g01)', padding: 'var(--spacing-l)' }}
      >
        {KPIS.map((k, i) => (
          <div key={k.label} className="flex items-stretch" style={{ flex: '1 1 140px', minWidth: 140 }}>
            {i > 0 && <DividerV />}
            <div style={{ flex: '1 1 0', minWidth: 0, paddingLeft: i > 0 ? 'var(--spacing-l)' : 0 }}>
              <MetricItem kpi={k} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
