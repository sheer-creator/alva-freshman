import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  CHART_COLORS, FONT, CHART_DOT_BG, tooltipConfig, tooltipFormatter,
  timeXAxisConfig, valueYAxisConfig, GRID_DEFAULT,
  lineSeriesConfig, monthYearFormatter, dayOfWeekFormatter,
} from '@/lib/chart-theme';

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
      formatter: (params: { color: string; seriesName: string; data: [string, number] }[]) => {
        if (!params.length) return '';
        const d = new Date(params[0].data[0]);
        const title = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        let html = `<div style="font-size:12px;color:rgba(0,0,0,0.7);margin-bottom:6px">${title}</div>`;
        params.forEach((p) => {
          const dot = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:8px;height:8px;background:${p.color};vertical-align:middle"></span>`;
          html += `<div style="font-size:12px;color:rgba(0,0,0,0.9);line-height:20px">${dot}${p.seriesName}: ${p.data[1].toFixed(1)}</div>`;
        });
        return html;
      },
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

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-full items-center min-h-px min-w-px relative rounded-[4px]">
      {/* Widget Title */}
      <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">AI Storage Relative Perf</p>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          {/* Time Window Selector */}
          <div className="flex gap-[4px]">
            {(['1M', '3M', '6M', '1Y'] as TimeWindow[]).map((window) => (
              <button
                key={window}
                onClick={() => setTimeWindow(window)}
                className={`px-[8px] py-[2px] rounded-[4px] text-[10px] font-['Delight:Regular',sans-serif] transition-colors ${
                  timeWindow === window
                    ? 'bg-[#49a3a6] text-white'
                    : 'bg-transparent text-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.05)]'
                }`}
              >
                {window}
              </button>
            ))}
          </div>
          <div className="relative shrink-0 size-[12px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g clipPath="url(#clip0_ai_storage)">
                <path d="M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z" fill="var(--fill-0, black)" fillOpacity="0.5" />
              </g>
              <defs>
                <clipPath id="clip0_ai_storage">
                  <rect fill="white" height="12" width="12" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
            <p className="leading-[20px]">01/26/2026 03:20</p>
          </div>
        </div>
      </div>

      {/* Chart Body */}
      <div
        className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full"
        style={{ ...CHART_DOT_BG, padding: '16px' }}
      >
        {/* Legend */}
        <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end overflow-clip relative shrink-0 w-full z-[5] mb-[4px]">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[#49A3A6] rounded-[100px] shrink-0 size-[8px]" />
            <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
              <p className="leading-[16px]">MU</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[#FF9800] rounded-[100px] shrink-0 size-[8px]" />
            <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
              <p className="leading-[16px]">SNDK</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[#40A544] rounded-[100px] shrink-0 size-[8px]" />
            <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
              <p className="leading-[16px]">WDC</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[#5F75C9] rounded-[100px] shrink-0 size-[8px]" />
            <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
              <p className="leading-[16px]">STX</p>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: 'calc(100% - 20px)', position: 'relative' }}>
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
        {/* Watermark */}
        <div className="absolute bottom-[16px] left-[16px] font-['Delight:Regular',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
