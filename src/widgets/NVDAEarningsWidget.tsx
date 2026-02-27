/**
 * [INPUT]: 无
 * [OUTPUT]: NVDA 历史财报 — 季度营收 Actual vs Estimate + Non-GAAP EPS 趋势
 * [POS]: Widget 层 — Workspace 看板
 */

import ReactECharts from 'echarts-for-react';
import { CHART_COLORS, FONT, CHART_DOT_BG, tooltipConfig } from '@/lib/chart-theme';

/* ========== 数据 ========== */

const QUARTERS  = ['Q3 FY24', 'Q4 FY24', 'Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25'];
const REV_EST   = [16.1, 20.4, 24.6, 28.4, 32.8, 37.9];
const REV_ACT   = [18.12, 22.10, 26.04, 30.04, 35.08, 39.33];
const EPS_ACT   = [0.40, 0.52, 0.61, 0.68, 0.81, 0.89];
const REV_BEAT  = ['+12.5%', '+8.3%', '+5.9%', '+5.8%', '+7.0%', '+3.8%'];

/* ========== 坐标轴共享配置 ========== */

const AX = {
  axisLine:  { show: false },
  axisTick:  { show: false },
  axisLabel: { fontSize: 10, color: 'rgba(0,0,0,0.7)', fontFamily: FONT, margin: 8 },
  splitLine: { show: false },
};

/* ========== 组件 ========== */

export function NVDAEarningsWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      formatter: (params: { seriesType: string; axisValue: string; color: string; seriesName: string; value: number }[]) => {
        const t = params[0].axisValue;
        let s = `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.7);margin-bottom:6px;">${t}</div>`;
        params.forEach(p => {
          const valStr = p.seriesType === 'line' ? `$${p.value}` : `$${p.value}B`;
          s += `<div style="display:flex;align-items:center;gap:6px;line-height:20px;font-family:${FONT};">` +
               `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${p.color};"></span>` +
               `<span style="color:rgba(0,0,0,0.9);font-size:12px;">${p.seriesName}</span>` +
               `<span style="color:rgba(0,0,0,0.9);font-size:12px;margin-left:12px;">${valStr}</span>` +
               `</div>`;
        });
        return s;
      },
    },
    legend: { show: false },
    grid: { left: 4, right: 4, top: 16, bottom: 4, containLabel: true },
    xAxis: {
      type: 'category',
      data: QUARTERS,
      boundaryGap: true,
      ...AX,
    },
    yAxis: [
      {
        type: 'value',
        name: 'Revenue ($B)',
        nameTextStyle: {
          color: 'rgba(0,0,0,0.5)', fontFamily: FONT, fontSize: 10,
          align: 'left', padding: [0, 0, 8, -36],
        },
        nameLocation: 'end',
        min: 0,
        max: 50,
        interval: 10,
        ...AX,
        axisLabel: { ...AX.axisLabel, formatter: (v: number) => `$${v}B` },
      },
      {
        type: 'value',
        name: 'Non-GAAP EPS',
        nameTextStyle: {
          color: 'rgba(0,0,0,0.5)', fontFamily: FONT, fontSize: 10,
          align: 'right', padding: [0, -36, 8, 0],
        },
        nameLocation: 'end',
        min: 0,
        max: 1.2,
        interval: 0.4,
        ...AX,
        axisLabel: { ...AX.axisLabel, formatter: (v: number) => `$${v.toFixed(1)}` },
      },
    ],
    series: [
      {
        name: 'Est Revenue',
        type: 'bar',
        data: REV_EST,
        yAxisIndex: 0,
        barMaxWidth: 14,
        itemStyle: { color: 'rgba(0,0,0,0.08)', borderRadius: [2, 2, 0, 0] },
      },
      {
        name: 'Act Revenue',
        type: 'bar',
        data: REV_ACT,
        yAxisIndex: 0,
        barMaxWidth: 14,
        itemStyle: { color: CHART_COLORS.deepBlue, borderRadius: [2, 2, 0, 0] },
        label: {
          show: true,
          position: 'top',
          formatter: (p: { dataIndex: number }) => REV_BEAT[p.dataIndex],
          fontSize: 9,
          color: '#2a9b7d',
          fontFamily: FONT,
          distance: 3,
        },
      },
      {
        name: 'Non-GAAP EPS',
        type: 'line',
        data: EPS_ACT,
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 8,
        showSymbol: true,
        lineStyle: { width: 1, color: CHART_COLORS.orange },
        itemStyle: { color: CHART_COLORS.orange, borderColor: '#ffffff', borderWidth: 1 },
      },
    ],
  };

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center min-h-px relative rounded-[4px] w-full h-full">

      {/* Widget Title */}
      <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full">
        <p className="font-['Delight',sans-serif] flex-[1_0_0] leading-[22px] not-italic text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          NVDA Quarterly Earnings
        </p>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[12px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g clipPath="url(#clip0_nvda_earn)">
                <path d="M6 0.6C8.98234 0.6 11.4 3.01766 11.4 6C11.4 8.98234 8.98234 11.4 6 11.4C3.01766 11.4 0.6 8.98234 0.6 6C0.6 3.01766 3.01766 0.6 6 0.6ZM6 1.2C3.34903 1.2 1.2 3.34903 1.2 6C1.2 8.65097 3.34903 10.8 6 10.8C8.65097 10.8 10.8 8.65097 10.8 6C10.8 3.34903 8.65097 1.2 6 1.2ZM6 3.50859C6.16569 3.50859 6.3 3.64291 6.3 3.80859V5.87578L7.71211 7.28789C7.82927 7.40505 7.82927 7.59495 7.71211 7.71211C7.59495 7.82927 7.40505 7.82927 7.28789 7.71211L5.78789 6.21211C5.73163 6.15585 5.7 6.07957 5.7 6V3.80859C5.7 3.64291 5.83431 3.50859 6 3.50859Z" fill="black" fillOpacity="0.5" />
              </g>
              <defs>
                <clipPath id="clip0_nvda_earn">
                  <rect fill="white" height="12" width="12" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-nowrap">
            As of 02/20/2026
          </p>
        </div>
      </div>

      {/* Chart Body */}
      <div
        className="flex-[1_0_0] min-h-[200px] min-w-px relative rounded-[6px] w-full"
        style={{ ...CHART_DOT_BG, padding: '16px' }}
      >
        {/* Legend */}
        <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end overflow-clip relative shrink-0 w-full z-[5] mb-[4px]">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="rounded-[100px] shrink-0 size-[8px]" style={{ background: 'rgba(0,0,0,0.12)' }} />
            <p className="font-['Delight',sans-serif] leading-[16px] text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">Est Revenue</p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="rounded-[100px] shrink-0 size-[8px]" style={{ background: CHART_COLORS.deepBlue }} />
            <p className="font-['Delight',sans-serif] leading-[16px] text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">Act Revenue</p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="rounded-[100px] shrink-0 size-[8px]" style={{ background: CHART_COLORS.orange }} />
            <p className="font-['Delight',sans-serif] leading-[16px] text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">Non-GAAP EPS</p>
          </div>
        </div>

        {/* ECharts */}
        <div style={{ width: '100%', height: 'calc(100% - 20px)', position: 'relative' }}>
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>

        {/* Watermark */}
        <div className="absolute bottom-[16px] left-[16px] font-['Delight',sans-serif] text-[16px] text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>

    </div>
  );
}
