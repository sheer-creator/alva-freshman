/**
 * [INPUT]: AppShell, Topbar, ReactECharts, chart-theme
 * [OUTPUT]: TSLA Tracking Dashboard — 叙事驱动的个股全景看板
 * [POS]: 页面层 — 基于 Alva API session 2029491735235088384 的实时数据
 *
 * 布局结构（自上而下）：
 *   Part 1: Common
 *     Row 1: Stock Overview（全宽）
 *     Row 2: Narrative Context（全宽）
 *     Row 3: Business Line Heatmap（全宽）
 *     Row 4: Price Chart vs SPY | Social Keywords（1:1）
 *     Row 5: Social Feed (X) | News Feed（1:1）
 *   Part 2: Professional（按热度排序）
 *     Row 6: Robot / Optimus（Overview + Chart + KPI）
 *     Row 7: FSD / Autonomy（Overview + Chart + Chart）
 *     Row 8: AI / xAI（Overview + Chart + KPI）
 *     Row 9: Energy Storage（Overview + Chart + KPI）
 *   Part 3: Fundamentals
 *     Row 10: Fundamentals Overview（全宽）
 *     Row 11: P/E Trend | Revenue & Income Trend（1:1）
 *     Row 12: Valuation KPIs（全宽）
 *     Row 13: Financial Health KPIs（全宽）
 *     Row 14: Earnings Preview（全宽）
 *     Row 15: Insider Trading（全宽）
 *     Row 16: Analyst Price Targets（全宽）
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

function AlvaWatermark() {
  return (
    <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>
      Alva
    </div>
  );
}

/* ─────────────────────────────────────────
   1. Stock Overview (API data)
   ───────────────────────────────────────── */
const periods = [
  { label: '1D',  val: '+3.44%',  vs: 'vs S&P +0.8%',   pos: true },
  { label: '7D',  val: '+6.2%',   vs: 'vs S&P +1.4%',   pos: true },
  { label: '1M',  val: '-5.3%',   vs: 'vs S&P -2.1%',   pos: false },
  { label: 'YTD', val: '+38.6%',  vs: 'vs S&P +15.3%',  pos: true },
  { label: '1Y',  val: '+89.8%',  vs: 'vs S&P +24.1%',  pos: true },
];

function StockOverviewWidget() {
  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Stock Overview" timestamp="Real-time · Mar 5, 2026" />
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
            <p style={{ fontSize: 24, fontWeight: 400, color: T.n9, fontFamily: T.FONT, lineHeight: '30px' }}>
              $405.94
            </p>
            <p style={{ fontSize: 13, color: T.pos, fontFamily: T.FONT }}>▲ $13.50 (+3.44%)</p>
            <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT, marginTop: 2 }}>
              Vol: 60.6M &nbsp;·&nbsp; 52W: $214.25 – $498.83
            </p>
          </div>
        </div>
        {/* Period grid */}
        <div className="flex flex-wrap gap-[12px]">
          {periods.map((p) => (
            <div key={p.label} style={{ flex: '1 1 auto', minWidth: 120, background: 'white', borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT, marginBottom: 4 }}>{p.label}</p>
              <p style={{ fontSize: 15, fontWeight: 500, color: p.pos ? T.pos : T.neg, fontFamily: T.FONT }}>{p.val}</p>
              <p style={{ fontSize: 10, color: p.pos ? T.pos : T.neg, fontFamily: T.FONT }}>{p.vs}</p>
            </div>
          ))}
        </div>
      </div>
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   2. Narrative Context
   ───────────────────────────────────────── */
