import ReactECharts from 'echarts-for-react';
import { CHART_COLORS, FONT, CHART_DOT_BG, tooltipConfig, ZERO_MARK_LINE } from '@/lib/chart-theme';
import { WidgetTitle } from '@/app/components/alva-ui-kit';

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
        fontFamily: FONT,
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
        fontFamily: FONT,
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
        fontFamily: FONT,
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
          fontFamily: FONT,
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
    <div className="flex flex-col gap-[16px] h-full min-w-px relative rounded-[4px]">
      <WidgetTitle title="AI Storage Key Word Trends" timestamp="02/13/2026 10:00" showArrow={false} />

      {/* Chart Body */}
      <div
        className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full"
        style={{ ...CHART_DOT_BG, padding: '16px' }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
        {/* Watermark */}
        <div className="absolute bottom-[16px] left-[16px] font-['Delight',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
