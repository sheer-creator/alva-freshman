/**
 * [INPUT]: chart-theme 共享配置
 * [OUTPUT]: NVDA 季度营收分业务线堆叠柱状图
 * [POS]: Widget 层 — NVDA 全景看板基本面视角
 */

import ReactECharts from 'echarts-for-react';
import { tooltipConfig, GRID_DEFAULT } from '@/lib/chart-theme';

/* ========== 真实数据（NVDA 季度营收，单位: $B） ========== */

const quarters = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26', 'Q2 FY26', 'Q3 FY26'];

const segments = {
  'Data Center': [22.6, 26.3, 30.8, 35.6, 38.2, 41.5, 44.8],
  'Gaming':      [2.6,  2.9,  3.3,  3.5,  3.2,  3.4,  3.6],
  'Pro Viz':     [0.4,  0.5,  0.5,  0.5,  0.6,  0.6,  0.7],
  'Auto & Robot':[0.3,  0.3,  0.4,  0.5,  0.6,  0.7,  0.8],
};

const segmentColors: Record<string, string> = {
  'Data Center': '#49A3A6',
  'Gaming':      '#FF9800',
  'Pro Viz':     '#5F75C9',
  'Auto & Robot':'#40A544',
};

const FONT = "'Delight', -apple-system, BlinkMacSystemFont, sans-serif";

export function NVDARevenueSegmentWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      formatter(params: any[]) {
        if (!params.length) return '';
        const qtr = params[0].axisValue;
        let total = 0;
        let html = `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.7);margin-bottom:6px">${qtr}</div>`;
        params.forEach((p: any) => {
          total += p.value;
          const dot = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:8px;height:8px;background:${p.color};vertical-align:middle"></span>`;
          html += `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.9);line-height:20px">${dot}${p.seriesName}: $${p.value}B</div>`;
        });
        html += `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.9);line-height:20px;margin-top:4px;border-top:1px solid rgba(0,0,0,0.08);padding-top:4px;font-weight:500">Total: $${total.toFixed(1)}B</div>`;
        return html;
      },
    },
    legend: { show: false },
    grid: { ...GRID_DEFAULT, left: 42, bottom: 24 },
    xAxis: {
      type: 'category' as const,
      data: quarters,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10 },
    },
    yAxis: {
      type: 'value' as const,
      name: 'Revenue ($B)',
      nameTextStyle: { color: 'rgba(0,0,0,0.5)', fontFamily: FONT, fontSize: 10, align: 'left' as const, padding: [0, 0, 8, -24] },
      nameLocation: 'end' as const,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10,
        formatter: (v: number) => `$${v}B`,
      },
    },
    series: Object.entries(segments).map(([name, data]) => ({
      name,
      type: 'bar' as const,
      stack: 'revenue',
      barMaxWidth: 24,
      data,
      itemStyle: {
        color: segmentColors[name],
        borderRadius: name === 'Auto & Robot' ? [2, 2, 0, 0] : 0,
      },
      emphasis: { itemStyle: { opacity: 0.85 } },
    })),
  };

  return (
    <div className="flex flex-col gap-[16px] h-[370px] w-full relative rounded-[4px]">
      {/* Widget Title */}
      <div className="flex gap-[12px] h-[22px] items-center w-full">
        <p className="font-['Delight:Regular',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          Revenue by Segment
        </p>
        <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px] ml-auto">
          Quarterly
        </p>
      </div>

      {/* Chart Body - dotted background */}
      <div
        className="flex-1 min-h-0 relative rounded-[6px] w-full"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.18) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
          padding: '16px',
        }}
      >
        {/* Legend */}
        <div className="flex gap-[8px] h-[16px] items-center justify-end w-full mb-[4px]">
          {Object.entries(segmentColors).map(([name, color]) => (
            <div key={name} className="flex gap-[4px] items-center">
              <div className="rounded-full shrink-0 size-[8px]" style={{ backgroundColor: color }} />
              <p className="font-['Delight:Regular',sans-serif] text-[10px] text-[rgba(0,0,0,0.5)] leading-[16px] tracking-[0.1px] whitespace-nowrap">
                {name}
              </p>
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
        <div className="absolute bottom-[16px] left-[16px] font-['Delight:Regular',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
