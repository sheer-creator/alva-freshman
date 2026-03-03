import ReactECharts from 'echarts-for-react';
import { ddr4Data, ddr5Data } from '@/data/dramPriceData';
import {
  CHART_COLORS, FONT, CHART_DOT_BG, tooltipConfig, tooltipFormatter,
  timeXAxisConfig, valueYAxisConfig, GRID_DEFAULT,
  lineSeriesConfig, monthYearFormatter, ZERO_MARK_LINE,
} from '@/lib/chart-theme';
import { WidgetTitle } from '@/app/components/alva-ui-kit';

export function DRAMPriceTrendWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      formatter: (params: { color: string; seriesName: string; data: [string, number] }[]) =>
        tooltipFormatter(params, '$'),
    },
    legend: { show: false },
    grid: { ...GRID_DEFAULT, top: 36 },
    xAxis: timeXAxisConfig({
      axisLabel: {
        color: 'rgba(0,0,0,0.7)',
        fontFamily: FONT,
        fontSize: 10,
        formatter: monthYearFormatter,
      },
    }),
    yAxis: valueYAxisConfig('Price (USD)', {
      min: 0,
      max: 80,
      interval: 20,
      axisLabel: {
        color: 'rgba(0,0,0,0.7)',
        fontFamily: FONT,
        fontSize: 10,
        padding: [0, 8, 0, 0],
        formatter: '${value}',
      },
    }),
    series: [
      { ...lineSeriesConfig('DDR5 16Gb', CHART_COLORS.primary), data: ddr5Data },
      {
        ...lineSeriesConfig('DDR4 16Gb', CHART_COLORS.orange),
        data: ddr4Data,
        markLine: ZERO_MARK_LINE,
      },
    ],
  };

  return (
    <div className="flex flex-[1_0_0] flex-col gap-[16px] h-[370px] min-w-px relative rounded-[4px]">
      <WidgetTitle title="DRAM Price Trend" timestamp="02/12/2026 12:30" showArrow={false} />

      <div
        className="flex-1 min-h-px min-w-px relative rounded-[6px] w-full"
        style={{ ...CHART_DOT_BG, padding: '16px' }}
      >
        {/* Legend */}
        <div className="flex gap-[8px] h-[16px] items-center justify-end w-full z-[5] mb-[4px]">
          {([['DDR5 16Gb', CHART_COLORS.primary], ['DDR4 16Gb', CHART_COLORS.orange]] as [string, string][]).map(([name, color]) => (
            <div key={name} className="flex gap-[4px] items-center">
              <div className="rounded-[100px] shrink-0 size-[8px]" style={{ backgroundColor: color }} />
              <p className="font-['Delight',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)] leading-[16px] tracking-[0.1px]">{name}</p>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', height: 'calc(100% - 20px)', position: 'relative' }}>
          <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }} />
        </div>
        <div className="absolute bottom-[16px] left-[16px] font-['Delight',sans-serif] text-[16px] font-medium text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
