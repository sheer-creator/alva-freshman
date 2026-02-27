/**
 * [INPUT]: 无
 * [OUTPUT]: NVDA Q4 FY25 财报详情 — Beat 对比 + KPI 摘要 + 业务分部
 * [POS]: Widget 层 — Workspace 看板（与 NVDAEarningsWidget 并列）
 */

import { Fragment } from 'react';
import { FONT } from '@/lib/chart-theme';

/* ========== 数据 ========== */

interface BeatData {
  label: string;
  actual: string;
  est: string;
  delta: string;
  pct: string;
}

interface KpiData {
  label: string;
  value: string;
  positive: boolean;
}

interface SegmentData {
  name: string;
  value: number;
  color: string;
}

const BEATS: BeatData[] = [
  { label: 'Revenue',      actual: '$39.33B', est: '$37.90B', delta: '+$1.43B', pct: '+3.8%' },
  { label: 'Non-GAAP EPS', actual: '$0.89',   est: '$0.85',   delta: '+$0.04',  pct: '+4.7%' },
];

const KPIS: KpiData[] = [
  { label: 'Revenue YoY',  value: '+78%',   positive: true  },
  { label: 'Revenue QoQ',  value: '+12.4%', positive: true  },
  { label: 'Gross Margin', value: '73.5%',  positive: false },
  { label: 'Data Center%', value: '90.5%',  positive: false },
];

const SEGMENTS: SegmentData[] = [
  { name: 'Data Center', value: 35.6,  color: '#3D8BD1' },
  { name: 'Gaming',      value: 2.54,  color: '#5F75C9' },
  { name: 'Pro Viz',     value: 0.51,  color: '#A878DC' },
  { name: 'Automotive',  value: 0.57,  color: '#40A544' },
];

const SEG_MAX = SEGMENTS[0].value;

/* ========== 子组件 ========== */

const CLOCK_PATH = 'M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z';

function BeatRow({ label, actual, est, delta, pct }: BeatData) {
  return (
    <div className="flex flex-col gap-[4px]">
      {/* Label + pill */}
      <div className="flex items-center justify-between">
        <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px]">
          {label}
        </p>
        <span
          className="font-['Delight',sans-serif] text-[10px] leading-[16px] tracking-[0.1px]"
          style={{ background: 'rgba(42,155,125,0.1)', color: '#2a9b7d', padding: '1px 6px', borderRadius: 3 }}
        >
          Beat
        </span>
      </div>
      {/* Actual + vs est + delta */}
      <div className="flex items-baseline gap-[8px] flex-wrap">
        <p className="font-['Delight',sans-serif] text-[22px] text-[rgba(0,0,0,0.9)] leading-[28px]">
          {actual}
        </p>
        <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px]">
          vs est {est}
        </p>
        <p
          className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] ml-auto"
          style={{ color: '#2a9b7d' }}
        >
          {delta} ({pct})
        </p>
      </div>
    </div>
  );
}

/* ========== 主组件 ========== */

export function NVDAEarningsDetailWidget() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center min-h-px relative rounded-[4px] w-full">

      {/* Widget Title */}
      <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full">
        <p className="font-['Delight',sans-serif] flex-[1_0_0] leading-[22px] not-italic text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          NVDA Q4 FY25 · Earnings Detail
        </p>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[12px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g clipPath="url(#clip0_nvda_edetail)">
                <path d={CLOCK_PATH} fill="black" fillOpacity="0.5" />
              </g>
              <defs>
                <clipPath id="clip0_nvda_edetail">
                  <rect fill="white" height="12" width="12" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
            Reported Feb 26, 2025
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="relative rounded-[6px] w-full overflow-hidden" style={{ backgroundColor: 'var(--grey-g01)' }}>
        <div className="flex flex-col p-[16px] gap-[12px]">

          {/* Beat rows */}
          {BEATS.map(b => <BeatRow key={b.label} {...b} />)}

          {/* Divider */}
          <div className="h-px" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} />

          {/* KPI strip — 4 items, vertical dividers between */}
          <div className="flex items-stretch">
            {KPIS.map((k, i) => (
              <Fragment key={k.label}>
                <div className="flex-1 flex flex-col gap-[2px] min-w-0">
                  <p className="font-['Delight',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)] leading-[16px] tracking-[0.1px] whitespace-nowrap">
                    {k.label}
                  </p>
                  <p
                    className="font-['Delight',sans-serif] text-[16px] leading-[22px]"
                    style={{ color: k.positive ? '#2a9b7d' : 'rgba(0,0,0,0.9)' }}
                  >
                    {k.value}
                  </p>
                </div>
                {i < KPIS.length - 1 && (
                  <div className="w-px mx-[12px] self-stretch" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} />
                )}
              </Fragment>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} />

          {/* Segment breakdown */}
          <div className="flex flex-col gap-[8px]">
            <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px]">
              Segment Revenue
            </p>
            {SEGMENTS.map(s => (
              <div key={s.name} className="flex items-center gap-[8px]">
                <div
                  className="shrink-0 size-[6px] rounded-full"
                  style={{ background: s.color }}
                />
                <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.7)] leading-[20px] tracking-[0.12px] w-[88px] shrink-0">
                  {s.name}
                </p>
                <div
                  className="flex-1 h-[4px] rounded-full overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(s.value / SEG_MAX) * 100}%`, background: s.color, opacity: 0.65 }}
                  />
                </div>
                <p className="font-['Delight',sans-serif] text-[12px] text-[rgba(0,0,0,0.9)] leading-[20px] tracking-[0.12px] w-[44px] text-right shrink-0">
                  ${s.value}B
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Alva watermark */}
        <div className="absolute bottom-[16px] left-[16px] font-['Delight',sans-serif] text-[16px] font-medium text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>

    </div>
  );
}
