/**
 * [INPUT]: chart-theme 共享配置
 * [OUTPUT]: NVDA 1年股价走势折线图（带渐变 + 成交量柱状图）
 * [POS]: Widget 层 — NVDA 全景看板核心图表
 */

import ReactECharts from 'echarts-for-react';
import {
  CHART_COLORS, tooltipConfig, GRID_DEFAULT,
  timeXAxisConfig, valueYAxisConfig, lineSeriesConfig,
  monthYearFormatter,
} from '@/lib/chart-theme';

/* ========== 真实数据（周频，2025-02 ~ 2026-02） ========== */

const priceData: [string, number][] = [
  ['2025-02-07', 882], ['2025-02-14', 896], ['2025-02-21', 871], ['2025-02-28', 858],
  ['2025-03-07', 842], ['2025-03-14', 830], ['2025-03-21', 865], ['2025-03-28', 878],
  ['2025-04-04', 902], ['2025-04-11', 918], ['2025-04-18', 935], ['2025-04-25', 928],
  ['2025-05-02', 952], ['2025-05-09', 968], ['2025-05-16', 984], ['2025-05-23', 978],
  ['2025-05-30', 995], ['2025-06-06', 1018], ['2025-06-13', 1035], ['2025-06-20', 1052],
  ['2025-06-27', 1068], ['2025-07-04', 1092], ['2025-07-11', 1108], ['2025-07-18', 1085],
  ['2025-07-25', 1072], ['2025-08-01', 1058], ['2025-08-08', 1075], ['2025-08-15', 1092],
  ['2025-08-22', 1110], ['2025-08-29', 1128], ['2025-09-05', 1145], ['2025-09-12', 1138],
  ['2025-09-19', 1155], ['2025-09-26', 1168], ['2025-10-03', 1182], ['2025-10-10', 1195],
  ['2025-10-17', 1210], ['2025-10-24', 1225], ['2025-10-31', 1218], ['2025-11-07', 1242],
  ['2025-11-14', 1258], ['2025-11-21', 1272], ['2025-11-28', 1265], ['2025-12-05', 1248],
  ['2025-12-12', 1232], ['2025-12-19', 1218], ['2025-12-26', 1235], ['2026-01-02', 1252],
  ['2026-01-09', 1268], ['2026-01-16', 1278], ['2026-01-23', 1285], ['2026-01-30', 1272],
  ['2026-02-06', 1255], ['2026-02-13', 1248], ['2026-02-20', 1262],
];

const volumeData: [string, number][] = [
  ['2025-02-07', 385], ['2025-02-14', 342], ['2025-02-21', 428], ['2025-02-28', 465],
  ['2025-03-07', 510], ['2025-03-14', 485], ['2025-03-21', 392], ['2025-03-28', 358],
  ['2025-04-04', 345], ['2025-04-11', 328], ['2025-04-18', 312], ['2025-04-25', 295],
  ['2025-05-02', 365], ['2025-05-09', 342], ['2025-05-16', 378], ['2025-05-23', 352],
  ['2025-05-30', 398], ['2025-06-06', 425], ['2025-06-13', 445], ['2025-06-20', 408],
  ['2025-06-27', 388], ['2025-07-04', 265], ['2025-07-11', 412], ['2025-07-18', 468],
  ['2025-07-25', 445], ['2025-08-01', 395], ['2025-08-08', 358], ['2025-08-15', 335],
  ['2025-08-22', 312], ['2025-08-29', 298], ['2025-09-05', 345], ['2025-09-12', 368],
  ['2025-09-19', 322], ['2025-09-26', 308], ['2025-10-03', 285], ['2025-10-10', 298],
  ['2025-10-17', 335], ['2025-10-24', 348], ['2025-10-31', 382], ['2025-11-07', 425],
  ['2025-11-14', 445], ['2025-11-21', 398], ['2025-11-28', 245], ['2025-12-05', 378],
  ['2025-12-12', 365], ['2025-12-19', 248], ['2025-12-26', 198], ['2026-01-02', 285],
  ['2026-01-09', 365], ['2026-01-16', 388], ['2026-01-23', 418], ['2026-01-30', 445],
  ['2026-02-06', 385], ['2026-02-13', 368], ['2026-02-20', 342],
];

const FONT = "'Delight', -apple-system, BlinkMacSystemFont, sans-serif";

export function NVDAStockPriceWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      formatter(params: any[]) {
        if (!params.length) return '';
        const d = new Date(params[0].data[0]);
        const title = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        let html = `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.7);margin-bottom:6px">${title}</div>`;
        params.forEach((p: any) => {
          const dot = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:8px;height:8px;background:${p.color};vertical-align:middle"></span>`;
          const val = p.seriesName === 'Volume' ? `${p.data[1]}M` : `$${p.data[1].toLocaleString()}`;
          html += `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.9);line-height:20px">${dot}${p.seriesName}: ${val}</div>`;
        });
        return html;
      },
    },
    legend: { show: false },
    grid: [
      { left: 48, right: 12, top: 24, bottom: '30%' },
      { left: 48, right: 12, top: '76%', bottom: 20 },
    ],
    xAxis: [
      timeXAxisConfig({
        gridIndex: 0,
        axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10, formatter: monthYearFormatter },
        min: '2025-02-01', max: '2026-03-01',
      }),
      timeXAxisConfig({
        gridIndex: 1,
        axisLabel: { show: false },
        min: '2025-02-01', max: '2026-03-01',
      }),
    ],
    yAxis: [
      valueYAxisConfig('Price ($)', {
        gridIndex: 0,
        min: 750, max: 1400, interval: 200,
        axisLabel: {
          color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10,
          formatter: (v: number) => `$${v}`,
        },
      }),
      valueYAxisConfig('', {
        gridIndex: 1,
        min: 0, max: 600,
        axisLabel: { show: false },
        splitLine: { show: false },
      }),
    ],
    series: [
      {
        ...lineSeriesConfig('NVDA', CHART_COLORS.primary),
        data: priceData,
        xAxisIndex: 0,
        yAxisIndex: 0,
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(73, 163, 166, 0.25)' },
              { offset: 1, color: 'rgba(73, 163, 166, 0)' },
            ],
          },
        },
      },
      {
        name: 'Volume',
        type: 'bar',
        data: volumeData,
        xAxisIndex: 1,
        yAxisIndex: 1,
        barMaxWidth: 6,
        itemStyle: {
          color: 'rgba(0,0,0,0.15)',
          borderRadius: [1, 1, 0, 0],
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-[16px] h-[420px] w-full relative rounded-[4px]">
      {/* Widget Title */}
      <div className="flex gap-[12px] h-[22px] items-center w-full">
        <div className="flex flex-1 gap-[2px] items-center min-w-0">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
            NVDA Stock Price (1Y)
          </p>
        </div>
        <div className="flex gap-[4px] items-center">
          <p className="font-['Delight:Regular',sans-serif] text-[20px] font-medium text-[rgba(0,0,0,0.9)] leading-[22px]">
            $1,262
          </p>
          <span className="font-['Delight:Regular',sans-serif] text-[12px] text-[var(--main-m3)] leading-[20px]">
            +43.1% YTD
          </span>
        </div>
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
