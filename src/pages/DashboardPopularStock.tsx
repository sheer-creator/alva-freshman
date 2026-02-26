/**
 * [INPUT]: AppShell, Topbar, ReactECharts, chart-theme
 * [OUTPUT]: Popular Stock Tracking Dashboard — TSLA 示例
 * [POS]: 页面层 — 叙事驱动的个股全景看板（遵循 output-spec-product.md 规范）
 *
 * 布局结构（自上而下，output-spec-product.md §6.1）：
 *   Row 1: Stock Overview（全宽）
 *   Row 2: Narrative Context（全宽）
 *   Row 3: Business Line Heatmap（全宽）
 *   Row 4: Google Trends | Price Chart（1:1）
 *   Row 5: Social Feed | News Feed（1:1）
 *   Row 6: Robot / Optimus（Overview + Chart + KPI）
 *   Row 7: FSD / Autonomy（Overview + Chart + Chart）
 *   Row 8: AI / xAI（Overview + KPI）
 *   Row 9: Fundamentals（KPI grid + Insider Table）
 */

import ReactECharts from 'echarts-for-react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import {
  CHART_COLORS, tooltipConfig, GRID_DEFAULT,
  timeXAxisConfig, valueYAxisConfig, lineSeriesConfig,
  monthYearFormatter, ZERO_MARK_LINE,
} from '@/lib/chart-theme';

/* ─────────────────────────────────────────
   Design tokens (inline, follow Alva spec)
   ───────────────────────────────────────── */
const T = {
  n9:  'rgba(0,0,0,0.9)',
  n7:  'rgba(0,0,0,0.7)',
  n5:  'rgba(0,0,0,0.5)',
  n3:  'rgba(0,0,0,0.3)',
  g01: '#fafafa',
  pos: '#2a9b7d',
  neg: '#e05357',
  teal: '#49A3A6',
  FONT: "'Delight',-apple-system,BlinkMacSystemFont,sans-serif",
} as const;

const CHART_DOT_BG = {
  backgroundColor: '#ffffff',
  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 0.6px, transparent 0.6px)',
  backgroundSize: '3px 3px',
} as const;

/* ─────────────────────────────────────────
   Shared sub-components
   ───────────────────────────────────────── */

function WidgetTitle({ title, timestamp }: { title: string; timestamp: string }) {
  return (
    <div className="flex items-center justify-between h-[22px] mb-[16px]">
      <p style={{ fontSize: 14, color: T.n9, letterSpacing: '0.14px', lineHeight: '22px', fontFamily: T.FONT }}>
        {title}
      </p>
      <p style={{ fontSize: 12, color: T.n5, lineHeight: '20px', fontFamily: T.FONT }}>
        {timestamp}
      </p>
    </div>
  );
}

