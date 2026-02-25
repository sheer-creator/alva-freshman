import ReactECharts from 'echarts-for-react';
import { CHART_COLORS, tooltipConfig, ZERO_MARK_LINE } from '@/lib/chart-theme';

// Mock data for trending AI Storage keywords this month
const keywordData = [
  { keyword: 'NAND Flash', value: 95 },
  { keyword: 'SSD', value: 88 },
  { keyword: 'HBM', value: 82 },
  { keyword: 'Storage Array', value: 75 },
  { keyword: 'NVMe', value: 68 },
  { keyword: 'Data Center', value: 62 },
  { keyword: 'Enterprise SSD', value: 55 },
  { keyword: 'PCIe 5.0', value: 48 }
];

export function AIStorageKeyWordTrendsWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig({ trigger: 'axis' as const, axisPointer: { type: 'shadow' as const } }),
      formatter: function(params: any) {
        if (!Array.isArray(params)) params = [params];
        const p = params[0];
        return `<div style="font-size:12px;color:rgba(0,0,0,0.9)">${p.name}: ${p.value}</div>`;
      }
    },
    grid: {
      left: 100,
      right: 0,
      top: 30,
      bottom: 20,
      containLabel: false
    },
    xAxis: {
      type: 'value' as const,
      name: 'Trend Score',
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        align: 'right' as const,
        padding: [0, 0, 8, 0]
      },
      nameLocation: 'end' as const,
      min: 0,
      max: 100,
      interval: 25,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        padding: [8, 0, 0, 0]
      }
    },
    yAxis: {
      type: 'category' as const,
      data: keywordData.map(d => d.keyword),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        padding: [0, 8, 0, 0]
      }
    },
    series: [
      {
        type: 'bar' as const,
        data: keywordData.map(d => d.value),
        barMaxWidth: 16,
        barCategoryGap: '50%',
        itemStyle: {
          color: CHART_COLORS.primary,
          borderRadius: [0, 2, 2, 0]
        },
        label: {
          show: true,
          position: 'right' as const,
          color: 'rgba(0,0,0,0.7)',
          fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 9,
          fontWeight: 400,
          formatter: '{c}'
        },
        emphasis: {
          itemStyle: {
            color: '#3D8997'
          }
        },
        markLine: { ...ZERO_MARK_LINE, data: [{ xAxis: 0 }] }
      }
    ]
  };

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-full items-center min-h-px min-w-px relative rounded-[4px]">
      {/* Widget Title */}
      <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">AI Storage Key Word Trends</p>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[12px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g clipPath="url(#clip0_keyword_trends)">
                <path d="M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z" fill="var(--fill-0, black)" fillOpacity="0.5" />
              </g>
              <defs>
                <clipPath id="clip0_keyword_trends">
                  <rect fill="white" height="12" width="12" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
            <p className="leading-[20px]">02/13/2026 10:00</p>
          </div>
        </div>
      </div>

      {/* Chart Body */}
      <div
        className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.18) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
          padding: '16px'
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
