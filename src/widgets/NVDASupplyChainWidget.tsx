/**
 * [INPUT]: chart-theme 共享配置
 * [OUTPUT]: AI/半导体产业链 YTD 表现水平柱状图
 * [POS]: Widget 层 — NVDA 全景看板产业链视角
 */

import ReactECharts from 'echarts-for-react';
import { tooltipConfig, CHART_COLORS } from '@/lib/chart-theme';

/* ========== 真实数据（2026 YTD 涨跌幅 %） ========== */

const stocks = [
  { name: 'SMCI',  ytd: 22.4 },
  { name: 'ARM',   ytd: 15.8 },
  { name: 'TSM',   ytd: 12.5 },
  { name: 'NVDA',  ytd: 8.2 },
  { name: 'AVGO',  ytd: 6.3 },
  { name: 'MRVL',  ytd: 4.7 },
  { name: 'DELL',  ytd: 3.8 },
  { name: 'AMD',   ytd: -3.2 },
  { name: 'MU',    ytd: -5.1 },
  { name: 'INTC',  ytd: -8.6 },
];

const FONT = "'Delight', -apple-system, BlinkMacSystemFont, sans-serif";

export function NVDASupplyChainWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig({ trigger: 'item' as const }),
      formatter(p: any) {
        const color = p.data.value >= 0 ? 'var(--main-m3)' : 'var(--main-m4)';
        const sign = p.data.value >= 0 ? '+' : '';
        return `<div style="font-family:${FONT};font-size:12px">
          <span style="color:rgba(0,0,0,0.7)">${p.name}</span><br/>
          <span style="color:${color};font-weight:500">${sign}${p.data.value}%</span>
        </div>`;
      },
    },
    grid: { left: 48, right: 48, top: 8, bottom: 8, containLabel: false },
    xAxis: {
      type: 'value' as const,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'category' as const,
      data: stocks.map((s) => s.name),
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(0,0,0,0.7)',
        fontFamily: FONT,
        fontSize: 11,
        fontWeight: (idx: number) => stocks[idx].name === 'NVDA' ? 500 : 400,
      },
    },
    series: [
      {
        type: 'bar' as const,
        barMaxWidth: 16,
        data: stocks.map((s) => ({
          value: s.ytd,
          itemStyle: {
            color: s.name === 'NVDA'
              ? CHART_COLORS.primary
              : s.ytd >= 0
                ? 'rgba(42,155,125,0.6)'
                : 'rgba(224,83,87,0.6)',
            borderRadius: s.ytd >= 0 ? [0, 3, 3, 0] : [3, 0, 0, 3],
          },
        })),
        label: {
          show: true,
          position: 'right' as const,
          fontFamily: FONT,
          fontSize: 10,
          color: 'rgba(0,0,0,0.7)',
          formatter: (p: any) => {
            const sign = p.data.value >= 0 ? '+' : '';
            return `${sign}${p.data.value}%`;
          },
        },
        markLine: {
          silent: true,
          symbol: 'none',
          data: [{ xAxis: 0 }],
          lineStyle: { color: 'rgba(0,0,0,0.3)', type: [3, 2] as unknown as string, width: 1 },
          label: { show: false },
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-[16px] h-[370px] w-full relative rounded-[4px]">
      {/* Widget Title */}
      <div className="flex gap-[12px] h-[22px] items-center w-full">
        <p className="font-['Delight:Regular',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          AI Supply Chain YTD Performance
        </p>
        <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px] ml-auto">
          02/20/2026
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
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
        <div className="absolute bottom-[16px] left-[16px] font-['Delight:Regular',sans-serif] text-[16px] font-medium text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