function NarrativeContextWidget() {
  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Narrative Context" timestamp="Weekly · Mar 5, 2026" />
      <div style={{ background: T.g01, borderRadius: 6, padding: 20 }}>
        <div className="flex flex-wrap gap-[24px]">
          {/* Left: Focus + Strengths */}
          <div className="flex flex-col gap-[16px]" style={{ flex: '1 1 280px' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: T.teal, fontFamily: T.FONT, marginBottom: 8, letterSpacing: '0.12px' }}>
                Current Focus
              </p>
              <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '20px' }}>
                Market attention has decisively shifted from auto deliveries to AI and robotics. Optimus humanoid robot remains the top narrative, followed by FSD autonomy progress and Robotaxi timeline. xAI valuation and its synergy with Tesla vehicles is a growing theme.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: T.pos, fontFamily: T.FONT, marginBottom: 8, letterSpacing: '0.12px' }}>
                Bull Case
              </p>
              <div className="flex flex-col gap-[6px]">
                {[
                  'Robot: Optimus Gen 2 achieving unsupervised factory tasks, 2026 target 1,000 units deployed internally',
                  'FSD: v13 cumulative miles surpass 2.5B, intervention rate at historic lows',
                  'Energy: Megapack deployments hitting record quarterly volumes, backlog extends to 2028',
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
          <div className="flex flex-col gap-[16px]" style={{ flex: '1 1 280px' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: T.neg, fontFamily: T.FONT, marginBottom: 8, letterSpacing: '0.12px' }}>
                Key Risks
              </p>
              <div className="flex flex-col gap-[6px]">
                {[
                  'Auto gross margin under persistent pressure from China competition and price cuts',
                  'Robot commercialization timeline remains highly uncertain',
                  'Musk distraction risk: xAI, SpaceX, political engagement diluting focus',
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
                Key Watchpoints
              </p>
              <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '20px' }}>
                Optimus prototype count, FSD mile growth rate, Robotaxi Austin launch date, next earnings Robot/AI disclosures
              </p>
            </div>
            <p style={{ fontSize: 11, color: T.n3, fontFamily: T.FONT, marginTop: 'auto' }}>
              Sources: Twitter analysis · Reuters · Electrek · Bloomberg
            </p>
          </div>
        </div>
      </div>
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   3. Business Line Heatmap (API data)
   ───────────────────────────────────────── */
const heatmapData = [
  { label: 'Robot (Optimus)',   heat: 92, trend: '↑' },
  { label: 'FSD / Autonomy',   heat: 85, trend: '↑' },
  { label: 'AI (xAI/Dojo)',    heat: 68, trend: '↑' },
  { label: 'Energy Storage',   heat: 55, trend: '↑' },
  { label: 'EV/Auto',          heat: 45, trend: '→' },
];

function HeatmapWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      trigger: 'axis' as const,
      axisPointer: { type: 'none' as const },
      formatter(params: any[]) {
        const p = params[0];
        const item = heatmapData[heatmapData.length - 1 - p.dataIndex];
        return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${item.label}</div>` +
          `<div style="font-size:13px;color:${T.n9};font-family:${T.FONT}">Heat: <b>${item.heat}%</b> &nbsp; Trend: <b>${item.trend}</b></div>`;
      },
    },
    grid: { left: 120, right: 60, top: 8, bottom: 8, containLabel: false },
    xAxis: {
      type: 'value' as const,
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'category' as const,
      data: [...heatmapData].reverse().map((d) => d.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 12 },
    },
    series: [{
      name: 'Heat',
      type: 'bar' as const,
      barMaxWidth: 16,
      barCategoryGap: '50%',
      data: [...heatmapData].reverse().map((d, i) => ({
        value: d.heat,
        itemStyle: {
          color: `rgba(73,163,166,${0.35 + (heatmapData.length - 1 - i) * 0.13})`,
          borderRadius: 2,
        },
        label: {
          show: true,
          position: 'right' as const,
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
      <WidgetTitle title="Business Line Heatmap" timestamp="Daily · Mar 5, 2026" />
      <div style={{ ...CHART_DOT_BG, borderRadius: 6, padding: '16px 16px 8px' }}>
        <ReactECharts option={option} style={{ height: 220 }} notMerge />
        <p style={{ fontSize: 11, color: T.n3, fontFamily: T.FONT, textAlign: 'right', marginTop: 4 }}>
          Source: Twitter/Reddit keyword analysis
        </p>
      </div>
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   4a. Price Chart (TSLA vs SPY, 1Y indexed)
   ───────────────────────────────────────── */
const priceMonths = ['Mar\'25','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan\'26','Feb','Mar\'26'];
const tslaPct = [0, -5.2, +8.4, +16.1, +28.3, +42.5, +36.8, +52.7, +64.2, +48.9, +58.1, +32.4, +38.6];
const sp500Pct = [0, -1.8, +2.6, +5.4, +8.7, +12.1, +10.3, +16.8, +19.4, +14.2, +20.6, +12.8, +15.3];

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
    xAxis: { type: 'category' as const, data: priceMonths, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value' as const, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => (v >= 0 ? '+' : '') + v + '%' } },
    series: [
      { ...lineSeriesConfig('TSLA', '#cc0000'), data: tslaPct, markLine: ZERO_MARK_LINE },
      { ...lineSeriesConfig('SPY', CHART_COLORS.blue), data: sp500Pct },
    ],
  };

  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Price vs SPY" timestamp="1Y · Indexed %" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
        <div className="flex items-center justify-end gap-[8px] mb-[4px]" style={{ height: 16 }}>
          <div className="flex items-center gap-[4px]">
            <div style={{ width: 12, height: 2, borderRadius: 0.5, background: '#cc0000', flexShrink: 0 }} />
            <p style={{ fontSize: 10, color: T.n5, fontFamily: T.FONT }}>TSLA</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <div style={{ width: 12, height: 2, borderRadius: 0.5, background: CHART_COLORS.blue, flexShrink: 0 }} />
            <p style={{ fontSize: 10, color: T.n5, fontFamily: T.FONT }}>SPY</p>
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 180 }}>
          <ReactECharts option={option} style={{ height: '100%' }} notMerge />
        </div>
      </div>
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   4b. Social Keywords (API data)
   ───────────────────────────────────────── */
const socialKeywords = [
  { keyword: 'TESLA',    theme: 'Brand',     count: 127 },
  { keyword: 'China',    theme: 'Market',    count: 57 },
  { keyword: 'Optimus',  theme: 'Robot',     count: 45 },
  { keyword: 'FSD',      theme: 'Autonomy',  count: 38 },
  { keyword: 'Robotaxi', theme: 'Autonomy',  count: 34 },
  { keyword: 'xAI',      theme: 'AI',        count: 29 },
  { keyword: 'Musk',     theme: 'Leadership', count: 26 },
  { keyword: 'Tariff',   theme: 'Policy',    count: 22 },
  { keyword: 'Energy',   theme: 'Storage',   count: 19 },
  { keyword: 'Dojo',     theme: 'AI',        count: 15 },
];

function SocialKeywordsWidget() {
  const maxCount = socialKeywords[0].count;
  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Social Keywords" timestamp="7D · Twitter/X" />
      <div style={{ flex: 1, background: T.g01, borderRadius: 6, padding: '12px 16px', overflow: 'hidden' }}>
        <div className="flex flex-col gap-[6px]">
          {socialKeywords.map((kw) => (
            <div key={kw.keyword} className="flex items-center gap-[8px]">
              <p style={{ fontSize: 12, color: T.n9, fontFamily: T.FONT, width: 64, flexShrink: 0, fontWeight: 500 }}>{kw.keyword}</p>
              <div style={{ flex: 1, height: 12, background: 'rgba(0,0,0,0.04)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${(kw.count / maxCount) * 100}%`, height: '100%', background: T.teal, borderRadius: 2, opacity: 0.4 + (kw.count / maxCount) * 0.6 }} />
              </div>
              <span style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT, width: 28, textAlign: 'right', flexShrink: 0 }}>{kw.count}</span>
              <span style={{
                fontSize: 10, color: T.n5, fontFamily: T.FONT, flexShrink: 0,
                background: 'rgba(0,0,0,0.04)', borderRadius: 2, padding: '0 4px',
              }}>{kw.theme}</span>
            </div>
          ))}
        </div>
      </div>
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   5a. Social Feed (X)
   ───────────────────────────────────────── */
