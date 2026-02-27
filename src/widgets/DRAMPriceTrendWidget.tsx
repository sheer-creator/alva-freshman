import ReactECharts from 'echarts-for-react';
import { ddr4Data, ddr5Data } from '@/data/dramPriceData';
import {
  CHART_COLORS, FONT, CHART_DOT_BG, tooltipConfig, tooltipFormatter,
  timeXAxisConfig, valueYAxisConfig, GRID_DEFAULT,
  lineSeriesConfig, monthYearFormatter, ZERO_MARK_LINE,
} from '@/lib/chart-theme';

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
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[370px] items-center min-h-px min-w-px relative rounded-[4px]">
      {/* Widget Title */}
      <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">DRAM Price Trend</p>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[12px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g clipPath="url(#clip0_dram)">
                <path d="M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z" fill="black" fillOpacity="0.5" />
              </g>
              <defs>
                <clipPath id="clip0_dram">
                  <rect fill="white" height="12" width="12" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
            <p className="leading-[20px]">02/12/2026 12:30</p>
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
              <p className="leading-[16px]">DDR5 16Gb</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="bg-[#FF9800] rounded-[100px] shrink-0 size-[8px]" />
            <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
              <p className="leading-[16px]">DDR4 16Gb</p>
            </div>
          </div>
        </div>
        {/* Chart Container */}
        <div style={{ width: '100%', height: 'calc(100% - 20px)', position: 'relative' }}>
          <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }} />
        </div>
        {/* Watermark */}
        <div className="absolute bottom-[16px] left-[16px] font-['Delight:Regular',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
