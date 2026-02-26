/**
 * [INPUT]: 无
 * [OUTPUT]: NVDA 核心指标 KPI 卡片网格
 * [POS]: Widget 层 — NVDA 全景看板 KPI 概览
 */

import { Fragment } from 'react';

/* ========== 数据 ========== */

interface Metric {
  label: string;
  value: string;
  change?: string;
  trend?: 'positive' | 'negative' | 'neutral';
}

const metrics: Metric[] = [
  { label: 'Market Cap',    value: '$3.08T',  change: '+2.3%',  trend: 'positive' },
  { label: 'P/E (FWD)',     value: '42.6x',   change: '',       trend: 'neutral'  },
  { label: 'Revenue (TTM)', value: '$130.2B', change: '+78%',   trend: 'positive' },
  { label: 'Gross Margin',  value: '75.2%',   change: '+1.8pp', trend: 'positive' },
  { label: 'EPS (TTM)',     value: '$29.68',  change: '+82%',   trend: 'positive' },
  { label: 'FCF Yield',     value: '1.8%',    change: '-0.3pp', trend: 'negative' },
];

const trendColor = {
  positive: 'var(--main-m3)',
  negative: 'var(--main-m4)',
  neutral:  'var(--text-n5)',
} as const;

/* ========== 组件 ========== */

function MetricCell({ label, value, change, trend = 'neutral' }: Metric) {
  return (
    <div className="flex flex-col gap-[6px] p-[20px] min-w-0 flex-1">
      <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px]">
        {label}
      </p>
      <div className="flex items-baseline gap-[6px]">
        <p className="font-['Delight:Regular',sans-serif] text-[24px] font-normal text-[rgba(0,0,0,0.9)] leading-[28px]">
          {value}
        </p>
        {change && (
          <span
            className="font-['Delight:Regular',sans-serif] text-[12px] leading-[20px]"
            style={{ color: trendColor[trend] }}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

export function NVDAKeyMetricsWidget() {
  const row1 = metrics.slice(0, 3);
  const row2 = metrics.slice(3, 6);

  return (
    <div className="flex flex-col gap-[16px] w-full relative overflow-hidden">
      {/* Widget Title */}
      <div className="flex justify-between h-[22px] items-center w-full">
        <p className="font-['Delight:Regular',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          Key Metrics
        </p>
        <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px]">
          As of 02/20/2026
        </p>
      </div>

      {/* Widget Body — g01 背景 */}
      <div
        className="relative rounded-[4px] w-full overflow-hidden"
        style={{ backgroundColor: 'var(--grey-g01)' }}
      >
        <div className="flex flex-col">
          {/* Row 1 */}
          <div className="flex items-stretch">
            {row1.map((m, ci) => (
              <Fragment key={m.label}>
                <MetricCell {...m} />
                {ci < 2 && (
                  /* 竖向分割线：my-[20px] 与单元格内边距对齐，不通栏 */
                  <div className="my-[20px] w-px shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} />
                )}
              </Fragment>
            ))}
          </div>

          {/* 横向分割线：mx-[20px] 与单元格内边距对齐，不通栏 */}
          <div className="mx-[20px] h-px" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} />

          {/* Row 2 */}
          <div className="flex items-stretch">
            {row2.map((m, ci) => (
              <Fragment key={m.label}>
                <MetricCell {...m} />
                {ci < 2 && (
                  <div className="my-[20px] w-px shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="absolute bottom-[16px] left-[20px] font-['Delight:Regular',sans-serif] text-[16px] font-medium text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
