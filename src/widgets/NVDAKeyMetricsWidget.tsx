/**
 * [INPUT]: 无
 * [OUTPUT]: NVDA 核心指标 KPI 卡片网格
 * [POS]: Widget 层 — NVDA 全景看板 KPI 概览
 */

/* ========== 数据 ========== */

interface Metric {
  label: string;
  value: string;
  change?: string;
  trend?: 'positive' | 'negative' | 'neutral';
}

const metrics: Metric[] = [
  { label: 'Market Cap',     value: '$3.08T',   change: '+2.3%',  trend: 'positive' },
  { label: 'P/E (FWD)',      value: '42.6x',    change: '',       trend: 'neutral' },
  { label: 'Revenue (TTM)',  value: '$130.2B',  change: '+78%',   trend: 'positive' },
  { label: 'Gross Margin',   value: '75.2%',    change: '+1.8pp', trend: 'positive' },
  { label: 'EPS (TTM)',      value: '$29.68',   change: '+82%',   trend: 'positive' },
  { label: 'FCF Yield',      value: '1.8%',     change: '-0.3pp', trend: 'negative' },
];

const trendColor = {
  positive: 'var(--main-m3)',
  negative: 'var(--main-m4)',
  neutral: 'var(--text-n5)',
} as const;

/* ========== 组件 ========== */

function MetricCard({ label, value, change, trend = 'neutral' }: Metric) {
  return (
    <div
      className="flex flex-col gap-[8px] p-[16px] rounded-[6px] min-w-0"
      style={{ backgroundColor: 'var(--grey-g01)' }}
    >
      <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[16px] tracking-[0.12px]">
        {label}
      </p>
      <div className="flex items-baseline gap-[6px]">
        <p className="font-['Delight:Regular',sans-serif] text-[20px] font-medium text-[rgba(0,0,0,0.9)] leading-[24px]">
          {value}
        </p>
        {change && (
          <span
            className="font-['Delight:Regular',sans-serif] text-[12px] leading-[16px]"
            style={{ color: trendColor[trend!] }}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

export function NVDAKeyMetricsWidget() {
  return (
    <div className="flex flex-col gap-[16px] w-full relative">
      {/* Widget Title */}
      <div className="flex gap-[12px] h-[22px] items-center w-full">
        <p className="font-['Delight:Regular',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          Key Metrics
        </p>
        <div className="flex gap-[4px] items-center ml-auto">
          <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px]">
            As of 02/20/2026
          </p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-3 gap-[12px] w-full">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>
    </div>
  );
}