const socialPosts = [
  { author: '@Tslachan',     time: '3h',  text: 'Korea is embracing Tesla at a rapid pace. BYD sold only 957 vehicles despite aggressive push. $TSLA brand power in Asia remains unmatched.' },
  { author: '@WholeMarsBlog', time: '5h',  text: 'Optimus just completed its first fully unsupervised battery pack assembly task at Fremont. This is huge for the robotics narrative.' },
  { author: '@SawyerMerritt', time: '8h',  text: 'FSD v13.2.6 just went to all US customers. Intervention rate is now below 0.3 per million miles. Getting very close to robotaxi readiness.' },
  { author: '@GaryBlack00',   time: '12h', text: 'TSLA auto margins should bottom Q1. Energy + services margins expanding. Robot optionality not priced in at current levels.' },
  { author: '@ElectrekCo',    time: '1d',  text: 'Tesla Megapack factory in Shanghai shipping at 2x initial capacity. Energy storage backlog now extends into 2028.' },
];

function SocialFeedWidget() {
  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Social Feed (X)" timestamp="Hourly · $TSLA" />
      <div style={{ flex: 1, background: T.g01, borderRadius: 6, overflow: 'hidden' }}>
        {socialPosts.map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', borderBottom: i < socialPosts.length - 1 ? '1px solid rgba(0,0,0,0.05)' : undefined }}>
            <div className="flex items-center gap-[8px] mb-[4px]">
              <span style={{ fontSize: 11, fontWeight: 500, color: T.teal, fontFamily: T.FONT }}>{item.author}</span>
              <span style={{ fontSize: 11, color: T.n3, fontFamily: T.FONT }}>{item.time}</span>
            </div>
            <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '20px' }}>{item.text}</p>
          </div>
        ))}
      </div>
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   5b. News Feed (API data)
   ───────────────────────────────────────── */
const newsItems = [
  { source: 'Reuters',    time: '2h ago',  headline: 'Tesla Optimus Gen 2 completes first unsupervised factory task at Fremont — deployment target raised to 1,000 units for 2026' },
  { source: 'Bloomberg',  time: '5h ago',  headline: 'xAI valued at $60B in latest funding round; Grok 3.5 integration with Tesla vehicles confirmed for Q2 2026' },
  { source: 'Electrek',   time: '8h ago',  headline: 'Tesla FSD v13.2.6 achieves full US rollout: intervention rate drops below 0.3 per million miles — robotaxi Austin pilot Q2' },
  { source: 'WSJ',        time: '1d ago',  headline: 'Tesla China insurance registrations: 23,100 units in latest week, up 6% MoM despite intensifying BYD competition' },
  { source: 'CNBC',       time: '1d ago',  headline: 'Tesla Energy sets Q4 record: 12.5 GWh Megapack deployed, Shanghai factory at 2x capacity, utility backlog extends to 2028' },
];

