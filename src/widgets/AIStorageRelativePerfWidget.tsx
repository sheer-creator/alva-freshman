import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  CHART_COLORS, FONT, CHART_DOT_BG, tooltipConfig, tooltipFormatter,
  timeXAxisConfig, valueYAxisConfig, GRID_DEFAULT,
  lineSeriesConfig, monthYearFormatter, dayOfWeekFormatter,
} from '@/lib/chart-theme';
import { AlvaWatermark, WidgetTitle } from '@/app/components/alva-ui-kit';

type TimeWindow = '1M' | '3M' | '6M' | '1Y';

// Generate mock daily close data for AI Storage stocks (rebased to 100)
// Data ending at 2026-01-26
function generateStockData(baseGrowth: number, volatility: number, days: number): [string, number][] {
  const data: [string, number][] = [];
  const endDate = new Date('2026-01-26');

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const progress = (days - i) / days;
    const trend = 100 + (baseGrowth * progress);
    const noise = (Math.random() - 0.5) * volatility * 2;
    const value = Math.max(50, trend + noise);

    data.push([date.toISOString().split('T')[0], Math.round(value * 100) / 100]);
  }

  return data;
}

const stockDataCache: Record<TimeWindow, Record<string, [string, number][]>> = {
  '1M': {
    'MU': generateStockData(12, 4, 22),
    'SNDK': generateStockData(8, 3, 22),
    'WDC': generateStockData(15, 5, 22),
    'STX': generateStockData(10, 3.5, 22)
  },
  '3M': {
    'MU': generateStockData(18, 6, 65),
    'SNDK': generateStockData(12, 4, 65),
    'WDC': generateStockData(22, 7, 65),
    'STX': generateStockData(15, 5, 65)
  },
  '6M': {
    'MU': generateStockData(25, 8, 130),
    'SNDK': generateStockData(18, 6, 130),
    'WDC': generateStockData(30, 10, 130),
    'STX': generateStockData(22, 7, 130)
  },
  '1Y': {
    'MU': generateStockData(35, 10, 260),
    'SNDK': generateStockData(25, 8, 260),
    'WDC': generateStockData(40, 12, 260),
    'STX': generateStockData(30, 9, 260)
  }
};

export function AIStorageRelativePerfWidget() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('1Y');

  const muData = stockDataCache[timeWindow]['MU'];
  const sndkData = stockDataCache[timeWindow]['SNDK'];
  const wdcData = stockDataCache[timeWindow]['WDC'];
  const stxData = stockDataCache[timeWindow]['STX'];

  const xAxisFormatter = timeWindow === '1M' ? dayOfWeekFormatter : monthYearFormatter;

  const option = {
    tooltip: {
      ...tooltipConfig(),
      formatter: (params: { color: string; seriesName: string; data: [string, number] }[]) =>
        tooltipFormatter(params, '', v => v.toFixed(1)),
    },
    legend: { show: false },
    grid: GRID_DEFAULT,
    xAxis: timeXAxisConfig({
      axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10, formatter: xAxisFormatter },
    }),
    yAxis: valueYAxisConfig('Relative Perf', { min: 80, max: 160, interval: 20 }),
    series: [
      { ...lineSeriesConfig('MU', CHART_COLORS.primary), data: muData },
      { ...lineSeriesConfig('SNDK', CHART_COLORS.orange), data: sndkData },
      { ...lineSeriesConfig('WDC', CHART_COLORS.green), data: wdcData },
      { ...lineSeriesConfig('STX', CHART_COLORS.blue), data: stxData },
    ],
  };

  const timeWindowButtons = (
    <div className="flex gap-[4px]">
      {(['1M', '3M', '6M', '1Y'] as TimeWindow[]).map((w) => (
        <button
          key={w}
          onClick={() => setTimeWindow(w)}
          className={`px-[8px] py-[2px] rounded-[4px] text-[10px] font-['Delight',sans-serif] transition-colors ${
            timeWindow === w
              ? 'bg-[#49a3a6] text-white'
              : 'bg-transparent text-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.05)]'
          }`}
        >
          {w}
        </button>
      ))}
    </div>
  );

  const SERIES = [
    { name: 'MU',   color: CHART_COLORS.primary },
    { name: 'SNDK', color: CHART_COLORS.orange },
    { name: 'WDC',  color: CHART_COLORS.green },
    { name: 'STX',  color: CHART_COLORS.blue },
  ];

  return (
    <div className="flex flex-col gap-[16px] h-full min-w-px relative rounded-[4px]">
      <WidgetTitle
        title="AI Storage Relative Perf"
        timestamp="01/26/2026 03:20"
        showArrow={false}
        rightExtra={timeWindowButtons}
      />

      {/* Chart Body */}
      <div
        className="flex-1 min-h-px min-w-px relative rounded-[6px] w-full"
        style={{ ...CHART_DOT_BG, padding: '16px' }}
      >
        {/* Legend */}
        <div className="flex gap-[8px] h-[16px] items-center justify-end w-full z-[5] mb-[4px]">
          {SERIES.map(({ name, color }) => (
            <div key={name} className="flex gap-[4px] items-center">
              <div className="rounded-[100px] shrink-0 size-[8px]" style={{ backgroundColor: color }} />
              <p className="font-['Delight',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)] leading-[16px] tracking-[0.1px]">{name}</p>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', height: 'calc(100% - 20px)', position: 'relative' }}>
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
        <AlvaWatermark />
      </div>
    </div>
  );
}