function SectionLabel({ icon, title, sub }: { icon?: string; title: string; sub?: string }) {
  return (
    <div className="inline-flex items-center gap-[12px] mt-[8px]">
      {icon && <span style={{ fontSize: 22, lineHeight: 1 }}>{icon}</span>}
      <span style={{ fontSize: 22, fontWeight: 400, color: T.n9, letterSpacing: '0.3px', fontFamily: T.FONT }}>
        {title}
      </span>
      {sub && (
        <span style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT, paddingLeft: 8, borderLeft: '1px solid rgba(0,0,0,0.07)' }}>
          {sub}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   1. Stock Overview
   ───────────────────────────────────────── */
const periods = [
  { label: '1D',  val: '+2.4%',  vs: 'vs S&P +0.6%',   pos: true },
  { label: '7D',  val: '+5.1%',  vs: 'vs S&P +1.2%',   pos: true },
  { label: '1M',  val: '-8.7%',  vs: 'vs S&P -3.1%',   pos: false },
  { label: 'YTD', val: '-14.2%', vs: 'vs S&P -5.8%',   pos: false },
  { label: '1Y',  val: '+41.8%', vs: 'vs S&P +24.3%',  pos: true },
];

function StockOverviewWidget() {
  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Stock Overview" timestamp="Real-time · Feb 26, 2026" />
      <div style={{ background: T.g01, borderRadius: 6, padding: '20px 24px' }}>
        {/* Header */}
        <div className="flex items-start gap-[16px] mb-[20px]">
          <div style={{
            width: 48, height: 48, borderRadius: 8, flexShrink: 0,
            background: '#cc0000', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 500, color: 'white', fontFamily: T.FONT,
          }}>T</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: T.n9, fontFamily: T.FONT, marginBottom: 4 }}>
              Tesla, Inc. <span style={{ fontSize: 13, fontWeight: 400, color: T.n5 }}>TSLA · NASDAQ</span>
            </p>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT }}>
              Electric Vehicles · AI · Energy Storage &nbsp;·&nbsp;
              <span style={{
                background: 'rgba(0,0,0,0.05)', borderRadius: 2, padding: '1px 6px', fontSize: 11,
              }}>Consumer Discretionary</span>
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 24, fontWeight: 500, color: T.n9, fontFamily: T.FONT, lineHeight: '30px' }}>
              $312.45
            </p>
            <p style={{ fontSize: 13, color: T.pos, fontFamily: T.FONT }}>▲ $7.40 (+2.43%)</p>
            <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT, marginTop: 2 }}>
              Market Cap: $998B &nbsp;·&nbsp; Fwd P/E: ~118x
            </p>
          </div>
        </div>
        {/* Period grid */}
        <div className="grid grid-cols-5 gap-[12px]">
          {periods.map((p) => (
            <div key={p.label} style={{ background: 'white', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT, marginBottom: 4 }}>{p.label}</p>
              <p style={{ fontSize: 15, fontWeight: 500, color: p.pos ? T.pos : T.neg, fontFamily: T.FONT }}>{p.val}</p>
              <p style={{ fontSize: 10, color: p.pos ? T.pos : T.neg, fontFamily: T.FONT }}>{p.vs}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   2. Narrative Context
   ───────────────────────────────────────── */
function NarrativeContextWidget() {
  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Narrative Context" timestamp="Weekly · Feb 26, 2026" />
      <div style={{ background: T.g01, borderRadius: 6, padding: 20 }}>
        <div className="grid grid-cols-2 gap-[24px]">
          {/* Left: Focus + Strengths */}
          <div className="flex flex-col gap-[16px]">
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: T.teal, fontFamily: T.FONT, marginBottom: 8, letterSpacing: '0.12px' }}>
                【当前关注点】
              </p>
              <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '20px' }}>
                市场焦点已从汽车交付量转向 AI 和机器人。Optimus 人形机器人成为最大话题，其次是 FSD 自动驾驶进展和 xAI 的估值想象空间。
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: T.pos, fontFamily: T.FONT, marginBottom: 8, letterSpacing: '0.12px' }}>
                【核心优点】
              </p>
              <div className="flex flex-col gap-[6px]">
                {[
                  'Robot：Optimus Gen 2 展示超预期，2026 年内部部署目标 1000 台',
                  'FSD：v13 累计里程突破 2B，干预率持续下降',
                  'AI：xAI 估值 $50B+，Dojo 算力快速扩张',
                ].map((t, i) => (
                  <div key={i} className="flex gap-[8px]">
                    <span style={{ color: T.pos, fontSize: 12, flexShrink: 0, marginTop: 2 }}>·</span>
                    <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '20px' }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Risks + Watch */}
          <div className="flex flex-col gap-[16px]">
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: T.neg, fontFamily: T.FONT, marginBottom: 8, letterSpacing: '0.12px' }}>
                【主要风险】
              </p>
              <div className="flex flex-col gap-[6px]">
                {[
                  '汽车业务毛利率持续承压，中国竞争加剧',
                  'Robot 商业化时间表不确定性高',
                  'Musk 精力分散（xAI、SpaceX、政治参与）',
                ].map((t, i) => (
                  <div key={i} className="flex gap-[8px]">
                    <span style={{ color: T.neg, fontSize: 12, flexShrink: 0, marginTop: 2 }}>·</span>
                    <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '20px' }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: T.n5, fontFamily: T.FONT, marginBottom: 8, letterSpacing: '0.12px' }}>
                【关键观察指标】
              </p>
              <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '20px' }}>
                Optimus 原型数量、FSD 里程增速、下次财报 Robot/AI 披露
              </p>
            </div>
            <p style={{ fontSize: 11, color: T.n3, fontFamily: T.FONT, marginTop: 'auto' }}>
              Sources: Twitter 高频词分析 · Reuters · Electrek
            </p>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   3. Business Line Heatmap
   ───────────────────────────────────────── */
