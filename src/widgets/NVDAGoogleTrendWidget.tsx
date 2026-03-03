import ReactECharts from 'echarts-for-react';
import {
  CHART_COLORS, FONT, CHART_DOT_BG, tooltipConfig, tooltipFormatter,
  timeXAxisConfig, valueYAxisConfig, GRID_DEFAULT,
  lineSeriesConfig, monthYearFormatter, ZERO_MARK_LINE,
} from '@/lib/chart-theme';
import { WidgetTitle } from '@/app/components/alva-ui-kit';

export function NVDAGoogleTrendWidget() {
  const mockData: [string, number][] = [
    ['2025-02-01', 65], ['2025-03-01', 68], ['2025-04-01', 72],
    ['2025-05-01', 75], ['2025-06-01', 78], ['2025-07-01', 82],
    ['2025-08-01', 85], ['2025-09-01', 88], ['2025-10-01', 90],
    ['2025-11-01', 92], ['2025-12-01', 95], ['2026-01-01', 93],
    ['2026-02-01', 98],
  ];

  const option = {
    tooltip: { ...tooltipConfig(), formatter: tooltipFormatter },
    legend: { show: false },
    grid: GRID_DEFAULT,
    xAxis: timeXAxisConfig({
      axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10, formatter: monthYearFormatter },
      min: '2025-02-01',
      max: '2026-02-01',
    }),
    yAxis: valueYAxisConfig('Trend Index', { min: 0, max: 100, interval: 25 }),
    series: [{
      ...lineSeriesConfig('NVDA', CHART_COLORS.primary),
      data: mockData,
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
          { offset: 0, color: 'rgba(73, 163, 166, 0.3)' },
          { offset: 1, color: 'rgba(73, 163, 166, 0)' },
        ]},
      },
      markLine: ZERO_MARK_LINE,
    }],
  };

  return (
    <div className="flex flex-col gap-[16px] h-[370px] min-w-px relative rounded-[4px]">
      <WidgetTitle title="NVDA Google Trend" timestamp="02/13/2026 10:00" showArrow={false} />

      <div
        className="flex-1 min-h-px min-w-px relative rounded-[6px] w-full"
        style={{ ...CHART_DOT_BG, padding: '16px' }}
      >
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
        <div className="absolute bottom-[16px] left-[16px] font-['Delight',sans-serif] text-[16px] font-medium text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
