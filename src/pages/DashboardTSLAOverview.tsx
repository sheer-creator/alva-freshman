/**
 * [INPUT]: AppShell, Topbar, ReactECharts, chart-theme
 * [OUTPUT]: TSLA Overview Dashboard（HTML 版本精确复刻）
 * [POS]: 页面层 — TSLA 全景总览看板
 *
 * 布局（自上而下）：
 *   Section 1: Price & Valuation  — Price+Volume Chart (3fr) | Valuation 2×3 KPI grid (2fr)
 *   Section 2: Risk Indicators    — Beta | 30D Vol | Max Drawdown | Sharpe (4 equal cols)
 *   Section 3: Sentiment Monitor  — News Feed (1fr) | Social Sentiment Chart (1fr)
 */

import ReactECharts from 'echarts-for-react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import { tooltipConfig, CHART_COLORS } from '@/lib/chart-theme';

/* ─────────────────────────────────────────
   Design tokens
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

// Axis shared config
const AX_BASE = {
  axisLine: { show: false },
  axisTick: { show: false },
  splitLine: { show: false },
};

/* ─────────────────────────────────────────
   Shared sub-components
   ───────────────────────────────────────── */
function WidgetTitle({ title, timestamp }: { title: string; timestamp: string }) {
  return (
    <div className="flex items-center justify-between h-[22px] mb-[16px]" style={{ flexShrink: 0 }}>
      <p style={{ fontSize: 14, fontWeight: 400, color: T.n9, letterSpacing: '0.14px', lineHeight: '22px', fontFamily: T.FONT }}>
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

function LegendItem({ color, label, isBar }: { color: string; label: string; isBar?: boolean }) {
  return (
    <div className="flex items-center gap-[4px]">
      {isBar
        ? <div style={{ width: 8, height: 3, borderRadius: 1, background: color, flexShrink: 0 }} />
        : <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
      }
      <p style={{ fontSize: 10, color: T.n5, fontFamily: T.FONT }}>{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   1a. Price + Volume Chart (dual Y-axis)
   ───────────────────────────────────────── */
const months  = ['Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
const prices  = [245, 260, 278, 238, 202, 215, 251, 294, 318, 345, 370, 381];
const volumes = [42, 38, 55, 70, 85, 74, 50, 54, 46, 40, 62, 58];

function PriceChartWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      formatter(params: any[]) {
        const t = params[0].axisValue;
        let s = `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:6px">${t}</div>`;
        params.forEach((p: any) => {
          const val = p.seriesName === 'Volume' ? p.value + 'M' : '$' + p.value;
          const shape = p.seriesName === 'Volume'
            ? `border-radius:1px;width:8px;height:3px`
            : `border-radius:50%;width:8px;height:8px`;
          s += `<div style="display:flex;align-items:center;gap:6px;line-height:20px">` +
            `<span style="display:inline-block;${shape};flex-shrink:0;background:${p.color}"></span>` +
            `<span style="color:${T.n9};font-family:${T.FONT};font-size:12px">${p.seriesName}</span>` +
            `<span style="color:${T.n9};font-family:${T.FONT};font-size:12px;margin-left:auto">${val}</span>` +
            `</div>`;
        });
        return s;
      },
    },
    grid: { top: 4, right: 4, bottom: 4, left: 4, containLabel: true },
    xAxis: {
      type: 'category', data: months, boundaryGap: true,
      ...AX_BASE,
      axisLabel: { fontSize: 10, color: T.n7, fontFamily: T.FONT, margin: 8 },
    },
    yAxis: [
      {
        type: 'value', position: 'left',
        ...AX_BASE,
        axisLabel: { fontSize: 10, color: T.n7, fontFamily: T.FONT, margin: 8, formatter: (v: number) => '$' + v },
      },
      {
        type: 'value', position: 'right',
        ...AX_BASE,
        axisLabel: { fontSize: 10, color: T.n7, fontFamily: T.FONT, margin: 8, formatter: (v: number) => v + 'M' },
      },
    ],
    series: [
      {
        name: 'Price',
        type: 'line',
        data: prices,
        yAxisIndex: 0,
        lineStyle: { color: T.teal, width: 1 },
        itemStyle: { color: T.teal },
        symbol: 'circle', symbolSize: 10, showSymbol: false,
        emphasis: { itemStyle: { borderColor: '#ffffff', borderWidth: 1, color: T.teal } },
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
            { offset: 0, color: 'rgba(73,163,166,0.18)' },
            { offset: 1, color: 'rgba(73,163,166,0)' },
          ]},
        },
      },
      {
        name: 'Volume',
        type: 'bar',
        data: volumes,
        yAxisIndex: 1,
        itemStyle: { color: 'rgba(255,152,0,0.35)' },
        barMaxWidth: 16,
      },
    ],
  };

  return (
    <div className="flex flex-col relative">
      <WidgetTitle title="TSLA Stock Price" timestamp="02/26/2026  16:00" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
        <div className="flex items-center justify-end gap-[8px] mb-[4px]" style={{ height: 16 }}>
          <LegendItem color={T.teal} label="Price (USD)" />
          <LegendItem color="rgba(255,152,0,0.45)" label="Volume (M)" isBar />
        </div>
        <div style={{ flex: 1, minHeight: 320 }}>
          <ReactECharts option={option} style={{ height: '100%' }} notMerge />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   1b. Valuation Snapshot — 2×3 KPI grid
   ───────────────────────────────────────── */
const valuationCells = [
  { label: 'Last Price',      value: '$381.50', valueCls: 'neutral', change: '▲ +2.4% today',    changeCls: 'pos', sub: '' },
  { label: 'Market Cap',      value: '$1.22T',  valueCls: 'neutral', change: '',                  changeCls: 'neu', sub: 'Trailing 12M' },
  { label: 'P/E (NTM)',       value: '118x',    valueCls: 'neutral', change: '',                  changeCls: 'neu', sub: 'vs S&P 500 · 22x' },
  { label: 'P/S (NTM)',       value: '14.8x',   valueCls: 'neutral', change: '',                  changeCls: 'neu', sub: 'vs Sector · 6x' },
  { label: 'EV / EBITDA',     value: '82x',     valueCls: 'neutral', change: '',                  changeCls: 'neu', sub: 'vs Sector · 12x' },
  { label: 'Rev Growth YoY',  value: '+18.4%',  valueCls: 'pos',     change: '',                  changeCls: 'neu', sub: 'FY2025 Estimate' },
];

function ValuationWidget() {
  return (
    <div className="flex flex-col">
      <WidgetTitle title="Valuation Snapshot" timestamp="02/26/2026" />
      <div style={{ flex: 1, background: T.g01, borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', flex: 1, minHeight: 350 }}>
          {valuationCells.map((c, i) => {
            const isRightCol = i % 2 === 1;
            const isRowDivider = i >= 2;
            return (
              <div key={i} style={{
                position: 'relative',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: 20, gap: 5,
              }}>
                {/* 非通栏分割线：内缩 20px，与 padding 对齐 */}
                {isRightCol && (
                  <div style={{ position: 'absolute', left: 0, top: 20, bottom: 20, width: 1, background: 'rgba(0,0,0,0.05)' }} />
                )}
                {isRowDivider && (
                  <div style={{ position: 'absolute', top: 0, left: 20, right: 20, height: 1, background: 'rgba(0,0,0,0.05)' }} />
                )}
                <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, letterSpacing: '0.12px' }}>{c.label}</p>
                <p style={{
                  fontSize: 24, fontWeight: 400, lineHeight: '1.15', fontFamily: T.FONT,
                  color: c.valueCls === 'pos' ? T.pos : c.valueCls === 'neg' ? T.neg : T.n9,
                }}>{c.value}</p>
                {c.sub && <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT }}>{c.sub}</p>}
                {c.change && (
                  <p style={{ fontSize: 12, fontFamily: T.FONT, color: c.changeCls === 'pos' ? T.pos : c.changeCls === 'neg' ? T.neg : T.n5 }}>
                    {c.change}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   2. Risk KPI Card
   ───────────────────────────────────────── */
type Trend = 'pos' | 'neg' | 'neu';
const riskCards = [
  { title: 'Beta',           timestamp: '1Y',         label: 'vs S&P 500',       value: '1.82',   valueTrend: 'neu' as Trend, sub: 'High systematic risk', change: 'Benchmark = 1.0',     changeTrend: 'neu' as Trend },
  { title: '30D Volatility', timestamp: 'Annualized', label: 'Historical Vol',    value: '52.3%',  valueTrend: 'neg' as Trend, sub: 'vs SPY · 16.1%',       change: '↑ +8.2pp vs 90D avg', changeTrend: 'neg' as Trend },
  { title: 'Max Drawdown',   timestamp: '52-Week',    label: 'Peak-to-Trough',   value: '-38.5%', valueTrend: 'neg' as Trend, sub: 'Jun–Aug 2025',          change: 'Recovery 92%',        changeTrend: 'neu' as Trend },
  { title: 'Sharpe Ratio',   timestamp: '1Y',         label: 'Risk-Adj Return',  value: '0.87',   valueTrend: 'pos' as Trend, sub: 'SPY · 1.24',            change: 'Below benchmark',     changeTrend: 'neu' as Trend },
];

function RiskKPICard({ title, timestamp, label, value, valueTrend, sub, change, changeTrend }: typeof riskCards[0]) {
  return (
    <div className="flex flex-col relative">
      <WidgetTitle title={title} timestamp={timestamp} />
      <div style={{ flex: 1, background: T.g01, borderRadius: 4, padding: 20, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 140 }}>
        <p style={{ fontSize: 12, color: T.n5, fontFamily: T.FONT, letterSpacing: '0.12px' }}>{label}</p>
        <p style={{
          fontSize: 28, fontWeight: 400, lineHeight: '1.1', fontFamily: T.FONT,
          color: valueTrend === 'pos' ? T.pos : valueTrend === 'neg' ? T.neg : T.n9,
        }}>{value}</p>
        <p style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT }}>{sub}</p>
        <p style={{ fontSize: 12, fontFamily: T.FONT, color: changeTrend === 'pos' ? T.pos : changeTrend === 'neg' ? T.neg : T.n5 }}>
          {change}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   3a. News Feed
   ───────────────────────────────────────── */
const newsItems = [
  { headline: 'Tesla FSD v13 achieves 99.2% intervention-free drives in California, beating Waymo benchmark', source: 'Reuters',        time: '2h ago',  sentiment: 'bullish' as const },
  { headline: 'EV price war intensifies: BYD cuts Model Y rival pricing by 12% in Europe, pressuring Tesla margins', source: 'Bloomberg',      time: '4h ago',  sentiment: 'bearish' as const },
  { headline: 'Elon Musk reiterates Robotaxi launch timeline for Q3 2026 Austin pilot — calls it "most important product launch in history"', source: 'TechCrunch',    time: '6h ago',  sentiment: 'bullish' as const },
  { headline: 'NHTSA opens preliminary investigation into Tesla Autopilot following three reported incidents in Q1 2026', source: 'WSJ',           time: '8h ago',  sentiment: 'bearish' as const },
  { headline: 'Tesla Q1 2026 delivery estimates hold steady at 510K units; analyst consensus unchanged', source: 'Electrek',       time: '10h ago', sentiment: 'neutral' as const },
  { headline: 'Morgan Stanley raises TSLA price target to $420 citing energy storage business hitting inflection point', source: 'Morgan Stanley', time: '12h ago', sentiment: 'bullish' as const },
  { headline: 'China EV sales data: Tesla market share dips to 14.3% in January amid intensifying local competition', source: 'Financial Times', time: '14h ago', sentiment: 'bearish' as const },
];

const BADGE: Record<string, { bg: string; color: string; label: string }> = {
  bullish: { bg: 'rgba(42,155,125,0.1)', color: '#2a9b7d', label: 'Bullish' },
  bearish: { bg: 'rgba(224,83,87,0.1)',  color: '#e05357', label: 'Bearish' },
  neutral: { bg: 'rgba(0,0,0,0.05)',     color: 'rgba(0,0,0,0.5)', label: 'Neutral' },
};

function NewsFeedWidget() {
  return (
    <div className="flex flex-col relative">
      <WidgetTitle title="News Sentiment" timestamp="Past 24h" />
      <div style={{ flex: 1, background: T.g01, borderRadius: 4, overflowY: 'auto', padding: '4px 0', minHeight: 350 }}>
        {newsItems.map((item, i) => {
          const badge = BADGE[item.sentiment];
          return (
            <div key={i} style={{
              position: 'relative', padding: 16, display: 'flex', gap: 12,
            }}>
              {/* 非通栏分割线：内缩 16px，与 padding 对齐 */}
              {i < newsItems.length - 1 && (
                <div style={{ position: 'absolute', bottom: 0, left: 16, right: 16, height: 1, background: 'rgba(0,0,0,0.05)' }} />
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{ fontSize: 13, color: T.n9, fontFamily: T.FONT, lineHeight: '1.5', letterSpacing: '0.13px' }}>{item.headline}</p>
                <div className="flex items-center gap-[8px]">
                  <span style={{ fontSize: 11, color: T.n5, fontFamily: T.FONT }}>{item.source}</span>
                  <span style={{ fontSize: 11, color: T.n3, fontFamily: T.FONT }}>{item.time}</span>
                </div>
              </div>
              <span style={{
                fontSize: 11, padding: '2px 6px', borderRadius: 2, flexShrink: 0,
                alignSelf: 'flex-start', marginTop: 2,
                background: badge.bg, color: badge.color, fontFamily: T.FONT,
              }}>{badge.label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   3b. Social Sentiment Chart (30D)
   ───────────────────────────────────────── */
const days30 = Array.from({ length: 30 }, (_, i) => {
  const d = new Date('2026-01-28');
  d.setDate(d.getDate() + i);
  return `${d.getMonth() + 1}/${d.getDate()}`;
});
const redditScore  = [62,65,70,68,72,75,71,69,74,78,80,76,73,71,68,65,70,75,79,82,80,77,74,72,76,80,83,85,82,78];
const twitterScore = [55,58,62,60,65,68,64,61,67,72,75,70,66,63,60,57,62,68,73,76,74,71,68,65,70,74,78,80,77,73];

function SocialSentimentWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      formatter(params: any[]) {
        const t = params[0].axisValue;
        let s = `<div style="font-size:12px;color:${T.n7};font-family:${T.FONT};margin-bottom:6px">${t}</div>`;
        params.forEach((p: any) => {
          const mood = p.value >= 70 ? `<span style="color:${T.pos};font-size:10px;margin-left:4px">Bullish</span>`
            : p.value >= 55 ? `<span style="color:${T.n5};font-size:10px;margin-left:4px">Neutral</span>`
            : `<span style="color:${T.neg};font-size:10px;margin-left:4px">Bearish</span>`;
          s += `<div style="display:flex;align-items:center;gap:6px;line-height:20px">` +
            `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${p.color}"></span>` +
            `<span style="color:${T.n9};font-family:${T.FONT};font-size:12px">${p.seriesName}</span>` +
            `<span style="color:${T.n9};font-family:${T.FONT};font-size:12px;margin-left:auto">${p.value}${mood}</span>` +
            `</div>`;
        });
        return s;
      },
    },
    grid: { top: 4, right: 4, bottom: 4, left: 4, containLabel: true },
    xAxis: {
      type: 'category', data: days30, boundaryGap: false,
      ...AX_BASE,
      axisLabel: { fontSize: 10, color: T.n7, fontFamily: T.FONT, margin: 8, interval: 4 },
    },
    yAxis: {
      type: 'value', min: 40, max: 100,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { fontSize: 10, color: T.n7, fontFamily: T.FONT, margin: 8 },
      splitLine: { show: true, lineStyle: { color: 'rgba(0,0,0,0.06)', type: [3, 2] as [number, number], width: 1 } },
    },
    series: [
      {
        name: 'Reddit',
        type: 'line',
        data: redditScore,
        lineStyle: { color: T.teal, width: 1 },
        itemStyle: { color: T.teal },
        symbol: 'circle', symbolSize: 10, showSymbol: false,
        emphasis: { itemStyle: { borderColor: '#ffffff', borderWidth: 1, color: T.teal } },
      },
      {
        name: 'X/Twitter',
        type: 'line',
        data: twitterScore,
        lineStyle: { color: CHART_COLORS.orange, width: 1 },
        itemStyle: { color: CHART_COLORS.orange },
        symbol: 'circle', symbolSize: 10, showSymbol: false,
        emphasis: { itemStyle: { borderColor: '#ffffff', borderWidth: 1, color: CHART_COLORS.orange } },
      },
    ],
  };

  return (
    <div className="flex flex-col relative">
      <WidgetTitle title="Social Sentiment" timestamp="30 Days" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', ...CHART_DOT_BG, borderRadius: 6, padding: 16 }}>
        <div className="flex items-center justify-end gap-[8px] mb-[4px]" style={{ height: 16 }}>
          <LegendItem color={T.teal} label="Reddit" />
          <LegendItem color={CHART_COLORS.orange} label="X / Twitter" />
        </div>
        <div style={{ flex: 1, minHeight: 320 }}>
          <ReactECharts option={option} style={{ height: '100%' }} notMerge />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.2)', fontFamily: T.FONT, pointerEvents: 'none' }}>Alva</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Page
   ───────────────────────────────────────── */
export function DashboardTSLAOverview({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="tsla-overview" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="flex flex-col items-center px-[28px] relative w-full">
          <Topbar title="TSLA Overview" />

          <div className="flex flex-col gap-[24px] pb-[56px] w-full">

            {/* Section 1: Price & Valuation */}
            <SectionLabel icon="📈" title="Price & Valuation" sub="12-Month Price · P/E · P/S · EV/EBITDA" />
            <div className="grid grid-cols-[3fr_2fr] gap-[24px]" style={{ alignItems: 'stretch' }}>
              <PriceChartWidget />
              <ValuationWidget />
            </div>

            {/* Section 2: Risk Indicators */}
            <SectionLabel icon="⚠️" title="Risk Indicators" sub="Beta · Volatility · Max Drawdown · Sharpe" />
            <div className="grid grid-cols-4 gap-[24px]" style={{ alignItems: 'stretch' }}>
              {riskCards.map((c) => <RiskKPICard key={c.title} {...c} />)}
            </div>

            {/* Section 3: Sentiment Monitor */}
            <SectionLabel icon="🗞️" title="Sentiment Monitor" sub="News · Reddit · X/Twitter" />
            <div className="grid grid-cols-2 gap-[24px]" style={{ alignItems: 'stretch' }}>
              <NewsFeedWidget />
              <SocialSentimentWidget />
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