function NewsFeedWidget() {
  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="News Feed" timestamp="Hourly · $TSLA" />
      <div style={{ flex: 1, background: T.g01, borderRadius: 6, overflow: 'hidden' }}>
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
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   6. Robot / Optimus Module
   ───────────────────────────────────────── */
const robotX = ['Q1\'25','Q2\'25','Q3\'25','Q4\'25','Q1\'26E','Q2\'26E'];
const robotUnits = [15, 40, 95, 200, 450, 1000];
const robotKPIs = [
  { label: 'Deployed Prototypes', value: '200+', change: '+111% QoQ', trend: 'positive' as const },
  { label: '2026 Target',        value: '1,000', change: 'Internal',   trend: 'neutral' as const },
  { label: 'Unit Cost Target',   value: '<$20K',  change: 'vs $30K now', trend: 'positive' as const },
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
    xAxis: { type: 'category' as const, data: robotX, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value' as const, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    series: [{
      name: 'Optimus Units',
      type: 'bar' as const,
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
      <SectionLabel icon="🤖" title="Robot (Optimus)" sub="Narrative #1 · Highest Heat" />
      <div style={{ background: T.g01, borderRadius: 6, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '22px' }}>
          <strong style={{ color: T.n9 }}>Progress:</strong> Optimus Gen 2 has completed its first unsupervised task (battery assembly) at Fremont. Musk confirms 2026 internal deployment target raised to 1,000 units. Unit cost target below $20K, well under industry peers.
          &nbsp;<strong style={{ color: T.n9 }}>Competition:</strong> Figure AI and Boston Dynamics lag in commercialization; Tesla's data flywheel provides first-mover advantage.
          &nbsp;<strong style={{ color: T.n9 }}>Key Risk:</strong> Manufacturing scalability and AI control system maturity — still reliant on fallback human intervention.
        </p>
      </div>
      <div className="grid grid-cols-[3fr_2fr] gap-[24px]" style={{ alignItems: 'stretch' }}>
        <div className="flex flex-col relative">
          <WidgetTitle title="Optimus Deployment · Quarterly" timestamp="Q1'25–Q2'26E" />
          <div style={{ flex: 1, ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={option} style={{ height: '100%', minHeight: 180 }} notMerge />
          </div>
          <AlvaWatermark />
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
const fsdMiles = [1.2, 1.35, 1.48, 1.62, 1.75, 1.88, 1.98, 2.08, 2.18, 2.28, 2.38, 2.50];
const fsdIntervention = [2.5, 2.2, 1.9, 1.7, 1.5, 1.32, 1.18, 1.05, 0.92, 0.78, 0.58, 0.30];

function FSDModule() {
  const milesOption = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${params[0].name} 2025–26</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CHART_COLORS.deepBlue}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">Cumulative: ${params[0].value}B miles</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category' as const, data: fsdX, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value' as const, min: 1.0, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => v + 'B' } },
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
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">Rate: ${params[0].value} /M miles</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category' as const, data: fsdX, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value' as const, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    series: [{
      ...lineSeriesConfig('Intervention Rate', CHART_COLORS.orange),
      data: fsdIntervention,
    }],
  };

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionLabel icon="🚗" title="FSD / Autonomy" sub="Narrative #2 · Strong Momentum" />
      <div style={{ background: T.g01, borderRadius: 6, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '22px' }}>
          <strong style={{ color: T.n9 }}>Milestone:</strong> FSD v13 cumulative miles surpassed 2.5B. Intervention rate dropped from 2.5 to 0.30 per million miles over 12 months. v13.2.6 now deployed to all US customers.
          &nbsp;<strong style={{ color: T.n9 }}>Robotaxi:</strong> Austin small-scale commercial pilot targeted for Q2 2026. Regulatory approval remains the primary barrier.
          &nbsp;<strong style={{ color: T.n9 }}>Competition:</strong> Waymo completes ~30K daily rides across SF and Phoenix, but lacks a rapid scaling strategy. Tesla's data advantage is decisive.
        </p>
      </div>
      <div className="flex flex-wrap gap-[24px]" style={{ alignItems: 'stretch' }}>
        <div className="flex flex-col relative" style={{ flex: '1 1 320px' }}>
          <WidgetTitle title="FSD Cumulative Miles" timestamp="12M · Billion Miles" />
          <div style={{ flex: 1, ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={milesOption} style={{ height: '100%', minHeight: 180 }} notMerge />
          </div>
          <AlvaWatermark />
        </div>
        <div className="flex flex-col relative" style={{ flex: '1 1 320px' }}>
          <WidgetTitle title="FSD Intervention Rate" timestamp="12M · Per Million Miles" />
          <div style={{ flex: 1, ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={interventionOption} style={{ height: '100%', minHeight: 180 }} notMerge />
          </div>
          <AlvaWatermark />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   8. AI / xAI Module
   ───────────────────────────────────────── */
const xaiValX = ['Q2\'25','Q3\'25','Q4\'25','Q1\'26'];
const xaiVal = [28, 38, 50, 60];
const aiKPIs = [
  { label: 'xAI Valuation',     value: '$60B',   change: '+114% YoY', trend: 'positive' as const },
  { label: 'Dojo GPU (H100 eq)', value: '~55K',   change: 'Expanding', trend: 'neutral' as const },
  { label: 'Grok 3.5 Release',  value: 'Q1\'26', change: 'Launched',  trend: 'neutral' as const },
];

function AIModule() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${params[0].name}</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CHART_COLORS.orange}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">Valuation: $${params[0].value}B</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category' as const, data: xaiValX, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value' as const, min: 0, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => '$' + v + 'B' } },
    series: [{
      ...lineSeriesConfig('xAI Valuation', CHART_COLORS.orange),
      data: xaiVal,
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(255,152,0,0.15)' }, { offset: 1, color: 'rgba(255,152,0,0)' }] } },
    }],
  };

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionLabel icon="🧠" title="AI (xAI / Dojo)" sub="Narrative #3 · Emerging Theme" />
      <div style={{ background: T.g01, borderRadius: 6, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '22px' }}>
          <strong style={{ color: T.n9 }}>xAI:</strong> Latest valuation $60B, Grok 3.5 launched. Tesla vehicle AI integration confirmed for Q2 2026. Musk holds significant xAI equity — conflict of interest risk remains.
          &nbsp;<strong style={{ color: T.n9 }}>Dojo:</strong> Custom training compute for Tesla FSD and Optimus, currently ~55K H100 equivalents. 2026 expansion target 120K+.
          &nbsp;<strong style={{ color: T.n9 }}>Key Variable:</strong> Transparency of xAI-Tesla synergy remains low; market cannot price the optionality.
        </p>
      </div>
      <div className="grid grid-cols-[3fr_2fr] gap-[24px]" style={{ alignItems: 'stretch' }}>
        <div className="flex flex-col relative">
          <WidgetTitle title="xAI Valuation Trend" timestamp="Quarterly · $B" />
          <div style={{ flex: 1, ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={option} style={{ height: '100%', minHeight: 180 }} notMerge />
          </div>
          <AlvaWatermark />
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
   9. Energy Storage Module
   ───────────────────────────────────────── */
const energyX = ['Q1\'25','Q2\'25','Q3\'25','Q4\'25','Q1\'26E'];
const energyGWh = [6.4, 8.1, 9.8, 12.5, 14.0];
const energyKPIs = [
  { label: 'Q4 Deployment',  value: '12.5 GWh', change: '+28% QoQ', trend: 'positive' as const },
  { label: 'Backlog',        value: 'To 2028',   change: 'Record',    trend: 'positive' as const },
  { label: 'Shanghai Megafactory', value: '2x Cap', change: 'Scaling',  trend: 'neutral' as const },
];

function EnergyModule() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${params[0].name}</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CHART_COLORS.green}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">${params[0].value} GWh</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category' as const, data: energyX, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value' as const, min: 0, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => v + ' GWh' } },
    series: [{
      name: 'Megapack GWh',
      type: 'bar' as const,
      barMaxWidth: 16,
      data: energyGWh.map((v, i) => ({
        value: v,
        itemStyle: {
          color: i >= 4 ? 'rgba(64,165,68,0.35)' : CHART_COLORS.green,
          borderRadius: [2, 2, 0, 0],
        },
      })),
    }],
  };

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionLabel icon="⚡" title="Energy Storage" sub="Narrative #4 · Steady Growth" />
      <div style={{ background: T.g01, borderRadius: 6, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '22px' }}>
          <strong style={{ color: T.n9 }}>Deployment:</strong> Q4 2025 set a record at 12.5 GWh Megapack deployed. Shanghai Megafactory now operating at 2x initial designed capacity. Utility backlog extends to 2028.
          &nbsp;<strong style={{ color: T.n9 }}>Margin:</strong> Energy gross margins expanding toward ~25%, becoming a meaningful contributor to consolidated profitability.
          &nbsp;<strong style={{ color: T.n9 }}>Outlook:</strong> Management targets 100+ GWh annual production by 2028, driven by new factory investments.
        </p>
      </div>
      <div className="grid grid-cols-[3fr_2fr] gap-[24px]" style={{ alignItems: 'stretch' }}>
        <div className="flex flex-col relative">
          <WidgetTitle title="Megapack Deployment" timestamp="Quarterly · GWh" />
          <div style={{ flex: 1, ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
            <ReactECharts option={option} style={{ height: '100%', minHeight: 180 }} notMerge />
          </div>
          <AlvaWatermark />
        </div>
        <div className="flex flex-col gap-[12px]">
          {energyKPIs.map((k) => (
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
   10. Fundamentals Overview
   ───────────────────────────────────────── */
function FundamentalsOverview() {
  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionLabel icon="📊" title="Fundamentals" sub="Valuation · Financials · Sentiment" />
      <div style={{ background: T.g01, borderRadius: 6, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.n7, fontFamily: T.FONT, lineHeight: '22px' }}>
          <strong style={{ color: T.n9 }}>Valuation:</strong> TSLA trades at ~130x forward P/E, a significant premium to the S&P 500 average of ~21x. The premium is justified by optionality in robotics, autonomy, and energy — none of which are yet generating meaningful revenue. P/S ratio at ~12x reflects the market's long-term growth expectations.
          &nbsp;<strong style={{ color: T.n9 }}>Financials:</strong> Auto gross margins remain pressured at ~16%, but energy and services margins are expanding. Revenue growth has decelerated to low single digits as the EV market matures. Free cash flow remains positive but well below 2022 peaks.
          &nbsp;<strong style={{ color: T.n9 }}>Sentiment:</strong> Short interest at 3.1% is near historic lows. Analyst consensus is split — 12 Buy, 15 Hold, 8 Sell. The stock is sentiment-driven, heavily influenced by Musk's public statements and product demos.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   11a. P/E Trend
   ───────────────────────────────────────── */
const peX = ['Mar\'25','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan\'26','Feb','Mar'];
const peData = [95, 88, 102, 115, 128, 142, 135, 155, 168, 148, 160, 125, 130];

function PETrendWidget() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      return `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:4px">${params[0].name}</div>` +
        `<div style="display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CHART_COLORS.primary}"></span>` +
        `<span style="font-size:12px;color:${T.n9};font-family:${T.FONT}">P/E: ${params[0].value}x</span></div>`;
    }},
    grid: { ...GRID_DEFAULT, top: 20, bottom: 20 },
    xAxis: { type: 'category' as const, data: peX, boundaryGap: false, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value' as const, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => v + 'x' } },
    series: [{
      ...lineSeriesConfig('P/E Ratio', CHART_COLORS.primary),
      data: peData,
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(73,163,166,0.12)' }, { offset: 1, color: 'rgba(73,163,166,0)' }] } },
    }],
  };

  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="P/E Ratio Trend" timestamp="1Y · Forward P/E" />
      <div style={{ flex: 1, ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
        <ReactECharts option={option} style={{ height: '100%', minHeight: 180 }} notMerge />
      </div>
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   11b. Revenue & Income Trend
   ───────────────────────────────────────── */
const revX = ['Q1\'25','Q2\'25','Q3\'25','Q4\'25'];
const revData = [21.3, 23.8, 25.2, 27.4];
const niData = [1.4, 1.8, 2.0, 2.1];

function RevenueIncomeWidget() {
  const option = {
    tooltip: { ...tooltipConfig(), formatter(params: any[]) {
      let s = `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:6px">${params[0].name}</div>`;
      params.forEach((p: any) => {
        s += `<div style="display:flex;align-items:center;gap:6px;line-height:20px">` +
          `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>` +
          `<span style="color:${T.n9};font-family:${T.FONT};font-size:12px">${p.seriesName}: $${p.value}B</span></div>`;
      });
      return s;
    }},
    legend: { show: false },
    grid: { ...GRID_DEFAULT, top: 24, bottom: 20 },
    xAxis: { type: 'category' as const, data: revX, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10 } },
    yAxis: { type: 'value' as const, axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { color: T.n7, fontFamily: T.FONT, fontSize: 10, formatter: (v: number) => '$' + v + 'B' } },
    series: [
      {
        name: 'Revenue',
        type: 'bar' as const,
        barMaxWidth: 16,
        data: revData.map(v => ({ value: v, itemStyle: { color: CHART_COLORS.primary, borderRadius: [2, 2, 0, 0] } })),
      },
      { ...lineSeriesConfig('Net Income', CHART_COLORS.orange), data: niData },
    ],
  };

  return (
    <div className="flex flex-col w-full relative">
      <WidgetTitle title="Revenue & Net Income" timestamp="Quarterly · $B" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
        <div className="flex items-center justify-end gap-[8px] mb-[4px]" style={{ height: 16 }}>
          <div className="flex items-center gap-[4px]">
            <div style={{ width: 8, height: 8, borderRadius: 0.5, background: CHART_COLORS.primary, flexShrink: 0 }} />
            <p style={{ fontSize: 10, color: T.n5, fontFamily: T.FONT }}>Revenue</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <div style={{ width: 12, height: 2, borderRadius: 0.5, background: CHART_COLORS.orange, flexShrink: 0 }} />
            <p style={{ fontSize: 10, color: T.n5, fontFamily: T.FONT }}>Net Income</p>
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 180 }}>
          <ReactECharts option={option} style={{ height: '100%' }} notMerge />
        </div>
      </div>
      <AlvaWatermark />
    </div>
  );
}

/* ─────────────────────────────────────────
   12. Valuation KPIs
   ───────────────────────────────────────── */
const valKPIs = [
  { label: 'P/E (FWD)',   value: '~130x',   change: 'Premium',   trend: 'neutral' as const },
  { label: 'P/S (TTM)',   value: '12.4x',   change: '+3.2x YoY', trend: 'negative' as const },
  { label: 'P/B',         value: '18.6x',   change: '',           trend: 'neutral' as const },
  { label: 'EV/EBITDA',   value: '~68x',    change: 'Premium',   trend: 'neutral' as const },
  { label: 'Market Cap',  value: '$1.30T',  change: '+89% YoY',  trend: 'positive' as const },
];

function ValuationKPIs() {
  return (
    <div className="flex flex-col">
      <WidgetTitle title="Valuation Metrics" timestamp="Latest · TTM" />
      <div className="flex flex-wrap gap-[12px]">
        {valKPIs.map((k) => (
          <div key={k.label} style={{ flex: '1 1 auto', minWidth: 140, background: T.g01, borderRadius: 6, padding: '12px 16px' }}>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 6 }}>{k.label}</p>
            <p style={{ fontSize: 18, fontWeight: 500, color: T.n9, fontFamily: T.FONT, lineHeight: '22px' }}>{k.value}</p>
            {k.change && <p style={{ fontSize: 11, color: k.trend === 'positive' ? T.pos : k.trend === 'negative' ? T.neg : T.n5, fontFamily: T.FONT }}>{k.change}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   13. Financial Health KPIs
   ───────────────────────────────────────── */
const healthKPIs = [
  { label: 'Gross Margin (MRQ)',  value: '18.4%',  change: '-1.8pp YoY', trend: 'negative' as const },
  { label: 'Net Margin (MRQ)',    value: '7.7%',   change: '-3.2pp YoY', trend: 'negative' as const },
  { label: 'ROE (TTM)',           value: '22.1%',  change: '-8pp YoY',   trend: 'negative' as const },
  { label: 'FCF Margin (MRQ)',    value: '4.8%',   change: '-2.1pp YoY', trend: 'negative' as const },
];

function HealthKPIs() {
  return (
    <div className="flex flex-col">
      <WidgetTitle title="Financial Health" timestamp="MRQ / TTM" />
      <div className="flex flex-wrap gap-[12px]">
        {healthKPIs.map((k) => (
          <div key={k.label} style={{ flex: '1 1 auto', minWidth: 160, background: T.g01, borderRadius: 6, padding: '12px 16px' }}>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 6 }}>{k.label}</p>
            <p style={{ fontSize: 18, fontWeight: 500, color: T.n9, fontFamily: T.FONT, lineHeight: '22px' }}>{k.value}</p>
            <p style={{ fontSize: 11, color: k.trend === 'positive' ? T.pos : k.trend === 'negative' ? T.neg : T.n5, fontFamily: T.FONT }}>{k.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   14. Earnings Preview
   ───────────────────────────────────────── */
function EarningsPreview() {
  return (
    <div className="flex flex-col">
      <WidgetTitle title="Earnings Preview" timestamp="Next Report" />
      <div style={{ background: T.g01, borderRadius: 6, padding: '16px 20px' }}>
        <div className="flex flex-wrap gap-[16px]">
          <div style={{ flex: '1 1 auto', minWidth: 140 }}>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 4 }}>Next Earnings</p>
            <p style={{ fontSize: 16, fontWeight: 500, color: T.n9, fontFamily: T.FONT }}>Apr 22, 2026</p>
            <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT }}>Q1 2026 · After Market</p>
          </div>
          <div style={{ flex: '1 1 auto', minWidth: 140 }}>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 4 }}>EPS Estimate</p>
            <p style={{ fontSize: 16, fontWeight: 500, color: T.n9, fontFamily: T.FONT }}>$0.72</p>
            <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT }}>Consensus (28 analysts)</p>
          </div>
          <div style={{ flex: '1 1 auto', minWidth: 140 }}>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 4 }}>Revenue Estimate</p>
            <p style={{ fontSize: 16, fontWeight: 500, color: T.n9, fontFamily: T.FONT }}>$22.8B</p>
            <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT }}>Consensus</p>
          </div>
          <div style={{ flex: '1 1 auto', minWidth: 140 }}>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 4 }}>Last Surprise</p>
            <p style={{ fontSize: 16, fontWeight: 500, color: T.pos, fontFamily: T.FONT }}>+12.3%</p>
            <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT }}>Q4 2025 EPS beat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   15. Insider Trading
   ───────────────────────────────────────── */
const insiderData = [
  { name: 'Elon Musk',       role: 'CEO',   type: 'Exercise', shares: '—',       date: 'Jan 15, 2026', note: 'Option exercise' },
  { name: 'Vaibhav Taneja',  role: 'CFO',   type: 'Sale',     shares: '-28,000', date: 'Jan 28, 2026', note: 'Rule 10b5-1' },
  { name: 'Robyn Denholm',   role: 'Chair', type: 'Sale',     shares: '-20,000', date: 'Feb 5, 2026',  note: 'Rule 10b5-1' },
  { name: 'Kathleen Wilson', role: 'Dir',   type: 'Purchase', shares: '+6,000',  date: 'Feb 18, 2026', note: 'Open market' },
  { name: 'Drew Baglino',    role: 'SVP',   type: 'Sale',     shares: '-15,000', date: 'Mar 1, 2026',  note: 'Rule 10b5-1' },
];

function InsiderTradingWidget() {
  return (
    <div className="flex flex-col">
      <WidgetTitle title="Insider Trading" timestamp="SEC Form 4 · Last 60D" />
      <div style={{ borderRadius: 6, overflow: 'hidden' }}>
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1.4fr 1.5fr', borderBottom: '1px solid rgba(0,0,0,0.07)', paddingBottom: 10 }}>
          {['Name', 'Role', 'Type', 'Shares', 'Date', 'Note'].map((h) => (
            <p key={h} style={{ fontSize: 13, color: T.n5, fontFamily: T.FONT, letterSpacing: '0.13px' }}>{h}</p>
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
  );
}

/* ─────────────────────────────────────────
   16. Analyst Price Targets
   ───────────────────────────────────────── */
function AnalystTargetsWidget() {
  const targets = [
    { label: 'High', value: '$550', color: T.pos },
    { label: 'Median', value: '$380', color: T.n9 },
    { label: 'Low', value: '$120', color: T.neg },
    { label: 'Current', value: '$405.94', color: T.teal },
  ];
  const ratings = [
    { label: 'Buy', count: 12, color: T.pos },
    { label: 'Hold', count: 15, color: T.n5 },
    { label: 'Sell', count: 8, color: T.neg },
  ];

  return (
    <div className="flex flex-col">
      <WidgetTitle title="Analyst Price Targets" timestamp="Consensus · 35 Analysts" />
      <div style={{ background: T.g01, borderRadius: 6, padding: '16px 20px' }}>
        <div className="flex flex-wrap gap-[24px]">
          {/* Price Targets */}
          <div style={{ flex: '1 1 280px' }}>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 12 }}>Price Target Range</p>
            <div className="flex items-center gap-[16px]">
              {targets.map((t) => (
                <div key={t.label} style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT, marginBottom: 4 }}>{t.label}</p>
                  <p style={{ fontSize: 18, fontWeight: 500, color: t.color, fontFamily: T.FONT }}>{t.value}</p>
                </div>
              ))}
            </div>
            {/* Visual bar */}
            <div style={{ marginTop: 12, height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '22%', right: '35%', height: '100%', background: 'rgba(73,163,166,0.3)', borderRadius: 3 }} />
              <div style={{ position: 'absolute', left: `${((405.94 - 120) / (550 - 120)) * 100}%`, top: -3, width: 2, height: 12, background: T.teal, borderRadius: 1 }} />
            </div>
          </div>
          {/* Rating Distribution */}
          <div style={{ flex: '1 1 280px' }}>
            <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, marginBottom: 12 }}>Rating Distribution</p>
            <div className="flex items-end gap-[12px]">
              {ratings.map((r) => (
                <div key={r.label} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    height: r.count * 4,
                    background: r.color,
                    borderRadius: '2px 2px 0 0',
                    opacity: 0.6,
                    marginBottom: 6,
                  }} />
                  <p style={{ fontSize: 13, fontWeight: 500, color: r.color, fontFamily: T.FONT }}>{r.count}</p>
                  <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT }}>{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Page
   ───────────────────────────────────────── */
export function DashboardTSLATracking({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="tsla-tracking" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="flex flex-col items-center px-[28px] relative w-full">
          <Topbar title="TSLA Tracking" />

          <div className="flex flex-col gap-[24px] pb-[56px] w-full">

            {/* ── Part 1: Common ── */}

            {/* 1. Stock Overview */}
            <StockOverviewWidget />

            {/* 2. Narrative Context */}
            <NarrativeContextWidget />

            {/* 3. Business Line Heatmap */}
            <HeatmapWidget />

            {/* 4. Price Chart vs SPY | Social Keywords */}
            <div className="flex flex-wrap gap-[24px] w-full" style={{ alignItems: 'stretch' }}>
              <div style={{ flex: '1 1 320px' }}><PriceChartWidget /></div>
              <div style={{ flex: '1 1 320px' }}><SocialKeywordsWidget /></div>
            </div>

            {/* 5. Social Feed (X) | News Feed */}
            <div className="flex flex-wrap gap-[24px] w-full" style={{ alignItems: 'stretch' }}>
              <div style={{ flex: '1 1 320px' }}><SocialFeedWidget /></div>
              <div style={{ flex: '1 1 320px' }}><NewsFeedWidget /></div>
            </div>

            {/* ── Part 2: Professional ── */}

            {/* 6. Robot / Optimus */}
            <RobotModule />

            {/* 7. FSD / Autonomy */}
            <FSDModule />

            {/* 8. AI / xAI */}
            <AIModule />

            {/* 9. Energy Storage */}
            <EnergyModule />

            {/* ── Part 3: Fundamentals ── */}

            {/* 10. Fundamentals Overview */}
            <FundamentalsOverview />

            {/* 11. P/E Trend | Revenue & Income */}
            <div className="flex flex-wrap gap-[24px] w-full" style={{ alignItems: 'stretch' }}>
              <div style={{ flex: '1 1 320px' }}><PETrendWidget /></div>
              <div style={{ flex: '1 1 320px' }}><RevenueIncomeWidget /></div>
            </div>

            {/* 12. Valuation KPIs */}
            <ValuationKPIs />

            {/* 13. Financial Health KPIs */}
            <HealthKPIs />

            {/* 14. Earnings Preview */}
            <EarningsPreview />

            {/* 15. Insider Trading */}
            <InsiderTradingWidget />

            {/* 16. Analyst Price Targets */}
            <AnalystTargetsWidget />

          </div>
        </div>
      </div>
    </AppShell>
  );
}