const heatmapData = [
  { label: 'Robot (Optimus)', value: 85, change: '+13%' },
  { label: 'FSD / Autonomy',  value: 72, change: '+4%' },
  { label: 'AI (xAI/Dojo)',   value: 65, change: '+7%' },
  { label: 'Energy',          value: 42, change: '+2%' },
  { label: 'Auto',            value: 35, change: '-9%' },
];

function HeatmapWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      trigger: 'axis',
      axisPointer: { type: 'none' },
      formatter(params: any[]) {
        const p = params[0];
        const item = heatmapData[heatmapData.length - 1 - p.dataIndex];
        return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${item.label}</div>` +
          `<div style="font-size:13px;color:${T.n9};font-family:${T.FONT}">热度: <b>${item.value}%</b> &nbsp; 变化: <b style="color:${item.change.startsWith('+') ? T.pos : T.neg}">${item.change}</b></div>`;
      },
    },
    grid: { left: 120, right: 60, top: 8, bottom: 8, containLabel: false },
    xAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'category',
      data: [...heatmapData].reverse().map((d) => d.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 12 },
    },
    series: [{
      name: '热度',
      type: 'bar',
      barMaxWidth: 16,
      barCategoryGap: '50%',
      data: [...heatmapData].reverse().map((d, i) => ({
        value: d.value,
        itemStyle: {
          color: `rgba(73,163,166,${0.4 + (heatmapData.length - 1 - i) * 0.12})`,
          borderRadius: 2,
        },
        label: {
          show: true,
          position: 'right',
          distance: 8,
          formatter: `{c}%`,
          color: T.n7,
          fontFamily: T.FONT,
          fontSize: 12,
        },
      })),
    }],
  };

  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Business Line Heatmap" timestamp="Daily · Feb 26, 2026" />
      <div style={{ ...CHART_DOT_BG, borderRadius: 6, padding: '16px 16px 8px' }}>
        <ReactECharts option={option} style={{ height: 220 }} notMerge />
        <p style={{ fontSize: 11, color: T.n3, fontFamily: T.FONT, textAlign: 'right', marginTop: 4 }}>
          Source: Twitter/Reddit 高频词分析
        </p>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   4a. Google Trends Chart
   ───────────────────────────────────────── */
const trendsX = ['Nov','Dec','Jan','Feb'];
const trendsData = [62, 55, 78, 85];

function GoogleTrendsWidget() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter: (p: any[]) => {
      const v = p[0];
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${v.name}</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CHART_COLORS.primary}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">Search Interest: ${v.value}</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category', data: trendsX, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value', min: 0, max: 100, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    series: [{
      name: 'Search Interest',
      type: 'line',
      data: trendsData,
      symbol: 'circle', symbolSize: 10, showSymbol: false,
      lineStyle: { width: 1, color: CHART_COLORS.primary },
      itemStyle: { color: CHART_COLORS.primary },
      emphasis: { itemStyle: { borderColor: '#fff', borderWidth: 1, color: CHART_COLORS.primary } },
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
          { offset: 0, color: 'rgba(73,163,166,0.15)' },
          { offset: 1, color: 'rgba(73,163,166,0)' },
        ]},
      },
    }],
  };

  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Google Trends" timestamp="90D · TSLA" />
      <div style={{ ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
        <ReactECharts option={option} style={{ height: 220 }} notMerge />
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   4b. Price Chart (TSLA vs S&P500, 12M)
   ───────────────────────────────────────── */
const priceX = ['Feb\'25','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan\'26','Feb\'26'];
const tslaPct = [0, -12.4, -8.2, +4.1, +18.6, +32.4, +44.8, +38.2, +52.1, +61.7, +48.3, +58.9, +41.8];
const sp500Pct = [0, -2.1, +1.4, +3.8, +6.2, +9.4, +12.8, +10.6, +15.2, +18.4, +14.7, +20.1, +24.3];

function PriceChartWidget() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      let s = `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:6px">${params[0].name}</div>`;
      params.forEach((p: any) => {
        const sign = p.value >= 0 ? '+' : '';
        s += `<div style="display:flex;align-items:center;gap:6px;line-height:20px">` +
          `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>` +
          `<span style="color:${T.n9};font-family:${T.FONT};font-size:12px">${p.seriesName}&nbsp;&nbsp;${sign}${p.value}%</span></div>`;
      });
      return s;
    }},
    legend: { show: false },
    grid: { ...GRID_DEFAULT, top: 24, bottom: 20 },
    xAxis: { type: 'category', data: priceX, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => (v >= 0 ? '+' : '') + v + '%' } },
    series: [
      { ...lineSeriesConfig('TSLA', '#cc0000'), data: tslaPct, markLine: ZERO_MARK_LINE },
      { ...lineSeriesConfig('S&P 500', CHART_COLORS.blue), data: sp500Pct },
    ],
  };

  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Price Chart" timestamp="12M · % Change" />
      <div style={{ ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
        <div className="flex items-center justify-end gap-[8px] mb-[4px]" style={{ height: 16 }}>
          <div className="flex items-center gap-[4px]">
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#cc0000', flexShrink: 0 }} />
            <p style={{ fontSize: 10, color: T.n5, fontFamily: T.FONT }}>TSLA</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: CHART_COLORS.blue, flexShrink: 0 }} />
            <p style={{ fontSize: 10, color: T.n5, fontFamily: T.FONT }}>S&P 500</p>
          </div>
        </div>
        <ReactECharts option={option} style={{ height: 220 }} notMerge />
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   5a. Social Keywords Trend Chart
   ───────────────────────────────────────── */
