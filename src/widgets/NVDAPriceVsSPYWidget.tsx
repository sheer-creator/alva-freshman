import ReactECharts from 'echarts-for-react';
import {
  CHART_COLORS, FONT, CHART_DOT_BG, tooltipConfig, tooltipFormatter,
  timeXAxisConfig, valueYAxisConfig, GRID_DEFAULT,
  lineSeriesConfig, dayOfWeekFormatter, ZERO_MARK_LINE,
} from '@/lib/chart-theme';
import { WidgetTitle } from '@/app/components/alva-ui-kit';

export function NVDAPriceVsSPYWidget() {
  const nvdaData: [string, number][] = [
    ['2026-02-07', 85], ['2026-02-08', 88], ['2026-02-09', 92],
    ['2026-02-10', 90], ['2026-02-11', 95], ['2026-02-12', 93], ['2026-02-13', 98],
  ];
  const spyData: [string, number][] = [
    ['2026-02-07', 70], ['2026-02-08', 72], ['2026-02-09', 75],
    ['2026-02-10', 73], ['2026-02-11', 78], ['2026-02-12', 76], ['2026-02-13', 80],
  ];

  const option = {
    tooltip: { ...tooltipConfig(), formatter: tooltipFormatter },
    legend: { show: false },
    grid: GRID_DEFAULT,
    xAxis: timeXAxisConfig({
      axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10, formatter: dayOfWeekFormatter },
      min: '2026-02-07',
      max: '2026-02-13',
    }),
    yAxis: valueYAxisConfig('Price Index', { min: 0, max: 100, interval: 25 }),
    series: [
      { ...lineSeriesConfig('NVDA', CHART_COLORS.primary), data: nvdaData, markLine: ZERO_MARK_LINE },
      { ...lineSeriesConfig('SPY', CHART_COLORS.deepBlue), data: spyData },
    ],
  };

  return (
    <div className="flex flex-col gap-[16px] h-[370px] min-w-px relative rounded-[4px]">
      <WidgetTitle title="NVDA Price VS SPY" timestamp="02/13/2026 10:00" showArrow={false} />

      <div
        className="flex-1 min-h-px min-w-px relative rounded-[6px] w-full"
        style={{ ...CHART_DOT_BG, padding: '16px' }}
      >
        {/* Legend */}
        <div className="flex gap-[8px] h-[16px] items-center justify-end w-full z-[5] mb-[4px]">
          {([['NVDA', CHART_COLORS.primary], ['SPY', CHART_COLORS.deepBlue]] as [string, string][]).map(([name, color]) => (
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
        <div className="absolute bottom-[16px] left-[16px] font-['Delight',sans-serif] text-[16px] font-medium text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