const kwX = ['Oct','Nov','Dec','Jan','Feb'];
const kwSeries = [
  { name: 'Robot',   color: CHART_COLORS.primary,  data: [18, 42, 68, 78, 85] },
  { name: 'FSD',     color: CHART_COLORS.deepBlue,  data: [55, 60, 65, 70, 72] },
  { name: 'xAI',     color: CHART_COLORS.orange,    data: [12, 28, 45, 58, 65] },
  { name: 'Energy',  color: CHART_COLORS.green,     data: [38, 40, 43, 41, 42] },
  { name: 'Auto',    color: CHART_COLORS.red,       data: [62, 55, 48, 40, 35] },
];

function SocialKeywordsWidget() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      let s = `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:6px">${params[0].name}</div>`;
      params.forEach((p: any) => {
        s += `<div style="display:flex;align-items:center;gap:6px;line-height:20px">` +
          `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>` +
          `<span style="color:${T.n9};font-family:${T.FONT};font-size:12px">${p.seriesName}&nbsp;&nbsp;${p.value}</span></div>`;
      });
      return s;
    }},
    grid: { ...GRID_DEFAULT, top: 8, bottom: 20 },
    xAxis: { type: 'category', data: kwX, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value', min: 0, max: 100, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    series: kwSeries.map((s) => ({ ...lineSeriesConfig(s.name, s.color), data: s.data })),
  };

  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Social Keyword Trends" timestamp="90D · Twitter/Reddit" />
      <div style={{ ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
        <div className="flex items-center justify-end gap-[8px] mb-[4px]" style={{ height: 16 }}>
          {kwSeries.map((s) => (
            <div key={s.name} className="flex items-center gap-[4px]">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <p style={{ fontSize: 10, color: T.n5, fontFamily: T.FONT }}>{s.name}</p>
            </div>
          ))}
        </div>
        <ReactECharts option={option} style={{ height: 220 }} notMerge />
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   5b. News Feed
   ───────────────────────────────────────── */
const newsItems = [
  { source: 'Reuters',   time: '2h ago',  headline: 'Tesla Optimus Gen 2 completes first unsupervised factory task at Fremont — Musk says "ahead of schedule"' },
  { source: 'Electrek',  time: '5h ago',  headline: 'Tesla FSD v13.2.6 expands to full US rollout: intervention rate drops below 0.3 per million miles' },
  { source: 'Bloomberg', time: '8h ago',  headline: 'xAI valued at $55B in latest funding round; Grok 3 integration with Tesla vehicles confirmed for Q2' },
  { source: 'WSJ',       time: '1d ago',  headline: 'Tesla China insurance registrations: 21,400 units in week of Feb 17-23, up 8% MoM despite price competition' },
  { source: 'Axios',     time: '1d ago',  headline: 'Tesla Energy sets Q4 record: 11.0 GWh Megapack deployed, utility backlog now extends to 2027' },
];

function NewsFeedWidget() {
  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="News Feed" timestamp="Hourly · $TSLA" />
      <div style={{ background: T.g01, borderRadius: 6, overflow: 'hidden' }}>
        {newsItems.map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', borderBottom: i < newsItems.length - 1 ? '1px solid rgba(0,0,0,0.05)' : undefined }}>
            <div className="flex items-center gap-[8px] mb-[4px]">
              <span style={{ fontSize: 11, fontWeight: 500, color: T.teal, fontFamily: T.FONT }}>{item.source}</span>
              <span style={{ fontSize: 11, color: T.n3, fontFamily: T.FONT }}>{item.time}</span>
            </div>
            <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '20px' }}>{item.headline}</p>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   6. Robot / Optimus Module
   ───────────────────────────────────────── */
const robotX = ['Q1\'25','Q2\'25','Q3\'25','Q4\'25','Q1\'26E','Q2\'26E'];
const robotUnits = [12, 35, 85, 180, 420, 1000];
const robotKPIs = [
  { label: 'Current Prototypes', value: '180', change: '+111%', trend: 'positive' as const },
  { label: '2026 Deploy Target',  value: '1,000', change: 'Internal',  trend: 'neutral' as const },
  { label: 'Unit Cost Target',    value: '<$20K', change: 'vs $30K now', trend: 'positive' as const },
];

function RobotModule() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      const p = params[0];
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${p.name}</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">Units: ${p.value}</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category', data: robotX, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    series: [{
      name: 'Optimus Units',
      type: 'bar',
      barMaxWidth: 16,
      data: robotUnits.map((v, i) => ({
        value: v,
        itemStyle: {
          color: i >= 4 ? 'rgba(73,163,166,0.35)' : CHART_COLORS.primary,
          borderRadius: [2, 2, 0, 0],
        },
      })),
    }],
  };

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionLabel icon="🤖" title="Robot (Optimus)" sub="Narrative #1 · 热度最高" />
      {/* Overview */}
      <div style={{ background: T.g01, borderRadius: 6, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '22px' }}>
          <strong style={{ color: T.n9 }}>进展：</strong>Optimus Gen 2 已在 Fremont 工厂完成首项无监督作业（电池组装），Musk 确认 2026 年内部部署目标上调至 1000 台。单台成本目标低于 $20K，远低于行业同类产品。
          &nbsp;<strong style={{ color: T.n9 }}>竞品：</strong>Figure AI / Boston Dynamics 商业化进展落后，Tesla 在数据飞轮上具备先发优势。
          &nbsp;<strong style={{ color: T.n9 }}>关键问题：</strong>量产能力与 AI 控制系统的成熟度，目前仍高度依赖人工干预降级。
        </p>
      </div>
      {/* Chart + KPIs */}
      <div className="grid grid-cols-[3fr_2fr] gap-[24px]" style={{ alignItems: 'stretch' }}>
        <div className="flex flex-col relative">
          <WidgetTitle title="Optimus 部署量 · Quarterly" timestamp="Q1'25–Q2'26E" />
          <div style={{ flex: 1, ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={option} style={{ height: '100%', minHeight: 180 }} notMerge />
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
        </div>
        <div className="flex flex-col gap-[12px]">
          {robotKPIs.map((k) => (
            <div key={k.label} style={{ flex: 1, background: T.g01, borderRadius: 6, padding: '12px 16px' }}>
              <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 6 }}>{k.label}</p>
              <p style={{ fontSize: 20, fontWeight: 500, color: T.n9, fontFamily: T.FONT, lineHeight: '24px' }}>{k.value}</p>
              <p style={{ fontSize: 11, color: k.trend === 'positive' ? T.pos : k.trend === 'negative' ? T.neg : T.n5, fontFamily: T.FONT }}>{k.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   7. FSD / Autonomy Module
   ───────────────────────────────────────── */
const fsdX = ['Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
const fsdMiles = [1.1, 1.2, 1.35, 1.48, 1.58, 1.68, 1.76, 1.84, 1.91, 1.97, 2.03, 2.08];
const fsdIntervention = [2.8, 2.5, 2.2, 1.95, 1.72, 1.52, 1.38, 1.22, 1.08, 0.95, 0.82, 0.68];

function FSDModule() {
  const milesOption = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${params[0].name} 2025–26</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CHART_COLORS.deepBlue}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">累计里程: ${params[0].value}B miles</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category', data: fsdX, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value', min: 1.0, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => v + 'B' } },
    series: [{
      ...lineSeriesConfig('FSD Cumulative Miles', CHART_COLORS.deepBlue),
      data: fsdMiles,
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(61,139,209,0.12)' }, { offset: 1, color: 'rgba(61,139,209,0)' }] } },
    }],
  };

  const interventionOption = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${params[0].name} 2025–26</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CHART_COLORS.orange}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">干预率: ${params[0].value} /100k miles</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category', data: fsdX, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    series: [{
      ...lineSeriesConfig('Intervention Rate', CHART_COLORS.orange),
      data: fsdIntervention,
    }],
  };

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionLabel icon="🚗" title="FSD / Autonomy" sub="Narrative #2 · 持续关注" />
      {/* Overview */}
      <div style={{ background: T.g01, borderRadius: 6, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '22px' }}>
          <strong style={{ color: T.n9 }}>里程碑：</strong>FSD v13 累计里程突破 2B miles，干预率从 2.8 降至 0.68（/100K miles），v13.2.6 已完成全美推送。
          &nbsp;<strong style={{ color: T.n9 }}>Robotaxi：</strong>Austin 小规模商业试运营目标 Q2 2026，监管挑战是主要障碍。
          &nbsp;<strong style={{ color: T.n9 }}>竞品：</strong>Waymo 日均完成订单约 3 万次（San Francisco + Phoenix），但无大规模快速扩张计划；Tesla 数据规模优势明显。
        </p>
      </div>
      {/* Two charts */}
      <div className="grid grid-cols-2 gap-[24px]">
        <div className="flex flex-col relative">
          <WidgetTitle title="FSD 累计里程" timestamp="12M · Billion Miles" />
          <div style={{ ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={milesOption} style={{ height: 200 }} notMerge />
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
        </div>
        <div className="flex flex-col relative">
          <WidgetTitle title="FSD 人工干预率" timestamp="12M · Per 100K Miles" />
          <div style={{ ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={interventionOption} style={{ height: 200 }} notMerge />
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   8. AI / xAI Module
   ───────────────────────────────────────── */
const xaiValX = ['Q2\'25','Q3\'25','Q4\'25','Q1\'26'];
const xaiVal = [24, 33, 45, 55];
const aiKPIs = [
  { label: 'xAI Latest Valuation', value: '$55B', change: '+129% YoY', trend: 'positive' as const },
  { label: 'Dojo GPU (H100 eq.)',   value: '~50K', change: 'Expanding', trend: 'neutral' as const },
  { label: 'Grok 3 Release',        value: 'Q1\'26', change: 'Launched', trend: 'neutral' as const },
];

function AIModule() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${params[0].name}</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CHART_COLORS.orange}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">Valuation: $${params[0].value}B</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category', data: xaiValX, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value', min: 0, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => '$' + v + 'B' } },
    series: [{
      ...lineSeriesConfig('xAI Valuation', CHART_COLORS.orange),
      data: xaiVal,
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(255,152,0,0.15)' }, { offset: 1, color: 'rgba(255,152,0,0)' }] } },
    }],
  };

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionLabel icon="🧠" title="AI (xAI / Dojo)" sub="Narrative #3 · 新兴热点" />
      {/* Overview */}
      <div style={{ background: T.g01, borderRadius: 6, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '22px' }}>
          <strong style={{ color: T.n9 }}>xAI：</strong>最新估值 $55B，Grok 3 已上线，Tesla 车辆 AI 集成确认 Q2 推出。Musk 持有 xAI 大量股权，存在利益冲突风险。
          &nbsp;<strong style={{ color: T.n9 }}>Dojo：</strong>为 Tesla FSD 和 Optimus 提供定制训练算力，目前约 50K H100 当量规模，2026 年目标扩张至 100K+。
          &nbsp;<strong style={{ color: T.n9 }}>关键变量：</strong>xAI 与 Tesla 的协同关系透明度低，市场无法定价。
        </p>
      </div>
      {/* Chart + KPIs */}
      <div className="grid grid-cols-[3fr_2fr] gap-[24px]" style={{ alignItems: 'stretch' }}>
        <div className="flex flex-col relative">
          <WidgetTitle title="xAI 估值趋势" timestamp="Quarterly · $B" />
          <div style={{ flex: 1, ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={option} style={{ height: '100%', minHeight: 180 }} notMerge />
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
        </div>
        <div className="flex flex-col gap-[12px]">
          {aiKPIs.map((k) => (
            <div key={k.label} style={{ flex: 1, background: T.g01, borderRadius: 6, padding: '12px 16px' }}>
              <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 6 }}>{k.label}</p>
              <p style={{ fontSize: 18, fontWeight: 500, color: T.n9, fontFamily: T.FONT, lineHeight: '24px' }}>{k.value}</p>
              <p style={{ fontSize: 11, color: k.trend === 'positive' ? T.pos : k.trend === 'negative' ? T.neg : T.n5, fontFamily: T.FONT }}>{k.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   9. Fundamentals
   ───────────────────────────────────────── */
const fundKPIs = [
  { label: 'Revenue (TTM)',    value: '$97.7B',  change: '+2.1%',    trend: 'positive' as const },
  { label: 'Net Income (TTM)', value: '$7.3B',   change: '-45%',     trend: 'negative' as const },
  { label: 'Gross Margin',     value: '18.2%',   change: '-2.8pp',   trend: 'negative' as const },
  { label: 'Auto GM',          value: '16.3%',   change: '-1.5pp',   trend: 'negative' as const },
  { label: 'P/E (FWD)',        value: '~118x',   change: 'Premium',  trend: 'neutral' as const },
  { label: 'EV/EBITDA',        value: '~60x',    change: '',         trend: 'neutral' as const },
  { label: 'Short Interest',   value: '3.2%',    change: '-0.5pp',   trend: 'positive' as const },
  { label: 'Days to Cover',    value: '1.4',     change: '',         trend: 'neutral' as const },
];

const insiderData = [
  { name: 'Elon Musk',        role: 'CEO',   type: 'Exercise', shares: '—', date: 'Jan 15, 2026', note: 'Option exercise' },
  { name: 'Vaibhav Taneja',   role: 'CFO',   type: 'Sale',     shares: '-25,000', date: 'Jan 22, 2026', note: 'Rule 10b5-1' },
  { name: 'Robyn Denholm',    role: 'Chair', type: 'Sale',     shares: '-18,500', date: 'Feb 3, 2026',  note: 'Rule 10b5-1' },
  { name: 'Kathleen Wilson',  role: 'Dir',   type: 'Purchase', shares: '+5,000',  date: 'Feb 10, 2026', note: 'Open market' },
];

function FundamentalsModule() {
  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionLabel icon="📊" title="Fundamentals" sub="P1 · 基础数据" />
      {/* KPI Grid */}
      <div className="flex flex-col">
        <WidgetTitle title="Key Metrics" timestamp="Q4'25 · TTM" />
        <div className="grid grid-cols-4 gap-[12px]">
          {fundKPIs.map((k) => (
            <div key={k.label} style={{ background: T.g01, borderRadius: 6, padding: '12px 16px' }}>
              <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 6 }}>{k.label}</p>
              <p style={{ fontSize: 18, fontWeight: 500, color: T.n9, fontFamily: T.FONT, lineHeight: '22px' }}>{k.value}</p>
              {k.change && <p style={{ fontSize: 11, color: k.trend === 'positive' ? T.pos : k.trend === 'negative' ? T.neg : T.n5, fontFamily: T.FONT }}>{k.change}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Insider Trading Table */}
      <div className="flex flex-col">
        <WidgetTitle title="Insider Trading" timestamp="SEC Form 4 · Last 60D" />
        <div style={{ borderRadius: 6, overflow: 'hidden' }}>
          {/* Header */}
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1.4fr 1.5fr', borderBottom: '1px solid rgba(0,0,0,0.07)', paddingBottom: 10 }}>
            {['Name', 'Role', 'Type', 'Shares', 'Date', 'Note'].map((h) => (
              <p key={h} style={{ fontSize: 13, color: T.n5, fontFamily: T.FONT, letterSpacing: '0.13px', padding: '0 0 0 0' }}>{h}</p>
            ))}
          </div>
          {insiderData.map((row, i) => (
            <div key={i} className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1.4fr 1.5fr', padding: '12px 0', borderBottom: i < insiderData.length - 1 ? '1px solid rgba(0,0,0,0.07)' : undefined }}>
              <p style={{ fontSize: 13, color: T.n9, fontFamily: T.FONT }}>{row.name}</p>
              <p style={{ fontSize: 13, color: T.n5, fontFamily: T.FONT }}>{row.role}</p>
              <p style={{ fontSize: 13, fontFamily: T.FONT, color: row.type === 'Purchase' ? T.pos : row.type === 'Sale' ? T.neg : T.n7 }}>{row.type}</p>
              <p style={{ fontSize: 13, fontFamily: T.FONT, color: row.shares.startsWith('+') ? T.pos : row.shares.startsWith('-') ? T.neg : T.n7 }}>{row.shares}</p>
              <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT }}>{row.date}</p>
              <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT }}>{row.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Page
   ───────────────────────────────────────── */
export function DashboardPopularStock({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="popular-stock" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="flex flex-col items-center px-[28px] relative w-full">
          <Topbar title="Popular Stock Playbook" />

          <div className="flex flex-col gap-[24px] pb-[56px] w-full">

            {/* 1. Stock Overview */}
            <StockOverviewWidget />

            {/* 2. Narrative Context */}
            <NarrativeContextWidget />

            {/* 3. Business Line Heatmap */}
            <HeatmapWidget />

            {/* 4. Google Trends | Price Chart */}
            <div className="grid grid-cols-2 gap-[24px] w-full">
              <GoogleTrendsWidget />
              <PriceChartWidget />
            </div>

            {/* 5. Social Keywords | News Feed */}
            <div className="grid grid-cols-2 gap-[24px] w-full">
              <SocialKeywordsWidget />
              <NewsFeedWidget />
            </div>

            {/* 6. Robot / Optimus */}
            <RobotModule />

            {/* 7. FSD / Autonomy */}
            <FSDModule />

            {/* 8. AI / xAI */}
            <AIModule />

            {/* 9. Fundamentals */}
            <FundamentalsModule />

          </div>
        </div>
      </div>
    </AppShell>
  );
}
